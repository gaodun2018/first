<template>
    <ResourceGroupForm :id="$route.params.id">
    </ResourceGroupForm>
</template>
<style>
</style>
<script>
import ResourceGroupForm from './resourceModuleResourceGroupForm.vue'

export default {
  name:'resourceModuleVideoEdit',
  components: {
    ResourceGroupForm
  },
  created() {
    console.log(this.$route.params)
  }
}
</script>
