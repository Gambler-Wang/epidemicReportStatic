<template>
  <div id="gridCommunityHistoryStatic">
    <div class="header">
      <div class="userMs">
        <p><span class="name">{{currentCommunityName}}</span></p>
        <p>居民健康统计</p>
      </div>
      <div class="userImg"><img src="../../assets/img/touxiangcopy.png" class="user" /></div>
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
      <div @click="$go('/gridCommunityHistory');">
        日志查询
      </div>
      <div @click="$go('/gridCommunityHistoryStatic');">
        日志统计
      </div>
    </div>
    <div class="search">
      <div class="item">
        <selector ref="defaultValueRef" title="" :options="list" v-model="defaultValue">
        </selector>
      </div>
      <div class="item time">
        <!--<calendar title="" v-model="date" disable-past></calendar>-->
        <datetime title="" v-model="date" format="YYYY-MM"></datetime>
      <x-icon type="ios-arrow-right" size="16"></x-icon>
      </div>
      <!-- <div class="item sy">
        <input id="item2" type="checkbox" name="item" v-model="isHealth">
        <label for="item2"></label>
        只看异常
      </div> -->
    </div>
    <div class="chart">
      <div>健康信息统计图</div>
      <!-- <v-chart
        ref="demo"
        :data="data">
        <v-scale x field="day" />
        <v-scale y field="people" />
        <v-bar
          :colors="['#009566','#F79700','#BC0E0E']"
          series-field="name" adjust="stack"/>
        <v-tooltip show-value-in-legend/>
      </v-chart> -->
      <div class="v-chart" id="echarts-box">
          
      </div>
    </div>
    <!-- <div class="card" v-for="(item,index) of cardList" :key="index">
      <div class="address">
        <p class="name"><i :class="(item.healthBol)?'':'red'"></i>{{currentCommunityName+item.building+'栋'+item.unit+'单元'+item.floor+'楼'+item.room_number+'室'}}</p>
        <p class="time">{{item.create_time}}</p>
      </div>
    </div> -->
    <!-- <div class="card" v-for="i of 10" :key="i">
      <div class="address">
        <p class="name">当代国际花园1区1栋2单元1203室</p>
        <p class="time">2019-02-02 13:23:34</p>
        <p><img src="../../assets/img/blue.png" alt="">
          <img src="../../assets/img/yellow.png" alt="">
        </p>
      </div>
    </div> -->
    <div class="back" @click="$go('/gridCommunitySurveyForm')">
      <i class="iconfont">&#xe736;</i>
    </div>
  </div>
</template>

<script>
  const echarts = require('echarts');
  // 引入提示框和标题组件
  // require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  import {Selector,Datetime, Calendar, VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton, VScale} from 'vux'

  export default {
    name: "gridCommunityHistoryStatic",
    components: {
      Selector,
      Datetime,
      Calendar,
      VChart,
      VLine,
      VArea,
      VTooltip,
      VLegend,
      VBar,
      XButton,
      VScale
    },
    data() {
      return {
        echartsObj:null,
        rooms:JSON.parse(window.localStorage.getItem('rooms'))||{},
        currentCommunityName:'',
        currentCommunityId:'',
        date: this.$dateFormat(new Date(),'YYYY-MM'),
        defaultValue: '',
        isHealth:false,
        list: [
          {key: '', value: '全部楼栋'},
        ],
        dayList:[],
        wellList:[],
        unWellList:[],
        // cardList:[],
        data: [
          {name: "健康", day: "1", people: 0},
          {name: "健康", day: "2", people: 0},
          {name: "健康", day: "3", people: 0},
          {name: "健康", day: "4", people: 0},
          {name: "健康", day: "5", people: 0},
          {name: "健康", day: "6", people: 0},
          {name: "健康", day: "7", people: 0},
          {name: "健康", day: "8", people: 0},
          {name: "健康", day: "9", people: 0},
          {name: "健康", day: "10", people: 0},
          {name: "健康", day: "11", people: 0},
          {name: "健康", day: "12", people: 0},
          {name: "健康", day: "13", people: 0},
          {name: "健康", day: "14", people: 0},
          {name: "健康", day: "15", people: 0},
          {name: "健康", day: "16", people: 0},
          {name: "健康", day: "17", people: 0},
          {name: "健康", day: "18", people: 0},
          {name: "健康", day: "19", people: 0},
          {name: "健康", day: "20", people: 0},
          {name: "健康", day: "21", people: 0},
          {name: "健康", day: "22", people: 0},
          {name: "健康", day: "23", people: 0},
          {name: "健康", day: "24", people: 0},
          {name: "健康", day: "25", people: 0},
          {name: "健康", day: "26", people: 0},
          {name: "健康", day: "27", people: 0},
          {name: "健康", day: "28", people: 0},
          {name: "健康", day: "29", people: 0},
          {name: "异常", day: "1", people: 0},
          {name: "异常", day: "2", people: 0},
          {name: "异常", day: "3", people: 0},
          {name: "异常", day: "4", people: 0},
          {name: "异常", day: "5", people: 0},
          {name: "异常", day: "6", people: 0},
          {name: "异常", day: "7", people: 0},
          {name: "异常", day: "8", people: 0},
          {name: "异常", day: "9", people: 0},
          {name: "异常", day: "10", people: 0},
          {name: "异常", day: "11", people: 0},
          {name: "异常", day: "12", people: 0},
          {name: "异常", day: "13", people: 0},
          {name: "异常", day: "14", people: 0},
          {name: "异常", day: "15", people: 0},
          {name: "异常", day: "16", people: 0},
          {name: "异常", day: "17", people: 0},
          {name: "异常", day: "18", people: 0},
          {name: "异常", day: "19", people: 0},
          {name: "异常", day: "20", people: 0},
          {name: "异常", day: "21", people: 0},
          {name: "异常", day: "22", people: 0},
          {name: "异常", day: "23", people: 0},
          {name: "异常", day: "24", people: 0},
          {name: "异常", day: "25", people: 0},
          {name: "异常", day: "26", people: 0},
          {name: "异常", day: "27", people: 0},
          {name: "异常", day: "28", people: 0},
          {name: "异常", day: "29", people: 0},
        ]
      }
		},
    created(){
      this.currentCommunityName=this.rooms[0].community.community_name;
      this.currentCommunityId=this.rooms[0].community.community_id;
      this.getBuildingList();
    },
    mounted() {
      this.echartsObj = echarts.init(document.getElementById('echarts-box'));
      this.searchMonthReportStatic();
    },
    watch: {
      date(){
        this.searchMonthReportStatic();
						// this.searchRecord();
      },
      defaultValue(){
        this.searchMonthReportStatic();
						// this.searchRecord();
      },
      isHealth(){
        this.searchMonthReportStatic();
						// this.searchRecord();
      },
    },
		methods:{
      initEcharts(){
        var that =this;
        let option={
          legend: {
              data: ['健康', '异常'],
               top:8,
               itemWidth:10,
               itemHeight:10,
               itemGap :120,
               left:20
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function(arr){
              var txt = ''
              var currentDay=that.date+'-'+((arr[0].axisValue.length<2)?'0'+arr[0].axisValue:arr[0].axisValue);
              txt='<div>'+currentDay+'</div>';
              if(arr.length>0){
                arr.forEach(el => {
                  txt+='<div>'+el.marker+el.seriesName+':'+el.value+'</div>';
                });
              }
              return txt
            }
          },
          grid: {
              left: '30',
              right: '20',
              bottom: '30',
              top:'40'
          },
          xAxis: {
              type: 'category',
              data: this.dayList,
              splitNumber:2,
              nameTextStyle:{
                fontSize:12,
                 fontFamily :'Microsoft YaHei'
              },
              axisTick:{
                show:false
              },
          },
          yAxis: {
            type: 'value',
             minInterval:1,
            nameTextStyle:{
              fontSize:12
            },
            axisTick:{
              show:false,
            },
            axisLine:{
              show:false,
            },
            splitLine:{
              lineStyle:{
                type:'dashed'
              }
            }
          },
          series: [
              {
                  name: '健康',
                  type: 'bar',
                  stack: '总量',
                  barMaxWidth:6,
                  itemStyle:{
                    color:'#009566'
                  },
                  data: this.wellList
              },
              {
                  name: '异常',
                  type: 'bar',
                  stack: '总量',
                   barMaxWidth:6,
                  itemStyle:{
                    color:'#F79700'
                  },
                  data: this.unWellList
              },
          ]
        };
        this.echartsObj.setOption(option);
      },
      getBuildingList(){
        const params={
          community_id:this.currentCommunityId,
        }
        this.request(this.api.queryBuildingAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            res.data.buildingList.forEach(element => {
              this.list.push(
                {
                  key:element.building,
                  value:element.building+'栋'
                }
              )
						});
						this.searchMonthReportStatic();
						// this.searchRecord();
          }else{
            this.$vux.toast.text(res.msg, 'bottom');
          }
        });
			},
      searchMonthReportStatic(){
        if(this.defaultValue==''){
          var params={
            community_id:this.currentCommunityId,
            date:this.date,
            ishealth:(this.isHealth)?1:0
          }
        }else{
          var params={
            community_id:this.currentCommunityId,
            building:Number(this.defaultValue),
            date:this.date,
            ishealth:(this.isHealth)?1:0
          }
				}
        this.request(this.api.queryMonthReportAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            var arr = res.data.monthReport;
            this.dayList=[];
            this.wellList=[];
            this.unWellList=[];
            if(arr.length>0){
              arr.forEach(el => {
                if(el.name=='健康'){
                  this.wellList.push(el.people);
                  this.dayList.push(el.day);
                }else if(el.name=='异常'){
                  this.unWellList.push(el.people);
                }
              });
            }
            this.initEcharts();
          }else{
            this.$vux.toast.text(res.msg, 'bottom');
          }
        });
			},
			
      searchRecord(){
        if(this.defaultValue==''){
          var params={
            community_id:this.currentCommunityId,
            date:this.date,
            ishealth:(this.isHealth)?1:0
          }
        }else{
          var params={
            community_id:this.currentCommunityId,
            building:Number(this.defaultValue),
            date:this.date,
            ishealth:(this.isHealth)?1:0
          }
        }
        this.request(this.api.queryRecordAPI, JSON.stringify(params),'post','application/json').then(res => {
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
  * {
    touch-action: pan-y;
  }

  #gridCommunityHistoryStatic {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    font-family: PingFangSC-Regular, PingFang SC;
    background: rgba(242, 242, 242, 1);
    .header {
      padding: 40px;
      box-sizing: border-box;
      height: 261px;
      background: rgba(0, 149, 102, 1);
      display: flex;
      font-size: 30px;
      font-weight: 400;
      color: rgba(201, 255, 238, 1);
      line-height: 62px;
      .userMs {
        width: 560px;
        .name {
          font-size: 38px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 52px;
        }
      }
      .userImg {
        .user {
          display: inline-block;
          width: 120px;
          height: 120px;
          background: rgba(9, 133, 94, 1);
          border-radius: 100%;
        }
      }
    }
    .info {
      display: flex;
      width: 690px;
      height: 140px;
      margin-top: -80px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      padding: 35px;
      box-sizing: border-box;
      .title {
        font-size: 30px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
      }
      .msg {
        font-size: 24px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 33px;
      }
      .left {
        display: flex;
        width: 420px;
        .address {
          padding-right: 30px;
          img {
            width: 68px;
            height: 68px;
          }
        }
      }
      .right {
        display: flex;
        .day {
          padding-right: 30px;
          img {
            width: 58px;
            height: 59px;
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
        .weui-cell {
            padding: 0 !important;
        }
        }
        input[type="checkbox"] {
        opacity: 0;
        }
        label {
        position: absolute;
        left: 40px;
        top: 10px;
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
    .chart {
      margin-top: 30px;
      text-align: center;
    background-color: #fff;
      padding-top: 40px;
      font-size:32px;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:45px;
      // canvas {
      //   width: 690px !important;
      // }
      #echarts-box{
        width: 690px;
        height: 580px;
      }
    }
    .card {
      width: 690px;
      height: 207px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      margin-top: 30px;
      padding: 24px 34px;
      box-sizing: border-box;
      font-size: 24px;
      line-height: 60px;
      .address {
        font-size: 32px;
        color: rgba(51, 51, 51, 1);
        /*line-height: 45px;*/
        padding-bottom: 13px;
        .time {
          font-size: 26px;
          font-weight: 400;
          /*padding-left: 36px;*/
          color: rgba(153, 153, 144, 1);
          /*line-height: 37px;*/
        }
        img {
          width:48px;
          height:38px;
        }
        i {
          display: inline-block;
          width: 18px;
          height: 18px;
          z-index: 1;
          margin-right: 18px;
          background: rgba(0, 149, 102, 1);
          border-radius: 8px;
          &.red {
            background: rgba(224, 32, 32, 1);
          }
          &.yellow {
            background: rgba(247, 181, 0, 1);
          }

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
          width: 18px;
          height: 18px;
          z-index: 1;
          margin-right: 18px;
          background: rgba(0, 149, 102, 1);
          border-radius: 8px;
          &.red {
            background: rgba(224, 32, 32, 1);
          }
          &.yellow {
            background: rgba(247, 181, 0, 1);
          }

        }
      }
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
