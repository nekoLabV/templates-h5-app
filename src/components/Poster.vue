<script lang="ts" setup>
import html2canvas from 'html2canvas'
import { ref, onMounted } from 'vue'

const posterRef = ref()

const generatePoster = async(ele: HTMLElement) => {
  try {
    const canvas = await html2canvas(ele, {
      scale: 2, // 提高清晰度
      backgroundColor: '#ffffff',
      allowTaint: false,
      useCORS: true, // 处理跨域图片
      logging: false,
      windowWidth: ele.scrollWidth,
      windowHeight: ele.scrollHeight
    })
    
    const posterUrl = canvas.toDataURL('image/png');
    return posterUrl
  } catch (error) {
    console.error('生成失败:', error);
  }
}

onMounted(async () => {
  console.dir(posterRef.value?.__vnode.el)
  const poster = await generatePoster(posterRef.value?.__vnode.el)
  console.log('poster', poster)
})
</script>

<template>
  <div class="poster" ref="posterRef">
    <div>海报的标题</div>
    <div>内容。。。。。。</div>
    <div>内容。。。。。。</div>
    <div>内容。。。。。。</div>
    <div>内容。。。。。。</div>
    <div>内容。。。。。。</div>
  </div>
</template>
