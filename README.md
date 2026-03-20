# GuideAI - AI-Powered Career Assistant

GuideAI is a comprehensive, full-stack career development platform designed to help professionals navigate their career paths with AI-powered insights, resume building, cover letter generation, and interview preparation.

![GuideAI Banner](public/banner.png)

## Key Features

### Industry Insights & Dashboard

- **Market Trends**: Real-time analysis of industry growth, demand levels, and market outlook.
- **Salary Data**: Detailed salary ranges for various roles within your specific industry and location.
- **Top Skills**: Identification of the most in-demand skills to help you stay competitive.
- **Automated Updates**: Background jobs (via Inngest) ensure your dashboard always reflects the latest market conditions.

### AI Resume Builder

- **Interactive Form**: Easy-to-use interface to input your experience, education, and skills.
- **AI Enhancement**: Use Google Gemini to polish and quantify your work experience descriptions.
- **Real-time Preview**: See your resume change in real-time with a professional LaTeX-inspired theme.
- **PDF Export**: Download your completed resume as a clean, professional PDF.

### AI Cover Letter Generator

- **Tailored Content**: Generate professional cover letters specifically tailored to a job description.
- **Smart Formatting**: Follows standard business letter conventions in a clean Markdown format.
- **Customizable Tone**: AI ensures a professional and enthusiastic tone that highlights your unique value.

### Interview Preparation

- **Mock Interviews**: Practice with AI-generated technical and behavioral questions tailored to your industry.
- **Instant Feedback**: Receive detailed feedback on your performance and tips for improvement.
- **Progress Tracking**: Monitor your quiz scores over time to measure your readiness.

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Backend**: [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)) with [Prisma ORM](https://www.prisma.io/)
- **AI Engine**: [Google Gemini AI](https://ai.google.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **Styling**: [Lucide React Icons](https://lucide.dev/), [Sonner Toasts](https://sonner.emilkowal.ski/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A PostgreSQL database (Neon or Supabase recommended)
- A Clerk account for authentication
- A Google AI Studio API Key for Gemini

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/swarup-17/guide-ai.git
    cd guide-ai
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    DATABASE_URL=your_postgres_db_url
    DIRECT_URL=your_direct_db_url

    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Sync Database**:

    ```bash
    npx prisma db push
    npx prisma generate
    ```

5.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to see your app in action!
