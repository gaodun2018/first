<template>
  <div>
    <div class="header">
      <span>商品列表</span>
      <div>项目</div>
      <div>科目</div>
    </div>
    <div class="search-and-add"></div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="商品ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="项目">
        </el-table-column>
                <el-table-column
          prop="date"
          label="科目"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="属性"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态">
        </el-table-column>
                <el-table-column
          prop="date"
          label="现价"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      tableData: []
    }
  },
  methods: {
    handleClick() {

    }
  }
}
</script>
<style>

</style>

