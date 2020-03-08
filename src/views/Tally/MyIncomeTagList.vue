<template>
  <MyTags type="+" @update:value="onSelect"/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import MyTags from '@/components/Tally/MyTags.vue'

  @Component({
    components: { MyTags }
  })
  export default class MyIncomeTagList extends Vue {
    onSelect(tag: Tag) {
      this.$emit('update:value', tag)
    }
  }
</script>

<style scoped lang="scss">

</style>