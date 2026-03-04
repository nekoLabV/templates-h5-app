<script setup lang="ts">
import { computed, ref } from 'vue'

// 类型定义
type TextVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'danger' 
  | 'info' 
  | 'light' 
  | 'dark'
  | 'muted'

type TextSize = 
  | 'xs' 
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | '2xl' 
  | '3xl' 
  | '4xl' 
  | '5xl' 
  | '6xl'

type TextWeight = 
  | 'thin' 
  | 'light' 
  | 'normal' 
  | 'medium' 
  | 'semibold' 
  | 'bold' 
  | 'extrabold'

type TextAlign = 'left' | 'center' | 'right' | 'justify'

type TextTag = 
  | 'span' 
  | 'p' 
  | 'div' 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'strong' 
  | 'em' 
  | 'small' 
  | 'blockquote' 
  | 'cite' 
  | 'figcaption'

interface Props {
  // 基本属性
  variant?: TextVariant
  size?: TextSize
  weight?: TextWeight
  align?: TextAlign
  tag?: TextTag
  
  // 样式修饰
  truncate?: boolean
  nowrap?: boolean
  italic?: boolean
  underline?: boolean
  deleteLine?: boolean
  
  // 特殊类型
  code?: boolean
  mark?: boolean
  kbd?: boolean
  sup?: boolean
  sub?: boolean
  
  // 状态
  disabled?: boolean
  
  // 复制功能
  copyable?: boolean
  copyText?: string
  
  // 行数限制（配合 truncate 使用）
  lines?: number
  
  // 颜色（自定义）
  color?: string
  
  // 字体大小（自定义）
  fontSize?: string | number
  
  // 行高
  lineHeight?: string | number
  
  // 字母间距
  letterSpacing?: string | number
  
  // 透明度
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  weight: 'normal',
  align: 'left',
  tag: 'span',
  truncate: false,
  nowrap: false,
  italic: false,
  underline: false,
  deleteLine: false,
  code: false,
  mark: false,
  kbd: false,
  sup: false,
  sub: false,
  disabled: false,
  copyable: false,
  copyText: '',
  lines: undefined
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'copy', text: string): void
}>()

// 复制状态
const copySuccess = ref(false)
const textRef = ref<HTMLElement>()

// 计算实际要复制的文本
const textToCopy = computed(() => {
  if (props.copyText) return props.copyText
  return textRef.value?.textContent || ''
})

// 处理点击
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

// 复制文本
const copyText = async () => {
  if (!props.copyable || props.disabled) return
  
  try {
    await navigator.clipboard.writeText(textToCopy.value)
    copySuccess.value = true
    emit('copy', textToCopy.value)
    
    // 2秒后重置状态
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

// 计算自定义样式
const textStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.color) {
    styles.color = props.color
  }
  
  if (props.fontSize) {
    styles.fontSize = typeof props.fontSize === 'number' 
      ? `${props.fontSize}px` 
      : props.fontSize
  }
  
  if (props.lineHeight) {
    styles.lineHeight = typeof props.lineHeight === 'number'
      ? String(props.lineHeight)
      : props.lineHeight
  }
  
  if (props.letterSpacing) {
    styles.letterSpacing = typeof props.letterSpacing === 'number'
      ? `${props.letterSpacing}px`
      : props.letterSpacing
  }
  
  if (props.opacity !== undefined) {
    styles.opacity = String(props.opacity)
  }
  
  if (props.lines && props.lines > 1) {
    styles.display = '-webkit-box'
    styles.webkitLineClamp = String(props.lines)
    styles.webkitBoxOrient = 'vertical'
    styles.overflow = 'hidden'
  }
  
  return styles
})
</script>

<template>
  <component
    :is="tag"
    :class="[
      'text',
      `text--${variant}`,
      `text--${size}`,
      `text--${weight}`,
      `text--${align}`,
      {
        'text--truncate': truncate,
        'text--nowrap': nowrap,
        'text--italic': italic,
        'text--underline': underline,
        'text--delete': deleteLine,
        'text--code': code,
        'text--mark': mark,
        'text--kbd': kbd,
        'text--disabled': disabled,
        'text--copy': copyable
      }
    ]"
    :style="textStyle"
    :title="copyable ? text : undefined"
    @click="handleClick"
  >
    <!-- 上标和下标 -->
    <sup v-if="sup" class="text__sup"><slot name="sup" /></sup>
    <sub v-if="sub" class="text__sub"><slot name="sub" /></sub>

    <!-- 主要内容 -->
    <span v-if="!code && !mark && !kbd" ref="textRef" class="text__content">
      <slot />
    </span>

    <!-- 代码样式 -->
    <code v-else-if="code" class="text__code">
      <slot />
    </code>

    <!-- 标记样式 -->
    <mark v-else-if="mark" class="text__mark">
      <slot />
    </mark>

    <!-- 键盘样式 -->
    <kbd v-else-if="kbd" class="text__kbd">
      <slot />
    </kbd>

    <!-- 复制按钮 -->
    <button
      v-if="copyable"
      class="text__copy-btn"
      :class="{ 'text__copy-btn--success': copySuccess }"
      @click.stop="copyText"
      :title="copySuccess ? '复制成功' : '复制'"
    >
      <svg 
        v-if="!copySuccess" 
        viewBox="0 0 24 24" 
        width="16" 
        height="16"
      >
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/>
      </svg>
      <svg 
        v-else 
        viewBox="0 0 24 24" 
        width="16" 
        height="16"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
      </svg>
    </button>
  </component>
</template>

<style lang="scss" scoped>
.text {
  margin: 0;
  padding: 0;
  transition: all 0.3s ease;
}

/* 变体颜色 */
.text--default { color: var(--text-color, #2c3e50); }
.text--primary { color: var(--primary-color, #409eff); }
.text--secondary { color: var(--secondary-color, #909399); }
.text--success { color: var(--success-color, #67c23a); }
.text--warning { color: var(--warning-color, #e6a23c); }
.text--danger { color: var(--danger-color, #f56c6c); }
.text--info { color: var(--info-color, #909399); }
.text--light { color: var(--light-color, #ffffff); }
.text--dark { color: var(--dark-color, #303133); }
.text--muted { color: var(--muted-color, #c0c4cc); }

/* 字号 */
.text--xs { font-size: var(--font-size-xs, 0.75rem); }      /* 12px */
.text--sm { font-size: var(--font-size-sm, 0.875rem); }     /* 14px */
.text--md { font-size: var(--font-size-md, 1rem); }         /* 16px */
.text--lg { font-size: var(--font-size-lg, 1.125rem); }     /* 18px */
.text--xl { font-size: var(--font-size-xl, 1.25rem); }      /* 20px */
.text--2xl { font-size: var(--font-size-2xl, 1.5rem); }     /* 24px */
.text--3xl { font-size: var(--font-size-3xl, 1.875rem); }   /* 30px */
.text--4xl { font-size: var(--font-size-4xl, 2.25rem); }    /* 36px */
.text--5xl { font-size: var(--font-size-5xl, 3rem); }       /* 48px */
.text--6xl { font-size: var(--font-size-6xl, 4rem); }       /* 64px */

/* 字重 */
.text--thin { font-weight: 100; }
.text--light { font-weight: 300; }
.text--normal { font-weight: 400; }
.text--medium { font-weight: 500; }
.text--semibold { font-weight: 600; }
.text--bold { font-weight: 700; }
.text--extrabold { font-weight: 800; }

/* 对齐 */
.text--left { text-align: left; }
.text--center { text-align: center; }
.text--right { text-align: right; }
.text--justify { text-align: justify; }

/* 文本修饰 */
.text--italic { font-style: italic; }
.text--underline { text-decoration: underline; }
.text--delete { text-decoration: line-through; }

/* 截断 */
.text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text--nowrap {
  white-space: nowrap;
}

/* 多行截断（通过 lines prop 实现） */
.text[style*="-webkit-line-clamp"] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 特殊样式 */
.text--code {
  font-family: var(--font-family-mono, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace);
  background-color: var(--code-bg, #f5f7fa);
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}

.text--mark {
  background-color: var(--mark-bg, #fef3c7);
  color: var(--mark-color, #92400e);
  padding: 0 0.2em;
  border-radius: 2px;
}

.text--kbd {
  font-family: var(--font-family-mono, monospace);
  background-color: var(--kbd-bg, #f5f5f5);
  border: 1px solid var(--kbd-border, #d1d5db);
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-size: 0.85em;
  box-shadow: 0 1px 0 rgba(0,0,0,0.1);
}

/* 上下标 */
.text__sup,
.text__sub {
  font-size: 0.75em;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

.text__sup {
  top: -0.5em;
}

.text__sub {
  bottom: -0.25em;
}

/* 禁用状态 */
.text--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 复制按钮 */
.text {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.text__copy-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 4px;
  border: none;
  background: transparent;
  color: var(--copy-color, #909399);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--copy-hover-color, #409eff);
    background-color: var(--copy-hover-bg, #f5f7fa);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }
  
  &--success {
    color: var(--success-color, #67c23a);
  }
}

/* 可复制的文本样式 */
.text--copy {
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
}
</style>
