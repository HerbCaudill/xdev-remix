import { likesDescription } from "../likesDescription"

describe("likesDescription", () => {
  test("sorts names", () => {
    expect(likes("b", "a")).toBe("a and b liked this")
  })

  test("replaces userId with 'you'", () => {
    expect(likes("joe")).toBe("you liked this")
  })

  test("puts 'you' last", () => {
    expect(likes("a", "b", "joe", "z")).toBe("a, b, z, and you liked this")
  })

  test("does not elide anyone", () => {
    expect(likes("a", "b", "c", "d", "e", "f", "g", "h", "i", "j")).toBe(
      "a, b, c, d, e, f, g, h, i, and j liked this"
    )
  })

  // curry the current user to make tests simpler
  function likes(...likers: string[]) {
    return likesDescription(likers, "joe")
  }
})
