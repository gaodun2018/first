<template>
    <div class="crm-order-create">
        <loading :loadingMsg="loadingMsg"></loading>
        <div style="border-bottom: 10px solid #fafafa">
            <el-row style="padding: 15px 105px;line-height: 22px">
                <el-col v-for="item in progressText2" :key="item.text" :sm="6">
                    <div class="order-progress-bar">
                        <i class="progress-bar-line" :class="(item.isCustomerConfirm || item.isAddCourse || item.isOrderAffirm) && item.currentLine"></i>
                        <i class="progress-bar-dot" :class="(item.isCustomerConfirm || item.isAddCourse || item.isOrderAffirm) && item.currentDot"></i>
                        <span :class="(item.isCustomerConfirm || item.isAddCourse || item.isOrderAffirm) && item.currentText">{{item.text}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-form :model="form" ref="form" style="margin-bottom: 20px">
            <div class="order-create-form">
                <p class="tracking-clues-information" style="margin-bottom: 20px">客户订单信息</p>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="姓名">
                            <el-input v-model="getStudentInfo.stuName" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="手机">
                            <el-select v-model="form.Telphone" size='small' style="width: 170px">
                                <el-option v-for="item in getStudentInfo.phoneList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="电子邮箱">
                            <el-select v-model="form.Email" size='small' style="width: 170px">
                                <el-option v-for="item in getStudentInfo.emailList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="订单类型">
                            <el-select v-model="form.OrderType" size='small' filterable style="width: 170px">
                                <el-option v-for="item in getOrderType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="证件类型">
                            <el-select v-model="form.CertificateType" size='small' filterable style="width: 170px">
                                <el-option v-for="item in getCertificateType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="证件号码">
                            <el-input v-model="form.CertificateNo" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="紧急联系人">
                            <el-input v-model="form.UrgentName" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="紧急联系人电话">
                            <el-input v-model="form.UrgentPhone" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="报名项目">
                            <el-select v-model="form.CourseType" size='small' filterable style="width: 170px" @change="onCourseType">
                                <el-option v-for="item in getCourseType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="报名校区">
                            <el-select v-model="form.SignUpSchoolID" size='small' filterable style="width: 170px">
                                <el-option v-for="school in getSchoolArea" :key="school.ID" :label="(school.ProvinceName && school.ProvinceName+'-')+(school.CityName && school.CityName+'-')+school.SchoolName" :value="school.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="上课校区">
                            <el-select v-model="form.AttendSchoolID" size='small' filterable style="width: 170px">
                                <el-option v-for="school in getSchoolArea" :key="school.ID" :label="(school.ProvinceName && school.ProvinceName+'-')+(school.CityName && school.CityName+'-')+school.SchoolName" :value="school.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="期望上课时间">
                            <el-date-picker v-model="form.StartTime" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 170px" size='small'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="是否定金">
                            <el-radio-group v-model="form.deposit">
                                <el-radio label="1">
                                    <span>是</span>
                                    <span v-show="form.deposit == 1">
                                        <el-input v-model="form.DepositAmount" style="width: 80px" size='small' placeholder="输入金额"></el-input>
                                        <span>元</span>
                                    </span>
                                </el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label="推荐人" label-width="111px" prop="RecommenderName">
                        <el-input size="small" placeholder="请输入推荐人姓名或手机" style="width: 171px" v-model="form.RecommenderName" @change="onRecommenderName" @focus="onFocusRecommentder" @blur="onBlurRecommentder"></el-input>
                        <div style="width: 100%" class="el-select-dropdown" x-placement="bottom-start" v-show="isSelect">
                            <div class="el-scrollbar">
                                <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -15px; margin-right: -15px;">
                                    <ul class="el-scrollbar__view el-select-dropdown__list" style="position: relative;">
                                        <div class="resize-triggers">
                                            <div class="expand-trigger">
                                                <div style="width: 100%; height: 121px;"></div>
                                            </div>
                                            <div class="contract-trigger"></div>
                                        </div>
                                         <li class="el-select-dropdown__item" v-for="item in recommenderData" @click.stop="handleRecommentder(item)"><span>{{item.value}}</span></li>
                                    </ul>
                                </div>
                            <div class="el-scrollbar__bar is-horizontal">
                                <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                            </div>
                            <div class="el-scrollbar__bar is-vertical">
                                <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                            </div>
                            </div>
                        </div>
                </el-form-item> 

                      <!--   <el-form-item label="推荐人" label-width="111px" prop="RecommenderName">
                            <el-autocomplete size="small" style="width: 170px" :trigger-on-focus="false" 
                            v-model="form.RecommenderName" :fetch-suggestions="selectRecommender" placeholder="请输入推荐人姓名或手机"
                            @select="handleSelectRecommend"></el-autocomplete>
                        </el-form-item>  -->
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row style="margin: 10px 10px 10px 0">
                    <el-col :span="12">
                        <p class="tracking-clues-information" style="margin-bottom: 15px">购买课程及优惠</p>
                    </el-col>
                    <el-col :span="12" class="t_r">
                        <el-button style="background: #f09862; color: #fff; border: 0" size="small" @click.stop="onAddCourse">添加课程</el-button>
                    </el-col>
                </el-row>
                <el-table :data="this.$store.state.order.selectedProduct" slot="empty" style="width: 98%; margin: 0 auto">
                    <el-table-column type='selection'>
                    </el-table-column>
                    <el-table-column prop="productNo" label="产品ID" min-width="110">
                    </el-table-column>
                    <el-table-column label="课程产品名称" min-width="160">
                        <template scope="scope">
                            <div :title="scope.row.productName" class="beyond-hidden-2" style="height: 48px" :class="scope.row.isPackage == 1 && 'product-package-icon'">
                                <span style="padding-left: 20px; display: inline-block">{{scope.row.productName}}</span>
                            </div>
                        </template>
                    </el-table-column>
                     <el-table-column label="所属模块" min-width="160">
                        <template scope="scope">
                            <div class="beyond-hidden-2" style="height: 48px" :title="scope.row.ProductModuleName">{{scope.row.ProductModuleName}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="item in orderCourse" :key="item.value" :prop="item.value" :min-width="item.w" :label="item.name">
                    </el-table-column>
                    <el-table-column min-width="100">
                        <template scope="scope">
                            <el-button v-show="scope.row.isPackage === 1" class="product-detail" @click="productDetail(scope.$index, getProduct)" type="text" size="small">明细</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index, getProduct)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                    <div class="order-empty" slot="empty">
                        <a href="javascript:void(0)" @click.stop="onAddCourse">
                            <img src="../../../images/crm-add-icon.png">
                            <span>添加课程</span>
                        </a>
                    </div>
                </el-table>
            </div>
            <div class="order-create-price" v-show="isCourse">
                <el-row>
                    <el-col :sm="18">
                        <el-row>
                            <el-col :sm="5">
                            <div>
                                <p style="color: #3d4550">早报优惠:</p>
                                <el-select v-model="form.Early" size='small' value-key="ID" clearable style="width: 135px" @change="onDiscount('early', form.Early)" @clear="onClearPreferential('early')">
                                    <el-option v-for="item in getPreferential.Early" :key="item.CourseType" :label="item.DiscountName" :value="item">
                                    </el-option>
                                </el-select>
                                <div v-show="form.Early.DiscountValue">
                                    <p class="price-font-2" v-if="form.Early.DiscountValue && form.Early.DiscountWays == '1001100'">¥{{form.Early.DiscountValue}}</p>
                                    <p class="price-font-2" v-else-if="form.Early.DiscountValue && form.Early.DiscountWays == '1001101'">{{form.Early.DiscountValue}}%</p>
                                </div>
                            </div>
                            </el-col>
                            <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">项目优惠:</p>
                                    <el-select v-model="form.Course" size='small' value-key="ID" clearable style="width: 135px" @change="onDiscount('course', form.Course)" @clear="onClearPreferential('course')">
                                        <el-option v-for="item in getPreferential.Course" :key="item.CourseType" :label="item.DiscountName" :value="item">
                                        </el-option>
                                    </el-select>
                                    <div v-show="form.Course.DiscountValue">
                                        <p class="price-font-2" v-if="form.Course.DiscountValue && form.Course.DiscountWays == '1001100'">¥{{form.Course.DiscountValue}}</p>
                                        <p class="price-font-2" v-else-if="form.Course.DiscountValue && form.Course.DiscountWays == '1001101'">{{form.Course.DiscountValue}}%</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">市场优惠:</p>
                                    <el-select v-model="form.mark" size='small' value-key="ID" clearable style="width: 135px" @change="onDiscount('mark', form.mark)" @clear="onClearPreferential('mark')">
                                        <el-option v-for="item in getPreferential.mark" :key="item.CourseType" :label="item.DiscountName" :value="item">
                                        </el-option>
                                    </el-select>
                                    <div v-show="form.mark.DiscountValue">
                                        <p class="price-font-2" v-if="form.mark.DiscountValue && form.mark.DiscountWays == '1001100'">¥{{form.mark.DiscountValue}}</p>
                                        <p class="price-font-2" v-else-if="form.mark.DiscountValue && form.mark.DiscountWays == '1001101'">{{form.mark.DiscountValue}}%</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">流转推荐:</p>
                                    <el-select v-model="form.recommend" size='small' value-key="ID" clearable style="width: 135px" @change="onDiscount('recommend', form.recommend)" @clear="onClearPreferential('recommend')">
                                        <el-option v-for="item in getPreferential.Recommend" :key="item.CourseType" :label="item.DiscountName" :value="item">
                                        </el-option>
                                    </el-select>
                                    <div v-show="form.recommend.DiscountValue">
                                        <p class="price-font-2" v-if="form.recommend.DiscountValue && form.recommend.DiscountWays == '1001100'">¥{{form.recommend.DiscountValue}}</p>
                                        <p class="price-font-2" v-else-if="form.recommend.DiscountValue && form.recommend.DiscountWays == '1001101'">{{form.recommend.DiscountValue}}%</p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :sm="4">
                                <div v-if="unlocking('CRM_Order_SelfAmount')">
                                    <p style="color: #3d4550">自定义优惠:</p>
                                    <el-input v-model="form.selfAmount" @change="selfAmountChange" style="width: 135px" size='small' placeholder="输入金额"></el-input>
                                    <div v-show="form.recommend.DiscountValue">
                                        <p class="price-font-2">¥{{selfDiscount}}</p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :sm="3">
                        <div style="margin-top: 28px;text-align:right;margin-right:20px;">
                            <del style="color: #8f9aac;">
                                <span style="color: #414852">原价: </span>
                                <span>¥{{totalPrise.toFixed(2)}}</span>
                            </del>
                        </div>
                    </el-col>
                    <el-col :sm="3">
                        <div style="margin-top: 25px">
                            <p>
                                <span style="color: #414852">优惠总金额:</span>
                                <span class="price-font-2">¥{{(totalDiscount+selfDiscount).toFixed(2)}}</span>
                            </p>
                            <p>
                                <span style="color: #414852">报名价格:</span>
                                <span class="price-font-1">¥{{(totalPrise-totalDiscount-selfDiscount).toFixed(2)}}</span>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="order-create-note">
                <el-row>
                    <el-col :sm="10" style="padding-left: 10px">
                        <p>订单备注:</p>
                        <div>
                            <el-form-item>
                                <el-input style="width: 70%" placeholder="对订单进行详细描述备注" :rows="2" type="textarea" v-model="form.Remark"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :sm="14">
                        <el-row>
                            <el-col :sm="18">
                                <p>协议备注:</p>
                                <div>
                                    <el-form-item>
                                        <el-input style="width: 70%" placeholder="对订单进行详细描述备注" :rows="2" type="textarea" v-model="form.AgreementRemark"></el-input>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :sm="6" style="padding:58px 10px 0 0; text-align: right">
                                <el-form-item>
                                    <el-button :disabled="isSave ? true : false" :loading="loading" size="small" type="primary" @click="onSaveForm">保存并生成支付链接</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div style="margin-top: 20px; border-top: 10px solid #fafafa" v-show="isSave">
                <el-row style="margin-right: 10px">
                    <el-col :sm="14" style="padding: 20px 15px 0 0; border-right: 10px solid #fafafa">
                        <el-row style="padding-bottom: 20px">
                            <p class="tracking-clues-information" style="margin-bottom: 20px">订单收款辅助</p>
                            <el-col>
                                <el-row class="order-create-update">
                                    <div class="order-create-border">
                                        <el-col :sm="12">
                                            <div class="order-create-No">
                                                <i></i>
                                                <span>订单号:
                                                    <span>{{orderNo}}</span>
                                                </span>
                                            </div>
                                        </el-col>
                                        <el-col :sm="12" class="t_r">
                                            <button style="margin-right: 0" class="orderButton-icon" @click="onRefresh">
                                                <i></i>
                                                <span>刷新支付流水</span>
                                            </button>
                                        </el-col>
                                    </div>
                                </el-row>
                                <el-row style="padding-bottom: 20px; border-bottom: 1px solid #8d98a9">
                                    <el-col>
                                        <el-row>
                                            <el-col :sm="14">
                                                <div class="order-create-copy">
                                                    <span>快捷支付链接:</span>
                                                    <span id="copyUrl1" style="color: #38aade">{{lPaymentLink}}</span>
                                                </div>
                                            </el-col>
                                            <el-col :sm="10" style="text-align: right;font-size: 0">
                                                <!-- <el-button class="create-message-button" size="small" @click="onSendPayUrl">短信发送</el-button>
                                                <el-button @click="onSendEmail" class="create-email-button" size="small">邮件发送</el-button> -->
                                                <el-button class="create-copy-button" size="small" id="copyPayment">复制地址</el-button>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top: 10px">
                                            <el-col :sm="14">
                                                <div class="order-create-copy">
                                                    <span>协议确认及资料上传地址:</span>
                                                    <span id="copyUrl2" style="color: #38aade">{{userAgreeUrl}}</span>
                                                </div>
                                            </el-col>
                                            <el-col :sm="10" style="text-align: right;font-size: 0">
                                                <!-- <el-button class="create-message-button" size="small" @click="onSendPayUrl">短信发送</el-button>
                                                <el-button @click="onSendEmail" class="create-email-button" size="small">邮件发送</el-button> -->
                                                <el-button class="create-copy-button" size="small" id="copyUserAgree">复制地址</el-button>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :sm="10" style="padding: 15px 0 0 15px">
                        <p class="tracking-clues-information" style="margin-bottom: 20px">收款流水</p>
                        <el-table :data="paySerial" border style="width: 100%">
                            <el-table-column width="80px">
                                <template scope="scope">
                                    <span>{{scope.$index+1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="PayTime" label="支付时间">
                            </el-table-column>
                            <el-table-column prop="PaySerialNo" label="收款流水">
                            </el-table-column>
                            <el-table-column prop="PayCount" label="支付金额">
                            </el-table-column>
                        </el-table>
                        <el-row style="margin-top: 15px; font-size: 14px">
                            <el-col :sm="10" class="t_r">
                                <div>
                                    <span style="color: #414852">应收:</span>
                                    <span class="price-font-1">¥{{amountReceivable}}</span>
                                </div>
                            </el-col>
                            <el-col :sm="7" class="t_r">
                                <div>
                                    <span style="color: #414852">已收:</span>
                                    <span class="price-font-2">¥ {{PayCount}}</span>
                                </div>
                            </el-col>
                            <el-col :sm="7" class="t_r">
                                <div>
                                    <span style="color: #414852">未收:</span>
                                    <span class="price-font-1">¥{{amountUncollected}}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<style>
.crm-order-create .el-input__icon + .el-input__inner {
  padding-right: 20px;
}

.crm-order-create .el-form-item {
  margin-bottom: 10px;
}

.crm-order-create .el-table__empty-block {
  height: 100px;
  line-height: 100px;
  overflow: hidden;
}
</style>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import { orderCourse, progressText2 } from "../common/orderConfig";
import loading from '../../containers/loading.vue';
import { format, trim, isCardNo, isMoney } from "../../util/util";
import {SendPayUrl,GetStudentInfo,GetSchoolAreaByID,GetDictionaryByTypeId,GetDiscountByCourseType,ComputeDiscount,getCreateOrder,GetSavePaySerial,GetProductPackageByID,GetCurrentUserCourseTypeList} from "../../api/order";
import {GetRecommenderSearchList } from '../../api/cluesManage';
import OrderModal from "vueModal";
import Clipboard from "Clipboard";

export default {
  name: "crm-create-order",
  components: {loading},
  data() {
    return {
      isSave: false,
      isCourse: false,
      isComplete: false,
      loadingMsg: {
                title: '',
                loading: false
            },
      productPackage: [], // 产品包
      orderCourse, // 课程列表
      progressText2, // 订单流程轴
      getStudentInfo: {
        // 获取学生信息
        emailList: [],
        phoneList: [],
        stuName: ""
      },
      recommenderData: [],
      getSchoolArea: [], // 获取所有校区
      getOrderType: [], // 订单类型
      getCourseType: [], // 报名项目
      getCertificateType: [], // 证件类型
      getProduct: [], // 已选课程
      getPreferential: [], // 获取优惠
      discountlist: [], // 已选优惠ID
      totalDiscount: 0, // 优惠金额
      selfDiscount:0,
      totalPrise: 0, // 原价
      PayCount: 0, // 已收金额
      amountReceivable: 0, // 应收金额
      amountUncollected: 0, // 未收金额
      productNoList: [], // 已选产品编号
      lPaymentLink: "", // 支付链接
      userAgreeUrl: "", // 协议确认
      paySerial: [], // 收款流水
      orderNo: "", // 订单号
      initCourseType: "", // 初始化报名项目
      isSelect: "",
      preferential: {
        recommend: "",
        mark: "",
        course: "",
        early: ""
      },
      form: {
        TrueName: "",
        Telphone: "",
        Email: "",
        OrderType: "",
        CertificateType: "",
        CertificateNo: "",
        IDcardFace: "",
        UrgentName: "",
        UrgentPhone: "",
        CourseType: "",
        SignUpSchoolID: "",
        AttendSchoolID: "",
        StartTime: '',
        deposit: "0",
        Remark: "",
        AgreementRemark: "",
        DepositAmount: null,
        Course: {},
        Early: {},
        mark: {},
        Recommender:"",
        RecommenderName: "",
        recommend: {},
        selfAmount:""
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
   handleRecommentder(val) {
        this.form.RecommenderName = val.value;
        this.form.Recommender = val.Id;
    },
    onFocusRecommentder() { 
        clearTimeout(this.timer);
        this.isSelect = true;
    },
    onBlurRecommentder() {
        this.timer = setTimeout(() => {
            this.isSelect = false;
        }, 500);
    },
    onRecommenderName(val) {
        if (val.length > 1) {
             GetRecommenderSearchList({ SearchKey: val }).then(ret => {
                if (ret.status === 0) {
                    this.recommenderData = ret.result;
                }
            }) 
        }
    },

    selfAmountChange(val){
        if(!val){
            this.selfDiscount=0;
            return;
        }
        if(isNaN(val)||val<0){
            this.$message({
                message: "请输入正确数字",
                showClose: true,
                type: 'warning'
            });
            this.selfDiscount=0;
            return;
        }
        this.selfDiscount=parseFloat(val);
    },
    onSaveForm() {
      const {
        Telphone,
        Email,
        OrderType,
        CertificateType,
        CertificateNo,
        IDcardFace,
        UrgentName,
        UrgentPhone,
        CourseType,
        SignUpSchoolID,
        AttendSchoolID,
        StartTime,
        deposit,
        Remark,
        AgreementRemark,
        DepositAmount,
        Course,
        Early,
        mark,
        recommend,
        Recommender
      } = this.form;
      let params = {
        orderinfo: {
          OrderNo: this.orderNo,
          ClueGuid: this.$route.query.Guid,
          OrderType,
          IsDeposit: deposit,
          DepositAmount,
          IsNeedAudit: 0,
          AuditInformationUrl: "",
          Remark,
          AgreementRemark,
          CourseType,
          Recommender,
          SelfAmount:this.selfDiscount
        },
        stuinfo: {
          StudentGuid: "",
          TrueName: this.getStudentInfo.stuName,
          Telphone,
          Email,
          CertificateType,
          CertificateNo,
          IDcardFace: "",
          IDcardBack: "",
          UrgentName,
          UrgentPhone,
          SignUpSchoolID,
          AttendSchoolID,
          StartTime: format(StartTime),
          Create_Time: "",
          Create_By: ""
        },
        productNoList: this.productNoList,
        discountList: this.discountlist
      };
      if (this.form.deposit == 0) {
        if (!this.productNoList.length) {
          this.$message({
            message: "请添加课程",
            type: "warning"
          });
          return;
        }
      }
      if (this.form.CertificateType == 1000200 && isCardNo(CertificateNo)) {
        this.$message({
          message: "请输入合法的身份证号码",
          type: "warning"
        });
        return;
      } else if (!trim(CertificateNo)) {
        this.$message({
          message: "请输入证件号码",
          type: "warning"
        });
        return;
      }
      if (!trim(UrgentName)) {
        this.$message({
          message: "请输入紧急联系人",
          type: "warning"
        });
        return;
      }
      if (SignUpSchoolID == '') {
        this.$message({
          message: "请选择报名校区",
          type: "warning"
        });
        return;
      }
       if (AttendSchoolID == '') {
        this.$message({
          message: "请选择上课校区",
          type: "warning"
        });
        return;
      }
       if (StartTime == '') {
        this.$message({
          message: "请选择期望上课时间",
          type: "warning"
        });
        return;
      }
      if (!trim(UrgentPhone)) {
        this.$message({
          message: "请输入紧急联系人电话",
          type: "warning"
        });
        return;
      }
      if (this.form.deposit == 1 && !isMoney(DepositAmount)) {
        this.$message({
          message: "请输入合法的金额",
          type: "warning"
        });
        return;
      }

      if(isNaN(this.form.selfAmount)||parseFloat(this.form.selfAmount)<0){
            this.$message({
                message: "请输入正确的自定义优惠金额",
                showClose: true,
                type: 'warning'
            });
            return;
       }

      if (this.form.deposit == 1) {
        // 应收金额
        this.amountReceivable = Number(DepositAmount).toFixed(2);
      } else {
        this.amountReceivable = Number(
          this.totalPrise - this.totalDiscount-this.selfDiscount
        ).toFixed(2);
      }
      this.amountUncollected = Number(
        this.amountReceivable - this.PayCount
      ).toFixed(2); // 未收金额
      this.loadingMsg.loading = true;
      getCreateOrder(params).then(ret => {
        // 保存并生成支付链接
        if (ret.status === 0) {
          this.lPaymentLink = ret.result.payUrl;
          this.userAgreeUrl = ret.result.userAgreeUrl;
          this.orderNo = ret.result.orderNo;
          this.isSave = true;
          this.loadingMsg.loading = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.progressText2[1].isAddCourse = true;
          this.progressText2[2].isOrderAffirm = true;
          GetSavePaySerial({ orderNo: ret.result.orderNo }).then(ret => {
            // 收款流水
            if (ret.status === 0) {
              this.paySerial = ret.result;
              this.PayCount = 0;
              if (this.paySerial) {
                for (let i = 0; i < this.paySerial.length; i++) {
                  this.PayCount += Number(this.paySerial[i].PayAccount).toFixed(2);
                }
              }
            }
          });
        } else {
          this.loadingMsg.loading = false;
        }
      });
    },
    onCourseType(val) {
      // 报名项目
      this.onByCourseType({ coursetype: val });
    },
    selectRecommender(queryString, cb) {
      if (queryString.length >= 2) {
        clearTimeout(this.delay);
        this.delay = setTimeout(() => {
          GetRecommenderSearchList({ SearchKey: queryString }).then(ret => {
            if (ret.status === 0) {
              let restaurants = ret.result;
              let results = queryString? restaurants.filter(this.createRecommendStateFilter(queryString)): restaurants;
              cb(results);
            }
          });
        }, 300);
      }
    },
    handleSelectRecommend(item) {
      this.form.Recommender = item.Id;
    },
    createRecommendStateFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0
        );
      };
    },
    onAddCourse() {
      require.ensure(
        [],
        require => {
          let OrderModuleCourse = require("./OrderModalCourse.vue");
          OrderModal.openComponent(OrderModuleCourse, {
            title: "课程选择",
            showCancelButton: true,
            showConfirmButton: true,
            width: "870px",
            self: this,
            setProduct: this.getProduct,
            CourseType: this.form.CourseType,
            callback: (flag, self) => {
              if (flag === "confirm") {
                this.getProduct = this.$store.state.order.selectedProduct;
                this.totalPrise = 0;
                this.productNoList = [];
                for (let i = 0; i < this.getProduct.length; i++) {
                  this.totalPrise += Number(this.getProduct[i].sellPrise);
                  this.productNoList.push(this.getProduct[i].productNo);
                }
                this.onComputeDiscount();
                if (!this.getProduct.length) {
                  this.$message({
                    message: "请先选择课程",
                    type: "warning"
                  });
                  return false;
                }
              } else if (flag === "cancel") {
                this.$store.dispatch("selectedProduct", this.getProduct);
              }
            }
          });
        },
        "orderModuleCourse"
      );
    },
    onSendPayUrl() {
      // 发送短信
      SendPayUrl({ orderNo: this.orderNo }).then(ret => {
        if (ret.status === 0) {
          this.$message({
            message: "短信已发送",
            type: "success"
          });
        }
      });
    },
    onSendEmail() {
      alert("暂未提供接口");
    },
    onDiscount(type, ids) {
      // 已选优惠项
      this.preferential[type] = ids.ID;
      this.onComputeDiscount();
    },
    onClearPreferential(type) {
      // 清空已选的优惠
      this.preferential[type] = "";
    },
    onComputeDiscount() {
      // 调用各项的优惠信息接口
      this.discountlist = [];
      for (let i in this.preferential) {
        this.discountlist.push(this.preferential[i]);
      }
      let params = {
        productlist: this.productNoList,
        discountlist: this.discountlist
      };
      ComputeDiscount(params).then(ret => {
        if (ret.status === 0) {
          this.totalDiscount = ret.result;
        }
      });
    },
    deleteRow(index, rows) {
      // 删除已选的课程
      this.totalPrise = 0;
      this.productNoList = [];
      rows.splice(index, 1);
      for (let i = 0; i < rows.length; i++) {
        this.productNoList.push(rows[i].productNo);
        this.totalPrise += Number(rows[i].sellPrise);
      }
      this.onComputeDiscount();
    },
    productDetail(index, rows) {
      require.ensure(
        [],
        require => {
          let ProductDetail = require("./OrderModalProductDetail.vue");
          OrderModal.openComponent(ProductDetail, {
            title: "产品包明细",
            showCancelButton: true,
            showConfirmButton: true,
            width: "870px",
            self: this,
            orderNo: rows[index].id,
            callback: (flag, self) => {
              if (flag === "confirm") {
              }
            }
          });
        },
        "productDetail"
      );
    },
    onByCourseType(params) {
      // 获取产品信息 根据项目类型
      GetDiscountByCourseType(params).then(ret => {
        if (ret.status === 0) {
          this.getPreferential = ret.result;
        }
      });
    },
    onRefresh(event) {
      // 刷新支付流水
      event.preventDefault();
      this.loadingMsg.loading = true;
      GetSavePaySerial({ orderNo: this.orderNo }).then(ret => {
        // 收款流水
        if (ret.status === 0) {
          this.paySerial = ret.result;
          this.loadingMsg.loading = false;
        } else {
          this.loadingMsg.loading = false;
        }
      });
    },
    copyClipboard(bntId, urlId) {
      const self = this;
      const clipboard = new Clipboard(bntId, {
        // 复制地址
        target: function() {
          return document.querySelector(urlId);
        }
      });
      clipboard.on("success", function() {
        self.$message({
          message: "地址已复制成功",
          type: "success"
        });
      });
      clipboard.on("error", function() {
        self.$message({
          message: "地址复制失败，可尝试手动复制",
          type: "error"
        });
      });
    }
  },
  mounted() {
    this.copyClipboard("#copyPayment", "#copyUrl1");
    this.copyClipboard("#copyUserAgree", "#copyUrl2");
  },
  updated() {
    if (this.getProduct.length) {
      this.isCourse = true;
    } else {
      this.isCourse = false;
    }
    if (this.getProduct.length || this.form.deposit == 1) {
      this.progressText2[1].isAddCourse = true;
    } else {
      this.progressText2[1].isAddCourse = false;
    }
  },
  created() {
    const clueGuid = { clueGuid: this.$route.query.Guid };
    GetStudentInfo(clueGuid)
      .then(ret => {
        // 获取学生信息
        if (ret.status === 0) {
          this.loadingMsg.loading = false;
          this.getStudentInfo = ret.result;
          this.form.Telphone = ret.result.phoneList[0];
          this.form.Email = ret.result.emailList[0];
          this.form.CourseType = ret.result.CourseType.toString();
          this.form.Recommender=ret.result.Recommender;
          this.form.RecommenderName=ret.result.RecommenderName;
        } else {
          this.loadingMsg.loading = false;
        }
      })
      .catch(() => {
        this.loadingMsg.loading = false;
      });
    GetSchoolAreaByID().then(ret => {
      // 获取所有校区
      if (ret.status === 0) {
        this.getSchoolArea = ret.result;
        // this.form.SignUpSchoolID = ret.result[0].ID;
        // this.form.AttendSchoolID = ret.result[0].ID;
      }
    });
    GetDictionaryByTypeId({ dicType: "10035" }).then(ret => {
      // 订单类型
      if (ret.status === 0) {
        this.getOrderType = ret.result;
        this.form.OrderType = "1000400";
      }
    });
    GetDictionaryByTypeId({ dicType: "10026" }).then(ret => {
      // 证件类型
      if (ret.status === 0) {
        this.getCertificateType = ret.result;
        this.form.CertificateType = "1000200";
      }
    });
    GetCurrentUserCourseTypeList().then(ret => {
      // 报名项目
      if (ret.status === 0) {
        this.getCourseType = ret.result;
      }
    });
  }
};
</script>
