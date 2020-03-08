
type RecordItem = {
  id?: string
  // + 表示收入 - 表示支出
  type: '+' | '-'
  tag: Tag
  notes?: string
  amount: number
  date?: string
}

type Tag = {
  text: string
  value: string
}

type MyTagList = Tag[]

type TagList = {
  [key: string]: Tag[]
}
