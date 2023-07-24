<template>
  <div class="ViewBox-wrapper">
    <svg
      class="mySvg"
      viewBox="0 0 1920 100"
      preserveAspectRatio="xMidYMin slice"
    >
   <path d="M20 20 H 40 V 40 H 20 Z " stroke="black"  stroke-width="2"></path>
   <path d="M20 20 C20 20, 40 20 ,50 10" stroke="black" stroke-width="2"></path>
    </svg>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<style lang="scss" scoped>
.ViewBox-wrapper {
  height: 100px;
  width: 100%;
}

svg {
  width: 100%;
  height: 100px;
  max-height: 100%;
}
</style>
