<script setup lang="ts">
import { onMounted } from 'vue'
import { getUserInfo } from '@/services'

onMounted(async () => {
  const res = await getUserInfo()
  console.log('getUserInfo', res)
})
</script>

<template>
  <div>11111</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
