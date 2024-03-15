export function statusVerify(status: string | undefined | number) {
  if (typeof status === 'string') {
    if (status === 'active' || status === 'true') {
      return 1
    }
    if (status === 'inactive' || status === 'false') {
      return 0
    }
  }

  return null
}
