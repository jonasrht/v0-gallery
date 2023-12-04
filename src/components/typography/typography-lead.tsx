import { type TypographyProps } from "@/interfaces/typography-props";

export function TypographyLead({ children }: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}
