<template>
  <Tags :tags="incomeTagList" :my-tags="$store.state.myIncomeTagList"/>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Tags from '@/components/Tally/Tags.vue'
  import { incomeTagList } from '@/constants/tagList'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: { Tags }
  })
  export default class IncomeTagList extends Vue {

    incomeTagList = {} as TagList
    myIncomeTagList = [] as MyTagList

    created() {
      this.incomeTagList = incomeTagList
      this.$store.commit('fetchMyIncomeTagList')
    }
  }

</script>

<style scoped lang="scss">

</style>