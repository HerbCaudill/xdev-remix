import { AuthState } from "~/types"

export const AuthContext = createContext<AuthState | undefined>(undefined)
