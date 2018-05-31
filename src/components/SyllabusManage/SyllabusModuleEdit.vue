<template>
  <div class="module-edu-content permission-outlinemodule">
    <el-row class="outlineeat">
      <el-col :span="18">
        课程大纲：{{title}}
      </el-col>
      <el-col :span="6" v-if="coursesylllevel === 4" style="text-align:right;">
        <el-switch v-model="value4" active-text="是否启用知识点关联">
        </el-switch>
      </el-col>
    </el-row>
    <div class="outlinebox">
      <div class="chapterbox">
        <template v-if="coursesylllevel === 3">
          <!-- <draggable v-model="tabledata" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.first-chapter-box'}"> -->
          <div v-for="firstItem in tabledata" :key="firstItem.id" class="first-chapter-box">
            <div class="chaptit">
              <span class="chlft">{{firstItem.name}}</span>
              <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
              <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
              <span class="chrgt1" @click="openChildDialog(firstItem.id)">增加子目录</span>
            </div>
            <draggable v-model="firstItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.second-chapter-box'}">
              <div v-for="secItem in firstItem.children" :key="secItem.id" class="second-chapter-box">
                <div class="chaptit chapsecd">
                  <span class="chlft">{{secItem.name}}</span>
                  <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                  <span class="chrgt" @click="openDelOutlineDialog(secItem.id)">删除</span>
                  <span class="chrgt1 yellow" @click="openAddResDialog(secItem.id)">新增资源</span>
                </div>
                <draggable v-model="secItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.third-chapter-box'}">
                  <div class="resourcebox third-chapter-box" v-for="thirdItem in secItem.children" :key="thirdItem.id">
                    <div class="knowledge">
                      <el-tag class="attribute-tag" size="small" type="danger" v-if="thirdItem.apply_to">{{thirdItem.apply_to=='2'?'提分盒子':'跳级测试'}}</el-tag>
                      <span class="chlft">
                        {{thirdItem.name}}
                        <template v-if="thirdItem.study_time"><span class="chline">|</span>建议学习：{{thirdItem.study_time}}分钟</template>
                        <template v-if="thirdItem.resource "><span class="chline">|</span>资源ID：{{thirdItem.resource && thirdItem.resource.id}} 【{{thirdItem.resource && thirdItem.resource.discriminator | Resource2chn}}】，{{thirdItem.resource && thirdItem.resource.title}}</template>
                      </span>
                      <span class="chrgt" @click="openeEditResource(thirdItem)">修改</span>
                      <span class="chrgt" @click="openDelResDialog(thirdItem.id)">删除</span>
                    </div>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>
          <!-- </draggable> -->
        </template>
        <template v-if="coursesylllevel === 4">
          <!-- <draggable v-model="tabledata" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.first-chapter-box'}"> -->
          <div v-for="firstItem in tabledata" :key="firstItem.id" class="first-chapter-box">
            <div class="chaptit">
              <span class="chlft">{{firstItem.name}}</span>
              <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
              <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
              <span class="chrgt1" @click="openChildDialog(firstItem.id)">增加子目录</span>
            </div>
            <draggable v-model="firstItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.second-chapter-box'}">
              <div v-for="secItem in firstItem.children" :key="secItem.id" class="second-chapter-box">
                <div class="chaptit chapsecd">
                  <span class="chlft">{{secItem.name}}</span>
                  <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                  <span class="chrgt" @click="openDelOutlineDialog(secItem.id)">删除</span>
                  <span class="chrgt1" @click="openChildDialog(secItem.id,true)">增加子目录</span>
                </div>
                <draggable v-model="secItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.third-chapter-box'}">
                  <div v-for="thirdItem in secItem.children" :key="thirdItem.id" class="third-chapter-box">
                    <div class="knowledge">
                      <span class="chlft">
                        <i></i>
                        <span>{{thirdItem.name}}</span>
                      </span>
                      <span class="chrgt" @click="editproject(thirdItem.id,thirdItem.name)">修改</span>
                      <span class="chrgt" @click="openDelOutlineDialog(thirdItem.id)">删除</span>
                      <span class="chrgt1 yellow" @click="openAddResDialog(thirdItem.id)">关联知识点</span>
                      <span class="chrgt1 yellow" @click="openAddResDialog(thirdItem.id)">新增资源</span>
                    </div>
                    <draggable v-model="thirdItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.fourth-chapter-box'}">
                      <div class="resourcebox fourth-chapter-box" v-for="fourthItem in thirdItem.children" :key="fourthItem.id">
                        <div class="knowledge">
                          <el-tag class="attribute-tag" size="small" type="danger" v-if="fourthItem.apply_to">{{fourthItem.apply_to=='2'?'提分盒子':'跳级测试'}}</el-tag>
                          <span class="chlft">
                            {{fourthItem.name}}
                            <template v-if="fourthItem.study_time"><span class="chline">|</span>建议学习：{{fourthItem.study_time}}分钟</template>
                            <template v-if="fourthItem.resource"><span class="chline">|</span>资源ID：{{fourthItem.resource && fourthItem.resource.id}} 【{{fourthItem.resource && fourthItem.resource.discriminator | Resource2chn}}】 {{fourthItem.resource && fourthItem.resource.title}} </template>
                            </span>
                          <span class="chrgt" @click="openeEditResource(fourthItem)">修改</span>
                          <span class="chrgt" @click="openDelResDialog(fourthItem.id)">删除</span>
                        </div>
                      </div>
                    </draggable>
                  </div>
                </draggable>
              </div>
            </draggable>
          </div>
          <!-- </draggable> -->
        </template>
        <template v-if="coursesylllevel === 2">
          <!-- <draggable v-model="tabledata" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.first-chapter-box'}"> -->
          <div v-for="firstItem in tabledata" :key="firstItem.id" class="first-chapter-box">
            <div class="chaptit">
              <span class="chlft">{{firstItem.name}}</span>
              <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
              <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
              <span class="chrgt1 yellow" @click="openAddResDialog(firstItem.id)">新增资源</span>
            </div>
            <draggable v-model="firstItem.children" element="div" @end="dragEnd" :move="onMoveCallback" :options="{animation:150,draggable:'.second-chapter-box'}">
              <div class="resourcebox second-chapter-box" v-for="secItem in firstItem.children" :key="secItem.id">
                <div class="knowledge">
                   <el-tag class="attribute-tag" size="small" type="danger" v-if="secItem.apply_to">{{secItem.apply_to=='2'?'提分盒子':'跳级测试'}}</el-tag>
                  <span class="chlft">
                    {{secItem.name}}
                    <template v-if="secItem.study_time"><span class="chline">|</span>建议学习：{{secItem.study_time}}分钟</template>
                   <template v-if="secItem.resource"> <span class="chline">|</span>资源ID：{{secItem.resource && secItem.resource.id}} 【{{secItem.resource && secItem.resource.discriminator | Resource2chn}}】，{{secItem.resource && secItem.resource.title}} </template>
                  </span>
                  <span class="chrgt" @click="openeEditResource(secItem)">修改</span>
                  <span class="chrgt" @click="openDelResDialog(secItem.id)">删除</span>
                </div>
              </div>
            </draggable>
          </div>
          <!-- </draggable> -->
        </template>
        <div class="chaptit additem">
          <span @click="openFirLvDialog">新增一级大纲目录</span>
        </div>
      </div>
    </div>
    <!--弹层 -->
    <el-dialog title="选择学习资源" width="60%" class="tabplane addResourceDialog" top="2%" :visible.sync="dialogFormVisible" @close="closeDialog('addResFirFrom')">
      <el-steps :active="active" finish-status="finish" simple style="margin-top: -10px;margin-bottom:10px;">
        <el-step :title="item.text" :key="index" v-for="(item,index) in progressText" description=""></el-step>
      </el-steps>
      <!-- 第一步 -->
      <el-form :model="addResFirFrom" ref="addResFirFrom" v-show="active == 0" @submit.native.prevent label-width="100px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
          <el-input class="coursetxt" v-model="addResFirFrom.name" @keydown.native.enter="firstNextSubmit('addResFirFrom')"></el-input>
        </el-form-item>
        <el-row class="ep-set-box">
          <p class="ep-line"></p>
          <span class="ep-tips">以下设置为EP专用：（选填）</span>
        </el-row>
        <el-form-item label="建议学习时长" prop="study_time">
          <el-select style="" v-model="addResFirFrom.study_time" clearable placeholder="请选择">
            <el-option v-for="item in study_time_options" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
          分钟
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button style="margin-top:12px;" @click="firstNextSubmit('addResFirFrom')">下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 第二步 -->
      <el-form label-width="100px" v-show="active == 1" class="demo-ruleForm">
        <div class="selectmodel">
          <span :class="[resourceType == item.discriminator ? 'is-active' : '']" @click="selectclk(item.discriminator)" v-for="(item,index) in resourceTypeList" :key="index">
            {{item.label}}
          </span>
        </div>
        <el-form-item label="资源应用" v-if="resourceType === 'paper'">
          <el-checkbox-group v-model="addResFirFrom.apply_to" @change="handleCheckboxChange">
            <el-checkbox label="1">跳级测试</el-checkbox>
            <el-checkbox label="2">提分盒子</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        {{addResFirFrom.start_time}}
        <el-form-item label="开启时间" prop="start_time" v-if="resourceType === 'paper'">
          <el-date-picker v-model="addResFirFrom.start_time" type="datetime" value-format="timestamp" placeholder="请设置开启时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
          <el-button style="margin-top:12px;" @click="secondSubmit">下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 第三步 -->
      <div class="rulemodule" v-show="active == 2">
        <el-form label-position='left' label-width="80px" v-show="resourceType === 'video' || resourceType === 'lecture_note'">
          <el-form-item label="来源">
            <el-radio-group v-model="sourceRadio">
              <el-radio :label="1">上传/创建资源</el-radio>
              <el-radio :label="2">从已有资源选择</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 讲义 -->
        <el-row v-show="sourceRadio === 1 && resourceType === 'lecture_note'">
          <HandoutUpload ref="handoutUpload" @getHandoutPath="getHandoutPath"></HandoutUpload>
        </el-row>
        <!-- 视频 -->
        <el-row v-show="sourceRadio === 1 && resourceType === 'video'">
          <el-form :model="videoForm" label-position='left' ref="videoForm" label-width="120px" class="resource-ruleForm">
            <el-form-item label="视频地址" prop="video_id" :rules="filter_rules({required:true,type:'isVideoId'})">
              <el-input v-model="videoForm.video_id" placeholder="请输入视频地址" auto-complete="off"></el-input>
              <el-tooltip placement="top">
                <div slot="content">
                  只需要输入地址中不同部分即可,如示例:红色部分：<br/>{{urltip}}
                  <span style="color:red;">16oe3We00h1ye2hZ</span>{{urltip2}}</div>
                <i class="el-icon-info"></i>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="视频时长（分）" prop="duration_minutes" class="displayinline" :rules="[{required: true,type:'number', message: '请填写视频时长的分钟', trigger: ['change','blur']}]">
              <el-input v-model.number="videoForm.duration_minutes" placeholder="请填写视频时长的分钟" auto-complete="off"></el-input>
              分
            </el-form-item>
            <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline" :rules="[{message: '请填写视频时长的秒', trigger: ['change','blur']}]">
              <el-input v-model="videoForm.duration_second" @change="handleInputChange" placeholder="请填写视频时长的秒" auto-complete="off"></el-input>
              秒
            </el-form-item>
          </el-form>
        </el-row>
        <el-row v-show="sourceRadio === 2">
          <el-input :placeholder="inputPlaceholder" size="small" v-model="resourceinput" @keydown.native.enter="handleIconClick">
            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
          </el-input>
          <el-table ref="singleTable" :data="resourceTable" border tooltip-effect="dark" v-loading="resLoading" style="width:100%;margin-top:20px;" max-height="400" @selection-change="handleSelectionChange" highlight-current-row @current-change="handleTableChange">
            <el-table-column :label="item.label" :width="item.wh" v-for="(item,index) in resourceTableConfig" :key="index" show-overflow-tooltip>
              <template slot-scope="scope">
                <template v-if="item.key == 'id' || item.key == 'paper_id' || item.key == 'live_id' ">
                  <el-radio class="radio" v-model="resourceRadio" :label="String(scope.row.id)"></el-radio>
                  <span>{{scope.row[item.key]}}</span>
                </template>
                <span v-else-if="item.key == 'discriminator'">{{scope.row[item.key] | Resource2chn}}</span>
                <span v-else>{{scope.row[item.key]}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.current_page" :page-size="50" layout="total, prev, pager, next, jumper" :total="pagination.total">
          </el-pagination>
        </el-row>
        <div class="coursebtn" style="padding-top: 0;margin-top: 20px;">
          <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
          <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
          <el-button type="primary" v-if="resourceAction=='add'" :loading="btnLoading" @click="addSyllabusResourceItem">{{btnLoading?'新增中':'确 定'}}
          </el-button>
          <el-button type="primary" v-if="resourceAction=='update'" :loading="btnLoading" @click="updateSyllabusResource">{{btnLoading?'新增中':'确 定'}}
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="deleteModule ? '删除课程大纲目录' : '删除已选资源'" class="tabplane" :visible.sync="dialogVisible" size="tiny">
      <span>{{deleteModule ? '确定要删除该课程大纲目录吗？删除后，该目录下的子目录及资源关系均将被删除！' : '确定要删除已选择的资源吗？'}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog title="关联知识点" center :visible.sync="dialogKnowledge"></el-dialog> -->

    <el-dialog :title="Moduledialog ? bigdislog ? '新增一级大纲目录' : '新增课程大纲子目录' : '修改课程大纲名称'" class="tabplane" center :visible.sync="adddialogVisible" size="tiny">
      <el-form :model="ruleProject" ref="ruleProject" label-width="120px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
          <el-input class="coursetxt" v-model="ruleProject.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="知识点关联" prop="knowledge" :rules="[{required:true}]">
          <el-row class="scroll-content" style="margin-bottom:10px;">
            <el-tag size="small" :key="tag.id" v-for="tag in multipleSelection" closable :disable-transitions="false" @close="handleCloseTag(tag)">
              <span class="tag-title" :title="tag.title">{{tag.title}}</span>
              <span class="tag-id">（ID：{{tag.id}}）</span>
            </el-tag>
          </el-row>
        </el-form-item>
        <el-row>
          <el-input placeholder="请输入知识点ID/名称搜索" size="small" v-model="searchInput" @keydown.native.enter="handleIconClick">
            <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
          </el-input>
          <el-table ref="multipleTable" :data="resourceTable" border tooltip-effect="dark" v-loading="resLoading" style="width:100%;margin-top:20px;" max-height="400" @selection-change="handleSelectionChange" highlight-current-row :row-key="getRowKeys">
            <el-table-column :reserve-selection="true" type="selection" width="55">
            </el-table-column>
            <el-table-column :label="item.label" :width="item.wh" v-for="(item,index) in resourceTableConfig" :key="index" show-overflow-tooltip>
              <template slot-scope="scope">
                <template v-if="item.key == 'id' || item.key == 'paper_id' || item.key == 'live_id' ">
                  <span>{{scope.row[item.key]}}</span>
                </template>
                <span v-else-if="item.key == 'discriminator'">{{scope.row[item.key] | Resource2chn}}</span>
                <span v-else>{{scope.row[item.key]}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.current_page" :page-size="50" layout="total, prev, pager, next, jumper" :total="pagination.total">
          </el-pagination>
        </el-row> -->
      </el-form>
      <div class="footer" slot="footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="Moduledialog == true" :loading="btnLoading" @click="addruleProject('ruleProject')">{{btnLoading?'新增中':'确 定'}}
        </el-button>
        <el-button type="primary" v-else :loading="btnLoading" @click="updateruleProject('ruleProject')">
          {{btnLoading?'保存中':'保 存'}}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style lang="less">
.tabplane .el-dialog {
  min-width: 680px;
  margin-bottom: 0px;
}
.addResourceDialog .el-pagination {
  text-align: right;
  margin-top: 14px;
}
.ghostClass {
  opacity: 1;
}
.permission-outlinemodule {
  .addResourceDialog {
    .el-dialog__header {
      padding-top: 15px;
    }
    .el-dialog__body {
      padding-top: 10px;
    }
  }
  .el-dialog__body {
    .ep-set-box {
      height: 40px;
      position: relative;
      .ep-line {
        height: 1px;
        margin-top: 20px;
        background: #d3d3d3;
      }
      .ep-tips {
        color: #969696;
        text-align: center;
        width: 200px;
        height: 24px;
        background: #fff;
        display: inline-block;
        line-height: 24px;
        position: absolute;
        top: 9px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    padding: 20px 20px;
    .el-steps {
      line-height: normal;
    }
    .rulemodule {
      .el-table {
        .el-radio .el-radio__label {
          display: none;
        }
      }
    }
  }
  .resource-ruleForm {
    .el-input {
      width: 94%;
    }
  }
}
@media screen and (min-height: 320px) and (max-height: 650px) {
  .permission-outlinemodule {
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
<script>
import draggable from "vuedraggable";
import {
  progressText,
  resourceTypeList,
  resourceTableConfig
} from "../../common/outlineConfig.js";
import { isNumber, getSrcStr } from "../../util/util.js";
import HandoutUpload from "./SyllabusModuleHandoutUpload.vue";
export default {
  name: "SyllabusModuleEdit",
  components: {
    draggable,
    HandoutUpload
  },
  data() {
    return {
      value4: false,
      project_id: "", //项目id
      subject_id: "", //科目id
      btnLoading: false, //按钮loading
      active: 0, //步骤条active
      resourceRadio: "", //选择的资源
      selectType: "", //输入框搜索
      nativeResourceRadio: "", //修改之前本来选择的资源
      ResIsInOutline: false, //检查该资源是否已经挂载
      resourceTableConfig: [], //表单配置
      radio1: 1,
      radio2: 4,
      tabledata: [],
      progressText: progressText,
      addResFirFrom: {
        name: "",
        start_time: "", //开启时间
        study_time: "", //建议学习时长， 单位分钟
        apply_to: [] //1表示跳级测试，2表示提分盒子
      },
      study_time_options: [], //选择学习时间列表
      ruleProject: {
        name: ""
      },
      dialogFormVisible: false,
      resourceTable: [], //资源列表
      multipleSelection: [],
      dialogVisible: false,
      adddialogVisible: false, //新增和修改大纲目录的弹层
      Moduledialog: true, //增加子目录的弹层的标题
      bigdislog: false,
      deleteModule: true,
      resourceType: "video",
      inputPlaceholder: "请输入视频资源ID / 名称",
      refname: "",
      coursesylllevel: "",
      coursesyllid: "",
      currentId: "0", //0是最外层父级大纲   pid也表示当前需要操作的id
      title: "", //课程大纲标题
      resourceTypeList: resourceTypeList,
      tag_id: "", //标签id
      resourceAction: "add", //资源弹层的操作
      pagination: {
        current_page: 1, //资源列表当前页数
        total: 1 //资源列表总数量
      },
      resLoading: false, //loading
      resourceinput: "", //根据id或者名称搜索
      searchResourceTimer: "", //搜索资源演示器
      sortOptions: "", //排序参数
      sourceRadio: 1, //资源选择的来源
      handoutForm: {
        path: ""
      },
      videoForm: {
        title: "",
        video_id: "",
        duration_minutes: "",
        duration_second: ""
      },
      urltip: '[<script src="https://s.gaodun.com/web/static-player/loader.js?',
      urltip2: `-3" type="text/javascript">${"</"}script>]`
    };
  },
  methods: {
    // 资源应用 选择
    handleCheckboxChange(d) {
      console.log(d);
      if (d.length > 1) {
        this.addResFirFrom.apply_to = d.splice(-1);
      }
      console.log(this.addResFirFrom.apply_to);
    },
    handleTableChange(val) {
      this.resourceRadio = String(val.id);
    },
    selectclk(discriminator) {
      this.resourceType = discriminator;
    },
    //关闭新增资源的弹层
    closeDialog(formName) {
      this.addResFirFrom = {
        name: ""
      };
      this.$refs[formName].resetFields();
    },
    //弹出新增资源的弹层
    openAddResDialog(id) {
      this.currentId = id;
      this.active = 0;
      this.addResFirFrom.name = "";
      this.addResFirFrom.start_time = "";//开启时间
      this.addResFirFrom.study_time = ""; //建议学习时长， 单位分钟
      this.addResFirFrom.apply_to = [];//1表示跳级测试，2表示提分盒子
      this.resourceRadio = "";
      this.resourceType = "video";
      this.nativeResourceRadio = "";
      this.dialogFormVisible = true;
      this.resourceAction = "add";
    },
    //第一步往下一步
    firstNextSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.active >= this.progressText.length - 1) return;
          this.active++;
        } else {
          return false;
        }
      });
    },
    //第二步往下一步
    async secondSubmit() {
      if (!this.resourceType) {
        this.$message.warning("请选择资源类型！");
        return;
      } else if (this.resourceType === "lecture_note") {
        this.handoutForm.path = ""; //清除讲义地址
        //清除上传的文件
        this.$refs.handoutUpload.clearAllFileList();
      } else if (this.resourceType === "video") {
        this.resetForm("videoForm"); //重置表单
      }
      if (this.active >= this.progressText.length - 1) return;
      resourceTableConfig.forEach(ele => {
        if (ele.discriminator == this.resourceType) {
          this.resourceTableConfig = ele.table;
          this.inputPlaceholder = ele.inputPlaceholder;
        }
      });
      this.active++;
      this.sourceRadio = 2;
      this.resourceinput = ""; //输入框搜索初始化
      this.resourceTable = []; //初始化资源列表
      if (this.pagination.current_page != 1) {
        this.pagination.current_page = 1;
      } else {
        this.searchResource();
      }
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
    //搜索资源
    searchResource(val) {
      clearTimeout(this.searchResourceTimer);
      this.resLoading = true;
      this.searchResourceTimer = setTimeout(async () => {
        clearTimeout(this.searchResourceTimer);
        let params = {
          discriminator: this.resourceType,
          page_size: 50,
          page: val ? val : 1,
          "order_by[]": "desc", //顺序   倒序
          "order_by_field[]": "id", //排序字段
          project_id: this.project_id
          // subject_id: this.subject_id,
        };
        let resourceinput = this.resourceinput.trim();
        switch (this.resourceType) {
          case "legacy_live":
            if (isNumber(resourceinput)) {
              params.legacy_live_id = resourceinput;
            } else {
              params.keywords = resourceinput;
            }
            break;
          case "paper":
            if (isNumber(resourceinput)) {
              params.paper_id = resourceinput;
            } else {
              params.keywords = resourceinput;
            }
            break;
          default:
            params.keywords = resourceinput;
            break;
        }
        let ret = await this.$http.getResource(params);
        if (ret.status == 0) {
          this.resLoading = false;
          this.resourceTable = ret.result.resources;
          this.pagination.total = ret.result.pagination.total;
        }
      }, 500);
    },
    prev() {
      if (this.active <= 0) return;
      this.active--;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //新增大纲资源条目
    async addSyllabusResourceItem() {
      if (this.sourceRadio === 2) {
        // 资源库检索流程
        this.sourceRadio2Syllabus();
      } else if (this.sourceRadio === 1) {
        // 走上传创建流程
        this.sourceRadio1Syllabus();
      }
    },
    // 数据库检索流程 sourceRadio-2
    async sourceRadio2Syllabus() {
      if (!this.resourceRadio) {
        return this.$message({
          message: "请选择资源",
          type: "warning"
        });
      }
      this.btnLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      //查询时候挂载了该资源
      let boolRet = await this.checkResIsInOutline();
      if (!boolRet) {
        this.btnLoading = false;
        loading.close();
        return;
      }
      //新增/修改大纲条目
      let nameRet;
      if (this.resourceAction === "add") {
        nameRet = await this.CourseSyllabusItem();
      } else if (this.resourceAction === "update") {
        nameRet = await this.ChangeSyllabusItem();
      }
      let sy_item_id;
      if (nameRet.status === 0) {
        sy_item_id = nameRet.result.id;
        // 大纲资源条目挂载资源
        await this.mountSyllabusResource(sy_item_id);
        this.btnLoading = false;
        loading.close();
      } else {
        this.btnLoading = false;
        loading.close();
        return;
      }
    },
    // 走上传创建流程 sourceRadio-1
    sourceRadio1Syllabus() {
      if (this.resourceType === "lecture_note") {
        this.lectureSourceCreateIntoSyllabus();
      } else if (this.resourceType === "video") {
        this.$refs["videoForm"].validate(valid => {
          if (valid) {
            this.videoSourceCreateIntoSyllabus();
          } else {
            console.log("error submit!!");
          }
        });
      }
    },
    // 视频走上传创建流程 resourceType - video
    async videoSourceCreateIntoSyllabus() {
      this.btnLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      let pathRet = await this.getVideoPath();
      let video_id = "";
      if (pathRet.status === 0) {
        if (!pathRet.result.video_id) {
          this.btnLoading = false;
          loading.close();
          return this.$message({
            type: "warning",
            message: "视频地址解析失败！"
          });
        }
        video_id = pathRet.result.video_id;
      } else if (pathRet.status == 1) {
        //为1时使用用户输入的地址
        video_id = this.videoForm.video_id;
      } else {
        this.btnLoading = false;
        loading.close();
        return this.$message({
          type: "warning",
          message: "视频地址解析失败！"
        });
      }
      let params = {
        title: this.addResFirFrom.name, //视频资源名称使用大纲条目名称
        tag_payload_id:
          this.subject_id == "0" ? this.project_id : this.subject_id,
        tag_payload_type: this.subject_id == "0" ? "project" : "subject",
        duration_minutes: this.videoForm.duration_minutes,
        duration_seconds: this.videoForm.duration_second
          ? this.videoForm.duration_second
          : 0,
        video_id: video_id
      };
      let createResponse = await this.$http.storeResource(params);
      if (createResponse.status === 0) {
        // 资源id
        try {
          this.resourceRadio = createResponse.result.resource.id;
        } catch (error) {
          this.btnLoading = false;
          loading.close();
          return this.$message({
            message: "视频资源创建失败！",
            type: "error"
          });
        }
        //新增/修改资源名字
        let nameRet;
        if (this.resourceAction === "add") {
          nameRet = await this.CourseSyllabusItem();
        } else if (this.resourceAction === "update") {
          nameRet = await this.ChangeSyllabusItem();
        }
        let sy_item_id;
        if (nameRet.status === 0) {
          sy_item_id = nameRet.result.id;
          // 大纲资源条目挂载资源
          await this.mountSyllabusResource(sy_item_id);
          this.btnLoading = false;
          loading.close();
        } else {
          this.btnLoading = false;
          loading.close();
          return;
        }
      } else {
        this.btnLoading = false;
        loading.close();
        return this.$message({
          message: "视频资源创建失败！",
          type: "error"
        });
      }
    },
    // 讲义走上传创建流程 resourceType - lecture_note
    async lectureSourceCreateIntoSyllabus() {
      if (!this.handoutForm.path) {
        return this.$message({
          message: "请选择讲义上传！",
          type: "warning"
        });
      }
      this.btnLoading = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)"
      });
      let params = {
        tag_payload_id:
          this.subject_id == "0" ? this.project_id : this.subject_id,
        tag_payload_type: this.subject_id == "0" ? "project" : "subject",
        title: this.addResFirFrom.name, //讲义资源名称使用大纲条目名称
        path: this.handoutForm.path
      };
      let saveHandoutRet = await this.$http.saveLecturenote(params);
      if (saveHandoutRet.status === 0) {
        console.log(saveHandoutRet);
        // 资源id
        try {
          this.resourceRadio = saveHandoutRet.result.id;
        } catch (error) {
          console.log(error);
          this.btnLoading = false;
          loading.close();
          return this.$message({
            message: "讲义资源创建失败！",
            type: "error"
          });
        }
        //新增/修改资源名字
        let nameRet;
        if (this.resourceAction === "add") {
          nameRet = await this.CourseSyllabusItem();
        } else if (this.resourceAction === "update") {
          nameRet = await this.ChangeSyllabusItem();
        }
        let sy_item_id;
        if (nameRet.status === 0) {
          sy_item_id = nameRet.result.id;
          // 大纲资源条目挂载资源
          await this.mountSyllabusResource(sy_item_id);
          this.btnLoading = false;
          loading.close();
        } else {
          this.btnLoading = false;
          loading.close();
          return;
        }
      } else {
        this.btnLoading = false;
        loading.close();
        return this.$message({
          message: "讲义资源创建失败！",
          type: "error"
        });
      }
    },
    // 获取讲义上传的地址
    getHandoutPath(path) {
      this.handoutForm.path = path;
    },
    // 检查大纲是否挂载在大纲上
    async checkResIsInOutline() {
      console.log("检查大纲是否挂载在大纲上");
      if (
        this.resourceAction === "update" &&
        this.nativeResourceRadio == this.resourceRadio
      ) {
        //当操作为修改大纲时，原资源和现在资源一样时，无需检测直接返回true
        return true;
      }
      let res = await this.$http.checkResIsInOutline(
        this.coursesyllid,
        this.resourceRadio
      );
      if (res.status === 0) {
        if (res.result.length > 0) {
          this.resourceRadio = "";
          this.$message({
            type: "error",
            message: "该资源已经挂载在这个大纲上！"
          });
          // this.btnLoading = false;
          return false;
        } else {
          return true;
        }
      } else {
        // this.btnLoading = false;
        return false;
      }
    },
    // 新增大纲资源条目名称
    async CourseSyllabusItem() {
      console.log("新增大纲资源条目名称");
      let params = {
        name: this.addResFirFrom.name, //大纲条目名称
        pid: this.currentId,
        course_syllabus_id: this.coursesyllid
      };
      if (this.addResFirFrom.study_time) {
        //学习时长， 单位分钟
        params.study_time = this.addResFirFrom.study_time;
      }
      if (this.addResFirFrom.start_time) {
        //开启时间 时间戳
        params.start_time = this.addResFirFrom.start_time;
      }
      if (
        this.addResFirFrom.apply_to != undefined &&
        this.addResFirFrom.apply_to != null &&
        this.addResFirFrom.apply_to.length !== 0
      ) {
        params.apply_to = this.addResFirFrom.apply_to[0]; //1表示跳级测试，2表示提分盒子
      }
      let ret = await this.$http.CourseSyllabusItem(params);
      if (ret.status === 0) {
        return ret;
      } else {
        this.$message.error("添加失败！");
        return ret;
      }
    },
    // 修改大纲资源条目名称
    async ChangeSyllabusItem() {
      console.log("修改大纲资源条目名称");
      let id = this.currentId;
      let params = {
        name: this.addResFirFrom.name,
        course_syllabus_id: this.coursesyllid
      };
      if (this.addResFirFrom.study_time) {
        //学习时长， 单位分钟
        params.study_time = this.addResFirFrom.study_time;
      }
      if (this.addResFirFrom.start_time) {
        //开启时间 时间戳
        params.start_time = this.addResFirFrom.start_time;
      }
      if (
        this.addResFirFrom.apply_to != undefined &&
        this.addResFirFrom.apply_to != null &&
        this.addResFirFrom.apply_to.length !== 0
      ) {
        params.apply_to = this.addResFirFrom.apply_to[0]; //1表示跳级测试，2表示提分盒子
      }
      let ret = await this.$http.ChangeSyllabusItem(id, params);
      if (ret.status === 0) {
        return ret;
      } else {
        this.$message.error("添加失败！");
        return ret;
      }
    },
    // 大纲资源条目挂载资源
    async mountSyllabusResource(id) {
      console.log("大纲资源条目挂载资源");
      let params = {
        resource_id: this.resourceRadio, //资源id
        tag_id: this.tag_id,
        course_syllabus_id: this.coursesyllid
      };
      let retv = await this.$http.mountSyllabusResource(id, params);
      // this.btnLoading = false;
      if (retv.status === 0) {
        this.$message({
          type: "success",
          message:
            this.resourceAction === "add" ? "新增资源成功！" : "修改资源成功！"
        });
        this.dialogFormVisible = false;
        this.getSyllabusItems();
      } else if (retv.status === 2) {
        this.$message({
          message:
            this.resourceAction === "add" ? "新增资源失败！" : "修改资源失败！",
          type: "error"
        });
      }
    },
    //修改大纲资源条目 包含名称&挂载资源
    async updateSyllabusResource() {
      if (this.sourceRadio === 2) {
        // 资源库检索流程
        this.sourceRadio2Syllabus();
      } else if (this.sourceRadio === 1) {
        // 走上传创建流程
        this.sourceRadio1Syllabus();
      }
    },
    //弹出修改资源的弹层
    openeEditResource(item) {
      this.active = 0;
      this.addResFirFrom.name = item.name;  //名称
      this.addResFirFrom.apply_to = item.apply_to?[item.apply_to]:[];  //1表示跳级测试，2表示提分盒子
      this.addResFirFrom.start_time = item.start_time;  //开启时间
      this.addResFirFrom.study_time = item.study_time;  //学习时长
      this.currentId = item.id;
      this.resourceRadio = item.resource && String(item.resource.id);
      this.nativeResourceRadio = item.resource && String(item.resource.id); //原来的选项
      this.resourceType = item.resource && item.resource.discriminator;
      this.dialogFormVisible = true;
      this.resourceAction = "update";
    },
    // 弹出资源删除框
    openDelResDialog(id) {
      this.currentId = id;
      this.dialogVisible = true;
      this.deleteModule = false;
    },
    // 弹出大纲删除框
    openDelOutlineDialog(id) {
      this.currentId = id;
      this.dialogVisible = true;
      this.deleteModule = true;
    },
    // 删除确定
    async confirmDelete() {
      let id = this.currentId;
      let params = {
        course_syllabus_id: this.coursesyllid
      };
      let ret = await this.$http.DeleteSyllabusItem(id, params);
      if (ret.status == 0) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getSyllabusItems();
      } else {
      }
      this.dialogVisible = false;
    },
    // 新增课程大纲子目录的弹层
    openChildDialog(currentId, bool) {
      if (bool) {
        debugger;
      }
      this.adddialogVisible = true;
      this.Moduledialog = true;
      this.bigdislog = false;
      this.ruleProject.name = "";
      this.currentId = currentId; //父级大纲条目id
    },
    // 新增一级大纲的弹层
    openFirLvDialog() {
      this.adddialogVisible = true;
      this.Moduledialog = true;
      this.bigdislog = true;
      this.ruleProject.name = "";
      this.currentId = "0";
    },
    //确定增加一个子目录
    addruleProject(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.adddialogVisible = false;
          if (this.Moduledialog != true) {
            this.$refs[this.refname][0].innerText = this.ruleProject.name;
          } else {
            this.addbigCourse();
          }
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 添加大纲目录
    async addbigCourse() {
      this.btnLoading = true;
      let ret = await this.$http.CourseSyllabusItem({
        name: this.ruleProject.name,
        pid: this.currentId,
        //          level:this.coursesylllevel,
        course_syllabus_id: this.coursesyllid
      });
      this.btnLoading = false;
      if (ret.status == 0) {
        ret.message = "添加成功！";
        this.currentId = "0";
        this.getSyllabusItems();
      } else {
        ret.message = "添加失败！";
      }
      this.$message({
        message: ret.message,
        type: "success"
      });
    },
    // 修改大纲目录
    updateruleProject(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let id = this.currentId;
          let name = {
            name: this.ruleProject.name,
            course_syllabus_id: this.coursesyllid
          };
          this.btnLoading = true;
          let ret = await this.$http.ChangeSyllabusItem(id, name);
          this.btnLoading = false;
          if (ret.status == 0) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            this.adddialogVisible = false;
            this.getSyllabusItems();
          } else {
            this.$message.error("修改失败！");
          }
        } else {
          return false;
        }
      });
    },
    // 弹出修改课程大纲名称的弹层
    editproject(currentId, name) {
      console.log(currentId, name);
      this.currentId = currentId;
      this.ruleProject.name = name;
      this.adddialogVisible = true;
      this.Moduledialog = false;
    },
    //拉取这个大纲的条目
    async getSyllabusItems() {
      const loading = this.$loading({
        lock: true,
        text: "正在拼命获取课程大纲数据...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let course_syllabus_id = {
        course_syllabus_id: this.coursesyllid
      };
      let ret = await this.$http.getSyllabusItems(course_syllabus_id);
      loading.close();
      if (ret.status == 0) {
        this.tabledata = ret.result;
      } else {
        this.$message({
          message: "获取课程大纲条目失败！"
        });
      }
    },
    //查看大纲的详情
    async checkSyllabus() {
      let ret = await this.$http.checkSyllabus(this.coursesyllid);
      if (ret.status == 0) {
        this.title = ret.result.title;
        this.tag_id = ret.result.tag_id;
        this.project_id = ret.result.project.id;
        this.subject_id = ret.result.subject.id;
        this.coursesylllevel = ret.result.template.level_max; //大纲的层级
      }
    },
    //排序
    async dragEnd(data) {
      if (!this.sortOptions || !this.sortOptions.parmas.near_by) return;
      let ret = await this.$http.sortSyllabus(
        this.sortOptions.id,
        this.sortOptions.parmas
      );
      this.sortOptions = "";
      if (ret.status == 0) {
        this.message({
          type: "success",
          message: "排序成功！"
        });
        this.getSyllabusItems();
      } else {
        this.message({
          type: "warning",
          message: "排序失败！"
        });
      }
    },
    // 排序拖动事件
    onMoveCallback(evt, originalEvent) {
      let direction = 0;
      if (evt.draggedContext.futureIndex > evt.draggedContext.index) {
        direction = 1;
      } else {
        direction = -1;
      }
      this.sortOptions = {
        id: evt.draggedContext.element.id,
        parmas: {
          near_by: evt.relatedContext.element && evt.relatedContext.element.id, //参照物，也是大纲条目id
          direction: direction, //1表示参照物的下方，-1表示参照物的上方
          course_syllabus_id: this.coursesyllid //大纲id
        }
      };
    },
    //秒数输入框change事件
    handleInputChange(val) {
      if (val == "") {
        this.videoForm.duration_second = 0;
      }
    },
    //解析视频地址获得视频id
    async getVideoPath() {
      let url = getSrcStr(this.videoForm.video_id);
      let params = {
        url: url
      };
      let ret = await this.$http.getVideoPath(params);
      return ret;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {},
  mounted() {
    for (let i = 1; i <= 120; i++) {
      this.study_time_options.push({ value: i });
    }
  },
  created() {
    this.coursesyllid = this.$route.params.sid;
    this.getSyllabusItems();
    this.checkSyllabus();
  }
};
</script>
