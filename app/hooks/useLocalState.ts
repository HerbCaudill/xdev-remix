import { useLocalStorage } from "@uidotdev/usehooks"
import { LocalState } from "types"

export const useLocalState = () => {
  const initialState: LocalState = {}
  const [state, setState] = useLocalStorage("xdev-localstate", initialState)

  const { userName, user, device, shareId, rootDocumentId } = state

  return {
    userName,
    user,
    device,
    shareId,
    rootDocumentId,

    updateLocalState: (s: Partial<LocalState>) => setState({ ...state, ...s }),
    signOut: () => setState(initialState),
  }
}
