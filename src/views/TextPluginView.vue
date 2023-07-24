<template>
  <div class="TextPluginView flex-col">
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
import TextAni from '@/components/textPlugin/TextAni.vue'
let list = [
  { name: '文字动画', cmp: TextAni },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.TextPluginView {

}
</style>