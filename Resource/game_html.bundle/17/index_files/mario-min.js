var ns_egret; (function(b) {
    var d = function() {
        function c() {
            this.isUseCapture = !1
        }
        c.prototype.addEventListener = function(a, f, e, c, l) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof l && (l = 0);
            b.DEBUG && b.DEBUG.ADD_EVENT_LISTENER && b.DEBUG.checkAddEventListener(a, f, e, c, l);
            this._eventDataList || (this._eventDataList = []);
            for (var d = -1,
            m = {
                eventName: a,
                func: f,
                thisObj: e,
                useCapture: c,
                priority: l
            },
            n = this._eventDataList.length, r = 0; r < n; r++) {
                var h = this._eventDataList[r];
                if (h.eventName == a && h.func == f && h.thisObj == e && h.useCapture == c) return;
                h.priority >= l && -1 == d && (d = r - 1)
            } - 1 != d ? this._eventDataList.splice(r - 1, 0, m) : this._eventDataList.unshift(m)
        };
        c.prototype.removeEventListener = function(a, f, e, b) {
            "undefined" === typeof b && (b = !1);
            if (this._eventDataList) for (var c = this._eventDataList.length,
            d = 0; d < c; d++) {
                var m = this._eventDataList[d];
                if (m.eventName == a && m.func == f && m.thisObj == e && m.useCapture == b) {
                    this._eventDataList.splice(d, 1);
                    break
                }
            }
        };
        c.prototype.hasEventListener = function(a, f) {
            if (!this._eventDataList) return ! 1;
            for (var e = !1,
            b = this._eventDataList.length,
            c = 0; c < b; c++) {
                var d = this._eventDataList[c];
                d.eventName == a && d.thisObj == f && (e = !0)
            }
            return e
        };
        c.prototype.dispatchEvent = function(a) {
            for (var f = 0; f < arguments.length - 1; f++);
            if (!this._eventDataList) return ! 1;
            for (var e = f = !1,
            c = this._eventDataList.length,
            l = 0; l < c; l++) if ((e = this._eventDataList[l]) && e.eventName == a && (!(this instanceof b.DisplayObject) || this.isUseCapture == e.useCapture)) e = e.func.apply(e.thisObj, arguments),
            f = f || e;
            return f
        };
        return c
    } ();
    b.EventDispatcher = d
})(ns_egret || (ns_egret = {}));
var __extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        a.prototype.renderLoop = function() {
            var f = this.rendererContext;
            f.clearScreen();
            this.dispatchEvent(a.EVENT_START_RENDER);
            this.stage.visit(f);
            this.dispatchEvent(a.EVENT_FINISH_RENDER)
        };
        a.prototype.enterFrame = function() {
            this.dispatchEvent(a.EVENT_ENTER_FRAME)
        };
        a.prototype.run = function() {
            b.Ticker.getInstance().run();
            b.Ticker.getInstance().register(this.renderLoop, this, Number.MAX_VALUE);
            b.Ticker.getInstance().register(this.enterFrame, this, Number.MIN_VALUE);
            this.touchContext.run()
        };
        a.instance = new a;
        a.EVENT_ENTER_FRAME = "enter_frame";
        a.EVENT_START_RENDER = "start_render";
        a.EVENT_FINISH_RENDER = "finish_render";
        return a
    } (b.EventDispatcher);
    b.MainContext = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {
            this._tick = this._preDrawCount = this._renderPerformanceCost = this._logicPerformanceCost = this._lastFrameTime = this._lastTime = 0
        }
        c.getInstance = function() {
            null == c.instance && (c.instance = new c);
            return c.instance
        };
        c.prototype.run = function() {
            b.Ticker.getInstance().register(this.update, this);
            null == this._txt && (this._txt = new b.TextField, this._txt.size = 28, b.MainContext.instance.stage.addChild(this._txt));
            var a = b.MainContext.instance;
            a.addEventListener(b.MainContext.EVENT_ENTER_FRAME, this.onEnterFrame, this);
            a.addEventListener(b.MainContext.EVENT_START_RENDER, this.onStartRender, this);
            a.addEventListener(b.MainContext.EVENT_FINISH_RENDER, this.onFinishRender, this)
        };
        c.prototype.onEnterFrame = function() {
            this._lastTime = b.Ticker.now()
        };
        c.prototype.onStartRender = function() {
            var a = b.Ticker.now();
            this._logicPerformanceCost = a - this._lastTime;
            this._lastTime = a
        };
        c.prototype.onFinishRender = function() {
            var a = b.Ticker.now();
            this._renderPerformanceCost = a - this._lastTime;
            this._lastTime = a
        };
        c.prototype.update = function() {
            var a = b.Ticker.now(),
            f = a - this._lastFrameTime;
            this._lastFrameTime = a;
            this._tick++;
            if (6 == this._tick) {
                this._tick = 0;
                var a = (this._preDrawCount - 1).toString(),
                e = b.MainContext.instance.rendererContext.renderCost.toString(),
                e = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() + "," + e;
                this._txt.text = a + "\n" + e + "\n" + Math.floor(1E3 / f).toString()
            }
            this._preDrawCount = 0
        };
        c.prototype.onDrawImage = function() {
            this._preDrawCount++
        };
        return c
    } ();
    b.Profiler = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments);
            this._timeScale = 1;
            this._paused = !1;
            this._frameRate = 60
        }
        __extends(a, c);
        a.prototype.run = function() {
            this._time = a.now();
            a.requestAnimationFrame.call(window, this.enterFrame)
        };
        a.prototype.enterFrame = function() {
            a.instance.update();
            a.requestAnimationFrame.call(window, a.instance.enterFrame)
        };
        a.prototype.update = function() {
            if (this._eventDataList && !this._paused) {
                for (var f = a.now(), e = this._eventDataList.length, c = 0; c < e; c++) {
                    var l = this._eventDataList[c];
                    if (l && "enterFrame" == l.eventName && (!(this instanceof b.DisplayObject) || this.isUseCapture == l.useCapture)) {
                        var d = f - this._time,
                        d = d * this._timeScale;
                        l.func.apply(l.thisObj, [d])
                    }
                }
                this._time = f
            }
        };
        a.prototype.register = function(f, a, b) {
            "undefined" === typeof b && (b = 0);
            c.prototype.addEventListener.call(this, "enterFrame", f, a, !1, b)
        };
        a.prototype.unregister = function(f, a) {
            c.prototype.removeEventListener.call(this, "enterFrame", f, a, !1)
        };
        a.prototype.callLater = function(f, a, b) {
            "undefined" === typeof b && (b = 0);
            var c = this,
            d = 0;
            this.register(function(m) {
                0 == b ? (f.apply(a), c.unregister(arguments.callee, a)) : (d += m, d >= b && (f.apply(a), c.unregister(arguments.callee, a)))
            },
            a)
        };
        a.prototype.setTimeScale = function(f) {
            this._timeScale = f
        };
        a.prototype.getTimeScale = function() {
            return this._timeScale
        };
        a.prototype.pause = function() {
            this._paused = !0
        };
        a.prototype.resume = function() {
            this._paused = !1
        };
        a.prototype.getFrameRate = function() {
            return this._frameRate
        };
        a.getInstance = function() {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        a.now = function() {
            return (new Date).getTime()
        };
        a.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(f) {
            return window.setTimeout(f, 1E3 / a.getInstance().getFrameRate())
        };
        return a
    } (b.EventDispatcher);
    b.Ticker = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function a(f, a, b, c) {
            this.x = f;
            this.y = a;
            this.width = b;
            this.height = c
        }
        a.prototype.initialize = function(f, a, b, c) {
            this.x = f;
            this.y = a;
            this.width = b;
            this.height = c;
            return this
        };
        a.prototype.containPoint = function(f, a) {
            return this.x <= f && this.x + this.width >= f && this.y <= a && this.y + this.height >= a
        };
        a.prototype.clone = function() {
            return new a(this.x, this.y, this.width, this.height)
        };
        a.identity = new a(0, 0, 0, 0);
        return a
    } ();
    b.Rectangle = d;
    d = function() {
        function a(f, a, b, c, d, m) {
            "undefined" === typeof f && (f = 1);
            "undefined" === typeof a && (a = 0);
            "undefined" === typeof b && (b = 0);
            "undefined" === typeof c && (c = 1);
            "undefined" === typeof d && (d = 0);
            "undefined" === typeof m && (m = 0);
            this.a = f;
            this.b = a;
            this.c = b;
            this.d = c;
            this.tx = d;
            this.ty = m;
            this.invert = function() {
                var f = this.a,
                a = this.b,
                e = this.c,
                b = this.d,
                c = this.tx,
                k = f * b - a * e;
                this.a = b / k;
                this.b = -a / k;
                this.c = -e / k;
                this.d = f / k;
                this.tx = (e * this.ty - b * c) / k;
                this.ty = -(f * this.ty - a * c) / k;
                return this
            }
        }
        a.prototype.prepend = function(f, a, b, c, d, m) {
            var n = this.tx;
            if (1 != f || 0 != a || 0 != b || 1 != c) {
                var r = this.a,
                h = this.c;
                this.a = r * f + this.b * b;
                this.b = r * a + this.b * c;
                this.c = h * f + this.d * b;
                this.d = h * a + this.d * c
            }
            this.tx = n * f + this.ty * b + d;
            this.ty = n * a + this.ty * c + m;
            return this
        };
        a.prototype.append = function(a, e, b, c, d, m) {
            var n = this.a,
            r = this.b,
            h = this.c,
            q = this.d;
            this.a = a * n + e * h;
            this.b = a * r + e * q;
            this.c = b * n + c * h;
            this.d = b * r + c * q;
            this.tx = d * n + m * h + this.tx;
            this.ty = d * r + m * q + this.ty;
            return this
        };
        a.prototype.prependMatrix = function(a) {
            this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
            return this
        };
        a.prototype.appendMatrix = function(a) {
            this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
            return this
        };
        a.prototype.prependTransform = function(f, e, b, c, d, m, n, r, h) {
            if (d % 360) {
                var q = d * a.DEG_TO_RAD;
                d = Math.cos(q);
                q = Math.sin(q)
            } else d = 1,
            q = 0;
            if (r || h) this.tx -= r,
            this.ty -= h;
            m || n ? (m *= a.DEG_TO_RAD, n *= a.DEG_TO_RAD, this.prepend(d * b, q * b, -q * c, d * c, 0, 0), this.prepend(Math.cos(n), Math.sin(n), -Math.sin(m), Math.cos(m), f, e)) : this.prepend(d * b, q * b, -q * c, d * c, f, e);
            return this
        };
        a.prototype.appendTransform = function(f, e, b, c, d, m, n, r, h) {
            if (d % 360) {
                var q = d * a.DEG_TO_RAD;
                d = Math.cos(q);
                q = Math.sin(q)
            } else d = 1,
            q = 0;
            m || n ? (m *= a.DEG_TO_RAD, n *= a.DEG_TO_RAD, this.append(Math.cos(n), Math.sin(n), -Math.sin(m), Math.cos(m), f, e), this.append(d * b, q * b, -q * c, d * c, 0, 0)) : this.append(d * b, q * b, -q * c, d * c, f, e);
            if (r || h) this.tx -= r * this.a + h * this.c,
            this.ty -= r * this.b + h * this.d;
            return this
        };
        a.prototype.appendTransformFromDisplay = function(a) {
            var e, b;
            0 != a.relativeAnchorPointX || 0 != a.relativeAnchorPointY ? (b = a.getBounds(), e = b.width * a.relativeAnchorPointX, b = b.height * a.relativeAnchorPointY) : (e = a.anchorPointX, b = a.anchorPointY);
            this.identity();
            this.appendTransform(a.x, a.y, a.scaleX, a.scaleY, a.rotation, a.skewX, a.skewY, e, b);
            return this
        };
        a.prototype.rotate = function(a) {
            var e = Math.cos(a);
            a = Math.sin(a);
            var b = this.a,
            c = this.c,
            d = this.tx;
            this.a = b * e - this.b * a;
            this.b = b * a + this.b * e;
            this.c = c * e - this.d * a;
            this.d = c * a + this.d * e;
            this.tx = d * e - this.ty * a;
            this.ty = d * a + this.ty * e;
            return this
        };
        a.prototype.skew = function(f, e) {
            f *= a.DEG_TO_RAD;
            e *= a.DEG_TO_RAD;
            this.append(Math.cos(e), Math.sin(e), -Math.sin(f), Math.cos(f), 0, 0);
            return this
        };
        a.prototype.scale = function(a, e) {
            this.a *= a;
            this.d *= e;
            this.c *= a;
            this.b *= e;
            this.tx *= a;
            this.ty *= e;
            return this
        };
        a.prototype.translate = function(a, e) {
            this.tx += a;
            this.ty += e;
            return this
        };
        a.prototype.identity = function() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this
        };
        a.prototype.isIdentity = function() {
            return 0 == this.tx && 0 == this.ty && 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d
        };
        a.prototype.transformPoint = function(a, e, b) {
            b = b || {};
            b.x = a * this.a + e * this.c + this.tx;
            b.y = a * this.b + e * this.d + this.ty;
            return b
        };
        a.prototype.decompose = function(f) {
            null == f && (f = {});
            f.x = this.tx;
            f.y = this.ty;
            f.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
            f.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
            var e = Math.atan2( - this.c, this.d),
            b = Math.atan2(this.b, this.a);
            e == b ? (f.rotation = b / a.DEG_TO_RAD, 0 > this.a && 0 <= this.d && (f.rotation += 0 >= f.rotation ? 180 : -180), f.skewX = f.skewY = 0) : (f.skewX = e / a.DEG_TO_RAD, f.skewY = b / a.DEG_TO_RAD);
            return f
        };
        a.transformCoords = function(a, e, b) {
            var d = new c(0, 0);
            d.x = a.a * e + a.c * b + a.tx;
            d.y = a.d * b + a.b * e + a.ty;
            return d
        };
        a.identity = new a;
        a.DEG_TO_RAD = Math.PI / 180;
        return a
    } ();
    b.Matrix2D = d;
    var c = function() {
        function a(a, e) {
            this.x = a;
            this.y = e
        }
        a.identity = new a(0, 0);
        return a
    } ();
    b.Point = c
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {}
        c.fatal = function(a, f) {
            "undefined" === typeof f && (f = null);
            b.Logger.traceToConsole("Fatal", a, f);
            throw Error(b.Logger.getTraceCode("Fatal", a, f));
        };
        c.info = function(a, f) {
            "undefined" === typeof f && (f = null);
            b.Logger.traceToConsole("Info", a, f)
        };
        c.warning = function(a, f) {
            "undefined" === typeof f && (f = null);
            b.Logger.traceToConsole("Warning", a, f)
        };
        c.traceToConsole = function(a, f, e) {
            console.log(b.Logger.getTraceCode(a, f, e))
        };
        c.getTraceCode = function(a, f, e) {
            return "[" + a + "]" + f + ":" + (null == e ? "": e)
        };
        return c
    } ();
    b.Logger = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function b() {}
        b.CENTER = "center";
        b.LEFT = "left";
        b.RIGHT = "right";
        b.TOP = "top";
        b.BOTTOM = "bottom";
        b.BOTH = "both";
        b.HORIZONTAL = "horizontal";
        b.VERTICAL = "vertical";
        return b
    } ();
    b.Direction = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function b() {
            throw Error("can't create a mixin class");
        }
        b.prototype.onActivity = function() {};
        b.prototype.onCancel = function() {};
        return b
    } ();
    b.ComponentBase = d;
    d = function() {
        function b() {}
        b.active = function(a, f) {
            var e = f.prototype,
            b;
            for (b in e) null == a[b] ? a[b] = e[b] : console.log("warning", b);
            a.onActivity()
        };
        return b
    } ();
    b.MixIn = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function() {
        function f() {
            this._originalDesignHeight = this._originalDesignWidth = this._designHeight = this._designWidth = this._frameHeight = this._frameWidth = null;
            this._scaleY = this._scaleX = 1;
            this._resolutionPolicy = this._rpFixedWidth = this._rpFixedHeight = this._frame = null;
            this._frame = document.getElementById(f.canvas_div_name);
            this._frameWidth = this._frame.style.width;
            this._frameHeight = this._frame.style.height;
            var b = document.getElementById(f.canvas_name),
            k = b.width,
            b = b.height;
            this._designWidth = k;
            this._designHeight = b;
            this._originalDesignWidth = k;
            this._originalDesignHeight = b;
            this._rpFixedHeight = new c(a.EQUAL_TO_FRAME, e.FIXED_HEIGHT);
            this._rpFixedWidth = new c(a.EQUAL_TO_FRAME, e.FIXED_WIDTH)
        }
        f.getInstance = function() {
            null == f.instance && (a.initialize(), e.initialize(), f.instance = new f);
            return f.instance
        };
        f.prototype.setFrameSize = function(a, f) {
            this._frameWidth = a;
            this._frameHeight = f;
            this._frame.style.width = a + "px";
            this._frame.style.height = f + "px";
            this._resizeEvent()
        };
        f.prototype._resizeEvent = function() {
            var a = this._originalDesignWidth,
            f = this._originalDesignHeight;
            0 < a && this.setDesignSize(a, f, this._resolutionPolicy)
        };
        f.prototype.setDesignSize = function(a, f, e) {
            if (isNaN(a) || 0 == a || isNaN(f) || 0 == f) b.Logger.info("Resolution Error");
            else if (this.setResolutionPolicy(e), null != this._resolutionPolicy) {
                this._resolutionPolicy.init(this);
                var c = this._frameWidth,
                k = this._frameHeight;
                e == this._resolutionPolicy && a == this._originalDesignWidth && f == this._originalDesignHeight && c == this._frameWidth && k == this._frameHeight || (this._designWidth = a, this._designHeight = f, this._originalDesignWidth = a, this._originalDesignHeight = f, a = this._resolutionPolicy.apply(this, this._designWidth, this._designHeight), a.scale && 2 == a.scale.length && (this._scaleX = a.scale[0], this._scaleY = a.scale[1]))
            } else b.Logger.info("\u9700\u8981\u5148\u8bbe\u7f6eresolutionPolicy")
        };
        f.prototype.setResolutionPolicy = function(a) {
            if (a instanceof c) this._resolutionPolicy = a;
            else switch (a) {
            case c.FIXED_HEIGHT:
                this._resolutionPolicy = this._rpFixedHeight;
                break;
            case c.FIXED_WIDTH:
                this._resolutionPolicy = this._rpFixedWidth
            }
        };
        f.prototype.getDesignWidth = function() {
            return this._designWidth
        };
        f.prototype.getDesignHeight = function() {
            return this._designHeight
        };
        f.prototype.getScaleX = function() {
            return this._scaleX
        };
        f.prototype.getScaleY = function() {
            return this._scaleY
        };
        f.prototype.getFrameWidth = function() {
            return this._frameWidth
        };
        f.prototype.getFrameHeight = function() {
            return this._frameHeight
        };
        f.canvas_name = "gameCanvas";
        f.canvas_div_name = "gameDiv";
        return f
    } ();
    b.StageDelegate = d;
    var c = function() {
        function f(a, e) {
            this._contentStrategy = this._containerStrategy = null;
            this.setContainerStrategy(a);
            this.setContentStrategy(e)
        }
        f.prototype.init = function(a) {
            this._containerStrategy.init(a);
            this._contentStrategy.init(a)
        };
        f.prototype.apply = function(a, f, e) {
            this._containerStrategy.apply(a, f, e);
            return this._contentStrategy.apply(a, f, e)
        };
        f.prototype.setContainerStrategy = function(f) {
            f instanceof a && (this._containerStrategy = f)
        };
        f.prototype.setContentStrategy = function(a) {
            a instanceof e && (this._contentStrategy = a)
        };
        f.FIXED_HEIGHT = 1;
        f.FIXED_WIDTH = 2;
        return f
    } ();
    b.ResolutionPolicy = c;
    var a = function() {
        function a() {}
        a.initialize = function() {
            a.EQUAL_TO_FRAME = new f
        };
        a.prototype.init = function(a) {};
        a.prototype.apply = function(a, f, e) {};
        a.prototype._setupContainer = function(a, f, e) {
            document.getElementById(d.canvas_name);
            document.getElementById(d.canvas_div_name);
            a = document.body;
            var b;
            if (a && (b = a.style)) b.paddingTop = b.paddingTop || "0px",
            b.paddingRight = b.paddingRight || "0px",
            b.paddingBottom = b.paddingBottom || "0px",
            b.paddingLeft = b.paddingLeft || "0px",
            b.borderTop = b.borderTop || "0px",
            b.borderRight = b.borderRight || "0px",
            b.borderBottom = b.borderBottom || "0px",
            b.borderLeft = b.borderLeft || "0px",
            b.marginTop = b.marginTop || "0px",
            b.marginRight = b.marginRight || "0px",
            b.marginBottom = b.marginBottom || "0px",
            b.marginLeft = b.marginLeft || "0px"
        };
        a.prototype._fixContainer = function() {
            document.body.insertBefore(document.getElementById(d.canvas_div_name), document.body.firstChild);
            var a = document.body.style;
            a.width = window.innerWidth + "px";
            a.height = window.innerHeight + "px";
            a.overflow = "hidden";
            a = document.getElementById(d.canvas_div_name).style;
            a.position = "fixed";
            a.left = a.top = "0px";
            document.body.scrollTop = 0
        };
        a.EQUAL_TO_FRAME = null;
        return a
    } ();
    b.ContainerStrategy = a;
    var f = function(a) {
        function f() {
            a.apply(this, arguments)
        }
        __extends(f, a);
        f.prototype.apply = function(a) {
            this._setupContainer(a._frame, a._frameWidth, a._frameHeight)
        };
        return f
    } (a);
    b.EqualToFrame = f;
    var e = function() {
        function a() {
            this._result = {
                scale: [1, 1],
                x: null,
                y: null,
                w: null,
                h: null
            }
        }
        a.initialize = function() {
            a.FIXED_HEIGHT = new k;
            a.FIXED_WIDTH = new l
        };
        a.prototype._buildResult = function(a, f, e, b, c, k) {
            this._result.scale = [c, k];
            this._result.x = (a - e) / 2;
            this._result.y = (f - b) / 2;
            this._result.w = a;
            this._result.h = f;
            return this._result
        };
        a.prototype.init = function(a) {};
        a.prototype.apply = function(a, f, e) {
            return {
                scale: [1, 1]
            }
        };
        a.FIXED_HEIGHT = null;
        a.FIXED_WIDTH = null;
        return a
    } ();
    b.ContentStrategy = e;
    var k = function(a) {
        function f() {
            a.apply(this, arguments)
        }
        __extends(f, a);
        f.prototype.apply = function(a, f, e) {
            a = document.getElementById(d.canvas_name);
            var c = document.getElementById(d.canvas_div_name),
            k = a.width,
            l = a.height,
            g,
            m = f * (l / e),
            E = window.innerHeight;
            g = E / e;
            var D = f * g;
            a.width = f;
            a.height = e;
            a.style.width = D + "px";
            a.style.height = E + "px";
            c.style.width = D + "px";
            c.style.height = E + "px";
            b.MainContext.instance.stage.stageWidth = D;
            b.MainContext.instance.stage.stageHeight = E;
            return this._buildResult(k, l, m, l, g, g)
        };
        return f
    } (e);
    b.FixedHeight = k;
    var l = function(a) {
        function f() {
            a.apply(this, arguments)
        }
        __extends(f, a);
        f.prototype.apply = function(a, f, e) {
            a = document.getElementById(d.canvas_name);
            var c = document.getElementById(d.canvas_div_name),
            k = a.width,
            l = a.height,
            g,
            m = e * (k / f),
            E = window.innerWidth;
            g = E / f;
            var D = e * g;
            a.width = f;
            a.height = e;
            a.style.width = E + "px";
            a.style.height = D + "px";
            c.style.width = E + "px";
            c.style.height = D + "px";
            b.MainContext.instance.stage.stageWidth = E;
            b.MainContext.instance.stage.stageHeight = D;
            return this._buildResult(k, l, k, m, g, g)
        };
        return f
    } (e);
    b.FixedWidth = l
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(a) {
        function f() {
            a.call(this);
            this.parent = null;
            this.scaleY = this.scaleX = 1;
            this.rotation = this.relativeAnchorPointY = this.relativeAnchorPointX = this.anchorPointY = this.anchorPointX = 0;
            this.alpha = 1;
            this.skewY = this.skewX = 0;
            this._isRunning = !1;
            this.x = this.y = 0;
            this.visible = !0
        }
        __extends(f, a);
        f.prototype.visit = function(a) {
            this.visible && (this.preDraw(), this.draw(a))
        };
        f.prototype.preDraw = function() {};
        f.prototype.draw = function(a) {
            unstable.cache_api.draw.call(this, a) || (a.save(), this.updateTransform(a), this.render(a), a.restore())
        };
        f.prototype.updateTransform = function(a) {
            var f = b.Matrix2D.identity.appendTransformFromDisplay(this);
            a.setAlpha(this.alpha, this.blendMode);
            a.transform(f);
            this.mask && a.clip(this.mask.x, this.mask.y, this.mask.width, this.mask.height)
        };
        f.prototype.render = function(a) {};
        f.prototype.getBounds = function() {
            if (void 0 !== this._contentWidth) {
                var a, f;
                0 != this.relativeAnchorPointX || 0 != this.relativeAnchorPointY ? (a = this._contentWidth * this.relativeAnchorPointX, f = this._contentHeight * this.relativeAnchorPointY) : (a = this.anchorPointX, f = this.anchorPointY);
                return b.Rectangle.identity.initialize( - a, -f, this._contentWidth, this._contentHeight)
            }
            return this._measureBounds()
        };
        f.prototype.setContentSize = function(a, f) {
            this._contentWidth = a;
            this._contentHeight = f
        };
        f.prototype.getConcatenatedMatrix = function() {
            for (var a = b.Matrix2D.identity.identity(), f = this; null != f;) {
                if (0 != f.relativeAnchorPointX || 0 != f.relativeAnchorPointY) {
                    var c = f.getBounds();
                    a.prependTransform(f.x, f.y, f.scaleX, f.scaleY, f.rotation, f.skewX, f.skewY, c.width * f.relativeAnchorPointX, c.height * f.relativeAnchorPointY)
                } else a.prependTransform(f.x, f.y, f.scaleX, f.scaleY, f.rotation, f.skewX, f.skewY, f.anchorPointX, f.anchorPointY);
                f = f.parent
            }
            return a
        };
        f.prototype.localToGlobal = function(a, f) {
            "undefined" === typeof a && (a = 0);
            "undefined" === typeof f && (f = 0);
            var c = this.getConcatenatedMatrix();
            c.append(1, 0, 0, 1, a, f);
            var d = b.Point.identity;
            d.x = c.tx;
            d.y = c.ty;
            return d
        };
        f.prototype.globalToLocal = function(a, f) {
            "undefined" === typeof a && (a = 0);
            "undefined" === typeof f && (f = 0);
            var c = this.getConcatenatedMatrix();
            c.invert();
            c.append(1, 0, 0, 1, a, f);
            var d = b.Point.identity;
            d.x = c.tx;
            d.y = c.ty;
            return d
        };
        f.prototype.hitTest = function(a, f, b) {
            "undefined" === typeof b && (b = !1);
            if (!this.visible || !b && !this.touchEnabled) return null;
            b = this.getBounds();
            return 0 < a && a < b.width && 0 < f && f < b.height ? this.mask ? this.mask.x < a && a < this.mask.width && this.mask.y < f && f < this.mask.height ? this: null: this: null
        };
        f.prototype.getMatrix = function() {
            return b.Matrix2D.identity.identity().appendTransformFromDisplay(this)
        };
        f.prototype._measureBounds = function() {
            b.Logger.fatal("\u5b50\u7c7b\u9700\u8981\u5b9e\u73b0\u7684\u65b9\u6cd5");
            return b.Rectangle.identity
        };
        f.prototype.setAnchorPoint = function(a, f) {
            this.anchorPointX = a;
            this.anchorPointY = f
        };
        f.prototype.setRelativeAnchorPoint = function(a, f) {
            0 > a || 1 < a || 0 > f || 1 < f ? b.Logger.warning("\u76f8\u5bf9\u951a\u70b9\u53ea\u63a5\u53d70-1\u4e4b\u95f4\u7684\u503c") : (this.relativeAnchorPointX = a, this.relativeAnchorPointY = f)
        };
        f.prototype.getOffsetPoint = function() {
            var a = this.anchorPointX,
            f = this.anchorPointY;
            if (0 != this.relativeAnchorPointX || 0 != this.relativeAnchorPointY) f = this.getBounds(),
            a = this.relativeAnchorPointX * f.width,
            f = this.relativeAnchorPointY * f.height;
            var c = b.Point.identity;
            c.x = a;
            c.y = f;
            return c
        };
        f.prototype.removeFromParent = function() {
            this && this.parent && this.parent.removeChild(this)
        };
        f.prototype._onAddToStage = function() {
            this._isRunning = !0;
            this.dispatchEvent(c.ADD_TO_STAGE)
        };
        f.prototype._onRemoveFromStage = function() {
            this._isRunning = !1;
            this.dispatchEvent(c.REMOVE_FROM_STAGE)
        };
        f.prototype.isRunning = function() {
            return this._isRunning
        };
        f.prototype.cacheAsBitmap = function(a) {
            unstable.cache_api.cacheAsBitmap.call(this, a)
        };
        f.getTransformBounds = function(a) {
            var f = a.getBounds(),
            b = a.getMatrix();
            a = f.x;
            var c = f.y,
            d = f.width,
            n = f.height,
            r = d * b.a,
            d = d * b.b,
            h = n * b.c,
            n = n * b.d,
            q = b.tx,
            b = b.ty,
            p = q,
            v = q,
            x = b,
            y = b; (a = r + q) < p ? p = a: a > v && (v = a); (a = r + h + q) < p ? p = a: a > v && (v = a); (a = h + q) < p ? p = a: a > v && (v = a); (c = d + b) < x ? x = c: c > y && (y = c); (c = d + n + b) < x ? x = c: c > y && (y = c); (c = n + b) < x ? x = c: c > y && (y = c);
            return f.initialize(p, x, v - p, y - x)
        };
        return f
    } (b.EventDispatcher);
    b.DisplayObject = d;
    var c = function() {
        function a() {}
        a.ADD_TO_STAGE = "addToStage";
        a.REMOVE_FROM_STAGE = "removeFromStage";
        return a
    } ();
    b.DisplayListEvent = c
})(ns_egret || (ns_egret = {}));
var unstable = {
    cache_api: {}
};
unstable.cache_api.cacheAsBitmap = function(b) {
    if (b) {
        b = document.createElement("canvas");
        var d = this.getBounds();
        b.width = d.width;
        b.height = d.height;
        this._cacheOffsetX = d.x;
        this._cacheOffsetY = d.y;
        b.getContext("2d").translate( - d.x, -d.y);
        this.cacheRendererContext = d = new ns_egret.HTML5CanvasRenderer(b);
        d.save();
        this.render(d);
        d.restore();
        document.documentElement.appendChild(b)
    }
};
unstable.cache_api.draw = function(b) {
    return this.cacheRendererContext ? (b.save(), this.updateTransform(b), b.canvasContext.drawImage(this.cacheRendererContext.canvas, this._cacheOffsetX, this._cacheOffsetY), b.restore(), !0) : !1
};
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            this._children = [];
            this.numChildren = 0;
            c.call(this)
        }
        __extends(a, c);
        a.prototype.setChildIndex = function(a, e) {
            var c = this._children.indexOf(a);
            0 > c && b.Logger.fatal("child\u4e0d\u5728\u5f53\u524d\u5bb9\u5668\u5185");
            this._children.splice(c, 1);
            0 > e || this._children.length <= e ? this._children.push(a) : this._children.splice(e, 0, a)
        };
        a.prototype.addChild = function(a, e) {
            "undefined" === typeof e && (e = -1);
            null != a.parent ? b.Logger.fatal("child\u5df2\u7ecf\u88ab\u6dfb\u52a0\u5230\u663e\u793a\u5217\u8868") : this._children.length < e && b.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4"); - 1 == e ? this._children.push(a) : 0 <= e ? this._children.splice(e, 0, a) : b.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
            a.parent = this;
            a._onAddToStage();
            this.numChildren++
        };
        a.prototype.removeChild = function(a) {
            a = this._children.indexOf(a);
            0 <= a ? this.removeChildAt(a) : b.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent")
        };
        a.prototype.removeChildAt = function(a) {
            var e = this._children;
            0 <= a && a < e.length ? (a = e.splice(a, 1)[0], a.parent = null, a._onRemoveFromStage(), this.numChildren--) : b.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent")
        };
        a.prototype.getChildAt = function(a) {
            return this._children[a]
        };
        a.prototype.getChildByName = function(a) {
            return null
        };
        a.prototype.getChildIndex = function(a) {
            return this._children.indexOf(a)
        };
        a.prototype.removeAllChildren = function() {
            for (var a = this._children; 0 < a.length;) {
                var e = a.pop();
                e.parent = null;
                e._onRemoveFromStage()
            }
            this.numChildren = 0
        };
        a.prototype.render = function(a) {
            for (var e = 0,
            b = this._children.length; e < b; e++) this._children[e].visit(a)
        };
        a.prototype._measureBounds = function() {
            for (var a = 0,
            e = 0,
            c = 0,
            d = 0,
            g = this._children.length,
            m = 0; m < g; m++) {
                var n = this._children[m],
                r;
                if (n.visible && (r = b.DisplayObject.getTransformBounds(n))) {
                    var n = r.x,
                    h = r.y,
                    q = r.width + r.x,
                    p = r.height + r.y;
                    if (n < a || 0 == m) a = n;
                    if (q > e || 0 == m) e = q;
                    if (h < c || 0 == m) c = h;
                    if (p > d || 0 == m) d = p
                }
            }
            return b.Rectangle.identity.initialize(a, c, e - a, d - c)
        };
        a.prototype.hitTest = function(a, e) {
            var c;
            if (!this.visible) return null;
            for (var d = this._children,
            g = d.length - 1; 0 <= g; g--) {
                var m = c = d[g],
                n = m.getOffsetPoint(),
                m = b.Matrix2D.identity.identity().prependTransform(m.x, m.y, m.scaleX, m.scaleY, m.rotation, 0, 0, n.x, n.y);
                m.invert();
                m = b.Matrix2D.transformCoords(m, a, e);
                if (c = c.hitTest(m.x, m.y, !0)) {
                    if (c.touchEnabled) break;
                    else if (this.touchEnabled) return this;
                    break
                }
            }
            return c
        };
        a.prototype._onAddToStage = function() {
            c.prototype._onAddToStage.call(this);
            for (var a = 0; a < this.numChildren; a++) this._children[a]._onAddToStage()
        };
        a.prototype._onRemoveFromStage = function() {
            c.prototype._onRemoveFromStage.call(this);
            for (var a = 0; a < this.numChildren; a++) this._children[a]._onRemoveFromStage()
        };
        return a
    } (b.DisplayObject);
    b.DisplayObjectContainer = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this.touchEnabled = !0
        }
        __extends(a, c);
        a.prototype.hitTest = function(a, e) {
            if (!this.touchEnabled) return null;
            var c;
            if (!this.visible) return this;
            for (var d = this._children,
            g = d.length - 1; 0 <= g; g--) {
                var m = c = d[g],
                n = m.getOffsetPoint(),
                m = b.Matrix2D.identity.identity().prependTransform(m.x, m.y, m.scaleX, m.scaleY, m.rotation, 0, 0, n.x, n.y);
                m.invert();
                m = b.Matrix2D.transformCoords(m, a, e);
                if ((c = c.hitTest(m.x, m.y, !0)) && c.touchEnabled) return c
            }
            return this
        };
        a.prototype.getBounds = function() {
            return b.Rectangle.identity.initialize(0, 0, 1E5, 1E5)
        };
        return a
    } (b.DisplayObjectContainer);
    b.Stage = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this.debug = !1;
            this.debugColor = "#ff0000"
        }
        __extends(a, c);
        a.initWithTexture = function(f) {
            var e = new a;
            e.texture = f;
            return e
        };
        a.prototype.render = function(f) {
            var e = this.texture;
            if (! (null == e || null == e._bitmapData)) {
                var b, c, d, m;
                this.spriteFrame ? (m = this.spriteFrame, b = m.x, c = m.y, d = m.w, m = m.h) : (c = b = 0, d = e.getTextureWidth(), m = e.getTextureHeight());
                f.drawImage(e, b, c, d, m, 0, 0, d, m); (a.debug || this.debug) && f.strokeRect(b, c, d, m, this.debugColor)
            }
        };
        a.prototype._measureBounds = function() {
            var a = this.spriteFrame,
            e, c;
            a ? (e = a.w, c = a.h) : this.texture ? (e = this.texture.getTextureWidth(), c = this.texture.getTextureHeight()) : b.Logger.fatal("\u83b7\u53d6BitmapBounds\u5931\u8d25");
            var d;
            0 != this.relativeAnchorPointX || 0 != this.relativeAnchorPointY ? (a = e * this.relativeAnchorPointX, d = c * this.relativeAnchorPointY) : (a = this.anchorPointX, d = this.anchorPointY);
            return b.Rectangle.identity.initialize( - a, -d, e, c)
        };
        a.debug = !1;
        return a
    } (b.DisplayObject);
    b.Bitmap = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this.text = "";
            this._height = this._width = 0
        }
        __extends(a, c);
        a.prototype.render = function(a) {
            if (this.text) {
                this.text = this.text.toString();
                for (var e = this._height = this._width = 0,
                c = this.text.length; e < c; e++) {
                    var d = this.text.charAt(e),
                    d = this.bitmapFontData[d];
                    null == d && b.Logger.fatal("BitmapText\uff1a\u5f02\u5e38\u7684bitmapFontData");
                    var g = d.offX,
                    m = d.offY,
                    n = d.w;
                    a.drawImage(this.texture, d.x, d.y, d.w, d.h, g, m, d.w, d.h);
                    a.translate(n, 0);
                    this._width += n + g;
                    m + d.h > this._height && (this._height = m + d.h)
                }
            }
        };
        a.prototype._measureBounds = function() {
            var a = this._width,
            e = this._height,
            c, d;
            0 != this.relativeAnchorPointX || 0 != this.relativeAnchorPointY ? (c = a * this.relativeAnchorPointX, d = e * this.relativeAnchorPointY) : (c = this.anchorPointX, d = this.anchorPointY);
            return b.Rectangle.identity.initialize( - c, -d, a, e)
        };
        return a
    } (b.DisplayObject);
    b.BitmapText = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this.font = "Georgia";
            this.size = 30;
            this.textColor = "#ffffff";
            this.strokeColor = "#000000";
            this.hSpacing = this.vSpacing = 0;
            this.textAlign = "left"
        }
        __extends(a, c);
        a.prototype.render = function(a) {
            this.text && (a.setupFont(this.size + "px " + this.font, this.textAlign, this.textBaseline), this.drawText(a))
        };
        a.prototype._measureBounds = function() {
            return b.Rectangle.identity
        };
        a.prototype.drawText = function(a) {
            var e = 0,
            b = String(this.text).split(/(?:\r\n|\r|\n)/),
            d = 0,
            g = this.size + this.vSpacing,
            m = 0;
            if (null == this.lineWidth || 0 == this.lineWidth) {
                for (var m = b.length,
                n = 0,
                r = m; n < r; n++) {
                    var h = b[n],
                    q = a.measureText(h);
                    q.width > e && (e = q.width)
                }
                n = 0;
                for (r = m; n < r; n++) h = b[n],
                this._drawTextLine(a, h, d, e),
                d += g
            } else {
                e = this.lineWidth;
                n = 0;
                for (r = b.length; n < r; n++) {
                    h = b[n];
                    q = a.measureText(h);
                    if (q.width > this.lineWidth) for (var q = h,
                    p = 0,
                    h = "",
                    v = 0; v < q.length; v++) {
                        var x = a.measureText(q[v]).width;
                        p + x > this.lineWidth ? 0 == p ? (p += x, h += q[v], e = x) : (this._drawTextLine(a, h, d, e), m++, v--, h = "", p = 0, d += g) : (p += x, h += q[v])
                    }
                    this._drawTextLine(a, h, d, e);
                    m++;
                    d += g
                }
            }
            c.prototype.setContentSize.call(this, e, m * g);
            return null
        };
        a.prototype.setContentSize = function(a, e) {
            c.prototype.setContentSize.call(this, a, e);
            this.lineWidth = a
        };
        a.prototype._drawTextLine = function(a, e, b, c) {
            a.drawText(e, "left" == this.textAlign ? 0 : "center" == this.textAlign ? c / 2 : c, b, c, this.outline, this.textColor, this.strokeColor)
        };
        return a
    } (b.DisplayObject);
    b.TextField = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function a(a) {
            this.frames = a.frames
        }
        a.prototype.getFrame = function(a) {
            var e = this.frames[a];
            null == e && b.Logger.fatal("\u6ca1\u6709\u627e\u5230\u76f8\u5e94\u7684frame\uff1a", a);
            return e
        };
        a.parseFromDragonBones = function(f) {
            var b = new a(f);
            b.frames = {};
            f = f.SubTexture;
            for (var d in f) {
                var l = f[d],
                g = new c;
                g.w = l.width;
                g.h = l.height;
                g.x = l.x;
                g.y = l.y;
                b.frames[l.name] = g
            }
            return b
        };
        return a
    } ();
    b.SpriteSheet = d;
    var c = function() {
        return function() {}
    } ();
    b.SpriteSheetFrame = c
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments);
            this._placeholderText = "";
            this._edFontSize = 14;
            this._textColor = "#ff0000";
            this._placeholderFontSize = 14;
            this._placeholderColor = "#ffff00";
            this._preY = this._preX = 0
        }
        __extends(a, c);
        a.prototype.setContentSize = function(a, b) {
            c.prototype.setContentSize.call(this, a, b)
        };
        a.prototype._onAddToStage = function() {
            c.prototype._onAddToStage.call(this);
            var a = this.localToGlobal(),
            e = new b.StageText;
            e.open(a.x, a.y);
            this.addEventListener(b.TouchEvent.TOUCH_BEGAN, this.onMouseDownHandler, this);
            this.stageText = e
        };
        a.prototype.setText = function(a) {
            this.stageText.setText(a)
        };
        a.prototype.getText = function() {
            return this.stageText.getText()
        };
        a.prototype.onMouseDownHandler = function() {};
        a.prototype._onRemoveFromStage = function() {
            this.stageText.remove()
        };
        a.prototype._measureBounds = function() {
            return b.Rectangle.identity
        };
        return a
    } (b.DisplayObject);
    b.TextInput = d;
    d = function() {
        function b() {}
        b.prototype.editBoxEditingDidBegin = function(a) {};
        b.prototype.editBoxEditingDidEnd = function(a) {};
        b.prototype.editBoxTextChanged = function(a, f) {};
        b.prototype.editBoxReturn = function(a) {};
        return b
    } ();
    b.TextInputDegelete = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a(a, e) {
            c.call(this);
            this.data = a;
            this.texture = e;
            this._resPool = {};
            this._currentInterval = this._interval = this._totalFrame = this._currentFrameIndex = 0;
            this._isPlaying = !1;
            this._passTime = 0;
            this._oneFrameTime = 1E3 / b.Ticker.getInstance().getFrameRate();
            this._frameData = JSON.parse(a)
        }
        __extends(a, c);
        a.prototype.gotoAndPlay = function(a) {
            this.checkHasFrame(a);
            this._isPlaying = !0;
            this._currentInterval = this._currentFrameIndex = 0;
            this._currentFrameName = a;
            this._totalFrame = this._frameData.frames[a].totalFrame;
            this.playNextFrame();
            this._passTime = 0;
            b.Ticker.getInstance().register(this.update, this)
        };
        a.prototype.gotoAndStop = function(a) {
            this.checkHasFrame(a);
            this.stop();
            this._currentInterval = this._currentFrameIndex = 0;
            this._currentFrameName = a;
            this._totalFrame = this._frameData.frames[a].totalFrame;
            this.playNextFrame()
        };
        a.prototype.checkHasFrame = function(a) {
            void 0 == this._frameData.frames[a] && b.Logger.fatal("MovieClip\u6ca1\u6709\u5bf9\u5e94\u7684frame\uff1a", a)
        };
        a.prototype.stop = function() {
            this._isPlaying = !1;
            b.Ticker.getInstance().unregister(this.update, this)
        };
        a.prototype.update = function(a) {
            if (this._interval != this._currentInterval) this._currentInterval++;
            else {
                for (var b = Math.floor((this._passTime % this._oneFrameTime + a) / this._oneFrameTime); 1 <= b;) 1 == b ? this.playNextFrame() : this.playNextFrame(!1),
                b--;
                this._passTime += a
            }
        };
        a.prototype.playNextFrame = function(a) {
            "undefined" === typeof a && (a = !0);
            this._currentInterval = 0;
            var b = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            a && (a = this.getBitmap(b.res), a.x = b.x, a.y = b.y, this.removeAllChildren(), this.addChild(a));
            null != b.action && this.dispatchEvent(b.action);
            this._currentFrameIndex++;
            this._currentFrameIndex == this._totalFrame && (this._currentFrameIndex = 0)
        };
        a.prototype.getBitmap = function(a) {
            var e;
            if (null != this._resPool[a]) e = this._resPool[a];
            else {
                var c = this._frameData.res[a];
                e = b.Bitmap.initWithTexture(this.texture);
                var d = new b.SpriteSheetFrame;
                d.x = c.resX;
                d.y = c.resY;
                d.w = c.resW;
                d.h = c.resH;
                e.spriteFrame = d;
                this._resPool[a] = e
            }
            return e
        };
        a.prototype.release = function() {
            this._resPool = {}
        };
        a.prototype.getCurrentFrameIndex = function() {
            return this._currentFrameIndex
        };
        a.prototype.getTotalFrame = function() {
            return this._totalFrame
        };
        a.prototype.setInterval = function(a) {
            this._interval = a
        };
        a.prototype.getIsPlaying = function() {
            return this._isPlaying
        };
        return a
    } (b.DisplayObjectContainer);
    b.MovieClip = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this._frames = [];
            this._currentFrame = 1;
            this._scale = 1.1;
            this._initScaleY = this._initScaleX = 0;
            this.touchEnabled = this.hasZoomOut = !0
        }
        __extends(a, c);
        a.prototype._onAddToStage = function() {
            c.prototype._onAddToStage.call(this);
            this.addListeners();
            this._initScaleX = this.scaleX;
            this._initScaleY = this.scaleY
        };
        a.prototype._onRemoveFromStage = function() {
            c.prototype._onRemoveFromStage.call(this);
            this.removeListeners()
        };
        a.prototype.addListeners = function() {
            this.addEventListener(b.TouchEvent.TOUCH_BEGAN, this.mouseDown, this)
        };
        a.prototype.removeListeners = function() {
            this.removeEventListener(b.TouchEvent.TOUCH_BEGAN, this.mouseDown, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_END, this.mouseUp, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this)
        };
        a.prototype.mouseDown = function(a, e) {
            this._isMoved = !1;
            b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_END, this.mouseUp, this);
            b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this._startX = e.stageX;
            this._startY = e.stageY;
            this.playZoomOut(!1);
            this.setFrameChild(2)
        };
        a.prototype.mouseUp = function() {
            this._isMoved || (this.playZoomOut(!0), this.setFrameChild(1), this.onClick());
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_END, this.mouseUp, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this)
        };
        a.prototype.mouseMove = function(a, e) {
            var c = e.stageY;
            10 > Math.abs(e.stageX - this._startX) && 10 > Math.abs(c - this._startY) || (this._isMoved = !0, this.playZoomOut(!0), this.setFrameChild(1), b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this))
        };
        a.prototype.addOnClick = function(a, b) {
            this._callBack = a;
            this._target = b
        };
        a.prototype.onClick = function() {
            this._callBack && this._target && this._callBack.apply(this._target, [])
        };
        a.prototype.setEnabled = function(a) {
            this.touchEnabled = a
        };
        a.prototype.setFontText = function(a) {};
        a.prototype.setFontColor = function(a) {};
        a.prototype.playZoomOut = function(a) {
            this.hasZoomOut && (this.scaleX = a ? this._initScaleX: this._initScaleX * this._scale, this.scaleY = a ? this._initScaleY: this._initScaleY * this._scale)
        };
        a.prototype.initFrameRes = function(a, b, c) {
            this._currentFrame = b;
            this._frameRes = a;
            this._frames[b - 1] = c
        };
        a.prototype.changeBtn = function(a) {
            if (this._frameRes != a) {
                this._frameRes = a;
                for (var b = a = 0; b < this._frames.length; b++) {
                    var c = this._frames[b];
                    c && (a = this.getChildIndex(c), this.removeChild(c), this._frames[b] = null)
                }
                this.setFrameChild(this._currentFrame, a)
            }
        };
        a.prototype.setFrameChild = function(a, e) {
            "undefined" === typeof e && (e = 0);
            if (this._frameRes) {
                var c = this.getFrameChild(this._currentFrame),
                d = e;
                c && (c.visible = !1, d = this.getChildIndex(c));
                c = this.getFrameChild(a);
                if (null == c) {
                    c = this.getIndexRes(this._frameRes, 1, a);
                    c = b.TextureCache.getInstance().getTexture(c);
                    c = b.Bitmap.initWithTexture(c);
                    this._frames[a - 1] = c;
                    c.relativeAnchorPointX = 0.5;
                    c.relativeAnchorPointY = 0.5;
                    var g = this.getBounds();
                    c.x = g.width / 2;
                    c.y = g.height / 2;
                    this.addChild(c, d)
                }
                c.visible = !0;
                this._currentFrame = a
            }
        };
        a.prototype.getFrameChild = function(a) {
            return this._frames[a - 1]
        };
        a.prototype.getIndexRes = function(a, e, c) {
            var d = a.lastIndexOf(".");
            d < e && b.Logger.fatal("the argument [count] too large");
            e = a.substring(0, d - e);
            a = a.substring(d);
            return e + c + a
        };
        return a
    } (b.DisplayObjectContainer);
    b.SimpleButton = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this._initY = this._initX = 0;
            this._deltaTime = 200;
            this.direction = b.Direction.BOTH;
            this.touchEnabled = !0;
            this._endY = this._endX = 0;
            this.mask = new b.Rectangle(0, 0, 100, 100)
        }
        __extends(a, c);
        a.prototype._onAddToStage = function() {
            c.prototype._onAddToStage.call(this);
            this.addListeners()
        };
        a.prototype._onRemoveFromStage = function() {
            c.prototype._onRemoveFromStage.call(this);
            this.removeListeners()
        };
        a.prototype.setContentSize = function(a, b) {
            c.prototype.setContentSize.call(this, a, b);
            this._viewWidth = a;
            this._viewHeight = b;
            this.mask.width = a;
            this.mask.height = b
        };
        a.prototype.setContainer = function(a, b, c) {
            this._container && this._container.parent && this._container.parent.removeChild(this._container);
            this._container = a;
            this._initWidth = b;
            this._initHeight = c;
            this._endY = this._endX = 0;
            this.addChild(this._container, 0)
        };
        a.prototype.mouseDown = function(a, e) {
            this.touchEnabled && null != this._container && (this._isMoved = !1, b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_END, this.mouseUp, this), b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_CANCEL, this.mouseUp, this), b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this), console.log("begin"), b.Tween.removeTweens(this._container), this._initX = this._container.x, this._initY = this._container.y, this._endX = this._container.x, this._endY = this._container.y, this._downPX = e.stageX, this._downPY = e.stageY, this._downTime = b.Ticker.now())
        };
        a.prototype.mouseUp = function(a, e) {
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_END, this.mouseUp, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_CANCEL, this.mouseUp, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            console.log("end");
            var c = b.Ticker.now();
            if (c - this._downTime > this._deltaTime) this.backToPosition();
            else {
                var d = e.stageX - this._downPX,
                g = e.stageY - this._downPY,
                c = 2 * Math.floor(this._deltaTime / (c - this._downTime));
                if (this.direction == b.Direction.BOTH || this.direction == b.Direction.HORIZONTAL) this._endX += d * c;
                if (this.direction == b.Direction.BOTH || this.direction == b.Direction.VERTICAL) this._endY += g * c;
                d = Math.max(100 * c, 100);
                d = Math.min(d, 300);
                g = b.Tween.get(this._container, {
                    onChange: this.moveList,
                    onChangeObj: this
                });
                g.to({
                    x: this._endX,
                    y: this._endY
                },
                d);
                g.call(this.backToPosition, this)
            }
        };
        a.prototype.mouseMove = function(a, e) {
            var c = e.stageX - this._downPX,
            d = e.stageY - this._downPY;
            if (this.direction == b.Direction.BOTH || this.direction == b.Direction.HORIZONTAL) this._endX = this._initX + c;
            if (this.direction == b.Direction.BOTH || this.direction == b.Direction.VERTICAL) this._endY = this._initY + d;
            this._container.x = this._endX;
            this._container.y = this._endY;
            this.moveList()
        };
        a.prototype.backToPosition = function() {
            var a = !1;
            0 < this._endX ? (a = !0, this._endX = 0) : this._endX < this._viewWidth - this._initWidth && (a = !0, this._endX = this._viewWidth >= this._initWidth ? 0 : this._viewWidth - this._initWidth);
            0 < this._endY ? (a = !0, this._endY = 0) : this._endY < this._viewHeight - this._initHeight && (a = !0, this._endY = this._viewHeight >= this._initHeight ? 0 : this._viewHeight - this._initHeight);
            a && b.Tween.get(this._container, {
                onChange: this.moveList,
                onChangeObj: this
            }).to({
                x: this._endX,
                y: this._endY
            },
            200)
        };
        a.prototype.moveList = function() {};
        a.prototype.addListeners = function() {
            this.addEventListener(b.TouchEvent.TOUCH_BEGAN, this.mouseDown, this)
        };
        a.prototype.removeListeners = function() {
            this.removeEventListener(b.TouchEvent.TOUCH_BEGAN, this.mouseDown, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_CANCEL, this.mouseUp, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_END, this.mouseUp, this);
            b.MainContext.instance.stage.removeEventListener(b.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            console.log("remove")
        };
        return a
    } (b.DisplayObjectContainer);
    b.ScrollView = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this._currentIndex = 0;
            this._itemArr = [];
            this.disappearContainer = new b.DisplayObjectContainer;
            this.addChild(this.disappearContainer)
        }
        __extends(a, c);
        a.prototype.setContentSize = function(a, b) {
            c.prototype.setContentSize.call(this, a, b)
        };
        a.prototype.setList = function(a, e, c, d, g) {
            this._dataArr = a || [];
            this._delegate = c;
            this._itemWidth = d;
            this._itemHeight = g;
            this.direction = e;
            a = new b.DisplayObjectContainer;
            this.direction == b.Direction.HORIZONTAL ? this.setContainer(a, this._itemWidth * this._dataArr.length, this._itemHeight) : this.setContainer(a, this._itemWidth, this._itemHeight * this._dataArr.length);
            this.initItemList()
        };
        a.prototype.initItemList = function() {
            if (! (0 == this._itemWidth || 0 == this._itemHeight || 0 == this._viewWidth || 0 == this._viewHeight)) {
                var a = 0,
                a = this.direction == b.Direction.HORIZONTAL ? Math.ceil(this._viewWidth / this._itemWidth) + 1 : Math.ceil(this._viewHeight / this._itemHeight) + 1;
                this._itemArr = [];
                for (var e = 0; e < a; e++) {
                    var c = this._delegate.createItemRenderer();
                    this._container.addChild(c);
                    this._itemArr.push(c);
                    this.initItem(c, e)
                }
                this._currentIndex = 0
            }
        };
        a.prototype.moveList = function() {
            var a = 0,
            a = this.direction == b.Direction.HORIZONTAL ? Math.floor( - this._container.x / this._itemWidth) : Math.floor( - this._container.y / this._itemHeight);
            a > this._dataArr.length - this._itemArr.length ? a = this._dataArr.length - this._itemArr.length: 0 > a && (a = 0);
            if (a != this._currentIndex) {
                var e = a - this._currentIndex;
                console.log("deltaIdx " + e);
                console.log("current " + a);
                console.log("this._currentIndex " + this._currentIndex);
                if (0 > e) for (var c = 0; c < -e; c++) {
                    var d = this._container.getChildAt(this._container.numChildren - 1);
                    this._container.setChildIndex(d, 0);
                    var g = a + ( - e - 1) - c;
                    this.initItem(d, g)
                } else for (var m = this._container.numChildren,
                c = 0; c < e; c++) d = this._container.getChildAt(0),
                this._container.setChildIndex(d, -1),
                g = e >= m ? a + c: a + m - 1 - (e - 1 - c),
                this.initItem(d, g);
                this._currentIndex = a
            }
        };
        a.prototype.initItem = function(a, e) {
            e >= this._dataArr.length ? a.visible = !1 : 0 > e ? a.visible = !1 : (a.visible = !0, console.log("item index " + e), this._delegate.updateItemRenderer(a, this._dataArr[e], e));
            this.direction == b.Direction.HORIZONTAL ? a.x = this._itemWidth * e: a.y = this._itemHeight * e
        };
        return a
    } (b.ScrollView);
    b.TableView = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {
            this.renderCost = 0
        }
        c.prototype.clearScreen = function() {};
        c.prototype.clearRect = function(a, f, b, c) {};
        c.prototype.drawImage = function(a, f, e, c, d, g, m, n, r) {
            b.Profiler.getInstance().onDrawImage()
        };
        c.prototype.transform = function(a) {};
        c.prototype.translate = function(a, f) {};
        c.prototype.save = function() {};
        c.prototype.restore = function() {};
        c.prototype.setAlpha = function(a, f) {};
        c.prototype.setupFont = function(a, f, b) {};
        c.prototype.measureText = function(a) {
            return b.Rectangle.identity
        };
        c.prototype.drawText = function(a, f, e, c, d, g, m) {
            b.Profiler.getInstance().onDrawImage()
        };
        c.prototype.clip = function(a, f, b, c) {};
        c.prototype.strokeRect = function(a, f, b, c, d) {};
        c.CONTENT_SCALE_FACTOR = 1;
        return c
    } ();
    b.RendererContext = d;
    d = function() {
        function c(a) {
            this.type = a;
            switch (a) {
            case "add":
                this.value = "lighter";
                break;
            default:
                this.value = "source-over"
            }
        }
        c.getBlendMode = function(a) {
            return ! a ? b.BlendMode.NORMAL: b.BlendMode[a.toUpperCase()]
        };
        c.NORMAL = new c("normal");
        c.ADD = new c("add");
        return c
    } ();
    b.BlendMode = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a(a) {
            this.canvas = a;
            this.canvasContext = a.getContext("2d");
            c.call(this)
        }
        __extends(a, c);
        a.prototype.clearScreen = function() {
            var a = this.canvas;
            this.canvasContext.setTransform(1, 0, 0, 1, 0, 0);
            this.clearRect(0, 0, a.width, a.height);
            this.renderCost = 0
        };
        a.prototype.clearRect = function(a, b, c, d) {
            this.canvasContext.clearRect(a, b, c, d)
        };
        a.prototype.drawImage = function(a, e, d, l, g, m, n, r, h) {
            b.DEBUG && b.DEBUG.DRAW_IMAGE && b.DEBUG.checkDrawImage(a, e, d, l, g, m, n, r, h);
            a = a._bitmapData;
            r = r * b.RendererContext.CONTENT_SCALE_FACTOR + 0.5;
            h = h * b.RendererContext.CONTENT_SCALE_FACTOR + 0.5;
            this.canvasContext.drawImage(a, e, d, l, g, m, n, r, h);
            c.prototype.drawImage.call(this, a, e, d, l, g, m, n, r, h)
        };
        a.prototype.transform = function(a) {
            b.StageDelegate.getInstance();
            this.canvasContext.transform(a.a, a.b, a.c, a.d, a.tx, a.ty)
        };
        a.prototype.translate = function(a, b) {
            this.canvasContext.translate(a, b)
        };
        a.prototype.save = function() {
            this.canvasContext.save()
        };
        a.prototype.restore = function() {
            this.canvasContext.restore()
        };
        a.prototype.setAlpha = function(a, b) {
            1 != a && (this.canvasContext.globalAlpha *= a);
            b && (this.canvasContext.globalCompositeOperation = b.value)
        };
        a.prototype.setupFont = function(a, b, c) {
            var d = this.canvasContext;
            d.font = a;
            d.textAlign = b || "left";
            d.textBaseline = c || "top"
        };
        a.prototype.measureText = function(a) {
            a = this.canvasContext.measureText(a);
            var e = b.Rectangle.identity;
            e.width = a.width;
            e.height = a.height;
            return e
        };
        a.prototype.drawText = function(a, b, d, l, g, m, n) {
            var r = this.canvasContext;
            r.fillStyle = m;
            r.strokeStyle = n;
            g && r.strokeText(a, b, d, l || 65535);
            r.fillText(a, b, d, l || 65535);
            c.prototype.drawText.call(this, a, b, d, l, g, m, n)
        };
        a.prototype.clip = function(a, e, c, d) {
            b.StageDelegate.getInstance();
            this.canvasContext.beginPath();
            this.canvasContext.rect(a, e, c, d);
            this.canvasContext.clip();
            this.canvasContext.closePath()
        };
        a.prototype.strokeRect = function(a, b, c, d, g) {
            this.canvasContext.strokeStyle = g;
            this.canvasContext.strokeRect(a, b, c, d)
        };
        return a
    } (b.RendererContext);
    b.HTML5CanvasRenderer = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function a(a) {
            this.canvas = a;
            this._currentTouchTarget = {};
            this.maxTouchs = 2
        }
        a.prototype.run = function() {
            var a = this;
            "ontouchstart" in window ? (this.canvas.addEventListener("touchstart",
            function(b) {
                for (var c = b.changedTouches.length,
                d = 0; d < c && d < a.maxTouchs; d++) a.onTouchBegin(b.changedTouches[d]);
                b.stopPropagation();
                b.preventDefault()
            },
            !1), this.canvas.addEventListener("touchmove",
            function(b) {
                for (var c = b.changedTouches.length,
                d = 0; d < c && d < a.maxTouchs; d++) a.onTouchMove(b.changedTouches[d]);
                b.stopPropagation();
                b.preventDefault()
            },
            !1), this.canvas.addEventListener("touchend",
            function(b) {
                for (var c = b.changedTouches.length,
                d = 0; d < c && d < a.maxTouchs; d++) a.onTouchEnd(b.changedTouches[d]);
                b.stopPropagation();
                b.preventDefault()
            },
            !1), this.canvas.addEventListener("touchcancel",
            function(b) {
                for (var c = b.changedTouches.length,
                d = 0; d < c && d < a.maxTouchs; d++) a.onTouchEnd(b.changedTouches[d]);
                b.stopPropagation();
                b.preventDefault()
            },
            !1)) : (this.canvas.addEventListener("mousedown",
            function(b) {
                a.onTouchBegin(b)
            }), this.canvas.addEventListener("mousemove",
            function(b) {
                a.onTouchMove(b)
            }), this.canvas.addEventListener("mouseup",
            function(b) {
                a.onTouchEnd(b)
            }))
        };
        a.prototype.onTouchBegin = function(f) {
            var e = a.getLocation(this.canvas, f),
            d = e.x,
            l = e.y;
            if (e = b.MainContext.instance.stage.hitTest(d, l)) f = this.getTouchData(f, d, l),
            f.target = e,
            f.beginTarget = e,
            a.dispachEvent(c.TOUCH_BEGAN, f),
            console.log(e)
        };
        a.prototype.onTouchMove = function(f) {
            var e = a.getLocation(this.canvas, f),
            d = e.x,
            l = e.y;
            if (e = b.MainContext.instance.stage.hitTest(d, l)) f = this.getTouchData(f, d, l),
            f.target = e,
            a.dispachEvent(c.TOUCH_MOVE, f)
        };
        a.prototype.onTouchEnd = function(f) {
            var e = a.getLocation(this.canvas, f),
            d = e.x,
            l = e.y;
            if (e = b.MainContext.instance.stage.hitTest(d, l)) {
                f = this.getTouchData(f, d, l);
                if (d = f.beginTarget) f.target = f.beginTarget,
                a.dispachEvent(c.TOUCH_CANCEL, f);
                f.target = e;
                a.dispachEvent(c.TOUCH_END, f);
                d === e && a.dispachEvent(c.TOUCH_TAP, f);
                delete this._currentTouchTarget[f.identifier]
            }
        };
        a.prototype.getTouchData = function(a, b, c) {
            var d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            a = this._currentTouchTarget[d];
            null == a && (a = {});
            this._currentTouchTarget[d] = a;
            a.stageX = b;
            a.stageY = c;
            a.identifier = d;
            return a
        };
        a.dispachEvent = function(a, b) {
            var d = b.target,
            l = c.identity;
            l.touchId = b.identifier;
            l.stageX = b.stageX;
            l.stageY = b.stageY;
            l.target = d;
            for (var g = [], m = d; m.parent;) g.unshift(m.parent),
            m = m.parent;
            g.push(d);
            for (var d = g.length,
            n = d - 1; 0 <= n; n--) g.push(g[n]);
            d = g.length;
            for (n = 0; n < d && !(m = g[n], m.isUseCapture = n < d / 2 ? !0 : !1, l.currentTarget = m, m.dispatchEvent(a, l)); n++);
        };
        a.getLocation = function(a, c) {
            var d = document.documentElement,
            l = window,
            g, m;
            "function" === typeof a.getBoundingClientRect ? (m = a.getBoundingClientRect(), g = m.left, m = m.top) : m = g = 0;
            g += l.pageXOffset - d.clientLeft;
            m += l.pageYOffset - d.clientTop;
            null != c.pageX ? (d = c.pageX, l = c.pageY) : (g -= document.body.scrollLeft, m -= document.body.scrollTop, d = c.clientX, l = c.clientY);
            var n = b.Point.identity;
            n.x = (d - g) / b.StageDelegate.getInstance().getScaleX();
            n.y = (l - m) / b.StageDelegate.getInstance().getScaleY();
            return n
        };
        return a
    } ();
    b.TouchContext = d;
    var c = function() {
        function a() {}
        a.prototype.getLocalPoint = function() {
            return this.currentTarget.globalToLocal(this.stageX, this.stageY)
        };
        a.TOUCH_BEGAN = "touchBegan";
        a.TOUCH_END = "touchEnd";
        a.TOUCH_CANCEL = "touchCancel";
        a.TOUCH_TAP = "touchTap";
        a.TOUCH_MOVE = "touchMove";
        a.identity = new a;
        return a
    } ();
    b.TouchEvent = c
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a(b, e) {
            c.call(this);
            this.type = this.url = null;
            this.state = a.LOAD_STATE_INIT;
            this.data = null;
            this.url = b;
            this.type = e
        }
        __extends(a, c);
        a.create = function(f, c) {
            "undefined" === typeof c && (c = "");
            if (null == a.__pool[f]) {
                var d = f.substring(f.lastIndexOf(".") + 1),
                d = a.__registerMap[d];
                d || (d = b.ResourceLoader);
                a.__pool[f] = new d(f, c)
            }
            return a.__pool[f]
        };
        a.registerHandler = function(b, c) {
            a.__registerMap[b] = c
        };
        a.prototype.load = function() {
            switch (this.state) {
            case a.LOAD_STATE_INIT:
                this.startLoading();
                break;
            case a.LOAD_STATE_LOADED:
                b.Ticker.getInstance().callLater(this._executeAllCallback, this)
            }
        };
        a.prototype.startLoading = function() {
            this.type == a.DATA_TYPE_IMAGE ? this._loadByImage() : this._loadByAjax()
        };
        a.prototype._executeAllCallback = function(b) {
            this.state = a.LOAD_STATE_LOADED;
            b && (this.data = b);
            if (this.onLoadComplete) this.onLoadComplete(this.data);
            this.dispatchEvent(a.LOAD_COMPLETE, this.data)
        };
        a.prototype._loadByAjax = function() {
            var f = this,
            c = new b.URLRequest(a.prefix + this.url,
            function(a) {
                a = f._processXMLHttpResponse(a);
                f._executeAllCallback(a)
            },
            this);
            c.type = this.type;
            b.NetContext.getInstance().send(c)
        };
        a.prototype._loadByImage = function() {
            var f = new Image;
            f.crossOrigin = "Anonymous";
            var c = a.prefix + this.url,
            d = this,
            l = function() {
                var a = b.Texture.create(d.url);
                a.setBitmapData(f);
                b.TextureCache.getInstance().addTexture(d.url, a);
                d._executeAllCallback(f);
                f.removeEventListener("load", l);
                f.removeEventListener("error", l)
            },
            g = function() {
                b.TextureCache.getInstance().removeTexture(d.url);
                f.removeEventListener("error", g)
            };
            f.addEventListener("load", l);
            f.addEventListener("error", g);
            f.src = c;
            return f
        };
        a.prototype._setXMLHttpRequestHeader = function(b) { 
            /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? this.type == a.DATA_TYPE_BINARY ? b.setRequestHeader("Accept-Charset", "x-user-defined") : b.setRequestHeader("Accept-Charset", "utf-8") : b.overrideMimeType && (this.type == a.DATA_TYPE_BINARY ? b.overrideMimeType("text/plain; charset\x3dx-user-defined") : b.overrideMimeType("text/plain; charset\x3dutf-8"))
        };
        a.prototype._processXMLHttpResponse = function(b) {
            if (this.type == a.DATA_TYPE_TEXT) return b.responseText;
            var c;
            if (!/msie/i.test(navigator.userAgent) || /opera/i.test(navigator.userAgent)) c = b.responseText;
            return this._stringConvertToArray(c)
        };
        a.prototype._stringConvertToArray = function(a) {
            if (!a) return null;
            for (var b = new Uint8Array(a.length), c = 0; c < a.length; c++) b[c] = a.charCodeAt(c) & 255;
            return b
        };
        a.LOAD_COMPLETE = "resource_load_complete";
        a.DATA_TYPE_BINARY = "binary";
        a.DATA_TYPE_TEXT = "text";
        a.DATA_TYPE_IMAGE = "image";
        a.LOAD_STATE_INIT = 0;
        a.LOAD_STATE_LOADED = 1;
        a.__pool = {};
        a.prefix = "";
        a.__registerMap = {};
        return a
    } (b.EventDispatcher);
    b.ResourceLoader = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments);
            this._resourceUrlList = null;
            this._currentIndex = 0;
            this._state = b.LoadingController.LOAD_STATE_IDLE
        }
        __extends(a, c);
        a.prototype.addResource = function(a, c) {
            "undefined" === typeof c && (c = null);
            if (!this.checkIsLoading()) {
                null == this._resourceUrlList && (this._resourceUrlList = []);
                var d = b.ResourceLoader.create(a, c); - 1 == this._resourceUrlList.indexOf(d) && d.state != b.ResourceLoader.LOAD_STATE_LOADED && this._resourceUrlList.push(d)
            }
        };
        a.prototype.load = function() {
            this.checkIsLoading() || (null != this._resourceUrlList && 0 < this._resourceUrlList.length ? (this._state = a.LOAD_STATE_LOADING, this._currentIndex = 0, null != this._loadingView && this._loadingView.addToStage(), this.next()) : b.Ticker.getInstance().callLater(this.onComplete, this))
        };
        a.prototype.onComplete = function() {
            this._state = a.LOAD_STATE_IDLE;
            this.dispatchEvent(b.ResourceLoader.LOAD_COMPLETE);
            this.destroy()
        };
        a.prototype.checkIsLoading = function() {
            return this._state == a.LOAD_STATE_LOADING ? (b.Logger.info("\u6b63\u5728\u52a0\u8f7d\u4e2d"), !0) : !1
        };
        a.prototype.next = function() {
            this.removeResourceEvent();
            this.onProgress();
            if (this._resourceUrlList.length > this._currentIndex) this._currentResource = this._resourceUrlList[this._currentIndex],
            this._currentResource.addEventListener(b.ResourceLoader.LOAD_COMPLETE, this.next, this),
            this._currentResource.load();
            else this.onComplete();
            this._currentIndex++
        };
        a.prototype.removeResourceEvent = function() {
            this._currentResource && (this._currentResource.removeEventListener(b.ResourceLoader.LOAD_COMPLETE, this.next, this), this._currentResource = null)
        };
        a.prototype.onProgress = function() {
            if (null != this._loadingView) this._loadingView.onProgress(this._currentIndex, this._resourceUrlList.length)
        };
        a.prototype.setLoadingView = function(a) {
            null != this._loadingView && (this._loadingView.removeFromStage(), this._loadingView = null);
            this._loadingView = a
        };
        a.prototype.destroy = function() {
            this.removeResourceEvent();
            null != this._loadingView && (this._loadingView.removeFromStage(), this._loadingView = null);
            this._resourceUrlList = null
        };
        a.LOAD_STATE_IDLE = 0;
        a.LOAD_STATE_LOADING = 1;
        return a
    } (b.EventDispatcher);
    b.LoadingController = d;
    d = function() {
        return function() {}
    } ();
    b.LoadingEvent = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function b() {
            this._textureHeight = this._textureWidth = 0
        }
        b.create = function(a) {
            var f = new b;
            f._path = a;
            return f
        };
        b.createWithBase64 = function(a) {
            var f = new b,
            e = new Image;
            e.src = a;
            f.setBitmapData(e);
            return f
        };
        b.prototype.setBitmapData = function(a) {
            this._bitmapData = a;
            this._textureWidth = a.width;
            this._textureHeight = a.height
        };
        b.prototype.getTextureWidth = function() {
            return this._textureWidth
        };
        b.prototype.getTextureHeight = function() {
            return this._textureHeight
        };
        return b
    } ();
    b.Texture = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function b() {
            this._textures = {};
            this._spritesheets = {}
        }
        b.getInstance = function() {
            null == b.instance && (b.instance = new b);
            return b.instance
        };
        b.prototype.addTexture = function(a, b) {
            this._textures[a] || (this._textures[a] = b)
        };
        b.prototype.removeTexture = function(a) {
            delete this._textures[a]
        };
        b.prototype.getTexture = function(a) {
            return this._textures[a]
        };
        b.prototype.addSpriteSheet = function(a, b, c) {
            this.addTexture(a, c);
            this._spritesheets[a] = b
        };
        b.prototype.removeSpriteSheet = function(a) {
            this.removeTexture(a);
            delete this._spritesheets[a]
        };
        b.prototype.getSpriteSheet = function(a) {
            return this._spritesheets[a]
        };
        return b
    } ();
    b.TextureCache = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function a() {}
        a.getInstance = function() {
            null == a.context && (a.context = new a);
            return a.context
        };
        a.prototype.send = function(a) {};
        a.STATE_COMPLETE = "XHRLoaderComplete";
        a.GET = "GET";
        a.POST = "POST";
        a.context = null;
        return a
    } ();
    b.NetContext = d;
    var c = function() {
        return function(a, b, c, k, l) {
            "undefined" === typeof k && (k = d.GET);
            "undefined" === typeof l && (l = void 0);
            this.url = a;
            this.callback = b;
            this.thisObj = c;
            this.method = k;
            this.data = l
        }
    } ();
    b.URLRequest = c
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments)
        }
        __extends(a, c);
        a.prototype.send = function(a) {
            var b = this._getXMLHttpRequest();
            b.open(a.method, a.url);
            void 0 != a.type && this._setXMLHttpRequestHeader(b, a.type);
            b.onreadystatechange = function() {
                4 == b.readyState && 200 == b.status && a.callback.apply(a.thisObj, [b])
            };
            b.send(a.data)
        };
        a.prototype._setXMLHttpRequestHeader = function(a, c) { 
            /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? c == b.ResourceLoader.DATA_TYPE_BINARY ? a.setRequestHeader("Accept-Charset", "x-user-defined") : a.setRequestHeader("Accept-Charset", "utf-8") : a.overrideMimeType && (c == b.ResourceLoader.DATA_TYPE_BINARY ? a.overrideMimeType("text/plain; charset\x3dx-user-defined") : a.overrideMimeType("text/plain; charset\x3dutf-8"))
        };
        a.prototype._getXMLHttpRequest = function() {
            return window.XMLHttpRequest ? new window.XMLHttpRequest: new ActiveXObject("MSXML2.XMLHTTP")
        };
        return a
    } (b.NetContext);
    b.HTML5NetContext = d
})(ns_egret || (ns_egret = {}));
ns_egret.Codec = {
    name: "Jacob__Codec"
};
ns_egret.Utils = {};
ns_egret.Utils.unzip = function() {
    return ns_egret.Codec.GZip.gunzip.apply(ns_egret.Codec.GZip, arguments)
};
ns_egret.Utils.unzipBase64 = function() {
    var b = ns_egret.Codec.Base64.decode.apply(ns_egret.Codec.Base64, arguments);
    return ns_egret.Codec.GZip.gunzip.apply(ns_egret.Codec.GZip, [b])
};
ns_egret.Utils.unzipBase64AsArray = function(b, d) {
    d = d || 1;
    var c = this.unzipBase64(b),
    a = [],
    f,
    e,
    k;
    f = 0;
    for (k = c.length / d; f < k; f++) {
        a[f] = 0;
        for (e = d - 1; 0 <= e; --e) a[f] += c.charCodeAt(f * d + e) << 8 * e
    }
    return a
};
ns_egret.Utils.unzipAsArray = function(b, d) {
    d = d || 1;
    var c = this.unzip(b),
    a = [],
    f,
    e,
    k;
    f = 0;
    for (k = c.length / d; f < k; f++) {
        a[f] = 0;
        for (e = d - 1; 0 <= e; --e) a[f] += c.charCodeAt(f * d + e) << 8 * e
    }
    return a
};
ns_egret.Utils.StringToArray = function(b) {
    b = b.split(",");
    var d = [],
    c;
    for (c = 0; c < b.length; c++) d.push(parseInt(b[c]));
    return d
};
ns_egret.Codec.Base64 = {
    name: "Jacob__Codec__Base64"
};
ns_egret.Codec.Base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d";
ns_egret.Codec.Base64.decode = function(b) {
    var d = [],
    c,
    a,
    f,
    e,
    k,
    l = 0;
    for (b = b.replace(/[^A-Za-z0-9\+\/\=]/g, ""); l < b.length;) c = this._keyStr.indexOf(b.charAt(l++)),
    a = this._keyStr.indexOf(b.charAt(l++)),
    e = this._keyStr.indexOf(b.charAt(l++)),
    k = this._keyStr.indexOf(b.charAt(l++)),
    c = c << 2 | a >> 4,
    a = (a & 15) << 4 | e >> 2,
    f = (e & 3) << 6 | k,
    d.push(String.fromCharCode(c)),
    64 != e && d.push(String.fromCharCode(a)),
    64 != k && d.push(String.fromCharCode(f));
    return d = d.join("")
};
ns_egret.Codec.Base64.decodeAsArray = function(b, d) {
    var c = this.decode(b),
    a = [],
    f,
    e,
    k;
    f = 0;
    for (k = c.length / d; f < k; f++) {
        a[f] = 0;
        for (e = d - 1; 0 <= e; --e) a[f] += c.charCodeAt(f * d + e) << 8 * e
    }
    return a
};
ns_egret.Utils.uint8ArrayToUint32Array = function(b) {
    if (0 != b.length % 4) return null;
    for (var d = b.length / 4,
    c = window.Uint32Array ? new Uint32Array(d) : [], a = 0; a < d; a++) {
        var f = 4 * a;
        c[a] = b[f] + 256 * b[f + 1] + 65536 * b[f + 2] + 16777216 * b[f + 3]
    }
    return c
};
ns_egret.Codec.GZip = function(b) {
    this.data = b;
    this.debug = !1;
    this.gpflags = void 0;
    this.files = 0;
    this.unzipped = [];
    this.buf32k = Array(32768);
    this.bIdx = 0;
    this.modeZIP = !1;
    this.bytepos = 0;
    this.bb = 1;
    this.bits = 0;
    this.nameBuf = [];
    this.fileout = void 0;
    this.literalTree = Array(ns_egret.Codec.GZip.LITERALS);
    this.distanceTree = Array(32);
    this.treepos = 0;
    this.Places = null;
    this.len = 0;
    this.fpos = Array(17);
    this.fpos[0] = 0;
    this.fmax = this.flens = void 0
};
ns_egret.Codec.GZip.gunzip = function(b) {
    return (new ns_egret.Codec.GZip(b)).gunzip()[0][0]
};
ns_egret.Codec.GZip.HufNode = function() {
    this.b1 = this.b0 = 0;
    this.jump = null;
    this.jumppos = -1
};
ns_egret.Codec.GZip.LITERALS = 288;
ns_egret.Codec.GZip.NAMEMAX = 256;
ns_egret.Codec.GZip.bitReverse = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255];
ns_egret.Codec.GZip.cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
ns_egret.Codec.GZip.cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99];
ns_egret.Codec.GZip.cpdist = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
ns_egret.Codec.GZip.cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
ns_egret.Codec.GZip.border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
ns_egret.Codec.GZip.prototype.gunzip = function() {
    this.outputArr = [];
    this.nextFile();
    return this.unzipped
};
ns_egret.Codec.GZip.prototype.readByte = function() {
    this.bits += 8;
    return this.bytepos < this.data.length ? this.data.charCodeAt(this.bytepos++) : -1
};
ns_egret.Codec.GZip.prototype.byteAlign = function() {
    this.bb = 1
};
ns_egret.Codec.GZip.prototype.readBit = function() {
    var b;
    this.bits++;
    b = this.bb & 1;
    this.bb >>= 1;
    0 == this.bb && (this.bb = this.readByte(), b = this.bb & 1, this.bb = this.bb >> 1 | 128);
    return b
};
ns_egret.Codec.GZip.prototype.readBits = function(b) {
    for (var d = 0,
    c = b; c--;) d = d << 1 | this.readBit();
    b && (d = ns_egret.Codec.GZip.bitReverse[d] >> 8 - b);
    return d
};
ns_egret.Codec.GZip.prototype.flushBuffer = function() {
    this.bIdx = 0
};
ns_egret.Codec.GZip.prototype.addBuffer = function(b) {
    this.buf32k[this.bIdx++] = b;
    this.outputArr.push(String.fromCharCode(b));
    32768 == this.bIdx && (this.bIdx = 0)
};
ns_egret.Codec.GZip.prototype.IsPat = function() {
    for (;;) {
        if (this.fpos[this.len] >= this.fmax) return - 1;
        if (this.flens[this.fpos[this.len]] == this.len) return this.fpos[this.len]++;
        this.fpos[this.len]++
    }
};
ns_egret.Codec.GZip.prototype.Rec = function() {
    var b = this.Places[this.treepos],
    d;
    if (17 == this.len) return - 1;
    this.treepos++;
    this.len++;
    d = this.IsPat();
    if (0 <= d) b.b0 = d;
    else if (b.b0 = 32768, this.Rec()) return - 1;
    d = this.IsPat();
    if (0 <= d) b.b1 = d,
    b.jump = null;
    else if (b.b1 = 32768, b.jump = this.Places[this.treepos], b.jumppos = this.treepos, this.Rec()) return - 1;
    this.len--;
    return 0
};
ns_egret.Codec.GZip.prototype.CreateTree = function(b, d, c, a) {
    this.Places = b;
    this.treepos = 0;
    this.flens = c;
    this.fmax = d;
    for (b = 0; 17 > b; b++) this.fpos[b] = 0;
    this.len = 0;
    return this.Rec() ? -1 : 0
};
ns_egret.Codec.GZip.prototype.DecodeValue = function(b) {
    for (var d, c, a = 0,
    f = b[a];;) if (d = this.readBit()) {
        if (! (f.b1 & 32768)) return f.b1;
        f = f.jump;
        d = b.length;
        for (c = 0; c < d; c++) if (b[c] === f) {
            a = c;
            break
        }
    } else {
        if (! (f.b0 & 32768)) return f.b0;
        a++;
        f = b[a]
    }
    return - 1
};
ns_egret.Codec.GZip.prototype.DeflateLoop = function() {
    var b, d, c, a, f;
    do
    if (b = this.readBit(), c = this.readBits(2), 0 == c) {
        this.byteAlign();
        c = this.readByte();
        c |= this.readByte() << 8;
        d = this.readByte();
        d |= this.readByte() << 8;
        for ((c ^ ~d) & 65535 && document.write("BlockLen checksum mismatch\n"); c--;) d = this.readByte(),
        this.addBuffer(d)
    } else if (1 == c) for (;;) if (c = ns_egret.Codec.GZip.bitReverse[this.readBits(7)] >> 1, 23 < c ? (c = c << 1 | this.readBit(), 199 < c ? (c -= 128, c = c << 1 | this.readBit()) : (c -= 48, 143 < c && (c += 136))) : c += 256, 256 > c) this.addBuffer(c);
    else if (256 == c) break;
    else {
        var e;
        c -= 257;
        f = this.readBits(ns_egret.Codec.GZip.cplext[c]) + ns_egret.Codec.GZip.cplens[c];
        c = ns_egret.Codec.GZip.bitReverse[this.readBits(5)] >> 3;
        8 < ns_egret.Codec.GZip.cpdext[c] ? (e = this.readBits(8), e |= this.readBits(ns_egret.Codec.GZip.cpdext[c] - 8) << 8) : e = this.readBits(ns_egret.Codec.GZip.cpdext[c]);
        e += ns_egret.Codec.GZip.cpdist[c];
        for (c = 0; c < f; c++) d = this.buf32k[this.bIdx - e & 32767],
        this.addBuffer(d)
    } else if (2 == c) {
        var k = Array(320);
        d = 257 + this.readBits(5);
        e = 1 + this.readBits(5);
        a = 4 + this.readBits(4);
        for (c = 0; 19 > c; c++) k[c] = 0;
        for (c = 0; c < a; c++) k[ns_egret.Codec.GZip.border[c]] = this.readBits(3);
        f = this.distanceTree.length;
        for (a = 0; a < f; a++) this.distanceTree[a] = new ns_egret.Codec.GZip.HufNode;
        if (this.CreateTree(this.distanceTree, 19, k, 0)) return this.flushBuffer(),
        1;
        f = d + e;
        a = 0;
        for (var l = -1; a < f;) if (l++, c = this.DecodeValue(this.distanceTree), 16 > c) k[a++] = c;
        else if (16 == c) {
            var g;
            c = 3 + this.readBits(2);
            if (a + c > f) return this.flushBuffer(),
            1;
            for (g = a ? k[a - 1] : 0; c--;) k[a++] = g
        } else {
            c = 17 == c ? 3 + this.readBits(3) : 11 + this.readBits(7);
            if (a + c > f) return this.flushBuffer(),
            1;
            for (; c--;) k[a++] = 0
        }
        f = this.literalTree.length;
        for (a = 0; a < f; a++) this.literalTree[a] = new ns_egret.Codec.GZip.HufNode;
        if (this.CreateTree(this.literalTree, d, k, 0)) return this.flushBuffer(),
        1;
        f = this.literalTree.length;
        for (a = 0; a < f; a++) this.distanceTree[a] = new ns_egret.Codec.GZip.HufNode;
        c = [];
        for (a = d; a < k.length; a++) c[a - d] = k[a];
        if (this.CreateTree(this.distanceTree, e, c, 0)) return this.flushBuffer(),
        1;
        for (;;) if (c = this.DecodeValue(this.literalTree), 256 <= c) {
            c -= 256;
            if (0 == c) break;
            c--;
            f = this.readBits(ns_egret.Codec.GZip.cplext[c]) + ns_egret.Codec.GZip.cplens[c];
            c = this.DecodeValue(this.distanceTree);
            8 < ns_egret.Codec.GZip.cpdext[c] ? (e = this.readBits(8), e |= this.readBits(ns_egret.Codec.GZip.cpdext[c] - 8) << 8) : e = this.readBits(ns_egret.Codec.GZip.cpdext[c]);
            for (e += ns_egret.Codec.GZip.cpdist[c]; f--;) d = this.buf32k[this.bIdx - e & 32767],
            this.addBuffer(d)
        } else this.addBuffer(c)
    }
    while (!b);
    this.flushBuffer();
    this.byteAlign();
    return 0
};
ns_egret.Codec.GZip.prototype.unzipFile = function(b) {
    var d;
    this.gunzip();
    for (d = 0; d < this.unzipped.length; d++) if (this.unzipped[d][1] == b) return this.unzipped[d][0]
};
ns_egret.Codec.GZip.prototype.nextFile = function() {
    this.outputArr = [];
    this.modeZIP = !1;
    var b = [];
    b[0] = this.readByte();
    b[1] = this.readByte();
    120 == b[0] && 218 == b[1] && (this.DeflateLoop(), this.unzipped[this.files] = [this.outputArr.join(""), "geonext.gxt"], this.files++);
    31 == b[0] && 139 == b[1] && (this.skipdir(), this.unzipped[this.files] = [this.outputArr.join(""), "file"], this.files++);
    if (80 == b[0] && 75 == b[1] && (this.modeZIP = !0, b[2] = this.readByte(), b[3] = this.readByte(), 3 == b[2] && 4 == b[3])) {
        b[0] = this.readByte();
        b[1] = this.readByte();
        this.gpflags = this.readByte();
        this.gpflags |= this.readByte() << 8;
        b = this.readByte();
        b |= this.readByte() << 8;
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        var d = this.readByte(),
        d = d | this.readByte() << 8,
        c = this.readByte(),
        c = c | this.readByte() << 8,
        a = 0;
        for (this.nameBuf = []; d--;) {
            var f = this.readByte();
            "/" == f | ":" == f ? a = 0 : a < ns_egret.Codec.GZip.NAMEMAX - 1 && (this.nameBuf[a++] = String.fromCharCode(f))
        }
        this.fileout || (this.fileout = this.nameBuf);
        for (var a = 0; a < c;) this.readByte(),
        a++;
        8 == b && (this.DeflateLoop(), this.unzipped[this.files] = [this.outputArr.join(""), this.nameBuf.join("")], this.files++);
        this.skipdir()
    }
};
ns_egret.Codec.GZip.prototype.skipdir = function() {
    var b = [],
    d;
    this.gpflags & 8 && (b[0] = this.readByte(), b[1] = this.readByte(), b[2] = this.readByte(), b[3] = this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte());
    this.modeZIP && this.nextFile();
    b[0] = this.readByte();
    if (8 != b[0]) return 0;
    this.gpflags = this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    if (this.gpflags & 4) {
        b[0] = this.readByte();
        b[2] = this.readByte();
        this.len = b[0] + 256 * b[1];
        for (b = 0; b < this.len; b++) this.readByte()
    }
    if (this.gpflags & 8) {
        b = 0;
        for (this.nameBuf = []; d = this.readByte();) {
            if ("7" == d || ":" == d) b = 0;
            b < ns_egret.Codec.GZip.NAMEMAX - 1 && (this.nameBuf[b++] = d)
        }
    }
    if (this.gpflags & 16) for (; this.readByte(););
    this.gpflags & 2 && (this.readByte(), this.readByte());
    this.DeflateLoop();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.modeZIP && this.nextFile()
};
/*
 zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
(function() {
    function b(a) {
        throw a;
    }
    function d(a, b) {
        var c = a.split("."),
        f = H; ! (c[0] in f) && f.execScript && f.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());) ! c.length && b !== E ? f[e] = b: f = f[e] ? f[e] : f[e] = {}
    }
    function c(a) {
        if ("string" === typeof a) {
            a = a.split("");
            var b, c;
            b = 0;
            for (c = a.length; b < c; b++) a[b] = (a[b].charCodeAt(0) & 255) >>> 0
        }
        b = 1;
        c = 0;
        for (var f = a.length,
        e, d = 0; 0 < f;) {
            e = 1024 < f ? 1024 : f;
            f -= e;
            do b += a[d++],
            c += b;
            while (--e);
            b %= 65521;
            c %= 65521
        }
        return (c << 16 | b) >>> 0
    }
    function a(a, c) {
        this.index = "number" === typeof c ? c: 0;
        this.i = 0;
        this.buffer = a instanceof(w ? Uint8Array: Array) ? a: new(w ? Uint8Array: Array)(32768);
        2 * this.buffer.length <= this.index && b(Error("invalid index"));
        this.buffer.length <= this.index && this.f()
    }
    function f(a) {
        this.buffer = new(w ? Uint16Array: Array)(2 * a);
        this.length = 0
    }
    function e(a) {
        var b = a.length,
        c = 0,
        f = Number.POSITIVE_INFINITY,
        e, d, k, h, p, q, v, l, s;
        for (l = 0; l < b; ++l) a[l] > c && (c = a[l]),
        a[l] < f && (f = a[l]);
        e = 1 << c;
        d = new(w ? Uint32Array: Array)(e);
        k = 1;
        h = 0;
        for (p = 2; k <= c;) {
            for (l = 0; l < b; ++l) if (a[l] === k) {
                q = 0;
                v = h;
                for (s = 0; s < k; ++s) q = q << 1 | v & 1,
                v >>= 1;
                for (s = q; s < e; s += p) d[s] = k << 16 | l; ++h
            }++k;
            h <<= 1;
            p <<= 1
        }
        return [d, c, f]
    }
    function k(a, b) {
        this.h = J;
        this.w = 0;
        this.input = a;
        this.b = 0;
        b && (b.lazy && (this.w = b.lazy), "number" === typeof b.compressionType && (this.h = b.compressionType), b.outputBuffer && (this.a = w && b.outputBuffer instanceof Array ? new Uint8Array(b.outputBuffer) : b.outputBuffer), "number" === typeof b.outputIndex && (this.b = b.outputIndex));
        this.a || (this.a = new(w ? Uint8Array: Array)(32768))
    }
    function l(a, b) {
        this.length = a;
        this.G = b
    }
    function g() {
        var a = F;
        switch (D) {
        case 3 === a: return [257, a - 3, 0];
        case 4 === a: return [258, a - 4, 0];
        case 5 === a: return [259, a - 5, 0];
        case 6 === a: return [260, a - 6, 0];
        case 7 === a: return [261, a - 7, 0];
        case 8 === a: return [262, a - 8, 0];
        case 9 === a: return [263, a - 9, 0];
        case 10 === a: return [264, a - 10, 0];
        case 12 >= a: return [265, a - 11, 1];
        case 14 >= a: return [266, a - 13, 1];
        case 16 >= a: return [267, a - 15, 1];
        case 18 >= a: return [268, a - 17, 1];
        case 22 >= a: return [269, a - 19, 2];
        case 26 >= a: return [270, a - 23, 2];
        case 30 >= a: return [271, a - 27, 2];
        case 34 >= a: return [272, a - 31, 2];
        case 42 >= a: return [273, a - 35, 3];
        case 50 >= a: return [274, a - 43, 3];
        case 58 >= a: return [275, a - 51, 3];
        case 66 >= a: return [276, a - 59, 3];
        case 82 >= a: return [277, a - 67, 4];
        case 98 >= a: return [278, a - 83, 4];
        case 114 >= a: return [279, a - 99, 4];
        case 130 >= a: return [280, a - 115, 4];
        case 162 >= a: return [281, a - 131, 5];
        case 194 >= a: return [282, a - 163, 5];
        case 226 >= a: return [283, a - 195, 5];
        case 257 >= a: return [284, a - 227, 5];
        case 258 === a: return [285, a - 258, 0];
        default:
            b("invalid length: " + a)
        }
    }
    function m(a, c) {
        function f(a, c) {
            var e = a.G,
            d = [],
            k = 0,
            h;
            h = L[a.length];
            d[k++] = h & 65535;
            d[k++] = h >> 16 & 255;
            d[k++] = h >> 24;
            var p;
            switch (D) {
            case 1 === e: p = [0, e - 1, 0];
                break;
            case 2 === e: p = [1, e - 2, 0];
                break;
            case 3 === e: p = [2, e - 3, 0];
                break;
            case 4 === e: p = [3, e - 4, 0];
                break;
            case 6 >= e: p = [4, e - 5, 1];
                break;
            case 8 >= e: p = [5, e - 7, 1];
                break;
            case 12 >= e: p = [6, e - 9, 2];
                break;
            case 16 >= e: p = [7, e - 13, 2];
                break;
            case 24 >= e: p = [8, e - 17, 3];
                break;
            case 32 >= e: p = [9, e - 25, 3];
                break;
            case 48 >= e: p = [10, e - 33, 4];
                break;
            case 64 >= e: p = [11, e - 49, 4];
                break;
            case 96 >= e: p = [12, e - 65, 5];
                break;
            case 128 >= e: p = [13, e - 97, 5];
                break;
            case 192 >= e: p = [14, e - 129, 6];
                break;
            case 256 >= e: p = [15, e - 193, 6];
                break;
            case 384 >= e: p = [16, e - 257, 7];
                break;
            case 512 >= e: p = [17, e - 385, 7];
                break;
            case 768 >= e: p = [18, e - 513, 8];
                break;
            case 1024 >= e: p = [19, e - 769, 8];
                break;
            case 1536 >= e: p = [20, e - 1025, 9];
                break;
            case 2048 >= e: p = [21, e - 1537, 9];
                break;
            case 3072 >= e: p = [22, e - 2049, 10];
                break;
            case 4096 >= e: p = [23, e - 3073, 10];
                break;
            case 6144 >= e: p = [24, e - 4097, 11];
                break;
            case 8192 >= e: p = [25, e - 6145, 11];
                break;
            case 12288 >= e: p = [26, e - 8193, 12];
                break;
            case 16384 >= e: p = [27, e - 12289, 12];
                break;
            case 24576 >= e: p = [28, e - 16385, 13];
                break;
            case 32768 >= e: p = [29, e - 24577, 13];
                break;
            default:
                b("invalid distance")
            }
            h = p;
            d[k++] = h[0];
            d[k++] = h[1];
            d[k++] = h[2];
            e = 0;
            for (k = d.length; e < k; ++e) s[n++] = d[e];
            r[d[0]]++;
            x[d[3]]++;
            g = a.length + c - 1;
            v = null
        }
        var e, d, k, h, p, q = {},
        v, s = w ? new Uint16Array(2 * c.length) : [],
        n = 0,
        g = 0,
        r = new(w ? Uint32Array: Array)(286),
        x = new(w ? Uint32Array: Array)(30),
        m = a.w,
        u;
        if (!w) {
            for (k = 0; 285 >= k;) r[k++] = 0;
            for (k = 0; 29 >= k;) x[k++] = 0
        }
        r[256] = 1;
        e = 0;
        for (d = c.length; e < d; ++e) {
            k = p = 0;
            for (h = 3; k < h && e + k !== d; ++k) p = p << 8 | c[e + k];
            q[p] === E && (q[p] = []);
            k = q[p];
            if (! (0 < g--)) {
                for (; 0 < k.length && 32768 < e - k[0];) k.shift();
                if (e + 3 >= d) {
                    v && f(v, -1);
                    k = 0;
                    for (h = d - e; k < h; ++k) u = c[e + k],
                    s[n++] = u,
                    ++r[u];
                    break
                }
                if (0 < k.length) {
                    p = h = E;
                    var t = 0,
                    B = E,
                    y = E,
                    z = B = E,
                    A = c.length,
                    y = 0,
                    z = k.length;
                    a: for (; y < z; y++) {
                        h = k[z - y - 1];
                        B = 3;
                        if (3 < t) {
                            for (B = t; 3 < B; B--) if (c[h + B - 1] !== c[e + B - 1]) continue a;
                            B = t
                        }
                        for (; 258 > B && e + B < A && c[h + B] === c[e + B];)++B;
                        B > t && (p = h, t = B);
                        if (258 === B) break
                    }
                    h = new l(t, e - p);
                    v ? v.length < h.length ? (u = c[e - 1], s[n++] = u, ++r[u], f(h, 0)) : f(v, -1) : h.length < m ? v = h: f(h, 0)
                } else v ? f(v, -1) : (u = c[e], s[n++] = u, ++r[u])
            }
            k.push(e)
        }
        s[n++] = 256;
        r[256]++;
        a.L = r;
        a.K = x;
        return w ? s.subarray(0, n) : s
    }
    function n(a, b) {
        function c(a) {
            var b = s[a][n[a]];
            b === v ? (c(a + 1), c(a + 1)) : --l[b]; ++n[a]
        }
        var e = a.length,
        d = new f(572),
        k = new(w ? Uint8Array: Array)(e),
        h,
        p,
        q;
        if (!w) for (p = 0; p < e; p++) k[p] = 0;
        for (p = 0; p < e; ++p) 0 < a[p] && d.push(p, a[p]);
        e = Array(d.length / 2);
        h = new(w ? Uint32Array: Array)(d.length / 2);
        if (1 === e.length) return k[d.pop().index] = 1,
        k;
        p = 0;
        for (q = d.length / 2; p < q; ++p) e[p] = d.pop(),
        h[p] = e[p].value;
        var v = h.length;
        p = new(w ? Uint16Array: Array)(b);
        var d = new(w ? Uint8Array: Array)(b),
        l = new(w ? Uint8Array: Array)(v);
        q = Array(b);
        var s = Array(b),
        n = Array(b),
        g = (1 << b) - v,
        r = 1 << b - 1,
        x,
        m,
        u;
        p[b - 1] = v;
        for (x = 0; x < b; ++x) g < r ? d[x] = 0 : (d[x] = 1, g -= r),
        g <<= 1,
        p[b - 2 - x] = (p[b - 1 - x] / 2 | 0) + v;
        p[0] = d[0];
        q[0] = Array(p[0]);
        s[0] = Array(p[0]);
        for (x = 1; x < b; ++x) p[x] > 2 * p[x - 1] + d[x] && (p[x] = 2 * p[x - 1] + d[x]),
        q[x] = Array(p[x]),
        s[x] = Array(p[x]);
        for (g = 0; g < v; ++g) l[g] = b;
        for (r = 0; r < p[b - 1]; ++r) q[b - 1][r] = h[r],
        s[b - 1][r] = r;
        for (g = 0; g < b; ++g) n[g] = 0;
        1 === d[b - 1] && (--l[0], ++n[b - 1]);
        for (x = b - 2; 0 <= x; --x) {
            m = g = 0;
            u = n[x + 1];
            for (r = 0; r < p[x]; r++) m = q[x + 1][u] + q[x + 1][u + 1],
            m > h[g] ? (q[x][r] = m, s[x][r] = v, u += 2) : (q[x][r] = h[g], s[x][r] = g, ++g);
            n[x] = 0;
            1 === d[x] && c(x)
        }
        h = l;
        p = 0;
        for (q = e.length; p < q; ++p) k[e[p].index] = h[p];
        return k
    }
    function r(a) {
        var c = new(w ? Uint16Array: Array)(a.length),
        e = [],
        f = [],
        d = 0,
        k,
        p,
        h;
        k = 0;
        for (p = a.length; k < p; k++) e[a[k]] = (e[a[k]] | 0) + 1;
        k = 1;
        for (p = 16; k <= p; k++) f[k] = d,
        d += e[k] | 0,
        d > 1 << k && b("overcommitted"),
        d <<= 1;
        65536 > d && b("undercommitted");
        k = 0;
        for (p = a.length; k < p; k++) {
            d = f[a[k]];
            f[a[k]] += 1;
            e = c[k] = 0;
            for (h = a[k]; e < h; e++) c[k] = c[k] << 1 | d & 1,
            d >>>= 1
        }
        return c
    }
    function h(a, b) {
        this.input = a;
        this.a = new(w ? Uint8Array: Array)(32768);
        this.h = I.j;
        var c = {},
        e;
        if ((b || !(b = {})) && "number" === typeof b.compressionType) this.h = b.compressionType;
        for (e in b) c[e] = b[e];
        c.outputBuffer = this.a;
        this.z = new k(this.input, c)
    }
    function q(a, c) {
        this.k = [];
        this.l = 32768;
        this.e = this.g = this.c = this.q = 0;
        this.input = w ? new Uint8Array(a) : a;
        this.s = !1;
        this.m = C;
        this.B = !1;
        if (c || !(c = {})) c.index && (this.c = c.index),
        c.bufferSize && (this.l = c.bufferSize),
        c.bufferType && (this.m = c.bufferType),
        c.resize && (this.B = c.resize);
        switch (this.m) {
        case M:
            this.b = 32768;
            this.a = new(w ? Uint8Array: Array)(32768 + this.l + 258);
            break;
        case C:
            this.b = 0;
            this.a = new(w ? Uint8Array: Array)(this.l);
            this.f = this.J;
            this.t = this.H;
            this.o = this.I;
            break;
        default:
            b(Error("invalid inflate mode"))
        }
    }
    function p(a, c) {
        for (var e = a.g,
        f = a.e,
        d = a.input,
        k = a.c,
        p; f < c;) p = d[k++],
        p === E && b(Error("input buffer is broken")),
        e |= p << f,
        f += 8;
        a.g = e >>> c;
        a.e = f - c;
        a.c = k;
        return e & (1 << c) - 1
    }
    function v(a, c) {
        for (var e = a.g,
        f = a.e,
        d = a.input,
        k = a.c,
        p = c[0], h = c[1], q; f < h;) q = d[k++],
        q === E && b(Error("input buffer is broken")),
        e |= q << f,
        f += 8;
        d = p[e & (1 << h) - 1];
        p = d >>> 16;
        a.g = e >> p;
        a.e = f - p;
        a.c = k;
        return d & 65535
    }
    function x(a) {
        function b(a, c, e) {
            var f, d, k, h;
            for (h = 0; h < a;) switch (f = v(this, c), f) {
            case 16:
                for (k = 3 + p(this, 2); k--;) e[h++] = d;
                break;
            case 17:
                for (k = 3 + p(this, 3); k--;) e[h++] = 0;
                d = 0;
                break;
            case 18:
                for (k = 11 + p(this, 7); k--;) e[h++] = 0;
                d = 0;
                break;
            default:
                d = e[h++] = f
            }
            return e
        }
        var c = p(a, 5) + 257,
        f = p(a, 5) + 1,
        d = p(a, 4) + 4,
        k = new(w ? Uint8Array: Array)(K.length),
        h;
        for (h = 0; h < d; ++h) k[K[h]] = p(a, 3);
        d = e(k);
        k = new(w ? Uint8Array: Array)(c);
        h = new(w ? Uint8Array: Array)(f);
        a.o(e(b.call(a, c, d, k)), e(b.call(a, f, d, h)))
    }
    function y(a, c) {
        var e, f;
        this.input = a;
        this.c = 0;
        if (c || !(c = {})) c.index && (this.c = c.index),
        c.verify && (this.M = c.verify);
        e = a[this.c++];
        f = a[this.c++];
        switch (e & 15) {
        case O:
            this.method = O;
            break;
        default:
            b(Error("unsupported compression method"))
        }
        0 !== ((e << 8) + f) % 31 && b(Error("invalid fcheck flag:" + ((e << 8) + f) % 31));
        f & 32 && b(Error("fdict flag is not supported"));
        this.A = new q(a, {
            index: this.c,
            bufferSize: c.bufferSize,
            bufferType: c.bufferType,
            resize: c.resize
        })
    }
    var E = void 0,
    D = !0,
    H = this,
    w = "undefined" !== typeof Uint8Array && "undefined" !== typeof Uint16Array && "undefined" !== typeof Uint32Array;
    a.prototype.f = function() {
        var a = this.buffer,
        b, c = a.length,
        e = new(w ? Uint8Array: Array)(c << 1);
        if (w) e.set(a);
        else for (b = 0; b < c; ++b) e[b] = a[b];
        return this.buffer = e
    };
    a.prototype.d = function(a, b, c) {
        var e = this.buffer,
        f = this.index,
        d = this.i,
        k = e[f];
        c && 1 < b && (a = 8 < b ? (t[a & 255] << 24 | t[a >>> 8 & 255] << 16 | t[a >>> 16 & 255] << 8 | t[a >>> 24 & 255]) >> 32 - b: t[a] >> 8 - b);
        if (8 > b + d) k = k << b | a,
        d += b;
        else for (c = 0; c < b; ++c) k = k << 1 | a >> b - c - 1 & 1,
        8 === ++d && (d = 0, e[f++] = t[k], k = 0, f === e.length && (e = this.f()));
        e[f] = k;
        this.buffer = e;
        this.i = d;
        this.index = f
    };
    a.prototype.finish = function() {
        var a = this.buffer,
        b = this.index,
        c;
        0 < this.i && (a[b] <<= 8 - this.i, a[b] = t[a[b]], b++);
        w ? c = a.subarray(0, b) : (a.length = b, c = a);
        return c
    };
    var A = new(w ? Uint8Array: Array)(256),
    u;
    for (u = 0; 256 > u; ++u) {
        for (var s = u,
        B = s,
        z = 7,
        s = s >>> 1; s; s >>>= 1) B <<= 1,
        B |= s & 1,
        --z;
        A[u] = (B << z & 255) >>> 0
    }
    var t = A,
    A = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
    w && new Uint32Array(A);
    f.prototype.getParent = function(a) {
        return 2 * ((a - 2) / 4 | 0)
    };
    f.prototype.push = function(a, b) {
        var c, e, f = this.buffer,
        d;
        c = this.length;
        f[this.length++] = b;
        for (f[this.length++] = a; 0 < c;) if (e = this.getParent(c), f[c] > f[e]) d = f[c],
        f[c] = f[e],
        f[e] = d,
        d = f[c + 1],
        f[c + 1] = f[e + 1],
        f[e + 1] = d,
        c = e;
        else break;
        return this.length
    };
    f.prototype.pop = function() {
        var a, b, c = this.buffer,
        e, f, d;
        b = c[0];
        a = c[1];
        this.length -= 2;
        c[0] = c[this.length];
        c[1] = c[this.length + 1];
        for (d = 0;;) {
            f = 2 * d + 2;
            if (f >= this.length) break;
            f + 2 < this.length && c[f + 2] > c[f] && (f += 2);
            if (c[f] > c[d]) e = c[d],
            c[d] = c[f],
            c[f] = e,
            e = c[d + 1],
            c[d + 1] = c[f + 1],
            c[f + 1] = e;
            else break;
            d = f
        }
        return {
            index: a,
            value: b,
            length: this.length
        }
    };
    var J = 2,
    A = {
        NONE: 0,
        r: 1,
        j: J,
        N: 3
    },
    N = [];
    for (u = 0; 288 > u; u++) switch (D) {
    case 143 >= u: N.push([u + 48, 8]);
        break;
    case 255 >= u: N.push([u - 144 + 400, 9]);
        break;
    case 279 >= u: N.push([u - 256 + 0, 7]);
        break;
    case 287 >= u: N.push([u - 280 + 192, 8]);
        break;
    default:
        b("invalid literal: " + u)
    }
    k.prototype.n = function() {
        var c, e, f, d, k = this.input;
        switch (this.h) {
        case 0:
            f = 0;
            for (d = k.length; f < d;) {
                e = w ? k.subarray(f, f + 65535) : k.slice(f, f + 65535);
                f += e.length;
                var p = f === d,
                h = E,
                q = h = E,
                q = h = E,
                v = this.a,
                s = this.b;
                if (w) {
                    for (v = new Uint8Array(this.a.buffer); v.length <= s + e.length + 5;) v = new Uint8Array(v.length << 1);
                    v.set(this.a)
                }
                h = p ? 1 : 0;
                v[s++] = h | 0;
                h = e.length;
                q = ~h + 65536 & 65535;
                v[s++] = h & 255;
                v[s++] = h >>> 8 & 255;
                v[s++] = q & 255;
                v[s++] = q >>> 8 & 255;
                if (w) v.set(e, s),
                s += e.length,
                v = v.subarray(0, s);
                else {
                    h = 0;
                    for (q = e.length; h < q; ++h) v[s++] = e[h];
                    v.length = s
                }
                this.b = s;
                this.a = v
            }
            break;
        case 1:
            f = new a(new Uint8Array(this.a.buffer), this.b);
            f.d(1, 1, D);
            f.d(1, 2, D);
            k = m(this, k);
            e = 0;
            for (p = k.length; e < p; e++) if (d = k[e], a.prototype.d.apply(f, N[d]), 256 < d) f.d(k[++e], k[++e], D),
            f.d(k[++e], 5),
            f.d(k[++e], k[++e], D);
            else if (256 === d) break;
            this.a = f.finish();
            this.b = this.a.length;
            break;
        case J:
            d = new a(new Uint8Array(this.a), this.b);
            var l, x, g, u = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            B,
            t,
            h = Array(19),
            y,
            v = J;
            d.d(1, 1, D);
            d.d(v, 2, D);
            k = m(this, k);
            q = n(this.L, 15);
            B = r(q);
            v = n(this.K, 7);
            s = r(v);
            for (l = 286; 257 < l && 0 === q[l - 1]; l--);
            for (x = 30; 1 < x && 0 === v[x - 1]; x--);
            var z = l,
            A = x;
            c = new(w ? Uint32Array: Array)(z + A);
            var H = new(w ? Uint32Array: Array)(316),
            F,
            C;
            t = new(w ? Uint8Array: Array)(19);
            for (y = g = 0; y < z; y++) c[g++] = q[y];
            for (y = 0; y < A; y++) c[g++] = v[y];
            if (!w) {
                y = 0;
                for (A = t.length; y < A; ++y) t[y] = 0
            }
            y = F = 0;
            for (A = c.length; y < A; y += g) {
                for (g = 1; y + g < A && c[y + g] === c[y]; ++g);
                z = g;
                if (0 === c[y]) if (3 > z) for (; 0 < z--;) H[F++] = 0,
                t[0]++;
                else for (; 0 < z;) C = 138 > z ? z: 138,
                C > z - 3 && C < z && (C = z - 3),
                10 >= C ? (H[F++] = 17, H[F++] = C - 3, t[17]++) : (H[F++] = 18, H[F++] = C - 11, t[18]++),
                z -= C;
                else if (H[F++] = c[y], t[c[y]]++, z--, 3 > z) for (; 0 < z--;) H[F++] = c[y],
                t[c[y]]++;
                else for (; 0 < z;) C = 6 > z ? z: 6,
                C > z - 3 && C < z && (C = z - 3),
                H[F++] = 16,
                H[F++] = C - 3,
                t[16]++,
                z -= C
            }
            c = w ? H.subarray(0, F) : H.slice(0, F);
            t = n(t, 7);
            for (y = 0; 19 > y; y++) h[y] = t[u[y]];
            for (g = 19; 4 < g && 0 === h[g - 1]; g--);
            u = r(t);
            d.d(l - 257, 5, D);
            d.d(x - 1, 5, D);
            d.d(g - 4, 4, D);
            for (y = 0; y < g; y++) d.d(h[y], 3, D);
            y = 0;
            for (h = c.length; y < h; y++) if (e = c[y], d.d(u[e], t[e], D), 16 <= e) {
                y++;
                switch (e) {
                case 16:
                    p = 2;
                    break;
                case 17:
                    p = 3;
                    break;
                case 18:
                    p = 7;
                    break;
                default:
                    b("invalid code: " + e)
                }
                d.d(c[y], p, D)
            }
            p = [B, q];
            s = [s, v];
            e = p[0];
            p = p[1];
            v = s[0];
            B = s[1];
            s = 0;
            for (h = k.length; s < h; ++s) if (f = k[s], d.d(e[f], p[f], D), 256 < f) d.d(k[++s], k[++s], D),
            q = k[++s],
            d.d(v[q], B[q], D),
            d.d(k[++s], k[++s], D);
            else if (256 === f) break;
            this.a = d.finish();
            this.b = this.a.length;
            break;
        default:
            b("invalid compression type")
        }
        return this.a
    };
    u = [];
    var F;
    for (F = 3; 258 >= F; F++) s = g(),
    u[F] = s[2] << 24 | s[1] << 16 | s[0];
    var L = w ? new Uint32Array(u) : u,
    I = A;
    h.prototype.n = function() {
        var a, e, f, d, k = 0;
        d = this.a;
        a = O;
        switch (a) {
        case O:
            e = Math.LOG2E * Math.log(32768) - 8;
            break;
        default:
            b(Error("invalid compression method"))
        }
        e = e << 4 | a;
        d[k++] = e;
        switch (a) {
        case O:
            switch (this.h) {
            case I.NONE:
                f = 0;
                break;
            case I.r:
                f = 1;
                break;
            case I.j:
                f = 2;
                break;
            default:
                b(Error("unsupported compression type"))
            }
            break;
        default:
            b(Error("invalid compression method"))
        }
        a = f << 6 | 0;
        d[k++] = a | 31 - (256 * e + a) % 31;
        a = c(this.input);
        this.z.b = k;
        d = this.z.n();
        k = d.length;
        w && (d = new Uint8Array(d.buffer), d.length <= k + 4 && (this.a = new Uint8Array(d.length + 4), this.a.set(d), d = this.a), d = d.subarray(0, k + 4));
        d[k++] = a >> 24 & 255;
        d[k++] = a >> 16 & 255;
        d[k++] = a >> 8 & 255;
        d[k++] = a & 255;
        return d
    };
    d("Zlib.Deflate", h);
    d("Zlib.Deflate.compress",
    function(a, b) {
        return (new h(a, b)).n()
    });
    d("Zlib.Deflate.CompressionType", I);
    d("Zlib.Deflate.CompressionType.NONE", I.NONE);
    d("Zlib.Deflate.CompressionType.FIXED", I.r);
    d("Zlib.Deflate.CompressionType.DYNAMIC", I.j);
    var M = 0,
    C = 1,
    A = {
        D: M,
        C: C
    };
    q.prototype.p = function() {
        for (; ! this.s;) {
            var a = p(this, 3);
            a & 1 && (this.s = D);
            a >>>= 1;
            switch (a) {
            case 0:
                var a = this.input,
                c = this.c,
                e = this.a,
                f = this.b,
                d = E,
                k = E,
                h = E,
                q = e.length,
                d = E;
                this.e = this.g = 0;
                d = a[c++];
                d === E && b(Error("invalid uncompressed block header: LEN (first byte)"));
                k = d;
                d = a[c++];
                d === E && b(Error("invalid uncompressed block header: LEN (second byte)"));
                k |= d << 8;
                d = a[c++];
                d === E && b(Error("invalid uncompressed block header: NLEN (first byte)"));
                h = d;
                d = a[c++];
                d === E && b(Error("invalid uncompressed block header: NLEN (second byte)"));
                h |= d << 8;
                k === ~h && b(Error("invalid uncompressed block header: length verify"));
                c + k > a.length && b(Error("input buffer is broken"));
                switch (this.m) {
                case M:
                    for (; f + k > e.length;) {
                        d = q - f;
                        k -= d;
                        if (w) e.set(a.subarray(c, c + d), f),
                        f += d,
                        c += d;
                        else for (; d--;) e[f++] = a[c++];
                        this.b = f;
                        e = this.f();
                        f = this.b
                    }
                    break;
                case C:
                    for (; f + k > e.length;) e = this.f({
                        v: 2
                    });
                    break;
                default:
                    b(Error("invalid inflate mode"))
                }
                if (w) e.set(a.subarray(c, c + k), f),
                f += k,
                c += k;
                else for (; k--;) e[f++] = a[c++];
                this.c = c;
                this.b = f;
                this.a = e;
                break;
            case 1:
                this.o(S, T);
                break;
            case 2:
                x(this);
                break;
            default:
                b(Error("unknown BTYPE: " + a))
            }
        }
        return this.t()
    };
    u = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var K = w ? new Uint16Array(u) : u;
    u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258];
    var G = w ? new Uint16Array(u) : u;
    u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0];
    var P = w ? new Uint8Array(u) : u;
    u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    var R = w ? new Uint16Array(u) : u;
    u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    var Q = w ? new Uint8Array(u) : u;
    u = new(w ? Uint8Array: Array)(288);
    s = 0;
    for (B = u.length; s < B; ++s) u[s] = 143 >= s ? 8 : 255 >= s ? 9 : 279 >= s ? 7 : 8;
    var S = e(u);
    u = new(w ? Uint8Array: Array)(30);
    s = 0;
    for (B = u.length; s < B; ++s) u[s] = 5;
    var T = e(u);
    q.prototype.o = function(a, b) {
        var c = this.a,
        e = this.b;
        this.u = a;
        for (var f = c.length - 258,
        d, k, h; 256 !== (d = v(this, a));) if (256 > d) e >= f && (this.b = e, c = this.f(), e = this.b),
        c[e++] = d;
        else {
            d -= 257;
            h = G[d];
            0 < P[d] && (h += p(this, P[d]));
            d = v(this, b);
            k = R[d];
            0 < Q[d] && (k += p(this, Q[d]));
            for (e >= f && (this.b = e, c = this.f(), e = this.b); h--;) c[e] = c[e++-k]
        }
        for (; 8 <= this.e;) this.e -= 8,
        this.c--;
        this.b = e
    };
    q.prototype.I = function(a, b) {
        var c = this.a,
        e = this.b;
        this.u = a;
        for (var f = c.length,
        d, k, h; 256 !== (d = v(this, a));) if (256 > d) e >= f && (c = this.f(), f = c.length),
        c[e++] = d;
        else {
            d -= 257;
            h = G[d];
            0 < P[d] && (h += p(this, P[d]));
            d = v(this, b);
            k = R[d];
            0 < Q[d] && (k += p(this, Q[d]));
            for (e + h > f && (c = this.f(), f = c.length); h--;) c[e] = c[e++-k]
        }
        for (; 8 <= this.e;) this.e -= 8,
        this.c--;
        this.b = e
    };
    q.prototype.f = function() {
        var a = new(w ? Uint8Array: Array)(this.b - 32768),
        b = this.b - 32768,
        c,
        e,
        f = this.a;
        if (w) a.set(f.subarray(32768, a.length));
        else {
            c = 0;
            for (e = a.length; c < e; ++c) a[c] = f[c + 32768]
        }
        this.k.push(a);
        this.q += a.length;
        if (w) f.set(f.subarray(b, b + 32768));
        else for (c = 0; 32768 > c; ++c) f[c] = f[b + c];
        this.b = 32768;
        return f
    };
    q.prototype.J = function(a) {
        var b, c = this.input.length / this.c + 1 | 0,
        e, f, d, k = this.input,
        h = this.a;
        a && ("number" === typeof a.v && (c = a.v), "number" === typeof a.F && (c += a.F));
        2 > c ? (e = (k.length - this.c) / this.u[2], d = 258 * (e / 2) | 0, f = d < h.length ? h.length + d: h.length << 1) : f = h.length * c;
        w ? (b = new Uint8Array(f), b.set(h)) : b = h;
        return this.a = b
    };
    q.prototype.t = function() {
        var a = 0,
        b = this.a,
        c = this.k,
        e, f = new(w ? Uint8Array: Array)(this.q + (this.b - 32768)),
        d,
        k,
        h,
        p;
        if (0 === c.length) return w ? this.a.subarray(32768, this.b) : this.a.slice(32768, this.b);
        d = 0;
        for (k = c.length; d < k; ++d) {
            e = c[d];
            h = 0;
            for (p = e.length; h < p; ++h) f[a++] = e[h]
        }
        d = 32768;
        for (k = this.b; d < k; ++d) f[a++] = b[d];
        this.k = [];
        return this.buffer = f
    };
    q.prototype.H = function() {
        var a, b = this.b;
        w ? this.B ? (a = new Uint8Array(b), a.set(this.a.subarray(0, b))) : a = this.a.subarray(0, b) : (this.a.length > b && (this.a.length = b), a = this.a);
        return this.buffer = a
    };
    y.prototype.p = function() {
        var a = this.input,
        e, f;
        e = this.A.p();
        this.c = this.A.c;
        this.M && (f = (a[this.c++] << 24 | a[this.c++] << 16 | a[this.c++] << 8 | a[this.c++]) >>> 0, f !== c(e) && b(Error("invalid adler-32 checksum")));
        return e
    };
    d("Zlib.Inflate", y);
    d("Zlib.Inflate.BufferType", A);
    A.ADAPTIVE = A.C;
    A.BLOCK = A.D;
    d("Zlib.Inflate.prototype.decompress", y.prototype.p);
    A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    w && new Uint16Array(A);
    A = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258];
    w && new Uint16Array(A);
    A = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0];
    w && new Uint8Array(A);
    A = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    w && new Uint16Array(A);
    A = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    w && new Uint8Array(A);
    A = new(w ? Uint8Array: Array)(288);
    u = 0;
    for (s = A.length; u < s; ++u) A[u] = 143 >= u ? 8 : 255 >= u ? 9 : 279 >= u ? 7 : 8;
    e(A);
    A = new(w ? Uint8Array: Array)(30);
    u = 0;
    for (s = A.length; u < s; ++u) A[u] = 5;
    e(A);
    var O = 8
}).call(this); (function(b) {
    var d = function() {
        function c() {
            this._isSupportDOMParser = this._xmlDict = this._parser = null;
            this._xmlDict = {};
            window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
        }
        c.getInstance = function() {
            c._instance || (c._instance = new c);
            return c._instance
        };
        c.prototype.parse = function(a) {
            var c = a;
            a = this.getList(a);
            a = this.parserXML(a).documentElement;
            "plist" != a.tagName && b.Logger.fatal(c + "\u4e0d\u662fplist\u6216\u8005\u6ca1\u6709\u9884\u52a0\u8f7dplist");
            for (var c = null,
            e = 0,
            d = a.childNodes.length; e < d && !(c = a.childNodes[e], 1 == c.nodeType); e++);
            return this.parseNode(c)
        };
        c.prototype.tmxParse = function(a, b) {
            "undefined" === typeof b && (b = !1);
            b || (a = this.getList(a));
            return this.parserXML(a)
        };
        c.prototype.parserXML = function(a) {
            var c;
            this._isSupportDOMParser ? c = this._parser.parseFromString(a, "text/xml") : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(a));
            null == c && b.Logger.info("xml not found!");
            return c
        };
        c.prototype.parseNode = function(a) {
            var b = null;
            switch (a.tagName) {
            case "dict":
                b = this.parseDict(a);
                break;
            case "array":
                b = this.parseArray(a);
                break;
            case "string":
                if (1 == a.childNodes.length) b = a.firstChild.nodeValue;
                else for (var b = "",
                c = 0; c < a.childNodes.length; c++) b += a.childNodes[c].nodeValue;
                break;
            case "false":
                b = !1;
                break;
            case "true":
                b = !0;
                break;
            case "real":
                b = parseFloat(a.firstChild.nodeValue);
                break;
            case "integer":
                b = parseInt(a.firstChild.nodeValue, 10)
            }
            return b
        };
        c.prototype.parseArray = function(a) {
            for (var b = [], c = 0, d = a.childNodes.length; c < d; c++) {
                var l = a.childNodes[c];
                1 == l.nodeType && b.push(this.parseNode(l))
            }
            return b
        };
        c.prototype.parseDict = function(a) {
            for (var b = {},
            c = null,
            d = 0,
            l = a.childNodes.length; d < l; d++) {
                var g = a.childNodes[d];
                1 == g.nodeType && ("key" == g.tagName ? c = g.firstChild.nodeValue: b[c] = this.parseNode(g))
            }
            return b
        };
        c.prototype.getName = function(a) {
            var b = a.lastIndexOf("/", a.length) + 1,
            c = a.lastIndexOf(".", a.length);
            return a.substring(b, c)
        };
        c.prototype.getExt = function(a) {
            var b = a.lastIndexOf(".", a.length) + 1;
            return a.substring(b, a.length)
        };
        c.prototype.getList = function(a) {
            return null != this._xmlDict ? this._xmlDict[a] : null
        };
        c._instance = null;
        return c
    } ();
    b.SAXParser = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {}
        c.convert = function(a) {
            if (1 < arguments.length) b.DOM.convert(arguments);
            else if (1 == arguments.length && !arguments[0].length) b.DOM.convert([arguments[0]]);
            else for (var c = arguments[0], e = 0; e < c.length; e++) c[e] instanceof b.DisplayObjectContainer ? c[e].dom || b.DOM.forSprite(c[e]) : b.Logger.info("DOM\u8f6c\u6362\u5668\u53ea\u652f\u6301DisplayObjectContainer"),
            c[e].visit = function() {},
            c[e].transform = function() {},
            b.DOM.setTransform(c[e]),
            c[e].visible = c[e].visible
        };
        c.forSprite = function(a) {
            a.dom = b.Framework.getInstance().$new("div");
            a.canvas = b.Framework.getInstance().$new("canvas");
            a.canvas.width = a.width;
            a.canvas.height = a.height;
            a.dom.style.position = "absolute";
            a.ctx = a.canvas.getContext("2d");
            a.dom.appendChild(a.canvas);
            a.parent && b.DOM.parentDOM(a);
            a.isSprite = !0
        };
        c.parentDOM = function(a) {
            var c = a.parent;
            if (!c || !a.dom) return ! 1;
            c.dom || b.DOM.placeHolder(c);
            a.dom.appendTo(c.dom);
            if (c.parent) b.DOM.parentDOM(c);
            else if (a = b.Framework.getInstance().$("#StageDelegateDiv")) c.dom.appendTo(a);
            else {
                a = b.Framework.getInstance().$new("div");
                a.id = "StageDelegateDiv";
                var e = b.StageDelegate.getInstance(),
                d = e.getFrameWidth(),
                l = e.getFrameHeight(),
                g = e.getDesignWidth(),
                m = e.getDesignHeight();
                0 === g && 0 === m && (g = d, m = l);
                a.style.position = "absolute";
                a.style.width = g + "px";
                a.style.maxHeight = m + "px";
                a.style.margin = 0;
                a.resize(e.getScaleX(), e.getScaleY());
                c.dom.appendTo(a);
                a.appendTo(document.getElementById(b.StageDelegate.canvas_div_name))
            }
            return ! 0
        };
        c.placeHolder = function(a) {
            a.dom = b.Framework.getInstance().$new("div");
            a.placeholder = !0;
            a.dom.style.position = "absolute";
            a.dom.style.width = (a.width || b.MainContext.instance.stage.stageWidth) + "px";
            a.dom.style.maxHeight = (a.height || b.MainContext.instance.stage.stageHeight) + "px";
            a.dom.style.margin = 0;
            b.DOM.setTransform(a);
            a.dom.transforms()
        };
        c.setTransform = function(a) {
            a.dom && (a.dom.position.x = a.x, a.dom.position.y = a.y, a.dom.rotation = a.rotation, a.dom.scale = {
                x: a.scaleX,
                y: a.scaleY
            },
            a.dom.skew = {
                x: a.skewX,
                y: a.skewX
            },
            a.dom.transforms())
        };
        return c
    } ();
    b.DOM = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {
            this.translate = this.isHD ?
            function(a) {
                return "translate3d(" + a.x + "px, " + (a.y - b.MainContext.instance.stage.stageHeight) + "px, 0) "
            }: function(a) {
                console.log("translate(" + a.x + "px, " + a.y + "px) ");
                return "translate(" + a.x + "px, " + a.y + "px) "
            };
            this.rotate = this.isHD ?
            function(a) {
                return "rotateZ(" + a + "deg) "
            }: function(a) {
                return "rotate(" + a + "deg) "
            };
            this.ua = navigator.userAgent.toLowerCase();
            var a = this.ua.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baidubrowser|maxthon|ie|opera|firefox/) || this.ua.match(/chrome|safari/);
            a && 0 < a.length && (a = a[0], "micromessenger" == a && (this.type = "wechat"), this.type = a);
            this.type = "unknow";
            switch (this.type) {
            case "firefox":
                this.pfx = "Moz";
                this.isHD = !0;
                break;
            case "chrome":
            case "safari":
                this.pfx = "webkit";
                this.isHD = !0;
                break;
            case "opera":
                this.pfx = "O";
                this.isHD = !1;
                break;
            case "ie":
                this.pfx = "ms";
                this.isHD = !1;
                break;
            default:
                this.pfx = "webkit",
                this.isHD = !0
            }
            this.trans = this.pfx + "Transform";
            this.isMobile = -1 != this.ua.indexOf("mobile") || -1 != this.ua.indexOf("android")
        }
        c.getInstance = function() {
            null == c.instance && (c.instance = new c);
            return c.instance
        };
        c.prototype.$new = function(a) {
            return this.$(document.createElement(a))
        };
        c.prototype.$ = function(a) {
            var f = document;
            if (a = a instanceof HTMLElement ? a: f.querySelector(a)) a.find = a.find || this.$,
            a.hasClass = a.hasClass ||
            function(a) {
                return this.className.match(RegExp("(\\s|^)" + a + "(\\s|$)"))
            },
            a.addClass = a.addClass ||
            function(a) {
                this.hasClass(a) || (this.className && (this.className += " "), this.className += a);
                return this
            },
            a.removeClass = a.removeClass ||
            function(a) {
                this.hasClass(a) && (this.className = this.className.replace(a, ""));
                return this
            },
            a.remove = a.remove ||
            function() {},
            a.appendTo = a.appendTo ||
            function(a) {
                a.appendChild(this);
                return this
            },
            a.prependTo = a.prependTo ||
            function(a) {
                a.childNodes[0] ? a.insertBefore(this, a.childNodes[0]) : a.appendChild(this);
                return this
            },
            a.transforms = a.transforms ||
            function() {
                this.style[c.getInstance().trans] = c.getInstance().translate(this.position) + c.getInstance().rotate(this.rotation) + c.getInstance().scale(this.scale) + c.getInstance().skew(this.skew);
                return this
            },
            a.position = a.position || {
                x: 0,
                y: 0
            },
            a.rotation = a.rotation || 0,
            a.scale = a.scale || {
                x: 1,
                y: 1
            },
            a.skew = a.skew || {
                x: 0,
                y: 0
            },
            a.translates = function(a, c) {
                this.position.x = a;
                this.position.y = c - b.MainContext.instance.stage.stageHeight;
                this.transforms();
                return this
            },
            a.rotate = function(a) {
                this.rotation = a;
                this.transforms();
                return this
            },
            a.resize = function(a, b) {
                this.scale.x = a;
                this.scale.y = b;
                this.transforms();
                return this
            },
            a.setSkew = function(a, b) {
                this.skew.x = a;
                this.skew.y = b;
                this.transforms();
                return this
            };
            return a
        };
        c.prototype.scale = function(a) {
            return "scale(" + a.x + ", " + a.y + ") "
        };
        c.prototype.skew = function(a) {
            return "skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
        };
        return c
    } ();
    b.Framework = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {}
        c.prototype.getText = function() {
            return this.inputElement.value
        };
        c.prototype.setText = function(a) {
            this.inputElement.value = a
        };
        c.prototype.open = function(a, c) {
            var e = b.Framework.getInstance().$new("div"),
            d = document.createElement("input");
            d.type = "text";
            d.style.fontSize = "20px";
            d.style.color = "#FFFFFF";
            d.style.border = 0;
            d.style.background = "transparent";
            d.style.width = "100%";
            d.style.height = "100%";
            d.style.active = 0;
            d.style.outline = "medium";
            e.style.position = "absolute";
            e.position.x = a;
            e.position.y = c;
            e.transforms();
            e.appendChild(d);
            var l = b.Framework.getInstance().$("#StageDelegateDiv");
            if (!l) {
                var g = cc.container.style.height.split("px")[0],
                l = b.Framework.getInstance().$new("div");
                l.id = "StageDelegateDiv";
                l.style.position = "absolute";
                l.style.width = "480px";
                l.style.maxHeight = "800px";
                l.style.margin = 0;
                document.getElementById(b.StageDelegate.canvas_div_name).appendChild(l);
                l.position.y = -g;
                l.transforms()
            }
            l.appendChild(e);
            this.div = e;
            this.inputElement = d
        };
        c.prototype.remove = function() {
            var a = this.div;
            a && a.parentNode && a.parentNode.removeChild(a)
        };
        return c
    } ();
    b.StageText = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a(a, b, d) {
            c.call(this);
            this.target = null;
            this.loop = this.ignoreGlobalPause = this._useTicks = !1;
            this._actions = this._steps = this._initQueueProps = this._curQueueProps = this.pluginData = null;
            this.paused = !1;
            this.duration = 0;
            this._prevPos = -1;
            this.position = null;
            this._stepPosition = this._prevPosition = 0;
            this.passive = !1;
            this.initialize(a, b, d)
        }
        __extends(a, c);
        a.get = function(b, c, d, l) {
            "undefined" === typeof c && (c = null);
            "undefined" === typeof d && (d = null);
            "undefined" === typeof l && (l = !1);
            l && a.removeTweens(b);
            return new a(b, c, d)
        };
        a.removeTweens = function(c) {
            if (c.tween_count) {
                for (var e = a._tweens,
                d = e.length - 1; 0 <= d; d--) e[d].target == c && (e[d].paused = !0, e.splice(d, 1));
                c.tween_count = 0
            } else b.Logger.warning("target\u6ca1\u6709\u6b63\u5728\u6267\u884ctween")
        };
        a.tick = function(b, c) {
            "undefined" === typeof c && (c = !1);
            for (var d = a._tweens,
            l = d.length - 1; 0 <= l; l--) {
                var g = d[l];
                c && !g.ignoreGlobalPause || g.paused || g.tick(g._useTicks ? 1 : b)
            }
        };
        a._register = function(c, e) {
            var d = c.target,
            l = a._tweens;
            if (e) d && (d.tween_count = d.tween_count ? d.tween_count + 1 : 1),
            l.push(c),
            a._inited || (b.Ticker.getInstance().register(a.tick, null), a._inited = !0);
            else {
                d && d.tween_count--;
                for (d = l.length; d--;) if (l[d] == c) {
                    l.splice(d, 1);
                    break
                }
            }
        };
        a.removeAllTweens = function() {
            for (var b = a._tweens,
            c = 0,
            d = b.length; c < d; c++) {
                var l = b[c];
                l.paused = !0;
                l.target.tweenjs_count = 0
            }
            b.length = 0
        };
        a.prototype.initialize = function(b, c, d) {
            this.target = b;
            c && (this._useTicks = c.useTicks, this.ignoreGlobalPause = c.ignoreGlobalPause, this.loop = c.loop, c.onChange && this.addEventListener("change", c.onChange, c.onChangeObj), c.override && a.removeTweens(b));
            this.pluginData = d || {};
            this._curQueueProps = {};
            this._initQueueProps = {};
            this._steps = [];
            this._actions = [];
            c && c.paused ? this.paused = !0 : a._register(this, !0);
            c && null != c.position && this.setPosition(c.position, a.NONE)
        };
        a.prototype.setPosition = function(a, b) {
            "undefined" === typeof b && (b = 1);
            0 > a && (a = 0);
            var c = a,
            d = !1;
            c >= this.duration && (this.loop ? c %= this.duration: (c = this.duration, d = !0));
            if (c == this._prevPos) return d;
            var g = this._prevPos;
            this.position = this._prevPos = c;
            this._prevPosition = a;
            if (this.target) if (d) this._updateTargetProps(null, 1);
            else if (0 < this._steps.length) {
                for (var m = 0,
                n = this._steps.length; m < n && !(this._steps[m].t > c); m++);
                m = this._steps[m - 1];
                this._updateTargetProps(m, (this._stepPosition = c - m.t) / m.d)
            }
            0 != b && 0 < this._actions.length && (this._useTicks ? this._runActions(c, c) : 1 == b && c < g ? (g != this.duration && this._runActions(g, this.duration), this._runActions(0, c, !0)) : this._runActions(g, c));
            d && this.setPaused(!0);
            this.dispatchEvent("change");
            return d
        };
        a.prototype._runActions = function(a, b, c) {
            "undefined" === typeof c && (c = !1);
            var d = a,
            g = b,
            m = -1,
            n = this._actions.length,
            r = 1;
            a > b && (d = b, g = a, m = n, n = r = -1);
            for (; (m += r) != n;) {
                b = this._actions[m];
                var h = b.t; (h == g || h > d && h < g || c && h == a) && b.f.apply(b.o, b.p)
            }
        };
        a.prototype._updateTargetProps = function(b, c) {
            var d, l, g, m;
            if (!b && 1 == c) this.passive = !1,
            d = l = this._curQueueProps;
            else {
                if (this.passive = !!b.v) return;
                b.e && (c = b.e(c, 0, 1, 1));
                d = b.p0;
                l = b.p1
            }
            for (var n in this._initQueueProps) {
                if (null == (g = d[n])) d[n] = g = this._initQueueProps[n];
                if (null == (m = l[n])) l[n] = m = g;
                g = g == m || 0 == c || 1 == c || "number" != typeof g ? 1 == c ? m: g: g + (m - g) * c;
                var r = !1;
                if (m = a._plugins[n]) for (var h = 0,
                q = m.length; h < q; h++) {
                    var p = m[h].tween(this, n, g, d, l, c, !!b && d == l, !b);
                    p == a.IGNORE ? r = !0 : g = p
                }
                r || (this.target[n] = g)
            }
        };
        a.prototype.setPaused = function(b) {
            this.paused = b;
            a._register(this, !b);
            return this
        };
        a.prototype._cloneProps = function(a) {
            var b = {},
            c;
            for (c in a) b[c] = a[c];
            return b
        };
        a.prototype._addStep = function(a) {
            0 < a.d && (this._steps.push(a), a.t = this.duration, this.duration += a.d);
            return this
        };
        a.prototype._appendQueueProps = function(b) {
            var c, d, l, g, m, n;
            for (n in b) if (void 0 === this._initQueueProps[n]) {
                d = this.target[n];
                if (c = a._plugins[n]) {
                    l = 0;
                    for (g = c.length; l < g; l++) d = c[l].init(this, n, d)
                }
                this._initQueueProps[n] = this._curQueueProps[n] = void 0 === d ? null: d
            }
            for (n in b) {
                d = this._curQueueProps[n];
                if (c = a._plugins[n]) {
                    m = m || {};
                    l = 0;
                    for (g = c.length; l < g; l++) c[l].step && c[l].step(this, n, d, b[n], m)
                }
                this._curQueueProps[n] = b[n]
            }
            m && this._appendQueueProps(m);
            return this._curQueueProps
        };
        a.prototype._addAction = function(a) {
            a.t = this.duration;
            this._actions.push(a);
            return this
        };
        a.prototype._set = function(a, b) {
            for (var c in a) b[c] = a[c]
        };
        a.prototype.wait = function(a, b) {
            "undefined" === typeof b && (b = !1);
            if (null == a || 0 >= a) return this;
            var c = this._cloneProps(this._curQueueProps);
            return this._addStep({
                d: a,
                p0: c,
                p1: c,
                v: b
            })
        };
        a.prototype.to = function(a, b, c) {
            "undefined" === typeof c && (c = void 0);
            if (isNaN(b) || 0 > b) b = 0;
            return this._addStep({
                d: b || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: c,
                p1: this._cloneProps(this._appendQueueProps(a))
            })
        };
        a.prototype.call = function(a, b, c) {
            "undefined" === typeof b && (b = void 0);
            "undefined" === typeof c && (c = void 0);
            return this._addAction({
                f: a,
                p: c ? c: [this],
                o: b ? b: this.target
            })
        };
        a.prototype.set = function(a, b) {
            "undefined" === typeof b && (b = null);
            return this._addAction({
                f: this._set,
                o: this,
                p: [a, b ? b: this.target]
            })
        };
        a.prototype.play = function(a) {
            a || (a = this);
            return this.call(a.setPaused, [!1], a)
        };
        a.prototype.pause = function(a) {
            a || (a = this);
            return this.call(a.setPaused, [!0], a)
        };
        a.prototype.tick = function(a) {
            this.paused || this.setPosition(this._prevPosition + a)
        };
        a.NONE = 0;
        a.LOOP = 1;
        a.REVERSE = 2;
        a._tweens = [];
        a.IGNORE = {};
        a._plugins = {};
        a._inited = !1;
        return a
    } (b.EventDispatcher);
    b.Tween = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {
            b.Logger.fatal("Ease\u4e0d\u80fd\u88ab\u5b9e\u4f8b\u5316")
        }
        c.get = function(a) { - 1 > a && (a = -1);
            1 < a && (a = 1);
            return function(b) {
                return 0 == a ? b: 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
            }
        };
        c.getPowIn = function(a) {
            return function(b) {
                return Math.pow(b, a)
            }
        };
        c.getPowOut = function(a) {
            return function(b) {
                return 1 - Math.pow(1 - b, a)
            }
        };
        c.getPowInOut = function(a) {
            return function(b) {
                return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
            }
        };
        c.sineIn = function(a) {
            return 1 - Math.cos(a * Math.PI / 2)
        };
        c.sineOut = function(a) {
            return Math.sin(a * Math.PI / 2)
        };
        c.sineInOut = function(a) {
            return - 0.5 * (Math.cos(Math.PI * a) - 1)
        };
        c.getBackIn = function(a) {
            return function(b) {
                return b * b * ((a + 1) * b - a)
            }
        };
        c.getBackOut = function(a) {
            return function(b) {
                b -= 1;
                return b * b * ((a + 1) * b + a) + 1
            }
        };
        c.getBackInOut = function(a) {
            a *= 1.525;
            return function(b) {
                return 1 > (b *= 2) ? 0.5 * b * b * ((a + 1) * b - a) : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
            }
        };
        c.circIn = function(a) {
            return - (Math.sqrt(1 - a * a) - 1)
        };
        c.circOut = function(a) {
            return Math.sqrt(1 - a * a)
        };
        c.circInOut = function(a) {
            return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        };
        c.bounceIn = function(a) {
            return 1 - c.bounceOut(1 - a)
        };
        c.bounceOut = function(a) {
            return a < 1 / 2.75 ? 7.5625 * a * a: a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
        };
        c.bounceInOut = function(a) {
            return 0.5 > a ? 0.5 * c.bounceIn(2 * a) : 0.5 * c.bounceOut(2 * a - 1) + 0.5
        };
        c.getElasticIn = function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                if (0 == d || 1 == d) return d;
                var l = b / c * Math.asin(1 / a);
                return - (a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - l) * c / b))
            }
        };
        c.getElasticOut = function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                if (0 == d || 1 == d) return d;
                var l = b / c * Math.asin(1 / a);
                return a * Math.pow(2, -10 * d) * Math.sin((d - l) * c / b) + 1
            }
        };
        c.getElasticInOut = function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                var l = b / c * Math.asin(1 / a);
                return 1 > (d *= 2) ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - l) * c / b) : 0.5 * a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - l) * c / b) + 1
            }
        };
        c.quadIn = c.getPowIn(2);
        c.quadOut = c.getPowOut(2);
        c.quadInOut = c.getPowInOut(2);
        c.cubicIn = c.getPowIn(3);
        c.cubicOut = c.getPowOut(3);
        c.cubicInOut = c.getPowInOut(3);
        c.quartIn = c.getPowIn(4);
        c.quartOut = c.getPowOut(4);
        c.quartInOut = c.getPowInOut(4);
        c.quintIn = c.getPowIn(5);
        c.quintOut = c.getPowOut(5);
        c.quintInOut = c.getPowInOut(5);
        c.backIn = c.getBackIn(1.7);
        c.backOut = c.getBackOut(1.7);
        c.backInOut = c.getBackInOut(1.7);
        c.elasticIn = c.getElasticIn(1, 0.3);
        c.elasticOut = c.getElasticOut(1, 0.3);
        c.elasticInOut = c.getElasticInOut(1, 0.3 * 1.5);
        return c
    } ();
    b.Ease = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function b() {}
        b.getInstance = function() {
            null == b.context && (b.context = new b);
            return b.context
        };
        b.prototype.preloadSound = function(a) {};
        b.prototype.playMusic = function(a, b) {};
        b.prototype.stopMusic = function(a) {};
        b.context = null;
        b.isMusicPlaying = !1;
        return b
    } ();
    b.SoundContext = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this);
            this._soundList = {};
            this._canPlay = !0;
            this._supportedFormat = [];
            var a = this._capabilities = {
                mp3: !1,
                ogg: !1,
                wav: !1,
                mp4: !1,
                m4a: !1
            };
            this._checkCanPlay(a);
            for (var b in a) if (a[b]) {
                this._soundSupported = !0;
                break
            }
            a = navigator.userAgent;
            if (/Mobile/.test(a) && (/iPhone OS/.test(a) || /iPad/.test(a) || /Firefox/.test(a)) || /MSIE/.test(a)) this._canPlay = !1;
            this._getSupportedAudioFormat()
        }
        __extends(a, c);
        a.prototype._checkCanPlay = function(a) {
            var b = document.createElement("audio");
            if (b.canPlayType) {
                var c = function(a) {
                    a = b.canPlayType(a);
                    return "no" != a && "" != a
                };
                a.mp3 = c("audio/mpeg");
                a.mp4 = c("audio/mp4");
                a.m4a = c("audio/x-m4a") || c("audio/aac");
                a.ogg = c('audio/ogg; codecs\x3d"vorbis"');
                a.wav = c('audio/wav; codecs\x3d"1"')
            }
        };
        a.prototype.preloadSound = function(a) {};
        a.prototype._getSupportedAudioFormat = function() {
            if (this._soundSupported) {
                var a = ["ogg", "mp3", "wav", "mp4", "m4a"],
                b;
                for (b in a) {
                    var c = a[b];
                    this._capabilities[c] && this._supportedFormat.push(c)
                }
            }
        };
        a.prototype.isFormatSupported = function(a) {
            var b = this._supportedFormat,
            c;
            for (c in b) if (a === b[c]) return ! 0;
            return ! 1
        };
        a.prototype._getExtFromFullPath = function(a) {
            var b = a.lastIndexOf(".");
            return - 1 !== b ? a.substring(b + 1, a.length) : ""
        };
        a.prototype.playMusic = function(a, b) {};
        a.prototype.stopMusic = function(a) {
            var c = this._soundList,
            d = this._playingMusicName;
            if (c.hasOwnProperty(d)) {
                var l = c[d];
                l.pause();
                l.currentTime = l.duration;
                a && delete c[d];
                b.SoundContext.isMusicPlaying = !1
            }
        };
        return a
    } (b.SoundContext);
    b.HTML5SoundContext = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function c() {}
        c.checkDrawImage = function(a, c, d, k, l, g, m, n, r) {
            null == a && b.Logger.fatal("texture\u4e3a\u7a7a"); (a.getTextureWidth() < c + k || a.getTextureHeight() < d + l) && b.Logger.fatal("\u63d0\u4f9b\u7684\u5c3a\u5bf8\u8d85\u51fatexture\u5c3a\u5bf8")
        };
        c.checkAddEventListener = function(a, c, d, k, l) { (null == c || void 0 == c) && b.Logger.fatal("addEventListener\u4fa6\u542c\u51fd\u6570\u4e0d\u80fd\u4e3a\u7a7a")
        };
        c.checkSetScaleGrid = function(a, c, d, k, l) {
            a || b.Logger.fatal("Scale9Bitmap\u6ca1\u6709\u7eb9\u7406"); (0 > parseInt(c) || 0 > parseInt(d) || 0 > parseInt(k) || 0 > parseInt(l)) && b.Logger.fatal("\u4f20\u5165\u7684\u503c\u4e0d\u80fd\u4e3a\u8d1f\u6570");
            a.getTextureWidth() < k + l && b.Logger.fatal("\u4f20\u5165\u7684\u5bbd\u5ea6\u8d85\u51fa\u8303\u56f4");
            a.getTextureHeight() < c + d && b.Logger.fatal("\u4f20\u5165\u7684\u9ad8\u5ea6\u8d85\u51fa\u8303\u56f4")
        };
        c.DRAW_IMAGE = !0;
        c.ADD_EVENT_LISTENER = !0;
        c.SCALE_BITMAP_SET_SCALE_GRID = !0;
        return c
    } ();
    b.DEBUG = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments);
            this.viewPortWidth = 400
        }
        __extends(a, c);
        a.createWithFile = function(b) {
            var c = new a;
            c.initWithTMXFile(b);
            return c
        };
        a.prototype.initWithTMXFile = function(a) { (!a || 0 == a.length) && b.Logger.fatal("TMXTiledMap.initWithTMXFile(): tmxFile\u5e94\u8be5\u662f\u4e0d\u4e3anull\u7684string");
            var c = b.TMXMapInfo.createWithFile(a);
            if (c) {
                var d = c.getTilesets(); (!d || 0 === d.length) && b.Logger.info("TMXTiledMap.initWithTMXFile(): Map\u6ca1\u6709", a);
                this.buildWithMapInfo(c)
            }
        };
        a.prototype.buildWithMapInfo = function(a) {
            this.mapInfo = a;
            var b = 0,
            d = a.getLayers();
            if (d) for (var l = null,
            g = 0,
            m = d.length; g < m; g++) if ((l = d[g]) && l.visible) l = this.parseLayer(l, a),
            c.prototype.addChild.call(this, l, b),
            b++
        };
        a.prototype.parseLayer = function(a, c) {
            var d = this.tilesetForLayer(a, c),
            d = b.TMXLayer.create(d, a, c);
            a.ownTiles = !1;
            d.setupTiles();
            return d
        };
        a.prototype.tilesetForLayer = function(a, c) {
            var d = a.layerWidth,
            l = a.layerHeight,
            g = c.getTilesets();
            if (g) for (var m = g.length - 1; 0 <= m; m--) {
                var n = g[m];
                if (n) for (var r = 0; r < l; r++) for (var h = 0; h < d; h++) {
                    var q = a._tiles[h + d * r];
                    if (0 != q && (q & b.TMX.TILE_FLIPPED_MASK) >>> 0 >= n.firstGid) return n
                }
            }
            b.Logger.warning("TMXLayer" + a.name + "\u6ca1\u6709tiles");
            return null
        };
        a.prototype.getLayer = function(a) { (!a || 0 === a.length) && b.Logger.fatal("TMXTiledMap.getLayer(): layerName\u5e94\u8be5\u662f\u4e0d\u4e3anull\u7684string");
            for (var d = this.numChildren,
            k = 0; k < d; k++) {
                var l = c.prototype.getChildAt.call(this, k);
                if (l && l.getLayerName && l.getLayerName() == a) return l
            }
            return null
        };
        a.prototype.getObjectGroup = function(a) { (!a || 0 === a.length) && b.Logger.fatal("TMXTiledMap.getObjectGroup(): groupName\u5e94\u8be5\u662f\u4e0d\u4e3anull\u7684string");
            var c = this.mapInfo.getObjectGroups;
            if (c) for (var d = 0,
            l = c.length; d < l; d++) {
                var g = c[d];
                if (g && g.getGroupName() == a) return g
            }
            return null
        };
        a.prototype.propertiesForGID = function(a) {
            return this.mapInfo.getTileProperties()[a]
        };
        a.prototype.getProperty = function(a) {
            return this.mapInfo.getProperties()[a.toString()]
        };
        a.prototype.setMoveX = function(a) {
            this.x = a;
            a = this.numChildren;
            for (var c = 0; c < a; c++) {
                var d = this.getChildAt(c);
                if (d instanceof b.TMXLayer) {
                    if (d.visible) for (var l = 0; l < d.numChildren; l++) {
                        var g = d.getChildAt(l);
                        g.x + this.mapInfo.getTileWidth() < -this.x || g.x > -this.x + this.viewPortWidth ? g.visible = !1 : g.visible = !0
                    }
                } else l = d.getBounds(),
                d.visible = d.x + l.width - d.anchorPointX < -this.x || d.x - d.anchorPointX > -this.x + this.viewPortWidth ? !1 : !0
            }
        };
        return a
    } (b.DisplayObjectContainer);
    b.TMXTiledMap = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments);
            this._properties = this._layerOrientation = this._tileSet = this._tiles = this._mapTileHeight = this._mapTileWidth = this._layerHeight = this._layerWidth = this._texture = null;
            this._layerName = "";
            this._opacity = 1;
            this._atlasIndexArray = this._maxGID = this._minGID = null
        }
        __extends(a, c);
        a.create = function(b, c, d) {
            var l = new a;
            l.initWithTilesetInfo(b, c, d);
            return l
        };
        a.prototype.initWithTilesetInfo = function(a, c, d) {
            this._texture = b.TextureCache.getInstance().getTexture(a.sourceImage);
            this._layerName = c.name;
            this._layerWidth = c.layerWidth;
            this._layerHeight = c.layerHeight;
            this._tiles = c._tiles;
            this._minGID = c._minGID;
            this._maxGID = c._maxGID;
            this._opacity = c.opacity;
            this.setProperties(c.getProperties());
            this._tileSet = a;
            this._mapTileWidth = d.getTileWidth();
            this._mapTileHeight = d.getTileHeight();
            this._layerOrientation = d.getOrientation();
            a = this.calculateLayerOffset(c.layerX, c.layerY);
            this.x = a.x;
            this.y = a.y;
            this._atlasIndexArray = []
        };
        a.prototype.calculateLayerOffset = function(a, c) {
            var d = b.Point.identity;
            switch (this._layerOrientation) {
            case b.TMX.ORIENTATION_ORTHO:
                d.x = a * this._mapTileWidth;
                d.y = -c * this._mapTileHeight;
                break;
            case b.TMX.ORIENTATION_ISO:
                d.x = this._mapTileWidth / 2 * (a - c);
                d.y = this._mapTileHeight / 2 * ( - a - c);
                break;
            case b.TMX.ORIENTATION_HEX:
                (0 !== a || 0 !== c) && b.Logger.info("hexagonal map\u8fd8\u6ca1\u6709\u5b8c\u6210")
            }
            return d
        };
        a.prototype.setupTiles = function() {
            this._tileSet.imageWidth = this._texture.getTextureWidth();
            this._tileSet.imageHeight = this._texture.getTextureHeight();
            for (var a = this._layerHeight,
            c = this._layerWidth,
            d = 0; d < a; d++) for (var l = 0; l < c; l++) {
                var g = this._tiles[l + c * d];
                0 !== g && (this.appendTileForGID(g, l, d), this._minGID = Math.min(g, this._minGID), this._maxGID = Math.max(g, this._maxGID))
            }
            this._maxGID >= this._tileSet.firstGid && this._minGID >= this._tileSet.firstGid || b.Logger.warning("\u6bcf\u4e2alayer\u53ea\u652f\u63011\u4e2atileset")
        };
        a.prototype.appendTileForGID = function(a, b, d) {
            var l = this._tileSet.rectForGID(a),
            l = this.reusedTileWithRect(l);
            this.setupTileSprite(l, b, d, a);
            c.prototype.addChild.call(this, l, this._atlasIndexArray.length);
            return l
        };
        a.prototype.reusedTileWithRect = function(a) {
            var c = b.Bitmap.initWithTexture(b.TextureCache.getInstance().getTexture(this._tileSet.sourceImage)),
            d = new b.SpriteSheetFrame;
            d.x = a.x;
            d.y = a.y;
            d.w = this._mapTileWidth;
            d.h = this._mapTileHeight;
            c.spriteFrame = d;
            return c
        };
        a.prototype.setupTileSprite = function(a, b, c, d) {
            b = this.getPositionAt(b, c);
            a.x = b.x;
            a.y = b.y
        };
        a.prototype.getPositionAt = function(a, c) {
            var d = b.Point.identity;
            switch (this._layerOrientation) {
            case b.TMX.ORIENTATION_ORTHO:
                d = this.positionForOrthoAt(a, c);
                break;
            case b.TMX.ORIENTATION_ISO:
                d = this.positionForIsoAt(a, c);
                break;
            case b.TMX.ORIENTATION_HEX:
                d = this.positionForHexAt(a, c);
                break;
            default:
                d.x = 0,
                d.y = 0
            }
            return d
        };
        a.prototype.positionForIsoAt = function(a, c) {
            b.Point.identity.x = this._mapTileWidth / 2 * (this._layerWidth + a - c - 1);
            b.Point.identity.y = -this._mapTileHeight / 2 * (2 * this._layerHeight - a - c - 2);
            return b.Point.identity
        };
        a.prototype.positionForOrthoAt = function(a, c) {
            b.Point.identity.x = a * this._mapTileWidth;
            b.Point.identity.y = -(this._layerHeight - c - 1) * this._mapTileHeight;
            return b.Point.identity
        };
        a.prototype.positionForHexAt = function(a, c) {
            var d = 1 == a % 2 ? -this._mapTileHeight / 2 : 0;
            b.Point.identity.x = 3 * a * this._mapTileWidth / 4;
            b.Point.identity.y = -((this._layerHeight - c - 1) * this._mapTileHeight + d);
            return b.Point.identity
        };
        a.prototype.getTileGIDAt = function(a, c) { (a >= this._layerWidth || c >= this._layerHeight || 0 > a || 0 > c) && b.Logger.fatal("TMXLayer.getTileGIDAt():\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
            return ! this._tiles || !this._atlasIndexArray ? (b.Logger.info("TMXLayer.getTileGIDAt(): tileMap\u5df2\u7ecf\u88ab\u9500\u6bc1"), null) : (this._tiles[0 | a + c * this._layerWidth] & b.TMX.TILE_FLIPPED_MASK) >>> 0
        };
        a.prototype.getProperties = function() {
            return this._properties
        };
        a.prototype.setProperties = function(a) {
            this._properties = a
        };
        a.prototype.getProperty = function(a) {
            return this._properties[a]
        };
        a.prototype.getLayerName = function() {
            return this._layerName
        };
        return a
    } (b.DisplayObjectContainer);
    b.TMXLayer = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function b() {}
        b.TILE_HORIZONTAL_FLAG = 2147483648;
        b.TILE_VERTICAL_FLAG = 1073741824;
        b.TILE_DIAGONAL_FLAG = 536870912;
        b.TILE_FLIPPED_ALL = (b.TILE_HORIZONTAL_FLAG | b.TILE_VERTICAL_FLAG | b.TILE_DIAGONAL_FLAG) >>> 0;
        b.TILE_FLIPPED_MASK = ~b.TILE_FLIPPED_ALL >>> 0;
        b.LAYER_ATTRIB_NONE = 1;
        b.LAYER_ATTRIB_BASE64 = 2;
        b.LAYER_ATTRIB_GZIP = 4;
        b.LAYER_ATTRIB_ZLIB = 8;
        b.PROPERTY_NONE = 0;
        b.PROPERTY_MAP = 1;
        b.PROPERTY_LAYER = 2;
        b.PROPERTY_OBJECTGROUP = 3;
        b.PROPERTY_OBJECT = 4;
        b.PROPERTY_TILE = 5;
        b.ORIENTATION_ORTHO = 0;
        b.ORIENTATION_HEX = 1;
        b.ORIENTATION_ISO = 2;
        return b
    } ();
    b.TMX = d
})(ns_egret || (ns_egret = {})); (function(b) {
    var d = function() {
        function d() {
            this._parentGID = this._objectGroups = this._tileSets = this._layers = this._tileHeight = this._tileWidth = this._mapHeight = this._mapWidth = this._orientation = null;
            this._storingCharacters = !1;
            this._tileProperties = this._currentString = this._TMXFileName = this._properties = null
        }
        d.createWithFile = function(a) {
            var b = new d;
            b.initWithTMXFile(a);
            return b
        };
        d.prototype.initWithTMXFile = function(a) {
            this.internalInit(a);
            this.parseXMXFile(this._TMXFileName)
        };
        d.prototype.internalInit = function(a) {
            this._tileSets = [];
            this._layers = [];
            this._TMXFileName = a;
            this._objectGroups = [];
            this._properties = [];
            this._tileProperties = [];
            this._currentString = "";
            this._storingCharacters = !1
        };
        d.prototype.parseXMXFile = function(d) {
            var e = b.ResourceLoader.create(d).data;
            null == e && b.Logger.fatal("tmx\u6587\u4ef6\u6ca1\u6709\u52a0\u8f7d\uff1a" + d);
            var g;
            d = b.SAXParser.getInstance().tmxParse(e, !0).documentElement;
            d.getAttribute("version");
            e = d.getAttribute("orientation");
            if ("map" == d.nodeName && ("orthogonal" == e ? this.setOrientation(b.TMX.ORIENTATION_ORTHO) : "isometric" == e ? this.setOrientation(b.TMX.ORIENTATION_ISO) : "hexagonal" == e ? this.setOrientation(b.TMX.ORIENTATION_HEX) : null !== e && b.Logger.info("TMXFomat: Unsupported orientation:" + this.getOrientation()), this._mapWidth = parseFloat(d.getAttribute("width")), this._mapHeight = parseFloat(d.getAttribute("height")), this._tileWidth = parseFloat(d.getAttribute("tilewidth")), this._tileHeight = parseFloat(d.getAttribute("tileheight")), g = d.querySelectorAll("map \x3e properties \x3e  property"))) {
                for (var m = {},
                e = 0; e < g.length; e++) m[g[e].getAttribute("name")] = g[e].getAttribute("value");
                this.setProperties(m)
            }
            g = d.getElementsByTagName("tileset");
            "map" !== d.nodeName && (g = [], g.push(d));
            for (e = 0; e < g.length; e++) {
                var n = g[e];
                if (m = n.getAttribute("source")) this.parseXMLFile(m);
                else {
                    m = new c;
                    m.name = n.getAttribute("name") || "";
                    m.firstGid = parseInt(n.getAttribute("firstgid")) || 0;
                    m.spacing = parseInt(n.getAttribute("spacing")) || 0;
                    m.margin = parseInt(n.getAttribute("margin")) || 0;
                    m.tileWidth = parseFloat(n.getAttribute("tilewidth"));
                    m.tileHeight = parseFloat(n.getAttribute("tileheight"));
                    var n = n.getElementsByTagName("image")[0].getAttribute("source"),
                    r = -1;
                    this._TMXFileName && (r = this._TMXFileName.lastIndexOf("/")); - 1 !== r ? (r = this._TMXFileName.substr(0, r + 1), m.sourceImage = r + n) : m.sourceImage = n;
                    this.setTilesets(m)
                }
            }
            if (m = d.querySelectorAll("tile")) for (e = 0; e < m.length; e++) if (g = m[e], this.setParentGID(parseInt(this._tileSets[0].firstGid) + parseInt(g.getAttribute("id") || 0)), n = g.querySelectorAll("properties \x3e property")) {
                r = {};
                for (g = 0; g < n.length; g++) {
                    var h = n[g].getAttribute("name"),
                    q = n[g].getAttribute("value");
                    r[h] = q
                }
                this._tileProperties[this.getParentGID()] = r
            }
            if (m = d.getElementsByTagName("layer")) for (e = 0; e < m.length; e++) {
                r = m[e];
                h = r.getElementsByTagName("data")[0];
                n = new f;
                n.name = r.getAttribute("name");
                n.layerWidth = parseFloat(r.getAttribute("width"));
                n.layerHeight = parseFloat(r.getAttribute("height"));
                g = r.getAttribute("visible");
                n.visible = "0" != g;
                g = r.getAttribute("opacity") || 1;
                n.opacity = g ? parseFloat(g) : 1;
                n.layerX = parseFloat(r.getAttribute("x")) || 0;
                n.layerY = parseFloat(r.getAttribute("y")) || 0;
                q = "";
                for (g = 0; g < h.childNodes.length; g++) q += h.childNodes[g].nodeValue;
                q = q.trim();
                g = h.getAttribute("compression");
                var p = h.getAttribute("encoding");
                if (g && "gzip" !== g && "zlib" !== g) return b.Logger.fatal("TMXMapInfo.parseXMLFile(): unsupported compression method"),
                null;
                switch (g) {
                case "gzip":
                    n._tiles = b.Utils.unzipBase64AsArray(q, 4);
                    break;
                case "zlib":
                    g = new Zlib.Inflate(b.Codec.Base64.decodeAsArray(q, 1));
                    n._tiles = b.Utils.uint8ArrayToUint32Array(g.decompress());
                    break;
                case null:
                case "":
                    if ("base64" == p) n._tiles = b.Codec.Base64.decodeAsArray(q, 4);
                    else if ("csv" === p) {
                        n._tiles = [];
                        g = q.split(",");
                        for (h = 0; h < g.length; h++) n._tiles.push(parseInt(g[h]))
                    } else {
                        g = h.getElementsByTagName("tile");
                        n._tiles = [];
                        for (h = 0; h < g.length; h++) n._tiles.push(parseInt(g[h].getAttribute("gid")))
                    }
                    break;
                default:
                    b.Logger.info("TMXMapInfo.parseXMLFile(): Only base64 and/or gzip/zlib maps are supported")
                }
                if (r = r.querySelectorAll("properties \x3e property")) {
                    h = {};
                    for (g = 0; g < r.length; g++) h[r[g].getAttribute("name")] = r[g].getAttribute("value");
                    n.setProperties(h)
                }
                this.setLayers(n)
            }
            if (m = d.getElementsByTagName("objectgroup")) for (e = 0; e < m.length; e++) {
                r = m[e];
                n = new a;
                n.setGroupName(r.getAttribute("name"));
                n.setPositionOffsetX(parseFloat(r.getAttribute("x")) * this._tileWidth || 0);
                n.setPositionOffsetY(parseFloat(r.getAttribute("y")) * this._tileHeight || 0);
                if (h = r.querySelectorAll("objectgroup \x3e properties \x3e property")) for (g = 0; g < h.length; g++) q = {},
                q[h[g].getAttribute("name")] = h[g].getAttribute("value"),
                n.setProperties(q);
                if (r = r.querySelectorAll("object")) for (g = 0; g < r.length; g++) {
                    q = r[g];
                    h = {};
                    h.name = q.getAttribute("name") || "";
                    h.type = q.getAttribute("type") || "";
                    h.x = parseInt(q.getAttribute("x") || 0) + n.getPositionOffsetX();
                    p = parseInt(q.getAttribute("y") || 0) + n.getPositionOffsetY();
                    h.y = Math.floor(this._mapHeight * this._tileHeight) - p - h.height;
                    h.width = parseInt(q.getAttribute("width")) || 0;
                    h.height = parseInt(q.getAttribute("height")) || 0;
                    if (p = q.querySelectorAll("properties \x3e property")) for (var v = 0; v < p.length; v++) h[p[v].getAttribute("name")] = p[v].getAttribute("value");
                    if ((p = q.querySelectorAll("polygon")) && 0 < p.length)(p = p[0].getAttribute("points")) && (h.polygonPoints = this.parsePointsString(p));
                    if ((q = q.querySelectorAll("polyline")) && 0 < q.length)(q = q[0].getAttribute("points")) && (h.polylinePoints = this.parsePointsString(q));
                    n.addObject(h)
                }
                this.setObjectGroups(n)
            }
            return d
        };
        d.prototype.parsePointsString = function(a) {
            if (!a) return null;
            var b = [];
            a = a.split(" ");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].split(",");
                b.push({
                    x: d[0],
                    y: d[1]
                })
            }
            return b
        };
        d.prototype.getOrientation = function() {
            return this._orientation
        };
        d.prototype.setOrientation = function(a) {
            this._orientation = a
        };
        d.prototype.getProperties = function() {
            return this._properties
        };
        d.prototype.setProperties = function(a) {
            this._properties = a
        };
        d.prototype.getTilesets = function() {
            return this._tileSets
        };
        d.prototype.setTilesets = function(a) {
            this._tileSets.push(a)
        };
        d.prototype.getParentGID = function() {
            return this._parentGID
        };
        d.prototype.setParentGID = function(a) {
            this._parentGID = a
        };
        d.prototype.getLayers = function() {
            return this._layers
        };
        d.prototype.setLayers = function(a) {
            this._layers.push(a)
        };
        d.prototype.getObjectGroups = function() {
            return this._objectGroups
        };
        d.prototype.setObjectGroups = function(a) {
            this._objectGroups.push(a)
        };
        d.prototype.getTileProperties = function() {
            return this._tileProperties
        };
        d.prototype.setTileProperties = function(a) {
            this._tileProperties.push(a)
        };
        d.prototype.getTileWidth = function() {
            return this._tileWidth
        };
        d.prototype.getTileHeight = function() {
            return this._tileHeight
        };
        d.prototype.getMapWidth = function() {
            return this._mapWidth
        };
        d.prototype.getMapHeight = function() {
            return this._mapHeight
        };
        return d
    } ();
    b.TMXMapInfo = d;
    var c = function() {
        function a() {
            this.name = ""
        }
        a.prototype.rectForGID = function(a) {
            var c = b.Point.identity;
            a &= b.TMX.TILE_FLIPPED_MASK;
            a -= parseInt(this.firstGid, 10);
            var d = Math.floor((this.imageWidth - 2 * this.margin + this.spacing) / (this.tileWidth + this.spacing));
            c.x = parseInt(a % d * (this.tileWidth + this.spacing) + this.margin, 10);
            c.y = parseInt(Math.floor(a / d) * (this.tileHeight + this.spacing) + this.margin, 10);
            return c
        };
        return a
    } ();
    b.TMXTilesetInfo = c;
    var a = function() {
        function a() {
            this._properties = [];
            this._objects = []
        }
        a.prototype.getGroupName = function() {
            return this._groupName
        };
        a.prototype.setGroupName = function(a) {
            this._groupName = a
        };
        a.prototype.getPositionOffsetX = function() {
            return this._positionOffsetX
        };
        a.prototype.setPositionOffsetX = function(a) {
            this._positionOffsetX = a
        };
        a.prototype.getPositionOffsetY = function() {
            return this._positionOffsetY
        };
        a.prototype.setPositionOffsetY = function(a) {
            this._positionOffsetY = a
        };
        a.prototype.getProperties = function() {
            return this._properties
        };
        a.prototype.setProperties = function(a) {
            this._properties.push(a)
        };
        a.prototype.getObjects = function() {
            return this._objects
        };
        a.prototype.addObject = function(a) {
            this._objects.push(a)
        };
        return a
    } ();
    b.TMXObjectGroup = a;
    var f = function() {
        function a() {
            this._minGID = 1E5;
            this._maxGID = 0
        }
        a.prototype.getProperties = function() {
            return this._properties
        };
        a.prototype.setProperties = function(a) {
            this._properties = a
        };
        return a
    } ();
    b.TMXLayerInfo = f
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments);
            this.className = "VirtualJoystick";
            this.leftButtonWidth = 79;
            this.leftButtonHeight = 46;
            this.leftButtonOffset = 30;
            this.leftTouchPointY = this.leftTouchPointX = this.bottomImageDownName = this.rightImageDownName = this.topImageDownName = this.leftImageDownName = this.bottomImageNormalName = this.rightImageNormalName = this.topImageNormalName = this.leftImageNormalName = this.bottomImageDown = this.rightImageDown = this.topImageDown = this.leftImageDown = this.bottomImageNormal = this.rightImageNormal = this.topImageNormal = this.leftImageNormal = this.bottomNode = this.rightNode = this.topNode = this.leftNode = null;
            this.isLeftTouching = !1;
            this.rightButtonImageDownName = this.rightButtonImageNormalName = this.rightButtonImageDown = this.rightButtonImageNormal = null;
            this.rightButtonWidth = 0;
            this.rightTouchPointY = this.rightTouchPointX = null;
            this.isRightTouching = !1
        }
        __extends(a, c);
        a.getInstance = function() {
            null == a.instacce && (a.instacce = new a);
            return a.instacce
        };
        a.prototype.show = function() {
            this.leftContainer = new b.DisplayObjectContainer;
            this.leftContainer.touchEnabled = !0;
            this.addChild(this.leftContainer);
            this.leftNode = new b.DisplayObjectContainer;
            this.leftNode.x = -this.leftButtonWidth - this.leftButtonOffset;
            this.leftNode.y = -this.leftButtonHeight / 2;
            this.leftContainer.addChild(this.leftNode);
            this.topNode = new b.DisplayObjectContainer;
            this.topNode.x = -this.leftButtonHeight / 2;
            this.topNode.y = -this.leftButtonWidth - this.leftButtonOffset;
            this.leftContainer.addChild(this.topNode);
            this.rightNode = new b.DisplayObjectContainer;
            this.rightNode.x = this.leftButtonOffset;
            this.rightNode.y = -this.leftButtonHeight / 2;
            this.leftContainer.addChild(this.rightNode);
            this.bottomNode = new b.DisplayObjectContainer;
            this.bottomNode.x = -this.leftButtonHeight / 2;
            this.bottomNode.y = this.leftButtonOffset;
            this.leftContainer.addChild(this.bottomNode);
            this.rightButtonNode = new b.DisplayObjectContainer;
            this.addChild(this.rightButtonNode);
            this.resetLeft();
            this.resetRight();
            this.rightButtonWidth = this.rightButtonNode.getBounds().width;
            this.rightButtonNode.x = (b.StageDelegate.getInstance().getDesignWidth() - this.rightButtonWidth - this.x) / this.scaleX;
            this.rightButtonNode.y = -this.rightButtonWidth / 2;
            this.rightButtonNode.touchEnabled = !0;
            var a = b.TextureCache.getInstance().getTexture("alpha_0.png"),
            a = b.Bitmap.initWithTexture(a),
            c = this.leftButtonWidth + this.leftButtonOffset;
            a.scaleX = a.scaleY = 2 * c;
            a.x = a.y = -c;
            this.leftContainer.addChild(a);
            this.leftContainer.addEventListener(b.TouchEvent.TOUCH_BEGAN, this.onLeftTouchBegin, this);
            this.leftContainer.addEventListener(b.TouchEvent.TOUCH_MOVE, this.onLeftTouchMoved, this);
            this.rightButtonNode.addEventListener(b.TouchEvent.TOUCH_BEGAN, this.onRightTouchBegin, this);
            this.rightButtonNode.addEventListener(b.TouchEvent.TOUCH_MOVE, this.onRightTouchMoved, this);
            b.MainContext.instance.stage.addEventListener(b.TouchEvent.TOUCH_END, this.onTouchEnded, this);
            b.Ticker.getInstance().register(this.update, this)
        };
        a.prototype.update = function() {
            null != this.leftTouchPointX && (null != this.leftTouchPointY && this.isLeftTouching) && this.checkIsLeftTouchInside() && this.sendLeftTouchEvent();
            null != this.rightTouchPointX && (null != this.rightTouchPointY && this.isRightTouching) && this.checkIsRightTouchInside() && (this.changeBtnState(this.rightButtonNode, "Down"), this.dispatchEvent(a.ON_TOUCH_RIGHT))
        };
        a.prototype.resetLeft = function() {
            this.changeBtnState(this.leftNode, "Normal");
            this.changeBtnState(this.topNode, "Normal");
            this.changeBtnState(this.rightNode, "Normal");
            this.changeBtnState(this.bottomNode, "Normal")
        };
        a.prototype.resetRight = function() {
            this.changeBtnState(this.rightButtonNode, "Normal")
        };
        a.prototype.changeBtnState = function(a, b) {
            var c;
            switch (a) {
            case this.leftNode:
                null == this["leftImage" + b] && (this["leftImage" + b] = this.createBtn(this["leftImage" + b + "Name"]));
                c = this["leftImage" + b];
                break;
            case this.topNode:
                null == this["topImage" + b] && (this["topImage" + b] = this.createBtn(this["topImage" + b + "Name"]));
                c = this["topImage" + b];
                break;
            case this.rightNode:
                null == this["rightImage" + b] && (this["rightImage" + b] = this.createBtn(this["rightImage" + b + "Name"]));
                c = this["rightImage" + b];
                break;
            case this.bottomNode:
                null == this["bottomImage" + b] && (this["bottomImage" + b] = this.createBtn(this["bottomImage" + b + "Name"]));
                c = this["bottomImage" + b];
                break;
            case this.rightButtonNode:
                null == this["rightButtonImage" + b] && (this["rightButtonImage" + b] = this.createBtn(this["rightButtonImage" + b + "Name"])),
                c = this["rightButtonImage" + b]
            }
            a.removeAllChildren();
            a.addChild(c)
        };
        a.prototype.createBtn = function(a) {
            return b.Bitmap.initWithTexture(b.TextureCache.getInstance().getTexture(a))
        };
        a.prototype.onLeftTouchBegin = function(a, b) {
            this.leftTouchId = b.touchId;
            var c = b.getLocalPoint();
            this.leftTouchPointX = c.x;
            this.leftTouchPointY = c.y;
            this.checkIsLeftTouchInside() && (this.isLeftTouching = !0)
        };
        a.prototype.checkIsLeftTouchInside = function() {
            return this.leftTouchPointX * this.scaleX > -this.leftButtonWidth - this.leftButtonOffset && this.leftTouchPointX * this.scaleX < this.leftButtonWidth + this.leftButtonOffset && this.leftTouchPointY * this.scaleY > -this.leftButtonWidth - this.leftButtonOffset && this.leftTouchPointY * this.scaleY < this.leftButtonWidth + this.leftButtonOffset ? !0 : !1
        };
        a.prototype.onLeftTouchMoved = function(a, b) {
            var c = b.getLocalPoint();
            this.leftTouchPointX = c.x;
            this.leftTouchPointY = c.y
        };
        a.prototype.onTouchEnded = function(b, c) {
            if (null == this.leftTouchId || this.leftTouchId == c.touchId) this.isLeftTouching && (this.isLeftTouching = !1, this.resetLeft(), this.dispatchEvent(a.STOP_TOUCH_LEFT)),
            this.leftTouchId = null;
            if (null == this.rightTouchId || this.rightTouchId == c.touchId) this.isRightTouching && (this.isRightTouching = !1, this.resetRight(), this.dispatchEvent(a.STOP_TOUCH_RIGHT)),
            this.rightTouchId = null
        };
        a.prototype.sendLeftTouchEvent = function() {
            if (this.checkIsLeftTouchInside()) if (this.leftTouchPointX > -this.leftButtonOffset && this.leftTouchPointX < this.leftButtonOffset && this.leftTouchPointY > -this.leftButtonOffset && this.leftTouchPointY < this.leftButtonOffset) this.resetLeft();
            else {
                var b = Math.atan2(this.leftTouchPointY, this.leftTouchPointX) * (180 / Math.PI);
                0 > b && (b += 360);
                var c = [];
                330 < b || 30 > b ? (this.changeBtnState(this.leftNode, "Normal"), this.changeBtnState(this.topNode, "Normal"), this.changeBtnState(this.rightNode, "Down"), this.changeBtnState(this.bottomNode, "Normal"), c.push(a.DIRECTION_RIGHT)) : 30 < b && 60 > b ? (this.changeBtnState(this.leftNode, "Normal"), this.changeBtnState(this.topNode, "Normal"), this.changeBtnState(this.rightNode, "Down"), this.changeBtnState(this.bottomNode, "Down"), c.push(a.DIRECTION_BOTTOM, a.DIRECTION_RIGHT)) : 60 < b && 120 > b ? (this.changeBtnState(this.leftNode, "Normal"), this.changeBtnState(this.topNode, "Normal"), this.changeBtnState(this.rightNode, "Normal"), this.changeBtnState(this.bottomNode, "Down"), c.push(a.DIRECTION_BOTTOM)) : 120 < b && 150 > b ? (this.changeBtnState(this.leftNode, "Down"), this.changeBtnState(this.topNode, "Normal"), this.changeBtnState(this.rightNode, "Normal"), this.changeBtnState(this.bottomNode, "Down"), c.push(a.DIRECTION_BOTTOM, a.DIRECTION_LEFT)) : 150 < b && 210 > b ? (this.changeBtnState(this.leftNode, "Down"), this.changeBtnState(this.topNode, "Normal"), this.changeBtnState(this.rightNode, "Normal"), this.changeBtnState(this.bottomNode, "Normal"), c.push(a.DIRECTION_LEFT)) : 210 < b && 240 > b ? (this.changeBtnState(this.leftNode, "Down"), this.changeBtnState(this.topNode, "Down"), this.changeBtnState(this.rightNode, "Normal"), this.changeBtnState(this.bottomNode, "Normal"), c.push(a.DIRECTION_LEFT, a.DIRECTION_TOP)) : 240 < b && 300 > b ? (this.changeBtnState(this.leftNode, "Normal"), this.changeBtnState(this.topNode, "Down"), this.changeBtnState(this.rightNode, "Normal"), this.changeBtnState(this.bottomNode, "Normal"), c.push(a.DIRECTION_TOP)) : 300 < b && 330 > b && (this.changeBtnState(this.leftNode, "Normal"), this.changeBtnState(this.topNode, "Down"), this.changeBtnState(this.rightNode, "Down"), this.changeBtnState(this.bottomNode, "Normal"), c.push(a.DIRECTION_TOP, a.DIRECTION_RIGHT));
                this.dispatchEvent(a.ON_TOUCH_LEFT, c)
            }
        };
        a.prototype.onRightTouchBegin = function(a, b) {
            this.rightTouchId = b.touchId;
            var c = b.getLocalPoint();
            this.rightTouchPointX = c.x;
            this.rightTouchPointY = c.y;
            this.checkIsRightTouchInside() && (this.isRightTouching = !0)
        };
        a.prototype.checkIsRightTouchInside = function() {
            return this.rightTouchPointX * this.scaleX > -this.rightButtonWidth && this.rightTouchPointX * this.scaleX < this.rightButtonWidth && this.rightTouchPointY * this.scaleY > -this.rightButtonWidth && this.rightTouchPointY * this.scaleY < this.rightButtonWidth ? !0 : !1
        };
        a.prototype.onRightTouchMoved = function(a, b) {
            var c = b.getLocalPoint();
            this.rightTouchPointX = c.x;
            this.rightTouchPointY = c.y
        };
        a.prototype.setBtnVisible = function(b, c) {
            switch (b) {
            case a.DIRECTION_LEFT:
                this.leftNode.visible = c;
                break;
            case a.DIRECTION_TOP:
                this.topNode.visible = c;
                break;
            case a.DIRECTION_RIGHT:
                this.rightNode.visible = c;
                break;
            case a.DIRECTION_BOTTOM:
                this.bottomNode.visible = c
            }
        };
        a.prototype.setButtonWidth = function(a) {
            this.leftButtonWidth = a
        };
        a.prototype.setButtonHeight = function(a) {
            this.leftButtonHeight = a
        };
        a.prototype.setButtonOffset = function(a) {
            this.leftButtonOffset = a
        };
        a.prototype.setLeftImageNormalName = function(a) {
            this.leftImageNormalName = a
        };
        a.prototype.setTopImageNormalName = function(a) {
            this.topImageNormalName = a
        };
        a.prototype.setRightImageNormalName = function(a) {
            this.rightImageNormalName = a
        };
        a.prototype.setBottomImageNormalName = function(a) {
            this.bottomImageNormalName = a
        };
        a.prototype.setLeftImageDownName = function(a) {
            this.leftImageDownName = a
        };
        a.prototype.setTopImageDownName = function(a) {
            this.topImageDownName = a
        };
        a.prototype.setRightImageDownName = function(a) {
            this.rightImageDownName = a
        };
        a.prototype.setBottomImageDownName = function(a) {
            this.bottomImageDownName = a
        };
        a.prototype.setRightButtonImageNormalName = function(a) {
            this.rightButtonImageNormalName = a
        };
        a.prototype.setRightButtonImageDownName = function(a) {
            this.rightButtonImageDownName = a
        };
        a.DIRECTION_LEFT = 1;
        a.DIRECTION_TOP = 2;
        a.DIRECTION_RIGHT = 3;
        a.DIRECTION_BOTTOM = 4;
        a.ON_TOUCH_LEFT = "VirtualJoystickClickLeft";
        a.ON_TOUCH_RIGHT = "VirtualJoystickClickRight";
        a.STOP_TOUCH_LEFT = "VirtualJoystickStopTouchLeft";
        a.STOP_TOUCH_RIGHT = "VirtualJoystickStopTouchRight";
        a.instacce = null;
        return a
    } (b.DisplayObjectContainer);
    b.VirtualJoystick = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        a.prototype.onActivity = function() {
            c.prototype.onActivity.call(this);
            this.addEventListener(b.TouchEvent.TOUCH_TAP, this.onTouchTap, this)
        };
        a.prototype.onCancel = function() {
            c.prototype.onCancel.call(this);
            this.removeEventListener(b.TouchEvent.TOUCH_TAP, this.onTouchTap, this)
        };
        a.prototype.onTouchTap = function() {
            console.log("tap!!")
        };
        return a
    } (b.ComponentBase);
    b.Button = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a(a, d) {
            "undefined" === typeof d && (d = "");
            c.call(this);
            "" != d && (this._bg = b.Bitmap.initWithTexture(b.TextureCache.getInstance().getTexture(d)), this.addChild(this._bg));
            var k = b.TextureCache.getInstance().getTexture(a);
            this._barWidth = k.getTextureWidth();
            this._bar = b.Bitmap.initWithTexture(k);
            this.addChild(this._bar);
            k = {
                x: 0,
                y: 0,
                width: this._barWidth,
                height: k.getTextureHeight()
            };
            this._bar.mask = k
        }
        __extends(a, c);
        a.prototype.setOffset = function(a, b) {
            this._bar.x = a;
            this._bar.y = b
        };
        a.prototype.setProgress = function(a, b) {
            this._bar.mask.width = this._barWidth * a / b
        };
        return a
    } (b.DisplayObjectContainer);
    b.ProgressBar = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a(a) {
            c.call(this);
            this.texture = a;
            this._right = this._left = this._bottom = this._top = this._defaultPadding = 5;
            this._scaleHeight = this._scaleWidth = 0
        }
        __extends(a, c);
        a.prototype.setScaleGrid = function(a, c, d, l) {
            "undefined" === typeof a && (a = this._defaultPadding);
            "undefined" === typeof c && (c = this._defaultPadding);
            "undefined" === typeof d && (d = this._defaultPadding);
            "undefined" === typeof l && (l = this._defaultPadding);
            b.DEBUG && b.DEBUG.SCALE_BITMAP_SET_SCALE_GRID && b.DEBUG.checkSetScaleGrid(this.texture, a, c, d, l);
            this._top = a;
            this._bottom = c;
            this._left = d;
            this._right = l
        };
        a.prototype.setContentSize = function(a, d) {
            c.prototype.setContentSize.call(this, a, d);
            this.texture || b.Logger.fatal("Scale9Bitmap\u6ca1\u6709\u7eb9\u7406");
            0 < parseInt(a) && (this._scaleWidth = a);
            0 < parseInt(d) && (this._scaleHeight = d)
        };
        a.prototype.render = function(a) {
            var c = this.texture,
            d = c.getTextureWidth(),
            l = c.getTextureHeight(),
            g = this._scaleWidth,
            m = this._scaleHeight; (!c || 0 == g || 0 == m) && b.Logger.fatal("ScaleBitmap\u9700\u8981\u8bbe\u7f6eScaleSize");
            var c = l - this._top - this._bottom,
            n = d - this._left - this._right,
            m = m - this._top - this._bottom,
            r = g - this._left - this._right;
            this.drawImage(a, this.texture, 0, 0, this._left, this._top, 0, 0, this._left, this._top);
            a.translate(this._left, 0);
            this.drawImage(a, this.texture, this._left, 0, n, this._top, 0, 0, r, this._top);
            a.translate(r, 0);
            this.drawImage(a, this.texture, d - this._right, 0, this._right, this._top, 0, 0, this._right, this._top);
            a.translate( - (g - this._right), this._top);
            this.drawImage(a, this.texture, 0, this._top, this._left, c, 0, 0, this._left, m);
            a.translate(this._left, 0);
            this.drawImage(a, this.texture, this._left, this._top, n, c, 0, 0, r, m);
            a.translate(r, 0);
            this.drawImage(a, this.texture, d - this._right, this._top, this._right, c, 0, 0, this._right, m);
            a.translate( - (g - this._right), m);
            this.drawImage(a, this.texture, 0, l - this._bottom, this._left, this._bottom, 0, 0, this._left, this._bottom);
            a.translate(this._left, 0);
            this.drawImage(a, this.texture, this._left, l - this._bottom, n, this._bottom, 0, 0, r, this._bottom);
            a.translate(r, 0);
            this.drawImage(a, this.texture, d - this._right, l - this._bottom, this._right, this._bottom, 0, 0, this._right, this._bottom)
        };
        a.prototype.drawImage = function(a, b, c, d, g, m, n, r, h, q) {
            0 < g && 0 < m && a.drawImage(b, c, d, g, m, n, r, h, q)
        };
        return a
    } (b.DisplayObject);
    b.Scale9Bitmap = d
})(ns_egret || (ns_egret = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) {
    var d = function(c) {
        function a() {
            c.apply(this, arguments)
        }
        __extends(a, c);
        a.create = function(b, c, d) {
            "undefined" === typeof c && (c = null);
            "undefined" === typeof d && (d = null);
            var l = new a;
            l.startLoad(b, c, d);
            return l
        };
        a.prototype.startLoad = function(a, c, d) {
            this._src = a;
            this._onLoadComplete = c;
            this._onLoadCompleteThisObj = d;
            this._resource = b.ResourceLoader.create(a, b.ResourceLoader.DATA_TYPE_IMAGE);
            this._resource.addEventListener(b.ResourceLoader.LOAD_COMPLETE, this.resourceLoadComplete, this);
            this._resource.load()
        };
        a.prototype.resourceLoadComplete = function() {
            this._resource.removeEventListener(b.ResourceLoader.LOAD_COMPLETE, this.resourceLoadComplete, this);
            this._resource = null;
            this.texture = b.TextureCache.getInstance().getTexture(this._src);
            this._onLoadComplete && (this._onLoadComplete.call(this._onLoadCompleteThisObj), this._onLoadCompleteThisObj = this._onLoadComplete = null)
        };
        a.prototype._measureBounds = function() {
            return this.texture ? c.prototype._measureBounds.call(this) : b.Rectangle.identity.initialize(0, 0, 0, 0)
        };
        return a
    } (b.Bitmap);
    b.DynamicBitmap = d
})(ns_egret || (ns_egret = {}));
var __extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
},
dragonBones; (function(b) { (function(a) {
        var b = function() {
            function a(b, c) {
                "undefined" === typeof b && (b = 0);
                "undefined" === typeof c && (c = 0);
                this.x = b;
                this.y = c
            }
            a.prototype.toString = function() {
                return "[Point (x\x3d" + this.x + " y\x3d" + this.y + ")]"
            };
            return a
        } ();
        a.Point = b;
        b = function() {
            return function(a, b, c, d) {
                "undefined" === typeof a && (a = 0);
                "undefined" === typeof b && (b = 0);
                "undefined" === typeof c && (c = 0);
                "undefined" === typeof d && (d = 0);
                this.x = a;
                this.y = b;
                this.width = c;
                this.height = d
            }
        } ();
        a.Rectangle = b;
        b = function() {
            function a() {
                this.a = 1;
                this.c = this.b = 0;
                this.d = 1;
                this.ty = this.tx = 0
            }
            a.prototype.invert = function() {
                var a = this.a,
                b = this.b,
                c = this.c,
                d = this.d,
                e = this.tx,
                f = a * d - b * c;
                this.a = d / f;
                this.b = -b / f;
                this.c = -c / f;
                this.d = a / f;
                this.tx = (c * this.ty - d * e) / f;
                this.ty = -(a * this.ty - b * e) / f
            };
            return a
        } ();
        a.Matrix = b;
        b = function() {
            return function() {
                this.redOffset = this.redMultiplier = this.greenOffset = this.greenMultiplier = this.blueOffset = this.blueMultiplier = this.alphaOffset = this.alphaMultiplier = 0
            }
        } ();
        a.ColorTransform = b
    })(b.geom || (b.geom = {}));
    var d = b.geom; (function(a) {
        var b = function() {
            return function(a) {
                this.type = a
            }
        } ();
        a.Event = b;
        var c = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.FADE_IN = "fadeIn";
            b.FADE_OUT = "fadeOut";
            b.START = "start";
            b.COMPLETE = "complete";
            b.LOOP_COMPLETE = "loopComplete";
            b.FADE_IN_COMPLETE = "fadeInComplete";
            b.FADE_OUT_COMPLETE = "fadeOutComplete";
            return b
        } (b);
        a.AnimationEvent = c;
        c = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.Z_ORDER_UPDATED = "zOrderUpdated";
            return b
        } (b);
        a.ArmatureEvent = c;
        c = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.ANIMATION_FRAME_EVENT = "animationFrameEvent";
            b.BONE_FRAME_EVENT = "boneFrameEvent";
            return b
        } (b);
        a.FrameEvent = c;
        b = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.SOUND = "sound";
            b.BONE_FRAME_EVENT = "boneFrameEvent";
            return b
        } (b);
        a.SoundEvent = b;
        b = function() {
            function a() {}
            a.prototype.hasEventListener = function(a) {
                return this._listenersMap && this._listenersMap[a] ? !0 : !1
            };
            a.prototype.addEventListener = function(a, b) {
                if (a && b) {
                    this._listenersMap || (this._listenersMap = {});
                    var c = this._listenersMap[a];
                    c && this.removeEventListener(a, b);
                    c ? c.push(b) : this._listenersMap[a] = [b]
                }
            };
            a.prototype.removeEventListener = function(a, b) {
                if (this._listenersMap && a && b) {
                    var c = this._listenersMap[a];
                    if (c) for (var d = c.length,
                    e = 0; e < d; e++) c[e] == b && (1 == d ? (c.length = 0, delete this._listenersMap[a]) : c.splice(e, 1))
                }
            };
            a.prototype.removeAllEventListeners = function(a) {
                a ? delete this._listenersMap[a] : this._listenersMap = null
            };
            a.prototype.dispatchEvent = function(a) {
                if (a) {
                    var b = this._listenersMap[a.type];
                    if (b) {
                        a.target = this;
                        for (var c = b.concat(), b = b.length, d = 0; d < b; d++) c[d](a)
                    }
                }
            };
            return a
        } ();
        a.EventDispatcher = b;
        b = function(a) {
            function b() {
                a.call(this);
                if (b._instance) throw Error("Singleton already constructed!");
            }
            __extends(b, a);
            b.getInstance = function() {
                b._instance || (b._instance = new b);
                return b._instance
            };
            return b
        } (b);
        a.SoundEventManager = b
    })(b.events || (b.events = {}));
    var c = b.events; (function(a) {
        var b = function() {
            function a() {
                this.timeScale = 1;
                this.time = 0.001 * (new Date).getTime();
                this._animatableList = []
            }
            a.prototype.contains = function(a) {
                return 0 <= this._animatableList.indexOf(a)
            };
            a.prototype.add = function(a) {
                a && -1 == this._animatableList.indexOf(a) && this._animatableList.push(a)
            };
            a.prototype.remove = function(a) {
                a = this._animatableList.indexOf(a);
                0 <= a && (this._animatableList[a] = null)
            };
            a.prototype.clear = function() {
                this._animatableList.length = 0
            };
            a.prototype.advanceTime = function(a) {
                if (0 > a) {
                    var b = 0.001 * (new Date).getTime();
                    a = b - this.time;
                    this.time = b
                }
                a *= this.timeScale;
                b = this._animatableList.length;
                if (0 != b) {
                    for (var c = 0,
                    d = 0; d < b; d++) {
                        var e = this._animatableList[d];
                        e && (c != d && (this._animatableList[c] = e, this._animatableList[d] = null), e.advanceTime(a), c++)
                    }
                    if (c != d) {
                        for (b = this._animatableList.length; d < b;) this._animatableList[c++] = this._animatableList[d++];
                        this._animatableList.length = c
                    }
                }
            };
            a.clock = new a;
            return a
        } ();
        a.WorldClock = b;
        var h = function() {
            function a() {
                this.transform = new f.DBTransform;
                this.pivot = new d.Point;
                this._durationTransform = new f.DBTransform;
                this._durationPivot = new d.Point;
                this._durationColor = new d.ColorTransform
            }
            a._borrowObject = function() {
                return 0 == a._pool.length ? new a: a._pool.pop()
            };
            a._returnObject = function(b) {
                0 > a._pool.indexOf(b) && (a._pool[a._pool.length] = b);
                b.clear()
            };
            a._clear = function() {
                for (var b = a._pool.length; b--;) a._pool[b].clear();
                a._pool.length = 0
            };
            a.getEaseValue = function(b, c) {
                if (1 < c) {
                    var d = 0.5 * (1 - Math.cos(b * Math.PI)) - b;
                    c -= 1
                } else 0 < c ? d = Math.sin(b * a.HALF_PI) - b: 0 > c && (d = 1 - Math.cos(b * a.HALF_PI) - b, c *= -1);
                return d * c + b
            };
            a.prototype.fadeIn = function(a, b, c) {
                this._bone = a;
                this._animationState = b;
                this._timeline = c;
                this._originTransform = this._timeline.originTransform;
                this._originPivot = this._timeline.originPivot;
                this._tweenColor = this._tweenTransform = !1;
                this._totalTime = this._animationState.totalTime;
                this.transform.x = 0;
                this.transform.y = 0;
                this.transform.scaleX = 0;
                this.transform.scaleY = 0;
                this.transform.skewX = 0;
                this.transform.skewY = 0;
                this.pivot.x = 0;
                this.pivot.y = 0;
                this._durationTransform.x = 0;
                this._durationTransform.y = 0;
                this._durationTransform.scaleX = 0;
                this._durationTransform.scaleY = 0;
                this._durationTransform.skewX = 0;
                this._durationTransform.skewY = 0;
                this._durationPivot.x = 0;
                this._durationPivot.y = 0;
                this._currentFrame = null;
                switch (this._timeline.getFrameList().length) {
                case 0:
                    this._bone._arriveAtFrame(null, this, this._animationState, !1);
                    this._updateState = 0;
                    break;
                case 1:
                    this._updateState = -1;
                    break;
                default:
                    this._updateState = 1
                }
            };
            a.prototype.fadeOut = function() {
                this.transform.skewX = e.TransformUtil.formatRadian(this.transform.skewX);
                this.transform.skewY = e.TransformUtil.formatRadian(this.transform.skewY)
            };
            a.prototype.update = function(b) {
                if (this._updateState) if (0 < this._updateState) {
                    b = 0 == this._timeline.scale ? 1 : b / this._timeline.scale;
                    1 == b && (b = 0.99999999);
                    b += this._timeline.offset;
                    var c = Math.floor(b);
                    b -= c;
                    for (var d = this._totalTime * b,
                    f = !1,
                    h; ! this._currentFrame || d > this._currentFramePosition + this._currentFrameDuration || d < this._currentFramePosition;) f && this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !0),
                    f = !0,
                    this._currentFrame ? (h = this._timeline.getFrameList().indexOf(this._currentFrame) + 1, h >= this._timeline.getFrameList().length && (h = 0), this._currentFrame = this._timeline.getFrameList()[h]) : (h = 0, this._currentFrame = this._timeline.getFrameList()[0]),
                    this._currentFrameDuration = this._currentFrame.duration,
                    this._currentFramePosition = this._currentFrame.position;
                    f && (this.tweenActive = 0 <= this._currentFrame.displayIndex, h++, h >= this._timeline.getFrameList().length && (h = 0), f = this._timeline.getFrameList()[h], 0 == h && this._animationState.loop && this._animationState.loopCount >= Math.abs(this._animationState.loop) - 1 && 0.99999999 < ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + c - this._timeline.offset) * this._timeline.scale ? (this._updateState = 0, this._tweenEasing = NaN) : 0 > this._currentFrame.displayIndex || 0 > f.displayIndex || !this._animationState.tweenEnabled ? this._tweenEasing = NaN: isNaN(this._animationState.clip.tweenEasing) ? this._tweenEasing = this._currentFrame.tweenEasing: this._tweenEasing = this._animationState.clip.tweenEasing, isNaN(this._tweenEasing) ? this._tweenColor = this._tweenTransform = !1 : (this._durationTransform.x = f.transform.x - this._currentFrame.transform.x, this._durationTransform.y = f.transform.y - this._currentFrame.transform.y, this._durationTransform.skewX = f.transform.skewX - this._currentFrame.transform.skewX, this._durationTransform.skewY = f.transform.skewY - this._currentFrame.transform.skewY, this._durationTransform.scaleX = f.transform.scaleX - this._currentFrame.transform.scaleX, this._durationTransform.scaleY = f.transform.scaleY - this._currentFrame.transform.scaleY, 0 == h && (this._durationTransform.skewX = e.TransformUtil.formatRadian(this._durationTransform.skewX), this._durationTransform.skewY = e.TransformUtil.formatRadian(this._durationTransform.skewY)), this._durationPivot.x = f.pivot.x - this._currentFrame.pivot.x, this._durationPivot.y = f.pivot.y - this._currentFrame.pivot.y, this._tweenTransform = 0 != this._durationTransform.x || 0 != this._durationTransform.y || 0 != this._durationTransform.skewX || 0 != this._durationTransform.skewY || 0 != this._durationTransform.scaleX || 0 != this._durationTransform.scaleY || 0 != this._durationPivot.x || 0 != this._durationPivot.y ? !0 : !1, this._currentFrame.color && f.color ? (this._durationColor.alphaOffset = f.color.alphaOffset - this._currentFrame.color.alphaOffset, this._durationColor.redOffset = f.color.redOffset - this._currentFrame.color.redOffset, this._durationColor.greenOffset = f.color.greenOffset - this._currentFrame.color.greenOffset, this._durationColor.blueOffset = f.color.blueOffset - this._currentFrame.color.blueOffset, this._durationColor.alphaMultiplier = f.color.alphaMultiplier - this._currentFrame.color.alphaMultiplier, this._durationColor.redMultiplier = f.color.redMultiplier - this._currentFrame.color.redMultiplier, this._durationColor.greenMultiplier = f.color.greenMultiplier - this._currentFrame.color.greenMultiplier, this._durationColor.blueMultiplier = f.color.blueMultiplier - this._currentFrame.color.blueMultiplier, this._tweenColor = 0 != this._durationColor.alphaOffset || 0 != this._durationColor.redOffset || 0 != this._durationColor.greenOffset || 0 != this._durationColor.blueOffset || 0 != this._durationColor.alphaMultiplier || 0 != this._durationColor.redMultiplier || 0 != this._durationColor.greenMultiplier || 0 != this._durationColor.blueMultiplier ? !0 : !1) : this._currentFrame.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = -this._currentFrame.color.alphaOffset, this._durationColor.redOffset = -this._currentFrame.color.redOffset, this._durationColor.greenOffset = -this._currentFrame.color.greenOffset, this._durationColor.blueOffset = -this._currentFrame.color.blueOffset, this._durationColor.alphaMultiplier = 1 - this._currentFrame.color.alphaMultiplier, this._durationColor.redMultiplier = 1 - this._currentFrame.color.redMultiplier, this._durationColor.greenMultiplier = 1 - this._currentFrame.color.greenMultiplier, this._durationColor.blueMultiplier = 1 - this._currentFrame.color.blueMultiplier) : f.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = f.color.alphaOffset, this._durationColor.redOffset = f.color.redOffset, this._durationColor.greenOffset = f.color.greenOffset, this._durationColor.blueOffset = f.color.blueOffset, this._durationColor.alphaMultiplier = f.color.alphaMultiplier - 1, this._durationColor.redMultiplier = f.color.redMultiplier - 1, this._durationColor.greenMultiplier = f.color.greenMultiplier - 1, this._durationColor.blueMultiplier = f.color.blueMultiplier - 1) : this._tweenColor = !1), this._tweenTransform || (this._animationState.blend ? (this.transform.x = this._originTransform.x + this._currentFrame.transform.x, this.transform.y = this._originTransform.y + this._currentFrame.transform.y, this.transform.skewX = this._originTransform.skewX + this._currentFrame.transform.skewX, this.transform.skewY = this._originTransform.skewY + this._currentFrame.transform.skewY, this.transform.scaleX = this._originTransform.scaleX + this._currentFrame.transform.scaleX, this.transform.scaleY = this._originTransform.scaleY + this._currentFrame.transform.scaleY, this.pivot.x = this._originPivot.x + this._currentFrame.pivot.x, this.pivot.y = this._originPivot.y + this._currentFrame.pivot.y) : (this.transform.x = this._currentFrame.transform.x, this.transform.y = this._currentFrame.transform.y, this.transform.skewX = this._currentFrame.transform.skewX, this.transform.skewY = this._currentFrame.transform.skewY, this.transform.scaleX = this._currentFrame.transform.scaleX, this.transform.scaleY = this._currentFrame.transform.scaleY, this.pivot.x = this._currentFrame.pivot.x, this.pivot.y = this._currentFrame.pivot.y)), this._tweenColor || (this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset, this._currentFrame.color.redOffset, this._currentFrame.color.greenOffset, this._currentFrame.color.blueOffset, this._currentFrame.color.alphaMultiplier, this._currentFrame.color.redMultiplier, this._currentFrame.color.greenMultiplier, this._currentFrame.color.blueMultiplier, !0) : this._bone._isColorChanged && this._bone._updateColor(0, 0, 0, 0, 1, 1, 1, 1, !1)), this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !1));
                    if (this._tweenTransform || this._tweenColor) b = (d - this._currentFramePosition) / this._currentFrameDuration,
                    this._tweenEasing && (b = a.getEaseValue(b, this._tweenEasing));
                    this._tweenTransform && (c = this._currentFrame.transform, d = this._currentFrame.pivot, this._animationState.blend ? (this.transform.x = this._originTransform.x + c.x + this._durationTransform.x * b, this.transform.y = this._originTransform.y + c.y + this._durationTransform.y * b, this.transform.skewX = this._originTransform.skewX + c.skewX + this._durationTransform.skewX * b, this.transform.skewY = this._originTransform.skewY + c.skewY + this._durationTransform.skewY * b, this.transform.scaleX = this._originTransform.scaleX + c.scaleX + this._durationTransform.scaleX * b, this.transform.scaleY = this._originTransform.scaleY + c.scaleY + this._durationTransform.scaleY * b, this.pivot.x = this._originPivot.x + d.x + this._durationPivot.x * b, this.pivot.y = this._originPivot.y + d.y + this._durationPivot.y * b) : (this.transform.x = c.x + this._durationTransform.x * b, this.transform.y = c.y + this._durationTransform.y * b, this.transform.skewX = c.skewX + this._durationTransform.skewX * b, this.transform.skewY = c.skewY + this._durationTransform.skewY * b, this.transform.scaleX = c.scaleX + this._durationTransform.scaleX * b, this.transform.scaleY = c.scaleY + this._durationTransform.scaleY * b, this.pivot.x = d.x + this._durationPivot.x * b, this.pivot.y = d.y + this._durationPivot.y * b));
                    this._tweenColor && (this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset + this._durationColor.alphaOffset * b, this._currentFrame.color.redOffset + this._durationColor.redOffset * b, this._currentFrame.color.greenOffset + this._durationColor.greenOffset * b, this._currentFrame.color.blueOffset + this._durationColor.blueOffset * b, this._currentFrame.color.alphaMultiplier + this._durationColor.alphaMultiplier * b, this._currentFrame.color.redMultiplier + this._durationColor.redMultiplier * b, this._currentFrame.color.greenMultiplier + this._durationColor.greenMultiplier * b, this._currentFrame.color.blueMultiplier + this._durationColor.blueMultiplier * b, !0) : this._bone._updateColor(this._durationColor.alphaOffset * b, this._durationColor.redOffset * b, this._durationColor.greenOffset * b, this._durationColor.blueOffset * b, 1 + this._durationColor.alphaMultiplier * b, 1 + this._durationColor.redMultiplier * b, 1 + this._durationColor.greenMultiplier * b, 1 + this._durationColor.blueMultiplier * b, !0))
                } else this._updateState = 0,
                this._animationState.blend ? (this.transform.copy(this._originTransform), this.pivot.x = this._originPivot.x, this.pivot.y = this._originPivot.y) : (this.transform.x = this.transform.y = this.transform.skewX = this.transform.skewY = this.transform.scaleX = this.transform.scaleY = 0, this.pivot.x = 0, this.pivot.y = 0),
                this._currentFrame = this._timeline.getFrameList()[0],
                this.tweenActive = 0 <= this._currentFrame.displayIndex,
                this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset, this._currentFrame.color.redOffset, this._currentFrame.color.greenOffset, this._currentFrame.color.blueOffset, this._currentFrame.color.alphaMultiplier, this._currentFrame.color.redMultiplier, this._currentFrame.color.greenMultiplier, this._currentFrame.color.blueMultiplier, !0) : this._bone._updateColor(0, 0, 0, 0, 1, 1, 1, 1, !1),
                this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !1)
            };
            a.prototype.clear = function() {
                this._updateState = 0;
                this._originPivot = this._originTransform = this._currentFrame = this._timeline = this._animationState = this._bone = null
            };
            a.HALF_PI = 0.5 * Math.PI;
            a._pool = [];
            return a
        } ();
        a.TimelineState = h;
        var q = function() {
            function a() {
                this.layer = this.loop = 0;
                this._timelineStates = {}
            }
            a._borrowObject = function() {
                return 0 == a._pool.length ? new a: a._pool.pop()
            };
            a._returnObject = function(b) {
                0 > a._pool.indexOf(b) && (a._pool[a._pool.length] = b);
                b.clear()
            };
            a._clear = function() {
                for (var b = a._pool.length; b--;) a._pool[b].clear();
                a._pool.length = 0
            };
            a.prototype.fadeIn = function(a, b, c, d, e, f, h, q) {
                this.layer = f;
                this.clip = b;
                this.name = this.clip.name;
                this.totalTime = this.clip.duration;
                this._armature = a;
                2 > Math.round(this.clip.duration * this.clip.frameRate) || Infinity == d ? (this.timeScale = 1, this.currentTime = this.totalTime, this.loop = 0 <= this.loop ? 1 : -1) : (this.timeScale = d, this.currentTime = 0, this.loop = e);
                this._pauseBeforeFadeInComplete = q;
                this._fadeInTime = c * this.timeScale;
                this._fadeState = 1;
                this._fadeOutBeginTime = 0;
                this._fadeOutWeight = -1;
                this._fadeWeight = 0;
                this._fadeIn = !0;
                this._fadeOut = !1;
                this.loopCount = -1;
                this.displayControl = h;
                this.isPlaying = !0;
                this.isComplete = !1;
                this.weight = 1;
                this.tweenEnabled = this.enabled = this.blend = !0;
                this.updateTimelineStates()
            };
            a.prototype.fadeOut = function(a, b) {
                "undefined" === typeof b && (b = !1);
                if (this._armature && !(0 <= this._fadeOutWeight)) {
                    this._fadeState = -1;
                    this._fadeOutWeight = this._fadeWeight;
                    this._fadeOutTime = a * this.timeScale;
                    this._fadeOutBeginTime = this.currentTime;
                    this._fadeOut = !0;
                    this.isPlaying = !b;
                    this.displayControl = !1;
                    for (var c in this._timelineStates) this._timelineStates[c].fadeOut();
                    this.enabled = !0
                }
            };
            a.prototype.play = function() {
                this.isPlaying = !0
            };
            a.prototype.stop = function() {
                this.isPlaying = !1
            };
            a.prototype.getMixingTransform = function(a) {
                return this._mixingTransforms ? Number(this._mixingTransforms[a]) : -1
            };
            a.prototype.addMixingTransform = function(a, b, c) {
                "undefined" === typeof b && (b = 2);
                "undefined" === typeof c && (c = !0);
                if (this.clip && this.clip.getTimeline(a)) {
                    this._mixingTransforms || (this._mixingTransforms = {});
                    if (c) {
                        c = this._armature._boneList.length;
                        for (var d, e; c--;) if (d = this._armature._boneList[c], d.name == a && (e = d), e && (e == d || e.contains(d))) this._mixingTransforms[d.name] = b
                    } else this._mixingTransforms[a] = b;
                    this.updateTimelineStates()
                } else throw Error();
            };
            a.prototype.removeMixingTransform = function(a, b) {
                "undefined" === typeof a && (a = null);
                "undefined" === typeof b && (b = !0);
                if (a) {
                    if (b) for (var c = this._armature._boneList.length,
                    d, e; c--;) d = this._armature._boneList[c],
                    d.name == a && (e = d),
                    e && (e == d || e.contains(d)) && delete this._mixingTransforms[d.name];
                    else delete this._mixingTransforms[a];
                    for (var f in this._mixingTransforms) {
                        var h = !0;
                        break
                    }
                    h || (this._mixingTransforms = null)
                } else this._mixingTransforms = null;
                this.updateTimelineStates()
            };
            a.prototype.advanceTime = function(a) {
                if (!this.enabled) return ! 1;
                var b, d;
                this._fadeIn && (this._fadeIn = !1, this._armature.hasEventListener(c.AnimationEvent.FADE_IN) && (b = new c.AnimationEvent(c.AnimationEvent.FADE_IN), b.animationState = this, this._armature._eventList.push(b)));
                this._fadeOut && (this._fadeOut = !1, this._armature.hasEventListener(c.AnimationEvent.FADE_OUT) && (b = new c.AnimationEvent(c.AnimationEvent.FADE_OUT), b.animationState = this, this._armature._eventList.push(b)));
                this.currentTime += a * this.timeScale;
                if (this.isPlaying && !this.isComplete) {
                    var e;
                    if (this._pauseBeforeFadeInComplete) this.isPlaying = this._pauseBeforeFadeInComplete = !1,
                    a = 0,
                    e = Math.floor(a);
                    else if (a = this.currentTime / this.totalTime, e = Math.floor(a), e != this.loopCount && ( - 1 == this.loopCount && this._armature.hasEventListener(c.AnimationEvent.START) && (b = new c.AnimationEvent(c.AnimationEvent.START), b.animationState = this, this._armature._eventList.push(b)), this.loopCount = e)) this.loop && this.loopCount * this.loopCount >= this.loop * this.loop - 1 ? (d = !0, a = 1, e = 0, this._armature.hasEventListener(c.AnimationEvent.COMPLETE) && (b = new c.AnimationEvent(c.AnimationEvent.COMPLETE), b.animationState = this, this._armature._eventList.push(b))) : this._armature.hasEventListener(c.AnimationEvent.LOOP_COMPLETE) && (b = new c.AnimationEvent(c.AnimationEvent.LOOP_COMPLETE), b.animationState = this, this._armature._eventList.push(b));
                    for (var f in this._timelineStates) this._timelineStates[f].update(a);
                    b = this.clip.getFrameList();
                    if (0 < b.length) {
                        a = this.totalTime * (a - e);
                        for (e = !1; ! this._currentFrame || a > this._currentFrame.position + this._currentFrame.duration || a < this._currentFrame.position;) e && this._armature._arriveAtFrame(this._currentFrame, null, this, !0),
                        e = !0,
                        this._currentFrame ? (f = b.indexOf(this._currentFrame), f++, f >= b.length && (f = 0), this._currentFrame = b[f]) : this._currentFrame = b[0];
                        e && this._armature._arriveAtFrame(this._currentFrame, null, this, !1)
                    }
                }
                if (0 < this._fadeState) 0 == this._fadeInTime ? (this._fadeWeight = 1, this._fadeState = 0, this.isPlaying = !0, this._armature.hasEventListener(c.AnimationEvent.FADE_IN_COMPLETE) && (b = new c.AnimationEvent(c.AnimationEvent.FADE_IN_COMPLETE), b.animationState = this, this._armature._eventList.push(b))) : (this._fadeWeight = this.currentTime / this._fadeInTime, 1 <= this._fadeWeight && (this._fadeWeight = 1, this._fadeState = 0, this.isPlaying || (this.currentTime -= this._fadeInTime), this.isPlaying = !0, this._armature.hasEventListener(c.AnimationEvent.FADE_IN_COMPLETE) && (b = new c.AnimationEvent(c.AnimationEvent.FADE_IN_COMPLETE), b.animationState = this, this._armature._eventList.push(b))));
                else if (0 > this._fadeState) {
                    if (0 == this._fadeOutTime) return this._fadeState = this._fadeWeight = 0,
                    this._armature.hasEventListener(c.AnimationEvent.FADE_OUT_COMPLETE) && (b = new c.AnimationEvent(c.AnimationEvent.FADE_OUT_COMPLETE), b.animationState = this, this._armature._eventList.push(b)),
                    !0;
                    this._fadeWeight = (1 - (this.currentTime - this._fadeOutBeginTime) / this._fadeOutTime) * this._fadeOutWeight;
                    if (0 >= this._fadeWeight) return this._fadeState = this._fadeWeight = 0,
                    this._armature.hasEventListener(c.AnimationEvent.FADE_OUT_COMPLETE) && (b = new c.AnimationEvent(c.AnimationEvent.FADE_OUT_COMPLETE), b.animationState = this, this._armature._eventList.push(b)),
                    !0
                }
                d && (this.isComplete = !0, 0 > this.loop && this.fadeOut((this._fadeOutWeight || this._fadeInTime) / this.timeScale, !0));
                return ! 1
            };
            a.prototype.updateTimelineStates = function() {
                if (this._mixingTransforms) {
                    for (var a in this._timelineStates) null == this._mixingTransforms[a] && this.removeTimelineState(a);
                    for (a in this._mixingTransforms) this._timelineStates[a] || this.addTimelineState(a)
                } else for (a in this.clip.getTimelines()) this._timelineStates[a] || this.addTimelineState(a)
            };
            a.prototype.addTimelineState = function(a) {
                var b = this._armature.getBone(a);
                if (b) {
                    var c = h._borrowObject(),
                    d = this.clip.getTimeline(a);
                    c.fadeIn(b, this, d);
                    this._timelineStates[a] = c
                }
            };
            a.prototype.removeTimelineState = function(a) {
                h._returnObject(this._timelineStates[a]);
                delete this._timelineStates[a]
            };
            a.prototype.clear = function() {
                this.clip = null;
                this.enabled = !1;
                this._mixingTransforms = this._currentFrame = this._armature = null;
                for (var a in this._timelineStates) this.removeTimelineState(a)
            };
            a._pool = [];
            return a
        } ();
        a.AnimationState = q;
        b = function() {
            function a(b) {
                this._armature = b;
                this._animationLayer = [];
                this._isPlaying = !1;
                this.animationNameList = [];
                this.tweenEnabled = !0;
                this.timeScale = 1
            }
            a.prototype.getLastAnimationName = function() {
                return this._lastAnimationState ? this._lastAnimationState.name: null
            };
            a.prototype.getLastAnimationState = function() {
                return this._lastAnimationState
            };
            a.prototype.getAnimationDataList = function() {
                return this._animationDataList
            };
            a.prototype.setAnimationDataList = function(a) {
                this._animationDataList = a;
                this.animationNameList.length = 0;
                for (var b in this._animationDataList) this.animationNameList[this.animationNameList.length] = this._animationDataList[b].name
            };
            a.prototype.getIsPlaying = function() {
                return this._isPlaying && !this.getIsComplete()
            };
            a.prototype.getIsComplete = function() {
                if (this._lastAnimationState) {
                    if (!this._lastAnimationState.isComplete) return ! 1;
                    for (var a = this._animationLayer.length; a--;) for (var b = this._animationLayer[a], c = b.length; c--;) if (!b[c].isComplete) return ! 1;
                    return ! 0
                }
                return ! 1
            };
            a.prototype.dispose = function() {
                if (this._armature) {
                    this.stop();
                    for (var a = this._animationLayer.length; a--;) {
                        for (var b = this._animationLayer[a], c = b.length; c--;) q._returnObject(b[c]);
                        b.length = 0
                    }
                    this._animationLayer.length = 0;
                    this.animationNameList.length = 0;
                    this.animationNameList = this._animationDataList = this._animationLayer = this._armature = null
                }
            };
            a.prototype.gotoAndPlay = function(b, c, d, e, f, h, g, k, l, s) {
                "undefined" === typeof c && (c = -1);
                "undefined" === typeof d && (d = -1);
                "undefined" === typeof e && (e = NaN);
                "undefined" === typeof f && (f = 0);
                "undefined" === typeof h && (h = null);
                "undefined" === typeof g && (g = a.SAME_LAYER_AND_GROUP);
                "undefined" === typeof k && (k = !0);
                "undefined" === typeof l && (l = !0);
                "undefined" === typeof s && (s = !0);
                if (!this._animationDataList) return null;
                for (var n = this._animationDataList.length,
                r; n--;) if (this._animationDataList[n].name == b) {
                    r = this._animationDataList[n];
                    break
                }
                if (!r) return null;
                this._isPlaying = !0;
                c = 0 > c ? 0 > r.fadeInTime ? 0.3 : r.fadeInTime: c;
                d = 0 > d ? 0 > r.scale ? 1 : r.scale: d / r.duration;
                e = isNaN(e) ? r.loop: e;
                f = this.addLayer(f);
                var m;
                switch (g) {
                case a.NONE:
                    break;
                case a.SAME_LAYER:
                    m = this._animationLayer[f];
                    for (n = m.length; n--;) g = m[n],
                    g.fadeOut(c, l);
                    break;
                case a.SAME_GROUP:
                    for (J = this._animationLayer.length; J--;) {
                        m = this._animationLayer[J];
                        for (n = m.length; n--;) g = m[n],
                        g.group == h && g.fadeOut(c, l)
                    }
                    break;
                case a.ALL:
                    for (var J = this._animationLayer.length; J--;) {
                        m = this._animationLayer[J];
                        for (n = m.length; n--;) g = m[n],
                        g.fadeOut(c, l)
                    }
                    break;
                default:
                    m = this._animationLayer[f];
                    for (n = m.length; n--;) g = m[n],
                    g.group == h && g.fadeOut(c, l)
                }
                this._lastAnimationState = q._borrowObject();
                this._lastAnimationState.group = h;
                this._lastAnimationState.tweenEnabled = this.tweenEnabled;
                this._lastAnimationState.fadeIn(this._armature, r, c, 1 / d, e, f, k, s);
                this.addState(this._lastAnimationState);
                e = this._armature._slotList;
                for (n = e.length; n--;) f = e[n],
                (f = f.getChildArmature()) && f.animation.gotoAndPlay(b, c);
                return this._lastAnimationState
            };
            a.prototype.play = function() {
                this._animationDataList && 0 != this._animationDataList.length && (this._lastAnimationState ? this._isPlaying ? this.gotoAndPlay(this._lastAnimationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
            };
            a.prototype.stop = function() {
                this._isPlaying = !1
            };
            a.prototype.getState = function(a, b) {
                "undefined" === typeof b && (b = 0);
                var c = this._animationLayer.length;
                if (0 == c) return null;
                b >= c && (b = c - 1);
                c = this._animationLayer[b];
                if (!c) return null;
                for (var d = c.length; d--;) if (c[d].name == a) return c[d];
                return null
            };
            a.prototype.hasAnimation = function(a) {
                for (var b = this._animationDataList.length; b--;) if (this._animationDataList[b].name == a) return ! 0;
                return ! 1
            };
            a.prototype.advanceTime = function(a) {
                if (this._isPlaying) {
                    a *= this.timeScale;
                    var b = this._armature._boneList.length,
                    c, d, e = b,
                    f, h, q, p, s, g, k, l, n, m, r, L, I, M, C, K, G;
                    for (b--; e--;) {
                        h = this._armature._boneList[e];
                        q = h.name;
                        p = 1;
                        L = r = m = n = l = k = g = s = 0;
                        for (c = this._animationLayer.length; c--;) {
                            I = 0;
                            M = this._animationLayer[c];
                            f = M.length;
                            for (d = 0; d < f; d++) if (C = M[d], e == b && C.advanceTime(a)) this.removeState(C),
                            d--,
                            f--;
                            else if ((K = C._timelineStates[q]) && K.tweenActive) C = C._fadeWeight * C.weight * p,
                            G = K.transform,
                            K = K.pivot,
                            s += G.x * C,
                            g += G.y * C,
                            k += G.skewX * C,
                            l += G.skewY * C,
                            n += G.scaleX * C,
                            m += G.scaleY * C,
                            r += K.x * C,
                            L += K.y * C,
                            I += C;
                            if (I >= p) break;
                            else p -= I
                        }
                        G = h.tween;
                        K = h._tweenPivot;
                        G.x = s;
                        G.y = g;
                        G.skewX = k;
                        G.skewY = l;
                        G.scaleX = n;
                        G.scaleY = m;
                        K.x = r;
                        K.y = L
                    }
                }
            };
            a.prototype.addLayer = function(a) {
                a >= this._animationLayer.length && (a = this._animationLayer.length, this._animationLayer[a] = []);
                return a
            };
            a.prototype.addState = function(a) {
                this._animationLayer[a.layer].push(a)
            };
            a.prototype.removeState = function(a) {
                var b = a.layer,
                c = this._animationLayer[b];
                c.splice(c.indexOf(a), 1);
                q._returnObject(a);
                0 == c.length && b == this._animationLayer.length - 1 && this._animationLayer.length--
            };
            a.NONE = "none";
            a.SAME_LAYER = "sameLayer";
            a.SAME_GROUP = "sameGroup";
            a.SAME_LAYER_AND_GROUP = "sameLayerAndGroup";
            a.ALL = "all";
            return a
        } ();
        a.Animation = b
    })(b.animation || (b.animation = {}));
    var a = b.animation; (function(a) {
        var b = function() {
            function a() {
                this.skewY = this.skewX = this.y = this.x = 0;
                this.scaleY = this.scaleX = 1
            }
            a.prototype.getRotation = function() {
                return this.skewX
            };
            a.prototype.setRotation = function(a) {
                this.skewX = this.skewY = a
            };
            a.prototype.copy = function(a) {
                this.x = a.x;
                this.y = a.y;
                this.skewX = a.skewX;
                this.skewY = a.skewY;
                this.scaleX = a.scaleX;
                this.scaleY = a.scaleY
            };
            a.prototype.toString = function() {
                return "[DBTransform (x\x3d" + this.x + " y\x3d" + this.y + " skewX\x3d" + this.skewX + " skewY\x3d" + this.skewY + " scaleX\x3d" + this.scaleX + " scaleY\x3d" + this.scaleY + ")]"
            };
            return a
        } ();
        a.DBTransform = b;
        var c = function() {
            function a() {
                this.duration = this.position = 0
            }
            a.prototype.dispose = function() {};
            return a
        } ();
        a.Frame = c;
        var f = function(a) {
            function c() {
                a.call(this);
                this.displayIndex = this.tweenRotate = this.tweenEasing = 0;
                this.zOrder = NaN;
                this.visible = !0;
                this.global = new b;
                this.transform = new b;
                this.pivot = new d.Point
            }
            __extends(c, a);
            c.prototype.dispose = function() {
                a.prototype.dispose.call(this);
                this.color = this.pivot = this.transform = this.global = null
            };
            return c
        } (c);
        a.TransformFrame = f;
        var p = function() {
            function a() {
                this._frameList = [];
                this.duration = 0;
                this.scale = 1
            }
            a.prototype.getFrameList = function() {
                return this._frameList
            };
            a.prototype.dispose = function() {
                for (var a = this._frameList.length; a--;) this._frameList[a].dispose();
                this._frameList.length = 0;
                this._frameList = null
            };
            a.prototype.addFrame = function(a) {
                if (!a) throw Error();
                if (0 > this._frameList.indexOf(a)) this._frameList[this._frameList.length] = a;
                else throw Error();
            };
            return a
        } ();
        a.Timeline = p;
        var g = function(a) {
            function c() {
                a.call(this);
                this.originTransform = new b;
                this.originPivot = new d.Point;
                this.offset = 0;
                this.transformed = !1
            }
            __extends(c, a);
            c.prototype.dispose = function() {
                this != c.HIDE_TIMELINE && (a.prototype.dispose.call(this), this.originPivot = this.originTransform = null)
            };
            c.HIDE_TIMELINE = new c;
            return c
        } (p);
        a.TransformTimeline = g;
        var k = function(a) {
            function b() {
                a.call(this);
                this.loop = this.frameRate = 0;
                this.tweenEasing = NaN;
                this.fadeInTime = 0;
                this._timelines = {}
            }
            __extends(b, a);
            b.prototype.getTimelines = function() {
                return this._timelines
            };
            b.prototype.dispose = function() {
                a.prototype.dispose.call(this);
                for (var b in this._timelines) this._timelines[b].dispose();
                this._timelines = null
            };
            b.prototype.getTimeline = function(a) {
                return this._timelines[a]
            };
            b.prototype.addTimeline = function(a, b) {
                if (!a) throw Error();
                this._timelines[b] = a
            };
            return b
        } (p);
        a.AnimationData = k;
        var l = function() {
            function a() {
                this.transform = new b
            }
            a.prototype.dispose = function() {
                this.pivot = this.transform = null
            };
            a.ARMATURE = "armature";
            a.IMAGE = "image";
            return a
        } ();
        a.DisplayData = l;
        var m = function() {
            function a() {
                this._displayDataList = [];
                this.zOrder = 0;
                this.blendMode = "normal"
            }
            a.prototype.getDisplayDataList = function() {
                return this._displayDataList
            };
            a.prototype.dispose = function() {
                for (var a = this._displayDataList.length; a--;) this._displayDataList[a].dispose();
                this._displayDataList.length = 0;
                this._displayDataList = null
            };
            a.prototype.addDisplayData = function(a) {
                if (!a) throw Error();
                if (0 > this._displayDataList.indexOf(a)) this._displayDataList[this._displayDataList.length] = a;
                else throw Error();
            };
            a.prototype.getDisplayData = function(a) {
                for (var b = this._displayDataList.length; b--;) if (this._displayDataList[b].name == a) return this._displayDataList[b];
                return null
            };
            return a
        } ();
        a.SlotData = m;
        var D = function() {
            function a() {
                this.length = 0;
                this.global = new b;
                this.transform = new b;
                this.scaleMode = 1;
                this.fixedRotation = !1
            }
            a.prototype.dispose = function() {
                this.transform = this.global = null
            };
            return a
        } ();
        a.BoneData = D;
        var H = function() {
            function a() {
                this._slotDataList = []
            }
            a.prototype.getSlotDataList = function() {
                return this._slotDataList
            };
            a.prototype.dispose = function() {
                for (var a = this._slotDataList.length; a--;) this._slotDataList[a].dispose();
                this._slotDataList.length = 0;
                this._slotDataList = null
            };
            a.prototype.getSlotData = function(a) {
                for (var b = this._slotDataList.length; b--;) if (this._slotDataList[b].name == a) return this._slotDataList[b];
                return null
            };
            a.prototype.addSlotData = function(a) {
                if (!a) throw Error();
                if (0 > this._slotDataList.indexOf(a)) this._slotDataList[this._slotDataList.length] = a;
                else throw Error();
            };
            return a
        } ();
        a.SkinData = H;
        var w = function() {
            function a() {
                this._boneDataList = [];
                this._skinDataList = [];
                this._animationDataList = []
            }
            a.prototype.getBoneDataList = function() {
                return this._boneDataList
            };
            a.prototype.getSkinDataList = function() {
                return this._skinDataList
            };
            a.prototype.getAnimationDataList = function() {
                return this._animationDataList
            };
            a.prototype.dispose = function() {
                for (var a = this._boneDataList.length; a--;) this._boneDataList[a].dispose();
                for (a = this._skinDataList.length; a--;) this._skinDataList[a].dispose();
                for (a = this._animationDataList.length; a--;) this._animationDataList[a].dispose();
                this._boneDataList.length = 0;
                this._skinDataList.length = 0;
                this._animationDataList.length = 0;
                this._animationDataList = this._skinDataList = this._boneDataList = null
            };
            a.prototype.getBoneData = function(a) {
                for (var b = this._boneDataList.length; b--;) if (this._boneDataList[b].name == a) return this._boneDataList[b];
                return null
            };
            a.prototype.getSkinData = function(a) {
                if (!a) return this._skinDataList[0];
                for (var b = this._skinDataList.length; b--;) if (this._skinDataList[b].name == a) return this._skinDataList[b];
                return null
            };
            a.prototype.getAnimationData = function(a) {
                for (var b = this._animationDataList.length; b--;) if (this._animationDataList[b].name == a) return this._animationDataList[b];
                return null
            };
            a.prototype.addBoneData = function(a) {
                if (!a) throw Error();
                if (0 > this._boneDataList.indexOf(a)) this._boneDataList[this._boneDataList.length] = a;
                else throw Error();
            };
            a.prototype.addSkinData = function(a) {
                if (!a) throw Error();
                if (0 > this._skinDataList.indexOf(a)) this._skinDataList[this._skinDataList.length] = a;
                else throw Error();
            };
            a.prototype.addAnimationData = function(a) {
                if (!a) throw Error();
                0 > this._animationDataList.indexOf(a) && (this._animationDataList[this._animationDataList.length] = a)
            };
            a.prototype.sortBoneDataList = function() {
                var a = this._boneDataList.length;
                if (0 != a) {
                    for (var b = []; a--;) {
                        for (var c = this._boneDataList[a], d = 0, e = c; e && e.parent;) d++,
                        e = this.getBoneData(e.parent);
                        b[a] = {
                            level: d,
                            boneData: c
                        }
                    }
                    b.sort(this.sortBoneData);
                    for (a = b.length; a--;) this._boneDataList[a] = b[a].boneData
                }
            };
            a.prototype.sortBoneData = function(a, b) {
                return a.level > b.level ? 1 : -1
            };
            return a
        } ();
        a.ArmatureData = w;
        var A = function() {
            function a() {
                this._armatureDataList = [];
                this._subTexturePivots = {}
            }
            a.prototype.getArmatureNames = function() {
                var a = [],
                b;
                for (b in this._armatureDataList) a[a.length] = this._armatureDataList[b].name;
                return a
            };
            a.prototype.getArmatureDataList = function() {
                return this._armatureDataList
            };
            a.prototype.dispose = function() {
                for (var a in this._armatureDataList) this._armatureDataList[a].dispose();
                this._armatureDataList.length = 0;
                this._subTexturePivots = this._armatureDataList = null
            };
            a.prototype.getArmatureData = function(a) {
                for (var b = this._armatureDataList.length; b--;) if (this._armatureDataList[b].name == a) return this._armatureDataList[b];
                return null
            };
            a.prototype.addArmatureData = function(a) {
                if (!a) throw Error();
                if (0 > this._armatureDataList.indexOf(a)) this._armatureDataList[this._armatureDataList.length] = a;
                else throw Error();
            };
            a.prototype.removeArmatureData = function(a) {
                a = this._armatureDataList.indexOf(a);
                0 <= a && this._armatureDataList.splice(a, 1)
            };
            a.prototype.removeArmatureDataByName = function(a) {
                for (var b = this._armatureDataList.length; b--;) this._armatureDataList[b].name == a && this._armatureDataList.splice(b, 1)
            };
            a.prototype.getSubTexturePivot = function(a) {
                return this._subTexturePivots[a]
            };
            a.prototype.addSubTexturePivot = function(a, b, c) {
                var e = this._subTexturePivots[c];
                e ? (e.x = a, e.y = b) : this._subTexturePivots[c] = e = new d.Point(a, b);
                return e
            };
            a.prototype.removeSubTexturePivot = function(a) {
                if (a) delete this._subTexturePivots[a];
                else for (a in this._subTexturePivots) delete this._subTexturePivots[a]
            };
            return a
        } ();
        a.SkeletonData = A;
        p = function() {
            function a() {}
            a.parseTextureAtlasData = function(a, b) {
                "undefined" === typeof b && (b = 1);
                if (!a) throw Error();
                var c = {};
                c.__name = a[e.ConstValues.A_NAME];
                var f = a[e.ConstValues.SUB_TEXTURE],
                h;
                for (h in f) {
                    var q = f[h],
                    p = q[e.ConstValues.A_NAME],
                    q = new d.Rectangle(Number(q[e.ConstValues.A_X]) / b, Number(q[e.ConstValues.A_Y]) / b, Number(q[e.ConstValues.A_WIDTH]) / b, Number(q[e.ConstValues.A_HEIGHT]) / b);
                    c[p] = q
                }
                return c
            };
            a.parseSkeletonData = function(b) {
                if (!b) throw Error();
                var c = Number(b[e.ConstValues.A_FRAME_RATE]),
                d = new A;
                d.name = b[e.ConstValues.A_NAME];
                b = b[e.ConstValues.ARMATURE];
                for (var f in b) d.addArmatureData(a.parseArmatureData(b[f], d, c));
                return d
            };
            a.parseArmatureData = function(b, c, d) {
                var f = new w;
                f.name = b[e.ConstValues.A_NAME];
                var h = b[e.ConstValues.BONE],
                q;
                for (q in h) f.addBoneData(a.parseBoneData(h[q]));
                h = b[e.ConstValues.SKIN];
                for (q in h) f.addSkinData(a.parseSkinData(h[q], c));
                e.DBDataUtil.transformArmatureData(f);
                f.sortBoneDataList();
                b = b[e.ConstValues.ANIMATION];
                for (q in b) f.addAnimationData(a.parseAnimationData(b[q], f, d));
                return f
            };
            a.parseBoneData = function(b) {
                var c = new D;
                c.name = b[e.ConstValues.A_NAME];
                c.parent = b[e.ConstValues.A_PARENT];
                c.length = Number(b[e.ConstValues.A_LENGTH]) || 0;
                var d = Number(b[e.ConstValues.A_SCALE_MODE]); ! isNaN(d) && d && (c.scaleMode = d);
                if (d = b[e.ConstValues.A_FIXED_ROTATION]) c.fixedRotation = d;
                a.parseTransform(b[e.ConstValues.TRANSFORM], c.global);
                c.transform.copy(c.global);
                return c
            };
            a.parseSkinData = function(b, c) {
                var d = new H;
                d.name = b[e.ConstValues.A_NAME];
                var f = b[e.ConstValues.SLOT],
                h;
                for (h in f) d.addSlotData(a.parseSlotData(f[h], c));
                return d
            };
            a.parseSlotData = function(b, c) {
                var d = new m;
                d.name = b[e.ConstValues.A_NAME];
                d.parent = b[e.ConstValues.A_PARENT];
                d.zOrder = Number(b[e.ConstValues.A_Z_ORDER]);
                d.blendMode = b[e.ConstValues.A_BLENDMODE];
                d.blendMode || (d.blendMode = d.blendMode);
                var f = b[e.ConstValues.DISPLAY],
                h;
                for (h in f) d.addDisplayData(a.parseDisplayData(f[h], c));
                return d
            };
            a.parseDisplayData = function(b, c) {
                var d = new l;
                d.name = b[e.ConstValues.A_NAME];
                d.type = b[e.ConstValues.A_TYPE];
                d.pivot = c.addSubTexturePivot(0, 0, d.name);
                a.parseTransform(b[e.ConstValues.TRANSFORM], d.transform, d.pivot);
                return d
            };
            a.parseAnimationData = function(b, c, d) {
                var f = new k;
                f.name = b[e.ConstValues.A_NAME];
                f.frameRate = d;
                f.loop = Number(b[e.ConstValues.A_LOOP]) || 0;
                f.fadeInTime = Number(b[e.ConstValues.A_FADE_IN_TIME]);
                f.duration = Number(b[e.ConstValues.A_DURATION]) / d;
                f.scale = Number(b[e.ConstValues.A_SCALE]);
                if (b.hasOwnProperty(e.ConstValues.A_TWEEN_EASING)) {
                    var h = b[e.ConstValues.A_TWEEN_EASING];
                    f.tweenEasing = void 0 == h || null == h ? NaN: Number(h)
                } else f.tweenEasing = NaN;
                a.parseTimeline(b, f, a.parseMainFrame, d);
                var q, h = b[e.ConstValues.TIMELINE],
                p;
                for (p in h) q = h[p],
                b = a.parseTransformTimeline(q, f.duration, d),
                q = q[e.ConstValues.A_NAME],
                f.addTimeline(b, q);
                e.DBDataUtil.addHideTimeline(f, c);
                e.DBDataUtil.transformAnimationData(f, c);
                return f
            };
            a.parseTimeline = function(a, b, c, d) {
                var f = 0,
                h;
                a = a[e.ConstValues.FRAME];
                for (var q in a) h = c(a[q], d),
                h.position = f,
                b.addFrame(h),
                f += h.duration;
                h && (h.duration = b.duration - h.position)
            };
            a.parseTransformTimeline = function(b, c, d) {
                var f = new g;
                f.duration = c;
                a.parseTimeline(b, f, a.parseTransformFrame, d);
                f.scale = Number(b[e.ConstValues.A_SCALE]);
                f.offset = Number(b[e.ConstValues.A_OFFSET]);
                return f
            };
            a.parseFrame = function(a, b, c) {
                b.duration = Number(a[e.ConstValues.A_DURATION]) / c;
                b.action = a[e.ConstValues.A_ACTION];
                b.event = a[e.ConstValues.A_EVENT];
                b.sound = a[e.ConstValues.A_SOUND]
            };
            a.parseMainFrame = function(b, d) {
                var e = new c;
                a.parseFrame(b, e, d);
                return e
            };
            a.parseTransformFrame = function(b, c) {
                var h = new f;
                a.parseFrame(b, h, c);
                h.visible = 1 != Number(b[e.ConstValues.A_HIDE]);
                if (b.hasOwnProperty(e.ConstValues.A_TWEEN_EASING)) {
                    var p = b[e.ConstValues.A_TWEEN_EASING];
                    h.tweenEasing = void 0 == p || null == p ? NaN: Number(p)
                } else h.tweenEasing = 0;
                h.tweenRotate = Number(b[e.ConstValues.A_TWEEN_ROTATE]) || 0;
                h.displayIndex = Number(b[e.ConstValues.A_DISPLAY_INDEX]) || 0;
                h.zOrder = Number(b[e.ConstValues.A_Z_ORDER]) || 0;
                a.parseTransform(b[e.ConstValues.TRANSFORM], h.global, h.pivot);
                h.transform.copy(h.global);
                if (p = b[e.ConstValues.COLOR_TRANSFORM]) h.color = new d.ColorTransform,
                h.color.alphaOffset = Number(p[e.ConstValues.A_ALPHA_OFFSET]),
                h.color.redOffset = Number(p[e.ConstValues.A_RED_OFFSET]),
                h.color.greenOffset = Number(p[e.ConstValues.A_GREEN_OFFSET]),
                h.color.blueOffset = Number(p[e.ConstValues.A_BLUE_OFFSET]),
                h.color.alphaMultiplier = 0.01 * Number(p[e.ConstValues.A_ALPHA_MULTIPLIER]),
                h.color.redMultiplier = 0.01 * Number(p[e.ConstValues.A_RED_MULTIPLIER]),
                h.color.greenMultiplier = 0.01 * Number(p[e.ConstValues.A_GREEN_MULTIPLIER]),
                h.color.blueMultiplier = 0.01 * Number(p[e.ConstValues.A_BLUE_MULTIPLIER]);
                return h
            };
            a.parseTransform = function(a, b, c) {
                "undefined" === typeof c && (c = null);
                a && (b && (b.x = Number(a[e.ConstValues.A_X]), b.y = Number(a[e.ConstValues.A_Y]), b.skewX = Number(a[e.ConstValues.A_SKEW_X]) * e.ConstValues.ANGLE_TO_RADIAN, b.skewY = Number(a[e.ConstValues.A_SKEW_Y]) * e.ConstValues.ANGLE_TO_RADIAN, b.scaleX = Number(a[e.ConstValues.A_SCALE_X]), b.scaleY = Number(a[e.ConstValues.A_SCALE_Y])), c && (c.x = Number(a[e.ConstValues.A_PIVOT_X]), c.y = Number(a[e.ConstValues.A_PIVOT_Y])))
            };
            return a
        } ();
        a.DataParser = p
    })(b.objects || (b.objects = {}));
    var f = b.objects; (function(a) {
        var d = function(a) {
            function c() {
                a.call(this);
                this._dataDic = {};
                this._textureAtlasDic = {};
                this._textureAtlasLoadingDic = {}
            }
            __extends(c, a);
            c.prototype.getSkeletonData = function(a) {
                return this._dataDic[a]
            };
            c.prototype.addSkeletonData = function(a, b) {
                "undefined" === typeof b && (b = null);
                if (!a) throw Error();
                b = b || a.name;
                if (!b) throw Error("Unnamed data!");
                this._dataDic[b] = a
            };
            c.prototype.removeSkeletonData = function(a) {
                delete this._dataDic[a]
            };
            c.prototype.getTextureAtlas = function(a) {
                return this._textureAtlasDic[a]
            };
            c.prototype.addTextureAtlas = function(a, b) {
                "undefined" === typeof b && (b = null);
                if (!a) throw Error();
                b = b || a.name;
                if (!b) throw Error("Unnamed data!");
                this._textureAtlasDic[b] = a
            };
            c.prototype.removeTextureAtlas = function(a) {
                delete this._textureAtlasDic[a]
            };
            c.prototype.dispose = function(a) {
                "undefined" === typeof a && (a = !0);
                if (a) {
                    for (var b in this._dataDic) this._dataDic[b].dispose();
                    for (b in this._textureAtlasDic) this._textureAtlasDic[b].dispose()
                }
                this._currentTextureAtlasName = this._currentDataName = this._textureAtlasLoadingDic = this._textureAtlasDic = this._dataDic = null
            };
            c.prototype.buildArmature = function(a, c, d, e, h) {
                if (d) {
                    var q = this._dataDic[d];
                    if (q) var g = q.getArmatureData(a)
                } else for (d in this._dataDic) if (q = this._dataDic[d], g = q.getArmatureData(a)) break;
                if (!g) return null;
                this._currentDataName = d;
                this._currentTextureAtlasName = e || d;
                e = this._generateArmature();
                e.name = a;
                var k, l, m = g.getBoneDataList(),
                n;
                for (n in m) l = m[n],
                k = new b.Bone,
                k.name = l.name,
                k.fixedRotation = l.fixedRotation,
                k.scaleMode = l.scaleMode,
                k.origin.copy(l.transform),
                g.getBoneData(l.parent) ? e.addChild(k, l.parent) : e.addChild(k, null);
                if (c && c != a) {
                    var r = q.getArmatureData(c);
                    if (!r) for (d in this._dataDic) if (q = this._dataDic[d], r = q.getArmatureData(c)) break
                }
                r ? e.animation.setAnimationDataList(r.getAnimationDataList()) : e.animation.setAnimationDataList(g.getAnimationDataList());
                k = g.getSkinData(h);
                if (!k) throw Error();
                a = [];
                d = k.getSlotDataList();
                for (n in d) if (q = d[n], k = e.getBone(q.parent)) {
                    h = q.getDisplayDataList();
                    c = this._generateSlot();
                    c.name = q.name;
                    c._blendMode = q.blendMode;
                    c._originZOrder = q.zOrder;
                    c._dislayDataList = h;
                    a.length = 0;
                    for (q = h.length; q--;) switch (g = h[q], g.type) {
                    case f.DisplayData.ARMATURE:
                        (g = this.buildArmature(g.name, null, this._currentDataName, this._currentTextureAtlasName, null)) && (a[q] = g);
                        break;
                    default:
                        a[q] = this._generateDisplay(this._textureAtlasDic[this._currentTextureAtlasName], g.name, g.pivot.x, g.pivot.y)
                    }
                    c.setDisplayList(a);
                    c._changeDisplay(0);
                    k.addChild(c)
                }
                e._slotsZOrderChanged = !0;
                e.advanceTime(0);
                return e
            };
            c.prototype.getTextureDisplay = function(a, b, c, d) {
                if (b) var e = this._textureAtlasDic[b];
                if (!e && !b) for (b in this._textureAtlasDic) {
                    e = this._textureAtlasDic[b];
                    if (e.getRegion(a)) break;
                    e = null
                }
                if (e) {
                    if (isNaN(c) || isNaN(d)) if (b = this._dataDic[b]) if (b = b.getSubTexturePivot(a)) c = b.x,
                    d = b.y;
                    return this._generateDisplay(e, a, c, d)
                }
                return null
            };
            c.prototype._generateArmature = function() {
                return null
            };
            c.prototype._generateSlot = function() {
                return null
            };
            c.prototype._generateDisplay = function(a, b, c, d) {
                return null
            };
            return c
        } (c.EventDispatcher);
        a.BaseFactory = d
    })(b.factorys || (b.factorys = {})); (function(b) {
        var c = function() {
            function a() {}
            a.ANGLE_TO_RADIAN = Math.PI / 180;
            a.DRAGON_BONES = "dragonBones";
            a.ARMATURE = "armature";
            a.SKIN = "skin";
            a.BONE = "bone";
            a.SLOT = "slot";
            a.DISPLAY = "display";
            a.ANIMATION = "animation";
            a.TIMELINE = "timeline";
            a.FRAME = "frame";
            a.TRANSFORM = "transform";
            a.COLOR_TRANSFORM = "colorTransform";
            a.TEXTURE_ATLAS = "TextureAtlas";
            a.SUB_TEXTURE = "SubTexture";
            a.A_VERSION = "version";
            a.A_IMAGE_PATH = "imagePath";
            a.A_FRAME_RATE = "frameRate";
            a.A_NAME = "name";
            a.A_PARENT = "parent";
            a.A_LENGTH = "length";
            a.A_TYPE = "type";
            a.A_FADE_IN_TIME = "fadeInTime";
            a.A_DURATION = "duration";
            a.A_SCALE = "scale";
            a.A_OFFSET = "offset";
            a.A_LOOP = "loop";
            a.A_EVENT = "event";
            a.A_SOUND = "sound";
            a.A_ACTION = "action";
            a.A_HIDE = "hide";
            a.A_TWEEN_EASING = "tweenEasing";
            a.A_TWEEN_ROTATE = "tweenRotate";
            a.A_DISPLAY_INDEX = "displayIndex";
            a.A_Z_ORDER = "z";
            a.A_BLENDMODE = "blendMode";
            a.A_WIDTH = "width";
            a.A_HEIGHT = "height";
            a.A_SCALE_MODE = "scaleMode";
            a.A_FIXED_ROTATION = "fixedRotation";
            a.A_X = "x";
            a.A_Y = "y";
            a.A_SKEW_X = "skX";
            a.A_SKEW_Y = "skY";
            a.A_SCALE_X = "scX";
            a.A_SCALE_Y = "scY";
            a.A_PIVOT_X = "pX";
            a.A_PIVOT_Y = "pY";
            a.A_ALPHA_OFFSET = "aO";
            a.A_RED_OFFSET = "rO";
            a.A_GREEN_OFFSET = "gO";
            a.A_BLUE_OFFSET = "bO";
            a.A_ALPHA_MULTIPLIER = "aM";
            a.A_RED_MULTIPLIER = "rM";
            a.A_GREEN_MULTIPLIER = "gM";
            a.A_BLUE_MULTIPLIER = "bM";
            return a
        } ();
        b.ConstValues = c;
        var e = function() {
            function a() {}
            a.transformPointWithParent = function(b, c) {
                var d = a._helpMatrix;
                a.transformToMatrix(c, d);
                d.invert();
                var e = b.x,
                f = b.y;
                b.x = d.a * e + d.c * f + d.tx;
                b.y = d.d * f + d.b * e + d.ty;
                b.skewX = a.formatRadian(b.skewX - c.skewX);
                b.skewY = a.formatRadian(b.skewY - c.skewY)
            };
            a.transformToMatrix = function(a, b) {
                b.a = a.scaleX * Math.cos(a.skewY);
                b.b = a.scaleX * Math.sin(a.skewY);
                b.c = -a.scaleY * Math.sin(a.skewX);
                b.d = a.scaleY * Math.cos(a.skewX);
                b.tx = a.x;
                b.ty = a.y
            };
            a.formatRadian = function(b) {
                b %= a.DOUBLE_PI;
                b > Math.PI && (b -= a.DOUBLE_PI);
                b < -Math.PI && (b += a.DOUBLE_PI);
                return b
            };
            a.DOUBLE_PI = 2 * Math.PI;
            a._helpMatrix = new d.Matrix;
            return a
        } ();
        b.TransformUtil = e;
        c = function() {
            function b() {}
            b.transformArmatureData = function(a) {
                for (var b = a.getBoneDataList(), c = b.length, d, f; c--;) if (d = b[c], d.parent && (f = a.getBoneData(d.parent))) d.transform.copy(d.global),
                e.transformPointWithParent(d.transform, f.global)
            };
            b.transformArmatureDataAnimations = function(a) {
                for (var c = a.getAnimationDataList(), d = c.length; d--;) b.transformAnimationData(c[d], a)
            };
            b.transformAnimationData = function(a, c) {
                for (var d = c.getSkinData(null), f = c.getBoneDataList(), d = d.getSlotDataList(), g = f.length, k, l, m, n, r, s, B, z, t, J; g--;) if (k = f[g], l = a.getTimeline(k.name)) {
                    m = null;
                    for (var N in d) if (m = d[N], m.parent == k.name) break;
                    n = k.parent ? a.getTimeline(k.parent) : null;
                    r = l.getFrameList();
                    z = B = s = null;
                    J = r.length;
                    for (var F = 0; F < J; F++) {
                        t = r[F];
                        n ? (b._helpTransform1.copy(t.global), b.getTimelineTransform(n, t.position, b._helpTransform2), e.transformPointWithParent(b._helpTransform1, b._helpTransform2), t.transform.copy(b._helpTransform1)) : t.transform.copy(t.global);
                        t.transform.x -= k.transform.x;
                        t.transform.y -= k.transform.y;
                        t.transform.skewX -= k.transform.skewX;
                        t.transform.skewY -= k.transform.skewY;
                        t.transform.scaleX -= k.transform.scaleX;
                        t.transform.scaleY -= k.transform.scaleY; ! l.transformed && m && (t.zOrder -= m.zOrder);
                        s || (s = l.originTransform, s.copy(t.transform), s.skewX = e.formatRadian(s.skewX), s.skewY = e.formatRadian(s.skewY), B = l.originPivot, B.x = t.pivot.x, B.y = t.pivot.y);
                        t.transform.x -= s.x;
                        t.transform.y -= s.y;
                        t.transform.skewX = e.formatRadian(t.transform.skewX - s.skewX);
                        t.transform.skewY = e.formatRadian(t.transform.skewY - s.skewY);
                        t.transform.scaleX -= s.scaleX;
                        t.transform.scaleY -= s.scaleY;
                        l.transformed || (t.pivot.x -= B.x, t.pivot.y -= B.y);
                        if (z) {
                            var L = t.transform.skewX - z.transform.skewX;
                            z.tweenRotate ? 0 < z.tweenRotate ? (0 > L && (t.transform.skewX += 2 * Math.PI, t.transform.skewY += 2 * Math.PI), 1 < z.tweenRotate && (t.transform.skewX += 2 * Math.PI * (z.tweenRotate - 1), t.transform.skewY += 2 * Math.PI * (z.tweenRotate - 1))) : (0 < L && (t.transform.skewX -= 2 * Math.PI, t.transform.skewY -= 2 * Math.PI), 1 > z.tweenRotate && (t.transform.skewX += 2 * Math.PI * (z.tweenRotate + 1), t.transform.skewY += 2 * Math.PI * (z.tweenRotate + 1))) : (t.transform.skewX = z.transform.skewX + e.formatRadian(t.transform.skewX - z.transform.skewX), t.transform.skewY = z.transform.skewY + e.formatRadian(t.transform.skewY - z.transform.skewY))
                        }
                        z = t
                    }
                    l.transformed = !0
                }
            };
            b.getTimelineTransform = function(b, c, d) {
                for (var f = b.getFrameList(), g = f.length, k; g--;) if (b = f[g], b.position <= c && b.position + b.duration > c) {
                    k = b.tweenEasing;
                    g == f.length - 1 || isNaN(k) || c == b.position ? d.copy(b.global) : (c = (c - b.position) / b.duration, k && (c = a.TimelineState.getEaseValue(c, k)), f = f[g + 1], d.x = b.global.x + (f.global.x - b.global.x) * c, d.y = b.global.y + (f.global.y - b.global.y) * c, d.skewX = e.formatRadian(b.global.skewX + (f.global.skewX - b.global.skewX) * c), d.skewY = e.formatRadian(b.global.skewY + (f.global.skewY - b.global.skewY) * c), d.scaleX = b.global.scaleX + (f.global.scaleX - b.global.scaleX) * c, d.scaleY = b.global.scaleY + (f.global.scaleY - b.global.scaleY) * c);
                    break
                }
            };
            b.addHideTimeline = function(a, b) {
                for (var c = b.getBoneDataList(), d = c.length, e; d--;) e = c[d],
                e = e.name,
                a.getTimeline(e) || a.addTimeline(f.TransformTimeline.HIDE_TIMELINE, e)
            };
            b._helpTransform1 = new f.DBTransform;
            b._helpTransform2 = new f.DBTransform;
            return b
        } ();
        b.DBDataUtil = c
    })(b.utils || (b.utils = {}));
    var e = b.utils,
    k = function() {
        function a() {
            this.global = new f.DBTransform;
            this.origin = new f.DBTransform;
            this.offset = new f.DBTransform;
            this.tween = new f.DBTransform;
            this.tween.scaleX = this.tween.scaleY = 0;
            this._globalTransformMatrix = new d.Matrix;
            this._visible = !0;
            this._isDisplayOnStage = this._isColorChanged = !1;
            this._scaleType = 0;
            this.fixedRotation = !1
        }
        a.prototype.getVisible = function() {
            return this._visible
        };
        a.prototype.setVisible = function(a) {
            this._visible = a
        };
        a.prototype._setParent = function(a) {
            this.parent = a
        };
        a.prototype._setArmature = function(a) {
            this.armature && this.armature._removeDBObject(this); (this.armature = a) && this.armature._addDBObject(this)
        };
        a.prototype.dispose = function() {
            this._globalTransformMatrix = this.tween = this.offset = this.origin = this.global = this.armature = this.parent = null
        };
        a.prototype._update = function() {
            this.global.scaleX = (this.origin.scaleX + this.tween.scaleX) * this.offset.scaleX;
            this.global.scaleY = (this.origin.scaleY + this.tween.scaleY) * this.offset.scaleY;
            if (this.parent) {
                var a = this.origin.x + this.offset.x + this.tween.x,
                b = this.origin.y + this.offset.y + this.tween.y,
                c = this.parent._globalTransformMatrix;
                this._globalTransformMatrix.tx = this.global.x = c.a * a + c.c * b + c.tx;
                this._globalTransformMatrix.ty = this.global.y = c.d * b + c.b * a + c.ty;
                this.fixedRotation ? (this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY) : (this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX + this.parent.global.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY + this.parent.global.skewY);
                this.parent.scaleMode >= this._scaleType && (this.global.scaleX *= this.parent.global.scaleX, this.global.scaleY *= this.parent.global.scaleY)
            } else this._globalTransformMatrix.tx = this.global.x = this.origin.x + this.offset.x + this.tween.x,
            this._globalTransformMatrix.ty = this.global.y = this.origin.y + this.offset.y + this.tween.y,
            this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX,
            this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY;
            this._globalTransformMatrix.a = this.global.scaleX * Math.cos(this.global.skewY);
            this._globalTransformMatrix.b = this.global.scaleX * Math.sin(this.global.skewY);
            this._globalTransformMatrix.c = -this.global.scaleY * Math.sin(this.global.skewX);
            this._globalTransformMatrix.d = this.global.scaleY * Math.cos(this.global.skewX)
        };
        return a
    } ();
    b.DBObject = k;
    var l = function(a) {
        function b(c) {
            a.call(this);
            this._displayBridge = c;
            this._displayList = [];
            this._displayIndex = -1;
            this._scaleType = 1;
            this._offsetZOrder = this._tweenZorder = this._originZOrder = 0;
            this._isHideDisplay = this._isDisplayOnStage = !1;
            this._blendMode = "normal";
            this._displayBridge.updateBlendMode(this._blendMode)
        }
        __extends(b, a);
        b.prototype.getZOrder = function() {
            return this._originZOrder + this._tweenZorder + this._offsetZOrder
        };
        b.prototype.setZOrder = function(a) {
            this.getZOrder() != a && (this._offsetZOrder = a - this._originZOrder - this._tweenZorder, this.armature && (this.armature._slotsZOrderChanged = !0))
        };
        b.prototype.getDisplay = function() {
            var a = this._displayList[this._displayIndex];
            return a instanceof m ? a.getDisplay() : a
        };
        b.prototype.setDisplay = function(a) {
            this._displayList[this._displayIndex] = a;
            this._setDisplay(a)
        };
        b.prototype.getBlendMode = function() {
            return this._blendMode
        };
        b.prototype.setBlendMode = function(a) {
            this._blendMode != a && (this._blendMode = a, this._displayBridge.getDisplay() && this._displayBridge.updateBlendMode(this._blendMode))
        };
        b.prototype.getChildArmature = function() {
            var a = this._displayList[this._displayIndex];
            return a instanceof m ? a: null
        };
        b.prototype.setChildArmature = function(a) { (this._displayList[this._displayIndex] = a) && this._setDisplay(a.getDisplay())
        };
        b.prototype.getDisplayList = function() {
            return this._displayList
        };
        b.prototype.setDisplayList = function(a) {
            if (!a) throw Error();
            for (var b = this._displayList.length = a.length; b--;) this._displayList[b] = a[b];
            0 <= this._displayIndex && (a = this._displayIndex, this._displayIndex = -1, this._changeDisplay(a))
        };
        b.prototype._setDisplay = function(a) {
            this._displayBridge.getDisplay() ? this._displayBridge.setDisplay(a) : (this._displayBridge.setDisplay(a), this.armature && (this._displayBridge.addDisplay(this.armature.getDisplay(), -1), this.armature._slotsZOrderChanged = !0));
            this.updateChildArmatureAnimation();
            a && this._displayBridge.updateBlendMode(this._blendMode); ! this._isHideDisplay && this._displayBridge.getDisplay() ? this._isDisplayOnStage = !0 : this._isDisplayOnStage = !1
        };
        b.prototype._changeDisplay = function(a) {
            if (0 > a) this._isHideDisplay || (this._isHideDisplay = !0, this._displayBridge.removeDisplay(), this.updateChildArmatureAnimation());
            else {
                if (this._isHideDisplay) {
                    this._isHideDisplay = !1;
                    var b = !0;
                    this.armature && (this._displayBridge.addDisplay(this.armature.getDisplay(), -1), this.armature._slotsZOrderChanged = !0)
                }
                var c = this._displayList.length;
                a >= c && 0 < c && (a = c - 1);
                this._displayIndex != a ? (this._displayIndex = a, a = this._displayList[this._displayIndex], a instanceof m ? this._setDisplay(a.getDisplay()) : this._setDisplay(a), this._dislayDataList && this._displayIndex <= this._dislayDataList.length && this.origin.copy(this._dislayDataList[this._displayIndex].transform)) : b && this.updateChildArmatureAnimation()
            } ! this._isHideDisplay && this._displayBridge.getDisplay() ? this._isDisplayOnStage = !0 : this._isDisplayOnStage = !1
        };
        b.prototype.setVisible = function(a) {
            a != this._visible && (this._visible = a, this._updateVisible(this._visible))
        };
        b.prototype._setArmature = function(b) {
            a.prototype._setArmature.call(this, b);
            this.armature ? (this.armature._slotsZOrderChanged = !0, this._displayBridge.addDisplay(this.armature.getDisplay(), -1)) : this._displayBridge.removeDisplay()
        };
        b.prototype.dispose = function() {
            this._displayBridge && (a.prototype.dispose.call(this), this._displayBridge.dispose(), this._displayList.length = 0, this._dislayDataList = this._displayList = this._displayBridge = null)
        };
        b.prototype._update = function() {
            a.prototype._update.call(this);
            if (this._isDisplayOnStage) {
                var b = this.parent._tweenPivot.x,
                c = this.parent._tweenPivot.y;
                if (b || c) {
                    var d = this.parent._globalTransformMatrix;
                    this._globalTransformMatrix.tx += d.a * b + d.c * c;
                    this._globalTransformMatrix.ty += d.b * b + d.d * c
                }
                this._displayBridge.updateTransform(this._globalTransformMatrix, this.global)
            }
        };
        b.prototype._updateVisible = function(a) {
            this._displayBridge.setVisible(this.parent.getVisible() && this._visible && a)
        };
        b.prototype.updateChildArmatureAnimation = function() {
            var a = this.getChildArmature();
            if (a) if (this._isHideDisplay) a.animation.stop(),
            a.animation._lastAnimationState = null;
            else {
                var b = this.armature ? this.armature.animation.getLastAnimationName() : null;
                b && a.animation.hasAnimation(b) ? a.animation.gotoAndPlay(b) : a.animation.play()
            }
        };
        return b
    } (k);
    b.Slot = l;
    var g = function(a) {
        function b() {
            a.call(this);
            this._children = [];
            this._scaleType = 2;
            this._tweenPivot = new d.Point;
            this.scaleMode = 1
        }
        __extends(b, a);
        b.prototype.setVisible = function(a) {
            if (this._visible != a) {
                this._visible = a;
                for (a = this._children.length; a--;) {
                    var b = this._children[a];
                    b instanceof l && b._updateVisible(this._visible)
                }
            }
        };
        b.prototype._setArmature = function(b) {
            a.prototype._setArmature.call(this, b);
            for (b = this._children.length; b--;) this._children[b]._setArmature(this.armature)
        };
        b.prototype.dispose = function() {
            if (this._children) {
                a.prototype.dispose.call(this);
                for (var b = this._children.length; b--;) this._children[b].dispose();
                this._children.length = 0;
                this.slot = this._tweenPivot = this._children = null
            }
        };
        b.prototype.contains = function(a) {
            if (!a) throw Error();
            if (a == this) return ! 1;
            for (; ! (a == this || null == a);) a = a.parent;
            return a == this
        };
        b.prototype.addChild = function(a) {
            if (!a) throw Error();
            if (a == this || a instanceof b && a.contains(this)) throw Error("An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)");
            a.parent && a.parent.removeChild(a);
            this._children[this._children.length] = a;
            a._setParent(this);
            a._setArmature(this.armature); ! this.slot && a instanceof l && (this.slot = a)
        };
        b.prototype.removeChild = function(a) {
            if (!a) throw Error();
            var b = this._children.indexOf(a);
            if (0 <= b) this._children.splice(b, 1),
            a._setParent(null),
            a._setArmature(null),
            a == this.slot && (this.slot = null);
            else throw Error();
        };
        b.prototype.getSlots = function() {
            for (var a = [], b = this._children.length; b--;) this._children[b] instanceof l && a.unshift(this._children[b]);
            return a
        };
        b.prototype._arriveAtFrame = function(a, d, e, f) {
            if (a) {
                d = e.getMixingTransform(name);
                if (e.displayControl && (2 == d || -1 == d)) if ((!this.displayController || this.displayController == e.name) && this.slot) d = a.displayIndex,
                0 <= d && (!isNaN(a.zOrder) && a.zOrder != this.slot._tweenZorder) && (this.slot._tweenZorder = a.zOrder, this.armature._slotsZOrderChanged = !0),
                this.slot._changeDisplay(d),
                this.slot._updateVisible(a.visible);
                a.event && this.armature.hasEventListener(c.FrameEvent.BONE_FRAME_EVENT) && (d = new c.FrameEvent(c.FrameEvent.BONE_FRAME_EVENT), d.bone = this, d.animationState = e, d.frameLabel = a.event, this.armature._eventList.push(d));
                a.sound && b._soundManager.hasEventListener(c.SoundEvent.SOUND) && (d = new c.SoundEvent(c.SoundEvent.SOUND), d.armature = this.armature, d.animationState = e, d.sound = a.sound, b._soundManager.dispatchEvent(d));
                if (a.action) for (var g in this._children) this._children[g] instanceof l && (e = this._children[g].getChildArmature()) && e.animation.gotoAndPlay(a.action)
            } else this.slot && this.slot._changeDisplay( - 1)
        };
        b.prototype._updateColor = function(a, b, c, d, e, f, g, k, l) { (l || this._isColorChanged) && this.slot._displayBridge.updateColor(a, b, c, d, e, f, g, k);
            this._isColorChanged = l
        };
        b._soundManager = c.SoundEventManager.getInstance();
        return b
    } (k);
    b.Bone = g;
    var m = function(b) {
        function d(c) {
            b.call(this);
            this.animation = new a.Animation(this);
            this._display = c;
            this._slotsZOrderChanged = !1;
            this._slotList = [];
            this._boneList = [];
            this._eventList = []
        }
        __extends(d, b);
        d.prototype.getDisplay = function() {
            return this._display
        };
        d.prototype.dispose = function() {
            if (this.animation) {
                this.animation.dispose();
                for (var a = this._slotList.length; a--;) this._slotList[a].dispose();
                for (a = this._boneList.length; a--;) this._boneList[a].dispose();
                this._slotList.length = 0;
                this._boneList.length = 0;
                this._eventList.length = 0;
                this.animation = this._display = this._eventList = this._boneList = this._slotList = null
            }
        };
        d.prototype.advanceTime = function(a) {
            this.animation.advanceTime(a);
            a *= this.animation.timeScale;
            for (var b = this._boneList.length; b--;) this._boneList[b]._update();
            for (var b = this._slotList.length,
            d; b--;) d = this._slotList[b],
            d._update(),
            d._isDisplayOnStage && (d = d.getChildArmature()) && d.advanceTime(a);
            this._slotsZOrderChanged && (this.updateSlotsZOrder(), this.hasEventListener(c.ArmatureEvent.Z_ORDER_UPDATED) && this.dispatchEvent(new c.ArmatureEvent(c.ArmatureEvent.Z_ORDER_UPDATED)));
            if (this._eventList.length) {
                a = this._eventList.length;
                for (b = 0; b < a; b++) this.dispatchEvent(this._eventList[b]);
                this._eventList.length = 0
            }
        };
        d.prototype.getSlots = function(a) {
            "undefined" === typeof a && (a = !0);
            return a ? this._slotList.concat() : this._slotList
        };
        d.prototype.getBones = function(a) {
            "undefined" === typeof a && (a = !0);
            return a ? this._boneList.concat() : this._boneList
        };
        d.prototype.getSlot = function(a) {
            for (var b = this._slotList.length; b--;) if (this._slotList[b].name == a) return this._slotList[b];
            return null
        };
        d.prototype.getSlotByDisplay = function(a) {
            if (a) for (var b = this._slotList.length; b--;) if (this._slotList[b].getDisplay() == a) return this._slotList[b];
            return null
        };
        d.prototype.removeSlot = function(a) {
            if (!a) throw Error();
            if (0 <= this._slotList.indexOf(a)) a.parent.removeChild(a);
            else throw Error();
        };
        d.prototype.removeSlotByName = function(a) {
            a && (a = this.getSlot(a)) && this.removeSlot(a)
        };
        d.prototype.getBone = function(a) {
            for (var b = this._boneList.length; b--;) if (this._boneList[b].name == a) return this._boneList[b];
            return null
        };
        d.prototype.getBoneByDisplay = function(a) {
            return (a = this.getSlotByDisplay(a)) ? a.parent: null
        };
        d.prototype.removeBone = function(a) {
            if (!a) throw Error();
            if (0 <= this._boneList.indexOf(a)) a.parent ? a.parent.removeChild(a) : a._setArmature(null);
            else throw Error();
        };
        d.prototype.removeBoneByName = function(a) {
            a && (a = this.getBone(a)) && this.removeBone(a)
        };
        d.prototype.addChild = function(a, b) {
            if (!a) throw Error();
            if (b) {
                var c = this.getBone(b);
                if (c) c.addChild(a);
                else throw Error();
            } else a.parent && a.parent.removeChild(a),
            a._setArmature(this)
        };
        d.prototype.updateSlotsZOrder = function() {
            this._slotList.sort(this.sortSlot);
            for (var a = this._slotList.length,
            b; a--;) b = this._slotList[a],
            b._isDisplayOnStage && b._displayBridge.addDisplay(this._display, -1);
            this._slotsZOrderChanged = !1
        };
        d.prototype._addDBObject = function(a) {
            a instanceof l ? 0 > this._slotList.indexOf(a) && (this._slotList[this._slotList.length] = a) : a instanceof g && 0 > this._boneList.indexOf(a) && (this._boneList[this._boneList.length] = a, this._sortBoneList())
        };
        d.prototype._removeDBObject = function(a) {
            a instanceof l ? (a = this._slotList.indexOf(a), 0 <= a && this._slotList.splice(a, 1)) : a instanceof g && (a = this._boneList.indexOf(a), 0 <= a && this._boneList.splice(a, 1))
        };
        d.prototype._sortBoneList = function() {
            var a = this._boneList.length;
            if (0 != a) {
                for (var b = [], c, d, e; a--;) {
                    c = 0;
                    for (e = d = this._boneList[a]; e;) c++,
                    e = e.parent;
                    b[a] = {
                        level: c,
                        bone: d
                    }
                }
                b.sort(this.sortBone);
                for (a = b.length; a--;) this._boneList[a] = b[a].bone
            }
        };
        d.prototype._arriveAtFrame = function(a, b, e, f) {
            a.event && this.hasEventListener(c.FrameEvent.ANIMATION_FRAME_EVENT) && (b = new c.FrameEvent(c.FrameEvent.ANIMATION_FRAME_EVENT), b.animationState = e, b.frameLabel = a.event, this._eventList.push(b));
            a.sound && d._soundManager.hasEventListener(c.SoundEvent.SOUND) && (b = new c.SoundEvent(c.SoundEvent.SOUND), b.armature = this, b.animationState = e, b.sound = a.sound, d._soundManager.dispatchEvent(b));
            a.action && e.isPlaying && this.animation.gotoAndPlay(a.action)
        };
        d.prototype.sortSlot = function(a, b) {
            return a.getZOrder() < b.getZOrder() ? 1 : -1
        };
        d.prototype.sortBone = function(a, b) {
            return a.level < b.level ? 1 : -1
        };
        d._soundManager = c.SoundEventManager.getInstance();
        return d
    } (c.EventDispatcher);
    b.Armature = m
})(dragonBones || (dragonBones = {}));
__extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
}; (function(b) { (function(b) {
        var a = function() {
            function a() {}
            a.prototype.getVisible = function() {
                return this._display ? this._display.visible: !1
            };
            a.prototype.setVisible = function(a) {
                this._display && (this._display.visible = a)
            };
            a.prototype.getDisplay = function() {
                return this._display
            };
            a.prototype.setDisplay = function(a) {
                if (this._display != a) {
                    if (this._display) {
                        var b = this._display.parent;
                        if (b) var c = -1;
                        this.removeDisplay()
                    }
                    this._display = a;
                    this.addDisplay(b, c)
                }
            };
            a.prototype.dispose = function() {
                this._display = null
            };
            a.prototype.updateTransform = function(b, c) {
                this._display.x = b.tx;
                this._display.y = b.ty;
                this._display.skewX = c.skewX * a.RADIAN_TO_ANGLE;
                this._display.skewY = c.skewY * a.RADIAN_TO_ANGLE;
                this._display.scaleX = c.scaleX;
                this._display.scaleY = c.scaleY
            };
            a.prototype.updateColor = function(a, b, c, d, f, n, r, h) {
                this._display && (this._display.alpha = f)
            };
            a.prototype.updateBlendMode = function(a) {
                this._display && (this._display.blendMode = ns_egret.BlendMode.getBlendMode(a))
            };
            a.prototype.addDisplay = function(a, b) {
                a && this._display && (this._display.parent && this._display.parent.removeChild(this._display), 0 > b ? a.addChild(this._display) : a.addChild(this._display, Math.min(b, a.numChildren)))
            };
            a.prototype.removeDisplay = function() {
                this._display && this._display.parent && this._display.parent.removeChild(this._display)
            };
            a.RADIAN_TO_ANGLE = 180 / Math.PI;
            return a
        } ();
        b.DragonBonesEgretBridge = a
    })(b.display || (b.display = {}));
    var d = b.display; (function(c) {
        var a = function() {
            function a(b, c, d) {
                "undefined" === typeof d && (d = 1);
                this.texture = b;
                this.scale = d;
                this.parseData(c)
            }
            a.prototype.dispose = function() {
                this.texture = null
            };
            a.prototype.getRegion = function(a) {
                throw Error("error");
            };
            a.prototype.parseData = function(a) {
                this.name = a[b.utils.ConstValues.A_NAME];
                this.spriteSheet = ns_egret.SpriteSheet.parseFromDragonBones(a)
            };
            return a
        } ();
        c.EgretTextureAtlas = a
    })(b.textures || (b.textures = {})); (function(c) {
        var a = function(a) {
            function c() {
                a.call(this)
            }
            __extends(c, a);
            c.prototype._generateArmature = function() {
                return new b.Armature(new ns_egret.DisplayObjectContainer)
            };
            c.prototype._generateSlot = function() {
                return new b.Slot(new d.DragonBonesEgretBridge)
            };
            c.prototype._generateDisplay = function(a, b, c, d) {
                var e = ns_egret.Bitmap.initWithTexture(a.texture);
                a = a.spriteSheet.getFrame(b);
                e.spriteFrame = a;
                e.setAnchorPoint(c, d);
                return e
            };
            return c
        } (b.factorys.BaseFactory);
        c.EgretFactory = a
    })(b.factorys || (b.factorys = {}))
})(dragonBones || (dragonBones = {}));
var __extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
},
GameLayer = function(b) {
    function d() {
        b.call(this);
        this.tileSize = this.tileMap = this.mainRole = null;
        this.monsterList = [];
        this._isDeath = !1
    }
    __extends(d, b);
    d.getInstance = function() {
        null == d.instance && (d.instance = new d);
        return d.instance
    };
    d.prototype.createScene = function() {
        this.tileMap = ns_egret.TMXTiledMap.createWithFile("map/level1.tmx");
        this.tileMap.y = 220;
        this.addChild(this.tileMap);
        this.tileMap.getLayer("moveLayer").visible = !1;
        this.tileSize = this.tileMap.mapInfo.getTileWidth();
        this.tileMap.viewPortWidth = 800;
        this.tileMap.setMoveX(0);
        for (var b = 0; 5 > b; b++) {
            var a = ns_egret.Bitmap.initWithTexture(ns_egret.TextureCache.getInstance().getTexture("map/bg1.jpg"));
            a.x = b * a.getBounds().width;
            a.y = -this.getTileMapY();
            this.tileMap.addChild(a, 0)
        }
        this.initMonster();
        this.mainRole = new MainRole(ns_egret.ResourceLoader.create("role/roleData.json").data, ns_egret.TextureCache.getInstance().getTexture("role/role.png"));
        this.mainRole.setInterval(4);
        this.mainRole.gotoAndStop("run");
        this.setMainRolePosition(200, 0);
        this.tileMap.addChild(this.mainRole);
        ns_egret.VirtualJoystick.getInstance().addEventListener(ns_egret.VirtualJoystick.ON_TOUCH_LEFT, this.onVirtualJoystickLeftClick, this);
        ns_egret.VirtualJoystick.getInstance().addEventListener(ns_egret.VirtualJoystick.ON_TOUCH_RIGHT, this.onVirtualJoystickRightClick, this);
        ns_egret.VirtualJoystick.getInstance().addEventListener(ns_egret.VirtualJoystick.STOP_TOUCH_LEFT, this.onVirtualJoystickStopTouch, this);
        ns_egret.Ticker.getInstance().register(this.update, this);
        ns_egret.SoundContext.getInstance().playMusic("music/bg.mp3");
        ns_egret.SoundContext.getInstance().preloadSound("music/death.mp3")
    };
    d.prototype.initMonster = function() {
        var b = new Monster(ns_egret.ResourceLoader.create("monster/monsterData.json").data, ns_egret.TextureCache.getInstance().getTexture("monster/monster.png"));
        b.setInterval(20);
        b.gotoAndPlay("run");
        this.addMonster(b, 440, 0)
    };
    d.prototype.update = function() {
        this.getCol(this.mainRole.y) > this.tileMap.mapInfo.getMapHeight() && this.death()
    };
    d.prototype.addMonster = function(b, a, d) {
        b.x = a;
        b.y = d;
        this.tileMap.addChild(b);
        this.monsterList.push(b)
    };
    d.prototype.canMoveTo = function(b, a, d) {
        d = d || this.mainRole;
        var e = d.getBounds();
        return this.checkCanMove(b != d.x ? b < d.x ? Math.floor((b - e.width / 2) / this.tileSize) : Math.floor((b + e.width / 2) / this.tileSize) : Math.floor(b / this.tileSize), this.getCol(a + this.getTileMapY()))
    };
    d.prototype.getCol = function(b) {
        return Math.ceil(b / this.tileSize) - 1
    };
    d.prototype.checkCanMove = function(b, a) {
        if (0 > b || b > this.tileMap.mapInfo.getMapWidth() - 1) return ! 1;
        if (0 > a) return ! 0;
        if (a > this.tileMap.mapInfo.getMapHeight() - 1) return ! 1;
        var d = this.tileMap.getLayer("moveLayer"),
        e = ns_egret.Point.identity;
        e.x = b;
        e.y = a;
        if (d = d.getTileGIDAt(b, a)) if (d = this.tileMap.propertiesForGID(d)) if ((d = d.move) && 0 == d) return ! 1;
        return ! 0
    };
    d.prototype.setMainRolePosition = function(b, a) {
        if (!this.canMoveTo(b, a, this.mainRole) || !this.canMoveTo(b, a - this.mainRole.anchorPointY, this.mainRole)) return ! 1;
        this.mainRole.x = b;
        this.mainRole.y = a;
        var d = 0,
        e = this.x;
        0 <= e ? 250 < b && (d = b - 250) : 0 > e && (b > 250 - e ? d = b - 250 + e: b < 150 - e && (d = b - 150 + e));
        0 != d && this.tileMap.setMoveX(e - d);
        return ! 0
    };
    d.prototype.onVirtualJoystickLeftClick = function(b, a) { - 1 != a.indexOf(ns_egret.VirtualJoystick.DIRECTION_RIGHT) && this.mainRole.moveX(1); - 1 != a.indexOf(ns_egret.VirtualJoystick.DIRECTION_LEFT) && this.mainRole.moveX( - 1)
    };
    d.prototype.onVirtualJoystickRightClick = function(b) {
        this.mainRole.isJumping || this.mainRole.jump(90)
    };
    d.prototype.onVirtualJoystickStopTouch = function() {
        this.mainRole.stopMoveX()
    };
    d.prototype.death = function() {
        this._isDeath || (this._isDeath = !0, ns_egret.VirtualJoystick.getInstance().removeEventListener(ns_egret.VirtualJoystick.ON_TOUCH_LEFT, this.onVirtualJoystickLeftClick, this), ns_egret.VirtualJoystick.getInstance().removeEventListener(ns_egret.VirtualJoystick.ON_TOUCH_RIGHT, this.onVirtualJoystickRightClick, this), ns_egret.VirtualJoystick.getInstance().removeEventListener(ns_egret.VirtualJoystick.STOP_TOUCH_LEFT, this.onVirtualJoystickStopTouch, this), this.mainRole.death(), ns_egret.Tween.get(this.mainRole).to({
            y: this.mainRole.y - 50
        },
        300).to({
            y: this.mainRole.y + 550
        },
        1500).call(function() {
            this.restart()
        },
        this), this.monsterList.forEach(function(b, a) {
            b.stop()
        }), ns_egret.SoundContext.getInstance().playMusic("music/death.mp3", !1))
    };
    d.prototype.restart = function() {
        this.monsterList.forEach(function(b, a) {
            b.parent && b.parent.removeChild(b)
        });
        this.monsterList = [];
        this._isDeath = !1;
        this.mainRole.gotoAndStop("run");
        this.setMainRolePosition(200, 0);
        this.mainRole.start();
        this.initMonster();
        this.tileMap.setMoveX(0);
        ns_egret.VirtualJoystick.getInstance().addEventListener(ns_egret.VirtualJoystick.ON_TOUCH_LEFT, this.onVirtualJoystickLeftClick, this);
        ns_egret.VirtualJoystick.getInstance().addEventListener(ns_egret.VirtualJoystick.ON_TOUCH_RIGHT, this.onVirtualJoystickRightClick, this);
        ns_egret.VirtualJoystick.getInstance().addEventListener(ns_egret.VirtualJoystick.STOP_TOUCH_LEFT, this.onVirtualJoystickStopTouch, this);
        ns_egret.SoundContext.getInstance().playMusic("music/bg.mp3")
    };
    d.prototype.onKillMonster = function() {
        this.mainRole.jump(30)
    };
    d.prototype.getTileMapY = function() {
        return this.tileMap.y
    };
    d.instance = null;
    return d
} (ns_egret.DisplayObjectContainer);
var __extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
},
MainRole = function(b) {
    function d(c, a) {
        b.call(this, c, a);
        this.isJumping = !1;
        this.jumpHeight = 0;
        this.jumpMaxHeight = 90;
        this.isJumpUp = !1;
        this.vy = this.vx = 0;
        this.anchorPointX = 10;
        this.anchorPointY = 19;
        this.start()
    }
    __extends(d, b);
    d.prototype.start = function() {
        ns_egret.Ticker.getInstance().register(this.updatePos, this)
    };
    d.prototype.jump = function(b) {
        this.jumpMaxHeight = b;
        this.isJumpUp = this.isJumping = !0;
        this.jumpHeight = 0;
        this.vy = -10;
        this.gotoAndStop("jump")
    };
    d.prototype.updatePos = function(b) {
        b = 60 * b / 1E3 + 1;
        0 != this.vx && GameLayer.getInstance().setMainRolePosition(this.x + this.vx * b, this.y);
        this.isJumping && (this.jumpHeight < this.jumpMaxHeight && this.isJumpUp ? (this.moveY( - 0.5), this.jumpHeight -= this.vy * b, GameLayer.getInstance().setMainRolePosition(this.x, this.y + this.vy * b) || (this.isJumpUp = !1)) : this.isJumpUp = !1);
        this.isJumpUp || (10 < this.y && GameLayer.getInstance().death(), this.moveY(0.5), GameLayer.getInstance().canMoveTo(this.x, this.y + this.vy * b, this) ? (GameLayer.getInstance().setMainRolePosition(this.x, this.y + this.vy * b), this.isJumping = !0) : (this.vy = 0, this.isJumping && this.gotoAndStop("run"), this.isJumping = !1))
    };
    d.prototype.moveX = function(b) {
        this.vx += 0.1 * b;
        1.5 < this.vx ? this.vx = 1.5 : -1.5 > this.vx && (this.vx = -1.5);
        this.scaleX = 0 <= this.vx ? 1 : -1;
        this.isJumping || (0 != this.vx ? this.getIsPlaying() || this.gotoAndPlay("run") : this.gotoAndStop("run"))
    };
    d.prototype.moveY = function(b) {
        this.vy += 1 * b;
        3 < this.vy ? this.vy = 3 : -3 > this.vy && (this.vy = -3)
    };
    d.prototype.stopMoveX = function() {
        this.vx = 0;
        this.isJumping || this.gotoAndStop("run")
    };
    d.prototype.death = function() {
        ns_egret.Ticker.getInstance().unregister(this.updatePos, this);
        this.vy = this.vx = 0;
        this.isJumping = !1;
        this.jumpHeight = 0;
        this.isJumpUp = !1
    };
    return d
} (ns_egret.MovieClip);
var __extends = this.__extends ||
function(b, d) {
    function c() {
        this.constructor = b
    }
    for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
    c.prototype = d.prototype;
    b.prototype = new c
},
Monster = function(b) {
    function d(c, a) {
        b.call(this, c, a);
        this.direction = 1;
        this.anchorPointX = 10;
        this.anchorPointY = 20;
        ns_egret.Ticker.getInstance().register(this.enterFrame, this)
    }
    __extends(d, b);
    d.prototype.enterFrame = function() {
        this.move();
        this.deathTest()
    };
    d.prototype.move = function() {
        1 == this.direction ? GameLayer.getInstance().canMoveTo(this.x - 1, this.y, this) ? this.x -= 1 : this.direction = 3 : 3 == this.direction && (GameLayer.getInstance().canMoveTo(this.x + 1, this.y, this) ? this.x += 1 : this.direction = 1)
    };
    d.prototype.deathTest = function() {
        var b = GameLayer.getInstance().mainRole,
        a = this.getBounds(),
        d = b.getBounds();
        b.x + d.width / 2 > this.x - a.width / 2 && b.x - d.width / 2 < this.x + a.width / 2 && b.y > this.y - a.height && b.y < this.y - a.height / 2 ? (this.stop(), ns_egret.Tween.get(this).to({
            scaleY: 0
        },
        100), GameLayer.getInstance().onKillMonster()) : b.x + d.width / 2 > this.x - a.width / 2 && (b.x - d.width / 2 < this.x + a.width / 2 && b.y > this.y - a.height && b.y - d.height < this.y) && GameLayer.getInstance().death()
    };
    d.prototype.stop = function() {
        ns_egret.Ticker.getInstance().unregister(this.enterFrame, this)
    };
    return d
} (ns_egret.MovieClip);
var app = {
    startGame: function() {
        ns_egret.NetContext.context = new ns_egret.HTML5NetContext;
        ns_egret.ResourceLoader.prefix = "assets/";
        var b = new ns_egret.LoadingController;
        b.addResource("btn/b1.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b2.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b3.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b4.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b5.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b6.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b7.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/b8.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/c1.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("btn/c2.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("map/bg1.jpg", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("map/level1.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("map/level1.tmx", ns_egret.ResourceLoader.DATA_TYPE_TEXT);
        b.addResource("role/roleData.json", ns_egret.ResourceLoader.DATA_TYPE_TEXT);
        b.addResource("role/role.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("monster/monsterData.json", ns_egret.ResourceLoader.DATA_TYPE_TEXT);
        b.addResource("monster/monster.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addResource("alpha_0.png", ns_egret.ResourceLoader.DATA_TYPE_IMAGE);
        b.addEventListener(ns_egret.ResourceLoader.LOAD_COMPLETE, app.resourceLoadComplete, app);
        b.load()
    },
    resourceLoadComplete: function() {
        container = new ns_egret.DisplayObjectContainer;
        context.stage.addChild(container);
        ns_egret.StageDelegate.getInstance().setResolutionPolicy(1);
        ns_egret.StageDelegate.getInstance().setFrameSize(400, 240);
        ns_egret.StageDelegate.getInstance().setDesignSize(400, 240, 1);
        var b = ns_egret.VirtualJoystick.getInstance();
        b.setLeftImageNormalName("btn/b1.png");
        b.setLeftImageDownName("btn/b2.png");
        b.setTopImageNormalName("btn/b3.png");
        b.setTopImageDownName("btn/b4.png");
        b.setRightImageNormalName("btn/b5.png");
        b.setRightImageDownName("btn/b6.png");
        b.setBottomImageNormalName("btn/b7.png");
        b.setBottomImageDownName("btn/b8.png");
        b.setRightButtonImageNormalName("btn/c1.png");
        b.setRightButtonImageDownName("btn/c2.png");
        b.x = 70;
        b.y = 60;
        b.scaleX = b.scaleY = 0.5;
        b.show();
        b = GameLayer.getInstance();
        b.createScene();
        container.addChild(b);
        container.addChild(ns_egret.VirtualJoystick.getInstance())
    }
};
egret_h5 = {
    prefix: "",
    loadScript: function(b, d) {
        var c = 0;
        if ( - 1 < navigator.userAgent.indexOf("Trident/5")) {
            var a = function() {
                egret_h5.loadSingleScript(egret_h5.prefix + b[c],
                function() {
                    c++;
                    c >= b.length ? d() : a()
                })
            };
            a()
        } else b.forEach(function(a, e) {
            egret_h5.loadSingleScript(egret_h5.prefix + a,
            function() {
                c++;
                c >= b.length && d()
            })
        })
    },
    loadSingleScript: function(b, d) {
        var c = document.createElement("script");
        c.hasOwnProperty("async") && (c.async = !1);
        c.src = b;
        c.addEventListener("load",
        function() {
            this.removeEventListener("load", arguments.callee, !1);
            d()
        },
        !1);
        document.body.appendChild(c)
    },
    startGame: function() {
        var b = document.getElementById(ns_egret.StageDelegate.canvas_name);
        context = ns_egret.MainContext.instance;
        context.rendererContext = new ns_egret.HTML5CanvasRenderer(b);
        context.touchContext = new ns_egret.TouchContext(b);
        context.stage = new ns_egret.Stage;
        ns_egret.ResourceLoader.prefix = "assets/480/";
        ns_egret.RendererContext.CONTENT_SCALE_FACTOR = 1;
        ns_egret.NetContext.context = new ns_egret.HTML5NetContext;
        context.run();
        app && app.startGame && app.startGame()
    },
    preloadScript: function(b, d) {
        egret_h5.preloadList || (egret_h5.preloadList = []);
        egret_h5.preloadList = egret_h5.preloadList.concat(b.map(function(b) {
            return d + b
        }))
    },
    startLoading: function() {
        egret_h5.loadScript(egret_h5.preloadList, egret_h5.startGame)
    }
};