import { createDevice } from "lib/createDevice"
import { SetupResult, AuthorizeDeviceInfo } from "./types"
import { initializeAuthRepo } from "lib/initializeAuthRepo"
import { parseInvitationCode } from "lib/parseInvitationCode"
import { eventPromise } from "lib/eventPromise"

export const authorizeDevice = async ({
  userName,
  invitationCode,
}: AuthorizeDeviceInfo): Promise<SetupResult> => {
  const device = createDevice(userName) // we'll temporarily use the userName instead of the userId
  const { auth, repo } = await initializeAuthRepo({ device })

  const { shareId, invitationSeed } = parseInvitationCode(invitationCode)
  auth.addInvitation({ shareId, invitationSeed, userName })

  // Once we're admitted, we'll get the Team data and the real User object
  const { team, user } = await eventPromise(auth, "joined")
  device.userId = user.userId

  return { device, user, team, auth, repo }
}
