<template>
    <div class="module-clues-content order-manage">
        <div>
            <el-form ref="ruleForm" :model="ruleForm">

                <div class="roder-content-label">
                    <div>
                        <el-row>
                            <!-- <el-col :sm="12">
                                <!-- <Tree :width="'193px'" placeholder="请选择人员" :allSelected="selectChange" :callback="personnelTree"></Tree> -->
                            <!-- </el-col> -->
                            <el-col :sm="24">
                                <el-row>
                                    <div class="clues-search" style="float:right">
                                        <el-input v-model="ruleForm.searchContent" placeholder="订单编号、学生姓名、收款单号、联系方式" size="small" style='width: 328px;position: relative; z-index: 100' @focus="onFocusType" @blur="onBlurType">
                                            <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                                        </el-input>
                                        <el-button type="text" class="clues-button-search" @click="isSearch=!isSearch">{{!isSearch ? '高级搜索': '快捷搜索'}}</el-button>
                                        <div class="clues-search-select" style="width: 280px" v-show="isSelect">
                                            <ul>
                                                <li v-for="(item, index) in orderSerialSearchType" :key="index" :class='{"f-active": ruleForm.searchType == index+1}' @click="orderSearchType(index+1)">
                                                    <span class="search-type-name">{{item.type}} </span>
                                                    <span class="search-type-text"> {{ruleForm.searchContent}}</span>
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
                                        <el-form-item prop="createTime" label-width="115px" label="创建时间:">
                                            <el-date-picker v-model="ruleForm.createTime" size="small" format="" type="daterange" style="width: 195px;" placeholder="选择时间范围">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="8">
                                        <el-form-item label-width="115px" label="创建人:">
                                            <Tree :width="'193px'" placeholder="请选择创建人" ref="resetCreate" :callback="creatorTree"></Tree>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="8">
                                        <el-form-item prop="courseType" label-width="115px" label="项目:">
                                            <el-select v-model="ruleForm.courseType" filterable clearable size="small" style="width:195px;" placeholder="全部">
                                                <el-option v-for="itm in courseTypes" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :sm="8">
                                        <el-form-item prop="payType" label-width="115px" label="支付方式:">
                                            <el-select v-model="ruleForm.payType" filterable clearable size="small" style="width:195px;" placeholder="全部">
                                                <el-option v-for="itm in payTypes" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="8">
                                        <el-form-item prop="source" label-width="115px" label="订单来源:">
                                            <el-select v-model="ruleForm.source" filterable clearable size="small" style="width:195px;" placeholder="全部">
                                                <el-option v-for="itm in orderSource" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="8">
                                        <el-form-item prop="orderStatus" label-width="115px" label="订单状态:">
                                            <el-select v-model="ruleForm.orderStatus" filterable clearable size="small" style="width:195px;" placeholder="全部">
                                                <el-option v-for="itm in orderStatus" :key="itm.Id" :label="itm.Name" :value="itm.Id"></el-option>
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
                                        <el-form-item prop="PayTime" label-width="115px" label="支付时间:">
                                            <el-date-picker v-model="ruleForm.PayTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 193px;font-size: 12px">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :sm="8">
                                        <el-form-item prop="PaySerialNo" label-width="115px" label="支付流水:">
                                            <el-input v-model="ruleForm.PaySerialNo" placeholder="输入支付流水" style="width: 193px;font-size: 12px" size="small">                                            
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row style="text-align: right; margin-right: 40px">
                                    <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="btnSearch">查询</el-button>
                                    <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('ruleForm')">清除条件</el-button>
                                </el-row>
                            </div>
                        </el-form>
                    </el-collapse-transition>
                </div>
            </el-form>
        </div>

        <div class="clues-table">
            <el-table ref="multipleTable" border v-loading="loading" :data="recordingData" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="OrderNo" label="订单号" fixed min-width="155px">
                </el-table-column>
                <el-table-column label="姓名" prop="TrueName" min-width="125px">
                </el-table-column>
                <el-table-column label="手机" min-width="150px">
                    <template scope="scope">
                        <span>{{scope.row.Telphone}}</span>
                        <a v-if="scope.row.Telphone" href="javascript:void(0)" @click="callPhone(scope.$index, recordingData)">
                            <i class="tracking-phone-icon"></i>
                        </a>
                        <span v-else>--</span>
                    </template>
                </el-table-column>
                <el-table-column label="项目" prop="CourseType" min-width="120px">
                </el-table-column>
                <el-table-column label="支付方式" prop="PayType" min-width="130px">
                </el-table-column>
                <el-table-column label="收款单号" prop="SerialNo" min-width="180px">
                </el-table-column>
                <el-table-column label="支付账号" prop="PayAccount" min-width="120px">
                </el-table-column>
                <el-table-column label="订单金额" min-width="130">
                     <template scope="scope">
                            <div class="price-font-1">
                                <span style="font-size: 14px" v-if="scope.row.OrderStatus === '定金'">¥{{scope.row.DepositAmount}}</span>
                                <span style="font-size: 14px" v-else>¥{{scope.row.SellPrise}}</span>
                            </div>
                    </template>
                </el-table-column>
                <el-table-column label="收款金额" min-width="130">
                    <template scope="scope">
                        <span style="font-size: 14px" class="price-font-2">¥{{scope.row.PayCount}}</span>
                    </template>
                </el-table-column>
                    <el-table-column prop="OrderOwnerName" min-width="115" label="业绩所属人" style="#676767">
                    </el-table-column>
                    <el-table-column prop="LastPayTime" min-width="121" label="支付时间" style="#676767">
                    </el-table-column>
                <el-table-column label="支付流水" prop="PaySerialNo" min-width="115px">
                </el-table-column>
                <el-table-column label="订单来源" prop="Source" min-width="115px">
                </el-table-column>
                <el-table-column label="订单状态" prop="OrderStatus" min-width="115px">
                </el-table-column>
                <el-table-column label="创建人" prop="Create_By" min-width="115px">
                </el-table-column>
                <el-table-column label="创建时间" prop="Create_Time" min-width="180px">
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
import { format, getCallUp } from '../../util/util';
import cluesModal from 'vueModal';
import { queryPaySerial } from '../../api/orderPaySerial'
import { orderSerialSearchType, orderManageItem } from '../common/orderConfig';
import { dicCourseType, dicPayType, dicOrderSource, dicOrderStatus } from '../../api/clueDic'
import Tree from '../../containers/Tree.vue';

export default {
    components: { Tree },
    props: ['self', 'item'],
    data() {
        return {
            timer: null,
            isSearch: false,
            isCollapse: true,
            currentPage: 1,
            pageSize: 10,
            loading: false,
            orderSerialSearchType,
            isSelect: false,
            isSearch: false,
            recordTotal: 0,
            courseTypes: [],
            payTypes: [],
            orderSource: [],
            orderStatus: [],
            OwnerId: [], // 所属人
            ruleForm: {
                createTime: "",
                creator: [],
                courseType: "",
                payType: "",
                searchContent: "",
                source: "",
                orderStatus: "",
                searchType: 1,
                PayTime: '',                
                PaySerialNo:''
            },
            recordingData: []
        }
    },
    methods: {
         onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.$refs.resetCreate.$emit('resetTree');
            this.$refs.resetAudit.$emit('resetTree');
        },

        // personnelTree(val) { // 人员树
        //     this.ruleForm.creator = val;
        // },
        // selectChange() {
        //     // let params = {//获取查询数据
        //     //     "Where": {
        //     //         "Creator": this.personnel
        //     //     },
        //     //     "PageIndex": this.currentPage,
        //     //     "PageSize": this.pageSize,
        //     // }
        //     this.searchPaySerail();
        // },
        callPhone(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Telphone, 0)
        },

        creatorTree(val) {
            this.ruleForm.creator = val;
        },

        onAdvancedSearch() {
            this.isSearch = !this.isSearch;
        },
        handleSizeChange(pSize) {//页大小改变
            this.pageSize = pSize;
            this.searchPaySerail();
        },
        handleCurrentChange(pIndex) {//页索引改变
            this.currentPage = pIndex;
            this.searchPaySerail();
        },
        btnSearch() {
            this.ruleForm.searchContent = "";
            this.ruleForm.SearchType = 0;
            this.searchPaySerail();
        },
        onOrderSearch() { // 高级搜索折叠
            this.isSearch = !this.isSearch;
        },
        orderSearchType(type) { // 模糊搜索选择类
            this.ruleForm.searchType = type;
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            clearTimeout(this.timer);
            this.isSelect = true;
        },
        OwnerTree(val)
        {//订单所属人
            this.OwnerId=val;
        },
        onQuickQuerys() {
            this.ruleForm.createTime = "";
            this.ruleForm.courseType = "";
            this.ruleForm.creator = [];
            this.ruleForm.payType = "";
            this.ruleForm.source = "";
            this.ruleForm.orderStatus = "";
            this.searchPaySerail();
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            this.timer = setTimeout(function() {
                self.isSelect = false;
            }, 500);
        },
        searchPaySerail(objectParm = {
                "PageIndex": this.currentPage,
                "PageSize": this.pageSize,
                "Where": {
                    "CreateBegin": format(this.ruleForm.createTime[0]),
                    "CreateEnd": format(this.ruleForm.createTime[1]),
                    "Creator": this.ruleForm.creator,
                    "CourseType": this.ruleForm.courseType,
                    "PayType": this.ruleForm.payType,
                    "SearchContent": this.ruleForm.searchContent,
                    "OrderSource": this.ruleForm.source,
                    "OrderStatus": this.ruleForm.orderStatus,
                    "SearchType": this.ruleForm.searchType,
                    "PayTimeBegin":format(this.ruleForm.PayTime[0]),
                    "PayTimeEnd":format(this.ruleForm.PayTime[1]),
                    "Owner":this.OwnerId,
                    "PaySerialNo":this.ruleForm.PaySerialNo
                }
            }) {
            this.loading = true;
            queryPaySerial(objectParm).then(ret => {
                if (ret.status == 0) {
                    this.loading = false;
                    this.recordingData = ret.result.Body;
                    this.recordTotal = ret.result.Count;
                }
                else {
                    this.loading = false;
                }
            }).catch(() => { this.loading = false; });
        }
    },
    mounted() {
        dicCourseType().then(ret => {
            if (ret.status == 0) {
                this.courseTypes = ret.result;
            }
        }).catch(() => { });

        dicPayType().then(ret => {
            if (ret.status == 0) {
                this.payTypes = ret.result;
            }
        }).catch(() => { });

        dicOrderSource().then(ret => {
            if (ret.status == 0) {
                this.orderSource = ret.result;
            }
        }).catch(() => { });

        dicOrderStatus().then(ret => {
            if (ret.status == 0) {
                this.orderStatus = ret.result;
            }
        }).catch(() => { });

        this.searchPaySerail();
    }
}
</script>