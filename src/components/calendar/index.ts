import Vue from 'vue'
import {
  Component,
  Prop,
  Watch
} from 'vue-property-decorator'
import './index.postcss'
import Dropdown from '../dropdown'
import calendarMatrix from './calendar-matix'
import { WeekdayType, CalendarViewWay } from '../../enums'
import { map } from 'lodash'
const template: Function = require<Function>('./index.pug')

const currentDate = new Date()

@Component({
  name: 'Calendar',
  components: {
    Dropdown
  },
  template: template()
})
export default class Calendar extends Vue {
  CalendarViewWay = CalendarViewWay
  todayDate: number = +new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  calendarMatrix: number[][] = []
  calendarViewMut: number
  activeMonthMut: number
  activeWeekMut: number
  activeYearMut: number
  _defaultDate: Date

  mounted() {
    this._getCalendarMatrix()
  }

  data() {
    if (this.defaultDate instanceof Date) {
      this._defaultDate = this.defaultDate
    } else if (typeof this.defaultDate === 'string') {
      this._defaultDate = new Date(this.defaultDate)
    }

    return {
      calendarViewMut: this.calendarView,
      activeYearMut: this._defaultDate.getFullYear(),
      activeMonthMut: this._defaultDate.getMonth(),
      activeWeekMut: this._getWeekInCurrentMonth(this._defaultDate) || 0
    }
  }

  _getDate(rowIndex: number, day: number) {
    if (day > 0) {
      return new Date(this.activeYearMut, this.activeMonthMut, day)
    } else {
      if (rowIndex === 0) {
        return new Date(this.activeYearMut, this.activeMonthMut - 1, -day)
      }
      return new Date(this.activeYearMut, this.activeMonthMut + 1, -day)
    }
  }

  _getCalendarMatrix(resetWeek?: boolean) {
    this.activeWeekMut = resetWeek ? 0 : this._getWeekInCurrentMonth(this._defaultDate)
    this.calendarMatrix = calendarMatrix(this.activeYearMut, this.activeMonthMut, this.weekDayType)
  }

  _getWeekInCurrentMonth(date: Date) { // 7 is a week days
    let firstRowDays = 0
    if (this.weekDayType === WeekdayType.MondayIsFirst) {
      firstRowDays = 7 - (new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7) + 1
    } else if (this.weekDayType === WeekdayType.SundayIsFirst) {
      firstRowDays = 7 - new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }
    return Math.ceil((date.getDate() - firstRowDays) / 7)
  }

  toggleCalendarView() {
    if (this.calendarViewMut === CalendarViewWay.Week) {
      this.calendarViewMut = CalendarViewWay.Month
    } else {
      this.calendarViewMut = CalendarViewWay.Week
    }
  }

  next() {
    if (this.calendarViewMut === CalendarViewWay.Week) {
      if (this.activeWeekMut < this.calendarMatrix.length - 1) {
        this.activeWeekMut += 1
      } else if (this.activeMonthMut < 11) {
        this.activeMonthMut += 1
        this.activeWeekMut = 0
      } else if (this.activeYearMut < Math.max.apply(null, this.years)) {
        this.activeYearMut += 1
        this.activeMonthMut = 0
        this.activeWeekMut = 0
      } else {
        this.$emit('next-end')
      }
    } else if (this.calendarViewMut === CalendarViewWay.Month) {
      if (this.activeMonthMut < 11) {
        this.activeMonthMut += 1
        this.activeWeekMut = 0
      } else if (this.activeYearMut < Math.max.apply(null, this.years)) {
        this.activeYearMut += 1
        this.activeMonthMut = 0
        this.activeWeekMut = 0
      } else {
        this.$emit('next-end')
      }
    }
  }

  prev() {
    if (this.calendarViewMut === CalendarViewWay.Week) {
      if (this.activeWeekMut > 0) {
        this.activeWeekMut -= 1
      } else if (this.activeMonthMut > 0) {
        this.activeMonthMut -= 1
        this.$nextTick(() => {
          this.activeWeekMut = this.calendarMatrix.length - 1
        })
      } else if (this.activeYearMut > Math.min.apply(null, map(this.years, 'value'))) {
        this.activeYearMut -= 1
        this.activeMonthMut = 11
        this.$nextTick(() => {
          this.activeWeekMut = this.calendarMatrix.length - 1
        })
      } else {
        this.$emit('next-end')
      }
    } else if (this.calendarViewMut === CalendarViewWay.Month) {
      if (this.activeMonthMut > 0) {
        this.activeMonthMut -= 1
        this.$nextTick(() => {
          this.activeWeekMut = this.calendarMatrix.length - 1
        })
      } else if (this.activeYearMut > Math.min.apply(null, map(this.years, 'value'))) {
        this.activeYearMut -= 1
        this.activeMonthMut = 11
        this.$nextTick(() => {
          this.activeWeekMut = this.calendarMatrix.length - 1
        })
      } else {
        this.$emit('next-end')
      }
    }
  }

  get weekShowDays() {
    if (this.weekDayType === WeekdayType.SundayIsFirst) {
      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    } else if (this.weekDayType === WeekdayType.MondayIsFirst) {
      return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  }

  get weeks() {
    const weeks = new Array(6)

    return map(weeks, (v, k) => ({
      name: `第${k + 1}周`,
      value: k
    })).slice(0, this.calendarMatrix.length)
  }

  get filterCalendarMatrix() {
    if (this.calendarViewMut === CalendarViewWay.Week) {
      return this.calendarMatrix.slice(this.activeWeekMut, this.activeWeekMut + 1)
    }

    return this.calendarMatrix
  }

  get calendarClass() {
    return this.calendarViewMut === CalendarViewWay.Week ? 'is-collapse' : ''
  }

  @Watch('activeYearMut')
  onActiveYearMutChange() {
    this._getCalendarMatrix(true)
  }

  @Watch('activeMonthMut')
  onActiveMonthChange() {
    this._getCalendarMatrix(true)
  }

  @Prop({ default: () => currentDate })
  defaultDate: Date | string
  @Prop({ default: WeekdayType.MondayIsFirst })
  weekDayType: number
  @Prop({ default: CalendarViewWay.Week })
  calendarView: number
  @Prop({
    default: () => {
      const years = new Array(11)
      const currentYear: number = currentDate.getFullYear()

      return map(years, (v, k) => ({
        name: `${currentYear - 6 + k}年`,
        value: currentYear - 6 + k
      }))
    }
  })
  years: Object[]
  @Prop({
    default: () => {
      const months = new Array(12)

      return map(months, (v, k) => ({
        name: `${k + 1}月`,
        value: k
      }))
    }
  })
  months: Object[]
}
