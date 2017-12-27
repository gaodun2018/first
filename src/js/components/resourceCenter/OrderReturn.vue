<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label">
                <div>
                    <el-row style="height: 35px; line-height: 35px">
                        <el-col :sm="12">
                            <Tree :width="'193px'" placeholder="请选择创建人员" :allSelected="selectChange" :callback="personnelTree"></Tree>
                        </el-col>
                        <el-col :sm="12">
                            <el-row>
                                <div class="clues-search">
                                    <el-input v-model="form.orderSearchValue" placeholder="订单ID、学生姓名、手机、线索ID" size="small" style='width: 265px;position: relative; z-index: 100' @focus="onFocusType" @blur="onBlurType">
                                        <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                                    </el-input>
                                        <div class="clues-search-select" style="width: 263px" v-show="isSelect">
                                        <ul>
                                            <li v-for="(item, index) in orderSeachType" :key="index" :class='{"f-active": SearchType == index+1}' @click="orderSearchType(index)">
                                                <span class="search-type-name">{{item.type}} </span>
                                                <span class="search-type-text"> {{form.orderSearchValue}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="clues-table">
                <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="orderList" style="width: 100%">
                    <el-table-column type="selection" align="right" fixed>
                    </el-table-column>
                    <el-table-column prop="StudentName" style="#676767" min-width="125" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column label="手机" style="#676767" min-width="150">
                        <template scope="scope">
                            <span>{{scope.row.Telphone}}</span>
                            <a v-if="scope.row.Telphone" href="javascript:void(0)" @click="callPhone(scope.$index, orderList)">
                                <i class="tracking-phone-icon"></i>
                            </a>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderNo" label="订单ID" style="#676767" min-width="155">
                    </el-table-column>
                    <el-table-column prop="CourseType" label="项目" style="#676767" min-width="125">
                    </el-table-column>
                    <el-table-column label="所购课程" min-width="160" style="#676767">
                        <template scope="scope">
                            <div v-for="item in scope.row.Courses" :key="item.ProductNo">
                                <div :class="item.IsPackage === 1 && 'product-package-icon'">
                                    <span style="padding-left: 20px;display: inline-block">{{item.ProductName}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderType" label="订单类型" min-width="115" style="#676767">
                    </el-table-column>
                    <el-table-column prop="OrderStatus" label="订单状态" min-width="115" style="#676767">
                    </el-table-column>
                    <el-table-column label="订单金额" min-width="120">
                        <template scope="scope">
                            <div class="price-font-1">
                                <span style="font-size: 14px" v-if="Number(scope.row.IsDeposit) === 1">¥{{scope.row.DepositAmount}}</span>
                                <span style="font-size: 14px" v-else>¥{{scope.row.SellPrice}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="已收金额" min-width="120">
                        <template scope="scope">
                            <span style="font-size: 14px" class="price-font-2" v-if="scope.row.ReceivablesPrice">¥{{scope.row.ReceivablesPrice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderOwnerName" min-width="115" label="业绩所属人" style="#676767">
                    </el-table-column>
                    <el-table-column prop="LastPayTime" min-width="121" label="最后支付时间" style="#676767">
                    </el-table-column>
                    <el-table-column prop="Source" min-width="115" label="订单来源" style="#676767">
                    </el-table-column>
                    <el-table-column prop="CreateTime" min-width="115" label="创建时间" style="#676767">
                    </el-table-column>
                    <el-table-column prop="Creator" label="创建人" min-width="115" style="#676767">
                    </el-table-column>
                    <el-table-column prop="ClueNo" min-width="160" label="线索编号" style="#676767">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" min-width="155" v-if="unlocking(['RetOrder_UpdateOrde', 'RetOrder_SubmitOrder', 'RetOrder_OrderDetail'])">
                        <template scope="scope">
                            <span v-if="unlocking('RetOrder_UpdateOrde')" class="href-right">
                                <a :style="scope.row.CanEdit ? 'color: #20a0ff' : 'color:#bfcbd9;cursor: not-allowed'" target="_blank" v-bind:href="scope.row.CanEdit ? [`/#/order/modify?NavigationId=539&nw=1&OrderNo=${orderList[scope.$index].OrderNo}&Guid=${orderList[scope.$index].ClueGuid}`] : 'javaScript:void(0)'">修改</a>
                            </span>
                            <el-button type="text" size="small" v-if="unlocking('RetOrder_SubmitOrder')" @click="onSubmitAudit(scope.$index, orderList)">提交</el-button>
                            <span class="href-left" v-if="unlocking('RetOrder_OrderDetail')">
                                <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/order/audit?NavigationId=539&nw=1&OrderNo=${orderList[scope.$index].OrderNo}&isDetails=true&CanEdit=${scope.row.CanEdit}`]">详情</a>
                            </span>
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
.order-manage-dislog .el-dialog--small {
    width: 30%;
}

.order-manage-dislog .el-dialog__body {
    padding: 20px
}

.roder-content-label .el-form-item {
    margin-bottom: 10px;
}

.order-search-form .el-form-item {
    margin-bottom: 10px;
}

.order-manage .cell-reset-padding {
    margin-right: -12px
}

.clues-bnt-item .tracking-text-font .el-form-item__label {
    padding: 11px 0 11px 0;
}

.el-dropdown {
    font-size: 12px;
    color: #20a0ff;
}

</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { orderSeachType } from '../common/orderConfig';
import { format, getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, getCallUp } from '../../util/util';
import orderModal from 'vueModal';
import Tree from '../../containers/Tree.vue';
import { CancelOrder,SubmitOrder } from '../../api/order';
import { queryDeposit } from '../../api/orderPaySerial'

export default {
    components: { Tree },
    data() {
        return {
            personnel: [],
            isSelect: false,
            isSearch: false,
            loading: false,
            cluesTotal: 0,
            pageSize: 10,
            custonDate: [],
            currentPage: 1,
            SearchType: 1, // 搜索类型
            orderSeachType, // 搜索下拉框
            form: {
                orderSearchValue: '',
                oStatus: 1000425
            },
            multipleSelection: [],
            orderList: [], // 列表数据
        }
    },
    methods: {

        callPhone(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Telphone, 0)
        },

        personnelTree(val) { // 人员树
            this.personnel = val;
        },
        selectChange() {
            this.getOrderList();
        },

        tableRowClassName(row, index) { // 选中列表行高亮显示
            for (let i = 0; i < this.multipleSelection.length; i++) {
                if (row.ClueGuid === this.multipleSelection[i].ClueGuid) {
                    return 'positive-row';
                }
            }
            return '';
        },
        handleSelectionChange(guid) { // 列表勾选
            this.multipleSelection = guid;
        },

        onOrderGathering(index, rows) {
            let studentInfo = {
                OrderNo: rows[index].OrderNo,
                StudentName: rows[index].StudentName,
                Telphone: rows[index].Telphone
            }
            require.ensure([], (require) => {
                let Gathering = require("../order/OrderModalGathering.vue");
                orderModal.openComponent(Gathering, {
                    title: '收款管理',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '550px',
                    studentInfo,
                    self: this,
                })
            }, 'gathering');
        },
        onCancel(index, rows) {
            let orderNo = rows[index].OrderNo;
            this.$confirm(`确定将订单：${orderNo} 取消？`, '订单取消', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                CancelOrder({ orderNo: orderNo }).then(ret => {
                    if (ret.status === 0) {
                        Message({
                            message: '取消成功',
                            type: 'success'
                        });
                    }
                })
            })
        },
        onQuickQuerys() { // 模糊搜索
            this.handleCurrentChange(1);
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            this.isSelect = true;
        },
        orderSearchType(type) { // 模糊搜索选择类
            this.SearchType = type+1;
        },
        sharedCluesId(index, rows) { // 订单管理获取ID
            let OrderNo = {
                OrderNo: rows[index].OrderNo,
            }
            this.$store.dispatch('crmOrderNo', OrderNo);
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            setTimeout(function() {
                self.isSelect = false;
            }, 500);
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
            }).catch((v)=>{
                // debugger;
            })

        },
        // 订单管理列表接口
        getOrderList(
        ) {
            this.loading = true;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    Users:this.personnel,
                    SearchType: this.SearchType,
                    SearchContent: this.form.orderSearchValue,
                    OrderStatus: this.form.oStatus
                }
            }
            queryDeposit(params).then(ret => {
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
    mounted: function () {
        this.getOrderList(); // 获取订单列表接口
    },
    created() {

    }
}
</script>