function imgpreload(e) {
    myims = new Array/*e.push("images/b_yes.png"), e.push("images/b_no.png"), e.push("images/b_okay.png")*/;
    for (i in e) myims[i] = new Image, myims[i].src = e[i]
}
function menuswitch(e) {
    var t = e.href.split("#")[1];
    if ("game" == t && "game" == ibox_active) return pausegame(), /*iconfirm("<h1>新游戏</h1>确定要<br />重新开始游戏吗?", "restartgame();"),*/ !1;
    "game" == ibox_active && "game" != t && pausegame(), mse = "", "game" != ibox_active && "game" == t && (mse = "resumegame();"), tmp = new Array("game", "highscore", "about"), tmp2 = new Array, tmp2.game = 0, tmp2.highscore = "-72px", tmp2.about = "-182px";
    for (i in tmp) document.getElementById("button_" + tmp[i]).style.backgroundPosition = tmp2[tmp[i]] + " " + (tmp[i] == t ? 0 : "-41px");
    if (t == ibox_active) return !1;
    ibox_start = ibox_targets[ibox_active], ibox_active = t;
    for (i in ibox_targets) document.getElementById("button_" + i).className = i == t ? "active" : "";
    for (e.className = "active", tmp2 = new Array, tmp = ibox_start, i = 0; 5 >= i; i++) tmp = (tmp + ibox_targets[t]) / 2, tmp2.push("document.getElementById('container_scroller').style.marginLeft='" + tmp + "px';");
    return tmp2.push("document.getElementById('container_scroller').style.marginLeft='" + ibox_targets[t] + "px';"), "" != mse && tmp2.push(mse), ttt = Math.random(), stispace[ttt] = tmp2, setTI(ttt, 50), !1
}
function idismiss() {
    document.getElementById("alertbox").style.display = "none", resumegame()
}
function ialert(e, t, i) {
    document.getElementById("alertbox_content").innerHTML = e + '<a class="btn btn_start" href="#" onclick="idismiss();eval(\'' + t + "'); return false;\" ontouchstart=\"idismiss();eval('" + t + '\'); return false;">Start</a>', document.getElementById("alertbox").style.display = "block"
}
function iconfirm(e, t) {
    return;
   /* document.getElementById("alertbox_content").innerHTML = e + '<br style="clear:both" /><br /><a href="#" ontouchstart="idismiss();eval(\'' + t + "'); return false;\" onclick=\"idismiss();eval('" + t + '\'); return false;"><img src="images/b_yes.png" alt="Yes" /></a><a href="#" ontouchstart="idismiss(); return false;" onclick="idismiss(); return false;"><img src="images/b_no.png" alt="No" /></a>', document.getElementById("alertbox").style.display = "block"*/
}
function getCookie(e) {
    return localStorage[e]
}
function setCookie(e, t) {
    localStorage[e] = t
}
function setTI(todos, interval) {
    return 0 == stispace[todos].length ? (delete stispace[todos], !1) : (eval(stispace[todos].shift()), void setTimeout("setTI(" + todos + "," + interval + ")", interval))
}
function $(e) {
    return document.getElementById(e)
}
var ibox_active = "game",
    ibox_cur = 0,
    ibox_targets = Array(),
    ibox_scroll_timer;
ibox_targets.game = 0, ibox_targets.highscore = -320, ibox_targets.about = -640;
var now = new Date,
    expire = new Date;
expire.setTime(now.getTime() + 7776e6);
var stispace = new Array,
    myims, gamesplayed, theirbest;
