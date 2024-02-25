import { Spinner } from "./Spinner"

export const LoadStatus = ({ objects }: Props) => (
  <div className="grid grid-cols-[20px_1fr] gap-1 p-8 text-sm">
    {Object.keys(objects).map(key => (
      <Fragment key={key}>
        <span className="text-base ">{objects[key] ? "✅" : <Spinner size={15} />}</span>
        <span className="">{key}</span>
      </Fragment>
    ))}
  </div>
)

type Props = {
  objects: Record<string, unknown>
}
