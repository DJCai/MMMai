$(function(){


    function categorylist(cid,pid){
     $.ajax({
         url:"http://mmb.ittun.com/api/getproductlist",
         type:"get",
         dataType:"json",
         data:{categoryid:cid,pagaid:pid},
         success:function(res){
          var html=template("goodlist",res);
        //   $(".listitem").html(html);
         }
     });
    }
     categorylist(0,1);
});
