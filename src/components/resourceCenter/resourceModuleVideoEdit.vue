<template>
    <VideoForm :id="$route.params.id">
    </VideoForm>
</template>
<style>
</style>
<script>
import VideoForm from './resourceModuleVideoForm.vue'

export default {
  name:'resourceModuleVideoEdit',
  components: {
    VideoForm
  },
  created() {
    console.log('edit video created')
    console.log(this.$route.params)
  }
}
</script>