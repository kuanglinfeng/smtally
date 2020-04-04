import init = echarts.init

class Day {
  constructor(public date: Date) {
    this.date = date
  }

  // 获取年-月-日
  getDate(): string {
    return this.date.toISOString().split('T')[0]
  }

  getYear(): string {
    return this.getDate().split('-')[0]
  }

  getMonth(): string {
    return this.getDate().split('-')[1]
  }

  getDay(): string {
    let str = this.date.getDate().toString()
    if (str.length === 1) str = '0' + str
    return str
  }

  // 获取过去二十年的年份数组
  getPastTwentyYears(): string[] {
    const current = this.date.getFullYear()
    const result = []
    for (let i = current; i > current - 20; i--) {
      result.push(i.toString())
    }
    return result
  }

  // 是否是闰年
  static isLeapYear(year: number): boolean {
    return year / 4 === 0 && year / 100 !== 0 || year / 400 === 0
  }

  // 获取某年某月的天数
  static getDaysByYearAndMonth(year: number, month: number): number {
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      return 31
    }
    if (month === 2 && this.isLeapYear(year)) {
      return 28
    }
    if (month === 2 && !this.isLeapYear(year)) {
      return 29
    }
    return 30
  }

  // 判断某个日期是否和当前日期是在同一周
  isSameWeek(date: Date) {
    const oneDay = 24 * 3600 * 1000
    // 从1970年1月1日（星期四）后开始的第一个星期一是 1970年1月5日，以这一天作为第一周的起点
    const initDate = new Date(4 * oneDay)
    const initTime = initDate.getTime()
    const week = parseInt((date.getTime() - initTime) / (7 * oneDay) + '')
    const nowWeek = parseInt((this.date.getTime() - initTime) / (7 * oneDay) + '')
    return week === nowWeek
  }

  // 判断某个日期是否和当前日期在同一月
  isSameMonth(date: Date) {
    return (this.date.getFullYear() === date.getFullYear() && this.date.getMonth() === date.getMonth())
  }

  // 判断某个日期是否和当前日期在同一年
  isSameYear(date: Date) {
    return this.date.getFullYear() === date.getFullYear()
  }
}

export default Day