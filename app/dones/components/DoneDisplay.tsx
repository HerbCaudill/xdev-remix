import { useDocument } from "@automerge/automerge-repo-react-hooks"
import { Likes } from "./Likes"
import { useAuth } from "auth/useAuth"
import { DoneData } from "types"

export function DoneDisplay({ className = "", doneId }: Props) {
  const { user } = useAuth()
  const { userId } = user
  const [doneData, changeDoneData] = useDocument<DoneData>(doneId)

  if (doneData === undefined) return null

  const { content, likes } = doneData
  const likesCount = likes?.length ?? 0

  function toggleLike() {
    const newLikes = new Set(likes ?? [])
    if (!newLikes.delete(userId)) newLikes.add(userId)
    changeDoneData(d => {
      d.likes = [...newLikes]
    })
  }

  return (
    <li className={cx(className, "done-entry cursor-pointer hover:bg-white")} onClick={toggleLike}>
      <span className="whitespace-pre-line">{content}</span>
      {likesCount ?
        <Likes likes={likes} />
      : null}
    </li>
  )
}

type Props = {
  className?: string
  doneId: AutomergeUrl
}
