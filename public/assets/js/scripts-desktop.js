!function(t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
            if (!t.document)
                throw new Error("jQuery requires a window with a document");
            return e(t)
        }
        : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";
    function i(t, e) {
        e = e || K;
        var i = e.createElement("script");
        i.text = t,
            e.head.appendChild(i).parentNode.removeChild(i)
    }
    function n(t) {
        var e = !!t && "length"in t && t.length
            , i = dt.type(t);
        return "function" !== i && !dt.isWindow(t) && ("array" === i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
    }
    function s(t, e, i) {
        if (dt.isFunction(e))
            return dt.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            });
        if (e.nodeType)
            return dt.grep(t, function(t) {
                return t === e !== i
            });
        if ("string" == typeof e) {
            if (Tt.test(e))
                return dt.filter(e, t, i);
            e = dt.filter(e, t)
        }
        return dt.grep(t, function(t) {
            return st.call(e, t) > -1 !== i && 1 === t.nodeType
        })
    }
    function r(t, e) {
        for (; (t = t[e]) && 1 !== t.nodeType; )
            ;
        return t
    }
    function o(t) {
        var e = {};
        return dt.each(t.match(kt) || [], function(t, i) {
            e[i] = !0
        }),
            e
    }
    function a(t) {
        return t
    }
    function l(t) {
        throw t
    }
    function h(t, e, i) {
        var n;
        try {
            t && dt.isFunction(n = t.promise) ? n.call(t).done(e).fail(i) : t && dt.isFunction(n = t.then) ? n.call(t, e, i) : e.call(void 0, t)
        } catch (t) {
            i.call(void 0, t)
        }
    }
    function c() {
        K.removeEventListener("DOMContentLoaded", c),
            t.removeEventListener("load", c),
            dt.ready()
    }
    function u() {
        this.expando = dt.expando + u.uid++
    }
    function d(t, e, i) {
        var n;
        if (void 0 === i && 1 === t.nodeType)
            if (n = "data-" + e.replace(Rt, "-$&").toLowerCase(),
                i = t.getAttribute(n),
            "string" == typeof i) {
                try {
                    i = "true" === i || "false" !== i && ("null" === i ? null : +i + "" === i ? +i : Mt.test(i) ? JSON.parse(i) : i)
                } catch (s) {}
                Dt.set(t, e, i)
            } else
                i = void 0;
        return i
    }
    function f(t, e, i, n) {
        var s, r = 1, o = 20, a = n ? function() {
                return n.cur()
            }
            : function() {
                return dt.css(t, e, "")
            }
            , l = a(), h = i && i[3] || (dt.cssNumber[e] ? "" : "px"), c = (dt.cssNumber[e] || "px" !== h && +l) && jt.exec(dt.css(t, e));
        if (c && c[3] !== h) {
            h = h || c[3],
                i = i || [],
                c = +l || 1;
            do
                r = r || ".5",
                    c /= r,
                    dt.style(t, e, c + h);
            while (r !== (r = a() / l) && 1 !== r && --o)
        }
        return i && (c = +c || +l || 0,
            s = i[1] ? c + (i[1] + 1) * i[2] : +i[2],
        n && (n.unit = h,
            n.start = c,
            n.end = s)),
            s
    }
    function p(t) {
        var e, i = t.ownerDocument, n = t.nodeName, s = Yt[n];
        return s ? s : (e = i.body.appendChild(i.createElement(n)),
            s = dt.css(e, "display"),
            e.parentNode.removeChild(e),
        "none" === s && (s = "block"),
            Yt[n] = s,
            s)
    }
    function m(t, e) {
        for (var i, n, s = [], r = 0, o = t.length; r < o; r++)
            n = t[r],
            n.style && (i = n.style.display,
                e ? ("none" === i && (s[r] = $t.get(n, "display") || null,
                s[r] || (n.style.display = "")),
                "" === n.style.display && Ht(n) && (s[r] = p(n))) : "none" !== i && (s[r] = "none",
                    $t.set(n, "display", i)));
        for (r = 0; r < o; r++)
            null != s[r] && (t[r].style.display = s[r]);
        return t
    }
    function _(t, e) {
        var i = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
        return void 0 === e || e && dt.nodeName(t, e) ? dt.merge([t], i) : i
    }
    function g(t, e) {
        for (var i = 0, n = t.length; i < n; i++)
            $t.set(t[i], "globalEval", !e || $t.get(e[i], "globalEval"))
    }
    function v(t, e, i, n, s) {
        for (var r, o, a, l, h, c, u = e.createDocumentFragment(), d = [], f = 0, p = t.length; f < p; f++)
            if (r = t[f],
            r || 0 === r)
                if ("object" === dt.type(r))
                    dt.merge(d, r.nodeType ? [r] : r);
                else if (Wt.test(r)) {
                    for (o = o || u.appendChild(e.createElement("div")),
                             a = (Ut.exec(r) || ["", ""])[1].toLowerCase(),
                             l = zt[a] || zt._default,
                             o.innerHTML = l[1] + dt.htmlPrefilter(r) + l[2],
                             c = l[0]; c--; )
                        o = o.lastChild;
                    dt.merge(d, o.childNodes),
                        o = u.firstChild,
                        o.textContent = ""
                } else
                    d.push(e.createTextNode(r));
        for (u.textContent = "",
                 f = 0; r = d[f++]; )
            if (n && dt.inArray(r, n) > -1)
                s && s.push(r);
            else if (h = dt.contains(r.ownerDocument, r),
                o = _(u.appendChild(r), "script"),
            h && g(o),
                i)
                for (c = 0; r = o[c++]; )
                    qt.test(r.type || "") && i.push(r);
        return u
    }
    function y() {
        return !0
    }
    function b() {
        return !1
    }
    function w() {
        try {
            return K.activeElement
        } catch (t) {}
    }
    function T(t, e, i, n, s, r) {
        var o, a;
        if ("object" == typeof e) {
            "string" != typeof i && (n = n || i,
                i = void 0);
            for (a in e)
                T(t, a, i, n, e[a], r);
            return t
        }
        if (null == n && null == s ? (s = i,
            n = i = void 0) : null == s && ("string" == typeof i ? (s = n,
            n = void 0) : (s = n,
            n = i,
            i = void 0)),
        s === !1)
            s = b;
        else if (!s)
            return t;
        return 1 === r && (o = s,
            s = function(t) {
                return dt().off(t),
                    o.apply(this, arguments)
            }
            ,
            s.guid = o.guid || (o.guid = dt.guid++)),
            t.each(function() {
                dt.event.add(this, e, s, n, i)
            })
    }
    function x(t, e) {
        return dt.nodeName(t, "table") && dt.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t : t
    }
    function S(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type,
            t
    }
    function C(t) {
        var e = ee.exec(t.type);
        return e ? t.type = e[1] : t.removeAttribute("type"),
            t
    }
    function L(t, e) {
        var i, n, s, r, o, a, l, h;
        if (1 === e.nodeType) {
            if ($t.hasData(t) && (r = $t.access(t),
                o = $t.set(e, r),
                h = r.events)) {
                delete o.handle,
                    o.events = {};
                for (s in h)
                    for (i = 0,
                             n = h[s].length; i < n; i++)
                        dt.event.add(e, s, h[s][i])
            }
            Dt.hasData(t) && (a = Dt.access(t),
                l = dt.extend({}, a),
                Dt.set(e, l))
        }
    }
    function E(t, e) {
        var i = e.nodeName.toLowerCase();
        "input" === i && Vt.test(t.type) ? e.checked = t.checked : "input" !== i && "textarea" !== i || (e.defaultValue = t.defaultValue)
    }
    function k(t, e, n, s) {
        e = it.apply([], e);
        var r, o, a, l, h, c, u = 0, d = t.length, f = d - 1, p = e[0], m = dt.isFunction(p);
        if (m || d > 1 && "string" == typeof p && !ct.checkClone && te.test(p))
            return t.each(function(i) {
                var r = t.eq(i);
                m && (e[0] = p.call(this, i, r.html())),
                    k(r, e, n, s)
            });
        if (d && (r = v(e, t[0].ownerDocument, !1, t, s),
            o = r.firstChild,
        1 === r.childNodes.length && (r = o),
        o || s)) {
            for (a = dt.map(_(r, "script"), S),
                     l = a.length; u < d; u++)
                h = r,
                u !== f && (h = dt.clone(h, !0, !0),
                l && dt.merge(a, _(h, "script"))),
                    n.call(t[u], h, u);
            if (l)
                for (c = a[a.length - 1].ownerDocument,
                         dt.map(a, C),
                         u = 0; u < l; u++)
                    h = a[u],
                    qt.test(h.type || "") && !$t.access(h, "globalEval") && dt.contains(c, h) && (h.src ? dt._evalUrl && dt._evalUrl(h.src) : i(h.textContent.replace(ie, ""), c))
        }
        return t
    }
    function P(t, e, i) {
        for (var n, s = e ? dt.filter(e, t) : t, r = 0; null != (n = s[r]); r++)
            i || 1 !== n.nodeType || dt.cleanData(_(n)),
            n.parentNode && (i && dt.contains(n.ownerDocument, n) && g(_(n, "script")),
                n.parentNode.removeChild(n));
        return t
    }
    function A(t, e, i) {
        var n, s, r, o, a = t.style;
        return i = i || re(t),
        i && (o = i.getPropertyValue(e) || i[e],
        "" !== o || dt.contains(t.ownerDocument, t) || (o = dt.style(t, e)),
        !ct.pixelMarginRight() && se.test(o) && ne.test(e) && (n = a.width,
            s = a.minWidth,
            r = a.maxWidth,
            a.minWidth = a.maxWidth = a.width = o,
            o = i.width,
            a.width = n,
            a.minWidth = s,
            a.maxWidth = r)),
            void 0 !== o ? o + "" : o
    }
    function O(t, e) {
        return {
            get: function() {
                return t() ? void delete this.get : (this.get = e).apply(this, arguments)
            }
        }
    }
    function N(t) {
        if (t in ce)
            return t;
        for (var e = t[0].toUpperCase() + t.slice(1), i = he.length; i--; )
            if (t = he[i] + e,
            t in ce)
                return t
    }
    function $(t, e, i) {
        var n = jt.exec(e);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
    }
    function D(t, e, i, n, s) {
        for (var r = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, o = 0; r < 4; r += 2)
            "margin" === i && (o += dt.css(t, i + Ft[r], !0, s)),
                n ? ("content" === i && (o -= dt.css(t, "padding" + Ft[r], !0, s)),
                "margin" !== i && (o -= dt.css(t, "border" + Ft[r] + "Width", !0, s))) : (o += dt.css(t, "padding" + Ft[r], !0, s),
                "padding" !== i && (o += dt.css(t, "border" + Ft[r] + "Width", !0, s)));
        return o
    }
    function M(t, e, i) {
        var n, s = !0, r = re(t), o = "border-box" === dt.css(t, "boxSizing", !1, r);
        if (t.getClientRects().length && (n = t.getBoundingClientRect()[e]),
        n <= 0 || null == n) {
            if (n = A(t, e, r),
            (n < 0 || null == n) && (n = t.style[e]),
                se.test(n))
                return n;
            s = o && (ct.boxSizingReliable() || n === t.style[e]),
                n = parseFloat(n) || 0
        }
        return n + D(t, e, i || (o ? "border" : "content"), s, r) + "px"
    }
    function R(t, e, i, n, s) {
        return new R.prototype.init(t,e,i,n,s)
    }
    function I() {
        de && (t.requestAnimationFrame(I),
            dt.fx.tick())
    }
    function j() {
        return t.setTimeout(function() {
            ue = void 0
        }),
            ue = dt.now()
    }
    function F(t, e) {
        var i, n = 0, s = {
            height: t
        };
        for (e = e ? 1 : 0; n < 4; n += 2 - e)
            i = Ft[n],
                s["margin" + i] = s["padding" + i] = t;
        return e && (s.opacity = s.width = t),
            s
    }
    function H(t, e, i) {
        for (var n, s = (V.tweeners[e] || []).concat(V.tweeners["*"]), r = 0, o = s.length; r < o; r++)
            if (n = s[r].call(i, e, t))
                return n
    }
    function B(t, e, i) {
        var n, s, r, o, a, l, h, c, u = "width"in e || "height"in e, d = this, f = {}, p = t.style, _ = t.nodeType && Ht(t), g = $t.get(t, "fxshow");
        i.queue || (o = dt._queueHooks(t, "fx"),
        null == o.unqueued && (o.unqueued = 0,
                a = o.empty.fire,
                o.empty.fire = function() {
                    o.unqueued || a()
                }
        ),
            o.unqueued++,
            d.always(function() {
                d.always(function() {
                    o.unqueued--,
                    dt.queue(t, "fx").length || o.empty.fire()
                })
            }));
        for (n in e)
            if (s = e[n],
                fe.test(s)) {
                if (delete e[n],
                    r = r || "toggle" === s,
                s === (_ ? "hide" : "show")) {
                    if ("show" !== s || !g || void 0 === g[n])
                        continue;
                    _ = !0
                }
                f[n] = g && g[n] || dt.style(t, n)
            }
        if (l = !dt.isEmptyObject(e),
        l || !dt.isEmptyObject(f)) {
            u && 1 === t.nodeType && (i.overflow = [p.overflow, p.overflowX, p.overflowY],
                h = g && g.display,
            null == h && (h = $t.get(t, "display")),
                c = dt.css(t, "display"),
            "none" === c && (h ? c = h : (m([t], !0),
                h = t.style.display || h,
                c = dt.css(t, "display"),
                m([t]))),
            ("inline" === c || "inline-block" === c && null != h) && "none" === dt.css(t, "float") && (l || (d.done(function() {
                p.display = h
            }),
            null == h && (c = p.display,
                h = "none" === c ? "" : c)),
                p.display = "inline-block")),
            i.overflow && (p.overflow = "hidden",
                d.always(function() {
                    p.overflow = i.overflow[0],
                        p.overflowX = i.overflow[1],
                        p.overflowY = i.overflow[2]
                })),
                l = !1;
            for (n in f)
                l || (g ? "hidden"in g && (_ = g.hidden) : g = $t.access(t, "fxshow", {
                    display: h
                }),
                r && (g.hidden = !_),
                _ && m([t], !0),
                    d.done(function() {
                        _ || m([t]),
                            $t.remove(t, "fxshow");
                        for (n in f)
                            dt.style(t, n, f[n])
                    })),
                    l = H(_ ? g[n] : 0, n, d),
                n in g || (g[n] = l.start,
                _ && (l.end = l.start,
                    l.start = 0))
        }
    }
    function Y(t, e) {
        var i, n, s, r, o;
        for (i in t)
            if (n = dt.camelCase(i),
                s = e[n],
                r = t[i],
            dt.isArray(r) && (s = r[1],
                r = t[i] = r[0]),
            i !== n && (t[n] = r,
                delete t[i]),
                o = dt.cssHooks[n],
            o && "expand"in o) {
                r = o.expand(r),
                    delete t[n];
                for (i in r)
                    i in t || (t[i] = r[i],
                        e[i] = s)
            } else
                e[n] = s
    }
    function V(t, e, i) {
        var n, s, r = 0, o = V.prefilters.length, a = dt.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (s)
                return !1;
            for (var e = ue || j(), i = Math.max(0, h.startTime + h.duration - e), n = i / h.duration || 0, r = 1 - n, o = 0, l = h.tweens.length; o < l; o++)
                h.tweens[o].run(r);
            return a.notifyWith(t, [h, r, i]),
                r < 1 && l ? i : (a.resolveWith(t, [h]),
                    !1)
        }, h = a.promise({
            elem: t,
            props: dt.extend({}, e),
            opts: dt.extend(!0, {
                specialEasing: {},
                easing: dt.easing._default
            }, i),
            originalProperties: e,
            originalOptions: i,
            startTime: ue || j(),
            duration: i.duration,
            tweens: [],
            createTween: function(e, i) {
                var n = dt.Tween(t, h.opts, e, i, h.opts.specialEasing[e] || h.opts.easing);
                return h.tweens.push(n),
                    n
            },
            stop: function(e) {
                var i = 0
                    , n = e ? h.tweens.length : 0;
                if (s)
                    return this;
                for (s = !0; i < n; i++)
                    h.tweens[i].run(1);
                return e ? (a.notifyWith(t, [h, 1, 0]),
                    a.resolveWith(t, [h, e])) : a.rejectWith(t, [h, e]),
                    this
            }
        }), c = h.props;
        for (Y(c, h.opts.specialEasing); r < o; r++)
            if (n = V.prefilters[r].call(h, t, c, h.opts))
                return dt.isFunction(n.stop) && (dt._queueHooks(h.elem, h.opts.queue).stop = dt.proxy(n.stop, n)),
                    n;
        return dt.map(c, H, h),
        dt.isFunction(h.opts.start) && h.opts.start.call(t, h),
            dt.fx.timer(dt.extend(l, {
                elem: t,
                anim: h,
                queue: h.opts.queue
            })),
            h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always)
    }
    function U(t) {
        return t.getAttribute && t.getAttribute("class") || ""
    }
    function q(t, e, i, n) {
        var s;
        if (dt.isArray(e))
            dt.each(e, function(e, s) {
                i || Le.test(t) ? n(t, s) : q(t + "[" + ("object" == typeof s && null != s ? e : "") + "]", s, i, n)
            });
        else if (i || "object" !== dt.type(e))
            n(t, e);
        else
            for (s in e)
                q(t + "[" + s + "]", e[s], i, n)
    }
    function z(t) {
        return function(e, i) {
            "string" != typeof e && (i = e,
                e = "*");
            var n, s = 0, r = e.toLowerCase().match(kt) || [];
            if (dt.isFunction(i))
                for (; n = r[s++]; )
                    "+" === n[0] ? (n = n.slice(1) || "*",
                        (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }
    function W(t, e, i, n) {
        function s(a) {
            var l;
            return r[a] = !0,
                dt.each(t[a] || [], function(t, a) {
                    var h = a(e, i, n);
                    return "string" != typeof h || o || r[h] ? o ? !(l = h) : void 0 : (e.dataTypes.unshift(h),
                        s(h),
                        !1)
                }),
                l
        }
        var r = {}
            , o = t === je;
        return s(e.dataTypes[0]) || !r["*"] && s("*")
    }
    function X(t, e) {
        var i, n, s = dt.ajaxSettings.flatOptions || {};
        for (i in e)
            void 0 !== e[i] && ((s[i] ? t : n || (n = {}))[i] = e[i]);
        return n && dt.extend(!0, t, n),
            t
    }
    function G(t, e, i) {
        for (var n, s, r, o, a = t.contents, l = t.dataTypes; "*" === l[0]; )
            l.shift(),
            void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
        if (n)
            for (s in a)
                if (a[s] && a[s].test(n)) {
                    l.unshift(s);
                    break
                }
        if (l[0]in i)
            r = l[0];
        else {
            for (s in i) {
                if (!l[0] || t.converters[s + " " + l[0]]) {
                    r = s;
                    break
                }
                o || (o = s)
            }
            r = r || o
        }
        if (r)
            return r !== l[0] && l.unshift(r),
                i[r]
    }
    function J(t, e, i, n) {
        var s, r, o, a, l, h = {}, c = t.dataTypes.slice();
        if (c[1])
            for (o in t.converters)
                h[o.toLowerCase()] = t.converters[o];
        for (r = c.shift(); r; )
            if (t.responseFields[r] && (i[t.responseFields[r]] = e),
            !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                l = r,
                r = c.shift())
                if ("*" === r)
                    r = l;
                else if ("*" !== l && l !== r) {
                    if (o = h[l + " " + r] || h["* " + r],
                        !o)
                        for (s in h)
                            if (a = s.split(" "),
                            a[1] === r && (o = h[l + " " + a[0]] || h["* " + a[0]])) {
                                o === !0 ? o = h[s] : h[s] !== !0 && (r = a[0],
                                    c.unshift(a[1]));
                                break
                            }
                    if (o !== !0)
                        if (o && t["throws"])
                            e = o(e);
                        else
                            try {
                                e = o(e)
                            } catch (u) {
                                return {
                                    state: "parsererror",
                                    error: o ? u : "No conversion from " + l + " to " + r
                                }
                            }
                }
        return {
            state: "success",
            data: e
        }
    }
    function Q(t) {
        return dt.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
    }
    var Z = []
        , K = t.document
        , tt = Object.getPrototypeOf
        , et = Z.slice
        , it = Z.concat
        , nt = Z.push
        , st = Z.indexOf
        , rt = {}
        , ot = rt.toString
        , at = rt.hasOwnProperty
        , lt = at.toString
        , ht = lt.call(Object)
        , ct = {}
        , ut = "3.0.0"
        , dt = function(t, e) {
        return new dt.fn.init(t,e)
    }
        , ft = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
        , pt = /^-ms-/
        , mt = /-([a-z])/g
        , _t = function(t, e) {
        return e.toUpperCase()
    };
    dt.fn = dt.prototype = {
        jquery: ut,
        constructor: dt,
        length: 0,
        toArray: function() {
            return et.call(this)
        },
        get: function(t) {
            return null != t ? t < 0 ? this[t + this.length] : this[t] : et.call(this)
        },
        pushStack: function(t) {
            var e = dt.merge(this.constructor(), t);
            return e.prevObject = this,
                e
        },
        each: function(t) {
            return dt.each(this, t)
        },
        map: function(t) {
            return this.pushStack(dt.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(et.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length
                , i = +t + (t < 0 ? e : 0);
            return this.pushStack(i >= 0 && i < e ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: nt,
        sort: Z.sort,
        splice: Z.splice
    },
        dt.extend = dt.fn.extend = function() {
            var t, e, i, n, s, r, o = arguments[0] || {}, a = 1, l = arguments.length, h = !1;
            for ("boolean" == typeof o && (h = o,
                o = arguments[a] || {},
                a++),
                 "object" == typeof o || dt.isFunction(o) || (o = {}),
                 a === l && (o = this,
                     a--); a < l; a++)
                if (null != (t = arguments[a]))
                    for (e in t)
                        i = o[e],
                            n = t[e],
                        o !== n && (h && n && (dt.isPlainObject(n) || (s = dt.isArray(n))) ? (s ? (s = !1,
                            r = i && dt.isArray(i) ? i : []) : r = i && dt.isPlainObject(i) ? i : {},
                            o[e] = dt.extend(h, r, n)) : void 0 !== n && (o[e] = n));
            return o
        }
        ,
        dt.extend({
            expando: "jQuery" + (ut + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(t) {
                throw new Error(t)
            },
            noop: function() {},
            isFunction: function(t) {
                return "function" === dt.type(t)
            },
            isArray: Array.isArray,
            isWindow: function(t) {
                return null != t && t === t.window
            },
            isNumeric: function(t) {
                var e = dt.type(t);
                return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
            },
            isPlainObject: function(t) {
                var e, i;
                return !(!t || "[object Object]" !== ot.call(t)) && (!(e = tt(t)) || (i = at.call(e, "constructor") && e.constructor,
                "function" == typeof i && lt.call(i) === ht))
            },
            isEmptyObject: function(t) {
                var e;
                for (e in t)
                    return !1;
                return !0
            },
            type: function(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? rt[ot.call(t)] || "object" : typeof t
            },
            globalEval: function(t) {
                i(t)
            },
            camelCase: function(t) {
                return t.replace(pt, "ms-").replace(mt, _t)
            },
            nodeName: function(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            },
            each: function(t, e) {
                var i, s = 0;
                if (n(t))
                    for (i = t.length; s < i && e.call(t[s], s, t[s]) !== !1; s++)
                        ;
                else
                    for (s in t)
                        if (e.call(t[s], s, t[s]) === !1)
                            break;
                return t
            },
            trim: function(t) {
                return null == t ? "" : (t + "").replace(ft, "")
            },
            makeArray: function(t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? dt.merge(i, "string" == typeof t ? [t] : t) : nt.call(i, t)),
                    i
            },
            inArray: function(t, e, i) {
                return null == e ? -1 : st.call(e, t, i)
            },
            merge: function(t, e) {
                for (var i = +e.length, n = 0, s = t.length; n < i; n++)
                    t[s++] = e[n];
                return t.length = s,
                    t
            },
            grep: function(t, e, i) {
                for (var n, s = [], r = 0, o = t.length, a = !i; r < o; r++)
                    n = !e(t[r], r),
                    n !== a && s.push(t[r]);
                return s
            },
            map: function(t, e, i) {
                var s, r, o = 0, a = [];
                if (n(t))
                    for (s = t.length; o < s; o++)
                        r = e(t[o], o, i),
                        null != r && a.push(r);
                else
                    for (o in t)
                        r = e(t[o], o, i),
                        null != r && a.push(r);
                return it.apply([], a)
            },
            guid: 1,
            proxy: function(t, e) {
                var i, n, s;
                if ("string" == typeof e && (i = t[e],
                    e = t,
                    t = i),
                    dt.isFunction(t))
                    return n = et.call(arguments, 2),
                        s = function() {
                            return t.apply(e || this, n.concat(et.call(arguments)))
                        }
                        ,
                        s.guid = t.guid = t.guid || dt.guid++,
                        s
            },
            now: Date.now,
            support: ct
        }),
    "function" == typeof Symbol && (dt.fn[Symbol.iterator] = Z[Symbol.iterator]),
        dt.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
            rt["[object " + e + "]"] = e.toLowerCase()
        });
    var gt = function(t) {
        function e(t, e, i, n) {
            var s, r, o, a, l, h, c, d = e && e.ownerDocument, p = e ? e.nodeType : 9;
            if (i = i || [],
            "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p)
                return i;
            if (!n && ((e ? e.ownerDocument || e : B) !== $ && N(e),
                e = e || $,
                M)) {
                if (11 !== p && (l = gt.exec(t)))
                    if (s = l[1]) {
                        if (9 === p) {
                            if (!(o = e.getElementById(s)))
                                return i;
                            if (o.id === s)
                                return i.push(o),
                                    i
                        } else if (d && (o = d.getElementById(s)) && F(e, o) && o.id === s)
                            return i.push(o),
                                i
                    } else {
                        if (l[2])
                            return Z.apply(i, e.getElementsByTagName(t)),
                                i;
                        if ((s = l[3]) && T.getElementsByClassName && e.getElementsByClassName)
                            return Z.apply(i, e.getElementsByClassName(s)),
                                i
                    }
                if (T.qsa && !z[t + " "] && (!R || !R.test(t))) {
                    if (1 !== p)
                        d = e,
                            c = t;
                    else if ("object" !== e.nodeName.toLowerCase()) {
                        for ((a = e.getAttribute("id")) ? a = a.replace(wt, Tt) : e.setAttribute("id", a = H),
                                 h = L(t),
                                 r = h.length; r--; )
                            h[r] = "#" + a + " " + f(h[r]);
                        c = h.join(","),
                            d = vt.test(t) && u(e.parentNode) || e
                    }
                    if (c)
                        try {
                            return Z.apply(i, d.querySelectorAll(c)),
                                i
                        } catch (m) {} finally {
                            a === H && e.removeAttribute("id")
                        }
                }
            }
            return k(t.replace(at, "$1"), e, i, n)
        }
        function i() {
            function t(i, n) {
                return e.push(i + " ") > x.cacheLength && delete t[e.shift()],
                    t[i + " "] = n
            }
            var e = [];
            return t
        }
        function n(t) {
            return t[H] = !0,
                t
        }
        function s(t) {
            var e = $.createElement("fieldset");
            try {
                return !!t(e)
            } catch (i) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e),
                    e = null
            }
        }
        function r(t, e) {
            for (var i = t.split("|"), n = i.length; n--; )
                x.attrHandle[i[n]] = e
        }
        function o(t, e) {
            var i = e && t
                , n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
            if (n)
                return n;
            if (i)
                for (; i = i.nextSibling; )
                    if (i === e)
                        return -1;
            return t ? 1 : -1
        }
        function a(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return "input" === i && e.type === t
            }
        }
        function l(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }
        function h(t) {
            return function(e) {
                return "label"in e && e.disabled === t || "form"in e && e.disabled === t || "form"in e && e.disabled === !1 && (e.isDisabled === t || e.isDisabled !== !t && ("label"in e || !St(e)) !== t)
            }
        }
        function c(t) {
            return n(function(e) {
                return e = +e,
                    n(function(i, n) {
                        for (var s, r = t([], i.length, e), o = r.length; o--; )
                            i[s = r[o]] && (i[s] = !(n[s] = i[s]))
                    })
            })
        }
        function u(t) {
            return t && "undefined" != typeof t.getElementsByTagName && t
        }
        function d() {}
        function f(t) {
            for (var e = 0, i = t.length, n = ""; e < i; e++)
                n += t[e].value;
            return n
        }
        function p(t, e, i) {
            var n = e.dir
                , s = e.next
                , r = s || n
                , o = i && "parentNode" === r
                , a = V++;
            return e.first ? function(e, i, s) {
                    for (; e = e[n]; )
                        if (1 === e.nodeType || o)
                            return t(e, i, s)
                }
                : function(e, i, l) {
                    var h, c, u, d = [Y, a];
                    if (l) {
                        for (; e = e[n]; )
                            if ((1 === e.nodeType || o) && t(e, i, l))
                                return !0
                    } else
                        for (; e = e[n]; )
                            if (1 === e.nodeType || o)
                                if (u = e[H] || (e[H] = {}),
                                    c = u[e.uniqueID] || (u[e.uniqueID] = {}),
                                s && s === e.nodeName.toLowerCase())
                                    e = e[n] || e;
                                else {
                                    if ((h = c[r]) && h[0] === Y && h[1] === a)
                                        return d[2] = h[2];
                                    if (c[r] = d,
                                        d[2] = t(e, i, l))
                                        return !0
                                }
                }
        }
        function m(t) {
            return t.length > 1 ? function(e, i, n) {
                    for (var s = t.length; s--; )
                        if (!t[s](e, i, n))
                            return !1;
                    return !0
                }
                : t[0]
        }
        function _(t, i, n) {
            for (var s = 0, r = i.length; s < r; s++)
                e(t, i[s], n);
            return n
        }
        function g(t, e, i, n, s) {
            for (var r, o = [], a = 0, l = t.length, h = null != e; a < l; a++)
                (r = t[a]) && (i && !i(r, n, s) || (o.push(r),
                h && e.push(a)));
            return o
        }
        function v(t, e, i, s, r, o) {
            return s && !s[H] && (s = v(s)),
            r && !r[H] && (r = v(r, o)),
                n(function(n, o, a, l) {
                    var h, c, u, d = [], f = [], p = o.length, m = n || _(e || "*", a.nodeType ? [a] : a, []), v = !t || !n && e ? m : g(m, d, t, a, l), y = i ? r || (n ? t : p || s) ? [] : o : v;
                    if (i && i(v, y, a, l),
                        s)
                        for (h = g(y, f),
                                 s(h, [], a, l),
                                 c = h.length; c--; )
                            (u = h[c]) && (y[f[c]] = !(v[f[c]] = u));
                    if (n) {
                        if (r || t) {
                            if (r) {
                                for (h = [],
                                         c = y.length; c--; )
                                    (u = y[c]) && h.push(v[c] = u);
                                r(null, y = [], h, l)
                            }
                            for (c = y.length; c--; )
                                (u = y[c]) && (h = r ? tt(n, u) : d[c]) > -1 && (n[h] = !(o[h] = u))
                        }
                    } else
                        y = g(y === o ? y.splice(p, y.length) : y),
                            r ? r(null, o, y, l) : Z.apply(o, y)
                })
        }
        function y(t) {
            for (var e, i, n, s = t.length, r = x.relative[t[0].type], o = r || x.relative[" "], a = r ? 1 : 0, l = p(function(t) {
                return t === e
            }, o, !0), h = p(function(t) {
                return tt(e, t) > -1
            }, o, !0), c = [function(t, i, n) {
                var s = !r && (n || i !== P) || ((e = i).nodeType ? l(t, i, n) : h(t, i, n));
                return e = null,
                    s
            }
            ]; a < s; a++)
                if (i = x.relative[t[a].type])
                    c = [p(m(c), i)];
                else {
                    if (i = x.filter[t[a].type].apply(null, t[a].matches),
                        i[H]) {
                        for (n = ++a; n < s && !x.relative[t[n].type]; n++)
                            ;
                        return v(a > 1 && m(c), a > 1 && f(t.slice(0, a - 1).concat({
                            value: " " === t[a - 2].type ? "*" : ""
                        })).replace(at, "$1"), i, a < n && y(t.slice(a, n)), n < s && y(t = t.slice(n)), n < s && f(t))
                    }
                    c.push(i)
                }
            return m(c)
        }
        function b(t, i) {
            var s = i.length > 0
                , r = t.length > 0
                , o = function(n, o, a, l, h) {
                var c, u, d, f = 0, p = "0", m = n && [], _ = [], v = P, y = n || r && x.find.TAG("*", h), b = Y += null == v ? 1 : Math.random() || .1, w = y.length;
                for (h && (P = o === $ || o || h); p !== w && null != (c = y[p]); p++) {
                    if (r && c) {
                        for (u = 0,
                             o || c.ownerDocument === $ || (N(c),
                                 a = !M); d = t[u++]; )
                            if (d(c, o || $, a)) {
                                l.push(c);
                                break
                            }
                        h && (Y = b)
                    }
                    s && ((c = !d && c) && f--,
                    n && m.push(c))
                }
                if (f += p,
                s && p !== f) {
                    for (u = 0; d = i[u++]; )
                        d(m, _, o, a);
                    if (n) {
                        if (f > 0)
                            for (; p--; )
                                m[p] || _[p] || (_[p] = J.call(l));
                        _ = g(_)
                    }
                    Z.apply(l, _),
                    h && !n && _.length > 0 && f + i.length > 1 && e.uniqueSort(l)
                }
                return h && (Y = b,
                    P = v),
                    m
            };
            return s ? n(o) : o
        }
        var w, T, x, S, C, L, E, k, P, A, O, N, $, D, M, R, I, j, F, H = "sizzle" + 1 * new Date, B = t.document, Y = 0, V = 0, U = i(), q = i(), z = i(), W = function(t, e) {
            return t === e && (O = !0),
                0
        }, X = {}.hasOwnProperty, G = [], J = G.pop, Q = G.push, Z = G.push, K = G.slice, tt = function(t, e) {
            for (var i = 0, n = t.length; i < n; i++)
                if (t[i] === e)
                    return i;
            return -1
        }, et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", it = "[\\x20\\t\\r\\n\\f]", nt = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", st = "\\[" + it + "*(" + nt + ")(?:" + it + "*([*^$|!~]?=)" + it + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + nt + "))|)" + it + "*\\]", rt = ":(" + nt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + st + ")*)|.*)\\)|)", ot = new RegExp(it + "+","g"), at = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$","g"), lt = new RegExp("^" + it + "*," + it + "*"), ht = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"), ct = new RegExp("=" + it + "*([^\\]'\"]*?)" + it + "*\\]","g"), ut = new RegExp(rt), dt = new RegExp("^" + nt + "$"), ft = {
            ID: new RegExp("^#(" + nt + ")"),
            CLASS: new RegExp("^\\.(" + nt + ")"),
            TAG: new RegExp("^(" + nt + "|[*])"),
            ATTR: new RegExp("^" + st),
            PSEUDO: new RegExp("^" + rt),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)","i"),
            bool: new RegExp("^(?:" + et + ")$","i"),
            needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)","i")
        }, pt = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, _t = /^[^{]+\{\s*\[native \w/, gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, vt = /[+~]/, yt = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)","ig"), bt = function(t, e, i) {
            var n = "0x" + e - 65536;
            return n !== n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        }, wt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, Tt = function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        }, xt = function() {
            N()
        }, St = p(function(t) {
            return t.disabled === !0
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            Z.apply(G = K.call(B.childNodes), B.childNodes),
                G[B.childNodes.length].nodeType
        } catch (Ct) {
            Z = {
                apply: G.length ? function(t, e) {
                        Q.apply(t, K.call(e))
                    }
                    : function(t, e) {
                        for (var i = t.length, n = 0; t[i++] = e[n++]; )
                            ;
                        t.length = i - 1
                    }
            }
        }
        T = e.support = {},
            C = e.isXML = function(t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }
            ,
            N = e.setDocument = function(t) {
                var e, i, n = t ? t.ownerDocument || t : B;
                return n !== $ && 9 === n.nodeType && n.documentElement ? ($ = n,
                    D = $.documentElement,
                    M = !C($),
                B !== $ && (i = $.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", xt, !1) : i.attachEvent && i.attachEvent("onunload", xt)),
                    T.attributes = s(function(t) {
                        return t.className = "i",
                            !t.getAttribute("className")
                    }),
                    T.getElementsByTagName = s(function(t) {
                        return t.appendChild($.createComment("")),
                            !t.getElementsByTagName("*").length
                    }),
                    T.getElementsByClassName = _t.test($.getElementsByClassName),
                    T.getById = s(function(t) {
                        return D.appendChild(t).id = H,
                        !$.getElementsByName || !$.getElementsByName(H).length
                    }),
                    T.getById ? (x.find.ID = function(t, e) {
                            if ("undefined" != typeof e.getElementById && M) {
                                var i = e.getElementById(t);
                                return i ? [i] : []
                            }
                        }
                            ,
                            x.filter.ID = function(t) {
                                var e = t.replace(yt, bt);
                                return function(t) {
                                    return t.getAttribute("id") === e
                                }
                            }
                    ) : (delete x.find.ID,
                            x.filter.ID = function(t) {
                                var e = t.replace(yt, bt);
                                return function(t) {
                                    var i = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                                    return i && i.value === e
                                }
                            }
                    ),
                    x.find.TAG = T.getElementsByTagName ? function(t, e) {
                            return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : T.qsa ? e.querySelectorAll(t) : void 0
                        }
                        : function(t, e) {
                            var i, n = [], s = 0, r = e.getElementsByTagName(t);
                            if ("*" === t) {
                                for (; i = r[s++]; )
                                    1 === i.nodeType && n.push(i);
                                return n
                            }
                            return r
                        }
                    ,
                    x.find.CLASS = T.getElementsByClassName && function(t, e) {
                        if ("undefined" != typeof e.getElementsByClassName && M)
                            return e.getElementsByClassName(t)
                    }
                    ,
                    I = [],
                    R = [],
                (T.qsa = _t.test($.querySelectorAll)) && (s(function(t) {
                    D.appendChild(t).innerHTML = "<a id='" + H + "'></a><select id='" + H + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                    t.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=" + it + "*(?:''|\"\")"),
                    t.querySelectorAll("[selected]").length || R.push("\\[" + it + "*(?:value|" + et + ")"),
                    t.querySelectorAll("[id~=" + H + "-]").length || R.push("~="),
                    t.querySelectorAll(":checked").length || R.push(":checked"),
                    t.querySelectorAll("a#" + H + "+*").length || R.push(".#.+[+~]")
                }),
                    s(function(t) {
                        t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var e = $.createElement("input");
                        e.setAttribute("type", "hidden"),
                            t.appendChild(e).setAttribute("name", "D"),
                        t.querySelectorAll("[name=d]").length && R.push("name" + it + "*[*^$|!~]?="),
                        2 !== t.querySelectorAll(":enabled").length && R.push(":enabled", ":disabled"),
                            D.appendChild(t).disabled = !0,
                        2 !== t.querySelectorAll(":disabled").length && R.push(":enabled", ":disabled"),
                            t.querySelectorAll("*,:x"),
                            R.push(",.*:")
                    })),
                (T.matchesSelector = _t.test(j = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && s(function(t) {
                    T.disconnectedMatch = j.call(t, "*"),
                        j.call(t, "[s!='']:x"),
                        I.push("!=", rt)
                }),
                    R = R.length && new RegExp(R.join("|")),
                    I = I.length && new RegExp(I.join("|")),
                    e = _t.test(D.compareDocumentPosition),
                    F = e || _t.test(D.contains) ? function(t, e) {
                            var i = 9 === t.nodeType ? t.documentElement : t
                                , n = e && e.parentNode;
                            return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                        }
                        : function(t, e) {
                            if (e)
                                for (; e = e.parentNode; )
                                    if (e === t)
                                        return !0;
                            return !1
                        }
                    ,
                    W = e ? function(t, e) {
                            if (t === e)
                                return O = !0,
                                    0;
                            var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
                            return i ? i : (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1,
                                1 & i || !T.sortDetached && e.compareDocumentPosition(t) === i ? t === $ || t.ownerDocument === B && F(B, t) ? -1 : e === $ || e.ownerDocument === B && F(B, e) ? 1 : A ? tt(A, t) - tt(A, e) : 0 : 4 & i ? -1 : 1)
                        }
                        : function(t, e) {
                            if (t === e)
                                return O = !0,
                                    0;
                            var i, n = 0, s = t.parentNode, r = e.parentNode, a = [t], l = [e];
                            if (!s || !r)
                                return t === $ ? -1 : e === $ ? 1 : s ? -1 : r ? 1 : A ? tt(A, t) - tt(A, e) : 0;
                            if (s === r)
                                return o(t, e);
                            for (i = t; i = i.parentNode; )
                                a.unshift(i);
                            for (i = e; i = i.parentNode; )
                                l.unshift(i);
                            for (; a[n] === l[n]; )
                                n++;
                            return n ? o(a[n], l[n]) : a[n] === B ? -1 : l[n] === B ? 1 : 0
                        }
                    ,
                    $) : $
            }
            ,
            e.matches = function(t, i) {
                return e(t, null, null, i)
            }
            ,
            e.matchesSelector = function(t, i) {
                if ((t.ownerDocument || t) !== $ && N(t),
                    i = i.replace(ct, "='$1']"),
                T.matchesSelector && M && !z[i + " "] && (!I || !I.test(i)) && (!R || !R.test(i)))
                    try {
                        var n = j.call(t, i);
                        if (n || T.disconnectedMatch || t.document && 11 !== t.document.nodeType)
                            return n
                    } catch (s) {}
                return e(i, $, null, [t]).length > 0
            }
            ,
            e.contains = function(t, e) {
                return (t.ownerDocument || t) !== $ && N(t),
                    F(t, e)
            }
            ,
            e.attr = function(t, e) {
                (t.ownerDocument || t) !== $ && N(t);
                var i = x.attrHandle[e.toLowerCase()]
                    , n = i && X.call(x.attrHandle, e.toLowerCase()) ? i(t, e, !M) : void 0;
                return void 0 !== n ? n : T.attributes || !M ? t.getAttribute(e) : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
            }
            ,
            e.escape = function(t) {
                return (t + "").replace(wt, Tt)
            }
            ,
            e.error = function(t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }
            ,
            e.uniqueSort = function(t) {
                var e, i = [], n = 0, s = 0;
                if (O = !T.detectDuplicates,
                    A = !T.sortStable && t.slice(0),
                    t.sort(W),
                    O) {
                    for (; e = t[s++]; )
                        e === t[s] && (n = i.push(s));
                    for (; n--; )
                        t.splice(i[n], 1)
                }
                return A = null,
                    t
            }
            ,
            S = e.getText = function(t) {
                var e, i = "", n = 0, s = t.nodeType;
                if (s) {
                    if (1 === s || 9 === s || 11 === s) {
                        if ("string" == typeof t.textContent)
                            return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling)
                            i += S(t)
                    } else if (3 === s || 4 === s)
                        return t.nodeValue
                } else
                    for (; e = t[n++]; )
                        i += S(e);
                return i
            }
            ,
            x = e.selectors = {
                cacheLength: 50,
                createPseudo: n,
                match: ft,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(t) {
                        return t[1] = t[1].replace(yt, bt),
                            t[3] = (t[3] || t[4] || t[5] || "").replace(yt, bt),
                        "~=" === t[2] && (t[3] = " " + t[3] + " "),
                            t.slice(0, 4)
                    },
                    CHILD: function(t) {
                        return t[1] = t[1].toLowerCase(),
                            "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]),
                                t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])),
                                t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]),
                            t
                    },
                    PSEUDO: function(t) {
                        var e, i = !t[6] && t[2];
                        return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && ut.test(i) && (e = L(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e),
                            t[2] = i.slice(0, e)),
                            t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(t) {
                        var e = t.replace(yt, bt).toLowerCase();
                        return "*" === t ? function() {
                                return !0
                            }
                            : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                    },
                    CLASS: function(t) {
                        var e = U[t + " "];
                        return e || (e = new RegExp("(^|" + it + ")" + t + "(" + it + "|$)")) && U(t, function(t) {
                            return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(t, i, n) {
                        return function(s) {
                            var r = e.attr(s, t);
                            return null == r ? "!=" === i : !i || (r += "",
                                "=" === i ? r === n : "!=" === i ? r !== n : "^=" === i ? n && 0 === r.indexOf(n) : "*=" === i ? n && r.indexOf(n) > -1 : "$=" === i ? n && r.slice(-n.length) === n : "~=" === i ? (" " + r.replace(ot, " ") + " ").indexOf(n) > -1 : "|=" === i && (r === n || r.slice(0, n.length + 1) === n + "-"))
                        }
                    },
                    CHILD: function(t, e, i, n, s) {
                        var r = "nth" !== t.slice(0, 3)
                            , o = "last" !== t.slice(-4)
                            , a = "of-type" === e;
                        return 1 === n && 0 === s ? function(t) {
                                return !!t.parentNode
                            }
                            : function(e, i, l) {
                                var h, c, u, d, f, p, m = r !== o ? "nextSibling" : "previousSibling", _ = e.parentNode, g = a && e.nodeName.toLowerCase(), v = !l && !a, y = !1;
                                if (_) {
                                    if (r) {
                                        for (; m; ) {
                                            for (d = e; d = d[m]; )
                                                if (a ? d.nodeName.toLowerCase() === g : 1 === d.nodeType)
                                                    return !1;
                                            p = m = "only" === t && !p && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (p = [o ? _.firstChild : _.lastChild],
                                    o && v) {
                                        for (d = _,
                                                 u = d[H] || (d[H] = {}),
                                                 c = u[d.uniqueID] || (u[d.uniqueID] = {}),
                                                 h = c[t] || [],
                                                 f = h[0] === Y && h[1],
                                                 y = f && h[2],
                                                 d = f && _.childNodes[f]; d = ++f && d && d[m] || (y = f = 0) || p.pop(); )
                                            if (1 === d.nodeType && ++y && d === e) {
                                                c[t] = [Y, f, y];
                                                break
                                            }
                                    } else if (v && (d = e,
                                        u = d[H] || (d[H] = {}),
                                        c = u[d.uniqueID] || (u[d.uniqueID] = {}),
                                        h = c[t] || [],
                                        f = h[0] === Y && h[1],
                                        y = f),
                                    y === !1)
                                        for (; (d = ++f && d && d[m] || (y = f = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== g : 1 !== d.nodeType) || !++y || (v && (u = d[H] || (d[H] = {}),
                                            c = u[d.uniqueID] || (u[d.uniqueID] = {}),
                                            c[t] = [Y, y]),
                                        d !== e)); )
                                            ;
                                    return y -= s,
                                    y === n || y % n === 0 && y / n >= 0
                                }
                            }
                    },
                    PSEUDO: function(t, i) {
                        var s, r = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return r[H] ? r(i) : r.length > 1 ? (s = [t, t, "", i],
                                x.setFilters.hasOwnProperty(t.toLowerCase()) ? n(function(t, e) {
                                    for (var n, s = r(t, i), o = s.length; o--; )
                                        n = tt(t, s[o]),
                                            t[n] = !(e[n] = s[o])
                                }) : function(t) {
                                    return r(t, 0, s)
                                }
                        ) : r
                    }
                },
                pseudos: {
                    not: n(function(t) {
                        var e = []
                            , i = []
                            , s = E(t.replace(at, "$1"));
                        return s[H] ? n(function(t, e, i, n) {
                            for (var r, o = s(t, null, n, []), a = t.length; a--; )
                                (r = o[a]) && (t[a] = !(e[a] = r))
                        }) : function(t, n, r) {
                            return e[0] = t,
                                s(e, null, r, i),
                                e[0] = null,
                                !i.pop()
                        }
                    }),
                    has: n(function(t) {
                        return function(i) {
                            return e(t, i).length > 0
                        }
                    }),
                    contains: n(function(t) {
                        return t = t.replace(yt, bt),
                            function(e) {
                                return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
                            }
                    }),
                    lang: n(function(t) {
                        return dt.test(t || "") || e.error("unsupported lang: " + t),
                            t = t.replace(yt, bt).toLowerCase(),
                            function(e) {
                                var i;
                                do
                                    if (i = M ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                        return i = i.toLowerCase(),
                                        i === t || 0 === i.indexOf(t + "-");
                                while ((e = e.parentNode) && 1 === e.nodeType);return !1
                            }
                    }),
                    target: function(e) {
                        var i = t.location && t.location.hash;
                        return i && i.slice(1) === e.id
                    },
                    root: function(t) {
                        return t === D
                    },
                    focus: function(t) {
                        return t === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    },
                    enabled: h(!1),
                    disabled: h(!0),
                    checked: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    },
                    selected: function(t) {
                        return t.parentNode && t.parentNode.selectedIndex,
                        t.selected === !0
                    },
                    empty: function(t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(t) {
                        return !x.pseudos.empty(t)
                    },
                    header: function(t) {
                        return mt.test(t.nodeName)
                    },
                    input: function(t) {
                        return pt.test(t.nodeName)
                    },
                    button: function(t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    },
                    text: function(t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(t, e) {
                        return [e - 1]
                    }),
                    eq: c(function(t, e, i) {
                        return [i < 0 ? i + e : i]
                    }),
                    even: c(function(t, e) {
                        for (var i = 0; i < e; i += 2)
                            t.push(i);
                        return t
                    }),
                    odd: c(function(t, e) {
                        for (var i = 1; i < e; i += 2)
                            t.push(i);
                        return t
                    }),
                    lt: c(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; --n >= 0; )
                            t.push(n);
                        return t
                    }),
                    gt: c(function(t, e, i) {
                        for (var n = i < 0 ? i + e : i; ++n < e; )
                            t.push(n);
                        return t
                    })
                }
            },
            x.pseudos.nth = x.pseudos.eq;
        for (w in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            x.pseudos[w] = a(w);
        for (w in {
            submit: !0,
            reset: !0
        })
            x.pseudos[w] = l(w);
        return d.prototype = x.filters = x.pseudos,
            x.setFilters = new d,
            L = e.tokenize = function(t, i) {
                var n, s, r, o, a, l, h, c = q[t + " "];
                if (c)
                    return i ? 0 : c.slice(0);
                for (a = t,
                         l = [],
                         h = x.preFilter; a; ) {
                    n && !(s = lt.exec(a)) || (s && (a = a.slice(s[0].length) || a),
                        l.push(r = [])),
                        n = !1,
                    (s = ht.exec(a)) && (n = s.shift(),
                        r.push({
                            value: n,
                            type: s[0].replace(at, " ")
                        }),
                        a = a.slice(n.length));
                    for (o in x.filter)
                        !(s = ft[o].exec(a)) || h[o] && !(s = h[o](s)) || (n = s.shift(),
                            r.push({
                                value: n,
                                type: o,
                                matches: s
                            }),
                            a = a.slice(n.length));
                    if (!n)
                        break
                }
                return i ? a.length : a ? e.error(t) : q(t, l).slice(0)
            }
            ,
            E = e.compile = function(t, e) {
                var i, n = [], s = [], r = z[t + " "];
                if (!r) {
                    for (e || (e = L(t)),
                             i = e.length; i--; )
                        r = y(e[i]),
                            r[H] ? n.push(r) : s.push(r);
                    r = z(t, b(s, n)),
                        r.selector = t
                }
                return r
            }
            ,
            k = e.select = function(t, e, i, n) {
                var s, r, o, a, l, h = "function" == typeof t && t, c = !n && L(t = h.selector || t);
                if (i = i || [],
                1 === c.length) {
                    if (r = c[0] = c[0].slice(0),
                    r.length > 2 && "ID" === (o = r[0]).type && T.getById && 9 === e.nodeType && M && x.relative[r[1].type]) {
                        if (e = (x.find.ID(o.matches[0].replace(yt, bt), e) || [])[0],
                            !e)
                            return i;
                        h && (e = e.parentNode),
                            t = t.slice(r.shift().value.length)
                    }
                    for (s = ft.needsContext.test(t) ? 0 : r.length; s-- && (o = r[s],
                        !x.relative[a = o.type]); )
                        if ((l = x.find[a]) && (n = l(o.matches[0].replace(yt, bt), vt.test(r[0].type) && u(e.parentNode) || e))) {
                            if (r.splice(s, 1),
                                t = n.length && f(r),
                                !t)
                                return Z.apply(i, n),
                                    i;
                            break
                        }
                }
                return (h || E(t, c))(n, e, !M, i, !e || vt.test(t) && u(e.parentNode) || e),
                    i
            }
            ,
            T.sortStable = H.split("").sort(W).join("") === H,
            T.detectDuplicates = !!O,
            N(),
            T.sortDetached = s(function(t) {
                return 1 & t.compareDocumentPosition($.createElement("fieldset"))
            }),
        s(function(t) {
            return t.innerHTML = "<a href='#'></a>",
            "#" === t.firstChild.getAttribute("href")
        }) || r("type|href|height|width", function(t, e, i) {
            if (!i)
                return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }),
        T.attributes && s(function(t) {
            return t.innerHTML = "<input/>",
                t.firstChild.setAttribute("value", ""),
            "" === t.firstChild.getAttribute("value")
        }) || r("value", function(t, e, i) {
            if (!i && "input" === t.nodeName.toLowerCase())
                return t.defaultValue
        }),
        s(function(t) {
            return null == t.getAttribute("disabled")
        }) || r(et, function(t, e, i) {
            var n;
            if (!i)
                return t[e] === !0 ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }),
            e
    }(t);
    dt.find = gt,
        dt.expr = gt.selectors,
        dt.expr[":"] = dt.expr.pseudos,
        dt.uniqueSort = dt.unique = gt.uniqueSort,
        dt.text = gt.getText,
        dt.isXMLDoc = gt.isXML,
        dt.contains = gt.contains,
        dt.escapeSelector = gt.escape;
    var vt = function(t, e, i) {
        for (var n = [], s = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
            if (1 === t.nodeType) {
                if (s && dt(t).is(i))
                    break;
                n.push(t)
            }
        return n
    }
        , yt = function(t, e) {
        for (var i = []; t; t = t.nextSibling)
            1 === t.nodeType && t !== e && i.push(t);
        return i
    }
        , bt = dt.expr.match.needsContext
        , wt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
        , Tt = /^.[^:#\[\.,]*$/;
    dt.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"),
            1 === e.length && 1 === n.nodeType ? dt.find.matchesSelector(n, t) ? [n] : [] : dt.find.matches(t, dt.grep(e, function(t) {
                return 1 === t.nodeType
            }))
    }
        ,
        dt.fn.extend({
            find: function(t) {
                var e, i, n = this.length, s = this;
                if ("string" != typeof t)
                    return this.pushStack(dt(t).filter(function() {
                        for (e = 0; e < n; e++)
                            if (dt.contains(s[e], this))
                                return !0
                    }));
                for (i = this.pushStack([]),
                         e = 0; e < n; e++)
                    dt.find(t, s[e], i);
                return n > 1 ? dt.uniqueSort(i) : i
            },
            filter: function(t) {
                return this.pushStack(s(this, t || [], !1))
            },
            not: function(t) {
                return this.pushStack(s(this, t || [], !0))
            },
            is: function(t) {
                return !!s(this, "string" == typeof t && bt.test(t) ? dt(t) : t || [], !1).length
            }
        });
    var xt, St = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, Ct = dt.fn.init = function(t, e, i) {
            var n, s;
            if (!t)
                return this;
            if (i = i || xt,
            "string" == typeof t) {
                if (n = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : St.exec(t),
                !n || !n[1] && e)
                    return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
                if (n[1]) {
                    if (e = e instanceof dt ? e[0] : e,
                        dt.merge(this, dt.parseHTML(n[1], e && e.nodeType ? e.ownerDocument || e : K, !0)),
                    wt.test(n[1]) && dt.isPlainObject(e))
                        for (n in e)
                            dt.isFunction(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                    return this
                }
                return s = K.getElementById(n[2]),
                s && (this[0] = s,
                    this.length = 1),
                    this
            }
            return t.nodeType ? (this[0] = t,
                this.length = 1,
                this) : dt.isFunction(t) ? void 0 !== i.ready ? i.ready(t) : t(dt) : dt.makeArray(t, this)
        }
    ;
    Ct.prototype = dt.fn,
        xt = dt(K);
    var Lt = /^(?:parents|prev(?:Until|All))/
        , Et = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    dt.fn.extend({
        has: function(t) {
            var e = dt(t, this)
                , i = e.length;
            return this.filter(function() {
                for (var t = 0; t < i; t++)
                    if (dt.contains(this, e[t]))
                        return !0
            })
        },
        closest: function(t, e) {
            var i, n = 0, s = this.length, r = [], o = "string" != typeof t && dt(t);
            if (!bt.test(t))
                for (; n < s; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (o ? o.index(i) > -1 : 1 === i.nodeType && dt.find.matchesSelector(i, t))) {
                            r.push(i);
                            break
                        }
            return this.pushStack(r.length > 1 ? dt.uniqueSort(r) : r)
        },
        index: function(t) {
            return t ? "string" == typeof t ? st.call(dt(t), this[0]) : st.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(dt.uniqueSort(dt.merge(this.get(), dt(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }),
        dt.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return vt(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return vt(t, "parentNode", i)
            },
            next: function(t) {
                return r(t, "nextSibling")
            },
            prev: function(t) {
                return r(t, "previousSibling")
            },
            nextAll: function(t) {
                return vt(t, "nextSibling")
            },
            prevAll: function(t) {
                return vt(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return vt(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return vt(t, "previousSibling", i)
            },
            siblings: function(t) {
                return yt((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return yt(t.firstChild)
            },
            contents: function(t) {
                return t.contentDocument || dt.merge([], t.childNodes)
            }
        }, function(t, e) {
            dt.fn[t] = function(i, n) {
                var s = dt.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i),
                n && "string" == typeof n && (s = dt.filter(n, s)),
                this.length > 1 && (Et[t] || dt.uniqueSort(s),
                Lt.test(t) && s.reverse()),
                    this.pushStack(s)
            }
        });
    var kt = /\S+/g;
    dt.Callbacks = function(t) {
        t = "string" == typeof t ? o(t) : dt.extend({}, t);
        var e, i, n, s, r = [], a = [], l = -1, h = function() {
            for (s = t.once,
                     n = e = !0; a.length; l = -1)
                for (i = a.shift(); ++l < r.length; )
                    r[l].apply(i[0], i[1]) === !1 && t.stopOnFalse && (l = r.length,
                        i = !1);
            t.memory || (i = !1),
                e = !1,
            s && (r = i ? [] : "")
        }, c = {
            add: function() {
                return r && (i && !e && (l = r.length - 1,
                    a.push(i)),
                    function n(e) {
                        dt.each(e, function(e, i) {
                            dt.isFunction(i) ? t.unique && c.has(i) || r.push(i) : i && i.length && "string" !== dt.type(i) && n(i)
                        })
                    }(arguments),
                i && !e && h()),
                    this
            },
            remove: function() {
                return dt.each(arguments, function(t, e) {
                    for (var i; (i = dt.inArray(e, r, i)) > -1; )
                        r.splice(i, 1),
                        i <= l && l--
                }),
                    this
            },
            has: function(t) {
                return t ? dt.inArray(t, r) > -1 : r.length > 0
            },
            empty: function() {
                return r && (r = []),
                    this
            },
            disable: function() {
                return s = a = [],
                    r = i = "",
                    this
            },
            disabled: function() {
                return !r
            },
            lock: function() {
                return s = a = [],
                i || e || (r = i = ""),
                    this
            },
            locked: function() {
                return !!s
            },
            fireWith: function(t, i) {
                return s || (i = i || [],
                    i = [t, i.slice ? i.slice() : i],
                    a.push(i),
                e || h()),
                    this
            },
            fire: function() {
                return c.fireWith(this, arguments),
                    this
            },
            fired: function() {
                return !!n
            }
        };
        return c
    }
        ,
        dt.extend({
            Deferred: function(e) {
                var i = [["notify", "progress", dt.Callbacks("memory"), dt.Callbacks("memory"), 2], ["resolve", "done", dt.Callbacks("once memory"), dt.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", dt.Callbacks("once memory"), dt.Callbacks("once memory"), 1, "rejected"]]
                    , n = "pending"
                    , s = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return r.done(arguments).fail(arguments),
                            this
                    },
                    "catch": function(t) {
                        return s.then(null, t)
                    },
                    pipe: function() {
                        var t = arguments;
                        return dt.Deferred(function(e) {
                            dt.each(i, function(i, n) {
                                var s = dt.isFunction(t[n[4]]) && t[n[4]];
                                r[n[1]](function() {
                                    var t = s && s.apply(this, arguments);
                                    t && dt.isFunction(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + "With"](this, s ? [t] : arguments)
                                })
                            }),
                                t = null
                        }).promise()
                    },
                    then: function(e, n, s) {
                        function r(e, i, n, s) {
                            return function() {
                                var h = this
                                    , c = arguments
                                    , u = function() {
                                        var t, u;
                                        if (!(e < o)) {
                                            if (t = n.apply(h, c),
                                            t === i.promise())
                                                throw new TypeError("Thenable self-resolution");
                                            u = t && ("object" == typeof t || "function" == typeof t) && t.then,
                                                dt.isFunction(u) ? s ? u.call(t, r(o, i, a, s), r(o, i, l, s)) : (o++,
                                                    u.call(t, r(o, i, a, s), r(o, i, l, s), r(o, i, a, i.notifyWith))) : (n !== a && (h = void 0,
                                                    c = [t]),
                                                    (s || i.resolveWith)(h, c))
                                        }
                                    }
                                    , d = s ? u : function() {
                                        try {
                                            u()
                                        } catch (t) {
                                            dt.Deferred.exceptionHook && dt.Deferred.exceptionHook(t, d.stackTrace),
                                            e + 1 >= o && (n !== l && (h = void 0,
                                                c = [t]),
                                                i.rejectWith(h, c))
                                        }
                                    }
                                ;
                                e ? d() : (dt.Deferred.getStackHook && (d.stackTrace = dt.Deferred.getStackHook()),
                                    t.setTimeout(d))
                            }
                        }
                        var o = 0;
                        return dt.Deferred(function(t) {
                            i[0][3].add(r(0, t, dt.isFunction(s) ? s : a, t.notifyWith)),
                                i[1][3].add(r(0, t, dt.isFunction(e) ? e : a)),
                                i[2][3].add(r(0, t, dt.isFunction(n) ? n : l))
                        }).promise()
                    },
                    promise: function(t) {
                        return null != t ? dt.extend(t, s) : s
                    }
                }
                    , r = {};
                return dt.each(i, function(t, e) {
                    var o = e[2]
                        , a = e[5];
                    s[e[1]] = o.add,
                    a && o.add(function() {
                        n = a
                    }, i[3 - t][2].disable, i[0][2].lock),
                        o.add(e[3].fire),
                        r[e[0]] = function() {
                            return r[e[0] + "With"](this === r ? void 0 : this, arguments),
                                this
                        }
                        ,
                        r[e[0] + "With"] = o.fireWith
                }),
                    s.promise(r),
                e && e.call(r, r),
                    r
            },
            when: function(t) {
                var e = arguments.length
                    , i = e
                    , n = Array(i)
                    , s = et.call(arguments)
                    , r = dt.Deferred()
                    , o = function(t) {
                    return function(i) {
                        n[t] = this,
                            s[t] = arguments.length > 1 ? et.call(arguments) : i,
                        --e || r.resolveWith(n, s)
                    }
                };
                if (e <= 1 && (h(t, r.done(o(i)).resolve, r.reject),
                "pending" === r.state() || dt.isFunction(s[i] && s[i].then)))
                    return r.then();
                for (; i--; )
                    h(s[i], o(i), r.reject);
                return r.promise()
            }
        });
    var Pt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    dt.Deferred.exceptionHook = function(e, i) {
        t.console && t.console.warn && e && Pt.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i)
    }
    ;
    var At = dt.Deferred();
    dt.fn.ready = function(t) {
        return At.then(t),
            this
    }
        ,
        dt.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(t) {
                t ? dt.readyWait++ : dt.ready(!0)
            },
            ready: function(t) {
                (t === !0 ? --dt.readyWait : dt.isReady) || (dt.isReady = !0,
                t !== !0 && --dt.readyWait > 0 || At.resolveWith(K, [dt]))
            }
        }),
        dt.ready.then = At.then,
        "complete" === K.readyState || "loading" !== K.readyState && !K.documentElement.doScroll ? t.setTimeout(dt.ready) : (K.addEventListener("DOMContentLoaded", c),
            t.addEventListener("load", c));
    var Ot = function(t, e, i, n, s, r, o) {
        var a = 0
            , l = t.length
            , h = null == i;
        if ("object" === dt.type(i)) {
            s = !0;
            for (a in i)
                Ot(t, e, a, i[a], !0, r, o)
        } else if (void 0 !== n && (s = !0,
        dt.isFunction(n) || (o = !0),
        h && (o ? (e.call(t, n),
            e = null) : (h = e,
                e = function(t, e, i) {
                    return h.call(dt(t), i)
                }
        )),
            e))
            for (; a < l; a++)
                e(t[a], i, o ? n : n.call(t[a], a, e(t[a], i)));
        return s ? t : h ? e.call(t) : l ? e(t[0], i) : r
    }
        , Nt = function(t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
    };
    u.uid = 1,
        u.prototype = {
            cache: function(t) {
                var e = t[this.expando];
                return e || (e = {},
                Nt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))),
                    e
            },
            set: function(t, e, i) {
                var n, s = this.cache(t);
                if ("string" == typeof e)
                    s[dt.camelCase(e)] = i;
                else
                    for (n in e)
                        s[dt.camelCase(n)] = e[n];
                return s
            },
            get: function(t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][dt.camelCase(e)]
            },
            access: function(t, e, i) {
                return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i),
                    void 0 !== i ? i : e)
            },
            remove: function(t, e) {
                var i, n = t[this.expando];
                if (void 0 !== n) {
                    if (void 0 !== e) {
                        dt.isArray(e) ? e = e.map(dt.camelCase) : (e = dt.camelCase(e),
                            e = e in n ? [e] : e.match(kt) || []),
                            i = e.length;
                        for (; i--; )
                            delete n[e[i]]
                    }
                    (void 0 === e || dt.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            },
            hasData: function(t) {
                var e = t[this.expando];
                return void 0 !== e && !dt.isEmptyObject(e)
            }
        };
    var $t = new u
        , Dt = new u
        , Mt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
        , Rt = /[A-Z]/g;
    dt.extend({
        hasData: function(t) {
            return Dt.hasData(t) || $t.hasData(t)
        },
        data: function(t, e, i) {
            return Dt.access(t, e, i)
        },
        removeData: function(t, e) {
            Dt.remove(t, e)
        },
        _data: function(t, e, i) {
            return $t.access(t, e, i)
        },
        _removeData: function(t, e) {
            $t.remove(t, e)
        }
    }),
        dt.fn.extend({
            data: function(t, e) {
                var i, n, s, r = this[0], o = r && r.attributes;
                if (void 0 === t) {
                    if (this.length && (s = Dt.get(r),
                    1 === r.nodeType && !$t.get(r, "hasDataAttrs"))) {
                        for (i = o.length; i--; )
                            o[i] && (n = o[i].name,
                            0 === n.indexOf("data-") && (n = dt.camelCase(n.slice(5)),
                                d(r, n, s[n])));
                        $t.set(r, "hasDataAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof t ? this.each(function() {
                    Dt.set(this, t)
                }) : Ot(this, function(e) {
                    var i;
                    if (r && void 0 === e) {
                        if (i = Dt.get(r, t),
                        void 0 !== i)
                            return i;
                        if (i = d(r, t),
                        void 0 !== i)
                            return i
                    } else
                        this.each(function() {
                            Dt.set(this, t, e)
                        })
                }, null, e, arguments.length > 1, null, !0)
            },
            removeData: function(t) {
                return this.each(function() {
                    Dt.remove(this, t)
                })
            }
        }),
        dt.extend({
            queue: function(t, e, i) {
                var n;
                if (t)
                    return e = (e || "fx") + "queue",
                        n = $t.get(t, e),
                    i && (!n || dt.isArray(i) ? n = $t.access(t, e, dt.makeArray(i)) : n.push(i)),
                    n || []
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = dt.queue(t, e)
                    , n = i.length
                    , s = i.shift()
                    , r = dt._queueHooks(t, e)
                    , o = function() {
                    dt.dequeue(t, e)
                };
                "inprogress" === s && (s = i.shift(),
                    n--),
                s && ("fx" === e && i.unshift("inprogress"),
                    delete r.stop,
                    s.call(t, o, r)),
                !n && r && r.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return $t.get(t, i) || $t.access(t, i, {
                    empty: dt.Callbacks("once memory").add(function() {
                        $t.remove(t, [e + "queue", i])
                    })
                })
            }
        }),
        dt.fn.extend({
            queue: function(t, e) {
                var i = 2;
                return "string" != typeof t && (e = t,
                    t = "fx",
                    i--),
                    arguments.length < i ? dt.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                        var i = dt.queue(this, t, e);
                        dt._queueHooks(this, t),
                        "fx" === t && "inprogress" !== i[0] && dt.dequeue(this, t)
                    })
            },
            dequeue: function(t) {
                return this.each(function() {
                    dt.dequeue(this, t)
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, e) {
                var i, n = 1, s = dt.Deferred(), r = this, o = this.length, a = function() {
                    --n || s.resolveWith(r, [r])
                };
                for ("string" != typeof t && (e = t,
                    t = void 0),
                         t = t || "fx"; o--; )
                    i = $t.get(r[o], t + "queueHooks"),
                    i && i.empty && (n++,
                        i.empty.add(a));
                return a(),
                    s.promise(e)
            }
        });
    var It = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
        , jt = new RegExp("^(?:([+-])=|)(" + It + ")([a-z%]*)$","i")
        , Ft = ["Top", "Right", "Bottom", "Left"]
        , Ht = function(t, e) {
        return t = e || t,
        "none" === t.style.display || "" === t.style.display && dt.contains(t.ownerDocument, t) && "none" === dt.css(t, "display")
    }
        , Bt = function(t, e, i, n) {
        var s, r, o = {};
        for (r in e)
            o[r] = t.style[r],
                t.style[r] = e[r];
        s = i.apply(t, n || []);
        for (r in e)
            t.style[r] = o[r];
        return s
    }
        , Yt = {};
    dt.fn.extend({
        show: function() {
            return m(this, !0)
        },
        hide: function() {
            return m(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                Ht(this) ? dt(this).show() : dt(this).hide()
            })
        }
    });
    var Vt = /^(?:checkbox|radio)$/i
        , Ut = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i
        , qt = /^$|\/(?:java|ecma)script/i
        , zt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    zt.optgroup = zt.option,
        zt.tbody = zt.tfoot = zt.colgroup = zt.caption = zt.thead,
        zt.th = zt.td;
    var Wt = /<|&#?\w+;/;
    !function() {
        var t = K.createDocumentFragment()
            , e = t.appendChild(K.createElement("div"))
            , i = K.createElement("input");
        i.setAttribute("type", "radio"),
            i.setAttribute("checked", "checked"),
            i.setAttribute("name", "t"),
            e.appendChild(i),
            ct.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked,
            e.innerHTML = "<textarea>x</textarea>",
            ct.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
    }();
    var Xt = K.documentElement
        , Gt = /^key/
        , Jt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
        , Qt = /^([^.]*)(?:\.(.+)|)/;
    dt.event = {
        global: {},
        add: function(t, e, i, n, s) {
            var r, o, a, l, h, c, u, d, f, p, m, _ = $t.get(t);
            if (_)
                for (i.handler && (r = i,
                    i = r.handler,
                    s = r.selector),
                     s && dt.find.matchesSelector(Xt, s),
                     i.guid || (i.guid = dt.guid++),
                     (l = _.events) || (l = _.events = {}),
                     (o = _.handle) || (o = _.handle = function(e) {
                             return "undefined" != typeof dt && dt.event.triggered !== e.type ? dt.event.dispatch.apply(t, arguments) : void 0
                         }
                     ),
                         e = (e || "").match(kt) || [""],
                         h = e.length; h--; )
                    a = Qt.exec(e[h]) || [],
                        f = m = a[1],
                        p = (a[2] || "").split(".").sort(),
                    f && (u = dt.event.special[f] || {},
                        f = (s ? u.delegateType : u.bindType) || f,
                        u = dt.event.special[f] || {},
                        c = dt.extend({
                            type: f,
                            origType: m,
                            data: n,
                            handler: i,
                            guid: i.guid,
                            selector: s,
                            needsContext: s && dt.expr.match.needsContext.test(s),
                            namespace: p.join(".")
                        }, r),
                    (d = l[f]) || (d = l[f] = [],
                        d.delegateCount = 0,
                    u.setup && u.setup.call(t, n, p, o) !== !1 || t.addEventListener && t.addEventListener(f, o)),
                    u.add && (u.add.call(t, c),
                    c.handler.guid || (c.handler.guid = i.guid)),
                        s ? d.splice(d.delegateCount++, 0, c) : d.push(c),
                        dt.event.global[f] = !0)
        },
        remove: function(t, e, i, n, s) {
            var r, o, a, l, h, c, u, d, f, p, m, _ = $t.hasData(t) && $t.get(t);
            if (_ && (l = _.events)) {
                for (e = (e || "").match(kt) || [""],
                         h = e.length; h--; )
                    if (a = Qt.exec(e[h]) || [],
                        f = m = a[1],
                        p = (a[2] || "").split(".").sort(),
                        f) {
                        for (u = dt.event.special[f] || {},
                                 f = (n ? u.delegateType : u.bindType) || f,
                                 d = l[f] || [],
                                 a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                                 o = r = d.length; r--; )
                            c = d[r],
                            !s && m !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (d.splice(r, 1),
                            c.selector && d.delegateCount--,
                            u.remove && u.remove.call(t, c));
                        o && !d.length && (u.teardown && u.teardown.call(t, p, _.handle) !== !1 || dt.removeEvent(t, f, _.handle),
                            delete l[f])
                    } else
                        for (f in l)
                            dt.event.remove(t, f + e[h], i, n, !0);
                dt.isEmptyObject(l) && $t.remove(t, "handle events")
            }
        },
        dispatch: function(t) {
            var e, i, n, s, r, o, a = dt.event.fix(t), l = new Array(arguments.length), h = ($t.get(this, "events") || {})[a.type] || [], c = dt.event.special[a.type] || {};
            for (l[0] = a,
                     e = 1; e < arguments.length; e++)
                l[e] = arguments[e];
            if (a.delegateTarget = this,
            !c.preDispatch || c.preDispatch.call(this, a) !== !1) {
                for (o = dt.event.handlers.call(this, a, h),
                         e = 0; (s = o[e++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = s.elem,
                             i = 0; (r = s.handlers[i++]) && !a.isImmediatePropagationStopped(); )
                        a.rnamespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r,
                            a.data = r.data,
                            n = ((dt.event.special[r.origType] || {}).handle || r.handler).apply(s.elem, l),
                        void 0 !== n && (a.result = n) === !1 && (a.preventDefault(),
                            a.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, a),
                    a.result
            }
        },
        handlers: function(t, e) {
            var i, n, s, r, o = [], a = e.delegateCount, l = t.target;
            if (a && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                        for (n = [],
                                 i = 0; i < a; i++)
                            r = e[i],
                                s = r.selector + " ",
                            void 0 === n[s] && (n[s] = r.needsContext ? dt(s, this).index(l) > -1 : dt.find(s, this, null, [l]).length),
                            n[s] && n.push(r);
                        n.length && o.push({
                            elem: l,
                            handlers: n
                        })
                    }
            return a < e.length && o.push({
                elem: this,
                handlers: e.slice(a)
            }),
                o
        },
        addProp: function(t, e) {
            Object.defineProperty(dt.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: dt.isFunction(e) ? function() {
                        if (this.originalEvent)
                            return e(this.originalEvent)
                    }
                    : function() {
                        if (this.originalEvent)
                            return this.originalEvent[t]
                    }
                ,
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(t) {
            return t[dt.expando] ? t : new dt.Event(t)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== w() && this.focus)
                        return this.focus(),
                            !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === w() && this.blur)
                        return this.blur(),
                            !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && dt.nodeName(this, "input"))
                        return this.click(),
                            !1
                },
                _default: function(t) {
                    return dt.nodeName(t.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        }
    },
        dt.removeEvent = function(t, e, i) {
            t.removeEventListener && t.removeEventListener(e, i)
        }
        ,
        dt.Event = function(t, e) {
            return this instanceof dt.Event ? (t && t.type ? (this.originalEvent = t,
                this.type = t.type,
                this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? y : b,
                this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target,
                this.currentTarget = t.currentTarget,
                this.relatedTarget = t.relatedTarget) : this.type = t,
            e && dt.extend(this, e),
                this.timeStamp = t && t.timeStamp || dt.now(),
                void (this[dt.expando] = !0)) : new dt.Event(t,e)
        }
        ,
        dt.Event.prototype = {
            constructor: dt.Event,
            isDefaultPrevented: b,
            isPropagationStopped: b,
            isImmediatePropagationStopped: b,
            isSimulated: !1,
            preventDefault: function() {
                var t = this.originalEvent;
                this.isDefaultPrevented = y,
                t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function() {
                var t = this.originalEvent;
                this.isPropagationStopped = y,
                t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = y,
                t && !this.isSimulated && t.stopImmediatePropagation(),
                    this.stopPropagation()
            }
        },
        dt.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(t) {
                var e = t.button;
                return null == t.which && Gt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Jt.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
            }
        }, dt.event.addProp),
        dt.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(t, e) {
            dt.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function(t) {
                    var i, n = this, s = t.relatedTarget, r = t.handleObj;
                    return s && (s === n || dt.contains(n, s)) || (t.type = r.origType,
                        i = r.handler.apply(this, arguments),
                        t.type = e),
                        i
                }
            }
        }),
        dt.fn.extend({
            on: function(t, e, i, n) {
                return T(this, t, e, i, n)
            },
            one: function(t, e, i, n) {
                return T(this, t, e, i, n, 1)
            },
            off: function(t, e, i) {
                var n, s;
                if (t && t.preventDefault && t.handleObj)
                    return n = t.handleObj,
                        dt(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler),
                        this;
                if ("object" == typeof t) {
                    for (s in t)
                        this.off(s, e, t[s]);
                    return this
                }
                return e !== !1 && "function" != typeof e || (i = e,
                    e = void 0),
                i === !1 && (i = b),
                    this.each(function() {
                        dt.event.remove(this, t, i, e)
                    })
            }
        });
    var Zt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
        , Kt = /<script|<style|<link/i
        , te = /checked\s*(?:[^=]|=\s*.checked.)/i
        , ee = /^true\/(.*)/
        , ie = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    dt.extend({
        htmlPrefilter: function(t) {
            return t.replace(Zt, "<$1></$2>")
        },
        clone: function(t, e, i) {
            var n, s, r, o, a = t.cloneNode(!0), l = dt.contains(t.ownerDocument, t);
            if (!(ct.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || dt.isXMLDoc(t)))
                for (o = _(a),
                         r = _(t),
                         n = 0,
                         s = r.length; n < s; n++)
                    E(r[n], o[n]);
            if (e)
                if (i)
                    for (r = r || _(t),
                             o = o || _(a),
                             n = 0,
                             s = r.length; n < s; n++)
                        L(r[n], o[n]);
                else
                    L(t, a);
            return o = _(a, "script"),
            o.length > 0 && g(o, !l && _(t, "script")),
                a
        },
        cleanData: function(t) {
            for (var e, i, n, s = dt.event.special, r = 0; void 0 !== (i = t[r]); r++)
                if (Nt(i)) {
                    if (e = i[$t.expando]) {
                        if (e.events)
                            for (n in e.events)
                                s[n] ? dt.event.remove(i, n) : dt.removeEvent(i, n, e.handle);
                        i[$t.expando] = void 0
                    }
                    i[Dt.expando] && (i[Dt.expando] = void 0)
                }
        }
    }),
        dt.fn.extend({
            detach: function(t) {
                return P(this, t, !0)
            },
            remove: function(t) {
                return P(this, t)
            },
            text: function(t) {
                return Ot(this, function(t) {
                    return void 0 === t ? dt.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            },
            append: function() {
                return k(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = x(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return k(this, arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = x(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return k(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return k(this, arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++)
                    1 === t.nodeType && (dt.cleanData(_(t, !1)),
                        t.textContent = "");
                return this
            },
            clone: function(t, e) {
                return t = null != t && t,
                    e = null == e ? t : e,
                    this.map(function() {
                        return dt.clone(this, t, e)
                    })
            },
            html: function(t) {
                return Ot(this, function(t) {
                    var e = this[0] || {}
                        , i = 0
                        , n = this.length;
                    if (void 0 === t && 1 === e.nodeType)
                        return e.innerHTML;
                    if ("string" == typeof t && !Kt.test(t) && !zt[(Ut.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = dt.htmlPrefilter(t);
                        try {
                            for (; i < n; i++)
                                e = this[i] || {},
                                1 === e.nodeType && (dt.cleanData(_(e, !1)),
                                    e.innerHTML = t);
                            e = 0
                        } catch (s) {}
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = [];
                return k(this, arguments, function(e) {
                    var i = this.parentNode;
                    dt.inArray(this, t) < 0 && (dt.cleanData(_(this)),
                    i && i.replaceChild(e, this))
                }, t)
            }
        }),
        dt.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            dt.fn[t] = function(t) {
                for (var i, n = [], s = dt(t), r = s.length - 1, o = 0; o <= r; o++)
                    i = o === r ? this : this.clone(!0),
                        dt(s[o])[e](i),
                        nt.apply(n, i.get());
                return this.pushStack(n)
            }
        });
    var ne = /^margin/
        , se = new RegExp("^(" + It + ")(?!px)[a-z%]+$","i")
        , re = function(e) {
        var i = e.ownerDocument.defaultView;
        return i && i.opener || (i = t),
            i.getComputedStyle(e)
    };
    !function() {
        function e() {
            if (a) {
                a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                    a.innerHTML = "",
                    Xt.appendChild(o);
                var e = t.getComputedStyle(a);
                i = "1%" !== e.top,
                    r = "2px" === e.marginLeft,
                    n = "4px" === e.width,
                    a.style.marginRight = "50%",
                    s = "4px" === e.marginRight,
                    Xt.removeChild(o),
                    a = null
            }
        }
        var i, n, s, r, o = K.createElement("div"), a = K.createElement("div");
        a.style && (a.style.backgroundClip = "content-box",
            a.cloneNode(!0).style.backgroundClip = "",
            ct.clearCloneStyle = "content-box" === a.style.backgroundClip,
            o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            o.appendChild(a),
            dt.extend(ct, {
                pixelPosition: function() {
                    return e(),
                        i
                },
                boxSizingReliable: function() {
                    return e(),
                        n
                },
                pixelMarginRight: function() {
                    return e(),
                        s
                },
                reliableMarginLeft: function() {
                    return e(),
                        r
                }
            }))
    }();
    var oe = /^(none|table(?!-c[ea]).+)/
        , ae = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
        , le = {
        letterSpacing: "0",
        fontWeight: "400"
    }
        , he = ["Webkit", "Moz", "ms"]
        , ce = K.createElement("div").style;
    dt.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = A(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var s, r, o, a = dt.camelCase(e), l = t.style;
                return e = dt.cssProps[a] || (dt.cssProps[a] = N(a) || a),
                    o = dt.cssHooks[e] || dt.cssHooks[a],
                    void 0 === i ? o && "get"in o && void 0 !== (s = o.get(t, !1, n)) ? s : l[e] : (r = typeof i,
                    "string" === r && (s = jt.exec(i)) && s[1] && (i = f(t, e, s),
                        r = "number"),
                    null != i && i === i && ("number" === r && (i += s && s[3] || (dt.cssNumber[a] ? "" : "px")),
                    ct.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (l[e] = "inherit"),
                    o && "set"in o && void 0 === (i = o.set(t, i, n)) || (l[e] = i)),
                        void 0)
            }
        },
        css: function(t, e, i, n) {
            var s, r, o, a = dt.camelCase(e);
            return e = dt.cssProps[a] || (dt.cssProps[a] = N(a) || a),
                o = dt.cssHooks[e] || dt.cssHooks[a],
            o && "get"in o && (s = o.get(t, !0, i)),
            void 0 === s && (s = A(t, e, n)),
            "normal" === s && e in le && (s = le[e]),
                "" === i || i ? (r = parseFloat(s),
                    i === !0 || isFinite(r) ? r || 0 : s) : s
        }
    }),
        dt.each(["height", "width"], function(t, e) {
            dt.cssHooks[e] = {
                get: function(t, i, n) {
                    if (i)
                        return !oe.test(dt.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? M(t, e, n) : Bt(t, ae, function() {
                            return M(t, e, n)
                        })
                },
                set: function(t, i, n) {
                    var s, r = n && re(t), o = n && D(t, e, n, "border-box" === dt.css(t, "boxSizing", !1, r), r);
                    return o && (s = jt.exec(i)) && "px" !== (s[3] || "px") && (t.style[e] = i,
                        i = dt.css(t, e)),
                        $(t, i, o)
                }
            }
        }),
        dt.cssHooks.marginLeft = O(ct.reliableMarginLeft, function(t, e) {
            if (e)
                return (parseFloat(A(t, "marginLeft")) || t.getBoundingClientRect().left - Bt(t, {
                    marginLeft: 0
                }, function() {
                    return t.getBoundingClientRect().left
                })) + "px"
        }),
        dt.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            dt.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, s = {}, r = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++)
                        s[t + Ft[n] + e] = r[n] || r[n - 2] || r[0];
                    return s
                }
            },
            ne.test(t) || (dt.cssHooks[t + e].set = $)
        }),
        dt.fn.extend({
            css: function(t, e) {
                return Ot(this, function(t, e, i) {
                    var n, s, r = {}, o = 0;
                    if (dt.isArray(e)) {
                        for (n = re(t),
                                 s = e.length; o < s; o++)
                            r[e[o]] = dt.css(t, e[o], !1, n);
                        return r
                    }
                    return void 0 !== i ? dt.style(t, e, i) : dt.css(t, e)
                }, t, e, arguments.length > 1)
            }
        }),
        dt.Tween = R,
        R.prototype = {
            constructor: R,
            init: function(t, e, i, n, s, r) {
                this.elem = t,
                    this.prop = i,
                    this.easing = s || dt.easing._default,
                    this.options = e,
                    this.start = this.now = this.cur(),
                    this.end = n,
                    this.unit = r || (dt.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = R.propHooks[this.prop];
                return t && t.get ? t.get(this) : R.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = R.propHooks[this.prop];
                return this.options.duration ? this.pos = e = dt.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t,
                    this.now = (this.end - this.start) * e + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                    i && i.set ? i.set(this) : R.propHooks._default.set(this),
                    this
            }
        },
        R.prototype.init.prototype = R.prototype,
        R.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = dt.css(t.elem, t.prop, ""),
                        e && "auto" !== e ? e : 0)
                },
                set: function(t) {
                    dt.fx.step[t.prop] ? dt.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[dt.cssProps[t.prop]] && !dt.cssHooks[t.prop] ? t.elem[t.prop] = t.now : dt.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        },
        R.propHooks.scrollTop = R.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        },
        dt.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            },
            _default: "swing"
        },
        dt.fx = R.prototype.init,
        dt.fx.step = {};
    var ue, de, fe = /^(?:toggle|show|hide)$/, pe = /queueHooks$/;
    dt.Animation = dt.extend(V, {
        tweeners: {
            "*": [function(t, e) {
                var i = this.createTween(t, e);
                return f(i.elem, t, jt.exec(e), i),
                    i
            }
            ]
        },
        tweener: function(t, e) {
            dt.isFunction(t) ? (e = t,
                t = ["*"]) : t = t.match(kt);
            for (var i, n = 0, s = t.length; n < s; n++)
                i = t[n],
                    V.tweeners[i] = V.tweeners[i] || [],
                    V.tweeners[i].unshift(e)
        },
        prefilters: [B],
        prefilter: function(t, e) {
            e ? V.prefilters.unshift(t) : V.prefilters.push(t)
        }
    }),
        dt.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? dt.extend({}, t) : {
                complete: i || !i && e || dt.isFunction(t) && t,
                duration: t,
                easing: i && e || e && !dt.isFunction(e) && e
            };
            return dt.fx.off || K.hidden ? n.duration = 0 : n.duration = "number" == typeof n.duration ? n.duration : n.duration in dt.fx.speeds ? dt.fx.speeds[n.duration] : dt.fx.speeds._default,
            null != n.queue && n.queue !== !0 || (n.queue = "fx"),
                n.old = n.complete,
                n.complete = function() {
                    dt.isFunction(n.old) && n.old.call(this),
                    n.queue && dt.dequeue(this, n.queue)
                }
                ,
                n
        }
        ,
        dt.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(Ht).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var s = dt.isEmptyObject(t)
                    , r = dt.speed(e, i, n)
                    , o = function() {
                    var e = V(this, dt.extend({}, t), r);
                    (s || $t.get(this, "finish")) && e.stop(!0)
                };
                return o.finish = o,
                    s || r.queue === !1 ? this.each(o) : this.queue(r.queue, o)
            },
            stop: function(t, e, i) {
                var n = function(t) {
                    var e = t.stop;
                    delete t.stop,
                        e(i)
                };
                return "string" != typeof t && (i = e,
                    e = t,
                    t = void 0),
                e && t !== !1 && this.queue(t || "fx", []),
                    this.each(function() {
                        var e = !0
                            , s = null != t && t + "queueHooks"
                            , r = dt.timers
                            , o = $t.get(this);
                        if (s)
                            o[s] && o[s].stop && n(o[s]);
                        else
                            for (s in o)
                                o[s] && o[s].stop && pe.test(s) && n(o[s]);
                        for (s = r.length; s--; )
                            r[s].elem !== this || null != t && r[s].queue !== t || (r[s].anim.stop(i),
                                e = !1,
                                r.splice(s, 1));
                        !e && i || dt.dequeue(this, t)
                    })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"),
                    this.each(function() {
                        var e, i = $t.get(this), n = i[t + "queue"], s = i[t + "queueHooks"], r = dt.timers, o = n ? n.length : 0;
                        for (i.finish = !0,
                                 dt.queue(this, t, []),
                             s && s.stop && s.stop.call(this, !0),
                                 e = r.length; e--; )
                            r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0),
                                r.splice(e, 1));
                        for (e = 0; e < o; e++)
                            n[e] && n[e].finish && n[e].finish.call(this);
                        delete i.finish
                    })
            }
        }),
        dt.each(["toggle", "show", "hide"], function(t, e) {
            var i = dt.fn[e];
            dt.fn[e] = function(t, n, s) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(F(e, !0), t, n, s)
            }
        }),
        dt.each({
            slideDown: F("show"),
            slideUp: F("hide"),
            slideToggle: F("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            dt.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }),
        dt.timers = [],
        dt.fx.tick = function() {
            var t, e = 0, i = dt.timers;
            for (ue = dt.now(); e < i.length; e++)
                t = i[e],
                t() || i[e] !== t || i.splice(e--, 1);
            i.length || dt.fx.stop(),
                ue = void 0
        }
        ,
        dt.fx.timer = function(t) {
            dt.timers.push(t),
                t() ? dt.fx.start() : dt.timers.pop()
        }
        ,
        dt.fx.interval = 13,
        dt.fx.start = function() {
            de || (de = t.requestAnimationFrame ? t.requestAnimationFrame(I) : t.setInterval(dt.fx.tick, dt.fx.interval))
        }
        ,
        dt.fx.stop = function() {
            t.cancelAnimationFrame ? t.cancelAnimationFrame(de) : t.clearInterval(de),
                de = null
        }
        ,
        dt.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        dt.fn.delay = function(e, i) {
            return e = dt.fx ? dt.fx.speeds[e] || e : e,
                i = i || "fx",
                this.queue(i, function(i, n) {
                    var s = t.setTimeout(i, e);
                    n.stop = function() {
                        t.clearTimeout(s)
                    }
                })
        }
        ,
        function() {
            var t = K.createElement("input")
                , e = K.createElement("select")
                , i = e.appendChild(K.createElement("option"));
            t.type = "checkbox",
                ct.checkOn = "" !== t.value,
                ct.optSelected = i.selected,
                t = K.createElement("input"),
                t.value = "t",
                t.type = "radio",
                ct.radioValue = "t" === t.value
        }();
    var me, _e = dt.expr.attrHandle;
    dt.fn.extend({
        attr: function(t, e) {
            return Ot(this, dt.attr, t, e, arguments.length > 1)
        },
        removeAttr: function(t) {
            return this.each(function() {
                dt.removeAttr(this, t)
            })
        }
    }),
        dt.extend({
            attr: function(t, e, i) {
                var n, s, r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r)
                    return "undefined" == typeof t.getAttribute ? dt.prop(t, e, i) : (1 === r && dt.isXMLDoc(t) || (s = dt.attrHooks[e.toLowerCase()] || (dt.expr.match.bool.test(e) ? me : void 0)),
                        void 0 !== i ? null === i ? void dt.removeAttr(t, e) : s && "set"in s && void 0 !== (n = s.set(t, i, e)) ? n : (t.setAttribute(e, i + ""),
                            i) : s && "get"in s && null !== (n = s.get(t, e)) ? n : (n = dt.find.attr(t, e),
                            null == n ? void 0 : n))
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!ct.radioValue && "radio" === e && dt.nodeName(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e),
                            i && (t.value = i),
                                e
                        }
                    }
                }
            },
            removeAttr: function(t, e) {
                var i, n = 0, s = e && e.match(kt);
                if (s && 1 === t.nodeType)
                    for (; i = s[n++]; )
                        t.removeAttribute(i)
            }
        }),
        me = {
            set: function(t, e, i) {
                return e === !1 ? dt.removeAttr(t, i) : t.setAttribute(i, i),
                    i
            }
        },
        dt.each(dt.expr.match.bool.source.match(/\w+/g), function(t, e) {
            var i = _e[e] || dt.find.attr;
            _e[e] = function(t, e, n) {
                var s, r, o = e.toLowerCase();
                return n || (r = _e[o],
                    _e[o] = s,
                    s = null != i(t, e, n) ? o : null,
                    _e[o] = r),
                    s
            }
        });
    var ge = /^(?:input|select|textarea|button)$/i
        , ve = /^(?:a|area)$/i;
    dt.fn.extend({
        prop: function(t, e) {
            return Ot(this, dt.prop, t, e, arguments.length > 1)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[dt.propFix[t] || t]
            })
        }
    }),
        dt.extend({
            prop: function(t, e, i) {
                var n, s, r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r)
                    return 1 === r && dt.isXMLDoc(t) || (e = dt.propFix[e] || e,
                        s = dt.propHooks[e]),
                        void 0 !== i ? s && "set"in s && void 0 !== (n = s.set(t, i, e)) ? n : t[e] = i : s && "get"in s && null !== (n = s.get(t, e)) ? n : t[e]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = dt.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : ge.test(t.nodeName) || ve.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }),
    ct.optSelected || (dt.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex,
                null
        },
        set: function(t) {
            var e = t.parentNode;
            e && (e.selectedIndex,
            e.parentNode && e.parentNode.selectedIndex)
        }
    }),
        dt.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            dt.propFix[this.toLowerCase()] = this
        });
    var ye = /[\t\r\n\f]/g;
    dt.fn.extend({
        addClass: function(t) {
            var e, i, n, s, r, o, a, l = 0;
            if (dt.isFunction(t))
                return this.each(function(e) {
                    dt(this).addClass(t.call(this, e, U(this)))
                });
            if ("string" == typeof t && t)
                for (e = t.match(kt) || []; i = this[l++]; )
                    if (s = U(i),
                        n = 1 === i.nodeType && (" " + s + " ").replace(ye, " ")) {
                        for (o = 0; r = e[o++]; )
                            n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                        a = dt.trim(n),
                        s !== a && i.setAttribute("class", a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, i, n, s, r, o, a, l = 0;
            if (dt.isFunction(t))
                return this.each(function(e) {
                    dt(this).removeClass(t.call(this, e, U(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(kt) || []; i = this[l++]; )
                    if (s = U(i),
                        n = 1 === i.nodeType && (" " + s + " ").replace(ye, " ")) {
                        for (o = 0; r = e[o++]; )
                            for (; n.indexOf(" " + r + " ") > -1; )
                                n = n.replace(" " + r + " ", " ");
                        a = dt.trim(n),
                        s !== a && i.setAttribute("class", a)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var i = typeof t;
            return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : dt.isFunction(t) ? this.each(function(i) {
                dt(this).toggleClass(t.call(this, i, U(this), e), e)
            }) : this.each(function() {
                var e, n, s, r;
                if ("string" === i)
                    for (n = 0,
                             s = dt(this),
                             r = t.match(kt) || []; e = r[n++]; )
                        s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
                else
                    void 0 !== t && "boolean" !== i || (e = U(this),
                    e && $t.set(this, "__className__", e),
                    this.setAttribute && this.setAttribute("class", e || t === !1 ? "" : $t.get(this, "__className__") || ""))
            })
        },
        hasClass: function(t) {
            var e, i, n = 0;
            for (e = " " + t + " "; i = this[n++]; )
                if (1 === i.nodeType && (" " + U(i) + " ").replace(ye, " ").indexOf(e) > -1)
                    return !0;
            return !1
        }
    });
    var be = /\r/g
        , we = /[\x20\t\r\n\f]+/g;
    dt.fn.extend({
        val: function(t) {
            var e, i, n, s = this[0];
            {
                if (arguments.length)
                    return n = dt.isFunction(t),
                        this.each(function(i) {
                            var s;
                            1 === this.nodeType && (s = n ? t.call(this, i, dt(this).val()) : t,
                                null == s ? s = "" : "number" == typeof s ? s += "" : dt.isArray(s) && (s = dt.map(s, function(t) {
                                    return null == t ? "" : t + ""
                                })),
                                e = dt.valHooks[this.type] || dt.valHooks[this.nodeName.toLowerCase()],
                            e && "set"in e && void 0 !== e.set(this, s, "value") || (this.value = s))
                        });
                if (s)
                    return e = dt.valHooks[s.type] || dt.valHooks[s.nodeName.toLowerCase()],
                        e && "get"in e && void 0 !== (i = e.get(s, "value")) ? i : (i = s.value,
                            "string" == typeof i ? i.replace(be, "") : null == i ? "" : i)
            }
        }
    }),
        dt.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = dt.find.attr(t, "value");
                        return null != e ? e : dt.trim(dt.text(t)).replace(we, " ")
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, i, n = t.options, s = t.selectedIndex, r = "select-one" === t.type, o = r ? null : [], a = r ? s + 1 : n.length, l = s < 0 ? a : r ? s : 0; l < a; l++)
                            if (i = n[l],
                            (i.selected || l === s) && !i.disabled && (!i.parentNode.disabled || !dt.nodeName(i.parentNode, "optgroup"))) {
                                if (e = dt(i).val(),
                                    r)
                                    return e;
                                o.push(e)
                            }
                        return o
                    },
                    set: function(t, e) {
                        for (var i, n, s = t.options, r = dt.makeArray(e), o = s.length; o--; )
                            n = s[o],
                            (n.selected = dt.inArray(dt.valHooks.option.get(n), r) > -1) && (i = !0);
                        return i || (t.selectedIndex = -1),
                            r
                    }
                }
            }
        }),
        dt.each(["radio", "checkbox"], function() {
            dt.valHooks[this] = {
                set: function(t, e) {
                    if (dt.isArray(e))
                        return t.checked = dt.inArray(dt(t).val(), e) > -1
                }
            },
            ct.checkOn || (dt.valHooks[this].get = function(t) {
                    return null === t.getAttribute("value") ? "on" : t.value
                }
            )
        });
    var Te = /^(?:focusinfocus|focusoutblur)$/;
    dt.extend(dt.event, {
        trigger: function(e, i, n, s) {
            var r, o, a, l, h, c, u, d = [n || K], f = at.call(e, "type") ? e.type : e, p = at.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = a = n = n || K,
            3 !== n.nodeType && 8 !== n.nodeType && !Te.test(f + dt.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."),
                f = p.shift(),
                p.sort()),
                h = f.indexOf(":") < 0 && "on" + f,
                e = e[dt.expando] ? e : new dt.Event(f,"object" == typeof e && e),
                e.isTrigger = s ? 2 : 3,
                e.namespace = p.join("."),
                e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                e.result = void 0,
            e.target || (e.target = n),
                i = null == i ? [e] : dt.makeArray(i, [e]),
                u = dt.event.special[f] || {},
            s || !u.trigger || u.trigger.apply(n, i) !== !1)) {
                if (!s && !u.noBubble && !dt.isWindow(n)) {
                    for (l = u.delegateType || f,
                         Te.test(l + f) || (o = o.parentNode); o; o = o.parentNode)
                        d.push(o),
                            a = o;
                    a === (n.ownerDocument || K) && d.push(a.defaultView || a.parentWindow || t)
                }
                for (r = 0; (o = d[r++]) && !e.isPropagationStopped(); )
                    e.type = r > 1 ? l : u.bindType || f,
                        c = ($t.get(o, "events") || {})[e.type] && $t.get(o, "handle"),
                    c && c.apply(o, i),
                        c = h && o[h],
                    c && c.apply && Nt(o) && (e.result = c.apply(o, i),
                    e.result === !1 && e.preventDefault());
                return e.type = f,
                s || e.isDefaultPrevented() || u._default && u._default.apply(d.pop(), i) !== !1 || !Nt(n) || h && dt.isFunction(n[f]) && !dt.isWindow(n) && (a = n[h],
                a && (n[h] = null),
                    dt.event.triggered = f,
                    n[f](),
                    dt.event.triggered = void 0,
                a && (n[h] = a)),
                    e.result
            }
        },
        simulate: function(t, e, i) {
            var n = dt.extend(new dt.Event, i, {
                type: t,
                isSimulated: !0
            });
            dt.event.trigger(n, null, e)
        }
    }),
        dt.fn.extend({
            trigger: function(t, e) {
                return this.each(function() {
                    dt.event.trigger(t, e, this)
                })
            },
            triggerHandler: function(t, e) {
                var i = this[0];
                if (i)
                    return dt.event.trigger(t, e, i, !0)
            }
        }),
        dt.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
            dt.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }),
        dt.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }),
        ct.focusin = "onfocusin"in t,
    ct.focusin || dt.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            dt.event.simulate(e, t.target, dt.event.fix(t))
        };
        dt.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this
                    , s = $t.access(n, e);
                s || n.addEventListener(t, i, !0),
                    $t.access(n, e, (s || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this
                    , s = $t.access(n, e) - 1;
                s ? $t.access(n, e, s) : (n.removeEventListener(t, i, !0),
                    $t.remove(n, e))
            }
        }
    });
    var xe = t.location
        , Se = dt.now()
        , Ce = /\?/;
    dt.parseXML = function(e) {
        var i;
        if (!e || "string" != typeof e)
            return null;
        try {
            i = (new t.DOMParser).parseFromString(e, "text/xml")
        } catch (n) {
            i = void 0
        }
        return i && !i.getElementsByTagName("parsererror").length || dt.error("Invalid XML: " + e),
            i
    }
    ;
    var Le = /\[\]$/
        , Ee = /\r?\n/g
        , ke = /^(?:submit|button|image|reset|file)$/i
        , Pe = /^(?:input|select|textarea|keygen)/i;
    dt.param = function(t, e) {
        var i, n = [], s = function(t, e) {
            var i = dt.isFunction(e) ? e() : e;
            n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
        };
        if (dt.isArray(t) || t.jquery && !dt.isPlainObject(t))
            dt.each(t, function() {
                s(this.name, this.value)
            });
        else
            for (i in t)
                q(i, t[i], e, s);
        return n.join("&")
    }
        ,
        dt.fn.extend({
            serialize: function() {
                return dt.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = dt.prop(this, "elements");
                    return t ? dt.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !dt(this).is(":disabled") && Pe.test(this.nodeName) && !ke.test(t) && (this.checked || !Vt.test(t))
                }).map(function(t, e) {
                    var i = dt(this).val();
                    return null == i ? null : dt.isArray(i) ? dt.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(Ee, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(Ee, "\r\n")
                    }
                }).get()
            }
        });
    var Ae = /%20/g
        , Oe = /#.*$/
        , Ne = /([?&])_=[^&]*/
        , $e = /^(.*?):[ \t]*([^\r\n]*)$/gm
        , De = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
        , Me = /^(?:GET|HEAD)$/
        , Re = /^\/\//
        , Ie = {}
        , je = {}
        , Fe = "*/".concat("*")
        , He = K.createElement("a");
    He.href = xe.href,
        dt.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: xe.href,
                type: "GET",
                isLocal: De.test(xe.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Fe,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": dt.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? X(X(t, dt.ajaxSettings), e) : X(dt.ajaxSettings, t)
            },
            ajaxPrefilter: z(Ie),
            ajaxTransport: z(je),
            ajax: function(e, i) {
                function n(e, i, n, a) {
                    var h, d, f, b, w, T = i;
                    c || (c = !0,
                    l && t.clearTimeout(l),
                        s = void 0,
                        o = a || "",
                        x.readyState = e > 0 ? 4 : 0,
                        h = e >= 200 && e < 300 || 304 === e,
                    n && (b = G(p, x, n)),
                        b = J(p, b, x, h),
                        h ? (p.ifModified && (w = x.getResponseHeader("Last-Modified"),
                        w && (dt.lastModified[r] = w),
                            w = x.getResponseHeader("etag"),
                        w && (dt.etag[r] = w)),
                            204 === e || "HEAD" === p.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = b.state,
                                d = b.data,
                                f = b.error,
                                h = !f)) : (f = T,
                        !e && T || (T = "error",
                        e < 0 && (e = 0))),
                        x.status = e,
                        x.statusText = (i || T) + "",
                        h ? g.resolveWith(m, [d, T, x]) : g.rejectWith(m, [x, T, f]),
                        x.statusCode(y),
                        y = void 0,
                    u && _.trigger(h ? "ajaxSuccess" : "ajaxError", [x, p, h ? d : f]),
                        v.fireWith(m, [x, T]),
                    u && (_.trigger("ajaxComplete", [x, p]),
                    --dt.active || dt.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (i = e,
                    e = void 0),
                    i = i || {};
                var s, r, o, a, l, h, c, u, d, f, p = dt.ajaxSetup({}, i), m = p.context || p, _ = p.context && (m.nodeType || m.jquery) ? dt(m) : dt.event, g = dt.Deferred(), v = dt.Callbacks("once memory"), y = p.statusCode || {}, b = {}, w = {}, T = "canceled", x = {
                    readyState: 0,
                    getResponseHeader: function(t) {
                        var e;
                        if (c) {
                            if (!a)
                                for (a = {}; e = $e.exec(o); )
                                    a[e[1].toLowerCase()] = e[2];
                            e = a[t.toLowerCase()]
                        }
                        return null == e ? null : e
                    },
                    getAllResponseHeaders: function() {
                        return c ? o : null
                    },
                    setRequestHeader: function(t, e) {
                        return null == c && (t = w[t.toLowerCase()] = w[t.toLowerCase()] || t,
                            b[t] = e),
                            this
                    },
                    overrideMimeType: function(t) {
                        return null == c && (p.mimeType = t),
                            this
                    },
                    statusCode: function(t) {
                        var e;
                        if (t)
                            if (c)
                                x.always(t[x.status]);
                            else
                                for (e in t)
                                    y[e] = [y[e], t[e]];
                        return this
                    },
                    abort: function(t) {
                        var e = t || T;
                        return s && s.abort(e),
                            n(0, e),
                            this
                    }
                };
                if (g.promise(x),
                    p.url = ((e || p.url || xe.href) + "").replace(Re, xe.protocol + "//"),
                    p.type = i.method || i.type || p.method || p.type,
                    p.dataTypes = (p.dataType || "*").toLowerCase().match(kt) || [""],
                null == p.crossDomain) {
                    h = K.createElement("a");
                    try {
                        h.href = p.url,
                            h.href = h.href,
                            p.crossDomain = He.protocol + "//" + He.host != h.protocol + "//" + h.host
                    } catch (S) {
                        p.crossDomain = !0
                    }
                }
                if (p.data && p.processData && "string" != typeof p.data && (p.data = dt.param(p.data, p.traditional)),
                    W(Ie, p, i, x),
                    c)
                    return x;
                u = dt.event && p.global,
                u && 0 === dt.active++ && dt.event.trigger("ajaxStart"),
                    p.type = p.type.toUpperCase(),
                    p.hasContent = !Me.test(p.type),
                    r = p.url.replace(Oe, ""),
                    p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(Ae, "+")) : (f = p.url.slice(r.length),
                    p.data && (r += (Ce.test(r) ? "&" : "?") + p.data,
                        delete p.data),
                    p.cache === !1 && (r = r.replace(Ne, ""),
                        f = (Ce.test(r) ? "&" : "?") + "_=" + Se++ + f),
                        p.url = r + f),
                p.ifModified && (dt.lastModified[r] && x.setRequestHeader("If-Modified-Since", dt.lastModified[r]),
                dt.etag[r] && x.setRequestHeader("If-None-Match", dt.etag[r])),
                (p.data && p.hasContent && p.contentType !== !1 || i.contentType) && x.setRequestHeader("Content-Type", p.contentType),
                    x.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Fe + "; q=0.01" : "") : p.accepts["*"]);
                for (d in p.headers)
                    x.setRequestHeader(d, p.headers[d]);
                if (p.beforeSend && (p.beforeSend.call(m, x, p) === !1 || c))
                    return x.abort();
                if (T = "abort",
                    v.add(p.complete),
                    x.done(p.success),
                    x.fail(p.error),
                    s = W(je, p, i, x)) {
                    if (x.readyState = 1,
                    u && _.trigger("ajaxSend", [x, p]),
                        c)
                        return x;
                    p.async && p.timeout > 0 && (l = t.setTimeout(function() {
                        x.abort("timeout")
                    }, p.timeout));
                    try {
                        c = !1,
                            s.send(b, n)
                    } catch (S) {
                        if (c)
                            throw S;
                        n(-1, S)
                    }
                } else
                    n(-1, "No Transport");
                return x
            },
            getJSON: function(t, e, i) {
                return dt.get(t, e, i, "json")
            },
            getScript: function(t, e) {
                return dt.get(t, void 0, e, "script")
            }
        }),
        dt.each(["get", "post"], function(t, e) {
            dt[e] = function(t, i, n, s) {
                return dt.isFunction(i) && (s = s || n,
                    n = i,
                    i = void 0),
                    dt.ajax(dt.extend({
                        url: t,
                        type: e,
                        dataType: s,
                        data: i,
                        success: n
                    }, dt.isPlainObject(t) && t))
            }
        }),
        dt._evalUrl = function(t) {
            return dt.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                "throws": !0
            })
        }
        ,
        dt.fn.extend({
            wrapAll: function(t) {
                var e;
                return this[0] && (dt.isFunction(t) && (t = t.call(this[0])),
                    e = dt(t, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && e.insertBefore(this[0]),
                    e.map(function() {
                        for (var t = this; t.firstElementChild; )
                            t = t.firstElementChild;
                        return t
                    }).append(this)),
                    this
            },
            wrapInner: function(t) {
                return dt.isFunction(t) ? this.each(function(e) {
                    dt(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = dt(this)
                        , i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = dt.isFunction(t);
                return this.each(function(i) {
                    dt(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function(t) {
                return this.parent(t).not("body").each(function() {
                    dt(this).replaceWith(this.childNodes)
                }),
                    this
            }
        }),
        dt.expr.pseudos.hidden = function(t) {
            return !dt.expr.pseudos.visible(t)
        }
        ,
        dt.expr.pseudos.visible = function(t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        }
        ,
        dt.ajaxSettings.xhr = function() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        }
    ;
    var Be = {
        0: 200,
        1223: 204
    }
        , Ye = dt.ajaxSettings.xhr();
    ct.cors = !!Ye && "withCredentials"in Ye,
        ct.ajax = Ye = !!Ye,
        dt.ajaxTransport(function(e) {
            var i, n;
            if (ct.cors || Ye && !e.crossDomain)
                return {
                    send: function(s, r) {
                        var o, a = e.xhr();
                        if (a.open(e.type, e.url, e.async, e.username, e.password),
                            e.xhrFields)
                            for (o in e.xhrFields)
                                a[o] = e.xhrFields[o];
                        e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType),
                        e.crossDomain || s["X-Requested-With"] || (s["X-Requested-With"] = "XMLHttpRequest");
                        for (o in s)
                            a.setRequestHeader(o, s[o]);
                        i = function(t) {
                            return function() {
                                i && (i = n = a.onload = a.onerror = a.onabort = a.onreadystatechange = null,
                                    "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(Be[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                        binary: a.response
                                    } : {
                                        text: a.responseText
                                    }, a.getAllResponseHeaders()))
                            }
                        }
                            ,
                            a.onload = i(),
                            n = a.onerror = i("error"),
                            void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                                4 === a.readyState && t.setTimeout(function() {
                                    i && n()
                                })
                            }
                            ,
                            i = i("abort");
                        try {
                            a.send(e.hasContent && e.data || null)
                        } catch (l) {
                            if (i)
                                throw l
                        }
                    },
                    abort: function() {
                        i && i()
                    }
                }
        }),
        dt.ajaxPrefilter(function(t) {
            t.crossDomain && (t.contents.script = !1)
        }),
        dt.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(t) {
                    return dt.globalEval(t),
                        t
                }
            }
        }),
        dt.ajaxPrefilter("script", function(t) {
            void 0 === t.cache && (t.cache = !1),
            t.crossDomain && (t.type = "GET")
        }),
        dt.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var e, i;
                return {
                    send: function(n, s) {
                        e = dt("<script>").prop({
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", i = function(t) {
                                e.remove(),
                                    i = null,
                                t && s("error" === t.type ? 404 : 200, t.type)
                            }
                        ),
                            K.head.appendChild(e[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
            }
        });
    var Ve = []
        , Ue = /(=)\?(?=&|$)|\?\?/;
    dt.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Ve.pop() || dt.expando + "_" + Se++;
            return this[t] = !0,
                t
        }
    }),
        dt.ajaxPrefilter("json jsonp", function(e, i, n) {
            var s, r, o, a = e.jsonp !== !1 && (Ue.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ue.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0])
                return s = e.jsonpCallback = dt.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                    a ? e[a] = e[a].replace(Ue, "$1" + s) : e.jsonp !== !1 && (e.url += (Ce.test(e.url) ? "&" : "?") + e.jsonp + "=" + s),
                    e.converters["script json"] = function() {
                        return o || dt.error(s + " was not called"),
                            o[0]
                    }
                    ,
                    e.dataTypes[0] = "json",
                    r = t[s],
                    t[s] = function() {
                        o = arguments
                    }
                    ,
                    n.always(function() {
                        void 0 === r ? dt(t).removeProp(s) : t[s] = r,
                        e[s] && (e.jsonpCallback = i.jsonpCallback,
                            Ve.push(s)),
                        o && dt.isFunction(r) && r(o[0]),
                            o = r = void 0
                    }),
                    "script"
        }),
        ct.createHTMLDocument = function() {
            var t = K.implementation.createHTMLDocument("").body;
            return t.innerHTML = "<form></form><form></form>",
            2 === t.childNodes.length
        }(),
        dt.parseHTML = function(t, e, i) {
            if ("string" != typeof t)
                return [];
            "boolean" == typeof e && (i = e,
                e = !1);
            var n, s, r;
            return e || (ct.createHTMLDocument ? (e = K.implementation.createHTMLDocument(""),
                n = e.createElement("base"),
                n.href = K.location.href,
                e.head.appendChild(n)) : e = K),
                s = wt.exec(t),
                r = !i && [],
                s ? [e.createElement(s[1])] : (s = v([t], e, r),
                r && r.length && dt(r).remove(),
                    dt.merge([], s.childNodes))
        }
        ,
        dt.fn.load = function(t, e, i) {
            var n, s, r, o = this, a = t.indexOf(" ");
            return a > -1 && (n = dt.trim(t.slice(a)),
                t = t.slice(0, a)),
                dt.isFunction(e) ? (i = e,
                    e = void 0) : e && "object" == typeof e && (s = "POST"),
            o.length > 0 && dt.ajax({
                url: t,
                type: s || "GET",
                dataType: "html",
                data: e
            }).done(function(t) {
                r = arguments,
                    o.html(n ? dt("<div>").append(dt.parseHTML(t)).find(n) : t)
            }).always(i && function(t, e) {
                o.each(function() {
                    i.apply(this, r || [t.responseText, e, t])
                })
            }
            ),
                this
        }
        ,
        dt.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            dt.fn[e] = function(t) {
                return this.on(e, t)
            }
        }),
        dt.expr.pseudos.animated = function(t) {
            return dt.grep(dt.timers, function(e) {
                return t === e.elem
            }).length
        }
        ,
        dt.offset = {
            setOffset: function(t, e, i) {
                var n, s, r, o, a, l, h, c = dt.css(t, "position"), u = dt(t), d = {};
                "static" === c && (t.style.position = "relative"),
                    a = u.offset(),
                    r = dt.css(t, "top"),
                    l = dt.css(t, "left"),
                    h = ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1,
                    h ? (n = u.position(),
                        o = n.top,
                        s = n.left) : (o = parseFloat(r) || 0,
                        s = parseFloat(l) || 0),
                dt.isFunction(e) && (e = e.call(t, i, dt.extend({}, a))),
                null != e.top && (d.top = e.top - a.top + o),
                null != e.left && (d.left = e.left - a.left + s),
                    "using"in e ? e.using.call(t, d) : u.css(d)
            }
        },
        dt.fn.extend({
            offset: function(t) {
                if (arguments.length)
                    return void 0 === t ? this : this.each(function(e) {
                        dt.offset.setOffset(this, t, e)
                    });
                var e, i, n, s, r = this[0];
                if (r)
                    return r.getClientRects().length ? (n = r.getBoundingClientRect(),
                        n.width || n.height ? (s = r.ownerDocument,
                            i = Q(s),
                            e = s.documentElement,
                            {
                                top: n.top + i.pageYOffset - e.clientTop,
                                left: n.left + i.pageXOffset - e.clientLeft
                            }) : n) : {
                        top: 0,
                        left: 0
                    }
            },
            position: function() {
                if (this[0]) {
                    var t, e, i = this[0], n = {
                        top: 0,
                        left: 0
                    };
                    return "fixed" === dt.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(),
                        e = this.offset(),
                    dt.nodeName(t[0], "html") || (n = t.offset()),
                        n = {
                            top: n.top + dt.css(t[0], "borderTopWidth", !0),
                            left: n.left + dt.css(t[0], "borderLeftWidth", !0)
                        }),
                        {
                            top: e.top - n.top - dt.css(i, "marginTop", !0),
                            left: e.left - n.left - dt.css(i, "marginLeft", !0)
                        }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent; t && "static" === dt.css(t, "position"); )
                        t = t.offsetParent;
                    return t || Xt
                })
            }
        }),
        dt.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, e) {
            var i = "pageYOffset" === e;
            dt.fn[t] = function(n) {
                return Ot(this, function(t, n, s) {
                    var r = Q(t);
                    return void 0 === s ? r ? r[e] : t[n] : void (r ? r.scrollTo(i ? r.pageXOffset : s, i ? s : r.pageYOffset) : t[n] = s)
                }, t, n, arguments.length)
            }
        }),
        dt.each(["top", "left"], function(t, e) {
            dt.cssHooks[e] = O(ct.pixelPosition, function(t, i) {
                if (i)
                    return i = A(t, e),
                        se.test(i) ? dt(t).position()[e] + "px" : i
            })
        }),
        dt.each({
            Height: "height",
            Width: "width"
        }, function(t, e) {
            dt.each({
                padding: "inner" + t,
                content: e,
                "": "outer" + t
            }, function(i, n) {
                dt.fn[n] = function(s, r) {
                    var o = arguments.length && (i || "boolean" != typeof s)
                        , a = i || (s === !0 || r === !0 ? "margin" : "border");
                    return Ot(this, function(e, i, s) {
                        var r;
                        return dt.isWindow(e) ? 0 === n.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement,
                            Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === s ? dt.css(e, i, a) : dt.style(e, i, s, a)
                    }, e, o ? s : void 0, o)
                }
            })
        }),
        dt.fn.extend({
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        }),
        dt.parseJSON = JSON.parse,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return dt
    });
    var qe = t.jQuery
        , ze = t.$;
    return dt.noConflict = function(e) {
        return t.$ === dt && (t.$ = ze),
        e && t.jQuery === dt && (t.jQuery = qe),
            dt
    }
        ,
    e || (t.jQuery = t.$ = dt),
        dt
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
        var n = function(t) {
            var e, i = [], n = t.length;
            for (e = 0; e !== n; i.push(t[e++]))
                ;
            return i
        }
            , s = function(t, e, i) {
            var n, s, r = t.cycle;
            for (n in r)
                s = r[n],
                    t[n] = "function" == typeof s ? s(i, e[i]) : s[i % s.length];
            delete t.cycle
        }
            , r = function(t, e, n) {
            i.call(this, t, e, n),
                this._cycle = 0,
                this._yoyo = this.vars.yoyo === !0,
                this._repeat = this.vars.repeat || 0,
                this._repeatDelay = this.vars.repeatDelay || 0,
                this._dirty = !0,
                this.render = r.prototype.render
        }
            , o = 1e-10
            , a = i._internals
            , l = a.isSelector
            , h = a.isArray
            , c = r.prototype = i.to({}, .1, {})
            , u = [];
        r.version = "1.19.0",
            c.constructor = r,
            c.kill()._gc = !1,
            r.killTweensOf = r.killDelayedCallsTo = i.killTweensOf,
            r.getTweensOf = i.getTweensOf,
            r.lagSmoothing = i.lagSmoothing,
            r.ticker = i.ticker,
            r.render = i.render,
            c.invalidate = function() {
                return this._yoyo = this.vars.yoyo === !0,
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._uncache(!0),
                    i.prototype.invalidate.call(this)
            }
            ,
            c.updateTo = function(t, e) {
                var n, s = this.ratio, r = this.vars.immediateRender || t.immediateRender;
                e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
                    this._uncache(!1),
                    this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                for (n in t)
                    this.vars[n] = t[n];
                if (this._initted || r)
                    if (e)
                        this._initted = !1,
                        r && this.render(0, !0, !0);
                    else if (this._gc && this._enabled(!0, !1),
                    this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this),
                    this._time / this._duration > .998) {
                        var o = this._totalTime;
                        this.render(0, !0, !1),
                            this._initted = !1,
                            this.render(o, !0, !1)
                    } else if (this._initted = !1,
                        this._init(),
                    this._time > 0 || r)
                        for (var a, l = 1 / (1 - s), h = this._firstPT; h; )
                            a = h.s + h.c,
                                h.c *= l,
                                h.s = a - h.c,
                                h = h._next;
                return this
            }
            ,
            c.render = function(t, e, i) {
                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                var n, s, r, l, h, c, u, d, f = this._dirty ? this.totalDuration() : this._totalDuration, p = this._time, m = this._totalTime, _ = this._cycle, g = this._duration, v = this._rawPrevTime;
                if (t >= f - 1e-7 ? (this._totalTime = f,
                    this._cycle = this._repeat,
                    this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0,
                        this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g,
                        this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
                this._reversed || (n = !0,
                    s = "onComplete",
                    i = i || this._timeline.autoRemoveChildren),
                0 === g && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
                (v < 0 || t <= 0 && t >= -1e-7 || v === o && "isPause" !== this.data) && v !== t && (i = !0,
                v > o && (s = "onReverseComplete")),
                    this._rawPrevTime = d = !e || t || v === t ? t : o)) : t < 1e-7 ? (this._totalTime = this._time = this._cycle = 0,
                    this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== m || 0 === g && v > 0) && (s = "onReverseComplete",
                    n = this._reversed),
                t < 0 && (this._active = !1,
                0 === g && (this._initted || !this.vars.lazy || i) && (v >= 0 && (i = !0),
                    this._rawPrevTime = d = !e || t || v === t ? t : o)),
                this._initted || (i = !0)) : (this._totalTime = this._time = t,
                0 !== this._repeat && (l = g + this._repeatDelay,
                    this._cycle = this._totalTime / l >> 0,
                0 !== this._cycle && this._cycle === this._totalTime / l && m <= t && this._cycle--,
                    this._time = this._totalTime - this._cycle * l,
                this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time),
                    this._time > g ? this._time = g : this._time < 0 && (this._time = 0)),
                    this._easeType ? (h = this._time / g,
                        c = this._easeType,
                        u = this._easePower,
                    (1 === c || 3 === c && h >= .5) && (h = 1 - h),
                    3 === c && (h *= 2),
                        1 === u ? h *= h : 2 === u ? h *= h * h : 3 === u ? h *= h * h * h : 4 === u && (h *= h * h * h * h),
                        1 === c ? this.ratio = 1 - h : 2 === c ? this.ratio = h : this._time / g < .5 ? this.ratio = h / 2 : this.ratio = 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / g)),
                p === this._time && !i && _ === this._cycle)
                    return void (m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                        return this._time = p,
                            this._totalTime = m,
                            this._rawPrevTime = v,
                            this._cycle = _,
                            a.lazyTweens.push(this),
                            void (this._lazy = [t, e]);
                    this._time && !n ? this.ratio = this._ease.getRatio(this._time / g) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1),
                     this._active || !this._paused && this._time !== p && t >= 0 && (this._active = !0),
                     0 === m && (2 === this._initted && t > 0 && this._init(),
                     this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : s || (s = "_dummyGS")),
                     this.vars.onStart && (0 === this._totalTime && 0 !== g || e || this._callback("onStart"))),
                         r = this._firstPT; r; )
                    r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s,
                        r = r._next;
                this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, e, i),
                e || (this._totalTime !== m || s) && this._callback("onUpdate")),
                this._cycle !== _ && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")),
                s && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i),
                n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                    this._active = !1),
                !e && this.vars[s] && this._callback(s),
                0 === g && this._rawPrevTime === o && d !== o && (this._rawPrevTime = 0)))
            }
            ,
            r.to = function(t, e, i) {
                return new r(t,e,i)
            }
            ,
            r.from = function(t, e, i) {
                return i.runBackwards = !0,
                    i.immediateRender = 0 != i.immediateRender,
                    new r(t,e,i)
            }
            ,
            r.fromTo = function(t, e, i, n) {
                return n.startAt = i,
                    n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
                    new r(t,e,n)
            }
            ,
            r.staggerTo = r.allTo = function(t, e, o, a, c, d, f) {
                a = a || 0;
                var p, m, _, g, v = 0, y = [], b = function() {
                    o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments),
                        c.apply(f || o.callbackScope || this, d || u)
                }, w = o.cycle, T = o.startAt && o.startAt.cycle;
                for (h(t) || ("string" == typeof t && (t = i.selector(t) || t),
                l(t) && (t = n(t))),
                         t = t || [],
                     a < 0 && (t = n(t),
                         t.reverse(),
                         a *= -1),
                         p = t.length - 1,
                         _ = 0; _ <= p; _++) {
                    m = {};
                    for (g in o)
                        m[g] = o[g];
                    if (w && (s(m, t, _),
                    null != m.duration && (e = m.duration,
                        delete m.duration)),
                        T) {
                        T = m.startAt = {};
                        for (g in o.startAt)
                            T[g] = o.startAt[g];
                        s(m.startAt, t, _)
                    }
                    m.delay = v + (m.delay || 0),
                    _ === p && c && (m.onComplete = b),
                        y[_] = new r(t[_],e,m),
                        v += a
                }
                return y
            }
            ,
            r.staggerFrom = r.allFrom = function(t, e, i, n, s, o, a) {
                return i.runBackwards = !0,
                    i.immediateRender = 0 != i.immediateRender,
                    r.staggerTo(t, e, i, n, s, o, a)
            }
            ,
            r.staggerFromTo = r.allFromTo = function(t, e, i, n, s, o, a, l) {
                return n.startAt = i,
                    n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
                    r.staggerTo(t, e, n, s, o, a, l)
            }
            ,
            r.delayedCall = function(t, e, i, n, s) {
                return new r(e,0,{
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    useFrames: s,
                    overwrite: 0
                })
            }
            ,
            r.set = function(t, e) {
                return new r(t,0,e)
            }
            ,
            r.isTweening = function(t) {
                return i.getTweensOf(t, !0).length > 0
            }
        ;
        var d = function(t, e) {
                for (var n = [], s = 0, r = t._first; r; )
                    r instanceof i ? n[s++] = r : (e && (n[s++] = r),
                        n = n.concat(d(r, e)),
                        s = n.length),
                        r = r._next;
                return n
            }
            , f = r.getAllTweens = function(e) {
                return d(t._rootTimeline, e).concat(d(t._rootFramesTimeline, e))
            }
        ;
        r.killAll = function(t, i, n, s) {
            null == i && (i = !0),
            null == n && (n = !0);
            var r, o, a, l = f(0 != s), h = l.length, c = i && n && s;
            for (a = 0; a < h; a++)
                o = l[a],
                (c || o instanceof e || (r = o.target === o.vars.onComplete) && n || i && !r) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
        }
            ,
            r.killChildTweensOf = function(t, e) {
                if (null != t) {
                    var s, o, c, u, d, f = a.tweenLookup;
                    if ("string" == typeof t && (t = i.selector(t) || t),
                    l(t) && (t = n(t)),
                        h(t))
                        for (u = t.length; --u > -1; )
                            r.killChildTweensOf(t[u], e);
                    else {
                        s = [];
                        for (c in f)
                            for (o = f[c].target.parentNode; o; )
                                o === t && (s = s.concat(f[c].tweens)),
                                    o = o.parentNode;
                        for (d = s.length,
                                 u = 0; u < d; u++)
                            e && s[u].totalTime(s[u].totalDuration()),
                                s[u]._enabled(!1, !1)
                    }
                }
            }
        ;
        var p = function(t, i, n, s) {
            i = i !== !1,
                n = n !== !1,
                s = s !== !1;
            for (var r, o, a = f(s), l = i && n && s, h = a.length; --h > -1; )
                o = a[h],
                (l || o instanceof e || (r = o.target === o.vars.onComplete) && n || i && !r) && o.paused(t)
        };
        return r.pauseAll = function(t, e, i) {
            p(!0, t, e, i)
        }
            ,
            r.resumeAll = function(t, e, i) {
                p(!1, t, e, i)
            }
            ,
            r.globalTimeScale = function(e) {
                var n = t._rootTimeline
                    , s = i.ticker.time;
                return arguments.length ? (e = e || o,
                    n._startTime = s - (s - n._startTime) * n._timeScale / e,
                    n = t._rootFramesTimeline,
                    s = i.ticker.frame,
                    n._startTime = s - (s - n._startTime) * n._timeScale / e,
                    n._timeScale = t._rootTimeline._timeScale = e,
                    e) : n._timeScale
            }
            ,
            c.progress = function(t, e) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
            }
            ,
            c.totalProgress = function(t, e) {
                return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
            }
            ,
            c.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(),
                t > this._duration && (t = this._duration),
                    this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                    this.totalTime(t, e)) : this._time
            }
            ,
            c.duration = function(e) {
                return arguments.length ? t.prototype.duration.call(this, e) : this._duration
            }
            ,
            c.totalDuration = function(t) {
                return arguments.length ? this._repeat === -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat,
                    this._dirty = !1),
                    this._totalDuration)
            }
            ,
            c.repeat = function(t) {
                return arguments.length ? (this._repeat = t,
                    this._uncache(!0)) : this._repeat
            }
            ,
            c.repeatDelay = function(t) {
                return arguments.length ? (this._repeatDelay = t,
                    this._uncache(!0)) : this._repeatDelay
            }
            ,
            c.yoyo = function(t) {
                return arguments.length ? (this._yoyo = t,
                    this) : this._yoyo;
            }
            ,
            r
    }, !0),
        _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
            var n = function(t) {
                e.call(this, t),
                    this._labels = {},
                    this.autoRemoveChildren = this.vars.autoRemoveChildren === !0,
                    this.smoothChildTiming = this.vars.smoothChildTiming === !0,
                    this._sortChildren = !0,
                    this._onUpdate = this.vars.onUpdate;
                var i, n, s = this.vars;
                for (n in s)
                    i = s[n],
                    l(i) && i.join("").indexOf("{self}") !== -1 && (s[n] = this._swapSelfInParams(i));
                l(s.tweens) && this.add(s.tweens, 0, s.align, s.stagger)
            }
                , s = 1e-10
                , r = i._internals
                , o = n._internals = {}
                , a = r.isSelector
                , l = r.isArray
                , h = r.lazyTweens
                , c = r.lazyRender
                , u = _gsScope._gsDefine.globals
                , d = function(t) {
                var e, i = {};
                for (e in t)
                    i[e] = t[e];
                return i
            }
                , f = function(t, e, i) {
                var n, s, r = t.cycle;
                for (n in r)
                    s = r[n],
                        t[n] = "function" == typeof s ? s.call(e[i], i) : s[i % s.length];
                delete t.cycle
            }
                , p = o.pauseCallback = function() {}
                , m = function(t) {
                var e, i = [], n = t.length;
                for (e = 0; e !== n; i.push(t[e++]))
                    ;
                return i
            }
                , _ = n.prototype = new e;
            return n.version = "1.19.0",
                _.constructor = n,
                _.kill()._gc = _._forcingPlayhead = _._hasPause = !1,
                _.to = function(t, e, n, s) {
                    var r = n.repeat && u.TweenMax || i;
                    return e ? this.add(new r(t,e,n), s) : this.set(t, n, s)
                }
                ,
                _.from = function(t, e, n, s) {
                    return this.add((n.repeat && u.TweenMax || i).from(t, e, n), s)
                }
                ,
                _.fromTo = function(t, e, n, s, r) {
                    var o = s.repeat && u.TweenMax || i;
                    return e ? this.add(o.fromTo(t, e, n, s), r) : this.set(t, s, r)
                }
                ,
                _.staggerTo = function(t, e, s, r, o, l, h, c) {
                    var u, p, _ = new n({
                        onComplete: l,
                        onCompleteParams: h,
                        callbackScope: c,
                        smoothChildTiming: this.smoothChildTiming
                    }), g = s.cycle;
                    for ("string" == typeof t && (t = i.selector(t) || t),
                             t = t || [],
                         a(t) && (t = m(t)),
                             r = r || 0,
                         r < 0 && (t = m(t),
                             t.reverse(),
                             r *= -1),
                             p = 0; p < t.length; p++)
                        u = d(s),
                        u.startAt && (u.startAt = d(u.startAt),
                        u.startAt.cycle && f(u.startAt, t, p)),
                        g && (f(u, t, p),
                        null != u.duration && (e = u.duration,
                            delete u.duration)),
                            _.to(t[p], e, u, p * r);
                    return this.add(_, o)
                }
                ,
                _.staggerFrom = function(t, e, i, n, s, r, o, a) {
                    return i.immediateRender = 0 != i.immediateRender,
                        i.runBackwards = !0,
                        this.staggerTo(t, e, i, n, s, r, o, a)
                }
                ,
                _.staggerFromTo = function(t, e, i, n, s, r, o, a, l) {
                    return n.startAt = i,
                        n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
                        this.staggerTo(t, e, n, s, r, o, a, l)
                }
                ,
                _.call = function(t, e, n, s) {
                    return this.add(i.delayedCall(0, t, e, n), s)
                }
                ,
                _.set = function(t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0),
                    null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused),
                        this.add(new i(t,0,e), n)
                }
                ,
                n.exportRoot = function(t, e) {
                    t = t || {},
                    null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var s, r, o = new n(t), a = o._timeline;
                    for (null == e && (e = !0),
                             a._remove(o, !0),
                             o._startTime = 0,
                             o._rawPrevTime = o._time = o._totalTime = a._time,
                             s = a._first; s; )
                        r = s._next,
                        e && s instanceof i && s.target === s.vars.onComplete || o.add(s, s._startTime - s._delay),
                            s = r;
                    return a.add(o, 0),
                        o
                }
                ,
                _.add = function(s, r, o, a) {
                    var h, c, u, d, f, p;
                    if ("number" != typeof r && (r = this._parseTimeOrLabel(r, 0, !0, s)),
                        !(s instanceof t)) {
                        if (s instanceof Array || s && s.push && l(s)) {
                            for (o = o || "normal",
                                     a = a || 0,
                                     h = r,
                                     c = s.length,
                                     u = 0; u < c; u++)
                                l(d = s[u]) && (d = new n({
                                    tweens: d
                                })),
                                    this.add(d, h),
                                "string" != typeof d && "function" != typeof d && ("sequence" === o ? h = d._startTime + d.totalDuration() / d._timeScale : "start" === o && (d._startTime -= d.delay())),
                                    h += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof s)
                            return this.addLabel(s, r);
                        if ("function" != typeof s)
                            throw "Cannot add " + s + " into the timeline; it is not a tween, timeline, function, or string.";
                        s = i.delayedCall(0, s)
                    }
                    if (e.prototype.add.call(this, s, r),
                    (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (f = this,
                                 p = f.rawTime() > s._startTime; f._timeline; )
                            p && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1),
                                f = f._timeline;
                    return this
                }
                ,
                _.remove = function(e) {
                    if (e instanceof t) {
                        this._remove(e, !1);
                        var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                        return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale,
                            this
                    }
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var n = e.length; --n > -1; )
                            this.remove(e[n]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }
                ,
                _._remove = function(t, i) {
                    e.prototype._remove.call(this, t, i);
                    var n = this._last;
                    return n ? this._time > n._startTime + n._totalDuration / n._timeScale && (this._time = this.duration(),
                        this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0,
                        this
                }
                ,
                _.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }
                ,
                _.insert = _.insertMultiple = function(t, e, i, n) {
                    return this.add(t, e || 0, i, n)
                }
                ,
                _.appendMultiple = function(t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                }
                ,
                _.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e),
                        this
                }
                ,
                _.addPause = function(t, e, n, s) {
                    var r = i.delayedCall(0, p, n, s || this);
                    return r.vars.onComplete = r.vars.onReverseComplete = e,
                        r.data = "isPause",
                        this._hasPause = !0,
                        this.add(r, t)
                }
                ,
                _.removeLabel = function(t) {
                    return delete this._labels[t],
                        this
                }
                ,
                _.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }
                ,
                _._parseTimeOrLabel = function(e, i, n, s) {
                    var r;
                    if (s instanceof t && s.timeline === this)
                        this.remove(s);
                    else if (s && (s instanceof Array || s.push && l(s)))
                        for (r = s.length; --r > -1; )
                            s[r]instanceof t && s[r].timeline === this && this.remove(s[r]);
                    if ("string" == typeof i)
                        return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, n);
                    if (i = i || 0,
                    "string" != typeof e || !isNaN(e) && null == this._labels[e])
                        null == e && (e = this.duration());
                    else {
                        if (r = e.indexOf("="),
                        r === -1)
                            return null == this._labels[e] ? n ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(r - 1) + "1", 10) * Number(e.substr(r + 1)),
                            e = r > 1 ? this._parseTimeOrLabel(e.substr(0, r - 1), 0, n) : this.duration()
                    }
                    return Number(e) + i
                }
                ,
                _.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
                }
                ,
                _.stop = function() {
                    return this.paused(!0)
                }
                ,
                _.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }
                ,
                _.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }
                ,
                _.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, r, o, a, l, u, d, f = this._dirty ? this.totalDuration() : this._totalDuration, p = this._time, m = this._startTime, _ = this._timeScale, g = this._paused;
                    if (t >= f - 1e-7)
                        this._totalTime = this._time = f,
                        this._reversed || this._hasPausedChild() || (r = !0,
                            a = "onComplete",
                            l = !!this._timeline.autoRemoveChildren,
                        0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === s) && this._rawPrevTime !== t && this._first && (l = !0,
                        this._rawPrevTime > s && (a = "onReverseComplete"))),
                            this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s,
                            t = f + 1e-4;
                    else if (t < 1e-7)
                        if (this._totalTime = this._time = 0,
                        (0 !== p || 0 === this._duration && this._rawPrevTime !== s && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete",
                            r = this._reversed),
                        t < 0)
                            this._active = !1,
                                this._timeline.autoRemoveChildren && this._reversed ? (l = r = !0,
                                    a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0),
                                this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s,
                            0 === t && r)
                                for (n = this._first; n && 0 === n._startTime; )
                                    n._duration || (r = !1),
                                        n = n._next;
                            t = 0,
                            this._initted || (l = !0)
                        }
                    else {
                        if (this._hasPause && !this._forcingPlayhead && !e) {
                            if (t >= p)
                                for (n = this._first; n && n._startTime <= t && !u; )
                                    n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n),
                                        n = n._next;
                            else
                                for (n = this._last; n && n._startTime >= t && !u; )
                                    n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n),
                                        n = n._prev;
                            u && (this._time = t = u._startTime,
                                this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = t
                    }
                    if (this._time !== p && this._first || i || l || u) {
                        if (this._initted || (this._initted = !0),
                        this._active || !this._paused && this._time !== p && t > 0 && (this._active = !0),
                        0 === p && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")),
                            d = this._time,
                        d >= p)
                            for (n = this._first; n && (o = n._next,
                            d === this._time && (!this._paused || g)); )
                                (n._active || n._startTime <= d && !n._paused && !n._gc) && (u === n && this.pause(),
                                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                                    n = o;
                        else
                            for (n = this._last; n && (o = n._prev,
                            d === this._time && (!this._paused || g)); ) {
                                if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                                    if (u === n) {
                                        for (u = n._prev; u && u.endTime() > this._time; )
                                            u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i),
                                                u = u._prev;
                                        u = null,
                                            this.pause()
                                    }
                                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                                }
                                n = o
                            }
                        this._onUpdate && (e || (h.length && c(),
                            this._callback("onUpdate"))),
                        a && (this._gc || m !== this._startTime && _ === this._timeScale || (0 === this._time || f >= this.totalDuration()) && (r && (h.length && c(),
                        this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                            this._active = !1),
                        !e && this.vars[a] && this._callback(a)))
                    }
                }
                ,
                _._hasPausedChild = function() {
                    for (var t = this._first; t; ) {
                        if (t._paused || t instanceof n && t._hasPausedChild())
                            return !0;
                        t = t._next
                    }
                    return !1
                }
                ,
                _.getChildren = function(t, e, n, s) {
                    s = s || -9999999999;
                    for (var r = [], o = this._first, a = 0; o; )
                        o._startTime < s || (o instanceof i ? e !== !1 && (r[a++] = o) : (n !== !1 && (r[a++] = o),
                        t !== !1 && (r = r.concat(o.getChildren(!0, e, n)),
                            a = r.length))),
                            o = o._next;
                    return r
                }
                ,
                _.getTweensOf = function(t, e) {
                    var n, s, r = this._gc, o = [], a = 0;
                    for (r && this._enabled(!0, !0),
                             n = i.getTweensOf(t),
                             s = n.length; --s > -1; )
                        (n[s].timeline === this || e && this._contains(n[s])) && (o[a++] = n[s]);
                    return r && this._enabled(!1, !0),
                        o
                }
                ,
                _.recent = function() {
                    return this._recent
                }
                ,
                _._contains = function(t) {
                    for (var e = t.timeline; e; ) {
                        if (e === this)
                            return !0;
                        e = e.timeline
                    }
                    return !1
                }
                ,
                _.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var n, s = this._first, r = this._labels; s; )
                        s._startTime >= i && (s._startTime += t),
                            s = s._next;
                    if (e)
                        for (n in r)
                            r[n] >= i && (r[n] += t);
                    return this._uncache(!0)
                }
                ,
                _._kill = function(t, e) {
                    if (!t && !e)
                        return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, s = !1; --n > -1; )
                        i[n]._kill(t, e) && (s = !0);
                    return s
                }
                ,
                _.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0)
                        , i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1; )
                        e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}),
                        this._uncache(!0)
                }
                ,
                _.invalidate = function() {
                    for (var e = this._first; e; )
                        e.invalidate(),
                            e = e._next;
                    return t.prototype.invalidate.call(this)
                }
                ,
                _._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var n = this._first; n; )
                            n._enabled(t, !0),
                                n = n._next;
                    return e.prototype._enabled.call(this, t, i)
                }
                ,
                _.totalTime = function(e, i, n) {
                    this._forcingPlayhead = !0;
                    var s = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1,
                        s
                }
                ,
                _.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t),
                        this) : (this._dirty && this.totalDuration(),
                        this._duration)
                }
                ,
                _.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, s = this._last, r = 999999999999; s; )
                                e = s._prev,
                                s._dirty && s.totalDuration(),
                                    s._startTime > r && this._sortChildren && !s._paused ? this.add(s, s._startTime - s._delay) : r = s._startTime,
                                s._startTime < 0 && !s._paused && (n -= s._startTime,
                                this._timeline.smoothChildTiming && (this._startTime += s._startTime / this._timeScale),
                                    this.shiftChildren(-s._startTime, !1, -9999999999),
                                    r = 0),
                                    i = s._startTime + s._totalDuration / s._timeScale,
                                i > n && (n = i),
                                    s = e;
                            this._duration = this._totalDuration = n,
                                this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                }
                ,
                _.paused = function(e) {
                    if (!e)
                        for (var i = this._first, n = this._time; i; )
                            i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0),
                                i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }
                ,
                _.usesFrames = function() {
                    for (var e = this._timeline; e._timeline; )
                        e = e._timeline;
                    return e === t._rootFramesTimeline
                }
                ,
                _.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }
                ,
                n
        }, !0),
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
            var n = function(e) {
                t.call(this, e),
                    this._repeat = this.vars.repeat || 0,
                    this._repeatDelay = this.vars.repeatDelay || 0,
                    this._cycle = 0,
                    this._yoyo = this.vars.yoyo === !0,
                    this._dirty = !0
            }
                , s = 1e-10
                , r = e._internals
                , o = r.lazyTweens
                , a = r.lazyRender
                , l = _gsScope._gsDefine.globals
                , h = new i(null,null,1,0)
                , c = n.prototype = new t;
            return c.constructor = n,
                c.kill()._gc = !1,
                n.version = "1.19.0",
                c.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0,
                        this._repeat = this.vars.repeat || 0,
                        this._repeatDelay = this.vars.repeatDelay || 0,
                        this._uncache(!0),
                        t.prototype.invalidate.call(this)
                }
                ,
                c.addCallback = function(t, i, n, s) {
                    return this.add(e.delayedCall(0, t, n, s), i)
                }
                ,
                c.removeCallback = function(t, e) {
                    if (t)
                        if (null == e)
                            this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), n = i.length, s = this._parseTimeOrLabel(e); --n > -1; )
                                i[n]._startTime === s && i[n]._enabled(!1, !1);
                    return this
                }
                ,
                c.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }
                ,
                c.tweenTo = function(t, i) {
                    i = i || {};
                    var n, s, r, o = {
                        ease: h,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    }, a = i.repeat && l.TweenMax || e;
                    for (s in i)
                        o[s] = i[s];
                    return o.time = this._parseTimeOrLabel(t),
                        n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001,
                        r = new a(this,n,o),
                        o.onStart = function() {
                            r.target.paused(!0),
                            r.vars.time !== r.target.time() && n === r.duration() && r.duration(Math.abs(r.vars.time - r.target.time()) / r.target._timeScale),
                            i.onStart && r._callback("onStart")
                        }
                        ,
                        r
                }
                ,
                c.tweenFromTo = function(t, e, i) {
                    i = i || {},
                        t = this._parseTimeOrLabel(t),
                        i.startAt = {
                            onComplete: this.seek,
                            onCompleteParams: [t],
                            callbackScope: this
                        },
                        i.immediateRender = i.immediateRender !== !1;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                }
                ,
                c.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, r, l, h, c, u, d, f, p = this._dirty ? this.totalDuration() : this._totalDuration, m = this._duration, _ = this._time, g = this._totalTime, v = this._startTime, y = this._timeScale, b = this._rawPrevTime, w = this._paused, T = this._cycle;
                    if (t >= p - 1e-7)
                        this._locked || (this._totalTime = p,
                            this._cycle = this._repeat),
                        this._reversed || this._hasPausedChild() || (r = !0,
                            h = "onComplete",
                            c = !!this._timeline.autoRemoveChildren,
                        0 === this._duration && (t <= 0 && t >= -1e-7 || b < 0 || b === s) && b !== t && this._first && (c = !0,
                        b > s && (h = "onReverseComplete"))),
                            this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s,
                            this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m,
                                t = m + 1e-4);
                    else if (t < 1e-7)
                        if (this._locked || (this._totalTime = this._cycle = 0),
                            this._time = 0,
                        (0 !== _ || 0 === m && b !== s && (b > 0 || t < 0 && b >= 0) && !this._locked) && (h = "onReverseComplete",
                            r = this._reversed),
                        t < 0)
                            this._active = !1,
                                this._timeline.autoRemoveChildren && this._reversed ? (c = r = !0,
                                    h = "onReverseComplete") : b >= 0 && this._first && (c = !0),
                                this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : s,
                            0 === t && r)
                                for (n = this._first; n && 0 === n._startTime; )
                                    n._duration || (r = !1),
                                        n = n._next;
                            t = 0,
                            this._initted || (c = !0)
                        }
                    else if (0 === m && b < 0 && (c = !0),
                        this._time = this._rawPrevTime = t,
                    this._locked || (this._totalTime = t,
                    0 !== this._repeat && (u = m + this._repeatDelay,
                        this._cycle = this._totalTime / u >> 0,
                    0 !== this._cycle && this._cycle === this._totalTime / u && g <= t && this._cycle--,
                        this._time = this._totalTime - this._cycle * u,
                    this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time),
                        this._time > m ? (this._time = m,
                            t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)),
                    this._hasPause && !this._forcingPlayhead && !e) {
                        if (t = this._time,
                        t >= _)
                            for (n = this._first; n && n._startTime <= t && !d; )
                                n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (d = n),
                                    n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= t && !d; )
                                n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (d = n),
                                    n = n._prev;
                        d && (this._time = t = d._startTime,
                            this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== T && !this._locked) {
                        var x = this._yoyo && 0 !== (1 & T)
                            , S = x === (this._yoyo && 0 !== (1 & this._cycle))
                            , C = this._totalTime
                            , L = this._cycle
                            , E = this._rawPrevTime
                            , k = this._time;
                        if (this._totalTime = T * m,
                            this._cycle < T ? x = !x : this._totalTime += m,
                            this._time = _,
                            this._rawPrevTime = 0 === m ? b - 1e-4 : b,
                            this._cycle = T,
                            this._locked = !0,
                            _ = x ? 0 : m,
                            this.render(_, e, 0 === m),
                        e || this._gc || this.vars.onRepeat && this._callback("onRepeat"),
                        _ !== this._time)
                            return;
                        if (S && (_ = x ? m + 1e-4 : -1e-4,
                            this.render(_, !0, !1)),
                            this._locked = !1,
                        this._paused && !w)
                            return;
                        this._time = k,
                            this._totalTime = C,
                            this._cycle = L,
                            this._rawPrevTime = E
                    }
                    if (!(this._time !== _ && this._first || i || c || d))
                        return void (g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0),
                    this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0),
                    0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")),
                        f = this._time,
                    f >= _)
                        for (n = this._first; n && (l = n._next,
                        f === this._time && (!this._paused || w)); )
                            (n._active || n._startTime <= this._time && !n._paused && !n._gc) && (d === n && this.pause(),
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)),
                                n = l;
                    else
                        for (n = this._last; n && (l = n._prev,
                        f === this._time && (!this._paused || w)); ) {
                            if (n._active || n._startTime <= _ && !n._paused && !n._gc) {
                                if (d === n) {
                                    for (d = n._prev; d && d.endTime() > this._time; )
                                        d.render(d._reversed ? d.totalDuration() - (t - d._startTime) * d._timeScale : (t - d._startTime) * d._timeScale, e, i),
                                            d = d._prev;
                                    d = null,
                                        this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = l
                        }
                    this._onUpdate && (e || (o.length && a(),
                        this._callback("onUpdate"))),
                    h && (this._locked || this._gc || v !== this._startTime && y === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (r && (o.length && a(),
                    this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                        this._active = !1),
                    !e && this.vars[h] && this._callback(h)))
                }
                ,
                c.getActive = function(t, e, i) {
                    null == t && (t = !0),
                    null == e && (e = !0),
                    null == i && (i = !1);
                    var n, s, r = [], o = this.getChildren(t, e, i), a = 0, l = o.length;
                    for (n = 0; n < l; n++)
                        s = o[n],
                        s.isActive() && (r[a++] = s);
                    return r
                }
                ,
                c.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(), n = i.length;
                    for (e = 0; e < n; e++)
                        if (i[e].time > t)
                            return i[e].name;
                    return null
                }
                ,
                c.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1; )
                        if (e[i].time < t)
                            return e[i].name;
                    return null
                }
                ,
                c.getLabelsArray = function() {
                    var t, e = [], i = 0;
                    for (t in this._labels)
                        e[i++] = {
                            time: this._labels[t],
                            name: t
                        };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }),
                        e
                }
                ,
                c.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }
                ,
                c.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }
                ,
                c.totalDuration = function(e) {
                    return arguments.length ? this._repeat !== -1 && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this),
                        this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat),
                        this._totalDuration)
                }
                ,
                c.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(),
                    t > this._duration && (t = this._duration),
                        this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)),
                        this.totalTime(t, e)) : this._time
                }
                ,
                c.repeat = function(t) {
                    return arguments.length ? (this._repeat = t,
                        this._uncache(!0)) : this._repeat
                }
                ,
                c.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t,
                        this._uncache(!0)) : this._repeatDelay
                }
                ,
                c.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t,
                        this) : this._yoyo
                }
                ,
                c.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }
                ,
                n
        }, !0),
        function() {
            var t = 180 / Math.PI
                , e = []
                , i = []
                , n = []
                , s = {}
                , r = _gsScope._gsDefine.globals
                , o = function(t, e, i, n) {
                i === n && (i = n - (n - e) / 1e6),
                t === e && (e = t + (i - t) / 1e6),
                    this.a = t,
                    this.b = e,
                    this.c = i,
                    this.d = n,
                    this.da = n - t,
                    this.ca = i - t,
                    this.ba = e - t
            }
                , a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,"
                , l = function(t, e, i, n) {
                var s = {
                    a: t
                }
                    , r = {}
                    , o = {}
                    , a = {
                    c: n
                }
                    , l = (t + e) / 2
                    , h = (e + i) / 2
                    , c = (i + n) / 2
                    , u = (l + h) / 2
                    , d = (h + c) / 2
                    , f = (d - u) / 8;
                return s.b = l + (t - l) / 4,
                    r.b = u + f,
                    s.c = r.a = (s.b + r.b) / 2,
                    r.c = o.a = (u + d) / 2,
                    o.b = d - f,
                    a.b = c + (n - c) / 4,
                    o.c = a.a = (o.b + a.b) / 2,
                    [s, r, o, a]
            }
                , h = function(t, s, r, o, a) {
                var h, c, u, d, f, p, m, _, g, v, y, b, w, T = t.length - 1, x = 0, S = t[0].a;
                for (h = 0; h < T; h++)
                    f = t[x],
                        c = f.a,
                        u = f.d,
                        d = t[x + 1].d,
                        a ? (y = e[h],
                            b = i[h],
                            w = (b + y) * s * .25 / (o ? .5 : n[h] || .5),
                            p = u - (u - c) * (o ? .5 * s : 0 !== y ? w / y : 0),
                            m = u + (d - u) * (o ? .5 * s : 0 !== b ? w / b : 0),
                            _ = u - (p + ((m - p) * (3 * y / (y + b) + .5) / 4 || 0))) : (p = u - (u - c) * s * .5,
                            m = u + (d - u) * s * .5,
                            _ = u - (p + m) / 2),
                        p += _,
                        m += _,
                        f.c = g = p,
                        0 !== h ? f.b = S : f.b = S = f.a + .6 * (f.c - f.a),
                        f.da = u - c,
                        f.ca = g - c,
                        f.ba = S - c,
                        r ? (v = l(c, S, g, u),
                            t.splice(x, 1, v[0], v[1], v[2], v[3]),
                            x += 4) : x++,
                        S = m;
                f = t[x],
                    f.b = S,
                    f.c = S + .4 * (f.d - S),
                    f.da = f.d - f.a,
                    f.ca = f.c - f.a,
                    f.ba = S - f.a,
                r && (v = l(f.a, S, f.c, f.d),
                    t.splice(x, 1, v[0], v[1], v[2], v[3]))
            }
                , c = function(t, n, s, r) {
                var a, l, h, c, u, d, f = [];
                if (r)
                    for (t = [r].concat(t),
                             l = t.length; --l > -1; )
                        "string" == typeof (d = t[l][n]) && "=" === d.charAt(1) && (t[l][n] = r[n] + Number(d.charAt(0) + d.substr(2)));
                if (a = t.length - 2,
                a < 0)
                    return f[0] = new o(t[0][n],0,0,t[a < -1 ? 0 : 1][n]),
                        f;
                for (l = 0; l < a; l++)
                    h = t[l][n],
                        c = t[l + 1][n],
                        f[l] = new o(h,0,0,c),
                    s && (u = t[l + 2][n],
                        e[l] = (e[l] || 0) + (c - h) * (c - h),
                        i[l] = (i[l] || 0) + (u - c) * (u - c));
                return f[l] = new o(t[l][n],0,0,t[l + 1][n]),
                    f
            }
                , u = function(t, r, o, l, u, d) {
                var f, p, m, _, g, v, y, b, w = {}, T = [], x = d || t[0];
                u = "string" == typeof u ? "," + u + "," : a,
                null == r && (r = 1);
                for (p in t[0])
                    T.push(p);
                if (t.length > 1) {
                    for (b = t[t.length - 1],
                             y = !0,
                             f = T.length; --f > -1; )
                        if (p = T[f],
                        Math.abs(x[p] - b[p]) > .05) {
                            y = !1;
                            break
                        }
                    y && (t = t.concat(),
                    d && t.unshift(d),
                        t.push(t[1]),
                        d = t[t.length - 3])
                }
                for (e.length = i.length = n.length = 0,
                         f = T.length; --f > -1; )
                    p = T[f],
                        s[p] = u.indexOf("," + p + ",") !== -1,
                        w[p] = c(t, p, s[p], d);
                for (f = e.length; --f > -1; )
                    e[f] = Math.sqrt(e[f]),
                        i[f] = Math.sqrt(i[f]);
                if (!l) {
                    for (f = T.length; --f > -1; )
                        if (s[p])
                            for (m = w[T[f]],
                                     v = m.length - 1,
                                     _ = 0; _ < v; _++)
                                g = m[_ + 1].da / i[_] + m[_].da / e[_] || 0,
                                    n[_] = (n[_] || 0) + g * g;
                    for (f = n.length; --f > -1; )
                        n[f] = Math.sqrt(n[f])
                }
                for (f = T.length,
                         _ = o ? 4 : 1; --f > -1; )
                    p = T[f],
                        m = w[p],
                        h(m, r, o, l, s[p]),
                    y && (m.splice(0, _),
                        m.splice(m.length - _, _));
                return w
            }
                , d = function(t, e, i) {
                e = e || "soft";
                var n, s, r, a, l, h, c, u, d, f, p, m = {}, _ = "cubic" === e ? 3 : 2, g = "soft" === e, v = [];
                if (g && i && (t = [i].concat(t)),
                null == t || t.length < _ + 1)
                    throw "invalid Bezier data";
                for (d in t[0])
                    v.push(d);
                for (h = v.length; --h > -1; ) {
                    for (d = v[h],
                             m[d] = l = [],
                             f = 0,
                             u = t.length,
                             c = 0; c < u; c++)
                        n = null == i ? t[c][d] : "string" == typeof (p = t[c][d]) && "=" === p.charAt(1) ? i[d] + Number(p.charAt(0) + p.substr(2)) : Number(p),
                        g && c > 1 && c < u - 1 && (l[f++] = (n + l[f - 2]) / 2),
                            l[f++] = n;
                    for (u = f - _ + 1,
                             f = 0,
                             c = 0; c < u; c += _)
                        n = l[c],
                            s = l[c + 1],
                            r = l[c + 2],
                            a = 2 === _ ? 0 : l[c + 3],
                            l[f++] = p = 3 === _ ? new o(n,s,r,a) : new o(n,(2 * s + n) / 3,(2 * s + r) / 3,r);
                    l.length = f
                }
                return m
            }
                , f = function(t, e, i) {
                for (var n, s, r, o, a, l, h, c, u, d, f, p = 1 / i, m = t.length; --m > -1; )
                    for (d = t[m],
                             r = d.a,
                             o = d.d - r,
                             a = d.c - r,
                             l = d.b - r,
                             n = s = 0,
                             c = 1; c <= i; c++)
                        h = p * c,
                            u = 1 - h,
                            n = s - (s = (h * h * o + 3 * u * (h * a + u * l)) * h),
                            f = m * i + c - 1,
                            e[f] = (e[f] || 0) + n * n
            }
                , p = function(t, e) {
                e = e >> 0 || 6;
                var i, n, s, r, o = [], a = [], l = 0, h = 0, c = e - 1, u = [], d = [];
                for (i in t)
                    f(t[i], o, e);
                for (s = o.length,
                         n = 0; n < s; n++)
                    l += Math.sqrt(o[n]),
                        r = n % e,
                        d[r] = l,
                    r === c && (h += l,
                        r = n / e >> 0,
                        u[r] = d,
                        a[r] = h,
                        l = 0,
                        d = []);
                return {
                    length: h,
                    lengths: a,
                    segments: u
                }
            }
                , m = _gsScope._gsDefine.plugin({
                propName: "bezier",
                priority: -1,
                version: "1.3.7",
                API: 2,
                global: !0,
                init: function(t, e, i) {
                    this._target = t,
                    e instanceof Array && (e = {
                        values: e
                    }),
                        this._func = {},
                        this._mod = {},
                        this._props = [],
                        this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                    var n, s, r, o, a, l = e.values || [], h = {}, c = l[0], f = e.autoRotate || i.vars.orientToBezier;
                    this._autoRotate = f ? f instanceof Array ? f : [["x", "y", "rotation", f === !0 ? 0 : Number(f) || 0]] : null;
                    for (n in c)
                        this._props.push(n);
                    for (r = this._props.length; --r > -1; )
                        n = this._props[r],
                            this._overwriteProps.push(n),
                            s = this._func[n] = "function" == typeof t[n],
                            h[n] = s ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]),
                        a || h[n] !== l[0][n] && (a = h);
                    if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : d(l, e.type, h),
                        this._segCount = this._beziers[n].length,
                        this._timeRes) {
                        var m = p(this._beziers, this._timeRes);
                        this._length = m.length,
                            this._lengths = m.lengths,
                            this._segments = m.segments,
                            this._l1 = this._li = this._s1 = this._si = 0,
                            this._l2 = this._lengths[0],
                            this._curSeg = this._segments[0],
                            this._s2 = this._curSeg[0],
                            this._prec = 1 / this._curSeg.length
                    }
                    if (f = this._autoRotate)
                        for (this._initialRotations = [],
                             f[0]instanceof Array || (this._autoRotate = f = [f]),
                                 r = f.length; --r > -1; ) {
                            for (o = 0; o < 3; o++)
                                n = f[r][o],
                                    this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                            n = f[r][2],
                                this._initialRotations[r] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0,
                                this._overwriteProps.push(n)
                        }
                    return this._startRatio = i.vars.runBackwards ? 1 : 0,
                        !0
                },
                set: function(e) {
                    var i, n, s, r, o, a, l, h, c, u, d = this._segCount, f = this._func, p = this._target, m = e !== this._startRatio;
                    if (this._timeRes) {
                        if (c = this._lengths,
                            u = this._curSeg,
                            e *= this._length,
                            s = this._li,
                        e > this._l2 && s < d - 1) {
                            for (h = d - 1; s < h && (this._l2 = c[++s]) <= e; )
                                ;
                            this._l1 = c[s - 1],
                                this._li = s,
                                this._curSeg = u = this._segments[s],
                                this._s2 = u[this._s1 = this._si = 0]
                        } else if (e < this._l1 && s > 0) {
                            for (; s > 0 && (this._l1 = c[--s]) >= e; )
                                ;
                            0 === s && e < this._l1 ? this._l1 = 0 : s++,
                                this._l2 = c[s],
                                this._li = s,
                                this._curSeg = u = this._segments[s],
                                this._s1 = u[(this._si = u.length - 1) - 1] || 0,
                                this._s2 = u[this._si]
                        }
                        if (i = s,
                            e -= this._l1,
                            s = this._si,
                        e > this._s2 && s < u.length - 1) {
                            for (h = u.length - 1; s < h && (this._s2 = u[++s]) <= e; )
                                ;
                            this._s1 = u[s - 1],
                                this._si = s
                        } else if (e < this._s1 && s > 0) {
                            for (; s > 0 && (this._s1 = u[--s]) >= e; )
                                ;
                            0 === s && e < this._s1 ? this._s1 = 0 : s++,
                                this._s2 = u[s],
                                this._si = s
                        }
                        a = (s + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                    } else
                        i = e < 0 ? 0 : e >= 1 ? d - 1 : d * e >> 0,
                            a = (e - i * (1 / d)) * d;
                    for (n = 1 - a,
                             s = this._props.length; --s > -1; )
                        r = this._props[s],
                            o = this._beziers[r][i],
                            l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a,
                        this._mod[r] && (l = this._mod[r](l, p)),
                            f[r] ? p[r](l) : p[r] = l;
                    if (this._autoRotate) {
                        var _, g, v, y, b, w, T, x = this._autoRotate;
                        for (s = x.length; --s > -1; )
                            r = x[s][2],
                                w = x[s][3] || 0,
                                T = x[s][4] === !0 ? 1 : t,
                                o = this._beziers[x[s][0]],
                                _ = this._beziers[x[s][1]],
                            o && _ && (o = o[i],
                                _ = _[i],
                                g = o.a + (o.b - o.a) * a,
                                y = o.b + (o.c - o.b) * a,
                                g += (y - g) * a,
                                y += (o.c + (o.d - o.c) * a - y) * a,
                                v = _.a + (_.b - _.a) * a,
                                b = _.b + (_.c - _.b) * a,
                                v += (b - v) * a,
                                b += (_.c + (_.d - _.c) * a - b) * a,
                                l = m ? Math.atan2(b - v, y - g) * T + w : this._initialRotations[s],
                            this._mod[r] && (l = this._mod[r](l, p)),
                                f[r] ? p[r](l) : p[r] = l)
                    }
                }
            })
                , _ = m.prototype;
            m.bezierThrough = u,
                m.cubicToQuadratic = l,
                m._autoCSS = !0,
                m.quadraticToCubic = function(t, e, i) {
                    return new o(t,(2 * e + t) / 3,(2 * e + i) / 3,i)
                }
                ,
                m._cssRegister = function() {
                    var t = r.CSSPlugin;
                    if (t) {
                        var e = t._internals
                            , i = e._parseToProxy
                            , n = e._setPluginRatio
                            , s = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, r, o, a, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }),
                                    l = new m;
                                var h, c, u, d = e.values, f = d.length - 1, p = [], _ = {};
                                if (f < 0)
                                    return a;
                                for (h = 0; h <= f; h++)
                                    u = i(t, d[h], o, a, l, f !== h),
                                        p[h] = u.end;
                                for (c in e)
                                    _[c] = e[c];
                                return _.values = p,
                                    a = new s(t,"bezier",0,0,u.pt,2),
                                    a.data = u,
                                    a.plugin = l,
                                    a.setRatio = n,
                                0 === _.autoRotate && (_.autoRotate = !0),
                                !_.autoRotate || _.autoRotate instanceof Array || (h = _.autoRotate === !0 ? 0 : Number(_.autoRotate),
                                    _.autoRotate = null != u.end.left ? [["left", "top", "rotation", h, !1]] : null != u.end.x && [["x", "y", "rotation", h, !1]]),
                                _.autoRotate && (o._transform || o._enableTransforms(!1),
                                    u.autoRotate = o._target._gsTransform,
                                    u.proxy.rotation = u.autoRotate.rotation || 0,
                                    o._overwriteProps.push("rotation")),
                                    l._onInitTween(u.proxy, _, o._tween),
                                    a
                            }
                        })
                    }
                }
                ,
                _._mod = function(t) {
                    for (var e, i = this._overwriteProps, n = i.length; --n > -1; )
                        e = t[i[n]],
                        e && "function" == typeof e && (this._mod[i[n]] = e)
                }
                ,
                _._kill = function(t) {
                    var e, i, n = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e],
                                     delete this._func[e],
                                     i = n.length; --i > -1; )
                                n[i] === e && n.splice(i, 1);
                    if (n = this._autoRotate)
                        for (i = n.length; --i > -1; )
                            t[n[i][2]] && n.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
        }(),
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
            var i, n, s, r, o = function() {
                t.call(this, "css"),
                    this._overwriteProps.length = 0,
                    this.setRatio = o.prototype.setRatio
            }, a = _gsScope._gsDefine.globals, l = {}, h = o.prototype = new t("css");
            h.constructor = o,
                o.version = "1.19.0",
                o.API = 2,
                o.defaultTransformPerspective = 0,
                o.defaultSkewType = "compensated",
                o.defaultSmoothOrigin = !0,
                h = "px",
                o.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h,
                    lineHeight: ""
                };
            var c, u, d, f, p, m, _, g, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g, y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, T = /(?:\d|\-|\+|=|#|\.)*/g, x = /opacity *= *([^)]*)/i, S = /opacity:([^;]*)/i, C = /alpha\(opacity *=.+?\)/i, L = /^(rgb|hsl)/, E = /([A-Z])/g, k = /-([a-z])/gi, P = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, A = function(t, e) {
                return e.toUpperCase()
            }, O = /(?:Left|Right|Width)/i, N = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, $ = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, D = /,(?=[^\)]*(?:\(|$))/gi, M = /[\s,\(]/i, R = Math.PI / 180, I = 180 / Math.PI, j = {}, F = document, H = function(t) {
                return F.createElementNS ? F.createElementNS("http://www.w3.org/1999/xhtml", t) : F.createElement(t)
            }, B = H("div"), Y = H("img"), V = o._internals = {
                _specialProps: l
            }, U = navigator.userAgent, q = function() {
                var t = U.indexOf("Android")
                    , e = H("a");
                return d = U.indexOf("Safari") !== -1 && U.indexOf("Chrome") === -1 && (t === -1 || Number(U.substr(t + 8, 1)) > 3),
                    p = d && Number(U.substr(U.indexOf("Version/") + 8, 1)) < 6,
                    f = U.indexOf("Firefox") !== -1,
                (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(U) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(U)) && (m = parseFloat(RegExp.$1)),
                !!e && (e.style.cssText = "top:1px;opacity:.55;",
                    /^0.55/.test(e.style.opacity))
            }(), z = function(t) {
                return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, W = function(t) {
                window.console && console.log(t)
            }, X = "", G = "", J = function(t, e) {
                e = e || B;
                var i, n, s = e.style;
                if (void 0 !== s[t])
                    return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1),
                         i = ["O", "Moz", "ms", "Ms", "Webkit"],
                         n = 5; --n > -1 && void 0 === s[i[n] + t]; )
                    ;
                return n >= 0 ? (G = 3 === n ? "ms" : i[n],
                    X = "-" + G.toLowerCase() + "-",
                G + t) : null
            }, Q = F.defaultView ? F.defaultView.getComputedStyle : function() {}
                , Z = o.getStyle = function(t, e, i, n, s) {
                var r;
                return q || "opacity" !== e ? (!n && t.style[e] ? r = t.style[e] : (i = i || Q(t)) ? r = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(E, "-$1").toLowerCase()) : t.currentStyle && (r = t.currentStyle[e]),
                    null == s || r && "none" !== r && "auto" !== r && "auto auto" !== r ? r : s) : z(t)
            }
                , K = V.convertToPixels = function(t, i, n, s, r) {
                if ("px" === s || !s)
                    return n;
                if ("auto" === s || !n)
                    return 0;
                var a, l, h, c = O.test(i), u = t, d = B.style, f = n < 0, p = 1 === n;
                if (f && (n = -n),
                p && (n *= 100),
                "%" === s && i.indexOf("border") !== -1)
                    a = n / 100 * (c ? t.clientWidth : t.clientHeight);
                else {
                    if (d.cssText = "border:0 solid red;position:" + Z(t, "position") + ";line-height:0;",
                    "%" !== s && u.appendChild && "v" !== s.charAt(0) && "rem" !== s)
                        d[c ? "borderLeftWidth" : "borderTopWidth"] = n + s;
                    else {
                        if (u = t.parentNode || F.body,
                            l = u._gsCache,
                            h = e.ticker.frame,
                        l && c && l.time === h)
                            return l.width * n / 100;
                        d[c ? "width" : "height"] = n + s
                    }
                    u.appendChild(B),
                        a = parseFloat(B[c ? "offsetWidth" : "offsetHeight"]),
                        u.removeChild(B),
                    c && "%" === s && o.cacheWidths !== !1 && (l = u._gsCache = u._gsCache || {},
                        l.time = h,
                        l.width = a / n * 100),
                    0 !== a || r || (a = K(t, i, n, s, !0))
                }
                return p && (a /= 100),
                    f ? -a : a
            }
                , tt = V.calculateOffset = function(t, e, i) {
                if ("absolute" !== Z(t, "position", i))
                    return 0;
                var n = "left" === e ? "Left" : "Top"
                    , s = Z(t, "margin" + n, i);
                return t["offset" + n] - (K(t, e, parseFloat(s), s.replace(T, "")) || 0)
            }
                , et = function(t, e) {
                var i, n, s, r = {};
                if (e = e || Q(t, null))
                    if (i = e.length)
                        for (; --i > -1; )
                            s = e[i],
                            s.indexOf("-transform") !== -1 && kt !== s || (r[s.replace(k, A)] = e.getPropertyValue(s));
                    else
                        for (i in e)
                            i.indexOf("Transform") !== -1 && Et !== i || (r[i] = e[i]);
                else if (e = t.currentStyle || t.style)
                    for (i in e)
                        "string" == typeof i && void 0 === r[i] && (r[i.replace(k, A)] = e[i]);
                return q || (r.opacity = z(t)),
                    n = Bt(t, e, !1),
                    r.rotation = n.rotation,
                    r.skewX = n.skewX,
                    r.scaleX = n.scaleX,
                    r.scaleY = n.scaleY,
                    r.x = n.x,
                    r.y = n.y,
                At && (r.z = n.z,
                    r.rotationX = n.rotationX,
                    r.rotationY = n.rotationY,
                    r.scaleZ = n.scaleZ),
                r.filters && delete r.filters,
                    r
            }, it = function(t, e, i, n, s) {
                var r, o, a, l = {}, h = t.style;
                for (o in i)
                    "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (r = i[o]) || s && s[o]) && o.indexOf("Origin") === -1 && ("number" != typeof r && "string" != typeof r || (l[o] = "auto" !== r || "left" !== o && "top" !== o ? "" !== r && "auto" !== r && "none" !== r || "string" != typeof e[o] || "" === e[o].replace(w, "") ? r : 0 : tt(t, o),
                    void 0 !== h[o] && (a = new gt(h,o,h[o],a))));
                if (n)
                    for (o in n)
                        "className" !== o && (l[o] = n[o]);
                return {
                    difs: l,
                    firstMPT: a
                }
            }, nt = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            }, st = ["marginLeft", "marginRight", "marginTop", "marginBottom"], rt = function(t, e, i) {
                if ("svg" === (t.nodeName + "").toLowerCase())
                    return (i || Q(t))[e] || 0;
                if (t.getBBox && jt(t))
                    return t.getBBox()[e] || 0;
                var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight)
                    , s = nt[e]
                    , r = s.length;
                for (i = i || Q(t, null); --r > -1; )
                    n -= parseFloat(Z(t, "padding" + s[r], i, !0)) || 0,
                        n -= parseFloat(Z(t, "border" + s[r] + "Width", i, !0)) || 0;
                return n
            }, ot = function(t, e) {
                if ("contain" === t || "auto" === t || "auto auto" === t)
                    return t + " ";
                null != t && "" !== t || (t = "0 0");
                var i, n = t.split(" "), s = t.indexOf("left") !== -1 ? "0%" : t.indexOf("right") !== -1 ? "100%" : n[0], r = t.indexOf("top") !== -1 ? "0%" : t.indexOf("bottom") !== -1 ? "100%" : n[1];
                if (n.length > 3 && !e) {
                    for (n = t.split(", ").join(",").split(","),
                             t = [],
                             i = 0; i < n.length; i++)
                        t.push(ot(n[i]));
                    return t.join(",")
                }
                return null == r ? r = "center" === s ? "50%" : "0" : "center" === r && (r = "50%"),
                ("center" === s || isNaN(parseFloat(s)) && (s + "").indexOf("=") === -1) && (s = "50%"),
                    t = s + " " + r + (n.length > 2 ? " " + n[2] : ""),
                e && (e.oxp = s.indexOf("%") !== -1,
                    e.oyp = r.indexOf("%") !== -1,
                    e.oxr = "=" === s.charAt(1),
                    e.oyr = "=" === r.charAt(1),
                    e.ox = parseFloat(s.replace(w, "")),
                    e.oy = parseFloat(r.replace(w, "")),
                    e.v = t),
                e || t
            }, at = function(t, e) {
                return "function" == typeof t && (t = t(g, _)),
                    "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
            }, lt = function(t, e) {
                return "function" == typeof t && (t = t(g, _)),
                    null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
            }, ht = function(t, e, i, n) {
                var s, r, o, a, l, h = 1e-6;
                return "function" == typeof t && (t = t(g, _)),
                    null == t ? a = e : "number" == typeof t ? a = t : (s = 360,
                        r = t.split("_"),
                        l = "=" === t.charAt(1),
                        o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(r[0].substr(2)) : parseFloat(r[0])) * (t.indexOf("rad") === -1 ? 1 : I) - (l ? 0 : e),
                    r.length && (n && (n[i] = e + o),
                    t.indexOf("short") !== -1 && (o %= s,
                    o !== o % (s / 2) && (o = o < 0 ? o + s : o - s)),
                        t.indexOf("_cw") !== -1 && o < 0 ? o = (o + 9999999999 * s) % s - (o / s | 0) * s : t.indexOf("ccw") !== -1 && o > 0 && (o = (o - 9999999999 * s) % s - (o / s | 0) * s)),
                        a = e + o),
                a < h && a > -h && (a = 0),
                    a
            }, ct = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, ut = function(t, e, i) {
                return t = t < 0 ? t + 1 : t > 1 ? t - 1 : t,
                255 * (6 * t < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
            }, dt = o.parseColor = function(t, e) {
                var i, n, s, r, o, a, l, h, c, u, d;
                if (t)
                    if ("number" == typeof t)
                        i = [t >> 16, t >> 8 & 255, 255 & t];
                    else {
                        if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)),
                            ct[t])
                            i = ct[t];
                        else if ("#" === t.charAt(0))
                            4 === t.length && (n = t.charAt(1),
                                s = t.charAt(2),
                                r = t.charAt(3),
                                t = "#" + n + n + s + s + r + r),
                                t = parseInt(t.substr(1), 16),
                                i = [t >> 16, t >> 8 & 255, 255 & t];
                        else if ("hsl" === t.substr(0, 3))
                            if (i = d = t.match(v),
                                e) {
                                if (t.indexOf("=") !== -1)
                                    return t.match(y)
                            } else
                                o = Number(i[0]) % 360 / 360,
                                    a = Number(i[1]) / 100,
                                    l = Number(i[2]) / 100,
                                    s = l <= .5 ? l * (a + 1) : l + a - l * a,
                                    n = 2 * l - s,
                                i.length > 3 && (i[3] = Number(t[3])),
                                    i[0] = ut(o + 1 / 3, n, s),
                                    i[1] = ut(o, n, s),
                                    i[2] = ut(o - 1 / 3, n, s);
                        else
                            i = t.match(v) || ct.transparent;
                        i[0] = Number(i[0]),
                            i[1] = Number(i[1]),
                            i[2] = Number(i[2]),
                        i.length > 3 && (i[3] = Number(i[3]))
                    }
                else
                    i = ct.black;
                return e && !d && (n = i[0] / 255,
                    s = i[1] / 255,
                    r = i[2] / 255,
                    h = Math.max(n, s, r),
                    c = Math.min(n, s, r),
                    l = (h + c) / 2,
                    h === c ? o = a = 0 : (u = h - c,
                        a = l > .5 ? u / (2 - h - c) : u / (h + c),
                        o = h === n ? (s - r) / u + (s < r ? 6 : 0) : h === s ? (r - n) / u + 2 : (n - s) / u + 4,
                        o *= 60),
                    i[0] = o + .5 | 0,
                    i[1] = 100 * a + .5 | 0,
                    i[2] = 100 * l + .5 | 0),
                    i
            }
                , ft = function(t, e) {
                var i, n, s, r = t.match(pt) || [], o = 0, a = r.length ? "" : t;
                for (i = 0; i < r.length; i++)
                    n = r[i],
                        s = t.substr(o, t.indexOf(n, o) - o),
                        o += s.length + n.length,
                        n = dt(n, e),
                    3 === n.length && n.push(1),
                        a += s + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                return a + t.substr(o)
            }, pt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (h in ct)
                pt += "|" + h + "\\b";
            pt = new RegExp(pt + ")","gi"),
                o.colorStringFilter = function(t) {
                    var e, i = t[0] + t[1];
                    pt.test(i) && (e = i.indexOf("hsl(") !== -1 || i.indexOf("hsla(") !== -1,
                        t[0] = ft(t[0], e),
                        t[1] = ft(t[1], e)),
                        pt.lastIndex = 0
                }
                ,
            e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
            var mt = function(t, e, i, n) {
                if (null == t)
                    return function(t) {
                        return t
                    }
                        ;
                var s, r = e ? (t.match(pt) || [""])[0] : "", o = t.split(r).join("").match(b) || [], a = t.substr(0, t.indexOf(o[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "", h = t.indexOf(" ") !== -1 ? " " : ",", c = o.length, u = c > 0 ? o[0].replace(v, "") : "";
                return c ? s = e ? function(t) {
                        var e, d, f, p;
                        if ("number" == typeof t)
                            t += u;
                        else if (n && D.test(t)) {
                            for (p = t.replace(D, "|").split("|"),
                                     f = 0; f < p.length; f++)
                                p[f] = s(p[f]);
                            return p.join(",")
                        }
                        if (e = (t.match(pt) || [r])[0],
                            d = t.split(e).join("").match(b) || [],
                            f = d.length,
                        c > f--)
                            for (; ++f < c; )
                                d[f] = i ? d[(f - 1) / 2 | 0] : o[f];
                        return a + d.join(h) + h + e + l + (t.indexOf("inset") !== -1 ? " inset" : "")
                    }
                    : function(t) {
                        var e, r, d;
                        if ("number" == typeof t)
                            t += u;
                        else if (n && D.test(t)) {
                            for (r = t.replace(D, "|").split("|"),
                                     d = 0; d < r.length; d++)
                                r[d] = s(r[d]);
                            return r.join(",")
                        }
                        if (e = t.match(b) || [],
                            d = e.length,
                        c > d--)
                            for (; ++d < c; )
                                e[d] = i ? e[(d - 1) / 2 | 0] : o[d];
                        return a + e.join(h) + l
                    }
                    : function(t) {
                        return t
                    }
            }
                , _t = function(t) {
                return t = t.split(","),
                    function(e, i, n, s, r, o, a) {
                        var l, h = (i + "").split(" ");
                        for (a = {},
                                 l = 0; l < 4; l++)
                            a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                        return s.parse(e, a, r, o)
                    }
            }
                , gt = (V._setPluginRatio = function(t) {
                    this.plugin.setRatio(t);
                    for (var e, i, n, s, r, o = this.data, a = o.proxy, l = o.firstMPT, h = 1e-6; l; )
                        e = a[l.v],
                            l.r ? e = Math.round(e) : e < h && e > -h && (e = 0),
                            l.t[l.p] = e,
                            l = l._next;
                    if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation),
                    1 === t || 0 === t)
                        for (l = o.firstMPT,
                                 r = 1 === t ? "e" : "b"; l; ) {
                            if (i = l.t,
                                i.type) {
                                if (1 === i.type) {
                                    for (s = i.xs0 + i.s + i.xs1,
                                             n = 1; n < i.l; n++)
                                        s += i["xn" + n] + i["xs" + (n + 1)];
                                    i[r] = s
                                }
                            } else
                                i[r] = i.s + i.xs0;
                            l = l._next
                        }
                }
                    ,
                    function(t, e, i, n, s) {
                        this.t = t,
                            this.p = e,
                            this.v = i,
                            this.r = s,
                        n && (n._prev = this,
                            this._next = n)
                    }
            )
                , vt = (V._parseToProxy = function(t, e, i, n, s, r) {
                    var o, a, l, h, c, u = n, d = {}, f = {}, p = i._transform, m = j;
                    for (i._transform = null,
                             j = e,
                             n = c = i.parse(t, e, n, s),
                             j = m,
                         r && (i._transform = p,
                         u && (u._prev = null,
                         u._prev && (u._prev._next = null))); n && n !== u; ) {
                        if (n.type <= 1 && (a = n.p,
                            f[a] = n.s + n.c,
                            d[a] = n.s,
                        r || (h = new gt(n,"s",a,h,n.r),
                            n.c = 0),
                        1 === n.type))
                            for (o = n.l; --o > 0; )
                                l = "xn" + o,
                                    a = n.p + "_" + l,
                                    f[a] = n.data[l],
                                    d[a] = n[l],
                                r || (h = new gt(n,l,a,h,n.rxp[l]));
                        n = n._next
                    }
                    return {
                        proxy: d,
                        end: f,
                        firstMPT: h,
                        pt: c
                    }
                }
                    ,
                    V.CSSPropTween = function(t, e, n, s, o, a, l, h, c, u, d) {
                        this.t = t,
                            this.p = e,
                            this.s = n,
                            this.c = s,
                            this.n = l || e,
                        t instanceof vt || r.push(this.n),
                            this.r = h,
                            this.type = a || 0,
                        c && (this.pr = c,
                            i = !0),
                            this.b = void 0 === u ? n : u,
                            this.e = void 0 === d ? n + s : d,
                        o && (this._next = o,
                            o._prev = this)
                    }
            )
                , yt = function(t, e, i, n, s, r) {
                var o = new vt(t,e,i,n - i,s,(-1),r);
                return o.b = i,
                    o.e = o.xs0 = n,
                    o
            }
                , bt = o.parseComplex = function(t, e, i, n, s, r, a, l, h, u) {
                i = i || r || "",
                "function" == typeof n && (n = n(g, _)),
                    a = new vt(t,e,0,0,a,u ? 2 : 1,null,(!1),l,i,n),
                    n += "",
                s && pt.test(n + i) && (n = [i, n],
                    o.colorStringFilter(n),
                    i = n[0],
                    n = n[1]);
                var d, f, p, m, b, w, T, x, S, C, L, E, k, P = i.split(", ").join(",").split(" "), A = n.split(", ").join(",").split(" "), O = P.length, N = c !== !1;
                for (n.indexOf(",") === -1 && i.indexOf(",") === -1 || (P = P.join(" ").replace(D, ", ").split(" "),
                    A = A.join(" ").replace(D, ", ").split(" "),
                    O = P.length),
                     O !== A.length && (P = (r || "").split(" "),
                         O = P.length),
                         a.plugin = h,
                         a.setRatio = u,
                         pt.lastIndex = 0,
                         d = 0; d < O; d++)
                    if (m = P[d],
                        b = A[d],
                        x = parseFloat(m),
                    x || 0 === x)
                        a.appendXtra("", x, at(b, x), b.replace(y, ""), N && b.indexOf("px") !== -1, !0);
                    else if (s && pt.test(m))
                        E = b.indexOf(")") + 1,
                            E = ")" + (E ? b.substr(E) : ""),
                            k = b.indexOf("hsl") !== -1 && q,
                            m = dt(m, k),
                            b = dt(b, k),
                            S = m.length + b.length > 6,
                            S && !q && 0 === b[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent",
                                a.e = a.e.split(A[d]).join("transparent")) : (q || (S = !1),
                                k ? a.appendXtra(S ? "hsla(" : "hsl(", m[0], at(b[0], m[0]), ",", !1, !0).appendXtra("", m[1], at(b[1], m[1]), "%,", !1).appendXtra("", m[2], at(b[2], m[2]), S ? "%," : "%" + E, !1) : a.appendXtra(S ? "rgba(" : "rgb(", m[0], b[0] - m[0], ",", !0, !0).appendXtra("", m[1], b[1] - m[1], ",", !0).appendXtra("", m[2], b[2] - m[2], S ? "," : E, !0),
                            S && (m = m.length < 4 ? 1 : m[3],
                                a.appendXtra("", m, (b.length < 4 ? 1 : b[3]) - m, E, !1))),
                            pt.lastIndex = 0;
                    else if (w = m.match(v)) {
                        if (T = b.match(y),
                        !T || T.length !== w.length)
                            return a;
                        for (p = 0,
                                 f = 0; f < w.length; f++)
                            L = w[f],
                                C = m.indexOf(L, p),
                                a.appendXtra(m.substr(p, C - p), Number(L), at(T[f], L), "", N && "px" === m.substr(C + L.length, 2), 0 === f),
                                p = C + L.length;
                        a["xs" + a.l] += m.substr(p)
                    } else
                        a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + b : b;
                if (n.indexOf("=") !== -1 && a.data) {
                    for (E = a.xs0 + a.data.s,
                             d = 1; d < a.l; d++)
                        E += a["xs" + d] + a.data["xn" + d];
                    a.e = E + a["xs" + d]
                }
                return a.l || (a.type = -1,
                    a.xs0 = a.e),
                a.xfirst || a
            }
                , wt = 9;
            for (h = vt.prototype,
                     h.l = h.pr = 0; --wt > 0; )
                h["xn" + wt] = 0,
                    h["xs" + wt] = "";
            h.xs0 = "",
                h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null,
                h.appendXtra = function(t, e, i, n, s, r) {
                    var o = this
                        , a = o.l;
                    return o["xs" + a] += r && (a || o["xs" + a]) ? " " + t : t || "",
                        i || 0 === a || o.plugin ? (o.l++,
                            o.type = o.setRatio ? 2 : 1,
                            o["xs" + o.l] = n || "",
                            a > 0 ? (o.data["xn" + a] = e + i,
                                o.rxp["xn" + a] = s,
                                o["xn" + a] = e,
                            o.plugin || (o.xfirst = new vt(o,"xn" + a,e,i,o.xfirst || o,0,o.n,s,o.pr),
                                o.xfirst.xs0 = 0),
                                o) : (o.data = {
                                s: e + i
                            },
                                o.rxp = {},
                                o.s = e,
                                o.c = i,
                                o.r = s,
                                o)) : (o["xs" + a] += e + (n || ""),
                            o)
                }
            ;
            var Tt = function(t, e) {
                    e = e || {},
                        this.p = e.prefix ? J(t) || t : t,
                        l[t] = l[this.p] = this,
                        this.format = e.formatter || mt(e.defaultValue, e.color, e.collapsible, e.multi),
                    e.parser && (this.parse = e.parser),
                        this.clrs = e.color,
                        this.multi = e.multi,
                        this.keyword = e.keyword,
                        this.dflt = e.defaultValue,
                        this.pr = e.priority || 0
                }
                , xt = V._registerComplexSpecialProp = function(t, e, i) {
                    "object" != typeof e && (e = {
                        parser: i
                    });
                    var n, s, r = t.split(","), o = e.defaultValue;
                    for (i = i || [o],
                             n = 0; n < r.length; n++)
                        e.prefix = 0 === n && e.prefix,
                            e.defaultValue = i[n] || o,
                            s = new Tt(r[n],e)
                }
                , St = V._registerPluginProp = function(t) {
                    if (!l[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        xt(t, {
                            parser: function(t, i, n, s, r, o, h) {
                                var c = a.com.greensock.plugins[e];
                                return c ? (c._cssRegister(),
                                    l[n].parse(t, i, n, s, r, o, h)) : (W("Error: " + e + " js file not loaded."),
                                    r)
                            }
                        })
                    }
                }
            ;
            h = Tt.prototype,
                h.parseComplex = function(t, e, i, n, s, r) {
                    var o, a, l, h, c, u, d = this.keyword;
                    if (this.multi && (D.test(i) || D.test(e) ? (a = e.replace(D, "|").split("|"),
                        l = i.replace(D, "|").split("|")) : d && (a = [e],
                        l = [i])),
                        l) {
                        for (h = l.length > a.length ? l.length : a.length,
                                 o = 0; o < h; o++)
                            e = a[o] = a[o] || this.dflt,
                                i = l[o] = l[o] || this.dflt,
                            d && (c = e.indexOf(d),
                                u = i.indexOf(d),
                            c !== u && (u === -1 ? a[o] = a[o].split(d).join("") : c === -1 && (a[o] += " " + d)));
                        e = a.join(", "),
                            i = l.join(", ")
                    }
                    return bt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, s, r)
                }
                ,
                h.parse = function(t, e, i, n, r, o, a) {
                    return this.parseComplex(t.style, this.format(Z(t, this.p, s, !1, this.dflt)), this.format(e), r, o)
                }
                ,
                o.registerSpecialProp = function(t, e, i) {
                    xt(t, {
                        parser: function(t, n, s, r, o, a, l) {
                            var h = new vt(t,s,0,0,o,2,s,(!1),i);
                            return h.plugin = a,
                                h.setRatio = e(t, n, r._tween, s),
                                h
                        },
                        priority: i
                    })
                }
                ,
                o.useSVGTransformAttr = d || f;
            var Ct, Lt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), Et = J("transform"), kt = X + "transform", Pt = J("transformOrigin"), At = null !== J("perspective"), Ot = V.Transform = function() {
                    this.perspective = parseFloat(o.defaultTransformPerspective) || 0,
                        this.force3D = !(o.defaultForce3D === !1 || !At) && (o.defaultForce3D || "auto")
                }
                , Nt = window.SVGElement, $t = function(t, e, i) {
                    var n, s = F.createElementNS("http://www.w3.org/2000/svg", t), r = /([a-z])([A-Z])/g;
                    for (n in i)
                        s.setAttributeNS(null, n.replace(r, "$1-$2").toLowerCase(), i[n]);
                    return e.appendChild(s),
                        s
                }, Dt = F.documentElement, Mt = function() {
                    var t, e, i, n = m || /Android/i.test(U) && !window.chrome;
                    return F.createElementNS && !n && (t = $t("svg", Dt),
                        e = $t("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }),
                        i = e.getBoundingClientRect().width,
                        e.style[Pt] = "50% 50%",
                        e.style[Et] = "scaleX(0.5)",
                        n = i === e.getBoundingClientRect().width && !(f && At),
                        Dt.removeChild(t)),
                        n
                }(), Rt = function(t, e, i, n, s, r) {
                    var a, l, h, c, u, d, f, p, m, _, g, v, y, b, w = t._gsTransform, T = Ht(t, !0);
                    w && (y = w.xOrigin,
                        b = w.yOrigin),
                    (!n || (a = n.split(" ")).length < 2) && (f = t.getBBox(),
                        e = ot(e).split(" "),
                        a = [(e[0].indexOf("%") !== -1 ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (e[1].indexOf("%") !== -1 ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]),
                        i.xOrigin = c = parseFloat(a[0]),
                        i.yOrigin = u = parseFloat(a[1]),
                    n && T !== Ft && (d = T[0],
                        f = T[1],
                        p = T[2],
                        m = T[3],
                        _ = T[4],
                        g = T[5],
                        v = d * m - f * p,
                        l = c * (m / v) + u * (-p / v) + (p * g - m * _) / v,
                        h = c * (-f / v) + u * (d / v) - (d * g - f * _) / v,
                        c = i.xOrigin = a[0] = l,
                        u = i.yOrigin = a[1] = h),
                    w && (r && (i.xOffset = w.xOffset,
                        i.yOffset = w.yOffset,
                        w = i),
                        s || s !== !1 && o.defaultSmoothOrigin !== !1 ? (l = c - y,
                            h = u - b,
                            w.xOffset += l * T[0] + h * T[2] - l,
                            w.yOffset += l * T[1] + h * T[3] - h) : w.xOffset = w.yOffset = 0),
                    r || t.setAttribute("data-svg-origin", a.join(" "))
                }, It = function(t) {
                    try {
                        return t.getBBox()
                    } catch (t) {}
                }, jt = function(t) {
                    return !!(Nt && t.getBBox && t.getCTM && It(t) && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                }, Ft = [1, 0, 0, 1, 0, 0], Ht = function(t, e) {
                    var i, n, s, r, o, a, l = t._gsTransform || new Ot, h = 1e5, c = t.style;
                    if (Et ? n = Z(t, kt, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(N),
                        n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""),
                        i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n,
                    i && Et && ((a = "none" === Q(t).display) || !t.parentNode) && (a && (r = c.display,
                        c.display = "block"),
                    t.parentNode || (o = 1,
                        Dt.appendChild(t)),
                        n = Z(t, kt, null, !0),
                        i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n,
                        r ? c.display = r : a && qt(c, "display"),
                    o && Dt.removeChild(t)),
                    (l.svg || t.getBBox && jt(t)) && (i && (c[Et] + "").indexOf("matrix") !== -1 && (n = c[Et],
                        i = 0),
                        s = t.getAttribute("transform"),
                    i && s && (s.indexOf("matrix") !== -1 ? (n = s,
                        i = 0) : s.indexOf("translate") !== -1 && (n = "matrix(1,0,0,1," + s.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")",
                        i = 0))),
                        i)
                        return Ft;
                    for (s = (n || "").match(v) || [],
                             wt = s.length; --wt > -1; )
                        r = Number(s[wt]),
                            s[wt] = (o = r - (r |= 0)) ? (o * h + (o < 0 ? -.5 : .5) | 0) / h + r : r;
                    return e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s
                }, Bt = V.getTransform = function(t, i, n, s) {
                    if (t._gsTransform && n && !s)
                        return t._gsTransform;
                    var r, a, l, h, c, u, d = n ? t._gsTransform || new Ot : new Ot, f = d.scaleX < 0, p = 2e-5, m = 1e5, _ = At ? parseFloat(Z(t, Pt, i, !1, "0 0 0").split(" ")[2]) || d.zOrigin || 0 : 0, g = parseFloat(o.defaultTransformPerspective) || 0;
                    if (d.svg = !(!t.getBBox || !jt(t)),
                    d.svg && (Rt(t, Z(t, Pt, i, !1, "50% 50%") + "", d, t.getAttribute("data-svg-origin")),
                        Ct = o.useSVGTransformAttr || Mt),
                        r = Ht(t),
                    r !== Ft) {
                        if (16 === r.length) {
                            var v, y, b, w, T, x = r[0], S = r[1], C = r[2], L = r[3], E = r[4], k = r[5], P = r[6], A = r[7], O = r[8], N = r[9], $ = r[10], D = r[12], M = r[13], R = r[14], j = r[11], F = Math.atan2(P, $);
                            d.zOrigin && (R = -d.zOrigin,
                                D = O * R - r[12],
                                M = N * R - r[13],
                                R = $ * R + d.zOrigin - r[14]),
                                d.rotationX = F * I,
                            F && (w = Math.cos(-F),
                                T = Math.sin(-F),
                                v = E * w + O * T,
                                y = k * w + N * T,
                                b = P * w + $ * T,
                                O = E * -T + O * w,
                                N = k * -T + N * w,
                                $ = P * -T + $ * w,
                                j = A * -T + j * w,
                                E = v,
                                k = y,
                                P = b),
                                F = Math.atan2(-C, $),
                                d.rotationY = F * I,
                            F && (w = Math.cos(-F),
                                T = Math.sin(-F),
                                v = x * w - O * T,
                                y = S * w - N * T,
                                b = C * w - $ * T,
                                N = S * T + N * w,
                                $ = C * T + $ * w,
                                j = L * T + j * w,
                                x = v,
                                S = y,
                                C = b),
                                F = Math.atan2(S, x),
                                d.rotation = F * I,
                            F && (w = Math.cos(-F),
                                T = Math.sin(-F),
                                x = x * w + E * T,
                                y = S * w + k * T,
                                k = S * -T + k * w,
                                P = C * -T + P * w,
                                S = y),
                            d.rotationX && Math.abs(d.rotationX) + Math.abs(d.rotation) > 359.9 && (d.rotationX = d.rotation = 0,
                                d.rotationY = 180 - d.rotationY),
                                d.scaleX = (Math.sqrt(x * x + S * S) * m + .5 | 0) / m,
                                d.scaleY = (Math.sqrt(k * k + N * N) * m + .5 | 0) / m,
                                d.scaleZ = (Math.sqrt(P * P + $ * $) * m + .5 | 0) / m,
                                d.rotationX || d.rotationY ? d.skewX = 0 : (d.skewX = E || k ? Math.atan2(E, k) * I + d.rotation : d.skewX || 0,
                                Math.abs(d.skewX) > 90 && Math.abs(d.skewX) < 270 && (f ? (d.scaleX *= -1,
                                    d.skewX += d.rotation <= 0 ? 180 : -180,
                                    d.rotation += d.rotation <= 0 ? 180 : -180) : (d.scaleY *= -1,
                                    d.skewX += d.skewX <= 0 ? 180 : -180))),
                                d.perspective = j ? 1 / (j < 0 ? -j : j) : 0,
                                d.x = D,
                                d.y = M,
                                d.z = R,
                            d.svg && (d.x -= d.xOrigin - (d.xOrigin * x - d.yOrigin * E),
                                d.y -= d.yOrigin - (d.yOrigin * S - d.xOrigin * k))
                        } else if (!At || s || !r.length || d.x !== r[4] || d.y !== r[5] || !d.rotationX && !d.rotationY) {
                            var H = r.length >= 6
                                , B = H ? r[0] : 1
                                , Y = r[1] || 0
                                , V = r[2] || 0
                                , U = H ? r[3] : 1;
                            d.x = r[4] || 0,
                                d.y = r[5] || 0,
                                l = Math.sqrt(B * B + Y * Y),
                                h = Math.sqrt(U * U + V * V),
                                c = B || Y ? Math.atan2(Y, B) * I : d.rotation || 0,
                                u = V || U ? Math.atan2(V, U) * I + c : d.skewX || 0,
                            Math.abs(u) > 90 && Math.abs(u) < 270 && (f ? (l *= -1,
                                u += c <= 0 ? 180 : -180,
                                c += c <= 0 ? 180 : -180) : (h *= -1,
                                u += u <= 0 ? 180 : -180)),
                                d.scaleX = l,
                                d.scaleY = h,
                                d.rotation = c,
                                d.skewX = u,
                            At && (d.rotationX = d.rotationY = d.z = 0,
                                d.perspective = g,
                                d.scaleZ = 1),
                            d.svg && (d.x -= d.xOrigin - (d.xOrigin * B + d.yOrigin * V),
                                d.y -= d.yOrigin - (d.xOrigin * Y + d.yOrigin * U))
                        }
                        d.zOrigin = _;
                        for (a in d)
                            d[a] < p && d[a] > -p && (d[a] = 0)
                    }
                    return n && (t._gsTransform = d,
                    d.svg && (Ct && t.style[Et] ? e.delayedCall(.001, function() {
                        qt(t.style, Et)
                    }) : !Ct && t.getAttribute("transform") && e.delayedCall(.001, function() {
                        t.removeAttribute("transform")
                    }))),
                        d
                }
                , Yt = function(t) {
                    var e, i, n = this.data, s = -n.rotation * R, r = s + n.skewX * R, o = 1e5, a = (Math.cos(s) * n.scaleX * o | 0) / o, l = (Math.sin(s) * n.scaleX * o | 0) / o, h = (Math.sin(r) * -n.scaleY * o | 0) / o, c = (Math.cos(r) * n.scaleY * o | 0) / o, u = this.t.style, d = this.t.currentStyle;
                    if (d) {
                        i = l,
                            l = -h,
                            h = -i,
                            e = d.filter,
                            u.filter = "";
                        var f, p, _ = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== d.position, y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + c, b = n.x + _ * n.xPercent / 100, w = n.y + g * n.yPercent / 100;
                        if (null != n.ox && (f = (n.oxp ? _ * n.ox * .01 : n.ox) - _ / 2,
                            p = (n.oyp ? g * n.oy * .01 : n.oy) - g / 2,
                            b += f - (f * a + p * l),
                            w += p - (f * h + p * c)),
                            v ? (f = _ / 2,
                                p = g / 2,
                                y += ", Dx=" + (f - (f * a + p * l) + b) + ", Dy=" + (p - (f * h + p * c) + w) + ")") : y += ", sizingMethod='auto expand')",
                            e.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? u.filter = e.replace($, y) : u.filter = y + " " + e,
                        0 !== t && 1 !== t || 1 === a && 0 === l && 0 === h && 1 === c && (v && y.indexOf("Dx=0, Dy=0") === -1 || x.test(e) && 100 !== parseFloat(RegExp.$1) || e.indexOf(e.indexOf("Alpha")) === -1 && u.removeAttribute("filter")),
                            !v) {
                            var S, C, L, E = m < 8 ? 1 : -1;
                            for (f = n.ieOffsetX || 0,
                                     p = n.ieOffsetY || 0,
                                     n.ieOffsetX = Math.round((_ - ((a < 0 ? -a : a) * _ + (l < 0 ? -l : l) * g)) / 2 + b),
                                     n.ieOffsetY = Math.round((g - ((c < 0 ? -c : c) * g + (h < 0 ? -h : h) * _)) / 2 + w),
                                     wt = 0; wt < 4; wt++)
                                C = st[wt],
                                    S = d[C],
                                    i = S.indexOf("px") !== -1 ? parseFloat(S) : K(this.t, C, parseFloat(S), S.replace(T, "")) || 0,
                                    L = i !== n[C] ? wt < 2 ? -n.ieOffsetX : -n.ieOffsetY : wt < 2 ? f - n.ieOffsetX : p - n.ieOffsetY,
                                    u[C] = (n[C] = Math.round(i - L * (0 === wt || 2 === wt ? 1 : E))) + "px"
                        }
                    }
                }, Vt = V.set3DTransformRatio = V.setTransformRatio = function(t) {
                    var e, i, n, s, r, o, a, l, h, c, u, d, p, m, _, g, v, y, b, w, T, x, S, C = this.data, L = this.t.style, E = C.rotation, k = C.rotationX, P = C.rotationY, A = C.scaleX, O = C.scaleY, N = C.scaleZ, $ = C.x, D = C.y, M = C.z, I = C.svg, j = C.perspective, F = C.force3D;
                    if (((1 === t || 0 === t) && "auto" === F && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !F) && !M && !j && !P && !k && 1 === N || Ct && I || !At)
                        return void (E || C.skewX || I ? (E *= R,
                            x = C.skewX * R,
                            S = 1e5,
                            e = Math.cos(E) * A,
                            s = Math.sin(E) * A,
                            i = Math.sin(E - x) * -O,
                            r = Math.cos(E - x) * O,
                        x && "simple" === C.skewType && (v = Math.tan(x - C.skewY * R),
                            v = Math.sqrt(1 + v * v),
                            i *= v,
                            r *= v,
                        C.skewY && (v = Math.tan(C.skewY * R),
                            v = Math.sqrt(1 + v * v),
                            e *= v,
                            s *= v)),
                        I && ($ += C.xOrigin - (C.xOrigin * e + C.yOrigin * i) + C.xOffset,
                            D += C.yOrigin - (C.xOrigin * s + C.yOrigin * r) + C.yOffset,
                        Ct && (C.xPercent || C.yPercent) && (m = this.t.getBBox(),
                            $ += .01 * C.xPercent * m.width,
                            D += .01 * C.yPercent * m.height),
                            m = 1e-6,
                        $ < m && $ > -m && ($ = 0),
                        D < m && D > -m && (D = 0)),
                            b = (e * S | 0) / S + "," + (s * S | 0) / S + "," + (i * S | 0) / S + "," + (r * S | 0) / S + "," + $ + "," + D + ")",
                            I && Ct ? this.t.setAttribute("transform", "matrix(" + b) : L[Et] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + b) : L[Et] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix(" : "matrix(") + A + ",0,0," + O + "," + $ + "," + D + ")");
                    if (f && (m = 1e-4,
                    A < m && A > -m && (A = N = 2e-5),
                    O < m && O > -m && (O = N = 2e-5),
                    !j || C.z || C.rotationX || C.rotationY || (j = 0)),
                    E || C.skewX)
                        E *= R,
                            _ = e = Math.cos(E),
                            g = s = Math.sin(E),
                        C.skewX && (E -= C.skewX * R,
                            _ = Math.cos(E),
                            g = Math.sin(E),
                        "simple" === C.skewType && (v = Math.tan((C.skewX - C.skewY) * R),
                            v = Math.sqrt(1 + v * v),
                            _ *= v,
                            g *= v,
                        C.skewY && (v = Math.tan(C.skewY * R),
                            v = Math.sqrt(1 + v * v),
                            e *= v,
                            s *= v))),
                            i = -g,
                            r = _;
                    else {
                        if (!(P || k || 1 !== N || j || I))
                            return void (L[Et] = (C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) translate3d(" : "translate3d(") + $ + "px," + D + "px," + M + "px)" + (1 !== A || 1 !== O ? " scale(" + A + "," + O + ")" : ""));
                        e = r = 1,
                            i = s = 0
                    }
                    h = 1,
                        n = o = a = l = c = u = 0,
                        d = j ? -1 / j : 0,
                        p = C.zOrigin,
                        m = 1e-6,
                        w = ",",
                        T = "0",
                        E = P * R,
                    E && (_ = Math.cos(E),
                        g = Math.sin(E),
                        a = -g,
                        c = d * -g,
                        n = e * g,
                        o = s * g,
                        h = _,
                        d *= _,
                        e *= _,
                        s *= _),
                        E = k * R,
                    E && (_ = Math.cos(E),
                        g = Math.sin(E),
                        v = i * _ + n * g,
                        y = r * _ + o * g,
                        l = h * g,
                        u = d * g,
                        n = i * -g + n * _,
                        o = r * -g + o * _,
                        h *= _,
                        d *= _,
                        i = v,
                        r = y),
                    1 !== N && (n *= N,
                        o *= N,
                        h *= N,
                        d *= N),
                    1 !== O && (i *= O,
                        r *= O,
                        l *= O,
                        u *= O),
                    1 !== A && (e *= A,
                        s *= A,
                        a *= A,
                        c *= A),
                    (p || I) && (p && ($ += n * -p,
                        D += o * -p,
                        M += h * -p + p),
                    I && ($ += C.xOrigin - (C.xOrigin * e + C.yOrigin * i) + C.xOffset,
                        D += C.yOrigin - (C.xOrigin * s + C.yOrigin * r) + C.yOffset),
                    $ < m && $ > -m && ($ = T),
                    D < m && D > -m && (D = T),
                    M < m && M > -m && (M = 0)),
                        b = C.xPercent || C.yPercent ? "translate(" + C.xPercent + "%," + C.yPercent + "%) matrix3d(" : "matrix3d(",
                        b += (e < m && e > -m ? T : e) + w + (s < m && s > -m ? T : s) + w + (a < m && a > -m ? T : a),
                        b += w + (c < m && c > -m ? T : c) + w + (i < m && i > -m ? T : i) + w + (r < m && r > -m ? T : r),
                        k || P || 1 !== N ? (b += w + (l < m && l > -m ? T : l) + w + (u < m && u > -m ? T : u) + w + (n < m && n > -m ? T : n),
                            b += w + (o < m && o > -m ? T : o) + w + (h < m && h > -m ? T : h) + w + (d < m && d > -m ? T : d) + w) : b += ",0,0,0,0,1,0,",
                        b += $ + w + D + w + M + w + (j ? 1 + -M / j : 1) + ")",
                        L[Et] = b
                }
            ;
            h = Ot.prototype,
                h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0,
                h.scaleX = h.scaleY = h.scaleZ = 1,
                xt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, i, n, r, a, l) {
                        if (n._lastParsedTransform === l)
                            return r;
                        n._lastParsedTransform = l;
                        var h;
                        "function" == typeof l[i] && (h = l[i],
                            l[i] = e);
                        var c, u, d, f, p, m, v, y, b, w = t._gsTransform, T = t.style, x = 1e-6, S = Lt.length, C = l, L = {}, E = "transformOrigin", k = Bt(t, s, !0, C.parseTransform), P = C.transform && ("function" == typeof C.transform ? C.transform(g, _) : C.transform);
                        if (n._transform = k,
                        P && "string" == typeof P && Et)
                            u = B.style,
                                u[Et] = P,
                                u.display = "block",
                                u.position = "absolute",
                                F.body.appendChild(B),
                                c = Bt(B, null, !1),
                            k.svg && (m = k.xOrigin,
                                v = k.yOrigin,
                                c.x -= k.xOffset,
                                c.y -= k.yOffset,
                            (C.transformOrigin || C.svgOrigin) && (P = {},
                                Rt(t, ot(C.transformOrigin), P, C.svgOrigin, C.smoothOrigin, !0),
                                m = P.xOrigin,
                                v = P.yOrigin,
                                c.x -= P.xOffset - k.xOffset,
                                c.y -= P.yOffset - k.yOffset),
                            (m || v) && (y = Ht(B, !0),
                                c.x -= m - (m * y[0] + v * y[2]),
                                c.y -= v - (m * y[1] + v * y[3]))),
                                F.body.removeChild(B),
                            c.perspective || (c.perspective = k.perspective),
                            null != C.xPercent && (c.xPercent = lt(C.xPercent, k.xPercent)),
                            null != C.yPercent && (c.yPercent = lt(C.yPercent, k.yPercent));
                        else if ("object" == typeof C) {
                            if (c = {
                                scaleX: lt(null != C.scaleX ? C.scaleX : C.scale, k.scaleX),
                                scaleY: lt(null != C.scaleY ? C.scaleY : C.scale, k.scaleY),
                                scaleZ: lt(C.scaleZ, k.scaleZ),
                                x: lt(C.x, k.x),
                                y: lt(C.y, k.y),
                                z: lt(C.z, k.z),
                                xPercent: lt(C.xPercent, k.xPercent),
                                yPercent: lt(C.yPercent, k.yPercent),
                                perspective: lt(C.transformPerspective, k.perspective)
                            },
                                p = C.directionalRotation,
                            null != p)
                                if ("object" == typeof p)
                                    for (u in p)
                                        C[u] = p[u];
                                else
                                    C.rotation = p;
                            "string" == typeof C.x && C.x.indexOf("%") !== -1 && (c.x = 0,
                                c.xPercent = lt(C.x, k.xPercent)),
                            "string" == typeof C.y && C.y.indexOf("%") !== -1 && (c.y = 0,
                                c.yPercent = lt(C.y, k.yPercent)),
                                c.rotation = ht("rotation"in C ? C.rotation : "shortRotation"in C ? C.shortRotation + "_short" : "rotationZ"in C ? C.rotationZ : k.rotation - k.skewY, k.rotation - k.skewY, "rotation", L),
                            At && (c.rotationX = ht("rotationX"in C ? C.rotationX : "shortRotationX"in C ? C.shortRotationX + "_short" : k.rotationX || 0, k.rotationX, "rotationX", L),
                                c.rotationY = ht("rotationY"in C ? C.rotationY : "shortRotationY"in C ? C.shortRotationY + "_short" : k.rotationY || 0, k.rotationY, "rotationY", L)),
                                c.skewX = ht(C.skewX, k.skewX - k.skewY),
                            (c.skewY = ht(C.skewY, k.skewY)) && (c.skewX += c.skewY,
                                c.rotation += c.skewY)
                        }
                        for (At && null != C.force3D && (k.force3D = C.force3D,
                            f = !0),
                                 k.skewType = C.skewType || k.skewType || o.defaultSkewType,
                                 d = k.force3D || k.z || k.rotationX || k.rotationY || c.z || c.rotationX || c.rotationY || c.perspective,
                             d || null == C.scale || (c.scaleZ = 1); --S > -1; )
                            b = Lt[S],
                                P = c[b] - k[b],
                            (P > x || P < -x || null != C[b] || null != j[b]) && (f = !0,
                                r = new vt(k,b,k[b],P,r),
                            b in L && (r.e = L[b]),
                                r.xs0 = 0,
                                r.plugin = a,
                                n._overwriteProps.push(r.n));
                        return P = C.transformOrigin,
                        k.svg && (P || C.svgOrigin) && (m = k.xOffset,
                            v = k.yOffset,
                            Rt(t, ot(P), c, C.svgOrigin, C.smoothOrigin),
                            r = yt(k, "xOrigin", (w ? k : c).xOrigin, c.xOrigin, r, E),
                            r = yt(k, "yOrigin", (w ? k : c).yOrigin, c.yOrigin, r, E),
                        m === k.xOffset && v === k.yOffset || (r = yt(k, "xOffset", w ? m : k.xOffset, k.xOffset, r, E),
                            r = yt(k, "yOffset", w ? v : k.yOffset, k.yOffset, r, E)),
                            P = Ct ? null : "0px 0px"),
                        (P || At && d && k.zOrigin) && (Et ? (f = !0,
                            b = Pt,
                            P = (P || Z(t, b, s, !1, "50% 50%")) + "",
                            r = new vt(T,b,0,0,r,(-1),E),
                            r.b = T[b],
                            r.plugin = a,
                            At ? (u = k.zOrigin,
                                P = P.split(" "),
                                k.zOrigin = (P.length > 2 && (0 === u || "0px" !== P[2]) ? parseFloat(P[2]) : u) || 0,
                                r.xs0 = r.e = P[0] + " " + (P[1] || "50%") + " 0px",
                                r = new vt(k,"zOrigin",0,0,r,(-1),r.n),
                                r.b = u,
                                r.xs0 = r.e = k.zOrigin) : r.xs0 = r.e = P) : ot(P + "", k)),
                        f && (n._transformType = k.svg && Ct || !d && 3 !== this._transformType ? 2 : 3),
                        h && (l[i] = h),
                            r
                    },
                    prefix: !0
                }),
                xt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }),
                xt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, r, o, a) {
                        e = this.format(e);
                        var l, h, c, u, d, f, p, m, _, g, v, y, b, w, T, x, S = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], C = t.style;
                        for (_ = parseFloat(t.offsetWidth),
                                 g = parseFloat(t.offsetHeight),
                                 l = e.split(" "),
                                 h = 0; h < S.length; h++)
                            this.p.indexOf("border") && (S[h] = J(S[h])),
                                d = u = Z(t, S[h], s, !1, "0px"),
                            d.indexOf(" ") !== -1 && (u = d.split(" "),
                                d = u[0],
                                u = u[1]),
                                f = c = l[h],
                                p = parseFloat(d),
                                y = d.substr((p + "").length),
                                b = "=" === f.charAt(1),
                                b ? (m = parseInt(f.charAt(0) + "1", 10),
                                    f = f.substr(2),
                                    m *= parseFloat(f),
                                    v = f.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(f),
                                    v = f.substr((m + "").length)),
                            "" === v && (v = n[i] || y),
                            v !== y && (w = K(t, "borderLeft", p, y),
                                T = K(t, "borderTop", p, y),
                                "%" === v ? (d = w / _ * 100 + "%",
                                    u = T / g * 100 + "%") : "em" === v ? (x = K(t, "borderLeft", 1, "em"),
                                    d = w / x + "em",
                                    u = T / x + "em") : (d = w + "px",
                                    u = T + "px"),
                            b && (f = parseFloat(d) + m + v,
                                c = parseFloat(u) + m + v)),
                                o = bt(C, S[h], d + " " + u, f + " " + c, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: mt("0px 0px 0px 0px", !1, !0)
                }),
                xt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, r, o) {
                        return bt(t.style, i, this.format(Z(t, i, s, !1, "0px 0px")), this.format(e), !1, "0px", r)
                    },
                    prefix: !0,
                    formatter: mt("0px 0px", !1, !0)
                }),
                xt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, n, r, o) {
                        var a, l, h, c, u, d, f = "background-position", p = s || Q(t, null), _ = this.format((p ? m ? p.getPropertyValue(f + "-x") + " " + p.getPropertyValue(f + "-y") : p.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), g = this.format(e);
                        if (_.indexOf("%") !== -1 != (g.indexOf("%") !== -1) && g.split(",").length < 2 && (d = Z(t, "backgroundImage").replace(P, ""),
                        d && "none" !== d)) {
                            for (a = _.split(" "),
                                     l = g.split(" "),
                                     Y.setAttribute("src", d),
                                     h = 2; --h > -1; )
                                _ = a[h],
                                    c = _.indexOf("%") !== -1,
                                c !== (l[h].indexOf("%") !== -1) && (u = 0 === h ? t.offsetWidth - Y.width : t.offsetHeight - Y.height,
                                    a[h] = c ? parseFloat(_) / 100 * u + "px" : parseFloat(_) / u * 100 + "%");
                            _ = a.join(" ")
                        }
                        return this.parseComplex(t.style, _, g, r, o)
                    },
                    formatter: ot
                }),
                xt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function(t) {
                        return t += "",
                            ot(t.indexOf(" ") === -1 ? t + " " + t : t)
                    }
                }),
                xt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }),
                xt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }),
                xt("transformStyle", {
                    prefix: !0
                }),
                xt("backfaceVisibility", {
                    prefix: !0
                }),
                xt("userSelect", {
                    prefix: !0
                }),
                xt("margin", {
                    parser: _t("marginTop,marginRight,marginBottom,marginLeft")
                }),
                xt("padding", {
                    parser: _t("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }),
                xt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, n, r, o) {
                        var a, l, h;
                        return m < 9 ? (l = t.currentStyle,
                            h = m < 8 ? " " : ",",
                            a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")",
                            e = this.format(e).split(",").join(h)) : (a = this.format(Z(t, this.p, s, !1, this.dflt)),
                            e = this.format(e)),
                            this.parseComplex(t.style, a, e, r, o)
                    }
                }),
                xt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }),
                xt("autoRound,strictUnits", {
                    parser: function(t, e, i, n, s) {
                        return s
                    }
                }),
                xt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, n, r, o) {
                        var a = Z(t, "borderTopWidth", s, !1, "0px")
                            , l = this.format(e).split(" ")
                            , h = l[0].replace(T, "");
                        return "px" !== h && (a = parseFloat(a) / K(t, "borderTopWidth", 1, h) + h),
                            this.parseComplex(t.style, this.format(a + " " + Z(t, "borderTopStyle", s, !1, "solid") + " " + Z(t, "borderTopColor", s, !1, "#000")), l.join(" "), r, o)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(pt) || ["#000"])[0]
                    }
                }),
                xt("borderWidth", {
                    parser: _t("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }),
                xt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, n, s, r) {
                        var o = t.style
                            , a = "cssFloat"in o ? "cssFloat" : "styleFloat";
                        return new vt(o,a,0,0,s,(-1),i,(!1),0,o[a],e)
                    }
                });
            var Ut = function(t) {
                var e, i = this.t, n = i.filter || Z(this.data, "filter") || "", s = this.s + this.c * t | 0;
                100 === s && (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1 && n.indexOf("oader(") === -1 ? (i.removeAttribute("filter"),
                    e = !Z(this.data, "filter")) : (i.filter = n.replace(C, ""),
                    e = !0)),
                e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + s + ")"),
                    n.indexOf("pacity") === -1 ? 0 === s && this.xn1 || (i.filter = n + " alpha(opacity=" + s + ")") : i.filter = n.replace(x, "opacity=" + s))
            };
            xt("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(t, e, i, n, r, o) {
                    var a = parseFloat(Z(t, "opacity", s, !1, "1"))
                        , l = t.style
                        , h = "autoAlpha" === i;
                    return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a),
                    h && 1 === a && "hidden" === Z(t, "visibility", s) && 0 !== e && (a = 0),
                        q ? r = new vt(l,"opacity",a,e - a,r) : (r = new vt(l,"opacity",100 * a,100 * (e - a),r),
                            r.xn1 = h ? 1 : 0,
                            l.zoom = 1,
                            r.type = 2,
                            r.b = "alpha(opacity=" + r.s + ")",
                            r.e = "alpha(opacity=" + (r.s + r.c) + ")",
                            r.data = t,
                            r.plugin = o,
                            r.setRatio = Ut),
                    h && (r = new vt(l,"visibility",0,0,r,(-1),null,(!1),0,0 !== a ? "inherit" : "hidden",0 === e ? "hidden" : "inherit"),
                        r.xs0 = "inherit",
                        n._overwriteProps.push(r.n),
                        n._overwriteProps.push(i)),
                        r
                }
            });
            var qt = function(t, e) {
                e && (t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e),
                    t.removeProperty(e.replace(E, "-$1").toLowerCase())) : t.removeAttribute(e))
            }
                , zt = function(t) {
                if (this.t._gsClassPT = this,
                1 === t || 0 === t) {
                    this.t.setAttribute("class", 0 === t ? this.b : this.e);
                    for (var e = this.data, i = this.t.style; e; )
                        e.v ? i[e.p] = e.v : qt(i, e.p),
                            e = e._next;
                    1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else
                    this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            };
            xt("className", {
                parser: function(t, e, n, r, o, a, l) {
                    var h, c, u, d, f, p = t.getAttribute("class") || "", m = t.style.cssText;
                    if (o = r._classNamePT = new vt(t,n,0,0,o,2),
                        o.setRatio = zt,
                        o.pr = -11,
                        i = !0,
                        o.b = p,
                        c = et(t, s),
                        u = t._gsClassPT) {
                        for (d = {},
                                 f = u.data; f; )
                            d[f.p] = 1,
                                f = f._next;
                        u.setRatio(1)
                    }
                    return t._gsClassPT = o,
                        o.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""),
                        t.setAttribute("class", o.e),
                        h = it(t, c, et(t), l, d),
                        t.setAttribute("class", p),
                        o.data = h.firstMPT,
                        t.style.cssText = m,
                        o = o.xfirst = r.parse(t, h.difs, o, a)
                }
            });
            var Wt = function(t) {
                if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var e, i, n, s, r, o = this.t.style, a = l.transform.parse;
                    if ("all" === this.e)
                        o.cssText = "",
                            s = !0;
                    else
                        for (e = this.e.split(" ").join("").split(","),
                                 n = e.length; --n > -1; )
                            i = e[n],
                            l[i] && (l[i].parse === a ? s = !0 : i = "transformOrigin" === i ? Pt : l[i].p),
                                qt(o, i);
                    s && (qt(o, Et),
                        r = this.t._gsTransform,
                    r && (r.svg && (this.t.removeAttribute("data-svg-origin"),
                        this.t.removeAttribute("transform")),
                        delete this.t._gsTransform))
                }
            };
            for (xt("clearProps", {
                parser: function(t, e, n, s, r) {
                    return r = new vt(t,n,0,0,r,2),
                        r.setRatio = Wt,
                        r.e = e,
                        r.pr = -10,
                        r.data = s._tween,
                        i = !0,
                        r
                }
            }),
                     h = "bezier,throwProps,physicsProps,physics2D".split(","),
                     wt = h.length; wt--; )
                St(h[wt]);
            h = o.prototype,
                h._firstPT = h._lastParsedTransform = h._transform = null,
                h._onInitTween = function(t, e, a, h) {
                    if (!t.nodeType)
                        return !1;
                    this._target = _ = t,
                        this._tween = a,
                        this._vars = e,
                        g = h,
                        c = e.autoRound,
                        i = !1,
                        n = e.suffixMap || o.suffixMap,
                        s = Q(t, ""),
                        r = this._overwriteProps;
                    var f, m, v, y, b, w, T, x, C, L = t.style;
                    if (u && "" === L.zIndex && (f = Z(t, "zIndex", s),
                    "auto" !== f && "" !== f || this._addLazySet(L, "zIndex", 0)),
                    "string" == typeof e && (y = L.cssText,
                        f = et(t, s),
                        L.cssText = y + ";" + e,
                        f = it(t, f, et(t)).difs,
                    !q && S.test(e) && (f.opacity = parseFloat(RegExp.$1)),
                        e = f,
                        L.cssText = y),
                        e.className ? this._firstPT = m = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = m = this.parse(t, e, null),
                        this._transformType) {
                        for (C = 3 === this._transformType,
                                 Et ? d && (u = !0,
                                 "" === L.zIndex && (T = Z(t, "zIndex", s),
                                 "auto" !== T && "" !== T || this._addLazySet(L, "zIndex", 0)),
                                 p && this._addLazySet(L, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (C ? "visible" : "hidden"))) : L.zoom = 1,
                                 v = m; v && v._next; )
                            v = v._next;
                        x = new vt(t,"transform",0,0,null,2),
                            this._linkCSSP(x, null, v),
                            x.setRatio = Et ? Vt : Yt,
                            x.data = this._transform || Bt(t, s, !0),
                            x.tween = a,
                            x.pr = -1,
                            r.pop()
                    }
                    if (i) {
                        for (; m; ) {
                            for (w = m._next,
                                     v = y; v && v.pr > m.pr; )
                                v = v._next;
                            (m._prev = v ? v._prev : b) ? m._prev._next = m : y = m,
                                (m._next = v) ? v._prev = m : b = m,
                                m = w
                        }
                        this._firstPT = y
                    }
                    return !0
                }
                ,
                h.parse = function(t, e, i, r) {
                    var o, a, h, u, d, f, p, m, v, y, b = t.style;
                    for (o in e)
                        f = e[o],
                        "function" == typeof f && (f = f(g, _)),
                            a = l[o],
                            a ? i = a.parse(t, f, o, this, i, r, e) : (d = Z(t, o, s) + "",
                                v = "string" == typeof f,
                                "color" === o || "fill" === o || "stroke" === o || o.indexOf("Color") !== -1 || v && L.test(f) ? (v || (f = dt(f),
                                    f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"),
                                    i = bt(b, o, d, f, !0, "transparent", i, 0, r)) : v && M.test(f) ? i = bt(b, o, d, f, !0, null, i, 0, r) : (h = parseFloat(d),
                                    p = h || 0 === h ? d.substr((h + "").length) : "",
                                "" !== d && "auto" !== d || ("width" === o || "height" === o ? (h = rt(t, o, s),
                                    p = "px") : "left" === o || "top" === o ? (h = tt(t, o, s),
                                    p = "px") : (h = "opacity" !== o ? 0 : 1,
                                    p = "")),
                                    y = v && "=" === f.charAt(1),
                                    y ? (u = parseInt(f.charAt(0) + "1", 10),
                                        f = f.substr(2),
                                        u *= parseFloat(f),
                                        m = f.replace(T, "")) : (u = parseFloat(f),
                                        m = v ? f.replace(T, "") : ""),
                                "" === m && (m = o in n ? n[o] : p),
                                    f = u || 0 === u ? (y ? u + h : u) + m : e[o],
                                p !== m && "" !== m && (u || 0 === u) && h && (h = K(t, o, h, p),
                                    "%" === m ? (h /= K(t, o, 100, "%") / 100,
                                    e.strictUnits !== !0 && (d = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= K(t, o, 1, m) : "px" !== m && (u = K(t, o, u, m),
                                        m = "px"),
                                y && (u || 0 === u) && (f = u + h + m)),
                                y && (u += h),
                                    !h && 0 !== h || !u && 0 !== u ? void 0 !== b[o] && (f || f + "" != "NaN" && null != f) ? (i = new vt(b,o,u || h || 0,0,i,(-1),o,(!1),0,d,f),
                                        i.xs0 = "none" !== f || "display" !== o && o.indexOf("Style") === -1 ? f : d) : W("invalid " + o + " tween value: " + e[o]) : (i = new vt(b,o,h,u - h,i,0,o,c !== !1 && ("px" === m || "zIndex" === o),0,d,f),
                                        i.xs0 = m))),
                        r && i && !i.plugin && (i.plugin = r);
                    return i
                }
                ,
                h.setRatio = function(t) {
                    var e, i, n, s = this._firstPT, r = 1e-6;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; s; ) {
                                if (e = s.c * t + s.s,
                                    s.r ? e = Math.round(e) : e < r && e > -r && (e = 0),
                                    s.type)
                                    if (1 === s.type)
                                        if (n = s.l,
                                        2 === n)
                                            s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
                                        else if (3 === n)
                                            s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
                                        else if (4 === n)
                                            s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
                                        else if (5 === n)
                                            s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
                                        else {
                                            for (i = s.xs0 + e + s.xs1,
                                                     n = 1; n < s.l; n++)
                                                i += s["xn" + n] + s["xs" + (n + 1)];
                                            s.t[s.p] = i
                                        }
                                    else
                                        s.type === -1 ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
                                else
                                    s.t[s.p] = e + s.xs0;
                                s = s._next
                            }
                        else
                            for (; s; )
                                2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t),
                                    s = s._next;
                    else
                        for (; s; ) {
                            if (2 !== s.type)
                                if (s.r && s.type !== -1)
                                    if (e = Math.round(s.s + s.c),
                                        s.type) {
                                        if (1 === s.type) {
                                            for (n = s.l,
                                                     i = s.xs0 + e + s.xs1,
                                                     n = 1; n < s.l; n++)
                                                i += s["xn" + n] + s["xs" + (n + 1)];
                                            s.t[s.p] = i
                                        }
                                    } else
                                        s.t[s.p] = e + s.xs0;
                                else
                                    s.t[s.p] = s.e;
                            else
                                s.setRatio(t);
                            s = s._next
                        }
                }
                ,
                h._enableTransforms = function(t) {
                    this._transform = this._transform || Bt(this._target, s, !0),
                        this._transformType = this._transform.svg && Ct || !t && 3 !== this._transformType ? 2 : 3
                }
            ;
            var Xt = function(t) {
                this.t[this.p] = this.e,
                    this.data._linkCSSP(this, this._next, null, !0)
            };
            h._addLazySet = function(t, e, i) {
                var n = this._firstPT = new vt(t,e,0,0,this._firstPT,2);
                n.e = i,
                    n.setRatio = Xt,
                    n.data = this
            }
                ,
                h._linkCSSP = function(t, e, i, n) {
                    return t && (e && (e._prev = t),
                    t._next && (t._next._prev = t._prev),
                        t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next,
                            n = !0),
                        i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t),
                        t._next = e,
                        t._prev = i),
                        t
                }
                ,
                h._mod = function(t) {
                    for (var e = this._firstPT; e; )
                        "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1),
                            e = e._next
                }
                ,
                h._kill = function(e) {
                    var i, n, s, r = e;
                    if (e.autoAlpha || e.alpha) {
                        r = {};
                        for (n in e)
                            r[n] = e[n];
                        r.opacity = 1,
                        r.autoAlpha && (r.visibility = 1)
                    }
                    for (e.className && (i = this._classNamePT) && (s = i.xfirst,
                        s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = i._next),
                    i._next && this._linkCSSP(i._next, i._next._next, s._prev),
                        this._classNamePT = null),
                             i = this._firstPT; i; )
                        i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e),
                            n = i.plugin),
                            i = i._next;
                    return t.prototype._kill.call(this, r)
                }
            ;
            var Gt = function(t, e, i) {
                var n, s, r, o;
                if (t.slice)
                    for (s = t.length; --s > -1; )
                        Gt(t[s], e, i);
                else
                    for (n = t.childNodes,
                             s = n.length; --s > -1; )
                        r = n[s],
                            o = r.type,
                        r.style && (e.push(et(r)),
                        i && i.push(r)),
                        1 !== o && 9 !== o && 11 !== o || !r.childNodes.length || Gt(r, e, i)
            };
            return o.cascadeTo = function(t, i, n) {
                var s, r, o, a, l = e.to(t, i, n), h = [l], c = [], u = [], d = [], f = e._internals.reservedProps;
                for (t = l._targets || l.target,
                         Gt(t, c, d),
                         l.render(i, !0, !0),
                         Gt(t, u),
                         l.render(0, !0, !0),
                         l._enabled(!0),
                         s = d.length; --s > -1; )
                    if (r = it(d[s], c[s], u[s]),
                        r.firstMPT) {
                        r = r.difs;
                        for (o in n)
                            f[o] && (r[o] = n[o]);
                        a = {};
                        for (o in r)
                            a[o] = c[s][o];
                        h.push(e.fromTo(d[s], i, a, r))
                    }
                return h
            }
                ,
                t.activate([o]),
                o
        }, !0),
        function() {
            var t = _gsScope._gsDefine.plugin({
                propName: "roundProps",
                version: "1.6.0",
                priority: -1,
                API: 2,
                init: function(t, e, i) {
                    return this._tween = i,
                        !0
                }
            })
                , e = function(t) {
                for (; t; )
                    t.f || t.blob || (t.m = Math.round),
                        t = t._next
            }
                , i = t.prototype;
            i._onInitAllProps = function() {
                for (var t, i, n, s = this._tween, r = s.vars.roundProps.join ? s.vars.roundProps : s.vars.roundProps.split(","), o = r.length, a = {}, l = s._propLookup.roundProps; --o > -1; )
                    a[r[o]] = Math.round;
                for (o = r.length; --o > -1; )
                    for (t = r[o],
                             i = s._firstPT; i; )
                        n = i._next,
                            i.pg ? i.t._mod(a) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c),
                            n && (n._prev = i._prev),
                                i._prev ? i._prev._next = n : s._firstPT === i && (s._firstPT = n),
                                i._next = i._prev = null,
                                s._propLookup[t] = l)),
                            i = n;
                return !1
            }
                ,
                i._add = function(t, e, i, n) {
                    this._addTween(t, e, i, i + n, e, Math.round),
                        this._overwriteProps.push(e)
                }
        }(),
        function() {
            _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.6.0",
                init: function(t, e, i, n) {
                    var s, r;
                    if ("function" != typeof t.setAttribute)
                        return !1;
                    for (s in e)
                        r = e[s],
                        "function" == typeof r && (r = r(n, t)),
                            this._addTween(t, "setAttribute", t.getAttribute(s) + "", r + "", s, !1, s),
                            this._overwriteProps.push(s);
                    return !0
                }
            })
        }(),
        _gsScope._gsDefine.plugin({
            propName: "directionalRotation",
            version: "0.3.0",
            API: 2,
            init: function(t, e, i, n) {
                "object" != typeof e && (e = {
                    rotation: e
                }),
                    this.finals = {};
                var s, r, o, a, l, h, c = e.useRadians === !0 ? 2 * Math.PI : 360, u = 1e-6;
                for (s in e)
                    "useRadians" !== s && (a = e[s],
                    "function" == typeof a && (a = a(n, t)),
                        h = (a + "").split("_"),
                        r = h[0],
                        o = parseFloat("function" != typeof t[s] ? t[s] : t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]()),
                        a = this.finals[s] = "string" == typeof r && "=" === r.charAt(1) ? o + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0,
                        l = a - o,
                    h.length && (r = h.join("_"),
                    r.indexOf("short") !== -1 && (l %= c,
                    l !== l % (c / 2) && (l = l < 0 ? l + c : l - c)),
                        r.indexOf("_cw") !== -1 && l < 0 ? l = (l + 9999999999 * c) % c - (l / c | 0) * c : r.indexOf("ccw") !== -1 && l > 0 && (l = (l - 9999999999 * c) % c - (l / c | 0) * c)),
                    (l > u || l < -u) && (this._addTween(t, s, o, o + l, s),
                        this._overwriteProps.push(s)));
                return !0
            },
            set: function(t) {
                var e;
                if (1 !== t)
                    this._super.setRatio.call(this, t);
                else
                    for (e = this._firstPT; e; )
                        e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p],
                            e = e._next
            }
        })._autoCSS = !0,
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
            var e, i, n, s = _gsScope.GreenSockGlobals || _gsScope, r = s.com.greensock, o = 2 * Math.PI, a = Math.PI / 2, l = r._class, h = function(e, i) {
                var n = l("easing." + e, function() {}, !0)
                    , s = n.prototype = new t;
                return s.constructor = n,
                    s.getRatio = i,
                    n
            }, c = t.register || function() {}
                , u = function(t, e, i, n, s) {
                var r = l("easing." + t, {
                    easeOut: new e,
                    easeIn: new i,
                    easeInOut: new n
                }, !0);
                return c(r, t),
                    r
            }, d = function(t, e, i) {
                this.t = t,
                    this.v = e,
                i && (this.next = i,
                    i.prev = this,
                    this.c = i.v - e,
                    this.gap = i.t - t)
            }, f = function(e, i) {
                var n = l("easing." + e, function(t) {
                    this._p1 = t || 0 === t ? t : 1.70158,
                        this._p2 = 1.525 * this._p1
                }, !0)
                    , s = n.prototype = new t;
                return s.constructor = n,
                    s.getRatio = i,
                    s.config = function(t) {
                        return new n(t)
                    }
                    ,
                    n
            }, p = u("Back", f("BackOut", function(t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), f("BackIn", function(t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), f("BackInOut", function(t) {
                return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })), m = l("easing.SlowMo", function(t, e, i) {
                e = e || 0 === e ? e : .7,
                    null == t ? t = .7 : t > 1 && (t = 1),
                    this._p = 1 !== t ? e : 0,
                    this._p1 = (1 - t) / 2,
                    this._p2 = t,
                    this._p3 = this._p1 + this._p2,
                    this._calcEnd = i === !0
            }, !0), _ = m.prototype = new t;
            return _.constructor = m,
                _.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }
                ,
                m.ease = new m(.7,.7),
                _.config = m.config = function(t, e, i) {
                    return new m(t,e,i)
                }
                ,
                e = l("easing.SteppedEase", function(t) {
                    t = t || 1,
                        this._p1 = 1 / t,
                        this._p2 = t + 1
                }, !0),
                _ = e.prototype = new t,
                _.constructor = e,
                _.getRatio = function(t) {
                    return t < 0 ? t = 0 : t >= 1 && (t = .999999999),
                    (this._p2 * t >> 0) * this._p1
                }
                ,
                _.config = e.config = function(t) {
                    return new e(t)
                }
                ,
                i = l("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, n, s, r, o, a, l = e.taper || "none", h = [], c = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, _ = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1; )
                        i = p ? Math.random() : 1 / u * f,
                            n = _ ? _.getRatio(i) : i,
                            "none" === l ? s = g : "out" === l ? (r = 1 - i,
                                s = r * r * g) : "in" === l ? s = i * i * g : i < .5 ? (r = 2 * i,
                                s = r * r * .5 * g) : (r = 2 * (1 - i),
                                s = r * r * .5 * g),
                            p ? n += Math.random() * s - .5 * s : f % 2 ? n += .5 * s : n -= .5 * s,
                        m && (n > 1 ? n = 1 : n < 0 && (n = 0)),
                            h[c++] = {
                                x: i,
                                y: n
                            };
                    for (h.sort(function(t, e) {
                        return t.x - e.x
                    }),
                             a = new d(1,1,null),
                             f = u; --f > -1; )
                        o = h[f],
                            a = new d(o.x,o.y,a);
                    this._prev = new d(0,0,0 !== a.t ? a : a.next)
                }, !0),
                _ = i.prototype = new t,
                _.constructor = i,
                _.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t; )
                            e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && t <= e.t; )
                            e = e.prev;
                    return this._prev = e,
                    e.v + (t - e.t) / e.gap * e.c
                }
                ,
                _.config = function(t) {
                    return new i(t)
                }
                ,
                i.ease = new i,
                u("Bounce", h("BounceOut", function(t) {
                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), h("BounceIn", function(t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), h("BounceInOut", function(t) {
                    var e = t < .5;
                    return t = e ? 1 - 2 * t : 2 * t - 1,
                        t = t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375,
                        e ? .5 * (1 - t) : .5 * t + .5
                })),
                u("Circ", h("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), h("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), h("CircInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })),
                n = function(e, i, n) {
                    var s = l("easing." + e, function(t, e) {
                        this._p1 = t >= 1 ? t : 1,
                            this._p2 = (e || n) / (t < 1 ? t : 1),
                            this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0),
                            this._p2 = o / this._p2
                    }, !0)
                        , r = s.prototype = new t;
                    return r.constructor = s,
                        r.getRatio = i,
                        r.config = function(t, e) {
                            return new s(t,e)
                        }
                        ,
                        s
                }
                ,
                u("Elastic", n("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function(t) {
                    return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
                }, .3), n("ElasticInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                }, .45)),
                u("Expo", h("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), h("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), h("ExpoInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })),
                u("Sine", h("SineOut", function(t) {
                    return Math.sin(t * a)
                }), h("SineIn", function(t) {
                    return -Math.cos(t * a) + 1
                }), h("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })),
                l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0),
                c(s.SlowMo, "SlowMo", "ease,"),
                c(i, "RoughEase", "ease,"),
                c(e, "SteppedEase", "ease,"),
                p
        }, !0)
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = {}
            , n = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!n.TweenLite) {
            var s, r, o, a, l, h = function(t) {
                    var e, i = t.split("."), s = n;
                    for (e = 0; e < i.length; e++)
                        s[i[e]] = s = s[i[e]] || {};
                    return s
                }, c = h("com.greensock"), u = 1e-10, d = function(t) {
                    var e, i = [], n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]))
                        ;
                    return i
                }, f = function() {}, p = function() {
                    var t = Object.prototype.toString
                        , e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(), m = {}, _ = function(s, r, o, a) {
                    this.sc = m[s] ? m[s].sc : [],
                        m[s] = this,
                        this.gsClass = null,
                        this.func = o;
                    var l = [];
                    this.check = function(c) {
                        for (var u, d, f, p, g, v = r.length, y = v; --v > -1; )
                            (u = m[r[v]] || new _(r[v],[])).gsClass ? (l[v] = u.gsClass,
                                y--) : c && u.sc.push(this);
                        if (0 === y && o) {
                            if (d = ("com.greensock." + s).split("."),
                                f = d.pop(),
                                p = h(d.join("."))[f] = this.gsClass = o.apply(o, l),
                                a)
                                if (n[f] = i[f] = p,
                                    g = "undefined" != typeof module && module.exports,
                                !g && "function" == typeof define && define.amd)
                                    define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function() {
                                        return p
                                    });
                                else if (g)
                                    if (s === e) {
                                        module.exports = i[e] = p;
                                        for (v in i)
                                            p[v] = i[v]
                                    } else
                                        i[e] && (i[e][f] = p);
                            for (v = 0; v < this.sc.length; v++)
                                this.sc[v].check()
                        }
                    }
                        ,
                        this.check(!0)
                }, g = t._gsDefine = function(t, e, i, n) {
                    return new _(t,e,i,n)
                }
                , v = c._class = function(t, e, i) {
                    return e = e || function() {}
                        ,
                        g(t, [], function() {
                            return e
                        }, i),
                        e
                }
            ;
            g.globals = n;
            var y = [0, 0, 1, 1]
                , b = v("easing.Ease", function(t, e, i, n) {
                    this._func = t,
                        this._type = i || 0,
                        this._power = n || 0,
                        this._params = e ? y.concat(e) : y
                }, !0)
                , w = b.map = {}
                , T = b.register = function(t, e, i, n) {
                    for (var s, r, o, a, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1; )
                        for (r = l[h],
                                 s = n ? v("easing." + r, null, !0) : c.easing[r] || {},
                                 o = u.length; --o > -1; )
                            a = u[o],
                                w[r + "." + a] = w[a + r] = s[a] = t.getRatio ? t : t[a] || new t
                }
            ;
            for (o = b.prototype,
                     o._calcEnd = !1,
                     o.getRatio = function(t) {
                         if (this._func)
                             return this._params[0] = t,
                                 this._func.apply(null, this._params);
                         var e = this._type
                             , i = this._power
                             , n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                         return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n),
                             1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                     }
                     ,
                     s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
                     r = s.length; --r > -1; )
                o = s[r] + ",Power" + r,
                    T(new b(null,null,1,r), o, "easeOut", !0),
                    T(new b(null,null,2,r), o, "easeIn" + (0 === r ? ",easeNone" : "")),
                    T(new b(null,null,3,r), o, "easeInOut");
            w.linear = c.easing.Linear.easeIn,
                w.swing = c.easing.Quad.easeInOut;
            var x = v("events.EventDispatcher", function(t) {
                this._listeners = {},
                    this._eventTarget = t || this
            });
            o = x.prototype,
                o.addEventListener = function(t, e, i, n, s) {
                    s = s || 0;
                    var r, o, h = this._listeners[t], c = 0;
                    for (this !== a || l || a.wake(),
                         null == h && (this._listeners[t] = h = []),
                             o = h.length; --o > -1; )
                        r = h[o],
                            r.c === e && r.s === i ? h.splice(o, 1) : 0 === c && r.pr < s && (c = o + 1);
                    h.splice(c, 0, {
                        c: e,
                        s: i,
                        up: n,
                        pr: s
                    })
                }
                ,
                o.removeEventListener = function(t, e) {
                    var i, n = this._listeners[t];
                    if (n)
                        for (i = n.length; --i > -1; )
                            if (n[i].c === e)
                                return void n.splice(i, 1)
                }
                ,
                o.dispatchEvent = function(t) {
                    var e, i, n, s = this._listeners[t];
                    if (s)
                        for (e = s.length,
                             e > 1 && (s = s.slice(0)),
                                 i = this._eventTarget; --e > -1; )
                            n = s[e],
                            n && (n.up ? n.c.call(n.s || i, {
                                type: t,
                                target: i
                            }) : n.c.call(n.s || i))
                }
            ;
            var S = t.requestAnimationFrame
                , C = t.cancelAnimationFrame
                , L = Date.now || function() {
                return (new Date).getTime()
            }
                , E = L();
            for (s = ["ms", "moz", "webkit", "o"],
                     r = s.length; --r > -1 && !S; )
                S = t[s[r] + "RequestAnimationFrame"],
                    C = t[s[r] + "CancelAnimationFrame"] || t[s[r] + "CancelRequestAnimationFrame"];
            v("Ticker", function(t, e) {
                var i, n, s, r, o, h = this, c = L(), d = !(e === !1 || !S) && "auto", p = 500, m = 33, _ = "tick", g = function(t) {
                    var e, a, l = L() - E;
                    l > p && (c += l - m),
                        E += l,
                        h.time = (E - c) / 1e3,
                        e = h.time - o,
                    (!i || e > 0 || t === !0) && (h.frame++,
                        o += e + (e >= r ? .004 : r - e),
                        a = !0),
                    t !== !0 && (s = n(g)),
                    a && h.dispatchEvent(_)
                };
                x.call(h),
                    h.time = h.frame = 0,
                    h.tick = function() {
                        g(!0)
                    }
                    ,
                    h.lagSmoothing = function(t, e) {
                        p = t || 1 / u,
                            m = Math.min(e, p, 0)
                    }
                    ,
                    h.sleep = function() {
                        null != s && (d && C ? C(s) : clearTimeout(s),
                            n = f,
                            s = null,
                        h === a && (l = !1))
                    }
                    ,
                    h.wake = function(t) {
                        null !== s ? h.sleep() : t ? c += -E + (E = L()) : h.frame > 10 && (E = L() - p + 5),
                            n = 0 === i ? f : d && S ? S : function(t) {
                                return setTimeout(t, 1e3 * (o - h.time) + 1 | 0)
                            }
                            ,
                        h === a && (l = !0),
                            g(2)
                    }
                    ,
                    h.fps = function(t) {
                        return arguments.length ? (i = t,
                            r = 1 / (i || 60),
                            o = this.time + r,
                            void h.wake()) : i
                    }
                    ,
                    h.useRAF = function(t) {
                        return arguments.length ? (h.sleep(),
                            d = t,
                            void h.fps(i)) : d
                    }
                    ,
                    h.fps(t),
                    setTimeout(function() {
                        "auto" === d && h.frame < 5 && "hidden" !== document.visibilityState && h.useRAF(!1)
                    }, 1500)
            }),
                o = c.Ticker.prototype = new c.events.EventDispatcher,
                o.constructor = c.Ticker;
            var k = v("core.Animation", function(t, e) {
                if (this.vars = e = e || {},
                    this._duration = this._totalDuration = t || 0,
                    this._delay = Number(e.delay) || 0,
                    this._timeScale = 1,
                    this._active = e.immediateRender === !0,
                    this.data = e.data,
                    this._reversed = e.reversed === !0,
                    W) {
                    l || a.wake();
                    var i = this.vars.useFrames ? z : W;
                    i.add(this, i._time),
                    this.vars.paused && this.paused(!0)
                }
            });
            a = k.ticker = new c.Ticker,
                o = k.prototype,
                o._dirty = o._gc = o._initted = o._paused = !1,
                o._totalTime = o._time = 0,
                o._rawPrevTime = -1,
                o._next = o._last = o._onUpdate = o._timeline = o.timeline = null,
                o._paused = !1;
            var P = function() {
                l && L() - E > 2e3 && a.wake(),
                    setTimeout(P, 2e3)
            };
            P(),
                o.play = function(t, e) {
                    return null != t && this.seek(t, e),
                        this.reversed(!1).paused(!1)
                }
                ,
                o.pause = function(t, e) {
                    return null != t && this.seek(t, e),
                        this.paused(!0)
                }
                ,
                o.resume = function(t, e) {
                    return null != t && this.seek(t, e),
                        this.paused(!1)
                }
                ,
                o.seek = function(t, e) {
                    return this.totalTime(Number(t), e !== !1)
                }
                ,
                o.restart = function(t, e) {
                    return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
                }
                ,
                o.reverse = function(t, e) {
                    return null != t && this.seek(t || this.totalDuration(), e),
                        this.reversed(!0).paused(!1)
                }
                ,
                o.render = function(t, e, i) {}
                ,
                o.invalidate = function() {
                    return this._time = this._totalTime = 0,
                        this._initted = this._gc = !1,
                        this._rawPrevTime = -1,
                    !this._gc && this.timeline || this._enabled(!0),
                        this
                }
                ,
                o.isActive = function() {
                    var t, e = this._timeline, i = this._startTime;
                    return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
                }
                ,
                o._enabled = function(t, e) {
                    return l || a.wake(),
                        this._gc = !t,
                        this._active = this.isActive(),
                    e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)),
                        !1
                }
                ,
                o._kill = function(t, e) {
                    return this._enabled(!1, !1)
                }
                ,
                o.kill = function(t, e) {
                    return this._kill(t, e),
                        this
                }
                ,
                o._uncache = function(t) {
                    for (var e = t ? this : this.timeline; e; )
                        e._dirty = !0,
                            e = e.timeline;
                    return this
                }
                ,
                o._swapSelfInParams = function(t) {
                    for (var e = t.length, i = t.concat(); --e > -1; )
                        "{self}" === t[e] && (i[e] = this);
                    return i
                }
                ,
                o._callback = function(t) {
                    var e = this.vars
                        , i = e[t]
                        , n = e[t + "Params"]
                        , s = e[t + "Scope"] || e.callbackScope || this
                        , r = n ? n.length : 0;
                    switch (r) {
                        case 0:
                            i.call(s);
                            break;
                        case 1:
                            i.call(s, n[0]);
                            break;
                        case 2:
                            i.call(s, n[0], n[1]);
                            break;
                        default:
                            i.apply(s, n)
                    }
                }
                ,
                o.eventCallback = function(t, e, i, n) {
                    if ("on" === (t || "").substr(0, 2)) {
                        var s = this.vars;
                        if (1 === arguments.length)
                            return s[t];
                        null == e ? delete s[t] : (s[t] = e,
                            s[t + "Params"] = p(i) && i.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(i) : i,
                            s[t + "Scope"] = n),
                        "onUpdate" === t && (this._onUpdate = e)
                    }
                    return this
                }
                ,
                o.delay = function(t) {
                    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay),
                        this._delay = t,
                        this) : this._delay
                }
                ,
                o.duration = function(t) {
                    return arguments.length ? (this._duration = this._totalDuration = t,
                        this._uncache(!0),
                    this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0),
                        this) : (this._dirty = !1,
                        this._duration)
                }
                ,
                o.totalDuration = function(t) {
                    return this._dirty = !1,
                        arguments.length ? this.duration(t) : this._totalDuration
                }
                ,
                o.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(),
                        this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                }
                ,
                o.totalTime = function(t, e, i) {
                    if (l || a.wake(),
                        !arguments.length)
                        return this._totalTime;
                    if (this._timeline) {
                        if (t < 0 && !i && (t += this.totalDuration()),
                            this._timeline.smoothChildTiming) {
                            this._dirty && this.totalDuration();
                            var n = this._totalDuration
                                , s = this._timeline;
                            if (t > n && !i && (t = n),
                                this._startTime = (this._paused ? this._pauseTime : s._time) - (this._reversed ? n - t : t) / this._timeScale,
                            s._dirty || this._uncache(!1),
                                s._timeline)
                                for (; s._timeline; )
                                    s._timeline._time !== (s._startTime + s._totalTime) / s._timeScale && s.totalTime(s._totalTime, !0),
                                        s = s._timeline
                        }
                        this._gc && this._enabled(!0, !1),
                        this._totalTime === t && 0 !== this._duration || (D.length && G(),
                            this.render(t, e, !1),
                        D.length && G())
                    }
                    return this
                }
                ,
                o.progress = o.totalProgress = function(t, e) {
                    var i = this.duration();
                    return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
                }
                ,
                o.startTime = function(t) {
                    return arguments.length ? (t !== this._startTime && (this._startTime = t,
                    this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)),
                        this) : this._startTime
                }
                ,
                o.endTime = function(t) {
                    return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                }
                ,
                o.timeScale = function(t) {
                    if (!arguments.length)
                        return this._timeScale;
                    if (t = t || u,
                    this._timeline && this._timeline.smoothChildTiming) {
                        var e = this._pauseTime
                            , i = e || 0 === e ? e : this._timeline.totalTime();
                        this._startTime = i - (i - this._startTime) * this._timeScale / t
                    }
                    return this._timeScale = t,
                        this._uncache(!1)
                }
                ,
                o.reversed = function(t) {
                    return arguments.length ? (t != this._reversed && (this._reversed = t,
                        this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
                        this) : this._reversed
                }
                ,
                o.paused = function(t) {
                    if (!arguments.length)
                        return this._paused;
                    var e, i, n = this._timeline;
                    return t != this._paused && n && (l || t || a.wake(),
                        e = n.rawTime(),
                        i = e - this._pauseTime,
                    !t && n.smoothChildTiming && (this._startTime += i,
                        this._uncache(!1)),
                        this._pauseTime = t ? e : null,
                        this._paused = t,
                        this._active = this.isActive(),
                    !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale,
                        this.render(e, e === this._totalTime, !0))),
                    this._gc && !t && this._enabled(!0, !1),
                        this
                }
            ;
            var A = v("core.SimpleTimeline", function(t) {
                k.call(this, 0, t),
                    this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            o = A.prototype = new k,
                o.constructor = A,
                o.kill()._gc = !1,
                o._first = o._last = o._recent = null,
                o._sortChildren = !1,
                o.add = o.insert = function(t, e, i, n) {
                    var s, r;
                    if (t._startTime = Number(e || 0) + t._delay,
                    t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale),
                    t.timeline && t.timeline._remove(t, !0),
                        t.timeline = t._timeline = this,
                    t._gc && t._enabled(!0, !0),
                        s = this._last,
                        this._sortChildren)
                        for (r = t._startTime; s && s._startTime > r; )
                            s = s._prev;
                    return s ? (t._next = s._next,
                        s._next = t) : (t._next = this._first,
                        this._first = t),
                        t._next ? t._next._prev = t : this._last = t,
                        t._prev = s,
                        this._recent = t,
                    this._timeline && this._uncache(!0),
                        this
                }
                ,
                o._remove = function(t, e) {
                    return t.timeline === this && (e || t._enabled(!1, !0),
                        t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next),
                        t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev),
                        t._next = t._prev = t.timeline = null,
                    t === this._recent && (this._recent = this._last),
                    this._timeline && this._uncache(!0)),
                        this
                }
                ,
                o.render = function(t, e, i) {
                    var n, s = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = t; s; )
                        n = s._next,
                        (s._active || t >= s._startTime && !s._paused) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)),
                            s = n
                }
                ,
                o.rawTime = function() {
                    return l || a.wake(),
                        this._totalTime
                }
            ;
            var O = v("TweenLite", function(e, i, n) {
                if (k.call(this, i, n),
                    this.render = O.prototype.render,
                null == e)
                    throw "Cannot tween a null target.";
                this.target = e = "string" != typeof e ? e : O.selector(e) || e;
                var s, r, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
                if (this._overwrite = l = null == l ? q[O.defaultOverwrite] : "number" == typeof l ? l >> 0 : q[l],
                (a || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
                    for (this._targets = o = d(e),
                             this._propLookup = [],
                             this._siblings = [],
                             s = 0; s < o.length; s++)
                        r = o[s],
                            r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (o.splice(s--, 1),
                                this._targets = o = o.concat(d(r))) : (this._siblings[s] = J(r, this, !1),
                            1 === l && this._siblings[s].length > 1 && Z(r, this, null, 1, this._siblings[s])) : (r = o[s--] = O.selector(r),
                            "string" == typeof r && o.splice(s + 1, 1)) : o.splice(s--, 1);
                else
                    this._propLookup = {},
                        this._siblings = J(e, this, !1),
                    1 === l && this._siblings.length > 1 && Z(e, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -u,
                    this.render(Math.min(0, -this._delay)))
            }, !0)
                , N = function(e) {
                return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
            }
                , $ = function(t, e) {
                var i, n = {};
                for (i in t)
                    U[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!B[i] || B[i] && B[i]._autoCSS) || (n[i] = t[i],
                        delete t[i]);
                t.css = n
            };
            o = O.prototype = new k,
                o.constructor = O,
                o.kill()._gc = !1,
                o.ratio = 0,
                o._firstPT = o._targets = o._overwrittenProps = o._startAt = null,
                o._notifyPluginsOfEnabled = o._lazy = !1,
                O.version = "1.19.0",
                O.defaultEase = o._ease = new b(null,null,1,1),
                O.defaultOverwrite = "auto",
                O.ticker = a,
                O.autoSleep = 120,
                O.lagSmoothing = function(t, e) {
                    a.lagSmoothing(t, e)
                }
                ,
                O.selector = t.$ || t.jQuery || function(e) {
                    var i = t.$ || t.jQuery;
                    return i ? (O.selector = i,
                        i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
                }
            ;
            var D = []
                , M = {}
                , R = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
                , I = function(t) {
                    for (var e, i = this._firstPT, n = 1e-6; i; )
                        e = i.blob ? t ? this.join("") : this.start : i.c * t + i.s,
                            i.m ? e = i.m(e, this._target || i.t) : e < n && e > -n && (e = 0),
                            i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e,
                            i = i._next
                }
                , j = function(t, e, i, n) {
                    var s, r, o, a, l, h, c, u = [t, e], d = 0, f = "", p = 0;
                    for (u.start = t,
                         i && (i(u),
                             t = u[0],
                             e = u[1]),
                             u.length = 0,
                             s = t.match(R) || [],
                             r = e.match(R) || [],
                         n && (n._next = null,
                             n.blob = 1,
                             u._firstPT = u._applyPT = n),
                             l = r.length,
                             a = 0; a < l; a++)
                        c = r[a],
                            h = e.substr(d, e.indexOf(c, d) - d),
                            f += h || !a ? h : ",",
                            d += h.length,
                            p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1),
                            c === s[a] || s.length <= a ? f += c : (f && (u.push(f),
                                f = ""),
                                o = parseFloat(s[a]),
                                u.push(o),
                                u._firstPT = {
                                    _next: u._firstPT,
                                    t: u,
                                    p: u.length - 1,
                                    s: o,
                                    c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
                                    f: 0,
                                    m: p && p < 4 ? Math.round : 0
                                }),
                            d += c.length;
                    return f += e.substr(d),
                    f && u.push(f),
                        u.setRatio = I,
                        u
                }
                , F = function(t, e, i, n, s, r, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, t));
                    var h, c, u = "get" === i ? t[e] : i, d = typeof t[e], f = "string" == typeof n && "=" === n.charAt(1), p = {
                        t: t,
                        p: e,
                        s: u,
                        f: "function" === d,
                        pg: 0,
                        n: s || e,
                        m: r ? "function" == typeof r ? r : Math.round : 0,
                        pr: 0,
                        c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - u || 0
                    };
                    if ("number" !== d && ("function" === d && "get" === i && (c = e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                        p.s = u = o ? t[c](o) : t[c]()),
                        "string" == typeof u && (o || isNaN(u)) ? (p.fp = o,
                            h = j(u, n, a || O.defaultStringFilter, p),
                            p = {
                                t: h,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: 2,
                                pg: 0,
                                n: s || e,
                                pr: 0,
                                m: 0
                            }) : f || (p.s = parseFloat(u),
                            p.c = parseFloat(n) - p.s || 0)),
                        p.c)
                        return (p._next = this._firstPT) && (p._next._prev = p),
                            this._firstPT = p,
                            p
                }
                , H = O._internals = {
                    isArray: p,
                    isSelector: N,
                    lazyTweens: D,
                    blobDif: j
                }
                , B = O._plugins = {}
                , Y = H.tweenLookup = {}
                , V = 0
                , U = H.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1
                }
                , q = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                }
                , z = k._rootFramesTimeline = new A
                , W = k._rootTimeline = new A
                , X = 30
                , G = H.lazyRender = function() {
                    var t, e = D.length;
                    for (M = {}; --e > -1; )
                        t = D[e],
                        t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0),
                            t._lazy = !1);
                    D.length = 0
                }
            ;
            W._startTime = a.time,
                z._startTime = a.frame,
                W._active = z._active = !0,
                setTimeout(G, 1),
                k._updateRoot = O.render = function() {
                    var t, e, i;
                    if (D.length && G(),
                        W.render((a.time - W._startTime) * W._timeScale, !1, !1),
                        z.render((a.frame - z._startTime) * z._timeScale, !1, !1),
                    D.length && G(),
                    a.frame >= X) {
                        X = a.frame + (parseInt(O.autoSleep, 10) || 120);
                        for (i in Y) {
                            for (e = Y[i].tweens,
                                     t = e.length; --t > -1; )
                                e[t]._gc && e.splice(t, 1);
                            0 === e.length && delete Y[i]
                        }
                        if (i = W._first,
                        (!i || i._paused) && O.autoSleep && !z._first && 1 === a._listeners.tick.length) {
                            for (; i && i._paused; )
                                i = i._next;
                            i || a.sleep()
                        }
                    }
                }
                ,
                a.addEventListener("tick", k._updateRoot);
            var J = function(t, e, i) {
                var n, s, r = t._gsTweenID;
                if (Y[r || (t._gsTweenID = r = "t" + V++)] || (Y[r] = {
                    target: t,
                    tweens: []
                }),
                e && (n = Y[r].tweens,
                    n[s = n.length] = e,
                    i))
                    for (; --s > -1; )
                        n[s] === e && n.splice(s, 1);
                return Y[r].tweens
            }
                , Q = function(t, e, i, n) {
                var s, r, o = t.vars.onOverwrite;
                return o && (s = o(t, e, i, n)),
                    o = O.onOverwrite,
                o && (r = o(t, e, i, n)),
                s !== !1 && r !== !1
            }
                , Z = function(t, e, i, n, s) {
                var r, o, a, l;
                if (1 === n || n >= 4) {
                    for (l = s.length,
                             r = 0; r < l; r++)
                        if ((a = s[r]) !== e)
                            a._gc || a._kill(null, t, e) && (o = !0);
                        else if (5 === n)
                            break;
                    return o
                }
                var h, c = e._startTime + u, d = [], f = 0, p = 0 === e._duration;
                for (r = s.length; --r > -1; )
                    (a = s[r]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || K(e, 0, p),
                    0 === K(a, h, p) && (d[f++] = a)) : a._startTime <= c && a._startTime + a.totalDuration() / a._timeScale > c && ((p || !a._initted) && c - a._startTime <= 2e-10 || (d[f++] = a)));
                for (r = f; --r > -1; )
                    if (a = d[r],
                    2 === n && a._kill(i, t, e) && (o = !0),
                    2 !== n || !a._firstPT && a._initted) {
                        if (2 !== n && !Q(a, e))
                            continue;
                        a._enabled(!1, !1) && (o = !0)
                    }
                return o
            }
                , K = function(t, e, i) {
                for (var n = t._timeline, s = n._timeScale, r = t._startTime; n._timeline; ) {
                    if (r += n._startTime,
                        s *= n._timeScale,
                        n._paused)
                        return -100;
                    n = n._timeline
                }
                return r /= s,
                    r > e ? r - e : i && r === e || !t._initted && r - e < 2 * u ? u : (r += t.totalDuration() / t._timeScale / s) > e + u ? 0 : r - e - u
            };
            o._init = function() {
                var t, e, i, n, s, r, o = this.vars, a = this._overwrittenProps, l = this._duration, h = !!o.immediateRender, c = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0),
                        this._startAt.kill()),
                        s = {};
                    for (n in o.startAt)
                        s[n] = o.startAt[n];
                    if (s.overwrite = !1,
                        s.immediateRender = !0,
                        s.lazy = h && o.lazy !== !1,
                        s.startAt = s.delay = null,
                        this._startAt = O.to(this.target, 0, s),
                        h)
                        if (this._time > 0)
                            this._startAt = null;
                        else if (0 !== l)
                            return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt)
                        this._startAt.render(-1, !0),
                            this._startAt.kill(),
                            this._startAt = null;
                    else {
                        0 !== this._time && (h = !1),
                            i = {};
                        for (n in o)
                            U[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0,
                            i.data = "isFromStart",
                            i.lazy = h && o.lazy !== !1,
                            i.immediateRender = h,
                            this._startAt = O.to(this.target, 0, i),
                            h) {
                            if (0 === this._time)
                                return
                        } else
                            this._startAt._init(),
                                this._startAt._enabled(!1),
                            this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = c = c ? c instanceof b ? c : "function" == typeof c ? new b(c,o.easeParams) : w[c] || O.defaultEase : O.defaultEase,
                o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)),
                    this._easeType = this._ease._type,
                    this._easePower = this._ease._power,
                    this._firstPT = null,
                    this._targets)
                    for (r = this._targets.length,
                             t = 0; t < r; t++)
                        this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
                else
                    e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (e && O._onPluginEvent("_onInitAllProps", this),
                a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
                    o.runBackwards)
                    for (i = this._firstPT; i; )
                        i.s += i.c,
                            i.c = -i.c,
                            i = i._next;
                this._onUpdate = o.onUpdate,
                    this._initted = !0
            }
                ,
                o._initProps = function(e, i, n, s, r) {
                    var o, a, l, h, c, u;
                    if (null == e)
                        return !1;
                    M[e._gsTweenID] && G(),
                    this.vars.css || e.style && e !== t && e.nodeType && B.css && this.vars.autoCSS !== !1 && $(this.vars, e);
                    for (o in this.vars)
                        if (u = this.vars[o],
                            U[o])
                            u && (u instanceof Array || u.push && p(u)) && u.join("").indexOf("{self}") !== -1 && (this.vars[o] = u = this._swapSelfInParams(u, this));
                        else if (B[o] && (h = new B[o])._onInitTween(e, this.vars[o], this, r)) {
                            for (this._firstPT = c = {
                                _next: this._firstPT,
                                t: h,
                                p: "setRatio",
                                s: 0,
                                c: 1,
                                f: 1,
                                n: o,
                                pg: 1,
                                pr: h._priority,
                                m: 0
                            },
                                     a = h._overwriteProps.length; --a > -1; )
                                i[h._overwriteProps[a]] = this._firstPT;
                            (h._priority || h._onInitAllProps) && (l = !0),
                            (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0),
                            c._next && (c._next._prev = c)
                        } else
                            i[o] = F.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, r);
                    return s && this._kill(s, e) ? this._initProps(e, i, n, s, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && Z(e, this, i, this._overwrite, n) ? (this._kill(i, e),
                        this._initProps(e, i, n, s, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (M[e._gsTweenID] = !0),
                        l)
                }
                ,
                o.render = function(t, e, i) {
                    var n, s, r, o, a = this._time, l = this._duration, h = this._rawPrevTime;
                    if (t >= l - 1e-7)
                        this._totalTime = this._time = l,
                            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                        this._reversed || (n = !0,
                            s = "onComplete",
                            i = i || this._timeline.autoRemoveChildren),
                        0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0),
                        (h < 0 || t <= 0 && t >= -1e-7 || h === u && "isPause" !== this.data) && h !== t && (i = !0,
                        h > u && (s = "onReverseComplete")),
                            this._rawPrevTime = o = !e || t || h === t ? t : u);
                    else if (t < 1e-7)
                        this._totalTime = this._time = 0,
                            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                        (0 !== a || 0 === l && h > 0) && (s = "onReverseComplete",
                            n = this._reversed),
                        t < 0 && (this._active = !1,
                        0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== u || "isPause" !== this.data) && (i = !0),
                            this._rawPrevTime = o = !e || t || h === t ? t : u)),
                        this._initted || (i = !0);
                    else if (this._totalTime = this._time = t,
                        this._easeType) {
                        var c = t / l
                            , d = this._easeType
                            , f = this._easePower;
                        (1 === d || 3 === d && c >= .5) && (c = 1 - c),
                        3 === d && (c *= 2),
                            1 === f ? c *= c : 2 === f ? c *= c * c : 3 === f ? c *= c * c * c : 4 === f && (c *= c * c * c * c),
                            1 === d ? this.ratio = 1 - c : 2 === d ? this.ratio = c : t / l < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2
                    } else
                        this.ratio = this._ease.getRatio(t / l);
                    if (this._time !== a || i) {
                        if (!this._initted) {
                            if (this._init(),
                            !this._initted || this._gc)
                                return;
                            if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration))
                                return this._time = this._totalTime = a,
                                    this._rawPrevTime = h,
                                    D.push(this),
                                    void (this._lazy = [t, e]);
                            this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (this._lazy !== !1 && (this._lazy = !1),
                             this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0),
                             0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : s || (s = "_dummyGS")),
                             this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))),
                                 r = this._firstPT; r; )
                            r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s,
                                r = r._next;
                        this._onUpdate && (t < 0 && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i),
                        e || (this._time !== a || n || i) && this._callback("onUpdate")),
                        s && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i),
                        n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                            this._active = !1),
                        !e && this.vars[s] && this._callback(s),
                        0 === l && this._rawPrevTime === u && o !== u && (this._rawPrevTime = 0)))
                    }
                }
                ,
                o._kill = function(t, e, i) {
                    if ("all" === t && (t = null),
                    null == t && (null == e || e === this.target))
                        return this._lazy = !1,
                            this._enabled(!1, !1);
                    e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
                    var n, s, r, o, a, l, h, c, u, d = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                    if ((p(e) || N(e)) && "number" != typeof e[0])
                        for (n = e.length; --n > -1; )
                            this._kill(t, e[n], i) && (l = !0);
                    else {
                        if (this._targets) {
                            for (n = this._targets.length; --n > -1; )
                                if (e === this._targets[n]) {
                                    a = this._propLookup[n] || {},
                                        this._overwrittenProps = this._overwrittenProps || [],
                                        s = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                    break
                                }
                        } else {
                            if (e !== this.target)
                                return !1;
                            a = this._propLookup,
                                s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                        }
                        if (a) {
                            if (h = t || a,
                                c = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill),
                            i && (O.onOverwrite || this.vars.onOverwrite)) {
                                for (r in h)
                                    a[r] && (u || (u = []),
                                        u.push(r));
                                if ((u || !t) && !Q(this, i, e, u))
                                    return !1
                            }
                            for (r in h)
                                (o = a[r]) && (d && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s,
                                    l = !0),
                                o.pg && o.t._kill(h) && (l = !0),
                                o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next),
                                o._next && (o._next._prev = o._prev),
                                    o._next = o._prev = null),
                                    delete a[r]),
                                c && (s[r] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1)
                        }
                    }
                    return l
                }
                ,
                o.invalidate = function() {
                    return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this),
                        this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
                        this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
                        this._propLookup = this._targets ? {} : [],
                        k.prototype.invalidate.call(this),
                    this.vars.immediateRender && (this._time = -u,
                        this.render(Math.min(0, -this._delay))),
                        this
                }
                ,
                o._enabled = function(t, e) {
                    if (l || a.wake(),
                    t && this._gc) {
                        var i, n = this._targets;
                        if (n)
                            for (i = n.length; --i > -1; )
                                this._siblings[i] = J(n[i], this, !0);
                        else
                            this._siblings = J(this.target, this, !0)
                    }
                    return k.prototype._enabled.call(this, t, e),
                    !(!this._notifyPluginsOfEnabled || !this._firstPT) && O._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
                }
                ,
                O.to = function(t, e, i) {
                    return new O(t,e,i)
                }
                ,
                O.from = function(t, e, i) {
                    return i.runBackwards = !0,
                        i.immediateRender = 0 != i.immediateRender,
                        new O(t,e,i)
                }
                ,
                O.fromTo = function(t, e, i, n) {
                    return n.startAt = i,
                        n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender,
                        new O(t,e,n)
                }
                ,
                O.delayedCall = function(t, e, i, n, s) {
                    return new O(e,0,{
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        lazy: !1,
                        useFrames: s,
                        overwrite: 0
                    })
                }
                ,
                O.set = function(t, e) {
                    return new O(t,0,e)
                }
                ,
                O.getTweensOf = function(t, e) {
                    if (null == t)
                        return [];
                    t = "string" != typeof t ? t : O.selector(t) || t;
                    var i, n, s, r;
                    if ((p(t) || N(t)) && "number" != typeof t[0]) {
                        for (i = t.length,
                                 n = []; --i > -1; )
                            n = n.concat(O.getTweensOf(t[i], e));
                        for (i = n.length; --i > -1; )
                            for (r = n[i],
                                     s = i; --s > -1; )
                                r === n[s] && n.splice(i, 1)
                    } else
                        for (n = J(t).concat(),
                                 i = n.length; --i > -1; )
                            (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                    return n
                }
                ,
                O.killTweensOf = O.killDelayedCallsTo = function(t, e, i) {
                    "object" == typeof e && (i = e,
                        e = !1);
                    for (var n = O.getTweensOf(t, e), s = n.length; --s > -1; )
                        n[s]._kill(i, t)
                }
            ;
            var tt = v("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","),
                    this._propName = this._overwriteProps[0],
                    this._priority = e || 0,
                    this._super = tt.prototype
            }, !0);
            if (o = tt.prototype,
                tt.version = "1.19.0",
                tt.API = 2,
                o._firstPT = null,
                o._addTween = F,
                o.setRatio = I,
                o._kill = function(t) {
                    var e, i = this._overwriteProps, n = this._firstPT;
                    if (null != t[this._propName])
                        this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1; )
                            null != t[i[e]] && i.splice(e, 1);
                    for (; n; )
                        null != t[n.n] && (n._next && (n._next._prev = n._prev),
                            n._prev ? (n._prev._next = n._next,
                                n._prev = null) : this._firstPT === n && (this._firstPT = n._next)),
                            n = n._next;
                    return !1
                }
                ,
                o._mod = o._roundProps = function(t) {
                    for (var e, i = this._firstPT; i; )
                        e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")],
                        e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e),
                            i = i._next
                }
                ,
                O._onPluginEvent = function(t, e) {
                    var i, n, s, r, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a; ) {
                            for (o = a._next,
                                     n = s; n && n.pr > a.pr; )
                                n = n._next;
                            (a._prev = n ? n._prev : r) ? a._prev._next = a : s = a,
                                (a._next = n) ? n._prev = a : r = a,
                                a = o
                        }
                        a = e._firstPT = s
                    }
                    for (; a; )
                        a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0),
                            a = a._next;
                    return i
                }
                ,
                tt.activate = function(t) {
                    for (var e = t.length; --e > -1; )
                        t[e].API === tt.API && (B[(new t[e])._propName] = t[e]);
                    return !0
                }
                ,
                g.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API))
                        throw "illegal plugin definition.";
                    var e, i = t.propName, n = t.priority || 0, s = t.overwriteProps, r = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_mod",
                        mod: "_mod",
                        initAll: "_onInitAllProps"
                    }, o = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                        tt.call(this, i, n),
                            this._overwriteProps = s || []
                    }, t.global === !0), a = o.prototype = new tt(i);
                    a.constructor = o,
                        o.API = t.API;
                    for (e in r)
                        "function" == typeof t[e] && (a[r[e]] = t[e]);
                    return o.version = t.version,
                        tt.activate([o]),
                        o
                }
                ,
                s = t._gsQueue) {
                for (r = 0; r < s.length; r++)
                    s[r]();
                for (o in m)
                    m[o].func || t.console.log("GSAP encountered missing dependency: " + o)
            }
            l = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var t = document.documentElement
        , e = window
        , i = function(i, n) {
        var s = "x" === n ? "Width" : "Height"
            , r = "scroll" + s
            , o = "client" + s
            , a = document.body;
        return i === e || i === t || i === a ? Math.max(t[r], a[r]) - (e["inner" + s] || t[o] || a[o]) : i[r] - i["offset" + s]
    }
        , n = function(t) {
        return "string" == typeof t && (t = TweenLite.selector(t)),
        t.length && t !== e && t[0] && t[0].style && !t.nodeType && (t = t[0]),
            t === e || t.nodeType && t.style ? t : null
    }
        , s = function(i, n) {
        var s = "scroll" + ("x" === n ? "Left" : "Top");
        return i === e && (null != i.pageXOffset ? s = "page" + n.toUpperCase() + "Offset" : i = null != t[s] ? t : document.body),
            function() {
                return i[s]
            }
    }
        , r = function(i, r) {
        var o = n(i).getBoundingClientRect()
            , a = !r || r === e || r === document.body
            , l = (a ? t : r).getBoundingClientRect()
            , h = {
            x: o.left - l.left,
            y: o.top - l.top
        };
        return !a && r && (h.x += s(r, "x")(),
            h.y += s(r, "y")()),
            h
    }
        , o = function(t, e, n) {
        var s = typeof t;
        return "number" === s || "string" === s && "=" === t.charAt(1) ? t : "max" === t ? i(e, n) : Math.min(i(e, n), r(t, e)[n])
    }
        , a = _gsScope._gsDefine.plugin({
        propName: "scrollTo",
        API: 2,
        version: "1.8.0",
        init: function(t, i, n) {
            return this._wdw = t === e,
                this._target = t,
                this._tween = n,
                "object" != typeof i ? (i = {
                    y: i
                },
                "string" == typeof i.y && "max" !== i.y && "=" !== i.y.charAt(1) && (i.x = i.y)) : i.nodeType && (i = {
                    y: i,
                    x: i
                }),
                this.vars = i,
                this._autoKill = i.autoKill !== !1,
                this.getX = s(t, "x"),
                this.getY = s(t, "y"),
                this.x = this.xPrev = this.getX(),
                this.y = this.yPrev = this.getY(),
                null != i.x ? (this._addTween(this, "x", this.x, o(i.x, t, "x") - (i.offsetX || 0), "scrollTo_x", !0),
                    this._overwriteProps.push("scrollTo_x")) : this.skipX = !0,
                null != i.y ? (this._addTween(this, "y", this.y, o(i.y, t, "y") - (i.offsetY || 0), "scrollTo_y", !0),
                    this._overwriteProps.push("scrollTo_y")) : this.skipY = !0,
                !0
        },
        set: function(t) {
            this._super.setRatio.call(this, t);
            var n = this._wdw || !this.skipX ? this.getX() : this.xPrev
                , s = this._wdw || !this.skipY ? this.getY() : this.yPrev
                , r = s - this.yPrev
                , o = n - this.xPrev
                , l = a.autoKillThreshold;
            this.x < 0 && (this.x = 0),
            this.y < 0 && (this.y = 0),
            this._autoKill && (!this.skipX && (o > l || o < -l) && n < i(this._target, "x") && (this.skipX = !0),
            !this.skipY && (r > l || r < -l) && s < i(this._target, "y") && (this.skipY = !0),
            this.skipX && this.skipY && (this._tween.kill(),
            this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))),
                this._wdw ? e.scrollTo(this.skipX ? n : this.x, this.skipY ? s : this.y) : (this.skipY || (this._target.scrollTop = this.y),
                this.skipX || (this._target.scrollLeft = this.x)),
                this.xPrev = this.x,
                this.yPrev = this.y
        }
    })
        , l = a.prototype;
    a.max = i,
        a.getOffset = r,
        a.autoKillThreshold = 7,
        l._kill = function(t) {
            return t.scrollTo_x && (this.skipX = !0),
            t.scrollTo_y && (this.skipY = !0),
                this._super._kill.call(this, t)
        }
}),
_gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[t]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"),
            module.exports = e())
    }("ScrollToPlugin"),
    function(t) {
        function e(t, e, i, n, s) {
            this._listener = e,
                this._isOnce = i,
                this.context = n,
                this._signal = t,
                this._priority = s || 0
        }
        function i(t, e) {
            if ("function" != typeof t)
                throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", e))
        }
        function n() {
            this._bindings = [],
                this._prevParams = null;
            var t = this;
            this.dispatch = function() {
                n.prototype.dispatch.apply(t, arguments)
            }
        }
        e.prototype = {
            active: !0,
            params: null,
            execute: function(t) {
                var e, i;
                return this.active && this._listener && (i = this.params ? this.params.concat(t) : t,
                    e = this._listener.apply(this.context, i),
                this._isOnce && this.detach()),
                    e
            },
            detach: function() {
                return this.isBound() ? this._signal.remove(this._listener, this.context) : null
            },
            isBound: function() {
                return !!this._signal && !!this._listener
            },
            isOnce: function() {
                return this._isOnce
            },
            getListener: function() {
                return this._listener
            },
            getSignal: function() {
                return this._signal
            },
            _destroy: function() {
                delete this._signal,
                    delete this._listener,
                    delete this.context
            },
            toString: function() {
                return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
            }
        },
            n.prototype = {
                VERSION: "1.0.0",
                memorize: !1,
                _shouldPropagate: !0,
                active: !0,
                _registerListener: function(t, i, n, s) {
                    var r, o = this._indexOfListener(t, n);
                    if (o !== -1) {
                        if (r = this._bindings[o],
                        r.isOnce() !== i)
                            throw new Error("You cannot add" + (i ? "" : "Once") + "() then add" + (i ? "Once" : "") + "() the same listener without removing the relationship first.")
                    } else
                        r = new e(this,t,i,n,s),
                            this._addBinding(r);
                    return this.memorize && this._prevParams && r.execute(this._prevParams),
                        r
                },
                _addBinding: function(t) {
                    var e = this._bindings.length;
                    do
                        --e;
                    while (this._bindings[e] && t._priority <= this._bindings[e]._priority);this._bindings.splice(e + 1, 0, t)
                },
                _indexOfListener: function(t, e) {
                    for (var i, n = this._bindings.length; n--; )
                        if (i = this._bindings[n],
                        i._listener === t && i.context === e)
                            return n;
                    return -1
                },
                has: function(t, e) {
                    return this._indexOfListener(t, e) !== -1
                },
                add: function(t, e, n) {
                    return i(t, "add"),
                        this._registerListener(t, !1, e, n)
                },
                addOnce: function(t, e, n) {
                    return i(t, "addOnce"),
                        this._registerListener(t, !0, e, n)
                },
                remove: function(t, e) {
                    i(t, "remove");
                    var n = this._indexOfListener(t, e);
                    return n !== -1 && (this._bindings[n]._destroy(),
                        this._bindings.splice(n, 1)),
                        t
                },
                removeAll: function() {
                    for (var t = this._bindings.length; t--; )
                        this._bindings[t]._destroy();
                    this._bindings.length = 0
                },
                getNumListeners: function() {
                    return this._bindings.length
                },
                halt: function() {
                    this._shouldPropagate = !1
                },
                dispatch: function(t) {
                    if (this.active) {
                        var e, i = Array.prototype.slice.call(arguments), n = this._bindings.length;
                        if (this.memorize && (this._prevParams = i),
                            n) {
                            e = this._bindings.slice(),
                                this._shouldPropagate = !0;
                            do
                                n--;
                            while (e[n] && this._shouldPropagate && e[n].execute(i) !== !1)
                        }
                    }
                },
                forget: function() {
                    this._prevParams = null
                },
                dispose: function() {
                    this.removeAll(),
                        delete this._bindings,
                        delete this._prevParams
                },
                toString: function() {
                    return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
                }
            };
        var s = n;
        s.Signal = n,
            "function" == typeof define && define.amd ? define(function() {
                return s
            }) : "undefined" != typeof module && module.exports ? module.exports = s : t.signals = s
    }(this),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        var t = createjs.PreloadJS = createjs.PreloadJS || {};
        t.version = "0.6.2",
            t.buildDate = "Thu, 26 Nov 2015 20:44:31 GMT"
    }(),
    this.createjs = this.createjs || {},
    createjs.extend = function(t, e) {
        "use strict";
        function i() {
            this.constructor = t
        }
        return i.prototype = e.prototype,
            t.prototype = new i
    }
    ,
    this.createjs = this.createjs || {},
    createjs.promote = function(t, e) {
        "use strict";
        var i = t.prototype
            , n = Object.getPrototypeOf && Object.getPrototypeOf(i) || i.__proto__;
        if (n) {
            i[(e += "_") + "constructor"] = n.constructor;
            for (var s in n)
                i.hasOwnProperty(s) && "function" == typeof n[s] && (i[e + s] = n[s])
        }
        return t
    }
    ,
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        createjs.proxy = function(t, e) {
            var i = Array.prototype.slice.call(arguments, 2);
            return function() {
                return t.apply(e, Array.prototype.slice.call(arguments, 0).concat(i))
            }
        }
    }(),
    this.createjs = this.createjs || {},
    createjs.indexOf = function(t, e) {
        "use strict";
        for (var i = 0, n = t.length; i < n; i++)
            if (e === t[i])
                return i;
        return -1
    }
    ,
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.type = t,
                this.target = null,
                this.currentTarget = null,
                this.eventPhase = 0,
                this.bubbles = !!e,
                this.cancelable = !!i,
                this.timeStamp = (new Date).getTime(),
                this.defaultPrevented = !1,
                this.propagationStopped = !1,
                this.immediatePropagationStopped = !1,
                this.removed = !1
        }
        var e = t.prototype;
        e.preventDefault = function() {
            this.defaultPrevented = this.cancelable && !0
        }
            ,
            e.stopPropagation = function() {
                this.propagationStopped = !0
            }
            ,
            e.stopImmediatePropagation = function() {
                this.immediatePropagationStopped = this.propagationStopped = !0
            }
            ,
            e.remove = function() {
                this.removed = !0
            }
            ,
            e.clone = function() {
                return new t(this.type,this.bubbles,this.cancelable)
            }
            ,
            e.set = function(t) {
                for (var e in t)
                    this[e] = t[e];
                return this
            }
            ,
            e.toString = function() {
                return "[Event (type=" + this.type + ")]"
            }
            ,
            createjs.Event = t
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.Event_constructor("error"),
                this.title = t,
                this.message = e,
                this.data = i
        }
        var e = createjs.extend(t, createjs.Event);
        e.clone = function() {
            return new createjs.ErrorEvent(this.title,this.message,this.data)
        }
            ,
            createjs.ErrorEvent = createjs.promote(t, "Event")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t() {
            this._listeners = null,
                this._captureListeners = null
        }
        var e = t.prototype;
        t.initialize = function(t) {
            t.addEventListener = e.addEventListener,
                t.on = e.on,
                t.removeEventListener = t.off = e.removeEventListener,
                t.removeAllEventListeners = e.removeAllEventListeners,
                t.hasEventListener = e.hasEventListener,
                t.dispatchEvent = e.dispatchEvent,
                t._dispatchEvent = e._dispatchEvent,
                t.willTrigger = e.willTrigger
        }
            ,
            e.addEventListener = function(t, e, i) {
                var n;
                n = i ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
                var s = n[t];
                return s && this.removeEventListener(t, e, i),
                    s = n[t],
                    s ? s.push(e) : n[t] = [e],
                    e
            }
            ,
            e.on = function(t, e, i, n, s, r) {
                return e.handleEvent && (i = i || e,
                    e = e.handleEvent),
                    i = i || this,
                    this.addEventListener(t, function(t) {
                        e.call(i, t, s),
                        n && t.remove()
                    }, r)
            }
            ,
            e.removeEventListener = function(t, e, i) {
                var n = i ? this._captureListeners : this._listeners;
                if (n) {
                    var s = n[t];
                    if (s)
                        for (var r = 0, o = s.length; r < o; r++)
                            if (s[r] == e) {
                                1 == o ? delete n[t] : s.splice(r, 1);
                                break
                            }
                }
            }
            ,
            e.off = e.removeEventListener,
            e.removeAllEventListeners = function(t) {
                t ? (this._listeners && delete this._listeners[t],
                this._captureListeners && delete this._captureListeners[t]) : this._listeners = this._captureListeners = null
            }
            ,
            e.dispatchEvent = function(t, e, i) {
                if ("string" == typeof t) {
                    var n = this._listeners;
                    if (!(e || n && n[t]))
                        return !0;
                    t = new createjs.Event(t,e,i)
                } else
                    t.target && t.clone && (t = t.clone());
                try {
                    t.target = this
                } catch (s) {}
                if (t.bubbles && this.parent) {
                    for (var r = this, o = [r]; r.parent; )
                        o.push(r = r.parent);
                    var a, l = o.length;
                    for (a = l - 1; a >= 0 && !t.propagationStopped; a--)
                        o[a]._dispatchEvent(t, 1 + (0 == a));
                    for (a = 1; a < l && !t.propagationStopped; a++)
                        o[a]._dispatchEvent(t, 3)
                } else
                    this._dispatchEvent(t, 2);
                return !t.defaultPrevented
            }
            ,
            e.hasEventListener = function(t) {
                var e = this._listeners
                    , i = this._captureListeners;
                return !!(e && e[t] || i && i[t])
            }
            ,
            e.willTrigger = function(t) {
                for (var e = this; e; ) {
                    if (e.hasEventListener(t))
                        return !0;
                    e = e.parent
                }
                return !1
            }
            ,
            e.toString = function() {
                return "[EventDispatcher]"
            }
            ,
            e._dispatchEvent = function(t, e) {
                var i, n = 1 == e ? this._captureListeners : this._listeners;
                if (t && n) {
                    var s = n[t.type];
                    if (!s || !(i = s.length))
                        return;
                    try {
                        t.currentTarget = this
                    } catch (r) {}
                    try {
                        t.eventPhase = e
                    } catch (r) {}
                    t.removed = !1,
                        s = s.slice();
                    for (var o = 0; o < i && !t.immediatePropagationStopped; o++) {
                        var a = s[o];
                        a.handleEvent ? a.handleEvent(t) : a(t),
                        t.removed && (this.off(t.type, a, 1 == e),
                            t.removed = !1)
                    }
                }
            }
            ,
            createjs.EventDispatcher = t
    }(),
    this.createjs = this.createjs || {},
    function(t) {
        "use strict";
        function e(t, e) {
            this.Event_constructor("progress"),
                this.loaded = t,
                this.total = null == e ? 1 : e,
                this.progress = 0 == e ? 0 : this.loaded / this.total
        }
        var i = createjs.extend(e, createjs.Event);
        i.clone = function() {
            return new createjs.ProgressEvent(this.loaded,this.total)
        }
            ,
            createjs.ProgressEvent = createjs.promote(e, "Event")
    }(window),
    function() {
        function t(e, n) {
            function r(t) {
                if (r[t] !== _)
                    return r[t];
                var e;
                if ("bug-string-char-index" == t)
                    e = "a" != "a"[0];
                else if ("json" == t)
                    e = r("json-stringify") && r("json-parse");
                else {
                    var i, s = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == t) {
                        var l = n.stringify
                            , c = "function" == typeof l && y;
                        if (c) {
                            (i = function() {
                                    return 1
                                }
                            ).toJSON = i;
                            try {
                                c = "0" === l(0) && "0" === l(new o) && '""' == l(new a) && l(v) === _ && l(_) === _ && l() === _ && "1" === l(i) && "[1]" == l([i]) && "[null]" == l([_]) && "null" == l(null) && "[null,null,null]" == l([_, v, null]) && l({
                                    a: [i, !0, !1, null, "\0\b\n\f\r\t"]
                                }) == s && "1" === l(null, i) && "[\n 1,\n 2\n]" == l([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == l(new h((-864e13))) && '"+275760-09-13T00:00:00.000Z"' == l(new h(864e13)) && '"-000001-01-01T00:00:00.000Z"' == l(new h((-621987552e5))) && '"1969-12-31T23:59:59.999Z"' == l(new h((-1)))
                            } catch (u) {
                                c = !1
                            }
                        }
                        e = c
                    }
                    if ("json-parse" == t) {
                        var d = n.parse;
                        if ("function" == typeof d)
                            try {
                                if (0 === d("0") && !d(!1)) {
                                    i = d(s);
                                    var f = 5 == i.a.length && 1 === i.a[0];
                                    if (f) {
                                        try {
                                            f = !d('"\t"')
                                        } catch (u) {}
                                        if (f)
                                            try {
                                                f = 1 !== d("01")
                                            } catch (u) {}
                                        if (f)
                                            try {
                                                f = 1 !== d("1.")
                                            } catch (u) {}
                                    }
                                }
                            } catch (u) {
                                f = !1
                            }
                        e = f
                    }
                }
                return r[t] = !!e
            }
            e || (e = s.Object()),
            n || (n = s.Object());
            var o = e.Number || s.Number
                , a = e.String || s.String
                , l = e.Object || s.Object
                , h = e.Date || s.Date
                , c = e.SyntaxError || s.SyntaxError
                , u = e.TypeError || s.TypeError
                , d = e.Math || s.Math
                , f = e.JSON || s.JSON;
            "object" == typeof f && f && (n.stringify = f.stringify,
                n.parse = f.parse);
            var p, m, _, g = l.prototype, v = g.toString, y = new h((-0xc782b5b800cec));
            try {
                y = y.getUTCFullYear() == -109252 && 0 === y.getUTCMonth() && 1 === y.getUTCDate() && 10 == y.getUTCHours() && 37 == y.getUTCMinutes() && 6 == y.getUTCSeconds() && 708 == y.getUTCMilliseconds()
            } catch (b) {}
            if (!r("json")) {
                var w = "[object Function]"
                    , T = "[object Date]"
                    , x = "[object Number]"
                    , S = "[object String]"
                    , C = "[object Array]"
                    , L = "[object Boolean]"
                    , E = r("bug-string-char-index");
                if (!y)
                    var k = d.floor
                        , P = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
                        , A = function(t, e) {
                        return P[e] + 365 * (t - 1970) + k((t - 1969 + (e = +(e > 1))) / 4) - k((t - 1901 + e) / 100) + k((t - 1601 + e) / 400)
                    };
                if ((p = g.hasOwnProperty) || (p = function(t) {
                        var e, i = {};
                        return (i.__proto__ = null,
                            i.__proto__ = {
                                toString: 1
                            },
                            i).toString != v ? p = function(t) {
                                var e = this.__proto__
                                    , i = t in (this.__proto__ = null,
                                    this);
                                return this.__proto__ = e,
                                    i
                            }
                            : (e = i.constructor,
                                    p = function(t) {
                                        var i = (this.constructor || e).prototype;
                                        return t in this && !(t in i && this[t] === i[t])
                                    }
                            ),
                            i = null,
                            p.call(this, t)
                    }
                ),
                    m = function(t, e) {
                        var n, s, r, o = 0;
                        (n = function() {
                                this.valueOf = 0
                            }
                        ).prototype.valueOf = 0,
                            s = new n;
                        for (r in s)
                            p.call(s, r) && o++;
                        return n = s = null,
                            o ? m = 2 == o ? function(t, e) {
                                    var i, n = {}, s = v.call(t) == w;
                                    for (i in t)
                                        s && "prototype" == i || p.call(n, i) || !(n[i] = 1) || !p.call(t, i) || e(i)
                                }
                                : function(t, e) {
                                    var i, n, s = v.call(t) == w;
                                    for (i in t)
                                        s && "prototype" == i || !p.call(t, i) || (n = "constructor" === i) || e(i);
                                    (n || p.call(t, i = "constructor")) && e(i)
                                }
                                : (s = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"],
                                        m = function(t, e) {
                                            var n, r, o = v.call(t) == w, a = !o && "function" != typeof t.constructor && i[typeof t.hasOwnProperty] && t.hasOwnProperty || p;
                                            for (n in t)
                                                o && "prototype" == n || !a.call(t, n) || e(n);
                                            for (r = s.length; n = s[--r]; a.call(t, n) && e(n))
                                                ;
                                        }
                                ),
                            m(t, e)
                    }
                    ,
                    !r("json-stringify")) {
                    var O = {
                        92: "\\\\",
                        34: '\\"',
                        8: "\\b",
                        12: "\\f",
                        10: "\\n",
                        13: "\\r",
                        9: "\\t"
                    }
                        , N = "000000"
                        , $ = function(t, e) {
                        return (N + (e || 0)).slice(-t)
                    }
                        , D = "\\u00"
                        , M = function(t) {
                        for (var e = '"', i = 0, n = t.length, s = !E || n > 10, r = s && (E ? t.split("") : t); i < n; i++) {
                            var o = t.charCodeAt(i);
                            switch (o) {
                                case 8:
                                case 9:
                                case 10:
                                case 12:
                                case 13:
                                case 34:
                                case 92:
                                    e += O[o];
                                    break;
                                default:
                                    if (o < 32) {
                                        e += D + $(2, o.toString(16));
                                        break
                                    }
                                    e += s ? r[i] : t.charAt(i)
                            }
                        }
                        return e + '"'
                    }
                        , R = function(t, e, i, n, s, r, o) {
                        var a, l, h, c, d, f, g, y, b, w, E, P, O, N, D, I;
                        try {
                            a = e[t]
                        } catch (j) {}
                        if ("object" == typeof a && a)
                            if (l = v.call(a),
                            l != T || p.call(a, "toJSON"))
                                "function" == typeof a.toJSON && (l != x && l != S && l != C || p.call(a, "toJSON")) && (a = a.toJSON(t));
                            else if (a > -1 / 0 && a < 1 / 0) {
                                if (A) {
                                    for (d = k(a / 864e5),
                                             h = k(d / 365.2425) + 1970 - 1; A(h + 1, 0) <= d; h++)
                                        ;
                                    for (c = k((d - A(h, 0)) / 30.42); A(h, c + 1) <= d; c++)
                                        ;
                                    d = 1 + d - A(h, c),
                                        f = (a % 864e5 + 864e5) % 864e5,
                                        g = k(f / 36e5) % 24,
                                        y = k(f / 6e4) % 60,
                                        b = k(f / 1e3) % 60,
                                        w = f % 1e3
                                } else
                                    h = a.getUTCFullYear(),
                                        c = a.getUTCMonth(),
                                        d = a.getUTCDate(),
                                        g = a.getUTCHours(),
                                        y = a.getUTCMinutes(),
                                        b = a.getUTCSeconds(),
                                        w = a.getUTCMilliseconds();
                                a = (h <= 0 || h >= 1e4 ? (h < 0 ? "-" : "+") + $(6, h < 0 ? -h : h) : $(4, h)) + "-" + $(2, c + 1) + "-" + $(2, d) + "T" + $(2, g) + ":" + $(2, y) + ":" + $(2, b) + "." + $(3, w) + "Z"
                            } else
                                a = null;
                        if (i && (a = i.call(e, t, a)),
                        null === a)
                            return "null";
                        if (l = v.call(a),
                        l == L)
                            return "" + a;
                        if (l == x)
                            return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
                        if (l == S)
                            return M("" + a);
                        if ("object" == typeof a) {
                            for (N = o.length; N--; )
                                if (o[N] === a)
                                    throw u();
                            if (o.push(a),
                                E = [],
                                D = r,
                                r += s,
                            l == C) {
                                for (O = 0,
                                         N = a.length; O < N; O++)
                                    P = R(O, a, i, n, s, r, o),
                                        E.push(P === _ ? "null" : P);
                                I = E.length ? s ? "[\n" + r + E.join(",\n" + r) + "\n" + D + "]" : "[" + E.join(",") + "]" : "[]"
                            } else
                                m(n || a, function(t) {
                                    var e = R(t, a, i, n, s, r, o);
                                    e !== _ && E.push(M(t) + ":" + (s ? " " : "") + e)
                                }),
                                    I = E.length ? s ? "{\n" + r + E.join(",\n" + r) + "\n" + D + "}" : "{" + E.join(",") + "}" : "{}";
                            return o.pop(),
                                I
                        }
                    };
                    n.stringify = function(t, e, n) {
                        var s, r, o, a;
                        if (i[typeof e] && e)
                            if ((a = v.call(e)) == w)
                                r = e;
                            else if (a == C) {
                                o = {};
                                for (var l, h = 0, c = e.length; h < c; l = e[h++],
                                    a = v.call(l),
                                (a == S || a == x) && (o[l] = 1))
                                    ;
                            }
                        if (n)
                            if ((a = v.call(n)) == x) {
                                if ((n -= n % 1) > 0)
                                    for (s = "",
                                         n > 10 && (n = 10); s.length < n; s += " ")
                                        ;
                            } else
                                a == S && (s = n.length <= 10 ? n : n.slice(0, 10));
                        return R("", (l = {},
                            l[""] = t,
                            l), r, o, s, "", [])
                    }
                }
                if (!r("json-parse")) {
                    var I, j, F = a.fromCharCode, H = {
                        92: "\\",
                        34: '"',
                        47: "/",
                        98: "\b",
                        116: "\t",
                        110: "\n",
                        102: "\f",
                        114: "\r"
                    }, B = function() {
                        throw I = j = null,
                            c()
                    }, Y = function() {
                        for (var t, e, i, n, s, r = j, o = r.length; I < o; )
                            switch (s = r.charCodeAt(I)) {
                                case 9:
                                case 10:
                                case 13:
                                case 32:
                                    I++;
                                    break;
                                case 123:
                                case 125:
                                case 91:
                                case 93:
                                case 58:
                                case 44:
                                    return t = E ? r.charAt(I) : r[I],
                                        I++,
                                        t;
                                case 34:
                                    for (t = "@",
                                             I++; I < o; )
                                        if (s = r.charCodeAt(I),
                                        s < 32)
                                            B();
                                        else if (92 == s)
                                            switch (s = r.charCodeAt(++I)) {
                                                case 92:
                                                case 34:
                                                case 47:
                                                case 98:
                                                case 116:
                                                case 110:
                                                case 102:
                                                case 114:
                                                    t += H[s],
                                                        I++;
                                                    break;
                                                case 117:
                                                    for (e = ++I,
                                                             i = I + 4; I < i; I++)
                                                        s = r.charCodeAt(I),
                                                        s >= 48 && s <= 57 || s >= 97 && s <= 102 || s >= 65 && s <= 70 || B();
                                                    t += F("0x" + r.slice(e, I));
                                                    break;
                                                default:
                                                    B()
                                            }
                                        else {
                                            if (34 == s)
                                                break;
                                            for (s = r.charCodeAt(I),
                                                     e = I; s >= 32 && 92 != s && 34 != s; )
                                                s = r.charCodeAt(++I);
                                            t += r.slice(e, I)
                                        }
                                    if (34 == r.charCodeAt(I))
                                        return I++,
                                            t;
                                    B();
                                default:
                                    if (e = I,
                                    45 == s && (n = !0,
                                        s = r.charCodeAt(++I)),
                                    s >= 48 && s <= 57) {
                                        for (48 == s && (s = r.charCodeAt(I + 1),
                                        s >= 48 && s <= 57) && B(),
                                                 n = !1; I < o && (s = r.charCodeAt(I),
                                        s >= 48 && s <= 57); I++)
                                            ;
                                        if (46 == r.charCodeAt(I)) {
                                            for (i = ++I; i < o && (s = r.charCodeAt(i),
                                            s >= 48 && s <= 57); i++)
                                                ;
                                            i == I && B(),
                                                I = i
                                        }
                                        if (s = r.charCodeAt(I),
                                        101 == s || 69 == s) {
                                            for (s = r.charCodeAt(++I),
                                                 43 != s && 45 != s || I++,
                                                     i = I; i < o && (s = r.charCodeAt(i),
                                            s >= 48 && s <= 57); i++)
                                                ;
                                            i == I && B(),
                                                I = i
                                        }
                                        return +r.slice(e, I)
                                    }
                                    if (n && B(),
                                    "true" == r.slice(I, I + 4))
                                        return I += 4,
                                            !0;
                                    if ("false" == r.slice(I, I + 5))
                                        return I += 5,
                                            !1;
                                    if ("null" == r.slice(I, I + 4))
                                        return I += 4,
                                            null;
                                    B()
                            }
                        return "$"
                    }, V = function(t) {
                        var e, i;
                        if ("$" == t && B(),
                        "string" == typeof t) {
                            if ("@" == (E ? t.charAt(0) : t[0]))
                                return t.slice(1);
                            if ("[" == t) {
                                for (e = []; t = Y(),
                                "]" != t; i || (i = !0))
                                    i && ("," == t ? (t = Y(),
                                    "]" == t && B()) : B()),
                                    "," == t && B(),
                                        e.push(V(t));
                                return e
                            }
                            if ("{" == t) {
                                for (e = {}; t = Y(),
                                "}" != t; i || (i = !0))
                                    i && ("," == t ? (t = Y(),
                                    "}" == t && B()) : B()),
                                    "," != t && "string" == typeof t && "@" == (E ? t.charAt(0) : t[0]) && ":" == Y() || B(),
                                        e[t.slice(1)] = V(Y());
                                return e
                            }
                            B()
                        }
                        return t
                    }, U = function(t, e, i) {
                        var n = q(t, e, i);
                        n === _ ? delete t[e] : t[e] = n
                    }, q = function(t, e, i) {
                        var n, s = t[e];
                        if ("object" == typeof s && s)
                            if (v.call(s) == C)
                                for (n = s.length; n--; )
                                    U(s, n, i);
                            else
                                m(s, function(t) {
                                    U(s, t, i)
                                });
                        return i.call(t, e, s)
                    };
                    n.parse = function(t, e) {
                        var i, n;
                        return I = 0,
                            j = "" + t,
                            i = V(Y()),
                        "$" != Y() && B(),
                            I = j = null,
                            e && v.call(e) == w ? q((n = {},
                                n[""] = i,
                                n), "", e) : i
                    }
                }
            }
            return n.runInContext = t,
                n
        }
        var e = "function" == typeof define && define.amd
            , i = {
            "function": !0,
            object: !0
        }
            , n = i[typeof exports] && exports && !exports.nodeType && exports
            , s = i[typeof window] && window || this
            , r = n && i[typeof module] && module && !module.nodeType && "object" == typeof global && global;
        if (!r || r.global !== r && r.window !== r && r.self !== r || (s = r),
        n && !e)
            t(s, n);
        else {
            var o = s.JSON
                , a = s.JSON3
                , l = !1
                , h = t(s, s.JSON3 = {
                noConflict: function() {
                    return l || (l = !0,
                        s.JSON = o,
                        s.JSON3 = a,
                        o = a = null),
                        h
                }
            });
            s.JSON = {
                parse: h.parse,
                stringify: h.stringify
            }
        }
        e && define(function() {
            return h
        })
    }
        .call(this),
    function() {
        var t = {};
        t.appendToHead = function(e) {
            t.getHead().appendChild(e)
        }
            ,
            t.getHead = function() {
                return document.head || document.getElementsByTagName("head")[0]
            }
            ,
            t.getBody = function() {
                return document.body || document.getElementsByTagName("body")[0]
            }
            ,
            createjs.DomUtils = t
    }(),
    function() {
        var t = {};
        t.parseXML = function(t, e) {
            var i = null;
            try {
                if (window.DOMParser) {
                    var n = new DOMParser;
                    i = n.parseFromString(t, e)
                }
            } catch (s) {}
            if (!i)
                try {
                    i = new ActiveXObject("Microsoft.XMLDOM"),
                        i.async = !1,
                        i.loadXML(t)
                } catch (s) {
                    i = null
                }
            return i
        }
            ,
            t.parseJSON = function(t) {
                if (null == t)
                    return null;
                try {
                    return JSON.parse(t)
                } catch (e) {
                    throw e
                }
            }
            ,
            createjs.DataUtils = t
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t() {
            this.src = null,
                this.type = null,
                this.id = null,
                this.maintainOrder = !1,
                this.callback = null,
                this.data = null,
                this.method = createjs.LoadItem.GET,
                this.values = null,
                this.headers = null,
                this.withCredentials = !1,
                this.mimeType = null,
                this.crossOrigin = null,
                this.loadTimeout = i.LOAD_TIMEOUT_DEFAULT
        }
        var e = t.prototype = {}
            , i = t;
        i.LOAD_TIMEOUT_DEFAULT = 8e3,
            i.create = function(e) {
                if ("string" == typeof e) {
                    var n = new t;
                    return n.src = e,
                        n
                }
                if (e instanceof i)
                    return e;
                if (e instanceof Object && e.src)
                    return null == e.loadTimeout && (e.loadTimeout = i.LOAD_TIMEOUT_DEFAULT),
                        e;
                throw new Error("Type not recognized.")
            }
            ,
            e.set = function(t) {
                for (var e in t)
                    this[e] = t[e];
                return this
            }
            ,
            createjs.LoadItem = i
    }(),
    function() {
        var t = {};
        t.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i,
            t.RELATIVE_PATT = /^[.\/]*?\//i,
            t.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i,
            t.parseURI = function(e) {
                var i = {
                    absolute: !1,
                    relative: !1
                };
                if (null == e)
                    return i;
                var n = e.indexOf("?");
                n > -1 && (e = e.substr(0, n));
                var s;
                return t.ABSOLUTE_PATT.test(e) ? i.absolute = !0 : t.RELATIVE_PATT.test(e) && (i.relative = !0),
                (s = e.match(t.EXTENSION_PATT)) && (i.extension = s[1].toLowerCase()),
                    i
            }
            ,
            t.formatQueryString = function(t, e) {
                if (null == t)
                    throw new Error("You must specify data.");
                var i = [];
                for (var n in t)
                    i.push(n + "=" + escape(t[n]));
                return e && (i = i.concat(e)),
                    i.join("&")
            }
            ,
            t.buildPath = function(t, e) {
                if (null == e)
                    return t;
                var i = []
                    , n = t.indexOf("?");
                if (n != -1) {
                    var s = t.slice(n + 1);
                    i = i.concat(s.split("&"))
                }
                return n != -1 ? t.slice(0, n) + "?" + this.formatQueryString(e, i) : t + "?" + this.formatQueryString(e, i)
            }
            ,
            t.isCrossDomain = function(t) {
                var e = document.createElement("a");
                e.href = t.src;
                var i = document.createElement("a");
                i.href = location.href;
                var n = "" != e.hostname && (e.port != i.port || e.protocol != i.protocol || e.hostname != i.hostname);
                return n
            }
            ,
            t.isLocal = function(t) {
                var e = document.createElement("a");
                return e.href = t.src,
                "" == e.hostname && "file:" == e.protocol
            }
            ,
            t.isBinary = function(t) {
                switch (t) {
                    case createjs.AbstractLoader.IMAGE:
                    case createjs.AbstractLoader.BINARY:
                        return !0;
                    default:
                        return !1
                }
            }
            ,
            t.isImageTag = function(t) {
                return t instanceof HTMLImageElement
            }
            ,
            t.isAudioTag = function(t) {
                return !!window.HTMLAudioElement && t instanceof HTMLAudioElement
            }
            ,
            t.isVideoTag = function(t) {
                return !!window.HTMLVideoElement && t instanceof HTMLVideoElement
            }
            ,
            t.isText = function(t) {
                switch (t) {
                    case createjs.AbstractLoader.TEXT:
                    case createjs.AbstractLoader.JSON:
                    case createjs.AbstractLoader.MANIFEST:
                    case createjs.AbstractLoader.XML:
                    case createjs.AbstractLoader.CSS:
                    case createjs.AbstractLoader.SVG:
                    case createjs.AbstractLoader.JAVASCRIPT:
                    case createjs.AbstractLoader.SPRITESHEET:
                        return !0;
                    default:
                        return !1
                }
            }
            ,
            t.getTypeByExtension = function(t) {
                if (null == t)
                    return createjs.AbstractLoader.TEXT;
                switch (t.toLowerCase()) {
                    case "jpeg":
                    case "jpg":
                    case "gif":
                    case "png":
                    case "webp":
                    case "bmp":
                        return createjs.AbstractLoader.IMAGE;
                    case "ogg":
                    case "mp3":
                    case "webm":
                        return createjs.AbstractLoader.SOUND;
                    case "mp4":
                    case "webm":
                    case "ts":
                        return createjs.AbstractLoader.VIDEO;
                    case "json":
                        return createjs.AbstractLoader.JSON;
                    case "xml":
                        return createjs.AbstractLoader.XML;
                    case "css":
                        return createjs.AbstractLoader.CSS;
                    case "js":
                        return createjs.AbstractLoader.JAVASCRIPT;
                    case "svg":
                        return createjs.AbstractLoader.SVG;
                    default:
                        return createjs.AbstractLoader.TEXT
                }
            }
            ,
            createjs.RequestUtils = t
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.EventDispatcher_constructor(),
                this.loaded = !1,
                this.canceled = !1,
                this.progress = 0,
                this.type = i,
                this.resultFormatter = null,
                t ? this._item = createjs.LoadItem.create(t) : this._item = null,
                this._preferXHR = e,
                this._result = null,
                this._rawResult = null,
                this._loadedItems = null,
                this._tagSrcAttribute = null,
                this._tag = null
        }
        var e = createjs.extend(t, createjs.EventDispatcher)
            , i = t;
        i.POST = "POST",
            i.GET = "GET",
            i.BINARY = "binary",
            i.CSS = "css",
            i.IMAGE = "image",
            i.JAVASCRIPT = "javascript",
            i.JSON = "json",
            i.JSONP = "jsonp",
            i.MANIFEST = "manifest",
            i.SOUND = "sound",
            i.VIDEO = "video",
            i.SPRITESHEET = "spritesheet",
            i.SVG = "svg",
            i.TEXT = "text",
            i.XML = "xml",
            e.getItem = function() {
                return this._item
            }
            ,
            e.getResult = function(t) {
                return t ? this._rawResult : this._result
            }
            ,
            e.getTag = function() {
                return this._tag
            }
            ,
            e.setTag = function(t) {
                this._tag = t
            }
            ,
            e.load = function() {
                this._createRequest(),
                    this._request.on("complete", this, this),
                    this._request.on("progress", this, this),
                    this._request.on("loadStart", this, this),
                    this._request.on("abort", this, this),
                    this._request.on("timeout", this, this),
                    this._request.on("error", this, this);
                var t = new createjs.Event("initialize");
                t.loader = this._request,
                    this.dispatchEvent(t),
                    this._request.load()
            }
            ,
            e.cancel = function() {
                this.canceled = !0,
                    this.destroy()
            }
            ,
            e.destroy = function() {
                this._request && (this._request.removeAllEventListeners(),
                    this._request.destroy()),
                    this._request = null,
                    this._item = null,
                    this._rawResult = null,
                    this._result = null,
                    this._loadItems = null,
                    this.removeAllEventListeners()
            }
            ,
            e.getLoadedItems = function() {
                return this._loadedItems
            }
            ,
            e._createRequest = function() {
                this._preferXHR ? this._request = new createjs.XHRRequest(this._item) : this._request = new createjs.TagRequest(this._item,this._tag || this._createTag(),this._tagSrcAttribute)
            }
            ,
            e._createTag = function(t) {
                return null
            }
            ,
            e._sendLoadStart = function() {
                this._isCanceled() || this.dispatchEvent("loadstart")
            }
            ,
            e._sendProgress = function(t) {
                if (!this._isCanceled()) {
                    var e = null;
                    "number" == typeof t ? (this.progress = t,
                        e = new createjs.ProgressEvent(this.progress)) : (e = t,
                        this.progress = t.loaded / t.total,
                        e.progress = this.progress,
                    (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0)),
                    this.hasEventListener("progress") && this.dispatchEvent(e)
                }
            }
            ,
            e._sendComplete = function() {
                if (!this._isCanceled()) {
                    this.loaded = !0;
                    var t = new createjs.Event("complete");
                    t.rawResult = this._rawResult,
                    null != this._result && (t.result = this._result),
                        this.dispatchEvent(t)
                }
            }
            ,
            e._sendError = function(t) {
                !this._isCanceled() && this.hasEventListener("error") && (null == t && (t = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),
                    this.dispatchEvent(t))
            }
            ,
            e._isCanceled = function() {
                return !(null != window.createjs && !this.canceled)
            }
            ,
            e.resultFormatter = null,
            e.handleEvent = function(t) {
                switch (t.type) {
                    case "complete":
                        this._rawResult = t.target._response;
                        var e = this.resultFormatter && this.resultFormatter(this);
                        e instanceof Function ? e.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : (this._result = e || this._rawResult,
                            this._sendComplete());
                        break;
                    case "progress":
                        this._sendProgress(t);
                        break;
                    case "error":
                        this._sendError(t);
                        break;
                    case "loadstart":
                        this._sendLoadStart();
                        break;
                    case "abort":
                    case "timeout":
                        this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + t.type.toUpperCase() + "_ERROR"))
                }
            }
            ,
            e._resultFormatSuccess = function(t) {
                this._result = t,
                    this._sendComplete()
            }
            ,
            e._resultFormatFailed = function(t) {
                this._sendError(t)
            }
            ,
            e.buildPath = function(t, e) {
                return createjs.RequestUtils.buildPath(t, e)
            }
            ,
            e.toString = function() {
                return "[PreloadJS AbstractLoader]"
            }
            ,
            createjs.AbstractLoader = createjs.promote(t, "EventDispatcher")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.AbstractLoader_constructor(t, e, i),
                this.resultFormatter = this._formatResult,
                this._tagSrcAttribute = "src",
                this.on("initialize", this._updateXHR, this);
        }
        var e = createjs.extend(t, createjs.AbstractLoader);
        e.load = function() {
            this._tag || (this._tag = this._createTag(this._item.src)),
                this._tag.preload = "auto",
                this._tag.load(),
                this.AbstractLoader_load()
        }
            ,
            e._createTag = function() {}
            ,
            e._createRequest = function() {
                this._preferXHR ? this._request = new createjs.XHRRequest(this._item) : this._request = new createjs.MediaTagRequest(this._item,this._tag || this._createTag(),this._tagSrcAttribute)
            }
            ,
            e._updateXHR = function(t) {
                t.loader.setResponseType && t.loader.setResponseType("blob")
            }
            ,
            e._formatResult = function(t) {
                if (this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
                    this._tag.onstalled = null,
                    this._preferXHR) {
                    var e = window.URL || window.webkitURL
                        , i = t.getResult(!0);
                    t.getTag().src = e.createObjectURL(i)
                }
                return t.getTag()
            }
            ,
            createjs.AbstractMediaLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        var t = function(t) {
            this._item = t
        }
            , e = createjs.extend(t, createjs.EventDispatcher);
        e.load = function() {}
            ,
            e.destroy = function() {}
            ,
            e.cancel = function() {}
            ,
            createjs.AbstractRequest = createjs.promote(t, "EventDispatcher")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.AbstractRequest_constructor(t),
                this._tag = e,
                this._tagSrcAttribute = i,
                this._loadedHandler = createjs.proxy(this._handleTagComplete, this),
                this._addedToDOM = !1,
                this._startTagVisibility = null
        }
        var e = createjs.extend(t, createjs.AbstractRequest);
        e.load = function() {
            this._tag.onload = createjs.proxy(this._handleTagComplete, this),
                this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this),
                this._tag.onerror = createjs.proxy(this._handleError, this);
            var t = new createjs.Event("initialize");
            t.loader = this._tag,
                this.dispatchEvent(t),
                this._hideTag(),
                this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout),
                this._tag[this._tagSrcAttribute] = this._item.src,
            null == this._tag.parentNode && (window.document.body.appendChild(this._tag),
                this._addedToDOM = !0)
        }
            ,
            e.destroy = function() {
                this._clean(),
                    this._tag = null,
                    this.AbstractRequest_destroy()
            }
            ,
            e._handleReadyStateChange = function() {
                clearTimeout(this._loadTimeout);
                var t = this._tag;
                "loaded" != t.readyState && "complete" != t.readyState || this._handleTagComplete()
            }
            ,
            e._handleError = function() {
                this._clean(),
                    this.dispatchEvent("error")
            }
            ,
            e._handleTagComplete = function() {
                this._rawResult = this._tag,
                    this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult,
                    this._clean(),
                    this._showTag(),
                    this.dispatchEvent("complete")
            }
            ,
            e._handleTimeout = function() {
                this._clean(),
                    this.dispatchEvent(new createjs.Event("timeout"))
            }
            ,
            e._clean = function() {
                this._tag.onload = null,
                    this._tag.onreadystatechange = null,
                    this._tag.onerror = null,
                this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag),
                    clearTimeout(this._loadTimeout)
            }
            ,
            e._hideTag = function() {
                this._startTagVisibility = this._tag.style.visibility,
                    this._tag.style.visibility = "hidden"
            }
            ,
            e._showTag = function() {
                this._tag.style.visibility = this._startTagVisibility
            }
            ,
            e._handleStalled = function() {}
            ,
            createjs.TagRequest = createjs.promote(t, "AbstractRequest")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.AbstractRequest_constructor(t),
                this._tag = e,
                this._tagSrcAttribute = i,
                this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
        }
        var e = createjs.extend(t, createjs.TagRequest);
        e.load = function() {
            var t = createjs.proxy(this._handleStalled, this);
            this._stalledCallback = t;
            var e = createjs.proxy(this._handleProgress, this);
            this._handleProgress = e,
                this._tag.addEventListener("stalled", t),
                this._tag.addEventListener("progress", e),
            this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1),
                this.TagRequest_load()
        }
            ,
            e._handleReadyStateChange = function() {
                clearTimeout(this._loadTimeout);
                var t = this._tag;
                "loaded" != t.readyState && "complete" != t.readyState || this._handleTagComplete()
            }
            ,
            e._handleStalled = function() {}
            ,
            e._handleProgress = function(t) {
                if (t && !(t.loaded > 0 && 0 == t.total)) {
                    var e = new createjs.ProgressEvent(t.loaded,t.total);
                    this.dispatchEvent(e)
                }
            }
            ,
            e._clean = function() {
                this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
                    this._tag.removeEventListener("stalled", this._stalledCallback),
                    this._tag.removeEventListener("progress", this._progressCallback),
                    this.TagRequest__clean()
            }
            ,
            createjs.MediaTagRequest = createjs.promote(t, "TagRequest")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractRequest_constructor(t),
                this._request = null,
                this._loadTimeout = null,
                this._xhrLevel = 1,
                this._response = null,
                this._rawResponse = null,
                this._canceled = !1,
                this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this),
                this._handleProgressProxy = createjs.proxy(this._handleProgress, this),
                this._handleAbortProxy = createjs.proxy(this._handleAbort, this),
                this._handleErrorProxy = createjs.proxy(this._handleError, this),
                this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this),
                this._handleLoadProxy = createjs.proxy(this._handleLoad, this),
                this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this),
                !this._createXHR(t)
        }
        var e = createjs.extend(t, createjs.AbstractRequest);
        t.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
            e.getResult = function(t) {
                return t && this._rawResponse ? this._rawResponse : this._response
            }
            ,
            e.cancel = function() {
                this.canceled = !0,
                    this._clean(),
                    this._request.abort()
            }
            ,
            e.load = function() {
                if (null == this._request)
                    return void this._handleError();
                null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1),
                    this._request.addEventListener("progress", this._handleProgressProxy, !1),
                    this._request.addEventListener("abort", this._handleAbortProxy, !1),
                    this._request.addEventListener("error", this._handleErrorProxy, !1),
                    this._request.addEventListener("timeout", this._handleTimeoutProxy, !1),
                    this._request.addEventListener("load", this._handleLoadProxy, !1),
                    this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy,
                    this._request.onprogress = this._handleProgressProxy,
                    this._request.onabort = this._handleAbortProxy,
                    this._request.onerror = this._handleErrorProxy,
                    this._request.ontimeout = this._handleTimeoutProxy,
                    this._request.onload = this._handleLoadProxy,
                    this._request.onreadystatechange = this._handleReadyStateChangeProxy),
                1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
                try {
                    this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
                } catch (t) {
                    this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,t))
                }
            }
            ,
            e.setResponseType = function(t) {
                "blob" === t && (t = window.URL ? "blob" : "arraybuffer",
                    this._responseType = t),
                    this._request.responseType = t
            }
            ,
            e.getAllResponseHeaders = function() {
                return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
            }
            ,
            e.getResponseHeader = function(t) {
                return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(t) : null
            }
            ,
            e._handleProgress = function(t) {
                if (t && !(t.loaded > 0 && 0 == t.total)) {
                    var e = new createjs.ProgressEvent(t.loaded,t.total);
                    this.dispatchEvent(e)
                }
            }
            ,
            e._handleLoadStart = function(t) {
                clearTimeout(this._loadTimeout),
                    this.dispatchEvent("loadstart")
            }
            ,
            e._handleAbort = function(t) {
                this._clean(),
                    this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,t))
            }
            ,
            e._handleError = function(t) {
                this._clean(),
                    this.dispatchEvent(new createjs.ErrorEvent(t.message))
            }
            ,
            e._handleReadyStateChange = function(t) {
                4 == this._request.readyState && this._handleLoad()
            }
            ,
            e._handleLoad = function(t) {
                if (!this.loaded) {
                    this.loaded = !0;
                    var e = this._checkError();
                    if (e)
                        return void this._handleError(e);
                    if (this._response = this._getResponse(),
                    "arraybuffer" === this._responseType)
                        try {
                            this._response = new Blob([this._response])
                        } catch (i) {
                            if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
                            "TypeError" === i.name && window.BlobBuilder) {
                                var n = new BlobBuilder;
                                n.append(this._response),
                                    this._response = n.getBlob()
                            }
                        }
                    this._clean(),
                        this.dispatchEvent(new createjs.Event("complete"))
                }
            }
            ,
            e._handleTimeout = function(t) {
                this._clean(),
                    this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,t))
            }
            ,
            e._checkError = function() {
                var t = parseInt(this._request.status);
                switch (t) {
                    case 404:
                    case 0:
                        return new Error(t)
                }
                return null
            }
            ,
            e._getResponse = function() {
                if (null != this._response)
                    return this._response;
                if (null != this._request.response)
                    return this._request.response;
                try {
                    if (null != this._request.responseText)
                        return this._request.responseText
                } catch (t) {}
                try {
                    if (null != this._request.responseXML)
                        return this._request.responseXML
                } catch (t) {}
                return null
            }
            ,
            e._createXHR = function(t) {
                var e = createjs.RequestUtils.isCrossDomain(t)
                    , i = {}
                    , n = null;
                if (window.XMLHttpRequest)
                    n = new XMLHttpRequest,
                    e && void 0 === n.withCredentials && window.XDomainRequest && (n = new XDomainRequest);
                else {
                    for (var r = 0, o = s.ACTIVEX_VERSIONS.length; r < o; r++) {
                        var a = s.ACTIVEX_VERSIONS[r];
                        try {
                            n = new ActiveXObject(a);
                            break
                        } catch (l) {}
                    }
                    if (null == n)
                        return !1
                }
                null == t.mimeType && createjs.RequestUtils.isText(t.type) && (t.mimeType = "text/plain; charset=utf-8"),
                t.mimeType && n.overrideMimeType && n.overrideMimeType(t.mimeType),
                    this._xhrLevel = "string" == typeof n.responseType ? 2 : 1;
                var h = null;
                if (h = t.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(t.src, t.values) : t.src,
                    n.open(t.method || createjs.AbstractLoader.GET, h, !0),
                e && n instanceof XMLHttpRequest && 1 == this._xhrLevel && (i.Origin = location.origin),
                t.values && t.method == createjs.AbstractLoader.POST && (i["Content-Type"] = "application/x-www-form-urlencoded"),
                e || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"),
                    t.headers)
                    for (var c in t.headers)
                        i[c] = t.headers[c];
                for (c in i)
                    n.setRequestHeader(c, i[c]);
                return n instanceof XMLHttpRequest && void 0 !== t.withCredentials && (n.withCredentials = t.withCredentials),
                    this._request = n,
                    !0
            }
            ,
            e._clean = function() {
                clearTimeout(this._loadTimeout),
                    null != this._request.removeEventListener ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy),
                        this._request.removeEventListener("progress", this._handleProgressProxy),
                        this._request.removeEventListener("abort", this._handleAbortProxy),
                        this._request.removeEventListener("error", this._handleErrorProxy),
                        this._request.removeEventListener("timeout", this._handleTimeoutProxy),
                        this._request.removeEventListener("load", this._handleLoadProxy),
                        this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) : (this._request.onloadstart = null,
                        this._request.onprogress = null,
                        this._request.onabort = null,
                        this._request.onerror = null,
                        this._request.ontimeout = null,
                        this._request.onload = null,
                        this._request.onreadystatechange = null)
            }
            ,
            e.toString = function() {
                return "[PreloadJS XHRRequest]"
            }
            ,
            createjs.XHRRequest = createjs.promote(t, "AbstractRequest")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e, i) {
            this.AbstractLoader_constructor(),
                this._plugins = [],
                this._typeCallbacks = {},
                this._extensionCallbacks = {},
                this.next = null,
                this.maintainScriptOrder = !0,
                this.stopOnError = !1,
                this._maxConnections = 1,
                this._availableLoaders = [createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader, createjs.TextLoader],
                this._defaultLoaderLength = this._availableLoaders.length,
                this.init(t, e, i)
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        e.init = function(t, e, i) {
            this.useXHR = !0,
                this.preferXHR = !0,
                this._preferXHR = !0,
                this.setPreferXHR(t),
                this._paused = !1,
                this._basePath = e,
                this._crossOrigin = i,
                this._loadStartWasDispatched = !1,
                this._currentlyLoadingScript = null,
                this._currentLoads = [],
                this._loadQueue = [],
                this._loadQueueBackup = [],
                this._loadItemsById = {},
                this._loadItemsBySrc = {},
                this._loadedResults = {},
                this._loadedRawResults = {},
                this._numItems = 0,
                this._numItemsLoaded = 0,
                this._scriptOrder = [],
                this._loadedScripts = [],
                this._lastProgress = NaN
        }
            ,
            i.loadTimeout = 8e3,
            i.LOAD_TIMEOUT = 0,
            i.BINARY = createjs.AbstractLoader.BINARY,
            i.CSS = createjs.AbstractLoader.CSS,
            i.IMAGE = createjs.AbstractLoader.IMAGE,
            i.JAVASCRIPT = createjs.AbstractLoader.JAVASCRIPT,
            i.JSON = createjs.AbstractLoader.JSON,
            i.JSONP = createjs.AbstractLoader.JSONP,
            i.MANIFEST = createjs.AbstractLoader.MANIFEST,
            i.SOUND = createjs.AbstractLoader.SOUND,
            i.VIDEO = createjs.AbstractLoader.VIDEO,
            i.SVG = createjs.AbstractLoader.SVG,
            i.TEXT = createjs.AbstractLoader.TEXT,
            i.XML = createjs.AbstractLoader.XML,
            i.POST = createjs.AbstractLoader.POST,
            i.GET = createjs.AbstractLoader.GET,
            e.registerLoader = function(t) {
                if (!t || !t.canLoadItem)
                    throw new Error("loader is of an incorrect type.");
                if (this._availableLoaders.indexOf(t) != -1)
                    throw new Error("loader already exists.");
                this._availableLoaders.unshift(t)
            }
            ,
            e.unregisterLoader = function(t) {
                var e = this._availableLoaders.indexOf(t);
                e != -1 && e < this._defaultLoaderLength - 1 && this._availableLoaders.splice(e, 1)
            }
            ,
            e.setUseXHR = function(t) {
                return this.setPreferXHR(t)
            }
            ,
            e.setPreferXHR = function(t) {
                return this.preferXHR = 0 != t && null != window.XMLHttpRequest,
                    this.preferXHR
            }
            ,
            e.removeAll = function() {
                this.remove()
            }
            ,
            e.remove = function(t) {
                var e = null;
                if (t && !Array.isArray(t))
                    e = [t];
                else if (t)
                    e = t;
                else if (arguments.length > 0)
                    return;
                var i = !1;
                if (e) {
                    for (; e.length; ) {
                        var n = e.pop()
                            , s = this.getResult(n);
                        for (r = this._loadQueue.length - 1; r >= 0; r--)
                            if (o = this._loadQueue[r].getItem(),
                            o.id == n || o.src == n) {
                                this._loadQueue.splice(r, 1)[0].cancel();
                                break
                            }
                        for (r = this._loadQueueBackup.length - 1; r >= 0; r--)
                            if (o = this._loadQueueBackup[r].getItem(),
                            o.id == n || o.src == n) {
                                this._loadQueueBackup.splice(r, 1)[0].cancel();
                                break
                            }
                        if (s)
                            this._disposeItem(this.getItem(n));
                        else
                            for (var r = this._currentLoads.length - 1; r >= 0; r--) {
                                var o = this._currentLoads[r].getItem();
                                if (o.id == n || o.src == n) {
                                    this._currentLoads.splice(r, 1)[0].cancel(),
                                        i = !0;
                                    break
                                }
                            }
                    }
                    i && this._loadNext()
                } else {
                    this.close();
                    for (var a in this._loadItemsById)
                        this._disposeItem(this._loadItemsById[a]);
                    this.init(this.preferXHR, this._basePath)
                }
            }
            ,
            e.reset = function() {
                this.close();
                for (var t in this._loadItemsById)
                    this._disposeItem(this._loadItemsById[t]);
                for (var e = [], i = 0, n = this._loadQueueBackup.length; i < n; i++)
                    e.push(this._loadQueueBackup[i].getItem());
                this.loadManifest(e, !1)
            }
            ,
            e.installPlugin = function(t) {
                if (null != t && null != t.getPreloadHandlers) {
                    this._plugins.push(t);
                    var e = t.getPreloadHandlers();
                    if (e.scope = t,
                    null != e.types)
                        for (var i = 0, n = e.types.length; i < n; i++)
                            this._typeCallbacks[e.types[i]] = e;
                    if (null != e.extensions)
                        for (i = 0,
                                 n = e.extensions.length; i < n; i++)
                            this._extensionCallbacks[e.extensions[i]] = e
                }
            }
            ,
            e.setMaxConnections = function(t) {
                this._maxConnections = t,
                !this._paused && this._loadQueue.length > 0 && this._loadNext()
            }
            ,
            e.loadFile = function(t, e, i) {
                if (null == t) {
                    var n = new createjs.ErrorEvent("PRELOAD_NO_FILE");
                    return void this._sendError(n)
                }
                this._addItem(t, null, i),
                    e !== !1 ? this.setPaused(!1) : this.setPaused(!0)
            }
            ,
            e.loadManifest = function(t, e, n) {
                var s = null
                    , r = null;
                if (Array.isArray(t)) {
                    if (0 == t.length) {
                        var o = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");
                        return void this._sendError(o)
                    }
                    s = t
                } else if ("string" == typeof t)
                    s = [{
                        src: t,
                        type: i.MANIFEST
                    }];
                else {
                    if ("object" != typeof t) {
                        var o = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");
                        return void this._sendError(o)
                    }
                    if (void 0 !== t.src) {
                        if (null == t.type)
                            t.type = i.MANIFEST;
                        else if (t.type != i.MANIFEST) {
                            var o = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");
                            this._sendError(o)
                        }
                        s = [t]
                    } else
                        void 0 !== t.manifest && (s = t.manifest,
                            r = t.path)
                }
                for (var a = 0, l = s.length; a < l; a++)
                    this._addItem(s[a], r, n);
                e !== !1 ? this.setPaused(!1) : this.setPaused(!0)
            }
            ,
            e.load = function() {
                this.setPaused(!1)
            }
            ,
            e.getItem = function(t) {
                return this._loadItemsById[t] || this._loadItemsBySrc[t]
            }
            ,
            e.getResult = function(t, e) {
                var i = this._loadItemsById[t] || this._loadItemsBySrc[t];
                if (null == i)
                    return null;
                var n = i.id;
                return e && this._loadedRawResults[n] ? this._loadedRawResults[n] : this._loadedResults[n]
            }
            ,
            e.getItems = function(t) {
                var e = [];
                for (var i in this._loadItemsById) {
                    var n = this._loadItemsById[i]
                        , s = this.getResult(i);
                    t === !0 && null == s || e.push({
                        item: n,
                        result: s,
                        rawResult: this.getResult(i, !0)
                    })
                }
                return e
            }
            ,
            e.setPaused = function(t) {
                this._paused = t,
                this._paused || this._loadNext()
            }
            ,
            e.close = function() {
                for (; this._currentLoads.length; )
                    this._currentLoads.pop().cancel();
                this._scriptOrder.length = 0,
                    this._loadedScripts.length = 0,
                    this.loadStartWasDispatched = !1,
                    this._itemCount = 0,
                    this._lastProgress = NaN
            }
            ,
            e._addItem = function(t, e, i) {
                var n = this._createLoadItem(t, e, i);
                if (null != n) {
                    var s = this._createLoader(n);
                    null != s && ("plugins"in s && (s.plugins = this._plugins),
                        n._loader = s,
                        this._loadQueue.push(s),
                        this._loadQueueBackup.push(s),
                        this._numItems++,
                        this._updateProgress(),
                    (this.maintainScriptOrder && n.type == createjs.LoadQueue.JAVASCRIPT || n.maintainOrder === !0) && (this._scriptOrder.push(n),
                        this._loadedScripts.push(null)))
                }
            }
            ,
            e._createLoadItem = function(t, e, i) {
                var n = createjs.LoadItem.create(t);
                if (null == n)
                    return null;
                var s = ""
                    , r = i || this._basePath;
                if (n.src instanceof Object) {
                    if (!n.type)
                        return null;
                    if (e) {
                        s = e;
                        var o = createjs.RequestUtils.parseURI(e);
                        null == r || o.absolute || o.relative || (s = r + s)
                    } else
                        null != r && (s = r)
                } else {
                    var a = createjs.RequestUtils.parseURI(n.src);
                    a.extension && (n.ext = a.extension),
                    null == n.type && (n.type = createjs.RequestUtils.getTypeByExtension(n.ext));
                    var l = n.src;
                    if (!a.absolute && !a.relative)
                        if (e) {
                            s = e;
                            var o = createjs.RequestUtils.parseURI(e);
                            l = e + l,
                            null == r || o.absolute || o.relative || (s = r + s)
                        } else
                            null != r && (s = r);
                    n.src = s + n.src
                }
                n.path = s,
                void 0 !== n.id && null !== n.id && "" !== n.id || (n.id = l);
                var h = this._typeCallbacks[n.type] || this._extensionCallbacks[n.ext];
                if (h) {
                    var c = h.callback.call(h.scope, n, this);
                    if (c === !1)
                        return null;
                    c === !0 || null != c && (n._loader = c),
                        a = createjs.RequestUtils.parseURI(n.src),
                    null != a.extension && (n.ext = a.extension)
                }
                return this._loadItemsById[n.id] = n,
                    this._loadItemsBySrc[n.src] = n,
                null == n.crossOrigin && (n.crossOrigin = this._crossOrigin),
                    n
            }
            ,
            e._createLoader = function(t) {
                if (null != t._loader)
                    return t._loader;
                for (var e = this.preferXHR, i = 0; i < this._availableLoaders.length; i++) {
                    var n = this._availableLoaders[i];
                    if (n && n.canLoadItem(t))
                        return new n(t,e)
                }
                return null
            }
            ,
            e._loadNext = function() {
                if (!this._paused) {
                    this._loadStartWasDispatched || (this._sendLoadStart(),
                        this._loadStartWasDispatched = !0),
                        this._numItems == this._numItemsLoaded ? (this.loaded = !0,
                            this._sendComplete(),
                        this.next && this.next.load && this.next.load()) : this.loaded = !1;
                    for (var t = 0; t < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); t++) {
                        var e = this._loadQueue[t];
                        this._canStartLoad(e) && (this._loadQueue.splice(t, 1),
                            t--,
                            this._loadItem(e))
                    }
                }
            }
            ,
            e._loadItem = function(t) {
                t.on("fileload", this._handleFileLoad, this),
                    t.on("progress", this._handleProgress, this),
                    t.on("complete", this._handleFileComplete, this),
                    t.on("error", this._handleError, this),
                    t.on("fileerror", this._handleFileError, this),
                    this._currentLoads.push(t),
                    this._sendFileStart(t.getItem()),
                    t.load()
            }
            ,
            e._handleFileLoad = function(t) {
                t.target = null,
                    this.dispatchEvent(t)
            }
            ,
            e._handleFileError = function(t) {
                var e = new createjs.ErrorEvent("FILE_LOAD_ERROR",null,t.item);
                this._sendError(e)
            }
            ,
            e._handleError = function(t) {
                var e = t.target;
                this._numItemsLoaded++,
                    this._finishOrderedItem(e, !0),
                    this._updateProgress();
                var i = new createjs.ErrorEvent("FILE_LOAD_ERROR",null,e.getItem());
                this._sendError(i),
                    this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(e),
                        this._cleanLoadItem(e),
                        this._loadNext())
            }
            ,
            e._handleFileComplete = function(t) {
                var e = t.target
                    , i = e.getItem()
                    , n = e.getResult();
                this._loadedResults[i.id] = n;
                var s = e.getResult(!0);
                null != s && s !== n && (this._loadedRawResults[i.id] = s),
                    this._saveLoadedItems(e),
                    this._removeLoadItem(e),
                this._finishOrderedItem(e) || this._processFinishedLoad(i, e),
                    this._cleanLoadItem(e)
            }
            ,
            e._saveLoadedItems = function(t) {
                var e = t.getLoadedItems();
                if (null !== e)
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i].item;
                        this._loadItemsBySrc[n.src] = n,
                            this._loadItemsById[n.id] = n,
                            this._loadedResults[n.id] = e[i].result,
                            this._loadedRawResults[n.id] = e[i].rawResult
                    }
            }
            ,
            e._finishOrderedItem = function(t, e) {
                var i = t.getItem();
                if (this.maintainScriptOrder && i.type == createjs.LoadQueue.JAVASCRIPT || i.maintainOrder) {
                    t instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1);
                    var n = createjs.indexOf(this._scriptOrder, i);
                    return n != -1 && (this._loadedScripts[n] = e === !0 || i,
                        this._checkScriptLoadOrder(),
                        !0)
                }
                return !1
            }
            ,
            e._checkScriptLoadOrder = function() {
                for (var t = this._loadedScripts.length, e = 0; e < t; e++) {
                    var i = this._loadedScripts[e];
                    if (null === i)
                        break;
                    if (i !== !0) {
                        var n = this._loadedResults[i.id];
                        i.type == createjs.LoadQueue.JAVASCRIPT && createjs.DomUtils.appendToHead(n);
                        var s = i._loader;
                        this._processFinishedLoad(i, s),
                            this._loadedScripts[e] = !0
                    }
                }
            }
            ,
            e._processFinishedLoad = function(t, e) {
                if (this._numItemsLoaded++,
                !this.maintainScriptOrder && t.type == createjs.LoadQueue.JAVASCRIPT) {
                    var i = e.getTag();
                    createjs.DomUtils.appendToHead(i)
                }
                this._updateProgress(),
                    this._sendFileComplete(t, e),
                    this._loadNext()
            }
            ,
            e._canStartLoad = function(t) {
                if (!this.maintainScriptOrder || t.preferXHR)
                    return !0;
                var e = t.getItem();
                if (e.type != createjs.LoadQueue.JAVASCRIPT)
                    return !0;
                if (this._currentlyLoadingScript)
                    return !1;
                for (var i = this._scriptOrder.indexOf(e), n = 0; n < i; ) {
                    var s = this._loadedScripts[n];
                    if (null == s)
                        return !1;
                    n++
                }
                return this._currentlyLoadingScript = !0,
                    !0
            }
            ,
            e._removeLoadItem = function(t) {
                for (var e = this._currentLoads.length, i = 0; i < e; i++)
                    if (this._currentLoads[i] == t) {
                        this._currentLoads.splice(i, 1);
                        break
                    }
            }
            ,
            e._cleanLoadItem = function(t) {
                var e = t.getItem();
                e && delete e._loader
            }
            ,
            e._handleProgress = function(t) {
                var e = t.target;
                this._sendFileProgress(e.getItem(), e.progress),
                    this._updateProgress()
            }
            ,
            e._updateProgress = function() {
                var t = this._numItemsLoaded / this._numItems
                    , e = this._numItems - this._numItemsLoaded;
                if (e > 0) {
                    for (var i = 0, n = 0, s = this._currentLoads.length; n < s; n++)
                        i += this._currentLoads[n].progress;
                    t += i / e * (e / this._numItems)
                }
                this._lastProgress != t && (this._sendProgress(t),
                    this._lastProgress = t)
            }
            ,
            e._disposeItem = function(t) {
                delete this._loadedResults[t.id],
                    delete this._loadedRawResults[t.id],
                    delete this._loadItemsById[t.id],
                    delete this._loadItemsBySrc[t.src]
            }
            ,
            e._sendFileProgress = function(t, e) {
                if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) {
                    var i = new createjs.Event("fileprogress");
                    i.progress = e,
                        i.loaded = e,
                        i.total = 1,
                        i.item = t,
                        this.dispatchEvent(i)
                }
            }
            ,
            e._sendFileComplete = function(t, e) {
                if (!this._isCanceled() && !this._paused) {
                    var i = new createjs.Event("fileload");
                    i.loader = e,
                        i.item = t,
                        i.result = this._loadedResults[t.id],
                        i.rawResult = this._loadedRawResults[t.id],
                    t.completeHandler && t.completeHandler(i),
                    this.hasEventListener("fileload") && this.dispatchEvent(i)
                }
            }
            ,
            e._sendFileStart = function(t) {
                var e = new createjs.Event("filestart");
                e.item = t,
                this.hasEventListener("filestart") && this.dispatchEvent(e)
            }
            ,
            e.toString = function() {
                return "[PreloadJS LoadQueue]"
            }
            ,
            createjs.LoadQueue = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.TEXT)
        }
        var e = (createjs.extend(t, createjs.AbstractLoader),
            t);
        e.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.TEXT
        }
            ,
            createjs.TextLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.BINARY),
                this.on("initialize", this._updateXHR, this)
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.BINARY
        }
            ,
            e._updateXHR = function(t) {
                t.loader.setResponseType("arraybuffer")
            }
            ,
            createjs.BinaryLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.CSS),
                this.resultFormatter = this._formatResult,
                this._tagSrcAttribute = "href",
                e ? this._tag = document.createElement("style") : this._tag = document.createElement("link"),
                this._tag.rel = "stylesheet",
                this._tag.type = "text/css"
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.CSS
        }
            ,
            e._formatResult = function(t) {
                if (this._preferXHR) {
                    var e = t.getTag();
                    if (e.styleSheet)
                        e.styleSheet.cssText = t.getResult(!0);
                    else {
                        var i = document.createTextNode(t.getResult(!0));
                        e.appendChild(i)
                    }
                } else
                    e = this._tag;
                return createjs.DomUtils.appendToHead(e),
                    e
            }
            ,
            createjs.CSSLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.IMAGE),
                this.resultFormatter = this._formatResult,
                this._tagSrcAttribute = "src",
                createjs.RequestUtils.isImageTag(t) ? this._tag = t : createjs.RequestUtils.isImageTag(t.src) ? this._tag = t.src : createjs.RequestUtils.isImageTag(t.tag) && (this._tag = t.tag),
                null != this._tag ? this._preferXHR = !1 : this._tag = document.createElement("img"),
                this.on("initialize", this._updateXHR, this)
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.IMAGE
        }
            ,
            e.load = function() {
                if ("" != this._tag.src && this._tag.complete)
                    return void this._sendComplete();
                var t = this._item.crossOrigin;
                1 == t && (t = "Anonymous"),
                null == t || createjs.RequestUtils.isLocal(this._item.src) || (this._tag.crossOrigin = t),
                    this.AbstractLoader_load()
            }
            ,
            e._updateXHR = function(t) {
                t.loader.mimeType = "text/plain; charset=x-user-defined-binary",
                t.loader.setResponseType && t.loader.setResponseType("blob")
            }
            ,
            e._formatResult = function(t) {
                return this._formatImage
            }
            ,
            e._formatImage = function(t, e) {
                var i = this._tag
                    , n = window.URL || window.webkitURL;
                if (this._preferXHR)
                    if (n) {
                        var s = n.createObjectURL(this.getResult(!0));
                        i.src = s,
                            i.addEventListener("load", this._cleanUpURL, !1),
                            i.addEventListener("error", this._cleanUpURL, !1)
                    } else
                        i.src = this._item.src;
                else
                    ;i.complete ? t(i) : (i.onload = createjs.proxy(function() {
                    t(this._tag)
                }, this),
                    i.onerror = createjs.proxy(function() {
                        e(_this._tag)
                    }, this))
            }
            ,
            e._cleanUpURL = function(t) {
                var e = window.URL || window.webkitURL;
                e.revokeObjectURL(t.target.src)
            }
            ,
            createjs.ImageLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.JAVASCRIPT),
                this.resultFormatter = this._formatResult,
                this._tagSrcAttribute = "src",
                this.setTag(document.createElement("script"))
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.JAVASCRIPT
        }
            ,
            e._formatResult = function(t) {
                var e = t.getTag();
                return this._preferXHR && (e.text = t.getResult(!0)),
                    e
            }
            ,
            createjs.JavaScriptLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.JSON),
                this.resultFormatter = this._formatResult
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.JSON
        }
            ,
            e._formatResult = function(t) {
                var e = null;
                try {
                    e = createjs.DataUtils.parseJSON(t.getResult(!0))
                } catch (i) {
                    var n = new createjs.ErrorEvent("JSON_FORMAT",null,i);
                    return this._sendError(n),
                        i
                }
                return e
            }
            ,
            createjs.JSONLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !1, createjs.AbstractLoader.JSONP),
                this.setTag(document.createElement("script")),
                this.getTag().type = "text/javascript"
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.JSONP
        }
            ,
            e.cancel = function() {
                this.AbstractLoader_cancel(),
                    this._dispose()
            }
            ,
            e.load = function() {
                if (null == this._item.callback)
                    throw new Error("callback is required for loading JSONP requests.");
                if (null != window[this._item.callback])
                    throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one.");
                window[this._item.callback] = createjs.proxy(this._handleLoad, this),
                    window.document.body.appendChild(this._tag),
                    this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout),
                    this._tag.src = this._item.src
            }
            ,
            e._handleLoad = function(t) {
                this._result = this._rawResult = t,
                    this._sendComplete(),
                    this._dispose()
            }
            ,
            e._handleTimeout = function() {
                this._dispose(),
                    this.dispatchEvent(new createjs.ErrorEvent("timeout"))
            }
            ,
            e._dispose = function() {
                window.document.body.removeChild(this._tag),
                    delete window[this._item.callback],
                    clearTimeout(this._loadTimeout)
            }
            ,
            createjs.JSONPLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, null, createjs.AbstractLoader.MANIFEST),
                this.plugins = null,
                this._manifestQueue = null
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.MANIFEST_PROGRESS = .25,
            i.canLoadItem = function(t) {
                return t.type == createjs.AbstractLoader.MANIFEST
            }
            ,
            e.load = function() {
                this.AbstractLoader_load()
            }
            ,
            e._createRequest = function() {
                var t = this._item.callback;
                null != t ? this._request = new createjs.JSONPLoader(this._item) : this._request = new createjs.JSONLoader(this._item)
            }
            ,
            e.handleEvent = function(t) {
                switch (t.type) {
                    case "complete":
                        return this._rawResult = t.target.getResult(!0),
                            this._result = t.target.getResult(),
                            this._sendProgress(i.MANIFEST_PROGRESS),
                            void this._loadManifest(this._result);
                    case "progress":
                        return t.loaded *= i.MANIFEST_PROGRESS,
                            this.progress = t.loaded / t.total,
                        (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0),
                            void this._sendProgress(t)
                }
                this.AbstractLoader_handleEvent(t)
            }
            ,
            e.destroy = function() {
                this.AbstractLoader_destroy(),
                    this._manifestQueue.close()
            }
            ,
            e._loadManifest = function(t) {
                if (t && t.manifest) {
                    var e = this._manifestQueue = new createjs.LoadQueue;
                    e.on("fileload", this._handleManifestFileLoad, this),
                        e.on("progress", this._handleManifestProgress, this),
                        e.on("complete", this._handleManifestComplete, this, !0),
                        e.on("error", this._handleManifestError, this, !0);
                    for (var i = 0, n = this.plugins.length; i < n; i++)
                        e.installPlugin(this.plugins[i]);
                    e.loadManifest(t)
                } else
                    this._sendComplete()
            }
            ,
            e._handleManifestFileLoad = function(t) {
                t.target = null,
                    this.dispatchEvent(t)
            }
            ,
            e._handleManifestComplete = function(t) {
                this._loadedItems = this._manifestQueue.getItems(!0),
                    this._sendComplete()
            }
            ,
            e._handleManifestProgress = function(t) {
                this.progress = t.progress * (1 - i.MANIFEST_PROGRESS) + i.MANIFEST_PROGRESS,
                    this._sendProgress(this.progress)
            }
            ,
            e._handleManifestError = function(t) {
                var e = new createjs.Event("fileerror");
                e.item = t.data,
                    this.dispatchEvent(e)
            }
            ,
            createjs.ManifestLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractMediaLoader_constructor(t, e, createjs.AbstractLoader.SOUND),
                createjs.RequestUtils.isAudioTag(t) ? this._tag = t : createjs.RequestUtils.isAudioTag(t.src) ? this._tag = t : createjs.RequestUtils.isAudioTag(t.tag) && (this._tag = createjs.RequestUtils.isAudioTag(t) ? t : t.src),
            null != this._tag && (this._preferXHR = !1)
        }
        var e = createjs.extend(t, createjs.AbstractMediaLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.SOUND
        }
            ,
            e._createTag = function(t) {
                var e = document.createElement("audio");
                return e.autoplay = !1,
                    e.preload = "none",
                    e.src = t,
                    e
            }
            ,
            createjs.SoundLoader = createjs.promote(t, "AbstractMediaLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractMediaLoader_constructor(t, e, createjs.AbstractLoader.VIDEO),
                createjs.RequestUtils.isVideoTag(t) || createjs.RequestUtils.isVideoTag(t.src) ? (this.setTag(createjs.RequestUtils.isVideoTag(t) ? t : t.src),
                    this._preferXHR = !1) : this.setTag(this._createTag())
        }
        var e = createjs.extend(t, createjs.AbstractMediaLoader)
            , i = t;
        e._createTag = function() {
            return document.createElement("video")
        }
            ,
            i.canLoadItem = function(t) {
                return t.type == createjs.AbstractLoader.VIDEO
            }
            ,
            createjs.VideoLoader = createjs.promote(t, "AbstractMediaLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.SPRITESHEET),
                this._manifestQueue = null
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.SPRITESHEET_PROGRESS = .25,
            i.canLoadItem = function(t) {
                return t.type == createjs.AbstractLoader.SPRITESHEET
            }
            ,
            e.destroy = function() {
                this.AbstractLoader_destroy,
                    this._manifestQueue.close()
            }
            ,
            e._createRequest = function() {
                var t = this._item.callback;
                null != t ? this._request = new createjs.JSONPLoader(this._item) : this._request = new createjs.JSONLoader(this._item);
            }
            ,
            e.handleEvent = function(t) {
                switch (t.type) {
                    case "complete":
                        return this._rawResult = t.target.getResult(!0),
                            this._result = t.target.getResult(),
                            this._sendProgress(i.SPRITESHEET_PROGRESS),
                            void this._loadManifest(this._result);
                    case "progress":
                        return t.loaded *= i.SPRITESHEET_PROGRESS,
                            this.progress = t.loaded / t.total,
                        (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0),
                            void this._sendProgress(t)
                }
                this.AbstractLoader_handleEvent(t)
            }
            ,
            e._loadManifest = function(t) {
                if (t && t.images) {
                    var e = this._manifestQueue = new createjs.LoadQueue(this._preferXHR,this._item.path,this._item.crossOrigin);
                    e.on("complete", this._handleManifestComplete, this, !0),
                        e.on("fileload", this._handleManifestFileLoad, this),
                        e.on("progress", this._handleManifestProgress, this),
                        e.on("error", this._handleManifestError, this, !0),
                        e.loadManifest(t.images)
                }
            }
            ,
            e._handleManifestFileLoad = function(t) {
                var e = t.result;
                if (null != e) {
                    var i = this.getResult().images
                        , n = i.indexOf(t.item.src);
                    i[n] = e
                }
            }
            ,
            e._handleManifestComplete = function(t) {
                this._result = new createjs.SpriteSheet(this._result),
                    this._loadedItems = this._manifestQueue.getItems(!0),
                    this._sendComplete()
            }
            ,
            e._handleManifestProgress = function(t) {
                this.progress = t.progress * (1 - i.SPRITESHEET_PROGRESS) + i.SPRITESHEET_PROGRESS,
                    this._sendProgress(this.progress)
            }
            ,
            e._handleManifestError = function(t) {
                var e = new createjs.Event("fileerror");
                e.item = t.data,
                    this.dispatchEvent(e)
            }
            ,
            createjs.SpriteSheetLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t, e) {
            this.AbstractLoader_constructor(t, e, createjs.AbstractLoader.SVG),
                this.resultFormatter = this._formatResult,
                this._tagSrcAttribute = "data",
                e ? this.setTag(document.createElement("svg")) : (this.setTag(document.createElement("object")),
                    this.getTag().type = "image/svg+xml")
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.SVG
        }
            ,
            e._formatResult = function(t) {
                var e = createjs.DataUtils.parseXML(t.getResult(!0), "text/xml")
                    , i = t.getTag();
                return !this._preferXHR && document.body.contains(i) && document.body.removeChild(i),
                    null != e.documentElement ? (i.appendChild(e.documentElement),
                        i.style.visibility = "visible",
                        i) : e
            }
            ,
            createjs.SVGLoader = createjs.promote(t, "AbstractLoader")
    }(),
    this.createjs = this.createjs || {},
    function() {
        "use strict";
        function t(t) {
            this.AbstractLoader_constructor(t, !0, createjs.AbstractLoader.XML),
                this.resultFormatter = this._formatResult
        }
        var e = createjs.extend(t, createjs.AbstractLoader)
            , i = t;
        i.canLoadItem = function(t) {
            return t.type == createjs.AbstractLoader.XML
        }
            ,
            e._formatResult = function(t) {
                return createjs.DataUtils.parseXML(t.getResult(!0), "text/xml")
            }
            ,
            createjs.XMLLoader = createjs.promote(t, "AbstractLoader")
    }(),
    +function(t) {
        "use strict";
        function e(e) {
            var i = e.attr("data-target");
            i || (i = e.attr("href"),
                i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
            var n = i && t(i);
            return n && n.length ? n : e.parent()
        }
        function i(i) {
            i && 3 === i.which || (t(s).remove(),
                t(r).each(function() {
                    var n = t(this)
                        , s = e(n)
                        , r = {
                        relatedTarget: this
                    };
                    s.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(s[0], i.target) || (s.trigger(i = t.Event("hide.bs.dropdown", r)),
                    i.isDefaultPrevented() || (n.attr("aria-expanded", "false"),
                        s.removeClass("open").trigger(t.Event("hidden.bs.dropdown", r)))))
                }))
        }
        function n(e) {
            return this.each(function() {
                var i = t(this)
                    , n = i.data("bs.dropdown");
                n || i.data("bs.dropdown", n = new o(this)),
                "string" == typeof e && n[e].call(i)
            })
        }
        var s = ".dropdown-backdrop"
            , r = '[data-toggle="dropdown"]'
            , o = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
        o.VERSION = "3.3.7",
            o.prototype.toggle = function(n) {
                var s = t(this);
                if (!s.is(".disabled, :disabled")) {
                    var r = e(s)
                        , o = r.hasClass("open");
                    if (i(),
                        !o) {
                        "ontouchstart"in document.documentElement && !r.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                        var a = {
                            relatedTarget: this
                        };
                        if (r.trigger(n = t.Event("show.bs.dropdown", a)),
                            n.isDefaultPrevented())
                            return;
                        s.trigger("focus").attr("aria-expanded", "true"),
                            r.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
                    }
                    return !1
                }
            }
            ,
            o.prototype.keydown = function(i) {
                if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
                    var n = t(this);
                    if (i.preventDefault(),
                        i.stopPropagation(),
                        !n.is(".disabled, :disabled")) {
                        var s = e(n)
                            , o = s.hasClass("open");
                        if (!o && 27 != i.which || o && 27 == i.which)
                            return 27 == i.which && s.find(r).trigger("focus"),
                                n.trigger("click");
                        var a = " li:not(.disabled):visible a"
                            , l = s.find(".dropdown-menu" + a);
                        if (l.length) {
                            var h = l.index(i.target);
                            38 == i.which && h > 0 && h--,
                            40 == i.which && h < l.length - 1 && h++,
                            ~h || (h = 0),
                                l.eq(h).trigger("focus")
                        }
                    }
                }
            }
        ;
        var a = t.fn.dropdown;
        t.fn.dropdown = n,
            t.fn.dropdown.Constructor = o,
            t.fn.dropdown.noConflict = function() {
                return t.fn.dropdown = a,
                    this
            }
            ,
            t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
                t.stopPropagation()
            }).on("click.bs.dropdown.data-api", r, o.prototype.toggle).on("keydown.bs.dropdown.data-api", r, o.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", o.prototype.keydown)
    }(jQuery),
    function(t, e) {
        "function" == typeof define && define.amd ? define(["jquery"], function(t) {
            return e(t)
        }) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(t.jQuery)
    }(this, function(t) {
        !function(t) {
            "use strict";
            function e(e) {
                var i = [{
                    re: /[\xC0-\xC6]/g,
                    ch: "A"
                }, {
                    re: /[\xE0-\xE6]/g,
                    ch: "a"
                }, {
                    re: /[\xC8-\xCB]/g,
                    ch: "E"
                }, {
                    re: /[\xE8-\xEB]/g,
                    ch: "e"
                }, {
                    re: /[\xCC-\xCF]/g,
                    ch: "I"
                }, {
                    re: /[\xEC-\xEF]/g,
                    ch: "i"
                }, {
                    re: /[\xD2-\xD6]/g,
                    ch: "O"
                }, {
                    re: /[\xF2-\xF6]/g,
                    ch: "o"
                }, {
                    re: /[\xD9-\xDC]/g,
                    ch: "U"
                }, {
                    re: /[\xF9-\xFC]/g,
                    ch: "u"
                }, {
                    re: /[\xC7-\xE7]/g,
                    ch: "c"
                }, {
                    re: /[\xD1]/g,
                    ch: "N"
                }, {
                    re: /[\xF1]/g,
                    ch: "n"
                }];
                return t.each(i, function() {
                    e = e ? e.replace(this.re, this.ch) : ""
                }),
                    e
            }
            function i(e) {
                var i = arguments
                    , n = e;
                [].shift.apply(i);
                var s, r = this.each(function() {
                    var e = t(this);
                    if (e.is("select")) {
                        var r = e.data("selectpicker")
                            , o = "object" == typeof n && n;
                        if (r) {
                            if (o)
                                for (var a in o)
                                    o.hasOwnProperty(a) && (r.options[a] = o[a])
                        } else {
                            var l = t.extend({}, c.DEFAULTS, t.fn.selectpicker.defaults || {}, e.data(), o);
                            l.template = t.extend({}, c.DEFAULTS.template, t.fn.selectpicker.defaults ? t.fn.selectpicker.defaults.template : {}, e.data().template, o.template),
                                e.data("selectpicker", r = new c(this,l))
                        }
                        "string" == typeof n && (s = r[n]instanceof Function ? r[n].apply(r, i) : r.options[n])
                    }
                });
                return "undefined" != typeof s ? s : r
            }
            String.prototype.includes || !function() {
                var t = {}.toString
                    , e = function() {
                    try {
                        var t = {}
                            , e = Object.defineProperty
                            , i = e(t, t, t) && e
                    } catch (n) {}
                    return i
                }()
                    , i = "".indexOf
                    , n = function(e) {
                    if (null == this)
                        throw new TypeError;
                    var n = String(this);
                    if (e && "[object RegExp]" == t.call(e))
                        throw new TypeError;
                    var s = n.length
                        , r = String(e)
                        , o = r.length
                        , a = arguments.length > 1 ? arguments[1] : void 0
                        , l = a ? Number(a) : 0;
                    l != l && (l = 0);
                    var h = Math.min(Math.max(l, 0), s);
                    return !(o + h > s) && i.call(n, r, l) != -1
                };
                e ? e(String.prototype, "includes", {
                    value: n,
                    configurable: !0,
                    writable: !0
                }) : String.prototype.includes = n
            }(),
            String.prototype.startsWith || !function() {
                var t = function() {
                    try {
                        var t = {}
                            , e = Object.defineProperty
                            , i = e(t, t, t) && e
                    } catch (n) {}
                    return i
                }()
                    , e = {}.toString
                    , i = function(t) {
                    if (null == this)
                        throw new TypeError;
                    var i = String(this);
                    if (t && "[object RegExp]" == e.call(t))
                        throw new TypeError;
                    var n = i.length
                        , s = String(t)
                        , r = s.length
                        , o = arguments.length > 1 ? arguments[1] : void 0
                        , a = o ? Number(o) : 0;
                    a != a && (a = 0);
                    var l = Math.min(Math.max(a, 0), n);
                    if (r + l > n)
                        return !1;
                    for (var h = -1; ++h < r; )
                        if (i.charCodeAt(l + h) != s.charCodeAt(h))
                            return !1;
                    return !0
                };
                t ? t(String.prototype, "startsWith", {
                    value: i,
                    configurable: !0,
                    writable: !0
                }) : String.prototype.startsWith = i
            }(),
            Object.keys || (Object.keys = function(t, e, i) {
                    i = [];
                    for (e in t)
                        i.hasOwnProperty.call(t, e) && i.push(e);
                    return i
                }
            );
            var n = {
                useDefault: !1,
                _set: t.valHooks.select.set
            };
            t.valHooks.select.set = function(e, i) {
                return i && !n.useDefault && t(e).data("selected", !0),
                    n._set.apply(this, arguments)
            }
            ;
            var s = null;
            t.fn.triggerNative = function(t) {
                var e, i = this[0];
                i.dispatchEvent ? ("function" == typeof Event ? e = new Event(t,{
                    bubbles: !0
                }) : (e = document.createEvent("Event"),
                    e.initEvent(t, !0, !1)),
                    i.dispatchEvent(e)) : i.fireEvent ? (e = document.createEventObject(),
                    e.eventType = t,
                    i.fireEvent("on" + t, e)) : this.trigger(t)
            }
                ,
                t.expr.pseudos.icontains = function(e, i, n) {
                    var s = t(e)
                        , r = (s.data("tokens") || s.text()).toString().toUpperCase();
                    return r.includes(n[3].toUpperCase())
                }
                ,
                t.expr.pseudos.ibegins = function(e, i, n) {
                    var s = t(e)
                        , r = (s.data("tokens") || s.text()).toString().toUpperCase();
                    return r.startsWith(n[3].toUpperCase())
                }
                ,
                t.expr.pseudos.aicontains = function(e, i, n) {
                    var s = t(e)
                        , r = (s.data("tokens") || s.data("normalizedText") || s.text()).toString().toUpperCase();
                    return r.includes(n[3].toUpperCase())
                }
                ,
                t.expr.pseudos.aibegins = function(e, i, n) {
                    var s = t(e)
                        , r = (s.data("tokens") || s.data("normalizedText") || s.text()).toString().toUpperCase();
                    return r.startsWith(n[3].toUpperCase())
                }
            ;
            var r = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }
                , o = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"',
                "&#x27;": "'",
                "&#x60;": "`"
            }
                , a = function(t) {
                var e = function(e) {
                    return t[e]
                }
                    , i = "(?:" + Object.keys(t).join("|") + ")"
                    , n = RegExp(i)
                    , s = RegExp(i, "g");
                return function(t) {
                    return t = null == t ? "" : "" + t,
                        n.test(t) ? t.replace(s, e) : t
                }
            }
                , l = a(r)
                , h = a(o)
                , c = function(e, i) {
                n.useDefault || (t.valHooks.select.set = n._set,
                    n.useDefault = !0),
                    this.$element = t(e),
                    this.$newElement = null,
                    this.$button = null,
                    this.$menu = null,
                    this.$lis = null,
                    this.options = i,
                null === this.options.title && (this.options.title = this.$element.attr("title"));
                var s = this.options.windowPadding;
                "number" == typeof s && (this.options.windowPadding = [s, s, s, s]),
                    this.val = c.prototype.val,
                    this.render = c.prototype.render,
                    this.refresh = c.prototype.refresh,
                    this.setStyle = c.prototype.setStyle,
                    this.selectAll = c.prototype.selectAll,
                    this.deselectAll = c.prototype.deselectAll,
                    this.destroy = c.prototype.destroy,
                    this.remove = c.prototype.remove,
                    this.show = c.prototype.show,
                    this.hide = c.prototype.hide,
                    this.init()
            };
            c.VERSION = "1.12.2",
                c.DEFAULTS = {
                    noneSelectedText: "Nothing selected",
                    noneResultsText: "No results matched {0}",
                    countSelectedText: function(t, e) {
                        return 1 == t ? "{0} item selected" : "{0} items selected"
                    },
                    maxOptionsText: function(t, e) {
                        return [1 == t ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == e ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
                    },
                    selectAllText: "Select All",
                    deselectAllText: "Deselect All",
                    doneButton: !1,
                    doneButtonText: "Close",
                    multipleSeparator: ", ",
                    styleBase: "btn",
                    style: "btn-default",
                    size: "auto",
                    title: null,
                    selectedTextFormat: "values",
                    width: !1,
                    container: !1,
                    hideDisabled: !1,
                    showSubtext: !1,
                    showIcon: !0,
                    showContent: !0,
                    dropupAuto: !0,
                    header: !1,
                    liveSearch: !1,
                    liveSearchPlaceholder: null,
                    liveSearchNormalize: !1,
                    liveSearchStyle: "contains",
                    actionsBox: !1,
                    iconBase: "glyphicon",
                    tickIcon: "glyphicon-ok",
                    showTick: !1,
                    template: {
                        caret: '<span class="caret"></span>'
                    },
                    maxOptions: !1,
                    mobile: !1,
                    selectOnTab: !1,
                    dropdownAlignRight: !1,
                    windowPadding: 0
                },
                c.prototype = {
                    constructor: c,
                    init: function() {
                        var e = this
                            , i = this.$element.attr("id");
                        this.$element.addClass("bs-select-hidden"),
                            this.liObj = {},
                            this.multiple = this.$element.prop("multiple"),
                            this.autofocus = this.$element.prop("autofocus"),
                            this.$newElement = this.createView(),
                            this.$element.after(this.$newElement).appendTo(this.$newElement),
                            this.$button = this.$newElement.children("button"),
                            this.$menu = this.$newElement.children(".dropdown-menu"),
                            this.$menuInner = this.$menu.children(".inner"),
                            this.$searchbox = this.$menu.find("input"),
                            this.$element.removeClass("bs-select-hidden"),
                        this.options.dropdownAlignRight === !0 && this.$menu.addClass("dropdown-menu-right"),
                        "undefined" != typeof i && (this.$button.attr("data-id", i),
                            t('label[for="' + i + '"]').click(function(t) {
                                t.preventDefault(),
                                    e.$button.focus()
                            })),
                            this.checkDisabled(),
                            this.clickListener(),
                        this.options.liveSearch && this.liveSearchListener(),
                            this.render(),
                            this.setStyle(),
                            this.setWidth(),
                        this.options.container && this.selectPosition(),
                            this.$menu.data("this", this),
                            this.$newElement.data("this", this),
                        this.options.mobile && this.mobile(),
                            this.$newElement.on({
                                "hide.bs.dropdown": function(t) {
                                    e.$menuInner.attr("aria-expanded", !1),
                                        e.$element.trigger("hide.bs.select", t)
                                },
                                "hidden.bs.dropdown": function(t) {
                                    e.$element.trigger("hidden.bs.select", t)
                                },
                                "show.bs.dropdown": function(t) {
                                    e.$menuInner.attr("aria-expanded", !0),
                                        e.$element.trigger("show.bs.select", t)
                                },
                                "shown.bs.dropdown": function(t) {
                                    e.$element.trigger("shown.bs.select", t)
                                }
                            }),
                        e.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
                            e.$button.addClass("bs-invalid").focus(),
                                e.$element.on({
                                    "focus.bs.select": function() {
                                        e.$button.focus(),
                                            e.$element.off("focus.bs.select")
                                    },
                                    "shown.bs.select": function() {
                                        e.$element.val(e.$element.val()).off("shown.bs.select")
                                    },
                                    "rendered.bs.select": function() {
                                        this.validity.valid && e.$button.removeClass("bs-invalid"),
                                            e.$element.off("rendered.bs.select")
                                    }
                                })
                        }),
                            setTimeout(function() {
                                e.$element.trigger("loaded.bs.select")
                            })
                    },
                    createDropdown: function() {
                        var e = this.multiple || this.options.showTick ? " show-tick" : ""
                            , i = this.$element.parent().hasClass("input-group") ? " input-group-btn" : ""
                            , n = this.autofocus ? " autofocus" : ""
                            , s = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : ""
                            , r = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + l(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : ""
                            , o = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : ""
                            , a = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : ""
                            , h = '<div class="btn-group bootstrap-select' + e + i + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + n + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + s + r + o + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + a + "</div></div>";
                        return t(h)
                    },
                    createView: function() {
                        var t = this.createDropdown()
                            , e = this.createLi();
                        return t.find("ul")[0].innerHTML = e,
                            t
                    },
                    reloadLi: function() {
                        var t = this.createLi();
                        this.$menuInner[0].innerHTML = t
                    },
                    createLi: function() {
                        var i = this
                            , n = []
                            , s = 0
                            , r = document.createElement("option")
                            , o = -1
                            , a = function(t, e, i, n) {
                            return "<li" + ("undefined" != typeof i & "" !== i ? ' class="' + i + '"' : "") + ("undefined" != typeof e & null !== e ? ' data-original-index="' + e + '"' : "") + ("undefined" != typeof n & null !== n ? 'data-optgroup="' + n + '"' : "") + ">" + t + "</li>"
                        }
                            , h = function(n, s, r, o) {
                            return '<a tabindex="0"' + ("undefined" != typeof s ? ' class="' + s + '"' : "") + (r ? ' style="' + r + '"' : "") + (i.options.liveSearchNormalize ? ' data-normalized-text="' + e(l(t(n).html())) + '"' : "") + ("undefined" != typeof o || null !== o ? ' data-tokens="' + o + '"' : "") + ' role="option">' + n + '<span class="' + i.options.iconBase + " " + i.options.tickIcon + ' check-mark"></span></a>'
                        };
                        if (this.options.title && !this.multiple && (o--,
                            !this.$element.find(".bs-title-option").length)) {
                            var c = this.$element[0];
                            r.className = "bs-title-option",
                                r.innerHTML = this.options.title,
                                r.value = "",
                                c.insertBefore(r, c.firstChild);
                            var u = t(c.options[c.selectedIndex]);
                            void 0 === u.attr("selected") && void 0 === this.$element.data("selected") && (r.selected = !0)
                        }
                        return this.$element.find("option").each(function(e) {
                            var r = t(this);
                            if (o++,
                                !r.hasClass("bs-title-option")) {
                                var c = this.className || ""
                                    , u = this.style.cssText
                                    , d = r.data("content") ? r.data("content") : r.html()
                                    , f = r.data("tokens") ? r.data("tokens") : null
                                    , p = "undefined" != typeof r.data("subtext") ? '<small class="text-muted">' + r.data("subtext") + "</small>" : ""
                                    , m = "undefined" != typeof r.data("icon") ? '<span class="' + i.options.iconBase + " " + r.data("icon") + '"></span> ' : ""
                                    , _ = r.parent()
                                    , g = "OPTGROUP" === _[0].tagName
                                    , v = g && _[0].disabled
                                    , y = this.disabled || v;
                                if ("" !== m && y && (m = "<span>" + m + "</span>"),
                                i.options.hideDisabled && (y && !g || v))
                                    return void o--;
                                if (r.data("content") || (d = m + '<span class="text">' + d + p + "</span>"),
                                g && r.data("divider") !== !0) {
                                    if (i.options.hideDisabled && y) {
                                        if (void 0 === _.data("allOptionsDisabled")) {
                                            var b = _.children();
                                            _.data("allOptionsDisabled", b.filter(":disabled").length === b.length)
                                        }
                                        if (_.data("allOptionsDisabled"))
                                            return void o--
                                    }
                                    var w = " " + _[0].className || "";
                                    if (0 === r.index()) {
                                        s += 1;
                                        var T = _[0].label
                                            , x = "undefined" != typeof _.data("subtext") ? '<small class="text-muted">' + _.data("subtext") + "</small>" : ""
                                            , S = _.data("icon") ? '<span class="' + i.options.iconBase + " " + _.data("icon") + '"></span> ' : "";
                                        T = S + '<span class="text">' + l(T) + x + "</span>",
                                        0 !== e && n.length > 0 && (o++,
                                            n.push(a("", null, "divider", s + "div"))),
                                            o++,
                                            n.push(a(T, null, "dropdown-header" + w, s))
                                    }
                                    if (i.options.hideDisabled && y)
                                        return void o--;
                                    n.push(a(h(d, "opt " + c + w, u, f), e, "", s))
                                } else if (r.data("divider") === !0)
                                    n.push(a("", e, "divider"));
                                else if (r.data("hidden") === !0)
                                    n.push(a(h(d, c, u, f), e, "hidden is-hidden"));
                                else {
                                    var C = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
                                    if (!C && i.options.hideDisabled)
                                        for (var L = t(this).prevAll(), E = 0; E < L.length; E++)
                                            if ("OPTGROUP" === L[E].tagName) {
                                                for (var k = 0, P = 0; P < E; P++) {
                                                    var A = L[P];
                                                    (A.disabled || t(A).data("hidden") === !0) && k++
                                                }
                                                k === E && (C = !0);
                                                break
                                            }
                                    C && (o++,
                                        n.push(a("", null, "divider", s + "div"))),
                                        n.push(a(h(d, c, u, f), e))
                                }
                                i.liObj[e] = o
                            }
                        }),
                        this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"),
                            n.join("")
                    },
                    findLis: function() {
                        return null == this.$lis && (this.$lis = this.$menu.find("li")),
                            this.$lis
                    },
                    render: function(e) {
                        var i, n = this;
                        e !== !1 && this.$element.find("option").each(function(t) {
                            var e = n.findLis().eq(n.liObj[t]);
                            n.setDisabled(t, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, e),
                                n.setSelected(t, this.selected, e)
                        }),
                            this.togglePlaceholder(),
                            this.tabIndex();
                        var s = this.$element.find("option").map(function() {
                            if (this.selected) {
                                if (n.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled))
                                    return;
                                var e, i = t(this), s = i.data("icon") && n.options.showIcon ? '<i class="' + n.options.iconBase + " " + i.data("icon") + '"></i> ' : "";
                                return e = n.options.showSubtext && i.data("subtext") && !n.multiple ? ' <small class="text-muted">' + i.data("subtext") + "</small>" : "",
                                    "undefined" != typeof i.attr("title") ? i.attr("title") : i.data("content") && n.options.showContent ? i.data("content").toString() : s + i.html() + e
                            }
                        }).toArray()
                            , r = this.multiple ? s.join(this.options.multipleSeparator) : s[0];
                        if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                            var o = this.options.selectedTextFormat.split(">");
                            if (o.length > 1 && s.length > o[1] || 1 == o.length && s.length >= 2) {
                                i = this.options.hideDisabled ? ", [disabled]" : "";
                                var a = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + i).length
                                    , l = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(s.length, a) : this.options.countSelectedText;
                                r = l.replace("{0}", s.length.toString()).replace("{1}", a.toString())
                            }
                        }
                        void 0 == this.options.title && (this.options.title = this.$element.attr("title")),
                        "static" == this.options.selectedTextFormat && (r = this.options.title),
                        r || (r = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText),
                            this.$button.attr("title", h(t.trim(r.replace(/<[^>]*>?/g, "")))),
                            this.$button.children(".filter-option").html(r),
                            this.$element.trigger("rendered.bs.select")
                    },
                    setStyle: function(t, e) {
                        this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
                        var i = t ? t : this.options.style;
                        "add" == e ? this.$button.addClass(i) : "remove" == e ? this.$button.removeClass(i) : (this.$button.removeClass(this.options.style),
                            this.$button.addClass(i))
                    },
                    liHeight: function(e) {
                        if (e || this.options.size !== !1 && !this.sizeInfo) {
                            var i = document.createElement("div")
                                , n = document.createElement("div")
                                , s = document.createElement("ul")
                                , r = document.createElement("li")
                                , o = document.createElement("li")
                                , a = document.createElement("a")
                                , l = document.createElement("span")
                                , h = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null
                                , c = this.options.liveSearch ? document.createElement("div") : null
                                , u = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null
                                , d = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
                            if (l.className = "text",
                                i.className = this.$menu[0].parentNode.className + " open",
                                n.className = "dropdown-menu open",
                                s.className = "dropdown-menu inner",
                                r.className = "divider",
                                l.appendChild(document.createTextNode("Inner text")),
                                a.appendChild(l),
                                o.appendChild(a),
                                s.appendChild(o),
                                s.appendChild(r),
                            h && n.appendChild(h),
                                c) {
                                var f = document.createElement("input");
                                c.className = "bs-searchbox",
                                    f.className = "form-control",
                                    c.appendChild(f),
                                    n.appendChild(c)
                            }
                            u && n.appendChild(u),
                                n.appendChild(s),
                            d && n.appendChild(d),
                                i.appendChild(n),
                                document.body.appendChild(i);
                            var p = a.offsetHeight
                                , m = h ? h.offsetHeight : 0
                                , _ = c ? c.offsetHeight : 0
                                , g = u ? u.offsetHeight : 0
                                , v = d ? d.offsetHeight : 0
                                , y = t(r).outerHeight(!0)
                                , b = "function" == typeof getComputedStyle && getComputedStyle(n)
                                , w = b ? null : t(n)
                                , T = {
                                vert: parseInt(b ? b.paddingTop : w.css("paddingTop")) + parseInt(b ? b.paddingBottom : w.css("paddingBottom")) + parseInt(b ? b.borderTopWidth : w.css("borderTopWidth")) + parseInt(b ? b.borderBottomWidth : w.css("borderBottomWidth")),
                                horiz: parseInt(b ? b.paddingLeft : w.css("paddingLeft")) + parseInt(b ? b.paddingRight : w.css("paddingRight")) + parseInt(b ? b.borderLeftWidth : w.css("borderLeftWidth")) + parseInt(b ? b.borderRightWidth : w.css("borderRightWidth"))
                            }
                                , x = {
                                vert: T.vert + parseInt(b ? b.marginTop : w.css("marginTop")) + parseInt(b ? b.marginBottom : w.css("marginBottom")) + 2,
                                horiz: T.horiz + parseInt(b ? b.marginLeft : w.css("marginLeft")) + parseInt(b ? b.marginRight : w.css("marginRight")) + 2
                            };
                            document.body.removeChild(i),
                                this.sizeInfo = {
                                    liHeight: p,
                                    headerHeight: m,
                                    searchHeight: _,
                                    actionsHeight: g,
                                    doneButtonHeight: v,
                                    dividerHeight: y,
                                    menuPadding: T,
                                    menuExtras: x
                                }
                        }
                    },
                    setSize: function() {
                        if (this.findLis(),
                            this.liHeight(),
                        this.options.header && this.$menu.css("padding-top", 0),
                        this.options.size !== !1) {
                            var e, i, n, s, r, o, a, l, h = this, c = this.$menu, u = this.$menuInner, d = t(window), f = this.$newElement[0].offsetHeight, p = this.$newElement[0].offsetWidth, m = this.sizeInfo.liHeight, _ = this.sizeInfo.headerHeight, g = this.sizeInfo.searchHeight, v = this.sizeInfo.actionsHeight, y = this.sizeInfo.doneButtonHeight, b = this.sizeInfo.dividerHeight, w = this.sizeInfo.menuPadding, T = this.sizeInfo.menuExtras, x = this.options.hideDisabled ? ".disabled" : "", S = function() {
                                var e, i = h.$newElement.offset(), n = t(h.options.container);
                                h.options.container && !n.is("body") ? (e = n.offset(),
                                    e.top += parseInt(n.css("borderTopWidth")),
                                    e.left += parseInt(n.css("borderLeftWidth"))) : e = {
                                    top: 0,
                                    left: 0
                                };
                                var s = h.options.windowPadding;
                                r = i.top - e.top - d.scrollTop(),
                                    o = d.height() - r - f - e.top - s[2],
                                    a = i.left - e.left - d.scrollLeft(),
                                    l = d.width() - a - p - e.left - s[1],
                                    r -= s[0],
                                    a -= s[3]
                            };
                            if (S(),
                            "auto" === this.options.size) {
                                var C = function() {
                                    var d, f = function(e, i) {
                                        return function(n) {
                                            return i ? n.classList ? n.classList.contains(e) : t(n).hasClass(e) : !(n.classList ? n.classList.contains(e) : t(n).hasClass(e))
                                        }
                                    }, b = h.$menuInner[0].getElementsByTagName("li"), x = Array.prototype.filter ? Array.prototype.filter.call(b, f("hidden", !1)) : h.$lis.not(".hidden"), C = Array.prototype.filter ? Array.prototype.filter.call(x, f("dropdown-header", !0)) : x.filter(".dropdown-header");
                                    S(),
                                        e = o - T.vert,
                                        i = l - T.horiz,
                                        h.options.container ? (c.data("height") || c.data("height", c.height()),
                                            n = c.data("height"),
                                        c.data("width") || c.data("width", c.width()),
                                            s = c.data("width")) : (n = c.height(),
                                            s = c.width()),
                                    h.options.dropupAuto && h.$newElement.toggleClass("dropup", r > o && e - T.vert < n),
                                    h.$newElement.hasClass("dropup") && (e = r - T.vert),
                                    "auto" === h.options.dropdownAlignRight && c.toggleClass("dropdown-menu-right", a > l && i - T.horiz < s - p),
                                        d = x.length + C.length > 3 ? 3 * m + T.vert - 2 : 0,
                                        c.css({
                                            "max-height": e + "px",
                                            overflow: "hidden",
                                            "min-height": d + _ + g + v + y + "px"
                                        }),
                                        u.css({
                                            "max-height": e - _ - g - v - y - w.vert + "px",
                                            "overflow-y": "auto",
                                            "min-height": Math.max(d - w.vert, 0) + "px"
                                        })
                                };
                                C(),
                                    this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", C),
                                    d.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", C)
                            } else if (this.options.size && "auto" != this.options.size && this.$lis.not(x).length > this.options.size) {
                                var L = this.$lis.not(".divider").not(x).children().slice(0, this.options.size).last().parent().index()
                                    , E = this.$lis.slice(0, L + 1).filter(".divider").length;
                                e = m * this.options.size + E * b + w.vert,
                                    h.options.container ? (c.data("height") || c.data("height", c.height()),
                                        n = c.data("height")) : n = c.height(),
                                h.options.dropupAuto && this.$newElement.toggleClass("dropup", r > o && e - T.vert < n),
                                    c.css({
                                        "max-height": e + _ + g + v + y + "px",
                                        overflow: "hidden",
                                        "min-height": ""
                                    }),
                                    u.css({
                                        "max-height": e - w.vert + "px",
                                        "overflow-y": "auto",
                                        "min-height": ""
                                    })
                            }
                        }
                    },
                    setWidth: function() {
                        if ("auto" === this.options.width) {
                            this.$menu.css("min-width", "0");
                            var t = this.$menu.parent().clone().appendTo("body")
                                , e = this.options.container ? this.$newElement.clone().appendTo("body") : t
                                , i = t.children(".dropdown-menu").outerWidth()
                                , n = e.css("width", "auto").children("button").outerWidth();
                            t.remove(),
                                e.remove(),
                                this.$newElement.css("width", Math.max(i, n) + "px")
                        } else
                            "fit" === this.options.width ? (this.$menu.css("min-width", ""),
                                this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""),
                                this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""),
                                this.$newElement.css("width", ""));
                        this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
                    },
                    selectPosition: function() {
                        this.$bsContainer = t('<div class="bs-container" />');
                        var e, i, n, s = this, r = t(this.options.container), o = function(t) {
                            s.$bsContainer.addClass(t.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", t.hasClass("dropup")),
                                e = t.offset(),
                                r.is("body") ? i = {
                                    top: 0,
                                    left: 0
                                } : (i = r.offset(),
                                    i.top += parseInt(r.css("borderTopWidth")) - r.scrollTop(),
                                    i.left += parseInt(r.css("borderLeftWidth")) - r.scrollLeft()),
                                n = t.hasClass("dropup") ? 0 : t[0].offsetHeight,
                                s.$bsContainer.css({
                                    top: e.top - i.top + n,
                                    left: e.left - i.left,
                                    width: t[0].offsetWidth
                                })
                        };
                        this.$button.on("click", function() {
                            var e = t(this);
                            s.isDisabled() || (o(s.$newElement),
                                s.$bsContainer.appendTo(s.options.container).toggleClass("open", !e.hasClass("open")).append(s.$menu))
                        }),
                            t(window).on("resize scroll", function() {
                                o(s.$newElement)
                            }),
                            this.$element.on("hide.bs.select", function() {
                                s.$menu.data("height", s.$menu.height()),
                                    s.$bsContainer.detach()
                            })
                    },
                    setSelected: function(t, e, i) {
                        i || (this.togglePlaceholder(),
                            i = this.findLis().eq(this.liObj[t])),
                            i.toggleClass("selected", e).find("a").attr("aria-selected", e)
                    },
                    setDisabled: function(t, e, i) {
                        i || (i = this.findLis().eq(this.liObj[t])),
                            e ? i.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : i.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1)
                    },
                    isDisabled: function() {
                        return this.$element[0].disabled
                    },
                    checkDisabled: function() {
                        var t = this;
                        this.isDisabled() ? (this.$newElement.addClass("disabled"),
                            this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"),
                            this.$button.removeClass("disabled").attr("aria-disabled", !1)),
                        this.$button.attr("tabindex") != -1 || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")),
                            this.$button.click(function() {
                                return !t.isDisabled()
                            })
                    },
                    togglePlaceholder: function() {
                        var t = this.$element.val();
                        this.$button.toggleClass("bs-placeholder", null === t || "" === t || t.constructor === Array && 0 === t.length)
                    },
                    tabIndex: function() {
                        this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")),
                            this.$button.attr("tabindex", this.$element.data("tabindex"))),
                            this.$element.attr("tabindex", -98)
                    },
                    clickListener: function() {
                        var e = this
                            , i = t(document);
                        i.data("spaceSelect", !1),
                            this.$button.on("keyup", function(t) {
                                /(32)/.test(t.keyCode.toString(10)) && i.data("spaceSelect") && (t.preventDefault(),
                                    i.data("spaceSelect", !1))
                            }),
                            this.$button.on("click", function() {
                                e.setSize()
                            }),
                            this.$element.on("shown.bs.select", function() {
                                if (e.options.liveSearch || e.multiple) {
                                    if (!e.multiple) {
                                        var t = e.liObj[e.$element[0].selectedIndex];
                                        if ("number" != typeof t || e.options.size === !1)
                                            return;
                                        var i = e.$lis.eq(t)[0].offsetTop - e.$menuInner[0].offsetTop;
                                        i = i - e.$menuInner[0].offsetHeight / 2 + e.sizeInfo.liHeight / 2,
                                            e.$menuInner[0].scrollTop = i
                                    }
                                } else
                                    e.$menuInner.find(".selected a").focus()
                            }),
                            this.$menuInner.on("click", "li a", function(i) {
                                var n = t(this)
                                    , r = n.parent().data("originalIndex")
                                    , o = e.$element.val()
                                    , a = e.$element.prop("selectedIndex")
                                    , l = !0;
                                if (e.multiple && 1 !== e.options.maxOptions && i.stopPropagation(),
                                    i.preventDefault(),
                                !e.isDisabled() && !n.parent().hasClass("disabled")) {
                                    var h = e.$element.find("option")
                                        , c = h.eq(r)
                                        , u = c.prop("selected")
                                        , d = c.parent("optgroup")
                                        , f = e.options.maxOptions
                                        , p = d.data("maxOptions") || !1;
                                    if (e.multiple) {
                                        if (c.prop("selected", !u),
                                            e.setSelected(r, !u),
                                            n.blur(),
                                        f !== !1 || p !== !1) {
                                            var m = f < h.filter(":selected").length
                                                , _ = p < d.find("option:selected").length;
                                            if (f && m || p && _)
                                                if (f && 1 == f)
                                                    h.prop("selected", !1),
                                                        c.prop("selected", !0),
                                                        e.$menuInner.find(".selected").removeClass("selected"),
                                                        e.setSelected(r, !0);
                                                else if (p && 1 == p) {
                                                    d.find("option:selected").prop("selected", !1),
                                                        c.prop("selected", !0);
                                                    var g = n.parent().data("optgroup");
                                                    e.$menuInner.find('[data-optgroup="' + g + '"]').removeClass("selected"),
                                                        e.setSelected(r, !0)
                                                } else {
                                                    var v = "string" == typeof e.options.maxOptionsText ? [e.options.maxOptionsText, e.options.maxOptionsText] : e.options.maxOptionsText
                                                        , y = "function" == typeof v ? v(f, p) : v
                                                        , b = y[0].replace("{n}", f)
                                                        , w = y[1].replace("{n}", p)
                                                        , T = t('<div class="notify"></div>');
                                                    y[2] && (b = b.replace("{var}", y[2][f > 1 ? 0 : 1]),
                                                        w = w.replace("{var}", y[2][p > 1 ? 0 : 1])),
                                                        c.prop("selected", !1),
                                                        e.$menu.append(T),
                                                    f && m && (T.append(t("<div>" + b + "</div>")),
                                                        l = !1,
                                                        e.$element.trigger("maxReached.bs.select")),
                                                    p && _ && (T.append(t("<div>" + w + "</div>")),
                                                        l = !1,
                                                        e.$element.trigger("maxReachedGrp.bs.select")),
                                                        setTimeout(function() {
                                                            e.setSelected(r, !1)
                                                        }, 10),
                                                        T.delay(750).fadeOut(300, function() {
                                                            t(this).remove()
                                                        })
                                                }
                                        }
                                    } else
                                        h.prop("selected", !1),
                                            c.prop("selected", !0),
                                            e.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1),
                                            e.setSelected(r, !0);
                                    !e.multiple || e.multiple && 1 === e.options.maxOptions ? e.$button.focus() : e.options.liveSearch && e.$searchbox.focus(),
                                    l && (o != e.$element.val() && e.multiple || a != e.$element.prop("selectedIndex") && !e.multiple) && (s = [r, c.prop("selected"), u],
                                        e.$element.triggerNative("change"))
                                }
                            }),
                            this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(i) {
                                i.currentTarget == this && (i.preventDefault(),
                                    i.stopPropagation(),
                                    e.options.liveSearch && !t(i.target).hasClass("close") ? e.$searchbox.focus() : e.$button.focus())
                            }),
                            this.$menuInner.on("click", ".divider, .dropdown-header", function(t) {
                                t.preventDefault(),
                                    t.stopPropagation(),
                                    e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus()
                            }),
                            this.$menu.on("click", ".popover-title .close", function() {
                                e.$button.click()
                            }),
                            this.$searchbox.on("click", function(t) {
                                t.stopPropagation()
                            }),
                            this.$menu.on("click", ".actions-btn", function(i) {
                                e.options.liveSearch ? e.$searchbox.focus() : e.$button.focus(),
                                    i.preventDefault(),
                                    i.stopPropagation(),
                                    t(this).hasClass("bs-select-all") ? e.selectAll() : e.deselectAll()
                            }),
                            this.$element.change(function() {
                                e.render(!1),
                                    e.$element.trigger("changed.bs.select", s),
                                    s = null
                            })
                    },
                    liveSearchListener: function() {
                        var i = this
                            , n = t('<li class="no-results"></li>');
                        this.$button.on("click.dropdown.data-api", function() {
                            i.$menuInner.find(".active").removeClass("active"),
                            i.$searchbox.val() && (i.$searchbox.val(""),
                                i.$lis.not(".is-hidden").removeClass("hidden"),
                            n.parent().length && n.remove()),
                            i.multiple || i.$menuInner.find(".selected").addClass("active"),
                                setTimeout(function() {
                                    i.$searchbox.focus()
                                }, 10);
                        }),
                            this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(t) {
                                t.stopPropagation()
                            }),
                            this.$searchbox.on("input propertychange", function() {
                                if (i.$lis.not(".is-hidden").removeClass("hidden"),
                                    i.$lis.filter(".active").removeClass("active"),
                                    n.remove(),
                                    i.$searchbox.val()) {
                                    var s, r = i.$lis.not(".is-hidden, .divider, .dropdown-header");
                                    if (s = i.options.liveSearchNormalize ? r.find("a").not(":a" + i._searchStyle() + '("' + e(i.$searchbox.val()) + '")') : r.find("a").not(":" + i._searchStyle() + '("' + i.$searchbox.val() + '")'),
                                    s.length === r.length)
                                        n.html(i.options.noneResultsText.replace("{0}", '"' + l(i.$searchbox.val()) + '"')),
                                            i.$menuInner.append(n),
                                            i.$lis.addClass("hidden");
                                    else {
                                        s.parent().addClass("hidden");
                                        var o, a = i.$lis.not(".hidden");
                                        a.each(function(e) {
                                            var i = t(this);
                                            i.hasClass("divider") ? void 0 === o ? i.addClass("hidden") : (o && o.addClass("hidden"),
                                                o = i) : i.hasClass("dropdown-header") && a.eq(e + 1).data("optgroup") !== i.data("optgroup") ? i.addClass("hidden") : o = null
                                        }),
                                        o && o.addClass("hidden"),
                                            r.not(".hidden").first().addClass("active")
                                    }
                                }
                            })
                    },
                    _searchStyle: function() {
                        var t = {
                            begins: "ibegins",
                            startsWith: "ibegins"
                        };
                        return t[this.options.liveSearchStyle] || "icontains"
                    },
                    val: function(t) {
                        return "undefined" != typeof t ? (this.$element.val(t),
                            this.render(),
                            this.$element) : this.$element.val()
                    },
                    changeAll: function(e) {
                        if (this.multiple) {
                            "undefined" == typeof e && (e = !0),
                                this.findLis();
                            var i = this.$element.find("option")
                                , n = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden")
                                , s = n.length
                                , r = [];
                            if (e) {
                                if (n.filter(".selected").length === n.length)
                                    return
                            } else if (0 === n.filter(".selected").length)
                                return;
                            n.toggleClass("selected", e);
                            for (var o = 0; o < s; o++) {
                                var a = n[o].getAttribute("data-original-index");
                                r[r.length] = i.eq(a)[0]
                            }
                            t(r).prop("selected", e),
                                this.render(!1),
                                this.togglePlaceholder(),
                                this.$element.triggerNative("change")
                        }
                    },
                    selectAll: function() {
                        return this.changeAll(!0)
                    },
                    deselectAll: function() {
                        return this.changeAll(!1)
                    },
                    toggle: function(t) {
                        t = t || window.event,
                        t && t.stopPropagation(),
                            this.$button.trigger("click")
                    },
                    keydown: function(i) {
                        var n, s, r, o, a, l, h, c, u, d = t(this), f = d.is("input") ? d.parent().parent() : d.parent(), p = f.data("this"), m = ":not(.disabled, .hidden, .dropdown-header, .divider)", _ = {
                            32: " ",
                            48: "0",
                            49: "1",
                            50: "2",
                            51: "3",
                            52: "4",
                            53: "5",
                            54: "6",
                            55: "7",
                            56: "8",
                            57: "9",
                            59: ";",
                            65: "a",
                            66: "b",
                            67: "c",
                            68: "d",
                            69: "e",
                            70: "f",
                            71: "g",
                            72: "h",
                            73: "i",
                            74: "j",
                            75: "k",
                            76: "l",
                            77: "m",
                            78: "n",
                            79: "o",
                            80: "p",
                            81: "q",
                            82: "r",
                            83: "s",
                            84: "t",
                            85: "u",
                            86: "v",
                            87: "w",
                            88: "x",
                            89: "y",
                            90: "z",
                            96: "0",
                            97: "1",
                            98: "2",
                            99: "3",
                            100: "4",
                            101: "5",
                            102: "6",
                            103: "7",
                            104: "8",
                            105: "9"
                        };
                        if (p.options.liveSearch && (f = d.parent().parent()),
                        p.options.container && (f = p.$menu),
                            n = t('[role="listbox"] li', f),
                            u = p.$newElement.hasClass("open"),
                        !u && (i.keyCode >= 48 && i.keyCode <= 57 || i.keyCode >= 96 && i.keyCode <= 105 || i.keyCode >= 65 && i.keyCode <= 90))
                            return p.options.container ? p.$button.trigger("click") : (p.setSize(),
                                p.$menu.parent().addClass("open"),
                                u = !0),
                                void p.$searchbox.focus();
                        if (p.options.liveSearch && (/(^9$|27)/.test(i.keyCode.toString(10)) && u && (i.preventDefault(),
                            i.stopPropagation(),
                            p.$menuInner.click(),
                            p.$button.focus()),
                            n = t('[role="listbox"] li' + m, f),
                        d.val() || /(38|40)/.test(i.keyCode.toString(10)) || 0 === n.filter(".active").length && (n = p.$menuInner.find("li"),
                            n = p.options.liveSearchNormalize ? n.filter(":a" + p._searchStyle() + "(" + e(_[i.keyCode]) + ")") : n.filter(":" + p._searchStyle() + "(" + _[i.keyCode] + ")"))),
                            n.length) {
                            if (/(38|40)/.test(i.keyCode.toString(10)))
                                s = n.index(n.find("a").filter(":focus").parent()),
                                    o = n.filter(m).first().index(),
                                    a = n.filter(m).last().index(),
                                    r = n.eq(s).nextAll(m).eq(0).index(),
                                    l = n.eq(s).prevAll(m).eq(0).index(),
                                    h = n.eq(r).prevAll(m).eq(0).index(),
                                p.options.liveSearch && (n.each(function(e) {
                                    t(this).hasClass("disabled") || t(this).data("index", e)
                                }),
                                    s = n.index(n.filter(".active")),
                                    o = n.first().data("index"),
                                    a = n.last().data("index"),
                                    r = n.eq(s).nextAll().eq(0).data("index"),
                                    l = n.eq(s).prevAll().eq(0).data("index"),
                                    h = n.eq(r).prevAll().eq(0).data("index")),
                                    c = d.data("prevIndex"),
                                    38 == i.keyCode ? (p.options.liveSearch && s--,
                                    s != h && s > l && (s = l),
                                    s < o && (s = o),
                                    s == c && (s = a)) : 40 == i.keyCode && (p.options.liveSearch && s++,
                                    s == -1 && (s = 0),
                                    s != h && s < r && (s = r),
                                    s > a && (s = a),
                                    s == c && (s = o)),
                                    d.data("prevIndex", s),
                                    p.options.liveSearch ? (i.preventDefault(),
                                    d.hasClass("dropdown-toggle") || (n.removeClass("active").eq(s).addClass("active").children("a").focus(),
                                        d.focus())) : n.eq(s).children("a").focus();
                            else if (!d.is("input")) {
                                var g, v, y = [];
                                n.each(function() {
                                    t(this).hasClass("disabled") || t.trim(t(this).children("a").text().toLowerCase()).substring(0, 1) == _[i.keyCode] && y.push(t(this).index())
                                }),
                                    g = t(document).data("keycount"),
                                    g++,
                                    t(document).data("keycount", g),
                                    v = t.trim(t(":focus").text().toLowerCase()).substring(0, 1),
                                    v != _[i.keyCode] ? (g = 1,
                                        t(document).data("keycount", g)) : g >= y.length && (t(document).data("keycount", 0),
                                    g > y.length && (g = 1)),
                                    n.eq(y[g - 1]).children("a").focus()
                            }
                            if ((/(13|32)/.test(i.keyCode.toString(10)) || /(^9$)/.test(i.keyCode.toString(10)) && p.options.selectOnTab) && u) {
                                if (/(32)/.test(i.keyCode.toString(10)) || i.preventDefault(),
                                    p.options.liveSearch)
                                    /(32)/.test(i.keyCode.toString(10)) || (p.$menuInner.find(".active a").click(),
                                        d.focus());
                                else {
                                    var b = t(":focus");
                                    b.click(),
                                        b.focus(),
                                        i.preventDefault(),
                                        t(document).data("spaceSelect", !0)
                                }
                                t(document).data("keycount", 0)
                            }
                            (/(^9$|27)/.test(i.keyCode.toString(10)) && u && (p.multiple || p.options.liveSearch) || /(27)/.test(i.keyCode.toString(10)) && !u) && (p.$menu.parent().removeClass("open"),
                            p.options.container && p.$newElement.removeClass("open"),
                                p.$button.focus())
                        }
                    },
                    mobile: function() {
                        this.$element.addClass("mobile-device")
                    },
                    refresh: function() {
                        this.$lis = null,
                            this.liObj = {},
                            this.reloadLi(),
                            this.render(),
                            this.checkDisabled(),
                            this.liHeight(!0),
                            this.setStyle(),
                            this.setWidth(),
                        this.$lis && this.$searchbox.trigger("propertychange"),
                            this.$element.trigger("refreshed.bs.select")
                    },
                    hide: function() {
                        this.$newElement.hide()
                    },
                    show: function() {
                        this.$newElement.show()
                    },
                    remove: function() {
                        this.$newElement.remove(),
                            this.$element.remove()
                    },
                    destroy: function() {
                        this.$newElement.before(this.$element).remove(),
                            this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(),
                            this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
                    }
                };
            var u = t.fn.selectpicker;
            t.fn.selectpicker = i,
                t.fn.selectpicker.Constructor = c,
                t.fn.selectpicker.noConflict = function() {
                    return t.fn.selectpicker = u,
                        this
                }
                ,
                t(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', c.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function(t) {
                    t.stopPropagation()
                }),
                t(window).on("load.bs.select.data-api", function() {
                    t(".selectpicker").each(function() {
                        var e = t(this);
                        i.call(e, e.data())
                    })
                })
        }(t)
    }),
    function(t, e) {
        "use strict";
        function i(t) {
            this.time = t.time,
                this.rootBounds = t.rootBounds,
                this.boundingClientRect = t.boundingClientRect,
                this.intersectionRect = t.intersectionRect,
                this.target = t.target;
            var e = this.boundingClientRect
                , i = e.width * e.height
                , n = this.intersectionRect
                , s = n.width * n.height;
            this.intersectionRatio = i ? s / i : 0
        }
        function n(t, e) {
            var i = e || {};
            if ("function" != typeof t)
                throw new Error("callback must be a function");
            if (i.root && 1 != i.root.nodeType)
                throw new Error("root must be an Element");
            this._checkForIntersections = r(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT),
                this._callback = t,
                this._observationTargets = [],
                this._queuedEntries = [],
                this._rootMarginValues = this._parseRootMargin(i.rootMargin),
                this.thresholds = this._initThresholds(i.threshold),
                this.root = i.root || null,
                this.rootMargin = this._rootMarginValues.map(function(t) {
                    return t.value + t.unit
                }).join(" ")
        }
        function s() {
            return t.performance && performance.now && performance.now()
        }
        function r(t, e) {
            var i = null;
            return function() {
                i || (i = setTimeout(function() {
                    t(),
                        i = null
                }, e))
            }
        }
        function o(t, e, i, n) {
            "function" == typeof t.addEventListener ? t.addEventListener(e, i, n || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, i)
        }
        function a(t, e, i, n) {
            "function" == typeof t.removeEventListener ? t.removeEventListener(e, i, n || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, i)
        }
        function l(t, e) {
            var i = Math.max(t.top, e.top)
                , n = Math.min(t.bottom, e.bottom)
                , s = Math.max(t.left, e.left)
                , r = Math.min(t.right, e.right)
                , o = r - s
                , a = n - i;
            return o < 0 || a < 0 ? u() : {
                top: i,
                bottom: n,
                left: s,
                right: r,
                width: o,
                height: a
            }
        }
        function h(t) {
            return t.top > 0 || t.bottom > 0 || t.left > 0 || t.right > 0
        }
        function c(t) {
            var e = t.getBoundingClientRect();
            if (e)
                return e.width && e.height || (e = {
                    top: e.top,
                    right: e.right,
                    bottom: e.bottom,
                    left: e.left,
                    width: e.right - e.left,
                    height: e.bottom - e.top
                }),
                    e
        }
        function u() {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }
        }
        if (!("IntersectionObserver"in t && "IntersectionObserverEntry"in t && "intersectionRatio"in t.IntersectionObserverEntry.prototype)) {
            var d = e.documentElement
                , f = [];
            n.prototype.THROTTLE_TIMEOUT = 100,
                n.prototype.POLL_INTERVAL = null,
                n.prototype.observe = function(t) {
                    if (!this._observationTargets.some(function(e) {
                        return e.element == t
                    })) {
                        if (!t || 1 != t.nodeType)
                            throw new Error("target must be an Element");
                        this._registerInstance(),
                            this._observationTargets.push({
                                element: t,
                                entry: null
                            }),
                            this._monitorIntersections()
                    }
                }
                ,
                n.prototype.unobserve = function(t) {
                    this._observationTargets = this._observationTargets.filter(function(e) {
                        return e.element != t
                    }),
                    this._observationTargets.length || (this._unmonitorIntersections(),
                        this._unregisterInstance())
                }
                ,
                n.prototype.disconnect = function() {
                    this._observationTargets = [],
                        this._unmonitorIntersections(),
                        this._unregisterInstance()
                }
                ,
                n.prototype.takeRecords = function() {
                    var t = this._queuedEntries.slice();
                    return this._queuedEntries = [],
                        t
                }
                ,
                n.prototype._initThresholds = function(t) {
                    var e = t || [0];
                    return Array.isArray(e) || (e = [e]),
                        e.sort().filter(function(t, e, i) {
                            if ("number" != typeof t || isNaN(t) || t < 0 || t > 1)
                                throw new Error("threshold must be a number between 0 and 1 inclusively");
                            return t !== i[e - 1]
                        })
                }
                ,
                n.prototype._parseRootMargin = function(t) {
                    var e = t || "0px"
                        , i = e.split(/\s+/).map(function(t) {
                        var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                        if (!e)
                            throw new Error("rootMargin must be specified in pixels or percent");
                        return {
                            value: parseFloat(e[1]),
                            unit: e[2]
                        }
                    });
                    return i[1] = i[1] || i[0],
                        i[2] = i[2] || i[0],
                        i[3] = i[3] || i[1],
                        i
                }
                ,
                n.prototype._monitorIntersections = function() {
                    this._monitoringIntersections || (this._monitoringIntersections = !0,
                        this._checkForIntersections(),
                        this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (o(t, "resize", this._checkForIntersections, !0),
                            o(e, "scroll", this._checkForIntersections, !0),
                        "MutationObserver"in t && (this._domObserver = new MutationObserver(this._checkForIntersections),
                            this._domObserver.observe(e, {
                                attributes: !0,
                                childList: !0,
                                characterData: !0,
                                subtree: !0
                            }))))
                }
                ,
                n.prototype._unmonitorIntersections = function() {
                    this._monitoringIntersections && (this._monitoringIntersections = !1,
                        clearInterval(this._monitoringInterval),
                        this._monitoringInterval = null,
                        a(t, "resize", this._checkForIntersections, !0),
                        a(e, "scroll", this._checkForIntersections, !0),
                    this._domObserver && (this._domObserver.disconnect(),
                        this._domObserver = null))
                }
                ,
                n.prototype._checkForIntersections = function() {
                    var t = this._rootIsInDom()
                        , e = t ? this._getRootRect() : u();
                    this._observationTargets.forEach(function(n) {
                        var r = n.element
                            , o = c(r)
                            , a = this._rootContainsTarget(r)
                            , l = n.entry
                            , d = n.entry = new i({
                            time: s(),
                            target: r,
                            boundingClientRect: o,
                            rootBounds: e,
                            intersectionRect: t && a ? this._computeTargetAndRootIntersection(r, e) : u()
                        });
                        t && a ? this._hasCrossedThreshold(l, d) && this._queuedEntries.push(d) : l && h(l.intersectionRect) && this._queuedEntries.push(d)
                    }, this),
                    this._queuedEntries.length && this._callback(this.takeRecords(), this)
                }
                ,
                n.prototype._computeTargetAndRootIntersection = function(e, i) {
                    for (var n = c(e), s = n, r = e.parentNode, o = !1; !o; ) {
                        var a = null;
                        if (r == this.root || 1 != r.nodeType)
                            o = !0,
                                a = i;
                        else {
                            var u = t.getComputedStyle(r);
                            "visible" != u.overflow && (a = c(r))
                        }
                        if (a && (s = l(a, s),
                            !h(s)))
                            break;
                        r = r.parentNode
                    }
                    return s
                }
                ,
                n.prototype._getRootRect = function() {
                    var t;
                    if (this.root)
                        t = c(this.root);
                    else {
                        var i = e.documentElement
                            , n = e.body;
                        t = {
                            top: 0,
                            left: 0,
                            right: i.clientWidth || n.clientWidth,
                            width: i.clientWidth || n.clientWidth,
                            bottom: i.clientHeight || n.clientHeight,
                            height: i.clientHeight || n.clientHeight
                        }
                    }
                    return this._expandRectByRootMargin(t)
                }
                ,
                n.prototype._expandRectByRootMargin = function(t) {
                    var e = this._rootMarginValues.map(function(e, i) {
                        return "px" == e.unit ? e.value : e.value * (i % 2 ? t.width : t.height) / 100
                    })
                        , i = {
                        top: t.top - e[0],
                        right: t.right + e[1],
                        bottom: t.bottom + e[2],
                        left: t.left - e[3]
                    };
                    return i.width = i.right - i.left,
                        i.height = i.bottom - i.top,
                        i
                }
                ,
                n.prototype._hasCrossedThreshold = function(t, e) {
                    var i = t && h(t.intersectionRect) ? t.intersectionRatio || 0 : -1
                        , n = h(e.intersectionRect) ? e.intersectionRatio || 0 : -1;
                    if (i !== n)
                        for (var s = 0; s < this.thresholds.length; s++) {
                            var r = this.thresholds[s];
                            if (r == i || r == n || r < i != r < n)
                                return !0
                        }
                }
                ,
                n.prototype._rootIsInDom = function() {
                    return !this.root || d.contains(this.root)
                }
                ,
                n.prototype._rootContainsTarget = function(t) {
                    return (this.root || d).contains(t)
                }
                ,
                n.prototype._registerInstance = function() {
                    f.indexOf(this) < 0 && f.push(this)
                }
                ,
                n.prototype._unregisterInstance = function() {
                    var t = f.indexOf(this);
                    t != -1 && f.splice(t, 1)
                }
                ,
                t.IntersectionObserver = n,
                t.IntersectionObserverEntry = i
        }
    }(window, document),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.moment = e()
    }(this, function() {
        "use strict";
        function t() {
            return yn.apply(null, arguments)
        }
        function e(t) {
            yn = t
        }
        function i(t) {
            return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t)
        }
        function n(t) {
            return null != t && "[object Object]" === Object.prototype.toString.call(t)
        }
        function s(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        }
        function r(t) {
            return void 0 === t
        }
        function o(t) {
            return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t)
        }
        function a(t) {
            return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t)
        }
        function l(t, e) {
            var i, n = [];
            for (i = 0; i < t.length; ++i)
                n.push(e(t[i], i));
            return n
        }
        function h(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        function c(t, e) {
            for (var i in e)
                h(e, i) && (t[i] = e[i]);
            return h(e, "toString") && (t.toString = e.toString),
            h(e, "valueOf") && (t.valueOf = e.valueOf),
                t
        }
        function u(t, e, i, n) {
            return ve(t, e, i, n, !0).utc()
        }
        function d() {
            return {
                empty: !1,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: !1,
                invalidMonth: null,
                invalidFormat: !1,
                userInvalidated: !1,
                iso: !1,
                parsedDateParts: [],
                meridiem: null,
                rfc2822: !1,
                weekdayMismatch: !1
            }
        }
        function f(t) {
            return null == t._pf && (t._pf = d()),
                t._pf
        }
        function p(t) {
            if (null == t._isValid) {
                var e = f(t)
                    , i = wn.call(e.parsedDateParts, function(t) {
                    return null != t
                })
                    , n = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && i);
                if (t._strict && (n = n && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour),
                null != Object.isFrozen && Object.isFrozen(t))
                    return n;
                t._isValid = n
            }
            return t._isValid
        }
        function m(t) {
            var e = u(NaN);
            return null != t ? c(f(e), t) : f(e).userInvalidated = !0,
                e
        }
        function _(t, e) {
            var i, n, s;
            if (r(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject),
            r(e._i) || (t._i = e._i),
            r(e._f) || (t._f = e._f),
            r(e._l) || (t._l = e._l),
            r(e._strict) || (t._strict = e._strict),
            r(e._tzm) || (t._tzm = e._tzm),
            r(e._isUTC) || (t._isUTC = e._isUTC),
            r(e._offset) || (t._offset = e._offset),
            r(e._pf) || (t._pf = f(e)),
            r(e._locale) || (t._locale = e._locale),
            Tn.length > 0)
                for (i = 0; i < Tn.length; i++)
                    n = Tn[i],
                        s = e[n],
                    r(s) || (t[n] = s);
            return t
        }
        function g(e) {
            _(this, e),
                this._d = new Date(null != e._d ? e._d.getTime() : NaN),
            this.isValid() || (this._d = new Date(NaN)),
            xn === !1 && (xn = !0,
                t.updateOffset(this),
                xn = !1)
        }
        function v(t) {
            return t instanceof g || null != t && null != t._isAMomentObject
        }
        function y(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
        }
        function b(t) {
            var e = +t
                , i = 0;
            return 0 !== e && isFinite(e) && (i = y(e)),
                i
        }
        function w(t, e, i) {
            var n, s = Math.min(t.length, e.length), r = Math.abs(t.length - e.length), o = 0;
            for (n = 0; n < s; n++)
                (i && t[n] !== e[n] || !i && b(t[n]) !== b(e[n])) && o++;
            return o + r
        }
        function T(e) {
            t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
        }
        function x(e, i) {
            var n = !0;
            return c(function() {
                if (null != t.deprecationHandler && t.deprecationHandler(null, e),
                    n) {
                    for (var s, r = [], o = 0; o < arguments.length; o++) {
                        if (s = "",
                        "object" == typeof arguments[o]) {
                            s += "\n[" + o + "] ";
                            for (var a in arguments[0])
                                s += a + ": " + arguments[0][a] + ", ";
                            s = s.slice(0, -2)
                        } else
                            s = arguments[o];
                        r.push(s)
                    }
                    T(e + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + (new Error).stack),
                        n = !1
                }
                return i.apply(this, arguments)
            }, i)
        }
        function S(e, i) {
            null != t.deprecationHandler && t.deprecationHandler(e, i),
            Sn[e] || (T(i),
                Sn[e] = !0)
        }
        function C(t) {
            return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t)
        }
        function L(t) {
            var e, i;
            for (i in t)
                e = t[i],
                    C(e) ? this[i] = e : this["_" + i] = e;
            this._config = t,
                this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
        }
        function E(t, e) {
            var i, s = c({}, t);
            for (i in e)
                h(e, i) && (n(t[i]) && n(e[i]) ? (s[i] = {},
                    c(s[i], t[i]),
                    c(s[i], e[i])) : null != e[i] ? s[i] = e[i] : delete s[i]);
            for (i in t)
                h(t, i) && !h(e, i) && n(t[i]) && (s[i] = c({}, s[i]));
            return s
        }
        function k(t) {
            null != t && this.set(t)
        }
        function P(t, e, i) {
            var n = this._calendar[t] || this._calendar.sameElse;
            return C(n) ? n.call(e, i) : n
        }
        function A(t) {
            var e = this._longDateFormat[t]
                , i = this._longDateFormat[t.toUpperCase()];
            return e || !i ? e : (this._longDateFormat[t] = i.replace(/MMMM|MM|DD|dddd/g, function(t) {
                return t.slice(1)
            }),
                this._longDateFormat[t])
        }
        function O() {
            return this._invalidDate
        }
        function N(t) {
            return this._ordinal.replace("%d", t)
        }
        function $(t, e, i, n) {
            var s = this._relativeTime[i];
            return C(s) ? s(t, e, i, n) : s.replace(/%d/i, t)
        }
        function D(t, e) {
            var i = this._relativeTime[t > 0 ? "future" : "past"];
            return C(i) ? i(e) : i.replace(/%s/i, e)
        }
        function M(t, e) {
            var i = t.toLowerCase();
            Dn[i] = Dn[i + "s"] = Dn[e] = t
        }
        function R(t) {
            return "string" == typeof t ? Dn[t] || Dn[t.toLowerCase()] : void 0
        }
        function I(t) {
            var e, i, n = {};
            for (i in t)
                h(t, i) && (e = R(i),
                e && (n[e] = t[i]));
            return n
        }
        function j(t, e) {
            Mn[t] = e
        }
        function F(t) {
            var e = [];
            for (var i in t)
                e.push({
                    unit: i,
                    priority: Mn[i]
                });
            return e.sort(function(t, e) {
                return t.priority - e.priority
            }),
                e
        }
        function H(e, i) {
            return function(n) {
                return null != n ? (Y(this, e, n),
                    t.updateOffset(this, i),
                    this) : B(this, e)
            }
        }
        function B(t, e) {
            return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN
        }
        function Y(t, e, i) {
            t.isValid() && t._d["set" + (t._isUTC ? "UTC" : "") + e](i)
        }
        function V(t) {
            return t = R(t),
                C(this[t]) ? this[t]() : this
        }
        function U(t, e) {
            if ("object" == typeof t) {
                t = I(t);
                for (var i = F(t), n = 0; n < i.length; n++)
                    this[i[n].unit](t[i[n].unit])
            } else if (t = R(t),
                C(this[t]))
                return this[t](e);
            return this
        }
        function q(t, e, i) {
            var n = "" + Math.abs(t)
                , s = e - n.length
                , r = t >= 0;
            return (r ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + n
        }
        function z(t, e, i, n) {
            var s = n;
            "string" == typeof n && (s = function() {
                    return this[n]()
                }
            ),
            t && (Fn[t] = s),
            e && (Fn[e[0]] = function() {
                    return q(s.apply(this, arguments), e[1], e[2])
                }
            ),
            i && (Fn[i] = function() {
                    return this.localeData().ordinal(s.apply(this, arguments), t)
                }
            )
        }
        function W(t) {
            return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "")
        }
        function X(t) {
            var e, i, n = t.match(Rn);
            for (e = 0,
                     i = n.length; e < i; e++)
                Fn[n[e]] ? n[e] = Fn[n[e]] : n[e] = W(n[e]);
            return function(e) {
                var s, r = "";
                for (s = 0; s < i; s++)
                    r += C(n[s]) ? n[s].call(e, t) : n[s];
                return r
            }
        }
        function G(t, e) {
            return t.isValid() ? (e = J(e, t.localeData()),
                jn[e] = jn[e] || X(e),
                jn[e](t)) : t.localeData().invalidDate()
        }
        function J(t, e) {
            function i(t) {
                return e.longDateFormat(t) || t
            }
            var n = 5;
            for (In.lastIndex = 0; n >= 0 && In.test(t); )
                t = t.replace(In, i),
                    In.lastIndex = 0,
                    n -= 1;
            return t
        }
        function Q(t, e, i) {
            ns[t] = C(e) ? e : function(t, n) {
                return t && i ? i : e
            }
        }
        function Z(t, e) {
            return h(ns, t) ? ns[t](e._strict, e._locale) : new RegExp(K(t))
        }
        function K(t) {
            return tt(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, i, n, s) {
                return e || i || n || s
            }))
        }
        function tt(t) {
            return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
        }
        function et(t, e) {
            var i, n = e;
            for ("string" == typeof t && (t = [t]),
                 o(e) && (n = function(t, i) {
                         i[e] = b(t)
                     }
                 ),
                     i = 0; i < t.length; i++)
                ss[t[i]] = n
        }
        function it(t, e) {
            et(t, function(t, i, n, s) {
                n._w = n._w || {},
                    e(t, n._w, n, s)
            })
        }
        function nt(t, e, i) {
            null != e && h(ss, t) && ss[t](e, i._a, i, t)
        }
        function st(t, e) {
            return new Date(Date.UTC(t, e + 1, 0)).getUTCDate()
        }
        function rt(t, e) {
            return t ? i(this._months) ? this._months[t.month()] : this._months[(this._months.isFormat || ms).test(e) ? "format" : "standalone"][t.month()] : i(this._months) ? this._months : this._months.standalone
        }
        function ot(t, e) {
            return t ? i(this._monthsShort) ? this._monthsShort[t.month()] : this._monthsShort[ms.test(e) ? "format" : "standalone"][t.month()] : i(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
        }
        function at(t, e, i) {
            var n, s, r, o = t.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [],
                         this._longMonthsParse = [],
                         this._shortMonthsParse = [],
                         n = 0; n < 12; ++n)
                    r = u([2e3, n]),
                        this._shortMonthsParse[n] = this.monthsShort(r, "").toLocaleLowerCase(),
                        this._longMonthsParse[n] = this.months(r, "").toLocaleLowerCase();
            return i ? "MMM" === e ? (s = ps.call(this._shortMonthsParse, o),
                s !== -1 ? s : null) : (s = ps.call(this._longMonthsParse, o),
                s !== -1 ? s : null) : "MMM" === e ? (s = ps.call(this._shortMonthsParse, o),
                s !== -1 ? s : (s = ps.call(this._longMonthsParse, o),
                    s !== -1 ? s : null)) : (s = ps.call(this._longMonthsParse, o),
                s !== -1 ? s : (s = ps.call(this._shortMonthsParse, o),
                    s !== -1 ? s : null))
        }
        function lt(t, e, i) {
            var n, s, r;
            if (this._monthsParseExact)
                return at.call(this, t, e, i);
            for (this._monthsParse || (this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = []),
                     n = 0; n < 12; n++) {
                if (s = u([2e3, n]),
                i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(s, "").replace(".", "") + "$","i"),
                    this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$","i")),
                i || this._monthsParse[n] || (r = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""),
                    this._monthsParse[n] = new RegExp(r.replace(".", ""),"i")),
                i && "MMMM" === e && this._longMonthsParse[n].test(t))
                    return n;
                if (i && "MMM" === e && this._shortMonthsParse[n].test(t))
                    return n;
                if (!i && this._monthsParse[n].test(t))
                    return n
            }
        }
        function ht(t, e) {
            var i;
            if (!t.isValid())
                return t;
            if ("string" == typeof e)
                if (/^\d+$/.test(e))
                    e = b(e);
                else if (e = t.localeData().monthsParse(e),
                    !o(e))
                    return t;
            return i = Math.min(t.date(), st(t.year(), e)),
                t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i),
                t
        }
        function ct(e) {
            return null != e ? (ht(this, e),
                t.updateOffset(this, !0),
                this) : B(this, "Month")
        }
        function ut() {
            return st(this.year(), this.month())
        }
        function dt(t) {
            return this._monthsParseExact ? (h(this, "_monthsRegex") || pt.call(this),
                t ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = vs),
                this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex : this._monthsShortRegex)
        }
        function ft(t) {
            return this._monthsParseExact ? (h(this, "_monthsRegex") || pt.call(this),
                t ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = ys),
                this._monthsStrictRegex && t ? this._monthsStrictRegex : this._monthsRegex)
        }
        function pt() {
            function t(t, e) {
                return e.length - t.length
            }
            var e, i, n = [], s = [], r = [];
            for (e = 0; e < 12; e++)
                i = u([2e3, e]),
                    n.push(this.monthsShort(i, "")),
                    s.push(this.months(i, "")),
                    r.push(this.months(i, "")),
                    r.push(this.monthsShort(i, ""));
            for (n.sort(t),
                     s.sort(t),
                     r.sort(t),
                     e = 0; e < 12; e++)
                n[e] = tt(n[e]),
                    s[e] = tt(s[e]);
            for (e = 0; e < 24; e++)
                r[e] = tt(r[e]);
            this._monthsRegex = new RegExp("^(" + r.join("|") + ")","i"),
                this._monthsShortRegex = this._monthsRegex,
                this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")","i"),
                this._monthsShortStrictRegex = new RegExp("^(" + n.join("|") + ")","i")
        }
        function mt(t) {
            return _t(t) ? 366 : 365
        }
        function _t(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        }
        function gt() {
            return _t(this.year())
        }
        function vt(t, e, i, n, s, r, o) {
            var a = new Date(t,e,i,n,s,r,o);
            return t < 100 && t >= 0 && isFinite(a.getFullYear()) && a.setFullYear(t),
                a
        }
        function yt(t) {
            var e = new Date(Date.UTC.apply(null, arguments));
            return t < 100 && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t),
                e
        }
        function bt(t, e, i) {
            var n = 7 + e - i
                , s = (7 + yt(t, 0, n).getUTCDay() - e) % 7;
            return -s + n - 1
        }
        function wt(t, e, i, n, s) {
            var r, o, a = (7 + i - n) % 7, l = bt(t, n, s), h = 1 + 7 * (e - 1) + a + l;
            return h <= 0 ? (r = t - 1,
                o = mt(r) + h) : h > mt(t) ? (r = t + 1,
                o = h - mt(t)) : (r = t,
                o = h),
                {
                    year: r,
                    dayOfYear: o
                }
        }
        function Tt(t, e, i) {
            var n, s, r = bt(t.year(), e, i), o = Math.floor((t.dayOfYear() - r - 1) / 7) + 1;
            return o < 1 ? (s = t.year() - 1,
                n = o + xt(s, e, i)) : o > xt(t.year(), e, i) ? (n = o - xt(t.year(), e, i),
                s = t.year() + 1) : (s = t.year(),
                n = o),
                {
                    week: n,
                    year: s
                }
        }
        function xt(t, e, i) {
            var n = bt(t, e, i)
                , s = bt(t + 1, e, i);
            return (mt(t) - n + s) / 7
        }
        function St(t) {
            return Tt(t, this._week.dow, this._week.doy).week
        }
        function Ct() {
            return this._week.dow
        }
        function Lt() {
            return this._week.doy
        }
        function Et(t) {
            var e = this.localeData().week(this);
            return null == t ? e : this.add(7 * (t - e), "d")
        }
        function kt(t) {
            var e = Tt(this, 1, 4).week;
            return null == t ? e : this.add(7 * (t - e), "d")
        }
        function Pt(t, e) {
            return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t),
                "number" == typeof t ? t : null) : parseInt(t, 10)
        }
        function At(t, e) {
            return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t
        }
        function Ot(t, e) {
            return t ? i(this._weekdays) ? this._weekdays[t.day()] : this._weekdays[this._weekdays.isFormat.test(e) ? "format" : "standalone"][t.day()] : i(this._weekdays) ? this._weekdays : this._weekdays.standalone
        }
        function Nt(t) {
            return t ? this._weekdaysShort[t.day()] : this._weekdaysShort
        }
        function $t(t) {
            return t ? this._weekdaysMin[t.day()] : this._weekdaysMin
        }
        function Dt(t, e, i) {
            var n, s, r, o = t.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [],
                         this._shortWeekdaysParse = [],
                         this._minWeekdaysParse = [],
                         n = 0; n < 7; ++n)
                    r = u([2e3, 1]).day(n),
                        this._minWeekdaysParse[n] = this.weekdaysMin(r, "").toLocaleLowerCase(),
                        this._shortWeekdaysParse[n] = this.weekdaysShort(r, "").toLocaleLowerCase(),
                        this._weekdaysParse[n] = this.weekdays(r, "").toLocaleLowerCase();
            return i ? "dddd" === e ? (s = ps.call(this._weekdaysParse, o),
                s !== -1 ? s : null) : "ddd" === e ? (s = ps.call(this._shortWeekdaysParse, o),
                s !== -1 ? s : null) : (s = ps.call(this._minWeekdaysParse, o),
                s !== -1 ? s : null) : "dddd" === e ? (s = ps.call(this._weekdaysParse, o),
                s !== -1 ? s : (s = ps.call(this._shortWeekdaysParse, o),
                    s !== -1 ? s : (s = ps.call(this._minWeekdaysParse, o),
                        s !== -1 ? s : null))) : "ddd" === e ? (s = ps.call(this._shortWeekdaysParse, o),
                s !== -1 ? s : (s = ps.call(this._weekdaysParse, o),
                    s !== -1 ? s : (s = ps.call(this._minWeekdaysParse, o),
                        s !== -1 ? s : null))) : (s = ps.call(this._minWeekdaysParse, o),
                s !== -1 ? s : (s = ps.call(this._weekdaysParse, o),
                    s !== -1 ? s : (s = ps.call(this._shortWeekdaysParse, o),
                        s !== -1 ? s : null)))
        }
        function Mt(t, e, i) {
            var n, s, r;
            if (this._weekdaysParseExact)
                return Dt.call(this, t, e, i);
            for (this._weekdaysParse || (this._weekdaysParse = [],
                this._minWeekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._fullWeekdaysParse = []),
                     n = 0; n < 7; n++) {
                if (s = u([2e3, 1]).day(n),
                i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(s, "").replace(".", ".?") + "$","i"),
                    this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(s, "").replace(".", ".?") + "$","i"),
                    this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(s, "").replace(".", ".?") + "$","i")),
                this._weekdaysParse[n] || (r = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""),
                    this._weekdaysParse[n] = new RegExp(r.replace(".", ""),"i")),
                i && "dddd" === e && this._fullWeekdaysParse[n].test(t))
                    return n;
                if (i && "ddd" === e && this._shortWeekdaysParse[n].test(t))
                    return n;
                if (i && "dd" === e && this._minWeekdaysParse[n].test(t))
                    return n;
                if (!i && this._weekdaysParse[n].test(t))
                    return n
            }
        }
        function Rt(t) {
            if (!this.isValid())
                return null != t ? this : NaN;
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t ? (t = Pt(t, this.localeData()),
                this.add(t - e, "d")) : e
        }
        function It(t) {
            if (!this.isValid())
                return null != t ? this : NaN;
            var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == t ? e : this.add(t - e, "d")
        }
        function jt(t) {
            if (!this.isValid())
                return null != t ? this : NaN;
            if (null != t) {
                var e = At(t, this.localeData());
                return this.day(this.day() % 7 ? e : e - 7)
            }
            return this.day() || 7
        }
        function Ft(t) {
            return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Yt.call(this),
                t ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = Cs),
                this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex : this._weekdaysRegex)
        }
        function Ht(t) {
            return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Yt.call(this),
                t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Ls),
                this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        }
        function Bt(t) {
            return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || Yt.call(this),
                t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Es),
                this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        }
        function Yt() {
            function t(t, e) {
                return e.length - t.length
            }
            var e, i, n, s, r, o = [], a = [], l = [], h = [];
            for (e = 0; e < 7; e++)
                i = u([2e3, 1]).day(e),
                    n = this.weekdaysMin(i, ""),
                    s = this.weekdaysShort(i, ""),
                    r = this.weekdays(i, ""),
                    o.push(n),
                    a.push(s),
                    l.push(r),
                    h.push(n),
                    h.push(s),
                    h.push(r);
            for (o.sort(t),
                     a.sort(t),
                     l.sort(t),
                     h.sort(t),
                     e = 0; e < 7; e++)
                a[e] = tt(a[e]),
                    l[e] = tt(l[e]),
                    h[e] = tt(h[e]);
            this._weekdaysRegex = new RegExp("^(" + h.join("|") + ")","i"),
                this._weekdaysShortRegex = this._weekdaysRegex,
                this._weekdaysMinRegex = this._weekdaysRegex,
                this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")","i"),
                this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")","i"),
                this._weekdaysMinStrictRegex = new RegExp("^(" + o.join("|") + ")","i")
        }
        function Vt() {
            return this.hours() % 12 || 12
        }
        function Ut() {
            return this.hours() || 24
        }
        function qt(t, e) {
            z(t, 0, 0, function() {
                return this.localeData().meridiem(this.hours(), this.minutes(), e)
            })
        }
        function zt(t, e) {
            return e._meridiemParse
        }
        function Wt(t) {
            return "p" === (t + "").toLowerCase().charAt(0)
        }
        function Xt(t, e, i) {
            return t > 11 ? i ? "pm" : "PM" : i ? "am" : "AM"
        }
        function Gt(t) {
            return t ? t.toLowerCase().replace("_", "-") : t
        }
        function Jt(t) {
            for (var e, i, n, s, r = 0; r < t.length; ) {
                for (s = Gt(t[r]).split("-"),
                         e = s.length,
                         i = Gt(t[r + 1]),
                         i = i ? i.split("-") : null; e > 0; ) {
                    if (n = Qt(s.slice(0, e).join("-")))
                        return n;
                    if (i && i.length >= e && w(s, i, !0) >= e - 1)
                        break;
                    e--
                }
                r++
            }
            return null
        }
        function Qt(t) {
            var e = null;
            if (!Ns[t] && "undefined" != typeof module && module && module.exports)
                try {
                    e = ks._abbr,
                        require("./locale/" + t),
                        Zt(e)
                } catch (i) {}
            return Ns[t]
        }
        function Zt(t, e) {
            var i;
            return t && (i = r(e) ? ee(t) : Kt(t, e),
            i && (ks = i)),
                ks._abbr
        }
        function Kt(t, e) {
            if (null !== e) {
                var i = Os;
                if (e.abbr = t,
                null != Ns[t])
                    S("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
                        i = Ns[t]._config;
                else if (null != e.parentLocale) {
                    if (null == Ns[e.parentLocale])
                        return $s[e.parentLocale] || ($s[e.parentLocale] = []),
                            $s[e.parentLocale].push({
                                name: t,
                                config: e
                            }),
                            null;
                    i = Ns[e.parentLocale]._config
                }
                return Ns[t] = new k(E(i, e)),
                $s[t] && $s[t].forEach(function(t) {
                    Kt(t.name, t.config)
                }),
                    Zt(t),
                    Ns[t]
            }
            return delete Ns[t],
                null
        }
        function te(t, e) {
            if (null != e) {
                var i, n = Os;
                null != Ns[t] && (n = Ns[t]._config),
                    e = E(n, e),
                    i = new k(e),
                    i.parentLocale = Ns[t],
                    Ns[t] = i,
                    Zt(t)
            } else
                null != Ns[t] && (null != Ns[t].parentLocale ? Ns[t] = Ns[t].parentLocale : null != Ns[t] && delete Ns[t]);
            return Ns[t]
        }
        function ee(t) {
            var e;
            if (t && t._locale && t._locale._abbr && (t = t._locale._abbr),
                !t)
                return ks;
            if (!i(t)) {
                if (e = Qt(t))
                    return e;
                t = [t]
            }
            return Jt(t)
        }
        function ie() {
            return En(Ns)
        }
        function ne(t) {
            var e, i = t._a;
            return i && f(t).overflow === -2 && (e = i[os] < 0 || i[os] > 11 ? os : i[as] < 1 || i[as] > st(i[rs], i[os]) ? as : i[ls] < 0 || i[ls] > 24 || 24 === i[ls] && (0 !== i[hs] || 0 !== i[cs] || 0 !== i[us]) ? ls : i[hs] < 0 || i[hs] > 59 ? hs : i[cs] < 0 || i[cs] > 59 ? cs : i[us] < 0 || i[us] > 999 ? us : -1,
            f(t)._overflowDayOfYear && (e < rs || e > as) && (e = as),
            f(t)._overflowWeeks && e === -1 && (e = ds),
            f(t)._overflowWeekday && e === -1 && (e = fs),
                f(t).overflow = e),
                t
        }
        function se(t) {
            var e, i, n, s, r, o, a = t._i, l = Ds.exec(a) || Ms.exec(a);
            if (l) {
                for (f(t).iso = !0,
                         e = 0,
                         i = Is.length; e < i; e++)
                    if (Is[e][1].exec(l[1])) {
                        s = Is[e][0],
                            n = Is[e][2] !== !1;
                        break
                    }
                if (null == s)
                    return void (t._isValid = !1);
                if (l[3]) {
                    for (e = 0,
                             i = js.length; e < i; e++)
                        if (js[e][1].exec(l[3])) {
                            r = (l[2] || " ") + js[e][0];
                            break
                        }
                    if (null == r)
                        return void (t._isValid = !1)
                }
                if (!n && null != r)
                    return void (t._isValid = !1);
                if (l[4]) {
                    if (!Rs.exec(l[4]))
                        return void (t._isValid = !1);
                    o = "Z"
                }
                t._f = s + (r || "") + (o || ""),
                    ue(t)
            } else
                t._isValid = !1
        }
        function re(t) {
            var e, i, n, s, r, o, a, l, h = {
                " GMT": " +0000",
                " EDT": " -0400",
                " EST": " -0500",
                " CDT": " -0500",
                " CST": " -0600",
                " MDT": " -0600",
                " MST": " -0700",
                " PDT": " -0700",
                " PST": " -0800"
            }, c = "YXWVUTSRQPONZABCDEFGHIKLM";
            if (e = t._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""),
                i = Hs.exec(e)) {
                if (n = i[1] ? "ddd" + (5 === i[1].length ? ", " : " ") : "",
                    s = "D MMM " + (i[2].length > 10 ? "YYYY " : "YY "),
                    r = "HH:mm" + (i[4] ? ":ss" : ""),
                    i[1]) {
                    var u = new Date(i[2])
                        , d = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][u.getDay()];
                    if (i[1].substr(0, 3) !== d)
                        return f(t).weekdayMismatch = !0,
                            void (t._isValid = !1)
                }
                switch (i[5].length) {
                    case 2:
                        0 === l ? a = " +0000" : (l = c.indexOf(i[5][1].toUpperCase()) - 12,
                            a = (l < 0 ? " -" : " +") + ("" + l).replace(/^-?/, "0").match(/..$/)[0] + "00");
                        break;
                    case 4:
                        a = h[i[5]];
                        break;
                    default:
                        a = h[" GMT"]
                }
                i[5] = a,
                    t._i = i.splice(1).join(""),
                    o = " ZZ",
                    t._f = n + s + r + o,
                    ue(t),
                    f(t).rfc2822 = !0
            } else
                t._isValid = !1
        }
        function oe(e) {
            var i = Fs.exec(e._i);
            return null !== i ? void (e._d = new Date((+i[1]))) : (se(e),
                void (e._isValid === !1 && (delete e._isValid,
                    re(e),
                e._isValid === !1 && (delete e._isValid,
                    t.createFromInputFallback(e)))))
        }
        function ae(t, e, i) {
            return null != t ? t : null != e ? e : i
        }
        function le(e) {
            var i = new Date(t.now());
            return e._useUTC ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()] : [i.getFullYear(), i.getMonth(), i.getDate()]
        }
        function he(t) {
            var e, i, n, s, r = [];
            if (!t._d) {
                for (n = le(t),
                     t._w && null == t._a[as] && null == t._a[os] && ce(t),
                     null != t._dayOfYear && (s = ae(t._a[rs], n[rs]),
                     (t._dayOfYear > mt(s) || 0 === t._dayOfYear) && (f(t)._overflowDayOfYear = !0),
                         i = yt(s, 0, t._dayOfYear),
                         t._a[os] = i.getUTCMonth(),
                         t._a[as] = i.getUTCDate()),
                         e = 0; e < 3 && null == t._a[e]; ++e)
                    t._a[e] = r[e] = n[e];
                for (; e < 7; e++)
                    t._a[e] = r[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
                24 === t._a[ls] && 0 === t._a[hs] && 0 === t._a[cs] && 0 === t._a[us] && (t._nextDay = !0,
                    t._a[ls] = 0),
                    t._d = (t._useUTC ? yt : vt).apply(null, r),
                null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
                t._nextDay && (t._a[ls] = 24)
            }
        }
        function ce(t) {
            var e, i, n, s, r, o, a, l;
            if (e = t._w,
            null != e.GG || null != e.W || null != e.E)
                r = 1,
                    o = 4,
                    i = ae(e.GG, t._a[rs], Tt(ye(), 1, 4).year),
                    n = ae(e.W, 1),
                    s = ae(e.E, 1),
                (s < 1 || s > 7) && (l = !0);
            else {
                r = t._locale._week.dow,
                    o = t._locale._week.doy;
                var h = Tt(ye(), r, o);
                i = ae(e.gg, t._a[rs], h.year),
                    n = ae(e.w, h.week),
                    null != e.d ? (s = e.d,
                    (s < 0 || s > 6) && (l = !0)) : null != e.e ? (s = e.e + r,
                    (e.e < 0 || e.e > 6) && (l = !0)) : s = r
            }
            n < 1 || n > xt(i, r, o) ? f(t)._overflowWeeks = !0 : null != l ? f(t)._overflowWeekday = !0 : (a = wt(i, n, s, r, o),
                t._a[rs] = a.year,
                t._dayOfYear = a.dayOfYear)
        }
        function ue(e) {
            if (e._f === t.ISO_8601)
                return void se(e);
            if (e._f === t.RFC_2822)
                return void re(e);
            e._a = [],
                f(e).empty = !0;
            var i, n, s, r, o, a = "" + e._i, l = a.length, h = 0;
            for (s = J(e._f, e._locale).match(Rn) || [],
                     i = 0; i < s.length; i++)
                r = s[i],
                    n = (a.match(Z(r, e)) || [])[0],
                n && (o = a.substr(0, a.indexOf(n)),
                o.length > 0 && f(e).unusedInput.push(o),
                    a = a.slice(a.indexOf(n) + n.length),
                    h += n.length),
                    Fn[r] ? (n ? f(e).empty = !1 : f(e).unusedTokens.push(r),
                        nt(r, n, e)) : e._strict && !n && f(e).unusedTokens.push(r);
            f(e).charsLeftOver = l - h,
            a.length > 0 && f(e).unusedInput.push(a),
            e._a[ls] <= 12 && f(e).bigHour === !0 && e._a[ls] > 0 && (f(e).bigHour = void 0),
                f(e).parsedDateParts = e._a.slice(0),
                f(e).meridiem = e._meridiem,
                e._a[ls] = de(e._locale, e._a[ls], e._meridiem),
                he(e),
                ne(e)
        }
        function de(t, e, i) {
            var n;
            return null == i ? e : null != t.meridiemHour ? t.meridiemHour(e, i) : null != t.isPM ? (n = t.isPM(i),
            n && e < 12 && (e += 12),
            n || 12 !== e || (e = 0),
                e) : e
        }
        function fe(t) {
            var e, i, n, s, r;
            if (0 === t._f.length)
                return f(t).invalidFormat = !0,
                    void (t._d = new Date(NaN));
            for (s = 0; s < t._f.length; s++)
                r = 0,
                    e = _({}, t),
                null != t._useUTC && (e._useUTC = t._useUTC),
                    e._f = t._f[s],
                    ue(e),
                p(e) && (r += f(e).charsLeftOver,
                    r += 10 * f(e).unusedTokens.length,
                    f(e).score = r,
                (null == n || r < n) && (n = r,
                    i = e));
            c(t, i || e)
        }
        function pe(t) {
            if (!t._d) {
                var e = I(t._i);
                t._a = l([e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], function(t) {
                    return t && parseInt(t, 10)
                }),
                    he(t)
            }
        }
        function me(t) {
            var e = new g(ne(_e(t)));
            return e._nextDay && (e.add(1, "d"),
                e._nextDay = void 0),
                e
        }
        function _e(t) {
            var e = t._i
                , n = t._f;
            return t._locale = t._locale || ee(t._l),
                null === e || void 0 === n && "" === e ? m({
                    nullInput: !0
                }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)),
                    v(e) ? new g(ne(e)) : (a(e) ? t._d = e : i(n) ? fe(t) : n ? ue(t) : ge(t),
                    p(t) || (t._d = null),
                        t))
        }
        function ge(e) {
            var s = e._i;
            r(s) ? e._d = new Date(t.now()) : a(s) ? e._d = new Date(s.valueOf()) : "string" == typeof s ? oe(e) : i(s) ? (e._a = l(s.slice(0), function(t) {
                return parseInt(t, 10)
            }),
                he(e)) : n(s) ? pe(e) : o(s) ? e._d = new Date(s) : t.createFromInputFallback(e)
        }
        function ve(t, e, r, o, a) {
            var l = {};
            return r !== !0 && r !== !1 || (o = r,
                r = void 0),
            (n(t) && s(t) || i(t) && 0 === t.length) && (t = void 0),
                l._isAMomentObject = !0,
                l._useUTC = l._isUTC = a,
                l._l = r,
                l._i = t,
                l._f = e,
                l._strict = o,
                me(l)
        }
        function ye(t, e, i, n) {
            return ve(t, e, i, n, !1)
        }
        function be(t, e) {
            var n, s;
            if (1 === e.length && i(e[0]) && (e = e[0]),
                !e.length)
                return ye();
            for (n = e[0],
                     s = 1; s < e.length; ++s)
                e[s].isValid() && !e[s][t](n) || (n = e[s]);
            return n
        }
        function we() {
            var t = [].slice.call(arguments, 0);
            return be("isBefore", t)
        }
        function Te() {
            var t = [].slice.call(arguments, 0);
            return be("isAfter", t)
        }
        function xe(t) {
            for (var e in t)
                if (Us.indexOf(e) === -1 || null != t[e] && isNaN(t[e]))
                    return !1;
            for (var i = !1, n = 0; n < Us.length; ++n)
                if (t[Us[n]]) {
                    if (i)
                        return !1;
                    parseFloat(t[Us[n]]) !== b(t[Us[n]]) && (i = !0)
                }
            return !0
        }
        function Se() {
            return this._isValid
        }
        function Ce() {
            return Ue(NaN)
        }
        function Le(t) {
            var e = I(t)
                , i = e.year || 0
                , n = e.quarter || 0
                , s = e.month || 0
                , r = e.week || 0
                , o = e.day || 0
                , a = e.hour || 0
                , l = e.minute || 0
                , h = e.second || 0
                , c = e.millisecond || 0;
            this._isValid = xe(e),
                this._milliseconds = +c + 1e3 * h + 6e4 * l + 1e3 * a * 60 * 60,
                this._days = +o + 7 * r,
                this._months = +s + 3 * n + 12 * i,
                this._data = {},
                this._locale = ee(),
                this._bubble()
        }
        function Ee(t) {
            return t instanceof Le
        }
        function ke(t) {
            return t < 0 ? Math.round(-1 * t) * -1 : Math.round(t)
        }
        function Pe(t, e) {
            z(t, 0, 0, function() {
                var t = this.utcOffset()
                    , i = "+";
                return t < 0 && (t = -t,
                    i = "-"),
                i + q(~~(t / 60), 2) + e + q(~~t % 60, 2)
            })
        }
        function Ae(t, e) {
            var i = (e || "").match(t);
            if (null === i)
                return null;
            var n = i[i.length - 1] || []
                , s = (n + "").match(qs) || ["-", 0, 0]
                , r = +(60 * s[1]) + b(s[2]);
            return 0 === r ? 0 : "+" === s[0] ? r : -r
        }
        function Oe(e, i) {
            var n, s;
            return i._isUTC ? (n = i.clone(),
                s = (v(e) || a(e) ? e.valueOf() : ye(e).valueOf()) - n.valueOf(),
                n._d.setTime(n._d.valueOf() + s),
                t.updateOffset(n, !1),
                n) : ye(e).local()
        }
        function Ne(t) {
            return 15 * -Math.round(t._d.getTimezoneOffset() / 15)
        }
        function $e(e, i, n) {
            var s, r = this._offset || 0;
            if (!this.isValid())
                return null != e ? this : NaN;
            if (null != e) {
                if ("string" == typeof e) {
                    if (e = Ae(ts, e),
                    null === e)
                        return this
                } else
                    Math.abs(e) < 16 && !n && (e = 60 * e);
                return !this._isUTC && i && (s = Ne(this)),
                    this._offset = e,
                    this._isUTC = !0,
                null != s && this.add(s, "m"),
                r !== e && (!i || this._changeInProgress ? Ge(this, Ue(e - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
                    t.updateOffset(this, !0),
                    this._changeInProgress = null)),
                    this
            }
            return this._isUTC ? r : Ne(this)
        }
        function De(t, e) {
            return null != t ? ("string" != typeof t && (t = -t),
                this.utcOffset(t, e),
                this) : -this.utcOffset()
        }
        function Me(t) {
            return this.utcOffset(0, t)
        }
        function Re(t) {
            return this._isUTC && (this.utcOffset(0, t),
                this._isUTC = !1,
            t && this.subtract(Ne(this), "m")),
                this
        }
        function Ie() {
            if (null != this._tzm)
                this.utcOffset(this._tzm, !1, !0);
            else if ("string" == typeof this._i) {
                var t = Ae(Kn, this._i);
                null != t ? this.utcOffset(t) : this.utcOffset(0, !0)
            }
            return this
        }
        function je(t) {
            return !!this.isValid() && (t = t ? ye(t).utcOffset() : 0,
            (this.utcOffset() - t) % 60 === 0)
        }
        function Fe() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        }
        function He() {
            if (!r(this._isDSTShifted))
                return this._isDSTShifted;
            var t = {};
            if (_(t, this),
                t = _e(t),
                t._a) {
                var e = t._isUTC ? u(t._a) : ye(t._a);
                this._isDSTShifted = this.isValid() && w(t._a, e.toArray()) > 0
            } else
                this._isDSTShifted = !1;
            return this._isDSTShifted
        }
        function Be() {
            return !!this.isValid() && !this._isUTC
        }
        function Ye() {
            return !!this.isValid() && this._isUTC
        }
        function Ve() {
            return !!this.isValid() && (this._isUTC && 0 === this._offset)
        }
        function Ue(t, e) {
            var i, n, s, r = t, a = null;
            return Ee(t) ? r = {
                ms: t._milliseconds,
                d: t._days,
                M: t._months
            } : o(t) ? (r = {},
                e ? r[e] = t : r.milliseconds = t) : (a = zs.exec(t)) ? (i = "-" === a[1] ? -1 : 1,
                r = {
                    y: 0,
                    d: b(a[as]) * i,
                    h: b(a[ls]) * i,
                    m: b(a[hs]) * i,
                    s: b(a[cs]) * i,
                    ms: b(ke(1e3 * a[us])) * i
                }) : (a = Ws.exec(t)) ? (i = "-" === a[1] ? -1 : 1,
                r = {
                    y: qe(a[2], i),
                    M: qe(a[3], i),
                    w: qe(a[4], i),
                    d: qe(a[5], i),
                    h: qe(a[6], i),
                    m: qe(a[7], i),
                    s: qe(a[8], i)
                }) : null == r ? r = {} : "object" == typeof r && ("from"in r || "to"in r) && (s = We(ye(r.from), ye(r.to)),
                r = {},
                r.ms = s.milliseconds,
                r.M = s.months),
                n = new Le(r),
            Ee(t) && h(t, "_locale") && (n._locale = t._locale),
                n
        }
        function qe(t, e) {
            var i = t && parseFloat(t.replace(",", "."));
            return (isNaN(i) ? 0 : i) * e
        }
        function ze(t, e) {
            var i = {
                milliseconds: 0,
                months: 0
            };
            return i.months = e.month() - t.month() + 12 * (e.year() - t.year()),
            t.clone().add(i.months, "M").isAfter(e) && --i.months,
                i.milliseconds = +e - +t.clone().add(i.months, "M"),
                i
        }
        function We(t, e) {
            var i;
            return t.isValid() && e.isValid() ? (e = Oe(e, t),
                t.isBefore(e) ? i = ze(t, e) : (i = ze(e, t),
                    i.milliseconds = -i.milliseconds,
                    i.months = -i.months),
                i) : {
                milliseconds: 0,
                months: 0
            }
        }
        function Xe(t, e) {
            return function(i, n) {
                var s, r;
                return null === n || isNaN(+n) || (S(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
                    r = i,
                    i = n,
                    n = r),
                    i = "string" == typeof i ? +i : i,
                    s = Ue(i, n),
                    Ge(this, s, t),
                    this
            }
        }
        function Ge(e, i, n, s) {
            var r = i._milliseconds
                , o = ke(i._days)
                , a = ke(i._months);
            e.isValid() && (s = null == s || s,
            r && e._d.setTime(e._d.valueOf() + r * n),
            o && Y(e, "Date", B(e, "Date") + o * n),
            a && ht(e, B(e, "Month") + a * n),
            s && t.updateOffset(e, o || a))
        }
        function Je(t, e) {
            var i = t.diff(e, "days", !0);
            return i < -6 ? "sameElse" : i < -1 ? "lastWeek" : i < 0 ? "lastDay" : i < 1 ? "sameDay" : i < 2 ? "nextDay" : i < 7 ? "nextWeek" : "sameElse"
        }
        function Qe(e, i) {
            var n = e || ye()
                , s = Oe(n, this).startOf("day")
                , r = t.calendarFormat(this, s) || "sameElse"
                , o = i && (C(i[r]) ? i[r].call(this, n) : i[r]);
            return this.format(o || this.localeData().calendar(r, this, ye(n)))
        }
        function Ze() {
            return new g(this)
        }
        function Ke(t, e) {
            var i = v(t) ? t : ye(t);
            return !(!this.isValid() || !i.isValid()) && (e = R(r(e) ? "millisecond" : e),
                "millisecond" === e ? this.valueOf() > i.valueOf() : i.valueOf() < this.clone().startOf(e).valueOf())
        }
        function ti(t, e) {
            var i = v(t) ? t : ye(t);
            return !(!this.isValid() || !i.isValid()) && (e = R(r(e) ? "millisecond" : e),
                "millisecond" === e ? this.valueOf() < i.valueOf() : this.clone().endOf(e).valueOf() < i.valueOf())
        }
        function ei(t, e, i, n) {
            return n = n || "()",
            ("(" === n[0] ? this.isAfter(t, i) : !this.isBefore(t, i)) && (")" === n[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
        }
        function ii(t, e) {
            var i, n = v(t) ? t : ye(t);
            return !(!this.isValid() || !n.isValid()) && (e = R(e || "millisecond"),
                "millisecond" === e ? this.valueOf() === n.valueOf() : (i = n.valueOf(),
                this.clone().startOf(e).valueOf() <= i && i <= this.clone().endOf(e).valueOf()))
        }
        function ni(t, e) {
            return this.isSame(t, e) || this.isAfter(t, e)
        }
        function si(t, e) {
            return this.isSame(t, e) || this.isBefore(t, e)
        }
        function ri(t, e, i) {
            var n, s, r, o;
            return this.isValid() ? (n = Oe(t, this),
                n.isValid() ? (s = 6e4 * (n.utcOffset() - this.utcOffset()),
                    e = R(e),
                    "year" === e || "month" === e || "quarter" === e ? (o = oi(this, n),
                        "quarter" === e ? o /= 3 : "year" === e && (o /= 12)) : (r = this - n,
                        o = "second" === e ? r / 1e3 : "minute" === e ? r / 6e4 : "hour" === e ? r / 36e5 : "day" === e ? (r - s) / 864e5 : "week" === e ? (r - s) / 6048e5 : r),
                    i ? o : y(o)) : NaN) : NaN
        }
        function oi(t, e) {
            var i, n, s = 12 * (e.year() - t.year()) + (e.month() - t.month()), r = t.clone().add(s, "months");
            return e - r < 0 ? (i = t.clone().add(s - 1, "months"),
                n = (e - r) / (r - i)) : (i = t.clone().add(s + 1, "months"),
                n = (e - r) / (i - r)),
            -(s + n) || 0
        }
        function ai() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        }
        function li() {
            if (!this.isValid())
                return null;
            var t = this.clone().utc();
            return t.year() < 0 || t.year() > 9999 ? G(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : C(Date.prototype.toISOString) ? this.toDate().toISOString() : G(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        }
        function hi() {
            if (!this.isValid())
                return "moment.invalid(/* " + this._i + " */)";
            var t = "moment"
                , e = "";
            this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone",
                e = "Z");
            var i = "[" + t + '("]'
                , n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"
                , s = "-MM-DD[T]HH:mm:ss.SSS"
                , r = e + '[")]';
            return this.format(i + n + s + r)
        }
        function ci(e) {
            e || (e = this.isUtc() ? t.defaultFormatUtc : t.defaultFormat);
            var i = G(this, e);
            return this.localeData().postformat(i)
        }
        function ui(t, e) {
            return this.isValid() && (v(t) && t.isValid() || ye(t).isValid()) ? Ue({
                to: this,
                from: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }
        function di(t) {
            return this.from(ye(), t)
        }
        function fi(t, e) {
            return this.isValid() && (v(t) && t.isValid() || ye(t).isValid()) ? Ue({
                from: this,
                to: t
            }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate()
        }
        function pi(t) {
            return this.to(ye(), t)
        }
        function mi(t) {
            var e;
            return void 0 === t ? this._locale._abbr : (e = ee(t),
            null != e && (this._locale = e),
                this)
        }
        function _i() {
            return this._locale
        }
        function gi(t) {
            switch (t = R(t)) {
                case "year":
                    this.month(0);
                case "quarter":
                case "month":
                    this.date(1);
                case "week":
                case "isoWeek":
                case "day":
                case "date":
                    this.hours(0);
                case "hour":
                    this.minutes(0);
                case "minute":
                    this.seconds(0);
                case "second":
                    this.milliseconds(0)
            }
            return "week" === t && this.weekday(0),
            "isoWeek" === t && this.isoWeekday(1),
            "quarter" === t && this.month(3 * Math.floor(this.month() / 3)),
                this
        }
        function vi(t) {
            return t = R(t),
                void 0 === t || "millisecond" === t ? this : ("date" === t && (t = "day"),
                    this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms"))
        }
        function yi() {
            return this._d.valueOf() - 6e4 * (this._offset || 0)
        }
        function bi() {
            return Math.floor(this.valueOf() / 1e3)
        }
        function wi() {
            return new Date(this.valueOf())
        }
        function Ti() {
            var t = this;
            return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()]
        }
        function xi() {
            var t = this;
            return {
                years: t.year(),
                months: t.month(),
                date: t.date(),
                hours: t.hours(),
                minutes: t.minutes(),
                seconds: t.seconds(),
                milliseconds: t.milliseconds()
            }
        }
        function Si() {
            return this.isValid() ? this.toISOString() : null
        }
        function Ci() {
            return p(this)
        }
        function Li() {
            return c({}, f(this))
        }
        function Ei() {
            return f(this).overflow
        }
        function ki() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict
            }
        }
        function Pi(t, e) {
            z(0, [t, t.length], 0, e)
        }
        function Ai(t) {
            return Di.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
        }
        function Oi(t) {
            return Di.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4)
        }
        function Ni() {
            return xt(this.year(), 1, 4)
        }
        function $i() {
            var t = this.localeData()._week;
            return xt(this.year(), t.dow, t.doy)
        }
        function Di(t, e, i, n, s) {
            var r;
            return null == t ? Tt(this, n, s).year : (r = xt(t, n, s),
            e > r && (e = r),
                Mi.call(this, t, e, i, n, s))
        }
        function Mi(t, e, i, n, s) {
            var r = wt(t, e, i, n, s)
                , o = yt(r.year, 0, r.dayOfYear);
            return this.year(o.getUTCFullYear()),
                this.month(o.getUTCMonth()),
                this.date(o.getUTCDate()),
                this
        }
        function Ri(t) {
            return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3)
        }
        function Ii(t) {
            var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
            return null == t ? e : this.add(t - e, "d")
        }
        function ji(t, e) {
            e[us] = b(1e3 * ("0." + t))
        }
        function Fi() {
            return this._isUTC ? "UTC" : ""
        }
        function Hi() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        }
        function Bi(t) {
            return ye(1e3 * t)
        }
        function Yi() {
            return ye.apply(null, arguments).parseZone()
        }
        function Vi(t) {
            return t
        }
        function Ui(t, e, i, n) {
            var s = ee()
                , r = u().set(n, e);
            return s[i](r, t)
        }
        function qi(t, e, i) {
            if (o(t) && (e = t,
                t = void 0),
                t = t || "",
            null != e)
                return Ui(t, e, i, "month");
            var n, s = [];
            for (n = 0; n < 12; n++)
                s[n] = Ui(t, n, i, "month");
            return s
        }
        function zi(t, e, i, n) {
            "boolean" == typeof t ? (o(e) && (i = e,
                e = void 0),
                e = e || "") : (e = t,
                i = e,
                t = !1,
            o(e) && (i = e,
                e = void 0),
                e = e || "");
            var s = ee()
                , r = t ? s._week.dow : 0;
            if (null != i)
                return Ui(e, (i + r) % 7, n, "day");
            var a, l = [];
            for (a = 0; a < 7; a++)
                l[a] = Ui(e, (a + r) % 7, n, "day");
            return l
        }
        function Wi(t, e) {
            return qi(t, e, "months")
        }
        function Xi(t, e) {
            return qi(t, e, "monthsShort")
        }
        function Gi(t, e, i) {
            return zi(t, e, i, "weekdays")
        }
        function Ji(t, e, i) {
            return zi(t, e, i, "weekdaysShort")
        }
        function Qi(t, e, i) {
            return zi(t, e, i, "weekdaysMin")
        }
        function Zi() {
            var t = this._data;
            return this._milliseconds = sr(this._milliseconds),
                this._days = sr(this._days),
                this._months = sr(this._months),
                t.milliseconds = sr(t.milliseconds),
                t.seconds = sr(t.seconds),
                t.minutes = sr(t.minutes),
                t.hours = sr(t.hours),
                t.months = sr(t.months),
                t.years = sr(t.years),
                this
        }
        function Ki(t, e, i, n) {
            var s = Ue(e, i);
            return t._milliseconds += n * s._milliseconds,
                t._days += n * s._days,
                t._months += n * s._months,
                t._bubble()
        }
        function tn(t, e) {
            return Ki(this, t, e, 1)
        }
        function en(t, e) {
            return Ki(this, t, e, -1)
        }
        function nn(t) {
            return t < 0 ? Math.floor(t) : Math.ceil(t)
        }
        function sn() {
            var t, e, i, n, s, r = this._milliseconds, o = this._days, a = this._months, l = this._data;
            return r >= 0 && o >= 0 && a >= 0 || r <= 0 && o <= 0 && a <= 0 || (r += 864e5 * nn(on(a) + o),
                o = 0,
                a = 0),
                l.milliseconds = r % 1e3,
                t = y(r / 1e3),
                l.seconds = t % 60,
                e = y(t / 60),
                l.minutes = e % 60,
                i = y(e / 60),
                l.hours = i % 24,
                o += y(i / 24),
                s = y(rn(o)),
                a += s,
                o -= nn(on(s)),
                n = y(a / 12),
                a %= 12,
                l.days = o,
                l.months = a,
                l.years = n,
                this
        }
        function rn(t) {
            return 4800 * t / 146097
        }
        function on(t) {
            return 146097 * t / 4800
        }
        function an(t) {
            if (!this.isValid())
                return NaN;
            var e, i, n = this._milliseconds;
            if (t = R(t),
            "month" === t || "year" === t)
                return e = this._days + n / 864e5,
                    i = this._months + rn(e),
                    "month" === t ? i : i / 12;
            switch (e = this._days + Math.round(on(this._months)),
                t) {
                case "week":
                    return e / 7 + n / 6048e5;
                case "day":
                    return e + n / 864e5;
                case "hour":
                    return 24 * e + n / 36e5;
                case "minute":
                    return 1440 * e + n / 6e4;
                case "second":
                    return 86400 * e + n / 1e3;
                case "millisecond":
                    return Math.floor(864e5 * e) + n;
                default:
                    throw new Error("Unknown unit " + t)
            }
        }
        function ln() {
            return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * b(this._months / 12) : NaN
        }
        function hn(t) {
            return function() {
                return this.as(t)
            }
        }
        function cn(t) {
            return t = R(t),
                this.isValid() ? this[t + "s"]() : NaN
        }
        function un(t) {
            return function() {
                return this.isValid() ? this._data[t] : NaN
            }
        }
        function dn() {
            return y(this.days() / 7)
        }
        function fn(t, e, i, n, s) {
            return s.relativeTime(e || 1, !!i, t, n)
        }
        function pn(t, e, i) {
            var n = Ue(t).abs()
                , s = br(n.as("s"))
                , r = br(n.as("m"))
                , o = br(n.as("h"))
                , a = br(n.as("d"))
                , l = br(n.as("M"))
                , h = br(n.as("y"))
                , c = s <= wr.ss && ["s", s] || s < wr.s && ["ss", s] || r <= 1 && ["m"] || r < wr.m && ["mm", r] || o <= 1 && ["h"] || o < wr.h && ["hh", o] || a <= 1 && ["d"] || a < wr.d && ["dd", a] || l <= 1 && ["M"] || l < wr.M && ["MM", l] || h <= 1 && ["y"] || ["yy", h];
            return c[2] = e,
                c[3] = +t > 0,
                c[4] = i,
                fn.apply(null, c)
        }
        function mn(t) {
            return void 0 === t ? br : "function" == typeof t && (br = t,
                !0)
        }
        function _n(t, e) {
            return void 0 !== wr[t] && (void 0 === e ? wr[t] : (wr[t] = e,
            "s" === t && (wr.ss = e - 1),
                !0))
        }
        function gn(t) {
            if (!this.isValid())
                return this.localeData().invalidDate();
            var e = this.localeData()
                , i = pn(this, !t, e);
            return t && (i = e.pastFuture(+this, i)),
                e.postformat(i)
        }
        function vn() {
            if (!this.isValid())
                return this.localeData().invalidDate();
            var t, e, i, n = Tr(this._milliseconds) / 1e3, s = Tr(this._days), r = Tr(this._months);
            t = y(n / 60),
                e = y(t / 60),
                n %= 60,
                t %= 60,
                i = y(r / 12),
                r %= 12;
            var o = i
                , a = r
                , l = s
                , h = e
                , c = t
                , u = n
                , d = this.asSeconds();
            return d ? (d < 0 ? "-" : "") + "P" + (o ? o + "Y" : "") + (a ? a + "M" : "") + (l ? l + "D" : "") + (h || c || u ? "T" : "") + (h ? h + "H" : "") + (c ? c + "M" : "") + (u ? u + "S" : "") : "P0D"
        }
        var yn, bn;
        bn = Array.prototype.some ? Array.prototype.some : function(t) {
            for (var e = Object(this), i = e.length >>> 0, n = 0; n < i; n++)
                if (n in e && t.call(this, e[n], n, e))
                    return !0;
            return !1
        }
        ;
        var wn = bn
            , Tn = t.momentProperties = []
            , xn = !1
            , Sn = {};
        t.suppressDeprecationWarnings = !1,
            t.deprecationHandler = null;
        var Cn;
        Cn = Object.keys ? Object.keys : function(t) {
            var e, i = [];
            for (e in t)
                h(t, e) && i.push(e);
            return i
        }
        ;
        var Ln, En = Cn, kn = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        }, Pn = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, An = "Invalid date", On = "%d", Nn = /\d{1,2}/, $n = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }, Dn = {}, Mn = {}, Rn = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, In = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, jn = {}, Fn = {}, Hn = /\d/, Bn = /\d\d/, Yn = /\d{3}/, Vn = /\d{4}/, Un = /[+-]?\d{6}/, qn = /\d\d?/, zn = /\d\d\d\d?/, Wn = /\d\d\d\d\d\d?/, Xn = /\d{1,3}/, Gn = /\d{1,4}/, Jn = /[+-]?\d{1,6}/, Qn = /\d+/, Zn = /[+-]?\d+/, Kn = /Z|[+-]\d\d:?\d\d/gi, ts = /Z|[+-]\d\d(?::?\d\d)?/gi, es = /[+-]?\d+(\.\d{1,3})?/, is = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, ns = {}, ss = {}, rs = 0, os = 1, as = 2, ls = 3, hs = 4, cs = 5, us = 6, ds = 7, fs = 8;
        Ln = Array.prototype.indexOf ? Array.prototype.indexOf : function(t) {
            var e;
            for (e = 0; e < this.length; ++e)
                if (this[e] === t)
                    return e;
            return -1
        }
        ;
        var ps = Ln;
        z("M", ["MM", 2], "Mo", function() {
            return this.month() + 1
        }),
            z("MMM", 0, 0, function(t) {
                return this.localeData().monthsShort(this, t)
            }),
            z("MMMM", 0, 0, function(t) {
                return this.localeData().months(this, t)
            }),
            M("month", "M"),
            j("month", 8),
            Q("M", qn),
            Q("MM", qn, Bn),
            Q("MMM", function(t, e) {
                return e.monthsShortRegex(t)
            }),
            Q("MMMM", function(t, e) {
                return e.monthsRegex(t)
            }),
            et(["M", "MM"], function(t, e) {
                e[os] = b(t) - 1
            }),
            et(["MMM", "MMMM"], function(t, e, i, n) {
                var s = i._locale.monthsParse(t, n, i._strict);
                null != s ? e[os] = s : f(i).invalidMonth = t
            });
        var ms = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/
            , _s = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
            , gs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
            , vs = is
            , ys = is;
        z("Y", 0, 0, function() {
            var t = this.year();
            return t <= 9999 ? "" + t : "+" + t
        }),
            z(0, ["YY", 2], 0, function() {
                return this.year() % 100
            }),
            z(0, ["YYYY", 4], 0, "year"),
            z(0, ["YYYYY", 5], 0, "year"),
            z(0, ["YYYYYY", 6, !0], 0, "year"),
            M("year", "y"),
            j("year", 1),
            Q("Y", Zn),
            Q("YY", qn, Bn),
            Q("YYYY", Gn, Vn),
            Q("YYYYY", Jn, Un),
            Q("YYYYYY", Jn, Un),
            et(["YYYYY", "YYYYYY"], rs),
            et("YYYY", function(e, i) {
                i[rs] = 2 === e.length ? t.parseTwoDigitYear(e) : b(e)
            }),
            et("YY", function(e, i) {
                i[rs] = t.parseTwoDigitYear(e)
            }),
            et("Y", function(t, e) {
                e[rs] = parseInt(t, 10)
            }),
            t.parseTwoDigitYear = function(t) {
                return b(t) + (b(t) > 68 ? 1900 : 2e3)
            }
        ;
        var bs = H("FullYear", !0);
        z("w", ["ww", 2], "wo", "week"),
            z("W", ["WW", 2], "Wo", "isoWeek"),
            M("week", "w"),
            M("isoWeek", "W"),
            j("week", 5),
            j("isoWeek", 5),
            Q("w", qn),
            Q("ww", qn, Bn),
            Q("W", qn),
            Q("WW", qn, Bn),
            it(["w", "ww", "W", "WW"], function(t, e, i, n) {
                e[n.substr(0, 1)] = b(t)
            });
        var ws = {
            dow: 0,
            doy: 6
        };
        z("d", 0, "do", "day"),
            z("dd", 0, 0, function(t) {
                return this.localeData().weekdaysMin(this, t)
            }),
            z("ddd", 0, 0, function(t) {
                return this.localeData().weekdaysShort(this, t)
            }),
            z("dddd", 0, 0, function(t) {
                return this.localeData().weekdays(this, t)
            }),
            z("e", 0, 0, "weekday"),
            z("E", 0, 0, "isoWeekday"),
            M("day", "d"),
            M("weekday", "e"),
            M("isoWeekday", "E"),
            j("day", 11),
            j("weekday", 11),
            j("isoWeekday", 11),
            Q("d", qn),
            Q("e", qn),
            Q("E", qn),
            Q("dd", function(t, e) {
                return e.weekdaysMinRegex(t)
            }),
            Q("ddd", function(t, e) {
                return e.weekdaysShortRegex(t)
            }),
            Q("dddd", function(t, e) {
                return e.weekdaysRegex(t)
            }),
            it(["dd", "ddd", "dddd"], function(t, e, i, n) {
                var s = i._locale.weekdaysParse(t, n, i._strict);
                null != s ? e.d = s : f(i).invalidWeekday = t
            }),
            it(["d", "e", "E"], function(t, e, i, n) {
                e[n] = b(t)
            });
        var Ts = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
            , xs = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
            , Ss = "Su_Mo_Tu_We_Th_Fr_Sa".split("_")
            , Cs = is
            , Ls = is
            , Es = is;
        z("H", ["HH", 2], 0, "hour"),
            z("h", ["hh", 2], 0, Vt),
            z("k", ["kk", 2], 0, Ut),
            z("hmm", 0, 0, function() {
                return "" + Vt.apply(this) + q(this.minutes(), 2)
            }),
            z("hmmss", 0, 0, function() {
                return "" + Vt.apply(this) + q(this.minutes(), 2) + q(this.seconds(), 2)
            }),
            z("Hmm", 0, 0, function() {
                return "" + this.hours() + q(this.minutes(), 2)
            }),
            z("Hmmss", 0, 0, function() {
                return "" + this.hours() + q(this.minutes(), 2) + q(this.seconds(), 2)
            }),
            qt("a", !0),
            qt("A", !1),
            M("hour", "h"),
            j("hour", 13),
            Q("a", zt),
            Q("A", zt),
            Q("H", qn),
            Q("h", qn),
            Q("k", qn),
            Q("HH", qn, Bn),
            Q("hh", qn, Bn),
            Q("kk", qn, Bn),
            Q("hmm", zn),
            Q("hmmss", Wn),
            Q("Hmm", zn),
            Q("Hmmss", Wn),
            et(["H", "HH"], ls),
            et(["k", "kk"], function(t, e, i) {
                var n = b(t);
                e[ls] = 24 === n ? 0 : n
            }),
            et(["a", "A"], function(t, e, i) {
                i._isPm = i._locale.isPM(t),
                    i._meridiem = t
            }),
            et(["h", "hh"], function(t, e, i) {
                e[ls] = b(t),
                    f(i).bigHour = !0
            }),
            et("hmm", function(t, e, i) {
                var n = t.length - 2;
                e[ls] = b(t.substr(0, n)),
                    e[hs] = b(t.substr(n)),
                    f(i).bigHour = !0
            }),
            et("hmmss", function(t, e, i) {
                var n = t.length - 4
                    , s = t.length - 2;
                e[ls] = b(t.substr(0, n)),
                    e[hs] = b(t.substr(n, 2)),
                    e[cs] = b(t.substr(s)),
                    f(i).bigHour = !0
            }),
            et("Hmm", function(t, e, i) {
                var n = t.length - 2;
                e[ls] = b(t.substr(0, n)),
                    e[hs] = b(t.substr(n))
            }),
            et("Hmmss", function(t, e, i) {
                var n = t.length - 4
                    , s = t.length - 2;
                e[ls] = b(t.substr(0, n)),
                    e[hs] = b(t.substr(n, 2)),
                    e[cs] = b(t.substr(s))
            });
        var ks, Ps = /[ap]\.?m?\.?/i, As = H("Hours", !0), Os = {
            calendar: kn,
            longDateFormat: Pn,
            invalidDate: An,
            ordinal: On,
            dayOfMonthOrdinalParse: Nn,
            relativeTime: $n,
            months: _s,
            monthsShort: gs,
            week: ws,
            weekdays: Ts,
            weekdaysMin: Ss,
            weekdaysShort: xs,
            meridiemParse: Ps
        }, Ns = {}, $s = {}, Ds = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ms = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Rs = /Z|[+-]\d\d(?::?\d\d)?/, Is = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], js = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Fs = /^\/?Date\((\-?\d+)/i, Hs = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
        t.createFromInputFallback = x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(t) {
            t._d = new Date(t._i + (t._useUTC ? " UTC" : ""))
        }),
            t.ISO_8601 = function() {}
            ,
            t.RFC_2822 = function() {}
        ;
        var Bs = x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var t = ye.apply(null, arguments);
            return this.isValid() && t.isValid() ? t < this ? this : t : m()
        })
            , Ys = x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
            var t = ye.apply(null, arguments);
            return this.isValid() && t.isValid() ? t > this ? this : t : m()
        })
            , Vs = function() {
            return Date.now ? Date.now() : +new Date
        }
            , Us = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
        Pe("Z", ":"),
            Pe("ZZ", ""),
            Q("Z", ts),
            Q("ZZ", ts),
            et(["Z", "ZZ"], function(t, e, i) {
                i._useUTC = !0,
                    i._tzm = Ae(ts, t)
            });
        var qs = /([\+\-]|\d\d)/gi;
        t.updateOffset = function() {}
        ;
        var zs = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
            , Ws = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
        Ue.fn = Le.prototype,
            Ue.invalid = Ce;
        var Xs = Xe(1, "add")
            , Gs = Xe(-1, "subtract");
        t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
            t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
        var Js = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
            return void 0 === t ? this.localeData() : this.locale(t)
        });
        z(0, ["gg", 2], 0, function() {
            return this.weekYear() % 100
        }),
            z(0, ["GG", 2], 0, function() {
                return this.isoWeekYear() % 100
            }),
            Pi("gggg", "weekYear"),
            Pi("ggggg", "weekYear"),
            Pi("GGGG", "isoWeekYear"),
            Pi("GGGGG", "isoWeekYear"),
            M("weekYear", "gg"),
            M("isoWeekYear", "GG"),
            j("weekYear", 1),
            j("isoWeekYear", 1),
            Q("G", Zn),
            Q("g", Zn),
            Q("GG", qn, Bn),
            Q("gg", qn, Bn),
            Q("GGGG", Gn, Vn),
            Q("gggg", Gn, Vn),
            Q("GGGGG", Jn, Un),
            Q("ggggg", Jn, Un),
            it(["gggg", "ggggg", "GGGG", "GGGGG"], function(t, e, i, n) {
                e[n.substr(0, 2)] = b(t)
            }),
            it(["gg", "GG"], function(e, i, n, s) {
                i[s] = t.parseTwoDigitYear(e)
            }),
            z("Q", 0, "Qo", "quarter"),
            M("quarter", "Q"),
            j("quarter", 7),
            Q("Q", Hn),
            et("Q", function(t, e) {
                e[os] = 3 * (b(t) - 1)
            }),
            z("D", ["DD", 2], "Do", "date"),
            M("date", "D"),
            j("date", 9),
            Q("D", qn),
            Q("DD", qn, Bn),
            Q("Do", function(t, e) {
                return t ? e._dayOfMonthOrdinalParse || e._ordinalParse : e._dayOfMonthOrdinalParseLenient
            }),
            et(["D", "DD"], as),
            et("Do", function(t, e) {
                e[as] = b(t.match(qn)[0], 10)
            });
        var Qs = H("Date", !0);
        z("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
            M("dayOfYear", "DDD"),
            j("dayOfYear", 4),
            Q("DDD", Xn),
            Q("DDDD", Yn),
            et(["DDD", "DDDD"], function(t, e, i) {
                i._dayOfYear = b(t)
            }),
            z("m", ["mm", 2], 0, "minute"),
            M("minute", "m"),
            j("minute", 14),
            Q("m", qn),
            Q("mm", qn, Bn),
            et(["m", "mm"], hs);
        var Zs = H("Minutes", !1);
        z("s", ["ss", 2], 0, "second"),
            M("second", "s"),
            j("second", 15),
            Q("s", qn),
            Q("ss", qn, Bn),
            et(["s", "ss"], cs);
        var Ks = H("Seconds", !1);
        z("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }),
            z(0, ["SS", 2], 0, function() {
                return ~~(this.millisecond() / 10)
            }),
            z(0, ["SSS", 3], 0, "millisecond"),
            z(0, ["SSSS", 4], 0, function() {
                return 10 * this.millisecond()
            }),
            z(0, ["SSSSS", 5], 0, function() {
                return 100 * this.millisecond()
            }),
            z(0, ["SSSSSS", 6], 0, function() {
                return 1e3 * this.millisecond()
            }),
            z(0, ["SSSSSSS", 7], 0, function() {
                return 1e4 * this.millisecond()
            }),
            z(0, ["SSSSSSSS", 8], 0, function() {
                return 1e5 * this.millisecond()
            }),
            z(0, ["SSSSSSSSS", 9], 0, function() {
                return 1e6 * this.millisecond()
            }),
            M("millisecond", "ms"),
            j("millisecond", 16),
            Q("S", Xn, Hn),
            Q("SS", Xn, Bn),
            Q("SSS", Xn, Yn);
        var tr;
        for (tr = "SSSS"; tr.length <= 9; tr += "S")
            Q(tr, Qn);
        for (tr = "S"; tr.length <= 9; tr += "S")
            et(tr, ji);
        var er = H("Milliseconds", !1);
        z("z", 0, 0, "zoneAbbr"),
            z("zz", 0, 0, "zoneName");
        var ir = g.prototype;
        ir.add = Xs,
            ir.calendar = Qe,
            ir.clone = Ze,
            ir.diff = ri,
            ir.endOf = vi,
            ir.format = ci,
            ir.from = ui,
            ir.fromNow = di,
            ir.to = fi,
            ir.toNow = pi,
            ir.get = V,
            ir.invalidAt = Ei,
            ir.isAfter = Ke,
            ir.isBefore = ti,
            ir.isBetween = ei,
            ir.isSame = ii,
            ir.isSameOrAfter = ni,
            ir.isSameOrBefore = si,
            ir.isValid = Ci,
            ir.lang = Js,
            ir.locale = mi,
            ir.localeData = _i,
            ir.max = Ys,
            ir.min = Bs,
            ir.parsingFlags = Li,
            ir.set = U,
            ir.startOf = gi,
            ir.subtract = Gs,
            ir.toArray = Ti,
            ir.toObject = xi,
            ir.toDate = wi,
            ir.toISOString = li,
            ir.inspect = hi,
            ir.toJSON = Si,
            ir.toString = ai,
            ir.unix = bi,
            ir.valueOf = yi,
            ir.creationData = ki,
            ir.year = bs,
            ir.isLeapYear = gt,
            ir.weekYear = Ai,
            ir.isoWeekYear = Oi,
            ir.quarter = ir.quarters = Ri,
            ir.month = ct,
            ir.daysInMonth = ut,
            ir.week = ir.weeks = Et,
            ir.isoWeek = ir.isoWeeks = kt,
            ir.weeksInYear = $i,
            ir.isoWeeksInYear = Ni,
            ir.date = Qs,
            ir.day = ir.days = Rt,
            ir.weekday = It,
            ir.isoWeekday = jt,
            ir.dayOfYear = Ii,
            ir.hour = ir.hours = As,
            ir.minute = ir.minutes = Zs,
            ir.second = ir.seconds = Ks,
            ir.millisecond = ir.milliseconds = er,
            ir.utcOffset = $e,
            ir.utc = Me,
            ir.local = Re,
            ir.parseZone = Ie,
            ir.hasAlignedHourOffset = je,
            ir.isDST = Fe,
            ir.isLocal = Be,
            ir.isUtcOffset = Ye,
            ir.isUtc = Ve,
            ir.isUTC = Ve,
            ir.zoneAbbr = Fi,
            ir.zoneName = Hi,
            ir.dates = x("dates accessor is deprecated. Use date instead.", Qs),
            ir.months = x("months accessor is deprecated. Use month instead", ct),
            ir.years = x("years accessor is deprecated. Use year instead", bs),
            ir.zone = x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", De),
            ir.isDSTShifted = x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", He);
        var nr = k.prototype;
        nr.calendar = P,
            nr.longDateFormat = A,
            nr.invalidDate = O,
            nr.ordinal = N,
            nr.preparse = Vi,
            nr.postformat = Vi,
            nr.relativeTime = $,
            nr.pastFuture = D,
            nr.set = L,
            nr.months = rt,
            nr.monthsShort = ot,
            nr.monthsParse = lt,
            nr.monthsRegex = ft,
            nr.monthsShortRegex = dt,
            nr.week = St,
            nr.firstDayOfYear = Lt,
            nr.firstDayOfWeek = Ct,
            nr.weekdays = Ot,
            nr.weekdaysMin = $t,
            nr.weekdaysShort = Nt,
            nr.weekdaysParse = Mt,
            nr.weekdaysRegex = Ft,
            nr.weekdaysShortRegex = Ht,
            nr.weekdaysMinRegex = Bt,
            nr.isPM = Wt,
            nr.meridiem = Xt,
            Zt("en", {
                dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
                ordinal: function(t) {
                    var e = t % 10
                        , i = 1 === b(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
                    return t + i
                }
            }),
            t.lang = x("moment.lang is deprecated. Use moment.locale instead.", Zt),
            t.langData = x("moment.langData is deprecated. Use moment.localeData instead.", ee);
        var sr = Math.abs
            , rr = hn("ms")
            , or = hn("s")
            , ar = hn("m")
            , lr = hn("h")
            , hr = hn("d")
            , cr = hn("w")
            , ur = hn("M")
            , dr = hn("y")
            , fr = un("milliseconds")
            , pr = un("seconds")
            , mr = un("minutes")
            , _r = un("hours")
            , gr = un("days")
            , vr = un("months")
            , yr = un("years")
            , br = Math.round
            , wr = {
            ss: 44,
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            M: 11
        }
            , Tr = Math.abs
            , xr = Le.prototype;
        return xr.isValid = Se,
            xr.abs = Zi,
            xr.add = tn,
            xr.subtract = en,
            xr.as = an,
            xr.asMilliseconds = rr,
            xr.asSeconds = or,
            xr.asMinutes = ar,
            xr.asHours = lr,
            xr.asDays = hr,
            xr.asWeeks = cr,
            xr.asMonths = ur,
            xr.asYears = dr,
            xr.valueOf = ln,
            xr._bubble = sn,
            xr.get = cn,
            xr.milliseconds = fr,
            xr.seconds = pr,
            xr.minutes = mr,
            xr.hours = _r,
            xr.days = gr,
            xr.weeks = dn,
            xr.months = vr,
            xr.years = yr,
            xr.humanize = gn,
            xr.toISOString = vn,
            xr.toString = vn,
            xr.toJSON = vn,
            xr.locale = mi,
            xr.localeData = _i,
            xr.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", vn),
            xr.lang = Js,
            z("X", 0, 0, "unix"),
            z("x", 0, 0, "valueOf"),
            Q("x", Zn),
            Q("X", es),
            et("X", function(t, e, i) {
                i._d = new Date(1e3 * parseFloat(t, 10))
            }),
            et("x", function(t, e, i) {
                i._d = new Date(b(t))
            }),
            t.version = "2.18.1",
            e(ye),
            t.fn = ir,
            t.min = we,
            t.max = Te,
            t.now = Vs,
            t.utc = u,
            t.unix = Bi,
            t.months = Wi,
            t.isDate = a,
            t.locale = Zt,
            t.invalid = m,
            t.duration = Ue,
            t.isMoment = v,
            t.weekdays = Gi,
            t.parseZone = Yi,
            t.localeData = ee,
            t.isDuration = Ee,
            t.monthsShort = Xi,
            t.weekdaysMin = Qi,
            t.defineLocale = Kt,
            t.updateLocale = te,
            t.locales = ie,
            t.weekdaysShort = Ji,
            t.normalizeUnits = R,
            t.relativeTimeRounding = mn,
            t.relativeTimeThreshold = _n,
            t.calendarFormat = Je,
            t.prototype = ir,
            t
    }),
    function(t, e) {
        "use strict";
        var i;
        if ("object" == typeof exports) {
            try {
                i = require("moment")
            } catch (n) {}
            module.exports = e(i)
        } else
            "function" == typeof define && define.amd ? define(function(t) {
                var n = "moment";
                try {
                    i = t(n)
                } catch (s) {}
                return e(i)
            }) : t.Pikaday = e(t.moment)
    }(this, function(t) {
        "use strict";
        var e = "function" == typeof t
            , i = !!window.addEventListener
            , n = window.document
            , s = window.setTimeout
            , r = function(t, e, n, s) {
            i ? t.addEventListener(e, n, !!s) : t.attachEvent("on" + e, n)
        }
            , o = function(t, e, n, s) {
            i ? t.removeEventListener(e, n, !!s) : t.detachEvent("on" + e, n)
        }
            , a = function(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }
            , l = function(t, e) {
            return (" " + t.className + " ").indexOf(" " + e + " ") !== -1
        }
            , h = function(t, e) {
            l(t, e) || (t.className = "" === t.className ? e : t.className + " " + e)
        }
            , c = function(t, e) {
            t.className = a((" " + t.className + " ").replace(" " + e + " ", " "))
        }
            , u = function(t) {
            return /Array/.test(Object.prototype.toString.call(t))
        }
            , d = function(t) {
            return /Date/.test(Object.prototype.toString.call(t)) && !isNaN(t.getTime())
        }
            , f = function(t) {
            var e = t.getDay();
            return 0 === e || 6 === e
        }
            , p = function(t) {
            return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
        }
            , m = function(t, e) {
            return [31, p(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        }
            , _ = function(t) {
            d(t) && t.setHours(0, 0, 0, 0)
        }
            , g = function(t, e) {
            return t.getTime() === e.getTime()
        }
            , v = function(t, e, i) {
            var n, s;
            for (n in e)
                s = void 0 !== t[n],
                    s && "object" == typeof e[n] && null !== e[n] && void 0 === e[n].nodeName ? d(e[n]) ? i && (t[n] = new Date(e[n].getTime())) : u(e[n]) ? i && (t[n] = e[n].slice(0)) : t[n] = v({}, e[n], i) : !i && s || (t[n] = e[n]);
            return t
        }
            , y = function(t, e, i) {
            var s;
            n.createEvent ? (s = n.createEvent("HTMLEvents"),
                s.initEvent(e, !0, !1),
                s = v(s, i),
                t.dispatchEvent(s)) : n.createEventObject && (s = n.createEventObject(),
                s = v(s, i),
                t.fireEvent("on" + e, s))
        }
            , b = function(t) {
            return t.month < 0 && (t.year -= Math.ceil(Math.abs(t.month) / 12),
                t.month += 12),
            t.month > 11 && (t.year += Math.floor(Math.abs(t.month) / 12),
                t.month -= 12),
                t
        }
            , w = {
            field: null,
            bound: void 0,
            ariaLabel: "Use the arrow keys to pick a date",
            position: "bottom left",
            reposition: !0,
            format: "YYYY-MM-DD",
            toString: null,
            parse: null,
            defaultDate: null,
            setDefaultDate: !1,
            firstDay: 0,
            formatStrict: !1,
            minDate: null,
            maxDate: null,
            yearRange: 10,
            showWeekNumber: !1,
            pickWholeWeek: !1,
            minYear: 0,
            maxYear: 9999,
            minMonth: void 0,
            maxMonth: void 0,
            startRange: null,
            endRange: null,
            isRTL: !1,
            yearSuffix: "",
            showMonthAfterYear: !1,
            showDaysInNextAndPreviousMonths: !1,
            enableSelectionDaysInNextAndPreviousMonths: !1,
            numberOfMonths: 1,
            mainCalendar: "left",
            container: void 0,
            blurFieldOnSelect: !0,
            i18n: {
                previousMonth: "Previous Month",
                nextMonth: "Next Month",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            },
            theme: null,
            events: [],
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null,
            keyboardInput: !0
        }
            , T = function(t, e, i) {
            for (e += t.firstDay; e >= 7; )
                e -= 7;
            return i ? t.i18n.weekdaysShort[e] : t.i18n.weekdays[e]
        }
            , x = function(t) {
            var e = []
                , i = "false";
            if (t.isEmpty) {
                if (!t.showDaysInNextAndPreviousMonths)
                    return '<td class="is-empty"></td>';
                e.push("is-outside-current-month"),
                t.enableSelectionDaysInNextAndPreviousMonths || e.push("is-selection-disabled")
            }
            return t.isDisabled && e.push("is-disabled"),
            t.isToday && e.push("is-today"),
            t.isSelected && (e.push("is-selected"),
                i = "true"),
            t.hasEvent && e.push("has-event"),
            t.isInRange && e.push("is-inrange"),
            t.isStartRange && e.push("is-startrange"),
            t.isEndRange && e.push("is-endrange"),
            '<td data-day="' + t.day + '" class="' + e.join(" ") + '" aria-selected="' + i + '"><button class="pika-button pika-day" type="button" data-pika-year="' + t.year + '" data-pika-month="' + t.month + '" data-pika-day="' + t.day + '">' + t.day + "</button></td>"
        }
            , S = function(t, e, i) {
            var n = new Date(i,0,1)
                , s = Math.ceil(((new Date(i,e,t) - n) / 864e5 + n.getDay() + 1) / 7);
            return '<td class="pika-week">' + s + "</td>"
        }
            , C = function(t, e, i, n) {
            return '<tr class="pika-row' + (i ? " pick-whole-week" : "") + (n ? " is-selected" : "") + '">' + (e ? t.reverse() : t).join("") + "</tr>"
        }
            , L = function(t) {
            return "<tbody>" + t.join("") + "</tbody>"
        }
            , E = function(t) {
            var e, i = [];
            for (t.showWeekNumber && i.push("<th></th>"),
                     e = 0; e < 7; e++)
                i.push('<th scope="col"><abbr title="' + T(t, e) + '">' + T(t, e, !0) + "</abbr></th>");
            return "<thead><tr>" + (t.isRTL ? i.reverse() : i).join("") + "</tr></thead>"
        }
            , k = function(t, e, i, n, s, r) {
            var o, a, l, h, c, d = t._o, f = i === d.minYear, p = i === d.maxYear, m = '<div id="' + r + '" class="pika-title" role="heading" aria-live="assertive">', _ = !0, g = !0;
            for (l = [],
                     o = 0; o < 12; o++)
                l.push('<option value="' + (i === s ? o - e : 12 + o - e) + '"' + (o === n ? ' selected="selected"' : "") + (f && o < d.minMonth || p && o > d.maxMonth ? 'disabled="disabled"' : "") + ">" + d.i18n.months[o] + "</option>");
            for (h = '<div class="pika-label">' + d.i18n.months[n] + '<select class="pika-select pika-select-month" tabindex="-1">' + l.join("") + "</select></div>",
                     u(d.yearRange) ? (o = d.yearRange[0],
                         a = d.yearRange[1] + 1) : (o = i - d.yearRange,
                         a = 1 + i + d.yearRange),
                     l = []; o < a && o <= d.maxYear; o++)
                o >= d.minYear && l.push('<option value="' + o + '"' + (o === i ? ' selected="selected"' : "") + ">" + o + "</option>");
            return c = '<div class="pika-label">' + i + d.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + l.join("") + "</select></div>",
                m += d.showMonthAfterYear ? c + h : h + c,
            f && (0 === n || d.minMonth >= n) && (_ = !1),
            p && (11 === n || d.maxMonth <= n) && (g = !1),
            0 === e && (m += '<button class="pika-prev' + (_ ? "" : " is-disabled") + '" type="button">' + d.i18n.previousMonth + "</button>"),
            e === t._o.numberOfMonths - 1 && (m += '<button class="pika-next' + (g ? "" : " is-disabled") + '" type="button">' + d.i18n.nextMonth + "</button>"),
                m += "</div>"
        }
            , P = function(t, e, i) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + i + '">' + E(t) + L(e) + "</table>"
        }
            , A = function(o) {
            var a = this
                , h = a.config(o);
            a._onMouseDown = function(t) {
                if (a._v) {
                    t = t || window.event;
                    var e = t.target || t.srcElement;
                    if (e)
                        if (l(e, "is-disabled") || (!l(e, "pika-button") || l(e, "is-empty") || l(e.parentNode, "is-disabled") ? l(e, "pika-prev") ? a.prevMonth() : l(e, "pika-next") && a.nextMonth() : (a.setDate(new Date(e.getAttribute("data-pika-year"),e.getAttribute("data-pika-month"),e.getAttribute("data-pika-day"))),
                        h.bound && s(function() {
                            a.hide(),
                            h.blurFieldOnSelect && h.field && h.field.blur()
                        }, 100))),
                            l(e, "pika-select"))
                            a._c = !0;
                        else {
                            if (!t.preventDefault)
                                return t.returnValue = !1,
                                    !1;
                            t.preventDefault()
                        }
                }
            }
                ,
                a._onChange = function(t) {
                    t = t || window.event;
                    var e = t.target || t.srcElement;
                    e && (l(e, "pika-select-month") ? a.gotoMonth(e.value) : l(e, "pika-select-year") && a.gotoYear(e.value))
                }
                ,
                a._onKeyChange = function(t) {
                    if (t = t || window.event,
                        a.isVisible())
                        switch (t.keyCode) {
                            case 13:
                            case 27:
                                h.field && h.field.blur();
                                break;
                            case 37:
                                t.preventDefault(),
                                    a.adjustDate("subtract", 1);
                                break;
                            case 38:
                                a.adjustDate("subtract", 7);
                                break;
                            case 39:
                                a.adjustDate("add", 1);
                                break;
                            case 40:
                                a.adjustDate("add", 7)
                        }
                }
                ,
                a._onInputChange = function(i) {
                    var n;
                    i.firedBy !== a && (h.parse ? n = h.parse(h.field.value, h.format) : e ? (n = t(h.field.value, h.format, h.formatStrict),
                        n = n && n.isValid() ? n.toDate() : null) : n = new Date(Date.parse(h.field.value)),
                    d(n) && a.setDate(n),
                    a._v || a.show())
                }
                ,
                a._onInputFocus = function() {
                    a.show()
                }
                ,
                a._onInputClick = function() {
                    a.show()
                }
                ,
                a._onInputBlur = function() {
                    var t = n.activeElement;
                    do
                        if (l(t, "pika-single"))
                            return;
                    while (t = t.parentNode);a._c || (a._b = s(function() {
                        a.hide()
                    }, 50)),
                        a._c = !1
                }
                ,
                a._onClick = function(t) {
                    t = t || window.event;
                    var e = t.target || t.srcElement
                        , n = e;
                    if (e) {
                        !i && l(e, "pika-select") && (e.onchange || (e.setAttribute("onchange", "return;"),
                            r(e, "change", a._onChange)));
                        do
                            if (l(n, "pika-single") || n === h.trigger)
                                return;
                        while (n = n.parentNode);a._v && e !== h.trigger && n !== h.trigger && a.hide()
                    }
                }
                ,
                a.el = n.createElement("div"),
                a.el.className = "pika-single" + (h.isRTL ? " is-rtl" : "") + (h.theme ? " " + h.theme : ""),
                r(a.el, "mousedown", a._onMouseDown, !0),
                r(a.el, "touchend", a._onMouseDown, !0),
                r(a.el, "change", a._onChange),
            h.keyboardInput && r(n, "keydown", a._onKeyChange),
            h.field && (h.container ? h.container.appendChild(a.el) : h.bound ? n.body.appendChild(a.el) : h.field.parentNode.insertBefore(a.el, h.field.nextSibling),
                r(h.field, "change", a._onInputChange),
            h.defaultDate || (e && h.field.value ? h.defaultDate = t(h.field.value, h.format).toDate() : h.defaultDate = new Date(Date.parse(h.field.value)),
                h.setDefaultDate = !0));
            var c = h.defaultDate;
            d(c) ? h.setDefaultDate ? a.setDate(c, !0) : a.gotoDate(c) : a.gotoDate(new Date),
                h.bound ? (this.hide(),
                    a.el.className += " is-bound",
                    r(h.trigger, "click", a._onInputClick),
                    r(h.trigger, "focus", a._onInputFocus),
                    r(h.trigger, "blur", a._onInputBlur)) : this.show()
        };
        return A.prototype = {
            config: function(t) {
                this._o || (this._o = v({}, w, !0));
                var e = v(this._o, t, !0);
                e.isRTL = !!e.isRTL,
                    e.field = e.field && e.field.nodeName ? e.field : null,
                    e.theme = "string" == typeof e.theme && e.theme ? e.theme : null,
                    e.bound = !!(void 0 !== e.bound ? e.field && e.bound : e.field),
                    e.trigger = e.trigger && e.trigger.nodeName ? e.trigger : e.field,
                    e.disableWeekends = !!e.disableWeekends,
                    e.disableDayFn = "function" == typeof e.disableDayFn ? e.disableDayFn : null;
                var i = parseInt(e.numberOfMonths, 10) || 1;
                if (e.numberOfMonths = i > 4 ? 4 : i,
                d(e.minDate) || (e.minDate = !1),
                d(e.maxDate) || (e.maxDate = !1),
                e.minDate && e.maxDate && e.maxDate < e.minDate && (e.maxDate = e.minDate = !1),
                e.minDate && this.setMinDate(e.minDate),
                e.maxDate && this.setMaxDate(e.maxDate),
                    u(e.yearRange)) {
                    var n = (new Date).getFullYear() - 10;
                    e.yearRange[0] = parseInt(e.yearRange[0], 10) || n,
                        e.yearRange[1] = parseInt(e.yearRange[1], 10) || n
                } else
                    e.yearRange = Math.abs(parseInt(e.yearRange, 10)) || w.yearRange,
                    e.yearRange > 100 && (e.yearRange = 100);
                return e
            },
            toString: function(i) {
                return i = i || this._o.format,
                    d(this._d) ? this._o.toString ? this._o.toString(this._d, i) : e ? t(this._d).format(i) : this._d.toDateString() : ""
            },
            getMoment: function() {
                return e ? t(this._d) : null
            },
            setMoment: function(i, n) {
                e && t.isMoment(i) && this.setDate(i.toDate(), n)
            },
            getDate: function() {
                return d(this._d) ? new Date(this._d.getTime()) : null
            },
            setDate: function(t, e) {
                if (!t)
                    return this._d = null,
                    this._o.field && (this._o.field.value = "",
                        y(this._o.field, "change", {
                            firedBy: this
                        })),
                        this.draw();
                if ("string" == typeof t && (t = new Date(Date.parse(t))),
                    d(t)) {
                    var i = this._o.minDate
                        , n = this._o.maxDate;
                    d(i) && t < i ? t = i : d(n) && t > n && (t = n),
                        this._d = new Date(t.getTime()),
                        _(this._d),
                        this.gotoDate(this._d),
                    this._o.field && (this._o.field.value = this.toString(),
                        y(this._o.field, "change", {
                            firedBy: this
                        })),
                    e || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate())
                }
            },
            gotoDate: function(t) {
                var e = !0;
                if (d(t)) {
                    if (this.calendars) {
                        var i = new Date(this.calendars[0].year,this.calendars[0].month,1)
                            , n = new Date(this.calendars[this.calendars.length - 1].year,this.calendars[this.calendars.length - 1].month,1)
                            , s = t.getTime();
                        n.setMonth(n.getMonth() + 1),
                            n.setDate(n.getDate() - 1),
                            e = s < i.getTime() || n.getTime() < s
                    }
                    e && (this.calendars = [{
                        month: t.getMonth(),
                        year: t.getFullYear()
                    }],
                    "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)),
                        this.adjustCalendars()
                }
            },
            adjustDate: function(t, e) {
                var i, n = this.getDate() || new Date, s = 24 * parseInt(e) * 60 * 60 * 1e3;
                "add" === t ? i = new Date(n.valueOf() + s) : "subtract" === t && (i = new Date(n.valueOf() - s)),
                    this.setDate(i)
            },
            adjustCalendars: function() {
                this.calendars[0] = b(this.calendars[0]);
                for (var t = 1; t < this._o.numberOfMonths; t++)
                    this.calendars[t] = b({
                        month: this.calendars[0].month + t,
                        year: this.calendars[0].year
                    });
                this.draw()
            },
            gotoToday: function() {
                this.gotoDate(new Date)
            },
            gotoMonth: function(t) {
                isNaN(t) || (this.calendars[0].month = parseInt(t, 10),
                    this.adjustCalendars())
            },
            nextMonth: function() {
                this.calendars[0].month++,
                    this.adjustCalendars()
            },
            prevMonth: function() {
                this.calendars[0].month--,
                    this.adjustCalendars()
            },
            gotoYear: function(t) {
                isNaN(t) || (this.calendars[0].year = parseInt(t, 10),
                    this.adjustCalendars())
            },
            setMinDate: function(t) {
                t instanceof Date ? (_(t),
                    this._o.minDate = t,
                    this._o.minYear = t.getFullYear(),
                    this._o.minMonth = t.getMonth()) : (this._o.minDate = w.minDate,
                    this._o.minYear = w.minYear,
                    this._o.minMonth = w.minMonth,
                    this._o.startRange = w.startRange),
                    this.draw()
            },
            setMaxDate: function(t) {
                t instanceof Date ? (_(t),
                    this._o.maxDate = t,
                    this._o.maxYear = t.getFullYear(),
                    this._o.maxMonth = t.getMonth()) : (this._o.maxDate = w.maxDate,
                    this._o.maxYear = w.maxYear,
                    this._o.maxMonth = w.maxMonth,
                    this._o.endRange = w.endRange),
                    this.draw()
            },
            setStartRange: function(t) {
                this._o.startRange = t
            },
            setEndRange: function(t) {
                this._o.endRange = t
            },
            draw: function(t) {
                if (this._v || t) {
                    var e, i = this._o, n = i.minYear, r = i.maxYear, o = i.minMonth, a = i.maxMonth, l = "";
                    this._y <= n && (this._y = n,
                    !isNaN(o) && this._m < o && (this._m = o)),
                    this._y >= r && (this._y = r,
                    !isNaN(a) && this._m > a && (this._m = a)),
                        e = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
                    for (var h = 0; h < i.numberOfMonths; h++)
                        l += '<div class="pika-lendar">' + k(this, h, this.calendars[h].year, this.calendars[h].month, this.calendars[0].year, e) + this.render(this.calendars[h].year, this.calendars[h].month, e) + "</div>";
                    this.el.innerHTML = l,
                    i.bound && "hidden" !== i.field.type && s(function() {
                        i.trigger.focus()
                    }, 1),
                    "function" == typeof this._o.onDraw && this._o.onDraw(this),
                    i.bound && i.field.setAttribute("aria-label", i.ariaLabel)
                }
            },
            adjustPosition: function() {
                var t, e, i, s, r, o, a, l, h, c;
                if (!this._o.container) {
                    if (this.el.style.position = "absolute",
                        t = this._o.trigger,
                        e = t,
                        i = this.el.offsetWidth,
                        s = this.el.offsetHeight,
                        r = window.innerWidth || n.documentElement.clientWidth,
                        o = window.innerHeight || n.documentElement.clientHeight,
                        a = window.pageYOffset || n.body.scrollTop || n.documentElement.scrollTop,
                    "function" == typeof t.getBoundingClientRect)
                        c = t.getBoundingClientRect(),
                            l = c.left + window.pageXOffset,
                            h = c.bottom + window.pageYOffset;
                    else
                        for (l = e.offsetLeft,
                                 h = e.offsetTop + e.offsetHeight; e = e.offsetParent; )
                            l += e.offsetLeft,
                                h += e.offsetTop;
                    (this._o.reposition && l + i > r || this._o.position.indexOf("right") > -1 && l - i + t.offsetWidth > 0) && (l = l - i + t.offsetWidth),
                    (this._o.reposition && h + s > o + a || this._o.position.indexOf("top") > -1 && h - s - t.offsetHeight > 0) && (h = h - s - t.offsetHeight),
                        this.el.style.left = l + "px",
                        this.el.style.top = h + "px"
                }
            },
            render: function(t, e, i) {
                var n = this._o
                    , s = new Date
                    , r = m(t, e)
                    , o = new Date(t,e,1).getDay()
                    , a = []
                    , l = [];
                _(s),
                n.firstDay > 0 && (o -= n.firstDay,
                o < 0 && (o += 7));
                for (var h = 0 === e ? 11 : e - 1, c = 11 === e ? 0 : e + 1, u = 0 === e ? t - 1 : t, p = 11 === e ? t + 1 : t, v = m(u, h), y = r + o, b = y; b > 7; )
                    b -= 7;
                y += 7 - b;
                for (var w = !1, T = 0, L = 0; T < y; T++) {
                    var E = new Date(t,e,1 + (T - o))
                        , k = !!d(this._d) && g(E, this._d)
                        , A = g(E, s)
                        , O = n.events.indexOf(E.toDateString()) !== -1
                        , N = T < o || T >= r + o
                        , $ = 1 + (T - o)
                        , D = e
                        , M = t
                        , R = n.startRange && g(n.startRange, E)
                        , I = n.endRange && g(n.endRange, E)
                        , j = n.startRange && n.endRange && n.startRange < E && E < n.endRange
                        , F = n.minDate && E < n.minDate || n.maxDate && E > n.maxDate || n.disableWeekends && f(E) || n.disableDayFn && n.disableDayFn(E);
                    N && (T < o ? ($ = v + $,
                        D = h,
                        M = u) : ($ -= r,
                        D = c,
                        M = p));
                    var H = {
                        day: $,
                        month: D,
                        year: M,
                        hasEvent: O,
                        isSelected: k,
                        isToday: A,
                        isDisabled: F,
                        isEmpty: N,
                        isStartRange: R,
                        isEndRange: I,
                        isInRange: j,
                        showDaysInNextAndPreviousMonths: n.showDaysInNextAndPreviousMonths,
                        enableSelectionDaysInNextAndPreviousMonths: n.enableSelectionDaysInNextAndPreviousMonths
                    };
                    n.pickWholeWeek && k && (w = !0),
                        l.push(x(H)),
                    7 === ++L && (n.showWeekNumber && l.unshift(S(T - o, e, t)),
                        a.push(C(l, n.isRTL, n.pickWholeWeek, w)),
                        l = [],
                        L = 0,
                        w = !1)
                }
                return P(n, a, i)
            },
            isVisible: function() {
                return this._v
            },
            show: function() {
                this.isVisible() || (this._v = !0,
                    this.draw(),
                    c(this.el, "is-hidden"),
                this._o.bound && (r(n, "click", this._onClick),
                    this.adjustPosition()),
                "function" == typeof this._o.onOpen && this._o.onOpen.call(this))
            },
            hide: function() {
                var t = this._v;
                t !== !1 && (this._o.bound && o(n, "click", this._onClick),
                    this.el.style.position = "static",
                    this.el.style.left = "auto",
                    this.el.style.top = "auto",
                    h(this.el, "is-hidden"),
                    this._v = !1,
                void 0 !== t && "function" == typeof this._o.onClose && this._o.onClose.call(this))
            },
            destroy: function() {
                var t = this._o;
                this.hide(),
                    o(this.el, "mousedown", this._onMouseDown, !0),
                    o(this.el, "touchend", this._onMouseDown, !0),
                    o(this.el, "change", this._onChange),
                t.keyboardInput && o(n, "keydown", this._onKeyChange),
                t.field && (o(t.field, "change", this._onInputChange),
                t.bound && (o(t.trigger, "click", this._onInputClick),
                    o(t.trigger, "focus", this._onInputFocus),
                    o(t.trigger, "blur", this._onInputBlur))),
                this.el.parentNode && this.el.parentNode.removeChild(this.el)
            }
        },
            A
    });
var N66 = N66 || {};
N66.CustomEvent = function(t) {
    "use strict";
    function e() {
        this.e = {},
            this.E = {},
            this.isWarningDispatched = !1
    }
    return e.prototype.bind = function(t, e, i) {
        if (t && e)
            i || N66.Config.IS_PROD || console.warn('Bind "' + t + '" custom event without context.'),
            void 0 === this.e[t] && (this.e[t] = new signals.Signal),
                this.e[t].add(e, i);
        else if (!N66.Config.IS_PROD) {
            var n;
            t || e ? t ? e || (n = "function") : n = "name" : n = "name and a function",
                console.warn("You must to provide a " + n + " to the custom event you want to bind.")
        }
    }
        ,
        e.prototype.unbind = function(t, e, i) {
            return t ? (void 0 !== e && null !== e ? this.e[t].remove(e, i) : this.e[t].removeAll(),
                void (0 === this.e[t].getNumListeners() && (this.e[t].dispose(),
                    delete this.e[t]))) : void (N66.Config.IS_PROD || console.warn("You must to define the name of the custom event you want to unbind."))
        }
        ,
        e.prototype.dispatch = function(t, e) {
            return void 0 === this.e[t] ? void (N66.Config.IS_PROD || this.isWarningDispatched || (console.warn('Trying to dispath "' + t + '" custom event which is undefined.'),
                this.isWarningDispatched = !0)) : void (void 0 === e ? this.e[t].dispatch() : this.e[t].dispatch(e))
        }
        ,
        e
}(window),
    N66.Config = function(t) {
        "use strict";
        function e() {
            this.ENV = null,
                this.ENVS = null,
                this.ALL_LANG = null,
                this.FORCE_DEVICE = null,
                this.GA_ID = null,
                this.CREDITS = null,
                this.IS_DEV = null,
                this.IS_PREPROD_LOCAL = null,
                this.IS_PREPROD = null,
                this.IS_PROD = null,
                this.NEED_PAGE_ID = null,
                this.JS_VIEWS_ID = null,
                this.HAS_FPS_STATS = null,
                this.HAS_MEMORY_STATS = null
        }
        e.prototype.init = function() {
            i.call(this),
                n.call(this),
                s.call(this)
        }
        ;
        var i = function() {
            for (var t in STF_Config)
                this[t] = STF_Config[t]
        }
            , n = function() {
            this.JS_VIEWS_ID = STF_JS_VIEWS_ID
        }
            , s = function() {
            console.log("%cmade by %c— " + this.CREDITS.author + " —%c " + this.CREDITS.authorUrl, "padding:8px 5px; color:" + this.CREDITS.color1 + "; line-height:25px;", "padding:8px 15px; color:" + this.CREDITS.color2 + "; background-color:" + this.CREDITS.color3 + "; line-height:25px;", "padding:8px 5px; color:" + this.CREDITS.color3 + "; line-height:25px;")
        };
        return e.prototype.setFPSStats = function(t) {
            this.HAS_FPS_STATS = t
        }
            ,
            e.prototype.setMemoryStats = function(t) {
                this.HAS_MEMORY_STATS = t
            }
            ,
            new e
    }(window),
    N66.Props = function(t) {
        "use strict";
        function e() {
            this.HAS_PUSHSTATE = null,
                this.TRANSFORM = null,
                this.HAS_TRANSFORMS = null,
                this.HAS_TRANSFORMS_3D = null,
                this.HAS_TRANSITIONS = null,
                this.HAS_ANIMATIONS = null
        }
        e.prototype.init = function() {
            i.call(this)
        }
            ,
            e.prototype.testIO = function() {
                if (!t.hasOwnProperty("IntersectionObserver")) {
                    var e = document.createElement("script");
                    e.type = "text/javascript",
                        e.src = N66.Path.URL.js + "vendor/intersection-observer.js",
                        document.body.appendChild(e)
                }
            }
        ;
        var i = function() {
            this.HAS_PUSHSTATE = Modernizr.history,
                this.TRANSFORM = Modernizr.prefixed("transform"),
                this.HAS_TRANSFORMS = Modernizr.csstransforms,
                this.HAS_TRANSFORMS_3D = Modernizr.csstransforms3d,
                this.HAS_TRANSITIONS = Modernizr.csstransitions,
                this.HAS_ANIMATIONS = Modernizr.cssanimations
        };
        return new e
    }(window),
    N66.Device = function(t) {
        "use strict";
        function e() {
            this.HAS_MOBILE_VERSION = null,
                this.TABLET_VERSION = null,
                this.FORCE_DEVICE = null,
                this.DEVICE = null,
                this.IS_DESKTOP = null,
                this.IS_TABLET = null,
                this.IS_MOBILE = null,
                this.BROWSER = null,
                this.BROWSER_VERSION = null,
                this.BROWSER_ENGINE = null,
                this.IS_OLD_BROWSER = null,
                this.IS_IE = null,
                this.IS_EDGE = null
        }
        e.prototype.init = function() {
            i.call(this),
                n.call(this)
        }
        ;
        var i = function() {
            for (var t in STF_Device)
                this[t] = STF_Device[t]
        }
            , n = function() {
            this.IS_MOBILE = null != Modernizr.mobile,
                this.IS_TABLET = null != Modernizr.tablet,
                this.IS_DESKTOP = null != Modernizr.desktop
        };
        return new e
    }(window),
    N66.Path = function(t) {
        "use strict";
        function e() {
            this.URL = null
        }
        e.prototype.init = function() {
            i.call(this)
        }
        ;
        var i = function() {
            var t = N66.Config.ENVS.base_url;
            this.URL = {
                base: t,
                assets: t + "assets/",
                css: t + "assets/css/",
                favicons: t + "assets/favicons/",
                files: t + "assets/files/",
                img: t + "assets/img/",
                js: t + "assets/js/",
                json: t + "assets/json/",
                sounds: t + "assets/sounds/",
                svg: t + "assets/svg/",
                videos: t + "assets/videos/",
                routes: t + "configs/routes/",
                server: t + "server/"
            }
        };
        return e.prototype.overwriteSpecialPaths = function() {
            var t = N66.MainView.$mainCont[0].getAttribute("data-assets-base-url");
            for (var e in this.URL)
                this.URL[e] = this.URL[e].replace("assets/", t)
        }
            ,
            new e
    }(window),
    N66.Lang = function(t) {
        "use strict";
        function e() {}
        e.prototype.init = function() {
            i.call(this),
                N66.Router.setUrl(!0, null),
                n.call(this),
                s.call(this),
                r.call(this)
        }
        ;
        var i = function() {
            this.ALL_LANG = N66.Config.ALL_LANG,
                this.DEFAULT_LANG = this.ALL_LANG[0],
                1 == this.ALL_LANG.length ? this.MULTI_LANG = !1 : this.MULTI_LANG = !0
        }
            , n = function() {
            this.MULTI_LANG && 0 !== N66.Router.URL.path.length ? this.LANG = N66.Router.URL.pathParams[0] : this.LANG = this.DEFAULT_LANG
        }
            , s = function() {
            this.ALL_LANG.indexOf(this.LANG) < 0 && (this.LANG = this.DEFAULT_LANG)
        }
            , r = function() {
            this.LANG_LINK_ROOT = this.LANG == this.DEFAULT_LANG ? "" : this.LANG,
                this.LANG_LINK = this.MULTI_LANG ? this.LANG + "/" : ""
        };
        return new e
    }(window),
    N66.AbstractAssets = function(t) {
        "use strict";
        function e() {
            this.aImg = {},
                this.aJson = {},
                this.jsonData = {}
        }
        e.prototype.init = function() {}
            ,
            e.prototype.getAssetsToLoad = function(t, e, n) {
                var o = i.call(this, t, e, n)
                    , a = [];
                return a = s.call(this, "img", a, o),
                    a = s.call(this, "json", a, o),
                "byPageDynamic" == n && (a = r.call(this, e, a)),
                    a
            }
        ;
        var i = function(t, e, i) {
            var s = [];
            return e && "allStatic" == i ? s = n.call(this) : e && "byPageStatic" == i || e && "byPageDynamic" == i ? s = ["global", t] : (!e && "byPageStatic" == i || !e && "byPageDynamic" == i) && (s = [t]),
                s
        }
            , n = function() {
            var t = [];
            for (var e in this.aImg)
                t.push(e);
            for (e in this.aJson)
                t.indexOf(e) < 0 && t.push(e);
            return t
        }
            , s = function(t, e, i) {
            for (var n, s = "img" == t ? this.aImg : this.aJson, r = 0; r < i.length; r++) {
                n = s[i[r]];
                var a;
                if (void 0 !== n)
                    for (var l in n)
                        a = "object" === STF_gl_getType(n) ? l : null,
                            o.call(this, e, a, n[l])
            }
            return e
        }
            , r = function(t, e) {
            for (var i = t ? N66.MainView.$mainCont.find(N66.PagesController.DYNAMIC_IMG_TO_LOAD) : N66.MainView.$pageCont.find(N66.PagesController.DYNAMIC_IMG_TO_LOAD), n = 0; n < i.length; n++)
                "true" != i[n].getAttribute("data-lazyload") && o.call(this, e, null, i[n].getAttribute("data-src"));
            return e
        }
            , o = function(t, e, i) {
            return t.indexOf(i) < 0 && null === e ? t.push(i) : t.indexOf(i) < 0 && null !== e ? t.push({
                id: e,
                src: i
            }) : void (N66.Config.IS_PROD || console.warn("AbstractAssets:" + i + " already added to the loading assets list!"))
        };
        return e.prototype.setJsonData = function(t, e) {
            this.jsonData[t] = e
        }
            ,
            e
    }(window),
    N66.AbstractView = function(t) {
        "use strict";
        function e() {
            N66.CustomEvent.call(this),
                this.E = {
                    SHOW: "show",
                    SHOWN: "shown",
                    HIDE: "hide",
                    HIDDEN: "hidden"
                },
                this.tw = {},
                this.tl = {},
                this.isInit = !1
        }
        return e.prototype = Object.create(N66.CustomEvent.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.initDOM(),
                    this.initEl(),
                    this.initTl(),
                    this.bindEvents(),
                    this.resize()
            }
            ,
            e.prototype.initDOM = function() {}
            ,
            e.prototype.initEl = function() {}
            ,
            e.prototype.initTl = function() {}
            ,
            e.prototype.bindEvents = function() {
                N66.MainView.bind(N66.MainView.E.RESIZE, this.resize, this)
            }
            ,
            e.prototype.unbindEvents = function() {
                N66.MainView.unbind(N66.MainView.E.RESIZE, this.resize, this)
            }
            ,
            e.prototype.initView = function() {
                this.isInit = !0
            }
            ,
            e.prototype.show = function() {}
            ,
            e.prototype.hide = function() {}
            ,
            e.prototype.resize = function() {}
            ,
            e.prototype.raf = function() {}
            ,
            e.prototype.destroy = function() {
                this.isInit = !1,
                    this.unbindEvents(),
                    this.destroyGSAP()
            }
            ,
            e.prototype.destroyGSAP = function() {
                for (var t in this.tw)
                    this.killTween(t);
                for (var e in this.tl)
                    this.killTimeline(e);
                this.tl = {},
                    this.tw = {}
            }
            ,
            e.prototype.killTween = function(t) {
                this.tw[t] && (this.tw[t].kill(),
                    this.tw[t] = null)
            }
            ,
            e.prototype.killTimeline = function(t) {
                this.tl[t] && (this.tl[t].stop(),
                    this.tl[t].clear(),
                    this.tl[t].kill(),
                    this.tl[t] = null)
            }
            ,
            e.prototype.changeUrl = function(t, e, i, n, s, r) {
                if (!(t.ctrlKey || t.shiftKey || t.metaKey || t.button && 1 == t.button)) {
                    if (N66.MainView.wW > 1020) {
                        t.currentTarget
                    }
                    var o, a;
                    "object" == typeof t ? (t.preventDefault(),
                        o = t.currentTarget.href) : "string" == typeof t ? o = t : "function" == typeof t && (o = !1,
                        a = t),
                        N66.PagesController.page.hide(o, a)
                }
            }
            ,
            e.prototype.updateSearch = function() {
                N66.Config.IS_PROD || console.warn("You need to override the updateSearch() method from AbstractView in the current page view.")
            }
            ,
            e.prototype.updateHash = function() {
                N66.Config.IS_PROD || console.warn("You need to override the updateHash() method from AbstractView in the current page view.")
            }
            ,
            e
    }(window),
    N66.AbstractMainView = function(t) {
        "use strict";
        function e() {
            N66.AbstractView.call(this),
                this.E = {
                    RESIZE: "resize",
                    RAF: "raf",
                    MOUSE_MOVE: "mousemove",
                    MOUSE_DOWN: "mousedown",
                    MOUSE_UP: "mouseup",
                    TOUCH_MOVE: "touchmove",
                    TOUCH_START: "touchstart",
                    TOUCH_END: "touchend",
                    WINDOW_OUT: "windowout",
                    WINDOW_IN: "windowin"
                },
                this.bW = null,
                this.bH = null,
                this.wW = null,
                this.wH = null,
                this.cX = null,
                this.cY = null,
                this.sY = null,
                this.siY = null,
                this.mX = null,
                this.mY = null,
                this.miX = null,
                this.miY = null,
                this.tX = null,
                this.tY = null,
                this.SCROLL_INERTIA = .1,
                this.MOUSE_INERTIA = .03,
                this.isWindowFocused = !0
        }
        e.prototype = Object.create(N66.AbstractView.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.initDOM(),
                    this.initEl(),
                    this.initTl(),
                    this.bindEvents(),
                    this.initStaticsViews(),
                    this.resize()
            }
            ,
            e.prototype.initDOM = function() {
                this.$window = $(t),
                    this.$body = $(document.body),
                    this.$mainCont = $(document.getElementById("main-container")),
                    this.$pageCont = $(document.getElementById("page-container"))
            }
            ,
            e.prototype.initEl = function() {
                N66.Path.overwriteSpecialPaths()
            }
            ,
            e.prototype.bindEvents = function() {
                N66.Device.IS_TABLET || N66.Device.IS_MOBILE ? this.$window.on("orientationchange", $.proxy(this.resize, this)) : this.$window.on("resize", $.proxy(this.resize, this)),
                    TweenLite.ticker.addEventListener("tick", this.raf, this)
            }
            ,
            e.prototype.initStaticsViews = function() {
                N66.Views.Statics.MainLoader.init(),
                    N66.Views.Statics.Header.init(),
                    N66.Views.Statics.Footer.init(),
                    STF_dom_removeClass(this.$mainCont[0], "preload")
            }
            ,
            e.prototype.disableScrollRestoration = function() {
                "scrollRestoration"in history && (history.scrollRestoration = "manual")
            }
            ,
            e.prototype.resize = function() {
                i.call(this),
                    this.dispatch(this.E.RESIZE)
            }
        ;
        var i = function() {
            this.bW = this.$body.width(),
                this.bH = this.$body.height(),
                this.wW = this.$window.width(),
                this.wH = this.$window.height(),
                this.cX = Math.round(this.bW / 2),
                this.cY = Math.round(this.wH / 2),
            null === this.mX && null === this.mY && (this.mX = this.cX,
                this.mY = this.cY)
        };
        e.prototype.raf = function() {
            N66.Config.HAS_FPS_STATS && (N66.Config.IS_DEV || N66.Config.IS_PREPROD_LOCAL) && N66.Utils.FPSStats.begin(),
                n.call(this),
                this.dispatch(this.E.RAF),
            N66.Config.HAS_FPS_STATS && (N66.Config.IS_DEV || N66.Config.IS_PREPROD_LOCAL) && N66.Utils.FPSStats.end(),
            N66.Config.HAS_MEMORY_STATS && (N66.Config.IS_DEV || N66.Config.IS_PREPROD_LOCAL) && N66.Utils.MemoryStats.update()
        }
        ;
        var n = function() {
            this.sY = this.$window[0].scrollY || this.$window[0].pageYOffset,
                this.siY = STF_math_getInertia(this.sY, this.siY, this.SCROLL_INERTIA),
                this.miX = STF_math_getInertia(this.mX, this.miX, this.MOUSE_INERTIA),
                this.miY = STF_math_getInertia(this.mY, this.miY, this.MOUSE_INERTIA)
        };
        return e.prototype.mouseMove = function(t) {
            this.mX = t.clientX,
                this.mY = t.clientY,
                this.dispatch(this.E.MOUSE_MOVE)
        }
            ,
            e.prototype.mouseDown = function() {
                this.dispatch(this.E.MOUSE_DOWN)
            }
            ,
            e.prototype.mouseUp = function() {
                this.dispatch(this.E.MOUSE_UP)
            }
            ,
            e.prototype.touchMove = function(t) {
                t.preventDefault(),
                    this.tX = t.touches[0].pageX,
                    this.tY = t.touches[0].pageY,
                    this.dispatch(this.E.TOUCH_MOVE)
            }
            ,
            e.prototype.touchStart = function() {
                this.dispatch(this.E.TOUCH_START)
            }
            ,
            e.prototype.touchEnd = function() {
                this.dispatch(this.E.TOUCH_END)
            }
            ,
            e.prototype.windowOut = function() {
                this.isWindowFocused = !1,
                    this.dispatch(this.E.WINDOW_OUT)
            }
            ,
            e.prototype.windowIn = function() {
                this.isWindowFocused = !0,
                    this.dispatch(this.E.WINDOW_IN)
            }
            ,
            e.prototype.setScrollY = function(t) {
                this.sY = t,
                    this.siY = t,
                    this.$window[0].scrollTo(0, t)
            }
            ,
            e.prototype.setBodyHeight = function(t) {
                null === t && (t = this.$pageCont.height()),
                    this.$body[0].style.height = t + "px"
            }
            ,
            e.prototype.initAfterAssetsLoaded = function() {}
            ,
            e
    }(window),
    N66.AbstractMainLoader = function(t) {
        "use strict";
        function e() {
            N66.AbstractView.call(this),
                this.E = {
                    PROGRESS: "progress",
                    FILE_LOAD: "fileLoad",
                    COMPLETE: "complete",
                    SHOWN: "shown",
                    HIDDEN: "hidden"
                }
        }
        e.prototype = Object.create(N66.AbstractView.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                N66.AbstractView.prototype.init.call(this),
                    i.call(this)
            }
            ,
            e.prototype.initDOM = function() {}
            ,
            e.prototype.initTl = function() {}
            ,
            e.prototype.resize = function() {
                N66.AbstractView.prototype.resize.call(this)
            }
        ;
        var i = function() {
            this.assetsLoader = new N66.Loader((!0),(!0)),
                this.assetsLoader.init(),
                this.assetsLoader.bind(this.assetsLoader.E.PROGRESS, this.onProgress, this),
                this.assetsLoader.bind(this.assetsLoader.E.FILE_LOAD, n, this),
                this.assetsLoader.bind(this.assetsLoader.E.COMPLETE, s, this)
        };
        e.prototype.loadAssets = function(t) {
            this.assetsLoader.startLoad(t)
        }
            ,
            e.prototype.onProgress = function(t) {}
        ;
        var n = function(t) {
            this.dispatch(this.E.FILE_LOAD, t)
        }
            , s = function(t) {
            this.dispatch(this.E.COMPLETE, t)
        };
        return e
    }(window),
    N66.Router = function(t) {
        "use strict";
        function e() {
            N66.CustomEvent.call(this),
                this.URL = {},
                this.ALT_LANG_URL = {},
                this.isHomepage = null,
                this.isPageChange = null,
                this.isPageChangeByClick = null,
                this.isSearchChange = null,
                this.isHashChange = null
        }
        e.prototype = Object.create(N66.CustomEvent.prototype),
            e.prototype.constructor = e,
            e.prototype.setUrl = function(t, e) {
                this.URL.full = i.call(this, e),
                    this.URL.path = STF_str_getPath(this.URL.full),
                    this.URL.pathParams = this.URL.path.split("/"),
                    this.URL.search = STF_str_getSearch(this.URL.full),
                    this.URL.searchParams = STF_str_getParams(this.URL.full, "search"),
                    this.URL.hash = STF_str_getHash(this.URL.full),
                    this.URL.hashParams = STF_str_getParams(this.URL.full, "hash"),
                    this.URL.fullGA = n.call(this)
            }
        ;
        var i = function(e) {
            var i;
            return i = null === e ? t.location.href : e
        }
            , n = function() {
            var t = this.URL.full.replace(N66.Path.URL.base, "");
            return t
        };
        e.prototype.init = function() {
            s.call(this),
                N66.PagesController.initFirstPage()
        }
        ;
        var s = function() {
            N66.MainView.$window.on("popstate", $.proxy(r, this)),
                N66.MainView.$window.on("hashchange", $.proxy(o, this))
        };
        e.prototype.checkUrlCorrespondence = function() {
            this.URL.full != i.call(this, null) && r.call(this)
        }
            ,
            e.prototype.updateUrl = function(t) {
                if (!N66.PagesController.isPageChange) {
                    this.isPageChangeByClick = !0,
                        a.call(this, t),
                        this.setUrl(!1, t);
                    var e = {
                        isPageChange: this.isPageChange,
                        isSearchChange: this.isSearchChange,
                        isHashChange: this.isHashChange
                    };
                    history.pushState(e, "", t),
                        this.isPageChange ? N66.PagesController.changePage(this.URL.full) : this.isSearchChange ? N66.PagesController.changeSearch() : this.isHashChange && N66.PagesController.changeHash()
                }
            }
        ;
        var r = function(e) {
            N66.PagesController.isPageChange || (this.isPageChangeByClick = !1,
                a.call(this, t.location.href),
            (this.isPageChange || this.isSearchChange) && this.setUrl(!1, null),
                this.isPageChange ? N66.PagesController.changePage(this.URL.full) : this.isSearchChange && N66.PagesController.changeSearch())
        }
            , o = function(e) {
            N66.PagesController.isPageChange || (a.call(this, t.location.href),
                this.setUrl(!1, null),
            !this.isHashChange || this.isPageChange || this.isSearchChange || N66.PagesController.changeHash())
        }
            , a = function(t) {
            l.call(this, t),
                h.call(this, t),
                c.call(this, t)
        }
            , l = function(t) {
            var e = STF_str_getPath(t);
            this.isPageChange = this.URL.path != e
        }
            , h = function(t) {
            var e = STF_str_getSearch(t);
            this.isSearchChange = this.URL.search != e
        }
            , c = function(t) {
            var e = STF_str_getHash(t);
            this.isHashChange = this.URL.hash != e
        };
        return e.prototype.setAltLangUrl = function(t) {
            for (var e, i = 0; i < N66.Lang.ALL_LANG.length; i++)
                e = N66.Lang.ALL_LANG[i],
                e != N66.Lang.LANG && (this.ALT_LANG_URL[e] = t[0].getAttribute("data-lang-" + e))
        }
            ,
            e.prototype.updateGA = function() {
                if (N66.Config.IS_PROD && Object.keys(N66.Config.GA_ID).length > 0)
                    for (var t in N66.Config.GA_ID)
                        "default" == t ? ga("send", "pageview", "/" + this.URL.fullGA) : ga(t + ".send", "pageview", "/" + this.URL.fullGA)
            }
            ,
            new e
    }(window),
    N66.Models = N66.Models || {},
    N66.Models.Assets = function(t) {
        "use strict";
        function e() {
            N66.AbstractAssets.call(this)
        }
        return e.prototype = Object.create(N66.AbstractAssets.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.aImg = {
                    global: [],
                    "error-404": [],
                    "not-available": [],
                    home: [N66.Path.URL.img + "temp/home.jpg"]
                },
                    this.aJson = {
                        global: {},
                        home: {}
                    }
            }
            ,
            new e
    }(window),
    N66.Loader = function(t) {
        "use strict";
        function e(t, e) {
            N66.CustomEvent.call(this),
                this.isOnProgress = t,
                this.isOnFileLoad = e,
                this.E = {
                    STARTED: "started",
                    PROGRESS: "progress",
                    FILE_LOAD: "fileLoad",
                    COMPLETE: "complete",
                    ERROR: "error"
                },
                this.data = [],
                this.queue = null,
                this.init()
        }
        e.prototype = Object.create(N66.CustomEvent.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.queue = new createjs.LoadQueue((!0)),
                    this.bindEvents()
            }
            ,
            e.prototype.bindEvents = function() {
                this.queue.addEventListener("loadstart", $.proxy(i, this)),
                    this.queue.addEventListener("progress", $.proxy(n, this)),
                    this.queue.addEventListener("fileload", $.proxy(s, this)),
                    this.queue.addEventListener("complete", $.proxy(r, this)),
                    this.queue.addEventListener("error", $.proxy(o, this))
            }
            ,
            e.prototype.unbindEvents = function() {
                this.queue.removeAllEventListeners()
            }
            ,
            e.prototype.startLoad = function(t) {
                0 !== t.length ? this.queue.loadManifest(t) : r.call(this, null)
            }
            ,
            e.prototype.destroy = function() {
                this.unbindEvents(),
                    this.queue.removeAll()
            }
        ;
        var i = function(t) {}
            , n = function(t) {
            this.isOnProgress && this.dispatch(this.E.PROGRESS, 100 * t.progress)
        }
            , s = function(t) {
            this.isOnFileLoad ? this.dispatch(this.E.FILE_LOAD, t) : this.data[t.item.id] = t.result
        }
            , r = function(t) {
            this.queue.removeAll(),
                this.dispatch(this.E.COMPLETE, this.data)
        }
            , o = function(t) {};
        return e
    }(window),
    N66.LazyLoader = function(t) {
        "use strict";
        function e(t, e, i, n, s) {
            N66.CustomEvent.call(this),
                this.$container = t,
                this.CLASS_NAME = e,
                this.PARENT_EL = i,
                this.STACK_SIZE = n,
                this.posLoadedImg = 0,
                this.imgToLazyload = [],
                this.loaderImg = null,
            s && this.init()
        }
        return e.prototype = Object.create(N66.CustomEvent.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.initDOM(),
                    this.initEl(),
                    this.bindEvents(),
                    this.startLazyload.call(this)
            }
            ,
            e.prototype.initDOM = function() {
                this.$imgToLazyload = this.$container.find("img." + this.CLASS_NAME)
            }
            ,
            e.prototype.initEl = function() {
                this.loaderImg = new N66.Loader((!1),(!0));
                for (var t, e = 0; e < this.$imgToLazyload.length; e++)
                    t = this.$imgToLazyload[e].getAttribute("data-src"),
                    this.imgToLazyload.indexOf(t) < 0 && "preloaded" != t && this.imgToLazyload.push(t)
            }
            ,
            e.prototype.bindEvents = function() {
                this.loaderImg.bind(this.loaderImg.E.FILE_LOAD, this.onImgLoad, this),
                    this.loaderImg.bind(this.loaderImg.E.COMPLETE, this.onImgLoadingComplete, this)
            }
            ,
            e.prototype.unbindEvents = function() {
                this.loaderImg.unbind(this.loaderImg.E.FILE_LOAD, this.onImgLoad, this),
                    this.loaderImg.unbind(this.loaderImg.E.COMPLETE, this.onImgLoadingComplete, this)
            }
            ,
            e.prototype.destroy = function() {
                this.unbindEvents(),
                    this.loaderImg.destroy()
            }
            ,
            e.prototype.startLazyload = function() {
                if (0 !== this.imgToLazyload.length) {
                    var t = this.imgToLazyload.slice(this.posLoadedImg, this.posLoadedImg + this.STACK_SIZE);
                    this.loaderImg.startLoad(t)
                }
            }
            ,
            e.prototype.onImgLoad = function(t) {
                for (var e, i = this.$imgToLazyload.filter('[ data-src="' + t.item.src + '" ]'), n = 0; n < i.length; n++)
                    e = i[n],
                        e.src = t.item.src,
                        e.offsetHeight,
                        e.setAttribute("data-src", "lazyloaded"),
                    null !== this.PARENT_EL && STF_dom_addClass($(i[n]).parent(this.PARENT_EL)[0], "loaded")
            }
            ,
            e.prototype.onImgLoadingComplete = function() {
                this.posLoadedImg += this.STACK_SIZE,
                    this.posLoadedImg < this.imgToLazyload.length ? this.startLazyload.call(this) : this.onLazyloadCompleted.call(this)
            }
            ,
            e.prototype.onLazyloadCompleted = function() {}
            ,
            e
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.Global = function(t) {
        "use strict";
        t.color = {},
            t.STF_gl_encryptMailto = function(t, e, i, n, s) {
                var r = t.className
                    , o = "mailto"
                    , a = ":"
                    , l = "@"
                    , h = "."
                    , c = s ? e + l + i + h + n : t.innerHTML
                    , u = o + a + e + l + i + h + n;
                t.outerHTML = '<a href="' + u + '" class="' + r + '">' + c + "</a>"
            }
            ,
            t.STF_gl_getObjSize = function(t) {
                var e = 0;
                for (var i in t)
                    t.hasOwnProperty(i) && e++;
                return e
            }
            ,
            t.STF_gl_getType = function(t) {
                return {}.toString.call(t).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
            }
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.Array = function(t) {
        "use strict";
        t.STF_arr_insert = function(t, e, i) {
            return "object" != typeof i ? t.splice(e, 0, i) : i.map(function(i, n) {
                return t.splice(e + n, 0, i)
            }),
                t
        }
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.DOM = function(t) {
        "use strict";
        t.STF_dom_addClass = function(t, e) {
            t.classList ? t.classList.add(e) : STF_dom_hasClass(t, e) || (t.className += " " + e)
        }
            ,
            t.STF_dom_removeClass = function(t, e) {
                if (t.classList)
                    t.classList.remove(e);
                else {
                    t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)","gi"), "");
                    var i = t.className.length - 1;
                    " " == t.className[i] && (t.className = t.className.substring(0, i))
                }
            }
            ,
            t.STF_dom_resetClass = function(t) {
                t.className = ""
            }
            ,
            t.STF_dom_hasClass = function(t, e) {
                var i;
                return i = t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)","gi").test(t.className)
            }
            ,
            t.STF_dom_resetStyle = function(t) {
                t.style.cssText = ""
            }
            ,
            t.STF_dom_setTranslate = function(t, e, i) {
                e = null === e ? 0 : e,
                    i = null === i ? 0 : i,
                    N66.Props.HAS_TRANSFORMS_3D ? t.style[N66.Props.TRANSFORM] = "translate3d(" + e + "px, " + i + "px, 0px)" : t.style[N66.Props.TRANSFORM] = "translate(" + e + "px, " + i + "px)"
            }
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.Math = function(t) {
        "use strict";
        t.STF_math_getElPos = function(t, e, i, n) {
            var s = t / e
                , r = i / n
                , o = {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            };
            return s < r ? (o.w = i,
                o.h = Math.round(o.w / s),
                o.y = Math.round(-(o.h - n) / 2)) : (o.h = n,
                o.w = Math.round(o.h * s),
                o.x = Math.round(-(o.w - i) / 2)),
                o
        }
            ,
            t.STF_math_getCropPos = function(t, e, i, n) {
                var s = t / e
                    , r = i / n
                    , o = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                };
                return s < r ? (o.w = t,
                    o.h = Math.round(o.w / r),
                    o.y = Math.round(-(o.h - e) / 2)) : (o.h = e,
                    o.w = Math.round(o.h * r),
                    o.x = Math.round(-(o.w - t) / 2)),
                    o
            }
            ,
            t.STF_math_degToRad = function(t) {
                return t * Math.PI / 180
            }
            ,
            t.STF_math_radToDeg = function(t) {
                return 180 * t / Math.PI
            }
            ,
            t.STF_math_getHypotenuse = function(t, e) {
                return Math.sqrt(t * t + e * e)
            }
            ,
            t.STF_math_getInertia = function(t, e, i) {
                var n = Math.abs((t - e) * i) >= .01 ? (t - e) * i : t - e;
                return e += n
            }
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.String = function(t) {
        "use strict";
        t.STF_str_removeFirstSpecificChar = function(t, e) {
            return t.substr(0, 1) == e && (t = t.substr(1)),
                t
        }
            ,
            t.STF_str_removeLastSpecificChar = function(t, e) {
                return t.substr(t.length - 1, 1) == e && (t = t.substr(0, t.length - 1)),
                    t
            }
            ,
            t.STF_str_convertToUrl = function(t) {
                var e = document.createElement("a");
                return e.href = t,
                    e
            }
            ,
            t.STF_str_getPath = function(t, e) {
                null !== e && void 0 !== e || (e = N66.Path.URL.base);
                var i = t.replace(e, "");
                return i = i.split("#")[0],
                    i = i.split("?")[0],
                    i = STF_str_removeFirstSpecificChar(i, "/"),
                    i = STF_str_removeLastSpecificChar(i, "/")
            }
            ,
            t.STF_str_getSearch = function(t) {
                var e = STF_str_convertToUrl(t)
                    , i = e.search.split("?")[1] || "";
                return i = STF_str_removeFirstSpecificChar(i, "/"),
                    i = STF_str_removeLastSpecificChar(i, "/")
            }
            ,
            t.STF_str_getHash = function(t) {
                var e = STF_str_convertToUrl(t)
                    , i = e.hash.split("#")[1] || "";
                return i = STF_str_removeFirstSpecificChar(i, "/"),
                    i = STF_str_removeLastSpecificChar(i, "/")
            }
            ,
            t.STF_str_getParams = function(t, e) {
                var i, n, s = STF_str_convertToUrl(t), r = {};
                if (s[e].length > 1)
                    for (var o, a = 0, l = s[e].substr(1).split("&"); a < l.length; a++)
                        o = l[a].split("="),
                            i = unescape(o[0]),
                            i = STF_str_removeFirstSpecificChar(i, "/"),
                            i = STF_str_removeLastSpecificChar(i, "/"),
                            n = o.length > 1 ? unescape(o[1]) : "",
                            n = STF_str_removeFirstSpecificChar(n, "/"),
                            n = STF_str_removeLastSpecificChar(n, "/"),
                            r[i] = n;
                return r
            }
    }(window),
    N66.Utils.Validator = function(t) {
        t.STF_validator_notempty = function(t) {
            var e = t.value
                , i = $(t)
                , n = e && e.trim().length > 0 && e !== i.attr("placeholder");
            return i.parent().removeClass("error"),
            n || i.parent().addClass("error"),
                n
        }
            ,
            t.STF_validator_email = function(t) {
                var e = t.value
                    , i = $(t)
                    , n = /^(([^<>()[\]\\.,;:*\s@\"]+(\.[^<>()[\]\\.,;:*\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    , s = n.test(e);
                return i.parent().removeClass("error"),
                s || i.parent().addClass("error"),
                    s
            }
            ,
            t.STF_validator_passwordConfirm = function(t, e) {
                var i = t.value
                    , n = $(t)
                    , s = i === e;
                return n.parent().removeClass("error"),
                s || n.parent().addClass("error"),
                    s
            }
            ,
            t.STF_validator_zip = function(t) {
                var e = t.value
                    , i = $(t)
                    , n = /^[0-9]{5}$/
                    , s = n.test(e);
                return i.parent().removeClass("error"),
                s || i.parent().addClass("error"),
                    s
            }
            ,
            t.STF_validator_phone = function(t) {
                var e = t.value
                    , i = $(t)
                    , n = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/
                    , s = n.test(e);
                return i.parent().removeClass("error"),
                s || i.parent().addClass("error"),
                    s
            }
            ,
            t.STF_validator_date = function(t) {
                var e = t.value
                    , i = $(t);
                if (e.indexOf("/") !== -1) {
                    var n = e.split("/");
                    e = n[2] + "-" + n[1] + "-" + n[0]
                }
                var s = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
                    , r = s.test(e);
                if (r) {
                    var o = e.split("-")
                        , a = parseInt(o[2], 10)
                        , l = parseInt(o[1], 10)
                        , h = parseInt(o[0], 10);
                    if (h < 1970 || h > 2020 || 0 === l || l > 12)
                        return !1;
                    var c = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    (h % 400 === 0 || h % 100 !== 0 && h % 4 === 0) && (c[1] = 29),
                        r = a > 0 && a <= c[l - 1]
                }
                return i.parent().removeClass("error"),
                r || i.parent().addClass("error"),
                    r
            }
            ,
            t.STF_validator_number = function(t) {
                var e = t.value
                    , i = $(t)
                    , n = !isNaN(parseFloat(e)) && isFinite(e);
                return i.parent().removeClass("error"),
                n || i.parent().addClass("error"),
                    n
            }
            ,
            t.STF_validator_isNumeric = function(t) {
                var e = !isNaN(parseFloat(t)) && isFinite(t);
                return e
            }
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.Cookie = function(t) {
        "use strict";
        t.createCookie = function(t, e, i) {
            var n = "";
            if (i) {
                var s = new Date;
                s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3),
                    n = "; expires=" + s.toGMTString()
            }
            var r = t + "=" + e + n + "; path=/";
            document.cookie = r
        }
            ,
            t.readCookie = function(t) {
                var e = document.cookie.split(";")
                    , i = 0
                    , n = e.length
                    , s = null;
                for (i = 0; i < n; i++)
                    e[i].indexOf(t) != -1 && (s = e[i].split("=")[1]);
                return s
            }
            ,
            t.eraseCookie = function(t) {
                createCookie(t, "", -1)
            }
    }(window),
    N66.Utils = N66.Utils || {},
    N66.Utils.DatGUI = function(t) {
        "use strict";
        var e = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        };
        t.STF_scroll_preventDefault = function(e) {
            e = e || t.event,
            e.preventDefault && e.preventDefault(),
                e.returnValue = !1
        }
            ,
            t.STF_scroll_preventDefaultForScrollKeys = function(t) {
                if (e[t.keyCode])
                    return STF_scroll_preventDefault(t),
                        !1
            }
            ,
            t.STF_scroll_disableScrollClass = function() {
                N66.MainView.$body.css("top", -document.documentElement.scrollTop + "px"),
                    STF_dom_addClass(N66.MainView.$body[0], "no-scroll")
            }
            ,
            t.STF_scroll_enableScrollClass = function() {
                N66.MainView.$body.css("top", "0px"),
                    STF_dom_removeClass(N66.MainView.$body[0], "no-scroll")
            }
            ,
            t.STF_scroll_disableScroll = function() {
                t.addEventListener && t.addEventListener("DOMMouseScroll", STF_scroll_preventDefault, !1),
                    t.onwheel = STF_scroll_preventDefault,
                    t.onmousewheel = document.onmousewheel = STF_scroll_preventDefault,
                    t.ontouchmove = STF_scroll_preventDefault,
                    document.onkeydown = STF_scroll_preventDefaultForScrollKeys
            }
            ,
            t.STF_scroll_enableScroll = function() {
                t.removeEventListener && t.removeEventListener("DOMMouseScroll", STF_scroll_preventDefault, !1),
                    t.onmousewheel = document.onmousewheel = null,
                    t.onwheel = null,
                    t.ontouchmove = null,
                    document.onkeydown = null
            }
    }(window),
    N66.MainView = function(t) {
        "use strict";
        function e() {
            N66.AbstractMainView.call(this)
        }
        return e.prototype = Object.create(N66.AbstractMainView.prototype),
            e.prototype.constructor = e,
            e.prototype.initEl = function() {
                N66.AbstractMainView.prototype.initEl.call(this),
                    this.disableScrollRestoration()
            }
            ,
            new e
    }(window),
    N66.AbstractPagesController = function(t) {
        "use strict";
        function e() {
            N66.CustomEvent.call(this),
                this.LOADING_MODE = "byPageStatic",
                this.DYNAMIC_IMG_TO_LOAD = "img",
                this.IS_HIDE_INIT = !0,
                this.pages = {},
                this.page = null,
                this.prevPageInfos = {},
                this.pageInfos = {},
                this.isFirstLoad = !0,
                this.isPageChange = !0,
                this.isContentLoaded = !1,
                this.isAssetsLoaded = !1,
                this.isPageHidden = !1,
                this.isPageShown = !1,
                this.isMainLoaderShown = !1,
                this.isMainLoaderHidden = !1,
                this.data = null
        }
        e.prototype = Object.create(N66.CustomEvent.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.initPages(),
                    this.initEl()
            }
            ,
            e.prototype.initPages = function() {
                this.pages = {
                    booking: N66.Views.Pages.Booking,
                    "booking-confirm": N66.Views.Pages.Booking
                }
            }
            ,
            e.prototype.initEl = function() {
                this.assetsModel = N66.Models.Assets,
                    this.assetsModel.init(),
                    this.mainLoader = N66.Views.Statics.MainLoader,
                    this.cookie = new N66.Views.Partials.CookiePolicy
            }
            ,
            e.prototype.initFirstPage = function() {
                this.bindEvents(),
                    n.call(this),
                    this.manageMenuLinks(),
                    r.call(this)
            }
            ,
            e.prototype.bindEvents = function() {
                this.mainLoader.bind(this.mainLoader.E.FILE_LOAD, o, this),
                    this.mainLoader.bind(this.mainLoader.E.COMPLETE, h, this)
            }
        ;
        var i = function(t) {
            var e = "" === N66.Router.URL.path ? "index" : N66.Router.URL.path
                , i = N66.Config.JS_VIEWS_ID[e];
            void 0 === i && (i = "error-404"),
                this.prevPageInfos.id = this.pageInfos.id,
                this.pageInfos.id = i
        }
            , n = function() {
            var t = $(document.getElementById("page"))
                , e = t[0].getAttribute("data-js-id")
                , i = t[0].getAttribute("data-title");
            N66.Config.NEED_PAGE_ID || (this.prevPageInfos.id = this.pageInfos.id),
                this.prevPageInfos.title = this.pageInfos.title,
                this.pageInfos.id = e,
                this.pageInfos.title = i,
                s.call(this),
                N66.Router.setAltLangUrl(t)
        }
            , s = function() {
            void 0 === this.pages[this.pageInfos.id] ? (N66.Config.IS_PROD || console.warn('PagesController: no specific page view for the "' + this.pageInfos.id + '" ID. If you need one, create it and then set the view in the PagesController.pages object.'),
                this.page = new N66.AbstractPageView) : this.page = new this.pages[this.pageInfos.id]
        };
        e.prototype.initPageChangeValues = function() {
            this.isContentLoaded = !1,
                this.isAssetsLoaded = !1,
                this.isPageHidden = !1,
                this.isPageShown = !1,
                this.isMainLoaderShown = !1,
                this.isMainLoaderHidden = !1
        }
        ;
        var r = function() {
            var t = this.assetsModel.getAssetsToLoad(this.pageInfos.id, this.isFirstLoad, this.LOADING_MODE);
            this.mainLoader.loadAssets(t)
        }
            , o = function(t) {
            "image" == t.item.type ? a.call(this, t) : "json" == t.item.type && this.assetsModel.setJsonData(t.item.id, t.result)
        }
            , a = function(t) {
            var e = $("img").filter('[ data-src="' + t.item.src + '" ]');
            l.call(this, e, t.item.src, "preloaded")
        }
            , l = function(t, e, i) {
            for (var n, s = 0; s < t.length; s++)
                n = t[s],
                STF_dom_hasClass(n, "img-lazyload") && (n.src = null !== e ? e : n.getAttribute("data-src"),
                    n.offsetHeight,
                    n.setAttribute("data-src", i))
        }
            , h = function() {
            c.call(this),
                this.isFirstLoad ? (N66.MainView.initAfterAssetsLoaded(),
                    this.page.init(),
                    this.page.bind(this.page.E.SHOWN, this.onPageShown, this),
                    this.page.show(),
                    this.mainLoader.bind(this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this),
                    this.IS_HIDE_INIT ? this.mainLoader.hideInit() : this.mainLoader.hide()) : this.isFirstLoad || "byPageStatic" != this.LOADING_MODE && "byPageDynamic" != this.LOADING_MODE || (this.isAssetsLoaded = !0,
                    this.checkPageHiding())
        }
            , c = function() {
            var t = this.isFirstLoad ? N66.MainView.$body : N66.MainView.$pageCont
                , e = t.find("img").filter(function() {
                return "true" != this.getAttribute("data-lazyload") && "preloaded" != this.getAttribute("data-src")
            });
            l.call(this, e, null, "non-preloaded")
        };
        e.prototype.changePage = function(t) {
            N66.Router.updateGA(),
            N66.Config.NEED_PAGE_ID && i.call(this, t),
                g.call(this),
                this.initPageChangeValues(),
            "allStatic" == this.LOADING_MODE && (this.isAssetsLoaded = !0),
                u.call(this, t),
                this.managePageHidingTransitions()
        }
            ,
            e.prototype.changeSearch = function() {
                this.page.updateSearch()
            }
            ,
            e.prototype.changeHash = function() {
                this.page.updateHash()
            }
        ;
        var u = function(t) {
            $.ajax({
                context: this,
                url: t,
                type: "POST",
                data: {
                    ajax: "true",
                    type: "pageChange"
                },
                dataType: "html",
                success: d.bind(this),
                error: f.bind(this)
            })
        }
            , d = function(t) {
            this.data = t,
                this.isContentLoaded = !0,
                this.checkPageHiding()
        }
            , f = function(t) {
            console.warn("Ajax loading error", t),
            404 == t.status && p.call(this)
        }
            , p = function() {
            var t = N66.Lang.MULTI_LANG ? N66.Lang.LANG + "/" : ""
                , e = N66.Path.URL.base + t + "404";
            u.call(this, e)
        };
        e.prototype.managePageHidingTransitions = function() {
            this.page.bind(this.page.E.HIDDEN, this.onPageHidden, this),
                this.page.hide(),
                this.mainLoader.bind(this.mainLoader.E.SHOWN, this.onMainLoaderShown, this),
                this.mainLoader.show()
        }
            ,
            e.prototype.onPageHidden = function() {
                this.page.unbind(this.page.E.HIDDEN, this.onPageHidden, this),
                    m.call(this),
                    this.isPageHidden = !0,
                    this.checkPageHiding()
            }
        ;
        var m = function() {
            this.page.destroy(),
                this.page = null
        };
        e.prototype.onMainLoaderShown = function() {
            this.mainLoader.unbind(this.mainLoader.E.SHOWN, this.onMainLoaderShown, this),
                this.isMainLoaderShown = !0,
                this.checkPageHiding()
        }
            ,
            e.prototype.checkPageHiding = function() {
                "allStatic" == this.LOADING_MODE && this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ? (this.setContent(),
                    this.showPage()) : ("byPageStatic" == this.LOADING_MODE || "byPageDynamic" == this.LOADING_MODE) && this.isContentLoaded && !this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown ? this.setContent() : ("byPageStatic" == this.LOADING_MODE || "byPageDynamic" == this.LOADING_MODE) && this.isContentLoaded && this.isAssetsLoaded && this.isPageHidden && this.isMainLoaderShown && this.showPage()
            }
            ,
            e.prototype.setContent = function() {
                N66.MainView.$pageCont[0].innerHTML = this.data,
                    n.call(this),
                "allStatic" != this.LOADING_MODE && (STF_resetImgs(N66.MainView.$pageCont.find("img")),
                    setTimeout(function() {
                        r.call(this)
                    }
                        .bind(this), 0)),
                    this.data = null
            }
            ,
            e.prototype.showPage = function() {
                this.manageMenuLinks(),
                    _.call(this),
                    this.page.init(),
                    this.managePageShowingTransitions()
            }
            ,
            e.prototype.managePageShowingTransitions = function() {
                this.page.bind(this.page.E.SHOWN, this.onPageShown, this),
                    this.page.show(),
                    this.mainLoader.bind(this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this),
                    this.mainLoader.hide()
            }
            ,
            e.prototype.onPageShown = function() {
                this.page.unbind(this.page.E.SHOWN, this.onPageShown, this),
                    this.isPageShown = !0,
                    this.checkPageShowing()
            }
            ,
            e.prototype.onMainLoaderHidden = function() {
                this.mainLoader.unbind(this.mainLoader.E.HIDDEN, this.onMainLoaderHidden, this),
                    this.isMainLoaderHidden = !0,
                    this.checkPageShowing()
            }
            ,
            e.prototype.checkPageShowing = function() {
                this.isPageShown && this.isMainLoaderHidden && this.enablePageChange()
            }
            ,
            e.prototype.manageMenuLinks = function() {}
            ,
            e.prototype.updateMenuLinks = function(t) {
                if ("comparator" != document.getElementById("page").getAttribute("data-js-id")) {
                    var e = t.filter(".active")
                        , i = t.filter('[ data-link-id="' + this.pageInfos.id + '" ]');
                    e.length > 0 && STF_dom_removeClass(e[0], "active"),
                    i.length && STF_dom_addClass(i[0], "active")
                }
            }
            ,
            e.prototype.manageLangLinks = function() {}
            ,
            e.prototype.changeLangLinks = function(t) {
                for (var e, i = 0; i < t.length; i++)
                    e = t[i],
                        e.href = N66.Router.ALT_LANG_URL[e.getAttribute("data-lang")]
            }
        ;
        var _ = function() {
            document.title = this.pageInfos.title
        };
        e.prototype.enablePageChange = function() {
            this.isPageChange = !1,
            this.isFirstLoad && (this.isFirstLoad = !1),
                N66.Router.checkUrlCorrespondence()
        }
            ,
            e.prototype.updateScrollPosition = function() {
                this.canUpdatePosition && (this.scrollY = t.pageYOffset || document.documentElement.scrollTop)
            }
        ;
        var g = function() {
            this.isPageChange = !0
        };
        return e
    }(window),
    N66.PagesController = function(t) {
        "use strict";
        function e() {
            N66.AbstractPagesController.call(this)
        }
        return e.prototype = Object.create(N66.AbstractPagesController.prototype),
            e.prototype.constructor = e,
            e.prototype.manageMenuLinks = function() {
                this.updateMenuLinks(N66.Views.Statics.Header.$navLink),
                    this.updateMenuLinks(N66.Views.Statics.Footer.$footerLink)
            }
            ,
            e.prototype.manageLangLinks = function() {
                this.changeLangLinks(N66.Views.Statics.Header.$headerLgLink),
                    this.changeLangLinks(N66.Views.Statics.Footer.$footerLgLink)
            }
            ,
            new e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Statics = N66.Views.Statics || {},
    N66.Views.Statics.MainLoader = function(t) {
        "use strict";
        function e() {
            N66.AbstractMainLoader.call(this)
        }
        e.prototype = Object.create(N66.AbstractMainLoader.prototype),
            e.prototype.constructor = e,
            e.prototype.initDOM = function() {
                this.$loader = $(document.getElementById("main-loader")),
                    this.$loaderBg = this.$loader.find(".main-loader-bg"),
                    this.$loading = this.$loader.find(".main-loader-loading")
            }
            ,
            e.prototype.initTl = function() {
                this.tl.hideInit = new TimelineLite({
                    paused: !0,
                    onComplete: i.bind(this)
                }),
                    this.tl.hideInit.set(this.$loader, {
                        opacity: 1
                    }, 0).to(this.$loaderBg, 1, {
                        opacity: 0,
                        ease: Quart.easeInOut
                    }, .2),
                    this.tl.hideHeaderTransition = new TimelineLite({
                        paused: !0,
                        onComplete: function() {
                            setTimeout(function() {
                                i.bind(this)
                            }
                                .bind(this), 800)
                        }
                    }),
                    this.tl.hideHeaderTransition.set(this.$loader, {
                        opacity: 1
                    }, 0).set(this.$loaderBg, {
                        opacity: 0
                    }, 0),
                    this.tl.show = new TimelineLite({
                        paused: !0,
                        onComplete: n.bind(this)
                    }),
                    this.tl.show.set(this.$loader, {
                        opacity: 1
                    }, 0).set(this.$loaderBg, {
                        opacity: 0
                    }, 0).to(this.$loaderBg, .8, {
                        display: "block",
                        opacity: 1,
                        ease: Quart.easeInOut
                    }, 0),
                    this.tl.showHeaderTransition = new TimelineLite({
                        paused: !0,
                        onComplete: n.bind(this)
                    }),
                    this.tl.showHeaderTransition.set(this.$loader, {
                        opacity: 1
                    }, 0).set(this.$loaderBg, {
                        opacity: 0
                    }, 0),
                    this.tl.showCompareTransition = new TimelineLite({
                        paused: !0,
                        onComplete: n.bind(this)
                    }),
                    this.tl.showCompareTransition.set(this.$loader, {
                        opacity: 1
                    }, 0).set(this.$loaderBg, {
                        opacity: 1,
                        yPercent: 100
                    }, 0).to(this.$loaderBg, .8, {
                        display: "block",
                        opacity: 1,
                        yPercent: 0,
                        ease: Expo.easeOut
                    }, 0),
                    this.tl.showTeamTransition = new TimelineLite({
                        paused: !0,
                        onComplete: n.bind(this)
                    }),
                    this.tl.showTeamTransition.set(this.$loader, {
                        opacity: 1
                    }, 0).set(this.$loaderBg, {
                        opacity: 0
                    }, 0).to(this.$loaderBg, .8, {
                        display: "block",
                        opacity: .95,
                        ease: Quart.easeInOut
                    }, 0),
                    this.tl.hide = new TimelineLite({
                        paused: !0,
                        onComplete: s.bind(this)
                    }),
                    this.tl.hide.to(this.$loader, .8, {
                        opacity: 0,
                        ease: Quart.easeInOut
                    }, 0)
            }
            ,
            e.prototype.onProgress = function(t) {}
            ,
            e.prototype.hideInit = function() {
                this.$loader[0].style.display = "block",
                    this.$loader[0].style.opacity = "1",
                    STF_scroll_disableScroll(),
                    this.tl.hideInit.play()
            }
            ,
            e.prototype.hideHeaderTransition = function() {
                STF_scroll_disableScroll(),
                    this.tl.hideHeaderTransition.play()
            }
            ,
            e.prototype.show = function() {
                this.$loader[0].offsetHeight,
                    STF_scroll_disableScroll(),
                    this.$loader[0].style.display = "block",
                    this.tl.show.play(0)
            }
            ,
            e.prototype.showHeaderTransition = function() {
                this.$loader[0].offsetHeight,
                    STF_scroll_disableScroll(),
                    this.$loader[0].style.display = "block",
                    this.tl.showHeaderTransition.play(0)
            }
            ,
            e.prototype.showCompareTransition = function() {
                this.$loader[0].offsetHeight,
                    STF_scroll_disableScroll(),
                    this.$loader[0].style.display = "block",
                    this.tl.showCompareTransition.play(0)
            }
            ,
            e.prototype.showTeamTransition = function() {
                this.$loader[0].offsetHeight,
                    STF_scroll_disableScroll(),
                    this.$loader[0].style.display = "block",
                    this.tl.showTeamTransition.play(0)
            }
            ,
            e.prototype.displayBlock = function() {
                this.$loader[0].style.display = "block"
            }
            ,
            e.prototype.hide = function(t) {
                this.tl.hide.play(0)
            }
        ;
        var i = function() {
            this.killTimeline("hideInit"),
                STF_dom_removeClass(this.$loader[0], "init"),
                this.$loader[0].style.display = "none",
                STF_scroll_enableScroll(),
                this.dispatch(this.E.HIDDEN)
        }
            , n = function() {
            this.dispatch(this.E.SHOWN)
        }
            , s = function() {
            this.$loader[0].style.display = "none",
                this.dispatch(this.E.HIDDEN)
        };
        return new e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Statics = N66.Views.Statics || {},
    N66.Views.Statics.Header = function(t) {
        "use strict";
        function e() {
            N66.AbstractView.call(this),
                this.breakNav = 1020,
                this.isOpenBurgerNav = !1,
                this.isOpenSub = !1,
                this.headerInTransition = !1,
                this.imgToLazyloadClassName = "img-lazyload",
                this.lazyloadParentEl = ".img-lazyload-container"
        }
        e.prototype = Object.create(N66.AbstractView.prototype),
            e.prototype.constructor = e,
            e.prototype.initDOM = function() {
                this.$header = $(document.getElementById("header")),
                    this.$headerWrapper = this.$header.find(".header-wrapper"),
                    this.$links = this.$header.find(".change-page"),
                    this.$nav = $(document.getElementById("main-nav")),
                    this.$navLink = this.$nav.find(".header-nav-item"),
                    this.$subsContainer = this.$header.find(".header-subs"),
                    this.$subs = this.$header.find(".header-sub"),
                    this.$subsBg = this.$subs.find(".header-sub-bg"),
                    this.$subsBgImg = this.$subsBg.find("img"),
                    this.$burgerBt = this.$header.find(".header-burger-bt"),
                    this.$burgerBack = this.$header.find(".header-burger-back"),
                    this.$destinationSub = this.$header.find(".header-sub-destination"),
                    this.$destinationLabels = this.$destinationSub.find(".header-sub-destination-item"),
                    this.$destinationBgItem = this.$destinationSub.find(".header-sub-bg-item"),
                    this.$activitySub = this.$header.find(".header-sub-activity"),
                    this.$activityLabels = this.$activitySub.find(".header-sub-activity-item"),
                    this.$activityBgItem = this.$activitySub.find(".header-sub-bg-item"),
                    this.$topItems = this.$header.find(".header-top-item-newsletter"),
                    this.$newsletterBt = this.$header.find(".header-top-item-newsletter"),
                    this.$subLinks = this.$header.find(".header-sub-item")
            }
            ,
            e.prototype.init = function() {
                N66.AbstractView.prototype.init.call(this)
            }
            ,
            e.prototype.bindEvents = function() {
                N66.AbstractView.prototype.bindEvents.call(this),
                    this.$subsContainer.on("mouseleave", $.proxy(this.onMouseLeaveNav, this)),
                    this.$nav.on("mouseleave", $.proxy(this.onMouseLeaveNav, this)),
                    this.$navLink.on("click", $.proxy(this.onClickNavLink, this)),
                    this.$navLink.on("mouseenter", $.proxy(this.onMouseEnterNavLink, this)),
                    this.$burgerBack.on("click", $.proxy(this.onClickBurgerBack, this)),
                    this.$burgerBt.on("click", $.proxy(this.onClickBurgerBt, this)),
                    this.$destinationLabels.on("mouseenter", $.proxy(this.onMouseEnterDestinationLabel, this)),
                    this.$activityLabels.on("mouseenter", $.proxy(this.onMouseEnterActivityLabel, this)),
                    this.$newsletterBt.on("click", $.proxy(this.scrollToNewsletter, this)),
                    this.$subLinks.on("click", $.proxy(this.specialTransition, this)),
                    this.$links.on("click", $.proxy(this.changeUrl, this))
            }
            ,
            e.prototype.unbindEvents = function() {
                this.$subsContainer.off("mouseleave", $.proxy(this.onMouseLeaveNav, this)),
                    this.$nav.off("mouseleave", $.proxy(this.onMouseLeaveNav, this)),
                    this.$navLink.off("click", $.proxy(this.onClickNavLink, this)),
                    this.$navLink.off("mouseenter", $.proxy(this.onMouseEnterNavLink, this)),
                    this.$burgerBack.off("click", $.proxy(this.onClickBurgerBack, this)),
                    this.$burgerBt.off("click", $.proxy(this.onClickBurgerBt, this)),
                    this.$destinationLabels.off("mouseenter", $.proxy(this.onMouseEnterDestinationLabel, this)),
                    this.$activityLabels.off("mouseenter", $.proxy(this.onMouseEnterActivityLabel, this)),
                    this.$newsletterBt.off("click", $.proxy(this.scrollToNewsletter, this)),
                    this.$subLinks.off("click", $.proxy(this.specialTransition, this)),
                    this.$links.off("click", $.proxy(this.changeUrl, this))
            }
            ,
            e.prototype.resize = function() {
                N66.AbstractView.prototype.resize.call(this),
                    o.call(this),
                this.$header.length > 0 && (STF_dom_addClass(this.$header[0], "no-transition"),
                    setTimeout(function() {
                        STF_dom_removeClass(this.$header[0], "no-transition")
                    }
                        .bind(this), 100))
            }
            ,
            e.prototype.initEl = function() {
                N66.AbstractView.prototype.initEl.call(this),
                STF_dom_hasClass(document.querySelector("#page"), "home") && STF_dom_addClass(this.$header[0], "header-90"),
                    this.lazyLoader = new N66.LazyLoader(this.$header,this.imgToLazyloadClassName,this.lazyloadParentEl,1,(!0))
            }
            ,
            e.prototype.specialTransition = function(e) {
                if (!(e.ctrlKey || e.shiftKey || e.metaKey || e.button && 1 == e.button))
                    if (e.preventDefault(),
                    N66.MainView.wW > this.breakNav) {
                        this.headerInTransition = !0;
                        var i = N66.Views.Statics.Header.$header;
                        STF_dom_addClass(i[0], "in-transition"),
                            this.unbindEvents(),
                        this.$navLink.filter(".active").length > 0 && STF_dom_removeClass(this.$navLink.filter(".active")[0], "active");
                        var n = e.currentTarget
                            , s = $(n).closest(".header-sub").attr("data-link-id");
                        s || (s = e.currentTarget.getAttribute("data-link-id")),
                            STF_dom_addClass(this.$navLink.filter('[ data-link-id="' + s + '" ]')[0], "active");
                        var r = i.find(".header-sub.active")
                            , o = i.find(".header-sub-bg-item.active")
                            , a = r.find(".header-sub-container");
                        this.tl.hideHead = new TimelineLite,
                            this.tl.hideHead.set(r[0], {
                                opacity: 1
                            }).set(o[0], {
                                opacity: 1
                            }).to(a, .8, {
                                opacity: 0,
                                ease: Quad.easeOut
                            }, 0),
                        STF_dom_hasClass(document.querySelector("#page"), "home") && (STF_dom_addClass(N66.PagesController.page.$filters[0], "no-transition"),
                            this.tl.hideHead.to(N66.PagesController.page.$filters[0], .8, {
                                opacity: 0,
                                y: N66.MainView.wH - 90 * N66.MainView.wH / 100 + 80,
                                ease: Expo.easeInOut
                            }, 0)),
                            N66.MainView.sY > 0 ? TweenLite.to(t, 1, {
                                scrollTo: {
                                    y: 0,
                                    autoKill: !1
                                },
                                ease: Quart.easeOut,
                                onComplete: function() {
                                    this.changeUrl(e, !0)
                                }
                                    .bind(this)
                            }) : this.changeUrl(e, !0)
                    } else
                        this.changeUrl(e)
            }
            ,
            e.prototype.onClickNavLink = function(t) {
                if (!(t.ctrlKey || t.shiftKey || t.metaKey || t.button && 1 == t.button)) {
                    var e = t.currentTarget
                        , n = e.getAttribute("data-link-id");
                    N66.MainView.wW > this.breakNav ? "accompagne" !== n && "sur-mesure" !== n && "croisiere" !== n ? t.preventDefault() : this.specialTransition(t) : "accompagne" !== n && "sur-mesure" !== n && "croisiere" !== n ? (t.preventDefault(),
                        i.call(this, n)) : this.changeUrl(t)
                }
            }
            ,
            e.prototype.onMouseLeaveNav = function(t) {
                if (!(N66.MainView.wW <= this.breakNav || this.headerInTransition)) {
                    var e = t.toElement || t.relatedTarget;
                    0 === $(e).closest(".header-subs").length && n.call(this)
                }
            }
            ,
            e.prototype.onMouseEnterNavLink = function(t) {
                if (!(N66.MainView.wW <= this.breakNav || this.headerInTransition)) {
                    var e = t.currentTarget
                        , n = e.getAttribute("data-link-id")
                        , s = this.$navLink.filter(".is-hover");
                    s.length > 0 && STF_dom_removeClass(s[0], "is-hover"),
                        STF_dom_addClass(e, "is-hover"),
                        i.call(this, n)
                }
            }
            ,
            e.prototype.onClickBurgerBack = function(t) {
                n.call(this)
            }
            ,
            e.prototype.onClickBurgerBt = function(t) {
                this.isOpenBurgerNav ? r.call(this) : s.call(this)
            }
        ;
        var i = function(t) {
            this.isOpenSub = !0,
                this.$subs.find(".header-sub-bg-item.no-scale").removeClass("no-scale");
            var e = !1;
            t != this.$navLink.filter(".active").attr("data-link-id") || "accompagne" != t && "sur-mesure" != t && "croisiere" != t && "team" != t || (e = !0);
            var i = this.$subs.filter(".active")
                , n = this.$subs.filter('[ data-link-id="' + t + '" ]');
            n.length && (STF_dom_addClass(n[0], "active"),
                e ? (STF_dom_addClass(n.find(".header-sub-bg-item")[0], "no-scale"),
                    STF_dom_addClass(n.find(".header-sub-bg-item")[0], "active")) : STF_dom_addClass(n.find(".header-sub-bg-item")[0], "active")),
            i.length > 0 && (STF_dom_removeClass(i[0], "active"),
            i.find(".header-sub-bg-item.active").length > 0 && STF_dom_removeClass(i.find(".header-sub-bg-item.active")[0], "active")),
                STF_dom_addClass(this.$header[0], "open-sub")
        }
            , n = function() {
            this.isOpenSub = !1,
                this.$subs.find(".header-sub-bg-item.no-scale").removeClass("no-scale"),
            STF_dom_hasClass(document.querySelector("#page"), "home") && N66.PagesController.page.setAutoSlideHeadSlider();
            var t = this.$subs.filter(".active");
            if (t.length > 0 && (STF_dom_removeClass(t[0], "active"),
                STF_dom_removeClass(this.$header[0], "open-sub"),
            N66.MainView.wW > this.breakNav)) {
                var e = t.find(".header-sub-bg-item.active");
                STF_dom_removeClass(e[0], "active")
            }
        }
            , s = function(t) {
            this.isOpenBurgerNav = !0,
                STF_dom_addClass(this.$header[0], "open"),
                STF_dom_addClass(this.$burgerBt[0], "close"),
                STF_dom_addClass(N66.MainView.$body[0], "no-scroll-fixed")
        }
            , r = function(t) {
            this.isOpenBurgerNav = !1,
                STF_dom_removeClass(this.$header[0], "open"),
                STF_dom_removeClass(this.$header[0], "open-sub"),
                STF_dom_removeClass(this.$burgerBt[0], "close"),
                STF_dom_removeClass(N66.MainView.$body[0], "no-scroll-fixed"),
                n.call(this)
        }
            , o = function() {
            for (var t = 0; t < this.$subsBgImg.length; t++)
                this.setSubBgSize($(this.$subsBgImg[t]), this.$subsContainer)
        };
        e.prototype.onMouseEnterDestinationLabel = function(t) {
            if (!this.headerInTransition) {
                var e = t.currentTarget
                    , i = e.getAttribute("data-id");
                a.call(this, i)
            }
        }
        ;
        var a = function(t) {
            var e = this.$destinationBgItem.filter(".active")
                , i = this.$destinationBgItem.filter('[ data-id="' + t + '" ]');
            e.length > 0 && STF_dom_removeClass(e[0], "active"),
            i.length && STF_dom_addClass(i[0], "active")
        };
        e.prototype.onMouseEnterActivityLabel = function(t) {
            if (!this.headerInTransition) {
                var e = t.currentTarget
                    , i = e.getAttribute("data-id");
                l.call(this, i)
            }
        }
        ;
        var l = function(t) {
            var e = this.$activityBgItem.filter(".active")
                , i = this.$activityBgItem.filter('[ data-id="' + t + '" ]');
            e.length > 0 && STF_dom_removeClass(e[0], "active"),
            i.length && STF_dom_addClass(i[0], "active")
        };
        return e.prototype.setSubBgSize = function(t, e) {
            var i = e.height() + this.$header.height()
                , n = e.width()
                , s = parseInt(t.attr("data-width"))
                , r = parseInt(t.attr("data-height"))
                , o = STF_math_getElPos(s, r, n, i);
            t[0].style.left = o.x + "px",
                t[0].style.top = o.y + "px",
                t[0].style.width = o.w + "px",
                t[0].style.height = o.h + "px"
        }
            ,
            e.prototype.scrollToNewsletter = function(e) {
                e.preventDefault();
                var i = N66.MainView.$body.height() - N66.MainView.wH;
                TweenLite.to(t, 2, {
                    scrollTo: {
                        y: i,
                        autoKill: !1
                    },
                    ease: Quart.easeInOut,
                    onComplete: function() {
                        N66.Views.Statics.Footer.focusNewsletterInput()
                    }
                        .bind(this)
                })
            }
            ,
            new e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Statics = N66.Views.Statics || {},
    N66.Views.Statics.Footer = function(t) {
        "use strict";
        function e() {
            N66.AbstractView.call(this),
                this.imgToLazyloadClassName = "img-lazyload",
                this.lazyloadParentEl = ".img-lazyload-container",
                this.isNewsletterOpen = !1,
                this.isStopPrlxEl = !1
        }
        return e.prototype = Object.create(N66.AbstractView.prototype),
            e.prototype.constructor = e,
            e.prototype.initDOM = function() {
                this.$footer = $(document.getElementById("footer")),
                    this.$footerLgLink = this.$footer.find(".footer-lang-link"),
                    this.$footerLink = this.$footer.find(".footer-link"),
                    this.$inputsIcon = this.$footer.find(".input-icon"),
                    this.$inputsIconInput = this.$inputsIcon.find("input"),
                    this.$newsletter = this.$footer.find(".footer-newsletter"),
                    this.$newsletterForm = this.$footer.find(".footer-newsletter-form"),
                    this.$mailInput = this.$footer.find(".footer-newsletter-right-mail input"),
                    this.$newsletterMore = this.$newsletter.find(".footer-newsletter-more"),
                    this.$newsletterMoreInner = this.$newsletter.find(".footer-newsletter-more-inner"),
                    this.$newsletterBt = this.$newsletter.find(".footer-newsletter-bt"),
                    this.$newsletterConfirm = this.$newsletter.find(".footer-newsletter-confirm"),
                    this.$topNuages = this.$footer.find(".footer-top-nuages"),
                    this.$topNuages4 = this.$footer.find(".footer-top-nuages-4"),
                    this.$topNuages4Img = this.$topNuages4.find("img"),
                    this.$topNuages3 = this.$footer.find(".footer-top-nuages-3"),
                    this.$topNuages3Img = this.$topNuages3.find("img"),
                    this.$topNuages2 = this.$footer.find(".footer-top-nuages-2"),
                    this.$topNuages2Img = this.$topNuages2.find("img"),
                    this.$topNuages1 = this.$footer.find(".footer-top-nuages-1"),
                    this.$topNuages1Img = this.$topNuages1.find("img"),
                    this.$topContent = this.$footer.find(".footer-top-content"),
                    this.$topTitle = this.$footer.find(".footer-top-title"),
                    this.$topSub = this.$footer.find(".footer-top-sub"),
                    this.$topMountain = this.$footer.find(".footer-top-mountain"),
                    this.$topMountainImg = this.$topMountain.find("img"),
                    this.$topBg = this.$footer.find(".footer-top-bg"),
                    this.$topBgImg = this.$topBg.find("img"),
                    this.$inputsIcon = this.$footer.find(".input-icon input"),
                    this.$links = this.$footer.find(".change-page")
            }
            ,
            e.prototype.bindEvents = function() {
                N66.AbstractView.prototype.bindEvents.call(this),
                    this.$footerLink.on("click", $.proxy(this.changeUrl, this)),
                    this.$inputsIconInput.on("focus", $.proxy(this.onFocusInputIcon, this)),
                    this.$inputsIconInput.on("blur", $.proxy(this.onBlurInputIcon, this)),
                    this.$mailInput.on("focus", $.proxy(this.onFocusMail, this)),
                    this.$newsletterForm.on("submit", $.proxy(this.onClickNewsletterBt, this)),
                    this.$links.on("click", $.proxy(this.changeUrl, this))
            }
            ,
            e.prototype.init = function() {
                "comparator" != document.getElementById("page").getAttribute("data-js-id") && N66.AbstractView.prototype.init.call(this)
            }
            ,
            e.prototype.initEl = function() {
                this.lazyLoader = new N66.LazyLoader(this.$footer,this.imgToLazyloadClassName,this.lazyloadParentEl,1,(!0))
            }
            ,
            e.prototype.resize = function() {
                this.isNewsletterOpen && TweenLite.to(this.$newsletterMore, .8, {
                    height: this.$newsletterMoreInner.height() + 20,
                    ease: Quart.easeOut
                })
            }
            ,
            e.prototype.onFocusInputIcon = function(t) {
                var e = t.currentTarget;
                this.$inputsIcon.filter(".active").length > 0 && STF_dom_removeClass(this.$inputsIcon.filter(".active")[0], "active");
                var i = $(e).parent();
                STF_dom_addClass(i[0], "active")
            }
            ,
            e.prototype.onBlurInputIcon = function(t) {
                var e = t.currentTarget
                    , i = $(e).parent();
                0 == e.value.length && STF_dom_removeClass(i[0], "active")
            }
            ,
            e.prototype.onFocusMail = function(t) {
                this.openNewsletter()
            }
            ,
            e.prototype.setPrlxEl = function(t) {
                t.push([this.$topNuages, this.$topNuages4, null, -.4, "y", null, null]),
                    t.push([this.$topNuages, this.$topNuages3, null, -.5, "y", null, null]),
                    t.push([this.$topNuages, this.$topNuages2, null, -.8, "y", null, null]),
                    t.push([this.$topNuages, this.$topNuages1, null, -1.4, "y", null, null]),
                    t.push([this.$topContent, this.$topTitle, null, .035, "y", null, null]),
                    t.push([this.$topContent, this.$topSub, null, .05, "y", null, null]),
                    t.push([this.$topMountain, this.$topMountainImg, null, -.008, "y", null, null]),
                    t.push([this.$topBg, this.$topBgImg, null, .005, "y", null, null])
            }
            ,
            e.prototype.openNewsletter = function(t) {
                this.isNewsletterOpen || (this.isNewsletterOpen = !0,
                    TweenLite.to(this.$newsletterMore, .8, {
                        height: this.$newsletterMoreInner.height() + 20,
                        ease: Quart.easeOut
                    }),
                    STF_dom_addClass(this.$newsletterMore[0], "open"))
            }
            ,
            e.prototype.onClickNewsletterBt = function(t) {
                return t && t.preventDefault(),
                this.validForm() && this.$newsletterForm[0].submit(),
                    !1
            }
            ,
            e.prototype.validForm = function() {
                var t, e, i = !0, n = this.$newsletterForm.find("input,textarea"), s = "", r = n.length;
                for (e = 0; e < r; e++)
                    null !== n[e].getAttribute("required") && (i = !!STF_validator_notempty(n[e]) && i,
                    "checkbox" == n[e].getAttribute("type") && (n[e].checked ? $(n[e]).parent().removeClass("error") : ($(n[e]).parent().addClass("error"),
                        i = !1)),
                    "email" === n[e].name && (t = STF_validator_email(n[e]),
                        i = !!t && i,
                        s = t ? s : "email"));
                return i || "" !== s || (s = "empty"),
                    $(".footer-newsletter-error-item").removeClass("show"),
                i || ($(".footer-newsletter-error-" + s).addClass("show"),
                    STF_dom_addClass(this.$newsletterConfirm[0], "hidden")),
                    i
            }
            ,
            e.prototype.focusNewsletterInput = function(t) {
                this.$mailInput[0].focus()
            }
            ,
            new e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Partials = N66.Views.Partials || {},
    N66.Views.Partials.Select = function(t) {
        function e(t, e, i, n, s) {
            this.$select = t,
                this.nbrVisibleOption = e,
                this.isInitSelect = !1,
                this.isOpenSelect = !1,
                this.isSelectedFilter = !1,
                this.initMobile = s,
                this.canDropup = i,
                this.onClickOptionCallback = n,
                this.init()
        }
        e.prototype.init = function() {
            !this.canDropup;
            this.$select.selectpicker({
                size: this.nbrVisibleOption,
                dropupAuto: this.canDropup,
                iconBase: "icomoon"
            }),
                this.initDOM(),
                this.bindEvents(),
                s.call(this),
            this.initMobile && r.call(this),
            this.canDropup && o.call(this),
                l.call(this),
                h.call(this),
                this.$btn.removeAttr("title")
        }
            ,
            e.prototype.initDOM = function() {
                this.$selectContainer = this.$select.closest(".bootstrap-select"),
                    this.$scrollable = this.$selectContainer.find(".dropdown-menu.inner"),
                    this.$options = this.$scrollable.find("li"),
                    this.$btn = this.$selectContainer.find(".btn"),
                    this.$inputSelect = this.$selectContainer.find("select")
            }
            ,
            e.prototype.bindEvents = function() {
                this.$options.on("click", $.proxy(a.bind(this), this)),
                    this.$select.on("shown.bs.select", $.proxy(i.bind(this), this)),
                    this.$select.on("hide.bs.select\t", $.proxy(n.bind(this), this))
            }
        ;
        var i = function() {
            this.scrollHeight = this.$scrollable.prop("scrollHeight"),
                this.heightScrollable = this.$scrollable.outerHeight(!0),
                this.barHeight = this.heightScrollable * this.heightScrollable / this.scrollHeight,
                this.$scrollbar.height(this.barHeight - 24),
                this.isOpenSelect = !0
        }
            , n = function() {
            this.isOpenSelect = !1
        }
            , s = function() {
            this.$selectContainer.find(".dropdown-menu.open").append("<div class='scrollbar'><span></span></div>"),
                this.$scrollbar = this.$selectContainer.find(".scrollbar span"),
                this.isInitSelect = !0
        };
        e.prototype.updateScrollbar = function() {
            this.isInitSelect && this.isOpenSelect && STF_dom_setTranslate(this.$scrollbar[0], 0, this.$scrollable.scrollTop() / this.heightScrollable * this.barHeight)
        }
        ;
        var r = function() {
            if ("home" == N66.PagesController.pageInfos.id) {
                var t = this.$select.attr("title");
                this.$scrollable.append("<div class='dropdown-burger-back'><span>" + t + "</span></div>")
            } else {
                var e = this.$selectContainer.parent(".results-filters-box-item").find(".results-filters-box-item-title");
                this.$scrollable.append("<div class='dropdown-burger-back'><span>" + e.html() + "</span></div>")
            }
        }
            , o = function() {
            this.$selectContainer.addClass("dropup")
        }
            , a = function(t) {
            var e = t.currentTarget;
            l.call(this, e),
                STF_dom_addClass(this.$selectContainer[0], "filter-selected"),
            this.$selectContainer.parent(".results-filters-box-item").length > 0 && STF_dom_addClass(this.$selectContainer.parent(".results-filters-box-item")[0], "is-selected"),
            this.onClickOptionCallback && this.onClickOptionCallback(this.$select, e)
        }
            , l = function(t) {
            var e = this.$selectContainer.find(".selectpicker").attr("title");
            this.$btn.find(".filter-mobile-title").length <= 0 && this.$btn.append('<span class="filter-mobile-title">' + e + "</span>")
        }
            , h = function(t) {
            this.$inputSelect.find(":selected").text() !== $(this.$options[0]).find(".text").text() && this.$selectContainer.parent(".results-filters-box-item").length > 0 && (STF_dom_addClass(this.$selectContainer[0], "filter-selected"),
                STF_dom_addClass(this.$selectContainer.parent(".results-filters-box-item")[0], "filter-selected"))
        };
        return e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Partials = N66.Views.Partials || {},
    N66.Views.Partials.DropdownMobile = function(t) {
        function e(t) {
            this.$dropdown = t,
                this.isInitDropdown = !1,
                this.isOpenSelect = !1,
                this.init()
        }
        e.prototype.init = function() {
            this.initDOM(),
                this.bindEvents(),
                s.call(this)
        }
            ,
            e.prototype.initDOM = function() {
                this.$dropdownItems = this.$dropdown.find(".tab-item"),
                    this.$dropdownBtInner = this.$dropdown.find(".btn-inner"),
                    this.$dropdownMenu = this.$dropdown.find(".dropdown-menu.open"),
                    this.$scrollable = this.$dropdown.find(".dropdown-menu.inner"),
                    this.$options = this.$dropdown.find(".tab-item")
            }
            ,
            e.prototype.bindEvents = function() {
                this.$dropdown.on("shown.bs.dropdown", $.proxy(i.bind(this), this)),
                    this.$dropdown.on("hide.bs.dropdown\t", $.proxy(n.bind(this), this)),
                    this.$options.on("click", $.proxy(this.onClickOption.bind(this), this))
            }
        ;
        var i = function() {
            this.heightScrollable = this.$scrollable.outerHeight(!0),
                this.barHeight = this.heightScrollable * this.heightScrollable / this.scrollHeight,
                this.$scrollbar.height(this.barHeight - 24),
                this.isOpenSelect = !0
        }
            , n = function() {
            this.isOpenSelect = !1
        };
        e.prototype.onClickOption = function(t) {
            var e = t.currentTarget
                , i = e.innerHTML
                , n = this.$options.filter(".active");
            n.length > 0 && STF_dom_removeClass(n[0], "active"),
                STF_dom_addClass(e, "active"),
                this.$dropdownBtInner.html(i)
        }
            ,
            e.prototype.resize = function(t) {
                this.isInitDropdown || s.call(this)
            }
        ;
        var s = function() {
            this.$dropdown.find(".dropdown-menu.open").append("<div class='scrollbar'><span></span></div>"),
                this.$scrollbar = this.$dropdown.find(".scrollbar span"),
                this.scrollHeight = this.$scrollable.prop("scrollHeight"),
                this.isInitDropdown = !0;
            var t = $(this.$options[0]).outerHeight()
                , e = t * this.$options.length + 20;
            this.$options.length >= 4 && (e = 6 * t + 20),
                this.$scrollable.attr("style", "height:" + e + "px"),
                this.$dropdownMenu.attr("style", "min-height:" + e + "px")
        };
        return e.prototype.updateScrollbar = function() {
            this.isInitDropdown && this.isOpenSelect && STF_dom_setTranslate(this.$scrollbar[0], 0, this.$scrollable.scrollTop() / this.heightScrollable * this.barHeight)
        }
            ,
            e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Partials = N66.Views.Partials || {},
    N66.Views.Partials.CookiePolicy = function(t) {
        "use strict";
        function e(t, e, i) {
            N66.AbstractView.call(this),
                this.init()
        }
        return e.prototype = Object.create(N66.AbstractView.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                this.dom = document.getElementById("cookie"),
                    this.bt = document.getElementById("cookie-bt"),
                    this.name = "66nord-cookiepolicy",
                    null !== readCookie(this.name) ? this.close() : this.dom.style.display = "block",
                    $(this.bt).on("click", this.close.bind(this))
            }
            ,
            e.prototype.close = function() {
                createCookie(this.name, "", 395),
                    this.dom = document.getElementById("cookie"),
                this.dom && this.dom.parentNode.removeChild(this.dom)
            }
            ,
            e
    }(window),
    N66.AbstractPageView = function(t) {
        "use strict";
        function e() {
            N66.AbstractView.call(this),
                this.dropdownsMobile = [],
                this.prlxEl = [],
                this.observerRatio = 0,
                this.isStopPrlxEl = !1,
                this.hasFooter = !0,
                this.headOpacity = 0,
                this.imgToLazyloadClassName = "img-lazyload",
                this.lazyloadParentEl = ".img-lazyload-container"
        }
        e.prototype = Object.create(N66.AbstractView.prototype),
            e.prototype.constructor = e,
            e.prototype.initDOM = function() {
                this.$page = $(document.getElementById("page")),
                    this.$pageHead = this.$page.find(".page-head"),
                    this.$pageHeadBg = this.$pageHead.find(".page-head-bg"),
                    this.$pageHeadBgImg = this.$pageHead.find(".page-head-bg img"),
                    this.$pageHeadContainer = this.$pageHead.find(".page-head-container"),
                    this.$dropdownMobile = this.$page.find(".dropdown-mobile"),
                    this.$inputs = this.$page.find(".input, .textarea"),
                    this.$inputsInput = this.$inputs.find("input, textarea"),
                    this.$inputsIcon = this.$page.find(".input-icon"),
                    this.$inputsIconInput = this.$inputsIcon.find("input"),
                    this.$moreButtons = this.$page.find(".more-button"),
                    this.$moreContents = this.$page.find(".more-content"),
                    this.$moduleConseiller = this.$page.find(".module-conseiller"),
                    this.$links = this.$page.find(".change-page")
            }
            ,
            e.prototype.initEl = function() {
                this.lazyLoader = new N66.LazyLoader(this.$page,this.imgToLazyloadClassName,this.lazyloadParentEl,1,(!0)),
                    setTimeout(function() {
                        for (var t = 0; t < this.$dropdownMobile.length; t++)
                            i.call(this, $(this.$dropdownMobile[t]))
                    }
                        .bind(this), 0),
                this.$moduleConseiller.length && (this.moduleConseiller = new N66.Views.Partials.ModuleConseiller(this.$page)),
                N66.MainView.$mainCont.find(".footer").length <= 0 && (this.hasFooter = !1),
                    N66.Props.testIO(),
                    r.call(this),
                    s.call(this),
                    l.call(this),
                    this.onElementHeightChange(N66.MainView.$mainCont[0], this.onHeightChange.bind(this))
            }
            ,
            e.prototype.bindEvents = function() {
                N66.AbstractView.prototype.bindEvents.call(this),
                    N66.MainView.bind(N66.MainView.E.RAF, this.raf.bind(this), this),
                this.$inputsIconInput.length && (this.$inputsIconInput.on("focus", $.proxy(this.onFocusInputIcon, this)),
                    this.$inputsIconInput.on("blur", $.proxy(this.onBlurInputIcon, this))),
                this.$inputs.length && (this.$inputsInput.on("focus", $.proxy(this.onFocusInput, this)),
                    this.$inputsInput.on("blur", $.proxy(this.onBlurInput, this))),
                this.$moreButtons.length > 0 && this.$moreButtons.on("click", $.proxy(o.bind(this), this));
                for (var t = 0; t < this.$links.length; t++) {
                    var e = $(this.$links[t]);
                    "_blank" !== e.attr("target") && this.$page.on("click", ".change-page", $.proxy(this.changeUrl.bind(this), this))
                }
            }
            ,
            e.prototype.raf = function() {
                if (N66.MainView.wW > 1020)
                    h.call(this),
                        n.call(this),
                    this.isStopPrlxEl && (this.isStopPrlxEl = !1);
                else {
                    for (var t = 0; t < this.dropdownsMobile.length; t++)
                        this.dropdownsMobile[t].updateScrollbar();
                    this.isStopPrlxEl || c.call(this)
                }
            }
            ,
            e.prototype.resize = function() {
                u.call(this),
                this.$pageHeadContainer.length > 0 && (this.$pageHeadContainer[0].style.opacity = 1);
                for (var t = 0; t < this.dropdownsMobile.length; t++)
                    this.dropdownsMobile[t].resize();
                s.call(this),
                    a.call(this),
                    this.setPrlxElPos.call(this)
            }
            ,
            e.prototype.initTl = function() {}
            ,
            e.prototype.show = function() {
                this.tl.showPage = new TimelineLite({
                    onComplete: this.onPageShown.bind(this)
                }),
                    STF_dom_removeClass(N66.MainView.$body[0], "no-scroll-fixed"),
                    N66.MainView.wW > 1020 ? "true" == readCookie("66nord-header-transition") || "true" == readCookie("66nord-team-transition") ? (N66.PagesController.mainLoader.hideHeaderTransition(),
                        this.tl.showPage.set(this.$page, {
                            opacity: 1,
                            ease: Quad.easeOut
                        })) : "true" == readCookie("66nord-closeteam-transition") ? (t.scrollTo(0, N66.MainView.wH),
                        this.tl.showPage.to(this.$page, .8, {
                            opacity: 1,
                            ease: Quad.easeOut
                        })) : this.tl.showPage.to(this.$page, .8, {
                        opacity: 1,
                        ease: Quad.easeOut
                    }) : this.tl.showPage.to(this.$page, .8, {
                        opacity: 1,
                        ease: Quad.easeOut
                    }),
                    createCookie("66nord-header-transition", !1, 395),
                    createCookie("66nord-compare-transition", !1, 395),
                    createCookie("66nord-team-transition", !1, 395),
                    createCookie("66nord-closeteam-transition", !1, 395),
                    createCookie("66nord-openteam-transition", !1, 395)
            }
            ,
            e.prototype.hide = function(t, e) {
                this.tl.hidePage = new TimelineLite({
                    onComplete: function() {
                        t ? document.location.href = t : e()
                    }
                }),
                    N66.MainView.wW > 1020 ? "true" == readCookie("66nord-header-transition") ? (N66.PagesController.mainLoader.showHeaderTransition(),
                        this.tl.hidePage.set(this.$page, {
                            opacity: 0,
                            ease: Quad.easeOut
                        }, .8)) : "true" == readCookie("66nord-compare-transition") ? (N66.PagesController.mainLoader.showCompareTransition(),
                        this.tl.hidePage.set(this.$page, {
                            opacity: 1
                        }, .8)) : "true" == readCookie("66nord-team-transition") ? ("team" == N66.PagesController.pageInfos.id ? N66.PagesController.mainLoader.showTeamTransition() : N66.PagesController.mainLoader.showHeaderTransition(),
                        this.tl.hidePage.set(this.$page, {
                            opacity: 1
                        }, .8)) : (N66.PagesController.mainLoader.show(),
                        this.tl.hidePage.set(this.$page, {
                            opacity: 1
                        }, .8)) : (N66.PagesController.mainLoader.show(),
                        this.tl.hidePage.set(this.$page, {
                            opacity: 1
                        }, .8))
            }
            ,
            e.prototype.destroy = function() {
                N66.AbstractView.prototype.destroy.call(this),
                void 0 !== this.lazyLoader && this.lazyLoader.destroy()
            }
            ,
            e.prototype.onPageShown = function() {
                this.dispatch(this.E.SHOWN)
            }
            ,
            e.prototype.onPageHidden = function() {
                this.dispatch(this.E.HIDDEN)
            }
            ,
            e.prototype.onPageHidden = function() {
                this.dispatch(this.E.HIDDEN)
            }
            ,
            e.prototype.setBgSize = function(t, e) {
                var i = e.outerHeight()
                    , n = e.width()
                    , s = t.find("img")
                    , r = parseInt(s.attr("data-width"))
                    , o = parseInt(s.attr("data-height"))
                    , a = STF_math_getElPos(r, o, n, i);
                t[0].style.left = a.x + "px",
                    t[0].style.top = a.y + "px",
                    t[0].style.width = a.w + "px",
                    t[0].style.height = a.h + "px"
            }
        ;
        var i = function(t) {
            this.dropdownsMobile.push(new N66.Views.Partials.DropdownMobile(t))
        }
            , n = function() {
            this.$pageHeadContainer.length <= 0 || (this.headOpacity = 1 - N66.MainView.siY / (.7 * N66.MainView.wH),
            this.headOpacity >= 0 && (this.$pageHeadContainer[0].style.opacity = this.headOpacity))
        };
        e.prototype.onFocusInput = function(t) {
            var e = t.currentTarget
                , i = $(e).parent();
            STF_dom_addClass(i[0], "focus"),
                STF_dom_addClass(i[0], "active")
        }
            ,
            e.prototype.onBlurInput = function(t) {
                var e = t.currentTarget
                    , i = $(e).parent();
                STF_dom_removeClass(i[0], "focus"),
                0 == e.value.length && STF_dom_removeClass(i[0], "active")
            }
            ,
            e.prototype.onFocusInputIcon = function(t) {
                var e = t.currentTarget
                    , i = $(e).parent();
                STF_dom_addClass(i[0], "active")
            }
            ,
            e.prototype.onBlurInputIcon = function(t) {
                var e = t.currentTarget
                    , i = $(e).parent();
                0 == e.value.length && STF_dom_removeClass(i[0], "active")
            }
        ;
        var s = function() {
            "mobile" == N66.Device.DEVICE || N66.MainView.wW < 1020 ? (STF_dom_removeClass(N66.MainView.$mainCont[0], "animate"),
                this.hasAnimation = !1) : (STF_dom_addClass(N66.MainView.$mainCont[0], "animate"),
                this.hasAnimation = !0)
        }
            , r = function() {
            this.observables = document.querySelectorAll(".observable");
            var t = {
                threshold: .2
            };
            this.observerRatio = .2,
            N66.MainView.wW <= 1280 && (t = {
                threshold: .2
            },
                this.observerRatio = .2),
                this.observer = new IntersectionObserver(this.onObserve.bind(this),t);
            var e, i = this.observables.length;
            for (e = 0; e < i; e++)
                this.observer.observe(this.observables[e]);
            this.observablesInit = !0
        };
        e.prototype.unbindObservables = function() {
            var t, e = this.observables.length;
            for (t = 0; t < e; t++)
                this.observer.unobserve(this.observables[t])
        }
            ,
            e.prototype.onObserve = function(t) {
                var e, i = t.length, n = null;
                for (e = 0; e < i; e++)
                    n = $(t[e].target),
                    !n.hasClass("visible") && t[e].intersectionRatio >= this.observerRatio && n.addClass("visible")
            }
        ;
        var o = function(t) {
            var e = $(t.currentTarget);
            STF_dom_hasClass(e[0], "open") ? this.closeMore(e) : this.openMore(e)
        };
        e.prototype.openMore = function(t) {
            var e = t.prev(".more-content")
                , i = e.find(".more-content-inner");
            e.height(i.height()),
                STF_dom_addClass(t[0], "open"),
                STF_dom_addClass(e[0], "visible")
        }
            ,
            e.prototype.closeMore = function(t) {
                var e = t.prev(".more-content");
                e.find(".more-content-inner");
                e.height(0),
                    STF_dom_removeClass(t[0], "open"),
                    STF_dom_removeClass(e[0], "visible")
            }
        ;
        var a = function() {
            for (var t = this.$moreContents.filter(".visible"), e = 0; e < t.length; e++) {
                var i = $(t[e]);
                i.height(i.find(".more-content-inner").height())
            }
        }
            , l = function() {
            this.hasFooter && N66.Device.IS_DESKTOP && N66.Views.Statics.Footer.setPrlxEl(this.prlxEl)
        };
        e.prototype.setPrlxElPos = function() {
            for (var t, e, i = (N66.MainView.$body.offset().top,
                0); i < this.prlxEl.length; i++)
                t = this.prlxEl[i],
                    e = t[0],
                    t[2] = e.offset().top + e.height() / 2 - N66.MainView.wH / 2
        }
        ;
        var h = function() {
            for (var t, e, i, n, s, r, o = 0; o < this.prlxEl.length; o++)
                t = this.prlxEl[o],
                    e = t[1],
                    i = (N66.MainView.siY - t[2]) * t[3],
                    n = t[4],
                    s = t[5],
                    r = t[6],
                    null !== s && i < s ? i = s : null !== r && i > r && (i = r),
                    "y" == n ? STF_dom_setTranslate(e[0], 0, Math.round(100 * i) / 100) : STF_dom_setTranslate(e[0], Math.round(100 * i) / 100, 0)
        }
            , c = function() {
            for (var t, e = 0; e < this.prlxEl.length; e++)
                t = this.prlxEl[e],
                    t[1].attr("style", "");
            this.isStopPrlxEl = !0
        }
            , u = function() {
            if (this.$pageHeadBg.length >= 0)
                for (var t = 0; t < this.$pageHeadBg.length; t++)
                    N66.MainView.wW > 760 ? this.setBgSize($(this.$pageHeadBg[t]), this.$pageHead) : this.$pageHeadBg[t].setAttribute("style", "")
        };
        return e.prototype.onHeightChange = function(t, e) {
            this.setPrlxElPos()
        }
            ,
            e.prototype.onElementHeightChange = function(t, e) {
                var i, n = t.clientHeight;
                !function s() {
                    i = t.clientHeight,
                    n != i && e(),
                        n = i,
                    t.onElementHeightChangeTimer && clearTimeout(t.onElementHeightChangeTimer),
                        t.onElementHeightChangeTimer = setTimeout(s, 200)
                }()
            }
            ,
            e
    }(window),
    N66.Views = N66.Views || {},
    N66.Views.Pages = N66.Views.Pages || {},
    N66.Views.Pages.Booking = function(t) {
        "use strict";
        function e() {
            N66.AbstractPageView.call(this),
                this.currentMembersValues = [null, null],
                this.canSetPosLeftBar = !1,
                this.selects = []
        }
        e.prototype = Object.create(N66.AbstractPageView.prototype),
            e.prototype.constructor = e,
            e.prototype.init = function() {
                N66.AbstractPageView.prototype.init.call(this)
            }
            ,
            e.prototype.initDOM = function() {
                N66.AbstractPageView.prototype.initDOM.call(this),
                    this.$form = this.$page.find(".devis-form"),
                    this.$formValidationBt = this.$page.find(".devis-next-button-step-4"),
                    this.$nextButton = this.$page.find(".devis-next-button"),
                    this.$prevButton = this.$page.find(".devis-prev-button"),
                    this.$inputs = this.$page.find("input, select"),
                    this.$checboxsContainer = this.$page.find(".devis-part-item-checkboxs"),
                    this.$devisContent = this.$page.find(".devis-content"),
                    this.$devisContainer = this.$page.find(".devis-content-inner"),
                    this.$steps = this.$page.find(".devis-step"),
                    this.$step1 = this.$page.find(".devis-step-1"),
                    this.$step2 = this.$page.find(".devis-step-2"),
                    this.$step3 = this.$page.find(".devis-step-3"),
                    this.$step4 = this.$page.find(".devis-step-4"),
                    this.$selects = this.$page.find(".selectpicker"),
                    this.$inputFirstname = this.$form.find("#firstname"),
                    this.$inputLastname = this.$form.find("#lastname"),
                    this.$leftBarItems = this.$page.find(".devis-content-bar-item"),
                    this.$formuleItems = this.$page.find(".booking-formules-item"),
                    this.$infoResaBt = this.$page.find(".booking-button-infos"),
                    this.$infoResaPopup = this.$page.find(".booking-popup"),
                    this.$infoResaClose = this.$page.find(".booking-popup-close"),
                    this.$infoResaOverlay = this.$page.find(".booking-popup-overlay")
            }
            ,
            e.prototype.initEl = function() {
                N66.AbstractPageView.prototype.initEl.call(this),
                    this.setHeightContainer(this.$step1),
                    this.setPosLeftBar(),
                    i.call(this),
                    this.currentStep = this.$steps.filter(".active")
            }
            ,
            e.prototype.bindEvents = function() {
                N66.AbstractPageView.prototype.bindEvents.call(this),
                    this.$nextButton.on("click", $.proxy(this.onClickNext.bind(this), this)),
                    this.$prevButton.on("click", $.proxy(this.onClickPrev.bind(this), this)),
                    this.$inputFirstname.on("blur", $.proxy(this.onBlurFirstnameInput.bind(this), this)),
                    this.$inputLastname.on("blur", $.proxy(this.onBlurLastnameInput.bind(this), this)),
                    this.$formValidationBt.on("click", $.proxy(this.onSubmit.bind(this), this)),
                    this.$infoResaBt.on("click", $.proxy(this.openPopupInfosResa.bind(this), this)),
                    this.$infoResaClose.on("click", $.proxy(this.closePopupInfosResa.bind(this), this)),
                    this.$infoResaOverlay.on("click", $.proxy(this.closePopupInfosResa.bind(this), this))
            }
            ,
            e.prototype.unbindEvents = function() {
                N66.AbstractPageView.prototype.unbindEvents.call(this)
            }
            ,
            e.prototype.resize = function() {
                N66.AbstractPageView.prototype.resize.call(this),
                    this.setHeightContainer(this.currentStep),
                    this.setPosLeftBar()
            }
            ,
            e.prototype.raf = function() {
                N66.AbstractPageView.prototype.raf.call(this);
                for (var t = 0; t < this.selects.length; t++)
                    this.selects[t].updateScrollbar();
                this.canSetPosLeftBar && this.setPosLeftBar()
            }
        ;
        var i = function() {
            for (var t = 0; t < this.$selects.length; t++) {
                var e = $(this.$selects[t])
                    , i = parseInt(e.attr("data-visible"));
                this.selects.push(new N66.Views.Partials.Select(e,i,(!1),(!1)))
            }
        };
        return e.prototype.onClickNext = function(t) {
            var e = t.currentTarget
                , i = 0;
            if (STF_dom_hasClass(e, "devis-next-button-step-1")) {
                var n = !0
                    , s = this.$step1.find(".devis-part");
                for (i = 0; i < s.length; i++) {
                    var r = this.validForm($(s[i]));
                    n = !!n && r
                }
                n ? (this.currentMembersValues[0] !== this.$form.find("#nb_adult").val() && (this.cloneMembers("adult"),
                    this.currentMembersValues[0] = this.$form.find("#nb_adult").val()),
                this.currentMembersValues[1] !== this.$form.find("#nb_child").val() && (this.cloneMembers("child"),
                    this.currentMembersValues[1] = this.$form.find("#nb_child").val()),
                    this.setNextActiveLeftBar(),
                    this.setStep(1),
                    this.currentStep = this.$step2) : (this.setHeightContainer(this.$step1),
                    this.scrollToError(this.$step1))
            } else if (STF_dom_hasClass(e, "devis-next-button-step-2")) {
                var o = !0
                    , a = this.$step2.find(".devis-part");
                for (i = 0; i < a.length; i++) {
                    var l = this.validForm($(a[i]));
                    o = !!o && l
                }
                o ? (this.setNextActiveLeftBar(),
                    this.setCheckboxFormules(),
                    this.setStep(2),
                    this.currentStep = this.$step3) : (this.setHeightContainer(this.$step2),
                    this.scrollToError(this.$step2))
            } else if (STF_dom_hasClass(e, "devis-next-button-step-3")) {
                var h = !0
                    , c = this.$step3.find(".devis-part");
                for (this.setPricings(),
                         i = 0; i < c.length; i++) {
                    var u = this.validForm($(c[i]));
                    h = !!h && u
                }
                h ? (this.setNextActiveLeftBar(),
                    this.setStep(3),
                    this.currentStep = this.$step4) : (this.setHeightContainer(this.$step3),
                    this.scrollToError(this.$step3))
            }
        }
            ,
            e.prototype.onClickPrev = function(t) {
                var e = t.currentTarget;
                STF_dom_hasClass(e, "devis-prev-button-step-1") ? this.setStep(0) : STF_dom_hasClass(e, "devis-prev-button-step-2") ? this.setStep(1) : STF_dom_hasClass(e, "devis-prev-button-step-3") && this.setStep(2),
                    this.setPrevActiveLeftBar()
            }
            ,
            e.prototype.setStep = function(t) {
                var e = this.$steps.filter(".active")
                    , i = this.$steps[t];
                STF_dom_removeClass(e[0], "active"),
                    STF_dom_addClass(i, "active"),
                    this.setHeightContainer(i),
                    this.scrollToTop()
            }
            ,
            e.prototype.setHeightContainer = function(t) {
                this.$devisContainer.height($(t).height()),
                    this.setPosLeftBar(),
                    this.canSetPosLeftBar = !0,
                    setTimeout(function() {
                        this.canSetPosLeftBar = !1
                    }
                        .bind(this), 1e3)
            }
            ,
            e.prototype.setPosLeftBar = function(t) {
                for (var e = 0; e < this.$leftBarItems.length; e++) {
                    var i = $(this.$leftBarItems[e])
                        , n = this.$devisContainer.height() - i.css("top").replace("px", "");
                    STF_dom_setTranslate(i[0], 0, n)
                }
            }
            ,
            e.prototype.setNextActiveLeftBar = function() {
                var t = this.$leftBarItems.filter(".current")
                    , e = (this.$leftBarItems.filter(".active"),
                    this.$leftBarItems.filter(".next-active"))
                    , i = this.$leftBarItems.filter(".no-active");
                t.length > 0 && STF_dom_removeClass(t[0], "current"),
                    setTimeout(function() {
                        e.length > 0 && (STF_dom_addClass(e[0], "current"),
                            STF_dom_addClass(e[0], "active"),
                            STF_dom_removeClass(e[0], "next-active"))
                    }
                        .bind(this), 400),
                i.length > 0 && (STF_dom_addClass(i[0], "next-active"),
                    STF_dom_removeClass(i[0], "no-active"))
            }
            ,
            e.prototype.setPrevActiveLeftBar = function() {
                var t = (this.$leftBarItems.filter(".current"),
                    this.$leftBarItems.filter(".active"))
                    , e = this.$leftBarItems.filter(".next-active");
                this.$leftBarItems.filter(".no-active");
                e.length > 0 && (STF_dom_addClass(e[0], "no-active"),
                    STF_dom_removeClass(e[0], "next-active")),
                t.length >= 2 && STF_dom_addClass(t[t.length - 2], "current"),
                t.length > 0 && (STF_dom_addClass(t[t.length - 1], "in-transition"),
                    STF_dom_removeClass(t[t.length - 1], "active"),
                    STF_dom_removeClass(t[t.length - 1], "current"),
                    setTimeout(function() {
                        STF_dom_removeClass(t[t.length - 1], "in-transition"),
                            STF_dom_addClass(t[t.length - 1], "next-active")
                    }
                        .bind(this), 1500))
            }
            ,
            e.prototype.setActiveLeftBar = function(t) {
                var e = this.$leftBarItems.filter(".current")
                    , i = this.$leftBarItems.filter(".active")
                    , n = this.$leftBarItems.filter(".next-active")
                    , s = this.$leftBarItems.filter(".no-active");
                e.length > 0 && STF_dom_removeClass(e[0], "current"),
                    STF_dom_addClass(this.$leftBarItems[t], "current"),
                i.length > 0 && i.removeClass("active");
                for (var r = 0; r <= t; r++)
                    STF_dom_addClass(this.$leftBarItems[r], "active");
                if (n.length > 0 && n.removeClass("next-active"),
                this.$leftBarItems[t + 1] && STF_dom_addClass(this.$leftBarItems[t + 1], "next-active"),
                t + 1 < this.$leftBarItems.length - 1) {
                    s.length > 0 && s.removeClass("no-active");
                    for (var o = this.$leftBarItems.length - 1; o >= this.$leftBarItems.length - 1; o++)
                        STF_dom_addClass(this.$leftBarItems[o], "no-active")
                }
            }
            ,
            e.prototype.scrollToTop = function(t) {
                var e = this.$devisContent.offset().top - 100;
                N66.MainView.sY > e && TweenLite.to("body", 1.2, {
                    scrollTo: {
                        y: e,
                        autoKill: !1
                    },
                    ease: Quart.easeOut
                })
            }
            ,
            e.prototype.scrollToError = function(e) {
                var i = e.find(".error")[0]
                    , n = $(i).offset().top - 100;
                n > this.$devisContainer.height() + this.$devisContainer.offset().top - N66.MainView.wH / 2 && (n = this.$devisContainer.height() + this.$devisContainer.offset().top - N66.MainView.wH / 2),
                    TweenLite.to(t, 1.2, {
                        scrollTo: {
                            y: n,
                            autoKill: !1
                        },
                        ease: Quart.easeOut
                    })
            }
            ,
            e.prototype.validForm = function(t) {
                var e, i, n = !0, s = t.find("input[type='text'],input[type='number'],input[type='email'],textarea,select"), r = (t.find("select"),
                    t.find(".devis-part-item-checkboxs")), o = [], a = s.length;
                for (i = 0; i < a; i++)
                    if (null === s[i].getAttribute("disabled"))
                        if (STF_dom_hasClass(s[i], "input-select")) {
                            var l = $(s[i]).parent(".input-select");
                            l.length >= 1 && ("empty" == s[i].value ? (STF_dom_addClass(l[0], "error"),
                                n = !1,
                                o.push("notempty")) : STF_dom_removeClass(l[0], "error"))
                        } else
                            null !== s[i].getAttribute("required") ? (e = STF_validator_notempty(s[i]),
                                n = !!e && n,
                            e || o.push("notempty"),
                            STF_validator_notempty(s[i]) && ("email" === s[i].getAttribute("data-verif") ? (e = STF_validator_email(s[i]),
                                n = !!e && n,
                            e || o.push("email")) : "phone" === s[i].getAttribute("data-verif") ? (e = STF_validator_phone(s[i]),
                                n = !!e && n,
                            e || o.push("phone")) : "number" === s[i].getAttribute("data-verif") ? (e = STF_validator_number(s[i]),
                                n = !!e && n,
                            e || o.push("number")) : "zip" === s[i].getAttribute("data-verif") && (e = STF_validator_zip(s[i]),
                                n = !!e && n,
                            e || o.push("zip")))) : "email" === s[i].getAttribute("data-verif") && "" !== s[i].value ? (e = STF_validator_email(s[i]),
                                n = !!e && n,
                            e || o.push("email")) : "phone" === s[i].getAttribute("data-verif") && "" !== s[i].value ? (e = STF_validator_phone(s[i]),
                                n = !!e && n,
                            e || o.push("phone")) : "number" === s[i].getAttribute("data-verif") && "" !== s[i].value ? (e = STF_validator_number(s[i]),
                                n = !!e && n,
                            e || o.push("number")) : "zip" === s[i].getAttribute("data-verif") && "" !== s[i].value && (e = STF_validator_zip(s[i]),
                                n = !!e && n,
                            e || o.push("zip"));
                for (var h = 0; h < r.length; h++) {
                    var c = !1
                        , u = $(r[h]);
                    if (STF_dom_removeClass(u[0], "error"),
                        u.attr("data-required")) {
                        for (var d = u.find("input[type='checkbox'], input[type='radio']"), f = 0; f < d.length; f++) {
                            var p = $(d[f]);
                            p.is(":checked") && (c = !0)
                        }
                        c || (n = !1,
                            o.push("notempty"),
                            STF_dom_addClass(u[0], "error"))
                    }
                }
                if (t.find(".devis-part-errors-item").removeClass("show"),
                    !n)
                    for (var m = 0; m < o.length; m++)
                        t.find(".devis-part-errors-item." + o[m]).addClass("show");
                return n
            }
            ,
            e.prototype.cloneMembers = function(t) {
                var e = this.$form.find("#nb_" + t).val()
                    , i = []
                    , n = this.$form.find(".part-" + t + "-first");
                this.$form.find(".devis-part-" + t + "-others").remove(),
                    n.find("input, select").prop("disabled", !0),
                    this.$form.find(".devis-part-" + t + "-container").parent(".devis-part").removeClass("hidden"),
                e < 1 && this.$form.find(".devis-part-" + t + "-container").parent(".devis-part").addClass("hidden");
                for (var s = 1; s <= e; s++) {
                    var r = this.$form.find(".part-" + t + "-first").clone()
                        , o = $(r[0]);
                    o.removeClass("part-" + t + "-first"),
                        o.addClass("devis-part-" + t + "-others"),
                        o.find("input, select").prop("disabled", !1);
                    for (var a = o.find(".input-select"), l = 0; l < a.length; l++) {
                        var h = parseInt(a[l].getAttribute("data-visible"));
                        this.selects.push(new N66.Views.Partials.Select($(a[l]),h,(!1),(!1)))
                    }
                    o.find(".input-select").selectpicker(),
                        o.find("#booking_" + t + "ModelPas_qualite")[0].setAttribute("name", "civilite_" + t + "_" + s),
                        o.find("#booking_" + t + "ModelPas_qualite")[0].setAttribute("id", "booking[" + t + "Pas][" + s + "][qualite]"),
                        o.find("#firstname_" + t + "_0")[0].setAttribute("name", "firstname_" + t + "_" + s),
                        o.find("#firstname_" + t + "_0")[0].setAttribute("id", "firstname_" + t + "_" + s),
                        o.find("#lastname_" + t + "_0")[0].setAttribute("name", "lastname_" + t + "_" + s),
                        o.find("#lastname_" + t + "_0")[0].setAttribute("id", "lastname_" + t + "_" + s),
                        o.find("#birthdate_day_" + t + "_0")[0].setAttribute("name", "birthdate_day_" + t + "_" + s),
                        o.find("#birthdate_day_" + t + "_0")[0].setAttribute("id", "birthdate_day_" + t + "_" + s),
                        o.find("#birthdate_month_" + t + "_0")[0].setAttribute("name", "birthdate_month_" + t + "_" + s),
                        o.find("#birthdate_month_" + t + "_0")[0].setAttribute("id", "birthdate_month_" + t + "_" + s),
                        o.find("#birthdate_year_" + t + "_0")[0].setAttribute("name", "birthdate_year_" + t + "_" + s),
                        o.find("#birthdate_year_" + t + "_0")[0].setAttribute("id", "birthdate_year_" + t + "_" + s),
                        o.find("#country_" + t + "_0")[0].setAttribute("name", "country_" + t + "_" + s),
                        o.find("#country_" + t + "_0")[0].setAttribute("id", "country_" + t + "_" + s),
                        i.push(r)
                }
                for (var c = 0; c < i.length; c++)
                    this.$form.find(".devis-part-" + t + "-container").append(i[c])
            }
            ,
            e.prototype.setCheckboxFormules = function(t) {
                for (var e = this.$form.find("#nb_adult").val(), i = [], n = 1; n <= e; n++) {
                    var s = ""
                        , r = n
                        , o = this.$form.find("#firstname_adult_" + r).val()
                        , a = this.$form.find("#lastname_adult_" + r).val();
                    s = o.charAt(0).toUpperCase() + "." + a,
                        i.push(s)
                }
                for (var l = this.$form.find("#nb_child").val(), h = [], c = 1; c <= l; c++) {
                    var u = ""
                        , d = c
                        , f = this.$form.find("#firstname_child_" + d).val()
                        , p = this.$form.find("#lastname_child_" + d).val();
                    u = f.charAt(0).toUpperCase() + "." + p,
                        h.push(u)
                }
                for (var m = 0; m < this.$formuleItems.length; m++) {
                    var _, g = this.$formuleItems[m].getAttribute("data-price"), v = $(this.$formuleItems[m]).find(".booking-formules-item-container");
                    v.empty();
                    var y = "";
                    m == this.$formuleItems.length - 1 && (y = "checked");
                    for (var b = 1; b <= i.length; b++)
                        _ = '<div class="radio"><input type="radio" ' + y + ' name="assurance_adult_' + b + '" id="assurance_' + m + "_adult_" + b + '" value="' + m + '" ><label for="assurance_' + m + "_adult_" + b + '"><svg class="icon icon-check"><use xlink:href="#check" /></svg><span>' + i[b - 1] + '</span></label><div class="booking-formules-item-price">' + g + "</div></div>",
                            v.append(_);
                    for (var w = 1; w <= h.length; w++)
                        _ = '<div class="radio"><input type="radio" ' + y + ' name="assurance_child_' + w + '" id="assurance_' + m + "_child_" + w + '" value="' + m + '" ><label for="assurance_' + m + "_child_" + w + '"><svg class="icon icon-check"><use xlink:href="#check" /></svg><span>' + h[w - 1] + '</span></label><div class="booking-formules-item-price">' + g + "</div></div>",
                            v.append(_)
                }
            }
            ,
            e.prototype.onBlurFirstnameInput = function(t) {
                var e = t.currentTarget
                    , i = e.value;
                this.$form.find("#firstname_adult_1").val(i),
                    this.$form.find("#validation_contrat_firstname").text(i)
            }
            ,
            e.prototype.onBlurLastnameInput = function(t) {
                var e = t.currentTarget
                    , i = e.value;
                this.$form.find("#lastname_adult_1").val(i),
                    this.$form.find("#validation_contrat_lastname").text(i)
            }
            ,
            e.prototype.setPricings = function() {
                var t = this.$form.find(".booking-validation-montant").attr("data-price-travel")
                    , e = this.currentMembersValues[0] + this.currentMembersValues[1]
                    , i = this.currentMembersValues[0]
                    , n = e * t
                    , s = this.$form.find("#price_inscription").text()
                    , r = this.getTotalAssurances()
                    , o = n + s * i + r
                    , a = 30 * o / 100;
                this.$form.find("#price_nb_travelers").text(e),
                    this.$form.find("#price_total_travelers").text(n),
                    this.$form.find("#price_total").text(o),
                    this.$form.find("#price_acompte").text(a),
                    this.$form.find("#price_nb_travelers").text(e),
                    this.$form.find("#price_total_text").text(o),
                    this.$form.find("#price_acompte_text").text(a)
            }
            ,
            e.prototype.getTotalAssurances = function() {
                for (var t = this.$form.find("#nb_adult").val(), e = 0, i = 1; i <= t; i++)
                    e += parseFloat(this.$form.find('input[name="assurance_adult_' + i + '"]:checked').nextAll(".booking-formules-item-price").text().replace("€", ""));
                for (var n = this.$form.find("#nb_child").val(), s = 0, r = 1; r <= n; r++)
                    s += parseFloat(this.$form.find('input[name="assurance_child_' + r + '"]:checked').nextAll(".booking-formules-item-price").text().replace("€", ""));
                var o = s + e;
                return o
            }
            ,
            e.prototype.onSubmit = function(t) {
                return t.ctrlKey || t.shiftKey || t.metaKey || t.button && 1 == t.button ? void $("#booking-form").submit() : (t.preventDefault(),
                    void this.changeUrl(function() {
                        $("#booking-form").submit()
                    }))
            }
            ,
            e.prototype.openPopupInfosResa = function(t) {
                STF_dom_addClass(N66.MainView.$body[0], "no-scroll"),
                    STF_dom_addClass(this.$infoResaPopup[0], "open"),
                    this.$infoResaPopup.scrollTop(0)
            }
            ,
            e.prototype.closePopupInfosResa = function(t) {
                STF_dom_removeClass(N66.MainView.$body[0], "no-scroll"),
                    STF_dom_removeClass(this.$infoResaPopup[0], "open")
            }
            ,
            e
    }(window),
    N66.Main = function(t) {
        "use strict";
        function e() {}
        e.prototype.init = function() {
            N66.Config.init(),
                N66.Props.init(),
                N66.Device.init(),
                N66.Path.init(),
                N66.Lang.init(),
                i.call(this),
                N66.PagesController.init(),
                N66.MainView.init(),
                N66.Router.init(),
                this.youtubeAPI = {
                    ready: !1
                }
        }
        ;
        var i = function() {
            n.call(this, !1),
                s.call(this, !1),
                r.call(this, !1)
        }
            , n = function(t) {
            N66.Config.setFPSStats(t),
            t && (N66.Config.IS_DEV || N66.Config.IS_PREPROD_LOCAL) && N66.Utils.FPSStats.init()
        }
            , s = function(t) {
            N66.Config.setMemoryStats(t),
            t && (N66.Config.IS_DEV || N66.Config.IS_PREPROD_LOCAL) && N66.Utils.MemoryStats.init()
        }
            , r = function(t) {
            t && (N66.Config.IS_DEV || N66.Config.IS_PREPROD_LOCAL) && N66.Utils.DatGUI.init()
        };
        return new e
    }(window),
    $(N66.Main.init.bind(N66.Main));
