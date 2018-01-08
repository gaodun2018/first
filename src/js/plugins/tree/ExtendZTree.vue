<template>
    <div class="g-extend-ztree-box" @click.stop="onClickStop" :style="{zIndex:zTreeIndex,'width':width}">
        <i class="tree-circle-close el-icon-circle-close" v-if="names.length" @click.stop="clearCheckNodes"></i>
        <el-input type="text" :title="names" :value="names" readonly size="small" @focus="onFocus" :placeholder="placeholder"/>
        <div class="g-extend-ztree-area" v-show="showTree" @click="onTreeCheck">
            <ul :id="id" class="ztree" v-show="!isEmpty"></ul>
            <div v-show="isEmpty" class="empty"><i class="el-icon-information"></i> 未匹配到</div>
            <el-input type="text" @change="this.onChange" size="small" placeholder="输入关键字进行过滤"/>
        </div>
    </div>
</template>
<script>
    window.zTreeIndex = window.zTreeIndex || 90;

    function clone(obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    let delay = null;
    let zSetting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            },
            key: {
                name: "Name",
                title: "Name",
                children: "ChildrenList"
            }
        }
    }
    
    let self = '';
    export default {
        props: {
            value: Array,
            width: String,
            data: Array,
            Id: String,
            onCheck: Function,
            placeholder: String,
            index: Number
        },
        data() {
            return {
                names: [],
                backData: [],
                showTree: false,
                isEmpty: false,
                options:{
                    onCheck: () => {
                    }
                }

            }
        },
        watch: {
            data(data) {
                this.setCheckedNodes(this.value, this.data);
                this.backData = clone(this.data);
                this.initTree();
            },
        },
        computed: {
            id() {
                return (Math.random() * 10).toString().substring(2, 10)
            },
            zTreeIndex() {
                return window.zTreeIndex--
            }
        },
        created() {
            self = this;
            this.setCheckedNodes(this.value, this.data);
            this.backData = clone(this.data);
            // 初始化配置项
            this.options = {
                onCheck: this.onCheck
            }
        },

        mounted() {
            zSetting.callback = {
                onCheck: this.test
            }
            this.initTree();
            this.treeEvents();

            this.$nextTick(function () {
                this.$on('resetTree', function () {
                    this.clearCheckNodes();
                })
            })
        },
        methods: {
            test(){
            },
            onTreeCheck() {
                let nodes = this.getCheckedNodes();
                let names = [];
                let ids = [];
                for (let value of nodes) {
                    let strId = value.Id + '';
                    // if (ids.indexOf(value.Id) > -1 || /^[a-zA-Z]/.test(value.Id)) {
                    if (ids.indexOf(value.Id) > -1 || strId.indexOf('_')>-1) {
                        continue;
                    }
                    names.push(value.Name);
                    ids.push(value.Id)
                }
                this.names = names;
                this.value = ids;
                this.options.onCheck(ids, this.index, names,);
                this.setCheckedNodes(ids, this.backData, true);
            },
            initTree() {
                $(`#${this.id}`).zTree({
                    zSetting: zSetting,
                    zNodes: this.data
                });
            },
            resetTree() {
                var treeObj = $(`#${this.id}`).zTree('getZTreeObj');
                var nodes = treeObj.checkAllNodes(false);
            },
            /*
            * 清除树
            * */
            clearCheckNodes() {
                this.value = [];
                this.names = [];
                this.setCheckedNodes(this.value, this.data);
                this.options.onCheck(this.value, this.index, this.names);
                this.resetTree();
                this.$el.querySelector('.g-extend-ztree-area').style.display = 'none';
            },
            // 获取选中....
            getCheckedNodes() {
                var treeObj = $(`#${this.id}`).zTree('getZTreeObj');
                var nodes = treeObj.getCheckedNodes();
                return nodes;
            },
            setCheckedNodes(value = [], data, bool) {
                let self = this;
                setChecked(data, value);

                function setChecked(list, value) {
                    for (let v of list) {
                        if (value.indexOf(v.Id) > -1) {
                            v.checked = true;
                            if (!bool) {
                                if(self.names.indexOf(v.Name) > -1){
                                    continue;
                                }
                                if (self.names.indexOf(v.Id) == -1 || /^\d/.test(v.Id)) {
                                    self.names.push(v.Name)
                                }
                            }

                        } else {
                            v.checked = false;
                        }
                        if (v.ChildrenList) {
                            setChecked(v.ChildrenList, value);
                        }
                    }
                }
            },
            setChecked(value) {
                this.value = value;
                this.names = [];
                this.setCheckedNodes(value,this.data,false);
                this.initTree();

            },

            onChange(value) {
                let self = this;
                clearTimeout(delay);
                delay = setTimeout(() => {
                    //this.setCheckedNodes(self.value,self.backData,true);
                    let newData = clone(self.backData);
                    this.filterData(newData, value);
                    //this.data = newData;
                    //console.log(this.data)
                    this.isEmpty = newData.length === 0 ? true : false;
                    $(`#${this.id}`).zTree({
                        zSetting: zSetting,
                        zNodes: newData
                    });
                }, 300)
            },
            onFocus(e) {
                e.stopPropagation();
                this.showTree = true;
                //this.setCheckedNodes(this.value, this.data);
                //this.initTree()
            },
            onClickStop(event) {
                event.cancelBubble = true;
                this.showTree = true;
                var tree = document.body.querySelectorAll('.g-extend-ztree-area');
                for (let i = 0; i < tree.length; i++) {
                    tree[i].style.display = 'none';
                }
                this.$el.querySelector('.g-extend-ztree-area').style.display = 'block';
            },
            filterData(nData, value) {
                for (let i = 0; i < nData.length; i++) {
                    if (nData[i].ChildrenList) {
                        let ret = this.childHasValue(nData[i].ChildrenList, value);
                        if (ret === true) {
                            if(value!=""){
                                nData[i].open = true;
                            }
                            this.filterData(nData[i].ChildrenList, value);
                        } else {
                            nData.splice(i, 1);
                            i--;
                        }
                    } else {
                        nData[i].open = false;
                        if (nData[i].Name.indexOf(value) > -1) {
                            //continue;
                        } else {
                            nData.splice(i, 1);
                            i--;
                        }
                    }
                }
            },
            childHasValue(children, value) {
                for (let i = 0; i < children.length; i++) {
                    if (children[i].Name.indexOf(value) > -1) {
                        return true;
                    } else {
                        if (children[i].ChildrenList) {
                            let ret = this.childHasValue(children[i].ChildrenList, value);
                            if(ret){
                                return ret
                            }else{
                                continue;
                            }
                        }
                    }
                }
            },
            treeEvents() {
                document.body.onclick = (function() { // 隐藏人员树
                    var tree = document.body.querySelectorAll('.g-extend-ztree-area');
                    for (let i = 0; i < tree.length; i++) {
                        tree[i].style.display = 'none';
                    }
                }.bind(this));
            }
        }
    }
</script>
<style>
    .g-extend-ztree-box {
        /*width: 200px;*/
        position: relative;
        z-index: 999;
    }

    .g-extend-ztree-box .empty {
        font-size: 14px;
        color: #999;
        text-align: center;
    }

    .g-extend-ztree-area {
        position: absolute;
        min-width: 100%;
        background: #fff;
        z-index: 101;
        border: 1px solid #d1dbe5;
        box-sizing: border-box;
        overflow: hidden;
    }

    .g-extend-ztree-area > ul {
        max-height: 220px;
        overflow-y: auto;
    }

    .g-extend-ztree-area .el-input__inner {
        border-width: 1px 0 0 0;
        border-radius: 0;
    }

    .g-extend-ztree-box .el-icon-circle-close {
        position: absolute;
        right: 5px;
        top: 10px;
        z-index: 9;
        font-size: 14px;
        color: #9ca9c6;
        cursor: pointer;
    }

    .g-extend-ztree-box .el-input__inner {
        background-color: #fff;
        cursor: pointer;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>