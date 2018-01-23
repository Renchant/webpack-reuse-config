var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
}
: function(t) {
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
                var u = new Error("Cannot find module '" + a + "'");
                throw u.code = "MODULE_NOT_FOUND",
                u
            }
            var l = n[a] = {
                exports: {}
            };
            e[a][0].call(l.exports, function(t) {
                var n = e[a][1][t];
                return o(n ? n : t)
            }, l, l.exports, t, e, n, i)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < i.length; a++)
        o(i[a]);
    return o
}({
    1: [function(t, e, n) {
        !function(t) {
            var e = function(e) {
                var n = {
                    styles: {},
                    clickCallback: function() {}
                };
                this.options = t.extend(!0, n, e),
                this.init()
            };
            e.prototype.init = function() {
                var e = '<div class="DB_guide"><span class="DB_G_circle"></span><span class="DB_G_hand"></span></div>';
                this.$guide = t(e).appendTo("#db-content"),
                this.$guide.css(this.options.styles),
                this.events(),
                this.show()
            }
            ,
            e.prototype.events = function() {}
            ,
            e.prototype.show = function() {
                this.$guide.show()
            }
            ,
            e.prototype.hide = function() {
                this.$guide.hide()
            }
            ,
            window.Guide = e
        }(Zepto)
    }
    , {}],
    2: [function(t, e, n) {
        (function(t) {
            !function(t) {
                function e(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }
                function i() {
                    for (var t = 0; t < T.length; t++)
                        T[t][0](T[t][1]);
                    T = [],
                    g = !1
                }
                function o(t, e) {
                    T.push([t, e]),
                    g || (g = !0,
                    x(i, 0))
                }
                function r(t, e) {
                    function n(t) {
                        c(e, t)
                    }
                    function i(t) {
                        l(e, t)
                    }
                    try {
                        t(n, i)
                    } catch (o) {
                        i(o)
                    }
                }
                function a(t) {
                    var e = t.owner
                      , n = e.state_
                      , i = e.data_
                      , o = t[n]
                      , r = t.then;
                    if ("function" == typeof o) {
                        n = b;
                        try {
                            i = o(i)
                        } catch (a) {
                            l(r, a)
                        }
                    }
                    s(r, i) || (n === b && c(r, i),
                    n === C && l(r, i))
                }
                function s(t, e) {
                    var n;
                    try {
                        if (t === e)
                            throw new TypeError("A promises callback cannot return that same promise.");
                        if (e && ("function" == typeof e || "object" === ("undefined" == typeof e ? "undefined" : _typeof2(e)))) {
                            var i = e.then;
                            if ("function" == typeof i)
                                return i.call(e, function(i) {
                                    n || (n = !0,
                                    e !== i ? c(t, i) : u(t, i))
                                }, function(e) {
                                    n || (n = !0,
                                    l(t, e))
                                }),
                                !0
                        }
                    } catch (o) {
                        return n || l(t, o),
                        !0
                    }
                    return !1
                }
                function c(t, e) {
                    t !== e && s(t, e) || u(t, e)
                }
                function u(t, e) {
                    t.state_ === y && (t.state_ = w,
                    t.data_ = e,
                    o(d, t))
                }
                function l(t, e) {
                    t.state_ === y && (t.state_ = w,
                    t.data_ = e,
                    o(p, t))
                }
                function f(t) {
                    var e = t.then_;
                    t.then_ = void 0;
                    for (var n = 0; n < e.length; n++)
                        a(e[n])
                }
                function d(t) {
                    t.state_ = b,
                    f(t)
                }
                function p(t) {
                    t.state_ = C,
                    f(t)
                }
                function h(t) {
                    if ("function" != typeof t)
                        throw new TypeError("Promise constructor takes a function argument");
                    if (this instanceof h == !1)
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    this.then_ = [],
                    r(t, this)
                }
                var m = t.Promise
                  , v = m && "resolve"in m && "reject"in m && "all"in m && "race"in m && function() {
                    var t;
                    return new m(function(e) {
                        t = e
                    }
                    ),
                    "function" == typeof t
                }();
                "undefined" != typeof n && n ? (n.Promise = v ? m : h,
                n.Polyfill = h) : "function" == typeof define && define.amd ? define(function() {
                    return v ? m : h
                }) : v || (t.Promise = h);
                var g, y = "pending", w = "sealed", b = "fulfilled", C = "rejected", k = function() {}, x = "undefined" != typeof setImmediate ? setImmediate : setTimeout, T = [];
                h.prototype = {
                    constructor: h,
                    state_: y,
                    then_: null,
                    data_: void 0,
                    then: function(t, e) {
                        var n = {
                            owner: this,
                            then: new this.constructor(k),
                            fulfilled: t,
                            rejected: e
                        };
                        return this.state_ === b || this.state_ === C ? o(a, n) : this.then_.push(n),
                        n.then
                    },
                    "catch": function(t) {
                        return this.then(null, t)
                    }
                },
                h.all = function(t) {
                    var n = this;
                    if (!e(t))
                        throw new TypeError("You must pass an array to Promise.all().");
                    return new n(function(e, n) {
                        function i(t) {
                            return a++,
                            function(n) {
                                r[t] = n,
                                --a || e(r)
                            }
                        }
                        for (var o, r = [], a = 0, s = 0; s < t.length; s++)
                            o = t[s],
                            o && "function" == typeof o.then ? o.then(i(s), n) : r[s] = o;
                        a || e(r)
                    }
                    )
                }
                ,
                h.race = function(t) {
                    var n = this;
                    if (!e(t))
                        throw new TypeError("You must pass an array to Promise.race().");
                    return new n(function(e, n) {
                        for (var i, o = 0; o < t.length; o++)
                            i = t[o],
                            i && "function" == typeof i.then ? i.then(e, n) : e(i)
                    }
                    )
                }
                ,
                h.resolve = function(t) {
                    var e = this;
                    return t && "object" === ("undefined" == typeof t ? "undefined" : _typeof2(t)) && t.constructor === e ? t : new e(function(e) {
                        e(t)
                    }
                    )
                }
                ,
                h.reject = function(t) {
                    var e = this;
                    return new e(function(e, n) {
                        n(t)
                    }
                    )
                }
            }("undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof self ? self : this)
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    3: [function(t, e, n) {
        t("../../../../unit/lib/lib-zepto/1.0.0/zepto.min"),
        t("../../../../unit/lib/lib-loader"),
        t("../../../../unit/common/js/checkoutWebp"),
        t("../../../../unit/common/js/showModal"),
        t("../../../../unit/common/js/statistics/statistics-3.js"),
        t("../components/requireStyle/requireStyle-2"),
        t("./public"),
        t("../../pluginBase/responsive/index.js"),
        t("../../pluginBase/timing/index.js"),
        t("../components/requirePlugin"),
        window.Promise = t("es6-promise-polyfill").Promise,
        window.FastClick = t("../../../../unit/lib/lib-fastclick/1.0.0/fastclick"),
        t("../components/prizesRender"),
        t("../../../../module/guide/guide")
    }
    , {
        "../../../../module/guide/guide": 1,
        "../../../../unit/common/js/checkoutWebp": 15,
        "../../../../unit/common/js/showModal": 16,
        "../../../../unit/common/js/statistics/statistics-3.js": 17,
        "../../../../unit/lib/lib-fastclick/1.0.0/fastclick": 18,
        "../../../../unit/lib/lib-loader": 19,
        "../../../../unit/lib/lib-zepto/1.0.0/zepto.min": 20,
        "../../pluginBase/responsive/index.js": 12,
        "../../pluginBase/timing/index.js": 14,
        "../components/prizesRender": 6,
        "../components/requirePlugin": 7,
        "../components/requireStyle/requireStyle-2": 8,
        "./public": 4,
        "es6-promise-polyfill": 2
    }],
    4: [function(t, e, n) {
        !function(e) {
            var n = t("./util.js")
              , i = {
                Ajax: function(t) {
                    var n = {
                        url: "",
                        type: "post",
                        dataType: "json",
                        data: {},
                        success: function() {},
                        error: function() {}
                    };
                    return t = e.extend(!0, n, t),
                    e.ajax(t)
                },
                getActivityStyle: function(t) {
                    var e = this;
                    return window.dbStyleConfigStart = +new Date,
                    new Promise(function(n, i) {
                        var o = {
                            url: "/activity/getSkinConfig",
                            data: {
                                activityId: CFG.activityId,
                                templateType: CFG.activityType,
                                timestamp: +new Date
                            }
                        };
                        o.success = function(o) {
                            o.success ? (n(),
                            window.dbStyleConfigEnd = +new Date,
                            t.styleCb && t.styleCb(o)) : (i(),
                            e.showModal("systemError", {
                                message: o.desc
                            }))
                        }
                        ,
                        o.error = function(t) {
                            i(),
                            e.showModal("systemError", {
                                message: t.desc
                            })
                        }
                        ,
                        // e.Ajax(o)
                        o.success({
                            "code": "0000000",
                            "desc": "成功",
                            "data": {
                                "skinConfig": [
                                    {
                                        "title": "展示页面",
                                        "name": "elements",
                                        "childrens": [
                                            {
                                                "title": "背景图",
                                                "name": "bgImage",
                                                "type": "image",
                                                "size": {
                                                    "width": 750,
                                                    "height": 1126
                                                },
                                                "value": "//yun.tuiapple.com/mami-media/img/2l1ppg4mmg.jpg",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/bgImage.psd"
                                            },
                                            {
                                                "title": "我的奖品",
                                                "name": "record",
                                                "type": "image",
                                                "size": {
                                                    "width": 114,
                                                    "height": 119
                                                },
                                                "value": "//yun.tuiapple.com/mami-media/img/dniejp7ug7.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/record.psd"
                                            },
                                            {
                                                "title": "规则",
                                                "name": "rule",
                                                "type": "image",
                                                "size": {
                                                    "width": 114,
                                                    "height": 121
                                                },
                                                "value": "//yun.tuiapple.com/mami-media/img/7pg4wfv0kp.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/rule.psd"
                                            },
                                            {
                                                "title": "奖品详情",
                                                "name": "prizeDetail",
                                                "type": "image",
                                                "size": {
                                                    "width": 112,
                                                    "height": 127
                                                },
                                                "value": "//yun.tuiapple.com/mami-media/img/igyp40ouor.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/prizesBtn.png"
                                            },
                                            {
                                                "title": "背景色",
                                                "name": "bgColor",
                                                "type": "color",
                                                "value": "#ff907c"
                                            },
                                            {
                                                "title": "免费次数文字颜色",
                                                "name": "needCreditsColor",
                                                "type": "color",
                                                "value": "#d25138"
                                            },
                                            {
                                                "title": "免责声明文字颜色",
                                                "name": "appleTextColor",
                                                "type": "color",
                                                "value": "#fff"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "文字区域",
                                        "name": "textInfo",
                                        "childrens": [
                                            {
                                                "title": "活动说明文案",
                                                "name": "ruleText",
                                                "type": "text",
                                                "value": "<p>发财红包到，开运挡不住~</p><p>活动说明：参与活动即有机会获得幸运奖~每天限参与8次，8次机会免费。此活动为概率中奖，奖品数量有限，祝好运！</p><p>惊喜一：300元红包</p><p>惊喜二：100元红包</p><p>惊喜三：88元红包</p><p>惊喜四：随机红包</p><p>惊喜五：幸运福袋</p><p>－－－－－－－－－－－－－－－－</p>",
                                                "require": true
                                            },
                                            {
                                                "title": "更多概率说明文案",
                                                "name": "probabilityText",
                                                "type": "text",
                                                "value": "<p>惊喜一：300元惊喜红包，共1份，中奖概率为0.0002%<span style=\"color: rgb(51, 51, 51); font-size: 16px;\">，该奖项每人每天限领取一次</span></p><p>惊喜二：100元惊喜红包，共1份，中奖概率为0.0008%<span style=\"color: rgb(51, 51, 51); font-size: 16px;\">，该奖项每人每天限领取一次</span></p><p>惊喜三：88元惊喜红包，共5份，中奖概率为0.005%<span style=\"color: rgb(51, 51, 51); font-size: 16px;\">，该奖项每人每天限领取一次</span></p><p>惊喜四：随机惊喜红包，共5000份，中奖概率为0.1%<span style=\"color: rgb(51, 51, 51); font-size: 16px;\">，该奖项每人每天限领取一次</span></p>"
                                            },
                                            {
                                                "title": "活动说明背景色",
                                                "name": "ruleBgColor",
                                                "type": "color",
                                                "value": "#ff9400"
                                            },
                                            {
                                                "title": "活动说明字体颜色",
                                                "name": "ruleTextColor",
                                                "type": "color",
                                                "value": "#fff"
                                            },
                                            {
                                                "title": "更多概率说明颜色",
                                                "name": "probabilityColor",
                                                "type": "color",
                                                "value": "#fff"
                                            },
                                            {
                                                "title": "更多概率背景色",
                                                "name": "probabilityBg",
                                                "type": "color",
                                                "value": "#ff9400"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "活动区域",
                                        "name": "core",
                                        "childrens": [
                                            {
                                                "title": "套娃",
                                                "name": "doll",
                                                "type": "image",
                                                "size": {
                                                    "width": 207,
                                                    "height": 295
                                                },
                                                "value": "//yun.tuiapple.com/mami-media/img/zqm15s5ziu.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/doll.psd"
                                            },
                                            {
                                                "title": "箭头",
                                                "name": "arrow",
                                                "type": "image",
                                                "size": {
                                                    "width": 52,
                                                    "height": 78
                                                },
                                                "value": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/arrow.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/arrow.psd"
                                            },
                                            {
                                                "title": "手",
                                                "name": "finger",
                                                "type": "image",
                                                "size": {
                                                    "width": 97,
                                                    "height": 79
                                                },
                                                "value": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/finger.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/finger.psd"
                                            },
                                            {
                                                "title": "气球",
                                                "name": "balloon",
                                                "type": "image",
                                                "size": {
                                                    "width": 72,
                                                    "height": 100
                                                },
                                                "value": "//yun.tuiapple.com/mami-media/img/079javubpd.png",
                                                "psd": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/balloon.psd"
                                            },
                                            {
                                                "title": "套环上半部分",
                                                "name": "circleTop",
                                                "type": "image",
                                                "size": {
                                                    "width": 331,
                                                    "height": 78
                                                },
                                                "value": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/circle_top.png",
                                                "psd": "//yun.tuisnake.com/h5-mami/activity/setDoll/1.0/psd/circle.psd"
                                            },
                                            {
                                                "title": "套环下半部分",
                                                "name": "circleBottom",
                                                "type": "image",
                                                "size": {
                                                    "width": 331,
                                                    "height": 78
                                                },
                                                "value": "//yun.tuisnake.com/h5/activity/setDoll/1.0/assets/circle_bottom.png",
                                                "psd": "//yun.tuisnake.com/h5-mami/activity/setDoll/1.0/psd/circle.psd"
                                            }
                                        ]
                                    }
                                ],
                                "isNew": false,
                                "contaction": "<p>重要声明</p><p>1、实物类奖品将在活动结束后5-10个工作日安排发货，请耐心等待</p><p>2、优惠券类奖品的使用规则详见每个优惠券的介绍页</p><p>3、请兑换后仔细阅读使用流程，如有疑问，可直接联系客服专线：400-080-6659（工作日9:00至18:00）</p><p>4、通过非法途径获得奖品的，主办方有权不提供奖品</p>"
                            },
                            "success": true
                        })
                    }
                    )
                },
                getActivityOptions: function(t) {
                    var e = this;
                    return new Promise(function(n, i) {
                        var o = {
                            url: "/activity/ajaxOptions",
                            data: {
                                activityId: CFG.activityId,
                                slotId: CFG.slotId,
                                timestamp: +new Date
                            }
                        };
                        o.success = function(o) {
                            o.success ? (n(),
                            o.data && o.data.embedData && (window.embedData = o.data.embedData),
                            window.isOpenPrizeInfo = o.data.isOpenPrizeInfo,
                            t.optionCb && t.optionCb(o)) : (i(),
                            e.showModal("systemError", {
                                message: o.desc
                            }))
                        }
                        ,
                        o.error = function(t) {
                            i(),
                            e.showModal("systemError", {
                                message: t.desc
                            })
                        }
                        ,
                        // e.Ajax(o)
                        o.success({
                            "code": "0000000",
                            "desc": "成功",
                            "data": {
                                "limitType": 1,
                                "limitTimes": 8,
                                "options": [
                                    {
                                        "id": 35422,
                                        "activityId": 5346,
                                        "activityType": 14,
                                        "advertId": null,
                                        "gid": null,
                                        "gtype": null,
                                        "prizeType": "thanks",
                                        "title": "谢谢参与",
                                        "stockId": null,
                                        "stock": null,
                                        "stockChange": null,
                                        "rate": null,
                                        "isDeleted": false,
                                        "prizeId": null,
                                        "alipayType": null,
                                        "minAmount": null,
                                        "maxAmount": null,
                                        "dailyBudget": null,
                                        "guaranteedCount": null,
                                        "awardLimit": null,
                                        "randomType": null,
                                        "prizeScoreType": null,
                                        "prize": null,
                                        "image": "//yun.tuiapple.com/mami-media/img/t9ktdna81a.png",
                                        "detailImg": null,
                                        "description": "",
                                        "detailDesc": null,
                                        "payload": 0,
                                        "hidden": 0,
                                        "guaranteedNum": null,
                                        "dayLimitNum": null,
                                        "empty": false
                                    },
                                    {
                                        "id": 35423,
                                        "activityId": 5346,
                                        "activityType": 14,
                                        "advertId": null,
                                        "gid": null,
                                        "gtype": null,
                                        "prizeType": "alipay",
                                        "title": "300元红包",
                                        "stockId": 545419600320370000,
                                        "stock": null,
                                        "stockChange": null,
                                        "rate": "0.0002",
                                        "isDeleted": false,
                                        "prizeId": 637,
                                        "alipayType": 1,
                                        "minAmount": 30000,
                                        "maxAmount": 30000,
                                        "dailyBudget": 0,
                                        "guaranteedCount": 0,
                                        "awardLimit": 1,
                                        "randomType": null,
                                        "prizeScoreType": null,
                                        "prize": null,
                                        "image": "//yun.tuiapple.com/mami-media/img/nb2xwro2zt.png",
                                        "detailImg": null,
                                        "description": "",
                                        "detailDesc": null,
                                        "payload": 1,
                                        "hidden": 0,
                                        "guaranteedNum": null,
                                        "dayLimitNum": null,
                                        "empty": false
                                    },
                                    {
                                        "id": 35424,
                                        "activityId": 5346,
                                        "activityType": 14,
                                        "advertId": null,
                                        "gid": null,
                                        "gtype": null,
                                        "prizeType": "alipay",
                                        "title": "100元红包",
                                        "stockId": 545419600279420000,
                                        "stock": null,
                                        "stockChange": null,
                                        "rate": "0.0008",
                                        "isDeleted": false,
                                        "prizeId": 637,
                                        "alipayType": 1,
                                        "minAmount": 10000,
                                        "maxAmount": 10000,
                                        "dailyBudget": 0,
                                        "guaranteedCount": 0,
                                        "awardLimit": 1,
                                        "randomType": null,
                                        "prizeScoreType": null,
                                        "prize": null,
                                        "image": "//yun.tuiapple.com/mami-media/img/386sktxqk5.png",
                                        "detailImg": null,
                                        "description": "",
                                        "detailDesc": null,
                                        "payload": 2,
                                        "hidden": 0,
                                        "guaranteedNum": null,
                                        "dayLimitNum": null,
                                        "empty": false
                                    },
                                    {
                                        "id": 35425,
                                        "activityId": 5346,
                                        "activityType": 14,
                                        "advertId": null,
                                        "gid": null,
                                        "gtype": null,
                                        "prizeType": "alipay",
                                        "title": "88元红包",
                                        "stockId": 545419600279430000,
                                        "stock": null,
                                        "stockChange": null,
                                        "rate": "0.005",
                                        "isDeleted": false,
                                        "prizeId": 637,
                                        "alipayType": 1,
                                        "minAmount": 8800,
                                        "maxAmount": 8800,
                                        "dailyBudget": 0,
                                        "guaranteedCount": 0,
                                        "awardLimit": 1,
                                        "randomType": null,
                                        "prizeScoreType": null,
                                        "prize": null,
                                        "image": "//yun.tuiapple.com/mami-media/img/fqfh4m7q4m.png",
                                        "detailImg": null,
                                        "description": "",
                                        "detailDesc": null,
                                        "payload": 3,
                                        "hidden": 0,
                                        "guaranteedNum": null,
                                        "dayLimitNum": null,
                                        "empty": false
                                    },
                                    {
                                        "id": 35426,
                                        "activityId": 5346,
                                        "activityType": 14,
                                        "advertId": null,
                                        "gid": null,
                                        "gtype": null,
                                        "prizeType": "alipay",
                                        "title": "随机红包",
                                        "stockId": 545419600320380000,
                                        "stock": null,
                                        "stockChange": null,
                                        "rate": "0.1",
                                        "isDeleted": false,
                                        "prizeId": 637,
                                        "alipayType": 2,
                                        "minAmount": 10,
                                        "maxAmount": 100,
                                        "dailyBudget": 0,
                                        "guaranteedCount": 0,
                                        "awardLimit": 1,
                                        "randomType": null,
                                        "prizeScoreType": null,
                                        "prize": null,
                                        "image": "//yun.tuiapple.com/mami-media/img/ezxqersvd8.png",
                                        "detailImg": null,
                                        "description": "",
                                        "detailDesc": null,
                                        "payload": 4,
                                        "hidden": 0,
                                        "guaranteedNum": null,
                                        "dayLimitNum": null,
                                        "empty": false
                                    },
                                    {
                                        "id": 35427,
                                        "activityId": 5346,
                                        "activityType": 14,
                                        "advertId": null,
                                        "gid": null,
                                        "gtype": null,
                                        "prizeType": "lucky",
                                        "title": "幸运福袋",
                                        "stockId": null,
                                        "stock": null,
                                        "stockChange": null,
                                        "rate": null,
                                        "isDeleted": false,
                                        "prizeId": null,
                                        "alipayType": null,
                                        "minAmount": null,
                                        "maxAmount": null,
                                        "dailyBudget": null,
                                        "guaranteedCount": null,
                                        "awardLimit": null,
                                        "randomType": null,
                                        "prizeScoreType": null,
                                        "prize": null,
                                        "image": "//yun.tuiapple.com/mami-media/img/uzm00y18d2.png",
                                        "detailImg": null,
                                        "description": "",
                                        "detailDesc": null,
                                        "payload": 5,
                                        "hidden": 0,
                                        "guaranteedNum": null,
                                        "dayLimitNum": null,
                                        "empty": false
                                    }
                                ],
                                "embedData": {
                                    "st_info_rule_click": "{\"dpm\":\"41394.3.7.0\",\"consumer_id\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"app_id\":41394,\"url\":\"/statistics/click\",\"dcm\":\"1014.0.14.5346\"}",
                                    "st_info_rule_less_click": "{\"dpm\":\"41394.56.1.3\",\"consumer_id\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"app_id\":41394,\"url\":\"/statistics/click\",\"dcm\":\"1014.0.14.5346\"}",
                                    "st_info_rule_more_click": "{\"dpm\":\"41394.56.1.2\",\"consumer_id\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"app_id\":41394,\"url\":\"/statistics/click\",\"dcm\":\"1014.0.14.5346\"}",
                                    "st_info_rule_close_click": "{\"dpm\":\"41394.56.1.1\",\"consumer_id\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"app_id\":41394,\"url\":\"/statistics/click\",\"dcm\":\"1014.0.14.5346\"}",
                                    "st_info_options_click": "{\"dpm\":\"41394.3.2.0\",\"consumer_id\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"app_id\":41394,\"url\":\"/statistics/click\",\"dcm\":\"1010.0.0.0\"}",
                                    "st_info_rule_exposure": "{\"dpm\":\"41394.56.1.0\",\"consumer_id\":3574849111,\"domainWeb\":\"//activity.tuiapple.com\",\"domain\":\"//embedlog.duiba.com.cn\",\"app_id\":41394,\"dcm\":\"1014.0.14.5346\"}"
                                },
                                "isOpenPrizeInfo": true
                            },
                            "success": true
                        });
                    }
                    )
                },
                getActivityOrder: function(t) {
                    var n = this;
                    getActivityToken(function(i) {
                        var o = {
                            url: "/activity/doJoin",
                            data: {
                                activityType: CFG.activityType,
                                activityId: CFG.activityId,
                                slotId: CFG.slotId,
                                timestamp: +new Date,
                                connection_type: n.getNetwork()
                            }
                        };
                        t = e.extend(!0, {}, o, t, i),
                        t.data.skinType = CFG.skinName;
                        console.log(t);
                        t.success({
                            "code": "0000000",
                            "desc": "成功",
                            "data": {
                                "limitTimes": 7,
                                "orderId": "71729872850599",
                                "success": true,
                                "isShowBuoy": false,
                                "message": "成功",
                                "limitType": 1
                            },
                            "success": true
                        })
                        // window.xhr = n.Ajax(t)
                    }, n.showModal.bind(n))
                },
                getActivityLottery: function(t) {
                    var i, o = this;
                    if (location.href.indexOf("/activity/index") > -1)
                        i = "/activity/result";
                    else
                        switch (n.getparams("result").toLowerCase()) {
                        case "alipay":
                            i = "/activity/resultAlipay";
                            break;
                        case "qb":
                            i = "/activity/resultQB";
                            break;
                        case "object":
                        case "physical":
                            i = "/activity/resultObject";
                            break;
                        case "virtual":
                            i = "/activity/resultVirtual";
                            break;
                        default:
                            i = "/activity/result"
                        }
                    var r = {
                        url: i,
                        data: {
                            showVersion: CFG.isShowNew || !1,
                            skinId: CFG.couponSkinId,
                            timestamp: +new Date
                        }
                    };
                    t = e.extend(!0, {}, r, t),
                    t.data.skinType = CFG.skinName,
                        t.success({
                            "code": "0000000",
                            "desc": "成功",
                            "data": {
                                "result": 2,
                                "activityId": 5346,
                                "orderId": "71729872850599",
                                "lottery": {
                                    "st_info_dpm_title_click": "{\"dpm\":\"41394.4.7.0\",\"orderId\":\"taw-71729872850599\",\"consumerId\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"deliveryType\":1,\"device_type\":\"tuia\",\"materialId\":22239,\"url\":\"/statistics/click\",\"advertId\":17752,\"dcm\":\"104.17752.10.22239\",\"activityId\":5346,\"skinType\":\"setDoll\",\"domain\":\"//embedlog.duiba.com.cn\",\"appId\":41394,\"activityType\":14,\"dsm\":\"1.6904.0.0\"}",
                                    "androidDownloadUrl": "//activity.tuiapple.com/activity/redirect?url=https%3A%2F%2Fm3.ttacp8.com%2Fnfop%2Fttacpanquansuo%2Findex.htm%3Ffrom%3Dtgwduibaiphone&orderId=taw-71729872850599&dcm=104.17752.10.22239&dpm=41394.4.1.0&activityId=5346&device_type=tuia&couponSource=activity",
                                    "link": "//activity.tuiapple.com/activity/indexRecord?vmName=detail&orderId=71729872850599&dpm=41394.4.3.0&dcm=104.17752.10.22239",
                                    "useBtnText": "立即领取",
                                    "title": "千万大奖等你拿",
                                    "type": "lucky",
                                    "advertId": 17752,
                                    "openUrl": "",
                                    "imgurl": "//yun.tuiapple.com/babi/img/9pzwvod67i.jpg",
                                    "st_info_dpm_exposure": "{\"dpm\":\"41394.4.1.0\",\"couponSource\":\"activity\",\"orderId\":\"taw-71729872850599\",\"consumerId\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"deliveryType\":1,\"device_type\":\"tuia\",\"materialId\":22239,\"url\":\"/activity/showLog\",\"advertId\":17752,\"dcm\":\"104.17752.10.22239\",\"activityId\":5346,\"skinType\":\"setDoll\",\"domainWeb\":\"//activity.tuiapple.com\",\"domain\":\"//embedlog.duiba.com.cn\",\"appId\":41394,\"activityType\":14,\"dsm\":\"1.6904.0.0\"}",
                                    "showUse": true,
                                    "skinType": "setDoll",
                                    "linkTo": 0,
                                    "st_info_dpm_btn_again": "{\"dpm\":\"41394.4.8.0\",\"orderId\":\"taw-71729872850599\",\"consumerId\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"deliveryType\":1,\"device_type\":\"tuia\",\"materialId\":22239,\"url\":\"/statistics/click\",\"advertId\":17752,\"dcm\":\"104.17752.10.22239\",\"activityId\":5346,\"skinType\":\"setDoll\",\"domain\":\"//embedlog.duiba.com.cn\",\"appId\":41394,\"activityType\":14,\"dsm\":\"1.6904.0.0\"}",
                                    "iosDownloadUrl": "//activity.tuiapple.com/activity/redirect?url=https%3A%2F%2Fm3.ttacp8.com%2Fnfop%2Fttacpanquansuo%2Findex.htm%3Ffrom%3Dtgwduibaiphone&orderId=taw-71729872850599&dcm=104.17752.10.22239&dpm=41394.4.1.0&activityId=5346&device_type=tuia&couponSource=activity",
                                    "tip": "买彩票只要1分钱，1000万不是梦！充值还送128元红包！",
                                    "id": 35427,
                                    "isDownloadUrl": true,
                                    "st_info_dpm_btn_close": "{\"dpm\":\"41394.4.4.0\",\"orderId\":\"taw-71729872850599\",\"consumerId\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"deliveryType\":1,\"device_type\":\"tuia\",\"materialId\":22239,\"url\":\"/statistics/click\",\"advertId\":17752,\"dcm\":\"104.17752.10.22239\",\"activityId\":5346,\"skinType\":\"setDoll\",\"domain\":\"//embedlog.duiba.com.cn\",\"appId\":41394,\"activityType\":14,\"dsm\":\"1.6904.0.0\"}",
                                    "st_info_dpm_img_click": "{\"dpm\":\"41394.4.5.0\",\"orderId\":\"taw-71729872850599\",\"consumerId\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"deliveryType\":1,\"device_type\":\"tuia\",\"materialId\":22239,\"url\":\"/statistics/click\",\"advertId\":17752,\"dcm\":\"104.17752.10.22239\",\"activityId\":5346,\"skinType\":\"setDoll\",\"domain\":\"//embedlog.duiba.com.cn\",\"appId\":41394,\"activityType\":14,\"dsm\":\"1.6904.0.0\"}",
                                    "st_info_dpm_btn_get": "{\"dpm\":\"41394.4.6.0\",\"orderId\":\"taw-71729872850599\",\"consumerId\":3574849111,\"domain4Web\":\"//activity.tuiapple.com\",\"deliveryType\":1,\"device_type\":\"tuia\",\"materialId\":22239,\"url\":\"/statistics/click\",\"advertId\":17752,\"dcm\":\"104.17752.10.22239\",\"activityId\":5346,\"skinType\":\"setDoll\",\"domain\":\"//embedlog.duiba.com.cn\",\"appId\":41394,\"activityType\":14,\"dsm\":\"1.6904.0.0\"}",
                                    "validate": "2018-03-31"
                                },
                                "detailContactInfo": {
                                    "isOpenOptionDetail": true,
                                    "optionDetailPhone": "4000806659"
                                },
                                "status": "success"
                            },
                            "success": true
                        })
                    // window.xhr = o.Ajax(t)
                },
                getActivityStatusText: function(t) {
                    var e = ""
                      , n = "抽奖机会已用完"
                      , i = "免费次数"
                      , o = "今日免费"
                      , r = "次";
                    return window.CFG && 1 == CFG.overseas && (n = "No lottery Numbers",
                    i = "free trials",
                    o = "free trials",
                    r = "time"),
                    t && (t.limitTimes ? 0 === t.limitType ? (window.CFG && 1 == CFG.overseas && t.limitTimes > 1 && (r = "times"),
                    e = i + "：" + t.limitTimes + " " + r) : (window.CFG && 1 == CFG.overseas && t.limitTimes > 1 && (r = "times"),
                    e = o + "：" + t.limitTimes + " " + r) : e = n),
                    e
                },
                getActivityErrorCode: function(t) {
                    switch (t) {
                    case "0000000":
                        return "success";
                    case "0100001":
                        return "over";
                    case "9999999":
                        return "networkError";
                    case "0200004":
                        return "preview";
                    default:
                        return "failed"
                    }
                },
                createErrorObject: function(t, e) {
                    var n = ""
                      , i = ""
                      , o = ""
                      , r = "";
                    e ? e : e = {};
                    var a = 0;
                    switch (window.CFG && 1 == CFG.overseas && (a = 1),
                    t) {
                    case "systemError":
                        n = e.title ? e.title : a ? "Draw failure" : "抽奖失败",
                        i = e.message,
                        o = a ? "Try again" : "再来一次";
                        break;
                    case "networkError":
                        n = a ? "Oh！Network parsing error" : "噢哦，网络解析错误！",
                        i = a ? "Try again" : "再试一遍吧~",
                        o = a ? "again" : "再来一次";
                        break;
                    case "gameClose":
                        n = a ? "End of the activity" : "活动结束",
                        i = a ? "The activity is over" : "该活动已经结束啦~",
                        o = a ? "I see" : "知道了";
                        break;
                    case "over":
                        n = a ? "The activity is over" : "抽奖次数已全部用完",
                        i = a ? "Your opportunity is used up" : "已经没有次数啦~",
                        o = a ? "I see" : "知道了";
                        break;
                    case "todayOver":
                        n = a ? "Your opportunity is used up" : "今天抽奖次数已用完",
                        i = a ? "See you" : "明天再来哦~",
                        o = a ? "I see" : "知道了";
                        break;
                    case "noPrize":
                        n = a ? "Oh! What a pity!" : "哎呀，就差那么一点点~",
                        i = a ? "Don`t lose heart. Come again" : "别灰心，再来一次！",
                        o = a ? "again" : "再抽一次";
                        break;
                    case "again":
                        n = a ? "Congratulations!" : "恭喜您，中奖了",
                        i = a ? "Get a free redraw" : "获得免费再抽一次",
                        o = a ? "again" : "再抽一次";
                        break;
                    case "preview":
                        n = "预览用户无法参与活动",
                        i = "换正常用户来吧~",
                        o = "知道了"
                    }
                    return {
                        type: t,
                        title: n,
                        tip: i,
                        btnText: o,
                        link: r
                    }
                },
                performance: function(t) {
                    if (window.performance) {
                        var n = window.performance.timing
                          , i = t || 0
                          , o = this;
                        if (window.allEnd = +new Date,
                        n.loadEventEnd) {
                            if (!window.dbStyleConfigEnd || !window.dbStyleConfigStart || !window.allEnd)
                                return;
                            var r = n.domComplete - n.domInteractive
                              , a = n.domContentLoadedEventEnd - n.navigationStart
                              , s = n.loadEventEnd - n.navigationStart
                              , c = window.dbStyleConfigEnd ? window.dbStyleConfigEnd - n.navigationStart : ""
                              , u = window.dbStyleConfigEnd - window.dbStyleConfigStart
                              , l = window.allEnd - n.navigationStart
                              , f = "/statistics/activityPagePerf?skinName=" + CFG.skinName + "&activityType=" + CFG.activityType + "&activityId=" + CFG.activityId + "&domComplete=" + r + "&domLoaded=" + a + "&onload=" + s + "&white=" + c + "&dbStyle=" + u + "&all=" + l + "&netWork=" + o.getNetwork()
                              , d = +new Date
                              , p = {
                                url: f,
                                type: "post",
                                data: {},
                                dataType: "json",
                                success: function() {},
                                error: function() {}
                            };
                            p.data.timestamp = d
                            // window.xhr = e.ajax(p)
                        } else
                            i < 10 && setTimeout(function() {
                                i++,
                                o.performance(i)
                            }, 1e3)
                    }
                },
                setModalInterval: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                    window.intervalTime || (window.intervalTime = setInterval(function() {
                        window[t] && (window[t](e),
                        clearInterval(window.intervalTime),
                        window.intervalTime = null)
                    }, 100))
                },
                showPlugin: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    window.TimingPlugin({
                        show: function() {
                            window.buoy && window.buoy.show(t)
                        },
                        reset: function() {
                            window.buoy && window.buoy.hide()
                        },
                        initOtherPlugin: function() {
                            window.ResponsivePlugin({
                                show: function() {
                                    window.buoy && window.buoy.show(t)
                                },
                                reset: function() {
                                    window.buoy && window.buoy.hide()
                                }
                            })
                        }
                    })
                },
                showActivityResult: function(t) {
                    var n = this
                      , i = {
                        result: null,
                        reInit: function() {},
                        start: function() {},
                        prize: null,
                        specialCoupon: null
                    };
                    switch (t = e.extend(!0, i, t),
                    t.result.data.result) {
                    case 2:
                        var o = t.result.data.lottery;
                        "coupon" == o.type || "lucky" == o.type ? t.specialCoupon ? t.specialCoupon() : n.setModalInterval("showCouponPrize", {
                            result: t.result.data,
                            callback: {
                                close: function() {
                                    t.reInit(),
                                    n.checkTimes(500)
                                },
                                use: function() {
                                    e(".J_modalShowPrize").remove(),
                                    t.reInit()
                                },
                                again: function() {
                                    e(".J_modalShowPrize").remove(),
                                    t.reInit(),
                                    setTimeout(function() {
                                        t.start()
                                    }, 500)
                                }
                            },
                            prize: t.prize
                        }) : "alipay" === o.type ? n.setModalInterval("showAlipayPrize", {
                            result: t.result.data,
                            callback: {
                                close: function() {
                                    t.reInit(),
                                    n.checkTimes(500)
                                }
                            }
                        }) : "physical" === o.type ? n.setModalInterval("showObjectPrize", {
                            result: t.result.data,
                            callback: {
                                close: function() {
                                    t.reInit(),
                                    n.checkTimes(500)
                                }
                            }
                        }) : "qb" === o.type ? n.setModalInterval("showQBPrize", {
                            result: t.result.data,
                            callback: {
                                close: function() {
                                    t.reInit(),
                                    n.checkTimes(500)
                                }
                            }
                        }) : n.setModalInterval("showVirtualPrize", {
                            result: t.result.data,
                            callback: {
                                close: function() {
                                    t.reInit(),
                                    n.checkTimes(500)
                                }
                            }
                        });
                        break;
                    default:
                        n.setModalInterval("showThanks", {
                            result: t.result.data,
                            callback: {
                                close: function() {
                                    t.reInit(),
                                    n.checkTimes(500)
                                }
                            }
                        })
                    }
                },
                getNetwork: function() {
                    var t = null
                      , e = window.navigator.userAgent
                      , n = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                    if (/MicroMessenger/.test(e))
                        if (/NetType/.test(e)) {
                            var i = e.match(/NetType\/(\S*)/);
                            t = i[1]
                        } else
                            document.addEventListener("WeixinJSBridgeReady", function() {
                                WeixinJSBridge.invoke("getNetworkType", {}, function(e) {
                                    t = e.err_msg
                                })
                            });
                    else if (n) {
                        var o = n.type;
                        t = o
                    }
                    var r = ["bluetooth", "cellular", "ethernet", "mixed", "none", "other", "unknown", "wifi", "wimax"];
                    return isNaN(t) || (t = r[parseInt(t)]),
                    t
                },
                initPage: function() {
                    this.checkTimes()
                },
                checkTimes: function() {
                    var t = this
                      , e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    location.href.indexOf("/activity/index") == -1 && "over" == n.getparams("result") && (this.hasNoTimes = !0),
                    setTimeout(function() {
                        t.hasNoTimes ? t.showModal("over") : !CFG.isPriority && t.showPlugin(t.isShowBuoy)
                    }, e)
                },
                transformWebp: function(t) {
                    return "function" == typeof "".ossimg && (t = t.ossimg()),
                    t
                },
                loadFiles: function(t) {
                    var e = this
                      , n = t.styleCb
                      , i = t.optionCb
                      , o = t.loadCb;
                    if ("cutRope" === CFG.skinName) {
                        window.dbStyleConfigStart = +new Date,
                        window.dbStyleConfigEnd = +new Date,
                        t.styleCb && t.styleCb({
                            data: {
                                skinConfig: CFG.skinConfig,
                                isNew: CFG.isNew,
                                contaction: CFG.contaction
                            }
                        });
                        var r = CFG.embedData ? JSON.parse(CFG.embedData) : {};
                        for (var a in r)
                            r[a] = JSON.stringify(r[a]);
                        window.embedData = r,
                        CFG.isOpenPrizeInfo && (window.isOpenPrizeInfo = CFG.isOpenPrizeInfo),
                        t.optionCb && t.optionCb({
                            data: {
                                options: CFG.options,
                                limitType: CFG.limitType,
                                limitTimes: CFG.limitTimes,
                                isOpenPrizeInfo: CFG.isOpenPrizeInfo,
                                embedData: r
                            }
                        }),
                        window.DB && window.DB.exposure && window.DB.exposure.initLog(),
                        e.performance();
                        window.loaderAsyncCallback = function() {
                            FastClick(document.body),
                            o && o(),
                            e.initPage();
                        }
                        
                        // Loader.async([common_js, common_css], function() {
                            
                        // })
                    } else
                        Promise.all([this.getActivityStyle({
                            styleCb: n
                        }), this.getActivityOptions({
                            optionCb: i
                        })]).then(function() {
                            window.DB && window.DB.exposure && window.DB.exposure.initLog(),
                            e.performance();
                            window.loaderAsyncCallback = function () {
                                FastClick(document.body),
                                o && o(),
                                e.initPage();
                            }
                            // Loader.async([common_js, common_css], function() {
                                
                            // })
                        })
                }
            };
            window.Public = i
        }(Zepto)
    }
    , {
        "./util.js": 5
    }],
    5: [function(t, e, n) {
        n.getparams = function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href
              , n = "[\\?&]" + t + "=([^&#]*)"
              , i = new RegExp(n)
              , o = i.exec(e);
            return null === o ? "" : o[1]
        }
    }
    , {}],
    6: [function(t, e, n) {
        !function(t) {
            function e() {
                return navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1
            }
            var n = {
                prizes: [],
                itemWidth: 0,
                spaceBetween: .2,
                slidesOffsetBefore: .2,
                slidesOffsetAfter: .2,
                showLucky: !1
            }
              , i = function(e, i) {
                i = t.extend({}, n, i);
                var o = 0
                  , r = t('<div id="prizes-wrapper"></div>');
                i.prizes.forEach(function(t, e) {
                    if (!t.hidden || "lucky" === t.prizeType && i.showLucky) {
                        var n = t.image;
                        "function" == typeof "".ossimg && (n = n.ossimg());
                        var a = '<div class="prize-item" style="display: inline-block; margin-right: ' + i.spaceBetween + 'rem;" data-id="' + t.id + '" data-type="' + t.prizeType + '">';
                        a += '<div class="prize-img-box"><img class="prize-img" src="' + n + '" /></div><p class="prize-name">' + t.title + "</p></div>",
                        r.append(a),
                        o++
                    }
                });
                var a = o * (i.itemWidth + i.spaceBetween) + i.slidesOffsetAfter + i.slidesOffsetBefore;
                r.css({
                    width: a + "rem",
                    "padding-left": i.slidesOffsetBefore + "rem",
                    "padding-right": i.slidesOffsetAfter + "rem"
                }),
                t(e).html(r).append('<div class="prize-tag"></div>'),
                t("#prizes-wrapper").attr("data-length", o)
            };
            i.initScroll = function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#prize-list"
                  , i = arguments[1]
                  , o = {
                    scrollX: !0,
                    scrollY: !1,
                    mouseWheel: !1,
                    scrollbars: !1,
                    shrinkScrollbars: "clip",
                    fadeScrollbars: !1,
                    click: e()
                }
                  , i = t.extend({}, o, i);
                new IScroll(n,i)
            }
            ,
            window.prizesRender = i
        }(Zepto)
    }
    , {}],
    7: [function(t, e, n) {
        !function() {
            $(function() {
                CFG.isPriority && Public.showPlugin()
            })
        }(Zepto)
    }
    , {}],
    8: [function(t, e, n) {
        !function(t) {
            var e, n, i = {
                init: function(o, r) {
                    var a = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                    o && (e = o.data.skinConfig,
                    "string" == typeof e && (e = t.parseJSON(e))),
                    n || (n = {},
                    e.forEach(function(t) {
                        t.childrens.forEach(function(t) {
                            t.value && (n[t.name] = t.value)
                        })
                    }),
                    i.hideRuleModalInfo(o)),
                    r && i.getConfig(r, a)
                },
                getStyle: function(t) {
                    return n[t]
                },
                getConfig: function(e, n) {
                    this._style = "",
                    e.forEach(function(e) {
                        n && (!t(e[0]).length || t(e[0]).length && "body" != t(e[0])[0].tagName.toLowerCase() && "db-content" != t(e[0])[0].id.toLowerCase()) && (e[0] = "#db-content " + e[0]),
                        i.setConfig(e[0], e[1], e[2])
                    }),
                    t("head").append("<style>" + this._style + "</style>")
                },
                setConfig: function(e, n, o) {
                    var r = this
                      , a = i.getStyle(o);
                    if (a)
                        switch (n) {
                        case "backgroundImage":
                            "function" == typeof "".ossimg && (a = a.ossimg()),
                            r._style += e + "{background-image:url(" + a + ") !important;}";
                            break;
                        case "backgroundColor":
                            r._style += e + "{background-color:" + a + " !important;}";
                            break;
                        case "color":
                            r._style += e + "{color:" + a + " !important;}";
                            break;
                        case "borderColor":
                            r._style += e + "{border-color:" + a + " !important;}";
                            break;
                        case "html":
                            t(e).html(a);
                            break;
                        case "image":
                            "function" == typeof "".ossimg && (a = a.ossimg()),
                            t(e).attr("src", a)
                        }
                },
                hideRuleModalInfo: function(t) {
                    var e = n.ruleText;
                    e.lastIndexOf("－－") > -1 && (e = e.substring(0, e.lastIndexOf("－－") + 2)),
                    t.data.contaction && (e += "</br>" + t.data.contaction),
                    n.ruleText = e
                }
            };
            window.requireStyle = i
        }(Zepto)
    }
    , {}],
    9: [function(t, e, n) {
        var i = t("./util")
          , o = {
            initJoinParams: function(t) {
                var e = t.slotId
                  , n = t.embedData
                  , i = t.type
                  , o = t.id
                  , r = t.skinId
                  , a = t.closeClickEmbedData
                  , s = t.moreClickEmbedData
                  , c = t.moreEmbedData;
                window.Plugin_Act_CFG = {
                    slotId: e,
                    embedData: n,
                    activityType: i,
                    activityId: o,
                    closeClickEmbedData: a,
                    skinId: r,
                    moreClickEmbedData: s,
                    moreEmbedData: c,
                    getOrder: "/pluginTools/dojoin",
                    getLottery: "/pluginTools/result"
                }
            },
            getCount: function(t) {
                var e = i.getCache(t);
                return e && e.today != i.getTodayFull() && (e = null,
                i.setCache(t, null)),
                e
            },
            setCount: function(t, e) {
                i.setCache(t, e)
            },
            foundByKey: function(t, e) {
                if (!(t instanceof Array))
                    return null;
                for (var n = 0, i = t.length; n < i; n++) {
                    var o = t[n];
                    if (void 0 != o[e])
                        return o
                }
                return null
            },
            calCount: function(t, e) {
                var n = "" == t ? [] : t;
                if (!(n instanceof Array))
                    return n;
                if (this.foundByKey(n, e))
                    for (var i = 0, o = n.length; i < o; i++) {
                        var r = n[i]
                          , a = r[e];
                        void 0 != a && (r[e] = a + 1)
                    }
                else {
                    var s = {};
                    s[e] = 1,
                    n.push(s)
                }
                return n
            },
            resetPlugin: function() {
                window.pluginAct && (pluginAct._events = {}),
                $("#plugin").remove(),
                $(".plugin-act-popup").remove(),
                $("body").find('script[src*="pluginAct"]').remove(),
                $("body").find('link[href*="pluginAct"]').remove()
            }
        };
        e.exports = o
    }
    , {
        "./util": 10
    }],
    10: [function(t, e, n) {
        var i = {
            ajax: function(t) {
                var e = {
                    data: {
                        timestamp: (new Date).getTime()
                    },
                    dataType: "json",
                    success: function() {},
                    error: function(t, e) {
                        "timeout" === e ? (t && t.abort(),
                        console.error("请求超时")) : console.error("网络错误")
                    }
                };
                t = $.extend(!0, e, t),
                $.ajax(t)
            },
            getURLParameter: function(t) {
                var e = decodeURIComponent((new RegExp("[?|&]" + t + "=([^&;]+?)(&|#|;|$)").exec(window.location.href) || [void 0, ""])[1].replace(/\+/g, "%20")) || null;
                return e ? e.split("/")[0] : e
            },
            getToday: function() {
                var t = new Date;
                return t.getMonth() + 1 + "-" + t.getDate()
            },
            getTodayFull: function() {
                var t = new Date;
                return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate()
            },
            getCache: function(t) {
                return localStorage ? JSON.parse(localStorage.getItem(t)) : ""
            },
            setCache: function(t, e) {
                "undefined" != typeof localStorage && localStorage.setItem(t, JSON.stringify(e))
            },
            getPageType: function() {
                var t = window.location.pathname;
                switch (t) {
                case "/mainMeet/index":
                    return 1;
                case "/actCenter/index":
                    return 2;
                case "/direct/index":
                    return 3;
                case "/activity/index":
                    return 4;
                case "/activity/indexRecord":
                    return 5;
                default:
                    return 0
                }
            }
        };
        e.exports = i
    }
    , {}],
    11: [function(t, e, n) {
        var i = t("../base/util")
          , o = t("../base/service")
          , r = "pa-responsive"
          , a = {
            getAll: function() {
                var t = o.getCount(r);
                if (t && t.countArray && 0 !== t.countArray.length)
                    return t.countArray.map(function(t) {
                        var e = {
                            closeOrJoin: !1
                        };
                        for (var n in t)
                            "cj" !== n || 1 !== t[n] ? (e.id = n,
                            e.count = t[n]) : e.closeOrJoin = !0;
                        return e
                    })
            },
            setAppeared: function(t) {
                var e = o.getCount(r);
                e || (e = {
                    today: i.getTodayFull()
                }),
                e.countArray = o.calCount(e.countArray || "", t),
                o.setCount(r, e)
            },
            setJoined: function(t) {
                var e = o.getCount(r)
                  , n = o.foundByKey(e.countArray, t);
                n && (n.cj = 1,
                o.setCount(r, e))
            }
        };
        e.exports = a
    }
    , {
        "../base/service": 9,
        "../base/util": 10
    }],
    12: [function(t, e, n) {
        function i() {
            var t = 4
              , e = parseInt(s.getURLParameter("id") || 0);
            return window.location.pathname.indexOf("/activity/index") != -1 && {
                joinTimes: JSON.stringify(u.getAll()),
                mainPageId: e,
                mainPageType: t
            }
        }
        function o(t) {
            t.reset && t.reset(),
            t.show && t.show()
        }
        function r() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , e = i();
            e && s.ajax({
                url: "/pluginTools/responsiveIndex",
                type: "post",
                data: e,
                success: function(e) {
                    if (e.success) {
                        var n = e.data
                          , i = n.id
                          , r = n.skinConfig
                          , a = n.priority;
                        u.setAppeared(i),
                        c.resetPlugin(),
                        $("body").append(r),
                        c.initJoinParams(e.data),
                        t.reset && t.reset(),
                        1 === a && t.show && t.show(),
                        window.pluginAct && $("#plugin").width() ? (pluginAct._on("win", function(t) {
                            u.setJoined(i)
                        }),
                        pluginAct._on("close", function(t) {
                            u.setJoined(i)
                        })) : ($(".plugin-act-popup .plugin-act-btn, .plugin-act-popup .close").click(function(t) {
                            u.setJoined(i)
                        }),
                        window.isAutoPlugin && u.setJoined(i))
                    } else
                        o(t)
                },
                error: function() {
                    o(t)
                }
            })
        }
        function a(t) {
            function e(t) {
                r(t)
            }
            e(t)
        }
        var s = t("../base/util")
          , c = t("../base/service")
          , u = t("./cache");
        window.ResponsivePlugin = a
    }
    , {
        "../base/service": 9,
        "../base/util": 10,
        "./cache": 11
    }],
    13: [function(t, e, n) {
        var i = t("../base/util")
          , o = t("../base/service")
          , r = "pa-timing"
          , a = {
            getAll: function() {
                var t = o.getCount(r);
                if (t && t.countArray && 0 !== t.countArray.length)
                    return t.countArray.map(function(t) {
                        var e = {
                            closeOrJoin: !1
                        };
                        for (var n in t)
                            "cj" !== n || 1 !== t[n] ? (e.id = n,
                            e.count = t[n]) : e.closeOrJoin = !0;
                        return e
                    })
            },
            setAppeared: function(t) {
                var e = o.getCount(r);
                e || (e = {
                    today: i.getTodayFull()
                }),
                e.countArray = o.calCount(e.countArray || "", t),
                o.setCount(r, e)
            },
            setJoined: function(t) {
                var e = o.getCount(r);
                if (!e) {
                    e = {
                        today: i.getTodayFull(),
                        countArray: []
                    };
                    var n = {};
                    n[t] = 0,
                    e.countArray.push(n)
                }
                var a = o.foundByKey(e.countArray, t);
                a && (a.cj = 1,
                o.setCount(r, e))
            }
        };
        e.exports = a
    }
    , {
        "../base/service": 9,
        "../base/util": 10
    }],
    14: [function(t, e, n) {
        function i() {
            var t = s.getPageType()
              , e = parseInt(s.getURLParameter("id") || 0);
            return {
                joinTimes: JSON.stringify(u.getAll()),
                mainPageId: e,
                mainPageType: t
            }
        }
        function o(t) {
            t.reset && t.reset(),
            t.initOtherPlugin && t.initOtherPlugin()
        }
        function r() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
              , e = i();
            // s.ajax({
            //     url: "/pluginTools/timingIndex",
            //     type: "post",
            //     data: e,
            //     success: function(e) {
            //         if (e.success) {
            //             var n = e.data
            //               , i = n.id
            //               , a = n.skinConfig
            //               , s = n.priority;
            //             c.resetPlugin(),
            //             $("body").append(a),
            //             c.initJoinParams(e.data),
            //             t.reset && t.reset(),
            //             1 === s && t.show && t.show(),
            //             window.pluginAct || $("#plugin").width() ? (pluginAct._on("win", function(t) {
            //                 u.setAppeared(i)
            //             }),
            //             pluginAct._on("close", function() {
            //                 "stage" === pluginAct.plugin_info.state ? u.setJoined(i) : r(t)
            //             })) : ($(".plugin-act-popup").on("click", ".plugin-act-close", function(e) {
            //                 $(".winred").width() || $(".nonepack").width() ? r(t) : u.setJoined(i)
            //             }),
            //             $(".plugin-act-popup").on("click", ".plugin-act-btn", function(t) {
            //                 u.setAppeared(i)
            //             }),
            //             window.isAutoPlugin && u.setAppeared(i))
            //         } else
            //             o(t)
            //     },
            //     error: function() {
            //         o(t)
            //     }
            // })

            function success(e) {
                if (e.success) {
                    var n = e.data
                        , i = n.id
                        , a = n.skinConfig
                        , s = n.priority;
                    c.resetPlugin(),
                    $("body").append(a),
                    c.initJoinParams(e.data),
                    t.reset && t.reset(),
                    1 === s && t.show && t.show(),
                    window.pluginAct || $("#plugin").width() ? (pluginAct._on("win", function(t) {
                        u.setAppeared(i)
                    }),
                    pluginAct._on("close", function() {
                        "stage" === pluginAct.plugin_info.state ? u.setJoined(i) : r(t)
                    })) : ($(".plugin-act-popup").on("click", ".plugin-act-close", function(e) {
                        $(".winred").width() || $(".nonepack").width() ? r(t) : u.setJoined(i)
                    }),
                    $(".plugin-act-popup").on("click", ".plugin-act-btn", function(t) {
                        u.setAppeared(i)
                    }),
                    window.isAutoPlugin && u.setAppeared(i))
                } else
                    o(t)
            }

            success({
                "code": "E0400019",
                "desc": "广告位插件按钮关闭",
                "data": null,
                "success": false
            });
        }
        function a(t) {
            function e(t) {
                r(t)
            }
            e(t)
        }
        var s = t("../base/util")
          , c = t("../base/service")
          , u = t("./cache");
        window.TimingPlugin = a
    }
    , {
        "../base/service": 9,
        "../base/util": 10,
        "./cache": 13
    }],
    15: [function(t, e, n) {
        !function() {
            function t(t) {
                return t ? localStorage && localStorage.iswebp && "false" !== localStorage.iswebp ? (e = t.split("."),
                e.length > 0 && "gif" === e[e.length - 1] ? t : t += "?x-oss-process=image/format,webp") : t += "?x-oss-process=image/quality,Q_80" : t
            }
            var e = [];
            if (localStorage && !localStorage.iswebp) {
                var n = document.createElement("canvas");
                if (n.getContext && n.getContext("2d"))
                    try {
                        localStorage.iswebp = 0 === n.toDataURL("image/webp").indexOf("data:image/webp")
                    } catch (i) {
                        console.error(i)
                    }
            }
            String.prototype.ossimg = function() {
                return t(this)
            }
        }()
    }
    , {}],
    16: [function(t, e, n) {
        !function(t) {
            var e = {
                show: function(e) {
                    var n = {
                        title: "",
                        tip: "",
                        type: "",
                        btnText: "",
                        link: "",
                        clickCallback: null,
                        btnCallback: null
                    };
                    e = t.extend({}, n, e),
                    this.render(e)
                },
                hide: function() {
                    t(".db-msg-modal").remove(),
                    t("#db-content").removeClass("filter")
                },
                render: function(e) {
                    var n = CFG.host
                      , i = this
                      , o = {
                        again: n + "/h5/activity/showModal/1.0/again.png",
                        noPrize: n + "/h5/activity/showModal/1.0/noPrize.png",
                        todayOver: n + "/h5/activity/showModal/1.0/todayOver.png",
                        over: n + "/h5/activity/showModal/1.0/over.png",
                        preview: n + "/h5/activity/showModal/1.0/noCredits.png",
                        systemError: n + "/h5/activity/showModal/1.0/noLogin.png",
                        networkError: n + "/h5/activity/showModal/1.0/networkError.png"
                    }
                      , r = o[e.type]
                      , a = '<div class="db-msg-modal"><div class="msg-modal-wrapper"><div class="msg-modal-header"><i class="msg-modal-close"></i><h4 class="msg-title">' + e.title + '</h4><p class="msg-tip">' + e.tip + '</p></div><div class="msg-modal-section">' + (r ? '<img src="' + r + '" />' : "") + '</div><div class="msg-modal-footer"><a href="javascript:;" class="msg-btn">' + e.btnText + "</a></div></div></div>";
                    t("body").append(a),
                    t("#db-content").addClass("filter"),
                    t(".db-msg-modal").off("click").on("click", ".msg-modal-close", function() {
                        e.clickCallback && e.clickCallback(),
                        i.hide()
                    }).on("click", ".msg-btn", function() {
                        e.link && (window.location.href = e.link),
                        e.btnCallback ? e.btnCallback() : e.clickCallback && e.clickCallback(),
                        i.hide()
                    })
                }
            };
            window.errorMsgModal = e
        }(Zepto)
    }
    , {}],
    17: [function(t, e, n) {
        !function(t, e, n) {
            var i = {
                logTimeout: null,
                $win: e(t),
                initLog: function() {
                    var t = this;
                    t.showLog(),
                    t.clickLog(),
                    t.srollLog()
                },
                singleExp: function(t) {
                    var n, i;
                    if (void 0 !== t && "undefined" !== t && "" !== e.trim(t) && "null" !== t && t && "string" == typeof t) {
                        if (t = JSON.parse(t),
                        t.domain) {
                            var o = [];
                            for (var r in t)
                                o.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
                            n = t.domain + "/exposure/standard?" + o.join("&") + "&_t=" + (new Date).getTime();
                            e('<img style="display:none;" src="' + n + '">')
                        }
                        if (t.domain4Web) {
                            var o = [];
                            for (var r in t)
                                o.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
                            i = t.domain4Web + t.url + "?" + o.join("&") + "&_t=" + (new Date).getTime();
                            e('<img style="display:none;" src="' + i + '">')
                        }
                    }
                },
                showLog: function(n) {
                    var i = this
                      , o = i.$win.height()
                      , r = i.$win.width();
                    e("body").find("[db-exposure]").not("[db-exposure-get]").each(function() {
                        var a = e(this)
                          , s = a.attr("db-exposure");
                        if ((!a.offset() || 0 !== a.offset().width) && void 0 !== s && "undefined" !== s && "" !== e.trim(s) && "null" !== s && e(t).scrollTop() + o >= a.offset().top && e(t).scrollLeft() + r >= a.offset().left && (a.attr("db-exposure-get", !0),
                        void 0 !== s && "undefined" !== s && "" !== e.trim(s))) {
                            try {
                                s = JSON.parse(s)
                            } catch (c) {
                                console.log("数据曝光失败:" + (c || ""))
                            }
                            s.domain && i.sendApi({
                                domain: s.domain,
                                url: "/exposure/standard",
                                data: s
                            }, function() {
                                n && n()
                            }),
                            s.domain4Web && i.sendApi({
                                domain: s.domain4Web,
                                url: s.url,
                                data: s
                            }, function() {
                                n && n()
                            })
                        }
                    })
                },
                singleClk: function(t) {
                    var n = this
                      , i = {
                        data: null,
                        callback: function() {}
                    };
                    t = e.extend(!0, i, t);
                    var o = t.data
                      , r = t.callback;
                    if (void 0 === o || "undefined" === o || "" === e.trim(o))
                        return void (r && r());
                    try {
                        o = JSON.parse(o)
                    } catch (a) {
                        console.log("数据曝光失败:" + (a || ""))
                    }
                    o.domain4Web && n.sendApi({
                        domain: o.domain4Web,
                        url: o.url,
                        data: o
                    }, function() {
                        r && r()
                    })
                },
                clickLog: function(t) {
                    var n = this;
                    e("body").find("[db-click]").unbind("click.statistics").bind("click.statistics", function() {
                        var i = e(this)
                          , o = i.attr("db-click");
                        if ("none" !== i.css("display") && "disabled" !== i.attr("disabled") && !i.prop("disabled") && void 0 !== o && "undefined" !== o && "" !== e.trim(o)) {
                            try {
                                o = JSON.parse(o)
                            } catch (r) {
                                console.log("数据曝光失败:" + (r || ""))
                            }
                            o.domain4Web && n.sendApi({
                                domain: o.domain4Web,
                                url: o.url,
                                data: o
                            }, function() {
                                t && t()
                            })
                        }
                    })
                },
                srollLog: function(t) {
                    var e = this;
                    clearTimeout(e.logTimeout),
                    e.logTimeout = setTimeout(function() {
                        e.$win.scroll(function() {
                            e.showLog()
                        })
                    }, 200)
                },
                sendApi: function(t, n, i, o) {
                    try {
                        var r = JSON.stringify(t);
                        if (r.indexOf("iframe") !== -1)
                            return
                    } catch (a) {
                        console.log("数据异常:" + (a || ""))
                    }
                    var s = t.domain || ""
                      , c = t.url;
                    s && (delete t.domain,
                    delete t.url,
                    t.data && t.data.domain && delete t.data.domain,
                    e.ajax({
                        url: s + c,
                        data: t.data,
                        dataType: "jsonp",
                        type: "get",
                        timeout: 400,
                        jsonpCallback: "tracks",
                        complete: function() {
                            n && n()
                        },
                        success: function(t) {
                            i && i(t)
                        },
                        error: function(t) {
                            o && o(t)
                        }
                    }))
                }
            }
              , o = function(t) {
                if (t) {
                    var e = JSON.parse(t)
                      , n = [];
                    for (var i in e)
                        n.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                    return e.domainWeb + e.url + "?" + n.join("&")
                }
            };
            n.exposure = i,
            n.format = o
        }(window, $, window.DB || (window.DB = {}))
    }
    , {}],
    18: [function(t, e, n) {
        var i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        ;
        !function() {
            "use strict";
            function t(e, n) {
                function i(t, e) {
                    return function() {
                        return t.apply(e, arguments)
                    }
                }
                var r;
                if (n = n || {},
                this.trackingClick = !1,
                this.trackingClickStart = 0,
                this.targetElement = null,
                this.touchStartX = 0,
                this.touchStartY = 0,
                this.lastTouchIdentifier = 0,
                this.touchBoundary = n.touchBoundary || 10,
                this.layer = e,
                this.tapDelay = n.tapDelay || 200,
                this.tapTimeout = n.tapTimeout || 700,
                !t.notNeeded(e)) {
                    for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, c = 0, u = a.length; c < u; c++)
                        s[a[c]] = i(s[a[c]], s);
                    o && (e.addEventListener("mouseover", this.onMouse, !0),
                    e.addEventListener("mousedown", this.onMouse, !0),
                    e.addEventListener("mouseup", this.onMouse, !0)),
                    e.addEventListener("click", this.onClick, !0),
                    e.addEventListener("touchstart", this.onTouchStart, !1),
                    e.addEventListener("touchmove", this.onTouchMove, !1),
                    e.addEventListener("touchend", this.onTouchEnd, !1),
                    e.addEventListener("touchcancel", this.onTouchCancel, !1),
                    Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, i) {
                        var o = Node.prototype.removeEventListener;
                        "click" === t ? o.call(e, t, n.hijacked || n, i) : o.call(e, t, n, i)
                    }
                    ,
                    e.addEventListener = function(t, n, i) {
                        var o = Node.prototype.addEventListener;
                        "click" === t ? o.call(e, t, n.hijacked || (n.hijacked = function(t) {
                            t.propagationStopped || n(t)
                        }
                        ), i) : o.call(e, t, n, i)
                    }
                    ),
                    "function" == typeof e.onclick && (r = e.onclick,
                    e.addEventListener("click", function(t) {
                        r(t)
                    }, !1),
                    e.onclick = null)
                }
            }
            var n = navigator.userAgent.indexOf("Windows Phone") >= 0
              , o = navigator.userAgent.indexOf("Android") > 0 && !n
              , r = /iP(ad|hone|od)/.test(navigator.userAgent) && !n
              , a = r && /OS 4_\d(_\d)?/.test(navigator.userAgent)
              , s = r && /OS [6-7]_\d/.test(navigator.userAgent)
              , c = navigator.userAgent.indexOf("BB10") > 0;
            t.prototype.needsClick = function(t) {
                switch (t.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (t.disabled)
                        return !0;
                    break;
                case "input":
                    if (r && "file" === t.type || t.disabled)
                        return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
                }
                return /\bneedsclick\b/.test(t.className)
            }
            ,
            t.prototype.needsFocus = function(t) {
                switch (t.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !o;
                case "input":
                    switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                    }
                    return !t.disabled && !t.readOnly;
                default:
                    return /\bneedsfocus\b/.test(t.className)
                }
            }
            ,
            t.prototype.sendClick = function(t, e) {
                var n, i;
                document.activeElement && document.activeElement !== t && document.activeElement.blur(),
                i = e.changedTouches[0],
                n = document.createEvent("MouseEvents"),
                n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null),
                n.forwardedTouchEvent = !0,
                t.dispatchEvent(n)
            }
            ,
            t.prototype.determineEventType = function(t) {
                return o && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
            }
            ,
            t.prototype.focus = function(t) {
                var e;
                r && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length,
                t.setSelectionRange(e, e)) : t.focus()
            }
            ,
            t.prototype.updateScrollParent = function(t) {
                var e, n;
                if (e = t.fastClickScrollParent,
                !e || !e.contains(t)) {
                    n = t;
                    do {
                        if (n.scrollHeight > n.offsetHeight) {
                            e = n,
                            t.fastClickScrollParent = n;
                            break
                        }
                        n = n.parentElement
                    } while (n)
                }
                e && (e.fastClickLastScrollTop = e.scrollTop)
            }
            ,
            t.prototype.getTargetElementFromEventTarget = function(t) {
                return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
            }
            ,
            t.prototype.onTouchStart = function(t) {
                var e, n, i;
                if (t.targetTouches.length > 1)
                    return !0;
                if (e = this.getTargetElementFromEventTarget(t.target),
                n = t.targetTouches[0],
                r) {
                    if (i = window.getSelection(),
                    i.rangeCount && !i.isCollapsed)
                        return !0;
                    if (!a) {
                        if (n.identifier && n.identifier === this.lastTouchIdentifier)
                            return t.preventDefault(),
                            !1;
                        this.lastTouchIdentifier = n.identifier,
                        this.updateScrollParent(e)
                    }
                }
                return this.trackingClick = !0,
                this.trackingClickStart = t.timeStamp,
                this.targetElement = e,
                this.touchStartX = n.pageX,
                this.touchStartY = n.pageY,
                t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(),
                !0
            }
            ,
            t.prototype.touchHasMoved = function(t) {
                var e = t.changedTouches[0]
                  , n = this.touchBoundary;
                return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
            }
            ,
            t.prototype.onTouchMove = function(t) {
                return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1,
                this.targetElement = null),
                !0)
            }
            ,
            t.prototype.findControl = function(t) {
                return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
            }
            ,
            t.prototype.onTouchEnd = function(t) {
                var e, n, i, c, u, l = this.targetElement;
                if (!this.trackingClick)
                    return !0;
                if (t.timeStamp - this.lastClickTime < this.tapDelay)
                    return this.cancelNextClick = !0,
                    !0;
                if (t.timeStamp - this.trackingClickStart > this.tapTimeout)
                    return !0;
                if (this.cancelNextClick = !1,
                this.lastClickTime = t.timeStamp,
                n = this.trackingClickStart,
                this.trackingClick = !1,
                this.trackingClickStart = 0,
                s && (u = t.changedTouches[0],
                l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l,
                l.fastClickScrollParent = this.targetElement.fastClickScrollParent),
                i = l.tagName.toLowerCase(),
                "label" === i) {
                    if (e = this.findControl(l)) {
                        if (this.focus(l),
                        o)
                            return !1;
                        l = e
                    }
                } else if (this.needsFocus(l))
                    return t.timeStamp - n > 100 || r && window.top !== window && "input" === i ? (this.targetElement = null,
                    !1) : (this.focus(l),
                    this.sendClick(l, t),
                    r && "select" === i || (this.targetElement = null,
                    t.preventDefault()),
                    !1);
                return !(!r || a || (c = l.fastClickScrollParent,
                !c || c.fastClickLastScrollTop === c.scrollTop)) || (this.needsClick(l) || (t.preventDefault(),
                this.sendClick(l, t)),
                !1)
            }
            ,
            t.prototype.onTouchCancel = function() {
                this.trackingClick = !1,
                this.targetElement = null
            }
            ,
            t.prototype.onMouse = function(t) {
                return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0,
                t.stopPropagation(),
                t.preventDefault(),
                !1))))
            }
            ,
            t.prototype.onClick = function(t) {
                var e;
                return this.trackingClick ? (this.targetElement = null,
                this.trackingClick = !1,
                !0) : "submit" === t.target.type && 0 === t.detail || (e = this.onMouse(t),
                e || (this.targetElement = null),
                e)
            }
            ,
            t.prototype.destroy = function() {
                var t = this.layer;
                o && (t.removeEventListener("mouseover", this.onMouse, !0),
                t.removeEventListener("mousedown", this.onMouse, !0),
                t.removeEventListener("mouseup", this.onMouse, !0)),
                t.removeEventListener("click", this.onClick, !0),
                t.removeEventListener("touchstart", this.onTouchStart, !1),
                t.removeEventListener("touchmove", this.onTouchMove, !1),
                t.removeEventListener("touchend", this.onTouchEnd, !1),
                t.removeEventListener("touchcancel", this.onTouchCancel, !1)
            }
            ,
            t.notNeeded = function(t) {
                var e, n, i, r;
                if ("undefined" == typeof window.ontouchstart)
                    return !0;
                if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                    if (!o)
                        return !0;
                    if (e = document.querySelector("meta[name=viewport]")) {
                        if (e.content.indexOf("user-scalable=no") !== -1)
                            return !0;
                        if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth)
                            return !0
                    }
                }
                if (c && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),
                i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
                    if (e.content.indexOf("user-scalable=no") !== -1)
                        return !0;
                    if (document.documentElement.scrollWidth <= window.outerWidth)
                        return !0
                }
                return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1],
                !!(r >= 27 && (e = document.querySelector("meta[name=viewport]"),
                e && (e.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction))
            }
            ,
            t.attach = function(e, n) {
                return new t(e,n)
            };
            e.exports = t.attach;
            e.exports.FastClick = t;
        }()
    }
    , {}],
    19: [function(t, e, n) {
        !function(t, e) {
            "use strict";
            function n(t) {
                return "complete" === t.readyState || "loaded" === t.readyState
            }
            function i(t, n, i) {
                var o = e.createElement("link");
                o.rel = "stylesheet",
                a(o, i, "css"),
                o.async = !0,
                o.href = t,
                f.appendChild(o)
            }
            function o(t, n, i) {
                var o = e.createElement("script");
                o.charset = "utf-8",
                a(o, i, "js"),
                o.async = !n.sync,
                o.src = t,
                f.appendChild(o)
            }
            function r(t, e) {
                var n;
                t.sheet && (n = !0),
                setTimeout(function() {
                    n ? e() : r(t, e)
                }, 20)
            }
            function a(e, i, o) {
                function a() {
                    e.onload = e.onreadystatechange = null,
                    e = null,
                    i()
                }
                var s = "onload"in e
                  , c = "css" === o;
                return !c || !d && s ? void (s ? (e.onload = a,
                e.onerror = function() {
                    e.onerror = null,
                    t._cdnFallback(e)
                }
                ) : e.onreadystatechange = function() {
                    n(e) && a()
                }
                ) : void setTimeout(function() {
                    r(e, i)
                }, 1)
            }
            function s(t, e, n, r) {
                function a() {
                    var n = e.indexOf(t);
                    n > -1 && e.splice(n, 1),
                    0 === e.length && r()
                }
                l.test(t) ? i(t, n, a) : o(t, n, a)
            }
            function c(t, e, n) {
                var i = function() {
                    n && n()
                };
                if (t = Array.prototype.slice.call(t || []),
                0 === t.length)
                    return void i();
                for (var o = 0, r = t.length; o < r; o++)
                    s(t[o], t, e, i)
            }
            function u(e, i) {
                n(e) ? i() : t.addEventListener("load", i)
            }
            var l = new RegExp("\\.css|.less")
              , f = e.head || e.getElementsByTagName("head")[0]
              , d = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536
              , p = {
                async: function(t, n) {
                    u(e, function() {
                        c(t, {}, n)
                    })
                },
                sync: function(t, n) {
                    u(e, function() {
                        c(t, {
                            sync: !0
                        }, n)
                    })
                }
            };
            return t.Loader = p,
            p
        }(window, document)
    }
    , {}],
    20: [function(t, e, n) {
        var i = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
          , o = function() {
            function t(t) {
                return null == t ? t + "" : U[X.call(t)] || "object"
            }
            function e(e) {
                return "function" == t(e)
            }
            function n(t) {
                return null != t && t == t.window
            }
            function o(t) {
                return null != t && t.nodeType == t.DOCUMENT_NODE
            }
            function r(e) {
                return "object" == t(e)
            }
            function a(t) {
                return r(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
            }
            function s(t) {
                return "number" == typeof t.length
            }
            function c(t) {
                return O.call(t, function(t) {
                    return null != t
                })
            }
            function u(t) {
                return t.length > 0 ? T.fn.concat.apply([], t) : t
            }
            function l(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }
            function f(t) {
                return t in _ ? _[t] : _[t] = RegExp("(^|\\s)" + t + "(\\s|$)")
            }
            function d(t, e) {
                return "number" != typeof e || L[l(t)] ? e : e + "px"
            }
            function p(t) {
                var e, n;
                return I[t] || (e = N.createElement(t),
                N.body.appendChild(e),
                n = getComputedStyle(e, "").getPropertyValue("display"),
                e.parentNode.removeChild(e),
                "none" == n && (n = "block"),
                I[t] = n),
                I[t]
            }
            function h(t) {
                return "children"in t ? A.call(t.children) : T.map(t.childNodes, function(t) {
                    return 1 == t.nodeType ? t : k
                })
            }
            function m(t, e, n) {
                for (x in e)
                    n && (a(e[x]) || K(e[x])) ? (a(e[x]) && !a(t[x]) && (t[x] = {}),
                    K(e[x]) && !K(t[x]) && (t[x] = []),
                    m(t[x], e[x], n)) : e[x] !== k && (t[x] = e[x])
            }
            function v(t, e) {
                return null == e ? T(t) : T(t).filter(e)
            }
            function g(t, n, i, o) {
                return e(n) ? n.call(t, i, o) : n
            }
            function y(t, e, n) {
                null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
            }
            function w(t, e) {
                var n = t.className || ""
                  , i = n && n.baseVal !== k;
                return e === k ? i ? n.baseVal : n : (i ? n.baseVal = e : t.className = e,
                k)
            }
            function b(t) {
                var e;
                try {
                    return t ? "true" == t || "false" != t && ("null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? T.parseJSON(t) : t : e) : t
                } catch (n) {
                    return t
                }
            }
            function C(t, e) {
                e(t);
                for (var n = 0, i = t.childNodes.length; i > n; n++)
                    C(t.childNodes[n], e)
            }
            var k, x, T, E, S, P, j = [], A = j.slice, O = j.filter, N = window.document, I = {}, _ = {}, L = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            }, D = /^\s*<(\w+|!)[^>]*>/, F = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, M = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, z = /^(?:body|html)$/i, $ = /([A-Z])/g, R = ["val", "css", "html", "text", "data", "width", "height", "offset"], B = ["after", "prepend", "before", "append"], G = N.createElement("table"), J = N.createElement("tr"), q = {
                tr: N.createElement("tbody"),
                tbody: G,
                thead: G,
                tfoot: G,
                td: J,
                th: J,
                "*": N.createElement("div")
            }, W = /complete|loaded|interactive/, Z = /^[\w-]*$/, U = {}, X = U.toString, Y = {}, H = N.createElement("div"), V = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, K = Array.isArray || function(t) {
                return t instanceof Array
            }
            ;
            return Y.matches = function(t, e) {
                if (!e || !t || 1 !== t.nodeType)
                    return !1;
                var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
                if (n)
                    return n.call(t, e);
                var i, o = t.parentNode, r = !o;
                return r && (o = H).appendChild(t),
                i = ~Y.qsa(o, e).indexOf(t),
                r && H.removeChild(t),
                i
            }
            ,
            S = function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }
            ,
            P = function(t) {
                return O.call(t, function(e, n) {
                    return t.indexOf(e) == n
                })
            }
            ,
            Y.fragment = function(t, e, n) {
                var i, o, r;
                return F.test(t) && (i = T(N.createElement(RegExp.$1))),
                i || (t.replace && (t = t.replace(M, "<$1></$2>")),
                e === k && (e = D.test(t) && RegExp.$1),
                e in q || (e = "*"),
                r = q[e],
                r.innerHTML = "" + t,
                i = T.each(A.call(r.childNodes), function() {
                    r.removeChild(this)
                })),
                a(n) && (o = T(i),
                T.each(n, function(t, e) {
                    R.indexOf(t) > -1 ? o[t](e) : o.attr(t, e)
                })),
                i
            }
            ,
            Y.Z = function(t, e) {
                return t = t || [],
                t.__proto__ = T.fn,
                t.selector = e || "",
                t
            }
            ,
            Y.isZ = function(t) {
                return t instanceof Y.Z
            }
            ,
            Y.init = function(t, n) {
                var i;
                if (!t)
                    return Y.Z();
                if ("string" == typeof t)
                    if (t = t.trim(),
                    "<" == t[0] && D.test(t))
                        i = Y.fragment(t, RegExp.$1, n),
                        t = null;
                    else {
                        if (n !== k)
                            return T(n).find(t);
                        i = Y.qsa(N, t)
                    }
                else {
                    if (e(t))
                        return T(N).ready(t);
                    if (Y.isZ(t))
                        return t;
                    if (K(t))
                        i = c(t);
                    else if (r(t))
                        i = [t],
                        t = null;
                    else if (D.test(t))
                        i = Y.fragment(t.trim(), RegExp.$1, n),
                        t = null;
                    else {
                        if (n !== k)
                            return T(n).find(t);
                        i = Y.qsa(N, t)
                    }
                }
                return Y.Z(i, t)
            }
            ,
            T = function(t, e) {
                return Y.init(t, e)
            }
            ,
            T.extend = function(t) {
                var e, n = A.call(arguments, 1);
                return "boolean" == typeof t && (e = t,
                t = n.shift()),
                n.forEach(function(n) {
                    m(t, n, e)
                }),
                t
            }
            ,
            Y.qsa = function(t, e) {
                var n, i = "#" == e[0], r = !i && "." == e[0], a = i || r ? e.slice(1) : e, s = Z.test(a);
                return o(t) && s && i ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : A.call(s && !i ? r ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
            }
            ,
            T.contains = N.documentElement.contains ? function(t, e) {
                return t !== e && t.contains(e)
            }
            : function(t, e) {
                for (; e && (e = e.parentNode); )
                    if (e === t)
                        return !0;
                return !1
            }
            ,
            T.type = t,
            T.isFunction = e,
            T.isWindow = n,
            T.isArray = K,
            T.isPlainObject = a,
            T.isEmptyObject = function(t) {
                var e;
                for (e in t)
                    return !1;
                return !0
            }
            ,
            T.inArray = function(t, e, n) {
                return j.indexOf.call(e, t, n)
            }
            ,
            T.camelCase = S,
            T.trim = function(t) {
                return null == t ? "" : String.prototype.trim.call(t)
            }
            ,
            T.uuid = 0,
            T.support = {},
            T.expr = {},
            T.map = function(t, e) {
                var n, i, o, r = [];
                if (s(t))
                    for (i = 0; t.length > i; i++)
                        n = e(t[i], i),
                        null != n && r.push(n);
                else
                    for (o in t)
                        n = e(t[o], o),
                        null != n && r.push(n);
                return u(r)
            }
            ,
            T.each = function(t, e) {
                var n, i;
                if (s(t)) {
                    for (n = 0; t.length > n; n++)
                        if (e.call(t[n], n, t[n]) === !1)
                            return t
                } else
                    for (i in t)
                        if (e.call(t[i], i, t[i]) === !1)
                            return t;
                return t
            }
            ,
            T.grep = function(t, e) {
                return O.call(t, e)
            }
            ,
            window.JSON && (T.parseJSON = JSON.parse),
            T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                U["[object " + e + "]"] = e.toLowerCase()
            }),
            T.fn = {
                forEach: j.forEach,
                reduce: j.reduce,
                push: j.push,
                sort: j.sort,
                indexOf: j.indexOf,
                concat: j.concat,
                map: function(t) {
                    return T(T.map(this, function(e, n) {
                        return t.call(e, n, e)
                    }))
                },
                slice: function() {
                    return T(A.apply(this, arguments))
                },
                ready: function(t) {
                    return W.test(N.readyState) && N.body ? t(T) : N.addEventListener("DOMContentLoaded", function() {
                        t(T)
                    }, !1),
                    this
                },
                get: function(t) {
                    return t === k ? A.call(this) : this[t >= 0 ? t : t + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(t) {
                    return j.every.call(this, function(e, n) {
                        return t.call(e, n, e) !== !1
                    }),
                    this
                },
                filter: function(t) {
                    return e(t) ? this.not(this.not(t)) : T(O.call(this, function(e) {
                        return Y.matches(e, t)
                    }))
                },
                add: function(t, e) {
                    return T(P(this.concat(T(t, e))))
                },
                is: function(t) {
                    return this.length > 0 && Y.matches(this[0], t)
                },
                not: function(t) {
                    var n = [];
                    if (e(t) && t.call !== k)
                        this.each(function(e) {
                            t.call(this, e) || n.push(this)
                        });
                    else {
                        var i = "string" == typeof t ? this.filter(t) : s(t) && e(t.item) ? A.call(t) : T(t);
                        this.forEach(function(t) {
                            0 > i.indexOf(t) && n.push(t)
                        })
                    }
                    return T(n)
                },
                has: function(t) {
                    return this.filter(function() {
                        return r(t) ? T.contains(this, t) : T(this).find(t).size()
                    })
                },
                eq: function(t) {
                    return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
                },
                first: function() {
                    var t = this[0];
                    return t && !r(t) ? t : T(t)
                },
                last: function() {
                    var t = this[this.length - 1];
                    return t && !r(t) ? t : T(t)
                },
                find: function(t) {
                    var e, n = this;
                    return e = t ? "object" == ("undefined" == typeof t ? "undefined" : i(t)) ? T(t).filter(function() {
                        var t = this;
                        return j.some.call(n, function(e) {
                            return T.contains(e, t)
                        })
                    }) : 1 == this.length ? T(Y.qsa(this[0], t)) : this.map(function() {
                        return Y.qsa(this, t)
                    }) : []
                },
                closest: function(t, e) {
                    var n = this[0]
                      , r = !1;
                    for ("object" == ("undefined" == typeof t ? "undefined" : i(t)) && (r = T(t)); n && !(r ? r.indexOf(n) >= 0 : Y.matches(n, t)); )
                        n = n !== e && !o(n) && n.parentNode;
                    return T(n)
                },
                parents: function(t) {
                    for (var e = [], n = this; n.length > 0; )
                        n = T.map(n, function(t) {
                            return (t = t.parentNode) && !o(t) && 0 > e.indexOf(t) ? (e.push(t),
                            t) : k
                        });
                    return v(e, t)
                },
                parent: function(t) {
                    return v(P(this.pluck("parentNode")), t)
                },
                children: function(t) {
                    return v(this.map(function() {
                        return h(this)
                    }), t)
                },
                contents: function() {
                    return this.map(function() {
                        return A.call(this.childNodes)
                    })
                },
                siblings: function(t) {
                    return v(this.map(function(t, e) {
                        return O.call(h(e.parentNode), function(t) {
                            return t !== e
                        })
                    }), t)
                },
                empty: function() {
                    return this.each(function() {
                        this.innerHTML = ""
                    })
                },
                pluck: function(t) {
                    return T.map(this, function(e) {
                        return e[t]
                    })
                },
                show: function() {
                    return this.each(function() {
                        "none" == this.style.display && (this.style.display = ""),
                        "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
                    })
                },
                replaceWith: function(t) {
                    return this.before(t).remove()
                },
                wrap: function(t) {
                    var n = e(t);
                    if (this[0] && !n)
                        var i = T(t).get(0)
                          , o = i.parentNode || this.length > 1;
                    return this.each(function(e) {
                        T(this).wrapAll(n ? t.call(this, e) : o ? i.cloneNode(!0) : i)
                    })
                },
                wrapAll: function(t) {
                    if (this[0]) {
                        T(this[0]).before(t = T(t));
                        for (var e; (e = t.children()).length; )
                            t = e.first();
                        T(t).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    var n = e(t);
                    return this.each(function(e) {
                        var i = T(this)
                          , o = i.contents()
                          , r = n ? t.call(this, e) : t;
                        o.length ? o.wrapAll(r) : i.append(r)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        T(this).replaceWith(T(this).children())
                    }),
                    this
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(t) {
                    return this.each(function() {
                        var e = T(this);
                        (t === k ? "none" == e.css("display") : t) ? e.show() : e.hide()
                    })
                },
                prev: function(t) {
                    return T(this.pluck("previousElementSibling")).filter(t || "*")
                },
                next: function(t) {
                    return T(this.pluck("nextElementSibling")).filter(t || "*")
                },
                html: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var n = this.innerHTML;
                        T(this).empty().append(g(this, t, e, n))
                    }) : 0 in this ? this[0].innerHTML : null
                },
                text: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var n = g(this, t, e, this.textContent);
                        this.textContent = null == n ? "" : "" + n
                    }) : 0 in this ? this[0].textContent : null
                },
                attr: function(t, e) {
                    var n;
                    return "string" != typeof t || 1 in arguments ? this.each(function(n) {
                        if (1 === this.nodeType)
                            if (r(t))
                                for (x in t)
                                    y(this, x, t[x]);
                            else
                                y(this, t, g(this, e, n, this.getAttribute(t)))
                    }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : k
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        1 === this.nodeType && y(this, t)
                    })
                },
                prop: function(t, e) {
                    return t = V[t] || t,
                    1 in arguments ? this.each(function(n) {
                        this[t] = g(this, e, n, this[t])
                    }) : this[0] && this[0][t]
                },
                data: function(t, e) {
                    var n = "data-" + t.replace($, "-$1").toLowerCase()
                      , i = 1 in arguments ? this.attr(n, e) : this.attr(n);
                    return null !== i ? b(i) : k
                },
                val: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        this.value = g(this, t, e, this.value)
                    }) : this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value)
                },
                offset: function(t) {
                    if (t)
                        return this.each(function(e) {
                            var n = T(this)
                              , i = g(this, t, e, n.offset())
                              , o = n.offsetParent().offset()
                              , r = {
                                top: i.top - o.top,
                                left: i.left - o.left
                            };
                            "static" == n.css("position") && (r.position = "relative"),
                            n.css(r)
                        });
                    if (!this.length)
                        return null;
                    var e = this[0].getBoundingClientRect();
                    return {
                        left: e.left + window.pageXOffset,
                        top: e.top + window.pageYOffset,
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    }
                },
                css: function(e, n) {
                    if (2 > arguments.length) {
                        var i = this[0]
                          , o = getComputedStyle(i, "");
                        if (!i)
                            return;
                        if ("string" == typeof e)
                            return i.style[S(e)] || o.getPropertyValue(e);
                        if (K(e)) {
                            var r = {};
                            return T.each(e, function(t, e) {
                                r[e] = i.style[S(e)] || o.getPropertyValue(e)
                            }),
                            r
                        }
                    }
                    var a = "";
                    if ("string" == t(e))
                        n || 0 === n ? a = l(e) + ":" + d(e, n) : this.each(function() {
                            this.style.removeProperty(l(e))
                        });
                    else
                        for (x in e)
                            e[x] || 0 === e[x] ? a += l(x) + ":" + d(x, e[x]) + ";" : this.each(function() {
                                this.style.removeProperty(l(x))
                            });
                    return this.each(function() {
                        this.style.cssText += ";" + a
                    })
                },
                index: function(t) {
                    return t ? this.indexOf(T(t)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(t) {
                    return !!t && j.some.call(this, function(t) {
                        return this.test(w(t))
                    }, f(t))
                },
                addClass: function(t) {
                    return t ? this.each(function(e) {
                        if ("className"in this) {
                            E = [];
                            var n = w(this)
                              , i = g(this, t, e, n);
                            i.split(/\s+/g).forEach(function(t) {
                                T(this).hasClass(t) || E.push(t)
                            }, this),
                            E.length && w(this, n + (n ? " " : "") + E.join(" "))
                        }
                    }) : this
                },
                removeClass: function(t) {
                    return this.each(function(e) {
                        if ("className"in this) {
                            if (t === k)
                                return w(this, "");
                            E = w(this),
                            g(this, t, e, E).split(/\s+/g).forEach(function(t) {
                                E = E.replace(f(t), " ")
                            }),
                            w(this, E.trim())
                        }
                    })
                },
                toggleClass: function(t, e) {
                    return t ? this.each(function(n) {
                        var i = T(this)
                          , o = g(this, t, n, w(this));
                        o.split(/\s+/g).forEach(function(t) {
                            (e === k ? !i.hasClass(t) : e) ? i.addClass(t) : i.removeClass(t)
                        })
                    }) : this
                },
                scrollTop: function(t) {
                    if (this.length) {
                        var e = "scrollTop"in this[0];
                        return t === k ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                            this.scrollTop = t
                        }
                        : function() {
                            this.scrollTo(this.scrollX, t)
                        }
                        )
                    }
                },
                scrollLeft: function(t) {
                    if (this.length) {
                        var e = "scrollLeft"in this[0];
                        return t === k ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                            this.scrollLeft = t
                        }
                        : function() {
                            this.scrollTo(t, this.scrollY)
                        }
                        )
                    }
                },
                position: function() {
                    if (this.length) {
                        var t = this[0]
                          , e = this.offsetParent()
                          , n = this.offset()
                          , i = z.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                        return n.top -= parseFloat(T(t).css("margin-top")) || 0,
                        n.left -= parseFloat(T(t).css("margin-left")) || 0,
                        i.top += parseFloat(T(e[0]).css("border-top-width")) || 0,
                        i.left += parseFloat(T(e[0]).css("border-left-width")) || 0,
                        {
                            top: n.top - i.top,
                            left: n.left - i.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || N.body; t && !z.test(t.nodeName) && "static" == T(t).css("position"); )
                            t = t.offsetParent;
                        return t
                    })
                }
            },
            T.fn.detach = T.fn.remove,
            ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(t) {
                    return t[0].toUpperCase()
                });
                T.fn[t] = function(i) {
                    var r, a = this[0];
                    return i === k ? n(a) ? a["inner" + e] : o(a) ? a.documentElement["scroll" + e] : (r = this.offset()) && r[t] : this.each(function(e) {
                        a = T(this),
                        a.css(t, g(this, i, e, a[t]()))
                    })
                }
            }),
            B.forEach(function(e, n) {
                var i = n % 2;
                T.fn[e] = function() {
                    var e, o, r = T.map(arguments, function(n) {
                        return e = t(n),
                        "object" == e || "array" == e || null == n ? n : Y.fragment(n)
                    }), a = this.length > 1;
                    return 1 > r.length ? this : this.each(function(t, e) {
                        o = i ? e : e.parentNode,
                        e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                        var s = T.contains(N.documentElement, o);
                        r.forEach(function(t) {
                            if (a)
                                t = t.cloneNode(!0);
                            else if (!o)
                                return T(t).remove();
                            o.insertBefore(t, e),
                            s && C(t, function(t) {
                                null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                            })
                        })
                    })
                }
                ,
                T.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
                    return T(t)[e](this),
                    this
                }
            }),
            Y.Z.prototype = T.fn,
            Y.uniq = P,
            Y.deserializeValue = b,
            T.zepto = Y,
            T
        }();
        window.Zepto = o,
        void 0 === window.$ && (window.$ = o),
        function(t) {
            function e(e, n, i) {
                var o = t.Event(n);
                return t(e).trigger(o, i),
                !o.isDefaultPrevented()
            }
            function n(t, n, i, o) {
                return t.global ? e(n || y, i, o) : void 0
            }
            function i(e) {
                e.global && 0 === t.active++ && n(e, null, "ajaxStart")
            }
            function o(e) {
                e.global && !--t.active && n(e, null, "ajaxStop")
            }
            function r(t, e) {
                var i = e.context;
                return e.beforeSend.call(i, t, e) !== !1 && n(e, i, "ajaxBeforeSend", [t, e]) !== !1 && void n(e, i, "ajaxSend", [t, e])
            }
            function a(t, e, i, o) {
                var r = i.context
                  , a = "success";
                i.success.call(r, t, a, e),
                o && o.resolveWith(r, [t, a, e]),
                n(i, r, "ajaxSuccess", [e, i, t]),
                c(a, e, i)
            }
            function s(t, e, i, o, r) {
                var a = o.context;
                o.error.call(a, i, e, t),
                r && r.rejectWith(a, [i, e, t]),
                n(o, a, "ajaxError", [i, o, t || e]),
                c(e, i, o)
            }
            function c(t, e, i) {
                var r = i.context;
                i.complete.call(r, e, t),
                n(i, r, "ajaxComplete", [e, i]),
                o(i)
            }
            function u() {}
            function l(t) {
                return t && (t = t.split(";", 2)[0]),
                t && (t == x ? "html" : t == k ? "json" : b.test(t) ? "script" : C.test(t) && "xml") || "text"
            }
            function f(t, e) {
                return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
            }
            function d(e) {
                e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
                !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data),
                e.data = void 0)
            }
            function p(e, n, i, o) {
                return t.isFunction(n) && (o = i,
                i = n,
                n = void 0),
                t.isFunction(i) || (o = i,
                i = void 0),
                {
                    url: e,
                    data: n,
                    success: i,
                    dataType: o
                }
            }
            function h(e, n, i, o) {
                var r, a = t.isArray(n), s = t.isPlainObject(n);
                t.each(n, function(n, c) {
                    r = t.type(c),
                    o && (n = i ? o : o + "[" + (s || "object" == r || "array" == r ? n : "") + "]"),
                    !o && a ? e.add(c.name, c.value) : "array" == r || !i && "object" == r ? h(e, c, i, n) : e.add(n, c)
                })
            }
            var m, v, g = 0, y = window.document, w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, b = /^(?:text|application)\/javascript/i, C = /^(?:text|application)\/xml/i, k = "application/json", x = "text/html", T = /^\s*$/;
            t.active = 0,
            t.ajaxJSONP = function(e, n) {
                if (!("type"in e))
                    return t.ajax(e);
                var i, o, c = e.jsonpCallback, u = (t.isFunction(c) ? c() : c) || "jsonp" + ++g, l = y.createElement("script"), f = window[u], d = function(e) {
                    t(l).triggerHandler("error", e || "abort")
                }, p = {
                    abort: d
                };
                return n && n.promise(p),
                t(l).on("load error", function(r, c) {
                    clearTimeout(o),
                    t(l).off().remove(),
                    "error" != r.type && i ? a(i[0], p, e, n) : s(null, c || "error", p, e, n),
                    window[u] = f,
                    i && t.isFunction(f) && f(i[0]),
                    f = i = void 0
                }),
                r(p, e) === !1 ? (d("abort"),
                p) : (window[u] = function() {
                    i = arguments
                }
                ,
                l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u),
                y.head.appendChild(l),
                e.timeout > 0 && (o = setTimeout(function() {
                    d("timeout")
                }, e.timeout)),
                p)
            }
            ,
            t.ajaxSettings = {
                type: "GET",
                beforeSend: u,
                success: u,
                error: u,
                complete: u,
                context: null,
                global: !0,
                xhr: function() {
                    return new window.XMLHttpRequest
                },
                accepts: {
                    script: "text/javascript, application/javascript, application/x-javascript",
                    json: k,
                    xml: "application/xml, text/xml",
                    html: x,
                    text: "text/plain"
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0
            },
            t.ajax = function(e) {
                var n = t.extend({}, e || {})
                  , o = t.Deferred && t.Deferred();
                for (m in t.ajaxSettings)
                    void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
                i(n),
                n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host),
                n.url || (n.url = "" + window.location),
                d(n);
                var c = n.dataType
                  , p = /\?.+=\?/.test(n.url);
                if (p && (c = "jsonp"),
                n.cache !== !1 && (e && e.cache === !0 || "script" != c && "jsonp" != c) || (n.url = f(n.url, "_=" + Date.now())),
                "jsonp" == c)
                    return p || (n.url = f(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")),
                    t.ajaxJSONP(n, o);
                var h, g = n.accepts[c], y = {}, w = function(t, e) {
                    y[t.toLowerCase()] = [t, e]
                }, b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, C = n.xhr(), k = C.setRequestHeader;
                if (o && o.promise(C),
                n.crossDomain || w("X-Requested-With", "XMLHttpRequest"),
                w("Accept", g || "*/*"),
                (g = n.mimeType || g) && (g.indexOf(",") > -1 && (g = g.split(",", 2)[0]),
                C.overrideMimeType && C.overrideMimeType(g)),
                (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && w("Content-Type", n.contentType || "application/x-www-form-urlencoded"),
                n.headers)
                    for (v in n.headers)
                        w(v, n.headers[v]);
                if (C.setRequestHeader = w,
                C.onreadystatechange = function() {
                    if (4 == C.readyState) {
                        C.onreadystatechange = u,
                        clearTimeout(h);
                        var e, i = !1;
                        if (C.status >= 200 && 300 > C.status || 304 == C.status || 0 == C.status && "file:" == b) {
                            c = c || l(n.mimeType || C.getResponseHeader("content-type")),
                            e = C.responseText;
                            try {
                                "script" == c ? (0,
                                eval)(e) : "xml" == c ? e = C.responseXML : "json" == c && (e = T.test(e) ? null : t.parseJSON(e))
                            } catch (r) {
                                i = r
                            }
                            i ? s(i, "parsererror", C, n, o) : a(e, C, n, o)
                        } else
                            s(C.statusText || null, C.status ? "error" : "abort", C, n, o)
                    }
                }
                ,
                r(C, n) === !1)
                    return C.abort(),
                    s(null, "abort", C, n, o),
                    C;
                if (n.xhrFields)
                    for (v in n.xhrFields)
                        C[v] = n.xhrFields[v];
                var x = !("async"in n) || n.async;
                C.open(n.type, n.url, x, n.username, n.password);
                for (v in y)
                    k.apply(C, y[v]);
                return n.timeout > 0 && (h = setTimeout(function() {
                    C.onreadystatechange = u,
                    C.abort(),
                    s(null, "timeout", C, n, o)
                }, n.timeout)),
                C.send(n.data ? n.data : null),
                C
            }
            ,
            t.get = function() {
                return t.ajax(p.apply(null, arguments))
            }
            ,
            t.post = function() {
                var e = p.apply(null, arguments);
                return e.type = "POST",
                t.ajax(e)
            }
            ,
            t.getJSON = function() {
                var e = p.apply(null, arguments);
                return e.dataType = "json",
                t.ajax(e)
            }
            ,
            t.fn.load = function(e, n, i) {
                if (!this.length)
                    return this;
                var o, r = this, a = e.split(/\s/), s = p(e, n, i), c = s.success;
                return a.length > 1 && (s.url = a[0],
                o = a[1]),
                s.success = function(e) {
                    r.html(o ? t("<div>").html(e.replace(w, "")).find(o) : e),
                    c && c.apply(r, arguments)
                }
                ,
                t.ajax(s),
                this
            }
            ;
            var E = encodeURIComponent;
            t.param = function(t, e) {
                var n = [];
                return n.add = function(t, e) {
                    this.push(E(t) + "=" + E(e))
                }
                ,
                h(n, t, e),
                n.join("&").replace(/%20/g, "+")
            }
        }(o),
        function(t) {
            function e(t) {
                return t._zid || (t._zid = d++)
            }
            function n(t, n, r, a) {
                if (n = i(n),
                n.ns)
                    var s = o(n.ns);
                return (v[e(t)] || []).filter(function(t) {
                    return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || r && e(t.fn) !== e(r) || a && t.sel != a)
                })
            }
            function i(t) {
                var e = ("" + t).split(".");
                return {
                    e: e[0],
                    ns: e.slice(1).sort().join(" ")
                }
            }
            function o(t) {
                return RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
            }
            function r(t, e) {
                return t.del && !y && t.e in w || !!e
            }
            function a(t) {
                return b[t] || y && w[t] || t
            }
            function s(n, o, s, c, l, d, p) {
                var h = e(n)
                  , m = v[h] || (v[h] = []);
                o.split(/\s/).forEach(function(e) {
                    if ("ready" == e)
                        return t(document).ready(s);
                    var o = i(e);
                    o.fn = s,
                    o.sel = l,
                    o.e in b && (s = function(e) {
                        var n = e.relatedTarget;
                        return !n || n !== this && !t.contains(this, n) ? o.fn.apply(this, arguments) : f
                    }
                    ),
                    o.del = d;
                    var h = d || s;
                    o.proxy = function(t) {
                        if (t = u(t),
                        !t.isImmediatePropagationStopped()) {
                            t.data = c;
                            var e = h.apply(n, t._args == f ? [t] : [t].concat(t._args));
                            return e === !1 && (t.preventDefault(),
                            t.stopPropagation()),
                            e
                        }
                    }
                    ,
                    o.i = m.length,
                    m.push(o),
                    "addEventListener"in n && n.addEventListener(a(o.e), o.proxy, r(o, p))
                })
            }
            function c(t, i, o, s, c) {
                var u = e(t);
                (i || "").split(/\s/).forEach(function(e) {
                    n(t, e, o, s).forEach(function(e) {
                        delete v[u][e.i],
                        "removeEventListener"in t && t.removeEventListener(a(e.e), e.proxy, r(e, c))
                    })
                })
            }
            function u(e, n) {
                return (n || !e.isDefaultPrevented) && (n || (n = e),
                t.each(T, function(t, i) {
                    var o = n[t];
                    e[t] = function() {
                        return this[i] = C,
                        o && o.apply(n, arguments)
                    }
                    ,
                    e[i] = k
                }),
                (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue"in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = C)),
                e
            }
            function l(t) {
                var e, n = {
                    originalEvent: t
                };
                for (e in t)
                    x.test(e) || t[e] === f || (n[e] = t[e]);
                return u(n, t)
            }
            var f, d = 1, p = Array.prototype.slice, h = t.isFunction, m = function(t) {
                return "string" == typeof t
            }, v = {}, g = {}, y = "onfocusin"in window, w = {
                focus: "focusin",
                blur: "focusout"
            }, b = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
            g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents",
            t.event = {
                add: s,
                remove: c
            },
            t.proxy = function(n, i) {
                var o = 2 in arguments && p.call(arguments, 2);
                if (h(n)) {
                    var r = function() {
                        return n.apply(i, o ? o.concat(p.call(arguments)) : arguments)
                    };
                    return r._zid = e(n),
                    r
                }
                if (m(i))
                    return o ? (o.unshift(n[i], n),
                    t.proxy.apply(null, o)) : t.proxy(n[i], n);
                throw new TypeError("expected function")
            }
            ,
            t.fn.bind = function(t, e, n) {
                return this.on(t, e, n)
            }
            ,
            t.fn.unbind = function(t, e) {
                return this.off(t, e)
            }
            ,
            t.fn.one = function(t, e, n, i) {
                return this.on(t, e, n, i, 1)
            }
            ;
            var C = function() {
                return !0
            }
              , k = function() {
                return !1
            }
              , x = /^([A-Z]|returnValue$|layer[XY]$)/
              , T = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
            t.fn.delegate = function(t, e, n) {
                return this.on(e, t, n)
            }
            ,
            t.fn.undelegate = function(t, e, n) {
                return this.off(e, t, n)
            }
            ,
            t.fn.live = function(e, n) {
                return t(document.body).delegate(this.selector, e, n),
                this
            }
            ,
            t.fn.die = function(e, n) {
                return t(document.body).undelegate(this.selector, e, n),
                this
            }
            ,
            t.fn.on = function(e, n, i, o, r) {
                var a, u, d = this;
                return e && !m(e) ? (t.each(e, function(t, e) {
                    d.on(t, n, i, e, r)
                }),
                d) : (m(n) || h(o) || o === !1 || (o = i,
                i = n,
                n = f),
                (h(i) || i === !1) && (o = i,
                i = f),
                o === !1 && (o = k),
                d.each(function(d, h) {
                    r && (a = function(t) {
                        return c(h, t.type, o),
                        o.apply(this, arguments)
                    }
                    ),
                    n && (u = function(e) {
                        var i, r = t(e.target).closest(n, h).get(0);
                        return r && r !== h ? (i = t.extend(l(e), {
                            currentTarget: r,
                            liveFired: h
                        }),
                        (a || o).apply(r, [i].concat(p.call(arguments, 1)))) : f
                    }
                    ),
                    s(h, e, o, i, n, u || a)
                }))
            }
            ,
            t.fn.off = function(e, n, i) {
                var o = this;
                return e && !m(e) ? (t.each(e, function(t, e) {
                    o.off(t, n, e)
                }),
                o) : (m(n) || h(i) || i === !1 || (i = n,
                n = f),
                i === !1 && (i = k),
                o.each(function() {
                    c(this, e, i, n)
                }))
            }
            ,
            t.fn.trigger = function(e, n) {
                return e = m(e) || t.isPlainObject(e) ? t.Event(e) : u(e),
                e._args = n,
                this.each(function() {
                    "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
                })
            }
            ,
            t.fn.triggerHandler = function(e, i) {
                var o, r;
                return this.each(function(a, s) {
                    o = l(m(e) ? t.Event(e) : e),
                    o._args = i,
                    o.target = s,
                    t.each(n(s, e.type || e), function(t, e) {
                        return r = e.proxy(o),
                        !o.isImmediatePropagationStopped() && f
                    })
                }),
                r
            }
            ,
            "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
                t.fn[e] = function(t) {
                    return t ? this.bind(e, t) : this.trigger(e)
                }
            }),
            ["focus", "blur"].forEach(function(e) {
                t.fn[e] = function(t) {
                    return t ? this.bind(e, t) : this.each(function() {
                        try {
                            this[e]()
                        } catch (t) {}
                    }),
                    this
                }
            }),
            t.Event = function(t, e) {
                m(t) || (e = t,
                t = e.type);
                var n = document.createEvent(g[t] || "Events")
                  , i = !0;
                if (e)
                    for (var o in e)
                        "bubbles" == o ? i = !!e[o] : n[o] = e[o];
                return n.initEvent(t, i, !0),
                u(n)
            }
        }(o),
        function(t) {
            t.fn.serializeArray = function() {
                var e, n, i = [];
                return t([].slice.call(this.get(0).elements)).each(function() {
                    e = t(this),
                    n = e.attr("type"),
                    "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != n && "reset" != n && "button" != n && ("radio" != n && "checkbox" != n || this.checked) && i.push({
                        name: e.attr("name"),
                        value: e.val()
                    })
                }),
                i
            }
            ,
            t.fn.serialize = function() {
                var t = [];
                return this.serializeArray().forEach(function(e) {
                    t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
                }),
                t.join("&")
            }
            ,
            t.fn.submit = function(e) {
                if (e)
                    this.bind("submit", e);
                else if (this.length) {
                    var n = t.Event("submit");
                    this.eq(0).trigger(n),
                    n.isDefaultPrevented() || this.get(0).submit()
                }
                return this
            }
        }(o),
        function(t) {
            "__proto__"in {} || t.extend(t.zepto, {
                Z: function(e, n) {
                    return e = e || [],
                    t.extend(e, t.fn),
                    e.selector = n || "",
                    e.__Z = !0,
                    e
                },
                isZ: function(e) {
                    return "array" === t.type(e) && "__Z"in e
                }
            });
            try {
                getComputedStyle(void 0)
            } catch (e) {
                var n = getComputedStyle;
                window.getComputedStyle = function(t) {
                    try {
                        return n(t)
                    } catch (e) {
                        return null
                    }
                }
            }
        }(o),
        function(t) {
            function e(e) {
                return e = t(e),
                !(!e.width() && !e.height()) && "none" !== e.css("display")
            }
            function n(t, e) {
                t = t.replace(/=#\]/g, '="#"]');
                var n, i, o = s.exec(t);
                if (o && o[2]in a && (n = a[o[2]],
                i = o[3],
                t = o[1],
                i)) {
                    var r = Number(i);
                    i = isNaN(r) ? i.replace(/^["']|["']$/g, "") : r
                }
                return e(t, n, i)
            }
            var i = t.zepto
              , o = i.qsa
              , r = i.matches
              , a = t.expr[":"] = {
                visible: function() {
                    return e(this) ? this : void 0
                },
                hidden: function() {
                    return e(this) ? void 0 : this
                },
                selected: function() {
                    return this.selected ? this : void 0
                },
                checked: function() {
                    return this.checked ? this : void 0
                },
                parent: function() {
                    return this.parentNode
                },
                first: function(t) {
                    return 0 === t ? this : void 0
                },
                last: function(t, e) {
                    return t === e.length - 1 ? this : void 0
                },
                eq: function(t, e, n) {
                    return t === n ? this : void 0
                },
                contains: function(e, n, i) {
                    return t(this).text().indexOf(i) > -1 ? this : void 0
                },
                has: function(t, e, n) {
                    return i.qsa(this, n).length ? this : void 0
                }
            }
              , s = RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*")
              , c = /^\s*>/
              , u = "Zepto" + +new Date;
            i.qsa = function(e, r) {
                return n(r, function(n, a, s) {
                    try {
                        var l;
                        !n && a ? n = "*" : c.test(n) && (l = t(e).addClass(u),
                        n = "." + u + " " + n);
                        var f = o(e, n)
                    } catch (d) {
                        throw console.error("error performing selector: %o", r),
                        d
                    } finally {
                        l && l.removeClass(u)
                    }
                    return a ? i.uniq(t.map(f, function(t, e) {
                        return a.call(t, e, f, s)
                    })) : f
                })
            }
            ,
            i.matches = function(t, e) {
                return n(e, function(e, n, i) {
                    return !(e && !r(t, e) || n && n.call(t, null, i) !== t)
                })
            }
        }(o)
    }
    , {}]
}, {}, [3]);
