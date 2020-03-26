<template>
  <div id="companyPersonalInfo">
    <div class="tip">已记录健康数据{{day}}天</div>
		<div class="link">
			<!-- <div>健康数据中心</div> -->
		</div>
		<div class="title">
			<span>
				<i></i>
				<i></i>
				<i></i>
			</span>
			<div>{{'个人健康日志'}}</div>
			<span>
				<i></i>
				<i></i>
				<i></i>
			</span>
		</div>
		<div class="con">
			<!-- <div class="item" v-for="item in list" :key="item.key">
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
			
			<div class="link-box">
				<div @click="$go('/companyHistory');">
					日志查询
				</div>
				<div @click="$go('/companyHistoryStatic');">
					日志统计
				</div>
			</div>
			<div class="temperature-box">
				<div>
					<label>上午体温</label>
					<div :class="(morning_health_status==1)?'health-btn normal':'health-btn'">正常</div>
					<div :class="(morning_health_status==0)?'health-btn error':'health-btn'">异常</div>
					<p>
						<input v-model="morning_temp" disabled type="number" placeholder="非必填">
						<span>℃</span>
					</p>
				</div>
				<div>
					<label>下午体温</label>
					<div :class="(afternoon_health_status==1)?'health-btn normal':'health-btn'">正常</div>
					<div :class="(afternoon_health_status==0)?'health-btn error':'health-btn'	">异常</div>
					<p>
						<input v-model="afternoon_temp" disabled type="number" placeholder="非必填">
						<span>℃</span>
					</p>
				</div>
			</div>
			<div class="trip-box">
				<h5>
					<img src="../../assets/img/tubiaohezi-hisxitongtubiao_huaban.png" alt="">
					<span>今日行程</span>
					<!-- <i class="iconfont" @click="handleAddTrip">&#xe6c4;</i> -->
				</h5>
				<div class="trip-list">
					<div v-for="(item,index) in trip_list" :key="index">
						<div class="dot"></div>
						<p>
							<span v-maxLength="item.address" title=""></span>
							<span>{{item.timeRange}}</span>
						</p>
						<!-- <i class="iconfont" @click="delTrip(index)">&#xe60e;</i> -->
					</div>
					<div v-if="trip_list.length==0" class="no-trip">今日行程待添加</div>
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
			<div class="item">
				<h3>家庭成员健康状况</h3>
				<div>
					<div @click="member_status=0" v-show="member_status=='0'">
						<div :class="(member_status=='0')?'check-def active':'check-def'"></div>
						<div>全员健康状况良好</div>
					</div>
					<div @click="member_status=1" v-show="member_status=='1'">
						<div :class="(member_status=='1')?'check-def active':'check-def'"></div>
						<div>个别成员有不适症、居家隔离</div>
					</div>
					<div @click="member_status=2" v-show="member_status=='2'">
						<div :class="(member_status=='2')?'check-def active':'check-def'"></div>
						<div>个别成员已集中隔离</div>
					</div>
					<div @click="member_status=3" v-show="member_status=='3'">
						<div :class="(member_status=='3')?'check-def active':'check-def'"></div>
						<div>其它</div>
					</div>
				</div>
				<div class="info" v-show="member_status==3">
					<group>
						<x-textarea disabled v-model="member_status_info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
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
				<h3>是否接触过发热发烧等症状人员</h3>
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
			<div class="item last">
				<h3>当前所在地</h3>
				<p>{{position}}</p>
			</div>
		</div>
  </div>
</template>

<script>
  import {XTextarea , Group ,XButton} from 'vux';

  export default {
    name: 'companyPersonalInfo',
    components: {
      Group,
      XTextarea,
      XButton
    },
    data () {
      return {
				day:window.localStorage.getItem('counts'),
				currentName:'',
				epidemic_record_id:'',
				personnel_id:'',
				personnel_heat:0,
				personnel_unwell:0,
				member_status:0,
				contact_patient:0,
				contact_infected_area:0,
				create_time:'',
				personnel_heat_info:'',
				personnel_unwell_info:'',
				member_status_info:'',
				position:'',
				area:'',
				list:[
					{
						key:'personnel_heat',
						title:'是否有发热等不适症状',
						checkList:[
							{
								checkNum:0,
								checkTitle:'否，身体健康',
								isSelect:false,
							},
							{
								checkNum:1,
								checkTitle:'是，已就医，居家隔离',
								isSelect:false,
							},
							{
								checkNum:2,
								checkTitle:'是，未就医，居家隔离',
								isSelect:false,
							},
						],
						info:''
					},
					{
						key:'personnel_unwell',
						title:'是否有咳嗽、腹泻等不适症',
						checkList:[
							{
								checkNum:0,
								checkTitle:'否，身体健康',
								isSelect:false,
							},
							{
								checkNum:1,
								checkTitle:'是，已就医，居家隔离',
								isSelect:false,
							},
							{
								checkNum:2,
								checkTitle:'是，未就医，居家隔离',
								isSelect:false,
							},
						],
						info:'轻微腹泻、已自己行吃药并好转。并没 有其它不适症状。'
					},
					{
						key:'member_status',
						title:'家庭成员健康状况',
						checkList:[
							{
								checkNum:0,
								checkTitle:'良好',
								isSelect:true,
							},
							{
								checkNum:1,
								checkTitle:'有不适症、已就医、居家隔离',
								isSelect:false,
							},
							{
								checkNum:2,
								checkTitle:'有不适症、未就医、居家隔离',
								isSelect:false,
							},
						],
						info:''
					},
				],
				
				morning_health_status:2,// 0表示不健康 1表示健康 2表示选择
				afternoon_health_status:2,// 0表示不健康 1表示健康 2表示选择
				morning_temp:'',
				afternoon_temp:'',
				popupData:{
					address:'',
					startTime:'',
					endTime:''
				},
				trip_list:[
					// {
					// 	address:'当代国际花园',
					// 	timeRange:'0:00~7:00',
					// },
					// {
					// 	address:'当代国际花园',
					// 	timeRange:'0:00~7:00',
					// },
					// {
					// 	address:'当代国际花园',
					// 	timeRange:'0:00~7:00',
					// },
				]
      }
    },
    created(){
      this.getPersonInfo();
    },
    methods:{
			//queryRecordInfoAPI
			getPersonInfo(){
				const params={
					epidemic_record_id:this.$route.query.epidemic_record_id,
        }
        this.request(this.api.queryCompanyRecordInfoAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
						this.personnel_heat=res.data.epidemic_record.personnel_heat;
						this.personnel_unwell=res.data.epidemic_record.personnel_unwell;
						this.member_status=res.data.epidemic_record.member_status;
						this.personnel_heat_info=res.data.epidemic_record.personnel_heat_info;
						this.member_status_info=res.data.epidemic_record.member_status_info;
						this.personnel_unwell_info=res.data.epidemic_record.personnel_unwell_info;
						this.position=res.data.epidemic_record.position;
						this.area=res.data.epidemic_record.area;
						this.contact_patient=res.data.epidemic_record.contact_patient;
						this.contact_infected_area=res.data.epidemic_record.contact_infected_area;
						this.morning_health_status=res.data.epidemic_record.morning_health_status;// 0表示不健康 1表示健康 2表示选择
						this.afternoon_health_status=res.data.epidemic_record.afternoon_health_status;// 0表示不健康 1表示健康 2表示选择
						this.morning_temp=res.data.epidemic_record.morning_temp;
						this.afternoon_temp=res.data.epidemic_record.afternoon_temp;
						this.trip_list=JSON.parse(res.data.epidemic_record.trip_list);
						// this.currentName=data.epidemic_record.personnel_name;
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
					}
        });
			}
    }

  };
</script>

<style lang="less">
   #companyPersonalInfo{
    width: 100vw;
    min-height: 100vh;
    padding: 32px 25px;
		box-sizing: border-box;
		background: url('../../assets/img/bg.png') top center no-repeat #009566;

		background-size: contain;
    & .tip{
			color: #C9FFEE;
			font-size: 36px;
			text-align: right;
			margin-bottom: 20px;
		}
		& .link{
			display: flex;
			flex-direction: row-reverse;
      height:58px;
			&>div{
				width:284px;
				height:58px;
				background:rgba(255,255,255,0.2);
				border-radius:8px;
				border:1px solid rgba(201,255,238,1);
				color: #C9FFEE;
				font-size: 30px;
				padding: 0 60px 0 26px;
				box-sizing: border-box;
				position: relative;
				line-height: 58px;
				&::after{
					content: '';
					position: absolute;
					width: 28px;
					height: 29px;
					background: url('../../assets/img/next-arrow.png');
					top: 10px;
					right: 18px;
					background-size: 100% 100%;
				}
			}
		}
		.link-box{
			display: flex;
			width:690px;
			height:88px;
			background:rgba(255,255,255,1);
			border-radius:8px;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin-bottom: 20px;
			border: 1px solid #E5E5E5;
			border-right: none;
			border-left: none;
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
		& .title{
			color: #009566;
			font-size: 36px;
			height: 56px;
			line-height: 56px;
			margin-top: 120px;
			display: flex;
			justify-content: space-between;
			margin-bottom: 30px;
			&>div{
				font-weight: 700;
				width: 420px;
				text-align: center;
			}
			&>span{
				flex: 1;
				display: flex;
				align-items: center;
				&:nth-of-type(1){
					flex-direction: row-reverse;
				}
				&>i{
					width: 32px;
					height: 32px;
					background: url('../../assets/img/star.png') center center no-repeat;
				}
			}

		}
		& .con{
			background-color: #fff;
			padding: 0 42px;
			overflow: hidden;
			// margin-top: 180px;
			&>.temperature-box{
				// display: flex;
				margin-bottom: 30px;
				// justify-content: space-between;
				&>div{
					font-size: 30px;
					align-items: center;
					display: flex;
					margin-bottom: 16px;
					&>.health-btn{
						width:108px;
						height:68px;
						line-height: 66px;
						box-sizing: border-box;
						background:rgba(242,242,242,1);
						border-radius:8px;
						border:1px solid rgba(229,229,229,1);
						text-align: center;
						margin-right: 20px;
						&.normal{
							color: #fff;
							background-color: #009566;
						}
						&.error{
							color: #fff;
							background-color: #E56154;
						}
					}
					&>label{
						margin-right: 20px;
					}
					&>p{
						width:164px;
						height:68px;
						line-height: 66px;
						border-radius:8px;
						border:1px solid rgba(229,229,229,1);
						box-sizing: border-box;
						background: #F2F2F2;
						display: flex;
						align-items: center;
						padding: 0 20px;
						& input{
							width: 100%;
							height: 68px;
							line-height: 68px;
							border: none;
							background-color: #f2f2f2;
							font-size: 28px;
							-webkit-appearance: none;
							box-sizing: border-box;
							&:focus{
								outline: none;
							}
						}
					}
					&>span{
						margin-left: 20px;
					}
				}
			}
			&>.trip-box{
				margin-bottom: 30px;
				& h5{
					padding-left: 58px;
					position: relative;
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;
					&>span{
						height: 48px;
						font-size:34px;
						font-weight:600;
						color:rgba(41,41,41,1);
						line-height:48px;
					}
					&>i{
						width: 55px;
						text-align: center;
						font-size:34px;
					}
					&>img{
						position: absolute;
						width: 38px;
						height: 48px;
						left: 5px;
						top: 0;
					}
				}
				&>.trip-list{
					&>div{
						display: flex;
						align-items: center;
						position: relative;
						height: 42px;
						line-height: 42px;
						margin-bottom: 20px;
						&:nth-last-of-type(1){
							&>.dot{
								&::after{
									content: '';
									position:absolute;
									width: 2px;
									height: 0;
									top: 18px;
									left: 8px;
									background-color: #979797;
								}
							}
						}
						&>.dot{
							width: 18px;
							height: 18px;
							background-color: #009566;
							border-radius: 50%;
							margin-right: 40px;
							margin-left: 14px;
							position: relative;
							&::after{
								content: '';
								position:absolute;
								width: 2px;
								height: 50px;
								top: 18px;
								left: 8px;
								background-color: #979797;
							}
						}
						&>p{
							color: #292929;
							font-size: 30px;
							&>span{
								margin-right: 38px;
								&:nth-last-of-type(1){
									margin-right: 10px;
								}
							}
						}
						&>i{
							position: absolute;
							width: 58px;
							height: 42px;
							line-height: 42px;
							text-align: center;
							right: 0;
							top: 0;
							color: #292929;
							font-size: 30px;
						}
					}
					&>.no-trip{
						color: #292929;
						font-size: 30px;
						padding-left: 60px;
					}
				}
			}
			&>.item{
				margin-bottom: 30px;
				position: relative;
				&::after{
					content: '';
					position: absolute;
					width: 100%;
					height: 0px;
					border:1px dashed #E5E5E5;
					bottom: -20px;
					left: 0;
				}
				&.status{
					&>div{
						display: flex;
						&>div{
							flex: 1;
						}
					}
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
					height:48px;
					font-size:34px;
					font-weight:600;
					color:rgba(41,41,41,1);
					line-height:48px;
					margin-bottom: 20px;
				}
				&>div{
					&:nth-of-type(1){
						&>div{
							display: flex;
							align-items: center;
							margin-bottom: 6px;
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
			}
			&>.link-box{
				width: 100%;
				height: 93px;
				margin-bottom: 30px;
				display: flex;
				justify-content: space-between;
				&>.link-btn{
					padding: 0 80px;
					height: 93px;
					border-radius: 44px;
					background:rgba(0,149,102,1);
					box-shadow:0px 3px 7px 0px rgba(0,149,102,0.5);
					color: #fff;
					font-size: 30px;
					text-align: center;
					line-height: 93px;
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
</style>

