import { NextRequest, NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        if (!process.env.OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: "API key not configured. Please add OPENROUTER_API_KEY to .env.local" },
                { status: 500 }
            );
        }

        // Prepare context
        const skillsContext = skills.map(g => `${g.category}: ${g.items.join(", ")}`).join("\n");
        const projectsContext = projects.map(p => `- ${p.title}: ${p.description} (Built with: ${p.tags.join(", ")})`).join("\n");

        const systemPrompt = `You are an AI assistant for Vignesh's portfolio website. You help visitors learn about his projects, skills, and experience.
Be friendly, professional, and concise.

VIGNESH'S SKILLS:
${skillsContext}

VIGNESH'S PROJECTS:
${projectsContext}

Guidelines:
- If a user asks about projects, mention specific ones like "E Commerce", "NeurAIQ", or "Sepsis Alert System".
- If a user asks about skills, mention his proficiency in Frontend, Backend, IoT, and AI/ML.
- Keep responses short and helpful (aim for 1-3 sentences to conserve tokens).
- If you don't know something specific, politely direct them to the contact section.`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Vignesh Portfolio",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.3-70b-instruct",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                max_tokens: 150, // Use less tokens per assist
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to generate response from OpenRouter.");
        }

        const text = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response at this moment.";

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to generate response. Please try again." },
            { status: 500 }
        );
    }
}
