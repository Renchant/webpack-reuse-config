var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
}
    : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    ;
!function t(e, n, i) {
    function o(a, s) {
        if (!n[a]) {
            if (!e[a]) {
                var c = "function" == typeof require && require;
                if (!s && c)
                    return c(a, !0);
                if (r)
                    return r(a, !0);
                var l = new Error("Cannot find module '" + a + "'");
                throw l.code = "MODULE_NOT_FOUND",
                l
            }
            var u = n[a] = {
                exports: {}
            };
            e[a][0].call(u.exports, function (t) {
                var n = e[a][1][t];
                return o(n ? n : t)
            }, u, u.exports, t, e, n, i)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < i.length; a++)
        o(i[a]);
    return o
}({
    1: [function (t, e, n) {
        t("./util/preload"),
            t("../../../../unit/lib/lib-animate"),
            t("./util/getAllSkin");
        var i = t("./util/cache")
            , o = t("./util/util")
            , r = {
                debug: !0,
                events: {},
                _events: {},
                processing: !1,
                plugin_doms: {},
                plugin_info: {
                    author: "",
                    type: "unAuto",
                    intro: "",
                    state: "stage"
                },
                start: function (t, e) {
                    var n = this;
                    n.events = {},
                        n.processing = !1,
                        n.plugin_doms = $.extend({}, n.plugin_doms, t),
                        n.plugin_info = $.extend({}, n.plugin_info, e),
                        n.plugin_info.state = "stage",
                        n.plugin_doms.$plugin.css("z-index", 200),
                        n._watch(),
                        n._hander(),
                        n._pluginExp(),
                        this.log(window.pluginAct),
                        this.log(window.DB)
                },
                _init: function () {
                    var t = this;
                    i.setPv(),
                        $(document).ready(function () {
                            "preview" == t.getUrlParameter("login") && (window.DB.exposure.singleClk && window.DB.exposure.singleExp || alert("当前主会场存在曝光BUG，请联系开发更新"))
                        })
                },
                win2TopLeft: function () {
                    this.plugin_doms.$plugin.remove(),
                        window.scrollTo(0, 0)
                },
                _watch: function () {
                    var t = this;
                    t._on("win", function (e) {
                        t.plugin_info.state = "win"
                    }),
                        t._on("lose", function (e) {
                            t.plugin_info.state = "lose"
                        }),
                        t._on("close", function (e) {
                            t._closeExp()
                        }),
                        t._on("lucky", function (e) {
                            var n = e.lottery;
                            t.plugin_doms.$closeBtn.attr("db-click", n.st_info_dpm_btn_close),
                                t.plugin_doms.$couponText.html(n.title),
                                t.plugin_doms.$couponImg.html('<img src="' + n.imgurl + '">'),
                                t._couponExp(n),
                                t.plugin_doms.$couponBtn.on("click", function () {
                                    t._couponBtnClick(n)
                                }),
                                t.plugin_doms.$couponImg.on("click", function () {
                                    t._couponImgClick(n)
                                })
                        }),
                        t._on("physical", function (e) {
                            t.win2TopLeft(),
                                window.showObjectPrize({
                                    result: e,
                                    callback: {
                                        close: function () {
                                            t.trigger("close")
                                        }
                                    }
                                })
                        }),
                        t._on("alipay", function (e) {
                            t.win2TopLeft(),
                                window.showAlipayPrize({
                                    result: e,
                                    callback: {
                                        close: function () {
                                            t.trigger("close")
                                        }
                                    }
                                })
                        }),
                        t._on("qb", function (e) {
                            t.win2TopLeft(),
                                window.showQBPrize({
                                    result: e,
                                    callback: {
                                        close: function () {
                                            t.trigger("close")
                                        }
                                    }
                                })
                        }),
                        t._on("virtual", function (e) {
                            t.win2TopLeft(),
                                window.showVirtualPrize({
                                    result: e,
                                    callback: {
                                        close: function () {
                                            t.trigger("close")
                                        }
                                    }
                                })
                        })
                },
                _hander: function () {
                    var t = this
                        , e = t.plugin_doms.$closeBtn
                        , n = t.plugin_doms.$actBtn
                        , i = (t.plugin_doms.$couponBtn,
                            t.plugin_doms.$againBtn || null);
                    e && e.on("click", function () {
                        t.trigger("close")
                    }),
                        n && n.on("click", function () {
                            t.trigger("play"),
                                t._getOrder()
                        }),
                        i && i.on("click", function () {
                            t.trigger("again"),
                                t._getOrder()
                        })
                },
                autoPlay: function () {
                    this.plugin_info.type = "auto",
                        1 != this.getUrlParameter("steps") && this._getOrder()
                },
                _getOrder: function () {
                    var t = this;
                    if (!t.processing) {
                        t.processing = !0;
                        var e = window.Plugin_Act_CFG
                            , n = e.getOrder
                            , i = e.activityType
                            , r = e.activityId
                            , a = e.slotId;
                        o.ajax({
                            url: n,
                            type: "post",
                            data: {
                                activityType: i,
                                activityId: r,
                                slotId: a || void 0
                            },
                            success: function (e) {
                                e.success ? setTimeout(function () {
                                    t._getLottery(e.data.orderId)
                                }, 500) : t.trigger("lose")
                            },
                            error: function (e, n) {
                                t.trigger("lose")
                            }
                        })
                    }
                },
                _getLottery: function (t) {
                    var e = this
                        , n = window.Plugin_Act_CFG
                        , i = n.getLottery
                        , r = n.skinId;
                    i = e._lotterySimulator(i),
                        o.ajax({
                            url: i,
                            type: "post",
                            data: {
                                orderId: t,
                                skinId: r
                            },
                            success: function (n) {
                                if (n.success) {
                                    var i = n.data
                                        , o = i.status;
                                    i.lottery;
                                    "wait" === o ? setTimeout(function () {
                                        e._getLottery(t)
                                    }, 1e3) : "success" === o ? e._getLotterySuccess(n.data) : e.trigger("lose")
                                } else
                                    e.trigger("lose")
                            },
                            error: function (t, n) {
                                e.trigger("lose")
                            }
                        })
                },
                _lotterySimulator: function (t) {
                    var e = this.getUrlParameter("lottery");
                    if (e)
                        switch (e) {
                            case "alipay":
                                t = "/pluginTools/resultAlipay";
                                break;
                            case "object":
                                t = "/pluginTools/resultObjectPrize";
                                break;
                            case "qb":
                                t = "/pluginTools/resultQB";
                                break;
                            case "virtual":
                                t = "/pluginTools/resultVirtualPrize";
                                break;
                            case "lose":
                                t = "/pluginTools/resultLose"
                        }
                    return t
                },
                _getLotterySuccess: function (t) {
                    var e = this;
                    e.log(t),
                        e.trigger("win", t);
                    var n = t.lottery
                        , i = n.type;
                    switch (i) {
                        case "lucky":
                        case "coupon":
                            e.trigger("lucky", t);
                            break;
                        case "physical":
                            e.trigger("physical", t);
                            break;
                        case "alipay":
                            e.trigger("alipay", t);
                            break;
                        case "virtual":
                            e.trigger("virtual", t);
                            break;
                        case "qb":
                            e.trigger("qb", t);
                            break;
                        default:
                            e.trigger("lose", t)
                    }
                },
                _couponImgClick: function (t) {
                    var e = this
                        , n = t.st_info_dpm_img_click;
                    this.log("券图片点击: " + n);
                    var i = function () {
                        e.plugin_doms.$plugin.remove(),
                            window.location.href = t.iosDownloadUrl
                    };
                    this._singleClk(n, i)
                },
                _couponBtnClick: function (t) {
                    var e = this
                        , n = t.st_info_dpm_btn_get;
                    this.log("券按钮点击: " + n);
                    var i = function () {
                        e.plugin_doms.$plugin.remove(),
                            window.location.href = t.iosDownloadUrl
                    };
                    this._singleClk(n, i)
                },
                _pluginExp: function () {
                    var t = window.Plugin_Act_CFG.embedData;
                    this.log("插件曝光: " + t),
                        this._singleExp(t)
                },
                _couponExp: function (t) {
                    var e = t.st_info_dpm_img;
                    this.log("广告券曝光: " + e),
                        this._singleExp(e)
                },
                _closeExp: function () {
                    var t = this
                        , e = t.plugin_doms.$closeBtn
                        , n = e.attr("db-click") || window.Plugin_Act_CFG.closeClickEmbedData;
                    this.log("关闭按钮点击: " + n);
                    var i = function () {
                        t.plugin_doms.$plugin.hide()
                    };
                    t._singleClk(n, i)
                },
                _singleExp: function (t) {
                    window.DB && window.DB.exposure && window.DB.exposure.singleExp(t)
                },
                _singleClk: function (t, e) {
                    t ? window.DB && window.DB.exposure && window.DB.exposure.singleClk({
                        data: t,
                        callback: e
                    }) : e()
                },
                _on: function (t, e) {
                    return (this._events[t] = this._events[t] || []).push(e),
                        this
                },
                on: function (t, e) {
                    return (this.events[t] = this.events[t] || []).push(e),
                        this
                },
                trigger: function (t) {
                    for (var e = this._events[t] || [], n = 0, i = e.length; n < i; n++)
                        e[n].apply(null, [].slice.call(arguments, 1));
                    for (var o = this.events[t] || [], r = 0, a = o.length; r < a; r++)
                        o[r].apply(null, [].slice.call(arguments, 1));
                    return this
                },
                log: function (t) {
                    this.debug && console.log(t)
                },
                getUrlParameter: function (t) {
                    var e = decodeURIComponent((new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(window.location.href) || [void 0, ""])[1].replace(/\+/g, "%20")) || null;
                    return e ? e.split("/")[0] : e
                },
                getPv: function () {
                    return i.getPv()
                }
            };
        window.pluginAct = r,
            r._init()
    }
        , {
        "../../../../unit/lib/lib-animate": 6,
        "./util/cache": 2,
        "./util/getAllSkin": 3,
        "./util/preload": 4,
        "./util/util": 5
    }],
    2: [function (t, e, n) {
        var i = {
            getCache: function (t) {
                return localStorage ? JSON.parse(localStorage.getItem(t)) : ""
            },
            setCache: function (t, e) {
                localStorage && localStorage.setItem(t, JSON.stringify(e))
            },
            getURLParameter: function (t) {
                var e = decodeURIComponent((new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(window.location.href) || [void 0, ""])[1].replace(/\+/g, "%20")) || null;
                return e ? e.split("/")[0] : e
            },
            getToday: function () {
                var t = new Date;
                return t.getMonth() + 1 + "-" + t.getDate()
            },
            getTodayFull: function () {
                var t = new Date;
                return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()
            },
            getHours: function () {
                return (new Date).getHours()
            },
            getPageType: function () {
                var t = window.location.pathname;
                switch (t) {
                    case "/mainMeet/index":
                        return "Ta-mainMeet";
                    case "/actCenter/index":
                        return "Ta-actCenter";
                    case "/direct/index":
                        return "Ta-direct";
                    case "/activity/index":
                        return "Ta-activity";
                    case "/activity/indexRecord":
                        return "Ta-record";
                    default:
                        return "Ta-preview"
                }
            },
            getKey: function () {
                var t = parseInt(this.getURLParameter("id") || 0)
                    , e = this.getPageType();
                return e + "-" + t
            },
            setPv: function () {
                var t = this.getKey()
                    , e = this.getHours()
                    , n = this.getCache(t);
                n && n.today === this.getTodayFull() || (n = {
                    today: this.getTodayFull()
                },
                    n.countArray = []);
                for (var i = n.countArray, o = !1, r = 0, a = i.length; r < a; r++) {
                    var s = i[r];
                    void 0 != s[e] && (o = !0,
                        i[r][e] = i[r][e] + 1)
                }
                if (!o) {
                    var c = {};
                    c[e] = 1,
                        i.push(c)
                }
                n.countArray = i,
                    this.setCache(t, n)
            },
            getPv: function () {
                var t = this.getKey()
                    , e = this.getCache(t);
                e || (e = {
                    today: this.getTodayFull()
                },
                    e.countArray = []);
                var n = e.countArray;
                return n.map(function (t) {
                    var e = {};
                    for (var n in t)
                        e.hour = n,
                            e.count = t[n];
                    return e
                })
            }
        };
        e.exports = i
    }
        , {}],
    3: [function (t, e, n) {
        var i = {
            ajax: function (t) {
                var e = {
                    data: {
                        timestamp: (new Date).getTime()
                    },
                    dataType: "json",
                    success: function () { },
                    error: function (t, e) {
                        "timeout" === e ? (t && t.abort(),
                            console.error("请求超时")) : console.error("网络错误")
                    }
                };
                t = $.extend(!0, e, t),
                    $.ajax(t)
            },
            setId: function (t) {
                switch (t.skinType) {
                    case 1:
                        window.dingeAlipay = t.id;
                        break;
                    case 2:
                        window.randomAlipay = t.id;
                        break;
                    case 3:
                        window.thanksId = t.id;
                        break;
                    case 4:
                        window.couponId = t.id;
                        break;
                    case 5:
                        window.recommendId = t.id;
                        break;
                    case 6:
                        window.objectId = t.id;
                        break;
                    case 7:
                        window.virtualId = t.id;
                        break;
                    case 8:
                        window.dingeQB = t.id;
                        break;
                    case 9:
                        window.randomQB = t.id
                }
            }
        };
        n.init = function () {
            if (!(window.CFG && window.CFG.couponSkinId || $(".modal-group").size())) {
                var t = "/activity/getAllSkin"
                    , e = window.location.pathname;
                "/pluginAct/index.html" == e && (t = "/pluginAct/getAllSkin"),
                    i.ajax({
                        url: t,
                        type: "get",
                        data: {},
                        success: function (t) {
                            if (t.success) {
                                var e = t.data;
                                $("body").append('<div class="modal-group"></div>'),
                                    e && e.forEach(function (t) {
                                        i.setId(t),
                                            t && t.code && $(".modal-group").append(t.code)
                                    })
                            } else
                                console.error("请求弹层数据出错", t.desc)
                        },
                        error: function () {
                            console.error("请求弹层网络出错");
                            var t = '<link rel="stylesheet" href="//yun.tuisnake.com/h5-mami/alipayModal/index_201708211647.css">\n<script type="text/javascript">\nvar oHead = document.querySelector(\'body\');\nvar oScript = document.createElement(\'script\');\noScript.type = "text/javascript";\noScript.src = "//yun.tuisnake.com/h5-mami/alipayModal/index_201708211647.js";\noHead.appendChild(oScript);\n</script>"';
                            $(".modal-group").append(t)
                        }
                    })
            }
        }
            ,
            n.init()
    }
        , {}],
    4: [function (t, e, n) {
        !function () {
            function t(t, e, n) {
                e = new Image,
                    n && "function" == typeof "".ossimg && (t = t.ossimg()),
                    e.src = t,
                    e.onload = e.onerror = function () {
                        e.onload = e.onerror = null,
                            e = null
                    }
            }
            var e = function (e) {
                var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if ("string" == typeof e) {
                    var i;
                    t(e, i, n)
                } else {
                    var o = new Array;
                    e.forEach(function (e, i) {
                        t(e, o[i], n)
                    })
                }
            };
            window.preload = e
        }(Zepto)
    }
        , {}],
    5: [function (t, e, n) {
        var i = {
            ajax: function (t) {
                var e = {
                    data: {
                        timestamp: (new Date).getTime()
                    },
                    dataType: "json",
                    success: function () { },
                    error: function (t, e) {
                        "timeout" === e ? (t && t.abort(),
                            console.error("请求超时")) : console.error("网络错误")
                    }
                };
                t = $.extend(!0, e, t),
                    $.ajax(t)
            }
        };
        e.exports = i
    }
        , {}],
    6: [function (t, e, n) {
        var i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
            : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
            }
            ;
        !function (t) {
            function e(t) {
                return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
            }
            function n(t) {
                return o ? o + t : t.toLowerCase()
            }
            var o, r, a, s, c, l, u, d, p, g, f = "", y = {
                Webkit: "webkit",
                Moz: "",
                O: "o"
            }, m = document.createElement("div"), h = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, w = {};
            t.each(y, function (t, e) {
                if (void 0 !== m.style[t + "TransitionProperty"])
                    return f = "-" + t.toLowerCase() + "-",
                        o = e,
                        !1
            }),
                r = f + "transform",
                w[a = f + "transition-property"] = w[s = f + "transition-duration"] = w[l = f + "transition-delay"] = w[c = f + "transition-timing-function"] = w[u = f + "animation-name"] = w[d = f + "animation-duration"] = w[g = f + "animation-delay"] = w[p = f + "animation-timing-function"] = "",
                t.fx = {
                    off: void 0 === o && void 0 === m.style.transitionProperty,
                    speeds: {
                        _default: 400,
                        fast: 200,
                        slow: 600
                    },
                    cssPrefix: f,
                    transitionEnd: n("TransitionEnd"),
                    animationEnd: n("AnimationEnd")
                },
                t.fn.animate = function (e, n, i, o, r) {
                    return t.isFunction(n) && (o = n,
                        i = void 0,
                        n = void 0),
                        t.isFunction(i) && (o = i,
                            i = void 0),
                        t.isPlainObject(n) && (i = n.easing,
                            o = n.complete,
                            r = n.delay,
                            n = n.duration),
                        n && (n = ("number" == typeof n ? n : t.fx.speeds[n] || t.fx.speeds._default) / 1e3),
                        r && (r = parseFloat(r) / 1e3),
                        this.anim(e, n, i, o, r)
                }
                ,
                t.fn.anim = function (n, o, f, y, m) {
                    var v, _, b, k = {}, x = "", T = this, C = t.fx.transitionEnd, $ = !1;
                    if (void 0 === o && (o = t.fx.speeds._default / 1e3),
                        void 0 === m && (m = 0),
                        t.fx.off && (o = 0),
                        "string" == typeof n)
                        k[u] = n,
                            k[d] = o + "s",
                            k[g] = m + "s",
                            k[p] = f || "linear",
                            C = t.fx.animationEnd;
                    else {
                        _ = [];
                        for (v in n)
                            h.test(v) ? x += v + "(" + n[v] + ") " : (k[v] = n[v],
                                _.push(e(v)));
                        x && (k[r] = x,
                            _.push(r)),
                            o > 0 && "object" === ("undefined" == typeof n ? "undefined" : i(n)) && (k[a] = _.join(", "),
                                k[s] = o + "s",
                                k[l] = m + "s",
                                k[c] = f || "linear")
                    }
                    return b = function (e) {
                        if ("undefined" != typeof e) {
                            if (e.target !== e.currentTarget)
                                return;
                            t(e.target).unbind(C, b)
                        } else
                            t(this).unbind(C, b);
                        $ = !0,
                            !t(this).attr("stop") && t(this).css(w),
                            y && y.call(this)
                    }
                        ,
                        o > 0 && (this.bind(C, b),
                            setTimeout(function () {
                                $ || b.call(T)
                            }, 1e3 * (o + m) + 25)),
                        this.size() && this.get(0).clientLeft,
                        this.css(k),
                        o <= 0 && setTimeout(function () {
                            T.each(function () {
                                b.call(this)
                            })
                        }, 0),
                        this
                }
                ,
                m = null
        }(Zepto)
    }
        , {}]
}, {}, [1]);
