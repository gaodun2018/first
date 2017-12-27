<template>
    <div class="module-clues-content sales-tracking">
        <div>
            <el-row style="height: 30px;line-height: 30px">
                <el-col :span="12">
                    <div style="font-size: 14px;color: #666">
                        <el-radio-group v-model="cluesType" @change="onCluesType">
                            <el-radio style="color: #666" label="1000033">一类线索</el-radio>
                            <el-radio style="color: #666;margin-left: 25px" label="1000034">二类线索</el-radio>
                            <el-radio style="color: #666;margin-left: 25px" label="1001061">紧急线索</el-radio>
                        </el-radio-group>
                        <span style="margin-left: 25px">未跟进：
                            <span style="color: #f89f7a; font-size: 12px">{{TodaysTaskCount}}</span>
                        </span>
                        <!-- <span style="margin-left: 25px">跟进总数：
                                                    <span style="color: #f89f7a; font-size: 12px">{{cluesType === '1000033' ? cluesCountOne.ClueFollowCount : cluesCountTwo.ClueFollowCount}}</span>
                                                </span> -->
                        <span style="margin-left: 25px">已跟进：
                            <span style="color: #f89f7a; font-size: 12px">{{FollowUpingCount}}</span>
                        </span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="clues-search">
                        <div class="clues-search-input" style="top: -3px">
                            <el-input placeholder="线索ID、客户编号、手机、姓名、QQ、微信" v-model="searchValue" size="small" style="width: 300px;font-size: 12px;" @focus="onFocusTypes" @blur="onBlurTypes">
                                <el-button slot="append" icon="search" @click="quickQuerys"></el-button>
                            </el-input>
                            <el-button type="text" class="clues-button-search" @click="onAdvancedSearchs">{{!isSearch ? '高级搜索': '快捷搜索'}}</el-button>
                        </div>
                        <div class="clues-search-selects" style="width: 299px" v-show="isSelects">
                            <ul id="searchTypes">
                                <li @click="onASearchType(0)" style="color: #42aedf">
                                    <span style="display: inline-block; width: 80px">线索ID </span>
                                    <span class="search-type-text"> {{searchValue}}</span>
                                </li>
                                <li @click="onASearchType(1)">
                                    <span style="display: inline-block; width: 80px">客户编号 </span>
                                    <span class="search-type-text">{{searchValue}}</span>
                                </li>
                                <li @click="onASearchType(2)">
                                    <span style="display: inline-block; width: 80px">客户姓名 </span>
                                    <span class="search-type-text">{{searchValue}}</span>
                                </li>
                                <li @click="onASearchType(3)">
                                    <span style="display: inline-block; width: 80px">联系方式 </span>
                                    <span class="search-type-text">{{searchValue}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-collapse-transition>
                <el-form class="clues-conditions" v-if="isSearch" label-width="115px" ref="form" :model="form">
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item prop="ClueOwerGetTime" label="所属人获得时间:">
                                <el-date-picker v-model="form.ClueOwerGetTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 192px;font-size: 12px">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label="线索所属人:">
                                <Tree :width="'193px'" placeholder="请选择所属人" ref="resetCreate" :allSelected="selectChange" :callback="personnelTree"></Tree>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item prop="CourseType" label="感兴趣的项目:">
                                <el-select v-model="form.CourseType" multiple placeholder="请选择" @visible-change="onCourseType" size="small" style="width: 192px;font-size: 12px">
                                    <el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item prop="SaleConnetCountStart" label="销售接通次数:">
                                    <el-input v-model="form.SaleConnetCountStart" size="small" style="width: 89px"></el-input> -
                                    <el-input v-model="form.SaleConnetCountEnd" size="small" style="width: 90px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item prop="RepeatConsultationTime" label="重复咨询时间:">
                                <el-date-picker v-model="form.RepeatConsultationTime" type="daterange" size="small" placeholder="选择时间范围" style="width: 192px;font-size: 12px">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item prop="IntentionGrade" label="客户意向度:">
                                <el-select v-model="form.IntentionGrade" placeholder="请选择" clearable size="small" style="width: 192px;font-size: 12px" @visible-change="onIntentionDegree">
                                    <el-option v-for="intention in intentionDegreeData" :key="intention.Id" :label="intention.Name" :value="intention.Id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item prop="ClueStatus" label="线索状态:">
                                <el-cascader clearable size="small" v-model="form.ClueStatus" :options="getClueStatus" :props="ClueStatusProps" style="width: 192px"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item prop="SaleFailureFollowCountStart" label="销售未跟进天数:">
                                <el-input v-model="form.SaleFailureFollowCountStart" size="small" style="width: 89px"></el-input> -
                                <el-input v-model="form.SaleFailureFollowCountEnd" size="small" style="width: 90px"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item prop="RepeatConsultationCountStart" label="重复咨询次数:">
                                <el-input v-model="form.RepeatConsultationCountStart" size="small" style="width: 89px"></el-input> -
                                <el-input v-model="form.RepeatConsultationCountEnd" size="small" style="width: 90px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="text-align: right;">
                        <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onSubmit">查询</el-button>
                        <el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('form')">清除条件</el-button>
                    </el-row>
                </el-form>
            </el-collapse-transition>
        </div>
        <div class="clues-table">
            <el-table ref="multipleTable" border v-loading="loading" :data="cluesData" :row-class-name="tableRowClassName" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" align="right">
                </el-table-column>
                <el-table-column prop="TrueName" label="联系人姓名" width="140" fixed>
                </el-table-column>
                <el-table-column label="手机" width="140">
                    <template scope="scope">
                        <div @mouseover="callTooltip(scope.$index)">
                            <el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
                                <span @click.stop="showCallTip(0, scope.$index, cluesData)">{{scope.row.MainPhone}}</span>
                            </el-tooltip>
                            <a href="javascript:void(0)" style="margin-left: -4px" v-if="parseInt(scope.row.MainPhone)" @click.stop="callUpPhone(scope.$index, cluesData)">
                                <i class="tracking-phone-icon"></i>
                            </a>
                            <span v-else>--</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="国际电话" width="140">
                    <template scope="scope">
                        <div @mouseover="callTooltip(scope.$index)">
                            <el-tooltip :disabled="!contactDisabled" :content="showContacts" placement="bottom" effect="light">
                                <span @click.stop="showCallTip(1, scope.$index, cluesData)">{{scope.row.ContactsNo}}</span>
                            </el-tooltip>
                            <a href="javascript:void(0)" style="margin-left: -4px" v-if="parseInt(scope.row.ContactsNo) >= 0" @click.stop="callUpContacts(scope.$index, cluesData)">
                                <i class="tracking-phone-icon"></i>
                            </a>
                            <span v-else>--</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="感兴趣项目" width="140">
                    <template scope="scope">
                        <span>{{scope.row.CourseType}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="沟通记录" width="150">
                    <template scope="scope">
                        <span style="height: 48px" class="beyond-hidden-2" :title="scope.row.ClueCommunicateRecord">{{scope.row.ClueCommunicateRecord}}</span>
                    </template>
                </el-table-column>
                <el-table-column v-for="item in cluesSalesTable" :key="item.key" :prop="item.key" :width="item.wh" :label="item.label">
                </el-table-column>
                <el-table-column prop="id" label="线索ID" width="160">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="200" v-if="unlocking(['Sales_Tracking', 'Sales_ Enrol', 'Sales_Details', 'Sales_Audition', 'Sales_Shared'])">
                    <template scope="scope">
                        <el-button v-if="unlocking('Sales_Tracking')" type="text" size="small" class="operation-solid" @click="onClueTracking(scope.$index, cluesData)">
                            跟进
                        </el-button>
                        <el-button v-if="unlocking('Sales_ Enrol')" type="text" size="small" class="operation-solid">
                            <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/create?nid=520&nw=1&Guid=${cluesData[scope.$index].Guid}&CustomGuid=${cluesData[scope.$index].CustomGuid}`]">报名</a>
                        </el-button>
                        <el-button v-if="unlocking('Sales_Details')" type="text" size="small" class="operation-solid">
                            <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/details?nid=520&nw=1&Guid=${cluesData[scope.$index].Guid}&CustomGuid=${cluesData[scope.$index].CustomGuid}`]">详情</a>
                        </el-button>
                        <el-dropdown style="margin-left: 10px" trigger="hover" @command="handleDropdown">
                            <span class="el-dropdown-link" @mouseover="sharedCluesId(scope.$index, cluesData)">
                                更多
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="el-button-padding">
                                <el-dropdown-item command="cluesAudition" v-if="unlocking('Sales_Audition')">
                                    <a style="color: #48576a" target="_blank" @click="MakeLister(scope.$index,scope.row)">预约试听</a>
                                </el-dropdown-item>
                                <el-dropdown-item command="cluesShared" v-if="unlocking('Sales_Shared')">共享查询</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
                </el-table-column>
            </el-table>
            <div class="clues-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                </el-pagination>
            </div>
            <clues-tracking @trackingEmit="trackingEmit" v-show="$store.state.cluesManage.isTracking" ></clues-tracking>
            <div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
        </div>
    </div>
</template>
<style scoped>
    .clues-conditions .el-form-item {
         margin-bottom: 10px;
    }
</style>
<style>
.sales-tracking .el-input__icon.el-icon-date {
  width: 17px;
}

.clues-search-cascader .el-cascader__label {
  line-height: 22px;
}

.sales-tracking .el-input__icon + .el-input__inner {
  padding-right: 15px;
}

.sales-tracking .clues-table .el-pagination {
  text-align: right;
}

.sales-tracking .clues-table .el-checkbox__inner {
  width: 14px;
  height: 14px;
}

.sales-tracking .clues-table .el-checkbox__inner::after {
  width: 2px;
  height: 5px;
  left: 5px;
  position: absolute;
  top: 2px;
}

.sales-tracking .el-dropdown {
  font-size: 12px;
  color: #20a0ff;
}

.sales-tracking .el-button-border {
  padding-right: 5px;
  border-right: 1px solid #20a0ff;
  border-radius: inherit;
}
</style>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { format, getCallUp } from "../../util/util";
import { cluesSalesTable } from "../../components/common/checkData.js";
import {
  GetClueStatusTree,
  ClueVagueSeachList,
  interestedProject,
  intentionDegree,
  OptimalCluesType,
  cluesStatus,
  GeCluFollowSeniorSearchList,
  GetClueFollowCountByClueQualityList,
  ClueFollowVagueSeachList
} from "../../api/cluesManage";
import cluesModal from "vueModal";
import CluesTracking from "./CluesTracking.vue";
import { GetContactByUid } from "../../api/callCenter";
import Tree from "../../containers/Tree.vue";
export default {
  name: "clues-sales-tracking",
  props: ["self"],
  components: { CluesTracking, Tree },
  data() {
    return {
      sharedGuid:'',
      sharedCustomGuid: '',
      currIndex: -1,
      phoneDisabled: false,
      showPhone: "号码读取中",
      contactDisabled: false,
      showContacts: "号码读取中",
      objParams: {},
      cluesType: "1000033",
      defaultKeys: "",
      FollowUpingCount: 0,
      TodaysTaskCount: 0,
      searchType: 0,
      cluesCountOne: {
        ClueFollowCount: 0,
        FollowUpingCount: 0,
        TodaysTaskCount: 0
      },
      cluesCountTwo: {
        ClueFollowCount: 0,
        FollowUpingCount: 0,
        TodaysTaskCount: 0
      },
      emergencyCount: {
        ClueFollowCount: 0,
        FollowUpingCount: 0,
        TodaysTaskCount: 0
      },
      defaultProps: {
        children: "ChildrenList",
        label: "Name"
      },
      channelsProps: {
        value: "Id",
        label: "Name",
        children: "ChildChannel"
      },
      ClueOwner: [], // 所属人
      cluesData: [], // 线索列表数据
      cluesGuid: [], // 获取Guid
      chooseGuid: "", // 高亮显示
      SeachType: 1,
      getClueStatus: [], // 线索状态
      ClueStatusProps: {
        value: "Id",
        label: "Name",
        children: "ChildrenList"
      },
      isTracking: false, // 跟进页面
      loading: false,
      isSearch: false,
      isSelects: false,
      searchValue: "",
      cluesSalesTable,
      cluesTotal: 0,
      pageSize: 10,
      custonDate: [],
      currentPage: 1,
      intentionDegreeData: [],
      interestedProject: [],
      optimalCluesType: [],
      cluesStatusData: [],
      form: {
        ClueOwerGetTime: "",
        ClueStatus: [],
        IntentionGrade: "",
        CourseType: "",
        ClueQuality: "",
        SaleConnetCountStart: "",
        SaleConnetCountEnd: "",
        RepeatConsultationTime: "",
        SaleFailureFollowCountStart: "",
        SaleFailureFollowCountEnd: "",
        RepeatConsultationCountStart: "",
        RepeatConsultationCountEnd: "",
        ClueOwners: []
      },
      multipleSelection: []
    };
  },
  methods: {
    trackingEmit(emit) {
           if (emit) {
               this.handleCurrentChange(1);
           };
        },
    onReset(formName) { // 重置
          this.$refs[formName].resetFields();
          this.$refs.resetCreate.$emit('resetTree');
          this.form.SaleConnetCountEnd = '';
          this.form.SaleFailureFollowCountEnd = '';
          this.form.RepeatConsultationCountEnd = '';
      },
    tableRowClassName(row, index) {
      // 选中列表行高亮显示
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (row.Guid === this.multipleSelection[i].Guid) {
          return "positive-row";
        }
      }
      if (row.Guid === this.$store.state.cluesManage.cluesHighligheted) {
        return "positive-row";
      }
      return "";
    },
    personnelTree(val) {
      // 人员树
      this.form.ClueOwners = val;
    },
    selectChange() {},
    callTooltip(index) {
      // 显示电话明文
      if (index != this.currIndex) {
        this.currIndex = index;
        this.phoneDisabled = false;
        this.contactDisabled = false;
      }
    },
    showCallTip(type, index, rows) {
      // 显示电话号码
      if (
        ((type == 0 && rows[index].MainPhone.indexOf("*") > -1) ||
          (type == 1 && rows[index].ContactsNo.indexOf("*") > -1)) &&
        this.unlocking("Show_Customer_Phone_ Clear")
      ) {
        GetContactByUid({
          phoneType: type,
          Uid: rows[index].Uid,
          mobile: type == 0 ? rows[index].MainPhone : rows[index].ContactsNo
        }).then(ret => {
          if (ret.status === 0) {
            if (type === 0) {
              this.phoneDisabled = true;
              this.showPhone = ret.result || "号码有误";
            } else if (type === 1) {
              this.contactDisabled = true;
              this.showContacts = ret.result || "号码有误";
            }
          }
        });
      }
    },
    callUpPhone(index, rows) {
      //拨打电话
      getCallUp(
        this,
        rows[index].Uid,
        rows[index].MainPhone,
        0,
        rows[index].CustomGuid,
        rows[index].Guid
      );
      this.$store.dispatch("cluesHighligheted", rows[index].Guid);
    },
    callUpContacts(index, rows) {
      //拨打国际电话
      getCallUp(
        this,
        rows[index].Uid,
        rows[index].ContactsNo,
        1,
        rows[index].CustomGuid,
        rows[index].Guid
      );
      this.$store.dispatch("cluesHighligheted", rows[index].Guid);
    },

    async onCourseType(even) {
      // 感兴趣的项目接口
      if (even) {
        interestedProject().then(ret => {
          if (ret.status === 0) {
            this.interestedProject = ret.result;
          }
        });
      }
    },
    async onIntentionDegree(even) {
      // 客户意向接口
      if (even) {
        intentionDegree().then(ret => {
          if (ret.status === 0) {
            this.intentionDegreeData = ret.result;
          }
        });
      }
    },
    async onOptimalClues(even) {
      // 优质线索接口
      if (even) {
        OptimalCluesType().then(ret => {
          if (ret.status === 0) {
            this.optimalCluesType = ret.result;
          }
        });
      }
    },
    async onCluesStatus() {
      // 线索状态接口
      cluesStatus().then(ret => {
        if (ret.status === 0) {
          this.cluesStatusData = ret.result;
        }
      });
    },
    async quickQuerys() {
      // 模糊搜索
      this.currentPage = 1;
      let params = {
        Where: {
          SearchKeys: this.searchValue,
          ClueQuality: this.cluesType,
          SeachType: this.SeachType,
          ClueOwner: []
        },
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      };
      this.ClueFollowVagueSeachList(params);
    },
    onASearchType(type) {
      // 模糊搜索选择类
      this.SeachType = type + 1;
      let searchType = document.getElementById("searchTypes");
      let typeId = searchType.getElementsByTagName("li");
      for (let i = 0; i < typeId.length; i++) {
        if (typeId[i] === typeId[type]) {
          typeId[i].style.color = "#42aedf";
        } else {
          typeId[i].style.color = "#48576a";
        }
      }
    },
    onFocusTypes() {
      // 模糊搜索框获取焦点显示线索类型选择框
      this.isSelects = true;
    },
    onBlurTypes() {
      // 隐藏线索类型选择框
      const self = this;
      setTimeout(function() {
        self.isSelects = false;
      }, 500);
    },
    onCluesType(type) {
      //类线索查询
      this.searchType = 0;
      if (type == "1000033") {
        this.FollowUpingCount = this.cluesCountOne.FollowUpingCount;
        this.TodaysTaskCount = this.cluesCountOne.TodaysTaskCount;
      } else if (type == "1000034") {
        this.FollowUpingCount = this.cluesCountTwo.FollowUpingCount;
        this.TodaysTaskCount = this.cluesCountTwo.TodaysTaskCount;
      } else if (type == "1001061") {
        this.FollowUpingCount = this.emergencyCount.FollowUpingCount;
        this.TodaysTaskCount = this.emergencyCount.TodaysTaskCount;
      }
      this.currentPage = 1;
      let params = {
        Where: {
          SearchKeys: this.searchValue,
          ClueQuality: type,
          ClueOwner: []
        },
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      };
      this.ClueFollowVagueSeachList(params);
    },
    async ClueFollowVagueSeachList(
      params = {
        Where: {
          SearchKeys: this.searchValue,
          ClueQuality: this.cluesType,
          SeachType: this.SeachType,
          ClueOwner: []
        },
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      }
    ) {
      this.loading = true;
      let ret = await ClueFollowVagueSeachList(params);
      if (ret.status === 0) {
        this.loading = false;
        this.cluesData = ret.result.Body;
        this.cluesTotal = ret.result.Count;
      } else {
        this.loading = false;
      }
    },
    sharedCluesId(index, rows) {
      // 线索详情页获取ID
      let getGuid = {
        Guid: rows[index].Guid,
        CustomGuid: rows[index].CustomGuid
      };
      this.$store.dispatch("cluesSharedGuid", getGuid);

      this.sharedGuid = rows[index].Guid;
      this.sharedCustomGuid = rows[index].CustomGuid;
    },
    handleDropdown(command) {
      // 切换到页面=> 线索共享查询
      if (command == "cluesShared") {
        require.ensure(
          [],
          require => {
            let CluesShared = require("./CluesModalShared.vue");
            cluesModal
              .openComponent(CluesShared, {
                title: "共享查询",
                showCancelButton: false,
                showConfirmButton: false,
                width: "750px",
                self: this,
                Guid: this.sharedGuid,
                CustomGuid: this.sharedCustomGuid,
                callback: (flag, self) => {}
              })
              .then(modal => {});
          },
          "shared"
        );
      } else if (command == "cluesAudition") {
        require.ensure(
          [],
          require => {
            let tabs = {
              Title: "邀约试听",
              nid: "999"
            };
            let Audition = require("./CluesInvitationAudition.vue");
            Vue.component(Audition.name, Audition);
            tabs.content = Audition.name;
            this.$store.dispatch("addTabs", tabs);
          },
          "audition"
        );
      }
    },
    MakeLister(index, row) {
            require.ensure([], (require) => {
                let AddContent = require("./CluesModalinvitation.vue");
                cluesModal.openComponent(AddContent, {
                    title: '创建邀约',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '500px',
                    self: this,
                    contactsData: { Guid: row.CustomGuid, Mobile: row.MainPhone, TrueName: row.TrueName }, //联系人信息
                    cluesLine: { CourseType: row.CourseTypeID, Guid: row.Guid } // 线索信息
                });
            }, 'createvitation');
        },
    hideTracking(flag) {
      // 隐藏跟进页面的弹层
      this.isTracking = flag;
      this.chooseGuid = "";
      document.body.style.overflow = "auto";
    },
    onClueTracking(index, rows) {
      // 线索跟进
      let trackingGuid = {
        CustomGuid: rows[index].CustomGuid,
        Guid: rows[index].Guid,
        Uid: rows[index].Uid
      };
      this.$store.dispatch("cluesHighligheted", trackingGuid.Guid);
      this.$store.dispatch("isTracking", true);
      this.$store.dispatch("getTrackingIds", trackingGuid);
    },
    onAdvancedSearchs() {
      // 高级搜索折叠
      this.searchType = 0;
      this.isSearch = !this.isSearch;
    },
    handleSelectionChange(guid) {
      this.cluesGuid = [];
      guid.map((item, index) => {
        this.cluesGuid.push(item.Guid);
      });
      this.$store.dispatch("getDistributionGuid", this.cluesGuid);
      this.multipleSelection = guid;
    },
    onSubmit() {
      // 线索高级搜索
      this.searchType = 1;
      const {
        ClueOwerGetTime,
        ClueStatus,
        IntentionGrade,
        CourseType,
        ClueQuality,
        SaleConnetCountStart,
        SaleConnetCountEnd,
        RepeatConsultationTime,
        SaleFailureFollowCountStart,
        SaleFailureFollowCountEnd,
        RepeatConsultationCountStart,
        RepeatConsultationCountEnd,
        ClueOwners
      } = this.form;
      this.currentPage = 1;
      this.objParams = {
        Where: {
          ClueOwerStartGetTime: format(ClueOwerGetTime[0]),
          ClueOwerEndGetTime: format(ClueOwerGetTime[1]),
          ClueQuality,
          CourseType,
          SaleConnetCountStart,
          SaleConnetCountEnd,
          RepeatConsultationStartTime: format(RepeatConsultationTime[0]),
          RepeatConsultationEndTime: format(RepeatConsultationTime[1]),
          ClueStatus: ClueStatus[ClueStatus.length - 1],
          IntentionGrade,
          SaleFailureFollowCountStart,
          SaleFailureFollowCountEnd,
          RepeatConsultationCountStart,
          RepeatConsultationCountEnd,
          ClueOwner: ClueOwners,
          CluesType: this.cluesType
        },
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        OrderBy: 3,
        SortCol: 0
      };
      this.getCluleDataList(this.objParams);
    },
    getCluleDataList(objParams) {
      // 线索列表查询接口
      this.loading = true;
      GeCluFollowSeniorSearchList(objParams)
        .then(ret => {
          if (ret.status === 0) {
            this.loading = false;
            this.cluesTotal = ret.result.Count;
            this.cluesData = ret.result.Body;
            let getGuid = [];
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      // 分页事件 => 当前页变动
      this.currentPage = val;
      if (this.searchType == 1) {
        this.objParams.PageIndex = this.currentPage;
        this.getCluleDataList(this.objParams);
      } else {
        this.ClueFollowVagueSeachList();
      }
      // this.ClueFollowVagueSeachList(params);
    },
    handleSizeChange(val) {
      // 分页事件 => 处理页码大小
      this.pageSize = val;
      // this.ClueFollowVagueSeachList(params);
      if (this.searchType == 1) {
        this.objParams.PageIndex = this.currentPage;
        this.getCluleDataList(this.objParams);
      } else {
        this.ClueFollowVagueSeachList();
      }
    },
    fetchData() {
      let cType = this.$route.query.clueType;
      if (cType == "1000033" || cType == "1000034" || cType == "1001061") {
        this.cluesType = cType;
      }
      GetClueFollowCountByClueQualityList()
        .then(ret => {
          // 线索总数
          if (ret.status === 0) {
            this.cluesCountOne = ret.result.Acount;
            this.cluesCountTwo = ret.result.Bcount;
            this.emergencyCount = ret.result.EmergencyCount;

            this.FollowUpingCount = this.cluesCountOne.FollowUpingCount;
            this.TodaysTaskCount = this.cluesCountOne.TodaysTaskCount;

            this.onCluesType(this.cluesType);
          }
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapState({
      selectedTable: state => {
        // 显示已选的Table
        return state.home.selectedTable;
      }
    })
  },
  watch: {
    $route: "fetchData"
  },
  mounted: function() {
    let cType = this.$route.query.clueType;
    if (cType == "1000033" || cType == "1000034" || cType == "1001061") {
      this.cluesType = cType;
    }

    GetClueFollowCountByClueQualityList()
      .then(ret => {
        // 线索总数
        if (ret.status === 0) {
          this.cluesCountOne = ret.result.Acount;
          this.cluesCountTwo = ret.result.Bcount;
          this.emergencyCount = ret.result.EmergencyCount;

          this.FollowUpingCount = this.cluesCountOne.FollowUpingCount;
          this.TodaysTaskCount = this.cluesCountOne.TodaysTaskCount;
        }
        this.onCluesType(this.cluesType);
      })
      .catch(() => {
        this.loading = false;
      });
    GetClueStatusTree().then(ret => {
      // 线索状态
      if (ret.status === 0) {
        this.getClueStatus = ret.result;
      }
    });
  }
};
</script>