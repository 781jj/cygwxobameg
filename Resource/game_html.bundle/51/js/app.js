var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight - 85;
var s02 = Math.round(screenWidth * .02);
var s03 = Math.round(screenWidth * .03);
var s05 = Math.round(screenWidth * .05);
var s10 = Math.round(screenWidth * .08);
var s15 = Math.round(screenWidth * .15);
var s50 = Math.round(screenWidth * .5);
var s70 = Math.round(screenWidth * .8);
var s90 = Math.round(screenWidth * .9);
var h70 = Math.round(screenHeight * .9);
var h30 = Math.round(screenHeight * .35);
var canvas, stage, btn, txt, help, btnStartGame;
var round, scoreAll, roundMsg, scoreMsg, lineWarning, ball, em, bigX, bigY, tTime, shot, maxScore, warning, gameRunning;
var oneShot, tenLine, sixLine, threeLine, zeroLine, temp, oneShotScore, warningMsg, miss;
var resultScore, resultMax, hisScore, hisMax, share;
var startPx = s50;
var startPy = screenHeight - s02;
var scores = [];
var clickcount=0;
var checkcount=1;
if(navigator.userAgent.indexOf('Android')>1) checkcount=2;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    optimizeForTouchAndScreens();
    homeScreen()
};
function optimizeForTouchAndScreens() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage)
    }
};
function homeScreen() {
    help = new createjs.Bitmap('./js/help.png');
    help.regX = 320;
    help.regY = 372;
    help.x = s50;
    help.y = h70 / 2.2;
    help.scaleX = s90 / 640;
    help.scaleY = s90 / 640;
    stage.addChild(help);
    btnStartGame = new createjs.Container();
    stage.addChild(btnStartGame);
    btn = new createjs.Shape();
    btn.graphics.beginStroke('#fff').setStrokeStyle(3).beginFill('#66f').drawRect(0, 0, s70, s15);
    btn.regX = s70 / 2;
    btn.regY = s15 / 2;
    btn.x = s50;
    btn.y = h70;
    btnStartGame.addChild(btn);
    txt = new createjs.Text("Start", s10 + "px Arial", "#fff");
    txt.textAlign = 'center';
    txt.textBaseline = "middle";
    txt.x = s50;
    txt.y = h70;
    btnStartGame.addChild(txt);
    btnStartGame.addEventListener("click", initGame);
    gameRunning = false;
    startGame();
    clickcount=0;
};
function initGame(e) {
    btnStartGame.removeEventListener("click", initGame);
    stage.removeAllChildren();
    round = 0;
    scoreAll = 0;
    maxScore = 0;
    scores = [];
    createjs.Ticker.setPaused(false);
    newGame();
    clickcount=0;
};
function startGame() {
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick",
    function(e) {
        if (!e.paused) {
            stage.update();
            if (gameRunning && warning && em.y > 0.7 * screenHeight) {
                warning = false;
                lineWarning.graphics.beginStroke("#ff0000").drawRect(0, 0, screenWidth, 1);
                lineWarning.alpha = 1
            }
        }
    })
};
function newGame() {
    // 发送给iphone设备记录游戏次数
    
    window.location='gamebox://gamestart?gamenumber=51';  

    roundMsg = new createjs.Text(" " + round + "/10 ", s05 + "px Arial", "#ffffff");
    roundMsg.textAlign = 'left';
    roundMsg.x = s03;
    roundMsg.y = s03;
    stage.addChild(roundMsg);
    scoreMsg = new createjs.Text("score: " + scoreAll + ".0", s05 + "px Arial", "#ffffff");
    scoreMsg.textAlign = 'right';
    scoreMsg.x = screenWidth - s03;
    scoreMsg.y = s03;
    stage.addChild(scoreMsg);
    newShot()
};
function newShot() {
    round++;
    roundMsg.text = " " + round + "/10 ";
    shot = false;
    warning = true;
    miss = false;
    lineWarning = new createjs.Shape();
    lineWarning.graphics.beginStroke("#ffff00").drawRect(0, 0, screenWidth, 1);
    lineWarning.alpha = .5;
    lineWarning.x = 0;
    lineWarning.y = 0.7 * screenHeight;
    stage.addChild(lineWarning);
    buildBall();
    buildem();
    stage.addEventListener("stagemousedown", moveBall)
};
function buildBall() {
    ball = new createjs.Shape();
    ball.graphics.beginFill('#FFFFFF').drawCircle(0, 0, s02);
    ball.graphics.endFill();
    ball.x = startPx;
    ball.y = startPy;
    stage.addChild(ball)
};
function buildem() {
    var emX = s02 + Math.random() * (screenWidth - s02 * 2);
    var emY = -s10 - Math.random() * s15;
    var emDx = s02 + Math.random() * (screenWidth - s02 * 2);
    var tt = 3000 + Math.random() * 2000;
    em = new createjs.Shape();
    em.graphics.beginFill('#f99').drawCircle(0, 0, s02);
    em.x = emX;
    em.y = emY;
    stage.addChild(em);
    gameRunning = true;
    createjs.Tween.get(em).wait(500).to({
        x: emDx,
        y: screenHeight + s10
    },
    tt).call(missShot, [round])
};
function missShot(rd) {
    if (rd == round && !shot) {
        stage.removeEventListener("stagemousedown", moveBall);
        miss = true;
        shot = true;
        bigX = startPx;
        bigY = startPy;
        bigBall()
    }
};
function moveBall(e) {
	clickcount++;
	if(clickcount<checkcount) return;
	
    stage.removeEventListener("stagemousedown", moveBall);
    shot = true;
    bigX = e.stageX;
    bigY = e.stageY;
    tTime = 2 * Math.round(Math.sqrt((bigX - startPx) * (bigX - startPx) + (bigY - startPy) * (bigY - startPy)));
    createjs.Tween.get(ball).to({
        x: bigX,
        y: bigY
    },
    tTime).call(bigBall)
};
function bigBall() {
    gameRunning = false;
    var xx = bigX - em.x;
    var yy = bigY - em.y;
    var score = Math.floor(110 - 10 * (Math.sqrt(xx * xx + yy * yy)) / s02);
    if (em.y > 0.7 * screenHeight) {
        score = Math.round(score / 2)
    };
    if (score <= 0 || miss) {
        score = 0
    };
    if (score > maxScore) {
        maxScore = score
    };
    scoreAll += score;
    scoreMsg.text = "score: " + Math.floor(scoreAll / 10) + "." + scoreAll % 10;
    stage.removeChild(ball);
    oneShot = new createjs.Container();
    stage.addChild(oneShot);
    ball = new createjs.Shape();
    ball.graphics.beginFill('#6666ff').drawCircle(0, 0, s02);
    ball.graphics.endFill();
    ball.x = bigX;
    ball.y = bigY;
    ball.alpha = 0;
    oneShot.addChildAt(ball, 0);
    em.alpha = 0;
    tenLine = new createjs.Shape();
    tenLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02);
    tenLine.x = bigX;
    tenLine.y = bigY;
    oneShot.addChild(tenLine);
    sixLine = new createjs.Shape();
    sixLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02 * 4);
    sixLine.x = bigX;
    sixLine.y = bigY;
    oneShot.addChild(sixLine);
    threeLine = new createjs.Shape();
    threeLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02 * 7);
    threeLine.x = bigX;
    threeLine.y = bigY;
    oneShot.addChild(threeLine);
    temp = new createjs.Shape();
    temp.graphics.beginFill("#ffff00").drawCircle(0, 0, s02);
    temp.x = em.x;
    temp.y = em.y;
    stage.removeChild(em);
    temp.alpha = 0;
    stage.addChild(temp);
    oneShotScore = new createjs.Text(Math.floor(score / 10) + "." + score % 10, s10 + "px Arial", "#ff6");
    oneShotScore.textAlign = 'center';
    oneShotScore.textBaseline = 'middle';
    oneShotScore.x = startPx;
    oneShotScore.y = s15;
    if (warning == false) {
        warningMsg = new createjs.Text("(over the line halved score)", s05 + "px Arial", "#fff");
        warningMsg.textAlign = 'center';
        warningMsg.textBaseline = 'middle';
        warningMsg.x = startPx;
        warningMsg.y = s15 + s10;
        oneShot.addChild(warningMsg);
        if (miss) {
            oneShotScore.text = "miss";
            warningMsg.text = ""
        }
    };
    if (score > 0) {
        scores.push([xx, yy, warning, score])
    };
    createjs.Tween.get(ball).to({
        alpha: 1,
        scaleX: 10,
        scaleY: 10
    },
    50).call(function() {
        oneShot.addChild(oneShotScore);
        temp.alpha = 1;
        createjs.Tween.get(temp).wait(1000).to({
            alpha: 0
        },
        600);
        createjs.Tween.get(oneShot).wait(1000).to({
            alpha: 0
        },
        600).call(restartBall)
    })
};
function restartBall() {
    stage.removeChild(oneShot);
    stage.removeChild(temp);
    stage.removeChild(lineWarning);
    checkGame()
};
function checkGame() {
    if (round <= 9) {
        newShot();
        return
    };
    stage.removeAllChildren();
    hisScore = 0;
    hisMax = 0;
    if ($.cookie('score')) {
        hisScore = $.cookie('score')
    };
    if ($.cookie('max')) {
        hisMax = $.cookie('max')
    };
    if (scoreAll > hisScore) {
        hisScore = scoreAll;
        $.cookie('score', scoreAll, {
            expires: 30
        })
    };
    if (maxScore > hisMax) {
        hisMax = maxScore;
        $.cookie('max', maxScore, {
            expires: 30
        })
    };
    resultScore = new createjs.Text("Total: " + Math.floor(scoreAll / 10) + "." + scoreAll % 10 + " , Best: " + Math.floor(maxScore / 10) + "." + maxScore % 10, s10 + "px Arial", "#ff0");
    resultScore.textAlign = 'center';
    resultScore.x = screenWidth / 2;
    resultScore.y = 0.55 * screenHeight;
    stage.addChild(resultScore);
    resultMax = new createjs.Text("Record:  " + Math.floor(hisScore / 10) + "." + hisScore % 10 + " , " + Math.floor(hisMax / 10) + "." + hisMax % 10, s10 * .8 + "px Arial", "#fff");
    resultMax.textAlign = 'center';
    resultMax.x = screenWidth / 2;
    resultMax.y = 0.7 * screenHeight;
    stage.addChild(resultMax);
    //share = new createjs.Text("点击上方按钮分享 ↑↑", s05 * 1.2 + "px Arial", "#f00");
    //share.textAlign = 'right';
    //share.x = screenWidth - s05;
    //share.y = s03;
    stage.addChild(share);
    showAllScores();
    btnStartGame = new createjs.Container();
    stage.addChild(btnStartGame);
    btn = new createjs.Shape();
    btn.graphics.beginStroke('#fff').setStrokeStyle(3).beginFill('#66f').drawRect(0, 0, s70, s15);
    btn.regX = s70 / 2;
    btn.regY = s15 / 2;
    btn.x = s50;
    btn.y = h70;
    btnStartGame.addChild(btn);
    txt = new createjs.Text("Replay", s10 + "px Arial", "#fff");
    txt.textAlign = 'center';
    txt.textBaseline = "middle";
    txt.x = s50;
    txt.y = h70;
    btnStartGame.addChild(txt);
    btnStartGame.addEventListener("click", initGame);
    stage.update();
    createjs.Ticker.setPaused(true);
    updateSql();
    // window.wxData.desc = "我打出了" + Math.floor(scoreAll / 10) + "." + scoreAll % 10 + "环，并销魂命中一发" + Math.floor(maxScore / 10) + "." + maxScore % 10 + "环！快来挑战我吧！";
    // window.wxFriend.desc = "我打出了" + Math.floor(scoreAll / 10) + "." + scoreAll % 10 + "环，并销魂命中一发" + Math.floor(maxScore / 10) + "." + maxScore % 10 + "环！快来挑战我吧！"

    window.__score__ = {
        score: Math.floor(scoreAll / 10) + "." + scoreAll % 10 
    }


    // 发送给iPhone设备记录分数
    window.location='gamebox://gameover?score=' + __score__.score; 

    if ( window.Android ) {
        window.Android.showShare(JSON.stringify(__score__));
    } else {
        window.P.showShare(__score__);
        
        window.location='gamebox://gamestart?score=' + window.__score__;  
    }

     
};
function updateSql() {

};
function showAllScores() {
    var i, dd, nindex;
    oneShot = new createjs.Container();
    stage.addChild(oneShot);
    ball = new createjs.Shape();
    ball.graphics.beginFill('#6666ff').drawCircle(0, 0, s02 * 10);
    ball.graphics.endFill();
    ball.x = s50;
    ball.y = h30;
    oneShot.addChildAt(ball, 0);
    tenLine = new createjs.Shape();
    tenLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02);
    tenLine.x = s50;
    tenLine.y = h30;
    oneShot.addChild(tenLine);
    sixLine = new createjs.Shape();
    sixLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02 * 4);
    sixLine.x = s50;
    sixLine.y = h30;
    oneShot.addChild(sixLine);
    threeLine = new createjs.Shape();
    threeLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02 * 7);
    threeLine.x = s50;
    threeLine.y = h30;
    oneShot.addChild(threeLine);
    zeroLine = new createjs.Shape();
    zeroLine.graphics.beginStroke("#ffffff").setStrokeStyle(2).drawCircle(0, 0, s02 * 10);
    zeroLine.x = s50;
    zeroLine.y = h30;
    oneShot.addChild(zeroLine);
    for (i = 0; i < scores.length; i++) {
        dd = new createjs.Shape();
        if (scores[i][2] == true) {
            dd.graphics.beginStroke('#000').beginFill("#ffff00").drawCircle(0, 0, s02);
            dd.alpha = .7
        } else {
            dd.graphics.beginStroke('#000').beginFill("#ffffff").drawCircle(0, 0, s02);
            dd.alpha = .7
        };
        dd.x = s50 - scores[i][0];
        dd.y = h30 - scores[i][1];
        oneShot.addChild(dd);
        if (scores[i][3] == maxScore) {
            nindex = i;
            oneShot.removeChild(dd)
        }
    };
    if (scores.length > 0) {
        dd = new createjs.Shape();
        dd.graphics.beginStroke('#000').beginFill("#ff6600").drawCircle(0, 0, s02);
        dd.x = s50 - scores[nindex][0];
        dd.y = h30 - scores[nindex][1];
        oneShot.addChild(dd)
    }
}