<template>
    <div class="module-clues-content add-resource resource-group-form-wrapper">
      <div class="outlineeat">
        {{id?'编辑资源组':'新增资源组'}}
      </div>
      <div class="frombox">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.8)">
          <el-form-item label="资源组名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
            <el-input v-model="ruleForm.title" placeholder="请填写资源组名称" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目" prop="project" :rules="[{required: true, message: '请选择所属项目', trigger: 'change'}]">
            <el-select v-model="ruleForm.project" filterable placeholder="请选择所属项目" @focus="handleSelectFocus" @change="didChangeProjectSelection" @visible-change="visibleChange">
              <el-option :label="tag.name" :value="String(tag.id)" v-for="(tag, index) in tagsList" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="科目" prop="subject" :rules="[{required: true, message: '请选择所属科目', trigger: 'change'}]">
            <el-select :disabled="ruleForm.project==''||ruleForm.project==undefined||ruleForm.project==null" v-model="ruleForm.subject" filterable placeholder="请选择所属科目">
              <el-option :label="'不限科目'" :value="'0'"></el-option>
              <el-option :label="tag.name" :value="String(tag.id)" v-for="(tag,index) in subjectData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注说明" prop="description">
            <el-input v-model="ruleForm.description" placeholder="备注说明" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择资源">
            <el-button :disabled="ruleForm.project==''||ruleForm.project==undefined||ruleForm.project==null" type="primary" @click="handleOpenDialog">选择资源</el-button>
            <el-row>
              <el-tag size="small" :key="tag.id" v-for="tag in multipleSelection" closable :disable-transitions="false" @close="handleCloseTag(tag)">
                <span class="tag-title" :title="tag.title">{{tag.title}}</span>
                <span class="tag-id">（ID：{{tag.id}}）</span>
              </el-tag>
            </el-row>
          </el-form-item>
          <el-form-item style="text-align: right;margin-top:60px;">
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog title="选择资源" center width="60%" class="tabplane addResourceDialog" top="2%" :visible.sync="dialogFormVisible">
        <el-row class="scroll-content" style="margin-bottom:10px;">
          <el-tag size="small" :key="tag.id" v-for="tag in multipleSelection" closable :disable-transitions="false" @close="handleCloseTag(tag)">
            <span class="tag-title" :title="tag.title">{{tag.title}}</span>
            <span class="tag-id">（ID：{{tag.id}}）</span>
            <router-link  :to="{name:'previewVideo',params: { id: tag.id }}" tag="a" target="_blank"> <span class="tag-watch">预览</span></router-link>
          </el-tag>
        </el-row>
        <el-row>
          <el-input placeholder="输入资源ID/名称搜索" size="small" v-model="resourceinput" @keydown.native.enter="handleIconClick">
            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
          </el-input>
          <el-table ref="multipleTable" :data="resourceTable" border tooltip-effect="dark" v-loading="resLoading" style="width:100%;margin-top:20px;" max-height="400" @selection-change="handleSelectionChange" highlight-current-row :row-key="getRowKeys">
            <el-table-column :reserve-selection="true" type="selection" width="55">
            </el-table-column>
            <el-table-column :label="item.label" :width="item.wh" v-for="(item,index) in resourceTableConfig" :key="index" show-overflow-tooltip>
              <template slot-scope="scope">
                <template v-if="item.key == 'id' || item.key == 'paper_id' || item.key == 'live_id' ">
                  <span>{{scope.row.video.id}}</span>
                </template>
                 <span v-else-if="item.key == 'name'">{{scope.row.teacher_info | judgeTeacher}}</span>
                <span v-else-if="item.key == 'discriminator'">{{scope.row[item.type][item.key] | Resource2chn}}</span>
                <span v-else>{{scope.row[item.type][item.key]}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.current_page" :page-size="50" layout="total, prev, pager, next, jumper" :total="pagination.total">
          </el-pagination>
        </el-row>
        <div slot="footer" class="coursebtn" style="padding-top: 0;margin-top: 20px;">
          <el-button type="primary" @click="selectResource">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import { resourceTableConfig } from "../../common/courseConfig.js";
  import { mapState } from "vuex";
  export default {
    components: {},
    props: ["id"],
    data() {
      return {
        subjectData: [],
        loading: false,
        selectFalg: false,
        ruleForm: {
          title: "",
          project: "",
          subject: "",
          description: ""
        },
        resourceinput: "", //搜索资源输入框
        multipleSelection: [], //所有选择段资源
        pagination: {
          current_page: 1, //资源列表当前页数
          total: 1 //资源列表总数量
        },
        searchResourceTimer: null, //延时器
        dialogFormVisible: false, //弹层
        resLoading: false,
        resourceTable: [], //资源列表
        resourceTableConfig: resourceTableConfig[0]["table"], //表单配置
        getRowKeys(row) {
          return row.id;
        },
        lastSelect: {
          project: "",
          subject: ""
        }
      };
    },
    filters:{
      judgeTeacher:(val)=>{
        if(val == null){
          return '无';
        }else{
          return val.name;
        }
      }
    },
    methods: {
      // 删除选择的资源
      handleCloseTag(tag) {
        this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1);
        this.toggleSelection([tag]);
      },
      // 打开选择资源的弹层
      handleOpenDialog() {
        // 搜索资源...
        this.searchResource();
        this.dialogFormVisible = true;
      },
      //分页搜索
      async handleCurrentChange(val) {
        val = Number(val);
        this.searchResource(val);
      },
      //点击搜索
      async handleIconClick() {
        if (this.pagination.current_page != 1) {
          this.pagination.current_page = 1;
        } else {
          this.searchResource();
        }
      },
      // 项目框获得焦点时
      handleSelectFocus() {
        // 记录下当前选中的项目科目
        (this.lastSelect.project = this.ruleForm.project),
          (this.lastSelect.subject = this.ruleForm.subject),
          console.log("handleSelectFocushandleSelectFocus");
      },
      selectResource() {
        this.dialogFormVisible = false;
      },
      // 编写方法将返回的数据显示在table表格中
      showSelect(){
         this.multipleSelection.forEach(o=>{
           this.resourceTable.forEach(x=>{
              if(o.id == x.video.id){
                this.$refs.multipleTable.toggleRowSelection(x);
              }
           })
         })
      },
      // 编写去重函数
      onlyOne(arr){
        let j;
        let result = []
        for (let i = 0; i < arr.length; i++) {
            for (j = i + 1; j < arr.length; j++) {
                if (arr[i].id == arr[j].id) {
                    j = ++i
                }
            }
            result.push(arr[i])
        }
        return result
      },
      //搜索资源
      searchResource(val) {
        clearTimeout(this.searchResourceTimer);
        this.resLoading = true;
        this.searchResourceTimer = setTimeout(async () => {
          clearTimeout(this.searchResourceTimer);
          let params = {
            discriminator: "video",
            page_size: 50,
            page: val ? val : 1,
            "order_by[]": "desc", //顺序   倒序
            "order_by_field[]": "id", //排序字段
            tag_id: this.ruleForm.project,
            action_type:1
          };
          // let ret = await this.$http.getResource(params);
          let ret = await this.$http.newGetTeacher(params);
          console.log('新获取的数据',ret)
          if (ret.status == 0) {
            this.resLoading = false;
            this.resourceTable = ret.result.resources;
            this.pagination.total = ret.result.pagination.total;
            // this.showSelect();
          }
        }, 500);
      },
      async initData() {
        let arrRet = await Promise.all([
          this.$http.getOneResource(this.$route.params.id),
          this.$http.getResourceGroup({ group_id: this.$route.params.id })
        ]);
        let ret = arrRet[0];
        let ret1 = arrRet[1];
        if (ret.status === 0) {
          let data = ret.result.resource;
          this.ruleForm.title = data.title;
          this.ruleForm.description = data.description;

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
        if (ret1.status === 0) {
          console.log("获取到的数据", ret1);
          this.multipleSelection = ret1.result;
        }
      },
      //秒数输入框change事件
      handleInputChange(val) {
        if (val == "") {
          this.ruleForm.duration_second = 0;
        }
      },
      //选择器开关函数
      visibleChange(bool) {
        this.selectFalg = bool;
      },
      // 项目
      didChangeProjectSelection(id) {
        if (this.selectFalg) {
          // return
        }
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
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (
              this.multipleSelection == undefined ||
              this.multipleSelection == null ||
              this.multipleSelection.length === 0
            ) {
              return this.$message({
                message: "请选择资源！",
                type: "error"
              });
            }
            this.createResourceForm();
          } else {
            console.log("error submit!!");
          }
        });
      },
      //新增/修改资源组
      async createResourceForm() {
        let resource_id = [];
        this.multipleSelection.forEach(ele => {
          resource_id.push(ele.id);
        });
        let params = {
          title: this.ruleForm.title,
          description: this.ruleForm.description,
          tag_id: this.ruleForm.subject == "0" ? this.ruleForm.project : this.ruleForm.subject,
          "resource_id[]": resource_id
        };
        console.log(268,params)
        if (this.$route.params.id) {
          params.id = this.$route.params.id;
        }
        this.loading = true;
        let createResponse = await this.$http.createResourceGroup(params);
        this.loading = false;
        if (createResponse.status == 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({
              path: "/resource/resource-group/list"
            });
          }, 1000);
        } else {
          this.$message({
            message: "保存失败:"+createResponse.message,
            type: "error"
          });
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 多选资源
      handleSelectionChange(val) {
        val.forEach(o=>{//改变数据结构
          if(o.video){
            o.id=o.video.id,
            o.title=o.video.title
            }
          if(o.teacher_info){
              o.teacher_id = o.teacher_info.user_id;
            }else{
              o.teacher_id = 0;
          }
        })
        // val = this.onlyOne(val);// 数组去重
        if (val.length > 10) {//判断选择个数
          this.$message({
            message: "最多选择10个资源！",
            type: "warning"
          });
          this.toggleSelection([val[val.length - 1]]);
          return;
        }
        console.log(val);
        this.multipleSelection = val;
      },
      // 表格回显
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
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
      // this.resource = (await getOneResource(this.id)).result
      await this.$store.dispatch("getTagsList", "project");
      if (this.$route.params.id) {
        await this.initData();
      }
      this.loading = false;
    }
  };
  </script>
  <style lang="less">
  // 添加了预览样式编写
  .tag-watch{
    cursor: pointer;
    color: #0677ea;
    font-weight: 900;
  }
  .resource-group-form-wrapper {
    .frombox {
      .el-tag {
        margin-bottom: 10px;
        .tag-title {
          display: inline-block;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
          white-space: nowrap;
        }
        .tag-id {
          vertical-align: middle;
        }
      }
      .el-tag + .el-tag {
        margin-left: 10px;
      }
    }
    .tabplane .el-dialog {
      min-width: 680px;
      margin-bottom: 0px;
    }
    .addResourceDialog {
      .el-dialog__header {
        padding-top: 15px;
      }
      .el-dialog__body {
        padding-top: 10px;
        padding-bottom: 0;
        .scroll-content {
          max-height: 100px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 6px;
            background-color: #fff;
          }
          &::-webkit-scrollbar-track {
            border-radius: 3px;
            background-color: #fff;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background-color: #d3d3d3;
          }
        }
        .el-tag {
          margin-bottom: 10px;
          .tag-title {
            display: inline-block;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: middle;
            white-space: nowrap;
          }
          .tag-id {
            vertical-align: middle;
          }
        }
        .el-tag + .el-tag {
          margin-left: 10px;
        }
        .el-table__header-wrapper {
          .el-table__header {
            .el-table-column--selection {
              .cell {
                display: none;
              }
            }
          }
        }
      }
      .el-dialog__footer {
        padding-bottom: 10px;
      }
      .el-pagination {
        text-align: right;
        margin-top: 14px;
      }
    }
  }
  @media screen and (min-height: 320px) and (max-height: 650px) {
    .resource-group-form-wrapper {
      .addResourceDialog {
        .el-dialog {
          margin-top: 1px !important;
          margin-bottom: 0px;
          .el-dialog__header {
            padding-top: 10px;
          }
          .el-dialog__body {
            padding-top: 0px;
            padding-bottom: 10px;
            .el-table {
              margin-top: 5px !important;
            }
            .coursebtn {
              margin-top: 0 !important;
            }
          }
        }
      }
    }
  }
  </style>
