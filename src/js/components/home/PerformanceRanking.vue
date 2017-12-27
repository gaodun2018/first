<template>
    <div class="content-box-show" style="height: 481px">
        <el-row style="padding:0 20px 15px 0">
            <el-col :sm="7" class="contact-title">
                <p>个人业绩</p>
            </el-col>
            <el-col :sm="17" class="performance-troops">
                <span style="font-size: 12px;color: #44576c">单位：元</span>
                <span class="troops-tab">
                    <span style="cursor: pointer" :class="{'f-active' : rankTab === 0}" @click="onRankTab(0)">红黑榜</span>
                    <i style="border-right: 1px solid #ccc;padding-right: 10px"></i>
                    <span style="cursor: pointer;padding-left: 10px" :class="{'f-active' : rankTab === 1}" @click="onRankTab(1)">排行榜</span>
                </span>
            </el-col>
        </el-row>
        <div v-if="isRank">
            <div v-if="redRankData.length">
                <el-row style="padding: 0 20px">
                    <el-col :sm="8" class="red-ranking" v-for="item in redRankData" :key="item.name" v-if="item">
                        <div class="rank-item">
                            <i class="inventory-icon-crown"></i>
                            <i class="inventory-circle"></i>
                            <p>{{item.UserName}}</p>
                            <div class="inventory-item">
                                <span style="color: #869aaf">成交数：</span>
                                <span style="color: #546578">{{item.Clinch}}</span>
                            </div>
                            <div class="inventory-item">
                                <span style="color: #869aaf">业绩：</span>
                                <span style="color: #546578">{{item.Achievement}}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="height: 80px;line-height: 80px">
                    <el-col :sm="10">
                        <div class="performance-vs-solid"></div>
                    </el-col>
                    <el-col :sm="4">
                        <div class="performance-vs-text">VS</div>
                    </el-col>
                    <el-col :sm="10">
                        <div class="performance-vs-solid"></div>
                    </el-col>
                </el-row>
                <el-row style="padding: 0 20px">
                    <el-col :sm="8" class="black-ranking" v-for="item in blackRankData" :key="item.UserId" v-if="item">
                        <div class="rank-item" :style="item.style" style="padding: 10px 0 15px 0">
                            <i class="inventory-circle"></i>
                            <p>{{item.UserName}}</p>
                            <div class="inventory-item">
                                <span style="color: #869aaf">成交数：</span>
                                <span style="color: #546578">{{item.Clinch}}</span>
                            </div>
                            <div class="inventory-item">
                                <span style="color: #869aaf">业绩：</span>
                                <span style="color: #546578">{{item.Achievement}}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align: center;margin-top: 100px" v-else>
                <span>暂无数据</span>
            </div>
        </div>
        <div v-else class="panking-table">
            <template>
                <el-table :data="rankTable" height="435" border style="width: 100%">
                    <el-table-column v-for="item in rankItem" :key="item.name" :min-width="item.w" :prop="item.value" :label="item.name">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<style>
.panking-table .el-table .cell, .el-table th > div {
    padding: 0 5px;
}
</style>
<script>
import Vue from 'vue';
import { CRM_USER_INFO } from '../../util/keys';
import { GetRankingList, GetMonthBlackRanking, GetMonthRedRanking } from '../../api/home';

export default {
    data() {
        return {
            rankTab: 0, // 红黑榜排列
            isRank: true,
            rankTable: [],
            blackRankData: [],
            redRankData: [],
            rankItem: [
                {
                    name: '排名',
                    value: 'Sort',
                    w: '45'
                }, {
                    name: '姓名',
                    value: 'UserName',
                    w: 80
                }, {
                    name: '所在团队',
                    value: 'TeamName',
                    w: 100
                }, {
                    name: '成交单数',
                    value: 'Clinch',
                    w: 70
                }, {
                    name: '销售额',
                    value: 'Sales',
                    w: 90
                }, {
                    name: '退费',
                    value: 'Refund',
                    w: 60
                }, {
                    name: '业绩',
                    value: 'Achievement',
                    w: 80
                },
            ],
        }
    },
    methods: {
        onRankTab(type) { // 业绩排行
            this.rankTab = type;
            if (type === 0) {
                this.isRank = true;
            } else {
                this.isRank = false;
            }
        }
    },
    created() {
        GetRankingList().then(ret => { // 个人业绩排行榜
            if (ret.status === 0) {
                this.rankTable = ret.result;
            }
        });
        GetMonthBlackRanking({ count: 3 }).then(ret => { // 黑榜接口
            if (ret.status === 0) {
                this.blackRankData = ret.result || [];
            }
        });
        GetMonthRedRanking({ count: 3 }).then(ret => { // 红榜接口
            if (ret.status === 0) {
                this.redRankData = ret.result || [];
            }
        });
    }
}
</script>