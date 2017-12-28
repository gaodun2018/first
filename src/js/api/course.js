import { post, get } from '../util/zeusAxios';
import { Message } from 'element-ui';
import {getBaseUrl} from '../util/config'
// 登录

export const getProject = params => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/get/project/subject/list`, params)

//根据条件搜索课程接口
export const searchCourse = params => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/search`, params)


