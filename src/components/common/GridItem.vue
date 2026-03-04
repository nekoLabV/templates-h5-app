<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // 占据的列数
  span?: number | string
  // 偏移列数
  offset?: number | string
  // 响应式断点配置
  spanSm?: number | string
  spanMd?: number | string
  spanLg?: number | string
  spanXl?: number | string
  spanXxl?: number | string
  offsetSm?: number | string
  offsetMd?: number | string
  offsetLg?: number | string
  offsetXl?: number | string
  offsetXxl?: number | string
  // 自定义排序
  order?: number
  // 自定义对齐
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch'
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch'
}

const props = withDefaults(defineProps<Props>(), {
  span: 1,
  offset: 0,
  alignSelf: 'auto',
  justifySelf: 'auto'
})

const itemStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.order !== undefined) {
    styles.order = String(props.order)
  }
  
  if (props.alignSelf !== 'auto') {
    styles.alignSelf = props.alignSelf
  }
  
  if (props.justifySelf !== 'auto') {
    styles.justifySelf = props.justifySelf
  }
  
  return styles
})
</script>

<template>
  <div
    class="grid-item"
    :class="[
      `grid-item--span-${span}`,
      `grid-item--offset-${offset}`,
      {
        [`grid-item--span-${spanSm}-sm`]: spanSm,
        [`grid-item--span-${spanMd}-md`]: spanMd,
        [`grid-item--span-${spanLg}-lg`]: spanLg,
        [`grid-item--span-${spanXl}-xl`]: spanXl,
        [`grid-item--span-${spanXxl}-xxl`]: spanXxl,
        [`grid-item--offset-${offsetSm}-sm`]: offsetSm,
        [`grid-item--offset-${offsetMd}-md`]: offsetMd,
        [`grid-item--offset-${offsetLg}-lg`]: offsetLg,
        [`grid-item--offset-${offsetXl}-xl`]: offsetXl,
        [`grid-item--offset-${offsetXxl}-xxl`]: offsetXxl
      }
    ]"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.grid-item {
  min-width: 0; /* 防止内容溢出 */
}

/* 跨度类 */
@for $i from 1 through 12 {
  .grid-item--span-#{$i} {
    grid-column: span $i;
  }
  
  .grid-item--offset-#{$i} {
    grid-column-start: $i + 1;
  }
}

/* 响应式跨度 */
@media (min-width: 576px) {
  @for $i from 1 through 12 {
    .grid-item--span-#{$i}-sm {
      grid-column: span $i;
    }
    .grid-item--offset-#{$i}-sm {
      grid-column-start: $i + 1;
    }
  }
}

@media (min-width: 768px) {
  @for $i from 1 through 12 {
    .grid-item--span-#{$i}-md {
      grid-column: span $i;
    }
    .grid-item--offset-#{$i}-md {
      grid-column-start: $i + 1;
    }
  }
}

@media (min-width: 992px) {
  @for $i from 1 through 12 {
    .grid-item--span-#{$i}-lg {
      grid-column: span $i;
    }
    .grid-item--offset-#{$i}-lg {
      grid-column-start: $i + 1;
    }
  }
}

@media (min-width: 1200px) {
  @for $i from 1 through 12 {
    .grid-item--span-#{$i}-xl {
      grid-column: span $i;
    }
    .grid-item--offset-#{$i}-xl {
      grid-column-start: $i + 1;
    }
  }
}

@media (min-width: 1400px) {
  @for $i from 1 through 12 {
    .grid-item--span-#{$i}-xxl {
      grid-column: span $i;
    }
    .grid-item--offset-#{$i}-xxl {
      grid-column-start: $i + 1;
    }
  }
}
</style>