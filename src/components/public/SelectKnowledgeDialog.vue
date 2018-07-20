<template>
  <el-dialog
    class="selectknowledge"
    center
    title="请选择知识点关联"
    @close="closeDialog('ruleForm')"
    :visible.sync="dialogKnowledgeVisible">
    <el-row class="searchtools">
      <el-col :span="10">
        <el-select
          v-model="firstVal"
          placeholder="请选择"
          style="width: 100%;"
          @change="handleFirstChange"
          class="group-search">
          <el-option v-for="item in knowledgeList" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="14">
        <el-select
          :disabled="isDisabled"
          v-model="secondVal"
          placeholder="请选择"
          style="width: 100%;"
          @change="handleSecondChange"
          class="complete-search">
          <el-option v-for="item in secondList" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-top:20px;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" @selection-change="saveinformation" width="55">
      </el-table-column>
      <el-table-column label="知识点ID" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column prop="title" label="知识点名" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="definition" label="定义" align="center" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer last-form-item">
      <el-button @click="closeDialog('ruleForm')">取消</el-button>
      <el-button type="primary" :disabled="isForbid" @click="submitForm()">保存</el-button>
    </div>
  </el-dialog>
</template>
<style>
</style>
<script>
  export default {
    components: {},
    props: {
      dialogKnowledgeVisible: {
        default: false,
        type: Boolean
      },
      knowledgeList: {
        type: Array
      },
      currentSyllabusItemKnowledge: {}
    },
    computed: {
      isDisabled() {
        if (this.firstVal === '' || this.firstVal === undefined || this.firstVal === null) {
          return true;
        } else {
          return false;
        }
      },
      isBtnDisabled() {
        if (this.multipleSelection != undefined && this.multipleSelection.length != 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    data() {
      return {
        isForbid:true,
        multipleSelection:[],
        getData:{},
        infoData:{},
        firstVal: '',
        secondVal: '',
        secondList: [],
        tableData: [],
        selectId: '',
        curIndex:'',
      }
    },
    methods: {
      // 添加保存信息函数
      saveinformation(val){
        this.multipleSelection = val;
      },
      //展示已经选中到知识点
      showSelectSyllabusKnowledge(id) {
        this.selectId = id;
        this.loopKnowledgeList(this.knowledgeList);
        let {parentTitle} = this.getData;
        if(id && id != -1 && parentTitle != undefined){//parentTile 为undefined 是没有查到有对应id的数据
          this.firstVal = parentTitle[0].pid;
          this.handleFirstChange(this.firstVal);
          this.secondVal = parentTitle[1].pid;
          this.handleSecondChange(this.secondVal);
        }else{
          this.firstVal = null;
          this.secondVal = null;
          this.tableData = [];
        }

        setTimeout(() => {
          this.toggleSelection([this.tableData[this.curIndex]]);
        }, 0)
      },
      //遍历树拿到父级
       loopKnowledgeList(list, Item) {
        let id = this.selectId;
        list.forEach((o,i)=>{
          o.parentTitle = [{
            name: o.title,
            pid:o.id
          }]
           if (Item) {
            o.parentTitle = [...Item, ...o.parentTitle]
          }
          if(o.id == id){
            this.curIndex = i;
            this.getData = o
          }
          if(o.children != null){
            return this.loopKnowledgeList(o.children,o.parentTitle);
          }
        })
      },
      handleFirstChange(vid) {
        this.secondList = [];
        this.secondVal = '';
        this.tableData = [];
        for (let i = 0; i < this.knowledgeList.length; i++) {
          if (this.knowledgeList[i].id === vid) {
            this.secondList = this.knowledgeList[i].children;
          }
        }
      },
      handleSecondChange(vid) {
        this.tableData = [];
        for (let i = 0; i < this.secondList.length; i++) {
          if (this.secondList[i].id === vid) {
            this.tableData = this.secondList[i].children;
          }
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.infoData = row;
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        if(val.length == 0){
          this.isForbid = true;
        }else{
          val[0] == undefined? this.isForbid = true:this.isForbid = false;
        }
        if (val.length > 1) {
          this.toggleSelection([val[0]]);
          return;
        }
        this.multipleSelection = val;
      },
      closeDialog() {
        this.$emit('handleCloseKnowledgeDialog')
      },
      //保存选中知识点
      submitForm(){
        this.$emit('handleSaveKnowledgeDialog',this.multipleSelection)
      }
    }
  }
</script>
<style lang="less">
  .selectknowledge {
    .el-table {
      .el-table__header {
        > thead {
          > tr {
            th:nth-child(1) {
              .cell {
                display: none;
                opacity: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
