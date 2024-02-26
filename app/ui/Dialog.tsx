import { Backdrop } from "./Backdrop"
import { Fade } from "./transitions/Fade"

export function Dialog({
  isOpen,
  title,
  onClose = () => {},
  children,
  buttons,
  initialFocus,
}: Props) {
  return (
    <Headless.Transition.Root show={isOpen} as={Fragment}>
      <Headless.Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <Backdrop />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Fade>
              <Headless.Dialog.Panel
                className={cx([
                  "my-8 w-full max-w-lg p-6",
                  "relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all",
                ])}
              >
                <div className="flex flex-col">
                  <Headless.Dialog.Title
                    as="h3"
                    className="-mx-6 border-b px-6 pb-4 text-lg font-medium leading-6 text-neutral-900"
                    children={title}
                  />
                  <div className="mt-4 text-sm text-neutral-500">{children}</div>
                </div>
                <div className="mt-5 flex flex-row justify-end space-x-2">{buttons}</div>
              </Headless.Dialog.Panel>
            </Fade>
          </div>
        </div>
      </Headless.Dialog>
    </Headless.Transition.Root>
  )
}

type Props = {
  isOpen: boolean
  title: string
  onClose?: () => void
  children: React.ReactNode
  buttons: React.ReactNode
  initialFocus?: React.RefObject<HTMLElement>
}
