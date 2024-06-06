import { RecurrenceRule } from 'node-schedule'

const jobUserRules: RecurrenceRule = new RecurrenceRule()
jobUserRules.hour = 23

export default jobUserRules
