<template>
  <div id="gridCommunityHistory">
		<HeaderNav title="居民健康日报查询">
      <div class="add-btn" slot="right" @click="$go('/gridCommunitySurveyForm')">
        <div></div>
      </div>
		</HeaderNav>
    <main>
      <div class="header">
        <div class="userMs">
          <p><span class="name">{{currentCommunityName}}</span></p>
          <p>居民健康日志</p>
        </div>
        <div class="userImg"><img src="../../assets/img/touxiangcopy.png" class="user"></div>
      </div>
      <div class="search">
        <div class="item time">
          <calendar title="" v-model="date"></calendar>
          <x-icon type="ios-arrow-right" size="16"></x-icon>
        </div>
      </div>
      
			<div class="con" v-show="hasData">
				<!-- <div :class="(index==list.length-1)?'item last':'item'" v-for="(item,index) in list" :key="item.key">
					<h3>{{item.title}}</h3>
					<div>
						<div v-for="(subItem,subIndex) in item.checkList" :key ="subIndex">
							<div :class="(subItem.isSelect)?'check-def active':'check-def'"></div>
							<div>{{subItem.checkTitle}}</div>
						</div>
					</div>
					<div class="info">
						<group>
							<x-textarea v-model="item.info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
						</group>
					</div>
				</div> -->
				<div class="item first" v-show="memberList.length!=0">
					<h3>家庭成员体温登记</h3>
					<div v-for="(item,index) in memberList" :key="index">
						<label>{{item.member_name}}</label>
						<p>
							<input disabled v-model="item.temperature" type="number" placeholder="请输入温度,如36.8">
						</p>
						<span>℃</span>
					</div>
				</div>
				<div class="item">
          <h3>是否有发热等不适症状</h3>
          <div>
            <div @click="personnel_heat=0" v-show="personnel_heat=='0'">
              <div :class="(personnel_heat=='0')?'check-def active':'check-def'"></div>
              <div>否，无发热等不适症</div>
            </div>
            <div @click="personnel_heat=1" v-show="personnel_heat=='1'">
              <div :class="(personnel_heat=='1')?'check-def active':'check-def'"></div>
              <div>是，有，居家隔离</div>
            </div>
            <div @click="personnel_heat=2" v-show="personnel_heat=='2'">
              <div :class="(personnel_heat=='2')?'check-def active':'check-def'"></div>
              <div>是，有，集中隔离</div>
            </div>
            <div @click="personnel_heat=3" v-show="personnel_heat=='3'">
              <div :class="(personnel_heat=='3')?'check-def active':'check-def'"></div>
              <div>其它</div>
            </div>
          </div>
          <div class="info" v-show="personnel_heat==3">
            <group>
              <x-textarea disabled v-model="personnel_heat_info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
            </group>
          </div>
				</div>
				<div class="item">
          <h3>是否有咳嗽、腹泻等不适症</h3>
          <div>
            <div @click="personnel_unwell=0" v-show="personnel_unwell=='0'">
              <div :class="(personnel_unwell=='0')?'check-def active':'check-def'"></div>
              <div>否，无咳嗽、腹泻等不适症</div>
            </div>
            <div @click="personnel_unwell=1" v-show="personnel_unwell=='1'">
              <div :class="(personnel_unwell=='1')?'check-def active':'check-def'"></div>
              <div>是，有，居家隔离</div>
            </div>
            <div @click="personnel_unwell=2" v-show="personnel_unwell=='2'">
              <div :class="(personnel_unwell=='2')?'check-def active':'check-def'"></div>
              <div>是，有，集中隔离</div>
            </div>
            <div @click="personnel_unwell=3" v-show="personnel_unwell=='3'">
              <div :class="(personnel_unwell=='3')?'check-def active':'check-def'"></div>
              <div>其它</div>
            </div>
          </div>
          <div class="info" v-show="personnel_unwell==3">
            <group>
              <x-textarea disabled v-model="personnel_unwell_info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
            </group>
          </div>
				</div>
				<div class="item status">
					<h3>是否到过疫区或者接触过疫区人员</h3>
          <div>
            <div @click="contact_infected_area=1" v-show="contact_infected_area=='1'">
              <div :class="(contact_infected_area=='1')?'check-def active':'check-def'"></div>
              <div>是</div>
            </div>
            <div @click="contact_infected_area=0" v-show="contact_infected_area=='0'">
              <div :class="(contact_infected_area=='0')?'check-def active':'check-def'"></div>
              <div>否</div>
            </div>
          </div>
				</div>
				<div class="item status">
					<h3>是否接触过新冠状病毒患者</h3>
          <div>
            <div @click="contact_patient=1" v-show="contact_patient=='1'">
              <div :class="(contact_patient=='1')?'check-def active':'check-def'"></div>
              <div>是</div>
            </div>
            <div @click="contact_patient=0" v-show="contact_patient=='0'">
              <div :class="(contact_patient=='0')?'check-def active':'check-def'"></div>
              <div>否</div>
            </div>
          </div>
				</div>
				<div class="item last-1">
					<h3>如有家庭成员接受过医院或社区服务中心 服务诊疗，请填写医院意见。</h3>
					<div class="info">
						<group>
							<x-textarea disabled v-model="hospital_opinion" :max="100" :rows="3" placeholder="请输入要补充情况说明…"></x-textarea>
						</group>
					</div>
				</div>
				<div class="item last">
					<h3>当前所在地</h3>
					<p>
						<i>{{position}}</i>
						<!-- <span @click="changePosition">修改</span> -->
					</p>
				</div>
			</div>
    </main>
  </div>
</template>

<script>
  import HeaderNav from '../../components/headerNav';
  import { Selector,Calendar,XTextarea , Group ,XButton,} from 'vux'
  export default {
    name: "gridCommunityHistory",
    components: {
      Selector,
      Calendar,
      HeaderNav,
      Group,
      XTextarea,
      XButton,
    },
    data () {
      return {
        date: 'TODAY',
        data:JSON.parse(window.localStorage.getItem('data')) || {},
        currentCommunityName:'',
				memberList:[],
				personnel_id:'',
				personnel_heat:0,
				personnel_unwell:0,
				contact_patient:0,
				contact_infected_area:0,
				create_time:'',
				personnel_heat_info:'',
				personnel_unwell_info:'',
        hospital_opinion:'',
				position:'',
				area:'',
        hasData:false
      }
    },
    created(){
      if(this.data.community1){
				this.currentCommunityName=this.data.community1.community_name
			}
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
          path: '/personalInfo',
          query: {
            epidemic_record_id: item.epidemic_record_id
          }
        })
			},
      searchRecord(){
        var params={
          date:this.date,
        }
        this.request(this.api.queryCommunityGridRecordAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            if(res.data.hasOwnProperty('personnel_heat')){
              this.personnel_heat= res.data.personnel_heat;
              this.personnel_unwell= res.data.personnel_unwell;
              this.contact_patient= res.data.contact_patient;
              this.contact_infected_area= res.data.contact_infected_area;
              this.personnel_heat_info= res.data.personnel_heat_info;
              this.personnel_unwell_info= res.data.personnel_unwell_info;
              this.hospital_opinion= res.data.hospital_opinion;
              this.memberList= res.data.body_temperature;
              this.position=res.data.position;
              this.area=res.data.area;
              this.hasData=true;
            }else{
              this.hasData=false;
            }
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
    #gridCommunityHistory {
      overflow: hidden;
      .add-btn{
        div{
          width: 52px;
          height: 52px;
          margin-right: 20px;
          background: url('../../assets/img/healthlog-icon.png');
          background-size: 100% 100%;
        }
      }
      main{
        width: 100vw;
        min-height: ~'calc(100vh - 88px)';
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        font-family:PingFangSC-Regular,PingFang SC;
        background:rgba(242,242,242,1);
        margin-top: 88px;
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
        .search {
          display: flex;
          width:690px;
          height:88px;
          background:rgba(255,255,255,1);
          border-radius:8px;
          margin-top: -44px;
          align-items: center;
          justify-content: center;
          text-align: center;
          .vux-cell-value {
            font-size:28px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:40px;
          }
          .item {
            position: relative;
            font-size: 28px;
            &.time {
              display: flex;
              align-items: center;
              justify-content: center;
              & .vux-datetime.weui-cell.weui-cell_access{
                padding: 20px 30px;
              }
              .vux-x-icon {
                fill: #979797;
              }
              & .weui-cell_access .weui-cell__ft:after{
                display: none;
              }
            }
            /*&.sy {*/
              /*width: 280px;*/
            /*}*/
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
        & .con{
          background-color: #fff;
          padding: 28px 42px;
          margin-top: 30px;
          overflow: hidden;
          width: 690px;
          box-sizing: border-box;
          // margin-top: 180px;
          &>.item{
            margin-bottom: 50px;
            position: relative;
            &::after{
              content: '';
              position: absolute;
              width: 100%;
              height: 0px;
              border:1px dashed #E5E5E5;
              bottom: -30px;
              left: 0;
            }
            &.first{
              &>div{
                display: flex;
                font-size: 30px;
                align-items: center;
                margin-bottom: 20px;
                &>label{
                  margin-right: 20px;
                }
                &>p{
                  flex: 1;
                  height: 76px;
                  line-height: 76px;
                  box-sizing: border-box;
                  border: 1px solid #979797;
                  background: #F2F2F2;
                  padding: 8px 0;
                  & input{
                    width: 100%;
                    border: none;
                    height: 60px;
                    line-height: 60px;
                    background-color: #f2f2f2;
                    padding-left: 20px;
                    font-size: 28px;-webkit-appearance: none;
                  }
                }
                &>span{
                  margin-left: 20px;
                }
              }
            }
            &.status{
              &>div{
                display: flex;
                &>div{
                  flex: 1;
                }
              }
            }
            &.last-1{
              margin-bottom: 50px;
              // &::after{
              //   content: '';
              //   position: absolute;
              //   border: none;
              // }
            }
            &.last{
            	margin-bottom: 100px;
            	&::after{
            		content: '';
            		position: absolute;
            		border: none;
            	}
            }
            h3{
              // height:48px;
              font-size:34px;
              font-weight:600;
              color:rgba(41,41,41,1);
              line-height:48px;
              margin-bottom: 22px;
            }
            &>div{
              &:nth-of-type(1){
                &>div{
                  display: flex;
                  align-items: center;
                  margin-bottom: 18px;
                  &>div{
                    font-size: 30px;
                    color: #292929;
                    }
                  & .check-def{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(151,151,151,1);
                    margin-right: 35px;
                    &.active{
                      background-color: #009566;
                      border:none;
                    }
                  }
                }
              }
              &:nth-last-of-type(1){
                & .vux-no-group-title{
                  margin: 0;
                  width: 100%;
                  background:rgba(242,242,242,1);
                  border:1px solid #979797;
                  position: relative;
                }
                & .vux-x-textarea{
                  padding: 10px 15px;
                  box-sizing: border-box;
                }
                & .weui-cells:after,.weui-cells:after, .weui-cells:before{
                  border: none;
                }
                & .weui-textarea-counter{
                  // position: absolute;
                  // width: 80px;
                  // height: 53px;
                  text-align: right;
                  // bottom: 0;
                  // right: 15px;
                  line-height: 36px;
                  font-size: 24px;
                  color: #999999;
                }
                & textarea{
                  font-size: 28px;
                  color: #292929;
                  background-color: #f2f2f2;
                }
              }
            }
            p{
              display: flex;
              align-items: center;
              height: 48px;
              input{
                flex: 1;
                border:none;
                &:focus{
                outline:none;
                }
              }
              i{
                flex: 1;
                font-style:normal;
              }
              span{
                width: 80px;
                height: 48px;
                line-height: 48px;
                font-size: 26px;
                color: #009566;
                margin-left: 20px;
                text-align: center;
              }
            }
          }
          &>.btn{
            width: 100%;
            height: 93px;
            border-radius: 44px;
            background:rgba(0,149,102,1);
            box-shadow:0px 3px 7px 0px rgba(0,149,102,0.5);
            color: #fff;
            font-size: 30px;
            text-align: center;
            line-height: 93px;
            margin-bottom: 53px;
          }
        }
      }
    }
</style>
