class Day {
  constructor(private date: Date) {
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
    return this.getDate().split('-')[2]
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
}
export default Day