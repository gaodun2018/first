<template>
	<div>
		<div class="content-tabs product-index-style">
			<div class="module-clues-content">
				<div class="clues-content-label" style="padding-bottom: 21px">
					<div>
						<el-row>
							<el-col :span="12" style="font-size: 0">
								<el-button v-if="unlocking('CP_AddProduct')" style="width: 70px;position: relative;top:3px; margin-right: 0px;" class="addNewuserIcon" @click="getAdd">
									<span style="position: relative;bottom: 3px;color:#49a1f6">
										<i></i>
										<span>新增</span>
									</span>
								</el-button>
								<el-button v-if="unlocking('CP_EnabledProduct')" @click="GetUp" :disabled="disbtnEable" v-bind:class="{['btnOption undisable']:!disbtnEable,['is-disabled btnOption']:disbtnEable}">
									<i class="el-icon-upload2"></i>启用</el-button>
								<el-button v-if="unlocking('CP_DisabledProduct')" @click="GetStop" v-bind:class="{['btnOption undisable btnproduct']:!disbtnEable,['is-disabled btnproduct btnOption']:disbtnEable}" :disabled="disbtnEable">
									<i v-bind:class="{'icoStop':disbtnEable,'icoUnStop':!disbtnEable}"></i>停用</el-button>
								<el-button v-if="unlocking('CP_DeleteProduct')" @click="deleteProduct" :disabled="disbtnEable" v-bind:class="{['btnOption undisable']:!disbtnEable,['is-disabled btnOption']:disbtnEable}">
									<i class="el-icon-delete"></i>删除</el-button>
								<el-button v-if="unlocking('CP_ImportProductPackage')" @click="takeProduct" v-bind:class="{['btnOption undisable btnproduct']:!disbtnEable,['is-disabled btnproduct btnOption']:disbtnEable}" :disabled="disbtnEable" style="padding-left:7px;width:104px;">
									<i v-bind:class="{'icoUnTaker':disbtnEable,'icoTaker':!disbtnEable}"></i>调入课程包</el-button>
							</el-col>
							<el-col class="FR" :span="12">
								<div class="FR">
									<el-input style="width: 210px;margin-right: 5px" placeholder="根据课程名称模糊搜索" v-model="searchProductName" size="small">
                                    	<el-button slot="append" icon="search" @click="handleIconClick"></el-button>
                                	</el-input>
									<el-button type="text" class="tips" @click="isShowSearch=!isShowSearch">
										{{!isShowSearch ? '高级搜索' : '快捷搜索'}}
									</el-button>
								</div>
							</el-col>

						</el-row>
					</div>
					<div>
						<el-collapse-transition>
							<el-form v-if="isShowSearch" ref="ruleForm" :model="ruleForm" :label-position="labelPosition">
								<div class="searchItem">
									<el-row>
										<el-col :sm="8">
											<el-form-item prop="searchCourseType" label="项目" class="shortSpan">
												<el-select v-model="ruleForm.searchCourseType" clearable filterable size='small' style="width:195px" placeholder="请选择" @change="onCourseTypeChange">
													<el-option v-for="item in this.$store.state.product.getProductCourseType" :key="item.Id" :label="item.Name" :value="item.Id">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :sm="8">
											<el-form-item prop="searchCourseSubType" label="所属科目" class="shortSpan">
												<el-select v-model="ruleForm.searchCourseSubType" clearable filterable size='small' style="width:195px" placeholder="请选择">
													<el-option v-for="item in this.$store.state.product.getProductCourseSubType" :key="item.Id" :label="item.Name" :value="item.Id">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :sm="8">
											<el-form-item prop="searchProductType" label="课程类型">
												<el-select v-model="ruleForm.searchProductType" clearable filterable size='small' style="width:195px" placeholder="请选择">
													<el-option v-for="item in this.$store.state.product.getProductTypeList" :key="item.Id" :label="item.Name" :value="item.Id">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row>
										<el-col :sm="8">
											<el-form-item prop="searchTeachingPlace" label="课程性质">
												<el-select v-model="ruleForm.searchTeachingPlace" clearable filterable size='small' style="width:195px" placeholder="请选择">
													<el-option v-for="item in this.$store.state.product.getTeachingPlace" :key="item.Id" :label="item.Name" :value="item.Id">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :sm="8">
											<el-form-item prop="searchSellPrise" label="课程价格">
												<el-input v-model="ruleForm.searchSellPrise" class="el-input el-input--mini" style="width:86px;" auto-complete="off"></el-input>
												<span style="width:9px">至</span>
												<el-input v-model="ruleForm.searchToSellPrise" class="el-input el-input--mini" style="width:87px;" auto-complete="off"></el-input>
											</el-form-item>
										</el-col>
										<el-col :sm="8">
											<el-form-item prop="searchProductStatus" label="状态" class="shortSpan">
												<el-select v-model="ruleForm.searchProductStatus" clearable filterable size='small' style="width:195px" placeholder="请选择">
													<el-option v-for="item in this.$store.state.product.getProductStatu" :key="item.Id" :label="item.Name" :value="item.Id">
													</el-option>
												</el-select>
											</el-form-item>
										</el-col>
									</el-row>
									<el-row style="text-align:right">
										<el-col>
											<el-button style="width:70px" size="small" type="primary" @click="handleIconClick">查询</el-button>
											<el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('ruleForm')">清除条件</el-button>
										</el-col>
									</el-row>
								</div>
							</el-form>
						</el-collapse-transition>
					</div>
					<div class="clues-table producttable" style="margin-top: 14px;">
						<el-table border :row-class-name="tableRowClassName" :data="this.$store.state.product.tabledata" ref="multipleTable" v-loading="loading" @selection-change="handleSelectionChange" style="width: 100%">
							<el-table-column min-width='40' type='selection'>
							</el-table-column>
							<el-table-column prop="ProductName" min-width="140" fixed label="课程名称">
							</el-table-column>
							<el-table-column prop="ProductNo" label="课程编号" min-width="160">
							</el-table-column>
							<el-table-column prop="TeachingTypeName" min-width="140" label="课程类型">
							</el-table-column>
							<el-table-column prop="SellPrise" min-width="125" label="价格">
							</el-table-column>
							<el-table-column prop="Period" min-width="110" label="课时">
							</el-table-column>
							<el-table-column prop="PStartDate" min-width="125" label="起止时间" :formatter="TimeFormat">
							</el-table-column>
							<el-table-column prop="CourseTypeName" label="所属项目" min-width="120">
							</el-table-column>
							<el-table-column prop="CourseSubTypeName" label="所属科目" min-width="140">
							</el-table-column>
							<el-table-column prop="ProductStatusName" min-width="110" label="状态">
							</el-table-column>
							<el-table-column prop="erpClassNo" min-width="110" label="ERP课程码">
							</el-table-column>
							<el-table-column prop="CreaterName" min-width="125" label="创建人">
							</el-table-column>
							<el-table-column prop="CreatTime" min-width="115" label="创建时间">
							</el-table-column>
							<el-table-column prop="date" align="center" label="操作" fixed="right" min-width="120px">
								<template scope="scope">
									<el-button v-if="unlocking('CP_Edit')" type="text" @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
									<el-button type="text" @click="handleDelete(scope.$index, scope.row)" size="small">详情</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalLength">
							</el-pagination>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.product-index-style .top-menu {
	height: 30px;
}


.product-index-style .top-menu .el-input {
	width: 285px;
	float: right;
}

.product-index-style .top-menu .tips {
	float: right;
	height: 30px;
	margin-left: 15px;
	font-size: 14px;
	margin-bottom: 20px;
}

.product-index-style .main-table .table-tip {
	color: #2DA0FF;
	margin: 0 3px;
	position: relative;
	left: 1px;
	top: -1px;
}

.product-index-style .block {
	width: 100%;
	height: 32px;
	margin-top: 20px;
}

.product-index-style .el-pagination {
	float: right;
}

.product-index-style .block .pageoption {
	float: right;
	width: 150px;
	height: 32px;
	line-height: 32px;
	padding-left: 20px;
}

.product-index-style .block .pageoption span {
	color: #2DA0FF;
	cursor: default;
}

.product-index-style .block .pageoption b {
	font-weight: normal;
	margin-left: 35px;
}

.product-index-style .searchItem {
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 10px 20px;
	margin-top: 20px;
}

.product-index-style .searchItem .el-form-item {
	margin-bottom: 10px;
}

.product-index-style .shortSpan>.el-form-item__label {
	width: 68px !important;
}

.product-index-style .producttable .el-checkbox__inner {
	width: 14px;
	height: 14px;
}

.product-index-style .btnproduct i {
	display: inline-block;
	width: 13px;
	height: 16px;
	vertical-align: middle;
}

.product-index-style .icoStop {
	background: url('./../../images/product/stop.png') no-repeat;
	margin-right: 3px;
}

.product-index-style .icoUnStop {
	background: url('./../../images/product/stop2.png') no-repeat;
}

.product-index-style .icoUnTaker {
	background: url('./../../images/product/takeProduct.png') no-repeat;
	background-size: 13px 13px;
	margin-right: 3px;
}

.product-index-style .icoTaker {
	background: url('./../../images/product/takeProduct2.png') no-repeat;
	background-size: 13px 13px;
	margin-right: 3px;
}

.product-index-style .searchItem .el-input--mini .el-input__inner {
	height: 30px;
}

.product-index-style .btnOption {
	height: 28px;
	padding-top: 7px;
	text-align: center;
	width: 70px;
	padding-left: 12px;
	font-size: 12px;
}

.product-index-style .btnOption i {
	margin-right: 3px;
}

.product-index-style .is-disabled {
	background-color: #eef1f6 !important;
	color: #bfcbd9 !important;
	border-color: #d1dbe5;
}

.product-index-style .is-disabled:hover {
	cursor: not-allowed;
}

.product-index-style .seachKey input {
	height: 32px;
}

.product-index-style .undisable {
	background: white !important;
	color: #49a1f6 !important;
	border-color: #49a1f6;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import cluesModal from 'vueModal';
import { format, number2DateTime } from '../util/util';

export default {
	name: 'crm-product-index',
	data() {
		return {
			multipleSelection: [],
			searchProductName: '',
			ruleForm: {
				searchCourseType: '',//搜索项目
				searchCourseSubType: '',//搜索课程
				searchProductType: '',//课程类型
				searchTeachingPlace: '',//课程性质
				searchSellPrise: '',//课程价格
				searchToSellPrise: '',//课程价格
				searchProductStatus: "",	
			},
			currentPage: 1,
			pageSize: 10,
			pageSizes: [10, 15, 30, 50],
			isShowSearch: false,
			labelPosition: 'right',
			loading: false,
			selectProductList: [],
			disbtnEable: true

		}
	},
	events: {

	},
	methods: {
		onReset(formName) { // 重置
            this.$refs[formName].resetFields();
			this.ruleForm.searchToSellPrise = '';
        },

		tableRowClassName(row, index) { // 选中列表行高亮显示
			for (let i = 0; i < this.multipleSelection.length; i++) {
				if (row.ProductID === this.multipleSelection[i].ProductID) {
					return 'positive-row';
				}
			}
			return '';
		},

		TimeFormat: function(modelData) {
			if (modelData != null) {
				// var datapanStart = Date.parse(modelData.PStartDate);
				// var datapanEnd = Date.parse(modelData.PEndDate);
				// var timesatrt = number2DateTime(datapanStart, "yyyy-MM-dd");
				// var timeto = number2DateTime(datapanEnd, "yyyy-MM-dd");
				// return timesatrt + "至" + timeto;
				return modelData.strPStartDate + "至" + modelData.strPEndDate;
			}
			else {
				return "";
			}

		},
		//新增弹出窗口
		getAdd() {
			let searchPrm = {
				"Where": {
					"ProductName": this.searchProductName,
					"TeachingType": this.ruleForm.searchProductType,
					"TeachingPlace": this.ruleForm.searchTeachingPlace,
					"CourseType": this.ruleForm.searchCourseType,
					"CourseSubType": this.ruleForm.searchCourseSubType,
					"FromSellPrise": this.ruleForm.searchSellPrise,
					"ToSellPrise": this.ruleForm.searchToSellPrise,
					"ProductStatus": this.ruleForm.searchProductStatus
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy":
				"ProductID",
				"SortCol": "1"
			};
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddContent.vue");
				cluesModal.openComponent(AddContent, {
					title: '课程新增',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					showsubimt: true,
					searchPrm: searchPrm,
					isShowSearch: this.isShowSearch,
					postProductId: '',
				});
			}, 'addContent');

		},
		//启用
		GetUp() {
			var prm = this.updataStatuList(1000281);
			if (prm.ProductList != undefined && prm.ProductList.length > 0) {
				this.$confirm('确定要启用当前课程吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('updateProductStatuByID', prm);
					setTimeout(() => {
						this.RefreshDate();
					}, 100);
				});

			}
		},
		//禁用
		GetStop() {
			var prm = this.updataStatuList(1000282);
			if (prm.ProductList != undefined && prm.ProductList.length > 0) {
				this.$confirm('确定要禁用当前课程吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('updateProductStatuByID', prm);
					setTimeout(() => {
						this.RefreshDate();
					}, 100);
				});
			}
		},
		//调入课程包
		takeProduct() {
			let searchPrm = {
				"Where": {
					"ProductName": this.searchProductName,
					"TeachingType": this.ruleForm.searchProductType,
					"TeachingPlace": this.ruleForm.searchTeachingPlace,
					"CourseType": this.ruleForm.searchCourseType,
					"CourseSubType": this.ruleForm.searchCourseSubType,
					"FromSellPrise": this.ruleForm.searchSellPrise,
					"ToSellPrise": this.ruleForm.searchToSellPrise,
					"ProductStatus": this.ruleForm.searchProductStatus
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy":
				"ProductID",
				"SortCol": "1"
			};
			if (this.selectProductList != undefined && this.selectProductList.length > 0) {
				require.ensure([], (require) => {
					let ProductPackage = require("../components/product/ProductPackage.vue");
					cluesModal.openComponent(ProductPackage, {
						title: '调入课程包',
						width: '800px',
						height: '600px',
						showCancelButton: false,
						showConfirmButton: false,
						self: this,
						searchPrm: searchPrm,
						isShowSearch: this.isShowSearch,
						childProductList: this.selectProductList,
						callback: (flag, self) => {

						}
					}).then((modal) => {
					})
				}, 'productPackage')
			}
		},
		//搜索
		handleIconClick(ev) {
			this.RefreshDate();
		},
		deleteProduct() {
			//根据ID删除课程			
			var _arr = this.selectProductList;
			var idArr = [];
			for (var i = 0; i < _arr.length; i++) {
				idArr.push(_arr[i].ProductID)

			};
			if (idArr.length > 0) {
				this.$confirm('确定要删除当前课程吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var str = idArr.join(",");
					this.$store.dispatch('deleteProduct', { "ProductIDList": str })
					//刷新数据
					setTimeout(() => {
						this.RefreshDate();
					}, 100)
				});
			} else {
			this.$message({
					message: '你还未选择任何课程',
					type: 'warning'
				});
			}
		},
		handleEdit(index, row) {
			let searchPrm = {
				"Where": {
					"ProductName": this.searchProductName,
					"TeachingType": this.ruleForm.searchProductType,
					"TeachingPlace": this.ruleForm.searchTeachingPlace,
					"CourseType": this.ruleForm.searchCourseType,
					"CourseSubType": this.ruleForm.searchCourseSubType,
					"FromSellPrise": this.ruleForm.searchSellPrise,
					"ToSellPrise": this.ruleForm.searchToSellPrise,
					"ProductStatus": this.ruleForm.searchProductStatus
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy":
				"ProductID",
				"SortCol": "1"
			};
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddContent.vue");
				cluesModal.openComponent(AddContent, {
					title: '课程修改',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					postProductId: row.ProductID,
					searchPrm: searchPrm,
					isShowSearch: this.isShowSearch,
					showsubimt: true
				}).then((modal) => {
				});
			}, 'addContent');
		},
		//详情
		handleDelete(index, row) {
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddContent.vue");
				cluesModal.openComponent(AddContent, {
					title: '课程详情',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					postProductId: row.ProductID,
					showsubimt: false
				}).then((modal) => {
				});
			}, 'addContent');
		},
		//修改每页数量
		handleSizeChange(val) {
			//console.log(`每页 ${val} 条`)
			this.pageSize = val;
			this.RefreshDate();

		},
		//跳页
		handleCurrentChange(val) {
			//console.log(`当前页: ${val}`)
			this.currentPage = val;
			this.RefreshDate()

		},
		//table-select选择事件
		handleSelectionChange(val) {
			this.multipleSelection = val;

			if (val != undefined && val.length > 0) {
				this.selectProductList = val;
				this.disbtnEable = false;
			}
			else {
				this.selectProductList = [];
				this.disbtnEable = true;
			}

		},
		//启用禁用参数
		updataStatuList(enbleStatu) {
			let prdouctListIDprm = {
				ProductList: []
			};
			var checkarrr = this.selectProductList;
			if (checkarrr != undefined && checkarrr.length > 0) {
				for (var i = 0; i < checkarrr.length; i++) {
					prdouctListIDprm.ProductList.push({
						ID: checkarrr[i].ProductID,
						ProductStatus: enbleStatu
					});
				}
			}
			return prdouctListIDprm;
		},
		onCourseTypeChange() {
			this.ruleForm.searchCourseSubType = "";
			//获取项目
			this.$store.dispatch('GetCouserSubType', { parentId: this.ruleForm.searchCourseType });

		},
		MssageBox(msg, typeIco) {
			Message({
				message: msg,
				type: typeIco
			});
		},
		RefreshDate() {
			let searchPrm = {
				"Where": {
					"ProductName": this.searchProductName,
					"TeachingType": this.ruleForm.searchProductType,
					"TeachingPlace": this.ruleForm.searchTeachingPlace,
					"CourseType": this.ruleForm.searchCourseType,
					"CourseSubType": this.ruleForm.searchCourseSubType,
					"FromSellPrise": this.ruleForm.searchSellPrise,
					"ToSellPrise": this.ruleForm.searchToSellPrise,
					"ProductStatus": this.ruleForm.searchProductStatus
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy":
				"ProductID",
				"SortCol": "1"
			}
			if (!this.isShowSearch) {
				searchPrm.Where.ProductStatus = '';
			}
			this.$store.dispatch('initData', searchPrm);
		}


	},
	computed: {
		...mapState({
			totalLength: state => state.product.totalLength,
			form: state => state.product.form,
		}),
	},
	mounted() {
		//初始化刷新数据
		this.RefreshDate();
		//获取项目
		this.$store.dispatch('GetProductDictionary', { dicType: 1602 })
		//获取课程类型
		this.$store.dispatch('GetProductDictionary', { dicType: 10032 })
		//获取课程性质
		this.$store.dispatch('GetProductDictionary', { dicType: 10034 })
		//获取课程状态
		this.$store.dispatch('GetProductDictionary', { dicType: 10031 });

	}
}
</script>