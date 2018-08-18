$(function(){
    var arr=['全部价格','1-3元','3-5元','5-10元','10-15元','15元以上'];
    function templatePrice(){
        var res={};
        res.result=arr;
        var html=template("tplchangeList",res);
        $('.changeList').html(html);
    }
    var linkone='';//点击的分类
    $(".left li").click(function(){
        // 点击了排序就把搜索按钮还原为搜索样子
        $('.search').find('.fa').addClass('fa-search').removeClass('fa-close');
        
        if($(this).find('.mui-icon').hasClass('mui-icon-arrowdown')){
            $(this).find('.mui-icon').addClass('mui-icon-arrowup').removeClass('mui-icon-arrowdown').parent().siblings('li').find('.mui-icon').removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown');
            linkone=$(this).data('link');//点击的是那个类型
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
            switch(linkone){
                case 'shop':
                    url='http://mmb.ittun.com/api/getgsshop';
                    break;
                case 'addr':
                    url='http://mmb.ittun.com/api/getgsshoparea';
                    break;
                default:
                    templatePrice();
                    return;                       
            }
            $.ajax({
                url:url,
                type:'GET',
                success:function(res){
                    var html=template("tplchangeList",res);
                    $('.changeList').html(html);

                }
            })

        }
    })

    // 点击搜索按钮
    $(".search").click(function(){
        if($(this).find('.fa').hasClass("fa-search")){
            //如果是搜索按钮(换位关闭按钮并显示搜索页面)
            $(this).find('.fa').addClass("fa-close").removeClass("fa-search");
            //渲染搜索框内容
            var html=template("tplsearchPage",{});
            $(".changeList").show();
            $(".changeList").html(html);
        }else{
            // 如果是关闭按钮(就更换为搜索并关闭搜索页面)
            $(this).find('.fa').addClass("fa-search").removeClass("fa-close");
            $(".changeList").hide();
            // 隐藏搜索按钮的时候把排序的所有图标改为向下的
            $(".left li").children('.mui-icon').addClass('mui-icon-arrowdown').removeClass("mui-icon-arrowup");
        }
    })

    // 获得数据(我们把点击的数据显示在上面),判断type是什么类型的放到对应的
    $('.changeList').on('click','li',function(){
        //拿到下面span中文字放到上面中//并且要给它添加选中
        $(this).addClass("active").siblings().removeClass("active");//选中打钩
        var text=$(this).find('.text').text();//点击的选中文字
        var arr=text.split("（");//我们只要括号外面的
        text=arr[0];
        $('.left li.'+linkone).children(".text").text(text);
    })
})