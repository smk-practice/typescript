
function decoratorA(): MethodDecorator {
    return function (target: Function, methodName: string, descriptor:PropertyDescriptor) {

    }
}

function methodLogger(): MethodDecorator {
    return function (target: Function, methodName: string, descriptor:PropertyDescriptor) {
        let originalFn = descriptor.value;
        descriptor.value = (...args: any) => {
            console.log(`method [${methodName}] executing...`);
            originalFn(...args);
            console.log(`method [${methodName}] executed.`);
        }
    }
}

function mixin(...args: {new()}[]) {
    return function(target: {new()}) {
        for (let arg of args) {
            for (let key of Object.getOwnPropertyNames(arg.prototype)) {
                if (key === 'constructor') continue // 跳过构造函数
                Object.defineProperty(target.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key))
            }
        }
    }
}

class A { say() { console.log('say!!'); return 1; } }
class B { hi() { console.log('hi!!');return 2; } }

const add = (x:number, y:number): number => {
    return x + y
}

@mixin(A, B)
class DecoratorTest{
    @decoratorA()
    @methodLogger()
    startRunning(msg: string) {
        console.log(`msg(): ${msg}`);        
    }
}

(() => {
    let obj = new DecoratorTest();
    obj.startRunning('hello world!!');
    obj['say']();
    obj['hi']();
})();
