<template>
    <div style="overflow:hidden;background-color:#0b131e">
        <div class="login-wrap" style="background: #F99;">
          <!--<div style="float: left;background: #333;width: 70%;height: 100%;"></div>-->
          <!--<div style="float: left;background: #F09963;width: 30%;height: 100%;"></div>-->
            <div class="login-box">
                <div style="margin-right: 4px">
                    <img src="../../images/login/login-logo.png">
                </div>
                <div class="box-conten">
                    <el-form :model="ruleForm" autoComplete="on" ref="ruleForm" style="text-align: center">
                        <el-form-item prop="user" :rules="filter_rules({required:true,type:'isAllSpace'})">
                            <span class="container_login">
                                <img src="../../images/login/user-icon.png"></img>
                            </span>
                            <el-input  class="login_bnt" type="text" v-model="ruleForm.user"  autoComplete="on" placeholder="手机／邮箱"></el-input>
                        </el-form-item>
                        <el-form-item prop="password" :rules="filter_rules({required:true,type:'isAllSpace'})">
                            <span class="container_login">
                                <img style="width: 13px" src="../../images/login/password-icon.png"></img>
                            </span>
                            <el-input class="login_bnt" type="password" v-model="ruleForm.password" autoComplete="on" placeholder="密码"></el-input>
                        </el-form-item>
                        <div style="margin-bottom: 0">
                            <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="submitForm('ruleForm')">{{loading ? '登录中' : '登录'}}</el-button>
                        </div>
                        <!-- <el-button type="text" style="color: #fff;float: right;" @click="restPassword">忘记密码</el-button> -->
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userLogin } from "../api/loginFrom.js";
import {appid} from "../common/config.js";

export default {
    data: function() {
        return {
            isRest: false,
            ruleForm: {
                user: '',
                password: '',
                appid:appid
            },
            loading: false
        }
    },
    methods: {
        submitForm(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let response = await userLogin(this.ruleForm);
                    if (response.data.status == 0) {
                        console.info("token=" + response.headers.accesstoken + "; ");
                        this.setCookie("token", response.headers.accesstoken, 2)
                        this.$router.push({path: '/home'});
                    } else {
                        this.$message({
                            message: response.data.info,
                            type: 'warning'
                        });
                    }
                } else {

                }
            });


        },
        setCookie(name, value, hour) {
            var exp = new Date();
            exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
            document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + ";";
        }
    },
    async created() {

    },
    mounted() {

    }
}
</script>

<style>
.login-wrap .el-input__inner:focus {
    outline: 0; 
    border-radius: 5px;
     -webkit-box-shadow: 0px 0px 8px rgba(232,237,250,0.6), 0 0px 4px 0 rgba(232,237,250,0.5);
    -moz-box-shadow: 0px 0px 8px rgba(232,237,250,0.6), 0 0px 4px 0 rgba(232,237,250,0.5);
    box-shadow: 0px 0px 8px rgba(232,237,250,0.6), 0 0px 4px 0 rgba(232,237,250,0.5);
    border: 1px solid #888787;
    }
.login-wrap .el-input__inner {
    height: 36px !important;
    line-height: 36px !important;
}
.login-wrap .Copyright {
    text-align: center;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
}
</style>