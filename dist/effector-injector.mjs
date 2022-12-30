var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// node_modules/lodash.debounce/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.debounce/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce2(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = debounce2;
  }
});

// node_modules/socket.io-client/dist/socket.io.slim.js
var require_socket_io_slim = __commonJS({
  "node_modules/socket.io-client/dist/socket.io.slim.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.io = e() : t.io = e();
    }(exports, function() {
      return function(t) {
        function e(n) {
          if (r[n])
            return r[n].exports;
          var o = r[n] = { exports: {}, id: n, loaded: false };
          return t[n].call(o.exports, o, o.exports, e), o.loaded = true, o.exports;
        }
        var r = {};
        return e.m = t, e.c = r, e.p = "", e(0);
      }([function(t, e, r) {
        "use strict";
        function n(t2, e2) {
          "object" === ("undefined" == typeof t2 ? "undefined" : o(t2)) && (e2 = t2, t2 = void 0), e2 = e2 || {};
          var r2, n2 = i(t2), s2 = n2.source, p = n2.id, h = n2.path, u = c[p] && h in c[p].nsps, f = e2.forceNew || e2["force new connection"] || false === e2.multiplex || u;
          return f ? r2 = a(s2, e2) : (c[p] || (c[p] = a(s2, e2)), r2 = c[p]), n2.query && !e2.query && (e2.query = n2.query), r2.socket(n2.path, e2);
        }
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
          return typeof t2;
        } : function(t2) {
          return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
        }, i = r(1), s = r(4), a = r(9);
        r(3)("socket.io-client");
        t.exports = e = n;
        var c = e.managers = {};
        e.protocol = s.protocol, e.connect = n, e.Manager = r(9), e.Socket = r(34);
      }, function(t, e, r) {
        "use strict";
        function n(t2, e2) {
          var r2 = t2;
          e2 = e2 || "undefined" != typeof location && location, null == t2 && (t2 = e2.protocol + "//" + e2.host), "string" == typeof t2 && ("/" === t2.charAt(0) && (t2 = "/" === t2.charAt(1) ? e2.protocol + t2 : e2.host + t2), /^(https?|wss?):\/\//.test(t2) || (t2 = "undefined" != typeof e2 ? e2.protocol + "//" + t2 : "https://" + t2), r2 = o(t2)), r2.port || (/^(http|ws)$/.test(r2.protocol) ? r2.port = "80" : /^(http|ws)s$/.test(r2.protocol) && (r2.port = "443")), r2.path = r2.path || "/";
          var n2 = r2.host.indexOf(":") !== -1, i = n2 ? "[" + r2.host + "]" : r2.host;
          return r2.id = r2.protocol + "://" + i + ":" + r2.port, r2.href = r2.protocol + "://" + i + (e2 && e2.port === r2.port ? "" : ":" + r2.port), r2;
        }
        var o = r(2);
        r(3)("socket.io-client:url");
        t.exports = n;
      }, function(t, e) {
        function r(t2, e2) {
          var r2 = /\/{2,9}/g, n2 = e2.replace(r2, "/").split("/");
          return "/" != e2.substr(0, 1) && 0 !== e2.length || n2.splice(0, 1), "/" == e2.substr(e2.length - 1, 1) && n2.splice(n2.length - 1, 1), n2;
        }
        function n(t2, e2) {
          var r2 = {};
          return e2.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(t3, e3, n2) {
            e3 && (r2[e3] = n2);
          }), r2;
        }
        var o = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, i = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        t.exports = function(t2) {
          var e2 = t2, s = t2.indexOf("["), a = t2.indexOf("]");
          s != -1 && a != -1 && (t2 = t2.substring(0, s) + t2.substring(s, a).replace(/:/g, ";") + t2.substring(a, t2.length));
          for (var c = o.exec(t2 || ""), p = {}, h = 14; h--; )
            p[i[h]] = c[h] || "";
          return s != -1 && a != -1 && (p.source = e2, p.host = p.host.substring(1, p.host.length - 1).replace(/;/g, ":"), p.authority = p.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), p.ipv6uri = true), p.pathNames = r(p, p.path), p.queryKey = n(p, p.query), p;
        };
      }, function(t, e) {
        "use strict";
        t.exports = function() {
          return function() {
          };
        };
      }, function(t, e, r) {
        function n() {
        }
        function o(t2) {
          var r2 = "" + t2.type;
          if (e.BINARY_EVENT !== t2.type && e.BINARY_ACK !== t2.type || (r2 += t2.attachments + "-"), t2.nsp && "/" !== t2.nsp && (r2 += t2.nsp + ","), null != t2.id && (r2 += t2.id), null != t2.data) {
            var n2 = i(t2.data);
            if (n2 === false)
              return m;
            r2 += n2;
          }
          return r2;
        }
        function i(t2) {
          try {
            return JSON.stringify(t2);
          } catch (t3) {
            return false;
          }
        }
        function s(t2, e2) {
          function r2(t3) {
            var r3 = l.deconstructPacket(t3), n2 = o(r3.packet), i2 = r3.buffers;
            i2.unshift(n2), e2(i2);
          }
          l.removeBlobs(t2, r2);
        }
        function a() {
          this.reconstructor = null;
        }
        function c(t2) {
          var r2 = 0, n2 = { type: Number(t2.charAt(0)) };
          if (null == e.types[n2.type])
            return u("unknown packet type " + n2.type);
          if (e.BINARY_EVENT === n2.type || e.BINARY_ACK === n2.type) {
            for (var o2 = ""; "-" !== t2.charAt(++r2) && (o2 += t2.charAt(r2), r2 != t2.length); )
              ;
            if (o2 != Number(o2) || "-" !== t2.charAt(r2))
              throw new Error("Illegal attachments");
            n2.attachments = Number(o2);
          }
          if ("/" === t2.charAt(r2 + 1))
            for (n2.nsp = ""; ++r2; ) {
              var i2 = t2.charAt(r2);
              if ("," === i2)
                break;
              if (n2.nsp += i2, r2 === t2.length)
                break;
            }
          else
            n2.nsp = "/";
          var s2 = t2.charAt(r2 + 1);
          if ("" !== s2 && Number(s2) == s2) {
            for (n2.id = ""; ++r2; ) {
              var i2 = t2.charAt(r2);
              if (null == i2 || Number(i2) != i2) {
                --r2;
                break;
              }
              if (n2.id += t2.charAt(r2), r2 === t2.length)
                break;
            }
            n2.id = Number(n2.id);
          }
          if (t2.charAt(++r2)) {
            var a2 = p(t2.substr(r2)), c2 = a2 !== false && (n2.type === e.ERROR || d(a2));
            if (!c2)
              return u("invalid payload");
            n2.data = a2;
          }
          return n2;
        }
        function p(t2) {
          try {
            return JSON.parse(t2);
          } catch (t3) {
            return false;
          }
        }
        function h(t2) {
          this.reconPack = t2, this.buffers = [];
        }
        function u(t2) {
          return { type: e.ERROR, data: "parser error: " + t2 };
        }
        var f = (r(3)("socket.io-parser"), r(5)), l = r(6), d = r(7), y = r(8);
        e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = n, e.Decoder = a;
        var m = e.ERROR + '"encode error"';
        n.prototype.encode = function(t2, r2) {
          if (e.BINARY_EVENT === t2.type || e.BINARY_ACK === t2.type)
            s(t2, r2);
          else {
            var n2 = o(t2);
            r2([n2]);
          }
        }, f(a.prototype), a.prototype.add = function(t2) {
          var r2;
          if ("string" == typeof t2)
            r2 = c(t2), e.BINARY_EVENT === r2.type || e.BINARY_ACK === r2.type ? (this.reconstructor = new h(r2), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r2)) : this.emit("decoded", r2);
          else {
            if (!y(t2) && !t2.base64)
              throw new Error("Unknown type: " + t2);
            if (!this.reconstructor)
              throw new Error("got binary data when not reconstructing a packet");
            r2 = this.reconstructor.takeBinaryData(t2), r2 && (this.reconstructor = null, this.emit("decoded", r2));
          }
        }, a.prototype.destroy = function() {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }, h.prototype.takeBinaryData = function(t2) {
          if (this.buffers.push(t2), this.buffers.length === this.reconPack.attachments) {
            var e2 = l.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), e2;
          }
          return null;
        }, h.prototype.finishedReconstruction = function() {
          this.reconPack = null, this.buffers = [];
        };
      }, function(t, e, r) {
        function n(t2) {
          if (t2)
            return o(t2);
        }
        function o(t2) {
          for (var e2 in n.prototype)
            t2[e2] = n.prototype[e2];
          return t2;
        }
        t.exports = n, n.prototype.on = n.prototype.addEventListener = function(t2, e2) {
          return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t2] = this._callbacks["$" + t2] || []).push(e2), this;
        }, n.prototype.once = function(t2, e2) {
          function r2() {
            this.off(t2, r2), e2.apply(this, arguments);
          }
          return r2.fn = e2, this.on(t2, r2), this;
        }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t2, e2) {
          if (this._callbacks = this._callbacks || {}, 0 == arguments.length)
            return this._callbacks = {}, this;
          var r2 = this._callbacks["$" + t2];
          if (!r2)
            return this;
          if (1 == arguments.length)
            return delete this._callbacks["$" + t2], this;
          for (var n2, o2 = 0; o2 < r2.length; o2++)
            if (n2 = r2[o2], n2 === e2 || n2.fn === e2) {
              r2.splice(o2, 1);
              break;
            }
          return 0 === r2.length && delete this._callbacks["$" + t2], this;
        }, n.prototype.emit = function(t2) {
          this._callbacks = this._callbacks || {};
          for (var e2 = new Array(arguments.length - 1), r2 = this._callbacks["$" + t2], n2 = 1; n2 < arguments.length; n2++)
            e2[n2 - 1] = arguments[n2];
          if (r2) {
            r2 = r2.slice(0);
            for (var n2 = 0, o2 = r2.length; n2 < o2; ++n2)
              r2[n2].apply(this, e2);
          }
          return this;
        }, n.prototype.listeners = function(t2) {
          return this._callbacks = this._callbacks || {}, this._callbacks["$" + t2] || [];
        }, n.prototype.hasListeners = function(t2) {
          return !!this.listeners(t2).length;
        };
      }, function(t, e, r) {
        function n(t2, e2) {
          if (!t2)
            return t2;
          if (s(t2)) {
            var r2 = { _placeholder: true, num: e2.length };
            return e2.push(t2), r2;
          }
          if (i(t2)) {
            for (var o2 = new Array(t2.length), a2 = 0; a2 < t2.length; a2++)
              o2[a2] = n(t2[a2], e2);
            return o2;
          }
          if ("object" == typeof t2 && !(t2 instanceof Date)) {
            var o2 = {};
            for (var c2 in t2)
              o2[c2] = n(t2[c2], e2);
            return o2;
          }
          return t2;
        }
        function o(t2, e2) {
          if (!t2)
            return t2;
          if (t2 && t2._placeholder)
            return e2[t2.num];
          if (i(t2))
            for (var r2 = 0; r2 < t2.length; r2++)
              t2[r2] = o(t2[r2], e2);
          else if ("object" == typeof t2)
            for (var n2 in t2)
              t2[n2] = o(t2[n2], e2);
          return t2;
        }
        var i = r(7), s = r(8), a = Object.prototype.toString, c = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === a.call(Blob), p = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === a.call(File);
        e.deconstructPacket = function(t2) {
          var e2 = [], r2 = t2.data, o2 = t2;
          return o2.data = n(r2, e2), o2.attachments = e2.length, { packet: o2, buffers: e2 };
        }, e.reconstructPacket = function(t2, e2) {
          return t2.data = o(t2.data, e2), t2.attachments = void 0, t2;
        }, e.removeBlobs = function(t2, e2) {
          function r2(t3, a2, h) {
            if (!t3)
              return t3;
            if (c && t3 instanceof Blob || p && t3 instanceof File) {
              n2++;
              var u = new FileReader();
              u.onload = function() {
                h ? h[a2] = this.result : o2 = this.result, --n2 || e2(o2);
              }, u.readAsArrayBuffer(t3);
            } else if (i(t3))
              for (var f = 0; f < t3.length; f++)
                r2(t3[f], f, t3);
            else if ("object" == typeof t3 && !s(t3))
              for (var l in t3)
                r2(t3[l], l, t3);
          }
          var n2 = 0, o2 = t2;
          r2(o2), n2 || e2(o2);
        };
      }, function(t, e) {
        var r = {}.toString;
        t.exports = Array.isArray || function(t2) {
          return "[object Array]" == r.call(t2);
        };
      }, function(t, e) {
        function r(t2) {
          return n && Buffer.isBuffer(t2) || o && (t2 instanceof ArrayBuffer || i(t2));
        }
        t.exports = r;
        var n = "function" == typeof Buffer && "function" == typeof Buffer.isBuffer, o = "function" == typeof ArrayBuffer, i = function(t2) {
          return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t2) : t2.buffer instanceof ArrayBuffer;
        };
      }, function(t, e, r) {
        "use strict";
        function n(t2, e2) {
          if (!(this instanceof n))
            return new n(t2, e2);
          t2 && "object" === ("undefined" == typeof t2 ? "undefined" : o(t2)) && (e2 = t2, t2 = void 0), e2 = e2 || {}, e2.path = e2.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e2, this.reconnection(e2.reconnection !== false), this.reconnectionAttempts(e2.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e2.reconnectionDelay || 1e3), this.reconnectionDelayMax(e2.reconnectionDelayMax || 5e3), this.randomizationFactor(e2.randomizationFactor || 0.5), this.backoff = new f({ min: this.reconnectionDelay(), max: this.reconnectionDelayMax(), jitter: this.randomizationFactor() }), this.timeout(null == e2.timeout ? 2e4 : e2.timeout), this.readyState = "closed", this.uri = t2, this.connecting = [], this.lastPing = null, this.encoding = false, this.packetBuffer = [];
          var r2 = e2.parser || c;
          this.encoder = new r2.Encoder(), this.decoder = new r2.Decoder(), this.autoConnect = e2.autoConnect !== false, this.autoConnect && this.open();
        }
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
          return typeof t2;
        } : function(t2) {
          return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
        }, i = r(10), s = r(34), a = r(5), c = r(4), p = r(36), h = r(37), u = (r(3)("socket.io-client:manager"), r(33)), f = r(38), l = Object.prototype.hasOwnProperty;
        t.exports = n, n.prototype.emitAll = function() {
          this.emit.apply(this, arguments);
          for (var t2 in this.nsps)
            l.call(this.nsps, t2) && this.nsps[t2].emit.apply(this.nsps[t2], arguments);
        }, n.prototype.updateSocketIds = function() {
          for (var t2 in this.nsps)
            l.call(this.nsps, t2) && (this.nsps[t2].id = this.generateId(t2));
        }, n.prototype.generateId = function(t2) {
          return ("/" === t2 ? "" : t2 + "#") + this.engine.id;
        }, a(n.prototype), n.prototype.reconnection = function(t2) {
          return arguments.length ? (this._reconnection = !!t2, this) : this._reconnection;
        }, n.prototype.reconnectionAttempts = function(t2) {
          return arguments.length ? (this._reconnectionAttempts = t2, this) : this._reconnectionAttempts;
        }, n.prototype.reconnectionDelay = function(t2) {
          return arguments.length ? (this._reconnectionDelay = t2, this.backoff && this.backoff.setMin(t2), this) : this._reconnectionDelay;
        }, n.prototype.randomizationFactor = function(t2) {
          return arguments.length ? (this._randomizationFactor = t2, this.backoff && this.backoff.setJitter(t2), this) : this._randomizationFactor;
        }, n.prototype.reconnectionDelayMax = function(t2) {
          return arguments.length ? (this._reconnectionDelayMax = t2, this.backoff && this.backoff.setMax(t2), this) : this._reconnectionDelayMax;
        }, n.prototype.timeout = function(t2) {
          return arguments.length ? (this._timeout = t2, this) : this._timeout;
        }, n.prototype.maybeReconnectOnOpen = function() {
          !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
        }, n.prototype.open = n.prototype.connect = function(t2, e2) {
          if (~this.readyState.indexOf("open"))
            return this;
          this.engine = i(this.uri, this.opts);
          var r2 = this.engine, n2 = this;
          this.readyState = "opening", this.skipReconnect = false;
          var o2 = p(r2, "open", function() {
            n2.onopen(), t2 && t2();
          }), s2 = p(r2, "error", function(e3) {
            if (n2.cleanup(), n2.readyState = "closed", n2.emitAll("connect_error", e3), t2) {
              var r3 = new Error("Connection error");
              r3.data = e3, t2(r3);
            } else
              n2.maybeReconnectOnOpen();
          });
          if (false !== this._timeout) {
            var a2 = this._timeout;
            0 === a2 && o2.destroy();
            var c2 = setTimeout(function() {
              o2.destroy(), r2.close(), r2.emit("error", "timeout"), n2.emitAll("connect_timeout", a2);
            }, a2);
            this.subs.push({ destroy: function() {
              clearTimeout(c2);
            } });
          }
          return this.subs.push(o2), this.subs.push(s2), this;
        }, n.prototype.onopen = function() {
          this.cleanup(), this.readyState = "open", this.emit("open");
          var t2 = this.engine;
          this.subs.push(p(t2, "data", h(this, "ondata"))), this.subs.push(p(t2, "ping", h(this, "onping"))), this.subs.push(p(t2, "pong", h(this, "onpong"))), this.subs.push(p(t2, "error", h(this, "onerror"))), this.subs.push(p(t2, "close", h(this, "onclose"))), this.subs.push(p(this.decoder, "decoded", h(this, "ondecoded")));
        }, n.prototype.onping = function() {
          this.lastPing = new Date(), this.emitAll("ping");
        }, n.prototype.onpong = function() {
          this.emitAll("pong", new Date() - this.lastPing);
        }, n.prototype.ondata = function(t2) {
          this.decoder.add(t2);
        }, n.prototype.ondecoded = function(t2) {
          this.emit("packet", t2);
        }, n.prototype.onerror = function(t2) {
          this.emitAll("error", t2);
        }, n.prototype.socket = function(t2, e2) {
          function r2() {
            ~u(o2.connecting, n2) || o2.connecting.push(n2);
          }
          var n2 = this.nsps[t2];
          if (!n2) {
            n2 = new s(this, t2, e2), this.nsps[t2] = n2;
            var o2 = this;
            n2.on("connecting", r2), n2.on("connect", function() {
              n2.id = o2.generateId(t2);
            }), this.autoConnect && r2();
          }
          return n2;
        }, n.prototype.destroy = function(t2) {
          var e2 = u(this.connecting, t2);
          ~e2 && this.connecting.splice(e2, 1), this.connecting.length || this.close();
        }, n.prototype.packet = function(t2) {
          var e2 = this;
          t2.query && 0 === t2.type && (t2.nsp += "?" + t2.query), e2.encoding ? e2.packetBuffer.push(t2) : (e2.encoding = true, this.encoder.encode(t2, function(r2) {
            for (var n2 = 0; n2 < r2.length; n2++)
              e2.engine.write(r2[n2], t2.options);
            e2.encoding = false, e2.processPacketQueue();
          }));
        }, n.prototype.processPacketQueue = function() {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var t2 = this.packetBuffer.shift();
            this.packet(t2);
          }
        }, n.prototype.cleanup = function() {
          for (var t2 = this.subs.length, e2 = 0; e2 < t2; e2++) {
            var r2 = this.subs.shift();
            r2.destroy();
          }
          this.packetBuffer = [], this.encoding = false, this.lastPing = null, this.decoder.destroy();
        }, n.prototype.close = n.prototype.disconnect = function() {
          this.skipReconnect = true, this.reconnecting = false, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
        }, n.prototype.onclose = function(t2) {
          this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t2), this._reconnection && !this.skipReconnect && this.reconnect();
        }, n.prototype.reconnect = function() {
          if (this.reconnecting || this.skipReconnect)
            return this;
          var t2 = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = false;
          else {
            var e2 = this.backoff.duration();
            this.reconnecting = true;
            var r2 = setTimeout(function() {
              t2.skipReconnect || (t2.emitAll("reconnect_attempt", t2.backoff.attempts), t2.emitAll("reconnecting", t2.backoff.attempts), t2.skipReconnect || t2.open(function(e3) {
                e3 ? (t2.reconnecting = false, t2.reconnect(), t2.emitAll("reconnect_error", e3.data)) : t2.onreconnect();
              }));
            }, e2);
            this.subs.push({ destroy: function() {
              clearTimeout(r2);
            } });
          }
        }, n.prototype.onreconnect = function() {
          var t2 = this.backoff.attempts;
          this.reconnecting = false, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t2);
        };
      }, function(t, e, r) {
        t.exports = r(11), t.exports.parser = r(19);
      }, function(t, e, r) {
        function n(t2, e2) {
          return this instanceof n ? (e2 = e2 || {}, t2 && "object" == typeof t2 && (e2 = t2, t2 = null), t2 ? (t2 = p(t2), e2.hostname = t2.host, e2.secure = "https" === t2.protocol || "wss" === t2.protocol, e2.port = t2.port, t2.query && (e2.query = t2.query)) : e2.host && (e2.hostname = p(e2.host).host), this.secure = null != e2.secure ? e2.secure : "undefined" != typeof location && "https:" === location.protocol, e2.hostname && !e2.port && (e2.port = this.secure ? "443" : "80"), this.agent = e2.agent || false, this.hostname = e2.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = e2.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = e2.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), this.upgrade = false !== e2.upgrade, this.path = (e2.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!e2.forceJSONP, this.jsonp = false !== e2.jsonp, this.forceBase64 = !!e2.forceBase64, this.enablesXDR = !!e2.enablesXDR, this.withCredentials = false !== e2.withCredentials, this.timestampParam = e2.timestampParam || "t", this.timestampRequests = e2.timestampRequests, this.transports = e2.transports || ["polling", "websocket"], this.transportOptions = e2.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = e2.policyPort || 843, this.rememberUpgrade = e2.rememberUpgrade || false, this.binaryType = null, this.onlyBinaryUpgrades = e2.onlyBinaryUpgrades, this.perMessageDeflate = false !== e2.perMessageDeflate && (e2.perMessageDeflate || {}), true === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = e2.pfx || null, this.key = e2.key || null, this.passphrase = e2.passphrase || null, this.cert = e2.cert || null, this.ca = e2.ca || null, this.ciphers = e2.ciphers || null, this.rejectUnauthorized = void 0 === e2.rejectUnauthorized || e2.rejectUnauthorized, this.forceNode = !!e2.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (e2.extraHeaders && Object.keys(e2.extraHeaders).length > 0 && (this.extraHeaders = e2.extraHeaders), e2.localAddress && (this.localAddress = e2.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, void this.open()) : new n(t2, e2);
        }
        function o(t2) {
          var e2 = {};
          for (var r2 in t2)
            t2.hasOwnProperty(r2) && (e2[r2] = t2[r2]);
          return e2;
        }
        var i = r(12), s = r(5), a = (r(3)("engine.io-client:socket"), r(33)), c = r(19), p = r(2), h = r(27);
        t.exports = n, n.priorWebsocketSuccess = false, s(n.prototype), n.protocol = c.protocol, n.Socket = n, n.Transport = r(18), n.transports = r(12), n.parser = r(19), n.prototype.createTransport = function(t2) {
          var e2 = o(this.query);
          e2.EIO = c.protocol, e2.transport = t2;
          var r2 = this.transportOptions[t2] || {};
          this.id && (e2.sid = this.id);
          var n2 = new i[t2]({ query: e2, socket: this, agent: r2.agent || this.agent, hostname: r2.hostname || this.hostname, port: r2.port || this.port, secure: r2.secure || this.secure, path: r2.path || this.path, forceJSONP: r2.forceJSONP || this.forceJSONP, jsonp: r2.jsonp || this.jsonp, forceBase64: r2.forceBase64 || this.forceBase64, enablesXDR: r2.enablesXDR || this.enablesXDR, withCredentials: r2.withCredentials || this.withCredentials, timestampRequests: r2.timestampRequests || this.timestampRequests, timestampParam: r2.timestampParam || this.timestampParam, policyPort: r2.policyPort || this.policyPort, pfx: r2.pfx || this.pfx, key: r2.key || this.key, passphrase: r2.passphrase || this.passphrase, cert: r2.cert || this.cert, ca: r2.ca || this.ca, ciphers: r2.ciphers || this.ciphers, rejectUnauthorized: r2.rejectUnauthorized || this.rejectUnauthorized, perMessageDeflate: r2.perMessageDeflate || this.perMessageDeflate, extraHeaders: r2.extraHeaders || this.extraHeaders, forceNode: r2.forceNode || this.forceNode, localAddress: r2.localAddress || this.localAddress, requestTimeout: r2.requestTimeout || this.requestTimeout, protocols: r2.protocols || void 0, isReactNative: this.isReactNative });
          return n2;
        }, n.prototype.open = function() {
          var t2;
          if (this.rememberUpgrade && n.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1)
            t2 = "websocket";
          else {
            if (0 === this.transports.length) {
              var e2 = this;
              return void setTimeout(function() {
                e2.emit("error", "No transports available");
              }, 0);
            }
            t2 = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t2 = this.createTransport(t2);
          } catch (t3) {
            return this.transports.shift(), void this.open();
          }
          t2.open(), this.setTransport(t2);
        }, n.prototype.setTransport = function(t2) {
          var e2 = this;
          this.transport && this.transport.removeAllListeners(), this.transport = t2, t2.on("drain", function() {
            e2.onDrain();
          }).on("packet", function(t3) {
            e2.onPacket(t3);
          }).on("error", function(t3) {
            e2.onError(t3);
          }).on("close", function() {
            e2.onClose("transport close");
          });
        }, n.prototype.probe = function(t2) {
          function e2() {
            if (u.onlyBinaryUpgrades) {
              var t3 = !this.supportsBinary && u.transport.supportsBinary;
              h2 = h2 || t3;
            }
            h2 || (p2.send([{ type: "ping", data: "probe" }]), p2.once("packet", function(t4) {
              if (!h2)
                if ("pong" === t4.type && "probe" === t4.data) {
                  if (u.upgrading = true, u.emit("upgrading", p2), !p2)
                    return;
                  n.priorWebsocketSuccess = "websocket" === p2.name, u.transport.pause(function() {
                    h2 || "closed" !== u.readyState && (c2(), u.setTransport(p2), p2.send([{ type: "upgrade" }]), u.emit("upgrade", p2), p2 = null, u.upgrading = false, u.flush());
                  });
                } else {
                  var e3 = new Error("probe error");
                  e3.transport = p2.name, u.emit("upgradeError", e3);
                }
            }));
          }
          function r2() {
            h2 || (h2 = true, c2(), p2.close(), p2 = null);
          }
          function o2(t3) {
            var e3 = new Error("probe error: " + t3);
            e3.transport = p2.name, r2(), u.emit("upgradeError", e3);
          }
          function i2() {
            o2("transport closed");
          }
          function s2() {
            o2("socket closed");
          }
          function a2(t3) {
            p2 && t3.name !== p2.name && r2();
          }
          function c2() {
            p2.removeListener("open", e2), p2.removeListener("error", o2), p2.removeListener("close", i2), u.removeListener("close", s2), u.removeListener("upgrading", a2);
          }
          var p2 = this.createTransport(t2, { probe: 1 }), h2 = false, u = this;
          n.priorWebsocketSuccess = false, p2.once("open", e2), p2.once("error", o2), p2.once("close", i2), this.once("close", s2), this.once("upgrading", a2), p2.open();
        }, n.prototype.onOpen = function() {
          if (this.readyState = "open", n.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause)
            for (var t2 = 0, e2 = this.upgrades.length; t2 < e2; t2++)
              this.probe(this.upgrades[t2]);
        }, n.prototype.onPacket = function(t2) {
          if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState)
            switch (this.emit("packet", t2), this.emit("heartbeat"), t2.type) {
              case "open":
                this.onHandshake(JSON.parse(t2.data));
                break;
              case "pong":
                this.setPing(), this.emit("pong");
                break;
              case "error":
                var e2 = new Error("server error");
                e2.code = t2.data, this.onError(e2);
                break;
              case "message":
                this.emit("data", t2.data), this.emit("message", t2.data);
            }
        }, n.prototype.onHandshake = function(t2) {
          this.emit("handshake", t2), this.id = t2.sid, this.transport.query.sid = t2.sid, this.upgrades = this.filterUpgrades(t2.upgrades), this.pingInterval = t2.pingInterval, this.pingTimeout = t2.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat));
        }, n.prototype.onHeartbeat = function(t2) {
          clearTimeout(this.pingTimeoutTimer);
          var e2 = this;
          e2.pingTimeoutTimer = setTimeout(function() {
            "closed" !== e2.readyState && e2.onClose("ping timeout");
          }, t2 || e2.pingInterval + e2.pingTimeout);
        }, n.prototype.setPing = function() {
          var t2 = this;
          clearTimeout(t2.pingIntervalTimer), t2.pingIntervalTimer = setTimeout(function() {
            t2.ping(), t2.onHeartbeat(t2.pingTimeout);
          }, t2.pingInterval);
        }, n.prototype.ping = function() {
          var t2 = this;
          this.sendPacket("ping", function() {
            t2.emit("ping");
          });
        }, n.prototype.onDrain = function() {
          this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }, n.prototype.flush = function() {
          "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));
        }, n.prototype.write = n.prototype.send = function(t2, e2, r2) {
          return this.sendPacket("message", t2, e2, r2), this;
        }, n.prototype.sendPacket = function(t2, e2, r2, n2) {
          if ("function" == typeof e2 && (n2 = e2, e2 = void 0), "function" == typeof r2 && (n2 = r2, r2 = null), "closing" !== this.readyState && "closed" !== this.readyState) {
            r2 = r2 || {}, r2.compress = false !== r2.compress;
            var o2 = { type: t2, data: e2, options: r2 };
            this.emit("packetCreate", o2), this.writeBuffer.push(o2), n2 && this.once("flush", n2), this.flush();
          }
        }, n.prototype.close = function() {
          function t2() {
            n2.onClose("forced close"), n2.transport.close();
          }
          function e2() {
            n2.removeListener("upgrade", e2), n2.removeListener("upgradeError", e2), t2();
          }
          function r2() {
            n2.once("upgrade", e2), n2.once("upgradeError", e2);
          }
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var n2 = this;
            this.writeBuffer.length ? this.once("drain", function() {
              this.upgrading ? r2() : t2();
            }) : this.upgrading ? r2() : t2();
          }
          return this;
        }, n.prototype.onError = function(t2) {
          n.priorWebsocketSuccess = false, this.emit("error", t2), this.onClose("transport error", t2);
        }, n.prototype.onClose = function(t2, e2) {
          if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            var r2 = this;
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", t2, e2), r2.writeBuffer = [], r2.prevBufferLen = 0;
          }
        }, n.prototype.filterUpgrades = function(t2) {
          for (var e2 = [], r2 = 0, n2 = t2.length; r2 < n2; r2++)
            ~a(this.transports, t2[r2]) && e2.push(t2[r2]);
          return e2;
        };
      }, function(t, e, r) {
        function n(t2) {
          var e2, r2 = false, n2 = false, a2 = false !== t2.jsonp;
          if ("undefined" != typeof location) {
            var c = "https:" === location.protocol, p = location.port;
            p || (p = c ? 443 : 80), r2 = t2.hostname !== location.hostname || p !== t2.port, n2 = t2.secure !== c;
          }
          if (t2.xdomain = r2, t2.xscheme = n2, e2 = new o(t2), "open" in e2 && !t2.forceJSONP)
            return new i(t2);
          if (!a2)
            throw new Error("JSONP disabled");
          return new s(t2);
        }
        var o = r(13), i = r(16), s = r(30), a = r(31);
        e.polling = n, e.websocket = a;
      }, function(t, e, r) {
        var n = r(14), o = r(15);
        t.exports = function(t2) {
          var e2 = t2.xdomain, r2 = t2.xscheme, i = t2.enablesXDR;
          try {
            if ("undefined" != typeof XMLHttpRequest && (!e2 || n))
              return new XMLHttpRequest();
          } catch (t3) {
          }
          try {
            if ("undefined" != typeof XDomainRequest && !r2 && i)
              return new XDomainRequest();
          } catch (t3) {
          }
          if (!e2)
            try {
              return new o[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
            } catch (t3) {
            }
        };
      }, function(t, e) {
        try {
          t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
        } catch (e2) {
          t.exports = false;
        }
      }, function(t, e) {
        t.exports = function() {
          return "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();
        }();
      }, function(t, e, r) {
        function n() {
        }
        function o(t2) {
          if (c.call(this, t2), this.requestTimeout = t2.requestTimeout, this.extraHeaders = t2.extraHeaders, "undefined" != typeof location) {
            var e2 = "https:" === location.protocol, r2 = location.port;
            r2 || (r2 = e2 ? 443 : 80), this.xd = "undefined" != typeof location && t2.hostname !== location.hostname || r2 !== t2.port, this.xs = t2.secure !== e2;
          }
        }
        function i(t2) {
          this.method = t2.method || "GET", this.uri = t2.uri, this.xd = !!t2.xd, this.xs = !!t2.xs, this.async = false !== t2.async, this.data = void 0 !== t2.data ? t2.data : null, this.agent = t2.agent, this.isBinary = t2.isBinary, this.supportsBinary = t2.supportsBinary, this.enablesXDR = t2.enablesXDR, this.withCredentials = t2.withCredentials, this.requestTimeout = t2.requestTimeout, this.pfx = t2.pfx, this.key = t2.key, this.passphrase = t2.passphrase, this.cert = t2.cert, this.ca = t2.ca, this.ciphers = t2.ciphers, this.rejectUnauthorized = t2.rejectUnauthorized, this.extraHeaders = t2.extraHeaders, this.create();
        }
        function s() {
          for (var t2 in i.requests)
            i.requests.hasOwnProperty(t2) && i.requests[t2].abort();
        }
        var a = r(13), c = r(17), p = r(5), h = r(28), u = (r(3)("engine.io-client:polling-xhr"), r(15));
        if (t.exports = o, t.exports.Request = i, h(o, c), o.prototype.supportsBinary = true, o.prototype.request = function(t2) {
          return t2 = t2 || {}, t2.uri = this.uri(), t2.xd = this.xd, t2.xs = this.xs, t2.agent = this.agent || false, t2.supportsBinary = this.supportsBinary, t2.enablesXDR = this.enablesXDR, t2.withCredentials = this.withCredentials, t2.pfx = this.pfx, t2.key = this.key, t2.passphrase = this.passphrase, t2.cert = this.cert, t2.ca = this.ca, t2.ciphers = this.ciphers, t2.rejectUnauthorized = this.rejectUnauthorized, t2.requestTimeout = this.requestTimeout, t2.extraHeaders = this.extraHeaders, new i(t2);
        }, o.prototype.doWrite = function(t2, e2) {
          var r2 = "string" != typeof t2 && void 0 !== t2, n2 = this.request({ method: "POST", data: t2, isBinary: r2 }), o2 = this;
          n2.on("success", e2), n2.on("error", function(t3) {
            o2.onError("xhr post error", t3);
          }), this.sendXhr = n2;
        }, o.prototype.doPoll = function() {
          var t2 = this.request(), e2 = this;
          t2.on("data", function(t3) {
            e2.onData(t3);
          }), t2.on("error", function(t3) {
            e2.onError("xhr poll error", t3);
          }), this.pollXhr = t2;
        }, p(i.prototype), i.prototype.create = function() {
          var t2 = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
          t2.pfx = this.pfx, t2.key = this.key, t2.passphrase = this.passphrase, t2.cert = this.cert, t2.ca = this.ca, t2.ciphers = this.ciphers, t2.rejectUnauthorized = this.rejectUnauthorized;
          var e2 = this.xhr = new a(t2), r2 = this;
          try {
            e2.open(this.method, this.uri, this.async);
            try {
              if (this.extraHeaders) {
                e2.setDisableHeaderCheck && e2.setDisableHeaderCheck(true);
                for (var n2 in this.extraHeaders)
                  this.extraHeaders.hasOwnProperty(n2) && e2.setRequestHeader(n2, this.extraHeaders[n2]);
              }
            } catch (t3) {
            }
            if ("POST" === this.method)
              try {
                this.isBinary ? e2.setRequestHeader("Content-type", "application/octet-stream") : e2.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (t3) {
              }
            try {
              e2.setRequestHeader("Accept", "*/*");
            } catch (t3) {
            }
            "withCredentials" in e2 && (e2.withCredentials = this.withCredentials), this.requestTimeout && (e2.timeout = this.requestTimeout), this.hasXDR() ? (e2.onload = function() {
              r2.onLoad();
            }, e2.onerror = function() {
              r2.onError(e2.responseText);
            }) : e2.onreadystatechange = function() {
              if (2 === e2.readyState)
                try {
                  var t3 = e2.getResponseHeader("Content-Type");
                  (r2.supportsBinary && "application/octet-stream" === t3 || "application/octet-stream; charset=UTF-8" === t3) && (e2.responseType = "arraybuffer");
                } catch (t4) {
                }
              4 === e2.readyState && (200 === e2.status || 1223 === e2.status ? r2.onLoad() : setTimeout(function() {
                r2.onError("number" == typeof e2.status ? e2.status : 0);
              }, 0));
            }, e2.send(this.data);
          } catch (t3) {
            return void setTimeout(function() {
              r2.onError(t3);
            }, 0);
          }
          "undefined" != typeof document && (this.index = i.requestsCount++, i.requests[this.index] = this);
        }, i.prototype.onSuccess = function() {
          this.emit("success"), this.cleanup();
        }, i.prototype.onData = function(t2) {
          this.emit("data", t2), this.onSuccess();
        }, i.prototype.onError = function(t2) {
          this.emit("error", t2), this.cleanup(true);
        }, i.prototype.cleanup = function(t2) {
          if ("undefined" != typeof this.xhr && null !== this.xhr) {
            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n, t2)
              try {
                this.xhr.abort();
              } catch (t3) {
              }
            "undefined" != typeof document && delete i.requests[this.index], this.xhr = null;
          }
        }, i.prototype.onLoad = function() {
          var t2;
          try {
            var e2;
            try {
              e2 = this.xhr.getResponseHeader("Content-Type");
            } catch (t3) {
            }
            t2 = "application/octet-stream" === e2 || "application/octet-stream; charset=UTF-8" === e2 ? this.xhr.response || this.xhr.responseText : this.xhr.responseText;
          } catch (t3) {
            this.onError(t3);
          }
          null != t2 && this.onData(t2);
        }, i.prototype.hasXDR = function() {
          return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR;
        }, i.prototype.abort = function() {
          this.cleanup();
        }, i.requestsCount = 0, i.requests = {}, "undefined" != typeof document) {
          if ("function" == typeof attachEvent)
            attachEvent("onunload", s);
          else if ("function" == typeof addEventListener) {
            var f = "onpagehide" in u ? "pagehide" : "unload";
            addEventListener(f, s, false);
          }
        }
      }, function(t, e, r) {
        function n(t2) {
          var e2 = t2 && t2.forceBase64;
          p && !e2 || (this.supportsBinary = false), o.call(this, t2);
        }
        var o = r(18), i = r(27), s = r(19), a = r(28), c = r(29);
        r(3)("engine.io-client:polling");
        t.exports = n;
        var p = function() {
          var t2 = r(13), e2 = new t2({ xdomain: false });
          return null != e2.responseType;
        }();
        a(n, o), n.prototype.name = "polling", n.prototype.doOpen = function() {
          this.poll();
        }, n.prototype.pause = function(t2) {
          function e2() {
            r2.readyState = "paused", t2();
          }
          var r2 = this;
          if (this.readyState = "pausing", this.polling || !this.writable) {
            var n2 = 0;
            this.polling && (n2++, this.once("pollComplete", function() {
              --n2 || e2();
            })), this.writable || (n2++, this.once("drain", function() {
              --n2 || e2();
            }));
          } else
            e2();
        }, n.prototype.poll = function() {
          this.polling = true, this.doPoll(), this.emit("poll");
        }, n.prototype.onData = function(t2) {
          var e2 = this, r2 = function(t3, r3, n2) {
            return "opening" === e2.readyState && "open" === t3.type && e2.onOpen(), "close" === t3.type ? (e2.onClose(), false) : void e2.onPacket(t3);
          };
          s.decodePayload(t2, this.socket.binaryType, r2), "closed" !== this.readyState && (this.polling = false, this.emit("pollComplete"), "open" === this.readyState && this.poll());
        }, n.prototype.doClose = function() {
          function t2() {
            e2.write([{ type: "close" }]);
          }
          var e2 = this;
          "open" === this.readyState ? t2() : this.once("open", t2);
        }, n.prototype.write = function(t2) {
          var e2 = this;
          this.writable = false;
          var r2 = function() {
            e2.writable = true, e2.emit("drain");
          };
          s.encodePayload(t2, this.supportsBinary, function(t3) {
            e2.doWrite(t3, r2);
          });
        }, n.prototype.uri = function() {
          var t2 = this.query || {}, e2 = this.secure ? "https" : "http", r2 = "";
          false !== this.timestampRequests && (t2[this.timestampParam] = c()), this.supportsBinary || t2.sid || (t2.b64 = 1), t2 = i.encode(t2), this.port && ("https" === e2 && 443 !== Number(this.port) || "http" === e2 && 80 !== Number(this.port)) && (r2 = ":" + this.port), t2.length && (t2 = "?" + t2);
          var n2 = this.hostname.indexOf(":") !== -1;
          return e2 + "://" + (n2 ? "[" + this.hostname + "]" : this.hostname) + r2 + this.path + t2;
        };
      }, function(t, e, r) {
        function n(t2) {
          this.path = t2.path, this.hostname = t2.hostname, this.port = t2.port, this.secure = t2.secure, this.query = t2.query, this.timestampParam = t2.timestampParam, this.timestampRequests = t2.timestampRequests, this.readyState = "", this.agent = t2.agent || false, this.socket = t2.socket, this.enablesXDR = t2.enablesXDR, this.withCredentials = t2.withCredentials, this.pfx = t2.pfx, this.key = t2.key, this.passphrase = t2.passphrase, this.cert = t2.cert, this.ca = t2.ca, this.ciphers = t2.ciphers, this.rejectUnauthorized = t2.rejectUnauthorized, this.forceNode = t2.forceNode, this.isReactNative = t2.isReactNative, this.extraHeaders = t2.extraHeaders, this.localAddress = t2.localAddress;
        }
        var o = r(19), i = r(5);
        t.exports = n, i(n.prototype), n.prototype.onError = function(t2, e2) {
          var r2 = new Error(t2);
          return r2.type = "TransportError", r2.description = e2, this.emit("error", r2), this;
        }, n.prototype.open = function() {
          return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this;
        }, n.prototype.close = function() {
          return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this;
        }, n.prototype.send = function(t2) {
          if ("open" !== this.readyState)
            throw new Error("Transport not open");
          this.write(t2);
        }, n.prototype.onOpen = function() {
          this.readyState = "open", this.writable = true, this.emit("open");
        }, n.prototype.onData = function(t2) {
          var e2 = o.decodePacket(t2, this.socket.binaryType);
          this.onPacket(e2);
        }, n.prototype.onPacket = function(t2) {
          this.emit("packet", t2);
        }, n.prototype.onClose = function() {
          this.readyState = "closed", this.emit("close");
        };
      }, function(t, e, r) {
        function n(t2, r2) {
          var n2 = "b" + e.packets[t2.type] + t2.data.data;
          return r2(n2);
        }
        function o(t2, r2, n2) {
          if (!r2)
            return e.encodeBase64Packet(t2, n2);
          var o2 = t2.data, i2 = new Uint8Array(o2), s2 = new Uint8Array(1 + o2.byteLength);
          s2[0] = v[t2.type];
          for (var a2 = 0; a2 < i2.length; a2++)
            s2[a2 + 1] = i2[a2];
          return n2(s2.buffer);
        }
        function i(t2, r2, n2) {
          if (!r2)
            return e.encodeBase64Packet(t2, n2);
          var o2 = new FileReader();
          return o2.onload = function() {
            e.encodePacket({ type: t2.type, data: o2.result }, r2, true, n2);
          }, o2.readAsArrayBuffer(t2.data);
        }
        function s(t2, r2, n2) {
          if (!r2)
            return e.encodeBase64Packet(t2, n2);
          if (g)
            return i(t2, r2, n2);
          var o2 = new Uint8Array(1);
          o2[0] = v[t2.type];
          var s2 = new w([o2.buffer, t2.data]);
          return n2(s2);
        }
        function a(t2) {
          try {
            t2 = d.decode(t2, { strict: false });
          } catch (t3) {
            return false;
          }
          return t2;
        }
        function c(t2, e2, r2) {
          for (var n2 = new Array(t2.length), o2 = l(t2.length, r2), i2 = function(t3, r3, o3) {
            e2(r3, function(e3, r4) {
              n2[t3] = r4, o3(e3, n2);
            });
          }, s2 = 0; s2 < t2.length; s2++)
            i2(s2, t2[s2], o2);
        }
        var p, h = r(20), u = r(21), f = r(22), l = r(23), d = r(24);
        "undefined" != typeof ArrayBuffer && (p = r(25));
        var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), m = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), g = y || m;
        e.protocol = 3;
        var v = e.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 }, b = h(v), k = { type: "error", data: "parser error" }, w = r(26);
        e.encodePacket = function(t2, e2, r2, i2) {
          "function" == typeof e2 && (i2 = e2, e2 = false), "function" == typeof r2 && (i2 = r2, r2 = null);
          var a2 = void 0 === t2.data ? void 0 : t2.data.buffer || t2.data;
          if ("undefined" != typeof ArrayBuffer && a2 instanceof ArrayBuffer)
            return o(t2, e2, i2);
          if ("undefined" != typeof w && a2 instanceof w)
            return s(t2, e2, i2);
          if (a2 && a2.base64)
            return n(t2, i2);
          var c2 = v[t2.type];
          return void 0 !== t2.data && (c2 += r2 ? d.encode(String(t2.data), { strict: false }) : String(t2.data)), i2("" + c2);
        }, e.encodeBase64Packet = function(t2, r2) {
          var n2 = "b" + e.packets[t2.type];
          if ("undefined" != typeof w && t2.data instanceof w) {
            var o2 = new FileReader();
            return o2.onload = function() {
              var t3 = o2.result.split(",")[1];
              r2(n2 + t3);
            }, o2.readAsDataURL(t2.data);
          }
          var i2;
          try {
            i2 = String.fromCharCode.apply(null, new Uint8Array(t2.data));
          } catch (e2) {
            for (var s2 = new Uint8Array(t2.data), a2 = new Array(s2.length), c2 = 0; c2 < s2.length; c2++)
              a2[c2] = s2[c2];
            i2 = String.fromCharCode.apply(null, a2);
          }
          return n2 += btoa(i2), r2(n2);
        }, e.decodePacket = function(t2, r2, n2) {
          if (void 0 === t2)
            return k;
          if ("string" == typeof t2) {
            if ("b" === t2.charAt(0))
              return e.decodeBase64Packet(t2.substr(1), r2);
            if (n2 && (t2 = a(t2), t2 === false))
              return k;
            var o2 = t2.charAt(0);
            return Number(o2) == o2 && b[o2] ? t2.length > 1 ? { type: b[o2], data: t2.substring(1) } : { type: b[o2] } : k;
          }
          var i2 = new Uint8Array(t2), o2 = i2[0], s2 = f(t2, 1);
          return w && "blob" === r2 && (s2 = new w([s2])), { type: b[o2], data: s2 };
        }, e.decodeBase64Packet = function(t2, e2) {
          var r2 = b[t2.charAt(0)];
          if (!p)
            return { type: r2, data: { base64: true, data: t2.substr(1) } };
          var n2 = p.decode(t2.substr(1));
          return "blob" === e2 && w && (n2 = new w([n2])), { type: r2, data: n2 };
        }, e.encodePayload = function(t2, r2, n2) {
          function o2(t3) {
            return t3.length + ":" + t3;
          }
          function i2(t3, n3) {
            e.encodePacket(t3, !!s2 && r2, false, function(t4) {
              n3(null, o2(t4));
            });
          }
          "function" == typeof r2 && (n2 = r2, r2 = null);
          var s2 = u(t2);
          return r2 && s2 ? w && !g ? e.encodePayloadAsBlob(t2, n2) : e.encodePayloadAsArrayBuffer(t2, n2) : t2.length ? void c(t2, i2, function(t3, e2) {
            return n2(e2.join(""));
          }) : n2("0:");
        }, e.decodePayload = function(t2, r2, n2) {
          if ("string" != typeof t2)
            return e.decodePayloadAsBinary(t2, r2, n2);
          "function" == typeof r2 && (n2 = r2, r2 = null);
          var o2;
          if ("" === t2)
            return n2(k, 0, 1);
          for (var i2, s2, a2 = "", c2 = 0, p2 = t2.length; c2 < p2; c2++) {
            var h2 = t2.charAt(c2);
            if (":" === h2) {
              if ("" === a2 || a2 != (i2 = Number(a2)))
                return n2(k, 0, 1);
              if (s2 = t2.substr(c2 + 1, i2), a2 != s2.length)
                return n2(k, 0, 1);
              if (s2.length) {
                if (o2 = e.decodePacket(s2, r2, false), k.type === o2.type && k.data === o2.data)
                  return n2(k, 0, 1);
                var u2 = n2(o2, c2 + i2, p2);
                if (false === u2)
                  return;
              }
              c2 += i2, a2 = "";
            } else
              a2 += h2;
          }
          return "" !== a2 ? n2(k, 0, 1) : void 0;
        }, e.encodePayloadAsArrayBuffer = function(t2, r2) {
          function n2(t3, r3) {
            e.encodePacket(t3, true, true, function(t4) {
              return r3(null, t4);
            });
          }
          return t2.length ? void c(t2, n2, function(t3, e2) {
            var n3 = e2.reduce(function(t4, e3) {
              var r3;
              return r3 = "string" == typeof e3 ? e3.length : e3.byteLength, t4 + r3.toString().length + r3 + 2;
            }, 0), o2 = new Uint8Array(n3), i2 = 0;
            return e2.forEach(function(t4) {
              var e3 = "string" == typeof t4, r3 = t4;
              if (e3) {
                for (var n4 = new Uint8Array(t4.length), s2 = 0; s2 < t4.length; s2++)
                  n4[s2] = t4.charCodeAt(s2);
                r3 = n4.buffer;
              }
              e3 ? o2[i2++] = 0 : o2[i2++] = 1;
              for (var a2 = r3.byteLength.toString(), s2 = 0; s2 < a2.length; s2++)
                o2[i2++] = parseInt(a2[s2]);
              o2[i2++] = 255;
              for (var n4 = new Uint8Array(r3), s2 = 0; s2 < n4.length; s2++)
                o2[i2++] = n4[s2];
            }), r2(o2.buffer);
          }) : r2(new ArrayBuffer(0));
        }, e.encodePayloadAsBlob = function(t2, r2) {
          function n2(t3, r3) {
            e.encodePacket(t3, true, true, function(t4) {
              var e2 = new Uint8Array(1);
              if (e2[0] = 1, "string" == typeof t4) {
                for (var n3 = new Uint8Array(t4.length), o2 = 0; o2 < t4.length; o2++)
                  n3[o2] = t4.charCodeAt(o2);
                t4 = n3.buffer, e2[0] = 0;
              }
              for (var i2 = t4 instanceof ArrayBuffer ? t4.byteLength : t4.size, s2 = i2.toString(), a2 = new Uint8Array(s2.length + 1), o2 = 0; o2 < s2.length; o2++)
                a2[o2] = parseInt(s2[o2]);
              if (a2[s2.length] = 255, w) {
                var c2 = new w([e2.buffer, a2.buffer, t4]);
                r3(null, c2);
              }
            });
          }
          c(t2, n2, function(t3, e2) {
            return r2(new w(e2));
          });
        }, e.decodePayloadAsBinary = function(t2, r2, n2) {
          "function" == typeof r2 && (n2 = r2, r2 = null);
          for (var o2 = t2, i2 = []; o2.byteLength > 0; ) {
            for (var s2 = new Uint8Array(o2), a2 = 0 === s2[0], c2 = "", p2 = 1; 255 !== s2[p2]; p2++) {
              if (c2.length > 310)
                return n2(k, 0, 1);
              c2 += s2[p2];
            }
            o2 = f(o2, 2 + c2.length), c2 = parseInt(c2);
            var h2 = f(o2, 0, c2);
            if (a2)
              try {
                h2 = String.fromCharCode.apply(null, new Uint8Array(h2));
              } catch (t3) {
                var u2 = new Uint8Array(h2);
                h2 = "";
                for (var p2 = 0; p2 < u2.length; p2++)
                  h2 += String.fromCharCode(u2[p2]);
              }
            i2.push(h2), o2 = f(o2, c2);
          }
          var l2 = i2.length;
          i2.forEach(function(t3, o3) {
            n2(e.decodePacket(t3, r2, true), o3, l2);
          });
        };
      }, function(t, e) {
        t.exports = Object.keys || function(t2) {
          var e2 = [], r = Object.prototype.hasOwnProperty;
          for (var n in t2)
            r.call(t2, n) && e2.push(n);
          return e2;
        };
      }, function(t, e, r) {
        function n(t2) {
          if (!t2 || "object" != typeof t2)
            return false;
          if (o(t2)) {
            for (var e2 = 0, r2 = t2.length; e2 < r2; e2++)
              if (n(t2[e2]))
                return true;
            return false;
          }
          if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(t2) || "function" == typeof ArrayBuffer && t2 instanceof ArrayBuffer || s && t2 instanceof Blob || a && t2 instanceof File)
            return true;
          if (t2.toJSON && "function" == typeof t2.toJSON && 1 === arguments.length)
            return n(t2.toJSON(), true);
          for (var i2 in t2)
            if (Object.prototype.hasOwnProperty.call(t2, i2) && n(t2[i2]))
              return true;
          return false;
        }
        var o = r(7), i = Object.prototype.toString, s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob), a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
        t.exports = n;
      }, function(t, e) {
        t.exports = function(t2, e2, r) {
          var n = t2.byteLength;
          if (e2 = e2 || 0, r = r || n, t2.slice)
            return t2.slice(e2, r);
          if (e2 < 0 && (e2 += n), r < 0 && (r += n), r > n && (r = n), e2 >= n || e2 >= r || 0 === n)
            return new ArrayBuffer(0);
          for (var o = new Uint8Array(t2), i = new Uint8Array(r - e2), s = e2, a = 0; s < r; s++, a++)
            i[a] = o[s];
          return i.buffer;
        };
      }, function(t, e) {
        function r(t2, e2, r2) {
          function o(t3, n2) {
            if (o.count <= 0)
              throw new Error("after called too many times");
            --o.count, t3 ? (i = true, e2(t3), e2 = r2) : 0 !== o.count || i || e2(null, n2);
          }
          var i = false;
          return r2 = r2 || n, o.count = t2, 0 === t2 ? e2() : o;
        }
        function n() {
        }
        t.exports = r;
      }, function(t, e) {
        function r(t2) {
          for (var e2, r2, n2 = [], o2 = 0, i2 = t2.length; o2 < i2; )
            e2 = t2.charCodeAt(o2++), e2 >= 55296 && e2 <= 56319 && o2 < i2 ? (r2 = t2.charCodeAt(o2++), 56320 == (64512 & r2) ? n2.push(((1023 & e2) << 10) + (1023 & r2) + 65536) : (n2.push(e2), o2--)) : n2.push(e2);
          return n2;
        }
        function n(t2) {
          for (var e2, r2 = t2.length, n2 = -1, o2 = ""; ++n2 < r2; )
            e2 = t2[n2], e2 > 65535 && (e2 -= 65536, o2 += d(e2 >>> 10 & 1023 | 55296), e2 = 56320 | 1023 & e2), o2 += d(e2);
          return o2;
        }
        function o(t2, e2) {
          if (t2 >= 55296 && t2 <= 57343) {
            if (e2)
              throw Error("Lone surrogate U+" + t2.toString(16).toUpperCase() + " is not a scalar value");
            return false;
          }
          return true;
        }
        function i(t2, e2) {
          return d(t2 >> e2 & 63 | 128);
        }
        function s(t2, e2) {
          if (0 == (4294967168 & t2))
            return d(t2);
          var r2 = "";
          return 0 == (4294965248 & t2) ? r2 = d(t2 >> 6 & 31 | 192) : 0 == (4294901760 & t2) ? (o(t2, e2) || (t2 = 65533), r2 = d(t2 >> 12 & 15 | 224), r2 += i(t2, 6)) : 0 == (4292870144 & t2) && (r2 = d(t2 >> 18 & 7 | 240), r2 += i(t2, 12), r2 += i(t2, 6)), r2 += d(63 & t2 | 128);
        }
        function a(t2, e2) {
          e2 = e2 || {};
          for (var n2, o2 = false !== e2.strict, i2 = r(t2), a2 = i2.length, c2 = -1, p2 = ""; ++c2 < a2; )
            n2 = i2[c2], p2 += s(n2, o2);
          return p2;
        }
        function c() {
          if (l >= f)
            throw Error("Invalid byte index");
          var t2 = 255 & u[l];
          if (l++, 128 == (192 & t2))
            return 63 & t2;
          throw Error("Invalid continuation byte");
        }
        function p(t2) {
          var e2, r2, n2, i2, s2;
          if (l > f)
            throw Error("Invalid byte index");
          if (l == f)
            return false;
          if (e2 = 255 & u[l], l++, 0 == (128 & e2))
            return e2;
          if (192 == (224 & e2)) {
            if (r2 = c(), s2 = (31 & e2) << 6 | r2, s2 >= 128)
              return s2;
            throw Error("Invalid continuation byte");
          }
          if (224 == (240 & e2)) {
            if (r2 = c(), n2 = c(), s2 = (15 & e2) << 12 | r2 << 6 | n2, s2 >= 2048)
              return o(s2, t2) ? s2 : 65533;
            throw Error("Invalid continuation byte");
          }
          if (240 == (248 & e2) && (r2 = c(), n2 = c(), i2 = c(), s2 = (7 & e2) << 18 | r2 << 12 | n2 << 6 | i2, s2 >= 65536 && s2 <= 1114111))
            return s2;
          throw Error("Invalid UTF-8 detected");
        }
        function h(t2, e2) {
          e2 = e2 || {};
          var o2 = false !== e2.strict;
          u = r(t2), f = u.length, l = 0;
          for (var i2, s2 = []; (i2 = p(o2)) !== false; )
            s2.push(i2);
          return n(s2);
        }
        var u, f, l, d = String.fromCharCode;
        t.exports = { version: "2.1.2", encode: a, decode: h };
      }, function(t, e) {
        !function(t2) {
          "use strict";
          e.encode = function(e2) {
            var r, n = new Uint8Array(e2), o = n.length, i = "";
            for (r = 0; r < o; r += 3)
              i += t2[n[r] >> 2], i += t2[(3 & n[r]) << 4 | n[r + 1] >> 4], i += t2[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], i += t2[63 & n[r + 2]];
            return o % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 === 1 && (i = i.substring(0, i.length - 2) + "=="), i;
          }, e.decode = function(e2) {
            var r, n, o, i, s, a = 0.75 * e2.length, c = e2.length, p = 0;
            "=" === e2[e2.length - 1] && (a--, "=" === e2[e2.length - 2] && a--);
            var h = new ArrayBuffer(a), u = new Uint8Array(h);
            for (r = 0; r < c; r += 4)
              n = t2.indexOf(e2[r]), o = t2.indexOf(e2[r + 1]), i = t2.indexOf(e2[r + 2]), s = t2.indexOf(e2[r + 3]), u[p++] = n << 2 | o >> 4, u[p++] = (15 & o) << 4 | i >> 2, u[p++] = (3 & i) << 6 | 63 & s;
            return h;
          };
        }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
      }, function(t, e) {
        function r(t2) {
          return t2.map(function(t3) {
            if (t3.buffer instanceof ArrayBuffer) {
              var e2 = t3.buffer;
              if (t3.byteLength !== e2.byteLength) {
                var r2 = new Uint8Array(t3.byteLength);
                r2.set(new Uint8Array(e2, t3.byteOffset, t3.byteLength)), e2 = r2.buffer;
              }
              return e2;
            }
            return t3;
          });
        }
        function n(t2, e2) {
          e2 = e2 || {};
          var n2 = new i();
          return r(t2).forEach(function(t3) {
            n2.append(t3);
          }), e2.type ? n2.getBlob(e2.type) : n2.getBlob();
        }
        function o(t2, e2) {
          return new Blob(r(t2), e2 || {});
        }
        var i = "undefined" != typeof i ? i : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder, s = function() {
          try {
            var t2 = new Blob(["hi"]);
            return 2 === t2.size;
          } catch (t3) {
            return false;
          }
        }(), a = s && function() {
          try {
            var t2 = new Blob([new Uint8Array([1, 2])]);
            return 2 === t2.size;
          } catch (t3) {
            return false;
          }
        }(), c = i && i.prototype.append && i.prototype.getBlob;
        "undefined" != typeof Blob && (n.prototype = Blob.prototype, o.prototype = Blob.prototype), t.exports = function() {
          return s ? a ? Blob : o : c ? n : void 0;
        }();
      }, function(t, e) {
        e.encode = function(t2) {
          var e2 = "";
          for (var r in t2)
            t2.hasOwnProperty(r) && (e2.length && (e2 += "&"), e2 += encodeURIComponent(r) + "=" + encodeURIComponent(t2[r]));
          return e2;
        }, e.decode = function(t2) {
          for (var e2 = {}, r = t2.split("&"), n = 0, o = r.length; n < o; n++) {
            var i = r[n].split("=");
            e2[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
          }
          return e2;
        };
      }, function(t, e) {
        t.exports = function(t2, e2) {
          var r = function() {
          };
          r.prototype = e2.prototype, t2.prototype = new r(), t2.prototype.constructor = t2;
        };
      }, function(t, e) {
        "use strict";
        function r(t2) {
          var e2 = "";
          do
            e2 = s[t2 % a] + e2, t2 = Math.floor(t2 / a);
          while (t2 > 0);
          return e2;
        }
        function n(t2) {
          var e2 = 0;
          for (h = 0; h < t2.length; h++)
            e2 = e2 * a + c[t2.charAt(h)];
          return e2;
        }
        function o() {
          var t2 = r(+new Date());
          return t2 !== i ? (p = 0, i = t2) : t2 + "." + r(p++);
        }
        for (var i, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, p = 0, h = 0; h < a; h++)
          c[s[h]] = h;
        o.encode = r, o.decode = n, t.exports = o;
      }, function(t, e, r) {
        function n() {
        }
        function o(t2) {
          i.call(this, t2), this.query = this.query || {}, c || (c = a.___eio = a.___eio || []), this.index = c.length;
          var e2 = this;
          c.push(function(t3) {
            e2.onData(t3);
          }), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function() {
            e2.script && (e2.script.onerror = n);
          }, false);
        }
        var i = r(17), s = r(28), a = r(15);
        t.exports = o;
        var c, p = /\n/g, h = /\\n/g;
        s(o, i), o.prototype.supportsBinary = false, o.prototype.doClose = function() {
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose.call(this);
        }, o.prototype.doPoll = function() {
          var t2 = this, e2 = document.createElement("script");
          this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e2.async = true, e2.src = this.uri(), e2.onerror = function(e3) {
            t2.onError("jsonp poll error", e3);
          };
          var r2 = document.getElementsByTagName("script")[0];
          r2 ? r2.parentNode.insertBefore(e2, r2) : (document.head || document.body).appendChild(e2), this.script = e2;
          var n2 = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
          n2 && setTimeout(function() {
            var t3 = document.createElement("iframe");
            document.body.appendChild(t3), document.body.removeChild(t3);
          }, 100);
        }, o.prototype.doWrite = function(t2, e2) {
          function r2() {
            n2(), e2();
          }
          function n2() {
            if (o2.iframe)
              try {
                o2.form.removeChild(o2.iframe);
              } catch (t4) {
                o2.onError("jsonp polling iframe removal error", t4);
              }
            try {
              var t3 = '<iframe src="javascript:0" name="' + o2.iframeId + '">';
              i2 = document.createElement(t3);
            } catch (t4) {
              i2 = document.createElement("iframe"), i2.name = o2.iframeId, i2.src = "javascript:0";
            }
            i2.id = o2.iframeId, o2.form.appendChild(i2), o2.iframe = i2;
          }
          var o2 = this;
          if (!this.form) {
            var i2, s2 = document.createElement("form"), a2 = document.createElement("textarea"), c2 = this.iframeId = "eio_iframe_" + this.index;
            s2.className = "socketio", s2.style.position = "absolute", s2.style.top = "-1000px", s2.style.left = "-1000px", s2.target = c2, s2.method = "POST", s2.setAttribute("accept-charset", "utf-8"), a2.name = "d", s2.appendChild(a2), document.body.appendChild(s2), this.form = s2, this.area = a2;
          }
          this.form.action = this.uri(), n2(), t2 = t2.replace(h, "\\\n"), this.area.value = t2.replace(p, "\\n");
          try {
            this.form.submit();
          } catch (t3) {
          }
          this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
            "complete" === o2.iframe.readyState && r2();
          } : this.iframe.onload = r2;
        };
      }, function(t, e, r) {
        function n(t2) {
          var e2 = t2 && t2.forceBase64;
          e2 && (this.supportsBinary = false), this.perMessageDeflate = t2.perMessageDeflate, this.usingBrowserWebSocket = o && !t2.forceNode, this.protocols = t2.protocols, this.usingBrowserWebSocket || (u = i), s.call(this, t2);
        }
        var o, i, s = r(18), a = r(19), c = r(27), p = r(28), h = r(29);
        r(3)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? o = WebSocket : "undefined" != typeof self && (o = self.WebSocket || self.MozWebSocket), "undefined" == typeof window)
          try {
            i = r(32);
          } catch (t2) {
          }
        var u = o || i;
        t.exports = n, p(n, s), n.prototype.name = "websocket", n.prototype.supportsBinary = true, n.prototype.doOpen = function() {
          if (this.check()) {
            var t2 = this.uri(), e2 = this.protocols, r2 = {};
            this.isReactNative || (r2.agent = this.agent, r2.perMessageDeflate = this.perMessageDeflate, r2.pfx = this.pfx, r2.key = this.key, r2.passphrase = this.passphrase, r2.cert = this.cert, r2.ca = this.ca, r2.ciphers = this.ciphers, r2.rejectUnauthorized = this.rejectUnauthorized), this.extraHeaders && (r2.headers = this.extraHeaders), this.localAddress && (r2.localAddress = this.localAddress);
            try {
              this.ws = this.usingBrowserWebSocket && !this.isReactNative ? e2 ? new u(t2, e2) : new u(t2) : new u(t2, e2, r2);
            } catch (t3) {
              return this.emit("error", t3);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = false), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = true, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
          }
        }, n.prototype.addEventListeners = function() {
          var t2 = this;
          this.ws.onopen = function() {
            t2.onOpen();
          }, this.ws.onclose = function() {
            t2.onClose();
          }, this.ws.onmessage = function(e2) {
            t2.onData(e2.data);
          }, this.ws.onerror = function(e2) {
            t2.onError("websocket error", e2);
          };
        }, n.prototype.write = function(t2) {
          function e2() {
            r2.emit("flush"), setTimeout(function() {
              r2.writable = true, r2.emit("drain");
            }, 0);
          }
          var r2 = this;
          this.writable = false;
          for (var n2 = t2.length, o2 = 0, i2 = n2; o2 < i2; o2++)
            !function(t3) {
              a.encodePacket(t3, r2.supportsBinary, function(o3) {
                if (!r2.usingBrowserWebSocket) {
                  var i3 = {};
                  if (t3.options && (i3.compress = t3.options.compress), r2.perMessageDeflate) {
                    var s2 = "string" == typeof o3 ? Buffer.byteLength(o3) : o3.length;
                    s2 < r2.perMessageDeflate.threshold && (i3.compress = false);
                  }
                }
                try {
                  r2.usingBrowserWebSocket ? r2.ws.send(o3) : r2.ws.send(o3, i3);
                } catch (t4) {
                }
                --n2 || e2();
              });
            }(t2[o2]);
        }, n.prototype.onClose = function() {
          s.prototype.onClose.call(this);
        }, n.prototype.doClose = function() {
          "undefined" != typeof this.ws && this.ws.close();
        }, n.prototype.uri = function() {
          var t2 = this.query || {}, e2 = this.secure ? "wss" : "ws", r2 = "";
          this.port && ("wss" === e2 && 443 !== Number(this.port) || "ws" === e2 && 80 !== Number(this.port)) && (r2 = ":" + this.port), this.timestampRequests && (t2[this.timestampParam] = h()), this.supportsBinary || (t2.b64 = 1), t2 = c.encode(t2), t2.length && (t2 = "?" + t2);
          var n2 = this.hostname.indexOf(":") !== -1;
          return e2 + "://" + (n2 ? "[" + this.hostname + "]" : this.hostname) + r2 + this.path + t2;
        }, n.prototype.check = function() {
          return !(!u || "__initialize" in u && this.name === n.prototype.name);
        };
      }, function(t, e) {
      }, function(t, e) {
        var r = [].indexOf;
        t.exports = function(t2, e2) {
          if (r)
            return t2.indexOf(e2);
          for (var n = 0; n < t2.length; ++n)
            if (t2[n] === e2)
              return n;
          return -1;
        };
      }, function(t, e, r) {
        "use strict";
        function n(t2, e2, r2) {
          this.io = t2, this.nsp = e2, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = false, this.disconnected = true, this.flags = {}, r2 && r2.query && (this.query = r2.query), this.io.autoConnect && this.open();
        }
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t2) {
          return typeof t2;
        } : function(t2) {
          return t2 && "function" == typeof Symbol && t2.constructor === Symbol && t2 !== Symbol.prototype ? "symbol" : typeof t2;
        }, i = r(4), s = r(5), a = r(35), c = r(36), p = r(37), h = (r(3)("socket.io-client:socket"), r(27)), u = r(21);
        t.exports = e = n;
        var f = { connect: 1, connect_error: 1, connect_timeout: 1, connecting: 1, disconnect: 1, error: 1, reconnect: 1, reconnect_attempt: 1, reconnect_failed: 1, reconnect_error: 1, reconnecting: 1, ping: 1, pong: 1 }, l = s.prototype.emit;
        s(n.prototype), n.prototype.subEvents = function() {
          if (!this.subs) {
            var t2 = this.io;
            this.subs = [c(t2, "open", p(this, "onopen")), c(t2, "packet", p(this, "onpacket")), c(t2, "close", p(this, "onclose"))];
          }
        }, n.prototype.open = n.prototype.connect = function() {
          return this.connected ? this : (this.subEvents(), this.io.reconnecting || this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this);
        }, n.prototype.send = function() {
          var t2 = a(arguments);
          return t2.unshift("message"), this.emit.apply(this, t2), this;
        }, n.prototype.emit = function(t2) {
          if (f.hasOwnProperty(t2))
            return l.apply(this, arguments), this;
          var e2 = a(arguments), r2 = { type: (void 0 !== this.flags.binary ? this.flags.binary : u(e2)) ? i.BINARY_EVENT : i.EVENT, data: e2 };
          return r2.options = {}, r2.options.compress = !this.flags || false !== this.flags.compress, "function" == typeof e2[e2.length - 1] && (this.acks[this.ids] = e2.pop(), r2.id = this.ids++), this.connected ? this.packet(r2) : this.sendBuffer.push(r2), this.flags = {}, this;
        }, n.prototype.packet = function(t2) {
          t2.nsp = this.nsp, this.io.packet(t2);
        }, n.prototype.onopen = function() {
          if ("/" !== this.nsp)
            if (this.query) {
              var t2 = "object" === o(this.query) ? h.encode(this.query) : this.query;
              this.packet({ type: i.CONNECT, query: t2 });
            } else
              this.packet({ type: i.CONNECT });
        }, n.prototype.onclose = function(t2) {
          this.connected = false, this.disconnected = true, delete this.id, this.emit("disconnect", t2);
        }, n.prototype.onpacket = function(t2) {
          var e2 = t2.nsp === this.nsp, r2 = t2.type === i.ERROR && "/" === t2.nsp;
          if (e2 || r2)
            switch (t2.type) {
              case i.CONNECT:
                this.onconnect();
                break;
              case i.EVENT:
                this.onevent(t2);
                break;
              case i.BINARY_EVENT:
                this.onevent(t2);
                break;
              case i.ACK:
                this.onack(t2);
                break;
              case i.BINARY_ACK:
                this.onack(t2);
                break;
              case i.DISCONNECT:
                this.ondisconnect();
                break;
              case i.ERROR:
                this.emit("error", t2.data);
            }
        }, n.prototype.onevent = function(t2) {
          var e2 = t2.data || [];
          null != t2.id && e2.push(this.ack(t2.id)), this.connected ? l.apply(this, e2) : this.receiveBuffer.push(e2);
        }, n.prototype.ack = function(t2) {
          var e2 = this, r2 = false;
          return function() {
            if (!r2) {
              r2 = true;
              var n2 = a(arguments);
              e2.packet({ type: u(n2) ? i.BINARY_ACK : i.ACK, id: t2, data: n2 });
            }
          };
        }, n.prototype.onack = function(t2) {
          var e2 = this.acks[t2.id];
          "function" == typeof e2 && (e2.apply(this, t2.data), delete this.acks[t2.id]);
        }, n.prototype.onconnect = function() {
          this.connected = true, this.disconnected = false, this.emitBuffered(), this.emit("connect");
        }, n.prototype.emitBuffered = function() {
          var t2;
          for (t2 = 0; t2 < this.receiveBuffer.length; t2++)
            l.apply(this, this.receiveBuffer[t2]);
          for (this.receiveBuffer = [], t2 = 0; t2 < this.sendBuffer.length; t2++)
            this.packet(this.sendBuffer[t2]);
          this.sendBuffer = [];
        }, n.prototype.ondisconnect = function() {
          this.destroy(), this.onclose("io server disconnect");
        }, n.prototype.destroy = function() {
          if (this.subs) {
            for (var t2 = 0; t2 < this.subs.length; t2++)
              this.subs[t2].destroy();
            this.subs = null;
          }
          this.io.destroy(this);
        }, n.prototype.close = n.prototype.disconnect = function() {
          return this.connected && this.packet({ type: i.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
        }, n.prototype.compress = function(t2) {
          return this.flags.compress = t2, this;
        }, n.prototype.binary = function(t2) {
          return this.flags.binary = t2, this;
        };
      }, function(t, e) {
        function r(t2, e2) {
          var r2 = [];
          e2 = e2 || 0;
          for (var n = e2 || 0; n < t2.length; n++)
            r2[n - e2] = t2[n];
          return r2;
        }
        t.exports = r;
      }, function(t, e) {
        "use strict";
        function r(t2, e2, r2) {
          return t2.on(e2, r2), { destroy: function() {
            t2.removeListener(e2, r2);
          } };
        }
        t.exports = r;
      }, function(t, e) {
        var r = [].slice;
        t.exports = function(t2, e2) {
          if ("string" == typeof e2 && (e2 = t2[e2]), "function" != typeof e2)
            throw new Error("bind() requires a function");
          var n = r.call(arguments, 2);
          return function() {
            return e2.apply(t2, n.concat(r.call(arguments)));
          };
        };
      }, function(t, e) {
        function r(t2) {
          t2 = t2 || {}, this.ms = t2.min || 100, this.max = t2.max || 1e4, this.factor = t2.factor || 2, this.jitter = t2.jitter > 0 && t2.jitter <= 1 ? t2.jitter : 0, this.attempts = 0;
        }
        t.exports = r, r.prototype.duration = function() {
          var t2 = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var e2 = Math.random(), r2 = Math.floor(e2 * this.jitter * t2);
            t2 = 0 == (1 & Math.floor(10 * e2)) ? t2 - r2 : t2 + r2;
          }
          return 0 | Math.min(t2, this.max);
        }, r.prototype.reset = function() {
          this.attempts = 0;
        }, r.prototype.setMin = function(t2) {
          this.ms = t2;
        }, r.prototype.setMax = function(t2) {
          this.max = t2;
        }, r.prototype.setJitter = function(t2) {
          this.jitter = t2;
        };
      }]);
    });
  }
});

// src/injector/index.ts
var import_lodash = __toESM(require_lodash());
import {
  createEffect as createEffectOrig,
  createEvent as createEventOrig,
  createStore as createStoreOrig
} from "effector";

// src/common/filterLogsFn.ts
var filterLogsFn = (query) => {
  if (!query) {
    return () => true;
  }
  const rw = new RegExp(query.replace(/[/\-\\^$*+?.()[\]{}]/g, "\\$&"), "i");
  return (name) => {
    return rw.test(name);
  };
};

// node_modules/rempl/lib/utils/global.js
function check(it) {
  return it && it.Math === Math && it;
}
var resolvedGlobalThis = check(typeof globalThis === "object" && globalThis) || check(typeof window === "object" && window) || check(typeof self === "object" && self) || check(typeof global === "object" && global) || function() {
  return this;
}() || Function("return this")();
var resolvedTop = resolvedGlobalThis.top || resolvedGlobalThis;
var resolvedParent = resolvedGlobalThis.parent || resolvedGlobalThis;
var resolvedOpener = resolvedGlobalThis.opener || null;

// node_modules/rempl/lib/classes/ReactiveValue.js
var ReactiveValue = class {
  constructor(value) {
    __publicField(this, "value");
    __publicField(this, "handler", null);
    this.value = value;
  }
  set(value) {
    if (!Object.is(this.value, value)) {
      this.value = value;
      this.apply();
    }
  }
  get() {
    return this.value;
  }
  on(fn, context) {
    let cursor = this.handler;
    while (cursor !== null) {
      if (cursor.fn === fn && cursor.context === context) {
        console.warn("ReactiveValue#on: duplicate fn & context pair");
      }
      cursor = cursor.handler;
    }
    this.handler = {
      fn,
      context,
      handler: this.handler
    };
  }
  link(fn, context) {
    this.on(fn, context);
    fn.call(context, this.value);
  }
  off(fn, context) {
    let cursor = this.handler;
    let prev = this;
    while (cursor !== null) {
      if (cursor.fn === fn && cursor.context === context) {
        cursor.fn = function() {
        };
        prev.handler = cursor.handler;
        return;
      }
      prev = cursor;
      cursor = cursor.handler;
    }
    console.warn("ReactiveValue#off: fn & context pair not found, nothing was removed");
  }
  apply() {
    let cursor = this.handler;
    while (cursor !== null) {
      cursor.fn.call(cursor.context, this.value);
      cursor = cursor.handler;
    }
  }
};

// node_modules/rempl/lib/classes/EndpointList.js
function normalize(oldList, newList) {
  const uniqueItems = [...new Set(Array.isArray(newList) ? newList : [])];
  const diff = uniqueItems.length !== oldList.length || uniqueItems.some((endpoint) => !oldList.includes(endpoint));
  return diff ? uniqueItems : oldList;
}
var EndpointList = class extends ReactiveValue {
  constructor(list) {
    super(normalize([], list));
  }
  set(newValue) {
    super.set(normalize(this.value, newValue));
  }
};

// node_modules/rempl/lib/classes/EndpointListSet.js
var EndpointListSet = class extends EndpointList {
  constructor() {
    super([]);
    __publicField(this, "endpointLists", /* @__PURE__ */ new Set());
  }
  set() {
    super.set(
      [].concat(
        ...[...this.endpointLists].map((endpointList) => endpointList.value)
      )
    );
  }
  add(endpointList) {
    if (!this.endpointLists.has(endpointList)) {
      this.endpointLists.add(endpointList);
      endpointList.on(this.set, this);
      this.set();
    }
  }
  remove(endpointList) {
    if (this.endpointLists.has(endpointList)) {
      this.endpointLists.delete(endpointList);
      endpointList.off(this.set, this);
      this.set();
    }
  }
};

// node_modules/rempl/lib/utils/index.js
var _a;
var trustedEmptyHTML = (_a = resolvedGlobalThis.trustedTypes) == null ? void 0 : _a.emptyHTML;
function genUID(len) {
  function base36(val) {
    return Math.round(val).toString(36);
  }
  let result = base36(10 + 25 * Math.random());
  if (!len) {
    len = 16;
  }
  while (result.length < len) {
    result += base36(Date.now() * Math.random());
  }
  return result.substr(0, len);
}
function subscribe(list, item) {
  list.push(item);
  return () => {
    const idx = list.indexOf(item);
    if (idx !== -1) {
      list.splice(idx, 1);
    }
  };
}

// node_modules/rempl/lib/transport/event.js
var DEBUG_PREFIX = "[rempl][event-transport] ";
var allTransports = [];
var EventTransport = class {
  constructor(name, connectTo, win) {
    __publicField(this, "name");
    __publicField(this, "connectTo");
    __publicField(this, "realm");
    __publicField(this, "inputChannelId");
    __publicField(this, "connections", /* @__PURE__ */ new Map());
    __publicField(this, "connected", new ReactiveValue(false));
    __publicField(this, "endpointGetUI", /* @__PURE__ */ new Map());
    __publicField(this, "ownEndpoints", new EndpointList());
    __publicField(this, "remoteEndpoints", new EndpointListSet());
    __publicField(this, "initCallbacks", []);
    __publicField(this, "dataCallbacks", []);
    __publicField(this, "sendCallbacks", /* @__PURE__ */ new Map());
    __publicField(this, "inited", false);
    if (allTransports.length === 0 && typeof addEventListener === "function") {
      addEventListener(
        "message",
        (e) => {
          for (const transport2 of allTransports) {
            transport2._onMessage(e);
          }
        },
        false
      );
    }
    allTransports.push(this);
    this.name = name;
    this.connectTo = connectTo;
    this.inputChannelId = `${name}/${genUID()}`;
    this.realm = win || resolvedGlobalThis;
    this.ownEndpoints.on((endpoints2) => {
      if (this.connected.value) {
        this.send({
          type: "endpoints",
          data: [endpoints2]
        });
      }
    });
    if (typeof this.realm.postMessage !== "function" || typeof addEventListener !== "function") {
      console.warn(DEBUG_PREFIX + "Event (postMessage) transport isn't supported");
      return;
    }
    this._handshake(false);
  }
  static get(name, connectTo, win) {
    if (!win) {
      win = resolvedGlobalThis;
    }
    const transport2 = allTransports.find(
      (transport3) => transport3.name === name && transport3.connectTo === connectTo && transport3.realm === win
    );
    return transport2 || new EventTransport(name, connectTo, win);
  }
  _handshake(inited) {
    this._send(`${this.connectTo}:connect`, {
      type: "handshake",
      initiator: this.name,
      inited,
      endpoints: this.ownEndpoints.value
    });
  }
  _onMessage(event) {
    var _a2;
    if (event.source !== this.realm || event.target !== resolvedGlobalThis) {
      return;
    }
    const data = event.data || {};
    const connectTo = `${this.name}:connect`;
    switch (data.to) {
      case connectTo:
        if (((_a2 = data.payload) == null ? void 0 : _a2.initiator) === this.connectTo) {
          this._onConnect(data.from, data.payload);
        }
        break;
      case this.inputChannelId:
        if (this.connections.has(data.from)) {
          this._onData(data.from, data.payload);
        } else {
          console.warn(DEBUG_PREFIX + "unknown incoming connection", data.from);
        }
        break;
    }
  }
  _onConnect(from, payload) {
    if (!payload.inited) {
      this._handshake(true);
    }
    if (!this.connections.has(from)) {
      const endpoints2 = new EndpointList(payload.endpoints);
      this.remoteEndpoints.add(endpoints2);
      this.connections.set(from, {
        ttl: Date.now(),
        endpoints: endpoints2
      });
      this._send(from, {
        type: "connect",
        endpoints: this.ownEndpoints.value
      });
    }
    this.inited = true;
  }
  _onData(from, payload) {
    var _a2, _b, _c;
    switch (payload.type) {
      case "connect": {
        (_a2 = this.connections.get(from)) == null ? void 0 : _a2.endpoints.set(payload.endpoints);
        this.connected.set(true);
        this.initCallbacks.splice(0).forEach((args) => this.onInit(...args));
        break;
      }
      case "endpoints": {
        (_b = this.connections.get(from)) == null ? void 0 : _b.endpoints.set(payload.data[0]);
        break;
      }
      case "disconnect": {
        (_c = this.connections.get(from)) == null ? void 0 : _c.endpoints.set([]);
        this.connected.set(false);
        break;
      }
      case "callback": {
        if (payload.callback) {
          const callback = this.sendCallbacks.get(payload.callback);
          if (typeof callback === "function") {
            callback(...payload.data);
            this.sendCallbacks.delete(payload.callback);
          }
        }
        break;
      }
      case "data": {
        let args = payload.data;
        const callback = payload.callback;
        if (callback) {
          args = args.concat(this._wrapCallback(from, callback));
        }
        for (const { endpoint, fn } of this.dataCallbacks) {
          if (endpoint === payload.endpoint) {
            fn(...args);
          }
        }
        break;
      }
      case "getRemoteUI": {
        if (!payload.endpoint) {
          return;
        }
        const getUI = this.endpointGetUI.get(payload.endpoint);
        if (typeof getUI !== "function") {
          console.warn(
            DEBUG_PREFIX + "receive unknown endpoint for getRemoteUI(): " + payload.endpoint
          );
          if (payload.callback) {
            this._wrapCallback(
              from,
              payload.callback
            )("Wrong endpoint \u2013 " + payload.endpoint);
          }
        } else {
          if (payload.callback) {
            const callback = this._wrapCallback(from, payload.callback);
            getUI(payload.data[0] || {}).catch((error) => ({ error: String(error == null ? void 0 : error.message) })).then((res) => {
              if ("error" in res) {
                callback(res.error);
              } else {
                callback(null, res.type, res.value);
              }
            });
          }
        }
        break;
      }
      default:
        console.warn(
          DEBUG_PREFIX + "Unknown message type `" + payload.type + "` for `" + this.name + "`",
          payload
        );
    }
  }
  _wrapCallback(to, callback) {
    return (...args) => this._send(to, {
      type: "callback",
      callback,
      data: args
    });
  }
  _send(to, payload) {
    if (typeof this.realm.postMessage === "function") {
      const message = {
        from: this.inputChannelId,
        to,
        payload
      };
      this.realm.postMessage(message, "*");
    }
  }
  subscribeToEndpoint(endpoint, fn) {
    return subscribe(this.dataCallbacks, {
      endpoint,
      fn
    });
  }
  sendToEndpoint(endpoint, type, ...args) {
    let callback = null;
    if (args.length && typeof args[args.length - 1] === "function") {
      callback = genUID();
      this.sendCallbacks.set(callback, args.pop());
    }
    this.send({
      type,
      endpoint,
      data: args,
      callback
    });
  }
  send(payload) {
    for (const channelId of this.connections.keys()) {
      this._send(channelId, payload);
    }
  }
  onInit(endpoint, callback) {
    const id = endpoint.id || null;
    if (id) {
      this.ownEndpoints.set(this.ownEndpoints.value.concat(id));
      if (typeof endpoint.getRemoteUI === "function") {
        this.endpointGetUI.set(id, endpoint.getRemoteUI);
      }
    }
    if (this.inited) {
      callback({
        connected: this.connected,
        subscribe: this.subscribeToEndpoint.bind(this, id),
        getRemoteUI: this.sendToEndpoint.bind(this, id, "getRemoteUI"),
        send: this.sendToEndpoint.bind(this, id, "data")
      });
    } else {
      this.initCallbacks.push([endpoint, callback]);
    }
    return this;
  }
  sync(endpoint) {
    const channel = genUID(8) + ":" + this.connectTo;
    this.onInit(endpoint, (api) => {
      api.subscribe(endpoint.processInput.bind(endpoint));
      api.connected.link((connected) => {
        endpoint.setupChannel(channel, api.send, this.remoteEndpoints, connected);
      });
    });
    return this;
  }
};

// node_modules/rempl/lib/classes/Namespace.js
var Namespace = class {
  constructor(name, owner) {
    __publicField(this, "name");
    __publicField(this, "owner");
    __publicField(this, "methods", /* @__PURE__ */ Object.create(null));
    __publicField(this, "remoteMethodWrappers", /* @__PURE__ */ Object.create(null));
    __publicField(this, "remoteMethods", []);
    __publicField(this, "listeners", null);
    this.name = name;
    this.owner = owner;
    this.methods = /* @__PURE__ */ Object.create(null);
  }
  isMethodProvided(methodName) {
    return methodName in this.methods;
  }
  provide(methodName, fn) {
    if (typeof methodName === "string") {
      if (typeof fn === "function") {
        this.methods[methodName] = fn;
        this.owner.scheduleProvidedMethodsUpdate();
      }
    } else {
      const methods = methodName;
      for (const [methodName2, fn2] of Object.entries(methods)) {
        if (typeof fn2 === "function") {
          this.methods[methodName2] = fn2;
          this.owner.scheduleProvidedMethodsUpdate();
        }
      }
    }
  }
  revoke(methodName) {
    if (Array.isArray(methodName)) {
      methodName.forEach(this.revoke, this);
    } else {
      if (this.isMethodProvided(methodName)) {
        delete this.methods[methodName];
        this.owner.scheduleProvidedMethodsUpdate();
      }
    }
  }
  isRemoteMethodExists(methodName) {
    return this.remoteMethods.includes(methodName);
  }
  callRemote(method, ...args) {
    let callback = null;
    if (args.length && typeof args[args.length - 1] === "function") {
      callback = args.pop();
      console.warn(
        "[rempl] Using a callback for Namespace#callMethod() is deprecated, use returned promise value instead"
      );
    }
    return new Promise((resolve) => {
      const callPacket = {
        type: "call",
        ns: this.name,
        method,
        args
      };
      this.owner.send(callPacket, (...args2) => {
        resolve(args2[0]);
        callback == null ? void 0 : callback(...args2);
      });
    });
  }
  getRemoteMethod(methodName) {
    let methodWrapper = this.remoteMethodWrappers[methodName];
    if (typeof methodWrapper !== "function") {
      methodWrapper = this.remoteMethodWrappers[methodName] = Object.assign(
        (...args) => {
          if (methodWrapper.available) {
            return this.callRemote(methodName, ...args);
          }
          return Promise.reject(
            new Error(
              `[rempl] ${this.owner.getName()} ns("${this.name}") has no available remote method "${methodName}`
            )
          );
        },
        {
          available: this.remoteMethods.indexOf(methodName) !== -1
        }
      );
    }
    return methodWrapper;
  }
  onRemoteMethodsChanged(callback) {
    const listener = {
      event: "remoteMethodsChanged",
      callback,
      listeners: this.listeners
    };
    this.listeners = listener;
    callback([...this.remoteMethods]);
    return () => {
      let cursor = this.listeners;
      let prev = this;
      while (cursor !== null) {
        if (cursor === listener) {
          prev.listeners = cursor.listeners;
          break;
        }
        prev = cursor;
        cursor = cursor.listeners;
      }
    };
  }
  static invoke(namespace, method, args, callback) {
    let callbackCalled = false;
    args = args.concat((...args2) => {
      callbackCalled = true;
      callback(...args2);
      console.warn(
        "[rempl] Using a callback in provided methods has been deprecated, just return a value or promise instead"
      );
    });
    Promise.resolve(namespace.methods[method].apply(null, args)).then((value) => {
      if (!callbackCalled) {
        callback(value);
      }
    });
  }
  static notifyRemoteMethodsChanged(namespace) {
    let cursor = namespace.listeners;
    for (const method in namespace.remoteMethodWrappers) {
      namespace.remoteMethodWrappers[method].available = namespace.remoteMethods.includes(method);
    }
    while (cursor !== null) {
      if (cursor.event === "remoteMethodsChanged") {
        cursor.callback.call(null, [...namespace.remoteMethods]);
      }
      cursor = cursor.listeners;
    }
  }
};

// node_modules/rempl/lib/classes/Endpoint.js
var Endpoint = class {
  constructor(id) {
    __publicField(this, "id");
    __publicField(this, "namespaces");
    __publicField(this, "type", "Endpoint");
    __publicField(this, "channels", []);
    __publicField(this, "connected", new ReactiveValue(false));
    __publicField(this, "remoteEndpoints", new EndpointListSet());
    __publicField(this, "providedMethodsUpdateTimer");
    this.id = id || null;
    this.namespaces = /* @__PURE__ */ Object.create(null);
    this.remoteEndpoints.on((endpoints2) => {
      this.connected.set(endpoints2.includes(this.id || "*"));
    }, this);
  }
  get namespaceClass() {
    return Namespace;
  }
  getName() {
    return this.type + (this.id ? "#" + this.id : "");
  }
  ns(name) {
    let namespace = this.namespaces[name];
    if (!namespace) {
      namespace = Object.assign(new this.namespaceClass(name, this));
      this.namespaces[name] = namespace;
    }
    return namespace;
  }
  send(packet, callback = null) {
    for (const { send: send2 } of this.channels) {
      send2(packet, callback);
    }
  }
  requestRemoteApi() {
    this.send({ type: "getProvidedMethods" }, (methods) => {
      this.setRemoteApi(methods);
    });
  }
  setRemoteApi(api) {
    const changed = [];
    if (!api) {
      api = {};
    }
    for (const name in api) {
      if (Array.isArray(api[name])) {
        const ns = this.ns(name);
        const methods = api[name].slice().sort();
        const different = ns.remoteMethods.length !== methods.length || ns.remoteMethods.some(function(value, idx) {
          return value !== methods[idx];
        });
        if (different) {
          ns.remoteMethods = methods;
          changed.push(ns);
        }
      }
    }
    for (const name in this.namespaces) {
      if (Array.isArray(api[name]) === false) {
        const ns = this.namespaces[name];
        ns.remoteMethods = [];
        changed.push(ns);
      }
    }
    changed.forEach((ns) => Namespace.notifyRemoteMethodsChanged(ns));
  }
  getProvidedApi() {
    const api = /* @__PURE__ */ Object.create(null);
    for (const name in this.namespaces) {
      api[name] = Object.keys(this.namespaces[name].methods).sort();
    }
    return api;
  }
  scheduleProvidedMethodsUpdate() {
    if (!this.providedMethodsUpdateTimer) {
      this.providedMethodsUpdateTimer = setTimeout(() => {
        this.providedMethodsUpdateTimer = null;
        this.send({
          type: "remoteMethods",
          methods: this.getProvidedApi()
        });
      }, 0);
    }
  }
  processInput(packet, callback) {
    switch (packet.type) {
      case "call": {
        const thePacket = packet;
        const ns = this.ns(thePacket.ns || "*");
        if (!ns.isMethodProvided(thePacket.method)) {
          return console.warn(
            `[rempl][sync] ${this.getName()} (namespace: ${thePacket.ns || "default"}) has no remote method:`,
            thePacket.method
          );
        }
        Namespace.invoke(ns, thePacket.method, thePacket.args, callback);
        break;
      }
      case "remoteMethods": {
        const thePacket = packet;
        this.setRemoteApi(thePacket.methods);
        break;
      }
      case "getProvidedMethods":
        callback(this.getProvidedApi());
        break;
      default:
        console.warn(
          "[rempl][sync] " + this.getName() + "Unknown packet type:",
          packet.type
        );
    }
  }
  setupChannel(type, send2, remoteEndpoints, available) {
    if (available) {
      this.channels.push({
        type,
        send: send2
      });
      this.remoteEndpoints.add(remoteEndpoints);
    } else {
      for (let i = 0; i < this.channels.length; i++) {
        if (this.channels[i].type === type && this.channels[i].send === send2) {
          this.remoteEndpoints.remove(remoteEndpoints);
          this.channels.splice(i, 1);
          break;
        }
      }
    }
  }
};

// node_modules/rempl/lib/classes/Publisher.js
var PublisherNamespace = class extends Namespace {
  constructor(name, owner) {
    super(name, owner);
    __publicField(this, "_lastData", null);
    __publicField(this, "publish");
    this.provide("init", () => this._lastData);
    this.publish = (payload) => {
      this._lastData = payload;
      owner.send({
        type: "data",
        ns: this.name,
        payload
      });
    };
  }
};
var Publisher = class extends Endpoint {
  constructor() {
    super(...arguments);
    __publicField(this, "type", "Publisher");
  }
  get namespaceClass() {
    return PublisherNamespace;
  }
};

// node_modules/rempl/lib/sandbox/browser/sandbox-init.js
function initSandboxScript() {
  addEventListener("message", function handleMessage(event) {
    const { action, scripts } = event.data || {};
    if (action === "rempl-sandbox-init-scripts" && scripts) {
      removeEventListener("message", handleMessage);
      for (const [sourceURL, source] of Object.entries(scripts)) {
        Function(`${source}
//# sourceURL=${sourceURL}`)();
      }
    }
  });
}

// node_modules/rempl/lib/sandbox/browser/index.js
var initEnvSubscriberMessage = /* @__PURE__ */ new WeakMap();
if (resolvedParent !== resolvedGlobalThis) {
  addEventListener(
    "message",
    function(event) {
      const data = event.data || {};
      if (event.source && data.to === "rempl-env-publisher:connect") {
        initEnvSubscriberMessage.set(event.source, data);
      }
    },
    true
  );
}
function createSandbox(settings2, callback) {
  function initSandbox(sandboxWindow) {
    if (settings2.type === "script") {
      sandboxWindow.postMessage(
        {
          action: "rempl-sandbox-init-scripts",
          scripts: settings2.content
        },
        "*"
      );
    }
    if (resolvedParent !== resolvedGlobalThis && sandboxWindow !== resolvedGlobalThis) {
      let toSandbox = NaN;
      let toEnv = NaN;
      if (onEnvMessage) {
        removeEventListener("message", onEnvMessage, true);
        onEnvMessage = null;
      }
      addEventListener(
        "message",
        onEnvMessage = function(event) {
          const data = event.data || {};
          switch (data.to) {
            case "rempl-env-subscriber:connect":
            case toSandbox:
              toEnv = data.from;
              sandboxWindow.postMessage(data, "*");
              break;
            case "rempl-env-publisher:connect":
            case toEnv:
              toSandbox = data.from;
              resolvedParent.postMessage(data);
              break;
          }
        },
        true
      );
      if (settings2.type !== "script") {
        const initMessage = initEnvSubscriberMessage.get(sandboxWindow);
        if (initMessage) {
          toSandbox = initMessage.from;
          resolvedParent.postMessage(initMessage);
        }
      }
    }
    transport2 = EventTransport.get("rempl-sandbox", "rempl-subscriber", sandboxWindow).onInit(
      {},
      (api) => callback(api)
    );
    if (connected) {
      transport2.ownEndpoints.set(["*"]);
    }
  }
  let iframe = null;
  let onEnvMessage = null;
  let transport2 = null;
  let connected = false;
  settings2 = settings2 || {};
  if (settings2.window) {
    initSandbox(settings2.window);
  } else {
    iframe = document.createElement("iframe");
    iframe.name = genUID();
    iframe.onload = () => (iframe == null ? void 0 : iframe.contentWindow) && initSandbox(iframe.contentWindow);
    iframe.setAttribute("sandbox", "allow-scripts allow-forms allow-popups allow-modals");
    if (settings2.type === "url") {
      iframe.src = settings2.content;
    } else if (settings2.sandboxSrc) {
      iframe.src = settings2.sandboxSrc;
    } else {
      iframe.srcdoc = "<!doctype html><script>(" + String(initSandboxScript) + ")()<\/script>";
    }
    (settings2.container || document.documentElement).appendChild(iframe);
  }
  const sandbox2 = {
    setConnected(state) {
      connected = state;
      if (transport2) {
        transport2.ownEndpoints.set(connected ? ["*"] : []);
      }
    },
    destroy() {
      if (onEnvMessage) {
        removeEventListener("message", onEnvMessage, true);
        onEnvMessage = null;
      }
      if (transport2) {
        transport2.ownEndpoints.set([]);
      }
      if (iframe !== null) {
        iframe.remove();
        iframe.setAttribute("srcdoc", trustedEmptyHTML);
        iframe.setAttribute("src", trustedEmptyHTML);
        iframe = null;
      }
    }
  };
  return sandbox2;
}

// node_modules/rempl/lib/host/in-page/createElement.js
function createElement(config2) {
  function createElement2(options) {
    var _a2;
    const element = document.createElement(options.tagName || "div");
    for (const [name, value] of Object.entries(options)) {
      switch (name) {
        case "tagName":
          break;
        case "ref":
          if (typeof value === "string") {
            map[value] = element;
          }
          break;
        case "style":
          element.setAttribute(
            "style",
            Object.entries(value).map(([property, value2]) => property + ":" + value2).join(";")
          );
          break;
        case "events":
          for (const event in options.events) {
            element.addEventListener(event, options.events[event], false);
          }
          break;
        case "children":
          (_a2 = options.children) == null ? void 0 : _a2.forEach(function(child) {
            element.appendChild(
              typeof child === "string" ? document.createTextNode(child) : createElement2(child)
            );
          });
          break;
        default:
          element.setAttribute(name, value);
      }
    }
    return element;
  }
  const map = {};
  map.element = createElement2(config2);
  return map;
}

// node_modules/rempl/lib/host/in-page/style.js
var styles = ':host{position:fixed;z-index:100000;inset:0;background:rgba(255,255,255,.8);backdrop-filter:blur(8px);opacity:1;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:12px;transition:all cubic-bezier(.25,.59,0,1.11) .2s;border:0 solid #aaa}@supports not (backdrop-filter: blur(8px)){:host{background:rgba(255,255,255,.95)}}:host([side="left"]){right:50%;border-right-width:2px}:host([side="right"]){left:50%;border-left-width:2px}:host([side="top"]){bottom:50%;border-bottom-width:2px}:host([side="bottom"]){top:50%;border-top-width:2px}.host{display:flex;flex-direction:column;height:100%}.toolbar{display:flex;padding:0 0 0 24px;background:#f8f8f8 no-repeat 4px center / 16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2YTJlMWRlYi1kYzVhLTFiNDEtYTQ2OC0xYmU4ZjEyYzdkMzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkNGQUMzNTZCQkM4MTFFNjg1QjhENzFGM0IzRkMzNjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkNGQUMzNTVCQkM4MTFFNjg1QjhENzFGM0IzRkMzNjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmE1NDdhODktNWJjOC05MzQ2LWI2NTctYzAwMGQ4ZjQxOTg4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZhMmUxZGViLWRjNWEtMWI0MS1hNDY4LTFiZThmMTJjN2QzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn3Ab4gAAAPQSURBVHjatFfNSxtBFH+JiZootWojFBUqmtioiZUWbLUt1YOI9A9QaIsWSw/1mIMInryqN8EiVKVCKx48VFA8SLUeqlSUxI+qaGyhBy1RbNQkxmT7Zt1Ns7uzcTfaBz8Sdmbe783M+xrNGqgSG+Ixwo64h8jgvu8jviGciBmES6lCjQIDEhCvES8RdxXqXUC8Q7xFhGJN1F6gqB6xiehRQQ7c3B5ubX28BvQjPiDyIH7J43T0qzGAHPkXRCNcnTRyOhPEAzrK5FnEfbUMSampYCwpAYPNBklFRZBYXg6BmRnYaW3lpzzkdD+I5YTvEc9iEel0OjAWFoLBaoVkux30SJpgsYAmPx8gOVkwl1ldhfXiYrGKIcRz2gk8FZMbs7PZXRGiJCRMQGiRDDIylIUYrtdotcCEw9GfCccwYkx8AiSW08mfgsFB0FVVAeTmXvryf1kKwbu5If58wOcQ3glf8eTssVRUUMkDTid812io2O/qguD2tmSNwW6j2ZXOcUYMcESP+kdHVe90z+GALfQDsRHJNpvcEgdvgBVhEex0eflCwtsME8Gt2VnQo2MS8XR3C+Ylog/JCOG0EgNqxCM+BQYIdllZCTcc54cYWBPGFXHcGFJDDCgTfz1yYS3x+1UZETo8PPcfk0kYCWYz6BOT5JaVabnKJpCzYBCYjQ3F5McTE6wPELneKEqgej2k3imVW2oneSCTNnKGR6m322VJieeLJXd8HFJqa6WRgI54MD9PU5MpW4yCKvzAUF0N+VtbVHLWEaXZUFCMPLQBv8ulKApu9vWBb2oKftbVUfMAewvyBni0XBcjkROnU9Hu05qbIbO9HYLr67DX1kbvaLA4yYiTGLBINWBnB5PzviIj0lta2F/v8DD8GRmRTsjJAYMpi7Z0kRgwSRsJ4/GGsZopEV1WFnsVRH7jaTDHx5I5xlKqQ08SA0jmoMbcmUIDiFxraGCzIbmKg95eqaNKMyLhXOOjoJOmNKAiEjQpKWDq6IjUBbFDGuslrWGnbDmOBCmWZBN6+GWE2d1lk1pgehp+4PWIy3F0Q/IC8UmQ4ZaWwKSUyesFZnMTQkh2iiFMwvgEr/DY7RY3JDyXpCMa49qlSFfkP0BDj44AsN/75xhnwKDSMBKRZBVYWQEfIXItQ/A0oMTUIb4bojWlpFcriG5KT7E70qSlgX9uDnxkV0jq93jivZGv0f2g3MuItM6fuS72KoV0xE/ELyVaLSATHiEGrpB8gNMZUvMyakI0INyXIHZzOprifRt+RJgRb7gHp1JZ4NaYOR2Xeh3/1+f5XwEGANZLOnq2peEfAAAAAElFTkSuQmCC);border-bottom:1px solid #ddd;white-space:nowrap}.tab{display:inline-block;padding:5px 10px;color:#666;line-height:1;cursor:pointer;border-bottom:1px solid transparent}.tab:hover{background:#eee}.tab_selected{color:#444;border-bottom:2px solid rgba(62,130,247,.6);margin-bottom:-1px}.layout-buttons{display:flex}.layout-button{display:flex;align-items:center;justify-content:center;flex:0 0 auto;width:28px;height:24px;color:#646464;cursor:pointer}.layout-button:hover{background:rgb(66,128,236);color:#fff}.layout-button:before{content:"";width:15px;height:13px;border:2px solid currentColor;box-sizing:border-box}:host([side="left"]) .layout-button[side=left],:host([side="right"]) .layout-button[side=right],:host([side="top"]) .layout-button[side=top],:host([side="bottom"]) .layout-button[side=bottom],:host([side="fit the page"]) .layout-button[side="fit the page"]{color:#4280ec;background:none;cursor:default}.layout-button[side=external]:before{height:10px;width:13px;border-width:0 0 2px 2px;margin-bottom:-3px}.layout-button[side=external]:after{content:"";height:10px;width:13px;border:2px solid currentColor;box-sizing:border-box;margin-top:-3px;margin-left:-10px}.layout-button[side=top]:before{border-top-width:5px}.layout-button[side=right]:before{border-right-width:5px}.layout-button[side=bottom]:before{border-bottom-width:5px}.layout-button[side=left]:before{border-left-width:5px}.close-button{position:relative;width:28px;text-align:center;font:20px Arial,sans-serif;color:#5a5a5a;cursor:pointer}.close-button:hover{color:#000}.close-button:after{content:"\\d7";line-height:24px}.sandbox{flex:1 1 auto;position:relative}iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:0;background:transparent}\n';

// node_modules/rempl/lib/host/in-page/view.js
var publishers = [];
var selectedPublisher = null;
var selectPublisher = () => {
};
var view = null;
var onClose;
var settings = {};
function setSetting(name, value) {
  settings[name] = value;
  try {
    localStorage.rempl = JSON.stringify(settings);
  } catch (e) {
  }
}
function updateTabSelectedState(tabEl) {
  tabEl.classList.toggle("tab_selected", tabEl.getAttribute("publisher") === selectedPublisher);
}
function updatePublisherList() {
  const { tabs } = getView();
  tabs.innerHTML = trustedEmptyHTML;
  for (const publisher2 of publishers) {
    const { element } = createElement({
      publisher: publisher2,
      class: "tab",
      children: [publisher2],
      events: {
        click() {
          selectPublisher(publisher2);
        }
      }
    });
    updateTabSelectedState(element);
    tabs.appendChild(element);
  }
}
function getView() {
  if (view === null) {
    const wrapperEl = document.createElement("div");
    const shadow = wrapperEl.attachShadow({ mode: "open" });
    const styleEl = document.createElement("style");
    const content = createElement({
      class: "host",
      children: [
        {
          class: "toolbar",
          children: [
            {
              ref: "tabs",
              style: {
                display: "flex",
                flex: "1"
              }
            },
            {
              ref: "buttons",
              class: "layout-buttons",
              children: [
                ...["left", "top", "bottom", "right", "fit the page"].map((side) => ({
                  side,
                  title: `Dock to ${side}`,
                  class: "layout-button",
                  events: {
                    click() {
                      wrapperEl.setAttribute("side", side);
                      setSetting("host-dock", side);
                    }
                  }
                })),
                {
                  class: "close-button",
                  events: {
                    click() {
                      onClose == null ? void 0 : onClose();
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          ref: "sandbox",
          class: "sandbox"
        }
      ]
    });
    try {
      Object.assign(settings, JSON.parse(localStorage.rempl || "{}"));
    } catch (e) {
    }
    wrapperEl.setAttribute("side", settings["host-dock"] || "bottom");
    styleEl.append(document.createTextNode(styles));
    shadow.append(styleEl);
    shadow.append(content.element);
    view = __spreadValues({
      wrapper: wrapperEl
    }, content);
    updatePublisherList();
  }
  return view;
}
function showView(closeCallback) {
  const { wrapper } = getView();
  onClose = closeCallback;
  wrapper.style.display = "";
  if (!document.contains(wrapper)) {
    (document.body || document.documentElement).append(wrapper);
  }
}
function softHideView() {
  getView().wrapper.style.display = "none";
}
function hideView() {
  getView().wrapper.remove();
}
var view$1 = {
  show: showView,
  hide: hideView,
  softHide: softHideView,
  getSandboxContainer() {
    return getView().sandbox;
  },
  setPublisherList(publisherList, selectPublisherFn) {
    publishers = publisherList;
    selectPublisher = selectPublisherFn;
    updatePublisherList();
  },
  selectPublisher(id) {
    if (selectedPublisher !== id) {
      selectedPublisher = id;
      if (view) {
        Array.from(getView().tabs.children).forEach(
          (el) => updateTabSelectedState(el)
        );
      }
    }
  }
};

// node_modules/rempl/lib/host/in-page/index.js
var publishers2 = [];
var selectedPublisherId = null;
var autoSelectPublisher = false;
var teardownTimer;
var transport = null;
var sandbox = null;
var host = null;
function cleanupSandbox() {
  if (sandbox !== null) {
    sandbox.destroy();
    sandbox = null;
  }
}
function selectPublisher2(publisherId = null) {
  if (!publisherId) {
    publisherId = null;
  }
  if (publisherId !== selectedPublisherId) {
    autoSelectPublisher = false;
    selectedPublisherId = publisherId;
    if (selectedPublisherId) {
      view$1.selectPublisher(selectedPublisherId);
      view$1.show(host.deactivate);
      transport.onInit(
        { id: selectedPublisherId },
        function initSandbox(papi) {
          papi.getRemoteUI((error, type, content) => {
            const sandboxContainerEl = view$1.getSandboxContainer();
            cleanupSandbox();
            if (error) {
              const errorEl = document.createElement("div");
              errorEl.append("Error on loading UI: ", error);
              errorEl.setAttribute(
                "style",
                "margin:10px;padding:5px 10px;border-radius:3px;border:1px solid #eba8a8;color:#f34040;background:#ffe0e0;"
              );
              sandboxContainerEl.innerHTML = trustedEmptyHTML;
              sandboxContainerEl.append(errorEl);
            } else {
              sandbox = createSandbox(
                {
                  container: sandboxContainerEl,
                  type,
                  content
                },
                (api) => {
                  papi.subscribe(api.send);
                  api.subscribe(papi.send);
                }
              );
              sandbox.setConnected(true);
            }
          });
        }
      );
    } else {
      view$1.hide();
      cleanupSandbox();
    }
  }
}
function getHost() {
  if (host !== null) {
    return host;
  }
  transport = EventTransport.get("rempl-inpage-host", "rempl-inpage-publisher");
  transport.remoteEndpoints.on((endpoints2) => {
    publishers2 = endpoints2;
    view$1.setPublisherList(publishers2, selectPublisher2);
    if (autoSelectPublisher && !selectedPublisherId && publishers2.length) {
      selectPublisher2(publishers2[0]);
    }
  });
  return host = {
    activate(publisher2) {
      const publisherId = typeof publisher2 === "string" ? publisher2 : (publisher2 == null ? void 0 : publisher2.id) || selectedPublisherId || publishers2[0] || null;
      clearTimeout(teardownTimer);
      selectPublisher2(publisherId);
      view$1.show(host.deactivate);
      if (!selectedPublisherId) {
        autoSelectPublisher = true;
      }
    },
    deactivate(publisher2) {
      const publisherId = typeof publisher2 === "string" ? publisher2 : (publisher2 == null ? void 0 : publisher2.id) || null;
      autoSelectPublisher = false;
      if (!publisherId || publisherId === selectedPublisherId) {
        view$1.softHide();
        clearTimeout(teardownTimer);
        teardownTimer = setTimeout(() => selectPublisher2(), 15e3);
      }
    }
  };
}

// node_modules/rempl/lib/publisher/TransportPublisher.js
var TransportPublisher = class extends Publisher {
  constructor(id, getRemoteUI, options) {
    super(id);
    __publicField(this, "getRemoteUI");
    __publicField(this, "options");
    this.options = options || {};
    this.getRemoteUI = (settings2) => {
      try {
        return Promise.resolve(getRemoteUI(settings2)).then((result) => {
          if (result.type === "script") {
            return {
              type: "script",
              value: {
                "publisher-ui.js": result.value
              }
            };
          }
          return result;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }
};

// node_modules/rempl/lib/publisher/factory.js
var publishers3 = /* @__PURE__ */ new Map();
var ws = null;
function getPublisher(id, getRemoteUI, options) {
  let publisher2 = publishers3.get(id);
  if (publisher2) {
    console.warn(`[rempl] Publisher with ID "${id}" has been already created`);
    return publisher2;
  }
  publisher2 = new TransportPublisher(id, getRemoteUI, options);
  publishers3.set(id, publisher2);
  if (ws) {
    ws.sync(publisher2);
  }
  return publisher2;
}
function resolveWsUri(settings2, uri) {
  switch (uri) {
    case "implicit":
    case void 0:
      return settings2.explicit || settings2.implicit;
    case "explicit":
      return settings2.explicit;
  }
  return uri;
}
function connect(auto, createWsTransport, fetchWsSettings2, uri) {
  if (ws === null) {
    uri = auto ? fetchWsSettings2().explicit : resolveWsUri(fetchWsSettings2(), uri);
    if (typeof uri === "string") {
      ws = createWsTransport(uri);
      for (const publisher2 of publishers3.values()) {
        ws.sync(publisher2);
      }
    } else if (!auto) {
      console.warn(
        "[rempl] Connection to WS server doesn't established since bad value for URI",
        uri
      );
    }
  } else {
    console.warn("[rempl] Connection to WS server already set");
  }
}

// node_modules/rempl/lib/publisher/browser/transport-ws.js
var import_socket_io_slim = __toESM(require_socket_io_slim(), 1);

// node_modules/rempl/lib/transport/ws.js
var endpoints = /* @__PURE__ */ Object.create(null);
var INFO_UPDATE_TIME = 100;
function valuesChanged(a, b) {
  for (const key of Object.keys(a)) {
    const value1 = a[key];
    const value2 = b[key];
    if (Array.isArray(value1)) {
      if (valuesChanged(value1, value2)) {
        return true;
      }
    } else {
      if (String(value1) !== String(value2)) {
        return true;
      }
    }
  }
  return false;
}
function normalizeUri(uri) {
  uri = String(uri);
  if (/^\d+$/.test(uri)) {
    return "ws://localhost:" + uri;
  }
  return uri.replace(/^http:\/\//i, "ws://").replace(/^https:\/\//i, "wss://").replace(/^([a-z]+:\/\/)|^/i, function(m, protocol) {
    protocol = protocol ? protocol.toLowerCase() : "";
    return protocol === "ws://" || protocol === "wss://" ? protocol : "ws://";
  });
}
function subscribe2(endpoint, fn) {
  return subscribe(this.dataCallbacks, {
    endpoint,
    fn
  });
}
function send(endpoint, callback) {
  this.send("rempl:from publisher", endpoint, callback);
}
function onConnect() {
  clearInterval(this.sendInfoTimer);
  this.connected.set(true);
  this.info = this.getInfo();
  this.send("rempl:endpoint connect", this.info, (data) => {
    if ("id" in data) {
      this.setClientId(data.id);
    }
    this.sendInfoTimer = setInterval(this.sendInfo.bind(this), INFO_UPDATE_TIME);
  });
}
function onGetUI(id, settings2, callback) {
  const publisherMeta = this.publishersMap.get(id);
  if (!publisherMeta) {
    callback("Publisher `" + id + "` isn't registered");
    return;
  }
  return publisherMeta.getRemoteUI(settings2 || {}).catch((error) => ({ error: String(error == null ? void 0 : error.message) })).then((res) => {
    if ("error" in res) {
      callback(res.error);
    } else {
      callback(null, res.type, res.value);
    }
  });
}
function onData(id, ...args) {
  if (!this.publishersMap.has(id)) {
    return;
  }
  this.dataCallbacks.forEach(function(callback) {
    if (callback.endpoint === id) {
      callback.fn.apply(null, args);
    }
  });
}
function onDisconnect() {
  clearInterval(this.sendInfoTimer);
  this.connected.set(false);
}
var WsTransport = class {
  constructor(uri, socketIO2) {
    __publicField(this, "publishers", []);
    __publicField(this, "publishersMap", /* @__PURE__ */ new Map());
    __publicField(this, "dataCallbacks", []);
    __publicField(this, "connected", new ReactiveValue(false));
    __publicField(this, "ownEndpoints", new EndpointList());
    __publicField(this, "remoteEndpoints", new EndpointList());
    __publicField(this, "socket");
    __publicField(this, "sessionId", genUID());
    __publicField(this, "id", null);
    __publicField(this, "sendInfoTimer", null);
    __publicField(this, "info", this.getInfo());
    this.socket = socketIO2.connect(normalizeUri(uri), { transports: ["websocket"] }).on("connect", onConnect.bind(this)).on("disconnect", onDisconnect.bind(this)).on("rempl:get ui", onGetUI.bind(this)).on("rempl:to publisher", onData.bind(this));
  }
  static get(endpoint, socketIO2) {
    if (endpoint in endpoints) {
      return endpoints[endpoint];
    }
    return endpoints[endpoint] = new this(endpoint, socketIO2);
  }
  get type() {
    return "unknown";
  }
  setClientId(id) {
    this.id = id;
  }
  send(name, arg, callback) {
    this.socket.emit(name, arg, callback);
  }
  getInfo() {
    return {
      id: this.id,
      sessionId: this.sessionId,
      type: this.type,
      publishers: [...this.publishers]
    };
  }
  sendInfo() {
    const newInfo = this.getInfo();
    if (valuesChanged(this.info, newInfo)) {
      this.info = newInfo;
      this.send("rempl:endpoint info", this.info);
    }
  }
  createApi(publisher2) {
    if (this.publishersMap.has(publisher2.id)) {
      return;
    }
    if (publisher2.id) {
      this.publishers.push(publisher2.id);
      this.publishersMap.set(publisher2.id, {
        getRemoteUI: publisher2.getRemoteUI
      });
    }
    this.sendInfo();
    return {
      connected: this.connected,
      send: send.bind(this, publisher2.id),
      subscribe: subscribe2.bind(this, publisher2.id)
    };
  }
  sync(publisher2) {
    const api = this.createApi(publisher2);
    if (api) {
      api.subscribe(publisher2.processInput.bind(publisher2));
      api.connected.link((connected) => {
        publisher2.setupChannel("ws", api.send, this.remoteEndpoints, connected);
      });
    }
  }
};

// node_modules/rempl/lib/publisher/browser/identify/style.js
var __CSS__ = ":host{position:fixed;overflow:auto;inset:0;z-index:100000000;background:rgba(255,255,255,.9);text-align:center;line-height:1.5;font-family:Tahoma,Verdana,Arial,sans-serif}h1{font-size:100px;font-size:33vh;font-size:clamp(20px,33vh,100px);font-weight:400;margin:0}button{font-size:18px;line-height:1;padding:12px 24px;background:#3bafda;color:#fff;border:none;border-radius:3px;cursor:pointer}\n";

// node_modules/rempl/lib/publisher/browser/identify/index.js
var identifyWidgetId = "rempl-identify-widget";
var cancelOverlay = null;
function createOverlay(origin, num) {
  const overlayEl = document.createElement("div");
  const shadow = overlayEl.attachShadow({ mode: "closed" });
  const styleEl = document.createElement("style");
  const buttonsEl = document.createElement("div");
  const headerEl = document.createElement("h1");
  overlayEl.id = identifyWidgetId;
  overlayEl.dataset.origin = origin;
  headerEl.textContent = num;
  styleEl.textContent = __CSS__;
  shadow.append(styleEl, headerEl, buttonsEl);
  return {
    overlayEl,
    createButton(name, pickPublisher) {
      const wrapperEl = buttonsEl.appendChild(document.createElement("div"));
      const buttonEl = wrapperEl.appendChild(document.createElement("button"));
      wrapperEl.setAttribute("style", "margin-bottom:5px");
      buttonEl.textContent = name;
      buttonEl.addEventListener("click", pickPublisher);
    }
  };
}
function postIdentifyMessage(params) {
  postMessage(__spreadValues({ to: identifyWidgetId }, params));
}
function startIdentify(origin, num, callback) {
  if (typeof document === "undefined") {
    return;
  }
  const existingWidget = document.querySelector("#" + identifyWidgetId);
  if (!existingWidget || existingWidget.dataset.origin !== origin) {
    if (existingWidget) {
      postMessage({ op: "stop-identify" });
    }
    const { overlayEl, createButton } = createOverlay(origin, String(num));
    const documentStyleOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.appendChild(overlayEl);
    const onMessageCallback = (event) => {
      const { data } = event;
      if ((data == null ? void 0 : data.to) === identifyWidgetId) {
        switch (data.op) {
          case "add-publisher":
            createButton(data.name || data.id, () => callback(data.id));
            break;
          case "stop-identify":
            console.log("stop-indentify");
            cancelOverlay == null ? void 0 : cancelOverlay();
            break;
        }
      }
    };
    addEventListener("message", onMessageCallback);
    cancelOverlay = () => {
      removeEventListener("message", onMessageCallback);
      document.body.style.overflow = documentStyleOverflow;
      overlayEl.remove();
      cancelOverlay = null;
    };
  }
}
function stopIdentify() {
  if (typeof cancelOverlay === "function") {
    cancelOverlay();
  }
}

// node_modules/rempl/lib/publisher/browser/transport-ws.js
var STORAGE_KEY = "rempl:id";
function fetchWsSettings() {
  function fetchEnvVariable() {
    if (typeof REMPL_SERVER !== "undefined" && REMPL_SERVER !== resolvedGlobalThis.REMPL_SERVER) {
      return REMPL_SERVER;
    }
  }
  function fetchMeta() {
    const meta = typeof document !== "undefined" ? document.querySelector('meta[name="rempl:server"]') : void 0;
    return meta && meta.getAttribute("content") || void 0;
  }
  const implicitUri = location.protocol + "//" + (location.hostname || "localhost") + ":8177";
  let explicitUri = void 0;
  let setup = fetchEnvVariable();
  if (setup === void 0) {
    setup = fetchMeta();
  }
  switch (setup) {
    case "none":
    case void 0:
    case false:
      break;
    case "implicit":
    case "auto":
    case true:
      explicitUri = implicitUri;
      break;
    default:
      if (typeof setup === "string") {
        explicitUri = setup;
      }
  }
  return {
    explicit: explicitUri,
    implicit: implicitUri
  };
}
var BrowserWsTransport = class extends WsTransport {
  constructor(uri) {
    super(uri, import_socket_io_slim.default);
    const self2 = this;
    try {
      this.id = sessionStorage[STORAGE_KEY];
    } catch (e) {
    }
    this.socket.on(
      "rempl:identify",
      function(num, callback) {
        startIdentify(this.io.uri, num, callback);
        for (const publisherId of self2.publishers) {
          postIdentifyMessage({
            op: "add-publisher",
            id: publisherId,
            name: publisherId
          });
        }
      }
    ).on("rempl:stop identify", stopIdentify).on("disconnect", stopIdentify);
  }
  get type() {
    return "browser";
  }
  setClientId(id) {
    super.setClientId(id);
    try {
      sessionStorage[STORAGE_KEY] = this.id;
    } catch (e) {
    }
  }
  getInfo() {
    var _a2, _b, _c, _d;
    return __spreadProps(__spreadValues({}, super.getInfo()), {
      location: String(location),
      title: ((_b = (_a2 = resolvedTop) == null ? void 0 : _a2.document) == null ? void 0 : _b.title) || ((_d = (_c = resolvedTop) == null ? void 0 : _c.location) == null ? void 0 : _d.href) || "Unknown"
    });
  }
};
function createBrowserWsTransport(uri) {
  return new BrowserWsTransport(uri);
}

// node_modules/rempl/lib/publisher/browser/index.js
function createPublisher(id, getRemoteUI, options) {
  connect(true, createBrowserWsTransport, fetchWsSettings);
  const publisher2 = getPublisher(id, getRemoteUI, options);
  EventTransport.get("rempl-browser-extension-publisher", "rempl-browser-extension-host").sync(
    publisher2
  );
  EventTransport.get("rempl-inpage-publisher", "rempl-inpage-host").sync(publisher2);
  EventTransport.get("rempl-self-publisher", "rempl-self-subscriber").sync(publisher2);
  return Object.assign(publisher2.ns("*"), {
    ns: publisher2.ns.bind(publisher2)
  });
}

// src/injector/config.ts
var config = {};
var setConfig = (c) => {
  console.log("setConfig", c);
  config = __spreadValues(__spreadValues({}, config), c);
  if (config.inPage) {
    getHost().activate();
  } else {
    getHost().deactivate();
  }
};

// src/common/constants.ts
var ToolId = "\u2604\uFE0F Effector";
var UnitTypeEvent = 1;
var unitTypeName = {
  [UnitTypeEvent]: "Event"
};

// src/injector/rempl-publisher.ts
var eventIdSeed = 0;
var publisher = createPublisher(ToolId, () => ({
  type: "script",
  value: 'var _0=Object.create;var _d=Object.defineProperty;var P0=Object.getOwnPropertyDescriptor;var O0=Object.getOwnPropertyNames;var z0=Object.getPrototypeOf,A0=Object.prototype.hasOwnProperty;var en=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var F0=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of O0(t))!A0.call(e,o)&&o!==n&&_d(e,o,{get:()=>t[o],enumerable:!(r=P0(t,o))||r.enumerable});return e};var me=(e,t,n)=>(n=e!=null?_0(z0(e)):{},F0(t||!e||!e.__esModule?_d(n,"default",{value:e,enumerable:!0}):n,e));var Vd=en(J=>{"use strict";var gi=Symbol.for("react.element"),H0=Symbol.for("react.portal"),j0=Symbol.for("react.fragment"),D0=Symbol.for("react.strict_mode"),B0=Symbol.for("react.profiler"),U0=Symbol.for("react.provider"),V0=Symbol.for("react.context"),W0=Symbol.for("react.forward_ref"),$0=Symbol.for("react.suspense"),G0=Symbol.for("react.memo"),Q0=Symbol.for("react.lazy"),Pd=Symbol.iterator;function K0(e){return e===null||typeof e!="object"?null:(e=Pd&&e[Pd]||e["@@iterator"],typeof e=="function"?e:null)}var Ad={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fd=Object.assign,Hd={};function ho(e,t,n){this.props=e,this.context=t,this.refs=Hd,this.updater=n||Ad}ho.prototype.isReactComponent={};ho.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ho.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function jd(){}jd.prototype=ho.prototype;function $u(e,t,n){this.props=e,this.context=t,this.refs=Hd,this.updater=n||Ad}var Gu=$u.prototype=new jd;Gu.constructor=$u;Fd(Gu,ho.prototype);Gu.isPureReactComponent=!0;var Od=Array.isArray,Dd=Object.prototype.hasOwnProperty,Qu={current:null},Bd={key:!0,ref:!0,__self:!0,__source:!0};function Ud(e,t,n){var r,o={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)Dd.call(t,r)&&!Bd.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var u=Array(s),a=0;a<s;a++)u[a]=arguments[a+2];o.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:gi,type:e,key:i,ref:l,props:o,_owner:Qu.current}}function Z0(e,t){return{$$typeof:gi,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ku(e){return typeof e=="object"&&e!==null&&e.$$typeof===gi}function Y0(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var zd=/\\/+/g;function Wu(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Y0(""+e.key):t.toString(36)}function Fl(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case gi:case H0:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Wu(l,0):r,Od(o)?(n="",e!=null&&(n=e.replace(zd,"$&/")+"/"),Fl(o,t,n,"",function(a){return a})):o!=null&&(Ku(o)&&(o=Z0(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(zd,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Od(e))for(var s=0;s<e.length;s++){i=e[s];var u=r+Wu(i,s);l+=Fl(i,t,n,u,o)}else if(u=K0(e),typeof u=="function")for(e=u.call(e),s=0;!(i=e.next()).done;)i=i.value,u=r+Wu(i,s++),l+=Fl(i,t,n,u,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Al(e,t,n){if(e==null)return e;var r=[],o=0;return Fl(e,r,"","",function(i){return t.call(n,i,o++)}),r}function X0(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var at={current:null},Hl={transition:null},J0={ReactCurrentDispatcher:at,ReactCurrentBatchConfig:Hl,ReactCurrentOwner:Qu};J.Children={map:Al,forEach:function(e,t,n){Al(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Al(e,function(){t++}),t},toArray:function(e){return Al(e,function(t){return t})||[]},only:function(e){if(!Ku(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};J.Component=ho;J.Fragment=j0;J.Profiler=B0;J.PureComponent=$u;J.StrictMode=D0;J.Suspense=$0;J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J0;J.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Fd({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=Qu.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)Dd.call(t,u)&&!Bd.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){s=Array(u);for(var a=0;a<u;a++)s[a]=arguments[a+2];r.children=s}return{$$typeof:gi,type:e.type,key:o,ref:i,props:r,_owner:l}};J.createContext=function(e){return e={$$typeof:V0,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:U0,_context:e},e.Consumer=e};J.createElement=Ud;J.createFactory=function(e){var t=Ud.bind(null,e);return t.type=e,t};J.createRef=function(){return{current:null}};J.forwardRef=function(e){return{$$typeof:W0,render:e}};J.isValidElement=Ku;J.lazy=function(e){return{$$typeof:Q0,_payload:{_status:-1,_result:e},_init:X0}};J.memo=function(e,t){return{$$typeof:G0,type:e,compare:t===void 0?null:t}};J.startTransition=function(e){var t=Hl.transition;Hl.transition={};try{e()}finally{Hl.transition=t}};J.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};J.useCallback=function(e,t){return at.current.useCallback(e,t)};J.useContext=function(e){return at.current.useContext(e)};J.useDebugValue=function(){};J.useDeferredValue=function(e){return at.current.useDeferredValue(e)};J.useEffect=function(e,t){return at.current.useEffect(e,t)};J.useId=function(){return at.current.useId()};J.useImperativeHandle=function(e,t,n){return at.current.useImperativeHandle(e,t,n)};J.useInsertionEffect=function(e,t){return at.current.useInsertionEffect(e,t)};J.useLayoutEffect=function(e,t){return at.current.useLayoutEffect(e,t)};J.useMemo=function(e,t){return at.current.useMemo(e,t)};J.useReducer=function(e,t,n){return at.current.useReducer(e,t,n)};J.useRef=function(e){return at.current.useRef(e)};J.useState=function(e){return at.current.useState(e)};J.useSyncExternalStore=function(e,t,n){return at.current.useSyncExternalStore(e,t,n)};J.useTransition=function(){return at.current.useTransition()};J.version="18.2.0"});var he=en((hE,Wd)=>{"use strict";Wd.exports=Vd()});var hp=en(mp=>{"use strict";var To=he();function wy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Sy=typeof Object.is=="function"?Object.is:wy,xy=To.useState,Ey=To.useEffect,ky=To.useLayoutEffect,Cy=To.useDebugValue;function Ty(e,t){var n=t(),r=xy({inst:{value:n,getSnapshot:t}}),o=r[0].inst,i=r[1];return ky(function(){o.value=n,o.getSnapshot=t,pa(o)&&i({inst:o})},[e,n,t]),Ey(function(){return pa(o)&&i({inst:o}),e(function(){pa(o)&&i({inst:o})})},[e]),Cy(n),n}function pa(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Sy(e,n)}catch{return!0}}function Iy(e,t){return t()}var by=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Iy:Ty;mp.useSyncExternalStore=To.useSyncExternalStore!==void 0?To.useSyncExternalStore:by});var ma=en((yE,gp)=>{"use strict";gp.exports=hp()});var yp=en(vp=>{"use strict";var Kl=he(),My=ma();function Ly(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ny=typeof Object.is=="function"?Object.is:Ly,Ry=My.useSyncExternalStore,_y=Kl.useRef,Py=Kl.useEffect,Oy=Kl.useMemo,zy=Kl.useDebugValue;vp.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var i=_y(null);if(i.current===null){var l={hasValue:!1,value:null};i.current=l}else l=i.current;i=Oy(function(){function u(m){if(!a){if(a=!0,c=m,m=r(m),o!==void 0&&l.hasValue){var d=l.value;if(o(d,m))return h=d}return h=m}if(d=h,Ny(c,m))return d;var v=r(m);return o!==void 0&&o(d,v)?d:(c=m,h=v)}var a=!1,c,h,y=n===void 0?null:n;return[function(){return u(t())},y===null?void 0:function(){return u(y())}]},[t,n,r,o]);var s=Ry(e,i[0],i[1]);return Py(function(){l.hasValue=!0,l.value=s},[s]),zy(s),s}});var Sp=en((SE,wp)=>{"use strict";wp.exports=yp()});var Fp=en(ge=>{"use strict";function ya(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(0<Zl(o,t))e[r]=t,e[n]=o,n=r;else break e}}function ln(e){return e.length===0?null:e[0]}function Xl(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var l=2*(r+1)-1,s=e[l],u=l+1,a=e[u];if(0>Zl(s,n))u<o&&0>Zl(a,s)?(e[r]=a,e[u]=n,r=u):(e[r]=s,e[l]=n,r=l);else if(u<o&&0>Zl(a,n))e[r]=a,e[u]=n,r=u;else break e}}return t}function Zl(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(Mp=performance,ge.unstable_now=function(){return Mp.now()}):(ha=Date,Lp=ha.now(),ge.unstable_now=function(){return ha.now()-Lp});var Mp,ha,Lp,En=[],ur=[],Dy=1,Vt=null,tt=3,Jl=!1,$r=!1,bi=!1,_p=typeof setTimeout=="function"?setTimeout:null,Pp=typeof clearTimeout=="function"?clearTimeout:null,Np=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function wa(e){for(var t=ln(ur);t!==null;){if(t.callback===null)Xl(ur);else if(t.startTime<=e)Xl(ur),t.sortIndex=t.expirationTime,ya(En,t);else break;t=ln(ur)}}function Sa(e){if(bi=!1,wa(e),!$r)if(ln(En)!==null)$r=!0,Ea(xa);else{var t=ln(ur);t!==null&&ka(Sa,t.startTime-e)}}function xa(e,t){$r=!1,bi&&(bi=!1,Pp(Mi),Mi=-1),Jl=!0;var n=tt;try{for(wa(t),Vt=ln(En);Vt!==null&&(!(Vt.expirationTime>t)||e&&!Ap());){var r=Vt.callback;if(typeof r=="function"){Vt.callback=null,tt=Vt.priorityLevel;var o=r(Vt.expirationTime<=t);t=ge.unstable_now(),typeof o=="function"?Vt.callback=o:Vt===ln(En)&&Xl(En),wa(t)}else Xl(En);Vt=ln(En)}if(Vt!==null)var i=!0;else{var l=ln(ur);l!==null&&ka(Sa,l.startTime-t),i=!1}return i}finally{Vt=null,tt=n,Jl=!1}}var ql=!1,Yl=null,Mi=-1,Op=5,zp=-1;function Ap(){return!(ge.unstable_now()-zp<Op)}function ga(){if(Yl!==null){var e=ge.unstable_now();zp=e;var t=!0;try{t=Yl(!0,e)}finally{t?Ii():(ql=!1,Yl=null)}}else ql=!1}var Ii;typeof Np=="function"?Ii=function(){Np(ga)}:typeof MessageChannel<"u"?(va=new MessageChannel,Rp=va.port2,va.port1.onmessage=ga,Ii=function(){Rp.postMessage(null)}):Ii=function(){_p(ga,0)};var va,Rp;function Ea(e){Yl=e,ql||(ql=!0,Ii())}function ka(e,t){Mi=_p(function(){e(ge.unstable_now())},t)}ge.unstable_IdlePriority=5;ge.unstable_ImmediatePriority=1;ge.unstable_LowPriority=4;ge.unstable_NormalPriority=3;ge.unstable_Profiling=null;ge.unstable_UserBlockingPriority=2;ge.unstable_cancelCallback=function(e){e.callback=null};ge.unstable_continueExecution=function(){$r||Jl||($r=!0,Ea(xa))};ge.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Op=0<e?Math.floor(1e3/e):5};ge.unstable_getCurrentPriorityLevel=function(){return tt};ge.unstable_getFirstCallbackNode=function(){return ln(En)};ge.unstable_next=function(e){switch(tt){case 1:case 2:case 3:var t=3;break;default:t=tt}var n=tt;tt=t;try{return e()}finally{tt=n}};ge.unstable_pauseExecution=function(){};ge.unstable_requestPaint=function(){};ge.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=tt;tt=e;try{return t()}finally{tt=n}};ge.unstable_scheduleCallback=function(e,t,n){var r=ge.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=n+o,e={id:Dy++,callback:t,priorityLevel:e,startTime:n,expirationTime:o,sortIndex:-1},n>r?(e.sortIndex=n,ya(ur,e),ln(En)===null&&e===ln(ur)&&(bi?(Pp(Mi),Mi=-1):bi=!0,ka(Sa,n-r))):(e.sortIndex=o,ya(En,e),$r||Jl||($r=!0,Ea(xa))),e};ge.unstable_shouldYield=Ap;ge.unstable_wrapCallback=function(e){var t=tt;return function(){var n=tt;tt=t;try{return e.apply(this,arguments)}finally{tt=n}}}});var jp=en((bE,Hp)=>{"use strict";Hp.exports=Fp()});var $g=en(At=>{"use strict";var Gm=he(),Ot=jp();function b(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Qm=new Set,Yi={};function oo(e,t){Qo(e,t),Qo(e+"Capture",t)}function Qo(e,t){for(Yi[e]=t,e=0;e<t.length;e++)Qm.add(t[e])}var Gn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ga=Object.prototype.hasOwnProperty,By=/^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$/,Dp={},Bp={};function Uy(e){return Ga.call(Bp,e)?!0:Ga.call(Dp,e)?!1:By.test(e)?Bp[e]=!0:(Dp[e]=!0,!1)}function Vy(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Wy(e,t,n,r){if(t===null||typeof t>"u"||Vy(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function pt(e,t,n,r,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var Ze={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ze[e]=new pt(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ze[t]=new pt(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ze[e]=new pt(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ze[e]=new pt(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ze[e]=new pt(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ze[e]=new pt(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ze[e]=new pt(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ze[e]=new pt(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ze[e]=new pt(e,5,!1,e.toLowerCase(),null,!1,!1)});var Hc=/[\\-:]([a-z])/g;function jc(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Hc,jc);Ze[t]=new pt(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Hc,jc);Ze[t]=new pt(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Hc,jc);Ze[t]=new pt(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ze[e]=new pt(e,1,!1,e.toLowerCase(),null,!1,!1)});Ze.xlinkHref=new pt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ze[e]=new pt(e,1,!1,e.toLowerCase(),null,!0,!0)});function Dc(e,t,n,r){var o=Ze.hasOwnProperty(t)?Ze[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Wy(t,n,o,r)&&(n=null),r||o===null?Uy(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Yn=Gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,es=Symbol.for("react.element"),Lo=Symbol.for("react.portal"),No=Symbol.for("react.fragment"),Bc=Symbol.for("react.strict_mode"),Qa=Symbol.for("react.profiler"),Km=Symbol.for("react.provider"),Zm=Symbol.for("react.context"),Uc=Symbol.for("react.forward_ref"),Ka=Symbol.for("react.suspense"),Za=Symbol.for("react.suspense_list"),Vc=Symbol.for("react.memo"),cr=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Ym=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Up=Symbol.iterator;function Li(e){return e===null||typeof e!="object"?null:(e=Up&&e[Up]||e["@@iterator"],typeof e=="function"?e:null)}var Me=Object.assign,Ca;function Fi(e){if(Ca===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\\n( *(at )?)/);Ca=t&&t[1]||""}return`\n`+Ca+e}var Ta=!1;function Ia(e,t){if(!e||Ta)return"";Ta=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(a){var r=a}Reflect.construct(e,[],t)}else{try{t.call()}catch(a){r=a}e.call(t.prototype)}else{try{throw Error()}catch(a){r=a}e()}}catch(a){if(a&&r&&typeof a.stack=="string"){for(var o=a.stack.split(`\n`),i=r.stack.split(`\n`),l=o.length-1,s=i.length-1;1<=l&&0<=s&&o[l]!==i[s];)s--;for(;1<=l&&0<=s;l--,s--)if(o[l]!==i[s]){if(l!==1||s!==1)do if(l--,s--,0>s||o[l]!==i[s]){var u=`\n`+o[l].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=l&&0<=s);break}}}finally{Ta=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Fi(e):""}function $y(e){switch(e.tag){case 5:return Fi(e.type);case 16:return Fi("Lazy");case 13:return Fi("Suspense");case 19:return Fi("SuspenseList");case 0:case 2:case 15:return e=Ia(e.type,!1),e;case 11:return e=Ia(e.type.render,!1),e;case 1:return e=Ia(e.type,!0),e;default:return""}}function Ya(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case No:return"Fragment";case Lo:return"Portal";case Qa:return"Profiler";case Bc:return"StrictMode";case Ka:return"Suspense";case Za:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Zm:return(e.displayName||"Context")+".Consumer";case Km:return(e._context.displayName||"Context")+".Provider";case Uc:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Vc:return t=e.displayName||null,t!==null?t:Ya(e.type)||"Memo";case cr:t=e._payload,e=e._init;try{return Ya(e(t))}catch{}}return null}function Gy(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ya(t);case 8:return t===Bc?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Cr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Xm(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Qy(e){var t=Xm(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ts(e){e._valueTracker||(e._valueTracker=Qy(e))}function Jm(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Xm(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ls(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Xa(e,t){var n=t.checked;return Me({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Vp(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Cr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function qm(e,t){t=t.checked,t!=null&&Dc(e,"checked",t,!1)}function Ja(e,t){qm(e,t);var n=Cr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?qa(e,t.type,n):t.hasOwnProperty("defaultValue")&&qa(e,t.type,Cr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Wp(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function qa(e,t,n){(t!=="number"||Ls(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Hi=Array.isArray;function Bo(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Cr(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function ec(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(b(91));return Me({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function $p(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(b(92));if(Hi(n)){if(1<n.length)throw Error(b(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Cr(n)}}function eh(e,t){var n=Cr(t.value),r=Cr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Gp(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function th(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function tc(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?th(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ns,nh=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ns=ns||document.createElement("div"),ns.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ns.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Xi(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Bi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ky=["Webkit","ms","Moz","O"];Object.keys(Bi).forEach(function(e){Ky.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Bi[t]=Bi[e]})});function rh(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Bi.hasOwnProperty(e)&&Bi[e]?(""+t).trim():t+"px"}function oh(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=rh(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Zy=Me({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function nc(e,t){if(t){if(Zy[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(b(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(b(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(b(61))}if(t.style!=null&&typeof t.style!="object")throw Error(b(62))}}function rc(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var oc=null;function Wc(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ic=null,Uo=null,Vo=null;function Qp(e){if(e=hl(e)){if(typeof ic!="function")throw Error(b(280));var t=e.stateNode;t&&(t=ru(t),ic(e.stateNode,e.type,t))}}function ih(e){Uo?Vo?Vo.push(e):Vo=[e]:Uo=e}function lh(){if(Uo){var e=Uo,t=Vo;if(Vo=Uo=null,Qp(e),t)for(e=0;e<t.length;e++)Qp(t[e])}}function sh(e,t){return e(t)}function uh(){}var ba=!1;function ah(e,t,n){if(ba)return e(t,n);ba=!0;try{return sh(e,t,n)}finally{ba=!1,(Uo!==null||Vo!==null)&&(uh(),lh())}}function Ji(e,t){var n=e.stateNode;if(n===null)return null;var r=ru(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(b(231,t,typeof n));return n}var lc=!1;if(Gn)try{bo={},Object.defineProperty(bo,"passive",{get:function(){lc=!0}}),window.addEventListener("test",bo,bo),window.removeEventListener("test",bo,bo)}catch{lc=!1}var bo;function Yy(e,t,n,r,o,i,l,s,u){var a=Array.prototype.slice.call(arguments,3);try{t.apply(n,a)}catch(c){this.onError(c)}}var Ui=!1,Ns=null,Rs=!1,sc=null,Xy={onError:function(e){Ui=!0,Ns=e}};function Jy(e,t,n,r,o,i,l,s,u){Ui=!1,Ns=null,Yy.apply(Xy,arguments)}function qy(e,t,n,r,o,i,l,s,u){if(Jy.apply(this,arguments),Ui){if(Ui){var a=Ns;Ui=!1,Ns=null}else throw Error(b(198));Rs||(Rs=!0,sc=a)}}function io(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function ch(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Kp(e){if(io(e)!==e)throw Error(b(188))}function e1(e){var t=e.alternate;if(!t){if(t=io(e),t===null)throw Error(b(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return Kp(o),e;if(i===r)return Kp(o),t;i=i.sibling}throw Error(b(188))}if(n.return!==r.return)n=o,r=i;else{for(var l=!1,s=o.child;s;){if(s===n){l=!0,n=o,r=i;break}if(s===r){l=!0,r=o,n=i;break}s=s.sibling}if(!l){for(s=i.child;s;){if(s===n){l=!0,n=i,r=o;break}if(s===r){l=!0,r=i,n=o;break}s=s.sibling}if(!l)throw Error(b(189))}}if(n.alternate!==r)throw Error(b(190))}if(n.tag!==3)throw Error(b(188));return n.stateNode.current===n?e:t}function fh(e){return e=e1(e),e!==null?dh(e):null}function dh(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=dh(e);if(t!==null)return t;e=e.sibling}return null}var ph=Ot.unstable_scheduleCallback,Zp=Ot.unstable_cancelCallback,t1=Ot.unstable_shouldYield,n1=Ot.unstable_requestPaint,_e=Ot.unstable_now,r1=Ot.unstable_getCurrentPriorityLevel,$c=Ot.unstable_ImmediatePriority,mh=Ot.unstable_UserBlockingPriority,_s=Ot.unstable_NormalPriority,o1=Ot.unstable_LowPriority,hh=Ot.unstable_IdlePriority,qs=null,In=null;function i1(e){if(In&&typeof In.onCommitFiberRoot=="function")try{In.onCommitFiberRoot(qs,e,void 0,(e.current.flags&128)===128)}catch{}}var fn=Math.clz32?Math.clz32:u1,l1=Math.log,s1=Math.LN2;function u1(e){return e>>>=0,e===0?32:31-(l1(e)/s1|0)|0}var rs=64,os=4194304;function ji(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ps(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var s=l&~o;s!==0?r=ji(s):(i&=l,i!==0&&(r=ji(i)))}else l=n&~o,l!==0?r=ji(l):i!==0&&(r=ji(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-fn(t),o=1<<n,r|=e[n],t&=~o;return r}function a1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function c1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-fn(i),s=1<<l,u=o[l];u===-1?((s&n)===0||(s&r)!==0)&&(o[l]=a1(s,t)):u<=t&&(e.expiredLanes|=s),i&=~s}}function uc(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function gh(){var e=rs;return rs<<=1,(rs&4194240)===0&&(rs=64),e}function Ma(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function pl(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-fn(t),e[t]=n}function f1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-fn(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function Gc(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-fn(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var ce=0;function vh(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var yh,Qc,wh,Sh,xh,ac=!1,is=[],gr=null,vr=null,yr=null,qi=new Map,el=new Map,dr=[],d1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yp(e,t){switch(e){case"focusin":case"focusout":gr=null;break;case"dragenter":case"dragleave":vr=null;break;case"mouseover":case"mouseout":yr=null;break;case"pointerover":case"pointerout":qi.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":el.delete(t.pointerId)}}function Ni(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=hl(t),t!==null&&Qc(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function p1(e,t,n,r,o){switch(t){case"focusin":return gr=Ni(gr,e,t,n,r,o),!0;case"dragenter":return vr=Ni(vr,e,t,n,r,o),!0;case"mouseover":return yr=Ni(yr,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return qi.set(i,Ni(qi.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,el.set(i,Ni(el.get(i)||null,e,t,n,r,o)),!0}return!1}function Eh(e){var t=Kr(e.target);if(t!==null){var n=io(t);if(n!==null){if(t=n.tag,t===13){if(t=ch(n),t!==null){e.blockedOn=t,xh(e.priority,function(){wh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ws(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=cc(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);oc=r,n.target.dispatchEvent(r),oc=null}else return t=hl(n),t!==null&&Qc(t),e.blockedOn=n,!1;t.shift()}return!0}function Xp(e,t,n){ws(e)&&n.delete(t)}function m1(){ac=!1,gr!==null&&ws(gr)&&(gr=null),vr!==null&&ws(vr)&&(vr=null),yr!==null&&ws(yr)&&(yr=null),qi.forEach(Xp),el.forEach(Xp)}function Ri(e,t){e.blockedOn===t&&(e.blockedOn=null,ac||(ac=!0,Ot.unstable_scheduleCallback(Ot.unstable_NormalPriority,m1)))}function tl(e){function t(o){return Ri(o,e)}if(0<is.length){Ri(is[0],e);for(var n=1;n<is.length;n++){var r=is[n];r.blockedOn===e&&(r.blockedOn=null)}}for(gr!==null&&Ri(gr,e),vr!==null&&Ri(vr,e),yr!==null&&Ri(yr,e),qi.forEach(t),el.forEach(t),n=0;n<dr.length;n++)r=dr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<dr.length&&(n=dr[0],n.blockedOn===null);)Eh(n),n.blockedOn===null&&dr.shift()}var Wo=Yn.ReactCurrentBatchConfig,Os=!0;function h1(e,t,n,r){var o=ce,i=Wo.transition;Wo.transition=null;try{ce=1,Kc(e,t,n,r)}finally{ce=o,Wo.transition=i}}function g1(e,t,n,r){var o=ce,i=Wo.transition;Wo.transition=null;try{ce=4,Kc(e,t,n,r)}finally{ce=o,Wo.transition=i}}function Kc(e,t,n,r){if(Os){var o=cc(e,t,n,r);if(o===null)za(e,t,r,zs,n),Yp(e,r);else if(p1(o,e,t,n,r))r.stopPropagation();else if(Yp(e,r),t&4&&-1<d1.indexOf(e)){for(;o!==null;){var i=hl(o);if(i!==null&&yh(i),i=cc(e,t,n,r),i===null&&za(e,t,r,zs,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else za(e,t,r,null,n)}}var zs=null;function cc(e,t,n,r){if(zs=null,e=Wc(r),e=Kr(e),e!==null)if(t=io(e),t===null)e=null;else if(n=t.tag,n===13){if(e=ch(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return zs=e,null}function kh(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(r1()){case $c:return 1;case mh:return 4;case _s:case o1:return 16;case hh:return 536870912;default:return 16}default:return 16}}var mr=null,Zc=null,Ss=null;function Ch(){if(Ss)return Ss;var e,t=Zc,n=t.length,r,o="value"in mr?mr.value:mr.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[i-r];r++);return Ss=o.slice(e,1<r?1-r:void 0)}function xs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function ls(){return!0}function Jp(){return!1}function zt(e){function t(n,r,o,i,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ls:Jp,this.isPropagationStopped=Jp,this}return Me(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ls)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ls)},persist:function(){},isPersistent:ls}),t}var ei={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yc=zt(ei),ml=Me({},ei,{view:0,detail:0}),v1=zt(ml),La,Na,_i,eu=Me({},ml,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xc,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_i&&(_i&&e.type==="mousemove"?(La=e.screenX-_i.screenX,Na=e.screenY-_i.screenY):Na=La=0,_i=e),La)},movementY:function(e){return"movementY"in e?e.movementY:Na}}),qp=zt(eu),y1=Me({},eu,{dataTransfer:0}),w1=zt(y1),S1=Me({},ml,{relatedTarget:0}),Ra=zt(S1),x1=Me({},ei,{animationName:0,elapsedTime:0,pseudoElement:0}),E1=zt(x1),k1=Me({},ei,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),C1=zt(k1),T1=Me({},ei,{data:0}),em=zt(T1),I1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},b1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},M1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=M1[e])?!!t[e]:!1}function Xc(){return L1}var N1=Me({},ml,{key:function(e){if(e.key){var t=I1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=xs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?b1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xc,charCode:function(e){return e.type==="keypress"?xs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?xs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),R1=zt(N1),_1=Me({},eu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tm=zt(_1),P1=Me({},ml,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xc}),O1=zt(P1),z1=Me({},ei,{propertyName:0,elapsedTime:0,pseudoElement:0}),A1=zt(z1),F1=Me({},eu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),H1=zt(F1),j1=[9,13,27,32],Jc=Gn&&"CompositionEvent"in window,Vi=null;Gn&&"documentMode"in document&&(Vi=document.documentMode);var D1=Gn&&"TextEvent"in window&&!Vi,Th=Gn&&(!Jc||Vi&&8<Vi&&11>=Vi),nm=String.fromCharCode(32),rm=!1;function Ih(e,t){switch(e){case"keyup":return j1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bh(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ro=!1;function B1(e,t){switch(e){case"compositionend":return bh(t);case"keypress":return t.which!==32?null:(rm=!0,nm);case"textInput":return e=t.data,e===nm&&rm?null:e;default:return null}}function U1(e,t){if(Ro)return e==="compositionend"||!Jc&&Ih(e,t)?(e=Ch(),Ss=Zc=mr=null,Ro=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Th&&t.locale!=="ko"?null:t.data;default:return null}}var V1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function om(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!V1[e.type]:t==="textarea"}function Mh(e,t,n,r){ih(r),t=As(t,"onChange"),0<t.length&&(n=new Yc("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Wi=null,nl=null;function W1(e){jh(e,0)}function tu(e){var t=Oo(e);if(Jm(t))return e}function $1(e,t){if(e==="change")return t}var Lh=!1;Gn&&(Gn?(us="oninput"in document,us||(_a=document.createElement("div"),_a.setAttribute("oninput","return;"),us=typeof _a.oninput=="function"),ss=us):ss=!1,Lh=ss&&(!document.documentMode||9<document.documentMode));var ss,us,_a;function im(){Wi&&(Wi.detachEvent("onpropertychange",Nh),nl=Wi=null)}function Nh(e){if(e.propertyName==="value"&&tu(nl)){var t=[];Mh(t,nl,e,Wc(e)),ah(W1,t)}}function G1(e,t,n){e==="focusin"?(im(),Wi=t,nl=n,Wi.attachEvent("onpropertychange",Nh)):e==="focusout"&&im()}function Q1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return tu(nl)}function K1(e,t){if(e==="click")return tu(t)}function Z1(e,t){if(e==="input"||e==="change")return tu(t)}function Y1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var pn=typeof Object.is=="function"?Object.is:Y1;function rl(e,t){if(pn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!Ga.call(t,o)||!pn(e[o],t[o]))return!1}return!0}function lm(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function sm(e,t){var n=lm(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=lm(n)}}function Rh(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Rh(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function _h(){for(var e=window,t=Ls();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ls(e.document)}return t}function qc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function X1(e){var t=_h(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Rh(n.ownerDocument.documentElement,n)){if(r!==null&&qc(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=sm(n,i);var l=sm(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var J1=Gn&&"documentMode"in document&&11>=document.documentMode,_o=null,fc=null,$i=null,dc=!1;function um(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;dc||_o==null||_o!==Ls(r)||(r=_o,"selectionStart"in r&&qc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),$i&&rl($i,r)||($i=r,r=As(fc,"onSelect"),0<r.length&&(t=new Yc("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=_o)))}function as(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Po={animationend:as("Animation","AnimationEnd"),animationiteration:as("Animation","AnimationIteration"),animationstart:as("Animation","AnimationStart"),transitionend:as("Transition","TransitionEnd")},Pa={},Ph={};Gn&&(Ph=document.createElement("div").style,"AnimationEvent"in window||(delete Po.animationend.animation,delete Po.animationiteration.animation,delete Po.animationstart.animation),"TransitionEvent"in window||delete Po.transitionend.transition);function nu(e){if(Pa[e])return Pa[e];if(!Po[e])return e;var t=Po[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ph)return Pa[e]=t[n];return e}var Oh=nu("animationend"),zh=nu("animationiteration"),Ah=nu("animationstart"),Fh=nu("transitionend"),Hh=new Map,am="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ir(e,t){Hh.set(e,t),oo(t,[e])}for(cs=0;cs<am.length;cs++)fs=am[cs],cm=fs.toLowerCase(),fm=fs[0].toUpperCase()+fs.slice(1),Ir(cm,"on"+fm);var fs,cm,fm,cs;Ir(Oh,"onAnimationEnd");Ir(zh,"onAnimationIteration");Ir(Ah,"onAnimationStart");Ir("dblclick","onDoubleClick");Ir("focusin","onFocus");Ir("focusout","onBlur");Ir(Fh,"onTransitionEnd");Qo("onMouseEnter",["mouseout","mouseover"]);Qo("onMouseLeave",["mouseout","mouseover"]);Qo("onPointerEnter",["pointerout","pointerover"]);Qo("onPointerLeave",["pointerout","pointerover"]);oo("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));oo("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));oo("onBeforeInput",["compositionend","keypress","textInput","paste"]);oo("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));oo("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));oo("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Di="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),q1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Di));function dm(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,qy(r,t,void 0,e),e.currentTarget=null}function jh(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var s=r[l],u=s.instance,a=s.currentTarget;if(s=s.listener,u!==i&&o.isPropagationStopped())break e;dm(o,s,a),i=u}else for(l=0;l<r.length;l++){if(s=r[l],u=s.instance,a=s.currentTarget,s=s.listener,u!==i&&o.isPropagationStopped())break e;dm(o,s,a),i=u}}}if(Rs)throw e=sc,Rs=!1,sc=null,e}function ye(e,t){var n=t[vc];n===void 0&&(n=t[vc]=new Set);var r=e+"__bubble";n.has(r)||(Dh(t,e,2,!1),n.add(r))}function Oa(e,t,n){var r=0;t&&(r|=4),Dh(n,e,r,t)}var ds="_reactListening"+Math.random().toString(36).slice(2);function ol(e){if(!e[ds]){e[ds]=!0,Qm.forEach(function(n){n!=="selectionchange"&&(q1.has(n)||Oa(n,!1,e),Oa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ds]||(t[ds]=!0,Oa("selectionchange",!1,t))}}function Dh(e,t,n,r){switch(kh(t)){case 1:var o=h1;break;case 4:o=g1;break;default:o=Kc}n=o.bind(null,t,n,e),o=void 0,!lc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function za(e,t,n,r,o){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var u=l.tag;if((u===3||u===4)&&(u=l.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;l=l.return}for(;s!==null;){if(l=Kr(s),l===null)return;if(u=l.tag,u===5||u===6){r=i=l;continue e}s=s.parentNode}}r=r.return}ah(function(){var a=i,c=Wc(n),h=[];e:{var y=Hh.get(e);if(y!==void 0){var m=Yc,d=e;switch(e){case"keypress":if(xs(n)===0)break e;case"keydown":case"keyup":m=R1;break;case"focusin":d="focus",m=Ra;break;case"focusout":d="blur",m=Ra;break;case"beforeblur":case"afterblur":m=Ra;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=qp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=w1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=O1;break;case Oh:case zh:case Ah:m=E1;break;case Fh:m=A1;break;case"scroll":m=v1;break;case"wheel":m=H1;break;case"copy":case"cut":case"paste":m=C1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=tm}var v=(t&4)!==0,E=!v&&e==="scroll",g=v?y!==null?y+"Capture":null:y;v=[];for(var p=a,f;p!==null;){f=p;var w=f.stateNode;if(f.tag===5&&w!==null&&(f=w,g!==null&&(w=Ji(p,g),w!=null&&v.push(il(p,w,f)))),E)break;p=p.return}0<v.length&&(y=new m(y,d,null,n,c),h.push({event:y,listeners:v}))}}if((t&7)===0){e:{if(y=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",y&&n!==oc&&(d=n.relatedTarget||n.fromElement)&&(Kr(d)||d[Qn]))break e;if((m||y)&&(y=c.window===c?c:(y=c.ownerDocument)?y.defaultView||y.parentWindow:window,m?(d=n.relatedTarget||n.toElement,m=a,d=d?Kr(d):null,d!==null&&(E=io(d),d!==E||d.tag!==5&&d.tag!==6)&&(d=null)):(m=null,d=a),m!==d)){if(v=qp,w="onMouseLeave",g="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(v=tm,w="onPointerLeave",g="onPointerEnter",p="pointer"),E=m==null?y:Oo(m),f=d==null?y:Oo(d),y=new v(w,p+"leave",m,n,c),y.target=E,y.relatedTarget=f,w=null,Kr(c)===a&&(v=new v(g,p+"enter",d,n,c),v.target=f,v.relatedTarget=E,w=v),E=w,m&&d)t:{for(v=m,g=d,p=0,f=v;f;f=Mo(f))p++;for(f=0,w=g;w;w=Mo(w))f++;for(;0<p-f;)v=Mo(v),p--;for(;0<f-p;)g=Mo(g),f--;for(;p--;){if(v===g||g!==null&&v===g.alternate)break t;v=Mo(v),g=Mo(g)}v=null}else v=null;m!==null&&pm(h,y,m,v,!1),d!==null&&E!==null&&pm(h,E,d,v,!0)}}e:{if(y=a?Oo(a):window,m=y.nodeName&&y.nodeName.toLowerCase(),m==="select"||m==="input"&&y.type==="file")var S=$1;else if(om(y))if(Lh)S=Z1;else{S=Q1;var x=G1}else(m=y.nodeName)&&m.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(S=K1);if(S&&(S=S(e,a))){Mh(h,S,n,c);break e}x&&x(e,y,a),e==="focusout"&&(x=y._wrapperState)&&x.controlled&&y.type==="number"&&qa(y,"number",y.value)}switch(x=a?Oo(a):window,e){case"focusin":(om(x)||x.contentEditable==="true")&&(_o=x,fc=a,$i=null);break;case"focusout":$i=fc=_o=null;break;case"mousedown":dc=!0;break;case"contextmenu":case"mouseup":case"dragend":dc=!1,um(h,n,c);break;case"selectionchange":if(J1)break;case"keydown":case"keyup":um(h,n,c)}var k;if(Jc)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Ro?Ih(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(Th&&n.locale!=="ko"&&(Ro||C!=="onCompositionStart"?C==="onCompositionEnd"&&Ro&&(k=Ch()):(mr=c,Zc="value"in mr?mr.value:mr.textContent,Ro=!0)),x=As(a,C),0<x.length&&(C=new em(C,e,null,n,c),h.push({event:C,listeners:x}),k?C.data=k:(k=bh(n),k!==null&&(C.data=k)))),(k=D1?B1(e,n):U1(e,n))&&(a=As(a,"onBeforeInput"),0<a.length&&(c=new em("onBeforeInput","beforeinput",null,n,c),h.push({event:c,listeners:a}),c.data=k))}jh(h,t)})}function il(e,t,n){return{instance:e,listener:t,currentTarget:n}}function As(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Ji(e,n),i!=null&&r.unshift(il(e,i,o)),i=Ji(e,t),i!=null&&r.push(il(e,i,o))),e=e.return}return r}function Mo(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function pm(e,t,n,r,o){for(var i=t._reactName,l=[];n!==null&&n!==r;){var s=n,u=s.alternate,a=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&a!==null&&(s=a,o?(u=Ji(n,i),u!=null&&l.unshift(il(n,u,s))):o||(u=Ji(n,i),u!=null&&l.push(il(n,u,s)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var ew=/\\r\\n?/g,tw=/\\u0000|\\uFFFD/g;function mm(e){return(typeof e=="string"?e:""+e).replace(ew,`\n`).replace(tw,"")}function ps(e,t,n){if(t=mm(t),mm(e)!==t&&n)throw Error(b(425))}function Fs(){}var pc=null,mc=null;function hc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var gc=typeof setTimeout=="function"?setTimeout:void 0,nw=typeof clearTimeout=="function"?clearTimeout:void 0,hm=typeof Promise=="function"?Promise:void 0,rw=typeof queueMicrotask=="function"?queueMicrotask:typeof hm<"u"?function(e){return hm.resolve(null).then(e).catch(ow)}:gc;function ow(e){setTimeout(function(){throw e})}function Aa(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),tl(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);tl(t)}function wr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function gm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ti=Math.random().toString(36).slice(2),Tn="__reactFiber$"+ti,ll="__reactProps$"+ti,Qn="__reactContainer$"+ti,vc="__reactEvents$"+ti,iw="__reactListeners$"+ti,lw="__reactHandles$"+ti;function Kr(e){var t=e[Tn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Qn]||n[Tn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=gm(e);e!==null;){if(n=e[Tn])return n;e=gm(e)}return t}e=n,n=e.parentNode}return null}function hl(e){return e=e[Tn]||e[Qn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Oo(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(b(33))}function ru(e){return e[ll]||null}var yc=[],zo=-1;function br(e){return{current:e}}function we(e){0>zo||(e.current=yc[zo],yc[zo]=null,zo--)}function ve(e,t){zo++,yc[zo]=e.current,e.current=t}var Tr={},it=br(Tr),St=br(!1),qr=Tr;function Ko(e,t){var n=e.type.contextTypes;if(!n)return Tr;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function xt(e){return e=e.childContextTypes,e!=null}function Hs(){we(St),we(it)}function vm(e,t,n){if(it.current!==Tr)throw Error(b(168));ve(it,t),ve(St,n)}function Bh(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(b(108,Gy(e)||"Unknown",o));return Me({},n,r)}function js(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Tr,qr=it.current,ve(it,e),ve(St,St.current),!0}function ym(e,t,n){var r=e.stateNode;if(!r)throw Error(b(169));n?(e=Bh(e,t,qr),r.__reactInternalMemoizedMergedChildContext=e,we(St),we(it),ve(it,e)):we(St),ve(St,n)}var Un=null,ou=!1,Fa=!1;function Uh(e){Un===null?Un=[e]:Un.push(e)}function sw(e){ou=!0,Uh(e)}function Mr(){if(!Fa&&Un!==null){Fa=!0;var e=0,t=ce;try{var n=Un;for(ce=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Un=null,ou=!1}catch(o){throw Un!==null&&(Un=Un.slice(e+1)),ph($c,Mr),o}finally{ce=t,Fa=!1}}return null}var Ao=[],Fo=0,Ds=null,Bs=0,Wt=[],$t=0,eo=null,Vn=1,Wn="";function Gr(e,t){Ao[Fo++]=Bs,Ao[Fo++]=Ds,Ds=e,Bs=t}function Vh(e,t,n){Wt[$t++]=Vn,Wt[$t++]=Wn,Wt[$t++]=eo,eo=e;var r=Vn;e=Wn;var o=32-fn(r)-1;r&=~(1<<o),n+=1;var i=32-fn(t)+o;if(30<i){var l=o-o%5;i=(r&(1<<l)-1).toString(32),r>>=l,o-=l,Vn=1<<32-fn(t)+o|n<<o|r,Wn=i+e}else Vn=1<<i|n<<o|r,Wn=e}function ef(e){e.return!==null&&(Gr(e,1),Vh(e,1,0))}function tf(e){for(;e===Ds;)Ds=Ao[--Fo],Ao[Fo]=null,Bs=Ao[--Fo],Ao[Fo]=null;for(;e===eo;)eo=Wt[--$t],Wt[$t]=null,Wn=Wt[--$t],Wt[$t]=null,Vn=Wt[--$t],Wt[$t]=null}var Pt=null,_t=null,ke=!1,cn=null;function Wh(e,t){var n=Gt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function wm(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Pt=e,_t=wr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Pt=e,_t=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=eo!==null?{id:Vn,overflow:Wn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Gt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Pt=e,_t=null,!0):!1;default:return!1}}function wc(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Sc(e){if(ke){var t=_t;if(t){var n=t;if(!wm(e,t)){if(wc(e))throw Error(b(418));t=wr(n.nextSibling);var r=Pt;t&&wm(e,t)?Wh(r,n):(e.flags=e.flags&-4097|2,ke=!1,Pt=e)}}else{if(wc(e))throw Error(b(418));e.flags=e.flags&-4097|2,ke=!1,Pt=e}}}function Sm(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Pt=e}function ms(e){if(e!==Pt)return!1;if(!ke)return Sm(e),ke=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!hc(e.type,e.memoizedProps)),t&&(t=_t)){if(wc(e))throw $h(),Error(b(418));for(;t;)Wh(e,t),t=wr(t.nextSibling)}if(Sm(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(b(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){_t=wr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}_t=null}}else _t=Pt?wr(e.stateNode.nextSibling):null;return!0}function $h(){for(var e=_t;e;)e=wr(e.nextSibling)}function Zo(){_t=Pt=null,ke=!1}function nf(e){cn===null?cn=[e]:cn.push(e)}var uw=Yn.ReactCurrentBatchConfig;function un(e,t){if(e&&e.defaultProps){t=Me({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var Us=br(null),Vs=null,Ho=null,rf=null;function of(){rf=Ho=Vs=null}function lf(e){var t=Us.current;we(Us),e._currentValue=t}function xc(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function $o(e,t){Vs=e,rf=Ho=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(wt=!0),e.firstContext=null)}function Kt(e){var t=e._currentValue;if(rf!==e)if(e={context:e,memoizedValue:t,next:null},Ho===null){if(Vs===null)throw Error(b(308));Ho=e,Vs.dependencies={lanes:0,firstContext:e}}else Ho=Ho.next=e;return t}var Zr=null;function sf(e){Zr===null?Zr=[e]:Zr.push(e)}function Gh(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,sf(t)):(n.next=o.next,o.next=n),t.interleaved=n,Kn(e,r)}function Kn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var fr=!1;function uf(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Qh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function $n(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Sr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(ne&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Kn(e,n)}return o=r.interleaved,o===null?(t.next=t,sf(r)):(t.next=o.next,o.next=t),r.interleaved=t,Kn(e,n)}function Es(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Gc(e,n)}}function xm(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ws(e,t,n,r){var o=e.updateQueue;fr=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var u=s,a=u.next;u.next=null,l===null?i=a:l.next=a,l=u;var c=e.alternate;c!==null&&(c=c.updateQueue,s=c.lastBaseUpdate,s!==l&&(s===null?c.firstBaseUpdate=a:s.next=a,c.lastBaseUpdate=u))}if(i!==null){var h=o.baseState;l=0,c=a=u=null,s=i;do{var y=s.lane,m=s.eventTime;if((r&y)===y){c!==null&&(c=c.next={eventTime:m,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var d=e,v=s;switch(y=t,m=n,v.tag){case 1:if(d=v.payload,typeof d=="function"){h=d.call(m,h,y);break e}h=d;break e;case 3:d.flags=d.flags&-65537|128;case 0:if(d=v.payload,y=typeof d=="function"?d.call(m,h,y):d,y==null)break e;h=Me({},h,y);break e;case 2:fr=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,y=o.effects,y===null?o.effects=[s]:y.push(s))}else m={eventTime:m,lane:y,tag:s.tag,payload:s.payload,callback:s.callback,next:null},c===null?(a=c=m,u=h):c=c.next=m,l|=y;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;y=s,s=y.next,y.next=null,o.lastBaseUpdate=y,o.shared.pending=null}}while(1);if(c===null&&(u=h),o.baseState=u,o.firstBaseUpdate=a,o.lastBaseUpdate=c,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);no|=l,e.lanes=l,e.memoizedState=h}}function Em(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(b(191,o));o.call(r)}}}var Kh=new Gm.Component().refs;function Ec(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Me({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var iu={isMounted:function(e){return(e=e._reactInternals)?io(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=dt(),o=Er(e),i=$n(r,o);i.payload=t,n!=null&&(i.callback=n),t=Sr(e,i,o),t!==null&&(dn(t,e,o,r),Es(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=dt(),o=Er(e),i=$n(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Sr(e,i,o),t!==null&&(dn(t,e,o,r),Es(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=dt(),r=Er(e),o=$n(n,r);o.tag=2,t!=null&&(o.callback=t),t=Sr(e,o,r),t!==null&&(dn(t,e,r,n),Es(t,e,r))}};function km(e,t,n,r,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!rl(n,r)||!rl(o,i):!0}function Zh(e,t,n){var r=!1,o=Tr,i=t.contextType;return typeof i=="object"&&i!==null?i=Kt(i):(o=xt(t)?qr:it.current,r=t.contextTypes,i=(r=r!=null)?Ko(e,o):Tr),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=iu,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Cm(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&iu.enqueueReplaceState(t,t.state,null)}function kc(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=Kh,uf(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=Kt(i):(i=xt(t)?qr:it.current,o.context=Ko(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ec(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&iu.enqueueReplaceState(o,o.state,null),Ws(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Pi(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(b(309));var r=n.stateNode}if(!r)throw Error(b(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var s=o.refs;s===Kh&&(s=o.refs={}),l===null?delete s[i]:s[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(b(284));if(!n._owner)throw Error(b(290,e))}return e}function hs(e,t){throw e=Object.prototype.toString.call(t),Error(b(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Tm(e){var t=e._init;return t(e._payload)}function Yh(e){function t(g,p){if(e){var f=g.deletions;f===null?(g.deletions=[p],g.flags|=16):f.push(p)}}function n(g,p){if(!e)return null;for(;p!==null;)t(g,p),p=p.sibling;return null}function r(g,p){for(g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function o(g,p){return g=kr(g,p),g.index=0,g.sibling=null,g}function i(g,p,f){return g.index=f,e?(f=g.alternate,f!==null?(f=f.index,f<p?(g.flags|=2,p):f):(g.flags|=2,p)):(g.flags|=1048576,p)}function l(g){return e&&g.alternate===null&&(g.flags|=2),g}function s(g,p,f,w){return p===null||p.tag!==6?(p=Wa(f,g.mode,w),p.return=g,p):(p=o(p,f),p.return=g,p)}function u(g,p,f,w){var S=f.type;return S===No?c(g,p,f.props.children,w,f.key):p!==null&&(p.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===cr&&Tm(S)===p.type)?(w=o(p,f.props),w.ref=Pi(g,p,f),w.return=g,w):(w=Ms(f.type,f.key,f.props,null,g.mode,w),w.ref=Pi(g,p,f),w.return=g,w)}function a(g,p,f,w){return p===null||p.tag!==4||p.stateNode.containerInfo!==f.containerInfo||p.stateNode.implementation!==f.implementation?(p=$a(f,g.mode,w),p.return=g,p):(p=o(p,f.children||[]),p.return=g,p)}function c(g,p,f,w,S){return p===null||p.tag!==7?(p=Jr(f,g.mode,w,S),p.return=g,p):(p=o(p,f),p.return=g,p)}function h(g,p,f){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Wa(""+p,g.mode,f),p.return=g,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case es:return f=Ms(p.type,p.key,p.props,null,g.mode,f),f.ref=Pi(g,null,p),f.return=g,f;case Lo:return p=$a(p,g.mode,f),p.return=g,p;case cr:var w=p._init;return h(g,w(p._payload),f)}if(Hi(p)||Li(p))return p=Jr(p,g.mode,f,null),p.return=g,p;hs(g,p)}return null}function y(g,p,f,w){var S=p!==null?p.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return S!==null?null:s(g,p,""+f,w);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case es:return f.key===S?u(g,p,f,w):null;case Lo:return f.key===S?a(g,p,f,w):null;case cr:return S=f._init,y(g,p,S(f._payload),w)}if(Hi(f)||Li(f))return S!==null?null:c(g,p,f,w,null);hs(g,f)}return null}function m(g,p,f,w,S){if(typeof w=="string"&&w!==""||typeof w=="number")return g=g.get(f)||null,s(p,g,""+w,S);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case es:return g=g.get(w.key===null?f:w.key)||null,u(p,g,w,S);case Lo:return g=g.get(w.key===null?f:w.key)||null,a(p,g,w,S);case cr:var x=w._init;return m(g,p,f,x(w._payload),S)}if(Hi(w)||Li(w))return g=g.get(f)||null,c(p,g,w,S,null);hs(p,w)}return null}function d(g,p,f,w){for(var S=null,x=null,k=p,C=p=0,I=null;k!==null&&C<f.length;C++){k.index>C?(I=k,k=null):I=k.sibling;var L=y(g,k,f[C],w);if(L===null){k===null&&(k=I);break}e&&k&&L.alternate===null&&t(g,k),p=i(L,p,C),x===null?S=L:x.sibling=L,x=L,k=I}if(C===f.length)return n(g,k),ke&&Gr(g,C),S;if(k===null){for(;C<f.length;C++)k=h(g,f[C],w),k!==null&&(p=i(k,p,C),x===null?S=k:x.sibling=k,x=k);return ke&&Gr(g,C),S}for(k=r(g,k);C<f.length;C++)I=m(k,g,C,f[C],w),I!==null&&(e&&I.alternate!==null&&k.delete(I.key===null?C:I.key),p=i(I,p,C),x===null?S=I:x.sibling=I,x=I);return e&&k.forEach(function(B){return t(g,B)}),ke&&Gr(g,C),S}function v(g,p,f,w){var S=Li(f);if(typeof S!="function")throw Error(b(150));if(f=S.call(f),f==null)throw Error(b(151));for(var x=S=null,k=p,C=p=0,I=null,L=f.next();k!==null&&!L.done;C++,L=f.next()){k.index>C?(I=k,k=null):I=k.sibling;var B=y(g,k,L.value,w);if(B===null){k===null&&(k=I);break}e&&k&&B.alternate===null&&t(g,k),p=i(B,p,C),x===null?S=B:x.sibling=B,x=B,k=I}if(L.done)return n(g,k),ke&&Gr(g,C),S;if(k===null){for(;!L.done;C++,L=f.next())L=h(g,L.value,w),L!==null&&(p=i(L,p,C),x===null?S=L:x.sibling=L,x=L);return ke&&Gr(g,C),S}for(k=r(g,k);!L.done;C++,L=f.next())L=m(k,g,C,L.value,w),L!==null&&(e&&L.alternate!==null&&k.delete(L.key===null?C:L.key),p=i(L,p,C),x===null?S=L:x.sibling=L,x=L);return e&&k.forEach(function(Z){return t(g,Z)}),ke&&Gr(g,C),S}function E(g,p,f,w){if(typeof f=="object"&&f!==null&&f.type===No&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case es:e:{for(var S=f.key,x=p;x!==null;){if(x.key===S){if(S=f.type,S===No){if(x.tag===7){n(g,x.sibling),p=o(x,f.props.children),p.return=g,g=p;break e}}else if(x.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===cr&&Tm(S)===x.type){n(g,x.sibling),p=o(x,f.props),p.ref=Pi(g,x,f),p.return=g,g=p;break e}n(g,x);break}else t(g,x);x=x.sibling}f.type===No?(p=Jr(f.props.children,g.mode,w,f.key),p.return=g,g=p):(w=Ms(f.type,f.key,f.props,null,g.mode,w),w.ref=Pi(g,p,f),w.return=g,g=w)}return l(g);case Lo:e:{for(x=f.key;p!==null;){if(p.key===x)if(p.tag===4&&p.stateNode.containerInfo===f.containerInfo&&p.stateNode.implementation===f.implementation){n(g,p.sibling),p=o(p,f.children||[]),p.return=g,g=p;break e}else{n(g,p);break}else t(g,p);p=p.sibling}p=$a(f,g.mode,w),p.return=g,g=p}return l(g);case cr:return x=f._init,E(g,p,x(f._payload),w)}if(Hi(f))return d(g,p,f,w);if(Li(f))return v(g,p,f,w);hs(g,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,p!==null&&p.tag===6?(n(g,p.sibling),p=o(p,f),p.return=g,g=p):(n(g,p),p=Wa(f,g.mode,w),p.return=g,g=p),l(g)):n(g,p)}return E}var Yo=Yh(!0),Xh=Yh(!1),gl={},bn=br(gl),sl=br(gl),ul=br(gl);function Yr(e){if(e===gl)throw Error(b(174));return e}function af(e,t){switch(ve(ul,t),ve(sl,e),ve(bn,gl),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:tc(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=tc(t,e)}we(bn),ve(bn,t)}function Xo(){we(bn),we(sl),we(ul)}function Jh(e){Yr(ul.current);var t=Yr(bn.current),n=tc(t,e.type);t!==n&&(ve(sl,e),ve(bn,n))}function cf(e){sl.current===e&&(we(bn),we(sl))}var Ie=br(0);function $s(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ha=[];function ff(){for(var e=0;e<Ha.length;e++)Ha[e]._workInProgressVersionPrimary=null;Ha.length=0}var ks=Yn.ReactCurrentDispatcher,ja=Yn.ReactCurrentBatchConfig,to=0,be=null,je=null,Be=null,Gs=!1,Gi=!1,al=0,aw=0;function nt(){throw Error(b(321))}function df(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!pn(e[n],t[n]))return!1;return!0}function pf(e,t,n,r,o,i){if(to=i,be=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ks.current=e===null||e.memoizedState===null?pw:mw,e=n(r,o),Gi){i=0;do{if(Gi=!1,al=0,25<=i)throw Error(b(301));i+=1,Be=je=null,t.updateQueue=null,ks.current=hw,e=n(r,o)}while(Gi)}if(ks.current=Qs,t=je!==null&&je.next!==null,to=0,Be=je=be=null,Gs=!1,t)throw Error(b(300));return e}function mf(){var e=al!==0;return al=0,e}function Cn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?be.memoizedState=Be=e:Be=Be.next=e,Be}function Zt(){if(je===null){var e=be.alternate;e=e!==null?e.memoizedState:null}else e=je.next;var t=Be===null?be.memoizedState:Be.next;if(t!==null)Be=t,je=e;else{if(e===null)throw Error(b(310));je=e,e={memoizedState:je.memoizedState,baseState:je.baseState,baseQueue:je.baseQueue,queue:je.queue,next:null},Be===null?be.memoizedState=Be=e:Be=Be.next=e}return Be}function cl(e,t){return typeof t=="function"?t(e):t}function Da(e){var t=Zt(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=je,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var s=l=null,u=null,a=i;do{var c=a.lane;if((to&c)===c)u!==null&&(u=u.next={lane:0,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null}),r=a.hasEagerState?a.eagerState:e(r,a.action);else{var h={lane:c,action:a.action,hasEagerState:a.hasEagerState,eagerState:a.eagerState,next:null};u===null?(s=u=h,l=r):u=u.next=h,be.lanes|=c,no|=c}a=a.next}while(a!==null&&a!==i);u===null?l=r:u.next=s,pn(r,t.memoizedState)||(wt=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,be.lanes|=i,no|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Ba(e){var t=Zt(),n=t.queue;if(n===null)throw Error(b(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);pn(i,t.memoizedState)||(wt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function qh(){}function eg(e,t){var n=be,r=Zt(),o=t(),i=!pn(r.memoizedState,o);if(i&&(r.memoizedState=o,wt=!0),r=r.queue,hf(rg.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Be!==null&&Be.memoizedState.tag&1){if(n.flags|=2048,fl(9,ng.bind(null,n,r,o,t),void 0,null),Ue===null)throw Error(b(349));(to&30)!==0||tg(n,t,o)}return o}function tg(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=be.updateQueue,t===null?(t={lastEffect:null,stores:null},be.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ng(e,t,n,r){t.value=n,t.getSnapshot=r,og(t)&&ig(e)}function rg(e,t,n){return n(function(){og(t)&&ig(e)})}function og(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!pn(e,n)}catch{return!0}}function ig(e){var t=Kn(e,1);t!==null&&dn(t,e,1,-1)}function Im(e){var t=Cn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cl,lastRenderedState:e},t.queue=e,e=e.dispatch=dw.bind(null,be,e),[t.memoizedState,e]}function fl(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=be.updateQueue,t===null?(t={lastEffect:null,stores:null},be.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function lg(){return Zt().memoizedState}function Cs(e,t,n,r){var o=Cn();be.flags|=e,o.memoizedState=fl(1|t,n,void 0,r===void 0?null:r)}function lu(e,t,n,r){var o=Zt();r=r===void 0?null:r;var i=void 0;if(je!==null){var l=je.memoizedState;if(i=l.destroy,r!==null&&df(r,l.deps)){o.memoizedState=fl(t,n,i,r);return}}be.flags|=e,o.memoizedState=fl(1|t,n,i,r)}function bm(e,t){return Cs(8390656,8,e,t)}function hf(e,t){return lu(2048,8,e,t)}function sg(e,t){return lu(4,2,e,t)}function ug(e,t){return lu(4,4,e,t)}function ag(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function cg(e,t,n){return n=n!=null?n.concat([e]):null,lu(4,4,ag.bind(null,t,e),n)}function gf(){}function fg(e,t){var n=Zt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&df(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function dg(e,t){var n=Zt();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&df(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function pg(e,t,n){return(to&21)===0?(e.baseState&&(e.baseState=!1,wt=!0),e.memoizedState=n):(pn(n,t)||(n=gh(),be.lanes|=n,no|=n,e.baseState=!0),t)}function cw(e,t){var n=ce;ce=n!==0&&4>n?n:4,e(!0);var r=ja.transition;ja.transition={};try{e(!1),t()}finally{ce=n,ja.transition=r}}function mg(){return Zt().memoizedState}function fw(e,t,n){var r=Er(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},hg(e))gg(t,n);else if(n=Gh(e,t,n,r),n!==null){var o=dt();dn(n,e,r,o),vg(n,t,r)}}function dw(e,t,n){var r=Er(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(hg(e))gg(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,s=i(l,n);if(o.hasEagerState=!0,o.eagerState=s,pn(s,l)){var u=t.interleaved;u===null?(o.next=o,sf(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch{}finally{}n=Gh(e,t,o,r),n!==null&&(o=dt(),dn(n,e,r,o),vg(n,t,r))}}function hg(e){var t=e.alternate;return e===be||t!==null&&t===be}function gg(e,t){Gi=Gs=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function vg(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Gc(e,n)}}var Qs={readContext:Kt,useCallback:nt,useContext:nt,useEffect:nt,useImperativeHandle:nt,useInsertionEffect:nt,useLayoutEffect:nt,useMemo:nt,useReducer:nt,useRef:nt,useState:nt,useDebugValue:nt,useDeferredValue:nt,useTransition:nt,useMutableSource:nt,useSyncExternalStore:nt,useId:nt,unstable_isNewReconciler:!1},pw={readContext:Kt,useCallback:function(e,t){return Cn().memoizedState=[e,t===void 0?null:t],e},useContext:Kt,useEffect:bm,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Cs(4194308,4,ag.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Cs(4194308,4,e,t)},useInsertionEffect:function(e,t){return Cs(4,2,e,t)},useMemo:function(e,t){var n=Cn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Cn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=fw.bind(null,be,e),[r.memoizedState,e]},useRef:function(e){var t=Cn();return e={current:e},t.memoizedState=e},useState:Im,useDebugValue:gf,useDeferredValue:function(e){return Cn().memoizedState=e},useTransition:function(){var e=Im(!1),t=e[0];return e=cw.bind(null,e[1]),Cn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=be,o=Cn();if(ke){if(n===void 0)throw Error(b(407));n=n()}else{if(n=t(),Ue===null)throw Error(b(349));(to&30)!==0||tg(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,bm(rg.bind(null,r,i,e),[e]),r.flags|=2048,fl(9,ng.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Cn(),t=Ue.identifierPrefix;if(ke){var n=Wn,r=Vn;n=(r&~(1<<32-fn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=al++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=aw++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},mw={readContext:Kt,useCallback:fg,useContext:Kt,useEffect:hf,useImperativeHandle:cg,useInsertionEffect:sg,useLayoutEffect:ug,useMemo:dg,useReducer:Da,useRef:lg,useState:function(){return Da(cl)},useDebugValue:gf,useDeferredValue:function(e){var t=Zt();return pg(t,je.memoizedState,e)},useTransition:function(){var e=Da(cl)[0],t=Zt().memoizedState;return[e,t]},useMutableSource:qh,useSyncExternalStore:eg,useId:mg,unstable_isNewReconciler:!1},hw={readContext:Kt,useCallback:fg,useContext:Kt,useEffect:hf,useImperativeHandle:cg,useInsertionEffect:sg,useLayoutEffect:ug,useMemo:dg,useReducer:Ba,useRef:lg,useState:function(){return Ba(cl)},useDebugValue:gf,useDeferredValue:function(e){var t=Zt();return je===null?t.memoizedState=e:pg(t,je.memoizedState,e)},useTransition:function(){var e=Ba(cl)[0],t=Zt().memoizedState;return[e,t]},useMutableSource:qh,useSyncExternalStore:eg,useId:mg,unstable_isNewReconciler:!1};function Jo(e,t){try{var n="",r=t;do n+=$y(r),r=r.return;while(r);var o=n}catch(i){o=`\nError generating stack: `+i.message+`\n`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Ua(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Cc(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var gw=typeof WeakMap=="function"?WeakMap:Map;function yg(e,t,n){n=$n(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Zs||(Zs=!0,Oc=r),Cc(e,t)},n}function wg(e,t,n){n=$n(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Cc(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Cc(e,t),typeof r!="function"&&(xr===null?xr=new Set([this]):xr.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Mm(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new gw;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Nw.bind(null,e,t,n),t.then(e,e))}function Lm(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Nm(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=$n(-1,1),t.tag=2,Sr(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var vw=Yn.ReactCurrentOwner,wt=!1;function ft(e,t,n,r){t.child=e===null?Xh(t,null,n,r):Yo(t,e.child,n,r)}function Rm(e,t,n,r,o){n=n.render;var i=t.ref;return $o(t,o),r=pf(e,t,n,r,i,o),n=mf(),e!==null&&!wt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Zn(e,t,o)):(ke&&n&&ef(t),t.flags|=1,ft(e,t,r,o),t.child)}function _m(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Cf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Sg(e,t,i,r,o)):(e=Ms(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&o)===0){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:rl,n(l,r)&&e.ref===t.ref)return Zn(e,t,o)}return t.flags|=1,e=kr(i,r),e.ref=t.ref,e.return=t,t.child=e}function Sg(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(rl(i,r)&&e.ref===t.ref)if(wt=!1,t.pendingProps=r=i,(e.lanes&o)!==0)(e.flags&131072)!==0&&(wt=!0);else return t.lanes=e.lanes,Zn(e,t,o)}return Tc(e,t,n,r,o)}function xg(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ve(Do,Rt),Rt|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ve(Do,Rt),Rt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ve(Do,Rt),Rt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,ve(Do,Rt),Rt|=r;return ft(e,t,o,n),t.child}function Eg(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Tc(e,t,n,r,o){var i=xt(n)?qr:it.current;return i=Ko(t,i),$o(t,o),n=pf(e,t,n,r,i,o),r=mf(),e!==null&&!wt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Zn(e,t,o)):(ke&&r&&ef(t),t.flags|=1,ft(e,t,n,o),t.child)}function Pm(e,t,n,r,o){if(xt(n)){var i=!0;js(t)}else i=!1;if($o(t,o),t.stateNode===null)Ts(e,t),Zh(t,n,r),kc(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var u=l.context,a=n.contextType;typeof a=="object"&&a!==null?a=Kt(a):(a=xt(n)?qr:it.current,a=Ko(t,a));var c=n.getDerivedStateFromProps,h=typeof c=="function"||typeof l.getSnapshotBeforeUpdate=="function";h||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||u!==a)&&Cm(t,l,r,a),fr=!1;var y=t.memoizedState;l.state=y,Ws(t,r,l,o),u=t.memoizedState,s!==r||y!==u||St.current||fr?(typeof c=="function"&&(Ec(t,n,c,r),u=t.memoizedState),(s=fr||km(t,n,s,r,y,u,a))?(h||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),l.props=r,l.state=u,l.context=a,r=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Qh(e,t),s=t.memoizedProps,a=t.type===t.elementType?s:un(t.type,s),l.props=a,h=t.pendingProps,y=l.context,u=n.contextType,typeof u=="object"&&u!==null?u=Kt(u):(u=xt(n)?qr:it.current,u=Ko(t,u));var m=n.getDerivedStateFromProps;(c=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==h||y!==u)&&Cm(t,l,r,u),fr=!1,y=t.memoizedState,l.state=y,Ws(t,r,l,o);var d=t.memoizedState;s!==h||y!==d||St.current||fr?(typeof m=="function"&&(Ec(t,n,m,r),d=t.memoizedState),(a=fr||km(t,n,a,r,y,d,u)||!1)?(c||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,d,u),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,d,u)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=d),l.props=r,l.state=d,l.context=u,r=a):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&y===e.memoizedState||(t.flags|=1024),r=!1)}return Ic(e,t,n,r,i,o)}function Ic(e,t,n,r,o,i){Eg(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&ym(t,n,!1),Zn(e,t,i);r=t.stateNode,vw.current=t;var s=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Yo(t,e.child,null,i),t.child=Yo(t,null,s,i)):ft(e,t,s,i),t.memoizedState=r.state,o&&ym(t,n,!0),t.child}function kg(e){var t=e.stateNode;t.pendingContext?vm(e,t.pendingContext,t.pendingContext!==t.context):t.context&&vm(e,t.context,!1),af(e,t.containerInfo)}function Om(e,t,n,r,o){return Zo(),nf(o),t.flags|=256,ft(e,t,n,r),t.child}var bc={dehydrated:null,treeContext:null,retryLane:0};function Mc(e){return{baseLanes:e,cachePool:null,transitions:null}}function Cg(e,t,n){var r=t.pendingProps,o=Ie.current,i=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),ve(Ie,o&1),e===null)return Sc(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=l):i=au(l,r,0,null),e=Jr(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Mc(n),t.memoizedState=bc,e):vf(t,l));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return yw(e,t,l,r,s,o,n);if(i){i=r.fallback,l=t.mode,o=e.child,s=o.sibling;var u={mode:"hidden",children:r.children};return(l&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=kr(o,u),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?i=kr(s,i):(i=Jr(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?Mc(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=bc,r}return i=e.child,e=i.sibling,r=kr(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function vf(e,t){return t=au({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function gs(e,t,n,r){return r!==null&&nf(r),Yo(t,e.child,null,n),e=vf(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function yw(e,t,n,r,o,i,l){if(n)return t.flags&256?(t.flags&=-257,r=Ua(Error(b(422))),gs(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=au({mode:"visible",children:r.children},o,0,null),i=Jr(i,o,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&Yo(t,e.child,null,l),t.child.memoizedState=Mc(l),t.memoizedState=bc,i);if((t.mode&1)===0)return gs(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(b(419)),r=Ua(i,r,void 0),gs(e,t,l,r)}if(s=(l&e.childLanes)!==0,wt||s){if(r=Ue,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|l))!==0?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,Kn(e,o),dn(r,e,o,-1))}return kf(),r=Ua(Error(b(421))),gs(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Rw.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,_t=wr(o.nextSibling),Pt=t,ke=!0,cn=null,e!==null&&(Wt[$t++]=Vn,Wt[$t++]=Wn,Wt[$t++]=eo,Vn=e.id,Wn=e.overflow,eo=t),t=vf(t,r.children),t.flags|=4096,t)}function zm(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),xc(e.return,t,n)}function Va(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function Tg(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(ft(e,t,r.children,n),r=Ie.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&zm(e,n,t);else if(e.tag===19)zm(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ve(Ie,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&$s(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Va(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&$s(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Va(t,!0,n,null,i);break;case"together":Va(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ts(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Zn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),no|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(b(153));if(t.child!==null){for(e=t.child,n=kr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=kr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ww(e,t,n){switch(t.tag){case 3:kg(t),Zo();break;case 5:Jh(t);break;case 1:xt(t.type)&&js(t);break;case 4:af(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;ve(Us,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ve(Ie,Ie.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?Cg(e,t,n):(ve(Ie,Ie.current&1),e=Zn(e,t,n),e!==null?e.sibling:null);ve(Ie,Ie.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return Tg(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),ve(Ie,Ie.current),r)break;return null;case 22:case 23:return t.lanes=0,xg(e,t,n)}return Zn(e,t,n)}var Ig,Lc,bg,Mg;Ig=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Lc=function(){};bg=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Yr(bn.current);var i=null;switch(n){case"input":o=Xa(e,o),r=Xa(e,r),i=[];break;case"select":o=Me({},o,{value:void 0}),r=Me({},r,{value:void 0}),i=[];break;case"textarea":o=ec(e,o),r=ec(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Fs)}nc(n,r);var l;n=null;for(a in o)if(!r.hasOwnProperty(a)&&o.hasOwnProperty(a)&&o[a]!=null)if(a==="style"){var s=o[a];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else a!=="dangerouslySetInnerHTML"&&a!=="children"&&a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Yi.hasOwnProperty(a)?i||(i=[]):(i=i||[]).push(a,null));for(a in r){var u=r[a];if(s=o?.[a],r.hasOwnProperty(a)&&u!==s&&(u!=null||s!=null))if(a==="style")if(s){for(l in s)!s.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in u)u.hasOwnProperty(l)&&s[l]!==u[l]&&(n||(n={}),n[l]=u[l])}else n||(i||(i=[]),i.push(a,n)),n=u;else a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(i=i||[]).push(a,u)):a==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(a,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&(Yi.hasOwnProperty(a)?(u!=null&&a==="onScroll"&&ye("scroll",e),i||s===u||(i=[])):(i=i||[]).push(a,u))}n&&(i=i||[]).push("style",n);var a=i;(t.updateQueue=a)&&(t.flags|=4)}};Mg=function(e,t,n,r){n!==r&&(t.flags|=4)};function Oi(e,t){if(!ke)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function rt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Sw(e,t,n){var r=t.pendingProps;switch(tf(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rt(t),null;case 1:return xt(t.type)&&Hs(),rt(t),null;case 3:return r=t.stateNode,Xo(),we(St),we(it),ff(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ms(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,cn!==null&&(Fc(cn),cn=null))),Lc(e,t),rt(t),null;case 5:cf(t);var o=Yr(ul.current);if(n=t.type,e!==null&&t.stateNode!=null)bg(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(b(166));return rt(t),null}if(e=Yr(bn.current),ms(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Tn]=t,r[ll]=i,e=(t.mode&1)!==0,n){case"dialog":ye("cancel",r),ye("close",r);break;case"iframe":case"object":case"embed":ye("load",r);break;case"video":case"audio":for(o=0;o<Di.length;o++)ye(Di[o],r);break;case"source":ye("error",r);break;case"img":case"image":case"link":ye("error",r),ye("load",r);break;case"details":ye("toggle",r);break;case"input":Vp(r,i),ye("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ye("invalid",r);break;case"textarea":$p(r,i),ye("invalid",r)}nc(n,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&ps(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&ps(r.textContent,s,e),o=["children",""+s]):Yi.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&ye("scroll",r)}switch(n){case"input":ts(r),Wp(r,i,!0);break;case"textarea":ts(r),Gp(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Fs)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=th(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[Tn]=t,e[ll]=r,Ig(e,t,!1,!1),t.stateNode=e;e:{switch(l=rc(n,r),n){case"dialog":ye("cancel",e),ye("close",e),o=r;break;case"iframe":case"object":case"embed":ye("load",e),o=r;break;case"video":case"audio":for(o=0;o<Di.length;o++)ye(Di[o],e);o=r;break;case"source":ye("error",e),o=r;break;case"img":case"image":case"link":ye("error",e),ye("load",e),o=r;break;case"details":ye("toggle",e),o=r;break;case"input":Vp(e,r),o=Xa(e,r),ye("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Me({},r,{value:void 0}),ye("invalid",e);break;case"textarea":$p(e,r),o=ec(e,r),ye("invalid",e);break;default:o=r}nc(n,o),s=o;for(i in s)if(s.hasOwnProperty(i)){var u=s[i];i==="style"?oh(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&nh(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Xi(e,u):typeof u=="number"&&Xi(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Yi.hasOwnProperty(i)?u!=null&&i==="onScroll"&&ye("scroll",e):u!=null&&Dc(e,i,u,l))}switch(n){case"input":ts(e),Wp(e,r,!1);break;case"textarea":ts(e),Gp(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Cr(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Bo(e,!!r.multiple,i,!1):r.defaultValue!=null&&Bo(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Fs)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return rt(t),null;case 6:if(e&&t.stateNode!=null)Mg(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(b(166));if(n=Yr(ul.current),Yr(bn.current),ms(t)){if(r=t.stateNode,n=t.memoizedProps,r[Tn]=t,(i=r.nodeValue!==n)&&(e=Pt,e!==null))switch(e.tag){case 3:ps(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ps(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Tn]=t,t.stateNode=r}return rt(t),null;case 13:if(we(Ie),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(ke&&_t!==null&&(t.mode&1)!==0&&(t.flags&128)===0)$h(),Zo(),t.flags|=98560,i=!1;else if(i=ms(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(b(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(b(317));i[Tn]=t}else Zo(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;rt(t),i=!1}else cn!==null&&(Fc(cn),cn=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Ie.current&1)!==0?De===0&&(De=3):kf())),t.updateQueue!==null&&(t.flags|=4),rt(t),null);case 4:return Xo(),Lc(e,t),e===null&&ol(t.stateNode.containerInfo),rt(t),null;case 10:return lf(t.type._context),rt(t),null;case 17:return xt(t.type)&&Hs(),rt(t),null;case 19:if(we(Ie),i=t.memoizedState,i===null)return rt(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)Oi(i,!1);else{if(De!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(l=$s(e),l!==null){for(t.flags|=128,Oi(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ve(Ie,Ie.current&1|2),t.child}e=e.sibling}i.tail!==null&&_e()>qo&&(t.flags|=128,r=!0,Oi(i,!1),t.lanes=4194304)}else{if(!r)if(e=$s(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Oi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!ke)return rt(t),null}else 2*_e()-i.renderingStartTime>qo&&n!==1073741824&&(t.flags|=128,r=!0,Oi(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=_e(),t.sibling=null,n=Ie.current,ve(Ie,r?n&1|2:n&1),t):(rt(t),null);case 22:case 23:return Ef(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Rt&1073741824)!==0&&(rt(t),t.subtreeFlags&6&&(t.flags|=8192)):rt(t),null;case 24:return null;case 25:return null}throw Error(b(156,t.tag))}function xw(e,t){switch(tf(t),t.tag){case 1:return xt(t.type)&&Hs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Xo(),we(St),we(it),ff(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return cf(t),null;case 13:if(we(Ie),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(b(340));Zo()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return we(Ie),null;case 4:return Xo(),null;case 10:return lf(t.type._context),null;case 22:case 23:return Ef(),null;case 24:return null;default:return null}}var vs=!1,ot=!1,Ew=typeof WeakSet=="function"?WeakSet:Set,O=null;function jo(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ne(e,t,r)}else n.current=null}function Nc(e,t,n){try{n()}catch(r){Ne(e,t,r)}}var Am=!1;function kw(e,t){if(pc=Os,e=_h(),qc(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,s=-1,u=-1,a=0,c=0,h=e,y=null;t:for(;;){for(var m;h!==n||o!==0&&h.nodeType!==3||(s=l+o),h!==i||r!==0&&h.nodeType!==3||(u=l+r),h.nodeType===3&&(l+=h.nodeValue.length),(m=h.firstChild)!==null;)y=h,h=m;for(;;){if(h===e)break t;if(y===n&&++a===o&&(s=l),y===i&&++c===r&&(u=l),(m=h.nextSibling)!==null)break;h=y,y=h.parentNode}h=m}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(mc={focusedElem:e,selectionRange:n},Os=!1,O=t;O!==null;)if(t=O,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,O=e;else for(;O!==null;){t=O;try{var d=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(d!==null){var v=d.memoizedProps,E=d.memoizedState,g=t.stateNode,p=g.getSnapshotBeforeUpdate(t.elementType===t.type?v:un(t.type,v),E);g.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(b(163))}}catch(w){Ne(t,t.return,w)}if(e=t.sibling,e!==null){e.return=t.return,O=e;break}O=t.return}return d=Am,Am=!1,d}function Qi(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Nc(t,n,i)}o=o.next}while(o!==r)}}function su(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Rc(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Lg(e){var t=e.alternate;t!==null&&(e.alternate=null,Lg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Tn],delete t[ll],delete t[vc],delete t[iw],delete t[lw])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ng(e){return e.tag===5||e.tag===3||e.tag===4}function Fm(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ng(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function _c(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Fs));else if(r!==4&&(e=e.child,e!==null))for(_c(e,t,n),e=e.sibling;e!==null;)_c(e,t,n),e=e.sibling}function Pc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Pc(e,t,n),e=e.sibling;e!==null;)Pc(e,t,n),e=e.sibling}var Qe=null,an=!1;function ar(e,t,n){for(n=n.child;n!==null;)Rg(e,t,n),n=n.sibling}function Rg(e,t,n){if(In&&typeof In.onCommitFiberUnmount=="function")try{In.onCommitFiberUnmount(qs,n)}catch{}switch(n.tag){case 5:ot||jo(n,t);case 6:var r=Qe,o=an;Qe=null,ar(e,t,n),Qe=r,an=o,Qe!==null&&(an?(e=Qe,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Qe.removeChild(n.stateNode));break;case 18:Qe!==null&&(an?(e=Qe,n=n.stateNode,e.nodeType===8?Aa(e.parentNode,n):e.nodeType===1&&Aa(e,n),tl(e)):Aa(Qe,n.stateNode));break;case 4:r=Qe,o=an,Qe=n.stateNode.containerInfo,an=!0,ar(e,t,n),Qe=r,an=o;break;case 0:case 11:case 14:case 15:if(!ot&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&((i&2)!==0||(i&4)!==0)&&Nc(n,t,l),o=o.next}while(o!==r)}ar(e,t,n);break;case 1:if(!ot&&(jo(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Ne(n,t,s)}ar(e,t,n);break;case 21:ar(e,t,n);break;case 22:n.mode&1?(ot=(r=ot)||n.memoizedState!==null,ar(e,t,n),ot=r):ar(e,t,n);break;default:ar(e,t,n)}}function Hm(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Ew),t.forEach(function(r){var o=_w.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function sn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:Qe=s.stateNode,an=!1;break e;case 3:Qe=s.stateNode.containerInfo,an=!0;break e;case 4:Qe=s.stateNode.containerInfo,an=!0;break e}s=s.return}if(Qe===null)throw Error(b(160));Rg(i,l,o),Qe=null,an=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(a){Ne(o,t,a)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)_g(t,e),t=t.sibling}function _g(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(sn(t,e),kn(e),r&4){try{Qi(3,e,e.return),su(3,e)}catch(v){Ne(e,e.return,v)}try{Qi(5,e,e.return)}catch(v){Ne(e,e.return,v)}}break;case 1:sn(t,e),kn(e),r&512&&n!==null&&jo(n,n.return);break;case 5:if(sn(t,e),kn(e),r&512&&n!==null&&jo(n,n.return),e.flags&32){var o=e.stateNode;try{Xi(o,"")}catch(v){Ne(e,e.return,v)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&qm(o,i),rc(s,l);var a=rc(s,i);for(l=0;l<u.length;l+=2){var c=u[l],h=u[l+1];c==="style"?oh(o,h):c==="dangerouslySetInnerHTML"?nh(o,h):c==="children"?Xi(o,h):Dc(o,c,h,a)}switch(s){case"input":Ja(o,i);break;case"textarea":eh(o,i);break;case"select":var y=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?Bo(o,!!i.multiple,m,!1):y!==!!i.multiple&&(i.defaultValue!=null?Bo(o,!!i.multiple,i.defaultValue,!0):Bo(o,!!i.multiple,i.multiple?[]:"",!1))}o[ll]=i}catch(v){Ne(e,e.return,v)}}break;case 6:if(sn(t,e),kn(e),r&4){if(e.stateNode===null)throw Error(b(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(v){Ne(e,e.return,v)}}break;case 3:if(sn(t,e),kn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{tl(t.containerInfo)}catch(v){Ne(e,e.return,v)}break;case 4:sn(t,e),kn(e);break;case 13:sn(t,e),kn(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Sf=_e())),r&4&&Hm(e);break;case 22:if(c=n!==null&&n.memoizedState!==null,e.mode&1?(ot=(a=ot)||c,sn(t,e),ot=a):sn(t,e),kn(e),r&8192){if(a=e.memoizedState!==null,(e.stateNode.isHidden=a)&&!c&&(e.mode&1)!==0)for(O=e,c=e.child;c!==null;){for(h=O=c;O!==null;){switch(y=O,m=y.child,y.tag){case 0:case 11:case 14:case 15:Qi(4,y,y.return);break;case 1:jo(y,y.return);var d=y.stateNode;if(typeof d.componentWillUnmount=="function"){r=y,n=y.return;try{t=r,d.props=t.memoizedProps,d.state=t.memoizedState,d.componentWillUnmount()}catch(v){Ne(r,n,v)}}break;case 5:jo(y,y.return);break;case 22:if(y.memoizedState!==null){Dm(h);continue}}m!==null?(m.return=y,O=m):Dm(h)}c=c.sibling}e:for(c=null,h=e;;){if(h.tag===5){if(c===null){c=h;try{o=h.stateNode,a?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=h.stateNode,u=h.memoizedProps.style,l=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=rh("display",l))}catch(v){Ne(e,e.return,v)}}}else if(h.tag===6){if(c===null)try{h.stateNode.nodeValue=a?"":h.memoizedProps}catch(v){Ne(e,e.return,v)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;c===h&&(c=null),h=h.return}c===h&&(c=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:sn(t,e),kn(e),r&4&&Hm(e);break;case 21:break;default:sn(t,e),kn(e)}}function kn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ng(n)){var r=n;break e}n=n.return}throw Error(b(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Xi(o,""),r.flags&=-33);var i=Fm(e);Pc(e,i,o);break;case 3:case 4:var l=r.stateNode.containerInfo,s=Fm(e);_c(e,s,l);break;default:throw Error(b(161))}}catch(u){Ne(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Cw(e,t,n){O=e,Pg(e,t,n)}function Pg(e,t,n){for(var r=(e.mode&1)!==0;O!==null;){var o=O,i=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||vs;if(!l){var s=o.alternate,u=s!==null&&s.memoizedState!==null||ot;s=vs;var a=ot;if(vs=l,(ot=u)&&!a)for(O=o;O!==null;)l=O,u=l.child,l.tag===22&&l.memoizedState!==null?Bm(o):u!==null?(u.return=l,O=u):Bm(o);for(;i!==null;)O=i,Pg(i,t,n),i=i.sibling;O=o,vs=s,ot=a}jm(e,t,n)}else(o.subtreeFlags&8772)!==0&&i!==null?(i.return=o,O=i):jm(e,t,n)}}function jm(e){for(;O!==null;){var t=O;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:ot||su(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ot)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:un(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Em(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Em(t,l,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var a=t.alternate;if(a!==null){var c=a.memoizedState;if(c!==null){var h=c.dehydrated;h!==null&&tl(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(b(163))}ot||t.flags&512&&Rc(t)}catch(y){Ne(t,t.return,y)}}if(t===e){O=null;break}if(n=t.sibling,n!==null){n.return=t.return,O=n;break}O=t.return}}function Dm(e){for(;O!==null;){var t=O;if(t===e){O=null;break}var n=t.sibling;if(n!==null){n.return=t.return,O=n;break}O=t.return}}function Bm(e){for(;O!==null;){var t=O;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{su(4,t)}catch(u){Ne(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(u){Ne(t,o,u)}}var i=t.return;try{Rc(t)}catch(u){Ne(t,i,u)}break;case 5:var l=t.return;try{Rc(t)}catch(u){Ne(t,l,u)}}}catch(u){Ne(t,t.return,u)}if(t===e){O=null;break}var s=t.sibling;if(s!==null){s.return=t.return,O=s;break}O=t.return}}var Tw=Math.ceil,Ks=Yn.ReactCurrentDispatcher,yf=Yn.ReactCurrentOwner,Qt=Yn.ReactCurrentBatchConfig,ne=0,Ue=null,Ae=null,Ke=0,Rt=0,Do=br(0),De=0,dl=null,no=0,uu=0,wf=0,Ki=null,yt=null,Sf=0,qo=1/0,Bn=null,Zs=!1,Oc=null,xr=null,ys=!1,hr=null,Ys=0,Zi=0,zc=null,Is=-1,bs=0;function dt(){return(ne&6)!==0?_e():Is!==-1?Is:Is=_e()}function Er(e){return(e.mode&1)===0?1:(ne&2)!==0&&Ke!==0?Ke&-Ke:uw.transition!==null?(bs===0&&(bs=gh()),bs):(e=ce,e!==0||(e=window.event,e=e===void 0?16:kh(e.type)),e)}function dn(e,t,n,r){if(50<Zi)throw Zi=0,zc=null,Error(b(185));pl(e,n,r),((ne&2)===0||e!==Ue)&&(e===Ue&&((ne&2)===0&&(uu|=n),De===4&&pr(e,Ke)),Et(e,r),n===1&&ne===0&&(t.mode&1)===0&&(qo=_e()+500,ou&&Mr()))}function Et(e,t){var n=e.callbackNode;c1(e,t);var r=Ps(e,e===Ue?Ke:0);if(r===0)n!==null&&Zp(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Zp(n),t===1)e.tag===0?sw(Um.bind(null,e)):Uh(Um.bind(null,e)),rw(function(){(ne&6)===0&&Mr()}),n=null;else{switch(vh(r)){case 1:n=$c;break;case 4:n=mh;break;case 16:n=_s;break;case 536870912:n=hh;break;default:n=_s}n=Bg(n,Og.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Og(e,t){if(Is=-1,bs=0,(ne&6)!==0)throw Error(b(327));var n=e.callbackNode;if(Go()&&e.callbackNode!==n)return null;var r=Ps(e,e===Ue?Ke:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=Xs(e,r);else{t=r;var o=ne;ne|=2;var i=Ag();(Ue!==e||Ke!==t)&&(Bn=null,qo=_e()+500,Xr(e,t));do try{Mw();break}catch(s){zg(e,s)}while(1);of(),Ks.current=i,ne=o,Ae!==null?t=0:(Ue=null,Ke=0,t=De)}if(t!==0){if(t===2&&(o=uc(e),o!==0&&(r=o,t=Ac(e,o))),t===1)throw n=dl,Xr(e,0),pr(e,r),Et(e,_e()),n;if(t===6)pr(e,r);else{if(o=e.current.alternate,(r&30)===0&&!Iw(o)&&(t=Xs(e,r),t===2&&(i=uc(e),i!==0&&(r=i,t=Ac(e,i))),t===1))throw n=dl,Xr(e,0),pr(e,r),Et(e,_e()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(b(345));case 2:Qr(e,yt,Bn);break;case 3:if(pr(e,r),(r&130023424)===r&&(t=Sf+500-_e(),10<t)){if(Ps(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){dt(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=gc(Qr.bind(null,e,yt,Bn),t);break}Qr(e,yt,Bn);break;case 4:if(pr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-fn(r);i=1<<l,l=t[l],l>o&&(o=l),r&=~i}if(r=o,r=_e()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Tw(r/1960))-r,10<r){e.timeoutHandle=gc(Qr.bind(null,e,yt,Bn),r);break}Qr(e,yt,Bn);break;case 5:Qr(e,yt,Bn);break;default:throw Error(b(329))}}}return Et(e,_e()),e.callbackNode===n?Og.bind(null,e):null}function Ac(e,t){var n=Ki;return e.current.memoizedState.isDehydrated&&(Xr(e,t).flags|=256),e=Xs(e,t),e!==2&&(t=yt,yt=n,t!==null&&Fc(t)),e}function Fc(e){yt===null?yt=e:yt.push.apply(yt,e)}function Iw(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!pn(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function pr(e,t){for(t&=~wf,t&=~uu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-fn(t),r=1<<n;e[n]=-1,t&=~r}}function Um(e){if((ne&6)!==0)throw Error(b(327));Go();var t=Ps(e,0);if((t&1)===0)return Et(e,_e()),null;var n=Xs(e,t);if(e.tag!==0&&n===2){var r=uc(e);r!==0&&(t=r,n=Ac(e,r))}if(n===1)throw n=dl,Xr(e,0),pr(e,t),Et(e,_e()),n;if(n===6)throw Error(b(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Qr(e,yt,Bn),Et(e,_e()),null}function xf(e,t){var n=ne;ne|=1;try{return e(t)}finally{ne=n,ne===0&&(qo=_e()+500,ou&&Mr())}}function ro(e){hr!==null&&hr.tag===0&&(ne&6)===0&&Go();var t=ne;ne|=1;var n=Qt.transition,r=ce;try{if(Qt.transition=null,ce=1,e)return e()}finally{ce=r,Qt.transition=n,ne=t,(ne&6)===0&&Mr()}}function Ef(){Rt=Do.current,we(Do)}function Xr(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,nw(n)),Ae!==null)for(n=Ae.return;n!==null;){var r=n;switch(tf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Hs();break;case 3:Xo(),we(St),we(it),ff();break;case 5:cf(r);break;case 4:Xo();break;case 13:we(Ie);break;case 19:we(Ie);break;case 10:lf(r.type._context);break;case 22:case 23:Ef()}n=n.return}if(Ue=e,Ae=e=kr(e.current,null),Ke=Rt=t,De=0,dl=null,wf=uu=no=0,yt=Ki=null,Zr!==null){for(t=0;t<Zr.length;t++)if(n=Zr[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=o,r.next=l}n.pending=r}Zr=null}return e}function zg(e,t){do{var n=Ae;try{if(of(),ks.current=Qs,Gs){for(var r=be.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Gs=!1}if(to=0,Be=je=be=null,Gi=!1,al=0,yf.current=null,n===null||n.return===null){De=1,dl=t,Ae=null;break}e:{var i=e,l=n.return,s=n,u=t;if(t=Ke,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var a=u,c=s,h=c.tag;if((c.mode&1)===0&&(h===0||h===11||h===15)){var y=c.alternate;y?(c.updateQueue=y.updateQueue,c.memoizedState=y.memoizedState,c.lanes=y.lanes):(c.updateQueue=null,c.memoizedState=null)}var m=Lm(l);if(m!==null){m.flags&=-257,Nm(m,l,s,i,t),m.mode&1&&Mm(i,a,t),t=m,u=a;var d=t.updateQueue;if(d===null){var v=new Set;v.add(u),t.updateQueue=v}else d.add(u);break e}else{if((t&1)===0){Mm(i,a,t),kf();break e}u=Error(b(426))}}else if(ke&&s.mode&1){var E=Lm(l);if(E!==null){(E.flags&65536)===0&&(E.flags|=256),Nm(E,l,s,i,t),nf(Jo(u,s));break e}}i=u=Jo(u,s),De!==4&&(De=2),Ki===null?Ki=[i]:Ki.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=yg(i,u,t);xm(i,g);break e;case 1:s=u;var p=i.type,f=i.stateNode;if((i.flags&128)===0&&(typeof p.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(xr===null||!xr.has(f)))){i.flags|=65536,t&=-t,i.lanes|=t;var w=wg(i,s,t);xm(i,w);break e}}i=i.return}while(i!==null)}Hg(n)}catch(S){t=S,Ae===n&&n!==null&&(Ae=n=n.return);continue}break}while(1)}function Ag(){var e=Ks.current;return Ks.current=Qs,e===null?Qs:e}function kf(){(De===0||De===3||De===2)&&(De=4),Ue===null||(no&268435455)===0&&(uu&268435455)===0||pr(Ue,Ke)}function Xs(e,t){var n=ne;ne|=2;var r=Ag();(Ue!==e||Ke!==t)&&(Bn=null,Xr(e,t));do try{bw();break}catch(o){zg(e,o)}while(1);if(of(),ne=n,Ks.current=r,Ae!==null)throw Error(b(261));return Ue=null,Ke=0,De}function bw(){for(;Ae!==null;)Fg(Ae)}function Mw(){for(;Ae!==null&&!t1();)Fg(Ae)}function Fg(e){var t=Dg(e.alternate,e,Rt);e.memoizedProps=e.pendingProps,t===null?Hg(e):Ae=t,yf.current=null}function Hg(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Sw(n,t,Rt),n!==null){Ae=n;return}}else{if(n=xw(n,t),n!==null){n.flags&=32767,Ae=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{De=6,Ae=null;return}}if(t=t.sibling,t!==null){Ae=t;return}Ae=t=e}while(t!==null);De===0&&(De=5)}function Qr(e,t,n){var r=ce,o=Qt.transition;try{Qt.transition=null,ce=1,Lw(e,t,n,r)}finally{Qt.transition=o,ce=r}return null}function Lw(e,t,n,r){do Go();while(hr!==null);if((ne&6)!==0)throw Error(b(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(b(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(f1(e,i),e===Ue&&(Ae=Ue=null,Ke=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||ys||(ys=!0,Bg(_s,function(){return Go(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=Qt.transition,Qt.transition=null;var l=ce;ce=1;var s=ne;ne|=4,yf.current=null,kw(e,n),_g(n,e),X1(mc),Os=!!pc,mc=pc=null,e.current=n,Cw(n,e,o),n1(),ne=s,ce=l,Qt.transition=i}else e.current=n;if(ys&&(ys=!1,hr=e,Ys=o),i=e.pendingLanes,i===0&&(xr=null),i1(n.stateNode,r),Et(e,_e()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Zs)throw Zs=!1,e=Oc,Oc=null,e;return(Ys&1)!==0&&e.tag!==0&&Go(),i=e.pendingLanes,(i&1)!==0?e===zc?Zi++:(Zi=0,zc=e):Zi=0,Mr(),null}function Go(){if(hr!==null){var e=vh(Ys),t=Qt.transition,n=ce;try{if(Qt.transition=null,ce=16>e?16:e,hr===null)var r=!1;else{if(e=hr,hr=null,Ys=0,(ne&6)!==0)throw Error(b(331));var o=ne;for(ne|=4,O=e.current;O!==null;){var i=O,l=i.child;if((O.flags&16)!==0){var s=i.deletions;if(s!==null){for(var u=0;u<s.length;u++){var a=s[u];for(O=a;O!==null;){var c=O;switch(c.tag){case 0:case 11:case 15:Qi(8,c,i)}var h=c.child;if(h!==null)h.return=c,O=h;else for(;O!==null;){c=O;var y=c.sibling,m=c.return;if(Lg(c),c===a){O=null;break}if(y!==null){y.return=m,O=y;break}O=m}}}var d=i.alternate;if(d!==null){var v=d.child;if(v!==null){d.child=null;do{var E=v.sibling;v.sibling=null,v=E}while(v!==null)}}O=i}}if((i.subtreeFlags&2064)!==0&&l!==null)l.return=i,O=l;else e:for(;O!==null;){if(i=O,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:Qi(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,O=g;break e}O=i.return}}var p=e.current;for(O=p;O!==null;){l=O;var f=l.child;if((l.subtreeFlags&2064)!==0&&f!==null)f.return=l,O=f;else e:for(l=p;O!==null;){if(s=O,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:su(9,s)}}catch(S){Ne(s,s.return,S)}if(s===l){O=null;break e}var w=s.sibling;if(w!==null){w.return=s.return,O=w;break e}O=s.return}}if(ne=o,Mr(),In&&typeof In.onPostCommitFiberRoot=="function")try{In.onPostCommitFiberRoot(qs,e)}catch{}r=!0}return r}finally{ce=n,Qt.transition=t}}return!1}function Vm(e,t,n){t=Jo(n,t),t=yg(e,t,1),e=Sr(e,t,1),t=dt(),e!==null&&(pl(e,1,t),Et(e,t))}function Ne(e,t,n){if(e.tag===3)Vm(e,e,n);else for(;t!==null;){if(t.tag===3){Vm(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(xr===null||!xr.has(r))){e=Jo(n,e),e=wg(t,e,1),t=Sr(t,e,1),e=dt(),t!==null&&(pl(t,1,e),Et(t,e));break}}t=t.return}}function Nw(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=dt(),e.pingedLanes|=e.suspendedLanes&n,Ue===e&&(Ke&n)===n&&(De===4||De===3&&(Ke&130023424)===Ke&&500>_e()-Sf?Xr(e,0):wf|=n),Et(e,t)}function jg(e,t){t===0&&((e.mode&1)===0?t=1:(t=os,os<<=1,(os&130023424)===0&&(os=4194304)));var n=dt();e=Kn(e,t),e!==null&&(pl(e,t,n),Et(e,n))}function Rw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),jg(e,n)}function _w(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(b(314))}r!==null&&r.delete(t),jg(e,n)}var Dg;Dg=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||St.current)wt=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return wt=!1,ww(e,t,n);wt=(e.flags&131072)!==0}else wt=!1,ke&&(t.flags&1048576)!==0&&Vh(t,Bs,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ts(e,t),e=t.pendingProps;var o=Ko(t,it.current);$o(t,n),o=pf(null,t,r,e,o,n);var i=mf();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,xt(r)?(i=!0,js(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,uf(t),o.updater=iu,t.stateNode=o,o._reactInternals=t,kc(t,r,e,n),t=Ic(null,t,r,!0,i,n)):(t.tag=0,ke&&i&&ef(t),ft(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ts(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=Ow(r),e=un(r,e),o){case 0:t=Tc(null,t,r,e,n);break e;case 1:t=Pm(null,t,r,e,n);break e;case 11:t=Rm(null,t,r,e,n);break e;case 14:t=_m(null,t,r,un(r.type,e),n);break e}throw Error(b(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:un(r,o),Tc(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:un(r,o),Pm(e,t,r,o,n);case 3:e:{if(kg(t),e===null)throw Error(b(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Qh(e,t),Ws(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Jo(Error(b(423)),t),t=Om(e,t,r,n,o);break e}else if(r!==o){o=Jo(Error(b(424)),t),t=Om(e,t,r,n,o);break e}else for(_t=wr(t.stateNode.containerInfo.firstChild),Pt=t,ke=!0,cn=null,n=Xh(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Zo(),r===o){t=Zn(e,t,n);break e}ft(e,t,r,n)}t=t.child}return t;case 5:return Jh(t),e===null&&Sc(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,hc(r,o)?l=null:i!==null&&hc(r,i)&&(t.flags|=32),Eg(e,t),ft(e,t,l,n),t.child;case 6:return e===null&&Sc(t),null;case 13:return Cg(e,t,n);case 4:return af(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Yo(t,null,r,n):ft(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:un(r,o),Rm(e,t,r,o,n);case 7:return ft(e,t,t.pendingProps,n),t.child;case 8:return ft(e,t,t.pendingProps.children,n),t.child;case 12:return ft(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,ve(Us,r._currentValue),r._currentValue=l,i!==null)if(pn(i.value,l)){if(i.children===o.children&&!St.current){t=Zn(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){l=i.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=$n(-1,n&-n),u.tag=2;var a=i.updateQueue;if(a!==null){a=a.shared;var c=a.pending;c===null?u.next=u:(u.next=c.next,c.next=u),a.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),xc(i.return,n,t),s.lanes|=n;break}u=u.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(b(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),xc(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}ft(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,$o(t,n),o=Kt(o),r=r(o),t.flags|=1,ft(e,t,r,n),t.child;case 14:return r=t.type,o=un(r,t.pendingProps),o=un(r.type,o),_m(e,t,r,o,n);case 15:return Sg(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:un(r,o),Ts(e,t),t.tag=1,xt(r)?(e=!0,js(t)):e=!1,$o(t,n),Zh(t,r,o),kc(t,r,o,n),Ic(null,t,r,!0,e,n);case 19:return Tg(e,t,n);case 22:return xg(e,t,n)}throw Error(b(156,t.tag))};function Bg(e,t){return ph(e,t)}function Pw(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Gt(e,t,n,r){return new Pw(e,t,n,r)}function Cf(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ow(e){if(typeof e=="function")return Cf(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Uc)return 11;if(e===Vc)return 14}return 2}function kr(e,t){var n=e.alternate;return n===null?(n=Gt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ms(e,t,n,r,o,i){var l=2;if(r=e,typeof e=="function")Cf(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case No:return Jr(n.children,o,i,t);case Bc:l=8,o|=8;break;case Qa:return e=Gt(12,n,t,o|2),e.elementType=Qa,e.lanes=i,e;case Ka:return e=Gt(13,n,t,o),e.elementType=Ka,e.lanes=i,e;case Za:return e=Gt(19,n,t,o),e.elementType=Za,e.lanes=i,e;case Ym:return au(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Km:l=10;break e;case Zm:l=9;break e;case Uc:l=11;break e;case Vc:l=14;break e;case cr:l=16,r=null;break e}throw Error(b(130,e==null?e:typeof e,""))}return t=Gt(l,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function Jr(e,t,n,r){return e=Gt(7,e,r,t),e.lanes=n,e}function au(e,t,n,r){return e=Gt(22,e,r,t),e.elementType=Ym,e.lanes=n,e.stateNode={isHidden:!1},e}function Wa(e,t,n){return e=Gt(6,e,null,t),e.lanes=n,e}function $a(e,t,n){return t=Gt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zw(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ma(0),this.expirationTimes=Ma(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ma(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Tf(e,t,n,r,o,i,l,s,u){return e=new zw(e,t,n,s,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Gt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},uf(i),e}function Aw(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Lo,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Ug(e){if(!e)return Tr;e=e._reactInternals;e:{if(io(e)!==e||e.tag!==1)throw Error(b(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(xt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(b(171))}if(e.tag===1){var n=e.type;if(xt(n))return Bh(e,n,t)}return t}function Vg(e,t,n,r,o,i,l,s,u){return e=Tf(n,r,!0,e,o,i,l,s,u),e.context=Ug(null),n=e.current,r=dt(),o=Er(n),i=$n(r,o),i.callback=t??null,Sr(n,i,o),e.current.lanes=o,pl(e,o,r),Et(e,r),e}function cu(e,t,n,r){var o=t.current,i=dt(),l=Er(o);return n=Ug(n),t.context===null?t.context=n:t.pendingContext=n,t=$n(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Sr(o,t,l),e!==null&&(dn(e,o,l,i),Es(e,o,l)),l}function Js(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Wm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function If(e,t){Wm(e,t),(e=e.alternate)&&Wm(e,t)}function Fw(){return null}var Wg=typeof reportError=="function"?reportError:function(e){console.error(e)};function bf(e){this._internalRoot=e}fu.prototype.render=bf.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(b(409));cu(e,t,null,null)};fu.prototype.unmount=bf.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ro(function(){cu(null,e,null,null)}),t[Qn]=null}};function fu(e){this._internalRoot=e}fu.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sh();e={blockedOn:null,target:e,priority:t};for(var n=0;n<dr.length&&t!==0&&t<dr[n].priority;n++);dr.splice(n,0,e),n===0&&Eh(e)}};function Mf(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function du(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function $m(){}function Hw(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var a=Js(l);i.call(a)}}var l=Vg(t,r,e,0,null,!1,!1,"",$m);return e._reactRootContainer=l,e[Qn]=l.current,ol(e.nodeType===8?e.parentNode:e),ro(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var a=Js(u);s.call(a)}}var u=Tf(e,0,!1,null,null,!1,!1,"",$m);return e._reactRootContainer=u,e[Qn]=u.current,ol(e.nodeType===8?e.parentNode:e),ro(function(){cu(t,u,n,r)}),u}function pu(e,t,n,r,o){var i=n._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var s=o;o=function(){var u=Js(l);s.call(u)}}cu(t,l,e,o)}else l=Hw(n,t,e,o,r);return Js(l)}yh=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ji(t.pendingLanes);n!==0&&(Gc(t,n|1),Et(t,_e()),(ne&6)===0&&(qo=_e()+500,Mr()))}break;case 13:ro(function(){var r=Kn(e,1);if(r!==null){var o=dt();dn(r,e,1,o)}}),If(e,1)}};Qc=function(e){if(e.tag===13){var t=Kn(e,134217728);if(t!==null){var n=dt();dn(t,e,134217728,n)}If(e,134217728)}};wh=function(e){if(e.tag===13){var t=Er(e),n=Kn(e,t);if(n!==null){var r=dt();dn(n,e,t,r)}If(e,t)}};Sh=function(){return ce};xh=function(e,t){var n=ce;try{return ce=e,t()}finally{ce=n}};ic=function(e,t,n){switch(t){case"input":if(Ja(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+\'][type="radio"]\'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=ru(r);if(!o)throw Error(b(90));Jm(r),Ja(r,o)}}}break;case"textarea":eh(e,n);break;case"select":t=n.value,t!=null&&Bo(e,!!n.multiple,t,!1)}};sh=xf;uh=ro;var jw={usingClientEntryPoint:!1,Events:[hl,Oo,ru,ih,lh,xf]},zi={findFiberByHostInstance:Kr,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},Dw={bundleType:zi.bundleType,version:zi.version,rendererPackageName:zi.rendererPackageName,rendererConfig:zi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fh(e),e===null?null:e.stateNode},findFiberByHostInstance:zi.findFiberByHostInstance||Fw,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Ai=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Ai.isDisabled&&Ai.supportsFiber))try{qs=Ai.inject(Dw),In=Ai}catch{}var Ai;At.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jw;At.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Mf(t))throw Error(b(200));return Aw(e,t,null,n)};At.createRoot=function(e,t){if(!Mf(e))throw Error(b(299));var n=!1,r="",o=Wg;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Tf(e,1,!1,null,null,n,!1,r,o),e[Qn]=t.current,ol(e.nodeType===8?e.parentNode:e),new bf(t)};At.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(b(188)):(e=Object.keys(e).join(","),Error(b(268,e)));return e=fh(t),e=e===null?null:e.stateNode,e};At.flushSync=function(e){return ro(e)};At.hydrate=function(e,t,n){if(!du(t))throw Error(b(200));return pu(null,e,t,!0,n)};At.hydrateRoot=function(e,t,n){if(!Mf(e))throw Error(b(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",l=Wg;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=Vg(t,null,e,1,n??null,o,!1,i,l),e[Qn]=t.current,ol(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new fu(t)};At.render=function(e,t,n){if(!du(t))throw Error(b(200));return pu(null,e,t,!1,n)};At.unmountComponentAtNode=function(e){if(!du(e))throw Error(b(40));return e._reactRootContainer?(ro(function(){pu(null,null,e,!1,function(){e._reactRootContainer=null,e[Qn]=null})}),!0):!1};At.unstable_batchedUpdates=xf;At.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!du(n))throw Error(b(200));if(e==null||e._reactInternals===void 0)throw Error(b(38));return pu(e,t,n,!1,r)};At.version="18.2.0-next-9e3b772b8-20220608"});var Lf=en((LE,Qg)=>{"use strict";function Gg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Gg)}catch(e){console.error(e)}}Gg(),Qg.exports=$g()});var bv=en((fT,Iv)=>{var Zf={exports:{}};function Yf(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];typeof n=="object"&&!Object.isFrozen(n)&&Yf(n)}),e}Zf.exports=Yf;Zf.exports.default=Yf;var Cu=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function gv(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\'/g,"&#x27;")}function Rr(e,...t){let n=Object.create(null);for(let r in e)n[r]=e[r];return t.forEach(function(r){for(let o in r)n[o]=r[o]}),n}var Jw="</span>",cv=e=>!!e.scope||e.sublanguage&&e.language,qw=(e,{prefix:t})=>{if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,o)=>`${r}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`},Gf=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=gv(t)}openNode(t){if(!cv(t))return;let n="";t.sublanguage?n=`language-${t.language}`:n=qw(t.scope,{prefix:this.classPrefix}),this.span(n)}closeNode(t){!cv(t)||(this.buffer+=Jw)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},fv=(e={})=>{let t={children:[]};return Object.assign(t,e),t},xl=class{constructor(){this.rootNode=fv(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=fv({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&(!t.children||(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{xl._collapse(n)})))}},Qf=class extends xl{constructor(t){super(),this.options=t}addKeyword(t,n){t!==""&&(this.openNode(n),this.addText(t),this.closeNode())}addText(t){t!==""&&this.add(t)}addSublanguage(t,n){let r=t.root;r.sublanguage=!0,r.language=n,this.add(r)}toHTML(){return new Gf(this,this.options).value()}finalize(){return!0}};function El(e){return e?typeof e=="string"?e:e.source:null}function vv(e){return uo("(?=",e,")")}function eS(e){return uo("(?:",e,")*")}function tS(e){return uo("(?:",e,")?")}function uo(...e){return e.map(n=>El(n)).join("")}function nS(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Xf(...e){let t=nS(e);return"("+(t.capture?"":"?:")+e.map(r=>El(r)).join("|")+")"}function yv(e){return new RegExp(e.toString()+"|").exec("").length-1}function rS(e,t){let n=e&&e.exec(t);return n&&n.index===0}var oS=/\\[(?:[^\\\\\\]]|\\\\.)*\\]|\\(\\??|\\\\([1-9][0-9]*)|\\\\./;function Jf(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;let o=n,i=El(r),l="";for(;i.length>0;){let s=oS.exec(i);if(!s){l+=i;break}l+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\\\"&&s[1]?l+="\\\\"+String(Number(s[1])+o):(l+=s[0],s[0]==="("&&n++)}return l}).map(r=>`(${r})`).join(t)}var iS=/\\b\\B/,wv="[a-zA-Z]\\\\w*",qf="[a-zA-Z_]\\\\w*",Sv="\\\\b\\\\d+(\\\\.\\\\d+)?",xv="(-?)(\\\\b0[xX][a-fA-F0-9]+|(\\\\b\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)([eE][-+]?\\\\d+)?)",Ev="\\\\b(0b[01]+)",lS="!|!=|!==|%|%=|&|&&|&=|\\\\*|\\\\*=|\\\\+|\\\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\\\?|\\\\[|\\\\{|\\\\(|\\\\^|\\\\^=|\\\\||\\\\|=|\\\\|\\\\||~",sS=(e={})=>{let t=/^#![ ]*\\//;return e.binary&&(e.begin=uo(t,/.*\\b/,e.binary,/\\b.*/)),Rr({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},kl={begin:"\\\\\\\\[\\\\s\\\\S]",relevance:0},uS={scope:"string",begin:"\'",end:"\'",illegal:"\\\\n",contains:[kl]},aS={scope:"string",begin:\'"\',end:\'"\',illegal:"\\\\n",contains:[kl]},cS={begin:/\\b(a|an|the|are|I\'m|isn\'t|don\'t|doesn\'t|won\'t|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\\b/},Iu=function(e,t,n={}){let r=Rr({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let o=Xf("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+[\'](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:uo(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},fS=Iu("//","$"),dS=Iu("/\\\\*","\\\\*/"),pS=Iu("#","$"),mS={scope:"number",begin:Sv,relevance:0},hS={scope:"number",begin:xv,relevance:0},gS={scope:"number",begin:Ev,relevance:0},vS={begin:/(?=\\/[^/\\n]*\\/)/,contains:[{scope:"regexp",begin:/\\//,end:/\\/[gimuy]*/,illegal:/\\n/,contains:[kl,{begin:/\\[/,end:/\\]/,relevance:0,contains:[kl]}]}]},yS={scope:"title",begin:wv,relevance:0},wS={scope:"title",begin:qf,relevance:0},SS={begin:"\\\\.\\\\s*"+qf,relevance:0},xS=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},ku=Object.freeze({__proto__:null,MATCH_NOTHING_RE:iS,IDENT_RE:wv,UNDERSCORE_IDENT_RE:qf,NUMBER_RE:Sv,C_NUMBER_RE:xv,BINARY_NUMBER_RE:Ev,RE_STARTERS_RE:lS,SHEBANG:sS,BACKSLASH_ESCAPE:kl,APOS_STRING_MODE:uS,QUOTE_STRING_MODE:aS,PHRASAL_WORDS_MODE:cS,COMMENT:Iu,C_LINE_COMMENT_MODE:fS,C_BLOCK_COMMENT_MODE:dS,HASH_COMMENT_MODE:pS,NUMBER_MODE:mS,C_NUMBER_MODE:hS,BINARY_NUMBER_MODE:gS,REGEXP_MODE:vS,TITLE_MODE:yS,UNDERSCORE_TITLE_MODE:wS,METHOD_GUARD:SS,END_SAME_AS_BEGIN:xS});function ES(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function kS(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function CS(e,t){!t||!e.beginKeywords||(e.begin="\\\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\\\.)(?=\\\\b|\\\\s)",e.__beforeBegin=ES,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function TS(e,t){!Array.isArray(e.illegal)||(e.illegal=Xf(...e.illegal))}function IS(e,t){if(!!e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function bS(e,t){e.relevance===void 0&&(e.relevance=1)}var MS=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=uo(n.beforeMatch,vv(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},LS=["of","and","for","in","not","or","if","then","parent","list","value"],NS="keyword";function kv(e,t,n=NS){let r=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(i){Object.assign(r,kv(e[i],t,i))}),r;function o(i,l){t&&(l=l.map(s=>s.toLowerCase())),l.forEach(function(s){let u=s.split("|");r[u[0]]=[i,RS(u[0],u[1])]})}}function RS(e,t){return t?Number(t):_S(e)?0:1}function _S(e){return LS.includes(e.toLowerCase())}var dv={},so=e=>{console.error(e)},pv=(e,...t)=>{console.log(`WARN: ${e}`,...t)},si=(e,t)=>{dv[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),dv[`${e}/${t}`]=!0)},Tu=new Error;function Cv(e,t,{key:n}){let r=0,o=e[n],i={},l={};for(let s=1;s<=t.length;s++)l[s+r]=o[s],i[s+r]=!0,r+=yv(t[s-1]);e[n]=l,e[n]._emit=i,e[n]._multi=!0}function PS(e){if(!!Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw so("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Tu;if(typeof e.beginScope!="object"||e.beginScope===null)throw so("beginScope must be object"),Tu;Cv(e,e.begin,{key:"beginScope"}),e.begin=Jf(e.begin,{joinWith:""})}}function OS(e){if(!!Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw so("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Tu;if(typeof e.endScope!="object"||e.endScope===null)throw so("endScope must be object"),Tu;Cv(e,e.end,{key:"endScope"}),e.end=Jf(e.end,{joinWith:""})}}function zS(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function AS(e){zS(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),PS(e),OS(e)}function FS(e){function t(l,s){return new RegExp(El(l),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,u){u.position=this.position++,this.matchIndexes[this.matchAt]=u,this.regexes.push([u,s]),this.matchAt+=yv(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let s=this.regexes.map(u=>u[1]);this.matcherRe=t(Jf(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;let u=this.matcherRe.exec(s);if(!u)return null;let a=u.findIndex((h,y)=>y>0&&h!==void 0),c=this.matchIndexes[a];return u.splice(0,a),Object.assign(u,c)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];let u=new n;return this.rules.slice(s).forEach(([a,c])=>u.addRule(a,c)),u.compile(),this.multiRegexes[s]=u,u}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,u){this.rules.push([s,u]),u.type==="begin"&&this.count++}exec(s){let u=this.getMatcher(this.regexIndex);u.lastIndex=this.lastIndex;let a=u.exec(s);if(this.resumingScanAtSamePosition()&&!(a&&a.index===this.lastIndex)){let c=this.getMatcher(0);c.lastIndex=this.lastIndex+1,a=c.exec(s)}return a&&(this.regexIndex+=a.position+1,this.regexIndex===this.count&&this.considerAll()),a}}function o(l){let s=new r;return l.contains.forEach(u=>s.addRule(u.begin,{rule:u,type:"begin"})),l.terminatorEnd&&s.addRule(l.terminatorEnd,{type:"end"}),l.illegal&&s.addRule(l.illegal,{type:"illegal"}),s}function i(l,s){let u=l;if(l.isCompiled)return u;[kS,IS,AS,MS].forEach(c=>c(l,s)),e.compilerExtensions.forEach(c=>c(l,s)),l.__beforeBegin=null,[CS,TS,bS].forEach(c=>c(l,s)),l.isCompiled=!0;let a=null;return typeof l.keywords=="object"&&l.keywords.$pattern&&(l.keywords=Object.assign({},l.keywords),a=l.keywords.$pattern,delete l.keywords.$pattern),a=a||/\\w+/,l.keywords&&(l.keywords=kv(l.keywords,e.case_insensitive)),u.keywordPatternRe=t(a,!0),s&&(l.begin||(l.begin=/\\B|\\b/),u.beginRe=t(u.begin),!l.end&&!l.endsWithParent&&(l.end=/\\B|\\b/),l.end&&(u.endRe=t(u.end)),u.terminatorEnd=El(u.end)||"",l.endsWithParent&&s.terminatorEnd&&(u.terminatorEnd+=(l.end?"|":"")+s.terminatorEnd)),l.illegal&&(u.illegalRe=t(l.illegal)),l.contains||(l.contains=[]),l.contains=[].concat(...l.contains.map(function(c){return HS(c==="self"?l:c)})),l.contains.forEach(function(c){i(c,u)}),l.starts&&i(l.starts,s),u.matcher=o(u),u}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Rr(e.classNameAliases||{}),i(e)}function Tv(e){return e?e.endsWithParent||Tv(e.starts):!1}function HS(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Rr(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Tv(e)?Rr(e,{starts:e.starts?Rr(e.starts):null}):Object.isFrozen(e)?Rr(e):e}var jS="11.7.0",Kf=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},$f=gv,mv=Rr,hv=Symbol("nomatch"),DS=7,BS=function(e){let t=Object.create(null),n=Object.create(null),r=[],o=!0,i="Could not find the language \'{}\', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]},s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\\blang(?:uage)?-([\\w-]+)\\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Qf};function u(T){return s.noHighlightRe.test(T)}function a(T){let P=T.className+" ";P+=T.parentNode?T.parentNode.className:"";let W=s.languageDetectRe.exec(P);if(W){let Y=I(W[1]);return Y||(pv(i.replace("{}",W[1])),pv("Falling back to no-highlight mode for this block.",T)),Y?W[1]:"no-highlight"}return P.split(/\\s+/).find(Y=>u(Y)||I(Y))}function c(T,P,W){let Y="",de="";typeof P=="object"?(Y=T,W=P.ignoreIllegals,de=P.language):(si("10.7.0","highlight(lang, code, ...args) has been deprecated."),si("10.7.0",`Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277`),de=T,Y=P),W===void 0&&(W=!0);let Oe={code:Y,language:de};pe("before:highlight",Oe);let We=Oe.result?Oe.result:h(Oe.language,Oe.code,W);return We.code=Oe.code,pe("after:highlight",We),We}function h(T,P,W,Y){let de=Object.create(null);function Oe(N,H){return N.keywords[H]}function We(){if(!A.keywords){ie.addText(X);return}let N=0;A.keywordPatternRe.lastIndex=0;let H=A.keywordPatternRe.exec(X),Q="";for(;H;){Q+=X.substring(N,H.index);let ae=te.case_insensitive?H[0].toLowerCase():H[0],et=Oe(A,ae);if(et){let[Hn,N0]=et;if(ie.addText(Q),Q="",de[ae]=(de[ae]||0)+1,de[ae]<=DS&&(He+=N0),Hn.startsWith("_"))Q+=H[0];else{let R0=te.classNameAliases[Hn]||Hn;ie.addKeyword(H[0],R0)}}else Q+=H[0];N=A.keywordPatternRe.lastIndex,H=A.keywordPatternRe.exec(X)}Q+=X.substring(N),ie.addText(Q)}function Ft(){if(X==="")return;let N=null;if(typeof A.subLanguage=="string"){if(!t[A.subLanguage]){ie.addText(X);return}N=h(A.subLanguage,X,!0,vt[A.subLanguage]),vt[A.subLanguage]=N._top}else N=m(X,A.subLanguage.length?A.subLanguage:null);A.relevance>0&&(He+=N.relevance),ie.addSublanguage(N._emitter,N.language)}function _(){A.subLanguage!=null?Ft():We(),X=""}function $(N,H){let Q=1,ae=H.length-1;for(;Q<=ae;){if(!N._emit[Q]){Q++;continue}let et=te.classNameAliases[N[Q]]||N[Q],Hn=H[Q];et?ie.addKeyword(Hn,et):(X=Hn,We(),X=""),Q++}}function $e(N,H){return N.scope&&typeof N.scope=="string"&&ie.openNode(te.classNameAliases[N.scope]||N.scope),N.beginScope&&(N.beginScope._wrap?(ie.addKeyword(X,te.classNameAliases[N.beginScope._wrap]||N.beginScope._wrap),X=""):N.beginScope._multi&&($(N.beginScope,H),X="")),A=Object.create(N,{parent:{value:A}}),A}function st(N,H,Q){let ae=rS(N.endRe,Q);if(ae){if(N["on:end"]){let et=new Cu(N);N["on:end"](H,et),et.isMatchIgnored&&(ae=!1)}if(ae){for(;N.endsParent&&N.parent;)N=N.parent;return N}}if(N.endsWithParent)return st(N.parent,H,Q)}function gt(N){return A.matcher.regexIndex===0?(X+=N[0],1):(qt=!0,0)}function Ht(N){let H=N[0],Q=N.rule,ae=new Cu(Q),et=[Q.__beforeBegin,Q["on:begin"]];for(let Hn of et)if(!!Hn&&(Hn(N,ae),ae.isMatchIgnored))return gt(H);return Q.skip?X+=H:(Q.excludeBegin&&(X+=H),_(),!Q.returnBegin&&!Q.excludeBegin&&(X=H)),$e(Q,N),Q.returnBegin?0:H.length}function ut(N){let H=N[0],Q=P.substring(N.index),ae=st(A,N,Q);if(!ae)return hv;let et=A;A.endScope&&A.endScope._wrap?(_(),ie.addKeyword(H,A.endScope._wrap)):A.endScope&&A.endScope._multi?(_(),$(A.endScope,N)):et.skip?X+=H:(et.returnEnd||et.excludeEnd||(X+=H),_(),et.excludeEnd&&(X=H));do A.scope&&ie.closeNode(),!A.skip&&!A.subLanguage&&(He+=A.relevance),A=A.parent;while(A!==ae.parent);return ae.starts&&$e(ae.starts,N),et.returnEnd?0:H.length}function jt(){let N=[];for(let H=A;H!==te;H=H.parent)H.scope&&N.unshift(H.scope);N.forEach(H=>ie.openNode(H))}let It={};function bt(N,H){let Q=H&&H[0];if(X+=N,Q==null)return _(),0;if(It.type==="begin"&&H.type==="end"&&It.index===H.index&&Q===""){if(X+=P.slice(H.index,H.index+1),!o){let ae=new Error(`0 width match regex (${T})`);throw ae.languageName=T,ae.badRule=It.rule,ae}return 1}if(It=H,H.type==="begin")return Ht(H);if(H.type==="illegal"&&!W){let ae=new Error(\'Illegal lexeme "\'+Q+\'" for mode "\'+(A.scope||"<unnamed>")+\'"\');throw ae.mode=A,ae}else if(H.type==="end"){let ae=ut(H);if(ae!==hv)return ae}if(H.type==="illegal"&&Q==="")return 1;if(rr>1e5&&rr>H.index*3)throw new Error("potential infinite loop, way more iterations than matches");return X+=Q,Q.length}let te=I(T);if(!te)throw so(i.replace("{}",T)),new Error(\'Unknown language: "\'+T+\'"\');let Je=FS(te),Ge="",A=Y||Je,vt={},ie=new s.__emitter(s);jt();let X="",He=0,qe=0,rr=0,qt=!1;try{for(A.matcher.considerAll();;){rr++,qt?qt=!1:A.matcher.considerAll(),A.matcher.lastIndex=qe;let N=A.matcher.exec(P);if(!N)break;let H=P.substring(qe,N.index),Q=bt(H,N);qe=N.index+Q}return bt(P.substring(qe)),ie.closeAllNodes(),ie.finalize(),Ge=ie.toHTML(),{language:T,value:Ge,relevance:He,illegal:!1,_emitter:ie,_top:A}}catch(N){if(N.message&&N.message.includes("Illegal"))return{language:T,value:$f(P),illegal:!0,relevance:0,_illegalBy:{message:N.message,index:qe,context:P.slice(qe-100,qe+100),mode:N.mode,resultSoFar:Ge},_emitter:ie};if(o)return{language:T,value:$f(P),illegal:!1,relevance:0,errorRaised:N,_emitter:ie,_top:A};throw N}}function y(T){let P={value:$f(T),illegal:!1,relevance:0,_top:l,_emitter:new s.__emitter(s)};return P._emitter.addText(T),P}function m(T,P){P=P||s.languages||Object.keys(t);let W=y(T),Y=P.filter(I).filter(B).map(_=>h(_,T,!1));Y.unshift(W);let de=Y.sort((_,$)=>{if(_.relevance!==$.relevance)return $.relevance-_.relevance;if(_.language&&$.language){if(I(_.language).supersetOf===$.language)return 1;if(I($.language).supersetOf===_.language)return-1}return 0}),[Oe,We]=de,Ft=Oe;return Ft.secondBest=We,Ft}function d(T,P,W){let Y=P&&n[P]||W;T.classList.add("hljs"),T.classList.add(`language-${Y}`)}function v(T){let P=null,W=a(T);if(u(W))return;if(pe("before:highlightElement",{el:T,language:W}),T.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(T)),s.throwUnescapedHTML))throw new Kf("One of your code blocks includes unescaped HTML.",T.innerHTML);P=T;let Y=P.textContent,de=W?c(Y,{language:W,ignoreIllegals:!0}):m(Y);T.innerHTML=de.value,d(T,W,de.language),T.result={language:de.language,re:de.relevance,relevance:de.relevance},de.secondBest&&(T.secondBest={language:de.secondBest.language,relevance:de.secondBest.relevance}),pe("after:highlightElement",{el:T,result:de,text:Y})}function E(T){s=mv(s,T)}let g=()=>{w(),si("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function p(){w(),si("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let f=!1;function w(){if(document.readyState==="loading"){f=!0;return}document.querySelectorAll(s.cssSelector).forEach(v)}function S(){f&&w()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",S,!1);function x(T,P){let W=null;try{W=P(e)}catch(Y){if(so("Language definition for \'{}\' could not be registered.".replace("{}",T)),o)so(Y);else throw Y;W=l}W.name||(W.name=T),t[T]=W,W.rawDefinition=P.bind(null,e),W.aliases&&L(W.aliases,{languageName:T})}function k(T){delete t[T];for(let P of Object.keys(n))n[P]===T&&delete n[P]}function C(){return Object.keys(t)}function I(T){return T=(T||"").toLowerCase(),t[T]||t[n[T]]}function L(T,{languageName:P}){typeof T=="string"&&(T=[T]),T.forEach(W=>{n[W.toLowerCase()]=P})}function B(T){let P=I(T);return P&&!P.disableAutodetect}function Z(T){T["before:highlightBlock"]&&!T["before:highlightElement"]&&(T["before:highlightElement"]=P=>{T["before:highlightBlock"](Object.assign({block:P.el},P))}),T["after:highlightBlock"]&&!T["after:highlightElement"]&&(T["after:highlightElement"]=P=>{T["after:highlightBlock"](Object.assign({block:P.el},P))})}function ue(T){Z(T),r.push(T)}function pe(T,P){let W=T;r.forEach(function(Y){Y[W]&&Y[W](P)})}function j(T){return si("10.7.0","highlightBlock will be removed entirely in v12.0"),si("10.7.0","Please use highlightElement now."),v(T)}Object.assign(e,{highlight:c,highlightAuto:m,highlightAll:w,highlightElement:v,highlightBlock:j,configure:E,initHighlighting:g,initHighlightingOnLoad:p,registerLanguage:x,unregisterLanguage:k,listLanguages:C,getLanguage:I,registerAliases:L,autoDetection:B,inherit:mv,addPlugin:ue}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=jS,e.regex={concat:uo,lookahead:vv,either:Xf,optional:tS,anyNumberOfTimes:eS};for(let T in ku)typeof ku[T]=="object"&&Zf.exports(ku[T]);return Object.assign(e,ku),e},Cl=BS({});Iv.exports=Cl;Cl.HighlightJS=Cl;Cl.default=Cl});var Ut=me(he(),1);function oa(e,t){for(let n in e)t(e[n],n)}function Mt(e,t){e.forEach(t)}function Nt(e,t){if(!e)throw Error(t)}function on({node:e=[],from:t,source:n,parent:r=t||n,to:o,target:i,child:l=o||i,scope:s={},meta:u={},family:a={type:"regular"},regional:c}={}){let h=yi(r),y=yi(a.links),m=yi(a.owners),d=[];Mt(e,E=>E&&vn(d,E));let v={id:ly(),seq:d,next:yi(l),meta:u,scope:s,family:{type:a.type||"crosslink",links:y,owners:m}};return Mt(y,E=>vn($l(E),v)),Mt(m,E=>vn(Gl(E),v)),Mt(h,E=>vn(E.next,v)),c&&jr&&wo(wi(jr),[v]),v}function ir(e,t,n){let r=yn,o=null,i=Te;if(e.target&&(t=e.params,n=e.defer,r="page"in e?e.page:r,e.stack&&(o=e.stack),i=or(e)||i,e=e.target),i&&Te&&i!==Te&&(Te=null),Array.isArray(e))for(let m=0;m<e.length;m++)Fr("pure",r,Bt(e[m]),o,t[m],i);else Fr("pure",r,Bt(e),o,t,i);if(n&&!jl)return;let l,s,u,a,c,h,y={isRoot:jl,currentPage:yn,scope:Te,isWatch:Ul,isPure:Vl};jl=0;e:for(;a=cy();){let{idx:m,stack:d,type:v}=a;u=d.node,yn=c=d.page,Te=or(d),c?h=c.reg:Te&&(h=Te.reg);let E=!!c,g=!!Te,p={fail:0,scope:u.scope};l=s=0;for(let f=m;f<u.seq.length&&!l;f++){let w=u.seq[f];if(w.order){let{priority:S,barrierID:x}=w.order,k=x?c?`${c.fullID}_${x}`:x:0;if(f!==m||v!==S){x?Zu.has(k)||(Zu.add(k),ta(f,d,S,x)):ta(f,d,S);continue e}x&&Zu.delete(k)}switch(w.type){case"mov":{let x,k=w.data;switch(k.from){case Dr:x=wi(d);break;case"a":case"b":x=d[k.from];break;case"value":x=k.store;break;case"store":if(h&&!h[k.store.id])if(E){let C=lp(c,k.store.id);d.page=c=C,C?h=C.reg:g?(Eo(Te,k.store,0,1,k.softRead),h=Te.reg):h=void 0}else g&&Eo(Te,k.store,0,1,k.softRead);x=Si(h&&h[k.store.id]||k.store)}switch(k.to){case Dr:d.value=x;break;case"a":case"b":d[k.to]=x;break;case"store":dy(c,Te,u,k.target).current=x}break}case"compute":let S=w.data;if(S.fn){Ul=ct(u,"op")==="watch",Vl=S.pure;let x=S.safe?(0,S.fn)(wi(d),p.scope,d):my(p,S.fn,d);S.filter?s=!x:d.value=x,Ul=y.isWatch,Vl=y.isPure}}l=p.fail||s}if(!l){let f=wi(d),w=or(d);if(Mt(u.next,S=>{Fr("child",c,S,d,f,w)}),w){ct(u,"needFxCounter")&&Fr("child",c,w.fxCount,d,f,w),ct(u,"storeChange")&&Fr("child",c,w.storeChange,d,f,w),ct(u,"warnSerialize")&&Fr("child",c,w.warnSerializeNode,d,f,w);let S=w.additionalLinks[u.id];S&&Mt(S,x=>{Fr("child",c,x,d,f,w)})}}}jl=y.isRoot,yn=y.currentPage,Te=or(y)}function Xd(e,t="combine"){let n=t+"(",r="",o=0;return oa(e,i=>{o<25&&(i!=null&&(n+=r,n+=Br(i)?la(i).fullName:i.toString()),o+=1,r=", ")}),n+")"}function Jd(e,t){let n,r,o=e;if(t){let i=la(t);e.length===0?(n=i.path,r=i.fullName):(n=i.path.concat([e]),r=i.fullName.length===0?e:i.fullName+"/"+e)}else n=e.length===0?[]:[e],r=e;return{shortName:o,fullName:r,path:n}}function Ei(e,t){let n=t?e:e[0];np(n);let r=n.or,o=n.and;if(o){let i=t?o:o[0];if(Sn(i)&&"and"in i){let l=Ei(o,t);e=l[0],r={...r,...l[1]}}else e=o}return[e,r]}function nn(e,...t){let n=Ci();if(n){let r=n.handlers[e];if(r)return r(n,...t)}}function Ee(e,t){let n=ko({or:t,and:typeof e=="string"?{name:e}:e}),r=(l,...s)=>(yo(!ct(r,"derived"),"call of derived event","createEvent"),yo(!Vl,"unit call from pure function","operators like sample"),yn?((u,a,c,h)=>{let y=yn,m=null;if(a)for(m=yn;m&&m.template!==a;)m=lr(m);Qd(m);let d=u.create(c,h);return Qd(y),d})(r,o,l,s):r.create(l,s)),o=Ci(),i=Object.assign(r,{graphite:on({meta:cp("event",r,n),regional:1}),create:l=>(ir({target:r,params:l,scope:Te}),l),watch:l=>up(r,l),map:l=>Yu(r,vo,l,[jn()]),filter:l=>Yu(r,"filter",l.fn?l:l.fn,[jn(ua,1)]),filterMap:l=>Yu(r,"filterMap",l,[jn(),wn(s=>!Dt(s),1)]),prepend(l){let s=Ee("* \\u2192 "+r.shortName,{parent:lr(r)});return nn("eventPrepend",Bt(s)),Co(s,r,[jn()],"prepend",l),ap(r,s),s}});return n!=null&&n.domain&&n.domain.hooks.event(i),i}function ze(e,t){let n=ko(t),r=xo(e),o=Ee({named:"updates",derived:1});nn("storeBase",r);let i=r.id,l={subscribers:new Map,updates:o,defaultState:e,stateRef:r,getState(){let d,v=r;if(yn){let E=yn;for(;E&&!E.reg[i];)E=lr(E);E&&(d=E)}return!d&&Te&&(Eo(Te,r,1),d=Te),d&&(v=d.reg[i]),Si(v)},setState:d=>ir({target:l,params:d,defer:1,scope:Te}),reset:(...d)=>(Mt(d,v=>l.on(v,()=>l.defaultState)),l),on:(d,v)=>(So(d,".on","first argument"),Nt(Lt(v),"second argument should be a function"),yo(!ct(l,"derived"),".on in derived store","createStore"),Mt(Array.isArray(d)?d:[d],E=>{l.off(E),Dl(l).set(E,da(Zd(E,l,"on",uy,v)))}),l),off(d){let v=Dl(l).get(d);return v&&(v(),Dl(l).delete(d)),l},map(d,v){let E,g;Sn(d)&&(E=d,d=d.fn),yo(Dt(v),"second argument of store.map","updateFilter");let p=l.getState();Ci()?g=null:Dt(p)||(g=d(p,v));let f=ze(g,{name:`${l.shortName} \\u2192 *`,derived:1,and:E}),w=Zd(l,f,vo,qu,d);return ea(rn(f),{type:vo,fn:d,from:r}),rn(f).noInit=1,nn("storeMap",r,w),f},watch(d,v){if(!v||!Br(d)){let E=up(l,d);return nn("storeWatch",r,d)||d(l.getState()),E}return Nt(Lt(v),"second argument should be a function"),d.watch(E=>v(l.getState(),E))}},s=cp("store",l,n),u=l.defaultConfig.updateFilter;l.graphite=on({scope:{state:r,fn:u},node:[wn((d,v,E)=>(E.scope&&!E.scope.reg[r.id]&&(E.b=1),d)),Ur(r),wn((d,v,{a:E,b:g})=>!Dt(d)&&(d!==E||g),1),u&&jn(qu,1),tn({from:Dr,target:r})],child:o,meta:s,regional:1});let a=ct(l,"serialize"),c=ct(l,"derived"),h=a==="ignore",y=!a||h?0:a,m=ct(l,"sid");return m&&(h||Hr(l,"storeChange",1),r.sid=m,y&&(r.meta={...r?.meta,serialize:y})),m||h||c||Hr(l,"warnSerialize",1),Nt(c||!Dt(e),"current state can\'t be undefined, use null instead"),wo(l,[o]),n!=null&&n.domain&&n.domain.hooks.store(l),c||(l.reinit=Ee(),l.reset(l.reinit)),l}function Vr(...e){let t,n,r;[e,r]=Ei(e);let o,i,l,s=e[e.length-1];if(Lt(s)?(n=e.slice(0,-1),t=s):n=e,n.length===1){let u=n[0];Dn(u)||(o=u,i=1)}if(!i&&(o=n,t)){l=1;let u=t;t=a=>u(...a)}return Nt(Sn(o),"shape should be an object"),hy(Array.isArray(o),!l,o,r,t)}function q0(){let e={};return e.req=new Promise((t,n)=>{e.rs=t,e.rj=n}),e.req.catch(()=>{}),e}function ia(e,t){let n=ko(Lt(e)?{handler:e}:e,t),r=Ee(Lt(e)?{handler:e}:e,t),o=Bt(r);Hr(o,"op",r.kind="effect"),r.use=m=>(Nt(Lt(m),".use argument should be a function"),c.scope.handler=m,r),r.use.getCurrent=()=>c.scope.handler;let i=r.finally=Ee({named:"finally",derived:1}),l=r.done=i.filterMap({named:"done",fn({status:m,params:d,result:v}){if(m==="done")return{params:d,result:v}}}),s=r.fail=i.filterMap({named:"fail",fn({status:m,params:d,error:v}){if(m==="fail")return{params:d,error:v}}}),u=r.doneData=l.map({named:"doneData",fn:({result:m})=>m}),a=r.failData=s.map({named:"failData",fn:({error:m})=>m}),c=on({scope:{handlerId:ct(o,"sid"),handler:r.defaultConfig.handler||(()=>Nt(0,`no handler used in ${r.getType()}`))},node:[wn((m,d,v)=>{let E=d,g=E.handler;if(or(v)){let p=or(v).handlers[E.handlerId];p&&(g=p)}return m.handler=g,m},0,1),wn(({params:m,req:d,handler:v,args:E=[m]},g,p)=>{let f=dp(p),w=Wl(m,d,1,i,p,f),S=Wl(m,d,0,i,p,f),[x,k]=fp(v,S,E);x&&(Sn(k)&&Lt(k.then)?k.then(w,S):w(k))},0,1)],meta:{op:"fx",fx:"runner"}});o.scope.runner=c,vn(o.seq,wn((m,{runner:d},v)=>{let E=lr(v)?{params:m,req:{rs(g){},rj(g){}}}:m;return ir({target:d,params:E,defer:1,scope:or(v)}),E.params},0,1)),r.create=m=>{let d=q0(),v={params:m,req:d};if(Te){if(!Ul){let E=Te;d.req.finally(()=>{fy(E)}).catch(()=>{})}ir({target:r,params:v,scope:Te})}else ir(r,v);return d.req};let h=r.inFlight=ze(0,{serialize:"ignore"}).on(r,m=>m+1).on(i,m=>m-1).map({fn:m=>m,named:"inFlight"});Hr(i,"needFxCounter","dec"),Hr(r,"needFxCounter",1);let y=r.pending=h.map({fn:m=>m>0,named:"pending"});return wo(r,[i,l,s,u,a,y,h]),n!=null&&n.domain&&n.domain.hooks.effect(r),r}function qd(e){let t;[e,t]=Ei(e,1);let{source:n,effect:r,mapParams:o}=e,i=ia(e,t);Hr(i,"attached",1);let l,{runner:s}=Bt(i).scope,u=wn((c,h,y)=>{let m,{params:d,req:v,handler:E}=c,g=i.finally,p=dp(y),f=Wl(d,v,0,g,y,p),w=y.a,S=Ju(E),x=1;if(o?[x,m]=fp(o,f,[d,w]):m=n&&S?w:d,x){if(!S)return c.args=[w,m],1;ir({target:E,params:{params:m,req:{rs:Wl(d,v,1,g,y,p),rj:f}},page:y.page,defer:1})}},1,1);if(n){let c;Dn(n)?(c=n,wo(c,[i])):(c=Vr(n),wo(i,[c])),l=[Ur(rn(c)),u]}else l=[u];s.seq.splice(1,0,...l),i.use(r);let a=lr(r);return a&&(Object.assign(la(i),Jd(i.shortName,a)),i.defaultConfig.parent=a),ap(r,i,"effect"),i}function ey(e,t){So(e,"merge","first argument");let n=Ee({name:Xd(e,"merge"),derived:1,and:t});return Co(e,n,[],"merge"),n}function ty(e,t){let n=0;return Mt(vy,r=>{r in e&&(Nt(e[r]!=null,pp(t,r)),n=1)}),n}function sr(...e){let t,n,r,o,[[i,l,s],u]=Ei(e),a=1;return Dt(l)&&Sn(i)&&ty(i,"sample")&&(l=i.clock,s=i.fn,a=!i.greedy,o=i.filter,t=i.target,n=i.name,r=i.sid,i=i.source),yy("sample",l,i,o,t,s,n,u,a,1,0,r)}var ny=typeof Symbol<"u"&&Symbol.observable||"@@observable",vo="map",Dr="stack",Bt=e=>e.graphite||e,$l=e=>e.family.owners,Gl=e=>e.family.links,rn=e=>e.stateRef,wi=e=>e.value,Dl=e=>e.subscribers,lr=e=>e.parent,or=e=>e.scope,ct=(e,t)=>Bt(e).meta[t],Hr=(e,t,n)=>Bt(e).meta[t]=n,la=e=>e.compositeName,Br=e=>(Lt(e)||Sn(e))&&"kind"in e,ki=e=>t=>Br(t)&&t.kind===e,Dn=ki("store"),ry=ki("event"),Ju=ki("effect"),ep=ki("domain"),oy=ki("scope"),Wr={__proto__:null,unit:Br,store:Dn,event:ry,effect:Ju,domain:ep,scope:oy,attached:e=>Ju(e)&&ct(e,"attached")==1};var Bl=(e,t)=>{let n=e.indexOf(t);n!==-1&&e.splice(n,1)},vn=(e,t)=>e.push(t),yo=(e,t,n)=>!e&&console.error(`${t} is deprecated${n?`, use ${n} instead`:""}`),sa=()=>{let e=0;return()=>""+ ++e},iy=sa(),tp=sa(),ly=sa(),jr=null,Ci=()=>jr&&jr.template,sy=e=>(e&&jr&&jr.sidRoot&&(e=`${jr.sidRoot}|${e}`),e);var wo=(e,t)=>{let n=Bt(e);Mt(t,r=>{let o=Bt(r);n.family.type!=="domain"&&(o.family.type="crosslink"),vn($l(o),n),vn(Gl(n),o)})},yi=(e=[])=>(Array.isArray(e)?e:[e]).flat().map(Bt),Sn=e=>typeof e=="object"&&e!==null,Lt=e=>typeof e=="function",Dt=e=>e===void 0,np=e=>Nt(Sn(e)||Lt(e),"expect first argument be an object"),$d=(e,t,n,r)=>Nt(!(!Sn(e)&&!Lt(e)||!("family"in e)&&!("graphite"in e)),`${t}: expect ${n} to be a unit (store, event or effect)${r}`),So=(e,t,n)=>{Array.isArray(e)?Mt(e,(r,o)=>$d(r,t,`${o} item of ${n}`,"")):$d(e,t,n," or array of units")},rp=(e,t,n="target")=>Mt(yi(t),r=>yo(!ct(r,"derived"),`${e}: derived unit in "${n}"`,"createEvent/createStore")),qu=(e,{fn:t},{a:n})=>t(e,n),uy=(e,{fn:t},{a:n})=>t(n,e),ua=(e,{fn:t})=>t(e),op=(e,t,n,r)=>{let o={id:tp(),type:e,data:t};return n&&(o.order={priority:n},r&&(o.order.barrierID=++ay)),o},ay=0,tn=({from:e="store",store:t,target:n,to:r=n?"store":Dr,batch:o,priority:i})=>op("mov",{from:e,store:t,to:r,target:n},i,o),xi=({fn:e,batch:t,priority:n,safe:r=0,filter:o=0,pure:i=0})=>op("compute",{fn:e,safe:r,filter:o,pure:i},n,t),aa=({fn:e})=>xi({fn:e,priority:"effect"}),wn=(e,t,n)=>xi({fn:e,safe:1,filter:t,priority:n&&"effect"}),Ur=(e,t,n)=>tn({store:e,to:t?Dr:"a",priority:n&&"sampler",batch:1}),jn=(e=ua,t)=>xi({fn:e,pure:1,filter:t}),ip={mov:tn,compute:xi,filter:({fn:e,pure:t})=>xi({fn:e,filter:1,pure:t}),run:aa},xo=e=>({id:tp(),current:e}),Si=({current:e})=>e,ea=(e,t)=>{e.before||(e.before=[]),vn(e.before,t)},go=null,ca=(e,t)=>{if(!e)return t;if(!t)return e;let n;return(e.v.type===t.v.type&&e.v.id>t.v.id||na(e.v.type)>na(t.v.type))&&(n=e,e=t,t=n),n=ca(e.r,t),e.r=e.l,e.l=n,e},fa=[],Gd=0;for(;Gd<6;)vn(fa,{first:null,last:null,size:0}),Gd+=1;var cy=()=>{for(let e=0;e<6;e++){let t=fa[e];if(t.size>0){if(e===3||e===4){t.size-=1;let r=go.v;return go=ca(go.l,go.r),r}t.size===1&&(t.last=null);let n=t.first;return t.first=n.r,t.size-=1,n.v}}},Fr=(e,t,n,r,o,i)=>ta(0,{a:null,b:null,node:n,parent:r,value:o,page:t,scope:i},e),ta=(e,t,n,r=0)=>{let o=na(n),i=fa[o],l={v:{idx:e,stack:t,type:n,id:r},l:null,r:null};o===3||o===4?go=ca(go,l):(i.size===0?i.first=l:i.last.r=l,i.last=l),i.size+=1},na=e=>{switch(e){case"child":return 0;case"pure":return 1;case"read":return 2;case"barrier":return 3;case"sampler":return 4;case"effect":return 5;default:return-1}},Zu=new Set,Te,jl=1,Ul=0,Vl=0,yn=null,fy=e=>{Te=e},Qd=e=>{yn=e},lp=(e,t)=>{if(e){for(;e&&!e.reg[t];)e=lr(e);if(e)return e}return null},dy=(e,t,n,r,o)=>{let i=lp(e,r.id);return i?i.reg[r.id]:t?(Eo(t,r,o),t.reg[r.id]):r},py=e=>e,Eo=(e,t,n,r,o)=>{var i;let l=e.reg,s=t.sid,u=t==null||(i=t.meta)===null||i===void 0?void 0:i.serialize;if(l[t.id])return;let a={id:t.id,current:t.current,meta:t.meta};if(s&&s in e.sidValuesMap&&!(s in e.sidIdMap))a.current=(e.fromSerialize&&u!=="ignore"&&u?.read||py)(e.sidValuesMap[s]);else if(t.before&&!o){let c=0,h=n||!t.noInit||r;Mt(t.before,y=>{switch(y.type){case vo:{let m=y.from;if(m||y.fn){m&&Eo(e,m,n,r);let d=m&&l[m.id].current;h&&(a.current=y.fn?y.fn(d):d)}break}case"field":c||(c=1,a.current=Array.isArray(a.current)?[...a.current]:{...a.current}),Eo(e,y.from,n,r),h&&(a.current[y.field]=l[l[y.from.id].id].current)}})}s&&(e.sidIdMap[s]=t.id),l[t.id]=a},my=(e,t,n)=>{try{return t(wi(n),e.scope,n)}catch(r){console.error(r),e.fail=1}},ko=(e,t={})=>(Sn(e)&&(ko(e.or,t),oa(e,(n,r)=>{Dt(n)||r==="or"||r==="and"||(t[r]=n)}),ko(e.and,t)),t),Kd=(e,t)=>{Bl(e.next,t),Bl($l(e),t),Bl(Gl(e),t)},ra=(e,t,n)=>{let r;e.next.length=0,e.seq.length=0,e.scope=null;let o=Gl(e);for(;r=o.pop();)Kd(r,e),(t||n&&ct(e,"op")!=="sample"||r.family.type==="crosslink")&&ra(r,t,ct(r,"op")!=="on"&&n);for(o=$l(e);r=o.pop();)Kd(r,e),n&&r.family.type==="crosslink"&&ra(r,t,ct(r,"op")!=="on"&&n)},vi=e=>e.clear(),Ql=(e,{deep:t}={})=>{let n=0;if(e.ownerSet&&e.ownerSet.delete(e),Dn(e))vi(Dl(e));else if(ep(e)){n=1;let r=e.history;vi(r.events),vi(r.effects),vi(r.stores),vi(r.domains)}ra(Bt(e),!!t,n)},da=e=>{let t=()=>Ql(e);return t.unsubscribe=t,t},Co=(e,t,n,r,o)=>on({node:n,parent:e,child:t,scope:{fn:o},meta:{op:r},family:{owners:[e,t],links:t},regional:1}),sp=e=>{let t="forward",[{from:n,to:r},o]=Ei(e,1);return So(n,t,\'"from"\'),So(r,t,\'"to"\'),rp(t,r,"to"),da(on({parent:n,child:r,meta:{op:t,config:o},family:{},regional:1}))},up=(e,t)=>(Nt(Lt(t),".watch argument should be a function"),da(on({scope:{fn:t},node:[aa({fn:ua})],parent:e,meta:{op:"watch"},family:{owners:e},regional:1}))),ap=(e,t,n="event")=>{lr(e)&&lr(e).hooks[n](t)},cp=(e,t,n)=>{let r=ko(n),o=e==="domain",i=iy(),{sid:l=null,named:s=null,domain:u=null,parent:a=u}=r,c=s||r.name||(o?"":i),h=Jd(c,a),y={op:t.kind=e,name:t.shortName=c,sid:t.sid=sy(l),named:s,unitId:t.id=i,serialize:r.serialize,derived:r.derived,config:r};if(t.parent=a,t.compositeName=h,t.defaultConfig=r,t.thru=m=>(yo(0,"thru","js pipe"),m(t)),t.getType=()=>h.fullName,!o){t.subscribe=d=>(np(d),t.watch(Lt(d)?d:v=>d.next&&d.next(v))),t[ny]=()=>t;let m=Ci();m&&(y.nativeTemplate=m)}return y},Yu=(e,t,n,r)=>{let o;Sn(n)&&(o=n,n=n.fn);let i=Ee({name:`${e.shortName} \\u2192 *`,derived:1,and:o});return Co(e,i,r,t,n),i},Zd=(e,t,n,r,o)=>{let i=rn(t),l=tn({store:i,to:"a",priority:"read"});n===vo&&(l.data.softRead=1);let s=[l,jn(r)];return nn("storeOnMap",i,s,Dn(e)&&rn(e)),Co(e,t,s,n,o)},hy=(e,t,n,r,o)=>{let i=e?d=>[...d]:d=>({...d}),l=e?[]:{},s=i(l),u=xo(s),a=xo(1);u.type=e?"list":"shape",u.noInit=1,nn("combineBase",u,a);let c=ze(s,{name:Xd(n),derived:1,and:r}),h=rn(c);h.noInit=1,Hr(c,"isCombine",1);let y=Ur(u);y.order={priority:"barrier"};let m=[wn((d,v,E)=>(E.scope&&!E.scope.reg[u.id]&&(E.c=1),d)),y,tn({store:a,to:"b"}),wn((d,{key:v},E)=>{if(E.c||d!==E.a[v])return t&&E.b&&(E.a=i(E.a)),E.a[v]=d,1},1),tn({from:"a",target:u}),tn({from:"value",store:0,target:a}),tn({from:"value",store:1,target:a,priority:"barrier",batch:1}),Ur(u,1),o&&jn()];return oa(n,(d,v)=>{if(!Dn(d))return Nt(!Br(d)&&!Dt(d),`combine expects a store in a field ${v}`),void(s[v]=l[v]=d);l[v]=d.defaultState,s[v]=d.getState();let E=Co(d,c,m,"combine",o);E.scope.key=v;let g=rn(d);ea(u,{type:"field",field:v,from:g}),nn("combineField",g,E)}),c.defaultShape=n,ea(h,{type:vo,from:u,fn:o}),Ci()||(c.defaultState=o?h.current=o(s):l),c},fp=(e,t,n)=>{try{return[1,e(...n)]}catch(r){return t(r),[0,null]}},dp=e=>{let t=or(e),n={ref:t};return t&&vn(t.activeEffects,n),n},Wl=(e,t,n,r,o,i)=>l=>{i.ref&&Bl(i.ref.activeEffects,i),ir({target:[r,gy],params:[n?{status:"done",params:e,result:l}:{status:"fail",params:e,error:l},{value:l,fn:n?t.rs:t.rj}],defer:1,page:o.page,scope:i.ref})},gy=on({node:[aa({fn:({fn:e,value:t})=>e(t)})],meta:{op:"fx",fx:"sidechain"}}),vy=["source","clock","target"],pp=(e,t)=>e+`: ${t} should be defined`,yy=(e,t,n,r,o,i,l,s,u,a,c,h)=>{let y=!!o;Nt(!Dt(n)||!Dt(t),pp(e,"either source or clock"));let m=0;Dt(n)?m=1:Br(n)||(n=Vr(n)),Dt(t)?t=n:(So(t,e,"clock"),Array.isArray(t)&&(t=ey(t))),m&&(n=t),s||l||(l=n.shortName);let d="none";(c||r)&&(Br(r)?d="unit":(Nt(Lt(r),"`filter` should be function or unit"),d="fn")),o?(So(o,e,"target"),rp(e,o)):d==="none"&&a&&Dn(n)&&Dn(t)?o=ze(i?i(Si(rn(n)),Si(rn(t))):Si(rn(n)),{name:l,sid:h,or:s}):(o=Ee({name:l,derived:1,or:s}),nn("sampleTarget",Bt(o)));let v=xo(),E=[];if(d==="unit"){let[w,S]=Yd(r,o,t,v,e);E=[...Xu(S),...Xu(w)]}let[g,p]=Yd(n,o,t,v,e),f=Co(t,o,[nn("sampleSourceLoader"),tn({from:Dr,target:v}),...Xu(p),Ur(g,1,u),...E,Ur(v),d==="fn"&&jn((w,S,{a:x})=>r(w,x),1),i&&jn(qu),nn("sampleSourceUpward",y)],e,i);return wo(n,[f]),Object.assign(f.meta,s,{joint:1}),o},Xu=e=>[Ur(e),wn((t,n,{a:r})=>r,1)],Yd=(e,t,n,r,o)=>{let i=Dn(e),l=i?rn(e):xo(),s=xo(i);return i||on({parent:e,node:[tn({from:Dr,target:l}),tn({from:"value",store:1,target:s})],family:{owners:[e,t,n],links:t},meta:{op:o},regional:1}),nn("sampleSource",s,l,r),[l,s]};var Cp=me(Sp(),1),Tp=me(ma(),1);function Ep(e,t,n,r){let o=[ip.run({fn:i=>t(i)})];if(r&&o.unshift(r),n){let i=on({node:o}),l=e.graphite.id,s=n.additionalLinks,u=s[l]||[];return s[l]=u,u.push(i),()=>{let a=u.indexOf(i);a!==-1&&u.splice(a,1),Ql(i)}}{let i=on({node:o,parent:[e],family:{owners:e}});return()=>{Ql(i)}}}function Ay(e,t){Wr.store(e)||Ti("expect useStore argument to be a store");let n=Ut.default.useCallback(o=>Ep(e,o,t),[e,t]),r=Ut.default.useCallback(()=>Ip(e,t),[e,t]);return Hy(n,r,r)}function Fy([e,t],n){let r,o,i,l,s=xp;t?(r=t,i=e,l=[]):{fn:r,store:i,keys:l,defaultValue:o,updateFilter:s=xp}=e,Wr.store(i)||Ti("useStoreMap expects a store"),Array.isArray(l)||Ti("useStoreMap expects an array as keys"),typeof r!="function"&&Ti("useStoreMap expects a function");let u=Ut.default.useCallback(m=>Ep(i,m,n),[i,n]),a=Ut.default.useCallback(()=>Ip(i,n),[i,n]),c=Ut.default.useRef(),h=Ut.default.useRef(),y=Ut.default.useRef(l);return jy(u,a,a,m=>{if(c.current!==m||!((d,v)=>{if(!d||!v||d.length!==v.length)return 0;let E=1;for(let g=0;g<d.length;g++)if(d[g]!==v[g]){E=0;break}return E})(y.current,l)){let d=r(m,l);d===void 0&&o!==void 0&&(d=o),c.current=m,y.current=l,d!==void 0&&(h.current=d)}return h.current},(m,d)=>!s(d,m))}function kp(e){let t=Ut.default.useContext(bp);return e&&!t&&Ti("No scope found, consider adding <Provider> to app root"),t}function xn(e,t){return Ay(e,kp(t?.forceScope))}function Io(e,t){return Fy([e,t],kp(e?.forceScope))}var Ti=e=>{throw Error(e)},{useSyncExternalStore:Hy}=Tp.default,{useSyncExternalStoreWithSelector:jy}=Cp.default,Ip=(e,t)=>t?t.getState(e):e.getState(),xp=(e,t)=>e!==t,bp=Ut.default.createContext(null),{Provider:kE}=bp,CE=typeof window<"u"?Ut.default.useLayoutEffect:Ut.default.useEffect;var nr=me(he()),L0=me(Lf());function Kg(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Kg(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function Bw(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=Kg(e))&&(r&&(r+=" "),r+=t);return r}var Mn=Bw;var Nf=me(he()),Uw=e=>Nf.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},Nf.createElement("path",{d:"M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 11 L 12 21 L 14 21 L 14 11 Z M 18 11 L 18 21 L 20 21 L 20 11 Z"})),Zg=Uw;var Rf=me(he()),Vw=e=>Rf.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},Rf.createElement("path",{d:"M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 9.125 L 12 22.875 L 13.5 22 L 22.5 16.875 L 24 16 L 22.5 15.125 L 13.5 10 Z M 14 12.5625 L 19.96875 16 L 14 19.4375 Z"})),Yg=Vw;var _f=me(he()),Ww=e=>_f.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},_f.createElement("path",{d:"M 14 4 C 13.476563 4 12.941406 4.183594 12.5625 4.5625 C 12.183594 4.941406 12 5.476563 12 6 L 12 7 L 5 7 L 5 9 L 6.09375 9 L 8 27.09375 L 8.09375 28 L 23.90625 28 L 24 27.09375 L 25.90625 9 L 27 9 L 27 7 L 20 7 L 20 6 C 20 5.476563 19.816406 4.941406 19.4375 4.5625 C 19.058594 4.183594 18.523438 4 18 4 Z M 14 6 L 18 6 L 18 7 L 14 7 Z M 8.125 9 L 23.875 9 L 22.09375 26 L 9.90625 26 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 15 12 L 15 23 L 17 23 L 17 12 Z M 18 12 L 18 23 L 20 23 L 20 12 Z"})),Xg=Ww;var Yt=me(he());function Jg(e){var{source:t,timeout:n,target:r}=e;if(!Wr.unit(t))throw new TypeError("source must be unit from effector");if(Wr.domain(t,{sid:"jne2ft"}))throw new TypeError("source cannot be domain");var o=$w(n),i=Ee({name:"saveTimeoutId",sid:"eqtrwk"}),l=ze(null,{and:{serialize:"ignore"},name:"$timeoutId",sid:"-5hlcyp"}).on(i,(y,m)=>m),s=Ee({name:"saveReject",sid:"-m6vk0"}),u=ze(null,{and:{serialize:"ignore"},name:"$rejecter",sid:"tqvf32"}).on(s,(y,m)=>m),a=r??Ee({name:"tick",sid:"-6wklwe"}),c=ia(y=>{var{parameter:m,timeout:d,timeoutId:v,rejectPromise:E}=y;return v&&clearTimeout(v),E&&E(),new Promise((g,p)=>{s(p),i(setTimeout(g,d,m))})},{name:"timerBaseFx",sid:"-xd98qa"}),h=qd({and:{source:{timeoutId:l,rejectPromise:u},mapParams:(y,m)=>{var{parameter:d,timeout:v}=y,{timeoutId:E,rejectPromise:g}=m;return{parameter:d,timeout:v,timeoutId:E,rejectPromise:g}},effect:c},or:{name:"timerFx",sid:"-4ab544"}});return u.reset(h.done),l.reset(h.done),sr({and:[{source:o,clock:t,fn:(y,m)=>({timeout:y,parameter:m}),target:h}],or:{sid:"m29k3f"}}),sp({and:{from:h.done.map(y=>{var{result:m}=y;return m}),to:a},or:{sid:"-32ktwy"}}),a}function $w(e){if(Wr.store(e,{sid:"-2xmoh9"}))return e;if(typeof e=="number"){if(e<0||!Number.isFinite(e))throw new Error(\'timeout must be positive number or zero. Received: "\'.concat(e,\'"\'));return ze(e,{and:{name:"$timeout"},sid:"-757cx6"})}throw new TypeError(\'timeout parameter in interval method should be number or Store. "\'.concat(typeof e,\'" was passed\'))}var qg=e=>{if(!e)return()=>!0;let t=new RegExp(e.replace(/[/\\-\\\\^$*+?.()[\\]{}]/g,"\\\\$&"),"i");return n=>t.test(n)};function mu(e){return e&&e.Math===Math&&e}var mt=mu(typeof globalThis=="object"&&globalThis)||mu(typeof window=="object"&&window)||mu(typeof self=="object"&&self)||mu(typeof global=="object"&&global)||function(){return this}()||Function("return this")(),ev=mt.top||mt,ni=mt.parent||mt,Pf=mt.opener||null;var Xn=class{value;handler=null;constructor(t){this.value=t}set(t){Object.is(this.value,t)||(this.value=t,this.apply())}get(){return this.value}on(t,n){let r=this.handler;for(;r!==null;)r.fn===t&&r.context===n&&console.warn("ReactiveValue#on: duplicate fn & context pair"),r=r.handler;this.handler={fn:t,context:n,handler:this.handler}}link(t,n){this.on(t,n),t.call(n,this.value)}off(t,n){let r=this.handler,o=this;for(;r!==null;){if(r.fn===t&&r.context===n){r.fn=function(){},o.handler=r.handler;return}o=r,r=r.handler}console.warn("ReactiveValue#off: fn & context pair not found, nothing was removed")}apply(){let t=this.handler;for(;t!==null;)t.fn.call(t.context,this.value),t=t.handler}};function tv(e,t){let n=[...new Set(Array.isArray(t)?t:[])];return n.length!==e.length||n.some(o=>!e.includes(o))?n:e}var Lr=class extends Xn{constructor(t){super(tv([],t))}set(t){super.set(tv(this.value,t))}};var ri=class extends Lr{endpointLists=new Set;constructor(){super([])}set(){super.set([].concat(...[...this.endpointLists].map(t=>t.value)))}add(t){this.endpointLists.has(t)||(this.endpointLists.add(t),t.on(this.set,this),this.set())}remove(t){this.endpointLists.has(t)&&(this.endpointLists.delete(t),t.off(this.set,this),this.set())}};var Of=mt.trustedTypes?.emptyHTML;function oi(e){function t(r){return Math.round(r).toString(36)}let n=t(10+25*Math.random());for(e||(e=16);n.length<e;)n+=t(Date.now()*Math.random());return n.substr(0,e)}function vl(e,t){return e.push(t),()=>{let n=e.indexOf(t);n!==-1&&e.splice(n,1)}}var hu="[rempl][event-transport] ",gu=[],Ln=class{static get(t,n,r){return r||(r=mt),gu.find(i=>i.name===t&&i.connectTo===n&&i.realm===r)||new Ln(t,n,r)}name;connectTo;realm;inputChannelId;connections=new Map;connected=new Xn(!1);endpointGetUI=new Map;ownEndpoints=new Lr;remoteEndpoints=new ri;initCallbacks=[];dataCallbacks=[];sendCallbacks=new Map;inited=!1;constructor(t,n,r){if(gu.length===0&&typeof addEventListener=="function"&&addEventListener("message",o=>{for(let i of gu)i._onMessage(o)},!1),gu.push(this),this.name=t,this.connectTo=n,this.inputChannelId=`${t}/${oi()}`,this.realm=r||mt,this.ownEndpoints.on(o=>{this.connected.value&&this.send({type:"endpoints",data:[o]})}),typeof this.realm.postMessage!="function"||typeof addEventListener!="function"){console.warn(hu+"Event (postMessage) transport isn\'t supported");return}this._handshake(!1)}_handshake(t){this._send(`${this.connectTo}:connect`,{type:"handshake",initiator:this.name,inited:t,endpoints:this.ownEndpoints.value})}_onMessage(t){if(t.source!==this.realm||t.target!==mt)return;let n=t.data||{},r=`${this.name}:connect`;switch(n.to){case r:n.payload?.initiator===this.connectTo&&this._onConnect(n.from,n.payload);break;case this.inputChannelId:this.connections.has(n.from)?this._onData(n.from,n.payload):console.warn(hu+"unknown incoming connection",n.from);break}}_onConnect(t,n){if(n.inited||this._handshake(!0),!this.connections.has(t)){let r=new Lr(n.endpoints);this.remoteEndpoints.add(r),this.connections.set(t,{ttl:Date.now(),endpoints:r}),this._send(t,{type:"connect",endpoints:this.ownEndpoints.value})}this.inited=!0}_onData(t,n){switch(n.type){case"connect":{this.connections.get(t)?.endpoints.set(n.endpoints),this.connected.set(!0),this.initCallbacks.splice(0).forEach(r=>this.onInit(...r));break}case"endpoints":{this.connections.get(t)?.endpoints.set(n.data[0]);break}case"disconnect":{this.connections.get(t)?.endpoints.set([]),this.connected.set(!1);break}case"callback":{if(n.callback){let r=this.sendCallbacks.get(n.callback);typeof r=="function"&&(r(...n.data),this.sendCallbacks.delete(n.callback))}break}case"data":{let r=n.data,o=n.callback;o&&(r=r.concat(this._wrapCallback(t,o)));for(let{endpoint:i,fn:l}of this.dataCallbacks)i===n.endpoint&&l(...r);break}case"getRemoteUI":{if(!n.endpoint)return;let r=this.endpointGetUI.get(n.endpoint);if(typeof r!="function")console.warn(hu+"receive unknown endpoint for getRemoteUI(): "+n.endpoint),n.callback&&this._wrapCallback(t,n.callback)("Wrong endpoint \\u2013 "+n.endpoint);else if(n.callback){let o=this._wrapCallback(t,n.callback);r(n.data[0]||{}).catch(i=>({error:String(i?.message)})).then(i=>{"error"in i?o(i.error):o(null,i.type,i.value)})}break}default:console.warn(hu+"Unknown message type `"+n.type+"` for `"+this.name+"`",n)}}_wrapCallback(t,n){return(...r)=>this._send(t,{type:"callback",callback:n,data:r})}_send(t,n){if(typeof this.realm.postMessage=="function"){let r={from:this.inputChannelId,to:t,payload:n};this.realm.postMessage(r,"*")}}subscribeToEndpoint(t,n){return vl(this.dataCallbacks,{endpoint:t,fn:n})}sendToEndpoint(t,n,...r){let o=null;r.length&&typeof r[r.length-1]=="function"&&(o=oi(),this.sendCallbacks.set(o,r.pop())),this.send({type:n,endpoint:t,data:r,callback:o})}send(t){for(let n of this.connections.keys())this._send(n,t)}onInit(t,n){let r=t.id||null;return r&&(this.ownEndpoints.set(this.ownEndpoints.value.concat(r)),typeof t.getRemoteUI=="function"&&this.endpointGetUI.set(r,t.getRemoteUI)),this.inited?n({connected:this.connected,subscribe:this.subscribeToEndpoint.bind(this,r),getRemoteUI:this.sendToEndpoint.bind(this,r,"getRemoteUI"),send:this.sendToEndpoint.bind(this,r,"data")}):this.initCallbacks.push([t,n]),this}sync(t){let n=oi(8)+":"+this.connectTo;return this.onInit(t,r=>{r.subscribe(t.processInput.bind(t)),r.connected.link(o=>{t.setupChannel(n,r.send,this.remoteEndpoints,o)})}),this}};var Jn=class{name;owner;methods=Object.create(null);remoteMethodWrappers=Object.create(null);remoteMethods=[];listeners=null;constructor(t,n){this.name=t,this.owner=n,this.methods=Object.create(null)}isMethodProvided(t){return t in this.methods}provide(t,n){if(typeof t=="string")typeof n=="function"&&(this.methods[t]=n,this.owner.scheduleProvidedMethodsUpdate());else{let r=t;for(let[o,i]of Object.entries(r))typeof i=="function"&&(this.methods[o]=i,this.owner.scheduleProvidedMethodsUpdate())}}revoke(t){Array.isArray(t)?t.forEach(this.revoke,this):this.isMethodProvided(t)&&(delete this.methods[t],this.owner.scheduleProvidedMethodsUpdate())}isRemoteMethodExists(t){return this.remoteMethods.includes(t)}callRemote(t,...n){let r=null;return n.length&&typeof n[n.length-1]=="function"&&(r=n.pop(),console.warn("[rempl] Using a callback for Namespace#callMethod() is deprecated, use returned promise value instead")),new Promise(o=>{let i={type:"call",ns:this.name,method:t,args:n};this.owner.send(i,(...l)=>{o(l[0]),r?.(...l)})})}getRemoteMethod(t){let n=this.remoteMethodWrappers[t];return typeof n!="function"&&(n=this.remoteMethodWrappers[t]=Object.assign((...r)=>n.available?this.callRemote(t,...r):Promise.reject(new Error(`[rempl] ${this.owner.getName()} ns("${this.name}") has no available remote method "${t}`)),{available:this.remoteMethods.indexOf(t)!==-1})),n}onRemoteMethodsChanged(t){let n={event:"remoteMethodsChanged",callback:t,listeners:this.listeners};return this.listeners=n,t([...this.remoteMethods]),()=>{let r=this.listeners,o=this;for(;r!==null;){if(r===n){o.listeners=r.listeners;break}o=r,r=r.listeners}}}static invoke(t,n,r,o){let i=!1;r=r.concat((...l)=>{i=!0,o(...l),console.warn("[rempl] Using a callback in provided methods has been deprecated, just return a value or promise instead")}),Promise.resolve(t.methods[n].apply(null,r)).then(l=>{i||o(l)})}static notifyRemoteMethodsChanged(t){let n=t.listeners;for(let r in t.remoteMethodWrappers)t.remoteMethodWrappers[r].available=t.remoteMethods.includes(r);for(;n!==null;)n.event==="remoteMethodsChanged"&&n.callback.call(null,[...t.remoteMethods]),n=n.listeners}};var yl=class{id;namespaces;get namespaceClass(){return Jn}type="Endpoint";channels=[];connected=new Xn(!1);remoteEndpoints=new ri;providedMethodsUpdateTimer;constructor(t){this.id=t||null,this.namespaces=Object.create(null),this.remoteEndpoints.on(n=>{this.connected.set(n.includes(this.id||"*"))},this)}getName(){return this.type+(this.id?"#"+this.id:"")}ns(t){let n=this.namespaces[t];return n||(n=Object.assign(new this.namespaceClass(t,this)),this.namespaces[t]=n),n}send(t,n=null){for(let{send:r}of this.channels)r(t,n)}requestRemoteApi(){this.send({type:"getProvidedMethods"},t=>{this.setRemoteApi(t)})}setRemoteApi(t){let n=[];t||(t={});for(let r in t)if(Array.isArray(t[r])){let o=this.ns(r),i=t[r].slice().sort();(o.remoteMethods.length!==i.length||o.remoteMethods.some(function(s,u){return s!==i[u]}))&&(o.remoteMethods=i,n.push(o))}for(let r in this.namespaces)if(Array.isArray(t[r])===!1){let o=this.namespaces[r];o.remoteMethods=[],n.push(o)}n.forEach(r=>Jn.notifyRemoteMethodsChanged(r))}getProvidedApi(){let t=Object.create(null);for(let n in this.namespaces)t[n]=Object.keys(this.namespaces[n].methods).sort();return t}scheduleProvidedMethodsUpdate(){this.providedMethodsUpdateTimer||(this.providedMethodsUpdateTimer=setTimeout(()=>{this.providedMethodsUpdateTimer=null,this.send({type:"remoteMethods",methods:this.getProvidedApi()})},0))}processInput(t,n){switch(t.type){case"call":{let r=t,o=this.ns(r.ns||"*");if(!o.isMethodProvided(r.method))return console.warn(`[rempl][sync] ${this.getName()} (namespace: ${r.ns||"default"}) has no remote method:`,r.method);Jn.invoke(o,r.method,r.args,n);break}case"remoteMethods":{let r=t;this.setRemoteApi(r.methods);break}case"getProvidedMethods":n(this.getProvidedApi());break;default:console.warn("[rempl][sync] "+this.getName()+"Unknown packet type:",t.type)}}setupChannel(t,n,r,o){if(o)this.channels.push({type:t,send:n}),this.remoteEndpoints.add(r);else for(let i=0;i<this.channels.length;i++)if(this.channels[i].type===t&&this.channels[i].send===n){this.remoteEndpoints.remove(r),this.channels.splice(i,1);break}}};var vu=new Map,zf=class extends Jn{constructor(t,n){super(t,n),vu.set(this,[])}subscribe(t){return this.callRemote("init").then(t),vl(vu.get(this)||[],t)}},wl=class extends yl{type="Subscriber";get namespaceClass(){return zf}constructor(t){super(t),this.connected.on(n=>{if(n){this.requestRemoteApi();for(let r in this.namespaces){let o=this.namespaces[r],i=vu.get(o)||[];i.length&&o.callRemote("init").then(l=>{for(let s of i)s(l)})}}else this.setRemoteApi()})}processInput(t,n){switch(t.type){case"data":{let{ns:r,payload:o}=t,i=vu.get(this.ns(r||"*"));i&&i.slice().forEach(l=>l(o));break}default:super.processInput(t,n)}}};var Qw=new WeakMap;ni!==mt&&addEventListener("message",function(e){let t=e.data||{};e.source&&t.to==="rempl-env-publisher:connect"&&Qw.set(e.source,t)},!0);var nv=`@keyframes fade-in{0%{opacity:0}50%{opacity:0;backdrop-filter:blur(0) grayscale(0)}to{opacity:1}}@keyframes dot-blink{50%{opacity:1}}:host{position:fixed;z-index:10000000;inset:0;text-align:center;font:12px arial;transition:opacity .5s;background:#fffe;animation-name:fade-in;animation-duration:1s;animation-iteration-count:1;animation-direction:normal}@supports (backdrop-filter: blur(1px)){:host{background:#fff8;backdrop-filter:blur(5px) grayscale(.8)}}:host:before{content:"Publisher connection is lost";margin:30px 0 5px;display:inline-block;padding:4px}.dot{background-color:#5096fa;display:inline-block;vertical-align:middle;height:6px;width:6px;margin:3px;opacity:0;animation-name:dot-blink;animation-duration:.65s;animation-iteration-count:infinite;animation-direction:normal;border-radius:50%}.dot:nth-child(1){animation-delay:.1s}.dot:nth-child(2){animation-delay:.175s}.dot:nth-child(3){animation-delay:.25s}\n`;var ii=null;function Zw(){if(ii===null){ii=document.createElement("div");let e=ii.attachShadow({mode:"closed"}),t=document.createElement("style"),n=document.createElement("div");t.textContent=nv,n.append(...Array.from({length:3},()=>{let r=document.createElement("div");return r.className="dot",r})),e.append(t,n)}return ii}function Af(e){e&&typeof document<"u"?document.body.append(Zw()):ii&&ii.remove()}var Nn=null;function Yw(){Nn=new wl;let e=Object.assign(Nn.connected,{defaultOverlay:!0});return e.link(t=>{t?Af(!1):e.defaultOverlay&&Af(!0)}),Ln.get("rempl-subscriber","rempl-sandbox",Pf||ni).sync(Nn),Nn}function Ff(){return Nn===null&&(Nn=Yw()),Object.assign(Nn.ns("*"),{connected:Nn.connected,ns:Nn.ns.bind(Nn)})}var Nr=Ff();var li=ze({enabled:!1,subscriptions:[],query:""}),Hf=li.map(e=>e.enabled),rv=li.map(e=>e.subscriptions),yu=li.map(e=>e.query),ov=Ee(),jf=Ee(),Df=Ee();li.on(ov,(e,t)=>t);li.on(Df,(e,t)=>({...e,query:t}));li.on(jf,e=>({...e,enabled:!e.enabled}));Hf.watch(e=>{Nr.callRemote("setEnabled",e)});Nr.ns("state").subscribe(e=>{ov(e)});yu.watch(e=>{Nr.callRemote("setFilterQuery",e)});var Bf=ze(""),wu=Ee();Bf.on(wu,(e,t)=>t);Jg({source:wu,timeout:60,target:Df});var iv=ze([]),Rn=ze({}),Xw=ze({}),Sl=ze([]),lv=sr({clock:yu,source:Vr([Rn,Sl,iv,yu]),fn:([e,t,n,r])=>{let o=qg(r),i=[],l=[];return[...t,...n].forEach(s=>{o(e[s])?i.push(s):l.push(s)}),{passed:i,notPassed:l}}});sr({clock:lv,fn:e=>e.passed,target:Sl});sr({clock:lv,fn:e=>e.notPassed,target:iv});var Su=Ee(),lo=Ee();Rn.on(Su,(e,t)=>t?(t.payload&&t.payload.length>200&&(t.payloadShort=t.payload.slice(0,200)),{...e,[t.id]:t}):e).reset(lo);Xw.on(Su,(e,t)=>!t||t.kind!=="store"||t.op!=="unit-watch"||!t.payload?e:{...e,[t.name]:[...e[t.name]||[],[t.id,JSON.parse(t.payload)]]}).reset(lo);Sl.on(Su,(e,t)=>t?[...e,t.id]:e).reset(lo);Nr.subscribe(()=>{Nr.callRemote("isReady")});Nr.ns("logs").subscribe(Su);var sv=me(he()),xu=({children:e})=>sv.default.createElement("div",{className:"ed-toolbar"},e);var uv=()=>{let e=xn(Hf),t=xn(rv),n=xn(Bf);return Yt.default.createElement(xu,null,Yt.default.createElement("a",{className:Mn("ed-btn",e?"ed-btn-enabled":"ed-btn-disabled"),onClick:()=>jf()},e?Yt.default.createElement(Zg,null):Yt.default.createElement(Yg,null)),Yt.default.createElement("a",{className:"ed-btn",onClick:()=>lo()},Yt.default.createElement(Xg,null)),Yt.default.createElement("div",{className:"ed-toolbar-separator"}),Yt.default.createElement("div",{className:"ed-toolbar-input"},Yt.default.createElement("input",{placeholder:"Filter",value:n,onChange:r=>wu(r.target.value)})),Yt.default.createElement("div",{className:"ed-toolbar-space"}),Yt.default.createElement("div",{className:"ed-toolbar-text",title:t.join(`\n`)},"Subscriptions: ",t.length))};var Eu=ze(!1),Uf=Ee();Eu.on(Uf,(e,t)=>t).reset(lo);var Vf=ze("preview"),Wf=Ee();Vf.on(Wf,(e,t)=>t);var av=sr({source:Vr([Rn,Eu]),fn:([e,t])=>t?e[t]:null});var mo=me(he());var Pn=me(he());var Mv=me(bv(),1);var ed=Mv.default;function Lv(e){let t={className:"attr",begin:/"(\\\\.|[^\\\\"\\r\\n])*"(?=\\s*:)/,relevance:1.01},n={match:/[{}[\\],:]/,className:"punctuation",relevance:0},r=["true","false","null"],o={scope:"literal",beginKeywords:r.join(" ")};return{name:"JSON",keywords:{literal:r},contains:[t,n,e.QUOTE_STRING_MODE,o,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\\\S"}}var ht=me(he());ed.registerLanguage("json",Lv);var US=({data:e,indent:t})=>{if(!e)return null;let[n,r]=(0,ht.useState)(""),[o,i]=(0,ht.useTransition)();return(0,ht.useEffect)(()=>{i(()=>{let l=t?JSON.stringify(JSON.parse(e),null,2):e,s=ed.highlight(l,{language:"json"}).value;r(s)})},[e]),ht.default.createElement("div",null,ht.default.createElement("pre",null,(!n||o)&&ht.default.createElement("code",null,"Rendering.."),n&&ht.default.createElement("code",{dangerouslySetInnerHTML:{__html:n}})))},td=({preview:e})=>{let{selected:t}=(0,ht.useContext)(kt),n=Io({store:Rn,keys:[t],fn:(r,[o])=>r[o]});return n?ht.default.createElement("div",{className:Mn("ed-details-body-code",{"ed-details-body-code-raw":!e})},n.payload&&ht.default.createElement(US,{data:n.payload,indent:e})):null};var _n=me(he());var Nv=()=>{let[e,t]=(0,_n.useState)(!1),[n,r]=(0,_n.useState)(""),o=xn(av);(0,_n.useEffect)(()=>{t(!1)},[t,o]);let i=Io({store:Rn,keys:[o?.name],fn:(l,[s])=>Object.values(l).reduce((u,a)=>(a.name===s&&u.push(a.id),u),[])});return _n.default.createElement("div",{className:"ed-details-body-history"},_n.default.createElement(ui.Provider,{value:i},_n.default.createElement(kt.Provider,{value:{selected:e,setSelected:t,selectedTab:n,setSelectedTab:r,showHistory:!1}},_n.default.createElement(bu,null))))};var nd=me(he()),VS=e=>nd.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},nd.createElement("path",{d:"M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"})),Rv=VS;var ao=me(he());var _v=me(he());var rd={preview:"Preview",payload:"Payload",history:"History"},Mu=()=>{let{selectedTab:e,showHistory:t}=(0,_v.useContext)(kt),n=Object.keys(rd);t||(n=n.filter(o=>o!=="history"));let r=n.includes(e)?e:n[0];return{availableTabs:n,selectedTab:r}};var Pv=()=>{let{setSelected:e,setSelectedTab:t}=(0,ao.useContext)(kt),{availableTabs:n,selectedTab:r}=Mu();return ao.default.createElement(xu,null,ao.default.createElement("a",{className:"ed-btn",onClick:()=>e(!1)},ao.default.createElement(Rv,null)),n.map(o=>ao.default.createElement("a",{className:Mn("ed-tab-header",{"ed-tab-header--selected":r===o}),onClick:()=>t(o)},rd[o])))};var WS=()=>{let{selectedTab:e}=Mu();return Pn.default.createElement("div",{className:"ed-details-body"},e==="preview"&&Pn.default.createElement(td,{preview:!0}),e==="payload"&&Pn.default.createElement(td,null),e==="history"&&Pn.default.createElement(Nv,null))},Ov=()=>{let{selected:e}=(0,Pn.useContext)(kt);return e?Pn.default.createElement("div",{className:"ed-details"},Pn.default.createElement(Pv,null),Pn.default.createElement(WS,null)):null};var Ar=me(he());var zv=function(){};var Lu=typeof window<"u";var Nu=me(he());var $S=Lu?Nu.useLayoutEffect:Nu.useEffect,Av=$S;var Tl=me(he());var Fv={x:0,y:0,width:0,height:0,top:0,left:0,bottom:0,right:0};function GS(){var e=(0,Tl.useState)(null),t=e[0],n=e[1],r=(0,Tl.useState)(Fv),o=r[0],i=r[1],l=(0,Tl.useMemo)(function(){return new window.ResizeObserver(function(s){if(s[0]){var u=s[0].contentRect,a=u.x,c=u.y,h=u.width,y=u.height,m=u.top,d=u.left,v=u.bottom,E=u.right;i({x:a,y:c,width:h,height:y,top:m,left:d,bottom:v,right:E})}})},[]);return Av(function(){if(!!t)return l.observe(t),function(){l.disconnect()}},[t]),[n,o]}var od=Lu&&typeof window.ResizeObserver<"u"?GS:function(){return[zv,Fv]};var Xe=me(he());var Le=me(he());var Ru=0,_r=1,ai=2,Hv=4;function ci(e,t){return function(n){return e(t(n))}}function QS(e,t){return t(e)}function id(e,t){return function(n){return e(t,n)}}function ld(e,t){return function(){return e(t)}}function fi(e,t){return t(e),e}function Se(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t}function KS(e){e()}function sd(e){return function(){return e}}function ZS(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(){t.map(KS)}}function Pr(){}function re(e,t){return e(_r,t)}function le(e,t){e(Ru,t)}function _u(e){e(ai)}function Xt(e){return e(Hv)}function D(e,t){return re(e,id(t,Ru))}function Or(e,t){var n=e(_r,function(r){n(),t(r)});return n}function U(){var e=[];return function(t,n){switch(t){case ai:e.splice(0,e.length);return;case _r:return e.push(n),function(){var r=e.indexOf(n);r>-1&&e.splice(r,1)};case Ru:e.slice().forEach(function(r){r(n)});return;default:throw new Error("unrecognized action "+t)}}}function R(e){var t=e,n=U();return function(r,o){switch(r){case _r:var i=o;i(t);break;case Ru:t=o;break;case Hv:return t}return n(r,o)}}function jv(e){var t,n,r=function(){return t&&t()};return function(o,i){switch(o){case _r:return i?n===i?void 0:(r(),n=i,t=re(e,i),t):(r(),Pr);case ai:r(),n=null;return;default:throw new Error("unrecognized action "+o)}}}function Ct(e){return fi(U(),function(t){return D(e,t)})}function lt(e,t){return fi(R(t),function(n){return D(e,n)})}function YS(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduceRight(QS,r)}}function M(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=YS.apply(void 0,n);return function(i,l){switch(i){case _r:return re(e,o(l));case ai:_u(e);return;default:throw new Error("unrecognized action "+i)}}}function Dv(e,t){return e===t}function Ce(e){e===void 0&&(e=Dv);var t;return function(n){return function(r){e(t,r)||(t=r,n(r))}}}function K(e){return function(t){return function(n){e(n)&&t(n)}}}function z(e){return function(t){return ci(t,e)}}function qn(e){return function(t){return function(){return t(e)}}}function On(e,t){return function(n){return function(r){return n(t=e(t,r))}}}function Il(e){return function(t){return function(n){e>0?e--:t(n)}}}function co(e){var t,n;return function(r){return function(o){t=o,!n&&(n=setTimeout(function(){n=void 0,r(t)},e))}}}function ud(e){var t,n;return function(r){return function(o){t=o,n&&clearTimeout(n),n=setTimeout(function(){r(t)},e)}}}function ee(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=new Array(t.length),o=0,i=null,l=Math.pow(2,t.length)-1;return t.forEach(function(s,u){var a=Math.pow(2,u);re(s,function(c){var h=o;o=o|a,r[u]=c,h!==l&&o===l&&i&&(i(),i=null)})}),function(s){return function(u){var a=function(){return s([u].concat(r))};o===l?a():i=a}}}function ad(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r,o){switch(r){case _r:return ZS.apply(void 0,t.map(function(i){return re(i,o)}));case ai:return;default:throw new Error("unrecognized action "+r)}}}function q(e,t){return t===void 0&&(t=Dv),M(e,Ce(t))}function Ve(){for(var e=U(),t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=new Array(n.length),i=0,l=Math.pow(2,n.length)-1;return n.forEach(function(s,u){var a=Math.pow(2,u);re(s,function(c){o[u]=c,i=i|a,i===l&&le(e,o)})}),function(s,u){switch(s){case _r:return i===l&&u(o),re(e,u);case ai:return _u(e);default:throw new Error("unrecognized action "+s)}}}function se(e,t,n){t===void 0&&(t=[]);var r=n===void 0?{singleton:!0}:n,o=r.singleton;return{id:XS(),constructor:e,dependencies:t,singleton:o}}var XS=function(){return Symbol()};function Bv(e){var t=new Map,n=function r(o){var i=o.id,l=o.constructor,s=o.dependencies,u=o.singleton;if(u&&t.has(i))return t.get(i);var a=l(s.map(function(c){return r(c)}));return u&&t.set(i,a),a};return n(e)}function qS(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function ex(e,t){if(!!e){if(typeof e=="string")return Uv(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Uv(e,t)}}function Uv(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function cd(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=ex(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var tx=["children"];function nx(e,t){for(var n={},r={},o=0,i=e.length;o<i;)r[e[o]]=1,o+=1;for(var l in t)r.hasOwnProperty(l)||(n[l]=t[l]);return n}var Pu=typeof document<"u"?Le.useLayoutEffect:Le.useEffect;function Ou(e,t,n){var r=Object.keys(t.required||{}),o=Object.keys(t.optional||{}),i=Object.keys(t.methods||{}),l=Object.keys(t.events||{}),s=(0,Le.createContext)({});function u(v,E){v.propsReady&&le(v.propsReady,!1);for(var g=cd(r),p;!(p=g()).done;){var f=p.value,w=v[t.required[f]];le(w,E[f])}for(var S=cd(o),x;!(x=S()).done;){var k=x.value;if(k in E){var C=v[t.optional[k]];le(C,E[k])}}v.propsReady&&le(v.propsReady,!0)}function a(v){return i.reduce(function(E,g){return E[g]=function(p){var f=v[t.methods[g]];le(f,p)},E},{})}function c(v){return l.reduce(function(E,g){return E[g]=jv(v[t.events[g]]),E},{})}var h=(0,Le.forwardRef)(function(v,E){var g=v.children,p=qS(v,tx),f=(0,Le.useState)(function(){return fi(Bv(e),function(k){return u(k,p)})}),w=f[0],S=(0,Le.useState)(ld(c,w)),x=S[0];return Pu(function(){for(var k=cd(l),C;!(C=k()).done;){var I=C.value;I in p&&re(x[I],p[I])}return function(){Object.values(x).map(_u)}},[p,x,w]),Pu(function(){u(w,p)}),(0,Le.useImperativeHandle)(E,sd(a(w))),(0,Le.createElement)(s.Provider,{value:w},n?(0,Le.createElement)(n,nx([].concat(r,o,l),p),g):g)}),y=function(E){return(0,Le.useCallback)(id(le,(0,Le.useContext)(s)[E]),[E])},m=function(E){var g=(0,Le.useContext)(s),p=g[E],f=(0,Le.useState)(ld(Xt,p)),w=f[0],S=f[1];return Pu(function(){return re(p,function(x){x!==w&&S(sd(x))})},[p,w]),w},d=function(E,g){var p=(0,Le.useContext)(s),f=p[E];Pu(function(){return re(f,g)},[g,f])};return{Component:h,usePublisher:y,useEmitterValue:m,useEmitter:d}}var F=me(he()),V=me(he()),t0=me(Lf());function G(){return G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},G.apply(this,arguments)}function pi(e,t){if(e==null)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(o[n]=e[n]);return o}function Vv(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function fo(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(o,i){if(o){if(typeof o=="string")return Vv(o,i);var l=Object.prototype.toString.call(o).slice(8,-1);return l==="Object"&&o.constructor&&(l=o.constructor.name),l==="Map"||l==="Set"?Array.from(o):l==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l)?Vv(o,i):void 0}}(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var bl,Fe,rx=typeof document<"u"?V.useLayoutEffect:V.useEffect;(function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR"})(Fe||(Fe={}));var ox=((bl={})[Fe.DEBUG]="debug",bl[Fe.INFO]="log",bl[Fe.WARN]="warn",bl[Fe.ERROR]="error",bl),zr=se(function(){var e=R(Fe.ERROR);return{log:R(function(t,n,r){var o;r===void 0&&(r=Fe.INFO),r>=((o=(typeof globalThis>"u"?window:globalThis).VIRTUOSO_LOG_LEVEL)!=null?o:Xt(e))&&console[ox[r]]("%creact-virtuoso: %c%s %o","color: #0253b3; font-weight: bold","color: initial",t,n)}),logLevel:e}},[],{singleton:!0});function wd(e,t){t===void 0&&(t=!0);var n=(0,V.useRef)(null),r=function(i){};if(typeof ResizeObserver<"u"){var o=new ResizeObserver(function(i){var l=i[0].target;l.offsetParent!==null&&e(l)});r=function(i){i&&t?(o.observe(i),n.current=i):(n.current&&o.unobserve(n.current),n.current=null)}}return{ref:n,callbackRef:r}}function An(e,t){return t===void 0&&(t=!0),wd(e,t).callbackRef}function n0(e,t,n,r,o,i,l){return wd(function(s){for(var u=function(d,v,E,g){var p=d.length;if(p===0)return null;for(var f=[],w=0;w<p;w++){var S=d.item(w);if(S&&S.dataset.index!==void 0){var x=parseInt(S.dataset.index),k=parseFloat(S.dataset.knownSize),C=v(S,"offsetHeight");if(C===0&&g("Zero-sized element, this should not happen",{child:S},Fe.ERROR),C!==k){var I=f[f.length-1];f.length===0||I.size!==C||I.endIndex!==x-1?f.push({startIndex:x,endIndex:x,size:C}):f[f.length-1].endIndex++}}}return f}(s.children,t,0,o),a=s.parentElement;!a.dataset.virtuosoScroller;)a=a.parentElement;var c=a.firstElementChild.dataset.viewportType==="window",h=l?l.scrollTop:c?window.pageYOffset||document.documentElement.scrollTop:a.scrollTop,y=l?l.scrollHeight:c?document.documentElement.scrollHeight:a.scrollHeight,m=l?l.offsetHeight:c?window.innerHeight:a.offsetHeight;r({scrollTop:Math.max(h,0),scrollHeight:y,viewportHeight:m}),i?.(function(d,v,E){return v==="normal"||v!=null&&v.endsWith("px")||E("row-gap was not resolved to pixel value correctly",v,Fe.WARN),v==="normal"?0:parseInt(v??"0",10)}(0,getComputedStyle(s).rowGap,o)),u!==null&&e(u)},n)}function gn(e,t){return Math.round(e.getBoundingClientRect()[t])}function r0(e,t){return Math.abs(e-t)<1.01}function o0(e,t,n,r,o){r===void 0&&(r=Pr);var i=(0,V.useRef)(null),l=(0,V.useRef)(null),s=(0,V.useRef)(null),u=(0,V.useRef)(!1),a=(0,V.useCallback)(function(c){var h=c.target,y=h===window||h===document,m=y?window.pageYOffset||document.documentElement.scrollTop:h.scrollTop,d=y?document.documentElement.scrollHeight:h.scrollHeight,v=y?window.innerHeight:h.offsetHeight,E=function(){e({scrollTop:Math.max(m,0),scrollHeight:d,viewportHeight:v})};u.current?(0,t0.flushSync)(E):E(),u.current=!1,l.current!==null&&(m===l.current||m<=0||m===d-v)&&(l.current=null,t(!0),s.current&&(clearTimeout(s.current),s.current=null))},[e,t]);return(0,V.useEffect)(function(){var c=o||i.current;return r(o||i.current),a({target:c}),c.addEventListener("scroll",a,{passive:!0}),function(){r(null),c.removeEventListener("scroll",a)}},[i,a,n,r,o]),{scrollerRef:i,scrollByCallback:function(c){u.current=!0,i.current.scrollBy(c)},scrollToCallback:function(c){var h=i.current;if(h&&(!("offsetHeight"in h)||h.offsetHeight!==0)){var y,m,d,v=c.behavior==="smooth";if(h===window?(m=Math.max(gn(document.documentElement,"height"),document.documentElement.scrollHeight),y=window.innerHeight,d=document.documentElement.scrollTop):(m=h.scrollHeight,y=gn(h,"height"),d=h.scrollTop),c.top=Math.ceil(Math.max(Math.min(m-y,c.top),0)),r0(y,m)||c.top===d)return e({scrollTop:d,scrollHeight:m,viewportHeight:y}),void(v&&t(!0));v?(l.current=c.top,s.current&&clearTimeout(s.current),s.current=setTimeout(function(){s.current=null,l.current=null,t(!0)},1e3)):l.current=null,h.scrollTo(c)}}}}var Tt=se(function(){var e=U(),t=U(),n=R(0),r=U(),o=R(0),i=U(),l=U(),s=R(0),u=R(0),a=R(0),c=R(0),h=U(),y=U(),m=R(!1),d=R(!1);return D(M(e,z(function(v){return v.scrollTop})),t),D(M(e,z(function(v){return v.scrollHeight})),l),D(t,o),{scrollContainerState:e,scrollTop:t,viewportHeight:i,headerHeight:s,fixedHeaderHeight:u,fixedFooterHeight:a,footerHeight:c,scrollHeight:l,smoothScrollTargetReached:r,react18ConcurrentRendering:d,scrollTo:h,scrollBy:y,statefulScrollTop:o,deviation:n,scrollingInProgress:m}},[],{singleton:!0}),Nl={lvl:0};function i0(e,t,n,r,o){return r===void 0&&(r=Nl),o===void 0&&(o=Nl),{k:e,v:t,lvl:n,l:r,r:o}}function xe(e){return e===Nl}function Ml(){return Nl}function md(e,t){if(xe(e))return Nl;var n=e.k,r=e.l,o=e.r;if(t===n){if(xe(r))return o;if(xe(o))return r;var i=l0(r);return gd(Ye(e,{k:i[0],v:i[1],l:s0(r)}))}return gd(Ye(e,t<n?{l:md(r,t)}:{r:md(o,t)}))}function Fn(e,t,n){if(n===void 0&&(n="k"),xe(e))return[-1/0,void 0];if(e[n]===t)return[e.k,e.v];if(e[n]<t){var r=Fn(e.r,t,n);return r[0]===-1/0?[e.k,e.v]:r}return Fn(e.l,t,n)}function zn(e,t,n){return xe(e)?i0(t,n,1):t===e.k?Ye(e,{k:t,v:n}):function(r){return vd(a0(r))}(Ye(e,t<e.k?{l:zn(e.l,t,n)}:{r:zn(e.r,t,n)}))}function hd(e,t,n){if(xe(e))return[];var r=e.k,o=e.v,i=e.r,l=[];return r>t&&(l=l.concat(hd(e.l,t,n))),r>=t&&r<=n&&l.push({k:r,v:o}),r<=n&&(l=l.concat(hd(i,t,n))),l}function Au(e){return xe(e)?[]:[].concat(Au(e.l),[{k:e.k,v:e.v}],Au(e.r))}function l0(e){return xe(e.r)?[e.k,e.v]:l0(e.r)}function s0(e){return xe(e.r)?e.l:gd(Ye(e,{r:s0(e.r)}))}function Ye(e,t){return i0(t.k!==void 0?t.k:e.k,t.v!==void 0?t.v:e.v,t.lvl!==void 0?t.lvl:e.lvl,t.l!==void 0?t.l:e.l,t.r!==void 0?t.r:e.r)}function fd(e){return xe(e)||e.lvl>e.r.lvl}function gd(e){var t=e.l,n=e.r,r=e.lvl;if(n.lvl>=r-1&&t.lvl>=r-1)return e;if(r>n.lvl+1){if(fd(t))return a0(Ye(e,{lvl:r-1}));if(xe(t)||xe(t.r))throw new Error("Unexpected empty nodes");return Ye(t.r,{l:Ye(t,{r:t.r.l}),r:Ye(e,{l:t.r.r,lvl:r-1}),lvl:r})}if(fd(e))return vd(Ye(e,{lvl:r-1}));if(xe(n)||xe(n.l))throw new Error("Unexpected empty nodes");var o=n.l,i=fd(o)?n.lvl-1:n.lvl;return Ye(o,{l:Ye(e,{r:o.l,lvl:r-1}),r:vd(Ye(n,{l:o.r,lvl:i})),lvl:o.lvl+1})}function Hu(e,t,n){return xe(e)?[]:u0(hd(e,Fn(e,t)[0],n),function(r){return{index:r.k,value:r.v}})}function u0(e,t){var n=e.length;if(n===0)return[];for(var r=t(e[0]),o=r.index,i=r.value,l=[],s=1;s<n;s++){var u=t(e[s]),a=u.index,c=u.value;l.push({start:o,end:a-1,value:i}),o=a,i=c}return l.push({start:o,end:1/0,value:i}),l}function vd(e){var t=e.r,n=e.lvl;return xe(t)||xe(t.r)||t.lvl!==n||t.r.lvl!==n?e:Ye(t,{l:Ye(e,{r:t.l}),lvl:n+1})}function a0(e){var t=e.l;return xe(t)||t.lvl!==e.lvl?e:Ye(t,{r:Ye(e,{l:t.r})})}function Fu(e,t,n,r){r===void 0&&(r=0);for(var o=e.length-1;r<=o;){var i=Math.floor((r+o)/2),l=n(e[i],t);if(l===0)return i;if(l===-1){if(o-r<2)return i-1;o=i-1}else{if(o===r)return i;r=i+1}}throw new Error("Failed binary finding record in array - "+e.join(",")+", searched for "+t)}function c0(e,t,n){return e[Fu(e,t,n)]}var Sd=se(function(){return{recalcInProgress:R(!1)}},[],{singleton:!0});function ix(e){var t=e.size,n=e.startIndex,r=e.endIndex;return function(o){return o.start===n&&(o.end===r||o.end===1/0)&&o.value===t}}function xd(e,t){var n=e.index;return t===n?0:t<n?-1:1}function lx(e,t){var n=e.offset;return t===n?0:t<n?-1:1}function sx(e){return{index:e.index,value:e}}function f0(e,t,n,r){var o=e,i=0,l=0,s=0,u=0;if(t!==0){s=o[u=Fu(o,t-1,xd)].offset;var a=Fn(n,t-1);i=a[0],l=a[1],o.length&&o[u].size===Fn(n,t)[1]&&(u-=1),o=o.slice(0,u+1)}else o=[];for(var c,h=fo(Hu(n,t,1/0));!(c=h()).done;){var y=c.value,m=y.start,d=y.value,v=m-i,E=v*l+s+v*r;o.push({offset:E,size:d,index:m}),i=m,s=E,l=d}return{offsetTree:o,lastIndex:i,lastOffset:s,lastSize:l}}function ux(e,t){var n=t[0],r=t[1],o=t[3];n.length>0&&(0,t[2])("received item sizes",n,Fe.DEBUG);var i=e.sizeTree,l=i,s=0;if(r.length>0&&xe(i)&&n.length===2){var u=n[0].size,a=n[1].size;l=r.reduce(function(m,d){return zn(zn(m,d,u),d+1,a)},l)}else{var c=function(m,d){for(var v,E=xe(m)?0:1/0,g=fo(d);!(v=g()).done;){var p=v.value,f=p.size,w=p.startIndex,S=p.endIndex;if(E=Math.min(E,w),xe(m))m=zn(m,0,f);else{var x=Hu(m,w-1,S+1);if(!x.some(ix(p))){for(var k,C=!1,I=!1,L=fo(x);!(k=L()).done;){var B=k.value,Z=B.start,ue=B.end,pe=B.value;C?(S>=Z||f===pe)&&(m=md(m,Z)):(I=pe!==f,C=!0),ue>S&&S>=Z&&pe!==f&&(m=zn(m,S+1,pe))}I&&(m=zn(m,w,f))}}}return[m,E]}(l,n);l=c[0],s=c[1]}if(l===i)return e;var h=f0(e.offsetTree,s,l,o),y=h.offsetTree;return{sizeTree:l,offsetTree:y,lastIndex:h.lastIndex,lastOffset:h.lastOffset,lastSize:h.lastSize,groupOffsetTree:r.reduce(function(m,d){return zn(m,d,Rl(d,y,o))},Ml()),groupIndices:r}}function Rl(e,t,n){if(t.length===0)return 0;var r=c0(t,e,xd),o=e-r.index,i=r.size*o+(o-1)*n+r.offset;return i>0?i+n:i}function d0(e,t,n){if(function(o){return o.groupIndex!==void 0}(e))return t.groupIndices[e.groupIndex]+1;var r=p0(e.index==="LAST"?n:e.index,t);return Math.max(0,r,Math.min(n,r))}function p0(e,t){if(!ju(t))return e;for(var n=0;t.groupIndices[n]<=e+n;)n++;return e+n}function ju(e){return!xe(e.groupOffsetTree)}var ax={offsetHeight:"height",offsetWidth:"width"},er=se(function(e){var t=e[0].log,n=e[1].recalcInProgress,r=U(),o=U(),i=lt(o,0),l=U(),s=U(),u=R(0),a=R([]),c=R(void 0),h=R(void 0),y=R(function(S,x){return gn(S,ax[x])}),m=R(void 0),d=R(0),v={offsetTree:[],sizeTree:Ml(),groupOffsetTree:Ml(),lastIndex:0,lastOffset:0,lastSize:0,groupIndices:[]},E=lt(M(r,ee(a,t,d),On(ux,v),Ce()),v);D(M(a,K(function(S){return S.length>0}),ee(E,d),z(function(S){var x=S[0],k=S[1],C=S[2],I=x.reduce(function(L,B,Z){return zn(L,B,Rl(B,k.offsetTree,C)||Z)},Ml());return G({},k,{groupIndices:x,groupOffsetTree:I})})),E),D(M(o,ee(E),K(function(S){return S[0]<S[1].lastIndex}),z(function(S){var x=S[1];return[{startIndex:S[0],endIndex:x.lastIndex,size:x.lastSize}]})),r),D(c,h);var g=lt(M(c,z(function(S){return S===void 0})),!0);D(M(h,K(function(S){return S!==void 0&&xe(Xt(E).sizeTree)}),z(function(S){return[{startIndex:0,endIndex:0,size:S}]})),r);var p=Ct(M(r,ee(E),On(function(S,x){var k=x[1];return{changed:k!==S.sizes,sizes:k}},{changed:!1,sizes:v}),z(function(S){return S.changed})));re(M(u,On(function(S,x){return{diff:S.prev-x,prev:x}},{diff:0,prev:0}),z(function(S){return S.diff})),function(S){S>0?(le(n,!0),le(l,S)):S<0&&le(s,S)}),re(M(u,ee(t)),function(S){S[0]<0&&(0,S[1])("`firstItemIndex` prop should not be set to less than zero. If you don\'t know the total count, just use a very high value",{firstItemIndex:u},Fe.ERROR)});var f=Ct(l);D(M(l,ee(E),z(function(S){var x=S[0],k=S[1];if(k.groupIndices.length>0)throw new Error("Virtuoso: prepending items does not work with groups");return Au(k.sizeTree).reduce(function(C,I){var L=I.k,B=I.v;return{ranges:[].concat(C.ranges,[{startIndex:C.prevIndex,endIndex:L+x-1,size:C.prevSize}]),prevIndex:L+x,prevSize:B}},{ranges:[],prevIndex:0,prevSize:k.lastSize}).ranges})),r);var w=Ct(M(s,ee(E,d),z(function(S){return Rl(-S[0],S[1].offsetTree,S[2])})));return D(M(s,ee(E,d),z(function(S){var x=S[0],k=S[1],C=S[2];if(k.groupIndices.length>0)throw new Error("Virtuoso: shifting items does not work with groups");var I=Au(k.sizeTree).reduce(function(L,B){var Z=B.v;return zn(L,Math.max(0,B.k+x),Z)},Ml());return G({},k,{sizeTree:I},f0(k.offsetTree,0,I,C))})),E),{data:m,totalCount:o,sizeRanges:r,groupIndices:a,defaultItemSize:h,fixedItemSize:c,unshiftWith:l,shiftWith:s,shiftWithOffset:w,beforeUnshiftWith:f,firstItemIndex:u,gap:d,sizes:E,listRefresh:p,statefulTotalCount:i,trackItemSizes:g,itemSize:y}},Se(zr,Sd),{singleton:!0}),cx=typeof document<"u"&&"scrollBehavior"in document.documentElement.style;function m0(e){var t=typeof e=="number"?{index:e}:e;return t.align||(t.align="start"),t.behavior&&cx||(t.behavior="auto"),t.offset||(t.offset=0),t}var Ol=se(function(e){var t=e[0],n=t.sizes,r=t.totalCount,o=t.listRefresh,i=t.gap,l=e[1],s=l.scrollingInProgress,u=l.viewportHeight,a=l.scrollTo,c=l.smoothScrollTargetReached,h=l.headerHeight,y=l.footerHeight,m=l.fixedHeaderHeight,d=l.fixedFooterHeight,v=e[2].log,E=U(),g=R(0),p=null,f=null,w=null;function S(){p&&(p(),p=null),w&&(w(),w=null),f&&(clearTimeout(f),f=null),le(s,!1)}return D(M(E,ee(n,u,r,g,h,y,v),ee(i,m,d),z(function(x){var k=x[0],C=k[0],I=k[1],L=k[2],B=k[3],Z=k[4],ue=k[5],pe=k[6],j=k[7],T=x[1],P=x[2],W=x[3],Y=m0(C),de=Y.align,Oe=Y.behavior,We=Y.offset,Ft=B-1,_=d0(Y,I,Ft),$=Rl(_,I.offsetTree,T)+ue;de==="end"?($+=P+Fn(I.sizeTree,_)[1]-L+W,_===Ft&&($+=pe)):de==="center"?$+=(P+Fn(I.sizeTree,_)[1]-L+W)/2:$-=Z,We&&($+=We);var $e=function(gt){S(),gt?(j("retrying to scroll to",{location:C},Fe.DEBUG),le(E,C)):j("list did not change, scroll successful",{},Fe.DEBUG)};if(S(),Oe==="smooth"){var st=!1;w=re(o,function(gt){st=st||gt}),p=Or(c,function(){$e(st)})}else p=Or(M(o,function(gt){var Ht=setTimeout(function(){gt(!1)},150);return function(ut){ut&&(gt(!0),clearTimeout(Ht))}}),$e);return f=setTimeout(function(){S()},1200),le(s,!0),j("scrolling from index to",{index:_,top:$,behavior:Oe},Fe.DEBUG),{top:$,behavior:Oe}})),a),{scrollToIndex:E,topListHeight:g}},Se(er,Tt,zr),{singleton:!0}),_l="up",fx={atBottom:!1,notAtBottomBecause:"NOT_SHOWING_LAST_ITEM",state:{offsetBottom:0,scrollTop:0,viewportHeight:0,scrollHeight:0}},zl=se(function(e){var t=e[0],n=t.scrollContainerState,r=t.scrollTop,o=t.viewportHeight,i=t.headerHeight,l=t.footerHeight,s=t.scrollBy,u=R(!1),a=R(!0),c=U(),h=U(),y=R(4),m=R(0),d=lt(M(ad(M(q(r),Il(1),qn(!0)),M(q(r),Il(1),qn(!1),ud(100))),Ce()),!1),v=lt(M(ad(M(s,qn(!0)),M(s,qn(!1),ud(200))),Ce()),!1);D(M(Ve(q(r),q(m)),z(function(w){return w[0]<=w[1]}),Ce()),a),D(M(a,co(50)),h);var E=Ct(M(Ve(n,q(o),q(i),q(l),q(y)),On(function(w,S){var x,k,C=S[0],I=C.scrollTop,L=C.scrollHeight,B=S[1],Z={viewportHeight:B,scrollTop:I,scrollHeight:L};return I+B-L>-S[4]?(I>w.state.scrollTop?(x="SCROLLED_DOWN",k=w.state.scrollTop-I):(x="SIZE_DECREASED",k=w.state.scrollTop-I||w.scrollTopDelta),{atBottom:!0,state:Z,atBottomBecause:x,scrollTopDelta:k}):{atBottom:!1,notAtBottomBecause:Z.scrollHeight>w.state.scrollHeight?"SIZE_INCREASED":B<w.state.viewportHeight?"VIEWPORT_HEIGHT_DECREASING":I<w.state.scrollTop?"SCROLLING_UPWARDS":"NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM",state:Z}},fx),Ce(function(w,S){return w&&w.atBottom===S.atBottom}))),g=lt(M(n,On(function(w,S){var x=S.scrollTop,k=S.scrollHeight,C=S.viewportHeight;return r0(w.scrollHeight,k)?{scrollTop:x,scrollHeight:k,jump:0,changed:!1}:w.scrollTop!==x&&k-(x+C)<1?{scrollHeight:k,scrollTop:x,jump:w.scrollTop-x,changed:!0}:{scrollHeight:k,scrollTop:x,jump:0,changed:!0}},{scrollHeight:0,jump:0,scrollTop:0,changed:!1}),K(function(w){return w.changed}),z(function(w){return w.jump})),0);D(M(E,z(function(w){return w.atBottom})),u),D(M(u,co(50)),c);var p=R("down");D(M(n,z(function(w){return w.scrollTop}),Ce(),On(function(w,S){return Xt(v)?{direction:w.direction,prevScrollTop:S}:{direction:S<w.prevScrollTop?_l:"down",prevScrollTop:S}},{direction:"down",prevScrollTop:0}),z(function(w){return w.direction})),p),D(M(n,co(50),qn("none")),p);var f=R(0);return D(M(d,K(function(w){return!w}),qn(0)),f),D(M(r,co(100),ee(d),K(function(w){return!!w[1]}),On(function(w,S){return[w[1],S[0]]},[0,0]),z(function(w){return w[1]-w[0]})),f),{isScrolling:d,isAtTop:a,isAtBottom:u,atBottomState:E,atTopStateChange:h,atBottomStateChange:c,scrollDirection:p,atBottomThreshold:y,atTopThreshold:m,scrollVelocity:f,lastJumpDueToItemResize:g}},Se(Tt)),po=se(function(e){var t=e[0].log,n=R(!1),r=Ct(M(n,K(function(o){return o}),Ce()));return re(n,function(o){o&&Xt(t)("props updated",{},Fe.DEBUG)}),{propsReady:n,didMount:r}},Se(zr),{singleton:!0}),Ed=se(function(e){var t=e[0],n=t.sizes,r=t.listRefresh,o=t.defaultItemSize,i=e[1].scrollTop,l=e[2].scrollToIndex,s=e[3].didMount,u=R(!0),a=R(0);return D(M(s,ee(a),K(function(c){return!!c[1]}),qn(!1)),u),re(M(Ve(r,s),ee(u,n,o),K(function(c){var h=c[1],y=c[3];return c[0][1]&&(!xe(c[2].sizeTree)||y!==void 0)&&!h}),ee(a)),function(c){var h=c[1];setTimeout(function(){Or(i,function(){le(u,!0)}),le(l,h)})}),{scrolledToInitialItem:u,initialTopMostItemIndex:a}},Se(er,Tt,Ol,po),{singleton:!0});function Wv(e){return!!e&&(e==="smooth"?"smooth":"auto")}var dx=se(function(e){var t=e[0],n=t.totalCount,r=t.listRefresh,o=e[1],i=o.isAtBottom,l=o.atBottomState,s=e[2].scrollToIndex,u=e[3].scrolledToInitialItem,a=e[4],c=a.propsReady,h=a.didMount,y=e[5].log,m=e[6].scrollingInProgress,d=R(!1),v=U(),E=null;function g(f){le(s,{index:"LAST",align:"end",behavior:f})}function p(f){var w=Or(l,function(S){!f||S.atBottom||S.notAtBottomBecause!=="SIZE_INCREASED"||E||(Xt(y)("scrolling to bottom due to increased size",{},Fe.DEBUG),g("auto"))});setTimeout(w,100)}return re(M(Ve(M(q(n),Il(1)),h),ee(q(d),i,u,m),z(function(f){var w=f[0],S=w[0],x=w[1]&&f[3],k="auto";return x&&(k=function(C,I){return typeof C=="function"?Wv(C(I)):I&&Wv(C)}(f[1],f[2]||f[4]),x=x&&!!k),{totalCount:S,shouldFollow:x,followOutputBehavior:k}}),K(function(f){return f.shouldFollow})),function(f){var w=f.totalCount,S=f.followOutputBehavior;E&&(E(),E=null),E=Or(r,function(){Xt(y)("following output to ",{totalCount:w},Fe.DEBUG),g(S),E=null})}),re(M(Ve(q(d),n,c),K(function(f){return f[0]&&f[2]}),On(function(f,w){var S=w[1];return{refreshed:f.value===S,value:S}},{refreshed:!1,value:0}),K(function(f){return f.refreshed}),ee(d,n)),function(f){p(f[1]!==!1)}),re(v,function(){p(Xt(d)!==!1)}),re(Ve(q(d),l),function(f){var w=f[1];f[0]&&!w.atBottom&&w.notAtBottomBecause==="VIEWPORT_HEIGHT_DECREASING"&&g("auto")}),{followOutput:d,autoscrollToBottom:v}},Se(er,zl,Ol,Ed,po,zr,Tt));function px(e){return e.reduce(function(t,n){return t.groupIndices.push(t.totalCount),t.totalCount+=n+1,t},{totalCount:0,groupIndices:[]})}var h0=se(function(e){var t=e[0],n=t.totalCount,r=t.groupIndices,o=t.sizes,i=e[1],l=i.scrollTop,s=i.headerHeight,u=U(),a=U(),c=Ct(M(u,z(px)));return D(M(c,z(function(h){return h.totalCount})),n),D(M(c,z(function(h){return h.groupIndices})),r),D(M(Ve(l,o,s),K(function(h){return ju(h[1])}),z(function(h){return Fn(h[1].groupOffsetTree,Math.max(h[0]-h[2],0),"v")[0]}),Ce(),z(function(h){return[h]})),a),{groupCounts:u,topItemsIndexes:a}},Se(er,Tt));function Pl(e,t){return!(!e||e[0]!==t[0]||e[1]!==t[1])}function g0(e,t){return!(!e||e.startIndex!==t.startIndex||e.endIndex!==t.endIndex)}function $v(e,t,n){return typeof e=="number"?n===_l&&t==="top"||n==="down"&&t==="bottom"?e:0:n===_l?t==="top"?e.main:e.reverse:t==="bottom"?e.main:e.reverse}function Gv(e,t){return typeof e=="number"?e:e[t]||0}var kd=se(function(e){var t=e[0],n=t.scrollTop,r=t.viewportHeight,o=t.deviation,i=t.headerHeight,l=t.fixedHeaderHeight,s=U(),u=R(0),a=R(0),c=R(0),h=lt(M(Ve(q(n),q(r),q(i),q(s,Pl),q(c),q(u),q(l),q(o),q(a)),z(function(y){var m=y[0],d=y[1],v=y[2],E=y[3],g=E[0],p=E[1],f=y[4],w=y[6],S=y[7],x=y[8],k=m-S,C=y[5]+w,I=Math.max(v-k,0),L="none",B=Gv(x,"top"),Z=Gv(x,"bottom");return g-=S,p+=v+w,(g+=v+w)>m+C-B&&(L=_l),(p-=S)<m-I+d+Z&&(L="down"),L!=="none"?[Math.max(k-v-$v(f,"top",L)-B,0),k-I-w+d+$v(f,"bottom",L)+Z]:null}),K(function(y){return y!=null}),Ce(Pl)),[0,0]);return{listBoundary:s,overscan:c,topListHeight:u,increaseViewportBy:a,visibleRange:h}},Se(Tt),{singleton:!0}),Qv={items:[],topItems:[],offsetTop:0,offsetBottom:0,top:0,bottom:0,topListHeight:0,totalCount:0,firstItemIndex:0};function Kv(e,t,n){if(e.length===0)return[];if(!ju(t))return e.map(function(c){return G({},c,{index:c.index+n,originalIndex:c.index})});for(var r,o=[],i=Hu(t.groupOffsetTree,e[0].index,e[e.length-1].index),l=void 0,s=0,u=fo(e);!(r=u()).done;){var a=r.value;(!l||l.end<a.index)&&(l=i.shift(),s=t.groupIndices.indexOf(l.start)),o.push(G({},a.index===l.start?{type:"group",index:s}:{index:a.index-(s+1)+n,groupIndex:s},{size:a.size,offset:a.offset,originalIndex:a.index,data:a.data}))}return o}function zu(e,t,n,r,o,i){var l=0,s=0;if(e.length>0){l=e[0].offset;var u=e[e.length-1];s=u.offset+u.size}var a=n-o.lastIndex,c=l,h=o.lastOffset+a*o.lastSize+(a-1)*r-s;return{items:Kv(e,o,i),topItems:Kv(t,o,i),topListHeight:t.reduce(function(y,m){return m.size+y},0),offsetTop:l,offsetBottom:h,top:c,bottom:s,totalCount:n,firstItemIndex:i}}var mi=se(function(e){var t=e[0],n=t.sizes,r=t.totalCount,o=t.data,i=t.firstItemIndex,l=t.gap,s=e[1],u=e[2],a=u.visibleRange,c=u.listBoundary,h=u.topListHeight,y=e[3],m=y.scrolledToInitialItem,d=y.initialTopMostItemIndex,v=e[4].topListHeight,E=e[5],g=e[6].didMount,p=e[7].recalcInProgress,f=R([]),w=U();D(s.topItemsIndexes,f);var S=lt(M(Ve(g,p,q(a,Pl),q(r),q(n),q(d),m,q(f),q(i),q(l),o),K(function(x){return x[0]&&!x[1]}),z(function(x){var k=x[2],C=k[0],I=k[1],L=x[3],B=x[5],Z=x[6],ue=x[7],pe=x[8],j=x[9],T=x[10],P=x[4],W=P.sizeTree,Y=P.offsetTree;if(L===0||C===0&&I===0)return G({},Qv,{totalCount:L});if(xe(W))return zu(function(te,Je,Ge){if(ju(Je)){var A=p0(te,Je);return[{index:Fn(Je.groupOffsetTree,A)[0],size:0,offset:0},{index:A,size:0,offset:0,data:Ge&&Ge[0]}]}return[{index:te,size:0,offset:0,data:Ge&&Ge[0]}]}(function(te,Je){return typeof te=="number"?te:te.index==="LAST"?Je-1:te.index}(B,L),P,T),[],L,j,P,pe);var de=[];if(ue.length>0)for(var Oe,We=ue[0],Ft=ue[ue.length-1],_=0,$=fo(Hu(W,We,Ft));!(Oe=$()).done;)for(var $e=Oe.value,st=$e.value,gt=Math.max($e.start,We),Ht=Math.min($e.end,Ft),ut=gt;ut<=Ht;ut++)de.push({index:ut,size:st,offset:_,data:T&&T[ut]}),_+=st;if(!Z)return zu([],de,L,j,P,pe);var jt=ue.length>0?ue[ue.length-1]+1:0,It=function(te,Je,Ge,A){return A===void 0&&(A=0),A>0&&(Je=Math.max(Je,c0(te,A,xd).offset)),u0((ie=Ge,He=Fu(vt=te,Je,X=lx),qe=Fu(vt,ie,X,He),vt.slice(He,qe+1)),sx);var vt,ie,X,He,qe}(Y,C,I,jt);if(It.length===0)return null;var bt=L-1;return zu(fi([],function(te){for(var Je,Ge=fo(It);!(Je=Ge()).done;){var A=Je.value,vt=A.value,ie=vt.offset,X=A.start,He=vt.size;if(vt.offset<C){var qe=(X+=Math.floor((C-vt.offset+j)/(He+j)))-A.start;ie+=qe*He+qe*j}X<jt&&(ie+=(jt-X)*He,X=jt);for(var rr=Math.min(A.end,bt),qt=X;qt<=rr&&!(ie>=I);qt++)te.push({index:qt,size:He,offset:ie,data:T&&T[qt]}),ie+=He+j}}),de,L,j,P,pe)}),K(function(x){return x!==null}),Ce()),Qv);return D(M(o,K(function(x){return x!==void 0}),z(function(x){return x.length})),r),D(M(S,z(function(x){return x.topListHeight})),v),D(v,h),D(M(S,z(function(x){return[x.top,x.bottom]})),c),D(M(S,z(function(x){return x.items})),w),G({listState:S,topItemsIndexes:f,endReached:Ct(M(S,K(function(x){return x.items.length>0}),ee(r,o),K(function(x){var k=x[0].items;return k[k.length-1].originalIndex===x[1]-1}),z(function(x){return[x[1]-1,x[2]]}),Ce(Pl),z(function(x){return x[0]}))),startReached:Ct(M(S,co(200),K(function(x){var k=x.items;return k.length>0&&k[0].originalIndex===x.topItems.length}),z(function(x){return x.items[0].index}),Ce())),rangeChanged:Ct(M(S,K(function(x){return x.items.length>0}),z(function(x){for(var k=x.items,C=0,I=k.length-1;k[C].type==="group"&&C<I;)C++;for(;k[I].type==="group"&&I>C;)I--;return{startIndex:k[C].index,endIndex:k[I].index}}),Ce(g0))),itemsRendered:w},E)},Se(er,h0,kd,Ed,Ol,zl,po,Sd),{singleton:!0}),mx=se(function(e){var t=e[0],n=t.sizes,r=t.firstItemIndex,o=t.data,i=t.gap,l=e[1].listState,s=e[2].didMount,u=R(0);return D(M(s,ee(u),K(function(a){return a[1]!==0}),ee(n,r,i,o),z(function(a){var c=a[0][1],h=a[1],y=a[2],m=a[3],d=a[4],v=d===void 0?[]:d,E=0;if(h.groupIndices.length>0)for(var g,p=fo(h.groupIndices);!((g=p()).done||g.value-E>=c);)E++;var f=c+E;return zu(Array.from({length:f}).map(function(w,S){return{index:S,size:0,offset:0,data:v[S]}}),[],f,m,h,y)})),l),{initialItemCount:u}},Se(er,mi,po),{singleton:!0}),v0=se(function(e){var t=e[0].scrollVelocity,n=R(!1),r=U(),o=R(!1);return D(M(t,ee(o,n,r),K(function(i){return!!i[1]}),z(function(i){var l=i[0],s=i[1],u=i[2],a=i[3],c=s.enter;if(u){if((0,s.exit)(l,a))return!1}else if(c(l,a))return!0;return u}),Ce()),n),re(M(Ve(n,t,r),ee(o)),function(i){var l=i[0],s=i[1];return l[0]&&s&&s.change&&s.change(l[1],l[2])}),{isSeeking:n,scrollSeekConfiguration:o,scrollVelocity:t,scrollSeekRangeChanged:r}},Se(zl),{singleton:!0}),hx=se(function(e){var t=e[0].topItemsIndexes,n=R(0);return D(M(n,K(function(r){return r>0}),z(function(r){return Array.from({length:r}).map(function(o,i){return i})})),t),{topItemCount:n}},Se(mi)),Cd=se(function(e){var t=e[0],n=t.footerHeight,r=t.headerHeight,o=t.fixedHeaderHeight,i=t.fixedFooterHeight,l=e[1].listState,s=U(),u=lt(M(Ve(n,i,r,o,l),z(function(a){var c=a[4];return a[0]+a[1]+a[2]+a[3]+c.offsetBottom+c.bottom})),0);return D(q(u),s),{totalListHeight:u,totalListHeightChanged:s}},Se(Tt,mi),{singleton:!0});function y0(e){var t,n=!1;return function(){return n||(n=!0,t=e()),t}}var gx=y0(function(){return/iP(ad|od|hone)/i.test(navigator.userAgent)&&/WebKit/i.test(navigator.userAgent)}),vx=se(function(e){var t=e[0],n=t.scrollBy,r=t.scrollTop,o=t.deviation,i=t.scrollingInProgress,l=e[1],s=l.isScrolling,u=l.isAtBottom,a=l.scrollDirection,c=e[3],h=c.beforeUnshiftWith,y=c.shiftWithOffset,m=c.sizes,d=c.gap,v=e[4].log,E=e[5].recalcInProgress,g=Ct(M(e[2].listState,ee(l.lastJumpDueToItemResize),On(function(f,w){var S=f[1],x=w[0],k=x.items,C=x.totalCount,I=x.bottom+x.offsetBottom,L=0;return f[2]===C&&S.length>0&&k.length>0&&(k[0].originalIndex===0&&S[0].originalIndex===0||(L=I-f[3])!=0&&(L+=w[1])),[L,k,C,I]},[0,[],0,0]),K(function(f){return f[0]!==0}),ee(r,a,i,u,v),K(function(f){return!f[3]&&f[1]!==0&&f[2]===_l}),z(function(f){var w=f[0][0];return(0,f[5])("Upward scrolling compensation",{amount:w},Fe.DEBUG),w})));function p(f){f>0?(le(n,{top:-f,behavior:"auto"}),le(o,0)):(le(o,0),le(n,{top:-f,behavior:"auto"}))}return re(M(g,ee(o,s)),function(f){var w=f[0],S=f[1];f[2]&&gx()?le(o,S-w):p(-w)}),re(M(Ve(lt(s,!1),o,E),K(function(f){return!f[0]&&!f[2]&&f[1]!==0}),z(function(f){return f[1]}),co(1)),p),D(M(y,z(function(f){return{top:-f}})),n),re(M(h,ee(m,d),z(function(f){var w=f[0];return w*f[1].lastSize+w*f[2]})),function(f){le(o,f),requestAnimationFrame(function(){le(n,{top:f}),requestAnimationFrame(function(){le(o,0),le(E,!1)})})}),{deviation:o}},Se(Tt,zl,mi,er,zr,Sd)),yx=se(function(e){var t=e[0].totalListHeight,n=e[1].didMount,r=e[2].scrollTo,o=R(0);return re(M(n,ee(o),K(function(i){return i[1]!==0}),z(function(i){return{top:i[1]}})),function(i){Or(M(t,K(function(l){return l!==0})),function(){setTimeout(function(){le(r,i)})})}),{initialScrollTop:o}},Se(Cd,po,Tt),{singleton:!0}),wx=se(function(e){var t=e[0].viewportHeight,n=e[1].totalListHeight,r=R(!1);return{alignToBottom:r,paddingTopAddition:lt(M(Ve(r,t,n),K(function(o){return o[0]}),z(function(o){return Math.max(0,o[1]-o[2])}),Ce()),0)}},Se(Tt,Cd),{singleton:!0}),w0=se(function(e){var t=e[0],n=t.scrollTo,r=t.scrollContainerState,o=U(),i=U(),l=U(),s=R(!1),u=R(void 0);return D(M(Ve(o,i),z(function(a){var c=a[0],h=c.viewportHeight,y=c.scrollHeight;return{scrollTop:Math.max(0,c.scrollTop-a[1].offsetTop),scrollHeight:y,viewportHeight:h}})),r),D(M(n,ee(i),z(function(a){var c=a[0];return G({},c,{top:c.top+a[1].offsetTop})})),l),{useWindowScroll:s,customScrollParent:u,windowScrollContainerState:o,windowViewportRect:i,windowScrollTo:l}},Se(Tt)),Sx=["done","behavior","align"],xx=se(function(e){var t=e[0],n=t.sizes,r=t.totalCount,o=t.gap,i=e[1],l=i.scrollTop,s=i.viewportHeight,u=i.headerHeight,a=i.fixedHeaderHeight,c=i.fixedFooterHeight,h=i.scrollingInProgress,y=e[2].scrollToIndex,m=U();return D(M(m,ee(n,s,r,u,a,c,l),ee(o),z(function(d){var v=d[0],E=v[0],g=v[1],p=v[2],f=v[3],w=v[4],S=v[5],x=v[6],k=v[7],C=d[1],I=E.done,L=E.behavior,B=E.align,Z=pi(E,Sx),ue=null,pe=d0(E,g,f-1),j=Rl(pe,g.offsetTree,C)+w+S;return j<k+S?ue=G({},Z,{behavior:L,align:B??"start"}):j+Fn(g.sizeTree,pe)[1]>k+p-x&&(ue=G({},Z,{behavior:L,align:B??"end"})),ue?I&&Or(M(h,Il(1),K(function(T){return T===!1})),I):I&&I(),ue}),K(function(d){return d!==null})),y),{scrollIntoView:m}},Se(er,Tt,Ol,mi,zr),{singleton:!0}),Ex=["listState","topItemsIndexes"],kx=se(function(e){return G({},e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])},Se(kd,mx,po,v0,Cd,yx,wx,w0,xx)),S0=se(function(e){var t=e[0],n=t.totalCount,r=t.sizeRanges,o=t.fixedItemSize,i=t.defaultItemSize,l=t.trackItemSizes,s=t.itemSize,u=t.data,a=t.firstItemIndex,c=t.groupIndices,h=t.statefulTotalCount,y=t.gap,m=e[1],d=m.initialTopMostItemIndex,v=m.scrolledToInitialItem,E=e[2],g=e[3],p=e[4],f=p.listState,w=p.topItemsIndexes,S=pi(p,Ex),x=e[5].scrollToIndex,k=e[7].topItemCount,C=e[8].groupCounts,I=e[9],L=e[10];return D(S.rangeChanged,I.scrollSeekRangeChanged),D(M(I.windowViewportRect,z(function(B){return B.visibleHeight})),E.viewportHeight),G({totalCount:n,data:u,firstItemIndex:a,sizeRanges:r,initialTopMostItemIndex:d,scrolledToInitialItem:v,topItemsIndexes:w,topItemCount:k,groupCounts:C,fixedItemHeight:o,defaultItemHeight:i,gap:y},g,{statefulTotalCount:h,listState:f,scrollToIndex:x,trackItemSizes:l,itemSize:s,groupIndices:c},S,I,E,L)},Se(er,Ed,Tt,dx,mi,Ol,vx,hx,h0,kx,zr)),x0=y0(function(){if(typeof document>"u")return"sticky";var e=document.createElement("div");return e.style.position="-webkit-sticky",e.style.position==="-webkit-sticky"?"-webkit-sticky":"sticky"});function Td(e,t){var n=(0,V.useRef)(null),r=(0,V.useCallback)(function(u){if(u!==null&&u.offsetParent){var a,c,h=u.getBoundingClientRect(),y=h.width;if(t){var m=t.getBoundingClientRect(),d=h.top-m.top;a=m.height-Math.max(0,d),c=d+t.scrollTop}else a=window.innerHeight-Math.max(0,h.top),c=h.top+window.pageYOffset;n.current={offsetTop:c,visibleHeight:a,visibleWidth:y},e(n.current)}},[e,t]),o=wd(r),i=o.callbackRef,l=o.ref,s=(0,V.useCallback)(function(){r(l.current)},[r,l]);return(0,V.useEffect)(function(){if(t){t.addEventListener("scroll",s);var u=new ResizeObserver(s);return u.observe(t),function(){t.removeEventListener("scroll",s),u.unobserve(t)}}return window.addEventListener("scroll",s),window.addEventListener("resize",s),function(){window.removeEventListener("scroll",s),window.removeEventListener("resize",s)}},[s,t]),i}var Du=F.createContext(void 0),E0=F.createContext(void 0),Cx=["placeholder"],Tx=["style","children"],Ix=["style","children"];function Id(e){return e}var bx=se(function(){var e=R(function(u){return"Item "+u}),t=R(null),n=R(function(u){return"Group "+u}),r=R({}),o=R(Id),i=R("div"),l=R(Pr),s=function(u,a){return a===void 0&&(a=null),lt(M(r,z(function(c){return c[u]}),Ce()),a)};return{context:t,itemContent:e,groupContent:n,components:r,computeItemKey:o,headerFooterTag:i,scrollerRef:l,FooterComponent:s("Footer"),HeaderComponent:s("Header"),TopItemListComponent:s("TopItemList"),ListComponent:s("List","div"),ItemComponent:s("Item","div"),GroupComponent:s("Group","div"),ScrollerComponent:s("Scroller","div"),EmptyPlaceholder:s("EmptyPlaceholder"),ScrollSeekPlaceholder:s("ScrollSeekPlaceholder")}});function di(e,t){var n=U();return re(n,function(){return console.warn("react-virtuoso: You are using a deprecated property. "+t,"color: red;","color: inherit;","color: blue;")}),D(n,e),n}var Mx=se(function(e){var t=e[0],n=e[1],r={item:di(n.itemContent,"Rename the %citem%c prop to %citemContent."),group:di(n.groupContent,"Rename the %cgroup%c prop to %cgroupContent."),topItems:di(t.topItemCount,"Rename the %ctopItems%c prop to %ctopItemCount."),itemHeight:di(t.fixedItemHeight,"Rename the %citemHeight%c prop to %cfixedItemHeight."),scrollingStateChange:di(t.isScrolling,"Rename the %cscrollingStateChange%c prop to %cisScrolling."),adjustForPrependedItems:U(),maxHeightCacheSize:U(),footer:U(),header:U(),HeaderContainer:U(),FooterContainer:U(),ItemContainer:U(),ScrollContainer:U(),GroupContainer:U(),ListContainer:U(),emptyComponent:U(),scrollSeek:U()};function o(i,l,s){D(M(i,ee(n.components),z(function(u){var a,c=u[0],h=u[1];return console.warn("react-virtuoso: "+s+" property is deprecated. Pass components."+l+" instead."),G({},h,((a={})[l]=c,a))})),n.components)}return re(r.adjustForPrependedItems,function(){console.warn("react-virtuoso: adjustForPrependedItems is no longer supported. Use the firstItemIndex property instead - https://virtuoso.dev/prepend-items.","color: red;","color: inherit;","color: blue;")}),re(r.maxHeightCacheSize,function(){console.warn("react-virtuoso: maxHeightCacheSize is no longer necessary. Setting it has no effect - remove it from your code.")}),re(r.HeaderContainer,function(){console.warn("react-virtuoso: HeaderContainer is deprecated. Use headerFooterTag if you want to change the wrapper of the header component and pass components.Header to change its contents.")}),re(r.FooterContainer,function(){console.warn("react-virtuoso: FooterContainer is deprecated. Use headerFooterTag if you want to change the wrapper of the footer component and pass components.Footer to change its contents.")}),re(r.scrollSeek,function(i){var l=i.placeholder,s=pi(i,Cx);console.warn("react-virtuoso: scrollSeek property is deprecated. Pass scrollSeekConfiguration and specify the placeholder in components.ScrollSeekPlaceholder instead."),le(n.components,G({},Xt(n.components),{ScrollSeekPlaceholder:l})),le(t.scrollSeekConfiguration,s)}),o(r.footer,"Footer","footer"),o(r.header,"Header","header"),o(r.ItemContainer,"Item","ItemContainer"),o(r.ListContainer,"List","ListContainer"),o(r.ScrollContainer,"Scroller","ScrollContainer"),o(r.emptyComponent,"EmptyPlaceholder","emptyComponent"),o(r.GroupContainer,"Group","GroupContainer"),G({},t,n,r)},Se(S0,bx)),Lx=function(e){return F.createElement("div",{style:{height:e.height}})},Nx={position:x0(),zIndex:1,overflowAnchor:"none"},Rx={overflowAnchor:"none"},Zv=F.memo(function(e){var t=e.showTopList,n=t!==void 0&&t,r=oe("listState"),o=Jt("sizeRanges"),i=oe("useWindowScroll"),l=oe("customScrollParent"),s=Jt("windowScrollContainerState"),u=Jt("scrollContainerState"),a=l||i?s:u,c=oe("itemContent"),h=oe("context"),y=oe("groupContent"),m=oe("trackItemSizes"),d=oe("itemSize"),v=oe("log"),E=Jt("gap"),g=n0(o,d,m,n?Pr:a,v,E,l).callbackRef,p=F.useState(0),f=p[0],w=p[1];Ld("deviation",function(j){f!==j&&w(j)});var S=oe("EmptyPlaceholder"),x=oe("ScrollSeekPlaceholder")||Lx,k=oe("ListComponent"),C=oe("ItemComponent"),I=oe("GroupComponent"),L=oe("computeItemKey"),B=oe("isSeeking"),Z=oe("groupIndices").length>0,ue=oe("paddingTopAddition"),pe=n?{}:{boxSizing:"border-box",paddingTop:r.offsetTop+ue,paddingBottom:r.offsetBottom,marginTop:f};return!n&&r.totalCount===0&&S?(0,V.createElement)(S,Pe(S,h)):(0,V.createElement)(k,G({},Pe(k,h),{ref:g,style:pe,"data-test-id":n?"virtuoso-top-item-list":"virtuoso-item-list"}),(n?r.topItems:r.items).map(function(j){var T=j.originalIndex,P=L(T+r.firstItemIndex,j.data,h);return B?(0,V.createElement)(x,G({},Pe(x,h),{key:P,index:j.index,height:j.size,type:j.type||"item"},j.type==="group"?{}:{groupIndex:j.groupIndex})):j.type==="group"?(0,V.createElement)(I,G({},Pe(I,h),{key:P,"data-index":T,"data-known-size":j.size,"data-item-index":j.index,style:Nx}),y(j.index)):(0,V.createElement)(C,G({},Pe(C,h),{key:P,"data-index":T,"data-known-size":j.size,"data-item-index":j.index,"data-item-group-index":j.groupIndex,style:Rx}),Z?c(j.index,j.groupIndex,j.data,h):c(j.index,j.data,h))}))}),_x={height:"100%",outline:"none",overflowY:"auto",position:"relative",WebkitOverflowScrolling:"touch"},hi={width:"100%",height:"100%",position:"absolute",top:0},Px={width:"100%",position:x0(),top:0};function Pe(e,t){if(typeof e!="string")return{context:t}}var Ox=F.memo(function(){var e=oe("HeaderComponent"),t=Jt("headerHeight"),n=oe("headerFooterTag"),r=An(function(i){return t(gn(i,"height"))}),o=oe("context");return e?(0,V.createElement)(n,{ref:r},(0,V.createElement)(e,Pe(e,o))):null}),zx=F.memo(function(){var e=oe("FooterComponent"),t=Jt("footerHeight"),n=oe("headerFooterTag"),r=An(function(i){return t(gn(i,"height"))}),o=oe("context");return e?(0,V.createElement)(n,{ref:r},(0,V.createElement)(e,Pe(e,o))):null});function bd(e){var t=e.usePublisher,n=e.useEmitter,r=e.useEmitterValue;return F.memo(function(o){var i=o.style,l=o.children,s=pi(o,Tx),u=t("scrollContainerState"),a=r("ScrollerComponent"),c=t("smoothScrollTargetReached"),h=r("scrollerRef"),y=r("context"),m=o0(u,c,a,h),d=m.scrollerRef,v=m.scrollByCallback;return n("scrollTo",m.scrollToCallback),n("scrollBy",v),(0,V.createElement)(a,G({ref:d,style:G({},_x,i),"data-test-id":"virtuoso-scroller","data-virtuoso-scroller":!0,tabIndex:0},s,Pe(a,y)),l)})}function Md(e){var t=e.usePublisher,n=e.useEmitter,r=e.useEmitterValue;return F.memo(function(o){var i=o.style,l=o.children,s=pi(o,Ix),u=t("windowScrollContainerState"),a=r("ScrollerComponent"),c=t("smoothScrollTargetReached"),h=r("totalListHeight"),y=r("deviation"),m=r("customScrollParent"),d=r("context"),v=o0(u,c,a,Pr,m),E=v.scrollerRef,g=v.scrollByCallback,p=v.scrollToCallback;return rx(function(){return E.current=m||window,function(){E.current=null}},[E,m]),n("windowScrollTo",p),n("scrollBy",g),(0,V.createElement)(a,G({style:G({position:"relative"},i,h!==0?{height:h+y}:{}),"data-virtuoso-scroller":!0},s,Pe(a,d)),l)})}var Ax=function(e){var t=e.children,n=(0,V.useContext)(Du),r=Jt("viewportHeight"),o=Jt("fixedItemHeight"),i=An(ci(r,function(l){return gn(l,"height")}));return F.useEffect(function(){n&&(r(n.viewportHeight),o(n.itemHeight))},[n,r,o]),F.createElement("div",{style:hi,ref:i,"data-viewport-type":"element"},t)},Fx=function(e){var t=e.children,n=(0,V.useContext)(Du),r=Jt("windowViewportRect"),o=Jt("fixedItemHeight"),i=oe("customScrollParent"),l=Td(r,i);return F.useEffect(function(){n&&(o(n.itemHeight),r({offsetTop:0,visibleHeight:n.viewportHeight,visibleWidth:100}))},[n,r,o]),F.createElement("div",{ref:l,style:hi,"data-viewport-type":"window"},t)},Hx=function(e){var t=e.children,n=oe("TopItemListComponent"),r=oe("headerHeight"),o=G({},Px,{marginTop:r+"px"}),i=oe("context");return(0,V.createElement)(n||"div",{style:o,context:i},t)},Bu=Ou(Mx,{required:{},optional:{context:"context",followOutput:"followOutput",firstItemIndex:"firstItemIndex",itemContent:"itemContent",groupContent:"groupContent",overscan:"overscan",increaseViewportBy:"increaseViewportBy",totalCount:"totalCount",topItemCount:"topItemCount",initialTopMostItemIndex:"initialTopMostItemIndex",components:"components",groupCounts:"groupCounts",atBottomThreshold:"atBottomThreshold",atTopThreshold:"atTopThreshold",computeItemKey:"computeItemKey",defaultItemHeight:"defaultItemHeight",fixedItemHeight:"fixedItemHeight",itemSize:"itemSize",scrollSeekConfiguration:"scrollSeekConfiguration",headerFooterTag:"headerFooterTag",data:"data",initialItemCount:"initialItemCount",initialScrollTop:"initialScrollTop",alignToBottom:"alignToBottom",useWindowScroll:"useWindowScroll",customScrollParent:"customScrollParent",scrollerRef:"scrollerRef",logLevel:"logLevel",react18ConcurrentRendering:"react18ConcurrentRendering",item:"item",group:"group",topItems:"topItems",itemHeight:"itemHeight",scrollingStateChange:"scrollingStateChange",maxHeightCacheSize:"maxHeightCacheSize",footer:"footer",header:"header",ItemContainer:"ItemContainer",ScrollContainer:"ScrollContainer",ListContainer:"ListContainer",GroupContainer:"GroupContainer",emptyComponent:"emptyComponent",HeaderContainer:"HeaderContainer",FooterContainer:"FooterContainer",scrollSeek:"scrollSeek"},methods:{scrollToIndex:"scrollToIndex",scrollIntoView:"scrollIntoView",scrollTo:"scrollTo",scrollBy:"scrollBy",adjustForPrependedItems:"adjustForPrependedItems",autoscrollToBottom:"autoscrollToBottom"},events:{isScrolling:"isScrolling",endReached:"endReached",startReached:"startReached",rangeChanged:"rangeChanged",atBottomStateChange:"atBottomStateChange",atTopStateChange:"atTopStateChange",totalListHeightChanged:"totalListHeightChanged",itemsRendered:"itemsRendered",groupIndices:"groupIndices"}},F.memo(function(e){var t=oe("useWindowScroll"),n=oe("topItemsIndexes").length>0,r=oe("customScrollParent"),o=r||t?Fx:Ax;return F.createElement(r||t?Bx:Dx,G({},e),F.createElement(o,null,F.createElement(Ox,null),F.createElement(Zv,null),F.createElement(zx,null)),n&&F.createElement(Hx,null,F.createElement(Zv,{showTopList:!0})))})),jx=Bu.Component,Jt=Bu.usePublisher,oe=Bu.useEmitterValue,Ld=Bu.useEmitter,Dx=bd({usePublisher:Jt,useEmitterValue:oe,useEmitter:Ld}),Bx=Md({usePublisher:Jt,useEmitterValue:oe,useEmitter:Ld}),Yv={items:[],offsetBottom:0,offsetTop:0,top:0,bottom:0,itemHeight:0,itemWidth:0},Ux={items:[{index:0}],offsetBottom:0,offsetTop:0,top:0,bottom:0,itemHeight:0,itemWidth:0},Xv=Math.round,Jv=Math.ceil,Nd=Math.floor,dd=Math.min,Ll=Math.max;function pd(e,t,n){return Array.from({length:t-e+1}).map(function(r,o){return{index:o+e,data:n?.[o+e]}})}function Vx(e,t){return e&&e.column===t.column&&e.row===t.row}var Wx=se(function(e){var t=e[0],n=t.overscan,r=t.visibleRange,o=t.listBoundary,i=e[1],l=i.scrollTop,s=i.viewportHeight,u=i.scrollBy,a=i.scrollTo,c=i.smoothScrollTargetReached,h=i.scrollContainerState,y=i.footerHeight,m=i.headerHeight,d=e[2],v=e[3],E=e[4],g=E.propsReady,p=E.didMount,f=e[5],w=f.windowViewportRect,S=f.windowScrollTo,x=f.useWindowScroll,k=f.customScrollParent,C=f.windowScrollContainerState,I=e[6],L=R(0),B=R(0),Z=R(Yv),ue=R({height:0,width:0}),pe=R({height:0,width:0}),j=U(),T=U(),P=R(0),W=R(void 0),Y=R({row:0,column:0});D(M(Ve(p,B,W),K(function(_){return _[1]!==0}),z(function(_){return{items:pd(0,_[1]-1,_[2]),top:0,bottom:0,offsetBottom:0,offsetTop:0,itemHeight:0,itemWidth:0}})),Z),D(M(Ve(q(L),r,q(Y,Vx),q(pe,function(_,$){return _&&_.width===$.width&&_.height===$.height}),W),ee(ue),z(function(_){var $=_[0],$e=$[0],st=$[1],gt=st[0],Ht=st[1],ut=$[2],jt=$[3],It=$[4],bt=_[1],te=ut.row,Je=ut.column,Ge=jt.height,A=jt.width,vt=bt.width;if($e===0||vt===0)return Yv;if(A===0)return function(Q){return G({},Ux,{items:Q})}(pd(0,0,It));var ie=k0(vt,A,Je),X=ie*Nd((gt+te)/(Ge+te)),He=ie*Jv((Ht+te)/(Ge+te))-1;He=dd($e-1,Ll(He,ie-1));var qe=pd(X=dd(He,Ll(0,X)),He,It),rr=qv(bt,ut,jt,qe),qt=rr.top,N=rr.bottom,H=Jv($e/ie);return{items:qe,offsetTop:qt,offsetBottom:H*Ge+(H-1)*te-N,top:qt,bottom:N,itemHeight:Ge,itemWidth:A}})),Z),D(M(W,K(function(_){return _!==void 0}),z(function(_){return _.length})),L),D(M(ue,z(function(_){return _.height})),s),D(M(Ve(ue,pe,Z,Y),z(function(_){var $=qv(_[0],_[3],_[1],_[2].items);return[$.top,$.bottom]}),Ce(Pl)),o);var de=Ct(M(q(Z),K(function(_){return _.items.length>0}),ee(L),K(function(_){var $=_[0].items;return $[$.length-1].index===_[1]-1}),z(function(_){return _[1]-1}),Ce())),Oe=Ct(M(q(Z),K(function(_){var $=_.items;return $.length>0&&$[0].index===0}),qn(0),Ce())),We=Ct(M(q(Z),K(function(_){return _.items.length>0}),z(function(_){var $=_.items;return{startIndex:$[0].index,endIndex:$[$.length-1].index}}),Ce(g0)));D(We,v.scrollSeekRangeChanged),D(M(j,ee(ue,pe,L,Y),z(function(_){var $=_[1],$e=_[2],st=_[3],gt=_[4],Ht=m0(_[0]),ut=Ht.align,jt=Ht.behavior,It=Ht.offset,bt=Ht.index;bt==="LAST"&&(bt=st-1);var te=yd($,gt,$e,bt=Ll(0,bt,dd(st-1,bt)));return ut==="end"?te=Xv(te-$.height+$e.height):ut==="center"&&(te=Xv(te-$.height/2+$e.height/2)),It&&(te+=It),{top:te,behavior:jt}})),a);var Ft=lt(M(Z,z(function(_){return _.offsetBottom+_.bottom})),0);return D(M(w,z(function(_){return{width:_.visibleWidth,height:_.visibleHeight}})),ue),G({data:W,totalCount:L,viewportDimensions:ue,itemDimensions:pe,scrollTop:l,scrollHeight:T,overscan:n,scrollBy:u,scrollTo:a,scrollToIndex:j,smoothScrollTargetReached:c,windowViewportRect:w,windowScrollTo:S,useWindowScroll:x,customScrollParent:k,windowScrollContainerState:C,deviation:P,scrollContainerState:h,footerHeight:y,headerHeight:m,initialItemCount:B,gap:Y},v,{gridState:Z,totalListHeight:Ft},d,{startReached:Oe,endReached:de,rangeChanged:We,propsReady:g},I)},Se(kd,Tt,zl,v0,po,w0,zr));function qv(e,t,n,r){var o=n.height;return o===void 0||r.length===0?{top:0,bottom:0}:{top:yd(e,t,n,r[0].index),bottom:yd(e,t,n,r[r.length-1].index)+o}}function yd(e,t,n,r){var o=k0(e.width,n.width,t.column),i=Nd(r/o),l=i*n.height+Ll(0,i-1)*t.row;return l>0?l+t.row:l}function k0(e,t,n){return Ll(1,Nd((e+n)/(t+n)))}var $x=["placeholder"],Gx=se(function(){var e=R(function(a){return"Item "+a}),t=R({}),n=R(null),r=R("virtuoso-grid-item"),o=R("virtuoso-grid-list"),i=R(Id),l=R("div"),s=R(Pr),u=function(a,c){return c===void 0&&(c=null),lt(M(t,z(function(h){return h[a]}),Ce()),c)};return{context:n,itemContent:e,components:t,computeItemKey:i,itemClassName:r,listClassName:o,headerFooterTag:l,scrollerRef:s,FooterComponent:u("Footer"),HeaderComponent:u("Header"),ListComponent:u("List","div"),ItemComponent:u("Item","div"),ScrollerComponent:u("Scroller","div"),ScrollSeekPlaceholder:u("ScrollSeekPlaceholder","div")}}),Qx=se(function(e){var t=e[0],n=e[1],r={item:di(n.itemContent,"Rename the %citem%c prop to %citemContent."),ItemContainer:U(),ScrollContainer:U(),ListContainer:U(),emptyComponent:U(),scrollSeek:U()};function o(i,l,s){D(M(i,ee(n.components),z(function(u){var a,c=u[0],h=u[1];return console.warn("react-virtuoso: "+s+" property is deprecated. Pass components."+l+" instead."),G({},h,((a={})[l]=c,a))})),n.components)}return re(r.scrollSeek,function(i){var l=i.placeholder,s=pi(i,$x);console.warn("react-virtuoso: scrollSeek property is deprecated. Pass scrollSeekConfiguration and specify the placeholder in components.ScrollSeekPlaceholder instead."),le(n.components,G({},Xt(n.components),{ScrollSeekPlaceholder:l})),le(t.scrollSeekConfiguration,s)}),o(r.ItemContainer,"Item","ItemContainer"),o(r.ListContainer,"List","ListContainer"),o(r.ScrollContainer,"Scroller","ScrollContainer"),G({},t,n,r)},Se(Wx,Gx)),Kx=F.memo(function(){var e=Re("gridState"),t=Re("listClassName"),n=Re("itemClassName"),r=Re("itemContent"),o=Re("computeItemKey"),i=Re("isSeeking"),l=mn("scrollHeight"),s=Re("ItemComponent"),u=Re("ListComponent"),a=Re("ScrollSeekPlaceholder"),c=Re("context"),h=mn("itemDimensions"),y=mn("gap"),m=Re("log"),d=An(function(v){l(v.parentElement.parentElement.scrollHeight);var E=v.firstChild;E&&h(E.getBoundingClientRect()),y({row:e0("row-gap",getComputedStyle(v).rowGap,m),column:e0("column-gap",getComputedStyle(v).columnGap,m)})});return(0,V.createElement)(u,G({ref:d,className:t},Pe(u,c),{style:{paddingTop:e.offsetTop,paddingBottom:e.offsetBottom}}),e.items.map(function(v){var E=o(v.index,v.data,c);return i?(0,V.createElement)(a,G({key:E},Pe(a,c),{index:v.index,height:e.itemHeight,width:e.itemWidth})):(0,V.createElement)(s,G({},Pe(s,c),{className:n,"data-index":v.index,key:E}),r(v.index,v.data,c))}))}),Zx=F.memo(function(){var e=Re("HeaderComponent"),t=mn("headerHeight"),n=Re("headerFooterTag"),r=An(function(i){return t(gn(i,"height"))}),o=Re("context");return e?(0,V.createElement)(n,{ref:r},(0,V.createElement)(e,Pe(e,o))):null}),Yx=F.memo(function(){var e=Re("FooterComponent"),t=mn("footerHeight"),n=Re("headerFooterTag"),r=An(function(i){return t(gn(i,"height"))}),o=Re("context");return e?(0,V.createElement)(n,{ref:r},(0,V.createElement)(e,Pe(e,o))):null}),Xx=function(e){var t=e.children,n=(0,V.useContext)(E0),r=mn("itemDimensions"),o=mn("viewportDimensions"),i=An(function(l){o(l.getBoundingClientRect())});return F.useEffect(function(){n&&(o({height:n.viewportHeight,width:n.viewportWidth}),r({height:n.itemHeight,width:n.itemWidth}))},[n,o,r]),F.createElement("div",{style:hi,ref:i},t)},Jx=function(e){var t=e.children,n=(0,V.useContext)(E0),r=mn("windowViewportRect"),o=mn("itemDimensions"),i=Re("customScrollParent"),l=Td(r,i);return F.useEffect(function(){n&&(o({height:n.itemHeight,width:n.itemWidth}),r({offsetTop:0,visibleHeight:n.viewportHeight,visibleWidth:n.viewportWidth}))},[n,r,o]),F.createElement("div",{ref:l,style:hi},t)},Uu=Ou(Qx,{optional:{context:"context",totalCount:"totalCount",overscan:"overscan",itemContent:"itemContent",components:"components",computeItemKey:"computeItemKey",data:"data",initialItemCount:"initialItemCount",scrollSeekConfiguration:"scrollSeekConfiguration",headerFooterTag:"headerFooterTag",listClassName:"listClassName",itemClassName:"itemClassName",useWindowScroll:"useWindowScroll",customScrollParent:"customScrollParent",scrollerRef:"scrollerRef",item:"item",ItemContainer:"ItemContainer",ScrollContainer:"ScrollContainer",ListContainer:"ListContainer",scrollSeek:"scrollSeek"},methods:{scrollTo:"scrollTo",scrollBy:"scrollBy",scrollToIndex:"scrollToIndex"},events:{isScrolling:"isScrolling",endReached:"endReached",startReached:"startReached",rangeChanged:"rangeChanged",atBottomStateChange:"atBottomStateChange",atTopStateChange:"atTopStateChange"}},F.memo(function(e){var t=G({},e),n=Re("useWindowScroll"),r=Re("customScrollParent"),o=r||n?Jx:Xx;return F.createElement(r||n?eE:qx,G({},t),F.createElement(o,null,F.createElement(Zx,null),F.createElement(Kx,null),F.createElement(Yx,null)))})),JT=Uu.Component,mn=Uu.usePublisher,Re=Uu.useEmitterValue,C0=Uu.useEmitter,qx=bd({usePublisher:mn,useEmitterValue:Re,useEmitter:C0}),eE=Md({usePublisher:mn,useEmitterValue:Re,useEmitter:C0});function e0(e,t,n){return t==="normal"||t!=null&&t.endsWith("px")||n(e+" was not resolved to pixel value correctly",t,Fe.WARN),t==="normal"?0:parseInt(t??"0",10)}var tE=se(function(){var e=R(function(u){return F.createElement("td",null,"Item $",u)}),t=R(null),n=R(null),r=R(null),o=R({}),i=R(Id),l=R(Pr),s=function(u,a){return a===void 0&&(a=null),lt(M(o,z(function(c){return c[u]}),Ce()),a)};return{context:t,itemContent:e,fixedHeaderContent:n,fixedFooterContent:r,components:o,computeItemKey:i,scrollerRef:l,TableComponent:s("Table","table"),TableHeadComponent:s("TableHead","thead"),TableFooterComponent:s("TableFoot","tfoot"),TableBodyComponent:s("TableBody","tbody"),TableRowComponent:s("TableRow","tr"),ScrollerComponent:s("Scroller","div"),EmptyPlaceholder:s("EmptyPlaceholder"),ScrollSeekPlaceholder:s("ScrollSeekPlaceholder"),FillerRow:s("FillerRow")}}),nE=se(function(e){return G({},e[0],e[1])},Se(S0,tE)),rE=function(e){return F.createElement("tr",null,F.createElement("td",{style:{height:e.height}}))},oE=function(e){return F.createElement("tr",null,F.createElement("td",{style:{height:e.height,padding:0,border:0}}))},iE=F.memo(function(){var e=fe("listState"),t=hn("sizeRanges"),n=fe("useWindowScroll"),r=fe("customScrollParent"),o=hn("windowScrollContainerState"),i=hn("scrollContainerState"),l=r||n?o:i,s=fe("itemContent"),u=fe("trackItemSizes"),a=n0(t,fe("itemSize"),u,l,fe("log"),void 0,r),c=a.callbackRef,h=a.ref,y=F.useState(0),m=y[0],d=y[1];Rd("deviation",function(j){m!==j&&(h.current.style.marginTop=j+"px",d(j))});var v=fe("EmptyPlaceholder"),E=fe("ScrollSeekPlaceholder")||rE,g=fe("FillerRow")||oE,p=fe("TableBodyComponent"),f=fe("TableRowComponent"),w=fe("computeItemKey"),S=fe("isSeeking"),x=fe("paddingTopAddition"),k=fe("firstItemIndex"),C=fe("statefulTotalCount"),I=fe("context");if(C===0&&v)return(0,V.createElement)(v,Pe(v,I));var L=e.offsetTop+x+m,B=e.offsetBottom,Z=L>0?F.createElement(g,{height:L,key:"padding-top"}):null,ue=B>0?F.createElement(g,{height:B,key:"padding-bottom"}):null,pe=e.items.map(function(j){var T=j.originalIndex,P=w(T+k,j.data,I);return S?(0,V.createElement)(E,G({},Pe(E,I),{key:P,index:j.index,height:j.size,type:j.type||"item"})):(0,V.createElement)(f,G({},Pe(f,I),{key:P,"data-index":T,"data-known-size":j.size,"data-item-index":j.index,style:{overflowAnchor:"none"}}),s(j.index,j.data,I))});return(0,V.createElement)(p,G({ref:c,"data-test-id":"virtuoso-item-list"},Pe(p,I)),[Z].concat(pe,[ue]))}),lE=function(e){var t=e.children,n=(0,V.useContext)(Du),r=hn("viewportHeight"),o=hn("fixedItemHeight"),i=An(ci(r,function(l){return gn(l,"height")}));return F.useEffect(function(){n&&(r(n.viewportHeight),o(n.itemHeight))},[n,r,o]),F.createElement("div",{style:hi,ref:i,"data-viewport-type":"element"},t)},sE=function(e){var t=e.children,n=(0,V.useContext)(Du),r=hn("windowViewportRect"),o=hn("fixedItemHeight"),i=fe("customScrollParent"),l=Td(r,i);return F.useEffect(function(){n&&(o(n.itemHeight),r({offsetTop:0,visibleHeight:n.viewportHeight,visibleWidth:100}))},[n,r,o]),F.createElement("div",{ref:l,style:hi,"data-viewport-type":"window"},t)},Vu=Ou(nE,{required:{},optional:{context:"context",followOutput:"followOutput",firstItemIndex:"firstItemIndex",itemContent:"itemContent",fixedHeaderContent:"fixedHeaderContent",fixedFooterContent:"fixedFooterContent",overscan:"overscan",increaseViewportBy:"increaseViewportBy",totalCount:"totalCount",topItemCount:"topItemCount",initialTopMostItemIndex:"initialTopMostItemIndex",components:"components",groupCounts:"groupCounts",atBottomThreshold:"atBottomThreshold",atTopThreshold:"atTopThreshold",computeItemKey:"computeItemKey",defaultItemHeight:"defaultItemHeight",fixedItemHeight:"fixedItemHeight",itemSize:"itemSize",scrollSeekConfiguration:"scrollSeekConfiguration",data:"data",initialItemCount:"initialItemCount",initialScrollTop:"initialScrollTop",alignToBottom:"alignToBottom",useWindowScroll:"useWindowScroll",customScrollParent:"customScrollParent",scrollerRef:"scrollerRef",logLevel:"logLevel",react18ConcurrentRendering:"react18ConcurrentRendering"},methods:{scrollToIndex:"scrollToIndex",scrollIntoView:"scrollIntoView",scrollTo:"scrollTo",scrollBy:"scrollBy"},events:{isScrolling:"isScrolling",endReached:"endReached",startReached:"startReached",rangeChanged:"rangeChanged",atBottomStateChange:"atBottomStateChange",atTopStateChange:"atTopStateChange",totalListHeightChanged:"totalListHeightChanged",itemsRendered:"itemsRendered",groupIndices:"groupIndices"}},F.memo(function(e){var t=fe("useWindowScroll"),n=fe("customScrollParent"),r=hn("fixedHeaderHeight"),o=hn("fixedFooterHeight"),i=fe("fixedHeaderContent"),l=fe("fixedFooterContent"),s=fe("context"),u=An(ci(r,function(g){return gn(g,"height")})),a=An(ci(o,function(g){return gn(g,"height")})),c=n||t?aE:uE,h=n||t?sE:lE,y=fe("TableComponent"),m=fe("TableHeadComponent"),d=fe("TableFooterComponent"),v=i?F.createElement(m,G({key:"TableHead",style:{zIndex:1,position:"sticky",top:0},ref:u},Pe(m,s)),i()):null,E=l?F.createElement(d,G({key:"TableFoot",style:{zIndex:1,position:"sticky",bottom:0},ref:a},Pe(d,s)),l()):null;return F.createElement(c,G({},e),F.createElement(h,null,F.createElement(y,G({style:{borderSpacing:0}},Pe(y,s)),[v,F.createElement(iE,{key:"TableBody"}),E])))})),qT=Vu.Component,hn=Vu.usePublisher,fe=Vu.useEmitterValue,Rd=Vu.useEmitter,uE=bd({usePublisher:hn,useEmitterValue:fe,useEmitter:Rd}),aE=Md({usePublisher:hn,useEmitterValue:fe,useEmitter:Rd}),T0=jx;var tr=me(he());var I0=({children:e,"data-index":t})=>{let{selected:n,setSelected:r}=(0,tr.useContext)(kt),o=Io({store:Rn,keys:[e],fn:(i,[l])=>i[l]});return typeof o?.id=="number"?tr.default.createElement("div",{className:Mn("ed-list-item",{"ed-list-item--odd":t%2===0,"ed-list-item--selected":n===o.id}),onClick:()=>r(o.id)},tr.default.createElement("div",{className:"ed-list-item-icons",title:o.op},tr.default.createElement("div",{className:Mn("op-icon",`op-icon-${o.kind}`),title:o.kind}),tr.default.createElement("div",{className:Mn("op-icon op-icon-second",`op-icon-${o.op}`,`op-icon-${o.op}-${o.kind}`),title:o.op})),tr.default.createElement("div",{title:o.name},o.name),tr.default.createElement("div",{title:o.payload},o.payloadShort??o.payload)):null};var b0=({width:e,height:t})=>{let n=(0,Xe.useRef)(null),r=(0,Xe.useRef)(null),[o,i]=(0,Xe.useState)(!1),l=(0,Xe.useRef)(null),[s,u]=(0,Xe.useState)(!1),a=(0,Xe.useContext)(ui);return(0,Xe.useEffect)(()=>()=>{clearInterval(n.current),clearTimeout(l.current)},[]),(0,Xe.useEffect)(()=>{clearTimeout(l.current),o?u(!1):l.current=setTimeout(()=>u(!0),500)},[o,u]),t>0&&e>0&&a.length?Xe.default.createElement(Xe.default.Fragment,null,Xe.default.createElement(T0,{ref:r,style:{height:t,width:e},data:a,defaultItemHeight:24,initialTopMostItemIndex:999,overscan:30,atBottomStateChange:c=>{clearInterval(n.current),i(c)},components:{Item:I0},itemContent:(c,h)=>h,followOutput:"auto"}),s&&Xe.default.createElement("a",{className:"ed-btn-tobottom",onClick:()=>r.current.scrollToIndex({index:a.length-1,behavior:"auto"})},"Bottom")):null};var M0=()=>{let[e,{width:t,height:n}]=od();return Ar.default.createElement("div",{className:"ed-table"},Ar.default.createElement("div",{className:"ed-table-header"},Ar.default.createElement("div",null),Ar.default.createElement("div",null,"Name"),Ar.default.createElement("div",null,"Payload")),Ar.default.createElement("div",{className:"ed-table-body",ref:e},Ar.default.createElement(b0,{width:t,height:n})))};var ui=(0,mo.createContext)([]),kt=(0,mo.createContext)({selected:!1,selectedTab:"",showHistory:!0,setSelected:()=>{},setSelectedTab:()=>{}}),bu=()=>mo.default.createElement("div",{className:"ed-logs"},mo.default.createElement(M0,null),mo.default.createElement(Ov,null));document.head.appendChild(document.createElement("style")).append(`.ed-layout{display:flex;flex-direction:column;height:100%;}.ed-layout svg{max-height:90%}.ed-layout .ed-btn-tobottom{-webkit-user-select:none;-moz-user-select:none;user-select:none;position:absolute;cursor:pointer;background:rgb(243,243,243);border:1px solid #9c9b9b;display:block;bottom:12px;right:30px;padding:4px 8px;display:flex;align-items:center;}.ed-layout .ed-btn-tobottom:before{content:"";background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA0IEwgMTUgMjQuMDYyNSBMIDguMjE4NzUgMTcuMjgxMjUgTCA2Ljc4MTI1IDE4LjcxODc1IEwgMTUuMjgxMjUgMjcuMjE4NzUgTCAxNiAyNy45MDYyNSBMIDE2LjcxODc1IDI3LjIxODc1IEwgMjUuMjE4NzUgMTguNzE4NzUgTCAyMy43ODEyNSAxNy4yODEyNSBMIDE3IDI0LjA2MjUgTCAxNyA0IFoiLz48L3N2Zz4=);display:block;width:16px;height:16px;margin-right:8px}.ed-layout .ed-toolbar{-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;align-items:stretch;justify-content:flex-start;height:32px;background:rgb(243,243,243);border-bottom:2px solid #d1d1d1;padding:0 4px;}.ed-layout .ed-toolbar a{cursor:pointer}.ed-layout .ed-toolbar .ed-toolbar-space{flex:1}.ed-layout .ed-toolbar .ed-toolbar-separator{width:1px;height:14px;background:#a4a4a4;align-self:center;margin:0 4px}.ed-layout .ed-toolbar .ed-toolbar-input input{font-size:12px}.ed-layout .ed-toolbar .ed-toolbar-text,.ed-layout .ed-toolbar .ed-toolbar-input{align-self:center;margin:0 8px}.ed-layout .ed-toolbar .ed-btn{width:32px;height:100%;padding:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;}.ed-layout .ed-toolbar .ed-btn svg{fill:#383838}.ed-layout .ed-toolbar .ed-btn:hover{background-color:#e6e5e5}.ed-layout .ed-toolbar .ed-tab-header{border-bottom:2px solid transparent;vertical-align:middle;line-height:32px;padding:0 10px;margin-bottom:-1px;}.ed-layout .ed-toolbar .ed-tab-header.ed-tab-header--selected{border-bottom:2px solid rgba(62,130,247,.6)}.ed-layout .ed-toolbar .ed-tab-header:hover{background-color:#e6e5e5}.ed-layout .ed-toolbar .ed-btn-disabled svg{fill:#f44336}.ed-layout .ed-body,.ed-layout .ed-logs{flex:1;height:100%}.ed-layout .ed-table{display:flex;flex-direction:column;height:100%;flex:1;}.ed-layout .ed-table .ed-table-header{display:flex;}.ed-layout .ed-table .ed-table-header>div{flex:1;border:1px solid #d1d1d1;border-top:none;padding:4px;text-overflow:ellipsis;overflow:hidden;box-sizing:border-box;}.ed-layout .ed-table .ed-table-header>div:nth-child(1){flex:none;width:40px}.ed-layout .ed-table .ed-table-header>div:nth-child(2){flex:none;width:140px}.ed-layout .ed-table .ed-table-body{flex:1;}.ed-layout .ed-table .ed-table-body .ed-list-item{display:flex;overflow:hidden;white-space:nowrap;box-sizing:border-box;cursor:pointer;}.ed-layout .ed-table .ed-table-body .ed-list-item.ed-list-item--odd{background-color:#f5f5f5}.ed-layout .ed-table .ed-table-body .ed-list-item:hover{background-color:#e6e5e5}.ed-layout .ed-table .ed-table-body .ed-list-item.ed-list-item--selected{background-color:#ddefff}.ed-layout .ed-table .ed-table-body .ed-list-item .ed-list-item-icons{display:flex;justify-content:center}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon{background-repeat:no-repeat;background-size:80% 80%;background-position:center;width:24px;}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon.op-icon-second{background-repeat:no-repeat;background-size:80% 80%;background-position:center;width:14px;margin-left:-4px}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-unit-create{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA1IEwgMTUgMTUgTCA1IDE1IEwgNSAxNyBMIDE1IDE3IEwgMTUgMjcgTCAxNyAyNyBMIDE3IDE3IEwgMjcgMTcgTCAyNyAxNSBMIDE3IDE1IEwgMTcgNSBaIi8+PC9zdmc+)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-unit-watch{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA4IEMgNy42NjQwNjMgOCAxLjI1IDE1LjM0Mzc1IDEuMjUgMTUuMzQzNzUgTCAwLjY1NjI1IDE2IEwgMS4yNSAxNi42NTYyNSBDIDEuMjUgMTYuNjU2MjUgNy4wOTc2NTYgMjMuMzI0MjE5IDE0Ljg3NSAyMy45Mzc1IEMgMTUuMjQ2MDk0IDIzLjk4NDM3NSAxNS42MTcxODggMjQgMTYgMjQgQyAxNi4zODI4MTMgMjQgMTYuNzUzOTA2IDIzLjk4NDM3NSAxNy4xMjUgMjMuOTM3NSBDIDI0LjkwMjM0NCAyMy4zMjQyMTkgMzAuNzUgMTYuNjU2MjUgMzAuNzUgMTYuNjU2MjUgTCAzMS4zNDM3NSAxNiBMIDMwLjc1IDE1LjM0Mzc1IEMgMzAuNzUgMTUuMzQzNzUgMjQuMzM1OTM4IDggMTYgOCBaIE0gMTYgMTAgQyAxOC4yMDMxMjUgMTAgMjAuMjM0Mzc1IDEwLjYwMTU2MyAyMiAxMS40MDYyNSBDIDIyLjYzNjcxOSAxMi40NjA5MzggMjMgMTMuNjc1NzgxIDIzIDE1IEMgMjMgMTguNjEzMjgxIDIwLjI4OTA2MyAyMS41ODIwMzEgMTYuNzgxMjUgMjEuOTY4NzUgQyAxNi43NjE3MTkgMjEuOTcyNjU2IDE2LjczODI4MSAyMS45NjQ4NDQgMTYuNzE4NzUgMjEuOTY4NzUgQyAxNi40ODA0NjkgMjEuOTgwNDY5IDE2LjI0MjE4OCAyMiAxNiAyMiBDIDE1LjczNDM3NSAyMiAxNS40NzY1NjMgMjEuOTg0Mzc1IDE1LjIxODc1IDIxLjk2ODc1IEMgMTEuNzEwOTM4IDIxLjU4MjAzMSA5IDE4LjYxMzI4MSA5IDE1IEMgOSAxMy42OTUzMTMgOS4zNTE1NjMgMTIuNDgwNDY5IDkuOTY4NzUgMTEuNDM3NSBMIDkuOTM3NSAxMS40Mzc1IEMgMTEuNzE4NzUgMTAuNjE3MTg4IDEzLjc3MzQzOCAxMCAxNiAxMCBaIE0gMTYgMTIgQyAxNC4zNDM3NSAxMiAxMyAxMy4zNDM3NSAxMyAxNSBDIDEzIDE2LjY1NjI1IDE0LjM0Mzc1IDE4IDE2IDE4IEMgMTcuNjU2MjUgMTggMTkgMTYuNjU2MjUgMTkgMTUgQyAxOSAxMy4zNDM3NSAxNy42NTYyNSAxMiAxNiAxMiBaIE0gNy4yNSAxMi45Mzc1IEMgNy4wOTM3NSAxMy42MDkzNzUgNyAxNC4yODUxNTYgNyAxNSBDIDcgMTYuNzUzOTA2IDcuNSAxOC4zOTQ1MzEgOC4zNzUgMTkuNzgxMjUgQyA1Ljg1NTQ2OSAxOC4zMjQyMTkgNC4xMDU0NjkgMTYuNTg1OTM4IDMuNTMxMjUgMTYgQyA0LjAxMTcxOSAxNS41MDc4MTMgNS4zNTE1NjMgMTQuMjAzMTI1IDcuMjUgMTIuOTM3NSBaIE0gMjQuNzUgMTIuOTM3NSBDIDI2LjY0ODQzOCAxNC4yMDMxMjUgMjcuOTg4MjgxIDE1LjUwNzgxMyAyOC40Njg3NSAxNiBDIDI3Ljg5NDUzMSAxNi41ODU5MzggMjYuMTQ0NTMxIDE4LjMyNDIxOSAyMy42MjUgMTkuNzgxMjUgQyAyNC41IDE4LjM5NDUzMSAyNSAxNi43NTM5MDYgMjUgMTUgQyAyNSAxNC4yODUxNTYgMjQuOTA2MjUgMTMuNjAxNTYzIDI0Ljc1IDEyLjkzNzUgWiIvPjwvc3ZnPg==)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-event{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA5IDQgTCA5IDUgTCA1IDUgTCA1IDI3IEwgMjcgMjcgTCAyNyA1IEwgMjMgNSBMIDIzIDQgTCAyMSA0IEwgMjEgNSBMIDExIDUgTCAxMSA0IFogTSA3IDcgTCA5IDcgTCA5IDggTCAxMSA4IEwgMTEgNyBMIDIxIDcgTCAyMSA4IEwgMjMgOCBMIDIzIDcgTCAyNSA3IEwgMjUgOSBMIDcgOSBaIE0gNyAxMSBMIDI1IDExIEwgMjUgMjUgTCA3IDI1IFogTSAxMyAxMyBMIDEzIDE1IEwgMTUgMTUgTCAxNSAxMyBaIE0gMTcgMTMgTCAxNyAxNSBMIDE5IDE1IEwgMTkgMTMgWiBNIDIxIDEzIEwgMjEgMTUgTCAyMyAxNSBMIDIzIDEzIFogTSA5IDE3IEwgOSAxOSBMIDExIDE5IEwgMTEgMTcgWiBNIDEzIDE3IEwgMTMgMTkgTCAxNSAxOSBMIDE1IDE3IFogTSAxNyAxNyBMIDE3IDE5IEwgMTkgMTkgTCAxOSAxNyBaIE0gMjEgMTcgTCAyMSAxOSBMIDIzIDE5IEwgMjMgMTcgWiBNIDkgMjEgTCA5IDIzIEwgMTEgMjMgTCAxMSAyMSBaIE0gMTMgMjEgTCAxMyAyMyBMIDE1IDIzIEwgMTUgMjEgWiBNIDE3IDIxIEwgMTcgMjMgTCAxOSAyMyBMIDE5IDIxIFoiLz48L3N2Zz4=)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-store{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA1IDUgTCA1IDI3IEwgMjAuNDA2MjUgMjcgTCAyMC43MTg3NSAyNi43MTg3NSBMIDI2LjcxODc1IDIwLjcxODc1IEwgMjcgMjAuNDA2MjUgTCAyNyA1IFogTSA3IDcgTCAyNSA3IEwgMjUgMTkgTCAxOSAxOSBMIDE5IDI1IEwgNyAyNSBaIE0gMjEgMjEgTCAyMy41NjI1IDIxIEwgMjEgMjMuNTYyNSBaIi8+PC9zdmc+)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-effect{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA2IEwgMTYgMTUgTCAyMCAxNiBMIDE2LjEwMTU2MyAyNiBMIDE2IDI2IEwgMTYgMTcuOTY4NzUgTCAxMiAxNi45Njg3NSBMIDE1Ljg5ODQzOCA2IEwgMTYgNiBNIDE4IDQgTCAxNC40ODgyODEgNCBMIDE0LjAxNTYyNSA1LjMyODEyNSBMIDEwLjExMzI4MSAxNi4zMDA3ODEgTCA5LjM3ODkwNiAxOC4zNzUgTCAxMS41MTU2MjUgMTguOTEwMTU2IEwgMTQgMTkuNTMxMjUgTCAxNCAyOCBMIDE3LjQ2ODc1IDI4IEwgMTcuOTY0ODQ0IDI2LjcyNjU2MyBMIDIxLjg2MzI4MSAxNi43MjY1NjMgTCAyMi42ODc1IDE0LjYwOTM3NSBMIDE4IDEzLjQzNzUgWiIvPjwvc3ZnPg==)}.ed-layout .ed-table .ed-table-body .ed-list-item>div{box-sizing:border-box;flex:1;border:1px solid transparent;border-right:1px solid #d1d1d1;padding:0 4px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.ed-layout .ed-table .ed-table-body .ed-list-item>div:nth-child(1){flex:none;width:40px}.ed-layout .ed-table .ed-table-body .ed-list-item>div:nth-child(2){flex:none;width:140px}.ed-layout .ed-details{position:absolute;height:100%;background:white;width:80%;top:0;right:0;bottom:0;border-left:1px solid #d1d1d1;border-right:1px solid #d1d1d1;display:flex;flex-direction:column;box-shadow:-1px 0 1px rgba(0,0,0,0.0549),-2px 0 2px rgba(0,0,0,0.0549),-4px 0 4px rgba(0,0,0,0.0549),-8px 0 8px rgba(0,0,0,0.0549);}.ed-layout .ed-details .ed-details-body{min-height:0;flex:1;}.ed-layout .ed-details .ed-details-body>div{max-height:100%;overflow:auto;height:100%}.ed-layout .ed-details .ed-details-body .ed-details-body-code pre{padding:14px!important}.ed-layout .ed-details .ed-details-body .ed-details-body-code pre{margin:0}.ed-layout .ed-details .ed-details-body .ed-details-body-code.ed-details-body-code-raw pre code{display:flex;flex-wrap:wrap}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}html,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:12px;line-height:21px;color:#333;background-color:transparent;height:100%}\n/*!\n  Theme: GitHub\n  Description: Light theme as seen on github.com\n  Author: github.com\n  Maintainer: @Hirse\n  Updated: 2021-05-15\n\n  Outdated base version: https://github.com/primer/github-syntax-light\n  Current colors taken from GitHub\'s CSS\n*/\n`);var cE=()=>{let e=xn(Sl),t=xn(Eu),n=xn(Vf);return nr.default.createElement("div",{className:"ed-body"},nr.default.createElement(ui.Provider,{value:e},nr.default.createElement(kt.Provider,{value:{selected:t,setSelected:Uf,setSelectedTab:Wf,selectedTab:n,showHistory:!0}},nr.default.createElement(bu,null))))},fE=()=>nr.default.createElement("div",{className:"ed-layout"},nr.default.createElement(uv,null),nr.default.createElement(cE,null)),dE=L0.default.createRoot(document.body);dE.render(nr.default.createElement(fE,null));\n/**\n * @license React\n * react-dom.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * react.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * scheduler.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * use-sync-external-store-shim.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * use-sync-external-store-shim/with-selector.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n'
}));
function isReactSyntheticEvent(event) {
  if (typeof event !== "object" || event === null) {
    return false;
  }
  return "_dispatchListeners" in event;
}
var stringify = (obj) => {
  return JSON.stringify(obj, (k, v) => {
    if (v && isReactSyntheticEvent(v))
      return "SyntheticEvent";
    if (v && typeof v === "object") {
      if (v instanceof Node)
        return "Node";
      if (v instanceof Window)
        return "Window";
    }
    return v;
  });
};
var isReady = false;
var stack = [];
var eventLogChannel = publisher.ns("logs");
publisher.provide("isReady", () => {
  isReady = true;
  if (stack.length) {
    while (stack.length) {
      eventLogChannel.publish(stack.shift());
    }
  }
});
var publishLog = (message) => {
  const id = eventIdSeed++;
  const { name, op, kind, payload } = message;
  const data = {
    id,
    name,
    kind,
    op,
    payload: stringify(payload)
  };
  if (isReady) {
    eventLogChannel.publish(data);
  } else {
    stack.push(data);
  }
};

// src/injector/index.ts
export * from "effector";
var Controller = class {
  constructor(publisher2) {
    this.enabled = true;
    this.query = "";
    this._events = /* @__PURE__ */ new Set();
    this.sendState = (0, import_lodash.default)(() => {
      this.publisher.ns("state").publish(this.getState());
    }, 80);
    this.publisher = publisher2;
    this.bindRemote();
    this.sendState();
  }
  getState() {
    return {
      enabled: this.enabled,
      query: this.query,
      subscriptions: Array.from(this._events.values()).filter((unit) => unit.logger.enabled).map((unit) => unit.logger.getName())
    };
  }
  bindRemote() {
    this.publisher.provide("setEnabled", this.setEnabled.bind(this));
    this.publisher.provide("setFilterQuery", this.setFilterQuery.bind(this));
  }
  setFilterQuery(query) {
    this.query = query;
    this.setEnabled(this.enabled);
  }
  setEnabled(enabled) {
    this.enabled = enabled;
    const filterFn = filterLogsFn(this.query);
    for (let unit of this._events) {
      if (!enabled) {
        unit.logger.setEnabled(false);
        continue;
      }
      unit.logger.setEnabled(filterFn(unit.logger.getName()));
    }
  }
  onUnitCreate(unit) {
    this._events.add(unit);
    if (this.enabled) {
      unit.logger.setEnabled(true);
    }
    unit.logger.log("unit-create");
    this.sendState();
  }
  createLogger(unit, parent) {
    const logger = {
      enabled: false,
      getName: () => {
        return (parent ? parent.shortName + "." : "") + unit.shortName;
      },
      getKind: () => (parent ? parent : unit).kind,
      setEnabled: (enabled) => {
        if (enabled === logger.enabled) {
          return;
        }
        if (enabled) {
          if (!logger.enabled) {
            const unwatch = unit.watch((payload) => {
              unit.logger.log("unit-watch", payload);
            });
            logger.unwatch = unwatch;
          }
        } else if (logger.unwatch) {
          logger.unwatch();
        }
        logger.enabled = enabled;
        this.sendState();
      },
      log: (op, payload) => {
        publishLog({
          op,
          kind: logger.getKind(),
          name: logger.getName(),
          payload
        });
      }
    };
    return logger;
  }
};
var controller = new Controller(publisher);
var attachLogger = (unit, parent) => {
  unit.logger = controller.createLogger(unit, parent);
  controller.onUnitCreate(unit);
};
var createStore = (...args) => {
  const event = createStoreOrig(...args);
  attachLogger(event);
  return event;
};
var createEvent = (...args) => {
  const event = createEventOrig(...args);
  attachLogger(event);
  return event;
};
var createEffect = (...args) => {
  const effect = createEffectOrig(...args);
  attachLogger(effect);
  attachLogger(effect.done, effect);
  attachLogger(effect.fail, effect);
  attachLogger(effect.finally, effect);
  return effect;
};
export {
  setConfig as config,
  createEffect,
  createEvent,
  createStore
};
/*!
 * Socket.IO v2.5.0
 * (c) 2014-2021 Guillermo Rauch
 * Released under the MIT License.
 */
/*! https://mths.be/utf8js v2.1.2 by @mathias */
//# sourceMappingURL=effector-injector.mjs.map
