import { type AutomergeUrl } from "@automerge/automerge-repo"
import { useDocument } from "@automerge/automerge-repo-react-hooks"
import { useDones } from "routes/_private+/dones+/hooks/useDones"
import { DoneData } from "types/types"
import { DeleteButton } from "routes/_private+/dones+/ui/DeleteButton"
import { DoneInput, type Props as InputProps } from "./DoneInput"
import { Likes } from "./Likes"

export const DoneEditable = ({ id, ...passthruProps }: Props) => {
  const { destroy } = useDones()

  const [doneData, changeDoneData] = useDocument<DoneData>(id)
  if (doneData === undefined) return null
  const { content, likes = [] } = doneData

  const onDestroy = () => {
    destroy(id)
  }

  return (
    <span className="group relative block py-1">
      <DoneInput
        content={content}
        {...passthruProps}
        onDestroy={onDestroy}
        onChange={content => {
          changeDoneData(d => {
            d.content = content
          })
        }}
      />
      <Likes likes={likes} />
      <span className="absolute right-0 top-0 opacity-5 focus:opacity-100 group-hover:opacity-100 ">
        <DeleteButton onDestroy={onDestroy} />
      </span>
    </span>
  )
}

type PassthruProps = Pick<InputProps, "isFocused" | "onFocus" | "onFocusNext" | "onFocusPrev">

export type Props = {
  id: AutomergeUrl
  index: number
} & PassthruProps
