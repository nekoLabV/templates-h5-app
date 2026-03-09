<script lang="ts" setup>
import html2canvas from 'html2canvas'
import { ref, onMounted } from 'vue'

const posterRef = ref()
const showPoster = ref<boolean>(false)
const w = ref<number>()
const h = ref<number>()

const generatePoster = async(ele: HTMLElement) => {
  w.value = ele.scrollWidth
  h.value = ele.scrollHeight
  try {
    const canvas = await html2canvas(ele, {
      scale: 2, // 提高清晰度
      backgroundColor: '#ffffff',
      allowTaint: false,
      useCORS: true, // 处理跨域图片
      logging: false,
      windowWidth: w.value,
      windowHeight: h.value
    })
    
    const posterUrl = canvas.toDataURL('image/png')
    return posterUrl
  } catch (error) {
    console.error('海报生成失败:', error)
  }
}

const poster = ref()
onMounted(async () => {
  poster.value = await generatePoster(posterRef.value?.__vnode.el)
  showPoster.value = true
})
</script>

<template>
  <div class="poster" ref="posterRef">
    <div v-if="!showPoster">
      <div>海报的标题</div>
      <div>内容。。。。。。</div>
      <div>内容。。。。。。</div>
      <div>内容。。。。。。</div>
      <div>内容。。。。。。</div>
      <div>内容。。。。。。</div>
    </div>
    <img v-else :width="w" :height="h" :src="poster" alt="poster">
  </div>
</template>
