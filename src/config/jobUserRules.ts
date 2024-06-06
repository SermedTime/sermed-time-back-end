import { RecurrenceRule } from 'node-schedule'

const jobUserRules: RecurrenceRule = new RecurrenceRule()
jobUserRules.minute = 0

export default jobUserRules
