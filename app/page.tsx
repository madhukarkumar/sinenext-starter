import { Folder } from "lucide-react";
import Link from "next/link";

import { Dots } from "@/components/dots";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center font-mono">
        <h1 className="text-4xl md:text-6xl lg:text-8xl">sin.Next Stack</h1>
        <p className="mt-4 text-xl md:mt-8 md:text-3xl">
          <span className="text-primary">SingleStore, Elegance SDK & NextJS</span>
          <span className="mt-2 block md:mt-4">For real-time intelligent apps</span>
        </p>
      </div>

      <div className="mt-6 flex items-center gap-4 md:mt-12">
        <Button asChild>
          <Link href={ROUTES.USERS}>CRUD Example</Link>
        </Button>
        <Button asChild>
          <Link href={ROUTES.CHAT}>AI Chatbot</Link>
        </Button>
      </div>

      <Button
        asChild
        variant="outline"
        className="mt-4 items-center gap-1"
      >
        <Link
          href="https://github.com/madhukarkumar/singlestore-prisma-starter"
          target="_blank"
        >
          <Folder className="size-5" />
          Git Repository
        </Link>
      </Button>

      <Dots />
    </main>
  );
}
