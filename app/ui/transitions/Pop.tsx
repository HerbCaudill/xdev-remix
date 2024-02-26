import { Transition } from "@headlessui/react"

export const Pop = ({ children }: { children: React.ReactNode }) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-8 scale-98"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-8 scale-98"
    >
      {children}
    </Transition.Child>
  )
}
