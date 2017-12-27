<template>
    <div class="module-clues-content">
        <el-form ref="form" :model="form">
            <div class="module-clues-content" style="font-size: 0">
                <div style="float:left;">
                    <el-select v-model="searchStatus" placeholder="试听状态" clearable size="small" style="width: 130px" @change="this.onSearch">
                        <el-option v-for="item in this.$store.state.listen.getListenStatuList" :key="item.Id" :label="item.Name" :value="item.Id">
                        </el-option>
                    </el-select>
                    <Tree :width="'193px'" ref="listenUserTree" style="margin-left:10px;" :allSelected="userAllSelected" :callback="listenTree" :placeholder="'邀约人'"></Tree>
                    <el-select v-model="searchType" placeholder="试听类型" clearable size="small" style="width: 130px;margin-left: 10px" @change="this.onSearch">
                        <el-option v-for="item in this.$store.state.listen.getListenTypeList" :key="item.Id" :label="item.Name" :value="item.Id">
                        </el-option>
                    </el-select>
                    <el-date-picker type="daterange" v-model="searchTime" clearable placeholder="邀约日期" size="small" style="width: 200px;margin-left: 10px" @change="datePickChange">
                    </el-date-picker>
                </div>
                <div class="clues-search">
                    <el-input v-model="SearchKey" placeholder="学生姓名、试听单号、手机" size="small" style='width: 240px;position: relative; z-index: 100' @focus="onFocusType" @blur="onBlurType">
                        <el-button slot="append" icon="search" @click="SearchKeyList"></el-button>
                    </el-input>
                    <div class="clues-search-select" style="width: 240px" v-show="isSelect">
                        <ul>
                            <li v-for="(item, index) in listenSeachType" :key="index" :class='{"f-active": quickSearchType == index+1}' @click="listenType(index)">
                                <span class="search-type-name">{{item.type}} </span>
                                <span class="search-type-text"> {{SearchKey}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="font-size:12px;height:40px;line-height:45px;">
                <div style="width:45%;float:left;">
                    <el-radio-group v-model="checkTimevalue" @change="changeTime">
                        <el-radio style="margin-right: 10px" label="today">今日</el-radio>
                        <el-radio style="margin-right: 10px" label="tswk">本周</el-radio>
                        <el-radio style="margin-right: 10px" label="thisMonth">本月</el-radio>
                        <el-radio label="alltime">全部时间</el-radio>
                    </el-radio-group>
                </div>
                <div style="width:45%;float:right;text-align:right;">
                    <span>{{this.UserName}}</span>
                    <span style="color: #8f9aac">: {{this.getDatePart(this.searchTime[0])}}~{{this.getDatePart(this.searchTime[1])}} , </span>
                    <span> 已邀约
                        <span style="color: #f09862">{{this.AppointmentCount}}</span>
                        <span style="color: #8f9aac">人，</span>
                    </span>
                    <span>应约
                        <spna style="color: #f09862">{{this.ArrivedCount }}</spna>
                        <span style="color: #8f9aac">人，</span>
                    </span>
                    <span> 未应约
                        <span style="color: #f09862">{{this.NotArrivedCount }}</span>
                        <span style="color: #8f9aac">人，</span>
                    </span>
                    <span> 取消
                        <span style="color: #f09862">{{this.CancelCount }}</span>
                        <span style="color: #8f9aac">次</span>
                    </span>
                </div>
            </div>
            <div class="clues-table">
                <el-table ref="multipleTable" border v-loading="this.$store.state.listen.loading" :data="this.$store.state.listen.tabledata" style="width: 100%">
                    <el-table-column prop="ListenInvitationNo" label="试听单号" min-width="160">
                    </el-table-column>
                    <el-table-column prop="stuName" label="学生姓名" fixed="left" min-width="125">
                    </el-table-column>
                    <el-table-column label="手机" min-width="140">
                        <template scope="scope">
                             <div @mouseover="callTooltip(scope.$index)">
                                    <el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
                                        <span @click.stop="showCallTip(scope.$index, $store.state.listen.tabledata)">{{scope.row.stuPhone}}</span>
                                    </el-tooltip>
                                    <a style="margin-left: -4px" v-if="scope.row.stuPhone" href="javascript:void(0)" @click="callUp(scope.$index, $store.state.listen.tabledata)">
                                        <i class="tracking-phone-icon"></i>
                                    </a>
                                    <span v-else>--</span>
                                </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="LIStatusName" label="试听状态" min-width="115">
                    </el-table-column>
                    <el-table-column prop="createTime" sortable label="创建时间" min-width="115">
                    </el-table-column>
                    <el-table-column prop="startTime" sortable label="开始时间" min-width="115">
                    </el-table-column>
                    <el-table-column prop="endTime" sortable label="结束时间" min-width="115">
                    </el-table-column>
                    <el-table-column prop="LItypeName" sortable label="邀约类型" min-width="120">
                    </el-table-column>
                    <el-table-column label="邀约内容" min-width="150">
                        <template scope="scope" style="height:100%;" class="beyond-hidden-2">
                            <span>{{scope.row.LItype=='1000470'?scope.row.LiveRoomTitle:scope.row.courseName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUserName" label="邀约人" min-width="125">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" min-width="272" v-if="unlocking(['STList_ReInvite', 'STList_CancelInvite', 'STList_LiveAdress', 'STList_OpenLive', 'STList_ListenAccount'])">
                        <template scope="scope">
                            <el-button v-if="unlocking('STList_ReInvite')" type="text" size="small" :disabled="scope.row.LIStatus==1000481||!scope.row.CanReInvite" @click="UpdateVitation(scope.$index, scope.row)">重新邀约</el-button>
                            <el-button v-if="unlocking('STList_CancelInvite')" type="text" size="small" :disabled="scope.row.LIStatus==1000481||!scope.row.CanReInvite" @click="CancelListen(scope.$index, scope.row)">取消邀约</el-button>
                            <el-button style="margin-right: 5px" v-if="unlocking('STList_LiveAdress')" type="text" size="small" @click="SetLiveAdress(scope.$index, scope.row)" v-show="showAddress(scope.$index, scope.row)">直播地址</el-button>
                            <span class="href-right" v-if="unlocking('STList_OpenLive') && scope.row.LItype=='1000470'">
                                <a :style="scope.row.LIStatus!==1000481 ? 'color: #20a0ff;font-size: 12px' : 'color:#bfcbd9;cursor: not-allowed;font-size: 12px'" target="_blank" v-bind:href="scope.row.LIStatus!==1000481 ? [`${scope.row.teacherUrl}`] : 'javaScript:void(0)'">开启直播</a>
                            </span>
                            <el-button v-if="unlocking('STList_ListenAccount') && scope.row.LItype=='1000471'" type="text" size="small" @click="SendAccount(scope.$index, scope.row)">试听账号</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 30, 50]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="this.$store.state.listen.totalLength" :page-count="10/pageSize">
                    </el-pagination>
                </div>
            </div>
        </el-form>
    </div>
</template>
<style>
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

.block {
    width: 100%;
    height: 32px;
    margin-top: 20px;
}

.el-pagination {
    float: right;
}

.block .pageoption {
    float: right;
    width: 150px;
    height: 32px;
    line-height: 32px;
    padding-left: 20px;
}

.block .pageoption span {
    color: #2DA0FF;
    cursor: default;
}

.block .pageoption b {
    font-weight: normal;
    margin-left: 35px;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format, number2DateTime, getCallUp } from '../../util/util';
import { cluesTable } from '../common/checkData.js';
import { ListenStatisticsInfo, ListenCancel, ListenVagueSeach } from '../../api/cluesManage';
import { GetContactByUid } from '../../api/callCenter';
import cluesModal from 'vueModal';
import { CRM_USER_INFO } from '../../util/keys';
import { Message, MessageBox } from 'element-ui';
import Tree from '../../containers/Tree.vue';

export default {
    name: 'vitationIndex',
    components: { Tree },
    data() {
        return {
            currIndex: -1,
            phoneDisabled: false,
            showPhone: '号码读取中',
            //搜索条件
            SearchKey: '',//关键字
            searchStatus: "",//试听状态
            searchUid: [],//试听用户
            searchType: '',//试听类型
            searchTime: [new Date(), new Date()],//预约时间段
            searchisAll: "All",//是否人员全选
            useName: '',
            checkTimevalue: 'today',
            isShowTree: false,
            isCollapse: false,
            UserName: "",
            isSelect: false,
            //搜索条件结束
            pageSize: 10,
            currentPage: 1,
            quickSearchType: 1,
            listenSeachType: [{ // 订单模糊搜索下来框
                type: '学生姓名',
                name: 'OrderNo'
            }, {
                type: '试听单号',
                name: 'StudentName'
            }, {
                type: '手机',
                name: 'ClueNo'
            }],
            AppointmentCount: 0,//预约人数
            CancelCount: 0,//取消人数
            ArrivedCount: 0,//到访人数
            NotArrivedCount: 0,//未到访人数
            DepartUseProps: { //部门绑定列名
                value: 'Id',
                label: 'Name',
                children: 'ChildrenList'
            },

        }
    },
    methods: {
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.GetDataList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.GetDataList();
        },
        userAllSelected() {
            this.onSearch();
        },
        listenTree(val) {
            this.searchUid = val;
        },

        callTooltip(index) { // 显示电话明文
            if (index != this.currIndex) {
                this.currIndex = index;
                this.phoneDisabled = false;
            }
        },
        showCallTip(index, rows) { // 显示电话号码
            if ((rows[index].stuPhone.indexOf('*') > -1) && this.unlocking('Show_Customer_Phone_ Clear')) {
                GetContactByUid({phoneType: 0, Uid: rows[index].Uid, mobile: rows[index].stuPhone }).then((ret) => {
                    if (ret.status === 0) {
                        this.phoneDisabled = true;
                        this.showPhone = ret.result || '号码有误';
                    }
                })
            }
        },
        callUp(index, rows) {
            getCallUp(this, rows[index].Uid, rows[index].stuPhone, 0)
        },
        listenType(type) { // 模糊搜索选择类
            this.quickSearchType = type + 1;
        },
        datePickChange() {
            let stime = format(this.searchTime[0]);
            let totime = format(this.searchTime[1]);
            var arrTime = totime.split(' ');
            if (totime&&arrTime.length == 1) {
                totime = totime + " " + "23:59:59";
            }
            this.searchTime = [stime, totime];
            this.onSearch();
        },
        //绑定列表
        GetDataList() {
            var stime = "";
            var totime = ""
            if (this.searchTime != undefined && this.searchTime.length > 0) {
                stime = format(this.searchTime[0]);
                totime = format(this.searchTime[1]);
                this.searchisAll = "";
            }
            let searchPrm = {
                Where: {
                    LIStatus: this.searchStatus,
                    uidList: this.searchUid,
                    LItype: this.searchType,
                    startTime: stime,
                    endTime: totime,
                    isAll: this.searchisAll,
                    SearchKey: this.SearchKey
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: "",
                SortCol: ""
            };
            this.$store.dispatch('GetListenListData', searchPrm);
        },
        getDatePart(val) {
            if (!val) {
                return "";
            }
            return (format(val) + "").split(" ")[0];
        },
        UidNodeChange(data, node, selfNode) {
            if (node != null && node.childNodes.length == 0) {
                this.searchUid = [data.Id];
                this.useName = data.Name;
                this.onSearch();
            }
        },
        onSearch() {
            this.GetDataList();
            this.SearchCount();
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
        UpdateVitation(index, row) {
            var stime = "";
            var totime = ""
            if (this.searchTime != undefined && this.searchTime.length > 0) {
                stime = format(this.searchTime[0]);
                totime = format(this.searchTime[1]);
                this.searchisAll = "";
            }
            let searchPrm = {
                Where: {
                    LIStatus: this.searchStatus,
                    uidList: this.searchUid,
                    LItype: this.searchType,
                    startTime: stime,
                    endTime: totime,
                    isAll: this.searchisAll,
                    SearchKey: this.SearchKey
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: "",
                SortCol: ""
            };
            require.ensure([], (require) => {
                let AddContent = require("./CluesRelinvitation.vue");
                cluesModal.openComponent(AddContent, {
                    title: '重新邀约',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '500px',
                    self: this,
                    selectRow: row,//联系人信息
                    searchPrm: searchPrm, //搜索条件
                    callback: (flag, self) => {
                        this.GetDataList();//重新刷新列表
                    }
                });
            }, 'createvitation');

        },
        //模糊搜索
        SearchKeyList() {
            let searchPrm = {
                Where: {
                    ListenInvitationNo: this.quickSearchType == 2 ? this.SearchKey : "",
                    StuName: this.quickSearchType == 1 ? this.SearchKey : "",
                    StuPhone: this.quickSearchType == 3 ? this.SearchKey : "",
                    ClueNo: this.quickSearchType == 4 ? this.SearchKey : ""
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: "",
                SortCol: ""
            };
            this.$store.dispatch('GetListenVagueSeach', searchPrm);
        },
        SetLiveAdress(index, row) {
            require.ensure([], (require) => {
                let disLiveAddress = require("./CluesModalLiveAdress.vue");
                cluesModal.openComponent(disLiveAddress, {
                    title: '直播地址',
                    showCancelButton: false,
                    width: '500px',
                    showConfirmButton: false,
                    self: this,
                    selectRow: row,//联系人信息
                });
            }, 'liveAdress');

        },
        SendAccount(index, row) {
            require.ensure([], (require) => {
                let AddContent = require("./CluesModalinvitaSend.vue");
                cluesModal.openComponent(AddContent, {
                    title: '试听账号',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '350px',
                    self: this,
                    selectRow: row,//联系人信息
                });
            }, 'linvitaSend');
        },
        changeTime() {
            var etime = "";  var stime = "";
            var now = new Date(); //当前日期 
            var nowDayOfWeek = now.getDay(); //今天本周的第几天 
            var nowDay = now.getDate(); //当前日 
            var nowMonth = now.getMonth(); //当前月 
            var nowYear = now.getYear(); //当前年 
            nowYear += (nowYear < 2000) ? 1900 : 0; // 
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); //本周开始时间
            var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));//本周结束时间
            var monthStartDate = new Date(nowYear, nowMonth, 1); //本月的开始日期
            var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth, nowYear)); //本月的截止日期 
            switch (this.checkTimevalue) {
                case "today":
                    stime = format(now) + " 00:00:00"
                    etime = format(now) + " 23:59:59"
                    break;
                case "tswk":
                    stime = format(weekStartDate) + " 00:00:00"
                    etime = format(weekEndDate) + " 23:59:59"
                    break;
                case "thisMonth":
                    stime = format(monthStartDate) + " 00:00:00"
                    etime = format(monthEndDate) + " 23:59:59"
                    break;
            }
            this.searchTime = [stime, etime];
        },
        //获得某月的天数 
        getMonthDays(myMonth, myear) {
            var monthStartDate = new Date(myear, myMonth, 1);
            var monthEndDate = new Date(myear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },
        //开启直播
        // startLive(index, row) {
        //     if (row.teacherUrl == null && row.teacherUrl == "") {
        //         window.location.href = row.teacherUrl;
        //         this.MssageBox("直播地址还未开放", "warning");
        //     }
        // },
        showAddress(index, row) {
            if (row != null && row.LItype == "1000470") {
                return true;
            }
            else {
                return false;
            }

        },
        MssageBox(msg, typeIco) {
            Message({
                message: msg,
                type: typeIco
            });
        },
        //取消邀约
        CancelListen(index, row) {
            if (row != undefined && row != null && row.ListenInvitationNo != "") {
                MessageBox.confirm('确定取消当前邀约吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ListenCancel({ STno: row.ListenInvitationNo }).then(ret => { // 新增规则
                        if (ret.status === 0) {
                            if (ret.result == true) {
                                this.MssageBox('取消邀约成功', 'success');
                                this.GetDataList();
                                this.SearchCount();
                            }
                        }
                    })
                })
            }
        },
        SearchCount() {
            var stime = "";
            var totime = ""
            if (this.searchTime != undefined && this.searchTime.length > 0) {
                stime = format(this.searchTime[0]);
                totime = format(this.searchTime[1]);
                this.searchisAll = "";
            }
            let searchPrm = {
                LIStatus: this.searchStatus,
                uidList: this.searchUid,
                LItype: this.searchType,
                startTime: stime,
                endTime: totime,
                isAll: this.searchisAll,
                SearchKey: this.SearchKey
            };
            ListenStatisticsInfo(searchPrm).then(ret => {
                if (ret.status === 0) {
                    this.AppointmentCount = ret.result.AppointmentCount;
                    this.CancelCount = ret.result.CancelCount;
                    this.ArrivedCount = ret.result.ArrivedCount;
                    this.NotArrivedCount = ret.result.NotArrivedCount;
                }
            })
        }
    },
    computed: {

    },
    mounted: function() {
        var userid = "";
        var useModel = localStorage.getItem("CRM_USER_INFO");
        if (useModel != undefined && useModel != null) {
            var usedata = JSON.parse(useModel);
            if (usedata != undefined) {
                userid = usedata.UserId;
            }
            this.UserName = usedata.TrueName;
        }
        //绑定用户下拉框
        this.$store.dispatch('GetUidTree', { userId: userid });
        //试听类型
        this.$store.dispatch('GetListeStatuOrType', { dicType: 10039 });
        //试听状态
        this.$store.dispatch('GetListeStatuOrType', { dicType: 10040 });

        //查询已邀约数
        this.SearchCount();
        //加载列表
        this.GetDataList();


    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
    }
}
</script>