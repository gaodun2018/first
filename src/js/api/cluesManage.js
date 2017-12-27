import {
    post,
    get
} from '../util/crmAxios';
import {
    Message
} from 'element-ui';
// 登录
export const login = () => post('/ProductCenter/GetProductList', {
    "Where": {
        "ProductName": "2017-ACCA"
    },
    "PageIndex": 1,
    "PageSize": 2,
    "OrderBy": "ProductID",
    "SortCol": ""
})

const objParam = {
    "Where": {

    },
    "PageIndex": 1,
    "PageSize": 2,
    "OrderBy": "ProductID",
    "SortCol": ""
}

//数据字典
export const GetDictionaryByTypeId = (objParam = {}) => {
    return get('/Dictionary/GetDictionaryByTypeId', objParam);
}

//创建邀约
export const CreateLiveRoom = (objParam = {}) => {
    return post('/ListenInvitation/CreateLiveRoom', objParam);
}

//重新邀约
export const ReInvite = (objParam = {}) => {
        return post('/ListenInvitation/ReInvite', objParam);
    }
    //取消邀约
export const ListenCancel = (objParam = {}) => {
    return post('/ListenInvitation/ListenCanle', objParam);
}

//统计试听数据
export const ListenStatisticsInfo = (objParam = {}) => {
    return post('/ListenInvitation/ListenStatisticsInfo', objParam);
}

//根据时间，试听方式，项目返回直播间列表
export const GetUserRoomList = (objParam = {}) => {
        return post('/ListenInvitation/GetUserLiveRoomList', objParam);
    }
    //试听模糊搜索
export const ListenVagueSeach = (objParam = {}) => {
        return post('ListenInvitation/ListenVagueSeach', objParam);
    }
    //获取直播详情
export const GetLiveRoomInfo = (objParam = {}) => {
        return post('ListenInvitation/GetLiveRoomInfo', objParam);
    }
    //获取试听课程列表
export const GetCourseExperience = (objParam = {}) => {
        return post('ListenInvitation/GetCourseExperience', objParam);
    }
    //获取试听账号
export const GetListenAccount = (objParam) => get("/ListenInvitation/GetListenAccount", objParam);

// 联系人新增或修改
export const getModifyContact = (objParam = {}) => {
        return post('ClueFollow/ModifyContact', objParam);
    }
    // 线索查询
    // 线索列表接口1
export const getGeClueBaseList = (objParam) => post('/Clue/GetClueBaseList', objParam);
// 线索列表接口2
// export const getGeClueMoreList = (objParam) => post('/Clue/GetClueMoreList', objParam);
export const getGeClueMoreList = (objParam) => post('/Clue/GetClueMoreListByGuids', objParam);

// 线索列表 分页
export const GetClueSearchCount = (objParam) => post('/Clue/GetClueSearchCount', objParam);
// 线索跟进
export const UpdateClueFollowInfo = (objParam) => post('/ClueFollow/UpdateClueFollowInfo', objParam);
// 线索联系
export const GetPersonContacts = (objParam) => get('/ClueFollow/GetPersonContacts', objParam);
// 线索信息
export const GetFollowClueInfo = (objParam) => get('/ClueFollow/GetFollowClueInfo', objParam);
// 沟通记
export const GetCommunicateRecords = (objParam) => get('/ClueFollow/GetCommunicateRecords', objParam);
// 区域信息
export const GetArea = () => get('/area/GetAreaWithCity', objParam);
// 学校查询
export const getSchools = (objParam) => get('/area/getSchools', objParam);
// 职业状
export const professionalStatus = (objParam) => get('Dictionary/GetDictionaryByTypeId?dicType=10006', objParam);
// 学历
export const RecordSchooling = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=10025', objParam);
// 感兴趣的项目
export const interestedProject = (objParam) => get('/DataStru/GetCurrentUserCourseTypeList', objParam);
//感兴趣项目 非权限验证
export const interestedProjectNoAuth = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=1602');
//  客户意向
export const intentionDegree = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=5044', objParam);
// 学员意向
export const IntentionStudents = () => get('/Dictionary/GetDictionaryByTypeId?dicType=10010', objParam);
//  线索状
export const cluesStatus = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=10021', objParam);
//  线索分配
export const Distribute = (objParam) => post('/ClueDistribute/Distribute', objParam);
//踢回公池
export const KickCluePool = (objParam) => post('/ClueDistribute/KickPool', objParam);
// 线索分配人员
export const GetAllowedUserTree = () => get('/DataStru/GetUserDepartmentTree', objParam);
//获取公池树
export const GetPublicPoolUser = () => get('/DataStru/GetDepartmentPublicUserTree', objParam);
//获取部门树
export const GetOrganizeTree = () => get('/DataStru/GetOrganizeTree', objParam);
//  线索新增
export const AddClueInfo = (objParam) => post('/Clue/AddClueInfo', objParam);
// 模糊查询
export const ClueVagueSeachList = (objParam) => post('/Clue/ClueVagueSeachList', objParam);
// 国家电话号码区号
export const GetCountryPhoneCodeList = () => post('/Area/GetCountryPhoneCodeList', objParam);
// 优质线索类型
export const OptimalCluesType = () => get('/Dictionary/GetDictionaryByTypeId?dicType=5043', objParam);
// 来源渠道
export const getchannels = () => get('/channel/getchannels', objParam);
// 线索导入
export const ImportClues = () => post('/ClueBatch/ImportClues', objParam);
// 电话
export const sendCall = (objParam) => post('/api/call/send_call', objParam);
// 共享线索
export const SearchShareClue = (objParam) => get('/ClueOwner/SearchShareClue', objParam);
//所属人查询
export const getClueOwner = (objParam) => get('/ClueOwner/SearchClueOwner', objParam);
// 销售线索跟进
export const GeCluFollowSeniorSearchList = (objParam) => post('/ClueFollow/GeCluFollowSeniorSearchList', objParam);
// 线索详情 紧急联系人
export const ClueDetail = (objParam) => get('/ClueInfo/ClueDetail', objParam);
// 线索详情 流转记录
export const ClueTurnRecords = (objParam) => get('/ClueRecords/ClueTurnRecords', objParam);
// 线索详情 重复咨询
export const RepeateConsult = (objParam) => get('/ClueInfo/RepeateConsult', objParam);
//试听记录
export const ListenInvitationRecords = (objParam) => get('/ClueRecords/ListenInvitationRecords', objParam);
// 通话记录
export const getPhoneRecords = (objParam) => get('/ClueRecords/PhoneRecords', objParam);
//带参数的所有城市或者省份
export const getProviceOrCity = (objParam) => get('/area/GetArea', objParam);
//线索分配规则新增
export const AddAllocation = (objParam) => post('/Allocation/AddAllocation', objParam);
//线索分配规则列表
export const GetAllocationRuleList = (objParam) => post('/Allocation/GetAllocationRuleList', objParam);
//线索分配规则编辑
export const EditAllocation = (objParam) => post('/Allocation/EditAllocation', objParam);
//线索分配删除
export const DisableAllocation = (objParam) => post('/Allocation/DisableAllocation', objParam);
//线索分配规则详情
export const GetAllocationRuleInfo = (objParam) => get('/Allocation/GetAllocationRuleInfo', objParam);
//快速搜索规则
export const GetQuickAllocationRuleList = (objParam) => post('/Allocation/GetQuickAllocationRuleList', objParam);
//获取当前登录用户的部门人员
export const GetUserDepartment = (objParam) => get('/UserInfo/GetUserDepartment', objParam);
// 线索跟进(线索类型)统计
export const GetClueFollowCountByClueQualityList = () => post('/ClueFollow/GetClueFollowCountByClueQualityList', objParam);
// 线索跟进模糊查询
export const ClueFollowVagueSeachList = (objParam) => post('/ClueFollow/ClueFollowVagueSeachList', objParam);

//线索回收列表
export const GetRecoveryRuleList = (objParam) => post('/Recovery/GetRecoveryRuleList', objParam);

//线索回收编辑
export const EditRecovery = (objParam) => post('/Recovery/EditRecovery', objParam);
//线索回收新增
export const AddRecovery = (objParam) => post('/Recovery/AddRecovery', objParam);
//线索回收禁用和停用
export const DeDisableRecovery = (objParam) => post('/Recovery/DeDisableRecovery', objParam);
//线索回收详情
export const GetRecoveryRuleInfo = (objParam) => get('/Recovery/GetRecoveryRuleInfo', objParam);
//线索快速查询
export const GetQuickRecoveryRuleList = (objParam) => post('/Recovery/GetQuickRecoveryRuleList', objParam);

//线索状态列表2
export const GetClueTypeEnumList = (objParam) => get('/DataStru/GetClueTypeEnumList', objParam);
//线索状态1
export const GetClueStatusTree = () => get('/Clue/GetClueStatusTree', objParam);

//获取所有部门下的人员和部门
export const GetDepartmentTree = (objParam) => get('DataStru/GetDepartmentTree', objParam);

//获取当前登录人所属部门下的人和部门
export const GetUserDepartmentTree = (objParam) => get('DataStru/GetUserDepartmentTree', objParam);

//分配类型条件列表
export const GetRangeFieldEnumList = () => get('DataStru/GetRangeFieldEnumList', objParam);
//分配对象
export const GetRationTypeEnumList = () => get('DataStru/GetRationTypeEnumList', objParam);
//分配条件包含，排除状态
export const GetContainStateEnumList = () => get('DataStru/GetContainStateEnumList', objParam);
//分配条件有效，停用状态
export const GetDataTypeEnumList = () => get('DataStru/GetDataTypeEnumList', objParam);
//获取人员id,上级部门id
export const GetUserDepartNode = (objParam) => get('UserInfo/GetUserDepartNode', objParam);
//获取试听列表
export const GetListenList = (objParam) => post('/ListenInvitation/GetListenList', objParam);
//营销计划
export const GetSourceDetailsTree = () => get('/Channel/GetSourceDetailsTree', objParam);
//客户来源
export const GetCustomerSourceTree = () => get('/Channel/GetCustomerSourceTree', objParam);
//客户来源
export const getValueSchools = (objParam) => get('/area/getValueSchools', objParam);
// 获取报名记录
export const GetOrderRecord = (objParam) => get('/ClueRecords/GetOrderRecord', objParam);
// 线索跟进数量
export const GetClueAllCount = (objParam) => get('/ClueRecords/GetClueAllCount', objParam);
// 推荐人搜索
export const GetRecommenderSearchList = (objParam) => get('/SalesManagement/GetRecommenderList', objParam);
// 是否共享线索
export const GetIsShareClueByClueGuid = (objParam) => post('/Clue/GetIsShareClueByClueGuid', objParam);
// 获取自定义列信息
export const GetBase_PageFieldConfig = (objParam) => get('/BasePageConfig/GetBase_PageFieldConfig', objParam);
// 新增自定义显示列
export const AddBase_PageFieldConfig = (objParam) => post('/BasePageConfig/AddBase_PageFieldConfig', objParam);
// 线索跟进页修改联系方式
export const getModifyCustom = (objParam) => post('/ClueFollow/ModifyCustom', objParam);
// 停用或启用一个分配规则
export const getDisableAllocation = (objParam) => post('/Allocation/DisableAllocation', objParam);
// 获取标签
export const GetLabelList = () => get('/Label/GetLabelList');
// 批量设置标签
const SetClueLabelParam = {
    LabelIdList: [],
    ClueGuidList: []
}
export const SetClueLabel = (SetClueLabelParam) => post('/Label/SetClueLabel', SetClueLabelParam);
// 根据线索guid列表获取关联标签
const ClueGuidList = []
export const GetClueLabelList = (ClueGuidList) => post('/Label/GetClueLabelList', ClueGuidList);
// 获取未读消息数量
export const GetUnreadMessageCount = () => get('/Message/GetUnreadMessageCount');
//根据线索guid获取全部的沟通记录
export const GetCommucinateContentList = clueGuid => get('/ClueOwner/GetCommucinateContentList', {
    clueGuid
});

//设置主号码
export const SetMainPhone = (objParam) => post('/ClueFollow/SetMainPhone', objParam);
//根据名称模糊查询协作人
export const GetAssociatesList = (objParam) => get('/UserInfo/GetAssociatesList', objParam);
// 线索管理列表
export const GetEsClueBaseList = (objParam) => post('/clue/GetEsClueBaseList', objParam);