<template>
    <div class="module-clues-content call-record">
        <el-form ref="ruleForm" :model="ruleForm">
            <div class="">
                <el-row :gutter="5">
                    <el-col :span="12">
                        <el-row>
                            <div class="order-type-search" style="margin-right: 10px">
                                <el-form-item>
                                    <el-select v-model="ruleForm.timeType" @change="onTimeType" style="width:120px;" size="small" placeholder="今天">
                                        <el-option label="今天" value="1"></el-option>
                                        <el-option label="本周" value="2"></el-option>
                                        <el-option label="本月" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="order-type-search" style="margin-right: 10px">
                                <el-form-item>
                                    <Tree :width="'193px'" ref="callrecordTree" :allSelected="userAllSelected" :callback="recordTree"></Tree>
                                </el-form-item>
                            </div>
                            <div class="order-type-search" style="margin-right: 10px">
                                <el-form-item>
                                    <el-select v-model="ruleForm.calltype" @change="defaultSearch" clearable style="width:120px;" size="small" placeholder="全部">
                                        <el-option label="全部" value="0"></el-option>
                                        <el-option label="呼入" value="1"></el-option>
                                        <el-option label="呼出" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-row>
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                        <el-input placeholder="根据电话号码查询" v-model="ruleForm.searchNo" size="small" style='width: 210px;' @focus="onFocusType" @blur="onBlurType">
                            <el-button slot="append" icon="search" @click="shortCutSearch"></el-button>
                        </el-input>
                        <el-button style="padding-left: 5px" type="text" class="clues-button-search" @click="isSearch=!isSearch">{{!isSearch ? '高级搜索': '快捷搜索'}}</el-button>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-collapse-transition>
                <el-form class="clues-conditions" ref="ruleForm" :model="ruleForm" v-if="isSearch" label-width="115px" >
                    <el-row>
                        <el-col :span="8">
                             <el-form-item prop="createStartTime" label="通话时间:">
                                 <el-date-picker v-model="ruleForm.createStartTime" clearable size="small" format="" type="daterange" style="width: 193px;" placeholder="选择时间范围">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                             <el-form-item prop="phoneType" label="呼叫类型:">
                                <el-select v-model="ruleForm.phoneType" clearable size="small" style="width: 193px;" placeholder="全部">
                                    <el-option label="全部" value="0"></el-option>
                                    <el-option label="呼入" value="1"></el-option>
                                    <el-option label="呼出" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                             <el-form-item prop="durationBegin" label="录音时长:">
                                 <span style="display: inline-block">
                                    <el-input v-model="ruleForm.durationBegin" size="small" style="width: 88px"></el-input> -
                                    <el-input v-model="ruleForm.durationEnd" size="small" style="width: 88px"></el-input>
                                </span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item prop="callNo" label="主叫号码:">
                                <el-input v-model="ruleForm.callNo" style="width: 193px" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                            <el-form-item prop="extNo" label="分机号:">
                                <el-input v-model="ruleForm.extNo" style="width: 193px" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="8">
                            <el-form-item prop="userNo" label="工号:">
                                <el-input v-model="ruleForm.userNo" style="width: 193px" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item prop="calledNo" label="被叫号码:">
                                <el-input v-model="ruleForm.calledNo" style="width: 193px" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="calledNo" label="人员:">
                                <Tree :width="'193px'" ref="userTree"  :callback="userTree"></Tree>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="seniorSearch">查询</el-button>
                            <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('ruleForm')">清除条件</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                </el-collapse-transition>
            </div>
        </el-form>
        <div class="clues-table" style="margin-top: 10px">
            <el-table ref="multipleTable" border v-loading="loading" :data="recordingData" tooltip-effect="dark" style="width: 100%">
                <el-table-column prop="UserName" fixed label="座席" min-width="130px">
                </el-table-column>
                <el-table-column label="工号" prop="UserNo" min-width="110">
                </el-table-column>
                <el-table-column label="分机号" prop="ExtNo" min-width="110">
                </el-table-column>
                <el-table-column label="呼叫类型" prop="PhoneType" min-width="130">
                </el-table-column>
                <el-table-column label="主叫号码" prop="CallNo" min-width="140">
                </el-table-column>
                <el-table-column label="被叫号码" prop="CalledNo" min-width="140">
                </el-table-column>
                <el-table-column label="通话开始时间" prop="CallBegin" min-width="185">
                </el-table-column>
                <el-table-column label="录音时长" prop="CallDuration" min-width="110">
                </el-table-column>
                <el-table-column label="通话状态" prop="CallStatus" min-width="110">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="120">
                    <template scope="scope">
                        <el-button :disabled="!scope.row.RecordingFile" type="text" size="mini" @click="onDownLoad(scope.$index, recordingData)">下载</el-button>
                        <el-button :disabled="!scope.row.RecordingFile" type="text" size="mini" @click="onPlay(scope.$index, recordingData)">播放</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="clues-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="recordTotal" :page-count="10/pageSize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style>
.call-record .el-form-item {
    margin-bottom: 10px;
}
</style>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format, getWeekStartDate, getWeekEndDate, getMonthStartDate, getMonthEndDate, checkedUserTree } from '../util/util';
import { getCallRecordList } from '../api/callCenter';
import { GetAllowedUserTree } from '../api/cluesManage';
import { CRM_USER_INFO } from '../util/keys';
import cluesModal from 'vueModal';
import Tree from './Tree.vue';
export default {
    name: 'module-callcenter-record',
    props: ['self', 'item'],
    components: { Tree },
    data() {
        return {
            treeStatus: '',
            isSelect: false,
            isSearch: false,
            isCollapse: true,
            currentPage: 1,
            loading: false,
            pageSize: 10,
            recordTotal: 0,
            recordPalyFile: "",
            getUserTree: [],
            creatortFilter: '',
            creatorName: '',
            defaultKeys: '',
            creatorId: [],
            userIds:[],
            orderCreateTime: [],
            getWeekStartDate: '', // 本周起
            getWeekEndDate: '', // 本周止
            getMonthStartDate: '', // 本月起
            getMonthEndDate: '', // 本月止
            defaultProps: { // 人员树
                label: 'Name',
                children: 'ChildrenList'
            },
            ruleForm: {
                timeType: "1",
                calltype: "",
                searchNo: "",
                createStartTime: "",
                phoneType: "",
                durationBegin: "",
                durationEnd: "",
                callNo: "",
                agent: "",
                extNo: "",
                userNo: "",
                calledNo: "",
                searchType: "1"
            },
            recordingData: []
        }
    },
    methods: {
        onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.ruleForm.durationEnd = '';
        },
        userAllSelected() {
            this.defaultSearch();
        },
        recordTree(val) {
            this.creatorId = val;
        },
        userTree(val){
            this.userIds=val;
        },
        onTimeType(type) { // 时间类型
            switch (type) {
                case 1:
                    this.ruleForm.createStartTime = [format(new Date()), format(new Date())];
                    break;
                case 2:
                    this.ruleForm.createStartTime = [this.getWeekStartDate, this.getWeekEndDate];
                    break;
                case 3:
                    this.ruleForm.createStartTime = [this.getMonthStartDate, this.getMonthEndDate];
                    break;
                default:
            }
            this.defaultSearch();
        },
        onDownLoad(rIndex, rData) {
            var recordFiles = rData[rIndex].RecordingFile;
            if (recordFiles != '') {
                window.open(rData[rIndex].RecordingFile);
            }
        },
        onPlay(rIndex, rData) {
            this.recordPalyFile = rData[rIndex].RecordingFile;
            if (this.recordPalyFile == '') {
                return;
            }
            require.ensure([], (require) => {
                let recordPlayer = require("../components/callCenter/RecordPlayer.vue");
                cluesModal.openComponent(recordPlayer, {
                    title: '录音播放',
                    disablePopEvent: true,
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '350px',
                    height: '150px',
                    self: this,
                    callback: (flag, self) => {
                    }
                }).then((modal) => {
                });
            }, 'recordPlayer');
            //window.open(rData[rIndex].RecordingFile);
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            this.isSelect = true;
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            window.time = setTimeout(function() {
                self.isSelect = false;
                window.time = clearTimeout(self.isSelect = false);
            }, 500);
        },
        handleSizeChange(pSize) {//页大小改变
            this.pageSize = pSize;
            this.queryCallRecords();
        },
        handleCurrentChange(pIndex) {//页索引改变
            this.currentPage = pIndex;
            this.queryCallRecords();
        },
        defaultSearch() {//默认查询
            this.ruleForm.searchType = 1;
            this.queryCallRecords();
        },
        shortCutSearch() {
            this.ruleForm.searchType = 2;
            this.queryCallRecords();
        },
        seniorSearch() {
            this.ruleForm.searchType = 3;
            this.queryCallRecords();
        },
        queryCallRecords() {
            this.objectParm = {
                "PageIndex": this.currentPage,
                "PageSize": this.pageSize,
                "Where": {
                    "SearchType": this.ruleForm.searchType
                }
            }
            if(this.ruleForm.searchType == 1){
                 this.objectParm.Where={
                    "SearchType": this.ruleForm.searchType,
                    "TimeType": this.ruleForm.timeType,
                    "UserIds": this.creatorId,
                    "PhoneType": this.ruleForm.searchType == 1 ? this.ruleForm.calltype : this.ruleForm.phoneType
                 };
            }else if(this.ruleForm.searchType == 3){
                this.objectParm.Where={
                    "SearchType": this.ruleForm.searchType,
                    "UserIds": this.userIds,
                    "CallBegin": format(this.ruleForm.createStartTime[0]),
                    "CallEnd": format(this.ruleForm.createStartTime[1]),
                    "PhoneType": this.ruleForm.searchType == 1 ? this.ruleForm.calltype : this.ruleForm.phoneType,
                    "DurationBegin": this.ruleForm.durationBegin,
                    "DurationEnd": this.ruleForm.durationEnd,
                    "CallNo": this.ruleForm.callNo,
                    "CalledNo": this.ruleForm.calledNo,
                    "ExtNo": this.ruleForm.extNo,
                    "UserNo": this.ruleForm.userNo,
                    "Agent": this.ruleForm.agent,
                    "TimeType": 1
                 };
            }else if(this.ruleForm.searchType == 2){
                this.objectParm.Where={
                    "SearchType": this.ruleForm.searchType,
                    "SearchNo": this.ruleForm.searchNo
                 };
            }
            this.getCallRecords(this.objectParm);
        },
        getCallRecords(objParams = {//获取查询数据
            "Where": {
                "SearchType": "1"
            },
            "PageIndex": this.currentPage,
            "PageSize": this.pageSize,
        }) {
            this.loading = true;
            getCallRecordList(objParams).then(ret => {
                if (ret.status == 0) {
                    this.loading = false;
                    this.recordingData = ret.result.Data;
                    this.recordTotal = ret.result.Count;
                }
                else {
                    this.loading = false;
                }
            }).catch(() => { this.loading = false; });
        }
    },
    mounted: function() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO)); // 登陆人ID
        this.queryCallRecords();
    },
    created() {
        this.getWeekStartDate = getWeekStartDate(); // 本周起
        this.getWeekEndDate = getWeekEndDate(); // 本周止
        this.getMonthStartDate = getMonthStartDate(); // 本月起
        this.getMonthEndDate = getMonthEndDate(); // 本月止
    }
}
</script>
