import { twMerge } from "tailwind-merge"
import { IntentVariant, SizeVariant, button } from "./cva/button"

export function Button({ children, intent = "neutral", size = "md", className, ...props }: Props) {
  return (
    <button className={twMerge(button({ intent: intent, size }), className)} {...props}>
      {children}
    </button>
  )
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode

  /** Is this button intended to signal anything to the user?  */
  intent?: "neutral" | "primary" | "danger"

  /** What size should the button be? */
  size?: "xs" | "sm" | "md" | "lg"

  className?: string
}
