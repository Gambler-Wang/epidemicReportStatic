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
			<div class="temperature-box">
				<div>
					<label>上午体温</label>
					<div :class="(morning_health_status==1)?'health-btn normal':'health-btn'" @click="morning_health_status=1">正常</div>
					<div :class="(morning_health_status==0)?'health-btn error':'health-btn'" @click="morning_health_status=0">异常</div>
					<p>
						<input v-model="morning_temp" type="number" placeholder="非必填">
						<span>℃</span>
					</p>
				</div>
				<div>
					<label>下午体温</label>
					<div :class="(afternoon_health_status==1)?'health-btn normal':'health-btn'" @click="afternoon_health_status=1">正常</div>
					<div :class="(afternoon_health_status==0)?'health-btn error':'health-btn'	" @click="afternoon_health_status=0">异常</div>
					<p>
						<input v-model="afternoon_temp" type="number" placeholder="非必填">
						<span>℃</span>
					</p>
				</div>
				<p>*大于37.3°C为体温异常</p>
			</div>
			<div class="trip-box">
				<h5>
					<b></b>
					<span>今日行程</span>
					<i class="iconfont" @click="handleAddTrip">&#xe6c4;</i>
				</h5>
				<div class="trip-list">
					<div v-for="(item,index) in trip_list" :key="index">
						<div class="dot"></div>
						<p>
							<span v-maxLength="item.address" title=""></span>
							<span>{{item.timeRange}}</span>
						</p>
						<i class="iconfont" @click="delTrip(index)">&#xe60e;</i>
					</div>
					<div v-if="trip_list.length==0" class="no-trip">今日行程待添加</div>
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
    <div v-transfer-dom>
      <popup v-model="showTripAddPage" height="100%">
        <div class="popup-trip">
          <div class="popup-trip-header">
						<span @click="showTripAddPage=false">取消</span>
						<span @click="addTripSure">确认</span>
					</div>
					<group>
						<x-input :show-clear='false' title="行程地址" v-model="popupData.address" placeholder="请输入行程地址，如上班在途、居住小区"></x-input>
					</group>
					<group>
						<datetime v-model="popupData.startTime" 
						 placeholder="请选择行程开始时间"
						format="HH:mm" 
						:minute-list="['00', '05', '10', '15','20','25', '30', '35', '40','45', '50', '55']" 
						title="开始时间"></datetime>
					</group>
					<group>
						<datetime v-model="popupData.endTime" 
						format="HH:mm" 
						 placeholder="请选择行程结束时间"
						:minute-list="['00', '05', '10', '15','20','25', '30', '35', '40','45', '50', '55']" 
						title="结束时间"></datetime>
					</group>
					<div class="remark">
						注：
						<br>
						1、每日记录当前行程状态,包括上班时间段,上下班途中时间段,在家时间段,外出时间段。
						<br>
						<br>
						2、若工作时间外出，也要根据实际时间填写外出地点外出时间，如果无法预估外出时间范围，可先等外出结束后一起填写。
					</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import {XTextarea , Group ,XButton,Confirm,TransferDom,PopupPicker,Popup,XInput,Datetime  } from 'vux';
  import {cityData} from '../../utils/city';
  export default {
    name: 'companySurveyForm',
    components: {
      Group,
      XTextarea,
			XButton,
			Confirm,
      Popup,
      PopupPicker,XInput,Datetime 
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
				
				//添加
				showTripAddPage:false,
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
			
			getPersonInfo(){
        this.request(this.api.queryCompanyRecordInfoAPI, JSON.stringify({}),'post','application/json').then(res => {
          if(res.code==200){
						if(res.data.epidemic_record==""){
							return
						}else{
							this.morning_health_status=res.data.epidemic_record.morning_health_status;// 0表示不健康 1表示健康 2表示选择
							this.afternoon_health_status=res.data.epidemic_record.afternoon_health_status;// 0表示不健康 1表示健康 2表示选择
							this.morning_temp=res.data.epidemic_record.morning_temp;
							this.afternoon_temp=res.data.epidemic_record.afternoon_temp;
							this.trip_list=JSON.parse(res.data.epidemic_record.trip_list);
						}
						// this.currentName=data.epidemic_record.personnel_name;
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
					}
        });
			},
			handleAddTrip(){
				this.showTripAddPage=true;
				this.popupData={
					address:'',
					startTime:'',
					endTime:''
				};
			},
			addTripSure(){
				this.showTripAddPage=false;
				var obj={
					address:this.popupData.address,
					timeRange:this.popupData.startTime+'~'+this.popupData.endTime
				}
				this.trip_list.push(obj);
			},
			delTrip(index){
				this.trip_list.splice(index, 1);
			},
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
					morning_health_status:this.morning_health_status,// 0表示不健康 1表示健康 2表示未选择
					afternoon_health_status:this.afternoon_health_status,// 0表示不健康 1表示健康 2表示未选择
					morning_temp:this.morning_temp,
					afternoon_temp:this.afternoon_temp,
					trip_list:JSON.stringify(this.trip_list)
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
			&>.temperature-box{
				// display: flex;
				margin-bottom: 30px;
				position: relative;
				// justify-content: space-between;
				&>p{
					padding-left: 140px;
					box-sizing: border-box;
					color: #E56154;
					font-size: 24px;
				}
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
				&::after{
					content: '';
					position: absolute;
					width: 100%;
					height: 0px;
					border:1px dashed #E5E5E5;
					bottom: -16px;
					left: 0;
				}
			}
			&>.trip-box{
				margin-bottom: 30px;
				position: relative;
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
					&>b{
						position: absolute;
						width: 38px;
						height: 48px;
						left: 5px;
						top: 0;
						background: url('../../assets/img/tubiaohezi-hisxitongtubiao_huaban.png');
						background-size: 100% 100%;
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
				&::after{
					content: '';
					position: absolute;
					width: 100%;
					height: 0px;
					border:1px dashed #E5E5E5;
					bottom: -16px;
					left: 0;
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
					bottom: -16px;
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
<style lang="less">
	.popup-trip{
		& .popup-trip-header{
			height: 88px;
			line-height: 88px;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			margin-bottom: 36px;
			&>span{
				width: 120px;
				text-align: center;
				font-size: 30px;
				color: #292929;
				text-align: center;
			}
		}
		& .weui-cells{
			margin-top: 0;
			& .weui-cell{
				padding: 20px 30px;
				&>div{
					height: 56px;
					line-height: 56px;
					& .weui-label{
						font-size: 30px;
						color: #292929;
					}
					&.weui-cell__primary{
						display: flex;
						justify-content: center;
						& .weui-input{
							font-size: 30px;
							height: 100%;
						}
					}
					& p{
						font-size: 30px;
						color: #292929;
					}
					& .vux-cell-placeholder{
						color: #999999;
						font-size: 30px;
				}

				}
			}
		}
		& .remark{
			color: #999999;
			font-size: 30px;
			margin-top: 32px;
			padding: 0 30px;
			box-sizing: border-box;
		}
	}
</style>

