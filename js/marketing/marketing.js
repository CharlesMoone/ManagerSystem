/**
 * Created by apple on 16/7/9.
 */
function pageLoad() {
    $("#addMarketing").click(function (e) {
        window.location.hash = "{link:'./html/marketing/addMarketing.html', asideNumber: 1, navNumber: 6}";
    });

    $("#selectAll").click(function (e) {
        var checkBox = $('input[type=checkbox]');
        $(this).prop('checked') == true ? checkBox.prop('checked', true) : checkBox.prop('checked', false);
    });
    
    $('.dusShow').click(function (e) {
        window.location.hash = "{link:'./html/marketing/showMarketing.html', asideNumber: 0, navNumber: 6}";
    });

    $('.dusEdit').click(function (e) {
        window.location.hash = "{link: './html/marketing/editMarketing.html', asideNumber: 0, navNumber: 6}";
    });
}