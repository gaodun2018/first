<template>
    <div class="crm-order-create order-audit-manage">
        <el-form :model="form" ref="form" v-loading="loading">
            <el-form-item  style="border-bottom:solid 2px #d7dde4;padding-bottom:10px;">
                <label style="margin-left: 20px;">订单金额:<span style="color:red;">&nbsp;&nbsp;￥{{Amount}}</span></label>
            </el-form-item>
           <el-form-item v-for="(split, index) in SplitInfo" :key="index">
                <el-row>
                    <el-col :sm="10">
                        <el-form-item label-width="111px" :label="split.Title+':'">
                            <el-cascader :disabled="split.IsOwner" size="small" v-model="split.SplitUser" :options="getUserTree" :props="channelsProps" :show-all-levels="false" @change="onKickpoll(index)"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :sm="10">
                        <el-form-item label-width="111px" label="分单比例:">
                            <el-input :min="1" :max="10" :disabled="split.IsOwner" v-model.number="split.Proportion" auto-complete="off" style="width: 170px" size='small' @change="onChange(index)"></el-input>
                            <lable>%</lable>
                        </el-form-item> 
                    </el-col>
                    <el-col :sm="4">
                        <el-button @click="addSplit">+</el-button>
                        <el-button @click="removeSplit(index)" :disabled="index===0">-</el-button>
                    </el-col>
                </el-row>
            </el-form-item>  
             <el-row>
                <el-form-item style="margin-top: 20px; text-align: right">
                    <el-button style="width: 80px" size="small" type="primary" @click="saveSplit">保存</el-button>
                    <el-button style="width: 80px" size="small" @click="closeSplit">取消</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import OrderModal from 'vueModal';
import { Message } from 'element-ui';
import { checkedUserTree } from '../../util/util';

import {GetUserDepartmentTree,SaveOrderSplit,GetOrderSplit} from '../../api/OrderSplit';

export default {
    name:'OrderSplit',
    props: ['SplitInfo','OrderNo','Amount','modal','self'],
    data() {
        return {
            treeStatus:0,
            defaultKeys: '',
            getUserTree:[],
            channelsProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
            },
            //SplitInfo :[]
        }
    },
    methods: {
        addSplit(){ //添加分单销售
            this.SplitInfo.push({
                ID:0,
                OrderNo:this.OrderNo,
                Title:'分单销售',
                IsOwner:false,
                SplitUser:'',
                Proportion:0   
            })
        },
        removeSplit(index){ //去除分单销售
            this.SplitInfo[0].Proportion += this.SplitInfo[index].Proportion;
            this.SplitInfo.splice(index,1);
        },
        saveSplit(){
            let param = [];
            let totalProportion = 0;
            for(let i in this.SplitInfo){
                let item = this.SplitInfo[i];
                if(item.SplitUser==''){
                    this.$message({
                        message: '分单销售不能为空',
                        showClose:true,
                        type: 'success'
                    })
                    return;
                }
                if(item.Proportion<0){
                    this.$message({
                        message: '分单比例不能低于0',
                        showClose:true,
                        type: 'success'
                    })
                    return;
                }
                totalProportion+=item.Proportion;
                param.push({
                    OrderNo:item.OrderNo,
                    UserId:item.SplitUser[item.SplitUser.length-1],
                    Proportion:item.Proportion
                });
            }   
            if(Number(totalProportion)!=100){
                this.$message({
                    message: '分单比例总和必须为100%',
                    showClose:true,
                    type: 'success'
                })
                return;
            }
            this.$confirm(`确定将保存分单？`, '订单分单', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                SaveOrderSplit(param).then(ret=>{
                    if(ret.status===0){
                        this.$message({
                            message: '分单已保存',
                            showClose:true,
                            type: 'success'
                        });
                        this.modal.close();
                    }
                });
            });
        },
        onChange(index){
            debugger;
            let data = this.SplitInfo[index];
            var tt=/^\d+$/g;
            if(!tt.test(data.Proportion)){
                this.$message({
                    message: '比例数字必须为正整数',
                    showClose:true,
                    type: 'success'
                })
                return;
            }
            let baseProportion = Number(data.Proportion);
            if(baseProportion<0) {
                this.$message({
                    message: '比例数字不能小于0%',
                    showClose:true,
                    type: 'success'
                })
                return;
            }
            if(baseProportion>100) {
                this.$message({
                    message: '比例数字不能大于100%',
                    showClose:true,
                    type: 'success'
                })
                return;
            }
            let newProportion = 0;
            for(let i in this.SplitInfo){
                let item = this.SplitInfo[i];
                if(i>0){
                    newProportion+=item.Proportion;
                }
            }
            if(newProportion>100){
                this.$message({
                    message: '分单比例总额不能超过100%',
                    showClose:true,
                    type: 'success'
                })
                return;
            }
            this.SplitInfo[0].Proportion = 100-newProportion
        },
        closeSplit(){
            this.modal.close();
        },
        onKickpoll(index){
            let baseuser = this.SplitInfo[index].SplitUser;
            for(let i in this.SplitInfo){
                if(i!=index){
                    let user = this.SplitInfo[i].SplitUser;
                    if(JSON.stringify(baseuser) == JSON.stringify(user)){
                        this.$message({
                            message: this.SplitInfo[index].Title+'不能重复',
                            showClose:true,
                            type: 'success'
                        });
                        this.SplitInfo[i].SplitUser='';
                        return;
                    }
                }
            }
        }
    },
    created(){
        GetUserDepartmentTree().then(ret => { // 获取人员接口
            if (ret.status === 0) {
                this.getUserTree = ret.result;
            }
        });
    }
}
</script>