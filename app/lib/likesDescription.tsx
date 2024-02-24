export function likesDescription(likes: string[], userId: string) {
  const numLikes = likes.length
  const sortedLikes = likes.slice().sort()
  const index = sortedLikes.indexOf(userId)
  if (index >= 0) {
    sortedLikes.splice(index, 1)
    sortedLikes.push("you")
  }

  let title = null
  switch (numLikes) {
    case 1: {
      title = sortedLikes[0]
      break
    }

    case 2: {
      title = sortedLikes.join(" and ")
      break
    }

    default: {
      title = `${sortedLikes.slice(0, numLikes - 1).join(", ")}, and ${
        sortedLikes[numLikes - 1]
      }`
      break
    }
  }

  return title + " liked this"
}
