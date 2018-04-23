<template>
    <div class="update-pwd">
        <div class="crm-navigation pointer-events">
            <navbar></navbar>
        </div>
        <p class="magText">{{this.pwdTypeStr}}</p>
        <el-form class="update-pwd-form" :model="form" :rules="rules" ref="form" label-width="110px">
            <el-form-item label="输入原密码：" prop="oldPass">
                <el-input size="small" type="password" v-model="form.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="输入新密码：" prop="newPassWord1">
                <el-input size="small" type="password" v-model="form.newPassWord1"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="newPassWord2">
                <el-input size="small" type="password" v-model="form.newPassWord2"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button style="width: 70px" :loading="loading" size="small" type="primary" @click="submitForm">确认</el-button>
                <el-button style="width: 70px" size="small" @click="cancelForm">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
    .update-pwd {
        text-align: center;
    }
    .update-pwd-form {
         width: 450px;
         margin: 0 auto;
    }
    .magText {
        color: #EA0202;
        font-size: 12px;
        padding: 25px 0;
    }
</style>
<script>
import Navbar from './Navigation.vue';
import { SAAS_USER_INFO } from '../util/keys';
import { Message } from 'element-ui';
export default {
    components: {Navbar},
    data() {
        var newPass1 = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('请输入6位以上的新密码'));
            } else {
                if (this.form.newPassWord2 !== '') {
                    this.$refs.form.validateField('newPassWord2');
                }
                callback();
            }
        };
        var newPass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.newPassWord1) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            account:'',
            pwdTypeStr:'',
            form:{
                oldPass:'',
                newPassWord1:'',
                newPassWord2:''
            },
            rules: {
                 oldPass: [
                    { required: true, message: '原密码不能为空', trigger: 'blur' }
                ],
                newPassWord1: [
                    { required: true, validator: newPass1, trigger: 'blur' }
                ],
                newPassWord2: [
                    { required: true, validator: newPass2, trigger: 'blur' }
                ]
            }
        }
     },
     methods: {
         submitForm(){
            
            let pssObj = {
                Account: this.account,
                OldPassword: this.form.oldPass,
                NewPassword: this.form.newPassWord1
            }
            this.$http.getChangePwd(pssObj).then(ret=>{
                if (ret.status === 0) {
                    Message({
                        message:ret.info,
                        type: 'success'
                    });
                    this.$router.push({ path: '/' });
                } else if (ret.status === 4) {
                    Message({
                        message:ret.info,
                        type: 'warning'
                    });
                } else {
                    Message({
                        message:ret.info,
                        type: 'warning'
                    });
                }
             });
         },
         cancelForm(){
             this.$router.push({ path: '/login' });
         }
     },
     computed: {
     },
     created() {
         let userInfo = JSON.parse(localStorage.getItem(SAAS_USER_INFO));
         this.account=userInfo.Email;
         if(userInfo.PwdType==1){
             this.pwdTypeStr = '初次登录，请修改密码';
         }
         else{
             this.pwdTypeStr = '您的密码已过期，请修改密码';
         }
         
     }
}
</script>