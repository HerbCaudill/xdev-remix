import { ExtendedContact } from "types/types"

export function Avatar({ className = "", size = "md", contact }: Props) {
  return (
    <span
      title={contact.fullName}
      className={cx(
        "overflow-hidden rounded-full border border-white",
        "flex content-center items-center justify-center bg-neutral-500 font-extrabold text-white",
        sizeStyles[size],
        className,
      )}
    >
      {
        contact.avatarUrl.length ?
          // display avatar
          <img src={contact.avatarUrl} />
          // display initial
        : contact.firstName.slice(0, 1).toLocaleUpperCase()
      }
    </span>
  )
}

const sizeStyles = {
  xs: "w-6 h-6",
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-12 h-12",
}

type Props = {
  className?: string
  size?: keyof typeof sizeStyles
  contact: ExtendedContact
}
