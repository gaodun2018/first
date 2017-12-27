<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label Importlist" style="margin-bottom: 15px">
                <el-row style="height: 30px;">
                    <el-col :sm="16">
                        <el-cascader size="small" clearable placeholder="请选择营销计划(营销活动)" v-model="ChannelList" :options="getchannels" :show-all-levels="false" :props="channelsProps" @change="channelsChange" style="width: 200px;font-size: 12px"></el-cascader>
                        <el-date-picker v-model="form.BatchCreateTime" @change="channelsChange" type="daterange" size="small" placeholder="选择时间范围" style="width: 185px;font-size: 12px;margin: 0 5px;position: relative;top: -1px">
                        </el-date-picker>
                        <Tree :width="'185px'" placeholder="请选择创建人" style="" ref="resetClueSource" :callback="clueSourceTree" :allSelected="selectChange"></Tree>
                    </el-col>
                    <el-col :sm="8">
                        <div class="FR">
                            <el-input v-model="form.SearchKey" placeholder="根据营销计划、手机查询" size="small" style='width: 250px'>
                                <el-button slot="append" icon="search" @click="onQuickQuerys"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row  v-if="unlocking('Marketing_Clue_Import')" style="margin-top:10px">
                    <el-button class="cluesButton-icon" style="width: 95px" @click="onImportButton">
                        <span style="position: relative;bottom:3px">
                            <i class="cluesImportIcon"></i>
                            <span>线索导入</span>
                        </span>
                    </el-button>
                </el-row>
            </div>
            <div Id="Importlist">
                <el-table ref="multipleTable" border v-loading="loading" :data="CluebatchList" style="width: 100%">
                    <el-table-column prop="Name" label="姓名" min-width="120px">
                    </el-table-column>
                    <el-table-column label="手机" min-width="150px">
                        <template scope="scope">
                            <div @mouseover="callTooltip(scope.$index)">
                                <el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
                                    <span @click.stop="showCallTip(scope.$index, CluebatchList)">{{scope.row.Mobile}}</span>
                                </el-tooltip>
                                <a style="margin-left: -4px" v-if="scope.row.Mobile" href="javascript:void(0)" @click="callUp_Mobile(scope.$index, CluebatchList)">
                                    <i class="tracking-phone-icon"></i>
                                </a>
                                <span v-else>--</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Course" label="感兴趣项目" min-width="130">
                    </el-table-column>
                    <el-table-column prop="Channel" label="客户来源" min-width="140">
                    </el-table-column>
                    <el-table-column prop="SourceDetails" label="营销计划" min-width="140">
                    </el-table-column>
                    <el-table-column prop="CreateName" label="操作人" min-width="110">
                    </el-table-column>
                    <el-table-column prop="CreateTime" label="操作时间" min-width="115">
                    </el-table-column>
                    <el-table-column prop="ClueTypeName" label="导入结果" min-width="115">
                    </el-table-column>
                    <el-table-column prop="ClueStatus" label="线索状态" min-width="115">
                    </el-table-column>
                    <el-table-column prop="ClueOwnerName" label="所属人" min-width="115">
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

</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format , getCallUp } from '../../util/util';
import { CluebatchSearch, getchannels } from '../../api/ClueBatchSearch';
import { GetContactByUid } from '../../api/callCenter';
import CluesTracking from '../cluesManage/CluesTracking.vue';
import cluesModal from 'vueModal';
import Tree from '../../containers/Tree.vue';

export default {
    name: 'crm-cluebatch-manage',
    components: { Tree, CluesTracking },
    data() {
        return {
            currIndex: -1,
            phoneDisabled: false,
            showPhone: '号码读取中',
            isSearch: false,
            loading: false,
            cluesTotal: 0,
            pageSize: 10,
            clueSoureId: [],
            custonDate: [],
            currentPage: 1,
            isCluesCreate: false,
            channelsProps: {
                value: 'id',
                label: 'DetailName',
                children: 'ChildList'
            },
            form: {
                ChannelType: '',
                BatchCreateTime: '',
                SearchKey: ''
            },
            multipleSelection: [],
            CluebatchList: [],
            getUserTree: [],
            createUserIds: [], // 创建人         
            ChannelList: [],//渠道
            getchannels: [], // 来源详情
        }
    },
    methods: {
        trackingEmit(emit) {
           if (emit) {
               this.getCluebatchList();
           };
        },
        selectChange() {
            this.getCluebatchList();
        },
        clueSourceTree(val) { // 人员树
            this.createUserIds = val;
        },
        channelsChange() {
            this.getCluebatchList();
        },
        onQuickQuerys() { // 模糊搜索
            this.SearchType = 2;
            this.handleCurrentChange(1);
        },
        onBatchSearchType() { // 按类查询
            this.SearchType = 1;
            this.handleCurrentChange(1);
        },
        // 线索导入查询列表接口
        getCluebatchList(
        ) {
            this.loading = true;
            const { ChannelType, BatchCreateTime, SearchKey } = this.form;
            let params = {
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                Where: {
                    ChannelType: this.ChannelList[this.ChannelList.length - 1],
                    CreateBegin: format(BatchCreateTime[0]),
                    CreateEnd: format(BatchCreateTime[1]),
                    Creator: this.createUserIds,
                    SearchKey
                }
            }
            CluebatchSearch(params).then(ret => {
                if (ret.status === 0) {
                    this.CluebatchList = ret.result.Body;
                    this.cluesTotal = ret.result.Count;
                    this.loading = false;
                }
            });
        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            // if(flag){return;}
            this.getCluebatchList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.getCluebatchList();
        },
        onImportButton() { // 线索列表上方按钮事件
            require.ensure([], (require) => {
                let CluesImport = require("./CluesModalImport.vue");
                cluesModal.openComponent(CluesImport, {
                    title: '线索导入',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '500px',
                    self: this,
                    modal: cluesModal,
                    disablePopEvent: true,
                    callback: (flag, self) => {
                    }
                }).then((modal) => {
                });
            }, 'cluesImport');
        },
        onDialog() { // 弹出框 => 自定义显示列
            cluesModal.openComponent(CustomModal, {
                title: '自定义显示列',
                showCancelButton: true,
                width: '600px',
                self: this,
                callback: (flag, self) => {
                    this.$store.dispatch('selectedTable', self.content.custonDate);
                }
            }).then((modal) => {
            });
        },

        callTooltip(index) { // 显示电话明文
             if (index != this.currIndex) {
                this.currIndex = index;
                this.phoneDisabled = false;
            }
        },
        showCallTip(index, rows) { // 显示电话号码
            if ((rows[index].Mobile.indexOf('*') > -1) && this.unlocking('Show_Customer_Phone_ Clear')) {
                GetContactByUid({ phoneType: 0, Uid: rows[index].Uid, mobile: rows[index].Mobile }).then((ret) => {
                    if (ret.status === 0) {
                        this.phoneDisabled = true;
                        this.showPhone = ret.result || '号码有误';
                    }
                })
            }
        },    
        callUp_Mobile(index, rows) { //拨打电话
            getCallUp(this, rows[index].Uid, rows[index].Mobile, 0, rows[index].CustomGuid, rows[index].ClueGuid)
        },
    },
    mounted() {
        this.getCluebatchList(); // 线索导入查询列表接口
        getchannels().then(ret => { // 来源详情
            if (ret.status === 0) {
                this.getchannels = ret.result;
            }
        })
    }
}
</script>