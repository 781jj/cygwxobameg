function play68_init() {
	updateShare(0);
}

function goHome() {
	window.location.href = HOME_PATH;
}

function play68_submitScore(score) {
	updateShareScore(score);
}

function updateShare(bestScore) {
	imgUrl = '';
	lineLink = '';
	descContent = "";
	updateShareScore(bestScore);
	appid = '';
}

function updateShareScore(bestScore) {
		setTimeout(function(){
            window.__score__ = {
                score: bestScore
            }
            if ( window.Android ) {
                window.Android.showShare(JSON.stringify(__score__));
            } else {
                window.P.showShare(__score__);
            }
        },1000);
}