import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = contactSchema.parse(body);

        // Check for environment variables
        const user = process.env.EMAIL_USER;
        const pass = process.env.EMAIL_PASS;
        const to = process.env.EMAIL_TO || user;

        if (!user || !pass) {
            console.warn("Contact form submission received, but EMAIL_USER or EMAIL_PASS not configured.");
            console.log("Submission details:", { name, email, message });
            return NextResponse.json(
                {
                    message: "Submission logged (Simulation mode). Set up EMAIL_USER and EMAIL_PASS for real emails.",
                    details: { name, email, message }
                },
                { status: 200 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: user,
                pass: pass,
            },
        });

        const mailOptions = {
            from: user,
            to: to,
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: email,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid form data", details: error.issues }, { status: 400 });
        }
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
