import { pause } from "../../app/lib/pause"
import { type BrowserContext, type ConsoleMessage, type Page } from "@playwright/test"
import { expect } from "./expect"

export const newBrowser = async (context: BrowserContext) => {
  const browser = await context.browser()!.newContext()
  const page = await browser.newPage()
  return new App(page).start()
}

export class App {
  userName?: string
  teamName?: string

  constructor(readonly page: Page) {
    this.page = page
  }

  // GENERAL

  log(msg: ConsoleMessage) {
    const text: string = msg.text().replace(/(color: #([0-9A-F]{6}))|(color: inherit)|%c/g, "")
    console.log(text)
  }

  async start() {
    await this.page.goto("/")

    const debug = process.env.DEBUG
    if (debug) {
      // feed browser logs to test output
      this.page.on("console", msg => this.log(msg))

      // enable debug logging
      await this.page.evaluate(`window.localStorage.setItem('debug', '${debug}')`)
      // reload so these take effect
      await pause(500)
      await this.page.reload()
    }
    return this
  }

  async reload() {
    await pause(100) // give storage etc. time to finish
    await this.page.reload()
    return this
  }

  get expect() {
    return expect(this)(this.page)
  }

  async pressButton(name?: string) {
    await this.page.getByRole("button", { name }).click()
  }

  async pressEnter() {
    await this.page.keyboard.press("Enter")
  }

  async enterFirstName(firstName: string) {
    await this.page.getByLabel("first name").fill(firstName)
    this.userName = firstName
  }

  async enterTeamName(teamName: string) {
    await this.page.getByLabel("name for your team").fill(teamName)
    this.teamName = teamName
  }

  async clickUserMenu() {
    await this.page.getByTitle(this.userName!).click()
  }

  async getClipboard() {
    return this.page.evaluate<string>("navigator.clipboard.readText()")
  }

  // AUTH

  async createTeam(userName: string, teamName: string) {
    // provide first name
    await this.enterFirstName(userName)
    await this.pressEnter()

    // press "create a team"
    await this.pressButton("Create")

    // provide team name
    await this.enterTeamName(teamName)
    await this.pressEnter()

    await this.page.getByRole("button", { name: "Clear completed" }).isVisible()
  }

  async createMemberInvitation() {
    await this.clickUserMenu()
    await this.pressButton("Manage team")

    await this.pressButton("Invite members")
    await this.pressButton("Invite")
    await this.pressButton("Copy")
    await this.page.keyboard.press("Escape")
    const invitationCode: string = await this.getClipboard()
    return invitationCode
  }

  async createDeviceInvitation() {
    await this.clickUserMenu()
    await this.pressButton("Add device")
    await this.pressButton("Copy")
    await pause(100)
    await this.page.keyboard.press("Escape")
    const invitationCode: string = await this.getClipboard()
    return invitationCode
  }

  async joinAsMember(userName: string, invitationCode: string) {
    await this.enterFirstName(userName)
    await this.pressButton()

    await this.pressButton("Join a team")

    await this.page.getByLabel("Invitation code").fill(invitationCode)
    await this.pressButton("Join")
  }

  async joinAsDevice(userName: string, invitationCode: string) {
    await this.enterFirstName(userName)
    await this.pressButton()

    await this.pressButton("Authorize this device")

    await this.page.getByLabel("Invitation code").fill(invitationCode)
    await this.pressButton("Join")
  }

  async members() {
    await this.clickUserMenu()
    await this.pressButton("Manage team")

    return this.page.locator("table.MemberTable")
  }

  // DONES

  async firstDoneEntry() {
    return this.page.locator(".done-entry").first()
  }

  async createDone(doneText: string) {
    const doneEntry = await this.firstDoneEntry()
    await doneEntry.click()
    await doneEntry.fill(doneText)
    await doneEntry.press("Tab")
  }
}
