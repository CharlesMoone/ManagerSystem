methods.addEvent(window, 'load', function () {
    /**
     * 设置提示信息
     * @type {Main}
     */
    var main = new Main();

    /**
     * 给提交按钮绑定click事件
     * 判断所有需要检查的input是否为空,是执行setTip(),否则return(这里应该是进行提交数据)
     */
    main.addEvent(main.getId('submit'), 'click', function () {
        if (!main.getInput()) {
            main.setTip();
            return ;
        }
        new Inform({title: '通知', content: '操作成功!'}).alert();
    });

    main.addTagEvent(document.getElementsByClassName('portrait'), 'click', function (e) {
        new ImgUpload({title: '上传图片'}).alert();
    });

    /**
     * 给所有的input绑定change事件
     * 如果check为false则返回。
     */
    main.addTagEvent(document.getElementsByTagName('input'), 'change', function (e) {
        if (!main.check()) return ;
        this.nextElementSibling.style.display = null;
        this.nextElementSibling.innerHTML = main._tip[this.name];
        this.className = null;
    });
});

/**
 * Main类,tip为提示文字对象
 * @param tip
 * @type {Object}
 * @constructor Main
 */
var Main = function (tip) {
    this.constructor = Main;
    this.tip = tip || {};
    /**
     * 用来存储需要提示的目标及内容
     * @type {{}}
     * @public
     */
    this._tip = {};
    this.input = document.getElementsByTagName('input');
    this._input = null;
    var that = this;
    (function () {
        for (var i = 0; i < that.input.length; i ++) {
            that._tip[that.input[i].name] = that.input[i].nextElementSibling.innerHTML;
        }
    })();
};
Main.prototype = {
    getInput: function () {
        var finish = true;
        this._input = [];
        for (var i = 0; i < this.input.length; i ++) {
            if (this.input[i].dataset.checked == 'checked' && !this.input[i].value) {
                this._input.push(this.input[i]);
                finish = false;
            }
        }
        return finish;
    },
    setTip: function () {
        while (this._input.length) {
            var input = this._input.pop();
            input.nextElementSibling.innerHTML = this.tip[input.name] || ('不可为空');
            input.nextElementSibling.style.display = 'inline-block';
            input.className = "warning";
        }
    },
    check: function () {
        return true;
    },
    addEvent: methods.addEvent,
    addTagEvent: function (dom, linear, callback, start, end) {
        if (start == dom.length) return ;
        start = start || 0;
        this.addEvent(dom[start++], linear, callback);
        this.addTagEvent(dom, linear, callback, start);
    },
    getId: methods.getId
};