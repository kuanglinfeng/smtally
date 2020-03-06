<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group, index) in groupedList" :key="group.title">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li
            v-for="item in group.items"
            :key="item.id"
            class="record"
          >
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import Tabs from '@/components/Tabs.vue'
  import intervalList from '@/constants/intervalList'
  import recordTypeList from '@/constants/recordTypeList'
  import dayjs from 'dayjs'
  import clone from '@/lib/clone'

  @Component({
    components: { Tabs }
  })
  export default class Statistics extends Vue {

    tagString(tags: Tag[]) {
      if (tags.length === 0) return '无'
      const names = tags.map(tag => tag.name)
      return names.join(',')
    }

    beautify(string: string) {
      const day = dayjs(string)
      const now = dayjs()
      if (day.isSame(now, 'day')) {
        return '今天'
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天'
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天'
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日')
      } else {
        return day.format('YYYY年M月D日')
      }
    }

    get recordList() {
      return this.$store.state.recordList
    }
    get groupedList() {
      const recordList = this.recordList
      const newList = clone(recordList).filter((r: RecordItem) => r.type === this.type)
        .sort((a: RecordItem, b: RecordItem) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
      type Result = {
        title: string
        total?: number
        items: RecordItem[]
      }[]
      const result: Result = [{
        title: dayjs(newList[0].createdAt).format('YYYY-M-D'), items: [newList[0]]
      }]
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i]
        const last = result[result.length - 1]
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current)
        } else {
          result.push({
            title: dayjs(current.createdAt).format('YYYY-M-D'), items: [current]
          })
        }
      }
      result.forEach(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0)
      })
      return result
    }

    beforeCreate() {
      console.log('statistics before create')
      this.$store.commit('fetchRecords')
    }

    type = '-'
    interval = 'day'
    intervalList = intervalList
    recordTypeList = recordTypeList
  }

</script>

<style scoped lang="scss">
  ::v-deep {
    .type-tabs-item {
      background: white;
      &.selected {
        background: #c4c4c4;
        &::after {
          display: none;
        }
      }
    }
    .interval-tabs-item {
      height: 48px;
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    @extend %item;
    background: white;
  }

  .notes {
    margin-right: auto;
    margin-left: 24px;
    color: #999;
  }

</style>
