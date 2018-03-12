import Entry from '../containers/Entry.vue';

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
		{ path: '/ResourceTag',meta:{ title:'资源列表' }, name:'500',component: ResourceTag }, // 资源列表
		{ path: '/VideoList',meta:{ title:'视频列表' }, name:'510',component: VideoList }, // 视频列表
		{ path: '/ExerciseList',meta:{ title:'题目列表' }, name:'520',component: ExerciseList }, // 题目列表
		{ path: '/HandoutList',meta:{ title:'讲义列表' }, name:'530',component: HandoutList }, // 讲义列表
		{ path: '/KnowledgeList',meta:{ title:'知识点汇总' }, name:'540',component: KnowledgeList }, // 知识点汇总
		{ path: '/ExaminationSyllabus',meta:{ title:'考试大纲' }, name:'541',component: ExaminationSyllabus }, // 考试大纲
		{ path: '/CourseList',meta:{ title:'课程列表' }, name:'80',component: CourseList }, // 课程列表
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