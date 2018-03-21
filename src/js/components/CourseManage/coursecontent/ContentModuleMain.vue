<template>
  <div>
    <!--<Special></Special>-->

    <Stage></Stage>

    <!--<MockExam></MockExam>-->

  </div>
</template>

<script>
  import Special from './MainModuleSpecial.vue'
  import Stage from './MainModuleStage.vue'
  import MockExam from './MainModuleMockExam.vue'
  export default {
    components: {
      Special,Stage,MockExam
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