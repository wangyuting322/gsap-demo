<template>
  <div class="ScrollTriggerView flex-col">
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
import ScrollTrigger from '@/components/scrollTrigger/ScrollTrigger.vue'
import ScrollShowBox from '@/components/scrollTrigger/ScrollShowBox.vue'
let list = [
  { name: '滚动+timeline', cmp: ScrollTrigger },
  { name: '依次滚动', cmp: ScrollShowBox },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.ScrollTriggerView{
  // background-color: paleturquoise;
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