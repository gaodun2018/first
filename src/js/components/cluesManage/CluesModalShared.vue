<template>
<div>
	<div class="clues-shared-style" v-loading="loading" v-if="SearchClue.CurrentClue">
		<el-row style="color: #222d3c">
			<el-col v-for="(item, index) in tabHeader" :key="index" :span="item.span">
				<div>{{item.header}}</div>
			</el-col>
		</el-row>
		<el-row class="clues-shared-table" :span="24">
			<el-col :span="4">
				<div style="line-height:30px;">{{SearchClue.CurrentClue.ClueNo}}</div>
			</el-col>
			<el-col :span="3">
				<div style="line-height:30px;">
					<div>{{SearchClue.CurrentClue.ClueOwner}}</div>
				</div>
			</el-col>
			<el-col :span="4">
				<div style="line-height:30px;">{{SearchClue.CurrentClue.CourseType}}</div>
			</el-col>
			<el-col :span="3">
				<div style="line-height:30px;">{{SearchClue.CurrentClue.ClueStatus}}</div>
			</el-col>
			<el-col :span="6" class="shared-item">
				<el-tooltip class="item" effect="light" placement="bottom">
					<span class="beyond-hidden-2" style="height: 30px;word-break:break-all">{{SearchClue.CurrentClue.CommucinateList&&SearchClue.CurrentClue.CommucinateList.length>0?SearchClue.CurrentClue.CommucinateList[0].CommucinateContent:""}}</span>
					<div slot="content" class="c-tip-content-box">
						<div class="commucinate-item" v-for="(c,cIndex) in SearchClue.CurrentClue.CommucinateList" :key="cIndex">
							{{c.CommucinateDate}} - {{c.Creator}} - <span style="color:#8f9aac;">{{c.CommucinateContent}}</span>
						</div>
					</div>
				</el-tooltip>
			</el-col>
			<el-col :span="4">
				<div style="line-height:30px;">{{SearchClue.CurrentClue.LastCommunicateTime}}</div>
			</el-col>
		</el-row>
		<div v-if="SearchClue.OtherClues">
			<el-row class="clues-shared-list" v-for="item in SearchClue.OtherClues" :key="item.ClueNo">
				<el-col :span="4" class="shared-item">
					<div style="line-height:30px;">{{item.ClueNo}}</div>
				</el-col>
				<el-col :span="3" class="shared-item">
					<div style="line-height:30px;">{{item.ClueOwner}}</div>
				</el-col>
				<el-col :span="4" class="shared-item">
					<div style="line-height:30px;">{{item.CourseType}}</div>
				</el-col>
				<el-col :span="3" class="shared-item">
					<div style="line-height:30px;">{{item.ClueStatus}}</div>
				</el-col>
				<el-col :span="6" class="shared-item">
					<el-tooltip class="item" effect="light" placement="bottom">
						<span class="beyond-hidden-2" style="height: 30px;word-break:break-all">{{item.CommucinateList&&item.CommucinateList.length>0?item.CommucinateList[0].CommucinateContent:""}}</span>
						<div slot="content" class="c-tip-content-box">
							<div class="commucinate-item" v-for="(c,cIndex) in item.CommucinateList" :key="cIndex">
								{{c.CommucinateDate}} - {{c.Creator}} - <span style="color:#8f9aac;">{{c.CommucinateContent}}</span>
							</div>
						</div>
					</el-tooltip>
				</el-col>
				<el-col :span="4" class="shared-item">
					<div style="line-height:30px;">{{item.LastCommunicateTime}}</div>
				</el-col>
			</el-row>
		</div>
	</div>
	<div style="text-align: center; font-size: 14px" v-else>暂无数据</div>
	
</div>
</template>
<style scoped>
	.tip-item {
      margin: -40px;
    }

	.commucinate-item{
		line-height:20px;
		border-bottom: 1px dashed #ccc;
		margin-bottom: 5px;
	}
	.c-tip-content-box{
		max-height:300px;
		width:350px;
		overflow-y:scroll;
	}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { SearchShareClue } from '../../api/cluesManage.js';

export default {
	props: ['self','Guid','CustomGuid'],
	data() {
		return {
			SearchClue: [],
			loading: true,
			tabHeader: [
				{
					header: '线索ID',
					span: 4,
				}, {
					header: '线索所属人',
					span: 3,
				}, {
					header: '线索所属项目',
					span: 4,
				}, {
					header: '线索状态',
					span: 3,
				},
				{
					header: '最后沟通内容',
					span: 6,
				}, 
				{
					header: '最后沟通时间',
					span: 4,
				}
			]
		};
	},
	mounted() {
		let getGuid = {
			clueid: this.Guid,
			customId: this.CustomGuid
		}
		SearchShareClue(getGuid).then(ret => {
			if (ret.status === 0) {
				this.loading = false;
				this.SearchClue = ret.result;
			} else {
				this.loading = false;
			}
		}).catch(() => {
			this.loading = false;
		})
	},
};
</script>