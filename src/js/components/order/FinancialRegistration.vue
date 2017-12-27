<template>
    <div v-loading="isLoading">
        <div id="CrmRegistrationForm">
            <div style="font-size: 12px;width: 1000px;margin: 30px auto">
                <div style="padding: 0 25px;">
                    <h3 style="font-size: 18px;text-align:center;">
                        <span style="letter-spacing: 4px">高顿网校-金融双证从业资格（证券、基金）网课协议书</span>
                    </h3>
                </div>
                <div>
                    <p style="margin: 15px 0;line-height:20px;">
                        <strong style="font-size: 14px">甲方：</strong>
                        <span>
                            上海高顿教育培训有限公司联系地址：上海 虹口区花园路 171 号花园坊 A3 栋高顿教育<br/>联系方式：sevice@gaodun.com<br/> 客服电话：400-825-0088
                        </span>
                    </p>
                    <p style="line-height:20px;">
                        <strong style="font-size: 14px">乙方：</strong>{{registerInfo.TrueName}}
                    </p>
                    <div style="height:40px;margin:top:20px;">
                        联系地址：<div contenteditable="true" style="display:inline-block;outline: none;word-break:break-all;">&nbsp;</div>
                    </div>
                    <div>
                        课程内容：
                        <div style="margin-top:10px;">
                            <table style="border-right:1px solid #000;border-bottom:1px solid #000;margin-top: 5px;width: 100%;border-collapse: collapse;font-size:12px;">
                                <tr style="height: 35px; padding: 0 5px">
                                    <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;text-align:center;">序号</th>
                                    <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;text-align:center;">课程或业务模块</th>
                                    <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;text-align:center;">单价</th>
                                    <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;text-align:center;">数量</th>
                                    <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;text-align:center;">有效期</th>
                                    <th style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;text-align:center;">优惠方案</th>
                                </tr>
                                <tr style="height: 35px; padding: 0 5px">
                                    <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                        <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; width: 100%;text-align:center; border-collapse: collapse;height:100%;font-size:12px;">
                                            <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                                <td v-if="index==0" style="height:35px;padding: 0 5px">{{index +1}}</td>
                                                <td v-if="index>0" style="height:35px;border-top:1px solid #000000;padding: 0 5px;">{{index +1}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                        <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; width: 100%;text-align:center; border-collapse: collapse;height:100%;font-size:12px;">
                                            <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                                <td v-if="index==0" style="height:35px;padding: 0 5px">{{item.ProductName}}</td>
                                                <td v-if="index>0" style="height:35px;border-top:1px solid #000000;padding: 0 5px;">{{item.ProductName}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                        <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; width: 100%;text-align:center; border-collapse: collapse;height:100%;font-size:12px;">
                                            <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                                <td v-if="index==0" style="height:35px;padding: 0 5px">{{item.ProudctPrice}}</td>
                                                <td v-if="index>0" style="height:35px;border-top:1px solid #000000;padding: 0 5px;">{{item.ProudctPrice}}</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                        <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px;text-align:center; width: 100%; border-collapse: collapse;height:100%;font-size:12px;">
                                            <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                                <td v-if="index==0" style="height:35px;padding: 0 5px">1</td>
                                                <td v-if="index>0" style="height:35px;border-top:1px solid #000000;padding: 0 5px;">1</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="border-left:1px solid #000;border-top:1px solid #000;">
                                        <table v-if="registerInfo.Course&&registerInfo.Course.length>0" style="border:0px; width: 100%; border-collapse: collapse;font-size:12px;">
                                            <tr v-for="(item, index) in registerInfo.Course" :key="item.ProductNo">
                                                <td v-if="index==0" style="height:35px;text-align:center;">{{item.PStart}}起 <br/>至 {{item.PEnd}}止</td>
                                                <td v-if="index>0" style="height:35px;text-align:center;border-top:1px solid #000000;">{{item.PStart}}起 <br/>至 {{item.PEnd}}止</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;text-align:center;">
                                        {{registerInfo.Discount}}
                                    </td>
                                </tr>
                                <tr style="height: 35px; padding: 0 5px">
                                    <td colspan="2" style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">合计（大写）</td>
                                    <td colspan="4" style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px">
                                        {{registerInfo.ShouldPayCN}}
                                    </td>
                                </tr>
                                <tr style="height: 35px; padding: 0 5px">
                                    <td colspan="6" style="border-left:1px solid #000;border-top:1px solid #000; padding: 0 5px;font-weight:bolder;">注：参训学员名单由甲方自行确定并提供给乙方。如培训期间参训学员名单发生变更的，甲方应提前 10 个工作日通知乙方。</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <p style="line-height:20px;margin-top:15px;">
                        甲、乙双方本着平等、互利、自愿的原则，经过友好协商，依据相关法律，同意按照 本合同条款，由甲方为乙方提供远程网络课程服务，具体条款如下：
                    </p>
                    <h3 style="margin:20px 0 10px 0;">
                        一、定义条款
                    </h3>
                    <p style="line-height:20px;">
                        1.1 双证从业资格考前辅导网络课程（以下简称“网课”）是指甲方推出的向特定学 员提供远程网络课程。学员按照本协议的约定和甲方的要求全面完成甲方提供的辅导 及学习课程后，甲方承诺，学员在按照国家有关规定参加本周期双证从业资格考试 后，能够通过本协议约定的 2 科考试 （即取得本年度从业资格考试合格分数线以上 的分数，具体以中国证券基金业协会规定分数为准）；如果学员在甲方辅导下全面完 成甲方提供的《基金从业保障班》或《金融家族通关班》课程后（以高顿网校后台统 计学员学习进度为准），仍达不到考试合格分数线的，甲方应按照本协议相关条款继 续提供助考服务，如果未达到考试合格分数线可以免费重读该项目下一周期课程。 （本协议另有约定的除外）。
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                        二、参加网课课程及相关解释
                    </h3>
                    <p style="line-height:20px;">
                        2.1 乙方经慎重考虑，现决定根据本协议的约定参加甲方的网课套餐(内容见 2.4 条款)， 甲方亦同意根据本协议的约定为乙方提供本周期双证从业资格考试本课程包含科目的考前 辅导课程。
                    </p>
                    <p style="line-height:20px;">
                        2.2 甲乙双方共同认为，乙方及时、全面地完成甲方提供的学习课程，是乙方通过本周期 双证从业资格考试的重要保障。为此，甲方将为乙方设计和提供优质的辅导课程及学习计 划，乙方也将按照甲方的辅导课程和学习计划的要求参加该等辅导课程。
                    </p>
                    <p style="line-height:20px;">
                        2.3 甲方阅读并同意本协议内容，甲方为乙方提供如下考试辅导服务，乙方也同意支付相 应的费用。
                    </p>
                    <p style="line-height:20px;">
                        2.4 购买课程学员报名本周期考试后，如因特殊原因如身体健康状况，工作繁忙等特殊原因 不能前往参加本次考试的，需在考试开始前 3 个工作日提前电话通知甲方备案，否则协议 自行终止；
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    三、甲方的权利与义务
                    </h3>
                    <p style="line-height:20px;">
                        3.1．收款后及时为乙方提供服务；
                    </p>
                    <p style="line-height:20px;">
                    3.2．甲方根据最新版考试大纲及教材发行后制作最新版本课程（课件跟随教材变动进行更新，课时、教师、班级设置也会随之稍作调整，如教材未变动，课件将不做更新），并按正常进度上传供乙方学习；
                    </p>
                    <p style="line-height:20px;">
                    3.3．甲方有权要求乙方提供正确的个人信息（姓名、网校用户名、身份证号、联系电话）、准考证号、考试成绩填写完整无误；
                    </p>
                    <p style="line-height:20px;">
                    3.4．甲方有义务保证乙方个人信息不得公开，只留甲方备案使用；
                    </p>
                    <p style="line-height:20px;">
                    3.5．甲方在乙方所在地成绩公布后 30 个工作日内受理保过服务申请，不得以任何理由推诿或拖延办理。
                    </p>
                    <p style="line-height:20px;">
                    3.6．甲方保证所提供的各项服务均能够正常使用；但是因不可抗力以及学员一方的原因造成不能正常使用甲方所提供的各项服务，包括但不限于互联网运营商提供的网络中断、乙方不具备上网条件（包括不具备软硬件条件或者软硬件故障）等，甲方不承担相应责任。
                    </p>
                    <p style="line-height:20px;">
                    3.7．对于乙方正常的退款申请，甲方应在 5 个工作日内给予反馈申请。(具体周期可与双方协调后确认。）
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    四、乙方的权利与义务
                    </h3>
                    <p style="line-height:20px;">
                        4.1．本协议生效后 3 个工作日内支付课程费用；乙方不得要求退费。
                    </p>
                    <p style="line-height:20px;">
                        4.2. 乙方确保报名参加的学员遵守本协议约定的内容；确保学员根据课程上传进度自主安排学习；
                    </p>
                    <p style="line-height:20px;">
                        4.3．乙方须在规定期限内（考试成绩公布后 30 天）通知学员办理甲方的后续服务，过期则视为自动放弃。
                    </p>
                    <p style="line-height:20px;">
                        4.4.乙方在甲方辅导下完成甲方提供的 70%课程课时后，仍达不到考试合格线的，乙方有权提出可选择重复学习或全额退款的申请。
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    五、不可抗力
                    </h3>
                    <p style="line-height:20px;">
                        5.1 不可抗力指超出本合同双方控制范围，无法预见，无法避免或无法克服，使得本合同一方或双方部分或者全部不能履行本合同的事件。这类事件包括但不限于地震，台风，洪水，火灾，战争，罢工，暴动，网络中断，政府行为，法律规定或其适用的变化，或者其他任何无法预见，避免或者控制的事件。
                    </p>
                    <p style="line-height:20px;">
                    5.2 如果任何一方不履行或迟延履行本协议规定的义务是由于不可抗力，则该方免除承担违约责任。
                    </p>
                    <p style="line-height:20px;">
                        5.3 在不可抗力因素消除后，曾受不可抗力因素影响而未能履约的一方应尽最大努力恢复履行其在本协议项下的义务。
                    </p>
                    <p style="line-height:20px;">
                    5.4 出国、外派、生病、怀孕、更改职业规划等不视为不可抗力。
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    六、保密义务
                    </h3>
                    <p style="line-height:20px;">
                    甲方对乙方提供的个人资料和信息具有保密义务，除非法律规定或者有权政府机关的命令和要求或者乙方同意，甲方不得将乙方的个人信息和资料泄露给任何第三方。甲方违反保密义务给乙方造成损失的，应当足额赔偿乙方的损失。
                    </p>
                    <p style="line-height:20px;">
                    乙方对本协议的内容，甲方提供的学习辅导课程的任何内容具有保密义务，未经甲方同意，乙方不得将该等内容泄露给任何第三方或者提供给任何第三方使用。乙方违反保密义务给甲方造成损失的，应当足额赔偿甲方的损失。
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    七、争议的解决
                    </h3>
                    <p style="line-height:20px;">
                    7.1 本协议的订立，执行和解释及争议的解决均应适用于中国法律；
                    </p>
                    <p style="line-height:20px;">
                    7.2 双方在履行本协议的过程中，如发生任何争议，则双方应首先进行友好协商解决；
                    </p>
                    <p style="line-height:20px;">
                    7.3 如果某一争议未在一方首次提出协商之日后 30 日内通过友好协商解决，则任何一方可将该争议提交甲方所在法院；
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    八、其他
                    </h3>
                    <p style="line-height:20px;">
                    8.1 本协议自双方盖章之日起生效。
                    </p>
                    <p style="line-height:20px;">
                    8.2 本协议一经生效，任何一方非经法定理由不得解除。
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    九、付款账号开户人：上海高顿教育培训有限公司学杂费存取专户
                    </h3>
                    <p style="line-height:20px;">
                    开户行：中国银行上海市四川北路支行
                    </p>
                    <p style="line-height:20px;">
                    账 号：441666395400
                    </p>
                    <h3 style="margin:10px 0 10px 0;">
                    附：
                    </h3>
                    <p style="line-height:20px;">
                    网课套餐内容:
                    </p>
                    <p style="line-height:20px;">
                    《_________________》课程 双证：
                    </p>
                </div>
                <div>
                    <p style="line-height:20px;">
                        基金从业--《基金法律法规、职业道德与业务规范》+《证券投资基金基础知识》+《基金法律法规、职业道德与业务规范》+《私募股权投资基金基础知识》</br>
                        证券从业--《证券市场基本法律法规》+《金融市场基础知识》
                    </p>
                    <p style="line-height:20px;">学员保障课程有效期:12个月</p>
                    <p style="line-height:20px;">符合协议规定学员，不过两年内免费重修 √</p>
                    <p style="line-height:20px;">符合协议规定学员，不过可选择全额退款 √</p>
                    <p style="line-height:20px;">站内活动参与优先权 √</p>
                    <p style="line-height:20px;">服务体系直播公开课&答疑 √</p>
                    <p style="line-height:20px;">APP 课堂 √</p>
                    <p style="line-height:20px;">在线题库 √</p>
                    <p style="line-height:20px;">全真模拟机考系统 √</p>
                    <p style="line-height:20px;">考试押题 √</p>
                    <p style="line-height:20px;">学习阶段测试 √</p>
                    <p style="line-height:20px;">个性化学习报告 √</p>
                    <p style="line-height:20px;">教学电子课件 √</p>
                    <p style="line-height:20px;">班主任服务 √</p>
                    <p style="line-height:20px;">班级管理 √</p>
                    <div style="padding-top:30px;">
                        <p style="line-height:25px;">
                            <span style="font-weight:bolder">甲 方：</span>上海高顿教育培训有限公司（盖章）
                        </p>
                        <p style="line-height:25px;">
                            授权代表签字:
                        </p>
                        <p style="line-height:25px;">
                            日期：{{registerInfo.CurrDate}}
                        </p>
                    </div>
                   <div style="padding-top:30px;">
                        <p style="line-height:25px;">
                            <span style="font-weight:bolder">乙 方：</span>{{registerInfo.TrueName}}（盖章）
                        </p>
                        <p style="line-height:25px;">
                            授权代表签字:
                        </p>
                        <p style="line-height:25px;">
                            日期：{{registerInfo.CurrDate}}
                        </p>
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
import {FinancialRegisterInfo,CreateRegisterAgreement} from "../../api/anonymous";
import { Message } from "element-ui";
export default {
  data() {
    styleBg: {
      background: "#000";
    }
    return {
      checked: "",
      radio: "",
      isLoading: false,
      isShowBtn: false,
      isCourse: null,
      registerInfo: {}
    };
  },
  methods: {
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
    let cardNo = this.$route.query.idCard;
    FinancialRegisterInfo({ OrderNo: this.$route.query.OrderNo }).then(ret => {
        // 用户协议
        this.isLoading = false;
        if (ret.data.status === 0) {
          this.registerInfo = ret.data.result;
          if (!ret.data.result.HasConfirm && cardNo) {
            this.isShowBtn = true;
          } 
          else {
            if (ret.data.result.RegisterAgreement)
              window.location.href = ret.data.result.RegisterAgreement;
          }
        }
      }).catch(() => {
        this.isLoading = false;
      });
  }
};
</script>

