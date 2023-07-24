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
import ChangeBox from '@/components/flip/ChangeBox.vue'
import FlexAni from '@/components/flip/FlexAni.vue'
import ImageInfo from '@/components/flip/ImageInfo.vue'
import ImageShrink from '@/components/flip/ImageShrink.vue'
import AddBox from '@/components/flip/AddBox.vue'
let list = [
  { name: '元素交换位置', cmp: ChangeBox },
  { name: 'flex布局动画', cmp: FlexAni },
  { name: '图片详情', cmp: ImageInfo },
  { name: '图片放大', cmp: ImageShrink },
  { name: '添加box', cmp: AddBox },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.FlipView{
  background-color: darkgreen;

}
</style>