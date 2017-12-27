<template>
    <el-form style="margin: 15px 40px" :model="form" :rules="rules" ref="form" label-width="110px">
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
            <el-button style="width: 70px" :loading="loading" size="small" type="primary" @click="submitForm('form')">确认</el-button>
            <el-button style="width: 70px" size="small" @click="cancelForm('form')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getChangePwd } from '../api/login';
import { CRM_USER_INFO } from '../util/keys';
import { Message } from 'element-ui';

export default {
    props: ['self', 'modal'],
    data() {
        var newPass1 = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码必须包含数字和字母, 长度6-30位'));
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
            loading: false,
            form: {
                oldPass: '',
                newPassWord1: '',
                newPassWord2: ''
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
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
                    const { oldPass, newPassWord1 } = this.form;
                    let pssObj = {
                        Account: userInfo.Email,
                        OldPassword: oldPass,
                        NewPassword: newPassWord1
                    }
                    this.loading = true;
                    getChangePwd(pssObj).then(ret => {
                        this.loading = false;
                        if (ret.status === 0) {
                             Message({
                                message: '修改密码成功',
                                type: 'success'
                            });
                            this.modal.close();
                        } else if (ret.status === 4) {
                             Message({
                                message: ret.info,
                                type: 'warning'
                            });
                        }
                        this.$refs[formName].resetFields();
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            });
        },
        cancelForm(formName) {
            this.modal.close();
            this.$refs[formName].resetFields();
        }
    }
}
</script>
