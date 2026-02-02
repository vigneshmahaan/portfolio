"use client";
import Link from "next/link";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TypingEffect = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        if (index === words.length) return;

        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt((Math.random() * 350).toString())));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    return (
        <span className="text-primary font-mono drop-shadow-[0_0_10px_rgba(var(--primary),0.2)]">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </span>
    );
};

export function Hero() {
    return (
        <section className="min-h-screen pt-5 pb-12 px-4 md:px-6 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full md:h-[600px]"
            >
                {/* Main Intro Block - Spans 2 cols, 2 rows */}
                <div className="col-span-1 md:col-span-2 md:row-span-2 bento-card p-8 flex flex-col justify-between group">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm text-foreground/60 dark:text-muted-foreground font-mono">Available for new projects</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                            I'm Vigneshwaran.
                        </h1>
                        <div className="text-xl md:text-2xl text-foreground/60 dark:text-muted-foreground h-8 font-light">
                            I build <TypingEffect words={["Scalable Web Apps", "AI Solutions", "IoT Systems", "The Future"]} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-foreground/70 dark:text-muted-foreground max-w-lg">
                            Full Stack Developer & AI Engineer crafting premium digital experiences.
                            Specialized in Next.js, Python, and scalable architecture.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#projects">
                                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
                                    View Projects
                                </button>
                            </Link>
                            <Link href="/Vignesh_resume.pdf" target="_blank">
                                <button className="border border-foreground/10 bg-foreground/5 px-6 py-2 rounded-full font-medium hover:bg-foreground/10 transition-colors flex items-center gap-2">
                                    <Download className="w-4 h-4" /> CV
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-500"></div>
                </div>

                {/* Location Block */}
                <div className="bento-card p-6 flex flex-col justify-between hover:border-primary/50 group">
                    <div className="flex justify-between items-start">
                        <MapPin className="text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-xs font-mono text-muted-foreground bg-foreground/5 px-2 py-1 rounded">LOC</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground">Based in</h3>
                        <p className="text-muted-foreground">Madurai,Tamil Nadu, India</p>
                    </div>
                </div>

                {/* Socials Block */}
                <div className="bento-card p-6 flex flex-col justify-center gap-6 group">
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="https://github.com/vigneshmahaan" target="_blank" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-5 h-5" />
                            <span className="text-sm">Github</span>
                        </Link>
                        <Link href="https://www.linkedin.com/in/vigneshwaran-b-9963b1317/" target="_blank" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm">LinkedIn</span>
                        </Link>

                        <Link href="mailto:sparrowb457@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                            <Mail className="w-5 h-5" />
                            <span className="text-sm">Email</span>
                        </Link>
                    </div>
                </div>

                {/* Tech Stack Preview */}
                <div className="col-span-1 md:col-span-3 bento-card p-6 flex items-center justify-between gap-4 overflow-hidden group">
                    <span className="text-sm font-mono text-muted-foreground text-nowrap">Trusted Tech Stack</span>
                    <div className="flex gap-4 items-center opacity-50 group-hover:opacity-100 transition-opacity mask-linear-gradient">
                        {["React", "Next.js", "TypeScript", "Python", "Tailwind", "Node.js", "Docker", "AWS"].map((tech) => (
                            <span key={tech} className="text-sm font-bold text-muted-foreground px-3 py-1 border border-foreground/10 rounded-full bg-foreground/5">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
