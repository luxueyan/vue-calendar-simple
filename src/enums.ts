/**
 * export const enum WeekdayType is ok, but cannot pass to vue instance for template ,if do this, there is a error
 * error TS2475: 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment.
 * export enum WeekdayType, tslint -c tslint.json ./src/enums.ts no problem,but use eslint(with tslint plugin) there is a error `

✘  http://eslint.org/docs/rules/  Parsing error: Unexpected token
> 1 | export enum WeekdayType {
    |             ^
  2 |   SundayIsFirst,
  3 |   MondayIsFirst
  4 | }
  * For this reason, I have to use object to for a replacement
 */

export const WeekdayType = {
  SundayIsFirst: 0,
  MondayIsFirst: 1
}

export const CalendarViewWay = {
  Month: 0,
  Week: 1
}
