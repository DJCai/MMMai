$(function(){
   
    //进行ajax申请,获取标题栏数据
    $.ajax({
        url:"http://mmb.ittun.com/api/getbaicaijiatitle",
        type:"get",
        success:function(res){
            // 获取标题数据,并渲染数据到页面中
            var htmlStr=template("baicaijaiTitle",res);
            $(".navlist").html(htmlStr);
        }
    });


    // 获取数据
    function renderDate(titleId){
        $.ajax({
            url:"http://mmb.ittun.com/api/getbaicaijiaproduct",
            type:"get",
            data:{titleid:titleId},
            dataType:"json",
            success:function(res){
                var htmlStr=template("productlist",{list:res.result});
                $(".productlist").html(htmlStr);
            }
        })
    }
    renderDate(0);

    // 点击tab栏数据,切换列表数据
    $(".navlist").on("tap","a",function(){
        var titleid=$(this).data("titleid");
        renderDate(titleid);
    })
    mui('.mui-scroll-wrapper').scroll();
})