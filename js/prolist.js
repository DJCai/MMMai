$(function () {

    var urlStr = location.href;
    var query = urlTool(urlStr);
    var cid = query.categoryid;
    //   console.log(cid);
    var cname;
    var data = {};
    //分栏

    $.ajax({
        url: "http://mmb.ittun.com/api/getcategorybyid",
        type: "get",
        dataType: "json",
        data: { categoryid: cid },
        success: function (res) {
            var html = template("categorynav", res);
            $(".nav").html(html);
            cname = res.result[0].category;
            data.cname = cname;
        }
    });
    // console.log(data["cname"]);
    // console.log(data[cname]);
    categorylist(cid, 1);
    function categorylist(cid, pid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            dataType: "json",
            data: { categoryid: cid, pagaid: pid },
            success: function (res) {
                var html = template("goodlist", res);
                $(".listitem").html(html);

                $(".item").click(function () {
                    var brandname = $(this).data("name");
                    var productId = $(this).data("productid");

                    // console.log(brandname);
                      window.location.href="./bijiaolist.html?brandname="+brandname+"&canme="+data["cname"]+"&productId="+productId;
                });
            }
        });
    }



});
