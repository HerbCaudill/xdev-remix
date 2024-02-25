import { LocalDate } from "@js-joda/core"
import { useDones } from "routes/_private+/dones+/hooks/useDones"
import { DAY_OF_MONTH, DAY_OF_WEEK, formatDate } from "lib/formatDate"
import { DoneData } from "types"
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
          "items-center text-center p-2 tracking-tight",
          // mobile: dark line to right, day & date horizontal
          "flex border-r border-r-black border-b ",
          // desktop: dark line below, day & date vertical
          "sm:flex-col sm:border-r-0  sm:border-b-black",
        ])}
      >
        <span className="block flex-1 text-xs font-normal uppercase p-1 text-gray-500">
          {formatDate(date, DAY_OF_WEEK)}
        </span>
        <span
          className={cx([
            "flex justify-center items-center text-xl font-semibold aspect-square rounded-full w-10 text-black-900",
            { "text-white bg-primary-500": isToday },
          ])}
        >
          {formatDate(date, DAY_OF_MONTH)}
        </span>
      </h2>
      <ul className="flex flex-col p-2 divide-y border-b">
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
        <li className="focus-within:border-b py-1">
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
