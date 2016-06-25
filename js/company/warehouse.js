/**
 * Created by apple on 16/6/18.
 */
function pageLoad() {
    $(".dusEdit").click(function (e) {
        window.location.hash = "{link:'./html/company/editWarehouse.html', asideNumber: 1, navNumber: 1}";
    });

    $("#addWarehouse").click(function (e) {
        window.location.hash = "{link:'./html/company/addWarehouse.html', asideNumber: 2, navNumber: 1}";
    });
}