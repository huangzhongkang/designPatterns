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

