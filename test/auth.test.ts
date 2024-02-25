import { expect, test } from "@playwright/test"
import { newBrowser } from "./helpers/App"

test("creates a team", async ({ context }) => {
  const alice = await newBrowser(context)
  await alice.createTeam("Alice", "Alice & friends")
  await alice.expect.toBeLoggedIn("Alice")
})

test("can use the enter key to submit", async ({ context }) => {
  const alice = await newBrowser(context)
  await alice.enterFirstName("Alice")
  await alice.pressEnter()

  // press "create a team"
  await alice.pressButton("Create")

  // provide team name
  await alice.enterTeamName("Alice & friends")
  await alice.pressEnter()

  await alice.expect.toBeLoggedIn("Alice")
})

test("team is persisted", async ({ context }) => {
  const alice = await newBrowser(context)
  await alice.createTeam("Alice", "Alice & friends")
  await alice.expect.toBeLoggedIn("Alice")

  await alice.reload()

  await alice.expect.toBeLoggedIn("Alice")
})

test("logs in with an arbitrary name", async ({ context }) => {
  const reginald = await newBrowser(context)
  await reginald.createTeam("Reginald", "Alice & friends")
  await reginald.expect.toBeLoggedIn("Reginald")
})

test("creates a member invitation", async ({ context }) => {
  const alice = await newBrowser(context)
  await alice.createTeam("Alice", "Alice & friends")
  const invitationCode = await alice.createMemberInvitation()

  expect(invitationCode.length).toBeGreaterThan(12)

  await alice.reload()
  await alice.expect.toBeLoggedIn("Alice")
})

test("uses an invitation to join as member", async ({ context }) => {
  // This ensures that there's more than one team on the sync server, since that was causing
  // intermittent test failures at one point.
  const noise = await newBrowser(context)
  noise.createTeam("noise", `Noise team`)

  const alice = await newBrowser(context)
  await alice.createTeam("Alice", "Alice & friends")

  const invitationCode = await alice.createMemberInvitation()

  const bob = await newBrowser(context)
  await bob.joinAsMember("Bob", invitationCode)

  await bob.expect.toBeLoggedIn("Bob")
})

test("sees new members when they join", async ({ context }) => {
  const alice = await newBrowser(context)
  await alice.createTeam("Alice", "Alice & friends")

  const invitationCode = await alice.createMemberInvitation()

  const bob = await newBrowser(context)
  await bob.joinAsMember("Bob", invitationCode)

  await bob.expect.toBeLoggedIn("Bob")

  // Alice sees Bob in the list of members without needing to reload
  await alice.expect.toSeeMember("Bob")
})

test("uses an invitation to join as device", async ({ context }) => {
  const laptop = await newBrowser(context)
  await laptop.createTeam("Alice", "Alice & friends")

  const invitationCode = await laptop.createDeviceInvitation()
  const phone = await newBrowser(context)
  await phone.joinAsDevice("Alice", invitationCode)

  await phone.expect.toBeLoggedIn("Alice")
})
