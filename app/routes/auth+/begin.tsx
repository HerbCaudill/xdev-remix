import { useLocalState } from "hooks/useLocalState"
import { Munge } from "ui/Munge"
import { button } from "ui/cva/button"

export default function UserName() {
  const { updateLocalState } = useLocalState()
  const [userName, setUserName] = useState<string>("")
  const navigate = useNavigate()

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (userName === undefined || userName.length === 0) return
    updateLocalState({ userName })
    navigate("/auth/setup")
  }

  return (
    <form className={cx(["flex flex-col space-y-4 p-4"])} onSubmit={onSubmit} autoComplete="off">
      <p className="text-center">
        <Munge>Enter your first name to get started:</Munge>
      </p>
      <div
        className={cx([
          "m-auto",
          "flex flex-col space-y-2",
          "sm:flex-row sm:space-x-2 sm:space-y-0",
        ])}
      >
        <input
          autoComplete="off"
          type="text"
          autoFocus={true}
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="textbox-auth flex-grow"
          placeholder=""
        />
        <button
          type="submit"
          className={cx(button({ intent: "primary" }), "justify-center sm:justify-stretch")}
        >
          Continue
        </button>
      </div>
    </form>
  )
}
