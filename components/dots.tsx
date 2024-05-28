import { cn } from "@/lib/utils";
import { ComponentProps } from "@/types/ui";

export type DotsProps = ComponentProps<"span">;

export function Dots({ className, ...props }: DotsProps) {
  return (
    <span
      {...props}
      className={cn(
        "absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden text-foreground/10 after:pointer-events-none after:block after:pt-[100%]",
        className,
      )}
    >
      <span className="absolute inset-0 left-0 top-0 -z-10 h-full w-full bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
    </span>
  );
}
