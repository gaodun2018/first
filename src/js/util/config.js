import { isIE9 } from './util'
import routesMenu from '../routes/routes.js'

import { FORMAT_MENU } from '../util/keys.js'


export const getEnv = () => {
    let host = location.host;
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
        return 'dev-'
    }
    let pre = location.host.match(/(^.*?)-/);
    // 正式环境
    if (pre[0] === 'zeus-' || pre[0] === 'yun-') {
        return '';
    } else {
        pre[0] = pre[0] == 'dev-' ? 't-' : pre[0];
        // 测试及预发布环境
        return `${pre[0]}`;
    }
}
export const getBaseUrl = () => {
    let host = location.host;
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
        return '//dev-'
    }
    // let pre = location.host.match(/^.*-/);
    let pre = location.host.match(/(^.*?)-/);
    // 正式环境
    if (pre[0] === 'zeus-' || pre[0] === 'yun-') {
        return '//';
    } else {
        pre[0] = pre[0] == 'dev-' ? 't-' : pre[0];
        // 测试及预发布环境
        return `//${pre[0]}`;
    }

}
export const setWindowNBID = (menu, path) => {
    for (var i in menu) {
        if (menu[i].Url == path) {
            window.nbid = menu[i].ParentPath[0];
        }
        if (menu[i].ChildNavigations) {
            setWindowNBID(menu[i].ChildNavigations, path);
        }
    }
}
export const setWindowNID = (menu, path) => {
        for (var i in menu) {
            if (menu[i].Url == path) {
                window.nid = menu[i].ParentPath[1]
            }
            if (menu[i].ChildNavigations) {
                setWindowNID(menu[i].ChildNavigations, path);
            }
        }
    }
    //检查是否有权限
export const checkIsAuth = (menu, nbid) => {
        for (var i in menu) {
            if (menu[i].NavigationId == nbid) {
                window.isAuth = menu[i].isAuth;
                return;
            }
        }
        window.isAuth = true;
    }
    //格式化菜单树 => 面包屑菜单
export const formatRoute = (menu, path) => {
    if (!menu) return;
    //转换赋值
    let menuData = menu;
    let menuStr = JSON.stringify(menuData);
    let menuData1 = JSON.parse(menuStr);
    let routesMenus = [...menuData1, ...routesMenu]

    let formatMenuData = [];

    function createRoutes(menu, Item) {
        for (let i in menu) {
            menu[i].parenttitle = menu[i].parenttitle ? menu[i].parenttitle : [{
                name: menu[i].Title,
                url: menu[i].Url
            }];
            if (Item) {
                menu[i].parenttitle = [...Item, ...menu[i].parenttitle]
            }
            formatMenuData.push(menu[i])

            if (menu[i].ChildNavigations) {
                createRoutes(menu[i].ChildNavigations, menu[i].parenttitle);
            }
        }
    }

    createRoutes(routesMenus);
    localStorage.setItem(FORMAT_MENU, JSON.stringify(formatMenuData));

}