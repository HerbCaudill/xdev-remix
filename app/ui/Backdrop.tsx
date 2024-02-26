import { Fade } from "./transitions/Fade"

export function Backdrop() {
  return (
    <Fade>
      <div className="fixed inset-0 bg-neutral-900/20" />
    </Fade>
  )
}
