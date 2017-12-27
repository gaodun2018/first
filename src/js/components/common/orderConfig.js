export const productList = [{
    prop: 'productNo',
    label: '产品ID'
}, {
    prop: 'productName',
    label: '课程产品名称'
}, {
    prop: 'ProductModuleName',
    label: '所属模块'
}, {
    prop: 'TeachingPlaceName',
    label: '课程性质'
}, {
    prop: 'Period',
    label: '课时'
}, {
    prop: 'courseTypeName',
    label: '项目',
}, {
    prop: 'sellPrise',
    label: '价格'
}];
export const payContent = [{
    prop: 'PayTime',
    label: '支付时间'
}, {
    prop: 'PayTypeName',
    label: '支付方式'
}, {
    prop: 'PayAccount',
    label: '支付账户'
}, {
    prop: 'PayCount',
    label: '支付金额'
}, {
    prop: 'Remark',
    label: '支付说明'
}];
export const auditRecords = [{
    prop: 'Create_Time',
    label: '审核时间'
}, {
    prop: 'Creater',
    label: '审核人'
}, {
    prop: 'StatusName',
    label: '审核结果'
}, {
    prop: 'Remark',
    label: '审核反馈'
}, ];
export const discountContent = [{
    name: '早报优惠:',
    item: 'Early[0]',
}, {
    name: '项目优惠:',
    item: 'Course[0]',
}, {
    name: '市场优惠:',
    item: 'mark[0]',
}, {
    name: '流转推荐:',
    item: 'Recommend[0]',
}];
export const progressText = [{
    text: '客户信息确认'
}, {
    text: '选购课程及优惠'
}, {
    text: '订单收款辅助'
}, {
    text: '审核记录'
}];
export const SeachTypeItem = [{ // 所有订单模糊搜索下来框
    type: '线索编号'
}, {
    type: '订单编号'
}, {
    type: '客户编号'
}, {
    type: '客户姓名'
}, {
    type: '联系方式'
}];
export const orderSeachType = [{ // 订单模糊搜索下来框
    type: '订单编号',
    name: 'OrderNo'
}, {
    type: '学生姓名',
    name: 'StudentName'
}, {
    type: '线索编号',
    name: 'ClueNo'
}, {
    type: '联系方式',
    name: 'ContactNo'
}];

export const orderSerialSearchType = [ //订单收款 模糊匹配
    {
        type: '订单编号',
        name: 'OrderNo'
    }, {
        type: '学生姓名',
        name: 'StudentName'
    }, {
        type: '收款单号',
        name: 'SerialNo'
    }, {
        type: '联系方式',
        name: 'ContactNo'
    }
];

export const orderCourse = [{ // 已选课程
    name: '课程性质',
    value: 'TeachingPlaceName',
    w: '100'
}, {
    name: '课时',
    value: 'Period',
    w: '70'
}, {
    name: '项目',
    value: 'courseTypeName',
    w: '75'

}, {
    name: '价格',
    value: 'sellPrise',
    w: '70'
}];
export const productPackageItem = [{ // 产品包列表
    name: '所属模块',
    value: 'ProductModuleName',
    w: '100'
}, {
    name: '课程性质',
    value: 'TeachingPlaceName',
    w: '100'
}, {
    name: '课时',
    value: 'Period',
    w: '80'
}, {
    name: '项目',
    value: 'CourseTypeName',
    w: '80'
}, {
    name: '价格',
    value: 'SellPrise',
    w: '80'
}];
export const progressText2 = [{ // 订单流程
    text: '客户信息确认',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isCustomerConfirm: true
}, {
    text: '选购课程及优惠',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isAddCourse: false
}, {
    text: '订单收款辅助',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
    isOrderAffirm: false
}, {
    text: '审核记录',
    currentLine: 'bar-line-current',
    currentDot: 'bar-dot-current',
    currentText: 'current-text',
}];
export const orderManageItem = [{
    label: '业绩所属人',
    prop: 'OrderOwnerName',
    w: '110'
}, {
    label: '最后支付时间',
    prop: 'LastPayTime',
    w: '121'
},{
    label: '订单来源',
    prop: 'Source',
    w: '110'
}, {
    label: '创建时间',
    prop: 'CreateTime',
    w: '115'
}, {
    label: '创建人',
    prop: 'Creator',
    w: '115'
}, {
    label: '线索编号',
    prop: 'ClueNo',
    w: '160'
}, {
    label: '上课校区',
    prop: 'SchoolArea',
    w: '115'
}, {
    label: '报名校区',
    prop: 'SignSchoolArea',
    w: '115'
}, ];

export const orderRefundSearchType = [ //订单退款 模糊匹配
    {
        type: '订单编号',
        name: 'OrderNo'
    }, {
        type: '学生姓名',
        name: 'StudentName'
    }, {
        type: '退款单号',
        name: 'SerialNo'
    }, {
        type: '联系方式',
        name: 'ContactNo'
    }
];