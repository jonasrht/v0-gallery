import { type TypographyProps } from "@/interfaces/typography-props";

export function TypographyH4({ children, ...props }: TypographyProps) {
  return (
    <h4
      className={
        "scroll-m-20 text-xl font-semibold tracking-tight text-black/80"
      }
      {...props}
    >
      {children}
    </h4>
  );
}
