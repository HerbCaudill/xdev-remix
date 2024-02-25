import { useTeam } from "auth/useTeam"

export const Avatar = ({ className = "", size = "md", userId }: Props) => {
  const { getContact } = useTeam()
  const contact = getContact(userId)
  if (!contact) return null

  return (
    <span
      title={contact.fullName}
      className={cx(
        "inline-block rounded-full border border-white overflow-hidden",
        "bg-gray-500 text-white font-extrabold flex content-center justify-center items-center",
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
  userId: string
}
