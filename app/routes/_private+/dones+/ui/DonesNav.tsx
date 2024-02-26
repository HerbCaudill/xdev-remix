import { useSelectedWeek } from "hooks/useSelectedWeek"
import { SecondaryNav } from "ui/SecondaryNav"

export const DonesNav = () => {
  const start = useSelectedWeek().start.toString()
  return (
    <SecondaryNav
      heading="Dones"
      items={[
        { to: `/dones/me/${start}`, label: "Me" },
        { to: `/dones/team/${start}`, label: "Team" },
      ]}
    />
  )
}
