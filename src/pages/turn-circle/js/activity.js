var _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
}
    : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }
    ;
!function t(e, i, a) {
    function r(s, n) {
        if (!i[s]) {
            if (!e[s]) {
                var h = "function" == typeof require && require;
                if (!n && h)
                    return h(s, !0);
                if (o)
                    return o(s, !0);
                var l = new Error("Cannot find module '" + s + "'");
                throw l.code = "MODULE_NOT_FOUND",
                l
            }
            var d = i[s] = {
                exports: {}
            };
            e[s][0].call(d.exports, function (t) {
                var i = e[s][1][t];
                return r(i ? i : t)
            }, d, d.exports, t, e, i, a)
        }
        return i[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < a.length; s++)
        r(a[s]);
    return r
}({
    1: [function (t, e, i) {
        !function (e) {
            t("../rotate");
            var i = {
                thanksDeg: null,
                speed: 1300,
                timeout: !1,
                running: !1,
                hasNoTimes: !1,
                againOrderId: null,
                guide: null,
                lastResult: null,
                isShowBuoy: !1,
                init: function () {
                    this.loadFiles({
                        styleCb: this.styleCb,
                        optionCb: this.optionCb,
                        loadCb: this.loadCb
                    }),
                        this.events()
                },
                styleCb: function (t) {
                    var i = [[".rule", "backgroundImage", "ruleImage"], [".theme", "image", "theme"], ["#db-content", "backgroundImage", "bgImage"], ["body", "backgroundColor", "bgColor"], [".record", "backgroundImage", "record"], [".apple", "backgroundColor", "appleBg"], [".apple", "color", "apple"], ["#circle", "backgroundImage", "turntable"], [".radius-group", "backgroundColor", "turntableBorder"], [".point", "backgroundImage", "point"], ["#start", "backgroundImage", "start"], ["#start:active", "backgroundImage", "startActive"], ["#start.disabled", "backgroundImage", "startDisabled"]];
                    requireStyle.init(t, i),
                        e("head").append("<style>.needCredits p{box-shadow:0 0 0.05rem " + requireStyle.getStyle("statusShadow") + ", 0 0 0.05rem " + requireStyle.getStyle("statusShadow") + "inset;-webkit-box-shadow:0 0 0.05rem " + requireStyle.getStyle("statusShadow") + ", 0 0 0.05rem " + requireStyle.getStyle("statusShadow") + "inset;text-shadow: 0 0 0.05rem " + requireStyle.getStyle("statusText") + ";color:" + requireStyle.getStyle("statusText") + ";border-color:" + requireStyle.getStyle("statusText") + ";}</style>"),
                        navigator.userAgent.toLocaleLowerCase().match(/m571c|vivo/gi) && e("head").append("<style>.radius-group{-webkit-background-clip: padding-box;background-clip: padding-box;}</style>"),
                        e("#db-content").show()
                },
                optionCb: function (t) {
                    var a = i
                        , r = t.data;
                    a.renderElement(r),
                        r.options.forEach(function (t, i) {
                            var a = t.image;
                            "function" == typeof "".ossimg && (a = a.ossimg());
                            var r = '<div class="prize" data-index="' + i + '" data-id="' + t.id + '" data-type="' + t.prizeType + '"> <div class="prize-dialog"><p>' + t.title + '</p><img src="' + a + '" alt="" /></div></div>';
                            e("#circle-box").append(r)
                        }),
                        a.reset()
                },
                loadCb: function () {
                    var t = i;
                    t.hasNoTimes || (t.guide = new Guide({
                        styles: {
                            left: "1.69rem",
                            top: "2.925rem"
                        }
                    })),
                        initAppleDesc("#db-content", !1)
                },
                events: function () {
                    var t = this;
                    e("body").on("click", ".prize", function () {
                        if (!t.running) {
                            new GetPrizeDetail({
                                url: "/activity/getPrizeDetail",
                                prizeType: e(this).data("type"),
                                data: {
                                    optionId: e(this).data("id")
                                }
                            })
                        }
                    }),
                        e("body").on("click", ".recommend-modal .close", function () {
                            t.reInit()
                        }),
                        e("#start").click(function () {
                            t.guide && t.guide.hide(),
                                t.start()
                        })
                },
                getOrder: function () {
                    var t = this
                        , e = {};
                    this.againOrderId && (e.againOrderId = this.againOrderId),
                        this.getActivityOrder({
                            data: e,
                            success: function (e) {
                                var i = t.getActivityErrorCode(e.code);
                                "success" == i ? (t.againOrderId = null,
                                    t.renderElement(e.data),
                                    t.isShowBuoy = e.data.isShowBuoy,
                                    setTimeout(function () {
                                        t.getLottery(e.data.orderId)
                                    }, 500)) : "networkError" == i ? t.rotateError("networkError") : "over" == i ? t.rotateError("over") : "preview" == i && t.rotateError("preview")
                            },
                            error: function (e, i) {
                                "timeout" == i ? (window.xhr && window.xhr.abort(),
                                    t.showModal("systemError", {
                                        message: "请求超时"
                                    })) : t.showModal("networkError")
                            }
                        })
                },
                getLottery: function (t) {
                    var e = this;
                    this.getActivityLottery({
                        data: {
                            orderId: t
                        },
                        success: function (i) {
                            e.timeout || (i.status = e.getActivityErrorCode(i.code),
                                "success" == i.status && "wait" == i.data.status ? setTimeout(function () {
                                    e.getLottery(t)
                                }, 1e3) : e.rotateFn(i))
                        },
                        error: function (t, i) {
                            "timeout" == i ? (window.xhr && window.xhr.abort(),
                                e.showModal("systemError", {
                                    message: "请求超时"
                                })) : e.showModal("networkError")
                        }
                    })
                },
                reset: function () {
                    var t = this
                        , i = e(".circle-box").find("[data-type=thanks]").data("index");
                    t.thanksDeg = 60 * (5 - i) + 30,
                        e("#circle").rotate(t.thanksDeg),
                        t.toggleLight(),
                        e("#circle").rotate({
                            angle: t.thanksDeg,
                            animateTo: 3600,
                            duration: 3e6,
                            easing: function (t, e, i, a, r) {
                                return -a * ((e = e / r - 1) * e * e * e - 1) + i
                            }
                        })
                },
                rotateStart: function () {
                    var t = this;
                    this.timeout = !1,
                        this.running = !0,
                        e("#start").addClass("disabled"),
                        e("#circle").stopRotate(),
                        e("#circle").rotate({
                            angle: t.getRotateAngle(),
                            animateTo: 7200,
                            duration: 20 * t.speed,
                            easing: function (t, e, i, a, r) {
                                return e
                            },
                            callback: function () {
                                t.timeout = !0,
                                    window.xhr && window.xhr.abort(),
                                    t.showModal("networkError")
                            }
                        })
                },
                rotateError: function (t, i) {
                    var a = this;
                    e("#circle").stopRotate(),
                        e("#circle").rotate({
                            angle: a.getRotateAngle(),
                            animateTo: a.thanksDeg + 720,
                            duration: 1 * a.speed,
                            easing: function (t, e, i, a, r) {
                                return -a * ((e = e / r - 1) * e * e * e - 1) + i
                            },
                            callback: function () {
                                return "noPrize" === t ? void window.showThanks({
                                    result: a.lastResult,
                                    callback: {
                                        close: function () {
                                            a.hideModal()
                                        }
                                    }
                                }) : void a.showModal(t, i)
                            }
                        })
                },
                rotateFn: function (t) {
                    var i = this;
                    if ("success" == t.status)
                        switch (this.againOrderId = t.data.againTag ? t.data.againTag : null,
                        i.lastResult = t.data,
                        t.data.result) {
                            case 0:
                                i.rotateError("noPrize");
                                break;
                            case 1:
                                i.rotateError("again");
                                break;
                            case 2:
                                var a;
                                e("#circle .prize").each(function (i, r) {
                                    if (e(this).data("id") == t.data.lottery.id)
                                        return void (a = 60 * (5 - e(this).data("index")) + 30)
                                }),
                                    a += 360,
                                    setTimeout(function () {
                                        e("#circle").stopRotate(),
                                            e("#circle").rotate({
                                                angle: i.getRotateAngle(),
                                                animateTo: a,
                                                duration: 1 * i.speed,
                                                easing: function (t, e, i, a, r) {
                                                    return -a * ((e = e / r - 1) * e * e * e - 1) + i
                                                },
                                                callback: function () {
                                                    clearTimeout(window.lightTimer),
                                                        e(".radius-bg").addClass("end"),
                                                        setTimeout(function () {
                                                            i.showActivityResult({
                                                                result: t,
                                                                reInit: i.reInit.bind(i),
                                                                start: i.start.bind(i)
                                                            })
                                                        }, 300)
                                                }
                                            })
                                    }, 500)
                        }
                    else
                        "failed" == t.status ? i.rotateError("noPrize") : "networkError" == t.status && i.rotateError("networkError")
                },
                start: function () {
                    this.running || (this.hasNoTimes ? this.showModal("over") : (this.rotateStart(),
                        this.getOrder()))
                },
                toggleLight: function () {
                    var t = this;
                    window.lightTimer = setTimeout(function () {
                        e(".radius-bg").toggleClass("toggle"),
                            t.toggleLight()
                    }, 500)
                },
                showModal: function (t, e) {
                    var i = this
                        , a = this.createErrorObject(t, e);
                    "over" === a.type ? i.setModalInterval("showRecommend") : (a.clickCallback = function () {
                        i.hideModal()
                    }
                        ,
                        "again" === a.type && (a.btnCallback = function () {
                            i.running = !1,
                                i.start()
                        }
                        ),
                        window.errorMsgModal.show(a))
                },
                hideModal: function () {
                    var t = this;
                    this.reInit(),
                        setTimeout(function () {
                            t.hasNoTimes ? t.showModal("over") : t.showPlugin(t.isShowBuoy)
                        }, 600)
                },
                reInit: function () {
                    document.ontouchmove = null,
                        this.running = !1,
                        clearTimeout(window.lightTimer),
                        e("#circle").rotate(this.thanksDeg),
                        e("#start").removeClass("disabled"),
                        this.reset()
                },
                getRotateAngle: function () {
                    return e("#circle").getRotateAngle() % 60
                },
                renderElement: function (t) {
                    e(".needCredits p").html(this.getActivityStatusText(t)).show(),
                        t.limitTimes || CFG.preview ? this.hasNoTimes = !1 : this.hasNoTimes = !0
                }
            };
            i = e.extend({}, i, window.Public),
                i.init()
        }(Zepto)
    }
        , {
        "../rotate": 2
    }],
    2: [function (require, module, exports) {
        !function ($) {
            require("../../../../unit/lib/lib-zepto.extend/1.0.0/zepto.extend");
            for (var jQuery = Zepto, supportedCSS, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "), a = 0; a < toCheck.length; a++)
                void 0 !== styles[toCheck[a]] && (supportedCSS = toCheck[a]);
            var IE = eval('"v"=="\x0B"');
            jQuery.fn.extend({
                rotate: function (t) {
                    if (0 !== this.length && "undefined" != typeof t) {
                        "number" == typeof t && (t = {
                            angle: t
                        });
                        for (var e = [], i = 0, a = this.length; i < a; i++) {
                            var r = this.get(i);
                            if (r.Wilq32 && r.Wilq32.PhotoEffect)
                                r.Wilq32.PhotoEffect._handleRotation(t);
                            else {
                                var o = $.extend(!0, {}, t)
                                    , s = new Wilq32.PhotoEffect(r, o)._rootObj;
                                e.push($(s))
                            }
                        }
                        return e
                    }
                },
                getRotateAngle: function () {
                    for (var t = [], e = 0, i = this.length; e < i; e++) {
                        var a = this.get(e);
                        a.Wilq32 && a.Wilq32.PhotoEffect && (t[e] = a.Wilq32.PhotoEffect._angle)
                    }
                    return t
                },
                stopRotate: function () {
                    for (var t = 0, e = this.length; t < e; t++) {
                        var i = this.get(t);
                        i.Wilq32 && i.Wilq32.PhotoEffect && clearTimeout(i.Wilq32.PhotoEffect._timer)
                    }
                }
            });
                var Wilq32 = window.Wilq32 || {};
                Wilq32.PhotoEffect = function () {
                    return supportedCSS ? function (t, e) {
                        t.Wilq32 = {
                            PhotoEffect: this
                        },
                            this._img = this._rootObj = this._eventObj = t,
                            this._handleRotation(e)
                    }
                        : function (t, e) {
                            if (this._img = t,
                                this._rootObj = document.createElement("span"),
                                this._rootObj.style.display = "inline-block",
                                this._rootObj.Wilq32 = {
                                    PhotoEffect: this
                                },
                                t.parentNode.insertBefore(this._rootObj, t),
                                t.complete)
                                this._Loader(e);
                            else {
                                var i = this;
                                jQuery(this._img).bind("load", function () {
                                    i._Loader(e)
                                })
                            }
                        }
                }(),
                Wilq32.PhotoEffect.prototype = {
                    _setupParameters: function (t) {
                        this._parameters = this._parameters || {},
                            "number" != typeof this._angle && (this._angle = 0),
                            "number" == typeof t.angle && (this._angle = t.angle),
                            this._parameters.animateTo = "number" == typeof t.animateTo ? t.animateTo : this._angle,
                            this._parameters.step = t.step || this._parameters.step || null,
                            this._parameters.easing = t.easing || this._parameters.easing || function (t, e, i, a, r) {
                                return -a * ((e = e / r - 1) * e * e * e - 1) + i
                            }
                            ,
                            this._parameters.duration = t.duration || this._parameters.duration || 1e3,
                            this._parameters.callback = t.callback || this._parameters.callback || function () { }
                            ,
                            t.bind && t.bind != this._parameters.bind && this._BindEvents(t.bind)
                    },
                    _handleRotation: function (t) {
                        this._setupParameters(t),
                            this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()
                    },
                    _BindEvents: function (t) {
                        if (t && this._eventObj) {
                            if (this._parameters.bind) {
                                var e = this._parameters.bind;
                                for (var i in e)
                                    e.hasOwnProperty(i) && jQuery(this._eventObj).unbind(i, e[i])
                            }
                            this._parameters.bind = t;
                            for (var i in t)
                                t.hasOwnProperty(i) && jQuery(this._eventObj).bind(i, t[i])
                        }
                    },
                    _Loader: function () {
                        return IE ? function (t) {
                            var e = this._img.width
                                , i = this._img.height;
                            this._img.parentNode.removeChild(this._img),
                                this._vimage = this.createVMLNode("image"),
                                this._vimage.src = this._img.src,
                                this._vimage.style.height = i + "px",
                                this._vimage.style.width = e + "px",
                                this._vimage.style.position = "absolute",
                                this._vimage.style.top = "0px",
                                this._vimage.style.left = "0px",
                                this._container = this.createVMLNode("group"),
                                this._container.style.width = e,
                                this._container.style.height = i,
                                this._container.style.position = "absolute",
                                this._container.setAttribute("coordsize", e - 1 + "," + (i - 1)),
                                this._container.appendChild(this._vimage),
                                this._rootObj.appendChild(this._container),
                                this._rootObj.style.position = "relative",
                                this._rootObj.style.width = e + "px",
                                this._rootObj.style.height = i + "px",
                                this._rootObj.setAttribute("id", this._img.getAttribute("id")),
                                this._rootObj.className = this._img.className,
                                this._eventObj = this._rootObj,
                                this._handleRotation(t)
                        }
                            : function (t) {
                                this._rootObj.setAttribute("id", this._img.getAttribute("id")),
                                    this._rootObj.className = this._img.className,
                                    this._width = this._img.width,
                                    this._height = this._img.height,
                                    this._widthHalf = this._width / 2,
                                    this._heightHalf = this._height / 2;
                                var e = Math.sqrt(this._height * this._height + this._width * this._width);
                                this._widthAdd = e - this._width,
                                    this._heightAdd = e - this._height,
                                    this._widthAddHalf = this._widthAdd / 2,
                                    this._heightAddHalf = this._heightAdd / 2,
                                    this._img.parentNode.removeChild(this._img),
                                    this._aspectW = (parseInt(this._img.style.width, 10) || this._width) / this._img.width,
                                    this._aspectH = (parseInt(this._img.style.height, 10) || this._height) / this._img.height,
                                    this._canvas = document.createElement("canvas"),
                                    this._canvas.setAttribute("width", this._width),
                                    this._canvas.style.position = "relative",
                                    this._canvas.style.left = -this._widthAddHalf + "px",
                                    this._canvas.style.top = -this._heightAddHalf + "px",
                                    this._canvas.Wilq32 = this._rootObj.Wilq32,
                                    this._rootObj.appendChild(this._canvas),
                                    this._rootObj.style.width = this._width + "px",
                                    this._rootObj.style.height = this._height + "px",
                                    this._eventObj = this._canvas,
                                    this._cnv = this._canvas.getContext("2d"),
                                    this._handleRotation(t)
                            }
                    }(),
                    _animateStart: function () {
                        this._timer && clearTimeout(this._timer),
                            this._animateStartTime = +new Date,
                            this._animateStartAngle = this._angle,
                            this._animate()
                    },
                    _animate: function () {
                        var t = +new Date
                            , e = t - this._animateStartTime > this._parameters.duration;
                        if (e && !this._parameters.animatedGif)
                            clearTimeout(this._timer);
                        else {
                            if (this._canvas || this._vimage || this._img) {
                                var i = this._parameters.easing(0, t - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                                this._rotate(~~(10 * i) / 10)
                            }
                            this._parameters.step && this._parameters.step(this._angle);
                            var a = this;
                            this._timer = setTimeout(function () {
                                a._animate.call(a)
                            }, 10)
                        }
                        this._parameters.callback && e && (this._angle = this._parameters.animateTo,
                            this._rotate(this._angle),
                            this._parameters.callback.call(this._rootObj))
                    },
                    _rotate: function () {
                        var t = Math.PI / 180;
                        return IE ? function (t) {
                            this._angle = t,
                                this._container.style.rotation = t % 360 + "deg"
                        }
                            : supportedCSS ? function (t) {
                                this._angle = t,
                                    this._img.style[supportedCSS] = "rotate3d(0,0,1," + t % 360 + "deg)"
                            }
                                : function (e) {
                                    this._angle = e,
                                        e = e % 360 * t,
                                        this._canvas.width = this._width + this._widthAdd,
                                        this._canvas.height = this._height + this._heightAdd,
                                        this._cnv.translate(this._widthAddHalf, this._heightAddHalf),
                                        this._cnv.translate(this._widthHalf, this._heightHalf),
                                        this._cnv.rotate(e),
                                        this._cnv.translate(-this._widthHalf, -this._heightHalf),
                                        this._cnv.scale(this._aspectW, this._aspectH),
                                        this._cnv.drawImage(this._img, 0, 0)
                                }
                    }()
                },
                IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function () {
                    document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                    try {
                        return !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                            function (t) {
                                return document.createElement("<rvml:" + t + ' class="rvml">')
                            }
                    } catch (t) {
                        return function (t) {
                            return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                        }
                    }
                }())
        }(Zepto)
    }
        , {
        "../../../../unit/lib/lib-zepto.extend/1.0.0/zepto.extend": 3
    }],
    3: [function (t, e, i) {
        var a = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (t) {
            return "undefined" == typeof t ? "undefined" : _typeof2(t)
        }
            : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : "undefined" == typeof t ? "undefined" : _typeof2(t)
            }
            ;
        Zepto.extend = Zepto.fn.extend = function () {
            var t, e, i, r, o, s, n = arguments[0] || {}, h = 1, l = arguments.length, d = !1;
            for ("boolean" == typeof n && (d = n,
                n = arguments[h] || {},
                h++),
                "object" === ("undefined" == typeof n ? "undefined" : a(n)) || Zepto.isFunction(n) || (n = {}),
                h === l && (n = this,
                    h--); h < l; h++)
                if (null != (t = arguments[h]))
                    for (e in t)
                        i = n[e],
                            r = t[e],
                            n !== r && (d && r && (Zepto.isPlainObject(r) || (o = Zepto.isArray(r))) ? (o ? (o = !1,
                                s = i && Zepto.isArray(i) ? i : []) : s = i && Zepto.isPlainObject(i) ? i : {},
                                n[e] = Zepto.extend(d, s, r)) : void 0 !== r && (n[e] = r));
            return n
        }
    }
        , {}]
}, {}, [1]);
