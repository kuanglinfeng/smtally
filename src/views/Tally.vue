<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types :xxx="333" />
    <Notes />
    <Tags :data-source="tags"/>
  </Layout>
</template>

<script lang="js">
  import NumberPad from '@/components/Tally/NumberPad.vue'
  import Types from '@/components/Tally/Types.vue'
  import Notes from '@/components/Tally/Notes.vue'
  import Tags from '@/components/Tally/Tags.vue'

  export default {
    name: 'Tally',
    components: { Notes, Types, NumberPad, Tags },
    data() {
      return {
        tags: ['衣', '食', '住', '行', '彩票']
      }
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

