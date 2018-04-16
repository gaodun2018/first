<template>
  <div class="module-edu-content permission-courseoutline">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']" @click="outlinechange('0')">全部</span>
              <span class="clitem" v-for="(rev,index) in projectlist" :key="index" :class="[rev.project_id === clver ?'current':'']" @click="outlinechange(rev.project_id,index)">{{rev.project_name}}</span>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']" @click="mulchange('0')">全部</span>
            <span class="clitem" v-for="(revs,index) in subjectlist" :key="index" :class="[revs.subject_id === clversm ?'current':'']" @click="mulchange(revs.subject_id,index)">{{revs.subject_name}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" align="bottom">
        <el-col :sm="12">
          <el-row>
            <div class="select-search">
              <el-select v-model="selectvalue" @change="selectval" placeholder="请选择" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-row>
        </el-col>
        <el-col :sm="12">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="请输入考试大纲ID、名称" size="small" icon="search" v-model="searchinput"
                        :on-icon-click="handleIconClick" @keyup.native.enter="handleIconClick"></el-input>
              <el-button type="primary" size="small" @click="addCourseOutline">新建一个考试大纲</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" border :data="ExaminationSyllabusList" style="width: 100%">
        <el-table-column prop="id" label="大纲ID" min-width="100" fixed>
        </el-table-column>
        <el-table-column prop="title" label="考试大纲名称" min-width="200">
        </el-table-column>
        <el-table-column prop="project.name" label="项目" min-width="100">
        </el-table-column>
        <el-table-column prop="subject.name" label="科目" min-width="125">
        </el-table-column>
        <el-table-column prop="version" label="版本" min-width="90">
        </el-table-column>
        <el-table-column label="所属状态" min-width="95">
          <template slot-scope="scope">
            <span v-if="scope.row.enabled == true">启用</span>
            <span class="rowtype" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间" min-width="150">
        </el-table-column>
        <el-table-column label="操作" min-width="250" fixed="right" align="center">
          <!-- <template slot-scope="scope">
            <el-button type="text" @click="">修改</el-button>
            <el-button type="text" @click="">查看大纲</el-button>
            <el-button type="text" @click="">导入</el-button>
            <el-button type="text" @click="">更新缓存</el-button>
          </template> -->
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="itemCount">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<style>

</style>
<script>
    export default {
        data() {
            return {
                searchinput:'',
                ExaminationSyllabusList:[],
                itemCount:0,
                ruleForm: {
                    title:'',
                    project_id:'',
                    subject_id:'',
                    status:''
                },
                dialogFormVisible: false,
                options: [{
                    value: -1,
                    label: '全部状态'
                }, {
                    value: 0,
                    label: '启用'
                }, {
                    value: 1,
                    label: '禁用'
                }],
                selectvalue:-1,
                clver:-1,     //项目id
                clversm:-1,   //科目id
                projectlist:[],
                subjectlist:[],
                issubject:false,
                boxsubject:[],
                currentPage:1,   //第几页 当前页码
                page_size:50,    //一页显示多少
                currentIndex:'',
                substatus:'addoutline',
                outlineid:'',
                dialogCourse:true,
                selectcur:true
            }
        },
        methods: {
            checkproject(value){
                console.log(this.selectcur)
                if(this.selectcur){
                    for(let reg of this.projectlist){
                        if(reg.project_id == value){
                            this.issubject = true;
                            let subjectall = [...reg.subject_list];
                            subjectall.unshift({
                                subject_id:'0',
                                subject_name:'全部'
                            })
                            this.boxsubject = subjectall;
                            this.ruleForm.subject_id = '0';
                        }
                    }
                    this.selectcur = true;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            outlinechange(reid,index){
                this.clver = reid;
                if (reid == '0') {
                    this.subjectlist = [];
                } else {
                    this.subjectlist = this.projectlist[index].subject_list;
                }
                this.clversm = -1;  //科目设置为0
                this.pageSize = 15;
                this.currentPage = 1;
                this.searchinput = '';
                this.selectvalue = -1;
                this.getExamSyllabuses(1,this.page_size);
            },
            mulchange(reid){
                this.clversm = reid;
                this.pageSize = 15;
                this.currentPage = 1;
                this.searchinput = '';
                this.getExamSyllabuses();
            },
            async getProjectSubject(projectid){
                let ret = await this.$http.getProjectSubject();
                if(ret.status == 0){
                    this.projectlist = ret.result;
                }
            },
            selectval(value){ // 状态搜索
                this.selectvalue = value;
                this.getExamSyllabuses(1,this.page_size);
                this.searchinput = "";
            },
            handleIconClick(){   // 搜索框

                this.getExamSyllabuses();
            },
            //拉去大纲列表
            async getExamSyllabuses(){
                console.log(this.currentPage);
                let ret = await this.$http.ExamSyllabuses({
                    currentPage:this.currentPage,
                    limit:this.page_size,
                    project_id:this.clver,
                    subject_id:this.clversm,
                    enable:this.selectvalue,
                    search:this.searchinput
                });
                if(ret.status == 0){
                    this.ExaminationSyllabusList = ret.result;
                    this.itemCount = ret.message;
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.page_size = val;
                this.currentPage = 1;
//        this.getExamSyllabuses();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getExamSyllabuses();
            },
            //查看大纲按钮
            checkSyllabus(index,row){
                console.log(row);
                if(row.template == null){
                    this.$router.replace({
                        path:'/CourseOutlineManage/CourseOutline/'+row.id,
                    })
                }else{
                    this.$router.push({
                        path:'/CourseOutlineManage/CourseModule/'+row.id,
                    })
                }
            }
        },
        computed: {},
        mounted() {
            this.getProjectSubject();
            this.getExamSyllabuses();
        },
        created() {

        }
    }
</script>