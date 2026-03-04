<script setup lang="ts">
import IconLoading from '@/assets/icon/loading.svg'
import { computed } from 'vue'

interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button 
    :class="[
      'btn', 
      `btn--${type}`, 
      `btn--${size}`, 
      {
        'is-loading': loading
      }
    ]"
    :disabled="isDisabled"
    @click="emit('click', $event)"
  >
    <IconLoading v-if="loading" class="btn__loading" width="16" height="16"></IconLoading>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--white);
  padding: var(--btn-size-md);
  background-color: var(--btn-primary);
  border-radius: var(--btn-border-radius-md);
  @each $type in ('primary', 'success', 'warning', 'danger') {
    &--#{$type} {
      background-color: var(--btn-#{$type});
    }
  }
  @each $size in ('sm', 'md', 'lg') {
    &--#{$size} {
      padding: var(--btn-size-#{$size});
      border-radius: var(--btn-border-radius-#{$size});
    }
  }
  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
  
  &.is-loading {
    cursor: wait;
    .btn__loading {
      animation: spin 1s linear infinite;
    }
  }
}
</style>
