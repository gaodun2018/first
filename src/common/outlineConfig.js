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
//表单配置
export const resourceTableConfig = [{
        "discriminator": "video",
        "table": [{
            key: 'id',
            wh: '120',
            sort: false,
            label: '资源ID',
        }, {
            key: 'discriminator',
            wh: '100',
            sort: false,
            label: '资源类型',
        }, {
            key: 'title',
            wh: '',
            sort: false,
            label: '资源名称',
        }],
        inputPlaceholder: '请输入视频资源ID / 名称',
        input: {}
    },
    {
        "discriminator": "lecture_note",
        "table": [{
            key: 'id',
            wh: '120',
            sort: false,
            label: '资源ID',
        }, {
            key: 'discriminator',
            wh: '100',
            sort: false,
            label: '资源类型',
        }, {
            key: 'title',
            wh: '',
            sort: false,
            label: '资源名称',
        }],
        inputPlaceholder: '请输入讲义资源ID / 名称',
        input: {}
    },
    {
        "discriminator": "paper",
        "table": [{
            // key: 'paper_id',
            key: 'id',
            wh: '100',
            sort: false,
            // label: '题库试卷ID',
            label: '资源ID',
        }, {
            key: 'discriminator',
            wh: '100',
            sort: false,
            label: '资源类型',
        }, {
            key: 'title',
            wh: '',
            sort: false,
            // label: '试卷名称',
            label: '资源名称',
        }],
        // inputPlaceholder: '请输入题库试卷ID / 名称',
        inputPlaceholder: '请输入试卷资源ID / 名称',
        input: {}
    },
    /* {
         "discriminator": "question",
         "label": "题目"
     },*/
    {
        "discriminator": "legacy_live",
        "table": [{
            // key: 'live_id',
            key: 'id',
            wh: '100',
            sort: false,
            // label: '直播ID',
            label: '资源ID',
        }, {
            key: 'discriminator',
            wh: '100',
            sort: false,
            label: '资源类型',
        }, {
            key: 'title',
            wh: '',
            sort: false,
            // label: '直播名称',
            label: '资源名称',
        }],
        // inputPlaceholder: '请输入直播ID / 名称',
        inputPlaceholder: '请输入直播资源ID / 名称',
        input: {}
    }
];