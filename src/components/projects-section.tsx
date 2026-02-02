"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ProjectsSection() {
    return (
        <section id="projects" className="py-24 relative z-10 text-center md:text-left">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-sm font-light tracking-[0.5em] uppercase text-foreground/40 mb-4">Selected Works</h2>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent"></div>
                </motion.div>

                <div className="flex flex-col gap-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="group flex flex-col md:flex-row gap-12 items-center"
                        >
                            {/* Text Content */}
                            <div className={`flex flex-col gap-6 md:w-1/2 ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                                <h3 className="text-5xl md:text-7xl font-serif text-foreground group-hover:text-gold transition-colors duration-500 cursor-pointer">
                                    {project.title}
                                </h3>
                                <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-md">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-mono uppercase tracking-widest text-foreground/50 border border-foreground/10 px-3 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-4 flex gap-8 items-center">
                                    {project.link && (
                                        <Link href={project.link} target="_blank" className="flex items-center gap-2 text-foreground text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors">
                                            View Live <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    )}
                                    <Link href={project.github} target="_blank" className="flex items-center gap-2 text-foreground/50 text-sm font-bold uppercase tracking-widest hover:text-foreground transition-colors">
                                        Github
                                    </Link>
                                </div>
                            </div>

                            {/* Floating "Image" Area */}
                            <div className="md:w-1/2 w-full aspect-[4/3] bg-foreground/5 relative overflow-hidden rounded-sm transition-transform duration-700 group-hover:scale-[1.02]">
                                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent"></div>
                                {/* Placeholder Gradient since no real images */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <h4 className="text-9xl font-serif text-foreground/40 select-none group-hover:scale-110 transition-transform duration-700">{index + 1}</h4>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
