$(function () {

    var urlStr = location.href;
    var query = urlTool(urlStr);
    var cid = query.categoryid ? query.categoryid : 0;
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
    var inputid=$(".inputvalue").val();
         console.log(inputid);
        //  pid=inputid.split("/")[0];
         console.log();

    categorylist(cid, 0);
            
    function categorylist(cid, pid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            dataType: "json",
            data: { categoryid: cid, pagaid: pid },
            success: function (res) {
                var html = template("goodlist", res);
                $(".listitem").html(html);

                var pagesize = res.pagesize;
                var total = res.totalCount;
                var num = Number(Math.ceil(total / pagesize));

                var obj = {};
                obj.num = num;

                var numarr = [];
                for (var i = 1; i <= num; i++) {
                    numarr.push(i);
                }
                // console.log(numarr);
                obj.numarr = numarr;
                // console.log(arr);
                var html1 = template("selectnav", obj);
                $(".page").html(html1);

                $(".item").click(function () {
                    var brandname = $(this).data("name");
                    var productId = $(this).data("productid");

                    // console.log(brandname);
                    window.location.href = "./bijiaolist.html?brandname=" + brandname + "&canme=" + data["cname"] + "&productId=" + productId;
                });
            }
        });
    }

         //点击事件上下页
         var clicknum = 0;
         $(".inputvalue").val($(".livalue").eq(clicknum).text());

         $(".page").on("click", ".rightbtn", function () {

             if (clicknum >= num-1) {
                 clicknum=num-1;
                 return;
             }
             clicknum++;
             $(".inputvalue").val($(".livalue").eq(clicknum).text());
             console.log( $(".inputvalue").val());
         });

         $(".page").on("click", ".leftbtn", function () {
             // console.log(clicknum);
             if (clicknum <=0) {
                 clicknum=0;
                 return;
             }
             clicknum--;
             // categorylist(cid, clicknum);
             $(".inputvalue").val($(".livalue").eq(clicknum).text());
         });
         // 点击li事件
         $(".page").on("click", ".livalue", function () {
             clicknum = $(this).index();
             //    console.log(clicknum); 
             $(".inputvalue").val($(".livalue").eq(clicknum).text());
             $("#selectPage").hide();

         });
         //点击三角形
         $(".page").on("click", ".pagenum", function () {
             $("#selectPage").toggleClass("active1");

         });


   

});
