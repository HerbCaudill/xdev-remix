/**
 * Sorts an array of objects by a given key.
 * @example
 * ```ts
 * contacts.sort(by('firstName'))
 * ```
 */
export const by =
  <T extends Record<string, ConvertibleToString>>(key: keyof T) =>
  (a: T, b: T) => {
    const aVal = a[key].toString() ?? ""
    const bVal = b[key].toString() ?? ""
    return aVal.localeCompare(bVal)
  }

interface ConvertibleToString {
  toString(): string
}
