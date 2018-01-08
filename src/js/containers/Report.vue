<template>
    <div>
        <iframe :src="this.src" id="iframepage" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>
    </div>
</template>
<script>
import Vue from 'vue';
import { stringify } from 'queryString';
import { parseUrl } from 'base';
import { getEnv } from '../util/config';
import { CRM_TOKEN } from '../util/keys';
import { getCookie } from 'cookieUtils';
import { CRM_USER_INFO } from '../util/keys';

export default {
    data: function() {
        return {
            height: 0
        }
    },
    computed: {
        src() {
            let token = getCookie(CRM_TOKEN);
            let pre = getEnv();
            let GDSID = getCookie(pre + 'GDSID');
            let key = this.$route.params.Key || this.$route;
            let userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
            if (!key)
                return "";
            if (pre === 'dev-') {
                console.log(`http://t-report.gaodunwangxiao.com/ReportServer/Pages/ReportViewer.aspx?/${key.fullPath.split('url=')[1]}&userId=${userInfo.UserId}`, 11);
                return `http://t-report.gaodunwangxiao.com/ReportServer/Pages/ReportViewer.aspx?/${key.fullPath.split('url=')[1]}&userId=${userInfo.UserId}`;
                // if (key.query && key.query.url) {
                // } else {
                    // return `http://localhost:7171//Report/Index?key=${key}&gdsid=${GDSID}&token=${token}&userId=${userInfo.UserId}`;
                    // return `http://192.168.60.235:6002/Report/Index?key=${key}&gdsid=${GDSID}&token=${token}&userId=${userInfo.UserId}`;
                // }
            }
            return `//${pre}report.gaodunwangxiao.com/ReportServer/Pages/ReportViewer.aspx?/${key.fullPath.split('url=')[1]}&userId=${userInfo.UserId}`;
            //  return `//${pre}report.gaodun.com/Report/Index?key=${key}&gdsid=${GDSID}&token=${token}&userId=${userInfo.UserId}`;
        },
    },
    methods: {
        resetIframeHeight() {
            var ifm = document.getElementById("iframepage");
            ifm.height = document.body.offsetHeight;
        }
    },
    created() {},
    mounted() {
        this.resetIframeHeight();
    }
}
</script>