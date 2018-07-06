<template>
  <el-dialog
    class="selectknowledge"
    center
    title="请选择知识点关联"
    @close="closeDialog('ruleForm')"
    :visible.sync="dialogKnowledgeVisible">
    <!-- <el-row class="searchtools">
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
    </el-row> -->

    <!-- 级联选择器 -->
    <el-cascader
      @change="changeSelect"
      :options="knowledgeList"
      :props="props"
      style="width:100%"
      placeholder="请选择关联知识点"
      v-model="selectOp"
      :show-all-levels="true">
    </el-cascader>

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
        selectOp:[],//默认选中
        myobject:{},
        list:[],
        infoData:{},
        firstVal: '',
        secondVal: '',
        secondList: [],
        tableData: [],
        selectId: '',
        curIndex:'',
        props: {
          value: 'id',
          children: 'childrens'
        }
      }
    },
    methods: {
      // 修改值的时候调用
      changeSelect (val) {
        console.log(val);
        let id = val[val.length-1];
        console.log(id);
        this.findData(this.knowledgeList,id);
      },
      //晓冬添加修改数组的方法
      changeList(list){
        list.forEach( (o,index) => {
           o.label = o.title;
           o.value = o.id;
           if(o.children !== null){
             o.children.forEach((x,i)=>{
               if(x.children !== null){
                o.childrens = o.children;
                return this.changeList(o.children);
               }
             })
            }
         });
      },
      // 寻找最底层table的数组
      findData(list,id){
        list.forEach((o,i)=>{
          if(o.id == id){
            this.tableData = o.children;
            console.log('寻找的数组',this.tableData);
          }
           if(o.children !== null){
              return this.findData(o.children,id);
            }
        })
      },
      // 初始寻找数组的值
      firstFind(list,id){
        list.forEach( (o,index) => {
           if(o.children !== null){
             o.children.forEach((x,i)=>{
               if(x.id == id){
                this.curIndex = i
                this.tableData = o.children
               }
             })
             return this.firstFind(o.children,id);
            }
         });
      },
      // 添加寻找初始级联选择到的值
      // upward(list,id){
      //   list.forEach(o=>{
      //     if(o.children != null){
      //       o.children.forEach(x=>{
      //         if(x.id == id){
      //           console.log('这里面走了吗');
      //           this.selectOp.push(o.id)
      //           return this.upward(list,o.id)
      //         }
      //       })
      //     }
      //   })
      // },

      // 添加保存信息函数
      saveinformation(val){
        this.multipleSelection = val;
      },
      //展示已经选中到知识点
      showSelectSyllabusKnowledge(id) {
        this.changeList(this.knowledgeList);
        // this.selectId = id;
        // let {parentTitle} = this.loopKnowledgeList(this.knowledgeList);
        // this.firstVal = parentTitle[0].pid;
        // this.handleFirstChange(this.firstVal);
        // this.secondVal = parentTitle[1].pid;
        // this.handleSecondChange(this.secondVal);
        if(id != -1){
          this.firstFind(this.knowledgeList,id);
          // this.upward(this.knowledgeList,id);
          // console.log('在寻找默认值',this.selectOp);
        }
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
        // for (let i = 0; i < this.secondList.length; i++) {
        //   if (this.secondList[i].id === vid) {
        //     this.tableData = this.secondList[i].children;
        //   }
        // }
        this.findData(this.knowledgeList,vid);
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
        this.$emit('handleSaveKnowledgeDialog')
      }
    }
  }
</script>
<style lang="less">
.el-dialog{
  min-width: 800px;
}
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
