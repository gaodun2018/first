<template>
    <div class="crm-order-create order-audit-manage">
        <loading :loadingMsg="loadingMsg"></loading>
        <div style="border-bottom: 10px solid #fafafa">
            <el-row style="padding: 15px 105px;line-height: 22px">
                <el-col v-for="item in progressText" :key="item.text" :sm="6">
                    <div class="order-progress-bar">
                        <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
                        <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
                        <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-form :model="form" :rules="rules" ref="form">
            <div>
                <div class="order-create-form">
                    <p class="tracking-clues-information" style="margin-bottom: 20px">客户订单信息</p>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="姓名">
                                <el-input disabled v-model="form.studentInfo.TrueName" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="手机">
                                <el-input disabled v-model="form.studentInfo.Telphone" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="电子邮箱">
                                <el-input disabled v-model="form.studentInfo.Email" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="订单类型">
                                <el-select placeholder="" disabled v-model="form.orderInfo.OrderType" size='small' style="width: 170px">
                                    <el-option v-for="item in getOrderType" :key="item.Id" :label="item.Name" :value="item.Id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="证件类型">
                                <el-select placeholder="" disabled v-model="form.studentInfo.CertificateType" size='small' style="width: 170px">
                                    <el-option v-for="item in getCertificateType" :key="item.Id" :label="item.Name" :value="item.Id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="证件号码">
                                <el-input disabled v-model="form.studentInfo.CertificateNo" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="紧急联系人">
                                <el-input disabled v-model="form.studentInfo.UrgentName" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="紧急联系人电话">
                                <el-input disabled v-model="form.studentInfo.UrgentPhone" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="报名项目">
                                <el-select disabled v-model="form.studentInfo.CourseType" size='small' style="width: 170px" @change="onCourseType">
                                    <el-option v-for="item in getCourseType" :key="item.Id" :label="item.Name" :value="item.Id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="报名校区">
                                <el-select placeholder="" disabled v-model="form.studentInfo.SignUpSchoolID" size='small' style="width: 170px">
                                    <el-option v-for="school in getSchoolArea" :key="school.ID" :label="(school.ProvinceName && school.ProvinceName+'-')+(school.CityName && school.CityName+'-')+school.SchoolName" :value="school.ID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="上课校区">
                                <el-select placeholder="" disabled v-model="form.studentInfo.AttendSchoolID" size='small' style="width: 170px">
                                    <el-option v-for="school in getSchoolArea" :key="school.ID" :label="(school.ProvinceName && school.ProvinceName+'-')+(school.CityName && school.CityName+'-')+school.SchoolName" :value="school.ID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="期望上课时间">
                                <el-input disabled v-model="form.studentInfo.StartTime" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="是否定金">
                                <el-radio-group disabled v-model="form.orderInfo.IsDeposit">
                                    <el-radio label="1">
                                        <span>是</span>
                                        <span v-show="form.orderInfo.IsDeposit == 1">
                                            <el-input disabled v-model="form.orderInfo.DepositAmount" style="width: 80px" size='small' placeholder="金额"></el-input>
                                            <span>元</span>
                                        </span>
                                    </el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :sm="8">
                            <el-form-item label-width="111px" label="推荐人">
                                <el-input disabled v-model="form.orderInfo.RecommenderName" style="width: 170px" size='small'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-row style="margin: 10px 10px 10px 0">
                        <el-col :span="12">
                            <p class="tracking-clues-information" style="margin-bottom: 15px">购买课程及优惠</p>
                        </el-col>
                    </el-row>
        
                    <el-table :data="getProductData" slot="empty" style="width: 98%; margin: 0 auto">
                        <el-table-column prop="productNo" label="产品ID" width="150">
                        </el-table-column>
                        <el-table-column label="课程产品名称" width="200">
                            <template scope="scope">
                                <div :class="scope.row.isPackage == 1 && 'product-package-icon'"><span style="padding-left: 20px; display: inline-block">{{scope.row.productName}}</span></div>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="item in orderCourse" :key="item.value" :prop="item.value" :label="item.name">
                        </el-table-column>
                        <el-table-column>
                            <template scope="scope">
                                <el-button v-show="scope.row.isPackage === 1" @click="productDetail(scope.$index, getProductData)" type="text" size="small">明细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="order-create-price" v-if="isDetails && getProductData.length">
                    <el-row>
                        <el-col :sm="18">
                            <el-row>
                                <el-col :sm="5">
                                    <div>
                                        <p style="color: #3d4550">早报优惠:</p>
                                        <div v-if="saveOrderInfo.Early">
                                            <div>{{saveOrderInfo.Early.DiscountName}}</div>
                                            <div v-show="saveOrderInfo.Early.DiscountValue">
                                                <p class="price-font-2" v-if="saveOrderInfo.Early.DiscountWays == '1001100'">¥{{saveOrderInfo.Early.DiscountValue}}</p>
                                                <p class="price-font-2" v-else-if="saveOrderInfo.Early.DiscountWays == '1001101'">{{saveOrderInfo.Early.DiscountValue}}%</p>
                                            </div>
                                        </div>
                                        <div v-else>暂无</div>
                                    </div>
                                </el-col>
                                <el-col :sm="5">
                                    <div>
                                        <p style="color: #3d4550">项目优惠:</p>
                                        <div v-if="saveOrderInfo.Course">
                                            <div>{{saveOrderInfo.Course.DiscountName}}</div>
                                            <div v-show="saveOrderInfo.Course.DiscountValue">
                                                <p class="price-font-2" v-if="saveOrderInfo.Course.DiscountWays == '1001100'">¥{{saveOrderInfo.Course.DiscountValue}}</p>
                                                <p class="price-font-2" v-else-if="saveOrderInfo.Course.DiscountWays == '1001101'">{{saveOrderInfo.Course.DiscountValue}}%</p>
                                            </div>
                                        </div>
                                        <div v-else>暂无</div>
                                    </div>
                                </el-col>
                                <el-col :sm="5">
                                    <div>
                                        <p style="color: #3d4550">市场优惠:</p>
                                        <div v-if="saveOrderInfo.mark">
                                            <div>{{saveOrderInfo.mark.DiscountName}}</div>
                                            <div v-show="saveOrderInfo.mark.DiscountValue">
                                                <p class="price-font-2" v-if="saveOrderInfo.mark.DiscountWays == '1001100'">¥{{saveOrderInfo.mark.DiscountValue}}</p>
                                                <p class="price-font-2" v-else-if="saveOrderInfo.mark.DiscountWays == '1001101'">{{saveOrderInfo.mark.DiscountValue}}%</p>
                                            </div>
                                        </div>
                                        <div v-else>暂无</div>
                                    </div>
                                </el-col>
                                <el-col :sm="5">
                                    <div>
                                        <p style="color: #3d4550">流转推荐:</p>
                                        <div v-if="saveOrderInfo.Recommend">
                                            <div>{{saveOrderInfo.Recommend.DiscountName}}</div>
                                            <div v-show="saveOrderInfo.Recommend.DiscountValue">
                                                <p class="price-font-2" v-if="saveOrderInfo.Recommend.DiscountWays == '1001100'">¥{{saveOrderInfo.Recommend.DiscountValue}}</p>
                                                <p class="price-font-2" v-else-if="saveOrderInfo.Recommend.DiscountWays == '1001101'">{{saveOrderInfo.Recommend.DiscountValue}}%</p>
                                            </div>
                                        </div>
                                        <div v-else>暂无</div>
                                    </div>
                                </el-col>
                                <el-col :sm="4">
                                    <div>
                                        <p style="color: #3d4550">自定义优惠:</p>
                                        <div v-if="selfAmount">
                                            <div>{{selfAmount}}</div>
                                        </div>
                                        <div v-else>暂无</div>
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
                                    <span class="price-font-2">¥{{(totalDiscount).toFixed(2)}}</span>
                                </p>
                                <p>
                                    <span style="color: #414852">报名价格:</span>
                                    <span class="price-font-1">¥{{(totalPrise-totalDiscount).toFixed(2)}}</span>
                                </p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin: 20px 0 20px 15px">
                    <el-row>
                        <div>
                            <span>订单备注：</span>
                            <span style="font-size: 12px">表格上为附加必要的注解说明而留的一栏。亦指在这一栏内所加的注解说明。很多时候网友太多，容易搞混或记错名字。</span>
                        </div>
                    </el-row>
                </div>
                <div v-show="!isDetails" style="padding: 20px 15px">
                    <el-row style="margin-bottom: 20px">
                        <el-table :data="getPaySerial" border style="width: 100%">
                            <el-table-column v-for="pay in payContent" :key="pay.prop" align="center" :prop="pay.prop" :label="pay.label">
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row>
                        <el-col :sm="2">
                            <div>证件预览 :</div>
                        </el-col>
                        <div v-if="this.form.studentInfo.IDcardFace">
                            <div style="width: 190px; height: 140px;float: left; text-align: center">
                                <img width="190px" height="110px" :src="this.form.studentInfo.IDcardFace" id="zRealImge">
                                <el-button type="text" @click="onPreview(1)">点击预览</el-button>
                            </div>
                            <div style="width: 190px; height: 140px;float: left; text-align: center;margin-left: 20px">
                                <img width="190px" height="110px" :src="this.form.studentInfo.IDcardBack" id="fRealImge">
                                <el-button type="text" @click="onPreview(2)">点击预览</el-button>
                            </div>
                        </div>
                        <div v-else>暂无</div>
                    </el-row>
                </div>
                <div v-show="isDetails" style="padding-bottom: 40px">
                    <el-row style="border-top: 10px solid #fafafa;padding: 0px 15px 0 10px">
                        <el-col :sm="14" style="padding: 20px 10px 0 0">
                            <p class="tracking-clues-information" style="margin: 0px -15px 20px -10px">审核记录</p>
                            <el-table :data="auditRecordsData" border style="width: 100%">
                                <el-table-column v-for="audit in auditRecords" :key="audit.prop" align="center" :prop="audit.prop" :label="audit.label">
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :sm="10" style="padding:20px 0 0 15px; border-left: 10px solid #fafafa">
                            <p class="tracking-clues-information" style="margin-bottom: 20px">收款流水</p>
                            <el-table :data="getPaySerial" border style="width: 100%">
                                <el-table-column align="center" width="80px">
                                    <template align="center" scope="scope">
                                        <span>{{scope.$index+1}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="PayTime" label="支付时间">
                                </el-table-column>
                                <el-table-column prop="PaySerialNo" label="收款流水">
                                </el-table-column>
                                <el-table-column align="center" prop="PayCount" label="支付金额">
                                </el-table-column>
                            </el-table>
                            <el-row style="margin-top: 15px; font-size: 14px">
                                <el-col :sm="8" class="t_r">
                                    <div>
                                        <span style="color: #414852">应收:</span>
                                        <span style="color: #d41313">¥{{amountReceivable}}</span>
                                    </div>
                                </el-col>
                                <el-col :sm="8" class="t_r">
                                    <div>
                                        <span style="color: #414852">已收:</span>
                                        <span style="color: #73bfa6">¥ {{PayCount.toFixed(2)}}</span>
                                    </div>
                                </el-col>
                                <el-col :sm="8" class="t_r">
                                    <div>
                                        <span style="color: #414852">未收:</span>
                                        <span style="color: #d41313">¥{{amountUncollected}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div style="margin-bottom: 160px" v-show="!isDetails">
                    <el-row style="border-top: 10px solid #fafafa;padding: 20px 15px 20px 10px">
                        <p class="tracking-clues-information" style="margin: 0px -15px 20px -10px">审核记录</p>
                        <el-table :data="auditRecordsData" border style="width: 100%">
                            <el-table-column v-for="audit in auditRecords" :key="audit.prop" align="center" :prop="audit.prop" :label="audit.label">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </div>
            </div>                
            <div class="audit-fixed" v-show="!isDetails">
                <el-row>
                    <el-form-item label-width="90px" label="审核结果 :" prop="AuditResult">
                        <el-select v-model="form.AuditResult" clearable size='small' style="width: 155px">
                            <el-option v-for="item in getAuditResult" v-if="item.Id !== '1000460'" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label-width="90px" label="审核意见 :" prop="Remark">
                        <el-input :rows="2.5" type="textarea" v-model="form.Remark"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item style="text-align: right">
                        <el-button :disabled="isSave ? false : true" style="width: 80px" size="small" type="primary" :loading="loading" @click="submitForm('form')">确定</el-button>
                        <el-button style="width: 80px" size="small" @click="closeForm">取消</el-button>
                    </el-form-item>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<style>
.order-audit-manage .el-table__header-wrapper table thead tr th.el-table_1_column_2 .cell {
    padding-left: 40px;
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
import Vue from 'vue';
import { productList, orderCourse, payContent, auditRecords, discountContent } from '../common/orderConfig';
import { GetStudentInfo, GetProductList, GetDictionaryByTypeId, GetSchoolAreaByID, GetSaveOrderInfo, GetSaveStudentInfo, GetReviewInfoByOrderNo, GetSavePaySerial, getSaveReview,GetCurrentUserCourseTypeList } from '../../api/order';
import OrderModal from 'vueModal';
import loading from '../../containers/loading.vue';

export default {
    name: 'crm-create-audit',
    components: {loading},
    data() {
        return {
            loading: false,
            isDetails: false,
            isSave: true,
            orderCourse,
            getSchoolArea: [], // 获取所有校区
            getOrderType: [], // 订单类型
            getCourseType: [], // 报名项目
            getCertificateType: [], // 证件类型
            getProductData: [], // 课程列表
            totalDiscount: 0, // 优惠总金额
            totalPrise: 0, // 原价
            PayCount: 0, // 已收金额
            amountReceivable: 0, // 应收金额
            amountUncollected: 0, // 未收金额
            getOrderAudit: [], // 订单审核记录
            getAuditResult: [], // 审核结果
            getPaySerial: [], // 支付流水
            saveOrderInfo: { // 获取学生信息
                Course: {},
                Early: {},
                mark: {},
                Recommend: {},
            },
            loadingMsg: {
                title: '',
                loading: false
            },
            auditRecordsData: [], // 获取审核内容
            productList,
            payContent,
            auditRecords,
            discountContent,
            selfAmount:0,
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
                    isCustomerConfirm: true                    
                }, {
                    text: '订单收款辅助',
                    currentLine: 'bar-line-current',
                    currentDot: 'bar-dot-current',
                    currentText: 'current-text',
                    isCustomerConfirm: true                    
                }, {
                    text: '审核记录',
                    currentLine: 'bar-line-current',
                    currentDot: 'bar-dot-current',
                    currentText: 'current-text',
                    isCustomerConfirm: true                    
                }
            ],
            form: {
                Course: {},
                Early: {},
                mark: {},
                recommend: {},
                Remark: '',
                AuditResult: '',
                IDcardBack: '',
                IDcardFace: '',
                studentInfo: {
                    TrueName: '',
                    Telphone: '',
                    Email: '',
                    CertificateType: '',
                    CertificateNo: '',
                    IDcardFace: '',
                    UrgentName: '',
                    UrgentPhone: '',
                    CourseType: '',
                    SignUpSchoolID: '',
                    AttendSchoolID: '',
                    StartTime: '',
                },
                orderInfo: {
                    OrderType: '',
                    IsDeposit: 0,
                    OrderNo: '',
                    DepositAmount: '',
                    payUrllong: '',
                    RecommenderName:"",
                    Recommender:""
                }
            },
            rules: {
				AuditResult: [
					{ required: true, message: ' ', trigger: 'change' }
				],
				Remark: [
					{ required: true, message: ' ', trigger: 'blur' }
				]
			}
        }
    },
    methods: {
        closeForm() {
            window.close();
        },
        submitForm(formName) {
           this.$refs[formName].validate((valid) => {
               if (valid) {
                   this.loadingMsg.loading = true;
                   let params = {
                       OrderNo: this.$route.query.OrderNo,
                       Remark: this.form.Remark,
                       Status: this.form.AuditResult
                   }
                   getSaveReview(params).then(ret => {
                       if (ret.status === 0) {
                           this.$message({
                               message: '保存成功',
                               type: 'success'
                           });
                           this.loadingMsg.loading = false;
                           this.isSave = false;
                       } else {
                           this.loadingMsg.loading = false;
                       }
                   });
               }
           })
        },
        productDetail(index, rows) {
            require.ensure([], (require) => {
                let ProductDetail = require("./OrderModalProductDetail.vue");
                OrderModal.openComponent(ProductDetail, {
                    title: '产品包明细',
                    showCancelButton: true,
                    showConfirmButton: true,
                    width: '860px',
                    self: this,
                    orderNo: rows[index].id,
                    callback: (flag, self) => {
                        if (flag === 'confirm') {
                        }
                    }
                })
            }, 'productDetail');
        },
        onPreview(img) { // 图片放大
            document.querySelector(".order-audit-preview-motai").style.display = "block";
            const previewImg = document.getElementById('previewImg');
            const zRealImge = document.getElementById('zRealImge');
            const fRealImge = document.getElementById('fRealImge');
            if (img == 1) {
                previewImg.src = zRealImge.src;
            } else if (img == 2) {
                previewImg.src = fRealImge.src;
            }
        },
        getOrderData() {
            this.loadingMsg.loading = true;
            GetSaveStudentInfo({ orderNo: this.$route.query.OrderNo }).then(ret => {  // 获取保存后的学生信息
                if (ret.status === 0) {
                    this.form.studentInfo = ret.result;
                    this.form.studentInfo.CertificateType = ret.result.CertificateType && ret.result.CertificateType.toString();
                }
            });
            GetSaveOrderInfo({ orderNo: this.$route.query.OrderNo }).then(ret => {  // 获取保存后的订单信息
                if (ret.status === 0) {
                    this.loadingMsg.loading = false;
                    const { Recommend, mark, Course, Early } = ret.result.discount;
                    this.saveOrderInfo = {
                        Recommend: Recommend && Recommend[0],
                        mark: mark && mark[0],
                        Course: Course && Course[0],
                        Early: Early && Early[0]
                    };
                    this.getProductData = ret.result.productList;
                    this.totalPrise = ret.result.sellPrise; // 订单总金额
                    this.totalDiscount = ret.result.discountPrise; // 优惠金额
                    this.productNoList = [];
                    this.form.orderInfo = ret.result;
                    this.form.orderInfo.OrderType = ret.result.OrderType.toString();
                    this.form.orderInfo.IsDeposit = ret.result.IsDeposit.toString();
                    this.form.studentInfo.CourseType = ret.result.couseType && ret.result.couseType.toString();
                    this.form.orderInfo.RecommenderName=ret.result.RecommenderName;
                    this.form.orderInfo.Recommender=ret.result.Recommender;
                    this.selfAmount=ret.result.SelfAmount;
                    for (let i = 0; i < this.getProductData.length; i++) {
                        // this.totalPrise += Number(this.getProductData[i].sellPrise);
                        this.productNoList.push(this.getProductData[i].productNo);
                    }
                } else {
                    this.loadingMsg.loading = false;
                }
                }).catch(() => {
                    this.loadingMsg.loading = false;
            });
        }
    },
    mounted() {
        const previewClose = document.getElementById('previewClose');
        previewClose.onclick = function () { // 关闭图片预览
            document.querySelector(".order-audit-preview-motai").style.display = "none";
        };
    },
    updated() {
        if (this.form.orderInfo.IsDeposit == 1) { // 应收金额 
            this.amountReceivable = (this.form.orderInfo.DepositAmount).toFixed(2);
        } else {
            this.amountReceivable = (this.totalPrise - this.totalDiscount).toFixed(2);
        }
        this.amountUncollected = (this.amountReceivable - this.PayCount).toFixed(2); // 未收金额
    },
    created() {
        this.getOrderData();
        if (this.$route.query.CanEdit == 'true' || this.$route.query.CanEdits == '1000424') {
            this.progressText[3].isCustomerConfirm = false;            
        } else {
            this.progressText[3].isCustomerConfirm = true;            
        }
        this.isDetails = this.$route.query.isDetails;
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
        GetDictionaryByTypeId({ dicType: '10038' }).then(ret => { // 审核结果
            if (ret.status === 0) {
                this.getAuditResult = ret.result;
            }
        });
        GetSavePaySerial({ orderNo: this.$route.query.OrderNo }).then(ret => { // 收款流水
            if (ret.status === 0) {
                this.getPaySerial = ret.result;
                this.PayCount = 0;
                if (this.getPaySerial) {
                    for (let i = 0; i < this.getPaySerial.length; i++) {
                        this.PayCount += Number(this.getPaySerial[i].PayCount);
                    }
                }
            }
        });
        GetReviewInfoByOrderNo({ orderNo: this.$route.query.OrderNo }).then(ret => { // 获取订单的审核记录
            if (ret.status === 0) {
                this.auditRecordsData = ret.result;
            }
        });
        
        const BODY = document.body;  // 将图片放大的元素添加的body中
        const DIV = document.createElement("div");
        DIV.innerHTML = `<div class="order-audit-preview-motai">
            <span class="previe-close" id="previewClose">×</span>
            <img class="preview-img" id="previewImg">
            <div class="caption"></div>
        </div>`;
        BODY.appendChild(DIV);
    }
}
</script>
