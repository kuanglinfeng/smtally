<template>
  <Tags :tags="outlayTagList" :my-tags="$store.state.myOutlayTagList"/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Tags from '@/components/Tally/Tags.vue'
  import { outlayTagList } from '@/constants/tagList'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: { Tags }
  })
  export default class OutlayTagList extends Vue {

    outlayTagList = {} as TagList
    myOutlayTagList = [] as MyTagList

    created() {
      this.outlayTagList = outlayTagList
      this.$store.commit('fetchMyOutlayTagList')
    }
  }

</script>

<style scoped lang="scss">

</style>