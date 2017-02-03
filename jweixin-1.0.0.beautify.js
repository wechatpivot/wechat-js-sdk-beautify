!function wrap(the_global, initialize) {
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function () {
      return initialize(the_global);
    })
  } else {
    initialize(the_global, true);
  }
}(this, function(a, b) {
    // a => the_global
    // b => initialize
    // ** mapping to `invoke`
    function c(api_name, conf, conf_of_callback) {
        a.WeixinJSBridge ? WeixinJSBridge.invoke(api_name, e(conf), function(result) {
            g(api_name, result, conf_of_callback)
        }) : j(api_name, conf_of_callback)
    }

    // ** mapping to `on`
    function d(api_name, conf_of_callback, fixme_another_conf) {
        if (a.WeixinJSBridge) {
            WeixinJSBridge.on(api_name, function (result) {
                if (fixme_another_conf && fixme_another_conf.trigger) {
                    fixme_another_conf.trigger(result);
                }
                g(api_name, result, conf_of_callback);
            });
        } else {
            if (fixme_another_conf) {
                j(api_name, fixme_another_conf);
            } else {
                j(api_name, conf_of_callback);
            }
        }
    }

    function e(conf) {
        conf = conf || {};

        conf.appId = CONFIG_COPY.appId;
        conf.verifyAppId = CONFIG_COPY.appId;
        conf.verifySignType = "sha1";
        conf.verifyTimestamp = CONFIG_COPY.timestamp + "",
        conf.verifyNonceStr = CONFIG_COPY.nonceStr,
        conf.verifySignature = CONFIG_COPY.signature

        return conf;
    }

    function f(a) {
        return {
            timeStamp: a.timestamp + "",
            nonceStr: a.nonceStr,
            "package": a.package,
            paySign: a.paySign,
            signType: a.signType || "SHA1"
        }
    }

    // api_name, result, conf_of_callback
    function g(a, bridge_result, c) {
        delete bridge_result.err_code;
        delete bridge_result.err_desc;
        delete bridge_result.err_detail;

        var d = bridge_result.errMsg
        if (!d) {
            d = bridge_result.err_msg;
            delete bridge_result.err_msg;
            d = h(a, d);
            bridge_result.errMsg = d;
        }

        c = c || {};
        if (c._complete) {
            c._complete(bridge_result);
            delete c._complete;
        }

        d = bridge_result.errMsg || "";

        if (CONFIG_COPY.debug && !c.isInnerInvoke) {
            alert(JSON.stringify(bridge_result));
        }

        var e = d.indexOf(":");
        var f = d.substring(e + 1);

        switch (f) {
            case "ok":
                if (c.success) {
                    c.success(bridge_result);
                }
                break;
            case "cancel":
                if (c.cancel) {
                    c.cancel(bridge_result);
                }
                break;
            default:
                if (c.fail) {
                    c.fail(bridge_result);
                }
        }

        if (c.complete) {
            c.complete(bridge_result)
        }
    }

    function h(apiName, errMsg) {
        var api = apiName;

        if (apiName in API_NAMES_REVERSE) {
          api = API_NAMES_REVERSE[apiName];
        }

        var e = 'ok';

        if (errMsg) {
          e = errMsg.substring(errMsg.indexOf(':') + 1);

          if (e === 'confirm') {
            e = 'ok';
          }

          if (e === 'failed') {
            e = 'fail';
          }

          if (e.indexOf("failed_") > -1) {
            e = e.substring(7);
          }

          if (e.indexOf("fail_") > -1) {
            e = e.substring(5)
          }

          e = e.replace(/_/g, " ");

          e = e.toLowerCase();

          if (e === 'access denied' || e === 'no permission to execute') {
            e = 'permission denied';
          }

          if (api === 'config' && e === 'function not exist') {
            e = 'ok';
          }

          if (e === '') {
            e = 'fail';
          }
        }

        errMsg = api + ':' + e;

        return errMsg;
    }

    function i(a) {
        var b, c, d, e;
        if (a) {
            for (b = 0, c = a.length; c > b; ++b) d = a[b], e = API_NAMES[d], e && (a[b] = e);
            return a
        }
    }

    function j(a, b) {
        if (!(!CONFIG_COPY.debug || b && b.isInnerInvoke)) {
            var c = API_NAMES_REVERSE[a];
            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || "")
        }
    }

    // ** big data for Tecnet, not for you
    function statsReport() {
        if (STATS_INFO.preVerifyState) {
            if (u || v || E.debug || "6.0.2" > z || STATS_INFO.systemType < 0 || A) {
                // pass
            } else {
                A = true;
                STATS_INFO.appId = E.appId;
                STATS_INFO.initTime = C.initEndTime - C.initStartTime;
                STATS_INFO.preVerifyTime = C.preVerifyEndTime - C.preVerifyStartTime;
                H.getNetworkType({
                   isInnerInvoke: true,
                   success: function (a) {
                       STATS_INFO.networkType = a.networkType;
                       var src = "http://open.weixin.qq.com/sdk/report?v=" + STATS_INFO.version
                               + "&o=" + STATS_INFO.preVerifyState
                               + "&s=" + STATS_INFO.systemType
                               + "&c=" + STATS_INFO.clientVersion
                               + "&a=" + STATS_INFO.appId
                               + "&n=" + STATS_INFO.networkType
                               + "&i=" + STATS_INFO.initTime
                               + "&p=" + STATS_INFO.preVerifyTime
                               + "&u=" + STATS_INFO.url;
                       var img = new Image;
                       img.src = src;
                   }
                });
            }
        }
    }

    function now() {
        return (new Date).getTime();
    }

    function m (ready_callback) {
        if (IS_MICRO_MESSENGER) {
            if (a.WeixinJSBridge) {
                ready_callback();
            } else {
                if (q.addEventListener) {
                    q.addEventListener("WeixinJSBridgeReady", ready_callback, false);
                }
            }
        }
    }

    // ** backdoor?
    function beta() {
        if (!H.invoke) {
            H.invoke = function(b, c, d) {
                a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d);
            }
            H.on = function(b, c) {
                a.WeixinJSBridge && WeixinJSBridge.on(b, c);
            }
        }
    }

    var q,
        r,
        F,
        G,
        H;

    if (!a.jWeixin) {
      var API_NAMES = {
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
      };

      var API_NAMES_REVERSE = (function() {
          var names = {};
          for (var key in API_NAMES) {
              names[API_NAMES[key]] = key;
          }
          return names;
      }());

      q = a.document;
      r = q.title;

      var user_agent = navigator.userAgent.toLowerCase();                                   // => s
      var t = navigator.platform.toLowerCase();                                             // => t
      var u = !(!t.match("mac") && !t.match("win"));                                        // => u
      var v = -1 != user_agent.indexOf("wxdebugger");                                       // => v
      var IS_MICRO_MESSENGER = -1 != user_agent.indexOf("micromessenger");                  // => w
      var IS_ANDROID = -1 != user_agent.indexOf("android");                                 // => x
      var IS_IOS = -1 != user_agent.indexOf("iphone") || -1 != user_agent.indexOf("ipad");  // => y

      var client_version = function() { // => z
          var a = user_agent.match(/micromessenger\/(\d+\.\d+\.\d+)/) || user_agent.match(/micromessenger\/(\d+\.\d+)/);
          return a ? a[1] : ""
      }();

      var A = false; // => A
      var B = false; // => B

      C = {
          initStartTime: now(),
          initEndTime: 0,
          preVerifyStartTime: 0,
          preVerifyEndTime: 0
      };

      var STATS_INFO = {
          version: 1,
          appId: "",
          initTime: 0,
          preVerifyTime: 0,
          networkType: "",
          preVerifyState: 1,
          systemType: IS_IOS ? 1 : IS_ANDROID ? 2 : -1,
          clientVersion: client_version,
          url: encodeURIComponent(location.href)
      };

      var CONFIG_COPY = {};

      var F = {
          _completes: []
      };

      G = {
          state: 0,
          res: {}
      };

      m(function() {
          C.initEndTime = now()
      });

      H = {
          config: function(ORIG_CONF) {
              CONFIG_COPY = ORIG_CONF;

              // asserts {
              if (!CONFIG_COPY.appId) {
                alert('[assert]: appId is required');
              }

              if (!CONFIG_COPY.timestamp) {
                alert('[assert]: timestamp is required');
              }

              if (!CONFIG_COPY.nonceStr) {
                alert('[assert]: nonceStr is required');
              }

              if (!CONFIG_COPY.signature) {
                alert('[assert]: signature is required');
              }

              if (!CONFIG_COPY.jsApiList || CONFIG_COPY.jsApiList.length === 0) {
                alert('[assert]: jsApiList is required');
              }
              // } asserts

              j("config", ORIG_CONF);

              var b = true
              if (CONFIG_COPY.check === false) {
                b = false;
              }

              m(function() {
                  var a, d, e;
                  if (b) {
                      c(
                          API_NAMES.config,
                          {
                              verifyJsApiList: i(CONFIG_COPY.jsApiList)
                          },
                          function () {
                              F._complete = function(res) {
                                  C.preVerifyEndTime = now();
                                  G.state = 1;
                                  G.res = res;
                              };
                              F.success = function() {
                                  STATS_INFO.preVerifyState = 0;
                              };
                              F.fail = function(err) {
                                  F._fail ? F._fail(err) : G.state = -1
                              };

                              var a = F._completes;
                              a.push(function () {
                                  if (!CONFIG_COPY.debug) {
                                      statsReport();
                                  }
                              });

                              F.complete = function() {
                                  for (var c = 0, d = a.length; d > c; ++c) a[c]();
                                  F._completes = []
                              };

                              return F;
                         }()
                    );

                    C.preVerifyStartTime = now();
                } else {
                    for (G.state = 1, a = F._completes, d = 0, e = a.length; e > d; ++d) a[d]();
                    F._completes = []
                }
              });

              CONFIG_COPY.beta && beta();
          },
          ready: function (callback) {
              if (G.state != 0) {
                  callback();
              } else {
                  F._completes.push(callback);
                  if (!IS_MICRO_MESSENGER && CONFIG_COPY.debug) {
                      callback();
                  }
              }
          },
          error: function(callback) {
              if ("6.0.2" > client_version) {
                  return;
              } else {
                  if (G.state == -1) {
                      callback(G.res)
                  } else {
                      F._fail = callback;
                  }
              }
          },
          checkJsApi: function(a) {
              var b = function(a) {
                  var c, d, b = a.checkResult;
                  for (c in b) d = API_NAMES_REVERSE[c], d && (b[d] = b[c], delete b[c]);
                  return a
              };
              c("checkJsApi", {
                  jsApiList: i(a.jsApiList)
              }, function() {
                  return a._complete = function(a) {
                      if (IS_ANDROID) {
                          var c = a.checkResult;
                          c && (a.checkResult = JSON.parse(c))
                      }
                      a = b(a)
                  }, a
              }())
          },
          onMenuShareTimeline: function (call_conf) {
              d(API_NAMES.onMenuShareTimeline, {
                  complete: function() {
                      c("shareTimeline", {
                          title: call_conf.title || r, // ** document.title
                          desc: call_conf.title || r,
                          img_url: call_conf.imgUrl || "",
                          link: call_conf.link || location.href
                      }, call_conf)
                  }
              }, call_conf)
          },
          onMenuShareAppMessage: function (call_conf) {
              d(API_NAMES.onMenuShareAppMessage, {
                  complete: function() {
                      c("sendAppMessage", {
                          title: call_conf.title || r,
                          desc: call_conf.desc || "",
                          link: call_conf.link || location.href,
                          img_url: call_conf.imgUrl || "",
                          type: call_conf.type || "link",
                          data_url: call_conf.dataUrl || ""
                      }, call_conf)
                  }
              }, call_conf)
          },
          onMenuShareQQ: function(call_conf) {
              d(API_NAMES.onMenuShareQQ, {
                  complete: function() {
                      c("shareQQ", {
                          title: call_conf.title || r,
                          desc: call_conf.desc || "",
                          img_url: call_conf.imgUrl || "",
                          link: call_conf.link || location.href
                      }, call_conf)
                  }
              }, call_conf)
          },
          onMenuShareWeibo: function(call_conf) {
              d(API_NAMES.onMenuShareWeibo, {
                  complete: function() {
                      c("shareWeiboApp", {
                          title: call_conf.title || r,
                          desc: call_conf.desc || "",
                          img_url: call_conf.imgUrl || "",
                          link: call_conf.link || location.href
                      }, call_conf)
                  }
              }, call_conf)
          },
          onMenuShareQZone: function(a) {
              d(API_NAMES.onMenuShareQZone, {
                  complete: function() {
                      c("shareQZone", {
                          title: a.title || r,
                          desc: a.desc || "",
                          img_url: a.imgUrl || "",
                          link: a.link || location.href
                      }, a)
                  }
              }, a)
          },

          startRecord: function(a) {
              c("startRecord", {}, a)
          },
          stopRecord: function(a) {
              c("stopRecord", {}, a)
          },
          onVoiceRecordEnd: function(a) {
              d("onVoiceRecordEnd", a)
          },
          playVoice: function(a) {
              c("playVoice", {
                  localId: a.localId
              }, a)
          },
          pauseVoice: function(a) {
              c("pauseVoice", {
                  localId: a.localId
              }, a)
          },
          stopVoice: function(a) {
              c("stopVoice", {
                  localId: a.localId
              }, a)
          },
          onVoicePlayEnd: function(a) {
              d("onVoicePlayEnd", a)
          },
          uploadVoice: function(a) {
              c("uploadVoice", {
                  localId: a.localId,
                  isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
              }, a)
          },
          downloadVoice: function(a) {
              c("downloadVoice", {
                  serverId: a.serverId,
                  isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
              }, a)
          },
          translateVoice: function(a) {
              c("translateVoice", {
                  localId: a.localId,
                  isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
              }, a)
          },
          chooseImage: function(a) {
              c("chooseImage", {
                  scene: "1|2",
                  count: a.count || 9,
                  sizeType: a.sizeType || ["original", "compressed"],
                  sourceType: a.sourceType || ["album", "camera"]
              }, function() {
                  return a._complete = function(a) {
                      if (IS_ANDROID) {
                          var b = a.localIds;
                          b && (a.localIds = JSON.parse(b))
                      }
                  }, a
              }())
          },
          previewImage: function(a) {
              c(API_NAMES.previewImage, {
                  current: a.current,
                  urls: a.urls
              }, a)
          },
          uploadImage: function(a) {
              c("uploadImage", {
                  localId: a.localId,
                  isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
              }, a)
          },
          downloadImage: function(a) {
              c("downloadImage", {
                  serverId: a.serverId,
                  isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
              }, a)
          },
          getNetworkType: function(a) {
              var b = function(a) {
                  var c, d, e, b = a.errMsg;
                  if (a.errMsg = "getNetworkType:ok", c = a.subtype, delete a.subtype, c) a.networkType = c;
                  else switch (d = b.indexOf(":"), e = b.substring(d + 1)) {
                      case "wifi":
                      case "edge":
                      case "wwan":
                          a.networkType = e;
                          break;
                      default:
                          a.errMsg = "getNetworkType:fail"
                  }
                  return a
              };
              c("getNetworkType", {}, function() {
                  return a._complete = function(a) {
                      a = b(a)
                  }, a
              }())
          },
          openLocation: function(call_conf) {
              c("openLocation", {
                  latitude: call_conf.latitude,
                  longitude: call_conf.longitude,
                  name: call_conf.name || "",
                  address: call_conf.address || "",
                  scale: call_conf.scale || 28,
                  infoUrl: call_conf.infoUrl || ""
              }, call_conf)
          },
          getLocation: function(call_conf) {
              call_conf = call_conf || {};
              c(API_NAMES.getLocation, {
                  // http://en.wikipedia.org/wiki/World_Geodetic_System#A_new_World_Geodetic_System:_WGS_84
                  type: call_conf.type || "wgs84"
              }, function() {
                  call_conf._complete = function(a) {
                      delete a.type
                  }
                  return call_conf
              }())
          },
          hideOptionMenu: function(a) {
              c("hideOptionMenu", {}, a)
          },
          showOptionMenu: function(a) {
              c("showOptionMenu", {}, a)
          },
          closeWindow: function(a) {
              a = a || {}, c("closeWindow", {
                  immediate_close: a.immediateClose || 0
              }, a)
          },
          hideMenuItems: function(a) {
              c("hideMenuItems", {
                  menuList: a.menuList
              }, a)
          },
          showMenuItems: function(a) {
              c("showMenuItems", {
                  menuList: a.menuList
              }, a)
          },
          hideAllNonBaseMenuItem: function(a) {
              c("hideAllNonBaseMenuItem", {}, a)
          },
          showAllNonBaseMenuItem: function(a) {
              c("showAllNonBaseMenuItem", {}, a)
          },
          scanQRCode: function(call_conf) {
              call_conf = call_conf || {};
              c("scanQRCode", {
                  needResult: call_conf.needResult || 0,
                  scanType: call_conf.scanType || ["qrCode", "barCode"]
              }, function() {
                  call_conf._complete = function(a) {
                      var b, c;
                      IS_IOS && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result))
                  }
                  return call_conf
              }())
          },
          openProductSpecificView: function(a) {
              c(API_NAMES.openProductSpecificView, {
                  pid: a.productId,
                  view_type: a.viewType || 0,
                  ext_info: a.extInfo
              }, a)
          },
          addCard: function(a) {
              var e, f, g, h, b = a.cardList,
                  d = [];
              for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                  card_id: g.cardId,
                  card_ext: g.cardExt
              }, d.push(h);
              c(API_NAMES.addCard, {
                  card_list: d
              }, function() {
                  return a._complete = function(a) {
                      var c, d, e, b = a.card_list;
                      if (b) {
                          for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
                          a.cardList = b, delete a.card_list
                      }
                  }, a
              }())
          },
          chooseCard: function(a) {
              c("chooseCard", {
                  app_id: CONFIG_COPY.appId,
                  location_id: a.shopId || "",
                  sign_type: a.signType || "SHA1",
                  card_id: a.cardId || "",
                  card_type: a.cardType || "",
                  card_sign: a.cardSign,
                  time_stamp: a.timestamp + "",
                  nonce_str: a.nonceStr
              }, function() {
                  return a._complete = function(a) {
                      a.cardList = a.choose_card_info, delete a.choose_card_info
                  }, a
              }())
          },
          openCard: function(a) {
              var e, f, g, h, b = a.cardList,
                  d = [];
              for (e = 0, f = b.length; f > e; ++e) g = b[e], h = {
                  card_id: g.cardId,
                  code: g.code
              }, d.push(h);
              c(API_NAMES.openCard, {
                  card_list: d
              }, a)
          },
          chooseWXPay: function(a) {
              c(API_NAMES.chooseWXPay, f(a), a)
          }
      }, b && (a.wx = a.jWeixin = H)

      return H;
    }
});
