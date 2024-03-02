import { LocalDate } from "@js-joda/core"
import { parse } from "csv-parse/sync"
import { useTeam } from "hooks/useTeam"
import { DoneData } from "types/types"
import { Dialog } from "ui/Dialog"
import { button } from "ui/cva/button"
import { useDones } from "../hooks/useDones"

export const DoneImporter = () => {
  const { contacts } = useTeam()
  const [isOpen, setIsOpen] = useState(false)
  const [importData, setImportData] = useState("")
  const [errors, setErrors] = useState<Error[]>([])
  const [dones, setDones] = useState<DoneData[]>([])

  const { add } = useDones()

  const onImportDataChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const csv = event.target.value
    setImportData(csv)
    try {
      const donesAndErrors = csvToDones(csv)
      setErrors(donesAndErrors.filter(d => d instanceof Error) as Error[])
      setDones(donesAndErrors.filter(d => !(d instanceof Error)) as DoneData[])
    } catch {
      setErrors([])
      setDones([])
    }
  }

  const csvToDones = (csv: string) => {
    const userIds = new Set<string>(contacts.map(c => c.userId))

    const parsed = parse(csv, {
      columns: ["userId", "date", "content"],
      skip_empty_lines: true,
      rtrim: true,
      ltrim: true,
    }) as Array<Pick<DoneData, "userId" | "date" | "content">>

    return parsed.map((d, i) => {
      const line = i + 1
      // check userId
      if (!userIds.has(d.userId)) return new Error(`[Line ${line}] Invalid user: ${d.userId}`)

      // check date
      try {
        LocalDate.parse(d.date)
      } catch {
        return new Error(`[Line ${line}] Invalid date: ${d.date}`)
      }

      // check content
      if (!d.content) return new Error(`[Line ${line}] Empty content`)

      return d
    })
  }

  const onImport = () => {
    for (const d of dones) add(d)
    setIsOpen(false)
  }

  const onCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Import data
      </button>
      <Dialog
        isOpen={isOpen}
        title="Import data"
        onClose={onCancel}
        children={
          <div className="flex flex-col space-y-4">
            <textarea
              className="block border p-2 font-mono text-xs"
              value={importData}
              onChange={onImportDataChange}
              rows={20}
              cols={200}
              placeholder="Enter comma-delimited entries, one per line in this format: &#10;userId,date,content &#10;&#10;Example: &#10;brent,2023-01-27,Added feature X"
            ></textarea>
            <span className="ml-3">
              {errors.length > 0 ?
                <>
                  <p>⚠️ These lines can't be imported:</p>
                  <ul>
                    {errors.map((e, i) => (
                      <li key={i}>{e.message}</li>
                    ))}
                  </ul>
                </>
              : dones.length > 0 ?
                <p>✅ {dones.length} dones will be imported.</p>
              : null}
            </span>
          </div>
        }
        buttons={
          <>
            <button className={button()} onClick={onCancel}>
              Cancel
            </button>
            <button
              onClick={onImport}
              className={button({ intent: "primary" })}
              disabled={dones.length === 0 || errors.length > 0}
            >
              Import
            </button>
          </>
        }
      />
    </>
  )
}
