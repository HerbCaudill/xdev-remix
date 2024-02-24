/**
 * Intersperses zero-width spaces in certain words to make them illegible to password managers like
 * 1Password. This is probably terrible for screen readers...
 */
export const NoPasswordManager = ({ children }: { children: string }) => {
  const magicWords = ["name", "email", "address", "phone", "password", "code"]
  const munge = (word: string) => word.split("").join("&ZeroWidthSpace;")
  const munged = magicWords.reduce(
    (result, magicWord) => result.replace(new RegExp(magicWord, "gi"), munge(magicWord)),
    children,
  )
  return <span dangerouslySetInnerHTML={{ __html: munged }} />
}
