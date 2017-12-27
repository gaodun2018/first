<template>
    <div class="module-clues-content moduleAssign">
        <el-form label-width="120px">
            <div>           
                <el-row>
                    <el-col :span="18">
                        <div>
                            <el-select v-model="searchProJectValue" clearable filterable size="small" style="width: 130px;margin-right: 5px" placeholder="按项目" @change="selectChange">
                                <el-option v-for="item in optionProject" :key="item.Id" clearable filterable :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                            <el-select placeholder="按类型" style="width: 130px;margin-right: 5px" clearable filterable size="small" v-model="searchRangeType" @change="selectChange">
                                <el-option v-for="item in OptionAssignedType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                            <el-select v-model="searchPerson" style="width: 140px;margin-right: 5px" clearable filterable size="small" @change="selectChange" placeholder="规则类型">
                                <el-option v-for="item in OptionPersion" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                            <el-select v-model="searchStatu" style="width: 130px;margin-right: 5px" clearable filterable placeholder="按状态" size="small" @change="selectChange">
                                <el-option v-for="item in OptionStatu" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                            <el-date-picker v-model="searchTimeStart" type="daterange" clearable placeholder="起始时间" style="width: 193px" size="small" @change="selectChange">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="clues-search">
                            <el-input style="width: 200px" placeholder="根据规则名称模糊查询" v-model="searchValue" size="small">
                                <el-button slot="append" icon="search" @click="onSearch" size="small"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col style="padding: 15px 0 10px 0">
                        <el-button v-if="unlocking('Distribution_Rule_Add')" style="width: 70px;border: 1px solid #1d90e6;margin-right: 15px" type="text" size="small" @click.stop="btnAddClick">新增
                        </el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="tableData" v-loading="loading" ref="tbRules" :row-class-name="tableRowClassName" border style="width:100%">
                        <el-table-column prop="AllocationRuleName" label="分配器名称">
                        </el-table-column>
                        <el-table-column prop="CourseType_Str" label="所属项目 ">
                        </el-table-column>
                        <el-table-column prop="Rtype" label="分配大类 " :formatter="TypeFormat">
                        </el-table-column>
                        <el-table-column prop="CreateTime" label="创建时间" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column prop="CreateBy_Str" label="创建人">
                        </el-table-column>
                        <el-table-column prop="IsDeleted" label="有效状态" :formatter="StatuFormat">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="onMdifyRule(scope.$index, tableData)">修改</el-button>
                                <el-button type="text" size="small" @click="onOpenRule(scope.$index, tableData)">{{scope.row.IsDeleted == 0 ? '停用' : '启用'}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="clues-pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                        </el-pagination>
                    </div>
                </el-row>
                <transition>
                    <rule-configuration ref="configuration" :onGetDataList="GetDataList" v-show="$store.state.cluesManage.isRuleRight" :class="$store.state.cluesManage.isRuleRight ? 'slideInRight' : 'slideOutRight'"></rule-configuration>
                </transition>
            </div>
        </el-form>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import tree from '../controls/ZTree.vue';
import { format, number2DateTime } from '../../util/util';
import { Message, MessageBox } from 'element-ui';
import { CRM_USER_INFO } from '../../util/keys';

import {
    getProviceOrCity, interestedProject, GetArea, AddAllocation, GetAllocationRuleList, GetAllocationRuleInfo, GetAllowedUserTree, GetUserDepartment, EditAllocation, DisableAllocation,
    GetRangeFieldEnumList, GetRationTypeEnumList, GetContainStateEnumList, GetDataTypeEnumList, GetUserDepartmentTree, GetUserDepartNode, GetQuickAllocationRuleList,
    getDisableAllocation
} from '../../api/cluesManage';
import RuleConfiguration from './RuleConfiguration.vue';

export default {
    props: ['self'],
    components: { RuleConfiguration, tree },
    data() {
        return {
            loading: false,
            removeOneIcon: true,
            removeTearmIcon: true,
            AllocationRuleGuid: '',
            ruleStatus: '',
            rowbackColor: '',

            /*搜索条件*/
            searchValue: '',
            searchProJectValue: '',
            searchRangeType: '',
            searchTimeStart: '',
            searchTimeEnd: '',
            searchStatu: 0,
            searchPerson: '',
            pageSize: 10,
            currentPage: 1,
            cluesTotal: 0,
            /*搜索条件*/

            tableData: [], //列表集合
            optionProject: [],//项目集合
            TearmList: [],//获取团队账号
            UserIdList: [],//获取数据个人账号集合
            UserProps: { //部门绑定列名
                value: 'Id',
                label: 'Name',
                children: 'ChildrenList'
            },
            OptionStatu: [],//状态集合
            OptionPersion: [],//分配对象
            OptionHasData: [],//包含，排除列表
            OptionAssignedType: [],//分配类型集合
        }
    },
    //事件
    methods: {
        //状态格式化
        StatuFormat: function(modelData) {
            if (modelData != null) {
                var deleteStatu = modelData.IsDeleted;
                switch (deleteStatu) {
                    case 1:
                        return "停用";
                    case 0:
                        return "启用";
                    default:
                        return "启用";
                }
            }

        },
        dateFormat: function(data) {
            if (data != null) {
                var datapan = Date.parse(data.CreateTime);
                return number2DateTime(datapan, "yyyy-MM-dd");
            }
            else {
                return "";
            }
        },
        TypeFormat: function(modelData) {
            if (modelData != null) {
                var typeStatu = modelData.Rtype;
                switch (typeStatu) {
                    case 1:
                        return "项目分配到团队";
                    case 2:
                        return "团队分配到个人";
                    default:
                        return "项目分配到团队";
                }
            }

        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.GetDataList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.GetDataList();
        },
        btnAddClick() { // 新增
            this.$store.dispatch('isRuleRight', true);
            this.$refs.configuration.clearForm();
        },
        //绑定列表
        GetDataList() {
            var starttime = "";
            var totime = ""
            this.loading = true;
            if (this.searchTimeStart != undefined && this.searchTimeStart.length > 0) {
                starttime = format(this.searchTimeStart[0]);
                totime = format(this.searchTimeStart[1]);
            }
            let searchPrm = {
                Where: {
                    AllocationRuleName: this.searchValue,
                    CourseType: this.searchProJectValue,
                    RangeType: this.searchRangeType,
                    BeginTime: starttime,
                    EndTime: totime,
                    Rtype: this.searchPerson,
                    IsDeleted: this.searchStatu
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: "ID ",
                SortCol: "1"
            };
            if (searchPrm.Where.BeginTime != "") {
                searchPrm.Where.BeginTime = format(searchPrm.Where.BeginTime);
            }
            GetAllocationRuleList(searchPrm).then(ret => {
                if (ret.status === 0) {
                    this.loading = false;
                    this.cluesTotal = ret.result.Count;
                    this.tableData = ret.result.Body;
                } else {
                    this.loading = false;
                }
            })
        },
        //快速搜索
        onSearch() {
            let searchPrm = {
                Where: this.searchValue,
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: "",
                SortCol: ""
            };
            GetQuickAllocationRuleList(searchPrm).then(ret => {
                if (ret.status === 0) {
                    this.cluesTotal = ret.result.Count;
                    this.tableData = ret.result.Body;
                }
            })
        },
        onMdifyRule(index, rows) { // 修改
            this.$store.dispatch('isRuleRight', true);
            setTimeout(() => {
                this.$store.dispatch('AllocationRuleGuid', rows[index].AllocationRuleGuid);          
            }, 50)
        },
        onOpenRule(index, rows) { // 启用
            let isDeDisable = rows[index].IsDeleted == 0 ? 1 : 0;
            getDisableAllocation({guid: rows[index].AllocationRuleGuid, isDeDisable}).then(ret => {
                if (ret.status === 0) {
                    this.GetDataList();
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                }
            });
        },
        selectChange() {
            this.GetDataList();
        },
        tableRowClassName(row, index) { // 选中列表行高亮显示
            if (row.AllocationRuleGuid === this.$store.state.cluesManage.AllocationRuleGuid) {
                return 'positive-row';
            }
            return '';
        }
    },
    created() {
        this.GetDataList();//初始化列表

        interestedProject().then(ret => { // 项目和感兴趣的项目接口
            if (ret.status === 0) {
                this.optionProject = ret.result;
            }
        });
        GetRangeFieldEnumList().then(ret => { //分配类型条件列表
            if (ret.status === 0) {
                this.OptionAssignedType = ret.result;
            }
        });
        GetRationTypeEnumList().then(ret => { //分配类型条件列表
            if (ret.status === 0) {
                this.OptionPersion = ret.result;
            }
        });
        GetContainStateEnumList().then(ret => { //分配条件包含,排除状态
            if (ret.status === 0) {
                this.OptionHasData = ret.result;
            }
        });
        GetDataTypeEnumList().then(ret => { //分配状态（启用,停用）
            if (ret.status === 0) {
                this.OptionStatu = ret.result;
            }
        });
        var userid = "";
        var useModel = localStorage.getItem("CRM_USER_INFO")
        if (useModel != undefined && useModel != null) {
            var usedata = JSON.parse(useModel);
            if (usedata != undefined) {
                userid = usedata.UserId;
            }
        }
        GetUserDepartmentTree({ userId: userid }).then(ret => { // 获取人员和部门树结构
            if (ret.status === 0) {
                this.UserIdList = ret.result;
            }
        });
    }

}
</script>
