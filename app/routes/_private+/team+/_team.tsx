import { TeamMembers } from "./ui/TeamMembers"

export default function Team() {
  return (
    <div>
      <h1 className="px-2 pt-2 text-xl font-bold">Team members</h1>
      <div className="px-2">
        <TeamMembers />
      </div>
    </div>
  )
}
