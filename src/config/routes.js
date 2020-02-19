export default [
  {
    path: '/',
    name: '登录',
    component: () => import('@/page/login')
  },
  {
    path: '/nav',
    name: '导航',
    component: () => import('@/page/nav')
  },
  {
    path: '/login',
    name: '社区登录',
    component: () => import('@/page/login')
  },
  {
    path: '/surveySystem',
    name: '社区信息录入',
    meta:{
      title:'社区信息录入'
    },
    component: () => import('@/page/surveySystem')
  },
  {
    path: '/surveyForm',
    name: '健康日志填写',
    meta:{
      title:'健康日志填写'
    },
    component: () => import('@/page/surveyForm')
  },
  {
    path: '/personalInfo',
    name: '个人健康日志',
    meta:{
      title:'个人健康日志'
    },
    component: () => import('@/page/personalInfo')
  },
  {
    path: '/history',
    name: '健康日志查询',
    meta:{
      title:'健康日志查询'
    },
    component: () => import('@/page/history')
  },
  {
    path: '/historyStatic',
    name: '健康日志统计',
    meta:{
      title:'健康日志统计'
    },
    component: () => import('@/page/historyStatic')
  },
  // {
  //   path: '/statistics',
  //   name: '统计',
  //   component: () => import('@/page/statistics')
  // },
  {
    path: '/companyLogin',
    name: '公司登录',
    meta:{
      title:'公司登录'
    },
    component: () => import('@/page/company/companyLogin')
  },
  {
    path: '/companySurveySystem',
    name: '公司信息录入',
    meta:{
      title:'公司信息录入'
    },
    component: () => import('@/page/company/companySurveySystem')
  },
  {
    path: '/companySurveyForm',
    name: '健康日志填写',
    meta:{
      title:'健康日志填写'
    },
    component: () => import('@/page/company/companySurveyForm')
  },
  {
    path: '/companyHistory',
    name: '健康日志查询',
    meta:{
      title:'健康日志查询'
    },
    component: () => import('@/page/company/companyHistory')
  },
  {
    path: '/companyHistoryStatic',
    name: '健康日志统计',
    meta:{
      title:'健康日志统计'
    },
    component: () => import('@/page/company/companyHistoryStatic')
  },
  {
    path: '/companyPersonalInfo',
    name: '个人日志统计',
    meta:{
      title:'个人日志统计'
    },
    component: () => import('@/page/company/companyPersonalInfo')
  },


  // 网格社区
  {
    path: '/gridCommunityLogin',
    name: '网格社区登录',
    component: () => import('@/page/gridCommunity/gridCommunityLogin')
  },
  {
    path: '/gridCommunitySurveySystem',
    name: '居民健康日报注册',
    meta:{
      title:'居民健康日报注册'
    },
    component: () => import('@/page/gridCommunity/gridCommunitySurveySystem')
  },
  {
    path: '/gridCommunitySurveyForm',
    name: '居民健康日报填写',
    meta:{
      title:'居民健康日报填写'
    },
    component: () => import('@/page/gridCommunity/gridCommunitySurveyForm')
  },
  {
    path: '/gridCommunityPersonalInfo',
    name: '个人信息管理',
    meta:{
      title:'个人信息管理'
    },
    component: () => import('@/page/gridCommunity/gridCommunityPersonalInfo')
  },
  {
    path: '/gridCommunityMemberList',
    name: '家庭成员',
    meta:{
      title:'家庭成员'
    },
    component: () => import('@/page/gridCommunity/gridCommunityMemberList')
  },
  {
    path: '/gridCommunityPersonalEdit',
    name: '个人信息维护',
    meta:{
      title:'个人信息维护'
    },
    component: () => import('@/page/gridCommunity/gridCommunityPersonalEdit')
  },
  {
    path: '/gridCommunityMemberMaintain',
    name: '家庭成员信息维护',
    meta:{
      title:'家庭成员信息维护'
    },
    component: () => import('@/page/gridCommunity/gridCommunityMemberMaintain')
  },
  {
    path: '/gridCommunityHistory',
    name: '居民健康日报查询',
    meta:{
      title:'居民健康日报查询'
    },
    component: () => import('@/page/gridCommunity/gridCommunityHistory')
  },
  {
    path: '/gridCommunityHistoryStatic',
    name: '健康日志统计',
    meta:{
      title:'健康日志统计'
    },
    component: () => import('@/page/gridCommunity/gridCommunityHistoryStatic')
  },
];
