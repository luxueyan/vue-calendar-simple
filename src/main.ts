// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Calendar from './index'
import locale from './locale/lang/en'
Vue.use(Calendar, {
  locale
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { Calendar },
  template: `<calendar :default-date="defaultDate">
              <template scope="cell">
                 <div class="cs-body__cell__inner">
                    below is all custom elements: <br>
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
