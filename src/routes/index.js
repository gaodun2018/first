import Entry from '../pages/Entry.vue';
// 资源列表
const ResourceTag = resolve => {
        require.ensure(['../components/resourceCenter/ResourceTag.vue'], (require) => {
            resolve(require('../components/resourceCenter/ResourceTag.vue'))
        }, 'ResourceTag')
    }
    // 视频列表
const resourceModuleVideoList = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleVideoList.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleVideoList.vue'))
        }, 'resourceModuleVideoList')
    }
    // 题目列表
const ExerciseList = resolve => {
    require.ensure(['../components/resourceCenter/ExerciseList.vue'], (require) => {
        resolve(require('../components/resourceCenter/ExerciseList.vue'))
    }, 'ExerciseList')
}

// 讲义列表
const resourceModuleHandoutList = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleHandoutList.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleHandoutList.vue'))
        }, 'resourceModuleHandoutList')
    }
    // 知识点汇总
const resourceModuleKnowledgeList = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleKnowledgeList.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleKnowledgeList.vue'))
        }, 'resourceModuleKnowledgeList')
    }
    // 考试大纲
const ExaminationSyllabus = resolve => {
        require.ensure(['../components/resourceCenter/ExaminationSyllabus.vue'], (require) => {
            resolve(require('../components/resourceCenter/ExaminationSyllabus.vue'))
        }, 'ExaminationSyllabus')
    }
    // 课程列表
const CourseModuleList = resolve => {
    require.ensure(['../components/CourseManage/CourseModuleList.vue'], (require) => {
        resolve(require('../components/CourseManage/CourseModuleList.vue'))
    }, 'CourseModuleList')
}


// 商品管理列表
// const commodityManagementList = resolve => {
//     require.ensure(['../components/operateCenter/CommodityManagement/index.vue'], (require) => {
//         resolve(require('../components/operateCenter/CommodityManagement/index.vue'))
//     },'OperateCenter')
// }
const CommodityManagementList = r => require.ensure([], () => r(require('../components/operateCenter/CommodityManagement/index.vue')), 'OperateCenter')

// 课程大纲列表
const SyllabusModuleList = resolve => {
    require.ensure(['../components/SyllabusManage/SyllabusModuleList.vue'], (require) => {
        resolve(require('../components/SyllabusManage/SyllabusModuleList.vue'))
    }, 'SyllabusModuleList')
}

// 登陆
const Login = resolve => {
        require.ensure(['../pages/Login.vue'], (require) => {
            resolve(require('../pages/Login.vue'))
        }, 'Login')
    }
    // 404
const Page404 = resolve => {
        require.ensure(['../components/Page404.vue'], (require) => {
            resolve(require('../components/Page404.vue'))
        }, 'Page404')
    }
    // 修改密码
const UpdatePwd = resolve => {
        require.ensure(['../pages/UpdatePwd.vue'], (require) => {
            resolve(require('../pages/UpdatePwd.vue'))
        }, 'UpdatePwd')
    }
    // 财经云
const Home = resolve => {
        require.ensure(['../pages/Home.vue'], (require) => {
            resolve(require('../pages/Home.vue'))
        }, 'Home')
    }
    // 选择课程大纲模板
const SyllabusModuleOptTemplate = resolve => {
        require.ensure(['../components/SyllabusManage/SyllabusModuleOptTemplate.vue'], (require) => {
            resolve(require('../components/SyllabusManage/SyllabusModuleOptTemplate.vue'))
        }, 'SyllabusModuleOptTemplate')
    }
    // 编辑课程大纲
const SyllabusModuleEdit = resolve => {
        require.ensure(['../components/SyllabusManage/SyllabusModuleEdit.vue'], (require) => {
            resolve(require('../components/SyllabusManage/SyllabusModuleEdit.vue'))
        }, 'SyllabusModuleEdit')
    }
    // 课程基本设置
const CourseModuleBasicSet = resolve => {
        require.ensure(['../components/CourseManage/CourseModuleBasicSet.vue'], (require) => {
            resolve(require('../components/CourseManage/CourseModuleBasicSet.vue'))
        }, 'CourseModuleBasicSet')
    }
    // 课程内容
const CourseModuleContentSet = resolve => {
        require.ensure(['../components/CourseManage/CourseModuleContentSet.vue'], (require) => {
            resolve(require('../components/CourseManage/CourseModuleContentSet.vue'))
        }, 'CourseModuleContentSet')
    }
    // 新增视频
const resourceModuleVideoCreate = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleVideoCreate.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleVideoCreate.vue'))
        }, 'resourceModuleVideoCreate')
    }
    // 编辑视频
const resourceModuleVideoEdit = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleVideoEdit.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleVideoEdit.vue'))
        }, 'resourceModuleVideoEdit')
    }
    // 新增讲义
const resourceModuleHandoutCreate = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleHandoutCreate.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleHandoutCreate.vue'))
        }, 'resourceModuleHandoutCreate')
    }
    // 编辑讲义
const resourceModuleHandoutEdit = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleHandoutEdit.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleHandoutEdit.vue'))
        }, 'resourceModuleHandoutEdit')
    }
    // 新增知识点
const resourceModuleKnowledgeCreate = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleKnowledgeCreate.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleKnowledgeCreate.vue'))
        }, 'resourceModuleKnowledgeCreate')
    }
    // 编辑知识点
const resourceModuleKnowledgeEdit = resolve => {
        require.ensure(['../components/resourceCenter/resourceModuleKnowledgeEdit.vue'], (require) => {
            resolve(require('../components/resourceCenter/resourceModuleKnowledgeEdit.vue'))
        }, 'resourceModuleKnowledgeEdit')
    }
    // EP课程学习数据统计
const EducationalClass = resolve => {
        require.ensure(['../pages/EducationalClass.vue'], (require) => {
            resolve(require('../pages/EducationalClass.vue'))
        }, 'EducationalClass')
    }
    // EP定制标杆计划
const CustomizedPlan = resolve => {
        require.ensure(['../pages/CustomizedPlan.vue'], (require) => {
            resolve(require('../pages/CustomizedPlan.vue'))
        }, 'CustomizedPlan')
    }
    // EP选择标杆计划
const ChoosePlan = resolve => {
        require.ensure(['../pages/ChoosePlan.vue'], (require) => {
            resolve(require('../pages/ChoosePlan.vue'))
        }, 'ChoosePlan')
    }
    // 查看完整计划
const EducationalPlanAll = resolve => {
        require.ensure(['../pages/EducationalPlanAll.vue'], (require) => {
            resolve(require('../pages/EducationalPlanAll.vue'))
        }, 'EducationalPlanAll')
    }
    // 全部学员详情
const EducationalClasslist = resolve => {
    require.ensure(['../pages/EducationalClasslist.vue'], (require) => {
        resolve(require('../pages/EducationalClasslist.vue'))
    }, 'EducationalClasslist')
}


export const routes = [{
        path: '/',
        name: '5500',
        component: Entry,
        redirect: '/home',
        children: [
            { path: '/ResourceTag', meta: { title: '资源列表' }, name: '850', component: ResourceTag }, // 资源列表
            { path: '/resource/video/list', meta: { title: '视频列表' }, name: '852', component: resourceModuleVideoList }, // 视频列表
            { path: '/operationCenter/commodity/list', meta: { title: '商品列表' }, name: '888', component: CommodityManagementList }, // 商品管理列表
            { path: '/ExerciseList', meta: { title: '题目列表' }, name: '856', component: ExerciseList }, // 题目列表
            { path: '/resource/handout/list', meta: { title: '讲义列表' }, name: '857', component: resourceModuleHandoutList }, // 讲义列表
            { path: '/resource/knowledge/list', meta: { title: '知识点汇总' }, name: '858', component: resourceModuleKnowledgeList }, // 知识点汇总
            { path: '/ExaminationSyllabus', meta: { title: '考试大纲' }, name: '859', component: ExaminationSyllabus }, // 考试大纲
            { path: '/course/manage/list', meta: { title: '课程列表' }, name: '861', component: CourseModuleList }, // 课程列表
            { path: '/syllabus/manage/list', meta: { title: '课程大纲列表' }, name: '863', component: SyllabusModuleList }, // 课程大纲列表
            { path: '/syllabus/manage/template/:sid', meta: { title: '选择课程大纲模板' }, name: '10004', component: SyllabusModuleOptTemplate }, // 选择课程大纲模板
            { path: '/syllabus/manage/edit/:sid', meta: { title: '编辑课程大纲' }, name: '10005', component: SyllabusModuleEdit }, // 编辑课程大纲
            { path: '/course/manage/basic/set/:cid', meta: { title: '课程基本设置' }, name: '10006', component: CourseModuleBasicSet }, // 课程基本设置
            { path: '/course/manage/content/set/:cid', meta: { title: '课程内容' }, name: '10007', component: CourseModuleContentSet }, // 课程内容
            { path: '/resource/video/create', meta: { title: '新增视频' }, name: 'createVideo', component: resourceModuleVideoCreate }, // 新增视频
            { path: '/resource/video/edit/:id', meta: { title: '编辑视频' }, name: 'editVideo', component: resourceModuleVideoEdit }, // 编辑视频
            { path: '/resource/handout/create', meta: { title: '新增讲义' }, name: 'createHandout', component: resourceModuleHandoutCreate }, // 新增讲义
            { path: '/resource/handout/edit/:id', meta: { title: '编辑讲义' }, name: 'editHandout', component: resourceModuleHandoutEdit }, // 编辑讲义
            { path: '/resource/knowledge/create', meta: { title: '新增知识点' }, name: '10010', component: resourceModuleKnowledgeCreate }, // 新增知识点
            { path: '/resource/knowledge/edit/:id', meta: { title: '编辑知识点' }, name: '10011', component: resourceModuleKnowledgeEdit }, // 编辑知识点
        ]
    },
    { path: '/login', meta: { title: '登陆' }, name: '10000', component: Login }, // 登陆
    { path: '*', meta: { title: '404' }, name: '10001', component: Page404 }, // 404
    { path: '/updatePwd', meta: { title: '修改密码' }, name: '10002', component: UpdatePwd }, // 修改密码
    { path: '/home', meta: { title: '财经云' }, name: '10003', component: Home }, // 财经云
    { path: '/EducationalClass/:cid/:sid', meta: { title: 'EP课程学习数据统计' }, name: '10012', component: EducationalClass }, // EP课程学习数据统计
    { path: '/customizedPlan/:cid/:clid', meta: { title: 'EP定制标杆计划' }, name: '10013', component: CustomizedPlan }, // EP定制标杆计划
    { path: '/choosePlan/:cid/:clid', meta: { title: 'EP选择标杆计划' }, name: '10014', component: ChoosePlan }, // EP选择标杆计划
    { path: '/EducationalPlanAll/:cid/:clid/:tabnum', meta: { title: '查看完整计划' }, name: '10015', component: EducationalPlanAll }, // 查看完整计划
    { path: '/EducationalClasslist/:cid/:clid/', meta: { title: '全部学员详情' }, name: '10016', component: EducationalClasslist }, // 全部学员详情
]