<template>
  <Layout>
    <div class="detail-wrapper">
      <div class="detail">
        <header>
          <div class="logo">记个小账</div>
          <div class="info">
            <div class="calendar">
              <label for="year" class="year">
                <select name="年" id="year" @change="getChangeValue">
                  <option
                    v-for="year in getPastTwentyYears()"
                    :selectYear="year"
                    :key="year">{{ year }}
                  </option>
                </select>
                <span>年</span>
              </label>
              <label for="month" class="month">
                <select name="月" id="month" @change="getChangeValue">
                  <option
                    v-for="n in 12"
                    :value="fixZero(n)"
                    :selected="+month === n"
                    :key="n"
                  >{{ fixZero(n) }}
                  </option>
                </select>
                <span>月</span>
              </label>
            </div>
            <div class="total">
              <div class="income">
                <div class="title">月收入</div>
                <div class="value">{{ calcMonthAmount('+') }}</div>
              </div>
              <div class="outlay">
                <div class="title">月支出</div>
                <div class="value">{{ calcMonthAmount('-') }}</div>
              </div>
              <div></div>
            </div>
          </div>
        </header>
        <div class="selectDay">
          <label for="day" class="day" @change="getChangeValue">
            <select name="日" id="day">
              <option
                v-for="n in getDaysByYearAndMonth()"
                :value="fixZero(n)"
                :selected="+day === n"
                :key="n"
              >
                {{ fixZero(n) }}
              </option>
            </select>
            <span>日<Icon value="down" /></span>
          </label>
          <span>{{ showWeek() }}</span>
        </div>
        <div v-if="showList.length === 0">
          <Blank />
        </div>
        <div v-else class="items">
          <router-link :to="'/detail/edit/' + record.id" v-for="record in showList" :key="record.id">
            <div class="tag">
              <Icon :value="record.tag.value" />
              <span>{{ record.tag.text }}</span>
            </div>
            <div class="amount">
              {{ record.type === '+' ? '+' + record.amount.toFixed(2) : '-' + record.amount.toFixed(2) }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Layout from '@/components/Layout.vue'
  import { Component } from 'vue-property-decorator'
  import Blank from '@/components/Blank.vue'
  import Icon from '@/components/Icon.vue'
  import Day from '@/utils/Day'

  const day = new Day(new Date())

  @Component({
    components: { Layout, Blank, Icon }
  })
  export default class Detail extends Vue {

    year = day.getYear()
    month = day.getMonth()
    day = day.getDay()

    showList = [] as RecordItem[]

    created() {
      this.$store.commit('fetchRecords')
      this.showList = this.filterRecordList()
    }

    getChangeValue(e: any) {
      const { name, value } = e.target
      if (name === '年') this.year = value
      if (name === '月') this.month = value
      if (name === '日') this.day = value
      this.showList = this.filterRecordList()
    }

    filterRecordList(): RecordItem[] {
      return this.$store.state.recordList.filter((record: RecordItem) => {
        const isoDate = record.date!.split('T')[0]
        return this.year + '-' + this.month + '-' + this.day === isoDate
      })
    }

    calcMonthAmount(type: '+' | '-') {
      let amount = 0
      this.$store.state.recordList.forEach((record: RecordItem) => {
        const isoDate = record.date!.split('T')[0]
        const date = isoDate.split('-')[0] + isoDate.split('-')[1]
        if (this.year + this.month === date && record.type === type) {
          amount += record.amount
        }
      })
      return amount.toFixed(2)
    }

    showWeek() {
      const dateStr = this.year + '-' + this.month + '-' + this.day
      const date = new Date(dateStr)
      let enhanceInfo = ''
      if (new Date().toISOString().split('T')[0] === dateStr) {
        enhanceInfo += '今天 '
      }
      return enhanceInfo + '星期' + '日一二三四五六'.charAt(date.getDay())
    }

    fixZero(n: number) {
      return n.toString().length === 1 ? '0' + n : n
    }

    getPastTwentyYears() {
      return day.getPastTwentyYears()
    }

    getDaysByYearAndMonth(): number {
      return Day.getDaysByYearAndMonth(+this.year, +this.month)
    }
  }

</script>

<style scoped lang="scss">
  @import '~@/assets/styles/helper.scss';

  .items ::v-deep .icon {
    width: 30px;
    height: 30px;
  }

  .detail-wrapper {
    header {
      background: $primary-color;
      .logo {
        font-weight: bold;
        text-align: center;
        font-style: italic;
        font-size: 18px;
        padding-top: 8px;
      }
      .info {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        .calendar {
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .year {
            @extend %miniFont;
          }
          .month {
            font-size: 20px;
          }
          &::after {
            content: "";
            display: block;
            width: 1px;
            height: 24px;
            background: #333;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
          }
        }
        .total {
          display: flex;
          justify-content: space-between;
          padding: 4px 16px;
          flex-grow: 1;
          .income > .title, .outlay > .title {
            @extend %miniFont;
          }
        }
      }
    }
    .selectDay {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      @extend %titleFont;
    }
    .day-amount {
      @extend %titleFont;
      display: flex;
      justify-content: space-between;
    }
    .items {
      display: flex;
      flex-direction: column;
      padding: 0 8px;
      > a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 4px;
        border-bottom: 1px solid #eee;
        .tag {
          display: flex;
          align-items: center;
          > span {
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>