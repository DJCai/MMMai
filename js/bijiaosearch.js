$(function(){
        //一级菜单 渲染
        $.ajax({
            url:"http://mmb.ittun.com/api/getcategorytitle",
            type:"get",
            dataType:"json",
            success:function(res){        
            var html=template("categorytitle",res); 
            $(".table-view").html(html); 
            
            // console.log( res.result[1].titleId);
            $(".itemlist").each(function(index,ele){
                $.ajax({
                    url:"http://mmb.ittun.com/api/getcategory",
                    type:"get",
                    dataType:"json",
                    data:{titleid:res.result[index].titleId},
                    success:function(res){
                        // console.log(res)
                        var html=template("getcategory",res);  
                          $(ele).html(html);                   
                    }
                }) 
             
            })
          // ul交互 fa fa-angle-up
          $(".atitle").click(function(){
            // alert("sss");
            $(this).siblings(".itemlist").toggleClass("active");
            // $(this).siblings(".itemlist").hasClass("active")
            if( $(this).siblings().hasClass("active")){
            $(this).find(".fa").addClass("fa-angle-down").removeClass("fa-angle-up");
            }else{
                $(this).find(".fa").addClass("fa-angle-up").removeClass("fa-angle-down");   
             }         
           });
        
         }
        });
    $(".tab-content").on("click",".table-view .item",function(){
       var categoryid=$(this).data("categoryid");
        window.location.href="./bijiaoProlist.html?categoryid="+categoryid;
     });  

});
