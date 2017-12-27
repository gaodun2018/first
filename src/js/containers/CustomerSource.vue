<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="10">
                 <el-tree style="max-height: 500px; overflow: auto" :check-strictly="true" :default-expanded-keys="[this.defaultKeys]" :data="this.$store.state.CustomerSource.treeData" 
                  empty-text="加载中..."  @node-click="selectNode" :props="defaultProps" node-key="id" :render-content="renderContent" :highlight-current="true">
                  </el-tree>
            </el-col>
            <el-col :span="14">
                <div class="channel-info">
                    <el-row :gutter="5">
                        <el-col :span="5" :offset="1">
                            <label>客户来源名称：</label>
                        </el-col>
                        <el-col :span="16">
                            <el-input size="small" @change="updateName"  :value="this.$store.state.CustomerSource.currentNode.SourceName"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" v-if="this.$store.state.CustomerSource.currentNode.SourceCode">
                        <el-col :span="5" :offset="1">
                            <label>客户来源编码：</label>
                        </el-col>
                        <el-col :span="6">
                            <label class="c-l-info" >{{this.$store.state.CustomerSource.currentNode.SourceCode}}</label>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5">
                        <el-col :span="6" :offset="6">
                            <div class="c-i-buttons">
                                <el-button style="width: 70px" v-loading="this.$store.state.channel.loading" type="primary" size="small" @click="updateCustomerSourceName">保存</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<style>
    .channel-info{border:1px solid #d1dbe5;padding:60px;}
    .channel-info label{display:block;text-align:right;height:30px;line-height:30px;font-size:12px;}
    .channel-info label.c-l-info{text-align:left;color:#8c99aa;}
    [classname="span_b"]{display:none;}
    .el-tree-node__content:hover [classname="span_b"]{display:block;}
    .c-i-buttons{padding-top:20px;}
    .el-tree-node__content{font-size:12px;}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations ,mapActions} from 'vuex';
import { Tree, Button, Row, Col, Input,MessageBox } from 'element-ui';
Vue.use(Tree)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
export default {
    name: 'CustomerSource-index',
    components:['Input'],
    data() {
        return {
            defaultProps: {
                children: 'ChildList',
                label: 'SourceName'
            },
            defaultKeys:2449
        }
    },
    computed:{
    },
    methods: {
        ...mapActions([
            'updateCustomerSourceName'
        ]),


        updateName(value){
            this.$store.dispatch('updateCurrentNode',{
                SourceName: value,
            });
        },
        renderContent(h, { node, data, store }) {
    
            let className = "span_b";
            let triggerAddHandle = (e)=>{
                this.$store.dispatch('updateCurrentNode',{
                    SourceName:'',
                    SourceCode:0,
                    Flag: 1,
                    id: data.id
                });
                this.defaultKeys = data.id;
                e.stopPropagation();
            }
            let triggerRemoveHandle = (e)=>{
                e.stopPropagation();
                MessageBox.confirm('是否删除ID为 '+ data.id + ' 的客户来源?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteCustomerSourceNode',data.id);
                    this.defaultKeys = node.parent.data.id;
                });
            }
            return (
                    <span>
                        <span>
                            <span>【{node.data.id}】 {node.label}</span>
                        </span>
                        <span style="float: right; margin-right: 20px" className={className}>
                            <el-button size="mini" on-click={ triggerAddHandle}>新增</el-button>
                            <el-button size="mini" on-click={triggerRemoveHandle}>删除</el-button>
                        </span>
                    </span>
            );
        },
        /**
         * 选择节点事件
         * @param node 被选择的节点
         */
        selectNode(data,node,currentComponent){
            node.checked = !node.checked;
            this.defaultKeys = data.id;
            this.$store.dispatch('updateCurrentNode',{
                SourceName: data.SourceName,
                SourceCode: data.SourceCode,
                id: data.id,
                Flag: 0
            });
        }
    },
    mounted(){
        this.$store.dispatch('loadTreeData');
    
    },
}
</script>