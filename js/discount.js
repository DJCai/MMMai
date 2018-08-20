$(function(){
    $.ajax({
        url:"http://mmb.ittun.com/api/getinlanddiscount",
        type:"get",
        success:function(res){
            var html = template('products',res);
            $('.products').html(html);
        }
    });

    $('.products').on('click','.jump',function(){
        location.href = "discountdetail.html?productid="+$(this).data('id');
    });

    $('.scrollto').click(function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    })
})