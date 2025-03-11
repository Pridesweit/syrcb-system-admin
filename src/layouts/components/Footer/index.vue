<template>
  <div class="footer flx-center">
    <a href="https://patienyon.cn" target="_blank">
      Syrcb-System v{{ version }} | Copyright © 2024-{{ new Date().getFullYear() }} Patienyon
    </a>
  </div>
</template>
<script setup lang="ts">
import pkg from 'package.json';
const version: string = pkg.version;
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
