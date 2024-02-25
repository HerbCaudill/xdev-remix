const isDev = process.env.NODE_ENV !== "production"

const httpProtocol = isDev ? "http:" : "https:"
const wsProtocol = isDev ? "ws:" : "wss:"

export const host = isDev ? "localhost" : "sync.xdev.devresults.com"
export const port = isDev ? ":3030" : ""
export const server = `${host}${port}`
export const url = `${httpProtocol}//${host}${port}`
export const wsUrl = `${wsProtocol}//${host}${port}`
