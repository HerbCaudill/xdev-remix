export const Slide = ({ children }: { children: React.ReactNode }) => {
  return (
    <Headless.Transition.Child
      as={Fragment}
      enter="transition ease-in-out duration-200 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-200 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      {children}
    </Headless.Transition.Child>
  )
}
