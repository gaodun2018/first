<template>
    <div style="margin:0;padding:0;" v-loading="loading">
        <el-form :model="form" ref="form">
            <el-row style="margin-bottom: 10px">
                <el-col>
                    <el-form-item label="受邀人" class="new-invition-form-item" label-width="115px">
                        <el-input style="width:80%;" size="small" :disabled="true" v-model="form.useName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 10px">
                <el-col>
                    <el-form-item label="手机号" class="new-invition-form-item" label-width="115px">
                        <el-input style="width:80%;" size="small" :disabled="true" v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item style="margin-bottom: 0px" label-width="47px">
                <el-radio-group v-model="form.LIType" @change="typeChange">
                    <el-radio v-for="item in LITypeList" :label="item.Id" :key="item.Id" style="padding-right: 36px">{{item.Name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开始日期" label-width="115px" class="new-invition-form-item-top">
                <el-date-picker v-model="liveBegin" v-show="form.LIType==1000470" :picker-options="pickerOption" size="small" type="datetime" auto-complete="off" placeholder="开始时间" style="width:80%;" @change="beginChange">
                </el-date-picker>
                <el-date-picker v-model="courseBegin" v-show="form.LIType==1000471" :picker-options="pickerOption" size="small" type="datetime" auto-complete="off" placeholder="开始时间" style="width:80%;" @change="beginChange">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期" label-width="115px" class="new-invition-form-item-top">
                <el-date-picker v-model="liveEnd" v-show="form.LIType==1000470" :picker-options="pickerOption" size="small" type="datetime" auto-complete="off" placeholder="结束时间" style="width:80%;" @change="endChange">
                </el-date-picker>
                <el-date-picker v-model="courseEnd" v-show="form.LIType==1000471" :picker-options="pickerOption" size="small" type="datetime" auto-complete="off" placeholder="结束时间" style="width:80%;" @change="endChange">
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="form.labelRoomName" label-width="116px" v-show="isliveRoom" class="new-invition-form-item-top">
                <el-input v-model="form.LiveRoomTitle" @change="liveChange" auto-complete="off" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item :label="form.labelCourseName" label-width="116px" v-show="isliveRoom?false:true" class="new-invition-form-item-top">
                <el-input v-model="form.CourseName" :readonly="true" auto-complete="off" size="small" style="width:80%;"></el-input>
            </el-form-item>
            <el-form-item label="选择直播间" label-width="115px" v-show="isliveRoom" class="new-invition-form-item-top">
                <el-table :data="this.roomList" ref="tbLiveRoom" :show-header="false" class="table-max-height" style="width:275px;border-right:0px;" highlight-current-row @current-change="handleCurrentLiveChange">
                    <el-table-column width="200px" label="名称">
                        <template scope="scope">
                            <div style="height:100%;" class="text-wrap">
                                {{scope.row.LiveRoomTitle}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="NowCount" label="数量" width="73px">
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="选择课程" label-width="115px" v-show="isliveRoom?false:true" class="new-invition-form-item-top">
                <el-table :data="this.courseList" ref="tbCourse" :show-header="false" style="width:275px;" class="table-max-height" highlight-current-row @current-change="handleCurrentCourseChange">
                    <el-table-column class="text-wrap" width="273px" label="课程名">
                        <template scope="scope">
                            <div style="height:100%;" :title="scope.row.CourseName" class="text-wrap">
                                {{scope.row.CourseName}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <div class="dialog-footer" style="text-align: right;">
            <el-button type="primary" size="small" @click="Makeinvitation" style="width: 63px;background: #42aedf;">邀约</el-button>
        </div>
    </div>
</template>
<style>
.titleClass .el-input__inner {
    height: 28px;
}

.new-invition-form-item {
    margin-bottom: 0px;
}

.new-invition-form-item-top {
    margin-bottom: 0px;
    margin-top: 10px;
}
</style>
<style scoped>
.table-max-height {
    max-height: 120px;
    overflow: auto;
    overflow-x: hidden;
}

.text-wrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
<script type="text/javascript">
import Vue from 'vue';
import { Form, FormItem, DatePicker, Select, Dialog, Option, OptionGroup, Button, Input, Table, TableColumn, } from 'element-ui';
import { Message } from 'element-ui';
import { CreateLiveRoom, GetUserRoomList, ReInvite, GetCourseExperience } from '../../api/cluesManage';
import { format, number2DateTime } from '../../util/util';
import { mapState } from 'vuex';
import { CRM_USER_INFO } from '../../util/keys';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Table)
Vue.use(TableColumn)
export default {
    name: 'createvitation',
    props: ['self', 'modal', 'contactsData', 'cluesLine', 'selectRow', 'searchPrm'],
    data() {
        return {
            loading: false,
            pickerOption: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            form: {
                //显示
                useName: '',
                phone: '',
                labelRoomName: '创建直播间',
                labelCourseName: '创建课程名',
                //显示结束
                ListenInvitationNo: '',
                CustomGuid: '',//用户guid
                ClueGuid: '',//线索guid
                CourseType: '',//线索项目
                OldListenInvitationNo: '',//试听编号(获取列表的试听编号)
                LiveRoomTitle: '',//直播间标题
                LIType: '1000470',//直播类型
                StartTime: '',//开始时间
                EndTime: '',//结束时间
                OldRoomID: '',//更新时选中的直播间(新增没有)
                IsOld: false,//是否是更新
                CourseID: '',//课程ID
                CourseName: '',//课程名称
            },
            tempDataLive: {       //暂存直播信息
                StartTime: '',//开始时间
                EndTime: '',//结束时间
            },
            tempDataCourse: {     //暂存试听课信息
                StartTime: '',//开始时间
                EndTime: '',//结束时间
            },
            isliveRoom: true,//是否直播间
            currentLiveRoom: "",
            liveBegin: '',
            liveEnd: '',
            courseBegin: '',
            courseEnd: '',
            roomList: [],
            formTime: ['', ''],
            courseList: [],
            LITypeList: [{ Id: '1000470', Name: '直播室邀约' }, { Id: '1000471', Name: '试听课账号' }],
            formLabelWidth: "100px",
        }
    },
    computed: {

    },
    methods: {
        handleCurrentLiveChange(val) {
            if (val) {
                this.liveBegin = val.StartTime;
                this.liveEnd = val.EndTime;
                this.form.OldRoomID = val.RoomID;
                this.form.OldListenInvitationNo = val.ListenInvitationNo;
                this.form.LiveRoomTitle = val.LiveRoomTitle;
                this.form.IsOld = true;
                this.form.CourseID = "";
                this.form.CourseName = "";
                this.currentLiveRoom = val;
            }
        },
        liveChange(val) {
            if (this.form.IsOld) {
                this.form.OldRoomID = "";
                this.form.IsOld = false;
                this.setCurrentLiveRoom();
            }
        },
        beginChange(val) {
            if (this.form.LIType == 1000470) {
                this.liveBegin = val;
            }
            else {
                this.courseBegin = val;
            }
            this.getRoomList();
        },
        endChange(val) {
            if (this.form.LIType == 1000470) {
                this.liveEnd = val;
            }
            else {
                this.courseEnd = val;
            }
        },
        setCurrentLiveRoom(row) {
            this.$refs.tbLiveRoom.setCurrentRow(row);
            this.form.OldRoomID = "";
            this.form.IsOld = false;
        },
        handleCurrentCourseChange(val) {
            if (val) {
                this.form.CourseID = val.ID;
                this.form.CourseName = val.CourseName;
                this.form.OldRoomID = "";
                this.form.IsOld = false;
            }
        },
        //获取邀约人信息
        getContactsInfo() {
            if (this.contactsData != undefined && this.contactsData != null && this.contactsData != '') {
                var postContacts = this.contactsData;
                this.form.useName = postContacts.TrueName;
                this.form.phone = postContacts.Mobile;
                this.form.CustomGuid = this.contactsData.Guid;
            }
            if (this.cluesLine != undefined && this.cluesLine != null && this.cluesLine != '') {
                this.form.CourseType = this.cluesLine.CourseType;
                this.form.ClueGuid = this.cluesLine.Guid;
            }
            if (this.selectRow != undefined && this.selectRow != null && this.selectRow != '') {
                var modelrow = this.selectRow;
                this.form.useName = modelrow.stuName;
                this.form.phone = modelrow.stuPhone;
                this.form.OldListenInvitationNo = modelrow.ListenInvitationNo;
                this.form.IsOld = true;
                this.form.ListenInvitationNo = modelrow.ListenInvitationNo;
                this.form.LiveRoomTitle = modelrow.LiveRoomTitle;
                this.form.CourseType = modelrow.courseType;
                this.form.LIType = modelrow.LItype.toString();
                this.form.CourseName = modelrow.courseName;
                this.form.labelRoomName = "直播间名称";
                this.form.labelCourseName = "课程名称";
                this.form.ClueGuid = modelrow.ClueGuid;
                this.form.CustomGuid = modelrow.CustomGuid;
                this.form.OldRoomID = modelrow.RoomId;
                this.form.CourseID = modelrow.courseID;
                if (modelrow.LItype == 1000470) {
                    this.liveBegin = modelrow.startTime;
                    this.liveEnd = modelrow.endTime;
                    this.currentLiveRoom = {
                        StartTime: modelrow.startTime,
                        EndTime: modelrow.endTime,
                        LiveRoomTitle: modelrow.LiveRoomTitle
                    };
                }
                else {
                    this.courseBegin = modelrow.startTime;
                    this.courseEnd = modelrow.endTime;
                    this.currentCourse = {
                        StartTime: modelrow.startTime,
                        EndTime: modelrow.endTime,
                        CourseID: modelrow.courseID
                    };
                }
            }
        },
        getRoomList() {
            var userid = "";
            var useModel = localStorage.getItem("CRM_USER_INFO")
            if (useModel != undefined && useModel != null) {
                var usedata = JSON.parse(useModel);
                if (usedata != undefined) {
                    userid = usedata.UserId;
                }
            }
            if (userid != "" && this.form.CourseType != "" && this.liveBegin != "" && this.form.LIType != "") {
                if (this.form.LIType == '1000470') {
                    var timespan = this.liveBegin;
                    var roomPrm = {
                        UserID: userid,
                        CourseType: this.form.CourseType,
                        StartTime: timespan,
                        LIType: this.form.LIType
                    }
                    GetUserRoomList(roomPrm).then(ret => { // 获取直播间列表
                        if (ret.status === 0) {
                            this.roomList = ret.result;
                        }
                    })

                }
            }
        },
        getCourseList() {
            if (this.form.CourseType != undefined && this.form.CourseType != null && this.form.CourseType != "") {
                GetCourseExperience({ courseType: this.form.CourseType }).then(ret => { // 获取课程列表
                    if (ret.status === 0) {
                        this.courseList = ret.result;
                    }
                })
            }
        },
        typeChange() {
            if (this.form.LIType == "1000471") {
                this.isliveRoom = false;
                this.getCourseList();
            }
            else {
                this.isliveRoom = true;
            }
        },
        //创建邀约
        Makeinvitation() {
            var vitationNo = this.form.OldListenInvitationNo;
            //更新
            if (this.form.LIType == "1000471") {
                this.form.OldRoomID = "";
                this.form.IsOld = false;

                this.form.StartTime = this.courseBegin;
                this.form.EndTime = this.courseEnd;

                if (!this.form.CourseName) {
                    Message({
                        message: '请选择课程',
                        showClose: true,
                        type: 'warning'
                    });
                    return;
                }
                if (this.currentCourse) {
                    if (this.currentCourse.StartTime == this.form.StartTime
                        && this.currentCourse.EndTime == this.form.EndTime
                        && this.currentCourse.CourseID == this.form.CourseID) {
                        Message({
                            message: '该试听邀约已存在',
                            showClose: true,
                            type: 'warning'
                        });
                        return;
                    }
                }
            }
            else {
                this.form.CourseID = "";
                this.form.CourseName = "";
                this.form.StartTime = this.liveBegin;
                this.form.EndTime = this.liveEnd;

                if (!this.form.LiveRoomTitle) {
                    Message({
                        message: '直播间名称错误',
                        showClose: true,
                        type: 'warning'
                    });
                    return;
                }
            }

            if (this.currentLiveRoom) {
                if (this.currentLiveRoom.StartTime != this.form.StartTime
                    || this.currentLiveRoom.EndTime != this.form.EndTime
                    || this.currentLiveRoom.LiveRoomTitle != this.form.LiveRoomTitle) {
                    this.form.OldRoomID = "";
                    this.form.IsOld = false;
                }
            }

            if (!this.form.StartTime) {
                Message({
                    message: '开始时间错误',
                    showClose: true,
                    type: 'warning'
                });
                return;
            }
            if (!this.form.EndTime) {
                Message({
                    message: '结束时间错误',
                    showClose: true,
                    type: 'warning'
                });
                return;
            }
            let roomParm = {
                useName: this.form.useName,
                phone: this.form.phone,
                ListenInvitationNo: this.form.ListenInvitationNo,
                CustomGuid: this.form.CustomGuid,
                ClueGuid: this.form.ClueGuid,
                CourseType: this.form.CourseType,
                OldListenInvitationNo: this.form.OldListenInvitationNo,
                LiveRoomTitle: this.form.LiveRoomTitle,
                LIType: this.form.LIType,
                StartTime: this.form.StartTime,
                EndTime: this.form.EndTime,
                OldRoomID: this.form.OldRoomID,
                IsOld: this.form.IsOld,
                CourseID: this.form.CourseID,
                CourseName: this.form.CourseName,
            };
            this.loading = true;
            ReInvite(roomParm).then(ret => {
                this.loading = false;
                if (ret.status === 0) {
                    this.MssageBox('更新邀约成功', 'success');
                    this.self.$store.dispatch('GetListenListData', this.searchPrm);//刷新列表
                    this.oncancel();
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        oncancel() {
            //关闭弹层
            this.modal.close();
        },
        MssageBox(msg, typeIco) {
            Message({
                message: msg,
                type: typeIco
            });
        },
    },
    mounted() {
        this.getContactsInfo();
        this.getRoomList();
    }
}
</script>