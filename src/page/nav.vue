<template>
  <group title="菜单">
    <cell is-link link="surverStep">
      公司人员登录
    </cell>
    <cell is-link  link="surverSystem">
      社区人员登录
    </cell>
    <cell is-link  link="surveyForm">
      调查表单
    </cell>
    <cell is-link  link="personalInfo">
      个人详情
    </cell>
    <cell is-link  link="historyPage">
      历史记录
    </cell>
    <cell is-link  link="statistics">
      统计
    </cell>
  </group>
</template>

<script>
  import {Cell, Group} from 'vux';

  export default {
    name: 'squareIndex',
    components: {
      Group,
      Cell,
    },
  };
</script>

<style scoped>

</style>
