<template>
  <div class="layout-wrapper">
    <div class="content" :class="`classPrefix && ${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
  import Nav from '@/components/Nav.vue'
  export default {
    name: 'Layout',
    props: ['classPrefix'],
    components: {Nav}
  }
</script>

<style scoped lang="scss">

  .layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .content {
      flex-grow: 1;
    }
  }
</style>