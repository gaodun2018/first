import { post, get } from '../util/zeusAxios';
import { Message } from 'element-ui';
import {getBaseUrl} from '../util/config'
// 登录

export const getProject = parameters => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/get/project/subject/list`, parameters)


