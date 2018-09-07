<template>
<<<<<<< Updated upstream
    $END$
</template>

<script>
    export default {
        name: "SyllabusModuleGlive"
    }
=======
  <div>
    <createChildrenItem
      :item="{id:111,name:'123123'}"
    ></createChildrenItem>
    <createResourceItem
      :item="{id:11,name:'123123'}"
    ></createResourceItem>
  </div>
</template>

<script>
  import createResourceItem from './createResourceItem.vue'
  import createChildrenItem from './createChildrenItem.vue'

  export default {
    name: "SyllabusModuleGlive",
    data() {
      return {}
    },
    components: {
      createResourceItem,
      createChildrenItem
    }
  }
>>>>>>> Stashed changes
</script>

<style scoped>

</style>
