import type { App, Component } from 'vue'
import Text from './Text.vue'
import Button from './Button.vue'
import Input from './Input.vue'
import Grid from './Grid.vue'
import GridItem from './GridItem.vue'

const components: Record<string, Component> = {
  Text,
  Button,
  Input,
  Grid,
  GridItem
}

export default {
  install(app: App) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key] as any)
    })
  }
}
