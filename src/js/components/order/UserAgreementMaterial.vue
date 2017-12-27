<template>
    <div v-loading="loading">
        <div v-if="isShowMain">
            <div class="content-box-show m-top">
                <el-row>
                    <el-col :sm="24" class="contact-title">
                        <p>客户信息</p>
                    </el-col>
                </el-row>
                <el-row style="padding-left:15px; margin-top:28px;font-size:14px;">
                    <el-col :sm="24">
                        <span>订单号：</span>
                        <span>{{this.orderNo}}</span>
                    </el-col>
                </el-row>
                <el-row style="padding-left:15px; margin-top:28px;font-size:14px;">
                    <el-col :sm="6">
                        <span>姓名：</span>
                        <span class="m-lable">{{this.CustomerName}}</span>
                    </el-col>
                    <el-col :sm="6">
                        <span>联系电话：</span>
                        <span class="m-lable">{{this.Phone}}</span>
                    </el-col>
                    <el-col :sm="6">
                        <span>证件类型：</span>
                        <span class="m-lable">{{this.CertificateType}}</span>
                    </el-col>
                    <el-col :sm="6">
                        <span>证件号码：</span>
                        <span class="m-lable">{{this.CertificateNo}}</span>
                    </el-col>
                </el-row>
            </div>
            <div class="content-box-show m-middle">
                <el-row>
                    <el-col :sm="24" class="contact-title">
                        <p>协议确认</p>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top:20px;">
                    <el-col :sm="8" v-for="itm in Agreements" style="padding-top:10px;" :key="itm.Id">
                        <div class="m-confirm-area m-area">
                            <el-row>
                                <el-col :sm="24" class="m-agree">
                                    <span class="m-middle-title sp-agree-title">
                                        <a :href="(itm.ConfirmStatus==0&&itm.UserAgreementType==2)?[`${itm.AgreementUrl}&idCard=${form.cardNo}`]:itm.AgreementUrl" target="_blank" :title="itm.AgreementName"> 《{{itm.AgreementName}}》</a>
                                    </span>
                                </el-col>
                            </el-row>
                            <el-row v-if="!itm.IsUserRegier">
                                <el-col :sm="24" class="m-status">
                                    <span>状态:</span>
                                    <span class="m-lable">{{itm.ConfirmStatus==0?'未确认':'已确认'}}</span>
                                    <el-button type="primary" :disabled="itm.ConfirmStatus!=0||orderStatus==1000427" size="small" @click="confirmAgree(itm.Id,itm.UserAgreementType)" style="width:70px;margin-left:24px;">确认</el-button>
                                </el-col>
                            </el-row>
                            <el-row v-if="itm.ConfirmStatus==1&&!itm.IsUserRegier">
                                <el-col :sm="24" class="m-confirm-time">
                                    <span>确认时间:</span>
                                    <span class="m-lable">{{itm.ConfirmTime}}</span>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="content-box-show m-bottom">
                <el-row>
                    <el-col :sm="24" class="contact-title">
                        <p>资料上传</p>
                    </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-top:20px;">
                    <el-col :sm="8">
                        <div class="m-area m-bottom-fileadd" style="position:relative;">
                            <div style="width:100%;height:100%;" v-if="this.faceShow">
                                <img v-show="IDcardFace" class="m-pic-priview" :src="IDcardFace" />
                                <el-upload v-show="!IDcardFace" :data="fileFormData" style="height:100%;" ref="uploadface" :action="materialUpload" :show-file-list="false" :on-preview="handlePictureCardPreview" :before-upload="beforeFaceUpload" :on-success="faceSuccess" :on-change="uploadFaceChange" :auto-upload="false">
                                    <!-- <i class="el-icon-plus"></i> -->
                                    <div class="m-bottom-fileadd" style="width:250px;height:150px;">
                                        <span class="sp-upload-word">上传身份证正面</span>
                                    </div>
                                </el-upload>
                            </div>
                        </div>
                        <div style="margin-top:18px;text-align:center;">
                            <el-button type="primary" size="small" style="width:60px;" @click="uploadFile(1)" v-show="!hasFaceUpload&&orderStatus!=1000427">上传</el-button>
                            <el-button type="primary" size="small" style="width:60px;" v-show="IDcardFace&&hasFaceUpload">
                                <a :href="IDcardFace" target="_blank">
                                    预览
                                </a>
                            </el-button>
                            <el-button v-show="IDcardFace&&orderStatus!=1000427" type="text" size="small" class="m-btn-text" @click="removeFile(1)" style="border-color: #20a0ff;">删除</el-button>
                        </div>
                    </el-col>
                    <el-col :sm="8">
                        <div class="m-area" style="position:relative;">
                            <div style="width:100%;height:100%;" v-if="this.backShow">
                                <img class="m-pic-priview" :src="IDcardBack" v-show="IDcardBack" />
                                <el-upload v-show="!IDcardBack" :data="fileFormData" style="height:100%;" ref="uploadback" :action="materialUpload" :show-file-list="false" :on-change="uploadBackChange" :on-success="backSuccess" :before-upload="beforeFaceUpload" :auto-upload="false">
                                    <!-- <i class="el-icon-plus"></i> -->
                                    <div class="m-bottom-fileadd" style="width:250px;height:150px;">
                                        <span class="sp-upload-word">上传身份证反面</span>
                                    </div>
                                </el-upload>
                            </div>
                        </div>
                        <div style="margin-top:18px;text-align:center;">
                            <el-button type="primary" size="small" style="width:60px;" @click="uploadFile(2)" v-show="!hasBackUpload&&orderStatus!=1000427">上传</el-button>
                            <el-button type="primary" size="small" style="width:60px;" v-show="IDcardBack&&hasBackUpload">
                                <a :href="IDcardBack" target="_blank">
                                    预览
                                </a>
                            </el-button>
                            <el-button v-show="IDcardBack&&orderStatus!=1000427" type="text" size="small" class="m-btn-text" @click="removeFile(2)" style="border-color: #20a0ff;">删除</el-button>
                        </div>
                    </el-col>
                    <el-col :sm="8">
                        <div :class="[AuditInformationUrl?picClass.dicActive:picClass.dicUnActive,'m-area']" style="position:relative;">
                            <div style="width:100%;height:100%;" v-if="this.zipShow">
                                <el-upload v-show="!AuditInformationUrl" :data="fileFormData" style="height:100%;" ref="uploadzip" :action="materialUpload" :show-file-list="false" :on-change="uploadZipChange" :before-upload="beforeZipUpload" :on-success="zipSuccess" :auto-upload="false">
                                    <!-- <i class="el-icon-plus"></i> -->
                                    <div style="width:250px;height:150px;">

                                    </div>
                                </el-upload>
                                <div style="width:100%;height:100%">
                                </div>
                                <span class="sp-upload-word sp-file-name-overflow" :title="zipFileName">{{AuditInformationUrl?zipFileName:'上传其他资料包'}}</span>
                            </div>
                        </div>
                        <div style="margin-top:18px;text-align:center;">
                            <el-button type="primary" size="small" style="width:60px;" @click="uploadFile(3)" v-show="!hasZipUpload&&orderStatus!=1000427">上传</el-button>
                            <el-button type="primary" size="small" style="width:60px;" v-show="AuditInformationUrl&&hasZipUpload">
                                <a :href="AuditInformationUrl" target="_blank">
                                    下载
                                </a>
                            </el-button>
                            <el-button v-show="AuditInformationUrl&&orderStatus!=1000427" type="text" size="small" class="m-btn-text" @click="removeFile(3)" style="border-color: #20a0ff;">删除</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-dialog title="" size="mini" :visible.sync="dialogFormVisible">
            <div style="width:330px;">
                <el-form :model="form">
                    <div style="text-align:center;font-size:16px;">
                        请输入预留证件号码，验证身份：
                    </div>
                    <div class="m-dialog">
                        <el-form-item>
                            <el-input v-model="form.cardNo" auto-complete="off" style="width:220px;"></el-input>
                        </el-form-item>
                    </div>
                    <div class="m-dialog">
                        <el-button type="primary" @click="queryOrderInfo" size="small" style="width:60px;">确 定</el-button>
                        <el-button @click="dialogFormVisible = false" size="small" style="width:60px;">取 消</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>
.m-top {
    height: 155px;
    margin: 10px 10px 0 10px;
}

.m-lable {
    color: #8c9eb2;
}

.m-agree {
    text-align: center;
    margin-top: 33px;
}

.m-btn-text {
    width: 60px;
    margin-left: 24px;
    border: 1px solid #c4c4c4
}

.m-status {
    margin-top: 19px;
    font-size: 14px;
    padding-left: 35px;
}

.m-confirm-time {
    font-size: 12px;
    padding-left: 35px;
    margin-top: 15px;
}

.m-middle {
    min-height: 235px;
    margin: 10px 10px 0 10px;
}

.m-bottom {
    height: 280px;
    margin: 10px 10px 0 10px;
}

.m-pic-priview {
    width: 185px;
    height: 110px;
    border: 0px;
    margin: 18px 33px 18px 33px;
}

.m-dialog {
    text-align: center;
    margin-top: 27px;
}

.m-area {
    width: 250px;
    height: 150px;
    border: 2px dashed #e4e9ef;
    border-radius: 10px;
    margin: 0 auto;
}

.m-confirm-area {
    background-color: #eff7fb;
}

.m-middle-title {
    border-bottom: 2px solid #379ed7;
    font-size: 16px;
    color: #379ed7;
}

.m-bottom-fileadd {
    background: url(../../../images/pic_add.png);
    background-position: center;
    background-repeat: no-repeat;
}

.m-bottom-dic-active {
    background: url(../../../images/dic_active.png);
    background-position: center;
    background-repeat: no-repeat;
}

.m-bottom-dic-unactive {
    background: url(../../../images/dic_unactive.png);
    background-position: center;
    background-repeat: no-repeat;
}

.sp-upload-word {
    top: 110px;
    left: 80px;
    z-index: 1000;
    position: absolute;
    color: #93a4b7;
    font-size: 12px;
}

.sp-file-name-overflow {
    display: inline-block;
    width: 150px;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.m-middle-title a:visited,
a:hover,
a:active,
a:link {
    color: #379ed7;
}

.el-button--small a:visited {
    color: #ffffff;
}

.el-button--small a:hover {
    color: #ffffff;
}

.el-button--small a:active a:active {
    color: #ffffff;
}

.el-button--small a:link {
    color: #ffffff;
}

.el-dialog--mini .el-dialog__header {
    padding: 20px 20px 0;
}

.sp-agree-title {
    display: inline-block;
    width: 215px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
<style>
.el-upload--picture-card {
    width: 100%;
    height: 100%;
    border: 0px;
    background: url(../../../images/pic_add.png);
    background-position: center;
    background-repeat: no-repeat;
}
</style>
<script>
import Vue from 'vue';
import { post } from '../../util/crmAxios';
import { Form, Input, FormItem, Button, Message, Loading } from 'element-ui';
import { getOrderInfoByCardId, confirmAgreement, removeUploadFile } from '../../api/anonymous';
import { getCookie } from 'cookieUtils';
import { CRM_TOKEN } from '../../util/keys';
import { getBaseUrl } from '../../util/config';
export default {
    data: function() {
        return {
            dialogFormVisible: true,
            isShowMain: false,
            liveUrl: "",
            invitationId: "",
            orderNo: "",
            orderStatus: 0,
            loading: false,
            Agreements: [],
            IDcardFace: "",
            IDcardBack: "",
            AuditInformationUrl: "",
            apiHeader: {},
            hasFaceUpload: true,
            hasBackUpload: true,
            hasZipUpload: true,
            faceShow: true,
            backShow: true,
            zipShow: true,
            zipFileName: "",
            CustomerName: "",
            Phone: "",
            CertificateType: "",
            CertificateNo: "",
            fileFormData: {
                OrderNo: "",
                FileType: 1
            },
            picClass: {
                dicActive: "m-bottom-dic-active",
                dicUnActive: "m-bottom-dic-unactive",
                areaClass: "m-area"
            },
            form: {
                cardNo: ""
            }
        }
    },
    methods: {
        handlePictureCardPreview(file) {

        },
        beforeFaceUpload(file) {

        },
        beforeZipUpload(file) {
            let isLt2M = file.size / 1024 / 1024 < 4;
            if (!isLt2M) {
                Message({
                    message: '上传文件大小不能超过 4MB!',
                    showClose: true,
                    type: 'warning'
                });
            }
            return isLt2M;
        },
        checkFile(file, msxSize, fileType) {
            if (!file) {
                return false;
            }
            let isJPG = true;
            let fileExt = this.getFileExt(file.name);
            if (fileType == 1) {
                isJPG = (fileExt == ".jpg" || fileExt == ".jpeg" || fileExt == ".png");
                if (!isJPG) {
                    Message({
                        message: '上传图片格式错误!',
                        showClose: true,
                        type: 'warning'
                    });
                    return false;
                }
            }
            else if (fileType == 2) {
                isJPG = (fileExt == ".zip" || fileExt == ".rar" || fileExt == ".7z");
                if (!isJPG) {
                    Message({
                        message: '请上传文件压缩包!',
                        showClose: true,
                        type: 'warning'
                    });
                    return false;
                }
            }
            let isLt2M = file.size / 1024 / 1024 < msxSize;
            if (!isLt2M) {
                Message({
                    message: "上传图片大小不能超过 " + msxSize + "MB!",
                    showClose: true,
                    type: 'warning'
                });
                return false;
            }
            return isJPG & isLt2M;
        },
        getFileExt(str) {
            var d = /\.[^\.]+$/.exec(str);
            if (d && d.length > 0) {
                return d[0];
            }
            return "";
        },
        getFileName(str) {
            if (!str) {
                return str;
            }
            var retStr = str.substring(str.lastIndexOf('/') + 1);
            return retStr;
        },
        uploadFaceChange(file, fileList) {
            if (!this.checkFile(file, 1, 1)) {
                this.clearFiles(1);
                return;
            }
            if (file.status == "ready") {
                this.IDcardFace = file.url;
                this.hasFaceUpload = false;
            }

        },
        uploadBackChange(file, fileList) {
            if (!this.checkFile(file, 1, 1)) {
                this.clearFiles(2);
                return;
            }
            if (file.status == "ready") {
                this.IDcardBack = file.url;
                this.hasBackUpload = false;
            }

        },
        uploadZipChange(file, fileList) {
            if (!this.checkFile(file, 4, 2)) {
                this.clearFiles(3);
                return;
            }
            if (file.status == "ready") {
                this.AuditInformationUrl = file.url;
                this.hasZipUpload = false;
                this.zipFileName = file.name;
            }

        },
        faceSuccess(response, file, fileList) {
            if (response) {
                if (response.status != 0) {
                    Message({
                        message: response.info,
                        showClose: true,
                        type: 'warning'
                    });
                    this.hasFaceUpload = true;
                    this.IDcardFace = "";
                }
                else {
                    this.hasFaceUpload = true;
                    this.IDcardFace = response.result.FileUrl;
                }

            }

        },
        backSuccess(response, file, fileList) {
            if (response) {
                if (response.status != 0) {
                    Message({
                        message: response.info,
                        showClose: true,
                        type: 'warning'
                    });
                    this.hasBackUpload = true;
                    this.IDcardBack = "";
                }
                else {
                    this.hasBackUpload = true;
                    this.IDcardBack = response.result.FileUrl;
                }

            }
        },
        zipSuccess(response, file, fileList) {
            if (response) {
                if (response.status != 0) {
                    Message({
                        message: response.info,
                        showClose: true,
                        type: 'warning'
                    });
                    this.hasZipUpload = true;
                    this.AuditInformationUrl = "";
                }
                else {
                    this.hasZipUpload = true;
                    this.AuditInformationUrl = response.result.FileUrl;
                }

            }
        },
        uploadFile(fileType) {
            this.fileFormData.FileType = fileType;
            switch (fileType) {
                case 1:
                    this.$refs.uploadface.submit();
                    break;
                case 2:
                    this.$refs.uploadback.submit();
                    break;
                case 3:
                    this.$refs.uploadzip.submit();
                    break;
            }

        },
        getOrderInfo() {//根据证件号码获取订单信息
            let params = {
                "OrderNo": this.orderNo,
                "CardNo": this.form.cardNo
            }
            this.loading = true;
            getOrderInfoByCardId(params).then(ret => {
                this.loading = false;
                if (ret.data.status === 0) {
                    let orderInfo = ret.data.result;
                    this.CustomerName = orderInfo.CustomerName;
                    this.Phone = orderInfo.Phone;
                    this.CertificateType = orderInfo.CertificateType;
                    this.CertificateNo = orderInfo.CertificateNo;
                    this.Agreements = orderInfo.Agreements;
                    this.IDcardFace = orderInfo.IDcardFace;
                    this.IDcardBack = orderInfo.IDcardBack;
                    this.AuditInformationUrl = orderInfo.AuditInformationUrl;
                    this.zipFileName = this.getFileName(this.AuditInformationUrl);
                    this.orderStatus = orderInfo.OrderStatus;
                    if (this.$route.query.orderNo == orderInfo.OrderNo) {
                        this.isShowMain = true;
                        this.dialogFormVisible = false;
                    }

                } else {
                    Message({
                        message: ret.data.info,
                        showClose: true,
                        type: 'warning'
                    });
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        confirmAgree(val,agreeType) {
            let params = {
                "AgreeId": val,
                "AgreeType":agreeType,
                "OrderNo":this.orderNo
            }
            this.loading = true;
            confirmAgreement(params).then(ret => {
                this.loading = false;
                if (ret.data.status === 0) {
                    this.Agreements.forEach(c => {
                        if (c.Id == val) {
                            c.ConfirmStatus = ret.data.result.ConfirmStatus;
                            c.ConfirmTime = ret.data.result.ConfirmTime;
                            if(ret.data.result.AgreementUrl){
                                c.AgreementUrl=ret.data.result.AgreementUrl;
                            }
                        }
                    });
                } else {
                    Message({
                        message: ret.data.info,
                        showClose: true,
                        type: 'warning'
                    });
                }
            }).catch(() => {this.loading = false; });
        },
        queryOrderInfo() {//查询订单信息
            if (!this.form.cardNo) {
                Message({
                    message: "请输入证件号码",
                    showClose: true,
                    type: 'warning'
                });
            }
            this.getOrderInfo();
        },
        removeFile(fileType) {//删除文件
            let params = {
                "FileType": fileType,
                "OrderNo": this.orderNo
            }
            this.clearFiles(fileType);
            if (this.removeLocalFile(fileType)) {
                return;
            }
            removeUploadFile(params).then(ret => {
                if (ret.data.status === 0) {
                    this.clearFiles(fileType)
                    switch (fileType) {
                        case 1:
                            this.IDcardFace = "";
                            this.hasFaceUpload = true;
                            break;
                        case 2:
                            this.IDcardBack = "";
                            this.hasBackUpload = true;
                            break;
                        case 3:
                            this.AuditInformationUrl = "";
                            this.hasZipUpload = true;
                            break;
                    }
                } else {
                    Message({
                        message: ret.data.info,
                        showClose: true,
                        type: 'warning'
                    });
                }
            }).catch(() => { });
            //removeUploadFile
        },
        removeLocalFile(fileType) {
            switch (fileType) {
                case 1:
                    if (!this.hasFaceUpload) {
                        this.IDcardFace = "";
                        this.hasFaceUpload = true;
                        return true;
                    }
                    break;
                case 2:
                    if (!this.hasBackUpload) {
                        this.IDcardBack = "";
                        this.hasBackUpload = true;
                        return true;
                    }
                    break;
                case 3:
                    if (!this.hasZipUpload) {
                        this.AuditInformationUrl = "";
                        this.hasZipUpload = true;
                        return true;
                    }
                    break;
            }
            return false;
        },
        clearFiles(fileType) {
            switch (fileType) {
                case 1:
                    this.faceShow = false;
                    setTimeout(() => { this.faceShow = true; }, 200);
                    break;
                case 2:
                    this.backShow = false;
                    setTimeout(() => { this.backShow = true; }, 200);
                    break;
                case 3:
                    this.zipShow = false;
                    setTimeout(() => { this.zipShow = true; }, 200);
                    break;
            }
        }
    },
    computed: {
        materialUpload() {
            return getBaseUrl() + '/Agreement/MaterialUpload';
        }
    },
    created() {
        this.orderNo = this.$route.query.orderNo;
        if (!this.orderNo) {
            this.dialogFormVisible = false;
        }
        //this.getOrderInfo();
        this.fileFormData.OrderNo = this.orderNo;
        let GDSID = getCookie('GDSID');
        let token = 'Bearer ' + getCookie(CRM_TOKEN);
        this.apiHeader = { Authorization: token, GDSID: GDSID };
    },
    mounted() {

    }
}
</script>