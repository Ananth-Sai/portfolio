import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import ProjectModel from '@/models/Projects';

export async function POST(req: Request) {
  try {
    // 1. Check if the API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("SERVER ERROR: GEMINI_API_KEY is missing from .env.local");
      return NextResponse.json(
        { answer: "SYSTEM ERROR: API KEY NOT FOUND." },
        { status: 500 }
      );
    }

    const { question } = await req.json();

    // 2. DYNAMIC INGESTION & BALANCED CATEGORIZATION
    let projectsContext = "NO LIVE PROJECTS FOUND.";
    try {
      await connectMongo();
      const dbProjects = (await ProjectModel.find({}).sort({ order: 1 }).lean()) as Record<string, unknown>[];
      if (dbProjects && dbProjects.length > 0) {
        projectsContext = dbProjects.map((p, idx) => {
          const tech = Array.isArray(p.techStack) ? p.techStack.join(", ") : "";
          const bullets = Array.isArray(p.bullets) && p.bullets.length > 0
            ? p.bullets.map(b => `  * ${b}`).join("\n")
            : (Array.isArray(p.points) ? p.points.map(pt => `  * ${pt}`).join("\n") : "");
          const repo = (p.githubUrl || p.link || p.liveUrl || "https://github.com/Ananth-Sai") as string;
          
          // Categorize dynamically based on tech stack & title keywords
          const isAI = /agent|gemini|rag|llm|chroma|critic|synthesizer|evaluator/i.test(`${p.title} ${tech}`);
          const category = isAI ? "Applied AI & Multi-Agent Architecture" : "Full-Stack Web Platform & Distributed Systems";

          return `[PROJECT ${idx + 1}: ${p.title}]
- Category: ${category}
- Subtitle: ${p.subtitle || "N/A"}
- GitHub Link: ${repo}
- Tech Stack: ${tech}
- Architecture & Verified Details:
${bullets}`;
        }).join("\n\n");
      }
    } catch (dbErr) {
      console.warn("Notice: Failed to fetch live projects from MongoDB for ask route:", dbErr);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const candidateModels = [
      'gemini-3.6-flash',
      'gemini-3.5-flash-lite',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-3.5-flash'
    ];

    // 3. PROFESSIONAL KNOWLEDGE BASE & SYSTEM PROMPT
    const systemPrompt = `
You are an articulate, senior-level AI assistant embedded in the portfolio website of Anantha Sai Valluru (Ananth).
Your mission is to represent Ananth's technical qualifications, architectural decisions, and current availability to recruiters, engineering managers, and software engineers.

CORE FACTS & TIMELINE:
- Full Name: Anantha Sai Valluru (Ananth)
- Education:
  * Master of Science in Computer Science, Illinois Institute of Technology, Chicago (Graduated May 2025).
  * Bachelor of Technology in Computer Science and Engineering, SRM University (Graduated May 2023).
- Professional Experience:
  * Nexo Global Inc.: Full Stack Developer (January 2025 - May 2026). Engineered production full-stack architectures, high-performance REST APIs, and responsive web platforms using TypeScript, React, Python, and Node.js. (Note: This role concluded in May 2026).
  * APSSDC: Software Intern (May 2022 - July 2022).
  * 360 Research Foundation: Research Intern (January 2021 - July 2021).
- Current Status & Availability:
  * Ananth concluded his Full Stack Developer tenure at Nexo Global in May 2026.
  * He is CURRENTLY ACTIVELY INTERVIEWING and available immediately for full-time Full-Stack Developer and AI Engineer roles (open to remote, hybrid, or on-site positions).
  * In his current day-to-day, he actively builds, tests, and open-sources advanced software projects spanning both full-stack web platforms and autonomous multi-agent AI systems.

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, Python, C, C++.
- Frontend & UI: React, Next.js, Tailwind CSS, Framer Motion, HTML5, CSS3, Zustand.
- Backend & Distributed: Node.js, FastAPI, Django, RESTful APIs, MongoDB Atlas, PostgreSQL, Redis.
- DevOps, AI & Tools: Docker, Git, GitHub Actions, Pytest, Vitest, Google Gemini API, Postman, Vercel.

LIVE PORTFOLIO PROJECTS (SYNCHRONIZED DYNAMICALLY FROM DATABASE):
${projectsContext}

CONTACT & CONNECT:
- Email: ananthsai0382@gmail.com
- LinkedIn: https://linkedin.com/in/ananth-valluru
- GitHub: https://github.com/Ananth-Sai
- Resume: Tailored resumes available upon request via email or LinkedIn.

RULES FOR RESPONSES:
1. Balanced Portfolio Representation: Always represent Ananth as a versatile engineer skilled in BOTH full-stack web platforms (Next.js, TypeScript, in-memory state engines) and applied multi-agent AI engineering. Never talk only about AI and ignore his full-stack platforms.
2. Banned Buzzwords: DO NOT overuse or repeat the phrase "production-grade", "cutting-edge", or "state-of-the-art". Use concrete engineering verbs instead: built, engineered, architected, benchmarked, shipped, verified.
3. Strict Length Budget: Keep answers concise, punchy, and direct (maximum 2 to 3 short paragraphs, under 180 words total). Get straight to the point without filler.
4. Natural Tone: Speak in clean, articulate, professional English. Absolutely NO robotic headers (NO "RESPONSE:", NO "STATUS: [INFO]", NO "LOCATION:").
5. Direct Links: Whenever discussing a specific project, provide its direct GitHub repository link from the live project list above.
6. Recruiter Call-To-Action: When asked about roles, interviews, or hiring, conclude with a brief, friendly invitation to connect via email (ananthsai0382@gmail.com) or LinkedIn.
7. Plain text only. Do not use markdown bolding (no asterisks).

User Inquiry: "${question}"
`;

    let answerText = '';
    let lastError: unknown = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        answerText = response.text();
        if (answerText && answerText.trim()) {
          break;
        }
      } catch (modelErr) {
        lastError = modelErr;
        console.warn("[Ask API] Model failed or busy. Trying next model in fallback chain...");
      }
    }

    if (!answerText) {
      throw lastError || new Error('All candidate models in the fallback chain were unavailable.');
    }

    return NextResponse.json({ answer: answerText });

  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : String(error);
    console.error("===== GEMINI API ERROR =====");
    console.error(errMessage);
    console.error("============================");

    return NextResponse.json(
      { answer: `UPLINK FAILED: ${errMessage || "Unknown Error"}` },
      { status: 500 }
    );
  }
}

