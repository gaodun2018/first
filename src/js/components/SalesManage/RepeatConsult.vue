<template>
    <div class="module-clues-content clues-manage-style">
        <div class="clues-wrap">
            <div class="clues-layout-left">
                <el-row>
                    <el-col :span="12">
                        <el-button v-if="unlocking('Repeat_Consult_GC')" style="position:relative;top:2px;margin-right: 8px" class="cluesButton-icon" :disabled="cluesGuid.length ? false : true" @click="onCluesButton('KickPool')">
                            <i :class="cluesGuid.length ? 'cluesRemovIcon' : 'cluesRemovgray'"></i>
                            <span>踢回公池</span>
                        </el-button>
                        <Tree :width="'193px'" placeholder="请选择人员" :allSelected="selectChange" :callback="personnelTree"></Tree>
                    </el-col>
                    <el-col :span="12">
                        <div class="clues-search">
                            <el-input class="clues-manage-search-input" placeholder="线索ID、手机、姓名、QQ、微信" v-model="form.SearchKey" size="small" @focus="onFocusType" @blur="onBlurType">
                                <el-button slot="append" icon="search" @click="quickQuery"></el-button>
                            </el-input>
                            <div class="clues-search-select" v-show="isSelect">
                                <ul id="searchType">
                                    <li @click="onASearchType(0)" style="color: #42aedf">
                                        <span style="display: inline-block; width: 75px">线索编号 </span>
                                        <span class="search-type-text"> {{form.SearchKey}}</span>
                                    </li>
                                    <li @click="onASearchType(2)">
                                        <span style="display: inline-block; width: 80px">客户姓名 </span>
                                        <span class="search-type-text">{{form.SearchKey}}</span>
                                    </li>
                                    <li @click="onASearchType(3)">
                                        <span style="display: inline-block; width: 80px">手机 </span>
                                        <span class="search-type-text">{{form.SearchKey}}</span>
                                    </li>
                                    <li @click="onASearchType(4)">
                                        <span style="display: inline-block; width: 80px">国际电话 </span>
                                        <span class="search-type-text">{{form.SearchKey}}</span>
                                    </li>
                                    <li @click="onASearchType(5)">
                                        <span style="display: inline-block; width: 80px">其他联系方式 </span>
                                        <span class="search-type-text" style="margin-left:10px;">{{form.SearchKey}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div style="margin-top:10px;font-size: 14px;color: #666">
                    <el-row>
                        <el-col>
                            <el-radio-group v-model="form.FollowUpState" @change="followStatusChange">
                                <el-radio style="color: #666" :label="0">全部</el-radio>
                                <el-radio style="color: #666;margin-left: 25px" :label="1">已跟进</el-radio>
                                <el-radio style="color: #666;margin-left: 25px" :label="2">未跟进</el-radio>
                            </el-radio-group>
                            <span style="margin-left: 25px">今日重复咨询线索：
                                <span style="color: #f89f7a; font-size: 12px">{{RepeatConsultCount || 0}}</span>
                            </span>
                            <span style="margin-left: 25px">已跟进：
                                <span style="color: #f89f7a; font-size: 12px">{{FollowedCount || 0}}</span>
                            </span>
                        </el-col>
                    </el-row>
                </div>

                <div class="clues-table NewCluetable" style="margin-top: 14px;">
                    <el-table border ref="multipleTable" v-loading="loading" :data="SaleNewClueSearchList" :row-class-name="tableRowClassName" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" @sort-change="sortChange">
                        <el-table-column align="right" type="selection" fixed>
                        </el-table-column>
                        <el-table-column prop="CustomName" label="联系人姓名" width="125px" fixed>
                        </el-table-column>
                        <el-table-column label="手机" width="140px">
                            <template scope="scope">
                                <div @mouseover="callTooltip(scope.$index)">
                                    <el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
                                        <span @click.stop="showCallTip(0, scope.$index, SaleNewClueSearchList)">{{scope.row.Mobile}}</span>
                                    </el-tooltip>
                                    <a style="margin-left: -4px" v-if="scope.row.Mobile" href="javascript:void(0)" @click="callUp_Mobile(scope.$index, SaleNewClueSearchList)">
                                        <i class="tracking-phone-icon"></i>
                                    </a>
                                    <span v-else>--</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="国际电话" width="145px">
                            <template scope="scope">
                                <div @mouseover="callTooltip(scope.$index)">
                                    <el-tooltip :disabled="!contactDisabled" :content="showContacts" placement="bottom" effect="light">
                                        <span @click.stop="showCallTip(1, scope.$index, SaleNewClueSearchList)">{{scope.row.OverseasMobile}}</span>
                                    </el-tooltip>
                                    <a style="margin-left: -4px" v-if="parseInt(scope.row.OverseasMobile)>=0" href="javascript:void(0)" @click="callUp_OverseasMobile(scope.$index, SaleNewClueSearchList)">
                                        <i class="tracking-phone-icon"></i>
                                    </a>
                                    <span v-else>--</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CourseTypeName" label="感兴趣项目" width="130px">
                        </el-table-column>
                        <el-table-column align="left" prop="CommunicatContent" label="末次沟通记录" width="200px" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d;">
                            <template scope="scope">
                                 <div @mouseover="callTooltip(scope.$index)">
                                    <el-tooltip :disabled="!communicatDisabled" :content="content" placement="bottom" effect="light">
                                        <span class="beyond-hidden" style="cursor: pointer;" @click.stop="showCommunicatTip(scope.$index, SaleNewClueSearchList)">{{scope.row.CommunicatContent}}</span>
                                        <div slot="content" class="c-tip-content-box">
                                            <div class="commucinate-item" v-for="(c,cIndex) in showCommunicat" :key="cIndex">
                                                {{c.CommucinateDate}} - {{c.Creator}} - <span style="color:#8f9aac;">{{c.CommucinateContent}}</span>
                                            </div>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="LastCommunicateTime" sortable label="最后沟通时间" width="145" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d">
                        </el-table-column>
                        <el-table-column prop="NextCommunicateTime" sortable label="下次沟通时间" width="145" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d">
                        </el-table-column>
                        <el-table-column prop="RepeatConsultationTime" sortable label="重复咨询时间" width="145" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d">
                        </el-table-column>
                        <el-table-column prop="RepeatConsultationOwnerName" label="重复咨询人" width="121" style="color: #666;">
                        </el-table-column>
                        <el-table-column prop="RepeatConsultationCount" label="重复咨询次数" width="121" style="color: #666;">
                        </el-table-column>
                        <el-table-column prop="ClueQualityName" label="优质线索类型" style="color: #666" width="130px">
                        </el-table-column>
                        <el-table-column prop="EffectivelyChannelName" label="末次客户来源" width="140" style="color: #666">
                        </el-table-column>
                        <el-table-column prop="ClueOwnerName" label="线索所属人" width="121" style="color: #666">
                        </el-table-column>
                    <el-table-column prop="ClueStatusName" sortable label="线索状态" style="color: #666" width="120">
                    </el-table-column>
                        <el-table-column prop="ProfessionName" label="职业状态" width="110px" style="color: #666">
                        </el-table-column>
                        <el-table-column prop="ClueNo" label="线索ID" width="160px" style="color: #666">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" align="center" width="190px" v-if="unlocking(['Repeat_Consult_Tracking', 'Repeat_Consult_Create', 'Repeat_Consult_Details', 'Repeat_Consult_Audition', 'Repeat_Consult_Shared'])">
                            <template scope="scope">
                                <el-button v-if="unlocking('Repeat_Consult_Tracking')" style="margin-right: 5px" type="text" size="small" @click="onClueTracking(scope.$index, SaleNewClueSearchList)">
                                    跟进
                                </el-button>
                                <span v-if="unlocking('Repeat_Consult_Create')" class="href-right">
                                    <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/create?nw=1&Guid=${SaleNewClueSearchList[scope.$index].ClueGuid}&CustomGuid=${SaleNewClueSearchList[scope.$index].CustomGuid}`]">报名</a>
                                </span>
                                <span class="href-right" v-if="unlocking('Repeat_Consult_Details')">
                                    <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/details?NavigationId=520&nw=1&Guid=${SaleNewClueSearchList[scope.$index].ClueGuid}&CustomGuid=${SaleNewClueSearchList[scope.$index].CustomGuid}`]">详情</a>
                                </span>
                                <el-dropdown trigger="hover" @command="handleDropdown">
                                    <span class="el-dropdown-link" @mouseover="sharedCluesId(scope.$index, SaleNewClueSearchList)">
                                        更多
                                        <i class="el-icon-caret-bottom el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="cluesAudition" v-if="unlocking('Repeat_Consult_Audition')">
                                            <a style="color: #48576a" target="_blank" @click="MakeLister(scope.$index,scope.row)">预约试听</a>
                                        </el-dropdown-item>
                                        <el-dropdown-item v-if="unlocking('Repeat_Consult_Shared')" command="cluesShared">共享查询</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="clues-pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="NewClueTotal" :page-count="10/pageSize">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <clues-tracking @trackingEmit="trackingEmit" :setChoose="getChoose" v-show="$store.state.cluesManage.isTracking" ></clues-tracking>
            <div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
        </div>
    </div>
</template>
<style>
.tip-item {
    margin: -40px;
}

.commucinate-item{
    line-height:20px;
    border-bottom: 1px dashed #ccc;
    margin-bottom: 5px;
}
.c-tip-content-box{
    max-height:300px;
    width:350px;
    overflow-y:scroll;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format, getCallUp } from '../../util/util';
import { CRM_USER_INFO, CRM_ORDER_PAGEID, CRM_CLUES_DETAILS, CRM_CLUES_TRACKING } from '../../util/keys';
import { parseUrl } from 'base';
import { GetRepeatedClueList, GetRepeatedClueStatistics, Distribute, KickCluePool } from '../../api/SaleManage';
import CluesTracking from '../cluesManage/CluesTracking.vue';
import cluesModal from 'vueModal';
import { GetContactByUid } from '../../api/callCenter';
import CustomModal from '../cluesManage/CluesModalCustom.vue';
import Tree from '../../containers/Tree.vue';
import {GetCommucinateContentList} from '../../api/cluesManage';

export default {
    components: { CluesTracking, Tree },
    data() {
        return {
            currIndex: -1,
            sharedGuid: '',
            sharedCustomGuid: '',
            phoneDisabled: false,
            showPhone: '号码读取中',
            contactDisabled: false,
            showContacts: '号码读取中',
            personnel: [],
            isTracking: false,
            defaultKeys: '',
            showCommunicat: [],
            communicatDisabled: false,
            defaultProps: {
                label: 'Name',
                children: 'ChildrenList'
            },
            SaleNewClueSearchList: [], // 线索列表数据
            cluesGuid: [], // 获取Guid 
            chooseGuid: '', // 高亮显示的行
            objParams: {},
            trackingGuid: {}, // 跟进页使用Guid
            isSelect: false,
            isCollapse: false,
            loading: false,
            searchValue: '',
            NewClueTotal: 0,
            pageSize: 10,
            currentPage: 1,
            RepeatConsultCount: 0,
            FollowedCount: 0,
            ClueStatusProps: {
                value: 'Id',
                label: 'Name',
                children: 'ChildrenList'
            },
            professionalStatus: [],
            form: {
                FollowUpState: 2,//跟进状态
                SeachType: '',   //检索类型
                SearchKey: ''     //关键字  
            },
            rules: {
                FollowUpState: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
            },
            multipleSelection: [],
            sortName:'',
            sortType:1,
        }
    },
    methods: {
        showCommunicatTip(index, rows) { // 查看更多沟通记录
            GetCommucinateContentList(rows[index].ClueGuid).then((ret) => {
                if (ret.status === 0) {
                    this.showCommunicat = ret.result;
                    this.communicatDisabled = true;
                }
            })
        },
        trackingEmit(emit) {
           if (emit) {
               this.getCluleDataList();
           };
        },
        sortChange(column, prop, order){
            this.sortName = column.prop;
            if(column.order==='ascending'){
               this.sortType=0;
            }
            else {
                this.sortType=1;
            }
            this.getCluleDataList();
        },
        tableRowClassName(row, index) { // 选中列表行高亮显示
            for (let i = 0; i < this.multipleSelection.length; i++) {
                if (row.ClueGuid === this.multipleSelection[i].ClueGuid) {
                    return 'positive-row';
                }
            }
            if (row.ClueGuid === this.chooseGuid) {
                return 'positive-row';
            }
            return '';
        },

        personnelTree(val) { // 人员树
            this.personnel = val;
        },
        selectChange() {
            this.getCluleDataList();
        },

        getCluesChecked(getclues) { // 索取所选ID
            let getCluesId = [];
            let filterId = [];
            for (let i = 0; i < getclues.length; i++) {
                getCluesId.push(getclues[i].Id);
            }
            for (let j = 0; j < getCluesId.length; j++) {
                if (Number(getCluesId[j]) == parseFloat(getCluesId[j])) {
                    filterId.push(getCluesId[j]);
                }
            }
            return filterId;
        },
        //踢回公池
        onCluesButton(val) { // 线索列表上方按钮事件            
            switch (val) {
                case 'newUsers':
                    this.$router.push({ path: '/clue/addClientele?nid=521' })
                    this.$store.dispatch('updateCurrentTabId', '/clue/addClientele?nid=521')
                    break;
                case 'KickPool':

                    if (this.cluesGuid.length > 0) {
                        this.$store.dispatch('cluesSelectedNum', this.cluesGuid.length);
                        require.ensure([], (require) => {
                            let KickPool = require("../cluesManage/CluesModalKickpool.vue");
                            cluesModal.openComponent(KickPool, {
                                title: '踢回公池',
                                showCancelButton: true,
                                showConfirmButton: true,
                                width: '450px',
                                self: this,
                                callback: (flag, self) => {
                                    if (flag === 'confirm') {
                                        const ISNUM = /^\+?[1-9][0-9]*$/;
                                        let UserIds = []
                                        UserIds.push(this.$store.state.cluesManage.getTkickPool);
                                        let CluesIds = this.$store.state.cluesManage.getDistributionGuid;
                                        const params = {
                                            CluesIds,
                                            UserIds,
                                        }
                                        if (!ISNUM.test(UserIds)) {
                                            this.$message({
                                                message: '请选择正确的人员',
                                                type: 'warning'
                                            });
                                            return false;
                                        }
                                        KickCluePool(params).then(ret => {
                                            if (ret.status === 0) {
                                                this.$message({
                                                    message: '踢回公池成功',
                                                    type: 'success'
                                                });
                                                this.getCluleDataList();
                                            }
                                        })
                                    }
                                }
                            }).then((modal) => {
                            });
                        }, 'KickPool');
                    } else {
                        this.$message({
                            message: '要先选择线索才进行下一步操作哦',
                            type: 'warning'
                        });
                    }
                    break;
                case 'SubordinateQuery':
                    require.ensure([], (require) => {
                        let SubordinateQuery = require("../cluesManage/CluesModalSubordinateQuery.vue");
                        cluesModal.openComponent(SubordinateQuery, {
                            title: '所属人查询',
                            showCancelButton: false,
                            showConfirmButton: false,
                            width: '590px',
                            self: this,
                            callback: (flag, self) => {
                            }
                        }).then((modal) => {
                        });
                    }, 'subordinateQuery');
                    break;
            }
        },
        hideTracking(flag) { // 隐藏跟进页面的弹层
            this.isTracking = flag;
            this.chooseGuid = '';
            document.body.style.overflow = 'auto';
        },
        followStatusChange() {
            this.getCluleDataList();
        },
        onClueTracking(index, rows) { // 线索跟进
            let trackingGuid = {
                data: rows,
                index,
                CustomGuid: rows[index].CustomGuid,
                Guid: rows[index].ClueGuid,
                ID: rows[index].Id,
                Uid: rows[index].Uid
            }
            this.$store.dispatch('getTrackingIds', trackingGuid);
            this.chooseGuid = trackingGuid.Guid;
            this.$store.dispatch('isTracking', true);
        },
        onMoreCollapse() { // 线索搜索 => 搜索条件显示
            this.isCollapse = !this.isCollapse;
        },
        sharedCluesId(index, rows) { // 线索共享页获取ID
            let getGuid = {
                Guid: rows[index].ClueGuid,
                CustomGuid: rows[index].CustomGuid
            }
            this.$store.dispatch('cluesSharedGuid', getGuid);

            this.sharedGuid = rows[index].ClueGuid;
            this.sharedCustomGuid = rows[index].CustomGuid;
        },
        handleDropdown(command) { // 切换到页面=> 线索共享查询
            if (command == 'cluesShared') {
                require.ensure([], (require) => {
                    let CluesShared = require("../cluesManage/CluesModalShared.vue");
                    cluesModal.openComponent(CluesShared, {
                        title: '共享查询',
                        showCancelButton: false,
                        showConfirmButton: false,
                        Guid: this.sharedGuid,
                        CustomGuid: this.sharedCustomGuid,
                        width: '750px',
                        self: this,
                    })
                }, 'shared');
            } else if (command == 'cluesAudition') {
                // this.$router.push({ path: '/invitation/audition?NavigationId=521&nw=1' })
            }
        },
        handleSelectionChange(guid) {
            this.cluesGuid = [];
            guid.map((item, index) => {
                this.cluesGuid.push(item.ClueGuid);
            })
            this.$store.dispatch('getDistributionGuid', this.cluesGuid);
            this.multipleSelection = guid;
        },

        async quickQuery() { // 模糊搜索
            this.currentPage = 1;
            this.getCluleDataList();
        },
        getRepeatedClueStatistics() {
            let parms = {};
            GetRepeatedClueStatistics(parms).then(ret => {
                if (ret.status === 0) {
                    this.RepeatConsultCount = ret.result.NewClueCount;
                    this.FollowedCount = ret.result.FollowUpCount;
                }
            });
        },
        // 今日新线索列表接口
        getCluleDataList() {
            this.loading = true;
            const { FollowUpState, SearchKey, SeachType } = this.form;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    PublicPoolId: this.personnel,
                    FollowUpState,
                    SeachType,
                    SearchKey
                },
                OrderBy:this.sortName,
                SortCol:this.sortType
            }
            GetRepeatedClueList(params).then(ret => {
                if (ret.status === 0) {
                    this.SaleNewClueSearchList = ret.result.Body;
                    this.NewClueTotal = ret.result.Count;
                    this.loading = false;
                } else {
                    this.loading = false;
                }
            });
        },

        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.objParams.PageIndex = val;
            this.getCluleDataList();

        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.objParams.PageSize = val;
            this.getCluleDataList();
        },

        callTooltip(index) { // 显示电话明文
            if (index != this.currIndex) {
                this.currIndex = index;
                this.phoneDisabled = false;
                this.contactDisabled = false;
                this.communicatDisabled = false;
            }
        },
        showCallTip(type, index, rows) { // 显示电话号码
            if (((rows[index].Mobile.indexOf('*') > -1) || (rows[index].OverseasMobile.indexOf('*') > -1 )) && this.unlocking('Show_Customer_Phone_ Clear')) {
                GetContactByUid({ phoneType: type, Uid: rows[index].Uid, mobile: type == 0 ? rows[index].Mobile : rows[index].OverseasMobile }).then((ret) => {
                    if (ret.status === 0) {
                        if (type === 0) {
                            this.phoneDisabled = true;
                            this.showPhone = ret.result || '号码有误';
                        } else if (type === 1) {
                            this.contactDisabled = true;
                            this.showContacts = ret.result || '号码有误';
                        }
                    }
                })
            }
        },
        callUp_Mobile(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Mobile, 0, rows[index].CustomGuid, rows[index].ClueGuid)
            if (this.$store.state.cluesManage.isTracking) {
                let trackingGuid = {
                data: rows,
                index,
                CustomGuid: rows[index].CustomGuid,
                Guid: rows[index].ClueGuid,
                ID: rows[index].Id,
                Uid: rows[index].Uid
            }
            this.$store.dispatch('getTrackingIds', trackingGuid);
            }
        },
        callUp_OverseasMobile(index, rows) { //拨打海外电话
            getCallUp(this, rows[index].Uid, rows[index].OverseasMobile, 1, rows[index].CustomGuid, rows[index].ClueGuid)
            if (this.$store.state.cluesManage.isTracking) {
                let trackingGuid = {
                data: rows,
                index,
                CustomGuid: rows[index].CustomGuid,
                Guid: rows[index].ClueGuid,
                ID: rows[index].Id,
                Uid: rows[index].Uid
            }
            this.$store.dispatch('getTrackingIds', trackingGuid);
            }
        },
        onASearchType(type) { // 模糊搜索选择类
            this.form.SeachType = type + 1;
            if (type !== 0)
                type = type - 1;
            let searchType = document.getElementById('searchType');
            let typeId = searchType.getElementsByTagName('li');
            for (let i = 0; i < typeId.length; i++) {
                if (typeId[i] === typeId[type]) {
                    typeId[i].style.color = '#42aedf';
                } else {
                    typeId[i].style.color = '#48576a';
                }
            }
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            clearTimeout(window.time);
            this.isSelect = true;
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            window.time = setTimeout(function() {
                self.isSelect = false;
            }, 500);
        },
        MakeLister(index, row) {
            require.ensure([], (require) => {
                let AddContent = require("../cluesManage/CluesModalinvitation.vue");
                cluesModal.openComponent(AddContent, {
                    title: '创建邀约',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '500px',
                    self: this,
                    contactsData: { Guid: row.CustomGuid, Mobile: row.Mobile, TrueName: row.CustomName },//联系人信息
                    cluesLine: { CourseType: row.CourseType, Guid: row.ClueGuid } // 线索信息
                });
            }, 'createvitation');
        },
    },
    computed: {

    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
    },
    mounted() {
        this.getCluleDataList(); //重复咨询列表  
        this.getRepeatedClueStatistics();//重复咨询统计      
    },
}
</script>