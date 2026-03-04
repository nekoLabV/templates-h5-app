<script setup lang="ts">
import { computed } from 'vue'

// 定义断点类型
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

// 定义响应式配置接口
interface ResponsiveConfig {
  cols?: number | Partial<Record<Breakpoint, number>>
  gap?: number | string | Partial<Record<Breakpoint, number | string>>
  rows?: string | Partial<Record<Breakpoint, string>>
}

interface Props {
  // 列数
  cols?: number | Partial<Record<Breakpoint, number>>
  // 行数（可选）
  rows?: string | Partial<Record<Breakpoint, string>>
  // 间距
  gap?: number | string | Partial<Record<Breakpoint, number | string>>
  // 列间距
  columnGap?: number | string | Partial<Record<Breakpoint, number | string>>
  // 行间距
  rowGap?: number | string | Partial<Record<Breakpoint, number | string>>
  // 最小列宽（用于自动填充）
  minColumnWidth?: string
  // 是否自动填充（类似 flex-wrap）
  autoFit?: boolean
  // 对齐方式
  justify?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'start' | 'end' | 'center' | 'stretch'
  // 响应式断点配置
  responsive?: boolean
  // 自定义断点值
  breakpoints?: Partial<Record<Breakpoint, number>>
}

const props = withDefaults(defineProps<Props>(), {
  cols: 12,
  rows: 'auto',
  gap: 16,
  columnGap: undefined,
  rowGap: undefined,
  minColumnWidth: '250px',
  autoFit: false,
  justify: 'start',
  align: 'stretch',
  responsive: true,
  breakpoints: () => ({
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  })
})

// 默认断点值
const defaultBreakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

// 合并断点配置
const breakpoints = computed(() => ({
  ...defaultBreakpoints,
  ...props.breakpoints
}))

// 获取响应式值
const getResponsiveValue = <T>(
  value: T | Partial<Record<Breakpoint, T>> | undefined,
  defaultValue: T
): T | Record<Breakpoint, T> => {
  if (!value || typeof value !== 'object') {
    return value ?? defaultValue
  }
  
  // 如果是普通的响应式对象
  if (!('xs' in value) && !('sm' in value) && !('md' in value) && 
      !('lg' in value) && !('xl' in value) && !('xxl' in value)) {
    return value as T
  }
  
  return value as Record<Breakpoint, T>
}

// 生成网格样式
const gridStyle = computed(() => {
  const styles: Record<string, string> = {
    display: 'grid',
    justifyContent: props.justify,
    alignContent: props.align
  }

  // 处理响应式列数
  if (props.responsive && typeof props.cols === 'object') {
    const colsObj = props.cols as Partial<Record<Breakpoint, number>>
    Object.entries(breakpoints.value).forEach(([bp, minWidth]) => {
      if (colsObj[bp as Breakpoint] !== undefined) {
        const mediaQuery = minWidth === 0 
          ? 'all' 
          : `(min-width: ${minWidth}px)`
        
        // 这里需要动态生成媒体查询，但 CSS-in-JS 比较困难
        // 实际项目中可以使用 CSS 变量配合媒体查询
        styles[`--grid-cols-${bp}`] = String(colsObj[bp as Breakpoint])
      }
    })
  }

  // 列数
  const colsValue = getResponsiveValue(props.cols, 12)
  if (typeof colsValue === 'number') {
    if (props.autoFit && props.minColumnWidth) {
      styles.gridTemplateColumns = `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
    } else {
      styles.gridTemplateColumns = `repeat(${colsValue}, 1fr)`
    }
  }

  // 行数
  const rowsValue = getResponsiveValue(props.rows, 'auto')
  if (typeof rowsValue === 'string') {
    styles.gridTemplateRows = rowsValue
  }

  // 处理间距
  const processGap = (gap: number | string | undefined, defaultValue: number | string): string => {
    if (gap === undefined) return String(defaultValue)
    if (typeof gap === 'number') return `${gap}px`
    return gap
  }

  // 列间距
  if (props.columnGap !== undefined) {
    styles.columnGap = processGap(props.columnGap, 0)
  } else {
    styles.gap = processGap(props.gap, 16)
  }

  // 行间距
  if (props.rowGap !== undefined) {
    styles.rowGap = processGap(props.rowGap, 0)
  }

  return styles
})
</script>

<template>
  <div
    class="grid"
    :class="[
      `grid--gap-${gap}`,
      { 'grid--responsive': responsive }
    ]"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  width: 100%;
}

/* 间隙尺寸变体 */
.grid--gap-0 { gap: 0; }
.grid--gap-1 { gap: 4px; }
.grid--gap-2 { gap: 8px; }
.grid--gap-3 { gap: 12px; }
.grid--gap-4 { gap: 16px; }
.grid--gap-5 { gap: 20px; }
.grid--gap-6 { gap: 24px; }
.grid--gap-8 { gap: 32px; }
.grid--gap-10 { gap: 40px; }

/* 响应式断点 */
@media (min-width: 576px) {
  .grid--responsive {
    grid-template-columns: repeat(var(--grid-cols-sm, 12), 1fr);
  }
}

@media (min-width: 768px) {
  .grid--responsive {
    grid-template-columns: repeat(var(--grid-cols-md, 12), 1fr);
  }
}

@media (min-width: 992px) {
  .grid--responsive {
    grid-template-columns: repeat(var(--grid-cols-lg, 12), 1fr);
  }
}

@media (min-width: 1200px) {
  .grid--responsive {
    grid-template-columns: repeat(var(--grid-cols-xl, 12), 1fr);
  }
}

@media (min-width: 1400px) {
  .grid--responsive {
    grid-template-columns: repeat(var(--grid-cols-xxl, 12), 1fr);
  }
}
</style>