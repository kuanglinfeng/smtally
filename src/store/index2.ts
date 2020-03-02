import recordListModel from '@/models/recordListModel'
import tagListModel from '@/models/tagListModel'

export default {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),

  // tag store
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name)
    if (message === 'success') {
      window.alert('添加成功！')
    }
    if (message === 'duplicated') {
      window.alert('标签名重复了！')
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name)
  },
  findTag(id: string) {
    return this.tagList.filter(tag => tag.id === id)[0]
  }
}