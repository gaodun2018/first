<template>
  <div class="module-clues-content add-resource">
    <div class="outlineeat">
      {{id?'编辑视频':'新增视频'}}
    </div>
    <div class="frombox">
      <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading"
               element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(255, 255, 255, 0.8)">
        <el-form-item label="视频名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
          <el-input v-model="ruleForm.title" placeholder="请填写视频名称" auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="项目" prop="project" class="w_50"
                      :rules="[{required: true, message: '请选择所属项目', trigger: 'change'}]">
          <el-select v-model="ruleForm.project" filterable placeholder="请选择所属项目" @change="didChangeProjectSelection"
                     @visible-change="visibleChange">
            <el-option :label="tag.name" :value="String(tag.id)" v-for="(tag, index) in tagsList"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject" class="w_50"
                      :rules="[{required: true, message: '请选择所属科目', trigger: 'change'}]">
          <el-select v-model="ruleForm.subject" filterable placeholder="请选择所属科目">
            <el-option :label="'不限科目'" :value="'0'"></el-option>
            <el-option :label="tag.name" :value="String(tag.id)" v-for="(tag,index) in subjectData"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="description">
          <el-input v-model="ruleForm.description" placeholder="备注说明" auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" prop="video_id" :rules="filter_rules({required:true,type:'isVideoId'})">
          <el-input v-model="ruleForm.video_id" placeholder="请输入视频ID" auto-complete="off" class="w_50"></el-input>
          <el-tooltip placement="top">
            <div slot="content">
              只需要输入地址中不同部分即可,如示例:红色部分：<br/>{{urltip}}
              <span style="color:red;">16oe3We00h1ye2hZ</span>{{urltip2}}
            </div>
            <i class="el-icon-info"></i>
          </el-tooltip>
          <!--<span class="gray_12">asdasdasd</span>-->
          <!-- <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button> -->
        </el-form-item>
        <el-form-item label="视频时长（分）" prop="duration_minutes" class="displayinline"
                      :rules="[{required: true,type:'number', message: '请填写视频时长的分钟', trigger: 'change,blur'}]">
          <el-input v-model.number="ruleForm.duration_minutes" placeholder="请填写视频时长的分钟" auto-complete="off"></el-input>
          分
        </el-form-item>
        <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline"
                      :rules="[{message: '请填写视频时长的秒',type:'number', trigger: 'change,blur'}]">
          <el-input v-model.number="ruleForm.duration_second" @change="handleInputChange" placeholder="请填写视频时长的秒"
                    auto-complete="off"></el-input>
          秒
        </el-form-item>
        <el-form-item label="讲课老师" class="w_50">
          <el-select v-model="ruleForm.teacher_id" filterable remote reserve-keyword placeholder="请选择一个老师（可输入老师姓名搜索）"
                     :remote-method="remoteMethod" :loading="selectLoading">
            <el-option v-for="item in teacherOptions" :key="item.user_id" :label="item.name+'-ID:'+item.user_id"
                       :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="知识点关联" prop="name">
          <el-row>
            <el-tag class="teacher-tag" v-for="tag in ruleForm.knowledge_id" :key="tag.id" closable @close="">
              {{tag.title}} -{{tag.id}}）
            </el-tag>
          </el-row>
          <el-button type="text" @click="handleOpenKnowledgeDialog">选择知识点</el-button>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          `
          <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <SelectKnowledge
      ref="selectKnowledge"
      :dialog-knowledge-visible="dialogKnowledgeVisible"
      :knowledge-list="knowledgeList"
      :current-syllabus-item-knowledge="currentSyllabusItemKnowledge"
      @changeCurrentSyllabusItemKnowledge="changeCurrentSyllabusItemKnowledge"
      @handleCloseKnowledgeDialog="handleCloseKnowledgeDialog"
    ></SelectKnowledge>
  </div>
</template>
<script>
  import SelectKnowledge from "../../public/SelectKnowledgeDialog.vue";
  import {getSrcStr} from "../../../util/util.js";
  import {mapState} from "vuex";

  export default {
    components: {
      SelectKnowledge
    },
    props: ["id"],
    data() {
      return {
        subjectData: [],
        loading: false,
        selectLoading: false,
        selectFalg: false,
        ruleForm: {
          title: "",
          project: "",
          subject: "",
          video_id: "",
          duration_minutes: "",
          duration_second: 0,
          description: "",
          teacher_id:'',
          knowledge_id:''
        },
        multipleSelection: [],
        urltip: '[<script src="https://s.gaodun.com/web/static-player/loader.js?',
        urltip2: `-3" type="text/javascript">${"</"}script>]`,
        selectValue: '',
        teacherOptions: [],
        seachTimeOut: null,
        dialogKnowledgeVisible: false,//选择知识点弹层
        knowledgeList: [],//知识点列表
        currentSyllabusItemKnowledge: '',//当前大纲条目说关联的知识点
      };
    },
    methods: {
      handleCloseKnowledgeDialog(){
        this.dialogKnowledgeVisible = false;
        this.ruleForm.knowledge_id = this.currentSyllabusItemKnowledge;
      },
      changeCurrentSyllabusItemKnowledge(v) {
        //切换关联的知识点
        this.currentSyllabusItemKnowledge = v;
      },
      //  打开关联知识点弹层
      async handleOpenKnowledgeDialog(item) {
        await this.getResourceKnowledgeList();
        this.dialogKnowledgeVisible = true;
        setTimeout(() => {
          this.$refs.selectKnowledge.showSelectSyllabusKnowledge(21059);
        }, 0)
      },
      //获取大纲所属项目科目最新考试大纲
      async getResourceKnowledgeList() {
        let params = {
          tag_id: this.ruleForm.subject,//id
        }
        let ret = await this.$http.getResourceKnowledgeList(params);
        ret = {
          "status": 0,
          "message": "请求成功",
          "result": {
            "status": 0,
            "message": "",
            "result": {
              "id": 149,
              "title": "CMA",
              "contents": [
                {
                  "parent": null,
                  "depth": 1,
                  "children": [
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21057,
                          "relation_type": 5,
                          "id": 21058,
                          "title": "资产负债表",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21057,
                          "relation_type": 5,
                          "id": 21059,
                          "title": "损益表",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21057,
                          "relation_type": 5,
                          "id": 21060,
                          "title": "现金流量表",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21057,
                      "title": "财务报表",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21061,
                          "relation_type": 5,
                          "id": 21062,
                          "title": "应收",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21061,
                          "relation_type": 5,
                          "id": 21063,
                          "title": "存货",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21061,
                          "relation_type": 5,
                          "id": 21064,
                          "title": "投资",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21061,
                          "relation_type": 5,
                          "id": 21065,
                          "title": "固定资产",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21061,
                      "title": "资产",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21066,
                          "relation_type": 5,
                          "id": 21067,
                          "title": "负债",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 1,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21066,
                      "title": "负债",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 1,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21068,
                          "relation_type": 5,
                          "id": 21069,
                          "title": "所得税",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21068,
                      "title": "所得税",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21070,
                          "relation_type": 5,
                          "id": 21071,
                          "title": "租赁",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21070,
                      "title": "租赁",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21072,
                          "relation_type": 5,
                          "id": 21073,
                          "title": "权益",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21072,
                      "title": "权益",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21074,
                          "relation_type": 5,
                          "id": 21075,
                          "title": "收入确认",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21074,
                      "title": "收入确认",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21076,
                          "relation_type": 5,
                          "id": 21077,
                          "title": "美国准则和国际准则",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21076,
                      "title": "美国准则和国际准则",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    }
                  ],
                  "knowledges": null,
                  "examination_syllabus_id": 149,
                  "question_type": 0,
                  "id": 21056,
                  "title": "对外财务报告决策",
                  "difficulty": 0,
                  "created_at": 1527737061,
                  "updated_at": 1527737061,
                  "score": 0,
                  "test_rate": 0,
                  "important": 2,
                  "number_of_questions": 0,
                  "project_id": 2,
                  "subject_id": 76,
                  "definition": null
                },
                {
                  "parent": null,
                  "depth": 1,
                  "children": [
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21079,
                          "relation_type": 5,
                          "id": 21080,
                          "title": "战略框架",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21079,
                      "title": "战略框架",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 4,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21081,
                          "relation_type": 5,
                          "id": 21082,
                          "title": "预算的概念",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21081,
                          "relation_type": 5,
                          "id": 21083,
                          "title": "预算的编制方法",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21081,
                      "title": "预算的概念",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21084,
                          "relation_type": 5,
                          "id": 21085,
                          "title": "回归分析",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21084,
                          "relation_type": 5,
                          "id": 21086,
                          "title": "学习曲线",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21084,
                          "relation_type": 5,
                          "id": 21087,
                          "title": "期望值",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21084,
                      "title": "预测技术",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21088,
                          "relation_type": 5,
                          "id": 21089,
                          "title": "经营预算",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21088,
                          "relation_type": 5,
                          "id": 21090,
                          "title": "财务预算",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21088,
                      "title": "编制预算",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    }
                  ],
                  "knowledges": null,
                  "examination_syllabus_id": 149,
                  "question_type": 0,
                  "id": 21078,
                  "title": "规划、预算编制与预测",
                  "difficulty": 0,
                  "created_at": 1527737061,
                  "updated_at": 1527737061,
                  "score": 0,
                  "test_rate": 0,
                  "important": 4,
                  "number_of_questions": 0,
                  "project_id": 2,
                  "subject_id": 76,
                  "definition": null
                },
                {
                  "parent": null,
                  "depth": 1,
                  "children": [
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21092,
                          "relation_type": 5,
                          "id": 21093,
                          "title": "差异分析总体概述",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21092,
                          "relation_type": 5,
                          "id": 21094,
                          "title": "直接材料和直接人工差异",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21092,
                          "relation_type": 5,
                          "id": 21095,
                          "title": "变动制造费用和固定制造费用差异",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21092,
                          "relation_type": 5,
                          "id": 21096,
                          "title": "销售量差异",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21092,
                      "title": "差异分析",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 4,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21097,
                          "relation_type": 5,
                          "id": 21098,
                          "title": "责任中心",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21097,
                      "title": "责任中心",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21099,
                          "relation_type": 5,
                          "id": 21100,
                          "title": "转移定价",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21099,
                      "title": "转移定价",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21101,
                          "relation_type": 5,
                          "id": 21102,
                          "title": "投资回报率和剩余收益",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21101,
                          "relation_type": 5,
                          "id": 21103,
                          "title": "平衡计分卡",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21101,
                      "title": "绩效评估",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 4,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    }
                  ],
                  "knowledges": null,
                  "examination_syllabus_id": 149,
                  "question_type": 0,
                  "id": 21091,
                  "title": "绩效管理",
                  "difficulty": 0,
                  "created_at": 1527737061,
                  "updated_at": 1527737061,
                  "score": 0,
                  "test_rate": 0,
                  "important": 4,
                  "number_of_questions": 0,
                  "project_id": 2,
                  "subject_id": 76,
                  "definition": null
                },
                {
                  "parent": null,
                  "depth": 1,
                  "children": [
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21105,
                          "relation_type": 5,
                          "id": 21106,
                          "title": "成本基础",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21105,
                      "title": "成本基础",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21107,
                          "relation_type": 5,
                          "id": 21108,
                          "title": "成本系统",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21107,
                      "title": "成本系统",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21109,
                          "relation_type": 5,
                          "id": 21110,
                          "title": "吸收成本法和变动成本法",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21109,
                      "title": "吸收成本法和变动成本法",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21111,
                          "relation_type": 5,
                          "id": 21112,
                          "title": "分批法",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21111,
                          "relation_type": 5,
                          "id": 21113,
                          "title": "分步法",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21111,
                          "relation_type": 5,
                          "id": 21114,
                          "title": "作业成本法",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 4,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21111,
                          "relation_type": 5,
                          "id": 21115,
                          "title": "生命周期成本法",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21111,
                      "title": "成本计量系统",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 4,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21116,
                          "relation_type": 5,
                          "id": 21117,
                          "title": "联合成本分配",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21116,
                      "title": "联合成本分配",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21118,
                          "relation_type": 5,
                          "id": 21119,
                          "title": "服务部门间接费用分配",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21118,
                      "title": "服务部门间接费用分配",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21120,
                          "relation_type": 5,
                          "id": 21121,
                          "title": "供应链管理",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21120,
                      "title": "供应链管理",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21122,
                          "relation_type": 5,
                          "id": 21123,
                          "title": "业务流程改进",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21122,
                      "title": "业务流程改进",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    }
                  ],
                  "knowledges": null,
                  "examination_syllabus_id": 149,
                  "question_type": 0,
                  "id": 21104,
                  "title": "成本管理",
                  "difficulty": 0,
                  "created_at": 1527737061,
                  "updated_at": 1527737061,
                  "score": 0,
                  "test_rate": 0,
                  "important": 3,
                  "number_of_questions": 0,
                  "project_id": 2,
                  "subject_id": 76,
                  "definition": null
                },
                {
                  "parent": null,
                  "depth": 1,
                  "children": [
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21125,
                          "relation_type": 5,
                          "id": 21126,
                          "title": "内部控制",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21125,
                      "title": "内部控制",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21127,
                          "relation_type": 5,
                          "id": 21128,
                          "title": "法律",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        },
                        {
                          "relation_id": 21127,
                          "relation_type": 5,
                          "id": 21129,
                          "title": "审计意见",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21127,
                      "title": "法律",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21130,
                          "relation_type": 5,
                          "id": 21131,
                          "title": "内部审计",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 3,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21130,
                      "title": "内部审计",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 3,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    },
                    {
                      "parent": null,
                      "depth": 2,
                      "children": [
                        {
                          "relation_id": 21132,
                          "relation_type": 5,
                          "id": 21133,
                          "title": "系统安全",
                          "difficulty": 0,
                          "created_at": 1527737061,
                          "updated_at": 1527737061,
                          "score": 0,
                          "test_rate": 0,
                          "important": 2,
                          "number_of_questions": 0,
                          "project_id": 2,
                          "subject_id": 76,
                          "definition": ""
                        }
                      ],
                      "knowledges": null,
                      "examination_syllabus_id": 149,
                      "question_type": 0,
                      "id": 21132,
                      "title": "系统安全",
                      "difficulty": 0,
                      "created_at": 1527737061,
                      "updated_at": 1527737061,
                      "score": 0,
                      "test_rate": 0,
                      "important": 2,
                      "number_of_questions": 0,
                      "project_id": 2,
                      "subject_id": 76,
                      "definition": null
                    }
                  ],
                  "knowledges": null,
                  "examination_syllabus_id": 149,
                  "question_type": 0,
                  "id": 21124,
                  "title": "内部控制",
                  "difficulty": 0,
                  "created_at": 1527737061,
                  "updated_at": 1527737061,
                  "score": 0,
                  "test_rate": 0,
                  "important": 3,
                  "number_of_questions": 0,
                  "project_id": 2,
                  "subject_id": 76,
                  "definition": null
                }
              ],
              "project": {
                "id": 2,
                "name": "CMA",
                "spell": null
              },
              "subject": {
                "id": 76,
                "project": null,
                "name": "新纲 中文Part 1"
              },
              "version": 201809,
              "old_version": "",
              "enabled": false
            }
          }
        };
        if (ret.status === 0) {
          this.knowledgeList = ret.result.result.contents;
        }
      },
      //  搜索老师
      remoteMethod(query) {
        if (query !== '') {
          clearTimeout(this.seachTimeOut);
          this.seachTimeOut = setTimeout(() => {
            console.log(query);
            this.selectLoading = true;
            let params = {
              name: query
            };
            this.$http.searchTeacher(params)
              .then(res => {
                console.log(res);
                this.selectLoading = false;
                if (res.status === 0) {
                  this.teacherOptions = res.result;
                }
              })
              .catch(err => {
                this.selectLoading = false;
                console.log(err);
              });
          }, 500);
        } else {
          this.teacherOptions = [];
        }
      },
      async initData() {
        let ret = await this.$http.getOneResource(this.$route.params.id);
        if (ret.status == 0) {
          let data = ret.result.resource;
          this.ruleForm.title = data.title;
          this.ruleForm.description = data.description;
          this.ruleForm.video_id = data.video_id;
          this.ruleForm.duration_minutes = Number(data.duration_minutes);
          this.ruleForm.duration_second = Number(data.duration_seconds);
          if (data.tag && data.tag.id && data.tag.id != 0) {
            this.ruleForm.project = String(data.tag.id);
            this.ruleForm.subject =
              data.tag.children && data.tag.children.length != 0
                ? String(data.tag.children[0].id)
                : "0";
            this.didChangeProjectSelection(data.tag.id); //项目id
          } else {
            //没项目，没科目
            this.ruleForm.project = "";
            this.ruleForm.subject = "";
          }
        }
      },
      //秒数输入框change事件
      handleInputChange(val) {
        if (val == "") {
          this.ruleForm.duration_second = 0;
        }
      },
      //解析视频地址获得视频id
      async getVideoPath() {
        let url = getSrcStr(this.ruleForm.video_id);
        let params = {
          url: url
        };
        let ret = await this.$http.getVideoPath(params);
        return ret;
      },
      //选择器开关函数
      visibleChange(bool) {
        this.selectFalg = bool;
      },
      // 项目
      didChangeProjectSelection(id) {
        this.tagsList.forEach(item => {
          if (item.id == id) {
            let subject_list = [...item.children];
            this.subjectData = subject_list;
            if (this.selectFalg) {
              this.ruleForm.subject = "0";
            }
          }
        });
      },
      //新增视频
      async createResourceForm() {
        /* let pathRet = await this.getVideoPath();
         let video_id = "";
         if (pathRet.status == 0) {
           if (!pathRet.result.video_id) {
             return this.$message({
               type: "warning",
               message: "视频地址解析失败！"
             });
           }
           video_id = pathRet.result.video_id;
         } else if (pathRet.status == 1) {
           //为1时使用用户输入的地址
           video_id = this.ruleForm.video_id;
         } else {
           return this.$message({
             type: "warning",
             message: "视频地址解析失败！"
           });
         }*/
        let params = {
          title: this.ruleForm.title,
          description: this.ruleForm.description,
          tag_id: this.ruleForm.subject == "0" ? this.ruleForm.project : this.ruleForm.subject,
          duration_minutes: this.ruleForm.duration_minutes,
          duration_seconds: this.ruleForm.duration_second ? this.ruleForm.duration_second : 0,
          // video_id: video_id
          video_id: this.ruleForm.video_id,
          teacher_id:this.ruleForm.teacher_id
        };
        if (this.$route.params.id) {
          params.id = this.$route.params.id;
        }
        this.loading = true;
        let createResponse = await this.$http.storeResource(params);
        this.loading = false;
        if (createResponse.status == 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/resource/video/list"
            });
          }, 1000);
          // this.resetForm('ruleForm');
        } else {
          this.$message({
            message: "保存失败",
            type: "error"
          });
        }
      },
      //修改视频资源
      async editVideoResource() {
        let pathRet = await this.getVideoPath();
        let video_id = "";
        if (pathRet.status == 0) {
          if (!pathRet.result.video_id) {
            return this.$message({
              type: "warning",
              message: "视频地址解析失败！"
            });
          }
          video_id = pathRet.result.video_id;
        } else if (pathRet.status == 1) {
          //为1时使用用户输入的地址
          video_id = this.ruleForm.video_id;
        } else {
          return this.$message({
            type: "warning",
            message: "视频地址解析失败！"
          });
        }
        let params = {
          title: this.ruleForm.title,
          description: this.ruleForm.description,
          tag_id:
            this.ruleForm.subject == "0"
              ? this.ruleForm.project
              : this.ruleForm.subject,
          duration_minutes: this.ruleForm.duration_minutes,
          duration_seconds: this.ruleForm.duration_second
            ? this.ruleForm.duration_second
            : 0,
          video_id: video_id
        };
        this.loading = true;
        let Response = await this.$http.editVideoResource(
          this.$route.params.id,
          params
        );
        this.loading = false;
        if (Response.status == 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/resource/video/list"
            });
          }, 1000);
          // this.resetForm('ruleForm');
        } else {
          this.$message({
            message: "保存失败",
            type: "error"
          });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // if (this.$route.params.id) {
            //   //修改'
            //   this.editVideoResource();
            // } else {
            //新增
            this.createResourceForm();
            // }
          } else {
            console.log("error submit!!");
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //关闭弹层
      closeDialog(formName) {
        this.bSubject = false;
        this.dialogCourseVisible = false;
        this.$refs[formName].resetFields();
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    computed: {
      ...mapState({
        tagsList: state => {
          return state.resources.tagsList;
        }
      })
    },
    async created() {
      this.loading = true;
      this.id = this.$route.params.id;
      await this.$store.dispatch("getTagsList", "project");
      if (this.$route.params.id) {
        await this.initData();
        await this.getResourceKnowledgeList();
      }
      this.loading = false;
    }
  };
</script>
