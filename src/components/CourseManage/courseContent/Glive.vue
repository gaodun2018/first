<template>
  <div>

    <Flipped></Flipped>

    <SpecialReview></SpecialReview>

  </div>
</template>

<script>
  import Flipped from './GliveModuleFlipped.vue'
  import SpecialReview from './GliveModuleSpecialReview.vue'
  export default {
    components: {
      Flipped,SpecialReview
    },
    data() {
      return {
      }
    },
    methods: {
    },
    computed: {},
    mounted() {
    },
    created() {
    }
  }
</script>