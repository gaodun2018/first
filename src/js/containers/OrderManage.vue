<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label">
                <div style="height: 35px">
                    <div class="FL">
                        <el-row>
                            <div style="display: inline-block;margin-right: 5px">
                                <el-form-item prop="OrderStatus">
                                    <el-select v-model="form.OrderStatus" clearable filterable placeholder="请选择订单状态" size="small" style="width: 130px" @change="onOrderSearchType">
                                        <el-option v-for="item in getOrderStatus" :key="item.Id" :label="item.Name" :value="item.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div style="display: inline-block;margin-right: 5px">
                                <el-form-item prop="TimeType">
                                    <el-select v-model="form.TimeType" filterable clearable placeholder="请选择创建时间" size="small" style="width: 130px" @change="onTimeType" @clear="clearTimeType">
                                        <el-option v-for="item in orderOption" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div style="display: inline-block;margin-right: 5px">
                                <el-form-item prop="Source">
                                    <el-select v-model="form.Source" clearable filterable placeholder="请选择订单来源" size="small" style="width: 140px" @change="onOrderSearchType">
                                        <el-option v-for="item in getOrderSource" :key="item.Id" :label="item.Name" :value="item.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <!-- <div style="display: inline-block;margin-right: 5px">                               
                                <Tree :width="'193px'" placeholder="请选择业绩所属人" :allSelected="selectOwnerChange" :callback="OwnerTree2" style=""></Tree>
                            </div> -->
                        </el-row>
                    </div>
                    <div class="FR">
                        <el-row>
                            <div class="clues-search">
                                <el-input v-model="form.orderSearchValue" placeholder="线索编号、订单编号、客户编号、手机、姓名" size="small" style='width: 328px;position: relative; z-index: 100' @focus="onFocusType" @blur="onBlurType">
                                    <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                                </el-input>
                                <el-button type="text" class="clues-button-search" @click="isSearch=!isSearch">{{!isSearch ? '高级搜索': '快捷搜索'}}</el-button>
                                <div class="clues-search-select" style="width: 280px" v-show="isSelect">
                                    <ul>
                                        <li v-for="(item, index) in SeachTypeItem" :key="index" :class='{"f-active": showType == index}' @click="orderSearchType(index)">
                                            <span class="search-type-name">{{item.type}} </span>
                                            <span class="search-type-text"> {{form.orderSearchValue}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-row>
                    </div>
                </div>
            </div>
            <div>
            <el-collapse-transition>
                <el-form v-if="isSearch" ref="form" :model="form" label-width="115px" style="width: 100%">
                    <div class="order-search-form">
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item prop="orderCreateTime" label="订单创建时间:">
                                    <el-date-picker v-model="form.orderCreateTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <div>
                                    <el-form-item label="创建人:">
                                        <Tree :width="'193px'" placeholder="请选择创建人" ref="resetCreate" :callback="creatorTree"></Tree>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item prop="OrderType" label="订单类型:">
                                    <el-select v-model="form.OrderType" size='small' clearable filterable style="width: 193px" @visible-change="onOrderType">
                                        <el-option v-for="item in selectOrderType" :key="item.Id" :label="item.Name" :value="item.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item prop="OrderStatus" label="订单状态:">
                                    <el-select v-model="form.OrderStatus" size='small' clearable filterable style="width: 193px">
                                        <el-option v-for="item in getOrderStatus" :key="item.Id" :label="item.Name" :value="item.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item prop="Source" label="订单来源:">
                                    <el-select v-model="form.Source" size='small' filterable clearable style="width: 193px">
                                        <el-option v-for="item in getOrderSource" :key="item.Id" :label="item.Name" :value="item.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item prop="orderApprove" label="审核时间:">
                                    <el-date-picker v-model="form.orderApprove" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <div>
                                    <el-form-item label="审核人:">
                                        <Tree :width="'193px'" placeholder="请选择审核人" ref="resetAudit" :callback="approverTree"></Tree>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item prop="AttendSchoolID" label="上课校区:">
                                    <el-select v-model="form.AttendSchoolID" filterable clearable size='small' style="width: 193px">
                                        <el-option v-for="school in getSchoolArea" :key="school.ID" :label="school.ProvinceName+'-'+school.CityName+'-'+school.SchoolName" :value="school.ID">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item prop="SignUpSchoolID" label="报名校区:">
                                    <el-select v-model="form.SignUpSchoolID" filterable clearable size='small' style="width: 193px">
                                        <el-option v-for="school in getSchoolArea" :key="school.ID" :label="school.ProvinceName+'-'+school.CityName+'-'+school.SchoolName" :value="school.ID">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item prop="expectClassTime" label="期望上课时间:">
                                    <el-date-picker v-model="form.expectClassTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <div>
                                    <el-form-item label="业绩所属人:">
                                        <Tree :width="'193px'" placeholder="请选择订单所属人" ref="resetOrder" :callback="OwnerTree"></Tree>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item prop="PayTime" label="最后支付时间:">
                                    <el-date-picker v-model="form.PayTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row style="text-align: right; margin-right: 40px">
                            <el-form-item>
                                <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onSearch">查询</el-button>
                                <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('form')">清除条件</el-button>
                            </el-form-item>
                        </el-row>
                    </div>
                </el-form>
            </el-collapse-transition>
            </div>
            <div class="clues-table">
                <el-table ref="multipleTable" v-loading="loading" border :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="orderList" style="width: 100%">
                    <el-table-column type="selection" align="right" fixed>
                    </el-table-column>
                    <el-table-column prop="StudentName" style="#676767" width="125" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column label="手机" style="#676767" width="150">
                        <template scope="scope">
                            <span>{{scope.row.Telphone}}</span>
                            <a v-if="scope.row.Telphone" href="javascript:void(0)" @click="callPhone(scope.$index, orderList)">
                                <i class="tracking-phone-icon"></i>
                            </a>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderNo" label="订单ID" style="#676767" width="155">
                    </el-table-column>
                    <el-table-column label="所购课程" align="left" width="160" style="#676767">
                        <template scope="scope">
                            <div v-for="item in scope.row.Courses" :key="item.ProductNo">
                                <div :class="item.IsPackage === 1 && 'product-package-icon'">
                                    <span style="padding-left: 20px;display: inline-block">{{item.ProductName}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderType" label="订单类型" width="110" style="#676767">
                    </el-table-column>
                    <el-table-column label="订单状态" width="110" style="#676767">
                        <template scope="scope">
                            <span>{{scope.row.OrderStatus}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单金额" width="125">
                        <template scope="scope">
                            <div class="price-font-1">
                                <span style="font-size: 14px" v-if="Number(scope.row.IsDeposit) === 1">¥{{scope.row.DepositAmount}}</span>
                                <span style="font-size: 14px" v-else>¥{{scope.row.SellPrice}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="已收金额" width="125">
                        <template scope="scope">
                            <span style="font-size: 14px" class="price-font-2" v-if="scope.row.ReceivablesPrice">¥{{scope.row.ReceivablesPrice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="item in orderManageItem" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.w">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="250" v-if="unlocking(['DD_UpdateOrder', 'DD_SubmitOrder', 'DD_Agreement', 'DD_OrderReceipt', 'DD_PushOrder', 'DD_CancelOrder', 'DD_SingleOrder', 'DD_OrderRefund'])">
                        <template scope="scope">
                            <div>
                                <span class="href-right" v-if="unlocking('DD_UpdateOrder')">
                                    <a :style="scope.row.CanEdit ? 'color: #20a0ff' : 'color:#bfcbd9;cursor: not-allowed'" target="_blank" v-bind:href="scope.row.CanEdit ? [`/#/order/modify?nid=539&nw=1&OrderNo=${orderList[scope.$index].OrderNo}&Guid=${orderList[scope.$index].ClueGuid}`] : 'javaScript:void(0)'">修改</a>
                                </span>
                                <el-button v-if="unlocking('DD_SubmitOrder')" type="text" size="small" :disabled="scope.row.OrderStatusId == 1000428 ? true : false" @click="onSubmitAudit(scope.$index, orderList)">提交</el-button>
                                <span class="href-left href-right" v-if="unlocking('DD_OrderDetail')">
                                    <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/order/audit?nid=539&nw=1&OrderNo=${orderList[scope.$index].OrderNo}&isDetails=true&CanEdit=${scope.row.CanEdit}`]">详情</a>
                                </span>
                                <span class="href-right" v-if="unlocking('DD_Agreement')" >
                                    <a style="color: #20a0ff" :href="[`/#/order/userfileupload?orderNo=${scope.row.OrderNo}`]" target="_blank">
                                        协议
                                    </a>
                                </span>
                                <el-button v-if="unlocking('DD_OrderReceipt')" type="text" size="small" :disabled="scope.row.OrderStatusId == 1000428 ? true : false" @click="onOrderGathering(scope.$index, orderList)">收款</el-button>
                                <div style="display: inline-block;margin-left: 5px" @mouseover="sharedCluesId(scope.$index, orderList)">
                                    <el-dropdown trigger="hover" @command="handleDropdownOrder">
                                        <el-button style="font-size: 12px" type="text" :disabled="scope.row.OrderStatusId == 1000428 ? true : false">
                                            更多
                                            <i class="el-icon-caret-bottom el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-if="unlocking('DD_PushOrder')" command="OrderPush">推送学管</el-dropdown-item>
                                            <el-dropdown-item v-if="unlocking('DD_CancelOrder')" command="CancelOrder">订单取消</el-dropdown-item>
                                            <el-dropdown-item v-if="unlocking('DD_SingleOrder')" command="OrderSplit">订单分单</el-dropdown-item>
                                            <el-dropdown-item v-if="unlocking('DD_OrderRefund')" command="OrderRefund">退款</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </div>
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
.order-manage .el-table__header-wrapper table thead tr th.el-table_1_column_5 .cell {
    padding-left: 40px;
}

.order-manage-dislog .el-dialog--small {
    width: 30%;
}

.order-manage-dislog .el-dialog__body {
    padding: 20px
}
.roder-content-label {
    position: relative;
}
.roder-content-label .el-form-item {
    margin-bottom: 10px;
}

.order-search-form .el-form-item {
    margin-bottom: 10px;
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
import { mapState, mapMutations } from 'vuex';
import { SeachTypeItem, orderManageItem } from '../components/common/orderConfig';
import { CRM_USER_INFO } from '../util/keys';
import { format, getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, checkedUserTree, getCallUp } from '../util/util';
import orderModal from 'vueModal';
import { OrderSearch, GetDictionaryByTypeId, GetSchoolAreaByID, CancelOrder, SaveReview, SubmitOrder, PushOrder } from '../api/order';
import { GetAllowedUserTree } from '../api/cluesManage';
import { GetOrderSplit } from '../api/OrderSplit';
import OrderRefundApply from "../components/order/OrderRefundApply.vue";
import OrderSplit from "../components/order/OrderSplit.vue";
import Tree from './Tree.vue';

export default {
    name: 'crm-order-manage',
    components: { Tree },
    data() {
        return {
            showType: 0,
            treeStatus: '',
            isSelect: false,
            isSearch: false,
            timer: null,
            loading: false,
            cluesTotal: 0,
            pageSize: 10,
            custonDate: [],
            currentPage: 1,
            personnel: [],
            orderManageItem, // 列表项
            SearchType: 1, // 搜索类型
            SeachTypeItem, // 搜索下来框
            getOrderStatus: [], // 订单状态
            getOrderSource: [], // 订单来源
            selectOrderType: [], // 订单类型
            getSchoolArea: [], // 获取上课校区
            getWeekStartDate: '', // 本周起
            getWeekEndDate: '', // 本周止
            getMonthStartDate: '', // 本月起
            getMonthEndDate: '', // 本月止
            creatorId: [], // 创建人
            approverId: [], // 审核人
            OwnerId: [], // 所属人
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
                TimeType: 1,
                OrderSelectStatus: '',
                orderSource: '',
                orderSearchValue: '',
                ClueOwerGetTime: '',
                orderCreateTime: [new Date(), new Date()],
                Creator: '',
                OrderType: '',
                OrderStatus: '',
                Source: '',
                orderApprove: '',
                AttendSchoolID: '',
                SignUpSchoolID: '',
                expectClassTime: '',                
                PayTime: ''
            },
            multipleSelection: [],
            orderList: [], // 列表数据
        }
    },
    methods: {
        onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.$refs.resetCreate.$emit('resetTree');
            this.$refs.resetAudit.$emit('resetTree');
            this.$refs.resetOrder.$emit('resetTree');
        },

        tableRowClassName(row, index) { // 选中列表行高亮显示
            for (let i = 0; i < this.multipleSelection.length; i++) {
                if (row.OrderNo === this.multipleSelection[i].OrderNo) {
                    return 'positive-row';
                }
            }
            return '';
        },
        handleSelectionChange(ClueGuid) { // 列表勾选
            this.multipleSelection = ClueGuid;
        },

        OwnerTree2(val) { // 人员树         
            this.OwnerId = val;            
        },
        selectOwnerChange() { 
            this.getOrderList();
        },

        callPhone(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Telphone, 0)
        },

        approverTree(val) { // 审核人
            this.approverId = val;
        },
        creatorTree(val) { // 创建人
            this.creatorId = val;
        },
        OwnerTree(val){//订单所属人
            this.OwnerId=val;
        },
        onOrderGathering(index, rows) {
            let studentInfo = {
                OrderNo: rows[index].OrderNo,
                StudentName: rows[index].StudentName,
                Telphone: rows[index].Telphone
            }
            require.ensure([], (require) => {
                let Gathering = require("../components/order/OrderModalGathering.vue");
                orderModal.openComponent(Gathering, {
                    title: '收款管理',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '750px',
                    studentInfo,
                    self: this,
                })
            }, 'gathering');
        },
        onSubmitAudit(index, rows) {
            const { OrderNo } = rows[index];
            this.$confirm(`确定将订单：${OrderNo} 提交客服审核？`, '提交审核', {
                confirmButtonText: '确定',
                type: 'warning',
            }).then(() => {
                SubmitOrder({ orderNo: OrderNo }).then(ret => {
                    if (ret.status === 0) {
                        this.$message({
                            message: '订单已成功提交',
                            type: 'success'
                        });
                    }
                })
            }).catch((v) => {
                // debugger;
            })

        },
        onQuickQuerys() { // 模糊搜索
            this.SearchType = 2;
            this.handleCurrentChange(1);
        },
        orderSearchType(type) { // 模糊搜索选择类
            this.showType = type;
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            clearTimeout(this.timer);
            this.isSelect = true;
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            this.timer = setTimeout(function () {
                self.isSelect = false;
            }, 500);
        },
        onTimeType(type) { // 时间类型
            new Promise((resolve, reject) => {
                switch (type) {
                    case 1:
                        resolve(this.form.orderCreateTime = [format(new Date()), format(new Date())]);
                        break;
                    case 2:
                        resolve(this.form.orderCreateTime = [this.getWeekStartDate, this.getWeekEndDate]);
                        break;
                    case 3:
                        resolve(this.form.orderCreateTime = [this.getMonthStartDate, this.getMonthEndDate]);
                        break;
                        resolve(this.form.orderCreateTime = '');
                    default:
                }
            }).then((value) => {
                this.SearchType = 1;
                this.handleCurrentChange(1);
            });
        },
        clearTimeType() { // 清空时间类型
            this.form.orderCreateTime = '';
            this.SearchType = 1;
            this.handleCurrentChange(1);
        },
        onOrderSearchType() { // 按类查询
            this.SearchType = 1;
            this.handleCurrentChange(1);
        },
        onSearch() { // 高级搜索
            this.SearchType = 3;
            this.handleCurrentChange(1);

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
        sharedCluesId(index, rows) { // 订单管理获取ID
            let OrderNo = {
                OrderNo: rows[index].OrderNo,
                StudentName: rows[index].StudentName,
                Telphone: rows[index].Telphone,
                ReceivablesPrice: rows[index].ReceivablesPrice,
                OrderStatusId:rows[index].OrderStatusId,
                DepositAmount:parseInt(rows[index].DepositAmount) > 0?rows[index].DepositAmount:rows[index].SellPrice
            };
            this.$store.dispatch('crmOrderNo', OrderNo);
        },
        handleDropdownOrder(command) { // 操作=>更多
            if (command == 'CancelOrder') { // 订单取消
                this.$confirm(`确定将订单：${this.orderNo.OrderNo} 取消？`, '订单取消', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    CancelOrder({ orderNo: this.orderNo.OrderNo }).then(ret => {
                        if (ret.status === 0) {
                            this.$message({
                                message: '取消成功',
                                type: 'success'
                            });
                        }
                    })
                })
            } else if (command == 'OrderPush') { // 订单推送
                this.$confirm(`确定将订单：${this.orderNo.OrderNo} 推送学管？提交请确认 !`, '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    PushOrder({ orderNo: this.orderNo.OrderNo }).then(ret => {
                        if (ret.status === 0) {
                            this.$message({
                                message: '订单已推送',
                                type: 'success'
                            });
                        }
                    })
                })
            }
            else if (command == 'OrderRefund') { //退款
                if(this.orderNo.ReceivablesPrice <= 0){
                    this.$message({
                        message: '已收金额为0，不能退款',
                        type: 'success'
                    });
                    return;
                }
                let orderApplyInfo = {
                    Id: 0,
                    OrderNo: this.orderNo.OrderNo,
                    StudentName: this.orderNo.StudentName,
                    StudentPhone: this.orderNo.Telphone,
                    ReceivablesPrice: this.orderNo.ReceivablesPrice,
                    RefundMode: 1001181,
                    RefundReason: 1001185,
                    RefundCode: '',
                    RefundAmount: 0,
                    RefundRemark: '',
                    AuditStage: 1001170
                };
                orderModal.openComponent(OrderRefundApply, {
                    title: '退款申请',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '950px',
                    height: '400px',
                    self: this,
                    orderApplyInfo: orderApplyInfo
                }, 'orderRefundApply')
            }
            else if (command === 'OrderSplit') {
                let me = this;
                if(this.orderNo.OrderStatusId==1000420){
                    this.$message({
                        message: '该订单不符合分单要求',
                        type: 'success'
                    });
                    return;
                }
                GetOrderSplit({OrderNo:this.orderNo.OrderNo}).then(ret=>{
                    if (ret.status === 0) {
                        let SplitInfo=[];

                        for (let i in ret.result){
                            let data = ret.result[i];
                            let splitUser = [];
                            for (let j in data.UserNode){
                                splitUser.push(data.UserNode[j]);
                            }
                            let info = {
                                ID:data.ID,
                                OrderNo:data.OrderNo,
                                Title:i==='0'?'原销售':'分单销售',
                                IsOwner:i==='0',
                                SplitUser:splitUser,
                                Proportion:data.Proportion
                            };

                            SplitInfo.push(info);
                        }
                        //分单弹窗
                        orderModal.openComponent(OrderSplit, {
                            title: '订单分单',
                            showCancelButton: false,
                            showConfirmButton: false,
                            width: '950px',
                            self: me,
                            OrderNo:me.orderNo.OrderNo,
                            Amount:me.orderNo.DepositAmount,
                            SplitInfo:SplitInfo
                        }, 'OrderSplit')
                    }
                });

            }
        },
        // 订单管理列表接口
        getOrderList(
        ) {
            this.loading = true;
            const {
                TimeType,
                OrderSelectStatus,
                orderSource,
                orderSearchValue,
                ClueOwerGetTime,
                orderCreateTime,
                OrderType,
                OrderStatus,
                Source,
                orderApprove,
                AttendSchoolID,
                SignUpSchoolID,
                expectClassTime,
                PayTime
                 } = this.form;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    Creator: this.personnel,
                    SearchWay: this.showType,
                    Source,
                    AttendSchoolID,
                    CreateBegin: orderCreateTime ? format(orderCreateTime[0]) : '',
                    CreateEnd: orderCreateTime ?  format(orderCreateTime[1]) : '',
                    ShortCutSearch: orderSearchValue,
                    TimeType,
                    ExpectBegin: format(expectClassTime[0]),
                    ExpectEnd: format(expectClassTime[1]),
                    SignUpSchoolID,
                    Approver: this.approverId,
                    ApproveBegin: format(orderApprove[0]),
                    ApproveEnd: format(orderApprove[1]),
                    OrderStatus,
                    OrderType,
                    Creator: this.creatorId,
                    SearchType: this.SearchType,
                    PayTimeBegin: format(PayTime[0]),
                    PayTimeEnd: format(PayTime[1]),
                    Owner:this.OwnerId
                }
            }
            OrderSearch(params).then(ret => {
                if (ret.status === 0) {
                    this.orderList = ret.result.Body;
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