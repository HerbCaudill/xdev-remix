import { LocalDate } from "@js-joda/core"
import { dummyData } from "data/dummyData"
import { useTeam } from "hooks/useTeam"
import { randomElement } from "lib/randomElement"
import { useRef, useState } from "react"
import { Dialog } from "ui/Dialog"
import { RadioGroup } from "ui/RadioGroup"
import { button } from "ui/cva/button"
import { useDones } from "../hooks/useDones"

export const DoneGenerator = ({ className = "" }: Props) => {
  const { destroyAll, add } = useDones()
  const [isOpen, setIsOpen] = useState(false)

  const { contacts } = useTeam()
  const okButtonRef = useRef(null)

  const weekOptions = ["1", "2", "5", "10", "20", "50", "200"]
  const [weeks, setWeeks] = useState(Number(weekOptions[0]))

  const productivityOptions = [
    { value: ".5", label: "chill" },
    { value: "1", label: "focused" },
    { value: "5", label: "workaholic" },
  ]
  const [productivity, setProductivity] = useState(Number(productivityOptions[1].value))

  const enthusiasmOptions = [
    { value: "0.05", label: <span className="text-xl">🙂</span> },
    { value: "0.1", label: <span className="text-xl">😃</span> },
    { value: "0.5", label: <span className="text-xl">🥰</span> },
  ]
  const [enthusiasm, setEnthusiasm] = useState(Number(enthusiasmOptions[1].value))

  const discardOptions = [
    { value: "true", label: "discard" },
    { value: "false", label: "keep" },
  ]
  const [discard, setDiscard] = useState(true)

  const generateDones = () => {
    if (discard) destroyAll()
    const N = weeks * 7 * productivity * contacts.length
    console.log(`Generating ${N} dones...`)

    let percentComplete = 0
    for (let i = 0; i < N; i++) {
      const currentPercentComplete = Math.floor((i / N) * 10) * 10
      if (currentPercentComplete > percentComplete) {
        percentComplete = currentPercentComplete
        console.log(`${percentComplete}%`)
      }

      const { userId } = randomElement(contacts)
      const date = getRandomWorkday(weeks).toString()
      const content = randomElement(dummyData)
      const likes = contacts.map(u => u.userId).filter(() => Math.random() < enthusiasm)
      add({ content, date, userId, likes })
    }

    console.log("Done")
  }

  const onConfirm = () => {
    generateDones()
    setIsOpen(false)
  }

  const onCancel = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <button
        className={className}
        onClick={() => {
          console.log("clicked")
          setIsOpen(true)
        }}
      >
        Generate data
      </button>
      <Dialog
        isOpen={isOpen}
        title="Generate dummy data"
        onClose={onCancel}
        children={
          <div className="flex flex-col space-y-4">
            <RadioGroup
              label="Weeks"
              initialValue={weeks.toString()}
              onChange={v => {
                setWeeks(Number(v))
              }}
              options={weekOptions}
            />
            <RadioGroup
              label="Productivity"
              initialValue={productivity.toString()}
              onChange={v => {
                setProductivity(Number(v))
              }}
              options={productivityOptions}
            />{" "}
            <RadioGroup
              label="Enthusiasm"
              initialValue={enthusiasm.toString()}
              onChange={v => {
                setEnthusiasm(Number(v))
              }}
              options={enthusiasmOptions}
            />
            <RadioGroup
              label="Existing data"
              initialValue={discard.toString()}
              onChange={v => {
                setDiscard(v === "true")
              }}
              options={discardOptions}
            />
          </div>
        }
        buttons={
          <>
            <button className={button()} onClick={onCancel}>
              Cancel
            </button>
            <button ref={okButtonRef} className={button({ intent: "primary" })} onClick={onConfirm}>
              OK
            </button>
          </>
        }
      />
    </div>
  )
}

/** choose a random workday in the last n weeks */
const getRandomWorkday = (weeks: number): LocalDate => {
  const now = LocalDate.now()
  const days = weeks * 7
  const date = now.minusDays(Math.floor(Math.random() * days))
  return isWeekend(date) ? getRandomWorkday(weeks) : date
}

/** does the given date fall on a weekend? */
const isWeekend = (date: LocalDate) => {
  const dayOfWeek = date.dayOfWeek().value()
  return dayOfWeek === 6 || dayOfWeek === 7
}

type Props = {
  className?: string
}
