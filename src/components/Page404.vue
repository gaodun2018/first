<template>
    <div style="background:#f0f2f5;margin-top: -20px;">
        <div class="wscn-http404">
            <div class="pic-404">
                <img class="pic-404__parent" src="./../assets/images/404/404.png" alt="404">
                <img class="pic-404__child left" src="./../assets/images/404/404_cloud.png" alt="404">
                <img class="pic-404__child mid" src="./../assets/images/404/404_cloud.png" alt="404">
                <img class="pic-404__child right" src="./../assets/images/404/404_cloud.png" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__oops">OOPS!</div>
                <div class="bullshit__info">版权所有<a class='link-type' href='/' target='_blank'>高顿网校</a></div>
                <div class="bullshit__headline">{{ message }}</div>
                <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
                <a href="/" @click="goPrevious" class="bullshit__return-home">返回首页</a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                //UI组件也需要加return
            }
        },
        computed: {
            message() {
                return '特朗普说这个页面你不能进......'
            }
        },
        methods: {
            goPrevious() {
                this.push({
                    path: '/index',
                    context: this
                });
                location.reload();
                //this.$router.push({path: '/'});
                //location.reload();
            }
        }
    }
</script>
