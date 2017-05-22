// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
