import { useTeam } from "routes/auth+/hooks/useTeam"
import { NavItem } from "types/types"
import { Avatar } from "ui/Avatar"
import { Loading } from "ui/Loading"

export function Sidebar() {
  const { self } = useTeam()
  if (self === undefined) return <Loading />

  const navigation: NavItem[] = [
    { name: "Dones", to: "/dones/me", icon: IconDiscountCheck },
    { name: "Cadence", to: "/cadence", icon: IconRun },
    { name: "Hours", to: "/hours", icon: IconCalendarSmile },
    { name: "Weekly", to: "/weekly", icon: IconListCheck },
  ]

  const userNavigation: NavItem[] = [
    { name: "Settings", to: "/settings", icon: IconAdjustments },
    { name: "Team", to: "/team", icon: IconUsersGroup },
    { name: "Profile", to: "/profile", icon: IconUser },
    { name: "Sign out", to: "/auth/signout", icon: IconLogout2 },
  ]

  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto bg-neutral-50 pb-2">
      {/* avatar & name */}
      <div className="flex h-12 flex-row items-center border-b px-2">
        <span className="w-11">
          <Avatar size="xs" userId={self.userId} className="mx-auto" />
        </span>
        <span className="truncate text-sm text-black">{self.fullName}</span>
      </div>

      {/* app navigation */}
      <div className="grow">
        <NavLinks items={navigation} />
      </div>

      {/* user navigation (bottom of sidebar) */}
      <NavLinks items={userNavigation} />
    </div>
  )
}

const NavLinks = ({ items }: { items: NavItem[] }) => {
  return (
    <nav>
      <ul role="list" className="flex-col gap-y-2">
        {items.map(item => (
          <li key={item.to} className="py-2">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cx("flex items-center border-l-4 px-2 text-sm leading-6", {
                  "border-l-primary-500 bg-neutral-50 font-bold text-black": isActive,
                  "border-l-transparent text-neutral-500 hover:border-l-neutral-500": !isActive,
                })
              }
            >
              <div className="w-10">
                <item.icon className="mx-auto h-5 w-5" aria-hidden="true" />
              </div>
              <div>{item.name}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
