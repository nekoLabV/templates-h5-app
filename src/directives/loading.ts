import type { ObjectDirective } from 'vue'
import { createApp } from 'vue'
import LoadingComp from '@/components/Loading.vue'

const loadingDirective: ObjectDirective = {
  mounted(el, binding) {
    const app = createApp(LoadingComp)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

function append(el: any) {
  el.style.position = 'relative' // 确保遮罩层定位正确
  el.appendChild(el.instance.$el)
}

function remove(el: any) {
  el.removeChild(el.instance.$el)
}

export default loadingDirective
