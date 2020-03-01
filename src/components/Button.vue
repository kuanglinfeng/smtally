<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts">
  export default {
    name: 'Button.vue'
  }
</script>

<style scoped lang="scss">
  .button {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>