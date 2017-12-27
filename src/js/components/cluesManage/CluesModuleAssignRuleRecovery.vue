<template>
	<el-form label-width="120px">
		<div class="module-clues-content clusAssignRe">
			<div>
				<el-row>
					<el-col :span="16">
						<div>
							<el-select style="margin-right: 10px" v-model="searchProJectValue" filterable clearable class="selectItem" placeholder="按项目" size="small" @change="selectChange">
								<el-option v-for="item in optionProject" :key="item.Id" :label="item.Name" :value="item.Id">
								</el-option>
							</el-select>
							<el-date-picker v-model="searchTimeValue" type="daterange" placeholder="起始时间" style="width: 190px;margin-right: 10px" size="small" @change="selectChange">
							</el-date-picker>
							<el-select style="margin-right: 10px" v-model="searchStatu" filterable clearable class="selectItem" placeholder="按状态" size="small" @change="selectChange">
								<el-option v-for="item in OptionStatu" :key="item.Id" :label="item.Name" :value="item.Id">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="clues-search">
							<el-input placeholder="根据规则名称模糊查询" style="width: 250px" v-model="searchValue" size="small">
								<el-button slot="append" icon="search" @click="onSearch"></el-button>
							</el-input>
						</div>
					</el-col>
				</el-row>
			</div>
			<div style="width:100%;">
				<div style="width:100%;border-left:solid 5px rgb(83, 162, 222);margin:15px 0 18px 0;padding-left:7px;">
					回收列表
				</div>
				<div class="RuleLeft">
					<div class="el-tabs el-tabs--border-card" style="border-radius:2px;">
						<div style="width: 100%;padding: 10px 0px 0px;text-align: right;">
							<el-button size="small" style="width: 70px;border: 1px solid #1d90e6;margin-right: 15px" type="text" @click="ClearnAll">新增</el-button>
						</div>
						<div class="el-tabs__content">
							<el-table :data="tableData" v-loading="loading" border style="width:100%;cursor: pointer" @row-click="OnRowClickInfo">
								<el-table-column prop="RecoveryName" label="回收器名称">
								</el-table-column>
								<el-table-column prop="CourseType_Str" label="项目" min-width="90">
								</el-table-column>
								<el-table-column prop="ClueType_Str" label="线索状态">
								</el-table-column>
								<el-table-column prop="CreateTime" label="创建时间" min-width="110" :formatter="TimeFormat">
								</el-table-column>
								<el-table-column prop="CreateBy_Str" label="创建人" min-width="90">
								</el-table-column>
								<el-table-column label="操作" min-width="140">
									<template scope="scope">
										<el-button type="text" size="small">修改</el-button>
										<el-button type="text" size="small">启动</el-button>
										<el-button type="text" size="small">删除</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="clues-pagination">
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="RuleRight">
					<div class="el-tabs el-tabs--border-card" style="border-radius:2px;">
						<div class="el-tabs__content">
							<el-form :model="form" ref="form" style="position:relative">
								<el-row style="margin-bottom:15px;">
									<label style="margin-left: 20px;">回收配置</label>
								</el-row>
								<el-row>
									<el-col :sm="24">
										<el-form-item label="回收器名称" :label-width="formLabelWidth">
											<strong class="tigRed">*</strong>
											<el-input size="small" style="width:67%" v-model="recoveryName"></el-input>
										</el-form-item>
									</el-col>
									<el-col :sm="24">
										<el-form-item label="适用项目" prop="CourseType" :label-width="formLabelWidth">
											<strong class="tigRed">*</strong>
											<el-select v-model="modelProject" filterable clearable class="tracking-text-font" size='small' style="width:67%" placeholder="请选择">
												<el-option v-for="item in optionProject" :key="item.Id" :label="item.Name" :value="item.Id">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :sm="24">
										<el-form-item label="适用团队" :label-width="formLabelWidth">
											<strong class="tigRed">*</strong>
											<div style="position:relative;width:67%;display:inline-block;">
												<input v-model="modeltearmName" class="el-input__inner" size="small" style="height:30px;" @click="DisplayTearmTree" />
												<div style="width:324px;position:absolute;height:auto;z-index:999" @mouseleave="HideAll">
													<el-tree :check-strictly="true" v-show="isTeamDisplayTree" :show-checkbox="false" :data="TearmList" @node-click="treeTearmChange" ref="treeTearm" class="TearmTree" :default-checked-keys="modeltearm" node-key="Id" :render-content="renderContent" :props="DepartUseProps" :highlight-current="true" style="position:relative;bottom:4px;width:303px;max-height:300px;overflow:auto;"></el-tree>
												</div>
											</div>
										</el-form-item>
									</el-col>
									<el-col :sm="24">
										<el-form-item label="线索状态" prop="CourseType" :label-width="formLabelWidth">
											<strong class="tigRed">*</strong>
											<el-select v-model="modelclueSatu" filterable clearable class="tracking-text-font" size='small' style="width:67%" placeholder="请选择">
												<el-option v-for="item in ClueList" :key="item.Id" :label="item.Name" :value="item.Id">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :sm="24">
										<el-form-item label="停留时间" :label-width="formLabelWidth">
											<strong class="tigRed" style="margin-right:10px;"> </strong>
											<el-input size="small" style="width: 114px" v-model="stopTime"></el-input>
											<label style="width:30px;color:#8f9aac;position: relative;top: 1px;">分钟</label>
										</el-form-item>
									</el-col>
									<el-col :sm="24">
										<el-form-item label="状态" prop="Gender" :label-width="formLabelWidth">
											<strong class="tigRed">*</strong>
											<el-radio-group v-model="isDeleted">
												<el-radio v-for="item in OptionStatu" :label="item.Id" :key="item.Id">{{item.Name}}</el-radio>
											</el-radio-group>
										</el-form-item>
									</el-col>
									<el-col :sm="24">
										<el-form-item label="回收至" prop="CourseType" :label-width="formLabelWidth">
											<strong class="tigRed">*</strong>
											<div style="position:relative;width:67%;display:inline-block;">
												<input v-model="modelUseName" size="small" class="el-input__inner" style="height:30px;" @click="DisplayOneTree" />
												<div style="width:324px;position:absolute;height:auto;z-index:999;" @mouseleave="HideAll">
													<el-tree :data="UserList" ref="treeUse" v-show="isOneDisplayTree" :default-checked-keys="this.modelUse" :default-expanded-keys="this.modelUse" node-key="Id" :props="DepartUseProps" @node-click="treeOneChange" :highlight-current="true" style="width: 303px;position:relative;bottom:3px;max-height:200px;overflow:auto;" :check-strictly="true"></el-tree>
												</div>
											</div>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-form-item style="text-align: center; margin-top: 20px;" class="btnSave">
										<el-button style="width: 70px" size="small" type="primary" @click="submitForm">保存</el-button>
										<el-button size="small" style="width: 70px;border: 1px solid #1d90e6;" type="text" @click="RemoveData">删除</el-button>
									</el-form-item>
								</el-row>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</el-form>
</template>
<style>
.tigRed {
	color: red;
	position: relative;
	top: 2px;
}

.RuleLeft .el-table .cell {
	text-align: center;
}

.clues-query-style .clues-query-table .el-col-6 {
	word-break: break-word;
}

.clues-query-style {
	padding: 20px 17px 0px;
}

.clusAssignRe .selectItem {
	width: 18%;
}

.clusAssignRe .el-form .el-tabs__nav {
	float: right;
}
.clusAssignRe .el-form-item {
	margin-bottom: 5px;
}
/*.clues-content-label .el-date-editor input{
  	height: 36px;
  }*/

.btnSave .el-form-item__content {
	margin-left: 0px !important;
}
.btnSave .el-form-item__content {
	margin-left: 0px !important;
}

.RuleRight {
	width: 40%;
	float: right;
}

.RuleRight .el-form-item__label {
	width: 104px;
}

.RuleLeft {
	width: 59.5%;
	float: left;
	height: 100%;
	display: table-cell;
	padding-bottom: 28px;
	margin-bottom: 39px;
}

.RuleRight .el-tabs__content {
	overflow: initial;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { format, number2DateTime } from '../../util/util';
import { Message, MessageBox } from 'element-ui';
import { CRM_USER_INFO } from '../../util/keys';
import {
	interestedProject, GetRecoveryRuleList, AddRecovery, EditRecovery, DeDisableRecovery, GetRecoveryRuleInfo
	, GetClueTypeEnumList, GetUserDepartmentTree, GetDataTypeEnumList, GetQuickRecoveryRuleList, GetOrganizeTree,
	GetPublicPoolUser
} from '../../api/cluesManage';

export default {
	name: 'AssignRuleRecovery',
	props: ['self'],
	data() {
		return {
			loading: false,
			/*修改时的id*/
			updateGuid: '',
			/*修改时的id*/

			/*搜索条件*/
			isTeamDisplayTree: false,
			isOneDisplayTree: false,
			searchValue: '',
			searchProJectValue: '',
			searchTimeValue: [],
			searchEndValue: '',
			searchStatu: 0,
			pageSize: 10,
			currentPage: 1,
			cluesTotal: 0,


			/*搜索条件*/


			isDeleted: 0,//0,有效,1无效
			modelProject: '',//感兴趣的项目
			stopTime: '',//停留时间
			recoveryName: '',//回收器名称
			modeltearm: [],//选中团队值
			modeltearmName: '',//选中团队名称
			modelclueSatu: '',//选中线索状态
			modelUse: [],//选中用户
			modelUseName: '',
			tableData: [], //列表集合
			optionProject: [],//项目集合
			TearmList: [], //团队列表
			ClueList: [],//线索状态集合
			UserList: [],   //人员列表

			OptionStatu: [],//状态集合

			DepartUseProps: { //部门绑定列名
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
			},
			formLabelWidth: 120
		}
	},
	//事件
	methods: {
		//状态格式化
		StatuFormat: function(modelData) {
			if (modelData != null) {
				var deleteStatu = modelData.IsDeleted;
				switch (deleteStatu) {
					case 1:
						return "停用";
					case 0:
						return "在用";
					default:
						return "在用";
				}
			}

		},
		TimeFormat: function(modelData) {
			if (modelData != null) {
				var datapan = Date.parse(modelData.CreateTime);
				return number2DateTime(datapan, "yyyy-MM-dd HH:mm:ss");
			}
			else {
				return "";
			}

		},

		handleCurrentChange(val) { // 分页事件 => 当前页变动
			this.currentPage = val;
			this.GetDataList();
		},
		handleSizeChange(val) { // 分页事件 => 处理页码大小
			this.pageSize = val;
			this.GetDataList();
		},
		//绑定列表
		GetDataList() {
			let searchPrm = {
				Where: {
					CourseType: this.searchProJectValue,
					BeginTime: "",
					EndTime: "",
					IsDeleted: this.searchStatu,
					RecoveryName: this.searchValue
				},
				PageIndex: this.currentPage,
				PageSize: this.pageSize,
				OrderBy: "CreateTime",
				SortCol: "1"
			};
			if (this.searchTimeValue != null && this.searchTimeValue.length > 0) {
				searchPrm.Where.BeginTime = format(this.searchTimeValue[0]);
				searchPrm.Where.EndTime = format(this.searchTimeValue[1]);
			}
			GetRecoveryRuleList(searchPrm).then(ret => {
				if (ret.status === 0) {
					this.cluesTotal = ret.result.Count;
					this.tableData = ret.result.Body;
				}
			})
		},
		//快速搜索
		onSearch() {
			let searchPrm = {
				Where: this.searchValue,
				PageIndex: this.currentPage,
				PageSize: this.pageSize,
				OrderBy: "",
				SortCol: ""
			};
			GetQuickRecoveryRuleList(searchPrm).then(ret => {
				if (ret.status === 0) {
					this.cluesTotal = ret.result.Count;
					this.tableData = ret.result.Body;
				}
			})

		},
		//提交
		submitForm() {
			if (!this.formValite())
				return false;
			else {
				var teamid = "";
				var useid = "";
				if (this.modeltearm.length > 0) {
					var lastIndex = this.modeltearm.length - 1;
					teamid = this.modeltearm[lastIndex];
				}
				if (this.modelUse.length > 0) {
					var lastIndex = this.modelUse.length - 1;
					useid = this.modelUse[lastIndex];
				}

				let tearmPrm = {
					RecoveryGuid: '',
					RecoveryName: this.recoveryName,//分配器名称
					CourseType: this.modelProject, //项目id
					TeamID: teamid,
					ClueType: this.modelclueSatu,
					Recovery: this.stopTime,//停留时间
					IsDeleted: this.isDeleted,//是否有效
					RecoveryAccountID: useid//回收人
				};
				if (this.updateGuid != undefined && this.updateGuid != "") {
					tearmPrm.RecoveryGuid = this.updateGuid;
					this.loading = true;
					EditRecovery(tearmPrm).then(ret => { // 修改规则
						this.loading = false;
						if (ret.status === 0) {
							if (ret.result == true) {
								this.MssageBox('修改成功', 'success');
								this.ClearnAll();
								this.GetDataList();//初始化列表
							}
						}
					}).catch(() => { this.loading = false; });

				}
				else {
					this.loading = true;
					AddRecovery(tearmPrm).then(ret => { // 新增规则
						this.loading = false;
						if (ret.status === 0) {
							if (ret.result == true) {
								this.MssageBox('新增成功', 'success');
								this.ClearnAll();
								this.GetDataList();//初始化列表
							}
						}
					}).catch(() => { this.loading = false; });
				}
			}
		},
		formValite() {
			var regPrice = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			var regNumber = /^\+?[1-9][0-9]*$/;
			if (this.recoveryName == "") {
				this.MssageBox("回收器名称不能为空", "warning");
				return false;
			}
			else if (this.modelProject == "") {
				this.MssageBox("适用项目不能为空", "warning");
				return false;
			}
			else if (this.modeltearm == null || this.modeltearm.length == 0) {
				this.MssageBox("适用团队不能为空", "warning");
				return false;
			}
			else if (this.modelclueSatu == "") {
				this.MssageBox("线索状态不能为空", "warning");
				return false;
			}
			else if (this.stopTime != "" && !regNumber.test(this.stopTime)) {
				this.MssageBox("停留时间必须为大于0的正整数", "warning");
				return false;
			}
			else if (this.modelUse == null || this.modelUse.length == 0) {
				this.MssageBox("回收人不能为空", "warning");
				return false;
			}
			else {
				return true;
			}
		},
		//删除数据
		RemoveData() {
			if (this.updateGuid != undefined && this.updateGuid != "") {
				MessageBox.confirm('确定删除当前数据吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let removePrm = { guid: this.updateGuid, isDeDisable: 1 }; //停用参数
					DeDisableRecovery(removePrm).then(ret => { // 新增规则
						if (ret.status === 0) {
							if (ret.result == true) {
								this.MssageBox('删除成功', 'success');
								this.GetDataList();//初始化列表
								this.ClearnAll();//清空数据
							}
						}
					})

				}).catch(() => {

				});

			}
			else {
				this.MssageBox('请选择要删除的规则', 'warning');
				this.ClearnAll();//清空数据
			}
		},
		MssageBox(msg, typeIco) {
			Message({
				message: msg,
				showClose: true,
				type: typeIco
			});
		},
		//(重新清空)
		ClearnAll() {
			this.updateGuid = "";
			this.recoveryName = '';//回收器名称
			this.modelProject = '';//适用项目
			this.modeltearm = [];//适用团队
			this.modelclueSatu = '',
				this.stopTime = '';//停留时间
			this.isDeleted = 0;//0,有效,1无效
			this.modelUse = [];
			this.modeltearmName = '';
			this.modelUseName = '';
		},
		//点击列表详细信息
		OnRowClickInfo(index) {
			this.ClearnAll();
			var rowModel = index;
			let prmguid = { guid: rowModel.RecoveryGuid };
			var self = this;
			GetRecoveryRuleInfo(prmguid).then(ret => { // 获取城市
				if (ret.status === 0) {
					var ModelData = ret.result;
					self.updateGuid = ModelData.RecoveryGuid;
					self.recoveryName = ModelData.RecoveryName;
					self.modelProject = ModelData.CourseType.toString();
					self.modeltearm = [ModelData.TeamID];
					self.modelclueSatu = ModelData.ClueType;
					self.stopTime = ModelData.Recovery;
					self.isDeleted = ModelData.IsDeleted;
					self.modelUse = [ModelData.RecoveryAccountID];
					self.$refs.treeTearm.setCheckedKeys(self.modeltearm);
					var nodtearm = self.$refs.treeTearm.getCheckedNodes();
					self.$refs.treeUse.setCheckedKeys(self.modelUse);
					var nodeUse = self.$refs.treeUse.getCheckedNodes();
					if (nodtearm != null && nodtearm.length > 0) {
						self.modeltearmName = nodtearm[0].Name;
					}
					if (nodeUse != null) {
						if (nodeUse.length > 0) {
							self.modelUseName = nodeUse[0].Name;
						}
					}
				}
			})

		},
		HideAll() {
			this.isTeamDisplayTree = false;
			this.isOneDisplayTree = false;
		},
		DisplayTearmTree() {
			this.isTeamDisplayTree = true;
		},
		treeTearmChange(data, node, selfNode) {
			if (node != null) {
				this.modeltearm = [data.Id.replace("Dept_", "")];
				this.modeltearmName = data.Name;
			}
		},
		DisplayOneTree() {
			this.isOneDisplayTree = true;
		},
		treeOneChange(data) {
			this.modelUse = [data.Id];
			this.modelUseName = data.Name;
			var childData = data.ChildrenList;
			if (childData == null) {
				this.isOneDisplayTree = false;
			}
		},
		renderContent(h, { node, data, store }) {
			return (
				<span>
					<span>
						<span>{node.label}</span>
					</span>
				</span>
			);
			if (node.checked) {
				this.modeltearmName = node.Name;
			}
		},
		selectChange() {
			this.GetDataList();
		},

	},
	mounted: function() {
		interestedProject().then(ret => { // 项目和感兴趣的项目接口
			if (ret.status === 0) {
				this.optionProject = ret.result;
			}
		});
		GetClueTypeEnumList().then(ret => { // 项目和感兴趣的项目接口
			if (ret.status === 0) {
				this.ClueList = ret.result;
			}
		});
		GetDataTypeEnumList().then(ret => { //线索状态（在用,停用）
			if (ret.status === 0) {
				this.OptionStatu = ret.result;
			}
		});
		var userid = "";
		var useModel = localStorage.getItem("CRM_USER_INFO")
		if (useModel != undefined && useModel != null) {
			var usedata = JSON.parse(useModel);
			if (usedata != undefined) {
				userid = usedata.UserId;
			}
		};
		GetOrganizeTree().then(ret => { // 获取团队树
			if (ret.status === 0) {
				this.TearmList = ret.result;
			}
		});
		GetPublicPoolUser({ userId: userid }).then(ret => { // 获取公池账号
			if (ret.status === 0) {
				this.UserList = ret.result;
			}
		});
		this.GetDataList();//初始化列表
	}

}
</script>
