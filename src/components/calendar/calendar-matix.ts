import {
  every,
  each,
  range,
  last
} from 'lodash'
import { WeekdayType } from '../../enums'

const rows: number[] = range(6)
const cols: number[] = range(7)

/**
 * [getMatrix get canledar matrix]
 * @param {number}    y [year]
 * @param {number}    m [month, 0-11]
 * @param {number = 0}     w [weekday type, 0 means sunday is first day, 1 mean monday is first day]
 */
function getMatrix(y: number, m: number, w: number) {
  const matrix: number[][] = []
  const date: Date = new Date(y, m)
  const numDays: number = new Date(y, m + 1, 0).getDate() // current month days
  let dayNum: number = 0

  every(rows, function(row: number) {
    let week: number[] = []

    each(cols, function(col: number) {
      let weekday = date.getDay()
      if (row === 0) {
        if (weekday === 0 && w === WeekdayType.MondayIsFirst) weekday = 7
        dayNum = col - weekday + 1 + 1 * w
        week.push(col < (weekday - 1 * w) ? -(new Date(y, m, -(weekday - 1 - col)).getDate()) : dayNum)
      } else {
        dayNum = last(matrix)[6] + col + 1
        week.push(dayNum <= numDays ? dayNum : -(dayNum - numDays))
      }
    })

    if (!row || week[0] > 1) {
      matrix.push(week)
      return true
    }
  })

  return matrix
}

export default function(
  year: number | Date,
  month: number,
  weekType: number = WeekdayType.MondayIsFirst) {
  if (typeof year === 'undefined') year = new Date()

  if (year instanceof Date) {
    return getMatrix(year.getFullYear(), year.getMonth(), weekType)
  } else {
    return getMatrix(year, month, weekType)
  }
}
