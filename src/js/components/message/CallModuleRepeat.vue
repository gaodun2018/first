<template>
	<div style="width: 920px">
		<el-col :sm="18" style="padding-right: 20px" class="crm-call-out">
			<el-form ref="form" :model="form" :rules="rules">
				<el-row>
					<el-col :sm="8">
						<el-form-item label="来电号码">
							<el-input :disabled="true" v-model="callFromNo.FromNo" size="mini" style="width: 125px"></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="9">
						<el-form-item label="客户拨打电话">
							<el-input :disabled="true" v-model="callFromNo.ToNo" size="mini" style="width: 125px"></el-input>
						</el-form-item>
					</el-col>
					<el-col :sm="7">
						<el-form-item label="学员意向">
							<el-select v-model="form.Intention" style="width: 125px" size="mini" clearable @visible-change="onIntentionDegree">
								<el-option v-for="intention in intentionDegreeData" :key="intention.Id" :label="intention.Name" :value="intention.Id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<p class="tracking-clues-information" style="display: inline">共享查询</p>
					<el-row class="el-row-information-item" style="margin-top: 10px">
						<el-table :data="callRepeat.Clues" style="width: 100%; border-top: 2px solid #989696">
							<el-table-column align="center" prop="ClueNo" label="线索ID">
							</el-table-column>
							<el-table-column align="center" prop="CourseType" label="感兴趣项目">
							</el-table-column>
							<el-table-column align="center" prop="ClueStatus" label="线索状态">
							</el-table-column>
							<el-table-column align="center" prop="ClueOwner" label="线索所属人">
							</el-table-column>
							<el-table-column align="center" prop="LastCommunicateTime" label="最后沟通时间">
							</el-table-column>
						</el-table>
					</el-row>
					<el-row style="margin-top: 10px">
						<el-col :sm="11" class="el-row-information-item">
							<el-form-item label="感兴趣的项目" prop="CourseType">
								<el-select v-model="form.CourseType" style="width: 165px" size="mini" clearable @visible-change="onCourseType">
									<el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :sm="10" class="el-row-information-item">
							<el-form-item label="客户来源" prop="Channel">
								<el-cascader size="mini" v-model="form.Channel" :options="getchannels" :props="channelsProps" style="width: 165px;font-size: 12px"></el-cascader>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="margin-top: 10px">
						<el-col>
							<el-form-item label-width="85px" label="沟通记录" prop="CommuCianateContent">
								<el-input v-model="form.CommuCianateContent" type="textarea" :rows="3.5"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<div style="padding: 20px 0 30px 0; text-align: right">
						<el-form-item>
							<el-button style="width: 70px" size="mini" type="primary" @click="submitForm('form')">保存</el-button>
							<el-button style="width: 70px" size="mini" @click="cancelForm">放弃</el-button>
						</el-form-item>
					</div>
				</el-row>
			</el-form>
		</el-col>
		<el-col :sm="6">
			<div class="tracking-record-communication call-communication">
				<p class="tracking-clues-information">沟通记录</p>
				<ul v-if="callRepeat.CommucinateRecords.length">
					<li v-for="item in callRepeat.CommucinateRecords" :key="item.ID">
						<div class="communication-right">
							<div>
								<h5>【{{item.CommunicatTime}}】{{item.CreateBy}}</h5>
								<p> {{item.CommunicatContent}}</p>
							</div>
						</div>
					</li>
				</ul>
				<div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
			</div>
		</el-col>
	</div>
</template>
<style scoped>
.crm-call-out .el-form-item {
	margin-bottom: 0;
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
import { onCourseType, IntentionStudents, getchannels, interestedProjectNoAuth,GetCustomerSourceTree } from '../../api/cluesManage';
import { ClueFollowShortcut, AddCallInClue } from '../../api/message';
import { Message, loading, Row, Col, Button, Form, FormItem, Option, Select, Cascader } from 'element-ui';
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
export default {
	props: ['self', 'Guid', 'CustomGuid', 'modal', 'callRepeat', 'callFromNo', 'callModal'],
	data() {
		return {
			form: {
				Phone: '',
				customerCall: '',
				Intention: '',
				Channel: [],
				CourseType: '',
				CommuCianateContent: '',
			},
			loading: false,
			getClueStatus: [], // 线索状态
			intentionDegreeData: [], // 意向度
			interestedProject: [], // 感兴趣的项目
			CommucinateStatus: '',
			ClueStatusProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
			},
			getchannels: [],
			channelsProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildChannel'
			},
			rules: {
				CommuCianateContent: [
					{ required: true, message: ' ', trigger: 'change' }
				],
				CourseType: [
					{ required: true, message: ' ', trigger: 'change' }
				],
				Channel: [
					{ required: true, type: 'array', message: ' ', trigger: 'change' }
				],
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					const {
					Phone,
						customerCall,
						Intention,
						Channel,
						CourseType,
						CommuCianateContent,
				} = this.form;
					let params = {
						Phone: this.callFromNo.FromNo,
						customerCall: this.callFromNo.ToNo,
						Intention,
						Channel: Channel[Channel.length - 1],
						CourseType,
						CommuCianateContent,
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
		submitCallOut(params) {
			ClueFollowShortcut(params).then(ret => { // 保存修改
				if (ret.status === 0) {
					Message({
						message: '保存成功',
						type: 'success'
					});
					// this.modal.close();
				}
			})
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
	},
	created() {
		// getchannels().then(ret => { // 来源渠道
		// 	if (ret.status === 0) {
		// 		this.getchannels = ret.result;
		// 	}
		// });
		GetCustomerSourceTree().then(ret => {// 客户来源接口
            if (ret.status === 0) {
                this.getchannels = ret.result;
            }
        });
	}
}
</script>
