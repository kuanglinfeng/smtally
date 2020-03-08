<template>
  <div class="tally">
    <Types />
    <!-- 这里会根据路由显示 MyIncomeTagList 或者 MyOutlayTagList   -->
    <router-view @update:value="onSelectTag"/>
    <div class="pad">
      <Notes
        @update:value="onUpdateNotes"
        field-name="备注："
        placeholder="写点备注吧~"
        :notesValue="record.notes"
      />
      <NumberPad @update:value="onUpdateAmount" @submit="addRecord" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import Types from '@/components/Tally/Types.vue'
  import Notes from '@/components/Tally/Notes.vue'
  import NumberPad from '@/components/Tally/NumberPad.vue'

  @Component({
    components: { Types, NumberPad, Notes }
  })
  export default class Tally extends Vue {

    created() {
      this.$store.commit('fetchRecords')
    }

    record: RecordItem = {
      type: '-', tag: {text: '餐饮', value: 'catering'}, notes: '', amount: 0
    }

    onUpdateAmount(amount: number) {
      this.record.amount = amount
    }

    onUpdateNotes(notes: string) {
      this.record.notes = notes
    }

    onSelectTag(tag: Tag) {
      this.record.tag = tag
    }

    addRecord() {
      const record: RecordItem = {...this.record}
      const routeName = this.$route.name
      if (routeName === 'Outlay') {
        record.type = '-'
      } else if (routeName === 'Income') {
        record.type = '+'
      }
      this.$store.commit('addRecord', record)
      this.record.notes = ''
    }
  }

</script>

<style scoped lang="scss">
  @import "~@/assets/styles/helper.scss";

  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .tally {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .pad {
      @extend %innerShadow;
    }
  }

</style>