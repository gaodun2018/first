<template>
	<div class="crm-call-out-new">
		<el-col :span="24" style="padding: 0 10px" class="crm-call-out">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-row>
					<el-col :span="8">
						<el-form-item label="来电号码">
							<el-input :disabled="true" v-model="callFromNo.FromNo" size="mini" style="width: 155px"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9">
						<el-form-item label="客户拨打电话" label-width="100px">
							<el-input :disabled="true" v-model="callFromNo.ToNo" size="mini" style="width: 155px"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="学员意向">
							<el-select v-model="form.Intention" style="width: 155px" size="mini" clearable @visible-change="onIntentionDegree">
								<el-option v-for="intention in intentionDegreeData" :key="intention.Id" :label="intention.Name" :value="intention.Id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<div class="crm-call-new-add">
						<p>新增客户</p>
					</div>
					<el-row>
						<el-col :span="8">
							<el-form-item label-width="85px" label="姓名" prop="Name">
								<el-input size="mini" style="width: 155px" v-model="form.Name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label-width="110px" label="性别" prop="Gender">
								<el-radio-group v-model="form.Gender">
									<el-radio label="0">未知</el-radio>
									<el-radio label="1">男</el-radio>
									<el-radio label="2">女</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-col :span="10">
								<el-form-item label-width="110px" label="国际电话">
									<el-select style="width: 75px" size="mini" clearable v-model="form.areaCode" filterable placeholder="请选择" @visible-change="onPhoneCode">
										<el-option v-for="item in phoneCodeList" :key="item.PhoneCode" :label="item.CountryName" :value="item.PhoneCode">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item>
									<el-input v-model.number="form.InternationalNo" auto-complete="off" size="mini" style="width: 80px"></el-input>
								</el-form-item>
							</el-col>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="8">
							<el-form-item label-width="85px" label="QQ">
								<el-input size="mini" style="width: 155px" v-model="form.QQ"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label-width="110px" label="微信">
								<el-input size="mini" style="width: 155px" v-model="form.WeChat"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label-width="110px" label="私人邮箱">
								<el-input size="mini" style="width: 168px" v-model="form.Email"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
							<el-col :span="8" class="el-row-information-item">
								<el-form-item label-width="85px" label="客户来源" prop="Channel">
									<el-cascader size="mini" v-model="form.Channel" :options="getchannels" :props="channelsProps" style="width: 155px;font-size: 12px"></el-cascader>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label-width="110px" label="职业状态" prop="Prefession">
									<el-select v-model="form.Prefession" class="tracking-text-font" size='mini' style="width: 155px" @visible-change="onProfession">
										<el-option v-for="professional in professionalStatus" :key="professional.Id" :label="professional.Name" :value="professional.Id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label-width="110px" label="感兴趣的项目" prop="CourseType">
									<el-select style="width: 168px" v-model="form.CourseType" size="mini" @visible-change="onCourseType">
										<el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
					</el-row>
					<el-row style="margin-top: 10px">
						<el-col>
							<el-form-item label-width="110px" prop="CommuCianateContent" label="沟通记录">
								<el-input v-model="form.CommuCianateContent" type="textarea" :rows="4"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<div style="padding: 20px 0 30px 0; text-align: right">
						<el-button style="width: 70px" size="mini" type="primary" @click="submitForm('form')">保存</el-button>
						<el-button style="width: 70px" size="mini" @click="cancelForm">放弃</el-button>
					</div>
				</el-row>
			</el-form>
		</el-col>
	</div>
</template>
<style>
.crm-call-out .el-form-item {
	margin-bottom: 0;
}

.crm-call-out-new .el-form-item .el-form-item__label {
	color: #8d98a9;
}

.active-status {
	background: #f09862;
	color: #fff;
	border: 0
}
</style>
<script>
import Vue from 'vue';
import { number2DateTime } from '../../util/util';
import { GetCommunicateRecords, professionalStatus, interestedProjectNoAuth, GetCountryPhoneCodeList, IntentionStudents, getchannels,GetCustomerSourceTree } from '../../api/cluesManage';
import { ClueFollowShortcut, AddCallInClue} from '../../api/message';
import { Message, loading, Row, Col, Button, Form, FormItem, Option, Select, Cascader, RadioGroup, Radio } from 'element-ui';
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(RadioGroup)
Vue.use(Radio)
export default {
	props: ['self', 'Guid', 'CustomGuid', 'modal', 'callFromNo', 'callModal'],
	data() {
		return {
			intentionDegreeData: [], // 意向度
			interestedProject: [], // 感兴趣的项目
			getchannels: [], // 来源渠道
			professionalStatus: [], // 职业状态
			phoneCodeList: [], // 区号
			form: {
				QQ: '',
                WeChat: '',
				Email: '',
				Name: '',
				Gender: '',
				areaCode: '',
				Channel: [],
				CourseType: '',
				CommuCianateContent: '',
				Intention: '',
				Prefession: '',
				customerCall: '',
				Phone: '',
				InternationalNo: ''
			},
			loading: false,
			CommucinateStatus: '',
			ClueStatusProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
			},
			channelsProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildChannel'
			},
			rules: {
				CommuCianateContent: [
					{ required: true, message: ' ', trigger: 'change' }
				],
				Gender: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                Name: [
                    { required: true, message: ' ', trigger: 'blur' },
                ],
                Channel: [
                    { required: true, type: 'array', message: ' ', trigger: 'change' }
                ],
                CourseType: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                Prefession: [
                    { required: true, message: ' ', trigger: 'change' }
                ]
			}
		}
	},
	methods: {
		submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            	const {
				QQ,
                WeChat,
				Email,
				Name,
				Gender,
				areaCode,
				Channel,
				CourseType,
				CommuCianateContent,
				Intention,
				Prefession,
				customerCall,
				Phone,
				InternationalNo
			} = this.form;
			let params = {
				QQ,
                WeChat,
				Email,
				Name,
				Gender,
				areaCode,
				Channel: Channel[Channel.length-1],
				CourseType,
				CommuCianateContent,
				Intention,
				Prefession,
				customerCall: this.callFromNo.ToNo,
				Phone: this.callFromNo.FromNo,
				InternationalNo: `${areaCode}-${InternationalNo}`
			}
			AddCallInClue(params).then(ret => {
                if (ret.status === 0) {
                    Message({
						message: '保存成功',
						type: 'success'
					});
					this.callModal.close();
                }
            })
          }
        });
      },
		cancelForm() { // 取消
			this.callModal.close();
		},
		onIntentionDegree() { // 学员意向接口
            IntentionStudents().then(ret => {
                if (ret.status === 0) {
                    this.intentionDegreeData = ret.result;
                }
            })
		},
		onCourseType(even) { // 感兴趣的项目接口
            if (even) {
                interestedProjectNoAuth().then(ret => {
                    if (ret.status === 0) {
                        this.interestedProject = ret.result;
                    }
                })
            }
		},
		onProfession(even) { // 职业状态
            if (even) {
                professionalStatus().then(ret => {
                    if (ret.status === 0) {
                        this.professionalStatus = ret.result;
                    }
                })
            }
		},
		 onPhoneCode(even) { // 区号接口
        let PhoneCode = this.form.areaCode;
        // this.form.areaCode = '0001'; 
            if (even) {
                GetCountryPhoneCodeList().then(ret => {
                    if (ret.status === 0) {
                        this.phoneCodeList = ret.result;
                    }
                })
            }
		},
		
	},
	created() {
		// getchannels().then(ret => { // 来源渠道
        //     if (ret.status === 0) {
        //         this.getchannels = ret.result;
        //     }
		// });
		GetCustomerSourceTree().then(ret => {// 客户来源接口
            if (ret.status === 0) {
                this.getchannels = ret.result;
            }
        });
	}
}
</script>
