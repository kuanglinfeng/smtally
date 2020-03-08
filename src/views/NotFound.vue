<template>
  <div class="not-found">
   这个页面不存在呀！ ⊙ω⊙
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NotFound'
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/styles/helper.scss';
  .not-found {
    margin-top: 30px;
    text-align: center;
    font-size: 20px;
    color: $primary-color;
  }
</style>