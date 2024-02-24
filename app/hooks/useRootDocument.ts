import { useDocument } from "@automerge/automerge-repo-react-hooks"

export const useRootDocument = () => {
  const { rootDocumentId } = useLocalState()
  assert(rootDocumentId)
  const [rootDocument, changeRootDocument] = useDocument<SharedState>(rootDocumentId)
  return [rootDocument, changeRootDocument] as const
}
