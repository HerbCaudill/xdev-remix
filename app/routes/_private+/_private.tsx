import { DbProvider } from "context/DbProvider"
import { AuthContextProvider } from "routes/auth+/lib/AuthContextProvider"
import { Backdrop } from "ui/Backdrop"
import { ErrorScreen } from "ui/ErrorScreen"
import { Sidebar } from "ui/Sidebar"
import { Fade } from "ui/transitions/Fade"
import { Slide } from "ui/transitions/Slide"

export default function Private() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const ShowSidebarButton = () => (
    <div className="absolute top-0 z-40 flex h-12 w-12 items-center border-r pl-4 lg:hidden">
      <button
        type="button"
        className="text-neutral-700"
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
    <AuthContextProvider>
      <DbProvider>
        <div>
          {/* slideout sidebar */}
          <Headless.Transition.Root show={sidebarOpen} as={"div"}>
            <Headless.Dialog as="div" className="relative z-10 lg:hidden" onClose={setSidebarOpen}>
              <Backdrop />
              <div className="fixed inset-0 flex">
                <Slide>
                  {/* sidebar container */}
                  <Headless.Dialog.Panel className="flex w-full max-w-[12em]">
                    <Fade>
                      {/* close button */}
                      <CloseSidebarButton />
                    </Fade>
                    {/* sidebar */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
                      <Sidebar />
                    </div>
                  </Headless.Dialog.Panel>
                </Slide>
              </div>
            </Headless.Dialog>
          </Headless.Transition.Root>

          <div className={`hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-[12em] lg:flex-col`}>
            <Sidebar />
          </div>

          {/* show sidebar button */}
          <ShowSidebarButton />

          {/* page */}
          <main className={`flex h-screen w-full flex-col gap-2 pb-2 lg:pl-[12em]`}>
            {children}
          </main>
        </div>
      </DbProvider>
    </AuthContextProvider>
  )
}
export function ErrorBoundary() {
  return (
    <Layout>
      <ErrorScreen />
    </Layout>
  )
}
