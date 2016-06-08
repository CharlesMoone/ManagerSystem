methods.addEvent(window, 'load', function () {
    var frame = new Frame({
        button: document.getElementsByClassName('HolyGrail-button'),
        tag: document.getElementsByClassName('HolyGrail-tag')
    });
    frame.addTagEvent(frame.button, 'click', function (e) {
        var that = this;
        frame.removeAC(frame.button, 'active');
        this.className += ' active';
        if (frame.getId(this.name+'Page')) {
            this.click();
            frame.removeAC(frame.tag, 'active');
            frame.getId(this.name+'Page').className += ' active';
            return ;
        }
        var a = frame.create('A', {
            id: this.name+'Page',
            href: this.name+'.html',
            className: 'HolyGrail-tag',
            target: 'frame',
            innerHTML: this.name
        });
        frame.getId('page-title').appendChild(a);
        frame.removeAC(frame.tag, 'active');
        frame.getId(this.name+'Page').className += ' active';
        frame.addEvent(a, 'click', function (e) {
            document.getElementsByName(this.innerHTML)[0].click();
            frame.removeAC(frame.tag, 'active');
            frame.getId(that.name+'Page').className += ' active';
        });
    });
});

var Frame = function (obj) {
    for (var i in obj) {
        this[i] = obj[i];
    }
};
Frame.prototype = {
    create: function (type, o) {
        var _type = document.createElement(type);
        for (var i in o) {
            _type[i] = o[i];
        }
        return _type;
    },
    getId: methods.getId,
    addTagEvent: methods.addTagEvent,
    addEvent: methods.addEvent,
    indexOf: methods.indexOf,
    removeClass: methods.removeClass,
    removeAC: function (dom, target) {
        for (var i = 0; i < dom.length; i ++) {
            dom[i].className = methods.removeClass(dom[i].className, target);
        }
    }
};