$(function(){
    $(".left").on('click','li',function(){
        var link=$(this).data('link')
        if($(this).find('.mui-icon').hasClass('mui-icon-arrowdown')){
            $(this).find('.mui-icon').addClass('mui-icon-arrowup').removeClass('mui-icon-arrowdown').parent().siblings('li').find('.mui-icon').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
        }else{
            $(this).find('.mui-icon').addClass('mui-icon-arrowdown').removeClass('mui-icon-arrowdoup');
        }

        // 这样判断后只会有一个是向上的(或者全部不是),然后判断有没有向上,如果有就显示列表
        // 并 渲染数据出来
        if($(this).find('.mui-icon').hasClass('mui-icon-arrowdown')){
            //如果向上就不做操作数据让列表隐藏
            $(".changeList").hide();
        }else{
            //有就显示列表
            $(".changeList").show();
            //请求数据(需要判断是哪一个)
            var url='';
            switch(link){
                case 'shop':
                    url='http://mmb.ittun.com/api/getgsshop';
                    break;
                case 'addr':
                    url='http://mmb.ittun.com/api/getgsshoparea';
                    break;
                default:
                    return;
            }
            $.ajax({
                url:url,
                type:'GET',
                success:function(res){
                    console.log(res);
                    var html=template("tplchangeList",res);
                    $('.changeList').html(html);
                }
            })

        }
    })
})