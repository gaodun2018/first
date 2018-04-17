<template>
    <div>
        <el-row class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item,index) in $store.state.navigation.breadcrumbmenu" :to="{ path: item.url.indexOf('/')>-1 ? item.url :'' }" :key="index">
                    {{item.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>
    </div>
</template>
<style lang="less">
.breadcrumb {
    height: 28px;
    background-color: #f8f8f8;
    font-family: PingFangSC;
    font-size: 12px;
    color: #909296;
    padding-left: 28px;
    margin-left: 2px;
    .el-breadcrumb {
        height: 100%;
        line-height: 28px;
        font-size: 12px;
    }
}
</style>

<script>
import Vue from "vue";
import { parseUrl } from "base";

export default {
    computed: {},
    mounted() {}
};
</script>
