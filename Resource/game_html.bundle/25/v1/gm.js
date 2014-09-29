/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

(function() {
    var e, t, n; (function(r) {
        function v(e, t) {
            return h.call(e, t)
        }
        function m(e, t) {
            var n, r, i, s, o, u, a, f, c, h, p, v = t && t.split("/"),
            m = l.map,
            g = m && m["*"] || {};
            if (e && e.charAt(0) === ".") if (t) {
                v = v.slice(0, v.length - 1),
                e = e.split("/"),
                o = e.length - 1,
                l.nodeIdCompat && d.test(e[o]) && (e[o] = e[o].replace(d, "")),
                e = v.concat(e);
                for (c = 0; c < e.length; c += 1) {
                    p = e[c];
                    if (p === ".") e.splice(c, 1),
                    c -= 1;
                    else if (p === "..") {
                        if (c === 1 && (e[2] === ".." || e[0] === "..")) break;
                        c > 0 && (e.splice(c - 1, 2), c -= 2)
                    }
                }
                e = e.join("/")
            } else e.indexOf("./") === 0 && (e = e.substring(2));
            if ((v || g) && m) {
                n = e.split("/");
                for (c = n.length; c > 0; c -= 1) {
                    r = n.slice(0, c).join("/");
                    if (v) for (h = v.length; h > 0; h -= 1) {
                        i = m[v.slice(0, h).join("/")];
                        if (i) {
                            i = i[r];
                            if (i) {
                                s = i,
                                u = c;
                                break
                            }
                        }
                    }
                    if (s) break; ! a && g && g[r] && (a = g[r], f = c)
                } ! s && a && (s = a, u = f),
                s && (n.splice(0, u, s), e = n.join("/"))
            }
            return e
        }
        function g(e, t) {
            return function() {
                return s.apply(r, p.call(arguments, 0).concat([e, t]))
            }
        }
        function y(e) {
            return function(t) {
                return m(t, e)
            }
        }
        function b(e) {
            return function(t) {
                a[e] = t
            }
        }
        function w(e) {
            if (v(f, e)) {
                var t = f[e];
                delete f[e],
                c[e] = !0,
                i.apply(r, t)
            }
            if (!v(a, e) && !v(c, e)) throw new Error("No " + e);
            return a[e]
        }
        function E(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)),
            [t, e]
        }
        function S(e) {
            return function() {
                return l && l.config && l.config[e] || {}
            }
        }
        var i, s, o, u, a = {},
        f = {},
        l = {},
        c = {},
        h = Object.prototype.hasOwnProperty,
        p = [].slice,
        d = /\.js$/;
        o = function(e, t) {
            var n, r = E(e),
            i = r[0];
            return e = r[1],
            i && (i = m(i, t), n = w(i)),
            i ? n && n.normalize ? e = n.normalize(e, y(t)) : e = m(e, t) : (e = m(e, t), r = E(e), i = r[0], e = r[1], i && (n = w(i))),
            {
                f: i ? i + "!" + e: e,
                n: e,
                pr: i,
                p: n
            }
        },
        u = {
            require: function(e) {
                return g(e)
            },
            exports: function(e) {
                var t = a[e];
                return typeof t != "undefined" ? t: a[e] = {}
            },
            module: function(e) {
                return {
                    id: e,
                    uri: "",
                    exports: a[e],
                    config: S(e)
                }
            }
        },
        i = function(e, t, n, i) {
            var s, l, h, p, d, m = [],
            y = typeof n,
            E;
            i = i || e;
            if (y === "undefined" || y === "function") {
                t = !t.length && n.length ? ["require", "exports", "module"] : t;
                for (d = 0; d < t.length; d += 1) {
                    p = o(t[d], i),
                    l = p.f;
                    if (l === "require") m[d] = u.require(e);
                    else if (l === "exports") m[d] = u.exports(e),
                    E = !0;
                    else if (l === "module") s = m[d] = u.module(e);
                    else if (v(a, l) || v(f, l) || v(c, l)) m[d] = w(l);
                    else {
                        if (!p.p) throw new Error(e + " missing " + l);
                        p.p.load(p.n, g(i, !0), b(l), {}),
                        m[d] = a[l]
                    }
                }
                h = n ? n.apply(a[e], m) : undefined;
                if (e) if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports;
                else if (h !== r || !E) a[e] = h
            } else e && (a[e] = n)
        },
        e = t = s = function(e, t, n, a, f) {
            if (typeof e == "string") return u[e] ? u[e](t) : w(o(e, t).f);
            if (!e.splice) {
                l = e,
                l.deps && s(l.deps, l.callback);
                if (!t) return;
                t.splice ? (e = t, t = n, n = null) : e = r
            }
            return t = t ||
            function() {},
            typeof n == "function" && (n = a, a = f),
            a ? i(r, e, t, n) : setTimeout(function() {
                i(r, e, t, n)
            },
            4),
            s
        },
        s.config = function(e) {
            return s(e)
        },
        e._defined = a,
        n = function(e, t, n) {
            t.splice || (n = t, t = []),
            !v(a, e) && !v(f, e) && (f[e] = [e, t, n])
        },
        n.amd = {
            jQuery: !0
        }
    })(),
    n("requireLib",
    function() {}),
    n("Utils", ["require", "exports", "module"],
    function(e, t, n) {
        var r = {},
        i = window.navigator;
        return r.isArray = function(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        },
        r.bindFnc = function(e, t) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        r.objectToParamString = function(e) {
            var t, n = [];
            for (t in e) e.hasOwnProperty(t) && n.push(t + "=" + e[t]);
            return n.join("&")
        },
        r.paramStringToObject = function(e) {
            var t = {},
            n, r, i, s, o, u;
            if (e && typeof e == "string" && e.length > 1) {
                n = e,
                n[0] === "?" && (n = n.substr(1)),
                r = n.split("&");
                for (i = 0; i < r.length; i += 1) s = r[i].split("=", 2),
                s.length === 2 && (o = s[0], u = s[1], o && u && (t[o] = u))
            }
            return t
        },
        r.buildUrl = function(e, t) {
            var n = null,
            i = t ? r.objectToParamString(t) : null;
            return r.isArray(e) ? n = e.join("/") : typeof e == "string" && (n = e),
            i && (n += "?" + i),
            n
        },
        r.addClass = function(e, t) {
            var n = e.hasOwnProperty("className"),
            r = n ? e.className: e.getAttribute("class"),
            i = [],
            s,
            o = typeof t == "string",
            u = typeof t == "object" && typeof t.length == "number",
            a = u ? t: [t],
            f;
            typeof r == "string" && r.length > 0 && (i = r.split(" "));
            for (f = 0; f < a.length; f += 1) s = a[f],
            i.indexOf(s) === -1 && i.push(s);
            n ? e.className = i.join(" ") : e.setAttribute("class", i.join(" "))
        },
        r.removeClass = function(e, t) {
            var n = e.hasOwnProperty("className"),
            r = n ? e.className: e.getAttribute("class"),
            i = [],
            s,
            o = typeof t == "string",
            u = typeof t == "object" && typeof t.length == "number",
            a = u ? t: [t],
            f,
            l;
            typeof r == "string" && r.length > 0 && (i = r.split(" "));
            for (f = 0; f < a.length; f += 1) s = a[f],
            l = i.indexOf(s),
            l !== -1 && i.splice(l, 1);
            n ? e.className = i.join(" ") : e.setAttribute("class", i.join(" "))
        },
        r.hasClass = function(e, t) {
            var n, r = [];
            return e.getAttribute ? (n = e.getAttribute("class"), typeof n == "string" && n.length > 0 && (r = n.split(" ")), r.indexOf(t) !== -1) : !1
        },
        r.addOnClick = function(e, t, n) {
            e.onclick = t,
            n && e.addEventListener("touchstart",
            function(e) {
                return e.currentTarget.onclick(e),
                e.preventDefault(),
                e.stopPropagation(),
                !1
            },
            !1)
        },
        r.millisToReadable = function(e, t) {
            var n = e < 0,
            r = Math.abs(e),
            i = t || 3,
            s = r % 1e3,
            o = r / 1e3,
            u = Math.floor(o),
            a = u % 60,
            f = a + s / 1e3,
            l = f.toFixed(i),
            c = Math.floor(u / 60),
            h = c.toString();
            while (l.length < 3 + i) l = "0" + l;
            return (n ? "-": "") + c + ":" + l
        },
        r.isMobile = {
            Android: function() {
                return i.userAgent.match(/Android/i)
            },
            FirefoxOS: function() {
                return i.userAgent.indexOf("Android") === -1 && i.userAgent.indexOf("Firefox") >= 0 && i.userAgent.indexOf("Mobile") >= 0
            },
            BlackBerry: function() {
                return i.userAgent.match(/BlackBerry/i)
            },
            iOS: function() {
                return i.userAgent.match(/iPhone|iPad|iPod/i)
            },
            iPod: function() {
                return i.userAgent.match(/iPod/i)
            },
            iPhone: function() {
                return i.userAgent.match(/iPhone/i)
            },
            iPad: function() {
                return i.userAgent.match(/iPad/i)
            },
            Opera: function() {
                return i.userAgent.match(/Opera Mini/i)
            },
            Windows: function() {
                return i.userAgent.match(/IEMobile/i)
            },
            any: function() {
                return r.isMobile.Android() || r.isMobile.BlackBerry() || r.isMobile.iOS() || r.isMobile.Opera() || r.isMobile.Windows() || r.isMobile.FirefoxOS()
            },
            Safari: function() {
                return r.isMobile.iOS() && !r.isMobile.ChromeIOS() && i.userAgent.match(/AppleWebKit/i)
            },
            iPhoneSafari: function() {
                return (r.isMobile.iPhone() || r.isMobile.iPod()) && !r.isMobile.ChromeIOS() && i.userAgent.match(/AppleWebKit/i)
            },
            ChromeIOS: function() {
                return r.isMobile.iOS() && i.userAgent.match("CriOS")
            },
            ChromeAndroid: function() {
                return i.userAgent.match(/Android.+Chrome|CrMo/i)
            }
        },
        r.makeScrollable = function(e) {
            var t = 0,
            n = null;
            e.addEventListener("touchstart",
            function(e) {
                if (!n) {
                    var r, i = null;
                    for (r = 0; r < e.changedTouches.length && !n; r += 1) i = e.changedTouches[r],
                    n = "t" + e.changedTouches[r].identifier;
                    i && (t = this.scrollTop + i.pageY, e.preventDefault())
                }
            },
            !1),
            e.addEventListener("touchmove",
            function(e) {
                if (n) {
                    var r, i = null;
                    for (r = 0; r < e.changedTouches.length && !i; r += 1) n === "t" + e.changedTouches[r].identifier && (i = e.changedTouches[r]);
                    i && (this.scrollTop = t - i.pageY, e.preventDefault())
                }
            },
            !1),
            e.addEventListener("touchend",
            function(e) {
                if (n) {
                    var t, r = null;
                    for (t = 0; t < e.changedTouches.length && !r; t += 1) n === "t" + e.changedTouches[t].identifier && (r = e.changedTouches[t]);
                    r && (n = null, e.preventDefault())
                }
            },
            !1)
        },
        r
    }),
    n("Deferred", ["require", "exports", "module"],
    function(e, t, n) {
        function r(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        }
        function i(e, t) {
            if (r(e)) for (var n = 0; n < e.length; n++) t(e[n]);
            else t(e)
        }
        function s(e) {
            var t = "pending",
            n = [],
            o = [],
            u = [],
            a = null,
            f = {
                done: function() {
                    for (var e = 0; e < arguments.length; e++) {
                        if (!arguments[e]) continue;
                        if (r(arguments[e])) {
                            var i = arguments[e];
                            for (var s = 0; s < i.length; s++) t === "resolved" && i[s].apply(this, a),
                            n.push(i[s])
                        } else t === "resolved" && arguments[e].apply(this, a),
                        n.push(arguments[e])
                    }
                    return this
                },
                fail: function() {
                    for (var e = 0; e < arguments.length; e++) {
                        if (!arguments[e]) continue;
                        if (r(arguments[e])) {
                            var n = arguments[e];
                            for (var i = 0; i < n.length; i++) t === "rejected" && n[i].apply(this, a),
                            o.push(n[i])
                        } else t === "rejected" && arguments[e].apply(this, a),
                        o.push(arguments[e])
                    }
                    return this
                },
                always: function() {
                    return this.done.apply(this, arguments).fail.apply(this, arguments)
                },
                progress: function() {
                    for (var e = 0; e < arguments.length; e++) {
                        if (!arguments[e]) continue;
                        if (r(arguments[e])) {
                            var n = arguments[e];
                            for (var i = 0; i < n.length; i++) t === "pending" && u.push(n[i])
                        } else t === "pending" && u.push(arguments[e])
                    }
                    return this
                },
                then: function() {
                    arguments.length > 1 && arguments[1] && this.fail(arguments[1]),
                    arguments.length > 0 && arguments[0] && this.done(arguments[0]),
                    arguments.length > 2 && arguments[2] && this.progress(arguments[2])
                },
                promise: function(e) {
                    if (e == null) return f;
                    for (var t in f) e[t] = f[t];
                    return e
                },
                state: function() {
                    return t
                },
                debug: function() {
                    console.log("[debug]", n, o, t)
                },
                isRejected: function() {
                    return t === "rejected"
                },
                isResolved: function() {
                    return t === "resolved"
                },
                pipe: function(e, t, n) {
                    return s(function(n) {
                        i(e,
                        function(e) {
                            typeof e == "function" ? l.done(function() {
                                var t = e.apply(this, arguments);
                                t && typeof t == "function" ? t.promise().then(n.resolve, n.reject, n.notify) : n.resolve(t)
                            }) : l.done(n.resolve)
                        }),
                        i(t,
                        function(e) {
                            typeof e == "function" ? l.fail(function() {
                                var t = e.apply(this, arguments);
                                t && typeof t == "function" ? t.promise().then(n.resolve, n.reject, n.notify) : n.reject(t)
                            }) : l.fail(n.reject)
                        })
                    }).promise()
                }
            },
            l = {
                resolveWith: function(e) {
                    if (t === "pending") {
                        t = "resolved";
                        var r = a = arguments.length > 1 ? arguments[1] : [];
                        for (var i = 0; i < n.length; i++) n[i].apply(e, r)
                    }
                    return this
                },
                rejectWith: function(e) {
                    if (t === "pending") {
                        t = "rejected";
                        var n = a = arguments.length > 1 ? arguments[1] : [];
                        for (var r = 0; r < o.length; r++) o[r].apply(e, n)
                    }
                    return this
                },
                notifyWith: function(e) {
                    if (t === "pending") {
                        var n = a = arguments.length > 1 ? arguments[1] : [];
                        for (var r = 0; r < u.length; r++) u[r].apply(e, n)
                    }
                    return this
                },
                resolve: function() {
                    return this.resolveWith(this, arguments)
                },
                reject: function() {
                    return this.rejectWith(this, arguments)
                },
                notify: function() {
                    return this.notifyWith(this, arguments)
                }
            },
            c = f.promise(l);
            return e && e.apply(c, [c]),
            c
        }
        return s.when = function() {
            if (arguments.length < 2) {
                var e = arguments.length ? arguments[0] : undefined;
                return e && typeof e.isResolved == "function" && typeof e.isRejected == "function" ? e.promise() : s().resolve(e).promise()
            }
            return function(e) {
                var t = s(),
                n = e.length,
                r = 0,
                i = new Array(n);
                for (var o = 0; o < e.length; o++)(function(s) {
                    var o = null;
                    e[s].done ? e[s].done(function() {
                        i[s] = arguments.length < 2 ? arguments[0] : arguments,
                        ++r == n && t.resolve.apply(t, i)
                    }).fail(function() {
                        t.reject(arguments)
                    }) : (o = e[s], e[s] = new Deferred, e[s].done(function() {
                        i[s] = arguments.length < 2 ? arguments[0] : arguments,
                        ++r == n && t.resolve.apply(t, i)
                    }).fail(function() {
                        t.reject(arguments)
                    }).resolve(o))
                })(o);
                return t.promise()
            } (arguments)
        },
        s
    }),
    n("Resources", ["require", "exports", "module"],
    function(e, t, n) {
        var r = "gmapi-",
        i = {
            version: "0.1",
            versionPath: "v1",
            cssPath: "gm.css",
            json2JsPath: "json2.js",
            signInUrl: "/signin",
            kikSignInUrl: "signin/kik",
            emailSignInUrl: "/signin/email",
            facebookSignInUrl: "signin/facebook",
            twitterSignInUrl: "signin/twitter",
            defaultApiDomain: "http://api.gamemix.com",
            sessionCookieTTL: 63072e3,
            sessionCookieName: "gmapijs_cid",
            sessionUrlParamName: "gmapi_cid",
            iframeInitUrl: "iframe",
            fbIFrameButton: "signin/facebook/iframebutton",
            twIFrameButton: "signin/twitter/iframebutton",
            scoreTypes: {
                integer: "integer",
                time: "time"
            },
            rankingsTypes: {
                top: "top",
                context: "context",
                contextAndTop: "contextandtop"
            },
            rankingsListTypes: {
                allTime: "alltime",
                "24h": "24h"
            },
            signInMethods: {
                facebook: "facebook",
                twitter: "twitter",
                kik: "kik",
                email: "email",
                mixed: "mixed"
            },
            socialIcons: {
                fb16: "images/fb-icon-16.png",
                twitter16: "images/twitter-icon-16.png",
                kik16: "images/kik-logo-16.png",
                email16: "images/email-icon-16.png",
                mixed16: "images/gm_favicon_shadow3.png"
            },
            status: {
                success: "success",
                notSignedIn: "notsignedin",
                notPost: "notpost",
                noScore: "noscore",
                invalidScore: "invalidscore",
                invalidLevelName: "invalidlevelname",
                bestScore: "bestscore",
                noRankChange: "norankchange",
                noRankChangeUpdate: "norankchangeupdate",
                neverSubmitted: "neversubmitted",
                notConfirmed: "notconfirmed"
            },
            css: {
                classPrefix: r,
                show: r + "show",
                hide: r + "hide",
                selected: r + "selected",
                inAppWindow: r + "inapp-window",
                windowAlign: {
                    top: r + "align-top",
                    bottom: r + "align-bottom"
                },
                peekType: {
                    newHighScore: r + "leaderboard-peek-new-score",
                    noHighScore: r + "leaderboard-peek-no-score",
                    notSignedIn: r + "leaderboard-peek-notsignedin"
                },
                loadingCon: r + "loading-con",
                loading: r + "loading",
                isLoading: r + "is-loading",
                mobile: r + "mobile",
                desktop: r + "desktop",
                rankBreak: r + "rank-break"
            },
            loadingImagePath: "images/loading-icon.png"
        };
        return i
    }),
    n("AsyncJs", ["require", "exports", "module", "./Deferred"],
    function(e, t, n) {
        function i(e) {
            var t = document.getElementsByTagName("head")[0],
            n = new r,
            i = document.createElement("script");
            return i.type = "text/javascript",
            i.src = e,
            i.onload = function() {
                n.resolve(this)
            },
            i.onerror = function() {
                n.reject(this)
            },
            t.appendChild(i),
            n.promise(i)
        }
        var r = e("./Deferred");
        return i
    }),
    n("AsyncCss", ["require", "exports", "module", "./Deferred"],
    function(e, t, n) {
        function i(e) {
            var t = document.getElementsByTagName("head")[0],
            n = new r,
            i = document.createElement("link");
            return i.rel = "stylesheet",
            i.type = "text/css",
            i.href = e,
            i.onload = function() {
                n.resolve(this)
            },
            i.onerror = function() {
                n.reject(this)
            },
            t.appendChild(i),
            n.promise(i)
        }
        var r = e("./Deferred");
        return i
    }),
    n("ParallelPromises", ["require", "exports", "module", "./Deferred", "./Utils"],
    function(e, t, n) {
        function s(e, t) {
            this.masterDeferred = new r;
            var n;
            this.promises = [],
            this.numDone = 0,
            this.numFail = 0,
            this.failFast = t || !1,
            this.started = !1,
            e && i.isArray(e) && (this.promises = this.promises.concat(e));
            if (this.promises.length > 0) for (n = 0; n < this.promises.length; n += 1) this.addPromise(this.promises[n]);
            return this.masterDeferred.promise(this)
        }
        var r = e("./Deferred"),
        i = e("./Utils");
        return s.prototype = {
            addPromise: function(e) {
                e.done(i.bindFnc(this, this.promiseDone)),
                e.fail(i.bindFnc(this, this.promiseFail)),
                this.promises.push(e)
            },
            start: function() {
                this.started = !0,
                this.checkFinished()
            },
            promiseDone: function() {
                this.numDone += 1,
                this.checkFinished()
            },
            promiseFail: function() {
                this.numFail += 1,
                this.checkFinished()
            },
            checkFinished: function() {
                this.started && (this.failFast && this.numFail > 0 ? this.masterDeferred.reject() : this.promises.length >= this.numFail + this.numDone && (this.numFail > 0 ? this.masterDeferred.reject() : this.masterDeferred.resolve()))
            }
        },
        s
    }),
    n("CookieJar", ["require", "exports", "module"],
    function(e, t, n) {
        function r(e) {
            this.cookieMap = this.parseCookies()
        }
        return r.prototype = {
            getCookie: function(e, t, n) {
                return this.cookieMap[e] ? this.cookieMap[e] : (n && this.setCookie(e, t, n), t)
            },
            setCookie: function(e, t, n) {
                var r = new Date;
                r.setSeconds(r.getSeconds() + n),
                document.cookie = e + "=" + t + "; expires=" + r.toUTCString(),
                this.cookieMap[e] = t
            },
            parseCookies: function() {
                return document.cookie.split(";").map(function(e) {
                    return e.trim().split("=")
                }).reduce(function(e, t) {
                    return e[t[0]] = t[1],
                    e
                },
                {})
            }
        },
        new r
    }),
    n("DOM", ["require", "exports", "module"],
    function(e, t, n) {
        function r() {
            this.map = {}
        }
        return r.prototype = {
            get: function(e) {
                var t = this.map[e];
                return t || (this.map[e] = t = document.getElementById(e)),
                t
            },
            create: function(e, t, n, r) {
                var i = document.createElement(e),
                s;
                t && (i.hasOwnProperty("id") ? i.id = t: i.setAttribute("id", t)),
                n && (i.hasOwnProperty("className") ? i.className = n: i.setAttribute("class", n));
                if (r) for (s in r) r.hasOwnProperty(s) && (i.hasOwnProperty(s) ? i[s] = r[s] : i.setAttribute(s, r[s]));
                return i
            }
        },
        new r
    }),
    n("Ajax", ["require", "exports", "module", "./Deferred", "./Utils", "./DOM"],
    function(e, t, n) {
        function o(e, t) {
            var n = e && typeof e == "object" ? e: t || {},
            s = new r,
            o = n.method || "get",
            u = typeof e == "string" ? e: n.url || null,
            a = n.params,
            f = null,
            l = n.dataType || "json",
            c = new XMLHttpRequest,
            h = n.cacheBust || !1;
            u ? u.length === 0 && s.reject("Ajax create error: empty URL string.", c) : s.reject("Ajax create error: no URL specified.", c),
            h && (a || (a = {}), a.t = (new Date).getTime()),
            a && (typeof a == "string" ? f = a: f = i.objectToParamString(a)),
            n.success && s.done(n.success),
            n.fail && s.fail(n.fail),
            n.progress && s.progress(n.progress);
            var p = u;
            return f && o.toLowerCase() === "get" && (f[0] !== "?" && (p += "?"), p += f),
            c.dataType = l,
            c.onload = function(e) {
                var t = this.dataType;
                switch (t) {
                case "text":
                case "document":
                    s.resolve(this.responseText, this);
                    break;
                case "arraybuffer":
                case "blob":
                    s.resolve(this.response, this);
                    break;
                case "json":
                default:
                    if (!this.response || typeof this.response == "string") {
                        var n = null;
                        try {
                            n = JSON.parse(this.responseText)
                        } catch(r) {
                            s.reject("Ajax onload JSON.parse error: " + (r ? r.message: "unknown"), this)
                        }
                        s.resolve(n, this)
                    } else s.resolve(this.response, this)
                }
            },
            c.onprogress = function(e) {
                e && e.lengthComputable && s.notify(e.loaded / e.total, c)
            },
            c.onerror = function(e) {
                s.reject("Ajax error: " + e, c)
            },
            c.onabort = function(e) {
                s.reject("Ajax abort: " + e, c)
            },
            c.onreadystatechange = function(e) {
                this.readyState === 4 && this.status === 0 && s.reject("Ajax network error (maybe Access-Control?)", c)
            },
            c.open(o, p),
            c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            o.toLowerCase() === "post" ? c.send(f) : c.send(),
            s.promise(c)
        }
        var r = e("./Deferred"),
        i = e("./Utils"),
        s = e("./DOM");
        return o
    }),
    n("Leaderboard", ["require", "exports", "module", "./Utils", "./Deferred", "./Ajax", "./Resources", "./DOM"],
    function(e, t, n) {
        function a(e) {
            var t = e || {};
            this.game = t.game,
            this.api = t.api,
            this.levels = {};
            if (t.levels && r.isArray(t.levels)) {
                var n;
                for (n = 0; n < t.levels.length; n += 1) this.levels[t.levels[n].levelName] = {
                    levelName: t.levels[n].levelName,
                    scoreType: t.levels[n].scoreType
                }
            }
            this.inAppWindow = null,
            this.topMessage = null,
            this.currentLevelName = null,
            this.guestWindow = null,
            this.guestScoreNumber = null,
            this.peekWindow = null,
            this.peekHighScore = null,
            this.sendingScoreWindow = null,
            this.firstGuestWindowShown = !1,
            this.firstScoreSent = !1,
            this.tabs = {},
            this.refreshMap = {}
        }
        var r = e("./Utils"),
        i = e("./Deferred"),
        s = e("./Ajax"),
        o = e("./Resources"),
        u = e("./DOM");
        return a.DEFAULT_SIGNEDOUT_TAB = "alltime",
        a.DEFAULT_SIGNEDIN_TAB = "alltime",
        a.DEFAULT_LEVELNAME = "main",
        a.TABS = [{
            name: "alltime",
            label: "All Time"
        },
        {
            name: "24h",
            label: "24H"
        }],
        a.peekTypes = {
            NEWHIGHSCORE: "newhighscore",
            NOTSIGNEDIN: "notsignedin",
            NOHIGHSCORE: "nohighscore"
        },
        a.prototype = {
            createPath: function(e, t) {
                var n = ["leaderboard"];
                return e && n.push(e),
                this.game.createPath(r.buildUrl(n), t)
            },
            show: function(e, t) {
                if (this.game.id) {
                    var n = typeof e == "string" ? e: null,
                    r = e && typeof e == "object" ? e: t || {};
                    n ? r.list = n: n = r.list || r.tab || (this.api.user.isSignedIn() ? a.DEFAULT_SIGNEDIN_TAB: a.DEFAULT_SIGNEDOUT_TAB),
                    this.currentLevelName = r.levelName || null,
                    r.levelName = this.currentLevelName,
                    this.openLeaderboardWindow(n, r)
                } else console.warn("GMAPI: Invalid game ID. Cannot show leaderboard.")
            },
            populateTab: function(e, t) {
                var n = t || {};
                n.list = n.list || e;
                var i = null;
                this.api.user.isSignedIn() ? i = this.fetchContext(n) : i = this.fetchTop(n),
                this.tabs[e].page.innerHTML = "",
                this.tabs[e].topMessage = [],
                this.refreshMap[e] = !0,
                r.addClass(this.inAppWindow, o.css.isLoading),
                i.done(r.bindFnc(this,
                function(n, r) {
                    n.status !== o.status.notSignedIn ? this.processFetch(e, n, r) : (this.api.user.clear(), this.populateTab(e, t))
                })),
                i.fail(r.bindFnc(this,
                function(t, n) {
                    this.refreshMap[e] = !1,
                    this.processTabError(e, t)
                }))
            },
            hide: function() {
                this.currentLevelName = null,
                this.api.hideOverlay()
            },
            sendScore: function(e, t, n) {
                var s = t || {};
                n = n || new i;
                var u = n.promise();
                if (this.game.id) {
                    s.leaderboard = s.leaderboard || (this.api.user.isSignedIn() ? "context": "top");
                    var f = s.showLeaderboard || !1,
                    l = s.hasOwnProperty("peek") ? s.peek: !s.fromGuest && this.api.user.isSignedIn(),
                    c = s.list || s.tab || (this.api.user.isSignedIn() ? a.DEFAULT_SIGNEDIN_TAB: a.DEFAULT_SIGNEDOUT_TAB);
                    this.currentLevelName = s.levelName || null,
                    s.levelName = this.currentLevelName;
                    if (!this.api.user.isSignedIn() && !this.firstGuestWindowShown) this.firstGuestWindowShown = !0,
                    s.fromGuest = !0,
                    this.openGuestWindow(e, s, n);
                    else if (this.api.user.isSignedIn()) {
                        l && !f ? s.leaderboard = "none": f = !0,
                        f && this.openSendingScoreWindow(s.fromGuest);
                        var h = this.submit(e, s);
                        h.done(r.bindFnc(this,
                        function(t, r) {
                            if (t.status !== o.status.notSignedIn) {
                                this.firstScoreSent = !0;
                                if (l && !f) {
                                    var i = a.peekTypes.NOHIGHSCORE;
                                    switch (t.status) {
                                    case o.status.bestScore:
                                    case o.status.neverSubmitted:
                                        i = a.peekTypes.NEWHIGHSCORE
                                    }
                                    this.openPeekWindow(e, s, i)
                                } else(f || s.fromGuest) && this.openLeaderboardWindow(c, s, !1, !0),
                                this.tabs[c].page.innerHTML = "",
                                this.tabs[c].topMessage = [],
                                this.refreshMap[c] = !0,
                                this.processFetch(c, t, r);
                                n.resolve(t, r)
                            } else this.api.user.clear(),
                            s.type = null,
                            this.sendScore(e, s, n)
                        })),
                        h.fail(r.bindFnc(this,
                        function(e, t) {
                            this.refreshMap[c] = !1,
                            this.processTabError(c, e),
                            n.reject("GMAPI: Leaderboard Ajax request failed.")
                        }))
                    } else s.fromGuest ? (n = n || new i, this.api.user.signIn(r.bindFnc(this,
                    function(t) {
                        t.isSignedIn() ? (s.leaderboard = "context", this.sendScore(e, s, n)) : (this.hide(), n.reject("GMAPI: User cancelled sign in."))
                    }))) : (s.peek = !1, this.openPeekWindow(e, s, a.peekTypes.NOTSIGNEDIN, n))
                } else console.warn("GMAPI: Invalid game ID. Cannot send score."),
                n.reject("GMAPI: Invalid game ID. Cannot send score.");
                return u
            },
            openGuestWindow: function(e, t, n) {
                var i = t || {},
                s = e.toString(),
                a = this.getLevelSettings(i.levelName),
                f = i.scoreType || (a ? a.scoreType: null) || o.scoreTypes.integer;
                f === o.scoreTypes.time && (s = r.millisToReadable(e));
                if (!this.guestWindow) {
                    this.guestWindow = u.create("div", o.css.classPrefix + "leaderboard-guest-window", o.css.classPrefix + "leaderboard-guest-window " + o.css.inAppWindow),
                    this.api.addWindow("leaderboardGuest", this.guestWindow);
                    var l = u.create("div", null, o.css.classPrefix + "leaderboard-guest-top-message");
                    this.guestWindow.appendChild(l);
                    var c = u.create("span", null, o.css.classPrefix + "leaderboard-guest-score-message");
                    c.innerHTML = "Your Score: ",
                    l.appendChild(c),
                    this.guestScoreNumber = u.create("span", null, o.css.classPrefix + "leaderboard-guest-score-number"),
                    l.appendChild(this.guestScoreNumber);
                    var h = u.create("p", null, o.css.classPrefix + "leaderboard-guest-compliment");
                    h.innerHTML = "That's pretty good!",
                    this.guestWindow.appendChild(h);
                    var p = u.create("p", null, o.css.classPrefix + "leaderboard-guest-challenge");
                    p.innerHTML = "Challenge the world?",
                    this.guestWindow.appendChild(p);
                    var d = u.create("div", null, o.css.classPrefix + "leaderboard-guest-start");
                    d.innerHTML = "Start Now",
                    r.addOnClick(d, r.bindFnc(this,
                    function(t) {
                        this.api.hideOverlay(),
                        this.sendScore(e, i, n),
                        t.stopPropagation()
                    }), !1),
                    this.guestWindow.appendChild(d);
                    var v = u.create("div", null, o.css.classPrefix + "leaderboard-guest-later-con");
                    this.guestWindow.appendChild(v);
                    var m = u.create("a", null, o.css.classPrefix + "leaderboard-guest-later");
                    m.href = "#",
                    m.innerHTML = "Maybe later",
                    r.addOnClick(m, r.bindFnc(this,
                    function(e) {
                        return this.api.hideOverlay(),
                        e.stopPropagation(),
                        !1
                    }), !0),
                    v.appendChild(m)
                }
                var g;
                for (g in o.scoreTypes) o.scoreTypes.hasOwnProperty(g) && r.removeClass(this.guestWindow, o.css.classPrefix + o.scoreTypes[g]);
                r.addClass(this.guestWindow, o.css.classPrefix + f),
                this.guestScoreNumber.innerHTML = s,
                this.api.showOverlay("leaderboardGuest")
            },
            createLeaderboardWindow: function() {
                if (!this.inAppWindow) {
                    this.inAppWindow = u.create("div", o.css.classPrefix + "leaderboard", o.css.classPrefix + "leaderboard " + o.css.inAppWindow),
                    this.api.addWindow("leaderboard", this.inAppWindow),
                    this.topMessage = u.create("div", null, o.css.classPrefix + "leaderboard-top-message"),
                    this.inAppWindow.appendChild(this.topMessage);
                    var e = u.create("ul", o.css.classPrefix + "leaderboard-tabs", o.css.classPrefix + "leaderboard-tabs");
                    this.inAppWindow.appendChild(e);
                    var t = u.create("div", o.css.classPrefix + "leaderboard-tab-page-container", o.css.classPrefix + "leaderboard-tab-page-container");
                    this.inAppWindow.appendChild(t);
                    var n;
                    for (n = 0; n < a.TABS.length; n += 1) {
                        var i = a.TABS[n],
                        s = u.create("li", o.css.classPrefix + "leaderboard-tab-" + i.name, o.css.classPrefix + "leaderboard-tab-" + i.name);
                        s.innerHTML = i.label,
                        r.addOnClick(s, this.createOpenTabFunction(i.name), !0),
                        e.appendChild(s);
                        var f = u.create("div", o.css.classPrefix + "leaderboard-tab-page-" + i.name, o.css.classPrefix + "leaderboard-tab-page " + o.css.classPrefix + "leaderboard-tab-page-" + i.name);
                        r.makeScrollable(f),
                        t.appendChild(f),
                        this.tabs[i.name] = {
                            label: i.label,
                            page: f,
                            tab: s,
                            topMessage: []
                        }
                    }
                    var l = u.create("div", o.css.classPrefix + "leaderboard-loading-con", o.css.classPrefix + "leaderboard-loading-con " + o.css.loadingCon);
                    this.inAppWindow.appendChild(l);
                    var c = u.create("img", o.css.classPrefix + "leaderboard-loading", o.css.classPrefix + "leaderboard-loading " + o.css.loading);
                    c.src = this.api.createVersionedPath(o.loadingImagePath),
                    l.appendChild(c)
                }
            },
            openLeaderboardWindow: function(e, t, n, i) {
                this.createLeaderboardWindow(),
                n || (this.refreshMap = {}),
                r.addClass(this.inAppWindow, o.css.isLoading),
                this.clearTabPages(),
                this.openTab(e, i, t),
                this.api.showOverlay("leaderboard")
            },
            openPeekWindow: function(e, t, n, i) {
                var s = t || {},
                f = e.toString(),
                l = this.getLevelSettings(s.levelName),
                c = s.scoreType || (l ? l.scoreType: null) || o.scoreTypes.integer;
                c === o.scoreTypes.time && (f = r.millisToReadable(e, 1));
                if (!this.peekWindow) {
                    var h = this;
                    this.peekWindow = u.create("div", o.css.classPrefix + "leaderboard-peek", o.css.classPrefix + "leaderboard-peek " + o.css.inAppWindow),
                    this.api.addWindow("leaderboardPeek", this.peekWindow, "bottom");
                    var p = u.create("div", o.css.classPrefix + "leaderboard-peek-submit", o.css.classPrefix + "leaderboard-peek-submit");
                    p.innerHTML = '<p><span class="' + o.css.classPrefix + 'mobile-only-text">Tap</span><span class="' + o.css.classPrefix + 'desktop-only-text">Click</span> to <span class="' + o.css.classPrefix + 'colored">submit score!</span></p>',
                    r.addOnClick(p,
                    function(n) {
                        h.api.user.signIn(function(n) {
                            n.isSignedIn() ? h.sendScore(e, t, i) : h.api.hideOverlay()
                        }),
                        n.stopPropagation()
                    },
                    !1),
                    this.peekWindow.appendChild(p);
                    var d = u.create("div", o.css.classPrefix + "leaderboard-peek-see", o.css.classPrefix + "leaderboard-peek-see");
                    d.innerHTML = '<p><span class="' + o.css.classPrefix + 'mobile-only-text">Tap</span><span class="' + o.css.classPrefix + 'desktop-only-text">Click</span> to see <span class="' + o.css.classPrefix + 'colored">Leaderboard!</span></p>',
                    r.addOnClick(d, r.bindFnc(this,
                    function(e) {
                        this.peekOnClick(e, s),
                        e.stopPropagation()
                    }), !1),
                    this.peekWindow.appendChild(d);
                    var v = u.create("div", o.css.classPrefix + "leaderboard-peek-hiscore-con", o.css.classPrefix + "leaderboard-peek-hiscore-con");
                    r.addOnClick(v, r.bindFnc(this,
                    function(e) {
                        this.peekOnClick(e, s),
                        e.stopPropagation()
                    }), !1),
                    this.peekWindow.appendChild(v);
                    var m = u.create("div", o.css.classPrefix + "leaderboard-peek-top-message", o.css.classPrefix + "leaderboard-peek-top-message");
                    v.appendChild(m);
                    var g = u.create("span", o.css.classPrefix + "leaderboard-peek-new", o.css.classPrefix + "leaderboard-peek-new");
                    g.innerHTML = "New Hi-Score: ",
                    m.appendChild(g),
                    this.peekHighScore = u.create("span", o.css.classPrefix + "leaderboard-peek-hiscore", o.css.classPrefix + "leaderboard-peek-hiscore"),
                    m.appendChild(this.peekHighScore);
                    var y = u.create("div", o.css.classPrefix + "leaderboard-peek-bottom-message", o.css.classPrefix + "leaderboard-peek-bottom-message");
                    y.innerHTML = "See <span>Leaderboard!</span>",
                    v.appendChild(y)
                }
                r.removeClass(this.peekWindow, [o.css.peekType.newHighScore, o.css.peekType.noHighScore, o.css.peekType.notSignedIn]);
                switch (n) {
                case a.peekTypes.NEWHIGHSCORE:
                    this.peekHighScore.innerHTML = f + "!",
                    r.addClass(this.peekWindow, o.css.peekType.newHighScore);
                    break;
                case a.peekTypes.NOTSIGNEDIN:
                    r.addClass(this.peekWindow, o.css.peekType.notSignedIn);
                    break;
                case a.peekTypes.NOHIGHSCORE:
                    r.addClass(this.peekWindow, o.css.peekType.noHighScore);
                    break;
                default:
                    r.addClass(this.peekWindow, o.css.peekType.noHighScore)
                }
                var b;
                for (b in o.scoreTypes) o.scoreTypes.hasOwnProperty(b) && r.removeClass(this.peekWindow, o.css.classPrefix + o.scoreTypes[b]);
                r.addClass(this.peekWindow, o.css.classPrefix + c),
                this.api.showOverlay("leaderboardPeek"),
                setTimeout(r.bindFnc(this,
                function() {
                    this.api.currentInAppWindow === "leaderboardPeek" && this.hide()
                }), 5e3)
            },
            peekOnClick: function(e, t) {
                var n = t || {};
                n.levelName = this.currentLevelName,
                this.show(n)
            },
            openSendingScoreWindow: function(e) {
                if (!this.sendingScoreWindow) {
                    this.sendingScoreWindow = u.create("div", o.css.classPrefix + "leaderboard-sending", o.css.classPrefix + "leaderboard-sending " + o.css.inAppWindow),
                    this.api.addWindow("leaderboardSending", this.sendingScoreWindow);
                    var t = u.create("div", o.css.classPrefix + "leaderboard-sending-message", o.css.classPrefix + "leaderboard-sending-message");
                    t.innerHTML = "Hold tight while<br>we send your score...",
                    this.sendingScoreWindow.appendChild(t);
                    var n = u.create("div", o.css.classPrefix + "leaderboard-sending-aftersignin-message", o.css.classPrefix + "leaderboard-sending-aftersignin-message");
                    n.innerHTML = "Awesome! Hold tight while<br>we send your score...",
                    this.sendingScoreWindow.appendChild(n);
                    var i = u.create("div", o.css.classPrefix + "leaderboard-sending-loading-con", o.css.classPrefix + "leaderboard-sending-loading-con " + o.css.loadingCon);
                    this.sendingScoreWindow.appendChild(i);
                    var s = u.create("img", o.css.classPrefix + "leaderboard-sending-loading", o.css.classPrefix + "leaderboard-sending-loading " + o.css.loading);
                    s.src = this.api.createVersionedPath(o.loadingImagePath),
                    i.appendChild(s)
                }
                e ? r.addClass(this.sendingScoreWindow, o.css.classPrefix + "aftersignin") : r.removeClass(this.sendingScoreWindow, o.css.classPrefix + "aftersignin"),
                this.api.showOverlay("leaderboardSending")
            },
            openTab: function(e, t, n) {
                this.closeAllTabs();
                if (!t && !this.refreshMap[e]) {
                    this.topMessage.innerHTML = "";
                    var i = n || {};
                    i.levelName || (i.levelName = this.currentLevelName),
                    this.populateTab(e, i)
                }
                var s = this.tabs[e];
                s ? (r.addClass(s.page, o.css.show), r.addClass(s.tab, o.css.selected), this.setTopMessage(s.topMessage)) : console.warn("GMAPI: Cannot open " + e + " tab. Does not exist in leaderboard.")
            },
            closeTab: function(e) {
                var t = this.tabs[e];
                t ? r.removeClass(t.page, o.css.show) : console.warn("GMAPI: Cannot close " + e + " tab. Does not exist in leaderboard.")
            },
            closeAllTabs: function() {
                var e;
                for (e = 0; e < a.TABS.length; e += 1) {
                    var t = this.tabs[a.TABS[e].name];
                    t && (r.removeClass(t.page, o.css.show), r.removeClass(t.tab, o.css.selected))
                }
            },
            createOpenTabFunction: function(e) {
                var t = this;
                return function(n) {
                    t.openTab(e),
                    n.stopPropagation()
                }
            },
            processFetch: function(e, t, n) {
                var i = this.tabs[e];
                r.removeClass(this.inAppWindow, o.css.isLoading);
                if (i) {
                    if (t && t.data && t.data.rankings) {
                        var s = t.data.rankings,
                        a = s.rankingsList,
                        f = s.rankingsScoreType,
                        l = this.parseLeaderboard(e, a, f);
                        i.page.innerHTML = "",
                        i.page.appendChild(l),
                        i.topMessage = [];
                        switch (s.rankingsType) {
                        case o.rankingsTypes.context:
                        case o.rankingsTypes.contextAndTop:
                            i.page.scrollTop = i.page.scrollHeight
                        }
                        this.topMessage.innerHTML = "";
                        var c = -1,
                        h;
                        for (h = 0; h < a.length && c === -1; h += 1) a[h].isCurrentUser && (c = a[h].rank);
                        if (c !== -1) {
                            var p = u.create("span", null, o.css.classPrefix + "leaderboard-rank-message");
                            p.innerHTML = "Your rank: ",
                            i.topMessage.push(p);
                            var d = u.create("span", null, o.css.classPrefix + "leaderboard-rank-number");
                            d.innerHTML = (c + 1).toString(),
                            i.topMessage.push(d),
                            this.setTopMessage(i.topMessage)
                        }
                    }
                } else console.warn("GMAPI: Cannot populate " + e + " page. Does not exist in leaderboard.")
            },
            parseLeaderboard: function(e, t, n) {
                var i = u.create("table", null, o.css.classPrefix + "leaderboard-table " + o.css.classPrefix + "leaderboard-table-" + e),
                s,
                a,
                f,
                l,
                c,
                h;
                if (t.length > 0) {
                    var p = -1;
                    for (f = 0; f < t.length; f += 1) {
                        l = t[f],
                        p !== -1 && Math.abs(p - l.rank) > 1 && (s = u.create("tr", null, o.css.rankBreak), i.appendChild(s), a = u.create("td"), a.colSpan = 3, s.appendChild(a)),
                        p = l.rank,
                        h = o.css.classPrefix + "ranking-item",
                        l.isCurrentUser && (h += " " + o.css.selected),
                        s = u.create("tr", null, h),
                        i.appendChild(s),
                        a = u.create("td", null, o.css.classPrefix + "rank"),
                        a.innerHTML = l.rank + 1 + ".",
                        s.appendChild(a);
                        var d = null;
                        if (l.signInMethod) switch (l.signInMethod) {
                        case o.signInMethods.kik:
                            d = o.socialIcons.kik16;
                            break;
                        case o.signInMethods.twitter:
                            d = o.socialIcons.twitter16;
                            break;
                        case o.signInMethods.facebook:
                            d = o.socialIcons.fb16;
                            break;
                        case o.signInMethods.email:
                            d = o.socialIcons.email16;
                            break;
                        case o.signInMethods.mixed:
                            d = o.socialIcons.mixed16
                        }
                        var v = d ? '<img src="' + this.api.createPath(d) + '" alt="" class="' + o.css.classPrefix + "rank-social-icon" + '"> ': "";
                        a = u.create("td", null, o.css.classPrefix + "username"),
                        a.innerHTML = v + l.username,
                        s.appendChild(a);
                        var m = l.score.toString();
                        n === o.scoreTypes.time && (m = r.millisToReadable(l.score)),
                        a = u.create("td", null, o.css.classPrefix + "score"),
                        a.innerHTML = m,
                        s.appendChild(a)
                    }
                } else s = u.create("tr", null, o.css.classPrefix + "ranking-item " + o.css.classPrefix + "ranking-no-scores"),
                i.appendChild(s),
                a = u.create("td", null, o.css.classPrefix + "rank"),
                s.appendChild(a),
                a = u.create("td", null, o.css.classPrefix + "username"),
                a.innerHTML = "No scores",
                s.appendChild(a),
                a = u.create("td", null, o.css.classPrefix + "score"),
                s.appendChild(a);
                return i
            },
            processTabError: function(e, t) {
                var n = this.tabs[e];
                r.removeClass(this.inAppWindow, o.css.isLoading);
                var i = u.create("table", null, o.css.classPrefix + "leaderboard-table " + o.css.classPrefix + "leaderboard-table-" + e + " " + o.css.classPrefix + "leaderboard-table-error");
                if (n) {
                    var s, a;
                    s = u.create("tr"),
                    i.appendChild(s),
                    a = u.create("td"),
                    typeof t == "string" ? s.innerHTML = "Error: " + t: t && t.status ? s.innerHTML = 'A "' + t.status + '" error has occurred. Please try again later.': s.innerHTML = "Unknown error has occurred. Please try again later.",
                    s.appendChild(a),
                    n.page.innerHTML = "",
                    n.page.appendChild(i)
                }
            },
            clearTabPages: function() {
                var e;
                for (e in this.tabs) this.tabs.hasOwnProperty(e) && (this.tabs[e].page.innerHTML = "")
            },
            setTopMessage: function(e) {
                this.topMessage.innerHTML = "";
                if (e) {
                    var t;
                    for (t = 0; t < e.length; t += 1) this.topMessage.appendChild(e[t])
                }
            },
            getLevelSettings: function(e) {
                var t = e || a.DEFAULT_LEVELNAME;
                return this.levels[t]
            },
            submit: function(e, t) {
                if (this.game.id) {
                    var n = t || {},
                    r = {
                        score: e,
                        leaderboard: n.leaderboard || "none"
                    },
                    u = n.levelName;
                    return u && (r.levelname = u),
                    n.size && (r.size = n.size),
                    n.list && (r.list = n.list),
                    n.type && (r.type = n.type),
                    r[o.sessionUrlParamName] = this.api.currentSessionId,
                    new s({
                        url: this.createPath("submit"),
                        params: r,
                        method: "post",
                        success: n.success,
                        fail: n.fail,
                        cacheBust: !0
                    })
                }
                var a = new i;
                return a.reject("GMAPI: Invalid game ID. Did not submit score."),
                a.promise()
            },
            fetchTop: function(e) {
                if (this.game.id) {
                    var t = e || {},
                    n = {},
                    r = t.levelName;
                    return r && (n.levelname = r),
                    t.size && (n.size = t.size),
                    t.list && (n.list = t.list),
                    n[o.sessionUrlParamName] = this.api.currentSessionId,
                    new s({
                        url: this.createPath("get/top"),
                        params: n,
                        success: t.success,
                        fail: t.fail,
                        cacheBust: !0
                    })
                }
                var u = new i;
                return u.reject("GMAPI: Invalid game ID. Did not fetch top list."),
                u.promise()
            },
            fetchContext: function(e) {
                if (this.game.id) {
                    var t = e || {},
                    n = {},
                    r = t.levelName;
                    return r && (n.levelname = r),
                    t.size && (n.size = t.size),
                    t.list && (n.list = t.list),
                    n[o.sessionUrlParamName] = this.api.currentSessionId,
                    new s({
                        url: this.createPath("get/context"),
                        params: n,
                        success: t.success,
                        fail: t.fail,
                        cacheBust: !0
                    })
                }
                var u = new i;
                return u.reject("GMAPI: Invalid game ID. Did not fetch context list."),
                u.promise()
            }
        },
        a
    }),
    n("Game", ["require", "exports", "module", "./Utils", "./Leaderboard"],
    function(e, t, n) {
        function s(e) {
            var t = e || {};
            this.id = t.id,
            this.name = t.name,
            this.api = t.api,
            this.createLeaderboards(t.levelNames);
            if (t.readyFncs) {
                var n;
                for (n = 0; n < t.readyFncs.length; n += 1) t.readyFncs[n](this)
            }
        }
        var r = e("./Utils"),
        i = e("./Leaderboard");
        return s.prototype = {
            createPath: function(e, t) {
                this.id || console.warn("GMAPI: Invalid game ID (not a successful remote init?)");
                var n = [this.id];
                return e && n.push(e),
                this.api.createVersionedPath(r.buildUrl(n), t)
            },
            push: function(e) {
                e(this)
            },
            createLeaderboards: function(e) {
                this.leaderboard = new i({
                    game: this,
                    api: this.api,
                    levels: e
                })
            }
        },
        s
    }),
    n("User", ["require", "exports", "module", "./Deferred", "./DOM", "./Utils", "./Resources", "./Ajax"],
    function(e, t, n) {
        function a(e) {
            var t = e || {};
            this.api = t.api,
            this.username = t.username || null,
            this.avatarUrl = t.avatarUrl || null,
            this.confirmed = t.confirmed || !1,
            this.inAppWindow = null,
            this.errorWindow = null,
            this.errorReasonDiv = null,
            this.state = this.username ? a.states.SIGNEDIN: a.states.SIGNEDOUT,
            this.activeDeferred = null,
            window.addEventListener("message", s.bindFnc(this, this.onMessage), !1)
        }
        var r = e("./Deferred"),
        i = e("./DOM"),
        s = e("./Utils"),
        o = e("./Resources"),
        u = e("./Ajax");
        return a.states = {
            SIGNEDOUT: "signedout",
            WAITINGSIGNOUT: "waitingsignout",
            WAITINGSIGNIN: "waitingsignin",
            SIGNEDIN: "signedin"
        },
        a.prototype = {
            states: a.states,
            isSignedIn: function() {
                return this.state === a.states.SIGNEDIN
            },
            signIn: function(e) {
                if (window.kik && window.kik.enabled) return this.kikSignIn(e);
                var t = new r;
                return e ? t.done(e) : t.done(s.bindFnc(this, this.closeInAppWindow)),
                t.fail(s.bindFnc(this, this.closeInAppWindow)),
                this.isSignedIn() ? t.resolve(this) : (this.activeDeferred = t, this.openInAppWindow(t)),
                t.promise()
            },
            kikSignIn: function(e) {
                var t = new r;
                e && t.done(e);
                if (!this.isSignedIn()) {
                    var n = this;
                    window.kik.getUser(function(e) {
                        if (e) {
                            var r = {
                                username: encodeURIComponent(e.username),
                                fullname: encodeURIComponent(e.fullName),
                                thumbnail: encodeURIComponent(e.thumbnail)
                            };
                            r[o.sessionUrlParamName] = n.api.currentSessionId;
                            var i = new u({
                                url: n.api.createPath(o.kikSignInUrl),
                                params: r,
                                method: "post"
                            });
                            i.done(function(e, r) {
                                e.status && e.status === o.status.success ? (n.signInCallback(e), t.resolve(n)) : t.reject(n, e.status)
                            }),
                            i.fail(function(e) {
                                t.reject(n, e)
                            })
                        } else t.reject(n, "User denied.")
                    })
                } else t.resolve(this);
                return t.promise()
            },
            signInCallback: function(e) {
                this.setUserInfo(e.data.user);
                if (this.activeDeferred) {
                    var t = null;
                    this.isSignedIn() ? this.confirmed ? this.activeDeferred.resolve(this) : (t = o.status.notConfirmed, this.activeDeferred.reject(this, t)) : (t = o.status.notSignedIn, this.activeDeferred.reject(this, t)),
                    this.activeDeferred = null
                }
            },
            openInAppWindow: function(e) {
                if (!this.inAppWindow) {
                    this.inAppWindow = i.create("div", o.css.classPrefix + "signin", o.css.classPrefix + "signin " + o.css.inAppWindow),
                    this.api.addWindow("signin", this.inAppWindow);
                    var t = i.create("div", o.css.classPrefix + "signin-top-message", o.css.classPrefix + "signin-top-message");
                    t.innerHTML = "First, let's connect you to:",
                    this.inAppWindow.appendChild(t);
                    var n = i.create("div", o.css.classPrefix + "signin-social-container", o.css.classPrefix + "signin-social-container");
                    this.inAppWindow.appendChild(n);
                    var r = i.create("iframe", o.css.classPrefix + "signin-social-fb", o.css.classPrefix + "signin-social-fb " + o.css.classPrefix + "signin-social-button");
                    r.src = this.api.createPath(o.fbIFrameButton),
                    r.scrolling = "no",
                    n.appendChild(r);
                    var s = i.create("div", null, o.css.classPrefix + "signin-social-spacing");
                    n.appendChild(s);
                    var u = i.create("iframe", o.css.classPrefix + "signin-social-tw", o.css.classPrefix + "signin-social-tw " + o.css.classPrefix + "signin-social-button");
                    u.src = this.api.createPath(o.twIFrameButton),
                    u.scrolling = "no",
                    n.appendChild(u);
                    var a = i.create("div", o.css.classPrefix + "signin-bottom-message", o.css.classPrefix + "signin-bottom-message");
                    this.inAppWindow.appendChild(a)
                }
                this.api.showOverlay("signin")
            },
            closeInAppWindow: function() {
                this.api.hideOverlay()
            },
            openErrorWindow: function(e) {
                if (!this.errorWindow) {
                    this.errorWindow = i.create("div", o.css.classPrefix + "signin-error", o.css.classPrefix + "signin-error " + o.css.inAppWindow),
                    this.api.addWindow("signinerror", this.errorWindow);
                    var t = i.create("div", o.css.classPrefix + "signin-error-top-message", o.css.classPrefix + "signin-error-top-message");
                    t.innerHTML = "Sign In Error",
                    this.errorWindow.appendChild(t),
                    this.errorReasonDiv = i.create("div", o.css.classPrefix + "signin-error-reason", o.css.classPrefix + "signin-error-reason"),
                    this.errorWindow.appendChild(this.errorReasonDiv)
                }
                this.errorReasonDiv.innerHTML = e,
                this.api.showOverlay("signinerror")
            },
            onMessage: function(e) {
                if (e && e.data) {
                    var t = null;
                    if (typeof e.data == "string") try {
                        t = JSON.parse(e.data)
                    } catch(n) {
                        console.log("GMAPI: JSON parse error in User in messaging API (" + (n ? n.message: "unknown") + ")"),
                        t = null
                    } else t = e.data;
                    t && t.type === "signin" && this.signInCallback(t)
                }
            },
            setUserInfo: function(e) {
                e || (e = {}),
                e.signedIn ? (this.username = e.username || null, this.avatarUrl = e.avatarUrl || null, this.confirmed = e.confirmed || !1) : (this.username = null, this.avatarUrl = null, this.confirmed = !1),
                this.username ? this.state = a.states.SIGNEDIN: this.state = a.states.SIGNEDOUT,
                e.sessionId && (this.api.currentSessionId = e.sessionId)
            },
            signOut: function(e) {
                var t = new r;
                return e && t.done(e),
                this.isSignedIn() || t.resolve(this),
                t.promise()
            },
            clear: function() {
                this.username = null,
                this.avatarUrl = null,
                this.state = a.states.SIGNEDOUT
            }
        },
        a
    }),
    n("Api", ["require", "exports", "module", "./Utils", "./Deferred", "./Resources", "./AsyncJs", "./AsyncCss", "./ParallelPromises", "./CookieJar", "./Ajax", "./Game", "./User", "./DOM"],
    function(e, t, n) {
        function v(e, t) {
            this !== window && (!this.state || this.state === v.states.NONE) && (this.initialUrlParams = r.paramStringToObject(window.location.search), this.createdDeferred = new i, this.bodyCreateDeferred = new i, this.asyncInclude = new a, this.readyDeferred = new i, this.createdFncs = [], this.state = v.states.NONE, this.game = new c, this.user = new h({
                api: this
            }), this.currentSessionId = f.getCookie(s.sessionCookieName, null), this.apiDomain = s.defaultApiDomain, this.version = s.version, this.versionPath = s.versionPath, this.guiEnabled = !0, this.dev = t || !1, this.includeJses = [], this.includeCsses = [], this.inAppWindowMap = {},
            this.currentInAppWindow = null, this.overlay = p.create("div", s.css.classPrefix + "overlay", s.css.classPrefix + "overlay"), this.overlay.style.display = "none", r.addOnClick(this.overlay, r.bindFnc(this, this.hideOverlay), !1), this.centerOverlay = p.create("div", s.css.classPrefix + "center-overlay", s.css.classPrefix + "center-overlay"), this.overlay.appendChild(this.centerOverlay), this.wrapper = p.create("div", s.css.classPrefix + "wrapper", s.css.classPrefix + "wrapper"), this.centerOverlay.appendChild(this.wrapper), this.inAppWindowContainer = p.create("div", s.css.classPrefix + "inapp-window-container", s.css.classPrefix + "inapp-window-container"), this.wrapper.appendChild(this.inAppWindowContainer), this.overlayCloseButton = p.create("div", s.css.classPrefix + "close", s.css.classPrefix + "close"), this.wrapper.appendChild(this.overlayCloseButton), e && this.async(e), this.bindedAsync = r.bindFnc(this, this.async), this.init())
        }
        var r = e("./Utils"),
        i = e("./Deferred"),
        s = e("./Resources"),
        o = e("./AsyncJs"),
        u = e("./AsyncCss"),
        a = e("./ParallelPromises"),
        f = e("./CookieJar"),
        l = e("./Ajax"),
        c = e("./Game"),
        h = e("./User"),
        p = e("./DOM"),
        d = window.console || {
            log: function() {},
            error: function() {},
            warn: function() {}
        };
        return v.states = {
            ERROR: -1,
            NONE: 0,
            API_CREATED: 1,
            WAITING_FOR_EX_SCRIPTS: 2,
            EX_SCRIPTS_LOADED: 3,
            WAITING_FOR_SESSION_ID: 4,
            SESSIONID_FETCHED: 5,
            WAITING_FOR_API_REMOTE: 6,
            API_REMOTE_INITTED: 7,
            READY: 8
        },
        v.prototype = {
            states: v.states,
            isReady: function() {
                return this.state === v.states.READY
            },
            hasErrorOccurred: function() {
                return this.state === v.states.ERROR
            },
            init: function() {
                if (!this.hasErrorOccurred()) {
                    var e, t = document.body || document.getElementsByTagName("body")[0];
                    t ? this.bodyCreateDeferred.resolve(t) : window.addEventListener("load", r.bindFnc(this,
                    function(e) {
                        var t = document.body || document.getElementsByTagName("body")[0];
                        this.bodyCreateDeferred.resolve(t)
                    }), !1);
                    for (e = 0; e < this.createdFncs.length; e += 1) this.createdDeferred.done(this.createdFncs[e]);
                    this.readyDeferred.done(r.bindFnc(this, this.onReadyDone)),
                    this.readyDeferred.fail(r.bindFnc(this, this.onReadyFail)),
                    this.addBodyCreateListener(r.bindFnc(this,
                    function(e) {
                        e.appendChild(this.overlay)
                    })),
                    this.initOverlayCssClasses(),
                    this.state = v.states.API_CREATED,
                    this.createdDeferred.resolve(this),
                    this.guiEnabled && this.includeCsses.push(this.createVersionedPath(s.cssPath, this.dev ? {
                        t: (new Date).getTime()
                    }: {
                        v: s.version
                    })),
                    window.JSON || this.includeJses.push(this.createVersionedPath(s.json2JsPath));
                    var n = [];
                    for (e = 0; e < this.includeCsses.length; e += 1) n.push(new u(this.includeCsses[e]));
                    for (e = 0; e < this.includeJses.length; e += 1) n.push(new o(this.includeJses[e]));
                    for (e = 0; e < n.length; e += 1) this.asyncInclude.addPromise(n[e]);
                    this.asyncInclude.done(r.bindFnc(this, this.onOtherScriptsLoaded)),
                    this.asyncInclude.done(r.bindFnc(this,
                    function() {
                        var e = this.initSessionIFrame();
                        e ? e.done(r.bindFnc(this, this.initRemote)) : this.readyDeferred.reject("init session iframe unsuccessful.", this)
                    })),
                    this.asyncInclude.fail(r.bindFnc(this, this.onOtherScriptsError)),
                    this.asyncInclude.fail(r.bindFnc(this,
                    function() {
                        this.readyDeferred.reject("not all async includes loaded correctly", this)
                    })),
                    this.state = v.states.WAITING_FOR_EX_SCRIPTS,
                    this.asyncInclude.start()
                }
            },
            initOverlayCssClasses: function() {
                r.addClass(this.overlay, r.isMobile.any() ? s.css.mobile: s.css.desktop)
            },
            initRemote: function() {
                if (!this.hasErrorOccurred()) if (this.game && this.game.id) {
                    this.state = v.states.WAITING_FOR_API_REMOTE;
                    var e = {};
                    this.currentSessionId && (e[s.sessionUrlParamName] = this.currentSessionId);
                    try {
                        var t = new l({
                            url: this.createVersionedPath(r.buildUrl([this.game.id, "init"])),
                            params: e,
                            success: r.bindFnc(this, this.initRemoteSuccess),
                            fail: r.bindFnc(this, this.initRemoteFail),
                            method: "post"
                        })
                    } catch(n) {}
                } else this.readyDeferred.reject("game ID not specified")
            },
            initRemoteSuccess: function(e, t) {
                this.hasErrorOccurred() || (this.state = v.states.API_REMOTE_INITTED, e.status === s.status.success ? (e.data.sessionId && (this.currentSessionId = e.data.sessionId), e.data.user && this.user.setUserInfo(e.data.user), e.data.game && (this.game.name = e.data.game.name, this.game.createLeaderboards(e.data.game.leaderboards)), this.readyDeferred.resolve(this)) : this.readyDeferred.reject("Error occurred during remote init (" + e.status + ")", this), f.setCookie(s.sessionCookieName, e.sessionId, s.sessionCookieTTL))
            },
            initRemoteFail: function(e, t) {
                this.hasErrorOccurred() || this.readyDeferred.reject(e, this)
            },
            initSessionIFrame: function() {
                if (!this.hasErrorOccurred()) {
                    this.state = v.states.WAITING_FOR_SESSION_ID;
                    var e = p.create("iframe"),
                    t = new i;
                    return window.addEventListener("message", r.bindFnc(this,
                    function(n) {
                        if (n && n.data) {
                            var r = null;
                            if (typeof n.data == "string") try {
                                r = JSON.parse(n.data)
                            } catch(i) {
                                this.trace("GMAPI: iframe session init JSON parse error: " + i.message),
                                r = null
                            } else typeof n.data == "object" && (r = n.data);
                            r && r.status === s.status.success && r.type === "iframeinit" ? t.resolve(r, e) : t.reject("GMAPI: invalid object received from iframe init.", e)
                        }
                    }), !1),
                    t.done(r.bindFnc(this, this.initSessionIFrameSuccess)),
                    t.fail(r.bindFnc(this, this.initSessionIFrameFail)),
                    e.src = this.createVersionedPath(s.iframeInitUrl),
                    e.onerror = function(n) {
                        t.reject("GMAPI: error loading iframe init.", e)
                    },
                    e.scrolling = "no",
                    e.style.width = "1px",
                    e.style.height = "1px",
                    e.style.borderStyle = "none",
                    e.style.overflow = "hidden",
                    e.style.position = "absolute",
                    e.style.left = "-1000px",
                    e.style.top = "0px",
                    this.addBodyCreateListener(function(t) {
                        t.appendChild(e)
                    }),
                    t.promise()
                }
                return null
            },
            initSessionIFrameSuccess: function(e, t) {
                this.hasErrorOccurred() || (this.state = v.states.SESSIONID_FETCHED, t.parentNode.removeChild(t), this.currentSessionId = e.sessionId)
            },
            initSessionIFrameFail: function(e, t) {
                this.hasErrorOccurred() || (t.parentNode.removeChild(t), this.readyDeferred.reject(e, this))
            },
            addBodyCreateListener: function(e) {
                this.bodyCreateDeferred.done(e)
            },
            echo: function(e) {
                var t = new l({
                    url: this.createPath("echo"),
                    params: {
                        t: encodeURIComponent(e)
                    },
                    method: "post"
                })
            },
            onReadyDone: function(e) {
                e.state = v.states.READY
            },
            onReadyFail: function(e, t) {
                t.shutDownEverything(e)
            },
            async: function(e) {
                if (e) if (typeof e == "string") this.state !== v.states.ERROR && (this.game = new c({
                    id: e,
                    api: this
                }));
                else if (typeof e == "function") this.readyDeferred.done(e);
                else if (r.isArray(e)) {
                    var t;
                    for (t = 0; t < e.length; t += 1) this.async(e[t])
                } else typeof e == "object" && (e.onCreated && this.createdDeferred.done(e.onCreated), e.onReady && this.readyDeferred.done(e.onReady), e.onReadyFail && this.readyDeferred.fail(e.onReadyFail), e.gameId && this.async(e.gameId), e.apiDomain && this.state !== v.states.ERROR && (this.apiDomain = e.apiDomain))
            },
            createPath: function(e, t) {
                return r.buildUrl([this.apiDomain, e], t)
            },
            createVersionedPath: function(e, t) {
                return r.buildUrl([this.apiDomain, this.versionPath, e], t)
            },
            onOtherScriptsLoaded: function() {
                this.hasErrorOccurred() || (this.state = v.states.EX_SCRIPTS_LOADED)
            },
            onOtherScriptsError: function() {
                this.hasErrorOccurred() || this.readyDeferred.reject("scripts failed to load.", this)
            },
            signInCallback: function(e) {
                this.hasErrorOccurred() || this.user.signInCallback(e)
            },
            checkMyself: function() {},
            addWindow: function(e, t, n) {
                this.hasErrorOccurred() || (this.inAppWindowMap[e] = {
                    element: t,
                    align: n || null
                },
                this.inAppWindowContainer.appendChild(t))
            },
            showOverlay: function(e) {
                this.hasErrorOccurred() || (this.closeAllWindows(e), e && this.inAppWindowMap[e] && (this.overlay.style.display = this.inAppWindowMap[e].align ? "block": "table", this.currentInAppWindow = e, this.processWindowAlign(this.inAppWindowMap[e].align), r.addClass(this.inAppWindowMap[e].element, s.css.show)))
            },
            hideOverlay: function(e) {
                if (!e || e.target === this.overlay || e.target === this.centerOverlay || e.target === this.overlayCloseButton) this.overlay.style.display = "none",
                this.closeAllWindows()
            },
            closeAllWindows: function(e) {
                var t, n = !1;
                e && this.inAppWindowMap[e] && this.inAppWindowMap[e].noCenter && (n = !0);
                for (t in this.inAppWindowMap) this.inAppWindowMap.hasOwnProperty(t) && t !== e && r.removeClass(this.inAppWindowMap[t].element, s.css.show);
                n || r.removeClass(this.centerOverlay, s.cssNoCenter),
                this.currentInAppWindow !== e && (this.currentInAppWindow = null)
            },
            getCssWindowAlign: function(e) {
                if (e) switch (e.toLowerCase()) {
                case "top":
                    return s.css.windowAlign.top;
                case "bottom":
                    return s.css.windowAlign.bottom
                }
                return null
            },
            processWindowAlign: function(e) {
                var t = this.getCssWindowAlign(e),
                n = !1,
                i;
                for (i in s.css.windowAlign) s.css.windowAlign.hasOwnProperty(i) && s.css.windowAlign[i] !== t && r.removeClass(this.overlay, s.css.windowAlign[i]);
                t && r.addClass(this.overlay, t)
            },
            shutDownEverything: function(e) {
                this.state = v.states.ERROR,
                this.user = null,
                this.game = null,
                this.trace("GMAPI: " + e)
            },
            trace: function(e) {
                this.initialUrlParams.hasOwnProperty("gmapiconsole") && d.warn(e)
            }
        },
        v
    }),
    function() {
        window.gmapiDotVersion = "0.3",
        t.config({
            baseUrl: "v1/src",
            urlArgs: "v=" + window.gmapiDotVersion
        }),
        t(["require", "Api"],
        function(e) {
            var t = e("Api"),
            n = window[window.GameMixAPIName],
            r = new t(n ? n.q: null),
            i = r.bindedAsync;
            i.instance = r,
            window[window.GameMixAPIName] = i
        })
    } (),
    n("../main",
    function() {})
})();