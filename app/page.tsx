import { Icons } from "@/components/icons";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import TextReveal from "@/components/magicui/text-reveal";
import WordRotate from "@/components/magicui/word-rotate";
import { ProjectCard } from "@/components/project-card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
    ChevronRight,
    GlobeIcon,
    MailIcon,
    PhoneIcon,
    Youtube,
} from "lucide-react";
import Link from "next/link";

const contact = {
    email: "hello@example.com",
    tel: "+123456789",
    social: [
        {
            name: "GitHub",
            url: "https://github.com/madhukarkumar",
            icon: GitHubLogoIcon,
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/madhukarkumar",
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
                    <title>LinkedIn</title>
                    <path
                        fill="currentColor"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                </svg>
            ),
        },
        {
            name: "X",
            url: "https://x.com/",
            icon: (props: React.SVGProps<SVGSVGElement>) => (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
                    <title>X</title>
                    <path
                        fill="currentColor"
                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                    />
                </svg>
            ),
        },
        {
            name: "Youtube",
            url: "https://youtube.com/",
            icon: Youtube,
        },
    ],
};


export default function Component() {
    return (
        <main className="flex flex-col min-h-[100dvh] divide-y">
            <section className="w-full py-12 md:py-24 lg:py-32 ">
                <div
                    className="container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Hi, I&apos;m Madhukar 👋
                            </h1>
                            <span className="max-w-[600px] md:text-xl">
                I&apos;m a creator with an interest in{" "}
                                <WordRotate
                                    className="inline-flex w-full text-left font-bold leading-none tracking-tighter"
                                    words={[
                                        "Web Development.",
                                        "Writing",
                                        "AI Apps.",
                                        "Databases.",
                                        "Full stack apps.",
                                        "Marketing technologies.",
                                        "PLG.",
                                    ]}
                                />
              </span>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link
                                href="#"
                                className={cn(
                                    buttonVariants({
                                        size: "lg",
                                    }),
                                    "gap-2 whitespace-pre md:flex",
                                    "group relative gap-1 overflow-hidden rounded-full text-base font-semibold tracking-tighter",
                                    "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                                )}
                            >
                                View My Work
                                <ChevronRight
                                    className="h-4 w-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1"/>
                            </Link>
                            <Link
                                href="mailto:hello@example.com"
                                target="_blank"
                                className={cn(
                                    buttonVariants({
                                        variant: "secondary",
                                        size: "lg",
                                    }),
                                    "gap-2 whitespace-pre md:flex",
                                    "group relative gap-1 overflow-hidden rounded-full text-base font-semibold tracking-tighter"
                                )}
                            >
                                Contact Me
                                <ChevronRight
                                    className="h-4 w-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1"/>
                            </Link>
                        </div>
                        <div className="flex gap-x-1 pt-1 font-sans text-sm text-muted-foreground print:hidden">
                            {contact.email ? (
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button
                                            className="size-8"
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <a href={`mailto:${contact.email}`}>
                                                <MailIcon className="size-4"/>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Email</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : null}
                            {contact.tel ? (
                                <Tooltip>
                                    <TooltipTrigger>
                                        {" "}
                                        <Button
                                            className="size-8"
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <a href={`tel:${contact.tel}`}>
                                                <PhoneIcon className="size-4"/>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Phone</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : null}
                            {contact.social.map((social) => (
                                <Tooltip key={social.name}>
                                    <TooltipTrigger>
                                        <Button
                                            className="size-8"
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <a href={social.url}>
                                                <social.icon className="size-4"/>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{social.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </div>

                    </div>
            </section>




        </main>
    );
}
