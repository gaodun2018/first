<template>
    <div class="clues-search-tree">
        <div @click.stop="onTriggerTree" class="tree-wrapper">
            <div style="position: relative">
                <i @click.stop="resetChecked" v-show="isRemove" class="tree-circle-close el-icon-circle-close"></i>
                <el-input class="tree-input-disabled"  placeholder="请选择" :disabled="true" v-model="treeUserName" :title="treeUserName" ></el-input>
            </div>
            <div v-if="!showTree" class="tree-box">
                <div style="width: 100%;position: relative;">
                    <el-tree class="filter-tree" @check-change="checkChangeTree" :data="getUserData" empty-text="加载中..." :props="defaultProps" node-key="id" show-checkbox accordion  :filter-node-method="filterNode" ref="tree" :highlight-current="true">
                    </el-tree>
                    <input size="small" placeholder="输入关键字进行过滤" :value="currentValue" @input="handleInput" class="search-text">
                    </input>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.clues-search-tree{
    float: left;
    width:100%;
    position: relative;
    display: inline-block;
}
.tree-wrapper {
    display: inline-block;
    position: relative;
    width:100%;
}

.tree-wrapper .el-icon-circle-close {
    position: absolute;
    right: 6px;
    top: 10px;
    z-index: 9;
    font-size: 14px;
    color: #9ca9c6;
    cursor: pointer;
}

.tree-box {
    position: absolute;
    top: 40px;
    z-index: 99999;
    display: none;
    width:100%;
    min-width:160px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
}

.tree-filter {
    font-size: 12px;
    border: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    outline: none;
    padding: 0px 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    position: relative;
    top: -5px;
}
   .search-text {
        min-width: -webkit-fill-available;
        font-size: 12px;
        border: 1px solid #ccc;
        height: 30px;
        line-height: 30px;
        border-radius: 3px;
        outline: none;
        padding: 0px 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        position: relative;
        top: -5px;
        box-sizing: border-box;
        width:100%;
        min-width: 140px;
    }
</style>
<style>
.tree-input-disabled.is-disabled .el-input__inner{
    background-color:#fff;
    cursor: pointer;
    color:#000;
    border-color:#bfcbd9;
}
    .search-text::-webkit-input-placeholder {
        color: #bfcbd9;
    }
    .el-tree.filter-tree.el-tree--highlight-current {
        height: 300px;
        overflow: auto;
        font-size: 12px;
        border-radius: 2px;
    }
    .search-tree {
        font-size: 12px;
        position: absolute;
        left: 0;
        top: 33px;
        z-index: 5;
        display: -webkit-inline-box;
    
    }
    @media screen and (max-width: 1275px) {
        .search-tree  {
            width: 175px;
            font-size: 12px;
            position: absolute;
            left: 0px;
            top: 36px;
            height: 350px;
            z-index: 5;
            display: -webkit-inline-box;
            overflow: auto;
        }
    }
    .newUsers-tree {
        width: 150px;
        font-size: 12px;
        position: absolute;
        margin: 0 auto;
        left: 0px;
        top: 29px;
        height: 350px;
        z-index: 5;
        display: -webkit-inline-box;
        overflow: auto;
    }

</style>
<script>
import { GetCustomerSourceTree, GetArea } from '../api/cluesManage';
import { SAAS_USER_INFO } from '../util/keys';
export default {
    props: {
        // currentValue: String, // 当前输入的值
        treeType: String, // 树的类型
        callback: Function, // 获取当前树所选的值
        reset: Function, // 重置
        placeholder: String, // 自定义提示文案
        defaultTreeData:Array,
        index: Number
    },
    data() {
        return {
            showTree: false,
            currentValue: "",
            treeUserName: '',
            treeUserId: [],
            isRemove: false,
            hasChange: false,
            getUserData:[],
            defaultProps: {
				label: 'Name',
				children: 'ChildrenList'
			},
            getTreeData:[]
        }
    },
    watch: {
        currentValue(val) { // 过滤搜索
            this.$refs.tree.filter(val);
        },
        placeholder(val) {
            this.treeUserName = val
        }
    },
    methods: {
        handleInput(event) { // 获取输入值
            const value = event.target.value;
            this.$emit('input', value);
            this.$emit('change', value);
            this.currentValue = value;
        },

        async onGetCustomerSourceTree() { // 客户来源接口
			let ret = await GetCustomerSourceTree();
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
        },
        async onGetArea() { // 省市
			let ret = await GetArea();
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
		},
        onTriggerTree(event) { // 显示Tree      
            event.cancelBubble = true;
            this.showTree = false;
            var tree = document.body.querySelectorAll('.tree-box');
            for (let i = 0; i < tree.length; i++) {
                tree[i].style.display = 'none';
            }
            this.setCheckedNodes()
            this.$el.querySelector('.tree-box').style.display = 'block';
            switch (this.treeType) {
                case 'getArea':
					if (this.getUserData.length == 0) { // 省市
						this.onGetArea();
					}
                    break;
                case 'channels':
					if (this.getUserData.length == 0) { // 客户来源接口
						this.onGetCustomerSourceTree();
					}
					break;
                default:
                    if (this.getUserData.length == 0) {
                        this.onGetArea();
                    }
            }
            this.setCheckedKeys()
        },
        setCheckedNodes() {
            if(this.getTreeData){
                this.$refs.tree.setCheckedNodes(this.getTreeData);
            }
            
        },
        checkChangeTree() { // 所选节点的内容
            this.getTreeData = this.$refs.tree.getCheckedNodes();
            this.treeUserId = this.$refs.tree.getCheckedKeys();
            var checkedValues = []
            this.getTreeData.forEach((value) => {
                if(value.tagSubList === undefined){
                    checkedValues.push(value.Name)
                }
            })
            this.treeUserName = checkedValues.join(',')
            this.callback(this.treeUserId, this.index);
            this.hasChange = true;
        },
        filterNode(value, data) { // 过滤搜索
            if (!value) return true;
            return data.Name.indexOf(value) !== -1;
        },
        setCheckedKeys(){
            if(this.defaultTreeData){
                this.$refs.tree.setCheckedKeys(this.defaultTreeData)
            }
            
        },
        resetChecked(event) { // 清空选项
            event.stopPropagation();
            this.callback(null);
            this.$el.querySelector('.tree-box').style.display = 'none';
            setTimeout(() => {
                this.showTree = true;
            }, 10)
            setTimeout(() => {
                this.showTree = false;
            }, 20)

            this.treeUserName = '';
            this.treeUserId = [];
            this.getTreeData = []
            this.currentValue = '';
            if (typeof this.allSelected === 'function') {
                this.allSelected();
            }
        }
    },
    updated() {
        if (this.treeUserName.length) {
            this.isRemove = true;
        } else {
            this.isRemove = false;
        }
    },
    created() {
        this.treeUserName = this.placeholder
    },
    mounted() {
        this.$nextTick(function() {
            this.$on('resetTree', function() {
                this.callback(null);
                setTimeout(() => {
                    this.showTree = true;
                }, 10)
                setTimeout(() => {
                    this.showTree = false;
                }, 20)
                this.treeUserName = '';
                this.treeUserId = [];
                this.currentValue = '';
                this.getTreeData = []
            })
            this.$on('setShowTree',() => {
                setTimeout(() => {
                    this.showTree = true;
                }, 10)
                setTimeout(() => {
                    this.showTree = false;
                }, 20)
            })
        });
        document.body.onclick = (function() { // 隐藏人员树
            var tree = document.body.querySelectorAll('.tree-box');
            for (let i = 0; i < tree.length; i++) {
                tree[i].style.display = 'none';
            }

        }.bind(this));
    }
}
</script>