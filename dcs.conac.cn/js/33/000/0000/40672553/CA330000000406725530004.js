(function() {
    var K = window,
        n = document,
        H = n.referrer,
        a = n.documentElement,
        t = location,
        F = navigator.userAgent.toLowerCase();
    if (K.WebDissector) {
        return
    }
    var x = {
        errorUrls: [],
        funcList: [],
        handlers: [],
        voidFunc: function(M) {
            return M
        },
        lower: function(M) {
            return (M && M.toLowerCase) ? M.toLowerCase() : M
        },
        indexOf: function(Q, P, O) {
            if (Q) {
                if (Q.indexOf) {
                    return Q.indexOf(P, O)
                } else {
                    if (Q.length) {
                        for (var N = O || 0, M = Q.length; N < M; N++) {
                            if (Q[N] === P) {
                                return N
                            }
                        }
                    }
                }
            }
            return -1
        },
        getHashCode: function(Q, M) {
            var P = 1315423911,
                N, O;
            if (!M) {
                Q = c(Q)
            }
            for (N = Q.length - 1; N >= 0; N--) {
                O = Q.charCodeAt(N);
                P ^= ((P << 5) + O + (P >> 2))
            }
            return (P & 2147483647)
        },
        getRandomString: function(Q) {
            var P, N = [],
                O = "abcdefghijklmnopqrstuvwxyz0123456789",
                M = 35;
            for (P = 0; P < Q; P++) {
                N.push(O.charAt(Math.round(Math.random() * M)))
            }
            return N.join("")
        },
        getRandomID: function() {
            var N = new Date().getTime() + "";
            var O = "" + Math.abs(x.getHashCode(t.href + H + F));
            var M = O.length > 2 ? 2 : O.length;
            O = O.substring(0, M);
            return N.substring(2, N.length - 3) + x.getRandomString(6) + O
        },
        getUrlParam: function(O, Q, N, M) {
            if (!Q) {
                return null
            }
            O = (O || (t.pathname + t.search)).replace(/\#.*/ig, "");
            var R = ["&", "?"];
            for (var P = 0; P < 3; P++) {
                var S = x.find(O, R[P] + Q + "=", "&", N);
                if (S != null) {
                    return M ? b(S) : S
                }
            }
            return null
        },
        find: function(S, Q, R, N, P) {
            var O = x.findArray(S, Q, R, N, P),
                M = O.length;
            return M > 0 ? O[M - 1] : null
        },
        findArray: function(Q, P, V, S, R) {
            if (!Q || !Q.length) {
                return []
            }
            var O = [],
                N, U, X, W, T, M = 0;
            P = P || "";
            if (!S) {
                W = c(Q);
                P = c(P);
                V = c(V)
            }
            while (M > -1) {
                T = null;
                if ((N = s(W, P, M)) > -1) {
                    X = N + P.length;
                    if (!V) {
                        T = Q.substring(X);
                        M = -1
                    } else {
                        U = s(W, V, X);
                        if (U >= X) {
                            T = Q.substring(X, U);
                            M = U + V.length
                        } else {
                            T = Q.substring(X);
                            M = -1
                        }
                    }
                }
                if (!T) {
                    break
                }
                O.push(!R ? x.trim(T) : T)
            }
            return O
        },
        getTimeZone: function() {
            return Math.round(new Date().getTimezoneOffset() / -60) + ""
        },
        getLocalTime: function() {
            return new Date().getTime() + x.getTimeZone() * 3600000
        },
        isPageMatch: function(R, P, Q) {
            Q = c(Q || t.pathname);
            P = c(P);
            if (!y(R)) {
                R = [R]
            }
            for (var O = 0, M = R.length; O < M; O++) {
                var N = c(R[O]);
                if ((P == "contains" && s(Q, N) > -1) || (P == "startswith" && s(Q, N) == 0) || (P == "endswith" && s(Q, N, Q.length - N.length) > -1) || (P == "exactmatch" && Q == N) || (P == "regex" && N.test && N.test(Q))) {
                    return true
                }
            }
            return false
        },
        getCookie: function(N, P, M) {
            if (!N) {
                return null
            }
            var Q, O = x.toDict(n.cookie, "=", ";", true);
            N = c(N);
            for (Q in O) {
                if (f(O, Q) && c(Q) === N) {
                    return M ? O[Q] : b(O[Q])
                }
            }
            return P || null
        },
        setCookie: function(O, Q, M, S, P, R, N) {
            if (!O) {
                return
            }
            O = c(O);
            if (!N) {
                Q = e(Q)
            }
            O = O + "=" + Q + ";";
            M = M ? ("expires=" + x.getExpireDate(M).toGMTString()) + ";" : "";
            S = !!S ? "path=" + S + ";" : "path=/;";
            P = P ? ("domain=" + P) + ";" : "";
            R = R ? "secure=true;" : "";
            n.cookie = [O, M, S, P, R].join("")
        },
        delCookie: function(M, O, N) {
            x.setCookie(M, "", -1000, O, N)
        },
        getExpireDate: function(M) {
            return new Date(new Date().getTime() + M * 1000)
        },
        trim: function(M) {
            return (M && M.replace) ? M.replace(/(^\s+)|(\s+$)/ig, "") : M
        },
        toDict: function(T, M, N, U) {
            var Q, V, P, S, O, R = {};
            M = M || "=";
            N = N || "&";
            P = T.split(N);
            O = U ? x.trim : x.voidFunc;
            for (Q = 0, S = P.length; Q < S; Q++) {
                V = s(P[Q], M);
                if (V > -1) {
                    R[O(P[Q].substring(0, V))] = O(P[Q].substring(V + 1))
                } else {
                    R[P[Q]] = null
                }
            }
            return R
        },
        resolveUrl: function(O) {
            while (O && O[0] == " ") {
                O = O.substr(1)
            }
            var N, P = /((\w+:)?\/\/([^\/\#&?]*))?\/?([^?#&]*)?(\?[^#]*)?(#.*)?/,
                M = {
                    url: O
                },
                Q;
            if ((N = O.match(P))) {
                Q = N[2] || t.protocol;
                M.protocol = Q.substring(0, Q.length - 1);
                M.local = M.protocol == "file";
                M.host = N[3] || t.host;
                M.path = "/" + (N[4] || "");
                M.fullPath = M.path;
                M.query = (N[5] || "").substring(1);
                M.anchor = (N[6] || "").substring(1);
                if (M.query) {
                    M.fullPath += "?" + M.query;
                    M.params = x.toDict(M.query.replace(/\?/g, "&"))
                }
            } else {
                M.local = true;
                M.protocol = "file";
                M.fullPath = M.path = "/" + O.replace(/\\/g, "/")
            }
            return M
        },
        encode: function(M) {
            if (!M || !M.replace) {
                return M
            }
            return (K.encodeURIComponent || escape)(M)
        },
        decode: function(N) {
            if (N && N.replace) {
                N = N.replace(/\+/ig, "%20");
                try {
                    return (K.decodeURIComponent || unescape)(N)
                } catch (M) {}
            }
            return N
        },
        serialize: function(T, O, P, V, S) {
            function U(aa) {
                if (!aa) {
                    return ""
                }
                var Z = [],
                    Y;
                for (Y in aa) {
                    if (f(aa, Y) && (aa[Y] || aa[Y] === 0)) {
                        Z.push(Y + ":" + e(aa[Y]))
                    }
                }
                return Z.join(";")
            }
            var Q = [],
                X = !S ? e : x.voidFunc,
                M, W = ["ubc", "gstl", "gsflver", "gsalexaver", "gsdotnetver", "gssil", "gsclr", "gsscr", "gsbrlang", "gsmcurl", "lt", "lk", "gsclkpa", "gsclktl"];
            O = O || "=";
            P = P || "&";
            for (M in T) {
                var N = true;
                for (var R in W) {
                    if (W[R] == M) {
                        N = false
                    }
                }
                if (N && f(T, M) && (V || T[M] || T[M] === 0)) {
                    Q.push(M + O + (M == "pcp" || M == "ecp" ? U(T[M]) : X(T[M])))
                }
            }
            for (M = 0; M < W.length; M++) {
                if (f(T, W[M]) && (V || T[W[M]] || T[W[M]] === 0)) {
                    Q.push(W[M] + O + X(T[W[M]]))
                }
            }
            return Q.join(P)
        },
        getEl: function(M) {
            return M.split ? n.getElementById(M) : M
        },
        waitFor: function(R, Q, M, O, N) {
            M = M || 1000;
            O = O || 30;
            var P = setInterval(function() {
                if (R.split) {
                    var U, W = R.split(".", 3),
                        S = W.length,
                        V = K;
                    if (S > 1) {
                        for (var T = 0; T < S; T++) {
                            if (!T || W[T] != "window") {
                                V = V[W[T]];
                                if (!V) {
                                    break
                                }
                            }
                        }
                        U = V
                    }
                }
                if (U || (U = x.getEl(R))) {
                    clearInterval(P);
                    Q(U)
                } else {
                    if (O > 0) {
                        O -= 1
                    } else {
                        clearInterval(P);
                        if (N) {
                            N(U)
                        }
                    }
                }
            }, M)
        },
        getPos: function(N) {
            var M, O, Q, U = null,
                T = [],
                R = n.body,
                V = {};
            if (N.parentNode === null || N.style.display == "none") {
                return false
            }
            if (N.getBoundingClientRect) {
                Q = N.getBoundingClientRect();
                M = Math.max(a.scrollTop, R.scrollTop);
                O = Math.max(a.scrollLeft, R.scrollLeft);
                if (n.compatMode == "BackCompat" && k) {
                    V = {
                        x: Q.left,
                        y: Q.top
                    }
                } else {
                    V = {
                        x: Q.left + O,
                        y: Q.top + M
                    }
                }
                return V
            } else {
                if (n.getBoxObjectFor) {
                    Q = n.getBoxObjectFor(N);
                    var S = (N.style.borderLeftWidth) ? parseInt(N.style.borderLeftWidth, 10) : 0;
                    var P = (N.style.borderTopWidth) ? parseInt(N.style.borderTopWidth, 10) : 0;
                    T = [Q.x - S, Q.y - P]
                } else {
                    T = [N.offsetLeft, N.offsetTop];
                    U = N.offsetParent;
                    if (U != N) {
                        while (U) {
                            T[0] += U.offsetLeft;
                            T[1] += U.offsetTop;
                            U = U.offsetParent
                        }
                    }
                    if (s(F, "opera") != -1 || (s(F, "safari") != -1 && N.style.position == "absolute")) {
                        T[0] -= R.offsetLeft;
                        T[1] -= R.offsetTop
                    }
                }
            }
            if (N.parentNode) {
                U = N.parentNode
            } else {
                U = null
            }
            while (U && U.tagName != "BODY" && U.tagName != "HTML") {
                T[0] -= U.scrollLeft;
                T[1] -= U.scrollTop;
                if (U.parentNode) {
                    U = U.parentNode
                } else {
                    U = null
                }
            }
            V = {
                x: T[0],
                y: T[1]
            };
            return V
        },
        getDocWidth: function() {
            return (a && a.scrollWidth) || (n.body && n.body.scrollWidth) || 0
        },
        getPointer: function(N) {
            var M = n.body || {
                scrollLeft: 0,
                scrollTop: 0
            };
            return {
                x: N.pageX || (N.clientX + (a.scrollLeft || M.scrollLeft) - (a.clientLeft || 0)),
                y: N.pageY || (N.clientY + (a.scrollTop || M.scrollTop) - (a.clientTop || 0))
            }
        },
        observe: function(N, M, P) {
            N = x.getEl(N);
            if (!N) {
                return null
            }

            function O(R) {
                if (!R.target) {
                    R.target = R.srcElement || N
                }
                if (!R.pageX) {
                    var Q = x.getPointer(R);
                    R.pageX = Q.x;
                    R.pageY = Q.y
                }
                R.root = N;
                P.call(N, R)
            }
            if (N.addEventListener) {
                N.addEventListener(M, O, false)
            } else {
                N.attachEvent("on" + M, O)
            }
            return N
        },
        observeTouch: function(M, R) {
            var P, O;
            M = x.getEl(M);
            if (!M) {
                return null
            }

            function Q(S) {
                P = S.pageX;
                O = S.pageY
            }

            function N(T) {
                if (!T.target) {
                    T.target = T.srcElement || M
                }
                try {
                    if (T.changedTouches[0].pageX != P || T.changedTouches[0].pageY != O) {
                        P = null;
                        O = null;
                        return
                    }
                } catch (S) {
                    x.report(config.serviceID, "M_utility_observeTouch", S);
                    P = null;
                    O = null;
                    return
                }
                x.touchPoint = {
                    X: P,
                    Y: O
                };
                P = null;
                O = null;
                T.root = M;
                R.call(M, T)
            }
            if (M.addEventListener) {
                M.addEventListener("touchstart", Q, false);
                M.addEventListener("touchend", N, false)
            } else {
                M.attachEvent("ontouchstart", Q);
                M.attachEvent("ontouchend", N)
            }
            return M
        },
        format: function(M) {
            if (arguments.length == 1) {
                return M
            } else {
                var O = arguments.length;
                for (var N = 1; N < O; N++) {
                    M = M.replace(new RegExp("\\{" + (N - 1) + "\\}", "g"), arguments[N])
                }
                return M
            }
        },
        getInnerText: function(M) {
            M = x.getEl(M);
            if (M && M.innerHTML) {
                return x.trim(M.innerHTML.replace(/<[^>]+>/ig, ""))
            }
            return null
        },
        getInnerUnvisibleText: function(P, M) {
            P = x.getEl(P);
            var O = "";
            if (P && P.innerHTML) {
                var R = P.innerHTML,
                    Q = R.indexOf(M + '="');
                while (Q != -1) {
                    Q += M.length + 2;
                    var N = R.indexOf('"', Q);
                    O += R.substr(Q, N - Q);
                    R = R.substr(N);
                    Q = R.indexOf(M + '="')
                }
            }
            return O
        },
        searchUp: function(U, R, P, S, Q) {
            var M, O, N = c(P),
                V = U && U.parentNode,
                T;
            do {
                O = true;
                if (!N || c(R.tagName) == N) {
                    O = false;
                    for (M in S) {
                        if (f(S, M) && s(c(R[M] || R.getAttribute(M)), c(S[M])) < 0) {
                            O = true;
                            break
                        }
                    }
                }
                if (O) {
                    R = R.parentNode
                } else {
                    return R
                }
                if (Q == 0) {
                    break
                }
                Q--
            } while (R && R != V && R.getAttribute);
            return null
        },
        report: function(N, U, V, P) {
            try {
                V = V || {};
                for (var T = 0; T < x.errorUrls.length; T++) {
                    var M = x.errorUrls[T] + "?gscmd=err&gsrd={0}&gsver={1}&gserrc={2}&gssrvid={3}&gserrobj={4}",
                        Q = m.version,
                        O = new Image(1, 1),
                        S = Math.round(Math.random() * 2147483647);
                    M = (location.protocol == "https:" ? "https://" : "http://") + M;
                    M = x.format(M, S, Q, U, N, x.serialize(V, "~", "'"));
                    O.onload = function() {
                        return true
                    };
                    O.onerror = function() {
                        return true
                    };
                    O.src = M
                }
            } catch (R) {}
        }
    };
    var c = x.lower,
        s = x.indexOf,
        e = x.encode,
        b = x.decode,
        q = Array.prototype.slice;

    function y(M) {
        return !!(M && M.constructor == Array)
    }

    function f(M, N) {
        return (M && M.hasOwnProperty) ? M.hasOwnProperty(N) : false
    }

    function l(M) {
        return typeof M == "string"
    }

    function z(O, M, P) {
        var N = this;
        N.host = O;
        N.reqParams = M || [];
        N.optParams = P || []
    }
    z.prototype = {
        testHost: function(M) {
            var N = this.host;
            if (l(N)) {
                return s(M, N) > -1
            } else {
                return N.test && N.test(M)
            }
        },
        match: function(M) {
            var R, T, U, N, X = 0,
                S = this,
                O = x.resolveUrl(M),
                Q = {},
                V = S.reqParams,
                P = S.optParams,
                W = O.host;
            if (S.testHost(W)) {
                if ((N = O.params)) {
                    for (R in N) {
                        if (f(N, R)) {
                            N[c(R)] = N[R]
                        }
                    }
                    for (R = 0, T = V.length; R < T; R++) {
                        U = N[V[R]];
                        if (!U) {
                            return false
                        } else {
                            Q[V[R]] = U;
                            X++
                        }
                    }
                    for (R = 0, T = P.length; R < T; R++) {
                        U = N[P[R]];
                        if (U) {
                            Q[P[R]] = U;
                            X++
                        }
                    }
                } else {
                    if (V.length) {
                        return false
                    }
                }
                return {
                    host: W,
                    params: Q,
                    paramCount: X
                }
            }
            return false
        }
    };

    function D() {
        var P = /\.net clr ([\d\.]+?)[;$ ]|.net([\d\.]+?)[ce][;$ ]/ig,
            O, N, M;
        while ((O = P.exec(F))) {
            N = O[1] || O[2];
            if (!M || N > M) {
                M = N
            }
        }
        return M
    }

    function o(O, N) {
        N = N || F;
        var M = N.match(O);
        return M ? M[1] : null
    }

    function E() {
        var U, P, N = navigator.plugins,
            R, M, Q, O, T;
        if (N && (R = N.length) > 0) {
            for (P = 0; P < R; P++) {
                U = c(N[P].description);
                M = c(N[P].name);
                if (!Q && U && s(U, "shockwave flash") > -1) {
                    Q = o(/shockwave flash (\d+\.\d+)/i, U)
                }
                if (!O && M && U && s(M, "silverlight") > -1) {
                    O = o(/(\d+\.\d+)/i, U)
                }
            }
        } else {
            if (K.ActiveXObject) {
                for (P = 20; P >= 2; P--) {
                    try {
                        if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + P)) {
                            Q = P + ".0";
                            break
                        }
                    } catch (S) {}
                }
                try {
                    if ((T = new ActiveXObject("AgControl.AgControl"))) {
                        for (P = 10; P > 0; P--) {
                            if (T.IsVersionSupported(P + ".0")) {
                                O = P + ".0";
                                break
                            }
                        }
                    }
                } catch (S) {}
            }
        }
        return {
            flash: Q,
            silverlight: O
        }
    }

    function k() {
        return "\v" == "v"
    }

    function L(M, N) {
        this.name = M;
        this.pattern = N
    }
    L.prototype.match = function(R) {
        var P, M, Q = this,
            O = R.match(Q.pattern),
            N = Q.name;
        if (O) {
            for (P = 0, M = O.length; P < M; P++) {
                N = N.replace("$" + P, O[P] || "")
            }
            return x.trim(N)
        }
        return null
    };

    function h(M, N) {
        return new L(M, N)
    }

    function r(N, P, M) {
        var O = this;
        O.name = N;
        O.pattern = P;
        O.mobile = M
    }
    r.prototype.match = function(R) {
        var P, M, Q = this,
            O = R.match(Q.pattern),
            N = Q.name;
        if (O) {
            for (P = 0, M = O.length; P < M; P++) {
                N = N.replace("$" + P, O[P] || "")
            }
            return {
                name: x.trim(N),
                mobile: Q.mobile
            }
        }
        return null
    };

    function I(N, O, M) {
        return new r(N, O, M)
    }

    function p() {
        x.setCookie("gs_tc", "1");
        var M = x.getCookie("gs_tc");
        x.delCookie("gs_tc");
        return !!M
    }

    function w(M) {
        var N = this,
            O = navigator;
        N.analyze = function() {
            if (N.browser) {
                return N.browser
            }
            var S = {};
            try {
                var Z, R, U, W = screen,
                    X = k() ? O.browserLanguage : O.language,
                    Y = M.os,
                    Q = M.browsers,
                    T = E(),
                    P = O.userAgent.replace("_", ".");
                S.os = O.platform;
                for (R = 0, U = Y.length; R < U; R++) {
                    if ((Z = Y[R].match(P))) {
                        S.os = Z.name;
                        S.mobile = Z.mobile;
                        break
                    }
                }
                S.browser = O.appName;
                for (R = 0, U = Q.length; R < U; R++) {
                    if ((Z = Q[R].match(P))) {
                        S.browser = Z;
                        break
                    }
                }
                S.flash = T.flash;
                S.silverlight = T.silverlight;
                S.alexa = s(F, "alexa") > -1 ? 1 : 0;
                S.resolution = W.width + "*" + W.height;
                S.colorDepth = W.colorDepth || 32;
                S.osLang = c(O.systemLanguage);
                try {
                    S.javaEnabled = O.javaEnabled() ? 1 : 0
                } catch (V) {}
                S.dotNet = D();
                S.browserLang = c(X);
                S.cookieEnabled = p() ? 1 : 0;
                return (N.browser = S)
            } catch (V) {
                x.report(M.serviceID, "M_Browser", V);
                return S
            }
        }
    }

    function j(N, U, P, Q, T, S, M, O) {
        var R = this;
        R.name = N;
        R.host = U;
        R.termKey = P;
        R.encKey = Q;
        R.startKey = S;
        R.numKey = M;
        R.defEnc = T || "utf-8";
        R.pagingType = O;
        Q = Q || "ie";
        R.evaluator = new z(U, [P], [S, M, Q])
    }
    j.prototype.match = function(O) {
        var S, N, Q, R, P = this,
            M = P.evaluator.match(O);
        if (!M) {
            return false
        }
        R = M.params;
        S = Number(R[P.startKey]);
        N = Number(R[P.numKey]);
        S = (isNaN(S) ? 1 : S);
        N = (isNaN(N) ? 10 : N);
        if (!P.pagingType) {
            Q = Math.round(S / N) + 1
        } else {
            if (P.pagingType == 1) {
                Q = S + 1
            } else {
                Q = S
            }
        }
        M.page = Q;
        M.keywords = R[P.termKey];
        M.encoding = R[P.encKey] || P.defEnc;
        if (M.encoding === "utf8") {
            M.encoding = "utf-8"
        }
        return M
    };

    function u(R, S, Q, M, N, T, P, O) {
        return new j(R, S, Q, M, N, T, P, O)
    }

    function A(M) {
        var N = this;

        function O(P) {
            if (N.suffix) {
                P = P + N.suffix
            } else {
                P = P + "_" + x.getHashCode(M.serviceID + "_" + M.domain)
            }
            return e(P)
        }
        N.get = function(P, R) {
            var Q = O(P);
            return x.getCookie(Q, R, true)
        };
        N.set = function(Q, T, P, V, S, U) {
            var R = O(Q);
            S = S || M.domain;
            V = V || M.path;
            U = U || M.secure;
            x.setCookie(R, T, P, V, S, U, true)
        };
        N.remove = function(P) {
            N.set(P, "0", -1000)
        }
    }

    function C(N) {
        var P = this,
            O = N.tracker,
            Q = "UA-26783561-2";

        function M(U, S, T) {
            T = T || N.serviceUrls[0];
            return T + "?" + x.serialize(U, "=", "&", false, S)
        }

        function R(Y, T, X) {
            Y.rd = x.getRandomString(5);
            var W = N.serviceID,
                U, S = new Image(1, 1),
                V = {};
            m.execHook("sender.send", Y, X, V);
            if (V.cancel) {
                return
            }
            U = M(Y, T, X).substring(0, 2000);
            S.onerror = function() {
                setTimeout(function() {
                    var Z = new Image(1, 1);
                    Z.onload = function() {
                        x.report(W, "RetrySuccess", {
                            cmd: Y.gscmd
                        }, Q)
                    };
                    Z.onerror = function() {
                        x.report(W, "SendingFailed", {
                            cmd: Y.gscmd
                        }, Q);
                        return true
                    };
                    Z.src = U
                }, 2000);
                return true
            };
            S.onload = function() {};
            S.src = U;
            P.img = S
        }
        P.checkUrl = function(U, S, T) {
            U.rd = x.getRandomString(5);
            return M(U, S, T).length <= 2000
        };
        P.send = function(X, T, V) {
            if (!X) {
                return
            }
            if (!V) {
                var W = N.serviceUrls;
                for (var U = 0, S = W.length; U < S; U++) {
                    R(X, T, W[U])
                }
            } else {
                R(X, T, V)
            }
        }
    }

    function G(M) {
        var N = this;
        N.parse = function(Q) {
            try {
                var af, Z, P, ab, R, T, aj, S = M.keepAnchor,
                    U = M.ignoreParams,
                    V = M.campaignKey,
                    ac = M.keywordKey,
                    Y = M.sourceKey,
                    al = M.mediumKey,
                    O = M.contentKey,
                    ah = M.groupKey,
                    W = M.channelKey,
                    ak = M.adidKey,
                    ai = M.ad,
                    X = M.cleanUrl;
                Q = Q || t.href;
                ab = x.resolveUrl(Q);
                P = {
                    protocol: ab.protocol,
                    local: ab.isLocal,
                    host: ab.host,
                    path: ab.fullPath,
                    anchor: ab.anchor,
                    params: ab.params
                };
                if (S && ab.anchor) {
                    P.path += "#" + ab.anchor
                }
                if (X) {
                    P.cleanUrl = X
                } else {
                    if (U.length !== 0 && ab.params) {
                        for (var aa in ab.params) {
                            for (af = 0; af < U.length; af++) {
                                if (c(aa) == U[af]) {
                                    delete ab.params[aa]
                                }
                            }
                        }
                        for (af = 0; af < U.length; af++) {
                            delete ab.params[U[af]]
                        }
                        Z = x.serialize(ab.params, "=", "&", false, true);
                        if (Z) {
                            Z = "?" + Z
                        }
                        if (S && ab.anchor) {
                            Z += ("#" + ab.anchor)
                        }
                        P.cleanUrl = [ab.protocol, "://", ab.host, ab.path, Z].join("")
                    } else {
                        P.cleanUrl = [ab.protocol, "://", ab.host, P.path].join("")
                    }
                }
                if (!P.local) {
                    R = new z(ab.host, [], [V, ac, Y, al, O, ah, W, ak]);
                    var ae = {
                        campaign: ai.campaign,
                        group: ai.group,
                        source: ai.source,
                        medium: ai.medium,
                        keyword: ai.keyword,
                        content: ai.content,
                        channel: ai.channel
                    };
                    if ((T = R.match(Q.replace(/#/g, "?")))) {
                        aj = T.params;
                        if (T.paramCount !== 0) {
                            ae.campaign = ai.campaign || ((V != M.campaignKeyDefault) ? b(aj[V]) : null);
                            ae.group = ai.group || (ah != M.groupKeyDefault ? b(aj[ah]) : null);
                            ae.source = ai.source || (Y != M.sourceKeyDefault ? b(aj[Y]) : null);
                            ae.medium = ai.medium || (al != M.mediumKeyDefault ? b(aj[al]) : null);
                            ae.keyword = ai.keyword || (ac != M.keywordKeyDefault ? b(aj[ac]) : null);
                            ae.content = ai.content || (O != M.contentKeyDefault ? b(aj[O]) : null);
                            ae.channel = ai.channel || (W != M.channelKeyDefault ? b(aj[W]) : null);
                            ae.adid = ai.adid || (ak != M.adidKeyDefault ? b(aj[ak]) : null)
                        }
                    }
                    P.ad = ae
                }
                return P
            } catch (ag) {
                x.report(M.serviceID, "M_Url", ag)
            }
        }
    }

    function v(O) {
        var P = this,
            S = new A(O),
            N = {},
            M = {};

        function R() {
            var X, V = P.uid,
                U = P.sid,
                T = [],
                W = [];
            for (X in N) {
                if (f(N, X)) {
                    T.push(X + ":" + e(N[X]))
                }
            }
            if (T.length > 0) {
                V = V + "|" + T.join("|")
            }
            for (X in M) {
                if (f(M, X)) {
                    W.push(X + ":" + e(M[X]))
                }
            }
            if (W.length > 0) {
                U = U + "|" + W.join("|")
            }
            S.set("_gscu", V, 63072000);
            S.set("_gscs", U, 1800);
            S.set("_gscbrs", 1)
        }

        function Q(Z) {
            if (!Z) {
                return null
            }
            var W, U, X = /[^\d\w]+/i,
                T = {},
                Y = {},
                aa = Z.split("|"),
                V;
            if (aa[0].length > 30 || X.test(aa[0])) {
                return null
            }
            T.id = aa[0];
            for (W = 1, U = aa.length; W < U; W++) {
                V = aa[W].split(":");
                Y[V[0]] = b(V[1])
            }
            T.data = Y;
            return T
        }
        P.init = function(W) {
            try {
                var Y, U, aa, T, V, X = "";
                N = {};
                M = {};
                if (O.crossDomain) {
                    Y = x.getUrlParam(t.href.replace("#", "&"), "_gsc");
                    if (Y) {
                        Y = Y.split(";");
                        if (Y.length == 2) {
                            T = b(Y[0]);
                            V = b(Y[1]);
                            U = 1;
                            aa = true
                        }
                    }
                }
                if (!aa) {
                    T = S.get("_gscu");
                    V = S.get("_gscs");
                    U = S.get("_gscbrs")
                }
                if ((T = Q(T))) {
                    P.uid = T.id;
                    N = T.data;
                    if (V = Q(V)) {
                        P.sid = V.id;
                        M = V.data
                    } else {
                        if (!V && U) {
                            X = "t"
                        }
                        P.sid = X + x.getRandomID()
                    }
                } else {
                    P.uid = x.getRandomID();
                    P.sid = x.getRandomID()
                }
                if (!W) {
                    R()
                }
            } catch (Z) {
                x.report(O.serviceID, "M_User", Z);
                P.uid = x.getRandomID();
                P.sid = x.getRandomID();
                N = {};
                M = {};
                R()
            }
        };
        P.saveSessionData = function(T, U) {
            M[T] = U + "";
            R()
        };
        P.saveUserData = function(T, U) {
            N[T] = U + "";
            R()
        };
        P.get = function(T) {
            return N[T] || M[T] || null
        };
        P.serialize = function() {
            return "_gsc=" + S.get("_gscu") + ";" + S.get("_gscs")
        };
        P.isSampled = function() {
            var T = O.sample,
                U = x.getHashCode(P.uid);
            return U % 10000 < T * 100
        }
    }

    function d(M) {
        var N = this;
        N.getRefer = function(O) {
            try {
                if (!O) {
                    try {
                        O = K.top.document.referrer
                    } catch (P) {
                        O = H
                    }
                }
                if (!O) {
                    try {
                        if (K.opener) {
                            O = K.opener.location.href
                        }
                    } catch (P) {}
                }
                return O
            } catch (P) {
                x.report(M.serviceID, "M_Referrer", P)
            }
        }
    }

    function J(O) {
        var U = this,
            S, R, V = O.tracker,
            X = O.origin;

        function W() {
            if (!O.heatmap) {
                return false
            }
            if (O.mcSample == 100) {
                return true
            }
            return Math.round(Math.random() * 10000) < O.mcSample * 100
        }

        function aa() {
            if (O.docWidth) {
                S = (x.getDocWidth() - O.docWidth) / 2;
                R = 0
            } else {
                if (X) {
                    var ab = x.getPos(X);
                    S = ab.x;
                    R = ab.y
                } else {
                    S = 0;
                    R = 0
                }
            }
        }

        function Q(ac, ab) {
            aa();
            return P({
                x: ac - S,
                y: ab - R
            })
        }

        function P(ab) {
            ab.x = Math.round(ab.x / 10) * 10;
            ab.y = Math.round(ab.y / 10) * 10;
            return ab
        }

        function Z(am, aj, ai, ao) {
            var ad, al, ak, af = Number(K[O.snapshotVar] || 0),
                ag = V.getCommon("mc"),
                ac = V.url,
                ae = ac.parse(),
                an = [],
                ab = {};
            if (!(af > -1 && af < 256)) {
                af = 0
            }
            m.execHook("heatmap.send", ag, am, aj, ai, ao, ab);
            if (ab.cancel) {
                return
            }
            var ah = x.searchUp(null, ao.target, "A", null, 3);
            if (ah != null) {
                ag.lk = ah.href;
                ag.lt = _gsUtility.getInnerText(ah) || _gsUtility.getInnerUnvisibleText(ah, "title") + ah.title || _gsUtility.getInnerUnvisibleText(ah, "alt");
                ak = _gsUtility.getPos(ah);
                ak = Q(ak.x, ak.y);
                ag.lx = ak.x;
                ag.ly = ak.y
            }
            ah = x.searchUp(null, ao.target, null, {
                gsregion: ""
            });
            if (ah != null) {
                al = Number(ah.getAttribute("gsregion"));
                if (al > -1 && al < 256) {
                    ag.re = al;
                    if (ah.getAttribute("gsposfixed") == "1") {
                        ak = x.getPos(ah);
                        ak = Q(ak.x, ak.y);
                        am = am - ak.x;
                        aj = aj - ak.y
                    }
                    ah = x.searchUp(null, ao.target, null, {
                        gssnapshot: ""
                    });
                    if (ah) {
                        af = Number(ah.getAttribute("gssnapshot"));
                        if (af < 0 || af > 255) {
                            af = 0
                        }
                    }
                }
            }
            ag.gspver = O.pageVer;
            ag.gsmcoffsetx = am;
            ag.gsmcoffsety = aj;
            an = [ae.protocol, "://", ae.host, ae.path];
            if (O.keepAnchor && ae.anchor) {
                an.push("#", ae.anchor)
            }
            ag.gsmcurl = an.join("");
            ag.gstl = O.pageName || n.title;
            ag.gssn = af;
            ag.gsorurl = ae.cleanUrl;
            V.sender.send(ag)
        }

        function T(ah) {
            if (N(ah)) {
                return
            }
            try {
                if (!W()) {
                    return
                }
                var ag, ac, af = c(ah.target.tagName);
                if (af == "body" || af == "html") {
                    return
                }
                var ad = ah.pageX,
                    ab = ah.pageY;
                if (x.touchPoint) {
                    ad = x.touchPoint.X, ab = x.touchPoint.Y, x.touchPoint = null
                }
                var ai = Q(ad, ab);
                Z(ai.x, ai.y, this, ah)
            } catch (ae) {
                x.report(O.serviceID, "M_Heatmap_doc", ae)
            }
        }

        function Y(af, ag) {
            if (N(ag)) {
                return
            }
            try {
                var ad = ag.clientX,
                    ac = ag.clientY;
                if (x.touchPoint) {
                    ad = x.touchPoint.X, ac = x.touchPoint.Y, x.touchPoint = null
                }
                var ab = P(x.getPos(af)),
                    ah = Q(ad, ac);
                Z(ah.x + ab.x, ah.y + ab.y, af, ag)
            } catch (ae) {
                x.report(O.serviceID, "M_Heatmap_iframe", ae)
            }
        }

        function N(ab) {
            return x.touchPoint && x.touchPoint.X == ab.pageX && x.touchPoint.Y == ab.pageY
        }

        function M() {
            var ad, af, ae = O.iframes,
                ac = frames;
            if (ae.length == 0) {
                for (ad = 0, af = ac.length; ad < af; ad++) {
                    try {
                        var ah = ac[ad].frameElement || ac[ad];
                        if (ah.contentDocument || ac[ad].document) {
                            ah.contentDocument = ah.contentDocument || ac[ad].document;
                            ae.push(ah)
                        }
                    } catch (ag) {}
                }
            }
            for (ad = 0, af = ae.length; ad < af; ad++) {
                var ab = x.getEl(ae[ad]);
                if (ab) {
                    try {
                        ab = ab.frameElement || ab;
                        var ai = ab.contentDocument;
                        var aj = (function(ak) {
                            return function(al) {
                                Y(ak, al)
                            }
                        })(ab);
                        if (n.ontouchstart !== undefined) {
                            x.observeTouch(ai, aj)
                        }
                        x.observe(ai, "mouseup", aj)
                    } catch (ag) {}
                }
            }
        }
        U.bind = function() {
            if (U.isBind || !O.heatmap) {
                return
            }
            U.isBind = true;
            if (n.ontouchstart !== undefined) {
                x.observeTouch(n, T)
            }
            x.observe(n, "mouseup", T);
            if (/loaded|complete/.test(n.readyState)) {
                M()
            } else {
                x.observe(K, "load", M)
            }
        };
        U.init = function() {
            U.bind()
        }
    }

    function i(M) {
        var N = this;
        N.orders = [];
        N.ordersForEcom = [];
        N.addOrder = function(Q, O, P) {
            O = Number(O);
            N.orders.push({
                orderid: Q + "",
                price: O || 0,
                quantity: 0,
                user: P,
                products: [],
                recal: !O
            })
        };
        N.addProduct = function(O, aa, X, W, Q, P) {
            try {
                var R, T, Y, Z, S, V = N.orders,
                    ab = {};
                O = O + "";
                W = Number(W) || 0;
                Q = Number(Q) || 0;
                for (R = 0, T = V.length; R < T; R++) {
                    if (V[R].orderid == O) {
                        Y = V[R];
                        break
                    }
                }
                if (!Y) {
                    Y = {
                        orderid: O,
                        price: 0,
                        quantity: 0,
                        products: [],
                        recal: true
                    };
                    V.push(Y)
                }
                Z = Y.recal;
                S = Number((W * Q).toFixed(2));
                ab = {
                    orderid: O,
                    name: aa,
                    sku: X,
                    quantity: Q,
                    unitPrice: W,
                    price: S,
                    category: P
                };
                Y.quantity += ab.quantity;
                Y.products.push(ab);
                if (Z) {
                    Y.price = Number((Y.price + S).toFixed(2))
                }
            } catch (U) {
                x.report(M.serviceID, "FC_addProduct", U)
            }
        }
    }

    function g(O) {
        var M = this,
            N = t.hostname;
        M.ad = {};
        M.properties = {};
        M.pageProperties = null;
        M.serviceID = O;
        M.serviceUrls = ["//recv1.conac.cn/gs.gif", "//recv2.conac.cn/gs.gif"];
        M.heatmapUrl = "";
        M.redirectServer = "";
        M.redirectServerPath = "/redirect.gif";
        M.campaignKeyDefault = "utm_campaign";
        M.mediumKeyDefault = "utm_medium";
        M.sourceKeyDefault = "utm_source";
        M.groupKeyDefault = "utm_adgroup";
        M.keywordKeyDefault = "utm_term";
        M.contentKeyDefault = "utm_content";
        M.channelKeyDefault = "utm_channel";
        M.accountKeyDefault = "utm_account";
        M.adidKeyDefault = "gsadid";
        M.campaignKey = M.campaignKeyDefault;
        M.mediumKey = M.mediumKeyDefault;
        M.sourceKey = M.sourceKeyDefault;
        M.groupKey = M.groupKeyDefault;
        M.keywordKey = M.keywordKeyDefault;
        M.contentKey = M.contentKeyDefault;
        M.channelKey = M.channelKeyDefault;
        M.accountKey = M.accountKeyDefault;
        M.adidKey = M.adidKeyDefault;
        M.ignoreParams = ["gclid", "bdclkid", "gs_ws", M.campaignKey, M.mediumKey, M.sourceKey, M.groupKey, M.keywordKey, M.contentKey, M.channelKey, M.accountKey, "gsadid"];
        M.searchEngines = [u("google", /(\w+\.)*google\.(\w+|(com|co)\.\w+)/i, "q", "ie", "utf-8", "start", "num"), u("baidu", /(\w+\.)*baidu\.(com|cn|com\.cn)/i, "wd", "ie", "gb2312", "pn", "rn"), u("baidu", /(\w+\.)*baidu\.(com|cn|com\.cn)/i, "word", "ie", "gb2312", "pn", "rn"), u("yahoo", /(\w+\.)cn\.yahoo\.com/i, "q", "ei", "utf-8", "b"), u("yahoo", /(\w+\.)*yahoo\.(\w+|(com|co)\.\w+)/i, "p", "ei", "utf-8", "b"), u("yahoo", /(\w+\.)*yahoo\.cn/i, "q", "ei", "utf-8", "b"), u("live", /(\w+\.)*live\.\w+/i, "q", null, "utf-8", "first"), u("youdao", /(\w+\.)*youdao\.com/i, "q", "ue", "utf-8", "start"), u("soso", /(\w+\.)*soso\.com/i, "w", null, "gb2312", "pg", null, 2), u("gougou", /(\w+\.)*gougou\.com/i, "search", null, "utf-8", "page", null, 1), u("sogou", /(\w+\.)*sogou\.com/i, "query", null, "gb2312", "page", null, 1), u("bing", /\bbing\.(\w+)/i, "q", null, "utf-8", "first"), u("118114", /\b118114\.cn/i, "kw", null, "gb2312", "start"), u("jike", /\bjike\.com/i, "q", null, "utf-8", "page", "ps", 2), u("panguso", /\bpanguso\.com/i, "q", null, "utf-8", "p", "n", 1), u("360", /\b360\.cn/i, "q", null, "utf-8", "pn", "", 2), u("360", /\bso\.com/i, "q", null, "utf-8", "pn", "", 2), u("UC", /glb\.uc\.cn/i, "keyword", null, "utf-8", "page", "pagesize", 2), u("OCN", /ocnsearch\.goo\.ne\.jp/i, "MT", null, "utf-8", "FR", "", 1), u("fenrir", /search\.fenrir-inc\.com/i, "q", null, "utf-8", "start", "", 1), u("nifty", /search\.nifty\.com/i, "q", null, "utf-8", "start", "", 1), u("biglobe", /search\.biglobe\.ne\.jp/i, "q", null, "utf-8", "start", "num", 1), u("sweetim", /search\.sweetim\.com/i, "q", null, "utf-8", "start", "", 1), u("AVG", /isearch\.avg\.com/i, "q", null, "utf-8", "pagenum", "", 1), u("mywebsearch", /search\.mywebsearch\.com/i, "searchfor", null, "utf-8"), u("shenma", /^m\.(\w+\.)?sm\.cn/i, "q", null, "utf-8"), u("aol", ".aol.com", "q"), u("lycos", ".lycos.com", "query"), u("ask", ".ask.com", "q"), u("altavista", ".altavista.com", "q"), u("netscape", ".netscape.com", "query"), u("cnn", ".cnn.com", "query"), u("gigablast", ".gigablast.com", "q"), u("search", ".search.com", "q"), u("pchome", ".pchome.com", "q")];
        M.contentNetworkKey = "content_";
        M.os = [I("$1 / iOS$2", /^.*(iPhone|iPad|iPod).*? i?OS[\. ](\d(\.\d)?).*$/i, 1), I("$1 $2", /(Android)[ \/\.]?(\d+[\._]\d+?)?/i, 1), I("WindowsMobile $1", /WindowsMobile\/(\d+\.\d+)|windows ce/i, 1), I("$1 $2", /(Windows Phone).*?(\d+\.\d+)/i, 1), I("Symbian S$1", /Series ?(60|40)/i, 1), I("$1 OS $2", /(BlackBerry)[^\/]*\/(\d\.\d)/i, 1), I("$0", /Palm|Symbian|BlackBerry|Nokia|iPhone|Android|WindowsMobile/i, 1), I("$1 8", /(Windows) nt 6.2/i), I("$1 7 or 2008R2", /(Windows) nt 6.1/i), I("$1 Vista or 2008", /(Windows) nt 6.0/i), I("$1 Server 2003", /(Windows) nt 5.2/i), I("$1 XP", /(Windows) nt 5.1/i), I("$1 2000", /(Windows) nt 5.0/i), I("Mac $1", /Mac os x (\d+\.\d+)|Macintosh/i), I("$0", /Linux|Windows 98/i)];
        M.browsers = [h("$1 $2", /(Firefox|Chrome|Opera|IEMobile|UCWeb|Opera Mini|NetFront|IceweaselBlackBerry|QQBrowser)[\/ ]?(\d+\.\d)/i), h("UCWeb $2", /(UCWeb|UCBrowser|\sUC\s)[ \/\.]?((\d+(\.\d+)?))?/i), h("$2 $1", /Version\/(\d+\.\d).*(Safari)/i), h("Safari", /AppleWebKit/i), h("$2$3 / IE $1", /msie (\d+)\.\d.*(Maxthon|TheWorld|Avant Browser|TencentTraveler|GreenBrowser|360SE)[ \/]?(\d+\.\d)?/i), h("Maxthon$3 / $1", /Apple(WebKit).*(Maxthon)[ \/]?(\d+\.\d)?/i), h("Sogou / IE $1", /msie (\d+)\.\d.*?se \d+/i), h("IE $1", /msie ?(\d+)\.\d?/i)];
        if (N.substring(0, 4) == "www.") {
            N = N.substring(4)
        }
        M.domain = N;
        M.path = "/";
        M.sessionTimeout = 30 * 60;
        M.sample = 100;
        M.origin = n.body;
        M.mcSample = 100;
        M.iframes = [];
        M.snapshotVar = "SnapshotID";
        M.tsVar = "GSTS"
    }

    function B(P) {
        var R = this,
            Q = new g(P);
        Q.tracker = R;
        R.serviceID = P;
        R.config = Q;

        function N() {
            try {
                if (x.getCookie("_gsHijack")) {
                    return
                }
                if (top != K && top.location.href === t.href) {
                    x.report(P, "WebPageHijack");
                    x.setCookie("_gsHijack", 1)
                }
            } catch (X) {}
        }

        function T() {
            if (Q.trackLocal) {
                return false
            }
            var X = t.hostname;
            return t.protocol === "file:" || s(X, "localhost") > -1 || s(X, "127.") == 0 || s(X, "192.168.") == 0 || s(X, "10.") == 0 || s(X, "172.") == 0
        }

        function M() {
            var X = c(t.hash);
            return Q.heatmap && s(X, "#gwdheatmap&") > -1 && s(X, P.substring(4)) > -1
        }

        function W() {
            return !P || T() || M() || s(F, Q.ignoreUA) > -1 || !R.user.isSampled()
        }

        function O(Y) {
            var X = R.user;
            return {
                gsver: m.version,
                gscmd: Y,
                gssrvid: P,
                gsuid: X.uid,
                gssid: X.sid,
                gsltime: x.getLocalTime(),
                gstmzone: x.getTimeZone(),
                gsjp: Q.junction,
                rd: 1
            }
        }

        function S(Y) {
            var X = R.browser.analyze();
            Y.gsscr = X.resolution
        }

        function V(Y) {
            var X = new Date(),
                Z = Math.round((X - Y) / 1000);
            if (Z > 180) {
                Z = 180
            }
            if (Z < 0) {
                Z = 0
            }
            R.duration = Z
        }

        function U(X, Y) {
            if (!R.hbSent) {
                R.trackHeartbeat(X, Y);
                R.hbSent = 1;
                return true
            }
        }
        R.getCommon = O;
        R.init = function() {
            if (R.isInit) {
                R.user.init();
                return
            }
            R.user = new v(Q);
            R.browser = new w(Q);
            R.referrer = new d(Q);
            R.url = new G(Q);
            R.ecom = new i(Q);
            R.sender = new C(Q);
            R.heatmap = new J(Q);
            R.user.init();
            var ab, aa = m.plugins,
                ae = aa.length;
            for (ab = 0; ab < ae; ab++) {
                var ac = aa[ab],
                    X = ac.name;
                R[X] = new ac.template(Q)
            }
            if (M()) {
                R.showHeatmap()
            }
            if (!W()) {
                if (Q.lazyBinding) {
                    x.observe(K, "load", function() {
                        R.heatmap.init()
                    })
                } else {
                    R.heatmap.init()
                }
                R.pvid = x.getRandomID();
                var ag = new Date();
                x.observe(K, "load", function() {
                    var ah = K[Q.tsVar] || ag;
                    V(ah)
                });
                x.observe(K, "beforeunload", function() {
                    if (R.duration == null) {
                        var ah = K[Q.tsVar] || ag;
                        V(ah)
                    }
                    U()
                });
                var af;
                var Z = R.user.sid;
                var ad = R.user.uid;
                var Y = K.setInterval(function() {
                    if (!R.conditionMatch) {
                        R.user.init(true);
                        var ah = R.user.get("pv");
                        if (af && af < ah) {
                            R.conditionMatch = 1
                        } else {
                            if (R.user.sid != Z) {
                                R.conditionMatch = 1
                            }
                        }
                        af = ah
                    }
                    if (R.conditionMatch && R.duration != null) {
                        U(Z, ad);
                        K.clearInterval(Y)
                    }
                }, 1000)
            } else {
                R.disabled = true
            }
            R.isInit = true
        };
        R.track = function(ag, X) {
            try {
                R.init();
                if (R.disabled) {
                    return
                }
                var ah = Q.properties,
                    al = Q.pageProperties,
                    ak, ac = R.user,
                    Z, Y = R.url,
                    aa, ae = O("spv"),
                    ai = (ag && X) ? t.href : "";
                aa = ag || t.href;
                ag = Y.parse(aa);
                ai = R.referrer.getRefer(ai);
                Z = Number(ac.get("pv")) || 0;
                if (!R.isSent) {
                    ae.pvid = R.pvid;
                    R.isSent = 1
                }
                ae.gstl = Q.pageName || n.title;
                ae.ubc = Q.breadcrumb;
                ae.gscp = x.serialize(ah, "::", "||", false, false);
                ae.pcp = al;
                ae.gsurl = aa;
                ak = ag.ad;
                ae.adcp = ak.campaign;
                ae.adgp = ak.group;
                ae.adsr = ak.source;
                ae.admd = ak.medium;
                ae.adkw = ak.keyword;
                ae.adct = ak.content;
                ae.adch = ak.channel;
                ae.adid = ak.adid;
                S(ae);
                ae.gsref = ai || "";
                R.sender.send(ae);
                ac.saveSessionData("pv", ++Z);
                if (R.rsDomain && Z == 1 && (!H || s(H, R.rsDomain) > -1)) {
                    var aj = ae;
                    aj.gscmd = "rpv";
                    var ab = [Q.redirectServer, x.getHashCode(R.rsDomain), Q.redirectServerPath].join("");
                    R.sender.send(aj, false, ab)
                }
                N()
            } catch (af) {
                x.report(P, "FC_track", af)
            }
        };
        R.trackLink = function(aa, Z, Y, X) {
            return R.bindEvent(Z, "click", function(ab) {
                R.track(aa, true)
            }, Y, X)
        };
        R.trackECom = function() {
            try {
                R.init();
                if (R.disabled) {
                    return
                }
                var af, ad, ai, ab, X, ag = R.sender,
                    ak = R.ecom.orders,
                    ae = O("ecom"),
                    Y, aa, am, al = [],
                    ac = R.user,
                    ah = ac.get("_gsecom");
                if (ah) {
                    ah = ah.split(",")
                } else {
                    ah = []
                }
                for (af = 0, ai = ak.length; af < ai; af++) {
                    aa = ak[af];
                    X = e(aa.orderid);
                    if (s(ah, X) > -1) {
                        continue
                    }
                    ah.push(X);
                    ae.gsorderid = aa.orderid;
                    ae.gstotal = aa.price;
                    ae.gsquan = aa.quantity;
                    ae.gsuserid = aa.user;
                    for (var Z in R.ecom.ordersForEcom) {
                        if (R.ecom.ordersForEcom[Z].orderid == aa.orderid) {
                            ae.ecp = R.ecom.ordersForEcom[Z].ecomProperties;
                            break
                        }
                    }
                    Y = aa.products;
                    al = [];
                    for (ad = 0, ab = Y.length; ad < ab; ad++) {
                        am = Y[ad];
                        am = x.serialize(am, "::", ",,", false, true);
                        al.push(am)
                    }
                    ae.gsproducts = al.join("||");
                    if (!ag.checkUrl(ae)) {
                        for (ad = 0; ad < Y.length; ad++) {
                            am = Y[ad];
                            am = x.serialize(am, "::", ",,", false, true);
                            ae.gsproducts = am;
                            ag.send(ae)
                        }
                    } else {
                        ag.send(ae)
                    }
                }
                ac.saveSessionData("_gsecom", ah.join(","));
                R.ecom.orders = []
            } catch (aj) {
                x.report(P, "FC_trackECom", aj)
            }
        };
        R.trackClickthrough = function(ac, X) {
            try {
                R.init();
                if (R.disabled) {
                    return
                }
                if (ac || X) {
                    var Z = O("ct"),
                        ab = R.lastSearchID;
                    if (ab) {
                        Z.gsssid = ab;
                        if (X) {
                            var Y = x.resolveUrl(X);
                            Z.gsclkpro = Y.protocol;
                            Z.gsclkdm = Y.host;
                            Z.gsclkpa = Y.fullPath
                        }
                        Z.gsclktl = ac;
                        R.sender.send(Z)
                    }
                }
            } catch (aa) {
                x.report(P, "FC_trackClickthrough", aa)
            }
        };
        R.trackHeartbeat = function(X, Y) {
            var Z = O("hb");
            Z.pvid = R.pvid;
            Z.pld = R.duration;
            Z.gssid = X || Z.gssid;
            Z.gsuid = Y || Z.gsuid;
            R.sender.send(Z)
        };
        R.trackSiteSearch = function(ac, Y, Z, af, ae) {
            try {
                R.init();
                if (R.disabled) {
                    return
                }
                var ab = O("ss"),
                    aa = x.getRandomID();
                if (af) {
                    ab.gsskwd = x.getUrlParam(t.href, ac);
                    ab.gssenc = Z || "utf-8";
                    ab.gsscat = x.getUrlParam(t.href, Y)
                } else {
                    if (Z) {
                        ab.gsskwd = ac;
                        ab.gsscat = Y;
                        ab.gssenc = Z
                    } else {
                        ab.gsskwd = e(ac);
                        ab.gsscat = e(Y);
                        ab.gssenc = "utf-8"
                    }
                }
                if (!ab.gsskwd) {
                    return
                }
                ab.gsssid = R.lastSearchID = aa;
                ae = ae || H;
                if (ae) {
                    var X = x.resolveUrl(ae);
                    ab.gssrefpa = X.fullPath;
                    ab.gssrefdm = X.host
                }
                R.sender.send(ab)
            } catch (ad) {
                x.report(P, "FC_trackSiteSearch", ad)
            }
        };
        R.trackEvent = function(Z, X, Y, ac) {
            R.init();
            if (R.disabled) {
                return
            }
            try {
                var ab = O("ev"),
                    aa = t.href;
                ab.eca = Z;
                ab.eac = X;
                ab.eva = ac;
                ab.ela = Y;
                aa = R.url.parse(aa);
                ab.gsourl = aa.cleanUrl;
                R.sender.send(ab)
            } catch (ad) {
                x.report(P, "FC_trackEvent", ad)
            }
        };
        R.bindEvent = function(aa, X, ab, Z, Y) {
            Y = Y || {};
            return x.observe(aa, X, function(ad) {
                if (!ad || !ad.target) {
                    return
                }
                var ac = x.searchUp(aa, ad.target, Z, Y);
                if (ac != null) {
                    ad.matched = ad.target;
                    ab(ad);
                    return
                }
            })
        };
        R.bindSearchResults = function(X, Y) {
            return R.bindEvent(X, "click", function(aa) {
                var Z = aa.matched;
                R.trackClickthrough(x.getInnerText(Z), Z.href)
            }, "a", Y)
        };
        R.showHeatmap = function() {
            var Y = Q.heatmapUrl;
            m.heatmapUrl = t.href;
            var X = n.createElement("script");
            X.src = Y;
            n.getElementsByTagName("head")[0].appendChild(X)
        };
        R.addOrder = function(Y, X) {
            R.ecom.addOrder(Y, Number(X))
        };
        R.addProduct = function(ac, Y, ab, Z, aa, X) {
            R.ecom.addProduct(ac, Y, ab, Number(Z), Number(aa), X)
        };
        R.setSessionTimeout = function(X) {
            if (X < 1 || X > 3600) {
                return
            }
            Q.sessionTimeout = X
        };
        R.setBreadcrumb = function(X) {
            R.config.breadcrumb = X
        };
        R.setCampaign = function(X) {
            if (X && X.length != 0) {
                Q.ad.campaign = X
            }
        };
        R.setGroup = function(X) {
            if (X && X.length != 0) {
                Q.ad.group = X
            }
        };
        R.setContent = function(X) {
            if (X && X.length != 0) {
                Q.ad.content = X
            }
        };
        R.setKeyword = function(X) {
            if (X && X.length != 0) {
                Q.ad.keyword = X
            }
        };
        R.setMedium = function(X) {
            if (X && X.length != 0) {
                Q.ad.medium = X
            }
        };
        R.setSource = function(X) {
            if (X && X.length != 0) {
                Q.ad.source = X
            }
        };
        R.setAdid = function(X) {
            if (X && X.length != 0) {
                Q.ad.adid = X
            }
        };
        R.setCampaignKey = function(X) {
            Q.ignoreParams.push(Q.campaignKey = c(X))
        };
        R.setMediumKey = function(X) {
            Q.ignoreParams.push(Q.mediumKey = c(X))
        };
        R.setContentKey = function(X) {
            Q.ignoreParams.push(Q.contentKey = c(X))
        };
        R.setSourceKey = function(X) {
            Q.ignoreParams.push(Q.sourceKey = c(X))
        };
        R.setKeywordKey = function(X) {
            Q.ignoreParams.push(Q.keywordKey = c(X))
        };
        R.setGroupKey = function(X) {
            Q.ignoreParams.push(Q.groupKey = c(X))
        };
        R.setChannelKey = function(X) {
            Q.ignoreParams.push(Q.channelKey = c(X))
        };
        R.setAdidKey = function(X) {
            Q.ignoreParams.push(Q.adidKey = c(X))
        };
        R.setContentNetworkPrefix = function(X) {
            Q.contentNetworkKey = X
        };
        R.setChannel = function(Z, X, Y) {
            var aa;
            if (X) {
                if (Y) {
                    aa = x.getUrlParam(H, X)
                } else {
                    aa = x.getUrlParam(t.href, X)
                }
                if (aa) {
                    Z = aa
                }
            }
            if (Z && Z.length != 0) {
                Q.ad.channel = Z
            }
        };
        R.setIgnoreTrafficKeyword = function(X) {
            if (X) {
                Q.ignoreUA = X
            }
        };
        R.setCustomProperty = function(Y, X, aa, Z) {
            var ab = X;
            if (aa === "cookie") {
                ab = x.getCookie(Z) || X
            } else {
                if (aa === "query") {
                    ab = x.getUrlParam(t.href, Z) || X
                }
            }
            if (ab != null) {
                Q.properties[Y] = ab
            }
        };
        R.setPageProperty = function(X, Y) {
            if (X == null || Y == null) {
                return
            }
            if (!Q.pageProperties) {
                Q.pageProperties = {}
            }
            Q.pageProperties[X] = Y
        };
        R.setEcomProperty = function(X, Z, ab) {
            if (X == null || Z == null || ab == null) {
                return
            }
            for (var aa in R.ecom.ordersForEcom) {
                if (R.ecom.ordersForEcom[aa].orderid == X) {
                    R.ecom.ordersForEcom[aa].ecomProperties[Z] = ab;
                    return
                }
            }
            var Y = R.ecom.ordersForEcom.push({
                orderid: X,
                ecomProperties: {}
            });
            R.ecom.ordersForEcom[Y - 1].ecomProperties[Z] = ab
        };
        R.setHeatmapScriptUrl = function(X) {
            Q.heatmapUrl = X
        };
        R.setPageName = function(X) {
            Q.pageName = X
        };
        R.setServiceUrl = function(X) {
            Q.serviceUrls = [X]
        };
        R.setServiceUrls = function(X) {
            if (!y(X)) {
                X = q.call(arguments)
            }
            Q.serviceUrls = X
        };
        R.setJunctionPoint = function(X) {
            Q.junction = X
        };
        R.setCookieProperties = function(Y, Z, X) {
            if (Y && Y.charAt(0) === ".") {
                Y = Y.substring(1)
            }
            Q.domain = Y || Q.domain;
            Q.path = Z || Q.path;
            Q.secure = !!X
        };
        R.setSamplingRate = function(X) {
            Q.sample = X
        };
        R.setClickSamplingRate = function(X) {
            Q.mcSample = X
        };
        R.setDocWidth = function(X) {
            Q.docWidth = Number(X)
        };
        R.setOriginalUrl = function(X) {
            Q.cleanUrl = X
        };
        R.setOriginElement = function(X) {
            Q.origin = x.getEl(X)
        };
        R.setPageVersion = function(X) {
            Q.pageVer = X
        };
        R.addOrganicSearch = function(aa, ac, Y, ae, X, ab, ad, Z) {
            Q.searchEngines.push(u(aa, ac, c(Y), c(ae), c(X), c(ab), c(ad), Z))
        };
        R.getWDCookieString = function() {
            R.init();
            return R.user.serialize()
        };
        R.jump = function(Y) {
            var X = R.getWDCookieString(),
                Z = l(Y) ? Y : Y.action;
            t.href = Z + "#" + X
        };
        R.addIgnoreParams = function() {
            Q.ignoreParams = Q.ignoreParams.concat(q.call(arguments))
        };
        R.enableLazyClickTrace = function(X) {
            Q.lazyBinding = !X
        };
        R.enableHeatmap = function(X) {
            Q.heatmap = !X;
            if (R.heatmap) {
                R.heatmap.bind()
            }
        };
        R.enableCrossDomain = function(X) {
            Q.crossDomain = !X
        };
        R.enableLocalTraffic = function() {
            Q.trackLocal = true
        };
        R.enableAnchor = function(X) {};
        R.keepAnchor = function(X) {
            Q.keepAnchor = !X
        };
        R.enableRedirectServer = function(X) {
            R.rsDomain = X || Q.domain
        };
        R.setErrorUrls = function(X) {
            if (!y(X)) {
                X = q.call(arguments)
            }
            x.errorUrls = X || []
        }
    }
    var m = {
        version: "3.0.0.4",
        hooks: [],
        plugins: [],
        trackers: {},
        register: function(M, O, N) {
            m.plugins.push({
                name: M,
                template: O
            });
            m.addApis(N)
        },
        addApis: function(M) {
            if (M) {
                for (var N in M) {
                    if (f(M, N)) {
                        B.prototype[N] = M[N]
                    }
                }
            }
        },
        addHook: function(N, O) {
            var M = m.hooks;
            N = c(N);
            M[N] = M[N] || [];
            M[N].push(O)
        },
        execHook: function(N) {
            var Q;
            if ((Q = m.hooks[N])) {
                for (var O = 0, M = Q.length; O < M; O++) {
                    var P = Q[O];
                    P.apply(P, q.call(arguments, 1))
                }
            }
        },
        isTrackerExist: function(M) {
            return !!m.trackers[M]
        },
        getTracker: function(M) {
            return m.trackers[M] || (m.trackers[M] = new B(M))
        },
        loadCallback: function(N, M, O) {
            N = N || "_gsCallback";
            return x.waitFor("window." + N, function(P) {
                P()
            }, M, O)
        }
    };
    K.WebDissector = m;
    K._gsUtility = x;
    x.resolveURL = x.resolveUrl
})();
(function() {
    var b = _gsUtility;

    function a(e, g) {
        if (location.pathname.indexOf("crossdomain_helper") == -1) {
            var h;
            for (var f = 0, d = e.length; f < d; f++) {
                h = document.createElement("iframe");
                h.src = b.format("//{0}{1}#{2}", e[f].domain, e[f].path, g);
                h.style.display = "none";
                document.body.appendChild(h)
            }
        }
        b.setCookie("_gspc1", 1, 1600);
        b.setCookie("_gspc2", 1)
    }

    function c() {
        try {
            this.enableCrossDomain();
            var h, q = Array.prototype.slice.call(arguments),
                j = q.length,
                o = location.hostname,
                g = !(b.getCookie("_gspc1") && b.getCookie("_gspc2")),
                l = [],
                d, e = false;
            for (h = 0; h < j; h++) {
                var f = q[h].split("/")[0],
                    p = q[h].substring(q[h].indexOf("/")),
                    m = g && location.pathname != p;
                if (f != o) {
                    var n = f.substr(0, 4) == "www." ? f.substr(4) : f;
                    if (o.indexOf(n, o.length - n.length + 1) !== -1) {
                        continue
                    }
                    if (m) {
                        e = true;
                        l.push({
                            domain: f,
                            path: p
                        })
                    }
                }
            }
            if (e) {
                d = this.getWDCookieString();
                if (document.body) {
                    a(l, d)
                } else {
                    b.waitFor("document.body", function() {
                        a(l, d)
                    })
                }
            }
        } catch (k) {
            b.report(this.config.serviceID, "P_CD", k)
        }
    }
    WebDissector.addApis({
        linkDomains: function() {
            c.apply(this, Array.prototype.slice.apply(arguments))
        }
    })
})();
eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) d[e(c)] = k[c] || e(c);
        k = [function(e) {
            return d[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1;
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p;
}('r s(5){9 c=g.l.p;9 o=g.l.t;9 6;9 3=5;a(5.4(0,2)==\'//\'||5.4(0,7)==\'n://\'||5.4(0,8)==\'u://\'){a(5.4(0,2)==\'//\'){3=5.4(2)}d a(5.4(0,7)==\'n://\'){3=5.4(7)}d{3=5.4(8)}}a(3.m(\'/\')>0&&3.v(\'/\')==3.b-1){3=3.4(0,3.b-1)}9 e=3.m(\'/\');a(e>0){9 i=3.4(0,e);9 h=3.4(e)+"/";a(i==c.4(0-i.b)&&o.4(0,h.b)==h){6=k}d{6=j}}d{a(3==c.4(0-3.b)){6=k}d{6=j}}q 6}r w(f){9 c=g.l.p;9 6;a(c.b>=f.b&&f==c.4(0,f.b)){6=k}d{6=j}q 6}', 33, 33, '|||checkdomain|slice|tagdomain|result|||var|if|length|currenthost|else|index|punycode|window|directory|maindomain|false|true|location|indexOf|http|currentpath|host|return|function|DomainCheck|pathname|https|lastIndexOf|PunycodeCheck'.split('|'), 0, {}));
if (DomainCheck('www.neea.edu.cn;www.neea.cn') || DomainCheck('教育部教育考试院.公益') || DomainCheck('教育部教育考试院.公益.cn') || PunycodeCheck('xn--wcva295r7tab122oyliuml.xn--55qw42g') || DomainCheck('教育部教育考试院.公益') || DomainCheck('教育部教育考试院.公益.cn') || PunycodeCheck('xn--wcva295r7tab122oyliuml.xn--55qw42g') || DomainCheck('conac.cn')) {
    var _zbbTracker = WebDissector.getTracker('CA330000000406725530004');
    _zbbTracker.track();
    document.write(unescape("%3Cspan id='_ideConac' %3E%3C/span%3E"));
    var span_msg = document.getElementById("_ideConac");
    span_msg.innerHTML = '<a href="https://bszs.conac.cn/sitename?method=show&id=E70D86C57FD1FF20E05310291AACB1BD" target="_blank"><img id="imgConac" vspace="0" hspace="0" border="0" src="https://dcs.conac.cn/image/blue.png" data-bd-imgshare-binded="1"></a>';
} else {
    document.write(unescape("%3Cspan id='_ideConac' %3E%3C/span%3E"));
    var span_msg = document.getElementById("_ideConac");
    span_msg.innerHTML = '<a href="https://bszs.conac.cn/sitename?method=show&id=E70D86C57FD1FF20E05310291AACB1BD" target="_blank"><img id="imgConac" vspace="0" hspace="0" border="0" src="https://dcs.conac.cn/image/blue_error.png" data-bd-imgshare-binded="1"></a>';
}