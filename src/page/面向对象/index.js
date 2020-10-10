// 链式调用
class Methods {
    constructor() {
        if (new.target !== Methods) return new Methods();
    }
    addMethod(name, fn) {
        this[name] = fn;
        return this;
    }
}

let methods = new Methods();

methods.addMethod('checkName',  function () {
    console.log('checkName');
    return this;
}).addMethod('checkEmail', function () {
    console.log('checkEmail');
});

methods.checkName().checkEmail();
console.log(Methods.prototype);


