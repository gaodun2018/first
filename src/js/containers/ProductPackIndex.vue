<template>
	<div>
		<div class="content-tabs product-pack-index-style">
			<div class="module-clues-content">
				<div class="clues-content-label" style="padding-bottom: 20px">
					<div>
						<el-row>
							<el-col :span="12" style="font-size: 0">
								<el-button v-if="unlocking('CP_Package_Add')" style="width: 70px;position: relative;top:2px; margin-right: 0px;" class="addNewuserIcon" @click="getAdd">
									<span style="position: relative;bottom: 3px;color:#49a1f6">
										<i></i>
										<span>新增</span>
									</span>
								</el-button>
								<el-button v-if="unlocking('CP_EnabledProductPackage')" @click="GetUp" :disabled="disbtnEable" v-bind:class="{['btnOption undisable']:!disbtnEable,['is-disabled btnOption']:disbtnEable}">
									<i class="el-icon-upload2"></i>启用</el-button>
								<el-button v-if="unlocking('CP_DisabledProductPackage')" @click="GetStop" v-bind:class="{['btnOption undisable btnpackStop']:!disbtnEable,['is-disabled btnpackStop btnOption']:disbtnEable}" :disabled="disbtnEable">
									<i v-bind:class="{'icoStop':disbtnEable,'icoUnStop':!disbtnEable}"></i>停用</el-button>
								<el-button v-if="unlocking('CP_DeleteProductPackage')" @click="deleteProduct" :disabled="disbtnEable" v-bind:class="{['btnOption undisable']:!disbtnEable,['is-disabled btnOption']:disbtnEable}">
									<i class="el-icon-delete"></i>删除</el-button>
							</el-col>
							<el-col :span="12" class="FR">
								<div class="FR">
									<el-input style="width: 210px;margin-right: 5px" placeholder="根据课程名称模糊搜索" v-model="searchProductPackageName" size="small">
                                    	<el-button slot="append" icon="search" @click="handleIconClick"></el-button>
                                	</el-input>
									<el-button type="text" @click="isShowSearch=!isShowSearch">
										{{!isShowSearch ? '高级搜索' : '快捷搜索'}}
									</el-button>
								</div>
							</el-col>
						</el-row>
					</div>
					<div>
						<el-collapse-transition>
							<el-form  v-if="isShowSearch" ref="ruleForm" :model="ruleForm" :label-position="labelPosition">
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
												<el-input v-model="ruleForm.searchSellPrise" class="el-input el-input--mini" style="width:86px" auto-complete="off"></el-input>
												<span style="width:9px">至</span>
												<el-input v-model="ruleForm.searchToSellPrise" class="el-input el-input--mini" style="width:87px" auto-complete="off"></el-input>
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
										<el-button style="width:70px" size="small" type="primary" @click="handleIconClick">查询</el-button>
										<el-button style="width: 70px" type="primary" size="small" class="collapse-query" @click="onReset('ruleForm')">清除条件</el-button>
									</el-row>
								</div>
							</el-form>
						</el-collapse-transition>
					</div>
					<div class="main-table producttable" style="margin-top: 14px;">
						<el-table :data="this.$store.state.product.productPackageList" border v-loading.body="loading" ref="multipleTable" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" style="width: 100%">
							<el-table-column min-width='40' type='selection' align="left">
							</el-table-column>
							<el-table-column prop="ProductPackageNo" label="课程包编号" min-width="160">
							</el-table-column>
							<el-table-column prop="ProductPackageName" min-width="140" fixed label="课程包名称">
							</el-table-column>
							<el-table-column prop="TeachingTypeName" label="课程包类型" min-width="140">
							</el-table-column>
							<el-table-column prop="SellPrise" min-width="125"  label="价格">
							</el-table-column>
							<el-table-column prop="Period" min-width="110"  label="课时">
							</el-table-column>
							<el-table-column prop="PPStartDate" label="起止时间" min-width="125" :formatter="TimeFormat">
							</el-table-column>
							<el-table-column prop="CourseTypeName" label="所属项目" min-width="120">
							</el-table-column>
							<el-table-column prop="CourseSubTypeName" label="所属科目" min-width="140">
							</el-table-column>
							<el-table-column prop="ProductStatusName" min-width="115" label="状态">
							</el-table-column>
							<el-table-column prop="erpClassNo" min-width="110" label="ERP课程码">
							</el-table-column>
							<el-table-column prop="CreaterName" min-width="125" label="创建人">
							</el-table-column>
							<el-table-column prop="CreatTime" label="创建时间" min-width="115">
							</el-table-column>
							<el-table-column prop="date" label="操作" align="center" min-width="180" fixed="right">
								<template scope="scope">
									<el-button v-if="unlocking('CP_Package_Edit')" type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
									<el-button  type="text" size="small" @click="handleDelete(scope.$index, scope.row)">详情</el-button>
									<el-button v-if="unlocking('CP_AddProductPackage')" type="text" size="small" @click="takeProduct(scope.$index, scope.row)">添加明细</el-button>
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
		<product-package></product-package>
	</div>
</template>
<style>
.product-pack-index-style .producttable>.el-table__header-wrapper table .el-table td,
.producttable>.el-table th {
	padding: 0;
}

.top-menu {
	height: 30px;
}

.top-menu .el-input {
	width: 285px;
	float: right;
}

.top-menu .tips {
	float: right;
	height: 30px;
	margin-left: 15px;
	font-size: 14px;
	margin-bottom: 20px;
}

.main-table .table-tip {
	color: #2DA0FF;
	margin: 0 3px;
	position: relative;
	left: 1px;
	top: -1px;
}

.block {
	width: 100%;
	height: 32px;
	margin-top: 20px;
}

.el-pagination {
	float: right;
}

.block .pageoption {
	float: right;
	width: 150px;
	height: 32px;
	line-height: 32px;
	padding-left: 20px;
}

.block .pageoption span {
	color: #2DA0FF;
	cursor: default;
}

.block .pageoption b {
	font-weight: normal;
	margin-left: 35px;
}

.searchItem {
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 10px 20px;
	margin-top: 20px;
}

.searchItem .el-form-item {
	margin-bottom: 12px;
}

.shortSpan>.el-form-item__label {
	width: 68px !important;
}

.producttable .el-checkbox__inner {
	width: 14px;
	height: 14px;
}

.btnpackStop {
	letter-spacing: normal;
	word-spacing: normal;
	text-transform: none;
	text-indent: 0px;
	text-shadow: none;
	display: inline-block;
}

.btnpackStop i {
	display: inline-block;
	width: 13px;
	height: 13px;
	vertical-align: middle;
}

.icoStop {
	background: url('./../../images/product/stop1.png') no-repeat;
}

.searchItem .el-input--mini .el-input__inner {
	height: 30px;
}

.product-pack-index-style .btnOption {
	height: 28px;
	padding-top: 7px;
	text-align: center;
	width: 70px;
	padding-left: 12px;
	font-size: 12px;
}

.product-pack-index-style .btnOption i {
	margin-right: 3px;
}

.product-pack-index-style .seachKey input {
	height: 32px;
}

.product-pack-index-style .is-disabled {
	background-color: #eef1f6 !important;
	color: #bfcbd9 !important;
	border-color: #d1dbe5;
}

.product-pack-index-style .undisable {
	background: white !important;
	color: #49a1f6 !important;
	border-color: #49a1f6;
}

.product-pack-index-style .icoUnStop {
	background: url('./../../images/product/stop2.png') no-repeat;
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
			searchProductPackageName: '',
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

			selectPackList: [],

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
                if (row.ProductPackageNo === this.multipleSelection[i].ProductPackageNo) {
                    return 'positive-row';
                }
            }
            return '';
        },

		TimeFormat: function(modelData) {
			if (modelData != null) {
				//    var datapanStart=Date.parse(modelData.PPStartDate);
				//    var datapanEnd=Date.parse(modelData.PPEndDate);
				//    var timesatrt=number2DateTime(datapanStart,"yyyy-MM-dd");
				//    var timeto=number2DateTime(datapanEnd,"yyyy-MM-dd");
				//    return timesatrt+"至"+timeto;
				return modelData.strPPStartDate + "至" + modelData.strPPEndDate;
			}
			else {
				return "";
			}

		},
		//新增弹出窗口
		getAdd() {
			let searchprm = {
				Where: {
					ProductPackageName: this.searchProductPackageName,
					TeachingType: this.ruleForm.searchProductType,
					TeachingPlace: this.ruleForm.searchTeachingPlace,
					CourseType: this.ruleForm.searchCourseType,
					CourseSubType: this.ruleForm.searchCourseSubType,
					FromSellPrise: this.ruleForm.searchSellPrise,
					ToSellPrise: this.ruleForm.searchToSellPrise,
					ProductStatus: this.ruleForm.searchProductStatus
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy": "CreatTime",
				"SortCol": "1"
			};
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddContentPack.vue");
				cluesModal.openComponent(AddContent, {
					title: '课程包新增',
					showCancelButton: false,
					showConfirmButton: false,
					width: '411px',
					self: this,
					showsubimt: true,
					searchprm: searchprm,
					isShowSearch: this.isShowSearch,
					postProductPackageID: '',
					callback: (flag, self) => {

					}
				}).then((modal) => {
				});
			}, 'addContent');

		},
		//启用
		GetUp() {
			var prm = this.updataStatuList(1000281);
			if (prm.ProductList != undefined && prm.ProductList.length > 0) {
				this.$confirm('确定要启用当前课程包吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('UpdateProductPackageStatu', prm);
					setTimeout(() => {
						this.RefreshData();
					}, 100);
				});
			}
		},
		//禁用
		GetStop() {
			var prm = this.updataStatuList(1000282);
			if (prm.ProductList != undefined && prm.ProductList.length > 0) {
				this.$confirm('确定要禁用当前课程包吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('UpdateProductPackageStatu', prm);
					setTimeout(() => {
						this.RefreshData();
					}, 100);
				});
			}
		},
		//调入课程包
		takeProduct(index, row) {
			if (row != undefined && row != null) {
				let searchprm = {
					Where: {
						ProductPackageName: this.searchProductPackageName,
						TeachingType: this.ruleForm.searchProductType,
						TeachingPlace: this.ruleForm.searchTeachingPlace,
						CourseType: this.ruleForm.searchCourseType,
						CourseSubType: this.ruleForm.searchCourseSubType,
						FromSellPrise: this.ruleForm.searchSellPrise,
						ToSellPrise: this.ruleForm.searchToSellPrise,
						ProductStatus: this.ruleForm.searchProductStatus
					},
					"PageIndex": this.currentPage,
					"PageSize": this.pageSize,
					"OrderBy": "CreatTime",
					"SortCol": "1"
				};
				require.ensure([], (require) => {
					let ProductPackage = require("../components/product/FindPackge.vue");
					cluesModal.openComponent(ProductPackage, {
						title: '添加明细',
						height: '600px',
						width: '900px',
						showCancelButton: false,
						showConfirmButton: false,
						showFullScreenButton: true,
						self: this,
						parentPack: row,
						searchprm: searchprm,
						isShowSearch: this.isShowSearch,
						callback: (flag, self) => {

						}
					}).then((modal) => {
					})
				}, 'productPackage')
			}
			else {
				this.$message({
					message: '请选择一个课程',
					type: 'warning'
				});
			}
		},
		//搜索
		handleIconClick(ev) {
			this.RefreshData();
		},
		//删除课程包
		deleteProduct() {
			var _arr = this.selectPackList;
			var idArr = [];
			for (var i = 0; i < _arr.length; i++) {
				idArr.push(_arr[i].ProductPackageID)

			};
			if (idArr.length > 0) {
				this.$confirm('确定要删除当前课程包吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var str = idArr.join(",");
					this.$store.dispatch('DeleteProductPackage', { "ProductPackageIDList": str })
					//刷新数据
					setTimeout(() => {
						this.RefreshData();
					}, 100)
				});
			} else {
				this.$message({
					message: '你还未选择任何课程包',
					type: 'warning'
				});
			}
		},
		handleEdit(index, row) {
			let searchprm = {
				Where: {
					ProductPackageName: this.searchProductPackageName,
					TeachingType: this.ruleForm.searchProductType,
					TeachingPlace: this.ruleForm.searchTeachingPlace,
					CourseType: this.ruleForm.searchCourseType,
					CourseSubType: this.ruleForm.searchCourseSubType,
					FromSellPrise: this.ruleForm.searchSellPrise,
					ToSellPrise: this.ruleForm.searchToSellPrise,
					ProductStatus: this.ruleForm.searchProductStatus
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy": "CreatTime",
				"SortCol": "1"
			};
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddContentPack.vue");
				cluesModal.openComponent(AddContent, {
					title: '课程包修改',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					height: '550px',
					width: '800px',
					searchprm: searchprm,
					postProductPackageID: row.ProductPackageID,
					selectRow: row,
					isShowSearch: this.isShowSearch,
					showsubimt: true
				}).then((modal) => {
				});
			}, 'addContentPack');
		},
		//详情
		handleDelete(index, row) {
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddContentPack.vue");
				cluesModal.openComponent(AddContent, {
					title: '课程包详情',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					height: '500px',
					width: '800px',
					postProductPackageID: row.ProductPackageID,
					showsubimt: false
				}).then((modal) => {
				});
			}, 'addContent');
		},
		//table-select选择事件
		handleSelectionChange(val) {
			this.multipleSelection = val;
			if (val != undefined && val.length > 0) {
				this.selectPackList = val;
				this.disbtnEable = false;
			}
			else {
				this.selectPackList = [];
				this.disbtnEable = true;
			}

		},
		//修改每页数量
		handleSizeChange(val) {
			//console.log(`每页 ${val} 条`)
			this.pageSize = val;
			this.RefreshData();

		},
		//跳页
		handleCurrentChange(val) {
			//console.log(`当前页: ${val}`)
			this.currentPage = val;
			this.RefreshData()

		},
		//启用禁用参数
		updataStatuList(enbleStatu) {
			let prdouctListIDprm = {
				ProductList: []
			};
			var checkarrr = this.selectPackList;
			if (checkarrr != undefined && checkarrr.length > 0) {
				for (var i = 0; i < checkarrr.length; i++) {
					prdouctListIDprm.ProductList.push({
						ID: checkarrr[i].ProductPackageID,
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
		RefreshData() {
			let searchprm = {
				Where: {
					ProductPackageName: this.searchProductPackageName,
					TeachingType: this.ruleForm.searchProductType,
					TeachingPlace: this.ruleForm.searchTeachingPlace,
					CourseType: this.ruleForm.searchCourseType,
					CourseSubType: this.ruleForm.searchCourseSubType,
					FromSellPrise: this.ruleForm.searchSellPrise,
					ToSellPrise: this.ruleForm.searchToSellPrise,
					ProductStatus: this.ruleForm.searchProductStatus,
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy": "CreatTime",
				"SortCol": "1"
			};
			if (!this.isShowSearch) {
				searchprm.Where.ProductStatus = '';
			}
			var str = JSON.stringify(searchprm);
			//初始化刷新数据
			this.$store.dispatch('getProductPackageList', searchprm)
		},
		MssageBox(msg, typeIco) {
			Message({
				message: msg,
				type: typeIco
			});
		},

	},
	computed: {
		...mapState({
			totalLength: state => state.product.totalLength,
		}),
	},
	mounted() {
		//初始化刷新数据
		this.RefreshData();
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