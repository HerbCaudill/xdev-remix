import { authorizeDevice } from "./authorizeDevice"
import { createTeam } from "./createTeam"
import { joinTeam } from "./joinTeam"
import { AuthSetupInfo, SetupResult } from "./types"

export const setupAuth = async (setupInfo: AuthSetupInfo): Promise<SetupResult> => {
  switch (setupInfo.action) {
    case "join-team":
      return joinTeam(setupInfo)
    case "authorize-device":
      return authorizeDevice(setupInfo)
    case "create-team":
      return createTeam(setupInfo)
  }
}
