import { test } from "@playwright/test"
import { newBrowser } from "./helpers/App"
import { expect } from "@playwright/test"

const { describe } = test

const userName = "herb"
const teamName = "DevResults"
const doneText = "Completed terabytes of coding and compiling"

describe("Dones", () => {
  test("creates a done", async ({ context }) => {
    const alice = await newBrowser(context)
    await alice.createTeam(userName, teamName)

    await alice.createDone(doneText)
    const doneEntry = await alice.firstDoneEntry()
    await expect(doneEntry).toContainText(doneText)
  })

  test("persists a done", async ({ context }) => {
    const alice = await newBrowser(context)
    await alice.createTeam(userName, teamName)

    await alice.createDone(doneText)
    const doneEntry = await alice.firstDoneEntry()
    await expect(doneEntry).toContainText(doneText)

    await alice.page.reload()

    const doneEntryAfterReload = await alice.firstDoneEntry()
    await expect(doneEntryAfterReload).toContainText(doneText)
  })
})
