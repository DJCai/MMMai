$(function () {

    var urlStr = location.href;
    var query = urlTool(urlStr);
    var cid = query.categoryid ? query.categoryid : 0;
    //   console.log(cid);
    var pid=1;
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
    categorylist(cid,pid);
    var pagenum=0;
    function categorylist(cid, pid) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            dataType: "json",
            data: { categoryid: cid, pageid: pid },
            success: function (res) {
                console.log(cid,pid);
                //利用模板生成页面数据
                var html = template("goodlist", res);
                console.log(html);
                $(".listitem").html(html);

                //生成页码
                var pagesize = res.pagesize;
                var total = res.totalCount;
                pagenum = Number(Math.ceil(total / pagesize));
                creatPage(clicknum,pagenum);

                //点击商品跳转到对应的详情页
                $(".item").click(function () {
                    var brandname = $(this).data("name");
                    var productId = $(this).data("productid");
                    // console.log(brandname);
                    window.location.href = "./bijiaolist.html?brandname=" + brandname + "&canme=" + data["cname"] + "&productId=" + productId;
                });
            }
        });
    }

    /**
     * 生成页码的函数，自动生成页码列表
     * @param {*} num 总页码数
     */
    function creatPage(clicknum,num){
        var obj = {};
        obj.num = num;  //总页码
        obj.clicknum=clicknum;
        var numarr = [];
        for (var i = 1; i <= num; i++) {
            numarr.push(i);
        }
        // console.log(numarr);
        obj.numarr = numarr;  //页码集 1、2、...n
        // console.log(arr);
        var html1 = template("selectnav", obj);
        $(".page").html(html1);
    }

     //点击事件上下页
     var clicknum = 1;
    //  pid=clicknum;
    // $(".inputvalue").val($(".livalue").eq(clicknum).text());

    //点击下一页
    $(".page").on("click", ".rightbtn", function () {
        clicknum++;
        if (clicknum > pagenum ) {
            clicknum=pagenum;
            return;
        }
        var p=clicknum-1;
        // var pagenumber=$(".livalue").eq(p).text();
        // $(".inputvalue").val(pagenumber);
        // categorylist(cid,4);
        categorylist(cid,clicknum);
    });

    //点击上一页
    $(".page").on("click", ".leftbtn", function () {
        clicknum--;
        // console.log(clicknum);
        if (clicknum <=0) {
            clicknum=1;
            return;
        }
        categorylist(cid, clicknum);
        // var pagenumber=$(".livalue").eq(clicknum).text();
        // $(".inputvalue").val(pagenumber);
        
    });


    // 点击li事件
    $(".page").on("click", ".livalue", function () {
        clicknum = $(this).index();
        //    console.log(clicknum); 
        categorylist(cid, clicknum);
        $(".inputvalue").val($(".livalue").eq(clicknum).text());
        $("#selectPage").hide();

    });

    //点击三角形
    $(".page").on("click", ".sanjiao", function () {
        $("#selectPage").toggleClass("active1");

    });


});
