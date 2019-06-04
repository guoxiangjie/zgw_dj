/*
 * @Author: Guo Xiang Jie 
 * @Date: 2019-03-30 11:09:55 
 * @Last Modified by: Guo Xiang Jie
 * @Last Modified time: 2019-03-30 15:14:03
 */
//获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
     return (arr[2]);
    else
     return null;
   }
    
   //设置cookie,增加到vue实例方便全局调用
   export function setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
   };
    
   //删除cookie
   export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
   };

   //分享微博功能
   export  function shareToSinaWB(url,title){
    var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?title=""';     
        _shareUrl += '&url='+ encodeURIComponent(url);    
        _shareUrl += '&title=' + encodeURIComponent(title);
        window.open(_shareUrl,'_blank');
  }
  //分享到QQ空间
  export function shareToQzone(url,title){
  var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
      _shareUrl += 'url=' + encodeURIComponent(url);   //参数url设置分享的内容链接|默认当前页location
      _shareUrl += '&title=' + encodeURIComponent(title);    //参数title设置分享标题，可选参数
      window.open(_shareUrl,'_blank');
}
//分享到微信