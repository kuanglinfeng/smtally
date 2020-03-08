<template>
  <nav>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon value="detail"/>
      明细
    </router-link>
    <router-link to="/tally" class="item" active-class="selected">
      <Icon value="tally"/>
      记账
    </router-link>
    <router-link to="/chart" class="item" active-class="selected">
      <Icon value="chart"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
  import Icon from '@/components/Icon.vue'

  export default {
    name: 'Nav',
    components: {Icon}
  }
</script>

<style scoped lang="scss">
  @import "~@/assets/styles/helper.scss";
  nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected{
      color: darken($primary-color, 20%);
    }
  }
</style>