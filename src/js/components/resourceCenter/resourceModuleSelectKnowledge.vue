<template>
  <el-dialog class="selectknowledge" title="请选择知识点关联" :visible.sync="$store.state.resources.bKnowledge" @close="closeDialog">
    <el-row class="searchtools">
      <el-col :span="8">
        <span>一级分类：</span>
        <el-select v-model="groupVal" placeholder="请选择所属项目" class="group-search" @change="changesearch"
                   @visible-change="visibleChange">
          <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span>二级分类：</span>
        <el-select v-model="completeVal" placeholder="请选择所属科目" class="complete-search" @change="changesearch"
                   @visible-change="visibleChange">
          <el-option v-for="item in efficiency" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="输入学员ID/手机号/昵称/学员姓名" icon="search" class="inputsearch" v-model="inuptVal"
                  :on-icon-click="handleIconClick" @keydown.native.enter="handleIconClick">
        </el-input>
      </el-col>
    </el-row>

    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="日期" align="center">
        <template scope="scope">{{ scope.row.date }}</template>
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
    <el-row class="select_tags">
      <span>已选择：</span>
      <span v-for="(item,index) in selectedList" :key="index">
          <span class="el-tag el-tag--primary">
            <span class="el-select__tags-text">{{item.name}}</span>
            <i class="el-tag__close el-icon-close"></i>
          </span>
        </span>
    </el-row>
  </el-dialog>
</template>
<style>
</style>
<script>
  export default {
    components: {},
    data() {
      return {
        selectedList: [
          {name: '知识蒂娜米', id: 1},
          {name: '知识蒂娜米', id: 2},
          {name: '知识蒂娜米', id: 3},
          {name: '知识蒂娜米', id: 4},
          {name: '知识蒂娜米', id: 5},
          {name: '知识蒂娜米', id: 6},
          {name: '知识蒂娜米', id: 7},
          {name: '知识蒂娜米', id: 8},
          {name: '知识蒂娜米', id: 9},
          {name: '知识蒂娜米', id: 10},
          {name: '知识蒂娜米', id: 11},
          {name: '知识蒂娜米', id: 12},
        ],
        tableData3: [
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
        multipleSelection: []
      }
    },
    methods: {
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
      closeDialog(){
        this.$store.dispatch('changeDialog',false)
      }
    },
    computed: {},
    mounted() {
      /*setInterval(()=>{
        console.log(this.$store.state.resources.bKnowledge);
      },1000)*/
    },
    created() {

    }
  }
</script>