<template>
    <div>
      <el-row class="breadcrumb">
        <el-breadcrumb separator=">">

          <el-breadcrumb-item v-for="(item,index) in $store.state.navigation.breadcrumbmenu" :to="{ path: item.url.indexOf('/')>-1 ? item.url :'' }" :key="index">
            {{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </div>
</template>
<style>
</style>
<script>
    import Vue from 'vue';
    import { parseUrl } from 'base';

    export default {
        computed:{

        },
        mounted() {

        }
    }
</script>
