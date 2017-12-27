<template>
    <div class="pefund-apply-audit">
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
                         <el-select disabled v-model="orderApplyInfo.RefundMode" size='small' style="width: 170px">
                            <el-option v-for="item in RefundModeData" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款原因:">
                        <el-select disabled v-model="orderApplyInfo.RefundReason" size='small' style="width: 170px">
                            <el-option v-for="item in RefundReasonData" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款账号:">
                         <el-input disabled v-model="orderApplyInfo.RefundCode" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="退款金额:">
                         <el-input disabled v-model="orderApplyInfo.RefundAmount" style="width: 170px" size='small'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label-width="111px" label="退款说明:">
                    <el-input disabled type="textarea" v-model="orderApplyInfo.RefundRemark" size='small'></el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :sm="8">
                    <el-form-item label-width="111px" label="审核结论:">
                        <el-select v-model="AuditVerdict" size='small' style="width: 170px">
                            <el-option v-for="item in AuditVerdictData" :key="item.Id" :label="item.Name" :value="item.Id">
                            </el-option>
                        </el-select> 
                    </el-form-item>
                </el-col>
                <el-col :sm="16">
                    <el-form-item label-width="111px" label="审核意见:">
                         <el-input type="textarea" v-model="AuditOpinion" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                 <el-col :sm="8">
                     <p style="font-size:15px;font-weight:bold;padding-top:50px">流转历史：</p>
                 </el-col>
                <el-col :sm="16">
                    <el-form-item style="text-align: right">
                        <el-button style="width: 80px" size="small" type="primary" :loading="loading" @click="SaveAudit">保存</el-button>
                        <el-button style="width: 80px" size="small" @click="closeForm">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-table ref="multipleTable" v-loading="loading" :data="orderApplyInfo.OrderRefundRecordList" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label="操作时间" prop="AuditTime" align="center" width="200px">
                    </el-table-column>
                    <el-table-column label="操作人" prop="AuditUserName" align="center" width="120px">
                    </el-table-column>
                    <el-table-column label="执行操作" prop="AuditStageDescribe" align="center" width="150px">
                    </el-table-column>
                    <el-table-column label="审核结论" prop="AuditVerdictDescribe" align="center" width="120px">
                    </el-table-column>
                    <el-table-column label="审核意见" prop="AuditOpinion" align="center">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-form>
    </div>
</template>
<style>
.pefund-apply-audit .el-form-item {
    margin-bottom: 10px;
}
</style>
<script>
    import Vue from 'vue';
    import OrderModal from 'vueModal';
    import { Message,Table } from 'element-ui';
    import {GetRefundMode,GetRefundReason,GetAuditVerdict,GetRefundApplyInfo,SaveAudit} from '../../api/OrderRefund'
    Vue.use(Table)
    export default {
        props:['modal','orderApplyInfo','self'],
        name: 'crm-create-refundapply',
        data() {
            return {
                AuditVerdict:1001191,
                AuditOpinion:'',
                RefundModeData:[],
                RefundReasonData:[],
                AuditVerdictData:[],
            }
        },
        methods:{
            SaveAudit(){
                let me = this;
                this.$confirm(`确定将保存审核结果？`, '订单退款审核', {
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let auditInfo = {
                        RefundApplyId:me.orderApplyInfo.Id,
                        AuditStage:me.orderApplyInfo.AuditStage,
                        AuditVerdict:me.AuditVerdict,
                        AuditOpinion:me.AuditOpinion
                    }
                    SaveAudit(auditInfo).then(ret=>{
                        if (ret.status === 0){
                            me.$message({
                                message: '审核结果已保存',
                                showClose:true,
                                type: 'success'
                            });
                            me.modal.close();
                            self.getRefundApplys(); //刷新页面
                        }
                    });
                });
            },
            closeForm(){
                this.modal.close();
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
            GetAuditVerdict().then(ret=>{ //审核结论
                if (ret.status === 0) {
                    me.AuditVerdictData = ret.result;
                }
            })
        }
    }
</script>