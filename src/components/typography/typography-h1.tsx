import type { TypographyProps } from "@/interfaces/typography-props";

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}
