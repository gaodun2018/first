<template>
  <el-dialog
    class="selectknowledge"
    center
    title="请选择知识点关联"
    :visible.sync="dialogKnowledgeVisible"
    @close="closeDialog">
    <el-row class="searchtools">
      <el-col :span="10">
        <el-select
          v-model="firstVal"
          placeholder="请选择"
          style="width: 100%;"
          @change="handleFirstChange"
          class="group-search">
          <el-option v-for="item in knowledgeList" :key="item.icid" :label="item.title" :value="item.icid">
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
          <el-option v-for="item in secondList" :key="item.icid" :label="item.title" :value="item.icid">
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
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer last-form-item">
      <el-button @click="closeDialog('ruleForm')">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
      }
    },
    computed: {
      isDisabled() {
        if (this.firstVal === '' || this.firstVal === undefined || this.firstVal === null) {
          return true;
        } else {
          return false;
        }
      }
    },
    data() {
      return {
        firstVal: '',
        secondVal: '',
        secondList: [],
        tableData: [],
        multipleSelection: []
      }
    },
    methods: {
      handleFirstChange(vid) {
        console.log(vid);
        for (let i = 0; i < this.knowledgeList.length; i++) {
          if (this.knowledgeList[i].icid === vid) {
            this.secondList = this.knowledgeList[i].childlist;
          }
        }
      },
      handleSecondChange(vid) {
        console.log(vid);
        for (let i = 0; i < this.secondList.length; i++) {
          if (this.secondList[i].icid === vid) {
            this.tableData = this.secondList[i].childList;
          }
        }
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
      },
      closeDialog() {
        this.$store.dispatch('changeDialog', false)
      }
    }
  }
</script>
