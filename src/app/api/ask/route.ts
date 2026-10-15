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

    // 2. DYNAMIC INGESTION: Pull live projects directly from MongoDB Atlas
    let projectsContext = "NO LIVE PROJECTS FOUND.";
    try {
      await connectMongo();
      const dbProjects = (await ProjectModel.find({}).sort({ order: 1 }).lean()) as Record<string, unknown>[];
      if (dbProjects && dbProjects.length > 0) {
        projectsContext = dbProjects.map((p, idx) => {
          const tech = Array.isArray(p.techStack) ? p.techStack.join(", ") : "";
          const bullets = Array.isArray(p.bullets) && p.bullets.length > 0
            ? p.bullets.join(" ")
            : (Array.isArray(p.points) ? p.points.join(" ") : "");
          return `[PROJECT ${idx + 1}] ${p.title} (${p.subtitle || ""})\n- DETAILS: ${bullets}\n- TECH STACK: ${tech}`;
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
You are an intelligent, articulate AI assistant embedded in the portfolio website of Anantha Sai Valluru (Ananth).
Your mission is to represent Ananth's professional qualifications, technical projects, work experience, and current availability to recruiters, hiring managers, and engineers.

CORE FACTS & TIMELINE:
- Full Name: Anantha Sai Valluru (Ananth)
- Education:
  * Master of Science in Computer Science, Illinois Institute of Technology, Chicago (Graduated May 2025).
  * Bachelor of Technology in Computer Science and Engineering, SRM University (Graduated May 2023).
- Work Experience:
  * Nexo Global Inc.: Full Stack Developer (January 2025 - May 2026). Engineered production full-stack architectures, high-performance REST APIs, and responsive web platforms using TypeScript, React, Python, and Node.js. (Note: This role concluded in May 2026).
  * APSSDC: Software Intern (May 2022 - July 2022).
  * 360 Research Foundation: Research Intern (January 2021 - July 2021).
- Current Status & Availability:
  * Ananth concluded his Full Stack Developer tenure at Nexo Global in May 2026.
  * He is CURRENTLY ACTIVELY INTERVIEWING and available immediately for full-time Full-Stack Developer and AI Engineer roles (open to remote, hybrid, or on-site positions).
  * Right now, he is focused on building and open-sourcing production-grade multi-agent AI systems, including:
    - DualCode: A closed-loop multi-agent cybernetic code generation engine that pairs a creative Writer Agent with an auditing Critic Agent under a deterministic, zero-LLM orchestrator.
    - Multi-Agent GitHub PR Reviewer: An autonomous bot that fans out parallel Security and Quality critics across untrusted diffs, enforcing deterministic security vetoes and opening automated remediation PRs.
    - InfraDocs AI: An enterprise cloud documentation RAG assistant with hybrid BM25 + dense search and verified boundary-aware refusal policies.

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, Python, C, C++.
- Frontend: React, Next.js, Tailwind CSS, Framer Motion, HTML5, CSS3.
- Backend & Databases: Node.js, FastAPI, Django, RESTful APIs, MongoDB, PostgreSQL, Redis.
- DevOps & Tools: Docker, Git, GitHub Actions, CI/CD, Postman, Vercel.

LIVE PORTFOLIO PROJECTS:
${projectsContext}

CONTACT & CONNECT:
- Email: ananthsai0382@gmail.com
- LinkedIn: https://linkedin.com/in/ananth-valluru
- GitHub: https://github.com/Ananth-Sai
- Resume: Tailored resumes available upon request via email or LinkedIn.

RULES FOR RESPONSES:
1. Speak in clean, articulate, professional English.
2. DO NOT use robotic terminal prefixes or fake system headers (ABSOLUTELY NO 'RESPONSE:', NO 'STATUS: [INFO]', NO 'LOCATION:', NO 'DATA_FEED:'). Answer naturally as a senior engineer would speak.
3. DO NOT claim Ananth is currently employed at Nexo Global. His tenure there ended in May 2026.
4. Keep answers direct, concise, and focused on relevant experience, technical decisions, and verified project outcomes.
5. Respond in plain text only. Do not use markdown asterisks or bold tags.
6. If asked non-professional or personal trivia questions, politely guide the inquiry back to Ananth's technical portfolio and engineering capabilities.

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
        console.warn([Ask API] Model  failed or busy. Trying next model in fallback chain...);
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

