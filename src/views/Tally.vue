<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator'
  import NumberPad from '@/components/Tally/NumberPad.vue'
  import Types from '@/components/Tally/Types.vue'
  import Notes from '@/components/Tally/Notes.vue'
  import Tags from '@/components/Tally/Tags.vue'
  import model from '@/model'

  const recordList = model.fetch()

  @Component({
    components: { Notes, Types, NumberPad, Tags }
  })
  export default class Tally extends Vue {
    tags = ['衣', '食', '住', '行']
    recordList: RecordItem[] = recordList
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    }

    onUpdateTags(value: string[]) {
      this.record.tags = value
    }

    onUpdateNotes(value: string) {
      this.record.notes = value
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value)
    }

    saveRecord() {
      const record: RecordItem = model.clone(this.record)
      record.createdAt = new Date()
      this.recordList.push(record)
    }

    @Watch('recordList')
    onRecordListChange() {
      model.save(this.recordList)
    }
  }


</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

