import { useTeam } from "auth/useTeam"
import { NavItem } from "types"
import { Avatar } from "ui/Avatar"
import { Loading } from "ui/Loading"

export function Sidebar() {
  const { self } = useTeam()
  if (self === undefined) return <Loading />

  const navigation: NavItem[] = [
    { name: "Dones", to: "/dones", icon: IconDiscountCheck },
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
    <div className="flex flex-col overflow-y-auto bg-gray-50 gap-2 pb-2 h-full">
      {/* avatar & name */}
      <div className="flex flex-row items-center px-2 border-b h-12">
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
                cx("px-2 flex items-center text-sm leading-6 border-l-4", {
                  "bg-gray-50 font-bold text-black border-l-primary-500": isActive,
                  "text-gray-500 border-l-transparent hover:border-l-gray-500": !isActive,
                })
              }
            >
              <div className="w-10">
                <item.icon className="h-5 w-5 mx-auto" aria-hidden="true" />
              </div>
              <div>{item.name}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
