$(function(){
    var urlStr = location.href;
    var query = urlTool(urlStr);


    var data=[];
    data.brandname= getParams("brandname");
    data.cname=getParams("canme");
    // console.log(data.brandname);  
     var productid=query.productId;
     console.log(productid); 

    var htmlStr= template("categorynav",{list:data});
    $(".navbar").html(htmlStr);
    
    $.ajax({
        url:"http://mmb.ittun.com/api/getproduct",
        type:"get",
        dataType:"json",
        data:{productid:productid},
        success:function(res){
            var html= template("goodinfo",res);
            $(".product").html(html);
        }
    });
    
    //评论
    $.ajax({
        url:"http://mmb.ittun.com/api/getproductcom",
        type:"get",
        dataType:"json",
        data:{productid:productid},
        success:function(res){
            var html= template("usercomment",res);
            $(".content").html(html);
        }
    });

});