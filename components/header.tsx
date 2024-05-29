"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ComponentProps } from "@/types/ui";

export type HeaderProps = ComponentProps<"header">;

const links = [
  { title: "Users", href: ROUTES.USERS },
  { title: "Chat", href: ROUTES.CHAT },
];

export function Header({ className, ...props }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      {...props}
      className={cn("flex w-full max-w-full items-center justify-between border-b p-4", className)}
    >
      <Link href={ROUTES.ROOT}>
        <Logo />
      </Link>
      <nav className="flex items-center gap-2">
        {links.map((link) => (
          <Button
            key={link.title}
            asChild
            variant={pathname === link.href ? "default" : "outline"}
            className="transition-none"
          >
            <Link href={link.href}>{link.title}</Link>
          </Button>
        ))}
      </nav>
    </header>
  );
}
