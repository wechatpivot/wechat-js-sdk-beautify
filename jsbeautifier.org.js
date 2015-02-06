((e, i) => {
    "function" == typeof define && (define.amd || define.cmd) ? define(function() {
        return i(e)
    }) : i(e, !0)
})(this, function(r, e) {
    var c, a, i, n, t, s, d, o, l, p, u, f, m, g, h, y, S, _, w, I;
    if (!r.jWeixin) return c = {
        config: "preVerifyJSAPI",
        onMenuShareTimeline: "menu:share:timeline",
        onMenuShareAppMessage: "menu:share:appmessage",
        onMenuShareQQ: "menu:share:qq",
        onMenuShareWeibo: "menu:share:weiboApp",
        onMenuShareQZone: "menu:share:QZone",
        previewImage: "imagePreview",
        getLocation: "geoLocation",
        openProductSpecificView: "openProductViewWithPid",
        addCard: "batchAddCard",
        openCard: "batchViewCard",
        chooseWXPay: "getBrandWCPayRequest"
    }, a = (() => {
        var e, i = {};
        for (e in c) i[c[e]] = e;
        return i
    })(), n = (i = r.document).title, t = navigator.userAgent.toLowerCase(), f = navigator.platform.toLowerCase(), s = !(!f.match("mac") && !f.match("win")), d = -1 != t.indexOf("wxdebugger"), o = -1 != t.indexOf("micromessenger"), l = -1 != t.indexOf("android"), p = -1 != t.indexOf("iphone") || -1 != t.indexOf("ipad"), u = (f = t.match(/micromessenger\/(\d+\.\d+\.\d+)/) || t.match(/micromessenger\/(\d+\.\d+)/)) ? f[1] : "", g = m = !1, h = {
        initStartTime: b(),
        initEndTime: 0,
        preVerifyStartTime: 0,
        preVerifyEndTime: 0
    }, y = {
        version: 1,
        appId: "",
        initTime: 0,
        preVerifyTime: 0,
        networkType: "",
        preVerifyState: 1,
        systemType: p ? 1 : l ? 2 : -1,
        clientVersion: u,
        url: encodeURIComponent(location.href)
    }, S = {}, _ = {
        _completes: []
    }, w = {
        state: 0,
        data: {}
    }, A(function() {
        h.initEndTime = b()
    }), I = {
        config: function(e) {
            x("config", S = e);
            var o = !1 !== S.check;
            A(function() {
                if (o) T(c.config, {
                    verifyJsApiList: V(S.jsApiList)
                }, (_._complete = function(e) {
                    h.preVerifyEndTime = b(), w.state = 1, w.data = e
                }, _.success = function(e) {
                    y.preVerifyState = 0
                }, _.fail = function(e) {
                    _._fail ? _._fail(e) : w.state = -1
                }, (t = _._completes).push(function() {
                    0 == y.preVerifyState || s || d || S.debug || u < "6.0.2" || y.systemType < 0 || m || (m = !0, y.appId = S.appId, y.initTime = h.initEndTime - h.initStartTime, y.preVerifyTime = h.preVerifyEndTime - h.preVerifyStartTime, I.getNetworkType({
                        isInnerInvoke: !0,
                        success: function(e) {
                            y.networkType = e.networkType;
                            e = "http://open.weixin.qq.com/sdk/report?v=" + y.version + "&o=" + y.preVerifyState + "&s=" + y.systemType + "&c=" + y.clientVersion + "&a=" + y.appId + "&n=" + y.networkType + "&i=" + y.initTime + "&p=" + y.preVerifyTime + "&u=" + y.url;
                            (new Image).src = e
                        }
                    }))
                }), _.complete = function(e) {
                    for (var i = 0, n = t.length; i < n; ++i) t[i]();
                    _._completes = []
                }, _)), h.preVerifyStartTime = b();
                else {
                    w.state = 1;
                    for (var e = _._completes, i = 0, n = e.length; i < n; ++i) e[i]();
                    _._completes = []
                }
                var t
            }), S.beta && !I.invoke && (I.invoke = function(e, i, n) {
                r.WeixinJSBridge && WeixinJSBridge.invoke(e, k(i), n)
            }, I.on = function(e, i) {
                r.WeixinJSBridge && WeixinJSBridge.on(e, i)
            })
        },
        ready: function(e) {
            (0 != w.state || (_._completes.push(e), !o && S.debug)) && e()
        },
        error: function(e) {
            u < "6.0.2" || g || (g = !0, -1 == w.state ? e(w.data) : _._fail = e)
        },
        checkJsApi: function(e) {
            T("checkJsApi", {
                jsApiList: V(e.jsApiList)
            }, (e._complete = function(e) {
                l && (n = e.checkResult) && (e.checkResult = JSON.parse(n));
                var i, n = e,
                    t = n.checkResult;
                for (i in t) {
                    var o = a[i];
                    o && (t[o] = t[i], delete t[i])
                }
            }, e))
        },
        onMenuShareTimeline: function(e) {
            v(c.onMenuShareTimeline, {
                complete: function() {
                    T("shareTimeline", {
                        title: e.title || n,
                        desc: e.title || n,
                        img_url: e.imgUrl || "",
                        link: e.link || location.href,
                        type: e.type || "link",
                        data_url: e.dataUrl || ""
                    }, e)
                }
            }, e)
        },
        onMenuShareAppMessage: function(i) {
            v(c.onMenuShareAppMessage, {
                complete: function(e) {
                    "favorite" === e.scene ? T("sendAppMessage", {
                        title: i.title || n,
                        desc: i.desc || "",
                        link: i.link || location.href,
                        img_url: i.imgUrl || "",
                        type: i.type || "link",
                        data_url: i.dataUrl || ""
                    }) : T("sendAppMessage", {
                        title: i.title || n,
                        desc: i.desc || "",
                        link: i.link || location.href,
                        img_url: i.imgUrl || "",
                        type: i.type || "link",
                        data_url: i.dataUrl || ""
                    }, i)
                }
            }, i)
        },
        onMenuShareQQ: function(e) {
            v(c.onMenuShareQQ, {
                complete: function() {
                    T("shareQQ", {
                        title: e.title || n,
                        desc: e.desc || "",
                        img_url: e.imgUrl || "",
                        link: e.link || location.href
                    }, e)
                }
            }, e)
        },
        onMenuShareWeibo: function(e) {
            v(c.onMenuShareWeibo, {
                complete: function() {
                    T("shareWeiboApp", {
                        title: e.title || n,
                        desc: e.desc || "",
                        img_url: e.imgUrl || "",
                        link: e.link || location.href
                    }, e)
                }
            }, e)
        },
        onMenuShareQZone: function(e) {
            v(c.onMenuShareQZone, {
                complete: function() {
                    T("shareQZone", {
                        title: e.title || n,
                        desc: e.desc || "",
                        img_url: e.imgUrl || "",
                        link: e.link || location.href
                    }, e)
                }
            }, e)
        },
        startRecord: function(e) {
            T("startRecord", {}, e)
        },
        stopRecord: function(e) {
            T("stopRecord", {}, e)
        },
        onVoiceRecordEnd: function(e) {
            v("onVoiceRecordEnd", e)
        },
        playVoice: function(e) {
            T("playVoice", {
                localId: e.localId
            }, e)
        },
        pauseVoice: function(e) {
            T("pauseVoice", {
                localId: e.localId
            }, e)
        },
        stopVoice: function(e) {
            T("stopVoice", {
                localId: e.localId
            }, e)
        },
        onVoicePlayEnd: function(e) {
            v("onVoicePlayEnd", e)
        },
        uploadVoice: function(e) {
            T("uploadVoice", {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
        },
        downloadVoice: function(e) {
            T("downloadVoice", {
                serverId: e.serverId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
        },
        translateVoice: function(e) {
            T("translateVoice", {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
        },
        chooseImage: function(e) {
            T("chooseImage", {
                scene: "1|2",
                count: e.count || 9,
                sizeType: e.sizeType || ["original", "compressed"],
                sourceType: e.sourceType || ["album", "camera"]
            }, (e._complete = function(e) {
                if (l) {
                    var i = e.localIds;
                    try {
                        i && (e.localIds = JSON.parse(i))
                    } catch (e) {}
                }
            }, e))
        },
        previewImage: function(e) {
            T(c.previewImage, {
                current: e.current,
                urls: e.urls
            }, e)
        },
        uploadImage: function(e) {
            T("uploadImage", {
                localId: e.localId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
        },
        downloadImage: function(e) {
            T("downloadImage", {
                serverId: e.serverId,
                isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
            }, e)
        },
        getNetworkType: function(e) {
            T("getNetworkType", {}, (e._complete = function(e) {
                var i = e,
                    e = i.errMsg,
                    n = (i.errMsg = "getNetworkType:ok", i.subtype);
                if (delete i.subtype, n) i.networkType = n;
                else {
                    var n = e.indexOf(":"),
                        t = e.substring(n + 1);
                    switch (t) {
                        case "wifi":
                        case "edge":
                        case "wwan":
                            i.networkType = t;
                            break;
                        default:
                            i.errMsg = "getNetworkType:fail"
                    }
                }
            }, e))
        },
        openLocation: function(e) {
            T("openLocation", {
                latitude: e.latitude,
                longitude: e.longitude,
                name: e.name || "",
                address: e.address || "",
                scale: e.scale || 28,
                infoUrl: e.infoUrl || ""
            }, e)
        },
        getLocation: function(e) {
            e = e || {}, T(c.getLocation, {
                type: e.type || "wgs84"
            }, (e._complete = function(e) {
                delete e.type
            }, e))
        },
        hideOptionMenu: function(e) {
            T("hideOptionMenu", {}, e)
        },
        showOptionMenu: function(e) {
            T("showOptionMenu", {}, e)
        },
        closeWindow: function(e) {
            T("closeWindow", {}, e = e || {})
        },
        hideMenuItems: function(e) {
            T("hideMenuItems", {
                menuList: e.menuList
            }, e)
        },
        showMenuItems: function(e) {
            T("showMenuItems", {
                menuList: e.menuList
            }, e)
        },
        hideAllNonBaseMenuItem: function(e) {
            T("hideAllNonBaseMenuItem", {}, e)
        },
        showAllNonBaseMenuItem: function(e) {
            T("showAllNonBaseMenuItem", {}, e)
        },
        scanQRCode: function(e) {
            T("scanQRCode", {
                needResult: (e = e || {}).needResult || 0,
                scanType: e.scanType || ["qrCode", "barCode"]
            }, (e._complete = function(e) {
                var i;
                p && (i = e.resultStr) && (i = JSON.parse(i), e.resultStr = i && i.scan_code && i.scan_code.scan_result)
            }, e))
        },
        openProductSpecificView: function(e) {
            T(c.openProductSpecificView, {
                pid: e.productId,
                view_type: e.viewType || 0,
                ext_info: e.extInfo
            }, e)
        },
        addCard: function(e) {
            for (var i = e.cardList, n = [], t = 0, o = i.length; t < o; ++t) {
                var r = i[t],
                    r = {
                        card_id: r.cardId,
                        card_ext: r.cardExt
                    };
                n.push(r)
            }
            T(c.addCard, {
                card_list: n
            }, (e._complete = function(e) {
                if (i = e.card_list) {
                    for (var i, n = 0, t = (i = JSON.parse(i)).length; n < t; ++n) {
                        var o = i[n];
                        o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ
                    }
                    e.cardList = i, delete e.card_list
                }
            }, e))
        },
        chooseCard: function(e) {
            T("chooseCard", {
                app_id: S.appId,
                location_id: e.shopId || "",
                sign_type: e.signType || "SHA1",
                card_id: e.cardId || "",
                card_type: e.cardType || "",
                card_sign: e.cardSign,
                time_stamp: e.timestamp + "",
                nonce_str: e.nonceStr
            }, (e._complete = function(e) {
                e.cardList = e.choose_card_info, delete e.choose_card_info
            }, e))
        },
        openCard: function(e) {
            for (var i = e.cardList, n = [], t = 0, o = i.length; t < o; ++t) {
                var r = i[t],
                    r = {
                        card_id: r.cardId,
                        code: r.code
                    };
                n.push(r)
            }
            T(c.openCard, {
                card_list: n
            }, e)
        },
        chooseWXPay: function(e) {
            T(c.chooseWXPay, {
                timeStamp: e.timestamp + "",
                nonceStr: e.nonceStr,
                package: e.package,
                paySign: e.paySign,
                signType: e.signType || "SHA1"
            }, e)
        }
    }, e && (r.wx = r.jWeixin = I), I;

    function T(i, e, n) {
        r.WeixinJSBridge ? WeixinJSBridge.invoke(i, k(e), function(e) {
            M(i, e, n)
        }) : x(i, n)
    }

    function v(i, n, t) {
        r.WeixinJSBridge ? WeixinJSBridge.on(i, function(e) {
            t && t.trigger && t.trigger(e), M(i, e, n)
        }) : x(i, t || n)
    }

    function k(e) {
        return (e = e || {}).appId = S.appId, e.verifyAppId = S.appId, e.verifySignType = "sha1", e.verifyTimestamp = S.timestamp + "", e.verifyNonceStr = S.nonceStr, e.verifySignature = S.signature, e
    }

    function M(e, i, n) {
        delete i.err_code, delete i.err_desc, delete i.err_detail;
        var t = i.errMsg,
            e = (t || (t = i.err_msg, delete i.err_msg, t = ((e, i) => {
                var n, t = a[e];
                return t && (e = t), t = "ok", i && (n = i.indexOf(":"), "access denied" != (t = (t = (t = -1 != (t = -1 != (t = "failed" == (t = "confirm" == (t = i.substring(n + 1)) ? "ok" : t) ? "fail" : t).indexOf("failed_") ? t.substring(7) : t).indexOf("fail_") ? t.substring(5) : t).replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != t || (t = "permission denied"), "" == (t = "config" == e && "function not exist" == t ? "ok" : t)) && (t = "fail"), i = e + ":" + t
            })(e, t), i.errMsg = t), (n = n || {})._complete && (n._complete(i), delete n._complete), t = i.errMsg || "", S.debug && !n.isInnerInvoke && alert(JSON.stringify(i)), t.indexOf(":"));
        switch (t.substring(e + 1)) {
            case "ok":
                n.success && n.success(i);
                break;
            case "cancel":
                n.cancel && n.cancel(i);
                break;
            default:
                n.fail && n.fail(i)
        }
        n.complete && n.complete(i)
    }

    function V(e) {
        if (e) {
            for (var i = 0, n = e.length; i < n; ++i) {
                var t = e[i],
                    t = c[t];
                t && (e[i] = t)
            }
            return e
        }
    }

    function x(e, i) {
        var n;
        !S.debug || i && i.isInnerInvoke || ((n = a[e]) && (e = n), i && i._complete && delete i._complete, console.log('"' + e + '",', i || ""))
    }

    function b() {
        return (new Date).getTime()
    }

    function A(e) {
        o && (r.WeixinJSBridge ? e() : i.addEventListener && i.addEventListener("WeixinJSBridgeReady", e, !1))
    }
});