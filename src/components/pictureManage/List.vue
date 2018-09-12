<template>
  <div class="module-edu-content">
    <div class="edu_table">
      <el-table ref="multipleTable" border :data="data" style="width: 100%">
        <el-table-column prop="id" label="id" width="80" fixed>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="260">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="320" align="center">
          <button>yulan</button>
          <button>yulan</button>
          <button>yulan</button>
          <button>yulan</button>
        </el-table-column>
      </el-table>
      <!--<div class="edu-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="eduTotal"
        >
        </el-pagination>-->
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
        ]
      };
    },
    computed: {},
    methods: {},
    mounted() {
    },
  };
</script>
