export function setToken(name, value, hours) {
  var domainList = ["com", "cn", "net", "gov", "ac", "org"];
  var host2 = document.domain;
  var hostList = host2.split('.');
  var domain = hostList[hostList.length - 2] + "." + hostList[hostList.length - 1];
  if (domainList.indexOf(hostList[hostList.length - 2]) > -1) {
    domain = hostList[hostList.length - 3] + "." + hostList[hostList.length - 2] + "." + hostList[hostList.length - 1]
  }
  if (document.domain.indexOf('localhost') > -1) {
    domain = document.domain;
  }
  var exp = new Date();
  exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + exp.toGMTString() + "; domain=" + domain + ";path=/";
}
