<template>
    <div class="module-clues-content  order-manage">
      <div>
            <el-form ref="ruleForm" :model="ruleForm">
                <div class="roder-content-label">
                    <div>
                        <el-row>
                            <el-col :sm="24">
                                <el-row>
                                    <div class="clues-search">
                                        <el-input v-model="ruleForm.SearchContent" placeholder="订单编号、学生姓名、退款单号、联系方式" size="small" style='width: 328px;position: relative; z-index: 100' @focus="onFocusType" @blur="onBlurType">
                                            <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                                        </el-input>
                                        <el-button type="text" class="clues-button-search" @click="isSearch=!isSearch">{{!isSearch ? '高级搜索': '快捷搜索'}}</el-button>
                                        <div class="clues-search-select" style="width: 280px" v-show="isSelect">
                                            <ul>
                                                <li v-for="(item, index) in orderRefundSearchType" :key="index" :class='{"f-active": ruleForm.SearchWay == index+1}' @click="orderSearchType(index+1)">
                                                    <span class="search-type-name">{{item.type}} </span>
                                                    <span class="search-type-text"> {{ruleForm.SearchContent}}</span>
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
                        <el-form v-if="isSearch" ref="ruleForm" :model="ruleForm">
                                <div class="order-search-form">
                                    <el-row>
                                        <el-col :sm="8">
                                            <el-form-item prop="CreateTime" label-width="115px" label="创建时间:">
                                                <el-date-picker v-model="ruleForm.CreateTime" size="small" format="" type="daterange" style="width: 193px;" placeholder="选择时间范围">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :sm="8">
                                            <el-form-item label-width="115px" label="创建人:">
                                                <Tree :width="'193px'" placeholder="请选择创建人" ref="resetCreate" :callback="creatorTree"></Tree>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :sm="8">
                                            <el-form-item prop="CourseType" label-width="115px" label="项目:">
                                                <el-select v-model="ruleForm.CourseType" clearable size="small" style="width:193px;" placeholder="全部">
                                                    <el-option v-for="itm in courseTypeData" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :sm="8">
                                            <el-form-item prop="RefundMode" label-width="115px" label="支付方式:">
                                                <el-select v-model="ruleForm.RefundMode" clearable size="small" style="width:193px;" placeholder="全部">
                                                    <el-option v-for="itm in RefundModeData" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :sm="8">
                                            <el-form-item prop="OrderSource" label-width="115px" label="订单来源:">
                                                <el-select v-model="ruleForm.OrderSource" clearable size="small" style="width:193px;" placeholder="全部">
                                                    <el-option v-for="itm in OrderSourceData" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :sm="8">
                                            <el-form-item prop="OrderStatus" label-width="115px" label="订单状态:">
                                                <el-select v-model="ruleForm.OrderStatus" clearable size="small" style="width:193px;" placeholder="全部">
                                                    <el-option v-for="itm in OrderStatusData" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :sm="8">
                                            <div>
                                                <el-form-item label-width="115px" label="业绩所属人:">
                                                    <Tree :width="'193px'" placeholder="请选择订单所属人" ref="resetAudit" :callback="OwnerTree"></Tree>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <el-col :sm="8">
                                            <el-form-item prop="PayTime" label-width="115px" label="最后支付时间:">
                                                <el-date-picker v-model="ruleForm.PayTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row style="text-align: right; margin-right: 40px">
                                        <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onAccurateQuerys">查询</el-button>
                                        <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('ruleForm')">清除条件</el-button>
                                    </el-row>
                                </div>
                        </el-form>
                    </el-collapse-transition>
                </div>
            </el-form>
        </div>
        <div class="clues-table">
            <el-table ref="multipleTable" border v-loading="loading" :data="RefundApplyData" tooltip-effect="dark" style="width: 100%">
                <el-table-column fixed label="订单号" prop="OrderNo" min-width="150px">
                </el-table-column>
                <el-table-column label="姓名" prop="TrueName" min-width="125px">
                </el-table-column>
                <el-table-column label="手机" min-width="150px">
                    <template scope="scope">
                        <span>{{scope.row.Telphone}}</span>
                        <a v-if="scope.row.Telphone" href="javascript:void(0)" @click="callPhone(scope.$index, RefundApplyData)">
                            <i class="tracking-phone-icon"></i>
                        </a>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column label="项目" prop="CourseType" min-width="150px">
                </el-table-column>
                <el-table-column label="退款方式" prop="PayType" min-width="125px">
                </el-table-column>
                <el-table-column label="退款单号" prop="SerialNo" min-width="125px">
                </el-table-column>
                <el-table-column label="支付账号" prop="PayAccount" min-width="180px">
                </el-table-column>
                 <el-table-column label="订单金额" prop="SellPrise" min-width="125px">
                    <template scope="scope">
                            <div class="price-font-1">
                                <span style="font-size: 14px" v-if="scope.row.OrderStatus === '定金'">¥{{scope.row.DepositAmount}}</span>
                                <span style="font-size: 14px" v-else>¥{{scope.row.SellPrise}}</span>
                            </div>
                    </template>
                </el-table-column>
                <el-table-column label="退款金额" min-width="125px">
                     <template scope="scope">
                            <span style="font-size: 14px" class="price-font-2">¥{{scope.row.PayCount}}</span>
                        </template>
                </el-table-column>
                    <el-table-column prop="OrderOwnerName" min-width="115" label="业绩所属人" style="#676767">
                    </el-table-column>
                    <el-table-column prop="LastPayTime" min-width="121" label="最后支付时间" style="#676767">
                    </el-table-column>
                 <el-table-column label="订单来源" prop="Source" min-width="125px">
                </el-table-column>
                <el-table-column label="订单状态" prop="OrderStatus" min-width="115px">
                </el-table-column>
                 <el-table-column label="交易状态" prop="OperationType" min-width="115px">
                </el-table-column>
                <el-table-column label="创建人" prop="Create_By" min-width="115px">
                </el-table-column>
                <el-table-column label="创建时间" prop="Create_Time" min-width="180px">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="125px"  v-if="unlocking(['OrderRefund_Save', 'OrderRefund_Del', 'OrderRefund_Audit'])">
                    <template scope="scope">
                        <el-button type="text" @click="ShowApplyModal(scope.$index, RefundApplyData)" v-if="unlocking('OrderRefund_Save')"  size="small">修改</el-button>
                        <el-button type="text" @click="delApply(scope.$index, RefundApplyData)" v-if="unlocking('OrderRefund_Del')" size="small">取消</el-button>
                        <el-button type="text" @click="showAuditModal(scope.$index, RefundApplyData)" v-if="unlocking('OrderRefund_Audit')"  size="small">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="clues-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="recordTotal" :page-count="10/pageSize">
                </el-pagination>
            </div>
        </div>
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

.el-input--small .el-input__inner {
    height: 30px;
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

.el-button-border {
    padding-right: 5px;
    border-right: 1px solid #20a0ff;
    border-radius: inherit;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { orderRefundSearchType } from '../components/common/orderConfig';
import orderModal from 'vueModal';
import { Message} from 'element-ui';
import { format, getCallUp } from '../util/util';
import {DelRefundApply,GetOrderRefundApplyList,GetRefundApply,GetRefundMode} from '../api/OrderRefund'
import {dicCourseType,dicOrderSource,dicOrderStatus} from '../api/clueDic'
import {GetUserDepartmentTree} from '../api/TreeOrSelectData'
import RefundApplyAudit from "../components/order/RefundApplyAudit.vue";
import OrderRefundApply from "../components/order/OrderRefundApply.vue";
import OrderSplit from "../components/order/OrderSplit.vue";
import Tree from './Tree.vue';

export default {
    name: 'module-order-payserial',
    props: ['self', 'item'],
    components: {Tree},
    data() {
        return {
            isSearch: false,
            isCollapse: true,
            isSelect: false,
            isSearch: false,
            loading: false,
            SearchType:1,
            OwnerId: [], // 所属人
            ruleForm:{
                CreateTime:'',
                UserId:'',
                CourseType:'',
                RefundMode:'',
                OrderSource:'',
                OrderStatus:'',
                SearchWay:'',
                SearchContent:'',
                PayTime:''
            },
            getUserTree:[],
            channelsProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
            },
            orderRefundSearchType,
            pageSize: 10,
            currentPage:1,
            recordTotal: 0,
            RefundApplyData:[],
            RefundModeData:[],
            courseTypeData:[],
            OrderSourceData:[],
            OrderStatusData:[]
        }
    },
    watch: {
    },
    created() {
        GetRefundMode().then(ret => {  // 退款方式
            if (ret.status === 0) {
                this.RefundModeData = ret.result;
            }
        });
        dicCourseType().then(ret=>{
            if (ret.status === 0) {
                this.courseTypeData = ret.result;
            }
        });
        dicOrderSource().then(ret=>{
            if (ret.status === 0) {
                this.OrderSourceData = ret.result;
            }
        });
        dicOrderStatus().then(ret=>{
            if (ret.status === 0) {
                this.OrderStatusData = ret.result;
            }
        });
        GetUserDepartmentTree().then(ret=>{
            if (ret.status === 0) {
                this.getUserTree = ret.result;
            }
        });
    },
    methods: {
        onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.$refs.resetCreate.$emit('resetTree');
            this.$refs.resetAudit.$emit('resetTree');
        },

        callPhone(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Telphone, 0)
        },

        creatorTree(val) {
            this.ruleForm.UserId = val;
        },

        OwnerTree(val)
        {//订单所属人
            this.OwnerId=val;
        },
        ShowApplyModal(index,data){  //显示退款修改
            let rowData = data[index];
            GetRefundApply({refundNo:rowData.SerialNo}).then(ret=>{
                if(ret.status===0){
                    ret.result.ReceivablesPrice = rowData.SellPrise;
                    orderModal.openComponent(OrderRefundApply, {
                        title: '退款申请',
                        showCancelButton: false,
                        showConfirmButton: false,
                        width: '950px',
                        // height: '400px',
                        self: this,
                        orderApplyInfo:ret.result
                    },'orderRefundApply')
                }
            })
            
        },
        showAuditModal(index,data){   //显示审核弹出框
            let rowData = data[index];
            GetRefundApply({refundNo:rowData.SerialNo}).then(ret=>{ 
                if (ret.status === 0) {
                    ret.result.ReceivablesPrice = rowData.SellPrise;
                    orderModal.openComponent(RefundApplyAudit, {
                        title: '退款审核',
                        showCancelButton: false,
                        showConfirmButton: false,
                        width: '950px',
                        //height: '600px',
                        self: this,
                        orderApplyInfo:ret.result
                    },'RefundApplyAudit')
                }
            })
        },
        delApply(index,data){    //删除申请
            let rowData = data[index];
            this.$confirm(`确定将订单：${rowData.OrderNo} 的退款申请取消？`, '退款申请取消', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                DelRefundApply({refundNo:rowData.SerialNo}).then(ret=>{
                    if(ret.status === 0 ){
                        this.$message({
                            message: '取消成功',
                            type: 'success'
                        });
                        this.getRefundApplys();
                    }
                })
            });
        },
        handleSizeChange(pSize) {//页大小改变
            this.pageSize = pSize;
            this.getRefundApplys();
        },
        handleCurrentChange(pIndex) {//页索引改变
            this.currentPage = pIndex;
            this.getRefundApplys();
        },
        onOrderSearch() { // 高级搜索折叠
            this.isSearch = !this.isSearch;
        },
        orderSearchType(type) { // 模糊搜索选择类
            this.ruleForm.SearchWay=type;
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            this.isSelect = true;
        },
        onQuickQuerys() {
            this.SearchType=2;
            this.getRefundApplys();
        },
        onAccurateQuerys(){
            this.SearchType=1;
            this.getRefundApplys();
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            setTimeout(function () {
                self.isSelect = false;
            }, 500);
        },
        getRefundApplys(){ //查询列表
            let me = this;
            me.loading = true;
            let searchPrm={
                Where:{},
                PageIndex: me.currentPage, 
                PageSize: me.pageSize, 
                OrderBy: "",
                SortCol:1 
            }
            if(this.SearchType===1){
                searchPrm.Where ={
                    SearchType:this.SearchType,
                    CreateBegin:format(this.ruleForm.CreateTime[0]),
                    CreateEnd:format(this.ruleForm.CreateTime[1]),
                    UserId:this.ruleForm.UserId,
                    CourseType:this.ruleForm.CourseType,
                    RefundMode:this.ruleForm.RefundMode,
                    OrderSource:this.ruleForm.OrderSource,
                    OrderStatus:this.ruleForm.OrderStatus,
                    PayTimeBegin:format(this.ruleForm.PayTime[0]),
                    PayTimeEnd:format(this.ruleForm.PayTime[1]),
                    Owner:this.OwnerId
                }
            }
            else{
                searchPrm.Where ={
                    SearchType:this.SearchType,
                    SearchWay:this.ruleForm.SearchWay,
                    SearchContent:this.ruleForm.SearchContent
                }
            }
            GetOrderRefundApplyList(searchPrm).then(ret=>{
               if(ret.status===0){
                    me.RefundApplyData = ret.result.Body;
                    me.recordTotal = ret.result.Count;
                    me.loading = false;
               }
               else{
                   me.loading = false;
               }
            }).catch(() => {
                me.loading = false;
            });
        }
    },
    mounted: function () {
        this.getRefundApplys();
    }
}
</script>