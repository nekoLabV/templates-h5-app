<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showPasswordToggle?: boolean
  maxlength?: number
  minlength?: number
  autocomplete?: string
  name?: string
  id?: string
  prefixIcon?: string
  suffixIcon?: string
  error?: boolean
  success?: boolean
  errorMessage?: string
  helpText?: string
  validateEvent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  showPasswordToggle: true,
  autocomplete: 'off',
  error: false,
  success: false,
  validateEvent: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'enter'): void
}>()

// 状态
const inputRef = ref<HTMLInputElement>()
const isFocused = ref(false)
const showPassword = ref(false)

// 计算实际输入类型
const inputType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

// 是否显示状态图标
const showStatusIcon = computed(() => {
  return (props.success || props.error) && !props.disabled && !props.readonly
})

// 处理输入
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  // 数字类型处理
  if (props.type === 'number') {
    if (value === '') {
      value = ''
    } else if (!isNaN(Number(value))) {
      value = Number(value).toString()
    }
  }

  emit('update:modelValue', value)
  emit('input', value)
}

// 处理变更
const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

// 处理聚焦
const onFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

// 处理失焦
const onBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

// 处理回车
const onEnter = () => {
  emit('enter')
}

// 清空输入
const clearValue = () => {
  emit('update:modelValue', '')
  emit('clear')
  emit('input', '')
  emit('change', '')
  
  // 聚焦到输入框
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// 暴露方法给父组件
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<template>
  <div 
    class="input-wrapper" 
    :class="[
      `input--${size}`,
      { 
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-error': error,
        'is-success': success,
        'is-focused': isFocused
      }
    ]"
  >
    <!-- 左侧图标 -->
    <div v-if="$slots.prefix || prefixIcon" class="input__prefix">
      <slot name="prefix">
        <i v-if="prefixIcon" :class="prefixIcon" class="input__icon"></i>
      </slot>
    </div>

    <!-- 输入框容器 -->
    <div class="input__container">
      <!-- 输入框 -->
      <input
        ref="inputRef"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :name="name"
        :id="id"
        class="input__field"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onEnter"
      />

      <!-- 清空按钮 -->
      <button
        v-if="clearable && modelValue && !disabled && !readonly"
        class="input__clear"
        @click="clearValue"
        type="button"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
        </svg>
      </button>

      <!-- 密码可见切换 -->
      <button
        v-if="type === 'password' && showPasswordToggle"
        class="input__password-toggle"
        @click="togglePasswordVisibility"
        type="button"
      >
        <svg v-if="showPassword" viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <!-- 右侧图标 -->
    <div v-if="$slots.suffix || suffixIcon" class="input__suffix">
      <slot name="suffix">
        <i v-if="suffixIcon" :class="suffixIcon" class="input__icon"></i>
      </slot>
    </div>

    <!-- 状态图标 -->
    <div v-if="showStatusIcon" class="input__status">
      <svg v-if="success" viewBox="0 0 24 24" width="18" height="18" class="input__status-success">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
      </svg>
      <svg v-if="error" viewBox="0 0 24 24" width="18" height="18" class="input__status-error">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
      </svg>
    </div>
  </div>

  <!-- 错误提示 -->
  <transition name="fade">
    <div v-if="errorMessage" class="input__error">
      {{ errorMessage }}
    </div>
  </transition>

  <!-- 帮助文本 -->
  <div v-if="helpText && !errorMessage" class="input__help">
    {{ helpText }}
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 14px;
  border: 1px solid var(--input-border-color, #dcdfe6);
  border-radius: var(--input-border-radius, 4px);
  background-color: var(--input-bg-color, #fff);
  transition: all 0.3s ease;

  // 尺寸变体
  &--sm {
    min-height: 28px;
    font-size: 12px;
    
    .input__field {
      padding: 4px 8px;
    }
    
    .input__prefix, .input__suffix, .input__status {
      padding: 0 4px;
    }
  }

  &--md {
    min-height: 36px;
    font-size: 14px;
    
    .input__field {
      padding: 8px 12px;
    }
    
    .input__prefix, .input__suffix, .input__status {
      padding: 0 8px;
    }
  }

  &--lg {
    min-height: 44px;
    font-size: 16px;
    
    .input__field {
      padding: 12px 16px;
    }
    
    .input__prefix, .input__suffix, .input__status {
      padding: 0 12px;
    }
  }

  // 聚焦状态
  &.is-focused {
    border-color: var(--input-focus-border, #409eff);
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }

  // 错误状态
  &.is-error {
    border-color: var(--input-error-color, #f56c6c);
    
    &.is-focused {
      box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.2);
    }
  }

  // 成功状态
  &.is-success {
    border-color: var(--input-success-color, #67c23a);
    
    &.is-focused {
      box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
    }
  }

  // 禁用状态
  &.is-disabled {
    background-color: var(--input-disabled-bg, #f5f7fa);
    border-color: var(--input-disabled-border, #e4e7ed);
    color: var(--input-disabled-color, #c0c4cc);
    cursor: not-allowed;

    .input__field {
      background-color: transparent;
      cursor: not-allowed;
    }
  }

  // 只读状态
  &.is-readonly {
    background-color: var(--input-readonly-bg, #f5f7fa);
  }
}

.input__container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 8px;
}

.input__field {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: inherit;
  color: inherit;
  line-height: 1.5;

  &::placeholder {
    color: var(--input-placeholder-color, #c0c4cc);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
}

.input__prefix,
.input__suffix,
.input__status {
  display: flex;
  align-items: center;
  color: var(--input-icon-color, #909399);
}

.input__clear,
.input__password-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  color: var(--input-icon-color, #909399);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--input-icon-hover-color, #606266);
  }

  &:focus {
    outline: none;
  }
}

.input__status-success {
  color: var(--input-success-color, #67c23a);
}

.input__status-error {
  color: var(--input-error-color, #f56c6c);
}

// 错误提示
.input__error {
  margin-top: 4px;
  font-size: 12px;
  color: var(--input-error-color, #f56c6c);
  line-height: 1.5;
}

// 帮助文本
.input__help {
  margin-top: 4px;
  font-size: 12px;
  color: var(--input-help-color, #909399);
  line-height: 1.5;
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>