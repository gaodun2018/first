<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label Importlist">
                <div>
                    <el-row>
                        <el-col :span="16">
                            <el-row>
                                <div>
                                    <div style="float: left; margin-right: 10px" class="marketing-activity-tree">
                                        <Tree :width="'215px'" ref="resetMarketing" placeholder="请选择营销计划" :allSelected="selectChange" :callback="marketingTree" treeType="marketing"></Tree>
                                    </div>
                                    <div style="float: left; margin-right: 10px" class="select-small-height">
                                        <el-select v-model="form.CourseType" filterable clearable multiple placeholder="请选择项目" @visible-change="onCourseType" :multiple-limit="3" @change="channelsChange" size="small" style="width: 215px;font-size: 12px">
                                            <el-option v-for="professional  in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </el-row>
                        </el-col>
                        <el-col :span="8" style="text-align: left">
                            <el-row>
                                <el-col :span="24" class="clues-search">
                                    <div  style="float: right">
                                        <el-input class="clues-manage-search-input" placeholder="根据营销计划、手机查询" v-model="form.SearchKey" size="small" @focus="onFocusType" @blur="onBlurType">
                                            <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                                        </el-input>
                                        <div class="clues-search-select" style="width: 250px" v-show="isSelect">
                                            <ul id="searchType">
                                                <li @click="onASearchType(0)" style="color: #42aedf">
                                                    <span style="display: inline-block; width: 60px">营销计划</span>
                                                    <span class="search-type-text"> {{form.SearchKey}}</span>
                                                </li>
                                                <li @click="onASearchType(1)">
                                                    <span style="display: inline-block; width: 60px">手机 </span>
                                                    <span class="search-type-text">{{form.SearchKey}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-button v-if="unlocking('Marketing_Distribute')" style="margin-top: 15px" class="cluesButton-icon" :disabled="cluesGuid.length ? false : true" @click="OpenCluesDistribution">
                            <span style="position: relative;bottom:3px">
                                <i :class="cluesGuid.length ? 'cluesDistributionIcon' : 'cluesDistributionGray'"></i>
                                <span>线索分配</span>
                            </span>
                        </el-button>
                    </el-row>
                </div>
            </div>
            <div class="clues-table">
                <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName" tooltip-effect="dark" :data="MarketingActivityList" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" fixed>
                    </el-table-column>
                    <el-table-column prop="CustomName" style="color: #666;" width="130" label="姓名" fixed>
                    </el-table-column>
                    <el-table-column label="手机" width="140px">
                        <template scope="scope">
                            <div @mouseover="callTooltip(scope.$index)">
                                <el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
                                    <span @click.stop="showCallTip(0, scope.$index, MarketingActivityList)">{{scope.row.Mobile}}</span>
                                </el-tooltip>
                                <a style="margin-left: -4px" v-if="scope.row.Mobile" href="javascript:void(0)" @click="callUp_Mobile(scope.$index, MarketingActivityList)">
                                    <i class="tracking-phone-icon"></i>
                                </a>
                                <span v-else>--</span>
                            </div>
                        </template>
                    </el-table-column>
                      <el-table-column label="国际电话" width="140px">
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
                    <el-table-column prop="CourseTypeName" width="130" label="感兴趣项目" >
                    </el-table-column>
                    <el-table-column align="left" prop="CustomerSource" width="130" label="客户来源">
                        <template scope="scope">
                            <div class="beyond-hidden-2" style="height: 48px;" :title="scope.row.CustomerSource">{{scope.row.CustomerSource}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" prop="SourceDetail" width="140" label="营销计划">
                        <template scope="scope">
                            <div class="beyond-hidden-2" style="height: 48px" :title="scope.row.SourceDetail">{{scope.row.SourceDetail}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="末次沟通记录" width="150" prop="CommunicatContent">
                        <template scope="scope">
                            <div class="beyond-hidden-2" style="height: 48px" :title="scope.row.CommunicatContent">{{scope.row.CommunicatContent}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Create_Time" label="创建时间" width="115">
                    </el-table-column>
                    <el-table-column prop="CreateByName" label="创建人" width="120">
                    </el-table-column>
                    <el-table-column prop="ClueOwnerName" label="线索所属人" width="120">
                    </el-table-column>
                    <el-table-column prop="ClueStatus" label="线索状态" width="120">
                    </el-table-column>
                    <el-table-column prop="ClueSourceName" label="线索来源人" width="120">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center" width="127" v-if="unlocking(['Marketing_Activity_Details', 'Marketing_Activity_Shared'])">
                        <template scope="scope">
                            <el-button v-if="unlocking('Marketing_Activity_Details')" type="text" size="small">
                                <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/details?nid=520&nw=1&Guid=${scope.row.ClueGuid}&CustomGuid=${scope.row.CustomGuid}`]">详情</a>
                            </el-button>
                            <el-button v-if="unlocking('Marketing_Activity_Shared')" type="text" size="small">
                                <a style="color: #20a0ff" target="_blank" @click="OpencluesShared(scope.$index, MarketingActivityList)">共享查询 </a>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="clues-pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                    </el-pagination>
                </div>
            </div>
        </el-form>
        <clues-tracking @trackingEmit="trackingEmit" v-show="$store.state.cluesManage.isTracking"></clues-tracking>
        <div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
    </div>
</template>
<style stype="text/css"  >
 .Importlist .el-form-item__content {
     line-height: 30px;
     height: 30px;
 }

 .test {
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 2;
 }

 .batch-search-tree .search-text {
     width: 162px;
     font-size: 12px;
     border: 1px solid #ccc;
     height: 30px;
     line-height: 30px;
     border-radius: 3px;
     outline: none;
     padding: 0 3px;
 }

 .batch-search-tree .search-tree {
     width: 175px;
     font-size: 12px;
     position: absolute;
     left: 0px;
     top: 30px;
     height: 350px;
     z-index: 5;
     display: -webkit-inline-box;
     overflow: auto;
 }

 .roder-content-label .el-form-item {
     margin-bottom: 0;
 }

 .order-search-form .el-form-item {
     margin-bottom: 0;
 }

 .cell-reset-padding {
     margin-right: -12px
 }

 .clues-bnt-item .tracking-text-font .el-form-item__label {
     padding: 11px 0 11px 0;
 }
.marketing-activity-tree .tree-wrapper .el-input__inner {
    height: 34px;
}
/* .select-small-height .el-input__inner {
    height: 30px!important;
    line-height: 30px;
} */
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
import { format, getCallUp  } from '../../util/util';
import { GetMarketingActivitySearch, interestedProject, getSourceDetailsTree } from '../../api/MarketingActivity';
import { GetContactByUid } from '../../api/callCenter';
import CluesTracking from '../cluesManage/CluesTracking.vue';
import cluesModal from 'vueModal';
import Tree from '../../containers/Tree.vue';
export default {
    name: 'crm-cluebatch-manage',
    components: { Tree, CluesTracking },
    data() {
        return {
            sharedGuid: '',
            sharedCustomGuid: '',
            currIndex: -1,
            phoneDisabled: false,
            showPhone: '号码读取中',
            contactDisabled: false,
            showContacts: '号码读取中',
            isSearch: false,
            loading: false,
            cluesTotal: 0,
            isSelect: false,
            pageSize: 10,
            custonDate: [],
            currentPage: 1,
            isCluesCreate: false,
            defaultKeys: '',
            cluesGuid: [],
            defaultProps: {
                label: 'Name',
                children: 'ChildrenList'
            },
            SourceDetailsProps: {
                value: 'id',
                label: 'DetailName',
                children: 'ChildList'
            },
            ProjectProps: {
                value: 'id',
                label: 'Name',
                children: 'ChildProject'
            },
            form: {
                SourceDetailId: '',
                CourseType: '',
                SearchKey: '',
                SearchType: ''  //检索类型        
            },
            cluesButOne: [{
                value: '线索分配',
                name: 'cluesDistribution',
                bntTrue: 'cluesDistributionIcon',
                bntFalse: 'cluesDistributionGray'
            }],
            multipleSelection: [],
            MarketingActivityList: [],
            SourceDetailsList: [], // 来源详情
            SourceDetailsTree: [],//来源详情
            interestedProjectList: [],//感兴趣项目
            interestedProject: [],//感兴趣项目
        }
    },
    methods: {
        trackingEmit(emit) {
           if (emit) {
               this.GetMarketingActivityList();
           };
        },
        selectChange() {
            this.GetMarketingActivityList();
        },

        onReset(formName) { // 重置
            this.$refs.resetMarketing.$emit('resetTree');
        },
        marketingTree(val) { // 营销计划
            this.SourceDetailsList = val;
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
        channelsChange() {
            this.GetMarketingActivityList();
        },
        onASearchType(type) { // 模糊搜索选择类
            this.form.SearchType = type + 1;
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
        onQuickQuerys() { // 模糊搜索

            this.handleCurrentChange(1);
        },
        onBatchSearchType() { // 按类查询

            this.handleCurrentChange(1);
        },
        // 营销活动线索查询列表接口
        GetMarketingActivityList(
        ) {
            this.loading = true;
            const { SourceDetailId, CourseType, SearchKey, SearchType } = this.form;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    SourceDetailId: this.SourceDetailsList,
                    CourseType,
                    SearchKey,
                    SearchType
                }
            }
            GetMarketingActivitySearch(params).then(ret => {
                if (ret.status === 0) {
                    this.MarketingActivityList = ret.result.Body;
                    this.cluesTotal = ret.result.Count;
                    this.loading = false;
                }
            });
        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            // if(flag){return;}
            this.GetMarketingActivityList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.GetMarketingActivityList();
        },
        //选中事件
        handleSelectionChange(ClueGuid) {
            this.cluesGuid = [];
            ClueGuid.map((item, index) => {
                this.cluesGuid.push(item.ClueGuid);
            })
            this.$store.dispatch('getDistributionGuid', this.cluesGuid);
            this.multipleSelection = ClueGuid;
        },

        OpenCluesDistribution() { // 线索列表上方按钮事件
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
                Message({
                    message: '要先选择线索才进行下一步操作哦',
                    type: 'warning'
                });
            }
        },

        OpencluesShared(index, rows) { // 共享查询
            let getGuid = {
                Guid: rows[index].ClueGuid,
                CustomGuid: rows[index].CustomGuid
            }
            this.$store.dispatch('cluesSharedGuid', getGuid);
            this.sharedGuid = rows[index].ClueGuid;
            this.sharedCustomGuid = rows[index].CustomGuid;
            require.ensure([], (require) => {
                let Shared = require("../cluesManage/CluesModalShared.vue");
                cluesModal.openComponent(Shared, {
                    title: '共享查询',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '750px',
                    self: this,
                    Guid: sharedGuid,
                    CustomGuid: sharedCustomGuid,
                    modal: cluesModal,
                    callback: (flag, self) => {
                    }
                }).then((modal) => {
                });
            }, 'Shared');
        },
        onCourseType(even) { // 感兴趣的项目接口
            if (even) {
                interestedProject().then(ret => {
                    if (ret.status === 0) {
                        this.interestedProject = ret.result;
                    }
                })
            }
        },
         callTooltip(index) { // 显示电话明文
            if (index != this.currIndex) {
                this.currIndex = index;
                this.phoneDisabled = false;
                this.contactDisabled = false;
            }
        },
        showCallTip(type, index, rows) { // 显示电话号码
            if (((rows[index].Mobile.indexOf('*') > -1) || (rows[index].OverseasMobile.indexOf('*') > -1)) &&  this.unlocking('Show_Customer_Phone_ Clear')) {
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
        },
        callUp_OverseasMobile(index, rows) { //拨打海外电话
            getCallUp(this, rows[index].Uid, rows[index].OverseasMobile, 1, rows[index].CustomGuid, rows[index].ClueGuid)
        },
    },
    mounted() {
        this.GetMarketingActivityList(); // 营销活动线索查询列表接口
        getSourceDetailsTree().then(ret => { // 来源渠道
            if (ret.status === 0) {
                this.SourceDetailsTree = ret.result;
            }
        })
    }
}
</script>