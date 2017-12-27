<template>
    <div class="module-clues-content moduleAssign">
        <el-form label-width="120px">
            <div>
                <el-row style="padding-bottom: 15px">
                    <el-col :span="12">
                        <el-button style="width: 70px;border: 1px solid #1d90e6;margin-right: 15px" type="text" size="small">
                            <a style="color: #49a1f6" target="_blank" href="/#/add/labelling?NavigationId=520&nw=1">
                                <i></i>
                                <span>新增标签</span>
                            </a>
                        </el-button>
                    </el-col>
                    <el-col :span="12">
                        <div class="clues-search">
                            <el-input style="width: 250px" placeholder="根据优惠名称模糊搜索" v-model="searchValue" size="small">
                                <el-button slot="append" icon="search" @click="onSearch" size="small"></el-button>
                            </el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="tableData" ref="tbRules" :row-class-name="tableRowClassName" border style="width:100%">
                        <el-table-column prop="ID" label="标签ID">
                        </el-table-column>
                        <el-table-column prop="TagTitle" label="标签名称">
                        </el-table-column>
                        <el-table-column prop="Owner" label="创建人">
                        </el-table-column>
                        <el-table-column prop="CreateTime" label="创建时间">
                        </el-table-column>
                        <el-table-column prop="UpdateTime" label="结束时间">
                        </el-table-column>
                        <el-table-column prop="GenCount" label="用户数">
                        </el-table-column>
                        <el-table-column prop="Status" label="状态" :formatter="StatuFormat">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button @click = "toActivating(scope.$index)" v-if = "tableData[scope.$index].Status == 3" type="text" size="small">生成</el-button>
                                <el-button :disabled = "tableData[scope.$index].Status == 2" v-else type="text" size="small">停止</el-button>
                                <a :href="`/#/add/labelling?NavigationId=520&nw=1&userId=${tableData[scope.$index].ID}`">
                                	<el-button :disabled = "tableData[scope.$index].Status == 2" type="text" size="small">修改</el-button>
                                </a>
                                <el-button :disabled = "tableData[scope.$index].Status == 2" type="text">线索导入</el-button>
                                <el-button :disabled = "tableData[scope.$index].Status == 2" type="text">发短信</el-button>
                                <el-button :disabled = "tableData[scope.$index].Status == 2" type="text">发邮件</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<script>
import Vue from 'vue';
import { getlabellingList,returnActivating } from '../../api/labellingList';
import { CRM_USER_INFO } from "../../util/keys";
export default {
    data() {
        return {
            userInfo:JSON.parse(localStorage.getItem(CRM_USER_INFO)) || "",
            tableData:[],
        }
    },
    //事件
    methods: {
        GetDataList() {
            getlabellingList({
            	owner:this.userInfo.UserId
            }).then(ret=>{      
            	this.tableData = ret.data.result;
            	switch (ret) {
                    case 1:
                        return "已生成";
                    case 2:
                        return "正在生成";
                    case 3:
                        return "未生成";
                    case 4:
                        return "生成失败";
                    default:
                        return "";
                }
            })   
        },
        //状态格式化
        StatuFormat: function(modelData) {
            if (modelData != null) {
                var deleteStatu = modelData.Status;
                switch (deleteStatu) {
                    case 1:
                        return "已生成";
                    case 2:
                        return "正在生成";
                    case 3:
                        return "未生成";
                    case 4:
                        return "生成失败";
                    default:
                        return "";
                }
            }

        },
        toActivating (index){
        	returnActivating({
        		id:this.tableData[index].ID
        	}).then(ret=>{
        		console.log(ret)
        	})
        }
    },
    created() {
        this.GetDataList(); //初始化列表
    }

}
</script>