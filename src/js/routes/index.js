import Entry from '../containers/Entry.vue';
// 资源列表
import ResourceTag from '../components/resourceCenter/ResourceTag.vue';
// 视频列表
import VideoList from '../components/resourceCenter/VideoList.vue';
// 题目列表
import ExerciseList from '../components/resourceCenter/ExerciseList.vue';
// 讲义列表
import HandoutList from '../components/resourceCenter/HandoutList.vue';
// 知识点汇总
import KnowledgeList from '../components/resourceCenter/KnowledgeList.vue';
// 考试大纲
import ExaminationSyllabus from '../components/resourceCenter/ExaminationSyllabus.vue';
// 课程列表
import CourseList from '../components/CourseManage/CourseList.vue';
// 课程大纲列表
import CourseOutlineList from '../components/CourseOutlineManage/CourseOutlineList.vue';
// 登陆
import Login from '../containers/Login.vue';
// 404
import Page404 from '../components/Page404.vue';
// 修改密码
import UpdatePwd from '../containers/UpdatePwd.vue';
// 财经云
import Home from '../containers/Home.vue';
// 编辑课程大纲
import CourseOutline from '../components/CourseOutlineManage/CourseOutline.vue';
// 课程大纲模块
import CourseModule from '../components/CourseOutlineManage/CourseModule.vue';
// 课程基本设置
import CourseSet from '../components/CourseManage/CourseSet.vue';
// 课程内容
import CourseContent from '../components/CourseManage/CourseContent.vue';
// 新增视频
import EditVideo from '../components/resourceCenter/AddVideo.vue';
// 编辑视频
import AddVideo from '../components/resourceCenter/AddVideo.vue';
// 新增讲义
import AddHandout from '../components/resourceCenter/AddHandout.vue';
// 新增知识点
import AddKnowledge from '../components/resourceCenter/AddKnowledge.vue';
// 编辑知识点
import EditKnowledge from '../components/resourceCenter/EditKnowledge.vue';
// EP课程学习数据统计
import EducationalClass from '../containers/EducationalClass.vue';
// EP定制标杆计划
import CustomizedPlan from '../containers/CustomizedPlan.vue';
// EP选择标杆计划
import ChoosePlan from '../containers/ChoosePlan.vue';
// 查看完整计划
import EducationalPlanAll from '../containers/EducationalPlanAll.vue';
// 全部学员详情
import EducationalClasslist from '../containers/EducationalClasslist.vue';


export const routes = [
	{ path: '/', name:'5500',component: Entry ,redirect: '/login',children: [
		{ path: '/ResourceTag',meta:{ title:'资源列表' }, name:'850',component: ResourceTag }, // 资源列表
		{ path: '/VideoList',meta:{ title:'视频列表' }, name:'852',component: VideoList }, // 视频列表
		{ path: '/ExerciseList',meta:{ title:'题目列表' }, name:'856',component: ExerciseList }, // 题目列表
		{ path: '/HandoutList',meta:{ title:'讲义列表' }, name:'857',component: HandoutList }, // 讲义列表
		{ path: '/KnowledgeList',meta:{ title:'知识点汇总' }, name:'858',component: KnowledgeList }, // 知识点汇总
		{ path: '/ExaminationSyllabus',meta:{ title:'考试大纲' }, name:'859',component: ExaminationSyllabus }, // 考试大纲
		{ path: '/CourseList',meta:{ title:'课程列表' }, name:'861',component: CourseList }, // 课程列表
		{ path: '/CourseOutlineList',meta:{ title:'课程大纲列表' }, name:'863',component: CourseOutlineList }, // 课程大纲列表
		{ path: '/CourseOutlineManage/CourseOutline/:sid',meta:{ title:'编辑课程大纲' }, name:'10004',component: CourseOutline }, // 编辑课程大纲
		{ path: '/CourseOutlineManage/CourseModule/:sid',meta:{ title:'课程大纲模块' }, name:'10005',component: CourseModule }, // 课程大纲模块
		{ path: '/CourseSet/:cid',meta:{ title:'课程基本设置' }, name:'10006',component: CourseSet }, // 课程基本设置
		{ path: '/CourseContent/:cid',meta:{ title:'课程内容' }, name:'10007',component: CourseContent }, // 课程内容
		{ path: '/resource/video/create',meta:{ title:'新增视频' }, name:'10008',component: AddVideo }, // 新增视频
		{ path: '/resource/video/edit/:id',meta:{ title:'编辑视频' }, name:'10009',component: EditVideo }, // 编辑视频
		{ path: '/addHandout',meta:{ title:'新增讲义' }, name:'10009',component: AddHandout }, // 新增讲义
		{ path: '/addKnowledge',meta:{ title:'新增知识点' }, name:'10010',component: AddKnowledge }, // 新增知识点
		{ path: '/editKnowledge',meta:{ title:'编辑知识点' }, name:'10011',component: EditKnowledge }, // 编辑知识点
	]},
	{ path: '/login',meta:{ title:'登陆' }, name:'10000',component: Login }, // 登陆
	{ path: '*',meta:{ title:'404' }, name:'10001',component: Page404 }, // 404
	{ path: '/updatePwd',meta:{ title:'修改密码' }, name:'10002',component: UpdatePwd }, // 修改密码
	{ path: '/home',meta:{ title:'财经云' }, name:'10003',component: Home }, // 财经云
	{ path: '/EducationalClass/:cid/:sid',meta:{ title:'EP课程学习数据统计' }, name:'10012',component: EducationalClass }, // EP课程学习数据统计
	{ path: '/customizedPlan/:cid/:clid',meta:{ title:'EP定制标杆计划' }, name:'10013',component: CustomizedPlan }, // EP定制标杆计划
	{ path: '/choosePlan/:cid/:clid',meta:{ title:'EP选择标杆计划' }, name:'10014',component: ChoosePlan }, // EP选择标杆计划
	{ path: '/EducationalPlanAll/:cid/:clid/:tabnum',meta:{ title:'查看完整计划' }, name:'10015',component: EducationalPlanAll }, // 查看完整计划
	{ path: '/EducationalClasslist/:cid/:clid/',meta:{ title:'全部学员详情' }, name:'10016',component: EducationalClasslist }, // 全部学员详情
]