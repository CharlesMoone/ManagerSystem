function pageLoad() {
    /**
     * 设置提示信息
     * @type {TipClass}
     */
    var tipObject = new TipClass({});

    /**
     * 给提交按钮绑定click事件
     * 判断所有需要检查的input是否为空,是执行setTip(),否则return(这里应该是进行提交数据)
     */
    $("#submit").on('click', function () {
        if (!tipObject.getInput()) {
            tipObject.setTip();
            return ;
        }
        if (!tipObject.check()) {
            tipObject.setTip();
            return ;
        }
        new Inform({title: '通知', content: '操作成功!'}).alert();
    });

    $('.portrait').on('click', function () {
        new ImgUpload({title: '上传图片'}).alert();
    });

    /**
     * 给所有的input绑定change事件
     * 如果check为false则返回。
     */
    $('input').on('change', function () {
        this.nextElementSibling.style.display = null;
        this.nextElementSibling.innerHTML = tipObject._tip[this.name];
        this.className = null;
    });
}