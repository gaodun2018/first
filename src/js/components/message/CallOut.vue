<template>
	<div style="width: 850px">
		<el-col :sm="18" style="padding-right: 20px" class="crm-call-out">
			<div class="crm-call-out-title">
				<span class="out-clueId">线索ID :
					<span>{{ID}}</span>
				</span>
				<a href="javascript:void(0)" class="out-details" @click="goTrackging">进入详情跟进页面</a>
			</div>
			<div style="padding: 0 10px">
				<el-row>
					<el-button size="small" :class='{"active-status": CommucinateStatus == 1000270}' @click="onCallStatus(1000270)">无人接听</el-button>
					<el-button size="small" :class='{"active-status": CommucinateStatus == 1000271}' @click="onCallStatus(1000271)">空错号</el-button>
					<el-button size="small" :class='{"active-status": CommucinateStatus == 1000272}' @click="onCallStatus(1000272)">不感兴趣</el-button>
				</el-row>
				<div>
					<el-form ref="form" :rules="rules" :model="form">
						<el-row style="margin-top: 10px">
							<el-col :sm="12">
								<el-form-item style="float:left" label-width="83px" label="线索状态:" prop="ClueStatus">
									<el-cascader v-model="form.ClueStatus" :options="getClueStatus" :props="ClueStatusProps" clearable size="small" style="width: 180px"></el-cascader>
								</el-form-item>
							</el-col>
							<el-col :sm="12">
								<el-form-item style="float:right"  label-width="110px" label="客户意向度:" prop="IntentionGrade">
									<el-select v-model="form.IntentionGrade" clearable size='small' style="width: 180px">
										<el-option v-for="item in intentionItem" :key="item.Id" :label="item.Name" :value="item.Id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px">
							<el-col :sm="12">
								<el-form-item style="float:left"  label-width="83px" label="话务状态:" prop="TelTrafficStatus">
									<el-select v-model="form.TelTrafficStatus" clearable size='small' style="width: 180px" @visible-change="onPhoneStatus">
										<el-option v-for="item in telephoneStatus" :key="item.Id" :label="item.Name" :value="item.Id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :sm="12">
								<el-form-item style="float:right"  label-width="110px" class="tracking-text-font" label="下次沟通时间:" prop="NextCommucinateTime">
									<el-date-picker size='small' style="width: 180px" placeholder="选择日期" v-model="form.NextCommucinateTime" type="datetime">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row style="margin-top: 10px">
							<el-col>
								<el-form-item label-width="83px" label="沟通记录:" prop="CommucinateContent">
									<el-input v-model="form.CommucinateContent" type="textarea" :rows="3.5"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<!-- <el-row class="el-row-information-item" style="margin-top: 10px">
								<el-form-item label-width="110px" label="客户意向度:" prop="IntentionGrade">
									<el-radio-group v-model="form.IntentionGrade">
										<el-radio style="padding-right: 8px" label="1000043">HP：3天内成交</el-radio>
										<el-radio style="padding-right: 8px" label="1000044">MP：7天内成交</el-radio>
										<el-radio style="padding-right: 8px" label="1000045">D：已交订金</el-radio>
										<el-radio label="1000046">O：其他</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-row>
							<el-row>
								<el-col :sm="9" class="el-row-information-item">
									<el-form-item label-width="110px" label="线索状态:" prop="ClueStatus">
										<el-cascader v-model="form.ClueStatus" :options="getClueStatus" :props="ClueStatusProps" clearable size="small" style="width: 130px"></el-cascader>
									</el-form-item>
								</el-col>
								<el-col style="padding-left: 16px" :sm="12" class="el-row-information-item">
									<el-form-item class="tracking-text-font" label-width="110px" label="下次沟通时间:" prop="NextCommucinateTime">
										<el-date-picker size='small' style="width: 155px" placeholder="选择日期" v-model="form.NextCommucinateTime" type="datetime">
										</el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :sm="3" class="el-row-information-item" style="margin-top: 8px;">
									<el-button size="small">查看日程</el-button>
								</el-col>
							</el-row>
							<el-row style="margin-top: 10px">
								<el-col>
									<el-form-item label-width="110px" label="沟通记录:" prop="CommucinateContent">
										<el-input v-model="form.CommucinateContent" type="textarea" :rows="3.5"></el-input>
									</el-form-item>
								</el-col>
							</el-row> -->
					</el-form>
				</div>
				<div style="padding: 20px 0 30px 0; text-align: right">
					<el-button style="width: 70px" size="small" type="primary" :loading="isLoading" @click="submitForm('form')">确定</el-button>
					<el-button style="width: 70px" size="small" @click="cancelForm">取消</el-button>
				</div>
			</div>
		</el-col>
		<el-col :sm="6">
			<div class="tracking-record-communication call-communication">
				<p class="tracking-clues-information">沟通记录</p>
				<ul v-if="communicationRecord.length">
					<li v-for="item in communicationRecord" :key="item.ID">
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
import { GetClueStatusTree, GetCommunicateRecords, GetDictionaryByTypeId } from '../../api/cluesManage';
import { intentionItem } from '../common/cluesConfig';
import { ClueFollowShortcut } from '../../api/message';
import { CRM_USER_INFO } from '../../util/keys';
import { Message, loading, Row, Col, Table, TableColumn, Button, Form, FormItem, DatePicker, Cascader, Radio, RadioGroup } from 'element-ui';
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(DatePicker)
Vue.use(Cascader)
Vue.use(Radio)
Vue.use(RadioGroup)
export default {
	props: ['self', 'Guid', 'CustomGuid', 'ID', 'modal'],
	data() {
		return {
			intentionItem,
			telephoneStatus: [], // 话务状态
			form: {
				IntentionGrade: '',
				ClueStatus: [],
				NextCommucinateTime: '',
				CommucinateContent: '',
				TelTrafficStatus: ''
			},
			isLoading: false,
			getClueStatus: [], // 线索状态
			communicationRecord: [], // 沟通记录
			CommucinateStatus: '',
			ClueStatusProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
			},
			rules: {
				IntentionGrade: [
					{ required: true, message: ' ', trigger: 'change' }
				],
				ClueStatus: [
					{ required: true, type: 'array', message: ' ', trigger: 'change' }
				],
				TelTrafficStatus: [
					{ required: true, message: ' ', trigger: 'change' }
				],
				NextCommucinateTime: [
					{ required: true, type: 'date', message: ' ', trigger: 'change' }
				],
				CommucinateContent: [
					{ required: true, message: ' ', trigger: 'change' }
				],
			}
		}
	},
	methods: {
		submitCallOut() {
			this.isLoading = true;
			const { IntentionGrade, ClueStatus, NextCommucinateTime, CommucinateContent, TelTrafficStatus } = this.form;
				let params = {
					ClueGuid: this.Guid,
					callStatus: this.callStatus,
					IntentionGrade,
					CommucinateStatus: this.CommucinateStatus,
					ClueStatus: ClueStatus[ClueStatus.length - 1],
					NextCommucinateTime: number2DateTime(NextCommucinateTime),
					CommucinateContent,
					TelTrafficStatus
				}
			ClueFollowShortcut(params).then(ret => { // 沟通记录接口
				if (ret.status === 0) {
					Message({
						message: '保存成功',
						type: 'success'
					});
					this.isLoading = false;					
					this.modal.close();
				} else {
					this.isLoading = false;					
				}
			})
		},
		onCallStatus(status) { // 选择通话状态
			this.CommucinateStatus = status;
			this.submitCallOut();
		},
		goTrackging() { // 跳到跟进页面
			this.modal.close();
			document.body.style.overflow = 'hidden';
			const trackingShow = document.querySelector('#clues-tracking-show');
			trackingShow.style.right = '15px';
			let trackingGuid = {
				CustomGuid: this.CustomGuid,
				Guid: this.Guid
			}

			this.self.$store.dispatch('isTracking', true);
			this.self.$store.dispatch('cluesHighligheted', trackingGuid.Guid);
			this.self.$store.dispatch('getTrackingIds', trackingGuid);
		},
		onPhoneStatus(even) { // 话务状态
			if (even) {
				GetDictionaryByTypeId({ dicType: '10042' }).then(ret => {
					if (ret.status === 0) {
						this.telephoneStatus = ret.result;
					}
				})
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.submitCallOut();
				}
			})
		},
		cancelForm() { // 取消
			this.modal.close();
		},
		getExtStatus() {//获取电话状态
			let queryParm = { UserNo: this.userInfo.UserId, ExtNo: this.userInfo.PartialPhone };
			this.self.$store.dispatch('getExtStatus', queryParm);
		}
	},
	mounted() {
		let vSelf = this;
		setTimeout(function() { vSelf.getExtStatus() }, 2500);
	},
	created() {
		const recordId = {
			userId: this.CustomGuid, // 用户ID
			clueId: this.Guid // 线索ID
		}
		GetClueStatusTree().then(ret => { // 线索状态
			if (ret.status === 0) {
				this.getClueStatus = ret.result;
			}
		});
		GetCommunicateRecords(recordId).then(ret => { // 沟通记录接口
			if (ret.status === 0) {
				this.communicationRecord = ret.result;
			}
		}),
			this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
	}
}
</script>
