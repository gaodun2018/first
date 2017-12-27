<template>
    <div class="module-clues-content order-manage">
        <el-form ref="form" :model="form">
            <div class="roder-content-label">
                <div style="height: 35px">
                    <div class="FL">
                        <el-row>
                            <div style="display: inline-block;margin-right: 5px">
                                <el-form-item>
                                    <el-radio-group v-model="MsgStatus" @change="StatusSeach">
                                        <el-radio :label="0" :key="0">未读</el-radio>
                                        <el-radio :label="1" :key="1">已读</el-radio>
                                        <el-radio :label="9" :key="9">全部</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div style="display: inline-block;margin-right: 5px">
                                <el-button size="small" style="width: 75px" :disabled="MessageIdList.length ? false : true" @click="onBatchSetup">批量已读</el-button>
                            </div>
                        </el-row>
                    </div>
                    <div class="FR">
                        <el-row>
                            <div class="clues-search">
                                <el-input  placeholder="根据消息内容关键字模糊匹配" v-model="MsgContent" size="small" style='width: 328px;position: relative; z-index: 100'>
                                    <el-button slot="append" icon="search" @click="onSeach"></el-button>
                                </el-input>
                            </div>
                        </el-row>
                    </div>
                </div>
            </div>
              <div class="clues-table">
                <el-table ref="multipleTable" v-loading="loading" border :row-class-name="tableRowClassName"  @selection-change="handleSelectionChange" :data="MessageList" style="width: 100%">
                    <el-table-column type="selection" align="right">
                    </el-table-column>
                    <el-table-column prop="MsgStatus_Str" style="#676767" label="状态" min-width="80">
                    </el-table-column>
                    <el-table-column prop="MsgContent" style="#676767"  label="消息内容" min-width="300">
                    </el-table-column>
                    <el-table-column prop="CreateTime" style="#676767" label="接收时间" min-width="130">
                    </el-table-column>
                    <el-table-column prop="MessageType_Str" style="#676767" label="消息类型" min-width="150">
                    </el-table-column>
                </el-table>
                <div class="clues-pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="MessageTotal" :page-count="10/pageSize">
                    </el-pagination>
                </div>
            </div>
        </el-form>
    </div>
</template>
<style>
.clues-manage-style .el-button.el-button--default.cluesButton-icon>span,
.clues-manage-style .addNewuserIcon>span {
    position: relative;
    bottom: 3px;
}
.clues-new-add-bnt {
    margin-left:20px;
    display: inline-block;
    line-height: 28px;
    position: relative;
    top: -2px;
}
.order-manage .el-table__header-wrapper table thead tr th.el-table_1_column_5 .cell {
    padding-left: 40px;
}

.order-manage-dislog .el-dialog--small {
    width: 30%;
}

.order-manage-dislog .el-dialog__body {
    padding: 20px
}
.roder-content-label {
    position: relative;
}
.roder-content-label .el-form-item {
    margin-bottom: 10px;
}

.order-search-form .el-form-item {
    margin-bottom: 10px;
}

.clues-bnt-item .tracking-text-font .el-form-item__label {
    padding: 11px 0 11px 0;
}

.el-dropdown {
    font-size: 12px;
    color: #20a0ff;
}

.el-button-border {
    padding-right: 5px;
    border-right: 1px solid #20a0ff;
    border-radius: inherit;
}
.cell-red{
    color:red;
}
.cell-back{
    color:black;
}
</style>
<script>
import { mapState, mapMutations } from 'vuex';
import { GetMessageList,ReadMessage } from '../api/message';
export default {
    data() {
        return {
            MsgStatus:0,
            MessageTotal:0,
            MsgContent:'',
            MessageList:[],
            MessageIdList:[],
            currentPage:1,
            pageSize:10
        }
     },
     methods: {
          handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            // if(flag){return;}
            this.onSeach();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.onSeach();
        },
         handleSelectionChange(val) { // 列表勾选
            this.MessageIdList = [];
            val.map((item, index) => {
                this.MessageIdList.push(item.ID);
            })
            this.$store.dispatch('getDistributionGuid', this.MessageIdList);
            this.multipleSelection = val;
        },
         onBatchSetup(){
             ReadMessage(this.MessageIdList).then(ret=>{
                 if (ret.status === 0) {
                    this.$message({
                        message: '已将选中消息状态设置成已读',
                        type: 'success'
                    });
                    this.onSeach();
                 }

             });
         },
        tableRowClassName(row,  rowIndex){
            if (row.MsgStatus === 1) {
                return 'cell-back';
            } else if (row.MsgStatus === 0) {
                return 'cell-red';
            }
            return '';
         },
         StatusSeach(){
             let params = {
                Where: {
                    MsgStatus:this.MsgStatus,
                    //MessageType:'',
                    MsgContent:this.MsgContent
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy:'CreateTime',
                SortCol:1
            }
            GetMessageList(params).then(ret=>{
                 if (ret.status === 0) {
                     this.MessageList=ret.result.Body;
                     this.MessageTotal=ret.result.Count;
                 }
            })
         },
         onSeach(){
                let params = {
                    Where: {
                        MsgStatus:this.MsgStatus,
                        //MessageType:'',
                        MsgContent:this.MsgContent
                    },
                    PageIndex: this.currentPage,
                    PageSize: this.pageSize,
                    OrderBy:'CreateTime',
                    SortCol:1
                }
                GetMessageList(params).then(ret=>{
                    if (ret.status === 0) {
                        this.MessageList=ret.result.Body;
                        this.MessageTotal=ret.result.Count;
                        //this.$store.dispatch('GetUnreadMessageCount')
                    }
                })
         }
     },
     computed: {
     },
     created() {
         this.StatusSeach(this.MsgStatus);
     }
}
</script>