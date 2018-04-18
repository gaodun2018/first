//课程简介初始化内容
export const initial_info = '<span style="color:#97a8be;">请输入课程简介（字数建议控制在200-300字内）</span>'

//网课类型
export const course_type = [{
    course_type_id: '0',
    name: '普通网课',
}, {
    course_type_id: '1',
    name: '任务制网课（选择考试时间）',
}, {
    course_type_id: '2',
    name: '任务制网课（选择自主学习时间）',
}, {
    course_type_id: '3',
    name: '自适应学习网课-EP',
}, {
    course_type_id: '4',
    name: '私播课-Glive+',
}];

//下拉搜索的网课类型列表
export const options = [{
    value: '',
    label: '全部课程类型'
}, {
    value: '0',
    label: '普通网课',
}, {
    value: '1',
    label: '任务制网课（选择考试时间）',
}, {
    value: '2',
    label: '任务制网课（选择自主学习时间）',
}, {
    value: '3',
    label: '自适应学习网课-EP',
}, {
    value: '4',
    label: '私播课-Glive+',
}];


//课程基本设置进度信息
export const progressText = [{
    text: '基本设置',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isCustomerConfirm: true
}, {
    text: '功能模块',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isCustomerConfirm: false
}];