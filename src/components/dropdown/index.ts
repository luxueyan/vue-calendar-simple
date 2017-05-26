import Vue from 'vue'
import {
  Component,
  Watch,
  Prop
} from 'vue-property-decorator'
import {
  find
} from 'lodash'
import './index.postcss'
const template: Function = require<Function>('./index.pug')

@Component({
  name: 'Dropdown',
  template: template()
})
export default class Dropdown extends Vue {
  opened: boolean = false
  currentItem: Object = {}
  toggleList() {
    this.opened = !this.opened
  }

  itemClick(item) {
    this.currentItem = item
    this.opened = false
    this.$emit('input', item.value)
  }

  @Watch('items', { immediate: true })
  onItemsChange() {
    this.currentItem = find(this.items, v => v.value === this.value) || {}
  }

  @Watch('value')
  onValueChange() {
    this.currentItem = find(this.items, v => v.value === this.value) || {}
  }

  @Prop({ default: '' })
  value: string
  @Prop()
  items: any[]
}
