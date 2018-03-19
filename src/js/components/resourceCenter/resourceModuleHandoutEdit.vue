<template>
    <HandoutForm :id="$route.params.id">
    </HandoutForm>
</template>
<style>
</style>
<script>
    import HandoutForm from './resourceModuleHandoutForm.vue'

    export default {
        components: {
            HandoutForm
        }
    }
</script>