<template>
  <div id="statistics">
    <div class="header">
      <div class="userMs">
        <p><span class="name">当代国际花园</span></p>
        <p>小区参与登记户数 324 户</p>
      </div>
      <div class="userImg">
        <span>我的记录 <img src="../assets/img/next-arrow.png" class="user" /></span>
      </div>
    </div>
    <div class="info">
      <div class="left">
        <div>
          <p class="title">224</p>
          <p class="msg">今日参与户数</p>
        </div>
      </div>
      <div class="right">
        <div>
          <p class="title">1</p>
          <p class="msg">今日异常户数</p>
        </div>
      </div>
    </div>
    <div class="chart">
      <div class="title">健康信息趋势图</div>
    </div>
    <div class="search">
      <div class="item">
        <selector ref="defaultValueRef" title="" :options="list" v-model="defaultValue">
        </selector>
      </div>
      <div class="item">
        <selector ref="defaultValueRef" title="" :options="list" v-model="defaultValue">
        </selector>
      </div>
      <div class="item">
        <input id="item2" type="checkbox" name="item">
        <label for="item2"></label>
        只看异常
      </div>
    </div>
    <div class="card" v-for="i of 10" :key="i">
      <div class="time">
        <p class="room">1栋1单元1203室</p>
        <p>2020-1-29 12:23</p>
      </div>
      <div class="content">
        <p><i></i> 否，身体健康</p>
        <p><i class="yellow"></i> 是，未就医，居家隔离 | <span>轻微腹泻、已自己行好转…</span></p>
        <p><i></i> 良好</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Selector } from 'vux'
  export default {
    components: {
      Selector
    },
    data () {
      return {
        defaultValue: 'gd',
        list: [{key: 'gd', value: '全部楼栋'}, {key: 'gx', value: '广西'}],
      }
    }
  }
</script>

<style lang="less">
  * { touch-action: pan-y; }
  #statistics {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    font-family:PingFangSC-Regular,PingFang SC;
    background:rgba(242,242,242,1);
    .header {
      padding: 40px;
      box-sizing: border-box;
      height:219px;
      width: 100%;
      background: rgba(0,149,102,1);
      display: flex;
      font-size:30px;
      font-weight:400;
      color:rgba(201,255,238,1);
      line-height:62px;
      justify-content: space-between;
      .userMs {
        .name {
          font-size:38px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          line-height: 52px;
        }
      }
      .userImg {
        display: flex;
        align-items: flex-end;
        height: 120px;
        span {
          display: inline-block;
          text-align: center;
          width:215px;
          height:58px;
          background:rgba(255,255,255,0.2);
          border-radius:8px;
          border:1px solid rgba(201,255,238,1);
        }
        img {
          width:28px;
          height:28px;
        }
      }
    }
    .info {
      display: flex;
      width:690px;
      height:140px;
      margin-top: -40px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      padding: 35px;
      box-sizing: border-box;
      align-items: center;
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
       flex: 1;
       justify-content: center;
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
        flex: 1;
        justify-content: center;
        .day {
          padding-right: 30px;
          img {
            width:58px;
            height:59px;
          }
        }
      }
    }
    .chart {
      margin-top: 30px;
      width:690px;
      height:500px;
      box-sizing: border-box;
      background:rgba(255,255,255,1);
      border-radius:8px;
      font-size:32px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:45px;
      padding: 24px 40px;
    }
    .search {
      display: flex;
      width:690px;
      height:68px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      margin-top: 30px;
      align-items: center;
      justify-content: center;
      text-align: center;
      .item {
        flex: 1;
        position: relative;
        input[type="checkbox"] {
          opacity: 0;
        }
        label {
          position: absolute;
          left: 30px;
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
    .card {
      width:690px;
      height:248px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      margin-top: 30px;
      padding: 24px 35px;
      box-sizing: border-box;
      font-size: 24px;
      .address {
        font-size:32px;
        color:rgba(51,51,51,1);
        line-height:45px;
        padding-bottom: 13px;
      }
      .time {
        display: flex;
        justify-content:space-between;
        font-size:26px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        padding-bottom: 15px;
        .room {
          font-size: 32px;
        }
      }
      .content {
        line-height: 46px;
        position: relative;
        &::after {
          position: absolute;
          top: 20px;
          z-index: 0;
          left: 3px;
          content: '';
          display: inline-block;
          width:1px;
          height:90px;
          background-color: #E5E5E5;
        }
        p {
          display: flex;
          align-items: center;
        }
        i {
          display: inline-block;
          width:8px;
          height:8px;
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
  }
</style>
