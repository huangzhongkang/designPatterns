// 目标
class Subject {
    sub: any[];

    constructor() {
        this.sub = [];
    }

    add(ob: any) {
        this.sub.push(ob)
    }

    notify() {
        this.sub.forEach((ob: any) => {
            ob.update();
        });
    }

    remove(ob: any) {
        this.sub = this.sub.filter((v: any) => v !== ob);
    }
}

// 观察者
class Observe {
    id: string | number;

    constructor(id) {
        this.id = id;
    }

    update() {
        console.log(this.id, 'update');
    }
}

let sub = new Subject();
let observe1 = new Observe('test1');
let observe2 = new Observe('test2');
sub.add(observe1);
sub.add(observe2);
sub.notify();

setTimeout(() => {
    sub.remove(observe2);
    sub.notify();
}, 300);


/**
 * 利用proxy对目标obj架设代理，收集依赖的事件dep，当obj变化时在proxy内部setter触发收集依赖dep的回调事件
 */
class ObserveProxy {
    dep: Set<any>;

    constructor() {
        this.dep = new Set();
    }

    // 添加回调事件
    add = (fn: object) => this.dep.add(fn);

    // 架设代理，代理内部触发绑定的事件
    proxy = (obj: any) => new Proxy(obj, {
        set: (target, key, value, receiver) => {
            const result = Reflect.set(target, key, value, receiver);
            this.dep.forEach((observer: any) => {
                observer();
            });
            return result;
        }
    });
}


const ob = new ObserveProxy();
const obj = ob.proxy({
    count: 1
});
const printFn = () => {
    console.log(obj.count);
};

ob.add(printFn);
ob.proxy(obj);

obj.count = 4;
