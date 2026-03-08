<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  // 数据源
  items: any[]
  // 是否自动播放
  autoplay?: boolean
  // 自动播放延迟（毫秒）
  autoplayDelay?: number
  // 是否循环
  loop?: boolean
  // 是否显示导航按钮
  navigation?: boolean
  // 是否显示分页器
  pagination?: boolean
  // 分页器类型
  paginationType?: 'bullets' | 'fraction' | 'progressbar'
  // 每次显示的幻灯片数量
  slidesPerView?: number | 'auto'
  // 幻灯片间距
  spaceBetween?: number
  // 是否启用触摸
  allowTouchMove?: boolean
  // 自定义导航按钮
  customNavigation?: boolean
  // 效果
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip'
  // 加载状态
  loading?: boolean
  // 获取 item 唯一 key 的函数
  itemKey?: string | ((item: any, index: number) => string)
  // 是否在数据变化时重新初始化
  reInitOnChange?: boolean
  // 额外的 Swiper 配置
  swiperConfig?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  items: () => ([]),
  autoplay: true,
  autoplayDelay: 3000,
  loop: true,
  navigation: true,
  pagination: true,
  paginationType: 'bullets',
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: true,
  customNavigation: false,
  effect: 'slide',
  loading: false,
  itemKey: 'id',
  reInitOnChange: true,
  swiperConfig: () => ({})
})
const emit = defineEmits<{
  (e: 'init', swiper: any): void
  (e: 'slideChange', swiper: any): void
  (e: 'reachBeginning', swiper: any): void
  (e: 'reachEnd', swiper: any): void
  (e: 'autoplayStart', swiper: any): void
  (e: 'autoplayStop', swiper: any): void
  (e: 'click', item: any, index: number): void
}>()

// Swiper 配置项
const config = computed(() => {
  return {
    loop: props.loop,
    slidesPerView: props.slidesPerView,
    spaceBetween: props.spaceBetween,
    autoplay: props.autoplay ? { delay: props.autoplayDelay } : false,
    pagination: props.pagination ? { 
      type: props.paginationType,
      clickable: true 
    } : false,
    allowTouchMove: props.allowTouchMove,
    observer: true, // 监听 DOM 变化
    observeParents: true,
    ...props.swiperConfig
  }
})

// 初始化 Swiper
const initSwiper = () => {

}

onMounted(() => {
  initSwiper()
})
</script>

<template>
  <div class="swiper">
    <Swiper v-bind="config" :modules="[Pagination]">
      <SwiperSlide
        v-for="(item, index) in items"
        :key="index">
        <slot
          name="slide" 
          :item="item" 
          :index="index"
          :data="item"
        >
          <!-- 默认内容，当使用者没有提供插槽时显示 -->
          <div class="default-slide">
            <img v-if="item.image" :src="item.image" :alt="item.title" />
            <div v-if="item.title">{{ item.title }}</div>
          </div>
        </slot>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.swiper-slide {
  min-height: 100px;
}
</style>
