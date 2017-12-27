<template>
    <div style="width: 850px;margin: 0 auto;" class="setting-addLling">
        <div>
            <p class="tracking-clues-information">基本信息</p>
            <el-form :model="ruleForm" ref="ruleForm" label-width="90px">
                <el-row>
                    <el-col>
                        <el-form-item label="用户包名称">
                            <el-input placeholder="请输入内容" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="描述">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.describe"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div style="text-align: center;margin-bottom: 20px;">
            	<el-button :disabled = "!saveClick" @click="returnAddCustomerTag" style="width: 75px;" size="small" type="primary">保存</el-button>
            </div>
        </div>
        <div>
            <p class="tracking-clues-information">筛选用户</p>
            <el-form :model="form" ref="form" label-width="120px">
                <el-row>
                    <el-form-item label="要包含的用户">
                        <el-row>
                            <el-button :disabled = "!mergeClick" @click="onCoalescing" style="width: 100%">
                                <span>合并组</span>
                                <i v-show="addIcon1" class="el-icon-plus"></i>
                            </el-button>
                        </el-row>
                        
                        <el-row v-show="isCoalesCing" style="margin: 20px 0">
                            <el-table :data="sysTagData" border style="width: 100%">
                                <el-table-column align="center" label="标签库">
                                    <template scope="scope">
                                        <el-select filterable clearable style="width: 100%" size="small" value-key="tag_name" v-model="scope.row.tag" placeholder="请选择标签" @visible-change="rowVisible" @change = "addUserPackageRule(scope.$index,sysTagData)">
                                            <el-option v-for= "(item,index) in sysTags" :disabled="item.disabled" :label = "item.tag_name" :value="item"></el-option>
                                          </el-select>
                                        <!-- <el-input size="small" v-model="scope.row.date"></el-input> -->
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="已选标签">
                                    <template scope="scope">
                                         <Tree v-if="sysTagDetailType[scope.$index] == 1" :index="scope.$index" :onCheck="createTree" width="100%" :data="sysTagDetailData[scope.$index] || []" :value="scope.row.value" placeholder="请选择"></Tree>                                       
                                          <el-date-picker v-if="sysTagDetailType[scope.$index] == 2" v-model="scope.row.operate" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"  ></el-date-picker> 
                                          
                                          <span v-if="sysTagDetailType[scope.$index] == 3">
                                          	<el-select style="width: 40%;" size="small" v-model="scope.row.numberType">
                                            <el-option v-for= "(item,index) in NumberRules" :label="item.name" :value = "item.name" ></el-option>
                                          </el-select>
                                          
                                          <span v-if = 'scope.row.numberType == "大于"'>
                                          	 <el-input v-model = "scope.row.numberOfTimes1" type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>次
                                          </span>
                                          
                                          <span v-else-if = 'scope.row.numberType == "小于"'>
                                          	 <el-input v-model = "scope.row.numberOfTimes1"  type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>次
                                          </span>
                                          
                                          <span v-else-if = 'scope.row.numberType == "介于"'>
                                          	 <el-input v-model = "scope.row.numberOfTimes1" type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>~<el-input v-model = "scope.row.numberOfTimes2" type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>次
                                          </span>
                                        </span>
                                          
                                          
                                         
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="操作" width="130">
                                    <template scope="scope">
                                        <a href="javascript:void(0)" @click="addClick" class="newuser-add"></a>
                                        <a v-show="removeIcon1" href="javascript:void(0)" @click="removeRowCoales(scope.$index)" class="newuser-remove"></a>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div style="text-align: center; margin-top: 20px">
                                <el-button @click="onSaveCoalescing" size="small" style="width: 75px" type="primary">保存</el-button>
                                <el-button @click="onRemoveCoalescing" size="small" style="width: 75px">删除</el-button>
                            </div>
                        </el-row>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="要排除的用户">
                            <el-row>
                                <el-button :disabled = "!deleateClick" @click="onRuleOut" style="width: 100%">
                                    <span>排除组</span>
                                    <i v-show="addIcon2" class="el-icon-plus"></i>
                                </el-button>
                            </el-row>
                            <el-row v-show="isRuleOut" style="margin: 20px 0">
                                <!--<el-table :data="ruleOutData" border style="width: 100%">
                                    <el-table-column align="center" label="标签库">
                                        <template scope="scope">
                                            <el-select style="width: 100%" size="small" v-model="scope.row.date" placeholder="请选择标签">
                                            <el-option>
                                            </el-option>
                                          </el-select>
                                             <el-input size="small" v-model="scope.row.date"></el-input> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="已选标签">
                                        <template scope="scope">
                                             <el-input size="small" v-model="scope.row.name"></el-input> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="center" label="操作" width="130">
                                        <template scope="scope">
                                            <a href="javascript:void(0)" @click="addRuleOut" class="newuser-add"></a>
                                            <a v-show="removeIcon2" href="javascript:void(0)" @click="removeRowOut(scope.$index)" class="newuser-remove"></a>
                                        </template>
                                    </el-table-column>
                                </el-table>-->
                                
                                <el-table :data="deleateData" border style="width: 100%">
	                                <el-table-column align="center" label="标签库">
	                                    <template scope="scope">
	                                        <el-select filterable clearable style="width: 100%" size="small" value-key="tag_name" v-model="scope.row.tag" placeholder="请选择标签" @visible-change="deleateRowVisible" @change = "deleateUserPackageRule(scope.$index,deleateData)">
	                                            <el-option v-for= "(item,index) in deleateTags" :disabled="item.disabled" :label = "item.tag_name" :value="item"></el-option>
	                                          </el-select>
	                                        <!-- <el-input size="small" v-model="scope.row.date"></el-input> -->
	                                    </template>
	                                </el-table-column>
	                                <el-table-column align="center" label="已选标签">
	                                	
	                                    <template scope="scope">
	                                         <Tree v-if="deleateDetailType[scope.$index] == 1" :index="scope.$index" :onCheck="deleateCreateTree" width="100%" :data="deleateDetailData[scope.$index] || []" :value="scope.row.value" placeholder="请选择"></Tree>
	                                                                           
	                                          <el-date-picker v-if="deleateDetailType[scope.$index] == 2" v-model="scope.row.operate" type="daterange" align="center" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"  ></el-date-picker> 
	                                          
	                                          <span v-if="deleateDetailType[scope.$index] == 3">
	                                          	<el-select style="width: 40%;" size="small" v-model="scope.row.numberType">
	                                            <el-option v-for= "(item,index) in deleateNumberRules" :label="item.name" :value = "item.name" ></el-option>
	                                          </el-select>
	                                          
	                                          <span v-if = 'scope.row.numberType == "大于"'>
	                                          	 <el-input v-model = "scope.row.numberOfTimes1" type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>次
	                                          </span>
	                                          
	                                          <span v-else-if = 'scope.row.numberType == "小于"'>
	                                          	 <el-input v-model = "scope.row.numberOfTimes1"  type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>次
	                                          </span>
	                                          
	                                          <span v-else-if = 'scope.row.numberType == "介于"'>
	                                          	 <el-input v-model = "scope.row.numberOfTimes1" type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>~<el-input v-model = "scope.row.numberOfTimes2" type="small"  placeholder="" style="width: 25%;display: inline-block;"></el-input>次
	                                          </span>
	                                        </span>
	                                          
	                                          
	                                         
	                                    </template>
	                                </el-table-column>
	                                <el-table-column align="center" label="操作" width="130">
	                                    <template scope="scope">
	                                        <a href="javascript:void(0)" @click="addRuleOut" class="newuser-add"></a>
                                            <a v-show="removeIcon2" href="javascript:void(0)" @click="removeRowOut(scope.$index)" class="newuser-remove"></a>
	                                    </template>
	                                </el-table-column>
	                            </el-table>
                                <div style="text-align: center; margin-top: 20px">
                                    <el-button @click="onSaveDeleate" size="small" style="width: 75px" type="primary">保存</el-button>
                                    <el-button @click="onRemoveRuleOut" size="small" style="width: 75px">删除</el-button>
                                </div>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { checkUserPackageResult,addCustomerTag,GetSysTags,getUserPackageRule,getSysTagDetail,setUserPackageRule,getRuleDetail,setCustomerTag } from '../../api/addLabelling';
import { CRM_USER_INFO } from "../../util/keys";
 import Tree from "../../plugins/tree/ExtendZTree.vue";
 import { getlabellingList } from '../../api/labellingList';

export default {
	components: {Tree},
    data() {
        return {
        	userId:"",//用户包id
        	content: [],
        	saveClick:true,
        	mergeClick:false,
        	deleateClick:false,
            addIcon1: true,
            addIcon2: true,
            removeIcon1: false,
            removeIcon2: false,
            ruleForm: {//用户包名称、描述
                name: '',
                describe: ''
            },
            userPackageTitle:true,//用户名是否合法，
            isCoalesCing: false,//是否显示合并组
            isRuleOut: false,//是否显示删除组
//          sysTagData: [{//合并组model
//              tag: '',
//              value:[],
//              operate: '',
//              numberType:[],
//              numberOfTimes1:'',//大于 小于 介于
//              numberOfTimes2:''//介于
//          }],
			sysTagData:[],
//          deleateData: [{
//              tag: '',
//              value:[],
//              operate: '',
//              numberType:[],
//              numberOfTimes1:'',//大于 小于 介于
//              numberOfTimes2:''//介于
//          }],
			deleateData:[],
            userInfo:JSON.parse(localStorage.getItem(CRM_USER_INFO)) || "",
          	sysTags:[],//合并组系统标签列表
          	sysTagDetailData:[],//合并组系统标签详情数据
          	sysTagDetailType:[],//合并组系统标签类型
          	NumberRules:[{
			          		name:"大于"
			          	},{
			          		name:"介于"
			          	},{
			          		name:"小于"
			          	}],//合并组数值类型值
          	ruleId:[],//合并组规则id
          	deleateTags:[],//删除组系统标签列表
          	deleateDetailData:[],//删除组系统标签详情数据
          	deleateDetailType:[],//删除组系统标签类型
          	deleateNumberRules:[{
			          		name:"大于"
			          	},{
			          		name:"介于"
			          	},{
			          		name:"小于"
			          	}],//删除组数值类型值
          	deleateRuleId:[],//删除组规则id
          	pickerOptions2: {//日期类型
		          shortcuts: [{
		            text: '一天内',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', [start, end]);
		            }
		          },{
		            text: '一周内',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '一月内',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		    },
		    operateProps: {//字典类型详情props
	          value: 'Name',
	          label: "Name",
	          children: 'ChildrenList'
	       },
	       sysLen:-1,
	       deleateLen:-1
        }
    },
    watch: {
        sysTagData(data) {
            if (data.length > 1) {
                this.removeIcon1 = true;
            } else {
                this.removeIcon1 = false;
            }
        },
        deleateData(data) {
            if (data.length > 1) {
                this.removeIcon2 = true;
            } else {
                this.removeIcon2 = false;
            }
        }
    },
    created() {
    	if (this.$route.query.userId) {
    		this.mergeClick = false;
    		this.deleateClick = false;
    		this.userId = this.$route.query.userId;
    		this.sysTagData = []
    		this.deleateData = []
    		this.isCoalesCing = true;
    		this.isRuleOut = true;
    		getlabellingList({//获取标题描述
	    		owner:this.userInfo.UserId,
	    		id:this.$route.query.userId
	    	}).then(ret=>{
	    		this.ruleForm.name = ret.data.result[0].TagTitle
	    		this.ruleForm.describe = ret.data.result[0].TagDesc
	    	})
	    	 GetSysTags({
            	appid:130555
            }).then(ret=>{
            	this.sysTags = ret.data.result;
            	this.deleateTags = ret.data.result;
            	getRuleDetail({
		    			customertagid:this.$route.query.userId
		    	})
		    	.then(ret=>{
	    			const data = ret.data.result
	    			var sArr = [],dArr=[],tagArr=[]
	    			data.filter((ele,index)=>{
	    				if(ele.GroupType == 1){
	    					sArr.push(ele)
	    				}else if(ele.GroupType == 2){
	    					dArr.push(ele)
	    				}
	    			})
	    			if(sArr.length>0){
	    				this.sysLen= sArr.length;
	    			}
	    			if(dArr.length>0){
	    				this.deleateLen = dArr.length;
	    			}
	    			//合并组
	    			for(let i in sArr){
//	    				this.ruleId.splice(index,1,ret.data.result.ID);
						this.ruleId[i] = sArr[i].ID;
	    				this.sysTagDetailData[i] = []
    					this.sysTagData.push({
			                tag:"",
			                value:[],
			                operate: '',
			                numberType:'',
			                numberOfTimes1:'',
			                numberOfTimes2:''
			            });
    					this.sysTags.filter((ele,index)=>{
    						if(ele._id == sArr[i].SysTagID){
								this.sysTagData[i].tag = ele
								this.ruleId.splice(index,1,sArr[i].ID);
    						}
    					});
    					(function(index){
    						let i = index;
    						//第二列
	    					if(sArr[i].RuleType == 1){//字典类型
	    						this.sysTagDetailType[i] = 1;
	    						getSysTagDetail({
			        				systagid:sArr[i].SysTagID
			        		}).then(data => {
									this.sysTagDetailData[i] = data.data.result
									for(var j in this.sysTagDetailData[i]){
										sArr[i].Values.filter((ele,index)=>{
											if(ele.RuleVal == this.sysTagDetailData[i][j].Id){
												this.sysTagData[i].value.push(this.sysTagDetailData[i][j].Id)
											}
										})
									}
			        			})
	    					}else if(sArr[i].RuleType == 2){
	    						let operateArr = []
	    						this.sysTagDetailType[i] = 2;
	    						operateArr.push(sArr[i].Values[0].RuleVal)
	    						operateArr.push(sArr[i].Values[1].RuleVal)
	    						this.sysTagData[i].operate = operateArr
	    					}else if(sArr[i].RuleType == 3){
	    						this.sysTagDetailType[i] = 3;
	    						this.sysTagData[i].numberOfTimes1 = sArr[i].Values[0].RuleVal
	    						if(sArr[i].Values.length>1){
	    							this.sysTagData[i].numberOfTimes2 = sArr[i].Values[1].RuleVal
	    							this.sysTagData[i].numberType = "介于"
	    						}else{
	    							if(sArr[i].Values[0].RuleCond == 4){
	    								this.sysTagData[i].numberType = "大于"
	    							}else{
	    								this.sysTagData[i].numberType = "小于"
	    							}
	    						}
	    					}
    					}).call(this,i);
    					
    				}
	    			this.disabledData()
	    			
	    			//删除组
	    			for(let i in dArr){
	    				this.deleateRuleId[i] = sArr[i].ID;
	    				this.deleateDetailData[i] = []
    					this.deleateData.push({
			                tag:"",
			                value:[],
			                operate: '',
			                numberType:'',
			                numberOfTimes1:'',
			                numberOfTimes2:''
			            });
    					this.deleateTags.filter((ele,index)=>{
    						if(ele._id == dArr[i].SysTagID){
								this.deleateData[i].tag = ele
								this.deleateRuleId.splice(index,1,dArr[i].ID);
    						}
    					});
    					(function(index){
    						let i = index;
    						//第二列
	    					if(dArr[i].RuleType == 1){//字典类型
	    						this.deleateDetailType[i] = 1;
	    						getSysTagDetail({
			        				systagid:dArr[i].SysTagID
			        		}).then(data => {
									this.deleateDetailData[i] = data.data.result
									for(var j in this.deleateDetailData[i]){
										dArr[i].Values.filter((ele,index)=>{
											if(ele.RuleVal == this.deleateDetailData[i][j].Id){
												this.deleateData[i].value.push(this.deleateDetailData[i][j].Id)
											}
										})
									}
			        			})
	    					}else if(dArr[i].RuleType == 2){
	    						let operateArr = []
	    						this.deleateDetailType[i] = 2;
	    						operateArr.push(dArr[i].Values[0].RuleVal)
	    						operateArr.push(dArr[i].Values[1].RuleVal)
	    						this.deleateData[i].operate = operateArr
	    					}else if(dArr[i].RuleType == 3){
	    						this.deleateDetailType[i] = 3;
	    						this.deleateData[i].numberOfTimes1 = dArr[i].Values[0].RuleVal
	    						if(dArr[i].Values.length>1){
	    							this.deleateData[i].numberOfTimes2 = dArr[i].Values[1].RuleVal
	    							this.deleateData[i].numberType = "介于"
	    						}else{
	    							if(dArr[i].Values[0].RuleCond == 4){
	    								this.deleateData[i].numberType = "大于"
	    							}else{
	    								this.deleateData[i].numberType = "小于"
	    							}
	    						}
	    					}
    					}).call(this,i);
    					
    				}
	    			this.deleateDisabledData()
	    			
		    	})
          })
    	}
    },
    methods: {
    	checkUserPackage (){//检查用户包名称
    		checkUserPackageResult ({
    			title:this.ruleForm.name
    		}).then(ret=>{
    			if(ret.data.status != "0"){
    				alert(ret.data.info);
//  				this.userPackageTitle = false;
    				return;
    			}
//  			this.userPackageTitle = true;
    		})
    	},
    	returnAddCustomerTag (){//保存用户包
    		if(!this.ruleForm.name){
    			alert("名称不能为空");
    			return;
    		}
    		this.checkUserPackage();
    		if(this.$route.query.userId){
    			setCustomerTag({
    				id:this.$route.query.userId,
    				title:this.ruleForm.name,
    				desc:this.ruleForm.describe
    			}).then(ret=>{
    				if(ret.data.status != "0"){
	    				alert(ret.data.info);
	    			}else{
	    				this.userId = ret.data.result.ID
	    			}
    				
    			})
    		}else{
    			addCustomerTag ({
	    			title:this.ruleForm.name,
	    			desc:this.ruleForm.describe,
	    			owner:this.userInfo.UserId
	    		}).then(ret => {
	    			if(ret.data.status != "0"){
	    				alert(ret.data.info);
	    			}else{
	    				this.userId = ret.data.result.ID
	    			this.saveClick = false;
	    			this.mergeClick = true;
	    			this.deleateClick = true;
	    			alert("成功")
	    			}
	    			
	    		})
    		}
    		
    	},
    	
        onCoalescing() { // 点击合并组
            this.isCoalesCing = true;
            this.addIcon1 = false;
            if(this.$route.query.userId){
            	return;
            }
            this.sysTagData = [{
                tag: '',
                value:[],
                operate: '',
                numberType:[],
                numberOfTimes1:'',//大于 小于 介于
                numberOfTimes2:''//介于
            }]
            GetSysTags({
            	appid:130555
            }).then(ret=>{
            	this.sysTags = ret.data.result;
            	this.mergeClick = false;
            })
        },
        onRuleOut() { // 点击排除组
            this.addIcon2 = false;
            this.isRuleOut = true;
            if(this.$route.query.userId){
            	return;
            }
            this.deleateData = [{
                tag: '',
                value:[],
                operate: '',
                numberType:[],
                numberOfTimes1:'',//大于 小于 介于
                numberOfTimes2:''//介于
            }]
            GetSysTags({
            	appid:130555
            }).then(ret=>{
            	this.deleateTags = ret.data.result;
            	this.deleateClick = false;
            })
        },
        rowVisible() {
            this.disabledData();
        },
        deleateRowVisible (){
        	this.deleateDisabledData()
        },
        disabledData() {//合并组禁用已选标签
            for (let j = 0; j < this.sysTags.length; j++) {
                this.sysTags[j].disabled = false;
            }
            for (let j = 0; j < this.sysTagData.length; j++) {
            	this.sysTags.filter((ele)=>{
            		if(ele ==this.sysTagData[j].tag){
            			ele.disabled = true;
            		}
            	})
            }
        },
         deleateDisabledData() {//删除组禁用已选标签
            for (let j = 0; j < this.deleateTags.length; j++) {
                this.deleateTags[j].disabled = false;
            }
            for (let j = 0; j < this.deleateData.length; j++) {
            	this.deleateTags.filter((ele)=>{
            		if(ele ==this.deleateData[j].tag){
            			ele.disabled = true;
            		}
            	})
            }
        },
        createTree(val, index) {
                this.sysTagData[index].value = val;
        },
        deleateCreateTree(val, index) {
                this.deleateData[index].value = val;
        },
        addUserPackageRule (index,data){//合并组选择系统标签回调
        	if(data){
        		this.sysTagData[index].value = []
        		this.sysTagData[index].operate = ""
        		this.sysTagData[index].numberType = ""
        		this.sysTagData[index].numberOfTimes1 = ""
        		this.sysTagData[index].numberOfTimes2 = ""
        	}
        	this.disabledData();
        	
        	this.sysTagDetailType.splice(index,1,data[index].tag.tag_type);
    		if(data[index].tag.tag_type == 1){
    			getSysTagDetail({
    				systagid:data[index].tag._id
    			}).then(data => {
					this.sysTagDetailData.splice(index,1,data.data.result);
    			})
    		}else{
    			this.sysTagDetailData.splice(index,1,'');
    		}
        	
        	if((index+1) > this.sysLen){
        		getUserPackageRule({//添加用户包规则
	        		customertagid:this.userId,
	        		systagid:data[index].tag._id,
	        		ruletype:data[index].tag.tag_type,
	        		grouptype:1
	        	}).then(ret=>{
	        		this.ruleId.splice(index,1,ret.data.result.ID);
	        		this.sysTagDetailType.splice(index,1,ret.data.result.RuleType);
	        	})
        	}
//      	getUserPackageRule({//添加用户包规则
//      		customertagid:this.userId,
//      		systagid:data[index].tag._id,
//      		ruletype:data[index].tag.tag_type,
//      		grouptype:1
//      	}).then(ret => {
//      		if(ret.data.result.RuleType == 1){//字典类型
//      			getSysTagDetail({
//      				systagid:ret.data.result.SysTagID
//      			}).then(data => {
//						this.sysTagDetailData.splice(index,1,data.data.result);
//      			})
//      		}else{
//      			this.sysTagDetailData.splice(index,1,'');
//      		}
//      		this.sysTagDetailType.splice(index,1,ret.data.result.RuleType);
//      		this.ruleId.splice(index,1,ret.data.result.ID);
//      	})
        },
        deleateUserPackageRule (index,data){//删除组选择系统标签回调
        	if(data){
        		this.deleateData[index].value = []
        		this.deleateData[index].operate = ""
        		this.deleateData[index].numberType = ""
        		this.deleateData[index].numberOfTimes1 = ""
        		this.deleateData[index].numberOfTimes2 = ""
        	}
        	this.deleateDisabledData();
        	this.deleateDetailType.splice(index,1,data[index].tag.tag_type);
        	if(data[index].tag.tag_type == 1){
    			getSysTagDetail({
    				systagid:data[index].tag._id
    			}).then(data => {
					this.deleateDetailData.splice(index,1,data.data.result);
    			})
    		}else{
    			this.deleateDetailData.splice(index,1,'');
    		}
        	
        	if((index+1) > this.deleateLen){
        		getUserPackageRule({//添加用户包规则
	        		customertagid:this.userId,
	        		systagid:data[index].tag._id,
	        		ruletype:data[index].tag.tag_type,
	        		grouptype:2
	        	}).then(ret=>{
	        		this.deleateRuleId.splice(index,1,ret.data.result.ID);
	        		this.deleateDetailType.splice(index,1,ret.data.result.RuleType);
	        	})
        	}
        	
        	
//      	getUserPackageRule({//添加用户包规则
//      		customertagid:this.userId,
//      		systagid:data[index].tag._id,
//      		ruletype:data[index].tag.tag_type,
//      		grouptype:2
//      	}).then(ret => {
//      		
//      		if(ret.data.result.RuleType == 1){//字典类型
//      			getSysTagDetail({
//      				systagid:ret.data.result.SysTagID
//      			}).then(data => {
//						this.deleateDetailData.splice(index,1,data.data.result);
//      			})
//      		}else{
//      			this.deleateDetailData.splice(index,1,'');
//      		}
//      		
//      		this.deleateDetailType.splice(index,1,ret.data.result.RuleType);
//      		this.deleateRuleId.splice(index,1,ret.data.result.ID);
//      	})
        },
        
        addClick() { // 添加
            this.sysTagData.push({
                tag:'',
                value:[],
                operate: '',
                numberType:'',
                numberOfTimes1:'',
                numberOfTimes2:''
            });
        },
        addRuleOut() { // 添加
            this.deleateData.push({
                tag:'',
                value:[],
                operate: '',
                numberType:'',
                numberOfTimes1:'',
                numberOfTimes2:''
            });
        },
        onSaveCoalescing() { // 合并组保存
        	var tagId
			for(var i in this.sysTagData){
				tagId = this.sysTagData[i].tag._id
				if(this.sysTagDetailType[i] == 1){
//					var dictionaryArr = []
//					for(var j in this.sysTagDetailData[i]){
//						dictionaryArr.push(this.sysTagDetailData[i][j].Id)
//					}
//					const dictionaryStr = dictionaryArr.join(';')
					let dictionaryArr;
					dictionaryArr = this.sysTagData[i].value.join(';')
					this.returnSetRUle(this.ruleId[i],1,2,dictionaryArr,tagId,this.sysTagDetailType[i])
				}else if(this.sysTagDetailType[i] == 2){
					const dateStr = this.dateFomate(this.sysTagData[i].operate[0]) + ";" + this.dateFomate(this.sysTagData[i].operate[1])
					this.returnSetRUle(this.ruleId[i],2,5,dateStr,tagId,this.sysTagDetailType[i])
				}else if(this.sysTagDetailType[i] == 3){
					let numberStr,numberType
					if(this.sysTagData[i].numberType == "介于"){
						numberType = 5
						numberStr = this.sysTagData[i].numberOfTimes1 + ";" + this.sysTagData[i].numberOfTimes2
					}else if(this.sysTagData[i].numberType == "大于"){
						numberType = 4
						numberStr = this.sysTagData[i].numberOfTimes1
					}else if(this.sysTagData[i].numberType == "小于"){
						numberType = 3
						numberStr = this.sysTagData[i].numberOfTimes1
					}
					this.returnSetRUle(this.ruleId[i],3,numberType,numberStr,tagId,this.sysTagDetailType[i])
				}
			}
        },
        onSaveDeleate() { // 删除组保存
        	var tagId
			for(var i in this.deleateData){
				tagId = this.deleateData[i].tag._id
				if(this.deleateDetailType[i] == 1){
					let dictionaryArr;
					dictionaryArr = this.deleateData[i].value.join(';')				
					this.returnSetRUle(this.deleateRuleId[i],1,2,dictionaryArr,tagId,this.deleateDetailType[i])
					
				}else if(this.deleateDetailType[i] == 2){
					const dateStr = this.dateFomate(this.deleateData[i].operate[0]) + ";" + this.dateFomate(this.deleateData[i].operate[1])
					this.returnSetRUle(this.deleateRuleId[i],2,5,dateStr,tagId,this.deleateDetailType[i])
				}else if(this.deleateDetailType[i] == 3){
					let numberStr,numberType
					if(this.deleateData[i].numberType == "介于"){
						numberType = 5
						numberStr = this.deleateData[i].numberOfTimes1 + ";" + this.deleateData[i].numberOfTimes2
					}else if(this.deleateData[i].numberType == "大于"){
						numberType = 4
						numberStr = this.deleateData[i].numberOfTimes1
					}else if(this.deleateData[i].numberType == "小于"){
						numberType = 3
						numberStr = this.deleateData[i].numberOfTimes1
					}
					this.returnSetRUle(this.deleateRuleId[i],3,numberType,numberStr,tagId,this.deleateDetailType[i])
				}
			}
        },
        dateFomate(date){//日期格式转换
        	var d = new Date(date);
        	return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() 
        },
        returnSetRUle (ruleid,datatype,rulecond,ruleval,systagid,ruletype){//用户包设置接口
        	setUserPackageRule({
						ruleid:ruleid,
						datatype:datatype,
						rulecond:rulecond,
						ruleval:ruleval,
						systagid:systagid,
						ruletype:ruletype
					}).then(ret=>{
						alert(ret.data.info)
					})
        },
        onRemoveCoalescing() { // 删除
//          this.coalesCingData = [{
//              date: '',
//              name: '',
//          }]
			this.sysTagData =[]
            this.isCoalesCing = false;
            this.addIcon1 = true;
            this.mergeClick = true;
        },
        removeRowCoales(index) { // 删除
//          if (this.coalesCingData.length > 1) {
//              this.coalesCingData.splice(index, 1)
//          }
			 if (this.sysTagData.length > 1) {
			                this.sysTagData.splice(index, 1)
			            }
        },
        onRemoveRuleOut() { // 删除
        	this.deleateClick = true;
            this.deleateData = []
            this.isRuleOut = false;
            this.addIcon2 = true;
        },
        removeRowOut(index) { // 删除
            if (this.deleateData.length > 1) {
                this.deleateData.splice(index, 1)
            }
        }


   }

}
</script>
<style type="text/css" scoped="scoped">
.el-icon-plus {
    color: #49a1f6;
    float: right;
}
</style>
<style>
    .setting-addLling .g-extend-ztree-area {
        position: relative;
    }
</style>