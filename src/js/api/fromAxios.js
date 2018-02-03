import {getBaseUrl} from '../util/config'
import { Message } from 'element-ui';

import {formPost,formPut} from '../util/zeusFormAxios.js';


//添加班级
export const addClassList = (params) => formPost(`${getBaseUrl()}school-service.gaodun.com/class`, params);

//学员入班
export const OrginClassStudent = (params) => formPost(`${getBaseUrl()}school-service.gaodun.com/class/student`, params);

//修改班级
export const updateinfoClass = (class_id,params) => formPut(`${getBaseUrl()}school-service.gaodun.com/class/${class_id}`, params);


export const addClassPlan = (params) => formPost(`${getBaseUrl()}plan-api.gaodun.com/plan/`,params);//新增班级标杆计划

export const changePhase = (params) => formPost(`${getBaseUrl()}plan-api.gaodun.com/plan/phase/`,params);//增加/修改阶段学习计划

export const changeStudentPlan = (class_id,student_id,params) => formPost(`${getBaseUrl()}school-service.gaodun.com/class/${class_id}/student/${student_id}/set-plan`,params);//为班级学员设置计划


