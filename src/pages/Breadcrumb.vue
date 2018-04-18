<template>
    <div>
        <el-row class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <template v-for="(item,index) in $store.state.navigation.breadcrumbmenu">
                    <template v-if="item.url.indexOf('/') > -1">
                        <el-breadcrumb-item :to="{ path: item.url }" :key="index">
                            {{item.name}}
                        </el-breadcrumb-item>
                    </template>
                    <template v-else>
                        <el-breadcrumb-item :key="index">
                            {{item.name}}
                        </el-breadcrumb-item>
                    </template>
                </template>
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
        .el-breadcrumb__inner {
            color: #99a9bf;
            a {
                &:hover {
                    color: #409eff;
                    cursor: pointer;
                }
            }
        }
        .is-link {
            color: #303133;
            &:hover {
                color: #409eff;
                cursor: pointer;
            }
        }
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
