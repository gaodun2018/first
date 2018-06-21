<template>
  <el-dialog
    class="selectknowledge"
    center
    title="请选择知识点关联"
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
      <el-table-column type="selection" width="55">
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
      <el-button type="primary" :disabled="isBtnDisabled" @click="submitForm()">保存</el-button>
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
      multipleSelection: {
        get: function () {
          return this.currentSyllabusItemKnowledge;
        },
        set: function (v) {
          console.log(v);
          this.$emit('changeCurrentSyllabusItemKnowledge', v);
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
        firstVal: '',
        secondVal: '',
        secondList: [],
        tableData: [],
        selectId: '',
        curIndex:'',
      }
    },
    methods: {
      //展示已经选中到知识点
      showSelectSyllabusKnowledge(id) {
        this.selectId = id;
        let {parentTitle} = this.loopKnowledgeList(this.knowledgeList);
        this.firstVal = parentTitle[0].pid;
        this.handleFirstChange(this.firstVal);
        this.secondVal = parentTitle[1].pid;
        this.handleSecondChange(this.secondVal);
        setTimeout(() => {
          this.toggleSelection([this.tableData[this.curIndex]]);
        }, 0)
      },
      //遍历树拿到父级
      loopKnowledgeList(list, Item) {
        let id = this.selectId;
        for (let i = 0; i < list.length; i++) {
          list[i].parentTitle = list[i].parentTitle ? list[i].parentTitle : [{
            name: list[i].title,
            pid: list[i].id
          }];
          if (Item) {
            list[i].parentTitle = [...Item, ...list[i].parentTitle]
          }
          if (list[i].id === id) {
            this.curIndex = i;
            return list[i];
          }
          if (list[i].children != undefined) {
            return this.loopKnowledgeList(list[i].children, list[i].parentTitle);
          }
        }
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
            console.log(this.$refs);
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        if (val.length > 1) {
          this.toggleSelection([val[val.length - 1]]);
          return;
        }
        this.multipleSelection = val;
      },
      closeDialog() {
        this.$emit('handleCloseKnowledgeDialog')
      },
      //保存选中知识点
      submitForm(){
        this.$emit('handleCloseKnowledgeDialog')
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
