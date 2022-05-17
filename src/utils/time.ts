import { fill_zeros } from "./symbols"
import moment from "moment"

require('moment-precise-range-plugin')

export const format_elapsed_ms = (date: Date): string => {
    const start = moment(date)
    const end = moment()
    const diff = (moment as any).preciseDiff(start, end, true)
    
    return `${fill_zeros(diff.years)}.${fill_zeros(diff.months)}.${fill_zeros(diff.days)} ${fill_zeros(diff.hours)}:${fill_zeros(diff.minutes)}:${fill_zeros(diff.seconds)}`
}