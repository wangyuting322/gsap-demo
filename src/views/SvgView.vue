<template>
  <div class="SvgView flex-col">
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
import Polygon from '@/components/svg/Polygon.vue'
import ViewBox from '@/components/svg/ViewBox.vue'
import Path from '@/components/svg/Path.vue'
let list = [
  { name: '多边形-圆角', cmp: Polygon },
  { name: 'viewBox自适应', cmp: ViewBox },
  { name: '路径path', cmp: Path },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.SvgView {
}
</style>
