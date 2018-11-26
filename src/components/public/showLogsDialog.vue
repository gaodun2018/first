<template>
<div class="logsdialog">
    <el-dialog
    title="操作记录"
    :visible.sync="dialog"
    :before-close="toClose"
    width="55%"
    @close="toClose">
        <el-table :data="list" height="500">
            <el-table-column
            prop="id"
            label="日志ID"
            width="100">
            </el-table-column>
            <el-table-column
                prop="user_name"
                label="操作人"
                width="140">
            </el-table-column>
            <el-table-column
                prop="log_type"
                width="160"
                label="事件类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.log_type == 1">课程操作</span>
                    <span v-else-if="scope.row.log_type == 2">大纲操作</span>
                    <span v-else-if="scope.row.log_type == 3">资源操作</span>
                    <span v-else>公共服务操作</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="action"
                width="240"
                label="操作内容">
            </el-table-column>
            <el-table-column
                prop="created_at"
                min-width="160"
                label="操作时间">
                <template slot-scope="scope">
                    {{scope.row.created_at | formatTime}}
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            style="margin-top:20px;"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="50"
            layout="total, prev, pager, next, jumper"
            :total="total">
        </el-pagination>

    </el-dialog>
</div>


</template>

<script>
export default {
    props:{
        dialog:{
            type:Boolean
        },
        list:{
            type:Array,
        },
        total:{
           type:Number,
           default:0,
        }
    },
    data() {
        return {
            page:1,
        }
    },
    created(){
    },
    methods: {
        // 提交关闭事件
        toClose(){
            this.$emit("toClose");
        },
        // 分页事件
        handleCurrentChange(val) {
            this.$emit("handleChangePage",val);
        }
    },
    filters:{
        formatTime(val){
            let t = new Date(val);
            let Y = t.getFullYear();
            let M = t.getMonth() + 1 >9? t.getMonth() + 1 : '0' + t.getMonth() + 1;
            let D = t.getDate() >9? t.getDate() : '0' + t.getDate();
            let H = t.getHours()>9? t.getHours() : '0' + t.getHours();
            let S = t.getMinutes()>9? t.getMinutes() : '0' + t.getMinutes();

            return `${Y}-${M}-${D} ${H}:${S}`
        }
    }

}
</script>

<style>
.logsdialog .el-table--fit{
    border-right: 0!important;
}
</style>


