/**
 * Created by Administrator on 2017/7/26.
 */
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
let u = url.parse('https://t-baiyiapi.gaodun.com');
let customRoutes = [];
let strRequire = `import Entry from '../containers/Entry.vue';\n`;
// let routes = `export const routes = [\n\t{ path: '/', name:'550',component: Entry ,redirect: '/index',children: [\n`;
let routes = `export const routes = [\n\t{ path: '/', name:'5500',component: Entry ,redirect: '/login',children: [\n`;
//2017-12-15 16:10:39  修改
let login = '';
/**
 * 获取CRM系统菜单
 * @returns {Promise}
 */
let loadTreeData = () => {
        return new Promise((resolve, reject) => {
            http.get({
                host: u['host'],
                port: 80,
                path: '/Menu/GetAppMenuTree?appid=180302&t=2'
            }, res => {
                let json = '';
                res.on('data', (ret) => {
                    json += ret;
                });
                res.on('end', () => {
                    let ret = JSON.parse(json);
                    resolve(ret);
                })
            });
        })
    }
    /**
     * 将自定义的菜单文件与接口返回的菜单文件进行合并
     * @type {Promise}
     */
let readCustom = new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '/src/js/routes/index.json'), 'utf-8', (err, data) => {
        customRoutes = JSON.parse(data);
        // resolve(customRoutes)   //无接口开发模式
        loadTreeData().then(value => {
            resolve(value.result.concat(...customRoutes));
        })
    })
});
readCustom.then((data) => {
    // 清空文件内容
    /*fs.writeFile(path.join(__dirname,'/pc/src/js/routes/index.js'),'',()=>{
        createRoutes(data);
    });*/
    // 递归菜单
    function createRoutes(menu) {
        for (let i in menu) {
            if (menu[i].Url != "" && menu[i].Path!=""&&menu[i].Path!="180302" && menu[i].Url.indexOf('192.168') == -1) {
                let lastSymbolPosition = menu[i].Path.lastIndexOf('/');
                let fileName = menu[i].Path.substr(lastSymbolPosition + 1);
                let randomName = menu[i].Path.substr(lastSymbolPosition + 1);
                if (menu[i].Url.indexOf('Report') > -1) {
                    randomName = fileName + Math.random().toString().substr(2, 7);
                }
                if (process.argv[2] === 'dev') {
                    strRequire += `// ${menu[i].Title}\nimport ${randomName} from '../${menu[i].Path}.vue';\n`;
                } else {
                    strRequire += `// ${menu[i].Title}\nconst ${randomName} = resolve => {
    require.ensure(['../${menu[i].Path}.vue'], (require) => {
        resolve(require('../${menu[i].Path}.vue'))
    },'${fileName}')
}\n`;
                }
                if (menu[i].Level === 1) {
                    login += `\t{ path: '${menu[i].Url}',meta:{ title:'${menu[i].Title}' }, name:'${menu[i].NavigationId}',component: ${randomName} }, // ${menu[i].Title}\n`;
                    continue;
                }
                if (menu[i].Url.indexOf('Report') > -1) {
                    routes += `\t\t{ path: '/Report/:Key',meta:{ title:'${menu[i].Title}' }, name:'${menu[i].NavigationId}',component: ${randomName} }, // ${menu[i].Title}\n`;
                    continue;
                }
                routes += `\t\t{ path: '${menu[i].Url}',meta:{ title:'${menu[i].Title}' }, name:'${menu[i].NavigationId}',component: ${randomName} }, // ${menu[i].Title}\n`
            }
            if (menu[i].ChildNavigations) {
                createRoutes(menu[i].ChildNavigations);
            }
        }
    }
    createRoutes(data);
    // 延迟执行完成路由文件的收尾工作
    setTimeout(() => {
        let str = `${strRequire}\n\n${routes}\t]},\n${login}]`
        fs.writeFile(path.join(__dirname, '/src/js/routes/index.js'), str, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('build success')
            }
        })
    }, 500);
});