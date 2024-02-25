import { getShareId } from "@localfirst/auth-provider-automerge-repo"
import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { Button } from "../../../components/Button"
import { Dialog } from "../../../components/Dialog"
import { CopyCode } from "./CopyCode"

export const InviteDevice = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [invitationCode, setInvitationCode] = useState<string>()
  const { team } = useAuth()

  // ----- ↑ hooks

  const onCancel = () => setIsOpen(false)

  const inviteDevice = () => {
    const { seed } = team.inviteDevice()
    const shareId = getShareId(team)
    setInvitationCode(`${shareId}${seed}`)
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
          inviteDevice()
        }}
      >
        Add device
      </button>
      <Dialog
        isOpen={isOpen}
        title={`Add device`}
        onClose={onCancel}
        children={
          <div className="flex flex-col space-y-4">
            <p>Enter this code to authorize a new device on your account.</p>
            <CopyCode code={invitationCode!} />
          </div>
        }
        buttons={
          <>
            <Button onClick={onCancel} color="primary">
              Done
            </Button>
          </>
        }
      />
    </>
  )
}
