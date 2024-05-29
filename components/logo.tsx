import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/ui";

export type LogoProps = ComponentProps<"span">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      {...props}
      className={cn("font-mono text-2xl", className)}
    >
      sin.Next Stack
    </span>
  );
}
