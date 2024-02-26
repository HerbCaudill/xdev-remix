import { LocalDate } from "@js-joda/core"
import { useDones } from "routes/_private+/dones+/hooks/useDones"
import { DAY_OF_MONTH, DAY_OF_WEEK, formatDate } from "lib/formatDate"
import { DoneData } from "types/types"
import { DoneEditable } from "./DoneEditable"
import { DoneInput } from "./DoneInput"

export const CalendarDay = ({ date, dones }: Props) => {
  const isToday = date.equals(LocalDate.now())

  const { addForCurrentUser } = useDones()

  const [focus, setFocus] = useState<number>(-1)

  useEffect(() => {
    if (isToday) setFocus(dones.length)
  }, [dones.length])

  const focusNext = () => setFocus(f => Math.min(f + 1, dones.length))
  const focusPrev = () => setFocus(f => Math.max(f - 1, 0))

  return (
    <>
      <h2
        className={cx([
          "items-center p-2 text-center tracking-tight",
          // mobile: dark line to right, day & date horizontal
          "flex border-b border-r border-r-black ",
          // desktop: dark line below, day & date vertical
          "sm:flex-col sm:border-r-0  sm:border-b-black",
        ])}
      >
        <span className="block flex-1 p-1 text-xs font-normal uppercase text-neutral-500">
          {formatDate(date, DAY_OF_WEEK)}
        </span>
        <span
          className={cx([
            "text-black-900 flex aspect-square w-10 items-center justify-center rounded-full font-serif text-xl font-extrabold",
            { "bg-primary-500 text-white": isToday },
          ])}
        >
          {formatDate(date, DAY_OF_MONTH)}
        </span>
      </h2>
      <ul className="flex flex-col divide-y border-b p-2">
        {/* existing dones */}
        {dones.map(({ id }, index) => (
          <li key={id}>
            <DoneEditable
              id={id}
              index={index}
              isFocused={focus === index}
              onFocus={setFocus}
              onFocusNext={focusNext}
              onFocusPrev={focusPrev}
            />
          </li>
        ))}
        {/* new done */}
        <li className="py-1 focus-within:border-b">
          <DoneInput
            key={dones.length} // this way we get a new instance after adding a done
            content=""
            isFocused={focus === dones.length}
            index={dones.length}
            onFocus={setFocus}
            onFocusNext={focusNext}
            onFocusPrev={focusPrev}
            onDestroy={() => {}}
            onChange={content => {
              addForCurrentUser(content, date)
              setFocus(dones.length + 1)
            }}
          />
        </li>
      </ul>
    </>
  )
}

type Props = {
  date: LocalDate
  dones: DoneData[]
}
