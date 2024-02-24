import * as Auth from "@localfirst/auth"
import cx from "classnames"
import { useState } from "react"
import type { SharedState, Contact } from "../types"
import { initializeAuthRepo } from "../util/initializeAuthRepo"
import { storeRootDocumentIdOnTeam } from "../util/storeRootDocumentIdOnTeam"
import { type SetupCallback } from "./FirstUseSetup"
import { createDevice } from "../util/createDevice"
import { getInitialContacts } from "../util/getInitialContacts"

export const CreateTeam = ({ userName, onSetup }: Props) => {
  const [teamName, setTeamName] = useState<string>("")

  const createTeam = async () => {
    if (!teamName || teamName.length === 0) return

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
      const contactHandle = repo.create<Contact>(contact)
      contactHandle.change(s => Object.assign(s, contact))
      return contactHandle.documentId
    })

    // Initialize the root document.
    const rootDocHandle = repo.create<SharedState>({
      dones: [],
      contacts: contactDocumentIds,
    })
    const rootDocumentId = rootDocHandle.documentId

    // Store the root document ID on the team so other devices can find it
    storeRootDocumentIdOnTeam(team, rootDocumentId)

    onSetup({ device, user, team, auth, repo })
  }

  return (
    <form
      className={cx(["flex flex-col space-y-4 p-4"])}
      onSubmit={e => {
        e.preventDefault()
        createTeam()
      }}
    >
      <p className="text-center">
        <label htmlFor="teamName">Enter a name for your team:</label>
      </p>

      <div className="m-auto flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <input
          type="text"
          className="textbox-auth flex-grow"
          id="teamName"
          name="teamName"
          autoFocus
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
        />
        <button
          type="submit"
          className="button button-sm button-primary justify-center"
        >
          Create team
        </button>
      </div>
    </form>
  )
}

type Props = {
  userName: string
  onSetup: SetupCallback
}
