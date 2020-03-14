<template>
  <Layout>
    <Confirm :is-show="isShowConfirm" message="确定执行此操作" @update:value="submit"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import Layout from '@/components/Layout.vue'
  import Confirm from '@/components/Confirm.vue'

  @Component({
    components: { Confirm, Layout }
  })
  export default class Chart extends Vue {
    isShowConfirm = true

    submit(isEnsure: boolean) {
      console.log(isEnsure)
      this.isShowConfirm = false
    }
  }

</script>

<style scoped lang="scss">

</style>