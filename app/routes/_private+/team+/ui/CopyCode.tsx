import cx from "classnames"
import * as clipboard from "clipboardy"
import { useState } from "react"

export const CopyCode = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex flex-row">
      <pre
        className={
          "flex-grow p-2 border border-gray-200 rounded-md bg-gray-100 text-sm whitespace-pre-wrap"
        }
        children={code}
      />
      <button
        className={cx("ml-2 button button-sm button-white")}
        onClick={e => {
          clipboard.write(code)
          const button = e.target as HTMLButtonElement
          button.blur()
          setCopied(true)
        }}
        disabled={copied}
        children={copied ? "☑︎ Copied" : "📋 Copy"}
        title={copied ? "Code copied" : "Copy code"}
      />
    </div>
  )
}
