class Subject {
    sub: any[];
    constructor() {
        this.sub = [];
    }
    add(fn: any) {
        this.sub.push(fn)
    }
    notify() {
        this.sub.forEach((fn: any) => {
            fn();
        });
    }
}

class Observe {
    update() {
        console.log();
    }
}

let subject = new Subject();
