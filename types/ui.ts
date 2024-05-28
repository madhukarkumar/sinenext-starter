import { Override } from "@/types/helpers";

export type ComponentProps<
  T extends object | keyof JSX.IntrinsicElements = object,
  K extends object = object,
> = Override<T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : T, K>;
