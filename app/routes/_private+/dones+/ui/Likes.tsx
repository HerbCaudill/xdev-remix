import { useAuth } from "context/auth/useAuth"
import { likesDescription } from "../lib/likesDescription"

export function Likes({ likes }: Props) {
  const { user } = useAuth()
  const { userId } = user

  const numLikes = likes?.length ?? 0
  if (numLikes === 0) return null

  return (
    <span
      className="block font-sans text-xs text-neutral-500"
      title={likesDescription(likes, userId)}
    >
      👍🏿<span className="pl-1">{numLikes}</span>
    </span>
  )
}

type Props = {
  likes: string[]
}
