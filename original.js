function Z0(n, r) {
  for (var i = 0; i < r.length; i++) {
    const c = r[i];
    if (typeof c != "string" && !Array.isArray(c)) {
      for (const d in c)
        if (d !== "default" && !(d in n)) {
          const f = Object.getOwnPropertyDescriptor(c, d);
          f &&
            Object.defineProperty(
              n,
              d,
              f.get ? f : { enumerable: !0, get: () => c[d] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const d of document.querySelectorAll('link[rel="modulepreload"]')) c(d);
  new MutationObserver((d) => {
    for (const f of d)
      if (f.type === "childList")
        for (const h of f.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && c(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(d) {
    const f = {};
    return (
      d.integrity && (f.integrity = d.integrity),
      d.referrerPolicy && (f.referrerPolicy = d.referrerPolicy),
      d.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : d.crossOrigin === "anonymous"
          ? (f.credentials = "omit")
          : (f.credentials = "same-origin"),
      f
    );
  }
  function c(d) {
    if (d.ep) return;
    d.ep = !0;
    const f = i(d);
    fetch(d.href, f);
  }
})();
function Qx(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default")
    ? n.default
    : n;
}
var xu = { exports: {} },
  Xr = {};
var Dp;
function $0() {
  if (Dp) return Xr;
  Dp = 1;
  var n = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.fragment");
  function i(c, d, f) {
    var h = null;
    if (
      (f !== void 0 && (h = "" + f),
      d.key !== void 0 && (h = "" + d.key),
      "key" in d)
    ) {
      f = {};
      for (var x in d) x !== "key" && (f[x] = d[x]);
    } else f = d;
    return (
      (d = f.ref),
      { $$typeof: n, type: c, key: h, ref: d !== void 0 ? d : null, props: f }
    );
  }
  return ((Xr.Fragment = r), (Xr.jsx = i), (Xr.jsxs = i), Xr);
}
var zp;
function J0() {
  return (zp || ((zp = 1), (xu.exports = $0())), xu.exports);
}
var l = J0(),
  gu = { exports: {} },
  Fr = {},
  yu = { exports: {} },
  vu = {};
var Lp;
function I0() {
  return (
    Lp ||
      ((Lp = 1),
      (function (n) {
        function r(_, K) {
          var X = _.length;
          _.push(K);
          e: for (; 0 < X; ) {
            var le = (X - 1) >>> 1,
              w = _[le];
            if (0 < d(w, K)) ((_[le] = K), (_[X] = w), (X = le));
            else break e;
          }
        }
        function i(_) {
          return _.length === 0 ? null : _[0];
        }
        function c(_) {
          if (_.length === 0) return null;
          var K = _[0],
            X = _.pop();
          if (X !== K) {
            _[0] = X;
            e: for (var le = 0, w = _.length, Y = w >>> 1; le < Y; ) {
              var J = 2 * (le + 1) - 1,
                $ = _[J],
                se = J + 1,
                oe = _[se];
              if (0 > d($, X))
                se < w && 0 > d(oe, $)
                  ? ((_[le] = oe), (_[se] = X), (le = se))
                  : ((_[le] = $), (_[J] = X), (le = J));
              else if (se < w && 0 > d(oe, X))
                ((_[le] = oe), (_[se] = X), (le = se));
              else break e;
            }
          }
          return K;
        }
        function d(_, K) {
          var X = _.sortIndex - K.sortIndex;
          return X !== 0 ? X : _.id - K.id;
        }
        if (
          ((n.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          n.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            x = h.now();
          n.unstable_now = function () {
            return h.now() - x;
          };
        }
        var m = [],
          p = [],
          v = 1,
          y = null,
          N = 3,
          T = !1,
          R = !1,
          S = !1,
          C = !1,
          A = typeof setTimeout == "function" ? setTimeout : null,
          U = typeof clearTimeout == "function" ? clearTimeout : null,
          z = typeof setImmediate < "u" ? setImmediate : null;
        function H(_) {
          for (var K = i(p); K !== null; ) {
            if (K.callback === null) c(p);
            else if (K.startTime <= _)
              (c(p), (K.sortIndex = K.expirationTime), r(m, K));
            else break;
            K = i(p);
          }
        }
        function V(_) {
          if (((S = !1), H(_), !R))
            if (i(m) !== null) ((R = !0), F || ((F = !0), ue()));
            else {
              var K = i(p);
              K !== null && de(V, K.startTime - _);
            }
        }
        var F = !1,
          Z = -1,
          G = 5,
          re = -1;
        function he() {
          return C ? !0 : !(n.unstable_now() - re < G);
        }
        function me() {
          if (((C = !1), F)) {
            var _ = n.unstable_now();
            re = _;
            var K = !0;
            try {
              e: {
                ((R = !1), S && ((S = !1), U(Z), (Z = -1)), (T = !0));
                var X = N;
                try {
                  t: {
                    for (
                      H(_), y = i(m);
                      y !== null && !(y.expirationTime > _ && he());
                    ) {
                      var le = y.callback;
                      if (typeof le == "function") {
                        ((y.callback = null), (N = y.priorityLevel));
                        var w = le(y.expirationTime <= _);
                        if (((_ = n.unstable_now()), typeof w == "function")) {
                          ((y.callback = w), H(_), (K = !0));
                          break t;
                        }
                        (y === i(m) && c(m), H(_));
                      } else c(m);
                      y = i(m);
                    }
                    if (y !== null) K = !0;
                    else {
                      var Y = i(p);
                      (Y !== null && de(V, Y.startTime - _), (K = !1));
                    }
                  }
                  break e;
                } finally {
                  ((y = null), (N = X), (T = !1));
                }
                K = void 0;
              }
            } finally {
              K ? ue() : (F = !1);
            }
          }
        }
        var ue;
        if (typeof z == "function")
          ue = function () {
            z(me);
          };
        else if (typeof MessageChannel < "u") {
          var ye = new MessageChannel(),
            I = ye.port2;
          ((ye.port1.onmessage = me),
            (ue = function () {
              I.postMessage(null);
            }));
        } else
          ue = function () {
            A(me, 0);
          };
        function de(_, K) {
          Z = A(function () {
            _(n.unstable_now());
          }, K);
        }
        ((n.unstable_IdlePriority = 5),
          (n.unstable_ImmediatePriority = 1),
          (n.unstable_LowPriority = 4),
          (n.unstable_NormalPriority = 3),
          (n.unstable_Profiling = null),
          (n.unstable_UserBlockingPriority = 2),
          (n.unstable_cancelCallback = function (_) {
            _.callback = null;
          }),
          (n.unstable_forceFrameRate = function (_) {
            0 > _ || 125 < _
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (G = 0 < _ ? Math.floor(1e3 / _) : 5);
          }),
          (n.unstable_getCurrentPriorityLevel = function () {
            return N;
          }),
          (n.unstable_next = function (_) {
            switch (N) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = N;
            }
            var X = N;
            N = K;
            try {
              return _();
            } finally {
              N = X;
            }
          }),
          (n.unstable_requestPaint = function () {
            C = !0;
          }),
          (n.unstable_runWithPriority = function (_, K) {
            switch (_) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                _ = 3;
            }
            var X = N;
            N = _;
            try {
              return K();
            } finally {
              N = X;
            }
          }),
          (n.unstable_scheduleCallback = function (_, K, X) {
            var le = n.unstable_now();
            switch (
              (typeof X == "object" && X !== null
                ? ((X = X.delay),
                  (X = typeof X == "number" && 0 < X ? le + X : le))
                : (X = le),
              _)
            ) {
              case 1:
                var w = -1;
                break;
              case 2:
                w = 250;
                break;
              case 5:
                w = 1073741823;
                break;
              case 4:
                w = 1e4;
                break;
              default:
                w = 5e3;
            }
            return (
              (w = X + w),
              (_ = {
                id: v++,
                callback: K,
                priorityLevel: _,
                startTime: X,
                expirationTime: w,
                sortIndex: -1,
              }),
              X > le
                ? ((_.sortIndex = X),
                  r(p, _),
                  i(m) === null &&
                    _ === i(p) &&
                    (S ? (U(Z), (Z = -1)) : (S = !0), de(V, X - le)))
                : ((_.sortIndex = w),
                  r(m, _),
                  R || T || ((R = !0), F || ((F = !0), ue()))),
              _
            );
          }),
          (n.unstable_shouldYield = he),
          (n.unstable_wrapCallback = function (_) {
            var K = N;
            return function () {
              var X = N;
              N = K;
              try {
                return _.apply(this, arguments);
              } finally {
                N = X;
              }
            };
          }));
      })(vu)),
    vu
  );
}
var Up;
function W0() {
  return (Up || ((Up = 1), (yu.exports = I0())), yu.exports);
}
var bu = { exports: {} },
  pe = {};
var qp;
function e1() {
  if (qp) return pe;
  qp = 1;
  var n = Symbol.for("react.transitional.element"),
    r = Symbol.for("react.portal"),
    i = Symbol.for("react.fragment"),
    c = Symbol.for("react.strict_mode"),
    d = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    x = Symbol.for("react.forward_ref"),
    m = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    y = Symbol.iterator;
  function N(w) {
    return w === null || typeof w != "object"
      ? null
      : ((w = (y && w[y]) || w["@@iterator"]),
        typeof w == "function" ? w : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    R = Object.assign,
    S = {};
  function C(w, Y, J) {
    ((this.props = w),
      (this.context = Y),
      (this.refs = S),
      (this.updater = J || T));
  }
  ((C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (w, Y) {
      if (typeof w != "object" && typeof w != "function" && w != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, w, Y, "setState");
    }),
    (C.prototype.forceUpdate = function (w) {
      this.updater.enqueueForceUpdate(this, w, "forceUpdate");
    }));
  function A() {}
  A.prototype = C.prototype;
  function U(w, Y, J) {
    ((this.props = w),
      (this.context = Y),
      (this.refs = S),
      (this.updater = J || T));
  }
  var z = (U.prototype = new A());
  ((z.constructor = U), R(z, C.prototype), (z.isPureReactComponent = !0));
  var H = Array.isArray,
    V = { H: null, A: null, T: null, S: null, V: null },
    F = Object.prototype.hasOwnProperty;
  function Z(w, Y, J, $, se, oe) {
    return (
      (J = oe.ref),
      { $$typeof: n, type: w, key: Y, ref: J !== void 0 ? J : null, props: oe }
    );
  }
  function G(w, Y) {
    return Z(w.type, Y, void 0, void 0, void 0, w.props);
  }
  function re(w) {
    return typeof w == "object" && w !== null && w.$$typeof === n;
  }
  function he(w) {
    var Y = { "=": "=0", ":": "=2" };
    return (
      "$" +
      w.replace(/[=:]/g, function (J) {
        return Y[J];
      })
    );
  }
  var me = /\/+/g;
  function ue(w, Y) {
    return typeof w == "object" && w !== null && w.key != null
      ? he("" + w.key)
      : Y.toString(36);
  }
  function ye() {}
  function I(w) {
    switch (w.status) {
      case "fulfilled":
        return w.value;
      case "rejected":
        throw w.reason;
      default:
        switch (
          (typeof w.status == "string"
            ? w.then(ye, ye)
            : ((w.status = "pending"),
              w.then(
                function (Y) {
                  w.status === "pending" &&
                    ((w.status = "fulfilled"), (w.value = Y));
                },
                function (Y) {
                  w.status === "pending" &&
                    ((w.status = "rejected"), (w.reason = Y));
                },
              )),
          w.status)
        ) {
          case "fulfilled":
            return w.value;
          case "rejected":
            throw w.reason;
        }
    }
    throw w;
  }
  function de(w, Y, J, $, se) {
    var oe = typeof w;
    (oe === "undefined" || oe === "boolean") && (w = null);
    var ne = !1;
    if (w === null) ne = !0;
    else
      switch (oe) {
        case "bigint":
        case "string":
        case "number":
          ne = !0;
          break;
        case "object":
          switch (w.$$typeof) {
            case n:
            case r:
              ne = !0;
              break;
            case v:
              return ((ne = w._init), de(ne(w._payload), Y, J, $, se));
          }
      }
    if (ne)
      return (
        (se = se(w)),
        (ne = $ === "" ? "." + ue(w, 0) : $),
        H(se)
          ? ((J = ""),
            ne != null && (J = ne.replace(me, "$&/") + "/"),
            de(se, Y, J, "", function (_e) {
              return _e;
            }))
          : se != null &&
            (re(se) &&
              (se = G(
                se,
                J +
                  (se.key == null || (w && w.key === se.key)
                    ? ""
                    : ("" + se.key).replace(me, "$&/") + "/") +
                  ne,
              )),
            Y.push(se)),
        1
      );
    ne = 0;
    var Qe = $ === "" ? "." : $ + ":";
    if (H(w))
      for (var Me = 0; Me < w.length; Me++)
        (($ = w[Me]), (oe = Qe + ue($, Me)), (ne += de($, Y, J, oe, se)));
    else if (((Me = N(w)), typeof Me == "function"))
      for (w = Me.call(w), Me = 0; !($ = w.next()).done; )
        (($ = $.value), (oe = Qe + ue($, Me++)), (ne += de($, Y, J, oe, se)));
    else if (oe === "object") {
      if (typeof w.then == "function") return de(I(w), Y, J, $, se);
      throw (
        (Y = String(w)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Y === "[object Object]"
              ? "object with keys {" + Object.keys(w).join(", ") + "}"
              : Y) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return ne;
  }
  function _(w, Y, J) {
    if (w == null) return w;
    var $ = [],
      se = 0;
    return (
      de(w, $, "", "", function (oe) {
        return Y.call(J, oe, se++);
      }),
      $
    );
  }
  function K(w) {
    if (w._status === -1) {
      var Y = w._result;
      ((Y = Y()),
        Y.then(
          function (J) {
            (w._status === 0 || w._status === -1) &&
              ((w._status = 1), (w._result = J));
          },
          function (J) {
            (w._status === 0 || w._status === -1) &&
              ((w._status = 2), (w._result = J));
          },
        ),
        w._status === -1 && ((w._status = 0), (w._result = Y)));
    }
    if (w._status === 1) return w._result.default;
    throw w._result;
  }
  var X =
    typeof reportError == "function"
      ? reportError
      : function (w) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var Y = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof w == "object" &&
                w !== null &&
                typeof w.message == "string"
                  ? String(w.message)
                  : String(w),
              error: w,
            });
            if (!window.dispatchEvent(Y)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", w);
            return;
          }
          console.error(w);
        };
  function le() {}
  return (
    (pe.Children = {
      map: _,
      forEach: function (w, Y, J) {
        _(
          w,
          function () {
            Y.apply(this, arguments);
          },
          J,
        );
      },
      count: function (w) {
        var Y = 0;
        return (
          _(w, function () {
            Y++;
          }),
          Y
        );
      },
      toArray: function (w) {
        return (
          _(w, function (Y) {
            return Y;
          }) || []
        );
      },
      only: function (w) {
        if (!re(w))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return w;
      },
    }),
    (pe.Component = C),
    (pe.Fragment = i),
    (pe.Profiler = d),
    (pe.PureComponent = U),
    (pe.StrictMode = c),
    (pe.Suspense = m),
    (pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V),
    (pe.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (w) {
        return V.H.useMemoCache(w);
      },
    }),
    (pe.cache = function (w) {
      return function () {
        return w.apply(null, arguments);
      };
    }),
    (pe.cloneElement = function (w, Y, J) {
      if (w == null)
        throw Error(
          "The argument must be a React element, but you passed " + w + ".",
        );
      var $ = R({}, w.props),
        se = w.key,
        oe = void 0;
      if (Y != null)
        for (ne in (Y.ref !== void 0 && (oe = void 0),
        Y.key !== void 0 && (se = "" + Y.key),
        Y))
          !F.call(Y, ne) ||
            ne === "key" ||
            ne === "__self" ||
            ne === "__source" ||
            (ne === "ref" && Y.ref === void 0) ||
            ($[ne] = Y[ne]);
      var ne = arguments.length - 2;
      if (ne === 1) $.children = J;
      else if (1 < ne) {
        for (var Qe = Array(ne), Me = 0; Me < ne; Me++)
          Qe[Me] = arguments[Me + 2];
        $.children = Qe;
      }
      return Z(w.type, se, void 0, void 0, oe, $);
    }),
    (pe.createContext = function (w) {
      return (
        (w = {
          $$typeof: h,
          _currentValue: w,
          _currentValue2: w,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (w.Provider = w),
        (w.Consumer = { $$typeof: f, _context: w }),
        w
      );
    }),
    (pe.createElement = function (w, Y, J) {
      var $,
        se = {},
        oe = null;
      if (Y != null)
        for ($ in (Y.key !== void 0 && (oe = "" + Y.key), Y))
          F.call(Y, $) &&
            $ !== "key" &&
            $ !== "__self" &&
            $ !== "__source" &&
            (se[$] = Y[$]);
      var ne = arguments.length - 2;
      if (ne === 1) se.children = J;
      else if (1 < ne) {
        for (var Qe = Array(ne), Me = 0; Me < ne; Me++)
          Qe[Me] = arguments[Me + 2];
        se.children = Qe;
      }
      if (w && w.defaultProps)
        for ($ in ((ne = w.defaultProps), ne))
          se[$] === void 0 && (se[$] = ne[$]);
      return Z(w, oe, void 0, void 0, null, se);
    }),
    (pe.createRef = function () {
      return { current: null };
    }),
    (pe.forwardRef = function (w) {
      return { $$typeof: x, render: w };
    }),
    (pe.isValidElement = re),
    (pe.lazy = function (w) {
      return { $$typeof: v, _payload: { _status: -1, _result: w }, _init: K };
    }),
    (pe.memo = function (w, Y) {
      return { $$typeof: p, type: w, compare: Y === void 0 ? null : Y };
    }),
    (pe.startTransition = function (w) {
      var Y = V.T,
        J = {};
      V.T = J;
      try {
        var $ = w(),
          se = V.S;
        (se !== null && se(J, $),
          typeof $ == "object" &&
            $ !== null &&
            typeof $.then == "function" &&
            $.then(le, X));
      } catch (oe) {
        X(oe);
      } finally {
        V.T = Y;
      }
    }),
    (pe.unstable_useCacheRefresh = function () {
      return V.H.useCacheRefresh();
    }),
    (pe.use = function (w) {
      return V.H.use(w);
    }),
    (pe.useActionState = function (w, Y, J) {
      return V.H.useActionState(w, Y, J);
    }),
    (pe.useCallback = function (w, Y) {
      return V.H.useCallback(w, Y);
    }),
    (pe.useContext = function (w) {
      return V.H.useContext(w);
    }),
    (pe.useDebugValue = function () {}),
    (pe.useDeferredValue = function (w, Y) {
      return V.H.useDeferredValue(w, Y);
    }),
    (pe.useEffect = function (w, Y, J) {
      var $ = V.H;
      if (typeof J == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return $.useEffect(w, Y);
    }),
    (pe.useId = function () {
      return V.H.useId();
    }),
    (pe.useImperativeHandle = function (w, Y, J) {
      return V.H.useImperativeHandle(w, Y, J);
    }),
    (pe.useInsertionEffect = function (w, Y) {
      return V.H.useInsertionEffect(w, Y);
    }),
    (pe.useLayoutEffect = function (w, Y) {
      return V.H.useLayoutEffect(w, Y);
    }),
    (pe.useMemo = function (w, Y) {
      return V.H.useMemo(w, Y);
    }),
    (pe.useOptimistic = function (w, Y) {
      return V.H.useOptimistic(w, Y);
    }),
    (pe.useReducer = function (w, Y, J) {
      return V.H.useReducer(w, Y, J);
    }),
    (pe.useRef = function (w) {
      return V.H.useRef(w);
    }),
    (pe.useState = function (w) {
      return V.H.useState(w);
    }),
    (pe.useSyncExternalStore = function (w, Y, J) {
      return V.H.useSyncExternalStore(w, Y, J);
    }),
    (pe.useTransition = function () {
      return V.H.useTransition();
    }),
    (pe.version = "19.1.0"),
    pe
  );
}
var Hp;
function Yi() {
  return (Hp || ((Hp = 1), (bu.exports = e1())), bu.exports);
}
var ju = { exports: {} },
  xt = {};
var Bp;
function t1() {
  if (Bp) return xt;
  Bp = 1;
  var n = Yi();
  function r(m) {
    var p = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        p += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      m +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function i() {}
  var c = {
      d: {
        f: i,
        r: function () {
          throw Error(r(522));
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    d = Symbol.for("react.portal");
  function f(m, p, v) {
    var y =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: y == null ? null : "" + y,
      children: m,
      containerInfo: p,
      implementation: v,
    };
  }
  var h = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function x(m, p) {
    if (m === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c),
    (xt.createPortal = function (m, p) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(r(299));
      return f(m, p, null, v);
    }),
    (xt.flushSync = function (m) {
      var p = h.T,
        v = c.p;
      try {
        if (((h.T = null), (c.p = 2), m)) return m();
      } finally {
        ((h.T = p), (c.p = v), c.d.f());
      }
    }),
    (xt.preconnect = function (m, p) {
      typeof m == "string" &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == "string"
                ? p === "use-credentials"
                  ? p
                  : ""
                : void 0))
          : (p = null),
        c.d.C(m, p));
    }),
    (xt.prefetchDNS = function (m) {
      typeof m == "string" && c.d.D(m);
    }),
    (xt.preinit = function (m, p) {
      if (typeof m == "string" && p && typeof p.as == "string") {
        var v = p.as,
          y = x(v, p.crossOrigin),
          N = typeof p.integrity == "string" ? p.integrity : void 0,
          T = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        v === "style"
          ? c.d.S(m, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: y,
              integrity: N,
              fetchPriority: T,
            })
          : v === "script" &&
            c.d.X(m, {
              crossOrigin: y,
              integrity: N,
              fetchPriority: T,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
      }
    }),
    (xt.preinitModule = function (m, p) {
      if (typeof m == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var v = x(p.as, p.crossOrigin);
            c.d.M(m, {
              crossOrigin: v,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0,
            });
          }
        } else p == null && c.d.M(m);
    }),
    (xt.preload = function (m, p) {
      if (
        typeof m == "string" &&
        typeof p == "object" &&
        p !== null &&
        typeof p.as == "string"
      ) {
        var v = p.as,
          y = x(v, p.crossOrigin);
        c.d.L(m, v, {
          crossOrigin: y,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0,
        });
      }
    }),
    (xt.preloadModule = function (m, p) {
      if (typeof m == "string")
        if (p) {
          var v = x(p.as, p.crossOrigin);
          c.d.m(m, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: v,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          });
        } else c.d.m(m);
    }),
    (xt.requestFormReset = function (m) {
      c.d.r(m);
    }),
    (xt.unstable_batchedUpdates = function (m, p) {
      return m(p);
    }),
    (xt.useFormState = function (m, p, v) {
      return h.H.useFormState(m, p, v);
    }),
    (xt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (xt.version = "19.1.0"),
    xt
  );
}
var Gp;
function Px() {
  if (Gp) return ju.exports;
  Gp = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return (n(), (ju.exports = t1()), ju.exports);
}
var Qp;
function n1() {
  if (Qp) return Fr;
  Qp = 1;
  var n = W0(),
    r = Yi(),
    i = Px();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var s = 2; s < arguments.length; s++)
        t += "&args[]=" + encodeURIComponent(arguments[s]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function d(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
    var t = e,
      s = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (s = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? s : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function x(e) {
    if (f(e) !== e) throw Error(c(188));
  }
  function m(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var s = e, a = t; ; ) {
      var o = s.return;
      if (o === null) break;
      var u = o.alternate;
      if (u === null) {
        if (((a = o.return), a !== null)) {
          s = a;
          continue;
        }
        break;
      }
      if (o.child === u.child) {
        for (u = o.child; u; ) {
          if (u === s) return (x(o), e);
          if (u === a) return (x(o), t);
          u = u.sibling;
        }
        throw Error(c(188));
      }
      if (s.return !== a.return) ((s = o), (a = u));
      else {
        for (var g = !1, b = o.child; b; ) {
          if (b === s) {
            ((g = !0), (s = o), (a = u));
            break;
          }
          if (b === a) {
            ((g = !0), (a = o), (s = u));
            break;
          }
          b = b.sibling;
        }
        if (!g) {
          for (b = u.child; b; ) {
            if (b === s) {
              ((g = !0), (s = u), (a = o));
              break;
            }
            if (b === a) {
              ((g = !0), (a = u), (s = o));
              break;
            }
            b = b.sibling;
          }
          if (!g) throw Error(c(189));
        }
      }
      if (s.alternate !== a) throw Error(c(190));
    }
    if (s.tag !== 3) throw Error(c(188));
    return s.stateNode.current === s ? e : t;
  }
  function p(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = p(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign,
    y = Symbol.for("react.element"),
    N = Symbol.for("react.transitional.element"),
    T = Symbol.for("react.portal"),
    R = Symbol.for("react.fragment"),
    S = Symbol.for("react.strict_mode"),
    C = Symbol.for("react.profiler"),
    A = Symbol.for("react.provider"),
    U = Symbol.for("react.consumer"),
    z = Symbol.for("react.context"),
    H = Symbol.for("react.forward_ref"),
    V = Symbol.for("react.suspense"),
    F = Symbol.for("react.suspense_list"),
    Z = Symbol.for("react.memo"),
    G = Symbol.for("react.lazy"),
    re = Symbol.for("react.activity"),
    he = Symbol.for("react.memo_cache_sentinel"),
    me = Symbol.iterator;
  function ue(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (me && e[me]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var ye = Symbol.for("react.client.reference");
  function I(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case R:
        return "Fragment";
      case C:
        return "Profiler";
      case S:
        return "StrictMode";
      case V:
        return "Suspense";
      case F:
        return "SuspenseList";
      case re:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case T:
          return "Portal";
        case z:
          return (e.displayName || "Context") + ".Provider";
        case U:
          return (e._context.displayName || "Context") + ".Consumer";
        case H:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Z:
          return (
            (t = e.displayName || null),
            t !== null ? t : I(e.type) || "Memo"
          );
        case G:
          ((t = e._payload), (e = e._init));
          try {
            return I(e(t));
          } catch {}
      }
    return null;
  }
  var de = Array.isArray,
    _ = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    K = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = { pending: !1, data: null, method: null, action: null },
    le = [],
    w = -1;
  function Y(e) {
    return { current: e };
  }
  function J(e) {
    0 > w || ((e.current = le[w]), (le[w] = null), w--);
  }
  function $(e, t) {
    (w++, (le[w] = e.current), (e.current = t));
  }
  var se = Y(null),
    oe = Y(null),
    ne = Y(null),
    Qe = Y(null);
  function Me(e, t) {
    switch (($(ne, t), $(oe, e), $(se, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? op(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = op(t)), (e = cp(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (J(se), $(se, e));
  }
  function _e() {
    (J(se), J(oe), J(ne));
  }
  function Yn(e) {
    e.memoizedState !== null && $(Qe, e);
    var t = se.current,
      s = cp(t, e.type);
    t !== s && ($(oe, e), $(se, s));
  }
  function en(e) {
    (oe.current === e && (J(se), J(oe)),
      Qe.current === e && (J(Qe), (Qr._currentValue = X)));
  }
  var on = Object.prototype.hasOwnProperty,
    Qt = n.unstable_scheduleCallback,
    Vn = n.unstable_cancelCallback,
    Av = n.unstable_shouldYield,
    Rv = n.unstable_requestPaint,
    cn = n.unstable_now,
    Cv = n.unstable_getCurrentPriorityLevel,
    Gd = n.unstable_ImmediatePriority,
    Qd = n.unstable_UserBlockingPriority,
    dl = n.unstable_NormalPriority,
    Ov = n.unstable_LowPriority,
    Pd = n.unstable_IdlePriority,
    Mv = n.log,
    _v = n.unstable_setDisableYieldValue,
    $a = null,
    Et = null;
  function Kn(e) {
    if (
      (typeof Mv == "function" && _v(e),
      Et && typeof Et.setStrictMode == "function")
    )
      try {
        Et.setStrictMode($a, e);
      } catch {}
  }
  var Tt = Math.clz32 ? Math.clz32 : zv,
    kv = Math.log,
    Dv = Math.LN2;
  function zv(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((kv(e) / Dv) | 0)) | 0);
  }
  var fl = 256,
    hl = 4194304;
  function As(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ml(e, t, s) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var o = 0,
      u = e.suspendedLanes,
      g = e.pingedLanes;
    e = e.warmLanes;
    var b = a & 134217727;
    return (
      b !== 0
        ? ((a = b & ~u),
          a !== 0
            ? (o = As(a))
            : ((g &= b),
              g !== 0
                ? (o = As(g))
                : s || ((s = b & ~e), s !== 0 && (o = As(s)))))
        : ((b = a & ~u),
          b !== 0
            ? (o = As(b))
            : g !== 0
              ? (o = As(g))
              : s || ((s = a & ~e), s !== 0 && (o = As(s)))),
      o === 0
        ? 0
        : t !== 0 &&
            t !== o &&
            (t & u) === 0 &&
            ((u = o & -o),
            (s = t & -t),
            u >= s || (u === 32 && (s & 4194048) !== 0))
          ? t
          : o
    );
  }
  function Ja(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Lv(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Yd() {
    var e = fl;
    return ((fl <<= 1), (fl & 4194048) === 0 && (fl = 256), e);
  }
  function Vd() {
    var e = hl;
    return ((hl <<= 1), (hl & 62914560) === 0 && (hl = 4194304), e);
  }
  function ao(e) {
    for (var t = [], s = 0; 31 > s; s++) t.push(e);
    return t;
  }
  function Ia(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Uv(e, t, s, a, o, u) {
    var g = e.pendingLanes;
    ((e.pendingLanes = s),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= s),
      (e.entangledLanes &= s),
      (e.errorRecoveryDisabledLanes &= s),
      (e.shellSuspendCounter = 0));
    var b = e.entanglements,
      E = e.expirationTimes,
      D = e.hiddenUpdates;
    for (s = g & ~s; 0 < s; ) {
      var B = 31 - Tt(s),
        P = 1 << B;
      ((b[B] = 0), (E[B] = -1));
      var L = D[B];
      if (L !== null)
        for (D[B] = null, B = 0; B < L.length; B++) {
          var q = L[B];
          q !== null && (q.lane &= -536870913);
        }
      s &= ~P;
    }
    (a !== 0 && Kd(e, a, 0),
      u !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(g & ~t)));
  }
  function Kd(e, t, s) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - Tt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (s & 4194090)));
  }
  function Xd(e, t) {
    var s = (e.entangledLanes |= t);
    for (e = e.entanglements; s; ) {
      var a = 31 - Tt(s),
        o = 1 << a;
      ((o & t) | (e[a] & t) && (e[a] |= t), (s &= ~o));
    }
  }
  function ro(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function lo(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Fd() {
    var e = K.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Rp(e.type));
  }
  function qv(e, t) {
    var s = K.p;
    try {
      return ((K.p = e), t());
    } finally {
      K.p = s;
    }
  }
  var Xn = Math.random().toString(36).slice(2),
    mt = "__reactFiber$" + Xn,
    vt = "__reactProps$" + Xn,
    sa = "__reactContainer$" + Xn,
    io = "__reactEvents$" + Xn,
    Hv = "__reactListeners$" + Xn,
    Bv = "__reactHandles$" + Xn,
    Zd = "__reactResources$" + Xn,
    Wa = "__reactMarker$" + Xn;
  function oo(e) {
    (delete e[mt], delete e[vt], delete e[io], delete e[Hv], delete e[Bv]);
  }
  function aa(e) {
    var t = e[mt];
    if (t) return t;
    for (var s = e.parentNode; s; ) {
      if ((t = s[sa] || s[mt])) {
        if (
          ((s = t.alternate),
          t.child !== null || (s !== null && s.child !== null))
        )
          for (e = hp(e); e !== null; ) {
            if ((s = e[mt])) return s;
            e = hp(e);
          }
        return t;
      }
      ((e = s), (s = e.parentNode));
    }
    return null;
  }
  function ra(e) {
    if ((e = e[mt] || e[sa])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function er(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function la(e) {
    var t = e[Zd];
    return (
      t ||
        (t = e[Zd] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function rt(e) {
    e[Wa] = !0;
  }
  var $d = new Set(),
    Jd = {};
  function Rs(e, t) {
    (ia(e, t), ia(e + "Capture", t));
  }
  function ia(e, t) {
    for (Jd[e] = t, e = 0; e < t.length; e++) $d.add(t[e]);
  }
  var Gv = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Id = {},
    Wd = {};
  function Qv(e) {
    return on.call(Wd, e)
      ? !0
      : on.call(Id, e)
        ? !1
        : Gv.test(e)
          ? (Wd[e] = !0)
          : ((Id[e] = !0), !1);
  }
  function pl(e, t, s) {
    if (Qv(t))
      if (s === null) e.removeAttribute(t);
      else {
        switch (typeof s) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + s);
      }
  }
  function xl(e, t, s) {
    if (s === null) e.removeAttribute(t);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + s);
    }
  }
  function jn(e, t, s, a) {
    if (a === null) e.removeAttribute(s);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(s);
          return;
      }
      e.setAttributeNS(t, s, "" + a);
    }
  }
  var co, ef;
  function oa(e) {
    if (co === void 0)
      try {
        throw Error();
      } catch (s) {
        var t = s.stack.trim().match(/\n( *(at )?)/);
        ((co = (t && t[1]) || ""),
          (ef =
            -1 <
            s.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < s.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      co +
      e +
      ef
    );
  }
  var uo = !1;
  function fo(e, t) {
    if (!e || uo) return "";
    uo = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var P = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(P.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(P, []);
                } catch (q) {
                  var L = q;
                }
                Reflect.construct(e, [], P);
              } else {
                try {
                  P.call();
                } catch (q) {
                  L = q;
                }
                e.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (q) {
                L = q;
              }
              (P = e()) &&
                typeof P.catch == "function" &&
                P.catch(function () {});
            }
          } catch (q) {
            if (q && L && typeof q.stack == "string") return [q.stack, L.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var o = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      o &&
        o.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = a.DetermineComponentFrameRoot(),
        g = u[0],
        b = u[1];
      if (g && b) {
        var E = g.split(`
`),
          D = b.split(`
`);
        for (
          o = a = 0;
          a < E.length && !E[a].includes("DetermineComponentFrameRoot");
        )
          a++;
        for (; o < D.length && !D[o].includes("DetermineComponentFrameRoot"); )
          o++;
        if (a === E.length || o === D.length)
          for (
            a = E.length - 1, o = D.length - 1;
            1 <= a && 0 <= o && E[a] !== D[o];
          )
            o--;
        for (; 1 <= a && 0 <= o; a--, o--)
          if (E[a] !== D[o]) {
            if (a !== 1 || o !== 1)
              do
                if ((a--, o--, 0 > o || E[a] !== D[o])) {
                  var B =
                    `
` + E[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      B.includes("<anonymous>") &&
                      (B = B.replace("<anonymous>", e.displayName)),
                    B
                  );
                }
              while (1 <= a && 0 <= o);
            break;
          }
      }
    } finally {
      ((uo = !1), (Error.prepareStackTrace = s));
    }
    return (s = e ? e.displayName || e.name : "") ? oa(s) : "";
  }
  function Pv(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return oa(e.type);
      case 16:
        return oa("Lazy");
      case 13:
        return oa("Suspense");
      case 19:
        return oa("SuspenseList");
      case 0:
      case 15:
        return fo(e.type, !1);
      case 11:
        return fo(e.type.render, !1);
      case 1:
        return fo(e.type, !0);
      case 31:
        return oa("Activity");
      default:
        return "";
    }
  }
  function tf(e) {
    try {
      var t = "";
      do ((t += Pv(e)), (e = e.return));
      while (e);
      return t;
    } catch (s) {
      return (
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack
      );
    }
  }
  function Pt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function nf(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Yv(e) {
    var t = nf(e) ? "checked" : "value",
      s = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof s < "u" &&
      typeof s.get == "function" &&
      typeof s.set == "function"
    ) {
      var o = s.get,
        u = s.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return o.call(this);
          },
          set: function (g) {
            ((a = "" + g), u.call(this, g));
          },
        }),
        Object.defineProperty(e, t, { enumerable: s.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (g) {
            a = "" + g;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function gl(e) {
    e._valueTracker || (e._valueTracker = Yv(e));
  }
  function sf(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var s = t.getValue(),
      a = "";
    return (
      e && (a = nf(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== s ? (t.setValue(e), !0) : !1
    );
  }
  function yl(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Vv = /[\n"\\]/g;
  function Yt(e) {
    return e.replace(Vv, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function ho(e, t, s, a, o, u, g, b) {
    ((e.name = ""),
      g != null &&
      typeof g != "function" &&
      typeof g != "symbol" &&
      typeof g != "boolean"
        ? (e.type = g)
        : e.removeAttribute("type"),
      t != null
        ? g === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Pt(t))
          : e.value !== "" + Pt(t) && (e.value = "" + Pt(t))
        : (g !== "submit" && g !== "reset") || e.removeAttribute("value"),
      t != null
        ? mo(e, g, Pt(t))
        : s != null
          ? mo(e, g, Pt(s))
          : a != null && e.removeAttribute("value"),
      o == null && u != null && (e.defaultChecked = !!u),
      o != null &&
        (e.checked = o && typeof o != "function" && typeof o != "symbol"),
      b != null &&
      typeof b != "function" &&
      typeof b != "symbol" &&
      typeof b != "boolean"
        ? (e.name = "" + Pt(b))
        : e.removeAttribute("name"));
  }
  function af(e, t, s, a, o, u, g, b) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (e.type = u),
      t != null || s != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) return;
      ((s = s != null ? "" + Pt(s) : ""),
        (t = t != null ? "" + Pt(t) : s),
        b || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? o),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = b ? e.checked : !!a),
      (e.defaultChecked = !!a),
      g != null &&
        typeof g != "function" &&
        typeof g != "symbol" &&
        typeof g != "boolean" &&
        (e.name = g));
  }
  function mo(e, t, s) {
    (t === "number" && yl(e.ownerDocument) === e) ||
      e.defaultValue === "" + s ||
      (e.defaultValue = "" + s);
  }
  function ca(e, t, s, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < s.length; o++) t["$" + s[o]] = !0;
      for (s = 0; s < e.length; s++)
        ((o = t.hasOwnProperty("$" + e[s].value)),
          e[s].selected !== o && (e[s].selected = o),
          o && a && (e[s].defaultSelected = !0));
    } else {
      for (s = "" + Pt(s), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === s) {
          ((e[o].selected = !0), a && (e[o].defaultSelected = !0));
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function rf(e, t, s) {
    if (
      t != null &&
      ((t = "" + Pt(t)), t !== e.value && (e.value = t), s == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = s != null ? "" + Pt(s) : "";
  }
  function lf(e, t, s, a) {
    if (t == null) {
      if (a != null) {
        if (s != null) throw Error(c(92));
        if (de(a)) {
          if (1 < a.length) throw Error(c(93));
          a = a[0];
        }
        s = a;
      }
      (s == null && (s = ""), (t = s));
    }
    ((s = Pt(t)),
      (e.defaultValue = s),
      (a = e.textContent),
      a === s && a !== "" && a !== null && (e.value = a));
  }
  function ua(e, t) {
    if (t) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Kv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function of(e, t, s) {
    var a = t.indexOf("--") === 0;
    s == null || typeof s == "boolean" || s === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : a
        ? e.setProperty(t, s)
        : typeof s != "number" || s === 0 || Kv.has(t)
          ? t === "float"
            ? (e.cssFloat = s)
            : (e[t] = ("" + s).trim())
          : (e[t] = s + "px");
  }
  function cf(e, t, s) {
    if (t != null && typeof t != "object") throw Error(c(62));
    if (((e = e.style), s != null)) {
      for (var a in s)
        !s.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
              ? (e.cssFloat = "")
              : (e[a] = ""));
      for (var o in t)
        ((a = t[o]), t.hasOwnProperty(o) && s[o] !== a && of(e, o, a));
    } else for (var u in t) t.hasOwnProperty(u) && of(e, u, t[u]);
  }
  function po(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Xv = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Fv =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vl(e) {
    return Fv.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var xo = null;
  function go(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var da = null,
    fa = null;
  function uf(e) {
    var t = ra(e);
    if (t && (e = t.stateNode)) {
      var s = e[vt] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (ho(
              e,
              s.value,
              s.defaultValue,
              s.defaultValue,
              s.checked,
              s.defaultChecked,
              s.type,
              s.name,
            ),
            (t = s.name),
            s.type === "radio" && t != null)
          ) {
            for (s = e; s.parentNode; ) s = s.parentNode;
            for (
              s = s.querySelectorAll(
                'input[name="' + Yt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < s.length;
              t++
            ) {
              var a = s[t];
              if (a !== e && a.form === e.form) {
                var o = a[vt] || null;
                if (!o) throw Error(c(90));
                ho(
                  a,
                  o.value,
                  o.defaultValue,
                  o.defaultValue,
                  o.checked,
                  o.defaultChecked,
                  o.type,
                  o.name,
                );
              }
            }
            for (t = 0; t < s.length; t++)
              ((a = s[t]), a.form === e.form && sf(a));
          }
          break e;
        case "textarea":
          rf(e, s.value, s.defaultValue);
          break e;
        case "select":
          ((t = s.value), t != null && ca(e, !!s.multiple, t, !1));
      }
    }
  }
  var yo = !1;
  function df(e, t, s) {
    if (yo) return e(t, s);
    yo = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((yo = !1),
        (da !== null || fa !== null) &&
          (ai(), da && ((t = da), (e = fa), (fa = da = null), uf(t), e)))
      )
        for (t = 0; t < e.length; t++) uf(e[t]);
    }
  }
  function tr(e, t) {
    var s = e.stateNode;
    if (s === null) return null;
    var a = s[vt] || null;
    if (a === null) return null;
    s = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (s && typeof s != "function") throw Error(c(231, t, typeof s));
    return s;
  }
  var Nn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    vo = !1;
  if (Nn)
    try {
      var nr = {};
      (Object.defineProperty(nr, "passive", {
        get: function () {
          vo = !0;
        },
      }),
        window.addEventListener("test", nr, nr),
        window.removeEventListener("test", nr, nr));
    } catch {
      vo = !1;
    }
  var Fn = null,
    bo = null,
    bl = null;
  function ff() {
    if (bl) return bl;
    var e,
      t = bo,
      s = t.length,
      a,
      o = "value" in Fn ? Fn.value : Fn.textContent,
      u = o.length;
    for (e = 0; e < s && t[e] === o[e]; e++);
    var g = s - e;
    for (a = 1; a <= g && t[s - a] === o[u - a]; a++);
    return (bl = o.slice(e, 1 < a ? 1 - a : void 0));
  }
  function jl(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Nl() {
    return !0;
  }
  function hf() {
    return !1;
  }
  function bt(e) {
    function t(s, a, o, u, g) {
      ((this._reactName = s),
        (this._targetInst = o),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = g),
        (this.currentTarget = null));
      for (var b in e)
        e.hasOwnProperty(b) && ((s = e[b]), (this[b] = s ? s(u) : u[b]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Nl
          : hf),
        (this.isPropagationStopped = hf),
        this
      );
    }
    return (
      v(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var s = this.nativeEvent;
          s &&
            (s.preventDefault
              ? s.preventDefault()
              : typeof s.returnValue != "unknown" && (s.returnValue = !1),
            (this.isDefaultPrevented = Nl));
        },
        stopPropagation: function () {
          var s = this.nativeEvent;
          s &&
            (s.stopPropagation
              ? s.stopPropagation()
              : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0),
            (this.isPropagationStopped = Nl));
        },
        persist: function () {},
        isPersistent: Nl,
      }),
      t
    );
  }
  var Cs = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    wl = bt(Cs),
    sr = v({}, Cs, { view: 0, detail: 0 }),
    Zv = bt(sr),
    jo,
    No,
    ar,
    Sl = v({}, sr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: So,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== ar &&
              (ar && e.type === "mousemove"
                ? ((jo = e.screenX - ar.screenX), (No = e.screenY - ar.screenY))
                : (No = jo = 0),
              (ar = e)),
            jo);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : No;
      },
    }),
    mf = bt(Sl),
    $v = v({}, Sl, { dataTransfer: 0 }),
    Jv = bt($v),
    Iv = v({}, sr, { relatedTarget: 0 }),
    wo = bt(Iv),
    Wv = v({}, Cs, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    eb = bt(Wv),
    tb = v({}, Cs, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    nb = bt(tb),
    sb = v({}, Cs, { data: 0 }),
    pf = bt(sb),
    ab = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    rb = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    lb = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function ib(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = lb[e])
        ? !!t[e]
        : !1;
  }
  function So() {
    return ib;
  }
  var ob = v({}, sr, {
      key: function (e) {
        if (e.key) {
          var t = ab[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = jl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? rb[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: So,
      charCode: function (e) {
        return e.type === "keypress" ? jl(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? jl(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    cb = bt(ob),
    ub = v({}, Sl, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    xf = bt(ub),
    db = v({}, sr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: So,
    }),
    fb = bt(db),
    hb = v({}, Cs, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    mb = bt(hb),
    pb = v({}, Sl, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    xb = bt(pb),
    gb = v({}, Cs, { newState: 0, oldState: 0 }),
    yb = bt(gb),
    vb = [9, 13, 27, 32],
    Eo = Nn && "CompositionEvent" in window,
    rr = null;
  Nn && "documentMode" in document && (rr = document.documentMode);
  var bb = Nn && "TextEvent" in window && !rr,
    gf = Nn && (!Eo || (rr && 8 < rr && 11 >= rr)),
    yf = " ",
    vf = !1;
  function bf(e, t) {
    switch (e) {
      case "keyup":
        return vb.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function jf(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var ha = !1;
  function jb(e, t) {
    switch (e) {
      case "compositionend":
        return jf(t);
      case "keypress":
        return t.which !== 32 ? null : ((vf = !0), yf);
      case "textInput":
        return ((e = t.data), e === yf && vf ? null : e);
      default:
        return null;
    }
  }
  function Nb(e, t) {
    if (ha)
      return e === "compositionend" || (!Eo && bf(e, t))
        ? ((e = ff()), (bl = bo = Fn = null), (ha = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return gf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var wb = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Nf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!wb[e.type] : t === "textarea";
  }
  function wf(e, t, s, a) {
    (da ? (fa ? fa.push(a) : (fa = [a])) : (da = a),
      (t = ui(t, "onChange")),
      0 < t.length &&
        ((s = new wl("onChange", "change", null, s, a)),
        e.push({ event: s, listeners: t })));
  }
  var lr = null,
    ir = null;
  function Sb(e) {
    sp(e, 0);
  }
  function El(e) {
    var t = er(e);
    if (sf(t)) return e;
  }
  function Sf(e, t) {
    if (e === "change") return t;
  }
  var Ef = !1;
  if (Nn) {
    var To;
    if (Nn) {
      var Ao = "oninput" in document;
      if (!Ao) {
        var Tf = document.createElement("div");
        (Tf.setAttribute("oninput", "return;"),
          (Ao = typeof Tf.oninput == "function"));
      }
      To = Ao;
    } else To = !1;
    Ef = To && (!document.documentMode || 9 < document.documentMode);
  }
  function Af() {
    lr && (lr.detachEvent("onpropertychange", Rf), (ir = lr = null));
  }
  function Rf(e) {
    if (e.propertyName === "value" && El(ir)) {
      var t = [];
      (wf(t, ir, e, go(e)), df(Sb, t));
    }
  }
  function Eb(e, t, s) {
    e === "focusin"
      ? (Af(), (lr = t), (ir = s), lr.attachEvent("onpropertychange", Rf))
      : e === "focusout" && Af();
  }
  function Tb(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return El(ir);
  }
  function Ab(e, t) {
    if (e === "click") return El(t);
  }
  function Rb(e, t) {
    if (e === "input" || e === "change") return El(t);
  }
  function Cb(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var At = typeof Object.is == "function" ? Object.is : Cb;
  function or(e, t) {
    if (At(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var s = Object.keys(e),
      a = Object.keys(t);
    if (s.length !== a.length) return !1;
    for (a = 0; a < s.length; a++) {
      var o = s[a];
      if (!on.call(t, o) || !At(e[o], t[o])) return !1;
    }
    return !0;
  }
  function Cf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Of(e, t) {
    var s = Cf(e);
    e = 0;
    for (var a; s; ) {
      if (s.nodeType === 3) {
        if (((a = e + s.textContent.length), e <= t && a >= t))
          return { node: s, offset: t - e };
        e = a;
      }
      e: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break e;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = Cf(s);
    }
  }
  function Mf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Mf(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function _f(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = yl(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof t.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = t.contentWindow;
      else break;
      t = yl(e.document);
    }
    return t;
  }
  function Ro(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Ob = Nn && "documentMode" in document && 11 >= document.documentMode,
    ma = null,
    Co = null,
    cr = null,
    Oo = !1;
  function kf(e, t, s) {
    var a =
      s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Oo ||
      ma == null ||
      ma !== yl(a) ||
      ((a = ma),
      "selectionStart" in a && Ro(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (cr && or(cr, a)) ||
        ((cr = a),
        (a = ui(Co, "onSelect")),
        0 < a.length &&
          ((t = new wl("onSelect", "select", null, t, s)),
          e.push({ event: t, listeners: a }),
          (t.target = ma))));
  }
  function Os(e, t) {
    var s = {};
    return (
      (s[e.toLowerCase()] = t.toLowerCase()),
      (s["Webkit" + e] = "webkit" + t),
      (s["Moz" + e] = "moz" + t),
      s
    );
  }
  var pa = {
      animationend: Os("Animation", "AnimationEnd"),
      animationiteration: Os("Animation", "AnimationIteration"),
      animationstart: Os("Animation", "AnimationStart"),
      transitionrun: Os("Transition", "TransitionRun"),
      transitionstart: Os("Transition", "TransitionStart"),
      transitioncancel: Os("Transition", "TransitionCancel"),
      transitionend: Os("Transition", "TransitionEnd"),
    },
    Mo = {},
    Df = {};
  Nn &&
    ((Df = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete pa.animationend.animation,
      delete pa.animationiteration.animation,
      delete pa.animationstart.animation),
    "TransitionEvent" in window || delete pa.transitionend.transition);
  function Ms(e) {
    if (Mo[e]) return Mo[e];
    if (!pa[e]) return e;
    var t = pa[e],
      s;
    for (s in t) if (t.hasOwnProperty(s) && s in Df) return (Mo[e] = t[s]);
    return e;
  }
  var zf = Ms("animationend"),
    Lf = Ms("animationiteration"),
    Uf = Ms("animationstart"),
    Mb = Ms("transitionrun"),
    _b = Ms("transitionstart"),
    kb = Ms("transitioncancel"),
    qf = Ms("transitionend"),
    Hf = new Map(),
    _o =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  _o.push("scrollEnd");
  function tn(e, t) {
    (Hf.set(e, t), Rs(t, [e]));
  }
  var Bf = new WeakMap();
  function Vt(e, t) {
    if (typeof e == "object" && e !== null) {
      var s = Bf.get(e);
      return s !== void 0
        ? s
        : ((t = { value: e, source: t, stack: tf(t) }), Bf.set(e, t), t);
    }
    return { value: e, source: t, stack: tf(t) };
  }
  var Kt = [],
    xa = 0,
    ko = 0;
  function Tl() {
    for (var e = xa, t = (ko = xa = 0); t < e; ) {
      var s = Kt[t];
      Kt[t++] = null;
      var a = Kt[t];
      Kt[t++] = null;
      var o = Kt[t];
      Kt[t++] = null;
      var u = Kt[t];
      if (((Kt[t++] = null), a !== null && o !== null)) {
        var g = a.pending;
        (g === null ? (o.next = o) : ((o.next = g.next), (g.next = o)),
          (a.pending = o));
      }
      u !== 0 && Gf(s, o, u);
    }
  }
  function Al(e, t, s, a) {
    ((Kt[xa++] = e),
      (Kt[xa++] = t),
      (Kt[xa++] = s),
      (Kt[xa++] = a),
      (ko |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function Do(e, t, s, a) {
    return (Al(e, t, s, a), Rl(e));
  }
  function ga(e, t) {
    return (Al(e, null, null, t), Rl(e));
  }
  function Gf(e, t, s) {
    e.lanes |= s;
    var a = e.alternate;
    a !== null && (a.lanes |= s);
    for (var o = !1, u = e.return; u !== null; )
      ((u.childLanes |= s),
        (a = u.alternate),
        a !== null && (a.childLanes |= s),
        u.tag === 22 &&
          ((e = u.stateNode), e === null || e._visibility & 1 || (o = !0)),
        (e = u),
        (u = u.return));
    return e.tag === 3
      ? ((u = e.stateNode),
        o &&
          t !== null &&
          ((o = 31 - Tt(s)),
          (e = u.hiddenUpdates),
          (a = e[o]),
          a === null ? (e[o] = [t]) : a.push(t),
          (t.lane = s | 536870912)),
        u)
      : null;
  }
  function Rl(e) {
    if (50 < Dr) throw ((Dr = 0), (Bc = null), Error(c(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var ya = {};
  function Db(e, t, s, a) {
    ((this.tag = e),
      (this.key = s),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Rt(e, t, s, a) {
    return new Db(e, t, s, a);
  }
  function zo(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function wn(e, t) {
    var s = e.alternate;
    return (
      s === null
        ? ((s = Rt(e.tag, t, e.key, e.mode)),
          (s.elementType = e.elementType),
          (s.type = e.type),
          (s.stateNode = e.stateNode),
          (s.alternate = e),
          (e.alternate = s))
        : ((s.pendingProps = t),
          (s.type = e.type),
          (s.flags = 0),
          (s.subtreeFlags = 0),
          (s.deletions = null)),
      (s.flags = e.flags & 65011712),
      (s.childLanes = e.childLanes),
      (s.lanes = e.lanes),
      (s.child = e.child),
      (s.memoizedProps = e.memoizedProps),
      (s.memoizedState = e.memoizedState),
      (s.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (s.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (s.sibling = e.sibling),
      (s.index = e.index),
      (s.ref = e.ref),
      (s.refCleanup = e.refCleanup),
      s
    );
  }
  function Qf(e, t) {
    e.flags &= 65011714;
    var s = e.alternate;
    return (
      s === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = s.childLanes),
          (e.lanes = s.lanes),
          (e.child = s.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = s.memoizedProps),
          (e.memoizedState = s.memoizedState),
          (e.updateQueue = s.updateQueue),
          (e.type = s.type),
          (t = s.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Cl(e, t, s, a, o, u) {
    var g = 0;
    if (((a = e), typeof e == "function")) zo(e) && (g = 1);
    else if (typeof e == "string")
      g = L0(e, s, se.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case re:
          return (
            (e = Rt(31, s, t, o)),
            (e.elementType = re),
            (e.lanes = u),
            e
          );
        case R:
          return _s(s.children, o, u, t);
        case S:
          ((g = 8), (o |= 24));
          break;
        case C:
          return (
            (e = Rt(12, s, t, o | 2)),
            (e.elementType = C),
            (e.lanes = u),
            e
          );
        case V:
          return ((e = Rt(13, s, t, o)), (e.elementType = V), (e.lanes = u), e);
        case F:
          return ((e = Rt(19, s, t, o)), (e.elementType = F), (e.lanes = u), e);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case A:
              case z:
                g = 10;
                break e;
              case U:
                g = 9;
                break e;
              case H:
                g = 11;
                break e;
              case Z:
                g = 14;
                break e;
              case G:
                ((g = 16), (a = null));
                break e;
            }
          ((g = 29),
            (s = Error(c(130, e === null ? "null" : typeof e, ""))),
            (a = null));
      }
    return (
      (t = Rt(g, s, t, o)),
      (t.elementType = e),
      (t.type = a),
      (t.lanes = u),
      t
    );
  }
  function _s(e, t, s, a) {
    return ((e = Rt(7, e, a, t)), (e.lanes = s), e);
  }
  function Lo(e, t, s) {
    return ((e = Rt(6, e, null, t)), (e.lanes = s), e);
  }
  function Uo(e, t, s) {
    return (
      (t = Rt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = s),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var va = [],
    ba = 0,
    Ol = null,
    Ml = 0,
    Xt = [],
    Ft = 0,
    ks = null,
    Sn = 1,
    En = "";
  function Ds(e, t) {
    ((va[ba++] = Ml), (va[ba++] = Ol), (Ol = e), (Ml = t));
  }
  function Pf(e, t, s) {
    ((Xt[Ft++] = Sn), (Xt[Ft++] = En), (Xt[Ft++] = ks), (ks = e));
    var a = Sn;
    e = En;
    var o = 32 - Tt(a) - 1;
    ((a &= ~(1 << o)), (s += 1));
    var u = 32 - Tt(t) + o;
    if (30 < u) {
      var g = o - (o % 5);
      ((u = (a & ((1 << g) - 1)).toString(32)),
        (a >>= g),
        (o -= g),
        (Sn = (1 << (32 - Tt(t) + o)) | (s << o) | a),
        (En = u + e));
    } else ((Sn = (1 << u) | (s << o) | a), (En = e));
  }
  function qo(e) {
    e.return !== null && (Ds(e, 1), Pf(e, 1, 0));
  }
  function Ho(e) {
    for (; e === Ol; )
      ((Ol = va[--ba]), (va[ba] = null), (Ml = va[--ba]), (va[ba] = null));
    for (; e === ks; )
      ((ks = Xt[--Ft]),
        (Xt[Ft] = null),
        (En = Xt[--Ft]),
        (Xt[Ft] = null),
        (Sn = Xt[--Ft]),
        (Xt[Ft] = null));
  }
  var yt = null,
    Ve = null,
    Ce = !1,
    zs = null,
    un = !1,
    Bo = Error(c(519));
  function Ls(e) {
    var t = Error(c(418, ""));
    throw (fr(Vt(t, e)), Bo);
  }
  function Yf(e) {
    var t = e.stateNode,
      s = e.type,
      a = e.memoizedProps;
    switch (((t[mt] = e), (t[vt] = a), s)) {
      case "dialog":
        (we("cancel", t), we("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        we("load", t);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Lr.length; s++) we(Lr[s], t);
        break;
      case "source":
        we("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (we("error", t), we("load", t));
        break;
      case "details":
        we("toggle", t);
        break;
      case "input":
        (we("invalid", t),
          af(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ),
          gl(t));
        break;
      case "select":
        we("invalid", t);
        break;
      case "textarea":
        (we("invalid", t), lf(t, a.value, a.defaultValue, a.children), gl(t));
    }
    ((s = a.children),
      (typeof s != "string" && typeof s != "number" && typeof s != "bigint") ||
      t.textContent === "" + s ||
      a.suppressHydrationWarning === !0 ||
      ip(t.textContent, s)
        ? (a.popover != null && (we("beforetoggle", t), we("toggle", t)),
          a.onScroll != null && we("scroll", t),
          a.onScrollEnd != null && we("scrollend", t),
          a.onClick != null && (t.onclick = di),
          (t = !0))
        : (t = !1),
      t || Ls(e));
  }
  function Vf(e) {
    for (yt = e.return; yt; )
      switch (yt.tag) {
        case 5:
        case 13:
          un = !1;
          return;
        case 27:
        case 3:
          un = !0;
          return;
        default:
          yt = yt.return;
      }
  }
  function ur(e) {
    if (e !== yt) return !1;
    if (!Ce) return (Vf(e), (Ce = !0), !1);
    var t = e.tag,
      s;
    if (
      ((s = t !== 3 && t !== 27) &&
        ((s = t === 5) &&
          ((s = e.type),
          (s =
            !(s !== "form" && s !== "button") || nu(e.type, e.memoizedProps))),
        (s = !s)),
      s && Ve && Ls(e),
      Vf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(c(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((s = e.data), s === "/$")) {
              if (t === 0) {
                Ve = sn(e.nextSibling);
                break e;
              }
              t--;
            } else (s !== "$" && s !== "$!" && s !== "$?") || t++;
          e = e.nextSibling;
        }
        Ve = null;
      }
    } else
      t === 27
        ? ((t = Ve), us(e.type) ? ((e = lu), (lu = null), (Ve = e)) : (Ve = t))
        : (Ve = yt ? sn(e.stateNode.nextSibling) : null);
    return !0;
  }
  function dr() {
    ((Ve = yt = null), (Ce = !1));
  }
  function Kf() {
    var e = zs;
    return (
      e !== null &&
        (wt === null ? (wt = e) : wt.push.apply(wt, e), (zs = null)),
      e
    );
  }
  function fr(e) {
    zs === null ? (zs = [e]) : zs.push(e);
  }
  var Go = Y(null),
    Us = null,
    Tn = null;
  function Zn(e, t, s) {
    ($(Go, t._currentValue), (t._currentValue = s));
  }
  function An(e) {
    ((e._currentValue = Go.current), J(Go));
  }
  function Qo(e, t, s) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === s)
      )
        break;
      e = e.return;
    }
  }
  function Po(e, t, s, a) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var u = o.dependencies;
      if (u !== null) {
        var g = o.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var b = u;
          u = o;
          for (var E = 0; E < t.length; E++)
            if (b.context === t[E]) {
              ((u.lanes |= s),
                (b = u.alternate),
                b !== null && (b.lanes |= s),
                Qo(u.return, s, e),
                a || (g = null));
              break e;
            }
          u = b.next;
        }
      } else if (o.tag === 18) {
        if (((g = o.return), g === null)) throw Error(c(341));
        ((g.lanes |= s),
          (u = g.alternate),
          u !== null && (u.lanes |= s),
          Qo(g, s, e),
          (g = null));
      } else g = o.child;
      if (g !== null) g.return = o;
      else
        for (g = o; g !== null; ) {
          if (g === e) {
            g = null;
            break;
          }
          if (((o = g.sibling), o !== null)) {
            ((o.return = g.return), (g = o));
            break;
          }
          g = g.return;
        }
      o = g;
    }
  }
  function hr(e, t, s, a) {
    e = null;
    for (var o = t, u = !1; o !== null; ) {
      if (!u) {
        if ((o.flags & 524288) !== 0) u = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var g = o.alternate;
        if (g === null) throw Error(c(387));
        if (((g = g.memoizedProps), g !== null)) {
          var b = o.type;
          At(o.pendingProps.value, g.value) ||
            (e !== null ? e.push(b) : (e = [b]));
        }
      } else if (o === Qe.current) {
        if (((g = o.alternate), g === null)) throw Error(c(387));
        g.memoizedState.memoizedState !== o.memoizedState.memoizedState &&
          (e !== null ? e.push(Qr) : (e = [Qr]));
      }
      o = o.return;
    }
    (e !== null && Po(t, e, s, a), (t.flags |= 262144));
  }
  function _l(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!At(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function qs(e) {
    ((Us = e),
      (Tn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function pt(e) {
    return Xf(Us, e);
  }
  function kl(e, t) {
    return (Us === null && qs(e), Xf(e, t));
  }
  function Xf(e, t) {
    var s = t._currentValue;
    if (((t = { context: t, memoizedValue: s, next: null }), Tn === null)) {
      if (e === null) throw Error(c(308));
      ((Tn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Tn = Tn.next = t;
    return s;
  }
  var zb =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (s, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (s) {
                  return s();
                }));
            };
          },
    Lb = n.unstable_scheduleCallback,
    Ub = n.unstable_NormalPriority,
    et = {
      $$typeof: z,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Yo() {
    return { controller: new zb(), data: new Map(), refCount: 0 };
  }
  function mr(e) {
    (e.refCount--,
      e.refCount === 0 &&
        Lb(Ub, function () {
          e.controller.abort();
        }));
  }
  var pr = null,
    Vo = 0,
    ja = 0,
    Na = null;
  function qb(e, t) {
    if (pr === null) {
      var s = (pr = []);
      ((Vo = 0),
        (ja = Xc()),
        (Na = {
          status: "pending",
          value: void 0,
          then: function (a) {
            s.push(a);
          },
        }));
    }
    return (Vo++, t.then(Ff, Ff), t);
  }
  function Ff() {
    if (--Vo === 0 && pr !== null) {
      Na !== null && (Na.status = "fulfilled");
      var e = pr;
      ((pr = null), (ja = 0), (Na = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Hb(e, t) {
    var s = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (o) {
          s.push(o);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var o = 0; o < s.length; o++) (0, s[o])(t);
        },
        function (o) {
          for (a.status = "rejected", a.reason = o, o = 0; o < s.length; o++)
            (0, s[o])(void 0);
        },
      ),
      a
    );
  }
  var Zf = _.S;
  _.S = function (e, t) {
    (typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      qb(e, t),
      Zf !== null && Zf(e, t));
  };
  var Hs = Y(null);
  function Ko() {
    var e = Hs.current;
    return e !== null ? e : Ge.pooledCache;
  }
  function Dl(e, t) {
    t === null ? $(Hs, Hs.current) : $(Hs, t.pool);
  }
  function $f() {
    var e = Ko();
    return e === null ? null : { parent: et._currentValue, pool: e };
  }
  var xr = Error(c(460)),
    Jf = Error(c(474)),
    zl = Error(c(542)),
    Xo = { then: function () {} };
  function If(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Ll() {}
  function Wf(e, t, s) {
    switch (
      ((s = e[s]),
      s === void 0 ? e.push(t) : s !== t && (t.then(Ll, Ll), (t = s)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), th(e), e);
      default:
        if (typeof t.status == "string") t.then(Ll, Ll);
        else {
          if (((e = Ge), e !== null && 100 < e.shellSuspendCounter))
            throw Error(c(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var o = t;
                  ((o.status = "fulfilled"), (o.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var o = t;
                  ((o.status = "rejected"), (o.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), th(e), e);
        }
        throw ((gr = t), xr);
    }
  }
  var gr = null;
  function eh() {
    if (gr === null) throw Error(c(459));
    var e = gr;
    return ((gr = null), e);
  }
  function th(e) {
    if (e === xr || e === zl) throw Error(c(483));
  }
  var $n = !1;
  function Fo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Zo(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function Jn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function In(e, t, s) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (ke & 2) !== 0)) {
      var o = a.pending;
      return (
        o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
        (a.pending = t),
        (t = Rl(e)),
        Gf(e, null, s),
        t
      );
    }
    return (Al(e, a, t, s), Rl(e));
  }
  function yr(e, t, s) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (s & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (s |= a), (t.lanes = s), Xd(e, s));
    }
  }
  function $o(e, t) {
    var s = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), s === a)) {
      var o = null,
        u = null;
      if (((s = s.firstBaseUpdate), s !== null)) {
        do {
          var g = {
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null,
          };
          (u === null ? (o = u = g) : (u = u.next = g), (s = s.next));
        } while (s !== null);
        u === null ? (o = u = t) : (u = u.next = t);
      } else o = u = t;
      ((s = {
        baseState: a.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = s));
      return;
    }
    ((e = s.lastBaseUpdate),
      e === null ? (s.firstBaseUpdate = t) : (e.next = t),
      (s.lastBaseUpdate = t));
  }
  var Jo = !1;
  function vr() {
    if (Jo) {
      var e = Na;
      if (e !== null) throw e;
    }
  }
  function br(e, t, s, a) {
    Jo = !1;
    var o = e.updateQueue;
    $n = !1;
    var u = o.firstBaseUpdate,
      g = o.lastBaseUpdate,
      b = o.shared.pending;
    if (b !== null) {
      o.shared.pending = null;
      var E = b,
        D = E.next;
      ((E.next = null), g === null ? (u = D) : (g.next = D), (g = E));
      var B = e.alternate;
      B !== null &&
        ((B = B.updateQueue),
        (b = B.lastBaseUpdate),
        b !== g &&
          (b === null ? (B.firstBaseUpdate = D) : (b.next = D),
          (B.lastBaseUpdate = E)));
    }
    if (u !== null) {
      var P = o.baseState;
      ((g = 0), (B = D = E = null), (b = u));
      do {
        var L = b.lane & -536870913,
          q = L !== b.lane;
        if (q ? (Te & L) === L : (a & L) === L) {
          (L !== 0 && L === ja && (Jo = !0),
            B !== null &&
              (B = B.next =
                {
                  lane: 0,
                  tag: b.tag,
                  payload: b.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var fe = e,
              ie = b;
            L = t;
            var qe = s;
            switch (ie.tag) {
              case 1:
                if (((fe = ie.payload), typeof fe == "function")) {
                  P = fe.call(qe, P, L);
                  break e;
                }
                P = fe;
                break e;
              case 3:
                fe.flags = (fe.flags & -65537) | 128;
              case 0:
                if (
                  ((fe = ie.payload),
                  (L = typeof fe == "function" ? fe.call(qe, P, L) : fe),
                  L == null)
                )
                  break e;
                P = v({}, P, L);
                break e;
              case 2:
                $n = !0;
            }
          }
          ((L = b.callback),
            L !== null &&
              ((e.flags |= 64),
              q && (e.flags |= 8192),
              (q = o.callbacks),
              q === null ? (o.callbacks = [L]) : q.push(L)));
        } else
          ((q = {
            lane: L,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null,
          }),
            B === null ? ((D = B = q), (E = P)) : (B = B.next = q),
            (g |= L));
        if (((b = b.next), b === null)) {
          if (((b = o.shared.pending), b === null)) break;
          ((q = b),
            (b = q.next),
            (q.next = null),
            (o.lastBaseUpdate = q),
            (o.shared.pending = null));
        }
      } while (!0);
      (B === null && (E = P),
        (o.baseState = E),
        (o.firstBaseUpdate = D),
        (o.lastBaseUpdate = B),
        u === null && (o.shared.lanes = 0),
        (ls |= g),
        (e.lanes = g),
        (e.memoizedState = P));
    }
  }
  function nh(e, t) {
    if (typeof e != "function") throw Error(c(191, e));
    e.call(t);
  }
  function sh(e, t) {
    var s = e.callbacks;
    if (s !== null)
      for (e.callbacks = null, e = 0; e < s.length; e++) nh(s[e], t);
  }
  var wa = Y(null),
    Ul = Y(0);
  function ah(e, t) {
    ((e = Dn), $(Ul, e), $(wa, t), (Dn = e | t.baseLanes));
  }
  function Io() {
    ($(Ul, Dn), $(wa, wa.current));
  }
  function Wo() {
    ((Dn = Ul.current), J(wa), J(Ul));
  }
  var Wn = 0,
    ve = null,
    Le = null,
    Je = null,
    ql = !1,
    Sa = !1,
    Bs = !1,
    Hl = 0,
    jr = 0,
    Ea = null,
    Bb = 0;
  function Ze() {
    throw Error(c(321));
  }
  function ec(e, t) {
    if (t === null) return !1;
    for (var s = 0; s < t.length && s < e.length; s++)
      if (!At(e[s], t[s])) return !1;
    return !0;
  }
  function tc(e, t, s, a, o, u) {
    return (
      (Wn = u),
      (ve = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (_.H = e === null || e.memoizedState === null ? Gh : Qh),
      (Bs = !1),
      (u = s(a, o)),
      (Bs = !1),
      Sa && (u = lh(t, s, a, o)),
      rh(e),
      u
    );
  }
  function rh(e) {
    _.H = Vl;
    var t = Le !== null && Le.next !== null;
    if (((Wn = 0), (Je = Le = ve = null), (ql = !1), (jr = 0), (Ea = null), t))
      throw Error(c(300));
    e === null ||
      lt ||
      ((e = e.dependencies), e !== null && _l(e) && (lt = !0));
  }
  function lh(e, t, s, a) {
    ve = e;
    var o = 0;
    do {
      if ((Sa && (Ea = null), (jr = 0), (Sa = !1), 25 <= o))
        throw Error(c(301));
      if (((o += 1), (Je = Le = null), e.updateQueue != null)) {
        var u = e.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((_.H = Xb), (u = t(s, a)));
    } while (Sa);
    return u;
  }
  function Gb() {
    var e = _.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Nr(t) : t),
      (e = e.useState()[0]),
      (Le !== null ? Le.memoizedState : null) !== e && (ve.flags |= 1024),
      t
    );
  }
  function nc() {
    var e = Hl !== 0;
    return ((Hl = 0), e);
  }
  function sc(e, t, s) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~s));
  }
  function ac(e) {
    if (ql) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      ql = !1;
    }
    ((Wn = 0), (Je = Le = ve = null), (Sa = !1), (jr = Hl = 0), (Ea = null));
  }
  function jt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Je === null ? (ve.memoizedState = Je = e) : (Je = Je.next = e), Je);
  }
  function Ie() {
    if (Le === null) {
      var e = ve.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Le.next;
    var t = Je === null ? ve.memoizedState : Je.next;
    if (t !== null) ((Je = t), (Le = e));
    else {
      if (e === null)
        throw ve.alternate === null ? Error(c(467)) : Error(c(310));
      ((Le = e),
        (e = {
          memoizedState: Le.memoizedState,
          baseState: Le.baseState,
          baseQueue: Le.baseQueue,
          queue: Le.queue,
          next: null,
        }),
        Je === null ? (ve.memoizedState = Je = e) : (Je = Je.next = e));
    }
    return Je;
  }
  function rc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nr(e) {
    var t = jr;
    return (
      (jr += 1),
      Ea === null && (Ea = []),
      (e = Wf(Ea, e, t)),
      (t = ve),
      (Je === null ? t.memoizedState : Je.next) === null &&
        ((t = t.alternate),
        (_.H = t === null || t.memoizedState === null ? Gh : Qh)),
      e
    );
  }
  function Bl(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Nr(e);
      if (e.$$typeof === z) return pt(e);
    }
    throw Error(c(438, String(e)));
  }
  function lc(e) {
    var t = null,
      s = ve.updateQueue;
    if ((s !== null && (t = s.memoCache), t == null)) {
      var a = ve.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (o) {
                return o.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      s === null && ((s = rc()), (ve.updateQueue = s)),
      (s.memoCache = t),
      (s = t.data[t.index]),
      s === void 0)
    )
      for (s = t.data[t.index] = Array(e), a = 0; a < e; a++) s[a] = he;
    return (t.index++, s);
  }
  function Rn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Gl(e) {
    var t = Ie();
    return ic(t, Le, e);
  }
  function ic(e, t, s) {
    var a = e.queue;
    if (a === null) throw Error(c(311));
    a.lastRenderedReducer = s;
    var o = e.baseQueue,
      u = a.pending;
    if (u !== null) {
      if (o !== null) {
        var g = o.next;
        ((o.next = u.next), (u.next = g));
      }
      ((t.baseQueue = o = u), (a.pending = null));
    }
    if (((u = e.baseState), o === null)) e.memoizedState = u;
    else {
      t = o.next;
      var b = (g = null),
        E = null,
        D = t,
        B = !1;
      do {
        var P = D.lane & -536870913;
        if (P !== D.lane ? (Te & P) === P : (Wn & P) === P) {
          var L = D.revertLane;
          if (L === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: D.action,
                  hasEagerState: D.hasEagerState,
                  eagerState: D.eagerState,
                  next: null,
                }),
              P === ja && (B = !0));
          else if ((Wn & L) === L) {
            ((D = D.next), L === ja && (B = !0));
            continue;
          } else
            ((P = {
              lane: 0,
              revertLane: D.revertLane,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null,
            }),
              E === null ? ((b = E = P), (g = u)) : (E = E.next = P),
              (ve.lanes |= L),
              (ls |= L));
          ((P = D.action),
            Bs && s(u, P),
            (u = D.hasEagerState ? D.eagerState : s(u, P)));
        } else
          ((L = {
            lane: P,
            revertLane: D.revertLane,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null,
          }),
            E === null ? ((b = E = L), (g = u)) : (E = E.next = L),
            (ve.lanes |= P),
            (ls |= P));
        D = D.next;
      } while (D !== null && D !== t);
      if (
        (E === null ? (g = u) : (E.next = b),
        !At(u, e.memoizedState) && ((lt = !0), B && ((s = Na), s !== null)))
      )
        throw s;
      ((e.memoizedState = u),
        (e.baseState = g),
        (e.baseQueue = E),
        (a.lastRenderedState = u));
    }
    return (o === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function oc(e) {
    var t = Ie(),
      s = t.queue;
    if (s === null) throw Error(c(311));
    s.lastRenderedReducer = e;
    var a = s.dispatch,
      o = s.pending,
      u = t.memoizedState;
    if (o !== null) {
      s.pending = null;
      var g = (o = o.next);
      do ((u = e(u, g.action)), (g = g.next));
      while (g !== o);
      (At(u, t.memoizedState) || (lt = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (s.lastRenderedState = u));
    }
    return [u, a];
  }
  function ih(e, t, s) {
    var a = ve,
      o = Ie(),
      u = Ce;
    if (u) {
      if (s === void 0) throw Error(c(407));
      s = s();
    } else s = t();
    var g = !At((Le || o).memoizedState, s);
    (g && ((o.memoizedState = s), (lt = !0)), (o = o.queue));
    var b = uh.bind(null, a, o, e);
    if (
      (wr(2048, 8, b, [e]),
      o.getSnapshot !== t || g || (Je !== null && Je.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        Ta(9, Ql(), ch.bind(null, a, o, s, t), null),
        Ge === null)
      )
        throw Error(c(349));
      u || (Wn & 124) !== 0 || oh(a, t, s);
    }
    return s;
  }
  function oh(e, t, s) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: s }),
      (t = ve.updateQueue),
      t === null
        ? ((t = rc()), (ve.updateQueue = t), (t.stores = [e]))
        : ((s = t.stores), s === null ? (t.stores = [e]) : s.push(e)));
  }
  function ch(e, t, s, a) {
    ((t.value = s), (t.getSnapshot = a), dh(t) && fh(e));
  }
  function uh(e, t, s) {
    return s(function () {
      dh(t) && fh(e);
    });
  }
  function dh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var s = t();
      return !At(e, s);
    } catch {
      return !0;
    }
  }
  function fh(e) {
    var t = ga(e, 2);
    t !== null && kt(t, e, 2);
  }
  function cc(e) {
    var t = jt();
    if (typeof e == "function") {
      var s = e;
      if (((e = s()), Bs)) {
        Kn(!0);
        try {
          s();
        } finally {
          Kn(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Rn,
        lastRenderedState: e,
      }),
      t
    );
  }
  function hh(e, t, s, a) {
    return ((e.baseState = s), ic(e, Le, typeof a == "function" ? a : Rn));
  }
  function Qb(e, t, s, a, o) {
    if (Yl(e)) throw Error(c(485));
    if (((e = t.action), e !== null)) {
      var u = {
        payload: o,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (g) {
          u.listeners.push(g);
        },
      };
      (_.T !== null ? s(!0) : (u.isTransition = !1),
        a(u),
        (s = t.pending),
        s === null
          ? ((u.next = t.pending = u), mh(t, u))
          : ((u.next = s.next), (t.pending = s.next = u)));
    }
  }
  function mh(e, t) {
    var s = t.action,
      a = t.payload,
      o = e.state;
    if (t.isTransition) {
      var u = _.T,
        g = {};
      _.T = g;
      try {
        var b = s(o, a),
          E = _.S;
        (E !== null && E(g, b), ph(e, t, b));
      } catch (D) {
        uc(e, t, D);
      } finally {
        _.T = u;
      }
    } else
      try {
        ((u = s(o, a)), ph(e, t, u));
      } catch (D) {
        uc(e, t, D);
      }
  }
  function ph(e, t, s) {
    s !== null && typeof s == "object" && typeof s.then == "function"
      ? s.then(
          function (a) {
            xh(e, t, a);
          },
          function (a) {
            return uc(e, t, a);
          },
        )
      : xh(e, t, s);
  }
  function xh(e, t, s) {
    ((t.status = "fulfilled"),
      (t.value = s),
      gh(t),
      (e.state = s),
      (t = e.pending),
      t !== null &&
        ((s = t.next),
        s === t ? (e.pending = null) : ((s = s.next), (t.next = s), mh(e, s))));
  }
  function uc(e, t, s) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = s), gh(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function gh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function yh(e, t) {
    return t;
  }
  function vh(e, t) {
    if (Ce) {
      var s = Ge.formState;
      if (s !== null) {
        e: {
          var a = ve;
          if (Ce) {
            if (Ve) {
              t: {
                for (var o = Ve, u = un; o.nodeType !== 8; ) {
                  if (!u) {
                    o = null;
                    break t;
                  }
                  if (((o = sn(o.nextSibling)), o === null)) {
                    o = null;
                    break t;
                  }
                }
                ((u = o.data), (o = u === "F!" || u === "F" ? o : null));
              }
              if (o) {
                ((Ve = sn(o.nextSibling)), (a = o.data === "F!"));
                break e;
              }
            }
            Ls(a);
          }
          a = !1;
        }
        a && (t = s[0]);
      }
    }
    return (
      (s = jt()),
      (s.memoizedState = s.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yh,
        lastRenderedState: t,
      }),
      (s.queue = a),
      (s = qh.bind(null, ve, a)),
      (a.dispatch = s),
      (a = cc(!1)),
      (u = pc.bind(null, ve, !1, a.queue)),
      (a = jt()),
      (o = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = o),
      (s = Qb.bind(null, ve, o, u, s)),
      (o.dispatch = s),
      (a.memoizedState = e),
      [t, s, !1]
    );
  }
  function bh(e) {
    var t = Ie();
    return jh(t, Le, e);
  }
  function jh(e, t, s) {
    if (
      ((t = ic(e, t, yh)[0]),
      (e = Gl(Rn)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = Nr(t);
      } catch (g) {
        throw g === xr ? zl : g;
      }
    else a = t;
    t = Ie();
    var o = t.queue,
      u = o.dispatch;
    return (
      s !== t.memoizedState &&
        ((ve.flags |= 2048), Ta(9, Ql(), Pb.bind(null, o, s), null)),
      [a, u, e]
    );
  }
  function Pb(e, t) {
    e.action = t;
  }
  function Nh(e) {
    var t = Ie(),
      s = Le;
    if (s !== null) return jh(t, s, e);
    (Ie(), (t = t.memoizedState), (s = Ie()));
    var a = s.queue.dispatch;
    return ((s.memoizedState = e), [t, a, !1]);
  }
  function Ta(e, t, s, a) {
    return (
      (e = { tag: e, create: s, deps: a, inst: t, next: null }),
      (t = ve.updateQueue),
      t === null && ((t = rc()), (ve.updateQueue = t)),
      (s = t.lastEffect),
      s === null
        ? (t.lastEffect = e.next = e)
        : ((a = s.next), (s.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function Ql() {
    return { destroy: void 0, resource: void 0 };
  }
  function wh() {
    return Ie().memoizedState;
  }
  function Pl(e, t, s, a) {
    var o = jt();
    ((a = a === void 0 ? null : a),
      (ve.flags |= e),
      (o.memoizedState = Ta(1 | t, Ql(), s, a)));
  }
  function wr(e, t, s, a) {
    var o = Ie();
    a = a === void 0 ? null : a;
    var u = o.memoizedState.inst;
    Le !== null && a !== null && ec(a, Le.memoizedState.deps)
      ? (o.memoizedState = Ta(t, u, s, a))
      : ((ve.flags |= e), (o.memoizedState = Ta(1 | t, u, s, a)));
  }
  function Sh(e, t) {
    Pl(8390656, 8, e, t);
  }
  function Eh(e, t) {
    wr(2048, 8, e, t);
  }
  function Th(e, t) {
    return wr(4, 2, e, t);
  }
  function Ah(e, t) {
    return wr(4, 4, e, t);
  }
  function Rh(e, t) {
    if (typeof t == "function") {
      e = e();
      var s = t(e);
      return function () {
        typeof s == "function" ? s() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Ch(e, t, s) {
    ((s = s != null ? s.concat([e]) : null), wr(4, 4, Rh.bind(null, t, e), s));
  }
  function dc() {}
  function Oh(e, t) {
    var s = Ie();
    t = t === void 0 ? null : t;
    var a = s.memoizedState;
    return t !== null && ec(t, a[1]) ? a[0] : ((s.memoizedState = [e, t]), e);
  }
  function Mh(e, t) {
    var s = Ie();
    t = t === void 0 ? null : t;
    var a = s.memoizedState;
    if (t !== null && ec(t, a[1])) return a[0];
    if (((a = e()), Bs)) {
      Kn(!0);
      try {
        e();
      } finally {
        Kn(!1);
      }
    }
    return ((s.memoizedState = [a, t]), a);
  }
  function fc(e, t, s) {
    return s === void 0 || (Wn & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = s), (e = Dm()), (ve.lanes |= e), (ls |= e), s);
  }
  function _h(e, t, s, a) {
    return At(s, t)
      ? s
      : wa.current !== null
        ? ((e = fc(e, s, a)), At(e, t) || (lt = !0), e)
        : (Wn & 42) === 0
          ? ((lt = !0), (e.memoizedState = s))
          : ((e = Dm()), (ve.lanes |= e), (ls |= e), t);
  }
  function kh(e, t, s, a, o) {
    var u = K.p;
    K.p = u !== 0 && 8 > u ? u : 8;
    var g = _.T,
      b = {};
    ((_.T = b), pc(e, !1, t, s));
    try {
      var E = o(),
        D = _.S;
      if (
        (D !== null && D(b, E),
        E !== null && typeof E == "object" && typeof E.then == "function")
      ) {
        var B = Hb(E, a);
        Sr(e, t, B, _t(e));
      } else Sr(e, t, a, _t(e));
    } catch (P) {
      Sr(e, t, { then: function () {}, status: "rejected", reason: P }, _t());
    } finally {
      ((K.p = u), (_.T = g));
    }
  }
  function Yb() {}
  function hc(e, t, s, a) {
    if (e.tag !== 5) throw Error(c(476));
    var o = Dh(e).queue;
    kh(
      e,
      o,
      t,
      X,
      s === null
        ? Yb
        : function () {
            return (zh(e), s(a));
          },
    );
  }
  function Dh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: X,
      baseState: X,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Rn,
        lastRenderedState: X,
      },
      next: null,
    };
    var s = {};
    return (
      (t.next = {
        memoizedState: s,
        baseState: s,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Rn,
          lastRenderedState: s,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function zh(e) {
    var t = Dh(e).next.queue;
    Sr(e, t, {}, _t());
  }
  function mc() {
    return pt(Qr);
  }
  function Lh() {
    return Ie().memoizedState;
  }
  function Uh() {
    return Ie().memoizedState;
  }
  function Vb(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var s = _t();
          e = Jn(s);
          var a = In(t, e, s);
          (a !== null && (kt(a, t, s), yr(a, t, s)),
            (t = { cache: Yo() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function Kb(e, t, s) {
    var a = _t();
    ((s = {
      lane: a,
      revertLane: 0,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Yl(e)
        ? Hh(t, s)
        : ((s = Do(e, t, s, a)), s !== null && (kt(s, e, a), Bh(s, t, a))));
  }
  function qh(e, t, s) {
    var a = _t();
    Sr(e, t, s, a);
  }
  function Sr(e, t, s, a) {
    var o = {
      lane: a,
      revertLane: 0,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Yl(e)) Hh(t, o);
    else {
      var u = e.alternate;
      if (
        e.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var g = t.lastRenderedState,
            b = u(g, s);
          if (((o.hasEagerState = !0), (o.eagerState = b), At(b, g)))
            return (Al(e, t, o, 0), Ge === null && Tl(), !1);
        } catch {}
      if (((s = Do(e, t, o, a)), s !== null))
        return (kt(s, e, a), Bh(s, t, a), !0);
    }
    return !1;
  }
  function pc(e, t, s, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Xc(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Yl(e))
    ) {
      if (t) throw Error(c(479));
    } else ((t = Do(e, s, a, 2)), t !== null && kt(t, e, 2));
  }
  function Yl(e) {
    var t = e.alternate;
    return e === ve || (t !== null && t === ve);
  }
  function Hh(e, t) {
    Sa = ql = !0;
    var s = e.pending;
    (s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
      (e.pending = t));
  }
  function Bh(e, t, s) {
    if ((s & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (s |= a), (t.lanes = s), Xd(e, s));
    }
  }
  var Vl = {
      readContext: pt,
      use: Bl,
      useCallback: Ze,
      useContext: Ze,
      useEffect: Ze,
      useImperativeHandle: Ze,
      useLayoutEffect: Ze,
      useInsertionEffect: Ze,
      useMemo: Ze,
      useReducer: Ze,
      useRef: Ze,
      useState: Ze,
      useDebugValue: Ze,
      useDeferredValue: Ze,
      useTransition: Ze,
      useSyncExternalStore: Ze,
      useId: Ze,
      useHostTransitionStatus: Ze,
      useFormState: Ze,
      useActionState: Ze,
      useOptimistic: Ze,
      useMemoCache: Ze,
      useCacheRefresh: Ze,
    },
    Gh = {
      readContext: pt,
      use: Bl,
      useCallback: function (e, t) {
        return ((jt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: pt,
      useEffect: Sh,
      useImperativeHandle: function (e, t, s) {
        ((s = s != null ? s.concat([e]) : null),
          Pl(4194308, 4, Rh.bind(null, t, e), s));
      },
      useLayoutEffect: function (e, t) {
        return Pl(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        Pl(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var s = jt();
        t = t === void 0 ? null : t;
        var a = e();
        if (Bs) {
          Kn(!0);
          try {
            e();
          } finally {
            Kn(!1);
          }
        }
        return ((s.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, s) {
        var a = jt();
        if (s !== void 0) {
          var o = s(t);
          if (Bs) {
            Kn(!0);
            try {
              s(t);
            } finally {
              Kn(!1);
            }
          }
        } else o = t;
        return (
          (a.memoizedState = a.baseState = o),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: o,
          }),
          (a.queue = e),
          (e = e.dispatch = Kb.bind(null, ve, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = jt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = cc(e);
        var t = e.queue,
          s = qh.bind(null, ve, t);
        return ((t.dispatch = s), [e.memoizedState, s]);
      },
      useDebugValue: dc,
      useDeferredValue: function (e, t) {
        var s = jt();
        return fc(s, e, t);
      },
      useTransition: function () {
        var e = cc(!1);
        return (
          (e = kh.bind(null, ve, e.queue, !0, !1)),
          (jt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, s) {
        var a = ve,
          o = jt();
        if (Ce) {
          if (s === void 0) throw Error(c(407));
          s = s();
        } else {
          if (((s = t()), Ge === null)) throw Error(c(349));
          (Te & 124) !== 0 || oh(a, t, s);
        }
        o.memoizedState = s;
        var u = { value: s, getSnapshot: t };
        return (
          (o.queue = u),
          Sh(uh.bind(null, a, u, e), [e]),
          (a.flags |= 2048),
          Ta(9, Ql(), ch.bind(null, a, u, s, t), null),
          s
        );
      },
      useId: function () {
        var e = jt(),
          t = Ge.identifierPrefix;
        if (Ce) {
          var s = En,
            a = Sn;
          ((s = (a & ~(1 << (32 - Tt(a) - 1))).toString(32) + s),
            (t = "«" + t + "R" + s),
            (s = Hl++),
            0 < s && (t += "H" + s.toString(32)),
            (t += "»"));
        } else ((s = Bb++), (t = "«" + t + "r" + s.toString(32) + "»"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: mc,
      useFormState: vh,
      useActionState: vh,
      useOptimistic: function (e) {
        var t = jt();
        t.memoizedState = t.baseState = e;
        var s = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = s),
          (t = pc.bind(null, ve, !0, s)),
          (s.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: lc,
      useCacheRefresh: function () {
        return (jt().memoizedState = Vb.bind(null, ve));
      },
    },
    Qh = {
      readContext: pt,
      use: Bl,
      useCallback: Oh,
      useContext: pt,
      useEffect: Eh,
      useImperativeHandle: Ch,
      useInsertionEffect: Th,
      useLayoutEffect: Ah,
      useMemo: Mh,
      useReducer: Gl,
      useRef: wh,
      useState: function () {
        return Gl(Rn);
      },
      useDebugValue: dc,
      useDeferredValue: function (e, t) {
        var s = Ie();
        return _h(s, Le.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Gl(Rn)[0],
          t = Ie().memoizedState;
        return [typeof e == "boolean" ? e : Nr(e), t];
      },
      useSyncExternalStore: ih,
      useId: Lh,
      useHostTransitionStatus: mc,
      useFormState: bh,
      useActionState: bh,
      useOptimistic: function (e, t) {
        var s = Ie();
        return hh(s, Le, e, t);
      },
      useMemoCache: lc,
      useCacheRefresh: Uh,
    },
    Xb = {
      readContext: pt,
      use: Bl,
      useCallback: Oh,
      useContext: pt,
      useEffect: Eh,
      useImperativeHandle: Ch,
      useInsertionEffect: Th,
      useLayoutEffect: Ah,
      useMemo: Mh,
      useReducer: oc,
      useRef: wh,
      useState: function () {
        return oc(Rn);
      },
      useDebugValue: dc,
      useDeferredValue: function (e, t) {
        var s = Ie();
        return Le === null ? fc(s, e, t) : _h(s, Le.memoizedState, e, t);
      },
      useTransition: function () {
        var e = oc(Rn)[0],
          t = Ie().memoizedState;
        return [typeof e == "boolean" ? e : Nr(e), t];
      },
      useSyncExternalStore: ih,
      useId: Lh,
      useHostTransitionStatus: mc,
      useFormState: Nh,
      useActionState: Nh,
      useOptimistic: function (e, t) {
        var s = Ie();
        return Le !== null
          ? hh(s, Le, e, t)
          : ((s.baseState = e), [e, s.queue.dispatch]);
      },
      useMemoCache: lc,
      useCacheRefresh: Uh,
    },
    Aa = null,
    Er = 0;
  function Kl(e) {
    var t = Er;
    return ((Er += 1), Aa === null && (Aa = []), Wf(Aa, e, t));
  }
  function Tr(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Xl(e, t) {
    throw t.$$typeof === y
      ? Error(c(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          c(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        ));
  }
  function Ph(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Yh(e) {
    function t(M, O) {
      if (e) {
        var k = M.deletions;
        k === null ? ((M.deletions = [O]), (M.flags |= 16)) : k.push(O);
      }
    }
    function s(M, O) {
      if (!e) return null;
      for (; O !== null; ) (t(M, O), (O = O.sibling));
      return null;
    }
    function a(M) {
      for (var O = new Map(); M !== null; )
        (M.key !== null ? O.set(M.key, M) : O.set(M.index, M), (M = M.sibling));
      return O;
    }
    function o(M, O) {
      return ((M = wn(M, O)), (M.index = 0), (M.sibling = null), M);
    }
    function u(M, O, k) {
      return (
        (M.index = k),
        e
          ? ((k = M.alternate),
            k !== null
              ? ((k = k.index), k < O ? ((M.flags |= 67108866), O) : k)
              : ((M.flags |= 67108866), O))
          : ((M.flags |= 1048576), O)
      );
    }
    function g(M) {
      return (e && M.alternate === null && (M.flags |= 67108866), M);
    }
    function b(M, O, k, Q) {
      return O === null || O.tag !== 6
        ? ((O = Lo(k, M.mode, Q)), (O.return = M), O)
        : ((O = o(O, k)), (O.return = M), O);
    }
    function E(M, O, k, Q) {
      var W = k.type;
      return W === R
        ? B(M, O, k.props.children, Q, k.key)
        : O !== null &&
            (O.elementType === W ||
              (typeof W == "object" &&
                W !== null &&
                W.$$typeof === G &&
                Ph(W) === O.type))
          ? ((O = o(O, k.props)), Tr(O, k), (O.return = M), O)
          : ((O = Cl(k.type, k.key, k.props, null, M.mode, Q)),
            Tr(O, k),
            (O.return = M),
            O);
    }
    function D(M, O, k, Q) {
      return O === null ||
        O.tag !== 4 ||
        O.stateNode.containerInfo !== k.containerInfo ||
        O.stateNode.implementation !== k.implementation
        ? ((O = Uo(k, M.mode, Q)), (O.return = M), O)
        : ((O = o(O, k.children || [])), (O.return = M), O);
    }
    function B(M, O, k, Q, W) {
      return O === null || O.tag !== 7
        ? ((O = _s(k, M.mode, Q, W)), (O.return = M), O)
        : ((O = o(O, k)), (O.return = M), O);
    }
    function P(M, O, k) {
      if (
        (typeof O == "string" && O !== "") ||
        typeof O == "number" ||
        typeof O == "bigint"
      )
        return ((O = Lo("" + O, M.mode, k)), (O.return = M), O);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case N:
            return (
              (k = Cl(O.type, O.key, O.props, null, M.mode, k)),
              Tr(k, O),
              (k.return = M),
              k
            );
          case T:
            return ((O = Uo(O, M.mode, k)), (O.return = M), O);
          case G:
            var Q = O._init;
            return ((O = Q(O._payload)), P(M, O, k));
        }
        if (de(O) || ue(O))
          return ((O = _s(O, M.mode, k, null)), (O.return = M), O);
        if (typeof O.then == "function") return P(M, Kl(O), k);
        if (O.$$typeof === z) return P(M, kl(M, O), k);
        Xl(M, O);
      }
      return null;
    }
    function L(M, O, k, Q) {
      var W = O !== null ? O.key : null;
      if (
        (typeof k == "string" && k !== "") ||
        typeof k == "number" ||
        typeof k == "bigint"
      )
        return W !== null ? null : b(M, O, "" + k, Q);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case N:
            return k.key === W ? E(M, O, k, Q) : null;
          case T:
            return k.key === W ? D(M, O, k, Q) : null;
          case G:
            return ((W = k._init), (k = W(k._payload)), L(M, O, k, Q));
        }
        if (de(k) || ue(k)) return W !== null ? null : B(M, O, k, Q, null);
        if (typeof k.then == "function") return L(M, O, Kl(k), Q);
        if (k.$$typeof === z) return L(M, O, kl(M, k), Q);
        Xl(M, k);
      }
      return null;
    }
    function q(M, O, k, Q, W) {
      if (
        (typeof Q == "string" && Q !== "") ||
        typeof Q == "number" ||
        typeof Q == "bigint"
      )
        return ((M = M.get(k) || null), b(O, M, "" + Q, W));
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case N:
            return (
              (M = M.get(Q.key === null ? k : Q.key) || null),
              E(O, M, Q, W)
            );
          case T:
            return (
              (M = M.get(Q.key === null ? k : Q.key) || null),
              D(O, M, Q, W)
            );
          case G:
            var je = Q._init;
            return ((Q = je(Q._payload)), q(M, O, k, Q, W));
        }
        if (de(Q) || ue(Q))
          return ((M = M.get(k) || null), B(O, M, Q, W, null));
        if (typeof Q.then == "function") return q(M, O, k, Kl(Q), W);
        if (Q.$$typeof === z) return q(M, O, k, kl(O, Q), W);
        Xl(O, Q);
      }
      return null;
    }
    function fe(M, O, k, Q) {
      for (
        var W = null, je = null, ae = O, ce = (O = 0), ot = null;
        ae !== null && ce < k.length;
        ce++
      ) {
        ae.index > ce ? ((ot = ae), (ae = null)) : (ot = ae.sibling);
        var Re = L(M, ae, k[ce], Q);
        if (Re === null) {
          ae === null && (ae = ot);
          break;
        }
        (e && ae && Re.alternate === null && t(M, ae),
          (O = u(Re, O, ce)),
          je === null ? (W = Re) : (je.sibling = Re),
          (je = Re),
          (ae = ot));
      }
      if (ce === k.length) return (s(M, ae), Ce && Ds(M, ce), W);
      if (ae === null) {
        for (; ce < k.length; ce++)
          ((ae = P(M, k[ce], Q)),
            ae !== null &&
              ((O = u(ae, O, ce)),
              je === null ? (W = ae) : (je.sibling = ae),
              (je = ae)));
        return (Ce && Ds(M, ce), W);
      }
      for (ae = a(ae); ce < k.length; ce++)
        ((ot = q(ae, M, ce, k[ce], Q)),
          ot !== null &&
            (e &&
              ot.alternate !== null &&
              ae.delete(ot.key === null ? ce : ot.key),
            (O = u(ot, O, ce)),
            je === null ? (W = ot) : (je.sibling = ot),
            (je = ot)));
      return (
        e &&
          ae.forEach(function (ps) {
            return t(M, ps);
          }),
        Ce && Ds(M, ce),
        W
      );
    }
    function ie(M, O, k, Q) {
      if (k == null) throw Error(c(151));
      for (
        var W = null, je = null, ae = O, ce = (O = 0), ot = null, Re = k.next();
        ae !== null && !Re.done;
        ce++, Re = k.next()
      ) {
        ae.index > ce ? ((ot = ae), (ae = null)) : (ot = ae.sibling);
        var ps = L(M, ae, Re.value, Q);
        if (ps === null) {
          ae === null && (ae = ot);
          break;
        }
        (e && ae && ps.alternate === null && t(M, ae),
          (O = u(ps, O, ce)),
          je === null ? (W = ps) : (je.sibling = ps),
          (je = ps),
          (ae = ot));
      }
      if (Re.done) return (s(M, ae), Ce && Ds(M, ce), W);
      if (ae === null) {
        for (; !Re.done; ce++, Re = k.next())
          ((Re = P(M, Re.value, Q)),
            Re !== null &&
              ((O = u(Re, O, ce)),
              je === null ? (W = Re) : (je.sibling = Re),
              (je = Re)));
        return (Ce && Ds(M, ce), W);
      }
      for (ae = a(ae); !Re.done; ce++, Re = k.next())
        ((Re = q(ae, M, ce, Re.value, Q)),
          Re !== null &&
            (e &&
              Re.alternate !== null &&
              ae.delete(Re.key === null ? ce : Re.key),
            (O = u(Re, O, ce)),
            je === null ? (W = Re) : (je.sibling = Re),
            (je = Re)));
      return (
        e &&
          ae.forEach(function (F0) {
            return t(M, F0);
          }),
        Ce && Ds(M, ce),
        W
      );
    }
    function qe(M, O, k, Q) {
      if (
        (typeof k == "object" &&
          k !== null &&
          k.type === R &&
          k.key === null &&
          (k = k.props.children),
        typeof k == "object" && k !== null)
      ) {
        switch (k.$$typeof) {
          case N:
            e: {
              for (var W = k.key; O !== null; ) {
                if (O.key === W) {
                  if (((W = k.type), W === R)) {
                    if (O.tag === 7) {
                      (s(M, O.sibling),
                        (Q = o(O, k.props.children)),
                        (Q.return = M),
                        (M = Q));
                      break e;
                    }
                  } else if (
                    O.elementType === W ||
                    (typeof W == "object" &&
                      W !== null &&
                      W.$$typeof === G &&
                      Ph(W) === O.type)
                  ) {
                    (s(M, O.sibling),
                      (Q = o(O, k.props)),
                      Tr(Q, k),
                      (Q.return = M),
                      (M = Q));
                    break e;
                  }
                  s(M, O);
                  break;
                } else t(M, O);
                O = O.sibling;
              }
              k.type === R
                ? ((Q = _s(k.props.children, M.mode, Q, k.key)),
                  (Q.return = M),
                  (M = Q))
                : ((Q = Cl(k.type, k.key, k.props, null, M.mode, Q)),
                  Tr(Q, k),
                  (Q.return = M),
                  (M = Q));
            }
            return g(M);
          case T:
            e: {
              for (W = k.key; O !== null; ) {
                if (O.key === W)
                  if (
                    O.tag === 4 &&
                    O.stateNode.containerInfo === k.containerInfo &&
                    O.stateNode.implementation === k.implementation
                  ) {
                    (s(M, O.sibling),
                      (Q = o(O, k.children || [])),
                      (Q.return = M),
                      (M = Q));
                    break e;
                  } else {
                    s(M, O);
                    break;
                  }
                else t(M, O);
                O = O.sibling;
              }
              ((Q = Uo(k, M.mode, Q)), (Q.return = M), (M = Q));
            }
            return g(M);
          case G:
            return ((W = k._init), (k = W(k._payload)), qe(M, O, k, Q));
        }
        if (de(k)) return fe(M, O, k, Q);
        if (ue(k)) {
          if (((W = ue(k)), typeof W != "function")) throw Error(c(150));
          return ((k = W.call(k)), ie(M, O, k, Q));
        }
        if (typeof k.then == "function") return qe(M, O, Kl(k), Q);
        if (k.$$typeof === z) return qe(M, O, kl(M, k), Q);
        Xl(M, k);
      }
      return (typeof k == "string" && k !== "") ||
        typeof k == "number" ||
        typeof k == "bigint"
        ? ((k = "" + k),
          O !== null && O.tag === 6
            ? (s(M, O.sibling), (Q = o(O, k)), (Q.return = M), (M = Q))
            : (s(M, O), (Q = Lo(k, M.mode, Q)), (Q.return = M), (M = Q)),
          g(M))
        : s(M, O);
    }
    return function (M, O, k, Q) {
      try {
        Er = 0;
        var W = qe(M, O, k, Q);
        return ((Aa = null), W);
      } catch (ae) {
        if (ae === xr || ae === zl) throw ae;
        var je = Rt(29, ae, null, M.mode);
        return ((je.lanes = Q), (je.return = M), je);
      }
    };
  }
  var Ra = Yh(!0),
    Vh = Yh(!1),
    Zt = Y(null),
    dn = null;
  function es(e) {
    var t = e.alternate;
    ($(tt, tt.current & 1),
      $(Zt, e),
      dn === null &&
        (t === null || wa.current !== null || t.memoizedState !== null) &&
        (dn = e));
  }
  function Kh(e) {
    if (e.tag === 22) {
      if (($(tt, tt.current), $(Zt, e), dn === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (dn = e);
      }
    } else ts();
  }
  function ts() {
    ($(tt, tt.current), $(Zt, Zt.current));
  }
  function Cn(e) {
    (J(Zt), dn === e && (dn = null), J(tt));
  }
  var tt = Y(0);
  function Fl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var s = t.memoizedState;
        if (
          s !== null &&
          ((s = s.dehydrated), s === null || s.data === "$?" || ru(s))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  function xc(e, t, s, a) {
    ((t = e.memoizedState),
      (s = s(a, t)),
      (s = s == null ? t : v({}, t, s)),
      (e.memoizedState = s),
      e.lanes === 0 && (e.updateQueue.baseState = s));
  }
  var gc = {
    enqueueSetState: function (e, t, s) {
      e = e._reactInternals;
      var a = _t(),
        o = Jn(a);
      ((o.payload = t),
        s != null && (o.callback = s),
        (t = In(e, o, a)),
        t !== null && (kt(t, e, a), yr(t, e, a)));
    },
    enqueueReplaceState: function (e, t, s) {
      e = e._reactInternals;
      var a = _t(),
        o = Jn(a);
      ((o.tag = 1),
        (o.payload = t),
        s != null && (o.callback = s),
        (t = In(e, o, a)),
        t !== null && (kt(t, e, a), yr(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var s = _t(),
        a = Jn(s);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = In(e, a, s)),
        t !== null && (kt(t, e, s), yr(t, e, s)));
    },
  };
  function Xh(e, t, s, a, o, u, g) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, u, g)
        : t.prototype && t.prototype.isPureReactComponent
          ? !or(s, a) || !or(o, u)
          : !0
    );
  }
  function Fh(e, t, s, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(s, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(s, a),
      t.state !== e && gc.enqueueReplaceState(t, t.state, null));
  }
  function Gs(e, t) {
    var s = t;
    if ("ref" in t) {
      s = {};
      for (var a in t) a !== "ref" && (s[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      s === t && (s = v({}, s));
      for (var o in e) s[o] === void 0 && (s[o] = e[o]);
    }
    return s;
  }
  var Zl =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Zh(e) {
    Zl(e);
  }
  function $h(e) {
    console.error(e);
  }
  function Jh(e) {
    Zl(e);
  }
  function $l(e, t) {
    try {
      var s = e.onUncaughtError;
      s(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Ih(e, t, s) {
    try {
      var a = e.onCaughtError;
      a(s.value, {
        componentStack: s.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (o) {
      setTimeout(function () {
        throw o;
      });
    }
  }
  function yc(e, t, s) {
    return (
      (s = Jn(s)),
      (s.tag = 3),
      (s.payload = { element: null }),
      (s.callback = function () {
        $l(e, t);
      }),
      s
    );
  }
  function Wh(e) {
    return ((e = Jn(e)), (e.tag = 3), e);
  }
  function em(e, t, s, a) {
    var o = s.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var u = a.value;
      ((e.payload = function () {
        return o(u);
      }),
        (e.callback = function () {
          Ih(t, s, a);
        }));
    }
    var g = s.stateNode;
    g !== null &&
      typeof g.componentDidCatch == "function" &&
      (e.callback = function () {
        (Ih(t, s, a),
          typeof o != "function" &&
            (is === null ? (is = new Set([this])) : is.add(this)));
        var b = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: b !== null ? b : "",
        });
      });
  }
  function Fb(e, t, s, a, o) {
    if (
      ((s.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = s.alternate),
        t !== null && hr(t, s, o, !0),
        (s = Zt.current),
        s !== null)
      ) {
        switch (s.tag) {
          case 13:
            return (
              dn === null ? Qc() : s.alternate === null && Ke === 0 && (Ke = 3),
              (s.flags &= -257),
              (s.flags |= 65536),
              (s.lanes = o),
              a === Xo
                ? (s.flags |= 16384)
                : ((t = s.updateQueue),
                  t === null ? (s.updateQueue = new Set([a])) : t.add(a),
                  Yc(e, a, o)),
              !1
            );
          case 22:
            return (
              (s.flags |= 65536),
              a === Xo
                ? (s.flags |= 16384)
                : ((t = s.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (s.updateQueue = t))
                    : ((s = t.retryQueue),
                      s === null ? (t.retryQueue = new Set([a])) : s.add(a)),
                  Yc(e, a, o)),
              !1
            );
        }
        throw Error(c(435, s.tag));
      }
      return (Yc(e, a, o), Qc(), !1);
    }
    if (Ce)
      return (
        (t = Zt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = o),
            a !== Bo && ((e = Error(c(422), { cause: a })), fr(Vt(e, s))))
          : (a !== Bo && ((t = Error(c(423), { cause: a })), fr(Vt(t, s))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (o &= -o),
            (e.lanes |= o),
            (a = Vt(a, s)),
            (o = yc(e.stateNode, a, o)),
            $o(e, o),
            Ke !== 4 && (Ke = 2)),
        !1
      );
    var u = Error(c(520), { cause: a });
    if (
      ((u = Vt(u, s)),
      kr === null ? (kr = [u]) : kr.push(u),
      Ke !== 4 && (Ke = 2),
      t === null)
    )
      return !0;
    ((a = Vt(a, s)), (s = t));
    do {
      switch (s.tag) {
        case 3:
          return (
            (s.flags |= 65536),
            (e = o & -o),
            (s.lanes |= e),
            (e = yc(s.stateNode, a, e)),
            $o(s, e),
            !1
          );
        case 1:
          if (
            ((t = s.type),
            (u = s.stateNode),
            (s.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (is === null || !is.has(u)))))
          )
            return (
              (s.flags |= 65536),
              (o &= -o),
              (s.lanes |= o),
              (o = Wh(o)),
              em(o, e, s, a),
              $o(s, o),
              !1
            );
      }
      s = s.return;
    } while (s !== null);
    return !1;
  }
  var tm = Error(c(461)),
    lt = !1;
  function ut(e, t, s, a) {
    t.child = e === null ? Vh(t, null, s, a) : Ra(t, e.child, s, a);
  }
  function nm(e, t, s, a, o) {
    s = s.render;
    var u = t.ref;
    if ("ref" in a) {
      var g = {};
      for (var b in a) b !== "ref" && (g[b] = a[b]);
    } else g = a;
    return (
      qs(t),
      (a = tc(e, t, s, g, u, o)),
      (b = nc()),
      e !== null && !lt
        ? (sc(e, t, o), On(e, t, o))
        : (Ce && b && qo(t), (t.flags |= 1), ut(e, t, a, o), t.child)
    );
  }
  function sm(e, t, s, a, o) {
    if (e === null) {
      var u = s.type;
      return typeof u == "function" &&
        !zo(u) &&
        u.defaultProps === void 0 &&
        s.compare === null
        ? ((t.tag = 15), (t.type = u), am(e, t, u, a, o))
        : ((e = Cl(s.type, null, a, t, t.mode, o)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((u = e.child), !Tc(e, o))) {
      var g = u.memoizedProps;
      if (
        ((s = s.compare), (s = s !== null ? s : or), s(g, a) && e.ref === t.ref)
      )
        return On(e, t, o);
    }
    return (
      (t.flags |= 1),
      (e = wn(u, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function am(e, t, s, a, o) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (or(u, a) && e.ref === t.ref)
        if (((lt = !1), (t.pendingProps = a = u), Tc(e, o)))
          (e.flags & 131072) !== 0 && (lt = !0);
        else return ((t.lanes = e.lanes), On(e, t, o));
    }
    return vc(e, t, s, a, o);
  }
  function rm(e, t, s) {
    var a = t.pendingProps,
      o = a.children,
      u = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((a = u !== null ? u.baseLanes | s : s), e !== null)) {
          for (o = t.child = e.child, u = 0; o !== null; )
            ((u = u | o.lanes | o.childLanes), (o = o.sibling));
          t.childLanes = u & ~a;
        } else ((t.childLanes = 0), (t.child = null));
        return lm(e, t, a, s);
      }
      if ((s & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Dl(t, u !== null ? u.cachePool : null),
          u !== null ? ah(t, u) : Io(),
          Kh(t));
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          lm(e, t, u !== null ? u.baseLanes | s : s, s)
        );
    } else
      u !== null
        ? (Dl(t, u.cachePool), ah(t, u), ts(), (t.memoizedState = null))
        : (e !== null && Dl(t, null), Io(), ts());
    return (ut(e, t, o, s), t.child);
  }
  function lm(e, t, s, a) {
    var o = Ko();
    return (
      (o = o === null ? null : { parent: et._currentValue, pool: o }),
      (t.memoizedState = { baseLanes: s, cachePool: o }),
      e !== null && Dl(t, null),
      Io(),
      Kh(t),
      e !== null && hr(e, t, a, !0),
      null
    );
  }
  function Jl(e, t) {
    var s = t.ref;
    if (s === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof s != "function" && typeof s != "object") throw Error(c(284));
      (e === null || e.ref !== s) && (t.flags |= 4194816);
    }
  }
  function vc(e, t, s, a, o) {
    return (
      qs(t),
      (s = tc(e, t, s, a, void 0, o)),
      (a = nc()),
      e !== null && !lt
        ? (sc(e, t, o), On(e, t, o))
        : (Ce && a && qo(t), (t.flags |= 1), ut(e, t, s, o), t.child)
    );
  }
  function im(e, t, s, a, o, u) {
    return (
      qs(t),
      (t.updateQueue = null),
      (s = lh(t, a, s, o)),
      rh(e),
      (a = nc()),
      e !== null && !lt
        ? (sc(e, t, u), On(e, t, u))
        : (Ce && a && qo(t), (t.flags |= 1), ut(e, t, s, u), t.child)
    );
  }
  function om(e, t, s, a, o) {
    if ((qs(t), t.stateNode === null)) {
      var u = ya,
        g = s.contextType;
      (typeof g == "object" && g !== null && (u = pt(g)),
        (u = new s(a, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = gc),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Fo(t),
        (g = s.contextType),
        (u.context = typeof g == "object" && g !== null ? pt(g) : ya),
        (u.state = t.memoizedState),
        (g = s.getDerivedStateFromProps),
        typeof g == "function" && (xc(t, s, g, a), (u.state = t.memoizedState)),
        typeof s.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((g = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          g !== u.state && gc.enqueueReplaceState(u, u.state, null),
          br(t, a, u, o),
          vr(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      u = t.stateNode;
      var b = t.memoizedProps,
        E = Gs(s, b);
      u.props = E;
      var D = u.context,
        B = s.contextType;
      ((g = ya), typeof B == "object" && B !== null && (g = pt(B)));
      var P = s.getDerivedStateFromProps;
      ((B =
        typeof P == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (b = t.pendingProps !== b),
        B ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((b || D !== g) && Fh(t, u, a, g)),
        ($n = !1));
      var L = t.memoizedState;
      ((u.state = L),
        br(t, a, u, o),
        vr(),
        (D = t.memoizedState),
        b || L !== D || $n
          ? (typeof P == "function" && (xc(t, s, P, a), (D = t.memoizedState)),
            (E = $n || Xh(t, s, E, a, L, D, g))
              ? (B ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = D)),
            (u.props = a),
            (u.state = D),
            (u.context = g),
            (a = E))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((u = t.stateNode),
        Zo(e, t),
        (g = t.memoizedProps),
        (B = Gs(s, g)),
        (u.props = B),
        (P = t.pendingProps),
        (L = u.context),
        (D = s.contextType),
        (E = ya),
        typeof D == "object" && D !== null && (E = pt(D)),
        (b = s.getDerivedStateFromProps),
        (D =
          typeof b == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((g !== P || L !== E) && Fh(t, u, a, E)),
        ($n = !1),
        (L = t.memoizedState),
        (u.state = L),
        br(t, a, u, o),
        vr());
      var q = t.memoizedState;
      g !== P ||
      L !== q ||
      $n ||
      (e !== null && e.dependencies !== null && _l(e.dependencies))
        ? (typeof b == "function" && (xc(t, s, b, a), (q = t.memoizedState)),
          (B =
            $n ||
            Xh(t, s, B, a, L, q, E) ||
            (e !== null && e.dependencies !== null && _l(e.dependencies)))
            ? (D ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(a, q, E),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, q, E)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (g === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (g === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = q)),
          (u.props = a),
          (u.state = q),
          (u.context = E),
          (a = B))
        : (typeof u.componentDidUpdate != "function" ||
            (g === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (g === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (u = a),
      Jl(e, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (s =
            a && typeof s.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = Ra(t, e.child, null, o)),
              (t.child = Ra(t, null, s, o)))
            : ut(e, t, s, o),
          (t.memoizedState = u.state),
          (e = t.child))
        : (e = On(e, t, o)),
      e
    );
  }
  function cm(e, t, s, a) {
    return (dr(), (t.flags |= 256), ut(e, t, s, a), t.child);
  }
  var bc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function jc(e) {
    return { baseLanes: e, cachePool: $f() };
  }
  function Nc(e, t, s) {
    return ((e = e !== null ? e.childLanes & ~s : 0), t && (e |= $t), e);
  }
  function um(e, t, s) {
    var a = t.pendingProps,
      o = !1,
      u = (t.flags & 128) !== 0,
      g;
    if (
      ((g = u) ||
        (g =
          e !== null && e.memoizedState === null ? !1 : (tt.current & 2) !== 0),
      g && ((o = !0), (t.flags &= -129)),
      (g = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ce) {
        if ((o ? es(t) : ts(), Ce)) {
          var b = Ve,
            E;
          if ((E = b)) {
            e: {
              for (E = b, b = un; E.nodeType !== 8; ) {
                if (!b) {
                  b = null;
                  break e;
                }
                if (((E = sn(E.nextSibling)), E === null)) {
                  b = null;
                  break e;
                }
              }
              b = E;
            }
            b !== null
              ? ((t.memoizedState = {
                  dehydrated: b,
                  treeContext: ks !== null ? { id: Sn, overflow: En } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (E = Rt(18, null, null, 0)),
                (E.stateNode = b),
                (E.return = t),
                (t.child = E),
                (yt = t),
                (Ve = null),
                (E = !0))
              : (E = !1);
          }
          E || Ls(t);
        }
        if (
          ((b = t.memoizedState),
          b !== null && ((b = b.dehydrated), b !== null))
        )
          return (ru(b) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        Cn(t);
      }
      return (
        (b = a.children),
        (a = a.fallback),
        o
          ? (ts(),
            (o = t.mode),
            (b = Il({ mode: "hidden", children: b }, o)),
            (a = _s(a, o, s, null)),
            (b.return = t),
            (a.return = t),
            (b.sibling = a),
            (t.child = b),
            (o = t.child),
            (o.memoizedState = jc(s)),
            (o.childLanes = Nc(e, g, s)),
            (t.memoizedState = bc),
            a)
          : (es(t), wc(t, b))
      );
    }
    if (
      ((E = e.memoizedState), E !== null && ((b = E.dehydrated), b !== null))
    ) {
      if (u)
        t.flags & 256
          ? (es(t), (t.flags &= -257), (t = Sc(e, t, s)))
          : t.memoizedState !== null
            ? (ts(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (ts(),
              (o = a.fallback),
              (b = t.mode),
              (a = Il({ mode: "visible", children: a.children }, b)),
              (o = _s(o, b, s, null)),
              (o.flags |= 2),
              (a.return = t),
              (o.return = t),
              (a.sibling = o),
              (t.child = a),
              Ra(t, e.child, null, s),
              (a = t.child),
              (a.memoizedState = jc(s)),
              (a.childLanes = Nc(e, g, s)),
              (t.memoizedState = bc),
              (t = o));
      else if ((es(t), ru(b))) {
        if (((g = b.nextSibling && b.nextSibling.dataset), g)) var D = g.dgst;
        ((g = D),
          (a = Error(c(419))),
          (a.stack = ""),
          (a.digest = g),
          fr({ value: a, source: null, stack: null }),
          (t = Sc(e, t, s)));
      } else if (
        (lt || hr(e, t, s, !1), (g = (s & e.childLanes) !== 0), lt || g)
      ) {
        if (
          ((g = Ge),
          g !== null &&
            ((a = s & -s),
            (a = (a & 42) !== 0 ? 1 : ro(a)),
            (a = (a & (g.suspendedLanes | s)) !== 0 ? 0 : a),
            a !== 0 && a !== E.retryLane))
        )
          throw ((E.retryLane = a), ga(e, a), kt(g, e, a), tm);
        (b.data === "$?" || Qc(), (t = Sc(e, t, s)));
      } else
        b.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            (Ve = sn(b.nextSibling)),
            (yt = t),
            (Ce = !0),
            (zs = null),
            (un = !1),
            e !== null &&
              ((Xt[Ft++] = Sn),
              (Xt[Ft++] = En),
              (Xt[Ft++] = ks),
              (Sn = e.id),
              (En = e.overflow),
              (ks = t)),
            (t = wc(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return o
      ? (ts(),
        (o = a.fallback),
        (b = t.mode),
        (E = e.child),
        (D = E.sibling),
        (a = wn(E, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = E.subtreeFlags & 65011712),
        D !== null ? (o = wn(D, o)) : ((o = _s(o, b, s, null)), (o.flags |= 2)),
        (o.return = t),
        (a.return = t),
        (a.sibling = o),
        (t.child = a),
        (a = o),
        (o = t.child),
        (b = e.child.memoizedState),
        b === null
          ? (b = jc(s))
          : ((E = b.cachePool),
            E !== null
              ? ((D = et._currentValue),
                (E = E.parent !== D ? { parent: D, pool: D } : E))
              : (E = $f()),
            (b = { baseLanes: b.baseLanes | s, cachePool: E })),
        (o.memoizedState = b),
        (o.childLanes = Nc(e, g, s)),
        (t.memoizedState = bc),
        a)
      : (es(t),
        (s = e.child),
        (e = s.sibling),
        (s = wn(s, { mode: "visible", children: a.children })),
        (s.return = t),
        (s.sibling = null),
        e !== null &&
          ((g = t.deletions),
          g === null ? ((t.deletions = [e]), (t.flags |= 16)) : g.push(e)),
        (t.child = s),
        (t.memoizedState = null),
        s);
  }
  function wc(e, t) {
    return (
      (t = Il({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function Il(e, t) {
    return (
      (e = Rt(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function Sc(e, t, s) {
    return (
      Ra(t, e.child, null, s),
      (e = wc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function dm(e, t, s) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), Qo(e.return, t, s));
  }
  function Ec(e, t, s, a, o) {
    var u = e.memoizedState;
    u === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: s,
          tailMode: o,
        })
      : ((u.isBackwards = t),
        (u.rendering = null),
        (u.renderingStartTime = 0),
        (u.last = a),
        (u.tail = s),
        (u.tailMode = o));
  }
  function fm(e, t, s) {
    var a = t.pendingProps,
      o = a.revealOrder,
      u = a.tail;
    if ((ut(e, t, a.children, s), (a = tt.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && dm(e, s, t);
          else if (e.tag === 19) dm(e, s, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      a &= 1;
    }
    switch (($(tt, a), o)) {
      case "forwards":
        for (s = t.child, o = null; s !== null; )
          ((e = s.alternate),
            e !== null && Fl(e) === null && (o = s),
            (s = s.sibling));
        ((s = o),
          s === null
            ? ((o = t.child), (t.child = null))
            : ((o = s.sibling), (s.sibling = null)),
          Ec(t, !1, o, s, u));
        break;
      case "backwards":
        for (s = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Fl(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = s), (s = o), (o = e));
        }
        Ec(t, !0, s, null, u);
        break;
      case "together":
        Ec(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function On(e, t, s) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (ls |= t.lanes),
      (s & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((hr(e, t, s, !1), (s & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (
        e = t.child, s = wn(e, e.pendingProps), t.child = s, s.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (s = s.sibling = wn(e, e.pendingProps)),
          (s.return = t));
      s.sibling = null;
    }
    return t.child;
  }
  function Tc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && _l(e)));
  }
  function Zb(e, t, s) {
    switch (t.tag) {
      case 3:
        (Me(t, t.stateNode.containerInfo),
          Zn(t, et, e.memoizedState.cache),
          dr());
        break;
      case 27:
      case 5:
        Yn(t);
        break;
      case 4:
        Me(t, t.stateNode.containerInfo);
        break;
      case 10:
        Zn(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (es(t), (t.flags |= 128), null)
            : (s & t.child.childLanes) !== 0
              ? um(e, t, s)
              : (es(t), (e = On(e, t, s)), e !== null ? e.sibling : null);
        es(t);
        break;
      case 19:
        var o = (e.flags & 128) !== 0;
        if (
          ((a = (s & t.childLanes) !== 0),
          a || (hr(e, t, s, !1), (a = (s & t.childLanes) !== 0)),
          o)
        ) {
          if (a) return fm(e, t, s);
          t.flags |= 128;
        }
        if (
          ((o = t.memoizedState),
          o !== null &&
            ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
          $(tt, tt.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), rm(e, t, s));
      case 24:
        Zn(t, et, e.memoizedState.cache);
    }
    return On(e, t, s);
  }
  function hm(e, t, s) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) lt = !0;
      else {
        if (!Tc(e, s) && (t.flags & 128) === 0) return ((lt = !1), Zb(e, t, s));
        lt = (e.flags & 131072) !== 0;
      }
    else ((lt = !1), Ce && (t.flags & 1048576) !== 0 && Pf(t, Ml, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType,
            o = a._init;
          if (((a = o(a._payload)), (t.type = a), typeof a == "function"))
            zo(a)
              ? ((e = Gs(a, e)), (t.tag = 1), (t = om(null, t, a, e, s)))
              : ((t.tag = 0), (t = vc(null, t, a, e, s)));
          else {
            if (a != null) {
              if (((o = a.$$typeof), o === H)) {
                ((t.tag = 11), (t = nm(null, t, a, e, s)));
                break e;
              } else if (o === Z) {
                ((t.tag = 14), (t = sm(null, t, a, e, s)));
                break e;
              }
            }
            throw ((t = I(a) || a), Error(c(306, t, "")));
          }
        }
        return t;
      case 0:
        return vc(e, t, t.type, t.pendingProps, s);
      case 1:
        return ((a = t.type), (o = Gs(a, t.pendingProps)), om(e, t, a, o, s));
      case 3:
        e: {
          if ((Me(t, t.stateNode.containerInfo), e === null))
            throw Error(c(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          ((o = u.element), Zo(e, t), br(t, a, null, s));
          var g = t.memoizedState;
          if (
            ((a = g.cache),
            Zn(t, et, a),
            a !== u.cache && Po(t, [et], s, !0),
            vr(),
            (a = g.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: g.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = cm(e, t, a, s);
              break e;
            } else if (a !== o) {
              ((o = Vt(Error(c(424)), t)), fr(o), (t = cm(e, t, a, s)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  Ve = sn(e.firstChild),
                  yt = t,
                  Ce = !0,
                  zs = null,
                  un = !0,
                  s = Vh(t, null, a, s),
                  t.child = s;
                s;
              )
                ((s.flags = (s.flags & -3) | 4096), (s = s.sibling));
          else {
            if ((dr(), a === o)) {
              t = On(e, t, s);
              break e;
            }
            ut(e, t, a, s);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Jl(e, t),
          e === null
            ? (s = gp(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = s)
              : Ce ||
                ((s = t.type),
                (e = t.pendingProps),
                (a = fi(ne.current).createElement(s)),
                (a[mt] = t),
                (a[vt] = e),
                ft(a, s, e),
                rt(a),
                (t.stateNode = a))
            : (t.memoizedState = gp(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Yn(t),
          e === null &&
            Ce &&
            ((a = t.stateNode = mp(t.type, t.pendingProps, ne.current)),
            (yt = t),
            (un = !0),
            (o = Ve),
            us(t.type) ? ((lu = o), (Ve = sn(a.firstChild))) : (Ve = o)),
          ut(e, t, t.pendingProps.children, s),
          Jl(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ce &&
            ((o = a = Ve) &&
              ((a = w0(a, t.type, t.pendingProps, un)),
              a !== null
                ? ((t.stateNode = a),
                  (yt = t),
                  (Ve = sn(a.firstChild)),
                  (un = !1),
                  (o = !0))
                : (o = !1)),
            o || Ls(t)),
          Yn(t),
          (o = t.type),
          (u = t.pendingProps),
          (g = e !== null ? e.memoizedProps : null),
          (a = u.children),
          nu(o, u) ? (a = null) : g !== null && nu(o, g) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((o = tc(e, t, Gb, null, null, s)), (Qr._currentValue = o)),
          Jl(e, t),
          ut(e, t, a, s),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ce &&
            ((e = s = Ve) &&
              ((s = S0(s, t.pendingProps, un)),
              s !== null
                ? ((t.stateNode = s), (yt = t), (Ve = null), (e = !0))
                : (e = !1)),
            e || Ls(t)),
          null
        );
      case 13:
        return um(e, t, s);
      case 4:
        return (
          Me(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = Ra(t, null, a, s)) : ut(e, t, a, s),
          t.child
        );
      case 11:
        return nm(e, t, t.type, t.pendingProps, s);
      case 7:
        return (ut(e, t, t.pendingProps, s), t.child);
      case 8:
        return (ut(e, t, t.pendingProps.children, s), t.child);
      case 12:
        return (ut(e, t, t.pendingProps.children, s), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          Zn(t, t.type, a.value),
          ut(e, t, a.children, s),
          t.child
        );
      case 9:
        return (
          (o = t.type._context),
          (a = t.pendingProps.children),
          qs(t),
          (o = pt(o)),
          (a = a(o)),
          (t.flags |= 1),
          ut(e, t, a, s),
          t.child
        );
      case 14:
        return sm(e, t, t.type, t.pendingProps, s);
      case 15:
        return am(e, t, t.type, t.pendingProps, s);
      case 19:
        return fm(e, t, s);
      case 31:
        return (
          (a = t.pendingProps),
          (s = t.mode),
          (a = { mode: a.mode, children: a.children }),
          e === null
            ? ((s = Il(a, s)),
              (s.ref = t.ref),
              (t.child = s),
              (s.return = t),
              (t = s))
            : ((s = wn(e.child, a)),
              (s.ref = t.ref),
              (t.child = s),
              (s.return = t),
              (t = s)),
          t
        );
      case 22:
        return rm(e, t, s);
      case 24:
        return (
          qs(t),
          (a = pt(et)),
          e === null
            ? ((o = Ko()),
              o === null &&
                ((o = Ge),
                (u = Yo()),
                (o.pooledCache = u),
                u.refCount++,
                u !== null && (o.pooledCacheLanes |= s),
                (o = u)),
              (t.memoizedState = { parent: a, cache: o }),
              Fo(t),
              Zn(t, et, o))
            : ((e.lanes & s) !== 0 && (Zo(e, t), br(t, null, null, s), vr()),
              (o = e.memoizedState),
              (u = t.memoizedState),
              o.parent !== a
                ? ((o = { parent: a, cache: a }),
                  (t.memoizedState = o),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = o),
                  Zn(t, et, a))
                : ((a = u.cache),
                  Zn(t, et, a),
                  a !== o.cache && Po(t, [et], s, !0))),
          ut(e, t, t.pendingProps.children, s),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function Mn(e) {
    e.flags |= 4;
  }
  function mm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Np(t))) {
      if (
        ((t = Zt.current),
        t !== null &&
          ((Te & 4194048) === Te
            ? dn !== null
            : ((Te & 62914560) !== Te && (Te & 536870912) === 0) || t !== dn))
      )
        throw ((gr = Xo), Jf);
      e.flags |= 8192;
    }
  }
  function Wl(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? Vd() : 536870912), (e.lanes |= t), (_a |= t)));
  }
  function Ar(e, t) {
    if (!Ce)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var s = null; t !== null; )
            (t.alternate !== null && (s = t), (t = t.sibling));
          s === null ? (e.tail = null) : (s.sibling = null);
          break;
        case "collapsed":
          s = e.tail;
          for (var a = null; s !== null; )
            (s.alternate !== null && (a = s), (s = s.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Ye(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      s = 0,
      a = 0;
    if (t)
      for (var o = e.child; o !== null; )
        ((s |= o.lanes | o.childLanes),
          (a |= o.subtreeFlags & 65011712),
          (a |= o.flags & 65011712),
          (o.return = e),
          (o = o.sibling));
    else
      for (o = e.child; o !== null; )
        ((s |= o.lanes | o.childLanes),
          (a |= o.subtreeFlags),
          (a |= o.flags),
          (o.return = e),
          (o = o.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = s), t);
  }
  function $b(e, t, s) {
    var a = t.pendingProps;
    switch ((Ho(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Ye(t), null);
      case 1:
        return (Ye(t), null);
      case 3:
        return (
          (s = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          An(et),
          _e(),
          s.pendingContext &&
            ((s.context = s.pendingContext), (s.pendingContext = null)),
          (e === null || e.child === null) &&
            (ur(t)
              ? Mn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Kf())),
          Ye(t),
          null
        );
      case 26:
        return (
          (s = t.memoizedState),
          e === null
            ? (Mn(t),
              s !== null ? (Ye(t), mm(t, s)) : (Ye(t), (t.flags &= -16777217)))
            : s
              ? s !== e.memoizedState
                ? (Mn(t), Ye(t), mm(t, s))
                : (Ye(t), (t.flags &= -16777217))
              : (e.memoizedProps !== a && Mn(t), Ye(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        (en(t), (s = ne.current));
        var o = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && Mn(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(c(166));
            return (Ye(t), null);
          }
          ((e = se.current),
            ur(t) ? Yf(t) : ((e = mp(o, a, s)), (t.stateNode = e), Mn(t)));
        }
        return (Ye(t), null);
      case 5:
        if ((en(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Mn(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(c(166));
            return (Ye(t), null);
          }
          if (((e = se.current), ur(t))) Yf(t);
          else {
            switch (((o = fi(ne.current)), e)) {
              case 1:
                e = o.createElementNS("http://www.w3.org/2000/svg", s);
                break;
              case 2:
                e = o.createElementNS("http://www.w3.org/1998/Math/MathML", s);
                break;
              default:
                switch (s) {
                  case "svg":
                    e = o.createElementNS("http://www.w3.org/2000/svg", s);
                    break;
                  case "math":
                    e = o.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s,
                    );
                    break;
                  case "script":
                    ((e = o.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)));
                    break;
                  case "select":
                    ((e =
                      typeof a.is == "string"
                        ? o.createElement("select", { is: a.is })
                        : o.createElement("select")),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size));
                    break;
                  default:
                    e =
                      typeof a.is == "string"
                        ? o.createElement(s, { is: a.is })
                        : o.createElement(s);
                }
            }
            ((e[mt] = t), (e[vt] = a));
            e: for (o = t.child; o !== null; ) {
              if (o.tag === 5 || o.tag === 6) e.appendChild(o.stateNode);
              else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                ((o.child.return = o), (o = o.child));
                continue;
              }
              if (o === t) break e;
              for (; o.sibling === null; ) {
                if (o.return === null || o.return === t) break e;
                o = o.return;
              }
              ((o.sibling.return = o.return), (o = o.sibling));
            }
            t.stateNode = e;
            e: switch ((ft(e, s, a), s)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Mn(t);
          }
        }
        return (Ye(t), (t.flags &= -16777217), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Mn(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(c(166));
          if (((e = ne.current), ur(t))) {
            if (
              ((e = t.stateNode),
              (s = t.memoizedProps),
              (a = null),
              (o = yt),
              o !== null)
            )
              switch (o.tag) {
                case 27:
                case 5:
                  a = o.memoizedProps;
              }
            ((e[mt] = t),
              (e = !!(
                e.nodeValue === s ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                ip(e.nodeValue, s)
              )),
              e || Ls(t));
          } else
            ((e = fi(e).createTextNode(a)), (e[mt] = t), (t.stateNode = e));
        }
        return (Ye(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((o = ur(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!o) throw Error(c(318));
              if (
                ((o = t.memoizedState),
                (o = o !== null ? o.dehydrated : null),
                !o)
              )
                throw Error(c(317));
              o[mt] = t;
            } else
              (dr(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Ye(t), (o = !1));
          } else
            ((o = Kf()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = o),
              (o = !0));
          if (!o) return t.flags & 256 ? (Cn(t), t) : (Cn(t), null);
        }
        if ((Cn(t), (t.flags & 128) !== 0)) return ((t.lanes = s), t);
        if (
          ((s = a !== null), (e = e !== null && e.memoizedState !== null), s)
        ) {
          ((a = t.child),
            (o = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (o = a.alternate.memoizedState.cachePool.pool));
          var u = null;
          (a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (u = a.memoizedState.cachePool.pool),
            u !== o && (a.flags |= 2048));
        }
        return (
          s !== e && s && (t.child.flags |= 8192),
          Wl(t, t.updateQueue),
          Ye(t),
          null
        );
      case 4:
        return (_e(), e === null && Jc(t.stateNode.containerInfo), Ye(t), null);
      case 10:
        return (An(t.type), Ye(t), null);
      case 19:
        if ((J(tt), (o = t.memoizedState), o === null)) return (Ye(t), null);
        if (((a = (t.flags & 128) !== 0), (u = o.rendering), u === null))
          if (a) Ar(o, !1);
          else {
            if (Ke !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((u = Fl(e)), u !== null)) {
                  for (
                    t.flags |= 128,
                      Ar(o, !1),
                      e = u.updateQueue,
                      t.updateQueue = e,
                      Wl(t, e),
                      t.subtreeFlags = 0,
                      e = s,
                      s = t.child;
                    s !== null;
                  )
                    (Qf(s, e), (s = s.sibling));
                  return ($(tt, (tt.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            o.tail !== null &&
              cn() > ni &&
              ((t.flags |= 128), (a = !0), Ar(o, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = Fl(u)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                Wl(t, e),
                Ar(o, !0),
                o.tail === null &&
                  o.tailMode === "hidden" &&
                  !u.alternate &&
                  !Ce)
              )
                return (Ye(t), null);
            } else
              2 * cn() - o.renderingStartTime > ni &&
                s !== 536870912 &&
                ((t.flags |= 128), (a = !0), Ar(o, !1), (t.lanes = 4194304));
          o.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((e = o.last),
              e !== null ? (e.sibling = u) : (t.child = u),
              (o.last = u));
        }
        return o.tail !== null
          ? ((t = o.tail),
            (o.rendering = t),
            (o.tail = t.sibling),
            (o.renderingStartTime = cn()),
            (t.sibling = null),
            (e = tt.current),
            $(tt, a ? (e & 1) | 2 : e & 1),
            t)
          : (Ye(t), null);
      case 22:
      case 23:
        return (
          Cn(t),
          Wo(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (s & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Ye(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Ye(t),
          (s = t.updateQueue),
          s !== null && Wl(t, s.retryQueue),
          (s = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (s = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== s && (t.flags |= 2048),
          e !== null && J(Hs),
          null
        );
      case 24:
        return (
          (s = null),
          e !== null && (s = e.memoizedState.cache),
          t.memoizedState.cache !== s && (t.flags |= 2048),
          An(et),
          Ye(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Jb(e, t) {
    switch ((Ho(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          An(et),
          _e(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (en(t), null);
      case 13:
        if (
          (Cn(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(c(340));
          dr();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (J(tt), null);
      case 4:
        return (_e(), null);
      case 10:
        return (An(t.type), null);
      case 22:
      case 23:
        return (
          Cn(t),
          Wo(),
          e !== null && J(Hs),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (An(et), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function pm(e, t) {
    switch ((Ho(t), t.tag)) {
      case 3:
        (An(et), _e());
        break;
      case 26:
      case 27:
      case 5:
        en(t);
        break;
      case 4:
        _e();
        break;
      case 13:
        Cn(t);
        break;
      case 19:
        J(tt);
        break;
      case 10:
        An(t.type);
        break;
      case 22:
      case 23:
        (Cn(t), Wo(), e !== null && J(Hs));
        break;
      case 24:
        An(et);
    }
  }
  function Rr(e, t) {
    try {
      var s = t.updateQueue,
        a = s !== null ? s.lastEffect : null;
      if (a !== null) {
        var o = a.next;
        s = o;
        do {
          if ((s.tag & e) === e) {
            a = void 0;
            var u = s.create,
              g = s.inst;
            ((a = u()), (g.destroy = a));
          }
          s = s.next;
        } while (s !== o);
      }
    } catch (b) {
      Be(t, t.return, b);
    }
  }
  function ns(e, t, s) {
    try {
      var a = t.updateQueue,
        o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var u = o.next;
        a = u;
        do {
          if ((a.tag & e) === e) {
            var g = a.inst,
              b = g.destroy;
            if (b !== void 0) {
              ((g.destroy = void 0), (o = t));
              var E = s,
                D = b;
              try {
                D();
              } catch (B) {
                Be(o, E, B);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (B) {
      Be(t, t.return, B);
    }
  }
  function xm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var s = e.stateNode;
      try {
        sh(t, s);
      } catch (a) {
        Be(e, e.return, a);
      }
    }
  }
  function gm(e, t, s) {
    ((s.props = Gs(e.type, e.memoizedProps)), (s.state = e.memoizedState));
    try {
      s.componentWillUnmount();
    } catch (a) {
      Be(e, t, a);
    }
  }
  function Cr(e, t) {
    try {
      var s = e.ref;
      if (s !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof s == "function" ? (e.refCleanup = s(a)) : (s.current = a);
      }
    } catch (o) {
      Be(e, t, o);
    }
  }
  function fn(e, t) {
    var s = e.ref,
      a = e.refCleanup;
    if (s !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (o) {
          Be(e, t, o);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof s == "function")
        try {
          s(null);
        } catch (o) {
          Be(e, t, o);
        }
      else s.current = null;
  }
  function ym(e) {
    var t = e.type,
      s = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          s.autoFocus && a.focus();
          break e;
        case "img":
          s.src ? (a.src = s.src) : s.srcSet && (a.srcset = s.srcSet);
      }
    } catch (o) {
      Be(e, e.return, o);
    }
  }
  function Ac(e, t, s) {
    try {
      var a = e.stateNode;
      (y0(a, e.type, s, t), (a[vt] = t));
    } catch (o) {
      Be(e, e.return, o);
    }
  }
  function vm(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && us(e.type)) ||
      e.tag === 4
    );
  }
  function Rc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || vm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && us(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Cc(e, t, s) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (s.nodeType === 9
              ? s.body
              : s.nodeName === "HTML"
                ? s.ownerDocument.body
                : s
            ).insertBefore(e, t)
          : ((t =
              s.nodeType === 9
                ? s.body
                : s.nodeName === "HTML"
                  ? s.ownerDocument.body
                  : s),
            t.appendChild(e),
            (s = s._reactRootContainer),
            s != null || t.onclick !== null || (t.onclick = di)));
    else if (
      a !== 4 &&
      (a === 27 && us(e.type) && ((s = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Cc(e, t, s), e = e.sibling; e !== null; )
        (Cc(e, t, s), (e = e.sibling));
  }
  function ei(e, t, s) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? s.insertBefore(e, t) : s.appendChild(e));
    else if (
      a !== 4 &&
      (a === 27 && us(e.type) && (s = e.stateNode), (e = e.child), e !== null)
    )
      for (ei(e, t, s), e = e.sibling; e !== null; )
        (ei(e, t, s), (e = e.sibling));
  }
  function bm(e) {
    var t = e.stateNode,
      s = e.memoizedProps;
    try {
      for (var a = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      (ft(t, a, s), (t[mt] = e), (t[vt] = s));
    } catch (u) {
      Be(e, e.return, u);
    }
  }
  var _n = !1,
    $e = !1,
    Oc = !1,
    jm = typeof WeakSet == "function" ? WeakSet : Set,
    it = null;
  function Ib(e, t) {
    if (((e = e.containerInfo), (eu = yi), (e = _f(e)), Ro(e))) {
      if ("selectionStart" in e)
        var s = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          s = ((s = e.ownerDocument) && s.defaultView) || window;
          var a = s.getSelection && s.getSelection();
          if (a && a.rangeCount !== 0) {
            s = a.anchorNode;
            var o = a.anchorOffset,
              u = a.focusNode;
            a = a.focusOffset;
            try {
              (s.nodeType, u.nodeType);
            } catch {
              s = null;
              break e;
            }
            var g = 0,
              b = -1,
              E = -1,
              D = 0,
              B = 0,
              P = e,
              L = null;
            t: for (;;) {
              for (
                var q;
                P !== s || (o !== 0 && P.nodeType !== 3) || (b = g + o),
                  P !== u || (a !== 0 && P.nodeType !== 3) || (E = g + a),
                  P.nodeType === 3 && (g += P.nodeValue.length),
                  (q = P.firstChild) !== null;
              )
                ((L = P), (P = q));
              for (;;) {
                if (P === e) break t;
                if (
                  (L === s && ++D === o && (b = g),
                  L === u && ++B === a && (E = g),
                  (q = P.nextSibling) !== null)
                )
                  break;
                ((P = L), (L = P.parentNode));
              }
              P = q;
            }
            s = b === -1 || E === -1 ? null : { start: b, end: E };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (
      tu = { focusedElem: e, selectionRange: s }, yi = !1, it = t;
      it !== null;
    )
      if (
        ((t = it), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        ((e.return = t), (it = e));
      else
        for (; it !== null; ) {
          switch (((t = it), (u = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                ((e = void 0),
                  (s = t),
                  (o = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = s.stateNode));
                try {
                  var fe = Gs(s.type, o, s.elementType === s.type);
                  ((e = a.getSnapshotBeforeUpdate(fe, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ie) {
                  Be(s, s.return, ie);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (s = e.nodeType), s === 9)
                )
                  au(e);
                else if (s === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      au(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(c(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (it = e));
            break;
          }
          it = t.return;
        }
  }
  function Nm(e, t, s) {
    var a = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        (ss(e, s), a & 4 && Rr(5, s));
        break;
      case 1:
        if ((ss(e, s), a & 4))
          if (((e = s.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (g) {
              Be(s, s.return, g);
            }
          else {
            var o = Gs(s.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(o, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (g) {
              Be(s, s.return, g);
            }
          }
        (a & 64 && xm(s), a & 512 && Cr(s, s.return));
        break;
      case 3:
        if ((ss(e, s), a & 64 && ((e = s.updateQueue), e !== null))) {
          if (((t = null), s.child !== null))
            switch (s.child.tag) {
              case 27:
              case 5:
                t = s.child.stateNode;
                break;
              case 1:
                t = s.child.stateNode;
            }
          try {
            sh(e, t);
          } catch (g) {
            Be(s, s.return, g);
          }
        }
        break;
      case 27:
        t === null && a & 4 && bm(s);
      case 26:
      case 5:
        (ss(e, s), t === null && a & 4 && ym(s), a & 512 && Cr(s, s.return));
        break;
      case 12:
        ss(e, s);
        break;
      case 13:
        (ss(e, s),
          a & 4 && Em(e, s),
          a & 64 &&
            ((e = s.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((s = i0.bind(null, s)), E0(e, s)))));
        break;
      case 22:
        if (((a = s.memoizedState !== null || _n), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || $e), (o = _n));
          var u = $e;
          ((_n = a),
            ($e = t) && !u ? as(e, s, (s.subtreeFlags & 8772) !== 0) : ss(e, s),
            (_n = o),
            ($e = u));
        }
        break;
      case 30:
        break;
      default:
        ss(e, s);
    }
  }
  function wm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), wm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && oo(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var Pe = null,
    Nt = !1;
  function kn(e, t, s) {
    for (s = s.child; s !== null; ) (Sm(e, t, s), (s = s.sibling));
  }
  function Sm(e, t, s) {
    if (Et && typeof Et.onCommitFiberUnmount == "function")
      try {
        Et.onCommitFiberUnmount($a, s);
      } catch {}
    switch (s.tag) {
      case 26:
        ($e || fn(s, t),
          kn(e, t, s),
          s.memoizedState
            ? s.memoizedState.count--
            : s.stateNode && ((s = s.stateNode), s.parentNode.removeChild(s)));
        break;
      case 27:
        $e || fn(s, t);
        var a = Pe,
          o = Nt;
        (us(s.type) && ((Pe = s.stateNode), (Nt = !1)),
          kn(e, t, s),
          qr(s.stateNode),
          (Pe = a),
          (Nt = o));
        break;
      case 5:
        $e || fn(s, t);
      case 6:
        if (
          ((a = Pe),
          (o = Nt),
          (Pe = null),
          kn(e, t, s),
          (Pe = a),
          (Nt = o),
          Pe !== null)
        )
          if (Nt)
            try {
              (Pe.nodeType === 9
                ? Pe.body
                : Pe.nodeName === "HTML"
                  ? Pe.ownerDocument.body
                  : Pe
              ).removeChild(s.stateNode);
            } catch (u) {
              Be(s, t, u);
            }
          else
            try {
              Pe.removeChild(s.stateNode);
            } catch (u) {
              Be(s, t, u);
            }
        break;
      case 18:
        Pe !== null &&
          (Nt
            ? ((e = Pe),
              fp(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                s.stateNode,
              ),
              Kr(e))
            : fp(Pe, s.stateNode));
        break;
      case 4:
        ((a = Pe),
          (o = Nt),
          (Pe = s.stateNode.containerInfo),
          (Nt = !0),
          kn(e, t, s),
          (Pe = a),
          (Nt = o));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ($e || ns(2, s, t), $e || ns(4, s, t), kn(e, t, s));
        break;
      case 1:
        ($e ||
          (fn(s, t),
          (a = s.stateNode),
          typeof a.componentWillUnmount == "function" && gm(s, t, a)),
          kn(e, t, s));
        break;
      case 21:
        kn(e, t, s);
        break;
      case 22:
        (($e = (a = $e) || s.memoizedState !== null), kn(e, t, s), ($e = a));
        break;
      default:
        kn(e, t, s);
    }
  }
  function Em(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        Kr(e);
      } catch (s) {
        Be(t, t.return, s);
      }
  }
  function Wb(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new jm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new jm()),
          t
        );
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Mc(e, t) {
    var s = Wb(e);
    t.forEach(function (a) {
      var o = o0.bind(null, e, a);
      s.has(a) || (s.add(a), a.then(o, o));
    });
  }
  function Ct(e, t) {
    var s = t.deletions;
    if (s !== null)
      for (var a = 0; a < s.length; a++) {
        var o = s[a],
          u = e,
          g = t,
          b = g;
        e: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (us(b.type)) {
                ((Pe = b.stateNode), (Nt = !1));
                break e;
              }
              break;
            case 5:
              ((Pe = b.stateNode), (Nt = !1));
              break e;
            case 3:
            case 4:
              ((Pe = b.stateNode.containerInfo), (Nt = !0));
              break e;
          }
          b = b.return;
        }
        if (Pe === null) throw Error(c(160));
        (Sm(u, g, o),
          (Pe = null),
          (Nt = !1),
          (u = o.alternate),
          u !== null && (u.return = null),
          (o.return = null));
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) (Tm(t, e), (t = t.sibling));
  }
  var nn = null;
  function Tm(e, t) {
    var s = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Ct(t, e),
          Ot(e),
          a & 4 && (ns(3, e, e.return), Rr(3, e), ns(5, e, e.return)));
        break;
      case 1:
        (Ct(t, e),
          Ot(e),
          a & 512 && ($e || s === null || fn(s, s.return)),
          a & 64 &&
            _n &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((s = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = s === null ? a : s.concat(a))))));
        break;
      case 26:
        var o = nn;
        if (
          (Ct(t, e),
          Ot(e),
          a & 512 && ($e || s === null || fn(s, s.return)),
          a & 4)
        ) {
          var u = s !== null ? s.memoizedState : null;
          if (((a = e.memoizedState), s === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type),
                    (s = e.memoizedProps),
                    (o = o.ownerDocument || o));
                  t: switch (a) {
                    case "title":
                      ((u = o.getElementsByTagName("title")[0]),
                        (!u ||
                          u[Wa] ||
                          u[mt] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = o.createElement(a)),
                          o.head.insertBefore(
                            u,
                            o.querySelector("head > title"),
                          )),
                        ft(u, a, s),
                        (u[mt] = e),
                        rt(u),
                        (a = u));
                      break e;
                    case "link":
                      var g = bp("link", "href", o).get(a + (s.href || ""));
                      if (g) {
                        for (var b = 0; b < g.length; b++)
                          if (
                            ((u = g[b]),
                            u.getAttribute("href") ===
                              (s.href == null || s.href === ""
                                ? null
                                : s.href) &&
                              u.getAttribute("rel") ===
                                (s.rel == null ? null : s.rel) &&
                              u.getAttribute("title") ===
                                (s.title == null ? null : s.title) &&
                              u.getAttribute("crossorigin") ===
                                (s.crossOrigin == null ? null : s.crossOrigin))
                          ) {
                            g.splice(b, 1);
                            break t;
                          }
                      }
                      ((u = o.createElement(a)),
                        ft(u, a, s),
                        o.head.appendChild(u));
                      break;
                    case "meta":
                      if (
                        (g = bp("meta", "content", o).get(
                          a + (s.content || ""),
                        ))
                      ) {
                        for (b = 0; b < g.length; b++)
                          if (
                            ((u = g[b]),
                            u.getAttribute("content") ===
                              (s.content == null ? null : "" + s.content) &&
                              u.getAttribute("name") ===
                                (s.name == null ? null : s.name) &&
                              u.getAttribute("property") ===
                                (s.property == null ? null : s.property) &&
                              u.getAttribute("http-equiv") ===
                                (s.httpEquiv == null ? null : s.httpEquiv) &&
                              u.getAttribute("charset") ===
                                (s.charSet == null ? null : s.charSet))
                          ) {
                            g.splice(b, 1);
                            break t;
                          }
                      }
                      ((u = o.createElement(a)),
                        ft(u, a, s),
                        o.head.appendChild(u));
                      break;
                    default:
                      throw Error(c(468, a));
                  }
                  ((u[mt] = e), rt(u), (a = u));
                }
                e.stateNode = a;
              } else jp(o, e.type, e.stateNode);
            else e.stateNode = vp(o, a, e.memoizedProps);
          else
            u !== a
              ? (u === null
                  ? s.stateNode !== null &&
                    ((s = s.stateNode), s.parentNode.removeChild(s))
                  : u.count--,
                a === null
                  ? jp(o, e.type, e.stateNode)
                  : vp(o, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                Ac(e, e.memoizedProps, s.memoizedProps);
        }
        break;
      case 27:
        (Ct(t, e),
          Ot(e),
          a & 512 && ($e || s === null || fn(s, s.return)),
          s !== null && a & 4 && Ac(e, e.memoizedProps, s.memoizedProps));
        break;
      case 5:
        if (
          (Ct(t, e),
          Ot(e),
          a & 512 && ($e || s === null || fn(s, s.return)),
          e.flags & 32)
        ) {
          o = e.stateNode;
          try {
            ua(o, "");
          } catch (q) {
            Be(e, e.return, q);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((o = e.memoizedProps), Ac(e, o, s !== null ? s.memoizedProps : o)),
          a & 1024 && (Oc = !0));
        break;
      case 6:
        if ((Ct(t, e), Ot(e), a & 4)) {
          if (e.stateNode === null) throw Error(c(162));
          ((a = e.memoizedProps), (s = e.stateNode));
          try {
            s.nodeValue = a;
          } catch (q) {
            Be(e, e.return, q);
          }
        }
        break;
      case 3:
        if (
          ((pi = null),
          (o = nn),
          (nn = hi(t.containerInfo)),
          Ct(t, e),
          (nn = o),
          Ot(e),
          a & 4 && s !== null && s.memoizedState.isDehydrated)
        )
          try {
            Kr(t.containerInfo);
          } catch (q) {
            Be(e, e.return, q);
          }
        Oc && ((Oc = !1), Am(e));
        break;
      case 4:
        ((a = nn),
          (nn = hi(e.stateNode.containerInfo)),
          Ct(t, e),
          Ot(e),
          (nn = a));
        break;
      case 12:
        (Ct(t, e), Ot(e));
        break;
      case 13:
        (Ct(t, e),
          Ot(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (s !== null && s.memoizedState !== null) &&
            (Uc = cn()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Mc(e, a))));
        break;
      case 22:
        o = e.memoizedState !== null;
        var E = s !== null && s.memoizedState !== null,
          D = _n,
          B = $e;
        if (
          ((_n = D || o),
          ($e = B || E),
          Ct(t, e),
          ($e = B),
          (_n = D),
          Ot(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = o ? t._visibility & -2 : t._visibility | 1,
              o && (s === null || E || _n || $e || Qs(e)),
              s = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (s === null) {
                E = s = t;
                try {
                  if (((u = E.stateNode), o))
                    ((g = u.style),
                      typeof g.setProperty == "function"
                        ? g.setProperty("display", "none", "important")
                        : (g.display = "none"));
                  else {
                    b = E.stateNode;
                    var P = E.memoizedProps.style,
                      L =
                        P != null && P.hasOwnProperty("display")
                          ? P.display
                          : null;
                    b.style.display =
                      L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (q) {
                  Be(E, E.return, q);
                }
              }
            } else if (t.tag === 6) {
              if (s === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = o ? "" : E.memoizedProps;
                } catch (q) {
                  Be(E, E.return, q);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (s === t && (s = null), (t = t.return));
            }
            (s === t && (s = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((s = a.retryQueue),
            s !== null && ((a.retryQueue = null), Mc(e, s))));
        break;
      case 19:
        (Ct(t, e),
          Ot(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Mc(e, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Ct(t, e), Ot(e));
    }
  }
  function Ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var s, a = e.return; a !== null; ) {
          if (vm(a)) {
            s = a;
            break;
          }
          a = a.return;
        }
        if (s == null) throw Error(c(160));
        switch (s.tag) {
          case 27:
            var o = s.stateNode,
              u = Rc(e);
            ei(e, u, o);
            break;
          case 5:
            var g = s.stateNode;
            s.flags & 32 && (ua(g, ""), (s.flags &= -33));
            var b = Rc(e);
            ei(e, b, g);
            break;
          case 3:
          case 4:
            var E = s.stateNode.containerInfo,
              D = Rc(e);
            Cc(e, D, E);
            break;
          default:
            throw Error(c(161));
        }
      } catch (B) {
        Be(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Am(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (Am(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function ss(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Nm(e, t.alternate, t), (t = t.sibling));
  }
  function Qs(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (ns(4, t, t.return), Qs(t));
          break;
        case 1:
          fn(t, t.return);
          var s = t.stateNode;
          (typeof s.componentWillUnmount == "function" && gm(t, t.return, s),
            Qs(t));
          break;
        case 27:
          qr(t.stateNode);
        case 26:
        case 5:
          (fn(t, t.return), Qs(t));
          break;
        case 22:
          t.memoizedState === null && Qs(t);
          break;
        case 30:
          Qs(t);
          break;
        default:
          Qs(t);
      }
      e = e.sibling;
    }
  }
  function as(e, t, s) {
    for (s = s && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        o = e,
        u = t,
        g = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (as(o, u, s), Rr(4, u));
          break;
        case 1:
          if (
            (as(o, u, s),
            (a = u),
            (o = a.stateNode),
            typeof o.componentDidMount == "function")
          )
            try {
              o.componentDidMount();
            } catch (D) {
              Be(a, a.return, D);
            }
          if (((a = u), (o = a.updateQueue), o !== null)) {
            var b = a.stateNode;
            try {
              var E = o.shared.hiddenCallbacks;
              if (E !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < E.length; o++)
                  nh(E[o], b);
            } catch (D) {
              Be(a, a.return, D);
            }
          }
          (s && g & 64 && xm(u), Cr(u, u.return));
          break;
        case 27:
          bm(u);
        case 26:
        case 5:
          (as(o, u, s), s && a === null && g & 4 && ym(u), Cr(u, u.return));
          break;
        case 12:
          as(o, u, s);
          break;
        case 13:
          (as(o, u, s), s && g & 4 && Em(o, u));
          break;
        case 22:
          (u.memoizedState === null && as(o, u, s), Cr(u, u.return));
          break;
        case 30:
          break;
        default:
          as(o, u, s);
      }
      t = t.sibling;
    }
  }
  function _c(e, t) {
    var s = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (s = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== s && (e != null && e.refCount++, s != null && mr(s)));
  }
  function kc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && mr(e)));
  }
  function hn(e, t, s, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Rm(e, t, s, a), (t = t.sibling));
  }
  function Rm(e, t, s, a) {
    var o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (hn(e, t, s, a), o & 2048 && Rr(9, t));
        break;
      case 1:
        hn(e, t, s, a);
        break;
      case 3:
        (hn(e, t, s, a),
          o & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && mr(e))));
        break;
      case 12:
        if (o & 2048) {
          (hn(e, t, s, a), (e = t.stateNode));
          try {
            var u = t.memoizedProps,
              g = u.id,
              b = u.onPostCommit;
            typeof b == "function" &&
              b(
                g,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (E) {
            Be(t, t.return, E);
          }
        } else hn(e, t, s, a);
        break;
      case 13:
        hn(e, t, s, a);
        break;
      case 23:
        break;
      case 22:
        ((u = t.stateNode),
          (g = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? hn(e, t, s, a)
              : Or(e, t)
            : u._visibility & 2
              ? hn(e, t, s, a)
              : ((u._visibility |= 2),
                Ca(e, t, s, a, (t.subtreeFlags & 10256) !== 0)),
          o & 2048 && _c(g, t));
        break;
      case 24:
        (hn(e, t, s, a), o & 2048 && kc(t.alternate, t));
        break;
      default:
        hn(e, t, s, a);
    }
  }
  function Ca(e, t, s, a, o) {
    for (o = o && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var u = e,
        g = t,
        b = s,
        E = a,
        D = g.flags;
      switch (g.tag) {
        case 0:
        case 11:
        case 15:
          (Ca(u, g, b, E, o), Rr(8, g));
          break;
        case 23:
          break;
        case 22:
          var B = g.stateNode;
          (g.memoizedState !== null
            ? B._visibility & 2
              ? Ca(u, g, b, E, o)
              : Or(u, g)
            : ((B._visibility |= 2), Ca(u, g, b, E, o)),
            o && D & 2048 && _c(g.alternate, g));
          break;
        case 24:
          (Ca(u, g, b, E, o), o && D & 2048 && kc(g.alternate, g));
          break;
        default:
          Ca(u, g, b, E, o);
      }
      t = t.sibling;
    }
  }
  function Or(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var s = e,
          a = t,
          o = a.flags;
        switch (a.tag) {
          case 22:
            (Or(s, a), o & 2048 && _c(a.alternate, a));
            break;
          case 24:
            (Or(s, a), o & 2048 && kc(a.alternate, a));
            break;
          default:
            Or(s, a);
        }
        t = t.sibling;
      }
  }
  var Mr = 8192;
  function Oa(e) {
    if (e.subtreeFlags & Mr)
      for (e = e.child; e !== null; ) (Cm(e), (e = e.sibling));
  }
  function Cm(e) {
    switch (e.tag) {
      case 26:
        (Oa(e),
          e.flags & Mr &&
            e.memoizedState !== null &&
            q0(nn, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Oa(e);
        break;
      case 3:
      case 4:
        var t = nn;
        ((nn = hi(e.stateNode.containerInfo)), Oa(e), (nn = t));
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = Mr), (Mr = 16777216), Oa(e), (Mr = t))
            : Oa(e));
        break;
      default:
        Oa(e);
    }
  }
  function Om(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function _r(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var s = 0; s < t.length; s++) {
          var a = t[s];
          ((it = a), _m(a, e));
        }
      Om(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Mm(e), (e = e.sibling));
  }
  function Mm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (_r(e), e.flags & 2048 && ns(9, e, e.return));
        break;
      case 3:
        _r(e);
        break;
      case 12:
        _r(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ti(e))
          : _r(e);
        break;
      default:
        _r(e);
    }
  }
  function ti(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var s = 0; s < t.length; s++) {
          var a = t[s];
          ((it = a), _m(a, e));
        }
      Om(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (ns(8, t, t.return), ti(t));
          break;
        case 22:
          ((s = t.stateNode),
            s._visibility & 2 && ((s._visibility &= -3), ti(t)));
          break;
        default:
          ti(t);
      }
      e = e.sibling;
    }
  }
  function _m(e, t) {
    for (; it !== null; ) {
      var s = it;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          ns(8, s, t);
          break;
        case 23:
        case 22:
          if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
            var a = s.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          mr(s.memoizedState.cache);
      }
      if (((a = s.child), a !== null)) ((a.return = s), (it = a));
      else
        e: for (s = e; it !== null; ) {
          a = it;
          var o = a.sibling,
            u = a.return;
          if ((wm(a), a === s)) {
            it = null;
            break e;
          }
          if (o !== null) {
            ((o.return = u), (it = o));
            break e;
          }
          it = u;
        }
    }
  }
  var e0 = {
      getCacheForType: function (e) {
        var t = pt(et),
          s = t.data.get(e);
        return (s === void 0 && ((s = e()), t.data.set(e, s)), s);
      },
    },
    t0 = typeof WeakMap == "function" ? WeakMap : Map,
    ke = 0,
    Ge = null,
    Ne = null,
    Te = 0,
    De = 0,
    Mt = null,
    rs = !1,
    Ma = !1,
    Dc = !1,
    Dn = 0,
    Ke = 0,
    ls = 0,
    Ps = 0,
    zc = 0,
    $t = 0,
    _a = 0,
    kr = null,
    wt = null,
    Lc = !1,
    Uc = 0,
    ni = 1 / 0,
    si = null,
    is = null,
    dt = 0,
    os = null,
    ka = null,
    Da = 0,
    qc = 0,
    Hc = null,
    km = null,
    Dr = 0,
    Bc = null;
  function _t() {
    if ((ke & 2) !== 0 && Te !== 0) return Te & -Te;
    if (_.T !== null) {
      var e = ja;
      return e !== 0 ? e : Xc();
    }
    return Fd();
  }
  function Dm() {
    $t === 0 && ($t = (Te & 536870912) === 0 || Ce ? Yd() : 536870912);
    var e = Zt.current;
    return (e !== null && (e.flags |= 32), $t);
  }
  function kt(e, t, s) {
    (((e === Ge && (De === 2 || De === 9)) || e.cancelPendingCommit !== null) &&
      (za(e, 0), cs(e, Te, $t, !1)),
      Ia(e, s),
      ((ke & 2) === 0 || e !== Ge) &&
        (e === Ge &&
          ((ke & 2) === 0 && (Ps |= s), Ke === 4 && cs(e, Te, $t, !1)),
        mn(e)));
  }
  function zm(e, t, s) {
    if ((ke & 6) !== 0) throw Error(c(327));
    var a = (!s && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Ja(e, t),
      o = a ? a0(e, t) : Pc(e, t, !0),
      u = a;
    do {
      if (o === 0) {
        Ma && !a && cs(e, t, 0, !1);
        break;
      } else {
        if (((s = e.current.alternate), u && !n0(s))) {
          ((o = Pc(e, t, !1)), (u = !1));
          continue;
        }
        if (o === 2) {
          if (((u = t), e.errorRecoveryDisabledLanes & u)) var g = 0;
          else
            ((g = e.pendingLanes & -536870913),
              (g = g !== 0 ? g : g & 536870912 ? 536870912 : 0));
          if (g !== 0) {
            t = g;
            e: {
              var b = e;
              o = kr;
              var E = b.current.memoizedState.isDehydrated;
              if ((E && (za(b, g).flags |= 256), (g = Pc(b, g, !1)), g !== 2)) {
                if (Dc && !E) {
                  ((b.errorRecoveryDisabledLanes |= u), (Ps |= u), (o = 4));
                  break e;
                }
                ((u = wt),
                  (wt = o),
                  u !== null &&
                    (wt === null ? (wt = u) : wt.push.apply(wt, u)));
              }
              o = g;
            }
            if (((u = !1), o !== 2)) continue;
          }
        }
        if (o === 1) {
          (za(e, 0), cs(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (u = o), u)) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              cs(a, t, $t, !rs);
              break e;
            case 2:
              wt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && ((o = Uc + 300 - cn()), 10 < o)) {
            if ((cs(a, t, $t, !rs), ml(a, 0, !0) !== 0)) break e;
            a.timeoutHandle = up(
              Lm.bind(null, a, s, wt, si, Lc, t, $t, Ps, _a, rs, u, 2, -0, 0),
              o,
            );
            break e;
          }
          Lm(a, s, wt, si, Lc, t, $t, Ps, _a, rs, u, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    mn(e);
  }
  function Lm(e, t, s, a, o, u, g, b, E, D, B, P, L, q) {
    if (
      ((e.timeoutHandle = -1),
      (P = t.subtreeFlags),
      (P & 8192 || (P & 16785408) === 16785408) &&
        ((Gr = { stylesheets: null, count: 0, unsuspend: U0 }),
        Cm(t),
        (P = H0()),
        P !== null))
    ) {
      ((e.cancelPendingCommit = P(
        Pm.bind(null, e, t, u, s, a, o, g, b, E, B, 1, L, q),
      )),
        cs(e, u, g, !D));
      return;
    }
    Pm(e, t, u, s, a, o, g, b, E);
  }
  function n0(e) {
    for (var t = e; ; ) {
      var s = t.tag;
      if (
        (s === 0 || s === 11 || s === 15) &&
        t.flags & 16384 &&
        ((s = t.updateQueue), s !== null && ((s = s.stores), s !== null))
      )
        for (var a = 0; a < s.length; a++) {
          var o = s[a],
            u = o.getSnapshot;
          o = o.value;
          try {
            if (!At(u(), o)) return !1;
          } catch {
            return !1;
          }
        }
      if (((s = t.child), t.subtreeFlags & 16384 && s !== null))
        ((s.return = t), (t = s));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function cs(e, t, s, a) {
    ((t &= ~zc),
      (t &= ~Ps),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var o = t; 0 < o; ) {
      var u = 31 - Tt(o),
        g = 1 << u;
      ((a[u] = -1), (o &= ~g));
    }
    s !== 0 && Kd(e, s, t);
  }
  function ai() {
    return (ke & 6) === 0 ? (zr(0), !1) : !0;
  }
  function Gc() {
    if (Ne !== null) {
      if (De === 0) var e = Ne.return;
      else ((e = Ne), (Tn = Us = null), ac(e), (Aa = null), (Er = 0), (e = Ne));
      for (; e !== null; ) (pm(e.alternate, e), (e = e.return));
      Ne = null;
    }
  }
  function za(e, t) {
    var s = e.timeoutHandle;
    (s !== -1 && ((e.timeoutHandle = -1), b0(s)),
      (s = e.cancelPendingCommit),
      s !== null && ((e.cancelPendingCommit = null), s()),
      Gc(),
      (Ge = e),
      (Ne = s = wn(e.current, null)),
      (Te = t),
      (De = 0),
      (Mt = null),
      (rs = !1),
      (Ma = Ja(e, t)),
      (Dc = !1),
      (_a = $t = zc = Ps = ls = Ke = 0),
      (wt = kr = null),
      (Lc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var o = 31 - Tt(a),
          u = 1 << o;
        ((t |= e[o]), (a &= ~u));
      }
    return ((Dn = t), Tl(), s);
  }
  function Um(e, t) {
    ((ve = null),
      (_.H = Vl),
      t === xr || t === zl
        ? ((t = eh()), (De = 3))
        : t === Jf
          ? ((t = eh()), (De = 4))
          : (De =
              t === tm
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Mt = t),
      Ne === null && ((Ke = 1), $l(e, Vt(t, e.current))));
  }
  function qm() {
    var e = _.H;
    return ((_.H = Vl), e === null ? Vl : e);
  }
  function Hm() {
    var e = _.A;
    return ((_.A = e0), e);
  }
  function Qc() {
    ((Ke = 4),
      rs || ((Te & 4194048) !== Te && Zt.current !== null) || (Ma = !0),
      ((ls & 134217727) === 0 && (Ps & 134217727) === 0) ||
        Ge === null ||
        cs(Ge, Te, $t, !1));
  }
  function Pc(e, t, s) {
    var a = ke;
    ke |= 2;
    var o = qm(),
      u = Hm();
    ((Ge !== e || Te !== t) && ((si = null), za(e, t)), (t = !1));
    var g = Ke;
    e: do
      try {
        if (De !== 0 && Ne !== null) {
          var b = Ne,
            E = Mt;
          switch (De) {
            case 8:
              (Gc(), (g = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Zt.current === null && (t = !0);
              var D = De;
              if (((De = 0), (Mt = null), La(e, b, E, D), s && Ma)) {
                g = 0;
                break e;
              }
              break;
            default:
              ((D = De), (De = 0), (Mt = null), La(e, b, E, D));
          }
        }
        (s0(), (g = Ke));
        break;
      } catch (B) {
        Um(e, B);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Tn = Us = null),
      (ke = a),
      (_.H = o),
      (_.A = u),
      Ne === null && ((Ge = null), (Te = 0), Tl()),
      g
    );
  }
  function s0() {
    for (; Ne !== null; ) Bm(Ne);
  }
  function a0(e, t) {
    var s = ke;
    ke |= 2;
    var a = qm(),
      o = Hm();
    Ge !== e || Te !== t
      ? ((si = null), (ni = cn() + 500), za(e, t))
      : (Ma = Ja(e, t));
    e: do
      try {
        if (De !== 0 && Ne !== null) {
          t = Ne;
          var u = Mt;
          t: switch (De) {
            case 1:
              ((De = 0), (Mt = null), La(e, t, u, 1));
              break;
            case 2:
            case 9:
              if (If(u)) {
                ((De = 0), (Mt = null), Gm(t));
                break;
              }
              ((t = function () {
                ((De !== 2 && De !== 9) || Ge !== e || (De = 7), mn(e));
              }),
                u.then(t, t));
              break e;
            case 3:
              De = 7;
              break e;
            case 4:
              De = 5;
              break e;
            case 7:
              If(u)
                ? ((De = 0), (Mt = null), Gm(t))
                : ((De = 0), (Mt = null), La(e, t, u, 7));
              break;
            case 5:
              var g = null;
              switch (Ne.tag) {
                case 26:
                  g = Ne.memoizedState;
                case 5:
                case 27:
                  var b = Ne;
                  if (!g || Np(g)) {
                    ((De = 0), (Mt = null));
                    var E = b.sibling;
                    if (E !== null) Ne = E;
                    else {
                      var D = b.return;
                      D !== null ? ((Ne = D), ri(D)) : (Ne = null);
                    }
                    break t;
                  }
              }
              ((De = 0), (Mt = null), La(e, t, u, 5));
              break;
            case 6:
              ((De = 0), (Mt = null), La(e, t, u, 6));
              break;
            case 8:
              (Gc(), (Ke = 6));
              break e;
            default:
              throw Error(c(462));
          }
        }
        r0();
        break;
      } catch (B) {
        Um(e, B);
      }
    while (!0);
    return (
      (Tn = Us = null),
      (_.H = a),
      (_.A = o),
      (ke = s),
      Ne !== null ? 0 : ((Ge = null), (Te = 0), Tl(), Ke)
    );
  }
  function r0() {
    for (; Ne !== null && !Av(); ) Bm(Ne);
  }
  function Bm(e) {
    var t = hm(e.alternate, e, Dn);
    ((e.memoizedProps = e.pendingProps), t === null ? ri(e) : (Ne = t));
  }
  function Gm(e) {
    var t = e,
      s = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = im(s, t, t.pendingProps, t.type, void 0, Te);
        break;
      case 11:
        t = im(s, t, t.pendingProps, t.type.render, t.ref, Te);
        break;
      case 5:
        ac(t);
      default:
        (pm(s, t), (t = Ne = Qf(t, Dn)), (t = hm(s, t, Dn)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? ri(e) : (Ne = t));
  }
  function La(e, t, s, a) {
    ((Tn = Us = null), ac(t), (Aa = null), (Er = 0));
    var o = t.return;
    try {
      if (Fb(e, o, t, s, Te)) {
        ((Ke = 1), $l(e, Vt(s, e.current)), (Ne = null));
        return;
      }
    } catch (u) {
      if (o !== null) throw ((Ne = o), u);
      ((Ke = 1), $l(e, Vt(s, e.current)), (Ne = null));
      return;
    }
    t.flags & 32768
      ? (Ce || a === 1
          ? (e = !0)
          : Ma || (Te & 536870912) !== 0
            ? (e = !1)
            : ((rs = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = Zt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        Qm(t, e))
      : ri(t);
  }
  function ri(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Qm(t, rs);
        return;
      }
      e = t.return;
      var s = $b(t.alternate, t, Dn);
      if (s !== null) {
        Ne = s;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        Ne = t;
        return;
      }
      Ne = t = e;
    } while (t !== null);
    Ke === 0 && (Ke = 5);
  }
  function Qm(e, t) {
    do {
      var s = Jb(e.alternate, e);
      if (s !== null) {
        ((s.flags &= 32767), (Ne = s));
        return;
      }
      if (
        ((s = e.return),
        s !== null &&
          ((s.flags |= 32768), (s.subtreeFlags = 0), (s.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        Ne = e;
        return;
      }
      Ne = e = s;
    } while (e !== null);
    ((Ke = 6), (Ne = null));
  }
  function Pm(e, t, s, a, o, u, g, b, E) {
    e.cancelPendingCommit = null;
    do li();
    while (dt !== 0);
    if ((ke & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= ko),
        Uv(e, s, u, g, b, E),
        e === Ge && ((Ne = Ge = null), (Te = 0)),
        (ka = t),
        (os = e),
        (Da = s),
        (qc = u),
        (Hc = o),
        (km = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            c0(dl, function () {
              return (Fm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = _.T), (_.T = null), (o = K.p), (K.p = 2), (g = ke), (ke |= 4));
        try {
          Ib(e, t, s);
        } finally {
          ((ke = g), (K.p = o), (_.T = a));
        }
      }
      ((dt = 1), Ym(), Vm(), Km());
    }
  }
  function Ym() {
    if (dt === 1) {
      dt = 0;
      var e = os,
        t = ka,
        s = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || s) {
        ((s = _.T), (_.T = null));
        var a = K.p;
        K.p = 2;
        var o = ke;
        ke |= 4;
        try {
          Tm(t, e);
          var u = tu,
            g = _f(e.containerInfo),
            b = u.focusedElem,
            E = u.selectionRange;
          if (
            g !== b &&
            b &&
            b.ownerDocument &&
            Mf(b.ownerDocument.documentElement, b)
          ) {
            if (E !== null && Ro(b)) {
              var D = E.start,
                B = E.end;
              if ((B === void 0 && (B = D), "selectionStart" in b))
                ((b.selectionStart = D),
                  (b.selectionEnd = Math.min(B, b.value.length)));
              else {
                var P = b.ownerDocument || document,
                  L = (P && P.defaultView) || window;
                if (L.getSelection) {
                  var q = L.getSelection(),
                    fe = b.textContent.length,
                    ie = Math.min(E.start, fe),
                    qe = E.end === void 0 ? ie : Math.min(E.end, fe);
                  !q.extend && ie > qe && ((g = qe), (qe = ie), (ie = g));
                  var M = Of(b, ie),
                    O = Of(b, qe);
                  if (
                    M &&
                    O &&
                    (q.rangeCount !== 1 ||
                      q.anchorNode !== M.node ||
                      q.anchorOffset !== M.offset ||
                      q.focusNode !== O.node ||
                      q.focusOffset !== O.offset)
                  ) {
                    var k = P.createRange();
                    (k.setStart(M.node, M.offset),
                      q.removeAllRanges(),
                      ie > qe
                        ? (q.addRange(k), q.extend(O.node, O.offset))
                        : (k.setEnd(O.node, O.offset), q.addRange(k)));
                  }
                }
              }
            }
            for (P = [], q = b; (q = q.parentNode); )
              q.nodeType === 1 &&
                P.push({ element: q, left: q.scrollLeft, top: q.scrollTop });
            for (
              typeof b.focus == "function" && b.focus(), b = 0;
              b < P.length;
              b++
            ) {
              var Q = P[b];
              ((Q.element.scrollLeft = Q.left), (Q.element.scrollTop = Q.top));
            }
          }
          ((yi = !!eu), (tu = eu = null));
        } finally {
          ((ke = o), (K.p = a), (_.T = s));
        }
      }
      ((e.current = t), (dt = 2));
    }
  }
  function Vm() {
    if (dt === 2) {
      dt = 0;
      var e = os,
        t = ka,
        s = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || s) {
        ((s = _.T), (_.T = null));
        var a = K.p;
        K.p = 2;
        var o = ke;
        ke |= 4;
        try {
          Nm(e, t.alternate, t);
        } finally {
          ((ke = o), (K.p = a), (_.T = s));
        }
      }
      dt = 3;
    }
  }
  function Km() {
    if (dt === 4 || dt === 3) {
      ((dt = 0), Rv());
      var e = os,
        t = ka,
        s = Da,
        a = km;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (dt = 5)
        : ((dt = 0), (ka = os = null), Xm(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (
        (o === 0 && (is = null),
        lo(s),
        (t = t.stateNode),
        Et && typeof Et.onCommitFiberRoot == "function")
      )
        try {
          Et.onCommitFiberRoot($a, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = _.T), (o = K.p), (K.p = 2), (_.T = null));
        try {
          for (var u = e.onRecoverableError, g = 0; g < a.length; g++) {
            var b = a[g];
            u(b.value, { componentStack: b.stack });
          }
        } finally {
          ((_.T = t), (K.p = o));
        }
      }
      ((Da & 3) !== 0 && li(),
        mn(e),
        (o = e.pendingLanes),
        (s & 4194090) !== 0 && (o & 42) !== 0
          ? e === Bc
            ? Dr++
            : ((Dr = 0), (Bc = e))
          : (Dr = 0),
        zr(0));
    }
  }
  function Xm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), mr(t)));
  }
  function li(e) {
    return (Ym(), Vm(), Km(), Fm());
  }
  function Fm() {
    if (dt !== 5) return !1;
    var e = os,
      t = qc;
    qc = 0;
    var s = lo(Da),
      a = _.T,
      o = K.p;
    try {
      ((K.p = 32 > s ? 32 : s), (_.T = null), (s = Hc), (Hc = null));
      var u = os,
        g = Da;
      if (((dt = 0), (ka = os = null), (Da = 0), (ke & 6) !== 0))
        throw Error(c(331));
      var b = ke;
      if (
        ((ke |= 4),
        Mm(u.current),
        Rm(u, u.current, g, s),
        (ke = b),
        zr(0, !1),
        Et && typeof Et.onPostCommitFiberRoot == "function")
      )
        try {
          Et.onPostCommitFiberRoot($a, u);
        } catch {}
      return !0;
    } finally {
      ((K.p = o), (_.T = a), Xm(e, t));
    }
  }
  function Zm(e, t, s) {
    ((t = Vt(s, t)),
      (t = yc(e.stateNode, t, 2)),
      (e = In(e, t, 2)),
      e !== null && (Ia(e, 2), mn(e)));
  }
  function Be(e, t, s) {
    if (e.tag === 3) Zm(e, e, s);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Zm(t, e, s);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (is === null || !is.has(a)))
          ) {
            ((e = Vt(s, e)),
              (s = Wh(2)),
              (a = In(t, s, 2)),
              a !== null && (em(s, a, t, e), Ia(a, 2), mn(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Yc(e, t, s) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new t0();
      var o = new Set();
      a.set(t, o);
    } else ((o = a.get(t)), o === void 0 && ((o = new Set()), a.set(t, o)));
    o.has(s) ||
      ((Dc = !0), o.add(s), (e = l0.bind(null, e, t, s)), t.then(e, e));
  }
  function l0(e, t, s) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & s),
      (e.warmLanes &= ~s),
      Ge === e &&
        (Te & s) === s &&
        (Ke === 4 || (Ke === 3 && (Te & 62914560) === Te && 300 > cn() - Uc)
          ? (ke & 2) === 0 && za(e, 0)
          : (zc |= s),
        _a === Te && (_a = 0)),
      mn(e));
  }
  function $m(e, t) {
    (t === 0 && (t = Vd()), (e = ga(e, t)), e !== null && (Ia(e, t), mn(e)));
  }
  function i0(e) {
    var t = e.memoizedState,
      s = 0;
    (t !== null && (s = t.retryLane), $m(e, s));
  }
  function o0(e, t) {
    var s = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          o = e.memoizedState;
        o !== null && (s = o.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    (a !== null && a.delete(t), $m(e, s));
  }
  function c0(e, t) {
    return Qt(e, t);
  }
  var ii = null,
    Ua = null,
    Vc = !1,
    oi = !1,
    Kc = !1,
    Ys = 0;
  function mn(e) {
    (e !== Ua &&
      e.next === null &&
      (Ua === null ? (ii = Ua = e) : (Ua = Ua.next = e)),
      (oi = !0),
      Vc || ((Vc = !0), d0()));
  }
  function zr(e, t) {
    if (!Kc && oi) {
      Kc = !0;
      do
        for (var s = !1, a = ii; a !== null; ) {
          if (e !== 0) {
            var o = a.pendingLanes;
            if (o === 0) var u = 0;
            else {
              var g = a.suspendedLanes,
                b = a.pingedLanes;
              ((u = (1 << (31 - Tt(42 | e) + 1)) - 1),
                (u &= o & ~(g & ~b)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((s = !0), ep(a, u));
          } else
            ((u = Te),
              (u = ml(
                a,
                a === Ge ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (u & 3) === 0 || Ja(a, u) || ((s = !0), ep(a, u)));
          a = a.next;
        }
      while (s);
      Kc = !1;
    }
  }
  function u0() {
    Jm();
  }
  function Jm() {
    oi = Vc = !1;
    var e = 0;
    Ys !== 0 && (v0() && (e = Ys), (Ys = 0));
    for (var t = cn(), s = null, a = ii; a !== null; ) {
      var o = a.next,
        u = Im(a, t);
      (u === 0
        ? ((a.next = null),
          s === null ? (ii = o) : (s.next = o),
          o === null && (Ua = s))
        : ((s = a), (e !== 0 || (u & 3) !== 0) && (oi = !0)),
        (a = o));
    }
    zr(e);
  }
  function Im(e, t) {
    for (
      var s = e.suspendedLanes,
        a = e.pingedLanes,
        o = e.expirationTimes,
        u = e.pendingLanes & -62914561;
      0 < u;
    ) {
      var g = 31 - Tt(u),
        b = 1 << g,
        E = o[g];
      (E === -1
        ? ((b & s) === 0 || (b & a) !== 0) && (o[g] = Lv(b, t))
        : E <= t && (e.expiredLanes |= b),
        (u &= ~b));
    }
    if (
      ((t = Ge),
      (s = Te),
      (s = ml(
        e,
        e === t ? s : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (a = e.callbackNode),
      s === 0 ||
        (e === t && (De === 2 || De === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && Vn(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((s & 3) === 0 || Ja(e, s)) {
      if (((t = s & -s), t === e.callbackPriority)) return t;
      switch ((a !== null && Vn(a), lo(s))) {
        case 2:
        case 8:
          s = Qd;
          break;
        case 32:
          s = dl;
          break;
        case 268435456:
          s = Pd;
          break;
        default:
          s = dl;
      }
      return (
        (a = Wm.bind(null, e)),
        (s = Qt(s, a)),
        (e.callbackPriority = t),
        (e.callbackNode = s),
        t
      );
    }
    return (
      a !== null && a !== null && Vn(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Wm(e, t) {
    if (dt !== 0 && dt !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var s = e.callbackNode;
    if (li() && e.callbackNode !== s) return null;
    var a = Te;
    return (
      (a = ml(
        e,
        e === Ge ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (zm(e, a, t),
          Im(e, cn()),
          e.callbackNode != null && e.callbackNode === s
            ? Wm.bind(null, e)
            : null)
    );
  }
  function ep(e, t) {
    if (li()) return null;
    zm(e, t, !0);
  }
  function d0() {
    j0(function () {
      (ke & 6) !== 0 ? Qt(Gd, u0) : Jm();
    });
  }
  function Xc() {
    return (Ys === 0 && (Ys = Yd()), Ys);
  }
  function tp(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : vl("" + e);
  }
  function np(e, t) {
    var s = t.ownerDocument.createElement("input");
    return (
      (s.name = t.name),
      (s.value = t.value),
      e.id && s.setAttribute("form", e.id),
      t.parentNode.insertBefore(s, t),
      (e = new FormData(e)),
      s.parentNode.removeChild(s),
      e
    );
  }
  function f0(e, t, s, a, o) {
    if (t === "submit" && s && s.stateNode === o) {
      var u = tp((o[vt] || null).action),
        g = a.submitter;
      g &&
        ((t = (t = g[vt] || null)
          ? tp(t.formAction)
          : g.getAttribute("formAction")),
        t !== null && ((u = t), (g = null)));
      var b = new wl("action", "action", null, a, o);
      e.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Ys !== 0) {
                  var E = g ? np(o, g) : new FormData(o);
                  hc(
                    s,
                    { pending: !0, data: E, method: o.method, action: u },
                    null,
                    E,
                  );
                }
              } else
                typeof u == "function" &&
                  (b.preventDefault(),
                  (E = g ? np(o, g) : new FormData(o)),
                  hc(
                    s,
                    { pending: !0, data: E, method: o.method, action: u },
                    u,
                    E,
                  ));
            },
            currentTarget: o,
          },
        ],
      });
    }
  }
  for (var Fc = 0; Fc < _o.length; Fc++) {
    var Zc = _o[Fc],
      h0 = Zc.toLowerCase(),
      m0 = Zc[0].toUpperCase() + Zc.slice(1);
    tn(h0, "on" + m0);
  }
  (tn(zf, "onAnimationEnd"),
    tn(Lf, "onAnimationIteration"),
    tn(Uf, "onAnimationStart"),
    tn("dblclick", "onDoubleClick"),
    tn("focusin", "onFocus"),
    tn("focusout", "onBlur"),
    tn(Mb, "onTransitionRun"),
    tn(_b, "onTransitionStart"),
    tn(kb, "onTransitionCancel"),
    tn(qf, "onTransitionEnd"),
    ia("onMouseEnter", ["mouseout", "mouseover"]),
    ia("onMouseLeave", ["mouseout", "mouseover"]),
    ia("onPointerEnter", ["pointerout", "pointerover"]),
    ia("onPointerLeave", ["pointerout", "pointerover"]),
    Rs(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Rs(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Rs("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Rs(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Rs(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Rs(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var Lr =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    p0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Lr),
    );
  function sp(e, t) {
    t = (t & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var a = e[s],
        o = a.event;
      a = a.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var g = a.length - 1; 0 <= g; g--) {
            var b = a[g],
              E = b.instance,
              D = b.currentTarget;
            if (((b = b.listener), E !== u && o.isPropagationStopped()))
              break e;
            ((u = b), (o.currentTarget = D));
            try {
              u(o);
            } catch (B) {
              Zl(B);
            }
            ((o.currentTarget = null), (u = E));
          }
        else
          for (g = 0; g < a.length; g++) {
            if (
              ((b = a[g]),
              (E = b.instance),
              (D = b.currentTarget),
              (b = b.listener),
              E !== u && o.isPropagationStopped())
            )
              break e;
            ((u = b), (o.currentTarget = D));
            try {
              u(o);
            } catch (B) {
              Zl(B);
            }
            ((o.currentTarget = null), (u = E));
          }
      }
    }
  }
  function we(e, t) {
    var s = t[io];
    s === void 0 && (s = t[io] = new Set());
    var a = e + "__bubble";
    s.has(a) || (ap(t, e, 2, !1), s.add(a));
  }
  function $c(e, t, s) {
    var a = 0;
    (t && (a |= 4), ap(s, e, a, t));
  }
  var ci = "_reactListening" + Math.random().toString(36).slice(2);
  function Jc(e) {
    if (!e[ci]) {
      ((e[ci] = !0),
        $d.forEach(function (s) {
          s !== "selectionchange" && (p0.has(s) || $c(s, !1, e), $c(s, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ci] || ((t[ci] = !0), $c("selectionchange", !1, t));
    }
  }
  function ap(e, t, s, a) {
    switch (Rp(t)) {
      case 2:
        var o = Q0;
        break;
      case 8:
        o = P0;
        break;
      default:
        o = du;
    }
    ((s = o.bind(null, t, s, e)),
      (o = void 0),
      !vo ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (o = !0),
      a
        ? o !== void 0
          ? e.addEventListener(t, s, { capture: !0, passive: o })
          : e.addEventListener(t, s, !0)
        : o !== void 0
          ? e.addEventListener(t, s, { passive: o })
          : e.addEventListener(t, s, !1));
  }
  function Ic(e, t, s, a, o) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var g = a.tag;
        if (g === 3 || g === 4) {
          var b = a.stateNode.containerInfo;
          if (b === o) break;
          if (g === 4)
            for (g = a.return; g !== null; ) {
              var E = g.tag;
              if ((E === 3 || E === 4) && g.stateNode.containerInfo === o)
                return;
              g = g.return;
            }
          for (; b !== null; ) {
            if (((g = aa(b)), g === null)) return;
            if (((E = g.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              a = u = g;
              continue e;
            }
            b = b.parentNode;
          }
        }
        a = a.return;
      }
    df(function () {
      var D = u,
        B = go(s),
        P = [];
      e: {
        var L = Hf.get(e);
        if (L !== void 0) {
          var q = wl,
            fe = e;
          switch (e) {
            case "keypress":
              if (jl(s) === 0) break e;
            case "keydown":
            case "keyup":
              q = cb;
              break;
            case "focusin":
              ((fe = "focus"), (q = wo));
              break;
            case "focusout":
              ((fe = "blur"), (q = wo));
              break;
            case "beforeblur":
            case "afterblur":
              q = wo;
              break;
            case "click":
              if (s.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = mf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = Jv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = fb;
              break;
            case zf:
            case Lf:
            case Uf:
              q = eb;
              break;
            case qf:
              q = mb;
              break;
            case "scroll":
            case "scrollend":
              q = Zv;
              break;
            case "wheel":
              q = xb;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = nb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = xf;
              break;
            case "toggle":
            case "beforetoggle":
              q = yb;
          }
          var ie = (t & 4) !== 0,
            qe = !ie && (e === "scroll" || e === "scrollend"),
            M = ie ? (L !== null ? L + "Capture" : null) : L;
          ie = [];
          for (var O = D, k; O !== null; ) {
            var Q = O;
            if (
              ((k = Q.stateNode),
              (Q = Q.tag),
              (Q !== 5 && Q !== 26 && Q !== 27) ||
                k === null ||
                M === null ||
                ((Q = tr(O, M)), Q != null && ie.push(Ur(O, Q, k))),
              qe)
            )
              break;
            O = O.return;
          }
          0 < ie.length &&
            ((L = new q(L, fe, null, s, B)),
            P.push({ event: L, listeners: ie }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((L = e === "mouseover" || e === "pointerover"),
            (q = e === "mouseout" || e === "pointerout"),
            L &&
              s !== xo &&
              (fe = s.relatedTarget || s.fromElement) &&
              (aa(fe) || fe[sa]))
          )
            break e;
          if (
            (q || L) &&
            ((L =
              B.window === B
                ? B
                : (L = B.ownerDocument)
                  ? L.defaultView || L.parentWindow
                  : window),
            q
              ? ((fe = s.relatedTarget || s.toElement),
                (q = D),
                (fe = fe ? aa(fe) : null),
                fe !== null &&
                  ((qe = f(fe)),
                  (ie = fe.tag),
                  fe !== qe || (ie !== 5 && ie !== 27 && ie !== 6)) &&
                  (fe = null))
              : ((q = null), (fe = D)),
            q !== fe)
          ) {
            if (
              ((ie = mf),
              (Q = "onMouseLeave"),
              (M = "onMouseEnter"),
              (O = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ie = xf),
                (Q = "onPointerLeave"),
                (M = "onPointerEnter"),
                (O = "pointer")),
              (qe = q == null ? L : er(q)),
              (k = fe == null ? L : er(fe)),
              (L = new ie(Q, O + "leave", q, s, B)),
              (L.target = qe),
              (L.relatedTarget = k),
              (Q = null),
              aa(B) === D &&
                ((ie = new ie(M, O + "enter", fe, s, B)),
                (ie.target = k),
                (ie.relatedTarget = qe),
                (Q = ie)),
              (qe = Q),
              q && fe)
            )
              t: {
                for (ie = q, M = fe, O = 0, k = ie; k; k = qa(k)) O++;
                for (k = 0, Q = M; Q; Q = qa(Q)) k++;
                for (; 0 < O - k; ) ((ie = qa(ie)), O--);
                for (; 0 < k - O; ) ((M = qa(M)), k--);
                for (; O--; ) {
                  if (ie === M || (M !== null && ie === M.alternate)) break t;
                  ((ie = qa(ie)), (M = qa(M)));
                }
                ie = null;
              }
            else ie = null;
            (q !== null && rp(P, L, q, ie, !1),
              fe !== null && qe !== null && rp(P, qe, fe, ie, !0));
          }
        }
        e: {
          if (
            ((L = D ? er(D) : window),
            (q = L.nodeName && L.nodeName.toLowerCase()),
            q === "select" || (q === "input" && L.type === "file"))
          )
            var W = Sf;
          else if (Nf(L))
            if (Ef) W = Rb;
            else {
              W = Tb;
              var je = Eb;
            }
          else
            ((q = L.nodeName),
              !q ||
              q.toLowerCase() !== "input" ||
              (L.type !== "checkbox" && L.type !== "radio")
                ? D && po(D.elementType) && (W = Sf)
                : (W = Ab));
          if (W && (W = W(e, D))) {
            wf(P, W, s, B);
            break e;
          }
          (je && je(e, L, D),
            e === "focusout" &&
              D &&
              L.type === "number" &&
              D.memoizedProps.value != null &&
              mo(L, "number", L.value));
        }
        switch (((je = D ? er(D) : window), e)) {
          case "focusin":
            (Nf(je) || je.contentEditable === "true") &&
              ((ma = je), (Co = D), (cr = null));
            break;
          case "focusout":
            cr = Co = ma = null;
            break;
          case "mousedown":
            Oo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Oo = !1), kf(P, s, B));
            break;
          case "selectionchange":
            if (Ob) break;
          case "keydown":
          case "keyup":
            kf(P, s, B);
        }
        var ae;
        if (Eo)
          e: {
            switch (e) {
              case "compositionstart":
                var ce = "onCompositionStart";
                break e;
              case "compositionend":
                ce = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ce = "onCompositionUpdate";
                break e;
            }
            ce = void 0;
          }
        else
          ha
            ? bf(e, s) && (ce = "onCompositionEnd")
            : e === "keydown" &&
              s.keyCode === 229 &&
              (ce = "onCompositionStart");
        (ce &&
          (gf &&
            s.locale !== "ko" &&
            (ha || ce !== "onCompositionStart"
              ? ce === "onCompositionEnd" && ha && (ae = ff())
              : ((Fn = B),
                (bo = "value" in Fn ? Fn.value : Fn.textContent),
                (ha = !0))),
          (je = ui(D, ce)),
          0 < je.length &&
            ((ce = new pf(ce, e, null, s, B)),
            P.push({ event: ce, listeners: je }),
            ae
              ? (ce.data = ae)
              : ((ae = jf(s)), ae !== null && (ce.data = ae)))),
          (ae = bb ? jb(e, s) : Nb(e, s)) &&
            ((ce = ui(D, "onBeforeInput")),
            0 < ce.length &&
              ((je = new pf("onBeforeInput", "beforeinput", null, s, B)),
              P.push({ event: je, listeners: ce }),
              (je.data = ae))),
          f0(P, e, D, s, B));
      }
      sp(P, t);
    });
  }
  function Ur(e, t, s) {
    return { instance: e, listener: t, currentTarget: s };
  }
  function ui(e, t) {
    for (var s = t + "Capture", a = []; e !== null; ) {
      var o = e,
        u = o.stateNode;
      if (
        ((o = o.tag),
        (o !== 5 && o !== 26 && o !== 27) ||
          u === null ||
          ((o = tr(e, s)),
          o != null && a.unshift(Ur(e, o, u)),
          (o = tr(e, t)),
          o != null && a.push(Ur(e, o, u))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function qa(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function rp(e, t, s, a, o) {
    for (var u = t._reactName, g = []; s !== null && s !== a; ) {
      var b = s,
        E = b.alternate,
        D = b.stateNode;
      if (((b = b.tag), E !== null && E === a)) break;
      ((b !== 5 && b !== 26 && b !== 27) ||
        D === null ||
        ((E = D),
        o
          ? ((D = tr(s, u)), D != null && g.unshift(Ur(s, D, E)))
          : o || ((D = tr(s, u)), D != null && g.push(Ur(s, D, E)))),
        (s = s.return));
    }
    g.length !== 0 && e.push({ event: t, listeners: g });
  }
  var x0 = /\r\n?/g,
    g0 = /\u0000|\uFFFD/g;
  function lp(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        x0,
        `
`,
      )
      .replace(g0, "");
  }
  function ip(e, t) {
    return ((t = lp(t)), lp(e) === t);
  }
  function di() {}
  function Ue(e, t, s, a, o, u) {
    switch (s) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || ua(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            ua(e, "" + a);
        break;
      case "className":
        xl(e, "class", a);
        break;
      case "tabIndex":
        xl(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        xl(e, s, a);
        break;
      case "style":
        cf(e, a, u);
        break;
      case "data":
        if (t !== "object") {
          xl(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || s !== "href")) {
          e.removeAttribute(s);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(s);
          break;
        }
        ((a = vl("" + a)), e.setAttribute(s, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            s,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof u == "function" &&
            (s === "formAction"
              ? (t !== "input" && Ue(e, t, "name", o.name, o, null),
                Ue(e, t, "formEncType", o.formEncType, o, null),
                Ue(e, t, "formMethod", o.formMethod, o, null),
                Ue(e, t, "formTarget", o.formTarget, o, null))
              : (Ue(e, t, "encType", o.encType, o, null),
                Ue(e, t, "method", o.method, o, null),
                Ue(e, t, "target", o.target, o, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(s);
          break;
        }
        ((a = vl("" + a)), e.setAttribute(s, a));
        break;
      case "onClick":
        a != null && (e.onclick = di);
        break;
      case "onScroll":
        a != null && we("scroll", e);
        break;
      case "onScrollEnd":
        a != null && we("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(c(61));
          if (((s = a.__html), s != null)) {
            if (o.children != null) throw Error(c(60));
            e.innerHTML = s;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((s = vl("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", s));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(s, "" + a)
          : e.removeAttribute(s);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(s, "")
          : e.removeAttribute(s);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(s, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? e.setAttribute(s, a)
            : e.removeAttribute(s);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(s, a)
          : e.removeAttribute(s);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(s)
          : e.setAttribute(s, a);
        break;
      case "popover":
        (we("beforetoggle", e), we("toggle", e), pl(e, "popover", a));
        break;
      case "xlinkActuate":
        jn(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        jn(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        jn(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        jn(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        jn(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        jn(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        jn(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        jn(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        jn(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        pl(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < s.length) ||
          (s[0] !== "o" && s[0] !== "O") ||
          (s[1] !== "n" && s[1] !== "N")) &&
          ((s = Xv.get(s) || s), pl(e, s, a));
    }
  }
  function Wc(e, t, s, a, o, u) {
    switch (s) {
      case "style":
        cf(e, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(c(61));
          if (((s = a.__html), s != null)) {
            if (o.children != null) throw Error(c(60));
            e.innerHTML = s;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? ua(e, a)
          : (typeof a == "number" || typeof a == "bigint") && ua(e, "" + a);
        break;
      case "onScroll":
        a != null && we("scroll", e);
        break;
      case "onScrollEnd":
        a != null && we("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = di);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Jd.hasOwnProperty(s))
          e: {
            if (
              s[0] === "o" &&
              s[1] === "n" &&
              ((o = s.endsWith("Capture")),
              (t = s.slice(2, o ? s.length - 7 : void 0)),
              (u = e[vt] || null),
              (u = u != null ? u[s] : null),
              typeof u == "function" && e.removeEventListener(t, u, o),
              typeof a == "function")
            ) {
              (typeof u != "function" &&
                u !== null &&
                (s in e
                  ? (e[s] = null)
                  : e.hasAttribute(s) && e.removeAttribute(s)),
                e.addEventListener(t, a, o));
              break e;
            }
            s in e
              ? (e[s] = a)
              : a === !0
                ? e.setAttribute(s, "")
                : pl(e, s, a);
          }
    }
  }
  function ft(e, t, s) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (we("error", e), we("load", e));
        var a = !1,
          o = !1,
          u;
        for (u in s)
          if (s.hasOwnProperty(u)) {
            var g = s[u];
            if (g != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  o = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  Ue(e, t, u, g, s, null);
              }
          }
        (o && Ue(e, t, "srcSet", s.srcSet, s, null),
          a && Ue(e, t, "src", s.src, s, null));
        return;
      case "input":
        we("invalid", e);
        var b = (u = g = o = null),
          E = null,
          D = null;
        for (a in s)
          if (s.hasOwnProperty(a)) {
            var B = s[a];
            if (B != null)
              switch (a) {
                case "name":
                  o = B;
                  break;
                case "type":
                  g = B;
                  break;
                case "checked":
                  E = B;
                  break;
                case "defaultChecked":
                  D = B;
                  break;
                case "value":
                  u = B;
                  break;
                case "defaultValue":
                  b = B;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null) throw Error(c(137, t));
                  break;
                default:
                  Ue(e, t, a, B, s, null);
              }
          }
        (af(e, u, b, E, D, g, o, !1), gl(e));
        return;
      case "select":
        (we("invalid", e), (a = g = u = null));
        for (o in s)
          if (s.hasOwnProperty(o) && ((b = s[o]), b != null))
            switch (o) {
              case "value":
                u = b;
                break;
              case "defaultValue":
                g = b;
                break;
              case "multiple":
                a = b;
              default:
                Ue(e, t, o, b, s, null);
            }
        ((t = u),
          (s = g),
          (e.multiple = !!a),
          t != null ? ca(e, !!a, t, !1) : s != null && ca(e, !!a, s, !0));
        return;
      case "textarea":
        (we("invalid", e), (u = o = a = null));
        for (g in s)
          if (s.hasOwnProperty(g) && ((b = s[g]), b != null))
            switch (g) {
              case "value":
                a = b;
                break;
              case "defaultValue":
                o = b;
                break;
              case "children":
                u = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(c(91));
                break;
              default:
                Ue(e, t, g, b, s, null);
            }
        (lf(e, a, o, u), gl(e));
        return;
      case "option":
        for (E in s)
          s.hasOwnProperty(E) &&
            ((a = s[E]), a != null) &&
            (E === "selected"
              ? (e.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : Ue(e, t, E, a, s, null));
        return;
      case "dialog":
        (we("beforetoggle", e),
          we("toggle", e),
          we("cancel", e),
          we("close", e));
        break;
      case "iframe":
      case "object":
        we("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Lr.length; a++) we(Lr[a], e);
        break;
      case "image":
        (we("error", e), we("load", e));
        break;
      case "details":
        we("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (we("error", e), we("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (D in s)
          if (s.hasOwnProperty(D) && ((a = s[D]), a != null))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                Ue(e, t, D, a, s, null);
            }
        return;
      default:
        if (po(t)) {
          for (B in s)
            s.hasOwnProperty(B) &&
              ((a = s[B]), a !== void 0 && Wc(e, t, B, a, s, void 0));
          return;
        }
    }
    for (b in s)
      s.hasOwnProperty(b) && ((a = s[b]), a != null && Ue(e, t, b, a, s, null));
  }
  function y0(e, t, s, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var o = null,
          u = null,
          g = null,
          b = null,
          E = null,
          D = null,
          B = null;
        for (q in s) {
          var P = s[q];
          if (s.hasOwnProperty(q) && P != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = P;
              default:
                a.hasOwnProperty(q) || Ue(e, t, q, null, a, P);
            }
        }
        for (var L in a) {
          var q = a[L];
          if (((P = s[L]), a.hasOwnProperty(L) && (q != null || P != null)))
            switch (L) {
              case "type":
                u = q;
                break;
              case "name":
                o = q;
                break;
              case "checked":
                D = q;
                break;
              case "defaultChecked":
                B = q;
                break;
              case "value":
                g = q;
                break;
              case "defaultValue":
                b = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null) throw Error(c(137, t));
                break;
              default:
                q !== P && Ue(e, t, L, q, a, P);
            }
        }
        ho(e, g, b, E, D, B, u, o);
        return;
      case "select":
        q = g = b = L = null;
        for (u in s)
          if (((E = s[u]), s.hasOwnProperty(u) && E != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                q = E;
              default:
                a.hasOwnProperty(u) || Ue(e, t, u, null, a, E);
            }
        for (o in a)
          if (
            ((u = a[o]),
            (E = s[o]),
            a.hasOwnProperty(o) && (u != null || E != null))
          )
            switch (o) {
              case "value":
                L = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "multiple":
                g = u;
              default:
                u !== E && Ue(e, t, o, u, a, E);
            }
        ((t = b),
          (s = g),
          (a = q),
          L != null
            ? ca(e, !!s, L, !1)
            : !!a != !!s &&
              (t != null ? ca(e, !!s, t, !0) : ca(e, !!s, s ? [] : "", !1)));
        return;
      case "textarea":
        q = L = null;
        for (b in s)
          if (
            ((o = s[b]),
            s.hasOwnProperty(b) && o != null && !a.hasOwnProperty(b))
          )
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ue(e, t, b, null, a, o);
            }
        for (g in a)
          if (
            ((o = a[g]),
            (u = s[g]),
            a.hasOwnProperty(g) && (o != null || u != null))
          )
            switch (g) {
              case "value":
                L = o;
                break;
              case "defaultValue":
                q = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(c(91));
                break;
              default:
                o !== u && Ue(e, t, g, o, a, u);
            }
        rf(e, L, q);
        return;
      case "option":
        for (var fe in s)
          ((L = s[fe]),
            s.hasOwnProperty(fe) &&
              L != null &&
              !a.hasOwnProperty(fe) &&
              (fe === "selected"
                ? (e.selected = !1)
                : Ue(e, t, fe, null, a, L)));
        for (E in a)
          ((L = a[E]),
            (q = s[E]),
            a.hasOwnProperty(E) &&
              L !== q &&
              (L != null || q != null) &&
              (E === "selected"
                ? (e.selected =
                    L && typeof L != "function" && typeof L != "symbol")
                : Ue(e, t, E, L, a, q)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var ie in s)
          ((L = s[ie]),
            s.hasOwnProperty(ie) &&
              L != null &&
              !a.hasOwnProperty(ie) &&
              Ue(e, t, ie, null, a, L));
        for (D in a)
          if (
            ((L = a[D]),
            (q = s[D]),
            a.hasOwnProperty(D) && L !== q && (L != null || q != null))
          )
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(c(137, t));
                break;
              default:
                Ue(e, t, D, L, a, q);
            }
        return;
      default:
        if (po(t)) {
          for (var qe in s)
            ((L = s[qe]),
              s.hasOwnProperty(qe) &&
                L !== void 0 &&
                !a.hasOwnProperty(qe) &&
                Wc(e, t, qe, void 0, a, L));
          for (B in a)
            ((L = a[B]),
              (q = s[B]),
              !a.hasOwnProperty(B) ||
                L === q ||
                (L === void 0 && q === void 0) ||
                Wc(e, t, B, L, a, q));
          return;
        }
    }
    for (var M in s)
      ((L = s[M]),
        s.hasOwnProperty(M) &&
          L != null &&
          !a.hasOwnProperty(M) &&
          Ue(e, t, M, null, a, L));
    for (P in a)
      ((L = a[P]),
        (q = s[P]),
        !a.hasOwnProperty(P) ||
          L === q ||
          (L == null && q == null) ||
          Ue(e, t, P, L, a, q));
  }
  var eu = null,
    tu = null;
  function fi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function op(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function cp(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function nu(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var su = null;
  function v0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === su
        ? !1
        : ((su = e), !0)
      : ((su = null), !1);
  }
  var up = typeof setTimeout == "function" ? setTimeout : void 0,
    b0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    dp = typeof Promise == "function" ? Promise : void 0,
    j0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof dp < "u"
          ? function (e) {
              return dp.resolve(null).then(e).catch(N0);
            }
          : up;
  function N0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function us(e) {
    return e === "head";
  }
  function fp(e, t) {
    var s = t,
      a = 0,
      o = 0;
    do {
      var u = s.nextSibling;
      if ((e.removeChild(s), u && u.nodeType === 8))
        if (((s = u.data), s === "/$")) {
          if (0 < a && 8 > a) {
            s = a;
            var g = e.ownerDocument;
            if ((s & 1 && qr(g.documentElement), s & 2 && qr(g.body), s & 4))
              for (s = g.head, qr(s), g = s.firstChild; g; ) {
                var b = g.nextSibling,
                  E = g.nodeName;
                (g[Wa] ||
                  E === "SCRIPT" ||
                  E === "STYLE" ||
                  (E === "LINK" && g.rel.toLowerCase() === "stylesheet") ||
                  s.removeChild(g),
                  (g = b));
              }
          }
          if (o === 0) {
            (e.removeChild(u), Kr(t));
            return;
          }
          o--;
        } else
          s === "$" || s === "$?" || s === "$!"
            ? o++
            : (a = s.charCodeAt(0) - 48);
      else a = 0;
      s = u;
    } while (s);
    Kr(t);
  }
  function au(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var s = t;
      switch (((t = t.nextSibling), s.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (au(s), oo(s));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (s.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(s);
    }
  }
  function w0(e, t, s, a) {
    for (; e.nodeType === 1; ) {
      var o = s;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Wa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((u = e.getAttribute("rel")),
                u === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== o.rel ||
                e.getAttribute("href") !==
                  (o.href == null || o.href === "" ? null : o.href) ||
                e.getAttribute("crossorigin") !==
                  (o.crossOrigin == null ? null : o.crossOrigin) ||
                e.getAttribute("title") !== (o.title == null ? null : o.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((u = e.getAttribute("src")),
                (u !== (o.src == null ? null : o.src) ||
                  e.getAttribute("type") !== (o.type == null ? null : o.type) ||
                  e.getAttribute("crossorigin") !==
                    (o.crossOrigin == null ? null : o.crossOrigin)) &&
                  u &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === u) return e;
      } else return e;
      if (((e = sn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function S0(e, t, s) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !s) ||
        ((e = sn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function ru(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function E0(e, t) {
    var s = e.ownerDocument;
    if (e.data !== "$?" || s.readyState === "complete") t();
    else {
      var a = function () {
        (t(), s.removeEventListener("DOMContentLoaded", a));
      };
      (s.addEventListener("DOMContentLoaded", a), (e._reactRetry = a));
    }
  }
  function sn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var lu = null;
  function hp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var s = e.data;
        if (s === "$" || s === "$!" || s === "$?") {
          if (t === 0) return e;
          t--;
        } else s === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function mp(e, t, s) {
    switch (((t = fi(s)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(c(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(c(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function qr(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    oo(e);
  }
  var Jt = new Map(),
    pp = new Set();
  function hi(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var zn = K.d;
  K.d = { f: T0, r: A0, D: R0, C: C0, L: O0, m: M0, X: k0, S: _0, M: D0 };
  function T0() {
    var e = zn.f(),
      t = ai();
    return e || t;
  }
  function A0(e) {
    var t = ra(e);
    t !== null && t.tag === 5 && t.type === "form" ? zh(t) : zn.r(e);
  }
  var Ha = typeof document > "u" ? null : document;
  function xp(e, t, s) {
    var a = Ha;
    if (a && typeof t == "string" && t) {
      var o = Yt(t);
      ((o = 'link[rel="' + e + '"][href="' + o + '"]'),
        typeof s == "string" && (o += '[crossorigin="' + s + '"]'),
        pp.has(o) ||
          (pp.add(o),
          (e = { rel: e, crossOrigin: s, href: t }),
          a.querySelector(o) === null &&
            ((t = a.createElement("link")),
            ft(t, "link", e),
            rt(t),
            a.head.appendChild(t))));
    }
  }
  function R0(e) {
    (zn.D(e), xp("dns-prefetch", e, null));
  }
  function C0(e, t) {
    (zn.C(e, t), xp("preconnect", e, t));
  }
  function O0(e, t, s) {
    zn.L(e, t, s);
    var a = Ha;
    if (a && e && t) {
      var o = 'link[rel="preload"][as="' + Yt(t) + '"]';
      t === "image" && s && s.imageSrcSet
        ? ((o += '[imagesrcset="' + Yt(s.imageSrcSet) + '"]'),
          typeof s.imageSizes == "string" &&
            (o += '[imagesizes="' + Yt(s.imageSizes) + '"]'))
        : (o += '[href="' + Yt(e) + '"]');
      var u = o;
      switch (t) {
        case "style":
          u = Ba(e);
          break;
        case "script":
          u = Ga(e);
      }
      Jt.has(u) ||
        ((e = v(
          {
            rel: "preload",
            href: t === "image" && s && s.imageSrcSet ? void 0 : e,
            as: t,
          },
          s,
        )),
        Jt.set(u, e),
        a.querySelector(o) !== null ||
          (t === "style" && a.querySelector(Hr(u))) ||
          (t === "script" && a.querySelector(Br(u))) ||
          ((t = a.createElement("link")),
          ft(t, "link", e),
          rt(t),
          a.head.appendChild(t)));
    }
  }
  function M0(e, t) {
    zn.m(e, t);
    var s = Ha;
    if (s && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        o =
          'link[rel="modulepreload"][as="' + Yt(a) + '"][href="' + Yt(e) + '"]',
        u = o;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ga(e);
      }
      if (
        !Jt.has(u) &&
        ((e = v({ rel: "modulepreload", href: e }, t)),
        Jt.set(u, e),
        s.querySelector(o) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (s.querySelector(Br(u))) return;
        }
        ((a = s.createElement("link")),
          ft(a, "link", e),
          rt(a),
          s.head.appendChild(a));
      }
    }
  }
  function _0(e, t, s) {
    zn.S(e, t, s);
    var a = Ha;
    if (a && e) {
      var o = la(a).hoistableStyles,
        u = Ba(e);
      t = t || "default";
      var g = o.get(u);
      if (!g) {
        var b = { loading: 0, preload: null };
        if ((g = a.querySelector(Hr(u)))) b.loading = 5;
        else {
          ((e = v({ rel: "stylesheet", href: e, "data-precedence": t }, s)),
            (s = Jt.get(u)) && iu(e, s));
          var E = (g = a.createElement("link"));
          (rt(E),
            ft(E, "link", e),
            (E._p = new Promise(function (D, B) {
              ((E.onload = D), (E.onerror = B));
            })),
            E.addEventListener("load", function () {
              b.loading |= 1;
            }),
            E.addEventListener("error", function () {
              b.loading |= 2;
            }),
            (b.loading |= 4),
            mi(g, t, a));
        }
        ((g = { type: "stylesheet", instance: g, count: 1, state: b }),
          o.set(u, g));
      }
    }
  }
  function k0(e, t) {
    zn.X(e, t);
    var s = Ha;
    if (s && e) {
      var a = la(s).hoistableScripts,
        o = Ga(e),
        u = a.get(o);
      u ||
        ((u = s.querySelector(Br(o))),
        u ||
          ((e = v({ src: e, async: !0 }, t)),
          (t = Jt.get(o)) && ou(e, t),
          (u = s.createElement("script")),
          rt(u),
          ft(u, "link", e),
          s.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(o, u));
    }
  }
  function D0(e, t) {
    zn.M(e, t);
    var s = Ha;
    if (s && e) {
      var a = la(s).hoistableScripts,
        o = Ga(e),
        u = a.get(o);
      u ||
        ((u = s.querySelector(Br(o))),
        u ||
          ((e = v({ src: e, async: !0, type: "module" }, t)),
          (t = Jt.get(o)) && ou(e, t),
          (u = s.createElement("script")),
          rt(u),
          ft(u, "link", e),
          s.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(o, u));
    }
  }
  function gp(e, t, s, a) {
    var o = (o = ne.current) ? hi(o) : null;
    if (!o) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof s.precedence == "string" && typeof s.href == "string"
          ? ((t = Ba(s.href)),
            (s = la(o).hoistableStyles),
            (a = s.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              s.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          s.rel === "stylesheet" &&
          typeof s.href == "string" &&
          typeof s.precedence == "string"
        ) {
          e = Ba(s.href);
          var u = la(o).hoistableStyles,
            g = u.get(e);
          if (
            (g ||
              ((o = o.ownerDocument || o),
              (g = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(e, g),
              (u = o.querySelector(Hr(e))) &&
                !u._p &&
                ((g.instance = u), (g.state.loading = 5)),
              Jt.has(e) ||
                ((s = {
                  rel: "preload",
                  as: "style",
                  href: s.href,
                  crossOrigin: s.crossOrigin,
                  integrity: s.integrity,
                  media: s.media,
                  hrefLang: s.hrefLang,
                  referrerPolicy: s.referrerPolicy,
                }),
                Jt.set(e, s),
                u || z0(o, e, s, g.state))),
            t && a === null)
          )
            throw Error(c(528, ""));
          return g;
        }
        if (t && a !== null) throw Error(c(529, ""));
        return null;
      case "script":
        return (
          (t = s.async),
          (s = s.src),
          typeof s == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ga(s)),
              (s = la(o).hoistableScripts),
              (a = s.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                s.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(c(444, e));
    }
  }
  function Ba(e) {
    return 'href="' + Yt(e) + '"';
  }
  function Hr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function yp(e) {
    return v({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function z0(e, t, s, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        ft(t, "link", s),
        rt(t),
        e.head.appendChild(t));
  }
  function Ga(e) {
    return '[src="' + Yt(e) + '"]';
  }
  function Br(e) {
    return "script[async]" + e;
  }
  function vp(e, t, s) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + Yt(s.href) + '"]');
          if (a) return ((t.instance = a), rt(a), a);
          var o = v({}, s, {
            "data-href": s.href,
            "data-precedence": s.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            rt(a),
            ft(a, "style", o),
            mi(a, s.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          o = Ba(s.href);
          var u = e.querySelector(Hr(o));
          if (u) return ((t.state.loading |= 4), (t.instance = u), rt(u), u);
          ((a = yp(s)),
            (o = Jt.get(o)) && iu(a, o),
            (u = (e.ownerDocument || e).createElement("link")),
            rt(u));
          var g = u;
          return (
            (g._p = new Promise(function (b, E) {
              ((g.onload = b), (g.onerror = E));
            })),
            ft(u, "link", a),
            (t.state.loading |= 4),
            mi(u, s.precedence, e),
            (t.instance = u)
          );
        case "script":
          return (
            (u = Ga(s.src)),
            (o = e.querySelector(Br(u)))
              ? ((t.instance = o), rt(o), o)
              : ((a = s),
                (o = Jt.get(u)) && ((a = v({}, s)), ou(a, o)),
                (e = e.ownerDocument || e),
                (o = e.createElement("script")),
                rt(o),
                ft(o, "link", a),
                e.head.appendChild(o),
                (t.instance = o))
          );
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), mi(a, s.precedence, e));
    return t.instance;
  }
  function mi(e, t, s) {
    for (
      var a = s.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        o = a.length ? a[a.length - 1] : null,
        u = o,
        g = 0;
      g < a.length;
      g++
    ) {
      var b = a[g];
      if (b.dataset.precedence === t) u = b;
      else if (u !== o) break;
    }
    u
      ? u.parentNode.insertBefore(e, u.nextSibling)
      : ((t = s.nodeType === 9 ? s.head : s), t.insertBefore(e, t.firstChild));
  }
  function iu(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function ou(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var pi = null;
  function bp(e, t, s) {
    if (pi === null) {
      var a = new Map(),
        o = (pi = new Map());
      o.set(s, a);
    } else ((o = pi), (a = o.get(s)), a || ((a = new Map()), o.set(s, a)));
    if (a.has(e)) return a;
    for (
      a.set(e, null), s = s.getElementsByTagName(e), o = 0;
      o < s.length;
      o++
    ) {
      var u = s[o];
      if (
        !(
          u[Wa] ||
          u[mt] ||
          (e === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var g = u.getAttribute(t) || "";
        g = e + g;
        var b = a.get(g);
        b ? b.push(u) : a.set(g, [u]);
      }
    }
    return a;
  }
  function jp(e, t, s) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        s,
        t === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function L0(e, t, s) {
    if (s === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((e = t.disabled), typeof t.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Np(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Gr = null;
  function U0() {}
  function q0(e, t, s) {
    if (Gr === null) throw Error(c(475));
    var a = Gr;
    if (
      t.type === "stylesheet" &&
      (typeof s.media != "string" || matchMedia(s.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var o = Ba(s.href),
          u = e.querySelector(Hr(o));
        if (u) {
          ((e = u._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (a.count++, (a = xi.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = u),
            rt(u));
          return;
        }
        ((u = e.ownerDocument || e),
          (s = yp(s)),
          (o = Jt.get(o)) && iu(s, o),
          (u = u.createElement("link")),
          rt(u));
        var g = u;
        ((g._p = new Promise(function (b, E) {
          ((g.onload = b), (g.onerror = E));
        })),
          ft(u, "link", s),
          (t.instance = u));
      }
      (a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = xi.bind(a)),
          e.addEventListener("load", t),
          e.addEventListener("error", t)));
    }
  }
  function H0() {
    if (Gr === null) throw Error(c(475));
    var e = Gr;
    return (
      e.stylesheets && e.count === 0 && cu(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var s = setTimeout(function () {
              if ((e.stylesheets && cu(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend;
                ((e.unsuspend = null), a());
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                ((e.unsuspend = null), clearTimeout(s));
              }
            );
          }
        : null
    );
  }
  function xi() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) cu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var gi = null;
  function cu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (gi = new Map()),
        t.forEach(B0, e),
        (gi = null),
        xi.call(e)));
  }
  function B0(e, t) {
    if (!(t.state.loading & 4)) {
      var s = gi.get(e);
      if (s) var a = s.get(null);
      else {
        ((s = new Map()), gi.set(e, s));
        for (
          var o = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            u = 0;
          u < o.length;
          u++
        ) {
          var g = o[u];
          (g.nodeName === "LINK" || g.getAttribute("media") !== "not all") &&
            (s.set(g.dataset.precedence, g), (a = g));
        }
        a && s.set(null, a);
      }
      ((o = t.instance),
        (g = o.getAttribute("data-precedence")),
        (u = s.get(g) || a),
        u === a && s.set(null, o),
        s.set(g, o),
        this.count++,
        (a = xi.bind(this)),
        o.addEventListener("load", a),
        o.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(o, u.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(o, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Qr = {
    $$typeof: z,
    Provider: null,
    Consumer: null,
    _currentValue: X,
    _currentValue2: X,
    _threadCount: 0,
  };
  function G0(e, t, s, a, o, u, g, b) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = ao(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ao(0)),
      (this.hiddenUpdates = ao(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = o),
      (this.onCaughtError = u),
      (this.onRecoverableError = g),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = b),
      (this.incompleteTransitions = new Map()));
  }
  function wp(e, t, s, a, o, u, g, b, E, D, B, P) {
    return (
      (e = new G0(e, t, s, g, b, E, D, P)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = Rt(3, null, null, t)),
      (e.current = u),
      (u.stateNode = e),
      (t = Yo()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: s, cache: t }),
      Fo(u),
      e
    );
  }
  function Sp(e) {
    return e ? ((e = ya), e) : ya;
  }
  function Ep(e, t, s, a, o, u) {
    ((o = Sp(o)),
      a.context === null ? (a.context = o) : (a.pendingContext = o),
      (a = Jn(t)),
      (a.payload = { element: s }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (s = In(e, a, t)),
      s !== null && (kt(s, e, t), yr(s, e, t)));
  }
  function Tp(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < t ? s : t;
    }
  }
  function uu(e, t) {
    (Tp(e, t), (e = e.alternate) && Tp(e, t));
  }
  function Ap(e) {
    if (e.tag === 13) {
      var t = ga(e, 67108864);
      (t !== null && kt(t, e, 67108864), uu(e, 67108864));
    }
  }
  var yi = !0;
  function Q0(e, t, s, a) {
    var o = _.T;
    _.T = null;
    var u = K.p;
    try {
      ((K.p = 2), du(e, t, s, a));
    } finally {
      ((K.p = u), (_.T = o));
    }
  }
  function P0(e, t, s, a) {
    var o = _.T;
    _.T = null;
    var u = K.p;
    try {
      ((K.p = 8), du(e, t, s, a));
    } finally {
      ((K.p = u), (_.T = o));
    }
  }
  function du(e, t, s, a) {
    if (yi) {
      var o = fu(a);
      if (o === null) (Ic(e, t, a, vi, s), Cp(e, a));
      else if (V0(o, e, t, s, a)) a.stopPropagation();
      else if ((Cp(e, a), t & 4 && -1 < Y0.indexOf(e))) {
        for (; o !== null; ) {
          var u = ra(o);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var g = As(u.pendingLanes);
                  if (g !== 0) {
                    var b = u;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; g; ) {
                      var E = 1 << (31 - Tt(g));
                      ((b.entanglements[1] |= E), (g &= ~E));
                    }
                    (mn(u), (ke & 6) === 0 && ((ni = cn() + 500), zr(0)));
                  }
                }
                break;
              case 13:
                ((b = ga(u, 2)), b !== null && kt(b, u, 2), ai(), uu(u, 2));
            }
          if (((u = fu(a)), u === null && Ic(e, t, a, vi, s), u === o)) break;
          o = u;
        }
        o !== null && a.stopPropagation();
      } else Ic(e, t, a, null, s);
    }
  }
  function fu(e) {
    return ((e = go(e)), hu(e));
  }
  var vi = null;
  function hu(e) {
    if (((vi = null), (e = aa(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var s = t.tag;
        if (s === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (s === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((vi = e), null);
  }
  function Rp(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Cv()) {
          case Gd:
            return 2;
          case Qd:
            return 8;
          case dl:
          case Ov:
            return 32;
          case Pd:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var mu = !1,
    ds = null,
    fs = null,
    hs = null,
    Pr = new Map(),
    Yr = new Map(),
    ms = [],
    Y0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function Cp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ds = null;
        break;
      case "dragenter":
      case "dragleave":
        fs = null;
        break;
      case "mouseover":
      case "mouseout":
        hs = null;
        break;
      case "pointerover":
      case "pointerout":
        Pr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Yr.delete(t.pointerId);
    }
  }
  function Vr(e, t, s, a, o, u) {
    return e === null || e.nativeEvent !== u
      ? ((e = {
          blockedOn: t,
          domEventName: s,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [o],
        }),
        t !== null && ((t = ra(t)), t !== null && Ap(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        o !== null && t.indexOf(o) === -1 && t.push(o),
        e);
  }
  function V0(e, t, s, a, o) {
    switch (t) {
      case "focusin":
        return ((ds = Vr(ds, e, t, s, a, o)), !0);
      case "dragenter":
        return ((fs = Vr(fs, e, t, s, a, o)), !0);
      case "mouseover":
        return ((hs = Vr(hs, e, t, s, a, o)), !0);
      case "pointerover":
        var u = o.pointerId;
        return (Pr.set(u, Vr(Pr.get(u) || null, e, t, s, a, o)), !0);
      case "gotpointercapture":
        return (
          (u = o.pointerId),
          Yr.set(u, Vr(Yr.get(u) || null, e, t, s, a, o)),
          !0
        );
    }
    return !1;
  }
  function Op(e) {
    var t = aa(e.target);
    if (t !== null) {
      var s = f(t);
      if (s !== null) {
        if (((t = s.tag), t === 13)) {
          if (((t = h(s)), t !== null)) {
            ((e.blockedOn = t),
              qv(e.priority, function () {
                if (s.tag === 13) {
                  var a = _t();
                  a = ro(a);
                  var o = ga(s, a);
                  (o !== null && kt(o, s, a), uu(s, a));
                }
              }));
            return;
          }
        } else if (t === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function bi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var s = fu(e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var a = new s.constructor(s.type, s);
        ((xo = a), s.target.dispatchEvent(a), (xo = null));
      } else return ((t = ra(s)), t !== null && Ap(t), (e.blockedOn = s), !1);
      t.shift();
    }
    return !0;
  }
  function Mp(e, t, s) {
    bi(e) && s.delete(t);
  }
  function K0() {
    ((mu = !1),
      ds !== null && bi(ds) && (ds = null),
      fs !== null && bi(fs) && (fs = null),
      hs !== null && bi(hs) && (hs = null),
      Pr.forEach(Mp),
      Yr.forEach(Mp));
  }
  function ji(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      mu ||
        ((mu = !0),
        n.unstable_scheduleCallback(n.unstable_NormalPriority, K0)));
  }
  var Ni = null;
  function _p(e) {
    Ni !== e &&
      ((Ni = e),
      n.unstable_scheduleCallback(n.unstable_NormalPriority, function () {
        Ni === e && (Ni = null);
        for (var t = 0; t < e.length; t += 3) {
          var s = e[t],
            a = e[t + 1],
            o = e[t + 2];
          if (typeof a != "function") {
            if (hu(a || s) === null) continue;
            break;
          }
          var u = ra(s);
          u !== null &&
            (e.splice(t, 3),
            (t -= 3),
            hc(u, { pending: !0, data: o, method: s.method, action: a }, a, o));
        }
      }));
  }
  function Kr(e) {
    function t(E) {
      return ji(E, e);
    }
    (ds !== null && ji(ds, e),
      fs !== null && ji(fs, e),
      hs !== null && ji(hs, e),
      Pr.forEach(t),
      Yr.forEach(t));
    for (var s = 0; s < ms.length; s++) {
      var a = ms[s];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < ms.length && ((s = ms[0]), s.blockedOn === null); )
      (Op(s), s.blockedOn === null && ms.shift());
    if (((s = (e.ownerDocument || e).$$reactFormReplay), s != null))
      for (a = 0; a < s.length; a += 3) {
        var o = s[a],
          u = s[a + 1],
          g = o[vt] || null;
        if (typeof u == "function") g || _p(s);
        else if (g) {
          var b = null;
          if (u && u.hasAttribute("formAction")) {
            if (((o = u), (g = u[vt] || null))) b = g.formAction;
            else if (hu(o) !== null) continue;
          } else b = g.action;
          (typeof b == "function" ? (s[a + 1] = b) : (s.splice(a, 3), (a -= 3)),
            _p(s));
        }
      }
  }
  function pu(e) {
    this._internalRoot = e;
  }
  ((wi.prototype.render = pu.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(c(409));
      var s = t.current,
        a = _t();
      Ep(s, a, e, t, null, null);
    }),
    (wi.prototype.unmount = pu.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Ep(e.current, 2, null, e, null, null), ai(), (t[sa] = null));
        }
      }));
  function wi(e) {
    this._internalRoot = e;
  }
  wi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Fd();
      e = { blockedOn: null, target: e, priority: t };
      for (var s = 0; s < ms.length && t !== 0 && t < ms[s].priority; s++);
      (ms.splice(s, 0, e), s === 0 && Op(e));
    }
  };
  var kp = r.version;
  if (kp !== "19.1.0") throw Error(c(527, kp, "19.1.0"));
  K.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(c(188))
        : ((e = Object.keys(e).join(",")), Error(c(268, e)));
    return (
      (e = m(t)),
      (e = e !== null ? p(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var X0 = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Si = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Si.isDisabled && Si.supportsFiber)
      try {
        (($a = Si.inject(X0)), (Et = Si));
      } catch {}
  }
  return (
    (Fr.createRoot = function (e, t) {
      if (!d(e)) throw Error(c(299));
      var s = !1,
        a = "",
        o = Zh,
        u = $h,
        g = Jh,
        b = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (s = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (o = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (g = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (b = t.unstable_transitionCallbacks)),
        (t = wp(e, 1, !1, null, null, s, a, o, u, g, b, null)),
        (e[sa] = t.current),
        Jc(e),
        new pu(t)
      );
    }),
    (Fr.hydrateRoot = function (e, t, s) {
      if (!d(e)) throw Error(c(299));
      var a = !1,
        o = "",
        u = Zh,
        g = $h,
        b = Jh,
        E = null,
        D = null;
      return (
        s != null &&
          (s.unstable_strictMode === !0 && (a = !0),
          s.identifierPrefix !== void 0 && (o = s.identifierPrefix),
          s.onUncaughtError !== void 0 && (u = s.onUncaughtError),
          s.onCaughtError !== void 0 && (g = s.onCaughtError),
          s.onRecoverableError !== void 0 && (b = s.onRecoverableError),
          s.unstable_transitionCallbacks !== void 0 &&
            (E = s.unstable_transitionCallbacks),
          s.formState !== void 0 && (D = s.formState)),
        (t = wp(e, 1, !0, t, s ?? null, a, o, u, g, b, E, D)),
        (t.context = Sp(null)),
        (s = t.current),
        (a = _t()),
        (a = ro(a)),
        (o = Jn(a)),
        (o.callback = null),
        In(s, o, a),
        (s = a),
        (t.current.lanes = s),
        Ia(t, s),
        mn(t),
        (e[sa] = t.current),
        Jc(e),
        new wi(t)
      );
    }),
    (Fr.version = "19.1.0"),
    Fr
  );
}
var Pp;
function s1() {
  if (Pp) return gu.exports;
  Pp = 1;
  function n() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (r) {
        console.error(r);
      }
  }
  return (n(), (gu.exports = n1()), gu.exports);
}
var a1 = s1();
function r1(n, r) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var i,
    c,
    d,
    f,
    h = [],
    x = "",
    m = n.split("/");
  for (m[0] || m.shift(); (d = m.shift()); )
    ((i = d[0]),
      i === "*"
        ? (h.push(i), (x += d[1] === "?" ? "(?:/(.*))?" : "/(.*)"))
        : i === ":"
          ? ((c = d.indexOf("?", 1)),
            (f = d.indexOf(".", 1)),
            h.push(d.substring(1, ~c ? c : ~f ? f : d.length)),
            (x += ~c && !~f ? "(?:/([^/]+?))?" : "/([^/]+?)"),
            ~f && (x += (~c ? "?" : "") + "\\" + d.substring(f)))
          : (x += "/" + d));
  return {
    keys: h,
    pattern: new RegExp("^" + x + (r ? "(?=$|/)" : "/?$"), "i"),
  };
}
var j = Yi();
const ys = Qx(j),
  Vi = Z0({ __proto__: null, default: ys }, [j]);
var Nu = { exports: {} },
  wu = {};
var Yp;
function l1() {
  if (Yp) return wu;
  Yp = 1;
  var n = Yi();
  function r(y, N) {
    return (y === N && (y !== 0 || 1 / y === 1 / N)) || (y !== y && N !== N);
  }
  var i = typeof Object.is == "function" ? Object.is : r,
    c = n.useState,
    d = n.useEffect,
    f = n.useLayoutEffect,
    h = n.useDebugValue;
  function x(y, N) {
    var T = N(),
      R = c({ inst: { value: T, getSnapshot: N } }),
      S = R[0].inst,
      C = R[1];
    return (
      f(
        function () {
          ((S.value = T), (S.getSnapshot = N), m(S) && C({ inst: S }));
        },
        [y, T, N],
      ),
      d(
        function () {
          return (
            m(S) && C({ inst: S }),
            y(function () {
              m(S) && C({ inst: S });
            })
          );
        },
        [y],
      ),
      h(T),
      T
    );
  }
  function m(y) {
    var N = y.getSnapshot;
    y = y.value;
    try {
      var T = N();
      return !i(y, T);
    } catch {
      return !0;
    }
  }
  function p(y, N) {
    return N();
  }
  var v =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? p
      : x;
  return (
    (wu.useSyncExternalStore =
      n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : v),
    wu
  );
}
var Vp;
function i1() {
  return (Vp || ((Vp = 1), (Nu.exports = l1())), Nu.exports);
}
var o1 = i1();
const c1 = Vi.useInsertionEffect,
  u1 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  d1 = u1 ? j.useLayoutEffect : j.useEffect,
  f1 = c1 || d1,
  Yx = (n) => {
    const r = j.useRef([n, (...i) => r[0](...i)]).current;
    return (
      f1(() => {
        r[0] = n;
      }),
      r[1]
    );
  },
  h1 = "popstate",
  ad = "pushState",
  rd = "replaceState",
  m1 = "hashchange",
  Kp = [h1, ad, rd, m1],
  p1 = (n) => {
    for (const r of Kp) addEventListener(r, n);
    return () => {
      for (const r of Kp) removeEventListener(r, n);
    };
  },
  Vx = (n, r) => o1.useSyncExternalStore(p1, n, r),
  Xp = () => location.search,
  x1 = ({ ssrSearch: n } = {}) => Vx(Xp, n != null ? () => n : Xp),
  Fp = () => location.pathname,
  g1 = ({ ssrPath: n } = {}) => Vx(Fp, n != null ? () => n : Fp),
  y1 = (n, { replace: r = !1, state: i = null } = {}) =>
    history[r ? rd : ad](i, "", n),
  v1 = (n = {}) => [g1(n), y1],
  Zp = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Zp] > "u") {
  for (const n of [ad, rd]) {
    const r = history[n];
    history[n] = function () {
      const i = r.apply(this, arguments),
        c = new Event(n);
      return ((c.arguments = arguments), dispatchEvent(c), i);
    };
  }
  Object.defineProperty(window, Zp, { value: !0 });
}
const b1 = (n, r) =>
    r.toLowerCase().indexOf(n.toLowerCase())
      ? "~" + r
      : r.slice(n.length) || "/",
  Kx = (n = "") => (n === "/" ? "" : n),
  j1 = (n, r) => (n[0] === "~" ? n.slice(1) : Kx(r) + n),
  N1 = (n = "", r) => b1($p(Kx(n)), $p(r)),
  $p = (n) => {
    try {
      return decodeURI(n);
    } catch {
      return n;
    }
  },
  Xx = {
    hook: v1,
    searchHook: x1,
    parser: r1,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    ssrContext: void 0,
    hrefs: (n) => n,
    aroundNav: (n, r, i) => n(r, i),
  },
  Fx = j.createContext(Xx),
  Va = () => j.useContext(Fx),
  Zx = {},
  $x = j.createContext(Zx),
  w1 = () => j.useContext($x),
  Ki = (n) => {
    const [r, i] = n.hook(n);
    return [N1(n.base, r), Yx((c, d) => n.aroundNav(i, j1(c, n.base), d))];
  },
  Ka = () => Ki(Va()),
  ld = (n, r, i, c) => {
    const { pattern: d, keys: f } =
        r instanceof RegExp ? { keys: !1, pattern: r } : n(r || "*", c),
      h = d.exec(i) || [],
      [x, ...m] = h;
    return x !== void 0
      ? [
          !0,
          (() => {
            const p =
              f !== !1
                ? Object.fromEntries(f.map((y, N) => [y, m[N]]))
                : h.groups;
            let v = { ...m };
            return (p && Object.assign(v, p), v);
          })(),
          ...(c ? [x] : []),
        ]
      : [!1, null];
  },
  id = (n) => ld(Va().parser, n, Ka()[0]),
  Jx = ({ children: n, ...r }) => {
    const i = Va(),
      c = r.hook ? Xx : i;
    let d = c;
    const [f, h = r.ssrSearch ?? ""] = r.ssrPath?.split("?") ?? [];
    (f && ((r.ssrSearch = h), (r.ssrPath = f)),
      (r.hrefs = r.hrefs ?? r.hook?.hrefs),
      (r.searchHook = r.searchHook ?? r.hook?.searchHook));
    let x = j.useRef({}),
      m = x.current,
      p = m;
    for (let v in c) {
      const y = v === "base" ? c[v] + (r[v] ?? "") : (r[v] ?? c[v]);
      (m === p && y !== p[v] && (x.current = p = { ...p }),
        (p[v] = y),
        (y !== c[v] || y !== d[v]) && (d = p));
    }
    return j.createElement(Fx.Provider, { value: d, children: n });
  },
  Jp = ({ children: n, component: r }, i) =>
    r ? j.createElement(r, { params: i }) : typeof n == "function" ? n(i) : n,
  S1 = (n) => {
    let r = j.useRef(Zx);
    const i = r.current;
    return (r.current =
      Object.keys(n).length !== Object.keys(i).length ||
      Object.entries(n).some(([c, d]) => d !== i[c])
        ? n
        : i);
  },
  Dt = ({ path: n, nest: r, match: i, ...c }) => {
    const d = Va(),
      [f] = Ki(d),
      [h, x, m] = i ?? ld(d.parser, n, f, r),
      p = S1({ ...w1(), ...x });
    if (!h) return null;
    const v = m ? j.createElement(Jx, { base: m }, Jp(c, p)) : Jp(c, p);
    return j.createElement($x.Provider, { value: p, children: v });
  },
  Xe = j.forwardRef((n, r) => {
    const i = Va(),
      [c, d] = Ki(i),
      {
        to: f = "",
        href: h = f,
        onClick: x,
        asChild: m,
        children: p,
        className: v,
        replace: y,
        state: N,
        transition: T,
        ...R
      } = n,
      S = Yx((A) => {
        A.ctrlKey ||
          A.metaKey ||
          A.altKey ||
          A.shiftKey ||
          A.button !== 0 ||
          (x?.(A), A.defaultPrevented || (A.preventDefault(), d(h, n)));
      }),
      C = i.hrefs(h[0] === "~" ? h.slice(1) : i.base + h, i);
    return m && j.isValidElement(p)
      ? j.cloneElement(p, { onClick: S, href: C })
      : j.createElement("a", {
          ...R,
          onClick: S,
          href: C,
          className: v?.call ? v(c === h) : v,
          children: p,
          ref: r,
        });
  }),
  Ix = (n) =>
    Array.isArray(n)
      ? n.flatMap((r) => Ix(r && r.type === j.Fragment ? r.props.children : r))
      : [n],
  E1 = ({ children: n, location: r }) => {
    const i = Va(),
      [c] = Ki(i);
    for (const d of Ix(n)) {
      let f = 0;
      if (
        j.isValidElement(d) &&
        (f = ld(i.parser, d.props.path, r || c, d.props.nest))[0]
      )
        return j.cloneElement(d, { match: f });
    }
    return null;
  };
var ea = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(n) {
      return (
        this.listeners.add(n),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(n), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  T1 = class extends ea {
    #t;
    #e;
    #n;
    constructor() {
      (super(),
        (this.#n = (n) => {
          if (typeof window < "u" && window.addEventListener) {
            const r = () => n();
            return (
              window.addEventListener("visibilitychange", r, !1),
              () => {
                window.removeEventListener("visibilitychange", r);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(n) {
      ((this.#n = n),
        this.#e?.(),
        (this.#e = n((r) => {
          typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
        })));
    }
    setFocused(n) {
      this.#t !== n && ((this.#t = n), this.onFocus());
    }
    onFocus() {
      const n = this.isFocused();
      this.listeners.forEach((r) => {
        r(n);
      });
    }
    isFocused() {
      return typeof this.#t == "boolean"
        ? this.#t
        : globalThis.document?.visibilityState !== "hidden";
    }
  },
  od = new T1(),
  A1 = {
    setTimeout: (n, r) => setTimeout(n, r),
    clearTimeout: (n) => clearTimeout(n),
    setInterval: (n, r) => setInterval(n, r),
    clearInterval: (n) => clearInterval(n),
  },
  R1 = class {
    #t = A1;
    #e = !1;
    setTimeoutProvider(n) {
      this.#t = n;
    }
    setTimeout(n, r) {
      return this.#t.setTimeout(n, r);
    }
    clearTimeout(n) {
      this.#t.clearTimeout(n);
    }
    setInterval(n, r) {
      return this.#t.setInterval(n, r);
    }
    clearInterval(n) {
      this.#t.clearInterval(n);
    }
  },
  Fs = new R1();
function C1(n) {
  setTimeout(n, 0);
}
var O1 = typeof window > "u" || "Deno" in globalThis;
function gt() {}
function M1(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function Lu(n) {
  return typeof n == "number" && n >= 0 && n !== 1 / 0;
}
function Wx(n, r) {
  return Math.max(n + (r || 0) - Date.now(), 0);
}
function vs(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function zt(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function Ip(n, r) {
  const {
    type: i = "all",
    exact: c,
    fetchStatus: d,
    predicate: f,
    queryKey: h,
    stale: x,
  } = n;
  if (h) {
    if (c) {
      if (r.queryHash !== cd(h, r.options)) return !1;
    } else if (!Ir(r.queryKey, h)) return !1;
  }
  if (i !== "all") {
    const m = r.isActive();
    if ((i === "active" && !m) || (i === "inactive" && m)) return !1;
  }
  return !(
    (typeof x == "boolean" && r.isStale() !== x) ||
    (d && d !== r.state.fetchStatus) ||
    (f && !f(r))
  );
}
function Wp(n, r) {
  const { exact: i, status: c, predicate: d, mutationKey: f } = n;
  if (f) {
    if (!r.options.mutationKey) return !1;
    if (i) {
      if (Zs(r.options.mutationKey) !== Zs(f)) return !1;
    } else if (!Ir(r.options.mutationKey, f)) return !1;
  }
  return !((c && r.state.status !== c) || (d && !d(r)));
}
function cd(n, r) {
  return (r?.queryKeyHashFn || Zs)(n);
}
function Zs(n) {
  return JSON.stringify(n, (r, i) =>
    Uu(i)
      ? Object.keys(i)
          .sort()
          .reduce((c, d) => ((c[d] = i[d]), c), {})
      : i,
  );
}
function Ir(n, r) {
  return n === r
    ? !0
    : typeof n != typeof r
      ? !1
      : n && r && typeof n == "object" && typeof r == "object"
        ? Object.keys(r).every((i) => Ir(n[i], r[i]))
        : !1;
}
var _1 = Object.prototype.hasOwnProperty;
function ud(n, r, i = 0) {
  if (n === r) return n;
  if (i > 500) return r;
  const c = ex(n) && ex(r);
  if (!c && !(Uu(n) && Uu(r))) return r;
  const f = (c ? n : Object.keys(n)).length,
    h = c ? r : Object.keys(r),
    x = h.length,
    m = c ? new Array(x) : {};
  let p = 0;
  for (let v = 0; v < x; v++) {
    const y = c ? v : h[v],
      N = n[y],
      T = r[y];
    if (N === T) {
      ((m[y] = N), (c ? v < f : _1.call(n, y)) && p++);
      continue;
    }
    if (
      N === null ||
      T === null ||
      typeof N != "object" ||
      typeof T != "object"
    ) {
      m[y] = T;
      continue;
    }
    const R = ud(N, T, i + 1);
    ((m[y] = R), R === N && p++);
  }
  return f === x && p === f ? n : m;
}
function Wr(n, r) {
  if (!r || Object.keys(n).length !== Object.keys(r).length) return !1;
  for (const i in n) if (n[i] !== r[i]) return !1;
  return !0;
}
function ex(n) {
  return Array.isArray(n) && n.length === Object.keys(n).length;
}
function Uu(n) {
  if (!tx(n)) return !1;
  const r = n.constructor;
  if (r === void 0) return !0;
  const i = r.prototype;
  return !(
    !tx(i) ||
    !i.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(n) !== Object.prototype
  );
}
function tx(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function k1(n) {
  return new Promise((r) => {
    Fs.setTimeout(r, n);
  });
}
function qu(n, r, i) {
  return typeof i.structuralSharing == "function"
    ? i.structuralSharing(n, r)
    : i.structuralSharing !== !1
      ? ud(n, r)
      : r;
}
function D1(n, r, i = 0) {
  const c = [...n, r];
  return i && c.length > i ? c.slice(1) : c;
}
function z1(n, r, i = 0) {
  const c = [r, ...n];
  return i && c.length > i ? c.slice(0, -1) : c;
}
var dd = Symbol();
function eg(n, r) {
  return !n.queryFn && r?.initialPromise
    ? () => r.initialPromise
    : !n.queryFn || n.queryFn === dd
      ? () => Promise.reject(new Error(`Missing queryFn: '${n.queryHash}'`))
      : n.queryFn;
}
function fd(n, r) {
  return typeof n == "function" ? n(...r) : !!n;
}
function L1(n, r, i) {
  let c = !1,
    d;
  return (
    Object.defineProperty(n, "signal", {
      enumerable: !0,
      get: () => (
        (d ??= r()),
        c ||
          ((c = !0),
          d.aborted ? i() : d.addEventListener("abort", i, { once: !0 })),
        d
      ),
    }),
    n
  );
}
var el = (() => {
  let n = () => O1;
  return {
    isServer() {
      return n();
    },
    setIsServer(r) {
      n = r;
    },
  };
})();
function Hu() {
  let n, r;
  const i = new Promise((d, f) => {
    ((n = d), (r = f));
  });
  ((i.status = "pending"), i.catch(() => {}));
  function c(d) {
    (Object.assign(i, d), delete i.resolve, delete i.reject);
  }
  return (
    (i.resolve = (d) => {
      (c({ status: "fulfilled", value: d }), n(d));
    }),
    (i.reject = (d) => {
      (c({ status: "rejected", reason: d }), r(d));
    }),
    i
  );
}
var U1 = C1;
function q1() {
  let n = [],
    r = 0,
    i = (x) => {
      x();
    },
    c = (x) => {
      x();
    },
    d = U1;
  const f = (x) => {
      r
        ? n.push(x)
        : d(() => {
            i(x);
          });
    },
    h = () => {
      const x = n;
      ((n = []),
        x.length &&
          d(() => {
            c(() => {
              x.forEach((m) => {
                i(m);
              });
            });
          }));
    };
  return {
    batch: (x) => {
      let m;
      r++;
      try {
        m = x();
      } finally {
        (r--, r || h());
      }
      return m;
    },
    batchCalls:
      (x) =>
      (...m) => {
        f(() => {
          x(...m);
        });
      },
    schedule: f,
    setNotifyFunction: (x) => {
      i = x;
    },
    setBatchNotifyFunction: (x) => {
      c = x;
    },
    setScheduler: (x) => {
      d = x;
    },
  };
}
var Fe = q1(),
  H1 = class extends ea {
    #t = !0;
    #e;
    #n;
    constructor() {
      (super(),
        (this.#n = (n) => {
          if (typeof window < "u" && window.addEventListener) {
            const r = () => n(!0),
              i = () => n(!1);
            return (
              window.addEventListener("online", r, !1),
              window.addEventListener("offline", i, !1),
              () => {
                (window.removeEventListener("online", r),
                  window.removeEventListener("offline", i));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#e || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#e?.(), (this.#e = void 0));
    }
    setEventListener(n) {
      ((this.#n = n), this.#e?.(), (this.#e = n(this.setOnline.bind(this))));
    }
    setOnline(n) {
      this.#t !== n &&
        ((this.#t = n),
        this.listeners.forEach((i) => {
          i(n);
        }));
    }
    isOnline() {
      return this.#t;
    }
  },
  Li = new H1();
function B1(n) {
  return Math.min(1e3 * 2 ** n, 3e4);
}
function tg(n) {
  return (n ?? "online") === "online" ? Li.isOnline() : !0;
}
var Bu = class extends Error {
  constructor(n) {
    (super("CancelledError"),
      (this.revert = n?.revert),
      (this.silent = n?.silent));
  }
};
function ng(n) {
  let r = !1,
    i = 0,
    c;
  const d = Hu(),
    f = () => d.status !== "pending",
    h = (S) => {
      if (!f()) {
        const C = new Bu(S);
        (N(C), n.onCancel?.(C));
      }
    },
    x = () => {
      r = !0;
    },
    m = () => {
      r = !1;
    },
    p = () =>
      od.isFocused() &&
      (n.networkMode === "always" || Li.isOnline()) &&
      n.canRun(),
    v = () => tg(n.networkMode) && n.canRun(),
    y = (S) => {
      f() || (c?.(), d.resolve(S));
    },
    N = (S) => {
      f() || (c?.(), d.reject(S));
    },
    T = () =>
      new Promise((S) => {
        ((c = (C) => {
          (f() || p()) && S(C);
        }),
          n.onPause?.());
      }).then(() => {
        ((c = void 0), f() || n.onContinue?.());
      }),
    R = () => {
      if (f()) return;
      let S;
      const C = i === 0 ? n.initialPromise : void 0;
      try {
        S = C ?? n.fn();
      } catch (A) {
        S = Promise.reject(A);
      }
      Promise.resolve(S)
        .then(y)
        .catch((A) => {
          if (f()) return;
          const U = n.retry ?? (el.isServer() ? 0 : 3),
            z = n.retryDelay ?? B1,
            H = typeof z == "function" ? z(i, A) : z,
            V =
              U === !0 ||
              (typeof U == "number" && i < U) ||
              (typeof U == "function" && U(i, A));
          if (r || !V) {
            N(A);
            return;
          }
          (i++,
            n.onFail?.(i, A),
            k1(H)
              .then(() => (p() ? void 0 : T()))
              .then(() => {
                r ? N(A) : R();
              }));
        });
    };
  return {
    promise: d,
    status: () => d.status,
    cancel: h,
    continue: () => (c?.(), d),
    cancelRetry: x,
    continueRetry: m,
    canStart: v,
    start: () => (v() ? R() : T().then(R), d),
  };
}
var sg = class {
  #t;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    (this.clearGcTimeout(),
      Lu(this.gcTime) &&
        (this.#t = Fs.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime)));
  }
  updateGcTime(n) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      n ?? (el.isServer() ? 1 / 0 : 300 * 1e3),
    );
  }
  clearGcTimeout() {
    this.#t !== void 0 && (Fs.clearTimeout(this.#t), (this.#t = void 0));
  }
};
function G1(n) {
  return {
    onFetch: (r, i) => {
      const c = r.options,
        d = r.fetchOptions?.meta?.fetchMore?.direction,
        f = r.state.data?.pages || [],
        h = r.state.data?.pageParams || [];
      let x = { pages: [], pageParams: [] },
        m = 0;
      const p = async () => {
        let v = !1;
        const y = (R) => {
            L1(
              R,
              () => r.signal,
              () => (v = !0),
            );
          },
          N = eg(r.options, r.fetchOptions),
          T = async (R, S, C) => {
            if (v) return Promise.reject(r.signal.reason);
            if (S == null && R.pages.length) return Promise.resolve(R);
            const U = (() => {
                const F = {
                  client: r.client,
                  queryKey: r.queryKey,
                  pageParam: S,
                  direction: C ? "backward" : "forward",
                  meta: r.options.meta,
                };
                return (y(F), F);
              })(),
              z = await N(U),
              { maxPages: H } = r.options,
              V = C ? z1 : D1;
            return {
              pages: V(R.pages, z, H),
              pageParams: V(R.pageParams, S, H),
            };
          };
        if (d && f.length) {
          const R = d === "backward",
            S = R ? Q1 : nx,
            C = { pages: f, pageParams: h },
            A = S(c, C);
          x = await T(C, A, R);
        } else {
          const R = n ?? f.length;
          do {
            const S = m === 0 ? (h[0] ?? c.initialPageParam) : nx(c, x);
            if (m > 0 && S == null) break;
            ((x = await T(x, S)), m++);
          } while (m < R);
        }
        return x;
      };
      r.options.persister
        ? (r.fetchFn = () =>
            r.options.persister?.(
              p,
              {
                client: r.client,
                queryKey: r.queryKey,
                meta: r.options.meta,
                signal: r.signal,
              },
              i,
            ))
        : (r.fetchFn = p);
    },
  };
}
function nx(n, { pages: r, pageParams: i }) {
  const c = r.length - 1;
  return r.length > 0 ? n.getNextPageParam(r[c], r, i[c], i) : void 0;
}
function Q1(n, { pages: r, pageParams: i }) {
  return r.length > 0 ? n.getPreviousPageParam?.(r[0], r, i[0], i) : void 0;
}
var P1 = class extends sg {
  #t;
  #e;
  #n;
  #s;
  #a;
  #r;
  #i;
  #l;
  constructor(n) {
    (super(),
      (this.#l = !1),
      (this.#i = n.defaultOptions),
      this.setOptions(n.options),
      (this.observers = []),
      (this.#a = n.client),
      (this.#s = this.#a.getQueryCache()),
      (this.queryKey = n.queryKey),
      (this.queryHash = n.queryHash),
      (this.#e = ax(this.options)),
      (this.state = n.state ?? this.#e),
      this.scheduleGc());
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return this.#t;
  }
  get promise() {
    return this.#r?.promise;
  }
  setOptions(n) {
    if (
      ((this.options = { ...this.#i, ...n }),
      n?._type && (this.#t = n._type),
      this.updateGcTime(this.options.gcTime),
      this.state && this.state.data === void 0)
    ) {
      const r = ax(this.options);
      r.data !== void 0 &&
        (this.setState(sx(r.data, r.dataUpdatedAt)), (this.#e = r));
    }
  }
  optionalRemove() {
    !this.observers.length &&
      this.state.fetchStatus === "idle" &&
      this.#s.remove(this);
  }
  setData(n, r) {
    const i = qu(this.state.data, n, this.options);
    return (
      this.#o({
        data: i,
        type: "success",
        dataUpdatedAt: r?.updatedAt,
        manual: r?.manual,
      }),
      i
    );
  }
  setState(n) {
    this.#o({ type: "setState", state: n });
  }
  cancel(n) {
    const r = this.#r?.promise;
    return (this.#r?.cancel(n), r ? r.then(gt).catch(gt) : Promise.resolve());
  }
  destroy() {
    (super.destroy(), this.cancel({ silent: !0 }));
  }
  get resetState() {
    return this.#e;
  }
  reset() {
    (this.destroy(), this.setState(this.resetState));
  }
  isActive() {
    return this.observers.some((n) => zt(n.options.enabled, this) !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0
      ? !this.isActive()
      : this.options.queryFn === dd || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return this.getObserversCount() > 0
      ? this.observers.some((n) => vs(n.options.staleTime, this) === "static")
      : !1;
  }
  isStale() {
    return this.getObserversCount() > 0
      ? this.observers.some((n) => n.getCurrentResult().isStale)
      : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(n = 0) {
    return this.state.data === void 0
      ? !0
      : n === "static"
        ? !1
        : this.state.isInvalidated
          ? !0
          : !Wx(this.state.dataUpdatedAt, n);
  }
  onFocus() {
    (this.observers
      .find((r) => r.shouldFetchOnWindowFocus())
      ?.refetch({ cancelRefetch: !1 }),
      this.#r?.continue());
  }
  onOnline() {
    (this.observers
      .find((r) => r.shouldFetchOnReconnect())
      ?.refetch({ cancelRefetch: !1 }),
      this.#r?.continue());
  }
  addObserver(n) {
    this.observers.includes(n) ||
      (this.observers.push(n),
      this.clearGcTimeout(),
      this.#s.notify({ type: "observerAdded", query: this, observer: n }));
  }
  removeObserver(n) {
    this.observers.includes(n) &&
      ((this.observers = this.observers.filter((r) => r !== n)),
      this.observers.length ||
        (this.#r &&
          (this.#l || this.#u()
            ? this.#r.cancel({ revert: !0 })
            : this.#r.cancelRetry()),
        this.scheduleGc()),
      this.#s.notify({ type: "observerRemoved", query: this, observer: n }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  #u() {
    return (
      this.state.fetchStatus === "paused" && this.state.status === "pending"
    );
  }
  invalidate() {
    this.state.isInvalidated || this.#o({ type: "invalidate" });
  }
  async fetch(n, r) {
    if (this.state.fetchStatus !== "idle" && this.#r?.status() !== "rejected") {
      if (this.state.data !== void 0 && r?.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.#r) return (this.#r.continueRetry(), this.#r.promise);
    }
    if ((n && this.setOptions(n), !this.options.queryFn)) {
      const m = this.observers.find((p) => p.options.queryFn);
      m && this.setOptions(m.options);
    }
    const i = new AbortController(),
      c = (m) => {
        Object.defineProperty(m, "signal", {
          enumerable: !0,
          get: () => ((this.#l = !0), i.signal),
        });
      },
      d = () => {
        const m = eg(this.options, r),
          v = (() => {
            const y = {
              client: this.#a,
              queryKey: this.queryKey,
              meta: this.meta,
            };
            return (c(y), y);
          })();
        return (
          (this.#l = !1),
          this.options.persister ? this.options.persister(m, v, this) : m(v)
        );
      },
      h = (() => {
        const m = {
          fetchOptions: r,
          options: this.options,
          queryKey: this.queryKey,
          client: this.#a,
          state: this.state,
          fetchFn: d,
        };
        return (c(m), m);
      })();
    ((this.#t === "infinite"
      ? G1(this.options.pages)
      : this.options.behavior
    )?.onFetch(h, this),
      (this.#n = this.state),
      (this.state.fetchStatus === "idle" ||
        this.state.fetchMeta !== h.fetchOptions?.meta) &&
        this.#o({ type: "fetch", meta: h.fetchOptions?.meta }),
      (this.#r = ng({
        initialPromise: r?.initialPromise,
        fn: h.fetchFn,
        onCancel: (m) => {
          (m instanceof Bu &&
            m.revert &&
            this.setState({ ...this.#n, fetchStatus: "idle" }),
            i.abort());
        },
        onFail: (m, p) => {
          this.#o({ type: "failed", failureCount: m, error: p });
        },
        onPause: () => {
          this.#o({ type: "pause" });
        },
        onContinue: () => {
          this.#o({ type: "continue" });
        },
        retry: h.options.retry,
        retryDelay: h.options.retryDelay,
        networkMode: h.options.networkMode,
        canRun: () => !0,
      })));
    try {
      const m = await this.#r.start();
      if (m === void 0) throw new Error(`${this.queryHash} data is undefined`);
      return (
        this.setData(m),
        this.#s.config.onSuccess?.(m, this),
        this.#s.config.onSettled?.(m, this.state.error, this),
        m
      );
    } catch (m) {
      if (m instanceof Bu) {
        if (m.silent) return this.#r.promise;
        if (m.revert) {
          if (this.state.data === void 0) throw m;
          return this.state.data;
        }
      }
      throw (
        this.#o({ type: "error", error: m }),
        this.#s.config.onError?.(m, this),
        this.#s.config.onSettled?.(this.state.data, m, this),
        m
      );
    } finally {
      this.scheduleGc();
    }
  }
  #o(n) {
    const r = (i) => {
      switch (n.type) {
        case "failed":
          return {
            ...i,
            fetchFailureCount: n.failureCount,
            fetchFailureReason: n.error,
          };
        case "pause":
          return { ...i, fetchStatus: "paused" };
        case "continue":
          return { ...i, fetchStatus: "fetching" };
        case "fetch":
          return {
            ...i,
            ...ag(i.data, this.options),
            fetchMeta: n.meta ?? null,
          };
        case "success":
          const c = {
            ...i,
            ...sx(n.data, n.dataUpdatedAt),
            dataUpdateCount: i.dataUpdateCount + 1,
            ...(!n.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
          return ((this.#n = n.manual ? c : void 0), c);
        case "error":
          const d = n.error;
          return {
            ...i,
            error: d,
            errorUpdateCount: i.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: i.fetchFailureCount + 1,
            fetchFailureReason: d,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: !0,
          };
        case "invalidate":
          return { ...i, isInvalidated: !0 };
        case "setState":
          return { ...i, ...n.state };
      }
    };
    ((this.state = r(this.state)),
      Fe.batch(() => {
        (this.observers.forEach((i) => {
          i.onQueryUpdate();
        }),
          this.#s.notify({ query: this, type: "updated", action: n }));
      }));
  }
};
function ag(n, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: tg(r.networkMode) ? "fetching" : "paused",
    ...(n === void 0 && { error: null, status: "pending" }),
  };
}
function sx(n, r) {
  return {
    data: n,
    dataUpdatedAt: r ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success",
  };
}
function ax(n) {
  const r =
      typeof n.initialData == "function" ? n.initialData() : n.initialData,
    i = r !== void 0,
    c = i
      ? typeof n.initialDataUpdatedAt == "function"
        ? n.initialDataUpdatedAt()
        : n.initialDataUpdatedAt
      : 0;
  return {
    data: r,
    dataUpdateCount: 0,
    dataUpdatedAt: i ? (c ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: i ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var hd = class extends ea {
  constructor(n, r) {
    (super(),
      (this.options = r),
      (this.#t = n),
      (this.#l = null),
      (this.#i = Hu()),
      this.bindMethods(),
      this.setOptions(r));
  }
  #t;
  #e = void 0;
  #n = void 0;
  #s = void 0;
  #a;
  #r;
  #i;
  #l;
  #u;
  #o;
  #h;
  #d;
  #m;
  #c;
  #p = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#e.addObserver(this),
      rx(this.#e, this.options) ? this.#f() : this.updateResult(),
      this.#v());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Gu(this.#e, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Gu(this.#e, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#b(),
      this.#j(),
      this.#e.removeObserver(this));
  }
  setOptions(n) {
    const r = this.options,
      i = this.#e;
    if (
      ((this.options = this.#t.defaultQueryOptions(n)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != "boolean" &&
        typeof this.options.enabled != "function" &&
        typeof zt(this.options.enabled, this.#e) != "boolean")
    )
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean",
      );
    (this.#N(),
      this.#e.setOptions(this.options),
      r._defaulted &&
        !Wr(this.options, r) &&
        this.#t
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.#e,
            observer: this,
          }));
    const c = this.hasListeners();
    (c && lx(this.#e, i, this.options, r) && this.#f(),
      this.updateResult(),
      c &&
        (this.#e !== i ||
          zt(this.options.enabled, this.#e) !== zt(r.enabled, this.#e) ||
          vs(this.options.staleTime, this.#e) !== vs(r.staleTime, this.#e)) &&
        this.#x());
    const d = this.#g();
    c &&
      (this.#e !== i ||
        zt(this.options.enabled, this.#e) !== zt(r.enabled, this.#e) ||
        d !== this.#c) &&
      this.#y(d);
  }
  getOptimisticResult(n) {
    const r = this.#t.getQueryCache().build(this.#t, n),
      i = this.createResult(r, n);
    return (
      V1(this, i) &&
        ((this.#s = i), (this.#r = this.options), (this.#a = this.#e.state)),
      i
    );
  }
  getCurrentResult() {
    return this.#s;
  }
  trackResult(n, r) {
    return new Proxy(n, {
      get: (i, c) => (
        this.trackProp(c),
        r?.(c),
        c === "promise" &&
          (this.trackProp("data"),
          !this.options.experimental_prefetchInRender &&
            this.#i.status === "pending" &&
            this.#i.reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled",
              ),
            )),
        Reflect.get(i, c)
      ),
    });
  }
  trackProp(n) {
    this.#p.add(n);
  }
  getCurrentQuery() {
    return this.#e;
  }
  refetch({ ...n } = {}) {
    return this.fetch({ ...n });
  }
  fetchOptimistic(n) {
    const r = this.#t.defaultQueryOptions(n),
      i = this.#t.getQueryCache().build(this.#t, r);
    return i.fetch().then(() => this.createResult(i, r));
  }
  fetch(n) {
    return this.#f({ ...n, cancelRefetch: n.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#s),
    );
  }
  #f(n) {
    this.#N();
    let r = this.#e.fetch(this.options, n);
    return (n?.throwOnError || (r = r.catch(gt)), r);
  }
  #x() {
    this.#b();
    const n = vs(this.options.staleTime, this.#e);
    if (el.isServer() || this.#s.isStale || !Lu(n)) return;
    const i = Wx(this.#s.dataUpdatedAt, n) + 1;
    this.#d = Fs.setTimeout(() => {
      this.#s.isStale || this.updateResult();
    }, i);
  }
  #g() {
    return (
      (typeof this.options.refetchInterval == "function"
        ? this.options.refetchInterval(this.#e)
        : this.options.refetchInterval) ?? !1
    );
  }
  #y(n) {
    (this.#j(),
      (this.#c = n),
      !(
        el.isServer() ||
        zt(this.options.enabled, this.#e) === !1 ||
        !Lu(this.#c) ||
        this.#c === 0
      ) &&
        (this.#m = Fs.setInterval(() => {
          (this.options.refetchIntervalInBackground || od.isFocused()) &&
            this.#f();
        }, this.#c)));
  }
  #v() {
    (this.#x(), this.#y(this.#g()));
  }
  #b() {
    this.#d !== void 0 && (Fs.clearTimeout(this.#d), (this.#d = void 0));
  }
  #j() {
    this.#m !== void 0 && (Fs.clearInterval(this.#m), (this.#m = void 0));
  }
  createResult(n, r) {
    const i = this.#e,
      c = this.options,
      d = this.#s,
      f = this.#a,
      h = this.#r,
      m = n !== i ? n.state : this.#n,
      { state: p } = n;
    let v = { ...p },
      y = !1,
      N;
    if (r._optimisticResults) {
      const G = this.hasListeners(),
        re = !G && rx(n, r),
        he = G && lx(n, i, r, c);
      ((re || he) && (v = { ...v, ...ag(p.data, n.options) }),
        r._optimisticResults === "isRestoring" && (v.fetchStatus = "idle"));
    }
    let { error: T, errorUpdatedAt: R, status: S } = v;
    N = v.data;
    let C = !1;
    if (r.placeholderData !== void 0 && N === void 0 && S === "pending") {
      let G;
      (d?.isPlaceholderData && r.placeholderData === h?.placeholderData
        ? ((G = d.data), (C = !0))
        : (G =
            typeof r.placeholderData == "function"
              ? r.placeholderData(this.#h?.state.data, this.#h)
              : r.placeholderData),
        G !== void 0 && ((S = "success"), (N = qu(d?.data, G, r)), (y = !0)));
    }
    if (r.select && N !== void 0 && !C)
      if (d && N === f?.data && r.select === this.#u) N = this.#o;
      else
        try {
          ((this.#u = r.select),
            (N = r.select(N)),
            (N = qu(d?.data, N, r)),
            (this.#o = N),
            (this.#l = null));
        } catch (G) {
          this.#l = G;
        }
    this.#l && ((T = this.#l), (N = this.#o), (R = Date.now()), (S = "error"));
    const A = v.fetchStatus === "fetching",
      U = S === "pending",
      z = S === "error",
      H = U && A,
      V = N !== void 0,
      Z = {
        status: S,
        fetchStatus: v.fetchStatus,
        isPending: U,
        isSuccess: S === "success",
        isError: z,
        isInitialLoading: H,
        isLoading: H,
        data: N,
        dataUpdatedAt: v.dataUpdatedAt,
        error: T,
        errorUpdatedAt: R,
        failureCount: v.fetchFailureCount,
        failureReason: v.fetchFailureReason,
        errorUpdateCount: v.errorUpdateCount,
        isFetched: n.isFetched(),
        isFetchedAfterMount:
          v.dataUpdateCount > m.dataUpdateCount ||
          v.errorUpdateCount > m.errorUpdateCount,
        isFetching: A,
        isRefetching: A && !U,
        isLoadingError: z && !V,
        isPaused: v.fetchStatus === "paused",
        isPlaceholderData: y,
        isRefetchError: z && V,
        isStale: md(n, r),
        refetch: this.refetch,
        promise: this.#i,
        isEnabled: zt(r.enabled, n) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      const G = Z.data !== void 0,
        re = Z.status === "error" && !G,
        he = (ye) => {
          re ? ye.reject(Z.error) : G && ye.resolve(Z.data);
        },
        me = () => {
          const ye = (this.#i = Z.promise = Hu());
          he(ye);
        },
        ue = this.#i;
      switch (ue.status) {
        case "pending":
          n.queryHash === i.queryHash && he(ue);
          break;
        case "fulfilled":
          (re || Z.data !== ue.value) && me();
          break;
        case "rejected":
          (!re || Z.error !== ue.reason) && me();
          break;
      }
    }
    return Z;
  }
  updateResult() {
    const n = this.#s,
      r = this.createResult(this.#e, this.options);
    if (
      ((this.#a = this.#e.state),
      (this.#r = this.options),
      this.#a.data !== void 0 && (this.#h = this.#e),
      Wr(r, n))
    )
      return;
    this.#s = r;
    const i = () => {
      if (!n) return !0;
      const { notifyOnChangeProps: c } = this.options,
        d = typeof c == "function" ? c() : c;
      if (d === "all" || (!d && !this.#p.size)) return !0;
      const f = new Set(d ?? this.#p);
      return (
        this.options.throwOnError && f.add("error"),
        Object.keys(this.#s).some((h) => {
          const x = h;
          return this.#s[x] !== n[x] && f.has(x);
        })
      );
    };
    this.#w({ listeners: i() });
  }
  #N() {
    const n = this.#t.getQueryCache().build(this.#t, this.options);
    if (n === this.#e) return;
    const r = this.#e;
    ((this.#e = n),
      (this.#n = n.state),
      this.hasListeners() && (r?.removeObserver(this), n.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#v());
  }
  #w(n) {
    Fe.batch(() => {
      (n.listeners &&
        this.listeners.forEach((r) => {
          r(this.#s);
        }),
        this.#t
          .getQueryCache()
          .notify({ query: this.#e, type: "observerResultsUpdated" }));
    });
  }
};
function Y1(n, r) {
  return (
    zt(r.enabled, n) !== !1 &&
    n.state.data === void 0 &&
    !(n.state.status === "error" && zt(r.retryOnMount, n) === !1)
  );
}
function rx(n, r) {
  return Y1(n, r) || (n.state.data !== void 0 && Gu(n, r, r.refetchOnMount));
}
function Gu(n, r, i) {
  if (zt(r.enabled, n) !== !1 && vs(r.staleTime, n) !== "static") {
    const c = typeof i == "function" ? i(n) : i;
    return c === "always" || (c !== !1 && md(n, r));
  }
  return !1;
}
function lx(n, r, i, c) {
  return (
    (n !== r || zt(c.enabled, n) === !1) &&
    (!i.suspense || n.state.status !== "error") &&
    md(n, i)
  );
}
function md(n, r) {
  return zt(r.enabled, n) !== !1 && n.isStaleByTime(vs(r.staleTime, n));
}
function V1(n, r) {
  return !Wr(n.getCurrentResult(), r);
}
var K1 = class extends sg {
  #t;
  #e;
  #n;
  #s;
  constructor(n) {
    (super(),
      (this.#t = n.client),
      (this.mutationId = n.mutationId),
      (this.#n = n.mutationCache),
      (this.#e = []),
      (this.state = n.state || rg()),
      this.setOptions(n.options),
      this.scheduleGc());
  }
  setOptions(n) {
    ((this.options = n), this.updateGcTime(this.options.gcTime));
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(n) {
    this.#e.includes(n) ||
      (this.#e.push(n),
      this.clearGcTimeout(),
      this.#n.notify({ type: "observerAdded", mutation: this, observer: n }));
  }
  removeObserver(n) {
    ((this.#e = this.#e.filter((r) => r !== n)),
      this.scheduleGc(),
      this.#n.notify({ type: "observerRemoved", mutation: this, observer: n }));
  }
  optionalRemove() {
    this.#e.length ||
      (this.state.status === "pending"
        ? this.scheduleGc()
        : this.#n.remove(this));
  }
  continue() {
    return this.#s?.continue() ?? this.execute(this.state.variables);
  }
  async execute(n) {
    const r = () => {
        this.#a({ type: "continue" });
      },
      i = {
        client: this.#t,
        meta: this.options.meta,
        mutationKey: this.options.mutationKey,
      };
    this.#s = ng({
      fn: () =>
        this.options.mutationFn
          ? this.options.mutationFn(n, i)
          : Promise.reject(new Error("No mutationFn found")),
      onFail: (f, h) => {
        this.#a({ type: "failed", failureCount: f, error: h });
      },
      onPause: () => {
        this.#a({ type: "pause" });
      },
      onContinue: r,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#n.canRun(this),
    });
    const c = this.state.status === "pending",
      d = !this.#s.canStart();
    try {
      if (c) r();
      else {
        (this.#a({ type: "pending", variables: n, isPaused: d }),
          this.#n.config.onMutate &&
            (await this.#n.config.onMutate(n, this, i)));
        const h = await this.options.onMutate?.(n, i);
        h !== this.state.context &&
          this.#a({ type: "pending", context: h, variables: n, isPaused: d });
      }
      const f = await this.#s.start();
      return (
        await this.#n.config.onSuccess?.(f, n, this.state.context, this, i),
        await this.options.onSuccess?.(f, n, this.state.context, i),
        await this.#n.config.onSettled?.(
          f,
          null,
          this.state.variables,
          this.state.context,
          this,
          i,
        ),
        await this.options.onSettled?.(f, null, n, this.state.context, i),
        this.#a({ type: "success", data: f }),
        f
      );
    } catch (f) {
      try {
        await this.#n.config.onError?.(f, n, this.state.context, this, i);
      } catch (h) {
        Promise.reject(h);
      }
      try {
        await this.options.onError?.(f, n, this.state.context, i);
      } catch (h) {
        Promise.reject(h);
      }
      try {
        await this.#n.config.onSettled?.(
          void 0,
          f,
          this.state.variables,
          this.state.context,
          this,
          i,
        );
      } catch (h) {
        Promise.reject(h);
      }
      try {
        await this.options.onSettled?.(void 0, f, n, this.state.context, i);
      } catch (h) {
        Promise.reject(h);
      }
      throw (this.#a({ type: "error", error: f }), f);
    } finally {
      this.#n.runNext(this);
    }
  }
  #a(n) {
    const r = (i) => {
      switch (n.type) {
        case "failed":
          return { ...i, failureCount: n.failureCount, failureReason: n.error };
        case "pause":
          return { ...i, isPaused: !0 };
        case "continue":
          return { ...i, isPaused: !1 };
        case "pending":
          return {
            ...i,
            context: n.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: n.isPaused,
            status: "pending",
            variables: n.variables,
            submittedAt: Date.now(),
          };
        case "success":
          return {
            ...i,
            data: n.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...i,
            data: void 0,
            error: n.error,
            failureCount: i.failureCount + 1,
            failureReason: n.error,
            isPaused: !1,
            status: "error",
          };
      }
    };
    ((this.state = r(this.state)),
      Fe.batch(() => {
        (this.#e.forEach((i) => {
          i.onMutationUpdate(n);
        }),
          this.#n.notify({ mutation: this, type: "updated", action: n }));
      }));
  }
};
function rg() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var X1 = class extends ea {
  constructor(n = {}) {
    (super(),
      (this.config = n),
      (this.#t = new Set()),
      (this.#e = new Map()),
      (this.#n = 0));
  }
  #t;
  #e;
  #n;
  build(n, r, i) {
    const c = new K1({
      client: n,
      mutationCache: this,
      mutationId: ++this.#n,
      options: n.defaultMutationOptions(r),
      state: i,
    });
    return (this.add(c), c);
  }
  add(n) {
    this.#t.add(n);
    const r = Ei(n);
    if (typeof r == "string") {
      const i = this.#e.get(r);
      i ? i.push(n) : this.#e.set(r, [n]);
    }
    this.notify({ type: "added", mutation: n });
  }
  remove(n) {
    if (this.#t.delete(n)) {
      const r = Ei(n);
      if (typeof r == "string") {
        const i = this.#e.get(r);
        if (i)
          if (i.length > 1) {
            const c = i.indexOf(n);
            c !== -1 && i.splice(c, 1);
          } else i[0] === n && this.#e.delete(r);
      }
    }
    this.notify({ type: "removed", mutation: n });
  }
  canRun(n) {
    const r = Ei(n);
    if (typeof r == "string") {
      const c = this.#e.get(r)?.find((d) => d.state.status === "pending");
      return !c || c === n;
    } else return !0;
  }
  runNext(n) {
    const r = Ei(n);
    return typeof r == "string"
      ? (this.#e
          .get(r)
          ?.find((c) => c !== n && c.state.isPaused)
          ?.continue() ?? Promise.resolve())
      : Promise.resolve();
  }
  clear() {
    Fe.batch(() => {
      (this.#t.forEach((n) => {
        this.notify({ type: "removed", mutation: n });
      }),
        this.#t.clear(),
        this.#e.clear());
    });
  }
  getAll() {
    return Array.from(this.#t);
  }
  find(n) {
    const r = { exact: !0, ...n };
    return this.getAll().find((i) => Wp(r, i));
  }
  findAll(n = {}) {
    return this.getAll().filter((r) => Wp(n, r));
  }
  notify(n) {
    Fe.batch(() => {
      this.listeners.forEach((r) => {
        r(n);
      });
    });
  }
  resumePausedMutations() {
    const n = this.getAll().filter((r) => r.state.isPaused);
    return Fe.batch(() => Promise.all(n.map((r) => r.continue().catch(gt))));
  }
};
function Ei(n) {
  return n.options.scope?.id;
}
var F1 = class extends ea {
  #t;
  #e = void 0;
  #n;
  #s;
  constructor(r, i) {
    (super(), (this.#t = r), this.setOptions(i), this.bindMethods(), this.#a());
  }
  bindMethods() {
    ((this.mutate = this.mutate.bind(this)),
      (this.reset = this.reset.bind(this)));
  }
  setOptions(r) {
    const i = this.options;
    ((this.options = this.#t.defaultMutationOptions(r)),
      Wr(this.options, i) ||
        this.#t
          .getMutationCache()
          .notify({
            type: "observerOptionsUpdated",
            mutation: this.#n,
            observer: this,
          }),
      i?.mutationKey &&
      this.options.mutationKey &&
      Zs(i.mutationKey) !== Zs(this.options.mutationKey)
        ? this.reset()
        : this.#n?.state.status === "pending" &&
          this.#n.setOptions(this.options));
  }
  onUnsubscribe() {
    this.hasListeners() || this.#n?.removeObserver(this);
  }
  onMutationUpdate(r) {
    (this.#a(), this.#r(r));
  }
  getCurrentResult() {
    return this.#e;
  }
  reset() {
    (this.#n?.removeObserver(this), (this.#n = void 0), this.#a(), this.#r());
  }
  mutate(r, i) {
    return (
      (this.#s = i),
      this.#n?.removeObserver(this),
      (this.#n = this.#t.getMutationCache().build(this.#t, this.options)),
      this.#n.addObserver(this),
      this.#n.execute(r)
    );
  }
  #a() {
    const r = this.#n?.state ?? rg();
    this.#e = {
      ...r,
      isPending: r.status === "pending",
      isSuccess: r.status === "success",
      isError: r.status === "error",
      isIdle: r.status === "idle",
      mutate: this.mutate,
      reset: this.reset,
    };
  }
  #r(r) {
    Fe.batch(() => {
      if (this.#s && this.hasListeners()) {
        const i = this.#e.variables,
          c = this.#e.context,
          d = {
            client: this.#t,
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        if (r?.type === "success") {
          try {
            this.#s.onSuccess?.(r.data, i, c, d);
          } catch (f) {
            Promise.reject(f);
          }
          try {
            this.#s.onSettled?.(r.data, null, i, c, d);
          } catch (f) {
            Promise.reject(f);
          }
        } else if (r?.type === "error") {
          try {
            this.#s.onError?.(r.error, i, c, d);
          } catch (f) {
            Promise.reject(f);
          }
          try {
            this.#s.onSettled?.(void 0, r.error, i, c, d);
          } catch (f) {
            Promise.reject(f);
          }
        }
      }
      this.listeners.forEach((i) => {
        i(this.#e);
      });
    });
  }
};
function ix(n, r) {
  const i = new Set(r);
  return n.filter((c) => !i.has(c));
}
function Z1(n, r, i) {
  const c = n.slice(0);
  return ((c[r] = i), c);
}
var $1 = class extends ea {
    #t;
    #e;
    #n;
    #s;
    #a;
    #r;
    #i;
    #l;
    #u;
    #o = [];
    constructor(n, r, i) {
      (super(),
        (this.#t = n),
        (this.#s = i),
        (this.#n = []),
        (this.#a = []),
        (this.#e = []),
        this.setQueries(r));
    }
    onSubscribe() {
      this.listeners.size === 1 &&
        this.#a.forEach((n) => {
          n.subscribe((r) => {
            this.#p(n, r);
          });
        });
    }
    onUnsubscribe() {
      this.listeners.size || this.destroy();
    }
    destroy() {
      ((this.listeners = new Set()),
        this.#a.forEach((n) => {
          n.destroy();
        }));
    }
    setQueries(n, r) {
      ((this.#n = n),
        (this.#s = r),
        Fe.batch(() => {
          const i = this.#a,
            c = this.#c(this.#n);
          c.forEach((v) => v.observer.setOptions(v.defaultedQueryOptions));
          const d = c.map((v) => v.observer),
            f = d.map((v) => v.getCurrentResult()),
            h = i.length !== d.length,
            x = d.some((v, y) => v !== i[y]),
            m = h || x,
            p = m
              ? !0
              : f.some((v, y) => {
                  const N = this.#e[y];
                  return !N || !Wr(v, N);
                });
          (!m && !p) ||
            (m && ((this.#o = c), (this.#a = d)),
            (this.#e = f),
            this.hasListeners() &&
              (m &&
                (ix(i, d).forEach((v) => {
                  v.destroy();
                }),
                ix(d, i).forEach((v) => {
                  v.subscribe((y) => {
                    this.#p(v, y);
                  });
                })),
              this.#f()));
        }));
    }
    getCurrentResult() {
      return this.#e;
    }
    getQueries() {
      return this.#a.map((n) => n.getCurrentQuery());
    }
    getObservers() {
      return this.#a;
    }
    getOptimisticResult(n, r) {
      const i = this.#c(n),
        c = i.map((f) =>
          f.observer.getOptimisticResult(f.defaultedQueryOptions),
        ),
        d = i.map((f) => f.defaultedQueryOptions.queryHash);
      return [c, (f) => this.#d(f ?? c, r, d), () => this.#h(c, i)];
    }
    #h(n, r) {
      return r.map((i, c) => {
        const d = n[c];
        return i.defaultedQueryOptions.notifyOnChangeProps
          ? d
          : i.observer.trackResult(d, (f) => {
              r.forEach((h) => {
                h.observer.trackProp(f);
              });
            });
      });
    }
    #d(n, r, i) {
      if (r) {
        const c = this.#u,
          d =
            i !== void 0 &&
            c !== void 0 &&
            (c.length !== i.length || i.some((f, h) => f !== c[h]));
        return (
          (!this.#r || this.#e !== this.#l || d || r !== this.#i) &&
            ((this.#i = r),
            (this.#l = this.#e),
            i !== void 0 && (this.#u = i),
            (this.#r = ud(this.#r, r(n)))),
          this.#r
        );
      }
      return n;
    }
    #m() {
      return (
        this.#s?.combine !== void 0 &&
        this.#a.some(
          (n, r) => n.options.suspense && this.#e[r]?.data === void 0,
        )
      );
    }
    #c(n) {
      const r = new Map();
      this.#a.forEach((c) => {
        const d = c.options.queryHash;
        if (!d) return;
        const f = r.get(d);
        f ? f.push(c) : r.set(d, [c]);
      });
      const i = [];
      return (
        n.forEach((c) => {
          const d = this.#t.defaultQueryOptions(c),
            h = r.get(d.queryHash)?.shift() ?? new hd(this.#t, d);
          i.push({ defaultedQueryOptions: d, observer: h });
        }),
        i
      );
    }
    #p(n, r) {
      const i = this.#a.indexOf(n);
      i !== -1 && ((this.#e = Z1(this.#e, i, r)), this.#f());
    }
    #f() {
      if (this.hasListeners()) {
        const n = this.#h(this.#e, this.#o),
          r = this.#m(),
          i = this.#r,
          c = r ? i : this.#d(n, this.#s?.combine);
        (r || i !== c) &&
          Fe.batch(() => {
            this.listeners.forEach((d) => {
              d(this.#e);
            });
          });
      }
    }
  },
  J1 = class extends ea {
    constructor(n = {}) {
      (super(), (this.config = n), (this.#t = new Map()));
    }
    #t;
    build(n, r, i) {
      const c = r.queryKey,
        d = r.queryHash ?? cd(c, r);
      let f = this.get(d);
      return (
        f ||
          ((f = new P1({
            client: n,
            queryKey: c,
            queryHash: d,
            options: n.defaultQueryOptions(r),
            state: i,
            defaultOptions: n.getQueryDefaults(c),
          })),
          this.add(f)),
        f
      );
    }
    add(n) {
      this.#t.has(n.queryHash) ||
        (this.#t.set(n.queryHash, n), this.notify({ type: "added", query: n }));
    }
    remove(n) {
      const r = this.#t.get(n.queryHash);
      r &&
        (n.destroy(),
        r === n && this.#t.delete(n.queryHash),
        this.notify({ type: "removed", query: n }));
    }
    clear() {
      Fe.batch(() => {
        this.getAll().forEach((n) => {
          this.remove(n);
        });
      });
    }
    get(n) {
      return this.#t.get(n);
    }
    getAll() {
      return [...this.#t.values()];
    }
    find(n) {
      const r = { exact: !0, ...n };
      return this.getAll().find((i) => Ip(r, i));
    }
    findAll(n = {}) {
      const r = this.getAll();
      return Object.keys(n).length > 0 ? r.filter((i) => Ip(n, i)) : r;
    }
    notify(n) {
      Fe.batch(() => {
        this.listeners.forEach((r) => {
          r(n);
        });
      });
    }
    onFocus() {
      Fe.batch(() => {
        this.getAll().forEach((n) => {
          n.onFocus();
        });
      });
    }
    onOnline() {
      Fe.batch(() => {
        this.getAll().forEach((n) => {
          n.onOnline();
        });
      });
    }
  },
  I1 = class {
    #t;
    #e;
    #n;
    #s;
    #a;
    #r;
    #i;
    #l;
    constructor(n = {}) {
      ((this.#t = n.queryCache || new J1()),
        (this.#e = n.mutationCache || new X1()),
        (this.#n = n.defaultOptions || {}),
        (this.#s = new Map()),
        (this.#a = new Map()),
        (this.#r = 0));
    }
    mount() {
      (this.#r++,
        this.#r === 1 &&
          ((this.#i = od.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#t.onFocus());
          })),
          (this.#l = Li.subscribe(async (n) => {
            n && (await this.resumePausedMutations(), this.#t.onOnline());
          }))));
    }
    unmount() {
      (this.#r--,
        this.#r === 0 &&
          (this.#i?.(), (this.#i = void 0), this.#l?.(), (this.#l = void 0)));
    }
    isFetching(n) {
      return this.#t.findAll({ ...n, fetchStatus: "fetching" }).length;
    }
    isMutating(n) {
      return this.#e.findAll({ ...n, status: "pending" }).length;
    }
    getQueryData(n) {
      const r = this.defaultQueryOptions({ queryKey: n });
      return this.#t.get(r.queryHash)?.state.data;
    }
    ensureQueryData(n) {
      const r = this.defaultQueryOptions(n),
        i = this.#t.build(this, r),
        c = i.state.data;
      return c === void 0
        ? this.fetchQuery(n)
        : (n.revalidateIfStale &&
            i.isStaleByTime(vs(r.staleTime, i)) &&
            this.prefetchQuery(r),
          Promise.resolve(c));
    }
    getQueriesData(n) {
      return this.#t.findAll(n).map(({ queryKey: r, state: i }) => {
        const c = i.data;
        return [r, c];
      });
    }
    setQueryData(n, r, i) {
      const c = this.defaultQueryOptions({ queryKey: n }),
        f = this.#t.get(c.queryHash)?.state.data,
        h = M1(r, f);
      if (h !== void 0)
        return this.#t.build(this, c).setData(h, { ...i, manual: !0 });
    }
    setQueriesData(n, r, i) {
      return Fe.batch(() =>
        this.#t
          .findAll(n)
          .map(({ queryKey: c }) => [c, this.setQueryData(c, r, i)]),
      );
    }
    getQueryState(n) {
      const r = this.defaultQueryOptions({ queryKey: n });
      return this.#t.get(r.queryHash)?.state;
    }
    removeQueries(n) {
      const r = this.#t;
      Fe.batch(() => {
        r.findAll(n).forEach((i) => {
          r.remove(i);
        });
      });
    }
    resetQueries(n, r) {
      const i = this.#t;
      return Fe.batch(
        () => (
          i.findAll(n).forEach((c) => {
            c.reset();
          }),
          this.refetchQueries({ type: "active", ...n }, r)
        ),
      );
    }
    cancelQueries(n, r = {}) {
      const i = { revert: !0, ...r },
        c = Fe.batch(() => this.#t.findAll(n).map((d) => d.cancel(i)));
      return Promise.all(c).then(gt).catch(gt);
    }
    invalidateQueries(n, r = {}) {
      return Fe.batch(
        () => (
          this.#t.findAll(n).forEach((i) => {
            i.invalidate();
          }),
          n?.refetchType === "none"
            ? Promise.resolve()
            : this.refetchQueries(
                { ...n, type: n?.refetchType ?? n?.type ?? "active" },
                r,
              )
        ),
      );
    }
    refetchQueries(n, r = {}) {
      const i = { ...r, cancelRefetch: r.cancelRefetch ?? !0 },
        c = Fe.batch(() =>
          this.#t
            .findAll(n)
            .filter((d) => !d.isDisabled() && !d.isStatic())
            .map((d) => {
              let f = d.fetch(void 0, i);
              return (
                i.throwOnError || (f = f.catch(gt)),
                d.state.fetchStatus === "paused" ? Promise.resolve() : f
              );
            }),
        );
      return Promise.all(c).then(gt);
    }
    fetchQuery(n) {
      const r = this.defaultQueryOptions(n);
      r.retry === void 0 && (r.retry = !1);
      const i = this.#t.build(this, r);
      return i.isStaleByTime(vs(r.staleTime, i))
        ? i.fetch(r)
        : Promise.resolve(i.state.data);
    }
    prefetchQuery(n) {
      return this.fetchQuery(n).then(gt).catch(gt);
    }
    fetchInfiniteQuery(n) {
      return ((n._type = "infinite"), this.fetchQuery(n));
    }
    prefetchInfiniteQuery(n) {
      return this.fetchInfiniteQuery(n).then(gt).catch(gt);
    }
    ensureInfiniteQueryData(n) {
      return ((n._type = "infinite"), this.ensureQueryData(n));
    }
    resumePausedMutations() {
      return Li.isOnline()
        ? this.#e.resumePausedMutations()
        : Promise.resolve();
    }
    getQueryCache() {
      return this.#t;
    }
    getMutationCache() {
      return this.#e;
    }
    getDefaultOptions() {
      return this.#n;
    }
    setDefaultOptions(n) {
      this.#n = n;
    }
    setQueryDefaults(n, r) {
      this.#s.set(Zs(n), { queryKey: n, defaultOptions: r });
    }
    getQueryDefaults(n) {
      const r = [...this.#s.values()],
        i = {};
      return (
        r.forEach((c) => {
          Ir(n, c.queryKey) && Object.assign(i, c.defaultOptions);
        }),
        i
      );
    }
    setMutationDefaults(n, r) {
      this.#a.set(Zs(n), { mutationKey: n, defaultOptions: r });
    }
    getMutationDefaults(n) {
      const r = [...this.#a.values()],
        i = {};
      return (
        r.forEach((c) => {
          Ir(n, c.mutationKey) && Object.assign(i, c.defaultOptions);
        }),
        i
      );
    }
    defaultQueryOptions(n) {
      if (n._defaulted) return n;
      const r = {
        ...this.#n.queries,
        ...this.getQueryDefaults(n.queryKey),
        ...n,
        _defaulted: !0,
      };
      return (
        r.queryHash || (r.queryHash = cd(r.queryKey, r)),
        r.refetchOnReconnect === void 0 &&
          (r.refetchOnReconnect = r.networkMode !== "always"),
        r.throwOnError === void 0 && (r.throwOnError = !!r.suspense),
        !r.networkMode && r.persister && (r.networkMode = "offlineFirst"),
        r.queryFn === dd && (r.enabled = !1),
        r
      );
    }
    defaultMutationOptions(n) {
      return n?._defaulted
        ? n
        : {
            ...this.#n.mutations,
            ...(n?.mutationKey && this.getMutationDefaults(n.mutationKey)),
            ...n,
            _defaulted: !0,
          };
    }
    clear() {
      (this.#t.clear(), this.#e.clear());
    }
  },
  lg = j.createContext(void 0),
  vn = (n) => {
    const r = j.useContext(lg);
    if (!r)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return r;
  },
  W1 = ({ client: n, children: r }) => (
    j.useEffect(
      () => (
        n.mount(),
        () => {
          n.unmount();
        }
      ),
      [n],
    ),
    l.jsx(lg.Provider, { value: n, children: r })
  ),
  ig = j.createContext(!1),
  og = () => j.useContext(ig);
ig.Provider;
function ej() {
  let n = !1;
  return {
    clearReset: () => {
      n = !1;
    },
    reset: () => {
      n = !0;
    },
    isReset: () => n,
  };
}
var tj = j.createContext(ej()),
  cg = () => j.useContext(tj),
  ug = (n, r, i) => {
    const c =
      i?.state.error && typeof n.throwOnError == "function"
        ? fd(n.throwOnError, [i.state.error, i])
        : n.throwOnError;
    (n.suspense || n.experimental_prefetchInRender || c) &&
      (r.isReset() || (n.retryOnMount = !1));
  },
  dg = (n) => {
    j.useEffect(() => {
      n.clearReset();
    }, [n]);
  },
  fg = ({
    result: n,
    errorResetBoundary: r,
    throwOnError: i,
    query: c,
    suspense: d,
  }) =>
    n.isError &&
    !r.isReset() &&
    !n.isFetching &&
    c &&
    ((d && n.data === void 0) || fd(i, [n.error, c])),
  hg = (n) => {
    if (n.suspense) {
      const i = (d) => (d === "static" ? d : Math.max(d ?? 1e3, 1e3)),
        c = n.staleTime;
      ((n.staleTime = typeof c == "function" ? (...d) => i(c(...d)) : i(c)),
        typeof n.gcTime == "number" && (n.gcTime = Math.max(n.gcTime, 1e3)));
    }
  },
  nj = (n, r) => n.isLoading && n.isFetching && !r,
  Qu = (n, r) => n?.suspense && r.isPending,
  Pu = (n, r, i) =>
    r.fetchOptimistic(n).catch(() => {
      i.clearReset();
    });
function sj({ queries: n, ...r }, i) {
  const c = vn(),
    d = og(),
    f = cg(),
    h = j.useMemo(
      () =>
        n.map((S) => {
          const C = c.defaultQueryOptions(S);
          return ((C._optimisticResults = d ? "isRestoring" : "optimistic"), C);
        }),
      [n, c, d],
    );
  (h.forEach((S) => {
    hg(S);
    const C = c.getQueryCache().get(S.queryHash);
    ug(S, f, C);
  }),
    dg(f));
  const [x] = j.useState(() => new $1(c, h, r)),
    [m, p, v] = x.getOptimisticResult(h, r.combine),
    y = !d && r.subscribed !== !1;
  (j.useSyncExternalStore(
    j.useCallback((S) => (y ? x.subscribe(Fe.batchCalls(S)) : gt), [x, y]),
    () => x.getCurrentResult(),
    () => x.getCurrentResult(),
  ),
    j.useEffect(() => {
      x.setQueries(h, r);
    }, [h, r, x]));
  const T = m.some((S, C) => Qu(h[C], S))
    ? m.flatMap((S, C) => {
        const A = h[C];
        if (A && Qu(A, S)) {
          const U = new hd(c, A);
          return Pu(A, U, f);
        }
        return [];
      })
    : [];
  if (T.length > 0) throw Promise.all(T);
  const R = m.find((S, C) => {
    const A = h[C];
    return (
      A &&
      fg({
        result: S,
        errorResetBoundary: f,
        throwOnError: A.throwOnError,
        query: c.getQueryCache().get(A.queryHash),
        suspense: A.suspense,
      })
    );
  });
  if (R?.error) throw R.error;
  return p(v());
}
function aj(n, r, i) {
  const c = og(),
    d = cg(),
    f = vn(),
    h = f.defaultQueryOptions(n);
  f.getDefaultOptions().queries?._experimental_beforeQuery?.(h);
  const x = f.getQueryCache().get(h.queryHash);
  ((h._optimisticResults = c ? "isRestoring" : "optimistic"),
    hg(h),
    ug(h, d, x),
    dg(d));
  const m = !f.getQueryCache().get(h.queryHash),
    [p] = j.useState(() => new r(f, h)),
    v = p.getOptimisticResult(h),
    y = !c && n.subscribed !== !1;
  if (
    (j.useSyncExternalStore(
      j.useCallback(
        (N) => {
          const T = y ? p.subscribe(Fe.batchCalls(N)) : gt;
          return (p.updateResult(), T);
        },
        [p, y],
      ),
      () => p.getCurrentResult(),
      () => p.getCurrentResult(),
    ),
    j.useEffect(() => {
      p.setOptions(h);
    }, [h, p]),
    Qu(h, v))
  )
    throw Pu(h, p, d);
  if (
    fg({
      result: v,
      errorResetBoundary: d,
      throwOnError: h.throwOnError,
      query: x,
      suspense: h.suspense,
    })
  )
    throw v.error;
  return (
    f.getDefaultOptions().queries?._experimental_afterQuery?.(h, v),
    h.experimental_prefetchInRender &&
      !el.isServer() &&
      nj(v, c) &&
      (m ? Pu(h, p, d) : x?.promise)?.catch(gt).finally(() => {
        p.updateResult();
      }),
    h.notifyOnChangeProps ? v : p.trackResult(v)
  );
}
function at(n, r) {
  return aj(n, hd);
}
function qn(n, r) {
  const i = vn(),
    [c] = j.useState(() => new F1(i, n));
  j.useEffect(() => {
    c.setOptions(n);
  }, [c, n]);
  const d = j.useSyncExternalStore(
      j.useCallback((h) => c.subscribe(Fe.batchCalls(h)), [c]),
      () => c.getCurrentResult(),
      () => c.getCurrentResult(),
    ),
    f = j.useCallback(
      (h, x) => {
        c.mutate(h, x).catch(gt);
      },
      [c],
    );
  if (d.error && fd(c.options.throwOnError, [d.error])) throw d.error;
  return { ...d, mutate: f, mutateAsync: d.mutate };
}
const rj = 1,
  lj = 1e6;
let Su = 0;
function ij() {
  return ((Su = (Su + 1) % Number.MAX_SAFE_INTEGER), Su.toString());
}
const Eu = new Map(),
  ox = (n) => {
    if (Eu.has(n)) return;
    const r = setTimeout(() => {
      (Eu.delete(n), Jr({ type: "REMOVE_TOAST", toastId: n }));
    }, lj);
    Eu.set(n, r);
  },
  oj = (n, r) => {
    switch (r.type) {
      case "ADD_TOAST":
        return { ...n, toasts: [r.toast, ...n.toasts].slice(0, rj) };
      case "UPDATE_TOAST":
        return {
          ...n,
          toasts: n.toasts.map((i) =>
            i.id === r.toast.id ? { ...i, ...r.toast } : i,
          ),
        };
      case "DISMISS_TOAST": {
        const { toastId: i } = r;
        return (
          i
            ? ox(i)
            : n.toasts.forEach((c) => {
                ox(c.id);
              }),
          {
            ...n,
            toasts: n.toasts.map((c) =>
              c.id === i || i === void 0 ? { ...c, open: !1 } : c,
            ),
          }
        );
      }
      case "REMOVE_TOAST":
        return r.toastId === void 0
          ? { ...n, toasts: [] }
          : { ...n, toasts: n.toasts.filter((i) => i.id !== r.toastId) };
    }
  },
  ki = [];
let Di = { toasts: [] };
function Jr(n) {
  ((Di = oj(Di, n)),
    ki.forEach((r) => {
      r(Di);
    }));
}
function cj({ ...n }) {
  const r = ij(),
    i = (d) => Jr({ type: "UPDATE_TOAST", toast: { ...d, id: r } }),
    c = () => Jr({ type: "DISMISS_TOAST", toastId: r });
  return (
    Jr({
      type: "ADD_TOAST",
      toast: {
        ...n,
        id: r,
        open: !0,
        onOpenChange: (d) => {
          d || c();
        },
      },
    }),
    { id: r, dismiss: c, update: i }
  );
}
function Es() {
  const [n, r] = j.useState(Di);
  return (
    j.useEffect(
      () => (
        ki.push(r),
        () => {
          const i = ki.indexOf(r);
          i > -1 && ki.splice(i, 1);
        }
      ),
      [n],
    ),
    {
      ...n,
      toast: cj,
      dismiss: (i) => Jr({ type: "DISMISS_TOAST", toastId: i }),
    }
  );
}
var Xi = Px();
const uj = Qx(Xi);
function He(n, r, { checkForDefaultPrevented: i = !0 } = {}) {
  return function (d) {
    if ((n?.(d), i === !1 || !d.defaultPrevented)) return r?.(d);
  };
}
function cx(n, r) {
  if (typeof n == "function") return n(r);
  n != null && (n.current = r);
}
function pd(...n) {
  return (r) => {
    let i = !1;
    const c = n.map((d) => {
      const f = cx(d, r);
      return (!i && typeof f == "function" && (i = !0), f);
    });
    if (i)
      return () => {
        for (let d = 0; d < c.length; d++) {
          const f = c[d];
          typeof f == "function" ? f() : cx(n[d], null);
        }
      };
  };
}
function It(...n) {
  return j.useCallback(pd(...n), n);
}
function Xa(n, r = []) {
  let i = [];
  function c(f, h) {
    const x = j.createContext(h),
      m = i.length;
    i = [...i, h];
    const p = (y) => {
      const { scope: N, children: T, ...R } = y,
        S = N?.[n]?.[m] || x,
        C = j.useMemo(() => R, Object.values(R));
      return l.jsx(S.Provider, { value: C, children: T });
    };
    p.displayName = f + "Provider";
    function v(y, N) {
      const T = N?.[n]?.[m] || x,
        R = j.useContext(T);
      if (R) return R;
      if (h !== void 0) return h;
      throw new Error(`\`${y}\` must be used within \`${f}\``);
    }
    return [p, v];
  }
  const d = () => {
    const f = i.map((h) => j.createContext(h));
    return function (x) {
      const m = x?.[n] || f;
      return j.useMemo(() => ({ [`__scope${n}`]: { ...x, [n]: m } }), [x, m]);
    };
  };
  return ((d.scopeName = n), [c, dj(d, ...r)]);
}
function dj(...n) {
  const r = n[0];
  if (n.length === 1) return r;
  const i = () => {
    const c = n.map((d) => ({ useScope: d(), scopeName: d.scopeName }));
    return function (f) {
      const h = c.reduce((x, { useScope: m, scopeName: p }) => {
        const y = m(f)[`__scope${p}`];
        return { ...x, ...y };
      }, {});
      return j.useMemo(() => ({ [`__scope${r.scopeName}`]: h }), [h]);
    };
  };
  return ((i.scopeName = r.scopeName), i);
}
function Yu(n) {
  const r = fj(n),
    i = j.forwardRef((c, d) => {
      const { children: f, ...h } = c,
        x = j.Children.toArray(f),
        m = x.find(mj);
      if (m) {
        const p = m.props.children,
          v = x.map((y) =>
            y === m
              ? j.Children.count(p) > 1
                ? j.Children.only(null)
                : j.isValidElement(p)
                  ? p.props.children
                  : null
              : y,
          );
        return l.jsx(r, {
          ...h,
          ref: d,
          children: j.isValidElement(p) ? j.cloneElement(p, void 0, v) : null,
        });
      }
      return l.jsx(r, { ...h, ref: d, children: f });
    });
  return ((i.displayName = `${n}.Slot`), i);
}
function fj(n) {
  const r = j.forwardRef((i, c) => {
    const { children: d, ...f } = i;
    if (j.isValidElement(d)) {
      const h = xj(d),
        x = pj(f, d.props);
      return (
        d.type !== j.Fragment && (x.ref = c ? pd(c, h) : h),
        j.cloneElement(d, x)
      );
    }
    return j.Children.count(d) > 1 ? j.Children.only(null) : null;
  });
  return ((r.displayName = `${n}.SlotClone`), r);
}
var mg = Symbol("radix.slottable");
function hj(n) {
  const r = ({ children: i }) => l.jsx(l.Fragment, { children: i });
  return ((r.displayName = `${n}.Slottable`), (r.__radixId = mg), r);
}
function mj(n) {
  return (
    j.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === mg
  );
}
function pj(n, r) {
  const i = { ...r };
  for (const c in r) {
    const d = n[c],
      f = r[c];
    /^on[A-Z]/.test(c)
      ? d && f
        ? (i[c] = (...x) => {
            const m = f(...x);
            return (d(...x), m);
          })
        : d && (i[c] = d)
      : c === "style"
        ? (i[c] = { ...d, ...f })
        : c === "className" && (i[c] = [d, f].filter(Boolean).join(" "));
  }
  return { ...n, ...i };
}
function xj(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? n.ref
    : ((r = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? n.props.ref : n.props.ref || n.ref);
}
function pg(n) {
  const r = n + "CollectionProvider",
    [i, c] = Xa(r),
    [d, f] = i(r, { collectionRef: { current: null }, itemMap: new Map() }),
    h = (S) => {
      const { scope: C, children: A } = S,
        U = ys.useRef(null),
        z = ys.useRef(new Map()).current;
      return l.jsx(d, { scope: C, itemMap: z, collectionRef: U, children: A });
    };
  h.displayName = r;
  const x = n + "CollectionSlot",
    m = Yu(x),
    p = ys.forwardRef((S, C) => {
      const { scope: A, children: U } = S,
        z = f(x, A),
        H = It(C, z.collectionRef);
      return l.jsx(m, { ref: H, children: U });
    });
  p.displayName = x;
  const v = n + "CollectionItemSlot",
    y = "data-radix-collection-item",
    N = Yu(v),
    T = ys.forwardRef((S, C) => {
      const { scope: A, children: U, ...z } = S,
        H = ys.useRef(null),
        V = It(C, H),
        F = f(v, A);
      return (
        ys.useEffect(
          () => (
            F.itemMap.set(H, { ref: H, ...z }),
            () => {
              F.itemMap.delete(H);
            }
          ),
        ),
        l.jsx(N, { [y]: "", ref: V, children: U })
      );
    });
  T.displayName = v;
  function R(S) {
    const C = f(n + "CollectionConsumer", S);
    return ys.useCallback(() => {
      const U = C.collectionRef.current;
      if (!U) return [];
      const z = Array.from(U.querySelectorAll(`[${y}]`));
      return Array.from(C.itemMap.values()).sort(
        (F, Z) => z.indexOf(F.ref.current) - z.indexOf(Z.ref.current),
      );
    }, [C.collectionRef, C.itemMap]);
  }
  return [{ Provider: h, Slot: p, ItemSlot: T }, R, c];
}
var gj = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  We = gj.reduce((n, r) => {
    const i = Yu(`Primitive.${r}`),
      c = j.forwardRef((d, f) => {
        const { asChild: h, ...x } = d,
          m = h ? i : r;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          l.jsx(m, { ...x, ref: f })
        );
      });
    return ((c.displayName = `Primitive.${r}`), { ...n, [r]: c });
  }, {});
function xg(n, r) {
  n && Xi.flushSync(() => n.dispatchEvent(r));
}
function Hn(n) {
  const r = j.useRef(n);
  return (
    j.useEffect(() => {
      r.current = n;
    }),
    j.useMemo(
      () =>
        (...i) =>
          r.current?.(...i),
      [],
    )
  );
}
function yj(n, r = globalThis?.document) {
  const i = Hn(n);
  j.useEffect(() => {
    const c = (d) => {
      d.key === "Escape" && i(d);
    };
    return (
      r.addEventListener("keydown", c, { capture: !0 }),
      () => r.removeEventListener("keydown", c, { capture: !0 })
    );
  }, [i, r]);
}
var vj = "DismissableLayer",
  Vu = "dismissableLayer.update",
  bj = "dismissableLayer.pointerDownOutside",
  jj = "dismissableLayer.focusOutside",
  ux,
  gg = j.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  xd = j.forwardRef((n, r) => {
    const {
        disableOutsidePointerEvents: i = !1,
        onEscapeKeyDown: c,
        onPointerDownOutside: d,
        onFocusOutside: f,
        onInteractOutside: h,
        onDismiss: x,
        ...m
      } = n,
      p = j.useContext(gg),
      [v, y] = j.useState(null),
      N = v?.ownerDocument ?? globalThis?.document,
      [, T] = j.useState({}),
      R = It(r, (Z) => y(Z)),
      S = Array.from(p.layers),
      [C] = [...p.layersWithOutsidePointerEventsDisabled].slice(-1),
      A = S.indexOf(C),
      U = v ? S.indexOf(v) : -1,
      z = p.layersWithOutsidePointerEventsDisabled.size > 0,
      H = U >= A,
      V = wj((Z) => {
        const G = Z.target,
          re = [...p.branches].some((he) => he.contains(G));
        !H || re || (d?.(Z), h?.(Z), Z.defaultPrevented || x?.());
      }, N),
      F = Sj((Z) => {
        const G = Z.target;
        [...p.branches].some((he) => he.contains(G)) ||
          (f?.(Z), h?.(Z), Z.defaultPrevented || x?.());
      }, N);
    return (
      yj((Z) => {
        U === p.layers.size - 1 &&
          (c?.(Z), !Z.defaultPrevented && x && (Z.preventDefault(), x()));
      }, N),
      j.useEffect(() => {
        if (v)
          return (
            i &&
              (p.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((ux = N.body.style.pointerEvents),
                (N.body.style.pointerEvents = "none")),
              p.layersWithOutsidePointerEventsDisabled.add(v)),
            p.layers.add(v),
            dx(),
            () => {
              i &&
                p.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (N.body.style.pointerEvents = ux);
            }
          );
      }, [v, N, i, p]),
      j.useEffect(
        () => () => {
          v &&
            (p.layers.delete(v),
            p.layersWithOutsidePointerEventsDisabled.delete(v),
            dx());
        },
        [v, p],
      ),
      j.useEffect(() => {
        const Z = () => T({});
        return (
          document.addEventListener(Vu, Z),
          () => document.removeEventListener(Vu, Z)
        );
      }, []),
      l.jsx(We.div, {
        ...m,
        ref: R,
        style: {
          pointerEvents: z ? (H ? "auto" : "none") : void 0,
          ...n.style,
        },
        onFocusCapture: He(n.onFocusCapture, F.onFocusCapture),
        onBlurCapture: He(n.onBlurCapture, F.onBlurCapture),
        onPointerDownCapture: He(
          n.onPointerDownCapture,
          V.onPointerDownCapture,
        ),
      })
    );
  });
xd.displayName = vj;
var Nj = "DismissableLayerBranch",
  yg = j.forwardRef((n, r) => {
    const i = j.useContext(gg),
      c = j.useRef(null),
      d = It(r, c);
    return (
      j.useEffect(() => {
        const f = c.current;
        if (f)
          return (
            i.branches.add(f),
            () => {
              i.branches.delete(f);
            }
          );
      }, [i.branches]),
      l.jsx(We.div, { ...n, ref: d })
    );
  });
yg.displayName = Nj;
function wj(n, r = globalThis?.document) {
  const i = Hn(n),
    c = j.useRef(!1),
    d = j.useRef(() => {});
  return (
    j.useEffect(() => {
      const f = (x) => {
          if (x.target && !c.current) {
            let m = function () {
              vg(bj, i, p, { discrete: !0 });
            };
            const p = { originalEvent: x };
            x.pointerType === "touch"
              ? (r.removeEventListener("click", d.current),
                (d.current = m),
                r.addEventListener("click", d.current, { once: !0 }))
              : m();
          } else r.removeEventListener("click", d.current);
          c.current = !1;
        },
        h = window.setTimeout(() => {
          r.addEventListener("pointerdown", f);
        }, 0);
      return () => {
        (window.clearTimeout(h),
          r.removeEventListener("pointerdown", f),
          r.removeEventListener("click", d.current));
      };
    }, [r, i]),
    { onPointerDownCapture: () => (c.current = !0) }
  );
}
function Sj(n, r = globalThis?.document) {
  const i = Hn(n),
    c = j.useRef(!1);
  return (
    j.useEffect(() => {
      const d = (f) => {
        f.target &&
          !c.current &&
          vg(jj, i, { originalEvent: f }, { discrete: !1 });
      };
      return (
        r.addEventListener("focusin", d),
        () => r.removeEventListener("focusin", d)
      );
    }, [r, i]),
    {
      onFocusCapture: () => (c.current = !0),
      onBlurCapture: () => (c.current = !1),
    }
  );
}
function dx() {
  const n = new CustomEvent(Vu);
  document.dispatchEvent(n);
}
function vg(n, r, i, { discrete: c }) {
  const d = i.originalEvent.target,
    f = new CustomEvent(n, { bubbles: !1, cancelable: !0, detail: i });
  (r && d.addEventListener(n, r, { once: !0 }),
    c ? xg(d, f) : d.dispatchEvent(f));
}
var Ej = xd,
  Tj = yg,
  Bn = globalThis?.document ? j.useLayoutEffect : () => {},
  Aj = "Portal",
  gd = j.forwardRef((n, r) => {
    const { container: i, ...c } = n,
      [d, f] = j.useState(!1);
    Bn(() => f(!0), []);
    const h = i || (d && globalThis?.document?.body);
    return h ? uj.createPortal(l.jsx(We.div, { ...c, ref: r }), h) : null;
  });
gd.displayName = Aj;
function Rj(n, r) {
  return j.useReducer((i, c) => r[i][c] ?? i, n);
}
var sl = (n) => {
  const { present: r, children: i } = n,
    c = Cj(r),
    d =
      typeof i == "function" ? i({ present: c.isPresent }) : j.Children.only(i),
    f = It(c.ref, Oj(d));
  return typeof i == "function" || c.isPresent
    ? j.cloneElement(d, { ref: f })
    : null;
};
sl.displayName = "Presence";
function Cj(n) {
  const [r, i] = j.useState(),
    c = j.useRef(null),
    d = j.useRef(n),
    f = j.useRef("none"),
    h = n ? "mounted" : "unmounted",
    [x, m] = Rj(h, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    j.useEffect(() => {
      const p = Ti(c.current);
      f.current = x === "mounted" ? p : "none";
    }, [x]),
    Bn(() => {
      const p = c.current,
        v = d.current;
      if (v !== n) {
        const N = f.current,
          T = Ti(p);
        (n
          ? m("MOUNT")
          : T === "none" || p?.display === "none"
            ? m("UNMOUNT")
            : m(v && N !== T ? "ANIMATION_OUT" : "UNMOUNT"),
          (d.current = n));
      }
    }, [n, m]),
    Bn(() => {
      if (r) {
        let p;
        const v = r.ownerDocument.defaultView ?? window,
          y = (T) => {
            const S = Ti(c.current).includes(CSS.escape(T.animationName));
            if (T.target === r && S && (m("ANIMATION_END"), !d.current)) {
              const C = r.style.animationFillMode;
              ((r.style.animationFillMode = "forwards"),
                (p = v.setTimeout(() => {
                  r.style.animationFillMode === "forwards" &&
                    (r.style.animationFillMode = C);
                })));
            }
          },
          N = (T) => {
            T.target === r && (f.current = Ti(c.current));
          };
        return (
          r.addEventListener("animationstart", N),
          r.addEventListener("animationcancel", y),
          r.addEventListener("animationend", y),
          () => {
            (v.clearTimeout(p),
              r.removeEventListener("animationstart", N),
              r.removeEventListener("animationcancel", y),
              r.removeEventListener("animationend", y));
          }
        );
      } else m("ANIMATION_END");
    }, [r, m]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(x),
      ref: j.useCallback((p) => {
        ((c.current = p ? getComputedStyle(p) : null), i(p));
      }, []),
    }
  );
}
function Ti(n) {
  return n?.animationName || "none";
}
function Oj(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? n.ref
    : ((r = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? n.props.ref : n.props.ref || n.ref);
}
var Mj = Vi[" useInsertionEffect ".trim().toString()] || Bn;
function yd({ prop: n, defaultProp: r, onChange: i = () => {}, caller: c }) {
  const [d, f, h] = _j({ defaultProp: r, onChange: i }),
    x = n !== void 0,
    m = x ? n : d;
  {
    const v = j.useRef(n !== void 0);
    j.useEffect(() => {
      const y = v.current;
      (y !== x &&
        console.warn(
          `${c} is changing from ${y ? "controlled" : "uncontrolled"} to ${x ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (v.current = x));
    }, [x, c]);
  }
  const p = j.useCallback(
    (v) => {
      if (x) {
        const y = kj(v) ? v(n) : v;
        y !== n && h.current?.(y);
      } else f(v);
    },
    [x, n, f, h],
  );
  return [m, p];
}
function _j({ defaultProp: n, onChange: r }) {
  const [i, c] = j.useState(n),
    d = j.useRef(i),
    f = j.useRef(r);
  return (
    Mj(() => {
      f.current = r;
    }, [r]),
    j.useEffect(() => {
      d.current !== i && (f.current?.(i), (d.current = i));
    }, [i, d]),
    [i, c, f]
  );
}
function kj(n) {
  return typeof n == "function";
}
var Dj = Object.freeze({
    position: "absolute",
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
  }),
  zj = "VisuallyHidden",
  Fi = j.forwardRef((n, r) =>
    l.jsx(We.span, { ...n, ref: r, style: { ...Dj, ...n.style } }),
  );
Fi.displayName = zj;
var Lj = Fi,
  vd = "ToastProvider",
  [bd, Uj, qj] = pg("Toast"),
  [bg] = Xa("Toast", [qj]),
  [Hj, Zi] = bg(vd),
  jg = (n) => {
    const {
        __scopeToast: r,
        label: i = "Notification",
        duration: c = 5e3,
        swipeDirection: d = "right",
        swipeThreshold: f = 50,
        children: h,
      } = n,
      [x, m] = j.useState(null),
      [p, v] = j.useState(0),
      y = j.useRef(!1),
      N = j.useRef(!1);
    return (
      i.trim() ||
        console.error(
          `Invalid prop \`label\` supplied to \`${vd}\`. Expected non-empty \`string\`.`,
        ),
      l.jsx(bd.Provider, {
        scope: r,
        children: l.jsx(Hj, {
          scope: r,
          label: i,
          duration: c,
          swipeDirection: d,
          swipeThreshold: f,
          toastCount: p,
          viewport: x,
          onViewportChange: m,
          onToastAdd: j.useCallback(() => v((T) => T + 1), []),
          onToastRemove: j.useCallback(() => v((T) => T - 1), []),
          isFocusedToastEscapeKeyDownRef: y,
          isClosePausedRef: N,
          children: h,
        }),
      })
    );
  };
jg.displayName = vd;
var Ng = "ToastViewport",
  Bj = ["F8"],
  Ku = "toast.viewportPause",
  Xu = "toast.viewportResume",
  wg = j.forwardRef((n, r) => {
    const {
        __scopeToast: i,
        hotkey: c = Bj,
        label: d = "Notifications ({hotkey})",
        ...f
      } = n,
      h = Zi(Ng, i),
      x = Uj(i),
      m = j.useRef(null),
      p = j.useRef(null),
      v = j.useRef(null),
      y = j.useRef(null),
      N = It(r, y, h.onViewportChange),
      T = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""),
      R = h.toastCount > 0;
    (j.useEffect(() => {
      const C = (A) => {
        c.length !== 0 &&
          c.every((z) => A[z] || A.code === z) &&
          y.current?.focus();
      };
      return (
        document.addEventListener("keydown", C),
        () => document.removeEventListener("keydown", C)
      );
    }, [c]),
      j.useEffect(() => {
        const C = m.current,
          A = y.current;
        if (R && C && A) {
          const U = () => {
              if (!h.isClosePausedRef.current) {
                const F = new CustomEvent(Ku);
                (A.dispatchEvent(F), (h.isClosePausedRef.current = !0));
              }
            },
            z = () => {
              if (h.isClosePausedRef.current) {
                const F = new CustomEvent(Xu);
                (A.dispatchEvent(F), (h.isClosePausedRef.current = !1));
              }
            },
            H = (F) => {
              !C.contains(F.relatedTarget) && z();
            },
            V = () => {
              C.contains(document.activeElement) || z();
            };
          return (
            C.addEventListener("focusin", U),
            C.addEventListener("focusout", H),
            C.addEventListener("pointermove", U),
            C.addEventListener("pointerleave", V),
            window.addEventListener("blur", U),
            window.addEventListener("focus", z),
            () => {
              (C.removeEventListener("focusin", U),
                C.removeEventListener("focusout", H),
                C.removeEventListener("pointermove", U),
                C.removeEventListener("pointerleave", V),
                window.removeEventListener("blur", U),
                window.removeEventListener("focus", z));
            }
          );
        }
      }, [R, h.isClosePausedRef]));
    const S = j.useCallback(
      ({ tabbingDirection: C }) => {
        const U = x().map((z) => {
          const H = z.ref.current,
            V = [H, ...Wj(H)];
          return C === "forwards" ? V : V.reverse();
        });
        return (C === "forwards" ? U.reverse() : U).flat();
      },
      [x],
    );
    return (
      j.useEffect(() => {
        const C = y.current;
        if (C) {
          const A = (U) => {
            const z = U.altKey || U.ctrlKey || U.metaKey;
            if (U.key === "Tab" && !z) {
              const V = document.activeElement,
                F = U.shiftKey;
              if (U.target === C && F) {
                p.current?.focus();
                return;
              }
              const re = S({ tabbingDirection: F ? "backwards" : "forwards" }),
                he = re.findIndex((me) => me === V);
              Tu(re.slice(he + 1))
                ? U.preventDefault()
                : F
                  ? p.current?.focus()
                  : v.current?.focus();
            }
          };
          return (
            C.addEventListener("keydown", A),
            () => C.removeEventListener("keydown", A)
          );
        }
      }, [x, S]),
      l.jsxs(Tj, {
        ref: m,
        role: "region",
        "aria-label": d.replace("{hotkey}", T),
        tabIndex: -1,
        style: { pointerEvents: R ? void 0 : "none" },
        children: [
          R &&
            l.jsx(Fu, {
              ref: p,
              onFocusFromOutsideViewport: () => {
                const C = S({ tabbingDirection: "forwards" });
                Tu(C);
              },
            }),
          l.jsx(bd.Slot, {
            scope: i,
            children: l.jsx(We.ol, { tabIndex: -1, ...f, ref: N }),
          }),
          R &&
            l.jsx(Fu, {
              ref: v,
              onFocusFromOutsideViewport: () => {
                const C = S({ tabbingDirection: "backwards" });
                Tu(C);
              },
            }),
        ],
      })
    );
  });
wg.displayName = Ng;
var Sg = "ToastFocusProxy",
  Fu = j.forwardRef((n, r) => {
    const { __scopeToast: i, onFocusFromOutsideViewport: c, ...d } = n,
      f = Zi(Sg, i);
    return l.jsx(Fi, {
      tabIndex: 0,
      ...d,
      ref: r,
      style: { position: "fixed" },
      onFocus: (h) => {
        const x = h.relatedTarget;
        !f.viewport?.contains(x) && c();
      },
    });
  });
Fu.displayName = Sg;
var al = "Toast",
  Gj = "toast.swipeStart",
  Qj = "toast.swipeMove",
  Pj = "toast.swipeCancel",
  Yj = "toast.swipeEnd",
  Eg = j.forwardRef((n, r) => {
    const { forceMount: i, open: c, defaultOpen: d, onOpenChange: f, ...h } = n,
      [x, m] = yd({ prop: c, defaultProp: d ?? !0, onChange: f, caller: al });
    return l.jsx(sl, {
      present: i || x,
      children: l.jsx(Xj, {
        open: x,
        ...h,
        ref: r,
        onClose: () => m(!1),
        onPause: Hn(n.onPause),
        onResume: Hn(n.onResume),
        onSwipeStart: He(n.onSwipeStart, (p) => {
          p.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: He(n.onSwipeMove, (p) => {
          const { x: v, y } = p.detail.delta;
          (p.currentTarget.setAttribute("data-swipe", "move"),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-x",
              `${v}px`,
            ),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-move-y",
              `${y}px`,
            ));
        }),
        onSwipeCancel: He(n.onSwipeCancel, (p) => {
          (p.currentTarget.setAttribute("data-swipe", "cancel"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-end-y"));
        }),
        onSwipeEnd: He(n.onSwipeEnd, (p) => {
          const { x: v, y } = p.detail.delta;
          (p.currentTarget.setAttribute("data-swipe", "end"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"),
            p.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-x",
              `${v}px`,
            ),
            p.currentTarget.style.setProperty(
              "--radix-toast-swipe-end-y",
              `${y}px`,
            ),
            m(!1));
        }),
      }),
    });
  });
Eg.displayName = al;
var [Vj, Kj] = bg(al, { onClose() {} }),
  Xj = j.forwardRef((n, r) => {
    const {
        __scopeToast: i,
        type: c = "foreground",
        duration: d,
        open: f,
        onClose: h,
        onEscapeKeyDown: x,
        onPause: m,
        onResume: p,
        onSwipeStart: v,
        onSwipeMove: y,
        onSwipeCancel: N,
        onSwipeEnd: T,
        ...R
      } = n,
      S = Zi(al, i),
      [C, A] = j.useState(null),
      U = It(r, (I) => A(I)),
      z = j.useRef(null),
      H = j.useRef(null),
      V = d || S.duration,
      F = j.useRef(0),
      Z = j.useRef(V),
      G = j.useRef(0),
      { onToastAdd: re, onToastRemove: he } = S,
      me = Hn(() => {
        (C?.contains(document.activeElement) && S.viewport?.focus(), h());
      }),
      ue = j.useCallback(
        (I) => {
          !I ||
            I === 1 / 0 ||
            (window.clearTimeout(G.current),
            (F.current = new Date().getTime()),
            (G.current = window.setTimeout(me, I)));
        },
        [me],
      );
    (j.useEffect(() => {
      const I = S.viewport;
      if (I) {
        const de = () => {
            (ue(Z.current), p?.());
          },
          _ = () => {
            const K = new Date().getTime() - F.current;
            ((Z.current = Z.current - K),
              window.clearTimeout(G.current),
              m?.());
          };
        return (
          I.addEventListener(Ku, _),
          I.addEventListener(Xu, de),
          () => {
            (I.removeEventListener(Ku, _), I.removeEventListener(Xu, de));
          }
        );
      }
    }, [S.viewport, V, m, p, ue]),
      j.useEffect(() => {
        f && !S.isClosePausedRef.current && ue(V);
      }, [f, V, S.isClosePausedRef, ue]),
      j.useEffect(() => (re(), () => he()), [re, he]));
    const ye = j.useMemo(() => (C ? _g(C) : null), [C]);
    return S.viewport
      ? l.jsxs(l.Fragment, {
          children: [
            ye &&
              l.jsx(Fj, {
                __scopeToast: i,
                role: "status",
                "aria-live": c === "foreground" ? "assertive" : "polite",
                children: ye,
              }),
            l.jsx(Vj, {
              scope: i,
              onClose: me,
              children: Xi.createPortal(
                l.jsx(bd.ItemSlot, {
                  scope: i,
                  children: l.jsx(Ej, {
                    asChild: !0,
                    onEscapeKeyDown: He(x, () => {
                      (S.isFocusedToastEscapeKeyDownRef.current || me(),
                        (S.isFocusedToastEscapeKeyDownRef.current = !1));
                    }),
                    children: l.jsx(We.li, {
                      tabIndex: 0,
                      "data-state": f ? "open" : "closed",
                      "data-swipe-direction": S.swipeDirection,
                      ...R,
                      ref: U,
                      style: {
                        userSelect: "none",
                        touchAction: "none",
                        ...n.style,
                      },
                      onKeyDown: He(n.onKeyDown, (I) => {
                        I.key === "Escape" &&
                          (x?.(I.nativeEvent),
                          I.nativeEvent.defaultPrevented ||
                            ((S.isFocusedToastEscapeKeyDownRef.current = !0),
                            me()));
                      }),
                      onPointerDown: He(n.onPointerDown, (I) => {
                        I.button === 0 &&
                          (z.current = { x: I.clientX, y: I.clientY });
                      }),
                      onPointerMove: He(n.onPointerMove, (I) => {
                        if (!z.current) return;
                        const de = I.clientX - z.current.x,
                          _ = I.clientY - z.current.y,
                          K = !!H.current,
                          X = ["left", "right"].includes(S.swipeDirection),
                          le = ["left", "up"].includes(S.swipeDirection)
                            ? Math.min
                            : Math.max,
                          w = X ? le(0, de) : 0,
                          Y = X ? 0 : le(0, _),
                          J = I.pointerType === "touch" ? 10 : 2,
                          $ = { x: w, y: Y },
                          se = { originalEvent: I, delta: $ };
                        K
                          ? ((H.current = $), Ai(Qj, y, se, { discrete: !1 }))
                          : fx($, S.swipeDirection, J)
                            ? ((H.current = $),
                              Ai(Gj, v, se, { discrete: !1 }),
                              I.target.setPointerCapture(I.pointerId))
                            : (Math.abs(de) > J || Math.abs(_) > J) &&
                              (z.current = null);
                      }),
                      onPointerUp: He(n.onPointerUp, (I) => {
                        const de = H.current,
                          _ = I.target;
                        if (
                          (_.hasPointerCapture(I.pointerId) &&
                            _.releasePointerCapture(I.pointerId),
                          (H.current = null),
                          (z.current = null),
                          de)
                        ) {
                          const K = I.currentTarget,
                            X = { originalEvent: I, delta: de };
                          (fx(de, S.swipeDirection, S.swipeThreshold)
                            ? Ai(Yj, T, X, { discrete: !0 })
                            : Ai(Pj, N, X, { discrete: !0 }),
                            K.addEventListener(
                              "click",
                              (le) => le.preventDefault(),
                              { once: !0 },
                            ));
                        }
                      }),
                    }),
                  }),
                }),
                S.viewport,
              ),
            }),
          ],
        })
      : null;
  }),
  Fj = (n) => {
    const { __scopeToast: r, children: i, ...c } = n,
      d = Zi(al, r),
      [f, h] = j.useState(!1),
      [x, m] = j.useState(!1);
    return (
      Jj(() => h(!0)),
      j.useEffect(() => {
        const p = window.setTimeout(() => m(!0), 1e3);
        return () => window.clearTimeout(p);
      }, []),
      x
        ? null
        : l.jsx(gd, {
            asChild: !0,
            children: l.jsx(Fi, {
              ...c,
              children:
                f && l.jsxs(l.Fragment, { children: [d.label, " ", i] }),
            }),
          })
    );
  },
  Zj = "ToastTitle",
  Tg = j.forwardRef((n, r) => {
    const { __scopeToast: i, ...c } = n;
    return l.jsx(We.div, { ...c, ref: r });
  });
Tg.displayName = Zj;
var $j = "ToastDescription",
  Ag = j.forwardRef((n, r) => {
    const { __scopeToast: i, ...c } = n;
    return l.jsx(We.div, { ...c, ref: r });
  });
Ag.displayName = $j;
var Rg = "ToastAction",
  Cg = j.forwardRef((n, r) => {
    const { altText: i, ...c } = n;
    return i.trim()
      ? l.jsx(Mg, {
          altText: i,
          asChild: !0,
          children: l.jsx(jd, { ...c, ref: r }),
        })
      : (console.error(
          `Invalid prop \`altText\` supplied to \`${Rg}\`. Expected non-empty \`string\`.`,
        ),
        null);
  });
Cg.displayName = Rg;
var Og = "ToastClose",
  jd = j.forwardRef((n, r) => {
    const { __scopeToast: i, ...c } = n,
      d = Kj(Og, i);
    return l.jsx(Mg, {
      asChild: !0,
      children: l.jsx(We.button, {
        type: "button",
        ...c,
        ref: r,
        onClick: He(n.onClick, d.onClose),
      }),
    });
  });
jd.displayName = Og;
var Mg = j.forwardRef((n, r) => {
  const { __scopeToast: i, altText: c, ...d } = n;
  return l.jsx(We.div, {
    "data-radix-toast-announce-exclude": "",
    "data-radix-toast-announce-alt": c || void 0,
    ...d,
    ref: r,
  });
});
function _g(n) {
  const r = [];
  return (
    Array.from(n.childNodes).forEach((c) => {
      if (
        (c.nodeType === c.TEXT_NODE && c.textContent && r.push(c.textContent),
        Ij(c))
      ) {
        const d = c.ariaHidden || c.hidden || c.style.display === "none",
          f = c.dataset.radixToastAnnounceExclude === "";
        if (!d)
          if (f) {
            const h = c.dataset.radixToastAnnounceAlt;
            h && r.push(h);
          } else r.push(..._g(c));
      }
    }),
    r
  );
}
function Ai(n, r, i, { discrete: c }) {
  const d = i.originalEvent.currentTarget,
    f = new CustomEvent(n, { bubbles: !0, cancelable: !0, detail: i });
  (r && d.addEventListener(n, r, { once: !0 }),
    c ? xg(d, f) : d.dispatchEvent(f));
}
var fx = (n, r, i = 0) => {
  const c = Math.abs(n.x),
    d = Math.abs(n.y),
    f = c > d;
  return r === "left" || r === "right" ? f && c > i : !f && d > i;
};
function Jj(n = () => {}) {
  const r = Hn(n);
  Bn(() => {
    let i = 0,
      c = 0;
    return (
      (i = window.requestAnimationFrame(
        () => (c = window.requestAnimationFrame(r)),
      )),
      () => {
        (window.cancelAnimationFrame(i), window.cancelAnimationFrame(c));
      }
    );
  }, [r]);
}
function Ij(n) {
  return n.nodeType === n.ELEMENT_NODE;
}
function Wj(n) {
  const r = [],
    i = document.createTreeWalker(n, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (c) => {
        const d = c.tagName === "INPUT" && c.type === "hidden";
        return c.disabled || c.hidden || d
          ? NodeFilter.FILTER_SKIP
          : c.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; i.nextNode(); ) r.push(i.currentNode);
  return r;
}
function Tu(n) {
  const r = document.activeElement;
  return n.some((i) =>
    i === r ? !0 : (i.focus(), document.activeElement !== r),
  );
}
var eN = jg,
  kg = wg,
  Dg = Eg,
  zg = Tg,
  Lg = Ag,
  Ug = Cg,
  qg = jd;
function Hg(n) {
  var r,
    i,
    c = "";
  if (typeof n == "string" || typeof n == "number") c += n;
  else if (typeof n == "object")
    if (Array.isArray(n)) {
      var d = n.length;
      for (r = 0; r < d; r++)
        n[r] && (i = Hg(n[r])) && (c && (c += " "), (c += i));
    } else for (i in n) n[i] && (c && (c += " "), (c += i));
  return c;
}
function Bg() {
  for (var n, r, i = 0, c = "", d = arguments.length; i < d; i++)
    (n = arguments[i]) && (r = Hg(n)) && (c && (c += " "), (c += r));
  return c;
}
const hx = (n) => (typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n),
  mx = Bg,
  $i = (n, r) => (i) => {
    var c;
    if (r?.variants == null) return mx(n, i?.class, i?.className);
    const { variants: d, defaultVariants: f } = r,
      h = Object.keys(d).map((p) => {
        const v = i?.[p],
          y = f?.[p];
        if (v === null) return null;
        const N = hx(v) || hx(y);
        return d[p][N];
      }),
      x =
        i &&
        Object.entries(i).reduce((p, v) => {
          let [y, N] = v;
          return (N === void 0 || (p[y] = N), p);
        }, {}),
      m =
        r == null || (c = r.compoundVariants) === null || c === void 0
          ? void 0
          : c.reduce((p, v) => {
              let { class: y, className: N, ...T } = v;
              return Object.entries(T).every((R) => {
                let [S, C] = R;
                return Array.isArray(C)
                  ? C.includes({ ...f, ...x }[S])
                  : { ...f, ...x }[S] === C;
              })
                ? [...p, y, N]
                : p;
            }, []);
    return mx(n, h, m, i?.class, i?.className);
  };
const tN = (n) => n.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  nN = (n) =>
    n.replace(/^([A-Z])|[\s-_]+(\w)/g, (r, i, c) =>
      c ? c.toUpperCase() : i.toLowerCase(),
    ),
  px = (n) => {
    const r = nN(n);
    return r.charAt(0).toUpperCase() + r.slice(1);
  },
  Gg = (...n) =>
    n
      .filter((r, i, c) => !!r && r.trim() !== "" && c.indexOf(r) === i)
      .join(" ")
      .trim(),
  sN = (n) => {
    for (const r in n)
      if (r.startsWith("aria-") || r === "role" || r === "title") return !0;
  };
var aN = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const rN = j.forwardRef(
  (
    {
      color: n = "currentColor",
      size: r = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: c,
      className: d = "",
      children: f,
      iconNode: h,
      ...x
    },
    m,
  ) =>
    j.createElement(
      "svg",
      {
        ref: m,
        ...aN,
        width: r,
        height: r,
        stroke: n,
        strokeWidth: c ? (Number(i) * 24) / Number(r) : i,
        className: Gg("lucide", d),
        ...(!f && !sN(x) && { "aria-hidden": "true" }),
        ...x,
      },
      [
        ...h.map(([p, v]) => j.createElement(p, v)),
        ...(Array.isArray(f) ? f : [f]),
      ],
    ),
);
const ge = (n, r) => {
  const i = j.forwardRef(({ className: c, ...d }, f) =>
    j.createElement(rN, {
      ref: f,
      iconNode: r,
      className: Gg(`lucide-${tN(px(n))}`, `lucide-${n}`, c),
      ...d,
    }),
  );
  return ((i.displayName = px(n)), i);
};
const lN = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
  ],
  Au = ge("arrow-right", lN);
const iN = [
    ["path", { d: "M12 7v14", key: "1akyts" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y",
      },
    ],
  ],
  oN = ge("book-open", iN);
const cN = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    [
      "rect",
      { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" },
    ],
    ["path", { d: "M3 10h18", key: "8toen8" }],
  ],
  tl = ge("calendar", cN);
const uN = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }],
  ],
  Nd = ge("chart-column", uN);
const dN = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]],
  fN = ge("chevron-down", dN);
const hN = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  Qg = ge("chevron-left", hN);
const mN = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
  Zu = ge("chevron-right", mN);
const pN = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]],
  xN = ge("chevron-up", pN);
const gN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
  ],
  Pg = ge("circle-alert", gN);
const yN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
  ],
  bs = ge("circle-check", yN);
const vN = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ],
  Yg = ge("circle-check-big", vN);
const bN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
  ],
  jN = ge("circle-question-mark", bN);
const NN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }],
  ],
  rl = ge("circle-x", NN);
const wN = [
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }],
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ],
  Vg = ge("clock", wN);
const SN = [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea",
      },
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf",
      },
    ],
  ],
  Kg = ge("copy", SN);
const EN = [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f",
      },
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a",
      },
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ],
  xx = ge("eye-off", EN);
const TN = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0",
      },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ],
  gx = ge("eye", TN);
const AN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    [
      "path",
      { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" },
    ],
    ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ],
  RN = ge("globe", AN);
const CN = [
    [
      "path",
      { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" },
    ],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "r6nss1",
      },
    ],
  ],
  wd = ge("house", CN);
const ON = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  st = ge("loader-circle", ON);
const MN = [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }],
  ],
  $u = ge("lock-open", MN);
const _N = [
    ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
    ["path", { d: "M15 12H3", key: "6jk70r" }],
    ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ],
  Xg = ge("log-in", _N);
const kN = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ],
  DN = ge("log-out", kN);
const zN = [
    [
      "rect",
      {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2",
        key: "1w4ew1",
      },
    ],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
  ],
  xn = ge("lock", zN);
const LN = [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
    [
      "rect",
      { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" },
    ],
  ],
  Ru = ge("mail", LN);
const UN = [
    [
      "path",
      {
        d: "M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
        key: "143lza",
      },
    ],
    ["path", { d: "M11 12 5.12 2.2", key: "qhuxz6" }],
    ["path", { d: "m13 12 5.88-9.8", key: "hbye0f" }],
    ["path", { d: "M8 7h8", key: "i86dvs" }],
    ["circle", { cx: "12", cy: "17", r: "5", key: "qbz8iq" }],
    ["path", { d: "M12 18v-2h-.5", key: "fawc4q" }],
  ],
  Cu = ge("medal", UN);
const qN = [["path", { d: "M5 12h14", key: "1ays0h" }]],
  HN = ge("minus", qN);
const BN = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }],
  ],
  GN = ge("plus", BN);
const QN = [
    ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
    ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
    ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
    ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ],
  yx = ge("radio", QN);
const PN = [
    [
      "path",
      {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc",
      },
    ],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    [
      "path",
      {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3",
      },
    ],
    ["path", { d: "M8 16H3v5", key: "1cv678" }],
  ],
  Sd = ge("refresh-cw", PN);
const YN = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476",
      },
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }],
  ],
  VN = ge("save", YN);
const KN = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y",
      },
    ],
  ],
  yn = ge("shield", KN);
const XN = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s",
      },
    ],
  ],
  ll = ge("star", XN);
const FN = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ],
  Un = ge("target", FN);
const ZN = [
    ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
    ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
    ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }],
  ],
  $N = ge("timer", ZN);
const JN = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }],
  ],
  IN = ge("trash-2", JN);
const WN = [
    [
      "path",
      {
        d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",
        key: "1n3hpd",
      },
    ],
    [
      "path",
      {
        d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",
        key: "rfe1zi",
      },
    ],
    ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
    ["path", { d: "M4 22h16", key: "57wxv0" }],
    [
      "path",
      {
        d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
        key: "1mhfuq",
      },
    ],
    ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }],
  ],
  ht = ge("trophy", WN);
const ew = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ],
  il = ge("users", ew);
const tw = [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
  ],
  nw = ge("user", tw);
const sw = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
  ],
  aw = ge("x", sw);
const rw = [
    [
      "path",
      {
        d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
        key: "1xq2db",
      },
    ],
  ],
  lw = ge("zap", rw),
  iw = (n, r) => {
    const i = new Array(n.length + r.length);
    for (let c = 0; c < n.length; c++) i[c] = n[c];
    for (let c = 0; c < r.length; c++) i[n.length + c] = r[c];
    return i;
  },
  ow = (n, r) => ({ classGroupId: n, validator: r }),
  Fg = (n = new Map(), r = null, i) => ({
    nextPart: n,
    validators: r,
    classGroupId: i,
  }),
  Ui = "-",
  vx = [],
  cw = "arbitrary..",
  uw = (n) => {
    const r = fw(n),
      { conflictingClassGroups: i, conflictingClassGroupModifiers: c } = n;
    return {
      getClassGroupId: (h) => {
        if (h.startsWith("[") && h.endsWith("]")) return dw(h);
        const x = h.split(Ui),
          m = x[0] === "" && x.length > 1 ? 1 : 0;
        return Zg(x, m, r);
      },
      getConflictingClassGroupIds: (h, x) => {
        if (x) {
          const m = c[h],
            p = i[h];
          return m ? (p ? iw(p, m) : m) : p || vx;
        }
        return i[h] || vx;
      },
    };
  },
  Zg = (n, r, i) => {
    if (n.length - r === 0) return i.classGroupId;
    const d = n[r],
      f = i.nextPart.get(d);
    if (f) {
      const p = Zg(n, r + 1, f);
      if (p) return p;
    }
    const h = i.validators;
    if (h === null) return;
    const x = r === 0 ? n.join(Ui) : n.slice(r).join(Ui),
      m = h.length;
    for (let p = 0; p < m; p++) {
      const v = h[p];
      if (v.validator(x)) return v.classGroupId;
    }
  },
  dw = (n) =>
    n.slice(1, -1).indexOf(":") === -1
      ? void 0
      : (() => {
          const r = n.slice(1, -1),
            i = r.indexOf(":"),
            c = r.slice(0, i);
          return c ? cw + c : void 0;
        })(),
  fw = (n) => {
    const { theme: r, classGroups: i } = n;
    return hw(i, r);
  },
  hw = (n, r) => {
    const i = Fg();
    for (const c in n) {
      const d = n[c];
      Ed(d, i, c, r);
    }
    return i;
  },
  Ed = (n, r, i, c) => {
    const d = n.length;
    for (let f = 0; f < d; f++) {
      const h = n[f];
      mw(h, r, i, c);
    }
  },
  mw = (n, r, i, c) => {
    if (typeof n == "string") {
      pw(n, r, i);
      return;
    }
    if (typeof n == "function") {
      xw(n, r, i, c);
      return;
    }
    gw(n, r, i, c);
  },
  pw = (n, r, i) => {
    const c = n === "" ? r : $g(r, n);
    c.classGroupId = i;
  },
  xw = (n, r, i, c) => {
    if (yw(n)) {
      Ed(n(c), r, i, c);
      return;
    }
    (r.validators === null && (r.validators = []), r.validators.push(ow(i, n)));
  },
  gw = (n, r, i, c) => {
    const d = Object.entries(n),
      f = d.length;
    for (let h = 0; h < f; h++) {
      const [x, m] = d[h];
      Ed(m, $g(r, x), i, c);
    }
  },
  $g = (n, r) => {
    let i = n;
    const c = r.split(Ui),
      d = c.length;
    for (let f = 0; f < d; f++) {
      const h = c[f];
      let x = i.nextPart.get(h);
      (x || ((x = Fg()), i.nextPart.set(h, x)), (i = x));
    }
    return i;
  },
  yw = (n) => "isThemeGetter" in n && n.isThemeGetter === !0,
  vw = (n) => {
    if (n < 1) return { get: () => {}, set: () => {} };
    let r = 0,
      i = Object.create(null),
      c = Object.create(null);
    const d = (f, h) => {
      ((i[f] = h), r++, r > n && ((r = 0), (c = i), (i = Object.create(null))));
    };
    return {
      get(f) {
        let h = i[f];
        if (h !== void 0) return h;
        if ((h = c[f]) !== void 0) return (d(f, h), h);
      },
      set(f, h) {
        f in i ? (i[f] = h) : d(f, h);
      },
    };
  },
  Ju = "!",
  bx = ":",
  bw = [],
  jx = (n, r, i, c, d) => ({
    modifiers: n,
    hasImportantModifier: r,
    baseClassName: i,
    maybePostfixModifierPosition: c,
    isExternal: d,
  }),
  jw = (n) => {
    const { prefix: r, experimentalParseClassName: i } = n;
    let c = (d) => {
      const f = [];
      let h = 0,
        x = 0,
        m = 0,
        p;
      const v = d.length;
      for (let S = 0; S < v; S++) {
        const C = d[S];
        if (h === 0 && x === 0) {
          if (C === bx) {
            (f.push(d.slice(m, S)), (m = S + 1));
            continue;
          }
          if (C === "/") {
            p = S;
            continue;
          }
        }
        C === "[" ? h++ : C === "]" ? h-- : C === "(" ? x++ : C === ")" && x--;
      }
      const y = f.length === 0 ? d : d.slice(m);
      let N = y,
        T = !1;
      y.endsWith(Ju)
        ? ((N = y.slice(0, -1)), (T = !0))
        : y.startsWith(Ju) && ((N = y.slice(1)), (T = !0));
      const R = p && p > m ? p - m : void 0;
      return jx(f, T, N, R);
    };
    if (r) {
      const d = r + bx,
        f = c;
      c = (h) =>
        h.startsWith(d) ? f(h.slice(d.length)) : jx(bw, !1, h, void 0, !0);
    }
    if (i) {
      const d = c;
      c = (f) => i({ className: f, parseClassName: d });
    }
    return c;
  },
  Nw = (n) => {
    const r = new Map();
    return (
      n.orderSensitiveModifiers.forEach((i, c) => {
        r.set(i, 1e6 + c);
      }),
      (i) => {
        const c = [];
        let d = [];
        for (let f = 0; f < i.length; f++) {
          const h = i[f],
            x = h[0] === "[",
            m = r.has(h);
          x || m
            ? (d.length > 0 && (d.sort(), c.push(...d), (d = [])), c.push(h))
            : d.push(h);
        }
        return (d.length > 0 && (d.sort(), c.push(...d)), c);
      }
    );
  },
  ww = (n) => ({
    cache: vw(n.cacheSize),
    parseClassName: jw(n),
    sortModifiers: Nw(n),
    ...uw(n),
  }),
  Sw = /\s+/,
  Ew = (n, r) => {
    const {
        parseClassName: i,
        getClassGroupId: c,
        getConflictingClassGroupIds: d,
        sortModifiers: f,
      } = r,
      h = [],
      x = n.trim().split(Sw);
    let m = "";
    for (let p = x.length - 1; p >= 0; p -= 1) {
      const v = x[p],
        {
          isExternal: y,
          modifiers: N,
          hasImportantModifier: T,
          baseClassName: R,
          maybePostfixModifierPosition: S,
        } = i(v);
      if (y) {
        m = v + (m.length > 0 ? " " + m : m);
        continue;
      }
      let C = !!S,
        A = c(C ? R.substring(0, S) : R);
      if (!A) {
        if (!C) {
          m = v + (m.length > 0 ? " " + m : m);
          continue;
        }
        if (((A = c(R)), !A)) {
          m = v + (m.length > 0 ? " " + m : m);
          continue;
        }
        C = !1;
      }
      const U = N.length === 0 ? "" : N.length === 1 ? N[0] : f(N).join(":"),
        z = T ? U + Ju : U,
        H = z + A;
      if (h.indexOf(H) > -1) continue;
      h.push(H);
      const V = d(A, C);
      for (let F = 0; F < V.length; ++F) {
        const Z = V[F];
        h.push(z + Z);
      }
      m = v + (m.length > 0 ? " " + m : m);
    }
    return m;
  },
  Tw = (...n) => {
    let r = 0,
      i,
      c,
      d = "";
    for (; r < n.length; )
      (i = n[r++]) && (c = Jg(i)) && (d && (d += " "), (d += c));
    return d;
  },
  Jg = (n) => {
    if (typeof n == "string") return n;
    let r,
      i = "";
    for (let c = 0; c < n.length; c++)
      n[c] && (r = Jg(n[c])) && (i && (i += " "), (i += r));
    return i;
  },
  Aw = (n, ...r) => {
    let i, c, d, f;
    const h = (m) => {
        const p = r.reduce((v, y) => y(v), n());
        return (
          (i = ww(p)),
          (c = i.cache.get),
          (d = i.cache.set),
          (f = x),
          x(m)
        );
      },
      x = (m) => {
        const p = c(m);
        if (p) return p;
        const v = Ew(m, i);
        return (d(m, v), v);
      };
    return ((f = h), (...m) => f(Tw(...m)));
  },
  Rw = [],
  nt = (n) => {
    const r = (i) => i[n] || Rw;
    return ((r.isThemeGetter = !0), r);
  },
  Ig = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Wg = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Cw = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Ow = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Mw =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  _w = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  kw = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Dw =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  xs = (n) => Cw.test(n),
  be = (n) => !!n && !Number.isNaN(Number(n)),
  gs = (n) => !!n && Number.isInteger(Number(n)),
  Ou = (n) => n.endsWith("%") && be(n.slice(0, -1)),
  Ln = (n) => Ow.test(n),
  ey = () => !0,
  zw = (n) => Mw.test(n) && !_w.test(n),
  Td = () => !1,
  Lw = (n) => kw.test(n),
  Uw = (n) => Dw.test(n),
  qw = (n) => !ee(n) && !te(n),
  Hw = (n) => Ts(n, sy, Td),
  ee = (n) => Ig.test(n),
  Vs = (n) => Ts(n, ay, zw),
  Nx = (n) => Ts(n, Xw, be),
  Bw = (n) => Ts(n, ly, ey),
  Gw = (n) => Ts(n, ry, Td),
  wx = (n) => Ts(n, ty, Td),
  Qw = (n) => Ts(n, ny, Uw),
  Ri = (n) => Ts(n, iy, Lw),
  te = (n) => Wg.test(n),
  Zr = (n) => ta(n, ay),
  Pw = (n) => ta(n, ry),
  Sx = (n) => ta(n, ty),
  Yw = (n) => ta(n, sy),
  Vw = (n) => ta(n, ny),
  Ci = (n) => ta(n, iy, !0),
  Kw = (n) => ta(n, ly, !0),
  Ts = (n, r, i) => {
    const c = Ig.exec(n);
    return c ? (c[1] ? r(c[1]) : i(c[2])) : !1;
  },
  ta = (n, r, i = !1) => {
    const c = Wg.exec(n);
    return c ? (c[1] ? r(c[1]) : i) : !1;
  },
  ty = (n) => n === "position" || n === "percentage",
  ny = (n) => n === "image" || n === "url",
  sy = (n) => n === "length" || n === "size" || n === "bg-size",
  ay = (n) => n === "length",
  Xw = (n) => n === "number",
  ry = (n) => n === "family-name",
  ly = (n) => n === "number" || n === "weight",
  iy = (n) => n === "shadow",
  Fw = () => {
    const n = nt("color"),
      r = nt("font"),
      i = nt("text"),
      c = nt("font-weight"),
      d = nt("tracking"),
      f = nt("leading"),
      h = nt("breakpoint"),
      x = nt("container"),
      m = nt("spacing"),
      p = nt("radius"),
      v = nt("shadow"),
      y = nt("inset-shadow"),
      N = nt("text-shadow"),
      T = nt("drop-shadow"),
      R = nt("blur"),
      S = nt("perspective"),
      C = nt("aspect"),
      A = nt("ease"),
      U = nt("animate"),
      z = () => [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ],
      H = () => [
        "center",
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "left-top",
        "top-right",
        "right-top",
        "bottom-right",
        "right-bottom",
        "bottom-left",
        "left-bottom",
      ],
      V = () => [...H(), te, ee],
      F = () => ["auto", "hidden", "clip", "visible", "scroll"],
      Z = () => ["auto", "contain", "none"],
      G = () => [te, ee, m],
      re = () => [xs, "full", "auto", ...G()],
      he = () => [gs, "none", "subgrid", te, ee],
      me = () => ["auto", { span: ["full", gs, te, ee] }, gs, te, ee],
      ue = () => [gs, "auto", te, ee],
      ye = () => ["auto", "min", "max", "fr", te, ee],
      I = () => [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
        "baseline",
        "center-safe",
        "end-safe",
      ],
      de = () => [
        "start",
        "end",
        "center",
        "stretch",
        "center-safe",
        "end-safe",
      ],
      _ = () => ["auto", ...G()],
      K = () => [
        xs,
        "auto",
        "full",
        "dvw",
        "dvh",
        "lvw",
        "lvh",
        "svw",
        "svh",
        "min",
        "max",
        "fit",
        ...G(),
      ],
      X = () => [
        xs,
        "screen",
        "full",
        "dvw",
        "lvw",
        "svw",
        "min",
        "max",
        "fit",
        ...G(),
      ],
      le = () => [
        xs,
        "screen",
        "full",
        "lh",
        "dvh",
        "lvh",
        "svh",
        "min",
        "max",
        "fit",
        ...G(),
      ],
      w = () => [n, te, ee],
      Y = () => [...H(), Sx, wx, { position: [te, ee] }],
      J = () => ["no-repeat", { repeat: ["", "x", "y", "space", "round"] }],
      $ = () => ["auto", "cover", "contain", Yw, Hw, { size: [te, ee] }],
      se = () => [Ou, Zr, Vs],
      oe = () => ["", "none", "full", p, te, ee],
      ne = () => ["", be, Zr, Vs],
      Qe = () => ["solid", "dashed", "dotted", "double"],
      Me = () => [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
      ],
      _e = () => [be, Ou, Sx, wx],
      Yn = () => ["", "none", R, te, ee],
      en = () => ["none", be, te, ee],
      on = () => ["none", be, te, ee],
      Qt = () => [be, te, ee],
      Vn = () => [xs, "full", ...G()];
    return {
      cacheSize: 500,
      theme: {
        animate: ["spin", "ping", "pulse", "bounce"],
        aspect: ["video"],
        blur: [Ln],
        breakpoint: [Ln],
        color: [ey],
        container: [Ln],
        "drop-shadow": [Ln],
        ease: ["in", "out", "in-out"],
        font: [qw],
        "font-weight": [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ],
        "inset-shadow": [Ln],
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
        perspective: [
          "dramatic",
          "near",
          "normal",
          "midrange",
          "distant",
          "none",
        ],
        radius: [Ln],
        shadow: [Ln],
        spacing: ["px", be],
        text: [Ln],
        "text-shadow": [Ln],
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"],
      },
      classGroups: {
        aspect: [{ aspect: ["auto", "square", xs, ee, te, C] }],
        container: ["container"],
        columns: [{ columns: [be, ee, te, x] }],
        "break-after": [{ "break-after": z() }],
        "break-before": [{ "break-before": z() }],
        "break-inside": [
          { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
        ],
        "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
        box: [{ box: ["border", "content"] }],
        display: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "table",
          "inline-table",
          "table-caption",
          "table-cell",
          "table-column",
          "table-column-group",
          "table-footer-group",
          "table-header-group",
          "table-row-group",
          "table-row",
          "flow-root",
          "grid",
          "inline-grid",
          "contents",
          "list-item",
          "hidden",
        ],
        sr: ["sr-only", "not-sr-only"],
        float: [{ float: ["right", "left", "none", "start", "end"] }],
        clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
        isolation: ["isolate", "isolation-auto"],
        "object-fit": [
          { object: ["contain", "cover", "fill", "none", "scale-down"] },
        ],
        "object-position": [{ object: V() }],
        overflow: [{ overflow: F() }],
        "overflow-x": [{ "overflow-x": F() }],
        "overflow-y": [{ "overflow-y": F() }],
        overscroll: [{ overscroll: Z() }],
        "overscroll-x": [{ "overscroll-x": Z() }],
        "overscroll-y": [{ "overscroll-y": Z() }],
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        inset: [{ inset: re() }],
        "inset-x": [{ "inset-x": re() }],
        "inset-y": [{ "inset-y": re() }],
        start: [{ "inset-s": re(), start: re() }],
        end: [{ "inset-e": re(), end: re() }],
        "inset-bs": [{ "inset-bs": re() }],
        "inset-be": [{ "inset-be": re() }],
        top: [{ top: re() }],
        right: [{ right: re() }],
        bottom: [{ bottom: re() }],
        left: [{ left: re() }],
        visibility: ["visible", "invisible", "collapse"],
        z: [{ z: [gs, "auto", te, ee] }],
        basis: [{ basis: [xs, "full", "auto", x, ...G()] }],
        "flex-direction": [
          { flex: ["row", "row-reverse", "col", "col-reverse"] },
        ],
        "flex-wrap": [{ flex: ["nowrap", "wrap", "wrap-reverse"] }],
        flex: [{ flex: [be, xs, "auto", "initial", "none", ee] }],
        grow: [{ grow: ["", be, te, ee] }],
        shrink: [{ shrink: ["", be, te, ee] }],
        order: [{ order: [gs, "first", "last", "none", te, ee] }],
        "grid-cols": [{ "grid-cols": he() }],
        "col-start-end": [{ col: me() }],
        "col-start": [{ "col-start": ue() }],
        "col-end": [{ "col-end": ue() }],
        "grid-rows": [{ "grid-rows": he() }],
        "row-start-end": [{ row: me() }],
        "row-start": [{ "row-start": ue() }],
        "row-end": [{ "row-end": ue() }],
        "grid-flow": [
          { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
        ],
        "auto-cols": [{ "auto-cols": ye() }],
        "auto-rows": [{ "auto-rows": ye() }],
        gap: [{ gap: G() }],
        "gap-x": [{ "gap-x": G() }],
        "gap-y": [{ "gap-y": G() }],
        "justify-content": [{ justify: [...I(), "normal"] }],
        "justify-items": [{ "justify-items": [...de(), "normal"] }],
        "justify-self": [{ "justify-self": ["auto", ...de()] }],
        "align-content": [{ content: ["normal", ...I()] }],
        "align-items": [{ items: [...de(), { baseline: ["", "last"] }] }],
        "align-self": [{ self: ["auto", ...de(), { baseline: ["", "last"] }] }],
        "place-content": [{ "place-content": I() }],
        "place-items": [{ "place-items": [...de(), "baseline"] }],
        "place-self": [{ "place-self": ["auto", ...de()] }],
        p: [{ p: G() }],
        px: [{ px: G() }],
        py: [{ py: G() }],
        ps: [{ ps: G() }],
        pe: [{ pe: G() }],
        pbs: [{ pbs: G() }],
        pbe: [{ pbe: G() }],
        pt: [{ pt: G() }],
        pr: [{ pr: G() }],
        pb: [{ pb: G() }],
        pl: [{ pl: G() }],
        m: [{ m: _() }],
        mx: [{ mx: _() }],
        my: [{ my: _() }],
        ms: [{ ms: _() }],
        me: [{ me: _() }],
        mbs: [{ mbs: _() }],
        mbe: [{ mbe: _() }],
        mt: [{ mt: _() }],
        mr: [{ mr: _() }],
        mb: [{ mb: _() }],
        ml: [{ ml: _() }],
        "space-x": [{ "space-x": G() }],
        "space-x-reverse": ["space-x-reverse"],
        "space-y": [{ "space-y": G() }],
        "space-y-reverse": ["space-y-reverse"],
        size: [{ size: K() }],
        "inline-size": [{ inline: ["auto", ...X()] }],
        "min-inline-size": [{ "min-inline": ["auto", ...X()] }],
        "max-inline-size": [{ "max-inline": ["none", ...X()] }],
        "block-size": [{ block: ["auto", ...le()] }],
        "min-block-size": [{ "min-block": ["auto", ...le()] }],
        "max-block-size": [{ "max-block": ["none", ...le()] }],
        w: [{ w: [x, "screen", ...K()] }],
        "min-w": [{ "min-w": [x, "screen", "none", ...K()] }],
        "max-w": [
          { "max-w": [x, "screen", "none", "prose", { screen: [h] }, ...K()] },
        ],
        h: [{ h: ["screen", "lh", ...K()] }],
        "min-h": [{ "min-h": ["screen", "lh", "none", ...K()] }],
        "max-h": [{ "max-h": ["screen", "lh", ...K()] }],
        "font-size": [{ text: ["base", i, Zr, Vs] }],
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        "font-style": ["italic", "not-italic"],
        "font-weight": [{ font: [c, Kw, Bw] }],
        "font-stretch": [
          {
            "font-stretch": [
              "ultra-condensed",
              "extra-condensed",
              "condensed",
              "semi-condensed",
              "normal",
              "semi-expanded",
              "expanded",
              "extra-expanded",
              "ultra-expanded",
              Ou,
              ee,
            ],
          },
        ],
        "font-family": [{ font: [Pw, Gw, r] }],
        "font-features": [{ "font-features": [ee] }],
        "fvn-normal": ["normal-nums"],
        "fvn-ordinal": ["ordinal"],
        "fvn-slashed-zero": ["slashed-zero"],
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        tracking: [{ tracking: [d, te, ee] }],
        "line-clamp": [{ "line-clamp": [be, "none", te, Nx] }],
        leading: [{ leading: [f, ...G()] }],
        "list-image": [{ "list-image": ["none", te, ee] }],
        "list-style-position": [{ list: ["inside", "outside"] }],
        "list-style-type": [{ list: ["disc", "decimal", "none", te, ee] }],
        "text-alignment": [
          { text: ["left", "center", "right", "justify", "start", "end"] },
        ],
        "placeholder-color": [{ placeholder: w() }],
        "text-color": [{ text: w() }],
        "text-decoration": [
          "underline",
          "overline",
          "line-through",
          "no-underline",
        ],
        "text-decoration-style": [{ decoration: [...Qe(), "wavy"] }],
        "text-decoration-thickness": [
          { decoration: [be, "from-font", "auto", te, Vs] },
        ],
        "text-decoration-color": [{ decoration: w() }],
        "underline-offset": [{ "underline-offset": [be, "auto", te, ee] }],
        "text-transform": [
          "uppercase",
          "lowercase",
          "capitalize",
          "normal-case",
        ],
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
        indent: [{ indent: G() }],
        "vertical-align": [
          {
            align: [
              "baseline",
              "top",
              "middle",
              "bottom",
              "text-top",
              "text-bottom",
              "sub",
              "super",
              te,
              ee,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              "normal",
              "nowrap",
              "pre",
              "pre-line",
              "pre-wrap",
              "break-spaces",
            ],
          },
        ],
        break: [{ break: ["normal", "words", "all", "keep"] }],
        wrap: [{ wrap: ["break-word", "anywhere", "normal"] }],
        hyphens: [{ hyphens: ["none", "manual", "auto"] }],
        content: [{ content: ["none", te, ee] }],
        "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
        "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
        "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
        "bg-position": [{ bg: Y() }],
        "bg-repeat": [{ bg: J() }],
        "bg-size": [{ bg: $() }],
        "bg-image": [
          {
            bg: [
              "none",
              {
                linear: [
                  { to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
                  gs,
                  te,
                  ee,
                ],
                radial: ["", te, ee],
                conic: [gs, te, ee],
              },
              Vw,
              Qw,
            ],
          },
        ],
        "bg-color": [{ bg: w() }],
        "gradient-from-pos": [{ from: se() }],
        "gradient-via-pos": [{ via: se() }],
        "gradient-to-pos": [{ to: se() }],
        "gradient-from": [{ from: w() }],
        "gradient-via": [{ via: w() }],
        "gradient-to": [{ to: w() }],
        rounded: [{ rounded: oe() }],
        "rounded-s": [{ "rounded-s": oe() }],
        "rounded-e": [{ "rounded-e": oe() }],
        "rounded-t": [{ "rounded-t": oe() }],
        "rounded-r": [{ "rounded-r": oe() }],
        "rounded-b": [{ "rounded-b": oe() }],
        "rounded-l": [{ "rounded-l": oe() }],
        "rounded-ss": [{ "rounded-ss": oe() }],
        "rounded-se": [{ "rounded-se": oe() }],
        "rounded-ee": [{ "rounded-ee": oe() }],
        "rounded-es": [{ "rounded-es": oe() }],
        "rounded-tl": [{ "rounded-tl": oe() }],
        "rounded-tr": [{ "rounded-tr": oe() }],
        "rounded-br": [{ "rounded-br": oe() }],
        "rounded-bl": [{ "rounded-bl": oe() }],
        "border-w": [{ border: ne() }],
        "border-w-x": [{ "border-x": ne() }],
        "border-w-y": [{ "border-y": ne() }],
        "border-w-s": [{ "border-s": ne() }],
        "border-w-e": [{ "border-e": ne() }],
        "border-w-bs": [{ "border-bs": ne() }],
        "border-w-be": [{ "border-be": ne() }],
        "border-w-t": [{ "border-t": ne() }],
        "border-w-r": [{ "border-r": ne() }],
        "border-w-b": [{ "border-b": ne() }],
        "border-w-l": [{ "border-l": ne() }],
        "divide-x": [{ "divide-x": ne() }],
        "divide-x-reverse": ["divide-x-reverse"],
        "divide-y": [{ "divide-y": ne() }],
        "divide-y-reverse": ["divide-y-reverse"],
        "border-style": [{ border: [...Qe(), "hidden", "none"] }],
        "divide-style": [{ divide: [...Qe(), "hidden", "none"] }],
        "border-color": [{ border: w() }],
        "border-color-x": [{ "border-x": w() }],
        "border-color-y": [{ "border-y": w() }],
        "border-color-s": [{ "border-s": w() }],
        "border-color-e": [{ "border-e": w() }],
        "border-color-bs": [{ "border-bs": w() }],
        "border-color-be": [{ "border-be": w() }],
        "border-color-t": [{ "border-t": w() }],
        "border-color-r": [{ "border-r": w() }],
        "border-color-b": [{ "border-b": w() }],
        "border-color-l": [{ "border-l": w() }],
        "divide-color": [{ divide: w() }],
        "outline-style": [{ outline: [...Qe(), "none", "hidden"] }],
        "outline-offset": [{ "outline-offset": [be, te, ee] }],
        "outline-w": [{ outline: ["", be, Zr, Vs] }],
        "outline-color": [{ outline: w() }],
        shadow: [{ shadow: ["", "none", v, Ci, Ri] }],
        "shadow-color": [{ shadow: w() }],
        "inset-shadow": [{ "inset-shadow": ["none", y, Ci, Ri] }],
        "inset-shadow-color": [{ "inset-shadow": w() }],
        "ring-w": [{ ring: ne() }],
        "ring-w-inset": ["ring-inset"],
        "ring-color": [{ ring: w() }],
        "ring-offset-w": [{ "ring-offset": [be, Vs] }],
        "ring-offset-color": [{ "ring-offset": w() }],
        "inset-ring-w": [{ "inset-ring": ne() }],
        "inset-ring-color": [{ "inset-ring": w() }],
        "text-shadow": [{ "text-shadow": ["none", N, Ci, Ri] }],
        "text-shadow-color": [{ "text-shadow": w() }],
        opacity: [{ opacity: [be, te, ee] }],
        "mix-blend": [
          { "mix-blend": [...Me(), "plus-darker", "plus-lighter"] },
        ],
        "bg-blend": [{ "bg-blend": Me() }],
        "mask-clip": [
          {
            "mask-clip": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
          "mask-no-clip",
        ],
        "mask-composite": [
          { mask: ["add", "subtract", "intersect", "exclude"] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [be] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": _e() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": _e() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": w() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": w() }],
        "mask-image-t-from-pos": [{ "mask-t-from": _e() }],
        "mask-image-t-to-pos": [{ "mask-t-to": _e() }],
        "mask-image-t-from-color": [{ "mask-t-from": w() }],
        "mask-image-t-to-color": [{ "mask-t-to": w() }],
        "mask-image-r-from-pos": [{ "mask-r-from": _e() }],
        "mask-image-r-to-pos": [{ "mask-r-to": _e() }],
        "mask-image-r-from-color": [{ "mask-r-from": w() }],
        "mask-image-r-to-color": [{ "mask-r-to": w() }],
        "mask-image-b-from-pos": [{ "mask-b-from": _e() }],
        "mask-image-b-to-pos": [{ "mask-b-to": _e() }],
        "mask-image-b-from-color": [{ "mask-b-from": w() }],
        "mask-image-b-to-color": [{ "mask-b-to": w() }],
        "mask-image-l-from-pos": [{ "mask-l-from": _e() }],
        "mask-image-l-to-pos": [{ "mask-l-to": _e() }],
        "mask-image-l-from-color": [{ "mask-l-from": w() }],
        "mask-image-l-to-color": [{ "mask-l-to": w() }],
        "mask-image-x-from-pos": [{ "mask-x-from": _e() }],
        "mask-image-x-to-pos": [{ "mask-x-to": _e() }],
        "mask-image-x-from-color": [{ "mask-x-from": w() }],
        "mask-image-x-to-color": [{ "mask-x-to": w() }],
        "mask-image-y-from-pos": [{ "mask-y-from": _e() }],
        "mask-image-y-to-pos": [{ "mask-y-to": _e() }],
        "mask-image-y-from-color": [{ "mask-y-from": w() }],
        "mask-image-y-to-color": [{ "mask-y-to": w() }],
        "mask-image-radial": [{ "mask-radial": [te, ee] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": _e() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": _e() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": w() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": w() }],
        "mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: ["side", "corner"], farthest: ["side", "corner"] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": H() }],
        "mask-image-conic-pos": [{ "mask-conic": [be] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": _e() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": _e() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": w() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": w() }],
        "mask-mode": [{ mask: ["alpha", "luminance", "match"] }],
        "mask-origin": [
          {
            "mask-origin": [
              "border",
              "padding",
              "content",
              "fill",
              "stroke",
              "view",
            ],
          },
        ],
        "mask-position": [{ mask: Y() }],
        "mask-repeat": [{ mask: J() }],
        "mask-size": [{ mask: $() }],
        "mask-type": [{ "mask-type": ["alpha", "luminance"] }],
        "mask-image": [{ mask: ["none", te, ee] }],
        filter: [{ filter: ["", "none", te, ee] }],
        blur: [{ blur: Yn() }],
        brightness: [{ brightness: [be, te, ee] }],
        contrast: [{ contrast: [be, te, ee] }],
        "drop-shadow": [{ "drop-shadow": ["", "none", T, Ci, Ri] }],
        "drop-shadow-color": [{ "drop-shadow": w() }],
        grayscale: [{ grayscale: ["", be, te, ee] }],
        "hue-rotate": [{ "hue-rotate": [be, te, ee] }],
        invert: [{ invert: ["", be, te, ee] }],
        saturate: [{ saturate: [be, te, ee] }],
        sepia: [{ sepia: ["", be, te, ee] }],
        "backdrop-filter": [{ "backdrop-filter": ["", "none", te, ee] }],
        "backdrop-blur": [{ "backdrop-blur": Yn() }],
        "backdrop-brightness": [{ "backdrop-brightness": [be, te, ee] }],
        "backdrop-contrast": [{ "backdrop-contrast": [be, te, ee] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": ["", be, te, ee] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [be, te, ee] }],
        "backdrop-invert": [{ "backdrop-invert": ["", be, te, ee] }],
        "backdrop-opacity": [{ "backdrop-opacity": [be, te, ee] }],
        "backdrop-saturate": [{ "backdrop-saturate": [be, te, ee] }],
        "backdrop-sepia": [{ "backdrop-sepia": ["", be, te, ee] }],
        "border-collapse": [{ border: ["collapse", "separate"] }],
        "border-spacing": [{ "border-spacing": G() }],
        "border-spacing-x": [{ "border-spacing-x": G() }],
        "border-spacing-y": [{ "border-spacing-y": G() }],
        "table-layout": [{ table: ["auto", "fixed"] }],
        caption: [{ caption: ["top", "bottom"] }],
        transition: [
          {
            transition: [
              "",
              "all",
              "colors",
              "opacity",
              "shadow",
              "transform",
              "none",
              te,
              ee,
            ],
          },
        ],
        "transition-behavior": [{ transition: ["normal", "discrete"] }],
        duration: [{ duration: [be, "initial", te, ee] }],
        ease: [{ ease: ["linear", "initial", A, te, ee] }],
        delay: [{ delay: [be, te, ee] }],
        animate: [{ animate: ["none", U, te, ee] }],
        backface: [{ backface: ["hidden", "visible"] }],
        perspective: [{ perspective: [S, te, ee] }],
        "perspective-origin": [{ "perspective-origin": V() }],
        rotate: [{ rotate: en() }],
        "rotate-x": [{ "rotate-x": en() }],
        "rotate-y": [{ "rotate-y": en() }],
        "rotate-z": [{ "rotate-z": en() }],
        scale: [{ scale: on() }],
        "scale-x": [{ "scale-x": on() }],
        "scale-y": [{ "scale-y": on() }],
        "scale-z": [{ "scale-z": on() }],
        "scale-3d": ["scale-3d"],
        skew: [{ skew: Qt() }],
        "skew-x": [{ "skew-x": Qt() }],
        "skew-y": [{ "skew-y": Qt() }],
        transform: [{ transform: [te, ee, "", "none", "gpu", "cpu"] }],
        "transform-origin": [{ origin: V() }],
        "transform-style": [{ transform: ["3d", "flat"] }],
        translate: [{ translate: Vn() }],
        "translate-x": [{ "translate-x": Vn() }],
        "translate-y": [{ "translate-y": Vn() }],
        "translate-z": [{ "translate-z": Vn() }],
        "translate-none": ["translate-none"],
        accent: [{ accent: w() }],
        appearance: [{ appearance: ["none", "auto"] }],
        "caret-color": [{ caret: w() }],
        "color-scheme": [
          {
            scheme: [
              "normal",
              "dark",
              "light",
              "light-dark",
              "only-dark",
              "only-light",
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              "auto",
              "default",
              "pointer",
              "wait",
              "text",
              "move",
              "help",
              "not-allowed",
              "none",
              "context-menu",
              "progress",
              "cell",
              "crosshair",
              "vertical-text",
              "alias",
              "copy",
              "no-drop",
              "grab",
              "grabbing",
              "all-scroll",
              "col-resize",
              "row-resize",
              "n-resize",
              "e-resize",
              "s-resize",
              "w-resize",
              "ne-resize",
              "nw-resize",
              "se-resize",
              "sw-resize",
              "ew-resize",
              "ns-resize",
              "nesw-resize",
              "nwse-resize",
              "zoom-in",
              "zoom-out",
              te,
              ee,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": ["fixed", "content"] }],
        "pointer-events": [{ "pointer-events": ["auto", "none"] }],
        resize: [{ resize: ["none", "", "y", "x"] }],
        "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
        "scroll-m": [{ "scroll-m": G() }],
        "scroll-mx": [{ "scroll-mx": G() }],
        "scroll-my": [{ "scroll-my": G() }],
        "scroll-ms": [{ "scroll-ms": G() }],
        "scroll-me": [{ "scroll-me": G() }],
        "scroll-mbs": [{ "scroll-mbs": G() }],
        "scroll-mbe": [{ "scroll-mbe": G() }],
        "scroll-mt": [{ "scroll-mt": G() }],
        "scroll-mr": [{ "scroll-mr": G() }],
        "scroll-mb": [{ "scroll-mb": G() }],
        "scroll-ml": [{ "scroll-ml": G() }],
        "scroll-p": [{ "scroll-p": G() }],
        "scroll-px": [{ "scroll-px": G() }],
        "scroll-py": [{ "scroll-py": G() }],
        "scroll-ps": [{ "scroll-ps": G() }],
        "scroll-pe": [{ "scroll-pe": G() }],
        "scroll-pbs": [{ "scroll-pbs": G() }],
        "scroll-pbe": [{ "scroll-pbe": G() }],
        "scroll-pt": [{ "scroll-pt": G() }],
        "scroll-pr": [{ "scroll-pr": G() }],
        "scroll-pb": [{ "scroll-pb": G() }],
        "scroll-pl": [{ "scroll-pl": G() }],
        "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
        "snap-stop": [{ snap: ["normal", "always"] }],
        "snap-type": [{ snap: ["none", "x", "y", "both"] }],
        "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
        touch: [{ touch: ["auto", "none", "manipulation"] }],
        "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
        "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
        "touch-pz": ["touch-pinch-zoom"],
        select: [{ select: ["none", "text", "all", "auto"] }],
        "will-change": [
          {
            "will-change": ["auto", "scroll", "contents", "transform", te, ee],
          },
        ],
        fill: [{ fill: ["none", ...w()] }],
        "stroke-w": [{ stroke: [be, Zr, Vs, Nx] }],
        stroke: [{ stroke: ["none", ...w()] }],
        "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: [
          "inset-x",
          "inset-y",
          "inset-bs",
          "inset-be",
          "start",
          "end",
          "top",
          "right",
          "bottom",
          "left",
        ],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": [
          "fvn-ordinal",
          "fvn-slashed-zero",
          "fvn-figure",
          "fvn-spacing",
          "fvn-fraction",
        ],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: [
          "rounded-s",
          "rounded-e",
          "rounded-t",
          "rounded-r",
          "rounded-b",
          "rounded-l",
          "rounded-ss",
          "rounded-se",
          "rounded-ee",
          "rounded-es",
          "rounded-tl",
          "rounded-tr",
          "rounded-br",
          "rounded-bl",
        ],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": [
          "border-w-x",
          "border-w-y",
          "border-w-s",
          "border-w-e",
          "border-w-bs",
          "border-w-be",
          "border-w-t",
          "border-w-r",
          "border-w-b",
          "border-w-l",
        ],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": [
          "border-color-x",
          "border-color-y",
          "border-color-s",
          "border-color-e",
          "border-color-bs",
          "border-color-be",
          "border-color-t",
          "border-color-r",
          "border-color-b",
          "border-color-l",
        ],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        translate: ["translate-x", "translate-y", "translate-none"],
        "translate-none": [
          "translate",
          "translate-x",
          "translate-y",
          "translate-z",
        ],
        "scroll-m": [
          "scroll-mx",
          "scroll-my",
          "scroll-ms",
          "scroll-me",
          "scroll-mbs",
          "scroll-mbe",
          "scroll-mt",
          "scroll-mr",
          "scroll-mb",
          "scroll-ml",
        ],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": [
          "scroll-px",
          "scroll-py",
          "scroll-ps",
          "scroll-pe",
          "scroll-pbs",
          "scroll-pbe",
          "scroll-pt",
          "scroll-pr",
          "scroll-pb",
          "scroll-pl",
        ],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"],
      },
      conflictingClassGroupModifiers: { "font-size": ["leading"] },
      orderSensitiveModifiers: [
        "*",
        "**",
        "after",
        "backdrop",
        "before",
        "details-content",
        "file",
        "first-letter",
        "first-line",
        "marker",
        "placeholder",
        "selection",
      ],
    };
  },
  Zw = Aw(Fw);
function ze(...n) {
  return Zw(Bg(n));
}
const $w = eN,
  oy = j.forwardRef(({ className: n, ...r }, i) =>
    l.jsx(kg, {
      ref: i,
      className: ze(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        n,
      ),
      ...r,
    }),
  );
oy.displayName = kg.displayName;
const Jw = $i(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
      variants: {
        variant: {
          default: "border bg-background text-foreground",
          destructive:
            "destructive group border-destructive bg-destructive text-destructive-foreground",
        },
      },
      defaultVariants: { variant: "default" },
    },
  ),
  cy = j.forwardRef(({ className: n, variant: r, ...i }, c) =>
    l.jsx(Dg, { ref: c, className: ze(Jw({ variant: r }), n), ...i }),
  );
cy.displayName = Dg.displayName;
const Iw = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx(Ug, {
    ref: i,
    className: ze(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      n,
    ),
    ...r,
  }),
);
Iw.displayName = Ug.displayName;
const uy = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx(qg, {
    ref: i,
    className: ze(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      n,
    ),
    "toast-close": "",
    ...r,
    children: l.jsx(aw, { className: "h-4 w-4" }),
  }),
);
uy.displayName = qg.displayName;
const dy = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx(zg, { ref: i, className: ze("text-sm font-semibold", n), ...r }),
);
dy.displayName = zg.displayName;
const fy = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx(Lg, { ref: i, className: ze("text-sm opacity-90", n), ...r }),
);
fy.displayName = Lg.displayName;
function Ww() {
  const { toasts: n } = Es();
  return l.jsxs($w, {
    children: [
      n.map(function ({ id: r, title: i, description: c, action: d, ...f }) {
        return l.jsxs(
          cy,
          {
            ...f,
            children: [
              l.jsxs("div", {
                className: "grid gap-1",
                children: [
                  i && l.jsx(dy, { children: i }),
                  c && l.jsx(fy, { children: c }),
                ],
              }),
              d,
              l.jsx(uy, {}),
            ],
          },
          r,
        );
      }),
      l.jsx(oy, {}),
    ],
  });
}
var eS = Vi[" useId ".trim().toString()] || (() => {}),
  tS = 0;
function hy(n) {
  const [r, i] = j.useState(eS());
  return (
    Bn(() => {
      i((c) => c ?? String(tS++));
    }, [n]),
    r ? `radix-${r}` : ""
  );
}
const nS = ["top", "right", "bottom", "left"],
  js = Math.min,
  Lt = Math.max,
  qi = Math.round,
  Oi = Math.floor,
  gn = (n) => ({ x: n, y: n }),
  sS = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Iu(n, r, i) {
  return Lt(n, js(r, i));
}
function Gn(n, r) {
  return typeof n == "function" ? n(r) : n;
}
function Qn(n) {
  return n.split("-")[0];
}
function Fa(n) {
  return n.split("-")[1];
}
function Ad(n) {
  return n === "x" ? "y" : "x";
}
function Rd(n) {
  return n === "y" ? "height" : "width";
}
function pn(n) {
  const r = n[0];
  return r === "t" || r === "b" ? "y" : "x";
}
function Cd(n) {
  return Ad(pn(n));
}
function aS(n, r, i) {
  i === void 0 && (i = !1);
  const c = Fa(n),
    d = Cd(n),
    f = Rd(d);
  let h =
    d === "x"
      ? c === (i ? "end" : "start")
        ? "right"
        : "left"
      : c === "start"
        ? "bottom"
        : "top";
  return (r.reference[f] > r.floating[f] && (h = Hi(h)), [h, Hi(h)]);
}
function rS(n) {
  const r = Hi(n);
  return [Wu(n), r, Wu(r)];
}
function Wu(n) {
  return n.includes("start")
    ? n.replace("start", "end")
    : n.replace("end", "start");
}
const Ex = ["left", "right"],
  Tx = ["right", "left"],
  lS = ["top", "bottom"],
  iS = ["bottom", "top"];
function oS(n, r, i) {
  switch (n) {
    case "top":
    case "bottom":
      return i ? (r ? Tx : Ex) : r ? Ex : Tx;
    case "left":
    case "right":
      return r ? lS : iS;
    default:
      return [];
  }
}
function cS(n, r, i, c) {
  const d = Fa(n);
  let f = oS(Qn(n), i === "start", c);
  return (
    d && ((f = f.map((h) => h + "-" + d)), r && (f = f.concat(f.map(Wu)))),
    f
  );
}
function Hi(n) {
  const r = Qn(n);
  return sS[r] + n.slice(r.length);
}
function uS(n) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...n };
}
function my(n) {
  return typeof n != "number"
    ? uS(n)
    : { top: n, right: n, bottom: n, left: n };
}
function Bi(n) {
  const { x: r, y: i, width: c, height: d } = n;
  return {
    width: c,
    height: d,
    top: i,
    left: r,
    right: r + c,
    bottom: i + d,
    x: r,
    y: i,
  };
}
function Ax(n, r, i) {
  let { reference: c, floating: d } = n;
  const f = pn(r),
    h = Cd(r),
    x = Rd(h),
    m = Qn(r),
    p = f === "y",
    v = c.x + c.width / 2 - d.width / 2,
    y = c.y + c.height / 2 - d.height / 2,
    N = c[x] / 2 - d[x] / 2;
  let T;
  switch (m) {
    case "top":
      T = { x: v, y: c.y - d.height };
      break;
    case "bottom":
      T = { x: v, y: c.y + c.height };
      break;
    case "right":
      T = { x: c.x + c.width, y };
      break;
    case "left":
      T = { x: c.x - d.width, y };
      break;
    default:
      T = { x: c.x, y: c.y };
  }
  switch (Fa(r)) {
    case "start":
      T[h] -= N * (i && p ? -1 : 1);
      break;
    case "end":
      T[h] += N * (i && p ? -1 : 1);
      break;
  }
  return T;
}
async function dS(n, r) {
  var i;
  r === void 0 && (r = {});
  const { x: c, y: d, platform: f, rects: h, elements: x, strategy: m } = n,
    {
      boundary: p = "clippingAncestors",
      rootBoundary: v = "viewport",
      elementContext: y = "floating",
      altBoundary: N = !1,
      padding: T = 0,
    } = Gn(r, n),
    R = my(T),
    C = x[N ? (y === "floating" ? "reference" : "floating") : y],
    A = Bi(
      await f.getClippingRect({
        element:
          (i = await (f.isElement == null ? void 0 : f.isElement(C))) == null ||
          i
            ? C
            : C.contextElement ||
              (await (f.getDocumentElement == null
                ? void 0
                : f.getDocumentElement(x.floating))),
        boundary: p,
        rootBoundary: v,
        strategy: m,
      }),
    ),
    U =
      y === "floating"
        ? { x: c, y: d, width: h.floating.width, height: h.floating.height }
        : h.reference,
    z = await (f.getOffsetParent == null
      ? void 0
      : f.getOffsetParent(x.floating)),
    H = (await (f.isElement == null ? void 0 : f.isElement(z)))
      ? (await (f.getScale == null ? void 0 : f.getScale(z))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    V = Bi(
      f.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await f.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: x,
            rect: U,
            offsetParent: z,
            strategy: m,
          })
        : U,
    );
  return {
    top: (A.top - V.top + R.top) / H.y,
    bottom: (V.bottom - A.bottom + R.bottom) / H.y,
    left: (A.left - V.left + R.left) / H.x,
    right: (V.right - A.right + R.right) / H.x,
  };
}
const fS = 50,
  hS = async (n, r, i) => {
    const {
        placement: c = "bottom",
        strategy: d = "absolute",
        middleware: f = [],
        platform: h,
      } = i,
      x = h.detectOverflow ? h : { ...h, detectOverflow: dS },
      m = await (h.isRTL == null ? void 0 : h.isRTL(r));
    let p = await h.getElementRects({ reference: n, floating: r, strategy: d }),
      { x: v, y } = Ax(p, c, m),
      N = c,
      T = 0;
    const R = {};
    for (let S = 0; S < f.length; S++) {
      const C = f[S];
      if (!C) continue;
      const { name: A, fn: U } = C,
        {
          x: z,
          y: H,
          data: V,
          reset: F,
        } = await U({
          x: v,
          y,
          initialPlacement: c,
          placement: N,
          strategy: d,
          middlewareData: R,
          rects: p,
          platform: x,
          elements: { reference: n, floating: r },
        });
      ((v = z ?? v),
        (y = H ?? y),
        (R[A] = { ...R[A], ...V }),
        F &&
          T < fS &&
          (T++,
          typeof F == "object" &&
            (F.placement && (N = F.placement),
            F.rects &&
              (p =
                F.rects === !0
                  ? await h.getElementRects({
                      reference: n,
                      floating: r,
                      strategy: d,
                    })
                  : F.rects),
            ({ x: v, y } = Ax(p, N, m))),
          (S = -1)));
    }
    return { x: v, y, placement: N, strategy: d, middlewareData: R };
  },
  mS = (n) => ({
    name: "arrow",
    options: n,
    async fn(r) {
      const {
          x: i,
          y: c,
          placement: d,
          rects: f,
          platform: h,
          elements: x,
          middlewareData: m,
        } = r,
        { element: p, padding: v = 0 } = Gn(n, r) || {};
      if (p == null) return {};
      const y = my(v),
        N = { x: i, y: c },
        T = Cd(d),
        R = Rd(T),
        S = await h.getDimensions(p),
        C = T === "y",
        A = C ? "top" : "left",
        U = C ? "bottom" : "right",
        z = C ? "clientHeight" : "clientWidth",
        H = f.reference[R] + f.reference[T] - N[T] - f.floating[R],
        V = N[T] - f.reference[T],
        F = await (h.getOffsetParent == null ? void 0 : h.getOffsetParent(p));
      let Z = F ? F[z] : 0;
      (!Z || !(await (h.isElement == null ? void 0 : h.isElement(F)))) &&
        (Z = x.floating[z] || f.floating[R]);
      const G = H / 2 - V / 2,
        re = Z / 2 - S[R] / 2 - 1,
        he = js(y[A], re),
        me = js(y[U], re),
        ue = he,
        ye = Z - S[R] - me,
        I = Z / 2 - S[R] / 2 + G,
        de = Iu(ue, I, ye),
        _ =
          !m.arrow &&
          Fa(d) != null &&
          I !== de &&
          f.reference[R] / 2 - (I < ue ? he : me) - S[R] / 2 < 0,
        K = _ ? (I < ue ? I - ue : I - ye) : 0;
      return {
        [T]: N[T] + K,
        data: {
          [T]: de,
          centerOffset: I - de - K,
          ...(_ && { alignmentOffset: K }),
        },
        reset: _,
      };
    },
  }),
  pS = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "flip",
        options: n,
        async fn(r) {
          var i, c;
          const {
              placement: d,
              middlewareData: f,
              rects: h,
              initialPlacement: x,
              platform: m,
              elements: p,
            } = r,
            {
              mainAxis: v = !0,
              crossAxis: y = !0,
              fallbackPlacements: N,
              fallbackStrategy: T = "bestFit",
              fallbackAxisSideDirection: R = "none",
              flipAlignment: S = !0,
              ...C
            } = Gn(n, r);
          if ((i = f.arrow) != null && i.alignmentOffset) return {};
          const A = Qn(d),
            U = pn(x),
            z = Qn(x) === x,
            H = await (m.isRTL == null ? void 0 : m.isRTL(p.floating)),
            V = N || (z || !S ? [Hi(x)] : rS(x)),
            F = R !== "none";
          !N && F && V.push(...cS(x, S, R, H));
          const Z = [x, ...V],
            G = await m.detectOverflow(r, C),
            re = [];
          let he = ((c = f.flip) == null ? void 0 : c.overflows) || [];
          if ((v && re.push(G[A]), y)) {
            const I = aS(d, h, H);
            re.push(G[I[0]], G[I[1]]);
          }
          if (
            ((he = [...he, { placement: d, overflows: re }]),
            !re.every((I) => I <= 0))
          ) {
            var me, ue;
            const I = (((me = f.flip) == null ? void 0 : me.index) || 0) + 1,
              de = Z[I];
            if (
              de &&
              (!(y === "alignment" ? U !== pn(de) : !1) ||
                he.every((X) =>
                  pn(X.placement) === U ? X.overflows[0] > 0 : !0,
                ))
            )
              return {
                data: { index: I, overflows: he },
                reset: { placement: de },
              };
            let _ =
              (ue = he
                .filter((K) => K.overflows[0] <= 0)
                .sort((K, X) => K.overflows[1] - X.overflows[1])[0]) == null
                ? void 0
                : ue.placement;
            if (!_)
              switch (T) {
                case "bestFit": {
                  var ye;
                  const K =
                    (ye = he
                      .filter((X) => {
                        if (F) {
                          const le = pn(X.placement);
                          return le === U || le === "y";
                        }
                        return !0;
                      })
                      .map((X) => [
                        X.placement,
                        X.overflows
                          .filter((le) => le > 0)
                          .reduce((le, w) => le + w, 0),
                      ])
                      .sort((X, le) => X[1] - le[1])[0]) == null
                      ? void 0
                      : ye[0];
                  K && (_ = K);
                  break;
                }
                case "initialPlacement":
                  _ = x;
                  break;
              }
            if (d !== _) return { reset: { placement: _ } };
          }
          return {};
        },
      }
    );
  };
function Rx(n, r) {
  return {
    top: n.top - r.height,
    right: n.right - r.width,
    bottom: n.bottom - r.height,
    left: n.left - r.width,
  };
}
function Cx(n) {
  return nS.some((r) => n[r] >= 0);
}
const xS = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "hide",
        options: n,
        async fn(r) {
          const { rects: i, platform: c } = r,
            { strategy: d = "referenceHidden", ...f } = Gn(n, r);
          switch (d) {
            case "referenceHidden": {
              const h = await c.detectOverflow(r, {
                  ...f,
                  elementContext: "reference",
                }),
                x = Rx(h, i.reference);
              return {
                data: { referenceHiddenOffsets: x, referenceHidden: Cx(x) },
              };
            }
            case "escaped": {
              const h = await c.detectOverflow(r, { ...f, altBoundary: !0 }),
                x = Rx(h, i.floating);
              return { data: { escapedOffsets: x, escaped: Cx(x) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  py = new Set(["left", "top"]);
async function gS(n, r) {
  const { placement: i, platform: c, elements: d } = n,
    f = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)),
    h = Qn(i),
    x = Fa(i),
    m = pn(i) === "y",
    p = py.has(h) ? -1 : 1,
    v = f && m ? -1 : 1,
    y = Gn(r, n);
  let {
    mainAxis: N,
    crossAxis: T,
    alignmentAxis: R,
  } = typeof y == "number"
    ? { mainAxis: y, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: y.mainAxis || 0,
        crossAxis: y.crossAxis || 0,
        alignmentAxis: y.alignmentAxis,
      };
  return (
    x && typeof R == "number" && (T = x === "end" ? R * -1 : R),
    m ? { x: T * v, y: N * p } : { x: N * p, y: T * v }
  );
}
const yS = function (n) {
    return (
      n === void 0 && (n = 0),
      {
        name: "offset",
        options: n,
        async fn(r) {
          var i, c;
          const { x: d, y: f, placement: h, middlewareData: x } = r,
            m = await gS(r, n);
          return h === ((i = x.offset) == null ? void 0 : i.placement) &&
            (c = x.arrow) != null &&
            c.alignmentOffset
            ? {}
            : { x: d + m.x, y: f + m.y, data: { ...m, placement: h } };
        },
      }
    );
  },
  vS = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "shift",
        options: n,
        async fn(r) {
          const { x: i, y: c, placement: d, platform: f } = r,
            {
              mainAxis: h = !0,
              crossAxis: x = !1,
              limiter: m = {
                fn: (A) => {
                  let { x: U, y: z } = A;
                  return { x: U, y: z };
                },
              },
              ...p
            } = Gn(n, r),
            v = { x: i, y: c },
            y = await f.detectOverflow(r, p),
            N = pn(Qn(d)),
            T = Ad(N);
          let R = v[T],
            S = v[N];
          if (h) {
            const A = T === "y" ? "top" : "left",
              U = T === "y" ? "bottom" : "right",
              z = R + y[A],
              H = R - y[U];
            R = Iu(z, R, H);
          }
          if (x) {
            const A = N === "y" ? "top" : "left",
              U = N === "y" ? "bottom" : "right",
              z = S + y[A],
              H = S - y[U];
            S = Iu(z, S, H);
          }
          const C = m.fn({ ...r, [T]: R, [N]: S });
          return {
            ...C,
            data: { x: C.x - i, y: C.y - c, enabled: { [T]: h, [N]: x } },
          };
        },
      }
    );
  },
  bS = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        options: n,
        fn(r) {
          const { x: i, y: c, placement: d, rects: f, middlewareData: h } = r,
            { offset: x = 0, mainAxis: m = !0, crossAxis: p = !0 } = Gn(n, r),
            v = { x: i, y: c },
            y = pn(d),
            N = Ad(y);
          let T = v[N],
            R = v[y];
          const S = Gn(x, r),
            C =
              typeof S == "number"
                ? { mainAxis: S, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...S };
          if (m) {
            const z = N === "y" ? "height" : "width",
              H = f.reference[N] - f.floating[z] + C.mainAxis,
              V = f.reference[N] + f.reference[z] - C.mainAxis;
            T < H ? (T = H) : T > V && (T = V);
          }
          if (p) {
            var A, U;
            const z = N === "y" ? "width" : "height",
              H = py.has(Qn(d)),
              V =
                f.reference[y] -
                f.floating[z] +
                ((H && ((A = h.offset) == null ? void 0 : A[y])) || 0) +
                (H ? 0 : C.crossAxis),
              F =
                f.reference[y] +
                f.reference[z] +
                (H ? 0 : ((U = h.offset) == null ? void 0 : U[y]) || 0) -
                (H ? C.crossAxis : 0);
            R < V ? (R = V) : R > F && (R = F);
          }
          return { [N]: T, [y]: R };
        },
      }
    );
  },
  jS = function (n) {
    return (
      n === void 0 && (n = {}),
      {
        name: "size",
        options: n,
        async fn(r) {
          var i, c;
          const { placement: d, rects: f, platform: h, elements: x } = r,
            { apply: m = () => {}, ...p } = Gn(n, r),
            v = await h.detectOverflow(r, p),
            y = Qn(d),
            N = Fa(d),
            T = pn(d) === "y",
            { width: R, height: S } = f.floating;
          let C, A;
          y === "top" || y === "bottom"
            ? ((C = y),
              (A =
                N ===
                ((await (h.isRTL == null ? void 0 : h.isRTL(x.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((A = y), (C = N === "end" ? "top" : "bottom"));
          const U = S - v.top - v.bottom,
            z = R - v.left - v.right,
            H = js(S - v[C], U),
            V = js(R - v[A], z),
            F = !r.middlewareData.shift;
          let Z = H,
            G = V;
          if (
            ((i = r.middlewareData.shift) != null && i.enabled.x && (G = z),
            (c = r.middlewareData.shift) != null && c.enabled.y && (Z = U),
            F && !N)
          ) {
            const he = Lt(v.left, 0),
              me = Lt(v.right, 0),
              ue = Lt(v.top, 0),
              ye = Lt(v.bottom, 0);
            T
              ? (G =
                  R -
                  2 * (he !== 0 || me !== 0 ? he + me : Lt(v.left, v.right)))
              : (Z =
                  S -
                  2 * (ue !== 0 || ye !== 0 ? ue + ye : Lt(v.top, v.bottom)));
          }
          await m({ ...r, availableWidth: G, availableHeight: Z });
          const re = await h.getDimensions(x.floating);
          return R !== re.width || S !== re.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Ji() {
  return typeof window < "u";
}
function Za(n) {
  return xy(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function Bt(n) {
  var r;
  return (
    (n == null || (r = n.ownerDocument) == null ? void 0 : r.defaultView) ||
    window
  );
}
function bn(n) {
  var r;
  return (r = (xy(n) ? n.ownerDocument : n.document) || window.document) == null
    ? void 0
    : r.documentElement;
}
function xy(n) {
  return Ji() ? n instanceof Node || n instanceof Bt(n).Node : !1;
}
function rn(n) {
  return Ji() ? n instanceof Element || n instanceof Bt(n).Element : !1;
}
function Pn(n) {
  return Ji() ? n instanceof HTMLElement || n instanceof Bt(n).HTMLElement : !1;
}
function Ox(n) {
  return !Ji() || typeof ShadowRoot > "u"
    ? !1
    : n instanceof ShadowRoot || n instanceof Bt(n).ShadowRoot;
}
function ol(n) {
  const { overflow: r, overflowX: i, overflowY: c, display: d } = ln(n);
  return (
    /auto|scroll|overlay|hidden|clip/.test(r + c + i) &&
    d !== "inline" &&
    d !== "contents"
  );
}
function NS(n) {
  return /^(table|td|th)$/.test(Za(n));
}
function Ii(n) {
  try {
    if (n.matches(":popover-open")) return !0;
  } catch {}
  try {
    return n.matches(":modal");
  } catch {
    return !1;
  }
}
const wS = /transform|translate|scale|rotate|perspective|filter/,
  SS = /paint|layout|strict|content/,
  Ks = (n) => !!n && n !== "none";
let Mu;
function Od(n) {
  const r = rn(n) ? ln(n) : n;
  return (
    Ks(r.transform) ||
    Ks(r.translate) ||
    Ks(r.scale) ||
    Ks(r.rotate) ||
    Ks(r.perspective) ||
    (!Md() && (Ks(r.backdropFilter) || Ks(r.filter))) ||
    wS.test(r.willChange || "") ||
    SS.test(r.contain || "")
  );
}
function ES(n) {
  let r = Ns(n);
  for (; Pn(r) && !Pa(r); ) {
    if (Od(r)) return r;
    if (Ii(r)) return null;
    r = Ns(r);
  }
  return null;
}
function Md() {
  return (
    Mu == null &&
      (Mu =
        typeof CSS < "u" &&
        CSS.supports &&
        CSS.supports("-webkit-backdrop-filter", "none")),
    Mu
  );
}
function Pa(n) {
  return /^(html|body|#document)$/.test(Za(n));
}
function ln(n) {
  return Bt(n).getComputedStyle(n);
}
function Wi(n) {
  return rn(n)
    ? { scrollLeft: n.scrollLeft, scrollTop: n.scrollTop }
    : { scrollLeft: n.scrollX, scrollTop: n.scrollY };
}
function Ns(n) {
  if (Za(n) === "html") return n;
  const r = n.assignedSlot || n.parentNode || (Ox(n) && n.host) || bn(n);
  return Ox(r) ? r.host : r;
}
function gy(n) {
  const r = Ns(n);
  return Pa(r)
    ? n.ownerDocument
      ? n.ownerDocument.body
      : n.body
    : Pn(r) && ol(r)
      ? r
      : gy(r);
}
function nl(n, r, i) {
  var c;
  (r === void 0 && (r = []), i === void 0 && (i = !0));
  const d = gy(n),
    f = d === ((c = n.ownerDocument) == null ? void 0 : c.body),
    h = Bt(d);
  if (f) {
    const x = ed(h);
    return r.concat(
      h,
      h.visualViewport || [],
      ol(d) ? d : [],
      x && i ? nl(x) : [],
    );
  } else return r.concat(d, nl(d, [], i));
}
function ed(n) {
  return n.parent && Object.getPrototypeOf(n.parent) ? n.frameElement : null;
}
function yy(n) {
  const r = ln(n);
  let i = parseFloat(r.width) || 0,
    c = parseFloat(r.height) || 0;
  const d = Pn(n),
    f = d ? n.offsetWidth : i,
    h = d ? n.offsetHeight : c,
    x = qi(i) !== f || qi(c) !== h;
  return (x && ((i = f), (c = h)), { width: i, height: c, $: x });
}
function _d(n) {
  return rn(n) ? n : n.contextElement;
}
function Qa(n) {
  const r = _d(n);
  if (!Pn(r)) return gn(1);
  const i = r.getBoundingClientRect(),
    { width: c, height: d, $: f } = yy(r);
  let h = (f ? qi(i.width) : i.width) / c,
    x = (f ? qi(i.height) : i.height) / d;
  return (
    (!h || !Number.isFinite(h)) && (h = 1),
    (!x || !Number.isFinite(x)) && (x = 1),
    { x: h, y: x }
  );
}
const TS = gn(0);
function vy(n) {
  const r = Bt(n);
  return !Md() || !r.visualViewport
    ? TS
    : { x: r.visualViewport.offsetLeft, y: r.visualViewport.offsetTop };
}
function AS(n, r, i) {
  return (r === void 0 && (r = !1), !i || (r && i !== Bt(n)) ? !1 : r);
}
function $s(n, r, i, c) {
  (r === void 0 && (r = !1), i === void 0 && (i = !1));
  const d = n.getBoundingClientRect(),
    f = _d(n);
  let h = gn(1);
  r && (c ? rn(c) && (h = Qa(c)) : (h = Qa(n)));
  const x = AS(f, i, c) ? vy(f) : gn(0);
  let m = (d.left + x.x) / h.x,
    p = (d.top + x.y) / h.y,
    v = d.width / h.x,
    y = d.height / h.y;
  if (f) {
    const N = Bt(f),
      T = c && rn(c) ? Bt(c) : c;
    let R = N,
      S = ed(R);
    for (; S && c && T !== R; ) {
      const C = Qa(S),
        A = S.getBoundingClientRect(),
        U = ln(S),
        z = A.left + (S.clientLeft + parseFloat(U.paddingLeft)) * C.x,
        H = A.top + (S.clientTop + parseFloat(U.paddingTop)) * C.y;
      ((m *= C.x),
        (p *= C.y),
        (v *= C.x),
        (y *= C.y),
        (m += z),
        (p += H),
        (R = Bt(S)),
        (S = ed(R)));
    }
  }
  return Bi({ width: v, height: y, x: m, y: p });
}
function eo(n, r) {
  const i = Wi(n).scrollLeft;
  return r ? r.left + i : $s(bn(n)).left + i;
}
function by(n, r) {
  const i = n.getBoundingClientRect(),
    c = i.left + r.scrollLeft - eo(n, i),
    d = i.top + r.scrollTop;
  return { x: c, y: d };
}
function RS(n) {
  let { elements: r, rect: i, offsetParent: c, strategy: d } = n;
  const f = d === "fixed",
    h = bn(c),
    x = r ? Ii(r.floating) : !1;
  if (c === h || (x && f)) return i;
  let m = { scrollLeft: 0, scrollTop: 0 },
    p = gn(1);
  const v = gn(0),
    y = Pn(c);
  if ((y || (!y && !f)) && ((Za(c) !== "body" || ol(h)) && (m = Wi(c)), y)) {
    const T = $s(c);
    ((p = Qa(c)), (v.x = T.x + c.clientLeft), (v.y = T.y + c.clientTop));
  }
  const N = h && !y && !f ? by(h, m) : gn(0);
  return {
    width: i.width * p.x,
    height: i.height * p.y,
    x: i.x * p.x - m.scrollLeft * p.x + v.x + N.x,
    y: i.y * p.y - m.scrollTop * p.y + v.y + N.y,
  };
}
function CS(n) {
  return Array.from(n.getClientRects());
}
function OS(n) {
  const r = bn(n),
    i = Wi(n),
    c = n.ownerDocument.body,
    d = Lt(r.scrollWidth, r.clientWidth, c.scrollWidth, c.clientWidth),
    f = Lt(r.scrollHeight, r.clientHeight, c.scrollHeight, c.clientHeight);
  let h = -i.scrollLeft + eo(n);
  const x = -i.scrollTop;
  return (
    ln(c).direction === "rtl" && (h += Lt(r.clientWidth, c.clientWidth) - d),
    { width: d, height: f, x: h, y: x }
  );
}
const Mx = 25;
function MS(n, r) {
  const i = Bt(n),
    c = bn(n),
    d = i.visualViewport;
  let f = c.clientWidth,
    h = c.clientHeight,
    x = 0,
    m = 0;
  if (d) {
    ((f = d.width), (h = d.height));
    const v = Md();
    (!v || (v && r === "fixed")) && ((x = d.offsetLeft), (m = d.offsetTop));
  }
  const p = eo(c);
  if (p <= 0) {
    const v = c.ownerDocument,
      y = v.body,
      N = getComputedStyle(y),
      T =
        (v.compatMode === "CSS1Compat" &&
          parseFloat(N.marginLeft) + parseFloat(N.marginRight)) ||
        0,
      R = Math.abs(c.clientWidth - y.clientWidth - T);
    R <= Mx && (f -= R);
  } else p <= Mx && (f += p);
  return { width: f, height: h, x, y: m };
}
function _S(n, r) {
  const i = $s(n, !0, r === "fixed"),
    c = i.top + n.clientTop,
    d = i.left + n.clientLeft,
    f = Pn(n) ? Qa(n) : gn(1),
    h = n.clientWidth * f.x,
    x = n.clientHeight * f.y,
    m = d * f.x,
    p = c * f.y;
  return { width: h, height: x, x: m, y: p };
}
function _x(n, r, i) {
  let c;
  if (r === "viewport") c = MS(n, i);
  else if (r === "document") c = OS(bn(n));
  else if (rn(r)) c = _S(r, i);
  else {
    const d = vy(n);
    c = { x: r.x - d.x, y: r.y - d.y, width: r.width, height: r.height };
  }
  return Bi(c);
}
function jy(n, r) {
  const i = Ns(n);
  return i === r || !rn(i) || Pa(i)
    ? !1
    : ln(i).position === "fixed" || jy(i, r);
}
function kS(n, r) {
  const i = r.get(n);
  if (i) return i;
  let c = nl(n, [], !1).filter((x) => rn(x) && Za(x) !== "body"),
    d = null;
  const f = ln(n).position === "fixed";
  let h = f ? Ns(n) : n;
  for (; rn(h) && !Pa(h); ) {
    const x = ln(h),
      m = Od(h);
    (!m && x.position === "fixed" && (d = null),
      (
        f
          ? !m && !d
          : (!m &&
              x.position === "static" &&
              !!d &&
              (d.position === "absolute" || d.position === "fixed")) ||
            (ol(h) && !m && jy(n, h))
      )
        ? (c = c.filter((v) => v !== h))
        : (d = x),
      (h = Ns(h)));
  }
  return (r.set(n, c), c);
}
function DS(n) {
  let { element: r, boundary: i, rootBoundary: c, strategy: d } = n;
  const h = [
      ...(i === "clippingAncestors"
        ? Ii(r)
          ? []
          : kS(r, this._c)
        : [].concat(i)),
      c,
    ],
    x = _x(r, h[0], d);
  let m = x.top,
    p = x.right,
    v = x.bottom,
    y = x.left;
  for (let N = 1; N < h.length; N++) {
    const T = _x(r, h[N], d);
    ((m = Lt(T.top, m)),
      (p = js(T.right, p)),
      (v = js(T.bottom, v)),
      (y = Lt(T.left, y)));
  }
  return { width: p - y, height: v - m, x: y, y: m };
}
function zS(n) {
  const { width: r, height: i } = yy(n);
  return { width: r, height: i };
}
function LS(n, r, i) {
  const c = Pn(r),
    d = bn(r),
    f = i === "fixed",
    h = $s(n, !0, f, r);
  let x = { scrollLeft: 0, scrollTop: 0 };
  const m = gn(0);
  function p() {
    m.x = eo(d);
  }
  if (c || (!c && !f))
    if (((Za(r) !== "body" || ol(d)) && (x = Wi(r)), c)) {
      const T = $s(r, !0, f, r);
      ((m.x = T.x + r.clientLeft), (m.y = T.y + r.clientTop));
    } else d && p();
  f && !c && d && p();
  const v = d && !c && !f ? by(d, x) : gn(0),
    y = h.left + x.scrollLeft - m.x - v.x,
    N = h.top + x.scrollTop - m.y - v.y;
  return { x: y, y: N, width: h.width, height: h.height };
}
function _u(n) {
  return ln(n).position === "static";
}
function kx(n, r) {
  if (!Pn(n) || ln(n).position === "fixed") return null;
  if (r) return r(n);
  let i = n.offsetParent;
  return (bn(n) === i && (i = i.ownerDocument.body), i);
}
function Ny(n, r) {
  const i = Bt(n);
  if (Ii(n)) return i;
  if (!Pn(n)) {
    let d = Ns(n);
    for (; d && !Pa(d); ) {
      if (rn(d) && !_u(d)) return d;
      d = Ns(d);
    }
    return i;
  }
  let c = kx(n, r);
  for (; c && NS(c) && _u(c); ) c = kx(c, r);
  return c && Pa(c) && _u(c) && !Od(c) ? i : c || ES(n) || i;
}
const US = async function (n) {
  const r = this.getOffsetParent || Ny,
    i = this.getDimensions,
    c = await i(n.floating);
  return {
    reference: LS(n.reference, await r(n.floating), n.strategy),
    floating: { x: 0, y: 0, width: c.width, height: c.height },
  };
};
function qS(n) {
  return ln(n).direction === "rtl";
}
const HS = {
  convertOffsetParentRelativeRectToViewportRelativeRect: RS,
  getDocumentElement: bn,
  getClippingRect: DS,
  getOffsetParent: Ny,
  getElementRects: US,
  getClientRects: CS,
  getDimensions: zS,
  getScale: Qa,
  isElement: rn,
  isRTL: qS,
};
function wy(n, r) {
  return (
    n.x === r.x && n.y === r.y && n.width === r.width && n.height === r.height
  );
}
function BS(n, r) {
  let i = null,
    c;
  const d = bn(n);
  function f() {
    var x;
    (clearTimeout(c), (x = i) == null || x.disconnect(), (i = null));
  }
  function h(x, m) {
    (x === void 0 && (x = !1), m === void 0 && (m = 1), f());
    const p = n.getBoundingClientRect(),
      { left: v, top: y, width: N, height: T } = p;
    if ((x || r(), !N || !T)) return;
    const R = Oi(y),
      S = Oi(d.clientWidth - (v + N)),
      C = Oi(d.clientHeight - (y + T)),
      A = Oi(v),
      z = {
        rootMargin: -R + "px " + -S + "px " + -C + "px " + -A + "px",
        threshold: Lt(0, js(1, m)) || 1,
      };
    let H = !0;
    function V(F) {
      const Z = F[0].intersectionRatio;
      if (Z !== m) {
        if (!H) return h();
        Z
          ? h(!1, Z)
          : (c = setTimeout(() => {
              h(!1, 1e-7);
            }, 1e3));
      }
      (Z === 1 && !wy(p, n.getBoundingClientRect()) && h(), (H = !1));
    }
    try {
      i = new IntersectionObserver(V, { ...z, root: d.ownerDocument });
    } catch {
      i = new IntersectionObserver(V, z);
    }
    i.observe(n);
  }
  return (h(!0), f);
}
function GS(n, r, i, c) {
  c === void 0 && (c = {});
  const {
      ancestorScroll: d = !0,
      ancestorResize: f = !0,
      elementResize: h = typeof ResizeObserver == "function",
      layoutShift: x = typeof IntersectionObserver == "function",
      animationFrame: m = !1,
    } = c,
    p = _d(n),
    v = d || f ? [...(p ? nl(p) : []), ...(r ? nl(r) : [])] : [];
  v.forEach((A) => {
    (d && A.addEventListener("scroll", i, { passive: !0 }),
      f && A.addEventListener("resize", i));
  });
  const y = p && x ? BS(p, i) : null;
  let N = -1,
    T = null;
  h &&
    ((T = new ResizeObserver((A) => {
      let [U] = A;
      (U &&
        U.target === p &&
        T &&
        r &&
        (T.unobserve(r),
        cancelAnimationFrame(N),
        (N = requestAnimationFrame(() => {
          var z;
          (z = T) == null || z.observe(r);
        }))),
        i());
    })),
    p && !m && T.observe(p),
    r && T.observe(r));
  let R,
    S = m ? $s(n) : null;
  m && C();
  function C() {
    const A = $s(n);
    (S && !wy(S, A) && i(), (S = A), (R = requestAnimationFrame(C)));
  }
  return (
    i(),
    () => {
      var A;
      (v.forEach((U) => {
        (d && U.removeEventListener("scroll", i),
          f && U.removeEventListener("resize", i));
      }),
        y?.(),
        (A = T) == null || A.disconnect(),
        (T = null),
        m && cancelAnimationFrame(R));
    }
  );
}
const QS = yS,
  PS = vS,
  YS = pS,
  VS = jS,
  KS = xS,
  Dx = mS,
  XS = bS,
  FS = (n, r, i) => {
    const c = new Map(),
      d = { platform: HS, ...i },
      f = { ...d.platform, _c: c };
    return hS(n, r, { ...d, platform: f });
  };
var ZS = typeof document < "u",
  $S = function () {},
  zi = ZS ? j.useLayoutEffect : $S;
function Gi(n, r) {
  if (n === r) return !0;
  if (typeof n != typeof r) return !1;
  if (typeof n == "function" && n.toString() === r.toString()) return !0;
  let i, c, d;
  if (n && r && typeof n == "object") {
    if (Array.isArray(n)) {
      if (((i = n.length), i !== r.length)) return !1;
      for (c = i; c-- !== 0; ) if (!Gi(n[c], r[c])) return !1;
      return !0;
    }
    if (((d = Object.keys(n)), (i = d.length), i !== Object.keys(r).length))
      return !1;
    for (c = i; c-- !== 0; ) if (!{}.hasOwnProperty.call(r, d[c])) return !1;
    for (c = i; c-- !== 0; ) {
      const f = d[c];
      if (!(f === "_owner" && n.$$typeof) && !Gi(n[f], r[f])) return !1;
    }
    return !0;
  }
  return n !== n && r !== r;
}
function Sy(n) {
  return typeof window > "u"
    ? 1
    : (n.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function zx(n, r) {
  const i = Sy(n);
  return Math.round(r * i) / i;
}
function ku(n) {
  const r = j.useRef(n);
  return (
    zi(() => {
      r.current = n;
    }),
    r
  );
}
function JS(n) {
  n === void 0 && (n = {});
  const {
      placement: r = "bottom",
      strategy: i = "absolute",
      middleware: c = [],
      platform: d,
      elements: { reference: f, floating: h } = {},
      transform: x = !0,
      whileElementsMounted: m,
      open: p,
    } = n,
    [v, y] = j.useState({
      x: 0,
      y: 0,
      strategy: i,
      placement: r,
      middlewareData: {},
      isPositioned: !1,
    }),
    [N, T] = j.useState(c);
  Gi(N, c) || T(c);
  const [R, S] = j.useState(null),
    [C, A] = j.useState(null),
    U = j.useCallback((X) => {
      X !== F.current && ((F.current = X), S(X));
    }, []),
    z = j.useCallback((X) => {
      X !== Z.current && ((Z.current = X), A(X));
    }, []),
    H = f || R,
    V = h || C,
    F = j.useRef(null),
    Z = j.useRef(null),
    G = j.useRef(v),
    re = m != null,
    he = ku(m),
    me = ku(d),
    ue = ku(p),
    ye = j.useCallback(() => {
      if (!F.current || !Z.current) return;
      const X = { placement: r, strategy: i, middleware: N };
      (me.current && (X.platform = me.current),
        FS(F.current, Z.current, X).then((le) => {
          const w = { ...le, isPositioned: ue.current !== !1 };
          I.current &&
            !Gi(G.current, w) &&
            ((G.current = w),
            Xi.flushSync(() => {
              y(w);
            }));
        }));
    }, [N, r, i, me, ue]);
  zi(() => {
    p === !1 &&
      G.current.isPositioned &&
      ((G.current.isPositioned = !1), y((X) => ({ ...X, isPositioned: !1 })));
  }, [p]);
  const I = j.useRef(!1);
  (zi(
    () => (
      (I.current = !0),
      () => {
        I.current = !1;
      }
    ),
    [],
  ),
    zi(() => {
      if ((H && (F.current = H), V && (Z.current = V), H && V)) {
        if (he.current) return he.current(H, V, ye);
        ye();
      }
    }, [H, V, ye, he, re]));
  const de = j.useMemo(
      () => ({ reference: F, floating: Z, setReference: U, setFloating: z }),
      [U, z],
    ),
    _ = j.useMemo(() => ({ reference: H, floating: V }), [H, V]),
    K = j.useMemo(() => {
      const X = { position: i, left: 0, top: 0 };
      if (!_.floating) return X;
      const le = zx(_.floating, v.x),
        w = zx(_.floating, v.y);
      return x
        ? {
            ...X,
            transform: "translate(" + le + "px, " + w + "px)",
            ...(Sy(_.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: i, left: le, top: w };
    }, [i, x, _.floating, v.x, v.y]);
  return j.useMemo(
    () => ({ ...v, update: ye, refs: de, elements: _, floatingStyles: K }),
    [v, ye, de, _, K],
  );
}
const IS = (n) => {
    function r(i) {
      return {}.hasOwnProperty.call(i, "current");
    }
    return {
      name: "arrow",
      options: n,
      fn(i) {
        const { element: c, padding: d } = typeof n == "function" ? n(i) : n;
        return c && r(c)
          ? c.current != null
            ? Dx({ element: c.current, padding: d }).fn(i)
            : {}
          : c
            ? Dx({ element: c, padding: d }).fn(i)
            : {};
      },
    };
  },
  WS = (n, r) => {
    const i = QS(n);
    return { name: i.name, fn: i.fn, options: [n, r] };
  },
  e2 = (n, r) => {
    const i = PS(n);
    return { name: i.name, fn: i.fn, options: [n, r] };
  },
  t2 = (n, r) => ({ fn: XS(n).fn, options: [n, r] }),
  n2 = (n, r) => {
    const i = YS(n);
    return { name: i.name, fn: i.fn, options: [n, r] };
  },
  s2 = (n, r) => {
    const i = VS(n);
    return { name: i.name, fn: i.fn, options: [n, r] };
  },
  a2 = (n, r) => {
    const i = KS(n);
    return { name: i.name, fn: i.fn, options: [n, r] };
  },
  r2 = (n, r) => {
    const i = IS(n);
    return { name: i.name, fn: i.fn, options: [n, r] };
  };
var l2 = "Arrow",
  Ey = j.forwardRef((n, r) => {
    const { children: i, width: c = 10, height: d = 5, ...f } = n;
    return l.jsx(We.svg, {
      ...f,
      ref: r,
      width: c,
      height: d,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: n.asChild ? i : l.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
Ey.displayName = l2;
var i2 = Ey;
function o2(n) {
  const [r, i] = j.useState(void 0);
  return (
    Bn(() => {
      if (n) {
        i({ width: n.offsetWidth, height: n.offsetHeight });
        const c = new ResizeObserver((d) => {
          if (!Array.isArray(d) || !d.length) return;
          const f = d[0];
          let h, x;
          if ("borderBoxSize" in f) {
            const m = f.borderBoxSize,
              p = Array.isArray(m) ? m[0] : m;
            ((h = p.inlineSize), (x = p.blockSize));
          } else ((h = n.offsetWidth), (x = n.offsetHeight));
          i({ width: h, height: x });
        });
        return (c.observe(n, { box: "border-box" }), () => c.unobserve(n));
      } else i(void 0);
    }, [n]),
    r
  );
}
var Ty = "Popper",
  [Ay, Ry] = Xa(Ty),
  [tA, Cy] = Ay(Ty),
  Oy = "PopperAnchor",
  My = j.forwardRef((n, r) => {
    const { __scopePopper: i, virtualRef: c, ...d } = n,
      f = Cy(Oy, i),
      h = j.useRef(null),
      x = It(r, h),
      m = j.useRef(null);
    return (
      j.useEffect(() => {
        const p = m.current;
        ((m.current = c?.current || h.current),
          p !== m.current && f.onAnchorChange(m.current));
      }),
      c ? null : l.jsx(We.div, { ...d, ref: x })
    );
  });
My.displayName = Oy;
var kd = "PopperContent",
  [c2, u2] = Ay(kd),
  _y = j.forwardRef((n, r) => {
    const {
        __scopePopper: i,
        side: c = "bottom",
        sideOffset: d = 0,
        align: f = "center",
        alignOffset: h = 0,
        arrowPadding: x = 0,
        avoidCollisions: m = !0,
        collisionBoundary: p = [],
        collisionPadding: v = 0,
        sticky: y = "partial",
        hideWhenDetached: N = !1,
        updatePositionStrategy: T = "optimized",
        onPlaced: R,
        ...S
      } = n,
      C = Cy(kd, i),
      [A, U] = j.useState(null),
      z = It(r, (Qe) => U(Qe)),
      [H, V] = j.useState(null),
      F = o2(H),
      Z = F?.width ?? 0,
      G = F?.height ?? 0,
      re = c + (f !== "center" ? "-" + f : ""),
      he =
        typeof v == "number"
          ? v
          : { top: 0, right: 0, bottom: 0, left: 0, ...v },
      me = Array.isArray(p) ? p : [p],
      ue = me.length > 0,
      ye = { padding: he, boundary: me.filter(f2), altBoundary: ue },
      {
        refs: I,
        floatingStyles: de,
        placement: _,
        isPositioned: K,
        middlewareData: X,
      } = JS({
        strategy: "fixed",
        placement: re,
        whileElementsMounted: (...Qe) =>
          GS(...Qe, { animationFrame: T === "always" }),
        elements: { reference: C.anchor },
        middleware: [
          WS({ mainAxis: d + G, alignmentAxis: h }),
          m &&
            e2({
              mainAxis: !0,
              crossAxis: !1,
              limiter: y === "partial" ? t2() : void 0,
              ...ye,
            }),
          m && n2({ ...ye }),
          s2({
            ...ye,
            apply: ({
              elements: Qe,
              rects: Me,
              availableWidth: _e,
              availableHeight: Yn,
            }) => {
              const { width: en, height: on } = Me.reference,
                Qt = Qe.floating.style;
              (Qt.setProperty("--radix-popper-available-width", `${_e}px`),
                Qt.setProperty("--radix-popper-available-height", `${Yn}px`),
                Qt.setProperty("--radix-popper-anchor-width", `${en}px`),
                Qt.setProperty("--radix-popper-anchor-height", `${on}px`));
            },
          }),
          H && r2({ element: H, padding: x }),
          h2({ arrowWidth: Z, arrowHeight: G }),
          N && a2({ strategy: "referenceHidden", ...ye }),
        ],
      }),
      [le, w] = zy(_),
      Y = Hn(R);
    Bn(() => {
      K && Y?.();
    }, [K, Y]);
    const J = X.arrow?.x,
      $ = X.arrow?.y,
      se = X.arrow?.centerOffset !== 0,
      [oe, ne] = j.useState();
    return (
      Bn(() => {
        A && ne(window.getComputedStyle(A).zIndex);
      }, [A]),
      l.jsx("div", {
        ref: I.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...de,
          transform: K ? de.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: oe,
          "--radix-popper-transform-origin": [
            X.transformOrigin?.x,
            X.transformOrigin?.y,
          ].join(" "),
          ...(X.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: n.dir,
        children: l.jsx(c2, {
          scope: i,
          placedSide: le,
          onArrowChange: V,
          arrowX: J,
          arrowY: $,
          shouldHideArrow: se,
          children: l.jsx(We.div, {
            "data-side": le,
            "data-align": w,
            ...S,
            ref: z,
            style: { ...S.style, animation: K ? void 0 : "none" },
          }),
        }),
      })
    );
  });
_y.displayName = kd;
var ky = "PopperArrow",
  d2 = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Dy = j.forwardRef(function (r, i) {
    const { __scopePopper: c, ...d } = r,
      f = u2(ky, c),
      h = d2[f.placedSide];
    return l.jsx("span", {
      ref: f.onArrowChange,
      style: {
        position: "absolute",
        left: f.arrowX,
        top: f.arrowY,
        [h]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[f.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[f.placedSide],
        visibility: f.shouldHideArrow ? "hidden" : void 0,
      },
      children: l.jsx(i2, {
        ...d,
        ref: i,
        style: { ...d.style, display: "block" },
      }),
    });
  });
Dy.displayName = ky;
function f2(n) {
  return n !== null;
}
var h2 = (n) => ({
  name: "transformOrigin",
  options: n,
  fn(r) {
    const { placement: i, rects: c, middlewareData: d } = r,
      h = d.arrow?.centerOffset !== 0,
      x = h ? 0 : n.arrowWidth,
      m = h ? 0 : n.arrowHeight,
      [p, v] = zy(i),
      y = { start: "0%", center: "50%", end: "100%" }[v],
      N = (d.arrow?.x ?? 0) + x / 2,
      T = (d.arrow?.y ?? 0) + m / 2;
    let R = "",
      S = "";
    return (
      p === "bottom"
        ? ((R = h ? y : `${N}px`), (S = `${-m}px`))
        : p === "top"
          ? ((R = h ? y : `${N}px`), (S = `${c.floating.height + m}px`))
          : p === "right"
            ? ((R = `${-m}px`), (S = h ? y : `${T}px`))
            : p === "left" &&
              ((R = `${c.floating.width + m}px`), (S = h ? y : `${T}px`)),
      { data: { x: R, y: S } }
    );
  },
});
function zy(n) {
  const [r, i = "center"] = n.split("-");
  return [r, i];
}
var m2 = My,
  p2 = _y,
  x2 = Dy,
  [to] = Xa("Tooltip", [Ry]),
  Dd = Ry(),
  Ly = "TooltipProvider",
  g2 = 700,
  Lx = "tooltip.open",
  [y2, Uy] = to(Ly),
  qy = (n) => {
    const {
        __scopeTooltip: r,
        delayDuration: i = g2,
        skipDelayDuration: c = 300,
        disableHoverableContent: d = !1,
        children: f,
      } = n,
      h = j.useRef(!0),
      x = j.useRef(!1),
      m = j.useRef(0);
    return (
      j.useEffect(() => {
        const p = m.current;
        return () => window.clearTimeout(p);
      }, []),
      l.jsx(y2, {
        scope: r,
        isOpenDelayedRef: h,
        delayDuration: i,
        onOpen: j.useCallback(() => {
          (window.clearTimeout(m.current), (h.current = !1));
        }, []),
        onClose: j.useCallback(() => {
          (window.clearTimeout(m.current),
            (m.current = window.setTimeout(() => (h.current = !0), c)));
        }, [c]),
        isPointerInTransitRef: x,
        onPointerInTransitChange: j.useCallback((p) => {
          x.current = p;
        }, []),
        disableHoverableContent: d,
        children: f,
      })
    );
  };
qy.displayName = Ly;
var Hy = "Tooltip",
  [nA, cl] = to(Hy),
  td = "TooltipTrigger",
  v2 = j.forwardRef((n, r) => {
    const { __scopeTooltip: i, ...c } = n,
      d = cl(td, i),
      f = Uy(td, i),
      h = Dd(i),
      x = j.useRef(null),
      m = It(r, x, d.onTriggerChange),
      p = j.useRef(!1),
      v = j.useRef(!1),
      y = j.useCallback(() => (p.current = !1), []);
    return (
      j.useEffect(
        () => () => document.removeEventListener("pointerup", y),
        [y],
      ),
      l.jsx(m2, {
        asChild: !0,
        ...h,
        children: l.jsx(We.button, {
          "aria-describedby": d.open ? d.contentId : void 0,
          "data-state": d.stateAttribute,
          ...c,
          ref: m,
          onPointerMove: He(n.onPointerMove, (N) => {
            N.pointerType !== "touch" &&
              !v.current &&
              !f.isPointerInTransitRef.current &&
              (d.onTriggerEnter(), (v.current = !0));
          }),
          onPointerLeave: He(n.onPointerLeave, () => {
            (d.onTriggerLeave(), (v.current = !1));
          }),
          onPointerDown: He(n.onPointerDown, () => {
            (d.open && d.onClose(),
              (p.current = !0),
              document.addEventListener("pointerup", y, { once: !0 }));
          }),
          onFocus: He(n.onFocus, () => {
            p.current || d.onOpen();
          }),
          onBlur: He(n.onBlur, d.onClose),
          onClick: He(n.onClick, d.onClose),
        }),
      })
    );
  });
v2.displayName = td;
var zd = "TooltipPortal",
  [b2, j2] = to(zd, { forceMount: void 0 }),
  By = (n) => {
    const { __scopeTooltip: r, forceMount: i, children: c, container: d } = n,
      f = cl(zd, r);
    return l.jsx(b2, {
      scope: r,
      forceMount: i,
      children: l.jsx(sl, {
        present: i || f.open,
        children: l.jsx(gd, { asChild: !0, container: d, children: c }),
      }),
    });
  };
By.displayName = zd;
var Ya = "TooltipContent",
  Gy = j.forwardRef((n, r) => {
    const i = j2(Ya, n.__scopeTooltip),
      { forceMount: c = i.forceMount, side: d = "top", ...f } = n,
      h = cl(Ya, n.__scopeTooltip);
    return l.jsx(sl, {
      present: c || h.open,
      children: h.disableHoverableContent
        ? l.jsx(Qy, { side: d, ...f, ref: r })
        : l.jsx(N2, { side: d, ...f, ref: r }),
    });
  }),
  N2 = j.forwardRef((n, r) => {
    const i = cl(Ya, n.__scopeTooltip),
      c = Uy(Ya, n.__scopeTooltip),
      d = j.useRef(null),
      f = It(r, d),
      [h, x] = j.useState(null),
      { trigger: m, onClose: p } = i,
      v = d.current,
      { onPointerInTransitChange: y } = c,
      N = j.useCallback(() => {
        (x(null), y(!1));
      }, [y]),
      T = j.useCallback(
        (R, S) => {
          const C = R.currentTarget,
            A = { x: R.clientX, y: R.clientY },
            U = A2(A, C.getBoundingClientRect()),
            z = R2(A, U),
            H = C2(S.getBoundingClientRect()),
            V = M2([...z, ...H]);
          (x(V), y(!0));
        },
        [y],
      );
    return (
      j.useEffect(() => () => N(), [N]),
      j.useEffect(() => {
        if (m && v) {
          const R = (C) => T(C, v),
            S = (C) => T(C, m);
          return (
            m.addEventListener("pointerleave", R),
            v.addEventListener("pointerleave", S),
            () => {
              (m.removeEventListener("pointerleave", R),
                v.removeEventListener("pointerleave", S));
            }
          );
        }
      }, [m, v, T, N]),
      j.useEffect(() => {
        if (h) {
          const R = (S) => {
            const C = S.target,
              A = { x: S.clientX, y: S.clientY },
              U = m?.contains(C) || v?.contains(C),
              z = !O2(A, h);
            U ? N() : z && (N(), p());
          };
          return (
            document.addEventListener("pointermove", R),
            () => document.removeEventListener("pointermove", R)
          );
        }
      }, [m, v, h, p, N]),
      l.jsx(Qy, { ...n, ref: f })
    );
  }),
  [w2, S2] = to(Hy, { isInside: !1 }),
  E2 = hj("TooltipContent"),
  Qy = j.forwardRef((n, r) => {
    const {
        __scopeTooltip: i,
        children: c,
        "aria-label": d,
        onEscapeKeyDown: f,
        onPointerDownOutside: h,
        ...x
      } = n,
      m = cl(Ya, i),
      p = Dd(i),
      { onClose: v } = m;
    return (
      j.useEffect(
        () => (
          document.addEventListener(Lx, v),
          () => document.removeEventListener(Lx, v)
        ),
        [v],
      ),
      j.useEffect(() => {
        if (m.trigger) {
          const y = (N) => {
            N.target?.contains(m.trigger) && v();
          };
          return (
            window.addEventListener("scroll", y, { capture: !0 }),
            () => window.removeEventListener("scroll", y, { capture: !0 })
          );
        }
      }, [m.trigger, v]),
      l.jsx(xd, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: f,
        onPointerDownOutside: h,
        onFocusOutside: (y) => y.preventDefault(),
        onDismiss: v,
        children: l.jsxs(p2, {
          "data-state": m.stateAttribute,
          ...p,
          ...x,
          ref: r,
          style: {
            ...x.style,
            "--radix-tooltip-content-transform-origin":
              "var(--radix-popper-transform-origin)",
            "--radix-tooltip-content-available-width":
              "var(--radix-popper-available-width)",
            "--radix-tooltip-content-available-height":
              "var(--radix-popper-available-height)",
            "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-tooltip-trigger-height":
              "var(--radix-popper-anchor-height)",
          },
          children: [
            l.jsx(E2, { children: c }),
            l.jsx(w2, {
              scope: i,
              isInside: !0,
              children: l.jsx(Lj, {
                id: m.contentId,
                role: "tooltip",
                children: d || c,
              }),
            }),
          ],
        }),
      })
    );
  });
Gy.displayName = Ya;
var Py = "TooltipArrow",
  T2 = j.forwardRef((n, r) => {
    const { __scopeTooltip: i, ...c } = n,
      d = Dd(i);
    return S2(Py, i).isInside ? null : l.jsx(x2, { ...d, ...c, ref: r });
  });
T2.displayName = Py;
function A2(n, r) {
  const i = Math.abs(r.top - n.y),
    c = Math.abs(r.bottom - n.y),
    d = Math.abs(r.right - n.x),
    f = Math.abs(r.left - n.x);
  switch (Math.min(i, c, d, f)) {
    case f:
      return "left";
    case d:
      return "right";
    case i:
      return "top";
    case c:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function R2(n, r, i = 5) {
  const c = [];
  switch (r) {
    case "top":
      c.push({ x: n.x - i, y: n.y + i }, { x: n.x + i, y: n.y + i });
      break;
    case "bottom":
      c.push({ x: n.x - i, y: n.y - i }, { x: n.x + i, y: n.y - i });
      break;
    case "left":
      c.push({ x: n.x + i, y: n.y - i }, { x: n.x + i, y: n.y + i });
      break;
    case "right":
      c.push({ x: n.x - i, y: n.y - i }, { x: n.x - i, y: n.y + i });
      break;
  }
  return c;
}
function C2(n) {
  const { top: r, right: i, bottom: c, left: d } = n;
  return [
    { x: d, y: r },
    { x: i, y: r },
    { x: i, y: c },
    { x: d, y: c },
  ];
}
function O2(n, r) {
  const { x: i, y: c } = n;
  let d = !1;
  for (let f = 0, h = r.length - 1; f < r.length; h = f++) {
    const x = r[f],
      m = r[h],
      p = x.x,
      v = x.y,
      y = m.x,
      N = m.y;
    v > c != N > c && i < ((y - p) * (c - v)) / (N - v) + p && (d = !d);
  }
  return d;
}
function M2(n) {
  const r = n.slice();
  return (
    r.sort((i, c) =>
      i.x < c.x ? -1 : i.x > c.x ? 1 : i.y < c.y ? -1 : i.y > c.y ? 1 : 0,
    ),
    _2(r)
  );
}
function _2(n) {
  if (n.length <= 1) return n.slice();
  const r = [];
  for (let c = 0; c < n.length; c++) {
    const d = n[c];
    for (; r.length >= 2; ) {
      const f = r[r.length - 1],
        h = r[r.length - 2];
      if ((f.x - h.x) * (d.y - h.y) >= (f.y - h.y) * (d.x - h.x)) r.pop();
      else break;
    }
    r.push(d);
  }
  r.pop();
  const i = [];
  for (let c = n.length - 1; c >= 0; c--) {
    const d = n[c];
    for (; i.length >= 2; ) {
      const f = i[i.length - 1],
        h = i[i.length - 2];
      if ((f.x - h.x) * (d.y - h.y) >= (f.y - h.y) * (d.x - h.x)) i.pop();
      else break;
    }
    i.push(d);
  }
  return (
    i.pop(),
    r.length === 1 && i.length === 1 && r[0].x === i[0].x && r[0].y === i[0].y
      ? r
      : r.concat(i)
  );
}
var k2 = qy,
  D2 = By,
  Yy = Gy;
const z2 = k2,
  L2 = j.forwardRef(({ className: n, sideOffset: r = 4, ...i }, c) =>
    l.jsx(D2, {
      children: l.jsx(Yy, {
        ref: c,
        sideOffset: r,
        className: ze(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
          n,
        ),
        ...i,
      }),
    }),
  );
L2.displayName = Yy.displayName;
const Ae = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", {
    ref: i,
    className: ze("rounded-xl border bg-card text-card-foreground shadow", n),
    ...r,
  }),
);
Ae.displayName = "Card";
const ws = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", {
    ref: i,
    className: ze("flex flex-col space-y-1.5 p-6", n),
    ...r,
  }),
);
ws.displayName = "CardHeader";
const Ss = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", {
    ref: i,
    className: ze("font-semibold leading-none tracking-tight", n),
    ...r,
  }),
);
Ss.displayName = "CardTitle";
const U2 = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", {
    ref: i,
    className: ze("text-sm text-muted-foreground", n),
    ...r,
  }),
);
U2.displayName = "CardDescription";
const Oe = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", { ref: i, className: ze("p-6 pt-0", n), ...r }),
);
Oe.displayName = "CardContent";
const q2 = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", {
    ref: i,
    className: ze("flex items-center p-6 pt-0", n),
    ...r,
  }),
);
q2.displayName = "CardFooter";
function H2() {
  return l.jsx("div", {
    className:
      "min-h-screen w-full flex items-center justify-center bg-gray-50",
    children: l.jsx(Ae, {
      className: "w-full max-w-md mx-4",
      children: l.jsxs(Oe, {
        className: "pt-6",
        children: [
          l.jsxs("div", {
            className: "flex mb-4 gap-2",
            children: [
              l.jsx(Pg, { className: "h-8 w-8 text-red-500" }),
              l.jsx("h1", {
                className: "text-2xl font-bold text-gray-900",
                children: "404 Page Not Found",
              }),
            ],
          }),
          l.jsx("p", {
            className: "mt-4 text-sm text-gray-600",
            children: "Did you forget to add the page to the router?",
          }),
        ],
      }),
    }),
  });
}
function Wt() {
  const [n, r] = j.useState(null),
    [i, c] = j.useState(!0);
  j.useEffect(() => {
    let h = !1;
    return (
      fetch("/api/auth/user", { credentials: "include" })
        .then((x) => {
          if (!x.ok) throw new Error(`HTTP ${x.status}`);
          return x.json();
        })
        .then((x) => {
          h || (r(x.user ?? null), c(!1));
        })
        .catch(() => {
          h || (r(null), c(!1));
        }),
      () => {
        h = !0;
      }
    );
  }, []);
  const d = j.useCallback(() => {
      const h = window.location.pathname || "/";
      window.location.href = `/login?returnTo=${encodeURIComponent(h)}`;
    }, []),
    f = j.useCallback(async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } finally {
        (r(null), (window.location.href = "/login"));
      }
    }, []);
  return { user: n, isLoading: i, isAuthenticated: !!n, login: d, logout: f };
}
const B2 = new Set([204, 205, 304]),
  G2 = "application/json, application/problem+json";
function Vy(n) {
  return typeof Request < "u" && n instanceof Request;
}
function Q2(n, r) {
  return r ? r.toUpperCase() : Vy(n) ? n.method.toUpperCase() : "GET";
}
function P2(n) {
  return typeof URL < "u" && n instanceof URL;
}
function Y2(n) {
  return typeof n == "string" ? n : P2(n) ? n.toString() : n.url;
}
function V2(...n) {
  const r = new Headers();
  for (const i of n)
    i &&
      new Headers(i).forEach((c, d) => {
        r.set(d, c);
      });
  return r;
}
function Ky(n) {
  const r = n.get("content-type");
  return r ? r.split(";", 1)[0].trim().toLowerCase() : null;
}
function nd(n) {
  return n === "application/json" || !!n?.endsWith("+json");
}
function Xy(n) {
  return !!(
    n &&
    (n.startsWith("text/") ||
      n === "application/xml" ||
      n === "text/xml" ||
      n.endsWith("+xml") ||
      n === "application/x-www-form-urlencoded")
  );
}
function Fy(n, r) {
  return !!(
    r === "HEAD" ||
    B2.has(n.status) ||
    n.headers.get("content-length") === "0" ||
    n.body === null
  );
}
function Zy(n) {
  return n.charCodeAt(0) === 65279 ? n.slice(1) : n;
}
function $y(n) {
  const r = n.trimStart();
  return r.startsWith("{") || r.startsWith("[");
}
function $r(n, r) {
  if (!n || typeof n != "object") return;
  const i = n[r];
  if (typeof i != "string") return;
  const c = i.trim();
  return c === "" ? void 0 : c;
}
function K2(n, r = 300) {
  return n.length > r ? `${n.slice(0, r - 1)}…` : n;
}
function X2(n, r) {
  const i = `HTTP ${n.status} ${n.statusText}`;
  if (typeof r == "string") {
    const h = r.trim();
    return h ? `${i}: ${K2(h)}` : i;
  }
  const c = $r(r, "title"),
    d = $r(r, "detail"),
    f = $r(r, "message") ?? $r(r, "error_description") ?? $r(r, "error");
  return c && d
    ? `${i}: ${c} — ${d}`
    : d
      ? `${i}: ${d}`
      : f
        ? `${i}: ${f}`
        : c
          ? `${i}: ${c}`
          : i;
}
class F2 extends Error {
  name = "ApiError";
  status;
  statusText;
  data;
  headers;
  response;
  method;
  url;
  constructor(r, i, c) {
    (super(X2(r, i)),
      Object.setPrototypeOf(this, new.target.prototype),
      (this.status = r.status),
      (this.statusText = r.statusText),
      (this.data = i),
      (this.headers = r.headers),
      (this.response = r),
      (this.method = c.method),
      (this.url = r.url || c.url));
  }
}
class Z2 extends Error {
  name = "ResponseParseError";
  status;
  statusText;
  headers;
  response;
  method;
  url;
  rawBody;
  cause;
  constructor(r, i, c, d) {
    (super(
      `Failed to parse response from ${d.method} ${r.url || d.url} (${r.status} ${r.statusText}) as JSON`,
    ),
      Object.setPrototypeOf(this, new.target.prototype),
      (this.status = r.status),
      (this.statusText = r.statusText),
      (this.headers = r.headers),
      (this.response = r),
      (this.method = d.method),
      (this.url = r.url || d.url),
      (this.rawBody = i),
      (this.cause = c));
  }
}
async function $2(n, r) {
  const i = await n.text(),
    c = Zy(i);
  if (c.trim() === "") return null;
  try {
    return JSON.parse(c);
  } catch (d) {
    throw new Z2(n, i, d, r);
  }
}
async function J2(n, r) {
  if (Fy(n, r)) return null;
  const i = Ky(n.headers);
  if (i && !nd(i) && !Xy(i))
    return typeof n.blob == "function" ? n.blob() : n.text();
  const c = await n.text(),
    d = Zy(c);
  if (d.trim() === "") return null;
  if (nd(i) || $y(d))
    try {
      return JSON.parse(d);
    } catch {
      return c;
    }
  return c;
}
function I2(n) {
  const r = Ky(n.headers);
  return nd(r) ? "json" : Xy(r) || r == null ? "text" : "blob";
}
async function W2(n, r, i) {
  if (Fy(n, i.method)) return null;
  switch (r === "auto" ? I2(n) : r) {
    case "json":
      return $2(n, i);
    case "text": {
      const d = await n.text();
      return d === "" ? null : d;
    }
    case "blob":
      if (typeof n.blob != "function")
        throw new TypeError(
          'Blob responses are not supported in this runtime. Use responseType "json" or "text" instead.',
        );
      return n.blob();
  }
}
async function na(n, r = {}) {
  n = n;
  const { responseType: i = "auto", headers: c, ...d } = r,
    f = Q2(n, d.method);
  if (d.body != null && (f === "GET" || f === "HEAD"))
    throw new TypeError(`customFetch: ${f} requests cannot have a body.`);
  const h = V2(Vy(n) ? n.headers : void 0, c);
  (typeof d.body == "string" &&
    !h.has("content-type") &&
    $y(d.body) &&
    h.set("content-type", "application/json"),
    i === "json" && !h.has("accept") && h.set("accept", G2));
  const x = { method: f, url: Y2(n) },
    m = await fetch(n, { ...d, method: f, headers: h });
  if (!m.ok) {
    const p = await J2(m, f);
    throw new F2(m, p, x);
  }
  return await W2(m, i, x);
}
const eE = () => "/api/groups",
  tE = async (n) => na(eE(), { ...n, method: "GET" }),
  nE = () => ["/api/groups"],
  sE = (n) => {
    const { query: r, request: i } = {};
    return {
      queryKey: r?.queryKey ?? nE(),
      queryFn: ({ signal: f }) => tE({ signal: f, ...i }),
      ...r,
    };
  };
function aE(n) {
  const r = sE();
  return { ...at(r), queryKey: r.queryKey };
}
const rE = (n) => {
    const r = new URLSearchParams();
    Object.entries({}).forEach(([c, d]) => {
      d !== void 0 && r.append(c, d === null ? "null" : d.toString());
    });
    const i = r.toString();
    return i.length > 0 ? `/api/matches?${i}` : "/api/matches";
  },
  lE = async (n, r) => na(rE(), { ...r, method: "GET" }),
  Ld = (n) => ["/api/matches"],
  iE = (n, r) => {
    const { query: i, request: c } = {};
    return {
      queryKey: i?.queryKey ?? Ld(),
      queryFn: ({ signal: h }) => lE(n, { signal: h, ...c }),
      ...i,
    };
  };
function no(n, r) {
  const i = iE(n);
  return { ...at(i), queryKey: i.queryKey };
}
const oE = () => "/api/rounds",
  cE = async (n) => na(oE(), { ...n, method: "GET" }),
  Jy = () => ["/api/rounds"],
  uE = (n) => {
    const { query: r, request: i } = {};
    return {
      queryKey: r?.queryKey ?? Jy(),
      queryFn: ({ signal: f }) => cE({ signal: f, ...i }),
      ...r,
    };
  };
function Iy(n) {
  const r = uE();
  return { ...at(r), queryKey: r.queryKey };
}
const dE = () => ["/api/predictions"],
  fE = () => "/api/predictions",
  hE = async (n, r) =>
    na(fE(), {
      ...r,
      method: "POST",
      headers: { "Content-Type": "application/json", ...r?.headers },
      body: JSON.stringify(n),
    }),
  mE = (n) => {
    const r = ["upsertPrediction"],
      { mutation: i, request: c } = {
        mutation: { mutationKey: r },
        request: void 0,
      };
    return {
      mutationFn: (f) => {
        const { data: h } = f ?? {};
        return hE(h, c);
      },
      ...i,
    };
  },
  pE = (n) => qn(mE()),
  xE = () => "/api/predictions/batch",
  gE = async (n, r) =>
    na(xE(), {
      ...r,
      method: "POST",
      headers: { "Content-Type": "application/json", ...r?.headers },
      body: JSON.stringify(n),
    }),
  yE = (n) => {
    const r = ["submitRoundPredictions"],
      { mutation: i, request: c } = {
        mutation: { mutationKey: r },
        request: void 0,
      };
    return {
      mutationFn: (f) => {
        const { data: h } = f ?? {};
        return gE(h, c);
      },
      ...i,
    };
  },
  vE = (n) => qn(yE()),
  bE = (n) => {
    const r = new URLSearchParams();
    Object.entries({}).forEach(([c, d]) => {
      d !== void 0 && r.append(c, d === null ? "null" : d.toString());
    });
    const i = r.toString();
    return i.length > 0 ? `/api/leaderboard?${i}` : "/api/leaderboard";
  },
  jE = async (n, r) => na(bE(), { ...r, method: "GET" }),
  NE = (n) => ["/api/leaderboard"],
  wE = (n, r) => {
    const { query: i, request: c } = {};
    return {
      queryKey: i?.queryKey ?? NE(),
      queryFn: ({ signal: h }) => jE(n, { signal: h, ...c }),
      ...i,
    };
  };
function SE(n, r) {
  const i = wE(n);
  return { ...at(i), queryKey: i.queryKey };
}
const EE = () => "/api/stats/dashboard",
  TE = async (n) => na(EE(), { ...n, method: "GET" }),
  Ud = () => ["/api/stats/dashboard"],
  AE = (n) => {
    const { query: r, request: i } = n ?? {};
    return {
      queryKey: r?.queryKey ?? Ud(),
      queryFn: ({ signal: f }) => TE({ signal: f, ...i }),
      ...r,
    };
  };
function RE(n) {
  const r = AE(n);
  return { ...at(r), queryKey: r.queryKey };
}
var CE = Symbol.for("react.lazy"),
  Qi = Vi[" use ".trim().toString()];
function OE(n) {
  return typeof n == "object" && n !== null && "then" in n;
}
function Wy(n) {
  return (
    n != null &&
    typeof n == "object" &&
    "$$typeof" in n &&
    n.$$typeof === CE &&
    "_payload" in n &&
    OE(n._payload)
  );
}
function ev(n) {
  const r = _E(n),
    i = j.forwardRef((c, d) => {
      let { children: f, ...h } = c;
      Wy(f) && typeof Qi == "function" && (f = Qi(f._payload));
      const x = j.Children.toArray(f),
        m = x.find(DE);
      if (m) {
        const p = m.props.children,
          v = x.map((y) =>
            y === m
              ? j.Children.count(p) > 1
                ? j.Children.only(null)
                : j.isValidElement(p)
                  ? p.props.children
                  : null
              : y,
          );
        return l.jsx(r, {
          ...h,
          ref: d,
          children: j.isValidElement(p) ? j.cloneElement(p, void 0, v) : null,
        });
      }
      return l.jsx(r, { ...h, ref: d, children: f });
    });
  return ((i.displayName = `${n}.Slot`), i);
}
var ME = ev("Slot");
function _E(n) {
  const r = j.forwardRef((i, c) => {
    let { children: d, ...f } = i;
    if (
      (Wy(d) && typeof Qi == "function" && (d = Qi(d._payload)),
      j.isValidElement(d))
    ) {
      const h = LE(d),
        x = zE(f, d.props);
      return (
        d.type !== j.Fragment && (x.ref = c ? pd(c, h) : h),
        j.cloneElement(d, x)
      );
    }
    return j.Children.count(d) > 1 ? j.Children.only(null) : null;
  });
  return ((r.displayName = `${n}.SlotClone`), r);
}
var kE = Symbol("radix.slottable");
function DE(n) {
  return (
    j.isValidElement(n) &&
    typeof n.type == "function" &&
    "__radixId" in n.type &&
    n.type.__radixId === kE
  );
}
function zE(n, r) {
  const i = { ...r };
  for (const c in r) {
    const d = n[c],
      f = r[c];
    /^on[A-Z]/.test(c)
      ? d && f
        ? (i[c] = (...x) => {
            const m = f(...x);
            return (d(...x), m);
          })
        : d && (i[c] = d)
      : c === "style"
        ? (i[c] = { ...d, ...f })
        : c === "className" && (i[c] = [d, f].filter(Boolean).join(" "));
  }
  return { ...n, ...i };
}
function LE(n) {
  let r = Object.getOwnPropertyDescriptor(n.props, "ref")?.get,
    i = r && "isReactWarning" in r && r.isReactWarning;
  return i
    ? n.ref
    : ((r = Object.getOwnPropertyDescriptor(n, "ref")?.get),
      (i = r && "isReactWarning" in r && r.isReactWarning),
      i ? n.props.ref : n.props.ref || n.ref);
}
const UE = $i(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover-elevate active-elevate-2",
    {
      variants: {
        variant: {
          default:
            "bg-primary text-primary-foreground border border-primary-border",
          destructive:
            "bg-destructive text-destructive-foreground shadow-sm border-destructive-border",
          outline:
            " border [border-color:var(--button-outline)] shadow-xs active:shadow-none ",
          secondary:
            "border bg-secondary text-secondary-foreground border border-secondary-border ",
          ghost: "border border-transparent",
          link: "text-primary underline-offset-4 hover:underline",
        },
        size: {
          default: "min-h-9 px-4 py-2",
          sm: "min-h-8 rounded-md px-3 text-xs",
          lg: "min-h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: { variant: "default", size: "default" },
    },
  ),
  xe = j.forwardRef(
    ({ className: n, variant: r, size: i, asChild: c = !1, ...d }, f) => {
      const h = c ? ME : "button";
      return l.jsx(h, {
        className: ze(UE({ variant: r, size: i, className: n })),
        ref: f,
        ...d,
      });
    },
  );
xe.displayName = "Button";
const qE = [
    { href: "/", label: "Home", icon: wd },
    { href: "/predictions", label: "Predictions", icon: Un },
    { href: "/matches", label: "Matches", icon: tl },
    { href: "/groups", label: "Groups", icon: il },
    { href: "/leaderboard", label: "Leaderboard", icon: ht },
    { href: "/arenas", label: "Arenas", icon: yn },
  ],
  HE = [
    { href: "/", label: "Home", icon: wd },
    { href: "/predictions", label: "Predict", icon: Un },
    { href: "/matches", label: "Matches", icon: tl },
    { href: "/leaderboard", label: "Leaders", icon: ht },
    { href: "/arenas", label: "Arenas", icon: yn },
    { href: "/my-results", label: "Results", icon: Nd },
  ],
  BE = [
    { href: "/", label: "Home", icon: wd },
    { href: "/predictions", label: "Predict", icon: Un },
    { href: "/matches", label: "Matches", icon: tl },
    { href: "/groups", label: "Groups", icon: il },
    { href: "/leaderboard", label: "Leaders", icon: ht },
    { href: "/arenas", label: "Arenas", icon: yn },
  ];
function ct({ children: n }) {
  const [r, i] = Ka(),
    { user: c, isAuthenticated: d, login: f, logout: h, isLoading: x } = Wt(),
    m = c?.displayName ?? c?.email?.split("@")[0] ?? "Player",
    p = m.charAt(0).toUpperCase(),
    v = (N) => (N === "/" ? r === "/" : r.startsWith(N)),
    y = d ? HE : BE;
  return l.jsxs("div", {
    className: "min-h-screen bg-background flex",
    children: [
      l.jsxs("aside", {
        className:
          "hidden md:flex w-64 lg:w-72 flex-col shrink-0 border-r border-border bg-sidebar fixed top-0 bottom-0 left-0 z-30",
        children: [
          l.jsx("div", {
            className: "px-6 py-5 border-b border-border",
            children: l.jsxs(Xe, {
              href: "/",
              className: "flex items-center gap-3 group",
              children: [
                l.jsx("img", {
                  src: "/ball.png",
                  alt: "Fútbol is Life",
                  className: "h-10 w-10 shrink-0 drop-shadow-lg",
                }),
                l.jsxs("div", {
                  children: [
                    l.jsx("p", {
                      className:
                        "font-black text-base tracking-tight leading-none text-foreground group-hover:text-primary transition-colors",
                      children: "Fútbol is Life",
                    }),
                    l.jsx("p", {
                      className:
                        "text-[10px] text-muted-foreground font-medium tracking-widest uppercase mt-0.5",
                      children: "WC 2026 Predictions",
                    }),
                  ],
                }),
              ],
            }),
          }),
          l.jsx("div", {
            className: "h-[3px] shrink-0",
            style: {
              background:
                "linear-gradient(to right, #e63946, #f4a261, #e9c46a, #52b788, #4895ef, #a855f7)",
            },
          }),
          l.jsxs("nav", {
            className: "flex-1 px-3 py-4 space-y-0.5 overflow-y-auto",
            children: [
              qE.map((N) => {
                const T = v(N.href);
                return l.jsxs(
                  Xe,
                  {
                    href: N.href,
                    className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${T ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`,
                    children: [
                      l.jsx(N.icon, { className: "h-4 w-4 shrink-0" }),
                      N.label,
                      T &&
                        l.jsx(Zu, {
                          className: "ml-auto h-3.5 w-3.5 opacity-70",
                        }),
                    ],
                  },
                  N.href,
                );
              }),
              !x &&
                d &&
                l.jsxs(Xe, {
                  href: "/my-results",
                  className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${v("/my-results") ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`,
                  children: [
                    l.jsx(Nd, { className: "h-4 w-4 shrink-0" }),
                    "My Results",
                    v("/my-results") &&
                      l.jsx(Zu, {
                        className: "ml-auto h-3.5 w-3.5 opacity-70",
                      }),
                  ],
                }),
              l.jsx("div", {
                className: "pt-2 mt-2 border-t border-border/60",
                children: l.jsxs("button", {
                  onClick: () => {
                    r === "/"
                      ? document
                          .getElementById("how-to-play")
                          ?.scrollIntoView({ behavior: "smooth" })
                      : (sessionStorage.setItem("scrollTarget", "how-to-play"),
                        i("/"));
                  },
                  className:
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground/70 hover:text-foreground hover:bg-accent transition-all text-left",
                  children: [
                    l.jsx(jN, { className: "h-4 w-4 shrink-0" }),
                    "How to Play",
                  ],
                }),
              }),
              !x &&
                c?.isAdmin &&
                l.jsx("div", {
                  className: "pt-2 mt-2 border-t border-border",
                  children: l.jsxs(Xe, {
                    href: "/admin",
                    className: `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${v("/admin") ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`,
                    children: [
                      l.jsx(yn, { className: "h-4 w-4 shrink-0" }),
                      "Admin Panel",
                    ],
                  }),
                }),
            ],
          }),
          l.jsxs("div", {
            className:
              "relative overflow-hidden mx-3 mb-2 rounded-xl h-28 shrink-0",
            children: [
              l.jsx("img", {
                src: "/trophy.png",
                alt: "",
                className:
                  "absolute inset-0 w-full h-full object-cover object-[center_15%] brightness-[0.4] saturate-150",
              }),
              l.jsx("div", {
                className: "absolute inset-0",
                style: {
                  background:
                    "linear-gradient(to top, var(--color-sidebar, #070910) 0%, transparent 65%)",
                },
              }),
              l.jsx("div", {
                className: "absolute inset-0",
                style: {
                  background:
                    "linear-gradient(to right, var(--color-sidebar, #070910) 0%, transparent 25%, transparent 75%, var(--color-sidebar, #070910) 100%)",
                },
              }),
              l.jsx("div", {
                className:
                  "absolute inset-0 hidden lg:flex flex-col items-end justify-end pb-2 pr-3 pointer-events-none",
                children: l.jsx("p", {
                  className:
                    "text-[8px] font-black uppercase tracking-[0.25em] text-white/35",
                  children: "USA · Canada · Mexico",
                }),
              }),
            ],
          }),
          l.jsx("div", {
            className: "p-4 border-t border-border",
            children:
              !x &&
              (d
                ? l.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      l.jsxs("div", {
                        className: "flex items-center gap-3 px-1",
                        children: [
                          l.jsx("div", {
                            className:
                              "h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-sm font-bold shrink-0 overflow-hidden",
                            children: c?.profileImageUrl
                              ? l.jsx("img", {
                                  src: c.profileImageUrl,
                                  alt: m,
                                  className: "h-full w-full object-cover",
                                })
                              : p,
                          }),
                          l.jsxs("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              l.jsx("p", {
                                className: "text-sm font-semibold truncate",
                                children: m,
                              }),
                              l.jsx("p", {
                                className:
                                  "text-xs text-muted-foreground truncate",
                                children: c?.email,
                              }),
                            ],
                          }),
                        ],
                      }),
                      l.jsxs(xe, {
                        variant: "outline",
                        size: "sm",
                        className:
                          "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
                        onClick: h,
                        children: [
                          l.jsx(DN, { className: "h-3.5 w-3.5" }),
                          "Sign out",
                        ],
                      }),
                    ],
                  })
                : l.jsxs("div", {
                    className: "space-y-2",
                    children: [
                      l.jsx("p", {
                        className:
                          "text-xs text-muted-foreground text-center px-2",
                        children: "Sign in to predict and earn points",
                      }),
                      l.jsxs(xe, {
                        className: "w-full gap-2",
                        size: "sm",
                        onClick: f,
                        children: [
                          l.jsx(Xg, { className: "h-3.5 w-3.5" }),
                          "Sign In",
                        ],
                      }),
                    ],
                  })),
          }),
        ],
      }),
      l.jsx("main", {
        className: "flex-1 min-w-0 md:ml-64 lg:ml-72 pb-20 md:pb-0",
        children: l.jsx("div", {
          className: "max-w-6xl mx-auto p-4 md:p-8",
          children: n,
        }),
      }),
      l.jsx("nav", {
        className:
          "md:hidden fixed bottom-0 left-0 right-0 z-40 bg-sidebar border-t border-border",
        children: l.jsx("div", {
          className: "flex items-stretch",
          children: y.map((N) => {
            const T = v(N.href);
            return l.jsxs(
              Xe,
              {
                href: N.href,
                className: `relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors min-w-0 ${T ? "text-primary" : "text-muted-foreground"}`,
                children: [
                  T &&
                    l.jsx("div", {
                      className:
                        "absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-primary rounded-full",
                    }),
                  l.jsx(N.icon, { className: "h-5 w-5 shrink-0" }),
                  l.jsx("span", {
                    className: "truncate w-full text-center",
                    children: N.label,
                  }),
                ],
              },
              N.href,
            );
          }),
        }),
      }),
    ],
  });
}
function Ut({ className: n, ...r }) {
  return l.jsx("div", {
    className: ze("animate-pulse rounded-md bg-primary/10", n),
    ...r,
  });
}
const GE = {
  AFG: "af",
  ALB: "al",
  ALG: "dz",
  AND: "ad",
  ANG: "ao",
  ARG: "ar",
  ARM: "am",
  AUS: "au",
  AUT: "at",
  AZE: "az",
  BHR: "bh",
  BAN: "bd",
  BLR: "by",
  BEL: "be",
  BLZ: "bz",
  BEN: "bj",
  BOL: "bo",
  BIH: "ba",
  BOT: "bw",
  BRA: "br",
  BUL: "bg",
  BFA: "bf",
  BDI: "bi",
  CPV: "cv",
  CAM: "kh",
  CMR: "cm",
  CAN: "ca",
  CTA: "cf",
  CHA: "td",
  CHI: "cl",
  CHN: "cn",
  COL: "co",
  COM: "km",
  COD: "cd",
  COG: "cg",
  CRC: "cr",
  CIV: "ci",
  CRO: "hr",
  CUB: "cu",
  CYP: "cy",
  CZE: "cz",
  DEN: "dk",
  DJI: "dj",
  DOM: "do",
  ECU: "ec",
  EGY: "eg",
  SLV: "sv",
  GEQ: "gq",
  ERI: "er",
  EST: "ee",
  SWZ: "sz",
  ETH: "et",
  FIJ: "fj",
  FIN: "fi",
  FRA: "fr",
  GAB: "ga",
  GAM: "gm",
  GEO: "ge",
  GER: "de",
  GHA: "gh",
  GRE: "gr",
  GRN: "gd",
  GUM: "gu",
  GTM: "gt",
  GUI: "gn",
  GNB: "gw",
  GUY: "gy",
  HAI: "ht",
  HON: "hn",
  HKG: "hk",
  HUN: "hu",
  ISL: "is",
  IND: "in",
  IDN: "id",
  IRN: "ir",
  IRQ: "iq",
  IRL: "ie",
  ISR: "il",
  ITA: "it",
  JAM: "jm",
  JPN: "jp",
  JOR: "jo",
  KAZ: "kz",
  KEN: "ke",
  PRK: "kp",
  KOR: "kr",
  KOS: "xk",
  KWT: "kw",
  KGZ: "kg",
  LAO: "la",
  LVA: "lv",
  LBN: "lb",
  LES: "ls",
  LBR: "lr",
  LBA: "ly",
  LIE: "li",
  LTU: "lt",
  LUX: "lu",
  MAC: "mo",
  MDG: "mg",
  MWI: "mw",
  MAS: "my",
  MDV: "mv",
  MLI: "ml",
  MLT: "mt",
  MTN: "mr",
  MRI: "mu",
  MEX: "mx",
  MDA: "md",
  MNG: "mn",
  MNE: "me",
  MAR: "ma",
  MOZ: "mz",
  MYA: "mm",
  NAM: "na",
  NEP: "np",
  NED: "nl",
  NET: "nl",
  NZL: "nz",
  NCA: "ni",
  NIG: "ne",
  NGA: "ng",
  MKD: "mk",
  NOR: "no",
  OMA: "om",
  PAK: "pk",
  PAN: "pa",
  PNG: "pg",
  PAR: "py",
  PER: "pe",
  PHI: "ph",
  POL: "pl",
  POR: "pt",
  PUR: "pr",
  QAT: "qa",
  ROU: "ro",
  RUS: "ru",
  RWA: "rw",
  SKN: "kn",
  LCA: "lc",
  VIN: "vc",
  SAM: "ws",
  SMR: "sm",
  STP: "st",
  SAU: "sa",
  SEN: "sn",
  SRB: "rs",
  SLE: "sl",
  SIN: "sg",
  SVK: "sk",
  SVN: "si",
  SOL: "sb",
  SOM: "so",
  RSA: "za",
  ESP: "es",
  SRI: "lk",
  SDN: "sd",
  SSD: "ss",
  SUR: "sr",
  SWE: "se",
  SUI: "ch",
  SYR: "sy",
  TPE: "tw",
  TJK: "tj",
  TAN: "tz",
  THA: "th",
  TLS: "tl",
  TOG: "tg",
  TGA: "to",
  TRI: "tt",
  TUN: "tn",
  TUR: "tr",
  TKM: "tm",
  UGA: "ug",
  UKR: "ua",
  UAE: "ae",
  USA: "us",
  URU: "uy",
  UZB: "uz",
  VAN: "vu",
  VEN: "ve",
  VIE: "vn",
  YEM: "ye",
  ZAM: "zm",
  ZIM: "zw",
  ENG: "gb-eng",
  SCO: "gb-sct",
  WAL: "gb-wls",
  NIR: "gb-nir",
};
function Gt(n, r = 40) {
  if (!n) return null;
  const i = GE[n.toUpperCase()];
  return i ? `https://flagcdn.com/w${r}/${i}.png` : null;
}
function tv(n) {
  const [r, i] = j.useState(null);
  return (
    j.useEffect(() => {
      if (!n) {
        i(null);
        return;
      }
      const c = () => {
        const f = new Date(n).getTime() - Date.now();
        if (f <= 0) {
          i("Closed");
          return;
        }
        const h = Math.floor(f / 864e5),
          x = Math.floor((f % 864e5) / 36e5),
          m = Math.floor((f % 36e5) / 6e4),
          p = Math.floor((f % 6e4) / 1e3);
        h > 0
          ? i(`${h}d ${x}h ${m}m`)
          : x > 0
            ? i(`${x}h ${m}m ${p}s`)
            : i(`${m}m ${p}s`);
      };
      c();
      const d = setInterval(c, 1e3);
      return () => clearInterval(d);
    }, [n]),
    r
  );
}
function Mi({ label: n, value: r, icon: i, highlight: c }) {
  return l.jsx(Ae, {
    className: `border ${c ? "border-primary/40 bg-primary/5" : "border-border"}`,
    children: l.jsxs(Oe, {
      className: "p-5",
      children: [
        l.jsxs("div", {
          className: "flex items-start justify-between gap-2 mb-3",
          children: [
            l.jsx("span", {
              className:
                "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
              children: n,
            }),
            l.jsx(i, {
              className: `h-4 w-4 shrink-0 ${c ? "text-primary" : "text-muted-foreground"}`,
            }),
          ],
        }),
        l.jsx("span", {
          className: `text-3xl font-black tracking-tight ${c ? "text-primary" : "text-foreground"}`,
          children: r ?? "—",
        }),
      ],
    }),
  });
}
function QE({ match: n }) {
  const r = n.userPrediction;
  if (!r) return null;
  const i = r.homeScore === n.homeScore && r.awayScore === n.awayScore,
    c = (n.homeScore ?? 0) > (n.awayScore ?? 0),
    d = (n.awayScore ?? 0) > (n.homeScore ?? 0),
    f = (r.homeScore ?? 0) > (r.awayScore ?? 0),
    h = (r.awayScore ?? 0) > (r.homeScore ?? 0),
    x = !i && ((c && f) || (d && h) || (!c && !d && !f && !h)),
    m = Gt(n.homeTeam?.code),
    p = Gt(n.awayTeam?.code);
  return l.jsxs("div", {
    className:
      "flex items-center gap-3 py-3 border-b border-border/40 last:border-0",
    children: [
      l.jsxs("div", {
        className: "flex-1 min-w-0",
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-1.5 text-sm flex-wrap",
            children: [
              m
                ? l.jsx("img", {
                    src: m,
                    alt: n.homeTeam?.code,
                    className: "h-4 w-6 object-cover rounded-sm",
                  })
                : l.jsx("span", { children: n.homeTeam?.flagEmoji }),
              l.jsx("span", {
                className: "font-bold",
                children: n.homeTeam?.code,
              }),
              l.jsxs("span", {
                className: "text-muted-foreground font-black",
                children: [n.homeScore, "–", n.awayScore],
              }),
              l.jsx("span", {
                className: "font-bold",
                children: n.awayTeam?.code,
              }),
              p
                ? l.jsx("img", {
                    src: p,
                    alt: n.awayTeam?.code,
                    className: "h-4 w-6 object-cover rounded-sm",
                  })
                : l.jsx("span", { children: n.awayTeam?.flagEmoji }),
            ],
          }),
          l.jsxs("p", {
            className: "text-xs text-muted-foreground mt-0.5",
            children: ["Your pick: ", r.homeScore, "–", r.awayScore],
          }),
        ],
      }),
      l.jsx("div", {
        className: "shrink-0",
        children: i
          ? l.jsxs("span", {
              className:
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold border border-yellow-500/20",
              children: [l.jsx(ll, { className: "h-3 w-3" }), " Exact"],
            })
          : x
            ? l.jsxs("span", {
                className:
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-bold border border-green-500/20",
                children: [l.jsx(Yg, { className: "h-3 w-3" }), " Correct"],
              })
            : l.jsxs("span", {
                className:
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20",
                children: [l.jsx(rl, { className: "h-3 w-3" }), " Miss"],
              }),
      }),
      r.points != null &&
        l.jsxs("span", {
          className: `shrink-0 text-sm font-black w-10 text-right ${r.points > 0 ? "text-primary" : "text-muted-foreground"}`,
          children: ["+", r.points],
        }),
    ],
  });
}
const PE = [
  { label: "Group Stage", outcome: 1, exact: 3 },
  { label: "Round of 32", outcome: 2, exact: 5 },
  { label: "Round of 16", outcome: 3, exact: 7 },
  { label: "Quarterfinals", outcome: 5, exact: 10 },
  { label: "Semifinals", outcome: 7, exact: 15 },
  { label: "Final", outcome: 10, exact: 20 },
];
function nv() {
  return l.jsxs("div", {
    className: "space-y-4",
    children: [
      l.jsxs("div", {
        className: "space-y-2.5 text-sm text-muted-foreground",
        children: [
          l.jsxs("div", {
            className: "flex gap-3",
            children: [
              l.jsx("span", {
                className: "text-primary font-black shrink-0",
                children: "1.",
              }),
              l.jsxs("span", {
                children: [
                  l.jsx("span", {
                    className: "text-foreground font-semibold",
                    children: "Predict game results",
                  }),
                  " ",
                  "before each round of games — predictions lock once the round starts.",
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className: "flex gap-3",
            children: [
              l.jsx("span", {
                className: "text-primary font-black shrink-0",
                children: "2.",
              }),
              l.jsxs("span", {
                children: [
                  l.jsx("span", {
                    className: "text-foreground font-semibold",
                    children: "Earn points",
                  }),
                  " ",
                  "for predicting the right outcome per game, and even more for predicting the correct score.",
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className: "flex gap-3",
            children: [
              l.jsx("span", {
                className: "text-primary font-black shrink-0",
                children: "3.",
              }),
              l.jsxs("span", {
                children: [
                  l.jsx("span", {
                    className: "text-foreground font-semibold",
                    children: "Climb the leaderboard",
                  }),
                  " ",
                  "and compete with friends in your invited ",
                  l.jsx("span", {
                    className: "text-foreground font-semibold",
                    children: "Arena",
                  }),
                  ".",
                ],
              }),
            ],
          }),
          l.jsxs("div", {
            className: "flex gap-3",
            children: [
              l.jsx("span", {
                className: "text-primary font-black shrink-0",
                children: "4.",
              }),
              l.jsxs("span", {
                children: [
                  "Points scale up in knockout rounds — the ",
                  l.jsx("span", {
                    className: "text-foreground font-semibold",
                    children: "Final is worth the most!",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      l.jsxs("div", {
        className: "rounded-xl border border-border/60 overflow-hidden",
        children: [
          l.jsxs("div", {
            className:
              "bg-muted/40 px-4 py-2 border-b border-border/40 flex items-center text-xs",
            children: [
              l.jsx("span", {
                className: "flex-1 font-black uppercase tracking-widest",
                children: "Points per round",
              }),
              l.jsx("span", {
                className: "w-[4.5rem] text-right text-muted-foreground",
                children: "Outcome",
              }),
              l.jsx("span", {
                className: "w-[5rem] text-right text-primary",
                children: "Exact score",
              }),
            ],
          }),
          l.jsx("div", {
            className: "divide-y divide-border/40",
            children: PE.map((n) =>
              l.jsxs(
                "div",
                {
                  className: "flex items-center px-4 py-2.5 text-sm",
                  children: [
                    l.jsx("span", {
                      className: "flex-1 text-muted-foreground",
                      children: n.label,
                    }),
                    l.jsxs("span", {
                      className:
                        "w-[4.5rem] text-right font-bold text-foreground",
                      children: ["+", n.outcome],
                    }),
                    l.jsxs("span", {
                      className: "w-[5rem] text-right font-black text-primary",
                      children: ["+", n.exact],
                    }),
                  ],
                },
                n.label,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
function YE() {
  const [n, r] = j.useState(!0);
  return l.jsxs(Ae, {
    id: "how-to-play",
    className: "border-border/60",
    children: [
      l.jsxs("button", {
        onClick: () => r((i) => !i),
        className:
          "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-accent/40 transition-colors rounded-xl",
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-2.5",
            children: [
              l.jsx(oN, { className: "h-4 w-4 text-primary shrink-0" }),
              l.jsx("span", {
                className: "text-sm font-bold",
                children: "How to Play",
              }),
            ],
          }),
          n
            ? l.jsx(xN, { className: "h-4 w-4 text-muted-foreground" })
            : l.jsx(fN, { className: "h-4 w-4 text-muted-foreground" }),
        ],
      }),
      n &&
        l.jsx(Oe, {
          className: "px-5 pb-5 pt-0 border-t border-border/40",
          children: l.jsx("div", {
            className: "pt-4",
            children: l.jsx(nv, {}),
          }),
        }),
    ],
  });
}
function VE({ login: n }) {
  const r = tv("2026-06-11T23:00:00Z");
  return l.jsxs("div", {
    className: "min-h-screen bg-[#070910] flex flex-col lg:flex-row",
    children: [
      l.jsxs("div", {
        className:
          "relative h-64 sm:h-80 lg:sticky lg:top-0 lg:h-screen lg:flex-1 overflow-hidden shrink-0",
        children: [
          l.jsx("img", {
            src: "/trophy.png",
            alt: "",
            className:
              "absolute inset-0 w-full h-full object-cover object-[center_20%] brightness-[0.55] saturate-[1.3]",
          }),
          l.jsx("div", {
            className:
              "absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#070910] lg:hidden",
          }),
          l.jsx("div", {
            className: "absolute inset-0 hidden lg:block",
            style: {
              background:
                "linear-gradient(to right, transparent 30%, #070910 100%)",
            },
          }),
          l.jsx("div", {
            className: "absolute inset-0 hidden lg:block",
            style: {
              background:
                "linear-gradient(to top, #070910 0%, transparent 35%)",
            },
          }),
          l.jsxs("div", {
            className:
              "absolute inset-0 hidden lg:flex flex-col items-center justify-center pointer-events-none select-none",
            children: [
              l.jsx("p", {
                className:
                  "text-white/40 text-xs font-bold tracking-[0.5em] uppercase mb-3",
                children: "FIFA",
              }),
              l.jsx("p", {
                className:
                  "text-white/90 text-5xl font-black tracking-tight drop-shadow-2xl",
                children: "World Cup",
              }),
              l.jsx("p", {
                className:
                  "text-primary text-[7rem] font-black leading-none drop-shadow-2xl",
                children: "2026",
              }),
              l.jsxs("div", {
                className: "flex items-center gap-3 mt-4",
                children: [
                  l.jsx("span", {
                    className:
                      "text-white/60 text-sm font-black tracking-widest uppercase",
                    children: "USA",
                  }),
                  l.jsx("span", {
                    className: "text-white/25 text-lg",
                    children: "·",
                  }),
                  l.jsx("span", {
                    className:
                      "text-white/60 text-sm font-black tracking-widest uppercase",
                    children: "Canada",
                  }),
                  l.jsx("span", {
                    className: "text-white/25 text-lg",
                    children: "·",
                  }),
                  l.jsx("span", {
                    className:
                      "text-white/60 text-sm font-black tracking-widest uppercase",
                    children: "Mexico",
                  }),
                ],
              }),
            ],
          }),
          r &&
            l.jsxs("div", {
              className:
                "absolute bottom-4 right-4 lg:bottom-10 lg:right-10 bg-black/55 backdrop-blur-sm border border-primary/35 rounded-xl px-4 py-2.5 text-center",
              children: [
                l.jsx("p", {
                  className:
                    "text-[9px] text-primary font-bold uppercase tracking-widest",
                  children: "Kickoff",
                }),
                l.jsx("p", {
                  className:
                    "text-white font-black text-sm tabular-nums mt-0.5",
                  children: r,
                }),
              ],
            }),
        ],
      }),
      l.jsx("div", {
        className:
          "relative z-10 flex flex-col items-center p-6 pb-16 lg:py-16 lg:px-12 lg:w-[460px] xl:w-[500px] shrink-0",
        children: l.jsxs("div", {
          className: "w-full max-w-sm space-y-7",
          children: [
            l.jsxs("div", {
              className: "text-center space-y-4",
              children: [
                l.jsx("img", {
                  src: "/ball.png",
                  alt: "Fútbol is Life",
                  className: "h-20 w-20 mx-auto drop-shadow-2xl",
                }),
                l.jsxs("div", {
                  children: [
                    l.jsxs("h1", {
                      className:
                        "text-5xl font-black tracking-tight leading-none",
                      children: [
                        "Fútbol",
                        l.jsx("br", {}),
                        l.jsx("span", {
                          className: "text-primary",
                          children: "is Life",
                        }),
                      ],
                    }),
                    l.jsxs("p", {
                      className:
                        "text-sm text-muted-foreground mt-3 leading-relaxed",
                      children: [
                        "The ultimate World Cup 2026 prediction game.",
                        l.jsx("br", {}),
                        "Guess scores. Earn points. Climb the ranks.",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            l.jsxs("div", {
              className: "grid grid-cols-3 gap-2.5 text-center",
              children: [
                l.jsxs("div", {
                  className: "bg-card border border-border rounded-xl p-3",
                  children: [
                    l.jsx("p", {
                      className: "text-2xl font-black text-primary",
                      children: "48",
                    }),
                    l.jsx("p", {
                      className: "text-xs text-muted-foreground mt-0.5",
                      children: "Teams",
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "bg-card border border-border rounded-xl p-3",
                  children: [
                    l.jsx("p", {
                      className: "text-2xl font-black text-secondary",
                      children: "104",
                    }),
                    l.jsx("p", {
                      className: "text-xs text-muted-foreground mt-0.5",
                      children: "Matches",
                    }),
                  ],
                }),
                l.jsxs("div", {
                  className: "bg-card border border-border rounded-xl p-3",
                  children: [
                    l.jsx("p", {
                      className: "text-2xl font-black",
                      children: "∞",
                    }),
                    l.jsx("p", {
                      className: "text-xs text-muted-foreground mt-0.5",
                      children: "Glory",
                    }),
                  ],
                }),
              ],
            }),
            r &&
              l.jsxs("div", {
                className:
                  "lg:hidden flex items-center justify-center gap-3 bg-primary/10 border border-primary/25 rounded-xl px-4 py-3",
                children: [
                  l.jsx("span", {
                    className:
                      "text-xs text-primary font-bold uppercase tracking-widest",
                    children: "Kickoff in",
                  }),
                  l.jsx("span", {
                    className: "font-black text-foreground tabular-nums",
                    children: r,
                  }),
                ],
              }),
            l.jsxs(xe, {
              size: "lg",
              className:
                "w-full text-base h-14 font-bold shadow-lg shadow-primary/20",
              onClick: n,
              children: [
                l.jsx(lw, { className: "h-4 w-4 mr-2" }),
                "Sign in to Play",
              ],
            }),
            l.jsxs("div", {
              className: "border-t border-border/40 pt-6 space-y-4",
              children: [
                l.jsx("h2", {
                  className:
                    "text-sm font-black uppercase tracking-widest text-center text-muted-foreground",
                  children: "How to Play",
                }),
                l.jsx(nv, {}),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function KE() {
  const { isAuthenticated: n, isLoading: r, user: i, login: c } = Wt(),
    { data: d, isLoading: f } = RE({
      query: { queryKey: ["getDashboardStats", n], enabled: n },
    }),
    { data: h, isLoading: x } = no(),
    { data: m } = Iy(),
    p = j.useMemo(() => {
      if (!m) return null;
      const A = m.filter((U) => !U.isLocked && U.locksAt);
      return A.length
        ? A.sort(
            (U, z) =>
              new Date(U.locksAt).getTime() - new Date(z.locksAt).getTime(),
          )[0]
        : null;
    }, [m]),
    v = tv(p?.locksAt),
    { data: y } = at({
      queryKey: ["arenas"],
      queryFn: async () =>
        (await fetch("/api/arenas", { credentials: "include" })).json(),
      enabled: n,
    }),
    N = j.useMemo(() => y?.filter((A) => A.isMember) ?? [], [y]),
    T = sj({
      queries: N.slice(0, 4).map((A) => ({
        queryKey: ["arenas", A.id, "leaderboard"],
        queryFn: async () =>
          (
            await fetch(`/api/arenas/${A.id}/leaderboard`, {
              credentials: "include",
            })
          ).json(),
        enabled: n && !!i?.id,
      })),
    }),
    R = j.useMemo(
      () =>
        N.slice(0, 4).map((A, U) => {
          const z = T[U]?.data?.find((H) => H.userId === i?.id);
          return {
            arena: A,
            rank: z?.rank ?? null,
            totalPoints: z?.totalPoints ?? null,
            isLoading: T[U]?.isLoading,
          };
        }),
      [N, T, i?.id],
    );
  if (
    (j.useEffect(() => {
      const A = sessionStorage.getItem("scrollTarget");
      if (!A) return;
      sessionStorage.removeItem("scrollTarget");
      const U = (z = 0) => {
        const H = document.getElementById(A);
        H
          ? H.scrollIntoView({ behavior: "smooth" })
          : z < 20 && setTimeout(() => U(z + 1), 100);
      };
      setTimeout(() => U(), 80);
    }, []),
    r)
  )
    return null;
  if (!n) return l.jsx(VE, { login: c });
  const S =
      h
        ?.filter((A) => A.status === "completed" && A.userPrediction)
        .slice(0, 5) ?? [],
    C = h?.filter((A) => A.status === "scheduled").slice(0, 3) ?? [];
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsxs("header", {
          className: "flex items-start justify-between gap-4",
          children: [
            l.jsxs("div", {
              children: [
                l.jsxs("h1", {
                  className: "text-2xl font-black tracking-tight",
                  children: [
                    "Welcome back, ",
                    l.jsx("span", {
                      className: "text-primary",
                      children: i?.displayName ?? i?.email?.split("@")[0],
                    }),
                  ],
                }),
                l.jsx("p", {
                  className: "text-muted-foreground text-sm mt-1",
                  children: "World Cup 2026 — here's how you're doing.",
                }),
              ],
            }),
            l.jsx(Xe, {
              href: "/predictions",
              children: l.jsxs(xe, {
                size: "sm",
                className: "gap-2 shrink-0",
                children: [
                  l.jsx(Un, { className: "h-4 w-4" }),
                  l.jsx("span", {
                    className: "hidden sm:inline",
                    children: "Predictions",
                  }),
                ],
              }),
            }),
          ],
        }),
        v &&
          p &&
          l.jsxs("div", {
            className:
              "flex items-center gap-3 px-5 py-4 rounded-xl border border-primary/30 bg-primary/5",
            children: [
              l.jsx($N, { className: "h-5 w-5 text-primary shrink-0" }),
              l.jsxs("div", {
                className: "flex-1 min-w-0",
                children: [
                  l.jsxs("p", {
                    className: "text-sm font-bold",
                    children: [
                      p.label,
                      " predictions close in",
                      " ",
                      l.jsx("span", {
                        className: "text-primary tabular-nums",
                        children: v,
                      }),
                    ],
                  }),
                  l.jsxs("p", {
                    className: "text-xs text-muted-foreground mt-0.5",
                    children: [
                      p.predictedCount ?? 0,
                      "/",
                      p.matchCount ?? 0,
                      " predicted",
                    ],
                  }),
                ],
              }),
              l.jsx(Xe, {
                href: "/predictions",
                children: l.jsxs(xe, {
                  size: "sm",
                  variant: "outline",
                  className: "shrink-0 gap-1.5 text-xs",
                  children: [
                    l.jsx(Un, { className: "h-3.5 w-3.5" }),
                    "Predict",
                  ],
                }),
              }),
            ],
          }),
        f
          ? l.jsx("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-3",
              children: [1, 2, 3, 4].map((A) =>
                l.jsx(Ut, { className: "h-28 rounded-xl" }, A),
              ),
            })
          : d
            ? l.jsxs("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-3",
                children: [
                  l.jsx(Mi, {
                    label: "Global Rank",
                    value: d.userRank ? `#${d.userRank}` : "—",
                    icon: ht,
                  }),
                  l.jsx(Mi, {
                    label: "Total Points",
                    value: d.totalPoints,
                    icon: ll,
                    highlight: !0,
                  }),
                  l.jsx(Mi, {
                    label: "Exact Scores",
                    value: d.exactScores,
                    icon: Un,
                  }),
                  l.jsx(Mi, {
                    label: "Predictions",
                    value: d.predictionsCount,
                    icon: Yg,
                  }),
                ],
              })
            : null,
        R.length > 0 &&
          l.jsxs("div", {
            children: [
              l.jsxs("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  l.jsxs("h2", {
                    className: "text-lg font-bold flex items-center gap-2",
                    children: [
                      l.jsx(yn, { className: "h-4 w-4 text-primary" }),
                      "Your Arenas",
                    ],
                  }),
                  l.jsxs(Xe, {
                    href: "/arenas",
                    className:
                      "text-xs text-primary hover:underline flex items-center gap-1",
                    children: [
                      "All arenas ",
                      l.jsx(Au, { className: "h-3 w-3" }),
                    ],
                  }),
                ],
              }),
              l.jsx("div", {
                className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3",
                children: R.map(
                  ({ arena: A, rank: U, totalPoints: z, isLoading: H }) =>
                    l.jsx(
                      Xe,
                      {
                        href: `/arenas/${A.id}`,
                        className: "block",
                        children: l.jsx(Ae, {
                          className:
                            "border-border hover:border-primary/40 transition-colors h-full",
                          children: l.jsxs(Oe, {
                            className: "p-4",
                            children: [
                              l.jsx("p", {
                                className:
                                  "text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2 truncate",
                                children: A.name,
                              }),
                              H
                                ? l.jsx(Ut, { className: "h-8 w-16" })
                                : U != null
                                  ? l.jsxs("div", {
                                      className: "flex items-end gap-1",
                                      children: [
                                        l.jsxs("span", {
                                          className:
                                            "text-3xl font-black text-primary",
                                          children: ["#", U],
                                        }),
                                        l.jsxs("span", {
                                          className:
                                            "text-xs text-muted-foreground mb-1",
                                          children: ["of ", A.memberCount],
                                        }),
                                      ],
                                    })
                                  : l.jsx("span", {
                                      className:
                                        "text-2xl font-black text-muted-foreground",
                                      children: "—",
                                    }),
                              z != null &&
                                l.jsxs("p", {
                                  className:
                                    "text-xs text-muted-foreground mt-1",
                                  children: [z, " pts"],
                                }),
                            ],
                          }),
                        }),
                      },
                      A.id,
                    ),
                ),
              }),
            ],
          }),
        l.jsxs("div", {
          className: "grid lg:grid-cols-3 gap-6",
          children: [
            l.jsxs("div", {
              className: "lg:col-span-2 space-y-6",
              children: [
                !x &&
                  S.length > 0 &&
                  l.jsxs(Ae, {
                    children: [
                      l.jsxs(ws, {
                        className:
                          "pb-3 border-b border-border flex-row items-center justify-between space-y-0",
                        children: [
                          l.jsx(Ss, {
                            className: "text-base font-bold",
                            children: "Recent Results",
                          }),
                          l.jsxs(Xe, {
                            href: "/my-results",
                            className:
                              "text-xs text-primary hover:underline flex items-center gap-1",
                            children: [
                              "All results ",
                              l.jsx(Au, { className: "h-3 w-3" }),
                            ],
                          }),
                        ],
                      }),
                      l.jsx(Oe, {
                        className: "p-4",
                        children: S.map((A) => l.jsx(QE, { match: A }, A.id)),
                      }),
                    ],
                  }),
                !x &&
                  S.length === 0 &&
                  l.jsx(Ae, {
                    className: "border-dashed border-border/60",
                    children: l.jsxs(Oe, {
                      className: "p-6 text-center",
                      children: [
                        l.jsx(Un, {
                          className:
                            "h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-40",
                        }),
                        l.jsx("p", {
                          className:
                            "text-sm font-medium text-muted-foreground",
                          children: "No results yet",
                        }),
                        l.jsx("p", {
                          className: "text-xs text-muted-foreground mt-1",
                          children:
                            "Results will appear here as matches are played.",
                        }),
                        l.jsx(xe, {
                          size: "sm",
                          className: "mt-4",
                          asChild: !0,
                          children: l.jsx(Xe, {
                            href: "/my-results",
                            children: "My Results",
                          }),
                        }),
                      ],
                    }),
                  }),
                !x &&
                  C.length > 0 &&
                  l.jsxs("div", {
                    children: [
                      l.jsxs("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                          l.jsx("h2", {
                            className: "text-lg font-bold",
                            children: "Upcoming",
                          }),
                          l.jsxs(Xe, {
                            href: "/predictions",
                            className:
                              "text-xs text-primary hover:underline flex items-center gap-1",
                            children: [
                              "Predict all ",
                              l.jsx(Au, { className: "h-3 w-3" }),
                            ],
                          }),
                        ],
                      }),
                      l.jsx("div", {
                        className: "space-y-2",
                        children: C.map((A) => {
                          const U = Gt(A.homeTeam?.code),
                            z = Gt(A.awayTeam?.code);
                          return l.jsx(
                            Ae,
                            {
                              children: l.jsx(Oe, {
                                className: "p-4",
                                children: l.jsxs("div", {
                                  className: "flex items-center gap-3",
                                  children: [
                                    l.jsxs("div", {
                                      className:
                                        "flex-1 flex items-center gap-3",
                                      children: [
                                        l.jsxs("div", {
                                          className:
                                            "flex items-center gap-1.5",
                                          children: [
                                            U
                                              ? l.jsx("img", {
                                                  src: U,
                                                  alt: A.homeTeam?.code,
                                                  className:
                                                    "h-5 w-7 object-cover rounded-sm",
                                                })
                                              : l.jsx("span", {
                                                  className: "text-lg",
                                                  children:
                                                    A.homeTeam?.flagEmoji,
                                                }),
                                            l.jsx("span", {
                                              className: "font-bold text-sm",
                                              children: A.homeTeam?.code,
                                            }),
                                          ],
                                        }),
                                        l.jsx("span", {
                                          className:
                                            "text-muted-foreground text-xs font-bold bg-muted px-2 py-0.5 rounded",
                                          children: "VS",
                                        }),
                                        l.jsxs("div", {
                                          className:
                                            "flex items-center gap-1.5",
                                          children: [
                                            l.jsx("span", {
                                              className: "font-bold text-sm",
                                              children: A.awayTeam?.code,
                                            }),
                                            z
                                              ? l.jsx("img", {
                                                  src: z,
                                                  alt: A.awayTeam?.code,
                                                  className:
                                                    "h-5 w-7 object-cover rounded-sm",
                                                })
                                              : l.jsx("span", {
                                                  className: "text-lg",
                                                  children:
                                                    A.awayTeam?.flagEmoji,
                                                }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    l.jsxs("div", {
                                      className: "text-right shrink-0",
                                      children: [
                                        l.jsxs("div", {
                                          className:
                                            "flex items-center gap-1 text-xs text-muted-foreground",
                                          children: [
                                            l.jsx(Vg, { className: "h-3 w-3" }),
                                            new Date(
                                              A.scheduledAt,
                                            ).toLocaleDateString(void 0, {
                                              month: "short",
                                              day: "numeric",
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            }),
                                          ],
                                        }),
                                        A.userPrediction
                                          ? l.jsxs("span", {
                                              className:
                                                "text-xs text-green-400 font-medium",
                                              children: [
                                                "Predicted ",
                                                A.userPrediction.homeScore,
                                                "–",
                                                A.userPrediction.awayScore,
                                              ],
                                            })
                                          : l.jsx("span", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children: "Not predicted",
                                            }),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            },
                            A.id,
                          );
                        }),
                      }),
                    ],
                  }),
                x &&
                  l.jsx("div", {
                    className: "space-y-2",
                    children: [1, 2, 3].map((A) =>
                      l.jsx(Ut, { className: "h-16 rounded-xl" }, A),
                    ),
                  }),
              ],
            }),
            l.jsx("div", {
              children: l.jsxs(Ae, {
                className: "border-primary/20 bg-primary/5",
                children: [
                  l.jsx(ws, {
                    className: "pb-3 border-b border-primary/10",
                    children: l.jsxs(Ss, {
                      className: "text-base font-bold flex items-center gap-2",
                      children: [
                        l.jsx(ht, { className: "h-4 w-4 text-primary" }),
                        " Top Predictors",
                      ],
                    }),
                  }),
                  l.jsxs(Oe, {
                    className: "p-0",
                    children: [
                      f
                        ? l.jsx("div", {
                            className: "p-4 space-y-3",
                            children: [1, 2, 3, 4, 5].map((A) =>
                              l.jsx(Ut, { className: "h-10 w-full" }, A),
                            ),
                          })
                        : d?.topLeaderboard && d.topLeaderboard.length > 0
                          ? l.jsx("div", {
                              className: "divide-y divide-primary/10",
                              children: d.topLeaderboard.map((A) => {
                                const U = A.userId === i?.id,
                                  z =
                                    A.rank === 1
                                      ? "🥇"
                                      : A.rank === 2
                                        ? "🥈"
                                        : A.rank === 3
                                          ? "🥉"
                                          : null;
                                return l.jsxs(
                                  "div",
                                  {
                                    className: `flex items-center gap-3 px-4 py-3 ${U ? "bg-primary/10" : ""}`,
                                    children: [
                                      l.jsx("span", {
                                        className:
                                          "w-7 text-center shrink-0 font-bold",
                                        children:
                                          z ??
                                          l.jsxs("span", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children: ["#", A.rank],
                                          }),
                                      }),
                                      l.jsx("div", {
                                        className:
                                          "h-7 w-7 rounded-full bg-background border border-border flex items-center justify-center text-xs overflow-hidden shrink-0",
                                        children: A.profileImage
                                          ? l.jsx("img", {
                                              src: A.profileImage,
                                              alt: A.username,
                                              className:
                                                "w-full h-full object-cover",
                                            })
                                          : A.username.charAt(0).toUpperCase(),
                                      }),
                                      l.jsx("span", {
                                        className: `flex-1 truncate text-sm ${U ? "font-bold text-primary" : "font-medium"}`,
                                        children: A.username,
                                      }),
                                      l.jsx("span", {
                                        className:
                                          "font-black text-primary shrink-0",
                                        children: A.totalPoints,
                                      }),
                                    ],
                                  },
                                  A.userId,
                                );
                              }),
                            })
                          : l.jsxs("div", {
                              className:
                                "p-8 text-center text-sm text-muted-foreground",
                              children: [
                                l.jsx(ht, {
                                  className: "h-8 w-8 mx-auto mb-2 opacity-30",
                                }),
                                "Leaderboard empty",
                              ],
                            }),
                      l.jsx("div", {
                        className: "p-4 border-t border-primary/10",
                        children: l.jsx(xe, {
                          variant: "outline",
                          size: "sm",
                          className: "w-full",
                          asChild: !0,
                          children: l.jsx(Xe, {
                            href: "/leaderboard",
                            children: "Full Leaderboard",
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
        l.jsx(YE, {}),
      ],
    }),
  });
}
const St = j.forwardRef(({ className: n, type: r, ...i }, c) =>
  l.jsx("input", {
    type: r,
    className: ze(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      n,
    ),
    ref: c,
    ...i,
  }),
);
St.displayName = "Input";
const XE = $i(
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover-elevate ",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",
        outline: "text-foreground border [border-color:var(--badge-outline)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function an({ className: n, variant: r, ...i }) {
  return l.jsx("div", { className: ze(XE({ variant: r }), n), ...i });
}
var FE = j.createContext(void 0);
function sv(n) {
  const r = j.useContext(FE);
  return n || r || "ltr";
}
var Du = "rovingFocusGroup.onEntryFocus",
  ZE = { bubbles: !1, cancelable: !0 },
  ul = "RovingFocusGroup",
  [sd, av, $E] = pg(ul),
  [JE, rv] = Xa(ul, [$E]),
  [IE, WE] = JE(ul),
  lv = j.forwardRef((n, r) =>
    l.jsx(sd.Provider, {
      scope: n.__scopeRovingFocusGroup,
      children: l.jsx(sd.Slot, {
        scope: n.__scopeRovingFocusGroup,
        children: l.jsx(eT, { ...n, ref: r }),
      }),
    }),
  );
lv.displayName = ul;
var eT = j.forwardRef((n, r) => {
    const {
        __scopeRovingFocusGroup: i,
        orientation: c,
        loop: d = !1,
        dir: f,
        currentTabStopId: h,
        defaultCurrentTabStopId: x,
        onCurrentTabStopIdChange: m,
        onEntryFocus: p,
        preventScrollOnEntryFocus: v = !1,
        ...y
      } = n,
      N = j.useRef(null),
      T = It(r, N),
      R = sv(f),
      [S, C] = yd({ prop: h, defaultProp: x ?? null, onChange: m, caller: ul }),
      [A, U] = j.useState(!1),
      z = Hn(p),
      H = av(i),
      V = j.useRef(!1),
      [F, Z] = j.useState(0);
    return (
      j.useEffect(() => {
        const G = N.current;
        if (G)
          return (
            G.addEventListener(Du, z),
            () => G.removeEventListener(Du, z)
          );
      }, [z]),
      l.jsx(IE, {
        scope: i,
        orientation: c,
        dir: R,
        loop: d,
        currentTabStopId: S,
        onItemFocus: j.useCallback((G) => C(G), [C]),
        onItemShiftTab: j.useCallback(() => U(!0), []),
        onFocusableItemAdd: j.useCallback(() => Z((G) => G + 1), []),
        onFocusableItemRemove: j.useCallback(() => Z((G) => G - 1), []),
        children: l.jsx(We.div, {
          tabIndex: A || F === 0 ? -1 : 0,
          "data-orientation": c,
          ...y,
          ref: T,
          style: { outline: "none", ...n.style },
          onMouseDown: He(n.onMouseDown, () => {
            V.current = !0;
          }),
          onFocus: He(n.onFocus, (G) => {
            const re = !V.current;
            if (G.target === G.currentTarget && re && !A) {
              const he = new CustomEvent(Du, ZE);
              if ((G.currentTarget.dispatchEvent(he), !he.defaultPrevented)) {
                const me = H().filter((_) => _.focusable),
                  ue = me.find((_) => _.active),
                  ye = me.find((_) => _.id === S),
                  de = [ue, ye, ...me]
                    .filter(Boolean)
                    .map((_) => _.ref.current);
                cv(de, v);
              }
            }
            V.current = !1;
          }),
          onBlur: He(n.onBlur, () => U(!1)),
        }),
      })
    );
  }),
  iv = "RovingFocusGroupItem",
  ov = j.forwardRef((n, r) => {
    const {
        __scopeRovingFocusGroup: i,
        focusable: c = !0,
        active: d = !1,
        tabStopId: f,
        children: h,
        ...x
      } = n,
      m = hy(),
      p = f || m,
      v = WE(iv, i),
      y = v.currentTabStopId === p,
      N = av(i),
      {
        onFocusableItemAdd: T,
        onFocusableItemRemove: R,
        currentTabStopId: S,
      } = v;
    return (
      j.useEffect(() => {
        if (c) return (T(), () => R());
      }, [c, T, R]),
      l.jsx(sd.ItemSlot, {
        scope: i,
        id: p,
        focusable: c,
        active: d,
        children: l.jsx(We.span, {
          tabIndex: y ? 0 : -1,
          "data-orientation": v.orientation,
          ...x,
          ref: r,
          onMouseDown: He(n.onMouseDown, (C) => {
            c ? v.onItemFocus(p) : C.preventDefault();
          }),
          onFocus: He(n.onFocus, () => v.onItemFocus(p)),
          onKeyDown: He(n.onKeyDown, (C) => {
            if (C.key === "Tab" && C.shiftKey) {
              v.onItemShiftTab();
              return;
            }
            if (C.target !== C.currentTarget) return;
            const A = sT(C, v.orientation, v.dir);
            if (A !== void 0) {
              if (C.metaKey || C.ctrlKey || C.altKey || C.shiftKey) return;
              C.preventDefault();
              let z = N()
                .filter((H) => H.focusable)
                .map((H) => H.ref.current);
              if (A === "last") z.reverse();
              else if (A === "prev" || A === "next") {
                A === "prev" && z.reverse();
                const H = z.indexOf(C.currentTarget);
                z = v.loop ? aT(z, H + 1) : z.slice(H + 1);
              }
              setTimeout(() => cv(z));
            }
          }),
          children:
            typeof h == "function"
              ? h({ isCurrentTabStop: y, hasTabStop: S != null })
              : h,
        }),
      })
    );
  });
ov.displayName = iv;
var tT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function nT(n, r) {
  return r !== "rtl"
    ? n
    : n === "ArrowLeft"
      ? "ArrowRight"
      : n === "ArrowRight"
        ? "ArrowLeft"
        : n;
}
function sT(n, r, i) {
  const c = nT(n.key, i);
  if (
    !(r === "vertical" && ["ArrowLeft", "ArrowRight"].includes(c)) &&
    !(r === "horizontal" && ["ArrowUp", "ArrowDown"].includes(c))
  )
    return tT[c];
}
function cv(n, r = !1) {
  const i = document.activeElement;
  for (const c of n)
    if (
      c === i ||
      (c.focus({ preventScroll: r }), document.activeElement !== i)
    )
      return;
}
function aT(n, r) {
  return n.map((i, c) => n[(r + c) % n.length]);
}
var rT = lv,
  lT = ov,
  so = "Tabs",
  [iT] = Xa(so, [rv]),
  uv = rv(),
  [oT, qd] = iT(so),
  dv = j.forwardRef((n, r) => {
    const {
        __scopeTabs: i,
        value: c,
        onValueChange: d,
        defaultValue: f,
        orientation: h = "horizontal",
        dir: x,
        activationMode: m = "automatic",
        ...p
      } = n,
      v = sv(x),
      [y, N] = yd({ prop: c, onChange: d, defaultProp: f ?? "", caller: so });
    return l.jsx(oT, {
      scope: i,
      baseId: hy(),
      value: y,
      onValueChange: N,
      orientation: h,
      dir: v,
      activationMode: m,
      children: l.jsx(We.div, { dir: v, "data-orientation": h, ...p, ref: r }),
    });
  });
dv.displayName = so;
var fv = "TabsList",
  hv = j.forwardRef((n, r) => {
    const { __scopeTabs: i, loop: c = !0, ...d } = n,
      f = qd(fv, i),
      h = uv(i);
    return l.jsx(rT, {
      asChild: !0,
      ...h,
      orientation: f.orientation,
      dir: f.dir,
      loop: c,
      children: l.jsx(We.div, {
        role: "tablist",
        "aria-orientation": f.orientation,
        ...d,
        ref: r,
      }),
    });
  });
hv.displayName = fv;
var mv = "TabsTrigger",
  pv = j.forwardRef((n, r) => {
    const { __scopeTabs: i, value: c, disabled: d = !1, ...f } = n,
      h = qd(mv, i),
      x = uv(i),
      m = yv(h.baseId, c),
      p = vv(h.baseId, c),
      v = c === h.value;
    return l.jsx(lT, {
      asChild: !0,
      ...x,
      focusable: !d,
      active: v,
      children: l.jsx(We.button, {
        type: "button",
        role: "tab",
        "aria-selected": v,
        "aria-controls": p,
        "data-state": v ? "active" : "inactive",
        "data-disabled": d ? "" : void 0,
        disabled: d,
        id: m,
        ...f,
        ref: r,
        onMouseDown: He(n.onMouseDown, (y) => {
          !d && y.button === 0 && y.ctrlKey === !1
            ? h.onValueChange(c)
            : y.preventDefault();
        }),
        onKeyDown: He(n.onKeyDown, (y) => {
          [" ", "Enter"].includes(y.key) && h.onValueChange(c);
        }),
        onFocus: He(n.onFocus, () => {
          const y = h.activationMode !== "manual";
          !v && !d && y && h.onValueChange(c);
        }),
      }),
    });
  });
pv.displayName = mv;
var xv = "TabsContent",
  gv = j.forwardRef((n, r) => {
    const { __scopeTabs: i, value: c, forceMount: d, children: f, ...h } = n,
      x = qd(xv, i),
      m = yv(x.baseId, c),
      p = vv(x.baseId, c),
      v = c === x.value,
      y = j.useRef(v);
    return (
      j.useEffect(() => {
        const N = requestAnimationFrame(() => (y.current = !1));
        return () => cancelAnimationFrame(N);
      }, []),
      l.jsx(sl, {
        present: d || v,
        children: ({ present: N }) =>
          l.jsx(We.div, {
            "data-state": v ? "active" : "inactive",
            "data-orientation": x.orientation,
            role: "tabpanel",
            "aria-labelledby": m,
            hidden: !N,
            id: p,
            tabIndex: 0,
            ...h,
            ref: r,
            style: { ...n.style, animationDuration: y.current ? "0s" : void 0 },
            children: N && f,
          }),
      })
    );
  });
gv.displayName = xv;
function yv(n, r) {
  return `${n}-trigger-${r}`;
}
function vv(n, r) {
  return `${n}-content-${r}`;
}
var cT = dv,
  bv = hv,
  jv = pv,
  Nv = gv;
const wv = cT,
  Hd = j.forwardRef(({ className: n, ...r }, i) =>
    l.jsx(bv, {
      ref: i,
      className: ze(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        n,
      ),
      ...r,
    }),
  );
Hd.displayName = bv.displayName;
const Bd = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx(jv, {
    ref: i,
    className: ze(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      n,
    ),
    ...r,
  }),
);
Bd.displayName = jv.displayName;
const Pi = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx(Nv, {
    ref: i,
    className: ze(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      n,
    ),
    ...r,
  }),
);
Pi.displayName = Nv.displayName;
function Sv(n) {
  return n
    ? new Date(n).toLocaleDateString(void 0, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
}
function zu({ round: n, matches: r }) {
  const { isAuthenticated: i, isLoading: c, login: d } = Wt(),
    { toast: f } = Es(),
    h = vn(),
    x = vE(),
    m = j.useMemo(() => {
      const R = {};
      for (const S of r)
        R[S.id] = {
          home: S.userPrediction?.homeScore?.toString() ?? "",
          away: S.userPrediction?.awayScore?.toString() ?? "",
        };
      return R;
    }, [r]),
    [p, v] = j.useState(m),
    y = (R, S, C) => {
      v((A) => ({ ...A, [R]: { ...A[R], [S]: C } }));
    },
    N = r.filter((R) => R.userPrediction != null).length;
  r.every(
    (R) =>
      p[R.id]?.home !== "" &&
      p[R.id]?.away !== "" &&
      !isNaN(parseInt(p[R.id]?.home ?? "")) &&
      !isNaN(parseInt(p[R.id]?.away ?? "")),
  );
  const T = () => {
    if (!i) {
      d();
      return;
    }
    const R = r
      .filter((S) => p[S.id]?.home !== "" && p[S.id]?.away !== "")
      .map((S) => ({
        matchId: S.id,
        homeScore: parseInt(p[S.id].home),
        awayScore: parseInt(p[S.id].away),
      }))
      .filter((S) => !isNaN(S.homeScore) && !isNaN(S.awayScore));
    if (R.length === 0) {
      f({
        title: "No scores entered",
        description: "Fill in at least one score.",
        variant: "destructive",
      });
      return;
    }
    x.mutate(
      { data: { round: n.round, predictions: R } },
      {
        onSuccess: (S) => {
          (f({
            title: `${S.saved} prediction${S.saved !== 1 ? "s" : ""} saved!`,
            description: "Good luck!",
          }),
            h.invalidateQueries({ queryKey: Jy() }),
            h.invalidateQueries({ queryKey: Ld() }),
            h.invalidateQueries({ queryKey: Ud() }));
        },
        onError: (S) => {
          const C = S?.response?.data?.error ?? "Could not save predictions.";
          f({ title: "Error", description: C, variant: "destructive" });
        },
      },
    );
  };
  return r.length === 0
    ? l.jsxs("div", {
        className: "py-12 text-center text-muted-foreground",
        children: [
          l.jsx("p", { children: "No matches scheduled for this window yet." }),
          l.jsx("p", {
            className: "text-sm mt-1",
            children:
              "Teams will be determined once the previous round concludes.",
          }),
        ],
      })
    : l.jsxs("div", {
        className: "space-y-4",
        children: [
          l.jsxs("div", {
            className:
              "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border bg-muted/30",
            children: [
              l.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  n.isLocked
                    ? l.jsx(xn, {
                        className: "h-5 w-5 text-destructive shrink-0",
                      })
                    : l.jsx(Vg, {
                        className: "h-5 w-5 text-green-500 shrink-0",
                      }),
                  l.jsxs("div", {
                    children: [
                      n.isLocked
                        ? l.jsx("p", {
                            className: "font-semibold text-destructive",
                            children: "Predictions closed",
                          })
                        : l.jsxs("p", {
                            className: "font-semibold text-green-600",
                            children: [
                              "Open · closes",
                              " ",
                              n.locksAt ? Sv(n.locksAt) : "at kickoff",
                            ],
                          }),
                      l.jsxs("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                          N,
                          "/",
                          n.matchCount,
                          " predicted · +",
                          n.pointsOutcome,
                          " pt outcome / +",
                          n.pointsExact,
                          " pts exact score",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              !n.isLocked &&
                i &&
                l.jsxs(xe, {
                  onClick: T,
                  disabled: x.isPending,
                  className:
                    "bg-green-500 hover:bg-green-600 text-white font-bold shrink-0",
                  children: [
                    x.isPending
                      ? l.jsx(st, { className: "mr-2 h-4 w-4 animate-spin" })
                      : l.jsx(bs, { className: "mr-2 h-4 w-4" }),
                    "Save Predictions",
                  ],
                }),
              !i &&
                !c &&
                l.jsx(xe, {
                  variant: "outline",
                  onClick: d,
                  className: "shrink-0",
                  children: "Log in to predict",
                }),
            ],
          }),
          l.jsx("div", {
            className:
              "divide-y divide-border border border-border rounded-xl overflow-hidden",
            children: r.map((R) => {
              const S = p[R.id] ?? { home: "", away: "" },
                C = R.userPrediction != null,
                A = R.status === "completed",
                U = R.status === "live",
                z = R.userPrediction?.points ?? 0,
                H = z === n.pointsExact,
                V = !H && z > 0;
              return l.jsxs(
                "div",
                {
                  className:
                    "flex items-center gap-3 p-3 sm:p-4 bg-card hover:bg-muted/20 transition-colors",
                  children: [
                    l.jsx("div", {
                      className:
                        "hidden sm:block w-28 shrink-0 text-xs text-muted-foreground",
                      children: new Date(R.scheduledAt).toLocaleDateString(
                        void 0,
                        {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      ),
                    }),
                    l.jsxs("div", {
                      className:
                        "flex-1 flex items-center justify-between gap-2 min-w-0",
                      children: [
                        l.jsxs("div", {
                          className: "flex items-center gap-1.5 min-w-0",
                          children: [
                            (() => {
                              const F = Gt(R.homeTeam?.code);
                              return F
                                ? l.jsx("img", {
                                    src: F,
                                    alt: R.homeTeam?.code ?? "",
                                    className:
                                      "h-4 w-6 object-cover rounded-sm shrink-0",
                                  })
                                : l.jsx("span", {
                                    className: "text-base",
                                    children: R.homeTeam?.flagEmoji,
                                  });
                            })(),
                            l.jsx("span", {
                              className: "font-bold text-sm truncate",
                              children: R.homeTeam?.code,
                            }),
                          ],
                        }),
                        l.jsxs("div", {
                          className: "flex items-center gap-1 shrink-0",
                          children: [
                            (A || U) &&
                              l.jsxs("span", {
                                className: "text-sm font-black tabular-nums",
                                children: [
                                  R.homeScore ?? "?",
                                  "–",
                                  R.awayScore ?? "?",
                                ],
                              }),
                            !A &&
                              !U &&
                              l.jsx("span", {
                                className:
                                  "text-xs font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded",
                                children: "vs",
                              }),
                            U &&
                              l.jsx(an, {
                                className:
                                  "bg-red-500/15 text-red-400 border border-red-500/25 text-xs animate-pulse",
                                children: "LIVE",
                              }),
                          ],
                        }),
                        l.jsxs("div", {
                          className:
                            "flex items-center gap-1.5 min-w-0 justify-end",
                          children: [
                            l.jsx("span", {
                              className: "font-bold text-sm truncate",
                              children: R.awayTeam?.code,
                            }),
                            (() => {
                              const F = Gt(R.awayTeam?.code);
                              return F
                                ? l.jsx("img", {
                                    src: F,
                                    alt: R.awayTeam?.code ?? "",
                                    className:
                                      "h-4 w-6 object-cover rounded-sm shrink-0",
                                  })
                                : l.jsx("span", {
                                    className: "text-base",
                                    children: R.awayTeam?.flagEmoji,
                                  });
                            })(),
                          ],
                        }),
                      ],
                    }),
                    l.jsx("div", {
                      className: "shrink-0 flex items-center gap-2 ml-3",
                      children:
                        n.isLocked || A || U
                          ? C
                            ? l.jsxs("div", {
                                className: "flex items-center gap-1",
                                children: [
                                  l.jsxs("span", {
                                    className:
                                      "text-sm font-bold bg-muted px-2 py-1 rounded-md",
                                    children: [
                                      R.userPrediction.homeScore,
                                      " – ",
                                      R.userPrediction.awayScore,
                                    ],
                                  }),
                                  A &&
                                    R.userPrediction.points != null &&
                                    (H
                                      ? l.jsxs("span", {
                                          className:
                                            "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-[10px] font-bold border border-yellow-500/20",
                                          children: [
                                            l.jsx(ll, {
                                              className: "h-2.5 w-2.5",
                                            }),
                                            "+",
                                            z,
                                          ],
                                        })
                                      : V
                                        ? l.jsxs("span", {
                                            className:
                                              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 text-[10px] font-bold border border-green-500/20",
                                            children: [
                                              l.jsx(bs, {
                                                className: "h-2.5 w-2.5",
                                              }),
                                              "+",
                                              z,
                                            ],
                                          })
                                        : l.jsxs("span", {
                                            className:
                                              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/15",
                                            children: [
                                              l.jsx(rl, {
                                                className: "h-2.5 w-2.5",
                                              }),
                                              "0",
                                            ],
                                          })),
                                ],
                              })
                            : l.jsx("span", {
                                className:
                                  "text-xs text-muted-foreground italic",
                                children: "—",
                              })
                          : l.jsxs("div", {
                              className: "flex items-center gap-1",
                              children: [
                                l.jsx(St, {
                                  type: "number",
                                  min: "0",
                                  max: "20",
                                  placeholder: "0",
                                  className:
                                    "w-12 h-8 text-center text-sm font-bold p-1",
                                  value: S.home,
                                  onChange: (F) =>
                                    y(R.id, "home", F.target.value),
                                }),
                                l.jsx("span", {
                                  className:
                                    "text-muted-foreground text-sm font-bold",
                                  children: "–",
                                }),
                                l.jsx(St, {
                                  type: "number",
                                  min: "0",
                                  max: "20",
                                  placeholder: "0",
                                  className:
                                    "w-12 h-8 text-center text-sm font-bold p-1",
                                  value: S.away,
                                  onChange: (F) =>
                                    y(R.id, "away", F.target.value),
                                }),
                              ],
                            }),
                    }),
                  ],
                },
                R.id,
              );
            }),
          }),
          !n.isLocked &&
            i &&
            r.length > 0 &&
            l.jsx("div", {
              className: "flex justify-end",
              children: l.jsxs(xe, {
                onClick: T,
                disabled: x.isPending,
                className:
                  "bg-green-500 hover:bg-green-600 text-white font-bold",
                children: [
                  x.isPending
                    ? l.jsx(st, { className: "mr-2 h-4 w-4 animate-spin" })
                    : l.jsx(bs, { className: "mr-2 h-4 w-4" }),
                  "Save All ",
                  n.label,
                  " Predictions",
                ],
              }),
            }),
        ],
      });
}
const _i = "group_stage";
function uT() {
  const { data: n, isLoading: r } = Iy(),
    { data: i, isLoading: c } = no();
  Wt();
  const d = r || c,
    f = n?.find((y) => y.round === "group_stage_1") ?? null,
    h = n?.find((y) => y.round === "group_stage_2") ?? null,
    x = j.useMemo(
      () =>
        n?.filter(
          (y) => y.round !== "group_stage_1" && y.round !== "group_stage_2",
        ) ?? [],
      [n],
    ),
    m = j.useMemo(
      () =>
        n?.length
          ? !f && !h
            ? n
            : [
                {
                  round: _i,
                  label: "Group Stage",
                  order: 1,
                  matchCount: (f?.matchCount ?? 0) + (h?.matchCount ?? 0),
                  predictedCount:
                    (f?.predictedCount ?? 0) + (h?.predictedCount ?? 0),
                  isLocked: (f?.isLocked ?? !1) && (h?.isLocked ?? !1),
                  locksAt: f?.locksAt ?? null,
                  pointsOutcome: f?.pointsOutcome ?? 1,
                  pointsExact: f?.pointsExact ?? 3,
                },
                ...x,
              ]
          : [],
      [n, f, h, x],
    ),
    p = j.useMemo(() => {
      if (!i) return {};
      const y = {};
      for (const N of i)
        if (
          (y[N.stage] || (y[N.stage] = []),
          y[N.stage].push(N),
          N.stage === "group_stage")
        ) {
          const T = N.matchDay === 1 ? "group_stage_1" : "group_stage_2";
          (y[T] || (y[T] = []), y[T].push(N));
        }
      return y;
    }, [i]),
    v = j.useMemo(
      () =>
        m.length
          ? (m.find((N) => !N.isLocked && N.matchCount > 0)?.round ??
            m[0]?.round ??
            _i)
          : _i,
      [m],
    );
  return d
    ? l.jsx(ct, {
        children: l.jsxs("div", {
          className: "space-y-6",
          children: [
            l.jsx(Ut, { className: "h-12 w-64" }),
            l.jsx(Ut, { className: "h-10 w-full max-w-xl" }),
            l.jsx("div", {
              className: "space-y-2",
              children: [1, 2, 3, 4, 5].map((y) =>
                l.jsx(Ut, { className: "h-14 rounded-lg" }, y),
              ),
            }),
          ],
        }),
      })
    : l.jsx(ct, {
        children: l.jsxs("div", {
          className: "space-y-6",
          children: [
            l.jsxs("header", {
              children: [
                l.jsx("h1", {
                  className: "text-3xl font-black uppercase tracking-tight",
                  children: "Predictions",
                }),
                l.jsx("p", {
                  className: "text-muted-foreground",
                  children:
                    "Predict every score before each window locks. Group Stage splits into two deadlines.",
                }),
              ],
            }),
            m.length > 0
              ? l.jsxs(wv, {
                  defaultValue: v,
                  children: [
                    l.jsx(Hd, {
                      className: "flex flex-wrap h-auto gap-1 w-full",
                      children: m.map((y) =>
                        l.jsxs(
                          Bd,
                          {
                            value: y.round,
                            className: "relative",
                            children: [
                              y.label,
                              y.isLocked &&
                                l.jsx(xn, {
                                  className:
                                    "ml-1 h-3 w-3 text-muted-foreground inline",
                                }),
                              !y.isLocked &&
                                y.predictedCount > 0 &&
                                y.matchCount > 0 &&
                                l.jsxs("span", {
                                  className:
                                    "ml-1 text-xs text-green-500 font-bold",
                                  children: [
                                    y.predictedCount,
                                    "/",
                                    y.matchCount,
                                  ],
                                }),
                            ],
                          },
                          y.round,
                        ),
                      ),
                    }),
                    l.jsx(Pi, {
                      value: _i,
                      className: "mt-6",
                      children: l.jsxs("div", {
                        className: "space-y-8",
                        children: [
                          f &&
                            l.jsxs("section", {
                              children: [
                                l.jsxs("h2", {
                                  className:
                                    "text-lg font-bold uppercase tracking-tight mb-3 flex items-center gap-2",
                                  children: [
                                    "WEEK 1",
                                    f.isLocked &&
                                      l.jsx(an, {
                                        variant: "destructive",
                                        className: "text-xs font-normal",
                                        children: "Locked",
                                      }),
                                  ],
                                }),
                                l.jsx(zu, {
                                  round: f,
                                  matches: p.group_stage_1 ?? [],
                                }),
                              ],
                            }),
                          f &&
                            h &&
                            l.jsx("div", {
                              className: "border-t border-border pt-8",
                            }),
                          h &&
                            l.jsxs("section", {
                              children: [
                                l.jsxs("h2", {
                                  className:
                                    "text-lg font-bold uppercase tracking-tight mb-3 flex items-center gap-2",
                                  children: [
                                    "WEEK 2",
                                    h.isLocked
                                      ? l.jsx(an, {
                                          variant: "destructive",
                                          className: "text-xs font-normal",
                                          children: "Locked",
                                        })
                                      : l.jsxs(an, {
                                          className:
                                            "text-xs font-normal bg-green-500 hover:bg-green-600",
                                          children: [
                                            "Open until ",
                                            Sv(h.locksAt),
                                          ],
                                        }),
                                  ],
                                }),
                                l.jsx(zu, {
                                  round: h,
                                  matches: p.group_stage_2 ?? [],
                                }),
                              ],
                            }),
                        ],
                      }),
                    }),
                    x.map((y) =>
                      l.jsx(
                        Pi,
                        {
                          value: y.round,
                          className: "mt-6",
                          children: l.jsx(zu, {
                            round: y,
                            matches: p[y.round] ?? [],
                          }),
                        },
                        y.round,
                      ),
                    ),
                  ],
                })
              : l.jsx("div", {
                  className: "py-20 text-center text-muted-foreground",
                  children: "No rounds available.",
                }),
          ],
        }),
      });
}
function Ux({ code: n, emoji: r, size: i = "md" }) {
  const c = Gt(n),
    d = i === "sm" ? "h-4 w-6" : i === "lg" ? "h-8 w-12" : "h-5 w-8",
    f = i === "sm" ? "text-base" : i === "lg" ? "text-4xl" : "text-2xl";
  return c
    ? l.jsx("img", {
        src: c,
        alt: n ?? "",
        className: `${d} object-cover rounded-sm shrink-0`,
      })
    : l.jsx("span", { className: f, children: r ?? "🏳️" });
}
function dT({ points: n, pointsExact: r, pointsOutcome: i }) {
  return n == null
    ? null
    : n >= r
      ? l.jsxs("span", {
          className:
            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold border border-yellow-500/25",
          children: [l.jsx(ll, { className: "h-3 w-3" }), " Exact +", n],
        })
      : n >= i && n > 0
        ? l.jsxs("span", {
            className:
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-bold border border-green-500/25",
            children: [l.jsx(bs, { className: "h-3 w-3" }), " Correct +", n],
          })
        : l.jsxs("span", {
            className:
              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20",
            children: [l.jsx(rl, { className: "h-3 w-3" }), " Miss"],
          });
}
function fT({ match: n }) {
  const { isAuthenticated: r, isLoading: i, login: c } = Wt(),
    { toast: d } = Es(),
    f = vn(),
    h = pE(),
    x = n.userPrediction,
    m = n.status === "completed",
    p = n.status === "live",
    v = !m && !p && r && !i,
    [y, N] = j.useState(x?.homeScore?.toString() || ""),
    [T, R] = j.useState(x?.awayScore?.toString() || ""),
    [S, C] = j.useState(!x && v),
    A = (U) => {
      if ((U.preventDefault(), !r)) {
        c();
        return;
      }
      const z = parseInt(y),
        H = parseInt(T);
      if (isNaN(z) || isNaN(H) || z < 0 || H < 0) {
        d({
          title: "Invalid prediction",
          description: "Please enter valid scores.",
          variant: "destructive",
        });
        return;
      }
      h.mutate(
        { data: { matchId: n.id, homeScore: z, awayScore: H } },
        {
          onSuccess: () => {
            (C(!1),
              d({ title: "Prediction saved!", description: "Good luck!" }),
              f.invalidateQueries({ queryKey: dE() }),
              f.invalidateQueries({ queryKey: Ud() }),
              f.invalidateQueries({ queryKey: Ld() }));
          },
          onError: () => {
            d({
              title: "Error",
              description: "Could not save prediction.",
              variant: "destructive",
            });
          },
        },
      );
    };
  return l.jsxs("div", {
    className: `bg-card border rounded-xl p-4 md:p-5 flex flex-col gap-4 transition-colors ${m && x ? (x.points != null && x.points >= 3 ? "border-yellow-500/25" : x.points != null && x.points > 0 ? "border-green-500/25" : "border-border") : "border-border hover:border-primary/30"}`,
    children: [
      l.jsxs("div", {
        className:
          "flex justify-between items-center text-sm font-semibold text-muted-foreground",
        children: [
          l.jsx("span", {
            children: new Date(n.scheduledAt).toLocaleDateString(void 0, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }),
          l.jsx("span", {
            className:
              "bg-muted px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wide",
            children: n.stage.replace(/_/g, " "),
          }),
        ],
      }),
      l.jsxs("div", {
        className: "grid grid-cols-[1fr_auto_1fr] items-center gap-3",
        children: [
          l.jsx("div", {
            className: "flex flex-col items-center gap-2",
            children: n.homeTeam
              ? l.jsxs(l.Fragment, {
                  children: [
                    l.jsx(Ux, {
                      code: n.homeTeam.code,
                      emoji: n.homeTeam.flagEmoji,
                      size: "lg",
                    }),
                    l.jsx("span", {
                      className: "font-black text-base tracking-tight",
                      children: n.homeTeam.code,
                    }),
                    l.jsx("span", {
                      className:
                        "text-xs text-muted-foreground hidden sm:block text-center leading-tight",
                      children: n.homeTeam.name,
                    }),
                  ],
                })
              : l.jsxs(l.Fragment, {
                  children: [
                    l.jsx("div", {
                      className:
                        "h-8 w-12 rounded bg-muted flex items-center justify-center text-muted-foreground text-lg",
                      children: "?",
                    }),
                    l.jsx("span", {
                      className:
                        "font-black text-base tracking-tight text-muted-foreground",
                      children: "TBD",
                    }),
                  ],
                }),
          }),
          l.jsxs("div", {
            className: "flex flex-col items-center gap-1.5 min-w-[60px]",
            children: [
              m || p
                ? l.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      l.jsx("span", {
                        className: "text-2xl font-black tabular-nums",
                        children: n.homeScore ?? "?",
                      }),
                      l.jsx("span", {
                        className: "text-muted-foreground text-sm",
                        children: "–",
                      }),
                      l.jsx("span", {
                        className: "text-2xl font-black tabular-nums",
                        children: n.awayScore ?? "?",
                      }),
                    ],
                  })
                : l.jsx("span", {
                    className:
                      "text-sm font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-lg",
                    children: "VS",
                  }),
              p &&
                l.jsx("span", {
                  className:
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[10px] font-bold border border-red-500/25 animate-pulse",
                  children: "● LIVE",
                }),
              m &&
                l.jsx("span", {
                  className:
                    "text-[10px] font-semibold text-muted-foreground tracking-wide",
                  children: "FT",
                }),
            ],
          }),
          l.jsx("div", {
            className: "flex flex-col items-center gap-2",
            children: n.awayTeam
              ? l.jsxs(l.Fragment, {
                  children: [
                    l.jsx(Ux, {
                      code: n.awayTeam.code,
                      emoji: n.awayTeam.flagEmoji,
                      size: "lg",
                    }),
                    l.jsx("span", {
                      className: "font-black text-base tracking-tight",
                      children: n.awayTeam.code,
                    }),
                    l.jsx("span", {
                      className:
                        "text-xs text-muted-foreground hidden sm:block text-center leading-tight",
                      children: n.awayTeam.name,
                    }),
                  ],
                })
              : l.jsxs(l.Fragment, {
                  children: [
                    l.jsx("div", {
                      className:
                        "h-8 w-12 rounded bg-muted flex items-center justify-center text-muted-foreground text-lg",
                      children: "?",
                    }),
                    l.jsx("span", {
                      className:
                        "font-black text-base tracking-tight text-muted-foreground",
                      children: "TBD",
                    }),
                  ],
                }),
          }),
        ],
      }),
      l.jsx("div", {
        className: "border-t border-border/60 pt-3",
        children: i
          ? l.jsx("div", {
              className: "h-9 w-full rounded-md bg-muted/60 animate-pulse",
            })
          : r
            ? m
              ? l.jsx("div", {
                  className: "flex flex-col items-center gap-2 text-center",
                  children: x
                    ? l.jsxs(l.Fragment, {
                        children: [
                          l.jsxs("p", {
                            className: "text-sm text-muted-foreground",
                            children: [
                              "Your pick: ",
                              l.jsxs("span", {
                                className: "font-black text-foreground",
                                children: [x.homeScore, "–", x.awayScore],
                              }),
                            ],
                          }),
                          l.jsx(dT, {
                            points: x.points,
                            pointsExact: 3,
                            pointsOutcome: 1,
                          }),
                        ],
                      })
                    : l.jsx("p", {
                        className: "text-sm text-muted-foreground italic",
                        children: "No prediction made",
                      }),
                })
              : p
                ? l.jsx("div", {
                    className: "text-center",
                    children: x
                      ? l.jsxs("p", {
                          className: "text-sm text-muted-foreground",
                          children: [
                            "Locked: ",
                            l.jsxs("span", {
                              className: "font-black text-foreground",
                              children: [x.homeScore, "–", x.awayScore],
                            }),
                          ],
                        })
                      : l.jsx("p", {
                          className: "text-sm text-muted-foreground italic",
                          children: "Too late to predict",
                        }),
                  })
                : S
                  ? l.jsxs("form", {
                      onSubmit: A,
                      className: "flex flex-col gap-3",
                      children: [
                        l.jsxs("div", {
                          className: "flex items-center justify-center gap-3",
                          children: [
                            l.jsx(St, {
                              type: "number",
                              min: "0",
                              max: "20",
                              required: !0,
                              className:
                                "w-16 h-10 text-center text-lg font-black",
                              value: y,
                              onChange: (U) => N(U.target.value),
                            }),
                            l.jsx("span", {
                              className: "text-muted-foreground font-bold",
                              children: "–",
                            }),
                            l.jsx(St, {
                              type: "number",
                              min: "0",
                              max: "20",
                              required: !0,
                              className:
                                "w-16 h-10 text-center text-lg font-black",
                              value: T,
                              onChange: (U) => R(U.target.value),
                            }),
                          ],
                        }),
                        l.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            x &&
                              l.jsx(xe, {
                                type: "button",
                                variant: "ghost",
                                size: "sm",
                                className: "flex-1",
                                onClick: () => C(!1),
                                children: "Cancel",
                              }),
                            l.jsxs(xe, {
                              type: "submit",
                              size: "sm",
                              className: "flex-1 font-bold",
                              disabled: h.isPending,
                              children: [
                                h.isPending &&
                                  l.jsx(st, {
                                    className: "mr-2 h-3.5 w-3.5 animate-spin",
                                  }),
                                x ? "Update" : "Save",
                              ],
                            }),
                          ],
                        }),
                      ],
                    })
                  : l.jsxs("div", {
                      className:
                        "flex items-center justify-between gap-3 bg-muted/40 px-3 py-2 rounded-lg border border-border/50",
                      children: [
                        l.jsxs("p", {
                          className: "text-sm",
                          children: [
                            "Picked: ",
                            l.jsxs("span", {
                              className: "font-black",
                              children: [x?.homeScore, "–", x?.awayScore],
                            }),
                          ],
                        }),
                        l.jsx(xe, {
                          variant: "outline",
                          size: "sm",
                          onClick: () => C(!0),
                          children: "Edit",
                        }),
                      ],
                    })
            : l.jsx(xe, {
                variant: "outline",
                size: "sm",
                className: "w-full",
                onClick: c,
                children: "Log in to predict",
              }),
      }),
    ],
  });
}
const qx = {
    group_stage: 1,
    round_of_32: 2,
    round_of_16: 3,
    quarterfinals: 4,
    semifinals: 5,
    final: 6,
  },
  Hx = {
    group_stage: "Group Stage",
    round_of_32: "Round of 32",
    round_of_16: "Round of 16",
    quarterfinals: "Quarterfinals",
    semifinals: "Semifinals",
    final: "Final",
  };
function hT() {
  const { data: n, isLoading: r } = no(),
    i = j.useMemo(() => {
      if (!n) return [];
      const h = new Map();
      for (const x of n)
        (h.has(x.stage) || h.set(x.stage, []), h.get(x.stage).push(x));
      return Array.from(h.entries())
        .sort(([x], [m]) => (qx[x] ?? 99) - (qx[m] ?? 99))
        .map(([x, m]) => ({ stage: x, matches: m }));
    }, [n]),
    c = n?.filter((h) => h.status === "completed").length ?? 0,
    d = n?.length ?? 0,
    f = i[0]?.stage ?? "group_stage";
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsx("header", {
          children: l.jsxs("div", {
            className: "flex items-start justify-between gap-4",
            children: [
              l.jsxs("div", {
                children: [
                  l.jsx("h1", {
                    className: "text-3xl font-black uppercase tracking-tight",
                    children: "Schedule",
                  }),
                  l.jsxs("p", {
                    className: "text-muted-foreground text-sm mt-1",
                    children: ["All ", d, " World Cup matches by round."],
                  }),
                ],
              }),
              d > 0 &&
                l.jsxs("div", {
                  className: "shrink-0 text-right",
                  children: [
                    l.jsx("div", {
                      className: "text-2xl font-black text-primary",
                      children: c,
                    }),
                    l.jsxs("div", {
                      className: "text-xs text-muted-foreground",
                      children: ["of ", d, " played"],
                    }),
                  ],
                }),
            ],
          }),
        }),
        r
          ? l.jsxs("div", {
              className: "space-y-4",
              children: [
                l.jsx(Ut, { className: "h-10 w-full max-w-xl" }),
                l.jsx("div", {
                  className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                  children: [1, 2, 3, 4, 5, 6].map((h) =>
                    l.jsx(Ut, { className: "h-56 rounded-xl" }, h),
                  ),
                }),
              ],
            })
          : i.length > 0
            ? l.jsxs(wv, {
                defaultValue: f,
                children: [
                  l.jsx(Hd, {
                    className: "flex flex-wrap h-auto gap-1 w-full",
                    children: i.map(({ stage: h, matches: x }) => {
                      const m = x.filter(
                          (y) => y.status === "completed",
                        ).length,
                        p = x.filter((y) => y.status === "live").length,
                        v = Hx[h] ?? h.replace(/_/g, " ");
                      return l.jsxs(
                        Bd,
                        {
                          value: h,
                          children: [
                            v,
                            p > 0 &&
                              l.jsxs("span", {
                                className:
                                  "ml-1 text-xs text-red-400 font-bold animate-pulse",
                                children: [p, " LIVE"],
                              }),
                            m > 0 &&
                              p === 0 &&
                              l.jsxs("span", {
                                className: "ml-1 text-xs text-muted-foreground",
                                children: [m, "/", x.length],
                              }),
                          ],
                        },
                        h,
                      );
                    }),
                  }),
                  i.map(({ stage: h, matches: x }) => {
                    const m = x.filter((y) => y.status === "completed").length,
                      p = x.filter((y) => y.status === "live").length,
                      v = Hx[h] ?? h.replace(/_/g, " ");
                    return l.jsxs(
                      Pi,
                      {
                        value: h,
                        className: "mt-6",
                        children: [
                          l.jsxs("div", {
                            className: "flex items-center gap-3 mb-5",
                            children: [
                              l.jsx(tl, {
                                className: "h-5 w-5 text-primary shrink-0",
                              }),
                              l.jsx("h2", {
                                className:
                                  "text-xl font-black uppercase tracking-tight",
                                children: v,
                              }),
                              l.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [
                                  p > 0 &&
                                    l.jsxs(an, {
                                      className:
                                        "bg-red-500/15 text-red-400 border border-red-500/25 font-bold animate-pulse",
                                      children: [p, " LIVE"],
                                    }),
                                  l.jsxs("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: [m, "/", x.length, " played"],
                                  }),
                                ],
                              }),
                              l.jsx("div", {
                                className: "flex-1 h-px bg-border ml-2",
                              }),
                            ],
                          }),
                          l.jsx("div", {
                            className:
                              "grid md:grid-cols-2 xl:grid-cols-3 gap-4",
                            children: x.map((y) =>
                              l.jsx(fT, { match: y }, y.id),
                            ),
                          }),
                        ],
                      },
                      h,
                    );
                  }),
                ],
              })
            : l.jsxs("div", {
                className:
                  "py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl",
                children: [
                  l.jsx(tl, { className: "h-12 w-12 mx-auto mb-3 opacity-30" }),
                  l.jsx("p", { children: "No matches found." }),
                ],
              }),
      ],
    }),
  });
}
const Js = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("div", {
    className: "relative w-full overflow-auto",
    children: l.jsx("table", {
      ref: i,
      className: ze("w-full caption-bottom text-sm", n),
      ...r,
    }),
  }),
);
Js.displayName = "Table";
const Is = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("thead", { ref: i, className: ze("[&_tr]:border-b", n), ...r }),
);
Is.displayName = "TableHeader";
const Ws = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("tbody", {
    ref: i,
    className: ze("[&_tr:last-child]:border-0", n),
    ...r,
  }),
);
Ws.displayName = "TableBody";
const mT = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("tfoot", {
    ref: i,
    className: ze("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", n),
    ...r,
  }),
);
mT.displayName = "TableFooter";
const qt = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("tr", {
    ref: i,
    className: ze(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      n,
    ),
    ...r,
  }),
);
qt.displayName = "TableRow";
const Se = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("th", {
    ref: i,
    className: ze(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      n,
    ),
    ...r,
  }),
);
Se.displayName = "TableHead";
const Ee = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("td", {
    ref: i,
    className: ze(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      n,
    ),
    ...r,
  }),
);
Ee.displayName = "TableCell";
const pT = j.forwardRef(({ className: n, ...r }, i) =>
  l.jsx("caption", {
    ref: i,
    className: ze("mt-4 text-sm text-muted-foreground", n),
    ...r,
  }),
);
pT.displayName = "TableCaption";
function xT() {
  const { data: n, isLoading: r } = aE();
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-8",
      children: [
        l.jsxs("header", {
          children: [
            l.jsx("h1", {
              className: "text-3xl font-black uppercase tracking-tight",
              children: "Groups",
            }),
            l.jsx("p", {
              className: "text-muted-foreground",
              children: "Standings across all 12 groups.",
            }),
          ],
        }),
        r
          ? l.jsx("div", {
              className: "grid lg:grid-cols-2 gap-6",
              children: [1, 2, 3, 4].map((i) =>
                l.jsx(Ut, { className: "h-64 rounded-xl" }, i),
              ),
            })
          : n && n.length > 0
            ? l.jsx("div", {
                className: "grid lg:grid-cols-2 gap-8",
                children: n.map((i) =>
                  l.jsxs(
                    Ae,
                    {
                      className: "overflow-hidden border-border/50",
                      children: [
                        l.jsx(ws, {
                          className: "bg-muted/30 pb-3",
                          children: l.jsxs(Ss, {
                            className: "uppercase tracking-tight text-lg",
                            children: ["Group ", i.name],
                          }),
                        }),
                        l.jsx(Oe, {
                          className: "p-0",
                          children: l.jsxs(Js, {
                            children: [
                              l.jsx(Is, {
                                className: "bg-muted/10",
                                children: l.jsxs(qt, {
                                  children: [
                                    l.jsx(Se, {
                                      className: "w-[40px]",
                                      children: "#",
                                    }),
                                    l.jsx(Se, { children: "Team" }),
                                    l.jsx(Se, {
                                      className: "text-right",
                                      children: "P",
                                    }),
                                    l.jsx(Se, {
                                      className: "text-right",
                                      children: "W",
                                    }),
                                    l.jsx(Se, {
                                      className: "text-right",
                                      children: "D",
                                    }),
                                    l.jsx(Se, {
                                      className: "text-right",
                                      children: "L",
                                    }),
                                    l.jsx(Se, {
                                      className: "text-right",
                                      children: "GD",
                                    }),
                                    l.jsx(Se, {
                                      className:
                                        "text-right font-bold text-primary",
                                      children: "Pts",
                                    }),
                                  ],
                                }),
                              }),
                              l.jsx(Ws, {
                                children: i.teams
                                  .sort(
                                    (c, d) =>
                                      d.points - c.points ||
                                      d.goalsFor -
                                        d.goalsAgainst -
                                        (c.goalsFor - c.goalsAgainst),
                                  )
                                  .map((c, d) =>
                                    l.jsxs(
                                      qt,
                                      {
                                        children: [
                                          l.jsx(Ee, {
                                            className:
                                              "font-medium text-muted-foreground",
                                            children: d + 1,
                                          }),
                                          l.jsx(Ee, {
                                            children: l.jsxs("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                Gt(c.code)
                                                  ? l.jsx("img", {
                                                      src: Gt(c.code),
                                                      alt: c.code,
                                                      className:
                                                        "h-4 w-6 object-cover rounded-sm shrink-0",
                                                    })
                                                  : l.jsx("span", {
                                                      className: "text-lg",
                                                      children: c.flagEmoji,
                                                    }),
                                                l.jsx("span", {
                                                  className: "font-bold",
                                                  children: c.name,
                                                }),
                                              ],
                                            }),
                                          }),
                                          l.jsx(Ee, {
                                            className: "text-right",
                                            children: c.played,
                                          }),
                                          l.jsx(Ee, {
                                            className: "text-right",
                                            children: c.won,
                                          }),
                                          l.jsx(Ee, {
                                            className: "text-right",
                                            children: c.drawn,
                                          }),
                                          l.jsx(Ee, {
                                            className: "text-right",
                                            children: c.lost,
                                          }),
                                          l.jsx(Ee, {
                                            className: "text-right",
                                            children:
                                              c.goalsFor - c.goalsAgainst,
                                          }),
                                          l.jsx(Ee, {
                                            className:
                                              "text-right font-black text-primary text-lg",
                                            children: c.points,
                                          }),
                                        ],
                                      },
                                      c.id,
                                    ),
                                  ),
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    i.id,
                  ),
                ),
              })
            : l.jsx("div", {
                className:
                  "py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl",
                children: "No groups found.",
              }),
      ],
    }),
  });
}
async function gT() {
  const n = await fetch("/api/arenas", { credentials: "include" });
  if (!n.ok) throw new Error("Failed");
  return n.json();
}
async function yT(n) {
  const r = await fetch(`/api/arenas/${n}/leaderboard`, {
    credentials: "include",
  });
  if (!r.ok) throw new Error("Failed");
  return r.json();
}
function Bx({ rank: n }) {
  return n === 1
    ? l.jsx("span", { className: "text-xl", title: "1st", children: "🥇" })
    : n === 2
      ? l.jsx("span", { className: "text-xl", title: "2nd", children: "🥈" })
      : n === 3
        ? l.jsx("span", { className: "text-xl", title: "3rd", children: "🥉" })
        : l.jsxs("span", {
            className: "text-sm font-bold text-muted-foreground",
            children: ["#", n],
          });
}
function vT() {
  const [n, r] = j.useState("global"),
    { data: i, isLoading: c } = SE(),
    { user: d, isAuthenticated: f } = Wt(),
    { data: h } = at({ queryKey: ["arenas"], queryFn: gT, enabled: f }),
    x = h?.filter((y) => y.isMember) ?? [],
    { data: m, isLoading: p } = at({
      queryKey: ["arenas", n, "leaderboard"],
      queryFn: () => yT(n),
      enabled: typeof n == "number",
    }),
    v = x.find((y) => y.id === n);
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsxs("header", {
          children: [
            l.jsx("h1", {
              className: "text-3xl font-black uppercase tracking-tight",
              children: "Leaderboard",
            }),
            l.jsx("p", {
              className: "text-muted-foreground text-sm mt-1",
              children: "How do you stack up against the rest?",
            }),
          ],
        }),
        x.length > 0 &&
          l.jsxs("div", {
            className: "flex gap-2 flex-wrap",
            children: [
              l.jsxs("button", {
                onClick: () => r("global"),
                className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${n === "global" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`,
                children: [l.jsx(RN, { className: "h-3.5 w-3.5" }), "Global"],
              }),
              x.map((y) =>
                l.jsxs(
                  "button",
                  {
                    onClick: () => r(y.id),
                    className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${n === y.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`,
                    children: [l.jsx(yn, { className: "h-3.5 w-3.5" }), y.name],
                  },
                  y.id,
                ),
              ),
            ],
          }),
        n === "global" &&
          l.jsxs(l.Fragment, {
            children: [
              !c &&
                i &&
                i.length >= 3 &&
                l.jsx("div", {
                  className: "grid grid-cols-3 gap-3",
                  children: i.slice(0, 3).map((y) => {
                    const N = y.userId === d?.id,
                      T = y.rank === 1 ? "🥇" : y.rank === 2 ? "🥈" : "🥉",
                      R = y.rank === 1;
                    return l.jsxs(
                      "div",
                      {
                        className: `rounded-xl border p-4 text-center flex flex-col items-center gap-2 ${R ? "border-yellow-500/30 bg-yellow-500/5" : y.rank === 2 ? "border-slate-400/20 bg-slate-400/5" : "border-amber-600/20 bg-amber-600/5"} ${N ? "ring-1 ring-primary/40" : ""}`,
                        children: [
                          l.jsx("span", { className: "text-2xl", children: T }),
                          l.jsx("div", {
                            className:
                              "h-9 w-9 rounded-full bg-card border border-border flex items-center justify-center text-sm overflow-hidden",
                            children: y.profileImage
                              ? l.jsx("img", {
                                  src: y.profileImage,
                                  alt: y.username,
                                  className: "w-full h-full object-cover",
                                })
                              : y.username.charAt(0).toUpperCase(),
                          }),
                          l.jsx("p", {
                            className: `text-sm font-bold truncate w-full ${N ? "text-primary" : ""}`,
                            children: y.username,
                          }),
                          l.jsx("p", {
                            className: `text-xl font-black ${R ? "text-yellow-400" : "text-foreground"}`,
                            children: y.totalPoints,
                          }),
                          l.jsx("p", {
                            className: "text-[10px] text-muted-foreground",
                            children: "pts",
                          }),
                        ],
                      },
                      y.userId,
                    );
                  }),
                }),
              l.jsx(Ae, {
                className: "overflow-hidden border-border/60",
                children: c
                  ? l.jsx("div", {
                      className: "p-4 space-y-3",
                      children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) =>
                        l.jsx(Ut, { className: "h-12 w-full" }, y),
                      ),
                    })
                  : i && i.length > 0
                    ? l.jsxs(Js, {
                        children: [
                          l.jsx(Is, {
                            children: l.jsxs(qt, {
                              className:
                                "border-b border-border hover:bg-transparent",
                              children: [
                                l.jsx(Se, {
                                  className: "w-[72px] text-center",
                                  children: "Rank",
                                }),
                                l.jsx(Se, { children: "Player" }),
                                l.jsx(Se, {
                                  className: "text-right hidden sm:table-cell",
                                  children: "Preds",
                                }),
                                l.jsx(Se, {
                                  className: "text-right hidden md:table-cell",
                                  children: "Correct",
                                }),
                                l.jsx(Se, {
                                  className:
                                    "text-right hidden md:table-cell text-yellow-400",
                                  children: "Exact",
                                }),
                                l.jsx(Se, {
                                  className:
                                    "text-right text-primary font-bold",
                                  children: "Points",
                                }),
                              ],
                            }),
                          }),
                          l.jsx(Ws, {
                            children: i.map((y) => {
                              const N = y.userId === d?.id;
                              return l.jsxs(
                                qt,
                                {
                                  className: `border-b border-border/40 transition-colors ${N ? "bg-primary/5 font-medium" : "hover:bg-muted/20"}`,
                                  children: [
                                    l.jsx(Ee, {
                                      className: "text-center",
                                      children: l.jsx(Bx, { rank: y.rank }),
                                    }),
                                    l.jsx(Ee, {
                                      children: l.jsxs("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                          l.jsx("div", {
                                            className:
                                              "h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center text-xs overflow-hidden shrink-0",
                                            children: y.profileImage
                                              ? l.jsx("img", {
                                                  src: y.profileImage,
                                                  alt: y.username,
                                                  className:
                                                    "w-full h-full object-cover",
                                                })
                                              : y.username
                                                  .charAt(0)
                                                  .toUpperCase(),
                                          }),
                                          l.jsxs("span", {
                                            className: `text-sm ${N ? "text-primary font-bold" : "font-medium"}`,
                                            children: [
                                              y.username,
                                              N &&
                                                l.jsx("span", {
                                                  className:
                                                    "text-xs text-muted-foreground ml-1.5",
                                                  children: "(you)",
                                                }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-right text-sm text-muted-foreground hidden sm:table-cell",
                                      children: y.predictionsCount,
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-right text-sm text-muted-foreground hidden md:table-cell",
                                      children: y.correctOutcomes,
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-right text-sm font-semibold text-yellow-400 hidden md:table-cell",
                                      children: y.exactScores,
                                    }),
                                    l.jsx(Ee, {
                                      className: "text-right",
                                      children: l.jsx("span", {
                                        className:
                                          "text-lg font-black text-primary",
                                        children: y.totalPoints,
                                      }),
                                    }),
                                  ],
                                },
                                y.userId,
                              );
                            }),
                          }),
                        ],
                      })
                    : l.jsxs("div", {
                        className: "py-20 text-center text-muted-foreground",
                        children: [
                          l.jsx(ht, {
                            className: "h-12 w-12 mx-auto mb-3 opacity-30",
                          }),
                          l.jsx("p", {
                            children:
                              "Leaderboard empty — be the first to predict!",
                          }),
                        ],
                      }),
              }),
            ],
          }),
        typeof n == "number" &&
          l.jsxs(l.Fragment, {
            children: [
              v &&
                l.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    l.jsx(yn, { className: "h-5 w-5 text-primary shrink-0" }),
                    l.jsxs("div", {
                      children: [
                        l.jsx("h2", {
                          className: "text-xl font-bold",
                          children: v.name,
                        }),
                        l.jsxs("p", {
                          className: "text-xs text-muted-foreground",
                          children: [
                            v.memberCount,
                            " ",
                            v.memberCount === 1 ? "member" : "members",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              l.jsx(Ae, {
                className: "overflow-hidden border-border/60",
                children: p
                  ? l.jsx("div", {
                      className: "p-4 space-y-3",
                      children: [1, 2, 3, 4, 5].map((y) =>
                        l.jsx(Ut, { className: "h-12 w-full" }, y),
                      ),
                    })
                  : m && m.length > 0
                    ? l.jsxs(Js, {
                        children: [
                          l.jsx(Is, {
                            children: l.jsxs(qt, {
                              className:
                                "border-b border-border hover:bg-transparent",
                              children: [
                                l.jsx(Se, {
                                  className: "w-[72px] text-center",
                                  children: "Rank",
                                }),
                                l.jsx(Se, { children: "Player" }),
                                l.jsx(Se, {
                                  className: "text-right hidden sm:table-cell",
                                  children: "Group Stage",
                                }),
                                l.jsx(Se, {
                                  className: "text-right hidden sm:table-cell",
                                  children: "Knockout",
                                }),
                                l.jsx(Se, {
                                  className:
                                    "text-right hidden md:table-cell text-yellow-400",
                                  children: "Exact",
                                }),
                                l.jsx(Se, {
                                  className:
                                    "text-right text-primary font-bold",
                                  children: "Points",
                                }),
                              ],
                            }),
                          }),
                          l.jsx(Ws, {
                            children: m.map((y) => {
                              const N = y.userId === d?.id;
                              return l.jsxs(
                                qt,
                                {
                                  className: `border-b border-border/40 transition-colors ${N ? "bg-primary/5 font-medium" : "hover:bg-muted/20"}`,
                                  children: [
                                    l.jsx(Ee, {
                                      className: "text-center",
                                      children: l.jsx(Bx, { rank: y.rank }),
                                    }),
                                    l.jsx(Ee, {
                                      children: l.jsxs(Xe, {
                                        href: `/arenas/${n}/players/${y.userId}`,
                                        className:
                                          "flex items-center gap-2.5 hover:text-primary transition-colors",
                                        children: [
                                          l.jsx("div", {
                                            className:
                                              "h-7 w-7 rounded-full bg-card border border-border flex items-center justify-center text-xs overflow-hidden shrink-0",
                                            children: y.profileImage
                                              ? l.jsx("img", {
                                                  src: y.profileImage,
                                                  alt: y.username,
                                                  className:
                                                    "w-full h-full object-cover",
                                                })
                                              : y.username
                                                  .charAt(0)
                                                  .toUpperCase(),
                                          }),
                                          l.jsxs("span", {
                                            className: `text-sm ${N ? "text-primary font-bold" : "font-medium"}`,
                                            children: [
                                              y.username,
                                              N &&
                                                l.jsx("span", {
                                                  className:
                                                    "text-xs text-muted-foreground ml-1.5",
                                                  children: "(you)",
                                                }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-right text-sm text-muted-foreground hidden sm:table-cell",
                                      children: y.groupStagePoints,
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-right text-sm text-muted-foreground hidden sm:table-cell",
                                      children: y.knockoutPoints,
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-right text-sm font-semibold text-yellow-400 hidden md:table-cell",
                                      children: y.exactScores,
                                    }),
                                    l.jsx(Ee, {
                                      className: "text-right",
                                      children: l.jsx("span", {
                                        className:
                                          "text-lg font-black text-primary",
                                        children: y.totalPoints,
                                      }),
                                    }),
                                  ],
                                },
                                y.userId,
                              );
                            }),
                          }),
                        ],
                      })
                    : l.jsxs("div", {
                        className: "py-20 text-center text-muted-foreground",
                        children: [
                          l.jsx(ht, {
                            className: "h-12 w-12 mx-auto mb-3 opacity-30",
                          }),
                          l.jsx("p", {
                            children: "No predictions yet in this arena.",
                          }),
                        ],
                      }),
              }),
            ],
          }),
      ],
    }),
  });
}
var bT = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  jT = bT.reduce((n, r) => {
    const i = ev(`Primitive.${r}`),
      c = j.forwardRef((d, f) => {
        const { asChild: h, ...x } = d,
          m = h ? i : r;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          l.jsx(m, { ...x, ref: f })
        );
      });
    return ((c.displayName = `Primitive.${r}`), { ...n, [r]: c });
  }, {}),
  NT = "Label",
  Ev = j.forwardRef((n, r) =>
    l.jsx(jT.label, {
      ...n,
      ref: r,
      onMouseDown: (i) => {
        i.target.closest("button, input, select, textarea") ||
          (n.onMouseDown?.(i),
          !i.defaultPrevented && i.detail > 1 && i.preventDefault());
      },
    }),
  );
Ev.displayName = NT;
var Tv = Ev;
const wT = $i(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ),
  Xs = j.forwardRef(({ className: n, ...r }, i) =>
    l.jsx(Tv, { ref: i, className: ze(wT(), n), ...r }),
  );
Xs.displayName = Tv.displayName;
function ST() {
  const [, n] = Ka(),
    [r, i] = j.useState("login"),
    [c, d] = j.useState(!1),
    [f, h] = j.useState(null),
    [x, m] = j.useState(!1),
    [p, v] = j.useState(!1),
    [y, N] = j.useState({ email: "", password: "", displayName: "" });
  function T(A) {
    return {
      value: y[A],
      onChange: (U) => N((z) => ({ ...z, [A]: U.target.value })),
    };
  }
  async function R(A) {
    (A.preventDefault(), h(null), d(!0));
    try {
      const U = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: y.email, password: y.password }),
        }),
        z = await U.json();
      if (!U.ok) {
        h(z.error ?? "Login failed. Please try again.");
        return;
      }
      const H =
        new URLSearchParams(window.location.search).get("returnTo") ?? "/";
      (n(H), (window.location.href = H));
    } catch {
      h("Network error. Please try again.");
    } finally {
      d(!1);
    }
  }
  async function S(A) {
    (A.preventDefault(), h(null), d(!0));
    try {
      const U = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: y.email,
            password: y.password,
            displayName: y.displayName,
          }),
        }),
        z = await U.json();
      if (!U.ok) {
        h(z.error ?? "Registration failed. Please try again.");
        return;
      }
      const H =
        new URLSearchParams(window.location.search).get("returnTo") ?? "/";
      window.location.href = H;
    } catch {
      h("Network error. Please try again.");
    } finally {
      d(!1);
    }
  }
  async function C(A) {
    (A.preventDefault(), h(null), d(!0));
    try {
      const U =
          new URLSearchParams(window.location.search).get("returnTo") ?? void 0,
        z = await fetch("/api/auth/magic-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: y.email,
            ...(U ? { returnTo: U } : {}),
          }),
        }),
        H = await z.json();
      if (!z.ok) {
        h(H.error ?? "Could not send email. Please try again.");
        return;
      }
      m(!0);
    } catch {
      h("Network error. Please try again.");
    } finally {
      d(!1);
    }
  }
  return l.jsx("div", {
    className:
      "min-h-screen bg-background flex items-center justify-center p-4",
    children: l.jsxs("div", {
      className: "w-full max-w-sm",
      children: [
        l.jsxs("div", {
          className: "text-center mb-8",
          children: [
            l.jsx("div", {
              className: "flex items-center justify-center gap-3 mb-2",
              children: l.jsx(ht, { className: "h-10 w-10 text-primary" }),
            }),
            l.jsx("h1", {
              className: "text-3xl font-bold tracking-tight text-foreground",
              children: "Football is Life",
            }),
            l.jsx("p", {
              className: "text-muted-foreground mt-1 text-sm",
              children: "FIFA World Cup 2026 Predictions",
            }),
          ],
        }),
        l.jsxs("div", {
          className: "bg-card border border-border rounded-xl p-6 shadow-lg",
          children: [
            l.jsxs("div", {
              className: "flex rounded-lg bg-muted p-1 mb-6",
              children: [
                l.jsx("button", {
                  className: `flex-1 text-sm font-medium py-1.5 rounded-md transition-colors ${r === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  onClick: () => {
                    (i("login"), h(null), m(!1));
                  },
                  children: "Sign In",
                }),
                l.jsx("button", {
                  className: `flex-1 text-sm font-medium py-1.5 rounded-md transition-colors ${r === "register" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
                  onClick: () => {
                    (i("register"), h(null), m(!1));
                  },
                  children: "Create Account",
                }),
              ],
            }),
            f &&
              l.jsx("div", {
                className:
                  "mb-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2",
                children: f,
              }),
            r === "login" &&
              l.jsxs("form", {
                onSubmit: R,
                className: "space-y-4",
                children: [
                  l.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      l.jsx(Xs, { htmlFor: "email", children: "Email" }),
                      l.jsxs("div", {
                        className: "relative",
                        children: [
                          l.jsx(Ru, {
                            className:
                              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                          }),
                          l.jsx(St, {
                            id: "email",
                            type: "email",
                            placeholder: "you@example.com",
                            className: "pl-9",
                            required: !0,
                            autoComplete: "email",
                            ...T("email"),
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      l.jsx(Xs, { htmlFor: "password", children: "Password" }),
                      l.jsxs("div", {
                        className: "relative",
                        children: [
                          l.jsx(xn, {
                            className:
                              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                          }),
                          l.jsx(St, {
                            id: "password",
                            type: p ? "text" : "password",
                            placeholder: "Your password",
                            className: "pl-9 pr-9",
                            required: !0,
                            autoComplete: "current-password",
                            ...T("password"),
                          }),
                          l.jsx("button", {
                            type: "button",
                            className:
                              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                            onClick: () => v((A) => !A),
                            children: p
                              ? l.jsx(xx, { className: "h-4 w-4" })
                              : l.jsx(gx, { className: "h-4 w-4" }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs(xe, {
                    type: "submit",
                    className: "w-full",
                    disabled: c,
                    children: [
                      c
                        ? l.jsx(st, { className: "h-4 w-4 animate-spin mr-2" })
                        : null,
                      "Sign In",
                    ],
                  }),
                  l.jsx("div", {
                    className: "text-center",
                    children: l.jsx("button", {
                      type: "button",
                      className:
                        "text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline",
                      onClick: () => {
                        (i("magic"), h(null));
                      },
                      children: "Sign in with email link instead",
                    }),
                  }),
                ],
              }),
            r === "register" &&
              l.jsxs("form", {
                onSubmit: S,
                className: "space-y-4",
                children: [
                  l.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      l.jsx(Xs, {
                        htmlFor: "displayName",
                        children: "Your Name",
                      }),
                      l.jsxs("div", {
                        className: "relative",
                        children: [
                          l.jsx(nw, {
                            className:
                              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                          }),
                          l.jsx(St, {
                            id: "displayName",
                            type: "text",
                            placeholder: "How you'll appear on leaderboards",
                            className: "pl-9",
                            required: !0,
                            minLength: 2,
                            maxLength: 50,
                            autoComplete: "name",
                            ...T("displayName"),
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      l.jsx(Xs, { htmlFor: "reg-email", children: "Email" }),
                      l.jsxs("div", {
                        className: "relative",
                        children: [
                          l.jsx(Ru, {
                            className:
                              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                          }),
                          l.jsx(St, {
                            id: "reg-email",
                            type: "email",
                            placeholder: "you@example.com",
                            className: "pl-9",
                            required: !0,
                            autoComplete: "email",
                            ...T("email"),
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      l.jsx(Xs, {
                        htmlFor: "reg-password",
                        children: "Password",
                      }),
                      l.jsxs("div", {
                        className: "relative",
                        children: [
                          l.jsx(xn, {
                            className:
                              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                          }),
                          l.jsx(St, {
                            id: "reg-password",
                            type: p ? "text" : "password",
                            placeholder: "At least 8 characters",
                            className: "pl-9 pr-9",
                            required: !0,
                            minLength: 8,
                            autoComplete: "new-password",
                            ...T("password"),
                          }),
                          l.jsx("button", {
                            type: "button",
                            className:
                              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                            onClick: () => v((A) => !A),
                            children: p
                              ? l.jsx(xx, { className: "h-4 w-4" })
                              : l.jsx(gx, { className: "h-4 w-4" }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  l.jsxs(xe, {
                    type: "submit",
                    className: "w-full",
                    disabled: c,
                    children: [
                      c
                        ? l.jsx(st, { className: "h-4 w-4 animate-spin mr-2" })
                        : null,
                      "Create Account",
                    ],
                  }),
                ],
              }),
            r === "magic" &&
              (x
                ? l.jsxs("div", {
                    className: "text-center py-4 space-y-3",
                    children: [
                      l.jsx("div", { className: "text-4xl", children: "📬" }),
                      l.jsx("p", {
                        className: "font-semibold",
                        children: "Check your inbox",
                      }),
                      l.jsxs("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                          "We sent a login link to ",
                          l.jsx("strong", { children: y.email }),
                          ". It expires in 15 minutes.",
                        ],
                      }),
                      l.jsx("button", {
                        className:
                          "text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline",
                        onClick: () => {
                          (m(!1), h(null));
                        },
                        children: "Try a different email",
                      }),
                    ],
                  })
                : l.jsxs("form", {
                    onSubmit: C,
                    className: "space-y-4",
                    children: [
                      l.jsx("p", {
                        className: "text-sm text-muted-foreground mb-2",
                        children:
                          "Enter your email and we'll send you a one-click login link.",
                      }),
                      l.jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          l.jsx(Xs, {
                            htmlFor: "magic-email",
                            children: "Email",
                          }),
                          l.jsxs("div", {
                            className: "relative",
                            children: [
                              l.jsx(Ru, {
                                className:
                                  "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground",
                              }),
                              l.jsx(St, {
                                id: "magic-email",
                                type: "email",
                                placeholder: "you@example.com",
                                className: "pl-9",
                                required: !0,
                                autoComplete: "email",
                                ...T("email"),
                              }),
                            ],
                          }),
                        ],
                      }),
                      l.jsxs(xe, {
                        type: "submit",
                        className: "w-full",
                        disabled: c,
                        children: [
                          c
                            ? l.jsx(st, {
                                className: "h-4 w-4 animate-spin mr-2",
                              })
                            : null,
                          "Send Login Link",
                        ],
                      }),
                      l.jsx("div", {
                        className: "text-center",
                        children: l.jsx("button", {
                          type: "button",
                          className:
                            "text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline",
                          onClick: () => {
                            (i("login"), h(null));
                          },
                          children: "Back to password sign in",
                        }),
                      }),
                    ],
                  })),
          ],
        }),
        l.jsx("p", {
          className: "text-center text-xs text-muted-foreground mt-6",
          children:
            "Predictions lock when each round begins. Make yours early!",
        }),
      ],
    }),
  });
}
async function ET() {
  const n = await fetch("/api/arenas", { credentials: "include" });
  if (!n.ok) throw new Error("Failed to load arenas");
  return n.json();
}
function TT() {
  const { user: n, isAuthenticated: r, isLoading: i } = Wt(),
    [, c] = Ka(),
    { data: d, isLoading: f } = at({ queryKey: ["arenas"], queryFn: ET });
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            l.jsxs("div", {
              children: [
                l.jsx("h1", {
                  className: "text-3xl font-bold tracking-tight",
                  children: "Arenas",
                }),
                l.jsx("p", {
                  className: "text-muted-foreground mt-1",
                  children: "Private groups competing on their own leaderboard",
                }),
              ],
            }),
            !i &&
              n?.isAdmin &&
              l.jsx(xe, {
                asChild: !0,
                children: l.jsxs(Xe, {
                  href: "/admin",
                  children: [
                    l.jsx(yn, { className: "h-4 w-4 mr-2" }),
                    "Admin Panel",
                  ],
                }),
              }),
          ],
        }),
        f
          ? l.jsx("div", {
              className: "flex items-center justify-center py-16",
              children: l.jsx(st, {
                className: "h-8 w-8 animate-spin text-muted-foreground",
              }),
            })
          : !d || d.length === 0
            ? l.jsx(Ae, {
                children: l.jsxs(Oe, {
                  className: "py-12 text-center text-muted-foreground",
                  children: [
                    l.jsx(ht, {
                      className: "h-10 w-10 mx-auto mb-3 opacity-40",
                    }),
                    l.jsx("p", {
                      className: "font-medium",
                      children: "No arenas yet",
                    }),
                    l.jsx("p", {
                      className: "text-sm mt-1",
                      children:
                        "Arenas are created by the admin. Use an invite link to join one.",
                    }),
                  ],
                }),
              })
            : l.jsx("div", {
                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                children: d.map((h) =>
                  l.jsxs(
                    Ae,
                    {
                      className: "hover:border-primary/50 transition-colors",
                      children: [
                        l.jsx(ws, {
                          className: "pb-3",
                          children: l.jsxs(Ss, {
                            className: "text-lg flex items-center gap-2",
                            children: [
                              l.jsx(ht, {
                                className: "h-5 w-5 text-primary shrink-0",
                              }),
                              h.name,
                            ],
                          }),
                        }),
                        l.jsxs(Oe, {
                          className: "space-y-4",
                          children: [
                            l.jsxs("div", {
                              className:
                                "flex items-center gap-2 text-sm text-muted-foreground",
                              children: [
                                l.jsx(il, { className: "h-4 w-4" }),
                                l.jsxs("span", {
                                  children: [
                                    h.memberCount,
                                    " ",
                                    h.memberCount === 1 ? "member" : "members",
                                  ],
                                }),
                                h.isMember &&
                                  l.jsx(an, {
                                    variant: "secondary",
                                    className: "ml-auto text-xs",
                                    children: "Joined",
                                  }),
                              ],
                            }),
                            h.isMember
                              ? l.jsx(xe, {
                                  className: "w-full",
                                  asChild: !0,
                                  children: l.jsxs(Xe, {
                                    href: `/arenas/${h.id}`,
                                    children: [
                                      l.jsx(ht, { className: "h-4 w-4 mr-2" }),
                                      "View Leaderboard",
                                    ],
                                  }),
                                })
                              : r
                                ? l.jsxs("div", {
                                    className:
                                      "flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-3 py-2",
                                    children: [
                                      l.jsx(xn, {
                                        className: "h-4 w-4 shrink-0",
                                      }),
                                      l.jsx("span", {
                                        children:
                                          "You need an invite link to join",
                                      }),
                                    ],
                                  })
                                : l.jsx(xe, {
                                    variant: "outline",
                                    className: "w-full",
                                    onClick: () => c("/login"),
                                    children: "Sign in to join",
                                  }),
                            n?.isAdmin &&
                              l.jsx(xe, {
                                variant: "ghost",
                                size: "sm",
                                className: "w-full text-xs",
                                asChild: !0,
                                children: l.jsx(Xe, {
                                  href: `/admin?arena=${h.id}`,
                                  children: "Manage in Admin Panel",
                                }),
                              }),
                          ],
                        }),
                      ],
                    },
                    h.id,
                  ),
                ),
              }),
        !r &&
          !i &&
          l.jsx(Ae, {
            className: "border-dashed",
            children: l.jsx(Oe, {
              className: "py-6 text-center text-muted-foreground text-sm",
              children: l.jsxs("p", {
                children: [
                  "Have an invite link? ",
                  l.jsx("button", {
                    className: "text-primary underline",
                    onClick: () => c("/login"),
                    children: "Sign in",
                  }),
                  " to join an arena.",
                ],
              }),
            }),
          }),
      ],
    }),
  });
}
async function AT(n) {
  const r = await fetch(`/api/arenas/${n}`, { credentials: "include" });
  if (!r.ok) throw new Error("Failed to load arena");
  return r.json();
}
async function RT(n) {
  const r = await fetch(`/api/arenas/${n}/leaderboard`, {
    credentials: "include",
  });
  if (!r.ok) throw new Error("Failed to load leaderboard");
  return r.json();
}
async function CT(n) {
  const r = await fetch(`/api/arenas/${n}/regenerate-invite`, {
    method: "POST",
    credentials: "include",
  });
  if (!r.ok) throw new Error("Failed to regenerate invite");
  return r.json();
}
function OT(n) {
  const r = "/".replace(/\/$/, "");
  return `${window.location.origin}${r}/join/${n}`;
}
function MT(n) {
  return n === 1
    ? l.jsx(Cu, { className: "h-5 w-5 text-yellow-400" })
    : n === 2
      ? l.jsx(Cu, { className: "h-5 w-5 text-slate-400" })
      : n === 3
        ? l.jsx(Cu, { className: "h-5 w-5 text-amber-600" })
        : l.jsx("span", {
            className:
              "text-sm font-bold text-muted-foreground w-5 text-center",
            children: n,
          });
}
function _T() {
  const [, n] = id("/arenas/:id"),
    r = n ? parseInt(n.id) : NaN,
    { user: i } = Wt(),
    { toast: c } = Es(),
    d = vn(),
    {
      data: f,
      isLoading: h,
      error: x,
    } = at({
      queryKey: ["arena", r],
      queryFn: () => AT(r),
      enabled: !isNaN(r),
    }),
    {
      data: m,
      isLoading: p,
      error: v,
    } = at({
      queryKey: ["arena-leaderboard", r],
      queryFn: () => RT(r),
      enabled: !isNaN(r) && (!!f?.isMember || !!i?.isAdmin),
      refetchInterval: 6e4,
    }),
    y = qn({
      mutationFn: () => CT(r),
      onSuccess: () => {
        (d.invalidateQueries({ queryKey: ["arena", r] }),
          c({
            title: "Invite link regenerated",
            description: "The old link is now invalid.",
          }));
      },
      onError: () => {
        c({
          title: "Error",
          description: "Failed to regenerate invite link.",
          variant: "destructive",
        });
      },
    });
  if (isNaN(r) || x)
    return l.jsx(ct, {
      children: l.jsx("div", {
        className: "text-center py-16 text-muted-foreground",
        children: "Arena not found.",
      }),
    });
  if (h)
    return l.jsx(ct, {
      children: l.jsx("div", {
        className: "flex items-center justify-center py-16",
        children: l.jsx(st, {
          className: "h-8 w-8 animate-spin text-muted-foreground",
        }),
      }),
    });
  const N = f?.isMember || i?.isAdmin,
    T = f?.inviteCode ? OT(f.inviteCode) : null;
  function R() {
    T &&
      (navigator.clipboard.writeText(T),
      c({
        title: "Invite link copied!",
        description: "Share it via WhatsApp, group text, etc.",
      }));
  }
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsx("div", {
          className: "flex items-center gap-3",
          children: l.jsx(xe, {
            variant: "ghost",
            size: "sm",
            asChild: !0,
            children: l.jsxs(Xe, {
              href: "/arenas",
              children: [l.jsx(Qg, { className: "h-4 w-4 mr-1" }), "Arenas"],
            }),
          }),
        }),
        l.jsx("div", {
          className: "flex items-center justify-between",
          children: l.jsxs("div", {
            children: [
              l.jsxs("h1", {
                className:
                  "text-3xl font-bold tracking-tight flex items-center gap-3",
                children: [
                  l.jsx(ht, { className: "h-8 w-8 text-primary" }),
                  f?.name,
                ],
              }),
              l.jsxs("div", {
                className:
                  "flex items-center gap-2 mt-1 text-muted-foreground text-sm",
                children: [
                  l.jsx(il, { className: "h-4 w-4" }),
                  l.jsxs("span", {
                    children: [
                      f?.memberCount,
                      " ",
                      f?.memberCount === 1 ? "member" : "members",
                    ],
                  }),
                  f?.isMember &&
                    l.jsx(an, {
                      variant: "secondary",
                      children: "You're a member",
                    }),
                ],
              }),
            ],
          }),
        }),
        T &&
          i?.isAdmin &&
          l.jsx(Ae, {
            className: "border-primary/20 bg-primary/5",
            children: l.jsxs(Oe, {
              className: "py-4",
              children: [
                l.jsx("p", {
                  className:
                    "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider",
                  children: "Invite Link (Admin only)",
                }),
                l.jsxs("div", {
                  className: "flex gap-2",
                  children: [
                    l.jsx("code", {
                      className:
                        "flex-1 text-xs bg-background border rounded px-3 py-2 truncate font-mono",
                      children: T,
                    }),
                    l.jsx(xe, {
                      size: "sm",
                      variant: "outline",
                      onClick: R,
                      children: l.jsx(Kg, { className: "h-4 w-4" }),
                    }),
                    l.jsx(xe, {
                      size: "sm",
                      variant: "outline",
                      onClick: () => y.mutate(),
                      disabled: y.isPending,
                      children: l.jsx(Sd, {
                        className: `h-4 w-4 ${y.isPending ? "animate-spin" : ""}`,
                      }),
                    }),
                  ],
                }),
                l.jsx("p", {
                  className: "text-xs text-muted-foreground mt-2",
                  children:
                    "Regenerate to invalidate the current link and create a new one.",
                }),
              ],
            }),
          }),
        N
          ? p
            ? l.jsx("div", {
                className: "flex items-center justify-center py-16",
                children: l.jsx(st, {
                  className: "h-8 w-8 animate-spin text-muted-foreground",
                }),
              })
            : v
              ? l.jsx(Ae, {
                  children: l.jsx(Oe, {
                    className: "py-8 text-center text-destructive",
                    children: "Failed to load leaderboard.",
                  }),
                })
              : !m || m.length === 0
                ? l.jsx(Ae, {
                    children: l.jsxs(Oe, {
                      className: "py-12 text-center text-muted-foreground",
                      children: [
                        l.jsx(ht, {
                          className: "h-10 w-10 mx-auto mb-3 opacity-40",
                        }),
                        l.jsx("p", {
                          className: "font-medium",
                          children: "No members yet",
                        }),
                        l.jsx("p", {
                          className: "text-sm mt-1",
                          children:
                            "Share the invite link to get people competing.",
                        }),
                      ],
                    }),
                  })
                : l.jsxs(Ae, {
                    children: [
                      l.jsx(ws, {
                        children: l.jsx(Ss, { children: "Leaderboard" }),
                      }),
                      l.jsx(Oe, {
                        className: "p-0",
                        children: l.jsxs(Js, {
                          children: [
                            l.jsx(Is, {
                              children: l.jsxs(qt, {
                                children: [
                                  l.jsx(Se, {
                                    className: "w-12 text-center",
                                    children: "#",
                                  }),
                                  l.jsx(Se, { children: "Player" }),
                                  l.jsx(Se, {
                                    className:
                                      "text-right hidden sm:table-cell",
                                    children: "Group Stage",
                                  }),
                                  l.jsx(Se, {
                                    className:
                                      "text-right hidden sm:table-cell",
                                    children: "Knockout",
                                  }),
                                  l.jsx(Se, {
                                    className:
                                      "text-right hidden md:table-cell",
                                    children: "Exact",
                                  }),
                                  l.jsx(Se, {
                                    className:
                                      "text-right font-bold text-primary",
                                    children: "Points",
                                  }),
                                ],
                              }),
                            }),
                            l.jsx(Ws, {
                              children: m.map((S) => {
                                const C = S.userId === i?.id;
                                return l.jsxs(
                                  qt,
                                  {
                                    className: C ? "bg-primary/5" : "",
                                    children: [
                                      l.jsx(Ee, {
                                        className: "text-center",
                                        children: l.jsx("div", {
                                          className: "flex justify-center",
                                          children: MT(S.rank),
                                        }),
                                      }),
                                      l.jsx(Ee, {
                                        children: l.jsxs(Xe, {
                                          href: `/arenas/${r}/players/${S.userId}`,
                                          className:
                                            "flex items-center gap-2 hover:text-primary transition-colors",
                                          children: [
                                            l.jsx("div", {
                                              className:
                                                "h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm overflow-hidden shrink-0",
                                              children: S.profileImage
                                                ? l.jsx("img", {
                                                    src: S.profileImage,
                                                    alt: S.username,
                                                    className:
                                                      "h-full w-full object-cover",
                                                  })
                                                : l.jsx("span", {
                                                    children: S.username
                                                      .charAt(0)
                                                      .toUpperCase(),
                                                  }),
                                            }),
                                            l.jsxs("span", {
                                              className:
                                                "font-medium truncate max-w-[120px] sm:max-w-none",
                                              children: [
                                                S.username,
                                                C &&
                                                  l.jsx("span", {
                                                    className:
                                                      "text-primary ml-1 text-xs",
                                                    children: "(you)",
                                                  }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      }),
                                      l.jsx(Ee, {
                                        className:
                                          "text-right hidden sm:table-cell text-muted-foreground",
                                        children: S.groupStagePoints,
                                      }),
                                      l.jsx(Ee, {
                                        className:
                                          "text-right hidden sm:table-cell text-muted-foreground",
                                        children: S.knockoutPoints,
                                      }),
                                      l.jsx(Ee, {
                                        className:
                                          "text-right hidden md:table-cell text-muted-foreground",
                                        children: S.exactScores,
                                      }),
                                      l.jsx(Ee, {
                                        className:
                                          "text-right font-bold text-primary",
                                        children: S.totalPoints,
                                      }),
                                    ],
                                  },
                                  S.userId,
                                );
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  })
          : l.jsx(Ae, {
              children: l.jsxs(Oe, {
                className: "py-12 text-center text-muted-foreground",
                children: [
                  l.jsx(xn, { className: "h-10 w-10 mx-auto mb-3 opacity-40" }),
                  l.jsx("p", {
                    className: "font-medium",
                    children: "Members only",
                  }),
                  l.jsx("p", {
                    className: "text-sm mt-1",
                    children:
                      "You need an invite link to join this arena and view the leaderboard.",
                  }),
                ],
              }),
            }),
      ],
    }),
  });
}
function kT() {
  const [, n] = id("/join/:code"),
    r = n?.code ?? "",
    { isAuthenticated: i, isLoading: c } = Wt(),
    [, d] = Ka(),
    [f, h] = j.useState("loading"),
    [x, m] = j.useState(""),
    [p, v] = j.useState(null),
    [y, N] = j.useState("");
  return (
    j.useEffect(() => {
      if (!c) {
        if (!i) {
          h("redirecting-login");
          const T = `${"/".replace(/\/$/, "")}/join/${r}`;
          window.location.href = `/login?returnTo=${encodeURIComponent(T)}`;
          return;
        }
        (h("joining"),
          fetch(`/api/arenas/join/${r}`, {
            method: "POST",
            credentials: "include",
          })
            .then(async (T) => {
              if (!T.ok) {
                const R = await T.json().catch(() => ({}));
                throw new Error(R.error ?? "Invalid invite code");
              }
              return T.json();
            })
            .then((T) => {
              (m(T.arenaName),
                v(T.arenaId),
                h("success"),
                setTimeout(() => d(`/arenas/${T.arenaId}`), 2e3));
            })
            .catch((T) => {
              (N(T.message ?? "Something went wrong"), h("error"));
            }));
      }
    }, [c, i, r]),
    l.jsx(ct, {
      children: l.jsx("div", {
        className: "flex items-center justify-center min-h-[60vh]",
        children: l.jsx(Ae, {
          className: "w-full max-w-md",
          children: l.jsxs(Oe, {
            className: "py-12 text-center space-y-4",
            children: [
              (f === "loading" ||
                f === "redirecting-login" ||
                f === "joining") &&
                l.jsxs(l.Fragment, {
                  children: [
                    l.jsx(st, {
                      className: "h-12 w-12 animate-spin text-primary mx-auto",
                    }),
                    l.jsx("p", {
                      className: "text-lg font-medium",
                      children:
                        f === "joining"
                          ? "Joining arena…"
                          : "Setting things up…",
                    }),
                  ],
                }),
              f === "success" &&
                l.jsxs(l.Fragment, {
                  children: [
                    l.jsx(bs, {
                      className: "h-12 w-12 text-green-500 mx-auto",
                    }),
                    l.jsxs("div", {
                      children: [
                        l.jsx("p", {
                          className: "text-lg font-bold",
                          children: "You're in!",
                        }),
                        l.jsxs("p", {
                          className: "text-muted-foreground text-sm mt-1",
                          children: [
                            "Welcome to ",
                            l.jsx("span", {
                              className: "text-primary font-medium",
                              children: x,
                            }),
                          ],
                        }),
                        l.jsx("p", {
                          className: "text-xs text-muted-foreground mt-3",
                          children: "Redirecting to arena…",
                        }),
                      ],
                    }),
                    l.jsxs(xe, {
                      onClick: () => p && d(`/arenas/${p}`),
                      children: [
                        l.jsx(ht, { className: "h-4 w-4 mr-2" }),
                        "Go to Arena",
                      ],
                    }),
                  ],
                }),
              f === "error" &&
                l.jsxs(l.Fragment, {
                  children: [
                    l.jsx(rl, {
                      className: "h-12 w-12 text-destructive mx-auto",
                    }),
                    l.jsxs("div", {
                      children: [
                        l.jsx("p", {
                          className: "text-lg font-bold",
                          children: "Couldn't join",
                        }),
                        l.jsx("p", {
                          className: "text-muted-foreground text-sm mt-1",
                          children: y,
                        }),
                      ],
                    }),
                    l.jsx(xe, {
                      variant: "outline",
                      onClick: () => d("/arenas"),
                      children: "View All Arenas",
                    }),
                  ],
                }),
            ],
          }),
        }),
      }),
    })
  );
}
async function DT(n, r) {
  const i = await fetch(`/api/arenas/${n}/members/${r}/predictions`, {
    credentials: "include",
  });
  if (!i.ok) throw new Error("Failed to load predictions");
  return i.json();
}
function zT(n) {
  return (
    {
      group: "Group Stage",
      round_of_32: "Round of 32",
      round_of_16: "Round of 16",
      quarter_final: "Quarter-Final",
      semi_final: "Semi-Final",
      final: "Final",
    }[n] ?? n
  );
}
function LT(n) {
  return n.points === null
    ? null
    : n.points === 0
      ? l.jsx(an, {
          variant: "outline",
          className: "text-xs border-destructive/40 text-destructive",
          children: "Miss",
        })
      : n.matchHomeScore !== null &&
          n.matchAwayScore !== null &&
          n.homeScore === n.matchHomeScore &&
          n.awayScore === n.matchAwayScore
        ? l.jsxs(an, {
            className:
              "text-xs bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
            children: ["Exact +", n.points, "pts"],
          })
        : l.jsxs(an, {
            className:
              "text-xs bg-green-500/20 text-green-600 border-green-500/30",
            children: ["Correct +", n.points, "pts"],
          });
}
function UT() {
  const [, n] = id("/arenas/:arenaId/players/:userId"),
    r = n ? parseInt(n.arenaId) : NaN,
    i = n?.userId ?? "",
    { user: c } = Wt(),
    {
      data: d,
      isLoading: f,
      error: h,
    } = at({
      queryKey: ["arena-member-predictions", r, i],
      queryFn: () => DT(r, i),
      enabled: !isNaN(r) && !!i,
    });
  if (isNaN(r) || h)
    return l.jsx(ct, {
      children: l.jsx("div", {
        className: "text-center py-16 text-muted-foreground",
        children: "Predictions not found or you don't have access.",
      }),
    });
  const x =
      d?.predictions.reduce((v, y) => {
        const N = y.matchStage;
        return (v[N] || (v[N] = []), v[N].push(y), v);
      }, {}) ?? {},
    m = d?.predictions.reduce((v, y) => v + (y.points ?? 0), 0) ?? 0,
    p =
      d?.predictions.filter(
        (v) =>
          v.matchHomeScore !== null &&
          v.matchAwayScore !== null &&
          v.homeScore === v.matchHomeScore &&
          v.awayScore === v.matchAwayScore,
      ).length ?? 0;
  return l.jsx(ct, {
    children: l.jsxs("div", {
      className: "space-y-6",
      children: [
        l.jsx("div", {
          children: l.jsx(xe, {
            variant: "ghost",
            size: "sm",
            asChild: !0,
            children: l.jsxs(Xe, {
              href: `/arenas/${r}`,
              children: [
                l.jsx(Qg, { className: "h-4 w-4 mr-1" }),
                "Back to Arena",
              ],
            }),
          }),
        }),
        f
          ? l.jsx("div", {
              className: "flex items-center justify-center py-16",
              children: l.jsx(st, {
                className: "h-8 w-8 animate-spin text-muted-foreground",
              }),
            })
          : d
            ? l.jsxs(l.Fragment, {
                children: [
                  l.jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [
                      l.jsx("div", {
                        className:
                          "h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl overflow-hidden shrink-0",
                        children: d.user.profileImage
                          ? l.jsx("img", {
                              src: d.user.profileImage,
                              alt: d.user.username,
                              className: "h-full w-full object-cover",
                            })
                          : l.jsx("span", {
                              children: d.user.username.charAt(0).toUpperCase(),
                            }),
                      }),
                      l.jsxs("div", {
                        children: [
                          l.jsxs("h1", {
                            className: "text-2xl font-bold",
                            children: [
                              d.user.username,
                              d.user.id === c?.id &&
                                l.jsx("span", {
                                  className:
                                    "text-primary text-base font-normal ml-2",
                                  children: "(you)",
                                }),
                            ],
                          }),
                          l.jsxs("div", {
                            className:
                              "flex gap-4 text-sm text-muted-foreground mt-1",
                            children: [
                              l.jsxs("span", {
                                className: "font-medium text-primary",
                                children: [m, " points"],
                              }),
                              l.jsxs("span", {
                                children: [p, " exact scores"],
                              }),
                              l.jsxs("span", {
                                children: [
                                  d.predictions.filter((v) => v.points !== null)
                                    .length,
                                  " scored",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object.entries(x).map(([v, y]) =>
                    l.jsxs(
                      Ae,
                      {
                        children: [
                          l.jsx(ws, {
                            className: "pb-3",
                            children: l.jsx(Ss, {
                              className: "text-base",
                              children: zT(v),
                            }),
                          }),
                          l.jsx(Oe, {
                            className: "space-y-2",
                            children: y.map((N) =>
                              l.jsxs(
                                "div",
                                {
                                  className:
                                    "flex items-center justify-between py-2 border-b last:border-0",
                                  children: [
                                    l.jsxs("div", {
                                      className: "flex items-center gap-3",
                                      children: [
                                        l.jsx(Un, {
                                          className:
                                            "h-4 w-4 text-muted-foreground shrink-0",
                                        }),
                                        l.jsxs("div", {
                                          children: [
                                            l.jsxs("p", {
                                              className:
                                                "text-sm font-mono font-medium",
                                              children: [
                                                N.homeScore,
                                                " – ",
                                                N.awayScore,
                                              ],
                                            }),
                                            N.matchHomeScore !== null &&
                                              N.matchAwayScore !== null &&
                                              l.jsxs("p", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: [
                                                  "Result: ",
                                                  N.matchHomeScore,
                                                  " – ",
                                                  N.matchAwayScore,
                                                ],
                                              }),
                                            N.matchStatus === "scheduled" &&
                                              l.jsx("p", {
                                                className:
                                                  "text-xs text-muted-foreground",
                                                children: new Date(
                                                  N.matchScheduledAt,
                                                ).toLocaleDateString(void 0, {
                                                  month: "short",
                                                  day: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                }),
                                              }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    l.jsx("div", { children: LT(N) }),
                                  ],
                                },
                                N.id,
                              ),
                            ),
                          }),
                        ],
                      },
                      v,
                    ),
                  ),
                  d.predictions.length === 0 &&
                    l.jsx(Ae, {
                      children: l.jsxs(Oe, {
                        className: "py-12 text-center text-muted-foreground",
                        children: [
                          l.jsx(Un, {
                            className: "h-10 w-10 mx-auto mb-3 opacity-40",
                          }),
                          l.jsx("p", { children: "No predictions yet" }),
                        ],
                      }),
                    }),
                ],
              })
            : null,
      ],
    }),
  });
}
async function Ht(n, r) {
  const i = await fetch(n, { credentials: "include", ...r });
  if (!i.ok) {
    const c = await i.json().catch(() => ({}));
    throw new Error(c.error ?? `Request failed (${i.status})`);
  }
  return i.json();
}
function qT(n) {
  const r = "/".replace(/\/$/, "");
  return `${window.location.origin}${r}/join/${n}`;
}
const HT = [
    "group_stage_1",
    "group_stage_2",
    "round_of_32",
    "round_of_16",
    "quarterfinals",
    "semifinals",
    "final",
  ],
  BT = {
    group_stage: "Group Stage",
    group_stage_1: "Group Stage – MD1",
    group_stage_2: "Group Stage – MD2&3",
    round_of_32: "Round of 32",
    round_of_16: "Round of 16",
    quarterfinals: "Quarterfinals",
    semifinals: "Semifinals",
    final: "Final",
  };
function GT({ match: n, onSaved: r }) {
  const { toast: i } = Es(),
    [c, d] = j.useState(n.homeScore?.toString() ?? ""),
    [f, h] = j.useState(n.awayScore?.toString() ?? ""),
    x = qn({
      mutationFn: () =>
        Ht(`/api/admin/matches/${n.id}/result`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            homeScore: parseInt(c),
            awayScore: parseInt(f),
          }),
        }),
      onSuccess: (T) => {
        (i({
          title: "Result saved",
          description: `${T.predsUpdated} predictions updated.`,
        }),
          r());
      },
      onError: (T) =>
        i({ title: "Error", description: T.message, variant: "destructive" }),
    }),
    m = qn({
      mutationFn: (T) =>
        Ht(`/api/admin/matches/${n.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: T }),
        }),
      onSuccess: (T, R) => {
        (i({ title: `Match marked as ${R}` }), r());
      },
      onError: (T) =>
        i({ title: "Error", description: T.message, variant: "destructive" }),
    }),
    p = Gt(n.homeTeam?.code),
    v = Gt(n.awayTeam?.code),
    y = x.isPending || m.isPending,
    N =
      n.status === "completed"
        ? "bg-green-500/15 text-green-400 border-green-500/20"
        : n.status === "live"
          ? "bg-red-500/15 text-red-400 border-red-500/20"
          : "bg-muted text-muted-foreground border-border";
  return l.jsxs(qt, {
    children: [
      l.jsxs(Ee, {
        children: [
          l.jsxs("div", {
            className: "flex items-center gap-2 min-w-0",
            children: [
              p
                ? l.jsx("img", {
                    src: p,
                    alt: n.homeTeam?.code,
                    className: "h-4 w-6 object-cover rounded-sm shrink-0",
                  })
                : l.jsx("span", { children: n.homeTeam?.flagEmoji }),
              l.jsx("span", {
                className: "font-bold text-sm",
                children: n.homeTeam?.code ?? "TBD",
              }),
              l.jsx("span", {
                className: "text-muted-foreground text-xs",
                children: "vs",
              }),
              l.jsx("span", {
                className: "font-bold text-sm",
                children: n.awayTeam?.code ?? "TBD",
              }),
              v
                ? l.jsx("img", {
                    src: v,
                    alt: n.awayTeam?.code,
                    className: "h-4 w-6 object-cover rounded-sm shrink-0",
                  })
                : l.jsx("span", { children: n.awayTeam?.flagEmoji }),
            ],
          }),
          l.jsx("p", {
            className: "text-xs text-muted-foreground mt-0.5",
            children: new Date(n.scheduledAt).toLocaleDateString(void 0, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          }),
        ],
      }),
      l.jsx(Ee, {
        children: l.jsxs("span", {
          className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${N}`,
          children: [
            n.status === "live" && l.jsx(yx, { className: "h-3 w-3" }),
            n.status === "completed" && l.jsx(bs, { className: "h-3 w-3" }),
            n.status,
          ],
        }),
      }),
      l.jsx(Ee, {
        children: l.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            l.jsx(St, {
              type: "number",
              min: 0,
              max: 20,
              value: c,
              onChange: (T) => d(T.target.value),
              className: "w-14 h-8 text-center text-sm p-1",
              placeholder: "0",
              disabled: y,
            }),
            l.jsx("span", {
              className: "text-muted-foreground font-bold",
              children: "–",
            }),
            l.jsx(St, {
              type: "number",
              min: 0,
              max: 20,
              value: f,
              onChange: (T) => h(T.target.value),
              className: "w-14 h-8 text-center text-sm p-1",
              placeholder: "0",
              disabled: y,
            }),
            l.jsxs(xe, {
              size: "sm",
              className: "h-8 px-3 gap-1",
              disabled:
                y ||
                c === "" ||
                f === "" ||
                isNaN(parseInt(c)) ||
                isNaN(parseInt(f)),
              onClick: () => x.mutate(),
              children: [
                x.isPending
                  ? l.jsx(st, { className: "h-3.5 w-3.5 animate-spin" })
                  : l.jsx(VN, { className: "h-3.5 w-3.5" }),
                "Save",
              ],
            }),
          ],
        }),
      }),
      l.jsx(Ee, {
        children: l.jsxs("div", {
          className: "flex gap-1",
          children: [
            n.status !== "live" &&
              l.jsxs(xe, {
                size: "sm",
                variant: "outline",
                className: "h-8 px-2 text-xs gap-1",
                disabled: y,
                onClick: () => m.mutate("live"),
                children: [
                  l.jsx(yx, { className: "h-3 w-3 text-red-400" }),
                  " Live",
                ],
              }),
            n.status !== "scheduled" &&
              l.jsxs(xe, {
                size: "sm",
                variant: "outline",
                className: "h-8 px-2 text-xs gap-1",
                disabled: y,
                onClick: () => m.mutate("scheduled"),
                children: [l.jsx($u, { className: "h-3 w-3" }), " Reopen"],
              }),
          ],
        }),
      }),
    ],
  });
}
function QT() {
  const n = vn(),
    [r, i] = j.useState("group_stage_1"),
    { data: c, isLoading: d } = at({
      queryKey: ["admin-matches"],
      queryFn: () => Ht("/api/matches"),
    }),
    { data: f } = at({
      queryKey: ["rounds"],
      queryFn: () => Ht("/api/rounds"),
    }),
    h = (c ?? []).filter((m) =>
      r === "group_stage_1"
        ? m.stage === "group_stage" && m.matchDay === 1
        : r === "group_stage_2"
          ? m.stage === "group_stage" && (m.matchDay ?? 0) >= 2
          : m.stage === r,
    ),
    x = () => {
      (n.invalidateQueries({ queryKey: ["admin-matches"] }),
        n.invalidateQueries({ queryKey: ["rounds"] }));
    };
  return l.jsxs("section", {
    className: "space-y-4",
    children: [
      l.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          l.jsxs("h2", {
            className: "text-xl font-semibold flex items-center gap-2",
            children: [
              l.jsx(bs, { className: "h-5 w-5 text-primary" }),
              " Match Results",
            ],
          }),
          l.jsxs(xe, {
            size: "sm",
            variant: "outline",
            onClick: x,
            className: "gap-1.5",
            children: [l.jsx(Sd, { className: "h-3.5 w-3.5" }), " Refresh"],
          }),
        ],
      }),
      l.jsx("div", {
        className: "flex flex-wrap gap-2",
        children: HT.map((m) => {
          const p = f?.find((v) => v.round === m);
          return l.jsxs(
            "button",
            {
              onClick: () => i(m),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${r === m ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:text-foreground"}`,
              children: [
                BT[m] ?? m,
                p?.isLocked &&
                  l.jsx(xn, { className: "inline h-3 w-3 ml-1 opacity-60" }),
              ],
            },
            m,
          );
        }),
      }),
      d
        ? l.jsxs("div", {
            className: "flex items-center gap-2 text-muted-foreground py-8",
            children: [
              l.jsx(st, { className: "h-5 w-5 animate-spin" }),
              " Loading matches…",
            ],
          })
        : h.length === 0
          ? l.jsx(Ae, {
              children: l.jsx(Oe, {
                className: "py-8 text-center text-sm text-muted-foreground",
                children: "No matches in this round yet.",
              }),
            })
          : l.jsx(Ae, {
              children: l.jsxs(Js, {
                children: [
                  l.jsx(Is, {
                    children: l.jsxs(qt, {
                      children: [
                        l.jsx(Se, { children: "Match" }),
                        l.jsx(Se, { children: "Status" }),
                        l.jsx(Se, { children: "Score" }),
                        l.jsx(Se, { children: "Actions" }),
                      ],
                    }),
                  }),
                  l.jsx(Ws, {
                    children: h.map((m) =>
                      l.jsx(GT, { match: m, onSaved: x }, m.id),
                    ),
                  }),
                ],
              }),
            }),
    ],
  });
}
function PT() {
  const n = vn(),
    { toast: r } = Es(),
    { data: i, isLoading: c } = at({
      queryKey: ["rounds"],
      queryFn: () => Ht("/api/rounds"),
    }),
    { data: d } = at({
      queryKey: ["admin-matches"],
      queryFn: () => Ht("/api/matches"),
    }),
    f = () => {
      (n.invalidateQueries({ queryKey: ["rounds"] }),
        n.invalidateQueries({ queryKey: ["admin-matches"] }));
    },
    h = qn({
      mutationFn: async ({ roundSlug: x, lock: m }) => {
        const p = (d ?? []).filter((y) =>
            x === "group_stage_1"
              ? y.stage === "group_stage" && y.matchDay === 1
              : x === "group_stage_2"
                ? y.stage === "group_stage" && (y.matchDay ?? 0) >= 2
                : y.stage === x,
          ),
          v = m ? "live" : "scheduled";
        for (const y of p)
          await Ht(`/api/admin/matches/${y.id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: v }),
          });
      },
      onSuccess: (x, { lock: m }) => {
        (r({
          title: m
            ? "Round locked — predictions closed"
            : "Round unlocked — predictions open",
        }),
          f());
      },
      onError: (x) =>
        r({ title: "Error", description: x.message, variant: "destructive" }),
    });
  return l.jsxs("section", {
    className: "space-y-4",
    children: [
      l.jsxs("h2", {
        className: "text-xl font-semibold flex items-center gap-2",
        children: [
          l.jsx(xn, { className: "h-5 w-5 text-primary" }),
          " Round Management",
        ],
      }),
      l.jsx("p", {
        className: "text-sm text-muted-foreground",
        children:
          "Locking a round closes all predictions for it. Unlocking reopens them (e.g. if a match was postponed).",
      }),
      c
        ? l.jsxs("div", {
            className: "flex items-center gap-2 text-muted-foreground py-4",
            children: [
              l.jsx(st, { className: "h-5 w-5 animate-spin" }),
              " Loading rounds…",
            ],
          })
        : l.jsx("div", {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3",
            children: i?.map((x) =>
              l.jsx(
                Ae,
                {
                  className: x.isLocked
                    ? "border-red-500/20 bg-red-500/5"
                    : "border-green-500/20 bg-green-500/5",
                  children: l.jsxs(Oe, {
                    className: "p-4 flex items-center justify-between gap-3",
                    children: [
                      l.jsxs("div", {
                        className: "min-w-0",
                        children: [
                          l.jsx("p", {
                            className: "font-semibold text-sm truncate",
                            children: x.label,
                          }),
                          l.jsxs("p", {
                            className: "text-xs text-muted-foreground mt-0.5",
                            children: [x.matchCount, " matches"],
                          }),
                          l.jsx("span", {
                            className: `inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${x.isLocked ? "bg-red-500/15 text-red-400 border-red-500/20" : "bg-green-500/15 text-green-400 border-green-500/20"}`,
                            children: x.isLocked
                              ? l.jsxs(l.Fragment, {
                                  children: [
                                    l.jsx(xn, { className: "h-3 w-3" }),
                                    " Locked",
                                  ],
                                })
                              : l.jsxs(l.Fragment, {
                                  children: [
                                    l.jsx($u, { className: "h-3 w-3" }),
                                    " Open",
                                  ],
                                }),
                          }),
                        ],
                      }),
                      l.jsxs(xe, {
                        size: "sm",
                        variant: "outline",
                        className: `shrink-0 gap-1.5 text-xs ${x.isLocked ? "text-green-400 border-green-500/30 hover:bg-green-500/10" : "text-red-400 border-red-500/30 hover:bg-red-500/10"}`,
                        disabled: h.isPending,
                        onClick: () =>
                          h.mutate({ roundSlug: x.round, lock: !x.isLocked }),
                        children: [
                          h.isPending
                            ? l.jsx(st, { className: "h-3 w-3 animate-spin" })
                            : x.isLocked
                              ? l.jsx($u, { className: "h-3 w-3" })
                              : l.jsx(xn, { className: "h-3 w-3" }),
                          x.isLocked ? "Unlock" : "Lock",
                        ],
                      }),
                    ],
                  }),
                },
                x.round,
              ),
            ),
          }),
    ],
  });
}
function YT({ onCreated: n }) {
  const [r, i] = j.useState(""),
    { toast: c } = Es(),
    d = vn(),
    f = qn({
      mutationFn: (h) =>
        Ht("/api/arenas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: h }),
        }),
      onSuccess: (h) => {
        (i(""),
          d.invalidateQueries({ queryKey: ["arenas"] }),
          c({
            title: `Arena "${h.name}" created`,
            description: "Copy the invite link and share it with players.",
          }),
          n());
      },
      onError: (h) =>
        c({ title: "Error", description: h.message, variant: "destructive" }),
    });
  return l.jsxs("form", {
    onSubmit: (h) => {
      (h.preventDefault(), r.trim() && f.mutate(r.trim()));
    },
    className: "flex gap-3",
    children: [
      l.jsx(St, {
        value: r,
        onChange: (h) => i(h.target.value),
        placeholder: "Arena name",
        className: "max-w-xs",
        disabled: f.isPending,
      }),
      l.jsxs(xe, {
        type: "submit",
        disabled: !r.trim() || f.isPending,
        children: [
          f.isPending
            ? l.jsx(st, { className: "h-4 w-4 mr-2 animate-spin" })
            : l.jsx(GN, { className: "h-4 w-4 mr-2" }),
          "Create",
        ],
      }),
    ],
  });
}
function VT({ arena: n }) {
  const { toast: r } = Es(),
    i = vn(),
    [c, d] = j.useState(!1),
    { data: f } = at({
      queryKey: ["arena", n.id],
      queryFn: () => Ht(`/api/arenas/${n.id}`),
      enabled: c,
    }),
    { data: h, isLoading: x } = at({
      queryKey: ["arena-members", n.id],
      queryFn: () => Ht(`/api/arenas/${n.id}/members`),
      enabled: c,
    }),
    m = qn({
      mutationFn: () =>
        Ht(`/api/arenas/${n.id}/regenerate-invite`, { method: "POST" }),
      onSuccess: () => {
        (i.invalidateQueries({ queryKey: ["arena", n.id] }),
          r({ title: "Invite link regenerated" }));
      },
      onError: () =>
        r({
          title: "Error",
          description: "Failed to regenerate invite link.",
          variant: "destructive",
        }),
    }),
    p = qn({
      mutationFn: (N) =>
        Ht(`/api/arenas/${n.id}/members/${N}`, { method: "DELETE" }),
      onSuccess: () => {
        (i.invalidateQueries({ queryKey: ["arena-members", n.id] }),
          i.invalidateQueries({ queryKey: ["arenas"] }),
          r({ title: "Member removed" }));
      },
      onError: () =>
        r({
          title: "Error",
          description: "Failed to remove member.",
          variant: "destructive",
        }),
    }),
    v = f?.inviteCode ?? n.inviteCode,
    y = v ? qT(v) : null;
  return l.jsxs(Ae, {
    children: [
      l.jsx(ws, {
        className: "cursor-pointer select-none",
        onClick: () => d((N) => !N),
        children: l.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            l.jsxs(Ss, {
              className: "text-base flex items-center gap-2",
              children: [
                l.jsx(ht, { className: "h-4 w-4 text-primary" }),
                n.name,
                l.jsxs(an, {
                  variant: "secondary",
                  className: "text-xs font-normal",
                  children: [
                    l.jsx(il, { className: "h-3 w-3 mr-1" }),
                    n.memberCount,
                  ],
                }),
              ],
            }),
            l.jsx(Zu, {
              className: `h-4 w-4 text-muted-foreground transition-transform ${c ? "rotate-90" : ""}`,
            }),
          ],
        }),
      }),
      c &&
        l.jsxs(Oe, {
          className: "space-y-4",
          children: [
            y &&
              l.jsxs("div", {
                children: [
                  l.jsx("p", {
                    className:
                      "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider",
                    children: "Invite Link",
                  }),
                  l.jsxs("div", {
                    className: "flex gap-2",
                    children: [
                      l.jsx("code", {
                        className:
                          "flex-1 text-xs bg-muted border rounded px-3 py-2 truncate font-mono",
                        children: y,
                      }),
                      l.jsx(xe, {
                        size: "sm",
                        variant: "outline",
                        onClick: () => {
                          (navigator.clipboard.writeText(y),
                            r({ title: "Copied!" }));
                        },
                        children: l.jsx(Kg, { className: "h-4 w-4" }),
                      }),
                      l.jsx(xe, {
                        size: "sm",
                        variant: "outline",
                        onClick: () => m.mutate(),
                        disabled: m.isPending,
                        children: l.jsx(Sd, {
                          className: `h-4 w-4 ${m.isPending ? "animate-spin" : ""}`,
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            l.jsxs("div", {
              children: [
                l.jsx("p", {
                  className:
                    "text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider",
                  children: "Members",
                }),
                x
                  ? l.jsxs("div", {
                      className:
                        "flex items-center gap-2 text-muted-foreground text-sm py-4",
                      children: [
                        l.jsx(st, { className: "h-4 w-4 animate-spin" }),
                        "Loading…",
                      ],
                    })
                  : h?.length
                    ? l.jsxs(Js, {
                        children: [
                          l.jsx(Is, {
                            children: l.jsxs(qt, {
                              children: [
                                l.jsx(Se, { children: "Player" }),
                                l.jsx(Se, { children: "Email" }),
                                l.jsx(Se, { children: "Joined" }),
                                l.jsx(Se, { className: "w-12" }),
                              ],
                            }),
                          }),
                          l.jsx(Ws, {
                            children: h.map((N) =>
                              l.jsxs(
                                qt,
                                {
                                  children: [
                                    l.jsx(Ee, {
                                      className: "font-medium",
                                      children:
                                        N.username ??
                                        N.email?.split("@")[0] ??
                                        "Unknown",
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-muted-foreground text-sm",
                                      children: N.email,
                                    }),
                                    l.jsx(Ee, {
                                      className:
                                        "text-muted-foreground text-sm",
                                      children: new Date(
                                        N.joinedAt,
                                      ).toLocaleDateString(),
                                    }),
                                    l.jsx(Ee, {
                                      children: l.jsx(xe, {
                                        size: "icon",
                                        variant: "ghost",
                                        className:
                                          "h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10",
                                        onClick: () => p.mutate(N.userId),
                                        disabled: p.isPending,
                                        children: l.jsx(IN, {
                                          className: "h-4 w-4",
                                        }),
                                      }),
                                    }),
                                  ],
                                },
                                N.userId,
                              ),
                            ),
                          }),
                        ],
                      })
                    : l.jsx("p", {
                        className: "text-sm text-muted-foreground py-4",
                        children: "No members yet.",
                      }),
              ],
            }),
            l.jsx(xe, {
              variant: "outline",
              size: "sm",
              asChild: !0,
              children: l.jsx(Xe, {
                href: `/arenas/${n.id}`,
                children: "View Leaderboard",
              }),
            }),
          ],
        }),
    ],
  });
}
function KT() {
  const {
    data: n,
    isLoading: r,
    refetch: i,
  } = at({ queryKey: ["arenas"], queryFn: () => Ht("/api/arenas") });
  return l.jsxs("section", {
    className: "space-y-4",
    children: [
      l.jsxs("h2", {
        className: "text-xl font-semibold flex items-center gap-2",
        children: [l.jsx(yn, { className: "h-5 w-5 text-primary" }), " Arenas"],
      }),
      l.jsx(YT, { onCreated: i }),
      r
        ? l.jsxs("div", {
            className: "flex items-center gap-2 text-muted-foreground py-8",
            children: [
              l.jsx(st, { className: "h-5 w-5 animate-spin" }),
              "Loading…",
            ],
          })
        : n?.length
          ? l.jsx("div", {
              className: "space-y-3",
              children: n.map((c) => l.jsx(VT, { arena: c }, c.id)),
            })
          : l.jsx(Ae, {
              children: l.jsx(Oe, {
                className: "py-8 text-center text-muted-foreground text-sm",
                children: "No arenas yet. Create one above.",
              }),
            }),
    ],
  });
}
function XT() {
  const { user: n, isLoading: r } = Wt(),
    [, i] = Ka();
  return r
    ? l.jsx(ct, {
        children: l.jsx("div", {
          className: "flex items-center justify-center py-16",
          children: l.jsx(st, {
            className: "h-8 w-8 animate-spin text-muted-foreground",
          }),
        }),
      })
    : n?.isAdmin
      ? l.jsx(ct, {
          children: l.jsxs("div", {
            className: "space-y-10",
            children: [
              l.jsxs("div", {
                children: [
                  l.jsxs("h1", {
                    className:
                      "text-3xl font-bold tracking-tight flex items-center gap-3",
                    children: [
                      l.jsx(yn, { className: "h-8 w-8 text-primary" }),
                      " Admin Panel",
                    ],
                  }),
                  l.jsx("p", {
                    className: "text-muted-foreground mt-1",
                    children:
                      "Enter results, manage rounds, and control arenas.",
                  }),
                ],
              }),
              l.jsx(QT, {}),
              l.jsx("hr", { className: "border-border" }),
              l.jsx(PT, {}),
              l.jsx("hr", { className: "border-border" }),
              l.jsx(KT, {}),
            ],
          }),
        })
      : l.jsx(ct, {
          children: l.jsx(Ae, {
            className: "max-w-md mx-auto mt-16",
            children: l.jsxs(Oe, {
              className: "py-12 text-center space-y-3",
              children: [
                l.jsx(Pg, { className: "h-10 w-10 text-destructive mx-auto" }),
                l.jsx("p", {
                  className: "font-semibold",
                  children: "Admin access required",
                }),
                l.jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: "You don't have permission to view this page.",
                }),
                l.jsx(xe, {
                  variant: "outline",
                  onClick: () => i("/"),
                  children: "Go Home",
                }),
              ],
            }),
          }),
        });
}
function Gx(n) {
  const r = n.userPrediction;
  if (!r || n.status !== "completed") return "none";
  if (r.homeScore === n.homeScore && r.awayScore === n.awayScore)
    return "exact";
  if (r.points != null && r.points > 0) return "correct";
  const c = n.homeScore ?? 0,
    d = n.awayScore ?? 0,
    f = r.homeScore ?? 0,
    h = r.awayScore ?? 0,
    x = c > d ? "H" : c < d ? "A" : "D",
    m = f > h ? "H" : f < h ? "A" : "D";
  return x === m ? "correct" : "miss";
}
function FT({ type: n }) {
  return n === "exact"
    ? l.jsxs("span", {
        className:
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold border border-yellow-500/20",
        children: [l.jsx(ll, { className: "h-3 w-3" }), " Exact"],
      })
    : n === "correct"
      ? l.jsxs("span", {
          className:
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-bold border border-green-500/20",
          children: [l.jsx(bs, { className: "h-3 w-3" }), " Correct"],
        })
      : n === "miss"
        ? l.jsxs("span", {
            className:
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20",
            children: [l.jsx(rl, { className: "h-3 w-3" }), " Miss"],
          })
        : l.jsxs("span", {
            className:
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-bold",
            children: [l.jsx(HN, { className: "h-3 w-3" }), " No pick"],
          });
}
const ZT = {
  group_stage: "Group Stage",
  round_of_32: "Round of 32",
  round_of_16: "Round of 16",
  quarter_finals: "Quarter-Finals",
  semi_finals: "Semi-Finals",
  final: "Final",
};
function $T() {
  const { isAuthenticated: n, login: r } = Wt(),
    { data: i, isLoading: c } = no(),
    d = j.useMemo(
      () =>
        i
          ? i
              .filter((h) => h.status === "completed")
              .sort(
                (h, x) =>
                  new Date(x.scheduledAt).getTime() -
                  new Date(h.scheduledAt).getTime(),
              )
          : [],
      [i],
    ),
    f = j.useMemo(() => {
      let h = 0,
        x = 0,
        m = 0,
        p = 0,
        v = 0;
      for (const y of d) {
        const N = Gx(y);
        N === "exact"
          ? (h++, (v += y.userPrediction?.points ?? 0))
          : N === "correct"
            ? (x++, (v += y.userPrediction?.points ?? 0))
            : N === "miss"
              ? m++
              : p++;
      }
      return {
        exact: h,
        correct: x,
        miss: m,
        noPick: p,
        pts: v,
        total: d.length,
      };
    }, [d]);
  return n
    ? l.jsx(ct, {
        children: l.jsxs("div", {
          className: "space-y-8",
          children: [
            l.jsxs("header", {
              children: [
                l.jsx("h1", {
                  className: "text-3xl font-black uppercase tracking-tight",
                  children: "My Results",
                }),
                l.jsx("p", {
                  className: "text-muted-foreground text-sm mt-1",
                  children: "Your prediction history match by match.",
                }),
              ],
            }),
            !c &&
              f.total > 0 &&
              l.jsxs("div", {
                className: "grid grid-cols-2 md:grid-cols-5 gap-3",
                children: [
                  l.jsx(Ae, {
                    className: "border-primary/30 bg-primary/5",
                    children: l.jsxs(Oe, {
                      className: "p-4 text-center",
                      children: [
                        l.jsx("p", {
                          className: "text-3xl font-black text-primary",
                          children: f.pts,
                        }),
                        l.jsx("p", {
                          className:
                            "text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wide",
                          children: "Points",
                        }),
                      ],
                    }),
                  }),
                  l.jsx(Ae, {
                    className: "border-yellow-500/25 bg-yellow-500/5",
                    children: l.jsxs(Oe, {
                      className: "p-4 text-center",
                      children: [
                        l.jsx("p", {
                          className: "text-3xl font-black text-yellow-400",
                          children: f.exact,
                        }),
                        l.jsx("p", {
                          className:
                            "text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wide",
                          children: "Exact",
                        }),
                      ],
                    }),
                  }),
                  l.jsx(Ae, {
                    className: "border-green-500/25 bg-green-500/5",
                    children: l.jsxs(Oe, {
                      className: "p-4 text-center",
                      children: [
                        l.jsx("p", {
                          className: "text-3xl font-black text-green-400",
                          children: f.correct,
                        }),
                        l.jsx("p", {
                          className:
                            "text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wide",
                          children: "Correct",
                        }),
                      ],
                    }),
                  }),
                  l.jsx(Ae, {
                    className: "border-red-500/20 bg-red-500/5",
                    children: l.jsxs(Oe, {
                      className: "p-4 text-center",
                      children: [
                        l.jsx("p", {
                          className: "text-3xl font-black text-red-400",
                          children: f.miss,
                        }),
                        l.jsx("p", {
                          className:
                            "text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wide",
                          children: "Miss",
                        }),
                      ],
                    }),
                  }),
                  l.jsx(Ae, {
                    children: l.jsxs(Oe, {
                      className: "p-4 text-center",
                      children: [
                        l.jsx("p", {
                          className: "text-3xl font-black",
                          children: f.noPick,
                        }),
                        l.jsx("p", {
                          className:
                            "text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wide",
                          children: "No Pick",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            c
              ? l.jsx("div", {
                  className: "space-y-2",
                  children: [1, 2, 3, 4, 5, 6, 7, 8].map((h) =>
                    l.jsx(Ut, { className: "h-16 rounded-xl" }, h),
                  ),
                })
              : d.length === 0
                ? l.jsxs("div", {
                    className:
                      "py-20 text-center border-2 border-dashed border-border rounded-xl",
                    children: [
                      l.jsx(Nd, {
                        className:
                          "h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-30",
                      }),
                      l.jsx("p", {
                        className: "font-semibold text-muted-foreground",
                        children: "No completed matches yet",
                      }),
                      l.jsx("p", {
                        className: "text-sm text-muted-foreground mt-1",
                        children:
                          "Results will appear here as matches are played.",
                      }),
                      l.jsx(xe, {
                        className: "mt-6",
                        asChild: !0,
                        children: l.jsx(Xe, {
                          href: "/predictions",
                          children: "Make your predictions",
                        }),
                      }),
                    ],
                  })
                : l.jsx("div", {
                    className: "space-y-2",
                    children: d.map((h) => {
                      const x = h.userPrediction,
                        m = Gx(h),
                        p = Gt(h.homeTeam?.code),
                        v = Gt(h.awayTeam?.code),
                        y = ZT[h.stage] ?? h.stage.replace(/_/g, " ");
                      return l.jsxs(
                        "div",
                        {
                          className: `flex items-center gap-3 p-3 sm:p-4 rounded-xl border transition-colors ${m === "exact" ? "border-yellow-500/20 bg-yellow-500/5" : m === "correct" ? "border-green-500/15 bg-green-500/5" : m === "miss" ? "border-red-500/10 bg-card" : "border-border bg-card"}`,
                          children: [
                            l.jsxs("div", {
                              className: "hidden sm:block w-24 shrink-0",
                              children: [
                                l.jsx("p", {
                                  className:
                                    "text-xs font-semibold text-muted-foreground",
                                  children: new Date(
                                    h.scheduledAt,
                                  ).toLocaleDateString(void 0, {
                                    month: "short",
                                    day: "numeric",
                                  }),
                                }),
                                l.jsx("p", {
                                  className:
                                    "text-[10px] text-muted-foreground/70 mt-0.5",
                                  children: y,
                                }),
                              ],
                            }),
                            l.jsxs("div", {
                              className:
                                "flex-1 min-w-0 flex items-center gap-2",
                              children: [
                                l.jsxs("div", {
                                  className: "flex items-center gap-1.5",
                                  children: [
                                    p
                                      ? l.jsx("img", {
                                          src: p,
                                          alt: h.homeTeam?.code,
                                          className:
                                            "h-4 w-6 object-cover rounded-sm",
                                        })
                                      : l.jsx("span", {
                                          className: "text-base",
                                          children: h.homeTeam?.flagEmoji,
                                        }),
                                    l.jsx("span", {
                                      className: "font-bold text-sm",
                                      children: h.homeTeam?.code,
                                    }),
                                  ],
                                }),
                                l.jsx("div", {
                                  className: "flex items-center gap-1 shrink-0",
                                  children: l.jsxs("span", {
                                    className:
                                      "font-black text-sm tabular-nums",
                                    children: [h.homeScore, "–", h.awayScore],
                                  }),
                                }),
                                l.jsxs("div", {
                                  className: "flex items-center gap-1.5",
                                  children: [
                                    l.jsx("span", {
                                      className: "font-bold text-sm",
                                      children: h.awayTeam?.code,
                                    }),
                                    v
                                      ? l.jsx("img", {
                                          src: v,
                                          alt: h.awayTeam?.code,
                                          className:
                                            "h-4 w-6 object-cover rounded-sm",
                                        })
                                      : l.jsx("span", {
                                          className: "text-base",
                                          children: h.awayTeam?.flagEmoji,
                                        }),
                                  ],
                                }),
                              ],
                            }),
                            l.jsx("div", {
                              className:
                                "shrink-0 text-sm text-muted-foreground hidden sm:block",
                              children: x
                                ? l.jsxs("span", {
                                    children: [
                                      "Pick: ",
                                      l.jsxs("span", {
                                        className: "font-black text-foreground",
                                        children: [
                                          x.homeScore,
                                          "–",
                                          x.awayScore,
                                        ],
                                      }),
                                    ],
                                  })
                                : l.jsx("span", {
                                    className: "italic",
                                    children: "—",
                                  }),
                            }),
                            l.jsx("div", {
                              className: "shrink-0",
                              children: l.jsx(FT, { type: m }),
                            }),
                            l.jsx("div", {
                              className: "shrink-0 w-10 text-right",
                              children:
                                x?.points != null
                                  ? l.jsxs("span", {
                                      className: `font-black text-sm ${x.points > 0 ? "text-primary" : "text-muted-foreground"}`,
                                      children: ["+", x.points],
                                    })
                                  : l.jsx("span", {
                                      className:
                                        "text-muted-foreground text-sm",
                                      children: "—",
                                    }),
                            }),
                          ],
                        },
                        h.id,
                      );
                    }),
                  }),
          ],
        }),
      })
    : l.jsx(ct, {
        children: l.jsxs("div", {
          className:
            "flex flex-col items-center justify-center py-24 text-center gap-6",
          children: [
            l.jsx(ht, {
              className: "h-16 w-16 text-muted-foreground opacity-30",
            }),
            l.jsxs("div", {
              children: [
                l.jsx("h2", {
                  className: "text-2xl font-black",
                  children: "Sign in to see your results",
                }),
                l.jsx("p", {
                  className: "text-muted-foreground mt-2",
                  children: "Your personal prediction history lives here.",
                }),
              ],
            }),
            l.jsxs(xe, {
              onClick: r,
              className: "gap-2",
              children: [l.jsx(Xg, { className: "h-4 w-4" }), " Sign In"],
            }),
          ],
        }),
      });
}
const JT = new I1();
function IT() {
  return l.jsxs(E1, {
    children: [
      l.jsx(Dt, { path: "/login", component: ST }),
      l.jsx(Dt, { path: "/my-results", component: $T }),
      l.jsx(Dt, { path: "/arenas/:id/players/:userId", component: UT }),
      l.jsx(Dt, { path: "/arenas/:id", component: _T }),
      l.jsx(Dt, { path: "/arenas", component: TT }),
      l.jsx(Dt, { path: "/join/:code", component: kT }),
      l.jsx(Dt, { path: "/admin", component: XT }),
      l.jsx(Dt, { path: "/predictions", component: uT }),
      l.jsx(Dt, { path: "/matches", component: hT }),
      l.jsx(Dt, { path: "/groups", component: xT }),
      l.jsx(Dt, { path: "/leaderboard", component: vT }),
      l.jsx(Dt, { path: "/", component: KE }),
      l.jsx(Dt, { component: H2 }),
    ],
  });
}
function WT() {
  return l.jsx(W1, {
    client: JT,
    children: l.jsxs(z2, {
      children: [
        l.jsx(Jx, { base: "/".replace(/\/$/, ""), children: l.jsx(IT, {}) }),
        l.jsx(Ww, {}),
      ],
    }),
  });
}
a1.createRoot(document.getElementById("root")).render(l.jsx(WT, {}));
