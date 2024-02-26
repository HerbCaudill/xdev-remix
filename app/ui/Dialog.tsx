import { Backdrop } from "./Backdrop"
import { Pop } from "./transitions/Pop"

export function Dialog({
  isOpen,
  title,
  onClose = () => {},
  afterLeave = () => {},
  children,
  buttons,
  initialFocus,
}: Props) {
  return (
    <Headless.Transition.Root show={isOpen} as={Fragment} appear={true} afterLeave={afterLeave}>
      <Headless.Dialog
        as="div"
        className="relative z-20"
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <Backdrop />
        <div className="fixed inset-0 z-10 w-screen overflow-y-hidden">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
            <Pop>
              <Headless.Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex flex-col">
                  <Headless.Dialog.Title
                    as="h3"
                    className="-mx-6 border-b px-6 pb-4 text-lg font-semibold leading-6 tracking-tight text-neutral-900"
                    children={title}
                  />
                  <div className="mt-4 text-sm text-neutral-500">{children}</div>
                </div>
                <div className="mt-5 flex flex-row justify-end space-x-2">{buttons}</div>
              </Headless.Dialog.Panel>
            </Pop>
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
  afterLeave?: () => void
  children: React.ReactNode
  buttons: React.ReactNode
  initialFocus?: React.RefObject<HTMLElement>
  zIndex?: number
}
