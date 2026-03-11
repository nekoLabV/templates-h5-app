<script lang="ts" setup>
import IconLove from '@/assets/icon/love.svg'
import { ref } from 'vue'
import { debounce } from 'lodash-es'

const isLove = ref<boolean>()
const clickLove = () => {
  isLove.value = !isLove.value
}
</script>

<template>
  <div 
    class="card"
    :class="[
      {
        'is-love': isLove
      }
    ]">
    <div class="card__header">
      <div class="card__title">
        <slot name="title"></slot>
      </div>
      <IconLove 
        class="card__love" 
        width="16" 
        height="16"
        @click="clickLove"
      />
    </div>
    <div class="card__primary">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  $love: #{&}__love;
  display: grid;
  gap: 10px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 12px 16px;
  &.is-love {
    #{$love} {
      color: #FF2E00;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  &__title {
    color: var(--text-primary);
  }
  &__love {
    margin-left: auto;
    cursor: pointer;
  }
  &__primary {
    color: var(--text-light);
    font-size: 14px;
  }
}
</style>
