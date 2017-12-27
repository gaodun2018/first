<template>
	<div>
		<div style="text-align: center;margin: 10px 0; min-height: 190px">
			<el-upload :headers="apiHeader" v-model="fileList" drag :before-upload="beforeAvatarUpload" :on-success="uploadSuccess" ref="onUpload" :on-remove="uploadRemove" :on-change="handelChange" :auto-upload="false" :action="materialUpload">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
		</div>
		<div style="text-align: center">
			<el-button :disabled="isFile" :loading="loading" style="width: 70px" size="small" type="primary" @click="submitUpload">导入</el-button>
			<el-button type="text" @click="ondown">导入模版下载</el-button>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import { ImportClues } from '../../api/cluesManage.js';
import { getBaseUrl,getEnv } from '../../util/config';
import { CRM_TOKEN } from '../../util/keys';
import { getCookie } from 'cookieUtils';
export default {
	props: ['modal', 'self'],
	data() {
		return {
			loading: false,
			fileList: [],
			isFile: true,
			apiHeader: {}
		}
	},
	computed: {
		materialUpload() {
			return getBaseUrl() + '/ClueBatch/ImportClues';
		}
	},
	methods: {
		ondown() {
			window.location.href = "http://gaodun-crm.oss-cn-hangzhou.aliyuncs.com/CRM系统线索导入模版v1.0.xlsx";
		},
		submitUpload() {
			if (this.uploadPost(this.fileList[0])) {
				this.loading = true;
				this.$refs.onUpload.submit();
			}
		},
		beforeAvatarUpload(file) {
			const isExecl = file.name.substr(file.name.lastIndexOf(".")).toLowerCase() == '.xlsx' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
			if (!isExecl) {
				this.$message.error('只能上传xlsx格式');
				this.loading = false;
			}
			return isExecl;
		},
		uploadPost(file) {
			var xmlfile = this.$refs.onUpload;
			let flag = true;
			if (xmlfile.uploadFiles.length == 0) {
				this.$message({
					message: "请选择文件",
					type: "warning"
				});
				flag = false;
			}
			if (xmlfile.uploadFiles.length > 1) {
				this.$message({
					message: "一次只能上传一个文件",
					type: "warning"
				});
				flag = false;
			}
			return flag
		},
		handelChange(file, fileList) {
			if (fileList.length > 0) {
				this.isFile = false;
			}
		},
		uploadSuccess(response, file, fileList) {
			this.loading = false;
			setTimeout(() => {
				this.isFile = true;
			}, 50);
			if (response.status === 0) {
				this.$message({
					message: "导入成功",
					type: "success"
				});
			} else {
				this.$message({
					message: '导入失败，' + response.info,
					type: "warning"
				});
				this.fileList = [];
			}
		},
		uploadRemove(file, fileList) {
			if (fileList.length == 0) {
				this.isFile = true;
			}
		}
	},
	created() {
		let pre = getEnv();
        let gdsid = getCookie(`${pre}GDSID`);
		let token = 'Bearer ' + getCookie(CRM_TOKEN);
		this.apiHeader = { Authorization: token, GDSID: gdsid };
	}
};
</script>