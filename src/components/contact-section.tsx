"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

export function ContactSection() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            alert("Message sent successfully!");
            form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            alert(error instanceof Error ? error.message : "Failed to send message. Please try again.");
        }
    }

    return (
        <section id="contact" className="py-32 relative z-10">
            <div className="container px-4 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl md:text-8xl font-serif text-white mb-6">Let's Talk.</h2>
                    <p className="text-muted-foreground text-lg font-light">
                        Have a project in mind? Send me a message.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="NAME"
                                                    {...field}
                                                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-6 text-xl text-white focus-visible:ring-0 focus-visible:border-gold transition-colors placeholder:text-white/20"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="EMAIL"
                                                    {...field}
                                                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-6 text-xl text-white focus-visible:ring-0 focus-visible:border-gold transition-colors placeholder:text-white/20"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="TELL ME ABOUT YOUR PROJECT"
                                                className="resize-none bg-transparent border-0 border-b border-white/10 rounded-none px-0 py-6 text-xl text-white focus-visible:ring-0 focus-visible:border-gold transition-colors min-h-[100px] placeholder:text-white/20"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-white text-black hover:bg-gold hover:text-white rounded-full px-12 py-8 text-lg font-bold tracking-widest uppercase transition-all duration-500 w-full md:w-auto">
                                Send Request
                            </Button>
                        </form>
                    </Form>
                </motion.div>
            </div>
        </section>
    );
}
