<template>
    <div style="float: right;width: 100%" class="clues-record-tracking">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item :title="`沟通记录 (${ClueAllCount.GetCommunicateCount || '0'})`" name="1" class="tracking-record-overflow record-communication">
                <div class="tracking-record-communication">
                    <ul v-if="communicationRecord.length">
                        <li v-for="item in communicationRecord" :key="item.ID">
                            <span class="communication-left">
                                <i></i>
                            </span>
                            <div class="communication-right">
                                <div>
                                    <h5 :class="item.IsOtherClue === 1 && 'communication-tag'">[{{item.CommunicatTime}}] {{item.CreateBy}}</h5>
                                    <p style="line-height: 18px">
                                        {{item.CommunicatContent}}
                                    </p>
                                    <div style="padding-top: 5px" v-show="item.CommunicatContent.length > 49">
                                        <el-tooltip placement="top" effect="light">
                                            <div slot="content" class="record-slot-text"> {{item.CommunicatContent}}</div>
                                            <el-button type="text" size="mini">查看更多</el-button>
                                        </el-tooltip>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
                </div>
            </el-collapse-item>
            <el-collapse-item :title="`通话记录 (${ClueAllCount.GetPhoneRecordCount  || '0'})`" name="2" class="tracking-record-overflow record-callRecords">
                <div class="tracking-record-communication">
                    <ul v-if="phoneRecordsData.length">
                        <li style="border-left: 0" v-for="item in phoneRecordsData" :key="item.PhoneDate">
                            <div class="communication-right" style="margin-left: 0">
                                <h5 :class="item.PhoneType === 1 ? 'record-call-huru' : 'record-call-huchu'" class="record-call-huru record-icon-position">[{{item.PhoneDate}}] {{ item.UserName}}</h5>
                                <p style="margin-top: 6px">
                                    <span style="color: #8f9aac">录音时间</span>
                                    <span>{{item.BeginTime}}-{{item.EndTime}}</span>
                                </p>
                                <h5>
                                    <span>录音时长
                                        <span style="color: #42aedf">{{item.Duration}}s</span>
                                    </span>
                                    <span>,通话状态-</span>
                                    <span style="color: #42aedf">{{item.PhoneStatus}}</span>
                                </h5>
                                <div style="padding: 4px 0 0 0">
                                    <a @click="onDownLoad(item.RecordAddress)" href="javascript:void(0)" class="record-download record-icon-position" :style="!item.RecordAddress && 'color: #bfcbd9; cursor: not-allowed'" >下载</a>
                                    <a @click="onPlay(item.RecordAddress)" href="javascript:void(0)" class="record-play record-icon-position" :style="!item.RecordAddress && 'color: #bfcbd9; cursor: not-allowed;'">播放</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
                </div>
            </el-collapse-item>
            <el-collapse-item :title="`试听记录 (${ClueAllCount.GetListenRecordCount  || '0'})`" name="3" class="tracking-record-overflow record-audition">
                <div class="tracking-record-communication">
                    <ul v-if="auditionData.length">
                        <li style="border-left: 0" v-for="audition in auditionData" :key="audition.AppointmentTime">
                            <div class="communication-right" style="margin-left: 0">
                                <p v-for="item in recordsItem" :key="item.name">
                                    <span style="color: #8f9aac">{{item.name}}</span>
                                    <span>{{audition[item.value]}}</span>
                                </p>
                                <div class="record-details">
                                    <a target="_blank" v-bind:href="[`/#/audio/listenInviteManage`]">详情
                                        <i class="el-icon-d-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                     <div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
                </div>
            </el-collapse-item>
            <el-collapse-item :title="`报名记录 (${ClueAllCount.GetOrderRecordCount  || '0'})`" name="4" class="tracking-record-overflow record-sign">
               <div class="tracking-record-communication">
                    <ul v-if="OrderRecord">
                        <li style="border-left: 0" v-for="item in OrderRecord" :key="item.orderNo">
                            <div class="communication-right" style="margin-left: 0">
                                <p>
                                    <span style="color: #8f9aac">订单时间：</span>
                                    <span>{{item.createTime}}</span>
                                </p>
                                <p style="overflow: hidden;">
                                    <span style="color: #8f9aac;float: left">订单产品：</span>
                                    <span class="beyond-hidden" :title="(item.productName).join(',')">{{(item.productName).join(',')}}</span>
                                </p>
                                <p>
                                    <span style="color: #8f9aac">订单金额：</span>
                                    <span v-if="item.sellPrise">{{item.sellPrise}}元</span>
                                </p>
                                <p>
                                    <span style="color: #8f9aac">订单状态：</span>
                                    <span>{{item.orderStatusName}}</span>
                                </p>
                                <p>
                                    <span style="color: #8f9aac">销售人员：</span>
                                    <span>{{item.salerName}}</span>
                                </p>
                                <div class="record-details">
                                    <a target="_blank" v-bind:href="[`/#/order/audit?nid=539&nw=1&OrderNo=${item.orderNo}&isDetails=true`]">详情
                                        <i class="el-icon-d-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="推荐记录 (0)" name="5" class="tracking-record-overflow record-recommended">
                <div class="tracking-record-communication">
                    <!-- <ul v-if="recommendedItem">
                        <li style="border-left: 0" v-for="audition in recommendedItem" :key="audition.AppointmentTime">
                            <div class="communication-right" style="margin-left: 0">
                                <p v-for="item in recommendedItem" :key="item.name">
                                    <span style="color: #8f9aac">{{item.name}}</span>
                                    <span>{{audition[item.value]}}</span>
                                </p>
                            </div>
                            <div class="record-recommended-yellow ">
                                <p>
                                    <span style="color: #8f9aac">被推荐时间 ：</span>
                                    <span>2017-03-12 10:10</span>
                                </p>
                                <p>
                                    <span style="color: #8f9aac">推荐人 ：</span>
                                    <span>张三</span>
                                </p>
                            </div>
                        </li>
                    </ul> -->
                    <div style="text-align: center; font-size: 14px" >暂无数据</div>
                </div>
            </el-collapse-item>
            <el-collapse-item :title="`流转记录 (${ClueAllCount.GetClueTurnRecordCount  || '0'})`" name="6" class="tracking-record-overflow record-circulation">
                <div class="tracking-record-communication">
                    <ul v-if="clueTurnRecordsData.length">
                        <li v-for="item in clueTurnRecordsData" :key="item.ID">
                            <span class="communication-left">
                                <i></i>
                            </span>
                            <div class="communication-right">
                                <div>
                                    <h5>{{item.CreateTime}}</h5>
                                    <h5 style="margin-top: -4px">{{item.CurrentUser}}</h5>
                                    <p>操作人 ：{{item.CreateBy}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<style>
.clues-record-tracking .el-collapse-item__header {
  padding-left: 0;
}
.tracking-record-overflow .el-collapse-item__content {
  padding: 10px;
}

.el-collapse .is-active > .el-collapse-item__header {
  background: #42aedf;
  color: #fff;
}

.tracking-record-overflow .el-collapse-item__wrap {
  /*max-height: 360px;
    min-height: 200px;*/
  height: 360px;
  overflow-y: scroll;
  background: #fafafa;
}
.record-slot-text {
  color: #8f9aac;
  width: 300px;
  line-height: 18px;
  max-height: 350px;
  overflow-y: scroll;
  font-size: 12px;
  font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi,
    sans-serif;
}
.record-details {
  text-align: right;
  font-size: 12px;
  padding-bottom: 0 !important;
}

.record-details a {
  color: #42aedf;
}
</style>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { recordsItem, recommendedItem } from "../common/trackingRecord";
import cluesModal from "vueModal";
import {
  GetCommunicateRecords,
  ListenInvitationRecords,
  ClueTurnRecords,
  getPhoneRecords,
  GetOrderRecord,
  GetClueAllCount
} from "../../api/cluesManage";

export default {
  props: ["propData", "cluesIds"],
  data() {
    return {
      activeName: "1",
      communicationRecord: [], // 沟通记录
      auditionData: [], // 试听记录
      OrderRecord: [], // 获取报名记录
      clueTurnRecordsData: [], // 流转记录
      phoneRecordsData: [], // 通话记录
      ClueAllCount: {}, // 线索跟进数量
      recordsItem,
      recommendedItem,
      Guid: "",
      CustomGuid: ""
    };
  },
  computed: {
    ...mapState({
      recordIds: state => state.cluesManage.getTrackingIds,
      isTracking: state => state.cluesManage.isTracking
    })
  },
  watch: {
    recordIds(id) {
      if (id.Guid.length > 0) {
          this.getRecordInfo();
      }
    },
    isTracking(flag) {
        if (!flag) {
            this.communicationRecord = []; // 沟通记录
            this.auditionData = []; // 试听记录
            this.OrderRecord = []; // 获取报名记录
            this.clueTurnRecordsData = []; // 流转记录
            this.phoneRecordsData = []; // 通话记录
            this.ClueAllCount = {}; // 线索跟进数量
        }
    }
  },
  methods: {
    onDownLoad(address) {
      if (address != "") {
        window.open(address);
      }
    },
    onPlay(address) {
      if (address == "") {
        return;
      }
      require.ensure(
        [],
        require => {
          let recordPlayer = require("../callCenter/RecordPlayer.vue");
          cluesModal
            .openComponent(recordPlayer, {
              title: "录音播放",
              disablePopEvent: true,
              showCancelButton: false,
              showConfirmButton: false,
              playAddress: address,
              width: "350px",
              height: "150px",
              self: this,
              callback: (flag, self) => {}
            })
            .then(modal => {});
        },
        "recordPlayer"
      );
    },
    getRecordInfo() {
      const { Guid, CustomGuid } = this.$route.query.Guid
        ? this.$route.query
        : this.$store.state.cluesManage.getTrackingIds;
      this.Guid = Guid;
      this.CustomGuid = CustomGuid;
      let recordId = {
        clueId: Guid,
        userId: CustomGuid
      };
      GetCommunicateRecords(recordId).then(ret => {
        // 沟通记录接口
        if (ret.status === 0) {
          this.communicationRecord = ret.result;
        }
      });
      ClueTurnRecords({ clueId: Guid }).then(ret => {
        // 流转记录
        if (ret.status === 0) {
          this.clueTurnRecordsData = ret.result;
        }
      });
      ListenInvitationRecords({ customId: CustomGuid }).then(ret => {
        // 试听记录
        if (ret.status === 0) {
          this.auditionData = ret.result;
        }
      });
      getPhoneRecords({ customId: CustomGuid }).then(ret => {
        // 通话记录
        if (ret.status === 0) {
          this.phoneRecordsData = ret.result;
        }
      });
      GetClueAllCount({ clueId: Guid }).then(ret => {
        // 线索跟进数量
        if (ret.status === 0) {
          this.ClueAllCount = ret.result;
        }
      });
      GetOrderRecord({ ClueGuid: Guid }).then(ret => {
        // 获取报名记录
        if (ret.status === 0) {
          this.OrderRecord = ret.result;
        }
      });
    }
  },
  created() {
      if (this.$route.query.Guid) {
          this.getRecordInfo();
      }
  }
};
</script>



