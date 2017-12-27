<template>
	<el-row>
		<div style="margin-right: 5px">
			<el-col :sm="24" class="home-contact-table content-box-show">
				<div class="contact-title" style="padding-right: 55px">
					<p>当日紧急联系</p>
					<a v-bind:href="[`/#/sales/tracking?clueType=1001061&rd=${(new Date()).getTime()}`]">更多
						<i class="el-icon-d-arrow-right"></i>
					</a>
				</div>
				<div style="padding: 10px 20px">
					<template>
						<el-table :data="tableData" :row-class-name="tableRowClassName" border style="width: 100%">
							<el-table-column prop="TrueName" align="center" label="姓名" fixed="left" width="125">
							</el-table-column>
							<el-table-column label="手机" align="center" width="140">
								<template scope="scope">
									<div @mouseover="callTooltip(scope.$index)">
										<el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
											<span @click.stop="showCallTip(0, scope.$index, tableData)">{{scope.row.MainPhone}}</span>
										</el-tooltip>
										<a href="javascript:void(0)" style="margin-left: -4px" v-if="parseInt(scope.row.MainPhone)" @click.stop="callUpPhone(scope.$index, tableData)">
											<i class="tracking-phone-icon"></i>
										</a>
										<span v-else>--</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="国际电话" align="center" width="140">
								<template scope="scope">
									<div @mouseover="callTooltip(scope.$index)">
										<el-tooltip :disabled="!contactDisabled" :content="showContacts" placement="bottom" effect="light">
											<span @click.stop="showCallTip(1, scope.$index, tableData)">{{scope.row.ContactsNo}}</span>
										</el-tooltip>
										<a href="javascript:void(0)" style="margin-left: -4px" v-if="parseInt(scope.row.ContactsNo) >= 0" @click.stop="callUpContacts(scope.$index, tableData)">
											<i class="tracking-phone-icon"></i>
										</a>
										<span v-else>--</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="沟通记录" align="center" width="150">
								<template scope="scope">
									<span style="height: 48px" class="beyond-hidden-2" :title="scope.row.CommucinateContent">{{scope.row.CommucinateContent}}</span>
								</template>
							</el-table-column>
							<el-table-column v-for="item in contactItem" align="center" :key="item.label" :prop="item.prop" :label="item.label" width="121"></el-table-column>
							<el-table-column label="操作" width="100" align="center" fixed="right">
								<template scope="scope">
									<el-button type="text" size="small" class="operation-solid" @click="onClueTracking(scope.$index, tableData)">
										跟进
									</el-button>
									<el-button type="text" size="small" class="operation-solid">
										<a style="color: #20a0ff" target="_blank" v-bind:href="[`/#/clue/details?nid=520&nw=1&Guid=${tableData[scope.$index].ClueGuid}&CustomGuid=${tableData[scope.$index].CustomGuid}`]">详情</a>
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
			</el-col>
			<clues-tracking v-show="$store.state.cluesManage.isTracking" :class="$store.state.cluesManage.isTracking ? 'slideInRight' : 'slideOutRight'"></clues-tracking>
			<div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
		</div>
	</el-row>
</template>
<style>
#message-list {
	height: 223px;
	overflow: hidden;
}

#message-list li a {
	color: #5f6672;
}

#message-list li a:hover {
	text-decoration: underline;
	color: #479ad0;
}

.el-table-tel-icon img {
	vertical-align: middle;
}

.positive-emergency-red-row {
    background: #FFD2D2!important;
}
</style>
<script>
import Vue from 'vue';
import { format, getCallUp, number2DateTime } from '../../util/util';
import CluesTracking from '../cluesManage/CluesTracking.vue';
import { GetContactByUid } from '../../api/callCenter';
import { GetEmergencyClues } from '../../api/home';
import { CRM_USER_INFO } from '../../util/keys';
export default {
	name: 'clues-ememrgency-tracking',
	props: ['self'],
	components: { CluesTracking },
	data() {
		return {
			currIndex: -1,
			showPhone: "",
			showContacts: "",
			phoneDisabled: false,
			contactDisabled: false,
			isTracking: false,
			chooseGuid: "",
			tableData: [],
			contactItem: [{
				label: '感兴趣的项目',
				prop: "CourseType"
			}, {
				label: '上次沟通时间',
				prop: "LastCommucinateTime"
			}, {
				label: '预约沟通时间',
				prop: "NextCommucinateTime"
			}
			],
		}
	},
	mounted: function() {

	},
	methods: {
		tableRowClassName(row, index) { // 选中列表行高亮显示
			var currTime = number2DateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
			if (row.NextCommucinateTime < currTime) {
				return 'positive-emergency-red-row';
			}
			return '';
		},
		callTooltip(index) { // 显示电话明文
			if (index != this.currIndex) {
				this.currIndex = index;
				this.phoneDisabled = false;
				this.contactDisabled = false;
			}
		},
		showCallTip(type, index, rows) { // 显示电话号码
			if (((type == 0 && rows[index].MainPhone.indexOf('*') > -1) || (type == 1 && rows[index].ContactsNo.indexOf('*') > -1)) && this.unlocking('Show_Customer_Phone_ Clear')) {
				GetContactByUid({ phoneType: type, Uid: rows[index].Uid, mobile: type == 0 ? rows[index].MainPhone : rows[index].ContactsNo }).then((ret) => {
					if (ret.status === 0) {
						if (type === 0) {
							this.phoneDisabled = true;
							this.showPhone = ret.result || '号码有误';
						} else if (type === 1) {
							this.contactDisabled = true;
							this.showContacts = ret.result || '号码有误';
						}
					}
				})
			}
		},
		callUpPhone(index, rows) { //拨打电话
			getCallUp(this, rows[index].Uid, rows[index].MainPhone, 0, rows[index].CustomGuid, rows[index].ClueGuid)
		},
		callUpContacts(index, rows) { //拨打国际电话
			getCallUp(this, rows[index].Uid, rows[index].ContactsNo, 1, rows[index].CustomGuid, rows[index].ClueGuid)
		},
		hideTracking(flag) { // 隐藏跟进页面的弹层
			this.isTracking = flag;
			this.chooseGuid = '';
			document.body.style.overflow = 'auto';
		},
		onClueTracking(index, rows) { // 线索跟进
			let trackingGuid = {
				CustomGuid: rows[index].CustomGuid,
				Guid: rows[index].ClueGuid,
				Uid: rows[index].Uid
			}
			this.$store.dispatch('isTracking', true);
			this.$store.dispatch('getTrackingIds', trackingGuid);
		}
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
		GetEmergencyClues({ userId: this.userInfo.UserId }).then(ret => { // 个人业绩
			if (ret.status === 0) {
				this.tableData = ret.result || [];
			}
		});
	}
}
</script>
