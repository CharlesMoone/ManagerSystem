$(document).ready(function () {
    /**
     * nav及内容管理
     * @type {{company: {title: string, content: *[]}, product: {title: string, content: *[]}}}
     */
    var fun = {
        company:
        {
            title: '企业信息',
            content:
                [
                    {
                        title: '基本信息',
                        link: './html/company/base.html'
                    },
                    {
                        title: '仓库管理',
                        link: './html/company/warehouse.html'
                    },
                    {
                        title: '新增仓库',
                        link: './html/company/addWarehouse.html'
                    }
                ]
        },
        product: {
            title: '产品信息',
            content:
                [
                    {
                        title: '产品管理',
                        link: './html/product/product.html'
                    },
                    {
                        title: '新增产品',
                        link: './html/product/addProduct.html'
                    }
                ]
        },
        produce: {
            title: '生产信息',
            content:
                [
                    {
                        title: '质量码生产信息关联',
                        link: './html/produce/produceCode.html'
                    },
                    {
                        title: '新增生产信息',
                        link: './html/produce/addProduce.html'
                    },
                    {
                        title: '箱码质量码关联',
                        link: './html/produce/connectCode.html'
                    }
                ]
        }
    };

    /**
     * 获取所有的nav的按钮
     * @type {*|jQuery|HTMLElement}
     */
    var button = $('.HolyGrail-button');

    /**
     * 获取nav面板
     * @type {*|jQuery|HTMLElement}
     */
    var nav = $('nav');

    /**
     * 获取aside面板
     * @type {*|jQuery|HTMLElement}
     */
    var aside = $('aside');

    /**
     * 获取隐藏按钮
     * @type {*|jQuery|HTMLElement}
     */
    var navHidden = $("#nav-hidden");

    /**
     * 显示aside功能文字
     * @param _name nav的名字
     * @type _name: string
     * @param _fun nav的内容管理
     * @type _fun: object
     * @param _number: number
     * @returns {string}
     */
    function disFun(_name, _fun, _number) {
        try {
            if (_name in _fun) {
                aside.removeClass('hidden');
                nav.addClass('hidden-nav');
                var dom = "<span>" + _fun[_name].title + "</span><div class='aside-list'><ul>";
                for (var i = 0; i < _fun[_name].content.length; i ++) {
                    dom +=
                        "<li class='aside-li' data-info='{link:\"" + _fun[_name].content[i].link + "\", asideNumber:" + i + ", navNumber:" + _number + "}'>" +
                            "<div class='aside-item'>" +
                                "<div class='item-icon'></div>" +
                                "<div class='item-title'>" + _fun[_name].content[i].title + "</div>" +
                            "</div>" +
                        "</li>";
                }
                dom += "</ul></div>";
                return dom;
            } else {
                throw new Error('no html!');
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * 给nav的按钮绑定点击事件,改变active状态
     */
    button.bind('click', function (e) {
        button.removeClass('active');
        $(this).addClass('active');
        aside.html(disFun($(this).data('name'), fun, $(this).index()));

        /**
         * 给aside的按钮绑定点击事件,改变active状态
         */
        var li = $('.aside-li');
        li.bind('click', function (e) {
            $('.aside-li').removeClass('active');
            $(this).addClass('active');
            window.location.hash = $(this).data('info');
        });

        var info = !location.hash ? undefined : eval("(" + decodeURI(location.hash.substr(1)) + ")");
        if (!info || (info.navNumber != $(this).index())) {
            li[0].click();
        }
    });

    /**
     * 给隐藏按钮绑定点击事件,改变文字的隐藏与显示
     */
    navHidden.bind('click', function (e) {
        nav.hasClass('hidden-nav') ? nav.removeClass('hidden-nav') : nav.addClass('hidden-nav');
    });

    window.onhashchange = function (e) {
        var info = location.hash;
        if (!info) {
            console.log("没有hash");
            return ;
        }
        info = eval("(" + decodeURI(info.substr(1)) + ")");
        button[info.navNumber-1].click();
        var li = $('.aside-li');
        $(li[info.asideNumber]).addClass('active');
        
        /**
         * 对nav和aside的状态存储
         */
        $.ajax({
            url: info.link,
            success: function (data) {
                $("#hash-page").html(data);
                pageLoad();
            }
        });
    };

    window.onhashchange();
});