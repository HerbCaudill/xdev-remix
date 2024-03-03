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

      // At this point, we still don't know who we are 😳 - specifically, which contact document is
      // ours. When we were invited, our invitation ID was recorded on our contact document. We can
      // use our invitation seed to derive our invitation ID, and then look up our contact document.

      // Our invitation ID was originally derived from the invitation seed; we can use the same code
      // to derive it again.
      const invitationId = Auth.invitation.deriveId(invitationSeed)

      // Now the tricky part: Finding the contact document that's linked to our invitation.
      // Elsewhere in the app we've encapsulated all this stuff (useTeam etc) but those hooks rely
      // on auth context already existing, and we're being called by AuthContextProvider in order to
      // _create_ that context. But we do have the repo. We can get the root document ID from the
      // team, and look up that document in the repo. It will contain the list of contact IDs, and
      // we can use that to retrieve all the contact documents.

      const rootDocumentId = getRootDocumentIdFromTeam(team)

      const rootDoc = await repo.find<SharedState>(rootDocumentId).doc()
      if (!rootDoc) throw new Error(`Didn't find the root document ${rootDocumentId} in the repo`)

      const contactDocs = await Promise.all(
        rootDoc.contacts.map(id => repo.find<Contact>(id)).map(handle => handle.doc()),
      )

      const ourContactDoc = contactDocs.find(doc => doc?.invitationId === invitationId)
      if (!ourContactDoc)
        throw new Error(`Didn't find a contact doc containing our invitation ID ${invitationId}`)

      // Update the contact document with our new user ID
      const ourContactDocHandle = repo.find<Contact>(ourContactDoc.documentId)
      ourContactDocHandle.change(s => (s.userId = user.userId))

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
