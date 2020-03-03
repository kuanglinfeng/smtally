<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
<!--    <Types :value.sync="record.type" />-->
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
        field-name="备注"
        placeholder="在这里输入备注"
      />
    </div>
    <Tags @update:value="record.tags = $event" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import NumberPad from '@/components/Tally/NumberPad.vue'
  import Types from '@/components/Tally/Types.vue'
  import FormItem from '@/components/Tally/FormItem.vue'
  import Tags from '@/components/Tally/Tags.vue'
  import recordTypeList from '@/constants/recordTypeList'
  import Tabs from '@/components/Tabs.vue'

  @Component({
    components: { FormItem, Types, NumberPad, Tags, Tabs },
  })
  export default class Tally extends Vue {

    get recordList() {
      return this.$store.state.recordList
    }

    recordTypeList = recordTypeList

    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    }

    created() {
      this.$store.commit('fetchRecords')
    }

    onUpdateNotes(value: string) {
      this.record.notes = value
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value)
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record)
    }

  }

</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .notes {
    padding: 12px 0;
  }
</style>

