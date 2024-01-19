export async function randonPasswordGenerate(char: number): Promise<string> {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-='
  let pass = ''
  for (let x = 0; x < char; x++) {
    const i = Math.floor(Math.random() * chars.length)
    pass += chars.charAt(i)
  }
  return pass
}
