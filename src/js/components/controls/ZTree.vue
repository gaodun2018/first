<template>
	<div class="clues-user-tree tree-wrapper" @click.stop="valClick">
		<div style="position:relative;">
			<i @click.stop="resetChecked" v-show="isRemove" class="tree-circle-close el-icon-circle-close"></i>
			<el-input :style="{'width': width}" type="text" size="small" v-model="treeUserName" :placeholder="placeholder ? placeholder : '请选择'" :title="treeUserName" :disabled="true" class="tree-input-disabled"></el-input>
		</div>
		<div class="ztree-control" v-show="showTree" :style="{'minWidth' : width}">
			<div class="z-tree-body">
				<ul :id="controlId" class="ztree"></ul>
			</div>
			<div>
				<el-input size="small" placeholder="输入关键字进行过滤" type="text" :value="currentValue" @input="handleInput" class="form-control txt-user-filter search-text" style="width:100%;"></el-input>
			</div>
		</div>
	</div>
</template>
<style>
	.form-control.txt-user-filter.search-text.el-input.el-input--small input{
		border: 0;
		border-bottom: 1px solid #ccc;
	}
</style>
<style scoped>
	.clues-user-tree{
		width:200px;
		display:inline-block;
		position:relative;
	}
	.txt-user-filter {
		position: relative;
		top: 3px;
		border: 0;
		border-top: 1px solid #ccc;
		border-top-left-radius: inherit;
		border-top-right-radius: inherit;
	}
	.input-user-name{
		width:100%;
		padding-right:20px;
		line-height:30px;
	}
	.ztree-control{
		min-width:200px;
		position:absolute;
		z-index:100;
		border:1px solid #D1DBE5;
		border-radius:2px;
	}
	.z-tree-body{
		height:240px;
		overflow-x:hidden;
		overflow:auto;
		background-color:#FFFFFF;
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
</style>
<script>
import Vue from 'vue';
import { CRM_USER_INFO } from '../../util/keys';

export default {
	props: {
		width: String, // 人员树的宽度
		// currentValue: String, // 当前输入的值
		treeType: String, // 树的类型
		callback: Function, // 获取当前树所选的值
		reset: Function, // 重置
		placeholder: String, // 自定义提示文案
		allSelected: Function,//数据选中以后触发
		setTreeId: Array, // 客户来源
		getTreeData: Array,
		controlId:String//ztree的ID
	},
	data() {
		return {
			width: '100%',
			showTree: false,
			currentValue:"",
			userInfo: '',
			treeUserName: '',
			treeUserId: this.setTreeId,
			isRemove: false,
			hasChange: false,
			getUserData: this.getTreeData, // 人员
			defaultProps: {
				label: 'Name',
				children: 'ChildrenList'
			},
			zTreeSetting:{
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
				},
				callback: {
					onCheck: this.getCheckedNodes
				}
			}
		}
	},
	watch: {
		currentValue(val) { // 过滤搜索
		  this.filterTreeNodes(val);
		}
	},
	methods: {
		valClick(event){
			event.cancelBubble = true;
			this.showTree=true;
		},
		handleInput(val) { // 获取输入值
			this.currentValue = val;
		},
		filterTreeNodes(filterVal) {//过滤树节点
			var treeObj = $.fn.zTree.getZTreeObj(this.controlId);
			var allNodes = this.getUserData;
			var arrSearchNodes=[];
			
			if(!filterVal){
				treeObj.expandAll(false);
				$.fn.zTree.init($('#'+this.controlId), this.zTreeSetting,allNodes);
				return;
			}
			for (var i = 0; i < allNodes.length; i++) {
				var childNodes = this.treeFilter(filterVal, allNodes[i]);
				if (childNodes && childNodes.length > 0) {
					var node = {
						Id: allNodes[i].Id,
						Name: allNodes[i].Name,
						ParentId: allNodes[i].ParentId,
						LeaderId: allNodes[i].LeaderId,
						NodeType: allNodes[i].NodeType,
						ChildrenList: childNodes
					}
					arrSearchNodes.push(node);
				}
			}
			$.fn.zTree.init($('#'+this.controlId), this.zTreeSetting,arrSearchNodes);
			treeObj.expandAll(true);
		},
		treeFilter(name, node) {//过滤树节点
			if (!node && !node.ChildrenList) {
				return null;
			}
			var arrListNodes = [];
			if (node.ChildrenList) {
				for (var i = 0; i < node.ChildrenList.length; i++) {
					var childNode ={
						Id: node.ChildrenList[i].Id,
						Name: node.ChildrenList[i].Name,
						ParentId: node.ChildrenList[i].ParentId,
						LeaderId: node.ChildrenList[i].LeaderId,
						NodeType: node.ChildrenList[i].NodeType,
						ChildrenList: null
					}
					if (!isNaN(childNode.Id)) {
						if (childNode.Name.indexOf(name) > -1) {
							arrListNodes.push(childNode);
						}
					}
					else {
						if (node.ChildrenList[i].ChildrenList) {
							var arrChilds = this.treeFilter(name, node.ChildrenList[i]);
							if (arrChilds && arrChilds.length > 0) {
								childNode.ChildrenList = arrChilds;
								arrListNodes.push(childNode);
							}
						}
					}
				}
			}
			return arrListNodes;
		},
		getCheckedNodes(event, treeId, treeNode) {//获取选中的节点
			var treeObj = $.fn.zTree.getZTreeObj(this.controlId);
			var nodes = treeObj.getCheckedNodes(true);
			if (nodes) {
				var arrIds = [];
				var arrVal = [];
				$(nodes).each(function (i, e) {
					if (!isNaN(e.Id)) {
						arrIds.push(e.Id);
						arrVal.push(e.Name);
					}
				});
				if (arrVal.length > 0) {
					$(".users-clear").show();
				}
				else {
					$(".users-clear").hide();
				}
				this.treeUserName=arrVal.join(",");
				this.treeUserId=arrIds;
				this.$emit('getTreeId', this.treeUserId)
			}
		},//
		resetChecked(){//去除选中的节点
            var treeObj = $.fn.zTree.getZTreeObj(this.controlId);
			treeObj.checkAllNodes(false);
			this.treeUserName="";
		},
		setDefaultNode(){//设置默认值
			if(this.treeUserId && this.treeUserId.length>0){
				var allNodes=this.getUserData;
				var defaulUserIds=this.treeUserId.slice(0);
				for(var i=0;i<allNodes.length;i++){
					this.setDefaultChild(allNodes[i],defaulUserIds);
				}
			}
		},
		setDefaultChild(node,userIds){
			if(!userIds||userIds.length==0||!node){
				return;
			}
			for(var i=0;i<userIds.length;i++){
				if(node.Id==userIds[i]){
					node.checked =true;
					userIds.splice(i,1);
					this.treeUserName=this.treeUserName+node.Name+",";
					break;
				}
			}
			if(node.ChildrenList&&node.ChildrenList.length){
				for(var i=0;i<node.ChildrenList.length;i++){
					this.setDefaultChild(node.ChildrenList[i],userIds);
				}
			};
		},
	},
	updated() {
		if (this.treeUserName.length) {
			this.isRemove = true;
		} else {
			this.isRemove = false;
		}
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
		let a = this.curre
	},
	mounted() {
		this.setDefaultNode();
		$.fn.zTree.init($('#'+this.controlId), this.zTreeSetting, this.getUserData);
		document.body.onclick = (function() { // 隐藏人员树
			this.showTree=false;
			// var tree = document.body.querySelectorAll('.ztree-control');
			// for (let i = 0; i < tree.length; i++) {
			// 	tree[i].style.display = 'none';
			// }
			// if (this.hasChange) {
			// 	if (typeof this.allSelected === 'function') {
			// 		this.allSelected();
			// 	}
			// 	this.hasChange = false;
			// }

		}.bind(this));
	}
}
</script>