<template>

    <div class="resourceIntro">
        <el-row>
            <el-col :span="6" v-for="(item,index) in courseIntroList" :key="index">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-tooltip effect="dark" :content="item.title" placement="top">
                            <span>{{item.title}}</span>
                        </el-tooltip>
                    </div>
                    <div class="introItem">
                        <div class="introItemscroll">
                            {{item.content}}
                        </div>
                    </div>
                    <div class="box-card-bottom">
                        <el-button type="text" class="button" @click="openAddResDialog(index,item.id)">修改</el-button>
                        <el-button type="text" class="button" @click="deleteResIntro(index)">删除</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card add-card" @click.native="openAddResDialog">
                    <i class="el-icon-plus"></i>
                    <p>建议：添加3个</p>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :title="Doing==0?'新增资源介绍':'修改资源介绍'" class="tabplane" :visible.sync="dialogAddResVisible" @close="resetForm('AddResForm')">
            <el-form :model="AddResForm" ref="AddResForm">
                <el-form-item label="标题" prop="title"
                              :rules="filter_rules({required:true,type:'isAllSpace',max:15})">
                    <el-input v-model="AddResForm.title" class="coursetxt" auto-complete="off"
                              placeholder="示例：15章课程学习"></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="content"
                              :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
                    <el-input v-model="AddResForm.content" autosize type="textarea" class="coursetxt"
                              auto-complete="off" placeholder="示例：每天按照计划完成学习，把握好学习节奏"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button @click="resetForm('AddResForm')">取 消</el-button>
                <el-button v-if="Doing==1?true:false" type="primary" :loading="btnLoading" @click="saveResForm('AddResForm')">{{btnLoading?'保存中':'保存修改'}}</el-button>
                <el-button v-if="Doing==0?true:false" type="primary" :loading="btnLoading" @click="addResForm('AddResForm')">{{btnLoading?'新增中':'确定'}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                btnLoading: false,  //按钮loading
                dialogAddResVisible: false,   //新增资源介绍弹层
                //新增资源介绍的表单
                AddResForm: {
                    title: '',
                    content: '',
                },
                Doing: '0',     //操作  0表示新增  1表示修改
                reviseIndex: '',    //修改的索引
                reviseID: '',    //修改的索引
            }
        },
        computed: {
            course_id() {
                return this.$route.params.cid;
            },
            courseIntroList() {
                return this.$store.state.course.resource_intro;
            }
        },
        methods: {
            //openAddResDialog
            openAddResDialog(index, id) {
                if (index >= 0) {
                    //修改
                    this.Doing = '1';
                    this.reviseIndex = index;
                    this.reviseID = id;
                    this.AddResForm = {
                        title: this.courseIntroList[index]['title'],
                        content: this.courseIntroList[index]['content'],
                    }
                } else {
                    //新增
                    this.Doing = '0';
                    this.AddResForm = {
                        title: '',
                        content: '',
                    }
                }
                this.dialogAddResVisible = true;
            },
            //删除新增资源的介绍
            deleteResIntro(index) {
                this.$confirm('此操作将删除该资源介绍, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteResourceIntro', index);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            //新增资源的介绍
            addResForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let course_id = this.course_id;
                        let params = {...this.AddResForm}
                        this.btnLoading = true;
                        this.$http.AddSourceIntro(course_id, params).then((res) => {
                            this.btnLoading = false;
                            if (res.status == 0) {
                                this.$message({
                                    type: 'success',
                                    message: res.message
                                })
                                this.dialogAddResVisible = false;
                                this.$store.dispatch('addResourceIntro', res.result);
                            } else {
                                this.$message.error(res.message ? res.message : '课程资源添加失败！');
                            }
                        })
//            this.dialogAddResVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            //保存修改的资源介绍
            saveResForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.reviseIndex);
                        let resourceData = {
                            ...this.AddResForm,
                            index: this.reviseIndex,
                            id: this.reviseID,
                        };
                        this.dialogAddResVisible = false;
                        this.$store.dispatch('changeResourceIntro', resourceData);
//            this.dialogAddResVisible = false;
                    } else {
                        return false;
                    }
                });
            },
            //重置表单.新增资源介绍
            resetForm(formName) {
                this.dialogAddResVisible = false;
                this.$refs[formName].resetFields();
            },
            //获取资源介绍
            async getCourseResourceIntro() {
                let course_id = this.course_id;
                let ret = await this.$http.getCourseResourceIntro(course_id);
                if (ret.status == 0) {
                    this.$store.dispatch('saveResourceIntro', ret.result);
                }
            }
        },
        mounted() {
        },
        destroyed() {
        },
        created() {
            this.getCourseResourceIntro();
        }
    }
</script>
