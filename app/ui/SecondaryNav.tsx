import { NavLink } from "react-router-dom"

export function SecondaryNav({ heading, items = [] }: Props) {
  return (
    <div className="z-10 flex h-12 w-full shrink-0 flex-row items-stretch gap-2 border-b pt-2 max-lg:pl-12">
      <h1 className="mr-4 flex items-center border-b-4 border-transparent px-4 text-lg font-bold tracking-tight text-black">
        <span>{heading}</span>
      </h1>
      {items.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cx([
              "flex items-center whitespace-nowrap border-b-4 px-2 text-xs uppercase",
              {
                "border-primary-500 font-extrabold text-black": isActive,
                "border-transparent text-gray-500 hover:border-gray-300": !isActive,
              },
            ])
          }
        >
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  )
}

type Props = {
  heading: React.ReactNode
  items?: Array<{ to: string; label: string }>
}
