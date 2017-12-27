<template>
	<div id="product-addPack" class="addContent addPack" style="position:relative;bottom: 3px;">
		<div style="text-align: right;padding-bottom: 10px;" v-if="this.ishowProduct">
			<label> 产品包明细</label>
		</div>
		<el-row>
			<el-col :span="this.ishowProduct && '12'">
				<el-form :model="form" ref="form" :rules="rules" style="position:relative;height: 420px;overflow: auto">
					<div style="position:absolute;width:100%;z-index:100;height: 100%;" v-show="this.showsubimt?false:true"></div>
					<el-form-item label="产品包名称" :label-width="formLabelWidth" prop="ProductPackageName">
						<el-input v-model="form.ProductPackageName" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="产品包类型" :label-width="formLabelWidth" prop="TeachingType">
						<el-select v-model="form.TeachingType" filterable placeholder="请选择" auto-complete="off" size="mini">
							<el-option v-for="item in Datafrom.getProductTypeList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="开始日期" :label-width="formLabelWidth" class="Norequired table-11" prop="PPStartDate">
						<el-date-picker v-model="form.PPStartDate" type="date" auto-complete="off" placeholder="开始日期" style="width:100%;">
						</el-date-picker>
					</el-form-item>
					<el-form-item label=" 结束日期" :label-width="formLabelWidth" class="Norequired table-11" prop="PPEndDate">
						<el-date-picker v-model="form.PPEndDate" type="date" auto-complete="off" placeholder="结束时间" style="width:100%;">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="所属模块(职业)" :label-width="formLabelWidth" prop="ProductPackageModule">
						<el-select v-model="form.ProductPackageModule" filterable placeholder="请选择" auto-complete="off" size="mini">
							<el-option v-for="item in this.Datafrom.getProductModuleList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属项目" :label-width="formLabelWidth" prop="CourseType">
						<el-select v-model="form.CourseType" placeholder="请选择" filterable auto-complete="off" size="mini" @change="CourseTypeChange">
							<el-option v-for="item in Datafrom.getProductCourseType" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="所属科目" :label-width="formLabelWidth" prop="CourseSubType" class="Norequired">
						<el-select v-model="form.CourseSubType" filterable placeholder="请选择" auto-complete="off" size="mini">
							<el-option v-for="item in Datafrom.getProductCourseSubType" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="课时" :label-width="formLabelWidth" prop="Period" class="Norequired">
						<el-input v-model="form.Period" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="价格" :label-width="formLabelWidth" prop="SellPrise">
						<el-input v-model="form.SellPrise" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="周期 (月)" :label-width="formLabelWidth" class="Norequired">
						<el-input v-model="form.term" auto-complete="off" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="课程性质" :label-width="formLabelWidth" prop="TeachingPlace">
						<el-select v-model="form.TeachingPlace" filterable placeholder="请选择" size="mini">
							<el-option v-for="item in Datafrom.getTeachingPlace" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="ERP课程码" :label-width="formLabelWidth" prop="erpClassNo">
						<el-input v-model="form.erpClassNo" auto-complete="off" size="mini"></el-input>
					</el-form-item> 
				</el-form>
				<div class="dialog-footer" style="margin-top: 15px">
					<el-button type="primary" @click="onsave" size="small" v-show="this.showsubimt">保存</el-button>
					<el-button type="primary" @click="onsubmit" size="small" v-show="this.showsubimt">保存并启用</el-button>
					<el-button type="primary" @click="oncancel" size="small" v-show="this.showsubimt" style="background:#FAFAFA;border-color:#8C9AAE;color:#96A2AF">关闭</el-button>
				</div>
			</el-col>
			<el-col :span="12" v-if="this.ishowProduct">
				<el-tree :check-strictly="true" :show-checkbox="false" :data="this.Datafrom.GetTree" ref="treeCourse" node-key="ProductID" :props="this.Datafrom.CourseProps" :render-content="renderContent" style="position:relative;width:auto;max-height: 365px;overflow: auto"></el-tree>
			</el-col>
		</el-row>

	</div>
</template>

<style type="text/css">
.addPack .Norequired.table-11 .el-form-item__label{
	padding-left: 11px;
}
.addPack .el-date-editor.el-input.el-date-editor--date {
	font-size: 12px;
}
.el-dialog--small {
	width: 510px;
}

.el-dialog__header {
	padding: 0;
}

.addPack .el-form-item__content {
	line-height: 20px;
}

.addPack .el-input--mini .el-input__inner {
	height: 33px;
}

.addPack .el-form-item__label {
	border: 1px solid #bfcbd9;
	border-right: none;
	padding: 10px 12px 10px 12px;
	text-align: left;
	border-bottom: none;
}

.addPack .el-form-item {
	width: 369px;
}

.addPack .el-form-item:last-of-type {
	border-bottom: 1px solid #bfcbd9;
}

.addPack .el-input__inner {
	border-radius: 0;
	width: 250px;
	border-bottom: none;
}

.addPack .el-form .el-form-item .el-form-item__label {
	font-size: 12px;
	color: #3f444c;
}

.addPack .el-form-item {
	margin-bottom: 0;
}

.dialog-footer {
	text-align: center;
}

.addPack .el-date-editor input {
	height: 33px;
}

.btndetaiDelete i {
	display: inline-block;
	width: 13px;
	height: 13px;
	vertical-align: middle;
}

.Norequired .el-form-item__label {
	padding-left: 20px;
}
</style>
<script type="text/javascript">
import Vue from 'vue';
import { Message } from 'element-ui';
import {
	AddProductPackage, UpdateProductPackage, GetProductPackageByID, GetDictionaryByTypeId, GetDictionaryByParentId, getProductPackageList
	, DeleteProductPackageDetial
} from '../../api/product';
import { format, number2DateTime } from '../../util/util';
import { CRM_USER_INFO } from '../../util/keys';
import { mapState } from 'vuex';

export default {
	props: ['postProductPackageID', 'self', 'modal', 'showsubimt', 'searchprm', 'isShowSearch', 'selectRow'],
	name: 'addContentPack',
	data() {
		return {
			form: {
				ProductPackageID: "",
				ProductPackageName: "",
				ProductPackageNo: "",
				ProductPackageModule: "",
				PPStartDate: "",
				PPEndDate: "",
				TeachingType: "",
				TeachingPlace: "",//课程性质
				TeachingPalceCode: "",
				CourseType: "",
				CourseSubType: "",
				Period: "",
				SellPrise: "",
				OnlySell: "",
				ProductStatus: "",
				CreatBy: "",
				UserAgreementID: 1,
				term: '',
				erpClassNo:''
			},
			Datafrom: {
				getProductTypeList: [],//产品类型
				getProductModuleList: [],//所属模块
				getProductCourseSubType: [],//所属课程
				getProductCourseType: [],//所属项目
				getTeachingPlace: [],//课程性质
				GetTree: [],//获取课程树来源
				CourseProps: { //课程字段属性
					value: 'ProductID',
					label: 'ProductName',
					children: 'ChildrenList'
				},
			},
			propList: {

			},
			rules: {
				ProductPackageName: [
					{ required: true, message: '课程产品包名称不能为空', trigger: 'blur' }
				],
				TeachingType: [
					{ required: true, message: '产品包类型不能为空', trigger: 'change' }
				],
				//   PPStartDate:[
				//     {type: 'datetime',required: true,message:'开始时间不能为空',trigger: 'change'}
				//   ],
				//   PPEndDate:[
				//     {type: 'datetime',required: true,message:'结束时间不能为空',trigger: 'change'}
				//   ],
				PPStartDate: [
					{ required: true, message: '', trigger: 'change' }
				],
				PPEndDate: [
					{ required: true, message: '', trigger: 'change' }
				],
				ProductPackageModule: [
					{ required: true, message: '所属模块不能为空', trigger: 'change' }
				],
				CourseType: [
					{ required: true, message: '所属项目不能为空', trigger: 'change' }
				],
				//   CourseSubType:[
				//     {required: true,message:'所属课程不能为空',trigger: 'change'}
				//   ],
				//   Period:[
				//     {required: true,message:'课时不能为空',trigger: 'blur'},
				//   ],
				SellPrise: [
					{ required: true, message: '价格不能为空', trigger: 'blur' },
				],
				TeachingPlace: [
					{ required: true, message: '课程性质不能为空', trigger: 'change' }
				],
			},
			formLabelWidth: '120px',
			ishowProduct: false,


		}
	},
	computed: {
	},
	methods: {
		//保存并上架
		onsubmit() {
			this.subitProduct(true);
		},
		oncancel() {
			//关闭弹层
			this.modal.close();
		},
		//保存
		onsave(param) {
			this.subitProduct(false);
		},
		subitProduct(shelves) {
			if (!this.formValite())
				return false;
			else {
				let subimtPrm = this.form;
				var startpan = Date.parse(subimtPrm.PPStartDate);
				var endpan = Date.parse(subimtPrm.PPEndDate);
				subimtPrm.PPStartDate = number2DateTime(startpan, "yyyy-MM-dd HH:mm:ss");
				subimtPrm.PPEndDate = number2DateTime(endpan, "yyyy-MM-dd HH:mm:ss");
				if (shelves == true) {
					subimtPrm.ProductStatus = 1000281;
				}
				else {
					//点保存新增的时候
					if (this.postProductPackageID == "" || this.postProductPackageID == undefined) {
						subimtPrm.ProductStatus = 1000280;
					}

				}
				//保存并提交
				if (this.postProductPackageID != undefined && this.postProductPackageID != "") {
					//修改产品
					subimtPrm.ProductPackageID = this.postProductPackageID;
					UpdateProductPackage(subimtPrm).then(ret => { // 项目和感兴趣的项目接口
						if (ret.status === 0) {
							this.MssageBox('修改产品包成功', 'success');
							this.InitDataList();
							this.oncancel();
							//初始化刷新数据

						}
					});
				}
				else {
					subimtPrm.OnlySell = 1;
					subimtPrm.UserAgreementID = 1;
					//新增产品
					AddProductPackage(subimtPrm).then(ret => { // 项目和感兴趣的项目接口
						if (ret.status === 0) {
							this.MssageBox('添加产品包成功', 'success');
							this.InitDataList();
							this.oncancel();
						}
					});
				}


			}

		},
		formValite() {
			var model = this.form;
			var regPrice = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			var regNumber = /^\+?[1-9][0-9]*$/;
			if (model.ProductPackageName == "") {
				this.MssageBox("课程产品包名称不能为空", "warning");
				return false;
			}
			else if (model.TeachingType == "") {
				this.MssageBox("产品包类型不能为空", "warning");
				return false;
			}
			else if(model.PPStartDate==undefined||model.PPStartDate=="") 
			{
				this.MssageBox("开始时间不能为空","warning");
				return false;
			}
			else if(model.PPEndDate==undefined||model.PPEndDate=="")  
			{
				this.MssageBox("结束时间不能为空","warning");
				return false;
			}
			else if (model.ProductPackageModule == "") {
				this.MssageBox("所属模块不能为空", "warning");
				return false;
			}
			else if (model.CourseType == "") {
				this.MssageBox("所属项目不能为空", "warning");
				return false;
			}
			// else if(model.CourseSubType=="")
			// {
			// 	this.MssageBox("所属课程不能为空","warning");
			// 	return false;
			// }
			// else if(model.Period=="")
			// {
			// 	this.MssageBox("课时不能为空","warning");
			// 	return false;
			// }
			else if (model.Period != "" && !regNumber.test(model.Period)) {
				this.MssageBox("课时必须为大于0的正整数", "warning");
				return false;
			}
			else if (model.SellPrise == ""||model.SellPrise=="0") {
				this.MssageBox("价格不能为空", "warning");
				return false;
			}
			else if (!regPrice.test(model.SellPrise)) {
				this.MssageBox("价格不能出现非法字符", "warning");
				return false;
			}
			else if (model.term != "" && !regNumber.test(model.term)) {
				this.MssageBox("周期必须为大于0的正整数", "warning");
				return false;
			}
			else if (model.TeachingPlace == "") {
				this.MssageBox("课程性质不能为空", "warning");
				return false;
			}
			else {
				return true;
			}
		},
		//项目触发事件
		CourseTypeChange() {
			this.form.CourseSubType = "";
			//获取所属课程
			GetDictionaryByParentId({ parentId: this.form.CourseType }).then(ret => {
				if (ret.status === 0) {
					this.Datafrom.getProductCourseSubType = ret.result;
				}
			});
		},
		//刷新列表
		InitDataList() {
			if (!this.isShowSearch)
				this.searchprm.Where.ProductStatus = '';
			getProductPackageList(this.searchprm).then(ret => {
				if (ret.status === 0) {
					this.self.$store.state.product.productPackageList = ret.result.Body;
				}
			});

		},
		//重置
		resetForm() {
			this.$refs["ruleFormProduct"].resetFields();
		},
		showTree() {
			if (this.postProductPackageID != undefined && this.postProductPackageID != '') {
				return true;
			}
			else {
				return false;
			}
		},
		MssageBox(msg, typeIco) {
			Message({
				message: msg,
				type: typeIco
			});
		},
		//隐藏图标
		visibleIcon() {
			var productAddpack = document.getElementById("product-addPack");
			var icoList = productAddpack.getElementsByClassName("el-input__icon");
			if (icoList != undefined && icoList.length > 0) {
				for (var i = 0; i < icoList.length; i++) {
					if (this.showsubimt == false) {
						icoList[i].style.display = "none";
					}
					else {
						icoList[i].style.display = "block";
					}
				}
			}
		},
		renderContent(h, { node, data, store }) {
			if (node != null && node.data != null) {
				var nodedata = node.data;
				if (this.showsubimt) {
					if (node.level == 1) {
						return (
							<span>
								<span>
									<span>{nodedata.ProductName}</span>
								</span>
								<span style="padding: 0 10px;">
									<el-button size="mini" class="btndetaiDelete" on-click={() => this.removeItem(store, data)}>
										<i class="el-icon-delete"></i>删除
							</el-button>
								</span>
							</span>
						);
					}
					else {
						return (
							<span>
								<span>
									<span>{nodedata.ProductName}</span>
								</span>
							</span>
						);
					}
				}
				else {
					return (
						<span>
							<span>
								<span>{nodedata.ProductName}</span>
							</span>
						</span>
					);
				}

			}
		},
		removeItem(index, data) {
			if (this.postProductPackageID != undefined && this.postProductPackageID != "") {
				if (this.selectRow != null && this.selectRow.ProductStatus != 1000281) {
					if (data != null && data.PPID != undefined && data.PPID != "") {
						DeleteProductPackageDetial({ PPDIDList: [data.PPID] }).then(ret => {
							if (ret.status === 0) {
								this.MssageBox("删除成功", "success");
								this.refinsh();
							}
						});
					}
				}
				else {
					this.MssageBox("该课程包已启用!不能删除", "warning");
				}

			}
		},
		refinsh() {
			GetProductPackageByID({ ProductPackageID: this.postProductPackageID }).then(ret => {
				if (ret.status === 0) {
					this.Datafrom.GetTree = [];
					for (var i = 0; i < ret.result.ChildrenList.length; i++) {
						if (ret.result.ChildrenList[i] != null) {
							this.Datafrom.GetTree.push(ret.result.ChildrenList[i]);
						}
					}
				}
			});
		}
	},
	mounted() {
		this.visibleIcon();
		GetDictionaryByTypeId({ dicType: 10032 }).then(ret => { // 获取产品类型
			if (ret.status === 0) {
				this.Datafrom.getProductTypeList = ret.result;
			}
		});
		GetDictionaryByTypeId({ dicType: 10033 }).then(ret => { // 获取产品模块
			if (ret.status === 0) {
				this.Datafrom.getProductModuleList = ret.result;
			}
		});
		GetDictionaryByTypeId({ dicType: 10034 }).then(ret => { // 获取课程性质
			if (ret.status === 0) {
				this.Datafrom.getTeachingPlace = ret.result;
			}
		});
		GetDictionaryByTypeId({ dicType: 1602 }).then(ret => { // 获取所属项目
			if (ret.status === 0) {
				this.Datafrom.getProductCourseType = ret.result;
			}
		});
		if (this.postProductPackageID != undefined && this.postProductPackageID != null && this.postProductPackageID != "") {

			GetProductPackageByID({ ProductPackageID: this.postProductPackageID }).then(ret => {
				if (ret.status === 0) {
					var result = ret.result;
					this.form.ProductPackageName = result.ProductPackageName;
					this.form.ProductPackageNo = result.ProductPackageNo;
					this.form.TeachingType = result.TeachingType.toString();
					this.form.PPStartDate = result.PPStartDate;
					this.form.PPEndDate = result.PPEndDate;
					this.form.ProductPackageModule = result.ProductPackageModule.toString();
					this.form.CourseType = result.CourseType.toString();
					setTimeout(() => {
						this.CourseTypeChange()
						this.form.CourseSubType = result.CourseSubType.toString();
					}, 100);
					this.form.Period = result.Period;
					this.form.SellPrise = result.SellPrise;
					this.form.TeachingPlace = result.TeachingPlace.toString();
					this.form.term = result.term;
					this.form.ProductStatus = result.ProductStatus;
					this.Datafrom.GetTree = [];
					for (var i = 0; i < result.ChildrenList.length; i++) {
						if (result.ChildrenList[i] != null) {
							this.Datafrom.GetTree.push(result.ChildrenList[i]);
						}
					}
					this.ishowProduct = true;
					this.form.erpClassNo=result.erpClassNo;
					// if(result.ChildrenList.length>0)
					// {
					//    this.ishowProduct=true;
					// }
					// else{
					//     this.ishowProduct=false;
					// }
				}
			});
		}
		else {
			this.ishowProduct = false;
		}


	}

}
</script>