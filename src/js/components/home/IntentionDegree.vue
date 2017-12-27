<template>
    <el-row class="clues-figure">
        <p class="figure-unit">单位：个</p>
        <el-col style="padding: 0 15px">
            <div class="clues-figure-left">
                <ul style="line-height: 50px">
                    <li>
                        <span class="clues-price">HP</span>
                        <div class="el-progress-bar" style="margin-right: -44px;width: 95%">
                            <div class="el-progress-bar__outer" style="height: 7px">
                                <div class="el-progress-bar__inner" style="background-color: #a7cf4f" :style="{width: IntentionTotal ? ((IntentionData.HP/IntentionTotal)*100+'%') : 0}">
                                    <div class="el-progress-bar__innerText"></div>
                                </div>
                            </div>
                        </div>
                        <span>{{IntentionData.HP}}</span>
                    </li>
                    <li>
                        <span class="clues-price">MP</span>
                        <div class="el-progress-bar" style="margin-right: -44px;width: 95%">
                            <div class="el-progress-bar__outer" style="height: 7px">
                                <div class="el-progress-bar__inner" style="background-color: #a7cf4f" :style="{width: IntentionTotal ? ((IntentionData.MP/IntentionTotal)*100+'%') : 0}">
                                    <div class="el-progress-bar__innerText"></div>
                                </div>
                            </div>
                        </div>
                        <span>{{IntentionData.MP}}</span>
                    </li>
                    <li>
                        <span class="clues-price">D</span>
                        <div class="el-progress-bar" style="margin-right: -44px;width: 95%">
                            <div class="el-progress-bar__outer" style="height: 7px">
                                <div class="el-progress-bar__inner" style="background-color: #a7cf4f" :style="{width: IntentionTotal ? ((IntentionData.D/IntentionTotal)*100+'%') : 0}">
                                    <div class="el-progress-bar__innerText"></div>
                                </div>
                            </div>
                        </div>
                        <span>{{IntentionData.D}}</span>
                    </li>
                </ul>
            </div>
            <div style="color: #869aaf;line-height: 20px">
                <div>
                    <span style="margin-right: 10px">HP：3天内成交</span>
                    <span>MP：7天内成交</span>
                </div>
                <div>
                    <span>D：已交定金</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue';
import { GetIntentionGrade } from '../../api/home';

export default {
    data() {
        return {
            userInfo: '', // 用户信息
            IntentionTotal: 0,
            IntentionData: {
                HP: 0,
                MP: 0,
                D: 0
            }, // 意向度统计
        }
    },
    mounted() {
        GetIntentionGrade().then(ret => { 
            if (ret.status === 0) {
                this.IntentionData = ret.result;
                this.IntentionTotal = parseInt(ret.result.D) + parseInt(ret.result.HP) + parseInt(ret.result.MP);
            }
        });
    }
}
</script>

