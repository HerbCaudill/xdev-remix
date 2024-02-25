export const Button = forwardRef(
  <T extends ButtonTag>(
    {
      children,
      icon,
      size = "sm",
      color = "white",
      className = "",
      center = false,
      tag = "button" as T,
      ...remainingProps
    }: Props<T>,
    ref: RefType<T>,
  ) => {
    const props = {
      // pass ref to underlying element
      ref,

      // add button styles to any classes provided
      className: cx(className, `button button-${size} button-${color}`, {
        "flex justify-center": center,
      }),

      // for buttons, default to type="button" (can be overridden)
      ...(tag === "button" ? { type: "button" } : {}),

      // pass on any other button or anchor props provided
      ...remainingProps,
    }
    return createElement(
      tag,
      props,
      <span className="flex">
        {icon ?
          <span className="text-[1.5em] mr-2">{icon}</span>
        : null}
        {children}
      </span>,
    )
  },
)

type ButtonTag = "button" | "a"

type Props<T extends ButtonTag> =
  // expose all native button or anchor props for maximum flexibility
  JSX.IntrinsicElements[T] & {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    color?: "primary" | "secondary" | "white" | "neutral" | "danger" | "warning"
    tag?: T
    icon?: string
    center?: boolean
  }

type ElementType<T extends ButtonTag> = T extends "button" ? HTMLButtonElement : HTMLAnchorElement //

type RefType<T extends ButtonTag> = React.Ref<ElementType<T>>
