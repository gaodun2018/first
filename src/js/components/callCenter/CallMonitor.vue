<template>
    <div class="module-clues-content">
        <el-row>
            <el-col :sm="14">
                <div class="order-type-search" style="margin-right: 10px">
                    <Tree :width="'193px'" ref="callrecordTree" :allSelected="selectChange" :callback="recordTree"></Tree>
                </div>
                <div class="order-type-search">
                    <el-select v-model="ruleForm.extStatus" @change="selectChange" clearable style="width:120px;" size="small" placeholder="请选择状态">
                        <el-option label="未签入" value="1"></el-option>
                        <el-option label="空闲" value="2"></el-option>
                        <el-option label="忙碌" value="3"></el-option>
                        <el-option label="通话中" value="4"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :sm="10">
                <div class="clues-search" style="float:right;">
                    <el-input placeholder="根据分机号查询" v-model="ruleForm.searchNo" size="small" style='width: 210px;font-size: 12px' @focus="onFocusType" @blur="onBlurType">
                        <el-button slot="append" icon="search" @click="btnSearch"></el-button>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-form ref="form" :model="form" v-loading="loading">
            <div class="ext-container" style="clear:both">
                <div style="float:left" v-for="item in extStatusData" :key="item.ExtNo" class="ext-item">
                    <div class="ext-item-header">
                        <span :class="{'ext-item-status-unsign':item.StatusId==1,'ext-item-status-idle':item.StatusId==2,'ext-item-status-busy':item.StatusId==3,'ext-item-status-talking':item.StatusId==4}">
                            <span style="margin-left:20px;">{{item.Status}}</span>
                        </span>
                    </div>
                    <div>
                        <ul>
                            <li>
                                {{item.UserName}}
                            </li>
                            <li>
                                分机号 - {{item.ExtNo}}
                            </li>
                            <li v-show="item.StatusId==3">
                                <span>置忙时间</span>
                                <span style="margin-left:5px;">{{item.BusyDuration}}</span>
                            </li>
                            <li v-show="item.StatusId==4">
                                <span>通话时间</span>
                                <span style="margin-left:5px;">{{item.CallDuration}}</span>
                                <span class="ext-monitor">监听</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<style scoped>
.search-text {
    height: 28px;
}

.search-tree {
    left: 5px;
    top: 25px;
}

.ext-item {
    width: 240px;
    height: 140px;
    border: 1px solid #F6F6F6;
    font-size: 12px;
    color: #656565;
    margin-right: 20px;
    margin-top: 15px;
}

.ext-item ul {
    margin-left: 20%;
    margin-top: 10%;
}

.ext-item ul li {
    list-style-type: none;
    margin-top: 5px;
}

.ext-monitor {
    background: url(../../../images/monitor.png) left center no-repeat;
    color: #529BB8;
    padding-left: 18px;
    margin-left: 5px;
}

.ext-item-header {
    background-color: #EEF1F8;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 14px;
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

.search-form {
    margin: 0 20px;
    font-size: 12px;
    color: #20a0ff;
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
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format } from '../../util/util';
import { CRM_MENU, CRM_USER_INFO, CRM_TOKEN, CRM_CURRENT_TAB, CRM_OPEN_TABS, CRM_CURRENT_LEVEL_ONE_MENU } from '../../util/keys';
import { getExtStatus } from '../../api/callCenter';
import cluesModal from 'vueModal';
import { GetAllowedUserTree } from '../../api/cluesManage';
import Tree from '../../containers/Tree.vue';
export default {
    name: 'module-ext-monitor',
    props: ['self', 'item'],
    components: { Tree },
    data() {
        return {
            isShowUser: false,
            filterText: '',
            defaultKeys: '1',
            defaultProps: {
                children: 'ChildrenList',
                label: 'Name'
            },
            isCheckChange: false,//节点状态是否发生变化
            getUserTree: [],
            UserIds: [],
            loading: false,
            extStatusData: [],
            form: {},
            ruleForm: {
                users: [],
                extStatus: "",
                searchNo: ""
            }
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
    },
    watch: {
        createFilter(val) { // 线索创建人
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        recordTree(val) {
            this.UserIds = val;
        },
        selectChange() {
            var queryParm = { UserIds: this.UserIds, ExtNo: "", Status: this.ruleForm.extStatus };
            this.queryExtStatus(queryParm);
        },
        btnSearch() {
            var queryParm = { UserIds: [], ExtNo: this.ruleForm.searchNo, Status: "0" };
            this.queryExtStatus(queryParm);
        },
        queryExtStatus(objParms = { UserIds: this.UserIds, ExtNo: "", Status: "0" }) {
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
        }
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