import { type Repo } from "@automerge/automerge-repo"
import { type AuthProvider } from "@localfirst/auth-provider-automerge-repo"

/** If we're coming back from the auth flow, this is the information we'll have in the transition state */
export type AuthSetupInfo = JoinTeamInfo | AuthorizeDeviceInfo | CreateTeamInfo

export type JoinTeamInfo = {
  action: "join-team"
  userName: string
  invitationCode: string
}

export type AuthorizeDeviceInfo = {
  action: "authorize-device"
  userName: string
  invitationCode: string
}

export type CreateTeamInfo = {
  action: "create-team"
  userName: string
  teamName: string
}

/** After we use the setup info, we'll have everything we need */
export type SetupResult = {
  device: DeviceWithSecrets
  user: UserWithSecrets
  team: Team
  auth: AuthProvider
  repo: Repo
}
