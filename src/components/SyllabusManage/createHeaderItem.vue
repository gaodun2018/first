<template>
  <el-row class="outlineeat">
    <el-col :span="18">
      课程大纲：{{title}}
    </el-col>
    <el-col :span="6" v-if="coursesylllevel === 4 && subject_id != 0" style="text-align:right;">
      <el-switch v-model="computed_is_knowledge_open" @change="handleChangeIsKnowledgeOpen" active-text="是否启用知识点关联">
      </el-switch>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    props: {
      title: String,
      coursesylllevel: [String, Number],
      subject_id: [String, Number],
      is_knowledge_open: false
    },
    data() {
      return {}
    },
    computed: {
      computed_is_knowledge_open: {
        get: function () {
          return this.is_knowledge_open
        },
        set: function () {

        }
      }
    },
    methods: {
      handleChangeIsKnowledgeOpen() {

      }
    }
  }
</script>

<style scoped>

</style>
