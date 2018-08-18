$(function(){
    var data={};
    // console.log(data);
     
        $.ajax({
            url:"http://mmb.ittun.com/api/getcategorytitle",
            type:"get",
            dataType:"json",
            success:function(res){         
                console.log(res);
                   
            var html=template("categorytitle",res);
             $(".mui-card").html(html); 
            }
        });


//    二级分类函数
         // category(0);
             //点击 主标题的时候 显示数据
            //  $(".mui-card").on("click",".mui-collapse",function(){
            //     var titleid= $(this).data("titleid");
             
            //     alert(titleid);
         
            // }); 
            $("atitle").click(function(){
                var titleid= $(this).data("titleid");
             
                alert(titleid);
            });



   }); 


// _id
// :
// "5806e6ea48985cb016b082e8"
// category
// :
// "电视"
// categoryId
// :
// 0
// titleId
// :
// 0

// $.ajax({
//     url:"http://mmb.ittun.com/api/getcategory",
//     type:"get",
//     dataType:"json",
//     data:{titleid:titleid},
//     success:function(param){
//     //     var html=template("categorytitle",data);
//     //  $(".mui-card").html(html);   
//      data.param=param;
//     //  console.log(data.param);
//     }
// })