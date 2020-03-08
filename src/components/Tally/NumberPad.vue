<template>
  <div class="numberPad">
    <div class="amount">{{ amount }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">确认</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'
  @Component
  export default class NumberPad extends Vue {
    @Prop(Number)
    readonly value!: number

    amount = '0'

    inputContent(event: MouseEvent) {
      const button = event.target as HTMLButtonElement
      const inputValue = button.textContent || '0'
      if (this.amount.length === 16) return
      if (this.amount !== '0' && this.amount.indexOf('.') >= 0 && inputValue === '.') return
      if (this.amount === '0' && inputValue === '.') {
        this.amount += inputValue
      } else if (this.amount === '0' && inputValue !== '.') {
        this.amount = inputValue
      } else {
        this.amount += inputValue
      }
    }
    clear() {
      this.amount = '0'
    }
    remove() {
      if (this.amount.length === 1) return this.clear()
      this.amount = this.amount.slice(0, -1)
    }
    ok() {
      this.$emit('update:value', +this.amount)
      this.$emit('submit', +this.amount)
      this.clear()
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/helper.scss";

  .numberPad {
    .amount {
      font-size: 24px;
      font-family: Consolas, Monaco, monospace;
      padding: 4px 16px;
      text-align: right;
      height: 36px;
      @extend %innerShadow;
      background: #f2f2f2;
    }
    .buttons {
      @extend %clearFix;
      > button {
        $h: 56px;
        width: 25%;
        height: $h;
        float: left;
        background: transparent;
        border: none;
        &.ok {
          height: $h*2;
          float: right;
        }
        &.zero {
          width: 25*2%;
        }
        $bg: #f2f2f2;
        &:nth-child(1) {
          background: $bg;
        }
        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }
        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }
        &:nth-child(4), &:nth-child(7), &:nth-child(10) {
          background: darken($bg, 4*3%);
        }
        &:nth-child(8), &:nth-child(11), &:nth-child(13) {
          background: darken($bg, 4*4%);
        }
        &:nth-child(14) {
          background: darken($bg, 4*5%);
        }
        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
</style>