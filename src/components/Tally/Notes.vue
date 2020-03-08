<template>
  <div>
    <label class="inputItem">
      <Icon value="notes" />
      <span class="name">{{ this.fieldName }}</span>
      <input
        :value="notesValue"
        type="text"
        @input="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      >
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  import Icon from '@/components/Icon.vue'

  @Component({
    components: { Icon }
  })
  export default class FormItem extends Vue {
    // @Prop({default: ''}) readonly value!: string
    @Prop({ required: true }) fieldName!: string
    @Prop() placeholder?: string

    @Prop({default: ''}) notesValue!: string
    @Prop(Boolean) isClearNotes!: boolean

    onValueChanged(value: string) {
      this.$emit('update:value', value)
    }
  }
</script>

<style scoped lang="scss">
  .inputItem {
    font-size: 14px;
    padding-left: 8px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 8px;
    }
    input {
      height: 36px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-top: 2px;
      padding-right: 16px;
    }
  }
</style>