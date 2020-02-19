<template>
  <div id="headerNav">
    <div class="left" @click.stop="leftClick()">
      <!-- <img src="../assets/img/user-link-icon.png" alt=""> -->
      <div></div>
    </div>
    <p class="title">{{title}}</p>
    <div class="right"  @click.stop="rightClick()">
      <!-- <img src="../assets/img/touxiangcopy.png" alt=""> -->
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerNav',
  components: {},
  props:{
    title:{
      type:String,
      default:'标题'
    },
    leftText:{
      type:String,
      default:''
    },
    rightText:{
      type:String,
      default:'操作'
    },
    isBack:{
      type:Boolean,
      default:true
    },

  },
  data () {
    return {


    }
  },
  created () {

  },
  mounted: function () {

  },
  methods:{
    rightClick(){
     
    },
    leftClick(){
      this.$go('/gridCommunityPersonalInfo');
    }
  }
}
</script>
<style lang="less">
  #headerNav{
    height: 88px;
    line-height: 88px;
    width: 100vw;
    background-color: #fff;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    &>div{
      width: 120px;
      &.left{
        display: flex;
        align-items: center;
        & >div{
          width: 58px;
          height: 58px;
          margin-left: 20px;
          background: url('../assets/img/user-link-icon.png');
          background-size: 100% 100%;
        }
      }
      &.right{
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        // & >div{
        //   width: 52px;
        //   height: 52px;
        //   margin-right: 20px;
        //   background: url('../assets/img/chaxunicon.png');
        //   background-size: 100% 100%;
        // }
      }
    }
    &>.title{
      flex: 1;
      font-size: 34px;
      color: #333333;
      text-align: center;
    }
  }

</style>
