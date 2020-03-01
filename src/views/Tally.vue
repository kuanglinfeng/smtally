<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator'
  import NumberPad from '@/components/Tally/NumberPad.vue'
  import Types from '@/components/Tally/Types.vue'
  import FormItem from '@/components/Tally/FormItem.vue'
  import Tags from '@/components/Tally/Tags.vue'
  import recordListModel from '@/models/recordListModel'
  import tagListModel from '@/models/tagListModel'

  const recordList = recordListModel.fetch()
  const tagList = tagListModel.fetch()

  @Component({
    components: { FormItem, Types, NumberPad, Tags }
  })
  export default class Tally extends Vue {
    tags = tagList
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
      const record: RecordItem = recordListModel.clone(this.record)
      record.createdAt = new Date()
      this.recordList.push(record)
    }

    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save(this.recordList)
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

