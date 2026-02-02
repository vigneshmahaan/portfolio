"use client";

import { User } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="py-12 md:py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            A little bit about who I am and what I do.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    <div className="flex justify-center">
                        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 bg-muted flex items-center justify-center">
                            <User className="h-32 w-32 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                        <p className="text-lg text-muted-foreground">
                            I am a passionate Full Stack Developer with a knack for building beautiful and functional web applications. With expertise in modern technologies like Next.js, React, and Tailwind CSS, I strive to create user experiences that are both intuitive and visually appealing.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            My journey in web development began with a curiosity for how things work on the internet, and it has since evolved into a career where I solve complex problems through code. I am always eager to learn new tools and improve my skills.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
