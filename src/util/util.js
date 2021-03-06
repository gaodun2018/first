import {
  SAAS_MENU,
  SAAS_CURRENT_LEVEL_ONE_MENU,
  SAAS_USER_INFO
} from './keys';


export const startMarquee = (lh, speed, delay, id) => { // 消息滚动
  let t;
  let p = false;
  const o = document.getElementById(id);
  o.innerHTML += o.innerHTML + o.innerHTML + o.innerHTML;
  o.onmouseover = function () {
    p = true;
  }
  o.onmouseout = function () {
    p = false;
  }
  o.scrollTop = 0;

  function start() {
    t = setInterval(scrolling, speed);
    if (!p) o.scrollTop += 2;
  }

  function scrolling() {
    if (o.scrollTop % lh != 0) {
      o.scrollTop += 2;
      if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
    } else {
      clearInterval(t);
      setTimeout(start, delay);
    }
  }

  setTimeout(start, delay);
}

export function padding(v) {
  let value = v + '';
  if (value.length < 2) {
    value = '0' + value;
  }
  return value;
}
export function secondToDate(result) { //将秒转换成时分秒
  var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
  var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  return {
    h,
    m,
    s
  }
}

export function format(d) { //时间转换 => YYYY-MM-dd
  return !!d && typeof d !== 'string' ? (d.getFullYear() + '-' + padding(d.getMonth() + 1) + '-' + padding(d.getDate())) : d;
}

export function number2DateTime(value, fmt = 'yyyy-MM-dd HH:mm:ss') { // yyyy-MM-dd HH:mm:ss
  if (isNaN(value)) return '';
  const date = new Date(Number(value));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return fmt.replace('yyyy', year.toString())
    .replace('yy', (year % 100).toString())
    .replace('MM', month > 9 ? month.toString() : ("0" + month))
    .replace('dd', day > 9 ? day.toString() : ("0" + day))
    .replace('HH', hour > 9 ? (hour).toString() : ("0" + hour))
    .replace('mm', minute > 9 ? (minute).toString() : ("0" + minute))
    .replace('ss', second > 9 ? (second).toString() : ("0" + second));
}

export function trim(str) { // 去空格
  return str.replace(/\s/g, '');
}

export function isPhone(str) { // 手机号验证
  var reg = /^(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function isEmail(str) { // 邮箱验证
  var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  // var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function isNumber(value) { // 数字验证
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value == "") {
    return false
  } else {
    return true
  }
}

export function isMoney(value) { // 验证输入金额
  var patrn = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  if (patrn.exec(value) == null || value == "") {
    return false
  } else {
    return true
  }
}

export function isCardNo(card) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(card)) {
    return false;
  } else {
    return true;
  }
}

export function getSrcStr(value) {
  // 获取字符串里的src
  var reg = /src=\"([^\"]*?)\"/gi;
  var v = '';
  if (value) {
    var vArr = value.match(reg);
    v = (vArr && vArr.length != 0) ? vArr[0] : value;
    return v;
  } else {
    return value;
  }
}

export function isAllSpace(value) {
  // 全为空格时的验证
  var reg = /^\s+$/g;
  if (reg.test(value)) {
    return false;
  } else {
    return true;
  }
}

export function isChinese(value) {
  // 有中文的验证
  var reg = /[\u4e00-\u9fa5]/g;
  if (reg.test(value)) {
    return false;
  } else {
    return true;
  }
}

export function maxLength(value, maxlength) {
  if (value.replace(/[^\x00-\xff]/g, "aa").length > maxlength) {
    return false;
  } else {
    return true;
  }
}

/**
 * 获取本周、本季度、本月、上月的开端日期、停止日期
 */
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;

//获得某月的天数
export function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export const messageTitle = { // title 消息提示
  time: 0,
  title: document.title,
  timer: null,
  // 显示新消息提示执行方法
  show: function () {
    var title = messageTitle.title;
    // 定时器，设置消息切换频率闪烁效果就此产生
    messageTitle.timer = setTimeout(function () {
      messageTitle.time++;
      messageTitle.show();
      if (messageTitle.time % 2 == 0) {
        document.title = "【新消息】" + title
      } else {
        document.title = "【　　　】" + title
      };
    }, 600);
    return [messageTitle.timer, messageTitle.title];
  },
  // 取消新消息提示方法
  clear: function () {
    clearTimeout(messageTitle.timer);
    document.title = messageTitle.title;
  }
}


export const isIE9 = () => {
  var DEFAULT_VERSION = "9.0";
  var ua = navigator.userAgent.toLowerCase();
  var IE = ua.indexOf("msie") > -1;
  var safariVersion;
  if (IE) {
    safariVersion = ua.match(/msie ([\d.]+)/)[1];
    if (safariVersion == DEFAULT_VERSION) {
      return true;
    }
  }
  return false;
}
