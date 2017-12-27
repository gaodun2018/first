<template>
    <div class="module-clues-content clues-manage-style">
      <!--  <div class="clues-wrap">
            <div class="clues-layout-left">
                <div>
                    <el-row>
                        <el-col :span="14" class="clues-bnt-item" style="font-size: 0">
                            <span v-if="unlocking('CM_AddClue')" style="width: 75px;height: 26px;margin-right: 0px;" class="clues-new-add-bnt addNewuserIcon">
                                <a style="color: #49a1f6" target="_blank" href="/#/clue/addClientele?nid=521&nw=1">
                                    <i></i>
                                    <span>新增客户</span>
                            </a>
                            </span>
                            <span style="margin-left: 10px;display: inline-block; height: 30px;" v-for="item in cluesButTwo" :key="item.class">
                                <el-button class="cluesButton-icon" v-if="unlocking(`${item.funcKey}`)"
                                           style="width: 95px" @click="onCluesButton(item.name)">
                                    <i :class="item.class"></i>
                                    <span>{{item.value}}</span>
                            </el-button>
                            </span>
                            <span style="margin-left: 10px">
                                <span style="height: 30px" v-for="bnt in cluesButOne" :key="bnt.value">
                                    <el-button :loading="bnt.name == 'KickPool' && bntLoading" v-if="unlocking(`${bnt.funcKey}`)" style="margin-right: 10px"
                                            class="cluesButton-icon" :disabled="cluesGuid.length ? false : true"
                                            @click="onCluesButton(bnt.name)">
                                        <i :class="cluesGuid.length ? bnt.bntTrue : bnt.bntFalse"></i>
                                        <span>{{bnt.value}}</span>
                                </el-button>
                                </span>
                            </span>
                            <el-select v-show="viewData.length" style="top: -2px;" size="small" v-model="viewId" @clear="onClearRow" @change="onRewSelect" clearable filterable value-key="viewid" placeholder="请选择视图">
                                <el-option v-for="item in viewData" :key="item.viewid" :label="item.viewname" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <div class="clues-search" style="top: -2px;">
                                <el-input class="clues-manage-search-input" style="width: 300px" placeholder="线索ID、客户编号、手机、姓名、QQ、微信" v-model="searchValue" size="small" @focus="onFocusType" @blur="onBlurType">
                                    <el-button slot="append" icon="search" @click="quickQuery"></el-button>
                                </el-input>
                                <el-button type="text" class="clues-button-search" @click.stop="isSearch=!isSearch">
                                    {{!isSearch ? '高级搜索' : '快捷搜索'}}
                                </el-button>
                                <a href="javascript:void(0)" @click="onSettingTable">
                                    <i :class="{['setting-close']:!isSetting,['setting-open']:isSetting}"></i>
                                </a>
                                <div class="clues-search-select" style="width: 299px" v-show="isSelect">
                                    <ul>
                                        <li v-for="(item, index) in cluesTypeItem" :key="index" :class='{"f-active": SeachType == index+1}' @click.stop="onCluesType(index)">
                                            <span class="search-type-name" style="width: 85px">{{item.type}} </span>
                                            <span class="search-type-text">{{searchValue}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="isSearch" class="clues-conditions" style="padding-right: 0">
                    <el-form ref="form" :model="form" label-width="115px">
                        <div>
                            <el-row v-show="cluesRow.length ? viewForm.CreateStartTime : isSearch" class="row-form-item">
                                <el-form-item label="线索创建时间:" prop="CreateStartTime">
                                    <el-date-picker style="width: 100%" v-model="form.CreateStartTime" size="small" format="" type="daterange" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-row>
                            <el-row v-show=" cluesRow.length ? viewForm.xcUser : isSearch" class="row-form-item">
                                <el-form-item label="线索创建人:">
                                    <Tree ref="xcUser" width="100%" :data="createData" :value="xcUser" :onCheck="createTree" placeholder="请选择创建人"></Tree>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.NextCommunicateStartTime : isSearch" class="row-form-item">
                                <el-form-item label="下次沟通时间:" prop="NextCommunicateStartTime">
                                    <el-date-picker style="width: 100%" size="small" v-model="form.NextCommunicateStartTime" type="daterange" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.ClueOwerGetTime : isSearch" class="row-form-item">
                                <el-form-item label="所属人获得时间:" prop="ClueOwerGetTime">
                                    <el-date-picker style="width: 100%" v-model="form.ClueOwerGetTime" type="daterange" size="small" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.xsUser : isSearch" class="row-form-item">
                                <el-form-item label="线索所属人:">
                                    <Tree ref="xsUser" width="100%" :data="createData" :value="xsUser" :onCheck="ownerTree" placeholder="请选择所属人"></Tree>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.ClueStatus : isSearch" class="row-form-item">
                                <el-form-item label="线索状态:" prop="ClueStatus">
                                    &lt;!&ndash; <el-cascader style="width: 100%" filterable clearable size="small" v-model="form.ClueStatus" :options="cluesStatusData" :props="ClueStatusProps"></el-cascader> &ndash;&gt;
                                     <Tree ref="ClueStatus" width="100%" :data="cluesStatusData" :value="ClueStatus" :onCheck="clueStatusTree" placeholder="请选择线索状态"></Tree>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.CourseType : isSearch" class="row-form-item">
                                <el-form-item label="感兴趣的项目:" prop="CourseType">
                                    <el-select style="width: 100%" filterable v-model="form.CourseType" multiple placeholder="请选择" size="small">
                                        <el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.Profession : isSearch" class="row-form-item">
                                <el-form-item label="职业状态:" prop="Profession">
                                    <el-select style="width: 100%" filterable v-model="form.Profession" multiple placeholder="请选择" size="small">
                                        <el-option v-for="professional in professionalStatus" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.ClueQuality : isSearch" class="row-form-item">
                                <el-form-item label="优质线索类型:" prop="ClueQuality">
                                    <el-select style="width: 100%" filterable v-model="form.ClueQuality" multiple placeholder="请选择" size="small">
                                        <el-option v-for="item in optimalCluesType" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.czUser : isSearch" class="row-form-item">
                                <el-form-item label="重复咨询人:">
                                    <Tree ref="czUser" width="100%" :data="createData" value="czUser" :onCheck="repeatrTree" placeholder="请选择重复咨询人"></Tree>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.RepeatConsultationTime : isSearch" class="row-form-item">
                                <el-form-item label="重复咨询时间:" prop="RepeatConsultationTime">
                                    <el-date-picker style="width: 100%" v-model="form.RepeatConsultationTime" type="daterange" size="small" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.IntentionGrade : isSearch" class="row-form-item">
                                <el-form-item label="客户意向度:" prop="IntentionGrade">
                                    <el-select style="width: 100%" v-model="form.IntentionGrade" placeholder="请选择" filterable clearable size="small">
                                        <el-option v-for="intention in intentionDegreeData" :key="intention.Id" :label="intention.Name" :value="intention.Id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.lastCommunicateTime : isSearch" class="row-form-item">
                                <el-form-item label="末次沟通时间:" prop="lastCommunicateTime">
                                    <el-date-picker style="width: 100%" v-model="form.lastCommunicateTime" size="small" format="" type="daterange" placeholder="选择时间范围">
                                    </el-date-picker>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.SchoolName : isSearch" class="row-form-item">
                                <el-form-item label="学校:" prop="SchoolName">
                                    <el-autocomplete style="width: 100%" size="small" v-model="form.SchoolName" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" placeholder="请输入学校" @select="handleSelect"></el-autocomplete>
                                </el-form-item>
                            </el-row>
                            <el-row v-show="cluesRow.length ? viewForm.Major : isSearch" class="row-form-item">
                                <el-form-item label="专业:" prop="Major">
                                    <el-input style="width: 100%" v-model="form.Major" size="small"></el-input>
                                </el-form-item>
                            </el-row>
                            <div v-show="cluesRow.length || isCollapse" v-bind:class="!cluesRow.length ? 'conditions-bottom' : 'viewInline'">
                                <el-row v-show="cluesRow.length ? viewForm.xbNum : isSearch" class="row-form-item">
                                    <el-form-item label="销售拨打次数:" prop="SaleDialCountStart">
                                        <div style="display: inline-block">
                                            <el-input v-model="form.SaleDialCountStart" size="small" style="width: 46%"></el-input>
                                            -
                                            <el-input v-model="form.SaleDialCountEnd" size="small" style="width: 47%"></el-input>
                                        </div>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.xjNum : isSearch" class="row-form-item">
                                    <el-form-item label="销售接通次数:" prop="SaleConnetCountStart">
                                        <div style="display: inline-block">
                                            <el-input v-model="form.SaleConnetCountStart" size="small" style="width: 46%"></el-input>
                                            -
                                            <el-input v-model="form.SaleConnetCountEnd" size="small" style="width: 47%"></el-input>
                                        </div>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.xgNum : isSearch" class="row-form-item">
                                    <el-form-item label="销售未跟进天数:" prop="SaleFailureFollowCountStart">
                                        <div style="display: inline-block">
                                            <el-input v-model="form.SaleFailureFollowCountStart" size="small" style="width: 46%"></el-input>
                                            -
                                            <el-input v-model="form.SaleFailureFollowCountEnd" size="small" style="width: 47%"></el-input>
                                        </div>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.sSourceUser : isSearch" class="row-form-item">
                                    <el-form-item label="首次客户来源:">
                                        <Tree ref="sSourceUser" width="100%" :data="sourceData" :value="sSourceUser" :onCheck="FirstChannelCodeTree" placeholder="请选择首次客户来源"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.mSourceUser : isSearch" class="row-form-item">
                                    <el-form-item label="末次客户来源:">
                                        <Tree ref="mSourceUser" width="100%" :data="sourceData" :value="mSourceUser" :onCheck="EffectivelyChannelCodeTree" placeholder="请选择末次客户来源"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.marketingUser : isSearch" class="row-form-item">
                                    <el-form-item label="营销计划:" prop="ChannelCodeSub">
                                        <Tree ref="marketingUser" width="100%" :data="marketingData" :value="marketingUser" :onCheck="marketingTree" placeholder="请选择营销计划"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.channelUser : isSearch" class="row-form-item">
                                    <el-form-item label="来源渠道:">
                                        <Tree ref="channelUser" width="100%" :data="channelData" :value="channelUser" :onCheck="sourceChannelTree" placeholder="请选择来源渠道"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.city : isSearch" class="row-form-item">
                                    <el-form-item label="所在省市:" prop="selectProviceValue">
                                        <el-select v-model="form.selectProviceValue" class="tracking-text-font" size='small' style="width: 46%" placeholder="请选择省" clearable @change="changeProvice">
                                            <el-option v-for="item in Optionprovice" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                                            </el-option>
                                        </el-select>
                                        <span>-</span>
                                        <el-select v-model="form.selectCityValue" class="tracking-text-font" size='small' style="width: 47%" clearable placeholder="请选择市">
                                            <el-option v-for="item in OptionCity" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    &lt;!&ndash; <div> &ndash;&gt;
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.xlUser : isSearch" class="row-form-item">
                                    <el-form-item label="线索来源人:">
                                        <Tree ref="xlUser" width="100%" :data="createData" :value="xlUser" :onCheck="clueSourceTree" placeholder="请选择线索来源人"></Tree>
                                    </el-form-item>
                                    &lt;!&ndash; </div> &ndash;&gt;
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.Urgency : isSearch" class="row-form-item">
                                    <el-form-item label="客户沟通紧急度:" prop="Urgency">
                                        <el-select style="width: 100%" filterable v-model="form.Urgency" clearable placeholder="请选择" size="small">
                                            <el-option v-for="item in getUrgency" :key="item.Id" :label="item.Name" :value="item.Id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.IsShare : isSearch" class="row-form-item">
                                    <el-form-item label="共享线索:" prop="IsShare">
                                        <el-select style="width: 100%" filterable v-model="form.IsShare" placeholder="请选择" clearable size="small">
                                            <el-option key="3" label="是" value="1">
                                            </el-option>
                                            <el-option key="4" label="否" value="0">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.IsMerge : isSearch" class="row-form-item">
                                    <el-form-item label="合并线索:" prop="IsMerge">
                                        <el-select style="width: 100%" filterable v-model="form.IsMerge" clearable placeholder="请选择" size="small">
                                            <el-option key="1" label="是" value="1">
                                            </el-option>
                                            <el-option key="2" label="否" value="0">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.labelUser : isSearch" class="row-form-item">
                                    <el-form-item label="关联标签:">
                                        <Tree ref="labelUser" width="100%" :data="labelData" :value="labelUser" :onCheck="labelTree" placeholder="请选择标签"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.CommuKeywords : isSearch" class="row-form-item">
                                    <el-form-item label="沟通内容:" prop="CommuKeywords">
                                        <el-input style="width: 100%" v-model="form.CommuKeywords" size="small"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.ClueTurnTime : isSearch" class="row-form-item">
                                    <el-form-item label="流转时间:" prop="ClueTurnTime">
                                        <el-date-picker style="width: 100%" v-model="form.ClueTurnTime" size="small" format="" type="daterange" placeholder="选择时间范围">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.clueturnUser : isSearch" class="row-form-item">
                                    <el-form-item label="流转给:">
                                        <Tree ref="clueturnUser" width="100%" :data="createData" :value="clueturnUser" :onCheck="clueturnTree" placeholder="请选择流转人"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.preturnUser : isSearch" class="row-form-item">
                                    <el-form-item label="前任所属人:">
                                        <Tree ref="preturnUser" width="100%" :data="createData" :value="preturnUser" :onCheck="preturnTree" placeholder="请选择前任所属人"></Tree>
                                    </el-form-item>
                                </el-row>
                                <el-row v-show="cluesRow.length ? viewForm.EnrollmentYear : isSearch" class="row-form-item">
                                    <el-form-item label="入学年份" prop="EnrollmentYear">
                                        <el-date-picker v-model="form.EnrollmentYear" type="year" placeholder="选择年份" style="width: 100%" size="small"></el-date-picker>
                                    </el-form-item>
                                </el-row>
                            </div>
                        </div>
                        <div class="module-clues-collapse" :style="cluesRow.length ? 'margin: 0;border-top:0' : 'margin: 0 10px -10px -10px'">
                            <a v-if="!cluesRow.length" href="javascript:void(0)" class="clues-collapse" @click.stop="isCollapse=!isCollapse">
                                <i v-bind:class="{['collapse-icon-down el-icon-d-arrow-left']:isCollapse,['el-icon-d-arrow-left']:!isCollapse}"></i>
                                <span>{{isCollapse ? '收起' : '更多搜索条件'}}</span>
                            </a>
                            <el-form-item label-width="0" class="clues-collapse-but">
                                <el-button style="width: 70px" type="primary" size="small" @click.stop="onSubmit">查询
                                </el-button>
                                <el-button style="width: 70px" type="primary" size="small" @click.stop="onReset">清除条件
                                </el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div v-loading="loading" style="margin-top: 5px" :class="printClass(['CM_FollowClue','CRM_ClueFollow_ModifyInfo','CM_Sign up','CM_ListenInvitation','CM_SearchShareClue'])">
                    <table id="cluesDg" :style="{width:'100%',height: winHeight+'px'}"></table>
                    <div class="clues-pagination">
                        <div style="position: relative;top:5px;color: #48576a;display: inline-block" v-show="cluesGuid.length">已选中 {{cluesGuid.length}} 条</div>
                        <el-pagination style="display: inline-block" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 50, 100, 200, 300, 400]" :page-size="pageSize" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="cluesTotal" :page-count="10/pageSize">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <el-dialog title="沟通记录" :visible.sync="dialogVisible" size="small" @close="closeDialog">
                <div>
                    <div class="commucinate-item" v-for="(c,cIndex) in showCommunicat" :key="cIndex">
                        {{c.CommucinateDate}} - {{c.Creator}} - <span style="color:#8f9aac;word-break: break-all;">{{c.CommucinateContent}}</span>
                    </div>
                    <div v-if="!showCommunicat.length" style="text-align:center">暂无数据</div>
                </div>
            </el-dialog>
            <clues-tracking @trackingEmit="trackingEmit" ref="cluesTracking" v-show="$store.state.cluesManage.isTracking"></clues-tracking>
            <div class="traacking-cover" v-show="$store.state.cluesManage.isTracking"></div>
        </div>-->
    </div>
</template>
<style>
.clues_tracking,.clues_modify,.clues_enrol,.clues_audition,.clues_shared {
    display: none;
}
.CM_FollowClue .clues_tracking,.CRM_ClueFollow_ModifyInfo .clues_modify,.CM_Sign_up .clues_enrol,.CM_SearchShareClue .clues_shared,.CM_ListenInvitation .clues_audition{
    /* display: -webkit-inline-box; */
    display: block;
}
[field='MainPhone'] .datagrid-cell, [field='ContactsNo'] .datagrid-cell {
    overflow: inherit;
    position: relative;
}
.viewInline {
    display: inline;
}
.clues-manage-style .el-button.el-button--default.cluesButton-icon>span,
.clues-manage-style .addNewuserIcon>span {
    position: relative;
    bottom: 3px;
}

.clues-new-add-bnt {
    display: inline-block;
    line-height: 28px;
    position: relative;
    top: -2px;
}

.clues-manage-style .clues-wrap .el-form-item {
    margin-bottom: 10px;
}

.clues-manage-style .clues-table .el-pagination {
    text-align: right;
}

.clues-manage-style .el-dropdown {
    font-size: 12px;
    color: #20a0ff;
}

.clues-manage-style .el-button-border {
    padding-right: 5px;
    border-right: 1px solid #20a0ff;
    border-radius: inherit;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format, checkedUserTree, getCallUp } from '../util/util';
import { CRM_USER_INFO, CRM_ORDER_PAGEID, CRM_CLUES_DETAILS, CRM_CLUES_TRACKING } from '../util/keys';
import { cluesTable } from '../components/common/checkData.js';
import { cluesTypeItem } from '../components/common/cluesConfig.js';
import { parseUrl } from 'base';
import 'easyuiCss';
import 'easyui';
import {
    ClueVagueSeachList,
    interestedProject,
    intentionDegree,
    OptimalCluesType,
    cluesStatus,
    professionalStatus,
    Distribute,
    GetClueStatusTree,
    getProviceOrCity,
    GetDictionaryByTypeId,
    KickCluePool,
    GetBase_PageFieldConfig,
    GetCommucinateContentList,
    getValueSchools,
    GetAllowedUserTree,
    GetCustomerSourceTree,
    GetSourceDetailsTree,
    getchannels,
    GetLabelList,
    GetEsClueBaseList
} from '../api/cluesManage';
import { GetDefinitionViewInfo, GetViewNameList } from '../api/settingManage.js';
import { GetContactByUid } from '../api/callCenter';
import cluesModal from 'vueModal';
import Tree from '../plugins/tree/ExtendZTree.vue';
// import Tree from './Tree.vue';
import CluesTracking from '../components/cluesManage/CluesTracking.vue';
import CustomModal from '../components/cluesManage/CluesModalCustom.vue';

export default {
    components: { CluesTracking, Tree },
    data() {
        return {
            ClueSearchType: 1,
            cluesRow: [],
            viewData: [],
            viewId: '',
            winHeight: 0,
            bntLoading: false,
            getCluesTable: [],
            dialogVisible: false,
            cluesTable: [
                {
                field: 'MainPhone',
                width: 110,
                sortable:false,
                title: '手机',
                // sorter: this.localSorter,
                formatter: function(value, row, index) {
                    if (value) {
                        return `<textarea style="display:none;">${JSON.stringify(row)}</textarea><span class="clues-phone-number">${value}<div class="phone-number-tips"></div></span><span class="tracking-phone-icon clues-callphone"></span>`;
                    } else {
                        return '--';
                    }
                },
            }, {
                field: 'ContactsNo',
                width: 110,
                sortable: false,
                title: '国际电话',
                // sorter: this.localSorter,
                formatter: function(value, row, index) {
                    if (parseInt(value) >= 0) {
                        return `<textarea style="display:none;">${JSON.stringify(row)}</textarea><span class="clues-call-number">${value}<div class="phone-number-tips"></div></span><span class="tracking-phone-icon clues-callTell"></span>`;
                    } else {
                        return '--';
                    }
                }
            }, {
                field: 'CourseType',
                width: 115,
                sortable: true,
                title: '感兴趣项目',
                formatter:this.formatterVal
            }, {
                field: 'ClueOwner',
                width: 110,
                sortable: true,
                title: '线索所属人',
                formatter:this.formatterVal
            }, {
                field: 'ClueStatus',
                width: 120,
                sortable: true,
                title: '线索状态',
                formatter:this.formatterVal
            }, {
                field: 'IntentionGrade',
                width: 100,
                sortable: true,
                title: '客户意向度',
                formatter:this.formatterVal
            }, {
                field: 'UrgencyName',
                width: 100,
                sortable: true,
                title: '客户沟通紧急度',
                formatter:this.formatterVal
            }, {
                width: 80,
                field: 'Province_City',
                sortable: true,
                title: '所在省市',
                formatter:this.formatterVal
            }, {
                field: 'SchoolName',
                width: 110,
                sortable: true,
                title: '学校',
                formatter:this.formatterVal
            }, {
                field: 'Major',
                width: 110,
                sortable: true,
                title: '专业',
                formatter:this.formatterVal
            }, {
                field: 'EnrollmentYearStr',
                width: 70,
                sortable: true,
                title: '入学年份',
                formatter:this.formatterVal
            }, {
                field: 'QQ',
                width: 80,
                sortable: false,
                title: 'QQ',
                // sorter: this.localSorter,
                formatter:this.formatterVal
            }, {
                field: 'Email',
                width: 100,
                sortable: false,
                // sorter: this.localSorter,
                title: '邮箱',
                formatter:this.formatterVal
            }, {
                field: 'Weixin',
                width: 80,
                sortable: false,
                // sorter: this.localSorter,
                title: '微信',
                formatter:this.formatterVal
            }, {
                width: 70,
                field: 'Profession',
                sortable: true,
                title: '职业状态',
                formatter:this.formatterVal
            }, {
                width: 70,
                field: 'TrafficState',
                sortable: true,
                title: '话务状态',
                formatter:this.formatterVal
            }, {
                field: 'ClueLabelStr',
                width: 125,
                sortable: true,
                title: '关联标签',
                formatter:this.formatterVal
            }, {
                field: 'FirstChannelCode',
                width: 120,
                sortable: true,
                title: '首次客户来源',
                formatter:this.formatterVal
            }, {
                field: 'EffectivelyChannelCode',
                width: 120,
                sortable: true,
                title: '末次客户来源',
                formatter:this.formatterVal
            }, {
                field: 'ChannelCodeSub',
                width: 120,
                sortable: true,
                title: '营销计划',
                formatter:this.formatterVal
            }, {
                field: 'SourceChannelName',
                width: 120,
                sortable: true,
                title: '来源渠道',
                formatter:this.formatterVal
            }, {
                field: 'ClueQuality',
                width: 120,
                sortable: true,
                title: '优质线索类型',
                formatter:this.formatterVal
            }, {
                field: 'CommunicatContent',
                width: 160,
                sortable: true,
                title: '沟通记录',
                formatter: function(value, row, index) {
                    return `<div title="${value}" class="communicat_content beyond-hidden-2">${value}</div><textarea style="display:none">${JSON.stringify(row.Guid)}</textarea>`
                }
            }, {
                field: 'CustomNo',
                width: 120,
                sortable: true,
                title: '客户编号',
                formatter:this.formatterVal
            }, {
                field: 'id',
                width: 120,
                sortable: true,
                title: '线索ID',
                formatter:this.formatterVal
            }, {
                field: 'Create_By',
                width: 110,
                sortable: true,
                title: '线索创建人',
                formatter:this.formatterVal
            }, {
                field: 'RepeatConsultationOwner',
                width: 110,
                sortable: true,
                title: '重复咨询人',
                formatter:this.formatterVal
            }, {
                field: 'ClueSource',
                width: 110,
                sortable: true,
                title: '线索来源人',
                formatter:this.formatterVal
            }, {
                field: 'RepeatConsultationTime',
                width: 125,
                sortable: true,
                title: '重复咨询时间',
                formatter:this.formatterVal
            }, {
                field: 'RepeatConsultationCount',
                width: 100,
                sortable: true,
                title: '重复咨询次数',
                formatter:this.formatterVal
            }, {
                field: 'Create_Time',
                width: 125,
                sortable: true,
                title: '创建时间',
                formatter:this.formatterVal
            }, {
                field: 'LastCommunicateTime',
                width: 125,
                sortable: true,
                title: '末次沟通时间',
                formatter:this.formatterVal
            }, {
                field: 'NextCommunicateTime',
                width: 125,
                sortable: true,
                title: '下次沟通时间',
                formatter:this.formatterVal
            }, {
                field: 'ClueOwerGetTime',
                width: '185',
                sortable: true,
                title: '当前所属人获得时间',
                formatter:this.formatterVal
            }, {
                field: 'ExamDate',
                width: 125,
                sortable: true,
                title: '考试时间',
                formatter:this.formatterVal
            }, {
                field: 'ClueSaleOwner',
                width: 100,
                sortable: true,
                title: '所属销售',
                formatter:this.formatterVal
            }, {
                field: 'ClueSchoolManagerOwner',
                width: 100,
                sortable: true,
                title: '所属学管',
                formatter:this.formatterVal
            }, {
                field: 'SaleFailureFollowCount',
                width: 100,
                sortable: true,
                title: '销售未跟进天数',
                formatter:this.formatterVal
            }, {
                field: 'SaleDialCount',
                width: 100,
                sortable: true,
                title: '销售拨打次数',
                formatter:this.formatterVal
            }, {
                field: 'SaleConnetCount',
                width: 100,
                sortable: true,
                title: '销售接通次数',
                formatter:this.formatterVal
            }, {
                field: 'SchoolManagerGetTime',
                width: 125,
                sortable: true,
                title: '学管获得时间',
                formatter:this.formatterVal
            }, {
                field: 'Old_ClueGuid',
                width: 100,
                sortable: true,
                title: '合并线索',
                formatter:this.formatterVal
            }, {
                field: 'field',
                title: '操作',
                width: 170,
                align: 'center',
                formatter: this.formatOper
            }
        ],
            phoneDisabled: false,
            showPhone: '号码读取中',
            contactDisabled: false,
            showContacts: '号码读取中',
            showCommunicat: [],
            isSetting: false, // 自定义显示列
            cluesTypeItem, // 模糊搜索下来框选项
            timer: null,
            createData: [], // 人员树
            sourceData: [], // 客户来源
            marketingData: [], // 营销计划
            channelData: [], // 渠道
            labelData: [], // 标签
            xcUser: [], // 线索创建人
            xsUser: [], // 所属人
            xlUser: [], // 线索来源人
            czUser: [], // 重复咨询人
            clueturnUser: [],
            preturnUser: [],
            labelUser: [], //标签列表
            marketingUser: [],
            channelUser: [],
            sSourceUser: [],
            mSourceUser: [],
            ClueisSaleOwner: [], // 所属销售
            Submitter: [], // 线索提交人
            treeStatus: '', // 当前人员树
            saleOwnerFilter: '',
            learningOwner: '',
            objParams: {},
            currIndex: -1,
            ClueStatusProps: { // 线索状态
                value: 'Id',
                label: 'Name',
                children: 'ChildrenList'
            },
            createUserIds: '', // 创建人
            ClueOwner: [], // 所属人
            ClueSchoolManagerOwner: [], // 所属学管
            cluesData: [], // 线索列表数据
            cluesGuid: [], // 获取Guid
            chooseGuid: '', // 高亮显示的行
            Optionprovice: [], //省份集合
            OptionCity: [], //城市集合
            getUrgency: {}, // 客户沟通紧急度
            trackingGuid: {}, // 跟进页使用Guid
            isSelect: false,
            isCollapse: false,
            isSearch: false,
            loading: false,
            searchValue: '',
            cluesTotal: 0,
            pageSize: 20,
            custonDate: [],
            currentPage: 1,
            SeachType: 1,
            intentionDegreeData: [],
            interestedProject: [],
            optimalCluesType: [],
            cluesStatusData: [],
            professionalStatus: [],
            viewForm: {},
            form: {
                IntentionGrade: '',
                selectCityValue: '',
                selectProviceValue: '',
                Urgency: '',
                CreateStartTime: [],
                ClueQuality: '',
                NextCommunicateStartTime: [],
                SaleDialCountStart: '',
                SaleDialCountEnd: '',
                CourseType: '',
                SaleFailureFollowCountStart: '',
                SaleFailureFollowCountEnd: '',
                SaleConnetCountStart: '',
                SaleConnetCountEnd: '',
                optimalType: '',
                ClueStatus: [],
                ClueOwerGetTime: [],
                RepeatConsultationTime: [],
                IsMerge: '',
                IsShare: '',
                salesGetTime: '',
                ExamDate: '',
                Profession: [],
                RepeatConsultationCountStart: '',
                RepeatConsultationCountEnd: '',
                SubmitTime: '',
                SchoolManagerStartGetTime: '',
                SchoolManagerEndGetTime: '',
                CommuKeywords: '',
                lastCommunicateTime: [],
                SchoolName: '',
                Major: '',
                School: '',
                ClueTurnTime: [],
                EnrollmentYear: ''
            },
            cluesButOne: [{
                value: '线索分配',
                name: 'cluesDistribution',
                bntTrue: 'cluesDistributionIcon',
                bntFalse: 'cluesDistributionGray',
                funcKey: 'CM_ClueDistribute'
            }, {
                value: '踢回公池',
                name: 'KickPool',
                bntTrue: 'cluesRemovIcon',
                bntFalse: 'cluesRemovgray',
                funcKey: 'CM_KickPool'
            }, {
                value: '添加标签',
                name: 'addLabel',
                bntTrue: 'addNewuser',
                bntFalse: 'addNewuserWhite',
                funcKey: 'CM_ClueLael'
            }],
            cluesButTwo: [{
                value: '所属人查询',
                name: 'SubordinateQuery',
                class: 'cluesQueryIcon',
                funcKey: 'CM_SearchClueOwner'
            }, {
                value: '线索导入',
                name: 'cluesImport',
                class: 'cluesImportIcon',
                funcKey: 'CM_ImportClues'
            }],
            multipleSelection: [],
            sortName: '',
            sortType: 1
        }
    },
    methods: {
        closeDialog() { // 沟通记录关闭
            this.dialogVisible = false;
        }, 

        trackingEmit(emit) { // 跟进页
            if (emit) {
                this.getCluleDataList(); // 线索列表接口
            };
        },
        onClearRow() {
            this.onReset();
        },
        onRewSelect(item) { // 视图
            this.isSearch = false;
            this.cluesRow = [];
            const { viewid, viewname } = item;
            let view = {
                viewpageid: 291,
                viewid,
                viewname
            }
            this.viewForm.CreateStartTime = false;
            this.viewForm.xcUser = false;
            this.viewForm.NextCommunicateStartTime = false;
            this.viewForm.ClueTurnTime = false;
            this.viewForm.ClueOwerGetTime = false;
            this.viewForm.xsUser = false;
            this.viewForm.ClueStatus = false;
            this.viewForm.CourseType = false;
            this.viewForm.Profession = false;
            this.viewForm.ClueQuality = false;
            this.viewForm.czUser = false;
            this.viewForm.RepeatConsultationTime = false;
            this.viewForm.IntentionGrade = false;
            this.viewForm.lastCommunicateTime = false;
            this.viewForm.SchoolName = false;
            this.viewForm.Major = false;
            this.viewForm.xbNum = false;
            this.viewForm.xjNum = false;
            this.viewForm.xgNum = false;
            this.viewForm.sSourceUser = false;
            this.viewForm.mSourceUser = false;
            this.viewForm.marketingUser = false;
            this.viewForm.channelUser = false;
            this.viewForm.city = false;
            this.viewForm.xlUser = false;
            this.viewForm.Urgency = false;
            this.viewForm.IsShare = false;
            this.viewForm.IsMerge = false;
            this.viewForm.labelUser = false;
            this.viewForm.CommuKeywords = false;
            this.viewForm.clueturnUser = false;
            this.viewForm.preturnUser = false;
            this.viewForm.EnrollmentYear = false;
            if (viewid) {
                this.isSearch = true;
                this.GetDefinitionViewInfoData(view);
            }
        },
        GetDefinitionViewInfoData(view) {
            GetDefinitionViewInfo(view).then(ret => {
                if (ret.status === 0) {
                    this.clearForm();
                    this.cluesRow = JSON.parse(ret.result);
                    for (let i = 0; i < this.cluesRow.length; i++) {
                        let cluesRow = this.cluesRow[i];
                        this.viewForm[cluesRow.type] = true;
                        if (cluesRow.type.indexOf('User') > -1) {
                            this[cluesRow.type] = cluesRow.value;
                            setTimeout(() => {
                                this.$refs[cluesRow.type].setChecked(this[cluesRow.type]);
                            }, 10)
                        } else {
                            this.form[cluesRow.type] = cluesRow.value;
                            if (cluesRow.type == 'xbNum') {
                                this.form.SaleDialCountStart = cluesRow.value;
                                this.form.SaleDialCountEnd = cluesRow.values;
                            }
                            if (cluesRow.type == 'xjNum') {
                                this.form.SaleConnetCountStart = cluesRow.value;
                                this.form.SaleConnetCountEnd = cluesRow.values;
                            }
                            if (cluesRow.type == 'xgNum') {
                                this.form.SaleFailureFollowCountStart = cluesRow.value;
                                this.form.SaleFailureFollowCountEnd = cluesRow.values;
                            }
                            if (cluesRow.type == 'city') {
                                this.form.selectProviceValue = cluesRow.value;
                                this.form.selectCityValue = cluesRow.values;
                            }
                            if (cluesRow.type == 'ClueStatus') {
                                this.form.ClueStatus = cluesRow.value;
                            }
                            if (cluesRow.type == 'SchoolName') {
                                this.form.School = cluesRow.values;
                            }
                            if (cluesRow.type == 'EnrollmentYear') {
                                this.form.EnrollmentYear = cluesRow.values;
                            }

                            if (cluesRow.type.indexOf('Time') > -1) {
                                this.form[cluesRow.type] = (cluesRow.value !== undefined && cluesRow.value[0] !== null) ? cluesRow.value : [new Date(), new Date()];
                            }
                        }
                    }
                    this.onSubmit()
                }
            })
        },

        handleSelect(item) {
            this.form.School = item.Id;
        },
        createStateFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearchAsync(queryString, cb) { // 模糊搜索学校
            if (queryString.length > 1) {
                getValueSchools({ name: queryString }).then(ret => {
                    if (ret.status === 0) {
                        let restaurants = ret.result;
                        let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                        cb(results);
                    }
                })
            }
        },
        /*Tree*/
        createTree(val) { // 创建人
            this.xcUser = val;
        },
        ownerTree(val) { // 所属人
            this.xsUser = val;
        },
        repeatrTree(id) { // 重复咨询人
            this.czUser = id;
        },
        clueSourceTree(val) { // 线索来源人
            this.xlUser = val;
        },

        sourceChannelTree(val) { // 来源渠道
            this.channelUser = val;
        },
        FirstChannelCodeTree(val) { // 首次来源渠道
            this.sSourceUser = val;
        },
        EffectivelyChannelCodeTree(val) { // 末次客户来源
            this.mSourceUser = val;
        },
        marketingTree(val) { // 营销计划
            this.marketingUser = val;
        },
        labelTree(val) { // 标签
            this.labelUser = val;
        },
        clueturnTree(val) {
            this.clueturnUser = val;
        },
        preturnTree(val) {
            this.preturnUser = val;
        },
        clueStatusTree(val){ //线索状态
            this.ClueStatus = val; 
        },
        /*Tree*/

        onCluesButton(val) { // 线索列表上方按钮事件
            switch (val) {
                case 'cluesMerge':
                    alert('暂不实现');
                    break;
                case 'cluesDistribution':
                    if (this.cluesGuid.length > 0) {
                        require.ensure([], (require) => {
                            let Distribution = require("../components/cluesManage/CluesModalCluesDistribution.vue");
                            cluesModal.openComponent(Distribution, {
                                title: '线索分配',
                                disablePopEvent: true,
                                showCancelButton: false,
                                showConfirmButton: false,
                                width: '500px',
                                height: '380px',
                                self: this,
                                callback: (flag, self) => {
                                    if (self.content.isDistribute) {
                                        this.getCluleDataList(true);
                                    };
                                }
                            }).then((modal) => {});
                        }, 'distribution');
                    } else {
                        this.$message({
                            message: '要先选择线索才进行下一步操作哦',
                            type: 'warning'
                        });
                    }
                    break;
                case 'KickPool':
                    if (this.cluesGuid.length > 0) {
                        this.bntLoading = true;
                        KickCluePool({ CluesIds: this.cluesGuid, UserIds: '' }).then(ret => {
                             this.bntLoading = false;
                            if (ret.status === 0) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.cluesGuid = [];
                                this.getCluleDataList();
                            } else {
                                this.$message({
                                    message: ret.info,
                                    type: 'warning'
                                });
                            }
                        })
                    }
                    break;
                case 'cluesImport':
                    require.ensure([], (require) => {
                        let CluesImport = require("../components/cluesManage/CluesModalImport.vue");
                        cluesModal.openComponent(CluesImport, {
                            title: '线索导入',
                            showCancelButton: false,
                            showConfirmButton: false,
                            width: '500px',
                            self: this,
                            callback: (flag, self) => {}
                        }).then((modal) => {});
                    }, 'cluesImport');
                    break;
                case 'SubordinateQuery':
                    require.ensure([], (require) => {
                        let SubordinateQuery = require("../components/cluesManage/CluesModalSubordinateQuery.vue");
                        cluesModal.openComponent(SubordinateQuery, {
                            title: '所属人查询',
                            showCancelButton: false,
                            showConfirmButton: false,
                            width: '950px',
                            self: this,
                            callback: (flag, self) => {}
                        }).then((modal) => {});
                    }, 'subordinateQuery');
                    break;
                case 'addLabel':
                    if (this.cluesGuid.length > 0) {
                        require.ensure([], (require) => {
                            let AddLabel = require("../components/cluesManage/AddLabel.vue");
                            cluesModal.openComponent(AddLabel, {
                                title: '添加标签',
                                disablePopEvent: true,
                                showCancelButton: false,
                                showConfirmButton: false,
                                width: '500px',
                                height: '450px',
                                self: this,
                                callback: (flag, self) => {
                                }
                            }).then((modal) => {});
                        }, 'AddLabel');
                    } else {
                        this.$message({
                            message: '要先选择线索才进行下一步操作哦',
                            type: 'warning'
                        });
                    }
                    break;
            }
        },
        callUpPhone(rows) { //拨打电话
            getCallUp(this, rows.Uid, rows.MainPhone, 0, rows.CustomGuid, rows.Guid)
            if (this.$store.state.cluesManage.isTracking) {
                let trackingGuid = {
                    data: rows,
                    CustomGuid: rows.CustomGuid,
                    Guid: rows.Guid,
                    ID: rows.id,
                    Uid: rows.Uid
                }
                this.$store.dispatch('getTrackingIds', trackingGuid);
            }
        },
        callUpContacts(rows) { //拨打国际电话
            getCallUp(this, rows.Uid, rows.ContactsNo, 1, rows.CustomGuid, rows.Guid)
            if (this.$store.state.cluesManage.isTracking) {
                let trackingGuid = {
                    data: rows,
                    CustomGuid: rows.CustomGuid,
                    Guid: rows.Guid,
                    ID: rows.id,
                    Uid: rows.Uid
                }
                this.$store.dispatch('getTrackingIds', trackingGuid);
            }
        },
        showCallTip(type, rows, self) { // 显示电话号码
            if (((type == 0 && rows.MainPhone.indexOf('*') > -1) || (type == 1 && rows.ContactsNo.indexOf('*') > -1)) && this.unlocking('Show_Customer_Phone_ Clear')) {
                GetContactByUid({
                    phoneType: type,
                    Uid: rows.Uid,
                    mobile: type == 0 ? rows.MainPhone : rows.ContactsNo
                }).then((ret) => {
                    if (ret.status === 0) {
                        $(self).children('div').css('display','block')
                        $(self).children('div').html(ret.result || '号码有误');
                    }
                })
            }
        },

        showCommunicatTip(Guid) { // 查看更多沟通记录
            GetCommucinateContentList(Guid).then((ret) => {
                if (ret.status === 0) {
                    this.showCommunicat = ret.result;
                }
            })
        },

        onClueTracking(rows, type) { // 线索跟进
            this.$store.dispatch('isTracking', true);
            let trackingGuid = {
                data: rows,
                CustomGuid: rows.CustomGuid,
                Guid: rows.Guid,
                ID: rows.id,
                Uid: rows.Uid,
                type
            }
            this.$store.dispatch('getTrackingIds', trackingGuid);
        },

        onSettingTable() { // 弹出框 => 自定义显示列
            this.isSetting = true;
            require.ensure([], (require) => {
                let CluesSetting = require("../components/cluesManage/CluesModalSettingTable.vue");
                cluesModal.openComponent(CluesSetting, {
                    title: '设置显示字段',
                    showCancelButton: false,
                    showConfirmButton: false,
                    table: this.cluesTable,
                    width: '800px',
                    height: '590px',
                    self: this,
                    callback: (flag, self) => {
                        this.isSetting = false;
                    }
                })
            }, 'cluesSetting');
            return;
        },
        onAdvancedSearch() { // 高级搜索折叠
            this.isSearch = !this.isSearch;
        },
        clearForm() { // 清空条件
            this.$refs['form'].resetFields();
            this.$refs.xcUser.$emit('resetTree');
            this.$refs.xsUser.$emit('resetTree');
            this.$refs.czUser.$emit('resetTree');
            this.$refs.sSourceUser.$emit('resetTree');
            this.$refs.mSourceUser.$emit('resetTree');
            this.$refs.channelUser.$emit('resetTree');
            this.$refs.xlUser.$emit('resetTree');
            this.$refs.marketingUser.$emit('resetTree');
            this.$refs.labelUser.$emit('resetTree');
            this.$refs.clueturnUser.$emit('resetTree');
            this.$refs.preturnUser.$emit('resetTree');
            this.form.SaleFailureFollowCountEnd = '';
            this.form.SaleConnetCountEnd = '';
            this.form.SaleDialCountEnd = '';
            this.form.selectCityValue = '';
            this.xsUser = []; // 所属人
            this.xcUser = []; // 线索创建人
            this.xlUser = []; // 线索来源人
            this.czUser = []; // 重复咨询人
            this.preturnUser = [];
            this.labelUser = []; //标签列表
            this.clueturnUser = [];
            this.marketingUser = [];
            this.channelUser = [];
            this.sSourceUser = [];
            this.mSourceUser = [];
            this.form.School = "";
            this.$refs.ClueStatus.$emit('resetTree');
            this.ClueStatus=[];
        },
        onReset() {
            this.clearForm();
            this.getCluleDataList(true);
        },
        onSubmit() { // 线索高级搜索
            if (!this.form.SchoolName) {
                this.form.School = "";
            }
            this.getCluleDataList();
        },

        quickQuery() { // 模糊搜索
            this.currentPage = 1;
            this.ClueSearchType = 2;
            this.getCluleDataList();
        },
        getCluleDataList(isFirst) {
            this.loading = true;
        const {
                SaleConnetCountStart,
                CreateStartTime,
                salesGetTime,
                SaleConnetCountEnd,
                RepeatConsultationTime,
                SchoolManagerStartGetTime,
                SaleFailureFollowCountStart,
                SaleFailureFollowCountEnd,
                SaleDialCountStart,
                CourseType,
                ClueQuality,
                Profession,
                NextCommunicateStartTime,
                ClueTurnTime,
                EnrollmentYear,
                ClueOwerGetTime,
                ExamDate,
                SubmitTime,
                IsMerge,
                IsShare,
                RepeatConsultationCountStart,
                RepeatConsultationCountEnd,
                SaleDialCountEnd,
                ClueStatus,
                IntentionGrade,
                Urgency,
                selectCityValue,
                selectProviceValue,
                lastCommunicateTime,
                Major,
                School,
                CommuKeywords
            } = this.form;
        let objParams = {
                Where: {
                    SearchKey: this.searchValue,
                    SeachType: this.SeachType,
                    ClueSearchType: this.ClueSearchType,
                    CreateStartTime: CreateStartTime ? format(CreateStartTime[0]) : '',
                    CreateEndTime: CreateStartTime ? format(CreateStartTime[1]) : '',
                    SaleStartGetTime: salesGetTime ? format(salesGetTime[0]) : '',
                    SaleEndGetTime: salesGetTime ? format(salesGetTime[1]) : '',
                    SchoolManagerStartGetTime: SchoolManagerStartGetTime ? format(SchoolManagerStartGetTime[0]) : '',
                    SchoolManagerEndGetTime: SchoolManagerStartGetTime ? format(SchoolManagerStartGetTime[1]) : '',
                    NextCommunicateStartTime: NextCommunicateStartTime ? format(NextCommunicateStartTime[0]) : '',
                    NextCommunicateEndTime: NextCommunicateStartTime ? format(NextCommunicateStartTime[1]) : '',
                    ClueTurnBegin: ClueTurnTime ? format(ClueTurnTime[1]) : '',
                    ClueTurnEnd: ClueTurnTime ? format(ClueTurnTime[1]) : '',
                    EnrollmentYear: EnrollmentYear ? format(EnrollmentYear) : '',
                    ClueOwerStartGetTime: ClueOwerGetTime ? format(ClueOwerGetTime[0]) : '',
                    ClueOwerEndGetTime: ClueOwerGetTime ? format(ClueOwerGetTime[1]) : '',
                    ExamStartDate: ExamDate ? format(ExamDate[0]) : '',
                    ExamEndDate: ExamDate ? format(ExamDate[1]) : '',
                    SubmitTime: SubmitTime ? format(SubmitTime) : '',
                    Create_By: this.xcUser,
                    ClueSource: this.xlUser,
                    RepeatConsultationStartTime: RepeatConsultationTime ? format(RepeatConsultationTime[0]) : '',
                    RepeatConsultationEndTime: RepeatConsultationTime ? format(RepeatConsultationTime[1]) : '',
                    ClueOwner: this.xsUser,
                    RepeatConsultationOwner: this.czUser,
                    CourseType,
                    ClueSchoolManagerOwner: this.ClueSchoolManagerOwner,
                    ClueSaleOwner: this.ClueisSaleOwner,
                    SaleConnetCountStart: SaleConnetCountStart.toString(),
                    SaleConnetCountEnd: SaleConnetCountEnd.toString(),
                    SaleFailureFollowCountStart: SaleFailureFollowCountStart.toString(),
                    SaleFailureFollowCountEnd: SaleFailureFollowCountEnd.toString(),
                    RepeatConsultationCountStart: RepeatConsultationCountStart.toString(),
                    RepeatConsultationCountEnd: RepeatConsultationCountEnd.toString(),
                    SaleDialCountStart: SaleDialCountStart.toString(),
                    SaleDialCountEnd: SaleDialCountEnd.toString(),
                    //ClueStatus: ClueStatus[ClueStatus.length - 1],
                    ClueStatus: this.ClueStatus,
                    IntentionGrade: IntentionGrade.toString(),
                    Submitter: this.Submitter,
                    ClueQuality,
                    Profession,
                    FirstChannelCode: this.sSourceUser,
                    EffectivelyChannelCode: this.mSourceUser,
                    IsMerge: IsMerge.toString(),
                    IsShare: IsShare.toString(),
                    ChannelCodeSub: this.marketingUser,
                    SourceChannelCode: this.channelUser,
                    Urgency: Urgency.toString(),
                    CurrentCity: selectCityValue.toString(),
                    CurrentProvince: selectProviceValue.toString(),
                    LabelIds: this.labelUser,
                    CommuSearchKeyword: CommuKeywords.toString(),
                    LastCommunicateTimeBegin: lastCommunicateTime ? format(lastCommunicateTime[0]) : '',
                    LastCommunicateTimeEnd: lastCommunicateTime ? format(lastCommunicateTime[1]) : '',
                    Major: Major.toString(),
                    School,
                    ClueTurnOwner: this.clueturnUser,
                    PreTurnOwner: this.preturnUser
                },
                PageIndex: this.currentPage,
                PageSize: this.pageSize,
                OrderBy: this.sortName,
                SortCol: this.sortType
            }
            GetEsClueBaseList(objParams).then(ret => {
                this.loading = false;                
                if (ret.status === 0) {
                    this.cluesGuid = [];
                    this.cluesData = ret.result.Body;
                    this.cluesTotal = ret.result.Count;
                    let getGuid = [];
                    for (let i = 0; i < this.cluesData.length; i++) {
                        getGuid.push(this.cluesData[i].Guid);
                    }
                    this.loadDatagrid(this.cluesData,isFirst)
                }
            })
        },
         loadDatagrid(data,isFirst) {
            let self = this;
            if(isFirst){
                $('#cluesDg').datagrid({
                    frozenColumns: [[
                        {field:'ck',width:100,checkbox: true},
                        {field:'TrueName',title:'联系人姓名',width:130,formatter:this.shareClue},
                        {field:'Tracking',title:'跟进',width:40,align: 'center', frozen:true,formatter:this.Tracking}
                    ]],
                    columns:[self.getCluesTable],
                    data:data,
                    remoteSort: true,
                    nowrap: false,
                    checkOnSelect: true
                });
            } else {
                $('#cluesDg').datagrid('loadData',data)
            }
        },
        shareClue(value,row,index) {
            return `<div><span>${value}</span><i class="${row.Urgency == 1001061 && 'urgency-icon'}"></i><i class="${row.IsShare == 1 && 'ushare-icon'}"></i></div>`
        },
        Tracking(value,row,index) {
             return `<div style="display: -webkit-inline-box;"><textarea style="display:none;">${JSON.stringify(row)}</textarea></textarea><a href="javascript:void(0)" class="clues_tracking" style="color:#20a0ff">跟进</a></div>`;
        },
        formatOper(value,row,index){
            return `<div style="display: -webkit-inline-box;"><textarea style="display:none;">${JSON.stringify(row)}</textarea></textarea><a href="javascript:void(0)" class="clues_modify" style="margin-right: 10px;color:#20a0ff">修改</a><a style="margin-right: 10px;color:#20a0ff" class="clues_enrol" target="_blank" href="/#/clue/create?nid=520&nw=1&Guid=${row.Guid}&CustomGuid=${row.CustomGuid}">报名</a><a target="_blank" href="/#/clue/details?NavigationId=520&nw=1&Guid=${row.Guid}&CustomGuid=${row.CustomGuid}" style="color:#20a0ff;margin-right: 10px">详情</a>
                <a href="javascript:void(0)" class="hove_menu" style="color:#0094ff;position: relative">更多
                <i class="el-icon-caret-bottom el-icon--right"></i>
                <div class="easy_menu">
                    <span class="menu_shadow"></span>
                    <div class="hover clues_audition">预约试听</div> 
                    <div class="hover clues_shared">共享查询</div> 
                </div></a></div>`;
        },
        localSorter(a,b) {  
            a = a.split('/');    
            b = b.split('/');    
            if (a[2] == b[2]){    
                if (a[0] == b[0]){    
                    return (a[1]>b[1]?1:-1);    
                } else {    
                    return (a[0]>b[0]?1:-1);    
                }    
            } else {    
                return (a[2]>b[2]?1:-1);    
            }    
        },
        formatterVal(value, row, index) {
            return `<div class="beyond-hidden-2"><span title="${value || ''}">${ value || '' }</span></div>`
        },

        handleCurrentChange(val) { // 分页事件 => 当前页变动
            this.currentPage = val;
            this.getCluleDataList();
        },
        handleSizeChange(val) { // 分页事件 => 处理页码大小
            this.pageSize = val;
            this.getCluleDataList();
        },
        onCluesType(type) { // 模糊搜索选择类
            this.SeachType = type + 1;
            if (this.searchValue) {
                this.quickQuery();
            }
        },
        onFocusType() { // 模糊搜索框获取焦点显示线索类型选择框
            clearTimeout(this.timer);
            this.isSelect = true;
        },
        onBlurType() { // 隐藏线索类型选择框
            const self = this;
            this.timer = setTimeout(function() {
                self.isSelect = false;
            }, 500);
        },
        MakeLister(row) { // 创建邀约
            require.ensure([], (require) => {
                let AddContent = require("../components/cluesManage/CluesModalinvitation.vue");
                cluesModal.openComponent(AddContent, {
                    title: '创建邀约',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '500px',
                    self: this,
                    contactsData: { Guid: row.CustomGuid, Mobile: row.MainPhone, TrueName: row.TrueName }, //联系人信息
                    cluesLine: { CourseType: row.CourseTypeID, Guid: row.Guid } // 线索信息
                });
            }, 'createvitation');
        },
        sharedQuery(Guid, CustomGuid) { // 共享查询
            require.ensure([], (require) => {
                let CluesShared = require("../components/cluesManage/CluesModalShared.vue");
                cluesModal.openComponent(CluesShared, {
                    title: '共享查询',
                    showCancelButton: false,
                    showConfirmButton: false,
                    width: '750px',
                    self: this,
                    Guid,
                    CustomGuid
                })
            }, 'shared');
        },
        //省份触发事件
        changeProvice() {
            let prcId = {
                areaId: this.form.selectProviceValue,
            };
            if (this.form.selectProviceValue.length) {
                getProviceOrCity(prcId).then(ret => { // 获取城市
                    if (ret.status === 0) {
                        this.OptionCity = ret.result;
                    }
                })
            }
        },
        getPageFieldConfig() {
            GetBase_PageFieldConfig({ PageName: '线索管理' }).then(ret => { // 获取列表列
                let str = ret.result;
                let data = str && (str !== '' || str !== '[]') ? JSON.parse(str) : [];
                if (ret.status === 0 && data.length) {
                    let data = JSON.parse(str) || [];
                    if (data.indexOf('手机') < 0 ) {
                        data.unshift('手机');
                    }
                    if (data.indexOf('操作') < 0 ) {
                        data.push('操作');
                    }
                    this.$store.dispatch('cluesTableSetting', data);
                    let getTable = [];
                    for (let j = 0; j < this.cluesTable.length; j++) {
                        for (let i = 0; i < data.length; i++) {
                            if (this.cluesTable[j].title == data[i]) {
                                getTable.push(this.cluesTable[j]);  
                            }
                        }
                    }
                    this.getCluesTable = getTable;
                    this.getCluleDataList(true); 
                } else {
                    this.getCluesTable = this.cluesTable;
                    this.getCluleDataList(true); 
                }
            });
        },
        getWindowHeight() {
            if (window.innerHeight)
                this.winHeight = window.innerHeight - 230;
            else if ((document.body) && (document.body.clientHeight))
                this.winHeight = document.body.clientHeight - 230;
            if (document.documentElement && document.documentElement.clientHeight) {
                this.winHeight = document.documentElement.clientHeight - 230;
            }
        },
        cluesCheck() { // 复选框
            let selRows = $('#cluesDg').datagrid('getChecked')
            this.cluesGuid = [];
            selRows.map((item, index) => {
                this.cluesGuid.push(item.Guid);
            })
            this.$store.dispatch('getDistributionGuid', this.cluesGuid);
            this.multipleSelection = selRows;
        }
    },
    computed: {
        ...mapState({
            cluesTableSetting: state => { // 显示已选的Table
                return state.cluesManage.cluesTableSetting
            },

        })
    },
    created() {
        this.getWindowHeight();
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
        this.getCluleDataList(true); // 线索列表接口
        this.getPageFieldConfig();
        let proviceId = {
            areaId: '00000000-0000-0000-0000-000000000000',
        };
        getProviceOrCity(proviceId).then(ret => { // 省份接口
            if (ret.status === 0) {
                this.Optionprovice = ret.result;
            }
        });
        if (this.form.selectProviceValue) {
            getProviceOrCity({ areaId: this.form.selectProviceValue }).then(ret => { // 获取城市
                if (ret.status === 0) {
                    this.OptionCity = ret.result;
                }
            });
        }

        GetAllowedUserTree({ userId: this.userInfo.UserId }).then(ret => { // 人员树接口
            if (ret.status === 0) {
                this.createData = ret.result;
            }
        });
        GetCustomerSourceTree().then(ret => { // 客户来源接口
            if (ret.status === 0) {
                this.sourceData = ret.result;
            }
        });
        GetSourceDetailsTree().then(ret => { // 营销计划
            if (ret.status === 0) {
                this.marketingData = ret.result;
            }
        });
        interestedProject().then(ret => {
            if (ret.status === 0) {
                this.interestedProject = ret.result;
            }
        });
        intentionDegree().then(ret => { // 客户意向接口
            if (ret.status === 0) {
                this.intentionDegreeData = ret.result;
            }
        });
        GetDictionaryByTypeId({ dicType: 10044 }).then(ret => { // 客户沟通紧急度
            if (ret.status === 0) {
                this.getUrgency = ret.result;
            }
        })
        OptimalCluesType().then(ret => { // 优质线索接口
            if (ret.status === 0) {
                this.optimalCluesType = ret.result;
            }
        });
        GetClueStatusTree().then(ret => { // 线索状态接口
            if (ret.status === 0) {
                this.cluesStatusData = ret.result;
            }
        });
        professionalStatus().then(ret => {
            if (ret.status === 0) {
                this.professionalStatus = ret.result;
            }
        })
        getchannels().then(ret => { // 渠道接口
            if (ret.status === 0) {
                this.channelData = ret.result;
            }
        });
        GetLabelList().then(ret => { // 标签接口
            if (ret.status === 0) {
                this.labelData = ret.result;
            }
        });
        GetViewNameList({ viewpageid: 291 }).then(ret => { // 视图项
            if (ret.status === 0) {
                this.viewData = ret.result;
            }
        })

    },
    mounted() {
        let self  = this;
        let timer = null;
        $('body').delegate('.clues-phone-number','click',function(event){ // 手机显示明文
            event.stopPropagation();
            let data = JSON.parse($(this).siblings('textarea').val())
            self.showCallTip(0, data, this);
       })
        $('body').delegate('.clues-call-number','click',function(event){ // 国际显示明文
            event.stopPropagation();
            let data = JSON.parse($(this).siblings('textarea').val())
            self.showCallTip(1, data, this);
       })

       $('body').delegate('.clues-phone-number','mouseout',function(){ // 移入移出
            timer = setInterval(function() {
                $(this).children('.phone-number-tips').css('display', 'none')
            },500)
       })
       $('body').delegate('.phone-number-tips','mousemove',function(){ 
            clearInterval(timer);
            $(this).css('display', 'block')
       })
       $('body').delegate('.phone-number-tips','mouseout',function(){ 
            $(this).css('display', 'none')
       })
        $('body').delegate('.phone-number-tips','click',function(event){ 
            event.stopPropagation();
       })
       
       $('body').delegate('.communicat_content','click',function(event){ // 查看沟通记录
            event.stopPropagation();
            self.dialogVisible = true;
            let data = JSON.parse($(this).siblings('textarea').val())
            self.showCommunicatTip(data);

       })

       $('body').delegate('.clues_tracking','click',function(event){ // 跟进
            event.stopPropagation();
           let data = JSON.parse($(this).siblings('textarea').val())
           self.onClueTracking(data);
       })
       $('body').delegate('.clues_modify','click',function(event){ // 修改
            event.stopPropagation();
           let data = JSON.parse($(this).siblings('textarea').val())
           self.onClueTracking(data, 'modify');
       })
       $('body').delegate('.clues-callphone','click',function(event){ // 拨打手机
            event.stopPropagation();
           let data = JSON.parse($(this).siblings('textarea').val())
           self.callUpPhone(data);
       })
       $('body').delegate('.clues-callTell','click',function(event){ // 拨打国际电话
            event.stopPropagation();
           let data = JSON.parse($(this).siblings('textarea').val())
           self.callUpContacts(data);
       })
       $('#cluesDg').datagrid({
            onCheck:function() { // 复选框
               self.cluesCheck();
            },
            onUncheck:function() {
                self.cluesCheck();
            },
            onCheckAll:function() {
                self.cluesCheck();
            },
            onUncheckAll:function() {
                self.cluesCheck();
            },

            onSortColumn:function(sort, order) { // 排序
                self.sortName = sort;
                if(order == 'asc'){
                    self.sortType = 0;
                } else {
                    self.sortType = 1;
                }
                self.getCluleDataList();
            },
            // onLoadSuccess:function(data){
            //     if(data.total>0)return;
            //     $('#cluesDg').datagrid('appendRow',{
            //         MainPhone: '没有相关数据'
            //     });
            // }
            // var myview = $.extend({},$.fn.datagrid.defaults.view,{
            // onAfterRender:function(target){
            //     $.fn.datagrid.defaults.view.onAfterRender.call(this,target);
            //     var opts = $(target).datagrid('options');
            //     var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
            //     vc.children('div.datagrid-empty').remove();
            //     if (!$(target).datagrid('getRows').length){
            //         var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || 'no records').appendTo(vc);
            //         d.css({
            //             position:'absolute',
            //             left:0,
            //             top:50,
            //             width:'100%',
            //             textAlign:'center'
            //         });
            //     }
            // }
            // });
            // $('#cluesDg').datagrid({
            //     data: this.cluesData,
            //     view: myview,
            //     emptyMsg: 'no records found'
    
            // });
       })

        $('body').delegate('.clues_audition','click',function(event){ // 预约试听
            event.stopPropagation();
            let audition = JSON.parse($(this).parent().parent().siblings('textarea').val());
            self.MakeLister(audition);
       })
        $('body').delegate('.clues_shared','click',function(event){ // 共享查询
            event.stopPropagation();
            let shared = JSON.parse($(this).parent().parent().siblings('textarea').val());
            self.sharedQuery(shared.Guid, shared.CustomGuid);
       })
    },
}
</script>