import { eventPromise } from "@herbcaudill/eventemitter42"
import { createDevice } from "context/auth/createDevice"
import { getInitialContacts } from "context/auth/getInitialContacts"
import { initializeAuthRepo } from "context/auth/initializeAuthRepo"
import { parseInvitationCode } from "context/auth/parseInvitationCode"
import { storeRootDocumentIdOnTeam } from "context/auth/storeRootDocumentIdOnTeam"
import { Contact, SharedState } from "types/types"
import { AuthSetupInfo, SetupResult } from "./types"
import { getRootDocumentIdFromTeam } from "./getRootDocumentIdFromTeam"

export const setupAuth = async (setupInfo: AuthSetupInfo): Promise<SetupResult> => {
  switch (setupInfo.action) {
    case "join-team": {
      const { userName, invitationCode } = setupInfo

      const user = Auth.createUser(userName) as UserWithSecrets
      const device = createDevice(user.userId)
      const { auth, repo } = await initializeAuthRepo({ user, device })

      const { shareId, invitationSeed } = parseInvitationCode(invitationCode)
      auth.addInvitation({ shareId, invitationSeed, userName })

      // Once we're admitted, we'll get the Team data
      const { team } = await eventPromise(auth, "joined")

      return { device, user, team, auth, repo }
    }

    case "authorize-device": {
      const { userName, invitationCode } = setupInfo

      const device = createDevice(userName) // we'll temporarily use the userName instead of the userId
      const { auth, repo } = await initializeAuthRepo({ device })

      const { shareId, invitationSeed } = parseInvitationCode(invitationCode)
      auth.addInvitation({ shareId, invitationSeed, userName })

      // Once we're admitted, we'll get the Team data and the real User object
      const { team, user } = await eventPromise(auth, "joined")
      device.userId = user.userId

      return { device, user, team, auth, repo }
    }

    case "create-team": {
      const { userName, teamName } = setupInfo

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
  }
}
