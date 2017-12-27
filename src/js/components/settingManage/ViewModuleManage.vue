<template>
    <div class="module-clues-content moduleAssign">
        <el-form label-width="120px">
            <div>
                <el-row style="padding-bottom: 15px">
                    <el-col :span="12">
                        <el-button style="width: 70px;border: 1px solid #1d90e6;margin-right: 15px" type="text" size="small">
                            <a style="color: #49a1f6" target="_blank" href="/#/add/view?NavigationId=520&nw=1">
                                <span>新增视图</span>
                            </a>
                        </el-button>
                    </el-col>
                    <el-col :span="12">
                       <!--  <div class="clues-search">
                            <el-input style="width: 250px" placeholder="根据优惠名称模糊搜索" v-model="searchValue" size="small">
                                <el-button slot="append" icon="search" @click="onSearch" size="small"></el-button>
                            </el-input>
                        </div> -->
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="tableData" v-loading="loading" ref="tbRules" border style="width:100%">
                        <el-table-column prop="viewname" label="试图名称">
                        </el-table-column>
                        <el-table-column prop="createbyname" label="创建人">
                        </el-table-column>
                        <el-table-column prop="createtime" label="创建时间">
                        </el-table-column>
                        <el-table-column prop="viewpagename" label="类型">
                        </el-table-column>
                        <el-table-column prop="viewstatus" label="状态" :formatter="StatuFormat">
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small">
                                    <a style="color: #49a1f6" target="_blank" v-bind:href="[`/#/add/view?NavigationId=520&nw=1&id=${tableData[scope.$index].id}`]">
                                        <span>修改</span>
                                    </a>
                                </el-button>
                                <el-button type="text" @click="onStatus(scope.$index, tableData)" size="small">{{scope.row.viewstatus == '0' ? '停用' : '启用'}}</el-button>
                                <el-button type="text" @click="onRemove(tableData[scope.$index].id)" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="clues-pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                        </el-pagination>
                    </div>
                </el-row>
            </div>
        </el-form>
    </div>
</template>
<script>
import Vue from 'vue';
import { GetDefinitionViewInfoList, ChangeDefinitionViewStatus, DeleteViewInfo } from '../../api/settingManage.js';

export default {
    data() {
        return {
            loading: false,
            pageSize: 10,
            currentPage: 1,
            cluesTotal: 0,
        }
    },
    //事件
    methods: {
        //状态格式化
        StatuFormat: function(modelData) {
            if (modelData != null) {
                var deleteStatu = modelData.viewstatus;
                switch (deleteStatu) {
                    case '1':
                        return "停用";
                    case '0':
                        return "启用";
                    default:
                        return "启用";
                }
            }

        },
        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.GetDefinitionViewInfoListData();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.GetDefinitionViewInfoListData();
        },
        onRemove(viewid) { // 删除
            DeleteViewInfo({viewid}).then(ret => {
                if (ret.status === 0) {
                    this.$message({
                        type: 'success',
                        message: ret.info
                    })
                    this.handleCurrentChange(1);
                } else {
                    this.$message({
                        type: 'warning',
                        message: ret.info
                    })
                }
            })
        },
        GetDefinitionViewInfoListData() {
            let searchPrm = {
                Where: {
                    viewpageid: 0,
                    viewname: ''
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: '',
                SortCol: 0
            };
            this.loading = true;
            GetDefinitionViewInfoList(searchPrm).then(ret => {
                if (ret.status === 0) {
                    this.loading = false;
                    this.cluesTotal = ret.result.Count;
                    this.tableData = ret.result.Body;
                } else {
                    this.loading = false;
                }
            })
        },

        // 修改状态
        onStatus(index, data) {
            let status = data[index].viewstatus == '0' ? '1' : '0';
            ChangeDefinitionViewStatus({status,idlist: [data[index].id]}).then(ret => {
                if (ret.status === 0) {
                    this.$message({
                        message: ret.info,
                        type: 'success'
                    });
                    this.GetDefinitionViewInfoListData();
                }
           }) 
        }
    },
    created() {
        this.GetDefinitionViewInfoListData(); //初始化列表
    }

}
</script>