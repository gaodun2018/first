<template>
    <div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {post} from '../util/zeusAxios';
    import {getCookie, setCookie} from '../../../util/cookie.js';
    import {stringify} from 'queryString';
    import {parseUrl} from 'base';
    import { getEnv } from '../util/config';
    import {SAAS_TOKEN, SAAS_USER_INFO, SAAS_MENU, SAAS_CURRENT_SUBMENU, SAAS_CURRENT_LEVEL_ONE_MENU} from '../util/keys';
    export default {
        data: function () {
            return {
                menu: {},
                to: ''
            }
        },
        methods: {
            /**
             * 将接口返回的菜单全部处理生成一级菜单
             * @param menu 菜单
             */
            flatMenu(menu) {
                for (let i in menu) {
                    menu[i].Url = menu[i].Url || Math.random().toString();
                    let id = menu[i].NavigationId;
                    this.menu[id] = menu[i];
                    if (menu[i].ChildNavigations) {
                        this.flatMenu(menu[i].ChildNavigations)
                    }
                }
            },
            /**
             * 利用url参数得出一级菜单ID，和二级菜单内容
             * @param url { String } url上传递的 to 参数值
             */
            setMenuInfo(url) {
                for (let i in this.menu) {
                    if (this.menu[i].Url == url) {
                        let parentID = this.menu[i].ParentID;
                        let subMenu = this.menu[parentID];
                        let levelOneID = subMenu.ParentID || subMenu.NavigationId;
                        localStorage.setItem(SAAS_CURRENT_SUBMENU, JSON.stringify(subMenu));
                        localStorage.setItem(SAAS_CURRENT_LEVEL_ONE_MENU, levelOneID);
                        return;
                    }
                }
            }
        },
        async created() {
            let pre = getEnv();
            let gdsid = getCookie(`${pre}GDSID`);
            let to = location.href.match(/to=.*/)[0];
            to = decodeURIComponent(to).replace('to=', '');
            if (!gdsid) {
                this.$router.push({path: '/login'})
                return;
            }
            setCookie('GDSID', gdsid);
            let loginRet = await this.$http.getToken(stringify({
                grant_type: 'password'
            }));
            if (loginRet.access_token) {
                setCookie(SAAS_TOKEN, loginRet.access_token);
            }
            let ret = await this.$http.getLoginUserInfo(); // 获取用户信息
            if (ret.status == 0) {
                localStorage.setItem(SAAS_USER_INFO, JSON.stringify(ret.result));
                let menuRet = await this.$http.getCurrentUserMenuTree();
                if (menuRet.status == 0) {
                    this.flatMenu(menuRet.result);  // 处理得出新的菜单存储到this.menu中
                    localStorage.setItem(SAAS_MENU, JSON.stringify(menuRet.result));  // 存储所有菜单
                    this.setMenuInfo(to);   // 跳转url前所需的一级菜单ID和二级菜单内容
                    history.replaceState({url:'/',title:document.title},document.title,'/')
                    this.$router.push({path: to});

                }
            }
        },
        mounted() {

        },
        destroyed() {
            //
        }
    }
</script>