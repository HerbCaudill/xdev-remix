export function Listbox<T>({
  onChange = () => {},
  optionData: data,
  button,
  value,
  renderOption: option,
}: Props<T>) {
  return (
    <Headless.Listbox onChange={onChange}>
      {({ open }) => (
        <div className="relative mt-1 min-w-[15em]">
          <Headless.Listbox.Button
            autoFocus={true}
            className={cx([
              "relative w-full cursor-default rounded-md border border-neutral-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm",
              "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ",
              "sm:text-sm",
            ])}
          >
            {button}
          </Headless.Listbox.Button>

          <Headless.Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Headless.Listbox.Options
              className={cx(
                "absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ",
                "ring-1 ring-black ring-opacity-5 focus:outline-none",
                "max-h-[10em]",
                "sm:max-h-max",
              )}
            >
              {data.map(item => (
                <Headless.Listbox.Option
                  key={value(item)}
                  className={({ active }) =>
                    cx(
                      active ? "text-white bg-primary-600" : "",
                      "relative cursor-pointer select-none py-2 pl-3 pr-9",
                    )
                  }
                  value={value(item)}
                >
                  {option(item)}
                </Headless.Listbox.Option>
              ))}
            </Headless.Listbox.Options>
          </Headless.Transition>
        </div>
      )}
    </Headless.Listbox>
  )
}

type Props<T> = {
  button: React.ReactNode
  optionData: T[]
  onChange?: (value: string) => void
  value: (item: T) => string
  renderOption: (item: T) => React.ReactNode
}
