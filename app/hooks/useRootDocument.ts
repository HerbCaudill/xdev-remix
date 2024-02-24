import { useDocument } from "@automerge/automerge-repo-react-hooks"
import { type SharedState } from "../types"
import { assert } from "../util/assert"
import { useLocalState } from "./useLocalState"

export const useRootDocument = () => {
  const { rootDocumentId } = useLocalState()
  assert(rootDocumentId)
  const [rootDocument, changeRootDocument] =
    useDocument<SharedState>(rootDocumentId)
  return [rootDocument, changeRootDocument] as const
}
