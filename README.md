# vue-calendar-simple

> A simple calendar for vue2.x

## Dependence

The component depend on lodash, you need run 'npm install lodash -S' first for regular using.

## Example

[example](https://luxueyan.github.io/vue-calendar-simple/example/index.html)

## Install

``` bash
npm install vue-calendar-simple -S
```


## Quick Start

```javascript
  import Vue from 'vue'
  import Calendar from './components/calendar'

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    components: { Calendar },
    template: `<calendar :default-date="defaultDate">
                <template scope="cell">
                   <div class="cs-body__cell__inner">
                      {{cell.date.getFullYear()}}-{{cell.date.getMonth() + 1}}-{{cell.date.getDate()}}
                   </div>
                </template>
                </calendar>`,
    data() {
      return {
        defaultDate: new Date(2017, 5, 1)
      }
    }
  })

```


## Options

### defaultDate: string(A valid date string) | Date
The Default date to show

### weekDayType 0 or 1
0 mean Sunday is the first day in a week, 1 mean Monday is the first day.

### calendarView 0 or 1
0 mean show a whole month days, 1 mean only show a week which the defaultDate is in.

### years
You can customize the select options about years,value must be number, e.g.
```javascript
[{
  name: '2017年',
  value: 2017
}. {
  name: '2018年',
  value: 2018
},...]
```

### months
You can customize the select options about months, value must be 0-11, e.g.
```javascript
[{
  name: 'Jan',
  value: 0
}. {
  name: 'Feb',
  value: 1
},...]
```

## i18n

### Directly use

```javascript
import Vue from 'vue'
import Calendar from 'vue-calendar-simple'
import locale from 'vue-calendar-simple/dist/calendar/en'

Vue.use(Calendar, { locale })
```

### Directly use when required

```javascript
import Vue from 'vue'
import Calendar from 'vue-calendar-simple'
import lang from 'vue-calendar-simple/dist/calendar/en'
import locale from 'vue-calendar-simple/dist/calendar/locale'

locale.use(lang)
Vue.component(Calendar)
```

### Use with vue-i18n@5

```javascript
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Calendar from 'vue-calendar-simple'
import enLocale from 'vue-calendar-simple/dist/calendar/en'
import zhLocale from 'vue-calendar-simple/dist/calendar/zh-CN'

Vue.use(VueI18n)
Vue.use(Calendar)

Vue.config.lang = 'zh-cn'
Vue.locale('zh-cn', zhLocale)
Vue.locale('en', enLocale)
```

### Use with vue-i18n@6

```javascript
import Vue from 'vue'
import Calendar from 'vue-calendar-simple'
import VueI18n from 'vue-i18n'
import enLocale from 'vue-calendar-simple/dist/calendar/en'
import zhLocale from 'vue-calendar-simple/dist/calendar/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: {
    message: 'hello',
    ...enLocale // 或者用 Object.assign({ message: 'hello' }, enLocale)
  },
  zh: {
    message: '你好',
    ...zhLocale // 或者用 Object.assign({ message: '你好' }, zhLocale)
  }
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

Vue.use(Calendar, {
  i18n: key => i18n.vm._t(key)
})

new Vue({ i18n }).$mount('#app')
```

## Slots

### default slot
Default slot is a scope slot for a date cell.

### header
You can customize the whole header to replace the default selectors.

## LICENSE

MIT
