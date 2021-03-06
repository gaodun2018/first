//批量讲义表格配置
export const handoutTable = [{
  text: '序号',
  key: 'index',
  flex: {
    flex: 0.5
  }
},
{
  text: '显示名称',
  key: 'name',
  flex: {
    flex: 4
  }
},
{
  text: '分类',
  key: 'type',
  flex: {
    flex: 1.5
  }
},
{
  text: '文件',
  key: 'file_name',
  flex: {
    flex: 5
  }
},
{
  text: '大小',
  key: 'size',
  flex: {
    flex: 1
  }
},
{
  text: '操作',
  key: 'done',
  flex: {
    flex: 1.5
  }
}
];

//课程阶段表格配置
export const stageTable = [{
  text: '序号',
  key: 'index',
  flex: {
    flex: 0.5
  }
},
{
  text: '阶段名称',
  key: 'name',
  flex: {
    flex: 2,
    textAlign:"left"
  }
},
{
  text: '阶段描述',
  key: 'description',
  flex: {
    flex: 2
  }
},
{
  text: '阶段课程大纲',
  key: 'syllabus_name',
  flex: {
    flex: 5,
    textAlign:"left"
  }
},
{
  text: '操作',
  key: 'done',
  flex: {
    flex: 1.5
  }
}
];
//考季管理进度配置
export const examTimeProgressText = [{
text: '设置考季时间',
currentLine: 'bar-line-current',
currentDot: 'bar-dot-current',
currentText: 'current-text',
isCustomerConfirm: true
}, {
text: '确认学员考季的问卷',
currentLine: 'bar-line-current',
currentDot: 'bar-dot-current',
currentText: 'current-text',
isCustomerConfirm: false
}, {
text: '学习规划',
currentLine: 'bar-line-current',
currentDot: 'bar-dot-current',
currentText: 'current-text',
isCustomerConfirm: false
}];
//资源组表单配置
export const resourceTableConfig = [{
"discriminator": "video",
"table": [{
  type:'video',
  key: 'id',
  wh: '120',
  sort: false,
  label: '资源ID',
}, {
  type:'video',
  key: 'discriminator',
  wh: '100',
  sort: false,
  label: '资源类型',
},
 {
  type:"teacher_info",
  key: 'name',
  wh: '100',
  sort: false,
  label: '老师名称',
},
{
  type:'video',
  key: 'title',
  wh: '',
  sort: false,
  label: '资源名称',
}],
inputPlaceholder: '请输入视频资源ID / 名称',
input: {}
}, ];
