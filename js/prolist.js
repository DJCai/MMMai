$(function () {

    var urlStr = location.href;
    var query = urlTool(urlStr);
    var cid = query.categoryid?query.categoryid:0;
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

                var pagesize= res.pagesize;
                var total=res.totalCount;
                var num= Number(Math.ceil(total/pagesize));

                var obj={};
                obj.num=num;
           
                var numarr=[];
                for(var i=1;i<=num;i++){
                   numarr.push(i);
                }
                // console.log(numarr);
                obj.numarr=numarr;
                // console.log(arr);
                var html1 = template("selectnav",obj); 
                $(".fenye").html(html1); 
                
                // console.log(num);
                //点击事件山下页
                // $(".leftbtn").click(function(){
                //     $(".page").find("option")
                    
                // });
                  
                // $("#selectPage").change(function(){

                //     alert($(this).val());
                    
                //     });

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
