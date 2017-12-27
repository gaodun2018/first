<template>
    <div class="clues-merge">
        <el-transfer :titles="[ '保留线索', '被合并线索']" filterable :filter-method="filterMethod" filter-placeholder="线索编号" v-model="value2" :data="data2">
        </el-transfer>
        <div class="merge-text">
            <p>注：线索合并的前提条件：</p>
            <p>1、必须同项目线索 &nbsp&nbsp&nbsp&nbsp 2、成交线索不能被合并，可以合并其他未成交线索</p>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
    data() {
        const generateData2 = _ => {
            const data = [];
            const cities = [];
            const pinyin = [];
            cities.forEach((city, index) => {
                data.push({
                    label: city,
                    key: index,
                    pinyin: pinyin[index]
                });
            });
            return data;
        };
        return {
            data2: generateData2(),
            value2: [],
            filterMethod(query, item) {
                return item.pinyin.indexOf(query) > -1;
            }
        };
    }
};
</script>