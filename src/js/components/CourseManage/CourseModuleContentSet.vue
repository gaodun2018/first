<template>
    <div class="module-edu-content coursecontent">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="主课程" name="MainCourse">
                <!--<MainCourse v-if="activeName=='main'"></MainCourse>-->
            </el-tab-pane>
            <el-tab-pane label="Glive" name="Glive">
                <!--<Glive v-if="activeName=='glive'"></Glive>-->
            </el-tab-pane>
            <el-tab-pane label="批量讲义" name="Handout">
                <!--<Handout v-if="activeName=='handout'" :handout="handout"></Handout>-->
            </el-tab-pane>
        </el-tabs>
        <div class="el-tabs__content">
            <div class="el-tab-pane">
                <keep-alive>
                    <component :is="activeName"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<style>
    .coursecontent .el-tabs.el-tabs--card .el-tabs__content {
        display: none;
    }
</style>
<script>
    import MainCourse from './coursecontent/ContentModuleMain.vue'
    import Glive from './coursecontent/ContentModuleGlive.vue'
    import Handout from './coursecontent/HandoutModuleFlipped.vue'
    import {getCourseInfo, getCourseHandout} from '../../api/course'
    import {CourseSyllabuses} from '../../api/outline'

    export default {
        components: {
            MainCourse, Glive, Handout
        },
        data() {
            return {
                activeName: 'MainCourse',
                handout: 'courseHandout'
            }
        },
        methods: {
            handleClick(tab, event) {
            },
            //获取课程的基本设置 拿到项目 科目id
            async getCourseInfo() {
                let url = this.course_id;
                let ret = await getCourseInfo(url);
                if (ret.status == 0) {
                    this.$store.dispatch('saveCourseInfo', ret.result);
                    this.CourseSyllabuses();
                }
            },
            //获取课程下的大纲 根据项目科目id
            async CourseSyllabuses() {
                let ret = await CourseSyllabuses({
                    page: '1',
                    page_size: '100',
                    project_id: this.$store.state.course.course_info && this.$store.state.course.course_info.project_id,
                    subject_id: this.$store.state.course.course_info && this.$store.state.course.course_info.subject_id,
                    status: '0',    //获取启用的大纲
                    keyword: '',
                });
                if (ret.status == 0) {
                    this.$store.dispatch('saveCourseSyllabuses', ret.result.list);
                }
            }
        },
        computed: {
            course_id() {
                return this.$route.params.cid;
            }
        },
        mounted() {
        },
        created() {
            this.getCourseInfo();
        }
    }
</script>
<style>
    .coursecontent .el-tabs__header {
        margin: 0;
    }

    .coursecontent .el-tabs__content {
        border: 1px solid #d1dbe5;
        border-top: none;
        padding-top: 36px;
        padding-left: 30px;
        padding-bottom: 40px;
    }

    .coursecontent .fromtitle {
        margin-bottom: 6px;
    }

    .coursecontent .fromtitle .titicon {
        width: 4px;
        height: 18px;
        background: #26A1FF;
        display: inline-block;
        margin-right: 4px;
        vertical-align: middle;
    }

    .coursecontent .fromtitle .tittxt {
        display: inline-block;
        font-size: 14px;
        color: #2A2B2C;
        font-weight: 700;
        line-height: 20px;
        vertical-align: middle;
    }

    .coursecontent .el-form-item {
        padding-left: 12px;
    }

    .coursecontent .el-form-item.w_350 .el-input__inner {
        width: 330px;
    }

    .coursecontent .first-form-item {
        display: block;
    }

    .coursecontent .el-form-item .el-form-item__label {
        font-size: 14px;
        color: #2A2B2C;
    }

    .coursecontent .el-form-item .el-form-item__content .el-radio__label {
        font-size: 14px;
        color: #2A2B2C;
    }

    .coursecontent .el-form-item .el-form-item__content .el-radio-group .el-radio + .el-radio {
        margin-left: 42px;
    }

    .coursecontent .el-table--fit {
        border-right: 0;
    }

    .coursecontent .el-table .el-table__header-wrapper tr th {
        background-color: #F5F7FA;
    }

    .coursecontent .el-table .el-table__header-wrapper tr th:nth-child(3) {
        text-align: center;
    }

    .coursecontent .el-table .el-table__header-wrapper tr th .cell {
        background-color: #F5F7FA;
        font-size: 14px;
        color: #253342;
    }

    .coursecontent .el-table .el-table__body-wrapper tr td {
        height: 50px;
        font-size: 12px;
        color: #253342;
    }

    .coursecontent .el-table .el-table__body-wrapper tr td:nth-child(3) {
        text-align: center;
    }

    .coursecontent .el-table .el-table__body-wrapper tr td:nth-child(3) .cell .el-button {
        margin: 0 14px;
    }

    .coursecontent .addBox {
        text-align: center;
        height: 60px;
        border: 1px solid #dfe6ec;
        border-top: none;
        width: 89.8%;
    }

    .coursecontent .addBox .additem {
        display: inline-block;
        width: 13px;
        height: 13px;
        background: url("../../../images/additem.png") no-repeat center;
        vertical-align: middle;
    }

    .coursecontent .addBtn {
        line-height: 40px;
    }

    .coursecontent .addContent.tabplane .el-form-item__label {
        color: #8f9aac;
    }

    .module-edu-content.coursecontent .addContent.tabplane .el-dialog__body .el-form-item__label {
        width: 150px !important;
    }

    .module-edu-content.coursecontent .addContent.tabplane .el-dialog__body .el-form-item__content {
        margin-left: 150px !important;
    }

    .module-edu-content.coursecontent .addContent.tabplane .coursebtn .el-form-item__content {
        margin-left: 0 !important;
    }
</style>
