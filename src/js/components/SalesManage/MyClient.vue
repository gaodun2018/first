<template>
    <div class="module-clues-content clues-manage-style">
        <div class="clues-wrap">
            <div class="clues-layout-left">
                <div>
                    <tool-tip></tool-tip>
                    <el-row style="height: 35px; line-height: 35px">
                        <el-col :span="13" class="clues-bnt-item" style="font-size: 0">
                            <span v-if="unlocking('CRM_AddClue_WDKH')" style="width: 80px;height: 29px;margin-right: 0px;" class="clues-new-add-bnt addNewuserIcon">
                                <a style="color: #49a1f6" target="_blank" href="/#/clue/addClientele?nid=521&nw=1">
                                    <i></i>
                                    <span>新增客户</span>
                                </a>
                            </span>
                            <span style="margin-left: 10px;display: inline-block; height: 30px;" v-for="item in cluesButTwo" :key="item.class">
                                <el-button class="cluesButton-icon" v-if="unlocking(`${item.funcKey}`)" style="width: 95px" @click="onCluesButton(item.name)">
                                    <i :class="item.class"></i>
                                    <span>{{item.value}}</span>
                                </el-button>
                            </span>
                            <span style="height: 30px" v-for="bnt in cluesButOne" :key="bnt.value">
                                <el-button :loading="bnt.name == 'KickPool' && bntLoading" v-if="unlocking(`${bnt.funcKey}`)" style="margin-left: 10px" class="cluesButton-icon" :disabled="cluesGuid.length ? false : true" @click="onCluesButton(bnt.name)">
                                    <i :class="cluesGuid.length ? bnt.bntTrue : bnt.bntFalse"></i>
                                    <span>{{bnt.value}}</span>
                                </el-button>
                            </span>

                        </el-col>
                        <el-col :span="11">
                            <div class="clues-search" style="top: -2px">
                                <el-input class="clues-manage-search-input" style="top: -2px;width: 300px" placeholder="线索ID、客户编号、手机、姓名、QQ、微信" v-model="searchValue" size="small" @focus="onFocusType" @blur="onBlurType">
                                    <el-button slot="append" icon="search" @click="quickQuery"></el-button>
                                </el-input>
                                <el-button type="text" class="clues-button-search" @click="onAdvancedSearch">
                                    {{!isSearch ? '高级搜索' : '快捷搜索'}}
                                </el-button>
                                <a href="javascript:void(0)" @click="onSettingTable">
                                    <i :class="{['setting-close']:!isSetting,['setting-open']:isSetting}"></i>
                                </a>
                                <div class="clues-search-select" style="width: 299px" v-show="isSelect">
                                    <ul>
                                        <li v-for="(item, index) in cluesTypeItem" :key="index" :class='{"f-active": SeachType == index+1}' @click.stop="onCluesType(index)">
                                            <span class="search-type-name" style="width: 85px">{{item.type}} </span>
                                            <span class="search-type-text"> {{searchValue}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                
            <div style="margin-top:15px;font-size: 14px;color: #666">
                <el-row>
                    <el-col>
                        <el-radio-group v-model="form.FollowUpState" @change="followStatusChange">
                            <el-radio style="color: #666" :label="0">全部</el-radio>
                            <el-radio style="color: #666;margin-left: 25px" :label="1">未成交</el-radio>
                            <el-radio style="color: #666;margin-left: 25px" :label="2">已成交</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
                <div v-bind:class="{['clues-conditions-hide']:!isSearch,['clues-conditions']:isSearch}">
                    <el-form ref="form" :model="form" label-width="115px">
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label="线索创建时间:" prop="Create_Time">
                                    <el-date-picker v-model="form.Create_Time" size="small" format="" type="daterange" style="width: 195px" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <div>
                                    <el-form-item label="线索创建人:">
                                        <Tree ref="resetCreate" width="195px" :data="createData" :onCheck="createTree" placeholder="请选择创建人"></Tree>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item style="float: right" label="下次沟通时间:" prop="NextCommunicateTime">
                                    <el-date-picker size="small" v-model="form.NextCommunicateTime" style="width: 195px" type="daterange" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label="所属人获得时间:" prop="ClueOwerGetTime">
                                    <el-date-picker v-model="form.ClueOwerGetTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 195px">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <div>
                                    <el-form-item label="线索所属人:">
                                        <Tree ref="resetOwner" width="195px" :data="createData" :onCheck="ownerTree" placeholder="请选择所属人"></Tree>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item style="float: right" label="线索状态:" prop="ClueStatus">
                                    <el-select v-model="form.ClueStatus" placeholder="请选择" filterable clearable size="small" style="width: 195px">
                                        <el-option v-for="intention in cluesStatusData" :key="intention.Id" :label="intention.Name" :value="intention.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label="客户意向度:" prop="IntentionGrade">
                                    <el-select v-model="form.IntentionGrade" placeholder="请选择" filterable clearable size="small" style="width: 195px" @visible-change="onIntentionDegree">
                                        <el-option v-for="intention in intentionDegreeData" :key="intention.Id" :label="intention.Name" :value="intention.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label="优质线索类型:" prop="ClueQuality">
                                    <el-select filterable v-model="form.ClueQuality" multiple placeholder="请选择" size="small" style="width: 195px" @visible-change="onOptimalClues">
                                        <el-option v-for="item in optimalCluesType" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <div>
                                    <el-form-item style="float: right" label="重复咨询人:">
                                        <Tree width="195px" ref="resetRepeatr" :data="createData" :onCheck="repeatrTree" placeholder="请选择重复咨询人"></Tree>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label="重复咨询时间:" prop="RepeatConsultationTime">
                                    <el-date-picker v-model="form.RepeatConsultationTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 195px">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                               <el-form-item label="学校" prop="School">
                                    <el-autocomplete size="small" v-model="form.SchoolName" style="width: 192px" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" placeholder="请输入学校" @select="handleSelect"></el-autocomplete>
                                </el-form-item>
                            </el-col>
                             <el-col :sm="8">
                                <el-form-item  style="float: right" label="专业:" prop="Major">
                                    <el-input v-model="form.Major" size="small" style="width: 192px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label="入学年份" prop="EnrollmentYear">
                                    <el-date-picker v-model="form.EnrollmentYear" type="year" placeholder="选择年份" style="width: 192px" size="small"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label="关联标签:" prop="Urgency">
                                    <Tree ref="labelUser" width="192px" :data="labelData" :value="labelUser" :onCheck="labelTree" placeholder="请选择标签"></Tree>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="module-clues-collapse">
                            <a href="javascript:void(0)" class="clues-collapse" @click="onAdvancedSearch">
                                <i class="collapse-icon-down el-icon-d-arrow-left"></i>
                                <span>收起</span>
                            </a>
                            <el-form-item label-width="0" class="clues-collapse-but">
                                <el-button style="width: 70px" type="primary" size="small" @click="onSubmit">查询
                                </el-button>
                                <el-button style="width: 70px" type="primary" size="small" @click="onReset('form')">清除条件
                                </el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div v-loading="loading" style="margin-top: 10px" :class="printClass(['CM_FollowClue_WDKH','CRM_MyClent_ModifyInfo','CM_Sign up_WDKH','CM_ListenInvitation_WDKH','CM_SearchShareClue_WDKH'])">
                    <table id="clientDg" :style="{width:'100%',height: winHeight+'px'}"></table>
                    <div class="clues-pagination">
                        <div style="position: relative;top:5px;color: #48576a;display: inline-block" v-show="cluesGuid.length">已选中 {{cluesGuid.length}} 条</div>
                        <el-pagination style="display: inline-block" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                        </el-pagination>
                    </div>
                </div>
            </div>
             <el-dialog title="沟通记录" :visible.sync="dialogVisible" size="small" @close="closeDialog">
                <div>
                    <div v-if="showCommunicat.length" class="commucinate-item" v-for="(c,cIndex) in showCommunicat" :key="cIndex">
                        {{c.CommucinateDate}} - {{c.Creator}} - <span style="color:#8f9aac;word-break: break-all">{{c.CommucinateContent}}</span>
                    </div>
                    <div v-else style="text-align:center">暂无数据</div>
                </div>
            </el-dialog>
            <clues-tracking @trackingEmit="trackingEmit" v-show="$store.state.cluesManage.isTracking"></clues-tracking>
            <div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
        </div>
    </div>
</template>
<style>
.client_tracking,.client_modify,.client_enrol,.client_audition,.client_shared {
    display: none;
}
.CM_FollowClue_WDKH .client_tracking,.CRM_MyClent_ModifyInfo .client_modify,.up_WDKH .client_enrol,.CM_ListenInvitation_WDKH .client_audition,.CM_SearchShareClue_WDKH .client_shared {
    display: block;
}
[field='Mobile'] .datagrid-cell, [field='OverseasMobile'] .datagrid-cell {
    overflow: inherit;
    position: relative;
}

.clues-manage-style .el-button.el-button--default.cluesButton-icon>span,
.clues-manage-style .addNewuserIcon>span {
    position: relative;
    bottom: 3px;
}

.clues-new-add-bnt {
    display: inline-block;
    line-height: 28px;
    position: relative;
    top: -2px;
}

.clues-manage-style .clues-wrap .el-form-item {
    margin-bottom: 10px;
}

.clues-manage-style .clues-table .el-pagination {
    text-align: right;
}

.clues-manage-style .el-dropdown {
    font-size: 12px;
    color: #20a0ff;
}

.clues-manage-style .el-button-border {
    padding-right: 5px;
    border-right: 1px solid #20a0ff;
    border-radius: inherit;
}
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
import ToolTip from '../../plugins/crmTooltip/ToolTip.vue';
import { format, checkedUserTree, getCallUp } from '../../util/util';
import { CRM_USER_INFO, CRM_ORDER_PAGEID, CRM_CLUES_DETAILS, CRM_CLUES_TRACKING } from '../../util/keys';
// import { myClientTable } from '../common/selesMyClient';
import 'easyuiCss';
import 'easyui';
import { cluesTypeItem } from '../common/cluesConfig';
import { parseUrl } from 'base';
import {
    ClueVagueSeachList,
    intentionDegree,
    OptimalCluesType,
    cluesStatus,
    getchannels,
    Distribute,
    GetClueStatusTree,
    GetCustomerSourceTree,
    getProviceOrCity,
    KickCluePool,
    GetBase_PageFieldConfig,
    GetCommucinateContentList,
    getValueSchools,
    GetLabelList,
    GetAllowedUserTree
} from '../../api/cluesManage';
import { GetMyCustomClueList, GetVagueMyCustomClueList } from '../../api/SaleManage';
import { GetContactByUid } from '../../api/callCenter';
import cluesModal from 'vueModal';
// import Tree from '../../containers/Tree.vue';
import Tree from '../../plugins/tree/ExtendZTree.vue';
import CluesTracking from '../cluesManage/CluesTracking.vue';
import CustomModal from '../cluesManage/CluesModalCustom.vue';
import CrmTooltip from '../../plugins/crmTooltip/index.js';

export default {
    components: { CluesTracking, Tree, ToolTip },
    data() {
        return {
            winHeight: 0,
            bntLoading: false,
            createData: [],
            dialogVisible: false,
            myClientTable:[{
                field: 'Mobile',
                width: 110,
                sortable: true,
                title: '手机',
                formatter: function(value, row, index) {
                    if (value) {
                        return `<textarea style="display:none;">${JSON.stringify(row)}</textarea><span style="position: relative" class="client-phone-number">${value}
                        <div class="phone-number-tips" ></div>
                        </span><span class="tracking-phone-icon client-callphone"></span>`;
                    } else {
                        return '--';
                    }
                }
            }, {
                field: 'OverseasMobile',
                width: 110,
                sortable: false,
                title: '国际电话',
                formatter: function(value, row, index) {
                    if (parseInt(value) >= 0) {
                        return `<textarea style="display:none;">${JSON.stringify(row)}</textarea><span class="client-call-number">${value}<div class="phone-number-tips" ></div></span><span class="tracking-phone-icon client-callTell"></span>`;
                    } else {
                        return '--';
                    }
                }
            }, {
                field: 'CourseTypeName',
                width: 115,
                sortable: true,
                title: '感兴趣项目',
                formatter:this.formatterVal
            }, {
                field: 'CommunicatContent',
                width: 160,
                sortable: true,
                title: '沟通记录',
                formatter: function(value, row, index) {
                    return `<div title="${value}" class="communicat_content beyond-hidden-2">${value}</div><textarea style="display:none">${JSON.stringify(row.ClueGuid)}</textarea>`
                }
            }, {
                field: 'LastCommunicateTime',
                width: 125,
                sortable: true,
                title: '末次沟通时间',
                formatter:this.formatterVal
            }, {
                field: 'NextCommunicateTime',
                width: 125,
                sortable: true,
                title: '下次沟通时间',
                formatter:this.formatterVal
            }, {
                field: 'ClueOwnerName',
                width: 110,
                sortable: true,
                title: '线索所属人',
                formatter:this.formatterVal
            }, {
                field: 'ClueStatusName',
                width: 120,
                sortable: true,
                title: '线索状态',
                formatter:this.formatterVal
            }, {
                width: 85,
                field: 'TrafficStateName',
                sortable: true,
                title: '话务状态',
                formatter:this.formatterVal
            }, {
                field: 'Create_ByName',
                width: 110,
                sortable: true,
                title: '线索创建人',
                formatter:this.formatterVal
            }, {
                field: 'ClueOwerGetTime',
                width: 125,
                sortable: true,
                title: '所属人获得时间',
                formatter:this.formatterVal
            }, {
                field: 'Create_Time',
                width: 125,
                sortable: true,
                title: '创建时间',
                formatter:this.formatterVal
            }, {
                field: 'IntentionGradeName',
                width: 115,
                sortable: true,
                title: '客户意向度',
                formatter:this.formatterVal
            }, {
                field: 'EffectivelyChannelName',
                width: 120,
                sortable: true,
                title: '末次客户来源',
                formatter:this.formatterVal
            }, {
                field: 'ClueQualityName',
                width: 120,
                sortable: true,
                title: '优质线索类型',
                formatter:this.formatterVal
            }, {
                field: 'RepeatConsultationOwnerName',
                width: 110,
                sortable: true,
                title: '重复咨询人',
                formatter:this.formatterVal
            }, {
                field: 'RepeatConsultationTime',
                width: 125,
                sortable: true,
                title: '重复咨询时间',
                formatter:this.formatterVal
            }, {
                field: 'SchoolName',
                width: 110,
                sortable: true,
                title: '学校',
                formatter:this.formatterVal
            }, {
                field: 'Major',
                width: 110,
                sortable: true,
                title: '专业',
                formatter:this.formatterVal
            }, {
                field: 'ClueLabelStr',
                width: 125,
                sort: true,
                title: '关联标签',
                formatter:this.formatterVal
            }, {
                field: 'EnrollmentYearStr',
                width: 70,
                sortable: true,
                title: '入学年份',
                formatter:this.formatterVal
            }, {
                field: 'QQ',
                width: 85,
                sortable: false,
                title: 'QQ',
                formatter:this.formatterVal
            }, {
                field: 'Email',
                width: 100,
                sortable: false,
                title: '邮箱',
                formatter:this.formatterVal
            }, {
                field: 'Weixin',
                width: 85,
                sortable: false,
                title: '微信',
                formatter:this.formatterVal
            }, {
                field: 'ClueNo',
                width: 120,
                sortable: true,
                title: '线索ID',
                formatter:this.formatterVal
            }, {
                field: 'CustomNo',
                width: 120,
                sortable: true,
                title: '客户编号',
                formatter:this.formatterVal
            }, {
                field: 'field',
                title: '操作',
                width: 170,
                align: 'center',
                formatter: this.formatOper
            }],
            cluesTypeItem, // 模糊搜索下来框选项
            getClientTable: [],
            labelData: [], // 标签
            labelUser: '',
            currIndex: -1,
            showCommunicat: [],
            communicatDisabled: false,
            isSetting: false, // 自定义显示列
            timer: null,
            Create_ByName: [], // 线索创建人
            ownerId: [], // 所属人
            repeatId: [], // 重复咨询人
            ClueisSaleOwner: [], // 所属销售
            Submitter: [], // 线索提交人
            treeStatus: '', // 当前人员树
            saleOwnerFilter: '',
            learningOwner: '',
            submitter: '',
            objParams: {},
            createUserIds: '', // 创建人
            ClueOwner: [], // 所属人
            ClueSchoolManagerOwner: [], // 所属学管
            cluesData: [], // 线索列表数据
            cluesGuid: [], // 获取Guid
            chooseGuid: '', // 高亮显示的行
            trackingGuid: {}, // 跟进页使用Guid
            isSelect: false,
            isCollapse: false,
            isSearch: false,
            loading: false,
            searchValue: '',
            cluesTotal: 0,
            pageSize: 20,
            custonDate: [],
            currentPage: 1,
            SeachType: 1,
            intentionDegreeData: [],
            optimalCluesType: [],
            cluesStatusData: [],
            form: {
                FollowUpState: 1,//成交状态
                selectCityValue: '',
                Create_Time: [],
                NextCommunicateTime: [],
                ClueOwerGetTime: [],
                RepeatConsultationTime: [],
                ClueQuality: '',
                ClueStatus: '',
                IntentionGrade: '',
                School:'',
                SchoolName:'',
                Major:'',
                EnrollmentYear:''
            },
            rules: {
                FollowUpState: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
            },
            cluesButOne: [{
                value: '踢回公池',
                name: 'KickPool',
                bntTrue: 'cluesRemovIcon',
                bntFalse: 'cluesRemovgray',
                funcKey: 'CM_KickPool_WDKH'
            }],
            cluesButTwo: [{
                value: '所属人查询',
                name: 'SubordinateQuery',
                class: 'cluesQueryIcon',
                funcKey: 'CM_SearchClueOwner_WDKH'
            }
            ],
            multipleSelection: [],
            sortName:'NextCommunicateTime',
            sortType: 0,
        }
    },
    methods: {
        closeDialog() { // 沟通记录关闭
            this.dialogVisible = false;
        }, 

        trackingEmit(emit) {
           if (emit) {
               this.getCluleDataList();
           };
        },
        handleSelect(item) {
            this.form.School = item.Id;
        },
         createStateFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearchAsync(queryString, cb) { // 模糊搜索学校
            if (queryString.length > 1) {
                getValueSchools({ name: queryString }).then(ret => {
                    if (ret.status === 0) {
                        let restaurants = ret.result;
                        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                        cb(results);
                    }
                })
            }

        },
        showCommunicatTip(ClueGuid) { // 查看更多沟通记录
            GetCommucinateContentList(ClueGuid).then((ret) => {
                if (ret.status === 0) {
                    this.showCommunicat = ret.result;
                }
            })
        },

        /*Tree*/
        createTree(val) { // 创建人
            this.Create_ByName = val;
        },
        ownerTree(val) { // 所属人
            this.ownerId = val;
        },
        repeatrTree(val) { // 重复咨询人
            this.repeatId = val;
        },
        labelTree(val) {
            this.labelUser = val;
        },
        /*Tree*/
        onIntentionDegree(even) { // 客户意向接口
            if (even) {
                intentionDegree().then(ret => {
                    if (ret.status === 0) {
                        this.intentionDegreeData = ret.result;
                    }
                })
            }
        },
        onOptimalClues(even) { // 优质线索接口
            if (even) {
                OptimalCluesType().then(ret => {
                    if (ret.status === 0) {
                        this.optimalCluesType = ret.result;
                    }
                })
            }
        },
        onCluesStatus() { // 线索状态接口
            GetClueStatusTree().then(ret => {
                if (ret.status === 0) {
                    this.cluesStatusData = ret.result;
                }
            });
        },
        followStatusChange() {
            this.getCluleDataList();//影响高级查询
        },

        onCluesButton(val) { // 线索列表上方按钮事件
            switch (val) {
                // case 'newUsers':
                //     this.$router.push({ path: '/clue/addClientele?nid=521' })
                //     //this.$store.dispatch('updateCurrentTabId', 521)
                //     this.$store.dispatch('updateCurrentTabId', '/clue/addClientele?nid=521')
                //     break;
                case 'cluesMerge':
                    alert('暂不实现');
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
                                    if (self.content.isDistribute) {
                                        this.getCluleDataList();
                                    };
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
                case 'KickPool':
                    if (this.cluesGuid.length > 0) {
                        this.bntLoading = true;
                        KickCluePool({CluesIds: this.cluesGuid,UserIds: ''}).then(ret => {
                            this.bntLoading = false;
                            if (ret.status === 0) {
                                this.cluesGuid = [];
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.getCluleDataList();
                            } else {
                                this.$message({
                                    message: ret.info,
                                    type: 'warning'
                                });
                            }
                        })   
                    }
                    break;
                case 'SubordinateQuery':
                    require.ensure([], (require) => {
                        let SubordinateQuery = require("../cluesManage/CluesModalSubordinateQuery.vue");
                        cluesModal.openComponent(SubordinateQuery, {
                            title: '所属人查询',
                            showCancelButton: false,
                            showConfirmButton: false,
                            width: '950px',
                            self: this,
                            callback: (flag, self) => {
                            }
                        }).then((modal) => {
                        });
                    }, 'subordinateQuery');
                    break;
            }
        },

        callUpPhone(rows) { //拨打电话
            getCallUp(this, rows.Uid, rows.Mobile, 0, rows.CustomGuid, rows.ClueGuid)
            if (this.$store.state.cluesManage.isTracking) {
                let trackingGuid = {
                    CustomGuid: rows.CustomGuid,
                    data: rows,
                    index,
                    Guid: rows.ClueGuid,
                    ID: rows.Id,
                    Uid: rows.Uid
                }
                this.$store.dispatch('getTrackingIds', trackingGuid);
            }
        },
        callUpContacts(rows) { //拨打国际电话
            getCallUp(this, rows.Uid, rows.OverseasMobile, 1, rows.CustomGuid, rows.ClueGuid)
            if (this.$store.state.cluesManage.isTracking) {
                let trackingGuid = {
                    CustomGuid: rows.CustomGuid,
                    data: rows,
                    index,
                    Guid: rows.ClueGuid,
                    ID: rows.Id,
                    Uid: rows.Uid
                }
                this.$store.dispatch('getTrackingIds', trackingGuid);
            }
        },
        callTooltip(index) { // 显示电话明文
            if (index != this.currIndex) {
                this.currIndex = index;
                this.communicatDisabled = false;
            }
        },
        showCallTip(type, rows, self) { // 显示电话号码
            if (((type == 0 && rows.Mobile.indexOf('*') > -1) || (type == 1 && rows.OverseasMobile.indexOf('*') > -1)) && this.unlocking('Show_Customer_Phone_ Clear')) {
                GetContactByUid({ phoneType: type, Uid: rows.Uid, mobile: type == 0 ? rows.Mobile : rows.OverseasMobile }).then((ret) => {
                    if (ret.status === 0) {
                        $(self).children('div').css('display','block')
                        $(self).children('div').html(ret.result || '号码有误');
                    }
                })
            }
        },

        onClueTracking(rows, type) { // 线索跟进
            let trackingGuid = {
                CustomGuid: rows.CustomGuid,
                data: rows,
                Guid: rows.ClueGuid,
                ID: rows.Id,
                Uid: rows.Uid,
                type
            }
            this.$store.dispatch('isTracking', true);
            this.$store.dispatch('getTrackingIds', trackingGuid);
        },

        onAdvancedSearch() { // 高级搜索折叠
            this.isSearch = !this.isSearch;
        },
        onReset(formName) { // 重置
            this.$refs[formName].resetFields();
            this.$refs.resetCreate.$emit('resetTree');
            this.$refs.resetOwner.$emit('resetTree');
            this.$refs.resetRepeatr.$emit('resetTree');
            this.$refs.labelUser.$emit('resetTree');
            this.labelUser = []; //标签列表
            this.form.selectCityValue = '';
            this.form.SchoolName = '';
            this.form.School = '';
            this.getCluleDataList();
        },
        onSubmit() { // 线索高级搜索
            this.currentPage = 1;
            this.getCluleDataList();
        },

        async quickQuery() { // 模糊搜索
            this.currentPage = 1;
            let params = {
                Where: {
                    SearchKey: this.searchValue,
                    SeachType: this.SeachType,                    
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy:this.sortName,
                SortCol:this.sortType
            }
            this.GetFuzzySearchList(params);
        },
        async GetFuzzySearchList(params = {
            Where: this.searchValue,
            PageIndex: this.currentPage,
            PageSize: this.pageSize
        }) {
            let ret = await GetVagueMyCustomClueList(params)
            if (ret.status === 0) {
                this.cluesData = ret.result.Body;
                this.cluesTotal = ret.result.Count;
                this.loadDatagrid(this.cluesData, true)
            }
        },
        getCluleDataList(isFirst) {
                this.loading = true;
                const {
                    selectCityValue,
                    Create_Time,
                    NextCommunicateTime,
                    ClueOwerGetTime,
                    RepeatConsultationTime,
                    ClueQuality,
                    ClueStatus,
                    IntentionGrade,
                    FollowUpState,
                    School,
                    Major,
                    EnrollmentYear,
                    } = this.form;
                let params = {
                    Where: {
                        LabelIds: this.labelUser,
                        CreateStartTime: format(Create_Time[0]),
                        CreateEndTime: format(Create_Time[1]),
                        Create_By: this.Create_ByName,
                        NextCommunicateStartTime: format(NextCommunicateTime[0]),
                        NextCommunicateEndTime: format(NextCommunicateTime[1]),
                        ClueOwerStartGetTime: format(ClueOwerGetTime[0]),
                        ClueOwerEndGetTime: format(ClueOwerGetTime[1]),
                        ClueOwner: this.ownerId,
                        ClueStatus,
                        IntentionGrade,
                        ClueQuality,
                        RepeatConsultationOwner: this.repeatId,
                        RepeatConsultationStartTime: format(RepeatConsultationTime[0]),
                        RepeatConsultationEndTime: format(RepeatConsultationTime[1]),
                        FollowUpState,
                        School,
                        Major,
                        EnrollmentYear:format(EnrollmentYear)
                    },
                    PageIndex: this.currentPage,
                    PageSize: this.pageSize,
                    OrderBy:this.sortName,
                    SortCol:this.sortType
                }
                GetMyCustomClueList(params).then(ret => {
                    if (ret.status === 0) {
                        this.cluesGuid = [];
                        this.loading = false;
                        this.cluesTotal = ret.result.Count;
                        this.cluesData = ret.result.Body;
                        this.loadDatagrid(this.cluesData,isFirst)
                    } else {
                        this.loading = false;
                    }
                }).catch(() => {
                    this.loading = false;
                })
            
        },
        loadDatagrid(data,isFirst) {
            let self = this;
            if(isFirst){
                $('#clientDg').datagrid({
                    frozenColumns: [[
                        {field:'ck',width:100,checkbox: true},
                        {field:'CustomName',title:'联系人姓名',width:130},
                        {field:'Tracking',align:'center',title:'跟进',width:40,frozen:true,formatter:this.Tracking},
                    ]],
                    columns:[self.getClientTable],
                    data:data,
                    nowrap: false,
                    remoteSort: true,
                    checkOnSelect: true
                });
            }else{
                $('#clientDg').datagrid('loadData',data)
            }
        },
        Tracking(value,row,index) {
            return `<div style="display: -webkit-inline-box;"><textarea style="display:none;">${JSON.stringify(row)}</textarea></textarea><a href="javascript:void(0)" class="client_tracking" style="color:#20a0ff">跟进</a></div>`;
        },
        formatOper(value,row,index){
            return `<div style="display: -webkit-inline-box;"><textarea style="display:none;">${JSON.stringify(row)}</textarea></textarea><a href="javascript:void(0)" class="client_modify" style="margin-right: 10px;color:#20a0ff">修改</a><a style="margin-right: 10px;color:#20a0ff" target="_blank" href="/#/clue/create?nid=520&nw=1&Guid=${row.ClueGuid}&CustomGuid=${row.CustomGuid}">报名</a><a target="_blank" href="/#/clue/details?NavigationId=520&nw=1&Guid=${row.ClueGuid}&CustomGuid=${row.CustomGuid}" style="color:#20a0ff;margin-right: 10px">详情</a>
            <a href="javascript:void(0)" class="hove_menu" style="color:#0094ff;position: relative">更多
            <i class="el-icon-caret-bottom el-icon--right"></i>
            <div class="easy_menu">
                <span class="menu_shadow"></span>
                <div class="hover client_audition">预约试听</div> 
                <div class="hover client_shared">共享查询</div> 
            </div></a></div>`;
        },
        formatterVal(value, row, index) {
            return `<div class="beyond-hidden-2"><span title="${value || ''}">${ value || '' }</span></div>`
        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.getCluleDataList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.getCluleDataList();
        },
        onCluesType(type) { // 模糊搜索选择类
            this.SeachType = type + 1;
            if (this.searchValue) {
                this.quickQuery();
            }
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            clearTimeout(this.timer);
            this.isSelect = true;
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            this.timer = setTimeout(function() {
                self.isSelect = false;
            }, 500);
        },
        MakeLister(row) { // 预约试听
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
        sharedQuery(Guid, CustomGuid) { // 共享查询
            require.ensure([], (require) => {
                let CluesShared = require("../cluesManage/CluesModalShared.vue");
                cluesModal.openComponent(CluesShared, {
                    title: '共享查询',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '750px',
                    self: this,
                    Guid,
                    CustomGuid
                })
            }, 'shared');
        },
        onSettingTable() { // 弹出框 => 自定义显示列
            this.isSetting = true;
            require.ensure([], (require) => {
                let CluesSetting = require("./ClientModalSettingTable.vue");
                cluesModal.openComponent(CluesSetting, {
                    title: '设置显示字段',
                    showCancelButton: false,
                    showConfirmButton: false,
                    table: this.myClientTable,
                    width: '800px',
                    height: '480px',
                    self: this,
                    callback: (flag, self) => {
                        this.isSetting = false;
                    }
                })
            }, 'cluesSetting');
            return;
        },

        getPageFieldConfig () {
            GetBase_PageFieldConfig({PageName: '我的客户'}).then(ret => { // 获取列表列
                let str = ret.result;
                let data = str && (str !== '' || str !== '[]') ? JSON.parse(str) : [];
                if (ret.status === 0 && data.length) {
                    let data = JSON.parse(str) || [];
                    if (data.indexOf('手机') < 0 ) {
                        data.unshift('手机');
                    }
                    if (data.indexOf('操作') < 0 ) {
                        data.push('操作');
                    }
                    this.$store.dispatch('clientTableSetting', data);
                    let getTable = [];
                    for (let j = 0; j < this.myClientTable.length; j++) {
                        for (let i = 0; i < data.length; i++) {
                            if (this.myClientTable[j].title == data[i]) {
                                getTable.push(this.myClientTable[j]);  
                            }
                        }
                    }
                    this.getClientTable = getTable;
                    this.getCluleDataList(true); 
                } else {
                    this.getClientTable = this.myClientTable;
                    this.getCluleDataList(true); 
                }
            });
        },

        getWindowHeight() {
            if (window.innerHeight)
                this.winHeight = window.innerHeight - 225;
            else if ((document.body) && (document.body.clientHeight))
                this.winHeight = document.body.clientHeight - 225;
            if (document.documentElement && document.documentElement.clientHeight) {
                this.winHeight = document.documentElement.clientHeight - 225;
            }
        },

        clientCheck() { // 复选框
            let selRows = $('#clientDg').datagrid('getChecked')
            this.cluesGuid = [];
            selRows.map((item, index) => {
                this.cluesGuid.push(item.ClueGuid);
            })
            this.$store.dispatch('getDistributionGuid', this.cluesGuid);
            this.multipleSelection = selRows;
        }
    },
    computed: {
        ...mapState({
            cluesTableSetting: state => { // 显示已选的Table
                return state.cluesManage.cluesTableSetting
            }
        })
    },
  mounted() {
        let self  = this;
        let timer = null;
        $('#cluesDg').datagrid('loading')
       $('body').delegate('.client-phone-number','click',function(){ // 手机显示明文
            let data = JSON.parse($(this).siblings('textarea').val())
            self.showCallTip(0, data, this);
            // debugger;
            // let crmTooltip = new CrmTooltip();
            // crmTooltip.create({
            //     target: this
            // });
       })
        $('body').delegate('.client-call-number','click',function(){ // 国际显示明文
            let data = JSON.parse($(this).siblings('textarea').val())
            self.showCallTip(1, data, this);
       })

       $('body').delegate('.client-phone-number','mouseout',function(){ // 移入移出
            timer = setInterval(function() {
                $(this).children('.phone-number-tips').css('display', 'none')
            },500)
       })
       $('body').delegate('.phone-number-tips','mousemove',function(){ 
            clearInterval(timer);
            $(this).css('display', 'block')
       })
        $('body').delegate('.phone-number-tips','click',function(event){ 
            event.stopPropagation();
       })
       $('body').delegate('.phone-number-tips','mouseout',function(){ 
            $(this).css('display', 'none')
       })

       $('body').delegate('.communicat_content','click',function(){ // 查看沟通记录
            self.dialogVisible = true;
            let data = JSON.parse($(this).siblings('textarea').val())
            self.showCommunicatTip(data);

       })

       $('body').delegate('.client_tracking','click',function(event){ // 跟进
            event.stopPropagation(); 
            let data = JSON.parse($(this).siblings('textarea').val())
            self.onClueTracking(data);
       })
       $('body').delegate('.client_modify','click',function(event){ // 修改
            event.stopPropagation();
            let data = JSON.parse($(this).siblings('textarea').val())
            self.onClueTracking(data, 'modify');
       })
       $('body').delegate('.client-callphone','click',function(event){ // 拨打手机
            event.stopPropagation();
           let data = JSON.parse($(this).siblings('textarea').val())
           self.callUpPhone(data);
       })
       $('body').delegate('.client-callTell','click',function(event){ // 拨打国际电话
            event.stopPropagation();
           let data = JSON.parse($(this).siblings('textarea').val())
           self.callUpContacts(data);
       })

        $('body').delegate('.client_audition','click',function(event){ // 预约试听
            event.stopPropagation();
            let audition = JSON.parse($(this).parent().parent().siblings('textarea').val());
            self.MakeLister(audition);
       })
        $('body').delegate('.client_shared','click',function(event){ // 共享查询
            event.stopPropagation();
            let shared = JSON.parse($(this).parent().parent().siblings('textarea').val());
            self.sharedQuery(shared.ClueGuid, shared.CustomGuid);
       })

        // 复选框
       $('#clientDg').datagrid({
            onCheck:function() { 
               self.clientCheck();
            },
            onUncheck:function() {
                self.clientCheck();
            },
            onCheckAll:function() {
                self.clientCheck();
            },
            onUncheckAll:function() {
                self.clientCheck();
            },

            // 排序
            onSortColumn:function(sort, order) {
                self.sortName = sort;
                if(order == 'asc'){
                    self.sortType = 0;
                } else {
                    self.sortType = 1;
                }
                self.getCluleDataList();
            }

       })

       $('#dd').tooltip({
            position: 'bottom',
            content: '<span style="color:#fff">This is the tooltip message.</span>',
            onShow: function(){
                $(self).tooltip('tip').css({
                    backgroundColor: '#666',
                    borderColor: '#666'
                });
            },
            showEvent: 'click',
            hideDelay: 1000
        });
        $('#clientDg').height(300)
    },
    async created() {
        this.getWindowHeight();
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
        this.onCluesStatus(); // 线索状态
        this.getCluleDataList(true);
        this.getPageFieldConfig();
        GetLabelList().then(ret => { // 标签接口
            if (ret.status === 0) {
                this.labelData = ret.result;
            }
        }); 
         GetAllowedUserTree({ userId: this.userInfo.UserId }).then(ret => { // 人员树接口
            if (ret.status === 0) {
                this.createData = ret.result;
            }
        });
    }
}
</script>