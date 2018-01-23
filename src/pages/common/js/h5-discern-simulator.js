+function () {
    function e() {
        var a = document
            , b = document.documentElement
            , c = "svg" === b.nodeName.toLowerCase();
        return "function" != typeof a.createElement ? a.createElement(arguments[0]) : c ? a.createElementNS.call(a, "http://www.w3.org/2000/svg", arguments[0]) : a.createElement.apply(a, arguments)
    }
    function f() {
        try {
            return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
        } catch (a) {
            return !1
        }
    }
    function g(a) {
        var c, b = [];
        for (c in a)
            a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
        return b.join("&")
    }
    function h(a) {
        var b = decodeURIComponent((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(window.location.href) || [void 0, ""])[1].replace(/\+/g, "%20")) || null;
        return b
    }
    function i(a, b, c) {
        return c = new XMLHttpRequest,
            c.open("GET", a),
            a = [],
            i.timeout && (c.timeout = i.timeout),
            c.ontimeout = function (a) {
                b = a
            }
            ,
            c.onreadystatechange = c.then = function (b, d, e, f) {
                if (b && b.call && (a = [, b, d]),
                    g && a[2] && a[2](g, c),
                    4 == c.readyState && (e = a[0 | c.status / 200])) {
                    try {
                        f = JSON.parse(c.responseText)
                    } catch (g) {
                        f = null
                    }
                    e(f, c)
                }
            }
            ,
            c.send(),
            c
    }
    var c, d, a = navigator.userAgent.toLocaleLowerCase(), b = navigator.platform.toLocaleLowerCase();
    c = b.match(/mac/g) ? "Mac" : b.match(/win/g) ? "Win" : a.match(/android/g) ? navigator.getBattery && navigator.vibrate && navigator.hardwareConcurrency ? "Android" : "AndroidSimulator" : b.match(/iphone/g) ? "iPhone" : b.match(/ipad/g) ? "iPad" : "other",
        d = {
            platform: navigator.platform,
            user_media: !!navigator.getUserMedia || !!navigator.webkitGetUserMedia,
            deviceMotion: !!window.DeviceMotionEvent,
            geolocation: !!navigator.geolocation,
            battery: !!navigator.getBattery,
            network: !!navigator.connection,
            vibrate: !!navigator.vibrate,
            CPU_num: navigator.hardwareConcurrency,
            canvas: !(!e("canvas").getContext || !e("canvas").getContext("2d")),
            webp: f(),
            result: c
        },
        "SOW" === h("tenter") && i("/statistics/activityPagePerf?group_type=1&" + g(d))
}();
