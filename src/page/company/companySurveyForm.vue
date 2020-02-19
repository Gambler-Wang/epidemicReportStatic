<template>
  <div id="companySurveyForm">
    <div class="tip">已记录健康数据{{day}}天</div>
		<p>{{'今日填报：'+currentSubmit_count+'人'}}</p>
		<p>{{'注册人数：'+currentRegist_count+'人'}}</p>
		<div class="link">
			<!-- <div>健康数据中心</div> -->
		</div>
		<div class="title">
			<span>
				<i></i>
				<i></i>
				<i></i>
			</span>
			<div>个人健康日志</div>
			<span>
				<i></i>
				<i></i>
				<i></i>
			</span>
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
			
			<div class="link-box">
				<div @click="$go('/companyHistory');">
					日志查询
				</div>
				<div @click="$go('/companyHistoryStatic');">
					日志统计
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
			<div class="item">
				<h3>家庭成员健康状况</h3>
				<div>
					<div @click="member_status=0">
						<div :class="(member_status=='0')?'check-def active':'check-def'"></div>
						<div>全员健康状况良好</div>
					</div>
					<div @click="member_status=1">
						<div :class="(member_status=='1')?'check-def active':'check-def'"></div>
						<div>个别成员有不适症、居家隔离</div>
					</div>
					<div @click="member_status=2">
						<div :class="(member_status=='2')?'check-def active':'check-def'"></div>
						<div>个别成员已集中隔离</div>
					</div>
					<div @click="member_status=3">
						<div :class="(member_status=='3')?'check-def active':'check-def'"></div>
						<div>其它</div>
					</div>
				</div>
				<div class="info" v-show="member_status==3">
					<group>
						<x-textarea v-model="member_status_info" :max="50" :rows="2" placeholder="请输入要补充情况说明…"></x-textarea>
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
				<h3>是否接触过发热发烧等症状人员</h3>
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
			<div class="item last">
				<h3>当前所在地</h3>
				<div class="address">
					<popup-picker ref="cityPicker" title="省市区:" :columns="3" show-name :data="cityList" v-model="cityInfo" placeholder="选择省市区" ></popup-picker>
					<!-- <input type="text" v-model="position"> -->
					<!-- <i>{{position}}</i>
					<span @click="changePosition">修改</span> -->
				</div>
				<group>
						<x-textarea v-model="position" :max="50" :rows="2" placeholder="请输入详细地址(非必填)"></x-textarea>
					</group>
			</div>
			<div class="btn" @click="submit()">已填写完成，提交</div>
		</div>
    <!-- <div v-transfer-dom>
      <confirm v-model="positionEditShow"
			ref="confirm"
      show-input
      title="地理位置修改："
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow">
      </confirm>
    </div> -->
  </div>
</template>
<script>
  import {XTextarea , Group ,XButton,Confirm,TransferDom,PopupPicker,Popup} from 'vux';
  import {cityData} from '../../utils/city';
  export default {
    name: 'companySurveyForm',
    components: {
      Group,
      XTextarea,
			XButton,
			Confirm,
      Popup,
      PopupPicker,
    },
    directives: {
      TransferDom
    },
    data () {
      return {
				day:window.localStorage.getItem('counts'),
        company:JSON.parse(window.localStorage.getItem('company'))||{},
        atarea:JSON.parse(window.localStorage.getItem('atarea'))||{},
				currentSubmit_count:'',
				currentRegist_count:'',
				positionEditShow:false,
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
        cityList: cityData,
        cityInfo:[],
        province_code:'',
        province_name:'',
        city_code:'',
        city_name:'',
        area_code:'',
        area_name:'',
      }
    },
    created(){
      this.currentRegist_count=this.company.personnel_count;
			this.currentSubmit_count=this.company.submit_count;
			this.position=this.atarea.position;
			if(this.atarea.province_code && this.atarea.city_code){
				this.cityInfo=[this.atarea.province_code,this.atarea.city_code,this.atarea.area_code]
			}else{
				this.cityInfo=[];
			}
		},
		mounted() {
			// var that =this;
			// var geolocation=new BMap.Geolocation();
			// geolocation.getCurrentPosition(function(r){
			// 		if(this.getStatus()==BMAP_STATUS_SUCCESS){
			// 			that.position=r.address.province+r.address.city+r.address.district+r.address.street;
			// 			if(r.address.district){
			// 				that.area=r.address.district;
			// 			}else{
			// 				that.area=r.address.city;
			// 			}
			// 			if(!r.address.district && !r.address.city){
			// 				that.area=r.address.province;
			// 			}
			// 		}else{
			// 			//BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
			// 			//BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
			// 			//BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
			// 			//BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
			// 			//BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
			// 			//BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
			// 			//BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
			// 			//BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
			// 			//BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
			// 			if(this.getStatus() == '8'){
			// 				that.$vux.toast.text('请求超时，地理位置获取失败','bottom');
			// 			}else if(this.getStatus() == '7'){
			// 				that.$vux.toast.text('服务不可用，地理位置获取失败','bottom');
			// 			}else if(this.getStatus() == '6'){
			// 				that.$vux.toast.text('无权限，地理位置获取失败','bottom');
			// 			}
			// 			that.position="地理位置获取失败...";
			// 			that.area="";
			// 		}
			// })
		},
    methods:{
			// changePosition(){
			// 	this.positionEditShow=true;
			// },
			// onShow(){
      // 	this.$refs.confirm.setInputValue(this.position);
			// },
			// onCancel(){
			// 	this.positionEditShow=false;
			// },	
			// onConfirm(val){
			// 	this.positionEditShow=false;
			// 	this.position=val;
			// },
			submit(){
				if(this.cityInfo.length==0){
					this.$vux.toast.text('请选择省市区！', 'bottom')
				}
        var cityNames = this.$refs.cityPicker&&this.$refs.cityPicker.getNameValues();
				var cityNameList = cityNames.split(' ');
				if(cityNameList[1].indexOf('直辖')>-1){
					this.area=cityNameList[2];
				}else if(cityNameList[1].indexOf('市辖')>-1){
					this.area=cityNameList[0];
				}else{
					this.area=cityNameList[1];
				}
				const params={
					personnel_heat:this.personnel_heat,
					personnel_unwell:this.personnel_unwell,
					member_status:this.member_status,
					contact_patient:this.contact_patient,
					contact_infected_area:this.contact_infected_area,
					personnel_heat_info:this.personnel_heat_info,
					personnel_unwell_info:this.personnel_unwell_info,
					member_status_info:this.member_status_info,
					position:this.position,
					area:this.area,
          province_code:this.cityInfo[0],
          province_name:cityNameList[0],
          city_code:this.cityInfo[1],
          city_name:cityNameList[1],
          area_code:this.cityInfo[2] || '',
          area_name:cityNameList[2] || '',
        }
        this.request(this.api.addCompanyPersonRecordAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            window.localStorage.setItem('company',JSON.stringify(res.data.company));
            window.localStorage.setItem('atarea',JSON.stringify(res.data.atarea));
            window.localStorage.setItem('counts',JSON.stringify(res.data.counts));
						this.$go('/companyHistory');
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
					}
        });
			}
    }

  };
</script>

<style lang="less">
  #companySurveyForm{
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
			margin-bottom: 10px;
		}
		&>p{
			color: #C9FFEE;
			font-size: 30px;
			text-align: right;
			height: 48px;
			line-height: 48px;
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
			margin-top: 30px;
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
				.address{
					.weui-cell{
						padding: 10px 0;
						width: 100%;
						.vux-cell-value{
							font-size: 28px;
							color:#009566;
						}
					}
				}
				// p{
				// 	display: flex;
				// 	align-items: center;
				// 	height: 48px;
				// 	input{
				// 		flex: 1;
				// 		border:none;
				// 		&:focus{
        //     outline:none;
        //     }
				// 	}
				// 	i{
				// 		flex: 1;
				// 		font-style:normal;
				// 	}
				// 	span{
				// 		width: 80px;
				// 		height: 48px;
				// 		line-height: 48px;
				// 		font-size: 26px;
				// 		color: #009566;
				// 		margin-left: 20px;
				// 		text-align: center;
				// 	}
				// }
			}
			&>.link-box{
				width: 100%;
				height: 93px;
				margin-bottom: 53px;
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

