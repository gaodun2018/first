<template>
  <div>
    <div class="home-todo-list">
      <HomeIndex></HomeIndex>
    </div>
  </div>
</template>
<style>
</style>

<script>
  import Vue from 'vue';
  import HomeIndex from './HomeModuleIndex.vue';
  export default {
    name: 'module-todo',
    components: {HomeIndex},
    data() {
      return {
        userInfo: '', // 用户ID
        todayData: [],

      }
    },
    methods: {
      onTodoItem(index) {
        switch (index) {
          case 0 :
            this.push({path: '/sales/SaleNewClueindex', context: this});
            break;
          case 1 :
            this.push({path: '/sales/reservationCommucinate', context: this});
            break;
          case 2 :
            this.push({path: '/sales/repeatConsult', context: this});
            break;
          case 3 :
            this.push({path: '/audio/listenInviteManage/', context: this});
            break;
          // case 4 :
          //     this.push({path: '',context:this});
          //     break;
          case 5 :
            this.push({path: '/order', context: this});
            break;
          case 6 :
            this.push({path: '/order/return', context: this});
            break;
        }
      }
    },
    created() {

    }
  }
</script>