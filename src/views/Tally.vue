<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value.sync="record.type" />
    <div class="notes">
      <FormItem
        @update:value="onUpdateNotes"
        field-name="备注"
        placeholder="在这里输入备注"
      />
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import NumberPad from '@/components/Tally/NumberPad.vue'
  import Types from '@/components/Tally/Types.vue'
  import FormItem from '@/components/Tally/FormItem.vue'
  import Tags from '@/components/Tally/Tags.vue'

  @Component({
    components: { FormItem, Types, NumberPad, Tags }
  })
  export default class Tally extends Vue {
    tags = window.tagList
    recordList = window.recordList
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
      window.createRecord(this.record)
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

