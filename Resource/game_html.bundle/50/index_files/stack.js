function firstinit() {
    document.body.addEventListener("touchmove", function(t) {
        t.preventDefault()
    }, !1), gamesplayed = getCookie("stack_gamesplayed"), "" == gamesplayed && (gamesplayed = 0), document.getElementById("gamesplayed").innerHTML = gamesplayed, theirbest = getCookie("stack_bestscore"), "" == theirbest && (theirbest = 0), document.getElementById("yourbest").innerHTML = theirbest, imgpreload(new Array( "images/11.png", "images/12.png", "images/13.png")), document.body.addEventListener("touchmove", function(t) {
        t.preventDefault()
    }, !1)
}
function init() {
    tmp = document.createElement("div"), tmp.style.position = "absolute", tmp.style.cursor = "pointer", "undefined" != typeof tmp.ontouchstart ? tmp.ontouchstart = handleclick : (tmp.onmousedown = handleclick, tmp.onclick = function() {
        return !1
    }), tmp.innerHTML = "放积木", tmp.className="btn btn_fjm", tmp.style.backgroundPosition = "center center", tmp.style.backgroundRepeat = "no-repeat", tmp.style.zIndex = "30",  $("st_outerarea").appendChild(tmp), tmp = document.createElement("div"), tmp.id = "st_scrollarea", /*tmp.style.backgroundImage = "url(images/bg1250.png)",*/ tmp.style.backgroundPosition = "bottom center", tmp.style.width = "320px", tmp.style.height = "480px", tmp.style.position = "absolute", $("st_outerarea").appendChild(tmp), tmp = document.createElement("div"), /*tmp.style.backgroundImage = "url(images/fuhatul.png)",*/ tmp.style.position = "absolute", tmp.style.width = "320px", tmp.style.height = "87px", tmp.style.marginTop = "228px", tmp.style.zIndex = "10", $("st_scrollarea").appendChild(tmp), tmp = document.createElement("div"), /*tmp.style.backgroundImage = "url(images/fuelol.png)",*/ tmp.style.position = "absolute", tmp.style.width = "311px", tmp.style.height = "39px", tmp.style.marginTop = "217px", tmp.style.zIndex = "20", $("st_scrollarea").appendChild(tmp), tmp2 = Math.floor(4 * Math.random()) + 1, tmp = document.createElement("div"), tmp.id = "stp_0", tmp.style.position = "absolute", tmp.style.height = logh + "px", tmp.style.marginTop = sah - logh + "px", tmp.style.marginLeft = stmargin[0] - extraleft[sttype[0]] + 7 + "px", $("st_scrollarea").appendChild(tmp), showaronk("stp_0", sttype[0], ststart[0], stwidth[0]), stack_init()
}
function stack_init() {
    sts > 10 && (paddingtarget = (sts - 10) * (logh - 4), sts > 15 && ($("st_scrollarea").removeChild($("stp_" + (sts - 16)))/* sts % 2 == 0 && sts > 16 && $("st_scrollarea").removeChild($("shd_" + (sts - 16)))*/)), sts++, stwidth[sts] = stwidth[sts - 1], ststart[sts] = (stwidth[sts] - 270) * Math.random(), stmargin[sts] = 0, stdir = 2 * Math.log(sts + 1), $("level").innerHTML = Math.floor(sts / 10) + 1, sttype[sts] = Math.floor(4 * Math.random()) + 1, Math.random() > .5 && (stdir *= -1, stmargin[sts] = saw - stwidth[sts]), tmp = document.createElement("div"), tmp.id = "stp_" + sts, tmp.style.position = "absolute", tmp.style.height = logh + "px", tmp.style.width = extraleft[sttype[sts]] + stwidth[sts] + extraright / 2 + "px", tmp.style.marginTop = sah - (sts + 2) * (logh - 4), tmp.style.marginLeft = stmargin[sts] - extraleft[sttype[sts]] + 7 + "px", $("st_scrollarea").appendChild(tmp), showaronk("stp_" + sts, sttype[sts], ststart[sts], stwidth[sts]), stinterval = setInterval("stack_dothemove()", 50)
}
function stack_dothemove() {
    paddingtarget > paddingnow + 1 && (paddingnow = (paddingtarget + paddingnow) / 2, $("st_scrollarea").style.top = paddingnow + "px"), stmargin[sts] += stdir, stmargin[sts] < 0 ? (stmargin[sts] = -stmargin[sts], stdir *= -1) : stmargin[sts] + stwidth[sts] > saw && (stmargin[sts] = saw - stwidth[sts] - stmargin[sts] - stwidth[sts] + saw, stdir *= -1), document.getElementById("stp_" + sts).style.marginLeft = stmargin[sts] - extraleft[sttype[sts]] + 7 + "px"
}
function handleclick() {
    return 1 == dnd ? !1 : (dnd = 1, clearTimeout(stinterval), stwo = stwidth[sts], hcf = "", stmargin[sts] < stmargin[sts - 1] && (stwidth[sts] -= stmargin[sts - 1] - stmargin[sts], stmargin[sts] = stmargin[sts - 1], hcf = "left"), stmargin[sts] + stwidth[sts] > stmargin[sts - 1] + stwidth[sts - 1] && (stwidth[sts] -= stmargin[sts] + stwidth[sts] - stmargin[sts - 1] - stwidth[sts - 1], hcf = "right"), stwidth[sts] <= 0 && (hcf = "all"), cutaronk("stp_" + sts, sttype[sts], ststart[sts], stwidth[sts], hcf), stwidth[sts] <= 0 && (stwidth[sts] = 0), sts % 2 == 0 && stwidth[sts] > 0 && addshadow(), bon = 1, Math.abs(stwidth[sts] - stwidth[sts - 1]) < 3 && stwidth[sts] > 0 && (bon *= 2, $("combo").innerHTML = parseInt($("combo").innerHTML) + 1, tmp = document.createElement("div"), tmp.innerHTML = '<div style="padding:5px"><b>干的漂亮!</b></div>', tmp.id = "box_perfect", tmp.style.zIndex = "10", tmp.style.position = "absolute", tmp.style.textAlign = "center", tmp.style.width = "150px", tmp.style.backgroundColor = "#333333", tmp.style.marginLeft = "85px", tmp3 = sah - (sts + 2) * (logh - 4) - 16, tmp.style.marginTop = tmp3 + "px", $("st_scrollarea").appendChild(tmp), tmp2 = new Array, tmp2[0] = "", tmp2[1] = "$('score_title').style.color='#ffffff'; $('box_perfect').style.marginTop='" + (tmp3 - 5) + "px';", tmp2[2] = "$('box_perfect').style.marginTop='" + (tmp3 - 10) + "px';", tmp2[3] = "$('box_perfect').style.marginTop='" + (tmp3 - 15) + "px';", tmp2[4] = "$('st_scrollarea').removeChild($('box_perfect')); $('score_title').style.color=''", ttt = Math.random(), stispace[ttt] = tmp2, setTI(ttt, 100)), stscore += bon, $("score").innerHTML = stscore, void(stscore > theirbest && ($("score").style.color = "#ff0000")))
}
function addshadow() {
    return;
    tmp = document.createElement("img"), tmp.src = "images/dropshadow.png", tmp.id = "shd_" + sts, tmp.style.zIndex = "15", tmp.style.position = "absolute", tmp.style.width = extraleft[sttype[sts]] + stwidth[sts] + extraright / 2 + "px", tmp.style.height = "30px", tmp.style.marginLeft = stmargin[sts] - extraleft[sttype[sts]] + 7 + "px", tmp.style.marginTop = sah - (sts + 1) * (logh - 4) - 1 + "px", $("st_scrollarea").appendChild(tmp);
}
function cutaronk(t, e, s, a, n) {
    var s12 = document.getElementById(t).getElementsByTagName("div")[0].getElementsByTagName("div")[0];
    croriw = parseInt(s12.style.width), "right" == n ? (s12.style.width = a -4 + "px", document.getElementById(t).getElementsByTagName("div")[0].getElementsByTagName("img")[0].style.marginLeft = extraleft[e] + a - extraright / 2 + "px", showaronk(t, e, s - a, croriw - a), document.getElementById(t).childNodes[1].style.marginLeft = a + "px", document.getElementById(t).childNodes[1].style.zIndex = "12") : "left" == n && (s12.style.width = a + "px",  s12.style.marginLeft = extraleft[e] + croriw - a + "px", s12.style.backgroundPosition = s + a - croriw + "px", document.getElementById(t).getElementsByTagName("div")[0].getElementsByTagName("img")[1].style.marginLeft = croriw - a + "px", showaronk(t, e, s, croriw - a), document.getElementById(t).childNodes[1].style.zIndex = sts % 2 == 1 ? 14 : 16), "" != n ? (tmp = new Array, "left" == n || "right" == n ? (tmp[0] = "$('" + t + "').style.marginTop='" + (sah - (sts + 1) * (logh - 4)) + "px';document.getElementById('" + t + "').childNodes[1].style.marginTop='2px';  document.getElementById('" + t + "').childNodes[0].style.zIndex=16;", tmp[1] = "$('" + t + "').childNodes[1].style.opacity='.75'; $('" + t + "').childNodes[1].style.marginTop='7px';", tmp[2] = "$('" + t + "').childNodes[1].style.opacity='.5';$('" + t + "').childNodes[1].style.marginTop='12px';", tmp[3] = "$('" + t + "').childNodes[1].style.opacity='.25';$('" + t + "').childNodes[1].style.marginTop='17px';", tmp[4] = "$('" + t + "').removeChild(document.getElementById('" + t + "').childNodes[1]);") : "all" == n && (tmp[0] = "$('" + t + "').childNodes[0].style.marginTop='2px';", tmp[1] = "$('" + t + "').childNodes[0].style.opacity='.75'; $('" + t + "').childNodes[0].style.marginTop='7px';", tmp[2] = "$('" + t + "').childNodes[0].style.opacity='.5'; $('" + t + "').childNodes[0].style.marginTop='12px';", tmp[3] = "$('" + t + "').childNodes[0].style.opacity='.25'; $('" + t + "').childNodes[0].style.marginTop='17px';", tmp[4] = "$('" + t + "').removeChild(document.getElementById('" + t + "').childNodes[0]);"), tmp[4] += stwidth[sts] > 0 ? "stack_init(); dnd=0;" : "gameover();", ttt = Math.random(), stispace[ttt] = tmp, setTI(ttt, 50)) : (document.getElementById(t).style.marginTop = sah - (sts + 1) * (logh - 4) + "px", document.getElementById(t).childNodes[0].style.zIndex = sts % 2 ? 13 : 16, stack_init())
}
function showaronk(t, e, s, a) {
    srt = "images/" + 1, tmp = document.createElement("div"), tmp.style.position = "absolute", tmp.style.width = extraleft[e] + a + extraright / 2 + "px", tmp.style.height = logh + "px", tmp.style.zIndex = 15, tmp2 = document.createElement("div"), tmp2.style.position = "absolute", tmp2.style.width = a - 5 + "px", tmp2.style.height = logh + "px", tmp2.style.marginLeft = extraleft[e] +4+ "px", tmp2.style.backgroundImage = "url(" + srt + "2.png)", tmp2.style.backgroundPosition = s + "px 0", tmp.appendChild(tmp2), tmp2 = document.createElement("img"), tmp2.src = srt + "3.png", tmp2.style.marginLeft = extraleft[e] + a - extraright / 2, tmp2.style.position = "absolute", tmp.appendChild(tmp2), tmp2 = document.createElement("img"), tmp2.src = srt + "1.png", tmp2.style.position = "absolute", tmp.appendChild(tmp2), $(t).appendChild(tmp)
}
function gameover() {
    return gameisover = 1, gamesplayed++, setCookie("stack_gamesplayed", gamesplayed), document.getElementById("gamesplayed").innerHTML = gamesplayed, stscore > theirbest ? (setCookie("stack_bestscore", stscore), document.getElementById("yourbest").innerHTML = stscore, theirbest = stscore, ialert("<h1>游戏结束: " + stscore + "分</h1>厉害，你又破纪录了", "restartgame();", "again")) : ialert("<h1>得分: " + stscore + "</h1>竟然堆出了" + stscore + "分，快告诉你的小伙伴们吧！", "restartgame();", "again"), dp_submitScore(stscore), !1
}
function restartgame() {
    clearInterval(stinterval), gameisover = 0, stwidth = new Array, stmargin = new Array, sttype = new Array, ststart = new Array, stscore = 0, sts = 0, stwidth[0] = 260, ststart[0] = (stwidth[0] - 270) * Math.random(), stmargin[0] = (saw - stwidth[0]) / 2, sttype[0] = Math.floor(4 * Math.random()) + 1, paddingtarget = 0, paddingnow = 0, dnd = 0, $("combo").innerHTML = 0, $("level").innerHTML = 1, $("score").innerHTML = stscore, $("score").style.color = "#ffffff", $("st_outerarea").innerHTML = "", init()
}
function pausegame() {
    clearTimeout(stinterval)
}
function resumegame() {
    0 == gameisover && (stinterval = setInterval("stack_dothemove()", 50))
}
var logh = 20;
extraleft = new Array, extraleft[1] = 6, extraleft[2] = 4, extraleft[3] = 5, extraleft[4] = 5, extraright = 10;
var saw = 308,
    sah = 300,
    stdir, stwidth = new Array,
    stmargin = new Array,
    sttype = new Array,
    ststart = new Array,
    stscore = 0;
sts = 0, stwidth[0] = 260, ststart[0] = (stwidth[0] - 270) * Math.random(), stmargin[0] = (saw - stwidth[0]) / 2, sttype[0] = Math.floor(4 * Math.random()) + 1;
var stinterval, paddingtarget = 0,
    paddingnow = 0,
    gameisover = 1,
    dnd = 0;
