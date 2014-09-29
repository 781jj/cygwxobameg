var shareConfig = {
  title: "Run fast, faster, or you will be eaten by the bear."
};

/********************
/* 动动拇指工作室 2013.11
/*******************/
function rtalt() {
	if (window.orientation == 0) {
		if (navigator.userAgent.indexOf("Android") == -1 || (window.innerHeight < 425 && window.devicePixelRatio < 2)) {
			setTimeout(scrollTo, 100, 0, 1)
		}
	} else {//提示手机旋转
		//top.location.href = "./index_files/rotate.html?t=" + location
	}
};
function didShare(eventId, targetSNS) {
	var ckdta = new Date();
	ckdta.setDate(ckdta.getDate() + 730);
	switch (Math.floor(eventId)) {
	case 1:
		document.cookie = "st_kma_tip=1; expires=" + ckdta.toGMTString();
		gtips = 1;
		tipon = 1;
		break;
	case 2:
		document.cookie = "st_kma_run=2; expires=" + ckdta.toGMTString();
		gmsts = 2;
		break;
	case 3:
		document.cookie = "st_kma_run=3; expires=" + ckdta.toGMTString();
		gmsts = 3;
		break;
	default:
		break
	}
};
function lcir(lrstx, lrsty) {
	var i = 0;
	var ri = 0;
	var Rr = 0;
	for (i = 0; i < 12; i++) {
		ri = ldri + i;
		if (ri > 12) {
			ri -= 12
		};
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#FFFFFF";
		ctx.globalAlpha = ri / 10;
		ctx.moveTo(lrstx + Math.cos(Rr) * 8, lrsty + Math.sin(Rr) * 8);
		ctx.lineTo(lrstx + Math.cos(Rr) * 15, lrsty + Math.sin(Rr) * 15);
		ctx.stroke();
		Rr += 4.18 / 8
	};
	ctx.globalAlpha = 1;
	ldri--;
	if (ldri < 1) {
		ldri = 12
	}
};
function lding() {
	ctx.clearRect(0, 0, 320, 568);
	ctx.globalAlpha = .6;
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, 320, 568);
	ctx.globalAlpha = 1;
	lcir(160, 292)
};
onload = function () {
	ldri = 0;
	ldlp = setInterval("lding();", 1000 / 20);
	init();
	setTimeout(scrollTo, 400, 0, 1)
};
function srt(sa, sb) {
	sa.sort(function (a, b) {
		return ((a[sb] - b[sb]))
	});
	return (sa)
};
function ralp2() {
	lps += ranlp;
	if (lps > 1 && alp == 1) {
		lps--;
		lp()
	}
};
function ralp() {
	ralp2();
	window.requestAnimationFrame(ralp)
};
function gst() {
	clearInterval(ldlp);
	ctx.clearRect(0, 0, 320, 568);
	spt2(127, 56, 272);
	setTimeout(scrollTo, 200, 0, 1);
	s = 0
};
function gsts() {
	gldt++;
	if (gldt > 3) {
		setTimeout("gst();", 120)
	}
};
function asd2() {
	document.getElementById('bspc').innerHTML = null;
	document.getElementById('bspc').style.display = "none"
};
function asd() {
	var sks = 1 / window.devicePixelRatio;
	var mtt = document.createElement('meta');
	var kkd = Math.floor(screen.width / 3.2) / 100;
	sks *= kkd;
	//mtt.setAttribute('name', 'viewport');
	//mtt.setAttribute('content', 'width = device-width, initial-scale = ' + sks + ', minimum-scale = ' + sks + ', maximum-scale = ' + sks);
	document.getElementsByTagName('head')[0].appendChild(mtt);
	setTimeout("asd2", 300);
}
function scs(nms, nmi, nmy) {
	var mtsg = String(nms);
	var nmk = mtsg.length - 1;
	var mtsgb;
	switch (nmi) {
	case 1:
		for (scx = 0; scx <= nmk; scx++) {
			mtsgb = Math.floor(mtsg.substr(scx, 1));
			spt2(68 + mtsgb, scrux[4 - nmk + scx], nmy)
		};
		break;
	default:
		break
	}
};
function scs2(nmi, nmk, nms) {
	var mtsg = "0000000000" + nms;
	var mtsg = mtsg.substr(-9, 9);
	for (scx = 0; scx < nmk; scx++) {
		var stf = Math.floor(mtsg.substr((9 - scx) - 1, 1));
		spt2(130 + stf, 216 - (scx) * 21, 118)
	}
};
function spt(spi, lcx, lcy, rsz, asm) {
	var sptx = ix[spi];
	var spty = iy[spi];
	var sptw = iw[spi];
	var spth = ih[spi];
	var rptw = sptw * rsz;
	var rpth = spth * rsz;
	ctx.drawImage(img7, sptx, spty, sptw, spth, (lcx - rptw / 2 | 0), (lcy - rpth * asm | 0), (rptw | 0), (rpth | 0))
};
function spt5(spi, lcx, lcy, rsz, asm) {
	var sptx = ix[spi];
	var spty = iy[spi];
	var sptw = iw[spi];
	var spth = ih[spi];
	var rptw = sptw * rsz;
	var rpth = spth * rsz * rsz;
	ctx.drawImage(img7, sptx, spty, sptw, spth, (lcx - rptw / 2 | 0), (lcy - rpth * asm | 0), (rptw | 0), (rpth | 0))
};
function spt2(spi, lcx, lcy) {
	var sptx = ix[spi];
	var spty = iy[spi];
	var sptw = iw[spi];
	var spth = ih[spi];
	ctx.drawImage(img7, sptx, spty, sptw, spth, (lcx | 0), (lcy | 0), sptw, spth)
};
function spt3(spi, lcx, lcy, rsw, rsh) {
	var sptx = ix[spi];
	var spty = iy[spi];
	var sptw = iw[spi];
	var spth = ih[spi];
	var rptw = sptw * rsw;
	var rpth = spth * rsh;
	ctx.drawImage(img7, sptx, spty, sptw, spth, (lcx - rptw / 2 | 0), (lcy - rpth | 0), (rptw | 0), (rpth | 0))
};
function spt4(spi, lcx, lcy, rsw, rsh) {
	var sptx = ix[spi];
	var spty = iy[spi];
	var sptw = iw[spi];
	var spth = ih[spi];
	ctx.drawImage(img7, sptx, spty, sptw, spth, lcx, lcy, rsw, rsh)
};
function init() {
	s = -1;
	var i;
	var nvua = navigator.userAgent;
	dvid = 0;
	if (nvua.indexOf("Android") > -1) {
		dvid = 1;
		if (Math.floor(navigator.userAgent.substr(nvua.indexOf("Android") + 8, 1)) >= 4) {
			dvid = 2
		}
	};
	if (nvua.indexOf("iPad") > -1) {
		dvid = 3
	};
	if (nvua.indexOf("iPhone") > -1) {
		dvid = 4;
		if (window.devicePixelRatio >= 2) {
			dvid = 5;
			if (window.screen.height == 568) {
				dvid = 5;
			}
		}
	};
	wdpr = 1;
	// switch (dvid) {
	// case 1:
	// 	gc = 0;
	// 	var sks = 1 / window.devicePixelRatio;
	// 	var mtt = document.createElement('meta');
	// 	mtt.setAttribute('name', 'viewport');
	// 	mtt.setAttribute('content', 'width = device-width, initial-scale = ' + sks + ', minimum-scale = ' + sks + ', maximum-scale = ' + sks);
	// 	document.getElementsByTagName('head')[0].appendChild(mtt);
	// 	setTimeout("asd()", 50);
	// 	break;
	// case 2:
	// 	gc = 1;
	// 	var sks = 1 / window.devicePixelRatio;
	// 	var mtt = document.createElement('meta');
	// 	mtt.setAttribute('name', 'viewport');
	// 	mtt.setAttribute('content', 'width = device-width, initial-scale = ' + sks + ', minimum-scale = ' + sks + ', maximum-scale = ' + sks);
	// 	document.getElementsByTagName('head')[0].appendChild(mtt);
	// 	var kkd = Math.floor(screen.width / 3.2) / 100;
	// 	if (document.body.clientWidth > screen.width) {
	// 		kkd = Math.floor(document.body.clientWidth / 3.2) / 100
	// 	};
	// 	document.body.style.webkitTransformOrigin = "0 0 0";
	// 	document.body.style.webkitTransform = "scale3d(" + kkd + "," + kkd + ",1)";
	// 	wdpr = kkd;
	// 	break;
	// case 3:
	// 	gc = 1;
	// 	var kkd = 2;
	// 	document.body.style.webkitTransformOrigin = "0 0 0";
	// 	document.body.style.webkitTransform = "scale3d(" + kkd + "," + kkd + ",1)";
	// 	wdpr = kkd;
	// 	break;
	// case 4:
	// 	gc = 0;
	// 	break;
	// case 5:
	// 	gc = 1;
	// 	var sks = .5;
	// 	var mtt = document.createElement('meta');
	// 	mtt.setAttribute('name', 'viewport');
	// 	mtt.setAttribute('content', 'width = device-width, initial-scale = ' + sks + ', minimum-scale = ' + sks + ', maximum-scale = ' + sks);
	// 	document.getElementsByTagName('head')[0].appendChild(mtt);
	// 	var kkd = 2;
	// 	document.body.style.webkitTransformOrigin = "0 0 0";
	// 	document.body.style.webkitTransform = "scale3d(" + kkd + "," + kkd + ",1)";
	// 	wdpr = kkd;
	// 	break;
	// case 6:
	// 	gc = 1;
	// 	break;
	// default:
	// 	break
	// };
	//var sks = 1 / window.devicePixelRatio;
	//var mtt = document.createElement('meta');
	//var kkd = Math.floor(320 / screen.width);
	//sks *= kkd;
	//console.log(screen.width/320)
	//alert(window.innerWidth)
	document.getElementById('chf2').style.cssText = "-webkit-transform-origin: 0px 0px 0px; -webkit-transform: scale3d(" + (window.innerWidth/320) + ", " + (window.innerHeight/568) + ", 1);"

	chf2.innerHTML = '<canvas id="gcvs" width="320" height="568"></canvas>';
	canvas = document.getElementById('gcvs');
	ctx = canvas.getContext('2d');
	ctx.globalAlpha = .6;
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, 320, 568);
	document.addEventListener("touchstart", tev1, false);
	document.addEventListener("touchend", tev2, false);
	document.addEventListener("touchmove", tev3, false);
	document.addEventListener("touchcancel", tev4, false);
	document.addEventListener("gesturestart", tev4, false);
	document.addEventListener("gesturechange", tev4, false);
	document.addEventListener("gestureend", tev4, false);
	
	document.addEventListener("mousedown",tev11,false);
	document.addEventListener("mouseup",tev22,false);
	document.addEventListener("mousemove",tev33,false);
	
	gldt = 0;
	var lg = navigator.language;
	if (document.URL.indexOf("page") > -1) {
		var ldimg = new Array("title_3d_nolink.jpg", "cs_3d_bg.jpg", "end_3d_nolink.jpg", "cs_3d_en.png");
		canvas.style.backgroundImage = "url(3d_Bear_files/title_3d_nolink.jpg)";
		shms1 = "Browser game[Look Bear,Run!] SCORE=";
		shms2 = "Browser game[Look Bear,Run!]";
		shms3 = "Why don't you get useful tips by sharing this game to your friends?";
		shms4 = "Why don't you get useful items by sharing this game to your friends?"
	} else {
		var ldimg = new Array("title_3d_en.jpg", "cs_3d_bg.jpg", "end_3d_en.jpg", "cs_3d_en.png");
		canvas.style.backgroundImage = "url(3d_Bear_files/title_3d_en.jpg)";
		shms1 = "Browser game[Look Bear,Run!] SCORE=";
		shms2 = "Browser game[Look Bear,Run!]";
		shms3 = "Why don't you get useful tips by sharing this game to your friends?";
		shms4 = "Why don't you get useful items by sharing this game to your friends?"
	};
	img0 = new Image();
	img0.src = "3d_Bear_files/" + ldimg[0];
	img0.onload = function () {
		gsts()
	};
	img1 = new Image();
	img1.src = "3d_Bear_files/" + ldimg[1];
	img1.onload = function () {
		gsts()
	};
	img2 = new Image();
	img2.src = "3d_Bear_files/" + ldimg[2];
	img2.onload = function () {
		gsts()
	};
	img7 = new Image();
	img7.src = "3d_Bear_files/" + ldimg[3];
	img7.onload = function () {
		gsts()
	};
	lps = 0;
	stgbg = 0;
	ix = new Array(0, 0, 136, 272, 408, 544, 0, 48, 96, 144, 192, 240, 288, 343, 398, 453, 508, 563, 0, 56, 112, 168, 224, 0, 65, 130, 195, 260, 325, 336, 343, 336, 354, 372, 336, 354, 372, 304, 327, 350, 325, 280, 0, 0, 0, 618, 0, 76, 152, 228, 0, 0, 0, 564, 336, 345, 354, 363, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 548, 560, 572, 584, 596, 608, 620, 632, 644, 656, 668, 623, 564, 621, 731, 761, 791, 821, 731, 761, 791, 0, 640, 0, 320, 735, 783, 839, 623, 304, 390, 0, 272, 680, 680, 680, 691, 691, 691, 691, 691, 691, 735, 735, 735, 735, 544, 503, 640, 640, 640, 640, 640, 640, 691, 801, 735, 0, 503, 691, 0, 0, 640, 661, 682, 703, 724, 745, 766, 787, 808, 829, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 850, 735, 835, 851);
	iy = new Array(0, 0, 0, 0, 0, 0, 177, 177, 177, 177, 177, 177, 177, 177, 177, 177, 177, 177, 372, 372, 372, 372, 372, 309, 309, 309, 309, 309, 309, 372, 372, 392, 392, 392, 410, 410, 410, 428, 428, 428, 309, 372, 0, 0, 0, 177, 428, 428, 428, 428, 0, 0, 0, 383, 382, 382, 382, 382, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 425, 425, 425, 425, 425, 425, 425, 425, 425, 425, 425, 330, 309, 309, 332, 332, 332, 332, 371, 371, 371, 0, 883, 523, 523, 271, 271, 271, 401, 453, 309, 939, 939, 0, 110, 220, 470, 518, 566, 614, 662, 710, 171, 201, 231, 250, 939, 309, 456, 506, 556, 606, 656, 706, 758, 758, 100, 0, 425, 413, 0, 0, 853, 853, 853, 853, 853, 853, 853, 853, 853, 853, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 853, 0, 0, 332);
	iw = new Array(0, 136, 136, 136, 136, 136, 48, 48, 48, 48, 48, 48, 55, 55, 55, 55, 55, 55, 56, 56, 56, 56, 56, 65, 65, 65, 65, 65, 65, 7, 7, 18, 18, 18, 18, 18, 18, 23, 23, 23, 65, 56, 0, 0, 0, 55, 76, 76, 76, 76, 0, 0, 0, 45, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 108, 57, 46, 30, 30, 30, 30, 30, 30, 30, 0, 277, 320, 320, 48, 56, 54, 63, 310, 113, 272, 272, 55, 55, 55, 234, 234, 234, 234, 234, 234, 164, 153, 111, 178, 272, 61, 51, 51, 51, 51, 51, 51, 110, 110, 194, 0, 45, 202, 0, 0, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 77, 100, 32, 44);
	ih = new Array(0, 177, 177, 177, 177, 177, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 132, 56, 56, 56, 56, 56, 63, 63, 63, 63, 63, 63, 10, 10, 18, 18, 18, 18, 18, 18, 19, 19, 19, 63, 56, 0, 0, 0, 132, 95, 95, 95, 95, 0, 0, 0, 35, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 71, 74, 19, 39, 39, 39, 39, 39, 39, 39, 0, 56, 568, 568, 61, 61, 61, 24, 70, 139, 65, 65, 110, 110, 110, 48, 48, 48, 48, 48, 48, 30, 30, 19, 21, 65, 116, 50, 50, 50, 50, 50, 50, 95, 95, 71, 0, 13, 57, 0, 0, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 100, 32, 44);
	m = 10;
	w = new Array(m);
	tx = new Array(m);
	ty = new Array(m);
	tt = new Array(m);
	tf = new Array(m);
	ta = new Array(m);
	tl = new Array(m);
	ts = new Array(m);
	tj = new Array(m);
	tjy = new Array(m);
	trf = new Array(m);
	usi = new Array();
	iszx = new Array(56, 65);
	iszy = new Array(56, 63);
	istx = new Array(0, 280);
	isty = new Array(177, 177);
	for (i = 0; i < m; i++) {
		tx[i] = Math.floor(Math.random() * 220) + 50;
		ty[i] = 500;
		tt[i] = Math.floor(Math.random() * 2);
		ta[i] = 1;
		tf[i] = 0;
		tl[i] = 0;
		ty[i] = 417;
		ts[i] = 12;
		if (i > 1) {
			usi.push(i)
		};
		w["c" + i] = {
			i : i,
			y : 500
		}
	};
	knmf = new Array(18, 19, 20, 21, 22, 41);
	ary = new Array(3);
	arw = new Array(3);
	arh = new Array(3);
	ara = new Array(3);
	askb = 0;
	var uch = document.URL.substr(0, 19);
	var chi = 0;
	var chsm = 0;
	for (chi = 7; chi < 19; chi++) {
		chsm += uch.charCodeAt(chi)
	}
	//if (chsm == 1212 || chsm == 1128) {
		askb = 1
	//};
	ary[0] = new Array(-46, -53, -60, -68, -75, -82, -89, -96, -103, -103, -103, -103, -103, -103, -103, -103, -103, -103, -103);
	arw[0] = new Array(1.41, 1.46, 1.51, 1.56, 1.61, 1.65, 1.7, 1.75, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8);
	arh[0] = new Array(1.37, 1.43, 1.48, 1.53, 1.59, 1.64, 1.69, 1.75, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8);
	ara[0] = new Array(0.89, 0.78, 0.67, 0.55, 0.45, 0.33, 0.22, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	ary[1] = new Array(-10, -20, -31, -41, -51, -61, -72, -82, -92, -92, -92, -92, -92, -92, -92, -92, -92, -92, -92);
	arw[1] = new Array(1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.41, 1.47, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53);
	arh[1] = new Array(1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.41, 1.47, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53, 1.53);
	ara[1] = new Array(0.89, 0.78, 0.67, 0.55, 0.45, 0.33, 0.22, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	ary[2] = new Array(-143, -151, -158, -165, -172, -180, -187, -194, -201, -201, -201, -201, -201, -201, -201, -201, -201, -201, -201);
	arw[2] = new Array(2.75, 2.77, 2.8, 2.82, 2.84, 2.86, 2.88, 2.9, 2.92, 2.92, 2.92, 2.92, 2.92, 2.92, 2.92, 2.92, 2.92, 2.92, 2.92);
	arh[2] = new Array(2.18, 2.16, 2.14, 2.12, 2.1, 2.08, 2.07, 2.05, 2.03, 2.03, 2.03, 2.03, 2.03, 2.03, 2.03, 2.03, 2.03, 2.03, 2.03);
	ara[2] = new Array(0.89, 0.78, 0.67, 0.55, 0.45, 0.33, 0.22, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	ary[3] = new Array(-83, -96, -109, -123, -136, -149, -163, -176, -189, -189, -189, -189, -189, -189, -189, -189, -189, -189, -189);
	arw[3] = new Array(3.03, 3.19, 3.36, 3.52, 3.68, 3.84, 4.01, 4.17, 4.33, 4.33, 4.33, 4.33, 4.33, 4.33, 4.33, 4.33, 4.33, 4.33, 4.33);
	arh[3] = new Array(1.55, 1.7, 1.85, 2, 2.16, 2.31, 2.46, 2.61, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77);
	ara[3] = new Array(0.89, 0.78, 0.67, 0.55, 0.45, 0.33, 0.22, 0.11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	glv = new Array(55, 55, 55, 50, 50, 45, 40, 35, 30, 55, 30, 20, 12, 11, 10, 9, 8, 20);
	gsp = new Array(10, 10, 10, 11, 11, 11, 12, 13, 14, 11, 13, 14, 15, 16, 17, 17, 17, 12);
	gcl = new Array(0, 0, 0, 200, 300, 450, 200, 200, 200, 400, 300, 300, 300, 500, 500, 600, 500, 999);
	gkk = new Array(-99, -99, -99, -99, -99, -99, -99, -99, -99, 70, 40, 50, 60, 70, 80, 80, 80, -99);
	fani = new Array(4);
	fani[0] = new Array(0, 0, 0, 8, 19, 0, 0, -5, 0.33, 8, 14, 0.33, 0, -10, 0.67, 8, 9, 0.67, 0, -15, 1, 8, 4, 1, 0, -13, 1, 8, 6, 1, 0, -11, 1, 8, 8, 1, 0, -10, 1, 8, 9, 1, 0, -10, 1, 8, 9, 1, 0, -10, 0.8, 8, 9, 0.8, 0, -10, 0.6, 8, 9, 0.6, 0, -10, 0.4, 8, 9, 0.4, 0, -10, 0.2, 8, 9, 0.2, 0, -10, 0, 8, 9, 0);
	fani[1] = new Array(0, 355, 0, 0, 351, 0.36, 0, 349, 0.64, 0, 347, 0.84, 0, 345, 0.96, 0, 345, 1, 0, 348, 1, 0, 355, 1, 0, 352, 1, 0, 351, 1, 0, 350, 1, 0, 353, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 351, 1, 0, 349, 1, 0, 347, 1, 0, 345, 1, 0, 345, 1, 0, 348, 1, 0, 355, 1, 0, 352, 1, 0, 351, 1, 0, 350, 1, 0, 353, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 1, 0, 355, 0.88, 0, 355, 0.75, 0, 355, 0.63, 0, 355, 0.5, 0, 355, 0.38, 0, 355, 0.25, 0, 355, 0.13, 0, 355, 0, 0, 355, 0);
	fa_f = {};
	fani[2] = new Array(19, -57, 1, 19, -54, 1, 19, -47, 1, 19, -34, 1, 19, -16, 1, 19, 7, 1, 19, 2, 1, 19, 0, 1, 19, 2, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 1, 19, 3, 0.88, 19, 3, 0.75, 19, 3, 0.63, 19, 3, 0.5, 19, 3, 0.38, 19, 3, 0.25, 19, 3, 0.13, 19, 3, 0);
	fa_fi = 0;
	fani2 = new Array(321, -56, 0, 104, 125, -50, -56, 0, 104, 125, -58, -87, 0.7, 120, 148, 321, -56, 0, 104, 125, -51, -60, 0.1, 106, 129, -60, -92, 0.6, 122, 151, 321, -56, 0, 104, 125, -53, -65, 0.2, 108, 132, -61, -96, 0.5, 125, 155, 321, -56, 0, 104, 125, -54, -69, 0.3, 111, 135, -63, -101, 0.4, 127, 158, 321, -56, 0, 104, 125, -56, -74, 0.4, 113, 138, -65, -106, 0.3, 130, 161, 321, -56, 0, 104, 125, -57, -78, 0.5, 115, 142, -67, -111, 0.2, 132, 164, 321, -56, 0, 104, 125, -59, -83, 0.6, 118, 145, -68, -115, 0.1, 134, 168, -48, -56, 0, 104, 125, -60, -87, 0.7, 120, 148, -70, -120, 0, 137, 171, -49, -59, 0.08, 105, 128, -62, -91, 0.61, 122, 151, -70, -112, 0, 137, 171, -50, -63, 0.16, 107, 130, -63, -95, 0.52, 124, 153, -70, -112, 0, 137, 171, -51, -67, 0.24, 109, 133, -65, -99, 0.44, 126, 156, -70, -112, 0, 137, 171, -52, -70, 0.32, 111, 136, -66, -103, 0.35, 128, 159, -70, -112, 0, 137, 171, -54, -74, 0.4, 113, 138, -68, -108, 0.26, 130, 161, -70, -112, 0, 137, 171, -55, -77, 0.48, 115, 141, -69, -112, 0.18, 132, 164, -70, -112, 0, 137, 171, -56, -81, 0.56, 117, 143, -71, -116, 0.09, 133, 166, -70, -112, 0, 137, 171, -57, -84, 0.64, 119, 146, -72, -120, 0, 135, 169, -70, -112, 0, 137, 171);
	fanf2 = new Array(47, 46, 47);
	fafi2 = 0;
	fani3 = new Array(210, 30, 0, 210, 37, 0.44, 210, 41, 0.75, 210, 44, 0.94, 210, 45, 1, 210, 43, 1, 210, 42, 1, 210, 43, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 1, 210, 45, 0.88, 210, 45, 0.75, 210, 45, 0.63, 210, 45, 0.5, 210, 45, 0.38, 210, 45, 0.25, 210, 45, 0.13, 210, 45, 0);
	fani4 = new Array(5, 150, 0, 106, 151, 0, 321, 72, 1, 5, 150, 0.11, 106, 151, 0.2, 321, 72, 1, 5, 150, 0.22, 106, 151, 0.4, 321, 72, 1, 5, 150, 0.33, 106, 151, 0.6, 321, 72, 1, 5, 150, 0.45, 106, 151, 0.8, 321, 72, 1, 5, 150, 0.55, 106, 151, 1, 179, 67, 0, 5, 150, 0.67, 101, 151, 1, 188, 67, 0.36, 5, 150, 0.78, 96, 151, 1, 196, 67, 0.64, 5, 150, 0.89, 91, 151, 1, 201, 67, 0.84, 5, 150, 1, 86, 151, 1, 204, 67, 0.96, 5, 150, 1, 81, 151, 1, 205, 67, 1, 5, 150, 1, 77, 151, 1, 201, 67, 1, 5, 150, 1, 72, 151, 1, 189, 67, 1, 5, 150, 1, 67, 151, 1, 195, 67, 1, 5, 150, 1, 62, 151, 1, 197, 67, 1, 5, 150, 1, 57, 151, 1, 197, 67, 1, 5, 150, 1, 52, 151, 1, 197, 67, 1, 5, 150, 1, 57, 151, 1, 197, 67, 1, 5, 150, 1, 62, 151, 1, 197, 67, 1, 5, 150, 1, 67, 151, 1, 197, 67, 1, 5, 150, 1, 72, 151, 1, 197, 67, 1, 5, 150, 1, 77, 151, 1, 197, 67, 1, 5, 150, 1, 81, 151, 1, 197, 67, 1, 5, 150, 1, 86, 151, 1, 197, 67, 1, 5, 150, 1, 91, 151, 1, 197, 67, 1, 5, 150, 1, 96, 151, 1, 197, 67, 1, 5, 150, 1, 101, 151, 1, 197, 67, 1, 5, 150, 1, 106, 151, 1, 197, 67, 1, 5, 150, 1, 110, 151, 1, 197, 67, 1, 5, 150, 1, 115, 151, 1, 197, 67, 1, 5, 150, 1, 119, 151, 1, 197, 67, 1, 5, 150, 1, 123, 151, 1, 197, 67, 1, 5, 150, 1, 128, 151, 1, 197, 67, 1, 5, 150, 1, 132, 151, 1, 197, 67, 1, 5, 150, 1, 137, 151, 1, 197, 67, 1, 5, 150, 1, 141, 151, 1, 197, 67, 1, 5, 150, 1, 145, 151, 1, 197, 67, 1, 5, 150, 1, 150, 151, 1, 197, 67, 1, 5, 150, 1, 154, 151, 1, 197, 67, 1, 5, 150, 1, 150, 151, 1, 197, 67, 1, 5, 150, 1, 145, 151, 1, 197, 67, 1, 5, 150, 1, 141, 151, 1, 197, 67, 1, 5, 150, 1, 137, 151, 1, 197, 67, 1, 5, 150, 1, 132, 151, 1, 197, 67, 1, 5, 150, 1, 128, 151, 1, 197, 67, 1, 5, 150, 1, 123, 151, 1, 197, 67, 1, 5, 150, 1, 119, 151, 1, 197, 67, 1, 5, 150, 1, 115, 151, 1, 197, 67, 1, 5, 150, 0.94, 110, 151, 1, 197, 67, 1, 5, 150, 0.88, 106, 151, 1, 197, 67, 1, 5, 150, 0.81, 106, 151, 0.93, 197, 67, 1, 5, 150, 0.75, 106, 151, 0.86, 197, 67, 1, 5, 150, 0.69, 106, 151, 0.79, 197, 67, 1, 5, 150, 0.63, 106, 151, 0.71, 197, 67, 1, 5, 150, 0.56, 106, 151, 0.64, 197, 67, 0.9, 5, 150, 0.5, 106, 151, 0.57, 197, 67, 0.8, 5, 150, 0.44, 106, 151, 0.5, 197, 67, 0.7, 5, 150, 0.38, 106, 151, 0.43, 197, 67, 0.6, 5, 150, 0.31, 106, 151, 0.36, 197, 67, 0.5, 5, 150, 0.25, 106, 151, 0.29, 197, 67, 0.4, 5, 150, 0.19, 106, 151, 0.21, 197, 67, 0.3, 5, 150, 0.13, 106, 151, 0.14, 197, 67, 0.2, 5, 150, 0.06, 106, 151, 0.07, 197, 67, 0.1, 5, 150, 0, 106, 151, 0, 197, 67, 0);
	fanf4 = new Array(97, 98, 123);
	fani5 = new Array(24, -66, 1, 24, -63, 1, 24, -53, 1, 24, -38, 1, 24, -16, 1, 24, 12, 1, 24, 8, 1, 24, 6, 1, 24, 8, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 12, 1, 24, 11, 1, 24, 7, 1, 24, 1, 1, 24, -8, 1, 24, -19, 1, 24, -32, 1, 24, -48, 1, 24, -67, 1);
	fani6 = new Array(36, 138, 0, 106, 193, 0, 321, 72, 1, 36, 138, 0.11, 106, 193, 0.2, 321, 72, 1, 36, 138, 0.22, 106, 193, 0.4, 321, 72, 1, 36, 138, 0.33, 106, 193, 0.6, 321, 72, 1, 36, 138, 0.45, 106, 193, 0.8, 321, 72, 1, 36, 138, 0.55, 106, 193, 1, 179, 67, 0, 36, 138, 0.67, 106, 189, 1, 188, 67, 0.36, 36, 138, 0.78, 106, 186, 1, 196, 67, 0.64, 36, 138, 0.89, 106, 182, 1, 201, 67, 0.84, 36, 138, 1, 106, 163, 1, 204, 67, 0.96, 36, 138, 1, 106, 148, 1, 205, 67, 1, 36, 138, 1, 106, 136, 1, 201, 67, 1, 36, 138, 1, 106, 127, 1, 189, 67, 1, 36, 138, 1, 106, 122, 1, 195, 67, 1, 36, 138, 1, 106, 120, 1, 197, 67, 1, 36, 138, 1, 106, 120, 0.89, 197, 67, 1, 36, 138, 1, 106, 120, 0.78, 197, 67, 1, 36, 138, 1, 106, 120, 0.67, 197, 67, 1, 36, 138, 1, 106, 120, 0.55, 197, 67, 1, 36, 138, 1, 106, 120, 0.45, 197, 67, 1, 36, 138, 1, 106, 120, 0.33, 197, 67, 1, 36, 138, 1, 106, 120, 0.22, 197, 67, 1, 36, 138, 1, 106, 120, 0.11, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 120, 0, 197, 67, 1, 36, 138, 1, 106, 193, 0, 197, 67, 1, 36, 138, 1, 106, 193, 0.2, 197, 67, 1, 36, 138, 1, 106, 193, 0.4, 197, 67, 1, 36, 138, 1, 106, 193, 0.6, 197, 67, 1, 36, 138, 1, 106, 193, 0.8, 197, 67, 1, 36, 138, 1, 106, 193, 1, 197, 67, 1, 36, 138, 1, 106, 189, 1, 197, 67, 1, 36, 138, 1, 106, 186, 1, 197, 67, 1, 36, 138, 1, 106, 182, 1, 197, 67, 1, 36, 138, 0.94, 106, 163, 1, 197, 67, 1, 36, 138, 0.88, 106, 148, 1, 197, 67, 1, 36, 138, 0.81, 106, 136, 1, 197, 67, 1, 36, 138, 0.75, 106, 127, 1, 197, 67, 1, 36, 138, 0.69, 106, 122, 1, 197, 67, 1, 36, 138, 0.63, 106, 120, 1, 197, 67, 1, 36, 138, 0.56, 106, 120, 0.89, 197, 67, 0.9, 36, 138, 0.5, 106, 120, 0.78, 197, 67, 0.8, 36, 138, 0.44, 106, 120, 0.67, 197, 67, 0.7, 36, 138, 0.38, 106, 120, 0.55, 197, 67, 0.6, 36, 138, 0.31, 106, 120, 0.45, 197, 67, 0.5, 36, 138, 0.25, 106, 120, 0.33, 197, 67, 0.4, 36, 138, 0.19, 106, 120, 0.22, 197, 67, 0.3, 36, 138, 0.13, 106, 120, 0.11, 197, 67, 0.2, 36, 138, 0.06, 106, 120, 0, 197, 67, 0.1, 36, 138, 0, 106, 120, 0, 197, 67, 0);
	fanf6 = new Array(115, 98, 122);
	fani7 = new Array(157, 56, 10, 4, 1, 125, 44, 75, 27, 1, 98, 34, 128, 47, 1, 77, 27, 170, 62, 1, 62, 22, 199, 73, 1, 53, 18, 217, 80, 1, 50, 17, 223, 82, 1, 65, 22, 194, 71, 1, 70, 24, 184, 67, 1, 66, 22, 192, 70, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 54, 18, 216, 79, 1, 50, 17, 223, 82, 1, 65, 22, 194, 71, 1, 70, 24, 184, 67, 1, 66, 22, 192, 70, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 54, 18, 216, 79, 1, 50, 17, 223, 82, 1, 65, 22, 194, 71, 1, 70, 24, 184, 67, 1, 66, 22, 192, 70, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 1, 65, 22, 194, 71, 0.83, 65, 22, 194, 71, 0.67, 65, 22, 194, 71, 0.5, 65, 22, 194, 71, 0.33, 65, 22, 194, 71, 0.17, 65, 22, 194, 71, 0);
	fani8 = new Array(-6, -199, 2, -138, 8, -88, 13, -50, 17, -22, 19, -6, 20, 0);
	scrux = new Array(232, 245, 258, 271, 284);
	var cke = document.cookie;
	var yrstx = cke.indexOf("rvs_3d_run=") + 11;
	if (yrstx != 10) {
		var yrmjs = cke.substr(yrstx, cke.indexOf("endcksv") - yrstx);
		bstscr = Math.floor(yrmjs)
	} else {
		var ckdta = new Date();
		ckdta.setDate(ckdta.getDate() + 730);
		document.cookie = "rvs_3d_run=1000endcksv; expires=" + ckdta.toGMTString();
		bstscr = 1000
	};
	var ccvs2 = document.createElement('canvas');
	ccvs2.width = 320;
	ccvs2.height = 568;
	bcv2 = ccvs2.getContext('2d');
	bex = new Array(136, 139, 138, 139, 138);
	bey = new Array(66, 87, 99, 87, 78);
	var cke = document.cookie;
	var yrstx = cke.indexOf("st_kma_run=") + 11;
	gmsts = 0;
	if (yrstx != 10) {
		gmsts = Math.floor(cke.substr(yrstx, 1))
	};
	yrstx = cke.indexOf("st_kma_tip=") + 11;
	gtips = 0;
	if (yrstx != 10) {
		if (Math.floor(cke.substr(yrstx, 1)) == 1) {
			gtips = 1
		}
	};
	stini()
};
function stini() {
	tipon = 0;
	gmovcl = 0;
	stti1 = 2;
	stti2 = 30;
	ranlp = .5;
	ttlct = 760;
	switch (gmsts) {
	case 0:
		stti1 = 2;
		stti2 = 30;
		ranlp = .5;
		ttlct = 0;
		break;
	case 1:
		stti1 = 2;
		stti2 = 30;
		ranlp = .5;
		ttlct = 760;
		break;
	case 2:
		stti1 = 2;
		stti2 = 30;
		ranlp = .5;
		ttlct = 760;
		break;
	case 3:
		stti1 = 2;
		stti2 = 30;
		ranlp = .5;
		ttlct = 760;
		break;
	default:
		break
	};
	gmovf = 0;
	gmovc = 5;
	af = 0;
	afc = 0;
	ef = 0;
	efc = 0;
	tx[0] = 160;
	ty[0] = 200;
	tx[1] = 160;
	ty[1] = 53;
	wx = 160;
	tm = 0;
	mt = 0;
	flt = 0;
	upx = 0;
	stefc = 0;
	sp = 1;
	bp_f = {};
	bp_fi = 0;
	bpfr = 0;
	ip_f = {};
	ip_fi = 0;
	rk_f = {};
	rk_fi = 0;
	wd_f = {};
	wd_fi = 0;
	as_f = {};
	as_fi = 0;
	asfr = 0;
	asfr2 = 0;
	mkt = 0;
	mky = 0;
	mkj = 0;
	arc = 0;
	brc = 0;
	rmx = 285;
	rex = 324;
	msp = 0;
	esp = 0;
	mes = 0;
	ttlmd = 1;
	slv = 0;
	uct = -75;
	alp = 1;
	dgt = 0;
	gtm = 0;
	bnsc = 0;
	bnst = 0;
	cmb = 0;
	scr = 0;
	lscr = 0;
	spdr = 0;
	spdr1 = 0;
	spdr2 = 0;
	fvr = 0;
	fvrc = 0;
	fvri = 0;
	fvra = 0;
	hsmn = 0;
	tchy = 0;
	jpy = 0;
	jsf = 0;
	kmstt = 0;
	mtitv = 0;
	ogm = 0;
	bemx = 0;
	bemy = 0;
	for (var i = 2; i < m; i++) {
		tx[i] = Math.floor(Math.random() * 220) + 50;
		ty[i] = 500;
		tt[i] = Math.floor(Math.random() * 2);
		ta[i] = 1;
		tf[i] = 0;
		tl[i] = 0;
		ty[i] = 417;
		ts[i] = 12
	}
};
function gtcmb(mx, my) {
	pt_set1(mx, my, 32);
	cmb++;
	if (fvr == 0) {
		if (cmb > 1 && cmb < 9) {
			fa_f["c" + fa_fi] = {
				x : tx[0] - 22,
				y : ty[0] - 50,
				fi : 0,
				pi : 0,
				ci : 80 + cmb,
				l : 1
			};
			fa_fi++;
			if (cmb == 8 && spdr == 0) {
				fa_f["c" + fa_fi] = {
					x : Math.floor(Math.random() * 200) + 60,
					y : 355,
					fi : 1,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				spdr = -1
			}
		}
	};
	if (arc == 0) {
		arc = 1
	}
};


function tev11(e) {
  var PosX = e.clientX;
  var PosY = e.clientY;
  mousePos = {x:PosX,y:PosY};  
  Press(mousePos);
  e.preventDefault();
};

function tev1(e) {
   var PosX = e.touches[0].pageX;
   var PosY = e.touches[0].pageY;
   mousePos = {x:PosX,y:PosY};
   Press(mousePos);
   	e.preventDefault();
};

function Press(mousePos) {
	var tchx = (mousePos.x / wdpr | 0);
	switch (s) {
	case 1:
		mv(tchx);
		if (ttlct < 750) {
			var tchy = (mousePos.y / wdpr | 0);
			if (tchx > 235 && tchy < 70) {
				ttlct = 751
			}
		};
		break;
	case 0:
		var tchy = (mousePos.y/ wdpr | 0);
		if (tchx > 175 && tchy > 365) {
		    //更多游戏
			//window.location.href='http://www.duopao.com';
		} else if (tchx < 60 && tchy > 350) {
			//跳转排行榜
		} else {
			//gasp.style.display = "none";
			stini();
			s = 1;
			if (dvid != 6) {
				stm = setTimeout("lp()", 1000 / stti2)
			} else {
				window.requestAnimationFrame = (function () {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (c, e) {
						window.setTimeout(c, 1000 / 60)
					}
				})();
				ralp()
			};
			canvas.style.backgroundImage = "none"
		};
		break;
	case 2: 
		//提交分数接口 scr
		scr = 0;		
		stini();
		s = 1;
		/*;if(tipon==1){tipon=0}else if(tchy<170){stini();s=1}else if(tchy>290){if(tchx<118){}else{var shli=2;if(gmsts>1){shli=3}}};*/
		d;
		break;
	default:
		break
	};
	var nchy = mousePos.y / wdpr;
	jpy = 0;
	tchy = nchy;
	//event.preventDefault()
};

function tev22(e) {
  var PosX = e.clientX;
  var PosY = e.clientY;
  mousePos = {x:PosX,y:PosY};   
  Release(mousePos);
};

function tev2(e) {
   var PosX = e.changedTouches[0].pageX;
   var PosY = e.changedTouches[0].pageY;
   mousePos = {x:PosX,y:PosY};
   Release(mousePos);
   e.preventDefault();
};

function Release(mousePos) {
	if (jpy > 10 && mkt == 0) {
		mkt = 21;
		mky = 0;
		mkj = -20;
		jsf = 101
	};
	//event.preventDefault()
};

function tev33(e) {
  var PosX = e.clientX;
  var PosY = e.clientY;
  mousePos = {x:PosX,y:PosY};   
  Move(mousePos);
};

function tev3(e) {
  var PosX = e.touches[0].pageX;
   var PosY = e.touches[0].pageY;
   mousePos = {x:PosX,y:PosY};
   Move(mousePos);
  event.preventDefault();
};

function Move(mousePos) {
	var nchy = mousePos.y / wdpr;
	jpy = tchy - nchy;
	tchy = nchy;
	mv((mousePos.x / wdpr | 0));
	//event.preventDefault()
};
function tev4(event) {
	event.preventDefault()
};
function mv(tchx) {
	wx = mx = (tchx - 160) * .6 + 160
};
function pt_set1(mx, my, mf) {
	var Rx;
	var Ry;
	var Rr = 0;
	var Rds;
	var Rtx;
	var Rty;
	Rds = Math.sqrt(Math.pow(Rx, 2) + Math.pow(Ry, 2));
	Rtx = Math.cos(Rr);
	Rty = Math.sin(Rr);
	mx -= 9;
	my -= 9;
	for (var itpi = 0; itpi < 10; itpi++) {
		Rr += .66;
		Rtx = Math.cos(Rr) * 8;
		Rty = Math.sin(Rr) * 8;
		ip_f["c" + ip_fi] = {
			x : mx + Rtx,
			y : my + Rty,
			f : mf,
			sx : Rtx * .4 + Math.random() * .2 - .1,
			sy : Rty * .01 - Math.random() * 1,
			a : 1,
			l : 1
		};
		ip_fi++
	}
};
function pt_set2(mx, my, per2) {
	var per3 = per2 * 1.4;
	for (var itpi = 0; itpi < 6; itpi++) {
		rk_f["c" + rk_fi] = {
			x : mx,
			y : my,
			ly : my,
			sy2 : 0,
			f : 37 + Math.floor(Math.random() * 3),
			sx : (-10 + itpi * 3.3) * per3,
			sy : (-7 - Math.random() * 3) * per3,
			sc : per3 * 1.3,
			l : 1
		};
		rk_fi++
	};
	rk_f["c" + (rk_fi - 4)].sy -= 2 * per3;
	rk_f["c" + (rk_fi - 3)].sy -= 2 * per3
};
function pt_set3(mx, my, per2) {
	var per3 = per2 * 1.4;
	var mtstf = new Array(110, 111, 112, 113, 113);
	var mtstx = new Array(-8, 10, 2.4, -5.6, -4.8);
	var mtsty = new Array(-6, -6, -10, -5, -8);
	for (var itpi = 0; itpi < 5; itpi++) {
		wd_f["c" + wd_fi] = {
			x : mx,
			y : my,
			ly : my,
			sy2 : 0,
			f : mtstf[itpi],
			sx : mtstx[itpi] * per3,
			sy : mtsty[itpi] * per3,
			sc : per3 * 1.3,
			a : 1,
			l : 1
		};
		wd_fi++
	}
};
function lp() {
	if (dvid != 6 && alp == 1) {
		clearTimeout(stm);
		stm = setTimeout("lp()", 1000 / stti2)
	};
	var i;
	var tg;
	var asr = 0;
	if (ogm == 0) {
		stgbg += 1 + (fvr > 0);
		if (stgbg > 4) {
			stgbg -= 5
		};
		ctx.drawImage(img1, stgbg * 320, 0, 320, 568, 0, 0, 320, 568);
		var dp = new Array();
		for (i in w) {
			tg = w[i];
			tg.y = Math.floor(ty[tg.i]);
			dp.push([tg.i, tg.y])
		};
		srt(dp, 1);
		tm = Math.floor(+new Date() / 1000);
		if (tm != mt && tm > 1) {
			flt = 0;
			if (gmsts == 0 && scr > 500) {
				var ckdta = new Date();
				ckdta.setDate(ckdta.getDate() + 730);
				document.cookie = "st_kma_run=1; expires=" + ckdta.toGMTString();
				gmsts = 1
			}
		};
		flt++;
		mt = tm;
		var i2;
		var per;
		var per2;
		var prx;
		var pry;
		var mx;
		var my;
		var slw = 1;
		if (fvr > 0) {
			slw = .5
		};
		for (i2 = 0; i2 < dp.length; i2++) {
			i = dp[i2][0];
			switch (i) {
			case 0:
				if (ip_fi > 0) {
					var chkct = 0;
					for (var pi in ip_f) {
						tg = ip_f[pi];
						if (tg.l == 1) {
							tg.x += tg.sx;
							tg.y += tg.sy;
							tg.sx *= .85;
							tg.sy -= .3;
							tg.a -= .05;
							if (tg.a < 0) {
								tg.l = 0;
								delete tg
							} else {
								ctx.globalAlpha = tg.a;
								spt2(tg.f, tg.x, tg.y);
								ctx.globalAlpha = 1
							};
							chkct++
						}
					};
					if (chkct == 0) {
						ip_f = {};
						ip_fi = 0
					}
				};
				if (rk_fi > 0) {
					var chkct = 0;
					for (var pi in rk_f) {
						tg = rk_f[pi];
						if (tg.l == 1) {
							tg.x += tg.sx;
							tg.y += tg.sy;
							tg.sx *= .96;
							tg.sy += .8 * tg.sc + tg.sy2;
							if (tg.sy > 2) {
								tg.sc *= .8
							};
							if (tg.y > tg.ly || tg.sc < .1) {
								tg.l = 0;
								delete tg
							} else {
								spt(tg.f, tg.x, tg.y, tg.sc, 0)
							};
							chkct++
						}
					};
					if (chkct == 0) {
						rk_f = {};
						rk_fi = 0
					}
				};
				if (wd_fi > 0) {
					var chkct = 0;
					for (var pi in wd_f) {
						tg = wd_f[pi];
						if (tg.l == 1) {
							tg.x += tg.sx;
							tg.y += tg.sy;
							tg.sx *= .96;
							tg.sy += 1;
							if (tg.sy > 0) {
								tg.a -= .1
							};
							if (tg.a < 0) {
								tg.a = 0;
								tg.l = 0;
								delete tg
							} else {
								ctx.globalAlpha = tg.a;
								spt(tg.f, tg.x, tg.y, tg.sc, 0);
								ctx.globalAlpha = 1
							};
							chkct++
						}
					};
					if (chkct == 0) {
						wd_f = {};
						wd_fi = 0
					}
				};
				if (fvr != 0) {
					var ffi;
					for (var qi = 0; qi < 3; qi++) {
						ffi = fafi2 * 3 * 5 + qi * 5;
						ctx.globalAlpha = fani2[ffi + 2];
						spt4(fanf2[qi], fani2[ffi] + tx[0], fani2[ffi + 1] + 175, fani2[ffi + 3], fani2[ffi + 4])
					};
					fafi2++;
					if (fafi2 > 15) {
						fafi2 = 0
					};
					ctx.globalAlpha = 1
				};
				afc++;
				if (afc > 1) {
					afc = 0;
					af++;
					if (af > 5) {
						af = 0
					}
				};
				tx[i] += (wx - tx[i]) / 3;
				if (tx[i] < 80) {
					tx[i] = 80
				};
				if (tx[i] > 240) {
					tx[i] = 240
				};
				upx = tx[i];
				var fcf = af + 6;
				if (ty[1] > 160) {
					asr = .5;
					fcf = af + 12;
					asfr++;
					if (asfr > 8) {
						asfr = 0;
						as_f["c" + as_fi] = {
							x : tx[i] + 10 - 4,
							y : ty[i] - 80,
							sx : 2 + Math.random() * 5,
							sy : -3 - Math.random() * 5,
							f : 56 + Math.floor(Math.random() * 2),
							a : 1,
							l : 1
						};
						as_fi++;
						as_f["c" + as_fi] = {
							x : tx[i] + 5 - 4,
							y : ty[i] - 80,
							sx : 0 + Math.random() * 5,
							sy : -5 - Math.random() * 5,
							f : 56 + Math.floor(Math.random() * 2),
							a : 1,
							l : 1
						};
						as_fi++;
						as_f["c" + as_fi] = {
							x : tx[i] - 10 - 4,
							y : ty[i] - 80,
							sx : -2 - Math.random() * 5,
							sy : -3 - Math.random() * 5,
							f : 54 + Math.floor(Math.random() * 2),
							a : 1,
							l : 1
						};
						as_fi++;
						as_f["c" + as_fi] = {
							x : tx[i] - 5 - 4,
							y : ty[i] - 80,
							sx : -0 - Math.random() * 5,
							sy : -5 - Math.random() * 5,
							f : 54 + Math.floor(Math.random() * 2),
							a : 1,
							l : 1
						};
						as_fi++
					}
				};
				if (mkt > 0) {
					fcf = jsf;
					var mkj2 = mkj;
					if (jsf != 45) {
						switch (mkt) {
						case 16:
							if (jsf != 103) {
								jsf = 102
							};
							break;
						case 8:
							jsf = 103;
							break;
						default:
							break
						};
						mkj2 = mkj * .7
					};
					mky += mkj2;
					mkj += 2;
					if (mky > 0) {
						mky = 0;
						mkj = -mkj / 2
					};
					mkt--;
					if (mkt == 0) {
						mky = 0;
						mkj = 0
					};
					spt2(53, tx[i] - 24, ty[i])
				};
				if (arc > 0) {
					ctx.globalAlpha = ara[0][arc];
					spt3(46, tx[i], ty[i] + ary[0][arc] + 130, arw[0][arc], arh[0][arc]);
					ctx.globalAlpha = 1;
					spt(fcf, tx[i], ty[i] + mky, 1, .7);
					ctx.globalAlpha = ara[1][arc];
					spt3(47, tx[i], ty[i] + ary[0][arc] + 130, arw[0][arc], arh[0][arc]);
					ctx.globalAlpha = 1;
					arc++;
					if (arc > 10) {
						arc = 0
					}
				} else {
					spt(fcf, tx[i], ty[i] + mky, 1, .7)
				};
				if (as_fi > 0) {
					var chkct = 0;
					for (var pi in as_f) {
						tg = as_f[pi];
						if (tg.l == 1) {
							tg.x += tg.sx;
							tg.y += tg.sy;
							tg.sx *= .96;
							tg.sy += 1.2;
							tg.a -= .1;
							if (tg.a < 0) {
								tg.l = 0;
								delete tg
							} else {
								ctx.globalAlpha = tg.a;
								spt2(tg.f, tg.x, tg.y);
								ctx.globalAlpha = 1
							};
							chkct++
						}
					};
					if (chkct == 0) {
						as_f = {};
						as_fi = 0
					}
				};
				break;
			case 1:
				efc++;
				if (efc > 2) {
					efc = 0;
					ef++;
					if (ef > 4) {
						ef = 0
					}
				};
				stefc += kmstt;
				if (stefc > 30) {
					if (stefc < 60) {
						rex += (rmx + 3 - rex) / 6
					}
				};
				ty[i] += ((195 - (mes) * 4.833) - ty[i]) / 10;
				if (ty[i] < 50) {
					ty[i] = 50
				};
				if (ty[i] > 195) {
					ty[i] = 195
				};
				per2 = (ty[i] - 50) / 130;
				per = (ty[i] - 40) / 336;
				mx = (tx[i] - 160) * per + 164;
				my = ty[i] - per / 2;
				if (my < 75) {
					my = 75
				};
				if (ty[i] < 120) {
					ctx.globalAlpha = ty[i] * ty[i] * ty[i] / 10000 * (1 / 120)
				};
				if (brc > 0) {
					ctx.globalAlpha = ara[2][brc];
					spt3(48, mx, my + ary[2][brc] * per2 + 200 * per2, arw[2][brc] * per2 * 1, arh[2][brc] * per2 * 1);
					ctx.globalAlpha = 1;
					spt(ef + 1, mx, my, per2, .83);
					ctx.globalAlpha = ara[3][brc];
					spt3(49, mx, my + ary[3][brc] * per2 + 170 * per2, arw[3][brc] * per2 * 1, arh[3][brc] * per2 * 1);
					ctx.globalAlpha = 1;
					brc++;
					if (brc > 10) {
						brc = 0
					}
				} else {
					spt(ef + 1, mx, my, per2, .83)
				};
				bemx = mx;
				bemy = my;
				ctx.globalAlpha = 1;
				if (bp_fi > 0) {
					var bp_fc = 0;
					var pi;
					for (pi in bp_f) {
						tg = bp_f[pi];
						if (tg.l == 1) {
							ctx.globalAlpha = tg.a;
							spt2(tg.f, tg.x, tg.y);
							ctx.globalAlpha = 1;
							tg.x += tg.sx;
							tg.y += tg.sy;
							tg.sy -= .1;
							tg.a -= .05;
							if (tg.a < 0) {
								tg.l = 0;
								delete tg
							};
							bp_fc++
						}
					};
					if (bp_fc == 0) {
						bp_f = {};
						bp_fi = 0
					}
				};
				bpfr++;
				var ef2 = ef + 1;
				if (ef2 > ef) {
					ef2 - 4
				};
				if ((ef == 1 || ef == 3) && bpfr > 0 && ty[i] > 150) {
					bpfr = 0;
					bp_f["c" + bp_fi] = {
						x : tx[i] + 5,
						y : ty[i] - 60 * per2,
						sx : Math.random() * 0 - 0,
						sy : 3.8 * per2,
						f : 29 + Math.floor(Math.random() * 2),
						a : 1,
						l : 1
					};
					bp_fi++
				};
				break;
			default:
				if (tl[i] == 1) {
					per2 = (ty[i] - 50) / (236 + (1800 - ty[i]) * .09);
					ty[i] -= ts[i] * (per2);
					per = (ty[i] - 40) / 336;
					mx = (tx[i] - 160) * per + 160;
					my = ty[i];
					if (ty[i] < 115) {
						ta[i] -= .05;
						if (ta[i] < 0) {
							ta[i] = 0
						};
						if (ty[i] < 80) {
							if (tl[i] == 1) {
								ta[i] = 0;
								switch (tt[i]) {
								case 0:
									if (fvr == 0 && ttlmd == 0) {
										sp += 2;
										if (sp > 1.5) {
											sp = 1.5
										};
										pt_set1(mx, my, 35);
										if (brc == 0) {
											brc = 1
										};
										if (mes > 30) {
											esp += 84
										} else {
											esp += 46
										}
									};
									break;
								case 2:
									if (fvr == 0) {
										pt_set1(mx, my, 35);
										esp = 200
									};
									spdr = 0;
									break;
								default:
									break
								}
							};
							tl[i] = 0;
							usi.push(i)
						}
					};
					if (ty[i] > 200 && ty[i] < 225 && (Math.abs(mx - tx[0]) < 25 || tt[i] == 3) && (mkt < 7 || tt[i] == 2) && tl[i] == 1 && tt[i] != 4) {
						tl[i] = 0;
						usi.push(i);
						switch (tt[i]) {
						case 0:
							gtcmb(mx, my);
							if (mes < 6) {
								msp = 12
							} else if (mes < 10) {
								msp = 10
							} else {
								msp = 7
							};
							break;
						case 1:
							pt_set2(mx, my, per2);
							if (mkt > 0) {
								mkt = 20;
								mky = -16;
								mkj = -9;
								jsf = 103;
								gtcmb(mx, my)
							} else if (fvr == 0) {
								cmb = 0;
								mkt = 16;
								mky = 0;
								mkj = -8;
								jsf = 45;
								if (ttlmd == 0) {
									if (mes > 24) {
										msp = -600;
										esp += 50
									} else if (mes > 12) {
										msp = -600;
										esp += 20
									} else {
										msp = -300
									};
									if (scr > 2500) {
										msp -= (scr - 2500) / 100
									}
								}
							} else {
								gtcmb(mx, my)
							};
							break;
						case 2:
							fa_f["c" + fa_fi] = {
								x : 0,
								y : 0,
								fi : 2,
								pi : 0,
								ci : 0,
								l : 1
							};
							fa_fi++;
							fvr = 1;
							fvrc = 0;
							fvri = 1;
							fvra = 0;
							spdr = 0;
							if (slv < 2) {
								slv = 2
							};
							break;
						case 3:
							pt_set3(mx, my, per2);
							if (mkt > 0) {
								mkt = 20;
								mky = -16;
								mkj = -9;
								jsf = 103;
								gtcmb(mx, my)
							} else if (fvr == 0) {
								cmb = 0;
								mkt = 16;
								mky = 0;
								mkj = -8;
								jsf = 45;
								if (ttlmd == 0) {
									if (mes > 24) {
										msp = -600;
										esp += 50
									} else if (mes > 12) {
										msp = -600;
										esp += 20
									} else {
										msp = -300
									};
									if (scr > 2500) {
										msp -= (scr - 2500) / 100
									}
								}
							} else {
								gtcmb(mx, my)
							};
						default:
							break
						}
					} else if (tl[i] == 1 && ty[i] < ty[1] + 10 && tt[i] != 4) {
						var krk = 0;
						switch (tt[i]) {
						case 0:
							if (fvr == 0) {
								pt_set1(mx, my, 35);
								if (brc == 0) {
									brc = 1
								};
								if (mes > 15) {
									esp = 36
								} else if (mes > 6) {
									esp = 24
								} else {
									esp = 10
								};
								if (scr > 2500) {
									esp += (scr - 2500) / 100
								}
							};
							break;
						case 1:
							if (Math.random() * 100 > gkk[slv]) {
								pt_set2(mx, my, per2);
								if (mes > 12) {
									esp = -20
								} else {
									esp = -200
								};
								if (scr > 2200) {
									esp = -20
								}
							} else {
								krk = 1;
								ts[i] = 0;
								tt[i] = 4;
								tj[i] = -24;
								tjy[i] = 0;
								trf[i] = 121
							};
							break;
						case 2:
							if (fvr == 0) {
								pt_set1(mx, my, 35);
								esp = 100
							};
							spdr = 0;
							cmb = 0;
							break;
						case 3:
							pt_set3(mx, my, per2);
							if (mes > 12) {
								esp = -20
							} else {
								esp = -200
							};
							if (scr > 2200) {
								esp = -20
							};
							break;
						default:
							break
						};
						if (krk == 0) {
							tl[i] = 0;
							usi.push(i)
						}
					};
					if (tl[i] == 1 && ta[i] > 0) {
						ctx.globalAlpha = ta[i];
						if (ty[i] < 568) {
							switch (tt[i]) {
							case 0:
								spt(knmf[(tf[i] | 0)], mx, my, per2, 0);
								tf[i] += .5 * slw;
								if (tf[i] > 5) {
									tf[i] = 0
								};
								break;
							case 1:
								spt(23 + (tf[i] | 0), mx, my, per2 * 1.9, 0);
								tf[i] += .2 * slw;
								if (tf[i] > 6) {
									tf[i] = 0
								};
								break;
							case 2:
								spt(80, mx, my, per2 * 1.9, 0);
								break;
							case 3:
								spt(104 + (tf[i] | 0), mx, my, per2 * 1.9, 0);
								tf[i] += .3 * slw;
								if (tf[i] > 5) {
									tf[i] = 0
								};
								break;
							case 4:
								tjy[i] += tj[i];
								tj[i] += 1.5;
								ty[i] += (220 - ty[i]) / 10;
								if (tjy[i] > -10 && tj[i] > 0) {
									tjy[i] = 0;
									pt_set2(mx, my, per2);
									tl[i] = 0;
									usi.push(i);
									if (fvr == 0 && Math.abs(mx - tx[0]) < 40 && mkt == 0) {
										mkt = 16;
										mky = 0;
										mkj = -8;
										jsf = 45
									}
								};
								ctx.globalAlpha = .6;
								spt(53, mx, my, per2 * 1.9, 0);
								ctx.globalAlpha = 1;
								spt((trf[i] | 0), mx, my + tjy[i], per2 * 1.9, 0);
								trf[i] -= .5;
								if (trf[i] < 116) {
									trf[i] = 121
								};
								break;
							default:
								break
							}
						};
						ctx.globalAlpha = 1
					}
				};
				break
			};
			var ido;
			if (msp >= 0) {
				msp *= .95;
				if (Math.abs(msp) < .01) {
					msp = 0
				};
				ido = (msp + 1) / 80;
				if (ido < 0) {
					ido = 0
				}
			} else if (msp < 0) {
				msp++;
				ido = 0
			};
			rmx -= ido;
			if (esp >= 0) {
				esp *= .95;
				if (Math.abs(esp) < .01) {
					esp = 0
				};
				ido = (esp + 1) / 80;
				if (ido < 0) {
					ido = 0
				}
			} else if (esp < 0) {
				esp++;
				ido = 0
			};
			rex -= ido;
			if (rmx < 100) {
				rmx += 100;
				rex += 100
			};
			mes = rex - rmx;
			if (mes > 28) {
				rex = rmx + 28
			}
		};
		uct += askb;
		var nlv = slv;
		if (nlv > 16) {
			nlv = 16
		};
		if (fvr != 0) {
			nlv = 17
		};
		var intv = glv[nlv];
		var itsp = gsp[nlv];
		if (stti1 > 1 && nlv > 10 && mes < 1 && fvr == 0 && spdr == 0 && spdr1 == 0 && spdr2 == 0) {
			fa_f["c" + fa_fi] = {
				x : Math.floor(Math.random() * 200) + 60,
				y : 355,
				fi : 5,
				pi : 0,
				ci : 0,
				l : 1
			};
			fa_fi++;
			spdr2 = -1
		};
		if (spdr1 > 0) {
			spdr1--
		};
		if (bnsc == 0) {
			if (stti1 > 0 && nlv > 9 && cmb < 4 && mes < 16 && fvr == 0 && bnst == 0 && Math.random() * 5000 > 497 && spdr == 0 && spdr1 == 0 && spdr2 == 0) {
				var rdlr = 50;
				if (Math.random() * 100 > 50) {
					rdlr = 220
				};
				fa_f["c" + fa_fi] = {
					x : rdlr,
					y : 355,
					fi : 4,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				spdr1 = 160
			}
		} else {
			intv = 10;
			nlv = 18
		};
		if (uct > intv) {
			uct = 0;
			var uslg = usi.length;
			if (uslg > 0) {
				if (spdr > 0) {
					iint(spdr + 26, 417, 2, 12);
					spdr = -2
				} else {
					var shgx = Math.floor(Math.random() * 260) + 30;
					var sitm = 0;
					switch (nlv) {
					case 0:
					case 1:
						iint(shgx, 417, slv, itsp);
						break;
					case 2:
						shgx = 160;
						iint(shgx, 417, 3, itsp);
						break;
					case 3:
						iint(shgx, 417, 0, itsp);
						break;
					case 4:
						if (Math.random() * 100 > 50) {
							sitm = 1
						};
						iint(shgx, 417, sitm, itsp);
						break;
					case 5:
					case 6:
					case 17:
						if (mtitv == 0) {
							sitm = 3;
							shgx = 160;
							mtitv = Math.floor(Math.random() * 5) + 2
						} else if (Math.random() * 100 > 50) {
							sitm = 1
						};
						mtitv--;
						iint(shgx, 417, sitm, itsp);
						break;
					case 7:
					case 8:
						if (mes > 8 && Math.random() * 100 > 90) {
							var itsp2 = itsp + 2;
							iint(50, 417, 0, itsp2);
							iint(285, 417, 0, itsp2)
						} else {
							if (mtitv == 0) {
								sitm = 3;
								shgx = 160;
								mtitv = Math.floor(Math.random() * 10) + 2
							} else if (Math.random() * 100 > 50) {
								sitm = 1
							};
							mtitv--;
							iint(shgx, 417, sitm, itsp)
						};
						break;
					case 9:
						iint(shgx, 417, 1, itsp);
						break;
					case 18:
						if (bnsc > 10) {
							iint(275 - (bnsc - 10) * 30, 417, 0, itsp);
							bnsc++;
							if (bnsc > 18) {
								bnsc = 0
							}
						} else {
							iint(50 + bnsc * 30, 417, 0, itsp);
							bnsc++;
							if (bnsc > 8) {
								bnsc = 0
							}
						};
						break;
					default:
						if (mes > 8 && Math.random() * 100 > 90) {
							var itsp2 = itsp + 2;
							iint(50, 417, 0, itsp2);
							iint(285, 417, 0, itsp2)
						} else {
							if (mtitv == 0) {
								sitm = 3;
								shgx = 160;
								mtitv = Math.floor(Math.random() * 10) + 2
							} else if (Math.random() * 100 > 50) {
								sitm = 1
							};
							mtitv--;
							iint(shgx, 417, sitm, itsp)
						};
						break
					}
				}
			}
		};
		if (ttlmd == 0) {
			var nmy = 12 + (fvr > 0) * 50;
			scs((scr | 0), 1, nmy);
			spt2(78, 297, nmy);
			scr += .5 + (fvr > 0) * .5 + (msp > 0) * .5 + asr;
			if (fvr == 0) {
				lscr++;
				if (lscr > gcl[slv]) {
					lscr = 0;
					slv++;
					switch (slv) {
					case 5:
						mtitv = 0;
						break;
					case 9:
						uct = -10;
						if (mes > 18) {
							rex = rmx + 18
						};
						break;
					default:
						break
					}
				}
			};
			if (hsmn == 1) {
				spt2(96, 245, nmy + 32)
			};
			if (scr > bstscr) {
				fa_f["c" + fa_fi] = {
					x : 0,
					y : nmy - 12,
					fi : 3,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				bstscr = 999999
			}
		} else {
			ttlct += askb;
			switch (ttlct) {
			case 20:
				fa_f["c" + fa_fi] = {
					x : 0,
					y : 0,
					fi : 6,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				break;
			case 100:
				fa_f["c" + fa_fi] = {
					x : 0,
					y : 0,
					fi : 8,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				break;
			case 295:
				fa_f["c" + fa_fi] = {
					x : 0,
					y : 0,
					fi : 7,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				slv++;
				uct = 0;
				break;
			case 500:
				uct = 0;
				break;
			case 520:
				fa_f["c" + fa_fi] = {
					x : 0,
					y : 0,
					fi : 10,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				uct = -50;
				slv++;
				break;
			case 534:
				fa_f["c" + fa_fi] = {
					x : 0,
					y : 0,
					fi : 9,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				break;
			case 700:
				uct = -130;
				break;
			case 785:
				fa_f["c" + fa_fi] = {
					x : 0,
					y : 0,
					fi : 11,
					pi : 0,
					ci : 0,
					l : 1
				};
				fa_fi++;
				break;
			case 810:
				kmstt = 1;
				slv++;
				break;
			case 850:
				ttlmd = 0;
				pt_set1(290, 40, 32);
				break;
			default:
				break
			}
		};
		if (fvr != 0) {
			if (fvra < 1) {
				ctx.globalAlpha = fvra
			};
			if (fvr < 45) {
				fvra += .025;
				if (fvra > 1) {
					fvra = 1
				}
			};
			if (fvr > 261) {
				fvra -= .025;
				if (fvra < 0) {
					fvra = 0
				}
			};
			if (fvri == 1) {
				spt2(91, 0, 0)
			} else {
				spt2(92, 0, 0)
			};
			ctx.globalAlpha = 1;
			fvrc++;
			if (fvrc > 3) {
				fvri = -fvri;
				fvrc = 0
			};
			msp = 5;
			fvr++;
			if (fvr > 300) {
				fvr = 0;
				cmb = 0;
				if (slv == 9 && mes > 18) {
					rex = rmx + 18
				}
			}
		};
		if (fa_fi > 0) {
			var fa_fc = 0;
			var pi;
			for (pi in fa_f) {
				tg = fa_f[pi];
				if (tg.l == 1) {
					var ffi;
					switch (tg.fi) {
					case 0:
						var fanft = new Array(81, tg.ci);
						for (i = 0; i < 2; i++) {
							ffi = tg.pi * 2 * 3 + i * 3;
							ctx.globalAlpha = fani[0][ffi + 2];
							spt2(fanft[i], fani[0][ffi] + tg.x, fani[0][ffi + 1] + tg.y)
						};
						tg.pi++;
						if (tg.pi > 12) {
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 1:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani[1][ffi + 2];
						spt2(93, fani[1][ffi] + tg.x, fani[1][ffi + 1]);
						tg.pi++;
						if (tg.pi > 44) {
							uct = 999;
							spdr = tg.x;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 2:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani[2][ffi + 2];
						spt2(90, fani[2][ffi], fani[2][ffi + 1]);
						tg.pi++;
						if (tg.pi > 40 && fvr != 0) {
							tg.pi = 40
						};
						if (tg.pi > 48) {
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 3:
						ffi = (tg.pi | 0) * 3;
						ctx.globalAlpha = fani3[ffi + 2];
						spt2(79, fani3[ffi], nmy + 32);
						if (tg.pi > 10 && tg.pi < 20) {
							tg.pi += .1
						} else {
							tg.pi++
						};
						if (tg.pi > 30) {
							hsmn = 1;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 4:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani[1][ffi + 2];
						spt2(94, fani[1][ffi] + tg.x, fani[1][ffi + 1]);
						tg.pi++;
						if (tg.pi > 44) {
							if (tg.x < 100) {
								bnsc = 1
							} else {
								bnsc = 11
							};
							bnst = 1;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 5:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani[1][ffi + 2];
						spt2(95, fani[1][ffi] + tg.x, fani[1][ffi + 1]);
						tg.pi++;
						if (tg.pi > 44) {
							uct = 999;
							spdr = tg.x;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 6:
						for (i = 0; i < 3; i++) {
							ffi = tg.pi * 3 * 3 + i * 3;
							ctx.globalAlpha = fani4[ffi + 2];
							spt2(fanf4[i], fani4[ffi], fani4[ffi + 1])
						};
						tg.pi++;
						if (tg.pi > 63) {
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 7:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani5[ffi + 2];
						spt2(100, fani5[ffi], fani5[ffi + 1]);
						tg.pi++;
						if (tg.pi > 54) {
							spdr = tg.x;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 8:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani5[ffi + 2];
						spt2(99, fani5[ffi], fani5[ffi + 1]);
						tg.pi++;
						if (tg.pi > 54) {
							spdr = tg.x;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 9:
						for (i = 0; i < 3; i++) {
							ffi = tg.pi * 3 * 3 + i * 3;
							ctx.globalAlpha = fani6[ffi + 2];
							spt2(fanf6[i], fani6[ffi], fani6[ffi + 1])
						};
						tg.pi++;
						if (tg.pi > 63) {
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 10:
						ffi = tg.pi * 3;
						ctx.globalAlpha = fani5[ffi + 2];
						spt2(114, fani5[ffi], fani5[ffi + 1]);
						tg.pi++;
						if (tg.pi > 54) {
							spdr = tg.x;
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					case 11:
						ffi = tg.pi * 5;
						ctx.globalAlpha = fani7[ffi + 4];
						spt4(124, fani7[ffi], fani7[ffi + 1], fani7[ffi + 2], fani7[ffi + 3]);
						tg.pi++;
						if (tg.pi > 47) {
							tg.l = 0;
							delete fa_f[pi]
						};
						break;
					default:
						break
					};
					ctx.globalAlpha = 1;
					fa_fc++
				}
			};
			if (fa_fc == 0) {
				fa_f = {};
				fa_fi = 0
			}
		};
		gtm++;
		if (mes < -1 && ty[1] < 196) {
			dgt++
		} else {
			dgt = 0
		};
		if (mes < -1 && dgt > 80 && fvr == 0 && scr > 300 && ogm == 0) {
			bcv2.drawImage(ctx.canvas, 0, 0, 320, 568, 0, 0, 320, 568);
			ogm = 1;
			scr = (scr | 0);
			if (bstscr == 999999) {
				var ckdta = new Date();
				ckdta.setDate(ckdta.getDate() + 730);
				document.cookie = "rvs_3d_run=" + scr + "endcksv; expires=" + ckdta.toGMTString();
				bstscr = scr
			}
		}
	} else {
		ogm++;
		if (ogm < 31) {
			ctx.drawImage(bcv2.canvas, 0, 0, 320, 568, 0, 0, 320, 568);
			var gmalp = ogm / 30;
			if (gmalp > 1) {
				gmalp = 1
			};
			ctx.globalAlpha = gmalp;
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, 320, 568);
			ctx.globalAlpha = 1;
			spt2(126, bex[ef], bey[ef])
		} else if (ogm < 50) {
			ctx.globalAlpha = .5;
			var lxy = 108 - gmovf;
			var lsz = 100 + gmovf * 2;
			gmovf += gmovc;
			gmovc += 3;
			ctx.drawImage(img7, 735, 0, 100, 100, lxy, lxy, lsz, lsz)
		} else if (ogm < 60) {
			gmalp = (ogm - 50) / 30;
			if (gmalp > 1) {
				gmalp = 1
			};
			ctx.globalAlpha = gmalp;
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, 320, 568);
			ctx.globalAlpha = 1
		} else {
			if (gmovcl == 0) {
				//gasp.style.display = "block";
				gmovcl = 1
			};
			ctx.drawImage(img2, 0, 0, 320, 568, 0, 0, 320, 568);
			scs2(99, String(scr).length, scr);
			if (bstscr == scr) {
				spt2(150, 76, 103)
			};
			if (gtips == 1) {
				spt2(152, 79, 309)
			};
			if (gmsts > 1) {
				spt2(152, 188, 320);
				if (gmsts > 2) {
					spt2(152, 276, 320)
				}
			};
			if (tipon == 1) {};
			gmalp = 1 - (ogm - 60) / 30;
			if (gmalp < 0) {
				gmalp = 0;
				s = 2
			};
			ctx.globalAlpha = gmalp;
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, 320, 568);
			ctx.globalAlpha = 1
		}
	};
	if (ttlct < 750) {
		spt2(153, 272, 5)
	}

	if (31 <= ogm && hasEnd == false) {
        console.log('game has end');
        setTimeout(function() {
            window.P.showShare({
                score: scr,
                og: {
                    title: "Run fast, faster, or you will be eaten by the bear." + " I got " + scr + " points in this game,come on!"
                }
            })
        }, 1000)
        hasEnd = true;
    } else if (31 > ogm && hasEnd == true) {
        console.log('game restart')
        hasEnd = false;
    }
};

var hasEnd = false;

function iint(utx, uty, utt, us) {
	var ui = usi.shift();
	tx[ui] = utx;
	ty[ui] = uty;
	tt[ui] = utt;
	ts[ui] = us;
	ta[ui] = 1;
	tl[ui] = 1
}
