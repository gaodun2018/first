<template>
    <div class="order-module-course">
        <div class="order-agreement">
            <a v-show="getAgreementData" v-for="url in getAgreementData" target="_blank" :href="url.UserAgreementUrl" :key="url.UserAgreementUrl">《{{url.UserAgreementName}}》</a>
            <a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/registration?nw=1&OrderNo=${OrderNo}`]">用户注册协议信息</a>
        </div>
        <div style="padding: 10px 0">
            <span>确认记录</span>
        </div>
        <el-table :data="getPayInfoData" tooltip-effect="dark" v-loading="loading" style="width: 100%">
            <el-table-column prop="Create_Time" label="确认时间">
            </el-table-column>
            <el-table-column prop="PayerName" label="确认人 ">
            </el-table-column>
            <el-table-column prop="PayTypeName" label="确认方式">
            </el-table-column>
        </el-table>
        <div style="text-align: center; margin-top: 30px">
            <el-button style="width: 80px" size="small" type="primary" :loading="loading" @click="onConfirm">确定</el-button>
        </div>
    </div>
</template>
<style>
    .order-agreement a{
        color: #20a0ff;
    }
    .order-agreement a:nth-child(2){
        padding-left: 10px
    }
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { GetAgreementByOrderNo } from '../../api/order';

export default {
    props: ['self', 'OrderNo', 'modal'],
    data() {
        return {
            getPayInfoData: [],
            getAgreementData: [],
            loading: false,
        };
    },
    methods: {
        onConfirm() {
            this.modal.close();
        }
    },
    created() {
        GetAgreementByOrderNo({orderNo: this.OrderNo}).then(ret => {  // 获取用户协议
            if (ret.status === 0) {
                this.loading = false;
                this.getPayInfoData = ret.result.PayInfo;
                this.getAgreementData = ret.result.Agreement;
            } else {
                this.loading = false;
            }
        });
    },
};
</script>