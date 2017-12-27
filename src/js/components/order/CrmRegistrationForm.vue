<template>
    <div v-loading="isLoading">
        <div id="CrmRegistrationForm">
            <div style="font-size: 12px;width: 1000px;margin: 30px auto">
                <div style="border-bottom: 1px solid #000">
                    <div style="float:right;width:150px">
                        <div style="position: relative;top: -15px; line-height: 25px">
                            <p style="text-decoration: underline">编号：{{registerInfo.OrderNo}}</p>
                            <p style="text-decoration: underline">项目：{{registerInfo.CourseType}}</p>
                        </div>
                    </div>
                    <div style="text-align: center; width: 150px;float:left">
                        <div>
                            <img src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/3a362_20170822163155.jpg" />
                        </div>
                        <div style="background: #000; color: #fff; height: 20px; line-height: 20px">全球财经证书培训领导品牌</div>
                    </div>
                    <div style="padding: 0 25px;margin-left: 165px; margin-right: 165px">
                        <h3 style="font-size: 23px;margin: -10px 0 10px 0">
                            <span style="letter-spacing: 4px">高顿财经学员入学注册表</span>
                            <strong style="padding-left: 15px">Registration Form</strong>
                        </h3>
                        <div style="letter-spacing: 4px;line-height: 23px">
                            <p>请认真、完整地填写本表，便于我们与您进行及时、准确地沟通。</p>
                            <p>在任何情况下，我们都不会将您填写的个人信息向第三方透露。
                                <strong>*号必填！</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <p style="margin: 15px 0">
                        <span style="display: inline-block; width: 13px; height: 12px; background: #000;vertical-align: text-top;"></span>
                        <strong style="font-size: 14px">学员填写部分</strong>
                    </p>
                    <strong style="font-size: 14px">1.Pesonal Information【基本信息】</strong>
                    <table style="border-right:1px solid #000;border-bottom:1px solid #000;margin-top: 5px;font-size:12px;width: 100%;border-collapse: collapse">
                        <tbody>
                            <tr v-for="item in information" :key="item.name1">
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">{{item.name1}}</td>
                                <td v-if="item.value1 == 'EmergencyContact'" style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">
                                    <div contenteditable="true" style="outline: none" v-if="!registerInfo[item.value1]&&!registerInfo[item.value3]"></div>
                                    {{registerInfo[item.value1]}} {{registerInfo[item.value3]}}
                                </td>
                                <td v-else style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">
                                    <div contenteditable="true" style="outline: none" v-if="!registerInfo[item.value1]"></div>
                                    {{registerInfo[item.value1]}}
                                </td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">
                                    {{item.name2}}
                                </td>
                                <td v-if="item.value2 == 'contenteditable'" style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">
                                    <div contenteditable="true" style="outline: none"></div>
                                </td>
                                <td v-else style="border-left:1px solid #000;border-top:1px solid #000; line-height: 30px; padding: 0 5px" width="248px">
                                    {{registerInfo[item.value2]}}
                                    <div contenteditable="true" style="outline: none" v-if="!registerInfo[item.value2]"></div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">*Address【快递收件地址】</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" colspan="3">
                                    <div contenteditable="true" style="outline: none"></div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;padding: 0 5px;line-height: 25px" colspan="4">
                                    <strong style="font-size: 14px">*您是否已经清楚您所报读的课程，需要具备哪些学历/学分条件才可获得考试资格或者获取证照？(如有疑问请咨询课程顾问)</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="border-left:1px solid #000;">
                                    <table>
                                        <tr>
                                            <td>
                                                <table style="border:0px; border-collapse: collapse;font-size:12px;">
                                                    <tr style="height:35px;">
                                                        <td style="padding:0 5px;width:16px;"><img id="cursorOne" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" @click="affirmCourse(1)" style="border:0px;" /></td>
                                                        <td style="width:72px;">是，我很清楚</td>
                                                        <td style="padding:0 5px;width:16px;"><img id="cursorTwo" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" @click="affirmCourse(2)" style="border:0px;" /></td>
                                                        <td style="width:228px;">是，不过我不以考证为目的，参加培训即可</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" style="border-left:1px solid #000;border-top:1px solid #000;">
                                    <table id="clientSource" style="border:0px; border-collapse: collapse;font-size:12px;margin:0px;">
                                        <tr>
                                            <td style="border-right:1px solid #000;width:60px;height:30px;padding: 0 5px;">信息来源</td>
                                            <td>
                                                <table style="border:0px; border-collapse: collapse;font-size:12px;">
                                                    <tr>
                                                        <td style="padding:0 5px;width:16px;"><img @click="onSource(0)" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;" /></td>
                                                        <td>网络</td>
                                                        <td style="padding:0 5px;width:16px;"><img @click="onSource(1)" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;" /></td>
                                                        <td>朋友介绍</td>
                                                        <td style="padding:0 5px;width:16px;"><img @click="onSource(2)" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;" /></td>
                                                        <td>报纸</td>
                                                        <td style="padding:0 5px;width:16px;"><img @click="onSource(3)" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;" /></td>
                                                        <td>宣传单</td>
                                                        <td style="padding:0 5px;width:16px;"><img @click="onSource(4)" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;" /></td>
                                                        <td>户外广告</td>
                                                        <td style="padding:0 5px;width:16px;"><img @click="onSource(5)" src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;" /></td>
                                                        <td>其他(
                                                            <span contenteditable="true" style="outline: none;"></span>)</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p style="font-size: 14px; margin-top: 8px">
                        <strong>Golden Family【高顿校友录信息表】</strong>
                    </p>
                    <table style="border-right:1px solid #000;border-bottom:1px solid #000;margin-top: 5px;width: 100%;border-collapse: collapse;font-size:12px;">
                        <tbody>
                            <tr v-for="item in goldenFamily" :key="item.name1">
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">{{item.name1}}</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">
                                    <div contenteditable="true" style="outline: none"></div>
                                </td>
                                </td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">{{item.name2}}</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;height: 30px; line-height: 30px; padding: 0 5px" width="248px">
                                    <div contenteditable="true" style="outline: none"></div>
                                </td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <p style="font-size: 14px; margin: 8px 0 5px 0">
                        <strong>2.请提供以下附件，以帮助您的学籍注册:</strong>
                    </p>
                    <div style="border: 1px solid;line-height: 23px; padding: 5px">
                        <div>
                            <span>1.身份证/学生证复印件</span>
                            <span>2.学历/学位证复印件</span>
                            <span>3.大专以上所有成绩单复印件</span>
                            <span>4.签订的课程协议</span>
                        </div>
                        <div>
                            <span>CMA学员请提供附件 1、2 和 4；</span>
                            <span>USCPA学员请提供附件1、2、3 和 4；</span>
                        </div>
                        <div>
                            <span>CPA、会计职称、ACCA、CFA、FRM学员请提供附件1 和 4；</span>
                        </div>
                    </div>
                </div>
                <div>
                    <p style=" margin-top: 8px ">
                        <span style="display: inline-block; width: 13px; height: 12px; background: #000;vertical-align: text-top; "></span>
                        <strong style="font-size: 14px ">课程顾问填写部分</strong>
                    </p>
                    <table style="border-right:1px solid #000;border-bottom:1px solid #000;margin-top: 5px;width: 100%;border-collapse: collapse;font-size:12px;">
                        <tbody>
                            <tr style="text-align: center;height: 30px; line-height: 30px; padding: 0 5px">
                                <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" width="248px ">*报名课程名称</th>
                                <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" width="130px ">*应付金额</th>
                                <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" width="130px ">*实付金额</th>
                                <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" width="248px ">*学籍起止</th>
                                <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" width="130px ">备注</th>
                            </tr>
                            <tr style="height: 35px; padding: 0 5px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                    <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; width: 100%; border-collapse: collapse;height:100%;font-size:12px;">
                                        <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                            <td v-if="index==0" style="height:45px;padding: 0 5px">{{index +1}}、{{item.ProductName}}</td>
                                            <td v-if="index>0" style="height:45px;border-top:1px solid #000000;padding: 0 5px;">{{index +1}}、{{item.ProductName}}</td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="text-align: center;border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">{{registerInfo.ShouldPay}}</td>
                                <td style="text-align: center;border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">{{registerInfo.PayCount}}</td>
                                <td style="text-align: center;border-left:1px solid #000;border-top:1px solid #000;">
                                    <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; width: 100%; border-collapse: collapse;font-size:12px;">
                                        <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                            <td v-if="index==0" style="height:45px;text-align:center;">{{item.PStart}}起 <br/>至 {{item.PEnd}}止</td>
                                            <td v-if="index>0" style="height:45px;text-align:center;border-top:1px solid #000000;">{{item.PStart}}起 <br/>至 {{item.PEnd}}止</td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                    <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; border-collapse: collapse;font-size:12px;width:100%;">
                                        <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                            <td v-if="index==0" style="height:45px;text-align:left;">
                                                &nbsp;
                                            </td>
                                            <td v-if="index>0" style="height:45px;text-align:left;border-top:1px solid #000000;">
                                                &nbsp;
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr style="padding: 0 5px;height: 30px;line-height: 30px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">代收报名费、应收资料费（请备注）</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px"></td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px"></td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">收据编号</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px"></td>
                            </tr>
                            <tr style="padding: 0 5px;height: 30px;line-height: 30px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">其他应收款项目（请备注）</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px"></td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px"></td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">支付方式</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px"></td>
                            </tr>
                            <tr style=" padding: 0 5px;height: 30px;line-height: 30px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">优惠金额/折扣</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" colspan="2">{{registerInfo.Discount}}</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" colspan="2 ">出纳签字：</td>
                            </tr>
                            <tr style="padding: 0 5px;height: 30px;line-height: 30px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">应缴金额合计</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" colspan="2">{{registerInfo.ShouldPay}}</td>
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" colspan="2 ">课程顾问签字：</td>
                            </tr>
                            <tr style=" padding: 0 5px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000;line-height: 20px" colspan="5 ">
                                    <table style="border:0px; border-collapse: collapse;font-size:12px;">
                                        <tr>
                                            <td>
                                                <table style="font-size:12px;">
                                                    <tr>
                                                        <td>
                                                            <span>课程类型：</span>
                                                        </td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;width:16px;height:16px" />
                                                        </td>
                                                        <td>周末班</td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;width:16px;height:16px" />
                                                        </td>
                                                        <td>脱产班</td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;width:16px;height:16px" />
                                                        </td>
                                                        <td>寒暑期班</td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;width:16px;height:16px" />
                                                        </td>
                                                        <td>网课</td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img src="http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png" style="border:0px;width:16px;height:16px" />
                                                        </td>
                                                        <td>其他</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table style="font-size:12px;">
                                                    <tr>
                                                        <td>合同类型：</td>
                                                        <td style="padding:0 5px;width:16px;"><img :src="registerInfo.ContractType === 1?'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/b6fa1_20170822162907.png ':'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/ef71d_20170822162959.png'" style="border:0px;border:0px;width:12px;height:12px;" />
                                                        </td>
                                                        <td>
                                                            新签约
                                                        </td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img :src="registerInfo.ContractType === 2?'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/b6fa1_20170822162907.png ':'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/ef71d_20170822162959.png'" style="border:0px;border:0px;width:12px;height:12px;" />
                                                        </td>
                                                        <td style="width:150px;">
                                                            续费
                                                        </td>
                                                        <td>
                                                            <span></span>是否推荐：</td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img :src="registerInfo.Recommender?'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/b6fa1_20170822162907.png':'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/ef71d_20170822162959.png'" style="border:0px;border:0px;width:12px;height:12px;" />
                                                        </td>
                                                        <td>
                                                            是
                                                        </td>
                                                        <td style="padding:0 5px;width:16px;">
                                                            <img :src="!registerInfo.Recommender?'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/b6fa1_20170822162907.png':'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/ef71d_20170822162959.png'" style="border:0px;border:0px;width:12px;height:12px;" />
                                                        </td>
                                                        <td>
                                                            否
                                                        </td>
                                                        <td>
                                                            （推荐人：
                                                            <span></span>）
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr style=" padding: 0 5px;height: 30px;line-height: 30px">
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" colspan="5 ">
                                    <div>
                                        <span>首课班级：</span>
                                        <span contenteditable="true" style="outline: none"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr style=" padding: 0 5px" height="80px ">
                                <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px" colspan="5 ">
                                    <div>
                                        <span>补充说明：</span>
                                        <span>{{registerInfo.OrderRemark}}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div style="margin: 10px 0;line-height: 20px;">
                            <strong>填表须知：</strong>
                            <p>请准确填写报名注册信息，若联系方式有更改，请及时来电告知我校老师，以便于我们提供学员服务。第一次开课前，我们会以短信、电子邮件或电话形式通知开课信息，届时请注意查收，谢谢！</p>
                            <strong>本人已阅读组册以及
                                <span>{{registerInfo.Agreements}}</span>，保证所填写的个人信息真实并同意
                                <span>{{registerInfo.Agreements}}</span>中的各项条款以及双方协商一致的补充条款（在以上“补充说明”栏中的描述）。</strong>
                        </div>
                        <div style="text-align: right ">
                            <span>学员签字：
                                <span style="border-bottom: 1px solid #000;padding-left: 60px">&nbsp&nbsp&nbsp&nbsp&nbsp</span>
                            </span>
                            <span>日期：
                                <span style="padding-left: 60px;border-bottom: 1px solid #000 ">年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp月&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp日</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="text-align:center;margin-bottom: 20px">
            <button v-if="isShowBtn" @click="onRegistration" style="width: 85px;height: 28px;padding-left: 10px;border-radius: 4px;outline: none;cursor: pointer;background: #49a1f6;border: 0;color: #fff;">确定</button>
        </div>
    </div>
</template>
<script>
import { CustomRegisterInfo, CreateRegisterAgreement } from '../../api/anonymous';
import { Message } from 'element-ui';
export default {
    data() {
        styleBg: {
            background: '#000'
        }
        return {
            checked: '',
            radio: '',
            isLoading: false,
            isShowBtn: false,
            isCourse: null,
            registerInfo: {},
            information: [
                {
                    name1: '*Chinese Name【中文名】',
                    name2: 'English Name【英文名】',
                    value1: 'TrueName',
                    value2: 'contenteditable'
                }, {
                    name1: '*Mobile【移动电话】',
                    name2: 'Tel.【固定电话】',
                    value1: 'Telphone',
                    value2: 'contenteditable'
                }, {
                    name1: '*ID No.【身份证或护照号码】',
                    name2: '*E-mail.【电子邮件】',
                    value1: 'IDNo',
                    value2: 'Email'
                }, {
                    name1: 'Company【公司名称】',
                    name2: 'Position【职位】',
                    value1: 'Company',
                    value2: 'contenteditable'
                }, {
                    name1: 'School【毕业/在读院校】',
                    name2: 'Major/Grade【专业/年级】',
                    value1: 'School',
                    value2: 'Major'
                }, {
                    name1: '*Emergency Contact【紧急联系人】',
                    name2: 'Certificate【最高学历】',
                    value1: 'EmergencyContact',
                    value2: 'Certificate',
                    value3: 'EmergencyContactNo'
                }
            ],
            goldenFamily: [{
                name1: 'Birthday【生日】',
                name2: 'Permanent【常在地】'
            }, {
                name1: 'Interests【兴趣爱好】',
                name2: 'QQ/MSN/其他'
            }, {
                name1: '职业需求及方向',
                name2: '喜欢参加那一类活动？'
            }]
        }
    },
    methods: {
        affirmCourse(index) {
            var cursorOne = document.getElementById('cursorOne');
            var cursorTwo = document.getElementById('cursorTwo');
            if (index == 1) {
                cursorOne.src = "http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/a9a47_20170822180437.png";
                cursorTwo.src = "http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png";
            } else if (index == 2) {
                cursorOne.src = "http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png";
                cursorTwo.src = "http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/a9a47_20170822180437.png";
            }
        },
        onSource(type) {
            var clientSource = document.getElementById('clientSource');
            var currentSource = clientSource.getElementsByTagName("img");
            for (var j = 0; j < currentSource.length; j++) {
                currentSource[j].src = 'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/2a90c_20170822163035.png';
            }
            currentSource[type].src = 'http://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/201708/22/a9a47_20170822180437.png';
        },
        onRegistration() {
            const registrationHtml = document.getElementById('CrmRegistrationForm');
            this.$confirm(`协议确认后将不能修改，是否确认？`, '协议确认', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                let objParams = {
                    OrderNo: this.$route.query.OrderNo,
                    FileContent: registrationHtml.innerHTML
                }
                this.isLoading = true;
                CreateRegisterAgreement(objParams).then(ret => {  // 用户协议
                    this.isLoading = false;
                    if (ret.data.status === 0) {
                        this.isShowBtn = false;
                        Message({
                            message: '提交成功!',
                            showClose: true,
                            type: 'success'
                        });
                    }
                    else {
                        Message({
                            message: '提交失败! ' + ret.data.info,
                            showClose: true,
                            type: 'warning'
                        });
                    }
                }).catch(() => {
                    this.isLoading = false;
                });
            });
        }
    },
    created() {
        this.isLoading = true;
        let cardNo=this.$route.query.idCard;
        CustomRegisterInfo({ OrderNo: this.$route.query.OrderNo }).then(ret => {  // 用户协议
            this.isLoading = false;
            if (ret.data.status === 0) {
                this.registerInfo = ret.data.result;
                if (!ret.data.result.HasConfirm&&cardNo)
                    this.isShowBtn = true;
                else {
                    if(ret.data.result.RegisterAgreement){
                        window.location.href=ret.data.result.RegisterAgreement;
                    }
                }
            }
        }).catch(() => {
            this.isLoading = false;
        });
    }
}
</script>

