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
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
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

// src/common/constants.ts
var ToolId = "\u2604\uFE0F Effector";
var defaultState = {
  enabled: false,
  expanded: false,
  zoom: 1,
  query: ""
};

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

// src/injector/rempl-publisher.ts
var eventIdSeed = 0;
var publisher = createPublisher(ToolId, () => ({
  type: "script",
  value: 'var NS=Object.create;var yh=Object.defineProperty;var LS=Object.getOwnPropertyDescriptor;var PS=Object.getOwnPropertyNames;var AS=Object.getPrototypeOf,FS=Object.prototype.hasOwnProperty;var A=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var jS=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of PS(t))!FS.call(e,o)&&o!==n&&yh(e,o,{get:()=>t[o],enumerable:!(r=LS(t,o))||r.enumerable});return e};var U=(e,t,n)=>(n=e!=null?NS(AS(e)):{},jS(t||!e||!e.__esModule?yh(n,"default",{value:e,enumerable:!0}):n,e));var _h=A(oe=>{"use strict";var pa=Symbol.for("react.element"),zS=Symbol.for("react.portal"),DS=Symbol.for("react.fragment"),BS=Symbol.for("react.strict_mode"),HS=Symbol.for("react.profiler"),US=Symbol.for("react.provider"),VS=Symbol.for("react.context"),WS=Symbol.for("react.forward_ref"),$S=Symbol.for("react.suspense"),GS=Symbol.for("react.memo"),qS=Symbol.for("react.lazy"),bh=Symbol.iterator;function KS(e){return e===null||typeof e!="object"?null:(e=bh&&e[bh]||e["@@iterator"],typeof e=="function"?e:null)}var xh={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Eh=Object.assign,kh={};function ii(e,t,n){this.props=e,this.context=t,this.refs=kh,this.updater=n||xh}ii.prototype.isReactComponent={};ii.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};ii.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ch(){}Ch.prototype=ii.prototype;function Xc(e,t,n){this.props=e,this.context=t,this.refs=kh,this.updater=n||xh}var ef=Xc.prototype=new Ch;ef.constructor=Xc;Eh(ef,ii.prototype);ef.isPureReactComponent=!0;var wh=Array.isArray,Th=Object.prototype.hasOwnProperty,tf={current:null},Ih={key:!0,ref:!0,__self:!0,__source:!0};function Oh(e,t,n){var r,o={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)Th.call(t,r)&&!Ih.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var l=Array(s),u=0;u<s;u++)l[u]=arguments[u+2];o.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:pa,type:e,key:i,ref:a,props:o,_owner:tf.current}}function QS(e,t){return{$$typeof:pa,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function nf(e){return typeof e=="object"&&e!==null&&e.$$typeof===pa}function ZS(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Sh=/\\/+/g;function Jc(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ZS(""+e.key):t.toString(36)}function Gs(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case pa:case zS:a=!0}}if(a)return a=e,o=o(a),e=r===""?"."+Jc(a,0):r,wh(o)?(n="",e!=null&&(n=e.replace(Sh,"$&/")+"/"),Gs(o,t,n,"",function(u){return u})):o!=null&&(nf(o)&&(o=QS(o,n+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(Sh,"$&/")+"/")+e)),t.push(o)),1;if(a=0,r=r===""?".":r+":",wh(e))for(var s=0;s<e.length;s++){i=e[s];var l=r+Jc(i,s);a+=Gs(i,t,n,l,o)}else if(l=KS(e),typeof l=="function")for(e=l.call(e),s=0;!(i=e.next()).done;)i=i.value,l=r+Jc(i,s++),a+=Gs(i,t,n,l,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function $s(e,t,n){if(e==null)return e;var r=[],o=0;return Gs(e,r,"","",function(i){return t.call(n,i,o++)}),r}function YS(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var kt={current:null},qs={transition:null},JS={ReactCurrentDispatcher:kt,ReactCurrentBatchConfig:qs,ReactCurrentOwner:tf};oe.Children={map:$s,forEach:function(e,t,n){$s(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return $s(e,function(){t++}),t},toArray:function(e){return $s(e,function(t){return t})||[]},only:function(e){if(!nf(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};oe.Component=ii;oe.Fragment=DS;oe.Profiler=HS;oe.PureComponent=Xc;oe.StrictMode=BS;oe.Suspense=$S;oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=JS;oe.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Eh({},e.props),o=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=tf.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)Th.call(t,l)&&!Ih.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){s=Array(l);for(var u=0;u<l;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:pa,type:e.type,key:o,ref:i,props:r,_owner:a}};oe.createContext=function(e){return e={$$typeof:VS,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:US,_context:e},e.Consumer=e};oe.createElement=Oh;oe.createFactory=function(e){var t=Oh.bind(null,e);return t.type=e,t};oe.createRef=function(){return{current:null}};oe.forwardRef=function(e){return{$$typeof:WS,render:e}};oe.isValidElement=nf;oe.lazy=function(e){return{$$typeof:qS,_payload:{_status:-1,_result:e},_init:YS}};oe.memo=function(e,t){return{$$typeof:GS,type:e,compare:t===void 0?null:t}};oe.startTransition=function(e){var t=qs.transition;qs.transition={};try{e()}finally{qs.transition=t}};oe.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};oe.useCallback=function(e,t){return kt.current.useCallback(e,t)};oe.useContext=function(e){return kt.current.useContext(e)};oe.useDebugValue=function(){};oe.useDeferredValue=function(e){return kt.current.useDeferredValue(e)};oe.useEffect=function(e,t){return kt.current.useEffect(e,t)};oe.useId=function(){return kt.current.useId()};oe.useImperativeHandle=function(e,t,n){return kt.current.useImperativeHandle(e,t,n)};oe.useInsertionEffect=function(e,t){return kt.current.useInsertionEffect(e,t)};oe.useLayoutEffect=function(e,t){return kt.current.useLayoutEffect(e,t)};oe.useMemo=function(e,t){return kt.current.useMemo(e,t)};oe.useReducer=function(e,t,n){return kt.current.useReducer(e,t,n)};oe.useRef=function(e){return kt.current.useRef(e)};oe.useState=function(e){return kt.current.useState(e)};oe.useSyncExternalStore=function(e,t,n){return kt.current.useSyncExternalStore(e,t,n)};oe.useTransition=function(){return kt.current.useTransition()};oe.version="18.2.0"});var Y=A((TI,Mh)=>{"use strict";Mh.exports=_h()});var t0=A(e0=>{"use strict";var hi=Y();function bx(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var wx=typeof Object.is=="function"?Object.is:bx,Sx=hi.useState,xx=hi.useEffect,Ex=hi.useLayoutEffect,kx=hi.useDebugValue;function Cx(e,t){var n=t(),r=Sx({inst:{value:n,getSnapshot:t}}),o=r[0].inst,i=r[1];return Ex(function(){o.value=n,o.getSnapshot=t,xf(o)&&i({inst:o})},[e,n,t]),xx(function(){return xf(o)&&i({inst:o}),e(function(){xf(o)&&i({inst:o})})},[e]),kx(n),n}function xf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!wx(e,n)}catch{return!0}}function Tx(e,t){return t()}var Ix=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Tx:Cx;e0.useSyncExternalStore=hi.useSyncExternalStore!==void 0?hi.useSyncExternalStore:Ix});var Ef=A((_I,n0)=>{"use strict";n0.exports=t0()});var o0=A(r0=>{"use strict";var rl=Y(),Ox=Ef();function _x(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Mx=typeof Object.is=="function"?Object.is:_x,Rx=Ox.useSyncExternalStore,Nx=rl.useRef,Lx=rl.useEffect,Px=rl.useMemo,Ax=rl.useDebugValue;r0.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var i=Nx(null);if(i.current===null){var a={hasValue:!1,value:null};i.current=a}else a=i.current;i=Px(function(){function l(m){if(!u){if(u=!0,c=m,m=r(m),o!==void 0&&a.hasValue){var d=a.value;if(o(d,m))return f=d}return f=m}if(d=f,Mx(c,m))return d;var y=r(m);return o!==void 0&&o(d,y)?d:(c=m,f=y)}var u=!1,c,f,v=n===void 0?null:n;return[function(){return l(t())},v===null?void 0:function(){return l(v())}]},[t,n,r,o]);var s=Rx(e,i[0],i[1]);return Lx(function(){a.hasValue=!0,a.value=s},[s]),Ax(s),s}});var a0=A((RI,i0)=>{"use strict";i0.exports=o0()});var E0=A(xe=>{"use strict";function If(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(0<ol(o,t))e[r]=t,e[n]=o,n=r;else break e}}function Rn(e){return e.length===0?null:e[0]}function al(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var a=2*(r+1)-1,s=e[a],l=a+1,u=e[l];if(0>ol(s,n))l<o&&0>ol(u,s)?(e[r]=u,e[l]=n,r=l):(e[r]=s,e[a]=n,r=a);else if(l<o&&0>ol(u,n))e[r]=u,e[l]=n,r=l;else break e}}return t}function ol(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(m0=performance,xe.unstable_now=function(){return m0.now()}):(kf=Date,h0=kf.now(),xe.unstable_now=function(){return kf.now()-h0});var m0,kf,h0,Yn=[],Br=[],Bx=1,fn=null,mt=3,sl=!1,To=!1,ka=!1,y0=typeof setTimeout=="function"?setTimeout:null,b0=typeof clearTimeout=="function"?clearTimeout:null,v0=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Of(e){for(var t=Rn(Br);t!==null;){if(t.callback===null)al(Br);else if(t.startTime<=e)al(Br),t.sortIndex=t.expirationTime,If(Yn,t);else break;t=Rn(Br)}}function _f(e){if(ka=!1,Of(e),!To)if(Rn(Yn)!==null)To=!0,Rf(Mf);else{var t=Rn(Br);t!==null&&Nf(_f,t.startTime-e)}}function Mf(e,t){To=!1,ka&&(ka=!1,b0(Ca),Ca=-1),sl=!0;var n=mt;try{for(Of(t),fn=Rn(Yn);fn!==null&&(!(fn.expirationTime>t)||e&&!x0());){var r=fn.callback;if(typeof r=="function"){fn.callback=null,mt=fn.priorityLevel;var o=r(fn.expirationTime<=t);t=xe.unstable_now(),typeof o=="function"?fn.callback=o:fn===Rn(Yn)&&al(Yn),Of(t)}else al(Yn);fn=Rn(Yn)}if(fn!==null)var i=!0;else{var a=Rn(Br);a!==null&&Nf(_f,a.startTime-t),i=!1}return i}finally{fn=null,mt=n,sl=!1}}var ll=!1,il=null,Ca=-1,w0=5,S0=-1;function x0(){return!(xe.unstable_now()-S0<w0)}function Cf(){if(il!==null){var e=xe.unstable_now();S0=e;var t=!0;try{t=il(!0,e)}finally{t?Ea():(ll=!1,il=null)}}else ll=!1}var Ea;typeof v0=="function"?Ea=function(){v0(Cf)}:typeof MessageChannel<"u"?(Tf=new MessageChannel,g0=Tf.port2,Tf.port1.onmessage=Cf,Ea=function(){g0.postMessage(null)}):Ea=function(){y0(Cf,0)};var Tf,g0;function Rf(e){il=e,ll||(ll=!0,Ea())}function Nf(e,t){Ca=y0(function(){e(xe.unstable_now())},t)}xe.unstable_IdlePriority=5;xe.unstable_ImmediatePriority=1;xe.unstable_LowPriority=4;xe.unstable_NormalPriority=3;xe.unstable_Profiling=null;xe.unstable_UserBlockingPriority=2;xe.unstable_cancelCallback=function(e){e.callback=null};xe.unstable_continueExecution=function(){To||sl||(To=!0,Rf(Mf))};xe.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w0=0<e?Math.floor(1e3/e):5};xe.unstable_getCurrentPriorityLevel=function(){return mt};xe.unstable_getFirstCallbackNode=function(){return Rn(Yn)};xe.unstable_next=function(e){switch(mt){case 1:case 2:case 3:var t=3;break;default:t=mt}var n=mt;mt=t;try{return e()}finally{mt=n}};xe.unstable_pauseExecution=function(){};xe.unstable_requestPaint=function(){};xe.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=mt;mt=e;try{return t()}finally{mt=n}};xe.unstable_scheduleCallback=function(e,t,n){var r=xe.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=n+o,e={id:Bx++,callback:t,priorityLevel:e,startTime:n,expirationTime:o,sortIndex:-1},n>r?(e.sortIndex=n,If(Br,e),Rn(Yn)===null&&e===Rn(Br)&&(ka?(b0(Ca),Ca=-1):ka=!0,Nf(_f,n-r))):(e.sortIndex=o,If(Yn,e),To||sl||(To=!0,Rf(Mf))),e};xe.unstable_shouldYield=x0;xe.unstable_wrapCallback=function(e){var t=mt;return function(){var n=mt;mt=t;try{return e.apply(this,arguments)}finally{mt=n}}}});var C0=A((zI,k0)=>{"use strict";k0.exports=E0()});var R1=A(en=>{"use strict";var Nv=Y(),Jt=C0();function I(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Lv=new Set,qa={};function Do(e,t){Fi(e,t),Fi(e+"Capture",t)}function Fi(e,t){for(qa[e]=t,e=0;e<t.length;e++)Lv.add(t[e])}var Sr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),td=Object.prototype.hasOwnProperty,Hx=/^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$/,T0={},I0={};function Ux(e){return td.call(I0,e)?!0:td.call(T0,e)?!1:Hx.test(e)?I0[e]=!0:(T0[e]=!0,!1)}function Vx(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Wx(e,t,n,r){if(t===null||typeof t>"u"||Vx(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ot(e,t,n,r,o,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var st={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){st[e]=new Ot(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];st[t]=new Ot(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){st[e]=new Ot(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){st[e]=new Ot(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){st[e]=new Ot(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){st[e]=new Ot(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){st[e]=new Ot(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){st[e]=new Ot(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){st[e]=new Ot(e,5,!1,e.toLowerCase(),null,!1,!1)});var qd=/[\\-:]([a-z])/g;function Kd(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(qd,Kd);st[t]=new Ot(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(qd,Kd);st[t]=new Ot(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(qd,Kd);st[t]=new Ot(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){st[e]=new Ot(e,1,!1,e.toLowerCase(),null,!1,!1)});st.xlinkHref=new Ot("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){st[e]=new Ot(e,1,!1,e.toLowerCase(),null,!0,!0)});function Qd(e,t,n,r){var o=st.hasOwnProperty(t)?st[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Wx(t,n,o,r)&&(n=null),r||o===null?Ux(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Cr=Nv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ul=Symbol.for("react.element"),yi=Symbol.for("react.portal"),bi=Symbol.for("react.fragment"),Zd=Symbol.for("react.strict_mode"),nd=Symbol.for("react.profiler"),Pv=Symbol.for("react.provider"),Av=Symbol.for("react.context"),Yd=Symbol.for("react.forward_ref"),rd=Symbol.for("react.suspense"),od=Symbol.for("react.suspense_list"),Jd=Symbol.for("react.memo"),Ur=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Fv=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var O0=Symbol.iterator;function Ta(e){return e===null||typeof e!="object"?null:(e=O0&&e[O0]||e["@@iterator"],typeof e=="function"?e:null)}var Pe=Object.assign,Lf;function Pa(e){if(Lf===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\\n( *(at )?)/);Lf=t&&t[1]||""}return`\n`+Lf+e}var Pf=!1;function Af(e,t){if(!e||Pf)return"";Pf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`\n`),i=r.stack.split(`\n`),a=o.length-1,s=i.length-1;1<=a&&0<=s&&o[a]!==i[s];)s--;for(;1<=a&&0<=s;a--,s--)if(o[a]!==i[s]){if(a!==1||s!==1)do if(a--,s--,0>s||o[a]!==i[s]){var l=`\n`+o[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=s);break}}}finally{Pf=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Pa(e):""}function $x(e){switch(e.tag){case 5:return Pa(e.type);case 16:return Pa("Lazy");case 13:return Pa("Suspense");case 19:return Pa("SuspenseList");case 0:case 2:case 15:return e=Af(e.type,!1),e;case 11:return e=Af(e.type.render,!1),e;case 1:return e=Af(e.type,!0),e;default:return""}}function id(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case bi:return"Fragment";case yi:return"Portal";case nd:return"Profiler";case Zd:return"StrictMode";case rd:return"Suspense";case od:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Av:return(e.displayName||"Context")+".Consumer";case Pv:return(e._context.displayName||"Context")+".Provider";case Yd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Jd:return t=e.displayName||null,t!==null?t:id(e.type)||"Memo";case Ur:t=e._payload,e=e._init;try{return id(e(t))}catch{}}return null}function Gx(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return id(t);case 8:return t===Zd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function no(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function jv(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function qx(e){var t=jv(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function cl(e){e._valueTracker||(e._valueTracker=qx(e))}function zv(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=jv(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function zl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ad(e,t){var n=t.checked;return Pe({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function _0(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=no(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Dv(e,t){t=t.checked,t!=null&&Qd(e,"checked",t,!1)}function sd(e,t){Dv(e,t);var n=no(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ld(e,t.type,n):t.hasOwnProperty("defaultValue")&&ld(e,t.type,no(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function M0(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ld(e,t,n){(t!=="number"||zl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Aa=Array.isArray;function Mi(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+no(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function ud(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(I(91));return Pe({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function R0(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(I(92));if(Aa(n)){if(1<n.length)throw Error(I(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:no(n)}}function Bv(e,t){var n=no(t.value),r=no(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function N0(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Hv(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function cd(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Hv(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var fl,Uv=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(fl=fl||document.createElement("div"),fl.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=fl.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Ka(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var za={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Kx=["Webkit","ms","Moz","O"];Object.keys(za).forEach(function(e){Kx.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),za[t]=za[e]})});function Vv(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||za.hasOwnProperty(e)&&za[e]?(""+t).trim():t+"px"}function Wv(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Vv(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Qx=Pe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function fd(e,t){if(t){if(Qx[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(I(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(I(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(I(61))}if(t.style!=null&&typeof t.style!="object")throw Error(I(62))}}function dd(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var pd=null;function Xd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var md=null,Ri=null,Ni=null;function L0(e){if(e=ds(e)){if(typeof md!="function")throw Error(I(280));var t=e.stateNode;t&&(t=du(t),md(e.stateNode,e.type,t))}}function $v(e){Ri?Ni?Ni.push(e):Ni=[e]:Ri=e}function Gv(){if(Ri){var e=Ri,t=Ni;if(Ni=Ri=null,L0(e),t)for(e=0;e<t.length;e++)L0(t[e])}}function qv(e,t){return e(t)}function Kv(){}var Ff=!1;function Qv(e,t,n){if(Ff)return e(t,n);Ff=!0;try{return qv(e,t,n)}finally{Ff=!1,(Ri!==null||Ni!==null)&&(Kv(),Gv())}}function Qa(e,t){var n=e.stateNode;if(n===null)return null;var r=du(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(I(231,t,typeof n));return n}var hd=!1;if(Sr)try{vi={},Object.defineProperty(vi,"passive",{get:function(){hd=!0}}),window.addEventListener("test",vi,vi),window.removeEventListener("test",vi,vi)}catch{hd=!1}var vi;function Zx(e,t,n,r,o,i,a,s,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(c){this.onError(c)}}var Da=!1,Dl=null,Bl=!1,vd=null,Yx={onError:function(e){Da=!0,Dl=e}};function Jx(e,t,n,r,o,i,a,s,l){Da=!1,Dl=null,Zx.apply(Yx,arguments)}function Xx(e,t,n,r,o,i,a,s,l){if(Jx.apply(this,arguments),Da){if(Da){var u=Dl;Da=!1,Dl=null}else throw Error(I(198));Bl||(Bl=!0,vd=u)}}function Bo(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Zv(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function P0(e){if(Bo(e)!==e)throw Error(I(188))}function e5(e){var t=e.alternate;if(!t){if(t=Bo(e),t===null)throw Error(I(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return P0(o),e;if(i===r)return P0(o),t;i=i.sibling}throw Error(I(188))}if(n.return!==r.return)n=o,r=i;else{for(var a=!1,s=o.child;s;){if(s===n){a=!0,n=o,r=i;break}if(s===r){a=!0,r=o,n=i;break}s=s.sibling}if(!a){for(s=i.child;s;){if(s===n){a=!0,n=i,r=o;break}if(s===r){a=!0,r=i,n=o;break}s=s.sibling}if(!a)throw Error(I(189))}}if(n.alternate!==r)throw Error(I(190))}if(n.tag!==3)throw Error(I(188));return n.stateNode.current===n?e:t}function Yv(e){return e=e5(e),e!==null?Jv(e):null}function Jv(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Jv(e);if(t!==null)return t;e=e.sibling}return null}var Xv=Jt.unstable_scheduleCallback,A0=Jt.unstable_cancelCallback,t5=Jt.unstable_shouldYield,n5=Jt.unstable_requestPaint,De=Jt.unstable_now,r5=Jt.unstable_getCurrentPriorityLevel,ep=Jt.unstable_ImmediatePriority,eg=Jt.unstable_UserBlockingPriority,Hl=Jt.unstable_NormalPriority,o5=Jt.unstable_LowPriority,tg=Jt.unstable_IdlePriority,lu=null,tr=null;function i5(e){if(tr&&typeof tr.onCommitFiberRoot=="function")try{tr.onCommitFiberRoot(lu,e,void 0,(e.current.flags&128)===128)}catch{}}var Fn=Math.clz32?Math.clz32:l5,a5=Math.log,s5=Math.LN2;function l5(e){return e>>>=0,e===0?32:31-(a5(e)/s5|0)|0}var dl=64,pl=4194304;function Fa(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ul(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var s=a&~o;s!==0?r=Fa(s):(i&=a,i!==0&&(r=Fa(i)))}else a=n&~o,a!==0?r=Fa(a):i!==0&&(r=Fa(i));if(r===0)return 0;if(t!==0&&t!==r&&(t&o)===0&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if((r&4)!==0&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Fn(t),o=1<<n,r|=e[n],t&=~o;return r}function u5(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function c5(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Fn(i),s=1<<a,l=o[a];l===-1?((s&n)===0||(s&r)!==0)&&(o[a]=u5(s,t)):l<=t&&(e.expiredLanes|=s),i&=~s}}function gd(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ng(){var e=dl;return dl<<=1,(dl&4194240)===0&&(dl=64),e}function jf(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function cs(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Fn(t),e[t]=n}function f5(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Fn(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function tp(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Fn(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var ve=0;function rg(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var og,np,ig,ag,sg,yd=!1,ml=[],Kr=null,Qr=null,Zr=null,Za=new Map,Ya=new Map,Wr=[],d5="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function F0(e,t){switch(e){case"focusin":case"focusout":Kr=null;break;case"dragenter":case"dragleave":Qr=null;break;case"mouseover":case"mouseout":Zr=null;break;case"pointerover":case"pointerout":Za.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ya.delete(t.pointerId)}}function Ia(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=ds(t),t!==null&&np(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function p5(e,t,n,r,o){switch(t){case"focusin":return Kr=Ia(Kr,e,t,n,r,o),!0;case"dragenter":return Qr=Ia(Qr,e,t,n,r,o),!0;case"mouseover":return Zr=Ia(Zr,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Za.set(i,Ia(Za.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Ya.set(i,Ia(Ya.get(i)||null,e,t,n,r,o)),!0}return!1}function lg(e){var t=_o(e.target);if(t!==null){var n=Bo(t);if(n!==null){if(t=n.tag,t===13){if(t=Zv(n),t!==null){e.blockedOn=t,sg(e.priority,function(){ig(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ol(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bd(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);pd=r,n.target.dispatchEvent(r),pd=null}else return t=ds(n),t!==null&&np(t),e.blockedOn=n,!1;t.shift()}return!0}function j0(e,t,n){Ol(e)&&n.delete(t)}function m5(){yd=!1,Kr!==null&&Ol(Kr)&&(Kr=null),Qr!==null&&Ol(Qr)&&(Qr=null),Zr!==null&&Ol(Zr)&&(Zr=null),Za.forEach(j0),Ya.forEach(j0)}function Oa(e,t){e.blockedOn===t&&(e.blockedOn=null,yd||(yd=!0,Jt.unstable_scheduleCallback(Jt.unstable_NormalPriority,m5)))}function Ja(e){function t(o){return Oa(o,e)}if(0<ml.length){Oa(ml[0],e);for(var n=1;n<ml.length;n++){var r=ml[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Kr!==null&&Oa(Kr,e),Qr!==null&&Oa(Qr,e),Zr!==null&&Oa(Zr,e),Za.forEach(t),Ya.forEach(t),n=0;n<Wr.length;n++)r=Wr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Wr.length&&(n=Wr[0],n.blockedOn===null);)lg(n),n.blockedOn===null&&Wr.shift()}var Li=Cr.ReactCurrentBatchConfig,Vl=!0;function h5(e,t,n,r){var o=ve,i=Li.transition;Li.transition=null;try{ve=1,rp(e,t,n,r)}finally{ve=o,Li.transition=i}}function v5(e,t,n,r){var o=ve,i=Li.transition;Li.transition=null;try{ve=4,rp(e,t,n,r)}finally{ve=o,Li.transition=i}}function rp(e,t,n,r){if(Vl){var o=bd(e,t,n,r);if(o===null)Wf(e,t,r,Wl,n),F0(e,r);else if(p5(o,e,t,n,r))r.stopPropagation();else if(F0(e,r),t&4&&-1<d5.indexOf(e)){for(;o!==null;){var i=ds(o);if(i!==null&&og(i),i=bd(e,t,n,r),i===null&&Wf(e,t,r,Wl,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else Wf(e,t,r,null,n)}}var Wl=null;function bd(e,t,n,r){if(Wl=null,e=Xd(r),e=_o(e),e!==null)if(t=Bo(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Zv(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Wl=e,null}function ug(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(r5()){case ep:return 1;case eg:return 4;case Hl:case o5:return 16;case tg:return 536870912;default:return 16}default:return 16}}var Gr=null,op=null,_l=null;function cg(){if(_l)return _l;var e,t=op,n=t.length,r,o="value"in Gr?Gr.value:Gr.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===o[i-r];r++);return _l=o.slice(e,1<r?1-r:void 0)}function Ml(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function hl(){return!0}function z0(){return!1}function Xt(e){function t(n,r,o,i,a){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?hl:z0,this.isPropagationStopped=z0,this}return Pe(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=hl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=hl)},persist:function(){},isPersistent:hl}),t}var Vi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ip=Xt(Vi),fs=Pe({},Vi,{view:0,detail:0}),g5=Xt(fs),zf,Df,_a,uu=Pe({},fs,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ap,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_a&&(_a&&e.type==="mousemove"?(zf=e.screenX-_a.screenX,Df=e.screenY-_a.screenY):Df=zf=0,_a=e),zf)},movementY:function(e){return"movementY"in e?e.movementY:Df}}),D0=Xt(uu),y5=Pe({},uu,{dataTransfer:0}),b5=Xt(y5),w5=Pe({},fs,{relatedTarget:0}),Bf=Xt(w5),S5=Pe({},Vi,{animationName:0,elapsedTime:0,pseudoElement:0}),x5=Xt(S5),E5=Pe({},Vi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),k5=Xt(E5),C5=Pe({},Vi,{data:0}),B0=Xt(C5),T5={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},I5={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},O5={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function _5(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=O5[e])?!!t[e]:!1}function ap(){return _5}var M5=Pe({},fs,{key:function(e){if(e.key){var t=T5[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ml(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?I5[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ap,charCode:function(e){return e.type==="keypress"?Ml(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ml(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),R5=Xt(M5),N5=Pe({},uu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),H0=Xt(N5),L5=Pe({},fs,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ap}),P5=Xt(L5),A5=Pe({},Vi,{propertyName:0,elapsedTime:0,pseudoElement:0}),F5=Xt(A5),j5=Pe({},uu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),z5=Xt(j5),D5=[9,13,27,32],sp=Sr&&"CompositionEvent"in window,Ba=null;Sr&&"documentMode"in document&&(Ba=document.documentMode);var B5=Sr&&"TextEvent"in window&&!Ba,fg=Sr&&(!sp||Ba&&8<Ba&&11>=Ba),U0=String.fromCharCode(32),V0=!1;function dg(e,t){switch(e){case"keyup":return D5.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function pg(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var wi=!1;function H5(e,t){switch(e){case"compositionend":return pg(t);case"keypress":return t.which!==32?null:(V0=!0,U0);case"textInput":return e=t.data,e===U0&&V0?null:e;default:return null}}function U5(e,t){if(wi)return e==="compositionend"||!sp&&dg(e,t)?(e=cg(),_l=op=Gr=null,wi=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return fg&&t.locale!=="ko"?null:t.data;default:return null}}var V5={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function W0(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!V5[e.type]:t==="textarea"}function mg(e,t,n,r){$v(r),t=$l(t,"onChange"),0<t.length&&(n=new ip("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Ha=null,Xa=null;function W5(e){Cg(e,0)}function cu(e){var t=Ei(e);if(zv(t))return e}function $5(e,t){if(e==="change")return t}var hg=!1;Sr&&(Sr?(gl="oninput"in document,gl||(Hf=document.createElement("div"),Hf.setAttribute("oninput","return;"),gl=typeof Hf.oninput=="function"),vl=gl):vl=!1,hg=vl&&(!document.documentMode||9<document.documentMode));var vl,gl,Hf;function $0(){Ha&&(Ha.detachEvent("onpropertychange",vg),Xa=Ha=null)}function vg(e){if(e.propertyName==="value"&&cu(Xa)){var t=[];mg(t,Xa,e,Xd(e)),Qv(W5,t)}}function G5(e,t,n){e==="focusin"?($0(),Ha=t,Xa=n,Ha.attachEvent("onpropertychange",vg)):e==="focusout"&&$0()}function q5(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cu(Xa)}function K5(e,t){if(e==="click")return cu(t)}function Q5(e,t){if(e==="input"||e==="change")return cu(t)}function Z5(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var zn=typeof Object.is=="function"?Object.is:Z5;function es(e,t){if(zn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!td.call(t,o)||!zn(e[o],t[o]))return!1}return!0}function G0(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function q0(e,t){var n=G0(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=G0(n)}}function gg(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?gg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function yg(){for(var e=window,t=zl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=zl(e.document)}return t}function lp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Y5(e){var t=yg(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&gg(n.ownerDocument.documentElement,n)){if(r!==null&&lp(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=q0(n,i);var a=q0(n,r);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var J5=Sr&&"documentMode"in document&&11>=document.documentMode,Si=null,wd=null,Ua=null,Sd=!1;function K0(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Sd||Si==null||Si!==zl(r)||(r=Si,"selectionStart"in r&&lp(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ua&&es(Ua,r)||(Ua=r,r=$l(wd,"onSelect"),0<r.length&&(t=new ip("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Si)))}function yl(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var xi={animationend:yl("Animation","AnimationEnd"),animationiteration:yl("Animation","AnimationIteration"),animationstart:yl("Animation","AnimationStart"),transitionend:yl("Transition","TransitionEnd")},Uf={},bg={};Sr&&(bg=document.createElement("div").style,"AnimationEvent"in window||(delete xi.animationend.animation,delete xi.animationiteration.animation,delete xi.animationstart.animation),"TransitionEvent"in window||delete xi.transitionend.transition);function fu(e){if(Uf[e])return Uf[e];if(!xi[e])return e;var t=xi[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in bg)return Uf[e]=t[n];return e}var wg=fu("animationend"),Sg=fu("animationiteration"),xg=fu("animationstart"),Eg=fu("transitionend"),kg=new Map,Q0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function oo(e,t){kg.set(e,t),Do(t,[e])}for(bl=0;bl<Q0.length;bl++)wl=Q0[bl],Z0=wl.toLowerCase(),Y0=wl[0].toUpperCase()+wl.slice(1),oo(Z0,"on"+Y0);var wl,Z0,Y0,bl;oo(wg,"onAnimationEnd");oo(Sg,"onAnimationIteration");oo(xg,"onAnimationStart");oo("dblclick","onDoubleClick");oo("focusin","onFocus");oo("focusout","onBlur");oo(Eg,"onTransitionEnd");Fi("onMouseEnter",["mouseout","mouseover"]);Fi("onMouseLeave",["mouseout","mouseover"]);Fi("onPointerEnter",["pointerout","pointerover"]);Fi("onPointerLeave",["pointerout","pointerover"]);Do("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Do("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Do("onBeforeInput",["compositionend","keypress","textInput","paste"]);Do("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Do("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Do("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ja="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),X5=new Set("cancel close invalid load scroll toggle".split(" ").concat(ja));function J0(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Xx(r,t,void 0,e),e.currentTarget=null}function Cg(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],l=s.instance,u=s.currentTarget;if(s=s.listener,l!==i&&o.isPropagationStopped())break e;J0(o,s,u),i=l}else for(a=0;a<r.length;a++){if(s=r[a],l=s.instance,u=s.currentTarget,s=s.listener,l!==i&&o.isPropagationStopped())break e;J0(o,s,u),i=l}}}if(Bl)throw e=vd,Bl=!1,vd=null,e}function ke(e,t){var n=t[Td];n===void 0&&(n=t[Td]=new Set);var r=e+"__bubble";n.has(r)||(Tg(t,e,2,!1),n.add(r))}function Vf(e,t,n){var r=0;t&&(r|=4),Tg(n,e,r,t)}var Sl="_reactListening"+Math.random().toString(36).slice(2);function ts(e){if(!e[Sl]){e[Sl]=!0,Lv.forEach(function(n){n!=="selectionchange"&&(X5.has(n)||Vf(n,!1,e),Vf(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Sl]||(t[Sl]=!0,Vf("selectionchange",!1,t))}}function Tg(e,t,n,r){switch(ug(t)){case 1:var o=h5;break;case 4:o=v5;break;default:o=rp}n=o.bind(null,t,n,e),o=void 0,!hd||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Wf(e,t,n,r,o){var i=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(a===4)for(a=r.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===o||l.nodeType===8&&l.parentNode===o))return;a=a.return}for(;s!==null;){if(a=_o(s),a===null)return;if(l=a.tag,l===5||l===6){r=i=a;continue e}s=s.parentNode}}r=r.return}Qv(function(){var u=i,c=Xd(n),f=[];e:{var v=kg.get(e);if(v!==void 0){var m=ip,d=e;switch(e){case"keypress":if(Ml(n)===0)break e;case"keydown":case"keyup":m=R5;break;case"focusin":d="focus",m=Bf;break;case"focusout":d="blur",m=Bf;break;case"beforeblur":case"afterblur":m=Bf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=D0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=b5;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=P5;break;case wg:case Sg:case xg:m=x5;break;case Eg:m=F5;break;case"scroll":m=g5;break;case"wheel":m=z5;break;case"copy":case"cut":case"paste":m=k5;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=H0}var y=(t&4)!==0,w=!y&&e==="scroll",g=y?v!==null?v+"Capture":null:v;y=[];for(var h=u,p;h!==null;){p=h;var b=p.stateNode;if(p.tag===5&&b!==null&&(p=b,g!==null&&(b=Qa(h,g),b!=null&&y.push(ns(h,b,p)))),w)break;h=h.return}0<y.length&&(v=new m(v,d,null,n,c),f.push({event:v,listeners:y}))}}if((t&7)===0){e:{if(v=e==="mouseover"||e==="pointerover",m=e==="mouseout"||e==="pointerout",v&&n!==pd&&(d=n.relatedTarget||n.fromElement)&&(_o(d)||d[xr]))break e;if((m||v)&&(v=c.window===c?c:(v=c.ownerDocument)?v.defaultView||v.parentWindow:window,m?(d=n.relatedTarget||n.toElement,m=u,d=d?_o(d):null,d!==null&&(w=Bo(d),d!==w||d.tag!==5&&d.tag!==6)&&(d=null)):(m=null,d=u),m!==d)){if(y=D0,b="onMouseLeave",g="onMouseEnter",h="mouse",(e==="pointerout"||e==="pointerover")&&(y=H0,b="onPointerLeave",g="onPointerEnter",h="pointer"),w=m==null?v:Ei(m),p=d==null?v:Ei(d),v=new y(b,h+"leave",m,n,c),v.target=w,v.relatedTarget=p,b=null,_o(c)===u&&(y=new y(g,h+"enter",d,n,c),y.target=p,y.relatedTarget=w,b=y),w=b,m&&d)t:{for(y=m,g=d,h=0,p=y;p;p=gi(p))h++;for(p=0,b=g;b;b=gi(b))p++;for(;0<h-p;)y=gi(y),h--;for(;0<p-h;)g=gi(g),p--;for(;h--;){if(y===g||g!==null&&y===g.alternate)break t;y=gi(y),g=gi(g)}y=null}else y=null;m!==null&&X0(f,v,m,y,!1),d!==null&&w!==null&&X0(f,w,d,y,!0)}}e:{if(v=u?Ei(u):window,m=v.nodeName&&v.nodeName.toLowerCase(),m==="select"||m==="input"&&v.type==="file")var S=$5;else if(W0(v))if(hg)S=Q5;else{S=q5;var x=G5}else(m=v.nodeName)&&m.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(S=K5);if(S&&(S=S(e,u))){mg(f,S,n,c);break e}x&&x(e,v,u),e==="focusout"&&(x=v._wrapperState)&&x.controlled&&v.type==="number"&&ld(v,"number",v.value)}switch(x=u?Ei(u):window,e){case"focusin":(W0(x)||x.contentEditable==="true")&&(Si=x,wd=u,Ua=null);break;case"focusout":Ua=wd=Si=null;break;case"mousedown":Sd=!0;break;case"contextmenu":case"mouseup":case"dragend":Sd=!1,K0(f,n,c);break;case"selectionchange":if(J5)break;case"keydown":case"keyup":K0(f,n,c)}var E;if(sp)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else wi?dg(e,n)&&(k="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(k="onCompositionStart");k&&(fg&&n.locale!=="ko"&&(wi||k!=="onCompositionStart"?k==="onCompositionEnd"&&wi&&(E=cg()):(Gr=c,op="value"in Gr?Gr.value:Gr.textContent,wi=!0)),x=$l(u,k),0<x.length&&(k=new B0(k,e,null,n,c),f.push({event:k,listeners:x}),E?k.data=E:(E=pg(n),E!==null&&(k.data=E)))),(E=B5?H5(e,n):U5(e,n))&&(u=$l(u,"onBeforeInput"),0<u.length&&(c=new B0("onBeforeInput","beforeinput",null,n,c),f.push({event:c,listeners:u}),c.data=E))}Cg(f,t)})}function ns(e,t,n){return{instance:e,listener:t,currentTarget:n}}function $l(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Qa(e,n),i!=null&&r.unshift(ns(e,i,o)),i=Qa(e,t),i!=null&&r.push(ns(e,i,o))),e=e.return}return r}function gi(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function X0(e,t,n,r,o){for(var i=t._reactName,a=[];n!==null&&n!==r;){var s=n,l=s.alternate,u=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&u!==null&&(s=u,o?(l=Qa(n,i),l!=null&&a.unshift(ns(n,l,s))):o||(l=Qa(n,i),l!=null&&a.push(ns(n,l,s)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var eE=/\\r\\n?/g,tE=/\\u0000|\\uFFFD/g;function ev(e){return(typeof e=="string"?e:""+e).replace(eE,`\n`).replace(tE,"")}function xl(e,t,n){if(t=ev(t),ev(e)!==t&&n)throw Error(I(425))}function Gl(){}var xd=null,Ed=null;function kd(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Cd=typeof setTimeout=="function"?setTimeout:void 0,nE=typeof clearTimeout=="function"?clearTimeout:void 0,tv=typeof Promise=="function"?Promise:void 0,rE=typeof queueMicrotask=="function"?queueMicrotask:typeof tv<"u"?function(e){return tv.resolve(null).then(e).catch(oE)}:Cd;function oE(e){setTimeout(function(){throw e})}function $f(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Ja(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Ja(t)}function Yr(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function nv(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Wi=Math.random().toString(36).slice(2),er="__reactFiber$"+Wi,rs="__reactProps$"+Wi,xr="__reactContainer$"+Wi,Td="__reactEvents$"+Wi,iE="__reactListeners$"+Wi,aE="__reactHandles$"+Wi;function _o(e){var t=e[er];if(t)return t;for(var n=e.parentNode;n;){if(t=n[xr]||n[er]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=nv(e);e!==null;){if(n=e[er])return n;e=nv(e)}return t}e=n,n=e.parentNode}return null}function ds(e){return e=e[er]||e[xr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ei(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(I(33))}function du(e){return e[rs]||null}var Id=[],ki=-1;function io(e){return{current:e}}function Ce(e){0>ki||(e.current=Id[ki],Id[ki]=null,ki--)}function Ee(e,t){ki++,Id[ki]=e.current,e.current=t}var ro={},yt=io(ro),Ft=io(!1),Po=ro;function ji(e,t){var n=e.type.contextTypes;if(!n)return ro;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function jt(e){return e=e.childContextTypes,e!=null}function ql(){Ce(Ft),Ce(yt)}function rv(e,t,n){if(yt.current!==ro)throw Error(I(168));Ee(yt,t),Ee(Ft,n)}function Ig(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(I(108,Gx(e)||"Unknown",o));return Pe({},n,r)}function Kl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ro,Po=yt.current,Ee(yt,e),Ee(Ft,Ft.current),!0}function ov(e,t,n){var r=e.stateNode;if(!r)throw Error(I(169));n?(e=Ig(e,t,Po),r.__reactInternalMemoizedMergedChildContext=e,Ce(Ft),Ce(yt),Ee(yt,e)):Ce(Ft),Ee(Ft,n)}var gr=null,pu=!1,Gf=!1;function Og(e){gr===null?gr=[e]:gr.push(e)}function sE(e){pu=!0,Og(e)}function ao(){if(!Gf&&gr!==null){Gf=!0;var e=0,t=ve;try{var n=gr;for(ve=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}gr=null,pu=!1}catch(o){throw gr!==null&&(gr=gr.slice(e+1)),Xv(ep,ao),o}finally{ve=t,Gf=!1}}return null}var Ci=[],Ti=0,Ql=null,Zl=0,dn=[],pn=0,Ao=null,yr=1,br="";function Io(e,t){Ci[Ti++]=Zl,Ci[Ti++]=Ql,Ql=e,Zl=t}function _g(e,t,n){dn[pn++]=yr,dn[pn++]=br,dn[pn++]=Ao,Ao=e;var r=yr;e=br;var o=32-Fn(r)-1;r&=~(1<<o),n+=1;var i=32-Fn(t)+o;if(30<i){var a=o-o%5;i=(r&(1<<a)-1).toString(32),r>>=a,o-=a,yr=1<<32-Fn(t)+o|n<<o|r,br=i+e}else yr=1<<i|n<<o|r,br=e}function up(e){e.return!==null&&(Io(e,1),_g(e,1,0))}function cp(e){for(;e===Ql;)Ql=Ci[--Ti],Ci[Ti]=null,Zl=Ci[--Ti],Ci[Ti]=null;for(;e===Ao;)Ao=dn[--pn],dn[pn]=null,br=dn[--pn],dn[pn]=null,yr=dn[--pn],dn[pn]=null}var Yt=null,Zt=null,Oe=!1,An=null;function Mg(e,t){var n=mn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function iv(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Yt=e,Zt=Yr(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Yt=e,Zt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Ao!==null?{id:yr,overflow:br}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=mn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Yt=e,Zt=null,!0):!1;default:return!1}}function Od(e){return(e.mode&1)!==0&&(e.flags&128)===0}function _d(e){if(Oe){var t=Zt;if(t){var n=t;if(!iv(e,t)){if(Od(e))throw Error(I(418));t=Yr(n.nextSibling);var r=Yt;t&&iv(e,t)?Mg(r,n):(e.flags=e.flags&-4097|2,Oe=!1,Yt=e)}}else{if(Od(e))throw Error(I(418));e.flags=e.flags&-4097|2,Oe=!1,Yt=e}}}function av(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Yt=e}function El(e){if(e!==Yt)return!1;if(!Oe)return av(e),Oe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!kd(e.type,e.memoizedProps)),t&&(t=Zt)){if(Od(e))throw Rg(),Error(I(418));for(;t;)Mg(e,t),t=Yr(t.nextSibling)}if(av(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(I(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Zt=Yr(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Zt=null}}else Zt=Yt?Yr(e.stateNode.nextSibling):null;return!0}function Rg(){for(var e=Zt;e;)e=Yr(e.nextSibling)}function zi(){Zt=Yt=null,Oe=!1}function fp(e){An===null?An=[e]:An.push(e)}var lE=Cr.ReactCurrentBatchConfig;function Ln(e,t){if(e&&e.defaultProps){t=Pe({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var Yl=io(null),Jl=null,Ii=null,dp=null;function pp(){dp=Ii=Jl=null}function mp(e){var t=Yl.current;Ce(Yl),e._currentValue=t}function Md(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Pi(e,t){Jl=e,dp=Ii=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(At=!0),e.firstContext=null)}function vn(e){var t=e._currentValue;if(dp!==e)if(e={context:e,memoizedValue:t,next:null},Ii===null){if(Jl===null)throw Error(I(308));Ii=e,Jl.dependencies={lanes:0,firstContext:e}}else Ii=Ii.next=e;return t}var Mo=null;function hp(e){Mo===null?Mo=[e]:Mo.push(e)}function Ng(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,hp(t)):(n.next=o.next,o.next=n),t.interleaved=n,Er(e,r)}function Er(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Vr=!1;function vp(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Lg(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function wr(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Jr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(le&2)!==0){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Er(e,n)}return o=r.interleaved,o===null?(t.next=t,hp(r)):(t.next=o.next,o.next=t),r.interleaved=t,Er(e,n)}function Rl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tp(e,n)}}function sv(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Xl(e,t,n,r){var o=e.updateQueue;Vr=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var l=s,u=l.next;l.next=null,a===null?i=u:a.next=u,a=l;var c=e.alternate;c!==null&&(c=c.updateQueue,s=c.lastBaseUpdate,s!==a&&(s===null?c.firstBaseUpdate=u:s.next=u,c.lastBaseUpdate=l))}if(i!==null){var f=o.baseState;a=0,c=u=l=null,s=i;do{var v=s.lane,m=s.eventTime;if((r&v)===v){c!==null&&(c=c.next={eventTime:m,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var d=e,y=s;switch(v=t,m=n,y.tag){case 1:if(d=y.payload,typeof d=="function"){f=d.call(m,f,v);break e}f=d;break e;case 3:d.flags=d.flags&-65537|128;case 0:if(d=y.payload,v=typeof d=="function"?d.call(m,f,v):d,v==null)break e;f=Pe({},f,v);break e;case 2:Vr=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,v=o.effects,v===null?o.effects=[s]:v.push(s))}else m={eventTime:m,lane:v,tag:s.tag,payload:s.payload,callback:s.callback,next:null},c===null?(u=c=m,l=f):c=c.next=m,a|=v;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;v=s,s=v.next,v.next=null,o.lastBaseUpdate=v,o.shared.pending=null}}while(1);if(c===null&&(l=f),o.baseState=l,o.firstBaseUpdate=u,o.lastBaseUpdate=c,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);jo|=a,e.lanes=a,e.memoizedState=f}}function lv(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(I(191,o));o.call(r)}}}var Pg=new Nv.Component().refs;function Rd(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Pe({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var mu={isMounted:function(e){return(e=e._reactInternals)?Bo(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=It(),o=eo(e),i=wr(r,o);i.payload=t,n!=null&&(i.callback=n),t=Jr(e,i,o),t!==null&&(jn(t,e,o,r),Rl(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=It(),o=eo(e),i=wr(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Jr(e,i,o),t!==null&&(jn(t,e,o,r),Rl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=It(),r=eo(e),o=wr(n,r);o.tag=2,t!=null&&(o.callback=t),t=Jr(e,o,r),t!==null&&(jn(t,e,r,n),Rl(t,e,r))}};function uv(e,t,n,r,o,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!es(n,r)||!es(o,i):!0}function Ag(e,t,n){var r=!1,o=ro,i=t.contextType;return typeof i=="object"&&i!==null?i=vn(i):(o=jt(t)?Po:yt.current,r=t.contextTypes,i=(r=r!=null)?ji(e,o):ro),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=mu,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function cv(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&mu.enqueueReplaceState(t,t.state,null)}function Nd(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=Pg,vp(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=vn(i):(i=jt(t)?Po:yt.current,o.context=ji(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Rd(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&mu.enqueueReplaceState(o,o.state,null),Xl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Ma(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(I(309));var r=n.stateNode}if(!r)throw Error(I(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var s=o.refs;s===Pg&&(s=o.refs={}),a===null?delete s[i]:s[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(I(284));if(!n._owner)throw Error(I(290,e))}return e}function kl(e,t){throw e=Object.prototype.toString.call(t),Error(I(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function fv(e){var t=e._init;return t(e._payload)}function Fg(e){function t(g,h){if(e){var p=g.deletions;p===null?(g.deletions=[h],g.flags|=16):p.push(h)}}function n(g,h){if(!e)return null;for(;h!==null;)t(g,h),h=h.sibling;return null}function r(g,h){for(g=new Map;h!==null;)h.key!==null?g.set(h.key,h):g.set(h.index,h),h=h.sibling;return g}function o(g,h){return g=to(g,h),g.index=0,g.sibling=null,g}function i(g,h,p){return g.index=p,e?(p=g.alternate,p!==null?(p=p.index,p<h?(g.flags|=2,h):p):(g.flags|=2,h)):(g.flags|=1048576,h)}function a(g){return e&&g.alternate===null&&(g.flags|=2),g}function s(g,h,p,b){return h===null||h.tag!==6?(h=Xf(p,g.mode,b),h.return=g,h):(h=o(h,p),h.return=g,h)}function l(g,h,p,b){var S=p.type;return S===bi?c(g,h,p.props.children,b,p.key):h!==null&&(h.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Ur&&fv(S)===h.type)?(b=o(h,p.props),b.ref=Ma(g,h,p),b.return=g,b):(b=jl(p.type,p.key,p.props,null,g.mode,b),b.ref=Ma(g,h,p),b.return=g,b)}function u(g,h,p,b){return h===null||h.tag!==4||h.stateNode.containerInfo!==p.containerInfo||h.stateNode.implementation!==p.implementation?(h=ed(p,g.mode,b),h.return=g,h):(h=o(h,p.children||[]),h.return=g,h)}function c(g,h,p,b,S){return h===null||h.tag!==7?(h=Lo(p,g.mode,b,S),h.return=g,h):(h=o(h,p),h.return=g,h)}function f(g,h,p){if(typeof h=="string"&&h!==""||typeof h=="number")return h=Xf(""+h,g.mode,p),h.return=g,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ul:return p=jl(h.type,h.key,h.props,null,g.mode,p),p.ref=Ma(g,null,h),p.return=g,p;case yi:return h=ed(h,g.mode,p),h.return=g,h;case Ur:var b=h._init;return f(g,b(h._payload),p)}if(Aa(h)||Ta(h))return h=Lo(h,g.mode,p,null),h.return=g,h;kl(g,h)}return null}function v(g,h,p,b){var S=h!==null?h.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:s(g,h,""+p,b);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case ul:return p.key===S?l(g,h,p,b):null;case yi:return p.key===S?u(g,h,p,b):null;case Ur:return S=p._init,v(g,h,S(p._payload),b)}if(Aa(p)||Ta(p))return S!==null?null:c(g,h,p,b,null);kl(g,p)}return null}function m(g,h,p,b,S){if(typeof b=="string"&&b!==""||typeof b=="number")return g=g.get(p)||null,s(h,g,""+b,S);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ul:return g=g.get(b.key===null?p:b.key)||null,l(h,g,b,S);case yi:return g=g.get(b.key===null?p:b.key)||null,u(h,g,b,S);case Ur:var x=b._init;return m(g,h,p,x(b._payload),S)}if(Aa(b)||Ta(b))return g=g.get(p)||null,c(h,g,b,S,null);kl(h,b)}return null}function d(g,h,p,b){for(var S=null,x=null,E=h,k=h=0,T=null;E!==null&&k<p.length;k++){E.index>k?(T=E,E=null):T=E.sibling;var _=v(g,E,p[k],b);if(_===null){E===null&&(E=T);break}e&&E&&_.alternate===null&&t(g,E),h=i(_,h,k),x===null?S=_:x.sibling=_,x=_,E=T}if(k===p.length)return n(g,E),Oe&&Io(g,k),S;if(E===null){for(;k<p.length;k++)E=f(g,p[k],b),E!==null&&(h=i(E,h,k),x===null?S=E:x.sibling=E,x=E);return Oe&&Io(g,k),S}for(E=r(g,E);k<p.length;k++)T=m(E,g,k,p[k],b),T!==null&&(e&&T.alternate!==null&&E.delete(T.key===null?k:T.key),h=i(T,h,k),x===null?S=T:x.sibling=T,x=T);return e&&E.forEach(function(W){return t(g,W)}),Oe&&Io(g,k),S}function y(g,h,p,b){var S=Ta(p);if(typeof S!="function")throw Error(I(150));if(p=S.call(p),p==null)throw Error(I(151));for(var x=S=null,E=h,k=h=0,T=null,_=p.next();E!==null&&!_.done;k++,_=p.next()){E.index>k?(T=E,E=null):T=E.sibling;var W=v(g,E,_.value,b);if(W===null){E===null&&(E=T);break}e&&E&&W.alternate===null&&t(g,E),h=i(W,h,k),x===null?S=W:x.sibling=W,x=W,E=T}if(_.done)return n(g,E),Oe&&Io(g,k),S;if(E===null){for(;!_.done;k++,_=p.next())_=f(g,_.value,b),_!==null&&(h=i(_,h,k),x===null?S=_:x.sibling=_,x=_);return Oe&&Io(g,k),S}for(E=r(g,E);!_.done;k++,_=p.next())_=m(E,g,k,_.value,b),_!==null&&(e&&_.alternate!==null&&E.delete(_.key===null?k:_.key),h=i(_,h,k),x===null?S=_:x.sibling=_,x=_);return e&&E.forEach(function(ee){return t(g,ee)}),Oe&&Io(g,k),S}function w(g,h,p,b){if(typeof p=="object"&&p!==null&&p.type===bi&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case ul:e:{for(var S=p.key,x=h;x!==null;){if(x.key===S){if(S=p.type,S===bi){if(x.tag===7){n(g,x.sibling),h=o(x,p.props.children),h.return=g,g=h;break e}}else if(x.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===Ur&&fv(S)===x.type){n(g,x.sibling),h=o(x,p.props),h.ref=Ma(g,x,p),h.return=g,g=h;break e}n(g,x);break}else t(g,x);x=x.sibling}p.type===bi?(h=Lo(p.props.children,g.mode,b,p.key),h.return=g,g=h):(b=jl(p.type,p.key,p.props,null,g.mode,b),b.ref=Ma(g,h,p),b.return=g,g=b)}return a(g);case yi:e:{for(x=p.key;h!==null;){if(h.key===x)if(h.tag===4&&h.stateNode.containerInfo===p.containerInfo&&h.stateNode.implementation===p.implementation){n(g,h.sibling),h=o(h,p.children||[]),h.return=g,g=h;break e}else{n(g,h);break}else t(g,h);h=h.sibling}h=ed(p,g.mode,b),h.return=g,g=h}return a(g);case Ur:return x=p._init,w(g,h,x(p._payload),b)}if(Aa(p))return d(g,h,p,b);if(Ta(p))return y(g,h,p,b);kl(g,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,h!==null&&h.tag===6?(n(g,h.sibling),h=o(h,p),h.return=g,g=h):(n(g,h),h=Xf(p,g.mode,b),h.return=g,g=h),a(g)):n(g,h)}return w}var Di=Fg(!0),jg=Fg(!1),ps={},nr=io(ps),os=io(ps),is=io(ps);function Ro(e){if(e===ps)throw Error(I(174));return e}function gp(e,t){switch(Ee(is,t),Ee(os,e),Ee(nr,ps),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:cd(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=cd(t,e)}Ce(nr),Ee(nr,t)}function Bi(){Ce(nr),Ce(os),Ce(is)}function zg(e){Ro(is.current);var t=Ro(nr.current),n=cd(t,e.type);t!==n&&(Ee(os,e),Ee(nr,n))}function yp(e){os.current===e&&(Ce(nr),Ce(os))}var Ne=io(0);function eu(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qf=[];function bp(){for(var e=0;e<qf.length;e++)qf[e]._workInProgressVersionPrimary=null;qf.length=0}var Nl=Cr.ReactCurrentDispatcher,Kf=Cr.ReactCurrentBatchConfig,Fo=0,Le=null,Ke=null,Xe=null,tu=!1,Va=!1,as=0,uE=0;function ht(){throw Error(I(321))}function wp(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!zn(e[n],t[n]))return!1;return!0}function Sp(e,t,n,r,o,i){if(Fo=i,Le=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Nl.current=e===null||e.memoizedState===null?pE:mE,e=n(r,o),Va){i=0;do{if(Va=!1,as=0,25<=i)throw Error(I(301));i+=1,Xe=Ke=null,t.updateQueue=null,Nl.current=hE,e=n(r,o)}while(Va)}if(Nl.current=nu,t=Ke!==null&&Ke.next!==null,Fo=0,Xe=Ke=Le=null,tu=!1,t)throw Error(I(300));return e}function xp(){var e=as!==0;return as=0,e}function Xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xe===null?Le.memoizedState=Xe=e:Xe=Xe.next=e,Xe}function gn(){if(Ke===null){var e=Le.alternate;e=e!==null?e.memoizedState:null}else e=Ke.next;var t=Xe===null?Le.memoizedState:Xe.next;if(t!==null)Xe=t,Ke=e;else{if(e===null)throw Error(I(310));Ke=e,e={memoizedState:Ke.memoizedState,baseState:Ke.baseState,baseQueue:Ke.baseQueue,queue:Ke.queue,next:null},Xe===null?Le.memoizedState=Xe=e:Xe=Xe.next=e}return Xe}function ss(e,t){return typeof t=="function"?t(e):t}function Qf(e){var t=gn(),n=t.queue;if(n===null)throw Error(I(311));n.lastRenderedReducer=e;var r=Ke,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var a=o.next;o.next=i.next,i.next=a}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var s=a=null,l=null,u=i;do{var c=u.lane;if((Fo&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(s=l=f,a=r):l=l.next=f,Le.lanes|=c,jo|=c}u=u.next}while(u!==null&&u!==i);l===null?a=r:l.next=s,zn(r,t.memoizedState)||(At=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Le.lanes|=i,jo|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Zf(e){var t=gn(),n=t.queue;if(n===null)throw Error(I(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var a=o=o.next;do i=e(i,a.action),a=a.next;while(a!==o);zn(i,t.memoizedState)||(At=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Dg(){}function Bg(e,t){var n=Le,r=gn(),o=t(),i=!zn(r.memoizedState,o);if(i&&(r.memoizedState=o,At=!0),r=r.queue,Ep(Vg.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Xe!==null&&Xe.memoizedState.tag&1){if(n.flags|=2048,ls(9,Ug.bind(null,n,r,o,t),void 0,null),et===null)throw Error(I(349));(Fo&30)!==0||Hg(n,t,o)}return o}function Hg(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ug(e,t,n,r){t.value=n,t.getSnapshot=r,Wg(t)&&$g(e)}function Vg(e,t,n){return n(function(){Wg(t)&&$g(e)})}function Wg(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!zn(e,n)}catch{return!0}}function $g(e){var t=Er(e,1);t!==null&&jn(t,e,1,-1)}function dv(e){var t=Xn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:e},t.queue=e,e=e.dispatch=dE.bind(null,Le,e),[t.memoizedState,e]}function ls(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Le.updateQueue,t===null?(t={lastEffect:null,stores:null},Le.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Gg(){return gn().memoizedState}function Ll(e,t,n,r){var o=Xn();Le.flags|=e,o.memoizedState=ls(1|t,n,void 0,r===void 0?null:r)}function hu(e,t,n,r){var o=gn();r=r===void 0?null:r;var i=void 0;if(Ke!==null){var a=Ke.memoizedState;if(i=a.destroy,r!==null&&wp(r,a.deps)){o.memoizedState=ls(t,n,i,r);return}}Le.flags|=e,o.memoizedState=ls(1|t,n,i,r)}function pv(e,t){return Ll(8390656,8,e,t)}function Ep(e,t){return hu(2048,8,e,t)}function qg(e,t){return hu(4,2,e,t)}function Kg(e,t){return hu(4,4,e,t)}function Qg(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zg(e,t,n){return n=n!=null?n.concat([e]):null,hu(4,4,Qg.bind(null,t,e),n)}function kp(){}function Yg(e,t){var n=gn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wp(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Jg(e,t){var n=gn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wp(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Xg(e,t,n){return(Fo&21)===0?(e.baseState&&(e.baseState=!1,At=!0),e.memoizedState=n):(zn(n,t)||(n=ng(),Le.lanes|=n,jo|=n,e.baseState=!0),t)}function cE(e,t){var n=ve;ve=n!==0&&4>n?n:4,e(!0);var r=Kf.transition;Kf.transition={};try{e(!1),t()}finally{ve=n,Kf.transition=r}}function e1(){return gn().memoizedState}function fE(e,t,n){var r=eo(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},t1(e))n1(t,n);else if(n=Ng(e,t,n,r),n!==null){var o=It();jn(n,e,r,o),r1(n,t,r)}}function dE(e,t,n){var r=eo(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(t1(e))n1(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,s=i(a,n);if(o.hasEagerState=!0,o.eagerState=s,zn(s,a)){var l=t.interleaved;l===null?(o.next=o,hp(t)):(o.next=l.next,l.next=o),t.interleaved=o;return}}catch{}finally{}n=Ng(e,t,o,r),n!==null&&(o=It(),jn(n,e,r,o),r1(n,t,r))}}function t1(e){var t=e.alternate;return e===Le||t!==null&&t===Le}function n1(e,t){Va=tu=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function r1(e,t,n){if((n&4194240)!==0){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tp(e,n)}}var nu={readContext:vn,useCallback:ht,useContext:ht,useEffect:ht,useImperativeHandle:ht,useInsertionEffect:ht,useLayoutEffect:ht,useMemo:ht,useReducer:ht,useRef:ht,useState:ht,useDebugValue:ht,useDeferredValue:ht,useTransition:ht,useMutableSource:ht,useSyncExternalStore:ht,useId:ht,unstable_isNewReconciler:!1},pE={readContext:vn,useCallback:function(e,t){return Xn().memoizedState=[e,t===void 0?null:t],e},useContext:vn,useEffect:pv,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Ll(4194308,4,Qg.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ll(4194308,4,e,t)},useInsertionEffect:function(e,t){return Ll(4,2,e,t)},useMemo:function(e,t){var n=Xn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Xn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=fE.bind(null,Le,e),[r.memoizedState,e]},useRef:function(e){var t=Xn();return e={current:e},t.memoizedState=e},useState:dv,useDebugValue:kp,useDeferredValue:function(e){return Xn().memoizedState=e},useTransition:function(){var e=dv(!1),t=e[0];return e=cE.bind(null,e[1]),Xn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Le,o=Xn();if(Oe){if(n===void 0)throw Error(I(407));n=n()}else{if(n=t(),et===null)throw Error(I(349));(Fo&30)!==0||Hg(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,pv(Vg.bind(null,r,i,e),[e]),r.flags|=2048,ls(9,Ug.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Xn(),t=et.identifierPrefix;if(Oe){var n=br,r=yr;n=(r&~(1<<32-Fn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=as++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=uE++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},mE={readContext:vn,useCallback:Yg,useContext:vn,useEffect:Ep,useImperativeHandle:Zg,useInsertionEffect:qg,useLayoutEffect:Kg,useMemo:Jg,useReducer:Qf,useRef:Gg,useState:function(){return Qf(ss)},useDebugValue:kp,useDeferredValue:function(e){var t=gn();return Xg(t,Ke.memoizedState,e)},useTransition:function(){var e=Qf(ss)[0],t=gn().memoizedState;return[e,t]},useMutableSource:Dg,useSyncExternalStore:Bg,useId:e1,unstable_isNewReconciler:!1},hE={readContext:vn,useCallback:Yg,useContext:vn,useEffect:Ep,useImperativeHandle:Zg,useInsertionEffect:qg,useLayoutEffect:Kg,useMemo:Jg,useReducer:Zf,useRef:Gg,useState:function(){return Zf(ss)},useDebugValue:kp,useDeferredValue:function(e){var t=gn();return Ke===null?t.memoizedState=e:Xg(t,Ke.memoizedState,e)},useTransition:function(){var e=Zf(ss)[0],t=gn().memoizedState;return[e,t]},useMutableSource:Dg,useSyncExternalStore:Bg,useId:e1,unstable_isNewReconciler:!1};function Hi(e,t){try{var n="",r=t;do n+=$x(r),r=r.return;while(r);var o=n}catch(i){o=`\nError generating stack: `+i.message+`\n`+i.stack}return{value:e,source:t,stack:o,digest:null}}function Yf(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Ld(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var vE=typeof WeakMap=="function"?WeakMap:Map;function o1(e,t,n){n=wr(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ou||(ou=!0,Vd=r),Ld(e,t)},n}function i1(e,t,n){n=wr(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){Ld(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Ld(e,t),typeof r!="function"&&(Xr===null?Xr=new Set([this]):Xr.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function mv(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new vE;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=ME.bind(null,e,t,n),t.then(e,e))}function hv(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function vv(e,t,n,r,o){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=wr(-1,1),t.tag=2,Jr(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=o,e)}var gE=Cr.ReactCurrentOwner,At=!1;function Tt(e,t,n,r){t.child=e===null?jg(t,null,n,r):Di(t,e.child,n,r)}function gv(e,t,n,r,o){n=n.render;var i=t.ref;return Pi(t,o),r=Sp(e,t,n,r,i,o),n=xp(),e!==null&&!At?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,kr(e,t,o)):(Oe&&n&&up(t),t.flags|=1,Tt(e,t,r,o),t.child)}function yv(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Np(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,a1(e,t,i,r,o)):(e=jl(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,(e.lanes&o)===0){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:es,n(a,r)&&e.ref===t.ref)return kr(e,t,o)}return t.flags|=1,e=to(i,r),e.ref=t.ref,e.return=t,t.child=e}function a1(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(es(i,r)&&e.ref===t.ref)if(At=!1,t.pendingProps=r=i,(e.lanes&o)!==0)(e.flags&131072)!==0&&(At=!0);else return t.lanes=e.lanes,kr(e,t,o)}return Pd(e,t,n,r,o)}function s1(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ee(_i,Qt),Qt|=n;else{if((n&1073741824)===0)return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ee(_i,Qt),Qt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Ee(_i,Qt),Qt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Ee(_i,Qt),Qt|=r;return Tt(e,t,o,n),t.child}function l1(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Pd(e,t,n,r,o){var i=jt(n)?Po:yt.current;return i=ji(t,i),Pi(t,o),n=Sp(e,t,n,r,i,o),r=xp(),e!==null&&!At?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,kr(e,t,o)):(Oe&&r&&up(t),t.flags|=1,Tt(e,t,n,o),t.child)}function bv(e,t,n,r,o){if(jt(n)){var i=!0;Kl(t)}else i=!1;if(Pi(t,o),t.stateNode===null)Pl(e,t),Ag(t,n,r),Nd(t,n,r,o),r=!0;else if(e===null){var a=t.stateNode,s=t.memoizedProps;a.props=s;var l=a.context,u=n.contextType;typeof u=="object"&&u!==null?u=vn(u):(u=jt(n)?Po:yt.current,u=ji(t,u));var c=n.getDerivedStateFromProps,f=typeof c=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==r||l!==u)&&cv(t,a,r,u),Vr=!1;var v=t.memoizedState;a.state=v,Xl(t,r,a,o),l=t.memoizedState,s!==r||v!==l||Ft.current||Vr?(typeof c=="function"&&(Rd(t,n,c,r),l=t.memoizedState),(s=Vr||uv(t,n,s,r,v,l,u))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=u,r=s):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Lg(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:Ln(t.type,s),a.props=u,f=t.pendingProps,v=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=vn(l):(l=jt(n)?Po:yt.current,l=ji(t,l));var m=n.getDerivedStateFromProps;(c=typeof m=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==f||v!==l)&&cv(t,a,r,l),Vr=!1,v=t.memoizedState,a.state=v,Xl(t,r,a,o);var d=t.memoizedState;s!==f||v!==d||Ft.current||Vr?(typeof m=="function"&&(Rd(t,n,m,r),d=t.memoizedState),(u=Vr||uv(t,n,u,r,v,d,l)||!1)?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,d,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,d,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=d),a.props=r,a.state=d,a.context=l,r=u):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&v===e.memoizedState||(t.flags|=1024),r=!1)}return Ad(e,t,n,r,i,o)}function Ad(e,t,n,r,o,i){l1(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return o&&ov(t,n,!1),kr(e,t,i);r=t.stateNode,gE.current=t;var s=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=Di(t,e.child,null,i),t.child=Di(t,null,s,i)):Tt(e,t,s,i),t.memoizedState=r.state,o&&ov(t,n,!0),t.child}function u1(e){var t=e.stateNode;t.pendingContext?rv(e,t.pendingContext,t.pendingContext!==t.context):t.context&&rv(e,t.context,!1),gp(e,t.containerInfo)}function wv(e,t,n,r,o){return zi(),fp(o),t.flags|=256,Tt(e,t,n,r),t.child}var Fd={dehydrated:null,treeContext:null,retryLane:0};function jd(e){return{baseLanes:e,cachePool:null,transitions:null}}function c1(e,t,n){var r=t.pendingProps,o=Ne.current,i=!1,a=(t.flags&128)!==0,s;if((s=a)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Ee(Ne,o&1),e===null)return _d(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},(r&1)===0&&i!==null?(i.childLanes=0,i.pendingProps=a):i=yu(a,r,0,null),e=Lo(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=jd(n),t.memoizedState=Fd,e):Cp(t,a));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return yE(e,t,a,r,s,o,n);if(i){i=r.fallback,a=t.mode,o=e.child,s=o.sibling;var l={mode:"hidden",children:r.children};return(a&1)===0&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=to(o,l),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?i=to(s,i):(i=Lo(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?jd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Fd,r}return i=e.child,e=i.sibling,r=to(i,{mode:"visible",children:r.children}),(t.mode&1)===0&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Cp(e,t){return t=yu({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Cl(e,t,n,r){return r!==null&&fp(r),Di(t,e.child,null,n),e=Cp(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function yE(e,t,n,r,o,i,a){if(n)return t.flags&256?(t.flags&=-257,r=Yf(Error(I(422))),Cl(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=yu({mode:"visible",children:r.children},o,0,null),i=Lo(i,o,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,(t.mode&1)!==0&&Di(t,e.child,null,a),t.child.memoizedState=jd(a),t.memoizedState=Fd,i);if((t.mode&1)===0)return Cl(e,t,a,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(I(419)),r=Yf(i,r,void 0),Cl(e,t,a,r)}if(s=(a&e.childLanes)!==0,At||s){if(r=et,r!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=(o&(r.suspendedLanes|a))!==0?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,Er(e,o),jn(r,e,o,-1))}return Rp(),r=Yf(Error(I(421))),Cl(e,t,a,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=RE.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Zt=Yr(o.nextSibling),Yt=t,Oe=!0,An=null,e!==null&&(dn[pn++]=yr,dn[pn++]=br,dn[pn++]=Ao,yr=e.id,br=e.overflow,Ao=t),t=Cp(t,r.children),t.flags|=4096,t)}function Sv(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Md(e.return,t,n)}function Jf(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function f1(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(Tt(e,t,r.children,n),r=Ne.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Sv(e,n,t);else if(e.tag===19)Sv(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ee(Ne,r),(t.mode&1)===0)t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&eu(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Jf(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&eu(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Jf(t,!0,n,null,i);break;case"together":Jf(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Pl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function kr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),jo|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(I(153));if(t.child!==null){for(e=t.child,n=to(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=to(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function bE(e,t,n){switch(t.tag){case 3:u1(t),zi();break;case 5:zg(t);break;case 1:jt(t.type)&&Kl(t);break;case 4:gp(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Ee(Yl,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ee(Ne,Ne.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?c1(e,t,n):(Ee(Ne,Ne.current&1),e=kr(e,t,n),e!==null?e.sibling:null);Ee(Ne,Ne.current&1);break;case 19:if(r=(n&t.childLanes)!==0,(e.flags&128)!==0){if(r)return f1(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Ee(Ne,Ne.current),r)break;return null;case 22:case 23:return t.lanes=0,s1(e,t,n)}return kr(e,t,n)}var d1,zd,p1,m1;d1=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};zd=function(){};p1=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Ro(nr.current);var i=null;switch(n){case"input":o=ad(e,o),r=ad(e,r),i=[];break;case"select":o=Pe({},o,{value:void 0}),r=Pe({},r,{value:void 0}),i=[];break;case"textarea":o=ud(e,o),r=ud(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Gl)}fd(n,r);var a;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var s=o[u];for(a in s)s.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(qa.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var l=r[u];if(s=o?.[u],r.hasOwnProperty(u)&&l!==s&&(l!=null||s!=null))if(u==="style")if(s){for(a in s)!s.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&s[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(i||(i=[]),i.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(i=i||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(qa.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&ke("scroll",e),i||s===l||(i=[])):(i=i||[]).push(u,l))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};m1=function(e,t,n,r){n!==r&&(t.flags|=4)};function Ra(e,t){if(!Oe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function vt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function wE(e,t,n){var r=t.pendingProps;switch(cp(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vt(t),null;case 1:return jt(t.type)&&ql(),vt(t),null;case 3:return r=t.stateNode,Bi(),Ce(Ft),Ce(yt),bp(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(El(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,An!==null&&(Gd(An),An=null))),zd(e,t),vt(t),null;case 5:yp(t);var o=Ro(is.current);if(n=t.type,e!==null&&t.stateNode!=null)p1(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(I(166));return vt(t),null}if(e=Ro(nr.current),El(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[er]=t,r[rs]=i,e=(t.mode&1)!==0,n){case"dialog":ke("cancel",r),ke("close",r);break;case"iframe":case"object":case"embed":ke("load",r);break;case"video":case"audio":for(o=0;o<ja.length;o++)ke(ja[o],r);break;case"source":ke("error",r);break;case"img":case"image":case"link":ke("error",r),ke("load",r);break;case"details":ke("toggle",r);break;case"input":_0(r,i),ke("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ke("invalid",r);break;case"textarea":R0(r,i),ke("invalid",r)}fd(n,i),o=null;for(var a in i)if(i.hasOwnProperty(a)){var s=i[a];a==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&xl(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&xl(r.textContent,s,e),o=["children",""+s]):qa.hasOwnProperty(a)&&s!=null&&a==="onScroll"&&ke("scroll",r)}switch(n){case"input":cl(r),M0(r,i,!0);break;case"textarea":cl(r),N0(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Gl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Hv(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[er]=t,e[rs]=r,d1(e,t,!1,!1),t.stateNode=e;e:{switch(a=dd(n,r),n){case"dialog":ke("cancel",e),ke("close",e),o=r;break;case"iframe":case"object":case"embed":ke("load",e),o=r;break;case"video":case"audio":for(o=0;o<ja.length;o++)ke(ja[o],e);o=r;break;case"source":ke("error",e),o=r;break;case"img":case"image":case"link":ke("error",e),ke("load",e),o=r;break;case"details":ke("toggle",e),o=r;break;case"input":_0(e,r),o=ad(e,r),ke("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Pe({},r,{value:void 0}),ke("invalid",e);break;case"textarea":R0(e,r),o=ud(e,r),ke("invalid",e);break;default:o=r}fd(n,o),s=o;for(i in s)if(s.hasOwnProperty(i)){var l=s[i];i==="style"?Wv(e,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Uv(e,l)):i==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ka(e,l):typeof l=="number"&&Ka(e,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(qa.hasOwnProperty(i)?l!=null&&i==="onScroll"&&ke("scroll",e):l!=null&&Qd(e,i,l,a))}switch(n){case"input":cl(e),M0(e,r,!1);break;case"textarea":cl(e),N0(e);break;case"option":r.value!=null&&e.setAttribute("value",""+no(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Mi(e,!!r.multiple,i,!1):r.defaultValue!=null&&Mi(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Gl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return vt(t),null;case 6:if(e&&t.stateNode!=null)m1(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(I(166));if(n=Ro(is.current),Ro(nr.current),El(t)){if(r=t.stateNode,n=t.memoizedProps,r[er]=t,(i=r.nodeValue!==n)&&(e=Yt,e!==null))switch(e.tag){case 3:xl(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xl(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[er]=t,t.stateNode=r}return vt(t),null;case 13:if(Ce(Ne),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Oe&&Zt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Rg(),zi(),t.flags|=98560,i=!1;else if(i=El(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(I(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(I(317));i[er]=t}else zi(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;vt(t),i=!1}else An!==null&&(Gd(An),An=null),i=!0;if(!i)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Ne.current&1)!==0?Qe===0&&(Qe=3):Rp())),t.updateQueue!==null&&(t.flags|=4),vt(t),null);case 4:return Bi(),zd(e,t),e===null&&ts(t.stateNode.containerInfo),vt(t),null;case 10:return mp(t.type._context),vt(t),null;case 17:return jt(t.type)&&ql(),vt(t),null;case 19:if(Ce(Ne),i=t.memoizedState,i===null)return vt(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)Ra(i,!1);else{if(Qe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=eu(e),a!==null){for(t.flags|=128,Ra(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ee(Ne,Ne.current&1|2),t.child}e=e.sibling}i.tail!==null&&De()>Ui&&(t.flags|=128,r=!0,Ra(i,!1),t.lanes=4194304)}else{if(!r)if(e=eu(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Ra(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!Oe)return vt(t),null}else 2*De()-i.renderingStartTime>Ui&&n!==1073741824&&(t.flags|=128,r=!0,Ra(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=De(),t.sibling=null,n=Ne.current,Ee(Ne,r?n&1|2:n&1),t):(vt(t),null);case 22:case 23:return Mp(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&(t.mode&1)!==0?(Qt&1073741824)!==0&&(vt(t),t.subtreeFlags&6&&(t.flags|=8192)):vt(t),null;case 24:return null;case 25:return null}throw Error(I(156,t.tag))}function SE(e,t){switch(cp(t),t.tag){case 1:return jt(t.type)&&ql(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bi(),Ce(Ft),Ce(yt),bp(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return yp(t),null;case 13:if(Ce(Ne),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(I(340));zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ce(Ne),null;case 4:return Bi(),null;case 10:return mp(t.type._context),null;case 22:case 23:return Mp(),null;case 24:return null;default:return null}}var Tl=!1,gt=!1,xE=typeof WeakSet=="function"?WeakSet:Set,P=null;function Oi(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Fe(e,t,r)}else n.current=null}function Dd(e,t,n){try{n()}catch(r){Fe(e,t,r)}}var xv=!1;function EE(e,t){if(xd=Vl,e=yg(),lp(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,s=-1,l=-1,u=0,c=0,f=e,v=null;t:for(;;){for(var m;f!==n||o!==0&&f.nodeType!==3||(s=a+o),f!==i||r!==0&&f.nodeType!==3||(l=a+r),f.nodeType===3&&(a+=f.nodeValue.length),(m=f.firstChild)!==null;)v=f,f=m;for(;;){if(f===e)break t;if(v===n&&++u===o&&(s=a),v===i&&++c===r&&(l=a),(m=f.nextSibling)!==null)break;f=v,v=f.parentNode}f=m}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ed={focusedElem:e,selectionRange:n},Vl=!1,P=t;P!==null;)if(t=P,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,P=e;else for(;P!==null;){t=P;try{var d=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(d!==null){var y=d.memoizedProps,w=d.memoizedState,g=t.stateNode,h=g.getSnapshotBeforeUpdate(t.elementType===t.type?y:Ln(t.type,y),w);g.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(I(163))}}catch(b){Fe(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,P=e;break}P=t.return}return d=xv,xv=!1,d}function Wa(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Dd(t,n,i)}o=o.next}while(o!==r)}}function vu(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Bd(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function h1(e){var t=e.alternate;t!==null&&(e.alternate=null,h1(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[er],delete t[rs],delete t[Td],delete t[iE],delete t[aE])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function v1(e){return e.tag===5||e.tag===3||e.tag===4}function Ev(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||v1(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Hd(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Gl));else if(r!==4&&(e=e.child,e!==null))for(Hd(e,t,n),e=e.sibling;e!==null;)Hd(e,t,n),e=e.sibling}function Ud(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ud(e,t,n),e=e.sibling;e!==null;)Ud(e,t,n),e=e.sibling}var it=null,Pn=!1;function Hr(e,t,n){for(n=n.child;n!==null;)g1(e,t,n),n=n.sibling}function g1(e,t,n){if(tr&&typeof tr.onCommitFiberUnmount=="function")try{tr.onCommitFiberUnmount(lu,n)}catch{}switch(n.tag){case 5:gt||Oi(n,t);case 6:var r=it,o=Pn;it=null,Hr(e,t,n),it=r,Pn=o,it!==null&&(Pn?(e=it,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):it.removeChild(n.stateNode));break;case 18:it!==null&&(Pn?(e=it,n=n.stateNode,e.nodeType===8?$f(e.parentNode,n):e.nodeType===1&&$f(e,n),Ja(e)):$f(it,n.stateNode));break;case 4:r=it,o=Pn,it=n.stateNode.containerInfo,Pn=!0,Hr(e,t,n),it=r,Pn=o;break;case 0:case 11:case 14:case 15:if(!gt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,a=i.destroy;i=i.tag,a!==void 0&&((i&2)!==0||(i&4)!==0)&&Dd(n,t,a),o=o.next}while(o!==r)}Hr(e,t,n);break;case 1:if(!gt&&(Oi(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){Fe(n,t,s)}Hr(e,t,n);break;case 21:Hr(e,t,n);break;case 22:n.mode&1?(gt=(r=gt)||n.memoizedState!==null,Hr(e,t,n),gt=r):Hr(e,t,n);break;default:Hr(e,t,n)}}function kv(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new xE),t.forEach(function(r){var o=NE.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function Nn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,a=t,s=a;e:for(;s!==null;){switch(s.tag){case 5:it=s.stateNode,Pn=!1;break e;case 3:it=s.stateNode.containerInfo,Pn=!0;break e;case 4:it=s.stateNode.containerInfo,Pn=!0;break e}s=s.return}if(it===null)throw Error(I(160));g1(i,a,o),it=null,Pn=!1;var l=o.alternate;l!==null&&(l.return=null),o.return=null}catch(u){Fe(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)y1(t,e),t=t.sibling}function y1(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Nn(t,e),Jn(e),r&4){try{Wa(3,e,e.return),vu(3,e)}catch(y){Fe(e,e.return,y)}try{Wa(5,e,e.return)}catch(y){Fe(e,e.return,y)}}break;case 1:Nn(t,e),Jn(e),r&512&&n!==null&&Oi(n,n.return);break;case 5:if(Nn(t,e),Jn(e),r&512&&n!==null&&Oi(n,n.return),e.flags&32){var o=e.stateNode;try{Ka(o,"")}catch(y){Fe(e,e.return,y)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Dv(o,i),dd(s,a);var u=dd(s,i);for(a=0;a<l.length;a+=2){var c=l[a],f=l[a+1];c==="style"?Wv(o,f):c==="dangerouslySetInnerHTML"?Uv(o,f):c==="children"?Ka(o,f):Qd(o,c,f,u)}switch(s){case"input":sd(o,i);break;case"textarea":Bv(o,i);break;case"select":var v=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?Mi(o,!!i.multiple,m,!1):v!==!!i.multiple&&(i.defaultValue!=null?Mi(o,!!i.multiple,i.defaultValue,!0):Mi(o,!!i.multiple,i.multiple?[]:"",!1))}o[rs]=i}catch(y){Fe(e,e.return,y)}}break;case 6:if(Nn(t,e),Jn(e),r&4){if(e.stateNode===null)throw Error(I(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(y){Fe(e,e.return,y)}}break;case 3:if(Nn(t,e),Jn(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ja(t.containerInfo)}catch(y){Fe(e,e.return,y)}break;case 4:Nn(t,e),Jn(e);break;case 13:Nn(t,e),Jn(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Op=De())),r&4&&kv(e);break;case 22:if(c=n!==null&&n.memoizedState!==null,e.mode&1?(gt=(u=gt)||c,Nn(t,e),gt=u):Nn(t,e),Jn(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&(e.mode&1)!==0)for(P=e,c=e.child;c!==null;){for(f=P=c;P!==null;){switch(v=P,m=v.child,v.tag){case 0:case 11:case 14:case 15:Wa(4,v,v.return);break;case 1:Oi(v,v.return);var d=v.stateNode;if(typeof d.componentWillUnmount=="function"){r=v,n=v.return;try{t=r,d.props=t.memoizedProps,d.state=t.memoizedState,d.componentWillUnmount()}catch(y){Fe(r,n,y)}}break;case 5:Oi(v,v.return);break;case 22:if(v.memoizedState!==null){Tv(f);continue}}m!==null?(m.return=v,P=m):Tv(f)}c=c.sibling}e:for(c=null,f=e;;){if(f.tag===5){if(c===null){c=f;try{o=f.stateNode,u?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=Vv("display",a))}catch(y){Fe(e,e.return,y)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(y){Fe(e,e.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Nn(t,e),Jn(e),r&4&&kv(e);break;case 21:break;default:Nn(t,e),Jn(e)}}function Jn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(v1(n)){var r=n;break e}n=n.return}throw Error(I(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Ka(o,""),r.flags&=-33);var i=Ev(e);Ud(e,i,o);break;case 3:case 4:var a=r.stateNode.containerInfo,s=Ev(e);Hd(e,s,a);break;default:throw Error(I(161))}}catch(l){Fe(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function kE(e,t,n){P=e,b1(e,t,n)}function b1(e,t,n){for(var r=(e.mode&1)!==0;P!==null;){var o=P,i=o.child;if(o.tag===22&&r){var a=o.memoizedState!==null||Tl;if(!a){var s=o.alternate,l=s!==null&&s.memoizedState!==null||gt;s=Tl;var u=gt;if(Tl=a,(gt=l)&&!u)for(P=o;P!==null;)a=P,l=a.child,a.tag===22&&a.memoizedState!==null?Iv(o):l!==null?(l.return=a,P=l):Iv(o);for(;i!==null;)P=i,b1(i,t,n),i=i.sibling;P=o,Tl=s,gt=u}Cv(e,t,n)}else(o.subtreeFlags&8772)!==0&&i!==null?(i.return=o,P=i):Cv(e,t,n)}}function Cv(e){for(;P!==null;){var t=P;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:gt||vu(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!gt)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Ln(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&lv(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}lv(t,a,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&Ja(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(I(163))}gt||t.flags&512&&Bd(t)}catch(v){Fe(t,t.return,v)}}if(t===e){P=null;break}if(n=t.sibling,n!==null){n.return=t.return,P=n;break}P=t.return}}function Tv(e){for(;P!==null;){var t=P;if(t===e){P=null;break}var n=t.sibling;if(n!==null){n.return=t.return,P=n;break}P=t.return}}function Iv(e){for(;P!==null;){var t=P;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{vu(4,t)}catch(l){Fe(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(l){Fe(t,o,l)}}var i=t.return;try{Bd(t)}catch(l){Fe(t,i,l)}break;case 5:var a=t.return;try{Bd(t)}catch(l){Fe(t,a,l)}}}catch(l){Fe(t,t.return,l)}if(t===e){P=null;break}var s=t.sibling;if(s!==null){s.return=t.return,P=s;break}P=t.return}}var CE=Math.ceil,ru=Cr.ReactCurrentDispatcher,Tp=Cr.ReactCurrentOwner,hn=Cr.ReactCurrentBatchConfig,le=0,et=null,We=null,at=0,Qt=0,_i=io(0),Qe=0,us=null,jo=0,gu=0,Ip=0,$a=null,Pt=null,Op=0,Ui=1/0,vr=null,ou=!1,Vd=null,Xr=null,Il=!1,qr=null,iu=0,Ga=0,Wd=null,Al=-1,Fl=0;function It(){return(le&6)!==0?De():Al!==-1?Al:Al=De()}function eo(e){return(e.mode&1)===0?1:(le&2)!==0&&at!==0?at&-at:lE.transition!==null?(Fl===0&&(Fl=ng()),Fl):(e=ve,e!==0||(e=window.event,e=e===void 0?16:ug(e.type)),e)}function jn(e,t,n,r){if(50<Ga)throw Ga=0,Wd=null,Error(I(185));cs(e,n,r),((le&2)===0||e!==et)&&(e===et&&((le&2)===0&&(gu|=n),Qe===4&&$r(e,at)),zt(e,r),n===1&&le===0&&(t.mode&1)===0&&(Ui=De()+500,pu&&ao()))}function zt(e,t){var n=e.callbackNode;c5(e,t);var r=Ul(e,e===et?at:0);if(r===0)n!==null&&A0(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&A0(n),t===1)e.tag===0?sE(Ov.bind(null,e)):Og(Ov.bind(null,e)),rE(function(){(le&6)===0&&ao()}),n=null;else{switch(rg(r)){case 1:n=ep;break;case 4:n=eg;break;case 16:n=Hl;break;case 536870912:n=tg;break;default:n=Hl}n=I1(n,w1.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function w1(e,t){if(Al=-1,Fl=0,(le&6)!==0)throw Error(I(327));var n=e.callbackNode;if(Ai()&&e.callbackNode!==n)return null;var r=Ul(e,e===et?at:0);if(r===0)return null;if((r&30)!==0||(r&e.expiredLanes)!==0||t)t=au(e,r);else{t=r;var o=le;le|=2;var i=x1();(et!==e||at!==t)&&(vr=null,Ui=De()+500,No(e,t));do try{OE();break}catch(s){S1(e,s)}while(1);pp(),ru.current=i,le=o,We!==null?t=0:(et=null,at=0,t=Qe)}if(t!==0){if(t===2&&(o=gd(e),o!==0&&(r=o,t=$d(e,o))),t===1)throw n=us,No(e,0),$r(e,r),zt(e,De()),n;if(t===6)$r(e,r);else{if(o=e.current.alternate,(r&30)===0&&!TE(o)&&(t=au(e,r),t===2&&(i=gd(e),i!==0&&(r=i,t=$d(e,i))),t===1))throw n=us,No(e,0),$r(e,r),zt(e,De()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(I(345));case 2:Oo(e,Pt,vr);break;case 3:if($r(e,r),(r&130023424)===r&&(t=Op+500-De(),10<t)){if(Ul(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){It(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Cd(Oo.bind(null,e,Pt,vr),t);break}Oo(e,Pt,vr);break;case 4:if($r(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var a=31-Fn(r);i=1<<a,a=t[a],a>o&&(o=a),r&=~i}if(r=o,r=De()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*CE(r/1960))-r,10<r){e.timeoutHandle=Cd(Oo.bind(null,e,Pt,vr),r);break}Oo(e,Pt,vr);break;case 5:Oo(e,Pt,vr);break;default:throw Error(I(329))}}}return zt(e,De()),e.callbackNode===n?w1.bind(null,e):null}function $d(e,t){var n=$a;return e.current.memoizedState.isDehydrated&&(No(e,t).flags|=256),e=au(e,t),e!==2&&(t=Pt,Pt=n,t!==null&&Gd(t)),e}function Gd(e){Pt===null?Pt=e:Pt.push.apply(Pt,e)}function TE(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!zn(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $r(e,t){for(t&=~Ip,t&=~gu,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Fn(t),r=1<<n;e[n]=-1,t&=~r}}function Ov(e){if((le&6)!==0)throw Error(I(327));Ai();var t=Ul(e,0);if((t&1)===0)return zt(e,De()),null;var n=au(e,t);if(e.tag!==0&&n===2){var r=gd(e);r!==0&&(t=r,n=$d(e,r))}if(n===1)throw n=us,No(e,0),$r(e,t),zt(e,De()),n;if(n===6)throw Error(I(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Oo(e,Pt,vr),zt(e,De()),null}function _p(e,t){var n=le;le|=1;try{return e(t)}finally{le=n,le===0&&(Ui=De()+500,pu&&ao())}}function zo(e){qr!==null&&qr.tag===0&&(le&6)===0&&Ai();var t=le;le|=1;var n=hn.transition,r=ve;try{if(hn.transition=null,ve=1,e)return e()}finally{ve=r,hn.transition=n,le=t,(le&6)===0&&ao()}}function Mp(){Qt=_i.current,Ce(_i)}function No(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,nE(n)),We!==null)for(n=We.return;n!==null;){var r=n;switch(cp(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&ql();break;case 3:Bi(),Ce(Ft),Ce(yt),bp();break;case 5:yp(r);break;case 4:Bi();break;case 13:Ce(Ne);break;case 19:Ce(Ne);break;case 10:mp(r.type._context);break;case 22:case 23:Mp()}n=n.return}if(et=e,We=e=to(e.current,null),at=Qt=t,Qe=0,us=null,Ip=gu=jo=0,Pt=$a=null,Mo!==null){for(t=0;t<Mo.length;t++)if(n=Mo[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=o,r.next=a}n.pending=r}Mo=null}return e}function S1(e,t){do{var n=We;try{if(pp(),Nl.current=nu,tu){for(var r=Le.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}tu=!1}if(Fo=0,Xe=Ke=Le=null,Va=!1,as=0,Tp.current=null,n===null||n.return===null){Qe=1,us=t,We=null;break}e:{var i=e,a=n.return,s=n,l=t;if(t=at,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=s,f=c.tag;if((c.mode&1)===0&&(f===0||f===11||f===15)){var v=c.alternate;v?(c.updateQueue=v.updateQueue,c.memoizedState=v.memoizedState,c.lanes=v.lanes):(c.updateQueue=null,c.memoizedState=null)}var m=hv(a);if(m!==null){m.flags&=-257,vv(m,a,s,i,t),m.mode&1&&mv(i,u,t),t=m,l=u;var d=t.updateQueue;if(d===null){var y=new Set;y.add(l),t.updateQueue=y}else d.add(l);break e}else{if((t&1)===0){mv(i,u,t),Rp();break e}l=Error(I(426))}}else if(Oe&&s.mode&1){var w=hv(a);if(w!==null){(w.flags&65536)===0&&(w.flags|=256),vv(w,a,s,i,t),fp(Hi(l,s));break e}}i=l=Hi(l,s),Qe!==4&&(Qe=2),$a===null?$a=[i]:$a.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var g=o1(i,l,t);sv(i,g);break e;case 1:s=l;var h=i.type,p=i.stateNode;if((i.flags&128)===0&&(typeof h.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(Xr===null||!Xr.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var b=i1(i,s,t);sv(i,b);break e}}i=i.return}while(i!==null)}k1(n)}catch(S){t=S,We===n&&n!==null&&(We=n=n.return);continue}break}while(1)}function x1(){var e=ru.current;return ru.current=nu,e===null?nu:e}function Rp(){(Qe===0||Qe===3||Qe===2)&&(Qe=4),et===null||(jo&268435455)===0&&(gu&268435455)===0||$r(et,at)}function au(e,t){var n=le;le|=2;var r=x1();(et!==e||at!==t)&&(vr=null,No(e,t));do try{IE();break}catch(o){S1(e,o)}while(1);if(pp(),le=n,ru.current=r,We!==null)throw Error(I(261));return et=null,at=0,Qe}function IE(){for(;We!==null;)E1(We)}function OE(){for(;We!==null&&!t5();)E1(We)}function E1(e){var t=T1(e.alternate,e,Qt);e.memoizedProps=e.pendingProps,t===null?k1(e):We=t,Tp.current=null}function k1(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=wE(n,t,Qt),n!==null){We=n;return}}else{if(n=SE(n,t),n!==null){n.flags&=32767,We=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{Qe=6,We=null;return}}if(t=t.sibling,t!==null){We=t;return}We=t=e}while(t!==null);Qe===0&&(Qe=5)}function Oo(e,t,n){var r=ve,o=hn.transition;try{hn.transition=null,ve=1,_E(e,t,n,r)}finally{hn.transition=o,ve=r}return null}function _E(e,t,n,r){do Ai();while(qr!==null);if((le&6)!==0)throw Error(I(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(I(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(f5(e,i),e===et&&(We=et=null,at=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||Il||(Il=!0,I1(Hl,function(){return Ai(),null})),i=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||i){i=hn.transition,hn.transition=null;var a=ve;ve=1;var s=le;le|=4,Tp.current=null,EE(e,n),y1(n,e),Y5(Ed),Vl=!!xd,Ed=xd=null,e.current=n,kE(n,e,o),n5(),le=s,ve=a,hn.transition=i}else e.current=n;if(Il&&(Il=!1,qr=e,iu=o),i=e.pendingLanes,i===0&&(Xr=null),i5(n.stateNode,r),zt(e,De()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(ou)throw ou=!1,e=Vd,Vd=null,e;return(iu&1)!==0&&e.tag!==0&&Ai(),i=e.pendingLanes,(i&1)!==0?e===Wd?Ga++:(Ga=0,Wd=e):Ga=0,ao(),null}function Ai(){if(qr!==null){var e=rg(iu),t=hn.transition,n=ve;try{if(hn.transition=null,ve=16>e?16:e,qr===null)var r=!1;else{if(e=qr,qr=null,iu=0,(le&6)!==0)throw Error(I(331));var o=le;for(le|=4,P=e.current;P!==null;){var i=P,a=i.child;if((P.flags&16)!==0){var s=i.deletions;if(s!==null){for(var l=0;l<s.length;l++){var u=s[l];for(P=u;P!==null;){var c=P;switch(c.tag){case 0:case 11:case 15:Wa(8,c,i)}var f=c.child;if(f!==null)f.return=c,P=f;else for(;P!==null;){c=P;var v=c.sibling,m=c.return;if(h1(c),c===u){P=null;break}if(v!==null){v.return=m,P=v;break}P=m}}}var d=i.alternate;if(d!==null){var y=d.child;if(y!==null){d.child=null;do{var w=y.sibling;y.sibling=null,y=w}while(y!==null)}}P=i}}if((i.subtreeFlags&2064)!==0&&a!==null)a.return=i,P=a;else e:for(;P!==null;){if(i=P,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:Wa(9,i,i.return)}var g=i.sibling;if(g!==null){g.return=i.return,P=g;break e}P=i.return}}var h=e.current;for(P=h;P!==null;){a=P;var p=a.child;if((a.subtreeFlags&2064)!==0&&p!==null)p.return=a,P=p;else e:for(a=h;P!==null;){if(s=P,(s.flags&2048)!==0)try{switch(s.tag){case 0:case 11:case 15:vu(9,s)}}catch(S){Fe(s,s.return,S)}if(s===a){P=null;break e}var b=s.sibling;if(b!==null){b.return=s.return,P=b;break e}P=s.return}}if(le=o,ao(),tr&&typeof tr.onPostCommitFiberRoot=="function")try{tr.onPostCommitFiberRoot(lu,e)}catch{}r=!0}return r}finally{ve=n,hn.transition=t}}return!1}function _v(e,t,n){t=Hi(n,t),t=o1(e,t,1),e=Jr(e,t,1),t=It(),e!==null&&(cs(e,1,t),zt(e,t))}function Fe(e,t,n){if(e.tag===3)_v(e,e,n);else for(;t!==null;){if(t.tag===3){_v(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Xr===null||!Xr.has(r))){e=Hi(n,e),e=i1(t,e,1),t=Jr(t,e,1),e=It(),t!==null&&(cs(t,1,e),zt(t,e));break}}t=t.return}}function ME(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=It(),e.pingedLanes|=e.suspendedLanes&n,et===e&&(at&n)===n&&(Qe===4||Qe===3&&(at&130023424)===at&&500>De()-Op?No(e,0):Ip|=n),zt(e,t)}function C1(e,t){t===0&&((e.mode&1)===0?t=1:(t=pl,pl<<=1,(pl&130023424)===0&&(pl=4194304)));var n=It();e=Er(e,t),e!==null&&(cs(e,t,n),zt(e,n))}function RE(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),C1(e,n)}function NE(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(I(314))}r!==null&&r.delete(t),C1(e,n)}var T1;T1=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ft.current)At=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return At=!1,bE(e,t,n);At=(e.flags&131072)!==0}else At=!1,Oe&&(t.flags&1048576)!==0&&_g(t,Zl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Pl(e,t),e=t.pendingProps;var o=ji(t,yt.current);Pi(t,n),o=Sp(null,t,r,e,o,n);var i=xp();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,jt(r)?(i=!0,Kl(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,vp(t),o.updater=mu,t.stateNode=o,o._reactInternals=t,Nd(t,r,e,n),t=Ad(null,t,r,!0,i,n)):(t.tag=0,Oe&&i&&up(t),Tt(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Pl(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=PE(r),e=Ln(r,e),o){case 0:t=Pd(null,t,r,e,n);break e;case 1:t=bv(null,t,r,e,n);break e;case 11:t=gv(null,t,r,e,n);break e;case 14:t=yv(null,t,r,Ln(r.type,e),n);break e}throw Error(I(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ln(r,o),Pd(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ln(r,o),bv(e,t,r,o,n);case 3:e:{if(u1(t),e===null)throw Error(I(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Lg(e,t),Xl(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Hi(Error(I(423)),t),t=wv(e,t,r,n,o);break e}else if(r!==o){o=Hi(Error(I(424)),t),t=wv(e,t,r,n,o);break e}else for(Zt=Yr(t.stateNode.containerInfo.firstChild),Yt=t,Oe=!0,An=null,n=jg(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zi(),r===o){t=kr(e,t,n);break e}Tt(e,t,r,n)}t=t.child}return t;case 5:return zg(t),e===null&&_d(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,a=o.children,kd(r,o)?a=null:i!==null&&kd(r,i)&&(t.flags|=32),l1(e,t),Tt(e,t,a,n),t.child;case 6:return e===null&&_d(t),null;case 13:return c1(e,t,n);case 4:return gp(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Di(t,null,r,n):Tt(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ln(r,o),gv(e,t,r,o,n);case 7:return Tt(e,t,t.pendingProps,n),t.child;case 8:return Tt(e,t,t.pendingProps.children,n),t.child;case 12:return Tt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value,Ee(Yl,r._currentValue),r._currentValue=a,i!==null)if(zn(i.value,a)){if(i.children===o.children&&!Ft.current){t=kr(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){a=i.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(i.tag===1){l=wr(-1,n&-n),l.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),Md(i.return,n,t),s.lanes|=n;break}l=l.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(I(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Md(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}Tt(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,Pi(t,n),o=vn(o),r=r(o),t.flags|=1,Tt(e,t,r,n),t.child;case 14:return r=t.type,o=Ln(r,t.pendingProps),o=Ln(r.type,o),yv(e,t,r,o,n);case 15:return a1(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Ln(r,o),Pl(e,t),t.tag=1,jt(r)?(e=!0,Kl(t)):e=!1,Pi(t,n),Ag(t,r,o),Nd(t,r,o,n),Ad(null,t,r,!0,e,n);case 19:return f1(e,t,n);case 22:return s1(e,t,n)}throw Error(I(156,t.tag))};function I1(e,t){return Xv(e,t)}function LE(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mn(e,t,n,r){return new LE(e,t,n,r)}function Np(e){return e=e.prototype,!(!e||!e.isReactComponent)}function PE(e){if(typeof e=="function")return Np(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Yd)return 11;if(e===Jd)return 14}return 2}function to(e,t){var n=e.alternate;return n===null?(n=mn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function jl(e,t,n,r,o,i){var a=2;if(r=e,typeof e=="function")Np(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case bi:return Lo(n.children,o,i,t);case Zd:a=8,o|=8;break;case nd:return e=mn(12,n,t,o|2),e.elementType=nd,e.lanes=i,e;case rd:return e=mn(13,n,t,o),e.elementType=rd,e.lanes=i,e;case od:return e=mn(19,n,t,o),e.elementType=od,e.lanes=i,e;case Fv:return yu(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Pv:a=10;break e;case Av:a=9;break e;case Yd:a=11;break e;case Jd:a=14;break e;case Ur:a=16,r=null;break e}throw Error(I(130,e==null?e:typeof e,""))}return t=mn(a,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function Lo(e,t,n,r){return e=mn(7,e,r,t),e.lanes=n,e}function yu(e,t,n,r){return e=mn(22,e,r,t),e.elementType=Fv,e.lanes=n,e.stateNode={isHidden:!1},e}function Xf(e,t,n){return e=mn(6,e,null,t),e.lanes=n,e}function ed(e,t,n){return t=mn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function AE(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=jf(0),this.expirationTimes=jf(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=jf(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Lp(e,t,n,r,o,i,a,s,l){return e=new AE(e,t,n,s,l),t===1?(t=1,i===!0&&(t|=8)):t=0,i=mn(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},vp(i),e}function FE(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yi,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function O1(e){if(!e)return ro;e=e._reactInternals;e:{if(Bo(e)!==e||e.tag!==1)throw Error(I(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(jt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(I(171))}if(e.tag===1){var n=e.type;if(jt(n))return Ig(e,n,t)}return t}function _1(e,t,n,r,o,i,a,s,l){return e=Lp(n,r,!0,e,o,i,a,s,l),e.context=O1(null),n=e.current,r=It(),o=eo(n),i=wr(r,o),i.callback=t??null,Jr(n,i,o),e.current.lanes=o,cs(e,o,r),zt(e,r),e}function bu(e,t,n,r){var o=t.current,i=It(),a=eo(o);return n=O1(n),t.context===null?t.context=n:t.pendingContext=n,t=wr(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Jr(o,t,a),e!==null&&(jn(e,o,a,i),Rl(e,o,a)),a}function su(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Mv(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Pp(e,t){Mv(e,t),(e=e.alternate)&&Mv(e,t)}function jE(){return null}var M1=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ap(e){this._internalRoot=e}wu.prototype.render=Ap.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(I(409));bu(e,t,null,null)};wu.prototype.unmount=Ap.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zo(function(){bu(null,e,null,null)}),t[xr]=null}};function wu(e){this._internalRoot=e}wu.prototype.unstable_scheduleHydration=function(e){if(e){var t=ag();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Wr.length&&t!==0&&t<Wr[n].priority;n++);Wr.splice(n,0,e),n===0&&lg(e)}};function Fp(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Su(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Rv(){}function zE(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var u=su(a);i.call(u)}}var a=_1(t,r,e,0,null,!1,!1,"",Rv);return e._reactRootContainer=a,e[xr]=a.current,ts(e.nodeType===8?e.parentNode:e),zo(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var u=su(l);s.call(u)}}var l=Lp(e,0,!1,null,null,!1,!1,"",Rv);return e._reactRootContainer=l,e[xr]=l.current,ts(e.nodeType===8?e.parentNode:e),zo(function(){bu(t,l,n,r)}),l}function xu(e,t,n,r,o){var i=n._reactRootContainer;if(i){var a=i;if(typeof o=="function"){var s=o;o=function(){var l=su(a);s.call(l)}}bu(t,a,e,o)}else a=zE(n,t,e,o,r);return su(a)}og=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Fa(t.pendingLanes);n!==0&&(tp(t,n|1),zt(t,De()),(le&6)===0&&(Ui=De()+500,ao()))}break;case 13:zo(function(){var r=Er(e,1);if(r!==null){var o=It();jn(r,e,1,o)}}),Pp(e,1)}};np=function(e){if(e.tag===13){var t=Er(e,134217728);if(t!==null){var n=It();jn(t,e,134217728,n)}Pp(e,134217728)}};ig=function(e){if(e.tag===13){var t=eo(e),n=Er(e,t);if(n!==null){var r=It();jn(n,e,t,r)}Pp(e,t)}};ag=function(){return ve};sg=function(e,t){var n=ve;try{return ve=e,t()}finally{ve=n}};md=function(e,t,n){switch(t){case"input":if(sd(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+\'][type="radio"]\'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=du(r);if(!o)throw Error(I(90));zv(r),sd(r,o)}}}break;case"textarea":Bv(e,n);break;case"select":t=n.value,t!=null&&Mi(e,!!n.multiple,t,!1)}};qv=_p;Kv=zo;var DE={usingClientEntryPoint:!1,Events:[ds,Ei,du,$v,Gv,_p]},Na={findFiberByHostInstance:_o,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},BE={bundleType:Na.bundleType,version:Na.version,rendererPackageName:Na.rendererPackageName,rendererConfig:Na.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Cr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Yv(e),e===null?null:e.stateNode},findFiberByHostInstance:Na.findFiberByHostInstance||jE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(La=__REACT_DEVTOOLS_GLOBAL_HOOK__,!La.isDisabled&&La.supportsFiber))try{lu=La.inject(BE),tr=La}catch{}var La;en.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=DE;en.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Fp(t))throw Error(I(200));return FE(e,t,null,n)};en.createRoot=function(e,t){if(!Fp(e))throw Error(I(299));var n=!1,r="",o=M1;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Lp(e,1,!1,null,null,n,!1,r,o),e[xr]=t.current,ts(e.nodeType===8?e.parentNode:e),new Ap(t)};en.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(I(188)):(e=Object.keys(e).join(","),Error(I(268,e)));return e=Yv(t),e=e===null?null:e.stateNode,e};en.flushSync=function(e){return zo(e)};en.hydrate=function(e,t,n){if(!Su(t))throw Error(I(200));return xu(null,e,t,!0,n)};en.hydrateRoot=function(e,t,n){if(!Fp(e))throw Error(I(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",a=M1;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=_1(t,null,e,1,n??null,o,!1,i,a),e[xr]=t.current,ts(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new wu(t)};en.render=function(e,t,n){if(!Su(t))throw Error(I(200));return xu(null,e,t,!1,n)};en.unmountComponentAtNode=function(e){if(!Su(e))throw Error(I(40));return e._reactRootContainer?(zo(function(){xu(null,null,e,!1,function(){e._reactRootContainer=null,e[xr]=null})}),!0):!1};en.unstable_batchedUpdates=_p;en.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Su(n))throw Error(I(200));if(e==null||e._reactInternals===void 0)throw Error(I(38));return xu(e,t,n,!1,r)};en.version="18.2.0-next-9e3b772b8-20220608"});var jp=A((BI,L1)=>{"use strict";function N1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(N1)}catch(e){console.error(e)}}N1(),L1.exports=R1()});var A1=A(Eu=>{"use strict";var HE=Y(),UE=Symbol.for("react.element"),VE=Symbol.for("react.fragment"),WE=Object.prototype.hasOwnProperty,$E=HE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,GE={key:!0,ref:!0,__self:!0,__source:!0};function P1(e,t,n){var r,o={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)WE.call(t,r)&&!GE.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:UE,type:e,key:i,ref:a,props:o,_owner:$E.current}}Eu.Fragment=VE;Eu.jsx=P1;Eu.jsxs=P1});var j1=A((UI,F1)=>{"use strict";F1.exports=A1()});var Oy=A((NO,Iy)=>{var am={exports:{}};function sm(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];typeof n=="object"&&!Object.isFrozen(n)&&sm(n)}),e}am.exports=sm;am.exports.default=sm;var Fu=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function gy(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\'/g,"&#x27;")}function co(e,...t){let n=Object.create(null);for(let r in e)n[r]=e[r];return t.forEach(function(r){for(let o in r)n[o]=r[o]}),n}var yk="</span>",fy=e=>!!e.scope||e.sublanguage&&e.language,bk=(e,{prefix:t})=>{if(e.includes(".")){let n=e.split(".");return[`${t}${n.shift()}`,...n.map((r,o)=>`${r}${"_".repeat(o+1)}`)].join(" ")}return`${t}${e}`},rm=class{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=gy(t)}openNode(t){if(!fy(t))return;let n="";t.sublanguage?n=`language-${t.language}`:n=bk(t.scope,{prefix:this.classPrefix}),this.span(n)}closeNode(t){!fy(t)||(this.buffer+=yk)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},dy=(e={})=>{let t={children:[]};return Object.assign(t,e),t},ys=class{constructor(){this.rootNode=dy(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let n=dy({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&(!t.children||(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{ys._collapse(n)})))}},om=class extends ys{constructor(t){super(),this.options=t}addKeyword(t,n){t!==""&&(this.openNode(n),this.addText(t),this.closeNode())}addText(t){t!==""&&this.add(t)}addSublanguage(t,n){let r=t.root;r.sublanguage=!0,r.language=n,this.add(r)}toHTML(){return new rm(this,this.options).value()}finalize(){return!0}};function bs(e){return e?typeof e=="string"?e:e.source:null}function yy(e){return Go("(?=",e,")")}function wk(e){return Go("(?:",e,")*")}function Sk(e){return Go("(?:",e,")?")}function Go(...e){return e.map(n=>bs(n)).join("")}function xk(e){let t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function lm(...e){let t=xk(e);return"("+(t.capture?"":"?:")+e.map(r=>bs(r)).join("|")+")"}function by(e){return new RegExp(e.toString()+"|").exec("").length-1}function Ek(e,t){let n=e&&e.exec(t);return n&&n.index===0}var kk=/\\[(?:[^\\\\\\]]|\\\\.)*\\]|\\(\\??|\\\\([1-9][0-9]*)|\\\\./;function um(e,{joinWith:t}){let n=0;return e.map(r=>{n+=1;let o=n,i=bs(r),a="";for(;i.length>0;){let s=kk.exec(i);if(!s){a+=i;break}a+=i.substring(0,s.index),i=i.substring(s.index+s[0].length),s[0][0]==="\\\\"&&s[1]?a+="\\\\"+String(Number(s[1])+o):(a+=s[0],s[0]==="("&&n++)}return a}).map(r=>`(${r})`).join(t)}var Ck=/\\b\\B/,wy="[a-zA-Z]\\\\w*",cm="[a-zA-Z_]\\\\w*",Sy="\\\\b\\\\d+(\\\\.\\\\d+)?",xy="(-?)(\\\\b0[xX][a-fA-F0-9]+|(\\\\b\\\\d+(\\\\.\\\\d*)?|\\\\.\\\\d+)([eE][-+]?\\\\d+)?)",Ey="\\\\b(0b[01]+)",Tk="!|!=|!==|%|%=|&|&&|&=|\\\\*|\\\\*=|\\\\+|\\\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\\\?|\\\\[|\\\\{|\\\\(|\\\\^|\\\\^=|\\\\||\\\\|=|\\\\|\\\\||~",Ik=(e={})=>{let t=/^#![ ]*\\//;return e.binary&&(e.begin=Go(t,/.*\\b/,e.binary,/\\b.*/)),co({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},ws={begin:"\\\\\\\\[\\\\s\\\\S]",relevance:0},Ok={scope:"string",begin:"\'",end:"\'",illegal:"\\\\n",contains:[ws]},_k={scope:"string",begin:\'"\',end:\'"\',illegal:"\\\\n",contains:[ws]},Mk={begin:/\\b(a|an|the|are|I\'m|isn\'t|don\'t|doesn\'t|won\'t|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\\b/},zu=function(e,t,n={}){let r=co({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let o=lm("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+[\'](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:Go(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},Rk=zu("//","$"),Nk=zu("/\\\\*","\\\\*/"),Lk=zu("#","$"),Pk={scope:"number",begin:Sy,relevance:0},Ak={scope:"number",begin:xy,relevance:0},Fk={scope:"number",begin:Ey,relevance:0},jk={begin:/(?=\\/[^/\\n]*\\/)/,contains:[{scope:"regexp",begin:/\\//,end:/\\/[gimuy]*/,illegal:/\\n/,contains:[ws,{begin:/\\[/,end:/\\]/,relevance:0,contains:[ws]}]}]},zk={scope:"title",begin:wy,relevance:0},Dk={scope:"title",begin:cm,relevance:0},Bk={begin:"\\\\.\\\\s*"+cm,relevance:0},Hk=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})},Au=Object.freeze({__proto__:null,MATCH_NOTHING_RE:Ck,IDENT_RE:wy,UNDERSCORE_IDENT_RE:cm,NUMBER_RE:Sy,C_NUMBER_RE:xy,BINARY_NUMBER_RE:Ey,RE_STARTERS_RE:Tk,SHEBANG:Ik,BACKSLASH_ESCAPE:ws,APOS_STRING_MODE:Ok,QUOTE_STRING_MODE:_k,PHRASAL_WORDS_MODE:Mk,COMMENT:zu,C_LINE_COMMENT_MODE:Rk,C_BLOCK_COMMENT_MODE:Nk,HASH_COMMENT_MODE:Lk,NUMBER_MODE:Pk,C_NUMBER_MODE:Ak,BINARY_NUMBER_MODE:Fk,REGEXP_MODE:jk,TITLE_MODE:zk,UNDERSCORE_TITLE_MODE:Dk,METHOD_GUARD:Bk,END_SAME_AS_BEGIN:Hk});function Uk(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function Vk(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function Wk(e,t){!t||!e.beginKeywords||(e.begin="\\\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\\\.)(?=\\\\b|\\\\s)",e.__beforeBegin=Uk,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function $k(e,t){!Array.isArray(e.illegal)||(e.illegal=lm(...e.illegal))}function Gk(e,t){if(!!e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function qk(e,t){e.relevance===void 0&&(e.relevance=1)}var Kk=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");let n=Object.assign({},e);Object.keys(e).forEach(r=>{delete e[r]}),e.keywords=n.keywords,e.begin=Go(n.beforeMatch,yy(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},Qk=["of","and","for","in","not","or","if","then","parent","list","value"],Zk="keyword";function ky(e,t,n=Zk){let r=Object.create(null);return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(i){Object.assign(r,ky(e[i],t,i))}),r;function o(i,a){t&&(a=a.map(s=>s.toLowerCase())),a.forEach(function(s){let l=s.split("|");r[l[0]]=[i,Yk(l[0],l[1])]})}}function Yk(e,t){return t?Number(t):Jk(e)?0:1}function Jk(e){return Qk.includes(e.toLowerCase())}var py={},$o=e=>{console.error(e)},my=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Zi=(e,t)=>{py[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),py[`${e}/${t}`]=!0)},ju=new Error;function Cy(e,t,{key:n}){let r=0,o=e[n],i={},a={};for(let s=1;s<=t.length;s++)a[s+r]=o[s],i[s+r]=!0,r+=by(t[s-1]);e[n]=a,e[n]._emit=i,e[n]._multi=!0}function Xk(e){if(!!Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw $o("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ju;if(typeof e.beginScope!="object"||e.beginScope===null)throw $o("beginScope must be object"),ju;Cy(e,e.begin,{key:"beginScope"}),e.begin=um(e.begin,{joinWith:""})}}function eC(e){if(!!Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw $o("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ju;if(typeof e.endScope!="object"||e.endScope===null)throw $o("endScope must be object"),ju;Cy(e,e.end,{key:"endScope"}),e.end=um(e.end,{joinWith:""})}}function tC(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function nC(e){tC(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),Xk(e),eC(e)}function rC(e){function t(a,s){return new RegExp(bs(a),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(s?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(s,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,s]),this.matchAt+=by(s)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let s=this.regexes.map(l=>l[1]);this.matcherRe=t(um(s,{joinWith:"|"}),!0),this.lastIndex=0}exec(s){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(s);if(!l)return null;let u=l.findIndex((f,v)=>v>0&&f!==void 0),c=this.matchIndexes[u];return l.splice(0,u),Object.assign(l,c)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(s){if(this.multiRegexes[s])return this.multiRegexes[s];let l=new n;return this.rules.slice(s).forEach(([u,c])=>l.addRule(u,c)),l.compile(),this.multiRegexes[s]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(s,l){this.rules.push([s,l]),l.type==="begin"&&this.count++}exec(s){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let u=l.exec(s);if(this.resumingScanAtSamePosition()&&!(u&&u.index===this.lastIndex)){let c=this.getMatcher(0);c.lastIndex=this.lastIndex+1,u=c.exec(s)}return u&&(this.regexIndex+=u.position+1,this.regexIndex===this.count&&this.considerAll()),u}}function o(a){let s=new r;return a.contains.forEach(l=>s.addRule(l.begin,{rule:l,type:"begin"})),a.terminatorEnd&&s.addRule(a.terminatorEnd,{type:"end"}),a.illegal&&s.addRule(a.illegal,{type:"illegal"}),s}function i(a,s){let l=a;if(a.isCompiled)return l;[Vk,Gk,nC,Kk].forEach(c=>c(a,s)),e.compilerExtensions.forEach(c=>c(a,s)),a.__beforeBegin=null,[Wk,$k,qk].forEach(c=>c(a,s)),a.isCompiled=!0;let u=null;return typeof a.keywords=="object"&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),u=a.keywords.$pattern,delete a.keywords.$pattern),u=u||/\\w+/,a.keywords&&(a.keywords=ky(a.keywords,e.case_insensitive)),l.keywordPatternRe=t(u,!0),s&&(a.begin||(a.begin=/\\B|\\b/),l.beginRe=t(l.begin),!a.end&&!a.endsWithParent&&(a.end=/\\B|\\b/),a.end&&(l.endRe=t(l.end)),l.terminatorEnd=bs(l.end)||"",a.endsWithParent&&s.terminatorEnd&&(l.terminatorEnd+=(a.end?"|":"")+s.terminatorEnd)),a.illegal&&(l.illegalRe=t(a.illegal)),a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map(function(c){return oC(c==="self"?a:c)})),a.contains.forEach(function(c){i(c,l)}),a.starts&&i(a.starts,s),l.matcher=o(l),l}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=co(e.classNameAliases||{}),i(e)}function Ty(e){return e?e.endsWithParent||Ty(e.starts):!1}function oC(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return co(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:Ty(e)?co(e,{starts:e.starts?co(e.starts):null}):Object.isFrozen(e)?co(e):e}var iC="11.7.0",im=class extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}},nm=gy,hy=co,vy=Symbol("nomatch"),aC=7,sC=function(e){let t=Object.create(null),n=Object.create(null),r=[],o=!0,i="Could not find the language \'{}\', did you forget to load/include a language module?",a={disableAutodetect:!0,name:"Plain text",contains:[]},s={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\\blang(?:uage)?-([\\w-]+)\\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:om};function l(C){return s.noHighlightRe.test(C)}function u(C){let L=C.className+" ";L+=C.parentNode?C.parentNode.className:"";let q=s.languageDetectRe.exec(L);if(q){let te=T(q[1]);return te||(my(i.replace("{}",q[1])),my("Falling back to no-highlight mode for this block.",C)),te?q[1]:"no-highlight"}return L.split(/\\s+/).find(te=>l(te)||T(te))}function c(C,L,q){let te="",be="";typeof L=="object"?(te=C,q=L.ignoreIllegals,be=L.language):(Zi("10.7.0","highlight(lang, code, ...args) has been deprecated."),Zi("10.7.0",`Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277`),be=C,te=L),q===void 0&&(q=!0);let Ue={code:te,language:be};we("before:highlight",Ue);let nt=Ue.result?Ue.result:f(Ue.language,Ue.code,q);return nt.code=Ue.code,we("after:highlight",nt),nt}function f(C,L,q,te){let be=Object.create(null);function Ue(M,B){return M.keywords[B]}function nt(){if(!z.keywords){fe.addText(ne);return}let M=0;z.keywordPatternRe.lastIndex=0;let B=z.keywordPatternRe.exec(ne),Z="";for(;B;){Z+=ne.substring(M,B.index);let he=se.case_insensitive?B[0].toLowerCase():B[0],pt=Ue(z,he);if(pt){let[pr,MS]=pt;if(fe.addText(Z),Z="",be[he]=(be[he]||0)+1,be[he]<=aC&&(qe+=MS),pr.startsWith("_"))Z+=B[0];else{let RS=se.classNameAliases[pr]||pr;fe.addKeyword(B[0],RS)}}else Z+=B[0];M=z.keywordPatternRe.lastIndex,B=z.keywordPatternRe.exec(ne)}Z+=ne.substring(M),fe.addText(Z)}function on(){if(ne==="")return;let M=null;if(typeof z.subLanguage=="string"){if(!t[z.subLanguage]){fe.addText(ne);return}M=f(z.subLanguage,ne,!0,Lt[z.subLanguage]),Lt[z.subLanguage]=M._top}else M=m(ne,z.subLanguage.length?z.subLanguage:null);z.relevance>0&&(qe+=M.relevance),fe.addSublanguage(M._emitter,M.language)}function N(){z.subLanguage!=null?on():nt(),ne=""}function K(M,B){let Z=1,he=B.length-1;for(;Z<=he;){if(!M._emit[Z]){Z++;continue}let pt=se.classNameAliases[M[Z]]||M[Z],pr=B[Z];pt?fe.addKeyword(pr,pt):(ne=pr,nt(),ne=""),Z++}}function rt(M,B){return M.scope&&typeof M.scope=="string"&&fe.openNode(se.classNameAliases[M.scope]||M.scope),M.beginScope&&(M.beginScope._wrap?(fe.addKeyword(ne,se.classNameAliases[M.beginScope._wrap]||M.beginScope._wrap),ne=""):M.beginScope._multi&&(K(M.beginScope,B),ne="")),z=Object.create(M,{parent:{value:z}}),z}function xt(M,B,Z){let he=Ek(M.endRe,Z);if(he){if(M["on:end"]){let pt=new Fu(M);M["on:end"](B,pt),pt.isMatchIgnored&&(he=!1)}if(he){for(;M.endsParent&&M.parent;)M=M.parent;return M}}if(M.endsWithParent)return xt(M.parent,B,Z)}function Nt(M){return z.matcher.regexIndex===0?(ne+=M[0],1):(Tn=!0,0)}function an(M){let B=M[0],Z=M.rule,he=new Fu(Z),pt=[Z.__beforeBegin,Z["on:begin"]];for(let pr of pt)if(!!pr&&(pr(M,he),he.isMatchIgnored))return Nt(B);return Z.skip?ne+=B:(Z.excludeBegin&&(ne+=B),N(),!Z.returnBegin&&!Z.excludeBegin&&(ne=B)),rt(Z,M),Z.returnBegin?0:B.length}function Et(M){let B=M[0],Z=L.substring(M.index),he=xt(z,M,Z);if(!he)return vy;let pt=z;z.endScope&&z.endScope._wrap?(N(),fe.addKeyword(B,z.endScope._wrap)):z.endScope&&z.endScope._multi?(N(),K(z.endScope,M)):pt.skip?ne+=B:(pt.returnEnd||pt.excludeEnd||(ne+=B),N(),pt.excludeEnd&&(ne=B));do z.scope&&fe.closeNode(),!z.skip&&!z.subLanguage&&(qe+=z.relevance),z=z.parent;while(z!==he.parent);return he.starts&&rt(he.starts,M),pt.returnEnd?0:B.length}function sn(){let M=[];for(let B=z;B!==se;B=B.parent)B.scope&&M.unshift(B.scope);M.forEach(B=>fe.openNode(B))}let Vt={};function Wt(M,B){let Z=B&&B[0];if(ne+=M,Z==null)return N(),0;if(Vt.type==="begin"&&B.type==="end"&&Vt.index===B.index&&Z===""){if(ne+=L.slice(B.index,B.index+1),!o){let he=new Error(`0 width match regex (${C})`);throw he.languageName=C,he.badRule=Vt.rule,he}return 1}if(Vt=B,B.type==="begin")return an(B);if(B.type==="illegal"&&!q){let he=new Error(\'Illegal lexeme "\'+Z+\'" for mode "\'+(z.scope||"<unnamed>")+\'"\');throw he.mode=z,he}else if(B.type==="end"){let he=Et(B);if(he!==vy)return he}if(B.type==="illegal"&&Z==="")return 1;if(Pr>1e5&&Pr>B.index*3)throw new Error("potential infinite loop, way more iterations than matches");return ne+=Z,Z.length}let se=T(C);if(!se)throw $o(i.replace("{}",C)),new Error(\'Unknown language: "\'+C+\'"\');let ft=rC(se),ot="",z=te||ft,Lt={},fe=new s.__emitter(s);sn();let ne="",qe=0,dt=0,Pr=0,Tn=!1;try{for(z.matcher.considerAll();;){Pr++,Tn?Tn=!1:z.matcher.considerAll(),z.matcher.lastIndex=dt;let M=z.matcher.exec(L);if(!M)break;let B=L.substring(dt,M.index),Z=Wt(B,M);dt=M.index+Z}return Wt(L.substring(dt)),fe.closeAllNodes(),fe.finalize(),ot=fe.toHTML(),{language:C,value:ot,relevance:qe,illegal:!1,_emitter:fe,_top:z}}catch(M){if(M.message&&M.message.includes("Illegal"))return{language:C,value:nm(L),illegal:!0,relevance:0,_illegalBy:{message:M.message,index:dt,context:L.slice(dt-100,dt+100),mode:M.mode,resultSoFar:ot},_emitter:fe};if(o)return{language:C,value:nm(L),illegal:!1,relevance:0,errorRaised:M,_emitter:fe,_top:z};throw M}}function v(C){let L={value:nm(C),illegal:!1,relevance:0,_top:a,_emitter:new s.__emitter(s)};return L._emitter.addText(C),L}function m(C,L){L=L||s.languages||Object.keys(t);let q=v(C),te=L.filter(T).filter(W).map(N=>f(N,C,!1));te.unshift(q);let be=te.sort((N,K)=>{if(N.relevance!==K.relevance)return K.relevance-N.relevance;if(N.language&&K.language){if(T(N.language).supersetOf===K.language)return 1;if(T(K.language).supersetOf===N.language)return-1}return 0}),[Ue,nt]=be,on=Ue;return on.secondBest=nt,on}function d(C,L,q){let te=L&&n[L]||q;C.classList.add("hljs"),C.classList.add(`language-${te}`)}function y(C){let L=null,q=u(C);if(l(q))return;if(we("before:highlightElement",{el:C,language:q}),C.children.length>0&&(s.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(C)),s.throwUnescapedHTML))throw new im("One of your code blocks includes unescaped HTML.",C.innerHTML);L=C;let te=L.textContent,be=q?c(te,{language:q,ignoreIllegals:!0}):m(te);C.innerHTML=be.value,d(C,q,be.language),C.result={language:be.language,re:be.relevance,relevance:be.relevance},be.secondBest&&(C.secondBest={language:be.secondBest.language,relevance:be.secondBest.relevance}),we("after:highlightElement",{el:C,result:be,text:te})}function w(C){s=hy(s,C)}let g=()=>{b(),Zi("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function h(){b(),Zi("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let p=!1;function b(){if(document.readyState==="loading"){p=!0;return}document.querySelectorAll(s.cssSelector).forEach(y)}function S(){p&&b()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",S,!1);function x(C,L){let q=null;try{q=L(e)}catch(te){if($o("Language definition for \'{}\' could not be registered.".replace("{}",C)),o)$o(te);else throw te;q=a}q.name||(q.name=C),t[C]=q,q.rawDefinition=L.bind(null,e),q.aliases&&_(q.aliases,{languageName:C})}function E(C){delete t[C];for(let L of Object.keys(n))n[L]===C&&delete n[L]}function k(){return Object.keys(t)}function T(C){return C=(C||"").toLowerCase(),t[C]||t[n[C]]}function _(C,{languageName:L}){typeof C=="string"&&(C=[C]),C.forEach(q=>{n[q.toLowerCase()]=L})}function W(C){let L=T(C);return L&&!L.disableAutodetect}function ee(C){C["before:highlightBlock"]&&!C["before:highlightElement"]&&(C["before:highlightElement"]=L=>{C["before:highlightBlock"](Object.assign({block:L.el},L))}),C["after:highlightBlock"]&&!C["after:highlightElement"]&&(C["after:highlightElement"]=L=>{C["after:highlightBlock"](Object.assign({block:L.el},L))})}function me(C){ee(C),r.push(C)}function we(C,L){let q=C;r.forEach(function(te){te[q]&&te[q](L)})}function H(C){return Zi("10.7.0","highlightBlock will be removed entirely in v12.0"),Zi("10.7.0","Please use highlightElement now."),y(C)}Object.assign(e,{highlight:c,highlightAuto:m,highlightAll:b,highlightElement:y,highlightBlock:H,configure:w,initHighlighting:g,initHighlightingOnLoad:h,registerLanguage:x,unregisterLanguage:E,listLanguages:k,getLanguage:T,registerAliases:_,autoDetection:W,inherit:hy,addPlugin:me}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=iC,e.regex={concat:Go,lookahead:yy,either:lm,optional:Sk,anyNumberOfTimes:wk};for(let C in Au)typeof Au[C]=="object"&&am.exports(Au[C]);return Object.assign(e,Au),e},Ss=sC({});Iy.exports=Ss;Ss.HighlightJS=Ss;Ss.default=Ss});var jy=A((T_,Fy)=>{"use strict";var fC="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";Fy.exports=fC});var Hy=A((I_,By)=>{"use strict";var dC=jy();function zy(){}function Dy(){}Dy.resetWarningCache=zy;By.exports=function(){function e(r,o,i,a,s,l){if(l!==dC){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:Dy,resetWarningCache:zy};return n.PropTypes=n,n}});var _r=A((M_,Uy)=>{Uy.exports=Hy()();var O_,__});var sb=A((Wu,ab)=>{"use strict";Wu.__esModule=!0;Wu.default={scheme:"threezerotwofour",author:"jan t. sott (http://github.com/idleberg)",base00:"#090300",base01:"#3a3432",base02:"#4a4543",base03:"#5c5855",base04:"#807d7c",base05:"#a5a2a2",base06:"#d6d5d4",base07:"#f7f7f7",base08:"#db2d20",base09:"#e8bbd0",base0A:"#fded02",base0B:"#01a252",base0C:"#b5e4f4",base0D:"#01a0e4",base0E:"#a16a94",base0F:"#cdab53"};ab.exports=Wu.default});var ub=A(($u,lb)=>{"use strict";$u.__esModule=!0;$u.default={scheme:"apathy",author:"jannik siebert (https://github.com/janniks)",base00:"#031A16",base01:"#0B342D",base02:"#184E45",base03:"#2B685E",base04:"#5F9C92",base05:"#81B5AC",base06:"#A7CEC8",base07:"#D2E7E4",base08:"#3E9688",base09:"#3E7996",base0A:"#3E4C96",base0B:"#883E96",base0C:"#963E4C",base0D:"#96883E",base0E:"#4C963E",base0F:"#3E965B"};lb.exports=$u.default});var fb=A((Gu,cb)=>{"use strict";Gu.__esModule=!0;Gu.default={scheme:"ashes",author:"jannik siebert (https://github.com/janniks)",base00:"#1C2023",base01:"#393F45",base02:"#565E65",base03:"#747C84",base04:"#ADB3BA",base05:"#C7CCD1",base06:"#DFE2E5",base07:"#F3F4F5",base08:"#C7AE95",base09:"#C7C795",base0A:"#AEC795",base0B:"#95C7AE",base0C:"#95AEC7",base0D:"#AE95C7",base0E:"#C795AE",base0F:"#C79595"};cb.exports=Gu.default});var pb=A((qu,db)=>{"use strict";qu.__esModule=!0;qu.default={scheme:"atelier dune",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune)",base00:"#20201d",base01:"#292824",base02:"#6e6b5e",base03:"#7d7a68",base04:"#999580",base05:"#a6a28c",base06:"#e8e4cf",base07:"#fefbec",base08:"#d73737",base09:"#b65611",base0A:"#cfb017",base0B:"#60ac39",base0C:"#1fad83",base0D:"#6684e1",base0E:"#b854d4",base0F:"#d43552"};db.exports=qu.default});var hb=A((Ku,mb)=>{"use strict";Ku.__esModule=!0;Ku.default={scheme:"atelier forest",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest)",base00:"#1b1918",base01:"#2c2421",base02:"#68615e",base03:"#766e6b",base04:"#9c9491",base05:"#a8a19f",base06:"#e6e2e0",base07:"#f1efee",base08:"#f22c40",base09:"#df5320",base0A:"#d5911a",base0B:"#5ab738",base0C:"#00ad9c",base0D:"#407ee7",base0E:"#6666ea",base0F:"#c33ff3"};mb.exports=Ku.default});var gb=A((Qu,vb)=>{"use strict";Qu.__esModule=!0;Qu.default={scheme:"atelier heath",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath)",base00:"#1b181b",base01:"#292329",base02:"#695d69",base03:"#776977",base04:"#9e8f9e",base05:"#ab9bab",base06:"#d8cad8",base07:"#f7f3f7",base08:"#ca402b",base09:"#a65926",base0A:"#bb8a35",base0B:"#379a37",base0C:"#159393",base0D:"#516aec",base0E:"#7b59c0",base0F:"#cc33cc"};vb.exports=Qu.default});var bb=A((Zu,yb)=>{"use strict";Zu.__esModule=!0;Zu.default={scheme:"atelier lakeside",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside/)",base00:"#161b1d",base01:"#1f292e",base02:"#516d7b",base03:"#5a7b8c",base04:"#7195a8",base05:"#7ea2b4",base06:"#c1e4f6",base07:"#ebf8ff",base08:"#d22d72",base09:"#935c25",base0A:"#8a8a0f",base0B:"#568c3b",base0C:"#2d8f6f",base0D:"#257fad",base0E:"#5d5db1",base0F:"#b72dd2"};yb.exports=Zu.default});var Sb=A((Yu,wb)=>{"use strict";Yu.__esModule=!0;Yu.default={scheme:"atelier seaside",author:"bram de haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside/)",base00:"#131513",base01:"#242924",base02:"#5e6e5e",base03:"#687d68",base04:"#809980",base05:"#8ca68c",base06:"#cfe8cf",base07:"#f0fff0",base08:"#e6193c",base09:"#87711d",base0A:"#c3c322",base0B:"#29a329",base0C:"#1999b3",base0D:"#3d62f5",base0E:"#ad2bee",base0F:"#e619c3"};wb.exports=Yu.default});var Eb=A((Ju,xb)=>{"use strict";Ju.__esModule=!0;Ju.default={scheme:"bespin",author:"jan t. sott",base00:"#28211c",base01:"#36312e",base02:"#5e5d5c",base03:"#666666",base04:"#797977",base05:"#8a8986",base06:"#9d9b97",base07:"#baae9e",base08:"#cf6a4c",base09:"#cf7d34",base0A:"#f9ee98",base0B:"#54be0d",base0C:"#afc4db",base0D:"#5ea6ea",base0E:"#9b859d",base0F:"#937121"};xb.exports=Ju.default});var Cb=A((Xu,kb)=>{"use strict";Xu.__esModule=!0;Xu.default={scheme:"brewer",author:"timoth\\xE9e poisot (http://github.com/tpoisot)",base00:"#0c0d0e",base01:"#2e2f30",base02:"#515253",base03:"#737475",base04:"#959697",base05:"#b7b8b9",base06:"#dadbdc",base07:"#fcfdfe",base08:"#e31a1c",base09:"#e6550d",base0A:"#dca060",base0B:"#31a354",base0C:"#80b1d3",base0D:"#3182bd",base0E:"#756bb1",base0F:"#b15928"};kb.exports=Xu.default});var Ib=A((ec,Tb)=>{"use strict";ec.__esModule=!0;ec.default={scheme:"bright",author:"chris kempson (http://chriskempson.com)",base00:"#000000",base01:"#303030",base02:"#505050",base03:"#b0b0b0",base04:"#d0d0d0",base05:"#e0e0e0",base06:"#f5f5f5",base07:"#ffffff",base08:"#fb0120",base09:"#fc6d24",base0A:"#fda331",base0B:"#a1c659",base0C:"#76c7b7",base0D:"#6fb3d2",base0E:"#d381c3",base0F:"#be643c"};Tb.exports=ec.default});var _b=A((tc,Ob)=>{"use strict";tc.__esModule=!0;tc.default={scheme:"chalk",author:"chris kempson (http://chriskempson.com)",base00:"#151515",base01:"#202020",base02:"#303030",base03:"#505050",base04:"#b0b0b0",base05:"#d0d0d0",base06:"#e0e0e0",base07:"#f5f5f5",base08:"#fb9fb1",base09:"#eda987",base0A:"#ddb26f",base0B:"#acc267",base0C:"#12cfc0",base0D:"#6fc2ef",base0E:"#e1a3ee",base0F:"#deaf8f"};Ob.exports=tc.default});var Rb=A((nc,Mb)=>{"use strict";nc.__esModule=!0;nc.default={scheme:"codeschool",author:"brettof86",base00:"#232c31",base01:"#1c3657",base02:"#2a343a",base03:"#3f4944",base04:"#84898c",base05:"#9ea7a6",base06:"#a7cfa3",base07:"#b5d8f6",base08:"#2a5491",base09:"#43820d",base0A:"#a03b1e",base0B:"#237986",base0C:"#b02f30",base0D:"#484d79",base0E:"#c59820",base0F:"#c98344"};Mb.exports=nc.default});var Lb=A((rc,Nb)=>{"use strict";rc.__esModule=!0;rc.default={scheme:"colors",author:"mrmrs (http://clrs.cc)",base00:"#111111",base01:"#333333",base02:"#555555",base03:"#777777",base04:"#999999",base05:"#bbbbbb",base06:"#dddddd",base07:"#ffffff",base08:"#ff4136",base09:"#ff851b",base0A:"#ffdc00",base0B:"#2ecc40",base0C:"#7fdbff",base0D:"#0074d9",base0E:"#b10dc9",base0F:"#85144b"};Nb.exports=rc.default});var Ab=A((oc,Pb)=>{"use strict";oc.__esModule=!0;oc.default={scheme:"default",author:"chris kempson (http://chriskempson.com)",base00:"#181818",base01:"#282828",base02:"#383838",base03:"#585858",base04:"#b8b8b8",base05:"#d8d8d8",base06:"#e8e8e8",base07:"#f8f8f8",base08:"#ab4642",base09:"#dc9656",base0A:"#f7ca88",base0B:"#a1b56c",base0C:"#86c1b9",base0D:"#7cafc2",base0E:"#ba8baf",base0F:"#a16946"};Pb.exports=oc.default});var jb=A((ic,Fb)=>{"use strict";ic.__esModule=!0;ic.default={scheme:"eighties",author:"chris kempson (http://chriskempson.com)",base00:"#2d2d2d",base01:"#393939",base02:"#515151",base03:"#747369",base04:"#a09f93",base05:"#d3d0c8",base06:"#e8e6df",base07:"#f2f0ec",base08:"#f2777a",base09:"#f99157",base0A:"#ffcc66",base0B:"#99cc99",base0C:"#66cccc",base0D:"#6699cc",base0E:"#cc99cc",base0F:"#d27b53"};Fb.exports=ic.default});var Db=A((ac,zb)=>{"use strict";ac.__esModule=!0;ac.default={scheme:"embers",author:"jannik siebert (https://github.com/janniks)",base00:"#16130F",base01:"#2C2620",base02:"#433B32",base03:"#5A5047",base04:"#8A8075",base05:"#A39A90",base06:"#BEB6AE",base07:"#DBD6D1",base08:"#826D57",base09:"#828257",base0A:"#6D8257",base0B:"#57826D",base0C:"#576D82",base0D:"#6D5782",base0E:"#82576D",base0F:"#825757"};zb.exports=ac.default});var Hb=A((sc,Bb)=>{"use strict";sc.__esModule=!0;sc.default={scheme:"flat",author:"chris kempson (http://chriskempson.com)",base00:"#2C3E50",base01:"#34495E",base02:"#7F8C8D",base03:"#95A5A6",base04:"#BDC3C7",base05:"#e0e0e0",base06:"#f5f5f5",base07:"#ECF0F1",base08:"#E74C3C",base09:"#E67E22",base0A:"#F1C40F",base0B:"#2ECC71",base0C:"#1ABC9C",base0D:"#3498DB",base0E:"#9B59B6",base0F:"#be643c"};Bb.exports=sc.default});var Vb=A((lc,Ub)=>{"use strict";lc.__esModule=!0;lc.default={scheme:"google",author:"seth wright (http://sethawright.com)",base00:"#1d1f21",base01:"#282a2e",base02:"#373b41",base03:"#969896",base04:"#b4b7b4",base05:"#c5c8c6",base06:"#e0e0e0",base07:"#ffffff",base08:"#CC342B",base09:"#F96A38",base0A:"#FBA922",base0B:"#198844",base0C:"#3971ED",base0D:"#3971ED",base0E:"#A36AC7",base0F:"#3971ED"};Ub.exports=lc.default});var $b=A((uc,Wb)=>{"use strict";uc.__esModule=!0;uc.default={scheme:"grayscale",author:"alexandre gavioli (https://github.com/alexx2/)",base00:"#101010",base01:"#252525",base02:"#464646",base03:"#525252",base04:"#ababab",base05:"#b9b9b9",base06:"#e3e3e3",base07:"#f7f7f7",base08:"#7c7c7c",base09:"#999999",base0A:"#a0a0a0",base0B:"#8e8e8e",base0C:"#868686",base0D:"#686868",base0E:"#747474",base0F:"#5e5e5e"};Wb.exports=uc.default});var qb=A((cc,Gb)=>{"use strict";cc.__esModule=!0;cc.default={scheme:"green screen",author:"chris kempson (http://chriskempson.com)",base00:"#001100",base01:"#003300",base02:"#005500",base03:"#007700",base04:"#009900",base05:"#00bb00",base06:"#00dd00",base07:"#00ff00",base08:"#007700",base09:"#009900",base0A:"#007700",base0B:"#00bb00",base0C:"#005500",base0D:"#009900",base0E:"#00bb00",base0F:"#005500"};Gb.exports=cc.default});var Qb=A((fc,Kb)=>{"use strict";fc.__esModule=!0;fc.default={scheme:"harmonic16",author:"jannik siebert (https://github.com/janniks)",base00:"#0b1c2c",base01:"#223b54",base02:"#405c79",base03:"#627e99",base04:"#aabcce",base05:"#cbd6e2",base06:"#e5ebf1",base07:"#f7f9fb",base08:"#bf8b56",base09:"#bfbf56",base0A:"#8bbf56",base0B:"#56bf8b",base0C:"#568bbf",base0D:"#8b56bf",base0E:"#bf568b",base0F:"#bf5656"};Kb.exports=fc.default});var Yb=A((dc,Zb)=>{"use strict";dc.__esModule=!0;dc.default={scheme:"hopscotch",author:"jan t. sott",base00:"#322931",base01:"#433b42",base02:"#5c545b",base03:"#797379",base04:"#989498",base05:"#b9b5b8",base06:"#d5d3d5",base07:"#ffffff",base08:"#dd464c",base09:"#fd8b19",base0A:"#fdcc59",base0B:"#8fc13e",base0C:"#149b93",base0D:"#1290bf",base0E:"#c85e7c",base0F:"#b33508"};Zb.exports=dc.default});var Xb=A((pc,Jb)=>{"use strict";pc.__esModule=!0;pc.default={scheme:"isotope",author:"jan t. sott",base00:"#000000",base01:"#404040",base02:"#606060",base03:"#808080",base04:"#c0c0c0",base05:"#d0d0d0",base06:"#e0e0e0",base07:"#ffffff",base08:"#ff0000",base09:"#ff9900",base0A:"#ff0099",base0B:"#33ff00",base0C:"#00ffff",base0D:"#0066ff",base0E:"#cc00ff",base0F:"#3300ff"};Jb.exports=pc.default});var t2=A((mc,e2)=>{"use strict";mc.__esModule=!0;mc.default={scheme:"marrakesh",author:"alexandre gavioli (http://github.com/alexx2/)",base00:"#201602",base01:"#302e00",base02:"#5f5b17",base03:"#6c6823",base04:"#86813b",base05:"#948e48",base06:"#ccc37a",base07:"#faf0a5",base08:"#c35359",base09:"#b36144",base0A:"#a88339",base0B:"#18974e",base0C:"#75a738",base0D:"#477ca1",base0E:"#8868b3",base0F:"#b3588e"};e2.exports=mc.default});var r2=A((hc,n2)=>{"use strict";hc.__esModule=!0;hc.default={scheme:"mocha",author:"chris kempson (http://chriskempson.com)",base00:"#3B3228",base01:"#534636",base02:"#645240",base03:"#7e705a",base04:"#b8afad",base05:"#d0c8c6",base06:"#e9e1dd",base07:"#f5eeeb",base08:"#cb6077",base09:"#d28b71",base0A:"#f4bc87",base0B:"#beb55b",base0C:"#7bbda4",base0D:"#8ab3b5",base0E:"#a89bb9",base0F:"#bb9584"};n2.exports=hc.default});var i2=A((vc,o2)=>{"use strict";vc.__esModule=!0;vc.default={scheme:"monokai",author:"wimer hazenberg (http://www.monokai.nl)",base00:"#272822",base01:"#383830",base02:"#49483e",base03:"#75715e",base04:"#a59f85",base05:"#f8f8f2",base06:"#f5f4f1",base07:"#f9f8f5",base08:"#f92672",base09:"#fd971f",base0A:"#f4bf75",base0B:"#a6e22e",base0C:"#a1efe4",base0D:"#66d9ef",base0E:"#ae81ff",base0F:"#cc6633"};o2.exports=vc.default});var s2=A((gc,a2)=>{"use strict";gc.__esModule=!0;gc.default={scheme:"ocean",author:"chris kempson (http://chriskempson.com)",base00:"#2b303b",base01:"#343d46",base02:"#4f5b66",base03:"#65737e",base04:"#a7adba",base05:"#c0c5ce",base06:"#dfe1e8",base07:"#eff1f5",base08:"#bf616a",base09:"#d08770",base0A:"#ebcb8b",base0B:"#a3be8c",base0C:"#96b5b4",base0D:"#8fa1b3",base0E:"#b48ead",base0F:"#ab7967"};a2.exports=gc.default});var u2=A((yc,l2)=>{"use strict";yc.__esModule=!0;yc.default={scheme:"paraiso",author:"jan t. sott",base00:"#2f1e2e",base01:"#41323f",base02:"#4f424c",base03:"#776e71",base04:"#8d8687",base05:"#a39e9b",base06:"#b9b6b0",base07:"#e7e9db",base08:"#ef6155",base09:"#f99b15",base0A:"#fec418",base0B:"#48b685",base0C:"#5bc4bf",base0D:"#06b6ef",base0E:"#815ba4",base0F:"#e96ba8"};l2.exports=yc.default});var f2=A((bc,c2)=>{"use strict";bc.__esModule=!0;bc.default={scheme:"pop",author:"chris kempson (http://chriskempson.com)",base00:"#000000",base01:"#202020",base02:"#303030",base03:"#505050",base04:"#b0b0b0",base05:"#d0d0d0",base06:"#e0e0e0",base07:"#ffffff",base08:"#eb008a",base09:"#f29333",base0A:"#f8ca12",base0B:"#37b349",base0C:"#00aabb",base0D:"#0e5a94",base0E:"#b31e8d",base0F:"#7a2d00"};c2.exports=bc.default});var p2=A((wc,d2)=>{"use strict";wc.__esModule=!0;wc.default={scheme:"railscasts",author:"ryan bates (http://railscasts.com)",base00:"#2b2b2b",base01:"#272935",base02:"#3a4055",base03:"#5a647e",base04:"#d4cfc9",base05:"#e6e1dc",base06:"#f4f1ed",base07:"#f9f7f3",base08:"#da4939",base09:"#cc7833",base0A:"#ffc66d",base0B:"#a5c261",base0C:"#519f50",base0D:"#6d9cbe",base0E:"#b6b3eb",base0F:"#bc9458"};d2.exports=wc.default});var h2=A((Sc,m2)=>{"use strict";Sc.__esModule=!0;Sc.default={scheme:"shapeshifter",author:"tyler benziger (http://tybenz.com)",base00:"#000000",base01:"#040404",base02:"#102015",base03:"#343434",base04:"#555555",base05:"#ababab",base06:"#e0e0e0",base07:"#f9f9f9",base08:"#e92f2f",base09:"#e09448",base0A:"#dddd13",base0B:"#0ed839",base0C:"#23edda",base0D:"#3b48e3",base0E:"#f996e2",base0F:"#69542d"};m2.exports=Sc.default});var g2=A((xc,v2)=>{"use strict";xc.__esModule=!0;xc.default={scheme:"solarized",author:"ethan schoonover (http://ethanschoonover.com/solarized)",base00:"#002b36",base01:"#073642",base02:"#586e75",base03:"#657b83",base04:"#839496",base05:"#93a1a1",base06:"#eee8d5",base07:"#fdf6e3",base08:"#dc322f",base09:"#cb4b16",base0A:"#b58900",base0B:"#859900",base0C:"#2aa198",base0D:"#268bd2",base0E:"#6c71c4",base0F:"#d33682"};v2.exports=xc.default});var b2=A((Ec,y2)=>{"use strict";Ec.__esModule=!0;Ec.default={scheme:"summerfruit",author:"christopher corley (http://cscorley.github.io/)",base00:"#151515",base01:"#202020",base02:"#303030",base03:"#505050",base04:"#B0B0B0",base05:"#D0D0D0",base06:"#E0E0E0",base07:"#FFFFFF",base08:"#FF0086",base09:"#FD8900",base0A:"#ABA800",base0B:"#00C918",base0C:"#1faaaa",base0D:"#3777E6",base0E:"#AD00A1",base0F:"#cc6633"};y2.exports=Ec.default});var S2=A((kc,w2)=>{"use strict";kc.__esModule=!0;kc.default={scheme:"tomorrow",author:"chris kempson (http://chriskempson.com)",base00:"#1d1f21",base01:"#282a2e",base02:"#373b41",base03:"#969896",base04:"#b4b7b4",base05:"#c5c8c6",base06:"#e0e0e0",base07:"#ffffff",base08:"#cc6666",base09:"#de935f",base0A:"#f0c674",base0B:"#b5bd68",base0C:"#8abeb7",base0D:"#81a2be",base0E:"#b294bb",base0F:"#a3685a"};w2.exports=kc.default});var E2=A((Cc,x2)=>{"use strict";Cc.__esModule=!0;Cc.default={scheme:"london tube",author:"jan t. sott",base00:"#231f20",base01:"#1c3f95",base02:"#5a5758",base03:"#737171",base04:"#959ca1",base05:"#d9d8d8",base06:"#e7e7e8",base07:"#ffffff",base08:"#ee2e24",base09:"#f386a1",base0A:"#ffd204",base0B:"#00853e",base0C:"#85cebc",base0D:"#009ddc",base0E:"#98005d",base0F:"#b06110"};x2.exports=Cc.default});var C2=A((Tc,k2)=>{"use strict";Tc.__esModule=!0;Tc.default={scheme:"twilight",author:"david hart (http://hart-dev.com)",base00:"#1e1e1e",base01:"#323537",base02:"#464b50",base03:"#5f5a60",base04:"#838184",base05:"#a7a7a7",base06:"#c3c3c3",base07:"#ffffff",base08:"#cf6a4c",base09:"#cda869",base0A:"#f9ee98",base0B:"#8f9d6a",base0C:"#afc4db",base0D:"#7587a6",base0E:"#9b859d",base0F:"#9b703f"};k2.exports=Tc.default});var T2=A(J=>{"use strict";J.__esModule=!0;function re(e){return e&&e.__esModule?e.default:e}var NC=sb();J.threezerotwofour=re(NC);var LC=ub();J.apathy=re(LC);var PC=fb();J.ashes=re(PC);var AC=pb();J.atelierDune=re(AC);var FC=hb();J.atelierForest=re(FC);var jC=gb();J.atelierHeath=re(jC);var zC=bb();J.atelierLakeside=re(zC);var DC=Sb();J.atelierSeaside=re(DC);var BC=Eb();J.bespin=re(BC);var HC=Cb();J.brewer=re(HC);var UC=Ib();J.bright=re(UC);var VC=_b();J.chalk=re(VC);var WC=Rb();J.codeschool=re(WC);var $C=Lb();J.colors=re($C);var GC=Ab();J.default=re(GC);var qC=jb();J.eighties=re(qC);var KC=Db();J.embers=re(KC);var QC=Hb();J.flat=re(QC);var ZC=Vb();J.google=re(ZC);var YC=$b();J.grayscale=re(YC);var JC=qb();J.greenscreen=re(JC);var XC=Qb();J.harmonic=re(XC);var e3=Yb();J.hopscotch=re(e3);var t3=Xb();J.isotope=re(t3);var n3=t2();J.marrakesh=re(n3);var r3=r2();J.mocha=re(r3);var o3=i2();J.monokai=re(o3);var i3=s2();J.ocean=re(i3);var a3=u2();J.paraiso=re(a3);var s3=f2();J.pop=re(s3);var l3=p2();J.railscasts=re(l3);var u3=h2();J.shapeshifter=re(u3);var c3=g2();J.solarized=re(c3);var f3=b2();J.summerfruit=re(f3);var d3=S2();J.tomorrow=re(d3);var p3=E2();J.tube=re(p3);var m3=C2();J.twilight=re(m3)});var O2=A((zM,I2)=>{"use strict";I2.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var M2=A((DM,_2)=>{_2.exports=function(t){return!t||typeof t=="string"?!1:t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&t.constructor.name!=="String")}});var L2=A((BM,N2)=>{"use strict";var h3=M2(),v3=Array.prototype.concat,g3=Array.prototype.slice,R2=N2.exports=function(t){for(var n=[],r=0,o=t.length;r<o;r++){var i=t[r];h3(i)?n=v3.call(n,g3.call(i)):n.push(i)}return n};R2.wrap=function(e){return function(){return e(R2(arguments))}}});var j2=A((HM,F2)=>{var Ts=O2(),Is=L2(),P2=Object.hasOwnProperty,A2=Object.create(null);for(Ic in Ts)P2.call(Ts,Ic)&&(A2[Ts[Ic]]=Ic);var Ic,nn=F2.exports={to:{},get:{}};nn.get=function(e){var t=e.substring(0,3).toLowerCase(),n,r;switch(t){case"hsl":n=nn.get.hsl(e),r="hsl";break;case"hwb":n=nn.get.hwb(e),r="hwb";break;default:n=nn.get.rgb(e),r="rgb";break}return n?{model:r,value:n}:null};nn.get.rgb=function(e){if(!e)return null;var t=/^#([a-f0-9]{3,4})$/i,n=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,r=/^rgba?\\(\\s*([+-]?\\d+)(?=[\\s,])\\s*(?:,\\s*)?([+-]?\\d+)(?=[\\s,])\\s*(?:,\\s*)?([+-]?\\d+)\\s*(?:[,|\\/]\\s*([+-]?[\\d\\.]+)(%?)\\s*)?\\)$/,o=/^rgba?\\(\\s*([+-]?[\\d\\.]+)\\%\\s*,?\\s*([+-]?[\\d\\.]+)\\%\\s*,?\\s*([+-]?[\\d\\.]+)\\%\\s*(?:[,|\\/]\\s*([+-]?[\\d\\.]+)(%?)\\s*)?\\)$/,i=/^(\\w+)$/,a=[0,0,0,1],s,l,u;if(s=e.match(n)){for(u=s[2],s=s[1],l=0;l<3;l++){var c=l*2;a[l]=parseInt(s.slice(c,c+2),16)}u&&(a[3]=parseInt(u,16)/255)}else if(s=e.match(t)){for(s=s[1],u=s[3],l=0;l<3;l++)a[l]=parseInt(s[l]+s[l],16);u&&(a[3]=parseInt(u+u,16)/255)}else if(s=e.match(r)){for(l=0;l<3;l++)a[l]=parseInt(s[l+1],0);s[4]&&(s[5]?a[3]=parseFloat(s[4])*.01:a[3]=parseFloat(s[4]))}else if(s=e.match(o)){for(l=0;l<3;l++)a[l]=Math.round(parseFloat(s[l+1])*2.55);s[4]&&(s[5]?a[3]=parseFloat(s[4])*.01:a[3]=parseFloat(s[4]))}else return(s=e.match(i))?s[1]==="transparent"?[0,0,0,0]:P2.call(Ts,s[1])?(a=Ts[s[1]],a[3]=1,a):null:null;for(l=0;l<3;l++)a[l]=po(a[l],0,255);return a[3]=po(a[3],0,1),a};nn.get.hsl=function(e){if(!e)return null;var t=/^hsla?\\(\\s*([+-]?(?:\\d{0,3}\\.)?\\d+)(?:deg)?\\s*,?\\s*([+-]?[\\d\\.]+)%\\s*,?\\s*([+-]?[\\d\\.]+)%\\s*(?:[,|\\/]\\s*([+-]?(?=\\.\\d|\\d)(?:0|[1-9]\\d*)?(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)\\s*)?\\)$/,n=e.match(t);if(n){var r=parseFloat(n[4]),o=(parseFloat(n[1])%360+360)%360,i=po(parseFloat(n[2]),0,100),a=po(parseFloat(n[3]),0,100),s=po(isNaN(r)?1:r,0,1);return[o,i,a,s]}return null};nn.get.hwb=function(e){if(!e)return null;var t=/^hwb\\(\\s*([+-]?\\d{0,3}(?:\\.\\d+)?)(?:deg)?\\s*,\\s*([+-]?[\\d\\.]+)%\\s*,\\s*([+-]?[\\d\\.]+)%\\s*(?:,\\s*([+-]?(?=\\.\\d|\\d)(?:0|[1-9]\\d*)?(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)\\s*)?\\)$/,n=e.match(t);if(n){var r=parseFloat(n[4]),o=(parseFloat(n[1])%360+360)%360,i=po(parseFloat(n[2]),0,100),a=po(parseFloat(n[3]),0,100),s=po(isNaN(r)?1:r,0,1);return[o,i,a,s]}return null};nn.to.hex=function(){var e=Is(arguments);return"#"+Oc(e[0])+Oc(e[1])+Oc(e[2])+(e[3]<1?Oc(Math.round(e[3]*255)):"")};nn.to.rgb=function(){var e=Is(arguments);return e.length<4||e[3]===1?"rgb("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+")":"rgba("+Math.round(e[0])+", "+Math.round(e[1])+", "+Math.round(e[2])+", "+e[3]+")"};nn.to.rgb.percent=function(){var e=Is(arguments),t=Math.round(e[0]/255*100),n=Math.round(e[1]/255*100),r=Math.round(e[2]/255*100);return e.length<4||e[3]===1?"rgb("+t+"%, "+n+"%, "+r+"%)":"rgba("+t+"%, "+n+"%, "+r+"%, "+e[3]+")"};nn.to.hsl=function(){var e=Is(arguments);return e.length<4||e[3]===1?"hsl("+e[0]+", "+e[1]+"%, "+e[2]+"%)":"hsla("+e[0]+", "+e[1]+"%, "+e[2]+"%, "+e[3]+")"};nn.to.hwb=function(){var e=Is(arguments),t="";return e.length>=4&&e[3]!==1&&(t=", "+e[3]),"hwb("+e[0]+", "+e[1]+"%, "+e[2]+"%"+t+")"};nn.to.keyword=function(e){return A2[e.slice(0,3)]};function po(e,t,n){return Math.min(Math.max(t,e),n)}function Oc(e){var t=Math.round(e).toString(16).toUpperCase();return t.length<2?"0"+t:t}});var D2=A((UM,z2)=>{"use strict";z2.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});var Mm=A((VM,V2)=>{var Jo=D2(),U2={};for(_c in Jo)Jo.hasOwnProperty(_c)&&(U2[Jo[_c]]=_c);var _c,j=V2.exports={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};for(Mt in j)if(j.hasOwnProperty(Mt)){if(!("channels"in j[Mt]))throw new Error("missing channels property: "+Mt);if(!("labels"in j[Mt]))throw new Error("missing channel labels property: "+Mt);if(j[Mt].labels.length!==j[Mt].channels)throw new Error("channel and label counts mismatch: "+Mt);B2=j[Mt].channels,H2=j[Mt].labels,delete j[Mt].channels,delete j[Mt].labels,Object.defineProperty(j[Mt],"channels",{value:B2}),Object.defineProperty(j[Mt],"labels",{value:H2})}var B2,H2,Mt;j.rgb.hsl=function(e){var t=e[0]/255,n=e[1]/255,r=e[2]/255,o=Math.min(t,n,r),i=Math.max(t,n,r),a=i-o,s,l,u;return i===o?s=0:t===i?s=(n-r)/a:n===i?s=2+(r-t)/a:r===i&&(s=4+(t-n)/a),s=Math.min(s*60,360),s<0&&(s+=360),u=(o+i)/2,i===o?l=0:u<=.5?l=a/(i+o):l=a/(2-i-o),[s,l*100,u*100]};j.rgb.hsv=function(e){var t,n,r,o,i,a=e[0]/255,s=e[1]/255,l=e[2]/255,u=Math.max(a,s,l),c=u-Math.min(a,s,l),f=function(v){return(u-v)/6/c+1/2};return c===0?o=i=0:(i=c/u,t=f(a),n=f(s),r=f(l),a===u?o=r-n:s===u?o=1/3+t-r:l===u&&(o=2/3+n-t),o<0?o+=1:o>1&&(o-=1)),[o*360,i*100,u*100]};j.rgb.hwb=function(e){var t=e[0],n=e[1],r=e[2],o=j.rgb.hsl(e)[0],i=1/255*Math.min(t,Math.min(n,r));return r=1-1/255*Math.max(t,Math.max(n,r)),[o,i*100,r*100]};j.rgb.cmyk=function(e){var t=e[0]/255,n=e[1]/255,r=e[2]/255,o,i,a,s;return s=Math.min(1-t,1-n,1-r),o=(1-t-s)/(1-s)||0,i=(1-n-s)/(1-s)||0,a=(1-r-s)/(1-s)||0,[o*100,i*100,a*100,s*100]};function y3(e,t){return Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2)}j.rgb.keyword=function(e){var t=U2[e];if(t)return t;var n=1/0,r;for(var o in Jo)if(Jo.hasOwnProperty(o)){var i=Jo[o],a=y3(e,i);a<n&&(n=a,r=o)}return r};j.keyword.rgb=function(e){return Jo[e]};j.rgb.xyz=function(e){var t=e[0]/255,n=e[1]/255,r=e[2]/255;t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,n=n>.04045?Math.pow((n+.055)/1.055,2.4):n/12.92,r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92;var o=t*.4124+n*.3576+r*.1805,i=t*.2126+n*.7152+r*.0722,a=t*.0193+n*.1192+r*.9505;return[o*100,i*100,a*100]};j.rgb.lab=function(e){var t=j.rgb.xyz(e),n=t[0],r=t[1],o=t[2],i,a,s;return n/=95.047,r/=100,o/=108.883,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,o=o>.008856?Math.pow(o,1/3):7.787*o+16/116,i=116*r-16,a=500*(n-r),s=200*(r-o),[i,a,s]};j.hsl.rgb=function(e){var t=e[0]/360,n=e[1]/100,r=e[2]/100,o,i,a,s,l;if(n===0)return l=r*255,[l,l,l];r<.5?i=r*(1+n):i=r+n-r*n,o=2*r-i,s=[0,0,0];for(var u=0;u<3;u++)a=t+1/3*-(u-1),a<0&&a++,a>1&&a--,6*a<1?l=o+(i-o)*6*a:2*a<1?l=i:3*a<2?l=o+(i-o)*(2/3-a)*6:l=o,s[u]=l*255;return s};j.hsl.hsv=function(e){var t=e[0],n=e[1]/100,r=e[2]/100,o=n,i=Math.max(r,.01),a,s;return r*=2,n*=r<=1?r:2-r,o*=i<=1?i:2-i,s=(r+n)/2,a=r===0?2*o/(i+o):2*n/(r+n),[t,a*100,s*100]};j.hsv.rgb=function(e){var t=e[0]/60,n=e[1]/100,r=e[2]/100,o=Math.floor(t)%6,i=t-Math.floor(t),a=255*r*(1-n),s=255*r*(1-n*i),l=255*r*(1-n*(1-i));switch(r*=255,o){case 0:return[r,l,a];case 1:return[s,r,a];case 2:return[a,r,l];case 3:return[a,s,r];case 4:return[l,a,r];case 5:return[r,a,s]}};j.hsv.hsl=function(e){var t=e[0],n=e[1]/100,r=e[2]/100,o=Math.max(r,.01),i,a,s;return s=(2-n)*r,i=(2-n)*o,a=n*o,a/=i<=1?i:2-i,a=a||0,s/=2,[t,a*100,s*100]};j.hwb.rgb=function(e){var t=e[0]/360,n=e[1]/100,r=e[2]/100,o=n+r,i,a,s,l;o>1&&(n/=o,r/=o),i=Math.floor(6*t),a=1-r,s=6*t-i,(i&1)!==0&&(s=1-s),l=n+s*(a-n);var u,c,f;switch(i){default:case 6:case 0:u=a,c=l,f=n;break;case 1:u=l,c=a,f=n;break;case 2:u=n,c=a,f=l;break;case 3:u=n,c=l,f=a;break;case 4:u=l,c=n,f=a;break;case 5:u=a,c=n,f=l;break}return[u*255,c*255,f*255]};j.cmyk.rgb=function(e){var t=e[0]/100,n=e[1]/100,r=e[2]/100,o=e[3]/100,i,a,s;return i=1-Math.min(1,t*(1-o)+o),a=1-Math.min(1,n*(1-o)+o),s=1-Math.min(1,r*(1-o)+o),[i*255,a*255,s*255]};j.xyz.rgb=function(e){var t=e[0]/100,n=e[1]/100,r=e[2]/100,o,i,a;return o=t*3.2406+n*-1.5372+r*-.4986,i=t*-.9689+n*1.8758+r*.0415,a=t*.0557+n*-.204+r*1.057,o=o>.0031308?1.055*Math.pow(o,1/2.4)-.055:o*12.92,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i*12.92,a=a>.0031308?1.055*Math.pow(a,1/2.4)-.055:a*12.92,o=Math.min(Math.max(0,o),1),i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),[o*255,i*255,a*255]};j.xyz.lab=function(e){var t=e[0],n=e[1],r=e[2],o,i,a;return t/=95.047,n/=100,r/=108.883,t=t>.008856?Math.pow(t,1/3):7.787*t+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,o=116*n-16,i=500*(t-n),a=200*(n-r),[o,i,a]};j.lab.xyz=function(e){var t=e[0],n=e[1],r=e[2],o,i,a;i=(t+16)/116,o=n/500+i,a=i-r/200;var s=Math.pow(i,3),l=Math.pow(o,3),u=Math.pow(a,3);return i=s>.008856?s:(i-16/116)/7.787,o=l>.008856?l:(o-16/116)/7.787,a=u>.008856?u:(a-16/116)/7.787,o*=95.047,i*=100,a*=108.883,[o,i,a]};j.lab.lch=function(e){var t=e[0],n=e[1],r=e[2],o,i,a;return o=Math.atan2(r,n),i=o*360/2/Math.PI,i<0&&(i+=360),a=Math.sqrt(n*n+r*r),[t,a,i]};j.lch.lab=function(e){var t=e[0],n=e[1],r=e[2],o,i,a;return a=r/360*2*Math.PI,o=n*Math.cos(a),i=n*Math.sin(a),[t,o,i]};j.rgb.ansi16=function(e){var t=e[0],n=e[1],r=e[2],o=1 in arguments?arguments[1]:j.rgb.hsv(e)[2];if(o=Math.round(o/50),o===0)return 30;var i=30+(Math.round(r/255)<<2|Math.round(n/255)<<1|Math.round(t/255));return o===2&&(i+=60),i};j.hsv.ansi16=function(e){return j.rgb.ansi16(j.hsv.rgb(e),e[2])};j.rgb.ansi256=function(e){var t=e[0],n=e[1],r=e[2];if(t===n&&n===r)return t<8?16:t>248?231:Math.round((t-8)/247*24)+232;var o=16+36*Math.round(t/255*5)+6*Math.round(n/255*5)+Math.round(r/255*5);return o};j.ansi16.rgb=function(e){var t=e%10;if(t===0||t===7)return e>50&&(t+=3.5),t=t/10.5*255,[t,t,t];var n=(~~(e>50)+1)*.5,r=(t&1)*n*255,o=(t>>1&1)*n*255,i=(t>>2&1)*n*255;return[r,o,i]};j.ansi256.rgb=function(e){if(e>=232){var t=(e-232)*10+8;return[t,t,t]}e-=16;var n,r=Math.floor(e/36)/5*255,o=Math.floor((n=e%36)/6)/5*255,i=n%6/5*255;return[r,o,i]};j.rgb.hex=function(e){var t=((Math.round(e[0])&255)<<16)+((Math.round(e[1])&255)<<8)+(Math.round(e[2])&255),n=t.toString(16).toUpperCase();return"000000".substring(n.length)+n};j.hex.rgb=function(e){var t=e.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!t)return[0,0,0];var n=t[0];t[0].length===3&&(n=n.split("").map(function(s){return s+s}).join(""));var r=parseInt(n,16),o=r>>16&255,i=r>>8&255,a=r&255;return[o,i,a]};j.rgb.hcg=function(e){var t=e[0]/255,n=e[1]/255,r=e[2]/255,o=Math.max(Math.max(t,n),r),i=Math.min(Math.min(t,n),r),a=o-i,s,l;return a<1?s=i/(1-a):s=0,a<=0?l=0:o===t?l=(n-r)/a%6:o===n?l=2+(r-t)/a:l=4+(t-n)/a+4,l/=6,l%=1,[l*360,a*100,s*100]};j.hsl.hcg=function(e){var t=e[1]/100,n=e[2]/100,r=1,o=0;return n<.5?r=2*t*n:r=2*t*(1-n),r<1&&(o=(n-.5*r)/(1-r)),[e[0],r*100,o*100]};j.hsv.hcg=function(e){var t=e[1]/100,n=e[2]/100,r=t*n,o=0;return r<1&&(o=(n-r)/(1-r)),[e[0],r*100,o*100]};j.hcg.rgb=function(e){var t=e[0]/360,n=e[1]/100,r=e[2]/100;if(n===0)return[r*255,r*255,r*255];var o=[0,0,0],i=t%1*6,a=i%1,s=1-a,l=0;switch(Math.floor(i)){case 0:o[0]=1,o[1]=a,o[2]=0;break;case 1:o[0]=s,o[1]=1,o[2]=0;break;case 2:o[0]=0,o[1]=1,o[2]=a;break;case 3:o[0]=0,o[1]=s,o[2]=1;break;case 4:o[0]=a,o[1]=0,o[2]=1;break;default:o[0]=1,o[1]=0,o[2]=s}return l=(1-n)*r,[(n*o[0]+l)*255,(n*o[1]+l)*255,(n*o[2]+l)*255]};j.hcg.hsv=function(e){var t=e[1]/100,n=e[2]/100,r=t+n*(1-t),o=0;return r>0&&(o=t/r),[e[0],o*100,r*100]};j.hcg.hsl=function(e){var t=e[1]/100,n=e[2]/100,r=n*(1-t)+.5*t,o=0;return r>0&&r<.5?o=t/(2*r):r>=.5&&r<1&&(o=t/(2*(1-r))),[e[0],o*100,r*100]};j.hcg.hwb=function(e){var t=e[1]/100,n=e[2]/100,r=t+n*(1-t);return[e[0],(r-t)*100,(1-r)*100]};j.hwb.hcg=function(e){var t=e[1]/100,n=e[2]/100,r=1-n,o=r-t,i=0;return o<1&&(i=(r-o)/(1-o)),[e[0],o*100,i*100]};j.apple.rgb=function(e){return[e[0]/65535*255,e[1]/65535*255,e[2]/65535*255]};j.rgb.apple=function(e){return[e[0]/255*65535,e[1]/255*65535,e[2]/255*65535]};j.gray.rgb=function(e){return[e[0]/100*255,e[0]/100*255,e[0]/100*255]};j.gray.hsl=j.gray.hsv=function(e){return[0,0,e[0]]};j.gray.hwb=function(e){return[0,100,e[0]]};j.gray.cmyk=function(e){return[0,0,0,e[0]]};j.gray.lab=function(e){return[e[0],0,0]};j.gray.hex=function(e){var t=Math.round(e[0]/100*255)&255,n=(t<<16)+(t<<8)+t,r=n.toString(16).toUpperCase();return"000000".substring(r.length)+r};j.rgb.gray=function(e){var t=(e[0]+e[1]+e[2])/3;return[t/255*100]}});var $2=A((WM,W2)=>{var Mc=Mm();function b3(){for(var e={},t=Object.keys(Mc),n=t.length,r=0;r<n;r++)e[t[r]]={distance:-1,parent:null};return e}function w3(e){var t=b3(),n=[e];for(t[e].distance=0;n.length;)for(var r=n.pop(),o=Object.keys(Mc[r]),i=o.length,a=0;a<i;a++){var s=o[a],l=t[s];l.distance===-1&&(l.distance=t[r].distance+1,l.parent=r,n.unshift(s))}return t}function S3(e,t){return function(n){return t(e(n))}}function x3(e,t){for(var n=[t[e].parent,e],r=Mc[t[e].parent][e],o=t[e].parent;t[o].parent;)n.unshift(t[o].parent),r=S3(Mc[t[o].parent][o],r),o=t[o].parent;return r.conversion=n,r}W2.exports=function(e){for(var t=w3(e),n={},r=Object.keys(t),o=r.length,i=0;i<o;i++){var a=r[i],s=t[a];s.parent!==null&&(n[a]=x3(a,t))}return n}});var q2=A(($M,G2)=>{var Rm=Mm(),E3=$2(),ta={},k3=Object.keys(Rm);function C3(e){var t=function(n){return n==null?n:(arguments.length>1&&(n=Array.prototype.slice.call(arguments)),e(n))};return"conversion"in e&&(t.conversion=e.conversion),t}function T3(e){var t=function(n){if(n==null)return n;arguments.length>1&&(n=Array.prototype.slice.call(arguments));var r=e(n);if(typeof r=="object")for(var o=r.length,i=0;i<o;i++)r[i]=Math.round(r[i]);return r};return"conversion"in e&&(t.conversion=e.conversion),t}k3.forEach(function(e){ta[e]={},Object.defineProperty(ta[e],"channels",{value:Rm[e].channels}),Object.defineProperty(ta[e],"labels",{value:Rm[e].labels});var t=E3(e),n=Object.keys(t);n.forEach(function(r){var o=t[r];ta[e][r]=T3(o),ta[e][r].raw=C3(o)})});G2.exports=ta});var Z2=A((GM,Q2)=>{"use strict";var Os=j2(),rn=q2(),Pm=[].slice,K2=["keyword","gray","hex"],Nm={};Object.keys(rn).forEach(function(e){Nm[Pm.call(rn[e].labels).sort().join("")]=e});var Rc={};function ut(e,t){if(!(this instanceof ut))return new ut(e,t);if(t&&t in K2&&(t=null),t&&!(t in rn))throw new Error("Unknown model: "+t);var n,r;if(e==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(e instanceof ut)this.model=e.model,this.color=e.color.slice(),this.valpha=e.valpha;else if(typeof e=="string"){var o=Os.get(e);if(o===null)throw new Error("Unable to parse color from string: "+e);this.model=o.model,r=rn[this.model].channels,this.color=o.value.slice(0,r),this.valpha=typeof o.value[r]=="number"?o.value[r]:1}else if(e.length){this.model=t||"rgb",r=rn[this.model].channels;var i=Pm.call(e,0,r);this.color=Lm(i,r),this.valpha=typeof e[r]=="number"?e[r]:1}else if(typeof e=="number")e&=16777215,this.model="rgb",this.color=[e>>16&255,e>>8&255,e&255],this.valpha=1;else{this.valpha=1;var a=Object.keys(e);"alpha"in e&&(a.splice(a.indexOf("alpha"),1),this.valpha=typeof e.alpha=="number"?e.alpha:0);var s=a.sort().join("");if(!(s in Nm))throw new Error("Unable to parse color from object: "+JSON.stringify(e));this.model=Nm[s];var l=rn[this.model].labels,u=[];for(n=0;n<l.length;n++)u.push(e[l[n]]);this.color=Lm(u)}if(Rc[this.model])for(r=rn[this.model].channels,n=0;n<r;n++){var c=Rc[this.model][n];c&&(this.color[n]=c(this.color[n]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}ut.prototype={toString:function(){return this.string()},toJSON:function(){return this[this.model]()},string:function(e){var t=this.model in Os.to?this:this.rgb();t=t.round(typeof e=="number"?e:1);var n=t.valpha===1?t.color:t.color.concat(this.valpha);return Os.to[t.model](n)},percentString:function(e){var t=this.rgb().round(typeof e=="number"?e:1),n=t.valpha===1?t.color:t.color.concat(this.valpha);return Os.to.rgb.percent(n)},array:function(){return this.valpha===1?this.color.slice():this.color.concat(this.valpha)},object:function(){for(var e={},t=rn[this.model].channels,n=rn[this.model].labels,r=0;r<t;r++)e[n[r]]=this.color[r];return this.valpha!==1&&(e.alpha=this.valpha),e},unitArray:function(){var e=this.rgb().color;return e[0]/=255,e[1]/=255,e[2]/=255,this.valpha!==1&&e.push(this.valpha),e},unitObject:function(){var e=this.rgb().object();return e.r/=255,e.g/=255,e.b/=255,this.valpha!==1&&(e.alpha=this.valpha),e},round:function(e){return e=Math.max(e||0,0),new ut(this.color.map(O3(e)).concat(this.valpha),this.model)},alpha:function(e){return arguments.length?new ut(this.color.concat(Math.max(0,Math.min(1,e))),this.model):this.valpha},red:je("rgb",0,Je(255)),green:je("rgb",1,Je(255)),blue:je("rgb",2,Je(255)),hue:je(["hsl","hsv","hsl","hwb","hcg"],0,function(e){return(e%360+360)%360}),saturationl:je("hsl",1,Je(100)),lightness:je("hsl",2,Je(100)),saturationv:je("hsv",1,Je(100)),value:je("hsv",2,Je(100)),chroma:je("hcg",1,Je(100)),gray:je("hcg",2,Je(100)),white:je("hwb",1,Je(100)),wblack:je("hwb",2,Je(100)),cyan:je("cmyk",0,Je(100)),magenta:je("cmyk",1,Je(100)),yellow:je("cmyk",2,Je(100)),black:je("cmyk",3,Je(100)),x:je("xyz",0,Je(100)),y:je("xyz",1,Je(100)),z:je("xyz",2,Je(100)),l:je("lab",0,Je(100)),a:je("lab",1),b:je("lab",2),keyword:function(e){return arguments.length?new ut(e):rn[this.model].keyword(this.color)},hex:function(e){return arguments.length?new ut(e):Os.to.hex(this.rgb().round().color)},rgbNumber:function(){var e=this.rgb().color;return(e[0]&255)<<16|(e[1]&255)<<8|e[2]&255},luminosity:function(){for(var e=this.rgb().color,t=[],n=0;n<e.length;n++){var r=e[n]/255;t[n]=r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4)}return .2126*t[0]+.7152*t[1]+.0722*t[2]},contrast:function(e){var t=this.luminosity(),n=e.luminosity();return t>n?(t+.05)/(n+.05):(n+.05)/(t+.05)},level:function(e){var t=this.contrast(e);return t>=7.1?"AAA":t>=4.5?"AA":""},isDark:function(){var e=this.rgb().color,t=(e[0]*299+e[1]*587+e[2]*114)/1e3;return t<128},isLight:function(){return!this.isDark()},negate:function(){for(var e=this.rgb(),t=0;t<3;t++)e.color[t]=255-e.color[t];return e},lighten:function(e){var t=this.hsl();return t.color[2]+=t.color[2]*e,t},darken:function(e){var t=this.hsl();return t.color[2]-=t.color[2]*e,t},saturate:function(e){var t=this.hsl();return t.color[1]+=t.color[1]*e,t},desaturate:function(e){var t=this.hsl();return t.color[1]-=t.color[1]*e,t},whiten:function(e){var t=this.hwb();return t.color[1]+=t.color[1]*e,t},blacken:function(e){var t=this.hwb();return t.color[2]+=t.color[2]*e,t},grayscale:function(){var e=this.rgb().color,t=e[0]*.3+e[1]*.59+e[2]*.11;return ut.rgb(t,t,t)},fade:function(e){return this.alpha(this.valpha-this.valpha*e)},opaquer:function(e){return this.alpha(this.valpha+this.valpha*e)},rotate:function(e){var t=this.hsl(),n=t.color[0];return n=(n+e)%360,n=n<0?360+n:n,t.color[0]=n,t},mix:function(e,t){if(!e||!e.rgb)throw new Error(\'Argument to "mix" was not a Color instance, but rather an instance of \'+typeof e);var n=e.rgb(),r=this.rgb(),o=t===void 0?.5:t,i=2*o-1,a=n.alpha()-r.alpha(),s=((i*a===-1?i:(i+a)/(1+i*a))+1)/2,l=1-s;return ut.rgb(s*n.red()+l*r.red(),s*n.green()+l*r.green(),s*n.blue()+l*r.blue(),n.alpha()*o+r.alpha()*(1-o))}};Object.keys(rn).forEach(function(e){if(K2.indexOf(e)===-1){var t=rn[e].channels;ut.prototype[e]=function(){if(this.model===e)return new ut(this);if(arguments.length)return new ut(arguments,e);var n=typeof arguments[t]=="number"?t:this.valpha;return new ut(_3(rn[this.model][e].raw(this.color)).concat(n),e)},ut[e]=function(n){return typeof n=="number"&&(n=Lm(Pm.call(arguments),t)),new ut(n,e)}}});function I3(e,t){return Number(e.toFixed(t))}function O3(e){return function(t){return I3(t,e)}}function je(e,t,n){return e=Array.isArray(e)?e:[e],e.forEach(function(r){(Rc[r]||(Rc[r]=[]))[t]=n}),e=e[0],function(r){var o;return arguments.length?(n&&(r=n(r)),o=this[e](),o.color[t]=r,o):(o=this[e]().color[t],n&&(o=n(o)),o)}}function Je(e){return function(t){return Math.max(0,Math.min(e,t))}}function _3(e){return Array.isArray(e)?e:[e]}function Lm(e,t){for(var n=0;n<t;n++)typeof e[n]!="number"&&(e[n]=0);return e}Q2.exports=ut});var hw=A((qM,mw)=>{var M3="Expected a function",Y2="__lodash_placeholder__",ei=1,Lc=2,R3=4,Xo=8,_s=16,na=32,Ms=64,ow=128,N3=256,iw=512,J2=1/0,L3=9007199254740991,P3=17976931348623157e292,X2=0/0,A3=[["ary",ow],["bind",ei],["bindKey",Lc],["curry",Xo],["curryRight",_s],["flip",iw],["partial",na],["partialRight",Ms],["rearg",N3]],F3="[object Function]",j3="[object GeneratorFunction]",z3="[object Symbol]",D3=/[\\\\^$.*+?()[\\]{}|]/g,B3=/^\\s+|\\s+$/g,H3=/\\{(?:\\n\\/\\* \\[wrapped with .+\\] \\*\\/)?\\n?/,U3=/\\{\\n\\/\\* \\[wrapped with (.+)\\] \\*/,V3=/,? & /,W3=/^[-+]0x[0-9a-f]+$/i,$3=/^0b[01]+$/i,G3=/^\\[object .+?Constructor\\]$/,q3=/^0o[0-7]+$/i,K3=/^(?:0|[1-9]\\d*)$/,Q3=parseInt,Z3=typeof global=="object"&&global&&global.Object===Object&&global,Y3=typeof self=="object"&&self&&self.Object===Object&&self,Ns=Z3||Y3||Function("return this")();function aw(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}function J3(e,t){for(var n=-1,r=e?e.length:0;++n<r&&t(e[n],n,e)!==!1;);return e}function X3(e,t){var n=e?e.length:0;return!!n&&tT(e,t,0)>-1}function eT(e,t,n,r){for(var o=e.length,i=n+(r?1:-1);r?i--:++i<o;)if(t(e[i],i,e))return i;return-1}function tT(e,t,n){if(t!==t)return eT(e,nT,n);for(var r=n-1,o=e.length;++r<o;)if(e[r]===t)return r;return-1}function nT(e){return e!==e}function rT(e,t){for(var n=e.length,r=0;n--;)e[n]===t&&r++;return r}function oT(e,t){return e?.[t]}function iT(e){var t=!1;if(e!=null&&typeof e.toString!="function")try{t=!!(e+"")}catch{}return t}function sw(e,t){for(var n=-1,r=e.length,o=0,i=[];++n<r;){var a=e[n];(a===t||a===Y2)&&(e[n]=Y2,i[o++]=n)}return i}var aT=Function.prototype,lw=Object.prototype,Am=Ns["__core-js_shared__"],ew=function(){var e=/[^.]+$/.exec(Am&&Am.keys&&Am.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),uw=aT.toString,sT=lw.hasOwnProperty,cw=lw.toString,lT=RegExp("^"+uw.call(sT).replace(D3,"\\\\$&").replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g,"$1.*?")+"$"),uT=Object.create,Nc=Math.max,cT=Math.min,tw=function(){var e=nw(Object,"defineProperty"),t=nw.name;return t&&t.length>2?e:void 0}();function fT(e){return ra(e)?uT(e):{}}function dT(e){if(!ra(e)||ET(e))return!1;var t=IT(e)||iT(e)?lT:G3;return t.test(CT(e))}function pT(e,t,n,r){for(var o=-1,i=e.length,a=n.length,s=-1,l=t.length,u=Nc(i-a,0),c=Array(l+u),f=!r;++s<l;)c[s]=t[s];for(;++o<a;)(f||o<i)&&(c[n[o]]=e[o]);for(;u--;)c[s++]=e[o++];return c}function mT(e,t,n,r){for(var o=-1,i=e.length,a=-1,s=n.length,l=-1,u=t.length,c=Nc(i-s,0),f=Array(c+u),v=!r;++o<c;)f[o]=e[o];for(var m=o;++l<u;)f[m+l]=t[l];for(;++a<s;)(v||o<i)&&(f[m+n[a]]=e[o++]);return f}function hT(e,t){var n=-1,r=e.length;for(t||(t=Array(r));++n<r;)t[n]=e[n];return t}function vT(e,t,n){var r=t&ei,o=Rs(e);function i(){var a=this&&this!==Ns&&this instanceof i?o:e;return a.apply(r?n:this,arguments)}return i}function Rs(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var n=fT(e.prototype),r=e.apply(n,t);return ra(r)?r:n}}function gT(e,t,n){var r=Rs(e);function o(){for(var i=arguments.length,a=Array(i),s=i,l=dw(o);s--;)a[s]=arguments[s];var u=i<3&&a[0]!==l&&a[i-1]!==l?[]:sw(a,l);if(i-=u.length,i<n)return fw(e,t,Fm,o.placeholder,void 0,a,u,void 0,void 0,n-i);var c=this&&this!==Ns&&this instanceof o?r:e;return aw(c,this,a)}return o}function Fm(e,t,n,r,o,i,a,s,l,u){var c=t&ow,f=t&ei,v=t&Lc,m=t&(Xo|_s),d=t&iw,y=v?void 0:Rs(e);function w(){for(var g=arguments.length,h=Array(g),p=g;p--;)h[p]=arguments[p];if(m)var b=dw(w),S=rT(h,b);if(r&&(h=pT(h,r,o,m)),i&&(h=mT(h,i,a,m)),g-=S,m&&g<u){var x=sw(h,b);return fw(e,t,Fm,w.placeholder,n,h,x,s,l,u-g)}var E=f?n:this,k=v?E[e]:e;return g=h.length,s?h=kT(h,s):d&&g>1&&h.reverse(),c&&l<g&&(h.length=l),this&&this!==Ns&&this instanceof w&&(k=y||Rs(k)),k.apply(E,h)}return w}function yT(e,t,n,r){var o=t&ei,i=Rs(e);function a(){for(var s=-1,l=arguments.length,u=-1,c=r.length,f=Array(c+l),v=this&&this!==Ns&&this instanceof a?i:e;++u<c;)f[u]=r[u];for(;l--;)f[u++]=arguments[++s];return aw(v,o?n:this,f)}return a}function fw(e,t,n,r,o,i,a,s,l,u){var c=t&Xo,f=c?a:void 0,v=c?void 0:a,m=c?i:void 0,d=c?void 0:i;t|=c?na:Ms,t&=~(c?Ms:na),t&R3||(t&=~(ei|Lc));var y=n(e,t,o,m,f,d,v,s,l,u);return y.placeholder=r,pw(y,e,t)}function bT(e,t,n,r,o,i,a,s){var l=t&Lc;if(!l&&typeof e!="function")throw new TypeError(M3);var u=r?r.length:0;if(u||(t&=~(na|Ms),r=o=void 0),a=a===void 0?a:Nc(rw(a),0),s=s===void 0?s:rw(s),u-=o?o.length:0,t&Ms){var c=r,f=o;r=o=void 0}var v=[e,t,n,r,o,c,f,i,a,s];if(e=v[0],t=v[1],n=v[2],r=v[3],o=v[4],s=v[9]=v[9]==null?l?0:e.length:Nc(v[9]-u,0),!s&&t&(Xo|_s)&&(t&=~(Xo|_s)),!t||t==ei)var m=vT(e,t,n);else t==Xo||t==_s?m=gT(e,t,s):(t==na||t==(ei|na))&&!o.length?m=yT(e,t,n,r):m=Fm.apply(void 0,v);return pw(m,e,t)}function dw(e){var t=e;return t.placeholder}function nw(e,t){var n=oT(e,t);return dT(n)?n:void 0}function wT(e){var t=e.match(U3);return t?t[1].split(V3):[]}function ST(e,t){var n=t.length,r=n-1;return t[r]=(n>1?"& ":"")+t[r],t=t.join(n>2?", ":" "),e.replace(H3,`{\n/* [wrapped with `+t+`] */\n`)}function xT(e,t){return t=t??L3,!!t&&(typeof e=="number"||K3.test(e))&&e>-1&&e%1==0&&e<t}function ET(e){return!!ew&&ew in e}function kT(e,t){for(var n=e.length,r=cT(t.length,n),o=hT(e);r--;){var i=t[r];e[r]=xT(i,n)?o[i]:void 0}return e}var pw=tw?function(e,t,n){var r=t+"";return tw(e,"toString",{configurable:!0,enumerable:!1,value:NT(ST(r,TT(wT(r),n)))})}:LT;function CT(e){if(e!=null){try{return uw.call(e)}catch{}try{return e+""}catch{}}return""}function TT(e,t){return J3(A3,function(n){var r="_."+n[0];t&n[1]&&!X3(e,r)&&e.push(r)}),e.sort()}function jm(e,t,n){t=n?void 0:t;var r=bT(e,Xo,void 0,void 0,void 0,void 0,void 0,t);return r.placeholder=jm.placeholder,r}function IT(e){var t=ra(e)?cw.call(e):"";return t==F3||t==j3}function ra(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function OT(e){return!!e&&typeof e=="object"}function _T(e){return typeof e=="symbol"||OT(e)&&cw.call(e)==z3}function MT(e){if(!e)return e===0?e:0;if(e=RT(e),e===J2||e===-J2){var t=e<0?-1:1;return t*P3}return e===e?e:0}function rw(e){var t=MT(e),n=t%1;return t===t?n?t-n:t:0}function RT(e){if(typeof e=="number")return e;if(_T(e))return X2;if(ra(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=ra(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(B3,"");var n=$3.test(e);return n||q3.test(e)?Q3(e.slice(2),n?2:8):W3.test(e)?X2:+e}function NT(e){return function(){return e}}function LT(e){return e}jm.placeholder={};mw.exports=jm});var cn=U(Y(),1);function pf(e,t){for(let n in e)t(e[n],n)}function $t(e,t){e.forEach(t)}function qt(e,t){if(!e)throw Error(t)}function Mn({node:e=[],from:t,source:n,parent:r=t||n,to:o,target:i,child:a=o||i,scope:s={},meta:l={},family:u={type:"regular"},regional:c}={}){let f=ha(r),v=ha(u.links),m=ha(u.owners),d=[];$t(e,w=>w&&Gn(d,w));let y={id:ax(),seq:d,next:ha(a),meta:l,scope:s,family:{type:u.type||"crosslink",links:v,owners:m}};return $t(v,w=>Gn(el(w),y)),$t(m,w=>Gn(tl(w),y)),$t(f,w=>Gn(w.next,y)),c&&So&&ui(va(So),[y]),y}function Fr(e,t,n){let r=qn,o=null,i=Re;if(e.target&&(t=e.params,n=e.defer,r="page"in e?e.page:r,e.stack&&(o=e.stack),i=Ar(e)||i,e=e.target),i&&Re&&i!==Re&&(Re=null),Array.isArray(e))for(let m=0;m<e.length;m++)bo("pure",r,un(e[m]),o,t[m],i);else bo("pure",r,un(e),o,t,i);if(n&&!Ks)return;let a,s,l,u,c,f,v={isRoot:Ks,currentPage:qn,scope:Re,isWatch:Ys,isPure:Js};Ks=0;e:for(;u=cx();){let{idx:m,stack:d,type:y}=u;l=d.node,qn=c=d.page,Re=Ar(d),c?f=c.reg:Re&&(f=Re.reg);let w=!!c,g=!!Re,h={fail:0,scope:l.scope};a=s=0;for(let p=m;p<l.seq.length&&!a;p++){let b=l.seq[p];if(b.order){let{priority:S,barrierID:x}=b.order,E=x?c?`${c.fullID}_${x}`:x:0;if(p!==m||y!==S){x?rf.has(E)||(rf.add(E),cf(p,d,S,x)):cf(p,d,S);continue e}x&&rf.delete(E)}switch(b.type){case"mov":{let x,E=b.data;switch(E.from){case xo:x=va(d);break;case"a":case"b":x=d[E.from];break;case"value":x=E.store;break;case"store":if(f&&!f[E.store.id])if(w){let k=Gh(c,E.store.id);d.page=c=k,k?f=k.reg:g?(di(Re,E.store,0,1,E.softRead),f=Re.reg):f=void 0}else g&&di(Re,E.store,0,1,E.softRead);x=ga(f&&f[E.store.id]||E.store)}switch(E.to){case xo:d.value=x;break;case"a":case"b":d[E.to]=x;break;case"store":dx(c,Re,l,E.target).current=x}break}case"compute":let S=b.data;if(S.fn){Ys=Ct(l,"op")==="watch",Js=S.pure;let x=S.safe?(0,S.fn)(va(d),h.scope,d):mx(h,S.fn,d);S.filter?s=!x:d.value=x,Ys=v.isWatch,Js=v.isPure}}a=h.fail||s}if(!a){let p=va(d),b=Ar(d);if($t(l.next,S=>{bo("child",c,S,d,p,b)}),b){Ct(l,"needFxCounter")&&bo("child",c,b.fxCount,d,p,b),Ct(l,"storeChange")&&bo("child",c,b.storeChange,d,p,b),Ct(l,"warnSerialize")&&bo("child",c,b.warnSerializeNode,d,p,b);let S=b.additionalLinks[l.id];S&&$t(S,x=>{bo("child",c,x,d,p,b)})}}}Ks=v.isRoot,qn=v.currentPage,Re=Ar(v)}function jh(e,t="combine"){let n=t+"(",r="",o=0;return pf(e,i=>{o<25&&(i!=null&&(n+=r,n+=Eo(i)?hf(i).fullName:i.toString()),o+=1,r=", ")}),n+")"}function zh(e,t){let n,r,o=e;if(t){let i=hf(t);e.length===0?(n=i.path,r=i.fullName):(n=i.path.concat([e]),r=i.fullName.length===0?e:i.fullName+"/"+e)}else n=e.length===0?[]:[e],r=e;return{shortName:o,fullName:r,path:n}}function ba(e,t){let n=t?e:e[0];Uh(n);let r=n.or,o=n.and;if(o){let i=t?o:o[0];if(Zn(i)&&"and"in i){let a=ba(o,t);e=a[0],r={...r,...a[1]}}else e=o}return[e,r]}function On(e,...t){let n=Sa();if(n){let r=n.handlers[e];if(r)return r(n,...t)}}function Se(e,t){let n=pi({or:t,and:typeof e=="string"?{name:e}:e}),r=(a,...s)=>(li(!Ct(r,"derived"),"call of derived event","createEvent"),li(!Js,"unit call from pure function","operators like sample"),qn?((l,u,c,f)=>{let v=qn,m=null;if(u)for(m=qn;m&&m.template!==u;)m=jr(m);Lh(m);let d=l.create(c,f);return Lh(v),d})(r,o,a,s):r.create(a,s)),o=Sa(),i=Object.assign(r,{graphite:Mn({meta:Zh("event",r,n),regional:1}),create:a=>(Fr({target:r,params:a,scope:Re}),a),watch:a=>Kh(r,a),map:a=>of(r,si,a,[mr()]),filter:a=>of(r,"filter",a.fn?a:a.fn,[mr(gf,1)]),filterMap:a=>of(r,"filterMap",a,[mr(),Kn(s=>!ln(s),1)]),prepend(a){let s=Se("* \\u2192 "+r.shortName,{parent:jr(r)});return On("eventPrepend",un(s)),mi(s,r,[mr()],"prepend",a),Qh(r,s),s}});return n!=null&&n.domain&&n.domain.hooks.event(i),i}function Ve(e,t){let n=pi(t),r=fi(e),o=Se({named:"updates",derived:1});On("storeBase",r);let i=r.id,a={subscribers:new Map,updates:o,defaultState:e,stateRef:r,getState(){let d,y=r;if(qn){let w=qn;for(;w&&!w.reg[i];)w=jr(w);w&&(d=w)}return!d&&Re&&(di(Re,r,1),d=Re),d&&(y=d.reg[i]),ga(y)},setState:d=>Fr({target:a,params:d,defer:1,scope:Re}),reset:(...d)=>($t(d,y=>a.on(y,()=>a.defaultState)),a),on:(d,y)=>(ci(d,".on","first argument"),qt(Gt(y),"second argument should be a function"),li(!Ct(a,"derived"),".on in derived store","createStore"),$t(Array.isArray(d)?d:[d],w=>{a.off(w),Qs(a).set(w,Sf(Ah(w,a,"on",lx,y)))}),a),off(d){let y=Qs(a).get(d);return y&&(y(),Qs(a).delete(d)),a},map(d,y){let w,g;Zn(d)&&(w=d,d=d.fn),li(ln(y),"second argument of store.map","updateFilter");let h=a.getState();Sa()?g=null:ln(h)||(g=d(h,y));let p=Ve(g,{name:`${a.shortName} \\u2192 *`,derived:1,and:w}),b=Ah(a,p,si,lf,d);return uf(_n(p),{type:si,fn:d,from:r}),_n(p).noInit=1,On("storeMap",r,b),p},watch(d,y){if(!y||!Eo(d)){let w=Kh(a,d);return On("storeWatch",r,d)||d(a.getState()),w}return qt(Gt(y),"second argument should be a function"),d.watch(w=>y(a.getState(),w))}},s=Zh("store",a,n),l=a.defaultConfig.updateFilter;a.graphite=Mn({scope:{state:r,fn:l},node:[Kn((d,y,w)=>(w.scope&&!w.scope.reg[r.id]&&(w.b=1),d)),ko(r),Kn((d,y,{a:w,b:g})=>!ln(d)&&(d!==w||g),1),l&&mr(lf,1),In({from:xo,target:r})],child:o,meta:s,regional:1});let u=Ct(a,"serialize"),c=Ct(a,"derived"),f=u==="ignore",v=!u||f?0:u,m=Ct(a,"sid");return m&&(f||wo(a,"storeChange",1),r.sid=m,v&&(r.meta={...r?.meta,serialize:v})),m||f||c||wo(a,"warnSerialize",1),qt(c||!ln(e),"current state can\'t be undefined, use null instead"),ui(a,[o]),n!=null&&n.domain&&n.domain.hooks.store(a),c||(a.reinit=Se(),a.reset(a.reinit)),a}function zr(...e){let t,n,r;[e,r]=ba(e);let o,i,a,s=e[e.length-1];if(Gt(s)?(n=e.slice(0,-1),t=s):n=e,n.length===1){let l=n[0];hr(l)||(o=l,i=1)}if(!i&&(o=n,t)){a=1;let l=t;t=u=>l(...u)}return qt(Zn(o),"shape should be an object"),hx(Array.isArray(o),!a,o,r,t)}function XS(){let e={};return e.req=new Promise((t,n)=>{e.rs=t,e.rj=n}),e.req.catch(()=>{}),e}function mf(e,t){let n=pi(Gt(e)?{handler:e}:e,t),r=Se(Gt(e)?{handler:e}:e,t),o=un(r);wo(o,"op",r.kind="effect"),r.use=m=>(qt(Gt(m),".use argument should be a function"),c.scope.handler=m,r),r.use.getCurrent=()=>c.scope.handler;let i=r.finally=Se({named:"finally",derived:1}),a=r.done=i.filterMap({named:"done",fn({status:m,params:d,result:y}){if(m==="done")return{params:d,result:y}}}),s=r.fail=i.filterMap({named:"fail",fn({status:m,params:d,error:y}){if(m==="fail")return{params:d,error:y}}}),l=r.doneData=a.map({named:"doneData",fn:({result:m})=>m}),u=r.failData=s.map({named:"failData",fn:({error:m})=>m}),c=Mn({scope:{handlerId:Ct(o,"sid"),handler:r.defaultConfig.handler||(()=>qt(0,`no handler used in ${r.getType()}`))},node:[Kn((m,d,y)=>{let w=d,g=w.handler;if(Ar(y)){let h=Ar(y).handlers[w.handlerId];h&&(g=h)}return m.handler=g,m},0,1),Kn(({params:m,req:d,handler:y,args:w=[m]},g,h)=>{let p=Jh(h),b=Xs(m,d,1,i,h,p),S=Xs(m,d,0,i,h,p),[x,E]=Yh(y,S,w);x&&(Zn(E)&&Gt(E.then)?E.then(b,S):b(E))},0,1)],meta:{op:"fx",fx:"runner"}});o.scope.runner=c,Gn(o.seq,Kn((m,{runner:d},y)=>{let w=jr(y)?{params:m,req:{rs(g){},rj(g){}}}:m;return Fr({target:d,params:w,defer:1,scope:Ar(y)}),w.params},0,1)),r.create=m=>{let d=XS(),y={params:m,req:d};if(Re){if(!Ys){let w=Re;d.req.finally(()=>{fx(w)}).catch(()=>{})}Fr({target:r,params:y,scope:Re})}else Fr(r,y);return d.req};let f=r.inFlight=Ve(0,{serialize:"ignore"}).on(r,m=>m+1).on(i,m=>m-1).map({fn:m=>m,named:"inFlight"});wo(i,"needFxCounter","dec"),wo(r,"needFxCounter",1);let v=r.pending=f.map({fn:m=>m>0,named:"pending"});return ui(r,[i,a,s,l,u,v,f]),n!=null&&n.domain&&n.domain.hooks.effect(r),r}function Dh(e){let t;[e,t]=ba(e,1);let{source:n,effect:r,mapParams:o}=e,i=mf(e,t);wo(i,"attached",1);let a,{runner:s}=un(i).scope,l=Kn((c,f,v)=>{let m,{params:d,req:y,handler:w}=c,g=i.finally,h=Jh(v),p=Xs(d,y,0,g,v,h),b=v.a,S=sf(w),x=1;if(o?[x,m]=Yh(o,p,[d,b]):m=n&&S?b:d,x){if(!S)return c.args=[b,m],1;Fr({target:w,params:{params:m,req:{rs:Xs(d,y,1,g,v,h),rj:p}},page:v.page,defer:1})}},1,1);if(n){let c;hr(n)?(c=n,ui(c,[i])):(c=zr(n),ui(i,[c])),a=[ko(_n(c)),l]}else a=[l];s.seq.splice(1,0,...a),i.use(r);let u=jr(r);return u&&(Object.assign(hf(i),zh(i.shortName,u)),i.defaultConfig.parent=u),Qh(r,i,"effect"),i}function ex(e,t){ci(e,"merge","first argument");let n=Se({name:jh(e,"merge"),derived:1,and:t});return mi(e,n,[],"merge"),n}function tx(e,t){let n=0;return $t(gx,r=>{r in e&&(qt(e[r]!=null,Xh(t,r)),n=1)}),n}function Qn(...e){let t,n,r,o,[[i,a,s],l]=ba(e),u=1;return ln(a)&&Zn(i)&&tx(i,"sample")&&(a=i.clock,s=i.fn,u=!i.greedy,o=i.filter,t=i.target,n=i.name,r=i.sid,i=i.source),yx("sample",a,i,o,t,s,n,l,u,1,0,r)}var nx=typeof Symbol<"u"&&Symbol.observable||"@@observable",si="map",xo="stack",un=e=>e.graphite||e,el=e=>e.family.owners,tl=e=>e.family.links,_n=e=>e.stateRef,va=e=>e.value,Qs=e=>e.subscribers,jr=e=>e.parent,Ar=e=>e.scope,Ct=(e,t)=>un(e).meta[t],wo=(e,t,n)=>un(e).meta[t]=n,hf=e=>e.compositeName,Eo=e=>(Gt(e)||Zn(e))&&"kind"in e,wa=e=>t=>Eo(t)&&t.kind===e,hr=wa("store"),rx=wa("event"),sf=wa("effect"),Bh=wa("domain"),ox=wa("scope"),Co={__proto__:null,unit:Eo,store:hr,event:rx,effect:sf,domain:Bh,scope:ox,attached:e=>sf(e)&&Ct(e,"attached")==1};var Zs=(e,t)=>{let n=e.indexOf(t);n!==-1&&e.splice(n,1)},Gn=(e,t)=>e.push(t),li=(e,t,n)=>!e&&console.error(`${t} is deprecated${n?`, use ${n} instead`:""}`),vf=()=>{let e=0;return()=>""+ ++e},ix=vf(),Hh=vf(),ax=vf(),So=null,Sa=()=>So&&So.template,sx=e=>(e&&So&&So.sidRoot&&(e=`${So.sidRoot}|${e}`),e);var ui=(e,t)=>{let n=un(e);$t(t,r=>{let o=un(r);n.family.type!=="domain"&&(o.family.type="crosslink"),Gn(el(o),n),Gn(tl(n),o)})},ha=(e=[])=>(Array.isArray(e)?e:[e]).flat().map(un),Zn=e=>typeof e=="object"&&e!==null,Gt=e=>typeof e=="function",ln=e=>e===void 0,Uh=e=>qt(Zn(e)||Gt(e),"expect first argument be an object"),Rh=(e,t,n,r)=>qt(!(!Zn(e)&&!Gt(e)||!("family"in e)&&!("graphite"in e)),`${t}: expect ${n} to be a unit (store, event or effect)${r}`),ci=(e,t,n)=>{Array.isArray(e)?$t(e,(r,o)=>Rh(r,t,`${o} item of ${n}`,"")):Rh(e,t,n," or array of units")},Vh=(e,t,n="target")=>$t(ha(t),r=>li(!Ct(r,"derived"),`${e}: derived unit in "${n}"`,"createEvent/createStore")),lf=(e,{fn:t},{a:n})=>t(e,n),lx=(e,{fn:t},{a:n})=>t(n,e),gf=(e,{fn:t})=>t(e),Wh=(e,t,n,r)=>{let o={id:Hh(),type:e,data:t};return n&&(o.order={priority:n},r&&(o.order.barrierID=++ux)),o},ux=0,In=({from:e="store",store:t,target:n,to:r=n?"store":xo,batch:o,priority:i})=>Wh("mov",{from:e,store:t,to:r,target:n},i,o),ya=({fn:e,batch:t,priority:n,safe:r=0,filter:o=0,pure:i=0})=>Wh("compute",{fn:e,safe:r,filter:o,pure:i},n,t),yf=({fn:e})=>ya({fn:e,priority:"effect"}),Kn=(e,t,n)=>ya({fn:e,safe:1,filter:t,priority:n&&"effect"}),ko=(e,t,n)=>In({store:e,to:t?xo:"a",priority:n&&"sampler",batch:1}),mr=(e=gf,t)=>ya({fn:e,pure:1,filter:t}),$h={mov:In,compute:ya,filter:({fn:e,pure:t})=>ya({fn:e,filter:1,pure:t}),run:yf},fi=e=>({id:Hh(),current:e}),ga=({current:e})=>e,uf=(e,t)=>{e.before||(e.before=[]),Gn(e.before,t)},ai=null,bf=(e,t)=>{if(!e)return t;if(!t)return e;let n;return(e.v.type===t.v.type&&e.v.id>t.v.id||ff(e.v.type)>ff(t.v.type))&&(n=e,e=t,t=n),n=bf(e.r,t),e.r=e.l,e.l=n,e},wf=[],Nh=0;for(;Nh<6;)Gn(wf,{first:null,last:null,size:0}),Nh+=1;var cx=()=>{for(let e=0;e<6;e++){let t=wf[e];if(t.size>0){if(e===3||e===4){t.size-=1;let r=ai.v;return ai=bf(ai.l,ai.r),r}t.size===1&&(t.last=null);let n=t.first;return t.first=n.r,t.size-=1,n.v}}},bo=(e,t,n,r,o,i)=>cf(0,{a:null,b:null,node:n,parent:r,value:o,page:t,scope:i},e),cf=(e,t,n,r=0)=>{let o=ff(n),i=wf[o],a={v:{idx:e,stack:t,type:n,id:r},l:null,r:null};o===3||o===4?ai=bf(ai,a):(i.size===0?i.first=a:i.last.r=a,i.last=a),i.size+=1},ff=e=>{switch(e){case"child":return 0;case"pure":return 1;case"read":return 2;case"barrier":return 3;case"sampler":return 4;case"effect":return 5;default:return-1}},rf=new Set,Re,Ks=1,Ys=0,Js=0,qn=null,fx=e=>{Re=e},Lh=e=>{qn=e},Gh=(e,t)=>{if(e){for(;e&&!e.reg[t];)e=jr(e);if(e)return e}return null},dx=(e,t,n,r,o)=>{let i=Gh(e,r.id);return i?i.reg[r.id]:t?(di(t,r,o),t.reg[r.id]):r},px=e=>e,di=(e,t,n,r,o)=>{var i;let a=e.reg,s=t.sid,l=t==null||(i=t.meta)===null||i===void 0?void 0:i.serialize;if(a[t.id])return;let u={id:t.id,current:t.current,meta:t.meta};if(s&&s in e.sidValuesMap&&!(s in e.sidIdMap))u.current=(e.fromSerialize&&l!=="ignore"&&l?.read||px)(e.sidValuesMap[s]);else if(t.before&&!o){let c=0,f=n||!t.noInit||r;$t(t.before,v=>{switch(v.type){case si:{let m=v.from;if(m||v.fn){m&&di(e,m,n,r);let d=m&&a[m.id].current;f&&(u.current=v.fn?v.fn(d):d)}break}case"field":c||(c=1,u.current=Array.isArray(u.current)?[...u.current]:{...u.current}),di(e,v.from,n,r),f&&(u.current[v.field]=a[a[v.from.id].id].current)}})}s&&(e.sidIdMap[s]=t.id),a[t.id]=u},mx=(e,t,n)=>{try{return t(va(n),e.scope,n)}catch(r){console.error(r),e.fail=1}},pi=(e,t={})=>(Zn(e)&&(pi(e.or,t),pf(e,(n,r)=>{ln(n)||r==="or"||r==="and"||(t[r]=n)}),pi(e.and,t)),t),Ph=(e,t)=>{Zs(e.next,t),Zs(el(e),t),Zs(tl(e),t)},df=(e,t,n)=>{let r;e.next.length=0,e.seq.length=0,e.scope=null;let o=tl(e);for(;r=o.pop();)Ph(r,e),(t||n&&Ct(e,"op")!=="sample"||r.family.type==="crosslink")&&df(r,t,Ct(r,"op")!=="on"&&n);for(o=el(e);r=o.pop();)Ph(r,e),n&&r.family.type==="crosslink"&&df(r,t,Ct(r,"op")!=="on"&&n)},ma=e=>e.clear(),nl=(e,{deep:t}={})=>{let n=0;if(e.ownerSet&&e.ownerSet.delete(e),hr(e))ma(Qs(e));else if(Bh(e)){n=1;let r=e.history;ma(r.events),ma(r.effects),ma(r.stores),ma(r.domains)}df(un(e),!!t,n)},Sf=e=>{let t=()=>nl(e);return t.unsubscribe=t,t},mi=(e,t,n,r,o)=>Mn({node:n,parent:e,child:t,scope:{fn:o},meta:{op:r},family:{owners:[e,t],links:t},regional:1}),qh=e=>{let t="forward",[{from:n,to:r},o]=ba(e,1);return ci(n,t,\'"from"\'),ci(r,t,\'"to"\'),Vh(t,r,"to"),Sf(Mn({parent:n,child:r,meta:{op:t,config:o},family:{},regional:1}))},Kh=(e,t)=>(qt(Gt(t),".watch argument should be a function"),Sf(Mn({scope:{fn:t},node:[yf({fn:gf})],parent:e,meta:{op:"watch"},family:{owners:e},regional:1}))),Qh=(e,t,n="event")=>{jr(e)&&jr(e).hooks[n](t)},Zh=(e,t,n)=>{let r=pi(n),o=e==="domain",i=ix(),{sid:a=null,named:s=null,domain:l=null,parent:u=l}=r,c=s||r.name||(o?"":i),f=zh(c,u),v={op:t.kind=e,name:t.shortName=c,sid:t.sid=sx(a),named:s,unitId:t.id=i,serialize:r.serialize,derived:r.derived,config:r};if(t.parent=u,t.compositeName=f,t.defaultConfig=r,t.thru=m=>(li(0,"thru","js pipe"),m(t)),t.getType=()=>f.fullName,!o){t.subscribe=d=>(Uh(d),t.watch(Gt(d)?d:y=>d.next&&d.next(y))),t[nx]=()=>t;let m=Sa();m&&(v.nativeTemplate=m)}return v},of=(e,t,n,r)=>{let o;Zn(n)&&(o=n,n=n.fn);let i=Se({name:`${e.shortName} \\u2192 *`,derived:1,and:o});return mi(e,i,r,t,n),i},Ah=(e,t,n,r,o)=>{let i=_n(t),a=In({store:i,to:"a",priority:"read"});n===si&&(a.data.softRead=1);let s=[a,mr(r)];return On("storeOnMap",i,s,hr(e)&&_n(e)),mi(e,t,s,n,o)},hx=(e,t,n,r,o)=>{let i=e?d=>[...d]:d=>({...d}),a=e?[]:{},s=i(a),l=fi(s),u=fi(1);l.type=e?"list":"shape",l.noInit=1,On("combineBase",l,u);let c=Ve(s,{name:jh(n),derived:1,and:r}),f=_n(c);f.noInit=1,wo(c,"isCombine",1);let v=ko(l);v.order={priority:"barrier"};let m=[Kn((d,y,w)=>(w.scope&&!w.scope.reg[l.id]&&(w.c=1),d)),v,In({store:u,to:"b"}),Kn((d,{key:y},w)=>{if(w.c||d!==w.a[y])return t&&w.b&&(w.a=i(w.a)),w.a[y]=d,1},1),In({from:"a",target:l}),In({from:"value",store:0,target:u}),In({from:"value",store:1,target:u,priority:"barrier",batch:1}),ko(l,1),o&&mr()];return pf(n,(d,y)=>{if(!hr(d))return qt(!Eo(d)&&!ln(d),`combine expects a store in a field ${y}`),void(s[y]=a[y]=d);a[y]=d.defaultState,s[y]=d.getState();let w=mi(d,c,m,"combine",o);w.scope.key=y;let g=_n(d);uf(l,{type:"field",field:y,from:g}),On("combineField",g,w)}),c.defaultShape=n,uf(f,{type:si,from:l,fn:o}),Sa()||(c.defaultState=o?f.current=o(s):a),c},Yh=(e,t,n)=>{try{return[1,e(...n)]}catch(r){return t(r),[0,null]}},Jh=e=>{let t=Ar(e),n={ref:t};return t&&Gn(t.activeEffects,n),n},Xs=(e,t,n,r,o,i)=>a=>{i.ref&&Zs(i.ref.activeEffects,i),Fr({target:[r,vx],params:[n?{status:"done",params:e,result:a}:{status:"fail",params:e,error:a},{value:a,fn:n?t.rs:t.rj}],defer:1,page:o.page,scope:i.ref})},vx=Mn({node:[yf({fn:({fn:e,value:t})=>e(t)})],meta:{op:"fx",fx:"sidechain"}}),gx=["source","clock","target"],Xh=(e,t)=>e+`: ${t} should be defined`,yx=(e,t,n,r,o,i,a,s,l,u,c,f)=>{let v=!!o;qt(!ln(n)||!ln(t),Xh(e,"either source or clock"));let m=0;ln(n)?m=1:Eo(n)||(n=zr(n)),ln(t)?t=n:(ci(t,e,"clock"),Array.isArray(t)&&(t=ex(t))),m&&(n=t),s||a||(a=n.shortName);let d="none";(c||r)&&(Eo(r)?d="unit":(qt(Gt(r),"`filter` should be function or unit"),d="fn")),o?(ci(o,e,"target"),Vh(e,o)):d==="none"&&u&&hr(n)&&hr(t)?o=Ve(i?i(ga(_n(n)),ga(_n(t))):ga(_n(n)),{name:a,sid:f,or:s}):(o=Se({name:a,derived:1,or:s}),On("sampleTarget",un(o)));let y=fi(),w=[];if(d==="unit"){let[b,S]=Fh(r,o,t,y,e);w=[...af(S),...af(b)]}let[g,h]=Fh(n,o,t,y,e),p=mi(t,o,[On("sampleSourceLoader"),In({from:xo,target:y}),...af(h),ko(g,1,l),...w,ko(y),d==="fn"&&mr((b,S,{a:x})=>r(b,x),1),i&&mr(lf),On("sampleSourceUpward",v)],e,i);return ui(n,[p]),Object.assign(p.meta,s,{joint:1}),o},af=e=>[ko(e),Kn((t,n,{a:r})=>r,1)],Fh=(e,t,n,r,o)=>{let i=hr(e),a=i?_n(e):fi(),s=fi(i);return i||Mn({parent:e,node:[In({from:xo,target:a}),In({from:"value",store:1,target:s})],family:{owners:[e,t,n],links:t},meta:{op:o},regional:1}),On("sampleSource",s,a,r),[a,s]};var c0=U(a0(),1),f0=U(Ef(),1);function l0(e,t,n,r){let o=[$h.run({fn:i=>t(i)})];if(r&&o.unshift(r),n){let i=Mn({node:o}),a=e.graphite.id,s=n.additionalLinks,l=s[a]||[];return s[a]=l,l.push(i),()=>{let u=l.indexOf(i);u!==-1&&l.splice(u,1),nl(i)}}{let i=Mn({node:o,parent:[e],family:{owners:e}});return()=>{nl(i)}}}function Fx(e,t){Co.store(e)||xa("expect useStore argument to be a store");let n=cn.default.useCallback(o=>l0(e,o,t),[e,t]),r=cn.default.useCallback(()=>d0(e,t),[e,t]);return zx(n,r,r)}function jx([e,t],n){let r,o,i,a,s=s0;t?(r=t,i=e,a=[]):{fn:r,store:i,keys:a,defaultValue:o,updateFilter:s=s0}=e,Co.store(i)||xa("useStoreMap expects a store"),Array.isArray(a)||xa("useStoreMap expects an array as keys"),typeof r!="function"&&xa("useStoreMap expects a function");let l=cn.default.useCallback(m=>l0(i,m,n),[i,n]),u=cn.default.useCallback(()=>d0(i,n),[i,n]),c=cn.default.useRef(),f=cn.default.useRef(),v=cn.default.useRef(a);return Dx(l,u,u,m=>{if(c.current!==m||!((d,y)=>{if(!d||!y||d.length!==y.length)return 0;let w=1;for(let g=0;g<d.length;g++)if(d[g]!==y[g]){w=0;break}return w})(v.current,a)){let d=r(m,a);d===void 0&&o!==void 0&&(d=o),c.current=m,v.current=a,d!==void 0&&(f.current=d)}return f.current},(m,d)=>!s(d,m))}function u0(e){let t=cn.default.useContext(p0);return e&&!t&&xa("No scope found, consider adding <Provider> to app root"),t}function Kt(e,t){return Fx(e,u0(t?.forceScope))}function Dr(e,t){return jx([e,t],u0(e?.forceScope))}var xa=e=>{throw Error(e)},{useSyncExternalStore:zx}=f0.default,{useSyncExternalStoreWithSelector:Dx}=c0.default,d0=(e,t)=>t?t.getState(e):e.getState(),s0=(e,t)=>e!==t,p0=cn.default.createContext(null),{Provider:PI}=p0,AI=typeof window<"u"?cn.default.useLayoutEffect:cn.default.useEffect;var $n=U(Y()),_S=U(jp());var lt=U(Y()),qE=U(j1());function Bp(){return Bp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Bp.apply(this,arguments)}var D1=["shift","alt","meta","mod"],KE={esc:"escape",return:"enter",".":"period",",":"comma","-":"slash"," ":"space","#":"backslash","+":"bracketright",ShiftLeft:"shift",ShiftRight:"shift",AltLeft:"alt",AltRight:"alt",MetaLeft:"meta",MetaRight:"meta",ControlLeft:"ctrl",ControlRight:"ctrl"};function so(e){return(KE[e]||e).trim().toLowerCase().replace("key","").replace("digit","").replace("numpad","").replace("arrow","")}function QE(e){return D1.includes(e)}function zp(e,t){return t===void 0&&(t=","),typeof e=="string"?e.split(t):e}function Dp(e,t){t===void 0&&(t="+");var n=e.toLocaleLowerCase().split(t).map(function(i){return so(i)}),r={alt:n.includes("alt"),shift:n.includes("shift"),meta:n.includes("meta"),mod:n.includes("mod")},o=n.filter(function(i){return!D1.includes(i)});return Bp({},r,{keys:o})}var lo=new Set;function ms(e,t){t===void 0&&(t=",");var n=Array.isArray(e)?e:e.split(t);return n.every(function(r){return lo.has(r.trim().toLowerCase())})}function B1(e){var t=Array.isArray(e)?e:[e];lo.has("meta")&&lo.forEach(function(n){return!QE(n)&&lo.delete(n.toLowerCase())}),t.forEach(function(n){return lo.add(n.toLowerCase())})}function H1(e){var t=Array.isArray(e)?e:[e];e==="meta"?lo.clear():t.forEach(function(n){return lo.delete(n.toLowerCase())})}(function(){typeof document<"u"&&(document.addEventListener("keydown",function(e){e.key!==void 0&&B1([so(e.key),so(e.code)])}),document.addEventListener("keyup",function(e){e.key!==void 0&&H1([so(e.key),so(e.code)])})),typeof window<"u"&&window.addEventListener("blur",function(){lo.clear()})})();function ZE(e,t,n){(typeof n=="function"&&n(e,t)||n===!0)&&e.preventDefault()}function YE(e,t,n){return typeof n=="function"?n(e,t):n===!0||n===void 0}function JE(e){return U1(e,["input","textarea","select"])}function U1(e,t){var n=e.target;t===void 0&&(t=!1);var r=n&&n.tagName;return t instanceof Array?Boolean(r&&t&&t.some(function(o){return o.toLowerCase()===r.toLowerCase()})):Boolean(r&&t&&t===!0)}function XE(e,t){return e.length===0&&t?(console.warn(\'A hotkey has the "scopes" option set, however no active scopes were found. If you want to use the global scopes feature, you need to wrap your app in a <HotkeysProvider>\'),!0):t?e.some(function(n){return t.includes(n)})||e.includes("*"):!0}var ek=function(t,n,r){r===void 0&&(r=!1);var o=n.alt,i=n.meta,a=n.mod,s=n.shift,l=n.keys,u=t.key,c=t.code,f=ms("alt"),v=ms("shift"),m=ms("meta"),d=ms("ctrl"),y=so(c),w=u.toLowerCase();if(!r){if(f!==o&&w!=="alt"||v!==s&&w!=="shift")return!1;if(a){if(!m&&!d)return!1}else if(m!==i&&d!==i&&y!=="meta"&&y!=="ctrl")return!1}return l&&l.length===1&&(l.includes(w)||l.includes(y))?!0:l?ms(l):!l},tk=(0,lt.createContext)(void 0),nk=function(){return(0,lt.useContext)(tk)};function V1(e,t){return e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(e).length===Object.keys(t).length&&Object.keys(e).reduce(function(n,r){return n&&V1(e[r],t[r])},!0):e===t}var rk=(0,lt.createContext)({hotkeys:[],enabledScopes:[],toggleScope:function(){},enableScope:function(){},disableScope:function(){}}),ok=function(){return(0,lt.useContext)(rk)};function ik(e){var t=(0,lt.useRef)(void 0);return V1(t.current,e)||(t.current=e),t.current}var z1=function(t){t.stopPropagation(),t.preventDefault(),t.stopImmediatePropagation()},ak=typeof window<"u"?lt.useLayoutEffect:lt.useEffect;function rr(e,t,n,r){var o=(0,lt.useRef)(null),i=(0,lt.useRef)(!1),a=n instanceof Array?r instanceof Array?void 0:r:n,s=n instanceof Array?n:r instanceof Array?r:[],l=(0,lt.useCallback)(t,[].concat(s)),u=ik(a),c=ok(),f=c.enabledScopes,v=nk();return ak(function(){if(!(u?.enabled===!1||!XE(f,u?.scopes))){var m=function(g,h){var p;if(h===void 0&&(h=!1),!(JE(g)&&!U1(g,u?.enableOnFormTags))){if(o.current!==null&&document.activeElement!==o.current&&!o.current.contains(document.activeElement)){z1(g);return}(p=g.target)!=null&&p.isContentEditable&&!(u!=null&&u.enableOnContentEditable)||zp(e,u?.splitKey).forEach(function(b){var S,x=Dp(b,u?.combinationKey);if((ek(g,x,u?.ignoreModifiers)||(S=x.keys)!=null&&S.includes("*"))&&!i.current){if(ZE(g,x,u?.preventDefault),!YE(g,x,u?.enabled)){z1(g);return}l(g,x),h||(i.current=!0)}})}},d=function(g){g.key!==void 0&&(B1(so(g.code)),(u?.keydown===void 0&&u?.keyup!==!0||u!=null&&u.keydown)&&m(g))},y=function(g){g.key!==void 0&&(H1(so(g.code)),i.current=!1,u!=null&&u.keyup&&m(g,!0))};return(o.current||a?.document||document).addEventListener("keyup",y),(o.current||a?.document||document).addEventListener("keydown",d),v&&zp(e,u?.splitKey).forEach(function(w){return v.addHotkey(Dp(w,u?.combinationKey))}),function(){(o.current||a?.document||document).removeEventListener("keyup",y),(o.current||a?.document||document).removeEventListener("keydown",d),v&&zp(e,u?.splitKey).forEach(function(w){return v.removeHotkey(Dp(w,u?.combinationKey))})}}},[e,l,u,f]),o}function W1(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=W1(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function sk(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=W1(e))&&(r&&(r+=" "),r+=t);return r}var or=sk;var Hp=U(Y()),lk=e=>Hp.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},Hp.createElement("path",{d:"M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 11 L 12 21 L 14 21 L 14 11 Z M 18 11 L 18 21 L 20 21 L 20 11 Z"})),$1=lk;var Up=U(Y()),uk=e=>Up.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},Up.createElement("path",{d:"M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 12 9.125 L 12 22.875 L 13.5 22 L 22.5 16.875 L 24 16 L 22.5 15.125 L 13.5 10 Z M 14 12.5625 L 19.96875 16 L 14 19.4375 Z"})),G1=uk;var Vp=U(Y()),ck=e=>Vp.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},Vp.createElement("path",{d:"M 14 4 C 13.476563 4 12.941406 4.183594 12.5625 4.5625 C 12.183594 4.941406 12 5.476563 12 6 L 12 7 L 5 7 L 5 9 L 6.09375 9 L 8 27.09375 L 8.09375 28 L 23.90625 28 L 24 27.09375 L 25.90625 9 L 27 9 L 27 7 L 20 7 L 20 6 C 20 5.476563 19.816406 4.941406 19.4375 4.5625 C 19.058594 4.183594 18.523438 4 18 4 Z M 14 6 L 18 6 L 18 7 L 14 7 Z M 8.125 9 L 23.875 9 L 22.09375 26 L 9.90625 26 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 15 12 L 15 23 L 17 23 L 17 12 Z M 18 12 L 18 23 L 20 23 L 20 12 Z"})),q1=ck;var bn=U(Y());function K1(e){var{source:t,timeout:n,target:r}=e;if(!Co.unit(t))throw new TypeError("source must be unit from effector");if(Co.domain(t,{sid:"jne2ft"}))throw new TypeError("source cannot be domain");var o=fk(n),i=Se({name:"saveTimeoutId",sid:"eqtrwk"}),a=Ve(null,{and:{serialize:"ignore"},name:"$timeoutId",sid:"-5hlcyp"}).on(i,(v,m)=>m),s=Se({name:"saveReject",sid:"-m6vk0"}),l=Ve(null,{and:{serialize:"ignore"},name:"$rejecter",sid:"tqvf32"}).on(s,(v,m)=>m),u=r??Se({name:"tick",sid:"-6wklwe"}),c=mf(v=>{var{parameter:m,timeout:d,timeoutId:y,rejectPromise:w}=v;return y&&clearTimeout(y),w&&w(),new Promise((g,h)=>{s(h),i(setTimeout(g,d,m))})},{name:"timerBaseFx",sid:"-xd98qa"}),f=Dh({and:{source:{timeoutId:a,rejectPromise:l},mapParams:(v,m)=>{var{parameter:d,timeout:y}=v,{timeoutId:w,rejectPromise:g}=m;return{parameter:d,timeout:y,timeoutId:w,rejectPromise:g}},effect:c},or:{name:"timerFx",sid:"-4ab544"}});return l.reset(f.done),a.reset(f.done),Qn({and:[{source:o,clock:t,fn:(v,m)=>({timeout:v,parameter:m}),target:f}],or:{sid:"m29k3f"}}),qh({and:{from:f.done.map(v=>{var{result:m}=v;return m}),to:u},or:{sid:"-32ktwy"}}),u}function fk(e){if(Co.store(e,{sid:"-2xmoh9"}))return e;if(typeof e=="number"){if(e<0||!Number.isFinite(e))throw new Error(\'timeout must be positive number or zero. Received: "\'.concat(e,\'"\'));return Ve(e,{and:{name:"$timeout"},sid:"-757cx6"})}throw new TypeError(\'timeout parameter in interval method should be number or Store. "\'.concat(typeof e,\'" was passed\'))}function ku(e){return e&&e.Math===Math&&e}var _t=ku(typeof globalThis=="object"&&globalThis)||ku(typeof window=="object"&&window)||ku(typeof self=="object"&&self)||ku(typeof global=="object"&&global)||function(){return this}()||Function("return this")(),Q1=_t.top||_t,$i=_t.parent||_t,Wp=_t.opener||null;var Tr=class{value;handler=null;constructor(t){this.value=t}set(t){Object.is(this.value,t)||(this.value=t,this.apply())}get(){return this.value}on(t,n){let r=this.handler;for(;r!==null;)r.fn===t&&r.context===n&&console.warn("ReactiveValue#on: duplicate fn & context pair"),r=r.handler;this.handler={fn:t,context:n,handler:this.handler}}link(t,n){this.on(t,n),t.call(n,this.value)}off(t,n){let r=this.handler,o=this;for(;r!==null;){if(r.fn===t&&r.context===n){r.fn=function(){},o.handler=r.handler;return}o=r,r=r.handler}console.warn("ReactiveValue#off: fn & context pair not found, nothing was removed")}apply(){let t=this.handler;for(;t!==null;)t.fn.call(t.context,this.value),t=t.handler}};function Z1(e,t){let n=[...new Set(Array.isArray(t)?t:[])];return n.length!==e.length||n.some(o=>!e.includes(o))?n:e}var uo=class extends Tr{constructor(t){super(Z1([],t))}set(t){super.set(Z1(this.value,t))}};var Gi=class extends uo{endpointLists=new Set;constructor(){super([])}set(){super.set([].concat(...[...this.endpointLists].map(t=>t.value)))}add(t){this.endpointLists.has(t)||(this.endpointLists.add(t),t.on(this.set,this),this.set())}remove(t){this.endpointLists.has(t)&&(this.endpointLists.delete(t),t.off(this.set,this),this.set())}};var $p=_t.trustedTypes?.emptyHTML;function qi(e){function t(r){return Math.round(r).toString(36)}let n=t(10+25*Math.random());for(e||(e=16);n.length<e;)n+=t(Date.now()*Math.random());return n.substr(0,e)}function hs(e,t){return e.push(t),()=>{let n=e.indexOf(t);n!==-1&&e.splice(n,1)}}var Cu="[rempl][event-transport] ",Tu=[],ir=class{static get(t,n,r){return r||(r=_t),Tu.find(i=>i.name===t&&i.connectTo===n&&i.realm===r)||new ir(t,n,r)}name;connectTo;realm;inputChannelId;connections=new Map;connected=new Tr(!1);endpointGetUI=new Map;ownEndpoints=new uo;remoteEndpoints=new Gi;initCallbacks=[];dataCallbacks=[];sendCallbacks=new Map;inited=!1;constructor(t,n,r){if(Tu.length===0&&typeof addEventListener=="function"&&addEventListener("message",o=>{for(let i of Tu)i._onMessage(o)},!1),Tu.push(this),this.name=t,this.connectTo=n,this.inputChannelId=`${t}/${qi()}`,this.realm=r||_t,this.ownEndpoints.on(o=>{this.connected.value&&this.send({type:"endpoints",data:[o]})}),typeof this.realm.postMessage!="function"||typeof addEventListener!="function"){console.warn(Cu+"Event (postMessage) transport isn\'t supported");return}this._handshake(!1)}_handshake(t){this._send(`${this.connectTo}:connect`,{type:"handshake",initiator:this.name,inited:t,endpoints:this.ownEndpoints.value})}_onMessage(t){if(t.source!==this.realm||t.target!==_t)return;let n=t.data||{},r=`${this.name}:connect`;switch(n.to){case r:n.payload?.initiator===this.connectTo&&this._onConnect(n.from,n.payload);break;case this.inputChannelId:this.connections.has(n.from)?this._onData(n.from,n.payload):console.warn(Cu+"unknown incoming connection",n.from);break}}_onConnect(t,n){if(n.inited||this._handshake(!0),!this.connections.has(t)){let r=new uo(n.endpoints);this.remoteEndpoints.add(r),this.connections.set(t,{ttl:Date.now(),endpoints:r}),this._send(t,{type:"connect",endpoints:this.ownEndpoints.value})}this.inited=!0}_onData(t,n){switch(n.type){case"connect":{this.connections.get(t)?.endpoints.set(n.endpoints),this.connected.set(!0),this.initCallbacks.splice(0).forEach(r=>this.onInit(...r));break}case"endpoints":{this.connections.get(t)?.endpoints.set(n.data[0]);break}case"disconnect":{this.connections.get(t)?.endpoints.set([]),this.connected.set(!1);break}case"callback":{if(n.callback){let r=this.sendCallbacks.get(n.callback);typeof r=="function"&&(r(...n.data),this.sendCallbacks.delete(n.callback))}break}case"data":{let r=n.data,o=n.callback;o&&(r=r.concat(this._wrapCallback(t,o)));for(let{endpoint:i,fn:a}of this.dataCallbacks)i===n.endpoint&&a(...r);break}case"getRemoteUI":{if(!n.endpoint)return;let r=this.endpointGetUI.get(n.endpoint);if(typeof r!="function")console.warn(Cu+"receive unknown endpoint for getRemoteUI(): "+n.endpoint),n.callback&&this._wrapCallback(t,n.callback)("Wrong endpoint \\u2013 "+n.endpoint);else if(n.callback){let o=this._wrapCallback(t,n.callback);r(n.data[0]||{}).catch(i=>({error:String(i?.message)})).then(i=>{"error"in i?o(i.error):o(null,i.type,i.value)})}break}default:console.warn(Cu+"Unknown message type `"+n.type+"` for `"+this.name+"`",n)}}_wrapCallback(t,n){return(...r)=>this._send(t,{type:"callback",callback:n,data:r})}_send(t,n){if(typeof this.realm.postMessage=="function"){let r={from:this.inputChannelId,to:t,payload:n};this.realm.postMessage(r,"*")}}subscribeToEndpoint(t,n){return hs(this.dataCallbacks,{endpoint:t,fn:n})}sendToEndpoint(t,n,...r){let o=null;r.length&&typeof r[r.length-1]=="function"&&(o=qi(),this.sendCallbacks.set(o,r.pop())),this.send({type:n,endpoint:t,data:r,callback:o})}send(t){for(let n of this.connections.keys())this._send(n,t)}onInit(t,n){let r=t.id||null;return r&&(this.ownEndpoints.set(this.ownEndpoints.value.concat(r)),typeof t.getRemoteUI=="function"&&this.endpointGetUI.set(r,t.getRemoteUI)),this.inited?n({connected:this.connected,subscribe:this.subscribeToEndpoint.bind(this,r),getRemoteUI:this.sendToEndpoint.bind(this,r,"getRemoteUI"),send:this.sendToEndpoint.bind(this,r,"data")}):this.initCallbacks.push([t,n]),this}sync(t){let n=qi(8)+":"+this.connectTo;return this.onInit(t,r=>{r.subscribe(t.processInput.bind(t)),r.connected.link(o=>{t.setupChannel(n,r.send,this.remoteEndpoints,o)})}),this}};var Ir=class{name;owner;methods=Object.create(null);remoteMethodWrappers=Object.create(null);remoteMethods=[];listeners=null;constructor(t,n){this.name=t,this.owner=n,this.methods=Object.create(null)}isMethodProvided(t){return t in this.methods}provide(t,n){if(typeof t=="string")typeof n=="function"&&(this.methods[t]=n,this.owner.scheduleProvidedMethodsUpdate());else{let r=t;for(let[o,i]of Object.entries(r))typeof i=="function"&&(this.methods[o]=i,this.owner.scheduleProvidedMethodsUpdate())}}revoke(t){Array.isArray(t)?t.forEach(this.revoke,this):this.isMethodProvided(t)&&(delete this.methods[t],this.owner.scheduleProvidedMethodsUpdate())}isRemoteMethodExists(t){return this.remoteMethods.includes(t)}callRemote(t,...n){let r=null;return n.length&&typeof n[n.length-1]=="function"&&(r=n.pop(),console.warn("[rempl] Using a callback for Namespace#callMethod() is deprecated, use returned promise value instead")),new Promise(o=>{let i={type:"call",ns:this.name,method:t,args:n};this.owner.send(i,(...a)=>{o(a[0]),r?.(...a)})})}getRemoteMethod(t){let n=this.remoteMethodWrappers[t];return typeof n!="function"&&(n=this.remoteMethodWrappers[t]=Object.assign((...r)=>n.available?this.callRemote(t,...r):Promise.reject(new Error(`[rempl] ${this.owner.getName()} ns("${this.name}") has no available remote method "${t}`)),{available:this.remoteMethods.indexOf(t)!==-1})),n}onRemoteMethodsChanged(t){let n={event:"remoteMethodsChanged",callback:t,listeners:this.listeners};return this.listeners=n,t([...this.remoteMethods]),()=>{let r=this.listeners,o=this;for(;r!==null;){if(r===n){o.listeners=r.listeners;break}o=r,r=r.listeners}}}static invoke(t,n,r,o){let i=!1;r=r.concat((...a)=>{i=!0,o(...a),console.warn("[rempl] Using a callback in provided methods has been deprecated, just return a value or promise instead")}),Promise.resolve(t.methods[n].apply(null,r)).then(a=>{i||o(a)})}static notifyRemoteMethodsChanged(t){let n=t.listeners;for(let r in t.remoteMethodWrappers)t.remoteMethodWrappers[r].available=t.remoteMethods.includes(r);for(;n!==null;)n.event==="remoteMethodsChanged"&&n.callback.call(null,[...t.remoteMethods]),n=n.listeners}};var vs=class{id;namespaces;get namespaceClass(){return Ir}type="Endpoint";channels=[];connected=new Tr(!1);remoteEndpoints=new Gi;providedMethodsUpdateTimer;constructor(t){this.id=t||null,this.namespaces=Object.create(null),this.remoteEndpoints.on(n=>{this.connected.set(n.includes(this.id||"*"))},this)}getName(){return this.type+(this.id?"#"+this.id:"")}ns(t){let n=this.namespaces[t];return n||(n=Object.assign(new this.namespaceClass(t,this)),this.namespaces[t]=n),n}send(t,n=null){for(let{send:r}of this.channels)r(t,n)}requestRemoteApi(){this.send({type:"getProvidedMethods"},t=>{this.setRemoteApi(t)})}setRemoteApi(t){let n=[];t||(t={});for(let r in t)if(Array.isArray(t[r])){let o=this.ns(r),i=t[r].slice().sort();(o.remoteMethods.length!==i.length||o.remoteMethods.some(function(s,l){return s!==i[l]}))&&(o.remoteMethods=i,n.push(o))}for(let r in this.namespaces)if(Array.isArray(t[r])===!1){let o=this.namespaces[r];o.remoteMethods=[],n.push(o)}n.forEach(r=>Ir.notifyRemoteMethodsChanged(r))}getProvidedApi(){let t=Object.create(null);for(let n in this.namespaces)t[n]=Object.keys(this.namespaces[n].methods).sort();return t}scheduleProvidedMethodsUpdate(){this.providedMethodsUpdateTimer||(this.providedMethodsUpdateTimer=setTimeout(()=>{this.providedMethodsUpdateTimer=null,this.send({type:"remoteMethods",methods:this.getProvidedApi()})},0))}processInput(t,n){switch(t.type){case"call":{let r=t,o=this.ns(r.ns||"*");if(!o.isMethodProvided(r.method))return console.warn(`[rempl][sync] ${this.getName()} (namespace: ${r.ns||"default"}) has no remote method:`,r.method);Ir.invoke(o,r.method,r.args,n);break}case"remoteMethods":{let r=t;this.setRemoteApi(r.methods);break}case"getProvidedMethods":n(this.getProvidedApi());break;default:console.warn("[rempl][sync] "+this.getName()+"Unknown packet type:",t.type)}}setupChannel(t,n,r,o){if(o)this.channels.push({type:t,send:n}),this.remoteEndpoints.add(r);else for(let i=0;i<this.channels.length;i++)if(this.channels[i].type===t&&this.channels[i].send===n){this.remoteEndpoints.remove(r),this.channels.splice(i,1);break}}};var Iu=new Map,Gp=class extends Ir{constructor(t,n){super(t,n),Iu.set(this,[])}subscribe(t){return this.callRemote("init").then(t),hs(Iu.get(this)||[],t)}},gs=class extends vs{type="Subscriber";get namespaceClass(){return Gp}constructor(t){super(t),this.connected.on(n=>{if(n){this.requestRemoteApi();for(let r in this.namespaces){let o=this.namespaces[r],i=Iu.get(o)||[];i.length&&o.callRemote("init").then(a=>{for(let s of i)s(a)})}}else this.setRemoteApi()})}processInput(t,n){switch(t.type){case"data":{let{ns:r,payload:o}=t,i=Iu.get(this.ns(r||"*"));i&&i.slice().forEach(a=>a(o));break}default:super.processInput(t,n)}}};var pk=new WeakMap;$i!==_t&&addEventListener("message",function(e){let t=e.data||{};e.source&&t.to==="rempl-env-publisher:connect"&&pk.set(e.source,t)},!0);var Y1=`@keyframes fade-in{0%{opacity:0}50%{opacity:0;backdrop-filter:blur(0) grayscale(0)}to{opacity:1}}@keyframes dot-blink{50%{opacity:1}}:host{position:fixed;z-index:10000000;inset:0;text-align:center;font:12px arial;transition:opacity .5s;background:#fffe;animation-name:fade-in;animation-duration:1s;animation-iteration-count:1;animation-direction:normal}@supports (backdrop-filter: blur(1px)){:host{background:#fff8;backdrop-filter:blur(5px) grayscale(.8)}}:host:before{content:"Publisher connection is lost";margin:30px 0 5px;display:inline-block;padding:4px}.dot{background-color:#5096fa;display:inline-block;vertical-align:middle;height:6px;width:6px;margin:3px;opacity:0;animation-name:dot-blink;animation-duration:.65s;animation-iteration-count:infinite;animation-direction:normal;border-radius:50%}.dot:nth-child(1){animation-delay:.1s}.dot:nth-child(2){animation-delay:.175s}.dot:nth-child(3){animation-delay:.25s}\n`;var Ki=null;function hk(){if(Ki===null){Ki=document.createElement("div");let e=Ki.attachShadow({mode:"closed"}),t=document.createElement("style"),n=document.createElement("div");t.textContent=Y1,n.append(...Array.from({length:3},()=>{let r=document.createElement("div");return r.className="dot",r})),e.append(t,n)}return Ki}function qp(e){e&&typeof document<"u"?document.body.append(hk()):Ki&&Ki.remove()}var ar=null;function vk(){ar=new gs;let e=Object.assign(ar.connected,{defaultOverlay:!0});return e.link(t=>{t?qp(!1):e.defaultOverlay&&qp(!0)}),ir.get("rempl-subscriber","rempl-sandbox",Wp||$i).sync(ar),ar}function Kp(){return ar===null&&(ar=vk()),Object.assign(ar.ns("*"),{connected:ar.connected,ns:ar.ns.bind(ar)})}var Ho=Kp();var J1={enabled:!1,expanded:!1,zoom:1,query:""};var X1=e=>{if(!e)return()=>!0;let t=new RegExp(e.replace(/[/\\-\\\\^$*+?.()[\\]{}]/g,"\\\\$&"),"i");return n=>t.test(n)};var Dn=Ve({...J1,subscriptions:[]}),ey=Dn.map(e=>e.zoom),ty=Dn.map(e=>e.enabled),ny=Dn.map(e=>e.expanded),ry=Dn.map(e=>e.subscriptions),Ou=Dn.map(e=>e.query),Qp=Ou.map(e=>X1(e)),oy=Se(),Zp=Se(),Qi=Se(),Yp=Se(),Jp=Se();Dn.on(oy,(e,t)=>t);Dn.on(Jp,(e,t)=>({...e,query:t}));Dn.on(Zp,(e,t)=>({...e,expanded:t}));Dn.on(Yp,e=>({...e,enabled:!e.enabled}));Dn.on(Qi,(e,t)=>({...e,zoom:t}));Dn.watch(({subscriptions:e,...t})=>{Ho.callRemote("setState",t)});Ho.ns("state").subscribe(oy);var _u=Ve(""),Mu=Se();_u.on(Mu,(e,t)=>t);K1({source:Mu,timeout:60,target:Jp});Qn({source:Ou,target:_u});var iy=Ve([]),yn=Ve({}),gk=Ve({}),Uo=Ve([]),ay=Qn({clock:Ou,source:zr([yn,Uo,iy,Qp]),fn:([e,t,n,r])=>{let o=[],i=[];return Object.values(e).map(a=>a.id).forEach(a=>{r(e[a].name)?o.push(a):i.push(a)}),{passed:o,notPassed:i}}});Qn({clock:ay,fn:e=>e.passed,target:Uo});Qn({clock:ay,fn:e=>e.notPassed,target:iy});var Ru=Se(),Vo=Se();yn.on(Ru,(e,t)=>t?(t.payload&&t.payload.length>200&&(t.payloadShort=t.payload.slice(0,200)+"\\u2026"),{...e,[t.id]:{...t,index:e.length}}):e).reset(Vo);gk.on(Ru,(e,t)=>!t||t.kind!=="store"||t.op!=="unit-watch"||!t.payload?e:{...e,[t.name]:[...e[t.name]||[],[t.id,JSON.parse(t.payload)]]}).reset(Vo);Qn({clock:Ru,source:zr([Uo,Qp]),fn:([e,t],n)=>!n||!t(n.name)?e:[...e,n.id],target:Uo});Uo.reset(Vo);Ho.subscribe(()=>{Ho.callRemote("isReady")});Ho.ns("logs").subscribe(Ru);var sy=U(Y()),Nu=({children:e})=>sy.default.createElement("div",{className:"ed-toolbar"},e);var ly=()=>{let e=Kt(ty),t=Kt(ry),n=Kt(_u);return bn.default.createElement(Nu,null,bn.default.createElement("a",{className:or("ed-btn",e?"ed-btn-enabled":"ed-btn-disabled"),onClick:()=>Yp()},e?bn.default.createElement($1,null):bn.default.createElement(G1,null)),bn.default.createElement("a",{className:"ed-btn",onClick:()=>Vo()},bn.default.createElement(q1,null)),bn.default.createElement("div",{className:"ed-toolbar-separator"}),bn.default.createElement("div",{className:"ed-toolbar-input"},bn.default.createElement("input",{placeholder:"Filter",value:n,onChange:r=>Mu(r.target.value)})),bn.default.createElement("div",{className:"ed-toolbar-space"}),bn.default.createElement("div",{className:"ed-toolbar-text",title:t.join(`\n`)},"Subscriptions: ",t.length))};var Lu=Ve(!1),Xp=Se();Lu.on(Xp,(e,t)=>t).reset(Vo);var em=Ve("preview"),tm=Se();em.on(tm,(e,t)=>t);var uy=Qn({source:zr([yn,Lu]),fn:([e,t])=>t?e[t]:null});var oi=U(Y());var lr=U(Y());var wn=U(Y());var cy=()=>{let{setHotkeysActive:e}=(0,wn.useContext)(Ze),[t,n]=(0,wn.useState)(!1),[r,o]=(0,wn.useState)(""),i=Kt(uy);(0,wn.useEffect)(()=>{n(!1)},[n,i]);let a=Dr({store:yn,keys:[i?.name],fn:(s,[l])=>{let u=Object.values(s).reduce((c,f)=>(f.name===l&&c.push(f),c),[]);return u.sort((c,f)=>f.index-c.index),u.map(c=>c.id)}});return wn.default.createElement("div",{className:"ed-details-body-history"},wn.default.createElement(Wo.Provider,{value:a},wn.default.createElement(Ze.Provider,{value:{selected:t,setSelected:n,selectedTab:r,setSelectedTab:o,hotkeysActive:!0,parentSetHotkeysActive:e,showHistory:!1}},wn.default.createElement(Pu,null))))};var _y=U(Oy(),1);var fm=_y.default;function My(e){let t={className:"attr",begin:/"(\\\\.|[^\\\\"\\r\\n])*"(?=\\s*:)/,relevance:1.01},n={match:/[{}[\\],:]/,className:"punctuation",relevance:0},r=["true","false","null"],o={scope:"literal",beginKeywords:r.join(" ")};return{name:"JSON",keywords:{literal:r},contains:[t,n,e.QUOTE_STRING_MODE,o,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\\\S"}}var bt=U(Y());var Ry=U(Y()),Du=()=>Ry.default.createElement("i",null,"No Data");fm.registerLanguage("json",My);var lC=({data:e,indent:t})=>{if(!e)return null;let[n,r]=(0,bt.useState)(""),[o,i]=(0,bt.useTransition)();return(0,bt.useEffect)(()=>{i(()=>{let a=t?JSON.stringify(JSON.parse(e),null,2):e,s=fm.highlight(a,{language:"json"}).value;r(s)})},[e]),bt.default.createElement("div",null,bt.default.createElement("pre",null,(!n||o)&&bt.default.createElement("code",null,"Rendering.."),n&&bt.default.createElement("code",{dangerouslySetInnerHTML:{__html:n}})))},Ny=({preview:e=!1})=>{let{selected:t}=(0,bt.useContext)(Ze),n=Dr({store:yn,keys:[t],fn:(r,[o])=>r[o]});return n?bt.default.createElement("div",{className:or("ed-details-body-code",{"ed-details-body-code-raw":!e})},n.payload?bt.default.createElement(lC,{data:n.payload,indent:e}):bt.default.createElement(Du,null)):null};var dm=U(Y()),uC=e=>dm.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},dm.createElement("path",{d:"M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 11 15 L 11 17 L 21 17 L 21 15 Z"})),Ly=uC;var pm=U(Y()),cC=e=>pm.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},pm.createElement("path",{d:"M 5 5 L 5 27 L 27 27 L 27 5 Z M 7 7 L 25 7 L 25 25 L 7 25 Z M 15 11 L 15 15 L 11 15 L 11 17 L 15 17 L 15 21 L 17 21 L 17 17 L 21 17 L 21 15 L 17 15 L 17 11 Z"})),Py=cC;var _e=U(Y());function ge(){return ge=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ge.apply(this,arguments)}function mm(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function Or(e,t){if(e==null)return{};var n=mm(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}function qo(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Dt(e){return Dt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Dt(e)}function hm(e,t){if(Dt(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(Dt(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function xs(e){var t=hm(e,"string");return Dt(t)==="symbol"?t:String(t)}function Ay(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,xs(r.key),r)}}function Ko(e,t,n){return t&&Ay(e.prototype,t),n&&Ay(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function Es(e,t){return Es=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,o){return r.__proto__=o,r},Es(e,t)}function Qo(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Es(e,t)}function Zo(e){if(e===void 0)throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");return e}function Yo(e,t){if(t&&(Dt(t)==="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Zo(e)}function Sn(e){return Sn=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},Sn(e)}function Ye(e,t,n){return t=xs(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function vm(e){if(Array.isArray(e))return e}function gm(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r,o,i,a,s=[],l=!0,u=!1;try{if(i=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=i.call(n)).done)&&(s.push(r.value),s.length!==t);l=!0);}catch(c){u=!0,o=c}finally{try{if(!l&&n.return!=null&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw o}}return s}}function Yi(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ks(e,t){if(!!e){if(typeof e=="string")return Yi(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Yi(e,t)}}function ym(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ji(e,t){return vm(e)||gm(e,t)||ks(e,t)||ym()}var ia=U(Y()),Rt=U(_r());var tn=U(Y()),Hn=U(_r());function bm(e){var t=Object.prototype.toString.call(e).slice(8,-1);return t==="Object"&&typeof e[Symbol.iterator]=="function"?"Iterable":t==="Custom"&&e.constructor!==Object&&e instanceof Object?"Object":t}var qy=U(Y()),Om=U(_r());function wm(e){if(Array.isArray(e))return Yi(e)}function Sm(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function xm(){throw new TypeError(`Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function xn(e){return wm(e)||Sm(e)||ks(e)||xm()}var En=U(Y()),Be=U(_r());var Bu=U(Y()),Xi=U(_r()),Em=function(t){var n=t.styling,r=t.arrowStyle,o=t.expanded,i=t.nodeType,a=t.onClick;return Bu.default.createElement("div",ge({},n("arrowContainer",r),{onClick:a}),Bu.default.createElement("div",n(["arrow","arrowSign"],i,o,r),"\\u25B6",r==="double"&&Bu.default.createElement("div",n(["arrowSign","arrowSignInner"]),"\\u25B6")))};Em.propTypes={styling:Xi.default.func.isRequired,arrowStyle:Xi.default.oneOf(["single","double"]),expanded:Xi.default.bool.isRequired,nodeType:Xi.default.string.isRequired,onClick:Xi.default.func.isRequired};Em.defaultProps={arrowStyle:"single"};var Hu=Em;function pC(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=mC(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(u){throw u},f:o}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i=!0,a=!1,s;return{s:function(){n=n.call(e)},n:function(){var u=n.next();return i=u.done,u},e:function(u){a=!0,s=u},f:function(){try{!i&&n.return!=null&&n.return()}finally{if(a)throw s}}}}function mC(e,t){if(!!e){if(typeof e=="string")return Vy(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Vy(e,t)}}function Vy(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function hC(e,t){return e==="Object"?Object.keys(t).length:e==="Array"?t.length:1/0}function vC(e){return typeof e.set=="function"}function gC(e,t,n){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0,o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:1/0,i;if(e==="Object"){var a=Object.getOwnPropertyNames(t);n&&a.sort(n===!0?void 0:n),a=a.slice(r,o+1),i={entries:a.map(function(d){return{key:d,value:t[d]}})}}else if(e==="Array")i={entries:t.slice(r,o+1).map(function(d,y){return{key:y+r,value:d}})};else{var s=0,l=[],u=!0,c=vC(t),f=pC(t),v;try{for(f.s();!(v=f.n()).done;){var m=v.value;if(s>o){u=!1;break}r<=s&&(c&&Array.isArray(m)?typeof m[0]=="string"||typeof m[0]=="number"?l.push({key:m[0],value:m[1]}):l.push({key:"[entry ".concat(s,"]"),value:{"[key]":m[0],"[value]":m[1]}}):l.push({key:s,value:m})),s++}}catch(d){f.e(d)}finally{f.f()}i={hasMore:!u,entries:l}}return i}function km(e,t,n){for(var r=[];t-e>n*n;)n=n*n;for(var o=e;o<=t;o+=n)r.push({from:o,to:Math.min(t,o+n-1)});return r}function Cm(e,t,n,r){var o=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0,i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:1/0,a=gC.bind(null,e,t,n);if(!r)return a().entries;var s=i<1/0,l=Math.min(i-o,hC(e,t));if(e!=="Iterable"){if(l<=r||r<7)return a(o,i).entries}else if(l<=r&&!s)return a(o,i).entries;var u;if(e==="Iterable"){var c=a(o,o+r-1),f=c.hasMore,v=c.entries;u=f?[].concat(xn(v),xn(km(o+r,o+2*r-1,r))):v}else u=s?km(o,i,r):[].concat(xn(a(0,r-5).entries),xn(km(r-4,l-5,r)),xn(a(l-4,l-1).entries));return u}var Cs=U(Y()),ea=U(_r());function yC(e){var t=bC();return function(){var r=Sn(e),o;if(t){var i=Sn(this).constructor;o=Reflect.construct(r,arguments,i)}else o=r.apply(this,arguments);return Yo(this,o)}}function bC(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}var Tm=function(e){Qo(n,e);var t=yC(n);function n(r){var o;return qo(this,n),o=t.call(this,r),Ye(Zo(o),"handleClick",function(){o.setState({expanded:!o.state.expanded})}),o.state={expanded:!1},o}return Ko(n,[{key:"render",value:function(){var o=this.props,i=o.styling,a=o.from,s=o.to,l=o.renderChildNodes,u=o.nodeType;return this.state.expanded?Cs.default.createElement("div",i("itemRange",this.state.expanded),l(this.props,a,s)):Cs.default.createElement("div",ge({},i("itemRange",this.state.expanded),{onClick:this.handleClick}),Cs.default.createElement(Hu,{nodeType:u,styling:i,expanded:!1,onClick:this.handleClick,arrowStyle:"double"}),"".concat(a," ... ").concat(s))}}]),n}(Cs.default.Component);Ye(Tm,"propTypes",{styling:ea.default.func.isRequired,from:ea.default.number.isRequired,to:ea.default.number.isRequired,renderChildNodes:ea.default.func.isRequired,nodeType:ea.default.string.isRequired});function Wy(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function $y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Wy(Object(n),!0).forEach(function(r){Ye(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Wy(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function wC(e){var t=SC();return function(){var r=Sn(e),o;if(t){var i=Sn(this).constructor;o=Reflect.construct(r,arguments,i)}else o=r.apply(this,arguments);return Yo(this,o)}}function SC(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function xC(e){return e.to!==void 0}function Gy(e,t,n){var r=e.nodeType,o=e.data,i=e.collectionLimit,a=e.circularCache,s=e.keyPath,l=e.postprocessValue,u=e.sortObjectKeys,c=[];return Cm(r,o,u,i,t,n).forEach(function(f){if(xC(f))c.push(En.default.createElement(Tm,ge({},e,{key:"ItemRange--".concat(f.from,"-").concat(f.to),from:f.from,to:f.to,renderChildNodes:Gy})));else{var v=f.key,m=f.value,d=a.indexOf(m)!==-1;c.push(En.default.createElement(Uu,ge({},e,{postprocessValue:l,collectionLimit:i,key:"Node--".concat(v),keyPath:[v].concat(xn(s)),value:l(m),circularCache:[].concat(xn(a),[m]),isCircular:d,hideRoot:!1})))}}),c}function Im(e){var t=e.isCircular?!1:e.shouldExpandNode(e.keyPath,e.data,e.level);return{expanded:t}}var fo=function(e){Qo(n,e);var t=wC(n);function n(r){var o;return qo(this,n),o=t.call(this,r),Ye(Zo(o),"handleClick",function(){o.props.expandable&&o.setState({expanded:!o.state.expanded})}),o.state=Im(r),o}return Ko(n,[{key:"UNSAFE_componentWillReceiveProps",value:function(o){var i=Im(o);Im(this.props).expanded!==i.expanded&&this.setState(i)}},{key:"shouldComponentUpdate",value:function(o,i){var a=this;return!!Object.keys(o).find(function(s){return s!=="circularCache"&&(s==="keyPath"?o[s].join("/")!==a.props[s].join("/"):o[s]!==a.props[s])})||i.expanded!==this.state.expanded}},{key:"render",value:function(){var o=this.props,i=o.getItemString,a=o.nodeTypeIndicator,s=o.nodeType,l=o.data,u=o.hideRoot,c=o.createItemString,f=o.styling,v=o.collectionLimit,m=o.keyPath,d=o.labelRenderer,y=o.expandable,w=this.state.expanded,g=w||u&&this.props.level===0?Gy($y($y({},this.props),{},{level:this.props.level+1})):null,h=En.default.createElement("span",f("nestedNodeItemType",w),a),p=i(s,l,h,c(l,v),m),b=[m,s,w,y];return u?En.default.createElement("li",f.apply(void 0,["rootNode"].concat(b)),En.default.createElement("ul",f.apply(void 0,["rootNodeChildren"].concat(b)),g)):En.default.createElement("li",f.apply(void 0,["nestedNode"].concat(b)),y&&En.default.createElement(Hu,{styling:f,nodeType:s,expanded:w,onClick:this.handleClick}),En.default.createElement("label",ge({},f.apply(void 0,[["label","nestedNodeLabel"]].concat(b)),{onClick:this.handleClick}),d.apply(void 0,b)),En.default.createElement("span",ge({},f.apply(void 0,["nestedNodeItemString"].concat(b)),{onClick:this.handleClick}),p),En.default.createElement("ul",f.apply(void 0,["nestedNodeChildren"].concat(b)),g))}}]),n}(En.default.Component);Ye(fo,"propTypes",{getItemString:Be.default.func.isRequired,nodeTypeIndicator:Be.default.any,nodeType:Be.default.string.isRequired,data:Be.default.any,hideRoot:Be.default.bool.isRequired,createItemString:Be.default.func.isRequired,styling:Be.default.func.isRequired,collectionLimit:Be.default.number,keyPath:Be.default.arrayOf(Be.default.oneOfType([Be.default.string,Be.default.number])).isRequired,labelRenderer:Be.default.func.isRequired,shouldExpandNode:Be.default.func,level:Be.default.number.isRequired,sortObjectKeys:Be.default.oneOfType([Be.default.func,Be.default.bool]),isCircular:Be.default.bool,expandable:Be.default.bool});Ye(fo,"defaultProps",{data:[],circularCache:[],level:0,expandable:!0});var EC=["data"];function kC(e){var t=Object.getOwnPropertyNames(e).length;return"".concat(t," ").concat(t!==1?"keys":"key")}var Ky=function(t){var n=t.data,r=Or(t,EC);return qy.default.createElement(fo,ge({},r,{data:n,nodeType:"Object",nodeTypeIndicator:r.nodeType==="Error"?"Error()":"{}",createItemString:kC,expandable:Object.getOwnPropertyNames(n).length>0}))};Ky.propTypes={data:Om.default.object,nodeType:Om.default.string.isRequired};var Qy=Ky;var Zy=U(Y()),Yy=U(_r());var CC=["data"];function TC(e){return"".concat(e.length," ").concat(e.length!==1?"items":"item")}var Jy=function(t){var n=t.data,r=Or(t,CC);return Zy.default.createElement(fo,ge({},r,{data:n,nodeType:"Array",nodeTypeIndicator:"[]",createItemString:TC,expandable:n.length>0}))};Jy.propTypes={data:Yy.default.array};var Xy=Jy;var tb=U(Y());function IC(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=OC(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(u){throw u},f:o}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i=!0,a=!1,s;return{s:function(){n=n.call(e)},n:function(){var u=n.next();return i=u.done,u},e:function(u){a=!0,s=u},f:function(){try{!i&&n.return!=null&&n.return()}finally{if(a)throw s}}}}function OC(e,t){if(!!e){if(typeof e=="string")return eb(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return eb(e,t)}}function eb(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _C(e,t){var n=0,r=!1;if(Number.isSafeInteger(e.size))n=e.size;else{var o=IC(e),i;try{for(o.s();!(i=o.n()).done;){var a=i.value;if(t&&n+1>t){r=!0;break}n+=1}}catch(s){o.e(s)}finally{o.f()}}return"".concat(r?">":"").concat(n," ").concat(n!==1?"entries":"entry")}var MC=function(t){var n=ge({},t);return tb.default.createElement(fo,ge({},n,{nodeType:"Iterable",nodeTypeIndicator:"()",createItemString:_C}))},nb=MC;var Vu=U(Y()),Bn=U(_r()),rb=function(t){var n=t.nodeType,r=t.styling,o=t.labelRenderer,i=t.keyPath,a=t.valueRenderer,s=t.value,l=t.valueGetter,u=l===void 0?function(c){return c}:l;return Vu.default.createElement("li",r("value",n,i),Vu.default.createElement("label",r(["label","valueLabel"],n,i),o(i,n,!1,!1)),Vu.default.createElement("span",r("valueText",n,i),a.apply(void 0,[u(s),s].concat(xn(i)))))};rb.propTypes={nodeType:Bn.default.string.isRequired,styling:Bn.default.func.isRequired,labelRenderer:Bn.default.func.isRequired,keyPath:Bn.default.arrayOf(Bn.default.oneOfType([Bn.default.string,Bn.default.number]).isRequired).isRequired,valueRenderer:Bn.default.func.isRequired,value:Bn.default.any,valueGetter:Bn.default.func};var sr=rb;var RC=["getItemString","keyPath","labelRenderer","styling","value","valueRenderer","isCustomNode"];function ob(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function _m(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?ob(Object(n),!0).forEach(function(r){Ye(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ob(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var ib=function(t){var n=t.getItemString,r=t.keyPath,o=t.labelRenderer,i=t.styling,a=t.value,s=t.valueRenderer,l=t.isCustomNode,u=Or(t,RC),c=l(a)?"Custom":bm(a),f={getItemString:n,key:r[0],keyPath:r,labelRenderer:o,nodeType:c,styling:i,value:a,valueRenderer:s},v=_m(_m(_m({},u),f),{},{data:a,isCustomNode:l});switch(c){case"Object":case"Error":case"WeakMap":case"WeakSet":return tn.default.createElement(Qy,v);case"Array":return tn.default.createElement(Xy,v);case"Iterable":case"Map":case"Set":return tn.default.createElement(nb,v);case"String":return tn.default.createElement(sr,ge({},f,{valueGetter:function(d){return\'"\'.concat(d,\'"\')}}));case"Number":return tn.default.createElement(sr,f);case"Boolean":return tn.default.createElement(sr,ge({},f,{valueGetter:function(d){return d?"true":"false"}}));case"Date":return tn.default.createElement(sr,ge({},f,{valueGetter:function(d){return d.toISOString()}}));case"Null":return tn.default.createElement(sr,ge({},f,{valueGetter:function(){return"null"}}));case"Undefined":return tn.default.createElement(sr,ge({},f,{valueGetter:function(){return"undefined"}}));case"Function":case"Symbol":return tn.default.createElement(sr,ge({},f,{valueGetter:function(d){return d.toString()}}));case"Custom":return tn.default.createElement(sr,f);default:return tn.default.createElement(sr,ge({},f,{valueGetter:function(){return"<".concat(c,">")}}))}};ib.propTypes={getItemString:Hn.default.func.isRequired,keyPath:Hn.default.arrayOf(Hn.default.oneOfType([Hn.default.string,Hn.default.number]).isRequired).isRequired,labelRenderer:Hn.default.func.isRequired,styling:Hn.default.func.isRequired,value:Hn.default.any,valueRenderer:Hn.default.func.isRequired,isCustomNode:Hn.default.func.isRequired};var Uu=ib;var Hm=U(T2()),zm=U(Z2()),Dm=U(hw());function vw(e){var t=e[0],n=e[1],r=e[2],o,i,a;return o=t*1+n*0+r*1.13983,i=t*1+n*-.39465+r*-.5806,a=t*1+n*2.02311+r*0,o=Math.min(Math.max(0,o),1),i=Math.min(Math.max(0,i),1),a=Math.min(Math.max(0,a),1),[o*255,i*255,a*255]}function gw(e){var t=e[0]/255,n=e[1]/255,r=e[2]/255,o=t*.299+n*.587+r*.114,i=t*-.14713+n*-.28886+r*.436,a=t*.615+n*-.51499+r*-.10001;return[o,i,a]}function yw(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Bt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?yw(Object(n),!0).forEach(function(r){Ye(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):yw(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var ww=Hm.default,bw=Object.keys(ww),PT=function(t){return t<.25?1:t<.5?.9-t:1.1-t},AT=function(t){var n=(0,zm.default)(t),r=gw(n.array()),o=Ji(r,3),i=o[0],a=o[1],s=o[2],l=[PT(i),a,s],u=vw(l);return zm.default.rgb(u).hex()},oa=function(t){return function(n){return{className:[n.className,t.className].filter(Boolean).join(" "),style:Bt(Bt({},n.style||{}),t.style||{})}}},FT=function(t,n){if(t===void 0)return n;if(n===void 0)return t;var r=Dt(t),o=Dt(n);switch(r){case"string":switch(o){case"string":return[n,t].filter(Boolean).join(" ");case"object":return oa({className:t,style:n});case"function":return function(i){for(var a=arguments.length,s=new Array(a>1?a-1:0),l=1;l<a;l++)s[l-1]=arguments[l];return oa({className:t})(n.apply(void 0,[i].concat(s)))}}break;case"object":switch(o){case"string":return oa({className:n,style:t});case"object":return Bt(Bt({},n),t);case"function":return function(i){for(var a=arguments.length,s=new Array(a>1?a-1:0),l=1;l<a;l++)s[l-1]=arguments[l];return oa({style:t})(n.apply(void 0,[i].concat(s)))}}break;case"function":switch(o){case"string":return function(i){for(var a=arguments.length,s=new Array(a>1?a-1:0),l=1;l<a;l++)s[l-1]=arguments[l];return t.apply(void 0,[oa(i)({className:n})].concat(s))};case"object":return function(i){for(var a=arguments.length,s=new Array(a>1?a-1:0),l=1;l<a;l++)s[l-1]=arguments[l];return t.apply(void 0,[oa(i)({style:n})].concat(s))};case"function":return function(i){for(var a=arguments.length,s=new Array(a>1?a-1:0),l=1;l<a;l++)s[l-1]=arguments[l];return t.apply(void 0,[n.apply(void 0,[i].concat(s))].concat(s))}}}},jT=function(t,n){var r=Object.keys(n);for(var o in t)r.indexOf(o)===-1&&r.push(o);return r.reduce(function(i,a){return i[a]=FT(t[a],n[a]),i},{})},zT=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];if(n===null)return t;Array.isArray(n)||(n=[n]);var a=n.map(function(l){return t[l]}).filter(Boolean),s=a.reduce(function(l,u){return typeof u=="string"?l.className=[l.className,u].filter(Boolean).join(" "):Dt(u)==="object"?l.style=Bt(Bt({},l.style),u):typeof u=="function"&&(l=Bt(Bt({},l),u.apply(void 0,[l].concat(o)))),l},{className:"",style:{}});return s.className||delete s.className,Object.keys(s.style).length===0&&delete s.style,s},Bm=function(t){return Object.keys(t).reduce(function(n,r){return n[r]=/^base/.test(r)?AT(t[r]):r==="scheme"?t[r]+":inverted":t[r],n},{})},Sw=(0,Dm.default)(function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=t.defaultBase16,o=r===void 0?ww:r,i=t.base16Themes,a=i===void 0?null:i,s=DT(n,a);s&&(n=Bt(Bt({},s),n));for(var l=bw.reduce(function(y,w){return y[w]=n[w]||o[w],y},{}),u=Object.keys(n).reduce(function(y,w){return bw.indexOf(w)===-1&&(y[w]=n[w]),y},{}),c=e(l),f=jT(u,c),v=arguments.length,m=new Array(v>3?v-3:0),d=3;d<v;d++)m[d-3]=arguments[d];return(0,Dm.default)(zT,2).apply(void 0,[f].concat(m))},3),xw=function(t){return!!t.extend},DT=function(t,n){if(t&&xw(t)&&t.extend&&(t=t.extend),typeof t=="string"){var r=t.split(":"),o=Ji(r,2),i=o[0],a=o[1];n?t=n[i]:t=Hm[i],a==="inverted"&&(t=Bm(t))}return t&&Object.prototype.hasOwnProperty.call(t,"base00")?t:void 0},Ew=function(t){return typeof t=="string"?"".concat(t,":inverted"):t&&xw(t)&&t.extend?typeof t.extend=="string"?Bt(Bt({},t),{},{extend:"".concat(t.extend,":inverted")}):Bt(Bt({},t),{},{extend:Bm(t.extend)}):t&&Bm(t)};var kw={scheme:"solarized",author:"ethan schoonover (http://ethanschoonover.com/solarized)",base00:"#002b36",base01:"#073642",base02:"#586e75",base03:"#657b83",base04:"#839496",base05:"#93a1a1",base06:"#eee8d5",base07:"#fdf6e3",base08:"#dc322f",base09:"#cb4b16",base0A:"#b58900",base0B:"#859900",base0C:"#2aa198",base0D:"#268bd2",base0E:"#6c71c4",base0F:"#d33682"};function Cw(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function wt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Cw(Object(n),!0).forEach(function(r){Ye(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Cw(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var BT=function(t){return{BACKGROUND_COLOR:t.base00,TEXT_COLOR:t.base07,STRING_COLOR:t.base0B,DATE_COLOR:t.base0B,NUMBER_COLOR:t.base09,BOOLEAN_COLOR:t.base09,NULL_COLOR:t.base08,UNDEFINED_COLOR:t.base08,FUNCTION_COLOR:t.base08,SYMBOL_COLOR:t.base08,LABEL_COLOR:t.base0D,ARROW_COLOR:t.base0D,ITEM_STRING_COLOR:t.base0B,ITEM_STRING_EXPANDED_COLOR:t.base03}},HT=function(t){return{String:t.STRING_COLOR,Date:t.DATE_COLOR,Number:t.NUMBER_COLOR,Boolean:t.BOOLEAN_COLOR,Null:t.NULL_COLOR,Undefined:t.UNDEFINED_COLOR,Function:t.FUNCTION_COLOR,Symbol:t.SYMBOL_COLOR}},UT=function(t){var n=BT(t);return{tree:{border:0,padding:0,marginTop:"0.5em",marginBottom:"0.5em",marginLeft:"0.125em",marginRight:0,listStyle:"none",MozUserSelect:"none",WebkitUserSelect:"none",backgroundColor:n.BACKGROUND_COLOR},value:function(o,i,a){var s=o.style;return{style:wt(wt({},s),{},{paddingTop:"0.25em",paddingRight:0,marginLeft:"0.875em",WebkitUserSelect:"text",MozUserSelect:"text",wordWrap:"break-word",paddingLeft:a.length>1?"2.125em":"1.25em",textIndent:"-0.5em",wordBreak:"break-all"})}},label:{display:"inline-block",color:n.LABEL_COLOR},valueLabel:{margin:"0 0.5em 0 0"},valueText:function(o,i){var a=o.style;return{style:wt(wt({},a),{},{color:HT(n)[i]})}},itemRange:function(o,i){return{style:{paddingTop:i?0:"0.25em",cursor:"pointer",color:n.LABEL_COLOR}}},arrow:function(o,i,a){var s=o.style;return{style:wt(wt({},s),{},{marginLeft:0,transition:"150ms",WebkitTransition:"150ms",MozTransition:"150ms",WebkitTransform:a?"rotateZ(90deg)":"rotateZ(0deg)",MozTransform:a?"rotateZ(90deg)":"rotateZ(0deg)",transform:a?"rotateZ(90deg)":"rotateZ(0deg)",transformOrigin:"45% 50%",WebkitTransformOrigin:"45% 50%",MozTransformOrigin:"45% 50%",position:"relative",lineHeight:"1.1em",fontSize:"0.75em"})}},arrowContainer:function(o,i){var a=o.style;return{style:wt(wt({},a),{},{display:"inline-block",paddingRight:"0.5em",paddingLeft:i==="double"?"1em":0,cursor:"pointer"})}},arrowSign:{color:n.ARROW_COLOR},arrowSignInner:{position:"absolute",top:0,left:"-0.4em"},nestedNode:function(o,i,a,s,l){var u=o.style;return{style:wt(wt({},u),{},{position:"relative",paddingTop:"0.25em",marginLeft:i.length>1?"0.875em":0,paddingLeft:l?0:"1.125em"})}},rootNode:{padding:0,margin:0},nestedNodeLabel:function(o,i,a,s,l){var u=o.style;return{style:wt(wt({},u),{},{margin:0,padding:0,WebkitUserSelect:l?"inherit":"text",MozUserSelect:l?"inherit":"text",cursor:l?"pointer":"default"})}},nestedNodeItemString:function(o,i,a,s){var l=o.style;return{style:wt(wt({},l),{},{paddingLeft:"0.5em",cursor:"default",color:s?n.ITEM_STRING_EXPANDED_COLOR:n.ITEM_STRING_COLOR})}},nestedNodeItemType:{marginLeft:"0.3em",marginRight:"0.3em"},nestedNodeChildren:function(o,i,a){var s=o.style;return{style:wt(wt({},s),{},{padding:0,margin:0,listStyle:"none",display:a?"block":"none"})}},rootNodeChildren:{padding:0,margin:0,listStyle:"none"}}},VT=Sw(UT,{defaultBase16:kw}),Tw=VT;var WT=["data","keyPath","postprocessValue","hideRoot","theme","invertTheme"];function $T(e){var t=GT();return function(){var r=Sn(e),o;if(t){var i=Sn(this).constructor;o=Reflect.construct(r,arguments,i)}else o=r.apply(this,arguments);return Yo(this,o)}}function GT(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Iw(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Pc(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Iw(Object(n),!0).forEach(function(r){Ye(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Iw(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var Ow=function(t){return t},qT=function(t,n,r){return r===0},KT=function(t,n,r,o){return ia.default.createElement("span",null,r," ",o)},QT=function(t){var n=Ji(t,1),r=n[0];return ia.default.createElement("span",null,r,":")},ZT=function(){return!1};function YT(e,t){var n={getArrowStyle:"arrow",getListStyle:"nestedNodeChildren",getItemStringStyle:"nestedNodeItemString",getLabelStyle:"label",getValueStyle:"valueText"},r=Object.keys(n).filter(function(o){return t[o]});return r.length>0&&(typeof e=="string"?e={extend:e}:e=Pc({},e),r.forEach(function(o){console.error(\'Styling method "\'.concat(o,\'" is deprecated, use "theme" property instead\')),e[n[o]]=function(i){for(var a=i.style,s=arguments.length,l=new Array(s>1?s-1:0),u=1;u<s;u++)l[u-1]=arguments[u];return{style:Pc(Pc({},a),t[o].apply(t,l))}}})),e}function _w(e){var t=YT(e.theme,e);return e.invertTheme&&(t=Ew(t)),{styling:Tw(t)}}var Ac=function(e){Qo(n,e);var t=$T(n);function n(r){var o;return qo(this,n),o=t.call(this,r),o.state=_w(r),o}return Ko(n,[{key:"UNSAFE_componentWillReceiveProps",value:function(o){var i=this;["theme","invertTheme"].find(function(a){return o[a]!==i.props[a]})&&this.setState(_w(o))}},{key:"shouldComponentUpdate",value:function(o){var i=this;return!!Object.keys(o).find(function(a){return a==="keyPath"?o[a].join("/")!==i.props[a].join("/"):o[a]!==i.props[a]})}},{key:"render",value:function(){var o=this.props,i=o.data,a=o.keyPath,s=o.postprocessValue,l=o.hideRoot,u=o.theme,c=o.invertTheme,f=Or(o,WT),v=this.state.styling;return ia.default.createElement("ul",v("tree"),ia.default.createElement(Uu,ge({},Pc({postprocessValue:s,hideRoot:l,styling:v},f),{keyPath:l?[]:a,value:s(i)})))}}]),n}(ia.default.Component);Ye(Ac,"propTypes",{data:Rt.default.any,hideRoot:Rt.default.bool,theme:Rt.default.oneOfType([Rt.default.object,Rt.default.string]),invertTheme:Rt.default.bool,keyPath:Rt.default.arrayOf(Rt.default.oneOfType([Rt.default.string,Rt.default.number])),postprocessValue:Rt.default.func,sortObjectKeys:Rt.default.oneOfType([Rt.default.func,Rt.default.bool])});Ye(Ac,"defaultProps",{shouldExpandNode:qT,hideRoot:!1,keyPath:["root"],getItemString:KT,labelRenderer:QT,valueRenderer:Ow,postprocessValue:Ow,isCustomNode:ZT,collectionLimit:50,invertTheme:!0});var JT={scheme:"GitHub",author:"",base00:"#ffffff",base01:"#f5f5f5",base02:"#c8c8fa",base03:"#969896",base04:"#e8e8e8",base05:"#333333",base06:"#ffffff",base07:"#ffffff",base08:"#ed6a43",base09:"#0086b3",base0A:"#795da3",base0B:"#183691",base0C:"#183691",base0D:"#795da3",base0E:"#a71d5d",base0F:"#333333"},Ls=({data:e=null,expanded:t=!0,hideRoot:n=!0})=>{let r=(0,_e.useCallback)(()=>t,[t]);return _e.default.createElement("div",{className:"ed-json"},e?_e.default.createElement(Ac,{hideRoot:n,data:e,theme:JT,invertTheme:!1,shouldExpandNode:r,labelRenderer:(o,i,a,s)=>{let l=o[0];if(typeof o[0]=="number"&&(l="["+l+"]"),l=l.toString(),o.length===1){let u="#000000";return l==="error"?(u="red",l="Error"):l==="result"&&(u="green",l="Result"),l=l.charAt(0).toUpperCase()+l.slice(1),_e.default.createElement("strong",{style:{fontSize:14,padding:"14px 0",color:u}},l)}return _e.default.createElement("strong",null,l,": ")},sortObjectKeys:(o,i)=>o==="error"?-100:o==="message"?-70:o==="result"?-50:o==="params"?-10:0}):_e.default.createElement(Du,null))},Mw=()=>{let{selected:e}=(0,_e.useContext)(Ze),t=Kt(ny),n=Dr({store:yn,keys:[e],fn:(i,[a])=>i[a]}),r=n.payload?JSON.parse(n.payload):void 0,o=_e.default.createElement(Ls,{data:r,expanded:t});return n.kind==="store"?o=_e.default.createElement(Ls,{data:{data:r},expanded:t}):n.kind==="event"?o=_e.default.createElement(Ls,{data:{["Event Payload"]:r},expanded:t}):n.kind==="effect"&&(n.name.endsWith(".done")||n.name.endsWith(".fail")?o=_e.default.createElement(Ls,{data:r,expanded:t}):o=_e.default.createElement(Ls,{data:{argument:r},expanded:t})),_e.default.createElement("div",{className:"ed-details-body-preview"},o,_e.default.createElement("div",{className:"ed-details-body-corner-btns"},_e.default.createElement("div",{className:"ed-details-body-corner-btn",onClick:()=>Zp(!t)},t?_e.default.createElement(_e.default.Fragment,null,_e.default.createElement(Ly,null)," Collapse"):_e.default.createElement(_e.default.Fragment,null,_e.default.createElement(Py,null)," Expand"))))};var Um=U(Y()),XT=e=>Um.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",...e},Um.createElement("path",{d:"M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"})),Rw=XT;var Mr=U(Y());var Nw=U(Y());var Vm={preview:"Preview",payload:"Payload",history:"History"},Fc=()=>{let{selectedTab:e,showHistory:t}=(0,Nw.useContext)(Ze),n=Object.keys(Vm);t||(n=n.filter(o=>o!=="history"));let r=n.includes(e)?e:n[0];return{availableTabs:n,selectedTab:r}};var Lw=()=>{let{parentSetHotkeysActive:e,hotkeysActive:t,setSelected:n,setSelectedTab:r}=(0,Mr.useContext)(Ze),{availableTabs:o,selectedTab:i}=Fc();return(0,Mr.useEffect)(()=>{if(!!e)return e(!1),()=>e(!0)},[e]),rr("esc",()=>{t&&n(!1)},[n,t]),rr("right",()=>{if(t){let a=o.indexOf(i)+1;a>o.length-1&&(a=0),r(o[a])}},[i,r,t,o.join("/")]),rr("left",()=>{if(t){let a=o.indexOf(i)-1;a<0&&(a=o.length-1),r(o[a])}},[i,r,t,o.join("/")]),Mr.default.createElement(Nu,null,Mr.default.createElement("a",{className:"ed-btn",onClick:()=>n(!1)},Mr.default.createElement(Rw,null)),o.map(a=>Mr.default.createElement("a",{className:or("ed-tab-header",{"ed-tab-header--selected":i===a}),onClick:()=>r(a)},Vm[a])))};var e4=()=>{let{selectedTab:e}=Fc();return lr.default.createElement("div",{className:"ed-details-body"},e==="preview"&&lr.default.createElement(Mw,null),e==="payload"&&lr.default.createElement(Ny,null),e==="history"&&lr.default.createElement(cy,null))},Pw=()=>{let{selected:e}=(0,lr.useContext)(Ze);return e?lr.default.createElement("div",{className:"ed-details"},lr.default.createElement(Lw,null),lr.default.createElement(e4,null)):null};var yo=U(Y());var Aw=function(){};var jc=typeof window<"u";var zc=U(Y());var t4=jc?zc.useLayoutEffect:zc.useEffect,Fw=t4;var Ps=U(Y());var jw={x:0,y:0,width:0,height:0,top:0,left:0,bottom:0,right:0};function n4(){var e=(0,Ps.useState)(null),t=e[0],n=e[1],r=(0,Ps.useState)(jw),o=r[0],i=r[1],a=(0,Ps.useMemo)(function(){return new window.ResizeObserver(function(s){if(s[0]){var l=s[0].contentRect,u=l.x,c=l.y,f=l.width,v=l.height,m=l.top,d=l.left,y=l.bottom,w=l.right;i({x:u,y:c,width:f,height:v,top:m,left:d,bottom:y,right:w})}})},[]);return Fw(function(){if(!!t)return a.observe(t),function(){a.disconnect()}},[t]),[n,o]}var Wm=jc&&typeof window.ResizeObserver<"u"?n4:function(){return[Aw,jw]};var Ge=U(Y());var Ae=U(Y());var Dc=0,mo=1,aa=2,zw=4;function sa(e,t){return function(n){return e(t(n))}}function r4(e,t){return t(e)}function $m(e,t){return function(n){return e(t,n)}}function Gm(e,t){return function(){return e(t)}}function la(e,t){return t(e),e}function Te(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t}function o4(e){e()}function qm(e){return function(){return e}}function i4(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(){t.map(o4)}}function ho(){}function ue(e,t){return e(mo,t)}function de(e,t){e(Dc,t)}function Bc(e){e(aa)}function kn(e){return e(zw)}function V(e,t){return ue(e,$m(t,Dc))}function vo(e,t){var n=e(mo,function(r){n(),t(r)});return n}function $(){var e=[];return function(t,n){switch(t){case aa:e.splice(0,e.length);return;case mo:return e.push(n),function(){var r=e.indexOf(n);r>-1&&e.splice(r,1)};case Dc:e.slice().forEach(function(r){r(n)});return;default:throw new Error("unrecognized action "+t)}}}function R(e){var t=e,n=$();return function(r,o){switch(r){case mo:var i=o;i(t);break;case Dc:t=o;break;case zw:return t}return n(r,o)}}function Dw(e){var t,n,r=function(){return t&&t()};return function(o,i){switch(o){case mo:return i?n===i?void 0:(r(),n=i,t=ue(e,i),t):(r(),ho);case aa:r(),n=null;return;default:throw new Error("unrecognized action "+o)}}}function Ht(e){return la($(),function(t){return V(e,t)})}function St(e,t){return la(R(t),function(n){return V(e,n)})}function a4(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduceRight(r4,r)}}function O(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=a4.apply(void 0,n);return function(i,a){switch(i){case mo:return ue(e,o(a));case aa:Bc(e);return;default:throw new Error("unrecognized action "+i)}}}function Bw(e,t){return e===t}function Me(e){e===void 0&&(e=Bw);var t;return function(n){return function(r){e(t,r)||(t=r,n(r))}}}function X(e){return function(t){return function(n){e(n)&&t(n)}}}function F(e){return function(t){return sa(t,e)}}function Rr(e){return function(t){return function(){return t(e)}}}function ur(e,t){return function(n){return function(r){return n(t=e(t,r))}}}function As(e){return function(t){return function(n){e>0?e--:t(n)}}}function ti(e){var t,n;return function(r){return function(o){t=o,!n&&(n=setTimeout(function(){n=void 0,r(t)},e))}}}function Km(e){var t,n;return function(r){return function(o){t=o,n&&clearTimeout(n),n=setTimeout(function(){r(t)},e)}}}function ae(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=new Array(t.length),o=0,i=null,a=Math.pow(2,t.length)-1;return t.forEach(function(s,l){var u=Math.pow(2,l);ue(s,function(c){var f=o;o=o|u,r[l]=c,f!==a&&o===a&&i&&(i(),i=null)})}),function(s){return function(l){var u=function(){return s([l].concat(r))};o===a?u():i=u}}}function Qm(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r,o){switch(r){case mo:return i4.apply(void 0,t.map(function(i){return ue(i,o)}));case aa:return;default:throw new Error("unrecognized action "+r)}}}function ie(e,t){return t===void 0&&(t=Bw),O(e,Me(t))}function tt(){for(var e=$(),t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=new Array(n.length),i=0,a=Math.pow(2,n.length)-1;return n.forEach(function(s,l){var u=Math.pow(2,l);ue(s,function(c){o[l]=c,i=i|u,i===a&&de(e,o)})}),function(s,l){switch(s){case mo:return i===a&&l(o),ue(e,l);case aa:return Bc(e);default:throw new Error("unrecognized action "+s)}}}function pe(e,t,n){t===void 0&&(t=[]);var r=n===void 0?{singleton:!0}:n,o=r.singleton;return{id:s4(),constructor:e,dependencies:t,singleton:o}}var s4=function(){return Symbol()};function Hw(e){var t=new Map,n=function r(o){var i=o.id,a=o.constructor,s=o.dependencies,l=o.singleton;if(l&&t.has(i))return t.get(i);var u=a(s.map(function(c){return r(c)}));return l&&t.set(i,u),u};return n(e)}function u4(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function c4(e,t){if(!!e){if(typeof e=="string")return Uw(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Uw(e,t)}}function Uw(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Zm(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=c4(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var f4=["children"];function d4(e,t){for(var n={},r={},o=0,i=e.length;o<i;)r[e[o]]=1,o+=1;for(var a in t)r.hasOwnProperty(a)||(n[a]=t[a]);return n}var Hc=typeof document<"u"?Ae.useLayoutEffect:Ae.useEffect;function Uc(e,t,n){var r=Object.keys(t.required||{}),o=Object.keys(t.optional||{}),i=Object.keys(t.methods||{}),a=Object.keys(t.events||{}),s=(0,Ae.createContext)({});function l(y,w){y.propsReady&&de(y.propsReady,!1);for(var g=Zm(r),h;!(h=g()).done;){var p=h.value,b=y[t.required[p]];de(b,w[p])}for(var S=Zm(o),x;!(x=S()).done;){var E=x.value;if(E in w){var k=y[t.optional[E]];de(k,w[E])}}y.propsReady&&de(y.propsReady,!0)}function u(y){return i.reduce(function(w,g){return w[g]=function(h){var p=y[t.methods[g]];de(p,h)},w},{})}function c(y){return a.reduce(function(w,g){return w[g]=Dw(y[t.events[g]]),w},{})}var f=(0,Ae.forwardRef)(function(y,w){var g=y.children,h=u4(y,f4),p=(0,Ae.useState)(function(){return la(Hw(e),function(E){return l(E,h)})}),b=p[0],S=(0,Ae.useState)(Gm(c,b)),x=S[0];return Hc(function(){for(var E=Zm(a),k;!(k=E()).done;){var T=k.value;T in h&&ue(x[T],h[T])}return function(){Object.values(x).map(Bc)}},[h,x,b]),Hc(function(){l(b,h)}),(0,Ae.useImperativeHandle)(w,qm(u(b))),(0,Ae.createElement)(s.Provider,{value:b},n?(0,Ae.createElement)(n,d4([].concat(r,o,a),h),g):g)}),v=function(w){return(0,Ae.useCallback)($m(de,(0,Ae.useContext)(s)[w]),[w])},m=function(w){var g=(0,Ae.useContext)(s),h=g[w],p=(0,Ae.useState)(Gm(kn,h)),b=p[0],S=p[1];return Hc(function(){return ue(h,function(x){x!==b&&S(qm(x))})},[h,b]),b},d=function(w,g){var h=(0,Ae.useContext)(s),p=h[w];Hc(function(){return ue(p,g)},[g,p])};return{Component:f,usePublisher:v,useEmitterValue:m,useEmitter:d}}var D=U(Y()),G=U(Y()),tS=U(jp());function Q(){return Q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Q.apply(this,arguments)}function ca(e,t){if(e==null)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(o[n]=e[n]);return o}function Vw(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ni(e,t){var n=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(o,i){if(o){if(typeof o=="string")return Vw(o,i);var a=Object.prototype.toString.call(o).slice(8,-1);return a==="Object"&&o.constructor&&(a=o.constructor.name),a==="Map"||a==="Set"?Array.from(o):a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Vw(o,i):void 0}}(e))||t&&e&&typeof e.length=="number"){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Fs,$e,p4=typeof document<"u"?G.useLayoutEffect:G.useEffect;(function(e){e[e.DEBUG=0]="DEBUG",e[e.INFO=1]="INFO",e[e.WARN=2]="WARN",e[e.ERROR=3]="ERROR"})($e||($e={}));var m4=((Fs={})[$e.DEBUG]="debug",Fs[$e.INFO]="log",Fs[$e.WARN]="warn",Fs[$e.ERROR]="error",Fs),go=pe(function(){var e=R($e.ERROR);return{log:R(function(t,n,r){var o;r===void 0&&(r=$e.INFO),r>=((o=(typeof globalThis>"u"?window:globalThis).VIRTUOSO_LOG_LEVEL)!=null?o:kn(e))&&console[m4[r]]("%creact-virtuoso: %c%s %o","color: #0253b3; font-weight: bold","color: initial",t,n)}),logLevel:e}},[],{singleton:!0});function ih(e,t){t===void 0&&(t=!0);var n=(0,G.useRef)(null),r=function(i){};if(typeof ResizeObserver<"u"){var o=new ResizeObserver(function(i){var a=i[0].target;a.offsetParent!==null&&e(a)});r=function(i){i&&t?(o.observe(i),n.current=i):(n.current&&o.unobserve(n.current),n.current=null)}}return{ref:n,callbackRef:r}}function fr(e,t){return t===void 0&&(t=!0),ih(e,t).callbackRef}function nS(e,t,n,r,o,i,a){return ih(function(s){for(var l=function(d,y,w,g){var h=d.length;if(h===0)return null;for(var p=[],b=0;b<h;b++){var S=d.item(b);if(S&&S.dataset.index!==void 0){var x=parseInt(S.dataset.index),E=parseFloat(S.dataset.knownSize),k=y(S,"offsetHeight");if(k===0&&g("Zero-sized element, this should not happen",{child:S},$e.ERROR),k!==E){var T=p[p.length-1];p.length===0||T.size!==k||T.endIndex!==x-1?p.push({startIndex:x,endIndex:x,size:k}):p[p.length-1].endIndex++}}}return p}(s.children,t,0,o),u=s.parentElement;!u.dataset.virtuosoScroller;)u=u.parentElement;var c=u.firstElementChild.dataset.viewportType==="window",f=a?a.scrollTop:c?window.pageYOffset||document.documentElement.scrollTop:u.scrollTop,v=a?a.scrollHeight:c?document.documentElement.scrollHeight:u.scrollHeight,m=a?a.offsetHeight:c?window.innerHeight:u.offsetHeight;r({scrollTop:Math.max(f,0),scrollHeight:v,viewportHeight:m}),i?.(function(d,y,w){return y==="normal"||y!=null&&y.endsWith("px")||w("row-gap was not resolved to pixel value correctly",y,$e.WARN),y==="normal"?0:parseInt(y??"0",10)}(0,getComputedStyle(s).rowGap,o)),l!==null&&e(l)},n)}function Wn(e,t){return Math.round(e.getBoundingClientRect()[t])}function rS(e,t){return Math.abs(e-t)<1.01}function oS(e,t,n,r,o){r===void 0&&(r=ho);var i=(0,G.useRef)(null),a=(0,G.useRef)(null),s=(0,G.useRef)(null),l=(0,G.useRef)(!1),u=(0,G.useCallback)(function(c){var f=c.target,v=f===window||f===document,m=v?window.pageYOffset||document.documentElement.scrollTop:f.scrollTop,d=v?document.documentElement.scrollHeight:f.scrollHeight,y=v?window.innerHeight:f.offsetHeight,w=function(){e({scrollTop:Math.max(m,0),scrollHeight:d,viewportHeight:y})};l.current?(0,tS.flushSync)(w):w(),l.current=!1,a.current!==null&&(m===a.current||m<=0||m===d-y)&&(a.current=null,t(!0),s.current&&(clearTimeout(s.current),s.current=null))},[e,t]);return(0,G.useEffect)(function(){var c=o||i.current;return r(o||i.current),u({target:c}),c.addEventListener("scroll",u,{passive:!0}),function(){r(null),c.removeEventListener("scroll",u)}},[i,u,n,r,o]),{scrollerRef:i,scrollByCallback:function(c){l.current=!0,i.current.scrollBy(c)},scrollToCallback:function(c){var f=i.current;if(f&&(!("offsetHeight"in f)||f.offsetHeight!==0)){var v,m,d,y=c.behavior==="smooth";if(f===window?(m=Math.max(Wn(document.documentElement,"height"),document.documentElement.scrollHeight),v=window.innerHeight,d=document.documentElement.scrollTop):(m=f.scrollHeight,v=Wn(f,"height"),d=f.scrollTop),c.top=Math.ceil(Math.max(Math.min(m-v,c.top),0)),rS(v,m)||c.top===d)return e({scrollTop:d,scrollHeight:m,viewportHeight:v}),void(y&&t(!0));y?(a.current=c.top,s.current&&clearTimeout(s.current),s.current=setTimeout(function(){s.current=null,a.current=null,t(!0)},1e3)):a.current=null,f.scrollTo(c)}}}}var Ut=pe(function(){var e=$(),t=$(),n=R(0),r=$(),o=R(0),i=$(),a=$(),s=R(0),l=R(0),u=R(0),c=R(0),f=$(),v=$(),m=R(!1),d=R(!1);return V(O(e,F(function(y){return y.scrollTop})),t),V(O(e,F(function(y){return y.scrollHeight})),a),V(t,o),{scrollContainerState:e,scrollTop:t,viewportHeight:i,headerHeight:s,fixedHeaderHeight:l,fixedFooterHeight:u,footerHeight:c,scrollHeight:a,smoothScrollTargetReached:r,react18ConcurrentRendering:d,scrollTo:f,scrollBy:v,statefulScrollTop:o,deviation:n,scrollingInProgress:m}},[],{singleton:!0}),Ds={lvl:0};function iS(e,t,n,r,o){return r===void 0&&(r=Ds),o===void 0&&(o=Ds),{k:e,v:t,lvl:n,l:r,r:o}}function Ie(e){return e===Ds}function js(){return Ds}function eh(e,t){if(Ie(e))return Ds;var n=e.k,r=e.l,o=e.r;if(t===n){if(Ie(r))return o;if(Ie(o))return r;var i=aS(r);return nh(ct(e,{k:i[0],v:i[1],l:sS(r)}))}return nh(ct(e,t<n?{l:eh(r,t)}:{r:eh(o,t)}))}function dr(e,t,n){if(n===void 0&&(n="k"),Ie(e))return[-1/0,void 0];if(e[n]===t)return[e.k,e.v];if(e[n]<t){var r=dr(e.r,t,n);return r[0]===-1/0?[e.k,e.v]:r}return dr(e.l,t,n)}function cr(e,t,n){return Ie(e)?iS(t,n,1):t===e.k?ct(e,{k:t,v:n}):function(r){return rh(uS(r))}(ct(e,t<e.k?{l:cr(e.l,t,n)}:{r:cr(e.r,t,n)}))}function th(e,t,n){if(Ie(e))return[];var r=e.k,o=e.v,i=e.r,a=[];return r>t&&(a=a.concat(th(e.l,t,n))),r>=t&&r<=n&&a.push({k:r,v:o}),r<=n&&(a=a.concat(th(i,t,n))),a}function Wc(e){return Ie(e)?[]:[].concat(Wc(e.l),[{k:e.k,v:e.v}],Wc(e.r))}function aS(e){return Ie(e.r)?[e.k,e.v]:aS(e.r)}function sS(e){return Ie(e.r)?e.l:nh(ct(e,{r:sS(e.r)}))}function ct(e,t){return iS(t.k!==void 0?t.k:e.k,t.v!==void 0?t.v:e.v,t.lvl!==void 0?t.lvl:e.lvl,t.l!==void 0?t.l:e.l,t.r!==void 0?t.r:e.r)}function Ym(e){return Ie(e)||e.lvl>e.r.lvl}function nh(e){var t=e.l,n=e.r,r=e.lvl;if(n.lvl>=r-1&&t.lvl>=r-1)return e;if(r>n.lvl+1){if(Ym(t))return uS(ct(e,{lvl:r-1}));if(Ie(t)||Ie(t.r))throw new Error("Unexpected empty nodes");return ct(t.r,{l:ct(t,{r:t.r.l}),r:ct(e,{l:t.r.r,lvl:r-1}),lvl:r})}if(Ym(e))return rh(ct(e,{lvl:r-1}));if(Ie(n)||Ie(n.l))throw new Error("Unexpected empty nodes");var o=n.l,i=Ym(o)?n.lvl-1:n.lvl;return ct(o,{l:ct(e,{r:o.l,lvl:r-1}),r:rh(ct(n,{l:o.r,lvl:i})),lvl:o.lvl+1})}function Gc(e,t,n){return Ie(e)?[]:lS(th(e,dr(e,t)[0],n),function(r){return{index:r.k,value:r.v}})}function lS(e,t){var n=e.length;if(n===0)return[];for(var r=t(e[0]),o=r.index,i=r.value,a=[],s=1;s<n;s++){var l=t(e[s]),u=l.index,c=l.value;a.push({start:o,end:u-1,value:i}),o=u,i=c}return a.push({start:o,end:1/0,value:i}),a}function rh(e){var t=e.r,n=e.lvl;return Ie(t)||Ie(t.r)||t.lvl!==n||t.r.lvl!==n?e:ct(t,{l:ct(e,{r:t.l}),lvl:n+1})}function uS(e){var t=e.l;return Ie(t)||t.lvl!==e.lvl?e:ct(t,{r:ct(e,{l:t.r})})}function $c(e,t,n,r){r===void 0&&(r=0);for(var o=e.length-1;r<=o;){var i=Math.floor((r+o)/2),a=n(e[i],t);if(a===0)return i;if(a===-1){if(o-r<2)return i-1;o=i-1}else{if(o===r)return i;r=i+1}}throw new Error("Failed binary finding record in array - "+e.join(",")+", searched for "+t)}function cS(e,t,n){return e[$c(e,t,n)]}var ah=pe(function(){return{recalcInProgress:R(!1)}},[],{singleton:!0});function h4(e){var t=e.size,n=e.startIndex,r=e.endIndex;return function(o){return o.start===n&&(o.end===r||o.end===1/0)&&o.value===t}}function sh(e,t){var n=e.index;return t===n?0:t<n?-1:1}function v4(e,t){var n=e.offset;return t===n?0:t<n?-1:1}function g4(e){return{index:e.index,value:e}}function fS(e,t,n,r){var o=e,i=0,a=0,s=0,l=0;if(t!==0){s=o[l=$c(o,t-1,sh)].offset;var u=dr(n,t-1);i=u[0],a=u[1],o.length&&o[l].size===dr(n,t)[1]&&(l-=1),o=o.slice(0,l+1)}else o=[];for(var c,f=ni(Gc(n,t,1/0));!(c=f()).done;){var v=c.value,m=v.start,d=v.value,y=m-i,w=y*a+s+y*r;o.push({offset:w,size:d,index:m}),i=m,s=w,a=d}return{offsetTree:o,lastIndex:i,lastOffset:s,lastSize:a}}function y4(e,t){var n=t[0],r=t[1],o=t[3];n.length>0&&(0,t[2])("received item sizes",n,$e.DEBUG);var i=e.sizeTree,a=i,s=0;if(r.length>0&&Ie(i)&&n.length===2){var l=n[0].size,u=n[1].size;a=r.reduce(function(m,d){return cr(cr(m,d,l),d+1,u)},a)}else{var c=function(m,d){for(var y,w=Ie(m)?0:1/0,g=ni(d);!(y=g()).done;){var h=y.value,p=h.size,b=h.startIndex,S=h.endIndex;if(w=Math.min(w,b),Ie(m))m=cr(m,0,p);else{var x=Gc(m,b-1,S+1);if(!x.some(h4(h))){for(var E,k=!1,T=!1,_=ni(x);!(E=_()).done;){var W=E.value,ee=W.start,me=W.end,we=W.value;k?(S>=ee||p===we)&&(m=eh(m,ee)):(T=we!==p,k=!0),me>S&&S>=ee&&we!==p&&(m=cr(m,S+1,we))}T&&(m=cr(m,b,p))}}}return[m,w]}(a,n);a=c[0],s=c[1]}if(a===i)return e;var f=fS(e.offsetTree,s,a,o),v=f.offsetTree;return{sizeTree:a,offsetTree:v,lastIndex:f.lastIndex,lastOffset:f.lastOffset,lastSize:f.lastSize,groupOffsetTree:r.reduce(function(m,d){return cr(m,d,Bs(d,v,o))},js()),groupIndices:r}}function Bs(e,t,n){if(t.length===0)return 0;var r=cS(t,e,sh),o=e-r.index,i=r.size*o+(o-1)*n+r.offset;return i>0?i+n:i}function dS(e,t,n){if(function(o){return o.groupIndex!==void 0}(e))return t.groupIndices[e.groupIndex]+1;var r=pS(e.index==="LAST"?n:e.index,t);return Math.max(0,r,Math.min(n,r))}function pS(e,t){if(!qc(t))return e;for(var n=0;t.groupIndices[n]<=e+n;)n++;return e+n}function qc(e){return!Ie(e.groupOffsetTree)}var b4={offsetHeight:"height",offsetWidth:"width"},Nr=pe(function(e){var t=e[0].log,n=e[1].recalcInProgress,r=$(),o=$(),i=St(o,0),a=$(),s=$(),l=R(0),u=R([]),c=R(void 0),f=R(void 0),v=R(function(S,x){return Wn(S,b4[x])}),m=R(void 0),d=R(0),y={offsetTree:[],sizeTree:js(),groupOffsetTree:js(),lastIndex:0,lastOffset:0,lastSize:0,groupIndices:[]},w=St(O(r,ae(u,t,d),ur(y4,y),Me()),y);V(O(u,X(function(S){return S.length>0}),ae(w,d),F(function(S){var x=S[0],E=S[1],k=S[2],T=x.reduce(function(_,W,ee){return cr(_,W,Bs(W,E.offsetTree,k)||ee)},js());return Q({},E,{groupIndices:x,groupOffsetTree:T})})),w),V(O(o,ae(w),X(function(S){return S[0]<S[1].lastIndex}),F(function(S){var x=S[1];return[{startIndex:S[0],endIndex:x.lastIndex,size:x.lastSize}]})),r),V(c,f);var g=St(O(c,F(function(S){return S===void 0})),!0);V(O(f,X(function(S){return S!==void 0&&Ie(kn(w).sizeTree)}),F(function(S){return[{startIndex:0,endIndex:0,size:S}]})),r);var h=Ht(O(r,ae(w),ur(function(S,x){var E=x[1];return{changed:E!==S.sizes,sizes:E}},{changed:!1,sizes:y}),F(function(S){return S.changed})));ue(O(l,ur(function(S,x){return{diff:S.prev-x,prev:x}},{diff:0,prev:0}),F(function(S){return S.diff})),function(S){S>0?(de(n,!0),de(a,S)):S<0&&de(s,S)}),ue(O(l,ae(t)),function(S){S[0]<0&&(0,S[1])("`firstItemIndex` prop should not be set to less than zero. If you don\'t know the total count, just use a very high value",{firstItemIndex:l},$e.ERROR)});var p=Ht(a);V(O(a,ae(w),F(function(S){var x=S[0],E=S[1];if(E.groupIndices.length>0)throw new Error("Virtuoso: prepending items does not work with groups");return Wc(E.sizeTree).reduce(function(k,T){var _=T.k,W=T.v;return{ranges:[].concat(k.ranges,[{startIndex:k.prevIndex,endIndex:_+x-1,size:k.prevSize}]),prevIndex:_+x,prevSize:W}},{ranges:[],prevIndex:0,prevSize:E.lastSize}).ranges})),r);var b=Ht(O(s,ae(w,d),F(function(S){return Bs(-S[0],S[1].offsetTree,S[2])})));return V(O(s,ae(w,d),F(function(S){var x=S[0],E=S[1],k=S[2];if(E.groupIndices.length>0)throw new Error("Virtuoso: shifting items does not work with groups");var T=Wc(E.sizeTree).reduce(function(_,W){var ee=W.v;return cr(_,Math.max(0,W.k+x),ee)},js());return Q({},E,{sizeTree:T},fS(E.offsetTree,0,T,k))})),w),{data:m,totalCount:o,sizeRanges:r,groupIndices:u,defaultItemSize:f,fixedItemSize:c,unshiftWith:a,shiftWith:s,shiftWithOffset:b,beforeUnshiftWith:p,firstItemIndex:l,gap:d,sizes:w,listRefresh:h,statefulTotalCount:i,trackItemSizes:g,itemSize:v}},Te(go,ah),{singleton:!0}),w4=typeof document<"u"&&"scrollBehavior"in document.documentElement.style;function mS(e){var t=typeof e=="number"?{index:e}:e;return t.align||(t.align="start"),t.behavior&&w4||(t.behavior="auto"),t.offset||(t.offset=0),t}var Vs=pe(function(e){var t=e[0],n=t.sizes,r=t.totalCount,o=t.listRefresh,i=t.gap,a=e[1],s=a.scrollingInProgress,l=a.viewportHeight,u=a.scrollTo,c=a.smoothScrollTargetReached,f=a.headerHeight,v=a.footerHeight,m=a.fixedHeaderHeight,d=a.fixedFooterHeight,y=e[2].log,w=$(),g=R(0),h=null,p=null,b=null;function S(){h&&(h(),h=null),b&&(b(),b=null),p&&(clearTimeout(p),p=null),de(s,!1)}return V(O(w,ae(n,l,r,g,f,v,y),ae(i,m,d),F(function(x){var E=x[0],k=E[0],T=E[1],_=E[2],W=E[3],ee=E[4],me=E[5],we=E[6],H=E[7],C=x[1],L=x[2],q=x[3],te=mS(k),be=te.align,Ue=te.behavior,nt=te.offset,on=W-1,N=dS(te,T,on),K=Bs(N,T.offsetTree,C)+me;be==="end"?(K+=L+dr(T.sizeTree,N)[1]-_+q,N===on&&(K+=we)):be==="center"?K+=(L+dr(T.sizeTree,N)[1]-_+q)/2:K-=ee,nt&&(K+=nt);var rt=function(Nt){S(),Nt?(H("retrying to scroll to",{location:k},$e.DEBUG),de(w,k)):H("list did not change, scroll successful",{},$e.DEBUG)};if(S(),Ue==="smooth"){var xt=!1;b=ue(o,function(Nt){xt=xt||Nt}),h=vo(c,function(){rt(xt)})}else h=vo(O(o,function(Nt){var an=setTimeout(function(){Nt(!1)},150);return function(Et){Et&&(Nt(!0),clearTimeout(an))}}),rt);return p=setTimeout(function(){S()},1200),de(s,!0),H("scrolling from index to",{index:N,top:K,behavior:Ue},$e.DEBUG),{top:K,behavior:Ue}})),u),{scrollToIndex:w,topListHeight:g}},Te(Nr,Ut,go),{singleton:!0}),Hs="up",S4={atBottom:!1,notAtBottomBecause:"NOT_SHOWING_LAST_ITEM",state:{offsetBottom:0,scrollTop:0,viewportHeight:0,scrollHeight:0}},Ws=pe(function(e){var t=e[0],n=t.scrollContainerState,r=t.scrollTop,o=t.viewportHeight,i=t.headerHeight,a=t.footerHeight,s=t.scrollBy,l=R(!1),u=R(!0),c=$(),f=$(),v=R(4),m=R(0),d=St(O(Qm(O(ie(r),As(1),Rr(!0)),O(ie(r),As(1),Rr(!1),Km(100))),Me()),!1),y=St(O(Qm(O(s,Rr(!0)),O(s,Rr(!1),Km(200))),Me()),!1);V(O(tt(ie(r),ie(m)),F(function(b){return b[0]<=b[1]}),Me()),u),V(O(u,ti(50)),f);var w=Ht(O(tt(n,ie(o),ie(i),ie(a),ie(v)),ur(function(b,S){var x,E,k=S[0],T=k.scrollTop,_=k.scrollHeight,W=S[1],ee={viewportHeight:W,scrollTop:T,scrollHeight:_};return T+W-_>-S[4]?(T>b.state.scrollTop?(x="SCROLLED_DOWN",E=b.state.scrollTop-T):(x="SIZE_DECREASED",E=b.state.scrollTop-T||b.scrollTopDelta),{atBottom:!0,state:ee,atBottomBecause:x,scrollTopDelta:E}):{atBottom:!1,notAtBottomBecause:ee.scrollHeight>b.state.scrollHeight?"SIZE_INCREASED":W<b.state.viewportHeight?"VIEWPORT_HEIGHT_DECREASING":T<b.state.scrollTop?"SCROLLING_UPWARDS":"NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM",state:ee}},S4),Me(function(b,S){return b&&b.atBottom===S.atBottom}))),g=St(O(n,ur(function(b,S){var x=S.scrollTop,E=S.scrollHeight,k=S.viewportHeight;return rS(b.scrollHeight,E)?{scrollTop:x,scrollHeight:E,jump:0,changed:!1}:b.scrollTop!==x&&E-(x+k)<1?{scrollHeight:E,scrollTop:x,jump:b.scrollTop-x,changed:!0}:{scrollHeight:E,scrollTop:x,jump:0,changed:!0}},{scrollHeight:0,jump:0,scrollTop:0,changed:!1}),X(function(b){return b.changed}),F(function(b){return b.jump})),0);V(O(w,F(function(b){return b.atBottom})),l),V(O(l,ti(50)),c);var h=R("down");V(O(n,F(function(b){return b.scrollTop}),Me(),ur(function(b,S){return kn(y)?{direction:b.direction,prevScrollTop:S}:{direction:S<b.prevScrollTop?Hs:"down",prevScrollTop:S}},{direction:"down",prevScrollTop:0}),F(function(b){return b.direction})),h),V(O(n,ti(50),Rr("none")),h);var p=R(0);return V(O(d,X(function(b){return!b}),Rr(0)),p),V(O(r,ti(100),ae(d),X(function(b){return!!b[1]}),ur(function(b,S){return[b[1],S[0]]},[0,0]),F(function(b){return b[1]-b[0]})),p),{isScrolling:d,isAtTop:u,isAtBottom:l,atBottomState:w,atTopStateChange:f,atBottomStateChange:c,scrollDirection:h,atBottomThreshold:v,atTopThreshold:m,scrollVelocity:p,lastJumpDueToItemResize:g}},Te(Ut)),ri=pe(function(e){var t=e[0].log,n=R(!1),r=Ht(O(n,X(function(o){return o}),Me()));return ue(n,function(o){o&&kn(t)("props updated",{},$e.DEBUG)}),{propsReady:n,didMount:r}},Te(go),{singleton:!0}),lh=pe(function(e){var t=e[0],n=t.sizes,r=t.listRefresh,o=t.defaultItemSize,i=e[1].scrollTop,a=e[2].scrollToIndex,s=e[3].didMount,l=R(!0),u=R(0);return V(O(s,ae(u),X(function(c){return!!c[1]}),Rr(!1)),l),ue(O(tt(r,s),ae(l,n,o),X(function(c){var f=c[1],v=c[3];return c[0][1]&&(!Ie(c[2].sizeTree)||v!==void 0)&&!f}),ae(u)),function(c){var f=c[1];setTimeout(function(){vo(i,function(){de(l,!0)}),de(a,f)})}),{scrolledToInitialItem:l,initialTopMostItemIndex:u}},Te(Nr,Ut,Vs,ri),{singleton:!0});function Ww(e){return!!e&&(e==="smooth"?"smooth":"auto")}var x4=pe(function(e){var t=e[0],n=t.totalCount,r=t.listRefresh,o=e[1],i=o.isAtBottom,a=o.atBottomState,s=e[2].scrollToIndex,l=e[3].scrolledToInitialItem,u=e[4],c=u.propsReady,f=u.didMount,v=e[5].log,m=e[6].scrollingInProgress,d=R(!1),y=$(),w=null;function g(p){de(s,{index:"LAST",align:"end",behavior:p})}function h(p){var b=vo(a,function(S){!p||S.atBottom||S.notAtBottomBecause!=="SIZE_INCREASED"||w||(kn(v)("scrolling to bottom due to increased size",{},$e.DEBUG),g("auto"))});setTimeout(b,100)}return ue(O(tt(O(ie(n),As(1)),f),ae(ie(d),i,l,m),F(function(p){var b=p[0],S=b[0],x=b[1]&&p[3],E="auto";return x&&(E=function(k,T){return typeof k=="function"?Ww(k(T)):T&&Ww(k)}(p[1],p[2]||p[4]),x=x&&!!E),{totalCount:S,shouldFollow:x,followOutputBehavior:E}}),X(function(p){return p.shouldFollow})),function(p){var b=p.totalCount,S=p.followOutputBehavior;w&&(w(),w=null),w=vo(r,function(){kn(v)("following output to ",{totalCount:b},$e.DEBUG),g(S),w=null})}),ue(O(tt(ie(d),n,c),X(function(p){return p[0]&&p[2]}),ur(function(p,b){var S=b[1];return{refreshed:p.value===S,value:S}},{refreshed:!1,value:0}),X(function(p){return p.refreshed}),ae(d,n)),function(p){h(p[1]!==!1)}),ue(y,function(){h(kn(d)!==!1)}),ue(tt(ie(d),a),function(p){var b=p[1];p[0]&&!b.atBottom&&b.notAtBottomBecause==="VIEWPORT_HEIGHT_DECREASING"&&g("auto")}),{followOutput:d,autoscrollToBottom:y}},Te(Nr,Ws,Vs,lh,ri,go,Ut));function E4(e){return e.reduce(function(t,n){return t.groupIndices.push(t.totalCount),t.totalCount+=n+1,t},{totalCount:0,groupIndices:[]})}var hS=pe(function(e){var t=e[0],n=t.totalCount,r=t.groupIndices,o=t.sizes,i=e[1],a=i.scrollTop,s=i.headerHeight,l=$(),u=$(),c=Ht(O(l,F(E4)));return V(O(c,F(function(f){return f.totalCount})),n),V(O(c,F(function(f){return f.groupIndices})),r),V(O(tt(a,o,s),X(function(f){return qc(f[1])}),F(function(f){return dr(f[1].groupOffsetTree,Math.max(f[0]-f[2],0),"v")[0]}),Me(),F(function(f){return[f]})),u),{groupCounts:l,topItemsIndexes:u}},Te(Nr,Ut));function Us(e,t){return!(!e||e[0]!==t[0]||e[1]!==t[1])}function vS(e,t){return!(!e||e.startIndex!==t.startIndex||e.endIndex!==t.endIndex)}function $w(e,t,n){return typeof e=="number"?n===Hs&&t==="top"||n==="down"&&t==="bottom"?e:0:n===Hs?t==="top"?e.main:e.reverse:t==="bottom"?e.main:e.reverse}function Gw(e,t){return typeof e=="number"?e:e[t]||0}var uh=pe(function(e){var t=e[0],n=t.scrollTop,r=t.viewportHeight,o=t.deviation,i=t.headerHeight,a=t.fixedHeaderHeight,s=$(),l=R(0),u=R(0),c=R(0),f=St(O(tt(ie(n),ie(r),ie(i),ie(s,Us),ie(c),ie(l),ie(a),ie(o),ie(u)),F(function(v){var m=v[0],d=v[1],y=v[2],w=v[3],g=w[0],h=w[1],p=v[4],b=v[6],S=v[7],x=v[8],E=m-S,k=v[5]+b,T=Math.max(y-E,0),_="none",W=Gw(x,"top"),ee=Gw(x,"bottom");return g-=S,h+=y+b,(g+=y+b)>m+k-W&&(_=Hs),(h-=S)<m-T+d+ee&&(_="down"),_!=="none"?[Math.max(E-y-$w(p,"top",_)-W,0),E-T-b+d+$w(p,"bottom",_)+ee]:null}),X(function(v){return v!=null}),Me(Us)),[0,0]);return{listBoundary:s,overscan:c,topListHeight:l,increaseViewportBy:u,visibleRange:f}},Te(Ut),{singleton:!0}),qw={items:[],topItems:[],offsetTop:0,offsetBottom:0,top:0,bottom:0,topListHeight:0,totalCount:0,firstItemIndex:0};function Kw(e,t,n){if(e.length===0)return[];if(!qc(t))return e.map(function(c){return Q({},c,{index:c.index+n,originalIndex:c.index})});for(var r,o=[],i=Gc(t.groupOffsetTree,e[0].index,e[e.length-1].index),a=void 0,s=0,l=ni(e);!(r=l()).done;){var u=r.value;(!a||a.end<u.index)&&(a=i.shift(),s=t.groupIndices.indexOf(a.start)),o.push(Q({},u.index===a.start?{type:"group",index:s}:{index:u.index-(s+1)+n,groupIndex:s},{size:u.size,offset:u.offset,originalIndex:u.index,data:u.data}))}return o}function Vc(e,t,n,r,o,i){var a=0,s=0;if(e.length>0){a=e[0].offset;var l=e[e.length-1];s=l.offset+l.size}var u=n-o.lastIndex,c=a,f=o.lastOffset+u*o.lastSize+(u-1)*r-s;return{items:Kw(e,o,i),topItems:Kw(t,o,i),topListHeight:t.reduce(function(v,m){return m.size+v},0),offsetTop:a,offsetBottom:f,top:c,bottom:s,totalCount:n,firstItemIndex:i}}var fa=pe(function(e){var t=e[0],n=t.sizes,r=t.totalCount,o=t.data,i=t.firstItemIndex,a=t.gap,s=e[1],l=e[2],u=l.visibleRange,c=l.listBoundary,f=l.topListHeight,v=e[3],m=v.scrolledToInitialItem,d=v.initialTopMostItemIndex,y=e[4].topListHeight,w=e[5],g=e[6].didMount,h=e[7].recalcInProgress,p=R([]),b=$();V(s.topItemsIndexes,p);var S=St(O(tt(g,h,ie(u,Us),ie(r),ie(n),ie(d),m,ie(p),ie(i),ie(a),o),X(function(x){return x[0]&&!x[1]}),F(function(x){var E=x[2],k=E[0],T=E[1],_=x[3],W=x[5],ee=x[6],me=x[7],we=x[8],H=x[9],C=x[10],L=x[4],q=L.sizeTree,te=L.offsetTree;if(_===0||k===0&&T===0)return Q({},qw,{totalCount:_});if(Ie(q))return Vc(function(se,ft,ot){if(qc(ft)){var z=pS(se,ft);return[{index:dr(ft.groupOffsetTree,z)[0],size:0,offset:0},{index:z,size:0,offset:0,data:ot&&ot[0]}]}return[{index:se,size:0,offset:0,data:ot&&ot[0]}]}(function(se,ft){return typeof se=="number"?se:se.index==="LAST"?ft-1:se.index}(W,_),L,C),[],_,H,L,we);var be=[];if(me.length>0)for(var Ue,nt=me[0],on=me[me.length-1],N=0,K=ni(Gc(q,nt,on));!(Ue=K()).done;)for(var rt=Ue.value,xt=rt.value,Nt=Math.max(rt.start,nt),an=Math.min(rt.end,on),Et=Nt;Et<=an;Et++)be.push({index:Et,size:xt,offset:N,data:C&&C[Et]}),N+=xt;if(!ee)return Vc([],be,_,H,L,we);var sn=me.length>0?me[me.length-1]+1:0,Vt=function(se,ft,ot,z){return z===void 0&&(z=0),z>0&&(ft=Math.max(ft,cS(se,z,sh).offset)),lS((fe=ot,qe=$c(Lt=se,ft,ne=v4),dt=$c(Lt,fe,ne,qe),Lt.slice(qe,dt+1)),g4);var Lt,fe,ne,qe,dt}(te,k,T,sn);if(Vt.length===0)return null;var Wt=_-1;return Vc(la([],function(se){for(var ft,ot=ni(Vt);!(ft=ot()).done;){var z=ft.value,Lt=z.value,fe=Lt.offset,ne=z.start,qe=Lt.size;if(Lt.offset<k){var dt=(ne+=Math.floor((k-Lt.offset+H)/(qe+H)))-z.start;fe+=dt*qe+dt*H}ne<sn&&(fe+=(sn-ne)*qe,ne=sn);for(var Pr=Math.min(z.end,Wt),Tn=ne;Tn<=Pr&&!(fe>=T);Tn++)se.push({index:Tn,size:qe,offset:fe,data:C&&C[Tn]}),fe+=qe+H}}),be,_,H,L,we)}),X(function(x){return x!==null}),Me()),qw);return V(O(o,X(function(x){return x!==void 0}),F(function(x){return x.length})),r),V(O(S,F(function(x){return x.topListHeight})),y),V(y,f),V(O(S,F(function(x){return[x.top,x.bottom]})),c),V(O(S,F(function(x){return x.items})),b),Q({listState:S,topItemsIndexes:p,endReached:Ht(O(S,X(function(x){return x.items.length>0}),ae(r,o),X(function(x){var E=x[0].items;return E[E.length-1].originalIndex===x[1]-1}),F(function(x){return[x[1]-1,x[2]]}),Me(Us),F(function(x){return x[0]}))),startReached:Ht(O(S,ti(200),X(function(x){var E=x.items;return E.length>0&&E[0].originalIndex===x.topItems.length}),F(function(x){return x.items[0].index}),Me())),rangeChanged:Ht(O(S,X(function(x){return x.items.length>0}),F(function(x){for(var E=x.items,k=0,T=E.length-1;E[k].type==="group"&&k<T;)k++;for(;E[T].type==="group"&&T>k;)T--;return{startIndex:E[k].index,endIndex:E[T].index}}),Me(vS))),itemsRendered:b},w)},Te(Nr,hS,uh,lh,Vs,Ws,ri,ah),{singleton:!0}),k4=pe(function(e){var t=e[0],n=t.sizes,r=t.firstItemIndex,o=t.data,i=t.gap,a=e[1].listState,s=e[2].didMount,l=R(0);return V(O(s,ae(l),X(function(u){return u[1]!==0}),ae(n,r,i,o),F(function(u){var c=u[0][1],f=u[1],v=u[2],m=u[3],d=u[4],y=d===void 0?[]:d,w=0;if(f.groupIndices.length>0)for(var g,h=ni(f.groupIndices);!((g=h()).done||g.value-w>=c);)w++;var p=c+w;return Vc(Array.from({length:p}).map(function(b,S){return{index:S,size:0,offset:0,data:y[S]}}),[],p,m,f,v)})),a),{initialItemCount:l}},Te(Nr,fa,ri),{singleton:!0}),gS=pe(function(e){var t=e[0].scrollVelocity,n=R(!1),r=$(),o=R(!1);return V(O(t,ae(o,n,r),X(function(i){return!!i[1]}),F(function(i){var a=i[0],s=i[1],l=i[2],u=i[3],c=s.enter;if(l){if((0,s.exit)(a,u))return!1}else if(c(a,u))return!0;return l}),Me()),n),ue(O(tt(n,t,r),ae(o)),function(i){var a=i[0],s=i[1];return a[0]&&s&&s.change&&s.change(a[1],a[2])}),{isSeeking:n,scrollSeekConfiguration:o,scrollVelocity:t,scrollSeekRangeChanged:r}},Te(Ws),{singleton:!0}),C4=pe(function(e){var t=e[0].topItemsIndexes,n=R(0);return V(O(n,X(function(r){return r>0}),F(function(r){return Array.from({length:r}).map(function(o,i){return i})})),t),{topItemCount:n}},Te(fa)),ch=pe(function(e){var t=e[0],n=t.footerHeight,r=t.headerHeight,o=t.fixedHeaderHeight,i=t.fixedFooterHeight,a=e[1].listState,s=$(),l=St(O(tt(n,i,r,o,a),F(function(u){var c=u[4];return u[0]+u[1]+u[2]+u[3]+c.offsetBottom+c.bottom})),0);return V(ie(l),s),{totalListHeight:l,totalListHeightChanged:s}},Te(Ut,fa),{singleton:!0});function yS(e){var t,n=!1;return function(){return n||(n=!0,t=e()),t}}var T4=yS(function(){return/iP(ad|od|hone)/i.test(navigator.userAgent)&&/WebKit/i.test(navigator.userAgent)}),I4=pe(function(e){var t=e[0],n=t.scrollBy,r=t.scrollTop,o=t.deviation,i=t.scrollingInProgress,a=e[1],s=a.isScrolling,l=a.isAtBottom,u=a.scrollDirection,c=e[3],f=c.beforeUnshiftWith,v=c.shiftWithOffset,m=c.sizes,d=c.gap,y=e[4].log,w=e[5].recalcInProgress,g=Ht(O(e[2].listState,ae(a.lastJumpDueToItemResize),ur(function(p,b){var S=p[1],x=b[0],E=x.items,k=x.totalCount,T=x.bottom+x.offsetBottom,_=0;return p[2]===k&&S.length>0&&E.length>0&&(E[0].originalIndex===0&&S[0].originalIndex===0||(_=T-p[3])!=0&&(_+=b[1])),[_,E,k,T]},[0,[],0,0]),X(function(p){return p[0]!==0}),ae(r,u,i,l,y),X(function(p){return!p[3]&&p[1]!==0&&p[2]===Hs}),F(function(p){var b=p[0][0];return(0,p[5])("Upward scrolling compensation",{amount:b},$e.DEBUG),b})));function h(p){p>0?(de(n,{top:-p,behavior:"auto"}),de(o,0)):(de(o,0),de(n,{top:-p,behavior:"auto"}))}return ue(O(g,ae(o,s)),function(p){var b=p[0],S=p[1];p[2]&&T4()?de(o,S-b):h(-b)}),ue(O(tt(St(s,!1),o,w),X(function(p){return!p[0]&&!p[2]&&p[1]!==0}),F(function(p){return p[1]}),ti(1)),h),V(O(v,F(function(p){return{top:-p}})),n),ue(O(f,ae(m,d),F(function(p){var b=p[0];return b*p[1].lastSize+b*p[2]})),function(p){de(o,p),requestAnimationFrame(function(){de(n,{top:p}),requestAnimationFrame(function(){de(o,0),de(w,!1)})})}),{deviation:o}},Te(Ut,Ws,fa,Nr,go,ah)),O4=pe(function(e){var t=e[0].totalListHeight,n=e[1].didMount,r=e[2].scrollTo,o=R(0);return ue(O(n,ae(o),X(function(i){return i[1]!==0}),F(function(i){return{top:i[1]}})),function(i){vo(O(t,X(function(a){return a!==0})),function(){setTimeout(function(){de(r,i)})})}),{initialScrollTop:o}},Te(ch,ri,Ut),{singleton:!0}),_4=pe(function(e){var t=e[0].viewportHeight,n=e[1].totalListHeight,r=R(!1);return{alignToBottom:r,paddingTopAddition:St(O(tt(r,t,n),X(function(o){return o[0]}),F(function(o){return Math.max(0,o[1]-o[2])}),Me()),0)}},Te(Ut,ch),{singleton:!0}),bS=pe(function(e){var t=e[0],n=t.scrollTo,r=t.scrollContainerState,o=$(),i=$(),a=$(),s=R(!1),l=R(void 0);return V(O(tt(o,i),F(function(u){var c=u[0],f=c.viewportHeight,v=c.scrollHeight;return{scrollTop:Math.max(0,c.scrollTop-u[1].offsetTop),scrollHeight:v,viewportHeight:f}})),r),V(O(n,ae(i),F(function(u){var c=u[0];return Q({},c,{top:c.top+u[1].offsetTop})})),a),{useWindowScroll:s,customScrollParent:l,windowScrollContainerState:o,windowViewportRect:i,windowScrollTo:a}},Te(Ut)),M4=["done","behavior","align"],R4=pe(function(e){var t=e[0],n=t.sizes,r=t.totalCount,o=t.gap,i=e[1],a=i.scrollTop,s=i.viewportHeight,l=i.headerHeight,u=i.fixedHeaderHeight,c=i.fixedFooterHeight,f=i.scrollingInProgress,v=e[2].scrollToIndex,m=$();return V(O(m,ae(n,s,r,l,u,c,a),ae(o),F(function(d){var y=d[0],w=y[0],g=y[1],h=y[2],p=y[3],b=y[4],S=y[5],x=y[6],E=y[7],k=d[1],T=w.done,_=w.behavior,W=w.align,ee=ca(w,M4),me=null,we=dS(w,g,p-1),H=Bs(we,g.offsetTree,k)+b+S;return H<E+S?me=Q({},ee,{behavior:_,align:W??"start"}):H+dr(g.sizeTree,we)[1]>E+h-x&&(me=Q({},ee,{behavior:_,align:W??"end"})),me?T&&vo(O(f,As(1),X(function(C){return C===!1})),T):T&&T(),me}),X(function(d){return d!==null})),v),{scrollIntoView:m}},Te(Nr,Ut,Vs,fa,go),{singleton:!0}),N4=["listState","topItemsIndexes"],L4=pe(function(e){return Q({},e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8])},Te(uh,k4,ri,gS,ch,O4,_4,bS,R4)),wS=pe(function(e){var t=e[0],n=t.totalCount,r=t.sizeRanges,o=t.fixedItemSize,i=t.defaultItemSize,a=t.trackItemSizes,s=t.itemSize,l=t.data,u=t.firstItemIndex,c=t.groupIndices,f=t.statefulTotalCount,v=t.gap,m=e[1],d=m.initialTopMostItemIndex,y=m.scrolledToInitialItem,w=e[2],g=e[3],h=e[4],p=h.listState,b=h.topItemsIndexes,S=ca(h,N4),x=e[5].scrollToIndex,E=e[7].topItemCount,k=e[8].groupCounts,T=e[9],_=e[10];return V(S.rangeChanged,T.scrollSeekRangeChanged),V(O(T.windowViewportRect,F(function(W){return W.visibleHeight})),w.viewportHeight),Q({totalCount:n,data:l,firstItemIndex:u,sizeRanges:r,initialTopMostItemIndex:d,scrolledToInitialItem:y,topItemsIndexes:b,topItemCount:E,groupCounts:k,fixedItemHeight:o,defaultItemHeight:i,gap:v},g,{statefulTotalCount:f,listState:p,scrollToIndex:x,trackItemSizes:a,itemSize:s,groupIndices:c},S,T,w,_)},Te(Nr,lh,Ut,x4,fa,Vs,I4,C4,hS,L4,go)),SS=yS(function(){if(typeof document>"u")return"sticky";var e=document.createElement("div");return e.style.position="-webkit-sticky",e.style.position==="-webkit-sticky"?"-webkit-sticky":"sticky"});function fh(e,t){var n=(0,G.useRef)(null),r=(0,G.useCallback)(function(l){if(l!==null&&l.offsetParent){var u,c,f=l.getBoundingClientRect(),v=f.width;if(t){var m=t.getBoundingClientRect(),d=f.top-m.top;u=m.height-Math.max(0,d),c=d+t.scrollTop}else u=window.innerHeight-Math.max(0,f.top),c=f.top+window.pageYOffset;n.current={offsetTop:c,visibleHeight:u,visibleWidth:v},e(n.current)}},[e,t]),o=ih(r),i=o.callbackRef,a=o.ref,s=(0,G.useCallback)(function(){r(a.current)},[r,a]);return(0,G.useEffect)(function(){if(t){t.addEventListener("scroll",s);var l=new ResizeObserver(s);return l.observe(t),function(){t.removeEventListener("scroll",s),l.unobserve(t)}}return window.addEventListener("scroll",s),window.addEventListener("resize",s),function(){window.removeEventListener("scroll",s),window.removeEventListener("resize",s)}},[s,t]),i}var Kc=D.createContext(void 0),xS=D.createContext(void 0),P4=["placeholder"],A4=["style","children"],F4=["style","children"];function dh(e){return e}var j4=pe(function(){var e=R(function(l){return"Item "+l}),t=R(null),n=R(function(l){return"Group "+l}),r=R({}),o=R(dh),i=R("div"),a=R(ho),s=function(l,u){return u===void 0&&(u=null),St(O(r,F(function(c){return c[l]}),Me()),u)};return{context:t,itemContent:e,groupContent:n,components:r,computeItemKey:o,headerFooterTag:i,scrollerRef:a,FooterComponent:s("Footer"),HeaderComponent:s("Header"),TopItemListComponent:s("TopItemList"),ListComponent:s("List","div"),ItemComponent:s("Item","div"),GroupComponent:s("Group","div"),ScrollerComponent:s("Scroller","div"),EmptyPlaceholder:s("EmptyPlaceholder"),ScrollSeekPlaceholder:s("ScrollSeekPlaceholder")}});function ua(e,t){var n=$();return ue(n,function(){return console.warn("react-virtuoso: You are using a deprecated property. "+t,"color: red;","color: inherit;","color: blue;")}),V(n,e),n}var z4=pe(function(e){var t=e[0],n=e[1],r={item:ua(n.itemContent,"Rename the %citem%c prop to %citemContent."),group:ua(n.groupContent,"Rename the %cgroup%c prop to %cgroupContent."),topItems:ua(t.topItemCount,"Rename the %ctopItems%c prop to %ctopItemCount."),itemHeight:ua(t.fixedItemHeight,"Rename the %citemHeight%c prop to %cfixedItemHeight."),scrollingStateChange:ua(t.isScrolling,"Rename the %cscrollingStateChange%c prop to %cisScrolling."),adjustForPrependedItems:$(),maxHeightCacheSize:$(),footer:$(),header:$(),HeaderContainer:$(),FooterContainer:$(),ItemContainer:$(),ScrollContainer:$(),GroupContainer:$(),ListContainer:$(),emptyComponent:$(),scrollSeek:$()};function o(i,a,s){V(O(i,ae(n.components),F(function(l){var u,c=l[0],f=l[1];return console.warn("react-virtuoso: "+s+" property is deprecated. Pass components."+a+" instead."),Q({},f,((u={})[a]=c,u))})),n.components)}return ue(r.adjustForPrependedItems,function(){console.warn("react-virtuoso: adjustForPrependedItems is no longer supported. Use the firstItemIndex property instead - https://virtuoso.dev/prepend-items.","color: red;","color: inherit;","color: blue;")}),ue(r.maxHeightCacheSize,function(){console.warn("react-virtuoso: maxHeightCacheSize is no longer necessary. Setting it has no effect - remove it from your code.")}),ue(r.HeaderContainer,function(){console.warn("react-virtuoso: HeaderContainer is deprecated. Use headerFooterTag if you want to change the wrapper of the header component and pass components.Header to change its contents.")}),ue(r.FooterContainer,function(){console.warn("react-virtuoso: FooterContainer is deprecated. Use headerFooterTag if you want to change the wrapper of the footer component and pass components.Footer to change its contents.")}),ue(r.scrollSeek,function(i){var a=i.placeholder,s=ca(i,P4);console.warn("react-virtuoso: scrollSeek property is deprecated. Pass scrollSeekConfiguration and specify the placeholder in components.ScrollSeekPlaceholder instead."),de(n.components,Q({},kn(n.components),{ScrollSeekPlaceholder:a})),de(t.scrollSeekConfiguration,s)}),o(r.footer,"Footer","footer"),o(r.header,"Header","header"),o(r.ItemContainer,"Item","ItemContainer"),o(r.ListContainer,"List","ListContainer"),o(r.ScrollContainer,"Scroller","ScrollContainer"),o(r.emptyComponent,"EmptyPlaceholder","emptyComponent"),o(r.GroupContainer,"Group","GroupContainer"),Q({},t,n,r)},Te(wS,j4)),D4=function(e){return D.createElement("div",{style:{height:e.height}})},B4={position:SS(),zIndex:1,overflowAnchor:"none"},H4={overflowAnchor:"none"},Qw=D.memo(function(e){var t=e.showTopList,n=t!==void 0&&t,r=ce("listState"),o=Cn("sizeRanges"),i=ce("useWindowScroll"),a=ce("customScrollParent"),s=Cn("windowScrollContainerState"),l=Cn("scrollContainerState"),u=a||i?s:l,c=ce("itemContent"),f=ce("context"),v=ce("groupContent"),m=ce("trackItemSizes"),d=ce("itemSize"),y=ce("log"),w=Cn("gap"),g=nS(o,d,m,n?ho:u,y,w,a).callbackRef,h=D.useState(0),p=h[0],b=h[1];hh("deviation",function(H){p!==H&&b(H)});var S=ce("EmptyPlaceholder"),x=ce("ScrollSeekPlaceholder")||D4,E=ce("ListComponent"),k=ce("ItemComponent"),T=ce("GroupComponent"),_=ce("computeItemKey"),W=ce("isSeeking"),ee=ce("groupIndices").length>0,me=ce("paddingTopAddition"),we=n?{}:{boxSizing:"border-box",paddingTop:r.offsetTop+me,paddingBottom:r.offsetBottom,marginTop:p};return!n&&r.totalCount===0&&S?(0,G.createElement)(S,He(S,f)):(0,G.createElement)(E,Q({},He(E,f),{ref:g,style:we,"data-test-id":n?"virtuoso-top-item-list":"virtuoso-item-list"}),(n?r.topItems:r.items).map(function(H){var C=H.originalIndex,L=_(C+r.firstItemIndex,H.data,f);return W?(0,G.createElement)(x,Q({},He(x,f),{key:L,index:H.index,height:H.size,type:H.type||"item"},H.type==="group"?{}:{groupIndex:H.groupIndex})):H.type==="group"?(0,G.createElement)(T,Q({},He(T,f),{key:L,"data-index":C,"data-known-size":H.size,"data-item-index":H.index,style:B4}),v(H.index)):(0,G.createElement)(k,Q({},He(k,f),{key:L,"data-index":C,"data-known-size":H.size,"data-item-index":H.index,"data-item-group-index":H.groupIndex,style:H4}),ee?c(H.index,H.groupIndex,H.data,f):c(H.index,H.data,f))}))}),U4={height:"100%",outline:"none",overflowY:"auto",position:"relative",WebkitOverflowScrolling:"touch"},da={width:"100%",height:"100%",position:"absolute",top:0},V4={width:"100%",position:SS(),top:0};function He(e,t){if(typeof e!="string")return{context:t}}var W4=D.memo(function(){var e=ce("HeaderComponent"),t=Cn("headerHeight"),n=ce("headerFooterTag"),r=fr(function(i){return t(Wn(i,"height"))}),o=ce("context");return e?(0,G.createElement)(n,{ref:r},(0,G.createElement)(e,He(e,o))):null}),$4=D.memo(function(){var e=ce("FooterComponent"),t=Cn("footerHeight"),n=ce("headerFooterTag"),r=fr(function(i){return t(Wn(i,"height"))}),o=ce("context");return e?(0,G.createElement)(n,{ref:r},(0,G.createElement)(e,He(e,o))):null});function ph(e){var t=e.usePublisher,n=e.useEmitter,r=e.useEmitterValue;return D.memo(function(o){var i=o.style,a=o.children,s=ca(o,A4),l=t("scrollContainerState"),u=r("ScrollerComponent"),c=t("smoothScrollTargetReached"),f=r("scrollerRef"),v=r("context"),m=oS(l,c,u,f),d=m.scrollerRef,y=m.scrollByCallback;return n("scrollTo",m.scrollToCallback),n("scrollBy",y),(0,G.createElement)(u,Q({ref:d,style:Q({},U4,i),"data-test-id":"virtuoso-scroller","data-virtuoso-scroller":!0,tabIndex:0},s,He(u,v)),a)})}function mh(e){var t=e.usePublisher,n=e.useEmitter,r=e.useEmitterValue;return D.memo(function(o){var i=o.style,a=o.children,s=ca(o,F4),l=t("windowScrollContainerState"),u=r("ScrollerComponent"),c=t("smoothScrollTargetReached"),f=r("totalListHeight"),v=r("deviation"),m=r("customScrollParent"),d=r("context"),y=oS(l,c,u,ho,m),w=y.scrollerRef,g=y.scrollByCallback,h=y.scrollToCallback;return p4(function(){return w.current=m||window,function(){w.current=null}},[w,m]),n("windowScrollTo",h),n("scrollBy",g),(0,G.createElement)(u,Q({style:Q({position:"relative"},i,f!==0?{height:f+v}:{}),"data-virtuoso-scroller":!0},s,He(u,d)),a)})}var G4=function(e){var t=e.children,n=(0,G.useContext)(Kc),r=Cn("viewportHeight"),o=Cn("fixedItemHeight"),i=fr(sa(r,function(a){return Wn(a,"height")}));return D.useEffect(function(){n&&(r(n.viewportHeight),o(n.itemHeight))},[n,r,o]),D.createElement("div",{style:da,ref:i,"data-viewport-type":"element"},t)},q4=function(e){var t=e.children,n=(0,G.useContext)(Kc),r=Cn("windowViewportRect"),o=Cn("fixedItemHeight"),i=ce("customScrollParent"),a=fh(r,i);return D.useEffect(function(){n&&(o(n.itemHeight),r({offsetTop:0,visibleHeight:n.viewportHeight,visibleWidth:100}))},[n,r,o]),D.createElement("div",{ref:a,style:da,"data-viewport-type":"window"},t)},K4=function(e){var t=e.children,n=ce("TopItemListComponent"),r=ce("headerHeight"),o=Q({},V4,{marginTop:r+"px"}),i=ce("context");return(0,G.createElement)(n||"div",{style:o,context:i},t)},Qc=Uc(z4,{required:{},optional:{context:"context",followOutput:"followOutput",firstItemIndex:"firstItemIndex",itemContent:"itemContent",groupContent:"groupContent",overscan:"overscan",increaseViewportBy:"increaseViewportBy",totalCount:"totalCount",topItemCount:"topItemCount",initialTopMostItemIndex:"initialTopMostItemIndex",components:"components",groupCounts:"groupCounts",atBottomThreshold:"atBottomThreshold",atTopThreshold:"atTopThreshold",computeItemKey:"computeItemKey",defaultItemHeight:"defaultItemHeight",fixedItemHeight:"fixedItemHeight",itemSize:"itemSize",scrollSeekConfiguration:"scrollSeekConfiguration",headerFooterTag:"headerFooterTag",data:"data",initialItemCount:"initialItemCount",initialScrollTop:"initialScrollTop",alignToBottom:"alignToBottom",useWindowScroll:"useWindowScroll",customScrollParent:"customScrollParent",scrollerRef:"scrollerRef",logLevel:"logLevel",react18ConcurrentRendering:"react18ConcurrentRendering",item:"item",group:"group",topItems:"topItems",itemHeight:"itemHeight",scrollingStateChange:"scrollingStateChange",maxHeightCacheSize:"maxHeightCacheSize",footer:"footer",header:"header",ItemContainer:"ItemContainer",ScrollContainer:"ScrollContainer",ListContainer:"ListContainer",GroupContainer:"GroupContainer",emptyComponent:"emptyComponent",HeaderContainer:"HeaderContainer",FooterContainer:"FooterContainer",scrollSeek:"scrollSeek"},methods:{scrollToIndex:"scrollToIndex",scrollIntoView:"scrollIntoView",scrollTo:"scrollTo",scrollBy:"scrollBy",adjustForPrependedItems:"adjustForPrependedItems",autoscrollToBottom:"autoscrollToBottom"},events:{isScrolling:"isScrolling",endReached:"endReached",startReached:"startReached",rangeChanged:"rangeChanged",atBottomStateChange:"atBottomStateChange",atTopStateChange:"atTopStateChange",totalListHeightChanged:"totalListHeightChanged",itemsRendered:"itemsRendered",groupIndices:"groupIndices"}},D.memo(function(e){var t=ce("useWindowScroll"),n=ce("topItemsIndexes").length>0,r=ce("customScrollParent"),o=r||t?q4:G4;return D.createElement(r||t?Y4:Z4,Q({},e),D.createElement(o,null,D.createElement(W4,null),D.createElement(Qw,null),D.createElement($4,null)),n&&D.createElement(K4,null,D.createElement(Qw,{showTopList:!0})))})),Q4=Qc.Component,Cn=Qc.usePublisher,ce=Qc.useEmitterValue,hh=Qc.useEmitter,Z4=ph({usePublisher:Cn,useEmitterValue:ce,useEmitter:hh}),Y4=mh({usePublisher:Cn,useEmitterValue:ce,useEmitter:hh}),Zw={items:[],offsetBottom:0,offsetTop:0,top:0,bottom:0,itemHeight:0,itemWidth:0},J4={items:[{index:0}],offsetBottom:0,offsetTop:0,top:0,bottom:0,itemHeight:0,itemWidth:0},Yw=Math.round,Jw=Math.ceil,vh=Math.floor,Jm=Math.min,zs=Math.max;function Xm(e,t,n){return Array.from({length:t-e+1}).map(function(r,o){return{index:o+e,data:n?.[o+e]}})}function X4(e,t){return e&&e.column===t.column&&e.row===t.row}var eI=pe(function(e){var t=e[0],n=t.overscan,r=t.visibleRange,o=t.listBoundary,i=e[1],a=i.scrollTop,s=i.viewportHeight,l=i.scrollBy,u=i.scrollTo,c=i.smoothScrollTargetReached,f=i.scrollContainerState,v=i.footerHeight,m=i.headerHeight,d=e[2],y=e[3],w=e[4],g=w.propsReady,h=w.didMount,p=e[5],b=p.windowViewportRect,S=p.windowScrollTo,x=p.useWindowScroll,E=p.customScrollParent,k=p.windowScrollContainerState,T=e[6],_=R(0),W=R(0),ee=R(Zw),me=R({height:0,width:0}),we=R({height:0,width:0}),H=$(),C=$(),L=R(0),q=R(void 0),te=R({row:0,column:0});V(O(tt(h,W,q),X(function(N){return N[1]!==0}),F(function(N){return{items:Xm(0,N[1]-1,N[2]),top:0,bottom:0,offsetBottom:0,offsetTop:0,itemHeight:0,itemWidth:0}})),ee),V(O(tt(ie(_),r,ie(te,X4),ie(we,function(N,K){return N&&N.width===K.width&&N.height===K.height}),q),ae(me),F(function(N){var K=N[0],rt=K[0],xt=K[1],Nt=xt[0],an=xt[1],Et=K[2],sn=K[3],Vt=K[4],Wt=N[1],se=Et.row,ft=Et.column,ot=sn.height,z=sn.width,Lt=Wt.width;if(rt===0||Lt===0)return Zw;if(z===0)return function(Z){return Q({},J4,{items:Z})}(Xm(0,0,Vt));var fe=ES(Lt,z,ft),ne=fe*vh((Nt+se)/(ot+se)),qe=fe*Jw((an+se)/(ot+se))-1;qe=Jm(rt-1,zs(qe,fe-1));var dt=Xm(ne=Jm(qe,zs(0,ne)),qe,Vt),Pr=Xw(Wt,Et,sn,dt),Tn=Pr.top,M=Pr.bottom,B=Jw(rt/fe);return{items:dt,offsetTop:Tn,offsetBottom:B*ot+(B-1)*se-M,top:Tn,bottom:M,itemHeight:ot,itemWidth:z}})),ee),V(O(q,X(function(N){return N!==void 0}),F(function(N){return N.length})),_),V(O(me,F(function(N){return N.height})),s),V(O(tt(me,we,ee,te),F(function(N){var K=Xw(N[0],N[3],N[1],N[2].items);return[K.top,K.bottom]}),Me(Us)),o);var be=Ht(O(ie(ee),X(function(N){return N.items.length>0}),ae(_),X(function(N){var K=N[0].items;return K[K.length-1].index===N[1]-1}),F(function(N){return N[1]-1}),Me())),Ue=Ht(O(ie(ee),X(function(N){var K=N.items;return K.length>0&&K[0].index===0}),Rr(0),Me())),nt=Ht(O(ie(ee),X(function(N){return N.items.length>0}),F(function(N){var K=N.items;return{startIndex:K[0].index,endIndex:K[K.length-1].index}}),Me(vS)));V(nt,y.scrollSeekRangeChanged),V(O(H,ae(me,we,_,te),F(function(N){var K=N[1],rt=N[2],xt=N[3],Nt=N[4],an=mS(N[0]),Et=an.align,sn=an.behavior,Vt=an.offset,Wt=an.index;Wt==="LAST"&&(Wt=xt-1);var se=oh(K,Nt,rt,Wt=zs(0,Wt,Jm(xt-1,Wt)));return Et==="end"?se=Yw(se-K.height+rt.height):Et==="center"&&(se=Yw(se-K.height/2+rt.height/2)),Vt&&(se+=Vt),{top:se,behavior:sn}})),u);var on=St(O(ee,F(function(N){return N.offsetBottom+N.bottom})),0);return V(O(b,F(function(N){return{width:N.visibleWidth,height:N.visibleHeight}})),me),Q({data:q,totalCount:_,viewportDimensions:me,itemDimensions:we,scrollTop:a,scrollHeight:C,overscan:n,scrollBy:l,scrollTo:u,scrollToIndex:H,smoothScrollTargetReached:c,windowViewportRect:b,windowScrollTo:S,useWindowScroll:x,customScrollParent:E,windowScrollContainerState:k,deviation:L,scrollContainerState:f,footerHeight:v,headerHeight:m,initialItemCount:W,gap:te},y,{gridState:ee,totalListHeight:on},d,{startReached:Ue,endReached:be,rangeChanged:nt,propsReady:g},T)},Te(uh,Ut,Ws,gS,ri,bS,go));function Xw(e,t,n,r){var o=n.height;return o===void 0||r.length===0?{top:0,bottom:0}:{top:oh(e,t,n,r[0].index),bottom:oh(e,t,n,r[r.length-1].index)+o}}function oh(e,t,n,r){var o=ES(e.width,n.width,t.column),i=vh(r/o),a=i*n.height+zs(0,i-1)*t.row;return a>0?a+t.row:a}function ES(e,t,n){return zs(1,vh((e+n)/(t+n)))}var tI=["placeholder"],nI=pe(function(){var e=R(function(u){return"Item "+u}),t=R({}),n=R(null),r=R("virtuoso-grid-item"),o=R("virtuoso-grid-list"),i=R(dh),a=R("div"),s=R(ho),l=function(u,c){return c===void 0&&(c=null),St(O(t,F(function(f){return f[u]}),Me()),c)};return{context:n,itemContent:e,components:t,computeItemKey:i,itemClassName:r,listClassName:o,headerFooterTag:a,scrollerRef:s,FooterComponent:l("Footer"),HeaderComponent:l("Header"),ListComponent:l("List","div"),ItemComponent:l("Item","div"),ScrollerComponent:l("Scroller","div"),ScrollSeekPlaceholder:l("ScrollSeekPlaceholder","div")}}),rI=pe(function(e){var t=e[0],n=e[1],r={item:ua(n.itemContent,"Rename the %citem%c prop to %citemContent."),ItemContainer:$(),ScrollContainer:$(),ListContainer:$(),emptyComponent:$(),scrollSeek:$()};function o(i,a,s){V(O(i,ae(n.components),F(function(l){var u,c=l[0],f=l[1];return console.warn("react-virtuoso: "+s+" property is deprecated. Pass components."+a+" instead."),Q({},f,((u={})[a]=c,u))})),n.components)}return ue(r.scrollSeek,function(i){var a=i.placeholder,s=ca(i,tI);console.warn("react-virtuoso: scrollSeek property is deprecated. Pass scrollSeekConfiguration and specify the placeholder in components.ScrollSeekPlaceholder instead."),de(n.components,Q({},kn(n.components),{ScrollSeekPlaceholder:a})),de(t.scrollSeekConfiguration,s)}),o(r.ItemContainer,"Item","ItemContainer"),o(r.ListContainer,"List","ListContainer"),o(r.ScrollContainer,"Scroller","ScrollContainer"),Q({},t,n,r)},Te(eI,nI)),oI=D.memo(function(){var e=ze("gridState"),t=ze("listClassName"),n=ze("itemClassName"),r=ze("itemContent"),o=ze("computeItemKey"),i=ze("isSeeking"),a=Un("scrollHeight"),s=ze("ItemComponent"),l=ze("ListComponent"),u=ze("ScrollSeekPlaceholder"),c=ze("context"),f=Un("itemDimensions"),v=Un("gap"),m=ze("log"),d=fr(function(y){a(y.parentElement.parentElement.scrollHeight);var w=y.firstChild;w&&f(w.getBoundingClientRect()),v({row:eS("row-gap",getComputedStyle(y).rowGap,m),column:eS("column-gap",getComputedStyle(y).columnGap,m)})});return(0,G.createElement)(l,Q({ref:d,className:t},He(l,c),{style:{paddingTop:e.offsetTop,paddingBottom:e.offsetBottom}}),e.items.map(function(y){var w=o(y.index,y.data,c);return i?(0,G.createElement)(u,Q({key:w},He(u,c),{index:y.index,height:e.itemHeight,width:e.itemWidth})):(0,G.createElement)(s,Q({},He(s,c),{className:n,"data-index":y.index,key:w}),r(y.index,y.data,c))}))}),iI=D.memo(function(){var e=ze("HeaderComponent"),t=Un("headerHeight"),n=ze("headerFooterTag"),r=fr(function(i){return t(Wn(i,"height"))}),o=ze("context");return e?(0,G.createElement)(n,{ref:r},(0,G.createElement)(e,He(e,o))):null}),aI=D.memo(function(){var e=ze("FooterComponent"),t=Un("footerHeight"),n=ze("headerFooterTag"),r=fr(function(i){return t(Wn(i,"height"))}),o=ze("context");return e?(0,G.createElement)(n,{ref:r},(0,G.createElement)(e,He(e,o))):null}),sI=function(e){var t=e.children,n=(0,G.useContext)(xS),r=Un("itemDimensions"),o=Un("viewportDimensions"),i=fr(function(a){o(a.getBoundingClientRect())});return D.useEffect(function(){n&&(o({height:n.viewportHeight,width:n.viewportWidth}),r({height:n.itemHeight,width:n.itemWidth}))},[n,o,r]),D.createElement("div",{style:da,ref:i},t)},lI=function(e){var t=e.children,n=(0,G.useContext)(xS),r=Un("windowViewportRect"),o=Un("itemDimensions"),i=ze("customScrollParent"),a=fh(r,i);return D.useEffect(function(){n&&(o({height:n.itemHeight,width:n.itemWidth}),r({offsetTop:0,visibleHeight:n.viewportHeight,visibleWidth:n.viewportWidth}))},[n,r,o]),D.createElement("div",{ref:a,style:da},t)},Zc=Uc(rI,{optional:{context:"context",totalCount:"totalCount",overscan:"overscan",itemContent:"itemContent",components:"components",computeItemKey:"computeItemKey",data:"data",initialItemCount:"initialItemCount",scrollSeekConfiguration:"scrollSeekConfiguration",headerFooterTag:"headerFooterTag",listClassName:"listClassName",itemClassName:"itemClassName",useWindowScroll:"useWindowScroll",customScrollParent:"customScrollParent",scrollerRef:"scrollerRef",item:"item",ItemContainer:"ItemContainer",ScrollContainer:"ScrollContainer",ListContainer:"ListContainer",scrollSeek:"scrollSeek"},methods:{scrollTo:"scrollTo",scrollBy:"scrollBy",scrollToIndex:"scrollToIndex"},events:{isScrolling:"isScrolling",endReached:"endReached",startReached:"startReached",rangeChanged:"rangeChanged",atBottomStateChange:"atBottomStateChange",atTopStateChange:"atTopStateChange"}},D.memo(function(e){var t=Q({},e),n=ze("useWindowScroll"),r=ze("customScrollParent"),o=r||n?lI:sI;return D.createElement(r||n?cI:uI,Q({},t),D.createElement(o,null,D.createElement(iI,null),D.createElement(oI,null),D.createElement(aI,null)))})),nN=Zc.Component,Un=Zc.usePublisher,ze=Zc.useEmitterValue,kS=Zc.useEmitter,uI=ph({usePublisher:Un,useEmitterValue:ze,useEmitter:kS}),cI=mh({usePublisher:Un,useEmitterValue:ze,useEmitter:kS});function eS(e,t,n){return t==="normal"||t!=null&&t.endsWith("px")||n(e+" was not resolved to pixel value correctly",t,$e.WARN),t==="normal"?0:parseInt(t??"0",10)}var fI=pe(function(){var e=R(function(l){return D.createElement("td",null,"Item $",l)}),t=R(null),n=R(null),r=R(null),o=R({}),i=R(dh),a=R(ho),s=function(l,u){return u===void 0&&(u=null),St(O(o,F(function(c){return c[l]}),Me()),u)};return{context:t,itemContent:e,fixedHeaderContent:n,fixedFooterContent:r,components:o,computeItemKey:i,scrollerRef:a,TableComponent:s("Table","table"),TableHeadComponent:s("TableHead","thead"),TableFooterComponent:s("TableFoot","tfoot"),TableBodyComponent:s("TableBody","tbody"),TableRowComponent:s("TableRow","tr"),ScrollerComponent:s("Scroller","div"),EmptyPlaceholder:s("EmptyPlaceholder"),ScrollSeekPlaceholder:s("ScrollSeekPlaceholder"),FillerRow:s("FillerRow")}}),dI=pe(function(e){return Q({},e[0],e[1])},Te(wS,fI)),pI=function(e){return D.createElement("tr",null,D.createElement("td",{style:{height:e.height}}))},mI=function(e){return D.createElement("tr",null,D.createElement("td",{style:{height:e.height,padding:0,border:0}}))},hI=D.memo(function(){var e=ye("listState"),t=Vn("sizeRanges"),n=ye("useWindowScroll"),r=ye("customScrollParent"),o=Vn("windowScrollContainerState"),i=Vn("scrollContainerState"),a=r||n?o:i,s=ye("itemContent"),l=ye("trackItemSizes"),u=nS(t,ye("itemSize"),l,a,ye("log"),void 0,r),c=u.callbackRef,f=u.ref,v=D.useState(0),m=v[0],d=v[1];gh("deviation",function(H){m!==H&&(f.current.style.marginTop=H+"px",d(H))});var y=ye("EmptyPlaceholder"),w=ye("ScrollSeekPlaceholder")||pI,g=ye("FillerRow")||mI,h=ye("TableBodyComponent"),p=ye("TableRowComponent"),b=ye("computeItemKey"),S=ye("isSeeking"),x=ye("paddingTopAddition"),E=ye("firstItemIndex"),k=ye("statefulTotalCount"),T=ye("context");if(k===0&&y)return(0,G.createElement)(y,He(y,T));var _=e.offsetTop+x+m,W=e.offsetBottom,ee=_>0?D.createElement(g,{height:_,key:"padding-top"}):null,me=W>0?D.createElement(g,{height:W,key:"padding-bottom"}):null,we=e.items.map(function(H){var C=H.originalIndex,L=b(C+E,H.data,T);return S?(0,G.createElement)(w,Q({},He(w,T),{key:L,index:H.index,height:H.size,type:H.type||"item"})):(0,G.createElement)(p,Q({},He(p,T),{key:L,"data-index":C,"data-known-size":H.size,"data-item-index":H.index,style:{overflowAnchor:"none"}}),s(H.index,H.data,T))});return(0,G.createElement)(h,Q({ref:c,"data-test-id":"virtuoso-item-list"},He(h,T)),[ee].concat(we,[me]))}),vI=function(e){var t=e.children,n=(0,G.useContext)(Kc),r=Vn("viewportHeight"),o=Vn("fixedItemHeight"),i=fr(sa(r,function(a){return Wn(a,"height")}));return D.useEffect(function(){n&&(r(n.viewportHeight),o(n.itemHeight))},[n,r,o]),D.createElement("div",{style:da,ref:i,"data-viewport-type":"element"},t)},gI=function(e){var t=e.children,n=(0,G.useContext)(Kc),r=Vn("windowViewportRect"),o=Vn("fixedItemHeight"),i=ye("customScrollParent"),a=fh(r,i);return D.useEffect(function(){n&&(o(n.itemHeight),r({offsetTop:0,visibleHeight:n.viewportHeight,visibleWidth:100}))},[n,r,o]),D.createElement("div",{ref:a,style:da,"data-viewport-type":"window"},t)},Yc=Uc(dI,{required:{},optional:{context:"context",followOutput:"followOutput",firstItemIndex:"firstItemIndex",itemContent:"itemContent",fixedHeaderContent:"fixedHeaderContent",fixedFooterContent:"fixedFooterContent",overscan:"overscan",increaseViewportBy:"increaseViewportBy",totalCount:"totalCount",topItemCount:"topItemCount",initialTopMostItemIndex:"initialTopMostItemIndex",components:"components",groupCounts:"groupCounts",atBottomThreshold:"atBottomThreshold",atTopThreshold:"atTopThreshold",computeItemKey:"computeItemKey",defaultItemHeight:"defaultItemHeight",fixedItemHeight:"fixedItemHeight",itemSize:"itemSize",scrollSeekConfiguration:"scrollSeekConfiguration",data:"data",initialItemCount:"initialItemCount",initialScrollTop:"initialScrollTop",alignToBottom:"alignToBottom",useWindowScroll:"useWindowScroll",customScrollParent:"customScrollParent",scrollerRef:"scrollerRef",logLevel:"logLevel",react18ConcurrentRendering:"react18ConcurrentRendering"},methods:{scrollToIndex:"scrollToIndex",scrollIntoView:"scrollIntoView",scrollTo:"scrollTo",scrollBy:"scrollBy"},events:{isScrolling:"isScrolling",endReached:"endReached",startReached:"startReached",rangeChanged:"rangeChanged",atBottomStateChange:"atBottomStateChange",atTopStateChange:"atTopStateChange",totalListHeightChanged:"totalListHeightChanged",itemsRendered:"itemsRendered",groupIndices:"groupIndices"}},D.memo(function(e){var t=ye("useWindowScroll"),n=ye("customScrollParent"),r=Vn("fixedHeaderHeight"),o=Vn("fixedFooterHeight"),i=ye("fixedHeaderContent"),a=ye("fixedFooterContent"),s=ye("context"),l=fr(sa(r,function(g){return Wn(g,"height")})),u=fr(sa(o,function(g){return Wn(g,"height")})),c=n||t?bI:yI,f=n||t?gI:vI,v=ye("TableComponent"),m=ye("TableHeadComponent"),d=ye("TableFooterComponent"),y=i?D.createElement(m,Q({key:"TableHead",style:{zIndex:1,position:"sticky",top:0},ref:l},He(m,s)),i()):null,w=a?D.createElement(d,Q({key:"TableFoot",style:{zIndex:1,position:"sticky",bottom:0},ref:u},He(d,s)),a()):null;return D.createElement(c,Q({},e),D.createElement(f,null,D.createElement(v,Q({style:{borderSpacing:0}},He(v,s)),[y,D.createElement(hI,{key:"TableBody"}),w])))})),rN=Yc.Component,Vn=Yc.usePublisher,ye=Yc.useEmitterValue,gh=Yc.useEmitter,yI=ph({usePublisher:Vn,useEmitterValue:ye,useEmitter:gh}),bI=mh({usePublisher:Vn,useEmitterValue:ye,useEmitter:gh}),CS=Q4;var Lr=U(Y());var TS=({children:e,"data-index":t})=>{let{selected:n,setSelected:r}=(0,Lr.useContext)(Ze),o=Dr({store:yn,keys:[e],fn:(i,[a])=>i[a]});return typeof o?.id=="number"?Lr.default.createElement("div",{className:or("ed-list-item",{"ed-list-item--odd":t%2===0,"ed-list-item--selected":n===o.id}),onClick:()=>r(o.id)},Lr.default.createElement("div",{className:"ed-list-item-icons",title:o.op},Lr.default.createElement("div",{className:or("op-icon",`op-icon-${o.kind}`),title:o.kind}),Lr.default.createElement("div",{className:or("op-icon op-icon-second",`op-icon-${o.op}`,`op-icon-${o.op}-${o.kind}`),title:o.op})),Lr.default.createElement("div",{title:o.name},o.name),Lr.default.createElement("div",{title:o.payload},o.payloadShort??o.payload)):null};var wI=()=>{let{hotkeysActive:e,setSelected:t,selected:n}=(0,Ge.useContext)(Ze),r=(0,Ge.useContext)(Wo);return rr("up",o=>{if(e){let i=n===!1?r.length-1:r.indexOf(n)-1;i<0&&(i=r.length-1),t(r[i]),o.preventDefault()}},[n,t,e,r.join("/")]),rr("down",o=>{if(e){let i=n===!1?0:r.indexOf(n)+1;i>r.length-1&&(i=0),t(r[i]),o.preventDefault()}},[n,t,e,r.join("/")]),null},IS=({width:e,height:t})=>{let n=(0,Ge.useRef)(null),r=(0,Ge.useRef)(null),[o,i]=(0,Ge.useState)(!1),a=(0,Ge.useRef)(null),[s,l]=(0,Ge.useState)(!1),u=(0,Ge.useContext)(Wo);return(0,Ge.useEffect)(()=>()=>{clearInterval(n.current),clearTimeout(a.current)},[]),(0,Ge.useEffect)(()=>{clearTimeout(a.current),o?l(!1):a.current=setTimeout(()=>l(!0),500)},[o,l]),t>0&&e>0&&u.length?Ge.default.createElement(Ge.default.Fragment,null,Ge.default.createElement(CS,{ref:r,style:{height:t,width:e},data:u,defaultItemHeight:24,initialTopMostItemIndex:999,overscan:30,atBottomStateChange:c=>{clearInterval(n.current),i(c)},components:{Item:TS},itemContent:(c,f)=>f,followOutput:"auto"}),s&&Ge.default.createElement("a",{className:"ed-btn-tobottom",onClick:()=>r.current.scrollToIndex({index:u.length-1,behavior:"auto"})},"Bottom"),Ge.default.createElement(wI,null)):null};var OS=()=>{let[e,{width:t,height:n}]=Wm();return yo.default.createElement("div",{className:"ed-table"},yo.default.createElement("div",{className:"ed-table-header"},yo.default.createElement("div",null),yo.default.createElement("div",null,"Name"),yo.default.createElement("div",null,"Payload")),yo.default.createElement("div",{className:"ed-table-body",ref:e},yo.default.createElement(IS,{width:t,height:n})))};var Wo=(0,oi.createContext)([]),Ze=(0,oi.createContext)({selected:!1,selectedTab:"",showHistory:!0,setSelected:()=>{},setSelectedTab:()=>{},hotkeysActive:!0}),Pu=()=>oi.default.createElement("div",{className:"ed-logs"},oi.default.createElement(OS,null),oi.default.createElement(Pw,null));document.head.appendChild(document.createElement("style")).append(`.ed-layout{display:flex;flex-direction:column;height:100%;}.ed-layout svg{max-height:90%}.ed-layout .ed-btn-tobottom{-webkit-user-select:none;-moz-user-select:none;user-select:none;position:absolute;cursor:pointer;background:rgb(243,243,243);border:1px solid #9c9b9b;display:block;bottom:12px;right:30px;padding:4px 8px;display:flex;align-items:center;}.ed-layout .ed-btn-tobottom:before{content:"";background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA0IEwgMTUgMjQuMDYyNSBMIDguMjE4NzUgMTcuMjgxMjUgTCA2Ljc4MTI1IDE4LjcxODc1IEwgMTUuMjgxMjUgMjcuMjE4NzUgTCAxNiAyNy45MDYyNSBMIDE2LjcxODc1IDI3LjIxODc1IEwgMjUuMjE4NzUgMTguNzE4NzUgTCAyMy43ODEyNSAxNy4yODEyNSBMIDE3IDI0LjA2MjUgTCAxNyA0IFoiLz48L3N2Zz4=);display:block;width:16px;height:16px;margin-right:8px}.ed-layout .ed-toolbar{-webkit-user-select:none;-moz-user-select:none;user-select:none;display:flex;align-items:stretch;justify-content:flex-start;height:32px;background:rgb(243,243,243);border-bottom:2px solid #d1d1d1;padding:0 4px;}.ed-layout .ed-toolbar a{cursor:pointer}.ed-layout .ed-toolbar .ed-toolbar-space{flex:1}.ed-layout .ed-toolbar .ed-toolbar-separator{width:1px;height:14px;background:#a4a4a4;align-self:center;margin:0 4px}.ed-layout .ed-toolbar .ed-toolbar-input input{font-size:12px}.ed-layout .ed-toolbar .ed-toolbar-text,.ed-layout .ed-toolbar .ed-toolbar-input{align-self:center;margin:0 8px}.ed-layout .ed-toolbar .ed-btn{width:32px;height:100%;padding:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;}.ed-layout .ed-toolbar .ed-btn svg{fill:#383838}.ed-layout .ed-toolbar .ed-btn:hover{background-color:#e6e5e5}.ed-layout .ed-toolbar .ed-tab-header{border-bottom:2px solid transparent;vertical-align:middle;line-height:32px;padding:0 10px;margin-bottom:-1px;}.ed-layout .ed-toolbar .ed-tab-header.ed-tab-header--selected{border-bottom:2px solid rgba(62,130,247,.6)}.ed-layout .ed-toolbar .ed-tab-header:hover{background-color:#e6e5e5}.ed-layout .ed-toolbar .ed-btn-disabled svg{fill:#f44336}.ed-layout .ed-body,.ed-layout .ed-logs{flex:1;height:100%}.ed-layout .ed-table{display:flex;flex-direction:column;height:100%;flex:1;}.ed-layout .ed-table .ed-table-header{display:flex;}.ed-layout .ed-table .ed-table-header>div{flex:1;border:1px solid #d1d1d1;border-top:none;border-left:none;padding:4px;text-overflow:ellipsis;overflow:hidden;box-sizing:border-box;}.ed-layout .ed-table .ed-table-header>div:nth-child(1){flex:none;width:40px}.ed-layout .ed-table .ed-table-header>div:nth-child(2){flex:none;width:140px}.ed-layout .ed-table .ed-table-body{flex:1;}.ed-layout .ed-table .ed-table-body .ed-list-item{display:flex;overflow:hidden;white-space:nowrap;box-sizing:border-box;cursor:pointer;}.ed-layout .ed-table .ed-table-body .ed-list-item.ed-list-item--odd{background-color:#f5f5f5}.ed-layout .ed-table .ed-table-body .ed-list-item:hover{background-color:#e6e5e5}.ed-layout .ed-table .ed-table-body .ed-list-item.ed-list-item--selected{background-color:#ddefff}.ed-layout .ed-table .ed-table-body .ed-list-item .ed-list-item-icons{display:flex;justify-content:center}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon{background-repeat:no-repeat;background-size:80% 80%;background-position:center;width:24px;}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon.op-icon-second{background-repeat:no-repeat;background-size:80% 80%;background-position:center;width:14px;margin-left:-4px}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-unit-create{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNSA1IEwgMTUgMTUgTCA1IDE1IEwgNSAxNyBMIDE1IDE3IEwgMTUgMjcgTCAxNyAyNyBMIDE3IDE3IEwgMjcgMTcgTCAyNyAxNSBMIDE3IDE1IEwgMTcgNSBaIi8+PC9zdmc+)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-unit-watch{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA4IEMgNy42NjQwNjMgOCAxLjI1IDE1LjM0Mzc1IDEuMjUgMTUuMzQzNzUgTCAwLjY1NjI1IDE2IEwgMS4yNSAxNi42NTYyNSBDIDEuMjUgMTYuNjU2MjUgNy4wOTc2NTYgMjMuMzI0MjE5IDE0Ljg3NSAyMy45Mzc1IEMgMTUuMjQ2MDk0IDIzLjk4NDM3NSAxNS42MTcxODggMjQgMTYgMjQgQyAxNi4zODI4MTMgMjQgMTYuNzUzOTA2IDIzLjk4NDM3NSAxNy4xMjUgMjMuOTM3NSBDIDI0LjkwMjM0NCAyMy4zMjQyMTkgMzAuNzUgMTYuNjU2MjUgMzAuNzUgMTYuNjU2MjUgTCAzMS4zNDM3NSAxNiBMIDMwLjc1IDE1LjM0Mzc1IEMgMzAuNzUgMTUuMzQzNzUgMjQuMzM1OTM4IDggMTYgOCBaIE0gMTYgMTAgQyAxOC4yMDMxMjUgMTAgMjAuMjM0Mzc1IDEwLjYwMTU2MyAyMiAxMS40MDYyNSBDIDIyLjYzNjcxOSAxMi40NjA5MzggMjMgMTMuNjc1NzgxIDIzIDE1IEMgMjMgMTguNjEzMjgxIDIwLjI4OTA2MyAyMS41ODIwMzEgMTYuNzgxMjUgMjEuOTY4NzUgQyAxNi43NjE3MTkgMjEuOTcyNjU2IDE2LjczODI4MSAyMS45NjQ4NDQgMTYuNzE4NzUgMjEuOTY4NzUgQyAxNi40ODA0NjkgMjEuOTgwNDY5IDE2LjI0MjE4OCAyMiAxNiAyMiBDIDE1LjczNDM3NSAyMiAxNS40NzY1NjMgMjEuOTg0Mzc1IDE1LjIxODc1IDIxLjk2ODc1IEMgMTEuNzEwOTM4IDIxLjU4MjAzMSA5IDE4LjYxMzI4MSA5IDE1IEMgOSAxMy42OTUzMTMgOS4zNTE1NjMgMTIuNDgwNDY5IDkuOTY4NzUgMTEuNDM3NSBMIDkuOTM3NSAxMS40Mzc1IEMgMTEuNzE4NzUgMTAuNjE3MTg4IDEzLjc3MzQzOCAxMCAxNiAxMCBaIE0gMTYgMTIgQyAxNC4zNDM3NSAxMiAxMyAxMy4zNDM3NSAxMyAxNSBDIDEzIDE2LjY1NjI1IDE0LjM0Mzc1IDE4IDE2IDE4IEMgMTcuNjU2MjUgMTggMTkgMTYuNjU2MjUgMTkgMTUgQyAxOSAxMy4zNDM3NSAxNy42NTYyNSAxMiAxNiAxMiBaIE0gNy4yNSAxMi45Mzc1IEMgNy4wOTM3NSAxMy42MDkzNzUgNyAxNC4yODUxNTYgNyAxNSBDIDcgMTYuNzUzOTA2IDcuNSAxOC4zOTQ1MzEgOC4zNzUgMTkuNzgxMjUgQyA1Ljg1NTQ2OSAxOC4zMjQyMTkgNC4xMDU0NjkgMTYuNTg1OTM4IDMuNTMxMjUgMTYgQyA0LjAxMTcxOSAxNS41MDc4MTMgNS4zNTE1NjMgMTQuMjAzMTI1IDcuMjUgMTIuOTM3NSBaIE0gMjQuNzUgMTIuOTM3NSBDIDI2LjY0ODQzOCAxNC4yMDMxMjUgMjcuOTg4MjgxIDE1LjUwNzgxMyAyOC40Njg3NSAxNiBDIDI3Ljg5NDUzMSAxNi41ODU5MzggMjYuMTQ0NTMxIDE4LjMyNDIxOSAyMy42MjUgMTkuNzgxMjUgQyAyNC41IDE4LjM5NDUzMSAyNSAxNi43NTM5MDYgMjUgMTUgQyAyNSAxNC4yODUxNTYgMjQuOTA2MjUgMTMuNjAxNTYzIDI0Ljc1IDEyLjkzNzUgWiIvPjwvc3ZnPg==)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-event{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA5IDQgTCA5IDUgTCA1IDUgTCA1IDI3IEwgMjcgMjcgTCAyNyA1IEwgMjMgNSBMIDIzIDQgTCAyMSA0IEwgMjEgNSBMIDExIDUgTCAxMSA0IFogTSA3IDcgTCA5IDcgTCA5IDggTCAxMSA4IEwgMTEgNyBMIDIxIDcgTCAyMSA4IEwgMjMgOCBMIDIzIDcgTCAyNSA3IEwgMjUgOSBMIDcgOSBaIE0gNyAxMSBMIDI1IDExIEwgMjUgMjUgTCA3IDI1IFogTSAxMyAxMyBMIDEzIDE1IEwgMTUgMTUgTCAxNSAxMyBaIE0gMTcgMTMgTCAxNyAxNSBMIDE5IDE1IEwgMTkgMTMgWiBNIDIxIDEzIEwgMjEgMTUgTCAyMyAxNSBMIDIzIDEzIFogTSA5IDE3IEwgOSAxOSBMIDExIDE5IEwgMTEgMTcgWiBNIDEzIDE3IEwgMTMgMTkgTCAxNSAxOSBMIDE1IDE3IFogTSAxNyAxNyBMIDE3IDE5IEwgMTkgMTkgTCAxOSAxNyBaIE0gMjEgMTcgTCAyMSAxOSBMIDIzIDE5IEwgMjMgMTcgWiBNIDkgMjEgTCA5IDIzIEwgMTEgMjMgTCAxMSAyMSBaIE0gMTMgMjEgTCAxMyAyMyBMIDE1IDIzIEwgMTUgMjEgWiBNIDE3IDIxIEwgMTcgMjMgTCAxOSAyMyBMIDE5IDIxIFoiLz48L3N2Zz4=)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-store{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSA1IDUgTCA1IDI3IEwgMjAuNDA2MjUgMjcgTCAyMC43MTg3NSAyNi43MTg3NSBMIDI2LjcxODc1IDIwLjcxODc1IEwgMjcgMjAuNDA2MjUgTCAyNyA1IFogTSA3IDcgTCAyNSA3IEwgMjUgMTkgTCAxOSAxOSBMIDE5IDI1IEwgNyAyNSBaIE0gMjEgMjEgTCAyMy41NjI1IDIxIEwgMjEgMjMuNTYyNSBaIi8+PC9zdmc+)}.ed-layout .ed-table .ed-table-body .ed-list-item .op-icon-effect{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTSAxNiA2IEwgMTYgMTUgTCAyMCAxNiBMIDE2LjEwMTU2MyAyNiBMIDE2IDI2IEwgMTYgMTcuOTY4NzUgTCAxMiAxNi45Njg3NSBMIDE1Ljg5ODQzOCA2IEwgMTYgNiBNIDE4IDQgTCAxNC40ODgyODEgNCBMIDE0LjAxNTYyNSA1LjMyODEyNSBMIDEwLjExMzI4MSAxNi4zMDA3ODEgTCA5LjM3ODkwNiAxOC4zNzUgTCAxMS41MTU2MjUgMTguOTEwMTU2IEwgMTQgMTkuNTMxMjUgTCAxNCAyOCBMIDE3LjQ2ODc1IDI4IEwgMTcuOTY0ODQ0IDI2LjcyNjU2MyBMIDIxLjg2MzI4MSAxNi43MjY1NjMgTCAyMi42ODc1IDE0LjYwOTM3NSBMIDE4IDEzLjQzNzUgWiIvPjwvc3ZnPg==)}.ed-layout .ed-table .ed-table-body .ed-list-item>div{box-sizing:border-box;flex:1;border:1px solid transparent;border-right:1px solid #d1d1d1;padding:0 4px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;}.ed-layout .ed-table .ed-table-body .ed-list-item>div:nth-child(1){flex:none;width:40px}.ed-layout .ed-table .ed-table-body .ed-list-item>div:nth-child(2){flex:none;width:140px}.ed-layout .ed-details{position:absolute;height:100%;background:white;width:80%;top:0;right:0;bottom:0;border-left:1px solid #d1d1d1;border-right:1px solid #d1d1d1;display:flex;flex-direction:column;box-shadow:-1px 0 1px rgba(0,0,0,0.0549),-2px 0 2px rgba(0,0,0,0.0549),-4px 0 4px rgba(0,0,0,0.0549),-8px 0 8px rgba(0,0,0,0.0549);}.ed-layout .ed-details .ed-details-body{min-height:0;flex:1;}.ed-layout .ed-details .ed-details-body>div{max-height:100%;overflow:auto;height:100%}.ed-layout .ed-details .ed-details-body .ed-details-body-corner-btns{position:absolute;right:14px;top:40px;}.ed-layout .ed-details .ed-details-body .ed-details-body-corner-btns .ed-details-body-corner-btn{cursor:pointer;opacity:.5;transition:.2s opacity;display:flex;align-items:center;}.ed-layout .ed-details .ed-details-body .ed-details-body-corner-btns .ed-details-body-corner-btn:hover{opacity:1}.ed-layout .ed-details .ed-details-body .ed-details-body-corner-btns .ed-details-body-corner-btn svg{width:24px;height:24px;margin-right:3px}.ed-layout .ed-details .ed-details-body .ed-details-body-preview>*{margin:0!important;padding:4px 14px!important}.ed-layout .ed-details .ed-details-body .ed-details-body-code>*{margin:0!important;padding:14px!important}.ed-layout .ed-details .ed-details-body .ed-details-body-code pre{padding:0!important}.ed-layout .ed-details .ed-details-body .ed-details-body-code pre{margin:0}.ed-layout .ed-details .ed-details-body .ed-details-body-code.ed-details-body-code-raw pre code{display:flex;flex-wrap:wrap}.ed-layout .ed-json{padding:0 10px!important;}.ed-layout .ed-json>ul{margin:0!important}.ed-layout .ed-json>ul>li>ul>li{padding:12px!important;margin:12px 0!important;}.ed-layout .ed-json>ul>li>ul>li{display:flex;flex-direction:row;align-items:center;flex-wrap:wrap;background:hsl(0, 0%, 98%);}.ed-layout .ed-json>ul>li>ul>li:first-of-type{margin-top:0}.ed-layout .ed-json>ul>li>ul>li>ul{padding-left:18px!important}.ed-layout .ed-json>ul>li>ul>li>ul{flex-basis:100%}.ed-layout .ed-json label+span{margin-left:8px}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}.hljs{color:#24292e;background:#fff}.hljs-doctag,.hljs-keyword,.hljs-meta .hljs-keyword,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language_{color:#d73a49}.hljs-title,.hljs-title.class_,.hljs-title.class_.inherited__,.hljs-title.function_{color:#6f42c1}.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable{color:#005cc5}.hljs-meta .hljs-string,.hljs-regexp,.hljs-string{color:#032f62}.hljs-built_in,.hljs-symbol{color:#e36209}.hljs-code,.hljs-comment,.hljs-formula{color:#6a737d}.hljs-name,.hljs-quote,.hljs-selector-pseudo,.hljs-selector-tag{color:#22863a}.hljs-subst{color:#24292e}.hljs-section{color:#005cc5;font-weight:700}.hljs-bullet{color:#735c0f}.hljs-emphasis{color:#24292e;font-style:italic}.hljs-strong{color:#24292e;font-weight:700}.hljs-addition{color:#22863a;background-color:#f0fff4}.hljs-deletion{color:#b31d28;background-color:#ffeef0}html,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;font-size:12px;line-height:21px;color:#333;background-color:transparent;height:100%}\n/*!\n  Theme: GitHub\n  Description: Light theme as seen on github.com\n  Author: github.com\n  Maintainer: @Hirse\n  Updated: 2021-05-15\n\n  Outdated base version: https://github.com/primer/github-syntax-light\n  Current colors taken from GitHub\'s CSS\n*/\n`);var SI=()=>{let[e,t]=(0,$n.useState)(!0),n=Kt(Uo),r=Kt(Lu),o=Kt(em);return $n.default.createElement("div",{className:"ed-body"},$n.default.createElement(Wo.Provider,{value:n},$n.default.createElement(Ze.Provider,{value:{selected:r,setSelected:Xp,setSelectedTab:tm,selectedTab:o,hotkeysActive:e,setHotkeysActive:t,showHistory:!0}},$n.default.createElement(Pu,null))))},xI=()=>{let e=Kt(ey);return rr("meta+p",()=>{Qi(e+.1)},{preventDefault:!0},[e,Qi]),rr("meta+o",()=>{Qi(e-.1)},{preventDefault:!0},[e,Qi]),$n.default.createElement("div",{className:"ed-layout",style:{zoom:e}},$n.default.createElement(ly,null),$n.default.createElement(SI,null))},EI=_S.default.createRoot(document.body);EI.render($n.default.createElement(xI,null));\n/**\n * @license React\n * react-dom.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * react-jsx-runtime.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * react.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * scheduler.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * use-sync-external-store-shim.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n/**\n * @license React\n * use-sync-external-store-shim/with-selector.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n'
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
      if (v instanceof Error) {
        return Object.getOwnPropertyNames(v).reduce((acc, k2) => {
          acc[k2] = v[k2];
          return acc;
        }, {});
      }
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
var localData = (() => {
  let data = {};
  try {
    data = JSON.parse(window.localStorage.getItem("effector-devtools") || "{}");
  } catch (e) {
    console.log("localData parsing issue.");
  }
  return data;
})();
var _sendState, _saveState, _bindRemote, bindRemote_fn, _setFilterQuery, setFilterQuery_fn, _setEnabled, setEnabled_fn;
var Controller = class {
  constructor(publisher2) {
    __privateAdd(this, _bindRemote);
    __privateAdd(this, _setFilterQuery);
    __privateAdd(this, _setEnabled);
    this._events = /* @__PURE__ */ new Set();
    __privateAdd(this, _sendState, (0, import_lodash.default)(() => {
      this.publisher.ns("state").publish(this.getState());
    }, 80));
    __privateAdd(this, _saveState, (0, import_lodash.default)(() => {
      window.localStorage.setItem(
        "effector-devtools",
        JSON.stringify(this.state)
      );
    }, 80));
    this.state = __spreadValues(__spreadValues({}, defaultState), localData);
    console.log("initial", this.state);
    this.publisher = publisher2;
    __privateMethod(this, _bindRemote, bindRemote_fn).call(this);
    __privateGet(this, _sendState).call(this);
  }
  getState() {
    return __spreadProps(__spreadValues({}, this.state), {
      subscriptions: Array.from(this._events.values()).filter((unit) => unit.logger.enabled).map((unit) => unit.logger.getName())
    });
  }
  setState(state) {
    __privateMethod(this, _setEnabled, setEnabled_fn).call(this, state.enabled);
    __privateMethod(this, _setFilterQuery, setFilterQuery_fn).call(this, state.query);
    this.state.zoom = state.zoom;
    this.state.expanded = !!state.expanded;
    __privateGet(this, _saveState).call(this);
  }
  onUnitCreate(unit) {
    this._events.add(unit);
    if (this.state.enabled) {
      unit.logger.setEnabled(true);
    }
    if (unit.kind !== "store" && !(unit.logger.getKind() === "effect" && ["done", "fail"].includes(unit.shortName))) {
      unit.logger.log("unit-create");
    }
    __privateGet(this, _sendState).call(this);
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
        __privateGet(this, _sendState).call(this);
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
_sendState = new WeakMap();
_saveState = new WeakMap();
_bindRemote = new WeakSet();
bindRemote_fn = function() {
  this.publisher.provide("setState", this.setState.bind(this));
};
_setFilterQuery = new WeakSet();
setFilterQuery_fn = function(query) {
  if (this.state.query === query) {
    return;
  }
  this.state.query = query;
  __privateMethod(this, _setEnabled, setEnabled_fn).call(this, this.state.enabled);
  __privateGet(this, _sendState).call(this);
};
_setEnabled = new WeakSet();
setEnabled_fn = function(enabled) {
  if (enabled === this.state.enabled) {
    return;
  }
  this.state.enabled = enabled;
  const filterFn = filterLogsFn(this.state.query);
  for (let unit of this._events) {
    if (!enabled) {
      unit.logger.setEnabled(false);
      continue;
    }
    unit.logger.setEnabled(filterFn(unit.logger.getName()));
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
