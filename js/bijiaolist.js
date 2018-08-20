$(function(){
    var urlStr = location.href;
    var query = urlTool(urlStr);
    var productid = query.productId?query.productId:0;
    var cid = query.categoryid;

    var data={};
    var  arr=[];
    if(getParams("brandname")){
        data.brandname= getParams("brandname");
    }else{
        data.brandname="电视";
    }
    if(data.cname=getParams("canme")){
        data.brandname= getParams("brandname");
    }else{
        data.brandname="乐视";
    }


    
    data.brandname= getParams("brandname");
    data.cname=getParams("canme");
    arr.push(data);
    // console.log(data.brandname); 
    //  console.log(data); 
    //  console.log(arr); 
    
     

    var htmlStr= template("catenav",{list:arr});
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


   // 点击导航栏 
  $(".navbar").on("click",".categorynavgitar",function(){
    
    window.location.href = "./bijiaoProlist.html?categoryid=" + cid ;
  });
});