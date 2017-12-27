<template>
    <el-form label-width="120px" :model="form" ref="form" :rules="rules" class="clues-newusers">
        <el-row>
            <el-col :sm="8">
                <el-form-item label="姓名" prop="TrueName">
                    <el-input size="small" style="width: 192px" v-model="form.TrueName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="性别" prop="Gender">
                    <el-radio-group v-model="form.Gender">
                        <el-radio label="0">未知</el-radio>
                        <el-radio label="1">男</el-radio>
                        <el-radio label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="感兴趣的项目" prop="CourseType">
                    <el-select v-model="form.CourseType" filterable class="tracking-text-font" size='small' style="width: 185px" placeholder="请选择" @visible-change="onCourseType">
                        <el-option v-for="professional in interestedProject" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :sm="8">
                <el-form-item label="手机">
                    <el-input size="small" style="width: 192px" v-model.number="form.MainPhone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="国际电话">
                    <el-select style="width: 80px" size="small" clearable v-model="form.areaCode" filterable placeholder="请选择" @visible-change="onPhoneCode">
                        <el-option v-for="item in phoneCodeList" :key="item.PhoneCode" :label="item.CountryName" :value="item.PhoneCode">
                        </el-option>
                    </el-select>
                    <el-input v-model.number="form.international" auto-complete="off" size="small" style="width: 108px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="QQ" prop="QQ">
                    <el-input size="small" style="width: 185px" v-model="form.QQ"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :sm="8">
                <el-form-item label="微信">
                    <el-input size="small" style="width: 192px" v-model="form.WeChat"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="私人邮箱">
                    <el-input size="small" style="width: 192px" v-model="form.Email"></el-input>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="职业状态" prop="Profession">
                    <el-select v-model="form.Profession" class="tracking-text-font" size='small' style="width: 185px" placeholder="请选择" @visible-change="onProfession">
                        <el-option v-for="professional in professionalStatus" :key="professional.Id" :label="professional.Name" :value="professional.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :sm="8">
                <el-form-item label="省市" prop="selectProviceValue">
                    <el-select v-model="form.selectProviceValue" filterable class="tracking-text-font" size='small' style="width: 90px" placeholder="请选择省" clearable @change="changeProvice">
                        <el-option v-for="item in Optionprovice" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                        </el-option>
                    </el-select>
                    <span>-</span>
                    <el-select v-model="form.selectCityValue" filterable class="tracking-text-font" size='small' style="width: 90px" clearable placeholder="请选择市">
                        <el-option v-for="item in OptionCity" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="客户来源" prop="FirstChannelCode" >
                    <el-cascader size="small" v-model="form.FirstChannelCode" disabled  :options="getFirstChannelCode" :props="FirstChannelCodeProps" style="width: 192px;font-size: 12px"></el-cascader>
                </el-form-item>
            </el-col>
            <el-col :sm="8">
                <el-form-item label="客户沟通紧急度" prop="Urgency">
                    <el-select v-model="form.Urgency" clearable placeholder="请选择" size="small" style="width: 185px">
                        <el-option v-for="item in getUrgency" :key="item.Id" :label="item.Name" :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="clues-newusers-textarea">
            <el-col :sm="16">
                <el-form-item label="沟通记录" prop="FollowRecords">
                    <el-input :rows="3" type="textarea" v-model="form.FollowRecords"></el-input>
                </el-form-item>
            </el-col>            
            <el-col :sm="8">
                <el-form-item label="推荐类型" prop="RecommendType">
                    <el-select v-model="form.RecommendType" clearable placeholder="请选择" size="small" style="width: 185px">
                        <el-option v-for="item in getRecommendType" :key="item.Id" :label="item.Name" :value="item.Id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>   
            <el-col :sm="8"> 
                <el-form-item label="推荐人" placeholder="请输入推荐人姓名或手机" prop="RecommenderName">
                        <el-input size="small" style="width: 185px" v-model="form.RecommenderName" @change="onRecommenderName" @focus="onFocusRecommentder" @blur="onBlurRecommentder"></el-input>
                        <div style="width: 100%" class="el-select-dropdown" x-placement="bottom-start" v-show="isSelect">
                            <div class="el-scrollbar">
                                <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -15px; margin-right: -15px;">
                                    <ul class="el-scrollbar__view el-select-dropdown__list" style="position: relative;">
                                        <div class="resize-triggers">
                                            <div class="expand-trigger">
                                                <div style="width: 100%; height: 121px;"></div>
                                            </div>
                                            <div class="contract-trigger"></div>
                                        </div>
                                         <li class="el-select-dropdown__item" v-for="item in recommenderData" @click.stop="handleRecommentder(item)"><span>{{item.value}}</span></li>
                                    </ul>
                                </div>
                            <div class="el-scrollbar__bar is-horizontal">
                                <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                            </div>
                            <div class="el-scrollbar__bar is-vertical">
                                <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                            </div>
                            </div>
                        </div>
                </el-form-item> 
            </el-col>            
        </el-row>      
        <div v-bind:class="!isCollapse ? 'conditions-bottom-hide' : 'conditions-bottom-show'" style="border-top: 0">
            <el-row>
                <el-col :sm="8">
                    <el-form-item label="考试时间">
                        <el-date-picker type="date" v-model="form.ExamDate" placeholder="选择时间" style="width: 192px" size="small"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="学员意向">
                        <el-select size="small" style="width: 192px" v-model="form.Intention" placeholder="请选择" clearable @visible-change="onIntentionStudents">
                            <el-option v-for="item in intentionStudents" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="方便上课时间">
                        <el-form-item>
                            <el-date-picker v-model="form.ConvenienceCourseTime" type="date" placeholder="选择日期" style="width: 185px" size="small"></el-date-picker>
                        </el-form-item>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="8">
                    <el-form-item label="优质线索类型">
                        <el-select size="small" style="width: 192px" v-model="form.CluesType" placeholder="请选择" clearable @visible-change="onOptimalClues">
                            <el-option v-for="item in optimalCluesType" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="学校">
                        <el-autocomplete size="small" style="width: 192px" :trigger-on-focus="false" v-model="form.SchoolName" :fetch-suggestions="querySearchAsync" placeholder="请输入学校" @select="handleSelect"></el-autocomplete>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="学历">
                        <el-select v-model="form.Qualification" clearable class="tracking-text-font" size='small' style="width: 185px" placeholder="请选择" @visible-change="onTypeRemark">
                            <el-option v-for="schools in typeRemark" :key="schools.Id" :label="schools.Name" :value="schools.Id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="8">
                    <el-form-item label="专业">
                        <el-form-item>
                            <el-input size="small" style="width: 192px" v-model="form.Major"></el-input>
                        </el-form-item>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="来源渠道">
                        <el-cascader size="small" v-model="form.SourceChannelCode" :options="SourceChannelCode" :props="SourceChannelCodeProps" style="width: 192px;font-size: 12px"></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="营销计划">
                        <el-cascader size="small" v-model="form.ChannelCodeSub" filterable clearable :options="ChannelCodeSub" :show-all-levels="false" :props="ChannelCodeSubProps" style="width: 185px;font-size: 12px"></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :sm="8">
                    <el-form-item label="入学年份">
                        <el-date-picker v-model="form.EnrollmentYear" type="year" placeholder="选择年份" style="width: 192px" size="small"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :sm="8">
                    <el-form-item label="毕业时间">
                        <el-date-picker v-model="form.GraduationTime" type="date" placeholder="选择时间" style="width: 192px" size="small"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span="24" style="margin:5px 0 30px 0">
                <div style="width: 100%">
                    <div class="tracking-newusers-contact">
                        <p>
                            <a href="javascript:void(0)" :class="{['contact-color']:isInformation,['tracking-text-font']:!isInformation}" @click="companyInformation">公司信息</a>
                            <a href="javascript:void(0)" :class="{['contact-color']:isOther,['tracking-text-font']:!isOther}" @click="otherContacts">其他联系人</a>
                        </p>
                    </div>
                    <div v-bind:class="isInformation ? 'clues-newusers-table' : 'contactHide'">
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="公司名称">
                                    <el-input class="tracking-text-font" size='small' style="width: 190px" v-model="form.CompanyName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="公司总机" prop="hostCompany">
                                    <el-input class="tracking-text-font" size='small' style="width: 190px" v-model="form.hostCompany" @change="onHostCompany"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="分机号" prop="extension">
                                    <el-input class="tracking-text-font" style="width: 190px" size='small' v-model="form.extension"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="部门">
                                    <el-input class="tracking-text-font" style="width: 190px" size='small' v-model="form.CompanyDepartment"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="企业邮箱">
                                    <el-input class="tracking-text-font" size='small' style="width: 192px" v-model="form.CompanyEmail"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="直线电话" prop="CompanyLineNo">
                                    <el-input class="tracking-text-font" size='small' style="width: 190px" v-model.number="form.CompanyLineNo"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="级别">
                                    <el-input class="tracking-text-font" size='small' style="width: 190px" v-model="form.StaffingLevel"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :sm="8">
                                <el-form-item label-width="75px" label="职位">
                                    <el-input class="tracking-text-font" size='small' style="width: 190px" v-model="form.Position"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :sm="16">
                                <el-form-item label-width="75px" label="公司地址">
                                    <el-input class="tracking-text-font" size='small' v-model="form.CompanyAddress"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div v-bind:class="isOther ? 'clues-newusers-table' : 'contactHide'">
                        <el-row>
                            <el-col :sm="4">
                                <div class="newuser-contact-table">联系人姓名</div>
                            </el-col>
                            <el-col :sm="4">
                                <div class="newuser-contact-table">手机</div>
                            </el-col>
                            <el-col :sm="4">
                                <div class="newuser-contact-table">QQ</div>
                            </el-col>
                            <el-col :sm="4">
                                <div class="newuser-contact-table">微信</div>
                            </el-col>
                            <el-col :sm="8">
                                <div class="newuser-contact-table" style="text-align: left;padding-left:55px">邮箱</div>
                            </el-col>
                        </el-row>
                        <el-row v-for="(contact, index) in form.concatData" :key="contact.key" :prop="'concatData.' + index + '.value'">
                            <el-col :span="4" v-for="(item, index) in contact.CustomContactInfoDetail" :key="index">
                                <el-form-item class="newusers-contact-input">
                                    <el-input v-model="item.ContactsNo" size='small'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" style="margin-top: 9px; text-align: center">
                                <a href="javascript:void(0)" v-show="isAddIcon" class="newuser-add" @click="onAddContact"></a>
                                <a href="javascript:void(0)" v-show="isRemoveIcon" class="newuser-remove" @click.prevent="onRemovContact(contact)"></a>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-row>
        </div>
        <div style="padding: 20px 0 35px 0; text-align: center;">
            <div style="padding-right: 110px">
                <el-form-item style="margin: 10px 35px 0 0;display: inline-block">
                    <el-button size="small" style="width: 80px" type="primary" :loading="loading" @click="submitForm('form')">保存</el-button>
                    <el-button size="small" style="width: 80px" @click="closeForm">关闭</el-button>
                </el-form-item>
                <a href="javascript:void(0)" class="clues-collapse" @click="onMoreCollapse">
                    <span>{{isCollapse ? '收起' : '更多'}}</span>
                    <i v-bind:class="{['collapse-icon-down el-icon-d-arrow-left']:isCollapse,['el-icon-d-arrow-left']:!isCollapse}"></i>
                </a>
            </div>
        </div>
    </el-form>
</template>
<style>
.clues-newusers .el-input__icon.el-icon-caret-top {
    width: 30px
}

.clues-newusers .el-input__icon+.el-input__inner {
    padding-right: 10px!important;
}

.clues-newusers-textarea .el-col.el-col-24.el-col-sm-17 {
    width: 72.83333%;
}

.trancking-personal-user {
    width: 100px;
    margin: 0 auto;
    height: 160px;
    border: 1px solid #ccc;
    padding-top: 10px;
}

.clues-newusers .el-row-border {
    border-bottom: 3px solid #fafafa;
    border-top: 3px solid #fafafa;
    padding: 10px 0;
    margin-bottom: 10px;
}

.clues-newusers .el-form-item .el-form-item__label {
    color: #8f9aac
}

.clues-newusers .el-form-item {
    margin-bottom: 10px;
}

.clues-newusers .clues-collapse {
    color: #20a0ff;
    font-size: 12px;
}

.clues-newusers .clues-collapse .el-icon-d-arrow-left {
    color: #20a0ff;
    font-size: 12px;
}

.clues-newusers .el-input__icon.el-icon-loading {
    display: none;
}
</style>
<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { format, isPhone, isEmail, isNumber } from '../../util/util';
import { getProviceOrCity, AddClueInfo, professionalStatus, interestedProject, getValueSchools, GetArea, RecordSchooling, GetCountryPhoneCodeList, IntentionStudents, OptimalCluesType, getchannels, GetSourceDetailsTree, GetCustomerSourceTree, GetDictionaryByTypeId,GetRecommenderSearchList } from '../../api/cluesManage';

export default {
    name: 'clues-tracking-newUsers',
    props: ['propData'],
    data() {
        let isNum = (rule, value, callback) => { // 数字验证
            if (value && !isNumber(value)) {
                return callback(new Error(' '));
            }
        };
        let Email = (rule, value, callback) => { // 邮箱验证
            if (value.toString().length > 0 && !isEmail(value)) {
                return callback(new Error(' '));
            }
        };
        return {
            recommenderData: [],
            
            isInformation: true,
            isOther: false,
            isAddIcon: true,
            isRemoveIcon: false,
            loading: false,
            filterText: '',
            defaultKeys: '1',
            getFirstChannelCode: [], // 客户来源
            getUrgency: {}, // 客户沟通紧急度
            getRecommendType:[],//推荐类型
            professionalStatus: [], // 职业状态
            interestedProject: [], // 感兴趣的项目
            typeRemark: [], // 学历
            phoneCodeList: [], // 区号
            optimalCluesType: [], // 优质线索
            intentionStudents: [], // 学员意向
            areaData: [], // 获取城市
            Optionprovice: [],//省份集合
            OptionCity: [],//城市集合
            SourceChannelCode: [],
            ChannelCodeSubProps: { // 营销计划
                value: 'id',
                label: 'DetailName',
                children: 'ChildList'
            },
            SourceChannelCodeProps: { // 来源渠道
                value: 'Id',
                label: 'Name',
                children: 'ChildChannel'
            },
            FirstChannelCodeProps: { // 客户来源
                value: 'id',
                label: 'SourceName',
                children: 'ChildList'
            }, 
            ChannelCodeSub: [], // 营销计划        
            getchannels: [],
            selectedArea: [],
            Provinces: [],
            isCollapse: false,
            isSelect: false,
            form: {
                selectProviceValue: '', 
                selectCityValue: '', 
                FirstChannelCode: [1050],
                TrueName: '',
                getSources: [],
                ChannelCodeSub: [],
                SourceChannelCode: [],
                Gender: '',
                MainPhone: '',
                areaCode: '',
                international: '',
                Profession: '',
                QQ: '',
                WeChat: '',
                Email: '',
                Major: '',
                Intention: '',
                Recommender: '',
                RecommenderName: '',
                CluesType: '',
                CourseType: '',
                FollowRecords: '',
                EnrollmentYear: '',
                GraduationTime: '',
                ExamDate: '',
                Qualification: '',
                CompanyName: '',
                CompanyDepartment: '',
                CompanyEmail: '',
                CompanyLineNo: '',
                StaffingLevel: '',
                Position: '',
                School: '',
                SchoolName: '',
                CompanyAddress: '',
                ConvenienceCourseTime: '',
                extension: '',
                hostCompany: '',
                Urgency: '1001060', 
                RecommendType: '',  
                concatData: [
                    {
                        CustomContactInfoDetail: [
                            {
                                ContactsTool: -1, // 姓名
                                ContactName: '',
                                ContactsNo: ''
                            },
                            {
                                ContactsTool: 1000100, // 手机
                                ContactName: '',
                                ContactsNo: ''
                            },
                            {
                                ContactsTool: 1000104, // QQ
                                ContactName: '',
                                ContactsNo: ''
                            },
                            {
                                ContactsTool: 1000105, // 微信
                                ContactName: '',
                                ContactsNo: ''
                            },
                            {
                                ContactsTool: 1000103, // 邮箱
                                ContactName: '',
                                ContactsNo: ''
                            }
                        ]
                    },

                ]
            },
            rules: {
                Gender: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                TrueName: [
                    { required: true, message: ' ', trigger: 'blur' },
                ],
                getSources: [
                    { required: true, type: 'array', message: ' ', trigger: 'change' }
                ],
                FirstChannelCode: [
                    { required: true, type: 'array', message: ' ', trigger: 'change' }
                ],
                CourseType: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                Urgency: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                selectProviceValue: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                FollowRecords: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                Profession: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                RecommendType:[
                    {required: true, message: ' ', trigger: 'change'}
                ],
                RecommenderName: [
                    { required: true, message: ' ', trigger: 'change' },
                ],
            }
        };
    },
    watch: {
        filterText(val) {
            this.$refs.createTree.filter(val);
        }
    },
    methods: {
        handleRecommentder(val) {
            this.form.RecommenderName = val.value;
            this.form.Recommender = val.Id;
        },
        onFocusRecommentder() { 
            clearTimeout(this.timer);
            this.isSelect = true;
        },
        onBlurRecommentder() {
            this.timer = setTimeout(() => {
                this.isSelect = false;
            }, 500);
        },

        onRecommenderName(val) {
            if (val.length > 1) {
                 GetRecommenderSearchList({ SearchKey: val }).then(ret => {
                    if (ret.status === 0) {
                        this.recommenderData = ret.result;
                    }
                }) 
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const {
                        getSources,
                        TrueName,
                        Gender,
                        MainPhone,
                        areaCode,
                        international,
                        Profession,
                        QQ,
                        WeChat,
                        Email,
                        CourseType,
                        FollowRecords,
                        ExamDate,
                        CluesType,
                        Intention,
                        EnrollmentYear,
                        GraduationTime,
                        ConvenienceCourseTime,
                        Qualification,
                        School,
                        Major,
                        Recommender,
                        CompanyName,
                        CompanyDepartment,
                        CompanyEmail,
                        CompanyLineNo,
                        StaffingLevel,
                        Position,
                        CompanyAddress,
                        extension,
                        hostCompany,
                        ChannelCodeSub,
                        SourceChannelCode,
                        FirstChannelCode,
                        Urgency,
                        selectProviceValue, 
                        selectCityValue, 
                        RecommendType,
                } = this.form;
                    let params = {
                        CurrentUserRole: 0,
                        UserType: '',
                        DealType: 0,
                        FollowRecords,
                        CurrentUserId: '',
                        CustomerInfo: {
                            TrueName,
                            Gender,
                            Country: '', // 国家名称
                            MainPhone,
                            Birthday: '', // 生日
                            Profession,
                            Province: selectProviceValue,
                            City: selectCityValue,
                            School,
                            Major,
                            Qualification,
                            EnrollmentYear: format(EnrollmentYear),
                            GraduationTime: format(GraduationTime),
                            CustomCompany: {
                                CompanyName,
                                StaffingLevel,
                                Position,
                                CompanyDepartment,
                                CompanyEmail,
                                CompanyAddress,
                                CompanyLineNo,
                                CompanyExtensionNumber: `${extension}-${hostCompany}`
                            },
                            CustomContactInfoDetail: [
                                {
                                    ContactsTool: 1000104,
                                    ContactsNo: QQ
                                },
                                {
                                    ContactsTool: 1000105,
                                    ContactsNo: WeChat
                                },
                                {
                                    ContactsTool: 1000103,
                                    ContactsNo: Email
                                },
                                {
                                    ContactsTool: 1000101,
                                    ContactsNo: `${areaCode}-${international}`,
                                }
                            ]
                        },
                        Custom_Contacts: this.form.concatData,
                        ClueInfo: {
                            ClueDescribe: {
                                ClueQuality: CluesType,
                                ConvenienceCourseTime: format(ConvenienceCourseTime),
                                Urgency, 
                            },
                            Clue_Status: {
                                RepeatConsultationChannel: '',
                                Recommender,
                                RecommendType, 
                            },
                            Intention, // 学员意向度
                            FirstChannelCode: FirstChannelCode[FirstChannelCode.length - 1],
                            CourseType,
                            ExamDate: format(ExamDate),
                            SourceChannelCode: SourceChannelCode[SourceChannelCode.length - 1],
                            ChannelCodeSub: ChannelCodeSub[ChannelCodeSub.length - 1]
                        }
                    }
                    if (international && !isNumber(international) || hostCompany && !isNumber(hostCompany) || extension && !isNumber(extension) || CompanyLineNo && !isNumber(CompanyLineNo)) {
                        this.$message({
                            message: '电话号码只能为数字',
                            showClose:true,
                            type: 'warning'
                        });
                        return;
                    }
                    if (Email.length > 0 && !isEmail(Email)) {
                        this.$message({
                            message: '输入的私人邮箱格式有误',
                            showClose:true,
                            type: 'warning'
                        });
                        return;
                    }
                    if (CompanyEmail.length > 0 && !isEmail(CompanyEmail)) {
                        this.$message({
                            message: '输入的企业邮箱格式有误',
                            showClose:true,
                            type: 'warning'
                        });
                        return;
                    } 
                    const self = this;
                    this.loading = true;
                    AddClueInfo(params).then(ret => {
                        if (ret.status === 0) {
                            this.$message({
                                message: ret.result, 
                                type: 'success'
                            });
                            this.loading = false;
                            self.$refs[formName].resetFields();
                        } else {
                            this.loading = false;
                        }
                    })
                }

            });
        },
        onMoreCollapse() { // 新增线索 => 搜索条件显示
            this.isCollapse = !this.isCollapse;
        },
        //省份触发事件
        changeProvice() {
            this.form.selectCityValue = '';
            this.OptionCity = [];
            let prcId = {
                areaId: this.form.selectProviceValue,
            };
            if (prcId.areaId) {
                getProviceOrCity(prcId).then(ret => { // 获取城市
                    if (ret.status === 0) {
                        this.OptionCity = ret.result;
                    }
                })
            }
        },
        //选择推荐人
        selectRecommender(queryString, cb)
        {
             if (queryString.length >= 2) {
                clearTimeout(this.delay);
                this.delay = setTimeout(()=>{
                    GetRecommenderSearchList({ SearchKey: queryString }).then(ret => {
                        if (ret.status === 0) {
                        //debugger;
                            let restaurants = ret.result;
                            let results = queryString ? restaurants.filter(this.createRecommendStateFilter(queryString)) : restaurants;
                            cb(results);
                        }
                    }) 
                },300);
            } 
        },
        createRecommendStateFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        querySearchAsync(queryString, cb) { // 模糊搜索学校          
            if (queryString.length > 1) {
                 clearTimeout(this.delay);
                this.delay = setTimeout(()=>{
                    getValueSchools({ name: queryString }).then(ret => {
                        if (ret.status === 0) {
                            let restaurants = ret.result;
                            let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                            cb(results);
                        }
                    })
                 },300);
            }
        },
        createStateFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            this.form.School = item.Id;
        },
        handleSelectRecommend(item) {
            this.form.Recommender = item.Id;
        },
        closeForm() { // 增加联系人前清空内容
            window.close();
        },
        onHostCompany(v) {
            this.form.hostCompany = v.replace(/[^0-9-]+/, '');
        },
        onRemovContact(item) { // 删除联系人
            var index = this.form.concatData.indexOf(item)
            if (this.form.concatData.length > 1) {
                this.form.concatData.splice(index, 1);
                this.isRemoveIcon = true;
                this.isAddIcon = true;
                if (this.form.concatData.length == 1) {
                    this.isRemoveIcon = false;
                    this.isAddIcon = true;
                }
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
        onTypeRemark(even) { // 学历
            if (even) {
                RecordSchooling().then(ret => {
                    if (ret.status === 0) {
                        this.typeRemark = ret.result;
                    }
                })
            }
        },
        onCourseType(even) { // 感兴趣的项目接口
            if (even) {
                interestedProject().then(ret => {
                    if (ret.status === 0) {
                        this.interestedProject = ret.result;
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
        onOptimalClues(even) { // 优质线索接口
            if (even) {
                OptimalCluesType().then(ret => {
                    if (ret.status === 0) {
                        this.optimalCluesType = ret.result;
                    }
                })
            }
        },
        onIntentionStudents(even) { // 学员意向
            if (even) {
                IntentionStudents().then(ret => {
                    if (ret.status === 0) {
                        this.intentionStudents = ret.result;
                    }
                })
            }
        },
        onAddContact() { // 添加联系人
            if (this.form.concatData.length < 3) {
                this.isRemoveIcon = true;
                this.isAddIcon = true;
                if (this.form.concatData.length == 2) {
                    this.isAddIcon = false;
                }
                this.form.concatData.push({
                    key: Date.now(),
                    CustomContactInfoDetail: [
                        {
                            ContactsTool: -1, // 联系人
                            ContactName: '',
                            ContactsNo: ''
                        },
                        {
                            ContactsTool: 1000100, // 手机
                            ContactName: '',
                            ContactsNo: ''
                        },
                        {
                            ContactsTool: 1000104, // QQ
                            ContactName: '',
                            ContactsNo: ''
                        },
                        {
                            ContactsTool: 1000105, // 微信
                            ContactName: '',
                            ContactsNo: ''
                        },
                        {
                            ContactsTool: 1000103, // 邮箱
                            ContactName: '',
                            ContactsNo: ''
                        }
                    ]
                });
            } else {
                this.isRemoveIcon = true;
                this.isAddIcon = false;
            }
        },
        companyInformation() { // 公司信息
            this.isInformation = true;
            this.isOther = false;
        },
        otherContacts() { // 其他联系人
            this.isOther = true;
            this.isInformation = false;
        }

    },
    mounted: function () {
        let proviceId = {
            areaId: '00000000-0000-0000-0000-000000000000',
        };
        GetDictionaryByTypeId({ dicType: 10044 }).then(ret => {
                    if (ret.status === 0) {
                        this.getUrgency = ret.result;
                    }
                })
        getProviceOrCity(proviceId).then(ret => { // 省份接口
            if (ret.status === 0) {
                this.Optionprovice = ret.result;
            }
        });
        getchannels().then(ret => { // 来源渠道
            if (ret.status === 0) {
                this.SourceChannelCode = ret.result;
            }
        });
        GetSourceDetailsTree().then(ret => {// 营销计划接口
            if (ret.status === 0) {
                this.ChannelCodeSub = ret.result;
            }
        });
        GetCustomerSourceTree().then(ret => {// 客户来源接口
            if (ret.status === 0) {
                this.getFirstChannelCode = ret.result;
            }
        });
        
        GetDictionaryByTypeId({ dicType: 10049 }).then(ret => {
                    if (ret.status === 0) {
                        this.getRecommendType = ret.result;
                    }
                });//推荐类型
    }
}
</script>
