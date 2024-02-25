import { Keys } from "lib/keys"
import { useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import TextareaAutosize from "react-textarea-autosize"

const { enter, escape, up, down, left, right } = Keys

export const DoneInput = ({
  content,
  index,
  isFocused = false,
  onFocus,
  onFocusNext,
  onFocusPrev,
  onDestroy,
  onChange,
}: Props) => {
  // editing mode
  const [editing, setEditing] = useState(false)

  // the content of the done while editing
  const [newContent, setNewContent] = useState(content)

  // handle entering and exiting edit mode
  useEffect(() => {
    // blur when leaving editing mode
    if (!editing) doneInput.current?.blur()
  }, [editing])

  // update the input when the content of the done is modified from elsewhere
  useEffect(() => {
    setNewContent(content)
  }, [content])

  // focus the input when isFocused is true
  useEffect(() => {
    if (isFocused) doneInput.current?.focus()
  }, [isFocused])

  const doneInput = useHotkeys<HTMLTextAreaElement>(
    [enter, escape, up, down, left, right],
    (e, handler) => {
      if (!doneInput.current) return
      const { value, selectionStart } = doneInput.current

      const key = handler.keys?.join("")
      switch (key) {
        case escape: {
          // restore the original content
          setNewContent(content)
          setEditing(false)
          break
        }

        case enter: {
          e.preventDefault()
          setEditing(false)
          onFocusNext()
          break
        }

        case up: {
          if (selectionStart === 0) onFocusPrev()
          break
        }

        case down: {
          if (selectionStart === value.length) onFocusNext()
          break
        }

        default: {
          break
        }
      }
    },
    { enableOnFormTags: true },
  )

  return (
    <TextareaAutosize
      ref={doneInput}
      className="done-entry"
      value={newContent}
      onFocus={() => {
        onFocus(index)
        setEditing(true)
      }}
      onBlur={e => {
        const newContent = e.target.value.trim()

        // if user has removed all the content of the done, delete it
        if (newContent.length === 0) onDestroy()
        // otherwise, update the content
        else onChange(newContent)

        setEditing(false)
      }}
      onChange={e => {
        setNewContent(e.target.value)
      }}
    />
  )
}

export type Props = {
  content: string
  index: number
  isFocused?: boolean
  onFocus: (index: number) => void
  onFocusNext: () => void
  onFocusPrev: () => void
  onDestroy: () => void
  onChange: (content: string) => void
}
