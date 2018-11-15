<template>
  <div>
    <div class="input-search">
      <el-button
        type="primary"
        size="small"
        @click="showCfaDialog('add')"
        v-if="unlocking('COURSE_CREATE')"
      >
        +&nbsp;新增一次续派课
      </el-button>
    </div>
    <div class="edu_table">
      <el-table ref="multipleTable" border :data="cfaList" style="width: 100%">
        <el-table-column prop="id" label="任务ID" width="80" fixed>
        </el-table-column>
        <el-table-column prop="name" label="任务名称" min-width="180">
        </el-table-column>

        <el-table-column prop="courses" label="课程ID" min-width="80">
          <template slot-scope="scope">
            {{scope.row.courses.join(",")}}
          </template>
        </el-table-column>

        <el-table-column prop="first_time" label="首次开启时间" min-width="160" fixed="right">
        </el-table-column>

        <el-table-column prop="again_time" label="二次开启时间" min-width="160" fixed="right">
        </el-table-column>

        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="showCfaDialog('update',scope.row)">修改</el-button>
            <el-button type="text" @click="deleteLesson(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[15, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="eduTotal">
        </el-pagination>
      </div>
    </div>

     <!-- 新建/修改派课 -->
    <creatCFA
     :dialog="dialogVisable"
     :type="type"
     :data="ruleForm"
     :updateCourse="updateCourse"
     :remoteList="remoteList"
     :remoteTag="remoteTag"
     :selectedList="selectedList"
     :firstUpdate="firstUpdate"
     @showCfaDialog="showCfaDialog"
     @closeDialog="closeDialog"
     @save="dialogSave"
     @dialogChangeForm="dialogChangeForm"
     @remoteMethod="remoteMethod"
     @changeType="changeType"
    ></creatCFA>
  </div>
</template>

<script>
import creatCFA from './updateCFADialog';
export default {
  data () {
    return {
      changeId:'',
      selectedList:[],//已被选择课程
      updateCourse:[],
      firstUpdate: '',
      remoteList:[],
      remoteTag:[],//远程搜索的tag标签
      dialogVisable:false,//控制子组件显示隐藏
      type:"add",//控制子组件是新增还是修改
      page:1,
      ruleForm:{
        name:"",
        exam:"",// 选择level
        tag:"",// 学员标签
        repeat:"",// 复读课程id
        upgrade:"",// 升级课程id
        auditions: "",// 试听课程id
        first_time: "",// 首次开启时间
        again_time: "" ,// 二次开启时间
        courses: [],//已学课程id
        expire: "", // 已学课程到期时间
        end_time: "", // 结束时间
      },
      cfaList: [],//续课列表
      loading: false,
      pageSize: 15,
      eduTotal: 0,
    }
  },
  components: {
    creatCFA
  },
  methods: {
    // 修改类型
    changeType(){
      this.firstUpdate = "";
    },
    // 修改每页数量
    handleSizeChange(val){
      this.pageSize = val;
      this.getLesson()
    },
    // 分页
    handleCurrentChange(val){
      this.page = val;
      this.getLesson();
    },
    // 显示dialog弹框 改为父子组件传参方式，去除了事件总线 val是类型 新建还是修改 val2传递的修改对象
    showCfaDialog (val,val2){
      this.updateCourse=[];
      this.type = val;
      this.firstUpdate=val;
      if(val === "update"){
        this.ruleForm.courses = [];
        this.changeId = val2.id;
        this.ruleForm.name = val2.name;
        // this.ruleForm.tag = val2.tag[0].id;
        this.ruleForm.exam = val2.exam;
        this.ruleForm.expire = new Date(val2.expire);
        this.ruleForm.end_time = new Date(val2.end_time);
        this.ruleForm.auditions = Number(val2.auditions);
        this.ruleForm.first_time = new Date(val2.first_time);
        this.ruleForm.upgrade = Number(val2.upgrade);
        this.ruleForm.repeat = Number(val2.repeat);
        this.ruleForm.again_time = new Date(val2.again_time);
        val2.courses.forEach(o => {
          this.updateCourse.push(Number(o));
          this.ruleForm.courses.push(Number(o))
          this.search(o);
        });
        this.ruleForm.tag = [];
        val2.tag.forEach(o=>{
          this.ruleForm.tag.push(o.id);
        })
        this.search(this.ruleForm.repeat);
        if(this.ruleForm.upgrade != 0){
          this.search(this.ruleForm.upgrade);
        }else{
          this.ruleForm.upgrade = "";
        }
        if(this.ruleForm.auditions != 0){
          this.search(this.ruleForm.auditions);
        }else{
          this.ruleForm.auditions = "";
        }
      }
      this.dialogVisable = true;
    },
    closeDialog(){//关闭弹框
      this.dialogVisable = false;
      this.resetForm()
      this.remoteList = [];
    },
    // 点击保存事件
    dialogSave(data){
      this.ruleForm = data;
      this.addLesson();
    },
    // 修改事件
    dialogChangeForm(data){
      this.ruleForm = data;
      this.addLesson();
    },
    // 获取派课列表
    async getLesson(){
      let params = {
        page:this.page,
        page_size:this.pageSize,
      }
      let ret = await this.$http.sendLessonList(params)
      if(ret.status == 0){
        this.cfaList = ret.result.list;
        this.eduTotal = Number(ret.result.count);
        this.selectedList = ret.result.courses;
      }else{
        this.$message({
          message:'获取任务列表失败',
          type:'warning'
        })
      }
    },
    // 新增派课 或修改派课
    async addLesson(data){
      this.ruleForm.expire = Date.parse(this.ruleForm.expire)/1000;
      this.ruleForm.end_time = Date.parse(this.ruleForm.end_time)/1000;
      this.ruleForm.first_time = Date.parse(this.ruleForm.first_time)/1000;
      this.ruleForm.again_time = Date.parse(this.ruleForm.again_time)/1000;
      this.ruleForm.courses = this.ruleForm.courses.join(",");
      this.ruleForm.upgrade = this.ruleForm.upgrade?this.ruleForm.upgrade : 0;
      this.ruleForm.auditions = this.ruleForm.auditions?this.ruleForm.auditions:0;
      this.ruleForm.tag = this.ruleForm.tag.join(',');
      let ret;
      if(this.type == "add"){
        ret = await this.$http.addSendLesson(this.ruleForm);
      }else{
        ret = await this.$http.changeCfaLesson(this.changeId,this.ruleForm);
      }
      if(ret.status === 0){
        this.$message({
          message:this.type == 'add'?'新建续课成功':'修改续课成功',
          type:'success'
        })
        this.dialogVisable = false;
        this.resetForm();
        this.getLesson();
      }else{
        this.$message({
          message:this.type == 'add'?'新建续课失败':'修改续课失败',
          type:'warning'
        })
      }
    },
    // 删除续派课
    deleteLesson(id){
      this.$confirm('确定要删除续派课任务吗','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type:'warning'
      }).then(()=>{
        this.$http.deleteCfaLesson(id).then((ret)=>{
          if(ret.status == 0){
            this.$message({
              message:'删除成功',
              type:'warning'
            })
            this.getLesson();
          }else{
            this.$message({
              message:'删除课程失败',
              type:'warining'
            })
          }
        })
      })
    },
    // 远程搜索将回显绑定课程
    async search(id){
      let params = {
        search_info:id,
        include_big:false,
      }
      let ret = await this.$http.getRemoteCourse(4,0,params);
      if(ret.status == 0){
          this.remoteList.push(ret.result[0]);
      }
    },
    // 远程搜索方法
    async remoteMethod(query) {
      if(query != ""){
        let params = {
          search_info:query,
          include_big:false,
        }
        this.loading = true;
        let ret = await this.$http.getRemoteCourse(4,0,params);
        this.loading = false;
        if(ret.status == 0){
          this.remoteList = ret.result;
        }else{
          this.remoteList = [];
        }
      }
    },
    async getRemoteTag(){
      let ret = await this.$http.getRemoteTag();
      if(ret.status === 0) {
        this.remoteTag = ret.result;
        this.remoteTag.forEach(o=>{
          o.name = o.tag_name;
          o.tagSubList = o.tagSubList? o.tagSubList : [];
          if(o.tagSubList.length == 0 || o.tagSubList.length == 1 &&  Array.isArray(o.tagSubList[0])){
            o.disabled = true;
            o.tagSubList[0].disabled = true;
          }
        })
      }
    },
    // 重置表单
    resetForm(){
      this.ruleForm.name = "";
      this.ruleForm.exam = "";
      this.ruleForm.tag = "" ;
      this.ruleForm.repeat = "";
      this.ruleForm.upgrade = '';
      this.ruleForm.auditions = "";
      this.ruleForm.first_time = "";
      this.ruleForm.again_time = "";
      this.ruleForm.courses = [];
      this.ruleForm.expire = "";
      this.ruleForm.end_time = ""
    }
  },
  created(){
    this.getLesson();
    this.getRemoteTag();
  }
}
</script>

<style scoped>
  .input-search {
    text-align: right;
    margin-bottom: 20px;
  }
</style>
