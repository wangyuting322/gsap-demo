<template>
  <div class="ViewBox-wrapper">
    <!-- <svg
      class="mySvg"
      viewBox="0 0 1920 100"
      preserveAspectRatio="none"
    > -->
    <svg
      class="mySvg"
      viewBox="0 0 1920 100"
      preserveAspectRatio="xMidYMin slice"
    >
      <polygon
        points="0,0 0,40 700,40 720,60 1200,60 1220,40 1920,40 1920,0"
        stroke-linejoin="round"
        fill="#1F2126"
        stroke="#1F2126"
        stroke-width="20"
      ></polygon>
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
