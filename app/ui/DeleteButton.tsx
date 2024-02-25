export const DeleteButton = ({ onDestroy }: Props) => {
  return (
    <button
      className={cx("after:content-['❌']", "font-bold text-danger-500", "cursor-pointer")}
      onClick={onDestroy}
    />
  )
}

type Props = {
  onDestroy: () => void
}
