export function statusVerify(status: string | undefined) {
  if (status === 'active') {
    return 1
  }
  if (status === 'inactive') {
    return 0
  }
  return null
}
