/**
 * Created by apple on 16/7/2.
 */
function pageLoad() {
    /**
     * 点击全选的事件绑定
     */
    $("#selectAll").click(function (e) {
        var checkBox = $('input[type=checkbox]');
        $(this).prop('checked') == true ? checkBox.prop('checked', true) : checkBox.prop('checked', false);
    });
}