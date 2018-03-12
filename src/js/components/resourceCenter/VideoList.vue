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
                            <span class="clitem" :class="[rev.id === clver ?'current':'']"
                                  @click="outlinechange(rev.id)">{{rev.name}}</span>
                        </template>
                    </div>
                    <div class="button_group_b">
                        <span> 科 目:</span>
                        <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']"
                              @click="mulchange('0')">全部</span>
                        <template v-for="(revm,index) in tags" v-if="clver != '0'">
                            <template v-for="(revs,index) in revm.children" v-if="parseInt(clver) == revm.id">
                                <span class="clitem" :class="[revs.id === clversm ?'current':'']"
                                      @click="mulchange(revs.id)">{{revs.name}}</span>
                            </template>
                        </template>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" align="bottom">
                <el-col :sm="12">
                    <el-row>
                        <div class="select-search">
                        </div>
                    </el-row>
                </el-col>
                <el-col :sm="12">
                    <el-row type="flex" justify="end">
                        <div class="input-search">
                            <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input2"
                                      :on-icon-click="handleIconClick"></el-input>
                            <el-button type="primary" size="small">
                                <router-link to="/resource/video/create">新增视频</router-link>
                            </el-button>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="edu_table">
            <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName"
                      @selection-change="handleSelectionChange" :data="resource.resources" style="width: 100%">

                <el-table-column prop="id" label="视频id" min-width="100" fixed>
                </el-table-column>
                <el-table-column prop="title" label="视频名称" min-width="200">
                </el-table-column>
                <el-table-column prop="duration" label="时长" min-width="100">
                </el-table-column>
                <el-table-column prop="project" label="项目" min-width="115">
                </el-table-column>
                <!--<el-table-column prop="" label="引用数" min-width="115">
                </el-table-column>-->
                <el-table-column prop="updated_at" label="更新时间" min-width="150">
                </el-table-column>
                <el-table-column prop="creator" label="操作员" min-width="150">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="240">
                    <template scope="scope">
                        <!--<el-button type="text">预览</el-button>-->
                        <el-button type="text">修改</el-button>
                        <el-button type="text">删除</el-button>
                        <!--<el-button type="text">使用统计</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-row type="flex" align="center">
            <el-col :sm="24">
                <el-pagination
                    @size-change="didChangePageSize"
                    @current-change="didChangePage"
                    :page-sizes="[50, 200, 300, 400]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationTotal"
                    style="text-align: center;">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>
<style>
</style>
<script>
    import Vue from 'vue';
    import {getResource} from '../../api/resource.js'

    export default {
        components: {},
        data() {
            return {
                radio: '全部',
                radio2: '全部',
                input2: '',
                resource: {
                    resources: [],
                    pagination: {
                        total: 0,
                        current_page: 1
                    }
                },
                clver: "0",
                clversm: "0",
                tags: [],
                currentPage: 1,
                paginationTotal: 0,
                pageSize: 50,
                loading: false
            }
        },
        methods: {
            outlinechange(reid) {
                this.clver = reid;
                this.clversm = '0'
                this.loadResources()
            },
            mulchange(reid) {
                this.clversm = reid;
                this.loadResources()
            },

            fetchResources() {

                let parameters = {
                    page_size: this.pageSize,
                    page: this.currentPage,
                    discriminator: 'video'
                }

                if (this.clver != '0') {
                    parameters.tag_id = this.clver
                }
                if (this.clversm != '0') {
                    parameters.tag_id = this.clversm
                }

                return getResource(parameters)
            },

            async loadResources() {
                this.loading = true
                let resourceResponse = await this.fetchResources()
                this.resource = resourceResponse.result

                let total = this.resource.pagination.total;
                if (this.paginationTotal == 0)
                    this.paginationTotal = total
                this.tags = this.resource.tags
                this.loading = false
            },

            didChangePage(currentPage) {
                this.currentPage = currentPage;
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
            this.loadResources()
        }
    }
</script>