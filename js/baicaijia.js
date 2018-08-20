
function topnav(){
    $.ajax({
        url:"http://mmb.ittun.com/api/getbaicaijiatitle",
        dataType:"json",
        success:function(res){
            var htmlStr=template("topnav",{list:res.result});
            $("#sliderSegmentedControl .mui-scroll").html(htmlStr);
        }
    })
}
topnav();

function xuanran(id){
    $.ajax({
        url:"http://mmb.ittun.com/api/getbaicaijiaproduct",
        data:{titleid:id},
        dataType:"json",
        success:function(res){
            var htmlStr=template("xuanran",{main:res.result});
            var ul = $("#item"+id+"mobile .mui-table-view")
            $("#item"+id+"mobile .mui-table-view").html(htmlStr);
        }
    })
}


for(var i =0;i<13;i++){
    xuanran(i);
}




