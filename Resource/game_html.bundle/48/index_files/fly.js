Main.flyLine = function(e) {
	function t() {
		Main.penguin.alpha = 0, x = c(e);
		var t = {
			images: ["static/img/fly.png"],
			frames: {
				width: 180,
				height: 170
			},
			animations: {
				fly: [0, 2]
			},
			framerate: 6
		},
			n = new createjs.SpriteSheet(t);
		v = new createjs.Sprite(n, "fly"), v.regX = 105, v.regY = 105, m.addChild(v), l()
	}

	function n() {
		T += 1 / g, i(S, x)
	}

	function r(e, t) {
		Main.fire("moveStage", e, t)
	}

	function i(t, n) {
		var i = t * Math.cos(n) * T,
			c = t * Math.sin(n) * T - .5 * N * h(T) + O,
			p = t * Math.sin(n) - N * T,
			d = t * Math.cos(n),
			m = -N / h(t) / h(Math.cos(n)) * i + Math.sin(n) / Math.cos(n);
		v.rotation = m * e;
		var _ = d * 1 / g;
		i + y > L ? r(_, i + y) : v.x = w - C - (i + y), v.y = E - k - c;
		if (c <= 0 && m < 0) {
			T = 0, y += i, b = 0, S = t * 2.2 / 3, x = n * 2.2 / 3, A++, Main.log(A), f(), O = 0, Main.log(v.rotation);
			if (Math.abs(v.rotation) >= 46 && A == 1) {
				u(v.x, v.y, "down"), f(), a(i + y);
				return
			}
			if (A == 3) {
				f();
				var D = Math.cos(n) * 800;
				s(i, _, D)
			} else M = createjs.Tween.get(v, {
				loop: !1
			}).to({
				rotation: 0
			}, 50, createjs.Ease.bounceOut).call(function() {
				l(), createjs.Tween.removeTweens(M)
			}), o(_)
		}
	}

	function s(e, t, n) {
		function i() {
			_.x += t, r(t, e + y + 452)
		}
		_ = new createjs.Bitmap(Resource.get("static/img/longtraces.png")), m.addChild(_), _.width = 452, _.height = 14, _.regX = 452, _.regY = -17, _.x = v.x, _.y = v.y, createjs.Ticker.addEventListener("tick", i), setTimeout(function() {
			u(v.x, v.y, "slide"), createjs.Ticker.removeEventListener("tick", i), a(e + y + 452)
		}, n);
		var s = new createjs.Shape;
		s.graphics.setStrokeStyle(5, "round", "round"), s.graphics.beginFill("#FF0000").drawRect(0, 0, 460, 40), s.graphics.endStroke(), s.x = 200, s.y = 790, _.mask = s
	}

	function o(e) {
		function t() {
			r.x += e, n += e, n > w * 2 / 3 && (Main.log("回收痕迹"), createjs.Ticker.removeEventListener("tick", t), m.removeChild(r))
		}
		var n = 0,
			r = new createjs.Bitmap(Resource.get("static/img/traces.png"));
		m.addChild(r), r.width = 145, r.height = 45, r.regX = 92, r.regY = -18, r.x = v.x, r.y = v.y, createjs.Ticker.removeEventListener("tick", t), createjs.Ticker.addEventListener("tick", t)
	}

	function u(e, t, n) {
		Main.stage.removeChild(v);
		var r = Main.gameOverPenguinSS;
		v = new createjs.Sprite(r), Main.stage.addChild(v), v.gotoAndPlay(n), v.x = e - 120, v.y = t - 112
	}

	function a(e) {
		Main.fire("gameOver", e, v.x)
	}

	function f() {
		createjs.Ticker.removeEventListener("tick", n)
	}

	function l() {
		f(), n(), createjs.Ticker.addEventListener("tick", n)
	}

	function c(e) {
		return Math.PI / 180 * e
	}

	function h(e) {
		return e * e
	}
	var p = 7,
		d = 100,
		v, m = Main.stage,
		g = Main.fps,
		y = 0,
		b = 0,
		w = Main.width,
		E = Main.height,
		S = Main.speed * (Math.random() * .2 + .8) * p,
		x, T = 0,
		N = 9.8 * d,
		C = Main.penguinOffsetX,
		k = Main.height - Main.floorLine + 32,
		L = Main.visibleDistance,
		A = 0,
		O = Main.floorLine - Main.penguin.y - Main.penguinHeight / 2,
		M, _;
	Main.on("replay", function() {
		_ && (Main.log("longTracerDisp"), m.removeChild(_)), m.removeChild(v), v = null, f()
	}), t(e)
};