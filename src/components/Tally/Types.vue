<template>
  <div class="types">
    <ul>
      <li>
        <router-link to="/tally/outlay" class="item" active-class="selected">
          {{ '支出' }}
        </router-link>
      </li>
      <li>
        <router-link to="/tally/income" class="item" active-class="selected">
          {{ '收入' }}
        </router-link>
      </li>
    </ul>
    <div class="cancel" @click="$router.push('/detail')">
      取消
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'

  @Component
  export default class Tabs extends Vue {}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/helper.scss";

  .types {
    background: $primary-color;
    position: relative;
    ul {
      display: flex;
      justify-content: center;
    }
    li {
      display: inline-block;
      font-size: 20px;
      padding: 24px 16px 8px 16px;
      position: relative;
      .item {
        padding: 24px 16px 8px 16px;
      }
      .item.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: #333;
      }
    }
    .cancel {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      padding: 24px 16px 8px 16px;
    }
  }
</style>