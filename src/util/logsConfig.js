const formatQueryData = (data) => {
    if (!data) return data;
    let formatData = {};
    let arr = data.split('&');
    arr.forEach((i) => {
        formatData[i.split('=')[0]] = i.split('=')[1]
    })
    return formatData;
}
/*
* 获取参数的回调
*   1.id在url上传递，用正则表达式匹配出来
*   2.id在body上传递，需要提前知道传递的字段名（key），matchValue
*
*
*
* */
const callbackFn = {
    default: function () {

    },
    matchPathId: function (res, item) {
        const matchResult = res.config.url.match(item.regex)
        // let param = {};
        let source_id = 0;
        console.log(matchResult)
        if (matchResult.length > 2) {
            // param[item.type + '_id'] = matchResult[2];
            source_id = matchResult[2];
        }
        // console.log('id：', param);
        return source_id

    },
    getParamsInfo: function (res, item) {
        let data = formatQueryData(res.config.data)
        // let data = {};
        // let arr = res.config.data.split('&');
        // arr.forEach((i) => {
        //     data[i.split('=')[0]] = i.split('=')[1]
        // })
        console.log('parms 中参数', data)
        let source_id;
        if (item.matchedValue) {
            source_id = data[item.matchedValue]
        }
        source_id = source_id? source_id:0;
        return source_id
        // console.log(data);
        // console.log(data[item.matchedValue]);
    }
}

export const requestConfig = [
    {
        url: '/saas-service/course/manage/get/project/subject/list',
        method: 'GET',
        action: '拉取项目科目',
        type: 'course',
        regex: false,
    },
    {
        url: '/saas-service/course/manage/search',
        method: 'GET',
        action: '根据条件搜索课程接口',
        type: 'course',
        regex: false,
    },
    {
        url: '/saas-service/course/${id}',
        method: 'GET',
        action: '课程基本设置拉取课程信息接口',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)$/,
        callbackFn:callbackFn.matchPathId ,
    },
    {
        url: '/saas-service/course/${course_id}/handout',
        method: 'GET',
        action: '拉取课程讲义',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)\/handout$/,
        callbackFn:callbackFn.matchPathId ,
    },
    {
        url: '/saas-service/handout/${id}',
        method: 'DELETE',
        action: '删除课程讲义',
        type: 'course',
        // regex: false,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/handout\/(\d+$)/,
        callbackFn:callbackFn.matchPathId
    },
    {
        url: '/saas-service/handout',
        method: 'POST',
        action: '新增课程讲义',
        type: 'resource',
        regex: false,
    },
    {
        url: '/saas-service/handout/${handout_id}',
        method: 'PUT',
        action: '修改课程讲义',
        type: "course",
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/handout\/(\d+)$/,
        callbackFn:callbackFn.matchPathId ,
    },
    {
        url: '/saas-service/course/${course_id}/source',
        method: 'GET',
        type: "course" ,
        action: '拉取课程下的资源介绍接口',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)\/source$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/course-api/course/${course_id}/admin/gradation',
        method: 'GET',
        action: '拉取课程下所有阶段和大纲接口',
        type: "course" ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/course-api\/course\/(\d+)\/admin\/gradation$/,
        callbackFn:callbackFn.matchPathId
    },
    {
        url: '/saas-service/gradation/${gradation_id}',
        method: 'DELETE',
        action: '删除一个阶段接口',
        type: "course",
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/gradation\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course',
        method: 'POST',
        action: '新增一个课程',
        type: 'course',
        regex: false,
    },
    {
        url: '/saas-service/course/${url}',
        method: 'PUT',
        action: '修改课程基本设置',
        type: "course",
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course/${course_id}/source',
        method: 'POST',
        action: '新增资源介绍接口',
        type: "course",
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)\/source$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/gradation',
        method: 'POST',
        type: "course",
        action: '新增一个阶段接口',
        regex: false,
    },
    {
        url: '/saas-service/gradation/${gradation_id}',
        method: 'PUT',
        action: '修改一个阶段接口',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/gradation\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course/${course_id}/setting',
        method: 'GET',
        action: '拉取课程内容管理设置',
        type: 'course' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)\/setting$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course/${course_id}/setting',
        method: 'PUT',
        action: '课程管理设置（是否启用的设置）',
        type: 'course' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/(\d+)\/setting$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/course-api/course/handout/sort',
        method: 'POST',
        action: '课程内容 批量讲义 排序',
        type: 'course' ,
        matchedValue: "course_id",
        regex: false,
        callbackFn: callbackFn.getParamsInfo,
    },
    {
        url: '/saas-service/user/verify',
        method: 'POST',
        action: '预览课程',
        type: 'course' ,
        regex: false,
    },
    {
        url: '/plan-api/season',
        method: 'POST',
        action: '创建考季&计划',
        type: 'course',
        regex: false,
    },
    {
        url: '/plan-api/season/${seasonId}',
        method: 'DELETE',
        action: '删除考季及计划',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/plan-api\/season\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/plan-api/season/item/${courseId}',
        method: 'GET',
        action: '考季及计划详情列表--后台',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/plan-api\/season\/item\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/plan-api/season/plan/${planId}',
        method: 'PUT',
        action: '修改计划（不含阶段）',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/plan-api\/season\/plan\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/plan-api/season/plan/item/${seasonId}',
        method: 'PUT',
        action: '修改考季（考季及计划）',
        type: 'course' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/plan-api\/season\/plan\/item\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/plan-api/season/${seasonId}/plan',
        method: 'POST',
        action: '创建计划',
        type: "course" ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/plan-api\/season\/(\d+)\/plan$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/caen/v1/course/teacher/${course}',
        method: 'GET',
        action: '查询课程全部老师',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/caen\/v1\/course\/teacher\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/caen/v1/backend/teachers',
        method: 'GET',
        action: '查询老师接口（后台）',
        type: 'course',
        regex: false,
    },
    {
        url: '/caen/v1/backend/course/teacher',
        method: 'POST',
        action: '增加课程老师(后台)',
        regex: false,
        type: 'course',
        matchedValue: "course_id",
        callbackFn:callbackFn.getParamsInfo,
    },
    {
        url: '/caen/v1/backend/course/teacher',
        method: 'DELETE',
        action: '删除课程老师（后台）',
        type: 'course' ,
        regex: false,
        matchedValue: "course_id",
        callbackFn:callbackFn.getParamsInfo,
    },
    {
        url: '/plan-api/course/${id}/admin/gradation',
        method: 'GET',
        action: '考季的新接口(后台)',
        type: 'course',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/plan-api\/course\/(\d+)\/admin\/gradation$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course-syllabuses',
        method: 'GET',
        action: '获取课程大纲列表',
        type: "syllabus" ,
        regex: false,
    },
    {
        url: '/saas-service/examination/syllabuses',
        method: 'GET',
        action: '获取考试大纲列表',
        type: "syllabus",
        regex: false,
    },
    {
        url: '/saas-service/course-syllabus/${url}',
        method: 'PUT',
        action: '修改课程大纲',
        type: 'syllabus',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course-syllabus\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course-syllabus-templates',
        method: 'GET',
        type: 'syllabus' ,
        action: '选取课程大纲模板',
        regex: false,
    },
    {
        url: '/saas-service/course-syllabus/${id}',
        method: 'GET',
        action: '查看大纲属性',
        type: 'syllabus',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course-syllabus\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course/syllabus/items',
        method: 'GET',
        action: '拉取大纲条目',
        type: 'syllabus' ,
        regex: false,
        matchedValue: "course_syllabus_id",
        callbackFn:callbackFn.getParamsInfo,
    },
    {
        url: '/saas-service/course/syllabus/item/${id}',
        method: 'GET',
        action: '删除大纲条目',
        type: 'syllabus',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/syllabus\/item\/(\d+)$/,
        callbackFn:callbackFn.matchPathId
    },
    {
        url: '/saas-service/course/syllabus/${syllabus_id}/resources/${resource_id}',
        method: 'GET',
        action: '检查大纲下是否已有该资源',
        type: 'syllabus' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/syllabus\/(\d+)\/resources\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course-syllabus',
        method: 'POST',
        action: '创建课程大纲',
        type: 'syllabus',
        regex: false,
    },
    {
        url: '/saas-service/course-syllabus/copy',
        method: 'POST',
        action: '复制课程大纲',
        type: 'syllabus' ,
        regex: false,
    },
    {
        url: '/saas-service/course/syllabus/${id}/template',
        method: 'PUT',
        action: '选择课程大纲模板',
        type: 'syllabus' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/syllabus\/(\d+)\/template$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course/syllabus/item',
        method: 'POST',
        action: '添加大纲条目',
        type: 'syllabus' ,
        regex: false,
        matchedValue: "course_syllabus_id",
        callbackFn: callbackFn.getParamsInfo,
    },
    {
        url: '/saas-service/course/syllabus/item/${id}',
        method: 'PUT',
        action: '修改大纲条目',
        type: 'syllabus' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/syllabus\/item\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/course/syllabus/item/${id}/resource',
        method: 'PUT',
        action: '大纲条目上挂资源',
        type: 'syllabus' ,
        matchedValue: 'course_syllabus_id',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/syllabus\/item\/(\d+)\/resource$/,
        callbackFn:callbackFn.getParamsInfo,
    },
    {
        url: '/saas-service/class/lists',
        method: 'GET',
        action: '获取班级列表',
        regex: false,
    },
    {
        url: '/saas-service/school/teacher',
        method: 'GET',
        action: '获取班级老师列表',
        regex: false,
    },
    {
        url: '/saas-service/plan/class/get/${projectId}/course/${subjectId}',
        method: 'GET',
        action: '创建班级时的课程搜索',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/plan\/class\/get\/(\d+)\/course\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/saas-service/plan/search/${page}/student/${pageSize}',
        method: 'GET',
        action: '搜索学员',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/plan\/search\/(\d+)\/student\/(\d+)$/,
    },
    {
        url: '/saas-service/plan/${studentId}/search/${page}/class/${pageSize}',
        method: 'GET',
        action: '搜索班级',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/plan\/(\d+)\/search\/(\d+)\/class\/(\d+)$/,
    },
    {
        url: '/saas-service/course/syllabus/item/${id}/rank',
        method: 'PUT',
        action: '大纲条目排序',
        type: 'syllabus' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/course\/syllabus\/item\/(\d+)\/rank$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/caen/v1/backend/knowledge/syllabuses/course',
        method: 'GET',
        type: 'syllabus',
        action: '课程大纲获取考纲列表知识点',
        regex: false,
    },
    {
        url: '/toc-service/item/${item_id}/knowledge/${knowledge_id}',
        method: 'PUT',
        action: '提交大纲知识点',
        type: 'syllabus' ,
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/toc-service\/item\/(\d+)\/knowledge\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/resource-api/resource/video',
        method: 'POST',
        action: '保存视频资源',
        type: 'resource',
        regex: false,
    },
    {
        url: '/saas-service/subject/two/list',
        method: 'GET',
        action: '大纲获取二级科目',
        type: 'syllabus' ,
        regex: false,
    },
    {
        url: '/saas-service/resource/list',
        method: 'GET',
        action: '查询资源列表',
        type: 'resource',
        regex: false,
    },
    {
        url: '/resource-api/resource/${id}',
        method: 'GET',
        action: '查询资源数据',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/resource-api\/resource\/(\d+)$/,
        callbackFn: callbackFn.matchPathId
    },
    {
        url: '/saas-service/tag/slug/${slug}',
        method: 'GET',
        action: '按slug查询标签',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/saas-service\/tag\/slug\/project$/,
    },
    {
        url: '/caen/v1/backend/resource/video',
        method: 'POST',
        action: ['新增视频资源', '修改视频资源'],
        type: 'resource',
        matchedValue: 'id',
        regex: false,
        callbackFn: callbackFn.getParamsInfo
    },
    {
        url: '/resource-api/resource/video/${id}',
        method: 'PUT',
        action: '修改视频资源',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/resource-api\/resource\/video\/(\d+)$/,
        callbackFn: callbackFn.matchPathId,
    },
    {
        url: '/resource-api/resource/video-path',
        method: 'GET',
        action: '分析视频地址',
        type: 'resource',
        regex: false
    },
    {
        url: '/resource-api/resource/lecture-note',
        method: 'POST',
        action: '讲义保存',
        type: 'resource',
        regex: false,
    },
    {
        url: '/resource-api/resource/file',
        method: 'POST',
        action: '讲义上传',
        type: 'resource',
        regex: false,
    },
    {
        url: '/resource-api/resource/lecture-note/${id}',
        method: 'POST',
        action: '修改讲义资源',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/resource-api\/resource\/lecture-note\/(\d+)$/,
        callbackFn: callbackFn.matchPathId,
    },
    {
        url: '/resource-api/resource/${id}',
        method: 'DELETE',
        action: '删除资源',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/resource-api\/resource\/(\d+)$/,
        callbackFn: callbackFn.matchPathId,
    },
    {
        url: '/caen/insteractive/add',
        method: 'POST',
        action: '课中交互添加视频节点(后台)',
        type: 'resource',
        matchedValue:"resource_id",
        regex: false,
        callbackFn: callbackFn.getParamsInfo
    },
    {
        url: '/caen/insteractive/list',
        method: 'GET',
        action: '课中交互获取节点列表（后台）',
        type: 'resource',
        regex: false,
        matchedValue:"resource_id",
        callbackFn: callbackFn.getParamsInfo
    },
    {
        url: '/caen/insteractive/update',
        method: 'PUT',
        action: '课中交互修改视频节点(后台)',
        type: 'resource',
        regex: false,
        matchedValue: "resource_id",
        callbackFn: callbackFn.getParamsInfo,
    },
    {
        url: '/caen/insteractive/delete',
        method: 'DELETE',
        action: '课中交互删除视频节点',
        type: 'resource',
        regex: false,
        matchedValue: "resource_id",
        callbackFn: callbackFn.getParamsInfo,
    },
    {
        url: '/caen/v1/backend/resource/group',
        method: 'POST',
        action: ['增加资源组', '修改资源组'],
        type: 'resource',
        matchedValue: 'id',
        regex: false,
        callbackFn: callbackFn.getParamsInfo
    },
    {
        url: '/caen/v1/backend/resource/group',
        method: 'GET',
        action: '查询资源组',
        type: 'resource',
        regex: false
    },
    {
        url: '/caen/v1/backend/knowledge/syllabuses/tag',
        method: 'GET',
        action: '资源获取考纲和知识点',
        type: 'resource',
        regex: false,
    },
    {
        url: '/caen/v1/backend/resource/video/${id}',
        method: 'GET',
        action: '获取视频资源&知识点&老师',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/caen\/v1\/backend\/resource\/video\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/resource-api/resource/paper/${id}',
        method: 'GET',
        action: '获取对应id的试卷数据',
        type: 'resource',
        regex: /^\/\/(t-|dev-|pre-|)apigateway.gaodun.com\/resource-api\/resource\/paper\/(\d+)$/,
        callbackFn:callbackFn.matchPathId,
    },
    {
        url: '/caen/v1/backend/resource/group/find',
        method: 'GET',
        action: '新的获取老师的接口',
        type: 'resource',
        regex: false,
    },
    {
        url: '/caen/v1/backend/syllabus/refresh/course',
        method: 'GET',
        action: '清除课程缓存',
        type: 'course',
        regex: false,
        matchedValue: "course_id",
        callbackFn: callbackFn.getParamsInfo,
    },
    {
        url: '/caen/v1/backend/syllabus/refresh/resource',
        method: 'GET',
        action: '清除资源缓存',
        type: 'resource',
        regex: false,
    },

]
