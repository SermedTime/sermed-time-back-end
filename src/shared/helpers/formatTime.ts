export function formatTime(date: string): string {
  if (!date) return null
  return new Date(date).toISOString().substring(11, 16)
}
