<template>
    <el-transfer :titles="[ '全部线索列名', '已选线索列名']" v-model="custonDate" :data="cluesTable">
    </el-transfer>
</template>
<style>
.el-transfer {
    width: 460px;
    margin: 0 auto;
}

.el-dialog__header {
    height: 30px;
    line-height: 30px;
    padding: 0;
    background: #5a81b8;
}

.el-dialog__title {
    line-height: 1;
    font-size: 12px;
    font-weight: 100;
    margin-left: 15px;
    color: #fff;
}

.el-dialog__footer {
    text-align: center;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { Dialog, Transfer } from 'element-ui';
import { cluesTable } from '../common/checkData.js';
Vue.use(Dialog)
Vue.use(Transfer)
export default {
    props: {
        'self': Object
    },
    data() {
        return {
            cluesTable,
            custonDate: [],
        }
    },
    methods: {
        onCancel() { // 取消
            this.$store.dispatch('cluesVisible', false);
        },
        onSave() { // 保存
            this.$store.dispatch('selectedTable', this.custonDate);
        },
    },
    mounted: function () {
        this.custonDate = this.self.$store.state.home.selectedTable;
    },
};
</script>