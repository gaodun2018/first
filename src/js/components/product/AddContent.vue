<template>
	<div class="addContent addPack" id="product-addcontent">
		<el-form :model="form" ref="form" :rules="rules" style="position:relative">
			<div style="position:absolute;width:100%;z-index:100;height: 100%;" v-show="this.showsubimt?false:true"></div>
			<el-form-item label="课程产品名称" :label-width="formLabelWidth" prop="ProductName">
				<el-input v-model="form.ProductName" auto-complete="off" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="课程产品代码" :label-width="formLabelWidth" v-show="false">
				<el-input v-model="form.ProductNo" auto-complete="off" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="产品类型" :label-width="formLabelWidth" prop="TeachingType">
				<el-select v-model="form.TeachingType" filterable placeholder="请选择" auto-complete="off" size="mini">
					<el-option v-for="item in Datafrom.getProductTypeList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="开始日期" :label-width="formLabelWidth" class="Norequired table-11"  prop="PStartDate">
				<el-date-picker v-model="form.PStartDate" prop="PStartDate" type="date" auto-complete="off" placeholder="开始日期" style="width:100%;">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="结束日期" :label-width="formLabelWidth" class="Norequired table-11"  prop="PEndDate">
				<el-date-picker v-model="form.PEndDate" prop="PEndDate" type="date" auto-complete="off" placeholder="结束时间" style="width:100%;">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="所属模块(职业)" :label-width="formLabelWidth" prop="ProductModule">
				<el-select v-model="form.ProductModule" filterable placeholder="请选择" auto-complete="off" size="mini">
					<el-option v-for="item in this.Datafrom.getProductModuleList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属项目" :label-width="formLabelWidth" prop="CourseType">
				<el-select v-model="form.CourseType" filterable placeholder="请选择" auto-complete="off" size="mini" @change="CourseTypeChange">
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
				<el-input v-model="form.term" auto-complete="on" style=" width:30px" size="mini"></el-input>
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
		<div class="dialog-footer" style="padding-top: 15px">
			<el-button type="primary" @click="subitProduct('form',false)" size="small" v-show="this.showsubimt">保存</el-button>
			<el-button type="primary" @click="subitProduct('form',true)" size="small" v-show="this.showsubimt">保存并启用</el-button>
			<el-button type="primary" @click="oncancel" size="small" style="background:#FAFAFA;border-color:#8C9AAE;color:#96A2AF" v-show="this.showsubimt">关闭</el-button>
		</div>
	</div>
</template>
<style type="text/css">
.addPack .Norequired.table-11 .el-form-item__label{
	padding-left: 11px;
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

.addContent .el-form .el-form-item .el-form-item__label {
	font-size: 12px;
	color: #3f444c;
}

.addContent .el-form-item {
	margin-bottom: 0;
}

.dialog-footer {
	text-align: center;
}

.addPack .el-date-editor input {
	height: 33px;
}

.Norequired .el-form-item__label {
	padding-left: 20px;
}
</style>
<script type="text/javascript">
import Vue from 'vue';
import { Message } from 'element-ui';
import { interestedProject, addProduct, updateProductByMoudule, GetProductInfoByID, GetDictionaryByTypeId, GetDictionaryByParentId, getData } from '../../api/product';
import { format, number2DateTime } from '../../util/util';
import { mapState } from 'vuex';

export default {
	props: ['postProductId', 'self', 'modal', 'showsubimt', 'searchPrm', 'isShowSearch'],
	data() {
		var validateSellPrise = (rule, value, callback) => {
			var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			if (!reg.test(value)) {
				callback(new Error('价格不能输入非法字符'));
			}
			else {
				callback();
			}
		};
		var validatePeriod = (rule, value, callback) => {
			var reg = /^\+?[1-9][0-9]*$/;
			if (!reg.test(value)) {
				callback(new Error('课时必须为大于0的正整数'));
			}
			else {
				callback();
			}
		};
		return {
			form: {
				ProductID: "",
				ProductName: "",
				ProductNo: "",
				ProductModule: "",
				PStartDate: "",
				PEndDate: "",
				TeachingType: "",
				TeachingPlace: "",//课程性质
				TeachingPlaceCode: "",
				CourseType: "",
				CourseSubType: "",
				Period: "",
				SellPrise: "",
				OnlySell: "",
				ProductStatus: "",
				CreatBy: "",
				UserAgreementID: 1,
				term: '',
				erpClassNo:'',
			},
			Datafrom: {
				getProductTypeList: [],//产品类型
				getProductModuleList: [],//所属模块
				getProductCourseSubType: [],//所属课程
				getProductCourseType: [],//所属项目
				getTeachingPlace: [],//课程性质
			},
			propList: {

			},
			formLabelWidth: '120px',
			rules: {
				ProductName: [
					{ required: true, message: '', trigger: 'blur' }
				],
				TeachingType: [
					{ required: true, message: '', trigger: 'change' }
				],
				ProductModule: [
					{ required: true, message: '', trigger: 'change' }
				],
				CourseType: [
					{ required: true, message: '', trigger: 'change' }
				],
				PStartDate: [
					{ required: true, message: '', trigger: 'change' }
				],
				PEndDate: [
					{ required: true, message: '', trigger: 'change' }
				],
				//   CourseSubType:[
				//     {required: true,message:'',trigger: 'change'}
				//   ],
				//   Period:[
				//     {required: true,message:'',trigger: 'blur'},
				//     {validator:validatePeriod,trigger: 'blur'}
				//   ],
				SellPrise: [
					{ required: true, message: '', trigger: 'blur' },
					{ validator: validateSellPrise, trigger: 'blur' }
				],
				TeachingPlace: [
					{ required: true, message: '', trigger: 'change' }
				],
			}

		}
	},
	computed: {
	},
	methods: {
		oncancel() {
			//关闭弹层
			this.modal.close();
		},
		subitProduct(formName, shelves) {
			if (!this.formValite())
				return false;
			else {
				let subimtPrm = this.form;
				var startpan = Date.parse(subimtPrm.PStartDate);
				var endpan = Date.parse(subimtPrm.PEndDate);
				subimtPrm.PStartDate = number2DateTime(startpan, "yyyy-MM-dd HH:mm:ss");
				subimtPrm.PEndDate = number2DateTime(endpan, "yyyy-MM-dd HH:mm:ss");
				if (shelves == true) {
					subimtPrm.ProductStatus = 1000281;
				}
				else {
					//点保存新增的时候
					if (this.postProductId == "" || this.postProductId == undefined) {
						subimtPrm.ProductStatus = 1000280;
					}

				}
				//保存并提交
				if (this.postProductId != undefined && this.postProductId != "") {
					//修改产品
					subimtPrm.ProductID = this.postProductId;
					updateProductByMoudule(subimtPrm).then(ret => { // 项目和感兴趣的项目接口
						if (ret.status === 0) {
							this.MssageBox('修改产品成功', 'success');
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
					addProduct(subimtPrm).then(ret => { // 项目和感兴趣的项目接口
						if (ret.status === 0) {
							this.MssageBox('添加产品成功', 'success');
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
			if (model.ProductName == "") {
				this.MssageBox("课程产品名称不能为空", "warning");
				return false;
			}
			else if (model.TeachingType == "") {
				this.MssageBox("产品类型不能为空", "warning");
				return false;
			}
				else if(model.PStartDate==undefined||model.PStartDate=="")
				{
					this.MssageBox("开始日期不能为空","warning");
					return false;
				}
			    else if(model.PEndDate==undefined||model.PEndDate=="")
				{
					this.MssageBox("结束日期不能为空","warning");
					return false;
				}
			else if (model.ProductModule == "") {
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
				this.MssageBox("价格必须大于0", "warning");
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
			if (!this.isShowSearch) {

				this.searchPrm.Where.ProductStatus = '';

			}
			getData(this.searchPrm).then(ret => {
				if (ret.status === 0) {
					this.self.$store.state.product.tabledata = ret.result.Body;
				}
			});

		},
		//重置
		resetForm() {
			this.$refs["ruleFormProduct"].resetFields();
		},
		MssageBox(msg, typeIco) {
			Message({
				message: msg,
				type: typeIco
			});
		},
		//隐藏图标
		visibleIcon() {
			var productAddcontent = document.getElementById('product-addcontent');
			var icoList = productAddcontent.getElementsByClassName("el-input__icon");
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
				if (ret.result != undefined && ret.result != null)
					this.Datafrom.getTeachingPlace = ret.result;
			}
		});
		GetDictionaryByTypeId({ dicType: 1602 }).then(ret => { // 获取所属项目
			if (ret.status === 0) {
				this.Datafrom.getProductCourseType = ret.result;
			}
		});
		if (this.postProductId != undefined && this.postProductId != null && this.postProductId != "") {
			GetProductInfoByID({ ProductID: this.postProductId }).then(ret => {
				if (ret.status === 0) {
					var result = ret.result;
					this.form.ProductName = result.ProductName;
					this.form.ProductNo = result.ProductNo;
					this.form.TeachingType = result.TeachingType.toString();
					this.form.PStartDate = result.PStartDate;
					this.form.PEndDate = result.PEndDate;
					this.form.ProductModule = result.ProductModule.toString();
					this.form.CourseType = result.CourseType.toString();
					setTimeout(() => {
						this.CourseTypeChange()
						this.form.CourseSubType = result.CourseSubType.toString();
					}, 100);
					this.form.Period = result.Period;
					this.form.term = result.term;
					this.form.SellPrise = result.SellPrise;
					this.form.TeachingPlace = result.TeachingPlace.toString();
					this.form.ProductStatus = result.ProductStatus;
					this.form.erpClassNo=result.erpClassNo;
				}
			});
		}


	}

}
</script>