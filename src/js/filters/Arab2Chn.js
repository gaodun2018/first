let ChineseSymbole = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
let ChineseSection = ["", "万", "亿", "万亿"];
let ChineseUnit = ["", "十", "百", "千"];
let ChineseUnitArab = {
  "零": 0,
  "一": 1,
  "二": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6,
  "七": 7,
  "八": 8,
  "九": 9,
  "十": 10,
  "百": 100,
  "千": 1000,
  "万": 10000,
  "亿": 100000000,
  "万亿": 1000000000000,
};
let Arab2Chn_section = function (v) {
  var num_str = "",
    unit_idx = 0,
    set_zero = false;
  while (v > 0) {
    var n = v % 10,
      s = ChineseSymbole[n],
      unit = ChineseUnit[unit_idx++];
    v = Math.floor(v / 10);
    if (num_str == "" && n == 0) {
      continue;
    }
    if (n > 0) {
      if (n == 1 && unit == ChineseUnit[1] && v == 0) {
        s = "";
      }
      num_str = s + unit + num_str;
      set_zero = false;
    } else {
      if (!set_zero) {
        set_zero = true;
        num_str = ChineseSymbole[0] + num_str;
      }
    }
  }
  return num_str;
};
export const Arab2Chn = function (v) {
  var chn_num = "",
    sec_idx = 0;
  v = Math.floor(v);
  var CHINESE_SECTION = 10000;
  while (v > 0) {
    if (sec_idx >= ChineseUnit.length) {
      return "数字超过范围！"
    }
    var section = v % CHINESE_SECTION,
      unit = ChineseSection[sec_idx];
    v = Math.floor(v / CHINESE_SECTION);
    sec_idx++;
    if (section == 0) continue;
    var zero_prefix = (v > 0 && section < CHINESE_SECTION / 10) ? ChineseSymbole[0] : "";
    chn_num = zero_prefix + Arab2Chn_section(section) + unit + chn_num;
  }
  return chn_num;
};


