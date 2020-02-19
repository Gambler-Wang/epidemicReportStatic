<template>
  <div id="gridCommunityPersonalInfo">
    <Header title="信息维护">
      <div class="add-btn" slot="right" @click="$go('/gridCommunitySurveyForm')">
        <div></div>
      </div>
    </Header>
    <section>
      <div class="link" @click="$go('/gridCommunityPersonalEdit')">
        <div></div>
        <p>个人信息</p>
        <i class="iconfont">&#xd0109;</i>
      </div>
      <div class="link" @click="$go('/gridCommunityMemberList')">
        <div></div>
        <p>家庭成员</p>
        <i class="iconfont">&#xd0109;</i>
      </div>
      <!-- <div class="link">
        <div></div>
        <p>地址管理</p>
        <i class="iconfont">&#xd0109;</i>
      </div> -->
    </section>
  </div>
</template>

<script>
  import Header from '../../components/header';
  import { } from 'vux'
  export default {
    name: "gridCommunityPersonalInfo",
    components: {
      Header
    },
    data () {
      return {
        
      }
    },
    created(){
     
      
    },
    watch: {
      
    },
    methods:{
			
    }
  }
</script>

<style lang="less">
  * { touch-action: pan-y; }
  #gridCommunityPersonalInfo {
    overflow: hidden;
    .add-btn{
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      div{
        width: 52px;
        height: 52px;
        background: url('../../assets/img/healthlog-icon.png');
        background-size: 100% 100%;
      }
    }
    &>section{
      padding-top: 88px;
      box-sizing: border-box;
      height: 100vh;
      overflow: auto;
      &>.link{
        height: 88px;
        line-height: 88px;
        display: flex;
        background-color: #fff;
        margin-bottom: 1px;
        &:nth-of-type(1){
          margin-top: 30px;
          &>div{
            background: url('../../assets/img/member-icon.png') center center no-repeat;
            background-size: 48px 48px;
          }
        }
        &:nth-of-type(2){
          &>div{
            background: url('../../assets/img/user-link-icon.png') center center no-repeat;
            background-size: 48px 48px;
          }
        }
        &:nth-of-type(3){
          &>div{
            background: url('../../assets/img/address-icon.png') center center no-repeat;
            background-size: 48px 48px;
          }
        }
        p{
          flex: 1;
          font-size: 30px;
        }
        div{
          width: 108px;
          height: 88px;
        }
        i{
          width: 88px;
          height: 88px;
          line-height: 88px;
          text-align: center;
          font-size: 34px;
        }
      }
    }
    
  }
</style>
