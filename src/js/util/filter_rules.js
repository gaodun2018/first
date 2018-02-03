import {isAllSpace,maxLength} from './util.js'

exports.install = function (Vue, options) {

    /**
     * 注意:  定义type 规则时 不用做非空验证
     *        只需要传入 required:true 即可
     * */

    /*请输入不为空格的内容*/
    const isallspace = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!isAllSpace(value)) {
                return callback(new Error('输入的内容不能全为空格!'))
            } else {
                return callback()
            }
        }
        else {
            return callback();
        }
    }

    /**
     * 参数 item
     * required true  必填项
     * maxLength  字符串的最大长度
     * min 和 max 必须同时给 min < max  type=number
     * type 手机号 mobile
     *      邮箱   email
     *      网址   url
     *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
     * */

    Vue.prototype.filter_rules = function (item) {
        let rules = [];
        if (item.required) {
            rules.push({required: true, message: '该输入项为必填项!', trigger: 'blur'});
        }
        if (item.maxLength) {
            rules.push({validator: (rule, value, callback)=>{
                    if (value != null && value != "") {
                        if (!maxLength(value,item.maxLength)) {
                            return callback(new Error(`最多输入${item.maxLength}个字符！`))
                        } else {
                            return callback()
                        }
                    }
                    else {
                        return callback();
                    }
                }, trigger: 'blur,change'})
        }
        if (item.min && item.max) {
            rules.push({
                min: item.min,
                max: item.max,
                message: '字符长度在' + item.min + '至' + item.max + '之间!',
                trigger: 'blur'
            })
        }
        if (item.type) {
            let type = item.type;
            switch (type) {
                case 'isAllSpace':
                    rules.push({validator: isallspace, trigger: 'blur,change'});
                    break;
                default:
                    rule.push({});
                    break;
            }
        }

        return rules;
    };
};