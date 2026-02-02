import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured. Please add GEMINI_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare context
        const skillsContext = skills.map(g => `${g.category}: ${g.items.join(", ")}`).join("\n");
        const projectsContext = projects.map(p => `- ${p.title}: ${p.description} (Built with: ${p.tags.join(", ")})`).join("\n");

        const context = `You are an AI assistant for Vignesh's portfolio website. You help visitors learn about his projects, skills, and experience.
Be friendly, professional, and concise.

VIGNESH'S SKILLS:
${skillsContext}

VIGNESH'S PROJECTS:
${projectsContext}

Guidelines:
- If a user asks about projects, mention specific ones like "E Commerce", "NeurAIQ", or "Sepsis Alert System".
- If a user asks about skills, mention his proficiency in Frontend, Backend, IoT, and AI/ML.
- Keep responses short and helpful.
- If you don't know something specific, politely direct them to the contact section.
`;

        const prompt = `${context}\n\nUser question: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to generate response. Please try again." },
            { status: 500 }
        );
    }
}
