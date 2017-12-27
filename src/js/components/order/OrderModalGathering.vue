<template>
    <div class="order-gathering">
        <el-form ref="form" label-width="85px" :model="form" :rules="rules" align='left'>
            <el-row>
                <el-col v-for="item in orderData" :key="item.value" :sm="8">
                    <el-form-item :style="item.float" :label="item.name">
                        <el-input size="small" style="width: 145px"  :disabled="true" v-model="studentInfo[item.value]"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="8">
                    <el-form-item label="支付方式：">
                        <el-select filterable v-model="form.PayType"  style="width: 145px" @visible-change="onPayWay">
                            <el-option size="small" v-for="item in payWayData" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item style="float: right" label="支付金额：">
                        <el-input size="small" v-model="form.PayCount"  style="width: 145px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item style="float: right" label="支付流水：">
                        <el-input size="small" v-model="form.PaySerialNo"  style="width: 145px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="8">
                    <el-form-item label="支付时间：">
                        <el-date-picker :picker-options="pickerOption" v-model="form.PayTime" style="width: 145px"  size="small" type="datetime" placeholder="支付时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
                <el-col :sm="24">
                    <el-form-item prop="CommuCianateContent" label="支付说明：">
                        <el-input size="small" v-model="form.Remark" type="textarea" :rows="4"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row style="margin-top: 10px">
                <el-form-item style="padding: 15px 0;text-align: center">
                    <el-button size="small" style="width: 100px" type="primary" :loading="loading" @click="onSaveForm">保存</el-button>
                    <el-button size="small" style="width: 100px" @click="closeForm">取消</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<style>
.order-gathering .el-form-item {
  margin-bottom: 10px;
}
</style>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import { isMoney, trim, number2DateTime } from "../../util/util";
import { Input, Button, Row, Col, Loading, Message } from "element-ui";
import { AddSerial, GetDictionaryByTypeId } from "../../api/order";
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Loading);
export default {
  props: ["self", "studentInfo", "modal", "updatedOrder"],
  data() {
    return {
      payWayData: [], // 支付方式
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        }
      },
      orderData: [
        {
          name: "订单编号：",
          value: "OrderNo",
          float: ""
        },
        {
          name: "学生姓名：",
          value: "StudentName",
          float: "float: right"
        },
        {
          name: "手机：",
          value: "Telphone",
          float: "float: right"
        }
      ],
      form: {
        PayType: "",
        PayCount: "",
        Remark: "",
        PaySerialNo: "",
        PayTime: ""
      },
      loading: false
    };
  },
  methods: {
    onSaveForm() {
      // this.updatedOrder();
      const { PayCount, Remark, PayType, PaySerialNo, PayTime } = this.form;
      if (!PayType) {
        Message({
          message: "请选择支付方式",
          type: "warning"
        });
        return;
      }
      if (isNaN(PayCount) || PayCount == 0) {
        Message({
          message: "请输入合法的金额",
          type: "warning"
        });
        return;
      }
      if (!trim(PaySerialNo)) {
        Message({
          message: "请输入支付流水",
          type: "warning"
        });
        return;
      }

      if (!PayTime) {
        Message({
          message: "请输入支付时间",
          type: "warning"
        });
        return;
      }

      let params = {
        OrderNo: this.studentInfo.OrderNo,
        PayType,
        PayCount,
        Remark,
        PaySerialNo,
        PayTime: number2DateTime(PayTime)
      };
      this.loading = true;
      AddSerial(params).then(ret => {
        this.loading = false;
        if (ret.status === 0) {
          Message({
            message: "保存成功",
            type: "success"
          });
          this.self.getOrderList();
          this.modal.close();
        } else {
          Message({
            message: ret.info,
            showClose: true,
            type: "warning"
          });
        }
      });
    },
    closeForm() {
      this.modal.close();
    },
    onPayWay(even) {
      // 支付方式
      if (even) {
        GetDictionaryByTypeId({ dicType: "10041" }).then(ret => {
          if (ret.status === 0) {
            this.payWayData = ret.result;
          }
        });
      }
    }
  }
};
</script>