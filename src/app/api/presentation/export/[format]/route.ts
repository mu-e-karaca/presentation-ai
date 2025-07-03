import { NextResponse } from "next/server";
import { google } from "googleapis";
import PptxGenJS from "pptxgenjs";
import { PDFDocument } from "pdf-lib";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { type PlateSlide } from "@/components/presentation/utils/parser";

// Helper to extract plain text from slide content
function nodeText(node: any): string {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) {
    return node.children.map(nodeText).join(" ");
  }
  return "";
}

function slideToText(slide: PlateSlide): string {
  return slide.content.map(nodeText).join("\n");
}

export async function POST(
  req: Request,
  { params }: { params: { format: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = (await req.json()) as { id: string };
  if (!id) {
    return NextResponse.json({ error: "Missing presentation id" }, { status: 400 });
  }

  const pres = await db.presentation.findUnique({
    where: { id },
    select: { content: true, title: true },
  });
  if (!pres) {
    return NextResponse.json({ error: "Presentation not found" }, { status: 404 });
  }

  const slides = (pres.content as { slides: PlateSlide[] }).slides;
  const texts = slides.map(slideToText);

  switch (params.format) {
    case "pptx": {
      const pptx = new PptxGenJS();
      slides.forEach((slide) => {
        const s = pptx.addSlide();
        s.addText(slideToText(slide));
      });
      const buffer = await pptx.write("nodebuffer");
      return new NextResponse(buffer as Buffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "Content-Disposition": `attachment; filename=\"${pres.title}.pptx\"`,
        },
      });
    }
    case "pdf": {
      const pdf = await PDFDocument.create();
      const page = pdf.addPage();
      let y = page.getHeight() - 50;
      texts.forEach((txt) => {
        page.drawText(txt, { x: 50, y });
        y -= 40;
      });
      const bytes = await pdf.save();
      return new NextResponse(Buffer.from(bytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename=\"${pres.title}.pdf\"`,
        },
      });
    }
    case "slides": {
      const jwt = new google.auth.JWT(
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        undefined,
        (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
        ["https://www.googleapis.com/auth/presentations"]
      );
      const slidesApi = google.slides({ version: "v1", auth: jwt });
      const createRes = await slidesApi.presentations.create({ requestBody: { title: pres.title } });
      const presentationId = createRes.data.presentationId as string;
      await slidesApi.presentations.batchUpdate({
        presentationId,
        requestBody: {
          requests: texts.map((t, idx) => ({
            createSlide: { objectId: `slide${idx}` },
            // Additional requests to insert text would go here
          })),
        },
      });
      return NextResponse.json({ id: presentationId, url: `https://docs.google.com/presentation/d/${presentationId}` });
    }
    default:
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
  }
}
