<template>
  <div class="module-edu-content permission-outlineeat">
    <div class="outlineeat">
      课程大纲：{{title}}
      <!--<span class="eaticon"></span>-->
      <!--<span class="cloneoutline" @click="clonedialogVisible = true">克隆旧课程大纲</span>-->
      <span class="tolead" @click="uploaddialogVisible = true">批量导入课程大纲</span>
    </div>
    <div class="outlinebox">
      <div class="outlinetit">请先为该课程大纲选择合适的结构模板</div>
      <div class="outlinedrop">
        <div class="outlineitem" v-for="item in modulelist" :key="item.id" @click="selectSyllabus(item.id)" v-html="item.description">
        </div>

      </div>
    </div>

    <!--<el-dialog title="克隆旧课程大纲" class="tabplane clonetab" :visible.sync="clonedialogVisible" :before-close="handleClose">
      <el-form :model="ruleProject" :rules="rulesject" ref="ruleProject" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择旧大纲" prop="region">
          <el-select v-model="ruleProject.region" placeholder="请选择旧大纲">
            <el-option label="ACCA" value="ACCA"></el-option>
            <el-option label="CFA" value="CFA"></el-option>
          </el-select>
        </el-form-item>
        <div class="cloneinfo">注意：克隆之后，旧课程大纲上的资源关系也将被一并克隆。适用于：新考季的课程内容更新比率较小的情况。</div>
        <el-form-item>
          <el-button @click="adddialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="cloneruleProject('ruleProject')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>-->
    <v-upload
        :b-visible="uploaddialogVisible"
        :title="'批量导入课程大纲'"
        :url-title="'课程大纲Excel模板下载'"
        :download-url="'//simg01.gaodunwangxiao.com/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E7%9A%84%E8%A1%A8%E6%A0%BC%E6%A8%A1%E6%9D%BF.zip'"
        :upload-url="uploadUrl"
        :upload-data="uploadData"
        :name="'import_from'"
        @uploadSuccessCallback="uploadSuccessCallback"
        @handleCloesDialog="uploaddialogVisible = false"
        :fileTypes="['csv','xls','xlsx']"
    ></v-upload>
  </div>
</template>
<style>

</style>
<script>
import vUpload from "../public/BatchFilesUpload.vue";
export default {
    name: "SyllabusModuleOptTemplate",
    components: {
        vUpload
    },
    data() {
        return {
            clonedialogVisible: false,
            ruleProject: {
                region: ""
            },
            rulesject: {
                region: [
                    { required: true, message: "选择旧大纲", trigger: "change" }
                ]
            },
            uploaddialogVisible: false,
            coursesyllid: "", //大纲id
            modulelist: [],
            title: "", //大纲标题
            tag_id:'',   //tag_id
        };
    },
    methods: {
        cloneruleProject(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.clonedialogVisible = false;
                } else {
                    return false;
                }
            });
        },
        // 批量导入大纲成功毁掉
        uploadSuccessCallback(){
            this.$router.replace({
                path: "/syllabus/manage/edit/" + this.coursesyllid
            });
        },
        //选择大纲模板
        async selectSyllabus(template_id) {
            let ret = await this.$http.selectSyllabus(this.coursesyllid, {
                template_id: template_id
            });
            if (ret.status == 0 && ret.result == true) {
                this.$router.replace({
                    path: "/syllabus/manage/edit/" + this.coursesyllid
                });
            }
        },
        //获取大纲的模板列表
        async OutlineTemplates() {
            let ret = await this.$http.CourseSyllabusTemplates();
            if (ret.status == 0) {
                this.modulelist = ret.result;
            }
        },
        //查看大纲的详情
        async checkSyllabus() {
            let ret = await this.$http.checkSyllabus(this.coursesyllid);
            if (ret.status == 0) {
                this.title = ret.result.title;
                this.tag_id = ret.result.tag_id;
                //当用户已经选择大纲时则直接跳转过去
                if (ret.result.template && ret.result.template.id) {
                    this.$router.push({
                        path: "/syllabus/manage/edit/" + this.coursesyllid
                    });
                }
            }
        }
    },
    computed: {
        uploadUrl(){
            return `toc-service/course/syllabus/${this.coursesyllid}/items/batch`
        },
        uploadData(){
            return {
                course_syllabus_id : this.coursesyllid,
                tag_id : this.tag_id,
            }
        }
    },
    mounted() {},
    created() {
        this.coursesyllid = this.$route.params.sid;
        this.OutlineTemplates();
        this.checkSyllabus();
    }
};
</script>
