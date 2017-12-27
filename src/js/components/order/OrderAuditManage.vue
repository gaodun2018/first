<template>
    <div class="module-clues-content order-audit-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label">
                <div>
                    <el-row>
                        <el-col :sm="13" v-show="!isSearch">
                            <el-row>
                                <div class="order-type-search">
                                    <el-form-item>
                                        <el-select v-model="form.OrderStatus" filterable clearable placeholder="请选择订单状态" size="small" style="width: 140px" @change="onOrderSearchType">
                                            <el-option label="待审核" value="1000424">
                                            </el-option>
                                            <el-option label="审核退回" value="1000425">
                                            </el-option>
                                            <el-option label="审核通过" value="1000426">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="order-type-search">
                                    <el-form-item>
                                        <el-select v-model="form.TimeType" filterable clearable placeholder="请选择提交时间" size="small" style="width: 140px" @change="onTimeType" @clear="clearTimeType">
                                            <el-option v-for="item in orderOption" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="order-type-search">
                                    <el-form-item>
                                            <el-select v-model="form.CourseType" filterable clearable size='small' style="width: 140px" placeholder="请选择" @visible-change="onCourseType" @change="onOrderSearchType">
                                                <el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                                </el-option>
                                            </el-select>
                                    </el-form-item>
                                </div>
                            </el-row>
                        </el-col>
                        <el-col :sm="11" style="text-align: right; float: right">
                            <el-row>
                                <div class="clues-search">
                                    <el-input v-model="form.orderAuditVal" placeholder="订单编号、线索编号、手机、姓名" size="small" style='width: 265px;position: relative; z-index: 100' @focus="orderAuditFocusType" @blur="orderAuditBlurType">
                                        <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                                    </el-input>
                                    <el-button type="text" class="clues-button-search" @click="isSearch = !isSearch">{{!isSearch ? '高级搜索': '快捷搜索'}}</el-button>
                                    <div class="clues-search-select" style="width: 217px" v-show="isSelect">
                                        <ul>
                                            <li v-for="(item, index) in orderSeachType" :key="index" :class='{"f-active": showType == index}' @click="orderAuditSearchType(orderSeachType[index].name, index)">
                                                <span class="search-type-name">{{item.type}} </span>
                                                <span class="search-type-text"> {{form.orderAuditVal}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div>
                <el-collapse-transition>
                    <el-form v-if="isSearch" ref="form" :model="form" label-width="100px">
                        <div class="order-search-form">
                            <el-row>
                                <el-col :sm="8">
                                    <el-form-item prop="SubStime" label="提交时间:">
                                        <el-date-picker v-model="form.SubStime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :sm="8">
                                    <el-form-item prop="CheckStime" label="审核时间:">
                                        <el-date-picker v-model="form.CheckStime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :sm="8">
                                    <div>
                                        <el-form-item label-width="100px" label="创建人:">
                                            <Tree :width="'193px'" placeholder="请选择创建人" ref="resetCreate" :callback="creatorTree"></Tree>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :sm="8">
                                    <el-form-item prop="OrderStatus" label="订单状态:">
                                        <el-select v-model="form.OrderStatus" filterable clearable size='small' style="width: 193px">
                                            <el-option label="待审核" value="1000424">
                                            </el-option>
                                            <el-option label="审核退回" value="1000425">
                                            </el-option>
                                            <el-option label="审核通过" value="1000426">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :sm="8">
                                    <div>
                                        <el-form-item label-width="100px" label="审核人:">
                                            <Tree :width="'193px'" placeholder="请选择审核人" ref="resetAudit" :callback="approverTree"></Tree>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :sm="8">
                                    <el-form-item prop="CourseType" label="项目:">
                                        <el-select v-model="form.CourseType" filterable clearable class="tracking-text-font" size='small' style="width: 193px" placeholder="请选择" @visible-change="onCourseType">
                                            <el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row style="text-align: right; margin-right: 40px">
                                <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onSearch">查询</el-button>
                                <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('form')">清除条件</el-button>
                            </el-row>
                        </div>
                    </el-form>
                </el-collapse-transition>
            </div>
            <div class="clues-table">
                <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="orderAuditList" style="width: 100%">
                    <el-table-column type="selection" align="right" fixed>
                    </el-table-column>
                    <el-table-column prop="stuName" style="#676767" min-width="125" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column label="手机" style="#676767" min-width="150">
                        <template scope="scope">
                            <span>{{scope.row.telphone}}</span>
                            <a v-if="scope.row.telphone" href="javascript:void(0)" @click="callPhone(scope.$index, orderAuditList)">
                                <i class="tracking-phone-icon"></i>
                            </a>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderNo" label="订单ID" style="#676767" min-width="155">
                    </el-table-column>
                    <el-table-column label="所购课程" style="#676767" min-width="165">
                        <template scope="scope">
                            <div v-for="item in scope.row.CourseList" :key="item.ProductNo">
                                <div :class="item.IsPackage == 1 && 'product-package-icon'">
                                    <span style="padding-left: 20px;display: inline-block">{{item.ProductName}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="优惠" style="#676767" min-width="160">
                        <template scope="scope">
                            <p v-for="item in scope.row.discountList" :key="item">
                                <span>{{item}}</span>
                            </p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderTypeName" label="订单类型" min-width="110" style="#676767">
                    </el-table-column>
                    <el-table-column prop="orderStatusName" label="订单状态" min-width="110" style="#676767">
                    </el-table-column>
                    <el-table-column label="订单金额" min-width="125">
                        <template scope="scope">
                            <span style="font-size: 14px" class="price-font-1">¥{{Number(scope.row.sellPrise-scope.row.discountPrise).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="已收金额" min-width="125">
                        <template scope="scope">
                            <span style="font-size: 14px" class="price-font-2">¥{{(scope.row.receivePrise).toFixed(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="item in orderAuditItem" :key="item.prop" :prop="item.prop" :label="item.label" style="#676767" :min-width="item.w">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="190" v-if="unlocking(['DSH_OrderDetail', 'DSH_Agreement', 'DSH_OrderReview'])">
                        <template scope="scope">
                                <span class="href-right" v-if="unlocking('DSH_OrderDetail')">
                                    <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/order/audit?nid=539&nw=1&OrderNo=${orderAuditList[scope.$index].orderNo}&isDetails=true&CanEdits=${scope.row.orderStatus}`]">详情</a>
                                </span>
                                <span class="href-right" v-if="unlocking('DSH_Agreement')">
                                     <a style="color: #20a0ff" :href="[`/#/order/userfileupload?orderNo=${scope.row.orderNo}`]" target="_blank">
                                        协议
                                    </a>
                                </span>
                                <span class="href-right" v-if="unlocking('DSH_OrderReview')">
                                    <a :style="scope.row.orderStatus === 1000424 ? 'color: #20a0ff' : 'color:#bfcbd9;cursor: not-allowed'" target="_blank" v-bind:href="scope.row.orderStatus === 1000424 ? [`/#/order/audit?nid=539&nw=1&OrderNo=${orderAuditList[scope.$index].orderNo}&Guid=${orderAuditList[scope.$index].clueGuid}`] : 'javaScript:void(0)'">审核</a>
                                </span>
                                <el-dropdown trigger="hover" @command="handleDropdownOrder">
                                    <span @mouseover="sharedCluesId(scope.$index, orderAuditList)">
                                        更多
                                        <i class="el-icon-caret-bottom el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="CancelOrder">关联客户</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="clues-pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                    </el-pagination>
                </div>
            </div>
        </el-form>
    </div>
</template>
<style>
.order-audit-manage .el-table__header-wrapper table thead tr th.el-table_1_column_5 .cell {
    padding-left: 40px;
}
.roder-content-label .el-form-item {
    margin-bottom: 10px;
}
.order-audit-manage .el-form-item {
    margin-bottom: 10px;
}
.order-audit-manage .order-type-search .el-form-item{
    margin-bottom: 0;
}
.clues-bnt-item .tracking-text-font .el-form-item__label {
    padding: 11px 0 11px 0;
}
.el-dropdown {
    font-size: 12px;
    color: #20a0ff;
}

.el-button-border {
    padding-right: 5px;
    border-right: 1px solid #20a0ff;
    border-radius: inherit;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import orderModal from 'vueModal';
import { format, trim, getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, checkedUserTree, getCallUp } from '../../util/util';
import { orderSeachType } from '../common/orderConfig';
import { CRM_USER_INFO } from '../../util/keys';
import Tree from '../../containers/Tree.vue';
import { OrderCheckSearch, GetDictionaryByTypeId, GetSchoolAreaByID, CancelOrder, SaveReview, OrderFuzzyCheckSearch } from '../../api/order';
import { interestedProject } from '../../api/cluesManage';

export default {
    name: 'crm-order-audit-manage',
    components: { Tree },
    data() {
        return {
            treeStatus: '',
            showType: 0,
            isSelect: false,
            isSearch: false,
            loading: false,
            timer: null,
            cluesTotal: 0,
            pageSize: 10,
            custonDate: [],
            currentPage: 1,
            paramsObj: {},
            orderWhere: {},
            SeachType: '', // 模糊搜索类型
            interestedProject: [], // 感兴趣的项目
            SearchType: 1, // 搜索类型
            getOrderStatus: [], // 订单状态
            getOrderSource: [], // 订单来源
            selectOrderType: [], // 订单类型
            getSchoolArea: [], // 获取上课校区
            getWeekStartDate: '', // 本周起
            getWeekEndDate: '', // 本周止
            getMonthStartDate: '', // 本月起
            getMonthEndDate: '', // 本月止
            orderSeachType, // 搜索下来框
            creatorId: [], // 创建人
            approverId: [], // 审核人
            orderOption: [{
                label: '今日',
                value: 1
            }, {
                label: '本周',
                value: 2
            }, {
                label: '本月',
                value: 3
            }],
            form: {
                SubStime: '',
                CheckStime: '',
                CourseType: '',
                OrderStatus: '1000424',
                OrderType: '',
                orderAuditVal: '',
                Source: '',
                TimeType: '',
            },
            orderAuditItem: [
                {
                    prop: 'SubTime',
                    label: '提交时间',
                    w: '115'
                }, {
                    prop: 'creatorName',
                    label: '提交人',
                     w: '100'
                }, {
                    prop: 'Create_Time',
                    label: '创建时间',
                     w: '115'
                }, {
                    prop: 'creatorName',
                    label: '创建人',
                     w: '100'
                }, {
                    prop: 'courseTypeName',
                    label: '项目',
                     w: '100'
                }, {
                    prop: 'clueNo',
                    label: '线索编号',
                     w: '160'
                }
            ],
            multipleSelection: [],
            orderAuditList: [], // 列表数据
        }
    },
    methods: {
        onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.$refs.resetCreate.$emit('resetTree');
            this.$refs.resetAudit.$emit('resetTree');
        },

         tableRowClassName(row, index) { // 选中列表行高亮显示
            for (let i = 0; i < this.multipleSelection.length; i++) {
                if (row.orderNo === this.multipleSelection[i].orderNo) {
                    return 'positive-row';
                }
            }
            return '';
        },
        handleSelectionChange(orderNo) { // 列表勾选
            this.multipleSelection = orderNo;
        },
        
        callPhone(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].telphone, 0)
        },

        approverTree(val) { // 审核人
            this.approverId = val;
        },
        creatorTree(val) { // 创建人
            this.creatorId = val;
        },

        onQuickQuerys() { // 模糊搜索
            if (trim(this.form.orderAuditVal)) {
                this.getOrderFuzzyCheckSearch();
            } else {
                this.handleCurrentChange(1);
            }
        },
        async getOrderFuzzyCheckSearch(params = {
            Where: {
                OrderNo: this.form.orderAuditVal,
            },
        }) {
            let objPage = { 
                PageIndex: this.currentPage,
                PageSize: this.pageSize
            }
            let orderWhere = this.orderWhere;
            let objParams = Object.assign(objPage, orderWhere.Where ? orderWhere : params);
            let ret = await OrderFuzzyCheckSearch(objParams)
            if (ret.status === 0) {
                this.orderAuditList = ret.result.Body;
                this.cluesTotal = ret.result.Count;
                this.loading = false;
            } else {
                this.loading = false;
            }
        },
        onOrderSearchType(v) { // 按类查询
            this.SearchType = 1;
            this.handleCurrentChange(1);
        },
        onSearch() { // 高级搜索
            this.SearchType = 3;
            this.handleCurrentChange(1);

        },
        orderAuditSearchType(type, index) { // 模糊搜索选择类
            this.showType = index;
            this.orderWhere = {
                Where: {
                    [type]: this.form.orderAuditVal
                },
            };
        },
        orderAuditFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            clearTimeout(this.timer);
            this.isSelect = true;
        },
        orderAuditBlurType() { // 隐藏线索类型选择框
            const self = this;
            this.timer = setTimeout(function () {
                self.isSelect = false;
            }, 500);
        },
        onTimeType(type) { // 时间类型
            new Promise((resolve, reject) => {
                switch (type) {
                    case 1:
                        resolve(this.form.SubStime = [format(new Date()), format(new Date())]);
                        break;
                    case 2:
                        resolve(this.form.SubStime = [this.getWeekStartDate, this.getWeekEndDate]);
                        break;
                    case 3:
                        resolve(this.form.SubStime = [this.getMonthStartDate, this.getMonthEndDate]);
                        break;
                        resolve(this.form.SubStime = '');
                    default:
                }
            }).then((value) => {
                this.getOrderList();
            });
        },
        clearTimeType() { // 清空时间类型
            this.form.SubStime = '';
            this.getOrderList();
        },
        onOrderType(even) { // 订单类型
            if (even) {
                GetDictionaryByTypeId({ dicType: '10035' }).then(ret => {
                    if (ret.status === 0) {
                        this.selectOrderType = ret.result;
                    }
                })
            }
        },
        onCourseType(even) { // 感兴趣的项目接口
            if (even) {
                interestedProject().then(ret => {
                    if (ret.status === 0) {
                        this.interestedProject = ret.result;
                    }
                })
            }
        },
        sharedCluesId(index, rows) { // 订单管理获取ID
            let OrderNo = {
                OrderNo: rows[index].OrderNo,
            }
            this.$store.dispatch('crmOrderNo', OrderNo);
        },
        handleDropdownOrder(command) { // 操作=>更多            
            if (command == 'CancelOrder') {
                alert('暂无');
                // CancelOrder({ orderNo: this.orderNo.OrderNo }).then(ret => {
                //     if (ret.status === 0) {
                //         Message({
                //             message: '取消成功',
                //             type: 'success'
                //         });
                //     }
                // })
            }
        },
        // 订单管理列表接口
        getOrderList(
        ) {
            this.loading = true;
            const {
                Source,
                TimeType,
                SubStime,
                CheckStime,
                OrderStatus,
                CourseType,
                CheckerList,
                orderAuditVal,
                OrderType } = this.form;
            this.paramsObj = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    ShortCutSearch: orderAuditVal,
                    SubStime: format(SubStime[0]),
                    SubEtime: format(SubStime[1]),
                    CheckStime: format(CheckStime[0]),
                    CheckEtime: format(CheckStime[1]),
                    OrderStatus,
                    CourseType,
                    CreateIDList: this.creatorId,
                    CheckerList: this.approverId,
                    Source,
                    TimeType,
                    // SearchType: 2
                }
            }
            OrderCheckSearch(this.paramsObj).then(ret => {
                if (ret.status === 0) {
                    this.orderAuditList = ret.result.Body;
                    this.cluesTotal = ret.result.Count;
                    this.loading = false;
                } else {
                    this.loading = false;
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            // if(flag){return;}
            this.getOrderList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.getOrderList();
        },
        // onAgreement(index, rows) {
        //     require.ensure([], (require) => {
        //         let Agreement = require("./OrderModalAgreement.vue");
        //         orderModal.openComponent(Agreement, {
        //             title: '相关协议',
        //             showCancelButton: false,
        //             showConfirmButton: false,
        //             OrderNo: rows[index].orderNo,
        //             width: '550px',
        //             self: this,
        //         })
        //     }, 'agreement');
        // },
    },
    computed: {
        ...mapState({ // 操作更多时获取订单ID
            orderNo: state => {
                return state.order.crmOrderNo
            }
        }),
    },
    created() {
        this.getWeekStartDate = getWeekStartDate(), // 本周起
            this.getWeekEndDate = getWeekEndDate(), // 本周止
            this.getMonthStartDate = getMonthStartDate(), // 本月起
            this.getMonthEndDate = getMonthEndDate(), // 本月止

            this.getOrderList(); // 获取订单列表接口
        GetDictionaryByTypeId({ dicType: '10036' }).then(ret => {  // 订单状态
            if (ret.status === 0) {
                this.getOrderStatus = ret.result;
            }
        });
        GetDictionaryByTypeId({ dicType: '10037' }).then(ret => {  // 订单来源
            if (ret.status === 0) {
                this.getOrderSource = ret.result;
            }
        });
        GetSchoolAreaByID().then(ret => { // 获取所有校区
            if (ret.status === 0) {
                this.getSchoolArea = ret.result;
            }
        });
    }
}
</script>