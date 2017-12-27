<template>
    <div>
        <div>
            <p class="tracking-clues-information">基本信息</p>
            <el-form :model="ruleForm" ref="ruleForm" label-width="90px">
                <el-row>
                    <el-col>
                        <el-form-item label="标签">
                            <el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="描述">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.describe"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div>
            <p class="tracking-clues-information">筛选用户</p>
            <el-form :model="form" ref="form" label-width="120px">
                <el-row>
                    <el-form-item label="要包含的用户">
                        <el-row>
                            <el-button @click="onCoalescing" style="width: 100%">
                                <span>合并组</span>
                                <i v-show="addIcon1" class="el-icon-plus"></i>
                            </el-button>
                        </el-row>
                        <el-row v-show="isCoalesCing" style="margin: 20px 0">
                            <el-table :data="coalesCingData" border style="width: 100%">
                                <el-table-column align="center" label="标签库">
                                    <template scope="scope">
                                        <el-input size="small" v-model="scope.row.date"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="已选标签">
                                    <template scope="scope">
                                        <el-input size="small" v-model="scope.row.name"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作" width="130">
                                    <template scope="scope">
                                        <a href="javascript:void(0)" @click="addClick" class="newuser-add"></a>
                                        <a v-show="removeIcon" href="javascript:void(0)" @click="removeClick(scope.$index)" class="newuser-remove"></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="text-align: center; margin-top: 20px">
                                <el-button @click="onSaveCoalescing" size="small" style="width: 75px" type="primary">保存</el-button>
                                <el-button @click="onRemoveCoalescing" size="small" style="width: 75px">删除</el-button>
                            </div>
                        </el-row>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="要排除的用户">
                            <el-row>
                                <el-button @click="onRuleOut" style="width: 100%">
                                    <span>排除组</span>
                                    <i v-show="addIcon2" class="el-icon-plus"></i>
                                </el-button>
                            </el-row>
                            <el-row v-show="isRuleOut" style="margin: 20px 0">
                                <el-table :data="ruleOutData" border style="width: 100%">
                                    <el-table-column align="center" label="标签库">
                                        <template scope="scope">
                                            <el-input size="small" v-model="scope.row.date"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="已选标签">
                                        <template scope="scope">
                                            <el-input size="small" v-model="scope.row.name"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="操作" width="130">
                                        <template scope="scope">
                                            <a href="javascript:void(0)" @click="addRuleOut" class="newuser-add"></a>
                                            <a v-show="removeIcon2" href="javascript:void(0)" @click="removeClick(scope.$index)" class="newuser-remove"></a>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div style="text-align: center; margin-top: 20px">
                                    <el-button @click="onSaveRuleOut" size="small" style="width: 75px" type="primary">保存</el-button>
                                    <el-button @click="onRemoveRuleOut" size="small" style="width: 75px">删除</el-button>
                                </div>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            addIcon1: true,
            addIcon2: true,
            removeIcon1: false,
            removeIcon2: false,
            isCoalesCing: false,
            isRuleOut: false,
            coalesCingData: [{
                date: '',
                name: '',
            }],
            ruleForm: {
                name: '',
                describe: ''
            },

            ruleOutData: [{
                date: '',
                name: '',
            }],
        }
    },
    watch: {
        coalesCingData(data) {
            if (data.length > 1) {
                this.removeIcon1 = true;
            } else {
                this.removeIcon1 = false;
            }
        },
        ruleOutData(data) {
            if (data.length > 1) {
                this.removeIcon2 = true;
            } else {
                this.removeIcon2 = false;
            }
        }
    },
    methods: {
        onCoalescing() { // 合并
            this.isCoalesCing = true;
            this.addIcon1 = false;
        },
        addClick() { // 添加
            this.coalesCingData.push({
                date: '',
                name: ''
            });
        },
        onSaveCoalescing() { // 保存

        },
        onRemoveCoalescing() { // 删除
            this.coalesCingData = [{
                date: '',
                name: '',
            }]
            this.isCoalesCing = false;
            this.addIcon1 = true;
        },
        removeClick(index) { // 删除
            if (this.coalesCingData.length > 1) {
                this.coalesCingData.splice(index, 1)
            }
        },

        onRuleOut() { // 排除
            this.addIcon2 = false;
            this.isRuleOut = true;
        },
        addRuleOut() { // 添加
            this.tableData.push({
                date: '',
                name: ''
            });
        },
        onSaveRuleOut() { // 保存

        },
        onRemoveRuleOut() { // 删除
            this.tableData = [{
                date: '',
                name: '',
            }]
            this.isRuleOut = false;
            this.addIcon2 = true;
        },
        removeClick(index) { // 删除
            if (this.ruleOutData.length > 1) {
                this.ruleOutData.splice(index, 1)
            }
        }


    },
    created() {}

}
</script>
<style type="text/css" scoped="scoped">
.el-icon-plus {
    color: #49a1f6;
    float: right;
}
</style>