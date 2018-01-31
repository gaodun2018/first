import { post, get, put,DELETE } from '../util/zeusAxios';
import { getBaseUrl } from '../util/config'

//获取项目和科目
export const getProjectSubject = params => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/get/project/subject/list`, params);

//课程大纲列表
export const CourseSyllabuses = params => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabuses`, params);

//考试大纲列表
export const ExamSyllabuses = params => get(`${getBaseUrl()}courseapi.gaodun.com/examination/syllabuses`, params);

//修改大纲
export const UpdateCourseSyllabus = (url,param) => put(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus/${url}`, param);


//课程大纲模板
export const CourseSyllabusTemplates = params => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus-templates`, params);

//查看大纲
export const checkSyllabus = (id,params) => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus/${id}`, params);

//拉取某个大纲的条目 
export const getSyllabusItems = (params) => get(`${getBaseUrl()}toc-service.gaodun.com/course/syllabus/items`, params);

//删除大纲条目
export const DeleteSyllabusItem = (id,params) => DELETE(`${getBaseUrl()}toc-service.gaodun.com/course/syllabus/item/${id}`, params);








// 班级列表
export const getClassListout = parameters => get(`${getBaseUrl()}school-service.gaodun.com/class/lists`, parameters);

// 班级列表
export const teachermin = parameters => get(`${getBaseUrl()}school-api.gaodun.com/school/teacher`, parameters);

//创建班级时的课程搜索
export const checkcoursemit = (projectId,subjectId,params) => get(`${getBaseUrl()}school-service.gaodun.com/plan/class/get/${projectId}/course/${subjectId}`, params);

//搜索学员
export const checkstudent = (page,pageSize,params) => get(`${getBaseUrl()}school-service.gaodun.com/plan/search/${page}/student/${pageSize}`, params);// /${page}

//搜索班级
export const checkclass = (studentId,page,pageSize,params) => get(`${getBaseUrl()}school-service.gaodun.com/plan/${studentId}/search/${page}/class/${pageSize}`, params);




















// 班级列表
// export const getStudentList = parameters => get(`${getBaseUrl()}jerusalemapi.gaodun.com/Student/getStudentList`, parameters);