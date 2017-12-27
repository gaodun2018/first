<template>
    <div class="clues-layout-right">
        <div class="clues-tracking-wrap">
            <div class="clues-tracking-hide" @click.stop="onClueTrackingHide">
                <a href="javascript:void(0)">>></a>
            </div>
            <div>
                <el-row class="tracking-call-content" :style="extStatus !== '通话中' ? 'top: -100px' : ''" v-if="extStatus == '通话中'">
                    <el-col>
                        <P style="font-size: 12px">通话中...</P>
                    </el-col>
                </el-row>
                <div :style="extStatus == '通话中' ? 'padding-top: 30px' : ''">
                    <el-row class="clues-tracking-head">
                        <el-col :sm="17" class="t_c">
                            <el-row>
                                <el-col :sm="19">
                                    <el-row>
                                        <el-col :sm="7" style="text-align: left">
                                            <div style="margin-top: 0" class="personal-name">
                                                <i :class="(trackingData.Gender === 2) ? 'personal-gender-woman' : 'personal-gender-man'"></i>
                                                <span :title="trackingData.TrueName">{{trackingData.TrueName}}</span>
                                            </div>
                                        </el-col>
                                        <el-col :sm="3" style="text-align: left">
                                            <div style="position: relative">
                                                <a href="javascript:void(0)" @mouseover="onStatusTips(0)" @mouseout="onStatusTips(1)" @click="onStatusTip" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="!trackingData.isUrgencyStatus ? 'color: red' : 'color:#5cb9e2'">{{trackingData.isUrgencyStatus ? '正常' : '紧急' }}</a>
                                                <div v-show="isStatus" class="clues-tracking-tip clues-tracking-status">
                                                    <span style="font-size: 12px" @click="onStatusTip">点击切换{{!trackingData.isUrgencyStatus ? '正常' : '紧急' }}</span>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :sm="7" style="text-align: left">
                                            <div class="tracking-call-icon" style="display: inline-block" v-if="trackingData.PersonalContacts.Mobile" @mouseover="showTooltip(2)">
                                                <el-tooltip :disabled="!phoneDisabled" :content="showPhone" placement="bottom" effect="light">
                                                    <span @click.stop="showCallTip(0,trackingData.PersonalContacts.Mobile)" style="cursor: pointer;font-size: 12px" v-if="trackingData.PersonalContacts">{{trackingData.PersonalContacts.Mobile}}</span>
                                                    <div slot="content">
                                                        <span>{{showPhone}}</span>
                                                        <a href="javascript:void(0)" @click="onModifyMainPhone(trackingData.PersonalContacts.Mobile)" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="'color:#5cb9e2'">设置主号码</a>
                                                    </div>
                                                </el-tooltip>
                                                <a href="javascript:void(0)" class="tracking-contacts-call-icon" style="right: -20px" @click="callUp(0, trackingData.PersonalContacts.Mobile)">
                                                    <i class="tracking-phone-icon"></i>
                                                </a>
                                            </div>
                                        </el-col>
                                        <el-col :sm="7" style="text-align: left">
                                            <div class="tracking-call-icon" style="display: inline-block" v-if="trackingData.PersonalContacts.PhoneAbroad && parseInt(trackingData.PersonalContacts.PhoneAbroad) >= 0" @mouseover="showTooltip(3)">
                                                <el-tooltip :disabled="!contactDisabled" placement="bottom" effect="light">
                                                    <span @click.stop="showCallTip(1,trackingData.PersonalContacts.PhoneAbroad)" style="cursor: pointer;font-size: 12px" v-if="trackingData.PersonalContacts">{{trackingData.PersonalContacts.PhoneAbroad}}</span>
                                                    <div slot="content">
                                                        <span>{{showContacts}}</span>
                                                        <a href="javascript:void(0)" @click="onModifyMainPhone(trackingData.PersonalContacts.PhoneAbroad)" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="'color:#5cb9e2'">设置主号码</a>
                                                    </div>
                                                </el-tooltip>
                                                <a href="javascript:void(0)" class="tracking-contacts-call-icon" style="right: -20px" @click="callUp(1, trackingData.PersonalContacts.PhoneAbroad)">
                                                    <i class="tracking-phone-icon"></i>
                                                </a>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :sm="5">
                                    <div @click="showEditServer" style="padding: 0 6px 0 0;color: #5cb9e2;cursor: pointer">
                                        <a href="javascript:void(0)" style="position: relative; top:1px;margin-left: 11px">
                                            <img src="../../../images/clues/tracking-edit.png"></img>
                                        </a>
                                        <span>编辑基本信息</span>
                                    </div>
                                    <div v-show="isEditContact" class="clues-tracking-tip clues-tracking-addContact">
                                        <el-form :model="editForm" ref="ruleForm" label-width="85px" class="tracking-ruleForm">
                                            <el-form-item label="姓名：" prop="ContactName">
                                                <el-input size="small" style="width: 185px;float:left" v-model="editForm.ContactName"></el-input>
                                            </el-form-item>
                                            <el-form-item label="性别：" prop="Gender">
                                                <div style="float:left">
                                                    <el-radio-group v-model="editForm.Gender">
                                                        <el-radio style="font-size: 12px" label="0">未知</el-radio>
                                                        <el-radio style="font-size: 12px" label="1">男</el-radio>
                                                        <el-radio style="font-size: 12px" label="2">女</el-radio>
                                                    </el-radio-group>
                                                </div>
                                            </el-form-item>
                                            <el-form-item label="手机：" prop="Mobile">
                                                <el-input :disabled="parseInt(trackingData.PersonalContacts.Mobile) ? true : false" size="small" style="width: 185px;float:left" v-model.number="editForm.Mobile"></el-input>
                                            </el-form-item>
                                            <el-form-item label="国际电话：" prop="PhoneAbroad">
                                                <div style="float: left">
                                                    <el-select v-if="!trackingData.PersonalContacts.PhoneAbroad || trackingData.PersonalContacts.PhoneAbroad.indexOf('*') == -1" style="width: 76px;" size="small" filterable clearable v-model="AreaCode" filterable placeholder="请选择" @visible-change="onPhoneCode">
                                                        <el-option v-for="item in phoneCodeList" :key="item.PhoneCode" :label="item.CountryName" :value="item.PhoneCode">
                                                        </el-option>
                                                    </el-select>
                                                    <el-input :disabled="parseInt(trackingData.PersonalContacts.PhoneAbroad) >= 0  || trackingData.PersonalContacts.PhoneAbroad.indexOf('*') > -1 ? true : false" v-model.number="editForm.PhoneAbroad" auto-complete="off" size="small" style="width: 105px"></el-input>
                                                </div>
                                            </el-form-item>
                                            <el-row>
                                                <div>
                                                    <el-form-item label-width="0" style="text-align: center">
                                                        <el-button size="mini" style="width: 65px" type="primary" @click="onEditContact('ruleForm')">确定</el-button>
                                                        <el-button size="mini" style="width: 65px" @click="onCancelEdit('ruleForm')">取消</el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-row>
                                        </el-form>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col v-show="!ClueIds.type" :sm="7" class="t_r">
                            <div>
                                <el-button style="border: 1px solid #49a1f6; color: #49a1f6" size="small" :class='{"active-status": form.CommucinateResult == 1000270}' @click="onCommucinateResult(1000270)">无人接听</el-button>
                                <el-button style="border: 1px solid #49a1f6; color: #49a1f6" size="small" :class='{"active-status": form.CommucinateResult == 1000271}' @click="onCommucinateResult(1000271)">空错号</el-button>
                                <el-button style="border: 1px solid #49a1f6; color: #49a1f6" size="small" :class='{"active-status": form.CommucinateResult == 1000272}' @click="onCommucinateResult(1000272)">不感兴趣</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="padding-bottom: 30px">
                        <el-col :sm="17">
                            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                                <el-row class="tracking-relevance">
                                    <el-col :sm="19">
                                        <div class="add-server">
                                            <p class="tracking-clues-information" style="width: 65px">关联客户</p>
                                            <ul id="contactItem">
                                                <li v-for="(item, index) in trackingData.RelationContacts" :key="item.ContactGuid" @click="showModifySrver(index)">
                                                    <a href="javascript:void(0)">{{item.ContactName}}</a>
                                                </li>
                                            </ul>
                                            <div v-if="isModifyContact" id="mdify-contact" class="clues-tracking-tip clues-tracking-addContact">
                                                <div>
                                                    <el-row v-for="item in addContactItems" :key="item.name" style="margin-bottom: 10px">
                                                        <el-col>
                                                            <el-tooltip :disabled="!clientPhoneDisabled" v-if="item.value=='Phone'" placement="bottom" effect="light">
                                                                <div style="position: relative" @mouseover="showTooltip(5)">
                                                                    <span class="add-contact-lable">{{item.name}}</span>
                                                                    <el-input v-model="modifyServer[item.value]" style="width: 185px" :class="(modifyServer[item.value] && item.value !== 'ContactName') && 'disabled-input'" size='mini' @click.native="showCallTip(0, modifyServer[item.value])"></el-input>
                                                                    <a v-if="item.value == 'Phone' && modifyServer.Phone" class="tracking-text-font tracking-contacts-call-icon" href="javascript:void(0)" @click="callUp(0, modifyServer.Phone)" style="right: 28px;top:0">
                                                                        <i class="tracking-phone-icon"></i>
                                                                    </a>
                                                                </div>
                                                                <div slot="content">
                                                                    <span>{{showPhone}} </span>
                                                                    <a href="javascript:void(0)" @click="onModifyMainPhone(modifyServer[item.value])" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="'color:#5cb9e2'">设置主号码</a>
                                                                </div>
                                                            </el-tooltip>
                                                            <el-tooltip :disabled="!clientContactsDisabled" v-else-if="item.value=='PhoneOverSea'" placement="bottom" effect="light">
                                                                <div @mouseover="showTooltip(6)">
                                                                    <span class="add-contact-lable">{{item.name}}</span>
                                                                    <el-select v-if="modifyServer.PhoneOverSea ==''" style="width: 70px;" size="mini" filterable clearable v-model="editRegion" filterable placeholder="请选择" @visible-change="onPhoneCode">
                                                                        <el-option v-for="item in phoneCodeList" :key="item.PhoneCode" :label="item.CountryName" :value="item.PhoneCode">
                                                                        </el-option>
                                                                    </el-select>
                                                                    <el-input v-if="modifyServer.PhoneOverSea !==''" v-model.number="modifyServer[item.value]" auto-complete="off" size="mini" style="width: 185px" :class="(modifyServer[item.value] && item.value !== 'ContactName') && 'disabled-input'" @click.native="showCallTip(1, modifyServer[item.value])"></el-input>
                                                                    <el-input v-else v-model.number="editPhoneOverSea" auto-complete="off" size="mini" style="width: 111px"></el-input>
                                                                    <a v-if="item.value == 'PhoneOverSea' && modifyServer.PhoneOverSea" class="tracking-text-font tracking-contacts-call-icon" href="javascript:void(0)" @click="callUp(1, modifyServer.PhoneOverSea)" style="right: 28px;top:0">
                                                                        <i class="tracking-phone-icon"></i>
                                                                    </a>
                                                                </div>
                                                                <div slot="content">
                                                                    <span>{{clientContacts}} </span>
                                                                    <a href="javascript:void(0)" @click="onModifyMainPhone(modifyServer[item.value])" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="'color:#5cb9e2'">设置主号码</a>
                                                                </div>
                                                            </el-tooltip>
                                                            <div v-else>
                                                                <span class="add-contact-lable">{{item.name}}</span>
                                                                <el-input v-model="modifyServer[item.value]" style="width: 185px" :class="(modifyServer[item.value] && item.value !== 'ContactName') && 'disabled-input'" size='mini'></el-input>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row style="text-align: center;padding: 8px 0 15px 0">
                                                        <el-button size="mini" style="width: 65px" type="primary" @click="onModifyContact">确定</el-button>
                                                        <el-button size="mini" style="width: 65px" @click="onCancelModify">取消</el-button>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :sm="5">
                                        <div class="add-server-icon" @click="showAddServer">
                                            <a href="javascript:void(0)">
                                                <i>+</i>
                                            </a>
                                            <span>新增关联客户</span>
                                        </div>
                                        <div v-show="isAddContact" class="clues-tracking-tip clues-tracking-addContact">
                                            <el-form :model="ruleForm" ref="ruleForm" label-width="90px" class="tracking-ruleForm">
                                                <el-form-item v-for="item in addContactItem" :key="item.name" :label="item.name" :prop="item.value">
                                                    <el-input v-model="ruleForm[item.value]" style="width: 185px" size='mini'></el-input>
                                                </el-form-item>
                                                <el-form-item label="国际号码：" prop="region">
                                                    <el-select style="width: 76px;" size="small" filterable clearable v-model="ruleForm.region" filterable placeholder="请选择" @visible-change="onPhoneCode">
                                                        <el-option v-for="item in phoneCodeList" :key="item.PhoneCode" :label="item.CountryName" :value="item.PhoneCode">
                                                        </el-option>
                                                    </el-select>
                                                    <el-input v-model.number="ruleForm.PhoneOverSea" auto-complete="off" size="small" style="width: 105px"></el-input>
                                                </el-form-item>
                                                <el-row>
                                                    <div>
                                                        <el-form-item label-width="0" style="text-align: center">
                                                            <el-button size="mini" style="width: 65px" type="primary" @click="onAddContact('ruleForm')">确定</el-button>
                                                            <el-button size="mini" style="width: 65px" @click="onCancelAdd('ruleForm')">取消</el-button>
                                                        </el-form-item>
                                                    </div>
                                                </el-row>
                                            </el-form>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row style="background: #fff; padding: 13px 13px 0 13px;margin-bottom: 10px">
                                    <p v-show="!ClueIds.type" class="tracking-clues-information">跟进信息</p>
                                    <div>
                                        <el-row v-if="!ClueIds.type">
                                            <el-col :sm="12">
                                                <el-form-item label-width="100px" label="线索状态" prop="ClueStatus">
                                                    <el-select v-model="form.ClueStatus" clearable size='small' style="width: 180px" @visible-change="onPhoneStatus">
                                                        <el-option v-for="item in getClueStatus" :key="item.Id" :label="item.Name" :value="item.Id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :sm="12">
                                                <el-form-item label-width="100px" style="float: right" label="客户意向度" prop="IntentionGrade">
                                                    <el-select v-model="form.IntentionGrade" clearable size='small' style="width: 180px">
                                                        <el-option v-for="item in intentionItem" :key="item.Id" :label="item.Name" :value="item.Id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row v-if="!ClueIds.type">
                                            <el-col :sm="12">
                                                <el-form-item label-width="100px" label="话务状态" prop="TelTrafficStatus">
                                                    <el-select v-model="form.TelTrafficStatus" clearable size='small' style="width: 180px" @visible-change="onPhoneStatus">
                                                        <el-option v-for="item in telephoneStatus" :key="item.Id" :label="item.Name" :value="item.Id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :sm="12">
                                                <el-form-item label-width="100px" style="float: right" label="下次沟通时间" prop="NextCommucinateTime">
                                                    <el-date-picker size='small' style="width: 180px" placeholder="选择日期" v-model="form.NextCommucinateTime" type="datetime">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row style="margin-top: 5px">
                                            <el-col v-if="ClueIds.type" class="modifyContent">
                                                <el-form-item style="margin-bottom: 10px" label-width="75px" label="沟通记录">
                                                    <el-input v-model="form.CommunicateContent" type="textarea" :rows="3.5"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col v-else>
                                                <el-form-item style="margin-bottom: 10px" label-width="100px" label="沟通记录" prop="CommunicateContent">
                                                    <el-input v-model="form.CommunicateContent" type="textarea" :rows="3.5"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-form-item label-width="0" style="text-align: center">
                                                <el-button size="small" :loading="bntLoading" class="trackig-button" style="background: #42aedf; color: #fff;width: 90px" @click="submitForm(false)">保存并关闭</el-button>
                                                <el-button v-if="!ClueIds.type" size="small" class="trackig-button" style="background: #42aedf; color: #fff" @click="onAudition">预约试听</el-button>
                                                <el-button v-if="!ClueIds.type" size="small" class="trackig-button" style="background: #42aedf">
                                                    <a style="color: #fff; border: 0" target="_blank" v-bind:href="[`/#/clue/create?nid=520&nw=1&Guid=${this.ClueIds.Guid}&CustomGuid=${this.ClueIds.CustomGuid}`]">报名</a>
                                                </el-button>
                                                <el-button v-if="!ClueIds.type" size="small" class="trackig-button" style="background: #42aedf; color: #fff;width: 100px" @click="onKickPool">踢回公池并保存</el-button>
                                            </el-form-item>
                                        </el-row>
                                    </div>
                                </el-row>
                                <el-row style="background: #fff; padding: 13px">
                                    <el-col>
                                        <p class="tracking-clues-information">线索信息</p>
                                        <div>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="感兴趣的项目">
                                                        <el-input :disabled="true" v-model="trackingData.CourseTypeName" style="width: 180px" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="职业状态">
                                                        <el-select v-model="trackingData.Profession" clearable size='small' style="width: 180px">
                                                            <el-option v-for="professional in professionalStatusData" clearable :key="professional.Id" :label="professional.Name" :value="professional.Id">
                                                            </el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="最后沟通时间">
                                                        <el-input :disabled="true" v-model="trackingData.LastCommunicateTime" style="width: 180px" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="学员意向">
                                                        <el-select v-model="trackingData.Intention" clearable size='small' style="width: 180px">
                                                            <el-option v-for="item in intentionDegreeData" :key="item.Id" :label="item.Name" :value="item.Id">
                                                            </el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="学校">
                                                        <el-autocomplete size="small" style="width: 180px" v-model="trackingData.School" :trigger-on-focus="false" :fetch-suggestions="querySearchAsync" placeholder="请输入学校" @select="handleSelect"></el-autocomplete>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="专业">
                                                        <el-input v-model="trackingData.Major" style="width: 180px" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="所在地">
                                                        <el-select v-model="trackingData.ProvinceId" size='small' style="width: 82px" placeholder="请选择省" clearable @change="changeProvice">
                                                            <el-option v-for="item in Optionprovice" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                                                            </el-option>
                                                        </el-select>
                                                        <span>-</span>
                                                        <el-select v-model="trackingData.CityId" size='small' style="width: 83px" clearable>
                                                            <el-option v-for="item in OptionCity" :key="item.IdentityGuid" :label="item.Name" :value="item.IdentityGuid">
                                                            </el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="末次客户来源">
                                                        <el-input :disabled="true" v-model="trackingData.ClueSource" :title="trackingData.ClueSource" style="width: 180px" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="紧急联系人">
                                                        <el-input size='small' v-model="trackingData.EmergencyContact.ContactName" style="width: 180px"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="紧急联系人电话">
                                                        <div @mouseover="5">
                                                            <el-tooltip :disabled="true" placement="top" effect="light">
                                                                <el-input @focus="showCallTip(2, trackingData.EmergencyContact.Phone)" style="width: 180px" class="tracking-text-font tracking-contacts-input" size='small' v-model="trackingData.EmergencyContact.Phone"></el-input>
                                                                <div slot="content">
                                                                    <a href="javascript:void(0)" @click="onModifyMainPhone(trackingData.EmergencyContact.Phone)" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="'color:#5cb9e2'">设置主号码</a>
                                                                </div>
                                                            </el-tooltip>
                                                            <a v-if="trackingData.EmergencyContact.Phone" class="tracking-text-font tracking-contacts-call-icon" style="right: 5px" href="javascript:void(0)" @click="callUp(0, trackingData.EmergencyContact.Phone)">
                                                                <i class="tracking-phone-icon"></i>
                                                            </a>
                                                        </div>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12" style="display: inline-flex">
                                                    <el-form-item class="tracking-call-icon" label="直线">
                                                        <el-tooltip :disabled="isLine ? false : true" placement="top" effect="light">
                                                            <el-input style="width: 180px" :disabled="isLine ? true : false" v-model="trackingData.PersonalContacts.Line" class="tracking-text-font tracking-contacts-input" size='small'></el-input>
                                                            <div slot="content">
                                                                <a href="javascript:void(0)" @click="onModifyMainPhone(trackingData.PersonalContacts.Line)" style="text-decoration: underline; font-size: 12px" class="fon-12" :style="'color:#5cb9e2'">设置主号码</a>
                                                            </div>
                                                        </el-tooltip>
                                                        <a v-if="trackingData.PersonalContacts.Line" class="tracking-text-font tracking-contacts-call-icon" href="javascript:void(0)" @click="callUp('', trackingData.PersonalContacts.Line)">
                                                            <i class="tracking-phone-icon"></i>
                                                        </a>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="微信">
                                                        <el-input style="width: 180px" :disabled="ispWeChat ? true : false" v-model="trackingData.PersonalContacts.WeChat" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="QQ">
                                                        <el-input style="width: 180px" :disabled="ispQQ ? true : false" v-model="trackingData.PersonalContacts.QQ" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="私人邮箱">
                                                        <el-input style="width: 180px" :disabled="ispPersonalEmail ? true : false" v-model="trackingData.PersonalContacts.PersonalEmail" size='small'></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="证件类型">
                                                        <el-select v-model="form.CertificatesType" size='small' filterable style="width: 180px">
                                                            <el-option v-for="item in CertificatesData" :key="item.Id" :label="item.Name" :value="item.Id">
                                                            </el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                </el-col>
                                                <el-col :sm="12">
                                                    <el-form-item style="float: right" label="证件号码">
                                                         <el-input v-model="form.CertificatesNo" style="width: 180px" size='small' placeholder="请输入"></el-input>
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                            <el-row>
                                                <el-col :sm="12">
                                                    <el-form-item label="协作人">
                                                        <el-input size="small" placeholder="请输入协作人姓名" style="width: 180px" v-model="form.AssociatesName" @change="onGetAssociates" @focus="onFocusRecommentder" @blur="onBlurRecommentder"></el-input>
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
                                                                            <li class="el-select-dropdown__item" v-for="item in associatesData" :key="item.UserName" @click.stop="handleRecommentder(item)"><span>{{item.UserName}}</span></li>
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
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row style="background: #fff; padding: 13px 15px 45px; margin-top: 10px">
                                    <p class="tracking-clues-information">共享线索</p>
                                    <div style="margin-left: 10px">
                                        <el-table border :data="trackingData.shareClue" style="width: 100%">
                                            <el-table-column v-for="item in trackingTableItem" :key="item.value" align="center" :prop="item.value" :label="item.name" :width="item.w">
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </el-row>
                            </el-form>
                        </el-col>
                        <el-col :sm="7" style="margin-top: 10px">
                            <Tracking-record></Tracking-record>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.clues-tracking-head>.t_c {
    height: 40px;
    line-height: 40px;
}

.tracking-call-content {
    position: fixed;
    z-index: 9;
    width: 100%;
    margin: 0 -10px;
    padding-left: 25px;
    height: 30px;
    line-height: 30px;
    background: #dff6f7;
    color: #5cb9e2;
    transition: all 5s ease-in;
}

.no_drop_input {
    cursor: pointer;
    background: #eef1f6;
    color: #000;
}

.active-status {
    background: #fe9356;
    color: #fff !important;
    border: 1px solid #fe9356 !important;
}

#mdify-contact.clues-tracking-addContact {
    left: 3px;
    top: 40px;
    -webkit-transition: all 0.1s ease-in;
    -moz-transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
    transition: all 0.1s ease-in;
}

.clues-tracking-tip.clues-tracking-addContact .el-form-item {
    margin-bottom: 0;
}

.clues-tracking-wrap .el-input--small .el-input__inner {
    height: 24px;
}

.clues-tracking-wrap .el-input__icon {
    width: 20px;
}

.clues-tracking-wrap .el-table__header thead {
    font-size: 12px;
}

.clues-tracking-wrap .el-tooltip__popper.is-light {
    border: 1px solid #c7d1dd;
}

.clues-tracking-wrap .el-tooltip__popper.is-dark {
    background: #fafafa;
    color: #93979c;
    box-shadow: -1px 3px 10px #ccc;
}

.trackig-button {
    width: 80px;
    color: #fff;
    border: 0;
}

.clues-tracking-wrap .el-form-item__label {
    font-size: 12px;
}

.clues-tracking-wrap .tracking-ruleForm .el-form-item__label {
    padding-right: 5px;
}

.tracking-record-overflow .el-collapse-item__header {
    text-align: center;
}

.el-input__icon+.el-input__inner {
    padding-right: 20px;
}

.el-row-border .el-input__icon.el-icon-caret-top {
    width: 20px;
}

.trancking-personal-user {
    width: 110px;
    margin: 0 auto;
    height: 160px;
    border: 1px solid #ccc;
    padding-top: 24px;
}

.el-row-border {
    border-bottom: 10px solid #fafafa;
    border-top: 10px solid #fafafa;
    padding: 10px 0;
    margin-bottom: 10px;
}

.el-col-form .el-row .el-form-item {
    margin-bottom: 0;
}

.el-col.el-col-24.el-col-sm-12 .el-form-item {
    margin-bottom: 0;
}

.el-col-form .el-row .el-tabs.el-tabs--border-card .el-tabs__header .el-tabs__new-tab {
    margin: 12px 30px 9px 10px;
}
.modifyContent .el-form-item.is-required .el-form-item__label:before {
    content: ' ';
}
</style>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import { number2DateTime, trim, getCallUp, isEmail } from "../../util/util";
import { CRM_USER_INFO } from "../../util/keys";
import {
    intentionItem,
    addContactItem,
    addContactItems,
    trackingTableItem
} from "../common/cluesConfig";
import TrackingRecord from "./TrackingModuleRecord.vue";
import loading from "../../containers/loading.vue";
import cluesModal from "vueModal";
import {
    getValueSchools,
    GetClueStatusTree,
    getProviceOrCity,
    UpdateClueFollowInfo,
    GetPersonContacts,
    GetFollowClueInfo,
    GetArea,
    getSchools,
    professionalStatus,
    IntentionStudents,
    cluesStatus,
    SearchShareClue,
    GetDictionaryByTypeId,
    getModifyContact,
    getModifyCustom,
    GetCountryPhoneCodeList,
    KickCluePool,
    SetMainPhone,
    GetAssociatesList
} from "../../api/cluesManage";
import { GetContactByUid } from "../../api/callCenter";
import { MessageBox } from "element-ui";
export default {
    name: "clues-tracking",
    components: {
        TrackingRecord,
        loading
    },
    props: {
        setShoose: Function
    },
    data() {
        return {
            loadingMsg: {
                title: "",
                loading: false
            },
            isSelect: false,
            currIndex: -1,
            phoneDisabled: false,
            showPhone: "",
            contactDisabled: false,
            showContacts: "",
            emergencytDisabled: false,
            emergencyPhone: "",
            clientPhoneDisabled: false,
            clientPhone: "",
            clientContactsDisabled: false,
            clientContacts: "",
            userInfo: {},
            editRegion: '',
            editPhoneOverSea: '',
            timer: null,
            IsKick: false,
            AreaCode: "",
            associatesData: [],
            ruleForm: {
                ContactName: "",
                Phone: "",
                QQ: "",
                WeChat: "",
                Email: "",
                region: '',
                PhoneOverSea: ''
            },
            editForm: {
                ContactName: "",
                Gender: "",
                Mobile: "",
                PhoneAbroad: ""
            },
            editPhoneOverSea: '',
            addServer: [], // 添加客户联系人
            disabledServer: [],
            modifyServer: {}, // 修改客户联系人
            schoolsRet: [], // 学校
            timeout: null,
            intentionItem,
            addContactItem,
            addContactItems,
            trackingTableItem,
            trackingData: {
                LastCommunicateTime: "",
                CourseTypeName: "",
                CourseType: "", //项目
                Intention: "",
                Profession: "",
                Major: "",
                ProvinceId: "",
                CityId: "",
                City: "",
                School: "",
                ClueSource: "",
                shareClue: [],
                TrueName: "",
                Gender: "",
                isUrgencyStatus: true,
                RelationContacts: [],
                PersonalContacts: {
                    PersonalEmail: "",
                    QQ: "",
                    WeChat: "",
                    Mobile: "",
                    PhoneAbroad: "",
                    Line: ""
                },
                EmergencyContact: {
                    ContactGuid: "",
                    ContactName: "",
                    Phone: ""
                }
            },
            form: {
                ClueStatus: "",
                CommucinateResult: "",
                TelTrafficStatus: "",
                CommunicateContent: "",
                NextCommucinateTime: "",
                IntentionGrade: "",
                resource: "",
                Intention: "",
                Profession: "",
                Province: "",
                School: "",
                AssociatesName: '',
                Associates: '',
                CertificatesType: '',
                CertificatesNo: ''
            },
            contactStatus: 0,
            bntLoading: false,
            isAddContact: false,
            isModifyContact: false,
            isEditContact: false,
            isStatus: false,
            ispPersonalEmail: "",
            isLine: "",
            ispQQ: "",
            ispWeChat: "",
            phoneCodeList: [], // 区号
            schoolsData: [], // 学校
            getClueStatus: [], // 线索状态
            selectProviceValue: "", // 所选省
            selectCityValue: "", // 所选市
            Optionprovice: [], //省份集合
            OptionCity: [], //城市集合
            professionalStatusData: [], // 职业状态
            intentionDegreeData: [], // 意向度
            telephoneStatus: [], // 话务状态
            SearchClueData: [], // 共享线索
            CertificatesData: [],
            rules: {
                ClueStatus: [{ required: true, message: " ", trigger: "change" }],
                IntentionGrade: [{ required: true, message: " ", trigger: "change" }],
                TelTrafficStatus: [{ required: true, message: " ", trigger: "change" }],
                NextCommucinateTime: [
                    { required: true, type: "date", message: " ", trigger: "change" }
                ],
                CommunicateContent: [{ required: true, message: " ", trigger: "blur" }]
            }
        };
    },
    methods: {
        callUp(type, MainPhone) {
            //拨打电话
            const { CustomGuid, Guid, ID, Uid } = this.ClueIds;
            let params = {
                Guid,
                CustomGuid,
                ID,
                Uid,
                MainPhone
            };
            getCallUp(this, Uid, MainPhone, type);
        },
        showTooltip(index) {
            // 显示电话明文
            if (index != this.currIndex) {
                this.currIndex = index;
                this.phoneDisabled = false;
                this.contactDisabled = false;
                this.clientPhoneDisabled = false;
                this.clientContactsDisabled = false;
                this.lineDisabled = false;
            }
        },
        callBlurTooltip() {
            this.emergencytDisabled = false;
        },
        showCallTip(type, rows) {
            if (type === 0) {
                this.phoneDisabled = true;
                this.clientPhoneDisabled = true;
            } else if (type === 1) {
                this.contactDisabled = true;
                this.clientContactsDisabled = true;
            }
            // 显示电话号码
            if (
                rows.indexOf("*") > -1 &&
                this.unlocking("Show_Customer_Phone_ Clear")
            ) {
                GetContactByUid({
                    phoneType: type == 1 ? 1 : 0,
                    Uid: this.ClueIds.Uid,
                    mobile: rows
                }).then(ret => {
                    if (ret.status === 0) {
                        if (type === 0) {
                            this.phoneDisabled = true;
                            this.showPhone = ret.result || "号码有误";
                        } else if (type === 1) {
                            this.contactDisabled = true;
                            this.showContacts = ret.result || "号码有误";
                        } else if (type === 2) {
                            this.emergencytDisabled = true;
                            this.emergencyPhone = ret.result || "号码有误";
                        }
                    }
                });
            }
        },

        onCommucinateResult(type) {
            // 沟通结果
            const params = {
                CustomGuid: this.ClueIds.CustomGuid,
                ClueGuid: this.ClueIds.Guid,
                CommucinateResult: type
            };
            this.submitClueFollowInfo(params);
        },
        onStatusTips(val) {
            if (val == 0) {
                this.isStatus = true;
                clearTimeout(this.timer);
            } else {
                this.timer = setTimeout(() => {
                    this.isStatus = false;
                }, 500);
            }
        },
        onStatusTip() {
            // 切换状态
            this.trackingData.isUrgencyStatus = !this.trackingData.isUrgencyStatus;
            this.isStatus = true;
        },
        showEditServer(e) {
            // 移入移出显示编辑联系人框
            e.stopPropagation();
            const { PhoneAbroad } = this.trackingData.PersonalContacts;
            this.isEditContact = !this.isEditContact;
            this.isAddContact = false;
            this.isModifyContact = false;
            GetContactByUid({
                phoneType: 1,
                Uid: this.ClueIds.Uid,
                mobile: PhoneAbroad
            }).then(ret => {
                if (ret.status === 0) {
                    if (ret.result && ret.result.indexOf("-")) {
                        this.AreaCode = ret.result.substr(0, ret.result.indexOf("-"));
                    }
                }
            });
        },
        showAddServer(e) {
            // 移入移出显示添加联系人框
            e.stopPropagation();
            this.isEditContact = false;
            this.isAddContact = !this.isAddContact;
            this.isModifyContact = false;
        },
        onCancelEdit(formName) {
            // 取消编辑联系人
            this.isEditContact = false;
            this.$refs[formName].resetFields();
        },
        onCancelAdd(formName) {
            // 取消添加联系人
            this.isAddContact = false;
            this.$refs[formName].resetFields();
        },
        onCancelModify(e) {
            // 取消修改联系人
            e.stopPropagation();
            this.isModifyContact = false;
        },
        showModifySrver(index) {
            // 显示修改关联客户
            this.clientPhoneDisabled = false;
            this.clientContactsDisabled = false;
            let disabledInputs = document.querySelectorAll(
                ".el-input.el-input--mini.disabled-input"
            );
            for (let i = 0; i < disabledInputs.length; i++) {
                disabledInputs[i].querySelector(".el-input__inner").disabled = false;
                disabledInputs[i].querySelector(".el-input__inner").className =
                    "el-input__inner";
            }

            this.isModifyContact = true;
            this.isAddContact = false;
            this.isEditContact = false;
            this.modifyServer = this.trackingData.RelationContacts[index];

            setTimeout(() => {
                const mdifyContact = document.getElementById("mdify-contact");
                const contactItem = document.getElementById("contactItem");
                const contactItemLi = contactItem.getElementsByTagName("li")[index];
                const itemWidth = contactItemLi.getElementsByTagName("a")[0].offsetWidth;
                const itemLeft = contactItemLi.offsetLeft;
                mdifyContact.style.left = itemLeft + itemWidth / 2 - 8 + "px";

                let disabledInput = document.querySelectorAll(
                    ".el-input.el-input--mini.disabled-input"
                );
                for (let i = 0; i < disabledInput.length; i++) {
                    disabledInput[i].querySelector(".el-input__inner").disabled = true;
                    disabledInput[i]
                        .querySelector(".el-input__inner")
                        .classList.add("el-input__inner", "no_drop_input");
                }
            }, 30);
        },
        onEditContact() {
            // 编辑客户信息
            const { ContactName, Gender, Mobile, PhoneAbroad } = this.editForm;
            if (!trim(ContactName)) {
                this.$message({
                    message: "姓名不能为空",
                    type: "warning"
                });
                return;
            }
            if (!this.trackingData.PersonalContacts.PhoneAbroad &&
                parseInt(PhoneAbroad) >= 0
            ) {
                if (this.AreaCode == "") {
                    this.$message({
                        message: "请选择区号",
                        type: "warning"
                    });
                    return;
                }
            }
            let PhoneOversea = "";
            if (parseInt(PhoneAbroad) >= 0) {
                if (PhoneAbroad.toString().indexOf("*") == -1) {
                    PhoneOversea = `${this.AreaCode}-${PhoneAbroad}`;
                } else if (PhoneAbroad.toString().indexOf("*") > -1) {
                    PhoneOversea = "";
                }
            }
            let params = {
                CustomGuid: this.ClueIds.CustomGuid,
                Gender,
                Phone: parseInt(this.trackingData.PersonalContacts.Mobile) ?
                    "" : Mobile,
                PhoneOversea,
                CustomName: ContactName
            };
            getModifyCustom(params).then(ret => {
                if (ret.status == 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    this.isEditContact = false;
                    this.getPersonContacts();
                }
            });
        },
        clearAll() {
            this.phoneDisabled = false;
            this.contactDisabled = false;
            this.lineDisabled = false;
            this.isModifyContact = false;
            this.trackingData = {
                LastCommunicateTime: "",
                CourseTypeName: "",
                CourseType: "", //项目
                Intention: "",
                Profession: "",
                Major: "",
                ProvinceId: "",
                CityId: "",
                City: "",
                School: "",
                ClueSource: "",
                shareClue: [],
                TrueName: "",
                Gender: "",
                isUrgencyStatus: true,
                RelationContacts: [],
                PersonalContacts: {
                    PersonalEmail: "",
                    QQ: "",
                    WeChat: "",
                    Mobile: "",
                    PhoneAbroad: "",
                    Line: ""
                },
                EmergencyContact: {
                    ContactGuid: "",
                    ContactName: "",
                    Phone: ""
                }
            };
            this.form = {
                ClueStatus: "",
                CommucinateResult: "",
                TelTrafficStatus: "",
                CommunicateContent: "",
                NextCommucinateTime: "",
                IntentionGrade: "",
                resource: "",
                Intention: "",
                Profession: "",
                Province: "",
                School: "",
                AssociatesName: '',
                Associates: '',
                CertificatesType: '',
                CertificatesNo: ''
            };
        },
        onModifyContact() {
            // 修改关联客户
            const { ContactName, Phone, WeChat, QQ, Email } = this.modifyServer;
            this.modifyServer.PhoneOverSea = this.editRegion + '' + this.editPhoneOverSea;
            let PhoneOverSea = this.editPhoneOverSea;
            const checkout = this.checkoutContact(
                ContactName,
                Phone,
                WeChat,
                PhoneOverSea,
                QQ,
                Email
            );
            if (this.editRegion && !this.editPhoneOverSea) {
                this.$message({
                    type: 'warning',
                    message: '请输入国际号码'
                })
                return;
            }
            if (this.editPhoneOverSea && !this.editRegion) {
                this.$message({
                    type: 'warning',
                    message: '请选择区号'
                })
                return;
            }

            if (checkout) {
                const msg = "修改成功";
                this.isModifyContact = false;
                let params = {
                    CustomGuid: this.ClueIds.CustomGuid,
                    Contacts: [this.modifyServer]
                };
                this.requestContactData(params, msg);
            }
        },
        checkoutContact(name, phone, qq, weChat, email, PhoneOverSea) {
            // 校验添加修改客户信息
            let isCheckout = true;
            if (!trim(name)) {
                this.$message({
                    message: "请输入联系人姓名",
                    type: "warning"
                });
                isCheckout = false;
            }
            if (this.ruleForm.PhoneOverSea && this.ruleForm.region == '') {
                this.$message({
                    message: "请选择区号",
                    type: "warning"
                });
                return;
            }
            if (this.ruleForm.region && this.ruleForm.PhoneOverSea == '') {
                this.$message({
                    message: "请输入国际号码",
                    type: "warning"
                });
                return;
            }
            if (!trim(phone) &&
                !trim(qq) &&
                !trim(weChat) &&
                !trim(email) &&
                !this.ruleForm.PhoneOverSea
            ) {
                this.$message({
                    message: "联系方式至少要填一项",
                    type: "warning"
                });
                isCheckout = false;
            }
            return isCheckout;
        },
        onAddContact(formName) {
            // 添加关联客户
            const msg = "添加成功";
            const {
                ContactName,
                Phone,
                QQ,
                WeChat,
                Email,
                PhoneOverSea,
                region
            } = this.ruleForm;
            const self = this;
            let params = {
                CustomGuid: this.ClueIds.CustomGuid,
                Contacts: [{
                    ContactName,
                    Phone,
                    WeChat,
                    QQ,
                    Email,
                    PhoneOverSea: region + '' + PhoneOverSea,
                }]
            };
            const checkout = this.checkoutContact(
                ContactName,
                Phone,
                QQ,
                WeChat,
                Email,
                PhoneOverSea
            );
            if (checkout) {
                this.requestContactData(params, msg, self);
            }
        },
        requestContactData(objParams, msg, self) {
            getModifyContact(objParams).then(ret => {
                // 添加修改关联客户
                if (ret.status === 0) {
                    GetPersonContacts({ userId: this.ClueIds.CustomGuid }).then(ret => {
                        // 线索联系人接口
                        if (ret.status === 0) {
                            this.trackingData.RelationContacts = ret.result.RelationContacts;
                            this.$message({
                                message: msg,
                                type: "success"
                            });
                            self.$refs['ruleForm'].resetFields();
                            this.ruleForm.PhoneOverSea = '';
                        }
                    });
                    this.isAddContact = false;
                    this.isModifyContact = false;
                }
            });
        },
        onClueTrackingHide() {
            // 隐藏跟进页面的弹层
            this.$store.dispatch("isTracking", false);
            setTimeout(() => {
                this.clearAll();
                this.$store.dispatch("cluesHighligheted", null);
            }, 300)
        },

        //省份触发事件
        changeProvice(id) {
            this.OptionCity = [];
            if (id != this.trackingData.ProvinceIds) {
                this.trackingData.ProvinceId = id;
                this.trackingData.CityId = "";
            }
            let prcId = {
                areaId: this.trackingData.ProvinceId
            };
            if (prcId.areaId) {
                getProviceOrCity(prcId).then(ret => {
                    // 获取城市
                    if (ret.status === 0) {
                        this.OptionCity = ret.result;
                    }
                });
            }
        },
        onPhoneCode(even) {
            // 区号接口
            if (even) {
                GetCountryPhoneCodeList().then(ret => {
                    if (ret.status === 0) {
                        this.phoneCodeList = ret.result;
                    }
                });
            }
        },

        querySearchAsync(queryString, cb) {
            // 模糊搜索学校
            if (queryString.length > 1) {
                getValueSchools({ name: queryString }).then(ret => {
                    if (ret.status === 0) {
                        let restaurants = ret.result;
                        let results = queryString ?
                            restaurants.filter(this.createStateFilter(queryString)) :
                            restaurants;
                        cb(results);
                    }
                });
            }
        },
        createStateFilter(queryString) {
            return restaurant => {
                return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
            };
        },
        handleSelect(item) {
            this.form.School = item.Id;
        },
        onPhoneStatus(even) {
            // 话务状态
            if (even) {
                GetDictionaryByTypeId({ dicType: "10042" }).then(ret => {
                    if (ret.status === 0) {
                        this.telephoneStatus = ret.result;
                    }
                });
            }
        },
        onModifyMainPhone(phone) {
            //修改主号码
            if (!phone) {
                this.$message({
                    message: "号码错误",
                    type: "success"
                });
                return;
            }
            let reqParm = { CustomGuid: this.ClueIds.CustomGuid, MainPhone: phone };
            MessageBox.confirm("确定设置当前号码为主号码吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                SetMainPhone(reqParm).then(ret => {
                    if (ret.status === 0) {
                        this.$message({
                            message: "设置成功",
                            type: "success"
                        });
                    }
                });
            });
        },
        trackingSubmit() {
            this.$emit('trackingEmit', true)
        },

        submitClueFollowInfo(params) {
            const self = this;
            UpdateClueFollowInfo(params).then(ret => {
                if (ret.status === 0) {
                    this.$message({
                        message: "客户保存成功",
                        type: "success"
                    });
                    this.bntLoading = false;
                    this.$store.dispatch("cluesHighligheted", null);
                    this.$store.dispatch("isTracking", false);
                    this.clearAll();
                    this.trackingSubmit();
                    let ClueData = this.ClueIds || [];
                    if (ClueData.length > 0) {
                        this.ClueIds.data.splice(this.ClueIds.index, 1);
                    }
                } else {
                    this.bntLoading = false;
                }
            });
        },

        submitForm(IsKick = false) {
            // 保存并关闭
            const {
                ClueStatus,
                TelTrafficStatus,
                CommunicateContent,
                CommucinateResult,
                NextCommucinateTime,
                School,
                IntentionGrade,
                CertificatesType,
                Associates,
                CertificatesNo
            } = this.form;
            const {
                PersonalContacts,
                EmergencyContact,
                Intention,
                Profession,
                Major,
                ProvinceId,
                CityId,
                City,
                isUrgencyStatus,
                ClueSource
            } = this.trackingData;
            const params = {
                CustomGuid: this.ClueIds.CustomGuid,
                ClueGuid: this.ClueIds.Guid,
                Intention,
                IsKick,
                CommucinateResult,
                UrgencyStatus: isUrgencyStatus == true ? 1001060 : 1001061,
                IntentionGrade,
                Profession,
                Province: ProvinceId,
                City: CityId,
                TelTrafficStatus,
                School,
                Major,
                NextCommucinateTime: number2DateTime(NextCommucinateTime),
                CommunicateContent,
                ClueStatus,
                PersonalContacts,
                EmergencyContact,
                CallRecordId: this.$store.state.callInfo.RecordId, //将通话ID置为0
                CertificatesType,
                Associates,
                CertificatesNo,
                IsModify: this.ClueIds.type ? true : false
            };
            if (IsKick) {
                if (this.form.CommunicateContent == "") {
                    this.$message({
                        type: "warning",
                        message: "沟通记录不能为空"
                    });
                    return;
                }
                this.submitClueFollowInfo(params);
            } else {
                if (!this.ClueIds.type) {
                    this.$refs["form"].validate(valid => {
                        if (valid) {
                            this.bntLoading = true;
                            this.submitClueFollowInfo(params);
                        }
                    });
                } else {
                    this.bntLoading = true;
                    this.submitClueFollowInfo(params);
                }
            }
        },
        onKickPool() {
            // 踢回公池
            this.submitForm(true);
        },
        onAudition() {
            // 试听
            const { CustomGuid, Guid } = this.ClueIds;
            require.ensure(
                [],
                require => {
                    let contactsPrm = {
                        Guid: CustomGuid,
                        Mobile: this.trackingData.PersonalContacts.Mobile,
                        TrueName: this.trackingData.TrueName
                    };
                    let cluesPrm = {
                        CourseType: this.trackingData.CourseType,
                        Guid: Guid
                    };
                    let AddContent = require("./CluesModalinvitation.vue");
                    cluesModal.openComponent(AddContent, {
                        title: "创建邀约",
                        showCancelButton: false,
                        showConfirmButton: false,
                        width: "500px",
                        self: this,
                        contactsData: contactsPrm, //联系人信息
                        cluesLine: cluesPrm // 线索信息
                    });
                },
                "createvitation"
            );
        },
        getPersonContacts() {
            GetPersonContacts({ userId: this.ClueIds.CustomGuid }).then(ret => {
                // 线索联系人接口
                if (ret.status === 0) {
                    this.trackingData.EmergencyContact =
                        ret.result.EmergencyContact && ret.result.EmergencyContact;
                    this.trackingData.PersonalContacts =
                        ret.result.PersonalContacts && ret.result.PersonalContacts;
                    this.trackingData.RelationContacts =
                        ret.result.RelationContacts && ret.result.RelationContacts;
                    this.ispPersonalEmail = ret.result.PersonalContacts.PersonalEmail;
                    this.isLine = ret.result.PersonalContacts.Line;
                    this.ispQQ = ret.result.PersonalContacts.QQ;
                    this.ispWeChat = ret.result.PersonalContacts.WeChat;
                    this.trackingData.TrueName =
                        ret.result.TrueName && ret.result.TrueName;
                    this.trackingData.Gender = ret.result.Gender && ret.result.Gender;
                    this.editForm = {
                        ContactName: ret.result.TrueName,
                        Gender: ret.result.Gender.toString(),
                        Mobile: ret.result.PersonalContacts.Mobile,
                        PhoneAbroad: ret.result.PersonalContacts.PhoneAbroad
                    };
                }
            });
        },
        GetFollowClueInfoData() {
            this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
            const { CustomGuid, Guid } = this.ClueIds;
            let searchIds = {
                clueid: Guid,
                customId: CustomGuid
            };
            GetFollowClueInfo({ clueId: Guid }).then(ret => {
                // 线索信息接口
                this.loadingMsg.loading = false;
                if (ret.status === 0) {
                    this.trackingData.Profession =
                        ret.result.Profession && ret.result.Profession.toString();
                    this.trackingData.Intention =
                        ret.result.Intention && ret.result.Intention.toString();
                    this.trackingData.School = ret.result.School && ret.result.SchoolName;
                    this.form.ClueStatus =
                        ret.result.ClueStatus && ret.result.ClueStatus.toString();
                    this.trackingData.ClueSource =
                        ret.result.ClueSource && ret.result.ClueSource.toString();
                    this.trackingData.CourseTypeName =
                        ret.result.CourseTypeName && ret.result.CourseTypeName.toString();
                    this.trackingData.Major =
                        ret.result.Major && ret.result.Major.toString();
                    this.trackingData.NextCommunicateTime =
                        ret.result.NextCommunicateTime &&
                        ret.result.NextCommunicateTime.toString();
                    this.trackingData.ProvinceId =
                        ret.result.ProvinceId && ret.result.ProvinceId.toString();
                    this.trackingData.ProvinceIds =
                        ret.result.ProvinceId && ret.result.ProvinceId.toString();
                    this.trackingData.CityId =
                        ret.result.CityId && ret.result.CityId.toString();
                    this.form.IntentionGrade =
                        ret.result.IntentionGrade && ret.result.IntentionGrade.toString();
                    this.trackingData.LastCommunicateTime =
                        ret.result.LastCommunicateTime &&
                        ret.result.LastCommunicateTime.toString();
                    this.trackingData.isUrgencyStatus =
                        ret.result.UrgencyStatus === 1001061 ? false : true;
                    this.trackingData.CourseType = ret.result.CourseType;
                    this.form.CertificatesNo = ret.result.CertificatesNo;
                    this.form.CertificatesType = ret.result.CertificatesType > 0 ? ret.result.CertificatesType.toString() : '1000200';
                    this.form.AssociatesName = ret.result.AssociatesName;
                    this.form.Associates = ret.result.AssociatesId;
                }
            });
        },
        onGetAssociates(val) { // 根据名称模糊查询协作人
            if (val.length > 1) {
                GetAssociatesList({UserName: val}).then(ret => {
                    if (ret.status === 0) {
                        this.associatesData = ret.result;
                    }
                })
            }
        },
        handleRecommentder(val) {
            this.form.AssociatesName = val.UserName;
            this.form.Associates = val.UserId;
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

        getTrackingInfo() {
            this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
            const { CustomGuid, Guid } = this.ClueIds;
            let searchIds = {
                clueid: Guid,
                customId: CustomGuid
            };
            SearchShareClue(searchIds).then(ret => {
                // 共享线索
                if (ret.status === 0) {
                    let SearchClueData = [];
                    if (ret.result.CurrentClue) {
                        SearchClueData.push(ret.result.CurrentClue);
                        if (ret.result.OtherClues.length) {
                            SearchClueData.push(...ret.result.OtherClues);
                        }
                    }
                    this.trackingData.shareClue = SearchClueData;
                }
            });
             GetDictionaryByTypeId({ dicType: "10026" }).then(ret => { // 证件类型
                if (ret.status === 0) {
                    this.CertificatesData = ret.result;
                    this.form.CertificatesType = "1000200";
                }
            });
            professionalStatus().then(ret => {
                // 职业状态接口
                if (ret.status === 0) {
                    this.professionalStatusData = ret.result;
                }
            });
            IntentionStudents().then(ret => {
                // 学员意向接口
                if (ret.status === 0) {
                    this.intentionDegreeData = ret.result;
                }
            });
            let proviceId = {
                areaId: "00000000-0000-0000-0000-000000000000"
            };
            getProviceOrCity(proviceId).then(ret => {
                // 省份接口
                if (ret.status === 0) {
                    this.Optionprovice = ret.result;
                }
            });
            if (this.trackingData.ProvinceId) {
                getProviceOrCity({
                    areaId: this.trackingData.ProvinceId
                }).then(ret => {
                    // 获取城市
                    if (ret.status === 0) {
                        this.OptionCity = ret.result;
                    }
                });
            }
            GetClueStatusTree().then(ret => {
                // 线索状态
                if (ret.status === 0) {
                    this.getClueStatus = ret.result;
                }
            });
        }
    },
    watch: {
        ClueIds(id) {
            this.$store.dispatch("setCallInfo", 0); //将通话ID置为0
        
            if (id.Guid.length > 1) {
                this.loadingMsg.loading = true;
                this.getPersonContacts();
                this.GetFollowClueInfoData();
                this.getTrackingInfo();
                setTimeout(() => {
                    this.$store.dispatch('cluesHighligheted', id.Guid);
                }, 0);
            }
        }
    },
    computed: {
        ...mapState({
            ClueIds: state => state.cluesManage.getTrackingIds,
            extStatus: state => state.navigation.extStatusName,
            sendCall: state => state.navbar.crmSendCall
        })
    }
};
</script>