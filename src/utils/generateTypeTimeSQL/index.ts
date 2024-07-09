export function generateTypeTimeSQL(timeString: string, date?: string) {
  if (!timeString) {
    return null // Retorna null se a string estiver vazia
  }

  const [hours, minutes] = timeString.split(':').map(Number)

  let dateWithManipulatedTime: Date
  if (date) {
    dateWithManipulatedTime = new Date(date)
  } else {
    dateWithManipulatedTime = new Date()
  }

  dateWithManipulatedTime.setUTCHours(hours, minutes, 0, 0) // Define horas, minutos, segundos, milissegundos

  return dateWithManipulatedTime.toISOString()
}
