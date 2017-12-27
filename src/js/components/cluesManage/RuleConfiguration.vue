<template>
    <div class="animated rule-configuration">
        <loading :loadingMsg="loadingMsg"></loading>
        <div class="clues-tracking-hide" @click.stop="onRuleRightHide">
            <a href="javascript:void(0)">>></a>
        </div>
        <el-tabs type="border-card" @tab-click="onRuleTab" v-model="editableTabsValue">
            <!-- 团队 -->
            <el-tab-pane label="团队" name="1">
                <div>
                    <el-row>
                        <el-form-item label="分配器名称">
                            <div style="display: flex">
                                <span class="tigRed">*</span>
                                <el-input size="small" v-model="teamRuleName"></el-input>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="适用项目">
                            <div style="display: flex">
                                <span class="tigRed">*</span>
                                <el-select style="width: 100%" v-model="teamCourseType" filterable clearable size='small' placeholder="请选择">
                                    <el-option v-for="item in optionProject" :key="item.Id" :label="item.Name" :value="item.Id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="状态">
                            <el-radio-group v-model="teamDeleted">
                                <el-radio v-for="item in OptionStatu" :label="item.Id" :key="item.Id">
                                    {{item.Name}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <div style="margin: 15px 0 25px">
                            <table cellspacing="0" cellpadding="0" class="ProportionTable">
                                <thead>
                                    <tr class="rule-configuration-thead">
                                        <td style="width:24%;border-top-left-radius:3px;">分配类型</td>
                                        <td style="width:28%;">内容</td>
                                        <td style="width:28%;">是否包含</td>
                                        <td style="width:20%">操作</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in addTeamRuleType" v-if="addTeamRuleType.length" :key="item.ruleType" style="text-align: center">
                                        <td>
                                            <el-select v-model="item.QueryField" clearable filterable size='small' placeholder="请选择" @change="changeAssignedType">
                                                <el-option v-for="item in OptionAssignedType" :key="item.Id" :label="item.Name" :value="item.Id">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td>
                                            <el-select v-if="item.QueryField === 1" v-model="item.FieldValue" filterable multiple class="tracking-text-font" size='small' style="width: 80%" placeholder="请选择">
                                                <el-option v-for="item in Optionprovice" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                                                </el-option>
                                            </el-select>
                                            <Gtree v-if="item.QueryField === 2" ref="gtree" :data="cityData" :index="index" :value="item.sourceId" :onCheck="getAreaTree" placeholder="请选择城市"></Gtree>
                                            <Gtree v-if="item.QueryField === 5" ref="gtree" :data="sourceData" :index="index" :value="item.sourceId" :onCheck="getchannelsTree" placeholder="请选择客户来源"></Gtree>
                                            <span v-if="item.QueryField === 3">————</span>
                                        </td>
                                        <td>
                                            <el-radio-group v-model="item.IsContain">
                                                <el-radio class="radio" label="1">包含</el-radio>
                                                <el-radio class="radio" label="2">排除</el-radio>
                                            </el-radio-group>
                                        </td>
                                        <td style="text-align:center;width:80px;" class="clues-newusers-table">
                                            <a href="javascript:void(0)" class="newuser-add" @click="onAddRuleType(0)"></a>
                                            <a href="javascript:void(0)" class="newuser-remove" v-if="removeTypeOneIcon" @click="onRemovRuleType(index, 0)"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table cellspacing="0" cellpadding="0" class="ProportionTable">
                                <thead>
                                    <tr class="rule-configuration-thead">
                                        <td style="width:45%;border-top-left-radius:3px;">分配给</td>
                                        <td style="width:35%;">占比 (%)</td>
                                        <td style="width:20%">操作</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(parentItem,index) in OptionTearmProportion" :key="parentItem.AccountName" style="text-align:center;">
                                        <td>
                                            <el-cascader filterable size="small" filterable clearable v-model="parentItem.ObjectID" :options="TearmList" :show-all-levels="false" :props="UserProps"></el-cascader>
                                        </td>
                                        <td style="text-align:center;">
                                            <el-input size="small" style="width:100%" v-model="parentItem.Weight"></el-input>
                                        </td>
                                        <td style="text-align:center;width:80px;" class="clues-newusers-table">
                                            <a href="javascript:void(0)" class="newuser-add" @click="onAddProportion(0)"></a>
                                            <a href="javascript:void(0)" class="newuser-remove" v-if="removeProprtionOneIcon" @click="onRemoveProportion(index,0)"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="text-align: center; margin-top: 30px;">
                            <el-button v-if="unlocking('Distribution_TeamRule_Save')" style="width: 70px" size="small" type="primary" @click.stop.stop="submitForm(0)">保存
                            </el-button>
                            <el-button v-if="unlocking('Distribution_TeamRule_Delete')" style="width: 70px" size="small" @click="onCloseRule">关闭
                            </el-button>
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
            <!-- 团队 -->
            <!-- 个人 -->
            <el-tab-pane label="个人" name="2">
                <div>
                    <el-row>
                        <el-form-item label="分配器名称">
                            <div style="display: flex">
                                <span class="tigRed">*</span>
                                <el-input size="small" v-model="personRuleName"></el-input>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="适用项目">
                            <div style="display: flex">
                                <span class="tigRed">*</span>
                                <el-select style="width: 100%" v-model="personCourseType" filterable clearable size='small' placeholder="请选择">
                                    <el-option v-for="item in optionProject" :key="item.Id" :label="item.Name" :value="item.Id">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="适用团队" prop="CourseType">
                            <span class="tigRed">*</span>
                            <div style="position:relative;width:80%;display: inline-block;">
                                <input v-model="tearmTreeName" style="height:30px;line-height:30px;" class="el-input__inner" size="small" @click="DisplayTearmTree" />
                                <div style="width:260px;position:absolute;height:auto;z-index:999" @mouseleave="HideAll">
                                    <el-tree :check-strictly="true" v-show="isTeamDisplayTree" :show-checkbox="false" ref="treeTearm" :data="TearmList" class="TearmTree" :default-checked-keys="tearmRibit" node-key="Id" :props="UserProps" @node-click="treeTearmChange" :highlight-current="true" style="position:relative;bottom:4px;width:260px;max-height:200px;overflow:auto;"></el-tree>
                                </div>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="状态">
                            <el-radio-group v-model="personDeleted">
                                <el-radio v-for="item in OptionStatu" :label="item.Id" :key="item.Id">
                                    {{item.Name}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <div style="margin: 15px 0 25px">
                            <table cellspacing="0" cellpadding="0" class="ProportionTable">
                                <thead>
                                    <tr class="rule-configuration-thead">
                                        <td style="width:24%;border-top-left-radius:3px;">分配类型</td>
                                        <td style="width:28%;">内容</td>
                                        <td style="width:28%;">是否包含</td>
                                        <td style="width:20%">操作</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index) in addPrsonRuleType" :key="item.ruleType" style="text-align: center">
                                        <td>
                                            <el-select v-model="item.QueryField" clearable filterable size='small' placeholder="请选择" @change="changeAssignedType">
                                                <el-option v-for="item in OptionAssignedType" :key="item.Id" :label="item.Name" :value="item.Id">
                                                </el-option>
                                            </el-select>
                                        </td>
                                        <td>
                                            <el-select v-if="item.QueryField === 1" v-model="item.FieldValue" filterable multiple class="tracking-text-font" size='small' style="width: 80%" placeholder="请选择">
                                                <el-option v-for="item in Optionprovice" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                                                </el-option>
                                            </el-select>
                                            <Gtree v-if="item.QueryField === 2" ref="gtree" :data="cityData" :index="index" :value="item.sourceId" :onCheck="getAreaTrees" placeholder="请选择城市"></Gtree>
                                            <Gtree v-if="item.QueryField === 5" ref="gtree" :data="sourceData" :index="index" :value="item.sourceId" :onCheck="getchannelsTrees" placeholder="请选择客户来源"></Gtree>
                                            <span v-if="item.QueryField === 3">————</span>
                                        </td>
                                        <td>
                                            <el-radio-group v-model="item.IsContain">
                                                <el-radio class="radio" label="1">包含</el-radio>
                                                <el-radio class="radio" label="2">排除</el-radio>
                                            </el-radio-group>
                                        </td>
                                        <td style="text-align:center;width:80px;" class="clues-newusers-table">
                                            <a href="javascript:void(0)" class="newuser-add" @click="onAddRuleType(1)"></a>
                                            <a href="javascript:void(0)" class="newuser-remove" v-if="removeTypeTwoIcon" @click="onRemovRuleType(index, 1)"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table cellspacing="0" cellpadding="0" class="ProportionTable">
                                <thead>
                                    <tr style="text-align:center;font-size:14px;">
                                        <td style="width:30%;">分配给</td>
                                        <td style="width:18%;">占比 (%)</td>
                                        <td style="width:18%;">当日上限</td>
                                        <td style="width:18%;">当日总上限</td>
                                        <td style="width:16%;">操作</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(parentItem, index) in OptionPersonProportion" :key="parentItem.ObjectID" style="text-align:center">
                                        <td>
                                            <el-cascader size="small" filterable v-model="parentItem.ObjectID" :options="UserIdList" :show-all-levels="false" :props="UserProps"></el-cascader>
                                        </td>
                                        <td style="text-align:center;">
                                            <el-input size="small" style="width:100%" v-model="parentItem.Weight"></el-input>
                                        </td>
                                        <td style="text-align:center;">
                                            <el-input size="small" style="width:100%" v-model="parentItem.dayLimit"></el-input>
                                        </td>
                                        <td style="text-align:center;width:20%;">
                                            <el-input size="small" style="width:80%" v-model="parentItem.TotalLimit"></el-input>
                                        </td>
                                        <td style="text-align:center;width:80px;" class="clues-newusers-table">
                                            <a href="javascript:void(0)" class="newuser-add" @click="onAddProportion(1)"></a>
                                            <a href="javascript:void(0)" class="newuser-remove" v-if="removeProprtionTwoIcon" @click="onRemoveProportion(index,1)"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="text-align: center; margin-top: 30px;">
                            <el-button v-if="unlocking('Distribution_TeamRule_Save')" style="width: 70px" size="small" type="primary" @click.stop="submitForm(1)">保存
                            </el-button>
                            <el-button v-if="unlocking('Distribution_TeamRule_Delete')" style="width: 70px" size="small" @click="onCloseRule">关闭
                            </el-button>
                        </div>
                    </el-row>
                </div>
            </el-tab-pane>
            <!-- 个人 -->
        </el-tabs>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import Tree from '../../containers/ruleTree.vue';
import Gtree from '../../plugins/tree/ExtendZTree.vue';
import loading from '../../containers/loading.vue';
import { GetPublicPoolUser, GetUserDepartmentTree, GetDataTypeEnumList, GetRangeFieldEnumList, interestedProject, getProviceOrCity, AddAllocation, EditAllocation, GetAllocationRuleInfo, GetCustomerSourceTree, GetArea } from '../../api/cluesManage';
export default {
    props: ['onGetDataList'],
    components: { Gtree, loading },
    data() {
        return {
            tabIndex: 0,
            editableTabsValue: '1',
            loadingMsg: {
                title: '',
                loading: false
            },
            cityData: [],
            sourceData: [],
            Optionprovice: [],
            optionProject: [],
            OptionAssignedType: [],
            OptionStatu: [],
            UserIdList: [],
            TearmList: [],
            removeTypeOneIcon: false,
            removeProprtionOneIcon: false,
            removeTypeTwoIcon: false,
            removeProprtionTwoIcon: false,
            isTeamDisplayTree: false,
            isRtype: '',
            UserProps: { //部门绑定列名
                value: 'Id',
                label: 'Name',
                children: 'ChildrenList'
            },

            /*团队*/
            teamRuleName: '', // 分配器名称
            teamCourseType: '', // 适用项目
            teamDeleted: 0, // 状态
            addTeamRuleType: [{ // 分配类型
                QueryField: '',
                FieldValue: [],
                IsContain: '1',
                sourceId: []
            }],
            OptionTearmProportion: [{ // 分配对象
                ObjectID: [],
                Weight: ''
            }],
            /*团队*/

            /*个人*/
            tearmRibit: [],
            tearmTreeName: '',
            personRuleName: '', // 分配器名称
            personCourseType: '', // 适用项目
            TeamID: '', // 使用团队
            personDeleted: 0, // 状态
            addPrsonRuleType: [{ // 分配类型
                QueryField: '',
                FieldValue: [],
                IsContain: '1',
                sourceId: []
            }],
            OptionPersonProportion: [{ // 分配对象
                ObjectID: [],
                Weight: '',
                dayLimit: '',
                TotalLimit: ''
            }]
            /*个人*/
        }
    },
    watch: {
        RuleGuid(guid) {
            if (guid && guid.length > 1) {
                this.GetAllocationRuleInfoData(guid);
            }
        },
        addTeamRuleType(val) {
            if (val.length > 1) {
                this.removeTypeOneIcon = true;
            } else {
                this.removeTypeOneIcon = false;
            }
        },
        OptionTearmProportion(val) {
            if (val.length > 1) {
                this.removeProprtionOneIcon = true;
            } else {
                this.removeProprtionOneIcon = false;
            }
        },
        addPrsonRuleType(val) {
            if (val.length > 1) {
                this.removeTypeTwoIcon = true;
            } else {
                this.removeTypeTwoIcon = false;
            }
        },
        OptionPersonProportion(val) {
            if (val.length > 1) {
                this.removeProprtionTwoIcon = true;
            } else {
                this.removeProprtionTwoIcon = false;
            }
        },
    },
    computed: {
        ...mapState({
            isRuleRight: state => state.cluesManage.isRuleRight,
            RuleGuid: state => state.cluesManage.AllocationRuleGuid,
        }),
    },
    methods: {
        getAreaTree(ids, index, val) { // 团队获取城市
            this.addTeamRuleType[index].FieldValue = ids
            this.addTeamRuleType[index].sourceId = ids
        },
        getchannelsTree(ids, index, val) { // 团队获取客户来源
            this.addTeamRuleType[index].FieldValue = ids
            this.addTeamRuleType[index].sourceId = ids
        },

        getAreaTrees(ids, index, val) { // 个人获取城市
            this.addPrsonRuleType[index].FieldValue = ids
            this.addPrsonRuleType[index].sourceId = ids
        },
        getchannelsTrees(ids, index, val) { // 个人获取客户来源
            this.addPrsonRuleType[index].FieldValue = ids
            this.addPrsonRuleType[index].sourceId = ids

        },

        GetAllocationRuleInfoData(guid) { // 获取修改数据
            this.clearForm();
            this.loadingMsg.loading = true;
            GetAllocationRuleInfo({ guid }).then(ret => {
                this.loadingMsg.loading = false;
                if (ret.status === 0) {
                    const { AllocationRuleName, CourseType, TeamID, Rtype, IsDeleted, IsContain, Feeders, Ranges } = ret.result;
                    this.editableTabsValue = Rtype.toString()
                    this.isRtype = Rtype;
                    if (Rtype === 1) { // 团队
                        this.teamRuleName = AllocationRuleName; // 分配器名称
                        this.teamCourseType = CourseType.toString(); // 适用项目
                        this.teamDeleted = IsDeleted; // 状态
                        if (Ranges.length > 0) {
                            let temaRanges = [];
                            let i = 0;
                            let auto = setInterval(() => {
                                if (i < Ranges.length) {
                                    temaRanges.push({ // 分配类型
                                        QueryField: Ranges[i].QueryField,
                                        FieldValue: Ranges[i].FieldValue,
                                        sourceId: Ranges[i].FieldValue.toString(),
                                        IsContain: Ranges[i].IsContain.toString()
                                    });
                                    i++;
                                } else {
                                    clearInterval(auto)
                                }
                            }, 0)
                            this.addTeamRuleType = temaRanges
                        }
                        if (Feeders.length > 0) {
                            let teamFeeders = [];
                            for (let j = 0; j < Feeders.length; j++) {
                                let ObjectID = this.getNodesIds(Feeders[j].ObjectID);
                                teamFeeders.push({ // 分配对象
                                    ObjectID,
                                    Weight: Feeders[j].Weight
                                })
                            }
                            this.OptionTearmProportion = teamFeeders;
                        }
                    } else { // 个人
                        this.personRuleName = AllocationRuleName; // 分配器名称
                        this.personCourseType = CourseType.toString(); // 适用项目
                        this.personDeleted = IsDeleted; // 状态
                        if (Ranges.length > 0) {
                            let prsonRanges = [];
                            let j = 0;
                            let timer = setInterval(() => {
                                if (j < Ranges.length) {
                                    prsonRanges.push({ // 分配类型
                                        QueryField: Ranges[j].QueryField,
                                        FieldValue: Ranges[j].FieldValue,
                                        sourceId: Ranges[j].FieldValue,
                                        IsContain: Ranges[j].IsContain.toString()
                                    });
                                    j++;
                                } else {
                                    clearInterval(timer)
                                }
                            }, 0)
                            this.addPrsonRuleType = prsonRanges
                        }
                        if (Feeders.length > 0) {
                            let personFeeders = [];
                            for (let j = 0; j < Feeders.length; j++) {
                                let ObjectID = this.getPersonNodeIds(Feeders[j].ObjectID);
                                personFeeders.push({ // 分配对象
                                    ObjectID,
                                    Weight: Feeders[j].Weight,
                                    dayLimit: Feeders[j].DayLimit,
                                    TotalLimit: Feeders[j].TotalLimit
                                })
                            }
                            this.OptionPersonProportion = personFeeders;
                        }
                        this.tearmRibit = TeamID;
                        this.$refs.treeTearm.setCheckedKeys([this.tearmRibit]);
                        let nodtearm = this.$refs.treeTearm.getCheckedNodes();
                        if (nodtearm != null && nodtearm.length > 0) {
                            this.tearmTreeName = nodtearm[0].Name;
                        }
                    }
                }
            })
        },

        submitForm(index) {
            if (index === 0) { // 团队
                let Feeders = [];
                this.bntLoading = true;
                for (let i = 0; i < this.OptionTearmProportion.length; i++) {
                    Feeders.push({
                        ObjectID: this.OptionTearmProportion[i].ObjectID[this.OptionTearmProportion[i].ObjectID.length - 1],
                        Weight: this.OptionTearmProportion[i].Weight,
                        Priority: i+1
                    });
                }
                let tearmPrm = {
                    AllocationRuleGuid: this.RuleGuid,
                    CourseType: this.teamCourseType, //项目id
                    Rtype: 1,
                    TeamID: '',
                    Feeders, //分配比例表格
                    Ranges: this.addTeamRuleType, // 添加分配类型
                    AllocationRuleName: this.teamRuleName, //分配器名称
                    IsDeleted: this.teamDeleted, //是否有效
                };
                if ((this.RuleGuid != undefined && this.RuleGuid != "") && (this.isRtype === Number(this.editableTabsValue))) {
                    tearmPrm.AllocationRuleGuid = this.RuleGuid;
                    this.loading = true;
                    EditAllocation(tearmPrm).then(ret => { // 修改规则
                        this.loading = false;
                        if (ret.status === 0) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$store.dispatch('isRuleRight', false);
                            this.onGetDataList();
                            this.$store.dispatch('AllocationRuleGuid', null);
                        }
                    }).catch(() => {
                        this.loading = false;
                    });

                } else {
                    this.loading = true;
                    AddAllocation(tearmPrm).then(ret => { // 新增规则
                        this.loading = false;
                        if (ret.status === 0) {
                            if (ret.result == true) {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.onGetDataList(); //初始化列表
                                this.$store.dispatch('isRuleRight', false);
                                this.$store.dispatch('AllocationRuleGuid', null);
                            }

                        }
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            } else { // 个人
                this.bntLoading = true;
                let Feeders = [];
                for (let i = 0; i < this.OptionPersonProportion.length; i++) {
                    Feeders.push({
                        dayLimit: this.OptionPersonProportion[i].dayLimit,
                        TotalLimit: this.OptionPersonProportion[i].TotalLimit,
                        ObjectID: this.OptionPersonProportion[i].ObjectID[this.OptionPersonProportion[i].ObjectID.length - 1],
                        Weight: this.OptionPersonProportion[i].Weight,
                        Priority: i+1
                    });
                }
                let personPrm = {
                    AllocationRuleGuid: this.RuleGuid,
                    CourseType: this.personCourseType, //项目id
                    Rtype: 2,
                    TeamID: this.tearmRibit[this.tearmRibit.length - 1] || this.tearmRibit,
                    Feeders, //分配比例表格
                    Ranges: this.addPrsonRuleType, // 添加分配类型
                    AllocationRuleName: this.personRuleName, //分配器名称
                    IsDeleted: this.personDeleted, //是否有效
                };
                if ((this.RuleGuid != undefined && this.RuleGuid != "") && (this.isRtype === Number(this.editableTabsValue))) {
                    personPrm.AllocationRuleGuid = this.RuleGuid;
                    this.loading = true;
                    EditAllocation(personPrm).then(ret => { // 修改规则
                        this.loading = false;
                        if (ret.status === 0) {
                            if (ret.result == true) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.onGetDataList(); //初始化列表
                                this.$store.dispatch('isRuleRight', false);
                                this.$store.dispatch('AllocationRuleGuid', null);
                            }
                        }
                    }).catch(() => {
                        this.loading = false;
                    });

                } else {
                    this.loading = true;
                    AddAllocation(personPrm).then(ret => { // 新增规则
                        this.loading = false;
                        if (ret.status === 0) {
                            if (ret.result == true) {
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                                this.onGetDataList(); //初始化列表
                                this.$store.dispatch('isRuleRight', false);
                                this.$store.dispatch('AllocationRuleGuid', null);
                            }
                        }
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            }
        },

        onCloseRule() { // 关闭侧边栏
            this.$store.dispatch('isRuleRight', false);
        },
        clearForm() { // 清空
            /*团队*/
            this.teamRuleName = ''; // 分配器名称
            this.teamCourseType = ''; // 适用项目
            this.teamDeleted = 0; // 状态
            this.addTeamRuleType = [{ // 分配类型
                QueryField: '',
                FieldValue: [],
                IsContain: '1',
                sourceId: []
            }];
            this.OptionTearmProportion = [{ // 分配对象
                ObjectID: [],
                Weight: ''
            }]
            this.personRuleName = ''; // 分配器名称
            this.personCourseType = ''; // 适用项目
            this.TeamID = ''; // 使用团队
            this.tearmRibit = [];
            this.tearmTreeName = '';
            this.personDeleted = 0, // 状态
                this.addPrsonRuleType = [{ // 分配类型
                    QueryField: '',
                    FieldValue: [],
                    IsContain: '1',
                    sourceId: []
                }];
            this.OptionPersonProportion = [{ // 分配对象
                ObjectID: [],
                Weight: '',
                dayLimit: '',
                TotalLimit: ''
            }]
            /*个人*/
        },
        onAddRuleType(index) { // 添加分配类型
            if (index == 0) {
                this.addTeamRuleType.push({
                    QueryField: '',
                    FieldValue: [],
                    IsContain: '1',
                    sourceId: []
                })
            } else {
                this.addPrsonRuleType.push({
                    QueryField: '',
                    FieldValue: [],
                    IsContain: '1',
                    sourceId: []
                })
            }
        },
        onAddProportion(index) { // 添加分配对象
            if (index == 0) {
                this.OptionTearmProportion.push({
                    ObjectID: [],
                    Weight: ''
                })
            } else {
                this.OptionPersonProportion.push({
                    ObjectID: [],
                    Weight: '',
                    dayLimit: '',
                    TotalLimit: ''
                })
            }
        },
        onRemovRuleType(index, type) { // 删除分类类型
            if (type == 0) {
                let addTeamRuleType = [...this.addTeamRuleType];
                this.addTeamRuleType = [];
                setTimeout(() => {
                    this.addTeamRuleType = addTeamRuleType;
                    if (this.addTeamRuleType.length > 1) {
                        this.addTeamRuleType.splice(index, 1)
                    }
                }, 0)
            } else {
                let addPrsonRuleType = [...this.addPrsonRuleType];
                this.addPrsonRuleType = [];
                setTimeout(() => {
                    this.addPrsonRuleType = addPrsonRuleType;
                    if (this.addPrsonRuleType.length > 1) {
                        this.addPrsonRuleType.splice(index, 1)
                    }
                }, 0)
            }
        },

        onRemoveProportion(index, type) { // 删除分配对象
            if (type == 0) {
                if (this.OptionTearmProportion.length > 1) {
                    this.OptionTearmProportion.splice(index, 1)
                }
            } else {
                if (this.OptionPersonProportion.length > 1) {
                    this.OptionPersonProportion.splice(index, 1)
                }
            }
        },
        onRuleRightHide() {
            this.$store.dispatch('isRuleRight', false);
            this.$store.dispatch('AllocationRuleGuid', null);
        },
        onRuleTab(tab) {
            this.tabIndex = tab.index;
        },

        getPersonNodeIds(uid) {
            var node = this.getCasNode(uid, this.UserIdList);
            var nodeIds = [];
            if (node && node.NodeList) {
                for (var i = 0; i < node.NodeList.length; i++) {
                    nodeIds.push(node.NodeList[i]);
                }
            }
            return nodeIds;
        },
        getNodesIds(uid) {
            var node = this.getCasNode(uid, this.TearmList);
            var nodeIds = [];
            if (node && node.NodeList) {
                for (var i = 0; i < node.NodeList.length; i++) {
                    nodeIds.push(node.NodeList[i]);
                }
            }
            return nodeIds;
        },
        getCasNode(uid, childNodes) {
            if (!childNodes) {
                return null;
            }
            for (var i = 0; i < childNodes.length; i++) {
                let item = childNodes[i];
                if (uid == item.Id) {
                    return item;
                }
                if (item.ChildrenList) {
                    var childNode = this.getCasNode(uid, item.ChildrenList);
                    if (childNode) {
                        return childNode;
                    }
                }
            }
            return null;
        },
        DisplayTearmTree() {
            this.isTeamDisplayTree = true;
        },
        treeTearmChange(data, node, selfNode) {
            if (node != null) {
                this.tearmRibit = [data.Id];
                this.tearmTreeName = data.Name;
            }
        },
        HideAll() {
            this.isTeamDisplayTree = false;
        },
    },
    created() {
        let proviceId = {
            areaId: '00000000-0000-0000-0000-000000000000',
        };
        getProviceOrCity(proviceId).then(ret => { // 省份接口
            if (ret.status === 0) {
                this.Optionprovice = ret.result;
            }
        });
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
        GetDataTypeEnumList().then(ret => { //分配状态（启用,停用）
            if (ret.status === 0) {
                this.OptionStatu = ret.result;
            }
        });
        GetCustomerSourceTree().then(ret => { // 客户来源接口
            if (ret.status === 0) {
                let data = ret.result;
                for (let i = 0; i < data.length; i++) {
                    data[i].Id = data[i].Id + '';
                }
                this.sourceData = data;
            }

        });
        GetArea().then(ret => { // 城市接口
            if (ret.status === 0) {
                this.cityData = ret.result;
            }
        })

        var userid = "";
        var useModel = localStorage.getItem("CRM_USER_INFO")
        if (useModel != undefined && useModel != null) {
            var usedata = JSON.parse(useModel);
            if (usedata != undefined) {
                userid = usedata.UserId;
            }
        }
        GetUserDepartmentTree({}).then(ret => { // 获取人员和部门树结构
            if (ret.status === 0) {
                this.UserIdList = ret.result;
            }
        });
        GetPublicPoolUser({ userId: userid }).then(ret => { // 获取人员和部门树结构
            if (ret.status === 0) {
                this.TearmList = ret.result;
            }
        });
    }
}
</script>
<style type="text/css">
.rule-configuration-thead {
    text-align: center;
    font-size: 14px;
    height: 38px;
    background: #eff1f6;
}

.rule-configuration {
    font-size: 12px;
    width: 600px;
    position: fixed;
    right: 0;
    top: 50px;
    bottom: 0;
    z-index: 99;
    height: 100%;
}

.rule-configuration .el-tabs.el-tabs--border-card {
    border-bottom: 0;
    height: 100%;
    overflow: auto;
    box-shadow: -1px 3px 10px #ccc;
    border-left: 0;
}

.rule-configuration .el-tabs__item.is-active {
    color: #20a0ff!important;
}

.rule-configuration .el-tabs .el-tabs__content {
    overflow: auto;
    padding-bottom: 80px;
}

.tigMargin {
    margin-right: 10px;
}

.tigRed {
    color: red;
    position: relative;
    top: 2px;
    margin-right: 10px;
}

.clues-query-style .clues-query-table .el-col-6 {
    word-break: break-word;
}

.clues-query-style {
    padding: 20px 17px 0px;
}

.moduleAssign .el-form-item {
    margin-bottom: 5px;
}

.moduleAssign {
    margin-right: 5px !important;
}




/* 表格样式*/

.ProportionTable {
    width: 100%;
    border: 1px;
    border-bottom: solid 1px #dddddd;
    border-right: solid 1px #dddddd;
    border-radius: 3px;
}

.ProportionTable td {
    border: 1;
    border: solid 1px #dddddd;
    border-bottom: 0px;
    border-right: none;
    padding: 3px 0px;
}

.ProportionTable th {
    border: 1;
    border: solid 1px #dddddd;
    border-bottom: 0px;
    border-right: none;
    padding: 3px 0px;
}




/* 表格样式*/

.ProportionTable .tracking-text-font input {
    border: none;
}

.rule-configuration .el-tabs__nav-wrap {
    height: 35px;
}

.rule-configuration .ProportionTable .el-input input {
    border: none;
    text-align: center;
}

.RuleRight .el-tabs__content {
    overflow: none;
}
</style>