function dp_submitScore(vLevel,vScore){
	window.P.showShare({
		score: vScore,
		level: vLevel,
		og: {
			title: "Typical 2048 game, click to play." + " I got " + vScore + " points, " + vLevel + "level in this game, come on!"
		}
	})
}

var shareConfig = {
  title: "Typical 2048 game, click to play."
};