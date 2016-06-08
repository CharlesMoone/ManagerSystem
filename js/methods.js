var methods = {
    /**
     * 通过id获取dom对象
     * @param id dom的id名
     */
    getId: function (id) {
        return document.getElementById(id);
    },

    /**
     * 添加事件监听的兼容模式
     * @param dom dom级对象
     * @param type 事件类型eg.click,change...
     * @param fn 回调函数
     */
    addEvent: function (dom, type, fn) {
        fn = fn || function () {};
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent('on' + type, fn);
        } else {
            dom['on' + type] = fn;
        }
    },

    addTagEvent: function (dom, linear, callback, start, end) {
        if (start == dom.length) return ;
        start = start || 0;
        this.addEvent(dom[start++], linear, callback);
        this.addTagEvent(dom, linear, callback, start);
    },
    
    indexOf: function (array, target) {
        for (var i = 0; i < array.length; i ++) {
            if (target == array[i]) {
                return i;
            }
        }
        return false;
    },

    removeClass: function (className, target) {
        var classArray = className.split(" ");
        var number = this.indexOf(classArray, target);
        if (number)
            classArray.splice(number, 1);
        return classArray.join(" ");
    },

    /**
     * 删除事件监听的兼容模式
     * !!!!!谨记!!!!!删除不可以删除用匿名函数创建的事件监听
     * @param dom dom级对象
     * @param type 事件类型eg.click,change...
     * @param fn 回调函数
     */
    removeEvent: function (dom, type, fn) {
        fn = fn || function () {};
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn, false);
        } else if (dom.detachEvent) {
            dom.detachEvent('on' + type, fn);
        } else {
            dom['on' + type] = null;
        }
    },

    /**
     * 获取event事件的兼容模式
     * @param event
     * @returns {*|Event}
     */
    getEvent: function (event) {
        return event || window.event;
    },

    /**
     * 获取target的兼容模式
     * @param event
     * @returns {EventTarget|Object}
     */
    getTarget: function (event) {
        return this.getEvent(event).target || this.getEvent(event).srcElement;
    }
};