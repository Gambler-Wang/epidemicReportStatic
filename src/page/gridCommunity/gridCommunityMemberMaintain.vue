<template>
  <div id="gridCommunityMemberMaintain">
    <Header title="成员信息" />
    <div class="main">
      <div class="tip">记录成员信息<br>方便管理</div>
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
            <x-input title="姓名:" placeholder="请填写姓名…" v-model="bind_type_name">
            </x-input>
          </div>
          <div class="item">
            <x-input title="成员关系:" placeholder="请填写父子,母子,子女…" v-model="member_name">
            </x-input>
          </div>
          <div class="item">
            <x-input type="tel" title="联系电话:" placeholder="填写联系电话,如18911111111" v-model="member_phone">
            </x-input>
          </div>
        <x-button class="cicle" :gradients="['#009566', '#009566']" @click.native="submit()">保存</x-button>
      </div>
      
      <!-- <div v-transfer-dom>
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
                {{item.city+','+item.community_name}}
              </li>
            </ul>
            <div style="padding:0 20px;color:#292929;font-size:14px;opacity: 0.7;" v-show="communityList.length==0">暂无对应社区，可添加</div>
          </div>
        </popup>
      </div> -->
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header';
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
        cityList: [['武汉7777777777777777777777777777777777777777市','黄石市','襄阳市','荆州市','宜昌市','十堰市','孝感市','荆门市','鄂州市','黄冈市','咸宁市','随州市','大冶市','丹江口市','洪湖市','石首市','松滋市','宜都市','当阳市','枝江市','老河口市','枣阳市','宜城市','钟祥市','应城市','安陆市','汉川市','麻城市','武穴市','赤壁市','广水市','仙桃市','天门市','潜江市','恩施市','利川市']],
        cityName: ['武汉7777777777777777777777777777777777777777市'],
        communityList:[
          
        ],
        showPopup:false,
        bind_type_name:'',
        member_name:'',
        member_phone:''
      }
    },
    created(){
      
    },
    watch: {
      // searchValue(){
      //   this.searchData();
      // }
    },
    methods:{
      communityFocus(){
        this.showPopup=true;
        this.$nextTick(()=>{   
          // this.$refs.inputs.focus();
        })
      },
      searchData(){
        const params={
          city:this.cityName[0],
          community_name : this.searchValue,
        }
        this.request(this.api.queryCommunityAPI, JSON.stringify(params),'post','application/json').then(res => {
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
        if(!this.bind_type_name){
            this.$vux.toast.text('请填写家庭成员关系', 'bottom');
            return;
        }
        if(!this.member_name){
            this.$vux.toast.text('请填写成员姓名', 'bottom');
            return;
        }
        // if(!/^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(this.personnel_phone)){
        //   this.$vux.toast.text('请填写正确的手机号', 'bottom');
        //   return;
        // }
        const params={
          bind_type_name:this.bind_type_name,
          member_name:this.member_name,
          member_phone:this.member_phone
        }
        this.request(this.api.addCommunityGridMemberAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            window.localStorage.setItem('data',JSON.stringify(res.data));
            window.localStorage.setItem('counts',JSON.stringify(res.data.counts));
            this.$vux.toast.text('添加成功！', 'bottom')
            this.$go('/gridCommunityMemberList');
          }else{
            this.$vux.toast.text(res.msg, 'bottom')
          }
        });
      },
    }

    

  };
</script>

<style lang="less">
  #gridCommunityMemberMaintain{
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
              height: 52px;
              line-height: 52px;
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

