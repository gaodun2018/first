import { isIE9 } from './util'
export const getEnv = () => {
    let host = location.host;
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
        return 'dev-'
    }
    let pre = location.host.match(/(^.*?)-/);
    // 正式环境
    if (pre[0] === 'zeus-') {
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
    if (pre[0] === 'zeus-') {
        return '//';
    } else {
        pre[0] = pre[0] == 'dev-' ? 't-' : pre[0];
        // 测试及预发布环境
        return `//${pre[0]}`;
    }

}
export const setWindowNID = (menu, path) => {
    for (var i in menu) {
        if (menu[i].Url == path) {
            window.nid = menu[i].ParentPath[0]
        }
        if (menu[i].ChildNavigations) {
            setWindowNID(menu[i].ChildNavigations, path);
        }
    }
}