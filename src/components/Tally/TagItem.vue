<template>
  <div class="icon-outerWrapper">
    <div
      class="icon-innerWrapper"
      :class="{selected: selectedTag && currentTag.value === selectedTag.value}"
      @click="onSelect"
    >
      <Icon :value="currentTag.value" :class="enhanceClass"/>
    </div>
    <span class="text" v-if="currentTag.text">{{ currentTag.text }}</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import Icon from '@/components/Icon.vue'
  @Component({
    components: { Icon }
  })
  export default class TagItem extends Vue {
    @Prop(String) enhanceClass!: string
    // 当前渲染的tag信息
    @Prop() currentTag!: Tag
    // 用户选中的tag信息
    @Prop() selectedTag!: Tag

    onSelect() {
      const tag: Tag = {text: this.currentTag.text, value: this.currentTag.value}
      if (tag.value === 'setting') {
        const routeName = this.$route.name
        if (routeName === 'Outlay') {
          this.$router.push('/outlayTagList')
        } else if (routeName === 'Income') {
          this.$router.push('/incomeTagList')
        }
      } else {
        this.$emit('click', tag)
      }
    }

  }
</script>

<style scoped lang="scss">
  .icon-outerWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon-innerWrapper {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.selected {
        border-radius: 50%;
        border: 1px solid;
      }
    }
    .text {
      display: block;
      color: rgb(51, 51, 51);
    }
  }

</style>