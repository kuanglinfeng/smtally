
const db = {
  set(key: string, value: string) {
    window.localStorage.setItem(key, value)
  },
  get(key: string) {
    const str = window.localStorage.getItem(key)
    if (str === null) return null
    return JSON.parse(str)
  }
}

export default db