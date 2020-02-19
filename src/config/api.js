/**
 * 社区
 */
export const communityLoginAPI = '/community/login';  // 社区登录接口
export const communityRegisteredAPI = '/community/registered'; // 社区信息录入接口
export const queryCommunityAPI='/community/queryCommunity'; // 模糊搜索社区名字
export const addRecordAPI = '/community/addRecord'; // 提交健康报告
export const queryRecordAPI='/community/queryRecord'; // 查询楼栋单元某天填报记录
export const queryBuildingAPI='/community/queryBuilding'; // 根据社区查楼栋
export const queryMonthReportAPI='/community/queryMonthReport'; // 根据楼栋单元某天填报统计
export const queryRecordInfoAPI='/community/queryRecordInfo'; // 查询社区个人健康日志

/**
 * 公司
 */
export const companyLoginAPI = '/company/login';  // 公司登录接口
export const companyRegisteredAPI = '/company/registered'; // 公司信息录入接口
export const queryCompanyAPI='/company/queryCompany'; // 模糊搜索公司名字
export const addCompanyPersonRecordAPI = '/company/addRecord'; // 提交公司个人健康报告
export const queryCompanyRecordAPI='/company/queryRecord'; // 查询公司的填报记录
export const queryCompanyMonthReportAPI='/company/queryMonthReport'; // 查询公司的统计报表
export const queryCompanyRecordInfoAPI='/company/queryRecordInfo'; // 查询公司个人健康日志
export const queryCompanyAreaReportAPI='/company/queryAreaReport'; // 查询员工所在区域的数据
/**
 * 网格社区
 */

export const communityGridLoginAPI = '/communitygrid/login';  // 网格社区登录接口
export const communityGridRegisteredAPI = '/communitygrid/registered'; // 网格社区个人信息录入接口
export const communityGridQueryPersonelInfoAPI='/communitygrid/getOwner'; // 根据手机号获取家庭责任人的信息
export const queryCommunityGridCommunityAPI='/communitygrid/queryCommunity'; // 模糊搜索社区名字
export const addCommunityGridRecordAPI = '/communitygrid/addRecord'; // 提交网格社区个人健康报告
export const queryCommunityGridRecordAPI='/communitygrid/queryRecord'; // 查询社区网格的填报记录
export const addCommunityGridMemberAPI='/communitygrid/addMember'; // 添加家庭成员
export const delCommunityGridMemberAPI='/communitygrid/delMember'; // 删除家庭成员
export const editCommunityGridPersonnelAPI='/communitygrid/editPersonnel'; // 网格社区个人信息修改接口