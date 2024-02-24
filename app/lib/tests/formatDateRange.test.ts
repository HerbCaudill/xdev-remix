import { LocalDate } from "@js-joda/core"
import { formatDateRange } from "../formatDateRange"

describe("formatDateRange", () => {
  const testCase = (
    startOfWeek: string,
    endOfWeek: string,
    expected: string
  ): void => {
    const actual = formatDateRange(
      LocalDate.parse(startOfWeek),
      LocalDate.parse(endOfWeek)
    )
    expect(actual).toEqual(expected)
  }

  describe("Weeks within the same month", () => {
    test.each([
      ["2023-01-01", "2023-01-07", "January 1 – 7, 2023"],
      ["2023-01-08", "2023-01-14", "January 8 – 14, 2023"],
      ["2023-01-15", "2023-01-21", "January 15 – 21, 2023"],
    ])("%s to %s", testCase)
  })

  describe("Weeks that straddle two months", () => {
    test.each([
      ["2022-01-30", "2022-02-05", "January 30 – February 5, 2022"],
      ["2023-01-29", "2023-02-04", "January 29 – February 4, 2023"],
      ["2023-02-26", "2023-03-04", "February 26 – March 4, 2023"],
    ])("%s to %s", testCase)
  })

  describe("Weeks that straddle two years", () => {
    test.each([
      ["2021-12-26", "2022-01-01", "December 26, 2021 – January 1, 2022"],
      ["2023-12-31", "2024-01-06", "December 31, 2023 – January 6, 2024"],
    ])("%s to %s", testCase)
  })
})
