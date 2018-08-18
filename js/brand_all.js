$(function(){
    //品牌大全数据获取
    function renderBrand(){
        $.ajax({
            url:"http://mmb.ittun.com/api/getbrandtitle",
            type:"get",
            dataType:"json",
            success:function(res){
                console.log(res);
                var htmlStr=template("brand-title-list",{list:res.result});
                $(".brand-title-list").html(htmlStr);
            }
        })
    }
    renderBrand();

    
     
})