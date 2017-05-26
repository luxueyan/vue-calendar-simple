// declare module '*.vue' {
//   import Vue from 'vue'
//   export default typeof Vue
// }
import Vue from 'vue'

declare module 'vue' {
  export function locale(str: string, obj?: object)
  export const config: {
    lang: string,
    silent: boolean,
    optionMergeStrategies: any,
    devtools: boolean,
    productionTip: boolean,
    performance: boolean,
    errorHandler(err: Error, vm: Vue, info: string): void,
    ignoredElements: string[],
    keyCodes: {
      [key: string]: number
    }
  }
}

declare namespace Calendar {
  export interface InstallOpt {
    locale?: object,
    i18n?: Function
  }
}

export default Calendar
