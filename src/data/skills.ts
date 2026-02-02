import { Code2, Database, Layout, Server, Settings, Smartphone, Cpu, Brain, Bot } from "lucide-react";


export const skills = [
    {
        category: "Frontend",
        icon: Layout,
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    },
    {
        category: "Backend",
        icon: Server,
        items: ["Node.js", "Express", "PostgreSQL", "Prisma", "GraphQL", "Python"],
    },
    {
        category: "IoT",
        icon: Cpu,
        items: ["Arduino IDE", "ESP32", "ESP8266", "Raspberry Pi", "Sensors & Actuators", "MQTT"],
    },
    {
        category: "AI & ML",
        icon: Brain,
        items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Generative AI"],
    },
    {
        category: "Automation",
        icon: Bot,
        items: ["Selenium", "Playwright", "Python Scripting", "GitHub Actions", "Zapier"],
    },
    {
        category: "Tools & DevOps",
        icon: Settings,
        items: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Jest"],
    },
];

// Force rebuild
