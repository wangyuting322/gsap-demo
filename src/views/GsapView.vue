<template>
  <div class="GsapView flex-col">
    <nav class="flex-row pointer">
      <div
        v-for="(item, index) in list"
        :class="{ activeNav: index === activeIndex }"
        :key="index"
        :href="item.cmp.name"
        @click="changeAcctive(index)"
      >
        {{ item.name }} |
      </div>
    </nav>
    <section class="flex-col-all flex-col">
      <component :is="list[activeIndex].cmp"></component>
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import NumberAni from '@/components/gsap/NumberAni.vue'
import BoxAni from '@/components/gsap/BoxAni.vue'
import RegisterGlobal from '@/components/gsap/RegisterGlobal.vue'
let list = [
  { name: '数字变化', cmp: NumberAni },
  { name: 'gsap.to()', cmp: BoxAni },
  { name: 'effect()', cmp: RegisterGlobal },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.GsapView {
  background-color: burlywood;
}
</style>
