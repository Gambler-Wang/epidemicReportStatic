<template>
  <div id="gridCommunityMemberList">
    <Header title="家庭成员维护">
      <div class="add-btn" slot="right" @click="$go('/gridCommunityMemberMaintain')">
        <i class="iconfont">&#xe6c4;</i>
      </div>
    </Header>
    <section>
      <div class="link" v-for="(item ,index) in memberList" :key="index">
        <div></div>
        <p>{{item.member_name}}</p>
        <!-- <i class="iconfont">&#xd0109;</i> -->
        <span  @click="del(item)">删除</span>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '../../components/header';
  import { } from 'vux'
  export default {
    name: "gridCommunityMemberList",
    components: {
      Header
    },
    data () {
      return {
        memberList:[]
      }
    },
    created(){
			var data =JSON.parse(window.localStorage.getItem('data')) || {};
			if(data.members){
				this.memberList=data.members;
			}
      
    },
    watch: {
      
    },
    methods:{
			del(item){
        const params={
					member_id:item.member_id,
        }
        this.request(this.api.delCommunityGridMemberAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            this.memberList=res.data.members;
            window.localStorage.setItem('data',JSON.stringify(res.data));
            window.localStorage.setItem('counts',JSON.stringify(res.data.counts));
            this.$vux.toast.text('删除成功！', 'bottom')
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
					}
        });
      }
    }
  }
</script>

<style lang="less">
  * { touch-action: pan-y; }
  #gridCommunityMemberList {
    overflow: hidden;
    & .add-btn{
      text-align: right;
      height: 88px;
      i{
        font-size: 50px;
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
        align-items: center;
        &:nth-of-type(1){
          margin-top: 30px;
        }
        p{
          flex: 1;
          font-size: 30px;
        }
        div{
          width: 108px;
          height: 88px;
          background: url('../../assets/img/user-icon.png') center center no-repeat;
          background-size: 48px 48px;
        }
        i{
          width: 88px;
          height: 88px;
          line-height: 88px;
          text-align: center;
          font-size: 34px;
        }
        span{
          width: 100px;
          height: 56px;
          color: #fff;
          background-color: #E56154;
          margin-right: 20px;
          text-align: center;
          line-height: 56px;
          font-size: 26px;
          border-radius: 8px;
        }
      }
    }
    
  }
</style>
