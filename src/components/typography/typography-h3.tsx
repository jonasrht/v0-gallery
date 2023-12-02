import { TypographyProps } from "@/interfaces/typography-props";
import { cn } from "@/lib/utils";
import { className } from "postcss-selector-parser";

export function TypographyH3({ children }: TypographyProps) {
	return (
		<h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
			{children}
		</h3>
	);
}
