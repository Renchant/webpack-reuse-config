!function e$$12(t, n, r) {
  /**
   * @param {string} o
   * @param {?} u
   * @return {?}
   */
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) {
          return a(o, true);
        }
        if (i) {
          return i(o, true);
        }
        /** @type {Error} */
        var err = new Error("Cannot find module '" + o + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
      }
      var module_ = n[o] = {
        exports : {}
      };
      t[o][0].call(module_.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, module_, module_.exports, e$$12, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  /** @type {number} */
  var o = 0;
  for (;o < r.length;o++) {
    s(r[o]);
  }
  return s;
}({
  1 : [function($sanitize, dataAndEvents, deepDataAndEvents) {
    !function($) {
      $sanitize("../prizesModal");
      var methods = {
        orderCount : 0,
        prizes : null,
        running : false,
        isShowBuoy : false,
        /**
         * @return {undefined}
         */
        init : function() {
          this.loadFiles({
            styleCb : this.styleCb,
            optionCb : this.optionCb,
            loadCb : this.loadCb
          });
          this.events();
        },
        /**
         * @param {?} option
         * @return {undefined}
         */
        styleCb : function(option) {
          /** @type {Array} */
          var initPlugins = [["body", "backgroundColor", "bgColor"], ["#db-content", "backgroundImage", "bgImage"], [".rule", "backgroundImage", "rule"], [".record", "backgroundImage", "record"], ["#prizes-modal", "backgroundImage", "prizeDetail"], [".apple", "color", "appleTextColor"], ["#myCredits", "color", "myCreditsColor"], ["#myCredits", "backgroundImage", "myCreditsBg"], ["#needCredits", "color", "needCreditsColor"], [".circle.top", "backgroundImage", "circleTop"], [".circle.bottom", "backgroundImage", 
          "circleBottom"], [".doll-item", "backgroundImage", "doll"], [".guide .arrow", "backgroundImage", "arrow"], [".guide .finger", "backgroundImage", "finger"], [".balloon", "backgroundImage", "balloon"]];
          requireStyle.init(option, initPlugins);
          $("#db-content").show();
        },
        /**
         * @param {MessageEvent} evt
         * @return {undefined}
         */
        optionCb : function(evt) {
          var element = evt.data;
          var that = methods;
          that.renderElement(element);
          that.prizes = element.options;
        },
        /**
         * @return {undefined}
         */
        loadCb : function() {
          var tagName = methods;
          if (window.PrizesModal) {
            new PrizesModal({
              trigger : "#prizes-modal",
              prizes : tagName.prizes
            });
          }
          tagName.initDollShake();
          $("#db-content").on("touchmove", function(types) {
            types.preventDefault();
          });
          initAppleDesc();
        },
        /**
         * @return {undefined}
         */
        events : function() {
          var self = this;
          var gameReset = this;
          $("body").on("click", ".recommend-modal .close", function() {
            gameReset.gameReset();
          });
          $("#game-area").on("touchstart", function(e) {
            self.startX = e.touches[0].pageX;
            self.startY = e.touches[0].pageY;
          }).on("touchend", function(orig) {
            self.endX = orig.changedTouches[0].pageX;
            self.endY = orig.changedTouches[0].pageY;
            self.start();
          });
        },
        /**
         * @return {?}
         */
        start : function() {
          var $this = this;
          if (this.hasNoTimes) {
            return this.showModal("over"), false;
          }
          if (this.running) {
            return false;
          }
          var draft = this;
          var endX = this.getRotate(this.startX, this.startY, this.endX, this.endY);
          var theTarget = this.getPower(this.startX, this.startY, this.endX, this.endY);
          endX -= 90;
          var i = this.getRoad(Math.abs(endX), theTarget);
          if (!i) {
            return false;
          }
          /** @type {boolean} */
          this.running = true;
          /** @type {string} */
          var v = endX <= 0 ? "r" : "l";
          /** @type {Array} */
          var array = [0, 800, 1E3, 1100, 1200, 1100];
          /** @type {Array} */
          var segs = endX <= 0 ? [0, 1, 3, 6, 8, 5] : [0, 1, 2, 4, 7, 5];
          var seg = segs[i];
          $(".doll-item").removeClass("initshake");
          /** @type {string} */
          var klass = "road" + i + "-" + v;
          /** @type {string} */
          var activeClassName = "turn" + i + "-" + v + " floor" + (5 === i ? 3 : i);
          this.$doll = $('.doll-item[data-index="' + seg + '"]');
          var clone = $(".circle");
          $(".arrow").hide();
          $(".finger").hide();
          clone.addClass(klass);
          setTimeout(function() {
            if ($this.running) {
              clone.removeClass(klass).addClass(activeClassName);
              setTimeout(function() {
                if ($this.running) {
                  $("#game-cover").show();
                  $this.$doll.addClass("active");
                  $this.$doll.addClass("shake");
                  /** @type {string} */
                  $this.status = "shake";
                }
              }, 1E3);
            }
          }, array[i]);
          draft.getOrder();
        },
        /**
         * @param {number} y
         * @param {number} theTarget
         * @return {?}
         */
        getRoad : function(y, theTarget) {
          /** @type {number} */
          var o = 0;
          return theTarget && (0 <= y && 10 >= y ? o = theTarget < 50 ? 1 : 5 : 10 < y && 30 >= y ? o = theTarget < 50 ? 2 : 4 : 30 < y && (50 >= y && (o = 3))), o;
        },
        /**
         * @return {undefined}
         */
        gameReset : function() {
          /** @type {boolean} */
          this.running = false;
          /** @type {string} */
          $(".circle").eq(0)[0].className = "circle top";
          /** @type {string} */
          $(".circle").eq(1)[0].className = "circle bottom";
          $(".doll-item").removeClass("active shake");
          $("#game-cover").hide();
          $(".arrow").show();
          /** @type {string} */
          this.status = "";
          this.initDollShake();
        },
        /**
         * @param {Object} x1
         * @param {Object} a
         * @param {Object} x2
         * @param {Object} b
         * @return {?}
         */
        getRotate : function(x1, a, x2, b) {
          /** @type {number} */
          var diff = a - b;
          /** @type {number} */
          var dx = x2 - x1;
          /** @type {number} */
          var elem = 0;
          return x1 && (a && (x2 && b)) ? Math.abs(dx) < 2 && Math.abs(diff) < 2 ? elem : elem = 180 * Math.atan2(diff, dx) / Math.PI : elem;
        },
        /**
         * @param {(Node|string)} startX
         * @param {(Node|string)} startY
         * @param {(Node|string)} x
         * @param {(Node|string)} y
         * @return {?}
         */
        getPower : function(startX, startY, x, y) {
          if (!(startX && (startY && (x && y)))) {
            return 0;
          }
          /** @type {number} */
          var deltaY = startY - y;
          /** @type {number} */
          var deltaX = x - startX;
          return Math.sqrt(Math.pow(deltaY, 2) + Math.pow(deltaX, 2));
        },
        /**
         * @return {undefined}
         */
        initDollShake : function() {
          var divSpan = $(".doll-item");
          divSpan.addClass("initshake");
        },
        /**
         * @return {undefined}
         */
        getOrder : function() {
          var self = this;
          var task = {};
          if (this.againOrderId) {
            task.againOrderId = this.againOrderId;
          }
          this.getActivityOrder({
            data : task,
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success : function(response) {
              var notmodified = self.getActivityErrorCode(response.code);
              if ("success" == notmodified) {
                /** @type {null} */
                self.againOrderId = null;
                self.renderElement(response.data);
                self.isShowBuoy = response.data.isShowBuoy;
                setTimeout(function() {
                  self.getLottery(response.data.orderId);
                }, 500);
              } else {
                if ("networkError" == notmodified) {
                  self.showModal("networkError");
                } else {
                  if ("over" == notmodified) {
                    self.showModal("over");
                  } else {
                    if ("preview" == notmodified) {
                      self.showModal("preview");
                    }
                  }
                }
              }
            },
            /**
             * @param {?} jqXHR
             * @param {string} textStatus
             * @return {undefined}
             */
            error : function(jqXHR, textStatus) {
              if ("timeout" == textStatus) {
                if (window.xhr) {
                  window.xhr.abort();
                }
                self.showModal("systemError", {
                  message : "\u8bf7\u6c42\u8d85\u65f6"
                });
              } else {
                self.showModal("networkError");
              }
            }
          });
        },
        /**
         * @param {?} onComplete
         * @return {undefined}
         */
        getLottery : function(onComplete) {
          var self = this;
          this.getActivityLottery({
            data : {
              orderId : onComplete
            },
            /**
             * @param {Object} response
             * @return {undefined}
             */
            success : function(response) {
              var notmodified = self.getActivityErrorCode(response.code);
              if ("success" == notmodified) {
                if ("wait" == response.data.status) {
                  setTimeout(function() {
                    self.getLottery(onComplete);
                  }, 1E3);
                } else {
                  if ("success" == response.data.status) {
                    self.gameOver(response);
                  }
                }
              } else {
                if ("networkError" == notmodified) {
                  self.showModal("networkError");
                } else {
                  window.showThanks({
                    result : response.data,
                    callback : {
                      /**
                       * @return {undefined}
                       */
                      close : function() {
                        self.hideModal();
                      }
                    }
                  });
                }
              }
            },
            /**
             * @param {?} jqXHR
             * @param {string} textStatus
             * @return {undefined}
             */
            error : function(jqXHR, textStatus) {
              if ("timeout" == textStatus) {
                if (window.xhr) {
                  window.xhr.abort();
                }
                self.showModal("systemError", {
                  message : "\u8bf7\u6c42\u8d85\u65f6"
                });
              } else {
                self.showModal("networkError");
              }
            }
          });
        },
        /**
         * @param {string} element
         * @param {?} opt_attributes
         * @return {undefined}
         */
        showModal : function(element, opt_attributes) {
          var that = this;
          var e = this.createErrorObject(element, opt_attributes);
          if ("over" === e.type) {
            that.setModalInterval("showRecommend");
          } else {
            /**
             * @return {undefined}
             */
            e.clickCallback = function() {
              that.hideModal();
            };
            window.errorMsgModal.show(e);
          }
          that.gameReset();
        },
        /**
         * @return {undefined}
         */
        hideModal : function() {
          var cm = this;
          setTimeout(function() {
            if (cm.hasNoTimes) {
              cm.showModal("over");
            } else {
              cm.showPlugin(cm.isShowBuoy);
            }
          }, 600);
        },
        /**
         * @param {?} element
         * @return {undefined}
         */
        renderElement : function(element) {
          $("#needCredits").html(this.getActivityStatusText(element)).show();
          if (element.limitTimes || CFG.preview) {
            /** @type {boolean} */
            this.hasNoTimes = false;
          } else {
            /** @type {boolean} */
            this.hasNoTimes = true;
          }
        },
        /**
         * @param {Object} text
         * @return {?}
         */
        gameOver : function(text) {
          var that = this;
          return "shake" !== this.status ? (setTimeout(function() {
            that.gameOver(text);
          }, 1E3), false) : (that.showActivityResult({
            result : text,
            /**
             * @return {undefined}
             */
            reInit : function() {
            },
            start : that.start.bind(that)
          }), void setTimeout(function() {
            that.gameReset();
          }, 100));
        }
      };
      methods = $.extend(true, methods, window.Public);
      methods.init();
    }(Zepto);
  }, {
    "../prizesModal" : 2
  }],
  2 : [function(dataAndEvents, deepDataAndEvents, ignoreMethodDoesntExist) {
    !function(exports) {
      /**
       * @param {?} key
       * @return {undefined}
       */
      var List = function(key) {
        var options = {
          trigger : "",
          prizes : []
        };
        this.options = $.extend(true, options, key);
        this.init();
      };
      /**
       * @return {undefined}
       */
      List.prototype.init = function() {
        var options = this.options.prizes;
        if (this.options.trigger && (options && options.length)) {
          options = options.filter(function(line) {
            return!line.hidden;
          });
          /** @type {string} */
          var statsTemplate = '<div class="prizes-modal" style="display: none;">\n      <div class="prizes-wrapper">\n        <header></header>\n        <section>\n          <div>\n          ' + options.map(function($scope) {
            return'\n            <div class="prize-item">\n              <img src="' + $scope.image + '" />\n              <div class="prize-content">\n                <p class="title">' + $scope.title + '</p>\n                <p class="desc">' + ($scope.description || "") + "</p>\n              </div>\n            </div>\n          ";
          }).join("") + '\n          </div>\n        </section>\n        <span class="prizes-close"></span>\n      </div>\n    </div>';
          this.$modal = $(statsTemplate);
          $("body").append(this.$modal);
          this.events();
        }
      };
      /**
       * @return {undefined}
       */
      List.prototype.events = function() {
        var scope = this;
        $(this.options.trigger).on("click", function() {
          scope.$modal.show();
          new IScroll(".prizes-modal section", {
            mouseWheel : true,
            scrollbars : false,
            shrinkScrollbars : "scale"
          });
        });
        this.$modal.on("click", ".prizes-close", function() {
          scope.$modal.hide();
        });
        this.$modal.on("touchmove", function(types) {
          types.preventDefault();
        });
      };
      /** @type {function (?): undefined} */
      exports.PrizesModal = List;
    }(window);
  }, {}]
}, {}, [1]);
