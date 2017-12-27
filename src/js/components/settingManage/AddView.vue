<template>
    <div class="setting-addview" style="width: 850px;margin: 0 auto">
        <div>
            <loading :loadingMsg="loadingMsg"></loading>
            <p class="tracking-clues-information">基本信息</p>
            <el-form style="padding-top: 15px" :model="ruleForm" ref="ruleForm" :rules="rules" label-width="90px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="查询页面" prop="viewpageid">
                            <el-select style="width: 100%" size="small" filterable v-model="ruleForm.viewpageid"
                                       placeholder="请选择页面">
                                <el-option v-for="item in pageType" :key="item.Id" :value="item.Id"
                                           :label="item.Name"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="视图名称" prop="viewname">
                            <el-input placeholder="请输入内容" v-model="ruleForm.viewname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="描述">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"
                                      v-model="ruleForm.viewnote"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <p class="tracking-clues-information">定义视图</p>
            <el-form style="padding-top: 15px" :model="form" ref="form" label-width="90px">
                <el-row>
                    <el-form-item>
                        <el-row>
                            <el-table :data="cluesRowData" border style="width: 100%">
                                <el-table-column align="center" label="列名">
                                    <template scope="scope">
                                        <el-select filterable clearable @change="onRowType(scope.$index, cluesRowData)"
                                                   @visible-change="rowVisible" style="width: 100%" size="small"
                                                   v-model="scope.row.type" placeholder="请选择列">
                                            <el-option v-for="item in cluesType" :key="item.name"
                                                       :disabled="item.disabled" :label="item.name" :value="item.type">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="选项值">
                                    <template scope="scope">
                                        <el-input style="width: 100%"
                                                  v-if="scope.row.type == 'CommuKeywords' || scope.row.type == 'Major'"
                                                  size="small" v-model="scope.row.value"></el-input>
                                        <el-date-picker style="width: 100%"
                                                        v-if="scope.row.type == 'CreateStartTime' || scope.row.type == 'NextCommunicateStartTime' || scope.row.type == 'ClueOwerGetTime' || scope.row.type == 'RepeatConsultationTime' || scope.row.type == 'lastCommunicateTime' || scope.row.type == 'ClueTurnTime'"
                                                        v-model="scope.row.value" size="small" format="yyyy-MM-dd"
                                                        type="daterange" placeholder="选择时间范围">
                                        </el-date-picker>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'IsShare'" filterable
                                                   v-model="scope.row.value" placeholder="请选择" clearable size="small">
                                            <el-option key="3" label="是" value="1">
                                            </el-option>
                                            <el-option key="4" label="否" value="0">
                                            </el-option>
                                        </el-select>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'IsMerge'" filterable
                                                   v-model="scope.row.value" clearable placeholder="请选择" size="small">
                                            <el-option key="1" label="是" value="1">
                                            </el-option>
                                            <el-option key="2" label="否" value="0">
                                            </el-option>
                                        </el-select>
                                        <div v-if="scope.row.type == 'xbNum' || scope.row.type == 'xjNum' || scope.row.type == 'xgNum'"
                                             style="display: inline-block">
                                            <el-input v-model="scope.row.value" size="small"
                                                      style="width: 48%"></el-input>
                                            -
                                            <el-input v-model="scope.row.values" size="small"
                                                      style="width: 47%"></el-input>
                                        </div>
                                        <el-date-picker v-if="scope.row.type == 'EnrollmentYear'" v-model="scope.row.values" type="year" placeholder="选择年份" style="width: 100%" size="small"></el-date-picker>
                                        <el-cascader style="width: 100%" v-if="scope.row.type == 'ClueStatus'"
                                                     filterable clearable size="small" v-model="scope.row.value"
                                                     :options="cluesStatusData" :props="ClueStatusProps"></el-cascader>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'CourseType'" filterable
                                                   v-model="scope.row.value" multiple placeholder="请选择" size="small">
                                            <el-option v-for="professional in interestedData" :key="professional.Id"
                                                       :label="professional.Name" :value="professional.Id">
                                            </el-option>
                                        </el-select>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'Profession'" filterable
                                                   v-model="scope.row.value" multiple placeholder="请选择" size="small"
                                                   @visible-change="onProfession">
                                            <el-option v-for="professional in professionalData" :key="professional.Id"
                                                       :label="professional.Name" :value="professional.Id">
                                            </el-option>
                                        </el-select>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'ClueQuality'" filterable
                                                   v-model="scope.row.value" multiple placeholder="请选择" size="small"
                                                   @visible-change="onOptimalClues">
                                            <el-option v-for="item in optimalCluesData" :key="item.Id"
                                                       :label="item.Name" :value="item.Id"></el-option>
                                        </el-select>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'IntentionGrade'"
                                                   v-model="scope.row.value" placeholder="请选择" filterable clearable
                                                   size="small" @visible-change="onIntentionDegree">
                                            <el-option v-for="intention in degreeData" :key="intention.Id"
                                                       :label="intention.Name" :value="intention.Id">
                                            </el-option>
                                        </el-select>
                                        <el-autocomplete style="width: 100%" v-if="scope.row.type == 'SchoolName'"
                                                         size="small" v-model="scope.row.value"
                                                         :trigger-on-focus="false" :fetch-suggestions="querySearchAsync"
                                                         placeholder="请输入学校" @select="handleSelect"></el-autocomplete>
                                        <Tree v-if="scope.row.type == 'xcUser' || scope.row.type == 'xsUser' || scope.row.type == 'czUser' || scope.row.type == 'xlUser' || scope.row.type == 'clueturnUser' || scope.row.type == 'preturnUser'"
                                              ref="resetCreate" width="100%" :data="createData" :value="scope.row.value"
                                              :index="scope.$index" :onCheck="createTree" placeholder="请选择"></Tree>
                                        <Tree v-if="scope.row.type == 'sSourceUser' || scope.row.type == 'mSourceUser'"
                                              :index="scope.$index" ref="resetFirstChannel" width="100%"
                                              :data="sourceData" :value="scope.row.value"
                                              :onCheck="FirstChannelCodeTree" placeholder="请选择"></Tree>
                                        <Tree v-if="scope.row.type == 'marketingUser'" :index="scope.$index"
                                              ref="resetMarketing" width="100%" :data="marketingData"
                                              :value="scope.row.value" :onCheck="marketingTree"
                                              placeholder="请选择"></Tree>
                                        <Tree v-if="scope.row.type == 'channelUser'" :index="scope.$index"
                                              ref="resetSource"
                                              width="100%" :data="channelData" :value="scope.row.value"
                                              :onCheck="sourceChannelTree" placeholder="请选择"></Tree>
                                        <Tree v-if="scope.row.type == 'labelUser'" :index="scope.$index"
                                              ref="resetLabel"
                                              width="100%" :data="labelData" :value="scope.row.value"
                                              :onCheck="labelTree" placeholder="请选择标签"></Tree>
                                        <div v-if="scope.row.type == 'city'">
                                            <el-select filterable clearable v-model="scope.row.value"
                                                       class="tracking-text-font" size='small'
                                                       style="width: 48%" placeholder="请选择省"
                                                       @change="changeProvice(scope.$index, scope.row.value)">
                                                <el-option v-for="item in Optionprovice" :key="item.IdentityGuid"
                                                           :label="item.Name" :value="item.IdentityGuid">
                                                </el-option>
                                            </el-select>
                                            <span>-</span>
                                            <el-select v-model="scope.row.values" class="tracking-text-font"
                                                       size='small' style="width: 47%" filterable clearable
                                                       placeholder="请选择市">
                                                <el-option v-for="item in OptionCity" :key="item.IdentityGuid"
                                                           :label="item.Name" :value="item.IdentityGuid">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <el-select style="width: 100%" v-if="scope.row.type == 'Urgency'" filterable
                                                   v-model="scope.row.value" clearable placeholder="请选择" size="small"
                                                   @visible-change="onUrgency">
                                            <el-option v-for="item in getUrgencyData" :key="item.Id" :label="item.Name"
                                                       :value="item.Id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作" width="130">
                                    <template scope="scope">
                                        <a href="javascript:void(0)" @click="addClick" class="newuser-add"></a>
                                        <a v-show="removeIcon1" href="javascript:void(0)"
                                           @click="removeRowCoales(scope.$index)" class="newuser-remove"></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="text-align: center; margin-top: 20px">
                                <el-button @click="onSaveRow('ruleForm')" size="small" :loading="bntLoading"
                                           style="width: 75px" type="primary">保存
                                </el-button>
                            </div>
                        </el-row>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import {mapState} from "vuex";
    import {CRM_USER_INFO} from "../../util/keys.js";
    import {
        GetLabelList,
        getchannels,
        GetSourceDetailsTree,
        GetCustomerSourceTree,
        GetAllowedUserTree,
        getProviceOrCity,
        GetClueStatusTree,
        interestedProject,
        intentionDegree,
        OptimalCluesType,
        professionalStatus,
        getValueSchools,
        GetDictionaryByTypeId
    } from "../../api/cluesManage.js";
    import {
        AddDefinitionViewInfo,
        GetDefinitionViewInfoByID
    } from "../../api/settingManage.js";
    import Tree from "../../plugins/tree/ExtendZTree.vue";
    import loading from '../../containers/loading.vue';
    import {format} from "../../util/util";

    export default {
        components: {Tree, loading},
        data() {
            return {
                loadingMsg: {
                    title: "",
                    loading: false
                },
                bntLoading: false,
                addIcon1: true,
                addIcon2: true,
                removeIcon1: false,
                removeIcon2: false,
                isCoalesCing: false,
                isRuleOut: false,
                pageType: [],
                OptionCity: [],
                selectCityValue: "",
                selectProviceValue: "",
                cluesRowData: [
                    {
                        type: "",
                        value: [],
                        values: ""
                    }
                ],
                ruleForm: {
                    viewpageid: "",
                    viewname: "",
                    viewnote: ""
                },
                ruleOutData: [
                    {
                        date: "",
                        name: ""
                    }
                ],
                Optionprovice: [],
                createData: [],
                sourceData: [],
                marketingData: [],
                cluesStatusData: [],
                professionalData: [],
                optimalCluesData: [],
                getUrgencyData: [],
                degreeData: [],
                interestedData: [],
                ClueStatusProps: {
                    // 线索状态
                    value: "Id",
                    label: "Name",
                    children: "ChildrenList"
                },
                channelData: [],
                labelData: [],
                cluesType: [
                    {
                        type: "CreateStartTime",
                        name: "线索创建时间"
                    },
                    {
                        type: "xcUser",
                        name: "线索创建人"
                    },
                    {
                        type: "NextCommunicateStartTime",
                        name: "下次沟通时间"
                    },
                    {
                        type: "ClueOwerGetTime",
                        name: "所属人获得时间"
                    },
                    {
                        type: "xsUser",
                        name: "线索所属人"
                    },
                    {
                        type: "ClueStatus",
                        name: "线索状态"
                    },
                    {
                        type: "CourseType",
                        name: "感兴趣的项目"
                    },
                    {
                        type: "Profession",
                        name: "职业状态"
                    },
                    {
                        type: "ClueQuality",
                        name: "优质线索类型"
                    },
                    {
                        type: "czUser",
                        name: "重复咨询人"
                    },
                    {
                        type: "RepeatConsultationTime",
                        name: "重复咨询时间"
                    },
                    {
                        type: "IntentionGrade",
                        name: "客户意向度"
                    },
                    {
                        type: "lastCommunicateTime",
                        name: "末次沟通时间"
                    },
                    {
                        type: "SchoolName",
                        name: "学校"
                    },
                    {
                        type: "Major",
                        name: "专业"
                    },
                    {
                        type: "xbNum",
                        name: "销售拨打次数"
                    },
                    {
                        type: "xjNum",
                        name: "销售接通次数"
                    },
                    {
                        type: "xgNum",
                        name: "销售未跟进天数"
                    },
                    {
                        type: "sSourceUser",
                        name: "首次客户来源"
                    },
                    {
                        type: "mSourceUser",
                        name: "末次客户来源"
                    },
                    {
                        type: "marketingUser",
                        name: "营销计划"
                    },
                    {
                        type: "channelUser",
                        name: "来源渠道"
                    },
                    {
                        type: "city",
                        name: "所在省市"
                    },
                    {
                        type: "xlUser",
                        name: "线索来源人"
                    },
                    {
                        type: "Urgency",
                        name: "客户沟通紧急度"
                    },
                    {
                        type: "IsShare",
                        name: "共享线索"
                    },
                    {
                        type: "IsMerge",
                        name: "合并线索"
                    },
                    {
                        type: "labelUser",
                        name: "关联标签"
                    },
                    {
                        type: "CommuKeywords",
                        name: "沟通内容"
                    },
                    {
                        type: "ClueTurnTime",
                        name: "流转时间"
                    },
                    {
                        type: "clueturnUser",
                        name: "流转给"
                    },
                    {
                        type: "preturnUser",
                        name: "前任所属人"
                    },
                    {
                        type: "EnrollmentYear",
                        name: "入学年份"
                    }
                ],
                isRemove: true,
                rules: {
                    viewpageid: [{required: true, message: " ", trigger: "change"}],
                    viewname: [{required: true, message: " ", trigger: "blur"}]
                }
            };
        },
        watch: {
            cluesRowData(data) {
                if (data.length > 1) {
                    this.removeIcon1 = true;
                } else {
                    this.removeIcon1 = false;
                }
            },
            ruleOutData(data) {
                if (data.length > 1) {
                    this.removeIcon2 = true;
                } else {
                    this.removeIcon2 = false;
                }
            }
        },
        methods: {
            rowVisible() {
                this.disabledData();
            },
            disabledData() {
                for (let j = 0; j < this.cluesType.length; j++) {
                    this.cluesType[j].disabled = false;
                }
                for (let j = 0; j < this.cluesRowData.length; j++) {
                    for (let i = 0; i < this.cluesType.length; i++) {
                        if (this.cluesType[i].type == this.cluesRowData[j].type) {
                            this.cluesType[i].disabled = true;
                        }
                    }
                }
            },
            onRowType(index, data) {
                this.disabledData();
                if (data && this.isRemove) {
                    this.cluesRowData[index].value = [];
                }
            },
            onCoalescing() {
                // 合并
                this.isCoalesCing = true;
                this.addIcon1 = false;
            },
            addClick() {
                // 添加
                this.cluesRowData.push({
                    type: "",
                    value: [],
                    values: ""
                });
            },
            onSaveRow(form) {
                // 保存
                this.$refs[form].validate(valid => {
                    if (valid) {
                        for (let i = 0; i < this.cluesRowData.length; i++) {
                            let type = this.cluesRowData[i].type;
                            if (type == "") {
                                this.$message({
                                    type: "warning",
                                    message: "列名不能为空"
                                });
                                return;
                            }
                            if (this.cluesRowData[i].value !== undefined && type.indexOf("Time") > -1) {
                                this.cluesRowData[i].value[0] = format(this.cluesRowData[i].value[0]);
                                this.cluesRowData[i].value[1] = format(this.cluesRowData[i].value[1]);
                            }
                            if (this.cluesRowData[i].values !== undefined && type == 'EnrollmentYear') {
                                this.cluesRowData[i].values = format(this.cluesRowData[i].values);
                            }
                        }
                        const {viewpageid, viewname, viewnote} = this.ruleForm;
                        let parms = {
                            viewpageid,
                            viewname,
                            viewnote,
                            viewjson: JSON.stringify(this.cluesRowData),
                            id: this.$route.query.id || 0
                        };
                        this.bntLoading = true;
                        AddDefinitionViewInfo(parms).then(ret => {
                            this.bntLoading = false;
                            if (ret.status === 0) {
                                this.$message({
                                    message: ret.info,
                                    type: "success"
                                });
                            } else {
                                this.$message({
                                    message: ret.info,
                                    type: "warning"
                                });
                            }
                        });
                    }
                });
            },
            removeRowCoales(index) {
                // 删除
                if (this.cluesRowData.length > 1) {
                    this.cluesRowData.splice(index, 1);
                    this.isRemove = false;
                    this.disabledData();
                }
            },
            changeProvice(index, val) {
                this.cluesRowData[index].value = val;
                this.cluesRowData[index].values = '';
                this.ProvinceId = [];
                this.OptionCity = [];
                if (this.cluesRowData[index].type == 'city' && this.cluesRowData[index].value.length) {
                    this.getCityData(val);
                }
            },

            handleSelect(item) {
                for (let i = 0; i < this.cluesRowData.length; i++) {
                    if (this.cluesRowData[i].type == "SchoolName") {
                        this.cluesRowData[i].values = item.Id;
                    }
                }
            },
            createStateFilter(queryString) {
                return restaurant => {
                    return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
                };
            },
            querySearchAsync(queryString, cb) {
                // 模糊搜索学校
                if (queryString.length > 1) {
                    getValueSchools({name: queryString}).then(ret => {
                        if (ret.status === 0) {
                            let restaurants = ret.result;
                            let results = queryString
                                ? restaurants.filter(this.createStateFilter(queryString))
                                : restaurants;
                            cb(results);
                        }
                    });
                }
            },

            createTree(val, index) {
                // 创建人
                this.cluesRowData[index].value = val;
            },
            sourceChannelTree(val, index) {
                // 来源渠道
                this.cluesRowData[index].value = val;
            },
            FirstChannelCodeTree(val, index) {
                // 首次来源渠道
                this.cluesRowData[index].value = val;
            },
            marketingTree(val, index) {
                // 营销计划
                this.cluesRowData[index].value = val;
            },
            labelTree(val, index) {
                // 标签
                this.cluesRowData[index].value = val;
            },
            getCityData(areaId) {
                getProviceOrCity({areaId}).then(ret => { // 获取城市
                    if (ret.status === 0) {
                        this.OptionCity = ret.result;
                    }
                });
            }
        },
        created() {
            if (this.$route.query.id) {
                this.cluesRowData = [];
                this.loadingMsg.loading = true;
                GetDefinitionViewInfoByID({id: this.$route.query.id}).then(ret => {
                    this.loadingMsg.loading = false;
                    if (ret.status === 0) {
                        let data = JSON.parse(ret.result.viewjson);
                        this.cluesRowData = data;
                        this.ruleForm.viewpageid = ret.result.viewpageid.toString();
                        this.ruleForm.viewname = ret.result.viewname;
                        this.ruleForm.viewnote = ret.result.viewnote;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].type == 'city' && data[i].value.length) {
                                this.getCityData(data[i].value);
                            }
                        }
                        this.disabledData();
                    }
                });
            }
            GetDictionaryByTypeId({dicType: 10055}).then(ret => {
                if (ret.status === 0) {
                    this.pageType = ret.result;
                }
            });

            let userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
            let proviceId = {
                areaId: "00000000-0000-0000-0000-000000000000"
            };
            getProviceOrCity(proviceId).then(ret => {
                // 省份接口
                if (ret.status === 0) {
                    this.Optionprovice = ret.result;
                }
            });
            if (this.ProvinceId) {
               this.getCityData(this.ProvinceId);
            }

            GetAllowedUserTree({userId: userInfo.UserId}).then(ret => {
                // 人员树接口
                if (ret.status === 0) {
                    this.createData = ret.result;
                }
            });
            GetCustomerSourceTree().then(ret => {
                // 客户来源接口
                if (ret.status === 0) {
                    this.sourceData = ret.result;
                }
            });
            GetSourceDetailsTree().then(ret => {
                // 营销计划
                if (ret.status === 0) {
                    this.marketingData = ret.result;
                }
            });
            getchannels().then(ret => {
                // 渠道接口
                if (ret.status === 0) {
                    this.channelData = ret.result;
                }
            });
            GetLabelList().then(ret => {
                // 标签接口
                if (ret.status === 0) {
                    this.labelData = ret.result;
                }
            });
            intentionDegree().then(ret => {
                // 客户意向接口
                if (ret.status === 0) {
                    this.degreeData = ret.result;
                }
            });
            interestedProject().then(ret => {
                // 感兴趣的项目接口
                if (ret.status === 0) {
                    this.interestedData = ret.result;
                }
            });
            GetDictionaryByTypeId({dicType: 10044}).then(ret => {
                // 客户沟通紧急度
                if (ret.status === 0) {
                    this.getUrgencyData = ret.result;
                }
            });
            OptimalCluesType().then(ret => {
                // 优质线索接口
                if (ret.status === 0) {
                    this.optimalCluesData = ret.result;
                }
            });
            GetClueStatusTree().then(ret => {
                // 线索状态接口
                if (ret.status === 0) {
                    this.cluesStatusData = ret.result;
                }
            });
            professionalStatus().then(ret => {
                // 职业状态
                if (ret.status === 0) {
                    this.professionalData = ret.result;
                }
            });
        }
    };
</script>
<style type="text/css" scoped="scoped">
    .el-icon-plus {
        color: #49a1f6;
        float: right;
    }
</style>
<style>
    .setting-addview .g-extend-ztree-area {
        position: relative;
    }
</style>
