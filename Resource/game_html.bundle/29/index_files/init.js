/**
 * Created by Administrator on 14-8-4.
 */
var userAgentInfo = navigator.userAgent.toLowerCase();
var Agents = ['iphone', 'android', 'phone', 'mobile', 'wap', 'netfront', 'java', 'opera mobi', 'opera mini',
    'ucweb', 'windows ce', 'symbian', 'series', 'webos', 'sony', 'blackberry', 'dopod', 'nokia', 'samsung',
    'palmsource', 'xda', 'pieplus', 'meizu', 'midp', 'cldc', 'motorola', 'foma', 'docomo', 'up.browser',
    'up.link', 'blazer', 'helio', 'hosin', 'huawei', 'novarra', 'coolpad', 'webos', 'techfaith', 'palmsource',
    'alcatel', 'amoi', 'ktouch', 'nexian', 'ericsson', 'philips', 'sagem', 'wellcom', 'bunjalloo', 'maui', 'smartphone',
    'iemobile', 'spice', 'bird', 'zte-', 'longcos', 'pantech', 'gionee', 'portalmmm', 'jig browser', 'hiptop',
    'benq', 'haier', '^lct', '320x320', '240x320', '176x220'];
var loopFunc;
var deviceType;//1 pc 2 mobile
var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var webH = 800;
var webMinW=320;
var webMaxW=640;
var gameW=320;
var gameH=568;
var curWidth=innerWidth;
var curHeight=innerHeight;

if(curWidth > webMaxW)
{
	curWidth = webMaxW;
}
if(curHeight > webH)
{
    curHeight = webH;
}
//alert(curWidth);
$(document).ready(function(e) {
    $("#warper").css("width",curWidth+"px");
	$("#warper").css("height",curHeight +"px");	
	
    $("#warper").css("left",(innerWidth - curWidth>>1)+"px")
	DeviceInit();
	AnimationInit();
    GameInit();
	//alert(curHeight);
	//alert(document.getElementById("warper").style.height);
	//alert(document.getElementById("StartDiv").style.height);
	//alert(document.getElementById("Canvas").style.height);
});

function DeviceInit()
{
    var i,len;
    len=Agents.length;
    for ( i = 0; i < len; i++)
    {
        if (userAgentInfo.indexOf(Agents[i]) >= 0) { break; }
    }
    if(i==len)
        deviceType=1;
    else
        deviceType=2;
}
function AnimationInit()
{
    window.requestAFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            // if all else fails, use setTimeout
            function (callback) {
                return window.setTimeout(callback, interval); // shoot for 60 fps
            };
    })();

    // handle multiple browsers for cancelAnimationFrame()
    window.cancelAFrame = (function () {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            function (id) {
                window.clearTimeout(id);
            };
    })();
    iID=window.requestAFrame(Loop);
}
function Loop()
{
    iID=window.requestAFrame(Loop);
    now = Date.now();     
    delta=now-then;
     if (delta > interval) {
		then = now - (delta % interval);     
		if(loopFunc!=null)
			loopFunc();
     }
}