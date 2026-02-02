import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer id="footer" className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Vigneshwaran
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/vigneshmahaan" target="_blank" rel="noreferrer">
                        <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/vigneshwaran-b-9963b1317/" target="_blank" rel="noreferrer">
                        <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                    </Link>

                </div>
            </div>
        </footer>
    )
}
