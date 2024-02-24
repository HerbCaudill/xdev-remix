export default function Auth() {
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center pb-[10%]">
      <div className="w-full max-w-2xl border border-neutral-300 rounded-lg bg-white p-8">
        {<Outlet />}
      </div>
    </div>
  )
}

type Props = {
  children: React.ReactNode
}
