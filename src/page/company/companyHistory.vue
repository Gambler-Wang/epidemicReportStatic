<template>
  <div id="companyHistory">
    <div class="header">
      <div class="userMs">
        <p><span class="name">{{currentCompanyName}}</span></p>
        <!-- <p><span class="name">武汉讯华通信设备有限公司</span></p> -->
        <div>
          <p>{{'今日填报：'+currentSubmit_count+'人'}}</p>
          <p>{{'注册人数：'+currentRegist_count+'人'}}</p>
        </div>
      </div>
      <div class="userImg"><img src="../../assets/img/touxiangcopy.png" class="user"></div>
    </div>
   <!-- <div class="info">
      <div class="left">
        <div class="address"><img src="../../assets/img/地址.png" alt=""></div>
        <div>
          <p class="title">湖北武汉江汉区</p>
          <p class="msg">当前位置</p>
        </div>
      </div>
      <div class="right">
        <div class="day"><img src="../../assets/img/chaxunicon.png" alt=""></div>
        <div>
          <p class="title">23天</p>
          <p class="msg">累计记录</p>
        </div>
      </div>
    </div>-->
    <div class="link-box">
      <div @click="$go('/companyHistory');">
        日志查询
      </div>
      <div @click="$go('/companyHistoryStatic');">
        日志统计
      </div>
    </div>
    <div class="search">
      <!-- <div class="item">
        <selector ref="defaultValueRef" title="" :options="list" v-model="defaultValue">
        </selector>
      </div> -->
      <div class="item time">
        <calendar v-model="date" title=''></calendar>
      <x-icon type="ios-arrow-right" size="16"></x-icon>
      </div>
      <div class="item sy">
        <input id="item2" type="checkbox" name="item" v-model="isHealth">
        <label for="item2"></label>
        只看异常
      </div>
    </div>
    <div class="card" v-for="(item,index) of cardList" :key="index" @click="showPersonalInfo(item)">
      <div class="address">
        <p class="name"><i :class="(item.healthBol)?'':'red'"></i>{{item.area+' - '+item.personnel_name}}</p>
        <p class="time">{{item.create_time}}</p>
      </div>
      <!--<div class="content">-->
        <!--<p><i></i> 否，身体健康</p>-->
        <!--<p><i class="yellow"></i> 是，未就医，居家隔离 | <span>轻微腹泻、已自己行好转…</span></p>-->
        <!--<p><i></i> 良好</p>-->
      <!--</div>-->
    </div>
    <div class="back" @click="$go('/companySurveyForm')">
      <i class="iconfont">&#xe736;</i>
    </div>
  </div>
</template>

<script>
  import { Selector,Calendar} from 'vux'
  export default {
    name: "companyHistory",
    components: {
      Selector,
      Calendar
    },
    data () {
      return {
        company:JSON.parse(window.localStorage.getItem('company'))||{},
        currentCompanyName:'',
        currentCompanyId:'',
				currentSubmit_count:'',
				currentRegist_count:'',
        date: 'TODAY',
        // defaultValue: '',
        isHealth:false,
        // list: [
        //   {key: '', value: '全部楼栋'},
        // ],
        cardList:[]
      }
    },
    created(){
      this.currentCompanyName=this.company.company_name;
      this.currentCompanyId=this.company.company_id;
      this.currentRegist_count=this.company.personnel_count;
      this.currentSubmit_count=this.company.submit_count;
      
    },
    watch: {
      date(){
        this.searchRecord();
      },
      defaultValue(){
        this.searchRecord();
      },
      isHealth(){
        this.searchRecord();
      },
    },
    methods:{
			showPersonalInfo(item){
				 this.$router.push({
          path: '/companyPersonalInfo',
          query: {
            epidemic_record_id: item.epidemic_record_id
          }
        })
			},
      searchRecord(){
        var params={
          company_id:this.currentCompanyId,
          date:this.date,
          ishealth:(this.isHealth)?1:0
        }
        this.request(this.api.queryCompanyRecordAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            this.cardList= res.data.list;
          }else{
            this.$vux.toast.text(res.msg, 'bottom');
          }
        });
      }
    }
  }
</script>

<style lang="less">
  * { touch-action: pan-y; }
    #companyHistory {
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      font-family:PingFangSC-Regular,PingFang SC;
      background:rgba(242,242,242,1);
      .header {
        padding: 40px;
        box-sizing: border-box;
        height:261px;
        background: rgba(0,149,102,1);
        display: flex;
        font-size:30px;
        font-weight:400;
        color:rgba(201,255,238,1);
        line-height:62px;
        .userMs {
          width: 560px;
          .name {
            font-size:38px;
            font-family:PingFangSC-Semibold,PingFang SC;
            font-weight:600;
            line-height: 52px;
          }
          &>div{
            margin-top: 10px;
            display: flex;
            &>p{
              margin-right: 26px;
              height: 42px;
              line-height: 42px;
              &:nth-last-of-type(1){
                margin-right: 0;
              }
            }
          }
        }
        .userImg {
          .user {
            display: inline-block;
            width:120px;
            height:120px;
            background:rgba(9,133,94,1);
            border-radius: 100%;
          }
        }
      }
      .info {
        display: flex;
        width:690px;
        height:140px;
        margin-top: -80px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        padding: 35px;
        box-sizing: border-box;
        .title {
          font-size:30px;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:42px;
        }
        .msg {
          font-size:24px;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:33px;
        }
        .left {
          display: flex;
          width: 420px;
          .address {
           padding-right: 30px;
            img {
              width:68px;
              height:68px;
            }
          }
        }
        .right {
          display: flex;
          .day {
            padding-right: 30px;
            img {
              width:58px;
              height:59px;
            }
          }
        }
      }
      .link-box{
        display: flex;
        width:690px;
        height:88px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        margin-top: -44px;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom: 30px;
        &>div{
          width: 50%;
          height: 100%;
          text-align: center;
          line-height: 88px;
          font-size: 32px;
          color: #292929;
          &:nth-of-type(1){
            position: relative;
            &::before{
              content: '';
              position: absolute;
              height: 39px;
              width: 38px;
              top: 25px;
              left: 30px;
              background: url('../../assets/img/healthlog-icon.png');
              background-size: 100% 100%;
            }
            &::after{
              content: '';
              position: absolute;
              top: 16px;
              right: 0;
              height: 55px;
              width: 1px;
              background-color: #ccc;
            }
          }
          &:nth-of-type(2){
            position: relative;
            &::before{
              content: '';
              position: absolute;
              height: 39px;
              width: 38px;
              top: 25px;
              left: 30px;
              background: url('../../assets/img/static-icon.png');
              background-size: 100% 100%;
            }
          }
        }
      }
      .search {
        display: flex;
        width:690px;
        height:88px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        // margin-top: -44px;
        margin-top: 0;
        align-items: center;
        justify-content: space-around;
        text-align: center;
        .vux-cell-value {
          font-size:28px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:40px;
        }
        .item {
          width: 40%;
          position: relative;
          font-size: 28px;
          &.time {
            display: flex;
            align-items: center;
            & .weui-cell.vux-tap-active.weui-cell_access{
              padding: 20px 30px;
            }
            .vux-x-icon {
              fill: #979797;
            }
            & .weui-cell_access .weui-cell__ft:after{
              display: none;
            }
          }
          .vux-calendar {
            &::before {
              display: none;
            }
            // .weui-cell {
            //   padding: 0 !important;
            // }
          }
          input[type="checkbox"] {
            opacity: 0;
          }
          label {
            position: absolute;
            left: 40px;
            top: 8px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid #979797;
          }
          input:checked+label {
            background-color: #009566;
            border: 1px solid #009566;
          }
          input:checked+label::after {
            position: absolute;
            content: "";
            width: 5px;
            height: 10px;
            top: 4px;
            left: 8px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            transform: rotate(45deg)
          }
        }

      }
      .card {
        width:690px;
        height:153px;
        background:rgba(255,255,255,1);
        border-radius:8px;
        margin-top: 30px;
        padding: 24px 34px;
        box-sizing: border-box;
        font-size: 24px;
				&:nth-last-of-type(1){
					margin-bottom: 30px;
				}
        .address {
          font-size:32px;
          color:rgba(51,51,51,1);
          line-height:45px;
          // padding-bottom: 13px;
          .time {
            font-size:26px;
            font-weight:400;
            padding-left: 36px;
            color:rgba(153,153,144,1);
            line-height:37px;
            margin-top: 12px;
          }
          i {
            display: inline-block;
            width:30px;
            height:24px;
            z-index: 1;
            margin-right: 10px;
            // background:rgba(0,149,102,1);
            // border-radius: 18px;
            background: url('../../assets/img/blue.png');
            background-size: 100% 100%;
            &.red {
              // background:rgba(224,32,32,1);
              background: url('../../assets/img/yellow.png');
              background-size: 100% 100%;
            }
            // &.yellow {
            //   background:rgba(247,181,0,1);
            // }

          }
        }
        .content {
          line-height: 46px;
          position: relative;
          /*&::after {*/
            /*position: absolute;*/
            /*top: 20px;*/
            /*z-index: 0;*/
            /*left: 3px;*/
            /*content: '';*/
            /*display: inline-block;*/
            /*width:1px;*/
            /*height:90px;*/
            /*background-color: #E5E5E5;*/
          /*}*/
          p {
            display: flex;
            align-items: center;
          }
          i {
            display: inline-block;
            width:18px;
            height:18px;
            z-index: 1;
            margin-right: 18px;
            background:rgba(0,149,102,1);
            border-radius: 8px;
            &.red {
              background:rgba(224,32,32,1);
            }
            &.yellow {
              background:rgba(247,181,0,1);
            }

          }
        }
      }
      .weui-select{
        font-size: 28px;
      }
      .back{
        position: fixed;
        right: 30px;
        bottom: 30px;
        width: 100px;
        height: 100px;
        line-height: 100px;
        border-radius: 50%;
        background-color: #009566;
        box-shadow:0 4px 8px #e0e0e0;
        text-align: center;
        & i{
          font-size: 50px;
          color: #c9ffee;
        }
      }
    }
</style>
