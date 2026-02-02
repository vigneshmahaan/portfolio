"use client";

import { skills } from "@/data/skills";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export function SkillsSection() {
    return (
        <section id="skills" className="py-24 relative z-10">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-sm font-light tracking-[0.5em] uppercase text-white/40">Technical Proficiency</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10 md:border-l">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 md:p-8 border-b border-white/10 group hover:bg-white/5 transition-colors duration-500 md:border-r`}
                        >
                            <h3 className="text-xs font-mono text-gold mb-6 uppercase tracking-widest opacity-80 group-hover:opacity-100">
                                0{index + 1} / {skillGroup.category}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {skillGroup.items.map((item) => (
                                    <span key={item} className="text-xl font-light text-white/70 group-hover:text-white transition-colors">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
