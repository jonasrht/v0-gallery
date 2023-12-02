import { TypographyProps } from "@/interfaces/typography-props";

export function TypographySmall({ children }: TypographyProps) {
	return <small className="text-sm font-medium leading-none text-black/70">{children}</small>;
}
