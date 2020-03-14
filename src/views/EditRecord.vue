<template>
  <div class="edit-record">
    <header>
      <div class="back" @click="$router.back()">
        <Icon value="left" />
      </div>
      <div class="tag-wrapper">
        <div class="tag">
          <Icon :value="record.tag.value" />
        </div>
        <span>{{ record.tag.text }}</span>
      </div>
      <div></div>
    </header>
    <main>
      <ul class="items">
        <li>
          <span>类型</span>
          <div>{{ record.type === '+' ? '收入' : '支出' }}</div>
        </li>
        <li>
          <label for="amount">
            <span>金额</span>
            <input id="amount" @input="changeAmount" :value="record.amount" type="number"/>
          </label>
        </li>
        <li>
          <span>日期</span>
          <div>{{ record.date.split('T')[0] }}</div>
        </li>
        <li>
          <label for="notes">
            <span>备注</span>
            <input id="notes" v-model="record.notes" />
          </label>
        </li>
      </ul>
    </main>
    <footer>
      <button class="finish" @click="submit">编辑完成</button>
      <button class="delete" @click="remove">删除</button>
    </footer>
    <Confirm :is-show="isShowTip" message="确定删除这条记录吗" @update:value="ensure" />
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import Icon from '@/components/Icon.vue'
  import Confirm from '@/components/Confirm.vue'

  @Component({
    components: { Icon, Confirm }
  })
  export default class EditRecord extends Vue {

    isShowTip = false

    record = {}

    created() {
      const id = this.$route.params.id
      this.$store.commit('fetchRecords')
      this.$store.commit('getRecord', id)
      this.record = this.$store.state.record
    }

    remove() {
      this.isShowTip = true
    }

    changeAmount(e) {
      const value = parseFloat(e.target.value)
      if (isNaN(value)) this.record.amount = 0
      else this.record.amount = value
    }
    ensure(isEnsure) {
      if (isEnsure) {
        this.$store.commit('removeRecord', this.record.id)
        this.$router.back()
      }
      this.isShowTip = false
    }

    submit() {
      const id = this.record.id
      const record = this.record
      this.$store.commit('editRecord', {id, newRecord: record })
      this.$router.back()
    }
  }

</script>

<style scoped lang="scss">
  @import '~@/assets/styles/helper.scss';

  ::v-deep .icon {
    width: 24px;
    height: 24px;
  }

  .edit-record {
    header {
      background: $primary-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      .tag-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .tag {
          background: #f5f5f5;
          padding: 8px;
          border-radius: 50%;
          margin-bottom: 8px;
        }
      }
    }
    main {
      .items {
        font-size: 16px;
        > li {
          margin-left: 16px;
          padding: 12px 0 12px 16px;
          border-bottom: 1px solid #ddd;
          display: flex;
          align-items: center;
          span {
            color: #999;
            margin-right: 16px;
          }
          div {
            height: 40px;
            display: flex;
            align-items: center;
          }
          input {
            flex-grow: 1;
            height: 40px;
            border: none;
            font-size: inherit;
          }
        }
      }
    }
    footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #ddd;
      padding: 0 16px;
      button {
        width: 50%;
        font-size: 14px;
        padding: 4px 0;
        margin: 12px 0;
      }
      > .finish {
        border-right: 1px solid #ddd;
      }
      > .delete {
        color: #b84e52;
      }
    }
  }
</style>