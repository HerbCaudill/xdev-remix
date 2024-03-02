import { cva } from "class-variance-authority"

const variants = {
  intent: {
    primary: ["bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white"],
    neutral: [
      "bg-white hover:bg-neutral-50 focus:ring-neutral-500 text-neutral-700 border border-neutral-300",
    ],
    danger: ["bg-danger-600 hover:bg-danger-700 focus:ring-danger-500 text-white"],
  },
  size: {
    xs: ["text-xs px-2 py-1"],
    sm: ["text-sm px-2 py-1"],
    md: ["text-sm px-4 py-3"],
    lg: ["text-base px-5 py-3"],
  },
} as const

export const button = cva(
  [
    "inline-flex gap-1 items-center rounded leading-tight whitespace-nowrap",
    "font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-40",
  ],
  {
    variants,
    defaultVariants: {
      intent: "neutral",
      size: "sm",
    },
  },
)

export type IntentVariant = keyof (typeof variants)["intent"]
export type SizeVariant = keyof (typeof variants)["size"]
