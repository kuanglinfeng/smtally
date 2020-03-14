<template>
  <div class="confirm-wrapper" v-show="isShow">
    <div class="confirm">
      <div class="title">提示</div>
      <div class="message">{{ message }}</div>
      <div class="selectButton">
        <button @click="cancel">取消</button>
        <button @click="ensure">确定</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'

  @Component
  export default class Confirm extends Vue {
    @Prop({type: String}) message!: string
    @Prop({type: Boolean}) isShow!: boolean

    isEnsure = false

    cancel() {
      this.isEnsure = false
      this.$emit('update:value', this.isEnsure)
    }

    ensure() {
      this.isEnsure = true
      this.$emit('update:value', this.isEnsure)
    }

  }

</script>

<style scoped lang="scss">

  @import '~@/assets/styles/helper.scss';

  .confirm-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    .confirm {
      @extend %outerShadow;
      position: absolute;
      top: 30%;
      background: #fff;
      border-radius: 3px;
      z-index: 3;
      width: 80%;
      .title {
        padding: 16px;
        text-align: center;
        font-weight: bold;
      }
      .message {
        color: #999;
        padding: 0 16px 16px 16px;
        text-align: center;
      }
      .selectButton >button {
        &:first-child {
          border-right: 1px solid #ccc;;
        }
        &:last-child {
          color: $primary-color;
        }
        width: 50%;
        height: 50px;
        border-top: 1px solid #ccc;
      }
    }
  }
</style>