"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePresentationState } from "@/states/presentation-state";

export function ExportButton() {
  const { currentPresentationId } = usePresentationState();
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: string) => {
    if (!currentPresentationId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/presentation/export/${format}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentPresentationId }),
      });
      if (format === "slides") {
        const data = await res.json();
        window.open(data.url, "_blank");
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `presentation.${format === "pptx" ? "pptx" : "pdf"}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost" disabled={!currentPresentationId || loading}>
          <Download className="mr-1 h-4 w-4" /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => handleExport("pptx")}>PowerPoint</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleExport("pdf")}>PDF</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleExport("slides")}>Google Slides</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
