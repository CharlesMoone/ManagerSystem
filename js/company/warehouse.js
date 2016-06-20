/**
 * Created by apple on 16/6/18.
 */
function pageLoad() {
    $("#addWarehouse").click(function (e) {
        window.location.hash = "{link:'./html/company/addWarehouse.html', asideNumber: 2, navNumber: 1}";
    });
}