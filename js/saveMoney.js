$(function(){
    function getproductInfo(pageid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: "get",
            data: {
                pageid: pageid
            },
            success: function (res) {

                var html = template("productslist",res);
                $(".mui-table-view").html(html);
            }
        })
    }
    getproductInfo();
 })
 