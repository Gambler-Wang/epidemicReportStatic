<template>
  <div id="gridCommunityPersonalEdit">
    <Header title="个人信息维护" />
    <div class="main">
      <div class="tip">编辑管理员信息<br>保存更新</div>
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
          <div class="item">
            <x-input type="tel" title="联系电话:" placeholder="填写联系电话,如18911111111" v-model="personnel_phone">
            </x-input>
          </div>
          <div class="item">
            <x-input title="家庭责任人:" placeholder="填写家庭责任人姓名" v-model="personnel_name">
            </x-input>
          </div>
          <div class="item">
            <popup-picker ref="cityPicker" title="省市:" :columns="3" show-name :data="cityList" v-model="cityInfo" ></popup-picker>
          </div>
          <div class="item">
            <x-input title="镇/街:" placeholder="填写镇(街道办),如关东街道…" v-model="town_name">
            </x-input>
          </div>
          <div class="item">
            <x-input :show-clear="false" title="社区/村:" :disabled="true" @click.native="communityFocus" v-model="community_name" placeholder="填写社区(村),如佛祖岭社区…">
              <img slot="right" src="../../assets/img/chaxunicon.png" alt="">
            </x-input>
          </div>
          <div class="item">
            <x-input title="小区/组:" placeholder="填写小区(组),如当代国际花园…" v-model="group_name">
            </x-input>
          </div>
          <div class="item">
            <x-input type="number" placeholder="可不填" :show-clear="false" title="楼栋:" v-model="building" :min="1" :max="2">
              <div class="unit" slot="right">栋</div>
            </x-input>
            <x-input type="number" placeholder="可不填" title="" :show-clear="false" v-model="unit" :min="1" :max="2">
              <div class="unit" slot="right" :min="1" :max="2">单元</div>
            </x-input>
          </div>
          <div class="item">
            <x-input type="number" title="房间号:" placeholder="请填写房间号(非社区可不填)" v-model="room_number">
            </x-input>
          </div>
          <div class="item">
            <x-input title="详细地址:" placeholder="填写详细地址" v-model="address">
            </x-input>
          </div>
          <div class="item">
            <x-input title="健康信息包报责任党员:" placeholder="填写责任党员" v-model="party_member">
            </x-input>
          </div>
          <div class="item">
            <x-input title="网格员:" placeholder="填写网格员" v-model="grid_member">
            </x-input>
          </div>
        <!-- <div class="item">
          <x-input title="地址:" placeholder="请输入地址信息…" v-model="address">
            <img slot="right" src="../../assets/img/position.png" alt="">
          </x-input>
        </div> -->
        <x-button class="cicle" :gradients="['#009566', '#009566']" @click.native="submit()">保存</x-button>
      </div>
      
      <div v-transfer-dom>
        <popup v-model="showPopup" position="bottom">
          <div class="popupMask">
            <div class="search-box">
              <div class="search">
                <input ref="inputs" type="text" v-model="searchValue" placeholder="请输入社区名称">
              </div>
              <div class="btn" @click="searchSure">确定</div>
            </div>
            <ul class="list">
              <li v-for="(item,index) in communityList" :key="index" @click="handleLiSure(item)">
                {{item.community_name}}
              </li>
            </ul>
            <div style="padding:0 20px;color:#292929;font-size:14px;opacity: 0.7;" v-show="communityList.length==0">暂无对应社区，可添加</div>
          </div>
          <!-- <group>
            <cell v-for="i in 20" :key="i" :title="i"></cell>
          </group> -->
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header';
  import {cityData} from '../../utils/city';
  import {XInput, Group ,XButton,Cell,PopupPicker,Popup,TransferDom} from 'vux';
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Cell,
      Popup,
      PopupPicker,
      Header
    },
    directives: {
      TransferDom
    },
    data () {
      return {
        searchValue:'',
        cityList:cityData,
        communityList:[
          
        ],
        showPopup:false,
        cityInfo:[],
        province_code:'',
        province_name:'',
        city_code:'',
        city_name:'',
        area_code:'',
        area_name:'',
        town_name:'',
        community_id:'',
        community_name:'',
        group_name:'',
        building:'',
        unit:'',
        room_number:'',
        grid_member:'',
        party_member:'',
        personnel_phone:'',
        address:''
      }
    },
    created(){
			var data =JSON.parse(window.localStorage.getItem('data')) || {};
			this.cityInfo.push(data.community1.province_code);
			this.cityInfo.push(data.community1.city_code);
      this.cityInfo.push(data.community1.area_code);
      this.town_name=data.family.town_name;
      this.community_name=data.community1.community_name;
      this.group_name=data.family.group_name;
      this.address=data.family.address;
      this.grid_member=data.family.grid_member;
      this.party_member=data.family.party_member;
      this.personnel_phone=data.personnel.personnel_phone;
      this.community_id=data.community1.community_id; 
      this.personnel_name=data.personnel.personnel_name; 
      this.building=data.family.building ||'';
      this.unit=data.family.unit ||'';
      this.room_number=data.family.room_number ||'';
    },
    watch: {
      searchValue(){
        this.searchData();
      },
      personnel_phone(val){
        // if(val.length==11){
        //   this.searchPersonelInfo();
        // }else if(val.length>11){
        //   this.$vux.toast.text('请填写正确的手机号', 'bottom');
        // }
      }
    },
    methods:{
      searchPersonelInfo(){
        const params={
          personnel_phone : this.personnel_phone,
        }
        this.request(this.api.communityGridQueryPersonelInfoAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            if(res.data.owner){
              this.province_code=res.data.owner.province_code;
              this.province_name=res.data.owner.province_name;
              this.city_code=res.data.owner.city_code;
              this.city_name=res.data.owner.city_name;
              this.area_code=res.data.owner.area_code;
              this.area_name=res.data.owner.area_name;
              this.town_name=res.data.owner.town_name;
              this.community_id=res.data.owner.community_id;
              this.community_name=res.data.owner.community_name;
              this.group_name=res.data.owner.group_name;
              this.building=res.data.owner.building;
              this.unit=res.data.owner.unit;
              this.room_number=res.data.owner.room_number;
              this.grid_member=res.data.owner.grid_member;
              this.party_member=res.data.owner.party_member;
              // this.personnel_phone=res.data.owner.personnel_phone;
              this.personnel_name=res.data.owner.name;
              this.address=res.data.owner.address
              this.cityInfo=[this.province_code,this.city_code,this.area_code];
            }else{
              this.province_code='';
              this.province_name='';
              this.city_code='';
              this.city_name='';
              this.area_code='';
              this.area_name='';
              this.town_name='';
              this.community_id='';
              this.community_name='';
              this.group_name='';
              this.building='';
              this.unit='';
              this.room_number='';
              this.grid_member='';
              this.party_member='';
              // this.personnel_phone=res.data.owner.personnel_phone;
              this.personnel_name='';
              this.address=''
              this.cityInfo=['420000','420100','420102'];
            }       
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
          }
        });
      },
      communityFocus(){
        this.showPopup=true;
        this.$nextTick(()=>{   
          // this.$refs.inputs.focus();
        })
      },
      searchData(){
        const params={
          province_code:this.cityInfo[0],
          city_code:this.cityInfo[1],
          area_code:this.cityInfo[2] || '',
          community_name : this.searchValue,
        }
        this.request(this.api.queryCommunityGridCommunityAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            // 请求社区模糊查询接口
            // {
            //   code：200，
            //   data：{
            //     communityList:[
            //       {
            //         community_id：'xxxx',
            //         community_name:'当代国际花园1'，
            //         city:'武汉市'
            //       }，
            //       {
            //         community_id：'yyyy',
            //         community_name:'当代国际花园2'，
            //         city:'武汉市'
            //       }，
            //       {
            //         community_id：'zzz',
            //         community_name:'当代国际花园3'，
            //         city:'武汉市'
            //       }，
            //     ]
            //   }
            //   msg：'请求成功！'
            // }
            this.communityList=[];
            this.communityList=res.data.communityList;
            

          }else{
            this.$vux.toast.text(res.msg, 'bottom')
          }
        });
      },
      handleLiSure(item){
        this.community_name=item.community_name;
        this.community_id=item.community_id;
        this.showPopup=false;
      },
      searchSure(){
        this.community_name=this.searchValue;
        this.showPopup=false;
      },
      submit(){
        if(!this.community_name){
          this.$vux.toast.text('请填写社区信息', 'bottom');
          return;
        }
        if(!this.personnel_phone){
          this.$vux.toast.text('请填写手机号码', 'bottom');
          return;
        }
        if(!this.address){
          this.$vux.toast.text('请填写详细地址', 'bottom');
          return;
        }
        var _res=/^[1-9]\d*$/;
        if(this.building && !_res.test(this.building) ){
            this.$vux.toast.text('楼栋信息请填写正整数', 'bottom');
            return;
        }
        if(this.unit && !_res.test(this.unit) ){
            this.$vux.toast.text('单元信息请填写正整数', 'bottom');
            return;
        }
        var phone_res=/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        if(!phone_res.test(this.personnel_phone)){
          this.$vux.toast.text('请填写正确的手机号', 'bottom');
          return;
        }
        var cityNames = this.$refs.cityPicker&&this.$refs.cityPicker.getNameValues();
        var cityNameList = cityNames.split(' ');
        const params={
          province_code:this.cityInfo[0],
          province_name:cityNameList[0],
          city_code:this.cityInfo[1],
          city_name:cityNameList[1],
          area_code:this.cityInfo[2] || '',
          area_name:cityNameList[2] || '',
          town_name:this.town_name,
          community_id:this.community_id,
          community_name:this.community_name,
          group_name:this.group_name,
          grid_member:this.grid_member,
          building:(this.building)?Number(this.building):'',
          unit:(this.unit)?Number(this.unit):'',
          room_number:this.room_number,
          party_member:this.party_member,
          personnel_phone:this.personnel_phone,
          personnel_name:this.personnel_name,
          address:this.address
        }
        this.request(this.api.editCommunityGridPersonnelAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            window.localStorage.setItem('data',JSON.stringify(res.data));
            window.localStorage.setItem('counts',JSON.stringify(res.data.counts));
             this.$go('/gridCommunityPersonalInfo');
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
          }
        });
      },
    }

    

  };
</script>

<style lang="less">
  #gridCommunityPersonalEdit{
    overflow: hidden;
    .main{
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
        margin: 20px 0;
      }
      & .link{
        display: flex;
        flex-direction: row-reverse;
        height:58px;
        &>div{
          width:276px;
          height:58px;
          background:rgba(255,255,255,0.2);
          border-radius:8px;
          border:1px solid rgba(201,255,238,1);
          color: #C9FFEE;
          font-size: 30px;
          padding: 0 60px 0 26px;
          box-sizing: border-box;
          position: relative;
          line-height:58px;
          &::after{
            content: '';
            position: absolute;
            width: 28px;
            height: 29px;
            background: url('../../assets/img/next-arrow.png');
            top: 10px;
            right: 18px;
            background-size: contain;
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
        margin-bottom: 10px;
      }
      & .con{
        background-color: #fff;
        // height: 69vh;
        padding: 20px 42px;
        overflow: hidden;
        box-sizing: border-box;
        // margin-top: 180px;
        .vux-cell-placeholder, .vux-cell-value {
            color: #292929;
        }
        .item {
          border-bottom:1px solid #E5E5E5 ;
          display: flex;
          height: 100px;
          box-sizing: border-box;
          & .unit{
            font-size: 30px;
            color: #101010;
          }
          .weui-cell{
            padding: 20px 30px;
            & .weui-cell__ft{
              & img{
                vertical-align: middle;
              }
            }
            & .weui-label{
              font-size: 30px;
              width: auto!important;
              margin-right:20px;
            }
            & .weui-input{
              font-size: 30px;
            }
          }
          .vux-x-input {
            width: 100%;
          }
          .vux-cell-box{
            width: 100%;
            & .vux-popup-picker-select{
              width: 354px;
              font-size: 30px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              text-overflow: -o-ellipsis-lastline;
              text-align: left!important;
              box-sizing: border-box;
            }
          }
        }
        img {
          width:38px;
          height:39px;
        }
        .cicle {
          margin-top: 86px;
          margin-bottom: 58px;
          border-radius:50px;
          height: 93px;
          box-sizing: border-box;
          font-size:30px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:42px;
        }
      }

    }
  }
</style>
<style lang="less">
  .popupMask{
    height: auto;
    min-height: 100vh;
    & .search-box{
      display: flex;
      padding: 10px 30px;
      background: #E5E5E5;
      &> .search{
        flex: 1;
        height: 68px;
        overflow: hidden;
        margin-right: 20px;
        border-radius: 5px;
        &> input{
          width: 100%;
          height: 100%;
          border: none;
          vertical-align: top;
          padding-left: 18px;
          &:focus{
            outline:none;
            }
        }
      }
      & > .btn{
        height: 68px;
        line-height: 68px;
        font-size: 28px;
        width: 100px;
        text-align: center;
        color: #fff;
        background: #009566;
        border-radius: 5px;        
      }
    }
    & .list{
      &>li{
        height: 68px;
        line-height: 68px;
        font-size: 26px;
        border-bottom: 1px solid #ccc;
        padding: 0 20px;
        box-sizing: border-box;
      }
    }
  }
</style>

