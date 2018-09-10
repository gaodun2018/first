<template>
  <div>
    <createHeaderItem
      :title="'大纲测试'"
      :coursesylllevel="4"
      :subject_id="3"
      :is_knowledge_open="false"
    >
    </createHeaderItem>
    <createResourceItem :item="{id:1,name:'see'}"></createResourceItem>
    <createChildrenItem :item="{id:1,name:'see'}"></createChildrenItem>
  </div>
</template>

<script>
  import createResourceItem from './createResourceItem.vue'
  import createChildrenItem from './createChildrenItem.vue'
  import createHeaderItem from './createHeaderItem.vue'

  export default {
    data() {
      return {}
    },
    components: {
      createResourceItem,
      createChildrenItem,
      createHeaderItem
    }
  }
</script>

<style scoped>

</style>
