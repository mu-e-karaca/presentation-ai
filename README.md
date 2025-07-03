# ALLWEONE® AI Presentation Generator


https://github.com/user-attachments/assets/a21dbd49-75b8-4822-bcec-a75b581d9c60


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

An open-source inspired by gamma.app ,AI-powered presentation generator that creates beautiful Slides with AI, customizable slides in minutes. This tool is part of the broader ALLWEONE AI platform.

[Live Demo](https://allweone.com/presentations) | [Video Tutorial](https://www.youtube.com/watch?v=UUePLJeFqVQ)

## 🌟 Features

- **AI-Powered Content Generation**: Create complete presentations on any topic with AI
- **Customizable Slides**: Choose the number of slides, language, and page style
- **Editable Outlines**: Review and modify AI-generated outlines before finalizing
- **Multiple Themes**: 9 built-in themes with more coming soon
- **Custom Theme Creation**: Create and save your own themes from scratch
- **Image Generation**: Choose different AI image generation models for your slides
- **Audience-Focused Styles**: Select between professional and casual presentation styles
- **Real-Time Generation**: Watch your presentation build live as content is created
- **Full Editability**: Modify text, fonts, and design elements as needed
- **Presentation Mode**: Present directly from the application
- **Auto-Save**: Everything saves automatically as you work
- **Export Options**: Download presentations as PPTX, PDF, or send to Google Slides

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- OpenAI API key (for AI generation features)
- Together AI API key (for Image generation)
- Google Client ID and Secret for authentication feature
- Google Slides service account credentials for exporting to Google Slides

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:allweonedev/presentation-ai.git
   cd presentation-ai
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

   ```
   # AI Providers
   OPENAI_API_KEY=""
   TOGETHER_AI_API_KEY=""


   # For Next Auth
   NEXTAUTH_SECRET=""
   NEXTAUTH_URL=""
   NEXTAUTH_URL="http://192.168.1.83:3000"

   # Next Auth Google Provider
   GOOGLE_CLIENT_ID=""
  GOOGLE_CLIENT_SECRET=""

  # Google Slides API
  GOOGLE_SERVICE_ACCOUNT_EMAIL=""
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=""

  # For Uploadthing
  UPLOADTHING_TOKEN=""

   # PostgreSQL Database URL
   DATABASE_URL="postgresql://username:password@localhost:5432/presentation_ai"

   ```

   Note: You need to set up a PostgreSQL database for testing the application.

4. Set up the database:

   ```bash
   pnpm db:push
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💻 Usage

### Creating a Presentation

1. Navigate to the dashboard
2. Enter your presentation topic
3. Choose the number of slides (recommended: 5-10)
4. Select your preferred language
5. Choose a page style
6. Click "Generate Outline"
7. Review and edit the AI-generated outline
8. Select a theme for your presentation
9. Choose an image generation model
10. Select your presentation style (Professional/Casual)
11. Click "Generate Presentation"
12. Wait for the AI to create your slides in real-time
13. Preview, edit, and refine your presentation as needed
14. Present directly from the app or export your presentation

### Exporting Presentations

The presentation page includes buttons to export your slides to PowerPoint, PDF, or Google Slides.
Make sure you have set the **GOOGLE_SERVICE_ACCOUNT_EMAIL** and **GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY** environment variables to enable the Google Slides export.

Example request using `curl`:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"id":"YOUR_PRESENTATION_ID"}' \
  http://localhost:3000/api/presentation/export/pptx
```

### Custom Themes

1. Click "Create New Theme"
2. Start from scratch or derive from an existing theme
3. Customize colors, fonts, and layout
4. Save your theme for future use

## 🧰 Tech Stack

This project is built with:

- **Next.js**: React framework for server-rendered applications
- **React**: UI library for building user interfaces
- **Prisma**: Database ORM with PostgreSQL
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Typed JavaScript
- **OpenAI API**: For AI content generation
- **Radix UI**: Headless UI components
- **Plate Editor**: Rich text editing system for handling text, images, and slide components
- **Authentication**: NextAuth.js for user authentication
- **UploadThing**: File uploads
- **DND Kit**: Drag and drop functionality

## 🛠️ Project Structure

```
presentation/
├── .next/               # Next.js build output
├── node_modules/        # Dependencies
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma database model
├── src/                 # Source code
│   ├── app/             # Next.js app router
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   ├── presentation/  # Presentation-related components
│   │   │   ├── dashboard/   # Dashboard UI
│   │   │   ├── editor/      # Presentation editor
│   │   │   │   ├── custom-elements/  # Custom editor elements
│   │   │   │   ├── dnd/              # Drag and drop functionality
│   │   │   │   └── native-elements/  # Native editor elements
│   │   │   ├── outline/     # Presentation outline components
│   │   │   ├── theme/       # Theme-related components
│   │   │   └── utils/       # Presentation utilities
│   │   ├── prose-mirror/  # ProseMirror editor components for the outline part
│   │   ├── text-editor/   # Text editor components
│   │   │   ├── hooks/       # Editor hooks
│   │   │   ├── lib/         # Editor libraries
│   │   │   ├── plate-ui/    # Plate editor UI components
│   │   │   └── plugins/     # Editor plugins
│   │   └── ui/           # Shared UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and shared code
│   ├── provider/        # Context providers
│   ├── server/          # Server-side code
│   ├── states/          # State management
│   ├── middleware.ts    # Next.js middleware
│   └── env.js           # Environment configuration
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 🤝 Contributing

We welcome contributions to the ALLWEONE Presentation Generator! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [OpenAI](https://openai.com/) for AI generation capabilities
- [Plate Editor](https://plate.udecode.io/) for rich text editing
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Next.js](https://nextjs.org/) for the React framework
- All our open-source [contributors](https://github.com/allweonedev/presentation-ai/graphs/contributors)

## 🔮 Future Plans
- Collaborative editing
- More AI models and image generation options
- Template library
- Voice commands for presentations
- Advanced animation options
- More layout and component options for slides
- Enhanced Plate.js integration for richer slide content

---

Built with ❤️ by the ALLWEONE™ team 🇺🇸🇧🇷🇳🇵🇮🇳

For any questions or support, please open an issue on GitHub or contact us at Discord https://discord.gg/JRcHcaUD
