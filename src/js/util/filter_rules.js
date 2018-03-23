import {isAllSpace, maxLength, isChinese} from './util.js'

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

    /*输入的是否有中文*/
    const ischinese = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!isChinese(value)) {
                return callback(new Error('请不要输入中文！'))
            } else {
                return callback()
            }
        }
        else {
            return callback();
        }
    }
    /*验证视频*/
    const isVideoId = (rule, value, callback) => {
        if (value != null && value != "") {
            if (!isChinese(value)) {
                return callback(new Error('请输入正确的视频地址！'))
            } else if (!isAllSpace(value)) {
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
     *      视频地址   video_id
     *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
     * */

    Vue.prototype.filter_rules = function (item) {
        let rules = [];
        if (item.required) {
            rules.push({required: true, message: '该输入项为必填项!', trigger: 'blur'});
        }
        if (item.maxLength) {
            rules.push({
                validator: (rule, value, callback) => {
                    if (value != null && value != "") {
                        if (!maxLength(value, item.maxLength)) {
                            return callback(new Error(`最多输入${(item.maxLength / 2)}个汉字或者${(item.maxLength)}个英文！`))
                        } else {
                            return callback()
                        }
                    }
                    else {
                        return callback();
                    }
                }, trigger: 'blur,change'
            })
        }
        if (item.max) {
            rules.push({
                min: item.min ? item.min : 0,
                max: item.max,
                message: '最多输入' + item.max + '个字!',
                trigger: 'blur,change'
            })
        }
        if (item.type) {
            let type = item.type;
            switch (type) {
                case 'isAllSpace':
                    rules.push({validator: isallspace, trigger: 'blur,change'});
                    break;
                case 'isChinese':
                    rules.push({validator: ischinese, trigger: 'blur,change'});
                    break;
                case 'isVideoId':
                    rules.push({validator: isVideoId, trigger: 'blur,change'});
                    break;
                default:
                    rule.push({});
                    break;
            }
        }

        return rules;
    };
};