<template>
    <div class="addContent">
        <el-form :model="form" ref="form">
            <el-form-item label="受邀人:" label-width="100px" style="margin-bottom:0px">
                <span>{{form.useName}}</span>
            </el-form-item>
            <el-form-item label="手机号:" label-width="100px" style="position:relative;margin-bottom: 0px">
                <span>{{form.phone}}</span>
            </el-form-item>
            <el-form-item label="学员账号:" label-width="100px" class="new-form-item">
                <span>{{form.account}}</span>
            </el-form-item>
            <el-form-item label="密码:" label-width="100px" class="new-form-item">
                <span>{{form.pwd}}</span>
            </el-form-item>
            <el-row style="margin-top:20px;margin-bottom:10px;">
                <el-col :sm="16">
                    <span style="color:red;margin-left:15px;">
                        *请勿泄露学员账号密码
                    </span>
                </el-col>
            </el-row>
            <el-form-item v-if="false" label-width="105px" style="margin-top: 33px;">
                <div style="width:80%;text-align:right;">
                    <el-button type="primary" size="small">重新发送</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>
.vitationTb thead {
    display: none;
}

.vitationTb td {
    border: none;
}

.vitationTb .el-table__body {
    width: 100% !important;
}

.itemAdress .el-form-item__label {
    padding-right: 26px;
}

.new-form-item {
    margin-bottom: 0px !important;
}
</style>
<script type="text/javascript">
import Vue from 'vue';
import { Form, FormItem, DatePicker, Select, Dialog, Option, OptionGroup, Button, Input, Table, TableColumn, } from 'element-ui';
import { Message } from 'element-ui';
import { GetListenAccount } from '../../api/cluesManage';
import { format, number2DateTime } from '../../util/util';
import { mapState } from 'vuex';
import { CRM_USER_INFO } from '../../util/keys';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
export default {
    name: 'linvitaSend',
    props: ['self', 'modal', 'selectRow'],
    data() {
        return {
            form: {
                //显示
                useName: '',
                phone: '',
                account: '',//账号
                pwd: '',
                //显示结束
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
            }
            GetListenAccount({ CustomId: this.selectRow.CustomGuid }).then(ret => {
                if (ret.status === 0) {
                    this.form.account = ret.result.CusAccount;
                    this.form.pwd = ret.result.CusPassword;
                }
            })
        },
    },
    mounted() {
        this.getContactsInfo();
    }
}
</script>