<template>
  <div id="gridCommunitySurveyForm">
		<HeaderNav title="居民健康日报填写">
      <div class="add-btn" slot="right" @click="$go('/gridCommunityHistory')">
        <div></div>
      </div>
		</HeaderNav>
		<main>
			<div class="tip">已记录健康日志{{day}}天</div>
			<div class="link">
				<!-- <div>健康数据中心</div> -->
			</div>
			<div class="title">
				<!-- <span>
					<i></i>
					<i></i>
					<i></i>
				</span>
				<div>个人健康日志</div>
				<span>
					<i></i>
					<i></i>
					<i></i>
				</span> -->
			</div>
			<div class="con">
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
							<input v-model="item.temperature" type="number" placeholder="请输入温度,如36.8">
						</p>
						<span>℃</span>
					</div>
				</div>
				<div class="item">
					<h3>是否有发热等不适症状</h3>
					<div>
						<div @click="personnel_heat=0">
							<div :class="(personnel_heat=='0')?'check-def active':'check-def'"></div>
							<div>否，无发热等不适症</div>
						</div>
						<div @click="personnel_heat=1">
							<div :class="(personnel_heat=='1')?'check-def active':'check-def'"></div>
							<div>是，有，居家隔离</div>
						</div>
						<div @click="personnel_heat=2">
							<div :class="(personnel_heat=='2')?'check-def active':'check-def'"></div>
							<div>是，有，集中隔离</div>
						</div>
						<div @click="personnel_heat=3">
							<div :class="(personnel_heat=='3')?'check-def active':'check-def'"></div>
							<div>其它</div>
						</div>
					</div>
					<div class="info" v-show="personnel_heat==3">
						<group>
							<x-textarea v-model="personnel_heat_info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
						</group>
					</div>
				</div>
				<div class="item">
					<h3>是否有咳嗽、腹泻等不适症</h3>
					<div>
						<div @click="personnel_unwell=0">
							<div :class="(personnel_unwell=='0')?'check-def active':'check-def'"></div>
							<div>否，无咳嗽、腹泻等不适症</div>
						</div>
						<div @click="personnel_unwell=1">
							<div :class="(personnel_unwell=='1')?'check-def active':'check-def'"></div>
							<div>是，有，居家隔离</div>
						</div>
						<div @click="personnel_unwell=2">
							<div :class="(personnel_unwell=='2')?'check-def active':'check-def'"></div>
							<div>是，有，集中隔离</div>
						</div>
						<div @click="personnel_unwell=3">
							<div :class="(personnel_unwell=='3')?'check-def active':'check-def'"></div>
							<div>其它</div>
						</div>
					</div>
					<div class="info" v-show="personnel_unwell==3">
						<group>
							<x-textarea v-model="personnel_unwell_info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
						</group>
					</div>
				</div>
				<div class="item status">
					<h3>是否到过疫区或者接触过疫区人员</h3>
					<div>
						<div @click="contact_infected_area=0">
							<div :class="(contact_infected_area=='0')?'check-def active':'check-def'"></div>
							<div>否</div>
						</div>
						<div @click="contact_infected_area=1">
							<div :class="(contact_infected_area=='1')?'check-def active':'check-def'"></div>
							<div>是</div>
						</div>
					</div>
				</div>
				<div class="item status">
					<h3>是否接触过新冠状病毒患者</h3>
					<div>
						<div @click="contact_patient=0">
							<div :class="(contact_patient=='0')?'check-def active':'check-def'"></div>
							<div>否</div>
						</div>
						<div @click="contact_patient=1">
							<div :class="(contact_patient=='1')?'check-def active':'check-def'"></div>
							<div>是</div>
						</div>
					</div>
				</div>
				<div class="item last-1">
					<h3>如有家庭成员接受过医院或社区服务中心 服务诊疗，请填写医院意见。</h3>
					<div class="info">
						<group>
							<x-textarea v-model="hospital_opinion" :max="100" :rows="3" placeholder="请输入要补充情况说明…"></x-textarea>
						</group>
					</div>
				</div>
				<div class="item last">
					<h3>当前所在地</h3>
					<p>
						<i>{{position}}</i>
						<span @click="changePosition">修改</span>
					</p>
				</div>
				<div class="btn" @click="submit()">已填写完成，提交</div>
			</div>
			<div v-transfer-dom>
				<confirm v-model="positionEditShow"
				ref="confirm"
				show-input
				title="地理位置修改："
				@on-cancel="onCancel"
				@on-confirm="onConfirm"
				@on-show="onShow">
				</confirm>
			</div>

		</main>
  </div>
</template>
<script>
  import HeaderNav from '../../components/headerNav';
  import {XTextarea , Group ,XButton,Confirm,TransferDom} from 'vux';

  export default {
    name: 'gridCommunitySurveyForm',
    components: {
      Group,
      XTextarea,
      XButton,
			Confirm,
			HeaderNav
    },
    directives: {
      TransferDom
    },
    data () {
      return {
				day:window.localStorage.getItem('counts'),
				positionEditShow:false,
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
				position:'正在获取中...',
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
				]
      }
    },
    created(){
			var data =JSON.parse(window.localStorage.getItem('data')) || {};
			if(data.members){
				data.members.forEach(el => {
					var obj={
						member_id:el.member_id,
						member_name:el.member_name,
						temperature:36.8
					}
					this.memberList.push(obj);
				});
			}
    },
		mounted() {
			var that =this;
			var geolocation=new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
					if(this.getStatus()==BMAP_STATUS_SUCCESS){
						that.position=r.address.province+r.address.city+r.address.district+r.address.street;
						if(r.address.district){
							that.area=r.address.district;
						}else{
							that.area=r.address.city;
						}
						if(!r.address.district && !r.address.city){
							that.area=r.address.province;
						}
					}else{
						//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
						//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
						//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
						//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
						//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
						//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
						//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
						//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
						//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
						if(this.getStatus() == '8'){
							that.$vux.toast.text('请求超时，地理位置获取失败','bottom');
						}else if(this.getStatus() == '7'){
							that.$vux.toast.text('服务不可用，地理位置获取失败','bottom');
						}else if(this.getStatus() == '6'){
							that.$vux.toast.text('无权限，地理位置获取失败','bottom');
						}
						that.position="地理位置获取失败...";
						that.area="";
					}
			})
		},
    methods:{
			changePosition(){
				this.positionEditShow=true;
			},
			onShow(){
      	this.$refs.confirm.setInputValue(this.position);
			},
			onCancel(){
				this.positionEditShow=false;
			},	
			onConfirm(val){
				this.positionEditShow=false;
				this.position=val;
			},
			submit(){
				const params={
					personnel_heat:this.personnel_heat,
					personnel_unwell:this.personnel_unwell,
					contact_patient:this.contact_patient,
					contact_infected_area:this.contact_infected_area,
					personnel_heat_info:this.personnel_heat_info,
					personnel_unwell_info:this.personnel_unwell_info,
					hospital_opinion:this.hospital_opinion,
					body_temperature:this.memberList,
					position:this.position,
					area:this.area,
				}
				for (let index = 0; index < params.body_temperature.length; index++) {
					params.body_temperature[index].temperature=Number(Number(params.body_temperature[index].temperature).toFixed(1));
					
				}
        this.request(this.api.addCommunityGridRecordAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            window.localStorage.setItem('data',JSON.stringify(res.data));
            window.localStorage.setItem('counts',JSON.stringify(res.data.counts));
             this.$go('/gridCommunityHistory');
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
					}
        });
			}
    }

  };
</script>

<style lang="less">
  #gridCommunitySurveyForm{
		overflow: hidden;
		.add-btn{
      div{
        width: 52px;
				height: 52px;
				margin-right: 20px;
				background: url('../../assets/img/chaxunicon.png');
				background-size: 100% 100%;
      }
		}
		main{
			width: 100vw;
      min-height: ~'calc(100vh - 88px)';
			padding: 32px 25px;
			box-sizing: border-box;
			background: url('../../assets/img/bg.png') top center no-repeat #009566;
			background-size: contain;
      margin-top: 88px;
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
			& .title{
				color: #009566;
				font-size: 36px;
				// height: 56px;
				// line-height: 56px;
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
						// 	content: '';
						// 	position: absolute;
						// 	border: none;
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

