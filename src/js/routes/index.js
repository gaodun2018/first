import Entry from '../containers/Entry.vue';
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
// 财经云
const Home = resolve => {
    require.ensure(['../containers/Home.vue'], (require) => {
        resolve(require('../containers/Home.vue'))
    },'Home')
}
// 编辑课程大纲
const CourseOutline = resolve => {
    require.ensure(['../components/CourseOutlineManage/CourseOutline.vue'], (require) => {
        resolve(require('../components/CourseOutlineManage/CourseOutline.vue'))
    },'CourseOutline')
}
// 课程大纲模块
const CourseModule = resolve => {
    require.ensure(['../components/CourseOutlineManage/CourseModule.vue'], (require) => {
        resolve(require('../components/CourseOutlineManage/CourseModule.vue'))
    },'CourseModule')
}
// 课程基本设置
const CourseSet = resolve => {
    require.ensure(['../components/CourseManage/CourseSet.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseSet.vue'))
    },'CourseSet')
}
// 课程内容
const CourseContent = resolve => {
    require.ensure(['../components/CourseManage/CourseContent.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseContent.vue'))
    },'CourseContent')
}
// 新增视频
const AddVideo = resolve => {
    require.ensure(['../components/resourceCenter/AddVideo.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddVideo.vue'))
    },'AddVideo')
}
// 编辑视频
const AddVideo1 = resolve => {
    require.ensure(['../components/resourceCenter/AddVideo.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddVideo.vue'))
    },'AddVideo1')
}
// 新增讲义
const AddHandout = resolve => {
    require.ensure(['../components/resourceCenter/AddHandout.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddHandout.vue'))
    },'AddHandout')
}
// 新增知识点
const AddKnowledge = resolve => {
    require.ensure(['../components/resourceCenter/AddKnowledge.vue'], (require) => {
        resolve(require('../components/resourceCenter/AddKnowledge.vue'))
    },'AddKnowledge')
}
// 编辑知识点
const EditKnowledge = resolve => {
    require.ensure(['../components/resourceCenter/EditKnowledge.vue'], (require) => {
        resolve(require('../components/resourceCenter/EditKnowledge.vue'))
    },'EditKnowledge')
}
// EP课程学习数据统计
const EducationalClass = resolve => {
    require.ensure(['../containers/EducationalClass.vue'], (require) => {
        resolve(require('../containers/EducationalClass.vue'))
    },'EducationalClass')
}
// EP定制标杆计划
const CustomizedPlan = resolve => {
    require.ensure(['../containers/CustomizedPlan.vue'], (require) => {
        resolve(require('../containers/CustomizedPlan.vue'))
    },'CustomizedPlan')
}
// EP选择标杆计划
const ChoosePlan = resolve => {
    require.ensure(['../containers/ChoosePlan.vue'], (require) => {
        resolve(require('../containers/ChoosePlan.vue'))
    },'ChoosePlan')
}
// 查看完整计划
const EducationalPlanAll = resolve => {
    require.ensure(['../containers/EducationalPlanAll.vue'], (require) => {
        resolve(require('../containers/EducationalPlanAll.vue'))
    },'EducationalPlanAll')
}
// 全部学员详情
const EducationalClasslist = resolve => {
    require.ensure(['../containers/EducationalClasslist.vue'], (require) => {
        resolve(require('../containers/EducationalClasslist.vue'))
    },'EducationalClasslist')
}


export const routes = [
	{ path: '/', name:'5500',component: Entry ,redirect: '/login',children: [
		{ path: '/CourseOutlineManage/CourseOutline/:sid',meta:{ title:'编辑课程大纲' }, name:'10004',component: CourseOutline }, // 编辑课程大纲
		{ path: '/CourseOutlineManage/CourseModule/:sid',meta:{ title:'课程大纲模块' }, name:'10005',component: CourseModule }, // 课程大纲模块
		{ path: '/CourseSet/:cid',meta:{ title:'课程基本设置' }, name:'10006',component: CourseSet }, // 课程基本设置
		{ path: '/CourseContent/:cid',meta:{ title:'课程内容' }, name:'10007',component: CourseContent }, // 课程内容
		{ path: '/resource/video/create',meta:{ title:'新增视频' }, name:'10008',component: AddVideo }, // 新增视频
		{ path: '/resource/video/edit/:id',meta:{ title:'编辑视频' }, name:'10009',component: AddVideo1 }, // 编辑视频
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