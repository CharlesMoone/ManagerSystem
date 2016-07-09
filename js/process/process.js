/**
 * Created by apple on 16/7/8.
 */
function pageLoad() {
    var contentImg = $('.contentImg img');
    contentImg.click(function (e) {
        var src = $(this).attr('src');
        $('body').append("<div id='divCover'><img src='" + src + "' alt='内容' /></div>");
        $("#divCover").click(function (e) {
            $(this).remove();
        });
    });
    
    /**
     * 点击全选的事件绑定
     */
    $("#selectAll").click(function (e) {
        var checkBox = $('input[type=checkbox]');
        $(this).prop('checked') == true ? checkBox.prop('checked', true) : checkBox.prop('checked', false);
    });

    $("#addProcess").click(function (e) {
        window.location.hash = "{link:'./html/process/addProcess.html', asideNumber: 1, navNumber: 4}";
    });

    $(".dusEdit").click(function (e) {
        window.location.hash = "{link:'./html/process/editProcess.html', asideNumber: 0, navNumber: 4}";
    });
}