<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label">
                <div>
                    <el-row style="height: 35px; line-height: 35px">
                        <el-col :sm="12">
                            <Gtree width="200px" ref="gtree" :data="Gtree" :value="personnel" :onCheck="onCheck" placeholder="请选择人员"></Gtree>
                             <!--<Tree :width="'193px'" placeholder="请选择人员" :allSelected="selectChange" :callback="personnelTree"></Tree>-->
                        </el-col>
                        <el-col :sm="12">
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
                    <el-table-column label="订单金额" min-width="125">
                        <template scope="scope">
                            <div class="price-font-1">
                                <span style="font-size: 14px" v-if="Number(scope.row.IsDeposit) === 1">¥{{scope.row.DepositAmount}}</span>
                                <span style="font-size: 14px" v-else>¥{{scope.row.SellPrice}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="已收金额" min-width="125">
                        <template scope="scope">
                            <span style="color: #71c0a5" v-if="scope.row.ReceivablesPrice">¥{{scope.row.ReceivablesPrice}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Source" min-width="115" label="订单来源" style="#676767">
                    </el-table-column>
                    <el-table-column prop="CreateTime" min-width="115" label="创建时间" style="#676767">
                    </el-table-column>
                    <el-table-column prop="Creator" label="创建人" min-width="125" style="#676767">
                    </el-table-column>
                    <el-table-column prop="ClueNo" min-width="165" label="线索编号" style="#676767">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" min-width="200" v-if="unlocking(['MYDJ_UpdateOrde', 'MYDJ_OrderReceipt', 'MYDJ_OrderRenfund_Apply', 'MYDJ_OrderDetail', 'MYDJ_CancelOrder'])">
                        <template scope="scope">
                            <a v-if="unlocking('MYDJ_UpdateOrde')" class="href-right" :style="scope.row.CanEdit ? 'color: #20a0ff' : 'color:#bfcbd9;cursor: not-allowed'" target="_blank" v-bind:href="scope.row.CanEdit ? [`/#/order/modify?NavigationId=539&nw=1&OrderNo=${orderList[scope.$index].OrderNo}&Guid=${orderList[scope.$index].ClueGuid}`] : 'javaScript:void(0)'">修改</a>
                            <el-button type="text" :disabled="scope.row.OrderStatusId == 1000428 ? true : false" size="small" v-if="unlocking('MYDJ_OrderReceipt')" @click="onOrderGathering(scope.$index, orderList)">收款</el-button>
                            <el-button style="margin-right: 5px" type="text" :disabled="scope.row.OrderStatusId == 1000428 ? true : false" size="small" v-if="unlocking('MYDJ_OrderRenfund_Apply')" @click="OrderRefund(scope.$index, orderList)">退款</el-button>
                            <span class="href-right" v-if="unlocking('MYDJ_OrderDetail')">
                                <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/order/audit?NavigationId=539&nw=1&OrderNo=${orderList[scope.$index].OrderNo}&isDetails=true&CanEdit=${scope.row.CanEdit}`]">详情</a>
                            </span>
                            <el-button type="text" :disabled="scope.row.OrderStatusId == 1000428 ? true : false" size="small" v-if="unlocking('MYDJ_CancelOrder')" @click="onCancel(scope.$index, orderList)">取消</el-button>
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
import { orderSeachType } from '../common/orderConfig';
import { format, getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, getCallUp } from '../../util/util';
import orderModal from 'vueModal';
import { CancelOrder } from '../../api/order';
import { queryDeposit } from '../../api/orderPaySerial';
import { GetAllowedUserTree } from '../../api/cluesManage';
import Tree from '../../containers/Tree.vue';
import OrderRefundApply from "./OrderRefundApply.vue";
import Gtree from '../../plugins/tree/ExtendZTree.vue';
import { CRM_USER_INFO } from '../../util/keys';
export default {
    components: { Tree,Gtree},
    data() {
        return {
            personnel: [], // 查询人员
            isSelect: false,
            isSearch: false,
            loading: false,
            cluesTotal: 0,
            pageSize: 10,
            custonDate: [],
            currentPage: 1,
            SearchType: 1, // 搜索类型
            orderSeachType, // 搜索下来框
            form: {
                orderSearchValue: ''
            },
            multipleSelection: [],
            orderList: [], // 列表数据
            Gtree: [

            ],
            userInfo:{},
        }
    },
    methods: {
        async onGetUserTree() {
            let ret = await GetAllowedUserTree({ userId: this.userInfo.UserId });
            if (ret.status === 0) {
                this.Gtree = ret.result;
            }
        },
        onCheck(values,ids) {
            this.personnel = ids;
            this.getOrderList();
            //this.$refs.gtree.getCheckedNodes();
           /* let treeObj = $(`#${id}`).zTree('getZTreeObj');
            var nodes = treeObj.getCheckedNodes(true);*/
        },
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
                    width: '750px',
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
                        this.$message({
                            message: '取消成功',
                            showClose: true,
                            type: 'success'
                        });
                    }
                })
            })
        },
        onQuickQuerys() { // 模糊搜索
            this.handleCurrentChange(1);
        },
        orderSearchType(type) { // 模糊搜索选择类
            this.SearchType = type + 1;
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            this.isSelect = true;
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
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            setTimeout(function() {
                self.isSelect = false;
            }, 500);
        },
        sharedCluesId(index, rows) { // 订单管理获取ID
            let OrderNo = {
                OrderNo: rows[index].OrderNo,
            }
            this.$store.dispatch('crmOrderNo', OrderNo);
        },
        // 订单管理列表接口
        getOrderList() {
            this.loading = true;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    Users: this.personnel,
                    SearchType: this.SearchType,
                    SearchContent: this.form.orderSearchValue,
                    IsDeposit: 1
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
        OrderRefund(index, rows){
            var data = rows[index];
            if(data.ReceivablesPrice<=0){
                this.$message({
                    message: '已收金额为0，不能退款',
                    showClose: true,
                    type: 'success'
                });
                return;
            }
            let orderApplyInfo = {
                Id: 0,
                OrderNo: data.OrderNo,
                StudentName: data.StudentName,
                StudentPhone: data.Telphone,
                ReceivablesPrice: data.ReceivablesPrice,
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
    },
    computed: {
        ...mapState({ // 操作更多时获取订单ID
            orderNo: state => {
                return state.order.crmOrderNo
            }
        }),
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
        this.getOrderList(); // 获取订单列表接口
        this.onGetUserTree();
    },
    mounted() {

    }
}
</script>