var _config={
	color:{
		allTime:60,addTime:0,lvMap:[2,3,4,5,5,6,6,7,7,7,8,8,8,8,8,8,9]
	}
	,pic:{
		isOpen:!1,allTime:5,addTime:0,lvMap:[2,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,8]
	}
}
,shareData={
	wximgUrl:"wxShare.jpg",imgUrl:"/sharepic.jpg",timeLineLink:"http://",tTitle:"看你有多色？",tContent:"找出所有色块中颜色不同的一块。分享朋友圈，找到身边的色魔"
};
!function(){
	var e=$("#box"),d={
		lv:$("#room .lv em"),time:$("#room .time"),start:$("#dialog .btn-restart"),back:$("#dialog .btn-back"),share:$("#dialog .btn-share"),pause:$("#room .btn-pause"),resume:$("#dialog .btn-resume"),dialog:$("#dialog"),d_content:$("#dialog .content"),d_pause:$("#dialog .pause"),d_gameover:$("#dialog .gameover")
	}
	,f={
		init:function(h,g,i){
			this.type=h,this.api=API[h],this.config=_config[h],this.reset(),this.parent=i,this.el=g,this.renderUI(),this.inited||this.initEvent(),this.inited=!0,this.start()
		}
		,renderUI:function(){
			var a=90==window.orientation||-90==window.orientation,g=a?window.innerHeight:window.innerWidth;
			g-=20,g=Math.min(g,500),e.width(g).height(g),this.el.show()
		}
		,initEvent:function(){
			var b="ontouchstart" in document.documentElement?"touchend":"click",a=this;
			$(window).resize(function(){
				return;
				f.renderUI()
			}),e.on(b,"span",function(){
				var c=$(this).data("type");
				"a"==c&&a.nextLv.call(a)
			}),d.pause.on(b,_.bind(this.pause,this)),d.resume.on(b,_.bind(this.resume,this)),d.start.on(b,_.bind(this.start,this)),d.back.on(b,_.bind(this.back,this)),d.share.on(b,_.bind(this.share,this))
		}
		,start:function(){
			this.time>5&&d.time.removeClass("danger"),d.dialog.hide(),this._pause=!1,this.lv="undefined"!=typeof this.lv?this.lv+1:0,this.lvMap=this.config.lvMap[this.lv]||_.last(this.config.lvMap),this.renderMap(),this.renderInfo(),this.timer||(this.timer=setInterval(_.bind(this.tick,this),1000))
		}
		,share:function(){},resume:function(){
			d.dialog.hide(),this._pause=!1
		}
		,pause:function(){
			this._pause=!0,d.d_content.hide(),d.d_pause.show(),d.dialog.show()
		}
		,tick:function(){
			return this._pause?void 0:(this.time--,this.time<6&&d.time.addClass("danger"),this.time<0?void this.gameOver():void d.time.text(parseInt(this.time)))
		}
		,renderMap:function(){
			if(!this._pause){
				var a=this.lvMap*this.lvMap,h="",g="lv"+this.lvMap;
				_(a).times(function(){
					h+="<span></span>"
				}),e.attr("class",g).html(h),this.api.render(this.lvMap,this.lv)
			}
		}
		,renderInfo:function() {
			d.lv.text(this.lv+1)
		}
		,gameOver:function() {
			var a=this.api.getGameOverText(this.lv);
			this.lastLv=this.lv,
			this.lastGameTxt=a.txt,
			this.lastGamePercent=a.percent,
			d.d_content.hide(),
			d.d_gameover.show().find("h3").text(this.lastGameTxt),
			e.find("span").fadeOut(1000,function(){
				d.dialog.fadeIn()
			}),
			this._pause=!0,
			this.reset();




			window.__score__ = {
				level: this.lastGameTxt
			}
			setTimeout(function(){
				if ( window.Android ) {
	                window.Android.showShare(JSON.stringify(__score__));
	            } else {
	            	window.P.showShare(__score__);
	            }
			}, 2000)
            
			
			// try{
			// 	WeixinJSBridge.call("showOptionMenu")
			// }
			// catch(b){}var a=this.api.getGameOverText(this.lv);
			// this.lastLv=this.lv,this.lastGameTxt=a.txt,this.lastGamePercent=a.percent,d.d_content.hide(),d.d_gameover.show().find("h3").text(this.lastGameTxt),e.find("span").fadeOut(1000,function(){
			// 	d.dialog.fadeIn()
			// }),this._pause=!0,this.reset()
		}
		,reset:function(){
			this.time=this.config.allTime,this.lv=-1
		}
		,nextLv:function(){
			this.time+=this.config.addTime,d.time.text(parseInt(this.time)),this._pause||this.start()
		}
		,back:function(){
			this._pause=!0,this.el.hide(),d.dialog.hide(),this.parent.render()
		}
	};
	window.Game=f
}(),function(e){
	var d={
		index:$("#index"),room:$("#room"),loading:$("#loading"),dialog:$("#dialog"),play:$(".play-btn")
	}
	,f={
		init:function(){
			this.initEvent(),this.loading()
		}
		,loading:function(){
			function i(){
				l++,l==m&&f.render()
			}
			function c(){}if(_config.pic.isOpen){
				for(var n=["../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg","../img/wxShare2.jpg"],m=n.length,l=0,k=0;m>k;k++){
					var j=new Image;
					j.onload=i,j.src=n[k]
				}
			}
			else{
				f.render()
			}
			document.addEventListener("WeixinJSBridgeReady",function(){
				WeixinJSBridge&&(WeixinJSBridge.on("menu:share:appmessage",function(){
					shareData.tTitle="看你有多色？";
					shareData.tContent="找出所有色块中颜色不同的一块。分享朋友圈，找到身边的色魔";
					shareData.timeLineLink="http://store.liebao.cn/game/yourcolors?from=wx";
					var b=Game.lastLv>0?"我闯过"+(Game.lastLv+1)+"关，击败"+Game.lastGamePercent+"%的人！我是【"+Game.lastGameTxt+"】！不服来战！":shareData.tContent;
					WeixinJSBridge.invoke("sendAppMessage",{
						img_url:shareData.wximgUrl,link:shareData.timeLineLink,desc:shareData.tContent,title:b
					}
					,c)
				}),WeixinJSBridge.on("menu:share:timeline",function(){
					shareData.tTitle="看你有多色？";
					shareData.tContent="找出所有色块中颜色不同的一块。分享朋友圈，找到身边的色魔";
					shareData.timeLineLink="http://store.liebao.cn/game/yourcolors?from=wx";
					var b=Game.lastLv>0?"我闯过"+(Game.lastLv+1)+"关，击败"+Game.lastGamePercent+"%的人！我是【"+Game.lastGameTxt+"】！不服来战！":shareData.tContent;
					WeixinJSBridge.invoke("shareTimeline",{
						img_url:shareData.wximgUrl,img_width:"640",img_height:"640",link:shareData.timeLineLink,desc:shareData.tContent,title:b
					}
					,c)
				}))
			}
			,!1);
		}
		,render:function(){
			d.loading.hide(),d.index.show()
		}
		,initEvent:function(){
			var b="ontouchstart" in document.documentElement?"touchstart":"click",g=this;
			d.play.on(b,function(){
				var c=$(this).data("type")||"color";
				d.index.hide(),Game.init(c,d.room,g)
			})
		}
	};
	f.init(),e.API={}
}(window),function(){
	var h=$("#box"),g="span",k=$("#help p"),j=$("#help_color"),i={
		lvT:["","","","","","","","",""],render:function(m,l){
			this.lv=l,k.hide(),j.show();
			var d=_config.color.lvMap[l]||_.last(_config.color.lvMap);
			this.d=15*Math.max(9-d,1),this.d=l>20?10:this.d,this.d=l>40?8:this.d,this.d=l>50?5:this.d;
			var c=Math.floor(Math.random()*m*m),b=this.getColor(255-this.d),a=this.getLvColor(b[0]);
			h.find(g).css("background-color",b[1]).data("type","b"),h.find(g).eq(c).css("background-color",a[1]).data("type","a")
		}
		,getColor:function(e){
			var d=[Math.round(Math.random()*e),Math.round(Math.random()*e),Math.round(Math.random()*e)],l="rgb("+d.join(",")+")";
			return[d,l]
		}
		,getLvColor:function(l){
			var e=this.d,n=_.map(l,function(b){
				return b+e
			}),m="rgb("+n.join(",")+")";
			return[n,m]
		}
		,getGameOverText:function(m){
			var l=15>m?0:Math.ceil((m-15)/5),p=this.lvT[l]||_.last(this.lvT),o=p+""+(m+1),n=2*m;
			return n=n>90?90+0.15*m:n,n=Math.min(n,100),{
				txt:o,percent:n
			}
		}
	};
	API.color=i;
	var f=(function(){
		var e=document.getElementsByTagName("a");
		for(var c=0;c<h.length;c++){
			e[c].addEventListener("touchstart",function(){},false)
		}
		var b=window.navigator.userAgent.toLowerCase();
		var d=$("#dialog");
		var a=$(".btn-boyaa");
		if(b.match(/MicroMessenger/i)=="micromessenger"){
			d[0].style.backgroundImage="url(img/share.png)";
			a.attr("href","http://mp.weixin.qq.com/s?__biz=MjM5ODY4NTQwNA==&mid=201398550&idx=1&sn=20c3d76bc95be8b838403adcf32ec25a#rd");
			$(".shareQQ,.shareWeiBo").hide()
		}
		else{
			if(b.match(/(iphone|android)/i)!=null){
				a.hide()
			}
			return
		}
	}())
}();