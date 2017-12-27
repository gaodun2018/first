<template>
    <div class="order-refund-apply">
        <el-form :model="form" ref="form" v-loading="loading">
            <el-row>
                 <el-col :sm="8">
                    <el-form-item label-width="111px" label="订单单号:">
                         <el-input disabled v-model="orderApplyInfo.OrderNo" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="学生姓名:">
                         <el-input disabled  v-model="orderApplyInfo.StudentName" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="联系电话:">
                         <el-input disabled v-model="orderApplyInfo.StudentPhone" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :sm="8">
                    <el-form-item label-width="111px" label="已收款:">
                         <el-input disabled v-model="orderApplyInfo.ReceivablesPrice" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款方式:">
                         <el-select v-model="orderApplyInfo.RefundMode" size='small' style="width: 170px">
                            <el-option v-for="item in RefundModeData" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款原因:">
                        <el-select v-model="orderApplyInfo.RefundReason" size='small' style="width: 170px">
                            <el-option v-for="item in RefundReasonData" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款账号:">
                         <el-input v-model="orderApplyInfo.RefundCode" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款金额:">
                         <el-input v-model="orderApplyInfo.RefundAmount" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label-width="111px" label="退款说明:">
                    <el-input type="textarea" v-model="orderApplyInfo.RefundRemark" size='small'></el-input>
                </el-form-item>
            </el-row>
             <el-row>
                <el-form-item style="margin-top: 10px; text-align: center">
                    <el-button style="width: 80px" size="small" type="primary" :loading="loading" @click="submitForm">保存</el-button>
                    <el-button style="width: 100px" size="small" type="primary" :loading="loading" @click="submitFormAndAudit">保存并提交审核</el-button>
                    <el-button style="width: 80px" size="small" @click="closeForm">取消</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<style>
    .order-refund-apply .el-form-item {
        margin-bottom: 10px;
    }
</style>

<script>
    import Vue from 'vue';
    import OrderModal from 'vueModal';
    import { Message } from 'element-ui';
    import {GetRefundMode,GetRefundReason,SaveRefundApply,SaveRefundApplyAndAudit} from '../../api/OrderRefund'
    export default {
        props:['orderApplyInfo','modal','self'],
        name: 'crm-create-refundapply',
        data() {
            return {
                RefundModeData:[],
                RefundReasonData:[]
            }
        },
        methods:{
            submitForm(){ //只保存
                if(!this.validateFrom()){
                    return;
                }
                //获取表单值
                let params ={
                    Id:this.orderApplyInfo.Id,
                    OrderNo:this.orderApplyInfo.OrderNo,
                    StudentName:this.orderApplyInfo.StudentName,
                    StudentPhone:this.orderApplyInfo.StudentPhone,
                    RefundType:this.orderApplyInfo.RefundType,
                    RefundMode:this.orderApplyInfo.RefundMode,
                    RefundReason:this.orderApplyInfo.RefundReason,
                    RefundCode:this.orderApplyInfo.RefundCode,
                    OrderAmount:this.orderApplyInfo.ReceivablesPrice,
                    RefundAmount:this.orderApplyInfo.RefundAmount,
                    RefundRemark:this.orderApplyInfo.RefundRemark
                }
                SaveRefundApply(params).then(ret=>{
                    if (ret.status === 0) {
                        Message({
                            message: '退款申请保存成功.',
                            showClose:true,
                            type: 'success'
                        });
                        this.modal.close();
                        self.getRefundApplys(); //刷新页面
                    };
                })
            },
            submitFormAndAudit(){ //保存并提交审核
                if(!this.validateFrom()){
                    return;
                }
                let params ={
                    Id:this.orderApplyInfo.Id,
                    OrderNo:this.orderApplyInfo.OrderNo,
                    StudentName:this.orderApplyInfo.StudentName,
                    StudentPhone:this.orderApplyInfo.StudentPhone,
                    RefundType:this.orderApplyInfo.RefundType,
                    RefundMode:this.orderApplyInfo.RefundMode,
                    RefundReason:this.orderApplyInfo.RefundReason,
                    RefundCode:this.orderApplyInfo.RefundCode,
                    OrderAmount:this.orderApplyInfo.ReceivablesPrice,
                    RefundAmount:this.orderApplyInfo.RefundAmount,
                    RefundRemark:this.orderApplyInfo.RefundRemark
                };
                this.$confirm(`确定将退款申请提交审核？`, '提交审核', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    SaveRefundApplyAndAudit(params).then(ret=>{
                        if (ret.status === 0) {
                            Message({
                                message: '退款申请保存成功，已提交审核.',
                                showClose:true,
                                type: 'success'
                            });
                            this.modal.close();
                            self.getRefundApplys(); //刷新页面
                        };
                    });
                })
            },
            closeForm(){
               //关闭弹层
			    this.modal.close();
            },
            validateFrom(){ //表单验证
                if(this.orderApplyInfo.RefundCode===''){
                    Message({
                        message: '退款账号不能为空.',
                        showClose:true,
                        type: 'success'
                    });
                    return false;
                }
                if(this.orderApplyInfo.RefundAmount===''){
                    Message({
                        message: '退款金额不能为空.',
                        showClose:true,
                        type: 'success'
                    });
                    return false;
                }
                else{
                    if(isNaN(this.orderApplyInfo.RefundAmount)){
                        this.$message({
                            message: '退款金额必须输入数字',
                            showClose:true,
                            type: 'success'
                        })
                        return false;
                    }
                    else{
                        if(Number(this.orderApplyInfo.RefundAmount)<=0){
                            this.$message({
                                message: '退款金额必须大于0',
                                showClose:true,
                                type: 'success'
                            })
                            return false;
                        }
                    }
                }
                return true;
            }
        },
        created() {
           let me = this;
            GetRefundMode().then(ret => {  // 退款方式
                if (ret.status === 0) {
                    me.RefundModeData = ret.result;
                }
            });
             GetRefundReason().then(ret => {  // 退款原因
                if (ret.status === 0) {
                    me.RefundReasonData = ret.result;
                }
            });
        }
    }
</script>