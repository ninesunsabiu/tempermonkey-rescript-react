!function(React2) {
    "use strict";
    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = {
            __proto__: null,
            [Symbol.toStringTag]: "Module"
        };
        return e && Object.keys(e).forEach((function(k) {
            if ("default" !== k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: !0,
                    get: function() {
                        return e[k];
                    }
                });
            }
        })), n.default = e, Object.freeze(n);
    }
    var React__namespace = _interopNamespace(React);
    console.log("linjx-log", React__namespace.createElement(React__namespace.StrictMode, {
        children: "hello world"
    }));
}();
