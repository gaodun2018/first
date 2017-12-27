<template>
    <div class="module-clues-content clues-manage-style">
        <div class="clues-wrap">
            <el-row>
                <el-col :span="12">
                    <el-button v-if="unlocking('Public_Pool_Clue_THGC')" style="position:relative;top:2px;margin-right: 8px" class="cluesButton-icon" :disabled="cluesGuid.length ? false : true" @click="onCluesButton('cluesDistribution')">
                        <i :class="cluesGuid.length ? 'cluesDistributionIcon' : 'cluesDistributionGray'"></i>
                        <span>线索分配</span>
                    </el-button>
                    <Tree :width="'193px'" placeholder="请选择公池帐号" ref="resetCreate" :callback="PublicUserTree" :treeType="'public'"></Tree>
                </el-col>
                <el-col :span="12">
                    <div class="clues-search" style="top: -2px">
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

            <div class="clues-table" style="margin-top: 12px">
                <el-table ref="multipleTable" border v-loading="loading" :data="SaleNewClueSearchList" :row-class-name="tableRowClassName" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
                    <el-table-column align="right" type="selection" fixed>
                    </el-table-column>
                    <el-table-column prop="CustomName" label="联系人姓名" width="125" fixed>
                    </el-table-column>
                    <el-table-column label="手机" width="140">
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
                    <el-table-column label="国际电话" width="150">
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
                            <div class="beyond-hidden-2" style="height: 48px;" :title="scope.row.CommunicatContent">{{scope.row.CommunicatContent}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="LastCommunicateTime" label="末次沟通时间" width="121" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d">
                    </el-table-column>
                    <el-table-column prop="Create_Time" label="创建时间" width="121" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d">
                    </el-table-column>
                    <el-table-column prop="ClueStatusName" label="线索状态" style="color: #666" width="110">
                    </el-table-column>
                    <el-table-column prop="TrafficStateName" label="话务状态" style="color: #666" width="110">
                    </el-table-column>
                    <el-table-column prop="ClueQualityName" label="优质线索类型" width="130" style="color: #666;">
                    </el-table-column>
                    <el-table-column prop="RepeatConsultationCount" label="重复咨询次数" width="130" style="color: #666;">
                    </el-table-column>
                    <el-table-column align="left" prop="EffectivelyChannelName" label="末次客户来源" width="130" style="display:  -webkit-box;margin-left: -4px;color:#1f2d3d">
                    </el-table-column>
                    <el-table-column prop="ClueOwnerName" label="线索所属人" width="110" style="color: #666;">
                    </el-table-column>
                    <el-table-column prop="ProfessionName" label="职业状态" style="color: #666" width="110">
                    </el-table-column>
                    <el-table-column label="所在省市" width="130px" style="color: #666">
                        <template scope="scope">
                            <span>{{scope.row.Province}} - {{scope.row.City}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ClueNo" label="线索编号" width="160px" style="color: #666">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作" width="122px">
                        <template scope="scope">
                            <span class="href-right">
                                <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/details?NavigationId=520&nw=1&Guid=${SaleNewClueSearchList[scope.$index].ClueGuid}&CustomGuid=${SaleNewClueSearchList[scope.$index].CustomGuid}`]">详情</a>
                            </span>
                            <el-button type="text" size="small">
                                <a style="color: #20a0ff" target="_blank" @click="OpenShareClue(scope.$index,scope.row)">共享查询</a>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="clues-pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="NewClueTotal" :page-count="10/pageSize">
                    </el-pagination>
                </div>
            </div>
        </div>
        <clues-tracking  @trackingEmit="trackingEmit" v-show="$store.state.cluesManage.isTracking"></clues-tracking>
        <div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format, checkedUserTree, getCallUp  } from '../../util/util';
import { CRM_USER_INFO, CRM_ORDER_PAGEID, CRM_CLUES_DETAILS, CRM_CLUES_TRACKING } from '../../util/keys';
import { parseUrl } from 'base';
import { GetSalePublicPoolList, GetPublicUserTree, GetReservationCommunicatClueStatistics, Distribute, KickCluePool } from '../../api/SaleManage';
import { GetContactByUid } from '../../api/callCenter';
import CluesTracking from '../cluesManage/CluesTracking.vue';
import cluesModal from 'vueModal';
import CustomModal from '../cluesManage/CluesModalCustom.vue';
import Tree from '../../containers/Tree.vue';

export default {
    components: { CluesTracking, Tree },
    data() {
        return {
            sharedGuid: '',
            sharedCustomGuid: '',
            currIndex: -1,
            phoneDisabled: false,
            showPhone: '号码读取中',
            contactDisabled: false,
            showContacts: '号码读取中',
            isTracking: false,
            defaultKeys: '',
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
            createId: [],//公池Id
            createFilter: '', // 线索创建人
            createName: '',//公池
            treeStatus: '', // 当前人员公池
            getUserTree: [], // 公池信息
            loading: false,
            searchValue: '',
            NewClueTotal: 0,
            pageSize: 10,
            currentPage: 1,
            ReservationCount: 0,
            ReservationOverCount: 0,
            LateBookingCount: 0,
            FollowedCount: 0,
            ClueStatusProps: {
                value: 'Id',
                label: 'Name',
                children: 'ChildrenList'
            },
            professionalStatus: [],
            form: {
                PublicPoolId: [],//客户池
                SeachType: '',   //检索类型
                SearchKey: ''     //关键字  
            },
            cluesButOne: [{
                value: '线索分配',
                name: 'cluesDistribution',
                bntTrue: 'cluesDistributionIcon',
                bntFalse: 'cluesDistributionGray'
            }],
            rules: {
                PublicPoolId: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
            },
            multipleSelection: [],

        }
    },
    watch: {
        createFilter(val) { // 线索创建人
            this.$refs.createTree.filter(val);
        }
    },
    methods: {
         trackingEmit(emit) {
           if (emit) {
               this.getCluleDataList();
           };
        },
        PublicUserTree(val) { // 所属人
            this.createId = val;
        },
        onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.$refs.resetPublicUser.$emit('resetTree');
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
                case 'cluesDistribution':
                    if (this.cluesGuid.length > 0) {
                        require.ensure([], (require) => {
                            let Distribution = require("../cluesManage/CluesModalCluesDistribution.vue");
                            cluesModal.openComponent(Distribution, {
                                title: '线索分配',
                                disablePopEvent: true,
                                showCancelButton: false,
                                showConfirmButton: false,
                                width: '500px',
                                height: '450px',
                                self: this,
                                callback: (flag, self) => {
                                }
                            }).then((modal) => {
                            });
                        }, 'distribution');
                    } else {
                        this.$message({
                            message: '要先选择线索才进行下一步操作哦',
                            type: 'warning'
                        });
                    }
                    break;
            }
        },
        hideTracking(flag) { // 隐藏跟进页面的弹层
            this.isTracking = flag;
            this.chooseGuid = '';
            document.body.style.overflow = 'auto';
        },
        PublicPoolChange() {
            this.getCluleDataList();
        },
        onClueTracking(index, rows) { // 线索跟进
            this.isTracking = true;
            document.body.style.overflow = 'hidden';
            const trackingShow = document.getElementById('clues-tracking-show');
            trackingShow.style.right = '15px';
            let trackingGuid = {
                data: rows,
                index,
                CustomGuid: rows[index].CustomGuid,
                Guid: rows[index].ClueGuid
            }
            this.chooseGuid = trackingGuid.Guid;
            this.$store.dispatch('getTrackingIds', trackingGuid);
        },
        onMoreCollapse() { // 线索搜索 => 搜索条件显示
            this.isCollapse = !this.isCollapse;
        },

        //共享查询
        OpenShareClue(index, rows) {
            let getGuid = {
                Guid: rows.ClueGuid,
                CustomGuid: rows.CustomGuid
            }
            this.$store.dispatch('cluesSharedGuid', getGuid);
            require.ensure([], (require) => {
                let CluesShared = require("../cluesManage/CluesModalShared.vue");
                cluesModal.openComponent(CluesShared, {
                    title: '共享查询',
                    showCancelButton: false,
                    showConfirmButton: false,
                    Guid: rows.ClueGuid,
                    CustomGuid: rows.CustomGuid,
                    width: '750px',
                    self: this,
                })
            }, 'shared')
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
        // 今日新线索列表接口
        getCluleDataList() {
            this.loading = true;
            const { PublicPoolId, SearchKey, SeachType } = this.form;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    PublicPoolId: this.createId,
                    SeachType,
                    SearchKey
                }
            }
            GetSalePublicPoolList(params).then(ret => {
                if (ret.status === 0) {
                    this.SaleNewClueSearchList = ret.result.Body;
                    this.NewClueTotal = ret.result.Count;
                    this.LateBookingCount = ret.result.LateBookingCount;
                }
                this.loading = false;
            }).catch(() => { this.loading = false; });
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
            }
        },
        showCallTip(type, index, rows) { // 显示电话号码
            if (((rows[index].Mobile.indexOf('*') > -1) || (rows[index].OverseasMobile.indexOf('*') > -1 )) && this.unlocking('Show_Customer_Phone_ Clear')) {
                GetContactByUid({phoneType: type, Uid: rows[index].Uid, mobile: type == 0 ? rows[index].Mobile : rows[index].OverseasMobile}).then((ret) => {
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
                    CustomGuid: rows[index].CustomGuid,
                    data: rows,
                    index,
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
                    CustomGuid: rows[index].CustomGuid,
                    data: rows,
                    index,
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
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));

    },
    mounted() {
        this.getCluleDataList(); //公池列表     
    },
}
</script>