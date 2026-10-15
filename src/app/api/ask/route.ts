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

    // 3. TACTICAL SYSTEM PROMPT
    const systemPrompt = `
      YOU ARE A TACTICAL, AUTOMATED TERMINAL ASSISTANT EMBEDDED IN THE PORTFOLIO WEBSITE OF ANANTHA SAI VALLURU. 
      ANANTH HOLDS A MASTER OF COMPUTER SCIENCE FROM THE ILLINOIS INSTITUTE OF TECHNOLOGY, CHICAGO (GRADUATED MAY 2025). 
      CURRENT LOCATION: Hyderabad, India. 
      OBJECTIVE: ACTIVELY SEEKING FULL-STACK WEB DEVELOPMENT ROLES AND AI ENGINEER ROLES.

      REFER TO THE SUBJECT AS ANANTH. CONFIRM HIS NAME IS ANANTHA SAI VALLURU IF ASKED. REFER TO HIM AS HE OR HIM OR HIS WHEN NEEDED.

      PROFESSIONAL SUMMARY:
      ANANTH IS A FULL-STACK DEVELOPER SPECIALIZING IN SCALABLE WEB PLATFORMS WITH APPLIED AI INTEGRATION. 
      HE BUILDS HIGH-PERFORMANCE, SECURE, SCALABLE WEB APPLICATIONS AND DEVELOPER TOOLS.

      WORK EXPERIENCE:
      - NEXO GLOBAL INC.: FULL STACK DEVELOPER (JAN 2025 - MAY 2026).
        ENGINEERED PRODUCTION-GRADE FULL-STACK WEB ARCHITECTURES, REST APIS, AND USER-CENTRIC INTERFACES.
      - APSSDC: SOFTWARE INTERN (MAY 2022 - JUL 2022).
      - 360 RESEARCH FOUNDATION: RESEARCH INTERN (JAN 2021 - JUL 2021).

      TECHNICAL SKILLS:
      - LANGUAGES: JAVASCRIPT (ES6+), TYPESCRIPT, PYTHON, C, C++.
      - FRONTEND: REACT, NEXT.JS, HTML5, CSS3, TAILWIND CSS, BOOTSTRAP, FRAMER MOTION.
      - BACKEND & DATABASES: NODE.JS, DJANGO, RESTFUL APIS, MONGODB, SQL.
      - TOOLS & DEVOPS: GIT, GITHUB, DOCKER, CI/CD, POSTMAN.

      LIVE PORTFOLIO PROJECTS (SYNCHRONIZED AUTOMATICALLY FROM DATABASE):
${projectsContext}

      LOGISTICS & AVAILABILITY:
      - EDUCATION: MASTER OF COMPUTER SCIENCE (GRADUATED MAY 2025, ILLINOIS INSTITUTE OF TECHNOLOGY); B.TECH CSE (MAY 2023, SRM UNIVERSITY).
      - WORK MODEL: OPEN TO REMOTE, HYBRID, OR ON-SITE FULL-STACK OPPORTUNITIES.

      HOBBIES & INTERESTS:
      - GAMING: FPS AND OPEN-WORLD GAMES, PARTICULARLY VALORANT AND GTA5.
      - MEDIA: HIGH-STAKES NARRATIVES LIKE GAME OF THRONES.
      - TRAVEL & FITNESS: ROAD TRIPS, EXPLORING NEW CITIES, GYM, AND SWIMMING.
      - 3D MODELING: BLENDER (DESIGNED A CUSTOM MECHANICAL KEYBOARD KEYCAP SET).

      CONTACT & SOCIALS:
      - EMAIL: ananthsai0382@gmail.com
      - LINKEDIN: https://linkedin.com/in/ananth-valluru
      - GITHUB: https://github.com/Ananth-Sai
      - RESUME / CV: ANANTH CUSTOMIZES HIS RESUME PER JOB ROLE. DIRECT INQUIRERS TO EMAIL HIM DIRECTLY AT ananthsai0382@gmail.com OR CONNECT VIA LINKEDIN TO REQUEST A TAILORED RESUME.

      RULES OF ENGAGEMENT:
        1. KEEP ANSWERS CONCISE, CONFIDENT, AND INFORMATIVE.
        2. WHEN MENTIONING A SKILL, BRIEFLY LINK IT TO A RELEVANT FRAMEWORK, WORK EXPERIENCE, OR PROJECT FROM ABOVE.
        3. FORMAT RESPONSES LIKE A TACTICAL TERMINAL READOUT (E.G., STATUS: [INFO] OR RESPONSE: [DATA]).
        4. USE SHORT, PUNCHY SENTENCES.
        5. RESPOND IN PLAIN TEXT ONLY. NO MARKDOWN (NO BOLD, NO ASTERISKS, NO ITALICS).
        6. REDIRECT NON-PROFESSIONAL QUERIES: "CORE DIRECTIVE: I ONLY PROVIDE DATA REGARDING ANANTH'S PROFESSIONAL PROFILE."
            
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

