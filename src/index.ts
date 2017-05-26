import Calendar from './components/calendar'
import locale from './locale'
import CalendarNs from './types/vue/index'

export default {
  install(Vue, opts: CalendarNs.InstallOpt = {}) {
    /* istanbul ignore if */
    if (this.installed) return
    locale.use(opts.locale)
    locale.i18n(opts.i18n)
    Vue.component('Calendar', Calendar)
  }
}
export { Calendar }
