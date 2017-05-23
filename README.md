# vue-calendar-simple

> A simple calendar

## Dependence

The component depend on loadsh, you need run 'npm install lodash -S' first for regular using.

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

```html

```

## Options

### defaultDate: string(A valid date string) | Date
The Default date to show

### weekDayType 0 or 1
0 mean is sun day is the first day in a week, 1 mean monday is the first day.

### calendarView 0 or 1
0 mean show a whole month days, 1 mean only show a week which the defaultDate is in.

### years
You can customize the select options about years

### months
You can customize the select options about months

## Slots

### default slot
Default slot is a scope slot for a date cell.

### header
You can customize the whole header to replace the default selectors.

## LICENSE

MIT
