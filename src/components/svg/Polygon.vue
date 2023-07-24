<template>
  <div class="Polygon">
    <svg width="1920" height="200">
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
.Polygon {
}
</style>
