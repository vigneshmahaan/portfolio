"use client";

import * as React from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

export function Chatbot() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([
        { id: 1, text: "Hi! I'm your AI assistant. How can I help you today?", sender: "bot" },
    ]);
    const [inputValue, setInputValue] = React.useState("");
    const [offset, setOffset] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById("footer");
            if (!footer) return;
            const rect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight) {
                setOffset(windowHeight - rect.top + 20);
            } else {
                setOffset(0);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = inputValue;
        const newMessage: Message = {
            id: messages.length + 1,
            text: userMessage,
            sender: "user",
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to get response");
            }

            const botResponse: Message = {
                id: messages.length + 2,
                text: data.response,
                sender: "bot",
            };
            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            const errorMessage: Message = {
                id: messages.length + 2,
                text: error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: -offset, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-4 z-50 w-[350px] sm:right-8"
                    >
                        <Card className="h-[500px] flex flex-col gap-0 shadow-xl border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 shrink-0">
                                <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden p-0">
                                <ScrollArea className="h-full p-4">
                                    <div className="flex flex-col gap-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${message.sender === "user"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted"
                                                        }`}
                                                >
                                                    {message.text}
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                                                    <div className="flex gap-1">
                                                        <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                                                        <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                                                        <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 shrink-0">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="flex w-full items-center space-x-2"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: -offset }}
                transition={{ delay: 1, type: "spring" }}
                className="fixed bottom-4 right-4 z-50 sm:bottom-8 sm:right-8"
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg"
                >
                    <MessageCircle className="h-6 w-6" />
                    <span className="sr-only">Open Chat</span>
                </Button>
            </motion.div>
        </>
    );
}
