<template>
    <VideoForm :id="$route.params.id">
    </VideoForm>
</template>
<style>
</style>
<script>
    import VideoForm from './VideoForm.vue'

    export default {
        components: {
            VideoForm
        },
        created() {
            console.log('edit video created')
            console.log(this.$route.params)
        }
    }
</script>