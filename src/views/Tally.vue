<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types xxx="hi"/>
    <Notes />
    <Tags />
  </Layout>
</template>

<script lang="ts">
  import NumberPad from '@/components/Tally/NumberPad.vue'
  import Types from '@/components/Tally/Types.vue'
  import Notes from '@/components/Tally/Notes.vue'
  import Tags from '@/components/Tally/Tags.vue'

  export default {
    name: 'Tally',
    components: { Notes, Types, NumberPad, Tags }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

