var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
function decoratorA() {
    return function (target, methodName, descriptor) {
    };
}
function methodLogger() {
    return function (target, methodName, descriptor) {
        var originalFn = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.log("method [" + methodName + "] executing...");
            originalFn.apply(void 0, args);
            console.log("method [" + methodName + "] executed.");
        };
    };
}
function mixin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return function (target) {
        for (var _i = 0; _i < args.length; _i++) {
            var arg = args[_i];
            for (var _a = 0, _b = Object.getOwnPropertyNames(arg.prototype); _a < _b.length; _a++) {
                var key = _b[_a];
                if (key === 'constructor')
                    continue; // 跳过构造函数
                Object.defineProperty(target.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key));
            }
        }
    };
}
var A = (function () {
    function A() {
    }
    A.prototype.say = function () { console.log('say!!'); return 1; };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.hi = function () { console.log('hi!!'); return 2; };
    return B;
})();
var DecoratorTest = (function () {
    function DecoratorTest() {
    }
    DecoratorTest.prototype.startRunning = function (msg) {
        console.log("msg(): " + msg);
    };
    Object.defineProperty(DecoratorTest.prototype, "startRunning",
        __decorate([
            decoratorA(),
            methodLogger()
        ], DecoratorTest.prototype, "startRunning", Object.getOwnPropertyDescriptor(DecoratorTest.prototype, "startRunning")));
    DecoratorTest = __decorate([
        mixin(A, B)
    ], DecoratorTest);
    return DecoratorTest;
})();
(function () {
    var obj = new DecoratorTest();
    obj.startRunning('hello world!!');
    obj['say']();
    obj['hi']();
})();
