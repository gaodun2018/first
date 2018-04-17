//大纲挂载资源进度信息
export const progressText = [{
    text: '资源设置',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isCustomerConfirm: true
}, {
    text: '资源类型',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isCustomerConfirm: false
}, {
    text: '资源选择',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isCustomerConfirm: false
}];

//资源类型列表
export const resourceTypeList = [{
        "discriminator": "video",
        "label": "视频"
    },
    {
        "discriminator": "lecture_note",
        "label": "讲义"
    },
    {
        "discriminator": "paper",
        "label": "试卷"
    },
    /* {
         "discriminator": "question",
         "label": "题目"
     },*/
    {
        "discriminator": "legacy_live",
        "label": "直播"
    }
];