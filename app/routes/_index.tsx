import { Transition, Dialog } from "@headlessui/react"
import { Outlet } from "@remix-run/react"
import { Fragment, useState } from "react"
import { Sidebar } from "~/components/Sidebar"
import { Fade } from "~/transitions/Fade"
import { Slide } from "~/transitions/Slide"

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const ShowSidebarButton = () => (
    <div className="absolute top-0 z-40 flex items-center h-12 w-12 pl-4 lg:hidden border-r">
      <button
        type="button"
        className="text-gray-700"
        title="Open sidebar"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <IconMenu2 className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )

  const CloseSidebarButton = () => (
    <div className="absolute left-full top-0 flex w-12 justify-center pt-2">
      <button type="button" className="p-1" onClick={() => setSidebarOpen(false)}>
        <span className="sr-only">Close sidebar</span>
        <IconCircleX className="h-6 w-6 text-white" aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <>
      <div>
        {/* slideout sidebar */}
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Fade>
              <Backdrop />
            </Fade>
            <div className="fixed inset-0 flex">
              <Slide>
                {/* sidebar container */}
                <Dialog.Panel className="flex w-full max-w-[12em]">
                  <Fade>
                    {/* close button */}
                    <CloseSidebarButton />
                  </Fade>
                  {/* sidebar */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
                    <Sidebar />
                  </div>
                </Dialog.Panel>
              </Slide>
            </div>
          </Dialog>
        </Transition.Root>

        <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-[12em] lg:flex-col`}>
          <Sidebar />
        </div>

        {/* show sidebar button */}
        <ShowSidebarButton />

        {/* page */}
        <main className={`lg:pl-[12em] h-screen w-full flex flex-col gap-2 pb-2`}>
          <Outlet />{" "}
        </main>
      </div>
    </>
  )
}

const Backdrop = () => {
  return <div className="fixed inset-0 bg-gray-900/80" />
}
