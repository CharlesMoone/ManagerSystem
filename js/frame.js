require(['jquery'], function ($) {
    /**
     * nav及内容管理
     * @type {{company: {title: string, content: *[]}, table: {title: string, content: *[]}}}
     */
    var fun = {
        company:
        {
            title: '企业信息',
            content:
                [
                    {
                        title: '基本信息',
                        link: '/login/html/company/base.html'
                    },
                    {
                        title: '仓库管理',
                        link: ''
                    }
                ]
        },
        table: {
            title: '产品信息',
            content:
                [
                    {
                        title: '产品管理',
                        link: ''
                    },
                    {
                        title: '新增产品',
                        link: ''
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
     * @returns {string}
     */
    function disFun(_name, _fun) {
        try {
            if (_name in _fun) {
                aside.removeClass('hidden');
                nav.addClass('hidden-nav');
                var dom = "<span>" + _fun[_name].title + "</span>";
                for (var i = 0; i < _fun[_name].content.length; i ++) {
                    dom +=
                        "<div class='aside-list'>" +
                            "<ul>" +
                                "<li class='aside-li' data-link='" + _fun[_name].content[i].link + "'>" +
                                    "<div class='aside-item'>" +
                                        // "<a href='" + _fun[_name].content[i].link + "' target='frame' class='aside-link'>" +
                                        "<div class='item-icon'></div>" +
                                        "<div class='item-title'>" + _fun[_name].content[i].title + "</div>" +
                                        // "</a>" +
                                    "</div>" +
                                "</li>" +
                            "</ul>" +
                        "</div>";
                }
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
        aside.html(disFun($(this).data('name'), fun));

        /**
         * 给aside的按钮绑定点击事件,改变active状态
         */
        var li = $('.aside-li');
        li.bind('click', function (e) {
            $('.aside-li').removeClass('active');
            $(this).addClass('active');
            window.location.hash = $(this).data('link');
        });

        li[0].click();
    });

    /**
     * 给隐藏按钮绑定点击事件,改变文字的隐藏与显示
     */
    navHidden.bind('click', function (e) {
        nav.hasClass('hidden-nav') ? nav.removeClass('hidden-nav') : nav.addClass('hidden-nav');
    });

    window.onhashchange = function (e) {
        var link = location.hash.substr(1);
        console.log(link);
        $.ajax({
            url: link,
            success: function (data) {
                $("#hash-page").html(data);
                pageLoad();
            }
        });
    };
});