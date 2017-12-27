<template>
	<div>
		<div v-if="CallInData.HasClue">
			<call-repeat :call-repeat="CallInData" :call-from-no="CallFromNo" :call-modal="modal"></call-repeat>
		</div>
		<div v-else>
			<call-new :call-from-no="CallFromNo" :call-modal="modal"></call-new>
		</div>
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
import { mapState, mapActions } from 'vuex';
import { number2DateTime } from '../../util/util';
import { CallInClues } from '../../api/message';
import CallNew from './CallModuleNew.vue';
import CallRepeat from './CallModuleRepeat.vue';
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
	props: ['self', 'CallInData', 'modal', 'CallFromNo'],
	components: {
		CallNew,
		CallRepeat
	},
	data() {
		return {

		}
	},
	methods: {
		//获取电话状态
	},
	mounted() {
		// let phoneNo = {phoneNo: this.fromNo};
		// CallInClues(phoneNo).then(ret => {
		// 	if (ret.status === 0) {
		// 		this.HasClue = ret.result.HasClue;
		// 		this.CallInData = ret.result;
		// 		this.$store.dispatch('getCallInClues', ret.result);
		// 	}
		// })
		let vSelf = this;
		setTimeout(function() {
			let queryPrm = { UserNo: vSelf.userInfo.UserId, ExtNo: vSelf.userInfo.PartialPhone };
			vSelf.self.$store.dispatch('getExtStatus', queryPrm);
		}, 1000);
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
	}
}
</script>
