<template>
  <h3 class="title" :class="enhanceClass">{{ text }}</h3>
</template>

<script lang="ts">
  export default {
    name: 'Title',
    props: ['text', 'enhanceClass']
  }
</script>

<style scoped lang="scss">

  .title {
    font-size: 16px;
    color: #999;
    text-align: center;
    padding-top: 8px;
  }
</style>