var aL = 8;
var bu = webMinW;
var bp = 187;
var w = bu;
var h = 187;
var ag = 10;
var bM = ag * 2;
var V = 7.5;
var bw = V * 2;
var bv;
var bv1;
var bj;
var l = new Object;
var aY = 3;
var bD = 2;
var aO = 4;
l.aw = 0;
l.bb = 0;
var bQ = [];
var c;
var k;
var bP;
var j;
var bS;
var be;
var bG;
var tD;
var aR = true;
var by;
var bk;
var bk1;
var aM;
var au;
var ba;
var aV = 0;
var bA = 0;
var ax = 0;
var d = new Date();
var tt = 0;
var aJ = 0;
var bE = 0;
var aQ = true;
var ab;
var ac;

function GameInit() {
	loopFunc = R;
	G();
	if (deviceType == 1) {
		c.addEventListener("mousemove", L, false);
		document.getElementById("bd").addEventListener("mousedown", v, false);
		aL = 15;
	} else {
		k.addEventListener("touchstart", H, false);
		k.addEventListener("touchmove", K, false);
		aL = 10;
	}
	O(1);
};
function G() {
	var timeY;
	bG = document.getElementById("warper");
	bG.style.overflow = "hidden";
	bG.style.width = curHeight;
	tD = document.createElement("tDiv");
	c = document.createElement("Canvas");
	j = c.getContext("2d");
	c.zIndex = 1;
	c.style.position = "absolute";
	c.style.top = "0px";
	c.style.left = "0px";
	ab = curWidth / webMinW;
	w = c.width = bu * ab;
	h = c.height = bp * ab;
	tD.style.position = "absolute";
	tD.style.fontSize = ab * 20 + "px";
	tD.style.color = "#ffffff";
	tD.style.textAlign = "center";
	c.style.width = "100%";
	bP = document.createElement("Canvas");
	be = bP.getContext("2d");
	bP.zIndex = 0;
	bP.style.position = "absolute";
	bP.width = bu;
	bP.style.width = c.style.width;
	bP.style.top = "0px";
	bP.style.left = "0px";
	bG.appendChild(bP);
	if (deviceType != 1) {
		k = document.createElement("Canvas");
		k.zIndex = 2;
		k.style.position = "absolute";
		k.style.left = "0px";
		k.style.top = c.height + "px";
		k.width = w;
		k.height = h + 40;
		k.style.width = "100%";
		bS = k.getContext("2d");
		bG.appendChild(k);
		timeY = c.height + 15 * ab;
		tD.style.top = timeY + "px";
		tD.style.left = (w * 0.5 + 5) + "px";
		// aM = new Image();
		// aM.src ="vapp/50/ctrlBack.png";
		// aM.onload = function() {
		// 	be.drawImage(aM, k.width - aM.width >> 1, c.height + 80);
		// };
		bP.height = curHeight;
	} else {
		timeY = c.height + 30;
		tD.style.top = timeY + "px";
		bP.height = 400;
		tD.style.left = (w * 0.5 + 5) + "px";
	}
	bG.appendChild(c);
	bG.appendChild(tD);
	l.toX = l.x = w / 2 >> 0;
	l.toY = l.y = h / 2 >> 0;
	l.r = ag;
	by = new Image();
	bk = new Image();
	bk1 = new Image();
	by.src = "vapp/50/cir.png";
	bk.src = "vapp/50/cir2.png";
	bk1.src = "vapp/50/cir3.png";
	by.onload = function() {
		ax++;
		bv = by
	};
	bk.onload = function() {
		ax++;
		bj = bk
	};
	bk1.onload = function() {
		ax++;
		bv1 = bk1
	};
	ba = new Image();
	ba.src ="vapp/50/text.png";
	ba.onload = function() {
		be.drawImage(ba, 72, 197);
	};
	au = new Image();
	au.src ="vapp/50/line.png";
	au.onload = function() {
		be.drawImage(au, 0, bp);
	};
};
function v(event) {
	aQ = true;
};
function H(event) {
	if (event.targetTouches.length != 1) return;
	event.preventDefault();
	var touch = event.targetTouches[0];
	var tX, tY;
	tX = touch.pageX - bG.offsetLeft;
	tY = touch.pageY - bG.offsetTop - k.offsetTop;
	if (Math.abs(l.x - tX) > bM * 4 || Math.abs(l.y - tY) > bM * 4) aQ = true;
	else aQ = false;
};
function K(event) {
	if (aR) return;
	if (event.targetTouches.length != 1) return;
	if (aQ) return;
	event.preventDefault();
	var touch = event.targetTouches[0];
	var tX, tY;
	tX = touch.pageX - bG.offsetLeft;
	tY = touch.pageY - bG.offsetTop - k.offsetTop;
	l.toX = tX << 0;
	l.toY = tY << 0;
	return;
};
function L(event) {
	if (aR) return;
	event.preventDefault();
	var tX, tY;
	tX = event.pageX - bG.offsetLeft;
	tY = event.pageY - bG.offsetTop;
	if (aQ) {
		if (Math.abs(l.x - tX) > bM || Math.abs(l.y - tY) > bM) return;
		aQ = false;
	}
	l.toX = tX << 0;
	l.toY = tY << 0;
};
function Replay() {
	if (!aR) return;
	bA = 0;
	aV = 0;
	j.clearRect(0, 0, w, h);
	if (deviceType != 1) bS.clearRect(0, 0, w, h);
	bQ.length = 0;
	O(1);
	aR = false;
	tD.innerHTML = "0";
	l.toX = l.x = w / 2 >> 0;
	l.toY = l.y = h / 2 >> 0;
};
function O(num) {
	var t;
	if (aV > 30) t = 30;
	else if (aV < 15) t = 15;
	else t = aV;
	while (--num > -1) {
		var c = new Object;
		var r = Math.random();
		if (r > 0.25) {
			c.x = -V;
			c.y = (h - V) * Math.random() + V;
		} else if (r > 0.5) {
			c.x = w + V;
			c.y = (h - V) * Math.random() + V;
		} else if (r > 0.75) {
			c.y = h + V;
			c.x = (w - V) * Math.random() + V;
		} else {
			c.y = -V;
			c.x = (w - V) * Math.random() + V;
		}
		c.r = V;
		c.x = c.x << 0;
		c.y = c.y << 0;
		c.aw = Math.abs((bD * Math.random() + aO * t / 150) >> 0) + 1;
		c.bb = Math.abs((bD * Math.random() + aO * t / 150) >> 0) + 1;
		bQ.push(c);
	}
};
function T(c) {
	var r = c.r * 2 + 4;
	j.clearRect(c.x - c.r - 2, c.y - c.r - 2, r, r);
};
function J(c) {
	c.x = c.x + c.aw;
	c.y = c.y + c.bb;
	if (c.x > w - V) {
		c.x = w - V;
		c.aw = -Math.abs(c.aw);
	} else if (c.x < V) {
		c.x = V;
		c.aw = Math.abs(c.aw);
	}
	if (c.y > h - V) {
		c.y = h - V;
		c.bb = -Math.abs(c.bb);
	} else if (c.y < V) {
		c.y = V;
		c.bb = Math.abs(c.bb);
	}
	if (bj == null) {
		j.arc(c.x, c.y, V, 0, Math.PI * 2, true);
		j.closePath();
	} else j.drawImage(bj, c.x - c.r, c.y - c.r);
};
function F(c) {
	if (deviceType != 1) {
		var r = c.r * 40 + 4;
		bS.clearRect(c.x - c.r - 2, c.y - c.r - 2, r, r);
	}
	c.x = c.toX << 0;
	c.y = c.toY << 0;
	if (c.x > w - ag) c.x = w - ag;
	else if (c.x < ag) c.x = ag;
	if (c.y > h - ag) c.y = h - ag;
	else if (c.y < ag) c.y = ag;
	if (bv == null) {
		j.beginPath();
		j.fillStyle = "#FF0000";
		j.arc(c.x, c.y, ag, 0, Math.PI * 2, true);
		j.closePath();
		j.fill();
	} else j.drawImage(bv, c.x - c.r, c.y - c.r);
	if (deviceType != 1) {
		if (bv == null) {
			bS.beginPath(); //RRRR
			bS.fillStyle = "#FF0000";
			bS.arc(c.x, c.y, ag, 0, Math.PI * 2, true);
			bS.closePath();
			bS.fill();
		} else bS.drawImage(bv1, c.x - c.r, c.y - c.r);
	}
};
function C() {
	var len;
	len = bQ.length;
	while (--len > -1) {
		var obj = bQ[len];
		var x = obj.x - l.x;
		var y = obj.y - l.y;
		var r = ag + V;
		if (x > r || x < -r || y > r || y < -r) continue;
		if (x * x + y * y < r * r) {
			var str = "";
			var str2 = "";
			var secC = (aV / fps).toFixed(2);
			EndGame(secC);
			aR = true;
			break;
		}
	}
};
function R() {
	if (aR) return;
	aV++;
	tD.innerHTML = (aV / fps).toFixed(2);
	if (aV % fps == 0) {
		bA++;
		if (bA % 2 == 0 && bQ.length < aL) O(1);
	}
	T(l);
	var len = bQ.length;
	while (--len > -1) {
		T(bQ[len])
	}
	if (bj == null) {
		j.beginPath();
		j.fillStyle = "#009900";
		len = bQ.length;
		while (--len > -1) {
			J(bQ[len]);
		}
		j.fill();
	} else {
		len = bQ.length;
		while (--len > -1) {
			J(bQ[len]);
		}
	}
	F(l);
	tt = new Date().getTime();
	C();
}
function EndGame(sec){
				var beat = "";
				var Honour = "";
				if(sec<5){
					beat = Math.floor(1+Math.random()*(10-1));
					Honour = "战五渣";
				}else if(sec<10){
					beat = Math.floor(21+Math.random()*(10-21));
					Honour = "战五渣";
				}else if(sec<15){
					beat = Math.floor(21+Math.random()*(30-21));
					Honour = "是男人就多撑5秒";
				}else if(sec<20){
					beat = Math.floor(41+Math.random()*(30-41));
					Honour = "坑爹";
				}else if(sec<30){
					beat = Math.floor(41+Math.random()*(50-41));
					Honour = "淡定哥";
				}else if(sec<40){
					beat = Math.floor(61+Math.random()*(50-61));
					Honour = "惊呆小伙伴";
				}else if(sec<50){
					beat = Math.floor(61+Math.random()*(70-61));
					Honour = "我敬你是条汉子";
				}else if(sec<60){
					beat = Math.floor(81+Math.random()*(70-81));
					Honour = "你开挂了吧";
				}else if(sec<70){
					beat = Math.floor(81+Math.random()*(90-81));
					Honour = "闪避神";
				}else if(sec<90){
					beat = Math.floor(99+Math.random()*(90-99));
					Honour = "200%闪避";
				}
				
				fontStr='You lasted <span style="color:red">'+sec+'</span> seconds<br>  and beat <span style="color:red"> '+beat+'%</span>other players<br>'
				if(sec >= 30){
					type = 1;
					//dataForWeixin.tTitle = '我撑过了'+sec+'秒，击败'+beat+'%的人，称号：'+Honour+'你能超过我吗？';
				}else{
					type = 2;
					//dataForWeixin.tTitle = '我没能撑过30秒，在'+sec+'秒的时候失败了，你能超过我吗？';
				}			
				ShowEndWnd(type,fontStr,"Replay");
				do_submitScore(sec);	
			}