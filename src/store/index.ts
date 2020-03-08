import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/utils/db'
import clone from '@/utils/clone'
import createId from '@/utils/createId'
import { myIncomeTagList, myOutlayTagList } from '@/constants/tagList'

Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[],
  myOutlayTagList: MyTagList,
  myIncomeTagList: MyTagList
}

// 修改记录的payload id表示要修改的记录的id newRecord修改后的新纪录
type EditRecordPayload = {
  id: string,
  newRecord: RecordItem
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    myOutlayTagList: [],
    myIncomeTagList: []
  } as RootState,
  mutations: {
    fetchMyOutlayTagList(state: RootState) {
      state.myOutlayTagList = db.get('myOutlayTagList') || [...myOutlayTagList]
    },
    setMyOutlayTagList(state: RootState, newList: MyTagList) {
      state.myOutlayTagList = [...newList]
      db.set('myOutlayTagList', JSON.stringify(state.myOutlayTagList))
    },
    fetchMyIncomeTagList(state: RootState) {
      state.myIncomeTagList = db.get('myIncomeTagList') || [...myIncomeTagList]
    },
    setMyIncomeTagList(state: RootState, newList: MyTagList) {
      state.myIncomeTagList = [...newList]
      db.set('myIncomeTagList', JSON.stringify(state.myIncomeTagList))
    },

    // record operation
    fetchRecords(state: RootState) {
      state.recordList = db.get('recordList') || []
    },
    addRecord(state: RootState, record: RecordItem) {
      const r: RecordItem = clone(record)
      r.id = createId()
      r.date = new Date().toISOString()
      state.recordList && state.recordList.push(r)
      db.set('recordList', JSON.stringify(state.recordList))
    },
    removeRecord(state: RootState, id: string) {
      if (state.recordList.length === 0) return
      const index: number = state.recordList.findIndex(record => record.id === id)
      if (index === -1) return
      const _recordList = clone(state.recordList)
      _recordList.splice(index, 1)
      db.set('recordList', JSON.stringify(_recordList))
    },
    editRecord(state: RootState, payload: EditRecordPayload) {
      const { id, newRecord } = payload
      store.commit('removeRecord', id)
      store.commit('fetchRecords')
      let _recordList = clone(state.recordList)
      newRecord.id = id
      newRecord.date = new Date().toISOString()
      _recordList.push(newRecord)
      db.set('recordList', JSON.stringify(_recordList))
    }
  },
  actions: {},
  modules: {}
})

export default store
