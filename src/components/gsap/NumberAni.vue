<template>
  <div class="NumberAni">
    <input v-model="num.current" type="number" />
    <div>{{ num.toNum.toFixed(0) }}</div>
    <div>{{ (num.toNum * 2).toFixed(0) }}</div>
    <div>{{ a }}</div>
  </div>
</template>
<script setup lang="ts" name="NumberAni">
import { reactive } from 'vue'
import gsap from 'gsap'
let num = reactive({
  current: 0,
  toNum: 0
})
const a = computed(() => {
  return (num.toNum + 2 * num.current).toFixed(0)
})
watch(
  () => num.current,
  (newV: number) => {
    gsap.to(num, {
      toNum: newV
    })
  }
)
</script>
<style lang="scss" scoped>
.NumberAni {
}
</style>
