import { withRouter } from "storybook-addon-react-router-v6"
import type { Meta, StoryObj } from "@storybook/react"
import { TeamMembers } from "../TeamMembers"
import { CONTACTS } from "data/contacts"
import { createKeyset, redactKeys } from "@localfirst/auth"
import { Contact, ExtendedContact, InvitationStatus } from "types/types"

const meta: Meta<typeof TeamMembers> = {
  component: TeamMembers,
  parameters: {
    controls: { include: [] },
  },
  args: {},
  decorators: [withRouter],
}

export default meta
type Story = StoryObj<typeof meta>

// STORIES

export const FirstUse = makeStory([
  contact("ritika", { admin: true, self: true }),
  contact("fred"), //
  contact("herb"),
])

export const AllMembers = makeStory([
  contact("ritika", { admin: true, self: true }),
  contact("fred", { member: true }), //
  contact("herb", { member: true }),
])

export const AllAdmins = makeStory([
  contact("ritika", { admin: true, self: true }),
  contact("fred", { admin: true }), //
  contact("herb", { admin: true }),
])

export const SelfIsNotAdmin = makeStory([
  contact("ritika", { member: true, self: true }),
  contact("fred", { admin: true }), //
  contact("herb"),
])

export const PendingInvitation = makeStory([
  contact("ritika", { admin: true, self: true }),
  contact("fred"), //
  contact("herb", { invitationStatus: "PENDING" }),
])

export const RevokedInvitation = makeStory([
  contact("ritika", { admin: true, self: true }),
  contact("fred"), //
  contact("herb", { invitationStatus: "REVOKED" }),
])

export const ExpiredInvitation = makeStory([
  contact("ritika", { admin: true, self: true }),
  contact("fred"), //
  contact("herb", { invitationStatus: "EXPIRED" }),
])

// HELPERS

function makeStory(contacts: ExtendedContact[]): Story {
  return {
    args: {
      contacts,
      self: contacts.find(c => c.isSelf)!,
    },
  }
}

function contact(
  firstName: string,
  {
    admin = false,
    member = false,
    self = false,
    invitationStatus,
  }: {
    admin?: boolean
    member?: boolean
    self?: boolean
    invitationStatus?: InvitationStatus
  } = {},
): ExtendedContact {
  const c = CONTACTS.find(c => c.userId === firstName.toLowerCase())!
  return {
    ...c,
    documentId: `doc-${c.firstName}`,
    fullName: `${c.firstName} ${c.lastName}`,
    isSelf: self,
    isAdmin: admin,
    isMember: member || admin,
    ...(member || admin ?
      {
        keys: redactKeys(createKeyset({ type: "MEMBER", name: "foo" })),
        roles: [],
        devices: [],
      }
    : {}),
    invitationStatus,
  }
}
