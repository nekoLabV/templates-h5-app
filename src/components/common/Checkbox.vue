<script setup lang="ts">
import { computed, ref } from 'vue'

type CheckboxSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue?: boolean | string | number | any[]
  // 单独使用时为 boolean，组合使用时为选项值
  value?: any
  // 标签文本
  label?: string
  // 尺寸
  size?: CheckboxSize
  // 是否禁用
  disabled?: boolean
  // 是否半选状态
  indeterminate?: boolean
  // 错误状态
  error?: boolean
  // 原生 name 属性
  name?: string
  // 是否真值模式（严格返回 boolean）
  trueValue?: any
  falseValue?: any
  // 验证状态
  validateEvent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: undefined,
  label: '',
  size: 'md',
  disabled: false,
  indeterminate: false,
  error: false,
  name: '',
  trueValue: true,
  falseValue: false,
  validateEvent: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any, event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

// 内部状态
const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)

// 判断是否为复选框组
const isGroup = computed(() => {
  return props.modelValue !== undefined && Array.isArray(props.modelValue)
})

// 计算选中状态
const isChecked = computed(() => {
  if (props.indeterminate) return false

  // 处理数组模式（复选框组）
  if (isGroup.value && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }

  // 处理自定义真值
  if (props.trueValue !== true || props.falseValue !== false) {
    return props.modelValue === props.trueValue
  }

  // 默认布尔模式
  return Boolean(props.modelValue)
})

// 处理变更
const handleChange = (event: Event) => {
  if (props.disabled) return

  const target = event.target as HTMLInputElement
  let newValue: any

  if (isGroup.value && Array.isArray(props.modelValue)) {
    // 复选框组模式
    const list = [...props.modelValue]
    const value = props.value

    if (target.checked) {
      // 选中：添加值
      if (!list.includes(value)) {
        list.push(value)
      }
    } else {
      // 取消选中：移除值
      const index = list.indexOf(value)
      if (index > -1) {
        list.splice(index, 1)
      }
    }
    newValue = list
  } else {
    // 单选框模式
    newValue = target.checked ? props.trueValue : props.falseValue
  }

  emit('update:modelValue', newValue)
  emit('change', newValue, event)
}

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  check: () => {
    if (!props.disabled) {
      emit('update:modelValue', props.trueValue)
    }
  },
  uncheck: () => {
    if (!props.disabled) {
      emit('update:modelValue', props.falseValue)
    }
  },
  toggle: () => {
    if (!props.disabled) {
      emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue)
    }
  }
})
</script>

<template>
  <label
    class="checkbox"
    :class="[
      `checkbox--${size}`,
      {
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-indeterminate': indeterminate,
        'is-focused': isFocused,
        'is-error': error
      }
    ]"
  >
    <!-- 隐藏的原生 checkbox -->
    <input
      ref="inputRef"
      type="checkbox"
      class="checkbox__original"
      :value="value"
      :name="name"
      :disabled="disabled"
      :checked="isChecked"
      :indeterminate="indeterminate"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <!-- 自定义 checkbox 样式 -->
    <span class="checkbox__visual">
      <!-- 选中状态图标 -->
      <svg
        v-if="isChecked && !indeterminate"
        class="checkbox__icon checkbox__icon--checked"
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
      </svg>

      <!-- 半选状态图标 -->
      <svg
        v-else-if="indeterminate"
        class="checkbox__icon checkbox__icon--indeterminate"
        viewBox="0 0 24 24"
      >
        <path d="M19 13H5v-2h14v2z" fill="currentColor"/>
      </svg>
    </span>

    <!-- 标签内容 -->
    <span v-if="$slots.default || label" class="checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@use '@scss/var';
@use '@scss/mixins';

.checkbox {
  $visual: #{&}__visual;

  @include mixins.flex-center($inline: true);
  position: relative;
  gap: var(--checkbox-gap, 8px);
  cursor: pointer;
  user-select: none;
  /* 隐藏原生 checkbox */
  &__original {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }
  /* 自定义视觉元素 */
  &__visual {
    @include mixins.flex-center($inline: true);
    background-color: var(--checkbox-bg, #ffffff);
    border: var(--checkbox-border, 1px solid #dcdfe6);
    border-radius: var(--checkbox-radius, 4px);
    transition: all 0.3s ease;
    flex-shrink: 0;
  }
  /* 尺寸变体 */
  @each $size in var.$sizes {
    &--#{$size} {
      #{$visual} {
        width: var(--checkbox-size-#{$size});
        height: var(--checkbox-size-#{$size});
      }
    }
  }
  /* 图标样式 */
  &__icon {
    width: 100%;
    height: 100%;
    color: var(--checkbox-icon-color, #ffffff);
  }
  /* 选中状态 */
  &.is-checked #{$visual} {
    background-color: var(--checkbox-checked-bg, #409eff);
    border-color: var(--checkbox-checked-border, #409eff);
  }
  /* 半选状态 */
  &.is-indeterminate #{$visual} {
    background-color: var(--checkbox-indeterminate-bg, #409eff);
    border-color: var(--checkbox-indeterminate-border, #409eff);
  }
  /* 悬停状态 */
  &:hover:not(.is-disabled) #{$visual} {
    border-color: var(--checkbox-hover-border, #409eff);
  }
}

/* 聚焦状态 */
.checkbox.is-focused .checkbox__visual {
  box-shadow: 0 0 0 2px var(--checkbox-focus-shadow, rgba(64, 158, 255, 0.2));
}

/* 错误状态 */
.checkbox.is-error .checkbox__visual {
  border-color: var(--checkbox-error-border, #f56c6c);
}

.checkbox.is-error.is-focused .checkbox__visual {
  box-shadow: 0 0 0 2px var(--checkbox-error-shadow, rgba(245, 108, 108, 0.2));
}

/* 禁用状态 */
.checkbox.is-disabled {
  cursor: not-allowed;
  opacity: var(--checkbox-disabled-opacity, 0.6);
}

.checkbox.is-disabled .checkbox__visual {
  background-color: var(--checkbox-disabled-bg, #f5f7fa);
  border-color: var(--checkbox-disabled-border, #e4e7ed);
}

.checkbox.is-disabled .checkbox__label {
  color: var(--checkbox-disabled-color, #c0c4cc);
}

/* 标签样式 */
.checkbox__label {
  font-size: var(--checkbox-font-size, 14px);
  color: var(--checkbox-label-color, #606266);
  line-height: 1.5;
}

.checkbox--sm .checkbox__label {
  font-size: var(--checkbox-font-size-sm, 12px);
}

.checkbox--lg .checkbox__label {
  font-size: var(--checkbox-font-size-lg, 16px);
}

/* 按钮模式样式 */
.checkbox--button {
  /* 按钮模式样式 */
}

/* 边框模式 */
.checkbox--bordered {
  padding: var(--checkbox-bordered-padding, 8px 12px);
  border: 1px solid var(--checkbox-bordered-border, #dcdfe6);
  border-radius: var(--checkbox-bordered-radius, 4px);
  background-color: var(--checkbox-bordered-bg, #ffffff);
}

.checkbox--bordered.is-checked {
  border-color: var(--checkbox-bordered-checked-border, #409eff);
  background-color: var(--checkbox-bordered-checked-bg, #f0f7ff);
}
</style>