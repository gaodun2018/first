<template>
    <div class="clues-setting-table">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-row>
                <el-col :sm="18">
                    <div class="clues-setting">
                        <p>可选字段</p>
                        <div class="setting-foundation">
                            <p>基础字段</p>
                            <el-row>
                                <el-col>
                                    <div style="margin-left: 40px; padding-top: 10px">
                                        <el-checkbox v-model="TrueName" style="width: 157px;display: inline-block" disabled >联系人姓名</el-checkbox>
                                        <el-checkbox v-model="MainPhone" style="width: 172px;display: inline-block" disabled >手机</el-checkbox>
                                        <el-checkbox-group style="display: inline" v-model="ruleForm.settingField">
                                            <el-checkbox style="width: 175px;margin: 0 0 10px 0;" v-for="(item, index) in table" :key="item.field" :label="item.title" v-if="item.field !== 'MainPhone' && index < 17">{{item.title}}</el-checkbox>
                                        </el-checkbox-group> 
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <p style="padding: 0 0 5px 10px">其他字段</p>
                            <el-row>
                                <el-col>
                                    <div>
                                        <el-checkbox-group style="padding: 5px 0 5px 40px;" v-model="ruleForm.settingField">
                                            <el-checkbox style="width: 175px;margin: 0 0 10px 0" v-for="(item, index) in table" :key="item.field" :label="item.title" v-if="item.field!=='field' && index > 16">{{item.title}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-col :sm="6">
                    <div class="setting-select" style="margin-right: -10px">
                        <p>当前选定字段</p>
                        <el-row style="height: 528px;overflow: auto">
                            <el-col>
                                <div style="line-height: 30px">
                                    <p class="setting-select-item">联系人姓名</p>
                                    <p class="setting-select-item">手机</p>
                                    <p class="setting-select-item" v-for="(item, index) in ruleForm.settingField" :key="index">
                                        <span v-if="item !== '手机' && item !== '操作'">{{item}}</span>
                                        <i @click="onRemove(item)"><img src="../../../images/close.png"></i>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row style="margin-top: 5px">
                <el-col>
                    <div>
                        <el-form-item style="margin-bottom: 0">
                            <el-button style="width: 80px;border: 0; background: #00b0e4" size="small" type="primary" @click="onSeaveTable">保存</el-button>
                            <el-button style="width: 80px;" size="small" @click="onCancel">取消</el-button>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<style>
.clues-setting-table .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #42aedf;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { Dialog, Transfer } from 'element-ui';
// import { cluesTable } from '../common/checkData.js';
import { AddBase_PageFieldConfig } from '../../api/cluesManage';
Vue.use(Dialog)
Vue.use(Transfer)
export default {
    props: ['self', 'modal', 'table'],
    data() {
        return {
            TrueName: true,
            MainPhone: true,
            // infoGroup: ['姓名','手机'], 
            custonDate: [],
            ruleForm: {
                settingField: this.self.$store.state.cluesManage.cluesTableSetting,
                ruleForm: ''
            },
        }
    },
    methods: {
        onCancel() { // 取消
            this.modal.close();
        },
        onSeaveTable() { // 保存
            let tableObj = {
                PageName: '线索管理',
                PageFieldJson: JSON.stringify(this.ruleForm.settingField),
            }
            AddBase_PageFieldConfig(tableObj).then(ret => {
                if (ret.status === 0) {
                    this.modal.close();
                    this.self.getPageFieldConfig();
                }
            })
            this.self.$store.dispatch('cluesTableSetting', this.ruleForm.settingField);
        },
        onRemove(val) { // 删除当前所选字段
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
            this.ruleForm.settingField.remove(val);
        },
    },
    mounted: function() {
        this.custonDate = this.self.$store.state.home.selectedTable;
    },
};
</script>