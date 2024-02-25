import { CONTACTS } from "contacts"
import { Contact } from "types"

export const getInitialContacts = (user: User, teamName: string): Contact[] => {
  // HACK: For now, we're going to load the list of DevResults users from a hard-coded list. We'll
  // only do this when (a) the username given is in that list (e.g. "herb" or "fred"), and (2) the
  // team name is "DevResults".
  const currentContact = CONTACTS.find(c => c.userId === user.userName)
  const isDevResults = currentContact && teamName === "DevResults"

  if (isDevResults) {
    return CONTACTS.map(c => {
      // The current user has a real userId, so we'll use that
      return c.userId === user.userName ?
          {
            ...c,
            userId: user.userId,
          }
          // For everyone else, the userId is temporarily their first name in lower case
        : c
    })
  } else {
    // For non-DevResults people trying out the app, they'll be the only person on their team
    return [
      {
        userId: user.userId,
        avatarUrl: "",
        firstName: user.userName,
        lastName: "",
      },
    ]
  }
}
