import type { AutomergeUrl, DocumentId } from "@automerge/automerge-repo"
import type { AuthProvider, ShareId } from "@localfirst/auth-provider-automerge-repo"

/** Unix timestamp (nominal type) */
export type Timestamp = number & { __timeStamp: true }

/** ExtendedArray is the type of an array inside an Automerge change function. Automerge adds the
 * utility functions `insertAt` and `deleteAt`. */
export type ExtendedArray<T> = {
  insertAt(index: number, ...args: T[]): ExtendedArray<T>
  deleteAt(index: number, numDelete?: number): ExtendedArray<T>
} & T[]

/** SharedState is the type of the root document in our Automerge Repo. */
export type SharedState = {
  dones: AutomergeUrl[] // TODO: replace AutomergeUrl with DocumentId throughout
  contacts: DocumentId[]
}

/** AuthState contains data about our @localfirst/auth user, device, and team */
export type AuthState = {
  device: DeviceWithSecrets
  user: UserWithSecrets
  team: Team
  auth: AuthProvider
}

/** LocalState contains any non-shared state data that we want to persist in local storage.  */
export type LocalState = {
  userName?: string // the user's name (not the same as the user's id)
  device?: DeviceWithSecrets // the local lf/auth device
  user?: UserWithSecrets // the local lf/auth user
  shareId?: ShareId // truncated lf/auth team id
  rootDocumentId?: DocumentId
}

/** An individual "done" item. */
export type DoneData = {
  id: AutomergeUrl
  content: string
  userId: string
  date: string
  likes: string[] // userId is string right now (will be AutomergeUrl eventually)

  // At some point will want to be associate Dones with projects or clients
  // clientId: string // subdomain? projectId?

  timestamp: Timestamp
}

/**
 * To add a Done, you need content, date and userId.
 */
export type PartialDoneData = Omit<
  // Likes are optional (defaults to empty array)
  Optional<DoneData, "likes">,
  // You don't provide url or timestamp, because those are generated
  "id" | "timestamp"
>

/** The contact record of a user. */
export type Contact = {
  userId: string
  avatarUrl: string
  firstName: string
  lastName: string
  // TODO: add all the fields in the staff directory

  /** If this contact has been invited to the team, we store the invitation id so that when they're
   * admitted we can associate their localfirst/auth user with this contact */
  invitationId?: Base58
}

export type Icon = (props: React.SVGProps<SVGSVGElement>) => React.ReactElement

export type NavItem = {
  name: string
  to: string
  icon: Icon
}

// TYPE UTILITIES

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>
