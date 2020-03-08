<template>
  <div class="container">
    <header>
      <div class="back" @click="$router.back()">
        <Icon value="left" /> 返回
      </div>
      <div class="finish" @click="ok">完成</div>
    </header>
    <div class="tags-wrapper">
      <div v-for="(item, key) in tagList" :key="key">
        <Title :text="item[0].text" />
        <ul class="tags" >
          <li v-for="(tag) in item" :key="tag.value">
            <TagItem
              @click="onSelect"
              :current-tag="tag"
              :selectedTag="myTagValueList.indexOf(tag.value) === -1 ? null : tag"
              enhance-class="enhanceIcon"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import Icon from '@/components/Icon.vue'
  import Title from '@/components/Title.vue'
  import TagItem from '@/components/Tally/TagItem.vue'

  @Component({
    components: { TagItem, Title, Icon }
  })
  export default class Tags extends Vue {

    @Prop({required: true}) tags!: TagList
    @Prop({required: true }) myTags!: MyTagList

    tagList = this.tags
    myTagList = this.myTags
    myTagValueList = [] as string[]

    mounted() {
      this.myTagValueList = this.myTagList.map(tag => tag.value)
    }
    onSelect(tag: Tag) {
      if (this.myTagValueList.indexOf(tag.value) !== -1) {
        const index = this.myTagValueList.findIndex(value => value === tag.value)
        this.myTagValueList.splice(index, 1)
        this.myTagList = this.myTagList.filter((tag, i) => i !== index)
      } else {
        this.myTagValueList.splice(-1, 0, tag.value)
        this.myTagList.splice(-1, 0, tag)
      }
    }
    ok() {
      const routeName = this.$route.name
      if (routeName === 'OutlayTagList') {
        this.$store.commit('setMyOutlayTagList', this.myTagList)
      }
      if (routeName === 'IncomeTagList') {
        this.$store.commit('setMyIncomeTagList', this.myTagList)
      }
      this.$router.back()
    }
  }

</script>

<style scoped lang="scss">
  @import '~@/assets/styles/helper.scss';
  ::v-deep .enhanceIcon {
    width: 24px;
    height: 24px;
  }
  .container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    header {
      padding: 12px 20px;
      border-bottom: 1px solid #ddd;
      font-size: 18px;
      background: $primary-color;
      >.back {
        float: left;
      }
      >.finish {
        float: right;
      }
    }
    .tags-wrapper {
      overflow: auto;
      flex-grow: 1;
      padding: 16px 0;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 16px;
        li {
          align-content: flex-start;
          text-align: center;
          width: 25%;
          padding: 12px 0;
          font-size: 12px;
          color: #333;
          &.selected {
            border-radius: 50%;
          }
          &:nth-of-type(4n + 1) {
            color: #f7d680;
          }
          &:nth-of-type(4n + 2) {
            color: #b84e52;
          }
          &:nth-of-type(4n + 3) {
            color: #5079c8;
          }
          &:nth-of-type(4n) {
            color: #a4d09f;
          }
        }
      }
    }
  }

</style>