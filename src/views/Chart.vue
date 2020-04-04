<template>
  <Layout>
    <header>
      <label for="type">
        <select v-model="type" name="amount-type" id="type" class="amount-type">
          <option v-for="type in typeList" :key="type.value" :value="type.value">
            {{ type.name }}
          </option>
        </select>
        <Icon value="down" />
      </label>
      <ul class="interval">
        <li
          v-for="item in intervalList"
          :key="item.value" :class="item.value === interval ? 'selected': null"
          @click="onToggleInterval(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </header>
    <main>
      <div class="caption">
        <span v-if="interval ==='week'">本周</span>
        <span v-else-if="interval ==='month'">本月</span>
        <span v-else>今年</span>
      </div>
      <div class="total">{{ this.type === '-' ? '支出' : '收入' }}总额: ¥{{totalAmount}}</div>
      <div class="average">{{ this.type === '-' ? '支出' : '收入' }}均额: ¥{{averageAmount}}</div>
      <div id="graph"></div>
    </main>
    <footer>
      <div class="caption">{{ type === '+' ? '收入' : '支出' }}排行榜Top10</div>
      <div v-if="topTenRecords.length === 0">
        <Blank />
      </div>
      <ul class="ranking">
        <li v-for="record in topTenRecords" :key="record.id">
          <div class="tag-info">
            <div class="icon">
              <Icon :value="record.tag.value" />
            </div>
            <span>{{ record.tag.text }}</span>
            <span class="notes">{{ record.notes }}</span>
          </div>
          <div>{{ record.amount }}</div>
        </li>
      </ul>
    </footer>

  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Watch } from 'vue-property-decorator'
  import Layout from '@/components/Layout.vue'
  import Icon from '@/components/Icon.vue'
  import Day from '@/utils/Day'
  import Blank from '@/components/Blank.vue'

  const day = new Day(new Date())

  type DataItem = {
    name: string,
    value: string
  }

  @Component({
    components: { Blank, Layout, Icon }
  })
  export default class Chart extends Vue {
    public $echarts: any

    typeList: DataItem[] = [
      { name: '支出', value: '-' },
      { name: '收入', value: '+' }
    ]

    intervalList: DataItem[] = [
      { name: '周', value: 'week' },
      { name: '月', value: 'month' },
      { name: '年', value: 'year' },
    ]

    type: '+' | '-' = '-'
    interval: 'week' | 'month' | 'year' = 'week'

    renderChartData: Map<string, number> = new Map<string, number>()

    totalAmount: number = 0
    averageAmount: number = 0

    topTenRecords: RecordItem[] = []

    created() {
      this.$store.commit('fetchRecords')
    }

    init() {
      const records = this.filterRecordsByWeek(this.filterRecordsByType(this.type))
      this.renderChartData = this.groupByWeek(records)
      this.topTenRecords = this.getTopTenRecords(records)
    }

    private mounted() {
      this.init()
      this.draw()
    }

    get recordList(): RecordItem[] {
      return this.$store.state.recordList
    }

    getTopTenRecords(records: RecordItem[]) {
      const arr = records.sort((a, b) => b.amount - a.amount)
      if (arr.length > 10) {
        return arr.slice(0, 10)
      }
      return arr
    }

    @Watch('type')
    onTypeChange() {
      this.onIntervalChange()
      this.draw()
    }

    @Watch('interval')
    onIntervalChange() {
      if (this.interval === 'week') {
        this.init()
      }
      if (this.interval === 'month') {
        const records = this.filterRecordsByMonth(this.filterRecordsByType(this.type))
        this.renderChartData = this.groupByMonth(records)
        this.topTenRecords = this.getTopTenRecords(records)
      }
      if (this.interval === 'year') {
        const records = this.filterRecordsByYear(this.filterRecordsByType(this.type))
        this.renderChartData = this.groupByYear(records)
        this.topTenRecords = this.getTopTenRecords(records)
      }
      this.draw()
    }

    filterRecordsByType(type: '+' | '-') {
      return this.recordList.filter(record => record.type === type)
    }

    filterRecordsByWeek(records: RecordItem[]) {
      return records.filter(record => day.isSameWeek(new Date(record.date as string)))
    }

    filterRecordsByMonth(records: RecordItem[]) {
      return records.filter(record => day.isSameMonth(new Date(record.date as string)))
    }

    filterRecordsByYear(records: RecordItem[]) {
      return records.filter(record => day.isSameYear(new Date(record.date as string)))
    }

    // 将过滤后的记录集分组 并且返回指定的数据格式[{key: string, value: number}, ...]
    groupByWeek(records: RecordItem[]): Map<string, number> {
      const keys = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const result = new Map<string, number>()
      let totalAmount = 0
      for (let i = 0; i < keys.length; i++) {
        result.set(keys[i], 0)
      }
      let r: RecordItem
      for (r of records) {
        const key = keys[new Date(r.date as string).getDay()]
        const amount = result.get(key) as number
        result.set(key, amount + r.amount)
        totalAmount += r.amount
      }
      const temp = result.get('周日')
      result.delete('周日')
      result.set('周日', temp as number)
      this.totalAmount = totalAmount
      this.averageAmount = parseFloat((totalAmount / 7).toFixed(2))
      return result
    }

    groupByMonth(records: RecordItem[]): Map<string, number> {
      const result = new Map<string, number>()
      const date = new Date()
      const year = date.getFullYear()
      // 0 表示 1月
      const month = date.getMonth() + 1
      const days = Day.getDaysByYearAndMonth(year, month)
      let totalAmount = 0
      for (let i = 1; i <= days; i++) {
        result.set(i.toString(), 0)
      }
      let r: RecordItem
      for (r of records) {
        const key = new Date(r.date as string).getDate().toString()
        const amount = result.get(key) as number
        result.set(key, amount + r.amount)
        totalAmount += r.amount
      }
      this.totalAmount = totalAmount
      this.averageAmount = parseFloat((totalAmount / days).toFixed(2))
      return result
    }

    groupByYear(records: RecordItem[]): Map<string, number> {
      const keys = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      const result = new Map<string, number>()
      let totalAmount = 0
      for (let i = 0; i < keys.length; i++) {
        result.set(keys[i], 0)
      }
      let r: RecordItem
      for (r of records) {
        const key = keys[new Date(r.date as string).getMonth()]
        const amount = result.get(key) as number
        result.set(key, amount + r.amount)
        totalAmount += r.amount
      }
      this.totalAmount = totalAmount
      this.averageAmount = parseFloat((totalAmount / 12).toFixed(2))
      return result
    }

    onToggleInterval(interval: string) {
      this.interval = interval as 'week' | 'month' | 'year'
    }

    toArray(value: number, length: number): number[] {
      const result: number[] = []
      for (let i = 0; i < length; i++) {
        result.push(value)
      }
      return result
    }

    draw() {
      // 提取变量
      const x = [...this.renderChartData.keys()]
      const y = [...this.renderChartData.values()]
      const ele = document.getElementById('graph')
      const chart: any = this.$echarts.init(ele as HTMLDivElement)
      chart.setOption({
        grid: {
          top: '5%',
          bottom: '10%'
        },
        xAxis: {
          data: x,
          axisTick: {
            interval: 0,
            lineStyle: {
              opacity: 0
            }
          },
          axisLabel: {
            interval: 0,
            fontSize: 8,
            color: '#999999'
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              opacity: 0
            }
          },
          splitLine: {
            lineStyle: {
              opacity: 0
            }
          },
          axisLabel: undefined,
          axisTick: undefined,
        },
        series: [{
          type: 'line',
          data: y,
        }]
      })
    }
  }

</script>

<style scoped lang="scss">
  @import "~@/assets/styles/helper.scss";

  header {
    background: $primary-color;
    padding: 4px 0;
    label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    select.amount-type {
      font-size: 20px;
      padding: 4px 0;
    }
    ul.interval {
      margin: 8px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        font-size: 14px;
        width: 33%;
        border: 1px solid #333;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.selected {
          background: #333;
          color: $primary-color;
        }
        &:first-child {
          margin-right: -1px;
          border-radius: 4px 0 0 4px;
        }
        &:last-child {
          margin-left: -1px;
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }

  main {
    padding: 6px 0;
    border-bottom: 1px solid #dddddd;
    > .caption {
      border-bottom: 1px solid #dddddd;
      display: flex;
      span {
        padding: 8px 16px;
        font-size: 14px;
      }
    }
    > .total {
      font-size: 14px;
      color: #999999;
      text-align: left;
      padding: 6px 6px;
    }
    > .average {
      font-size: 12px;
      color: #999999;
      text-align: left;
      padding: 0 6px;
      margin-bottom: 16px;
    }
    > #graph {
      width: 100%;
      height: 150px;
    }
  }

  ::v-deep .icon {
    width: 24px;
    height: 24px;
  }

  ::v-deep .blank {
    margin-top: 30px;
  }

  ::v-deep .content {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  footer {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    /* 添加这一行 */
    overflow: auto;
    .caption {
      text-align: left;
      font-size: 14px;
      padding: 6px 16px;
    }
    .ranking {
      flex-grow: 1;
      overflow: auto;
      padding: 6px 16px;
      > li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;
        box-shadow: inset 0 -1px 1px -1px rgba(0, 0, 0, .1);
        font-size: 14px;
        > .tag-info {
          display: flex;
          align-items: center;
          > div.icon {
            background: #f5f5f5;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            justify-content: center;
            margin-right: 8px;
            display: flex;
            align-items: center;
          }
          > span {
            margin-right: 8px;
            line-height: 32px;
          }
          > span.notes {
            font-size: 12px;
            color: #bbb;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

</style>