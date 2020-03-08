<template>
  <Layout>
    <div class="detail-wrapper">
      <div class="detail">
        <header>
          <div class="logo">
            记个小账
          </div>
        </header>
        <div class="info">
          <div class="calendar">

          </div>
          <div class="total">

          </div>
        </div>
      </div>
    </div>
<!--    <label for="year">-->
<!--      <select name="年份" id="year">-->
<!--        <option value="1970">1970</option>-->
<!--        <option value="1971">1971</option>-->
<!--        <option value="1972">1972</option>-->
<!--        <option value="1973">1973</option>-->
<!--        <option value="1974">1974</option>-->
<!--        <option value="1975">1975</option>-->
<!--      </select>-->
<!--    </label>-->
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Layout from '@/components/Layout.vue'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: { Layout }
  })
  export default class Detail extends Vue {

  }

</script>

<style scoped lang="scss">
  @import '~@/assets/styles/helper.scss';

  .detail-wrapper {
    border: 1px solid red;

    header {
      background: $primary-color;
      .logo {
        font-weight: bold;
        text-align: center;
        font-style: italic;
        font-size: 18px;
        padding: 8px;
      }
    }


  }
</style>