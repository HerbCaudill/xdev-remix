export const createDevice = (userId: string) => {
  const deviceName = getDeviceNameFromUa()
  const device = Auth.createDevice(userId, deviceName)
  return device
}
