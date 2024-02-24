import { useHotkeys } from "react-hotkeys-hook"

export const useNavigationHotkey = (keys: string, path: string) => {
  const navigate = useNavigate()
  useHotkeys(keys, e => {
    e.preventDefault()
    navigate(path, { relative: "path" })
  })
}
