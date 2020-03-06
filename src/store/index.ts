import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId'
import router from '@/router'

Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    // 记账的相关操作
    fetchRecords(state: RootState) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    saveRecords(state: RootState) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    createRecord(state: RootState, record: RecordItem) {
      const _record: RecordItem = clone(record)
      _record.createdAt = new Date().toISOString()
      state.recordList?.push(_record)
      store.commit('saveRecords')
    },
    // 标签的相关操作
    fetchTags(state: RootState) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if (!state.tagList || state.tagList.length === 0) {
      }
    },
    saveTags(state: RootState) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    createTag(state: RootState, name: string) {
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) return window.alert('标签名重复了！')

      const id = createId().toString()
      state.tagList.push({ id, name: name })
      store.commit('saveTags')
      window.alert('添加成功')
    },
    setCurrentTag(state: RootState, id: string) {
      state.currentTag = state.tagList.filter(tag => tag.id === id)[0]
    },
    updateTag(state: RootState, payload: { id: string, name: string }) {
      const { id, name } = payload
      const idList = state.tagList.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name)
        if (names.indexOf(name) >= 0) {
          window.alert('标签吗重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.name = name
          store.commit('saveTags')
        }
      }
    },
    removeTag(state: RootState, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      } else {
        window.alert('删除失败')
      }
    },
  },
  actions: {},
  modules: {}
})


export default store
