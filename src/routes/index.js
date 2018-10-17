import Entry from '../pages/Entry.vue';
// 课程列表
const CourseModuleList = resolve => {
    require.ensure(['../components/CourseManage/CourseModuleList.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseModuleList.vue'))
    },'CourseModuleList')
}
// 课程大纲列表
const SyllabusModuleList = resolve => {
    require.ensure(['../components/SyllabusManage/SyllabusModuleList.vue'], (require) => {
        resolve(require('../components/SyllabusManage/SyllabusModuleList.vue'))
    },'SyllabusModuleList')
}
// 视频列表
const resourceModuleVideoList = resolve => {
    require.ensure(['../components/resourceCenter/videoManage/resourceModuleVideoList.vue'], (require) => {
        resolve(require('../components/resourceCenter/videoManage/resourceModuleVideoList.vue'))
    },'resourceModuleVideoList')
}
// 讲义列表
const resourceModuleHandoutList = resolve => {
    require.ensure(['../components/resourceCenter/handoutManage/resourceModuleHandoutList.vue'], (require) => {
        resolve(require('../components/resourceCenter/handoutManage/resourceModuleHandoutList.vue'))
    },'resourceModuleHandoutList')
}
// 资源组列表
const resourceModuleResourceGroupList = resolve => {
    require.ensure(['../components/resourceCenter/resourceGroupManage/resourceModuleResourceGroupList.vue'], (require) => {
        resolve(require('../components/resourceCenter/resourceGroupManage/resourceModuleResourceGroupList.vue'))
    },'resourceModuleResourceGroupList')
}
// 登陆
const Login = resolve => {
    require.ensure(['../pages/Login.vue'], (require) => {
        resolve(require('../pages/Login.vue'))
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
    require.ensure(['../pages/UpdatePwd.vue'], (require) => {
        resolve(require('../pages/UpdatePwd.vue'))
    },'UpdatePwd')
}
// 财经云
const Home = resolve => {
    require.ensure(['../pages/Home.vue'], (require) => {
        resolve(require('../pages/Home.vue'))
    },'Home')
}
// 选择课程大纲模板
const SyllabusModuleOptTemplate = resolve => {
    require.ensure(['../components/SyllabusManage/SyllabusModuleOptTemplate.vue'], (require) => {
        resolve(require('../components/SyllabusManage/SyllabusModuleOptTemplate.vue'))
    },'SyllabusModuleOptTemplate')
}
// 编辑课程大纲
const SyllabusModuleEdit = resolve => {
    require.ensure(['../components/SyllabusManage/SyllabusModuleEdit.vue'], (require) => {
        resolve(require('../components/SyllabusManage/SyllabusModuleEdit.vue'))
    },'SyllabusModuleEdit')
}
// 课程基本设置
const CourseModuleBasicSet = resolve => {
    require.ensure(['../components/CourseManage/CourseModuleBasicSet.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseModuleBasicSet.vue'))
    },'CourseModuleBasicSet')
}
// 课程内容
const CourseModuleContentSet = resolve => {
    require.ensure(['../components/CourseManage/CourseModuleContentSet.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseModuleContentSet.vue'))
    },'CourseModuleContentSet')
}
// 新增视频
const resourceModuleVideoCreate = resolve => {
    require.ensure(['../components/resourceCenter/videoManage/resourceModuleVideoCreate.vue'], (require) => {
        resolve(require('../components/resourceCenter/videoManage/resourceModuleVideoCreate.vue'))
    },'resourceModuleVideoCreate')
}
// 编辑视频
const resourceModuleVideoEdit = resolve => {
    require.ensure(['../components/resourceCenter/videoManage/resourceModuleVideoEdit.vue'], (require) => {
        resolve(require('../components/resourceCenter/videoManage/resourceModuleVideoEdit.vue'))
    },'resourceModuleVideoEdit')
}
// 预览视频
const resourceModuleVideoPreview = resolve => {
    require.ensure(['../components/resourceCenter/videoManage/resourceModuleVideoPreview.vue'], (require) => {
        resolve(require('../components/resourceCenter/videoManage/resourceModuleVideoPreview.vue'))
    },'resourceModuleVideoPreview')
}
// 课中交互
const resourceModuleVideoInteractive = resolve => {
    require.ensure(['../components/resourceCenter/videoManage/resourceModuleVideoInteractive.vue'], (require) => {
        resolve(require('../components/resourceCenter/videoManage/resourceModuleVideoInteractive.vue'))
    },'resourceModuleVideoInteractive')
}
// 新增讲义
const resourceModuleHandoutCreate = resolve => {
    require.ensure(['../components/resourceCenter/handoutManage/resourceModuleHandoutCreate.vue'], (require) => {
        resolve(require('../components/resourceCenter/handoutManage/resourceModuleHandoutCreate.vue'))
    },'resourceModuleHandoutCreate')
}
// 编辑讲义
const resourceModuleHandoutEdit = resolve => {
    require.ensure(['../components/resourceCenter/handoutManage/resourceModuleHandoutEdit.vue'], (require) => {
        resolve(require('../components/resourceCenter/handoutManage/resourceModuleHandoutEdit.vue'))
    },'resourceModuleHandoutEdit')
}
// 新增资源组
const resourceModuleResourceGroupCreate = resolve => {
    require.ensure(['../components/resourceCenter/resourceGroupManage/resourceModuleResourceGroupCreate.vue'], (require) => {
        resolve(require('../components/resourceCenter/resourceGroupManage/resourceModuleResourceGroupCreate.vue'))
    },'resourceModuleResourceGroupCreate')
}
// 编辑资源组
const resourceModuleResourceGroupEdit = resolve => {
    require.ensure(['../components/resourceCenter/resourceGroupManage/resourceModuleResourceGroupEdit.vue'], (require) => {
        resolve(require('../components/resourceCenter/resourceGroupManage/resourceModuleResourceGroupEdit.vue'))
    },'resourceModuleResourceGroupEdit')
}
// 新增知识点
const resourceModuleKnowledgeCreate = resolve => {
    require.ensure(['../components/resourceCenter/resourceModuleKnowledgeCreate.vue'], (require) => {
        resolve(require('../components/resourceCenter/resourceModuleKnowledgeCreate.vue'))
    },'resourceModuleKnowledgeCreate')
}
// 编辑知识点
const resourceModuleKnowledgeEdit = resolve => {
    require.ensure(['../components/resourceCenter/resourceModuleKnowledgeEdit.vue'], (require) => {
        resolve(require('../components/resourceCenter/resourceModuleKnowledgeEdit.vue'))
    },'resourceModuleKnowledgeEdit')
}
// CFA全科续派课
const cfaXuCourse = resolve => {
  require.ensure(['../components/otherManage/cfaCourse.vue'], (require) => {
      resolve(require('../components/otherManage/cfaCourse.vue'))
  },'CourseModuleList')
}

export const routes = [
	{ path: '/', name:'5500',component: Entry ,redirect: '/home',children: [
		{ path: '/course/manage/list',meta:{ title:'课程列表' }, name:'928',component: CourseModuleList }, // 课程列表
		{ path: '/syllabus/manage/list',meta:{ title:'课程大纲列表' }, name:'929',component: SyllabusModuleList }, // 课程大纲列表
		{ path: '/resource/video/list',meta:{ title:'视频列表' }, name:'932',component: resourceModuleVideoList }, // 视频列表
		{ path: '/resource/handout/list',meta:{ title:'讲义列表' }, name:'934',component: resourceModuleHandoutList }, // 讲义列表
		{ path: '/resource/resource-group/list',meta:{ title:'资源组列表' }, name:'959',component: resourceModuleResourceGroupList }, // 资源组列表
		{ path: '/syllabus/manage/template/:sid',meta:{ title:'选择课程大纲模板' }, name:'10004',component: SyllabusModuleOptTemplate }, // 选择课程大纲模板
		{ path: '/syllabus/manage/edit/:sid',meta:{ title:'编辑课程大纲' }, name:'10005',component: SyllabusModuleEdit }, // 编辑课程大纲
		{ path: '/course/manage/basic/set/:cid',meta:{ title:'课程基本设置' }, name:'10006',component: CourseModuleBasicSet }, // 课程基本设置
		{ path: '/course/manage/content/set/:cid',meta:{ title:'课程内容' }, name:'10007',component: CourseModuleContentSet }, // 课程内容
		{ path: '/resource/video/create',meta:{ title:'新增视频' }, name:'createVideo',component: resourceModuleVideoCreate }, // 新增视频
		{ path: '/resource/video/edit/:id',meta:{ title:'编辑视频' }, name:'editVideo',component: resourceModuleVideoEdit }, // 编辑视频
		{ path: '/resource/video/preview/:id',meta:{ title:'预览视频' }, name:'previewVideo',component: resourceModuleVideoPreview }, // 预览视频
		{ path: '/resource/video/interactive/:id',meta:{ title:'课中交互' }, name:'interactiveVideo',component: resourceModuleVideoInteractive }, // 课中交互
		{ path: '/resource/handout/create',meta:{ title:'新增讲义' }, name:'createHandout',component: resourceModuleHandoutCreate }, // 新增讲义
		{ path: '/resource/handout/edit/:id',meta:{ title:'编辑讲义' }, name:'editHandout',component: resourceModuleHandoutEdit }, // 编辑讲义
		{ path: '/resource/resource-group/create',meta:{ title:'新增资源组' }, name:'createResourceGroup',component: resourceModuleResourceGroupCreate }, // 新增资源组
		{ path: '/resource/resource-group/edit/:id',meta:{ title:'编辑资源组' }, name:'editResourceGroup',component: resourceModuleResourceGroupEdit }, // 编辑资源组
		{ path: '/resource/knowledge/create',meta:{ title:'新增知识点' }, name:'10010',component: resourceModuleKnowledgeCreate }, // 新增知识点
    { path: '/resource/knowledge/edit/:id',meta:{ title:'编辑知识点' }, name:'10011',component: resourceModuleKnowledgeEdit }, // 编辑知识点
    { path: '/other/cfa-course/list',meta:{ title:'CFA全科续派课' }, name:'928',component: cfaXuCourse }, // CFA全科续派课
	]},
	{ path: '/login',meta:{ title:'登陆' }, name:'10000',component: Login }, // 登陆
	{ path: '*',meta:{ title:'404' }, name:'10001',component: Page404 }, // 404
	{ path: '/updatePwd',meta:{ title:'修改密码' }, name:'10002',component: UpdatePwd }, // 修改密码
	{ path: '/home',meta:{ title:'财经云' }, name:'10003',component: Home }, // 财经云
]
