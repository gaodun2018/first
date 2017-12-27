<template>
    <div style="margin-top:20px;">
        <audio :src="palyUrl" controls="controls" autoplay="autoplay">
        </audio>
    </div>
</template>
<style scoped>
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import cluesModal from 'vueModal';
export default {
    name: 'recordPlayer',
    props: ['self', 'modal', 'playAddress'],
    data() {
        return {
            palyUrl: this.self.recordPalyFile || this.playAddress
        }
    }
}
</script>