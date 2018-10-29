<template>
    <div class="module-edu-content operation-log">
        <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
            <el-row type="flex" align="bottom" justify="space-between">
                <div class="search_item">
                    <span>操作时间</span>
                    <el-date-picker
                        type="daterange"
                        style="width:240px;"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        v-model="daterange"
                        @change="setDaterange"
                    ></el-date-picker>
                </div>
                <div class="search_item">
                    <span>操作人</span>
                    <div style="display: inline-block;">
                        <el-input placeholder="请输入内容" v-model="userSearch" size="small" clearable>
                            <el-select v-model="userSelect" slot="prepend" placeholder="请选择">
                                <el-option label="用户手机" value="1"></el-option>
                                <el-option label="用户邮箱" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </div>
                </div>
                <div class="search_item">
                    <span>关键词</span>
                    <div style="display: inline-block;">
                        <el-input
                            size="small"
                            placeholder="请输入内容"
                            v-model="keyword"
                            clearable>
                        </el-input>
                    </div>
                </div>
                <div>
                    <el-button type="primary" size="small" style="margin-bottom:2px;" @click="handleSearch">查询
                    </el-button>
                </div>
            </el-row>
        </div>
        <!--<div class="edu_table">-->
        <div>
            <el-table ref="table" border :data="data" :max-height="setMaxHeight()" style="width: 100%">
                <el-table-column prop="id" label="日志ID" width="80" fixed>
                </el-table-column>
                <el-table-column prop="title" label="操作人" min-width="260">
                </el-table-column>
                <el-table-column prop="title" label="事件类型" min-width="260">
                </el-table-column>
                <el-table-column prop="title" label="操作内容">
                </el-table-column>
                <el-table-column prop="title" label="操作事件" min-width="260">
                </el-table-column>

            </el-table>
            <div class="edu-pagination">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next, jumper"
                    :total="eduTotal"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    // import vUpload from '../public/MyFilesUpload.vue'

    export default {
        components: {
            // vUpload
        },
        data() {
            return {
                data: [],
                currentPage: 1,
                eduTotal: 1,
                daterange: '',
                userSelect: 1,
                keyword: '',
                userSearch:''
            };
        },
        computed: {},
        methods: {
            setMaxHeight() {
                const bdh = document.body.offsetHeight || document.documentElement.offsetHeight;
                return bdh - 200
            },
            async loadLogsList() {
                let params = {
                    page: this.currentPage,
                    page_size: 20,
                }
                // let listRet = await this.$http.getWXImageList(params);
                // if (listRet.status === 0) {
                //     this.data = listRet.result.item_list;
                //     this.eduTotal = listRet.result.all_item_count;
                // }
            },
            handleCurrentChange(page) {
                this.loadLogsList();
            },
            setDaterange() {

            },
            handleSearch(){

            }
        },
        watch: {
            $route: ["setMaxHeight"]
        },
        mounted() {
        },
        created() {
            this.tableHeight(this);
            // this.loadLogsList();
        }
    };
</script>
<style lang="less" scoped>
    .operation-log {
        height: 100%;
        .search_tools {
            .search_item {
                > span {
                    font-size: 13px;
                }
            }
        }
        .edu_table {
            .el-table__body-wrapper {
                tr {
                    td {
                        height: auto;
                    }
                }
            }
        }
        .edu_table {
            .edu-pagination {
                padding-top: 14px;
            }
        }
    }
</style>
<style lang="less">
    .operation-log {
        .search_tools {
            .search_item {
                .el-date-editor {
                    height: 32px;
                    line-height: 32px;
                    .el-input__icon,
                    .el-range__icon,
                    .el-range-separator,
                    .el-icon-date{
                        height: auto;
                        line-height: 30px;
                    }
                }
            }
        }
        .edu_table {
            .el-table__body-wrapper,
            .el-table__fixed-body-wrapper {
                tr {
                    td {
                        height: auto;
                        padding: 10px 0;
                    }
                    th {
                        height: auto;
                        padding: 10px 0;
                    }
                }
                .el-button {
                    padding: 6px 10px;
                    font-size: 14px;
                    font-weight: 400;
                    font-style: normal;
                }
            }
        }
    }
</style>
