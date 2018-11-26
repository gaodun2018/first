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
                    ></el-date-picker>
                </div>
                <div class="search_item">
                    <span>操作人手机号</span>
                    <div style="display: inline-block;">
                        <el-input v-model="phone" placeholder="请输入用户手机号" size="small"></el-input>
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
                    <el-button type="primary" size="small" style="margin-bottom:2px;" @click="searchList">查询
                    </el-button>
                </div>
            </el-row>
        </div>
        <div>
            <el-table ref="table" :data="tableData" :max-height="setMaxHeight()" style="width: 100%">
                <el-table-column prop="id" label="日志ID" width="80" fixed>
                </el-table-column>
                <el-table-column prop="user_name" label="操作人" min-width="140">
                </el-table-column>
                 <el-table-column prop="source_id" label="操作对象ID" min-width="140">
                     <template slot-scope="scope">
                         {{scope.row.source_id == 0? "无" : scope.row.source_id }}
                     </template>
                </el-table-column>
                <el-table-column prop="log_type" label="事件类型" min-width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.log_type == 1">课程操作</span>
                        <span v-else-if="scope.row.log_type == 2">大纲操作</span>
                        <span v-else-if="scope.row.log_type == 3">资源操作</span>
                        <span v-else>公共服务操作</span>
                    </template>
                </el-table-column>
                <el-table-column prop="action" min-width="160" label="操作内容">
                </el-table-column>
                <el-table-column prop="created_at" label="操作时间" min-width="260">
                    <template slot-scope="scope">
                        {{scope.row.created_at | formatTime}}
                    </template>
                </el-table-column>

            </el-table>
            <div class="edu-pagination">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="pageSize"
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
                tableData: [],
                page: 1,
                pageSize: 50,
                keyword:'',
                eduTotal: 1,
                daterange: '',
                phone:'',
                keyword: '',
                userSearch:''
            };
        },
        computed: {},
        methods: {
            // 获取日志列表
            async getList(){
                let params = {
                    page_num:this.page,
                    page_size:this.pageSize,
                    mobile: this.phone,
                    begin:this.daterange? Date.parse(this.daterange[0]):'',
                    end:this.daterange? Date.parse(this.daterange[1]):'',
                    keyword:this.keyword? this.keyword:'',
                    status:0
                }
                let ret = await this.$http.getLogsList(params);
                this.tableData = ret.result.data;
                this.eduTotal = ret.result.total;
            },
            setMaxHeight() {
                const bdh = document.body.offsetHeight || document.documentElement.offsetHeight;
                return bdh - 200
            },
            // 分页
            handleCurrentChange(val){
                this.page = val;
                this.getList();
            },
            // 查询列表
            searchList() {
                this.page = 1;
                this.getList();
            }
        },
        watch: {
            $route: ["setMaxHeight"]
        },
        mounted() {
        },
        created() {
            this.tableHeight(this);
            this.getList();
        },
        filters:{
            formatTime(val){
            let t = new Date(val);
            let Y = t.getFullYear();
            let M = t.getMonth() + 1 >9? t.getMonth() + 1 : '0' + t.getMonth() + 1;
            let D = t.getDate() >9? t.getDate() : '0' + t.getDate();
            let H = t.getHours()>9? t.getHours() : '0' + t.getHours();
            let m = t.getMinutes()>9? t.getMinutes() : '0' + t.getMinutes();
            let S = t.getSeconds()>9? t.getSeconds() : '0' + t.getSeconds();

            return `${Y}-${M}-${D} ${H}:${m}:${S}`
          }
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
