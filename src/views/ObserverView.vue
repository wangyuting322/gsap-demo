<template>
  <div class="ObserverView flex-col">
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
import Observer from '@/components/observer/Observer.vue'
let list = [
  { name: 'observer', cmp: Observer },
]
let activeIndex = ref(0)
function changeAcctive(index) {
  activeIndex.value = index
}
</script>
<style lang="scss" scoped>
.ObserverView{

}
</style>