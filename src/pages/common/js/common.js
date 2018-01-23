var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
}
: function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
}
;
!function t(i, e, o) {
    function n(r, a) {
        if (!e[r]) {
            if (!i[r]) {
                var l = "function" == typeof require && require;
                if (!a && l)
                    return l(r, !0);
                if (s)
                    return s(r, !0);
                var c = new Error("Cannot find module '" + r + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var h = e[r] = {
                exports: {}
            };
            i[r][0].call(h.exports, function(t) {
                var e = i[r][1][t];
                return n(e ? e : t)
            }, h, h.exports, t, i, e, o)
        }
        return e[r].exports
    }
    for (var s = "function" == typeof require && require, r = 0; r < o.length; r++)
        n(o[r]);
    return n
}({
    1: [function(t, i, e) {
        $.cookie = function(t, i, e) {
            if ("undefined" == typeof i) {
                var o = null;
                if (document.cookie && "" != document.cookie)
                    for (var n = document.cookie.split(";"), s = 0; s < n.length; s++) {
                        var r = $.trim(n[s]);
                        if (r.substring(0, t.length + 1) == t + "=") {
                            o = decodeURIComponent(r.substring(t.length + 1));
                            break
                        }
                    }
                return o
            }
            e = e || {},
            null === i && (i = "",
            e = $.extend({}, e),
            e.expires = -1);
            var a = "";
            if (e.expires && ("number" == typeof e.expires || e.expires.toUTCString)) {
                var l;
                "number" == typeof e.expires ? (l = new Date,
                l.setTime(l.getTime() + 24 * e.expires * 60 * 60 * 1e3)) : l = e.expires,
                a = "; expires=" + l.toUTCString()
            }
            var c = e.path ? "; path=" + e.path : ""
              , h = e.domain ? "; domain=" + e.domain : ""
              , d = e.secure ? "; secure" : "";
            document.cookie = [t, "=", encodeURIComponent(i), a, c, h, d].join("")
        }
    }
    , {}],
    2: [function(t, i, e) {
        !function(t) {
            window.mengmaClose || (!function(t, i, e) {
                window._mjObject = i,
                window[i] = window[i] || function() {
                    (window[i].q = window[i].q || []).push(arguments)
                }
                ;
                var o = document.createElement("script")
                  , n = document.getElementsByTagName("script")[0];
                o.async = 1,
                o.src = t,
                n.parentNode.insertBefore(o, n),
                e()
            }("https://res.id-linking.com/js/mjsdk-1.4.3.1.min.js", "mj", function() {
                window.mj && mj("set_params", {
                    url: "//d8-trk.mxtrk.com/jta/event",
                    tid: "1b2eaeebe55d3abaa3eed879fae627b3",
                    channel: CFG.appId,
                    subchannel: CFG.slotId
                }),
                CFG.tick && window.mj && mj("create_account", {
                    user_id: CFG.consumerId,
                    tick: CFG.tick,
                    fields: {
                        activityId: CFG.activityId,
                        appId: CFG.appId,
                        slotId: CFG.slotId,
                        consumerId: CFG.consumerId
                    }
                }, function(t, i) {})
            }),
            window.sendTransaction = function(t, i, e, o) {
                "" !== t && window.mj && mj("transaction", {
                    tick: t,
                    fields: {
                        activityId: CFG.activityId,
                        appId: CFG.appId,
                        slotId: CFG.slotId,
                        consumerId: CFG.consumerId,
                        advertId: e + "",
                        orderId: i + ""
                    }
                }, function(t, i) {
                    o && o(t, i)
                }),
                window.sendTransaction = function(t, i, e, o) {
                    "" !== t && window.mj && mj("transaction", {
                        tick: t,
                        fields: {
                            activityId: CFG.activityId,
                            appId: CFG.appId,
                            slotId: CFG.slotId,
                            consumerId: CFG.consumerId,
                            advertId: e + "",
                            orderId: i + ""
                        }
                    }, function(t, i) {
                        o && o(t, i)
                    })
                }
            }
            )
        }(Zepto)
    }
    , {}],
    3: [function(t, i, e) {
        !function() {
            var t = {
                init: function() {
                    var t = this;
                    !$(".kefu-modal").length && CFG.kefuType && t.ajax(function(t) {
                        t && t.buttonCode && ($("body").append('<div class="kefu-modal" style="z-index:50;"></div>'),
                        $(".kefu-modal").append(t.buttonCode),
                        window.kefuEmbed = t.embed,
                        window.kefuPhone = t.phone,
                        2 === t.id && window.refreshAppleDesc())
                    })
                },
                ajax: function(t) {
                    var i = this
                      , e = {
                        id: CFG.activityId
                    };
                    i.getparam("slotId") && (e.slotId = i.getparam("slotId")),
                    $.ajax({
                        url: "/activity/getKefu",
                        type: "get",
                        dataType: "json",
                        data: e,
                        success: function(i) {
                            i.success && t && t(i.data)
                        },
                        error: function() {
                            console.log("get recommend queue error")
                        }
                    })
                },
                getparam: function(t) {
                    var i = "[\\?&]" + t + "=([^&#]*)"
                      , e = new RegExp(i)
                      , o = e.exec(location.href);
                    return null === o ? "" : o[1]
                }
            };
            t.init()
        }(Zepto)
    }
    , {}],
    4: [function(t, i, e) {
        !function(t) {
            var i = {
                init: function() {
                    var i = this;
                    !t(".lottery-public-wrap").length && CFG.isPublicNotice && i.getData(function(i) {
                        if (i && i.styleCode) {
                            var e = t("body")[0].firstChild;
                            t('<div class="lottery-public-wrap" style="position: relative; z-index: 40;"></div>').insertBefore(e),
                            t(".lottery-public-wrap").append(i.styleCode),
                            window.lotteryPublicEmbed = i.embedData,
                            window.lotteryPublicList = i.list
                        }
                    })
                },
                getData: function(i) {
                    var e = {
                        id: CFG.activityId
                    };
                    t.ajax({
                        url: "/activity/publicNotice",
                        type: "get",
                        dataType: "json",
                        data: e,
                        success: function(t) {
                            t.success && i && i(t.data)
                        },
                        error: function() {
                            console.error("request /activity/publicNotice failed")
                        }
                    })
                }
            };
            i.init()
        }(Zepto)
    }
    , {}],
    5: [function(t, i, e) {
        var o = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        ;
        !function(i) {
            t("../../unit/lib/lib-animate");
            var e = function(t) {
                new n(t)
            }
              , n = function(t) {
                if ("object" == ("undefined" == typeof t ? "undefined" : o(t))) {
                    var e = {};
                    if (t.result && t.result.lottery) {
                        var n = t.result
                          , s = n.lottery;
                        e = {
                            id: s.id,
                            img: s.imgurl,
                            title: s.title,
                            tip: s.tip,
                            validate: s.validate,
                            couponCode: s.coupon_code,
                            couponKey: s.coupon_key,
                            showUse: s.showUse,
                            useBtnText: s.useBtnText,
                            st_info_dpm_exposure: s.st_info_dpm_exposure || "",
                            st_info_dpm_btn_get: s.st_info_dpm_btn_get || "",
                            st_info_dpm_btn_close: s.st_info_dpm_btn_close || "",
                            st_info_dpm_img_click: s.st_info_dpm_img_click || "",
                            st_info_dpm_title_click: s.st_info_dpm_title_click || "",
                            st_info_dpm_btn_again: s.st_info_dpm_btn_again || "",
                            type: s.type,
                            logprarm: n.exposure,
                            downloadAppConfig: {
                                openUrl: s.openUrl,
                                iosDownloadUrl: s.iosDownloadUrl,
                                androidDownloadUrl: s.androidDownloadUrl,
                                confirm: s.confirm,
                                advertId: s.advertId
                            },
                            link: s.link
                        }
                    }
                    this.prize = t.prize || {},
                    this.prize = i.extend(!0, e, this.prize),
                    this.hasHtml = t.hasHtml || "",
                    this.hasInsert = t.hasInsert || "";
                    var r = this
                      , a = "";
                    try {
                        a = JSON.parse(r.prize.st_info_dpm_btn_get)
                    } catch (l) {
                        console.log("st_info_dpm_btn_get error!")
                    }
                    if (i("body").append(r.tpl(r.prize, t)),
                    document.touchmove = function(t) {
                        t.preventDefault()
                    }
                    ,
                    r.prize) {
                        setTimeout(function() {
                            r.animation(t)
                        }, 300),
                        r.btnDBClick = r.prize.st_info_dpm_btn_get,
                        r.closeDBClick = r.prize.st_info_dpm_btn_close,
                        r.titleDBClick = r.prize.st_info_dpm_title_click,
                        r.againDBClick = r.prize.st_info_dpm_btn_again,
                        r.imgDBClick = r.prize.st_info_dpm_img_click;
                        try {
                            window.DB.exposure.singleExp(r.prize.st_info_dpm_exposure)
                        } catch (l) {
                            console.log("弹层曝光异常。")
                        }
                        void 0 !== r.prize.downloadAppConfig && (window.downloadAppConfig = r.prize.downloadAppConfig),
                        i(".J_modalShowPrize .J_btnCoupon").on("click", function() {
                            var e = this;
                            window.DB.exposure.singleClk({
                                data: r.btnDBClick,
                                callback: function() {
                                    var o = i(e).html()
                                      , n = e;
                                    setTimeout(function() {
                                        i(n).prop("disabled", !0),
                                        i(n).find("span").length && i(n).html("<i></i><span>页面跳转中，请稍后</span>")
                                    }, 0),
                                    r.sendResult(a, function() {
                                        r.use.call(n, o),
                                        t.callback && t.callback.use && t.callback.use()
                                    })
                                }
                            })
                        }),
                        i(".J_modalShowPrize .coupon-modal-close").on("click", function() {
                            window.DB.exposure.singleClk({
                                data: r.closeDBClick,
                                callback: function() {
                                    document.touchmove = null
                                }
                            }),
                            i(this).hide(),
                            r.animationOut(t)
                        }),
                        i(".J_gotoDetail").on("click", function(e) {
                            var o = this;
                            window.DB.exposure.singleClk({
                                data: r.imgDBClick,
                                callback: function() {
                                    e.preventDefault();
                                    var n = i(o).attr("data-pic");
                                    r.sendResult(a, function() {
                                        t.callback && t.callback.close && t.callback.use(),
                                        r.prize.showUse && n ? window.downloadApp() : window.location.href = r.prize.link
                                    })
                                }
                            })
                        }),
                        i(".J_modalShowPrize .modal-title.title-clickable").on("click", function(i) {
                            window.DB.exposure.singleClk({
                                data: r.titleDBClick,
                                callback: function() {
                                    i.preventDefault(),
                                    r.sendResult(a, function() {
                                        t.callback && t.callback.close && t.callback.use(),
                                        r.prize.showUse ? window.downloadApp() : window.location.href = r.prize.link
                                    })
                                }
                            })
                        }),
                        i(".coupon-again").on("click", function(i) {
                            window.DB.exposure.singleClk({
                                data: r.againDBClick,
                                callback: function() {
                                    i.preventDefault(),
                                    t.callback && t.callback.again && t.callback.again()
                                }
                            })
                        })
                    }
                } else
                    console.warn("参数错误")
            };
            n.prototype.sendResult = function(t, i) {
                var e = 200
                  , o = !0;
                if ("function" == typeof sendTransaction && t.tick) {
                    var n = (new Date).getTime();
                    sendTransaction(t.tick, t.orderId, t.advertId, function(t, e) {
                        var s = (new Date).getTime()
                          , r = s - n;
                        r < 200 && o && (o = !1,
                        i())
                    })
                }
                setTimeout(function() {
                    o && i(),
                    o = !1
                }, e)
            }
            ,
            n.prototype.use = function(t) {
                window.downloadApp(),
                setTimeout(i.proxy(function() {
                    i(this).prop("disabled", !1).html(t)
                }, this), 500)
            }
            ,
            n.prototype.animation = function() {
                i(".J_modalShowPrize").show()
            }
            ,
            n.prototype.animationOut = function(t) {
                var e = i(".coupon-modal-showPrize")
                  , o = i(".record")
                  , n = e.offset().left + e.offset().width / 2
                  , s = e.offset().top + e.offset().height / 2
                  , r = o.length ? o.offset().left + o.offset().width / 2 : document.body.offsetWidth
                  , a = o.length ? o.offset().top + o.offset().height / 2 : 0
                  , l = parseInt(r - n)
                  , c = parseInt(a - s)
                  , h = i(".coupon-modal-showPrize");
                h.css({
                    "background-color": "rgba(0, 0, 0, 0)"
                }).animate({
                    translateY: c + "px"
                }, 800, "ease-out", function() {
                    i(".J_modalShowPrize").remove()
                }),
                i(".coupon-modal-animate").animate({
                    translateX: l + "px",
                    scale: 0
                }, 800, "cubic-bezier(0.23, 0.21, 0.71, 1)"),
                i(".coupon-modal-showPrize-dialog").animate({
                    scale: 0
                }, 800, "linear"),
                setTimeout(function() {
                    t.callback && t.callback.close ? t.callback.close() : self.prize.noreload || window.location.reload()
                }, 0)
            }
            ,
            n.prototype.format = function(t) {
                if (t) {
                    var i = JSON.parse(t);
                    if (i.domainWeb) {
                        var e = [];
                        for (var o in i)
                            e.push(encodeURIComponent(o) + "=" + encodeURIComponent(i[o]));
                        return i.domainWeb + "/exposure/layer?" + e.join("&") + "&_t=" + (new Date).getTime()
                    }
                }
            }
            ,
            window.CouponModal = n,
            window.showCouponPrize = e
        }(Zepto)
    }
    , {
        "../../unit/lib/lib-animate": 21
    }],
    6: [function(t, i, e) {
        !function(i) {
            function e(t) {
                var i = "[\\?&]" + t + "=([^&#]*)"
                  , e = new RegExp(i)
                  , o = e.exec(location.href);
                return null === o ? "" : o[1]
            }
            t("../cookie/cookie");
            var o = e("tck_rid_6c8") || i.cookie("_coll_rid");
            if (o) {
                _fmOpt = {
                    partner: "duiba",
                    appName: "tuia_h5",
                    token: o
                };
                var n = new Image(1,1);
                n.onload = function() {
                    _fmOpt.imgLoaded = !0
                }
                ,
                n.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=" + _fmOpt.partner + "&appName=" + _fmOpt.appName + "&tokenId=" + _fmOpt.token;
                var s = document.createElement("script");
                s.type = "text/javascript",
                s.async = !0,
                s.src = ("https:" == document.location.protocol ? "https://" : "http://") + "static.fraudmetrix.cn/fm.js?ver=0.1&t=" + ((new Date).getTime() / 36e5).toFixed(0);
                var r = document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(s, r)
            }
        }(Zepto)
    }
    , {
        "../cookie/cookie": 1
    }],
    7: [function(t, i, e) {
        t("../../../../unit/common/js/downloadApp"),
        t("../../../../unit/common/js/prizeDetail"),
        t("../../../../module/tongdun"),
        t("../../../../module/mengma"),
        t("../components/preload"),
        t("../components/intercept"),
        t("../components/fetchModal"),
        t("../components/requireBuyo"),
        t("../components/initAppleDesc"),
        t("../components/handleRecord"),
        t("../components/ruleModal/index"),
        t("../../../../module/requireKefu/index"),
        t("../../../../module/requireLotteryPublic/index"),
        t("../../../../module/showCouponprize/public-3"),
        t("../../../../unit/lib/lib-cookie"),
        t("../../../../unit/common/js/IScroll")
    }
    , {
        "../../../../module/mengma": 2,
        "../../../../module/requireKefu/index": 3,
        "../../../../module/requireLotteryPublic/index": 4,
        "../../../../module/showCouponprize/public-3": 5,
        "../../../../module/tongdun": 6,
        "../../../../unit/common/js/IScroll": 18,
        "../../../../unit/common/js/downloadApp": 19,
        "../../../../unit/common/js/prizeDetail": 20,
        "../../../../unit/lib/lib-cookie": 22,
        "../components/fetchModal": 8,
        "../components/handleRecord": 9,
        "../components/initAppleDesc": 10,
        "../components/intercept": 11,
        "../components/preload": 12,
        "../components/requireBuyo": 13,
        "../components/ruleModal/index": 14
    }],
    8: [function(t, i, e) {
        var o = {
            ajax: function(t) {
                var i = {
                    data: {
                        timestamp: (new Date).getTime()
                    },
                    dataType: "json",
                    success: function() {},
                    error: function(t, i) {
                        "timeout" === i ? (t && t.abort(),
                        console.error("请求超时")) : console.error("网络错误")
                    }
                };
                t = $.extend(!0, i, t),
                $.ajax(t)
            },
            setId: function(t) {
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
        e.init = function() {
            // o.ajax({
            //     url: "/activity/getAllSkin",
            //     type: "get",
            //     data: {
            //         couponSkinId: window.CFG && window.CFG.couponSkinId
            //     },
            //     success: function(t) {
            //         if (t.success) {
            //             var i = t.data;
            //             $("body").append('<div class="modal-group"></div>'),
            //             i && i.forEach(function(t) {
            //                 o.setId(t),
            //                 t && t.code && $(".modal-group").append(t.code),
            //                 4 === t.skinType && $("#couponScript").length && ($("#couponScript")[0].onload = function() {
            //                     window.couponList && preload(window.couponList, !1)
            //                 }
            //                 )
            //             })
            //         } else
            //             console.error("请求弹层数据出错", t.desc)
            //     },
            //     error: function() {
            //         console.error("请求弹层网络出错");
            //         var t = '<link rel="stylesheet" href="//yun.tuisnake.com/h5-mami/couponPrize/1.0.2/index_201707181200.css">\n<script type="text/javascript">\nvar oHead = document.querySelector(\'body\');\nvar oScript = document.createElement(\'script\');\noScript.type = "text/javascript";\noScript.src = "//yun.tuisnake.com/h5-mami/couponPrize/1.0.2/index_201707181200.js";\noHead.appendChild(oScript);\n</script>'
            //           , i = '<link rel="stylesheet" href="//yun.tuisnake.com/h5-mami/alipayModal/index_201708211647.css">\n<script type="text/javascript">\nvar oHead = document.querySelector(\'body\');\nvar oScript = document.createElement(\'script\');\noScript.type = "text/javascript";\noScript.src = "//yun.tuisnake.com/h5-mami/alipayModal/index_201708211647.js";\noHead.appendChild(oScript);\n</script>"';
            //         $(".modal-group").append(t).append(i)
            //     }
            // })

            function success(t) {
                if (t.success) {
                    var i = t.data;
                    $("body").append('<div class="modal-group"></div>'),
                    i && i.forEach(function(t) {
                        o.setId(t),
                        t && t.code && $(".modal-group").append(t.code),
                        4 === t.skinType && $("#couponScript").length && ($("#couponScript")[0].onload = function() {
                            window.couponList && preload(window.couponList, !1)
                        }
                        )
                    })
                } else
                    console.error("请求弹层数据出错", t.desc)
            }

            success({
                "code": "0000000",
                "desc": "成功",
                "data": [{
                    "id": 4,
                    "skinName": "支付宝定额弹层",
                    "skinType": 1,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/alipayModal/index_201801031414.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/alipayModal/index_201801171226.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuisnake.com/mami-media/img/7v4ljd2ha5.png",
                    "empty": false
                },
                {
                    "id": 2,
                    "skinName": "支付宝随机弹层",
                    "skinType": 2,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/alipayModal/index_201801031414.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/alipayModal/index_201801171226.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuisnake.com/mami-media/img/lquxlj1929.png",
                    "empty": false
                },
                {
                    "id": 3,
                    "skinName": "谢谢参与弹层",
                    "skinType": 3,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/thanksPrize/index_201801031425.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/thanksPrize/index_201801101549.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuisnake.com/mami-media/img/y6sh8cnpzp.png",
                    "empty": false
                },
                {
                    "id": 29,
                    "skinName": "推荐弹层",
                    "skinType": 5,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/recommend/index_201801111255.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/recommend/index_201801111255.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuisnake.com/mami-media/img/sxphy6gpp0.png",
                    "empty": false
                },
                {
                    "id": 45,
                    "skinName": "实物弹层",
                    "skinType": 6,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/objectModal/index_201801031418.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/objectModal/index_201801092025.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuisnake.com/mami-media/img/n7u4acib9u.png",
                    "empty": false
                },
                {
                    "id": 48,
                    "skinName": "虚拟奖品弹层",
                    "skinType": 7,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/virtualModal/index_201801111239.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.id = \"couponScript\";\n//oScript.src = \"//yun.tuisnake.com/h5-mami/virtualModal/index_201801111239.js\";\n oScript.src = \"//yun.tuisnake.com/h5-mami/virtualModal/index_201801111503.js\";\n  console.log(oScript);\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuiapple.com/mami-media/img/nvzt3fuhno.png",
                    "empty": false
                },
                {
                    "id": 50,
                    "skinName": "腾讯QB-定额",
                    "skinType": 8,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/QBModal/index_201801031421.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/QBModal/index_201801171227.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuiapple.com/mami-media/img/oug0bk2qcm.png",
                    "empty": false
                },
                {
                    "id": 51,
                    "skinName": "腾讯QB-随机",
                    "skinType": 9,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/QBModal/index_201801031421.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/QBModal/index_201801171227.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuiapple.com/mami-media/img/9qx2ebunj8.png",
                    "empty": false
                },
                {
                    "id": 10,
                    "skinName": "粉红色的娃娃",
                    "skinType": 4,
                    "isDeleted": false,
                    "code": "<link rel=\"stylesheet\" href=\"//yun.tuisnake.com/h5-mami/couponPrize/1.9/index_201709141600.css\">\n<script type=\"text/javascript\">\nvar oHead = document.querySelector('.modal-group');\nvar oScript = document.createElement('script');\noScript.type = \"text/javascript\";\n  oScript.id = \"couponScript\";\noScript.src = \"//yun.tuisnake.com/h5-mami/couponPrize/1.9/index_201711031000.js\";\noHead.appendChild(oScript);\n</script>",
                    "image": "//yun.tuisnake.com/mami-media/img/9coeoo9p5p.jpg",
                    "empty": false
                }],
                "success": true
            })
        }
        ,
        e.init()
    }
    , {}],
    9: [function(t, i, e) {
        !function() {
            $(function() {
                $(".record").on("click", function() {
                    window.DB.exposure.singleClk({
                        data: embedData.st_info_options_click,
                        callback: function() {
                            window.location.href.indexOf("/activity/index") > -1 ? window.location.href = "/activity/indexRecord?vmName=list" : window.location.href = "../../record/list.html"
                        }
                    })
                })
            })
        }(Zepto)
    }
    , {}],
    10: [function(t, i, e) {
        !function() {
            function t() {
                function t(t) {
                    t && $(i).append('<p class="apple' + ($("#db-content").height() < $(window).height() - 30 && e ? " fixed" : "") + '">' + t + "</p>")
                }
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "#db-content"
                  , e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , o = "*奖品与活动和设备生产商Apple Inc.公司无关";
                window.CFG && 1 == CFG.overseas && (o = "The activity and its prizes have no concern with the device manufactuer Apple Inc. ");
                var n = navigator.userAgent.toLowerCase().match(/iphone|ipad/gi);
                n && t(o)
            }
            function i() {
                var t = "客服热线：" + window.kefuPhone
                  , i = "*奖品与活动和设备生产商Apple Inc.公司无关";
                window.CFG && 1 == CFG.overseas && (t = "Customer service：" + window.kefuPhone,
                i = "The activity and its prizes have no concern with the device manufactuer Apple Inc. ",
                $(".apple").css("font-size", ".08rem"));
                navigator.userAgent.toLowerCase().match(/iphone|ipad/gi);
                $(".apple").length ? $(".apple").html(t + "</br>" + i) : $("#db-content").append('<p class="apple">' + t + "</p>")
            }
            window.initAppleDesc = t,
            window.refreshAppleDesc = i
        }(Zepto)
    }
    , {}],
    11: [function(t, i, e) {
        !function() {
            function t() {
                if (!history.state) {
                    var t = location.href;
                    history.replaceState({
                        page: "intercept",
                        entered: !1
                    }, "", intercetpUrl),
                    history.pushState({
                        page: "current"
                    }, "", t)
                }
                window.onpopstate = function() {
                    history.state && "intercept" == history.state.page && (history.state.entered || (history.replaceState({
                        page: "intercept",
                        entered: !0
                    }, "", intercetpUrl),
                    e(function() {
                        location.reload()
                    })))
                }
            }
            function i() {
                $.ajax({
                    url: "/activity/getReturnPage",
                    type: "get",
                    data: {
                        slotId: n("slotId"),
                        id: n("id"),
                        login: n("login"),
                        appKey: n("appKey"),
                        deviceId: n("deviceId")
                    },
                    dataType: "json",
                    success: function(i) {
                        i.success && (window.intercetpUrl = i.data.url,
                        intercetpUrl && t())
                    },
                    error: function() {
                        console.log("network error")
                    }
                })
            }
            function e(t) {
                $.ajax({
                    url: "/activity/updateReturnTimes",
                    type: "post",
                    data: {
                        slotId: n("slotId")
                    },
                    dataType: "json",
                    success: function(i) {
                        i.success ? t & t() : console.log("Update times error")
                    },
                    error: function() {
                        console.log("network error")
                    }
                })
            }
            function o() {
                return !(!n("tenter") || "SOW" !== n("tenter"))
            }
            function n(t) {
                var i = "[\\?&]" + t + "=([^&#]*)"
                  , e = new RegExp(i)
                  , o = e.exec(location.href);
                return null === o ? "" : o[1]
            }
            $(function() {
                history.pushState && (history.state ? window.onpopstate = function(t) {
                    history.state && "current" == history.state.page ? location.reload() : history.state && "intercept" == history.state.page && (history.state.entered ? history.go(-1) : (history.state.entered = !0,
                    e(function() {
                        location.reload()
                    })))
                }
                : o() && i())
            })
        }(Zepto)
    }
    , {}],
    12: [function(t, i, e) {
        !function() {
            function t(t, i, e) {
                i = new Image,
                e && "function" == typeof "".ossimg && (t = t.ossimg()),
                i.src = t,
                i.onload = i.onerror = function() {
                    i.onload = i.onerror = null,
                    i = null
                }
            }
            var i = function(i) {
                var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                if ("string" == typeof i) {
                    var o;
                    t(i, o, e)
                } else {
                    var n = new Array;
                    i.forEach(function(i, o) {
                        t(i, n[o], e)
                    })
                }
            };
            window.preload = i
        }(Zepto)
    }
    , {}],
    13: [function(t, i, e) {
        !function(t) {
            t(function() {
                var i = {
                    show: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        t(".buoy").length || (CFG.isShowBuoy || e) && i.ajax(function(i) {
                            if (i) {
                                var e = t('<a class="buoy" style="display:block;position:absolute;top:0;left:0;right:0;z-index:100;" href=' + i.buoyDestUrl + "></a>");
                                e.append(i.styleCode),
                                t("body").append(e),
                                window.DB && window.DB.exposure && window.DB.exposure.singleExp(i.stBuoyInfo);
                                var o, n, s, r = i.id, a = {}, l = new Date, c = String(l.getFullYear()) + String(l.getMonth() + 1) + String(l.getDate());
                                o = window.localStorage.getItem("buoyData") || "{}";
                                try {
                                    s = JSON.parse(o)
                                } catch (h) {
                                    s = {},
                                    console.error(h)
                                }
                                buoyArray = s[c] || [],
                                buoyArray.includes(r) || (t("#buoy").addClass("animate"),
                                buoyArray.push(r)),
                                a[c] = buoyArray;
                                try {
                                    n = JSON.stringify(a)
                                } catch (h) {
                                    console.error(h)
                                }
                                window.localStorage.setItem("buoyData", n)
                            }
                        })
                    },
                    hide: function() {
                        t(".buoy").remove()
                    },
                    ajax: function(i) {
                        var e = this
                          , o = {
                            id: CFG.activityId
                        };
                        e.getparam("slotId") && (o.slotId = e.getparam("slotId")),
                        e.getparam("login") && (o.login = e.getparam("login")),
                        e.getparam("appKey") && (o.appKey = e.getparam("appKey")),
                        t.cookie("_coll_device") && (o.deviceId = t.cookie("_coll_device")),
                        t.ajax({
                            url: "/activity/getBuoy",
                            type: "get",
                            dataType: "json",
                            data: o,
                            success: function(t) {
                                t.success && i && i(t.data)
                            },
                            error: function() {
                                console.log("get recommend queue error")
                            }
                        })
                    },
                    getparam: function(t) {
                        var i = "[\\?&]" + t + "=([^&#]*)"
                          , e = new RegExp(i)
                          , o = e.exec(location.href);
                        return null === o ? "" : o[1]
                    }
                };
                window.buoy = i
            })
        }(Zepto)
    }
    , {}],
    14: [function(t, i, e) {
        !function(i) {
            var e = t("./ruleModal")
              , o = t("./ruleModal-zcd")
              , n = t("./ruleModal-ggk");
            switch (window.CFG.skinName) {
            case "scratchCard_1":
                new n({
                    modal: !1,
                    trigger: ".rule"
                });
                break;
            case "smashg_2":
                new o({
                    modal: !1,
                    trigger: ".rule"
                });
                break;
            default:
                new e({
                    modal: !1,
                    trigger: ".rule"
                })
            }
        }(Zepto)
    }
    , {
        "./ruleModal": 17,
        "./ruleModal-ggk": 15,
        "./ruleModal-zcd": 16
    }],
    15: [function(t, i, e) {
        var o = function(t) {
            var i = {
                probability: !0,
                iscroll: !0,
                rule: "",
                modal: !1,
                trigger: ".rule"
            };
            this.rulesScroll = null,
            this.options = $.extend({}, i, t),
            this.$trigger = $(this.options.trigger),
            this.init()
        };
        o.prototype.init = function() {
            var t = "活动说明"
              , i = "更多概率说明"
              , e = "//yun.tuisnake.com/h5-mami/activity/common/bg_rule2.png";
            window.CFG && 1 == CFG.overseas && (t = "Activity explanation",
            i = "More explanation for possibility",
            e = "//yun.tuisnake.com/h5-mami/activity/common/bg_rule2-overseas.png");
            var o = this.options.modal ? "block" : "none";
            _html = '<div class="rule-modal rule-modal-ggk" style="display: ' + o + ';">\n        <div class="bg-rule" style="background-image:url(' + e + ');">\n          <div class="rule-modal-dialog">\n            <header><i></i><span>' + t + '</span><i></i></header>\n            <section class="scroll-box">\n              <div>\n                <div class="description rule-3">\n                  <div class="description-scroller">' + this.options.rule + "</div>\n                </div>",
            this.options.probability && (_html += '<div class="probability rule-3">\n            <div class="nav"><span>' + i + '</span><i></i></div>\n            <div class="text">\n              <div class="probability-wrapper rule-3">\n                <div class="probability-scroller"></div>\n              </div>\n            </div>\n          </div>\n        </div>'),
            _html += '</div>\n            </section>\n          <div class="close"></div>\n        </div>\n      </div>',
            $("body").append(_html),
            window.requireStyle && this.render(),
            this.events()
        }
        ,
        o.prototype.render = function() {
            var t = [[".description-scroller", "html", "ruleText"]];
            requireStyle.init("", t, !1),
            requireStyle.getStyle("probabilityText") && (requireStyle.setConfig(".probability-scroller", "html", "probabilityText"),
            $(".probability").show())
        }
        ,
        o.prototype.events = function() {
            var t = this;
            this.$trigger.on("click", function() {
                t.show()
            }),
            $(".rule-modal .close").on("click", function(i) {
                i.stopPropagation(),
                t.hide()
            }),
            $(".rule-modal .rule-modal-dialog").on("click", function(t) {
                t.stopPropagation()
            }),
            $(".rule-modal").on("click", function() {
                t.hide()
            }),
            $(".probability .nav").on("tap", function() {
                t.showProbability()
            })
        }
        ,
        o.prototype.show = function() {
            window.DB && window.DB.exposure && window.DB.exposure.singleClk({
                data: embedData.st_info_rule_click
            }),
            $(".rule-modal").show(),
            window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_exposure),
            $("#db-content").addClass("filter"),
            document.ontouchmove = function(t) {
                t.preventDefault()
            }
            ,
            this.options.iscroll && (this.rulesScroll = new IScroll(".scroll-box",{
                mouseWheel: !0,
                scrollbars: !0,
                shrinkScrollbars: "scale",
                click: !0,
                tap: !0
            }))
        }
        ,
        o.prototype.hide = function() {
            window.DB.exposure.singleClk({
                data: embedData.st_info_rule_close_click,
                callback: function() {
                    console.log("规则关闭埋点成功")
                }
            });
            $(".rule-modal").hide(),
            $("#db-content").removeClass("filter"),
            document.ontouchmove = null,
            this.rulesScroll && this.rulesScroll.destroy()
        }
        ,
        o.prototype.showProbability = function() {
            $(".probability").toggleClass("active"),
            this.rulesScroll.refresh(),
            $(".probability").hasClass("active") ? window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_more_click) : window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_less_click),
            $(".description .iScrollVerticalScrollbar").toggleClass("fade")
        }
        ,
        i.exports = o
    }
    , {}],
    16: [function(t, i, e) {
        var o = function(t) {
            var i = {
                probability: !0,
                iscroll: !0,
                rule: "",
                modal: !1,
                trigger: ".rule"
            };
            this.rulesScroll = null,
            this.options = $.extend({}, i, t),
            this.$trigger = $(this.options.trigger),
            this.init()
        };
        o.prototype.init = function() {
            var t = "活动说明"
              , i = "更多概率说明"
              , e = "//yun.tuisnake.com/h5-mami/activity/common/bg_rule.png";
            window.CFG && 1 == CFG.overseas && (t = "Activity explanation",
            i = "More explanation for possibility",
            e = "//yun.tuisnake.com/h5-mami/activity/common/bg_rule-overseas.png");
            var o = this.options.modal ? "block" : "none";
            _html = '<div class="rule-modal rule-modal-zcd" style="display: ' + o + ';">\n        <div class="bg-rule" style="background-image:url(' + e + ');">\n          <div class="rule-modal-dialog">\n            <header><i></i><span>' + t + '</span><i></i></header>\n            <section class="scroll-box">\n              <div>\n                <div class="description rule-3">\n                  <div class="description-scroller">' + this.options.rule + "</div>\n                </div>",
            this.options.probability && (_html += '<div class="probability rule-3">\n            <div class="nav"><span>' + i + '</span><i></i></div>\n            <div class="text">\n              <div class="probability-wrapper rule-3">\n                <div class="probability-scroller"></div>\n              </div>\n            </div>\n          </div>\n        </div>'),
            _html += '</div>\n            </section>\n          <div class="close"></div>\n        </div>\n      </div>',
            $("body").append(_html),
            window.requireStyle && this.render(),
            this.events()
        }
        ,
        o.prototype.render = function() {
            var t = [[".description-scroller", "html", "ruleText"]];
            requireStyle.init("", t, !1),
            requireStyle.getStyle("probabilityText") && (requireStyle.setConfig(".probability-scroller", "html", "probabilityText"),
            $(".probability").show())
        }
        ,
        o.prototype.events = function() {
            var t = this;
            this.$trigger.on("click", function() {
                t.show()
            }),
            $(".rule-modal .close").on("click", function(i) {
                i.stopPropagation(),
                t.hide()
            }),
            $(".rule-modal .rule-modal-dialog").on("click", function(t) {
                t.stopPropagation()
            }),
            $(".rule-modal").on("click", function() {
                t.hide()
            }),
            $(".probability .nav").on("tap", function() {
                t.showProbability()
            })
        }
        ,
        o.prototype.show = function() {
            window.DB && window.DB.exposure && window.DB.exposure.singleClk({
                data: embedData.st_info_rule_click
            }),
            $(".rule-modal").show(),
            window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_exposure),
            $("#db-content").addClass("filter"),
            document.ontouchmove = function(t) {
                t.preventDefault()
            }
            ,
            this.options.iscroll && (this.rulesScroll = new IScroll(".scroll-box",{
                mouseWheel: !0,
                scrollbars: !0,
                shrinkScrollbars: "scale",
                click: !0,
                tap: !0
            }))
        }
        ,
        o.prototype.hide = function() {
            window.DB.exposure.singleClk({
                data: embedData.st_info_rule_close_click,
                callback: function() {
                    console.log("规则关闭埋点成功")
                }
            });
            $(".rule-modal").hide(),
            $("#db-content").removeClass("filter"),
            document.ontouchmove = null,
            this.rulesScroll && this.rulesScroll.destroy()
        }
        ,
        o.prototype.showProbability = function() {
            $(".probability").toggleClass("active"),
            this.rulesScroll.refresh(),
            $(".probability").hasClass("active") ? window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_more_click) : window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_less_click),
            $(".description .iScrollVerticalScrollbar").toggleClass("fade")
        }
        ,
        i.exports = o
    }
    , {}],
    17: [function(t, i, e) {
        var o = function(t) {
            var i = {
                probability: !0,
                iscroll: !0,
                rule: "",
                modal: !1,
                trigger: ".rule"
            };
            this.rulesScroll = null,
            this.options = $.extend({}, i, t),
            this.$trigger = $(this.options.trigger),
            this.init()
        };
        o.prototype.init = function() {
            var t = "活动说明"
              , i = "更多概率说明";
            window.CFG && 1 == CFG.overseas && (t = "Activity Rules",
            i = "More explanation for possibility ");
            var e = this.options.modal ? "block" : "none";
            _html = '<div class="rule-modal" style="display: ' + e + ';">\n        <div class="rule-modal-dialog">\n          <header><i></i><span>' + t + '</span><i></i></header>\n          <section class="scroll-box">\n            <div>\n              <div class="description rule-3">\n                <div class="description-scroller">' + this.options.rule + "</div>\n              </div>",
            this.options.probability && (_html += '<div class="probability rule-3">\n          <div class="nav"><span>' + i + '</span><i></i></div>\n          <div class="text">\n            <div class="probability-wrapper rule-3">\n              <div class="probability-scroller"></div>\n            </div>\n          </div>\n        </div>'),
            _html += '</div>\n            </section>\n          <div class="close"></div>\n        </div>\n      </div>',
            $("body").append(_html),
            window.requireStyle && this.render(),
            this.events()
        }
        ,
        o.prototype.render = function() {
            $("head").append("<style>.rule-modal .rule-modal-dialog section .probability .nav i{border-top-color: " + requireStyle.getStyle("probabilityColor") + ";border-left-color: " + requireStyle.getStyle("probabilityColor") + ";}</style>");
            var t = [[".rule-modal .rule-modal-dialog", "backgroundColor", "ruleBgColor"], [".rule-modal .rule-modal-dialog section .probability", "backgroundColor", "ruleBgColor"], [".rule-modal .rule-modal-dialog header span,.rule-modal .rule-modal-dialog section .description", "color", "ruleTextColor"], [".rule-modal .rule-modal-dialog header i", "backgroundColor", "ruleTextColor"], [".rule-modal .rule-modal-dialog .close", "color", "ruleTextColor"], [".rule-modal .rule-modal-dialog section .probability .nav", "backgroundColor", "probabilityBg"], [".rule-modal .rule-modal-dialog section .probability .nav span", "color", "probabilityColor"], [".rule-modal .rule-modal-dialog section .probability.active .text", "color", "ruleTextColor"], [".description-scroller", "html", "ruleText"]];
            requireStyle.init("", t, !1),
            requireStyle.getStyle("probabilityText") && (requireStyle.setConfig(".probability-scroller", "html", "probabilityText"),
            $(".probability").show())
        }
        ,
        o.prototype.events = function() {
            var t = this;
            this.$trigger.on("click", function() {
                t.show()
            }),
            $(".rule-modal .close").on("click", function(i) {
                i.stopPropagation(),
                t.hide()
            }),
            $(".rule-modal .rule-modal-dialog").on("click", function(t) {
                t.stopPropagation()
            }),
            $(".rule-modal").on("click", function() {
                t.hide()
            }),
            $(".probability .nav").on("tap", function() {
                t.showProbability()
            })
        }
        ,
        o.prototype.show = function() {
            window.DB && window.DB.exposure && window.DB.exposure.singleClk({
                data: embedData.st_info_rule_click
            }),
            $(".rule-modal").show(),
            window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_exposure),
            $("#db-content").addClass("filter"),
            document.ontouchmove = function(t) {
                t.preventDefault()
            }
            ,
            this.options.iscroll && (this.rulesScroll = new IScroll(".scroll-box",{
                mouseWheel: !0,
                scrollbars: !0,
                shrinkScrollbars: "scale",
                click: !0,
                tap: !0
            }))
        }
        ,
        o.prototype.hide = function() {
            window.DB.exposure.singleClk({
                data: embedData.st_info_rule_close_click,
                callback: function() {
                    console.log("规则关闭埋点成功")
                }
            });
            $(".rule-modal").hide(),
            $("#db-content").removeClass("filter"),
            document.ontouchmove = null,
            this.rulesScroll && this.rulesScroll.destroy()
        }
        ,
        o.prototype.showProbability = function() {
            $(".probability").toggleClass("active"),
            this.rulesScroll.refresh(),
            $(".probability").hasClass("active") ? window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_more_click) : window.DB && window.DB.exposure && window.DB.exposure.singleExp(embedData.st_info_rule_less_click),
            $(".description .iScrollVerticalScrollbar").toggleClass("fade")
        }
        ,
        i.exports = o
    }
    , {}],
    18: [function(t, i, e) {
        var o = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        ;
        !function(t, i, e) {
            function n(e, o) {
                this.wrapper = "string" == typeof e ? i.querySelector(e) : e,
                this.scroller = this.wrapper.children[0],
                this.scrollerStyle = this.scroller.style,
                this.options = {
                    resizeScrollbars: !0,
                    mouseWheelSpeed: 20,
                    snapThreshold: .334,
                    disablePointer: !l.hasPointer,
                    disableTouch: l.hasPointer || !l.hasTouch,
                    disableMouse: l.hasPointer || l.hasTouch,
                    startX: 0,
                    startY: 0,
                    scrollY: !0,
                    directionLockThreshold: 5,
                    momentum: !0,
                    bounce: !0,
                    bounceTime: 600,
                    bounceEasing: "",
                    preventDefault: !0,
                    preventDefaultException: {
                        tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                    },
                    HWCompositing: !0,
                    useTransition: !0,
                    useTransform: !0,
                    bindToWrapper: "undefined" == typeof t.onmousedown
                };
                for (var n in o)
                    this.options[n] = o[n];
                this.translateZ = this.options.HWCompositing && l.hasPerspective ? " translateZ(0)" : "",
                this.options.useTransition = l.hasTransition && this.options.useTransition,
                this.options.useTransform = l.hasTransform && this.options.useTransform,
                this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough,
                this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
                this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY,
                this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX,
                this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
                this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
                this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? l.ease[this.options.bounceEasing] || l.ease.circular : this.options.bounceEasing,
                this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
                this.options.tap === !0 && (this.options.tap = "tap"),
                "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1),
                this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1,
                this.x = 0,
                this.y = 0,
                this.directionX = 0,
                this.directionY = 0,
                this._events = {},
                this._init(),
                this.refresh(),
                this.scrollTo(this.options.startX, this.options.startY),
                this.enable()
            }
            function s(t, e, o) {
                var n = i.createElement("div")
                  , s = i.createElement("div");
                return o === !0 && (n.style.cssText = "position:absolute;z-index:9999",
                s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"),
                s.className = "iScrollIndicator",
                "h" == t ? (o === !0 && (n.style.cssText += ";height:7px;left:2px;right:2px;bottom:0",
                s.style.height = "100%"),
                n.className = "iScrollHorizontalScrollbar") : (o === !0 && (n.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px",
                s.style.width = "100%"),
                n.className = "iScrollVerticalScrollbar"),
                n.style.cssText += ";overflow:hidden",
                e || (n.style.pointerEvents = "none"),
                n.appendChild(s),
                n
            }
            function r(e, o) {
                this.wrapper = "string" == typeof o.el ? i.querySelector(o.el) : o.el,
                this.wrapperStyle = this.wrapper.style,
                this.indicator = this.wrapper.children[0],
                this.indicatorStyle = this.indicator.style,
                this.scroller = e,
                this.options = {
                    listenX: !0,
                    listenY: !0,
                    interactive: !1,
                    resize: !0,
                    defaultScrollbars: !1,
                    shrink: !1,
                    fade: !1,
                    speedRatioX: 0,
                    speedRatioY: 0
                };
                for (var n in o)
                    this.options[n] = o[n];
                if (this.sizeRatioX = 1,
                this.sizeRatioY = 1,
                this.maxPosX = 0,
                this.maxPosY = 0,
                this.options.interactive && (this.options.disableTouch || (l.addEvent(this.indicator, "touchstart", this),
                l.addEvent(t, "touchend", this)),
                this.options.disablePointer || (l.addEvent(this.indicator, l.prefixPointerEvent("pointerdown"), this),
                l.addEvent(t, l.prefixPointerEvent("pointerup"), this)),
                this.options.disableMouse || (l.addEvent(this.indicator, "mousedown", this),
                l.addEvent(t, "mouseup", this))),
                this.options.fade) {
                    this.wrapperStyle[l.style.transform] = this.scroller.translateZ;
                    var s = l.style.transitionDuration;
                    this.wrapperStyle[s] = l.isBadAndroid ? "0.0001ms" : "0ms";
                    var r = this;
                    l.isBadAndroid && a(function() {
                        "0.0001ms" === r.wrapperStyle[s] && (r.wrapperStyle[s] = "0s")
                    }),
                    this.wrapperStyle.opacity = "0"
                }
            }
            var a = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
                t.setTimeout(i, 1e3 / 60)
            }
              , l = function() {
                function n(t) {
                    return a !== !1 && ("" === a ? t : a + t.charAt(0).toUpperCase() + t.substr(1))
                }
                var s = {}
                  , r = i.createElement("div").style
                  , a = function() {
                    for (var t, i = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, o = i.length; e < o; e++)
                        if (t = i[e] + "ransform",
                        t in r)
                            return i[e].substr(0, i[e].length - 1);
                    return !1
                }();
                s.getTime = Date.now || function() {
                    return (new Date).getTime()
                }
                ,
                s.extend = function(t, i) {
                    for (var e in i)
                        t[e] = i[e]
                }
                ,
                s.addEvent = function(t, i, e, o) {
                    t.addEventListener(i, e, !!o)
                }
                ,
                s.removeEvent = function(t, i, e, o) {
                    t.removeEventListener(i, e, !!o)
                }
                ,
                s.prefixPointerEvent = function(i) {
                    return t.MSPointerEvent ? "MSPointer" + i.charAt(7).toUpperCase() + i.substr(8) : i
                }
                ,
                s.momentum = function(t, i, o, n, s, r) {
                    var a, l, c = t - i, h = e.abs(c) / o;
                    return r = void 0 === r ? 6e-4 : r,
                    a = t + h * h / (2 * r) * (c < 0 ? -1 : 1),
                    l = h / r,
                    a < n ? (a = s ? n - s / 2.5 * (h / 8) : n,
                    c = e.abs(a - t),
                    l = c / h) : a > 0 && (a = s ? s / 2.5 * (h / 8) : 0,
                    c = e.abs(t) + a,
                    l = c / h),
                    {
                        destination: e.round(a),
                        duration: l
                    }
                }
                ;
                var l = n("transform");
                return s.extend(s, {
                    hasTransform: l !== !1,
                    hasPerspective: n("perspective")in r,
                    hasTouch: "ontouchstart"in t,
                    hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
                    hasTransition: n("transition")in r
                }),
                s.isBadAndroid = function() {
                    var i = t.navigator.appVersion;
                    if (/Android/.test(i) && !/Chrome\/\d/.test(i)) {
                        var e = i.match(/Safari\/(\d+.\d)/);
                        return !(e && "object" === ("undefined" == typeof e ? "undefined" : o(e)) && e.length >= 2) || parseFloat(e[1]) < 535.19
                    }
                    return !1
                }(),
                s.extend(s.style = {}, {
                    transform: l,
                    transitionTimingFunction: n("transitionTimingFunction"),
                    transitionDuration: n("transitionDuration"),
                    transitionDelay: n("transitionDelay"),
                    transformOrigin: n("transformOrigin")
                }),
                s.hasClass = function(t, i) {
                    var e = new RegExp("(^|\\s)" + i + "(\\s|$)");
                    return e.test(t.className)
                }
                ,
                s.addClass = function(t, i) {
                    if (!s.hasClass(t, i)) {
                        var e = t.className.split(" ");
                        e.push(i),
                        t.className = e.join(" ")
                    }
                }
                ,
                s.removeClass = function(t, i) {
                    if (s.hasClass(t, i)) {
                        var e = new RegExp("(^|\\s)" + i + "(\\s|$)","g");
                        t.className = t.className.replace(e, " ")
                    }
                }
                ,
                s.offset = function(t) {
                    for (var i = -t.offsetLeft, e = -t.offsetTop; t = t.offsetParent; )
                        i -= t.offsetLeft,
                        e -= t.offsetTop;
                    return {
                        left: i,
                        top: e
                    }
                }
                ,
                s.preventDefaultException = function(t, i) {
                    for (var e in i)
                        if (i[e].test(t[e]))
                            return !0;
                    return !1
                }
                ,
                s.extend(s.eventType = {}, {
                    touchstart: 1,
                    touchmove: 1,
                    touchend: 1,
                    mousedown: 2,
                    mousemove: 2,
                    mouseup: 2,
                    pointerdown: 3,
                    pointermove: 3,
                    pointerup: 3,
                    MSPointerDown: 3,
                    MSPointerMove: 3,
                    MSPointerUp: 3
                }),
                s.extend(s.ease = {}, {
                    quadratic: {
                        style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fn: function(t) {
                            return t * (2 - t)
                        }
                    },
                    circular: {
                        style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                        fn: function(t) {
                            return e.sqrt(1 - --t * t)
                        }
                    },
                    back: {
                        style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        fn: function(t) {
                            var i = 4;
                            return (t -= 1) * t * ((i + 1) * t + i) + 1
                        }
                    },
                    bounce: {
                        style: "",
                        fn: function(t) {
                            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                        }
                    },
                    elastic: {
                        style: "",
                        fn: function(t) {
                            var i = .22
                              , o = .4;
                            return 0 === t ? 0 : 1 == t ? 1 : o * e.pow(2, -10 * t) * e.sin((t - i / 4) * (2 * e.PI) / i) + 1
                        }
                    }
                }),
                s.tap = function(t, e) {
                    var o = i.createEvent("Event");
                    o.initEvent(e, !0, !0),
                    o.pageX = t.pageX,
                    o.pageY = t.pageY,
                    t.target.dispatchEvent(o)
                }
                ,
                s.click = function(t) {
                    var e, o = t.target;
                    /(SELECT|INPUT|TEXTAREA)/i.test(o.tagName) || (e = i.createEvent("MouseEvents"),
                    e.initMouseEvent("click", !0, !0, t.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null),
                    e._constructed = !0,
                    o.dispatchEvent(e))
                }
                ,
                s
            }();
            n.prototype = {
                version: "5.2.0",
                _init: function() {
                    this._initEvents(),
                    (this.options.scrollbars || this.options.indicators) && this._initIndicators(),
                    this.options.mouseWheel && this._initWheel(),
                    this.options.snap && this._initSnap(),
                    this.options.keyBindings && this._initKeys()
                },
                destroy: function() {
                    this._initEvents(!0),
                    clearTimeout(this.resizeTimeout),
                    this.resizeTimeout = null,
                    this._execEvent("destroy")
                },
                _transitionEnd: function(t) {
                    t.target == this.scroller && this.isInTransition && (this._transitionTime(),
                    this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1,
                    this._execEvent("scrollEnd")))
                },
                _start: function(t) {
                    if (1 != l.eventType[t.type]) {
                        var i;
                        if (i = t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2,
                        0 !== i)
                            return
                    }
                    if (this.enabled && (!this.initiated || l.eventType[t.type] === this.initiated)) {
                        !this.options.preventDefault || l.isBadAndroid || l.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                        var o, n = t.touches ? t.touches[0] : t;
                        this.initiated = l.eventType[t.type],
                        this.moved = !1,
                        this.distX = 0,
                        this.distY = 0,
                        this.directionX = 0,
                        this.directionY = 0,
                        this.directionLocked = 0,
                        this.startTime = l.getTime(),
                        this.options.useTransition && this.isInTransition ? (this._transitionTime(),
                        this.isInTransition = !1,
                        o = this.getComputedPosition(),
                        this._translate(e.round(o.x), e.round(o.y)),
                        this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1,
                        this._execEvent("scrollEnd")),
                        this.startX = this.x,
                        this.startY = this.y,
                        this.absStartX = this.x,
                        this.absStartY = this.y,
                        this.pointX = n.pageX,
                        this.pointY = n.pageY,
                        this._execEvent("beforeScrollStart")
                    }
                },
                _move: function(t) {
                    if (this.enabled && l.eventType[t.type] === this.initiated) {
                        this.options.preventDefault && t.preventDefault();
                        var i, o, n, s, r = t.touches ? t.touches[0] : t, a = r.pageX - this.pointX, c = r.pageY - this.pointY, h = l.getTime();
                        if (this.pointX = r.pageX,
                        this.pointY = r.pageY,
                        this.distX += a,
                        this.distY += c,
                        n = e.abs(this.distX),
                        s = e.abs(this.distY),
                        !(h - this.endTime > 300 && n < 10 && s < 10)) {
                            if (this.directionLocked || this.options.freeScroll || (n > s + this.options.directionLockThreshold ? this.directionLocked = "h" : s >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"),
                            "h" == this.directionLocked) {
                                if ("vertical" == this.options.eventPassthrough)
                                    t.preventDefault();
                                else if ("horizontal" == this.options.eventPassthrough)
                                    return void (this.initiated = !1);
                                c = 0
                            } else if ("v" == this.directionLocked) {
                                if ("horizontal" == this.options.eventPassthrough)
                                    t.preventDefault();
                                else if ("vertical" == this.options.eventPassthrough)
                                    return void (this.initiated = !1);
                                a = 0
                            }
                            a = this.hasHorizontalScroll ? a : 0,
                            c = this.hasVerticalScroll ? c : 0,
                            i = this.x + a,
                            o = this.y + c,
                            (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + a / 3 : i > 0 ? 0 : this.maxScrollX),
                            (o > 0 || o < this.maxScrollY) && (o = this.options.bounce ? this.y + c / 3 : o > 0 ? 0 : this.maxScrollY),
                            this.directionX = a > 0 ? -1 : a < 0 ? 1 : 0,
                            this.directionY = c > 0 ? -1 : c < 0 ? 1 : 0,
                            this.moved || this._execEvent("scrollStart"),
                            this.moved = !0,
                            this._translate(i, o),
                            h - this.startTime > 300 && (this.startTime = h,
                            this.startX = this.x,
                            this.startY = this.y)
                        }
                    }
                },
                _end: function(t) {
                    if (this.enabled && l.eventType[t.type] === this.initiated) {
                        this.options.preventDefault && !l.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                        var i, o, n = (t.changedTouches ? t.changedTouches[0] : t,
                        l.getTime() - this.startTime), s = e.round(this.x), r = e.round(this.y), a = e.abs(s - this.startX), c = e.abs(r - this.startY), h = 0, d = "";
                        if (this.isInTransition = 0,
                        this.initiated = 0,
                        this.endTime = l.getTime(),
                        !this.resetPosition(this.options.bounceTime)) {
                            if (this.scrollTo(s, r),
                            !this.moved)
                                return this.options.tap && l.tap(t, this.options.tap),
                                this.options.click && l.click(t),
                                void this._execEvent("scrollCancel");
                            if (this._events.flick && n < 200 && a < 100 && c < 100)
                                return void this._execEvent("flick");
                            if (this.options.momentum && n < 300 && (i = this.hasHorizontalScroll ? l.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: s,
                                duration: 0
                            },
                            o = this.hasVerticalScroll ? l.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            },
                            s = i.destination,
                            r = o.destination,
                            h = e.max(i.duration, o.duration),
                            this.isInTransition = 1),
                            this.options.snap) {
                                var p = this._nearestSnap(s, r);
                                this.currentPage = p,
                                h = this.options.snapSpeed || e.max(e.max(e.min(e.abs(s - p.x), 1e3), e.min(e.abs(r - p.y), 1e3)), 300),
                                s = p.x,
                                r = p.y,
                                this.directionX = 0,
                                this.directionY = 0,
                                d = this.options.bounceEasing
                            }
                            return s != this.x || r != this.y ? ((s > 0 || s < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = l.ease.quadratic),
                            void this.scrollTo(s, r, h, d)) : void this._execEvent("scrollEnd")
                        }
                    }
                },
                _resize: function() {
                    var t = this;
                    clearTimeout(this.resizeTimeout),
                    this.resizeTimeout = setTimeout(function() {
                        t.refresh()
                    }, this.options.resizePolling)
                },
                resetPosition: function(t) {
                    var i = this.x
                      , e = this.y;
                    return t = t || 0,
                    !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX),
                    !this.hasVerticalScroll || this.y > 0 ? e = 0 : this.y < this.maxScrollY && (e = this.maxScrollY),
                    (i != this.x || e != this.y) && (this.scrollTo(i, e, t, this.options.bounceEasing),
                    !0)
                },
                disable: function() {
                    this.enabled = !1
                },
                enable: function() {
                    this.enabled = !0
                },
                refresh: function() {
                    this.wrapper.offsetHeight;
                    this.wrapperWidth = this.wrapper.clientWidth,
                    this.wrapperHeight = this.wrapper.clientHeight,
                    this.scrollerWidth = this.scroller.offsetWidth,
                    this.scrollerHeight = this.scroller.offsetHeight,
                    this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
                    this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
                    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
                    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
                    this.hasHorizontalScroll || (this.maxScrollX = 0,
                    this.scrollerWidth = this.wrapperWidth),
                    this.hasVerticalScroll || (this.maxScrollY = 0,
                    this.scrollerHeight = this.wrapperHeight),
                    this.endTime = 0,
                    this.directionX = 0,
                    this.directionY = 0,
                    this.wrapperOffset = l.offset(this.wrapper),
                    this._execEvent("refresh"),
                    this.resetPosition()
                },
                on: function(t, i) {
                    this._events[t] || (this._events[t] = []),
                    this._events[t].push(i)
                },
                off: function(t, i) {
                    if (this._events[t]) {
                        var e = this._events[t].indexOf(i);
                        e > -1 && this._events[t].splice(e, 1)
                    }
                },
                _execEvent: function(t) {
                    if (this._events[t]) {
                        var i = 0
                          , e = this._events[t].length;
                        if (e)
                            for (; i < e; i++)
                                this._events[t][i].apply(this, [].slice.call(arguments, 1))
                    }
                },
                scrollBy: function(t, i, e, o) {
                    t = this.x + t,
                    i = this.y + i,
                    e = e || 0,
                    this.scrollTo(t, i, e, o)
                },
                scrollTo: function(t, i, e, o) {
                    o = o || l.ease.circular,
                    this.isInTransition = this.options.useTransition && e > 0;
                    var n = this.options.useTransition && o.style;
                    !e || n ? (n && (this._transitionTimingFunction(o.style),
                    this._transitionTime(e)),
                    this._translate(t, i)) : this._animate(t, i, e, o.fn)
                },
                scrollToElement: function(t, i, o, n, s) {
                    if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                        var r = l.offset(t);
                        r.left -= this.wrapperOffset.left,
                        r.top -= this.wrapperOffset.top,
                        o === !0 && (o = e.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                        n === !0 && (n = e.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                        r.left -= o || 0,
                        r.top -= n || 0,
                        r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left,
                        r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top,
                        i = void 0 === i || null === i || "auto" === i ? e.max(e.abs(this.x - r.left), e.abs(this.y - r.top)) : i,
                        this.scrollTo(r.left, r.top, i, s)
                    }
                },
                _transitionTime: function(t) {
                    t = t || 0;
                    var i = l.style.transitionDuration;
                    if (this.scrollerStyle[i] = t + "ms",
                    !t && l.isBadAndroid) {
                        this.scrollerStyle[i] = "0.0001ms";
                        var e = this;
                        a(function() {
                            "0.0001ms" === e.scrollerStyle[i] && (e.scrollerStyle[i] = "0s")
                        })
                    }
                    if (this.indicators)
                        for (var o = this.indicators.length; o--; )
                            this.indicators[o].transitionTime(t)
                },
                _transitionTimingFunction: function(t) {
                    if (this.scrollerStyle[l.style.transitionTimingFunction] = t,
                    this.indicators)
                        for (var i = this.indicators.length; i--; )
                            this.indicators[i].transitionTimingFunction(t)
                },
                _translate: function(t, i) {
                    if (this.options.useTransform ? this.scrollerStyle[l.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = e.round(t),
                    i = e.round(i),
                    this.scrollerStyle.left = t + "px",
                    this.scrollerStyle.top = i + "px"),
                    this.x = t,
                    this.y = i,
                    this.indicators)
                        for (var o = this.indicators.length; o--; )
                            this.indicators[o].updatePosition()
                },
                _initEvents: function(i) {
                    var e = i ? l.removeEvent : l.addEvent
                      , o = this.options.bindToWrapper ? this.wrapper : t;
                    e(t, "orientationchange", this),
                    e(t, "resize", this),
                    this.options.click && e(this.wrapper, "click", this, !0),
                    this.options.disableMouse || (e(this.wrapper, "mousedown", this),
                    e(o, "mousemove", this),
                    e(o, "mousecancel", this),
                    e(o, "mouseup", this)),
                    l.hasPointer && !this.options.disablePointer && (e(this.wrapper, l.prefixPointerEvent("pointerdown"), this),
                    e(o, l.prefixPointerEvent("pointermove"), this),
                    e(o, l.prefixPointerEvent("pointercancel"), this),
                    e(o, l.prefixPointerEvent("pointerup"), this)),
                    l.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this),
                    e(o, "touchmove", this),
                    e(o, "touchcancel", this),
                    e(o, "touchend", this)),
                    e(this.scroller, "transitionend", this),
                    e(this.scroller, "webkitTransitionEnd", this),
                    e(this.scroller, "oTransitionEnd", this),
                    e(this.scroller, "MSTransitionEnd", this)
                },
                getComputedPosition: function() {
                    var i, e, o = t.getComputedStyle(this.scroller, null);
                    return this.options.useTransform ? (o = o[l.style.transform].split(")")[0].split(", "),
                    i = +(o[12] || o[4]),
                    e = +(o[13] || o[5])) : (i = +o.left.replace(/[^-\d.]/g, ""),
                    e = +o.top.replace(/[^-\d.]/g, "")),
                    {
                        x: i,
                        y: e
                    }
                },
                _initIndicators: function() {
                    function t(t) {
                        if (a.indicators)
                            for (var i = a.indicators.length; i--; )
                                t.call(a.indicators[i])
                    }
                    var i, e = this.options.interactiveScrollbars, o = "string" != typeof this.options.scrollbars, n = [], a = this;
                    this.indicators = [],
                    this.options.scrollbars && (this.options.scrollY && (i = {
                        el: s("v", e, this.options.scrollbars),
                        interactive: e,
                        defaultScrollbars: !0,
                        customStyle: o,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenX: !1
                    },
                    this.wrapper.appendChild(i.el),
                    n.push(i)),
                    this.options.scrollX && (i = {
                        el: s("h", e, this.options.scrollbars),
                        interactive: e,
                        defaultScrollbars: !0,
                        customStyle: o,
                        resize: this.options.resizeScrollbars,
                        shrink: this.options.shrinkScrollbars,
                        fade: this.options.fadeScrollbars,
                        listenY: !1
                    },
                    this.wrapper.appendChild(i.el),
                    n.push(i))),
                    this.options.indicators && (n = n.concat(this.options.indicators));
                    for (var l = n.length; l--; )
                        this.indicators.push(new r(this,n[l]));
                    this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                        t(function() {
                            this.fade()
                        })
                    }),
                    this.on("scrollCancel", function() {
                        t(function() {
                            this.fade()
                        })
                    }),
                    this.on("scrollStart", function() {
                        t(function() {
                            this.fade(1)
                        })
                    }),
                    this.on("beforeScrollStart", function() {
                        t(function() {
                            this.fade(1, !0)
                        })
                    })),
                    this.on("refresh", function() {
                        t(function() {
                            this.refresh()
                        })
                    }),
                    this.on("destroy", function() {
                        t(function() {
                            this.destroy()
                        }),
                        delete this.indicators
                    })
                },
                _initWheel: function() {
                    l.addEvent(this.wrapper, "wheel", this),
                    l.addEvent(this.wrapper, "mousewheel", this),
                    l.addEvent(this.wrapper, "DOMMouseScroll", this),
                    this.on("destroy", function() {
                        clearTimeout(this.wheelTimeout),
                        this.wheelTimeout = null,
                        l.removeEvent(this.wrapper, "wheel", this),
                        l.removeEvent(this.wrapper, "mousewheel", this),
                        l.removeEvent(this.wrapper, "DOMMouseScroll", this)
                    })
                },
                _wheel: function(t) {
                    if (this.enabled) {
                        t.preventDefault();
                        var i, o, n, s, r = this;
                        if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"),
                        clearTimeout(this.wheelTimeout),
                        this.wheelTimeout = setTimeout(function() {
                            r.options.snap || r._execEvent("scrollEnd"),
                            r.wheelTimeout = void 0
                        }, 400),
                        "deltaX"in t)
                            1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed,
                            o = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX,
                            o = -t.deltaY);
                        else if ("wheelDeltaX"in t)
                            i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed,
                            o = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                        else if ("wheelDelta"in t)
                            i = o = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                        else {
                            if (!("detail"in t))
                                return;
                            i = o = -t.detail / 3 * this.options.mouseWheelSpeed
                        }
                        if (i *= this.options.invertWheelDirection,
                        o *= this.options.invertWheelDirection,
                        this.hasVerticalScroll || (i = o,
                        o = 0),
                        this.options.snap)
                            return n = this.currentPage.pageX,
                            s = this.currentPage.pageY,
                            i > 0 ? n-- : i < 0 && n++,
                            o > 0 ? s-- : o < 0 && s++,
                            void this.goToPage(n, s);
                        n = this.x + e.round(this.hasHorizontalScroll ? i : 0),
                        s = this.y + e.round(this.hasVerticalScroll ? o : 0),
                        this.directionX = i > 0 ? -1 : i < 0 ? 1 : 0,
                        this.directionY = o > 0 ? -1 : o < 0 ? 1 : 0,
                        n > 0 ? n = 0 : n < this.maxScrollX && (n = this.maxScrollX),
                        s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY),
                        this.scrollTo(n, s, 0)
                    }
                },
                _initSnap: function() {
                    this.currentPage = {},
                    "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)),
                    this.on("refresh", function() {
                        var t, i, o, n, s, r, a = 0, l = 0, c = 0, h = this.options.snapStepX || this.wrapperWidth, d = this.options.snapStepY || this.wrapperHeight;
                        if (this.pages = [],
                        this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                            if (this.options.snap === !0)
                                for (o = e.round(h / 2),
                                n = e.round(d / 2); c > -this.scrollerWidth; ) {
                                    for (this.pages[a] = [],
                                    t = 0,
                                    s = 0; s > -this.scrollerHeight; )
                                        this.pages[a][t] = {
                                            x: e.max(c, this.maxScrollX),
                                            y: e.max(s, this.maxScrollY),
                                            width: h,
                                            height: d,
                                            cx: c - o,
                                            cy: s - n
                                        },
                                        s -= d,
                                        t++;
                                    c -= h,
                                    a++
                                }
                            else
                                for (r = this.options.snap,
                                t = r.length,
                                i = -1; a < t; a++)
                                    (0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0,
                                    i++),
                                    this.pages[l] || (this.pages[l] = []),
                                    c = e.max(-r[a].offsetLeft, this.maxScrollX),
                                    s = e.max(-r[a].offsetTop, this.maxScrollY),
                                    o = c - e.round(r[a].offsetWidth / 2),
                                    n = s - e.round(r[a].offsetHeight / 2),
                                    this.pages[l][i] = {
                                        x: c,
                                        y: s,
                                        width: r[a].offsetWidth,
                                        height: r[a].offsetHeight,
                                        cx: o,
                                        cy: n
                                    },
                                    c > this.maxScrollX && l++;
                            this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0),
                            this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold,
                            this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold),
                            this.snapThresholdY = e.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                        }
                    }),
                    this.on("flick", function() {
                        var t = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.x - this.startX), 1e3), e.min(e.abs(this.y - this.startY), 1e3)), 300);
                        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
                    })
                },
                _nearestSnap: function(t, i) {
                    if (!this.pages.length)
                        return {
                            x: 0,
                            y: 0,
                            pageX: 0,
                            pageY: 0
                        };
                    var o = 0
                      , n = this.pages.length
                      , s = 0;
                    if (e.abs(t - this.absStartX) < this.snapThresholdX && e.abs(i - this.absStartY) < this.snapThresholdY)
                        return this.currentPage;
                    for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX),
                    i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); o < n; o++)
                        if (t >= this.pages[o][0].cx) {
                            t = this.pages[o][0].x;
                            break
                        }
                    for (n = this.pages[o].length; s < n; s++)
                        if (i >= this.pages[0][s].cy) {
                            i = this.pages[0][s].y;
                            break
                        }
                    return o == this.currentPage.pageX && (o += this.directionX,
                    o < 0 ? o = 0 : o >= this.pages.length && (o = this.pages.length - 1),
                    t = this.pages[o][0].x),
                    s == this.currentPage.pageY && (s += this.directionY,
                    s < 0 ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1),
                    i = this.pages[0][s].y),
                    {
                        x: t,
                        y: i,
                        pageX: o,
                        pageY: s
                    }
                },
                goToPage: function(t, i, o, n) {
                    n = n || this.options.bounceEasing,
                    t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0),
                    i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                    var s = this.pages[t][i].x
                      , r = this.pages[t][i].y;
                    o = void 0 === o ? this.options.snapSpeed || e.max(e.max(e.min(e.abs(s - this.x), 1e3), e.min(e.abs(r - this.y), 1e3)), 300) : o,
                    this.currentPage = {
                        x: s,
                        y: r,
                        pageX: t,
                        pageY: i
                    },
                    this.scrollTo(s, r, o, n)
                },
                next: function(t, i) {
                    var e = this.currentPage.pageX
                      , o = this.currentPage.pageY;
                    e++,
                    e >= this.pages.length && this.hasVerticalScroll && (e = 0,
                    o++),
                    this.goToPage(e, o, t, i)
                },
                prev: function(t, i) {
                    var e = this.currentPage.pageX
                      , o = this.currentPage.pageY;
                    e--,
                    e < 0 && this.hasVerticalScroll && (e = 0,
                    o--),
                    this.goToPage(e, o, t, i)
                },
                _initKeys: function(i) {
                    var e, n = {
                        pageUp: 33,
                        pageDown: 34,
                        end: 35,
                        home: 36,
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40
                    };
                    if ("object" == o(this.options.keyBindings))
                        for (e in this.options.keyBindings)
                            "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
                    else
                        this.options.keyBindings = {};
                    for (e in n)
                        this.options.keyBindings[e] = this.options.keyBindings[e] || n[e];
                    l.addEvent(t, "keydown", this),
                    this.on("destroy", function() {
                        l.removeEvent(t, "keydown", this)
                    })
                },
                _key: function(t) {
                    if (this.enabled) {
                        var i, o = this.options.snap, n = o ? this.currentPage.pageX : this.x, s = o ? this.currentPage.pageY : this.y, r = l.getTime(), a = this.keyTime || 0, c = .25;
                        switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(),
                        this._translate(e.round(i.x), e.round(i.y)),
                        this.isInTransition = !1),
                        this.keyAcceleration = r - a < 200 ? e.min(this.keyAcceleration + c, 50) : 0,
                        t.keyCode) {
                        case this.options.keyBindings.pageUp:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? n += o ? 1 : this.wrapperWidth : s += o ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.pageDown:
                            this.hasHorizontalScroll && !this.hasVerticalScroll ? n -= o ? 1 : this.wrapperWidth : s -= o ? 1 : this.wrapperHeight;
                            break;
                        case this.options.keyBindings.end:
                            n = o ? this.pages.length - 1 : this.maxScrollX,
                            s = o ? this.pages[0].length - 1 : this.maxScrollY;
                            break;
                        case this.options.keyBindings.home:
                            n = 0,
                            s = 0;
                            break;
                        case this.options.keyBindings.left:
                            n += o ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.up:
                            s += o ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.right:
                            n -= o ? -1 : 5 + this.keyAcceleration >> 0;
                            break;
                        case this.options.keyBindings.down:
                            s -= o ? 1 : 5 + this.keyAcceleration >> 0;
                            break;
                        default:
                            return
                        }
                        if (o)
                            return void this.goToPage(n, s);
                        n > 0 ? (n = 0,
                        this.keyAcceleration = 0) : n < this.maxScrollX && (n = this.maxScrollX,
                        this.keyAcceleration = 0),
                        s > 0 ? (s = 0,
                        this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY,
                        this.keyAcceleration = 0),
                        this.scrollTo(n, s, 0),
                        this.keyTime = r
                    }
                },
                _animate: function(t, i, e, o) {
                    function n() {
                        var p, u, f, m = l.getTime();
                        return m >= d ? (s.isAnimating = !1,
                        s._translate(t, i),
                        void (s.resetPosition(s.options.bounceTime) || s._execEvent("scrollEnd"))) : (m = (m - h) / e,
                        f = o(m),
                        p = (t - r) * f + r,
                        u = (i - c) * f + c,
                        s._translate(p, u),
                        void (s.isAnimating && a(n)))
                    }
                    var s = this
                      , r = this.x
                      , c = this.y
                      , h = l.getTime()
                      , d = h + e;
                    this.isAnimating = !0,
                    n()
                },
                handleEvent: function(t) {
                    switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._wheel(t);
                        break;
                    case "keydown":
                        this._key(t);
                        break;
                    case "click":
                        this.enabled && !t._constructed && (t.preventDefault(),
                        t.stopPropagation())
                    }
                }
            },
            r.prototype = {
                handleEvent: function(t) {
                    switch (t.type) {
                    case "touchstart":
                    case "pointerdown":
                    case "MSPointerDown":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "pointermove":
                    case "MSPointerMove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "pointerup":
                    case "MSPointerUp":
                    case "mouseup":
                    case "touchcancel":
                    case "pointercancel":
                    case "MSPointerCancel":
                    case "mousecancel":
                        this._end(t)
                    }
                },
                destroy: function() {
                    this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout),
                    this.fadeTimeout = null),
                    this.options.interactive && (l.removeEvent(this.indicator, "touchstart", this),
                    l.removeEvent(this.indicator, l.prefixPointerEvent("pointerdown"), this),
                    l.removeEvent(this.indicator, "mousedown", this),
                    l.removeEvent(t, "touchmove", this),
                    l.removeEvent(t, l.prefixPointerEvent("pointermove"), this),
                    l.removeEvent(t, "mousemove", this),
                    l.removeEvent(t, "touchend", this),
                    l.removeEvent(t, l.prefixPointerEvent("pointerup"), this),
                    l.removeEvent(t, "mouseup", this)),
                    this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
                },
                _start: function(i) {
                    var e = i.touches ? i.touches[0] : i;
                    i.preventDefault(),
                    i.stopPropagation(),
                    this.transitionTime(),
                    this.initiated = !0,
                    this.moved = !1,
                    this.lastPointX = e.pageX,
                    this.lastPointY = e.pageY,
                    this.startTime = l.getTime(),
                    this.options.disableTouch || l.addEvent(t, "touchmove", this),
                    this.options.disablePointer || l.addEvent(t, l.prefixPointerEvent("pointermove"), this),
                    this.options.disableMouse || l.addEvent(t, "mousemove", this),
                    this.scroller._execEvent("beforeScrollStart")
                },
                _move: function(t) {
                    var i, e, o, n, s = t.touches ? t.touches[0] : t;
                    l.getTime();
                    this.moved || this.scroller._execEvent("scrollStart"),
                    this.moved = !0,
                    i = s.pageX - this.lastPointX,
                    this.lastPointX = s.pageX,
                    e = s.pageY - this.lastPointY,
                    this.lastPointY = s.pageY,
                    o = this.x + i,
                    n = this.y + e,
                    this._pos(o, n),
                    t.preventDefault(),
                    t.stopPropagation()
                },
                _end: function(i) {
                    if (this.initiated) {
                        if (this.initiated = !1,
                        i.preventDefault(),
                        i.stopPropagation(),
                        l.removeEvent(t, "touchmove", this),
                        l.removeEvent(t, l.prefixPointerEvent("pointermove"), this),
                        l.removeEvent(t, "mousemove", this),
                        this.scroller.options.snap) {
                            var o = this.scroller._nearestSnap(this.scroller.x, this.scroller.y)
                              , n = this.options.snapSpeed || e.max(e.max(e.min(e.abs(this.scroller.x - o.x), 1e3), e.min(e.abs(this.scroller.y - o.y), 1e3)), 300);
                            this.scroller.x == o.x && this.scroller.y == o.y || (this.scroller.directionX = 0,
                            this.scroller.directionY = 0,
                            this.scroller.currentPage = o,
                            this.scroller.scrollTo(o.x, o.y, n, this.scroller.options.bounceEasing))
                        }
                        this.moved && this.scroller._execEvent("scrollEnd")
                    }
                },
                transitionTime: function(t) {
                    t = t || 0;
                    var i = l.style.transitionDuration;
                    if (this.indicatorStyle[i] = t + "ms",
                    !t && l.isBadAndroid) {
                        this.indicatorStyle[i] = "0.0001ms";
                        var e = this;
                        a(function() {
                            "0.0001ms" === e.indicatorStyle[i] && (e.indicatorStyle[i] = "0s")
                        })
                    }
                },
                transitionTimingFunction: function(t) {
                    this.indicatorStyle[l.style.transitionTimingFunction] = t
                },
                refresh: function() {
                    this.transitionTime(),
                    this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none",
                    this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (l.addClass(this.wrapper, "iScrollBothScrollbars"),
                    l.removeClass(this.wrapper, "iScrollLoneScrollbar"),
                    this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (l.removeClass(this.wrapper, "iScrollBothScrollbars"),
                    l.addClass(this.wrapper, "iScrollLoneScrollbar"),
                    this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
                    this.wrapper.offsetHeight;
                    this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth,
                    this.options.resize ? (this.indicatorWidth = e.max(e.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8),
                    this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth,
                    this.maxPosX = this.wrapperWidth - this.indicatorWidth,
                    "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8,
                    this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0,
                    this.maxBoundaryX = this.maxPosX),
                    this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX),
                    this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight,
                    this.options.resize ? (this.indicatorHeight = e.max(e.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8),
                    this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight,
                    this.maxPosY = this.wrapperHeight - this.indicatorHeight,
                    "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8,
                    this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0,
                    this.maxBoundaryY = this.maxPosY),
                    this.maxPosY = this.wrapperHeight - this.indicatorHeight,
                    this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY),
                    this.updatePosition()
                },
                updatePosition: function() {
                    var t = this.options.listenX && e.round(this.sizeRatioX * this.scroller.x) || 0
                      , i = this.options.listenY && e.round(this.sizeRatioY * this.scroller.y) || 0;
                    this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = e.max(this.indicatorWidth + t, 8),
                    this.indicatorStyle.width = this.width + "px"),
                    t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = e.max(this.indicatorWidth - (t - this.maxPosX), 8),
                    this.indicatorStyle.width = this.width + "px",
                    t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth,
                    this.indicatorStyle.width = this.width + "px"),
                    i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = e.max(this.indicatorHeight + 3 * i, 8),
                    this.indicatorStyle.height = this.height + "px"),
                    i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = e.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8),
                    this.indicatorStyle.height = this.height + "px",
                    i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight,
                    this.indicatorStyle.height = this.height + "px")),
                    this.x = t,
                    this.y = i,
                    this.scroller.options.useTransform ? this.indicatorStyle[l.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px",
                    this.indicatorStyle.top = i + "px")
                },
                _pos: function(t, i) {
                    t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX),
                    i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY),
                    t = this.options.listenX ? e.round(t / this.sizeRatioX) : this.scroller.x,
                    i = this.options.listenY ? e.round(i / this.sizeRatioY) : this.scroller.y,
                    this.scroller.scrollTo(t, i)
                },
                fade: function(t, i) {
                    if (!i || this.visible) {
                        clearTimeout(this.fadeTimeout),
                        this.fadeTimeout = null;
                        var e = t ? 250 : 500
                          , o = t ? 0 : 300;
                        t = t ? "1" : "0",
                        this.wrapperStyle[l.style.transitionDuration] = e + "ms",
                        this.fadeTimeout = setTimeout(function(t) {
                            this.wrapperStyle.opacity = t,
                            this.visible = +t
                        }
                        .bind(this, t), o)
                    }
                }
            },
            n.utils = l,
            t.IScroll = n
        }(window, document, Math)
    }
    , {}],
    19: [function(t, i, e) {
        !function(t) {
            var i = navigator.userAgent.toLowerCase()
              , e = function() {
                window.downloadAppConfig ? i.match(/iphone/gi) || i.match(/ipad/gi) ? n() : window.downloadAppConfig.confirm || "true" == window.downloadAppConfig.confirm ? t.modal({
                    type: "confirm",
                    title: "下载确认",
                    section: "即将开始下载，是否继续",
                    callback: {
                        save: function() {
                            window.downloadAppConfig.stats ? t.ajax({
                                url: window.downloadAppConfig.stats,
                                complete: function() {
                                    n()
                                }
                            }) : n()
                        }
                    }
                }) : n() : console.error("请先配置参数window.downloadAppConfig")
            }
              , o = function(t) {
                if (t.indexOf("dbnewopen") != -1)
                    window.location.href = t;
                else if (t.indexOf("?") !== -1)
                    if (t.indexOf("#") !== -1) {
                        if (t.indexOf("#/") !== -1)
                            return void (window.location.href = t + "&dbnewopen");
                        window.location.href = t.split("#")[0] + "&dbnewopen#" + t.split("#")[1]
                    } else {
                        if (window.ucAppId)
                            return void (window.location.href = t + "&nowake=1&dbnewopen");
                        window.location.href = t + "&dbnewopen"
                    }
                else
                    "" !== t && (window.location.href = t + "?dbnewopen")
            }
              , n = function() {
                function e(t) {
                    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href
                      , e = (arguments[2],
                    "[\\?&]" + t + "=([^&#]*)")
                      , o = new RegExp(e)
                      , n = o.exec(i);
                    return null === n ? "" : n[1]
                }
                var n, s = window.downloadAppConfig.openUrl || "", r = "", a = !1;
                void 0 !== window.TBSDK_ADA && (n = function(t) {
                    var i = function() {
                        a = !0,
                        window.isSpecialApp ? window.location.href = t : window.BC_SDK.openPage({
                            url: t
                        })
                    };
                    t.indexOf("taoquan.taobao.com") === -1 && t.indexOf("shop.m.taobao.com") === -1 || (window.BC_SDK = TBSDK_ADA.init({
                        appkey: "23402401",
                        openTBAPP: !0
                    }),
                    i()),
                    t.indexOf("s.click.taobao.com") !== -1 && (window.BC_SDK = TBSDK_ADA.init({
                        appkey: "23454468",
                        appSecret: "3846ae97316a0b31321a8f493f826986",
                        openTBAPP: !0
                    }),
                    i())
                }
                );
                var l = function(t) {
                    return t && t.indexOf("weixin://") !== -1 ? (a = !0,
                    void (window.location.href = t)) : void (s && s.indexOf("weixin://") !== -1 || void 0 !== window.TBSDK_ADA && n(t))
                }
                  , c = function(i) {
                    if ("40179" === CFG.appId && void 0 !== window.cm_app) {
                        var o, n, s, r = e("url", i), a = i.replace(r, ""), l = "https://yun.tuisnake.com/h5-mami/download/image_" + window.downloadAppConfig.advertId + ".png";
                        switch (window.downloadAppConfig.advertId) {
                        case 13518:
                            o = "com.xiandou.n1",
                            s = "百胜棋牌";
                            break;
                        case 14680:
                            o = "com.outsource.jinhua",
                            s = "金花斗地主";
                            break;
                        case 10940:
                            o = "com.winplay.rich11954",
                            s = "百赢棋牌";
                            break;
                        case 12346:
                            o = "com.qbpbc.qbpbc_qb",
                            s = "开心炸金花";
                            break;
                        case 15251:
                            o = "com.bczhangshangyouxicheng.bocai",
                            s = "菠菜掌上游戏城";
                            break;
                        case 22311:
                            o = "com.dyjiejidwc.douyu",
                            s = "天天斗牛";
                            break;
                        case 22335:
                            o = "com.kgoea.kgoea_kg",
                            s = "博乐棋牌";
                            break;
                        case 12847:
                            o = "com.pg.s030200",
                            s = "全民乐翻天";
                            break;
                        case 22310:
                            o = "com.pg.s030199",
                            s = "大家玩娱乐";
                            break;
                        case 21247:
                            o = "com.pg.s030199",
                            s = "大家玩娱乐";
                            break;
                        case 21140:
                            o = "com.pg.s030199",
                            s = "大家玩娱乐";
                            break;
                        default:
                            return !1
                        }
                        return n = {
                            action_type: "download",
                            version: 1,
                            content: {
                                "package": o,
                                pkg_url: decodeURIComponent(r),
                                title: s,
                                icon_url: l
                            }
                        },
                        t.get(a),
                        setTimeout(function() {
                            window.cm_app.onWormholeClick(JSON.stringify(n))
                        }, 400),
                        !0
                    }
                    return !1
                };
                if (i.match(/iphone/gi) || i.match(/ipad/gi)) {
                    if (r = window.downloadAppConfig.iosDownloadUrl,
                    l(r),
                    a)
                        return;
                    if (i.match(/MicroMessenger/gi))
                        o(r);
                    else if (s)
                        window.location.href = s;
                    else if (r.indexOf("itunes.apple.com") != -1) {
                        if (c(r))
                            return;
                        var h = document.createElement("iframe");
                        h.src = r,
                        h.style.display = "none",
                        window.setTimeout(function() {
                            document.body.appendChild(h)
                        }, 300)
                    } else
                        o(r)
                } else {
                    if (r = window.downloadAppConfig.androidDownloadUrl,
                    l(r),
                    a)
                        return;
                    if (s)
                        return void (window.location.href = s);
                    if (r.indexOf(".apk") != -1 || r.indexOf("dbnewopen") != -1) {
                        if (c(r))
                            return;
                        window.location.href = r
                    } else
                        o(r)
                }
            };
            window.downloadApp = e
        }(Zepto)
    }
    , {}],
    20: [function(t, i, e) {
        !function(i) {
            t("../IScroll");
            var e = !1
              , o = function(t) {
                return this.packUp = "//yun.tuisnake.com/h5-mami/activity/packup.png",
                window.CFG && 1 == CFG.overseas && (this.packUp = "//yun.tuisnake.com/h5-mami/activity/packup-overseas.png"),
                t && t.url && t.data && !e ? window.isOpenPrizeInfo ? (this.options = t,
                "coupon" == this.options.prizeType || "physical" == this.options.prizeType || "nothing" == this.options.prizeType ? (e = !0,
                this.init(),
                this) : void 0) : void 0 : console.warn("参数异常")
            };
            o.prototype.init = function() {
                this.ajax(),
                this.template(),
                this.slideDown()
            }
            ,
            o.prototype.ajax = function() {
                i(".prize-detail-content").hide(),
                this.xhr = i.ajax({
                    url: this.options.url,
                    type: "post",
                    data: this.options.data,
                    dataType: "json",
                    success: function(t) {
                        t.success && (i(".prize-detail-loading").hide(),
                        i(".prize-detail-img").attr("src", t.data.img),
                        i(".prize-detail-info h3").html(t.data.title),
                        i(".prize-detail-info p").html(t.data.valiDate),
                        i(".prize-detail-description").html(t.data.description),
                        i(".prize-detail-description a").addClass("needsclick"),
                        i(".prize-detail-slidebox").show(),
                        i(".prize-detail-slidebox img").each(function(t, i) {
                            i.onload = function() {
                                new IScroll(".prize-detail-slidebox",{
                                    mouseWheel: !0,
                                    scrollbars: !0,
                                    shrinkScrollbars: "scale",
                                    click: !0
                                })
                            }
                        }))
                    },
                    error: function(t) {
                        console.log(t)
                    }
                })
            }
            ,
            o.prototype.template = function() {
                var t = this
                  , e = "";
                e += '<div class="prize-detail-modal"><div class="prize-detail-dialog"><div class="prize-detail-slidebox"><div class="prize-detail-content"><img class="prize-detail-img"><div class="prize-detail-info"><h3></h3><p></p></div><div class="prize-detail-description"></div></div></div>' + ('<i class="prize-detail-slideup" style="background-image:url(' + t.packUp + ');"></i>') + '<div class="prize-detail-loading"><i></i><p>正在获取奖品信息,请稍后...</p></div></div></div>',
                i("body").append(e)
            }
            ,
            o.prototype.slideDown = function() {
                i("#db-content").addClass("filter-blur"),
                i(".prize-detail-modal").show(),
                setTimeout(function() {
                    i(".prize-detail-modal").addClass("show")
                }, 0),
                i(".prize-detail-loading").show();
                var t = this;
                i(".prize-detail-slideup").on("click", function() {
                    i(".prize-detail-modal").removeClass("show"),
                    setTimeout(function() {
                        i(".prize-detail-modal").remove(),
                        e = !1
                    }, 300),
                    i("#db-content").removeClass("filter-blur"),
                    t.xhr.abort()
                })
            }
            ,
            window.GetPrizeDetail = o
        }(Zepto)
    }
    , {
        "../IScroll": 18
    }],
    21: [function(t, i, e) {
        var o = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function(t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
        ;
        !function(t) {
            function i(t) {
                return t.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
            }
            function e(t) {
                return n ? n + t : t.toLowerCase()
            }
            var n, s, r, a, l, c, h, d, p, u, f = "", m = {
                Webkit: "webkit",
                Moz: "",
                O: "o"
            }, g = document.createElement("div"), v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, y = {};
            t.each(m, function(t, i) {
                if (void 0 !== g.style[t + "TransitionProperty"])
                    return f = "-" + t.toLowerCase() + "-",
                    n = i,
                    !1
            }),
            s = f + "transform",
            y[r = f + "transition-property"] = y[a = f + "transition-duration"] = y[c = f + "transition-delay"] = y[l = f + "transition-timing-function"] = y[h = f + "animation-name"] = y[d = f + "animation-duration"] = y[u = f + "animation-delay"] = y[p = f + "animation-timing-function"] = "",
            t.fx = {
                off: void 0 === n && void 0 === g.style.transitionProperty,
                speeds: {
                    _default: 400,
                    fast: 200,
                    slow: 600
                },
                cssPrefix: f,
                transitionEnd: e("TransitionEnd"),
                animationEnd: e("AnimationEnd")
            },
            t.fn.animate = function(i, e, o, n, s) {
                return t.isFunction(e) && (n = e,
                o = void 0,
                e = void 0),
                t.isFunction(o) && (n = o,
                o = void 0),
                t.isPlainObject(e) && (o = e.easing,
                n = e.complete,
                s = e.delay,
                e = e.duration),
                e && (e = ("number" == typeof e ? e : t.fx.speeds[e] || t.fx.speeds._default) / 1e3),
                s && (s = parseFloat(s) / 1e3),
                this.anim(i, e, o, n, s)
            }
            ,
            t.fn.anim = function(e, n, f, m, g) {
                var w, b, x, S = {}, k = "", _ = this, T = t.fx.transitionEnd, C = !1;
                if (void 0 === n && (n = t.fx.speeds._default / 1e3),
                void 0 === g && (g = 0),
                t.fx.off && (n = 0),
                "string" == typeof e)
                    S[h] = e,
                    S[d] = n + "s",
                    S[u] = g + "s",
                    S[p] = f || "linear",
                    T = t.fx.animationEnd;
                else {
                    b = [];
                    for (w in e)
                        v.test(w) ? k += w + "(" + e[w] + ") " : (S[w] = e[w],
                        b.push(i(w)));
                    k && (S[s] = k,
                    b.push(s)),
                    n > 0 && "object" === ("undefined" == typeof e ? "undefined" : o(e)) && (S[r] = b.join(", "),
                    S[a] = n + "s",
                    S[c] = g + "s",
                    S[l] = f || "linear")
                }
                return x = function(i) {
                    if ("undefined" != typeof i) {
                        if (i.target !== i.currentTarget)
                            return;
                        t(i.target).unbind(T, x)
                    } else
                        t(this).unbind(T, x);
                    C = !0,
                    !t(this).attr("stop") && t(this).css(y),
                    m && m.call(this)
                }
                ,
                n > 0 && (this.bind(T, x),
                setTimeout(function() {
                    C || x.call(_)
                }, 1e3 * (n + g) + 25)),
                this.size() && this.get(0).clientLeft,
                this.css(S),
                n <= 0 && setTimeout(function() {
                    _.each(function() {
                        x.call(this)
                    })
                }, 0),
                this
            }
            ,
            g = null
        }(Zepto)
    }
    , {}],
    22: [function(t, i, e) {
        $.cookie = function(t, i, e) {
            if ("undefined" == typeof i) {
                var o = null;
                if (document.cookie && "" != document.cookie)
                    for (var n = document.cookie.split(";"), s = 0; s < n.length; s++) {
                        var r = $.trim(n[s]);
                        if (r.substring(0, t.length + 1) == t + "=") {
                            o = decodeURIComponent(r.substring(t.length + 1));
                            break
                        }
                    }
                return o
            }
            e = e || {},
            null === i && (i = "",
            e = $.extend({}, e),
            e.expires = -1);
            var a = "";
            if (e.expires && ("number" == typeof e.expires || e.expires.toUTCString)) {
                var l;
                "number" == typeof e.expires ? (l = new Date,
                l.setTime(l.getTime() + 24 * e.expires * 60 * 60 * 1e3)) : l = e.expires,
                a = "; expires=" + l.toUTCString()
            }
            var c = e.path ? "; path=" + e.path : ""
              , h = e.domain ? "; domain=" + e.domain : ""
              , d = e.secure ? "; secure" : "";
            document.cookie = [t, "=", encodeURIComponent(i), a, c, h, d].join("")
        }
    }
    , {}]
}, {}, [7]);
