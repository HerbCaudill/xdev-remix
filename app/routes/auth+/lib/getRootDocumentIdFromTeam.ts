export const getRootDocumentIdFromTeam = (team: Team) => {
  // find the last message of type ROOT_DOCUMENT_ID
  const rootDocumentId = team
    .messages<TeamMessage>()
    .filter(message => message.type === "ROOT_DOCUMENT_ID")
    .pop()?.payload
  if (!rootDocumentId) throw new Error("No root document ID found on team")
  return rootDocumentId
}

export type TeamMessage = {
  type: "ROOT_DOCUMENT_ID"
  payload: DocumentId
}
