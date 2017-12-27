<template>
	<div  style="margin:0;padding:0;padding-right:32px;" class="addDiscount">
		<el-form :model="form"  ref="form" :rules="rules" >
			<el-form-item label="项目" label-width="101px" prop="CourseType">
                <el-select v-model="form.CourseType" clearable  filterable size='small' clearable style="width:318px;" placeholder="选择优惠类型">
                    <el-option v-for="item in CourseTypeList" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                </el-select>
			</el-form-item>
			<el-form-item label="优惠类型" label-width="101px" prop="DiscountType">
                <el-select v-model="form.DiscountType" clearable  size='small' clearable style="width:318px;" placeholder="选择优惠类型">
                    <el-option v-for="item in DiscountTypeList" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                </el-select>
			</el-form-item>
			<el-form-item label="优惠名称" label-width="101px" prop="DiscountName">
			    	<el-input v-model="form.DiscountName"  auto-complete="off" size="mini" style="width:318px" class="inputSet"></el-input>
			</el-form-item>
		  	<el-form-item label="起止时间" label-width="101px"   prop="StartTime" >
                  <el-col :span="11">
                     	 <el-date-picker v-model="form.StartTime"  prop="StartTime"  size='small' type="date" auto-complete="off" placeholder="开始日期" style="width:147px;">
			             </el-date-picker>
                  </el-col>
                  <el-col class="line" :span="1" style="text-align:center;padding-left:2px;">-</el-col>
                  <el-col :span="11">
                        <el-date-picker v-model="form.EndTime" prop="EndTime"   size='small' type="date" auto-complete="off" placeholder="结束日期" style="width:147px; padding-left:2px;">
                        </el-date-picker>
                  </el-col>
			</el-form-item>
			<el-form-item label="优惠方式" label-width="101px"  prop="DiscountWays" style="position:relative;margin-bottom: 0px;">
                    <el-form-item label-width="116px">
                        <el-radio-group v-model="form.DiscountWays"  @change="typeChange">
                                <el-radio v-for="item in DiscountWaysList" :label="item.Id" :key="item.Id" style="padding-right:81px">{{item.Name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>			     
			</el-form-item>            
			<el-form-item label="优惠" label-width="101px" prop="DiscountValue">
			    	<el-input v-model="form.DiscountValue"  auto-complete="off" size="mini" style="width:70px;position:absolute;height:30px;" class="inputSet"></el-input>
                    <span v-show="form.DiscountWays==1001101">
                    <el-label class="IsShowExample"  style="color:red;margin-left:80px;"> <span>示例:优惠九折填写10,九五折填写5</span></el-label>
                    </span>
			</el-form-item>   
		</el-form>
		<div class="dialog-footer" style="text-align: right;">
			<el-button type="primary" size="small"  @click="CreateDiscount" style="width: 63px;background: #42aedf;">保存</el-button>
            <el-button type="primary" @click="oncancel" size="small" style="background:#FAFAFA;border-color:#8C9AAE;color:#96A2AF;width:63px">取消</el-button>
		</div>
	</div>
</template>
<style>
.vitationTb  td{
    border: none;
    height: 28px;
} 
 .vitationTb  .el-table__body{
     width:100% !important;
 }
 .titleClass  .el-input__inner{
         height: 22px;
 }
 .addDiscount  .el-form-item
 {
    margin-bottom: 10px;
 }
 .inputSet input{
   height:30px !important;
 }
</style>
<script type="text/javascript">
import Vue from 'vue';
import { Form, FormItem, DatePicker, Select,Dialog,Option,OptionGroup,Button,Input,Table,TableColumn,} from 'element-ui';
import { Message } from 'element-ui';
import {GetDictionaryByTypeId,AddProductDiscount,UpdateProductDiscount,GetProductDiscountList} from '../../api/product';
import { format,number2DateTime} from '../../util/util';
import { mapState } from 'vuex';
import { CRM_USER_INFO } from '../../util/keys';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
export default {
    name: 'createDiscount',
    props: ['self','modal','selectRow','searchPrm'],
	data(){
        return{
            form:{
                ID:'',
                DiscountName:'',//优惠名称
                CourseType:'',//项目
                DiscountType:'',//优惠类型
                DiscountWays:'1001101',//优惠方式
                DiscountValue:'',//优惠金额
                StartTime:'',//开始时间
                EndTime:'',//结束时间
                Status:'1001120',//状态
            },
            CourseTypeList:[], //项目下拉列表
            DiscountTypeList:[], //优惠类型下拉列表
            DiscountWaysList:[],//优惠方式下拉列表
            formLabelWidth:"100px",
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            rules:{ 
		          DiscountName:[
		            {required: true,message:' ',trigger: 'blur'}
		          ],
				  CourseType:[
		            {required: true,message:' ',trigger: 'change'}
		          ],
				  DiscountType:[
		            {required: true,message:' ',trigger: 'change'}
		          ],
				  DiscountWays:[
		            {required: true,message:' ',trigger: 'change'}
		          ],
				  StartTime:[
		            {required: true,message:' ',trigger: 'change'}
		          ],
				  EndTime:[
		            {required: true,message:' ',trigger: 'change'}
		          ],
				  DiscountValue:[
		            {required: true,message:' ',trigger: 'blur'}
		          ]
                  
           }
        }
    },
    computed: {

	},
    methods: {
        // 
        GetInfo(){
           if(this.selectRow!=undefined&&this.selectRow!=null&&this.selectRow!=''){
                var modelrow=this.selectRow;
                this.form=modelrow;
                this.form.CourseType=modelrow.CourseType.toString();
                this.form.DiscountType=modelrow.DiscountType.toString();
                this.form.DiscountWays=modelrow.DiscountWays.toString();
                //赋值属性

           }
        },
        typeChange(){ 
            if(this.form.DiscountWays=="1001100")
            {
                
            }
            else{
              
            }
        },
        formValite(){
			    var model=this.form;
			    var regPrice= /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
			   	var regNumber =/^\+?[1-9][0-9]*$/;    
			    if(model.CourseType=="")
				{
					this.MssageBox("项目不能为空","warning");
					return false;
				}
			    else if(model.DiscountType=="")
				{
					this.MssageBox("优惠类型不能为空","warning");
					return false;
				}
			    else if(model.DiscountName=="")
				{
					this.MssageBox("优惠名称不能为空","warning");
					return false;
				}
				else if(model.StartTime==undefined||model.StartTime=="")
				{
					this.MssageBox("开始日期不能为空","warning");
					return false;
				}
			    else if(model.EndTime==undefined||model.EndTime=="")
				{
					this.MssageBox("结束日期不能为空","warning");
					return false;
				}
			    else if(model.DiscountWays=="")
				{
					this.MssageBox("优惠方式不能为空","warning");
					return false;
				}
			   else if(model.DiscountValue=="")
				{
					this.MssageBox("折扣不能为空","warning");
					return false;
				}
			   else if(!regPrice.test(model.DiscountValue))
				{
					this.MssageBox("折扣不能出现非法字符","warning");
					return false;
				}
                else if(model.DiscountWays=="1001101"&&model.DiscountValue>=100)
                {
					this.MssageBox("折扣不能大于等100%","warning");
					return false;
                }
				else{
					return true;
				}
		},
        //创建优惠
        CreateDiscount(){ 
            if(!this.formValite())
            {
                return false;
            }
            var formId=this.form.ID;
            if(this.form.StartTime!=undefined&&this.form.StartTime!='')
            {
                this.form.StartTime=format(this.form.StartTime);
                    // var startpan=format(this.form.StartTime);
                    // this.form.StartTime=number2DateTime(startpan,"yyyy-MM-dd HH:mm:ss");
            }
            if(this.form.EndTime!=undefined&&this.form.EndTime!='')
            {
                this.form.EndTime=format(this.form.EndTime);
                    // var endpan=Date.parse(this.form.EndTime);
                    // this.form.EndTime=number2DateTime(endpan,"yyyy-MM-dd HH:mm:ss");
            }
            //更新
            if(formId!=undefined&&formId!="")
            {
                 UpdateProductDiscount(this.form).then(ret => { 
                    if (ret.status === 0) {
                       if(ret.result!=undefined&&ret.result==true)
                       {
                           	this.MssageBox('更新优惠成功','success');
                            this.oncancel();
                            //this.InitList(); 
                       }
                    }
                });

            }
            //新增
            else
            {
                AddProductDiscount(this.form).then(ret => { 
                    if (ret.status === 0) {
                       if(ret.result!=undefined&&ret.result==true)
                       {
                           	this.MssageBox('创建优惠成功','success');
                            this.oncancel();
                            //this.InitList(); 
                       }
                    }
                });

            }
        },
        // InitList(){
        //        GetProductDiscountList(this.searchPrm).then(ret => { 
        //             if (ret.status== 0) {
        //                 this.self.$store.state.product.GetAllProductDiscountList=ret.result.Body;
        //             }
        //         });
        // },
        GetDictiondata(keyVule){
			GetDictionaryByTypeId({dicType:keyVule}).then(ret => { 
				if (ret.status === 0) {
					if(keyVule=="1602")
						this.CourseTypeList=ret.result;
					if(keyVule=="10046")
						this.DiscountTypeList=ret.result;
					if(keyVule=="10045")
						this.DiscountWaysList=ret.result;
				}
			});
		},
        oncancel() {
			//关闭弹层
			this.modal.close();
		},
        MssageBox(msg,typeIco){
		    Message({
		        message:msg,
		        type: typeIco
		    });
        },
    },
    mounted(){
        this.GetDictiondata(1602);//项目
		this.GetDictiondata(10046);//优惠类型
		this.GetDictiondata(10045);//优惠方式
        this.GetInfo();

    }
}
</script>