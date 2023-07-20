<template>
  <div class="FlipView flex-col">
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
import Flip1 from '@/components/flip/Flip1.vue'
import Flip2 from '@/components/flip/Flip2.vue'
import Flip3 from '@/components/flip/Flip3.vue'
import Flip4 from '@/components/flip/Flip4.vue'
let list = [
  { name: 'Flip1 - 元素交换位置', cmp: Flip1 },
  { name: 'Flip2 - flex布局动画', cmp: Flip2 },
  { name: 'Flip3 - 图片详情', cmp: Flip3 },
  { name: 'Flip4 - 图片放大', cmp: Flip4 },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.FlipView{
  background-color: darkgreen;
  nav {
  div {
    font-size: 18px;
    margin: 5px;
    transition: all 500ms;
  }
  .activeNav {
    color: red;
  }
}

}
</style>