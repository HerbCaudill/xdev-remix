import cx from "classnames"
import * as clipboard from "clipboardy"
import { useState } from "react"
import { button } from "ui/cva/button"

export const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex flex-row gap-2">
      <pre
        className={
          "flex-grow whitespace-pre-wrap rounded-md border border-neutral-200 bg-neutral-100 p-2 text-sm"
        }
        children={code}
      />
      <button
        className={button()}
        onClick={e => {
          clipboard.write(code)
          const button = e.target as HTMLButtonElement
          button.blur()
          setCopied(true)
        }}
        disabled={copied}
        children={
          copied ?
            <>
              <IconCopyCheck className="size-4" />
              Copied
            </>
          : <>
              <IconCopy className="size-4" />
              Copy
            </>
        }
        title={copied ? "Code copied" : "Copy code"}
      />
    </div>
  )
}
