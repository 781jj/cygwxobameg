var btGame;~

function(e) {
	e.URL = {
		root: "http://www.17w67.com/",
		getMoreGame: function() {
			return e.dc("more"), "http://www.17w67.com/index.html?from=dxm"
		},
		getConcern: function() {
			return mebtnopenurl
		}
	}, e.getGameId = function() {
		var e = location.href;
		e = e.slice(e.indexOf("://") + 3);
		var t = e.split("/")[2];
		return t
	}, e.getGamePath = function() {
		var e = location.href;
		return e = e.slice(0, e.lastIndexOf("/") + 1), e
	}, e.dc = function(t) {
		window.Dc_SetButtonClickData && Dc_SetButtonClickData(e.getGameId(), t)
	}
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	function t(e, t) {
		this.elemId = e, this.hideClass = t || "bt-hide"
	}
	t.prototype = {
		beforeShow: function() {},
		show: function() {
			this.beforeShow();
			var e = this;
			setTimeout(function() {
				$("#" + e.elemId).removeClass(e.hideClass)
			}, 1)
		},
		hide: function() {
			$("#" + this.elemId).addClass(this.hideClass)
		}
	}, e.popupBox = t
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	e.proxy = function(e, t) {
		return function() {
			e.apply(t, arguments)
		}
	}
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	var t = function(e) {
			this.__publisher__ = e
		};
	t.prototype = {
		on: function(t, n) {
			this.__publisher__.on(t, e.proxy(n, this))
		},
		fire: function(e) {
			this.__publisher__.trigger(e, [].slice.call(arguments, 1))
		},
		off: function(t, n) {
			n ? this.__publisher__.off(t, e.proxy(n, this)) : this.__publisher__.off(t)
		}
	}, e.makePublisher = function(e) {
		var n = typeof e,
			r = new t($("<div></div>"));
		n == "function" ? (e.prototype.__publisher__ = r.__publisher__, $.extend(e.prototype, t.prototype)) : n == "object" && (e.__publisher__ = r.__publisher__, $.extend(e, t.prototype))
	}
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	function t() {
		return r || (r = document.body || document.getElementsByTagName("body")[0]), r
	}

	function n() {
		return document.createElement("div")
	}
	var r;
	e.getDomBody = t, e.getNewDiv = n
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	var t = "bt-lock-screen",
		n = function(t) {
			var n = e.getNewDiv();
			n.id = t;
			var r = e.getDomBody();
			return r.appendChild(n), $(n)
		},
		r = function(n) {
			e.popupBox.call(this, n || t)
		};
	r.__super__ = e.popupBox, r.prototype = $.extend({}, e.popupBox.prototype, {
		beforeShow: function() {
			var e = this.getElem();
			e.size() <= 0 && (e = n(this.elemId), e.addClass("bt-lock-screen bt-animation bt-hide"))
		},
		remove: function() {
			var e = this.getElem();
			e.size() > 0 && (e.addClass("bt-hide"), setTimeout(function() {
				e.remove()
			}, 400))
		},
		getElem: function() {
			return $("#" + this.elemId)
		}
	}), e.lockScreen = function(e) {
		return new r(e)
	}
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	var t = null,
		n = null,
		r = function(r, i) {
			r > 0 && !t && (t = $(btGame.getNewDiv()), t.addClass("bt-game-loading"), t.html('<table><tr><td><img class="bt-img" src="http://p0.qhimg.com/d/inn/c7719fd7/preloadImage.png" /><div class="bt-text"></div></td></tr></table>'), e.getDomBody().appendChild(t[0]), n = t.find(".bt-text"));
			if (t) if (i) n.html(i);
			else {
				var s = Math.round(r * 100);
				n.html("Loading:" + s + "%")
			}
			r >= 1 && (t && t.remove(), t = null)
		};
	e.gameLoading = r
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	function t(e, t) {
		var n = window.innerWidth,
			r = window.innerHeight,
			i;
		if (!(e <= n && t <= r)) if (e > n && t > r) {
			var s = n / e,
				o = r / t;
			s <= o ? (i = e, e = n, t = t * e / i) : (i = t, t = r, e = e * t / i)
		} else e > n ? (i = e, e = n, t = t * n / i) : t > r && (i = t, t = r, e = e * r / i);
		var u = (r - t) / 2,
			a = (n - e) / 2;
		return {
			width: e,
			height: t,
			top: u,
			left: a
		}
	}

	function n(e, n, r, i, s) {
		var o = t(n, r);
		e.css({
			width: o.width,
			height: o.height,
			top: i == "center" ? o.top : i == "left" ? 0 : i,
			left: s == "center" ? o.left : s == "left" ? 0 : s
		});
		switch (i) {
		case "top":
			e.css({
				top: 0
			});
			break;
		case "center":
			e.css({
				top: o.top
			});
			break;
		case "bottom":
			e.css({
				bottom: 0
			});
			break;
		default:
			e.css({
				top: i
			})
		}
		switch (s) {
		case "left":
			e.css({
				left: 0
			});
			break;
		case "center":
			e.css({
				left: o.left
			});
			break;
		case "right":
			e.css({
				right: 0
			});
			break;
		default:
			e.css({
				left: s
			})
		}
		e.trigger("resizePlayArea", [o])
	}

	function r(t, r, i, s, o) {
		e.checkHScreen(function() {
			setTimeout(function() {
				n(t, r, i, s, o)
			}, 500)
		})
	}
	e.resizePlayArea = r
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	function t(e, t) {
		t || (window.addEventListener("orientationchange", function() {
			n(e)
		}), window.addEventListener("resize", function() {
			n(e)
		})), n(e)
	}
	var n = function(e) {
			e && e(window.innerWidth > window.innerHeight)
		};
	e.checkHScreen = t
}(btGame || (btGame = {}));
var btGame;~

function(e) {
	var t = function(t, n) {
			this.myCallback = n, this.tipsCount = 0, e.checkHScreen(e.proxy(this.callback, this), !1), t && (this.once = t)
		};
	t.prototype = {
		hscreen: function() {
			this.buildScreen(), this.once && this.tipsCount <= 0 ? this.screen && this.screen.show() : this.once || this.screen && this.screen.show(), this.tipsCount++
		},
		vscreen: function() {
			this.screen && this.screen.hide(), this.myCallback && this.myCallback(this.tipsCount)
		},
		getScreenOption: function() {
			return {
				id: "bt-h-scrren",
				html: "<table><tr><td><img class='bt-h-screen-img' src='static/img/bt-play-h-screen.png' /></td></tr></table>",
				time: 0,
				lockId: "bt-hide-lock"
			}
		},
		buildScreen: function() {
			!this.screen && (this.screen = btGame.advertisement(this.getScreenOption()))
		},
		callback: function(e) {
			e ? this.vscreen() : this.hscreen()
		}
	};
	var n = function(e, n) {
			t.call(this, e, n)
		};
	n.__super__ = t, n.prototype = $.extend({}, t.prototype, {
		hscreen: function() {
			t.prototype.vscreen.call(this)
		},
		vscreen: function() {
			t.prototype.hscreen.call(this)
		},
		getScreenOption: function() {
			return {
				id: "bt-v-scrren",
				html: "<table><tr><td><img class='bt-v-screen-img' src='static/img/bt-play-v-screen.png' /></td></tr></table>",
				time: 0,
				lockId: "bt-hide-lock"
			}
		}
	}), e.onlyHScreen = function(e, n) {
		return new t(e, n)
	}, e.onlyVScreen = function(e, t) {
		return new n(e, t)
	}
}(btGame || (btGame = {}));