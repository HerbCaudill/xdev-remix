/**
 * Intersperses zero-width spaces in certain words to make them illegible to password managers like
 * 1Password. This is probably terrible for screen readers...
 */
export const Munge = ({ children }: { children: string }) => {
  const magicWords = ["name", "email", "address", "phone", "password", "code"]
  return <span dangerouslySetInnerHTML={{ __html: munge(children, magicWords) }} />
}

const munge = (text: string, words: string[]) => {
  return words.reduce(
    (result, word) =>
      result.replace(new RegExp(word, "gi"), (word: string) =>
        word.split("").join("&ZeroWidthSpace;"),
      ),
    text,
  )
}
