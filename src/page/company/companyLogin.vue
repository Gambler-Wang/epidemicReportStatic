<template>
  <div id="companyLogin">

  </div>
</template>

<script>
  import { wxApi}  from '../../utils/weixin';
  import {XInput, Group ,XButton} from 'vux';

  export default {
    name: 'companyLogin',
    components: {
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        currentLocation:window.location.protocol+'//'+window.location.host+'/healthlog/html',
        // rooms:[{
        //   building: {
        //       building: 1,
        //       building_id: "d2465275304d4291aa44b928f6a9c6bd",
        //       community_id: "d1d6b9980fdc4aef87bd4c2ff21f7d87",
        //       unit: 2,
        //     },
        //     community: {
        //       community_id: "d1d6b9980fdc4aef87bd4c2ff21f7d87", 
        //       community_name: "测试小区",
        //     },
        //     room: {
        //       room_id: "1a20355d73974a4d8232f80f0f7f5968", 
        //       building_id: "d2465275304d4291aa44b928f6a9c6bd",
        //       personnel_id: "0cedc31be7db4e919a1a4bcb9238a45f",
        //       room_id: "1a20355d73974a4d8232f80f0f7f5968",
        //       room_number: 2
        //     }
        // }]
      }
    },
    created(){
      // this.setCookie('token','oHKlXwD9EmYYyc4imcvT5-66i2PE', 7);
      // this.setCookie('personnel_id','0cedc31be7db4e919a1a4bcb9238a45f', 7);
      // this.setCookie('personnel_name','用户-xlkfl1tf', 7);
      // window.localStorage.setItem('counts',JSON.stringify(11));
      // window.localStorage.setItem('rooms',JSON.stringify(this.rooms));
      // this.$go('/surverSystem'); // 社区录入页

      // if(this.getCookie('token')){
      //     this.$go('/historyPage');
      //     return
      // }
      if(wxApi.getUrlParams().code!=undefined){
        this.login(wxApi.getUrlParams().code)
        return
      }
      const redirect_uri = this.currentLocation + "/#/companyLogin";
      wxApi.author(redirect_uri)
      // this.login(wxApi.getUrlParams().code)
    },
    methods:{
      login(code){
        let params={
          code:code
        }
        this.request(this.api.companyLoginAPI, JSON.stringify(params),'post','application/json').then(res => {
          if(res.code==200){
            this.setCookie('token',res.data.token, 7);
            this.setCookie('personnel_id',res.data.personnel.personnel_id, 7);
            this.setCookie('personnel_name',res.data.personnel.personnel_name, 7);
            this.setCookie('company_id',res.data.personnel.company_id, 7);
            window.localStorage.setItem('company',JSON.stringify(res.data.company));
            window.localStorage.setItem('atarea',JSON.stringify(res.data.atarea));
            window.localStorage.setItem('counts',JSON.stringify(res.data.counts));
            if(res.data.registered== 0){
              this.$go('/companySurveySystem'); // 录入页
            }else if(res.data.registered== 1){
              this.$go('/companySurveyForm'); // 表单页
            }
          }else if(res.code==10002){
              this.$go('/companySurveyForm'); 
          }
        });
      }
    }

  };
</script>

<style lang="less">
  #companyLogin{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>

