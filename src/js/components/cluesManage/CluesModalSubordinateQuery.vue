<template>
    <div>
        <div style="text-align: left" class="querySearch">
            <el-input style="width: 30%" placeholder="输入要检索的联系方式" v-model="searchValue"></el-input>
            <el-button type="primary" class="btnQuery" style="background: #42aedf;width:70px;position: relative;top:3px;margin-left:10px;height: 30px;" @click="CluesQuery">查询</el-button>
        </div>
        <div style="padding: 15px 0 0 0;">
			<el-table :data="JsonData"  border style="width: 100%">
				<el-table-column prop="ClueNo" label="线索ID"  align="center">
				</el-table-column>
				<el-table-column prop="ClueOwner" label="线索所属人"  align="center">
				</el-table-column>
				<el-table-column prop="CourseType" label="线索所属项目"  align="center">
				</el-table-column>
				<el-table-column prop="ClueStatus" label="线索状态"  align="center">
				</el-table-column>
				<el-table-column prop="LastCommunicateTime" label="末次沟通时间"  align="center">
				</el-table-column>	  
                 <el-table-column label="末次沟通记录" >
                            <template scope="scope">                                
                                <div @mouseover="removeCommunicatTip(scope.$index)">
                                    <el-tooltip :disabled="!communicatDisabled" :content="content" placement="bottom" effect="light">
                                        <span class="beyond-hidden" style="cursor: pointer;" @click.stop="showCommunicatTip(scope.$index, JsonData)">{{scope.row.CommunicatContent}}</span>
                                        <div slot="content" class="c-tip-content-box">
                                            <div class="commucinate-item" v-for="(c,cIndex) in showCommunicat" :key="cIndex">
                                                {{c.CommucinateDate}} - {{c.Creator}} - <span style="color:#8f9aac;">{{c.CommucinateContent}}</span>
                                            </div>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>       
				<el-table-column prop="EffectivelyChannelName" label="末次客户来源"  align="center">
				</el-table-column>		
				<el-table-column prop="Create_ByName" label="创建人"  align="center">
				</el-table-column>
			</el-table>
        </div>
    </div>
</template>
<style type="text/css">
	.clues-query-style .clues-query-table .el-col-6 
	{
		word-break: break-word;	
	}
    .querySearch input{
        height:30px;
    }
    .btnQuery span{
        position: relative;
        bottom: 4px;
    }
    
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { getClueOwner,GetCommucinateContentList} from '../../api/cluesManage';

 export default {
   data() {
        return {
        	searchValue:'',
            JsonData:[],
            communicatDisabled: false,
            showCommunicat: [],
        }
   },
   methods: {
        async CluesQuery() { // 模糊搜索
            let params = {
                contactNo:this.searchValue
            }
           this.getClueList(params);
        },
        getClueList:function(prm){
        	getClueOwner(prm).then(ret => { // 沟通记录接口
            if (ret.status === 0) {
            	var mydata=JSON.stringify(ret.result);
                this.JsonData =ret.result;
               
            }
          })
        },
        
        showCommunicatTip(index, rows) { // 查看更多沟通记录       
            GetCommucinateContentList(rows[index].ClueGuid).then((ret) => {
                if (ret.status === 0) {
                    this.showCommunicat = ret.result;
                    this.communicatDisabled = true;
                }
            })
        },
        removeCommunicatTip(index)
        {
            if (index != this.currIndex) {
                this.currIndex = index; 
                this.communicatDisabled = false;
            }
        },
     }  
   
  };
</script>