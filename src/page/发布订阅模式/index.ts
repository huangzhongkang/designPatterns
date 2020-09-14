class PubSub {
    events: {};

    constructor() {
        this.events = {};
    }

    /**
     * 发布
     * @param event 事件名称
     * @param val 传递的值
     */
    emit(event, val) {
        if (!this.events[event]) return false;
        const eventsArr: any[] = [...this.events[event]];
        eventsArr.forEach((cb: any) => {
            cb.call(this, val);
        });
    }
    /**
     * 订阅
     * @param event 事件名称
     * @param cb 回调函数
     */
    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
            this.events[event].push(cb);
        }
    }

    /**
     * 解绑
     * @param event 事件名称
     */
    off(event) {
        if (!this.events[event]) return false;
        delete this.events[event];
    }
}

const Bus = new PubSub();

Bus.on('event1', function (cb) {
    console.log(cb);
});

Bus.on('event2', function (cb) {
    console.log(cb);
});

Bus.emit('event1', 'event1订阅第1次');
Bus.emit('event2', 'event2订阅第1次');
setTimeout(() => {
    Bus.emit('event2', 'event2订阅第1次');
    Bus.off('event2');
    Bus.emit('event2', 'event2订阅第2次');
}, 1000);
