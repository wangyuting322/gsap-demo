<template>
  <div class="Timeline">
    <div
      ref="purple"
      class="item purple"
      data-color="#8d3dae"
      data-class="purple"
    ></div>
    <div
      ref="green"
      class="item green"
      data-color="#28a92b"
      data-class="green"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { gsap } from 'gsap'
import { gsapUseStore } from '@/store/modules/gsap'
let gsapStore = gsapUseStore()

let tl = null
onMounted(() => {})
watch(
  () => gsapStore.isLoaded,
  async (newValue) => {
    if (newValue) {
      await nextTick()
      tl = gsap.timeline()
      tl.to('.purple', {
        x: 50
      }).to('.green', {
        x: 50
      },3)
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.Timeline {
  .item {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-top: 0.5rem;
  }

  .green {
    background-color: #28a92b;
  }

  .purple {
    background-color: #b463d5;
  }
}
</style>
