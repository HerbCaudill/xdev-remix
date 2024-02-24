const protocol = location.protocol
const wsProtocol = protocol.replace("http", "ws")
const isProduction = process.env.NODE_ENV === "production"

export const host = isProduction ? process.env.SYNC_SERVER_URL : "localhost:3030"
if (!host) throw new Error("SYNC_SERVER_URL must be set")

export const wsUrl = `${wsProtocol}//${host}`
