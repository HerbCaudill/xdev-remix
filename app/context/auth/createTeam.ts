import { createDevice } from "context/auth/createDevice"
import { SetupResult, CreateTeamInfo } from "./types"
import { initializeAuthRepo } from "context/auth/initializeAuthRepo"
import { getInitialContacts } from "context/auth/getInitialContacts"
import { storeRootDocumentIdOnTeam } from "context/auth/storeRootDocumentIdOnTeam"
import { Contact, SharedState } from "types/types"

export const createTeam = async ({ userName, teamName }: CreateTeamInfo): Promise<SetupResult> => {
  // Create new user and device
  const user = Auth.createUser(userName)
  const device = createDevice(user.userId)

  // Create repo and auth provider
  const { auth, repo } = await initializeAuthRepo({ user, device })

  // The auth provider creates a team, registers it with the server, and waits for connection
  const team = await auth.createTeam(teamName)

  // Create contact documents
  const contacts = getInitialContacts(user, teamName)
  const contactDocumentIds = contacts.map(contact => {
    const contactHandle = repo.create(contact as Contact) // missing documentId but we'll fix that
    const { documentId } = contactHandle
    contactHandle.change(s => (s.documentId = documentId))
    return documentId
  })

  // Initialize the root document.
  const rootDocHandle = repo.create<SharedState>({
    dones: [],
    contacts: contactDocumentIds,
  })
  const rootDocumentId = rootDocHandle.documentId

  // Store the root document ID on the team so other devices can find it
  storeRootDocumentIdOnTeam(team, rootDocumentId)

  return { device, user, team, auth, repo }
}
