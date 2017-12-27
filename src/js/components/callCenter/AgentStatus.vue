<template>
    <div class="module-clues-content" style="min-height:400px">
        <el-form ref="ruleForm" :model="ruleForm">
            <el-row :gutter="5">
                <el-col :span="24">
                    <div class="clues-bnt-item" style="padding-bottom:10px;">
                        <div class="order-type-search" style="margin-right: 10px">
                            <!-- <el-select v-model="ruleForm.timeType" style="width:120px" size="small" placeholder="今日">
                                <el-option label="今日" value="1"></el-option>
                                <el-option label="本周" value="2"></el-option>
                                <el-option label="本月" value="3"></el-option>
                            </el-select> -->
                            <el-date-picker v-model="ruleForm.callDate" clearable size="small" format="" type="daterange" style="width: 180px;" placeholder="选择时间范围">
                            </el-date-picker>
                        </div>
                        <div class="order-type-search tree-input-disabled" style="margin-right: 10px">
                            <Tree :width="'193px'" ref="callrecordTree" :allSelected="userAllSelected" :callback="recordTree"></Tree>
                        </div>
                        <div class="order-type-search" style="margin-right: 10px">
                            <el-select v-model="ruleForm.extStatus" clearable style="width:120px" size="small" placeholder="选择状态">
                                <el-option label="未签入" value="1"></el-option>
                                <el-option label="空闲" value="2"></el-option>
                                <el-option label="忙碌" value="3"></el-option>
                                <el-option label="通话中" value="4"></el-option>
                            </el-select>
                        </div>
                        <div class="order-type-search" style="margin-right: 10px">
                            <el-input v-model="ruleForm.searchNo" placeholder="输入分机号" size="small" style="width:180px"></el-input>
                        </div>
                        <div class="order-type-search">
                            <el-button style="width: 70px;position: relative;top:-1px" type="primary" size="small" @click="btnSearch">查询</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>

            <div>
                <el-table ref="multipleTable" border v-loading="loading" :data="extStatusData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="座席" prop="UserName">
                    </el-table-column>
                    <el-table-column label="工号" prop="UserNo">
                    </el-table-column>
                    <el-table-column label="分机号" prop="ExtNo">
                    </el-table-column>
                    <el-table-column label="当前状态" align="center">
                        <template scope="scope">
                            <div style="text-align:left;margin-left:30%;">
                                <span :class="{'ext-item-status-unsign':scope.row.StatusId==1,'ext-item-status-idle':scope.row.StatusId==2,'ext-item-status-busy':scope.row.StatusId==3,'ext-item-status-talking':scope.row.StatusId==4}">
                                    <span style="margin-left:18px;">{{scope.row.Status}}</span>
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="通话时长" prop="CallDuration">
                    </el-table-column>
                    <el-table-column label="通话次数" prop="CallCount">
                    </el-table-column>
                    <el-table-column label="置忙时长" prop="BusyDuration">
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
    </div>
</template>
<style>
.call-lable-span {
    color: #656565;
}

.el-table td {
    height: 40px;
}

.search-item {
    float: left;
}

.search-text {
    height: 28px;
}

.search-tree {
    left: 5px;
    top: 28px;
}

.isShow {
    display: black;
    z-index: 50;
}

.isHid {
    display: none;
    position: absolute;
    left: 94px;
    top: 21px;
    z-index: 5;
}

.module-clues-content .el-input__icon+.el-input__inner {
    padding-right: 15px;
}

.ext-item-status-unsign {
    background: url(../../../images/unsign.png) left center no-repeat;
}

.ext-item-status-idle {
    background: url(../../../images/idle.png) left center no-repeat;
}

.ext-item-status-busy {
    background: url(../../../images/busy.png) left center no-repeat;
}

.ext-item-status-talking {
    background: url(../../../images/nav-message.png) left center no-repeat;
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
import { format, checkedUserTree } from '../../util/util';
import { CRM_MENU, CRM_USER_INFO, CRM_TOKEN, CRM_CURRENT_TAB, CRM_OPEN_TABS, CRM_CURRENT_LEVEL_ONE_MENU } from '../../util/keys';
import { getExtStatus } from '../../api/callCenter';
import { GetAllowedUserTree } from '../../api/cluesManage';
import cluesModal from 'vueModal';
import Tree from '../../containers/Tree.vue';
export default {
    name: 'module-ext-agent',
    props: ['self', 'item'],
    components: { Tree },
    data() {
        return {
            treeStatus: '',
            isSelect: false,
            isSearch: false,
            isCollapse: true,
            loading: false,
            isShowUser: false,
            filterText: '',
            defaultKeys: '1',
            defaultProps: {
                children: 'ChildrenList',
                label: 'Name'
            },
            getUserTree: [],
            creatortFilter: '',
            creatorName: '',
            defaultKeys: '',
            UserIds: [],
            defaultProps: { // 人员树
                label: 'Name',
                children: 'ChildrenList'
            },
            loading: false,
            extStatusData: [],
            ruleForm: {
                timeType: "0",
                users: [],
                extStatus: "",
                searchNo: "",
                callDate:[]
            }
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
    },
    watch: {
        creatortFilter(val) { // 创建人
            this.$refs.creatortTree.filter(val);
        }
    },
    methods: {
        userAllSelected() {
            //this.btnSearch();
        },
        recordTree(val) {
            this.UserIds = val;
        },
        btnSearch() {
            var cBegin=format(new Date());
            var cEnd=cBegin;
            if(this.ruleForm.callDate&&this.ruleForm.callDate.length==2){
                cBegin=format(this.ruleForm.callDate[0]);
                cEnd=format(this.ruleForm.callDate[1]);
            }
            var queryParm = {
                UserIds: this.UserIds,
                ExtNo: this.ruleForm.searchNo,
                Status: this.ruleForm.extStatus,
                timeType: this.ruleForm.timeType,
                begin:cBegin,
                end:cEnd
            };
            this.queryExtStatus(queryParm);
        },
        queryExtStatus(objParms = { UserIds: [this.userInfo.UserId], ExtNo: "", Status: "0", timeType: 1 }) {
            this.loading = true;
            getExtStatus(objParms).then(ret => {
                if (ret.status == 0) {
                    this.extStatusData = ret.result;
                    this.loading = false;
                }
                else {
                    this.loading = false;
                }
            }).catch(() => { this.loading = false; });
        },
    },
    watch: {

    },
    mounted: function() {
        this.queryExtStatus();
        GetAllowedUserTree().then(ret => {
            if (ret.status === 0) {
                this.getUserTree = ret.result;
            }
        });
    }
}
</script>