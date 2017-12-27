<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label">
                <div>
                    <el-row style="height: 35px; line-height: 35px">
                        <el-col :sm="12">
                            <Tree :width="'193px'" placeholder="请选择人员" :allSelected="selectChange" :callback="personnelTree"></Tree>
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
                <el-table ref="multipleTable" border v-loading="loading" :data="orderList" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" style="width: 100%">
                    <el-table-column type="selection" align="right" fixed>
                    </el-table-column>
                    <el-table-column prop="CustomerName" style="#676767" min-width="125" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column label="手机" style="#676767" min-width="150">
                        <template scope="scope">
                            <span>{{scope.row.Phone}}</span>
                            <a v-if="scope.row.Phone" href="javascript:void(0)" @click="callPhone(scope.$index, orderList)">
                                <i class="tracking-phone-icon"></i>
                            </a>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="OrderNo" label="订单ID" style="#676767" min-width="155">
                    </el-table-column>
                    <el-table-column prop="CourseType" label="项目" style="#676767" min-width="120">
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
                    <el-table-column prop="OrderStatus" label="订单状态" min-width="115" style="#676767">
                    </el-table-column>
                    <el-table-column prop="AgreementName" label="协议名称" min-width="150" style="#676767">
                    </el-table-column>
                    <el-table-column prop="ConfirmStatus" min-width="110" label="协议状态" style="#676767">
                    </el-table-column>
                    <el-table-column prop="ConfirmTime" min-width="121" label="协议确认时间" style="#676767">
                    </el-table-column>
                    <el-table-column prop="ClueNo" label="线索编号" min-width="160" style="#676767">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" min-width="130" v-if="unlocking(['OrderAgr_Preview', 'OrderAgr_UploadMaterial'])">
                        <template scope="scope">
                            <span class="href-right" v-if="unlocking('OrderAgr_Preview')">
                                <a style="color: #20a0ff" :href="scope.row.UserAgreementUrl" target="_blank">预览</a>
                            </span>
                            <span v-if="unlocking('OrderAgr_UploadMaterial')">
                                <a style="color: #20a0ff;font-size: 12px;font-family: initial" :href="[`/#/order/userfileupload?orderNo=${scope.row.OrderNo}`]" target="_blank">
                                    上传资料
                                </a>
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

.clues-bnt-item .tracking-text-font .el-form-item__label {
    padding: 11px 0 11px 0;
}

.el-dropdown {
    font-size: 12px;
    color: #20a0ff;
}
</style>
<script>
import { mapState, mapMutations } from 'vuex';
import { orderSeachType } from '../common/orderConfig';
import { format, getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, getCallUp } from '../../util/util';
import orderModal from 'vueModal';
import { CancelOrder } from '../../api/order';
import { queryOrderAgreement } from '../../api/userAgreement'
import Tree from '../../containers/Tree.vue';

export default {
    components: { Tree },
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
        }
    },
    methods: {
        callPhone(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Phone, 0)
        },

        tableRowClassName(row, index) { // 选中列表行高亮显示
            for (let i = 0; i < this.multipleSelection.length; i++) {
                if (row.AgreeId === this.multipleSelection[i].AgreeId) {
                    return 'positive-row';
                }
            }
            return '';
        },
        handleSelectionChange(orderNo) { // 列表勾选
            this.multipleSelection = orderNo;
        },

        personnelTree(val) { // 人员树
            this.personnel = val;
        },
        selectChange() {
            this.getUserAgreementList();
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
        orderSearchType(type) { // 模糊搜索选择类
            this.SearchType = type + 1;
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            this.isSelect = true;
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
        getUserAgreementList(
        ) {
            this.loading = true;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    Users: this.personnel,
                    SearchKey: this.SearchType,
                    SearchContent: this.form.orderSearchValue,
                }
            }
            queryOrderAgreement(params).then(ret => {
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
            this.getUserAgreementList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.getUserAgreementList();
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
        this.getUserAgreementList(); // 获取订单列表接口
    }
}
</script>