<template>
  <div class="myTags-wrapper">
    <ul>
      <li v-for="myTag in myTagList" :key="myTag.value">
        <TagItem
          @click="onSelect"
          :current-tag="myTag"
          enhance-class="enhanceIcon"
          :selected-tag="selectedTag"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import TagItem from '@/components/Tally/TagItem.vue'

  @Component({
    components: { TagItem }
  })
  export default class MyTags extends Vue {
    @Prop({required: true}) type!: string

    myTagList = []
    selectedTag = {} as Tag

    mounted() {
      if (this.type === '+') {
        this.$store.commit('fetchMyIncomeTagList')
        this.myTagList = this.$store.state.myIncomeTagList
        this.selectedTag = this.$store.state.myIncomeTagList[0]
      } else if (this.type === '-') {
        this.$store.commit('fetchMyOutlayTagList')
        this.myTagList = this.$store.state.myOutlayTagList
        this.selectedTag = this.$store.state.myOutlayTagList[0]
      }
      this.submit()
    }

    submit() {
      if (this.selectedTag.value === 'setting') {
        this.selectedTag = {value: 'other', text: '其它'}
      }
      this.$emit('update:value', this.selectedTag)
    }

    onSelect(tag: Tag) {
      this.selectedTag = tag
      this.submit()
    }
  }
</script>

<style scoped lang="scss">
  @import '~@/assets/styles/helper.scss';

  ::v-deep .enhanceIcon {
    width: 40px;
    height: 40px;
  }

  ::v-deep .icon-outerWrapper .icon-innerWrapper.selected {
    background: $primary-color;
    border: none;
  }

  .myTags-wrapper {
    flex-grow: 1;
    overflow: auto;
    padding: 16px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 12px 0;
        font-size: 12px;
        color: #333;
        width: 25%;
        display: inline-block;

      }
    }

  }

</style>