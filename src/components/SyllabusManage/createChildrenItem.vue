<template>
  <div class="chaptit">
<<<<<<< Updated upstream
    <span class="chlft">{{item.name}} <span class="gray">（条目ID：{{item.id}}） </span></span>

=======
    <span class="chlft">{{item.name}}<span class="gray">（条目ID：{{item.id}}）</span></span>
>>>>>>> Stashed changes
    <el-row class="chrgt" style="width:60px;">
      <el-col :span="12">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="color:#2CA4D9;">更多</span>
          <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
            <el-dropdown-item @click.native="copyId(item.id)">
              <span class="dropdown-child">复制条目ID</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="openDelOutlineDialog(item)">
              <span class="dropdown-child">删除</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
<<<<<<< Updated upstream

    <span class="chrgt" @click="editproject(item.id,item.name)">修改</span>
    <span class="chrgt" @click="openAddResDialog(item)" style="color:#FF9C1C;">新增资源</span>
=======
    <span class="chrgt" @click="editproject(item.id,item.name)">修改</span>
    <span class="chrgt" @click="openChildDialog(item.id,true)">增加子目录</span>
>>>>>>> Stashed changes
  </div>
</template>

<script>
  export default {
<<<<<<< Updated upstream
    name: "createdResourceBtnGroup",
=======
    name: "createChildrenItem",
>>>>>>> Stashed changes
    props: {
      //当前条目
      item: {
        type: Object,
        default: function () {
          return {
            id: '',
            name: ''
          }
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      openDelOutlineDialog() {

      },
      openChildDialog() {

      },
      editproject() {

      },
      copyId() {

      },

    }
  }
</script>

<style lang="less" scoped>

  .chaptit {
    padding: 10px 0 10px 20px;
    position: relative;
    background: #FCFCFC;
    border: 1px solid #EBEBEC;
    overflow: hidden;
    margin-top: 10px;
    cursor: move;
    &.additem {
      text-align: center;
      span {
        font-size: 12px;
        color: #2CA4D9;
        line-height: 30px;
        display: inline-block;
        cursor: pointer;
        padding-left: 17px;
        background: url('../../assets/images/additem.png') no-repeat left 8px;
      }
    }
    .chlft {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #3A3E4A;
      width: 74%;
      float: left;
      font-weight: bold;
    }
    .chrgt1,
    .chrgt {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #2CA4D9;
      float: right;
      cursor: pointer;
      padding: 0 6px;
    }
    .chrgt1:hover,
    .chrgt:hover {
      opacity: .7;
    }
    .chrgt1.yellow {
      color: #F09964;
    }
  }

  /* .chapterbox .chrgt {
      width: 40px;
  }

  .chapterbox .chrgt1 {
      width: 60px;
  } */

</style>
<style lang="less">

</style>
