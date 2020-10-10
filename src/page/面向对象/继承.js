// 原型式继承
function InheritObject(o) {
    function F() {
    }

    F.prototype = o;
    return new F();
}

var book = {
    name: 1,
    type: ['book1'],
};

// var obj = new InheritObject(book);
// obj.name = 2;
// obj.type.push('xxx');
// console.log(obj);
// console.log(book);

// 寄生式继承
var book2 = {
    name: 1,
    type: ['book1'],
};

function CreateBook(obj) {
    var o = new InheritObject(obj);
    o.getName = function() {
        return o.name;
    };
    return o;
}

// var obj2 = new CreateBook(book2);
// obj2.type.push('xxx');

// console.log(book2);


/**
 * 寄生组合式继承
 * @param subClass 子类
 * @param superClass 父类
 */
function InheritPrototype(subClass, superClass) {
    // 保存父类原型
    let p = InheritObject(superClass.prototype);
    // 修正因子类原型被修改导致constructor属性被修改
    p.constructor = subClass;
    // 设置子类原型
    subClass.prototype = p;
}

// 父类
function SuperClass(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperClass.prototype.getName = function() {
    return this.name;
};

// 子类
function SubClass(name, time) {
    SuperClass.call(this, name);
    this.time = time;
}

InheritPrototype(SubClass, SuperClass);

SubClass.prototype.getTime = function() {
    return this.time;
};

let instance1 = new SubClass('js book', 2012);

console.log(instance1.getName());
console.log(instance1.getTime());
console.log(instance1.name);
console.log(instance1.time);
console.log(instance1.colors);
