export const basicItem = [{
    span: 10,
    title: '基本信息',
    list: [{
            types: [{
                    name: '证件类型 ：',
                    value: 'CertificatesType'
                },
                {
                    name: '证件号码 ：',
                    value: 'CertificatesNo'
                },
                {
                    name: '家庭省市 ：',
                    value: 'Province',
                    values: 'City'
                },
                {
                    name: '学  校 ：',
                    value: 'School'
                }
                // {
                //     name: '出生日期 ：',
                //     value: 'BirthDay'
                // },
                // {
                //     name: '职业状态 ：',
                //     value: 'Profession'
                // },

            ]
        },
        {
            types: [{
                    name: '专  业 ：',
                    value: 'Major',
                },
                {
                    name: '学  历 ：',
                    value: 'Qualification'
                },
                {
                    name: '入学年份 ：',
                    value: 'EnrollmentYear'
                },
                {
                    name: '毕业时间 ：',
                    value: 'GraduationTime'
                }
            ]
        }
    ]
}, {
    span: 14,
    title: '公司信息',
    list: [{
            types: [{
                    name: '公司名称 ：',
                    value: 'CompanyName'
                },
                {
                    name: '部  门 ：',
                    value: 'Department'
                },
                {
                    name: '职  位 ：',
                    value: 'Position',
                },
                {
                    name: '级  别 ：',
                    value: 'StaffingLevel'
                },
                {
                    name: '企业邮箱 ：',
                    value: 'CompanyEmail'
                }
            ]
        },
        {
            types: [{
                    name: '公司总机及分机 ：',
                    value: 'CompanyExtensionNumber'
                },
                {
                    name: '公司总直线 ：',
                    value: 'CompanyLineNo'
                },
                {
                    name: '公司地址 ：',
                    value: 'CompanyAddress'
                }
            ]
        }
    ]
}];
export const courseItem = [{ // 课程信息
        list: [{
                title: '感兴趣项目',
                value: 'CourseType'
            },
            {
                title: '学员意向',
                value: 'Intention'
            },
            {
                title: '方便上课时间',
                value: 'ConvenienceCourseTime'
            },
            {
                title: '优质线索类型',
                value: 'ClueQuality'
            },
            {
                title: '客户意向度',
                value: 'IntentionGrade'
            }
        ],
    },
    {
        list: [{
                title: '首次来源渠道',
                value: 'FirstChannel'
            },
            {
                title: '末次客户来源',
                value: 'EffectChannel'
            },
            {
                title: '来源渠道',
                value: 'SourceChannelCode'
            },
            {
                title: '营销计划',
                value: 'ChannelCodeSub'
            },
            {
                title: '推荐人',
                value: 'Recommender'
            }
        ],
    }, {
        list: [{
                title: '线索状态',
                value: 'ClueStatue'
            },
            {
                title: '职业状态',
                value: 'Profession'
            },
            {
                title: '考试时间',
                value: 'ExamDate'
            }, {
                title: '紧急联系人',
                value: 'ContactName'
            }, {
                title: '紧急联系人电话',
                value: 'Phone'
            }
            // ,{
            //     title: '来源细分',
            //     value: 'ChannelCodeSub',
            //     wh: '60px'
            // }
        ],
    }
];
/*线索跟进*/
export const intentionItem = [{
    Name: 'HP',
    Id: '1000043'
}, {
    Name: 'MP',
    Id: '1000044'
}, {
    Name: 'D',
    Id: '1000045'
}, {
    Name: 'O',
    Id: '1000046'
}];
export const addContactItem = [{
    name: '联系人姓名：',
    value: 'ContactName',
}, {
    name: '手机：',
    value: 'Phone',
}, {
    name: 'QQ：',
    value: 'QQ',
}, {
    name: '微信：',
    value: 'WeChat',
}, {
    name: '私人邮箱：',
    value: 'Email',
}];
export const addContactItems = [{
    name: '联系人姓名：',
    value: 'ContactName',
}, {
    name: '手机：',
    value: 'Phone',
}, {
    name: 'QQ：',
    value: 'QQ',
}, {
    name: '微信：',
    value: 'WeChat',
}, {
    name: '私人邮箱：',
    value: 'Email',
}, {
    name: '国际电话：',
    value: 'PhoneOverSea',
}];

export const trackingTableItem = [{
    name: '线索ID',
    value: 'ClueNo'
}, {
    name: '感兴趣项目',
    value: 'CourseType'
}, {
    name: '线索状态',
    value: 'ClueStatus'
}, {
    name: '线索所属人',
    value: 'ClueOwner'
}, {
    name: '最后沟通时间',
    value: 'LastCommunicateTime',
    w: '110'
}];
export const cluesTypeItem = [{ // 线索管理页模糊搜索下来框
    type: '线索ID'
}, {
    type: '客户编号'
}, {
    type: '客户姓名'
}, {
    type: '手机'
}, {
    type: '国际电话'
}, {
    type: '其他联系方式'
}];