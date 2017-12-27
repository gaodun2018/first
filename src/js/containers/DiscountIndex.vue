<template>
	<div>
		<div class="content-tabs discouct-index">
			<div class="module-clues-content">
				<el-row>
					<el-col :span="17">
						<div class="clues-bnt-item" style="font-size: 0">
							<el-select v-model="searchDiscountType" filterable clearable size='small' style="width:165px;margin-right: 10px" placeholder="选择优惠类型" @change="RefreshDate">
								<el-option v-for="item in OptionTypeList" :key="item.Id" :label="item.Name" :value="item.Id">
								</el-option>
							</el-select>
							<el-select v-model="searchCourseType" filterable clearable size='small' style="width:165px;margin-right: 10px" placeholder="选择项目" @change="RefreshDate">
								<el-option v-for="item in OptionCourseTypeList" :key="item.Id" :label="item.Name" :value="item.Id">
								</el-option>
							</el-select>
							<el-select v-model="searchStatus" filterable clearable size='small' style="width:165px;margin-right: 10px" placeholder="选择状态" @change="RefreshDate">
								<el-option v-for="item in OptionStatusList" :key="item.Id" :label="item.Name" :value="item.Id">
								</el-option>
							</el-select>
							<el-date-picker type="daterange" v-model="searchTime" clearable placeholder="选择起始日期" size="small" style="width: 190px;margin-right: 10px" @change="RefreshDate">
							</el-date-picker>
						</div>
					</el-col>
					<el-col :span="7">
						<div class="clues-search" style="margin-top: 3px;">
							<el-input v-model="searchName" size="small" style='width: 265px' placeholder="根据优惠名称模糊搜索">
								<el-button slot="append" icon="search" @click="searchNameList"></el-button>
							</el-input>
						</div>
					</el-col>
				</el-row>
				<div>
					<div>
						<el-button v-if="unlocking('Discount_Add')" class="addNewuserIcon" style="width: 70px;position: relative;top: 4px" @click="getAdd">
							<span style="position: relative;top: -2px">
								<i></i>
								<span>新增</span>
							</span>
						</el-button>
						<el-button v-if="unlocking('Discount_Disabled')" @click="deleteProduct" :disabled="disbtnEable" v-bind:class="{['btnOption undisable']:!disbtnEable,['is-disabled btnOption']:disbtnEable}" style="font-size: 12px">
							<i class="el-icon-delete"></i>停用</el-button>
					</div>
				</div>
				<div>
					<div class="clues-table producttable" style="margin-top: 15px;">
						<el-table v-loading="loading" :row-class-name="tableRowClassName" tooltip-effect="dark" :data="this.$store.state.product.GetAllProductDiscountList" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%">
							<el-table-column width='40' type='selection'>
							</el-table-column>
							<el-table-column prop="DiscountName" width="140" fixed label="优惠名称">
							</el-table-column>
							<el-table-column prop="CourseTypeName" width="140" label="所属项目">
							</el-table-column>
							<el-table-column prop="DiscountTypeName" label="优惠类型" width="110">
							</el-table-column>
							<el-table-column prop="DiscountWaysName" label="优惠方式" width="130">
							</el-table-column>
							<el-table-column prop="DiscountValue" label="优惠" width="80">
							</el-table-column>
							<el-table-column prop="StartTime" width="200" label="起止时间" :formatter="TimeFormat">
							</el-table-column>
							<el-table-column prop="StatusName" label="状态">
							</el-table-column>
							<el-table-column prop="CreaterName" label="创建人">
							</el-table-column>
							<el-table-column prop="Create_Time" width="175" label="创建时间">
							</el-table-column>
							<el-table-column prop="date" label="操作" fixed="right" align="center" width="120px" v-if="unlocking(['Discount_Update', 'Discount_Disabled'])">
								<template scope="scope">
									<el-button type="text" v-if="unlocking('Discount_Update')" @click="handleEdit(scope.$index, scope.row)" size="small">修改</el-button>
									<el-button type="text" v-if="unlocking('Discount_Disabled')" @click="handleDelete(scope.$index, scope.row)" size="small">{{scope.row.Status=="1001121"?"启用":"停用"}}</el-button>
								</template>
							</el-table-column>
						</el-table>
						<div style="text-align: right; margin-top: 15px">
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
.searchItem {
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 10px 5px 15px 10px;
	margin-top: 20px;
}


.btnOption {
	height: 28px;
	padding-top: 6px;
	text-align: center;
	width: 70px;
	padding-left: 12px;
}

.discouct-index .undisable {
	background: white !important;
	color: #49a1f6 !important;
	border-color: #49a1f6;
}

.discouct-index .btnOption i {
	margin-right: 3px;
}

.discouct-index .is-disabled {
	background-color: #eef1f6 !important;
	color: #bfcbd9 !important;
	border-color: #d1dbe5;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import cluesModal from 'vueModal';
import { GetProductDiscountList, GetDictionaryByTypeId, VagueSeachDiscountList, DeleteDiscount, UpdateDiscountStatus } from '../api/product';
import { format, number2DateTime } from '../util/util';
import { MessageBox } from 'element-ui';
export default {
	name: 'crm-product-discount',
	data() {
		return {
			searchName: '',
			searchCourseType: '',//搜索项目
			searchDiscountType: '',//类型
			searchStatus: "1001120",//状态
			searchTime: '',//起始时间
			currentPage: 1,
			pageSize: 10,
			pageSizes: [10, 15, 30, 50],
			isShowSearch: false,
			labelPosition: 'right',
			selectIdList: [],//列表勾选中的集合
			OptionTypeList: [],
			OptionCourseTypeList: [],
			OptionStatusList: [],
			disbtnEable: true,
			totalLength: 0
		}
	},
	events: {

	},
	methods: {

		tableRowClassName(row, index) { // 选中列表行高亮显示
			for (let i = 0; i < this.selectIdList.length; i++) {
				if (row.ID === this.selectIdList[i].ID) {
					return 'positive-row';
				}
			}
			if (row.ID === this.ID) {
				return 'positive-row';
			}
			return '';
		},
		TimeFormat: function(modelData) {
			if (modelData != null) {
				// var datapanStart = Date.parse(modelData.StartTime);
				// var datapanEnd = Date.parse(modelData.EndTime);
				// var timesatrt = number2DateTime(datapanStart, "yyyy-MM-dd");
				// var timeto = number2DateTime(datapanEnd, "yyyy-MM-dd");
				// return timesatrt + "至" + timeto;
				// //return modelData.StartTime+"至"+modelData.EndTime;
				return modelData.strStartTime + "至" + modelData.strEndTime;
			}
			else {
				return "";
			}

		},
		//新增弹出窗口
		getAdd() {
			let searchPrm = {
				"Where": {
					"StartTime": '',
					"EndTime": '',
					"DiscountType": this.searchDiscountType,//优惠类型
					"CourseType": this.searchCourseType,//项目类型
					"DiscountWays": 0,             //优惠方式
					"DiscountValue": 0,           //优惠值
					"Status": this.searchStatus,  //优惠状态
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy": 'ID',
				"SortCol": "1"
			};
			if (this.searchTime != null && this.searchTime.length > 0) {
				searchPrm.Where.StartTime = format(searchTime[0]);
				searchPrm.Where.EndTime = format(searchTime[1]);
			}
			require.ensure([], (require) => {
				let AddContent = require("../components/product/AddDiscount.vue");
				cluesModal.openComponent(AddContent, {
					title: '新增优惠',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					width: 160,
					showsubimt: true,
					searchPrm: searchPrm,
					isShowSearch: this.isShowSearch,
					postProductId: '',
				});
			}, 'createDiscount');

		},
		deleteProduct() {
			//根据ID删除课程			
			var _arr = this.selectIdList;
			var idArr = [];
			for (var i = 0; i < _arr.length; i++) {
				idArr.push(_arr[i].ID)
			};
			if (idArr.length > 0) {
				MessageBox.confirm('确定要停用当前选中的优惠吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var str = idArr.join(",");
					UpdateDiscountStatus({ IDs: [str], status: '1001121' }).then(ret => {
						if (ret.status == 0) {
							this.MssageBox('设置成功', 'success');
							this.RefreshDate();
						}
					});
				});
			}
		},
		handleEdit(index, row) {
			require.ensure([], (require) => {
				let AddDiscount = require("../components/product/AddDiscount.vue");
				cluesModal.openComponent(AddDiscount, {
					title: '优惠修改',
					showCancelButton: false,
					showConfirmButton: false,
					self: this,
					selectRow: row,
					//searchPrm:searchPrm,//普通搜索条件
					showsubimt: true
				}).then((modal) => {
				});
			}, 'createDiscount');
			this.RefreshDate();
		},
		//单行删除
		handleDelete(index, row) {
			let disstatus = row.Status;
			let msg = "";
			if (disstatus == "1001120")//当前状态：启用
			{
				disstatus = "1001121";//停用
				msg = '确定要停用当前优惠吗';
			}
			else {
				disstatus = "1001120";//启用
				msg = '确定要启用当前优惠吗';
			}

			MessageBox.confirm(msg, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				UpdateDiscountStatus({ IDs: [row.ID], status: disstatus }).then(ret => {
					if (ret.status == 0) {
						this.MssageBox('设置成功', 'success');
						this.RefreshDate();
					}
				});
			});

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
			if (val != undefined && val.length > 0) {
				this.disbtnEable = false;
				this.selectIdList = val;
			}
			else {
				this.disbtnEable = true;
				this.selectIdList = [];
			}

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
					"StartTime": '',
					"EndTime": '',
					"DiscountType": this.searchDiscountType,//优惠类型
					"CourseType": this.searchCourseType,//项目类型
					"DiscountWays": 0,             //优惠方式
					"DiscountValue": 0,           //优惠值
					"Status": this.searchStatus,  //优惠状态"
					"SearchKey": this.searchName//模糊查询
				},
				"PageIndex": this.currentPage,
				"PageSize": this.pageSize,
				"OrderBy": 'ID',
				"SortCol": "1"
			};
			if (this.searchTime != null && this.searchTime.length > 0) {
				searchPrm.Where.StartTime = format(this.searchTime[0]);
				searchPrm.Where.EndTime = format(this.searchTime[1]);
			}
			// this.$store.dispatch('GetProductDiscountListData',searchPrm); 
			GetProductDiscountList(searchPrm).then(ret => {
				if (ret.status == 0) {
					this.$store.state.product.GetAllProductDiscountList = ret.result.Body;
					this.totalLength = ret.result.Count;
				}
			});
		},
		searchNameList() {
			this.searchDiscountType = "";
			this.searchCourseType = "";
			this.searchStatus = "";
			this.searchTime = null;
			this.RefreshDate();
			// let searchPrm = {
			// 	"Where": { SearchKey: this.searchName },
			// 	"PageIndex": this.currentPage,
			// 	"PageSize": this.pageSize,
			// 	"OrderBy": 'ID',
			// 	"SortCol": "1"
			// };
			// VagueSeachDiscountList(searchPrm).then(ret => {
			// 	if (ret.status == 0) {
			// 		this.$store.state.product.GetAllProductDiscountList = ret.result.Body;
			// 		this.totalLength = ret.result.Count;
			// 	}
			// });
		},
		GetDictiondata(keyVule) {
			GetDictionaryByTypeId({ dicType: keyVule }).then(ret => {
				if (ret.status === 0) {
					if (keyVule == "1602")
						this.OptionCourseTypeList = ret.result;
					if (keyVule == "10046")
						this.OptionTypeList = ret.result;
					if (keyVule == "10047") {
						this.OptionStatusList = ret.result;
					}

				}
			});
		},
	},
	computed: {
		// ...mapState({
		// 	totalLength: state => state.product.totalLength
		// }),
	},
	mounted() {
		this.GetDictiondata(1602);
		this.GetDictiondata(10046);
		this.GetDictiondata(10047);
		//初始化刷新数据
		this.RefreshDate();
	}
}
</script>