/**
 * @version v0.0.1
 * @author CharlesMoone, ment5994197@gmail.com
 * 2016.6.3 14:49
 */

methods.addEvent(window, 'load', function () {
    pageInit();
});

function pageInit() {
    var login = new Login({
        rememberBox: methods.getId('rememberBox'),
        rememberButton: methods.getId('remember-button'),
        autoBox: methods.getId('autoBox'),
        autoButton: methods.getId('auto-button')
    });
    login.checkBox('remember');
    login.checkBox('auto');
    login.checkEvent({name: 'remember'});
    login.checkEvent({name: 'auto'});
    login.addEvent(login.getId('login'), 'click', function (e) {
        if (login.lsGet('remember') == 'true') {
            login.lsSet('account', login.getId('account').value);
        } else {
            login.lsRemove('account');
        }
        if (!login.inputCheck().type) {
            new Inform({title: 'Error', content: login.inputCheck().target.dataset.name + ' can\'t be null'}).alert();
            return ;
        }
        login.getId('logging').style.display = 'flex';
        setTimeout(function () {
            window.location.href = 'main.html';
        }, 2000);
    });
    login.addEvent(login.getId('cancel'), 'click', function () {
        login.getId('logging').style.display = 'none';
    });
}

/**
 * 登录类
 * @class 登录所用到的类
 * @param {Object} o
 * @constructor Login
 */
var Login = function (o) {
    this.constructor = Login;
    this.data = {};
    this.rememberBox = o.rememberBox;
    this.rememberButton = o.rememberButton;
    this.autoBox = o.autoBox;
    this.autoButton = o.autoButton;
};
Login.prototype = {
    /**
     * 获取localStorage的值
     * @param {String} name 属性名
     */
    lsGet: function (name) {
        return window.localStorage.getItem(name);
    },

    /**
     * 设置localStorage的属性名和值
     * @param {String} name 属性名
     * @param value 值
     */
    lsSet: function (name, value) {
        window.localStorage.setItem(name, value);
    },

    /**
     * 删除对应属性名的localStorage
     * @param {String} name
     */
    lsRemove: function (name) {
        window.localStorage.removeItem(name);
    },

    /**
     * 做check-box的设置,on-off
     * @param {String} name localStorage的属性名
     */
    checkBox: function (name) {
        if (this.lsGet(name) == 'true') {
            this[name+'Button'].className = 'dialogCheckBox-field-on';
            this[name+'Box'].checked = true;
            this.getId('account').value = this.lsGet('account') || "";
        } else {
            this[name+'Button'].className = 'dialogCheckBox-field-off';
            this[name+'Box'].checked = false;
        }
    },

    /**
     * 绑定checkbox事件
     * @param {Object} o
     */
    checkEvent: function (o) {
        var that = this;
        this.addEvent(this.getId(o.name), o.type || 'click', function () {
            if (!that[o.name+'Box'].checked) {
                that[o.name+'Button'].className = 'dialogCheckBox-field-on';
                that[o.name+'Box'].checked = true;
                that.lsSet(o.name, 'true');
            } else {
                that[o.name+'Button'].className = 'dialogCheckBox-field-off';
                that[o.name+'Box'].checked = false;
                that.lsSet(o.name, 'false');
            }
        });
    },

    /**
     * input非空检查
     * @returns {{Boolean}, {domObject}}
     */
    inputCheck: function () {
        var input = document.getElementsByTagName('input');
        for (var i = 0; i< input.length; i ++) {
            if (input[i].dataset.empty == 'y' || input[i].type == 'checkbox') continue;
            if (!input[i].value) break;
            this.data[input[i].name] = input[i].value;
        }
        if (i == input.length) {
            return {type: true};
        } else {
            return {type: false, target: input[i]};
        }
    },

    addEvent: methods.addEvent,

    getId: methods.getId
};