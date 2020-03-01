const localStorageKeyName = 'tagList'

type Tag = {
  id: string
  name: string
}

type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' // success 表示成功 duplicated 表示name重复
  save: () => void
}

const tagListModel: TagListModel = {
  data: [],
  // 获取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.data
  },
  // 保存数据
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
  },
  create(name: string) {
    const names = this.data.map(item => item.name)
    if (names.indexOf(name) >= 0) return 'duplicated'
    this.data.push({id: name, name: name})
    this.save()
    return 'success'
  }
}


export default tagListModel