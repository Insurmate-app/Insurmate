/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var assetService = __webpack_require__(388);
var _require = __webpack_require__(903),
  uuidv4 = _require.v4;
var jwt = __webpack_require__(829);
var extractToken = __webpack_require__(642);
var _require2 = __webpack_require__(111),
  broadcastData = _require2.broadcastData;
var createAsset = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var token, payload, data, id, payloadId, result, allAssets;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = extractToken(req);
          if (token) {
            _context.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context.abrupt("return");
        case 5:
          jwt.verify(token, process.env.JWT_SECRET);
          payload = jwt.decode(token);
          data = req.body.data;
          id = uuidv4();
          payloadId = payload.id;
          _context.next = 12;
          return assetService.createAsset(payloadId, {
            id: id,
            data: data
          });
        case 12:
          result = _context.sent;
          _context.next = 15;
          return assetService.getAllAssets(payloadId);
        case 15:
          allAssets = _context.sent;
          // Broadcast the updated asset list to WebSocket clients
          broadcastData({
            type: "ASSET_LIST_UPDATE",
            data: allAssets
          });
          res.status(201).json(result);
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function createAsset(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var updateAsset = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var token, payload, _req$body, id, data, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = extractToken(req);
          if (token) {
            _context2.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context2.abrupt("return");
        case 5:
          jwt.verify(token, process.env.JWT_SECRET);
          payload = jwt.decode(token);
          _req$body = req.body, id = _req$body.id, data = _req$body.data;
          _context2.next = 10;
          return assetService.updateAsset(payload.id, {
            id: id,
            data: data
          });
        case 10:
          result = _context2.sent;
          res.status(200).json(result);
          _context2.next = 17;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function updateAsset(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllAssets = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var token, payload, assets;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = extractToken(req);
          if (token) {
            _context3.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context3.abrupt("return");
        case 5:
          jwt.verify(token, process.env.JWT_SECRET);

          // If you only want the payload without verifying, use jwt.decode
          payload = jwt.decode(token);
          _context3.next = 9;
          return assetService.getAllAssets(payload.id);
        case 9:
          assets = _context3.sent;
          res.status(200).json(assets);
          _context3.next = 16;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function getAllAssets(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var getAssetById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var token, payload, assetId, asset;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // Retrieve the token from cookies
          token = extractToken(req);
          if (token) {
            _context4.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context4.abrupt("return");
        case 5:
          // Use jwt.verify if you need to validate the token
          jwt.verify(token, process.env.JWT_SECRET);
          payload = jwt.decode(token);
          assetId = req.params.id;
          _context4.next = 10;
          return assetService.getAssetById(payload.id, assetId);
        case 10:
          asset = _context4.sent;
          res.status(200).json(asset);
          _context4.next = 17;
          break;
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function getAssetById(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var getAssetHistory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var token, payload, assetId, history;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          // Retrieve the token from cookies
          token = extractToken(req);
          if (token) {
            _context5.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context5.abrupt("return");
        case 5:
          jwt.verify(token, process.env.JWT_SECRET);
          payload = jwt.decode(token);
          assetId = req.params.id;
          _context5.next = 10;
          return assetService.getAssetHistory(payload.id, assetId);
        case 10:
          history = _context5.sent;
          res.status(200).json(history);
          _context5.next = 17;
          break;
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function getAssetHistory(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteAsset = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var token, payload, assetId, result;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          // Retrieve the token from cookies
          token = extractToken(req);
          if (token) {
            _context6.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context6.abrupt("return");
        case 5:
          jwt.verify(token, process.env.JWT_SECRET);
          payload = jwt.decode(token);
          assetId = req.params.id;
          _context6.next = 10;
          return assetService.deleteAsset(payload.id, assetId);
        case 10:
          result = _context6.sent;
          res.status(200).json(result);
          _context6.next = 17;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);
        case 17:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 14]]);
  }));
  return function deleteAsset(_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();
var transferAsset = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
    var token, payload, _req$body2, assetId, newOwner, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          token = extractToken(req);
          if (token) {
            _context7.next = 5;
            break;
          }
          res.status(401).json({
            error: "Unauthorized"
          });
          return _context7.abrupt("return");
        case 5:
          jwt.verify(token, process.env.JWT_SECRET);

          // If you only want the payload without verifying, use jwt.decode
          payload = jwt.decode(token);
          _req$body2 = req.body, assetId = _req$body2.assetId, newOwner = _req$body2.newOwner;
          _context7.next = 10;
          return assetService.transferAsset(payload.id, assetId, newOwner);
        case 10:
          result = _context7.sent;
          res.status(200).json(result);
          _context7.next = 17;
          break;
        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function transferAsset(_x19, _x20, _x21) {
    return _ref7.apply(this, arguments);
  };
}();
module.exports = {
  createAsset: createAsset,
  updateAsset: updateAsset,
  getAllAssets: getAllAssets,
  getAssetById: getAssetById,
  getAssetHistory: getAssetHistory,
  deleteAsset: deleteAsset,
  transferAsset: transferAsset
};

/***/ }),

/***/ 109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var userService = __webpack_require__(211);
var jwt = __webpack_require__(829);
var JWT_SECRET = process.env.JWT_SECRET;
var passport = __webpack_require__(278);
__webpack_require__(537); // Import Passport JWT configuration

var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var userData, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userData = req.body;
          _context.next = 4;
          return userService.createUser(userData);
        case 4:
          user = _context.sent;
          res.status(201).json(user);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var resetPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var _req$body, email, password, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return userService.resetPassword(email, password);
        case 4:
          result = _context2.sent;
          res.status(200).json(result);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function resetPassword(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var loginUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var _req$body2, email, password, token;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.next = 4;
          return userService.loginUser(email, password);
        case 4:
          // Generate JWT token
          token = jwt.sign({
            id: email
          }, JWT_SECRET, {
            expiresIn: "15m" // 15 minutes
          }); // Set the token as a cookie (HttpOnly for security)

          res.cookie("token", token, {
            httpOnly: true,
            // Makes the cookie inaccessible to JavaScript on the client-side
            secure: true,
            //process.env.NODE_ENV === "production", // Secure only in production
            sameSite: "Strict",
            maxAge: 900000 // 15 minutes in milliseconds
          });
          res.status(200).json({
            token: token
          });
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          // Pass the error to the global error handler using next()
          //res.status(500).json({ message: error.message });
          next(_context3.t0); // Pass the error to the error-handling middleware
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function loginUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
var verifyUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var _req$body3, email, otpToken;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, email = _req$body3.email, otpToken = _req$body3.otpToken;
          _context4.next = 4;
          return userService.verifyUser(email, otpToken);
        case 4:
          res.status(200).json("Verification Successful.");
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function verifyUser(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
var regenerateOtp = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var email;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          email = req.body.email;
          _context5.next = 4;
          return userService.regenerateOtp(email);
        case 4:
          res.status(200).json("OTP regenerated successfully.");
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function regenerateOtp(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
var logoutUser = function logoutUser(req, res, next) {
  try {
    console.log("Cookies:", req.cookies.token);
    // Clear the cookie by setting the token cookie's maxAge to
    res.clearCookie("token", passport.authenticate("jwt", {
      session: false
    }), {
      httpOnly: true,
      // Ensure cookie is only accessible by the server
      secure: "production" === "production" // Only use HTTPS in production
    });
    // Send a response indicating the user has been logged out
    res.status(200).json({
      message: "Logged out successfully."
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createUser: createUser,
  resetPassword: resetPassword,
  loginUser: loginUser,
  verifyUser: verifyUser,
  regenerateOtp: regenerateOtp,
  logoutUser: logoutUser
};

/***/ }),

/***/ 686:
/***/ ((module) => {

function CustomError(message) {
  var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
module.exports = CustomError;

/***/ }),

/***/ 622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// logger.js
var _require = __webpack_require__(124),
  createLogger = _require.createLogger,
  format = _require.format,
  transports = _require.transports;
var combine = format.combine,
  timestamp = format.timestamp,
  printf = format.printf;

// Custom log format
var logFormat = printf(function (_ref) {
  var level = _ref.level,
    message = _ref.message,
    timestamp = _ref.timestamp;
  return "".concat(timestamp, " ").concat(level, ": ").concat(message);
});

// Create a logger instance
var logger = createLogger({
  level: "info",
  // Set the log level
  format: combine(timestamp(), logFormat),
  transports: [new transports.Console(), new transports.File({
    filename: "app.log"
  }) // Log to a file
  ]
});
module.exports = logger;

/***/ }),

/***/ 946:
/***/ ((module) => {

var errorHandler = function errorHandler(err, req, res, next) {
  // If statusCode is not set, default to 500 (Internal Server Error)
  var statusCode = err.statusCode || 500;

  // Send the error message along with the correct status code
  res.status(statusCode).json({
    statusCode: statusCode,
    message: err.message || "Internal Server Error"
  });
};
module.exports = errorHandler;

/***/ }),

/***/ 465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _require = __webpack_require__(975),
  validationResult = _require.validationResult;
function validate(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errorMessages = errors.array().map(function (err) {
      return err.msg;
    }); // Extract only the error messages
    return res.status(400).json({
      message: "Validation failed",
      errors: errorMessages
    });
  }
  next();
}
module.exports = validate;

/***/ }),

/***/ 767:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mongoose = __webpack_require__(37);
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
    // Regex for basic email validation
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128
  },
  companyName: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100
  },
  failedLoginAttempts: {
    type: Number,
    "default": 0,
    required: true
  },
  activeAccount: {
    type: Boolean,
    "default": true,
    required: true
  },
  role: {
    type: String,
    "enum": ["admin", "user"],
    "default": "user",
    required: true
  },
  address: {
    addressLine1: {
      type: String,
      required: true,
      maxLength: 300
    },
    addressLine2: {
      type: String,
      maxLength: 50
    },
    city: {
      type: String,
      required: true,
      maxLength: 30
    },
    state: {
      type: String,
      required: true,
      maxLength: 30
    },
    zipCode: {
      type: String,
      required: true,
      maxLength: 30
    }
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("User", userSchema);

/***/ }),

/***/ 576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var express = __webpack_require__(252);
var _require = __webpack_require__(975),
  body = _require.body;
__webpack_require__(537);
var router = express.Router();
var passport = __webpack_require__(278);
var assetController = __webpack_require__(790);
var validate = __webpack_require__(465);
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
router.post("/create", passport.authenticate("jwt", {
  session: false
}), [body("data.firstName").notEmpty().withMessage("First name is required").isString().withMessage("First name must be a string").isLength({
  min: 2
}).withMessage("First name must be at least 2 characters long"), body("data.lastName").notEmpty().withMessage("Last name is required").isString().withMessage("Last name must be a string").isLength({
  min: 2
}).withMessage("Last name must be at least 2 characters long"), body("data.email").notEmpty().withMessage("Email is required").isString().withMessage("Email must be a string").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format"), body("data.policyNumber").notEmpty().withMessage("Policy number is required").isLength({
  min: 6,
  max: 10
}).withMessage("Policy number must be between 6 and 10 digits")], validate, assetController.createAsset);

// Route to update an asset
router.put("/update", passport.authenticate("jwt", {
  session: false
}), [body("id").notEmpty().withMessage("Asset ID is required").isString().withMessage("Asset ID must be a string"), body("data.firstName").notEmpty().withMessage("First name is required").isString().withMessage("First name must be a string").isLength({
  min: 2
}).withMessage("First name must be at least 2 characters long"), body("data.lastName").notEmpty().withMessage("Last name is required").isString().withMessage("Last name must be a string").isLength({
  min: 2
}).withMessage("Last name must be at least 2 characters long"), body("data.email").notEmpty().withMessage("Email is required").isString().withMessage("Email must be a string").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format"), body("data.policyNumber").notEmpty().withMessage("Policy number is required").isLength({
  min: 6,
  max: 10
}).withMessage("Policy number must be between 6 and 10 digits"), body("data.status").notEmpty().withMessage("Status is required").isString().withMessage("Status must be a string").isIn(["Active", "Inactive", "Pending"]).withMessage("Status must be 'Active', 'Inactive', or 'Pending'")], validate, assetController.updateAsset);

// Route to get all assets
router.get("/get-all", passport.authenticate("jwt", {
  session: false
}), assetController.getAllAssets);

// Route to get a single asset by ID
router.get("/get/:id", passport.authenticate("jwt", {
  session: false
}), assetController.getAssetById);

// Route to get asset history by ID
router.get("/history/:id", passport.authenticate("jwt", {
  session: false
}), assetController.getAssetHistory);

// Route to delete an asset by ID
router["delete"]("/delete/:id", passport.authenticate("jwt", {
  session: false
}), assetController.deleteAsset);

// Route to transfer an asset to a new owner
router.put("/transfer", passport.authenticate("jwt", {
  session: false
}), [body("assetId").notEmpty().withMessage("Asset ID and new owner are required.").isString().withMessage("Asset ID must be a string"), body("newOwner").notEmpty().withMessage("Asset ID and new owner are required.").isString().withMessage("New owner must be a string")], validate, assetController.transferAsset);
module.exports = router;

/***/ }),

/***/ 611:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var express = __webpack_require__(252);
var router = express.Router();
var passport = __webpack_require__(278);
__webpack_require__(537); // Import Passport JWT configuration

var validate = __webpack_require__(465);
var _require = __webpack_require__(975),
  check = _require.check;
var userController = __webpack_require__(109);
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
router.post("/create", [check("email").notEmpty().withMessage("Email is required").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format"), check("password").notEmpty().withMessage("Password is required").isLength({
  min: 8,
  max: 28
}).withMessage("Password must be between 8 and 28 characters long").matches(passwordRegex).withMessage("Password must contain at least one uppercase letter and one special character"), check("companyName").notEmpty().withMessage("Company name is required").isLength({
  min: 8,
  max: 28
}).withMessage("Company name must be between 8 and 28 characters long"), check("address.addressLine1").notEmpty().withMessage("Address line 1 is required").isLength({
  max: 300
}).withMessage("Address line 1 must be no more than 300 characters long"), check("address.addressLine2").optional() // Allow this field to be optional
.isLength({
  max: 50
}).withMessage("Address line 2 must be no more than 50 characters long"), check("address.city").notEmpty().withMessage("City is required").isLength({
  max: 30
}).withMessage("City must be no more than 30 characters long"), check("address.state").notEmpty().withMessage("State is required").isLength({
  max: 30
}).withMessage("State must be no more than 30 characters long"), check("address.zipCode").notEmpty().withMessage("Zip code is required").isLength({
  max: 30
}).withMessage("Zip code must be no more than 30 characters long")], validate, userController.createUser);
router.post("/login", [check("email").notEmpty().withMessage("Email is required").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format"), check("password").notEmpty().withMessage("Password is required").isLength({
  min: 8,
  max: 28
}).withMessage("Password must be between 8 and 28 characters long").matches(passwordRegex).withMessage("Password must contain at least one uppercase letter and one special character")], validate, userController.loginUser);
router.post("/verify", [check("email").notEmpty().withMessage("Email is required").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format"), check("otpToken").notEmpty().withMessage("OTP Token is required").isNumeric().isLength({
  max: 6
}).withMessage("OTP Token must be no more than 6 digits or less than long")], validate, userController.verifyUser);
router.put("/reset-password", [check("email").notEmpty().withMessage("Email is required").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format"), check("password").notEmpty().withMessage("Password is required").isLength({
  min: 8,
  max: 28
}).withMessage("Password must be between 8 and 28 characters long").matches(passwordRegex).withMessage("Password must contain at least one uppercase letter and one special character")], validate, userController.resetPassword);
router.post("/regenerate-otp", [check("email").notEmpty().withMessage("Email is required").isLength({
  max: 100
}).withMessage("Email must be no more than 100 characters long").matches(emailRegex).withMessage("Invalid email format")], validate, userController.regenerateOtp);
router.post("/logout", passport.authenticate("jwt", {
  session: false
}),
// verifyToken,
userController.logoutUser);
module.exports = router;

/***/ }),

/***/ 537:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var passport = __webpack_require__(278);
var passportJWT = __webpack_require__(714);
var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var userService = __webpack_require__(211);
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};
passport.use(new JwtStrategy(opts, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(jwt_payload, done) {
    var user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return userService.findUserByEmail(jwt_payload.id);
        case 3:
          user = _context.sent;
          if (!user) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", done(null, user));
        case 8:
          return _context.abrupt("return", done(null, false));
        case 9:
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", done(_context.t0, false));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
module.exports = passport;

/***/ }),

/***/ 388:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = __webpack_require__(870),
  evaluateTransaction = _require.evaluateTransaction,
  submitTransaction = _require.submitTransaction;
var userService = __webpack_require__(211);
var CustomError = __webpack_require__(686);
var log = __webpack_require__(622);

// TODO: Hardcoded values for now; replace with environment variables / mongoDB if needed
var userId = "admin";
var org1 = "org1"; // for regular user
var org2 = "org2"; // for admin user
var channel = "mychannel";
var chaincodeName = "basic";
function whichOrg(role) {
  return role === "admin" ? org2 : org1;
}

// Create an Asset
var createAsset = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, data) {
    var user, org, result;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return userService.findUserByEmail(email);
        case 3:
          user = _context.sent;
          data.data.owner = user._id;
          data.data.status = "Pending";
          org = whichOrg(user.role);
          _context.next = 9;
          return submitTransaction(userId, org, channel, chaincodeName, "CreateAsset", JSON.stringify(data));
        case 9:
          result = _context.sent;
          return _context.abrupt("return", JSON.parse(result));
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          if (!(_context.t0.statusCode >= 400 && _context.t0.statusCode < 500)) {
            _context.next = 19;
            break;
          }
          throw _context.t0;
        case 19:
          log.error(_context.t0.message);
          throw CustomError("Error creating asset", 500);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function createAsset(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateAsset = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(email, data) {
    var _asset$data, _data$data$status, asset, user, _asset$data2, org, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return getAssetById(email, data.id);
        case 3:
          asset = _context2.sent;
          data.data.owner = asset === null || asset === void 0 || (_asset$data = asset.data) === null || _asset$data === void 0 ? void 0 : _asset$data.owner;
          _context2.next = 7;
          return userService.findUserByEmail(email);
        case 7:
          user = _context2.sent;
          if (!((_data$data$status = data.data.status) !== null && _data$data$status !== void 0 && _data$data$status.trim())) {
            data.data.status = asset === null || asset === void 0 || (_asset$data2 = asset.data) === null || _asset$data2 === void 0 ? void 0 : _asset$data2.status;
          }
          org = whichOrg(user.role);
          _context2.next = 12;
          return submitTransaction(userId, org, channel, chaincodeName, "UpdateAsset", JSON.stringify(data));
        case 12:
          result = _context2.sent;
          return _context2.abrupt("return", JSON.parse(result));
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          if (!(_context2.t0.statusCode >= 400 && _context2.t0.statusCode < 500)) {
            _context2.next = 22;
            break;
          }
          throw _context2.t0;
        case 22:
          log.error(_context2.t0.message);
          throw CustomError("Error updating asset", 500);
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function updateAsset(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Retrieve All Assets
var getAllAssets = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(email) {
    var user, role, org, result, assets;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return userService.findUserByEmail(email);
        case 3:
          user = _context3.sent;
          role = user.role; // if (role !== "admin") {
          //   throw new CustomError("Regular user cannot retrieve all assets", 403);
          // }
          org = whichOrg(role);
          _context3.next = 8;
          return evaluateTransaction(userId, org, channel, chaincodeName, "GetAllAssets");
        case 8:
          result = _context3.sent;
          assets = JSON.parse(result); // TODO:Map the owner field to the user's full name
          // assets = await Promise.all(
          //   assets.map(async (asset) => {
          //     const ownerUser = await userService.findUserById(asset.owner); // Retrieve user by owner
          //     console.log(ownerUser);
          //     return {
          //       ...asset,
          //       owner: ownerUser
          //         ? `${ownerUser.firstName} ${ownerUser.lastName}`
          //         : asset.owner, // Fallback to original owner if user not found
          //     };
          //   })
          // );
          return _context3.abrupt("return", assets);
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          if (!(_context3.t0.statusCode >= 400 && _context3.t0.statusCode < 500)) {
            _context3.next = 19;
            break;
          }
          throw _context3.t0;
        case 19:
          log.error(_context3.t0.message);
          throw CustomError("Error retrieving assets", 500);
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function getAllAssets(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getAssetById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(email, assetId) {
    var user, org, result, resultJSON;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return userService.findUserByEmail(email);
        case 3:
          user = _context4.sent;
          org = whichOrg(user.role);
          _context4.next = 7;
          return evaluateTransaction(userId, org, channel, chaincodeName, "ReadAsset", assetId);
        case 7:
          result = _context4.sent;
          resultJSON = JSON.parse(result);
          if (!(user.role !== "admin" && resultJSON.data.owner.toString() !== user._id.toString())) {
            _context4.next = 11;
            break;
          }
          throw new CustomError("You do not have permission to access this asset", 403);
        case 11:
          return _context4.abrupt("return", resultJSON);
        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          if (!(_context4.t0.message && _context4.t0.message.toLowerCase().includes("does not exist"))) {
            _context4.next = 18;
            break;
          }
          throw CustomError("Asset not found".concat(assetId ? ": ".concat(assetId) : ""), 404);
        case 18:
          if (!(_context4.t0.statusCode >= 400 && _context4.t0.statusCode < 500)) {
            _context4.next = 22;
            break;
          }
          throw _context4.t0;
        case 22:
          log.error(_context4.t0.message);
          throw CustomError("Error retrieving asset", 500);
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return function getAssetById(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
var getAssetHistory = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(email, assetId) {
    var user, org, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return getAssetById(email, assetId);
        case 3:
          _context5.next = 5;
          return userService.findUserByEmail(email);
        case 5:
          user = _context5.sent;
          org = whichOrg(user.role);
          _context5.next = 9;
          return evaluateTransaction(userId, org, channel, chaincodeName, "GetAssetHistory", assetId);
        case 9:
          result = _context5.sent;
          return _context5.abrupt("return", JSON.parse(result));
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);
          if (!(_context5.t0.statusCode >= 400 && _context5.t0.statusCode < 500)) {
            _context5.next = 19;
            break;
          }
          throw _context5.t0;
        case 19:
          log.error(_context5.t0.message);
          throw CustomError("Error getting asset history", 500);
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 13]]);
  }));
  return function getAssetHistory(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteAsset = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(email, assetId) {
    var user, org;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return getAssetById(email, assetId);
        case 3:
          _context6.next = 5;
          return userService.findUserByEmail(email);
        case 5:
          user = _context6.sent;
          org = whichOrg(user.role);
          _context6.next = 9;
          return submitTransaction(userId, org, channel, chaincodeName, "DeleteAsset", assetId);
        case 9:
          return _context6.abrupt("return", {
            message: "Asset with ID ".concat(assetId, " has been deleted.")
          });
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          if (!(_context6.t0.statusCode >= 400 && _context6.t0.statusCode < 500)) {
            _context6.next = 18;
            break;
          }
          throw _context6.t0;
        case 18:
          log.error(_context6.t0.message);
          throw CustomError("Error deleting asset", 500);
        case 20:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function deleteAsset(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
function transferAsset(_x12, _x13, _x14) {
  return _transferAsset.apply(this, arguments);
}
function _transferAsset() {
  _transferAsset = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(email, assetId, newOwner) {
    var user, org, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return userService.findUserByEmail(email);
        case 3:
          user = _context7.sent;
          org = whichOrg(user.role);
          _context7.next = 7;
          return submitTransaction(userId, org, channel, chaincodeName, "TransferAsset", assetId, newOwner);
        case 7:
          result = _context7.sent;
          return _context7.abrupt("return", {
            assetId: assetId,
            newOwner: newOwner,
            oldOwner: result
          });
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          if (!(_context7.t0.statusCode >= 400 && _context7.t0.statusCode < 500)) {
            _context7.next = 17;
            break;
          }
          throw _context7.t0;
        case 17:
          log.error(_context7.t0.message);
          throw CustomError("Error transferring asset", 500);
        case 19:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return _transferAsset.apply(this, arguments);
}
module.exports = {
  createAsset: createAsset,
  updateAsset: updateAsset,
  getAllAssets: getAllAssets,
  getAssetById: getAssetById,
  getAssetHistory: getAssetHistory,
  deleteAsset: deleteAsset,
  transferAsset: transferAsset
};

/***/ }),

/***/ 604:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee

(__webpack_require__(818).config)();
var nodemailer = __webpack_require__(572);
var logger = __webpack_require__(622);
var sender = process.env.EMAIL;
var password = process.env.PASSWORD;
var transporter = nodemailer.createTransport({
  host: "mail.wecare-insurance.com",
  // SMTP host
  port: 587,
  // Port (587 for TLS, 465 for SSL)
  auth: {
    user: sender,
    pass: password
  }
});
var sendEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var to, subject, text, mailOptions, info;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          to = _ref.to, subject = _ref.subject, text = _ref.text;
          mailOptions = {
            from: sender,
            to: to,
            subject: subject,
            text: text
          };
          _context.prev = 2;
          _context.next = 5;
          return transporter.sendMail(mailOptions);
        case 5:
          info = _context.sent;
          return _context.abrupt("return", info);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          logger.error("Error sending email:", _context.t0);
          throw new Error("Error sending email");
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 9]]);
  }));
  return function sendEmail(_x) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  sendEmail: sendEmail
};

/***/ }),

/***/ 261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var bcrypt = __webpack_require__(486);
var otplib = __webpack_require__(288);
var _require = __webpack_require__(678),
  LRUCache = _require.LRUCache;
var log = __webpack_require__(622);
var CustomError = __webpack_require__(686);
var saltRounds = 10;
otplib.authenticator.options = {
  step: 900
};
var otpCache = new LRUCache({
  max: 300,
  maxSize: 300,
  sizeCalculation: function sizeCalculation() {
    return 1;
  },
  // Every entry counts as 1
  ttl: 1000 * 60 * 15,
  // 15 minutes TTL
  ttlAutopurge: true
});
function hashPassword(_x) {
  return _hashPassword.apply(this, arguments);
}
function _hashPassword() {
  _hashPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(password) {
    var hashedPassword;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return bcrypt.hash(password, saltRounds);
        case 3:
          hashedPassword = _context3.sent;
          return _context3.abrupt("return", hashedPassword);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          log.error(_context3.t0.message);
          throw _context3.t0;
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _hashPassword.apply(this, arguments);
}
function checkPassword(_x2, _x3) {
  return _checkPassword.apply(this, arguments);
}
function _checkPassword() {
  _checkPassword = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(plainPassword, hashedPassword) {
    var isMatch;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return bcrypt.compare(plainPassword, hashedPassword);
        case 3:
          isMatch = _context4.sent;
          return _context4.abrupt("return", isMatch);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          log.error(_context4.t0.message);
          throw _context4.t0;
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _checkPassword.apply(this, arguments);
}
var generateOtp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
    var dynamicSecret, otp;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Generate a unique secret for each OTP generation
          dynamicSecret = otplib.authenticator.generateSecret(); // Generate the OTP using the dynamic secret
          otp = otplib.authenticator.generate(dynamicSecret); // Store the OTP and secret in the cache with the user's ID as the key
          otpCache.set(id, {
            otp: otp,
            secret: dynamicSecret
          });
          return _context.abrupt("return", otp);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          log.error(_context.t0.message);
          throw _context.t0;
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function generateOtp(_x4) {
    return _ref.apply(this, arguments);
  };
}();
var verifyOtp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id, token) {
    var cachedOtpData, otp, secret;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Retrieve the OTP and secret from the cache
          cachedOtpData = otpCache.get(id);
          if (cachedOtpData) {
            _context2.next = 5;
            break;
          }
          log.error("OTP not found or expired for id: ".concat(id));
          throw CustomError("OTP not found or expired.", 401);
        case 5:
          // Retrieve the OTP and secret from the cached data
          otp = cachedOtpData.otp, secret = cachedOtpData.secret;
          console.log("Cached OTP: ".concat(otp, ", Secret: ").concat(secret, ", Provided Token: ").concat(token, " for id: ").concat(id));
          if (!(otp.toString().trim() !== token.toString().trim())) {
            _context2.next = 9;
            break;
          }
          throw CustomError("Invalid OTP", 401);
        case 9:
          // If OTP is valid, remove it from the cache
          otpCache["delete"](id);
          _context2.next = 20;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          if (!(_context2.t0.statusCode >= 400 && _context2.t0.statusCode < 500)) {
            _context2.next = 18;
            break;
          }
          throw _context2.t0;
        case 18:
          log.error("Error during OTP verification for id: ".concat(id, " - ").concat(_context2.t0.message));
          throw CustomError("Your OTP is invalid. Please try again.", 500);
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function verifyOtp(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
module.exports = {
  hashPassword: hashPassword,
  checkPassword: checkPassword,
  generateOtp: generateOtp,
  verifyOtp: verifyOtp
};

/***/ }),

/***/ 211:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var User = __webpack_require__(767);
var emailService = __webpack_require__(604);
var modelMapper = __webpack_require__(825);
var log = __webpack_require__(622);
var CustomError = __webpack_require__(686);
var passwordService = __webpack_require__(261);
var sendVerificationEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, otp) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return emailService.sendEmail({
            to: email,
            subject: "Activate Account",
            text: "Hi there, \nPlease use the following OTP to activate your account: ".concat(otp, ". This OTP is valid for 5 minutes.")
          });
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendVerificationEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(userData) {
    var hashedPassword, user, otpToken, userDto, duplicateField, errorMessage;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userData.failedLoginAttempts = 0;
          userData.activeAccount = false;
          userData.role = "user";
          _context2.next = 6;
          return passwordService.hashPassword(userData.password);
        case 6:
          hashedPassword = _context2.sent;
          userData.password = hashedPassword;
          _context2.next = 10;
          return User.create(userData);
        case 10:
          user = _context2.sent;
          _context2.next = 13;
          return passwordService.generateOtp(user.email);
        case 13:
          otpToken = _context2.sent;
          if (!user) {
            _context2.next = 17;
            break;
          }
          _context2.next = 17;
          return sendVerificationEmail(user.email, otpToken);
        case 17:
          userDto = modelMapper.pick(user, ["email", "companyName", "address.addressLine1", "address.addressLine2", "address.city", "address.state", "address.zipCode"]);
          return _context2.abrupt("return", userDto);
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          if (!(_context2.t0.code === 11000)) {
            _context2.next = 29;
            break;
          }
          // Extract the duplicated field (e.g., email, username)
          duplicateField = Object.keys(_context2.t0.keyValue)[0];
          errorMessage = "Duplicate field value: '".concat(duplicateField, "' already exists."); // Throw a custom error with a 409 conflict status code
          throw CustomError(errorMessage, 409);
        case 29:
          log.error(_context2.t0.message);
          // Handle other types of errors
          throw _context2.t0;
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 21]]);
  }));
  return function createUser(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var resetPassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(email, newPassword) {
    var user, updatedUser, otpToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return findUserByEmail(email);
        case 3:
          user = _context3.sent;
          if (user) {
            _context3.next = 6;
            break;
          }
          throw CustomError("User not found.", 404);
        case 6:
          _context3.next = 8;
          return passwordService.hashPassword(newPassword);
        case 8:
          newPassword = _context3.sent;
          _context3.next = 11;
          return User.findByIdAndUpdate(user._id, {
            password: newPassword,
            activeAccount: false
          }, {
            "new": true
          });
        case 11:
          updatedUser = _context3.sent;
          if (updatedUser) {
            _context3.next = 14;
            break;
          }
          throw CustomError("User not found.", 404);
        case 14:
          _context3.next = 16;
          return passwordService.generateOtp(user.email);
        case 16:
          otpToken = _context3.sent;
          if (!updatedUser) {
            _context3.next = 20;
            break;
          }
          _context3.next = 20;
          return sendVerificationEmail(updatedUser.email, otpToken);
        case 20:
          return _context3.abrupt("return", "Password reset successfully.");
        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](0);
          if (!(_context3.t0.statusCode >= 400 && _context3.t0.statusCode < 500)) {
            _context3.next = 29;
            break;
          }
          throw _context3.t0;
        case 29:
          log.error(_context3.t0.message);
          throw CustomError("Unable to reset password.", 500);
        case 31:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 23]]);
  }));
  return function resetPassword(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var findUserById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
    var user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return User.findOne({
            id: id
          });
        case 2:
          user = _context4.sent;
          if (user) {
            _context4.next = 5;
            break;
          }
          throw CustomError("User not found.", 404);
        case 5:
          return _context4.abrupt("return", user);
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function findUserById(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
var findUserByEmail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(email) {
    var user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return User.findOne({
            email: email
          });
        case 2:
          user = _context5.sent;
          if (user) {
            _context5.next = 5;
            break;
          }
          throw CustomError("User not found.", 404);
        case 5:
          return _context5.abrupt("return", user);
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function findUserByEmail(_x7) {
    return _ref5.apply(this, arguments);
  };
}();
var loginUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(email, password) {
    var user, match;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return findUserByEmail(email);
        case 3:
          user = _context6.sent;
          if (user) {
            _context6.next = 6;
            break;
          }
          throw CustomError("User not found.", 400);
        case 6:
          if (user.activeAccount) {
            _context6.next = 8;
            break;
          }
          throw CustomError("Account is inactive, a new verification code has been sent to your email address.", 401);
        case 8:
          if (!(user.failedLoginAttempts >= 5)) {
            _context6.next = 10;
            break;
          }
          throw CustomError("Account is locked due to more than 5 failed login attempts.", 401);
        case 10:
          _context6.next = 12;
          return passwordService.checkPassword(password, user.password);
        case 12:
          match = _context6.sent;
          if (match) {
            _context6.next = 18;
            break;
          }
          user.failedLoginAttempts += 1;
          _context6.next = 17;
          return user.save();
        case 17:
          throw CustomError("Invalid password.", 401);
        case 18:
          // Reset failed login attempts and activate account on successful login
          user.failedLoginAttempts = 0;
          user.activeAccount = true;
          _context6.next = 22;
          return user.save();
        case 22:
          _context6.next = 32;
          break;
        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](0);
          if (!(_context6.t0.statusCode >= 400 && _context6.t0.statusCode < 500)) {
            _context6.next = 30;
            break;
          }
          throw _context6.t0;
        case 30:
          log.error(_context6.t0.message);
          throw CustomError("Unable to login.", 500);
        case 32:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 24]]);
  }));
  return function loginUser(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();
var regenerateOtp = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(email) {
    var user, otpToken;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return findUserByEmail(email);
        case 3:
          user = _context7.sent;
          if (user) {
            _context7.next = 6;
            break;
          }
          throw CustomError("User not found.", 404);
        case 6:
          if (!user.activeAccount) {
            _context7.next = 8;
            break;
          }
          throw CustomError("Account is already active.", 400);
        case 8:
          _context7.next = 10;
          return User.findByIdAndUpdate(user._id, {
            activeAccount: false
          }, {
            "new": true
          });
        case 10:
          console.log(email);
          _context7.next = 13;
          return passwordService.generateOtp(email);
        case 13:
          otpToken = _context7.sent;
          _context7.next = 16;
          return sendVerificationEmail(user.email, otpToken);
        case 16:
          _context7.next = 25;
          break;
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          if (!(_context7.t0.statusCode >= 400 && _context7.t0.statusCode < 500)) {
            _context7.next = 24;
            break;
          }
          throw _context7.t0;
        case 24:
          log.error(_context7.t0.message);
        case 25:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function regenerateOtp(_x10) {
    return _ref7.apply(this, arguments);
  };
}();
var verifyUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(email, otpToken) {
    var user;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return findUserByEmail(email);
        case 3:
          user = _context8.sent;
          if (user) {
            _context8.next = 6;
            break;
          }
          throw CustomError("User not found.", 400);
        case 6:
          _context8.next = 8;
          return passwordService.verifyOtp(email, otpToken);
        case 8:
          // Now that the OTP is valid, activate the user account
          user.activeAccount = true;
          user.failedLoginAttempts = 0;
          _context8.next = 12;
          return user.save();
        case 12:
          _context8.next = 22;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](0);
          if (!(_context8.t0.statusCode >= 400 && _context8.t0.statusCode < 500)) {
            _context8.next = 20;
            break;
          }
          throw _context8.t0;
        case 20:
          log.error(_context8.t0.message);
          throw CustomError("Unable to verify.", 500);
        case 22:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 14]]);
  }));
  return function verifyUser(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = {
  findUserByEmail: findUserByEmail,
  createUser: createUser,
  resetPassword: resetPassword,
  loginUser: loginUser,
  verifyUser: verifyUser,
  regenerateOtp: regenerateOtp,
  findUserById: findUserById
};

/***/ }),

/***/ 642:
/***/ ((module) => {

function extractToken(req) {
  var _req$headers, _req$cookies, _req$query;
  // Try to extract token from Authorization header
  var authorizationHeader = (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1]; // Extract the token part
  }

  // Fallback: Try to extract token from cookies
  if ((_req$cookies = req.cookies) !== null && _req$cookies !== void 0 && _req$cookies.token) {
    return req.cookies.token; // Extract token from 'token' cookie
  }

  // Add more fallbacks as needed, such as from query parameters
  if ((_req$query = req.query) !== null && _req$query !== void 0 && _req$query.token) {
    return req.query.token; // Extract token from query string
  }

  // Return null if no token is found
  return null;
}
module.exports = extractToken;

/***/ }),

/***/ 111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var WebSocket = __webpack_require__(86);
var wss;
var initializeWebSocket = function initializeWebSocket(server) {
  wss = new WebSocket.Server({
    server: server
  });
  wss.on("connection", function (ws) {
    console.log("New WebSocket connection established");

    // Handle messages from the client
    ws.on("message", function (message) {
      console.log("Received from client:", message);
    });

    // Handle WebSocket disconnections
    ws.on("close", function () {
      console.log("WebSocket connection closed");
    });
  });
  console.log("WebSocket server initialized");
};

// Helper function to broadcast messages
var broadcastData = function broadcastData(data) {
  if (wss) {
    wss.clients.forEach(function (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  } else {
    console.error("WebSocket server not initialized");
  }
};
module.exports = {
  initializeWebSocket: initializeWebSocket,
  broadcastData: broadcastData
};

/***/ }),

/***/ 870:
/***/ ((module) => {

"use strict";
module.exports = require("../blockchain/backend/src/chaincodeHelper");

/***/ }),

/***/ 486:
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ 898:
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ 577:
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ 818:
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ 252:
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ 617:
/***/ ((module) => {

"use strict";
module.exports = require("express-graceful-shutdown");

/***/ }),

/***/ 239:
/***/ ((module) => {

"use strict";
module.exports = require("express-healthcheck");

/***/ }),

/***/ 763:
/***/ ((module) => {

"use strict";
module.exports = require("express-rate-limit");

/***/ }),

/***/ 975:
/***/ ((module) => {

"use strict";
module.exports = require("express-validator");

/***/ }),

/***/ 525:
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),

/***/ 856:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 829:
/***/ ((module) => {

"use strict";
module.exports = require("jsonwebtoken");

/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ 678:
/***/ ((module) => {

"use strict";
module.exports = require("lru-cache");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ 572:
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

/***/ }),

/***/ 288:
/***/ ((module) => {

"use strict";
module.exports = require("otplib");

/***/ }),

/***/ 278:
/***/ ((module) => {

"use strict";
module.exports = require("passport");

/***/ }),

/***/ 714:
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),

/***/ 903:
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),

/***/ 124:
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),

/***/ 86:
/***/ ((module) => {

"use strict";
module.exports = require("ws");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(__webpack_require__(818).config)();
var helmet = __webpack_require__(525);
var mongoose = __webpack_require__(37);
var express = __webpack_require__(252);
var http = __webpack_require__(856);
var healthcheck = __webpack_require__(239);
var gracefulShutdown = __webpack_require__(617);
var rateLimit = __webpack_require__(763);
var cors = __webpack_require__(577);
var cookieParser = __webpack_require__(898);
var passport = __webpack_require__(278);
var app = express();
var server = http.createServer(app);
var _require = __webpack_require__(111),
  initializeWebSocket = _require.initializeWebSocket;
var errorHandler = __webpack_require__(946);
var userRoute = __webpack_require__(611);
var assetRoute = __webpack_require__(576);

// Initialize WebSocket server
initializeWebSocket(server);
var dbUrl = process.env.DATABASE_URL;
var maxPoolSize = process.env.MAX_POOL_SIZE;
var maxIdleTimeMS = process.env.MAX_Idle_Time_MS;
var connectionTimeoutMS = process.env.CONECTION_TIMEOUT_MS;

// Helmet for security
app.use(helmet());

// Enable XSS protection
app.use(function (req, res, next) {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Rate limiter
var limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 1000,
  // Limit each IP
  message: "Too many requests from this IP, please try again later"
});
app.use(limiter);

// CORS configuration
var corsOptions = {
  origin: function origin(_origin, callback) {
    callback(null, true); // Allow all origins
  }
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

// List of allowed origins
// const allowedOrigins = [
//   process.env.FRONTEND_URL, // Frontend URL from environment variables
//   "http://localhost:3000", // Additional allowed origin
// ];

// // CORS options
// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps or Postman)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies and authentication headers
// };

// // Use CORS middleware
// app.use(cors(corsOptions));

// Passport and cookies
app.use(passport.initialize());
app.use(cookieParser());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var PORT = process.env.PORT || 3000;

// Health check route
app.use("/health", healthcheck());

// Routes
app.use("/v1/api/user", userRoute);
app.use("/v1/api/asset", assetRoute);
app.get("/", function (req, res) {
  return res.send("App is working (1)!");
});

// Error handler middleware
app.use(errorHandler);

// Graceful shutdown middleware
app.use(gracefulShutdown(app));

// Start the server
server.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});

// Connect to MongoDB
mongoose.connect(dbUrl, {
  maxPoolSize: maxPoolSize,
  maxIdleTimeMS: maxIdleTimeMS,
  connectTimeoutMS: connectionTimeoutMS
}).then(function () {
  console.log("Connected to database!");
})["catch"](function (error) {
  console.error("Database connection failed:", error);
});

// Graceful shutdown logic
var gracefulExit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("Graceful shutdown initiated");

          // Stop accepting new requests
          server.close(function (err) {
            if (err) {
              console.error("Error closing server:", err);
              process.exit(1);
            }
            console.log("HTTP server closed, closing MongoDB connection");
            mongoose.disconnect();
          });
          setTimeout(function () {
            console.log("Forced shutdown after timeout");
            process.exit(1);
          }, 10000); // 10 seconds timeout
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function gracefulExit() {
    return _ref.apply(this, arguments);
  };
}();
process.on("SIGTERM", gracefulExit);
process.on("SIGINT", gracefulExit);
})();

/******/ })()
;
//# sourceMappingURL=app.js.map