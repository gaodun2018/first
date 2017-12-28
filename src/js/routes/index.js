import Entry from '../containers/Entry.vue';
// 面板详情
import HomeIndex from '../components/home/HomeIndex.vue';
// 用户管理
import UserManagement from '../components/userPermission/UserManagement.vue';
// 组织管理
import OrganizationalManagement from '../components/userPermission/OrganizationalManagement.vue';
// 功能管理
import FunctionManagement from '../components/userPermission/FunctionManagement.vue';
// 角色管理
import RoleManagement from '../components/userPermission/RoleManagement.vue';
// 权限分配
import PermissionAssignment from '../components/userPermission/PermissionAssignment.vue';
// 学员列表
import StudentList from '../components/educationManage/StudentList.vue';
// 班级管理
import ClassManage from '../components/educationManage/ClassManage.vue';
// 我的统计
import MyStats from '../components/answeringService/MyStats.vue';
// 项目统计
import ProjectStatistics from '../components/answeringService/ProjectStatistics.vue';
// 答疑排名
import AnswerRanking from '../components/answeringService/AnswerRanking.vue';
// 我的问题
import MyQuestion from '../components/answeringService/MyQuestion.vue';
// 所有问题
import AllQuestion from '../components/answeringService/AllQuestion.vue';
// 操作日志
import AnsOperationLog from '../components/answeringService/AnsOperationLog.vue';
// 资源列表
import ResourceTag from '../components/resourceCenter/ResourceTag.vue';
// 视频列表
import VideoList from '../components/resourceCenter/VideoList.vue';
// 题目列表
import ExerciseList from '../components/resourceCenter/ExerciseList.vue';
// 讲义列表
import HandoutList from '../components/resourceCenter/HandoutList.vue';
// 知识点列表
import KnowledgeList from '../components/resourceCenter/KnowledgeList.vue';
// 课程大纲列表
import CourseOutlineList from '../components/CourseoutlineManage/CourseOutlineList.vue';
// 课程列表
import CourseList from '../components/CourseManage/CourseList.vue';
// 产品列表
import ProjectList from '../components/productManagement/ProjectList.vue';
// 统计分析
import StatisticAnalysis from '../components/productManagement/StatisticAnalysis.vue';
// 专题列表
import ZhuantiList from '../components/productManagement/ZhuantiList.vue';
// 商业列表
import BusinessList from '../components/productManagement/BusinessList.vue';
// 登陆
import Login from '../containers/Login.vue';
// 404
import Page404 from '../components/Page404.vue';
// 修改密码
import UpdatePwd from '../containers/UpdatePwd.vue';
// - 财经云
import Home from '../containers/Home.vue';
// - 编辑课程大纲
import CourseOutline from '../components/CourseoutlineManage/CourseOutline.vue';
// - 课程大纲模块
import CourseModule from '../components/CourseoutlineManage/CourseModule.vue';
// - 课程基本设置
import CourseSet from '../components/CourseManage/CourseSet.vue';
// - 课程内容
import CourseContent from '../components/CourseManage/CourseContent.vue';
// - 新增视频
import AddVideo from '../components/resourceCenter/AddVideo.vue';
// - 新增讲义
import AddHandout from '../components/resourceCenter/AddHandout.vue';


export const routes = [
	{ path: '/', name:'5500',component: Entry ,redirect: '/home',children: [
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
		{ path: '/KnowledgeList',meta:{ title:'知识点列表' }, name:'540',component: KnowledgeList }, // 知识点列表
		{ path: '/CourseOutlineList',meta:{ title:'课程大纲列表' }, name:'10',component: CourseOutlineList }, // 课程大纲列表
		{ path: '/CourseList',meta:{ title:'课程列表' }, name:'80',component: CourseList }, // 课程列表
		{ path: '/ProjectList',meta:{ title:'产品列表' }, name:'600',component: ProjectList }, // 产品列表
		{ path: '/StatisticAnalysis',meta:{ title:'统计分析' }, name:'601',component: StatisticAnalysis }, // 统计分析
		{ path: '/ZhuantiList',meta:{ title:'专题列表' }, name:'610',component: ZhuantiList }, // 专题列表
		{ path: '/BusinessList',meta:{ title:'商业列表' }, name:'620',component: BusinessList }, // 商业列表
		{ path: '/CourseoutlineManage/CourseOutline/:sid',meta:{ title:'- 编辑课程大纲' }, name:'10000',component: CourseOutline }, // - 编辑课程大纲
		{ path: '/CourseoutlineManage/CourseModule/:sid',meta:{ title:'- 课程大纲模块' }, name:'10000',component: CourseModule }, // - 课程大纲模块
		{ path: '/CourseSet',meta:{ title:'- 课程基本设置' }, name:'10000',component: CourseSet }, // - 课程基本设置
		{ path: '/CourseContent',meta:{ title:'- 课程内容' }, name:'10000',component: CourseContent }, // - 课程内容
		{ path: '/addVideo',meta:{ title:'- 新增视频' }, name:'10000',component: AddVideo }, // - 新增视频
		{ path: '/addHandout',meta:{ title:'- 新增讲义' }, name:'10000',component: AddHandout }, // - 新增讲义
	]},
	{ path: '/login',meta:{ title:'登陆' }, name:'10000',component: Login }, // 登陆
	{ path: '*',meta:{ title:'404' }, name:'10009',component: Page404 }, // 404
	{ path: '/updatePwd',meta:{ title:'修改密码' }, name:'10001',component: UpdatePwd }, // 修改密码
	{ path: '/home',meta:{ title:'- 财经云' }, name:'10000',component: Home }, // - 财经云
]