var adPush = function(e) {},
	Main = {};
btGame.makePublisher(Main), Main.width = 720, Main.height = 950, Main.floorLine = 820, Main.guideDistance = Main.width, Main.debug = !1, Main.minAngle = 5, Main.maxAngle = 60, Main.randomAngle = 2, Main.fallingTime = 1600, Main.speed = 620, Main.visibleDistance = 250, Main.maxScore = window.localStorage && +localStorage.penguinMaxScore || 0, Main.fps = 40;
var Resource;
!
function(e) {
	e.load = function() {
		if (e.queue != null) return;
		e.queue = new createjs.LoadQueue(!1), e.queue.addEventListener("progress", function(e) {
			btGame.gameLoading(e.loaded)
		}), e.queue.addEventListener("complete", function(e) {
			Main.log("完成", e)
		}), e.queue.addEventListener("error", function(e) {
			btGame.gameLoading(.1, e.text)
		}), e.queue.loadFile("static/img/start.png"), e.queue.loadFile("static/img/morebtn.png"), e.queue.loadFile("static/img/startbtn.png"), e.queue.loadFile("static/img/penguin.png"), e.queue.loadFile("static/img/bear.png"), e.queue.loadFile("static/img/hill.png"), e.queue.loadFile("static/img/guide.png"), e.queue.loadFile("static/img/background1.png"), e.queue.loadFile("static/img/background2.png"), e.queue.loadFile("static/img/flyend.png"), e.queue.loadFile("static/img/traces.png"), e.queue.loadFile("static/img/longtraces.png"), e.queue.loadFile("static/img/score.png"), e.queue.loadFile("static/img/fly.png"), e.queue.loadFile("static/img/end.png"), e.queue.loadFile("static/img/againbtn.png"), e.queue.loadFile("static/img/notifybtn.png")
	}, e.get = function(t) {
		return e.queue.getResult(t)
	}
}(Resource || (Resource = {})), Main.log = function() {
	Main.debug && console.log(arguments)
}, Main.shareTextMap = {
	0: {
		tip: "",
		title: ""
	},
	1: {
		tip: "",
		title: ""
	},
	2: {
		tip: "",
		title: ""
	},
	3: {
		tip: "",
		title: ""
	},
	4: {
		tip: "",
		title: ""
	},
	5: {
		tip: "",
		title: ""
	}
}, Main.getShareText = function(e) {
	var t = 0,
		n = 0;
	return e > 0 && (t = 1, n = Math.floor(Math.random() * 11 + 50)), e > 3e3 && (t = 2, n = Math.floor(Math.random() * 9 + 60)), e > 5e3 && (t = 3, n = Math.floor(Math.random() * 9 + 70)), e > 6e3 && (t = 4, n = Math.floor(Math.random() * 9 + 80)), e > 7e3 && (t = 5, n = Math.floor(Math.random() * 9 + 90)), Main.shareTextMap[t]
}, Main.startGame = function() {
	var e = new createjs.Container;
	e.addChild(new createjs.Bitmap(Resource.get("static/img/start.png")));
	var t = new createjs.Bitmap(Resource.get("static/img/startbtn.png"));
	t.setTransform(34, 580), t.cursor = "pointer", t.addEventListener("click", function() {
		createjs.Tween.get(e, {
			loop: !1
		}).to({
			alpha: 0
		}, 300).call(function() {
			Main.initGame()
		})
	}), e.addChild(t);
	var n = new createjs.Bitmap(Resource.get("static/img/morebtn.png"));
	n.setTransform(377, 580), n.cursor = "pointer", n.addEventListener("click", function() {
		clickMore()
	}), e.addChild(n), Main.stage.addChild(e)
}, Main.endGame = function(e) {
	Main.endContainer ? (Main.endContainer.removeAllEventListeners(), Main.endContainer.removeAllChildren()) : Main.endContainer = new createjs.Container;
	var t = Main.endContainer;
	t.alpha = 0, t.addChild(new createjs.Bitmap(Resource.get("static/img/end.png")));
	var n = new createjs.Text("Distance: " + e + " M", "bold 28pt Tahoma Helvetica Arial sans-serif", "#ffffff");
	n.textAlign = "center", n.x = Main.width / 2, n.y = 174, t.addChild(n);
	var r = n.clone(!0);
	r.text = "Best: " + Main.maxScore + " M", r.y = 248, t.addChild(r);
	var i = Main.getShareText(e),
		s = n.clone(!0);
	s.text = i.tip, s.font = "bold 24pt Tahoma Helvetica Arial sans-serif", s.textAlign = "center", s.y = 394, t.addChild(s);
	var o = new createjs.Bitmap(Resource.get("static/img/againbtn.png"));
	o.setTransform(35, 623), o.addEventListener("click", function() {
		adPush(!0), createjs.Tween.get(t, {
			loop: !1
		}).to({
			y: -Main.height,
			alpha: 0
		}, 500, createjs.Ease.quintInOut).call(function() {
			t.alpha = 1, t.removeAllEventListeners(), t.removeAllChildren(), Main.reset.replay()
		})
	}), t.addChild(o);
	var u = new createjs.Bitmap(Resource.get("static/img/notifybtn.png"));
	u.setTransform(376, 623), u.addEventListener("click", function() {
		dp_share()
	}), t.addChild(u);
	var a = new createjs.Shape;
	a.graphics.beginFill("#ffffff").drawRect(0, 0, Main.width, 60), a.alpha = .1, a.y = 870, a.addEventListener("click", function() {
		clickMore()
	}), t.addChild(a), Main.stage.addChild(t), t.y = -Main.height, createjs.Tween.get(t, {
		loop: !1
	}).to({
		y: 0,
		alpha: 1
	}, 500, createjs.Ease.quintInOut), dp_submitScore(e)
}, Main.initStage = function() {
	this.stage || (Main.stage = new createjs.Stage("canvas")), Main.stage.removeAllEventListeners(), Main.stage.removeAllChildren(), Main.stage.removeAllChildren(), Main.stage.removeAllEventListeners(), Main.stage.width = canvas.width = Main.width, Main.stage.height = canvas.height = Main.height, createjs.Ticker.addEventListener("tick", this.stage), Resource.load(), Resource.queue.addEventListener("complete", function() {
		Main.startGame()
	})
}, Main.initGame = function() {
	Main.initGame = function() {}, Main.stage.enableMouseOver(!0), Main.log("开始初始化游戏"), Main.log("初始化：游戏背景");
	var e = new createjs.Container;
	e.setBounds(0, 0, Main.width * 2, Main.height);
	var t = new createjs.Bitmap(Resource.get("static/img/background2.png"));
	e.addChild(t), t = new createjs.Bitmap(Resource.get("static/img/background2.png")), t.x = Main.width, e.addChild(t), t = new createjs.Bitmap(Resource.get("static/img/background1.png")), t.x = Main.width * 2, e.addChild(t), this.background = e, this.stage.addChild(e), this.reset.background(e), Main.log("初始化：北极熊");
	var n = new createjs.Bitmap(Resource.get("static/img/bear.png")),
		r = n.getBounds(),
		i = new createjs.SpriteSheet({
			framerate: 4,
			animations: {
				normal: [0, 0],
				prepare: [1, 2, !1, 1.5],
				shoot: {
					frames: [1, 3, 4, 5],
					next: !1,
					speed: 3
				},
				shootNull: {
					frames: [1, 3, 4, 0],
					next: !1,
					speed: 2
				}
			},
			images: [Resource.get("static/img/bear.png")],
			frames: {
				height: 360,
				width: 300,
				regX: 0,
				regY: 0,
				count: 6
			}
		}),
		s = new createjs.Sprite(i);
	this.bear = s, this.stage.addChild(s), this.reset.bear(), this.knockPoint = Math.ceil(s.y + r.height * .1);
	if (Main.debug) {
		Main.log("计算击打点:" + this.knockPoint);
		var o = new createjs.Shape;
		o.graphics.beginFill("#ff0000").drawRect(0, 0, 50, 10), o.x = this.width - 50, o.y = this.knockPoint, this.stage.addChild(o), o = null;
		var u = new createjs.Shape;
		u.graphics.beginFill("#ffff00").drawRect(0, 0, Main.width, 10), u.x = 0, u.y = this.floorLine, this.stage.addChild(u), u = null
	}
	n = r = i = s = null, Main.log("初始化: 分数");
	var a = new createjs.Container;
	a.setBounds(0, 0, 238, 56);
	if (this.debug) {
		var o = new createjs.Shape;
		o.graphics.beginFill("#fefefe").drawRect(0, 0, a.getBounds().width, a.getBounds().height), a.addChild(o)
	}
	var f = new createjs.Text("TOP:", "36px Arial Black", "#336600");
	a.addChild(f);
	var l = f.getMeasuredWidth(),
		c = new createjs.Text("", "36px Arial Black", "#FF0000");
	c.x = l, a.addChild(c), this.scoreTop = f, this.scoreText = c, this.score = a, this.stage.addChild(a), this.reset.score(), a = f = c = null, Main.log("初始化:路标");
	var h = new createjs.Bitmap(Resource.get("static/img/guide.png")),
		p = h.getBounds().height,
		d = h.getBounds().width,
		v = new createjs.Container;
	v.setBounds(h.getBounds()), v.addChild(h), v.y = this.floorLine - p - 20;
	var m = new createjs.Text("", "28px Arial Black", "#2B5580");
	m.y = 40, v.addChild(m), this.guideWidth = d, this.guideHeight = p, this.guideText = m, this.guide = v, this.stage.addChild(v), this.reset.guide("100M"), Main.log("初始化：企鹅");
	var g = new createjs.Bitmap(Resource.get("static/img/penguin.png")),
		y = g.getBounds(),
		b = new createjs.SpriteSheet({
			framerate: 5,
			animations: {
				normal: {
					frames: [0, 1, 0, 1, 2],
					next: !1
				},
				nod: [2, 2, "normal"],
				jump: {
					frames: [2, 3, 4, 5],
					speed: 2,
					next: !1
				}
			},
			images: [Resource.get("static/img/penguin.png")],
			frames: {
				width: 180,
				height: 170,
				count: 6
			}
		}),
		w = new createjs.Sprite(b);
	this.penguin = w, this.penguinHeight = y.height, this.stage.addChild(w), this.reset.penguin(), e = bound = null, Main.log("初始化:游戏结束的企鹅");
	var E = {
		images: [Resource.get("static/img/flyend.png")],
		frames: {
			width: 180,
			height: 170,
			count: 2
		},
		animations: {
			slide: [0],
			down: [1]
		}
	};
	Main.gameOverPenguinSS = new createjs.SpriteSheet(E), E = null, Main.log("初始化:游戏结束的分数牌"), Main.gameOverScore = new createjs.Container, Main.gameOverScoreBg = new createjs.Bitmap(Resource.get("static/img/score.png")), Main.gameOverScore.addChild(Main.gameOverScoreBg), Main.gameOverScore.regY = Main.gameOverScoreBg.getBounds().height, Main.gameOverScoreText = new createjs.Text("0", "26px Arial Black", "#336600"), Main.gameOverScoreText.x = 10, Main.gameOverScoreText.y = 33, Main.gameOverScore.addChild(Main.gameOverScoreText), Main.stage.addChild(Main.gameOverScore), Main.gameOverScore.x = 0, Main.gameOverScore.y = 0, Main.gameOverScore.cursor = "pointer", Main.reset.gameOverScore(1), setTimeout(function() {
		Main.initEvent()
	}, 200)
}, Main.gameOverSocreHd = {
	over: function(e) {
		console.log(this.hover)
	},
	out: function(e) {
		console.log(this.hover)
	}
}, Main.penguinOffsetX = 260, Main.reset = {
	replay: function() {
		this.guide("500M"), this.score(), this.penguin(), this.bear(), this.background(), this.endPenguin(!1), this.gameOverScore("0"), Main.penguinAnimation = null, Main.isPlaying = !1, Main.isQuiver = !1, Main.guideMoveLength = 0, Main.guideMoveIndex = 1, Main.fire("replay")
	},
	guide: function(e) {
		Main.guide.x = -Main.guideWidth;
		var t = Main.guideText;
		e && (t.text = e, t.x = (Main.guideWidth - t.getMeasuredWidth()) / 2)
	},
	score: function(e) {
		var t = Main.scoreText,
			n = Main.scoreTop.getMeasuredWidth(),
			r = Main.score.getBounds().width - n;
		t.text = e || Main.maxScore + "M";
		var i = t.getMeasuredWidth();
		i >= r ? (t.x = n, t.text = t.text.slice(0, -1)) : t.x = n + (r - i) / 2, Main.score.x = 68, Main.score.y = 681
	},
	gameOverScore: function(e) {
		var t = Main.gameOverScoreText,
			n = 11,
			r = 100;
		if (e) {
			t.text = e;
			var i = t.getMeasuredWidth();
			i >= r ? t.x = n : t.x = (r - i) / 2 + n
		}
		Main.gameOverScore.y = -Main.gameOverScore.getBounds().height
	},
	penguin: function() {
		var e = Main.penguin,
			t = Main.penguin.getBounds();
		e.x = Main.width - Main.penguinOffsetX, e.y = 0, e.alpha = 1, e.rotation = 0, e.gotoAndPlay("normal")
	},
	bear: function() {
		var e = Main.bear,
			t = e.getBounds();
		e.x = Main.width - 330, e.y = 500, e.gotoAndPlay("normal")
	},
	background: function() {
		var e = Main.background;
		Main.stopMoveStage(), e.regX = 2 * Main.width
	},
	endPenguin: function(e) {
		e ? (Main.gameOverPenguin || (Main.gameOverPenguin = new createjs.Sprite(Main.gameOverPenguinSS), Main.stage.addChild(Main.gameOverPenguin)), Main.penguin.alpha = 0, Main.gameOverPenguin.alpha = 1, Main.gameOverPenguin.gotoAndPlay("down"), Main.gameOverPenguin.x = Main.penguin.x, Main.gameOverPenguin.y = Main.penguin.y) : (Main.penguin.alpha = 1, Main.gameOverPenguin && (Main.gameOverPenguin.alpha = 0))
	}
}, Main.initEvent = function() {
	Main.clickTime = 0, this.stage.removeEventListener("stagemousedown", this.eventHandler.stageClick), this.stage.addEventListener("stagemousedown", this.eventHandler.stageClick)
};
var eventCD = !1;
Main.eventHandler = {
	stageClick: function(e) {
		eventCD || (Main.fire("stageClick", Main.clickTime), eventCD = !0, setTimeout(function() {
			eventCD = !1
		}, 500))
	}
}, Main.penguinAnimation = null, Main.isPlaying = !1, Main.isQuiver = !1, Main.on("stageClick", function(e) {
	if (!Main.isPlaying) {
		Main.isPlaying = !0, this.reset.penguin(), this.reset.bear(), this.reset.background(), this.reset.score(), Main.log("白熊挥棒了！"), Main.bear.gotoAndPlay("prepare"), Main.log("企鹅跳下来吧~！"), Main.penguin.gotoAndPlay("jump");
		var t = Main.floorLine - Main.penguinHeight + 70;
		Main.penguinAnimation = createjs.Tween.get(this.penguin, {
			loop: !1
		}), Main.penguinAnimation.to({
			y: t
		}, Main.fallingTime, createjs.Ease.quadIn).call(function() {
			Main.fire("gameOver", 0), Main.log("掉下来了")
		}), Main.bearListenerShoot()
	} else if (!Main.penguinAnimation._paused) {
		var n = this.penguin.y - this.penguin.regY,
			r = Math.abs(this.knockPoint - n);
		Main.isQuiver = r <= this.penguinHeight;
		if (Main.isQuiver) {
			r = Math.ceil(r / this.penguinHeight * 100);
			var i = Main.calculateAngle(r);
			Main.log("击中角度:" + i), Main.fire("knockPenguin", i), Main.bearRemoveListenerShoot()
		} else Main.log("你木有击中！！");
		this.bear.gotoAndPlay("shoot")
	}
}), Main.bearListenerShoot = function() {
	this.bearRemoveListenerShoot(), this.bear.addEventListener("animationend", Main.bearShoot)
}, Main.bearRemoveListenerShoot = function() {
	this.bear.removeEventListener("animationend", Main.bearShoot)
}, Main.bearShoot = function() {
	!Main.isQuiver && Main.bear.currentAnimation == "shoot" && Main.bear.gotoAndPlay("prepare")
}, Main.on("knockPenguin", function(e, t) {
	Main.penguinAnimation.setPaused(!0), Main.flyLine(t)
}), Main.on("moveStage", function(e, t, n) {
	Main.moveStage(t, n)
}), Main._moveStage = function(e, t) {
	Main.moveStage = Main.moveStage2, Main.moveStage(e, t)
}, Main.moveStage = Main._moveStage, Main.stopMoveStage = function() {
	Main.moveStage = Main._moveStage
}, Main.moveStage2 = function(e, t) {
	this.background.regX > Main.width ? (this.bear.x += e, this.score.x += e, this.background.regX -= e, Main.moveGuide(e, t)) : (Main.moveStage = Main.moveStage3, Main.moveStage3(e, t))
}, Main.moveStage3 = function(e, t) {
	this.background.regX -= e, this.background.regX <= 0 && (this.background.regX += Main.width), Main.moveGuide(e, t)
}, Main.guideMoveLength = 0, Main.guideMoveIndex = 2, Main.moveGuide = function(e, t) {
	this.guide.x += e, this.guideMoveLength += e, this.guideMoveLength >= this.guideDistance + this.guideWidth && (++Main.guideMoveIndex, ++Main.guideMoveIndex, this.reset.guide(Main.guideMoveIndex * 450 + "M"), this.guideMoveLength = 0)
}, Main.getTotalDistance = function(e) {
	Main.log(e);
	var t = Main.guideMoveIndex * 450,
		n = this.guideDistance + this.guideWidth;
	return t += Math.round(Main.guide.x * n / Main.width) / 10, e > 0 ? t : 0
}, Main.calculateAngle = function(e) {
	Main.log("角度" + e);
	var t = Main.minAngle + Main.maxAngle * Math.sin(Math.PI * e / 200);
	return t += Math.round(Math.random() * Main.randomAngle) * (Math.random() < .5 ? -1 : 1), Math.ceil(t)
}, Main.gameOverScoreUtil = {
	dropDown: function(e, t) {
		Main.reset.gameOverScore(e), Main.gameOverScore.x = t, createjs.Tween.get(Main.gameOverScore, {
			loop: !1
		}).to({
			y: Main.floorLine - 60
		}, 800, createjs.Ease.quintIn)
	}
}, Main.on("gameOver", function(e, t, n) {
	Main.log("游戏结束:" + Main.getTotalDistance(t));
	var r = Main.getTotalDistance(t),
		i = r > Main.maxScore;
	Main.maxScore = Math.max(Main.maxScore, r);
	try {
		localStorage.penguinMaxScore = Main.maxScore
	} catch (s) {}
	t <= 0 && (Main.reset.endPenguin(!0), Main.bear.gotoAndPlay("shootNull")), setTimeout(function() {
		Main.endGame(r), adPush()
	}, 1200)
}), btGame.resizePlayArea($("#container"), Main.width, Main.height, "center", "center"), Main.initStage();