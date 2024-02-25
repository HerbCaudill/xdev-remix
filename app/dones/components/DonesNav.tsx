import { useSelectedWeek } from "hooks/useSelectedWeek"

export const DonesNav = () => {
  const start = useSelectedWeek().start.toString()
  const navs = [
    { to: `/dones/me/${start}`, label: "Me" },
    { to: `/dones/team/${start}`, label: "Team" },
  ]

  return navs.map(({ to, label }) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        cx([
          "whitespace-nowrap px-2 border-b-4 text-xs uppercase pb-2",
          {
            "border-primary-500 font-extrabold text-black": isActive,
            "border-transparent text-gray-500 hover:border-gray-300": !isActive,
          },
        ])
      }
    >
      {label}
    </NavLink>
  ))
}
