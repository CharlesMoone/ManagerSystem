/**
 * Created by apple on 16/6/25.
 */
/**
 * Main类,tip为提示文字对象
 * @param tip
 * @type {Object}
 * @constructor Main
 */
var TipClass = function (tip) {
    this.constructor = TipClass;
    this.tip = tip || {};
    /**
     * 用来存储需要提示的目标及内容
     * @type {{}}
     * @public
     */
    this._tip = {};
    this.input = $('input');
    this._input = null;
    var that = this;
    (function () {
        for (var i = 0; i < that.input.length; i ++) {
            if (that.input.attr('type') == 'checkbox') continue;
            that._tip[that.input[i].name] = that.input[i].nextElementSibling.innerHTML;
        }
    })();
};
TipClass.prototype = {
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
        /**
         * 做检查,如果发现某项的错误放出提示
         */
        return true;
    }
};
