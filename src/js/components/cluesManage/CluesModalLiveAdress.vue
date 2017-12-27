<template>
    <div style="margin:0;padding:0;">
        <el-form :model="form" ref="form">
            <el-form-item label="受邀人" label-width="120px"  class="new-form-item">
                <span>{{form.useName}}</span>
            </el-form-item>
            <el-form-item label="手机号" label-width="120px"  class="new-form-item">
                <span>{{form.phone}}</span>
            </el-form-item>
            <el-form-item label="教师地址" label-width="120px" class="new-form-item">
                <el-input v-model="form.liveRoomAdress" auto-complete="off" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="学生地址" label-width="120px" style="margin-top: 8px;" class="new-form-item">
                <el-input v-model="form.studentAdress" auto-complete="off" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="助教端地址" label-width="120px" style="margin-top: 8px;" class="new-form-item">
                <el-input v-model="form.tearchLoclAdress" auto-complete="off" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label-width="120px" style="margin-top: 33px;">
                <div style="width:80%;text-align:right;">
                    <el-button type="primary" v-show="false" size="small" style="width:70px;">重新发送</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>
.new-form-item {
    margin-bottom: 0px !important;
}
</style>
<script type="text/javascript">
import Vue from 'vue';
import { GetLiveRoomInfo } from '../../api/cluesManage';
import { format, number2DateTime } from '../../util/util';
import { mapState } from 'vuex';
import { CRM_USER_INFO } from '../../util/keys';
export default {
    name: 'liveAdress',
    props: ['self', 'modal', 'selectRow'],
    data() {
        return {
            form: {
                //显示
                useName: '',
                phone: '',
                //显示结束
                liveRoomAdress: '',//直播室地址
                studentAdress: '',//学生地址
                tearchLoclAdress: '',//助教端地址

            },
            formLabelWidth: "75px",
        }
    },
    computed: {

    },
    methods: {
        //获取邀约人信息
        getContactsInfo() {
            if (this.selectRow != undefined && this.selectRow != null) {
                var postContacts = this.selectRow;
                this.form.useName = postContacts.stuName;
                this.form.phone = postContacts.stuPhone;
                GetLiveRoomInfo({ STno: postContacts.ListenInvitationNo }).then(ret => { // 新增规则
                    if (ret.status === 0) {
                        if (ret.result != null) {
                            var result = ret.result;
                            this.form.liveRoomAdress = result.HostLoginUrl;
                            this.form.tearchLoclAdress = result.AssistantLoginUrl;
                            this.form.studentAdress = result.ClientLoginUrl;
                        }
                    }
                })
            }
        },


    },
    mounted() {
        this.getContactsInfo();

    }
}
</script>