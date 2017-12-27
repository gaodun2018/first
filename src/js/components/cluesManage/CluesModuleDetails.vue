<template>
    <div style="margin: 0 20px" class="clues-details-style">
        <el-row>
            <loading :loadingMsg="loadingMsg"></loading>
            <el-col :sm="19">
                <el-form>
                    <div v-loading.body="Loading" class="clues-details-content">
                        <el-row :sm="24" class="details-contact-content">
                            <div class="details-contact">
                                <div class="details-contact-row">
                                    <el-row class="details-personal-user">
                                        <el-col :sm="3" class="details-personal">
                                            <div class="personal-photo">
                                                <img src="../../../images/poto.png">
                                            </div>
                                        </el-col>
                                        <el-col :sm="21">
                                            <div class="personal-name" v-if="ClueDetailData.CustomInfo">
                                                <span>
                                                    <i :class="(ClueDetailData.CustomInfo.Gender === 2) ? 'personal-gender-woman' : 'personal-gender-man'"></i>
                                                    <span style="font-size: 18px; color: #2d2d2d">{{ClueDetailData.CustomInfo.TrueName}}</span>
                                                </span>
                                                <!-- <span style="position: relative; top: -2px">
                                                    <span class="sales-promotion-activity">双十一大促</span>
                                                    <span class="sales-promotion-activity">818抢红包</span>
                                                </span> -->
                                            </div>
                                            <div class="personal-time-No" style="font-size: 12px" v-if="ClueDetailData.CustomInfo">
                                                <span style="padding-right: 10px">No:
                                                    <span>{{ClueDetailData.CustomInfo.CustomNo}}</span>
                                                </span>
                                                <i></i>
                                                <span style="padding-left: 10px">
                                                    <span>上次沟通是时间 ：</span>
                                                    <span>{{ClueDetailData.CourseInfo.LastCommucinateTime}}</span>
                                                </span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div style="padding: 10px 15px 20px 18px">
                                    <el-row :sm="24" style="padding-bottom: 15px">
                                        <el-col :sm="6">
                                            <div class="details-contact-item">
                                                <span class="details-contact-icon phone-icon">手机 ：</span>
                                                <a style="color:#414852" href="javascript:;">
                                                    <span>{{ClueDetailData.PersonalContacts && ClueDetailData.PersonalContacts.Mobile}}</span>
                                                </a>
                                            </div>
                                        </el-col>
                                        <el-col :sm="6">
                                            <div class="details-contact-item">
                                                <span class="details-contact-icon foreign-icon">国际电话 ：</span>
                                                <a style="color:#414852" href="javascript:;">
                                                    <span>{{ClueDetailData.PersonalContacts && ClueDetailData.PersonalContacts.PhoneAbroad}}</span>
                                                </a>
                                            </div>
                                        </el-col>
                                        <el-col :sm="5">
                                            <div class="details-contact-item">
                                                <span class="details-contact-icon qq-icon">QQ ：</span>
                                                <span style="color:#414852" v-if="ClueDetailData.PersonalContacts && ClueDetailData.PersonalContacts.QQ">{{ClueDetailData.PersonalContacts.QQ}}</span>
                                            </div>
                                        </el-col>
                                        <el-col :sm="7">
                                            <div class="details-contact-item" style="margin-left: 22px">
                                                <span style="margin-left: -2px; padding-left: 20px; background-position: 0px 2px;" class="details-contact-icon email-icon">邮箱 ：</span>
                                                <span style="color:#414852" v-if="ClueDetailData.PersonalContacts">{{ClueDetailData.PersonalContacts.PersonalEmail}}</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :sm="6">
                                            <div class="details-contact-item">
                                                <span style="padding-left: 23px" class="details-contact-icon weChat-icon">微信 ：</span>
                                                <span style="color:#414852" v-if="ClueDetailData.PersonalContacts && ClueDetailData.PersonalContacts.WeChat">{{ClueDetailData.PersonalContacts.WeChat}}</span>
                                            </div>
                                        </el-col>
                                        <el-col :sm="6">
                                            <div class="details-contact-item">
                                                <span style="padding-left: 23px" class="details-contact-icon address-icon">所在地 ：</span>
                                                <span style="color:#414852" v-if="ClueDetailData.CustomInfo">{{ClueDetailData.CustomInfo.Province}}-{{ClueDetailData.CustomInfo.City}}</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-row>
                        <el-row class="details-information-content" style="padding-bottom: 10px">
                            <div class="add-server tracking-relevance">
                                <p class="tracking-clues-information" style="display: inline-block;margin-left: 15px">联系人信息</p>
                                <ul id="contactItem" style="position: relative;display: inline-block; margin-left: 35px">
                                    <li style="margin-right: 30px;display: inline-block" v-for="(item, index) in ClueDetailData.RelationContacts" :key="item.ContactGuid" @click="onShowContact(index)">
                                        <a style="color: #42aedf;text-decoration: underline" href="javascript:void(0)">{{item.ContactName}}</a>
                                    </li>
                                </ul>
                                <div v-show="showContact" id="clues-details-contact" class="clues-tracking-tip clues-tracking-addContact">
                                    <div>
                                        <el-row v-for="item in addContactItem" :key="item.name" style="margin-bottom: 10px">
                                            <el-col>
                                                <div>
                                                    <span class="add-contact-lable">{{item.name}}</span>
                                                    <el-input :disabled="true" v-model="relationData[item.value]" style="width: 135px" size='mini'></el-input>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                            </div>
                        </el-row>
                        <el-row class="details-information-content course-information">
                            <p class="details-contact-information">课程信息</p>
                            <div style="margin-left: 42px">
                                <el-col :sm="8" v-for="(item, index) in courseItem" :key="index" class="course-col-border">
                                    <el-row v-for="items in courseItem[index].list" :key="items">
                                        <div class="course-item">
                                            <span :style="{'width': items.wh}">{{items.title}}
                                                <span style="float: right">:</span>
                                            </span>
                                            <span v-if="ClueDetailData.CourseInfo" class="tracking-text-font">{{ClueDetailData.CourseInfo[items.value] || ClueDetailData.EmergencyContact[items.value] || ClueDetailData.CustomInfo[items.value]}}</span>
                                        </div>
                                    </el-row>
                                </el-col>
                            </div>
                        </el-row>
                        <el-row style="display: flex">
                            <el-col v-for="item in basicItem" :key="item.span" :sm="item.span" class="details-information-content">
                                <div>
                                    <p class="details-contact-information">{{item.title}}</p>
                                    <el-col v-for="items in item.list" :key="items.span" :sm="12" class="details-basic">
                                        <div class="course-information">
                                            <el-row v-for="(list, index) in items.types" :key="index">
                                                <div class="course-item">
                                                    <span :style="{'width': list.wh}">
                                                        {{list.name}}
                                                    </span>
                                                    <span v-if="ClueDetailData" class="tracking-text-font">{{list.values ? ((ClueDetailData.CustomInfo && ClueDetailData.CustomInfo[list.value])+'-'+(ClueDetailData.CustomInfo && ClueDetailData.CustomInfo[list.values])) : ((ClueDetailData.CustomInfo && ClueDetailData.CustomInfo[list.value]) || (ClueDetailData.CompanyInfo && ClueDetailData.CompanyInfo[list.value]))}}</span>
                                                </div>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </el-col>
            <el-col :sm="5">
                <Tracking-record></Tracking-record>
            </el-col>
        </el-row>
        <el-row class="clues-details-table" style="display: flex; margin:0 -20px 20px 0">
            <el-col class="details-information-content" :sm="10">
                <div>
                    <p class="details-contact-information">重复咨询</p>
                    <el-col :sm="12" class="details-basic repeated-consulting">
                        <el-table :data="repeateConsult" border style="width: 100%">
                            <el-table-column align="center" prop="ConsultTime" label="重复咨询时间" width="80px">
                            </el-table-column>
                            <el-table-column align="center" prop="ConsultUser" label="重复咨询人">
                            </el-table-column>
                            <el-table-column align="center" prop="ConsultChannel" label="重复咨询渠道">
                            </el-table-column>
                            <el-table-column align="center" label="咨询内容">
                                <template scope="scope">
                                    <div :title="scope.row.ConsultContent">{{scope.row.ConsultContent}}</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </div>
            </el-col>
            <el-col class="details-information-content" :sm="14">
                <div>
                    <p class="details-contact-information">共享查询</p>
                    <el-col :sm="12" class="details-basic repeated-consulting">
                        <el-table :data="rearchShareClue.OtherClues" border style="width: 100%">
                            <el-table-column align="center" prop="ClueNo" label="线索ID">
                            </el-table-column>
                            <el-table-column align="center" prop="ClueOwner" label="线索所属人">
                            </el-table-column>
                            <el-table-column align="center" prop="CourseType" label="线索所属项目">
                            </el-table-column>
                            <el-table-column align="center" prop="ClueStatus" label="线索状态">
                            </el-table-column>
                            <el-table-column align="center" prop="LastCommunicateTime" label="最后沟通时间">
                            </el-table-column>
                        </el-table>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>
#clues-details-contact.clues-tracking-addContact {
  left: 3px;
  top: 55px;
  -webkit-transition: all 0.1s ease-in;
  -moz-transition: all 0.1s ease-in;
  transition: all 0.1s ease-in;
  transition: all 0.1s ease-in;
}

.clues-tracking-tip.clues-tracking-addContact .el-form-item {
  margin-bottom: 0;
}

.details-information-content table tbody {
  font-size: 12px;
  color: #8f9aac;
}

.clues-details-style .el-table .cell,
.clues-details-style .el-table th > div {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 20px;
  white-space: normal;
  word-break: break-all;
  font-size: 12px;
  padding: 5px;
}

.details-information-content table thead tr th .cell {
  padding: 0 5px;
  font-size: 12px;
}

.tracking-record-overflow .el-collapse-item__header {
  text-align: center;
}

.trancking-personal-user {
  width: 100px;
  margin: 0 auto;
  height: 160px;
  border: 1px solid #ccc;
  padding-top: 24px;
}

.clues-details-style .el-row-border {
  border-bottom: 3px solid #fafafa;
  border-top: 3px solid #fafafa;
  padding: 10px 0;
  margin-bottom: 10px;
}

.clues-details-style .el-form-item .el-form-item__label {
  color: #8f9aac;
}

.isShowContact {
  display: black;
}

.isHideContact {
  display: none;
}

.clues-details-style
  .details-emergency-contact-conten
  .isShowContact
  .el-col
  .el-form-item {
  margin-bottom: 0;
}
.clues-details-style
  .el-col-form
  .el-row
  .el-tabs.el-tabs--border-card
  .el-tabs__header
  .el-tabs__new-tab {
  margin: 12px 30px 9px 10px;
}
</style>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { basicItem, courseItem, addContactItem } from "../common/cluesConfig";
import TrackingRecord from "./TrackingModuleRecord.vue";
import loading from "../../containers/loading.vue";
import {
  ClueDetail,
  RepeateConsult,
  ClueTurnRecords,
  SearchShareClue
} from "../../api/cluesManage";

export default {
  name: "clues-details",
  props: ["propData"],
  components: {
    TrackingRecord,
    loading
  },
  data() {
    return {
      loadingMsg: {
        title: "",
        loading: false
      },
      addContactItem,
      consultingList: [],
      relationData: {},
      courseItem,
      basicItem,
      ClueDetailData: [], // 线索详情信息
      repeateConsult: [], // 重复咨询
      rearchShareClue: [], // 共享线索
      isAddContact: true,
      showContact: false,
      schoolsData: [], // 学校
      areaData: [], // 所在地
      areaProps: {
        value: "IdentityGuid",
        label: "Name",
        children: "Childs"
      },
      cluesInfo: {},
      Intention: "",
      Major: "",
      ClueSource: "",
      professionalStatusData: [], // 职业状态
      intentionDegreeData: [], // 意向度
      cluesStatusData: [], // 线索状态
      contactsData: [], // 联系人信息
      intentionsRadio: "", // 客户意向度
      rData: [],
      selectedArea: [],
      getContactsData: {},
      isContact: true,
      isContacts: false
    };
  },

  methods: {
    onShowContact(index) {
      // 显示修改关联客户
      this.showContact = !this.showContact;
      this.relationData = this.ClueDetailData.RelationContacts[index];
      const mdifyContact = document.getElementById("clues-details-contact");
      const contactItem = document.getElementById("contactItem");
      const contactItemLi = contactItem.getElementsByTagName("li")[index];
      const itemWidth = contactItemLi.getElementsByTagName("a")[0].offsetWidth;
      const itemLeft = contactItemLi.offsetLeft;
      mdifyContact.style.left = itemLeft + itemWidth / 2 + 15 + "px";
    },
    onContact(val) {
      // 紧急联系人
      let _contactId = document.getElementById("contactId");
      let _contact = _contactId.getElementsByTagName("p");
      for (let i = 0; i < _contact.length; i++) {
        if (_contact[i] === _contact[val]) {
          _contact[i].className = "contact-item contact-active";
        } else {
          _contact[i].className = "contact-item";
        }
      }
      if (val === 0) {
        this.isContact = true;
        this.isContacts = false;
      } else {
        this.isContact = false;
        this.isContacts = true;
        this.getContactsData = this.r[val - 1];
      }
    },
    getDetailsInfo() {
      const { Guid, CustomGuid } = this.$route.query;
      this.loadingMsg.loading = true;
      ClueDetail({ clueId: Guid })
        .then(ret => {
          // 线索详情
          if (ret.status === 0) {
            this.loadingMsg.loading = false;
            this.ClueDetailData = ret.result || [];
          } else {
            this.loadingMsg.loading = false;
          }
        })
        .catch(() => {
          this.loadingMsg.loading = false;
        });
      RepeateConsult({ clueId: Guid }).then(ret => {
        // 线索详情 => 重复咨询
        if (ret.status === 0) {
          this.repeateConsult = ret.result;
        }
      });
      SearchShareClue({ customId: CustomGuid }).then(ret => {
        // 共享查询
        if (ret.status === 0) {
          this.rearchShareClue = ret.result;
        }
      });
    }
  },
  created() {
      this.getDetailsInfo();
  }
};
</script>
