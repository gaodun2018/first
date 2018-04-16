<template>
  <div class="module-edu-content permission-outlineeat">
    <div class="outlineeat">
      课程大纲：{{title}}<!--<span class="eaticon"></span>-->
      <!--<span class="cloneoutline" @click="clonedialogVisible = true">克隆旧课程大纲</span>-->
      <!--<span class="tolead" @click="uploaddialogVisible = true">批量导入课程大纲</span>-->
    </div>
    <div class="outlinebox">
      <div class="outlinetit">请先为该课程大纲选择合适的结构模板</div>
      <div class="outlinedrop">
         <div
           class="outlineitem"
           v-for="item in modulelist"
           :key="item.id"
           @click="selectSyllabus(item.id)"
           v-html="item.description"
         >
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


    <!--<el-dialog title="批量导入" class="tabplane clonetab" :visible.sync="uploaddialogVisible" size="tiny" :before-close="handleClose">
      <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"><em>课程导入Excel模板</em><br/>提示：若模板Excel导入失败，请新建文件，将模板中内容复制到新文件中，再次尝试。</div>
      </el-upload>
    </el-dialog>-->
  </div>
</template>
<style>

</style>
<script>

  export default {
      name:'SyllabusModuleOptTemplate',
    components: {},
    data() {
      return {
        clonedialogVisible:false,
        ruleProject:{
          region: ''
        },
        rulesject: {
          region: [
            { required: true, message: '选择旧大纲', trigger: 'change' }
          ],
        },
        uploaddialogVisible:false,
        coursesyllid:'',   //大纲id
        modulelist:[],
        title:'',    //大纲标题
      }
    },
    methods: {
      cloneruleProject(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.clonedialogVisible = false;
          } else {
            return false;
          }
        });
      },
      //选择大纲模板
      async selectSyllabus(template_id){
        let ret = await this.$http.selectSyllabus(this.coursesyllid,{'template_id':template_id});
        if(ret.status == 0&& ret.result == true){
          this.$router.replace({
           path:'/syllabus/manage/edit/'+this.coursesyllid
           })
        }
      },
      //获取大纲的模板列表
      async OutlineTemplates(){
        let ret = await this.$http.CourseSyllabusTemplates();
        if(ret.status == 0){
          this.modulelist = ret.result;
        }
      },
      //查看大纲的详情
      async checkSyllabus(){
        let ret = await this.$http.checkSyllabus(this.coursesyllid);
        if(ret.status == 0){
          this.title = ret.result.title;
          //当用户已经选择大纲时则直接跳转过去
          if(ret.result.template&&ret.result.template.id){
            this.$router.push({
              path:'/syllabus/manage/edit/'+this.coursesyllid,
            })
          }
        }
      }
    },
    computed: {},
    mounted() {

    },
    created() {
      this.coursesyllid = this.$route.params.sid;
      this.OutlineTemplates();
      this.checkSyllabus();
    }
  }
</script>