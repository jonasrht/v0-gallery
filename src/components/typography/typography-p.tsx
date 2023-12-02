import { TypographyProps } from "@/interfaces/typography-props";

export function TypographyP({ children, className }: TypographyProps) {
	return (
		<p className={`${className} leading-7 [&:not(:first-child)]:mt-2`}>
			{children}
		</p>
	);
}
