<template>
    <div class="crm-order-create">
        <loading :loadingMsg="loadingMsg"></loading>
        <div style="border-bottom: 10px solid #fafafa">
            <el-row style="padding: 15px 105px;line-height: 22px">
                <el-col v-for="item in progressText" :key="item.text" :sm="6">
                    <div class="order-progress-bar">
                        <i class="progress-bar-line" :class="item.currentLine"></i>
                        <i class="progress-bar-dot" :class="item.currentDot"></i>
                        <span :class="item.currentText">{{item.text}}</span>
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
                            <el-input v-model="form.studentInfo.TrueName" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="手机">
                            <el-select v-model="form.studentInfo.Telphone" size='small' style="width: 170px">
                                <el-option v-for="item in GetSaveOrderInfo.phoneList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="电子邮箱">
                            <el-select v-model="form.studentInfo.Email" size='small' style="width: 170px">
                                <el-option v-for="item in GetSaveOrderInfo.emailList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="订单类型">
                            <el-select v-model="form.orderInfo.OrderType" size='small' style="width: 170px">
                                <el-option v-for="item in getOrderType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="证件类型">
                            <el-select v-model="form.CertificateType" size='small' style="width: 170px">
                                <el-option v-for="item in getCertificateType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="证件号码">
                            <el-input v-model="form.studentInfo.CertificateNo" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="紧急联系人">
                            <el-input v-model="form.studentInfo.UrgentName" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="紧急联系人电话">
                            <el-input v-model="form.studentInfo.UrgentPhone" style="width: 170px" size='small' placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="报名项目">
                            <el-select v-model="form.CourseType" filterable size='small' style="width: 170px" @change="onCourseType">
                                <el-option v-for="item in getCourseType" :key="item.Id" :label="item.Name" :value="item.Id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="报名校区">
                            <el-select v-model="form.studentInfo.SignUpSchoolID" filterable size='small' style="width: 170px">
                                <el-option v-for="school in getSchoolArea" :key="school.ID" :label="(school.ProvinceName && school.ProvinceName+'-')+(school.CityName && school.CityName+'-')+school.SchoolName" :value="school.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="上课校区">
                            <el-select v-model="form.studentInfo.AttendSchoolID" filterable size='small' style="width: 170px">
                                <el-option v-for="school in getSchoolArea" :key="school.ID" :label="(school.ProvinceName && school.ProvinceName+'-')+(school.CityName && school.CityName+'-')+school.SchoolName" :value="school.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="期望上课时间">
                            <el-date-picker v-model="form.studentInfo.StartTime" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width: 170px" size='small'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :sm="8">
                        <el-form-item label-width="111px" label="是否定金">
                            <el-radio-group @click="onDeposit" v-model="form.orderInfo.IsDeposit">
                                <el-radio label="1">
                                    <span>是</span>
                                    <span v-show="form.orderInfo.IsDeposit == 1">
                                        <el-input v-model="form.orderInfo.DepositAmount" style="width: 80px" size='small' placeholder="输入金额"></el-input>
                                        <span>元</span>
                                    </span>
                                </el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="8">
                        <el-form-item label="推荐人" label-width="111px" prop="RecommenderName">
                            <el-autocomplete size="small" style="width: 170px" :trigger-on-focus="false" 
                            v-model="form.orderInfo.RecommenderName" :fetch-suggestions="selectRecommender" placeholder="请输入推荐人姓名或手机"
                            @select="handleSelectRecommend"></el-autocomplete>
                        </el-form-item> 
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row style="margin: 10px 10px 10px 0">
                    <el-col :span="12">
                        <p class="tracking-clues-information" style="margin-bottom: 15px">购买课程及优惠</p>
                    </el-col>
                    <el-col :span="12" class="t_r">
                        <el-button style="background: #f09862; color: #fff; border: 0" size="small" @click="addCourse">添加课程</el-button>
                    </el-col>
                </el-row>
                <div style="margin: 0 10px">
                    <el-table :data="getProduct" slot="empty" style="width: 100%">
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
                        <el-table-column>
                            <template scope="scope">
                                <el-button v-show="scope.row.isPackage === 1" class="product-detail" @click="productDetail(scope.$index, getProduct)" type="text" size="small">明细</el-button>
                                <el-button @click.native.prevent="deleteRow(scope.$index, getProduct)" type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                        <div class="order-empty" slot="empty">
                            <a href="javascript:void(0)" @click="addCourse">
                                <img src="../../../images/crm-add-icon.png">
                                <span>添加课程</span>
                            </a>
                        </div>
                    </el-table>
                </div>
            </div>
            <div class="order-create-price" v-show="isCourse">
                <el-row>
                    <el-col :sm="18">
                         <el-row>
                             <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">早报优惠:</p>
                                    <div v-if="getPreferential.Early">
                                        <el-select v-model="form.Early" size='small' clearable style="width: 145px" value-key="ID" @change="onDiscount('early', form.Early)" @clear="onClearPreferential('early')" :placeholder="form.Early ? form.Early.DiscountName: '请选择'">
                                            <el-option v-for="item in getPreferential.Early" :key="item.ID" :label="item.DiscountName" :value="item">
                                            </el-option>
                                        </el-select>
                                        <div v-if="form.Early" v-show="form.Early.DiscountValue">
                                            <p class="price-font-2" v-if="form.Early.DiscountValue && form.Early.DiscountWays == '1001100'">¥{{form.Early.DiscountValue}}</p>
                                            <p class="price-font-2" v-else-if="form.Early.DiscountValue && form.Early.DiscountWays == '1001101'">{{form.Early.DiscountValue}}%</p>
                                        </div>
                                    </div>
                                    <div v-else>暂无</div>
                                </div>
                            </el-col>
                            <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">项目优惠:</p>
                                    <div v-if="getPreferential.Course">
                                        <el-select v-model="form.Course" size='small' clearable style="width: 145px" value-key="ID" @change="onDiscount('course', form.Course)" @clear="onClearPreferential('course')" :placeholder="form.Course ? form.Course.DiscountName: '请选择'">
                                            <el-option v-for="item in getPreferential.Course" :key="item.ID" :label="item.DiscountName" :value="item">
                                            </el-option>
                                        </el-select>
                                        <div v-if="form.Course">
                                            <p class="price-font-2" v-if="form.Course.DiscountValue && form.Course.DiscountWays == '1001100'">¥{{form.Course.DiscountValue}}</p>
                                            <p class="price-font-2" v-else-if="form.Course.DiscountValue && form.Course.DiscountWays == '1001101'">{{form.Course.DiscountValue}}%</p>
                                        </div>
                                    </div>
                                    <div v-else>暂无</div>
                                </div>
                            </el-col>
                            <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">市场优惠:</p>
                                    <div v-if="getPreferential.mark">
                                        <el-select v-model="form.mark" size='small' clearable style="width: 145px" value-key="ID" @change="onDiscount('mark', form.mark)" @clear="onClearPreferential('mark')" :placeholder="form.mark ? form.mark.DiscountName: '请选择'">
                                            <el-option v-for="item in getPreferential.mark" :key="item.ID" :label="item.DiscountName" :value="item">
                                            </el-option>
                                        </el-select>
                                        <div v-if="form.mark" v-show="form.mark.DiscountValue">
                                            <p class="price-font-2" v-if="form.mark.DiscountValue && form.mark.DiscountWays == '1001100'">¥{{form.mark.DiscountValue}}</p>
                                            <p class="price-font-2" v-else-if="form.mark.DiscountValue && form.mark.DiscountWays == '1001101'">{{form.mark.DiscountValue}}%</p>
                                        </div>
                                    </div>
                                    <div v-else>暂无</div>
                                </div>
                            </el-col>
                            <el-col :sm="5">
                                <div>
                                    <p style="color: #3d4550">流转推荐:</p>
                                    <div v-if="getPreferential.Recommend">
                                        <el-select v-model="form.recommend" size='small' clearable style="width: 145px" value-key="ID" @change="onDiscount('recommend', form.recommend)" @clear="onClearPreferential('recommend')" :placeholder="form.recommend ? form.recommend.DiscountName: '请选择'">
                                            <el-option v-for="item in getPreferential.Recommend" :key="item.ID" :label="item.DiscountName" :value="item">
                                            </el-option>
                                        </el-select>
                                        <div v-if="form.recommend" v-show="form.recommend.DiscountValue">
                                            <p class="price-font-2" v-if="form.recommend.DiscountValue && form.recommend.DiscountWays == '1001100'">¥{{form.recommend.DiscountValue}}</p>
                                            <p class="price-font-2" v-else-if="form.recommend.DiscountValue && form.recommend.DiscountWays == '1001101'">{{form.recommend.DiscountValue}}%</p>
                                        </div>
                                    </div>
                                    <div v-else>暂无</div>
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
                                <span>¥{{saveOrderInfo && saveOrderInfo.SourceCode == '1000442' ? (saveOrderInfo.sellPrise).toFixed(2) : totalPrise.toFixed(2)}}</span>
                            </del>
                        </div>
                    </el-col>
                    <el-col :sm="3">
                        <div style="margin-top: 25px">
                            <p>
                                <span style="color: #414852">优惠总金额:</span>
                                <span class="price-font-2">¥{{saveOrderInfo && saveOrderInfo.SourceCode == '1000442' ? (saveOrderInfo.discountPrise).toFixed(2) : (totalDiscount+selfDiscount).toFixed(2)}}</span>
                            </p>
                            <p>
                                <span style="color: #414852">报名价格:</span>
                                <span class="price-font-1">¥{{saveOrderInfo && saveOrderInfo.SourceCode == '1000442' ? SourceCount : (totalPrise-totalDiscount-selfDiscount).toFixed(2)}}</span>
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
                                <el-input style="width: 70%" placeholder="对订单进行详细描述备注" :rows="2" type="textarea" v-model="form.orderInfo.Remark"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :sm="14">
                        <el-row>
                            <el-col :sm="18">
                                <p>协议备注:</p>
                                <div>
                                    <el-form-item>
                                        <el-input style="width: 70%" placeholder="对订单进行详细描述备注" :rows="2" type="textarea" v-model="form.orderInfo.AgreementRemark"></el-input>
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
            <div style="margin-top: 20px; border-top: 10px solid #fafafa">
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
                                                    <span>{{saveOrderInfo.OrderNo}}</span>
                                                </span>
                                            </div>
                                        </el-col>
                                        <el-col :sm="12" class="t_r">
                                            <button class="orderButton-icon" @click="onRefresh">
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
                                                    <span id="copyUrl1" style="color: #38aade">{{saveOrderInfo.payUrllong}}</span>
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
                                                    <span id="copyUrl2" style="color: #38aade">{{saveOrderInfo.userAgreeUrl}}</span>
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
                            <el-col :sm="8" class="t_r">
                                <div>
                                    <span style="color: #414852">应收:</span>
                                    <span class="price-font-1">¥{{saveOrderInfo && saveOrderInfo.SourceCode == '1000442' ? SourceCount : amountReceivable}}</span>
                                </div>
                            </el-col>
                            <el-col :sm="8" class="t_r">
                                <div>
                                    <span style="color: #414852">已收:</span>
                                    <span class="price-font-2">¥ {{PayCount.toFixed(2)}}</span>
                                </div>
                            </el-col>
                            <el-col :sm="8" class="t_r">
                                <div>
                                    <span style="color: #414852">未收:</span>
                                    <span class="price-font-1">¥{{saveOrderInfo && saveOrderInfo.SourceCode == '1000442' ? (SourceCount-PayCount).toFixed(2) : amountUncollected}}</span>
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
.crm-order-create .el-input__icon+.el-input__inner {
    padding-right: 20px;
}

.order-create-form .el-form-item {
    margin-bottom: 10px;
}

.order-create-form .el-table__empty-block {
    height: 100px;
    line-height: 100px;
    overflow: hidden;
}
</style>
<script>
import { orderCourse } from '../common/orderConfig';
import { format, trim, isCardNo, isMoney } from '../../util/util';
import { UpdateOrder, SendPayUrl, GetSaveOrderInfo, GetSaveStudentInfo, GetStudentInfo, GetSchoolAreaByID, GetDictionaryByTypeId, GetDiscountByCourseType, ComputeDiscount, getCreateOrder, GetSavePaySerial,GetCurrentUserCourseTypeList } from '../../api/order';
import OrderModal from 'vueModal';
import loading from '../../containers/loading.vue';
import {GetRecommenderSearchList } from '../../api/cluesManage';
import Clipboard from 'Clipboard';
export default {
    name: 'crm-create-order',
    components: {loading},
    data() {
        return {
            isSave: false,
            isCourse: false,
            isComplete: false,
            loading: false,
            GetSaveOrderInfo: { // 获取学生信息
                emailList: [],
                phoneList: [],
                stuName: ''
            },
            loadingMsg: {
                title: '',
                loading: false
            },
            saveOrderInfo: {},
            getSchoolArea: [], // 获取所有校区
            getOrderType: [], // 订单类型
            getCourseType: [], // 报名项目
            getCertificateType: [], // 证件类型
            getProduct: [], // 已选课程
            getEarly: {},
            getPreferential: { // 获取优惠
                Recommend: [],
                mark: [],
                Course: [],
                Early: []
            },
            discountlist: [], // 已选优惠ID
            totalDiscount: 0, // 优惠金额
            totalPrise: 0, // 原价
            PayCount: 0, // 已收金额 
            amountReceivable: 0, // 应收金额
            amountUncollected: 0, // 未收金额
            productNoList: [], // 已选产品编号
            lPaymentLink: '', // 支付链接
            paySerial: [], // 收款流水
            orderNo: '', // 订单号
            initCourseType: '', // 初始化报名项目
            tableData: [],
            orderCourse,
            selfDiscount:0,//自定义金额
            SourceCount: 0, // 网校金额
            progressText: [
                {
                    text: '客户信息确认',
                    currentLine: 'bar-line-current',
                    currentDot: 'bar-dot-current',
                    currentText: 'current-text',
                    isCustomerConfirm: true
                }, {
                    text: '选购课程及优惠',
                    currentLine: 'bar-line-current',
                    currentDot: 'bar-dot-current',
                    currentText: 'current-text',
                    isAddCourse: false
                }, {
                    text: '订单收款辅助',
                    currentLine: 'bar-line-current',
                    currentDot: 'bar-dot-current',
                    currentText: 'current-text',
                    isOrderAffirm: false
                }, {
                    text: '审核记录',
                    currentLine: '',
                    currentDot: '',
                    currentText: '',
                }
            ],
            preferential: {
                recommend: '',
                mark: '',
                course: '',
                early: ''
            },
            form: {
                CourseType: '',
                CertificateType: '',
                studentInfo: {
                    TrueName: '',
                    Telphone: '',
                    Email: '',
                    CertificateNo: '',
                    IDcardFace: '',
                    UrgentName: '',
                    UrgentPhone: '',
                    SignUpSchoolID: '',
                    AttendSchoolID: '',
                    StartTime: '',
                },
                orderInfo: {
                    OrderType: '',
                    IsDeposit: 0,
                    OrderNo: '',
                    DepositAmount: '',
                    Remark: '',
                    AgreementRemark: '',
                    Recommender:"",
                    RecommenderName: ""
                },
                Course: {},
                Early: {},
                mark: {},
                recommend: {},
                selfAmount:0,//自定义金额
            },

            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    methods: {
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
        selectRecommender(queryString, cb) {
            if (queryString.length >= 2) {
                clearTimeout(this.delay);
                this.delay = setTimeout(() => {
                GetRecommenderSearchList({ SearchKey: queryString }).then(ret => {
                    if (ret.status === 0) {
                        //debugger;
                        let restaurants = ret.result;
                        let results = queryString? restaurants.filter(this.createRecommendStateFilter(queryString)): restaurants;
                        cb(results);
                    }
                });
                }, 300);
            }
        },
        handleSelectRecommend(item) {
            this.form.orderInfo.Recommender = item.Id;
        },
        createRecommendStateFilter(queryString) {
            return restaurant => {
                return (
                restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===0
                );
            };
        },
        onSaveForm() {
            const {
                TrueName,
                Telphone,
                Email,
                OrderType,
                CertificateNo,
                IDcardFace,
                UrgentName,
                UrgentPhone,
                SignUpSchoolID,
                AttendSchoolID,
                StartTime,
                IsDeposit,
                Remark,
                AgreementRemark,
                DepositAmount,
                Recommender
            } = Object.assign(this.form.studentInfo, this.form.orderInfo);
            this.discountlist = [];
            for (let i in this.preferential) {
                this.discountlist.push(this.preferential[i]);
            }
            let objParams = {
                orderinfo: {
                    OrderNo: this.saveOrderInfo.OrderNo,
                    ClueGuid: this.$route.query.Guid,
                    OrderType,
                    IsDeposit,
                    DepositAmount,
                    IsNeedAudit: 0,
                    AuditInformationUrl: '',
                    AgreementRemark,
                    Remark,
                    CourseType: this.form.CourseType,
                    Recommender,
                    SelfAmount:this.selfDiscount
                },
                stuinfo: {
                    StudentGuid: '',
                    TrueName,
                    Telphone,
                    Email,
                    CertificateType: this.form.CertificateType,
                    CertificateNo,
                    IDcardFace,
                    UrgentName,
                    UrgentPhone,
                    SignUpSchoolID,
                    AttendSchoolID,
                    StartTime: format(StartTime),
                    Create_Time: '',
                    Create_By: '',
                },
                productNoList: this.productNoList,
                discountList: this.getProduct.length ? this.discountlist : [],
            }
            if (this.form.orderInfo.IsDeposit == 0) {
                if (!this.productNoList.length) {
                    this.$message({
                        message: '请添加课程',
                        type: 'warning'
                    });
                    return;
                }
            }
            if (!trim(TrueName)) {
                this.$message({
                    message: '姓名不能为空',
                    type: 'warning'
                });
                return;
            }
            if ((this.form.CertificateType == 1000200) && isCardNo(CertificateNo)) {
                this.$message({
                    message: '身份证号码不合法',
                    type: 'warning'
                });
                return;
            } else if (!trim(CertificateNo)) {
                this.$message({
                    message: '证件号码不能为空',
                    type: 'warning'
                });
                return;
            }
            if (!trim(UrgentName)) {
                this.$message({
                    message: '紧急联系人不能为空',
                    type: 'warning'
                });
                return;
            }
            if (!trim(UrgentPhone)) {
                this.$message({
                    message: '紧急联系人电话不能为空',
                    type: 'warning'
                });
                return;
            }
            if ((IsDeposit == 1) && (!isMoney(DepositAmount))) {
                this.$message({
                    message: '请输入合法的金额',
                    type: 'warning'
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
            this.loadingMsg.loading = true;
            UpdateOrder(objParams).then(ret => { // 保存并生成支付链接
                if (ret.status === 0) {
                    this.saveOrderInfo = ret.result;
                    this.loadingMsg.loading = false;
                    this.isSave = true;
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.onGetSaveOrderInfo();
                } else {
                    this.loadingMsg.loading = false;
                }
            });
        },
        onSendPayUrl() { // 发送短信
            SendPayUrl({ orderNo: this.form.orderInfo.OrderNo }).then(ret => {
                if (ret.status === 0) {
                    this.$message({
                        message: '短信已发送',
                        type: 'success'
                    });
                }
            });
        },
        onCourseType(val) { // 报名项目
            this.onByCourseType({ coursetype: val });
        },
        addCourse(e) {
            e.stopPropagation();
            this.$store.dispatch('selectedProduct', this.getProduct);
            require.ensure([], (require) => {
                let OrderModuleCourse = require("./OrderModalCourse.vue");
                OrderModal.openComponent(OrderModuleCourse, {
                    title: '课程选择',
                    showCancelButton: true,
                    showConfirmButton: true,
                    width: '870px',
                    self: this,
                    setProduct: this.getProduct,
                    CourseType: this.form.CourseType,
                    callback: (flag, self) => {
                        if (flag === 'confirm') {
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
                                    message: '请先选择课程',
                                    type: 'warning'
                                });
                                return false;
                            }
                        }
                    }
                })
            }, 'orderModuleCourse');
        },
        onDiscount(type, ids) { // 已选优惠项
            this.preferential[type] = ids.ID;
            setTimeout(()=>{
                this.onComputeDiscount();
            },300);
            
        },
        onClearPreferential(type) { // 清空已选的优惠 
            this.preferential[type] = '';
        },
        onComputeDiscount() { // 调用各项的优惠信息接口
            this.discountlist = [];
            for (let i in this.preferential) {
                this.discountlist.push(this.preferential[i]);
            }
            let params = {
                productlist: this.productNoList,
                discountlist: this.discountlist
            }
            ComputeDiscount(params).then(ret => {
                if (ret.status === 0) {
                    this.totalDiscount = ret.result;
                }
            })
        },
        deleteRow(index, rows) { // 删除已选的课程
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
            require.ensure([], (require) => {
                let ProductDetail = require("./OrderModalProductDetail.vue");
                OrderModal.openComponent(ProductDetail, {
                    title: '产品包明细',
                    showCancelButton: true,
                    showConfirmButton: true,
                    width: '865px',
                    self: this,
                    orderNo: rows[index].id,
                    callback: (flag, self) => {
                        if (flag === 'confirm') {
                        }
                    }
                })
            }, 'productDetail');
        },
        onByCourseType(params) { // 获取产品信息 根据项目类型
            GetDiscountByCourseType(params).then(ret => {
                if (ret.status === 0) {
                    this.getPreferential = ret.result;
                }
            });
        },
        onGetSavePaySerial() {
            this.loadingMsg.loading = true;
            GetSavePaySerial({ orderNo: this.$route.query.OrderNo }).then(ret => { // 收款流水
                if (ret.status === 0) {
                    this.paySerial = ret.result;
                    this.loadingMsg.loading = false;
                    this.PayCount = 0;
                    if (this.paySerial) {
                        for (let i = 0; i < this.paySerial.length; i++) {
                            this.PayCount += Number(this.paySerial[i].PayCount);
                        }
                    }
                } else {
                    this.loadingMsg.loading = false;
                }
            }).catch(() => {
                this.loadingMsg.loading = false;
            });
        },
        onRefresh(event) { // 刷新支付流水
            event.preventDefault();
            this.onGetSavePaySerial();
        },

        onGetStudentInfo() {
            this.loadingMsg.loading = true;
            GetStudentInfo({ clueGuid: this.$route.query.Guid }).then(ret => {  // 获取学生信息
                if (ret.status === 0) {
                    this.GetSaveOrderInfo = ret.result;
                    this.loadingMsg.loading = false;
                } else {
                    this.loadingMsg.loading = false;
                }
            }).catch(() => {
                this.loadingMsg.loading = false;
            });
        },
        onGetSaveStudentInfo() {
            this.loadingMsg.loading = true;
            GetSaveStudentInfo({ orderNo: this.$route.query.OrderNo }).then(ret => {  // 获取保存后的学生信息
                if (ret.status === 0) {
                    this.form.studentInfo = ret.result;
                    this.form.CertificateType = ret.result.CertificateType && ret.result.CertificateType.toString();
                    this.loadingMsg.loading = false;
                } else {
                    this.loadingMsg.loading = false;
                }
            }).catch(() => {
                this.loadingMsg.loading = false;
            });
        },
        onGetSaveOrderInfo() {
            GetSaveOrderInfo({ orderNo: this.$route.query.OrderNo }).then(ret => {  // 获取保存后的订单信息
                if (ret.status === 0) {
                    this.saveOrderInfo = ret.result;
                    this.SourceCount = (Number(this.saveOrderInfo.sellPrise) - Number(this.saveOrderInfo.discountPrise)).toFixed(2);
                    this.getProduct = ret.result.productList;
                    this.totalPrise = 0;
                    this.productNoList = [];
                    this.form.orderInfo = ret.result;
                    this.form.orderInfo.OrderType = ret.result.OrderType.toString();
                    this.form.orderInfo.IsDeposit = ret.result.IsDeposit.toString();
                    for (let i = 0; i < this.getProduct.length; i++) {
                        this.totalPrise += Number(this.getProduct[i].sellPrise);
                        this.productNoList.push(this.getProduct[i].productNo);
                    }
                    let discount = ret.result.discount;
                    this.form.CourseType = ret.result.couseType && ret.result.couseType.toString();
                    this.form.Course = discount.Course&&discount.Course.length>0 ? discount.Course[0] : '';
                    this.form.Early= discount.Early&&discount.Early.length>0  ? discount.Early[0] : '';
                    this.form.mark = discount.mark&&discount.mark.length>0 ? discount.mark[0] : '';
                    this.form.recommend = discount.Recommend&&discount.Recommend.length>0 ? discount.Recommend[0] : '';
                    this.preferential = {
                        recommend: discount.Recommend&&discount.Recommend.length>0 ? discount.Recommend[0].ID : '',
                        mark: discount.mark&&discount.mark.length>0 ? discount.mark[0].ID : '',
                        course: discount.Course&&discount.Course.length>0 ? discount.Course[0].ID : '',
                        early: discount.Early&&discount.Early.length>0 ? discount.Early[0].ID : ''
                    };
                    this.form.orderInfo.Recommender=ret.result.Recommender;
                    this.form.orderInfo.RecommenderName=ret.result.RecommenderName;
                    this.form.selfAmount=ret.result.SelfAmount;
                    this.selfDiscount=ret.result.SelfAmount;
                }
            })
        },
         copyClipboard(bntId, urlId) {
            const self = this;
            const clipboard = new Clipboard(bntId, { // 复制地址
                target: function() {
                    return document.querySelector(urlId);
                }
            });
            clipboard.on('success', function() {
                self.$message({
                    message: '地址已复制成功',
                    type: 'success'
                });
            });
            clipboard.on('error', function() {
                self.$message({
                    message: '地址复制失败，可尝试手动复制',
                    type: 'error'
                });
            })
        }
    },
    mounted() {
        this.copyClipboard('#copyPayment', '#copyUrl1');
        this.copyClipboard('#copyUserAgree', '#copyUrl2');
    },
    updated() {
        if (this.getProduct.length) {
            this.isCourse = true;
        } else {
            this.isCourse = false;
        }
        if (this.form.orderInfo.IsDeposit == 1) { // 应收金额 
            this.amountReceivable = Number(this.form.orderInfo.DepositAmount).toFixed(2);
        } else {
            this.amountReceivable = Number(this.totalPrise - this.totalDiscount-this.selfDiscount).toFixed(2);
        }
        this.amountUncollected = Number(this.amountReceivable - this.PayCount).toFixed(2); // 未收金额

    },
    created() {
        this.onGetSavePaySerial();
        this.onGetStudentInfo(); // 获取学生信息
        this.onGetSaveStudentInfo(); // 获取保存后的学生信息
        this.onGetSaveOrderInfo(); // 获取保存后的订单信息

        GetSchoolAreaByID().then(ret => { // 获取所有校区
            if (ret.status === 0) {
                this.getSchoolArea = ret.result;
            }
        });
        GetDictionaryByTypeId({ dicType: '10035' }).then(ret => {  // 订单类型
            if (ret.status === 0) {
                this.getOrderType = ret.result;
            }
        });
        GetDictionaryByTypeId({ dicType: '10026' }).then(ret => { // 证件类型
            if (ret.status === 0) {
                this.getCertificateType = ret.result;
            }
        });
        GetCurrentUserCourseTypeList().then(ret => { // 报名项目
            if (ret.status === 0) {
                this.getCourseType = ret.result;
            }
        });
    }
}
</script>
