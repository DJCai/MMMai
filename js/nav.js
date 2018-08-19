$(function(){
    //请求数据
    $.ajax({
        url:'http://mmb.ittun.com/api/getsitenav',
        type:'GET',
        success:function(res){
            var html=template('tpllinkList',res);
            $('.linkList').html(html);
        }
    });
    $(".back").click(function(){
        back();
    })

    function back(){
        window.history.back();
    }

})