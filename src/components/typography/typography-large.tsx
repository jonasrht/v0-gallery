import { TypographyProps } from "@/interfaces/typography-props";
import { cn } from "@/lib/utils";

export function TypographyLarge({ children, className }: TypographyProps) {
	return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}
