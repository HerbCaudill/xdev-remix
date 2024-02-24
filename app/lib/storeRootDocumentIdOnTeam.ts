import type { DocumentId } from "@automerge/automerge-repo"

export const storeRootDocumentIdOnTeam = (team: Team, id: DocumentId) => {
  team.addMessage({ type: "ROOT_DOCUMENT_ID", payload: id })
}
