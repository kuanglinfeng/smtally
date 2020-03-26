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
      <div id="graph"></div>
    </main>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import Layout from '@/components/Layout.vue'
  import Icon from '@/components/Icon.vue'


  type DataItem = {
    name: string,
    value: string
  }

  @Component({
    components: { Layout, Icon }
  })
  export default class Chart extends Vue {
    public $echarts: any

    typeList: DataItem[] = [
      {name: '支出', value: '-'},
      {name: '收入', value: '+'}
    ]

    intervalList: DataItem[] = [
      {name: '周', value: 'week'},
      {name: '月', value: 'month'},
      {name: '年', value: 'year'},
    ]

    type: '+' | '-' = '-'
    interval: 'week' | 'month' | 'year' = 'week'

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

    draw(data: Map<string, number>) {
      // 提取变量
      const x = [...data.keys()]
      const y = [...data.values()]
      const chart = echarts.init(document.getElementById('#chart') as HTMLDivElement)
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
        }, {
          name: '最大值',
          type: 'line',
          data: this.toArray(Math.max(...y), x.length),
          symbol: 'none',
          lineStyle: {
            color: '#999999',
            width: 1,
            opacity: 0.5
          }
        }]
      })
    }


    private options: object = {
      grid: {
        top: '5%',
        bottom: '10%'
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        axisTick: {
          interval: 0,
          lineStyle: {
            opacity: 0
          }
        },
        axisLabel: {
          interval: 0,
          fontSize: 6,
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
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    private mounted() {
      const ele = document.getElementById('graph')
      const chart: any = this.$echarts.init(ele as HTMLDivElement)
      chart.setOption(this.options)
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
    > #graph {
      width: 100%;
      height: 150px;
    }
  }

</style>