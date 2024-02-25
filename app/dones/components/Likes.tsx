import { useAuth } from "auth/useAuth"
import { likesDescription } from "dones/likesDescription"

export function Likes({ likes }: Props) {
  const { user } = useAuth()
  const { userId } = user

  const numLikes = likes?.length ?? 0
  if (numLikes === 0) return null

  return (
    <span className="block text-gray-500 text-xs font-sans" title={likesDescription(likes, userId)}>
      👍🏿<span className="pl-1">{numLikes}</span>
    </span>
  )
}

type Props = {
  likes: string[]
}
