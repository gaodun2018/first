<template>
    <div class="module-clues-content order-manage">

        <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
            <el-row>
                <el-col :sm="24">
                    <div class="button_group_t">
                        <span> 项 目:</span>
                        <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']"
                              @click="outlinechange('0')">全部</span>
                        <template v-for="(rev,index) in tags">
					<span :key="index" class="clitem" :class="[rev.id === clver ?'current':'']"
                          @click="outlinechange(rev.id)">{{rev.name}}</span>
                        </template>
                    </div>
                    <div class="button_group_b">
                        <span> 科 目:</span>
                        <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']"
                              @click="mulchange('0')">全部</span>
                        <template v-for="revm in tags" v-if="clver != '0'">
                            <template v-for="(revs,index) in revm.children" v-if="parseInt(clver) == revm.id">
						<span :key="index" class="clitem" :class="[revs.id === clversm ?'current':'']"
                              @click="mulchange(revs.id)">{{revs.name}}</span>
                            </template>
                        </template>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="24">
                    <el-row type="flex" justify="end">
                        <div class="input-search">
                            <el-input placeholder="讲义ID／讲义名称" size="small" icon="search" v-model="keywords"
                                      :on-icon-click="handleIconClick"></el-input>
                            <router-link
                                class="routerBtn"
                                to="/resource/handout/create"
                                v-if="unlocking('HANDOUT_CREATE')"
                            >新增讲义
                            </router-link>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="edu_table">
            <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName"
                      @selection-change="handleSelectionChange" :data="resource.resources" style="width: 100%">

                <el-table-column prop="id" label="讲义ID" min-width="100" fixed>
                </el-table-column>
                <el-table-column prop="title" label="讲义名称" min-width="200">
                </el-table-column>
                <!--<el-table-column prop="duration" label="大小" min-width="100">-->
                <!--</el-table-column>-->
                <el-table-column prop="project_name" label="项目" min-width="110">
                </el-table-column>
                <el-table-column prop="extension" label="类型" min-width="110">
                </el-table-column>
                <!--<el-table-column prop="num" label="引用数" min-width="110">
                </el-table-column>-->
                <el-table-column prop="updated_at" label="更新时间" min-width="150">
                </el-table-column>
                <el-table-column prop="creator.username" label="操作员" min-width="150">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="150">
                    <template scope="scope">
                        <!-- <el-button type="text" v-if="unlocking('HANDOUT_PREVIEW')">预览</el-button> -->
                        <router-link :to="{path: `/resource/handout/edit/${scope.row.id}`}"
                                     v-if="unlocking('HANDOUT_EDIT')" style="margin: 0 6px;">修改
                        </router-link>
                        <el-button type="text" v-if="unlocking('HANDOUT_DELETE')" @click="onRemove(scope.row)">删除
                        </el-button>
                        <!-- <el-button type="text" v-if="unlocking('HANDOUT_STATISTICS')">使用统计</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="clues-pagination">
                <el-pagination
                    @size-change="didChangePageSize"
                    @current-change="didChangePage"
                    :page-sizes="[50, 200, 300, 400]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationTotal"
                    style="text-align: center;">
                </el-pagination>
            </div>
        </div>

    </div>
</template>
<style>

</style>
<script>
    import Vue from 'vue';
    import {getOneResource, getResource, removeLecturenote} from '../../api/resource';
    import {number2DateTime} from '../../util/util.js'

    export default {
        components: {},
        data() {
            return {
                radio: '全部',
                radio2: '全部',
                keywords: '',
                clver: "0",
                clversm: "0",
                resource: {
                    resources: [],
                    pagination: {
                        total: 0,
                        current_page: 1
                    }
                },
                tags: [],
                currentPage: 1,
                paginationTotal: 0,
                pageSize: 50,
                loading: false,
                videoList: [],
            }
        },
        methods: {
            handleIconClick() { // 搜索
                this.loadResources();
            },
            onRemove(row) { // 删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    removeLecturenote(row.id).then(ret => {
                        if (ret.status == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            })
                            this.loadResources();
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '删除失败'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            outlinechange(reid) {
                this.clver = reid;
                this.clversm = '0'
                this.loadResources()
            },
            mulchange(reid) {
                this.clversm = reid;
                this.loadResources()
            },

            async fetchResources() {
                let parameters = {
                    page_size: this.pageSize,
                    page: this.currentPage,
                    keywords: this.keywords,
                    discriminator: 'lecture_note'
                }

                if (this.clver != '0') {
                    parameters.tag_id = this.clver
                }
                if (this.clversm != '0') {
                    parameters.tag_id = this.clversm
                }

                let r = await getResource(parameters)
                return r
            },
            async loadResources() {
                this.loading = true
                let resourceResponse = await this.fetchResources()
                let resources = resourceResponse.result
                for (var resource of resources.resources) {
                    resource.created_at = new Date(resource.created_at * 1000)
                    resource.updated_at = number2DateTime(new Date(resource.updated_at * 1000))
                    resource.project_name = (resource.tag == null) ? "" : resource.tag.name

                }
                this.resource = resources
                // let total = this.resource.pagination.total;
                // if (this.paginationTotal == 0)
                this.paginationTotal = this.resource.pagination.total;
                this.tags = this.resource.tags
                this.loading = false
            },
            async didChangePage(page) {
                this.currentPage = page;
                this.loadResources()
            },

            didChangePageSize(pageSize) {
                this.pageSize = pageSize;
                this.loadResources()
            }
        },
        computed: {},
        mounted() {

        },
        async created() {
            await this.loadResources()
        }
    }
</script>