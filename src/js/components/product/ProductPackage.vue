<template>
	<div>
		<div class="productPackage">
			<div class="main-content">
				<el-row>
					<el-col :span="6">
						<div class="left-content">
							<div style="height:30px;padding-top: 10px;">已选课程</div>
							<ul>
								<li v-for="(item,index) in this.childProductList" :key="index">
									<div class="product-package-icon" style="background-position-y: 1px">
										<span style="padding-left: 20px;display: inline-block">{{item.ProductName}}</span>
									</div>
								</li>
							</ul>
						</div>
					</el-col>
					<el-col :span="18">
						<div class="right-content">
							<el-row class="right-top">
								<el-col :span="12">
									<div>选择课程包</div>
								</el-col>
								<el-col :span="12">
									<div style="text-align: right">
										<el-input style="width: 200px;margin-right: 5px" placeholder="搜索课程包" v-model="searchKey" size="small">
                                    		<el-button slot="append" icon="search" @click="handleIconClick"></el-button>
                                		</el-input>
									</div>
								</el-col>
							</el-row>
							<div class="right-table rightPack">
								<el-table v-loading="loading" border :data="this.rightList" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" style="width: 100%" height="250">
									<el-table-column width='40' type='selection'>
									</el-table-column>
									<el-table-column prop="ProductPackageName" fixed width="140" label="名称">
										<template scope="scope">
											<div class="product-package-icon">
												<span style="padding-left: 20px;display: inline-block">{{scope.row.ProductPackageName}}</span>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="TeachingTypeName" label="类型" width="110">
									</el-table-column>
									<el-table-column prop="SellPrise" label="价格" width="80">
									</el-table-column>
									<el-table-column prop="Period" label="课时" width="80">
									</el-table-column>
									<el-table-column prop="PPStartDate" label="起止时间" :formatter="TimeTopFormat" width="125">
									</el-table-column>
									<el-table-column prop="CourseTypeName" label="所属项目" width="100">
									</el-table-column>
									<el-table-column prop="CourseSubTypeName" label="所属科目" width="100">
									</el-table-column>
									<el-table-column prop="ProductStatusName" width="90" label="状态">
									</el-table-column>
									<el-table-column prop="erpClassNo" min-width="110" label="ERP课程码">
									</el-table-column>
									<el-table-column prop="CreaterName" width="115" label="创建人">
									</el-table-column>
									<el-table-column prop="CreatTime" label="创建时间" width="115">
									</el-table-column>
								</el-table>
							</div>
							<div class="right-button">
								<el-button type="primary" @click="selectToBottom" icon="arrow-down"></el-button>
								<el-button type="primary" @click="selectToUp" icon="arrow-up"></el-button>
							</div>
							<ul class="bottom-lists">
								<el-checkbox-group v-model="checkedLists" @change="handleBottomChecked" ref="pullcheckList">
									<el-checkbox v-for="item in bottomLists" :label="item.ProductPackageID" :key="item.ProductPackageID" class="checkSet">
										<div class="product-package-icon" style="display: inline-block">
											<span style="padding-left: 20px;display: inline-block">{{item.ProductPackageName}}</span>
										</div>
									</el-checkbox>
								</el-checkbox-group>
							</ul>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<div style="width:100%;text-align: right" class="dialog-footer">
							<el-button type="primary" @click="onsave" size="small">保存</el-button>
							<el-button type="primary" @click="oncancel" size="small" style="background:#FAFAFA;border-color:#8C9AAE;color:#96A2AF">取消</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>

	</div>
</template>
<style>
ul,
li {
	list-style: none;
}

.productPackage .el-dialog--small {
	width: 680px;
	height: 650px;
	margin: 0 auto;
}

.productPackage .dialog-footer {
	text-align: center;
	padding-top: 13px;
}

.left-content {
	width: 100%;
	float: left;
}

.left-content P {
	text-align: left;
	width: 210px;
	height: 30px;
	margin-bottom: 10px;
}

.left-content ul {
	width: 90%;
	height: 400px;
	overflow: auto;
	padding: 10px 5px;
	border: 1px solid #E4E9EC;
}

.left-content ul li {
	margin-bottom: 10px;
	cursor: default;
}

.left-content ul li span {
	margin-left: 8px;
}

.classicon {
	width: 19px;
	height: 19px;
	display: block;
	float: left;
	background: url(../../../images/product/class.png) no-repeat center;
}

.right-content {
	width: 100%;
	float: right;
}

.right-content .right-top {
	height: 30px;
	line-height: 30px;
	margin-bottom: 10px;
}

.right-content .right-top .el-input {
	height: 30px;
	width: 200px;
}

.right-content .right-top .el-input__inner {
	height: 30px;
	width: 200px;
}
.right-content .right-table {
	width: 100%;
	margin-bottom: 10px;
}

.right-button {
	text-align: center;
	height: 30px;
	margin-bottom: 10px;
}

.right-button .el-button {
	width: 25px;
	height: 28px;
	padding: 0;
}

.bottom-lists {
	width: 100%;
	height: 110px;
	padding-top: 10px;
	border: 1px solid #E4E9EC;
	overflow-y: scroll;
	overflow-x: hidden;
}

.bottom-lists li {
	margin-bottom: 12px;
}

.bottom-lists li span {
	margin-left: 7px;
}

.el-dialog__header {
	height: 30px;
	line-height: 30px;
	padding: 0;
	background: #5a81b8;
}

.el-dialog__title {
	line-height: 1;
	font-size: 12px;
	font-weight: 100;
	margin-left: 15px;
	color: #fff;
}

.el-dialog__footer {
	text-align: center;
}

.rightPack .el-checkbox__inner {
	width: 14px;
	height: 14px;
}

.icopackage {
	background: url('../../../images/order/product-package.png') no-repeat;
	margin-right: 3px;
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: middle;
}

.checkSet {
	width: 100%;
	margin-left: 15px;
}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { Dialog, Transfer, Button, Checkbox, CheckboxGroup } from 'element-ui';
import { getData, AddBatchProductPackageDetial, GetTuningProductPackageList } from '../../api/product';
import { Message } from 'element-ui';
import { format, number2DateTime } from '../../util/util';
Vue.use(Dialog)
Vue.use(Transfer)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
export default {
	props: ['self', 'modal', 'searchPrm', 'childProductList'],
	data() {
		return {
			loading: false,
			bottomLists: [],
			custonDate: [],
			selectLists: [],
			checkedLists: [],
			uncheckedLists: [],
			rightList: [],
			searchKey: ''
		}
	},
	computed: {
		...mapState({
			// productShow: state => { // 弹出框
			// 	return state.product.productShow
			// },
			tabledata: state => { // 弹出框
				return state.product.tabledata
			},
			takePackageList: state => state.product.takePackageList
		}),

	},
	methods: {
		TimeTopFormat: function(modelData) {
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
		//向下穿梭
		selectToBottom() {
			var _lists = this.selectLists
			//this.bottomLists = [];
			//this.checkedLists=[];
			for (var i = 0; i < _lists.length; i++) {
				if (this.checkedLists.indexOf(_lists[i].ProductPackageID) > -1) {

				}
				else {
					this.bottomLists.push(_lists[i])
					this.checkedLists.push(_lists[i].ProductPackageID);//穿梭后自动选中
				}
			}
			if (this.checkedLists.length > 0) {
				this.uncheckedLists = this.bottomLists;
			}
		},
		//向上穿梭
		selectToUp() {
			if (this.checkedLists.length > 0) {
				var arr = [];
				for (var i = 0; i < this.bottomLists.length; i++) {
					if (this.checkedLists.indexOf(this.bottomLists[i].ProductPackageID) > -1) {
					}
					else {
						arr.push(this.bottomLists[i]);
					}

				}
				this.bottomLists = arr;//重新绑定
				this.checkedLists = [];
				//重新选中
				for (var j = 0; j < this.bottomLists.length; j++) {
					this.checkedLists.push(this.bottomLists[j].ProductPackageID);
				}
			}
			else {
				this.uncheckedLists = [];
			}
		},
		handleIconClick() {
			this.RightInitData();
		},
		tableRowClassName(row, index) { // 选中列表行高亮显示
			for (let i = 0; i < this.selectLists.length; i++) {
				if (row.ProductPackageID === this.selectLists[i].ProductPackageID) {
					return 'positive-row';
				}
			}
			return '';
		},
		handleSelectionChange(val) {
			this.selectLists = val
		},
		handleBottomChecked(arr) {
			var bottomarr = this.bottomLists
			var resarr = []
			function removeByValue(arr, val) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i] == val) {
						arr.splice(i, 1);
						break;
					}
				}
			}
			for (var i = 0; i < bottomarr.length; i++) {
				if (arr.indexOf(bottomarr[i]) > -1) {

				} else {
					resarr.push(bottomarr[i])
				}
			};
			this.uncheckedLists = resarr;
		},
		//调入课程包
		onsave() {

			if (this.checkedLists != undefined && this.checkedLists.length == 0) {
				this.uncheckedLists = [];
			}
			var packData = this.uncheckedLists;
			var productIdData = this.childProductList;
			var packIdList = [];
			var productIdList = [];
			if (packData != undefined && packData.length > 0) {
				for (var i = 0; i < packData.length; i++) {
					if (packData[i].ProductStatus == 1000283)//判断课程包状态是否是启用状态
					{
						this.MssageBox('课程包名-' + packData[i].ProductPackageName + '当前已失效!不能调用课程', 'warning');
						return false;
					}
					else {
						packIdList.push(packData[i].ProductPackageID);
					}
				}
			}
			if (productIdData != undefined && productIdData != []) {
				for (var i = 0; i < productIdData.length; i++) {
					if (productIdData[i].ProductStatus == 1000283)//判断课程包状态是否是启用状态
					{
						this.MssageBox('课程名-' + productIdData[i].ProductName + '当前已失效!不能调用', 'warning');
						return false;
					}
					else {
						productIdList.push(productIdData[i].ProductID);
					}
				}

			}
			if (packIdList != undefined && packIdList.length > 0) {
				let prm = {
					"ProductPackageID": packIdList,
					"ProductListID": productIdList,
					"PackageListID": []
				};
				AddBatchProductPackageDetial(prm).then(ret => { // 获取课程模块
					if (ret.status === 0 && ret.result == true) {
						this.MssageBox('调入课程包成功', 'success');
						//this.InitDataList();
						this.oncancel();
					}
				});
			}
			else {
				this.MssageBox('请选择一个课程包', 'warning');
			}
		},
		RightInitData() {
			this.loading = true;
			if (this.childProductList.length > 0) {
				var productSour = [];
				var productDt = this.childProductList;
				var courseTypeList=[];
				for (var i = 0; i < productDt.length; i++) {
					productSour.push(productDt[i].ProductID);
					if(courseTypeList.indexOf(productDt[i].CourseType)<0)
						courseTypeList.push(productDt[i].CourseType);
				}
				GetTuningProductPackageList({ IDList: productSour, ProductType: 1, SearchKey: this.searchKey,CourseTypeList:courseTypeList }).then(ret => {
					if (ret.status === 0) {
						this.loading = false;
						this.rightList = ret.result;
					} else {
						this.loading = false;
					}
				}).catch(() => {
					this.loading = false;
				});

			}
		},
		oncancel() {
			//关闭弹层
			this.modal.close();
		},
		MssageBox(msg, typeIco) {
			Message({
				message: msg,
				type: typeIco
			});
		},
	},
	mounted: function() {
		//	this.self.$store.dispatch("getProductPackageList",{Where:{}})
		this.RightInitData();
	}
};
</script>