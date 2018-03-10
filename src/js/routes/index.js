import Entry from '../containers/Entry.vue';
// 面板详情
const HomeIndex = resolve => {
    require.ensure(['../components/home/HomeIndex.vue'], (require) => {
        resolve(require('../components/home/HomeIndex.vue'))
    },'HomeIndex')
}
// 用户管理
const UserManagement = resolve => {
    require.ensure(['../components/userPermission/UserManagement.vue'], (require) => {
        resolve(require('../components/userPermission/UserManagement.vue'))
    },'UserManagement')
}
// 组织管理
const OrganizationalManagement = resolve => {
    require.ensure(['../components/userPermission/OrganizationalManagement.vue'], (require) => {
        resolve(require('../components/userPermission/OrganizationalManagement.vue'))
    },'OrganizationalManagement')
}
// 功能管理
const FunctionManagement = resolve => {
    require.ensure(['../components/userPermission/FunctionManagement.vue'], (require) => {
        resolve(require('../components/userPermission/FunctionManagement.vue'))
    },'FunctionManagement')
}
// 角色管理
const RoleManagement = resolve => {
    require.ensure(['../components/userPermission/RoleManagement.vue'], (require) => {
        resolve(require('../components/userPermission/RoleManagement.vue'))
    },'RoleManagement')
}
// 权限分配
const PermissionAssignment = resolve => {
    require.ensure(['../components/userPermission/PermissionAssignment.vue'], (require) => {
        resolve(require('../components/userPermission/PermissionAssignment.vue'))
    },'PermissionAssignment')
}
// 学员列表
const StudentList = resolve => {
    require.ensure(['../components/educationManage/StudentList.vue'], (require) => {
        resolve(require('../components/educationManage/StudentList.vue'))
    },'StudentList')
}
// 班级管理
const ClassManage = resolve => {
    require.ensure(['../components/educationManage/ClassManage.vue'], (require) => {
        resolve(require('../components/educationManage/ClassManage.vue'))
    },'ClassManage')
}
// 我的统计
const MyStats = resolve => {
    require.ensure(['../components/answeringService/MyStats.vue'], (require) => {
        resolve(require('../components/answeringService/MyStats.vue'))
    },'MyStats')
}
// 项目统计
const ProjectStatistics = resolve => {
    require.ensure(['../components/answeringService/ProjectStatistics.vue'], (require) => {
        resolve(require('../components/answeringService/ProjectStatistics.vue'))
    },'ProjectStatistics')
}
// 答疑排名
const AnswerRanking = resolve => {
    require.ensure(['../components/answeringService/AnswerRanking.vue'], (require) => {
        resolve(require('../components/answeringService/AnswerRanking.vue'))
    },'AnswerRanking')
}
// 我的问题
const MyQuestion = resolve => {
    require.ensure(['../components/answeringService/MyQuestion.vue'], (require) => {
        resolve(require('../components/answeringService/MyQuestion.vue'))
    },'MyQuestion')
}
// 所有问题
const AllQuestion = resolve => {
    require.ensure(['../components/answeringService/AllQuestion.vue'], (require) => {
        resolve(require('../components/answeringService/AllQuestion.vue'))
    },'AllQuestion')
}
// 操作日志
const AnsOperationLog = resolve => {
    require.ensure(['../components/answeringService/AnsOperationLog.vue'], (require) => {
        resolve(require('../components/answeringService/AnsOperationLog.vue'))
    },'AnsOperationLog')
}
// 资源列表
const ResourceTag = resolve => {
    require.ensure(['../components/resourceCenter/ResourceTag.vue'], (require) => {
        resolve(require('../components/resourceCenter/ResourceTag.vue'))
    },'ResourceTag')
}
// 视频列表
const VideoList = resolve => {
    require.ensure(['../components/resourceCenter/VideoList.vue'], (require) => {
        resolve(require('../components/resourceCenter/VideoList.vue'))
    },'VideoList')
}
// 题目列表
const ExerciseList = resolve => {
    require.ensure(['../components/resourceCenter/ExerciseList.vue'], (require) => {
        resolve(require('../components/resourceCenter/ExerciseList.vue'))
    },'ExerciseList')
}
// 讲义列表
const HandoutList = resolve => {
    require.ensure(['../components/resourceCenter/HandoutList.vue'], (require) => {
        resolve(require('../components/resourceCenter/HandoutList.vue'))
    },'HandoutList')
}
// 知识点汇总
const KnowledgeList = resolve => {
    require.ensure(['../components/resourceCenter/KnowledgeList.vue'], (require) => {
        resolve(require('../components/resourceCenter/KnowledgeList.vue'))
    },'KnowledgeList')
}
// 考试大纲
const ExaminationSyllabus = resolve => {
    require.ensure(['../components/resourceCenter/ExaminationSyllabus.vue'], (require) => {
        resolve(require('../components/resourceCenter/ExaminationSyllabus.vue'))
    },'ExaminationSyllabus')
}
// 课程列表
const CourseList = resolve => {
    require.ensure(['../components/CourseManage/CourseList.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseList.vue'))
    },'CourseList')
}
// 产品列表
const ProjectList = resolve => {
    require.ensure(['../components/productManagement/ProjectList.vue'], (require) => {
        resolve(require('../components/productManagement/ProjectList.vue'))
    },'ProjectList')
}
// 统计分析
const StatisticAnalysis = resolve => {
    require.ensure(['../components/productManagement/StatisticAnalysis.vue'], (require) => {
        resolve(require('../components/productManagement/StatisticAnalysis.vue'))
    },'StatisticAnalysis')
}
// 专题列表
const ZhuantiList = resolve => {
    require.ensure(['../components/productManagement/ZhuantiList.vue'], (require) => {
        resolve(require('../components/productManagement/ZhuantiList.vue'))
    },'ZhuantiList')
}
// 商业列表
const BusinessList = resolve => {
    require.ensure(['../components/productManagement/BusinessList.vue'], (require) => {
        resolve(require('../components/productManagement/BusinessList.vue'))
    },'BusinessList')
}
// 班级列表
const ClassList = resolve => {
    require.ensure(['../components/ClassManageSys/ClassList.vue'], (require) => {
        resolve(require('../components/ClassManageSys/ClassList.vue'))
    },'ClassList')
}
// 学员列表
const StudentLista = resolve => {
    require.ensure(['../components/ClassManageSys/StudentLista.vue'], (require) => {
        resolve(require('../components/ClassManageSys/StudentLista.vue'))
    },'StudentLista')
}
// 课程列表
const CourseLista = resolve => {
    require.ensure(['../components/ClassManageSys/CourseLista.vue'], (require) => {
        resolve(require('../components/ClassManageSys/CourseLista.vue'))
    },'CourseLista')
}
// 登陆
const Login = resolve => {
    require.ensure(['../containers/Login.vue'], (require) => {
        resolve(require('../containers/Login.vue'))
    },'Login')
}
// 404
const Page404 = resolve => {
    require.ensure(['../components/Page404.vue'], (require) => {
        resolve(require('../components/Page404.vue'))
    },'Page404')
}
// 修改密码
const UpdatePwd = resolve => {
    require.ensure(['../containers/UpdatePwd.vue'], (require) => {
        resolve(require('../containers/UpdatePwd.vue'))
    },'UpdatePwd')
}
// - 财经云
const Home = resolve => {
    require.ensure(['../containers/Home.vue'], (require) => {
        resolve(require('../containers/Home.vue'))
    },'Home')
}
// 课程大纲管理
const CourseOutlineList = resolve => {
    require.ensure(['../components/CourseoutlineManage/CourseOutlineList.vue'], (require) => {
        resolve(require('../components/CourseoutlineManage/CourseOutlineList.vue'))
    },'CourseOutlineList')
}
// - 编辑课程大纲
const CourseOutline = resolve => {
    require.ensure(['../components/CourseOutlineManage/CourseOutline.vue'], (require) => {
        resolve(require('../components/CourseOutlineManage/CourseOutline.vue'))
    },'CourseOutline')
}
// - 课程大纲模块
const CourseModule = resolve => {
    require.ensure(['../components/CourseOutlineManage/CourseModule.vue'], (require) => {
        resolve(require('../components/CourseOutlineManage/CourseModule.vue'))
    },'CourseModule')
}
// - 课程基本设置
const CourseSet = resolve => {
    require.ensure(['../components/CourseManage/CourseSet.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseSet.vue'))
    },'CourseSet')
}
// - 课程内容
const CourseContent = resolve => {
    require.ensure(['../components/CourseManage/CourseContent.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseContent.vue'))
    },'CourseContent')
}
// - 新增视频
const AddVideo = resolve => {
    require.ensure(['../components/resourceCenter/AddVideo.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddVideo.vue'))
    },'AddVideo')
}
// - 编辑视频
const EditVideo = resolve => {
    require.ensure(['../components/resourceCenter/EditVideo.vue'], (require) => {
        resolve(require('../components/resourceCenter/EditVideo.vue'))
    },'EditVideo')
}
// - 新增讲义
const AddHandout = resolve => {
    require.ensure(['../components/resourceCenter/AddHandout.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddHandout.vue'))
    },'AddHandout')
}
// - 新增知识点
const AddKnowledge = resolve => {
    require.ensure(['../components/resourceCenter/AddKnowledge.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddKnowledge.vue'))
    },'AddKnowledge')
}
// - 编辑知识点
const EditKnowledge = resolve => {
    require.ensure(['../components/resourceCenter/EditKnowledge.vue'], (require) => {
        resolve(require('../components/resourceCenter/EditKnowledge.vue'))
    },'EditKnowledge')
}
// - EP课程学习数据统计
const EducationalClass = resolve => {
    require.ensure(['../containers/EducationalClass.vue'], (require) => {
        resolve(require('../containers/EducationalClass.vue'))
    },'EducationalClass')
}
// - EP定制标杆计划
const CustomizedPlan = resolve => {
    require.ensure(['../containers/CustomizedPlan.vue'], (require) => {
        resolve(require('../containers/CustomizedPlan.vue'))
    },'CustomizedPlan')
}
// - EP选择标杆计划
const ChoosePlan = resolve => {
    require.ensure(['../containers/ChoosePlan.vue'], (require) => {
        resolve(require('../containers/ChoosePlan.vue'))
    },'ChoosePlan')
}
// - 查看完整计划
const EducationalPlanAll = resolve => {
    require.ensure(['../containers/EducationalPlanAll.vue'], (require) => {
        resolve(require('../containers/EducationalPlanAll.vue'))
    },'EducationalPlanAll')
}
// - 全部学员详情
const EducationalClasslist = resolve => {
    require.ensure(['../containers/EducationalClasslist.vue'], (require) => {
        resolve(require('../containers/EducationalClasslist.vue'))
    },'EducationalClasslist')
}


export const routes = [
	{ path: '/', name:'5500',component: Entry ,redirect: '/login',children: [
		{ path: '/index',meta:{ title:'面板详情' }, name:'900',component: HomeIndex }, // 面板详情
		{ path: '/UserManagement',meta:{ title:'用户管理' }, name:'20',component: UserManagement }, // 用户管理
		{ path: '/OrganizationalManagement',meta:{ title:'组织管理' }, name:'21',component: OrganizationalManagement }, // 组织管理
		{ path: '/FunctionManagement',meta:{ title:'功能管理' }, name:'22',component: FunctionManagement }, // 功能管理
		{ path: '/RoleManagement',meta:{ title:'角色管理' }, name:'23',component: RoleManagement }, // 角色管理
		{ path: '/PermissionAssignment',meta:{ title:'权限分配' }, name:'24',component: PermissionAssignment }, // 权限分配
		{ path: '/StudentList',meta:{ title:'学员列表' }, name:'300',component: StudentList }, // 学员列表
		{ path: '/ClassManagement ',meta:{ title:'班级管理' }, name:'310',component: ClassManage }, // 班级管理
		{ path: '/MyStats',meta:{ title:'我的统计' }, name:'400',component: MyStats }, // 我的统计
		{ path: '/ProjectStatistics',meta:{ title:'项目统计' }, name:'401',component: ProjectStatistics }, // 项目统计
		{ path: '/AnswerRanking',meta:{ title:'答疑排名' }, name:'402',component: AnswerRanking }, // 答疑排名
		{ path: '/MyQuestion',meta:{ title:'我的问题' }, name:'410',component: MyQuestion }, // 我的问题
		{ path: '/AllQuestion',meta:{ title:'所有问题' }, name:'411',component: AllQuestion }, // 所有问题
		{ path: '/AnsOperationLog',meta:{ title:'操作日志' }, name:'420',component: AnsOperationLog }, // 操作日志
		{ path: '/ResourceTag',meta:{ title:'资源列表' }, name:'500',component: ResourceTag }, // 资源列表
		{ path: '/VideoList',meta:{ title:'视频列表' }, name:'510',component: VideoList }, // 视频列表
		{ path: '/ExerciseList',meta:{ title:'题目列表' }, name:'520',component: ExerciseList }, // 题目列表
		{ path: '/HandoutList',meta:{ title:'讲义列表' }, name:'530',component: HandoutList }, // 讲义列表
		{ path: '/KnowledgeList',meta:{ title:'知识点汇总' }, name:'540',component: KnowledgeList }, // 知识点汇总
		{ path: '/ExaminationSyllabus',meta:{ title:'考试大纲' }, name:'541',component: ExaminationSyllabus }, // 考试大纲
		{ path: '/CourseList',meta:{ title:'课程列表' }, name:'80',component: CourseList }, // 课程列表
		{ path: '/ProjectList',meta:{ title:'产品列表' }, name:'600',component: ProjectList }, // 产品列表
		{ path: '/StatisticAnalysis',meta:{ title:'统计分析' }, name:'601',component: StatisticAnalysis }, // 统计分析
		{ path: '/ZhuantiList',meta:{ title:'专题列表' }, name:'610',component: ZhuantiList }, // 专题列表
		{ path: '/BusinessList',meta:{ title:'商业列表' }, name:'620',component: BusinessList }, // 商业列表
		{ path: '/ClassList',meta:{ title:'班级列表' }, name:'16',component: ClassList }, // 班级列表
		{ path: '/StudentLista',meta:{ title:'学员列表' }, name:'17',component: StudentLista }, // 学员列表
		{ path: '/CourseLista',meta:{ title:'课程列表' }, name:'18',component: CourseLista }, // 课程列表
		{ path: '/CourseOutlineList',meta:{ title:'课程大纲管理' }, name:'10',component: CourseOutlineList }, // 课程大纲管理
		{ path: '/CourseOutlineManage/CourseOutline/:sid',meta:{ title:'- 编辑课程大纲' }, name:'10000',component: CourseOutline }, // - 编辑课程大纲
		{ path: '/CourseOutlineManage/CourseModule/:sid',meta:{ title:'- 课程大纲模块' }, name:'10000',component: CourseModule }, // - 课程大纲模块
		{ path: '/CourseSet/:cid',meta:{ title:'- 课程基本设置' }, name:'10000',component: CourseSet }, // - 课程基本设置
		{ path: '/CourseContent/:cid',meta:{ title:'- 课程内容' }, name:'10000',component: CourseContent }, // - 课程内容
		{ path: '/resource/video/create',meta:{ title:'- 新增视频' }, name:'10000',component: AddVideo }, // - 新增视频
		{ path: '/resource/video/:id/edit',meta:{ title:'- 编辑视频' }, name:'editVideo',component: EditVideo }, // - 编辑视频
		{ path: '/addHandout',meta:{ title:'- 新增讲义' }, name:'10000',component: AddHandout }, // - 新增讲义
		{ path: '/addKnowledge',meta:{ title:'- 新增知识点' }, name:'10000',component: AddKnowledge }, // - 新增知识点
		{ path: '/editKnowledge',meta:{ title:'- 编辑知识点' }, name:'10000',component: EditKnowledge }, // - 编辑知识点
	]},
	{ path: '/login',meta:{ title:'登陆' }, name:'10000',component: Login }, // 登陆
	{ path: '*',meta:{ title:'404' }, name:'10009',component: Page404 }, // 404
	{ path: '/updatePwd',meta:{ title:'修改密码' }, name:'10001',component: UpdatePwd }, // 修改密码
	{ path: '/home',meta:{ title:'- 财经云' }, name:'10000',component: Home }, // - 财经云
	{ path: '/EducationalClass/:cid/:sid',meta:{ title:'- EP课程学习数据统计' }, name:'10000',component: EducationalClass }, // - EP课程学习数据统计
	{ path: '/customizedPlan/:cid/:clid',meta:{ title:'- EP定制标杆计划' }, name:'10000',component: CustomizedPlan }, // - EP定制标杆计划
	{ path: '/choosePlan/:cid/:clid',meta:{ title:'- EP选择标杆计划' }, name:'10000',component: ChoosePlan }, // - EP选择标杆计划
	{ path: '/EducationalPlanAll/:cid/:clid/:tabnum',meta:{ title:'- 查看完整计划' }, name:'10000',component: EducationalPlanAll }, // - 查看完整计划
	{ path: '/EducationalClasslist/:cid/:clid/',meta:{ title:'- 全部学员详情' }, name:'10000',component: EducationalClasslist }, // - 全部学员详情
]