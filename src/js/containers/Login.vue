<template>
    <div class="login-page">
        <div style="max-width: 1140px;height:100%;margin: 0 auto;position: relative;">
            <div class="login-left"></div>
            <div class="login-wrap">
                <div class="login-box">
                    <div style="margin-right: 4px">
                        <img src="../../images/gdlogo.png">
                    </div>
                    <div class="box-conten">
                        <el-form :model="ruleForm" autoComplete="on" ref="ruleForm" style="text-align: center">
                            <el-form-item prop="user" :rules="filter_rules({required:true,type:'isAllSpace'})">
                            <span class="container_login">
                                <img src="../../images/login/user-icon.png"></img>
                            </span>
                                <el-input class="login_bnt" type="text" v-model="ruleForm.user"
                                          @keyup.enter.native="submitForm('ruleForm')" autofocus="true"
                                          auto-complete="on" placeholder="手机／邮箱"></el-input>
                            </el-form-item>
                            <el-form-item prop="password" :rules="filter_rules({required:true,type:'isAllSpace'})">
                            <span class="container_login">
                                <img style="width: 13px" src="../../images/login/password-icon.png"></img>
                            </span>
                                <el-input class="login_bnt" type="password" v-model="ruleForm.password"
                                          @keyup.enter.native="submitForm('ruleForm')" auto-complete="on"
                                          placeholder="密码"></el-input>
                            </el-form-item>
                            <div style="margin-bottom: 0">
                                <el-button type="primary" class="login-btn" :loading="loading"
                                           @click.native.prevent="submitForm('ruleForm')">{{loading ? '登录中' : '登录'}}
                                </el-button>
                            </div>
                            <!-- <el-button type="text" style="color: #fff;float: right;" @click="restPassword">忘记密码</el-button> -->
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="login-title">
                <div class="login-title-t">
                    <p>以科技为驱动，</p>
                    <p>构建国际化的终身财经教育生态体系</p>
                </div>
                <div class="login-title-b">
                    <p>协同各事业部工作，精简大量冗余工作流程</p>
                    <p>更加智能的管理系统，分析数据精准实时</p>
                    <p>云平台大数据，随时随地掌握动态</p>
                </div>
            </div>
            <div class="login-right"></div>
        </div>
    </div>
</template>

<script>
    import {userLogin} from "../api/loginFrom.js";
    import {appid} from "../common/config.js";

    export default {
        data: function () {
            return {
                isRest: false,
                ruleForm: {
                    user: '',
                    password: '',
                    appid: appid
                },
                loading: false
            }
        },
        methods: {
            submitForm(formName) {
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
    .login-page{
        overflow:hidden;
        width: 100%;
        height: 100%;
    }
    .login-left {
        position: absolute;
        top: 0;
        left: -388px;
        height: 100%;
        width: 1342px;
        z-index: 100;
        background: url(../../images/left_bg.jpg) no-repeat center;
    }
    .login-right{
        position: absolute;
        top: 0;left: 954px;
        height: 100%;
        width: 575px;
        z-index: 100;
        background: url(../../images/right_bg.jpg) repeat-x center;
    }
    .login-title{
        z-index: 999;
        width: 658px;
        letter-spacing: 5px;
        position: absolute;
        top: 320px;
        left: 0;
    }
    .login-title .login-title-t{
        font-size: 36px;
        line-height: 54px;
        color: #666666;
        border-bottom: 1px solid #666666;
        margin-bottom: 24px;
    }
    .login-title .login-title-b{
        font-size: 16px;
        line-height: 32px;
        color: #666666;
    }

    .login-wrap .el-input__inner:focus {
        outline: 0;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 8px rgba(232, 237, 250, 0.6), 0 0px 4px 0 rgba(232, 237, 250, 0.5);
        -moz-box-shadow: 0px 0px 8px rgba(232, 237, 250, 0.6), 0 0px 4px 0 rgba(232, 237, 250, 0.5);
        box-shadow: 0px 0px 8px rgba(232, 237, 250, 0.6), 0 0px 4px 0 rgba(232, 237, 250, 0.5);
        border: 1px solid #888787;
    }

    .login-wrap .el-input__inner {
        height: 46px !important;
        line-height: 46px !important;
        color: #333!important;
    }

    .login-wrap .Copyright {
        text-align: center;
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
    }

</style>