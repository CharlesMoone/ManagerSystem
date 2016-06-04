methods.addEvent(window, 'load', function () {
    var main = new Main({name: 'name can\'t be null', age: 'age must be number'});
    main.addEvent(main.getId('submit'), 'click', function () {
        if (!main.getInput()) {
            main.setTip();
        }
    });
    main.addEvent(main.getId('content'), 'click', function (e) {
        if (e.target.nodeName == 'INPUT') {
            main.addEvent(e.target, 'change', function () {
                if (!main.check) return ;
                this.nextElementSibling.style.display = null;
                this.nextElementSibling.innerHTML = main._tip[this.name];
                this.className = null;
            });
        }
    });
});

var Main = function (tip) {
    this.tip = tip || {};
    this._tip = {};
    this.input = document.getElementsByTagName('input');
    this._input = null;
};
Main.prototype = {
    getInput: function () {
        var finish = true;
        this._input = [];
        for (var i = 0; i < this.input.length; i ++) {
            this._tip[this.input[i].name] = this.input[i].nextElementSibling.innerHTML;
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
            input.nextElementSibling.innerHTML = this.tip[input.name];
            input.nextElementSibling.style.display = 'inline-block';
            input.className = "warning";
        }
    },
    check: function () {
        return true;
    },
    addEvent: methods.addEvent,
    getId: methods.getId
};