import { RecurrenceRule } from 'node-schedule'

const jobUserRules: RecurrenceRule = new RecurrenceRule()
jobUserRules.second = 15

export default jobUserRules
