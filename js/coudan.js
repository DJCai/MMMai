$(function(){
    var arr=['全部价格','1-3元','3-5元','5-10元','10-15元','15元以上'];
   //flag作为第一次进入页面标志
    var flag=true;
    // 加载数据
    $('.left li.allPrice').children(".text").text(arr[0]);
    renderChange("shop");
    renderChange("addr");

    // 加载产品的全局变量参数
    var shopId=0;
    var areaId=0;

    // 渲染价格
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
            
            renderChange(linkone);//加载列表数据

        }
    });

    // 渲染数据的函数（需要判断是渲染那个列表的数据）
    function renderChange(type){
        //请求数据(需要判断是哪一个)
        var url='';
        switch(type){
            case 'shop':
                url='http://mmb.ittun.com/api/getgsshop';
                break;
            case 'addr':
                url='http://mmb.ittun.com/api/getgsshoparea';
                break;
            default:
                templatePrice();//当点击的是价格的时候渲染
                return;                       
        }
        $.ajax({
            url:url,
            type:'GET',
            success:function(res){
                var html=template("tplchangeList",res);
                $('.changeList').html(html);//请求筛选列表的渲染
                console.log(flag);
                // 首次加载页面
                if(flag){
                    if(type=='shop'){
                        var text=res.result[0].shopName;
                        text=changeListWord(text);
                        $('.left li.'+type).children(".text").text(text);
                        flag=false;//修改为false表示不是第一次进入
                    }else if(type=='addr'){
                        var text=res.result[0].areaName;
                        text=changeListWord(text);
                        $('.left li.'+type).children(".text").text(text);
                        flag=false;//修改为false表示不是第一次进入
                    }
                }
                
            }
        })
    }

    // 点击搜索按钮
    $(".search").click(function(){
        if($(this).find('.fa').hasClass("fa-search")){
            //如果是搜索按钮(换位关闭按钮并显示搜索页面)
            $(this).find('.fa').addClass("fa-close").removeClass("fa-search");
            //渲染搜索框内容
            var html=template("tplsearchPage",{});//点击搜索按钮渲染
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


    // 点击列表外面的区域让列表消失
    $(".products").click(function(){
        $('.changeList').hide();
        $(".left li").children('.mui-icon').addClass('mui-icon-arrowdown').removeClass("mui-icon-arrowup");
    })
    $(".header").click(function(){
        $('.changeList').hide();
        $(".left li").children('.mui-icon').addClass('mui-icon-arrowdown').removeClass("mui-icon-arrowup");
    })

    // 获得数据(我们把点击的数据显示在上面),判断type是什么类型的放到对应的
    $('.changeList').on('click','li',function(){
        //拿到下面span中文字放到上面中//并且要给它添加选中
        $(this).addClass("active").siblings().removeClass("active");//选中打钩
        var text=$(this).find('.text').text();//点击的选中文字
        text=changeListWord(text);//只要括号左边的
        $('.left li.'+linkone).children(".text").text(text);
        $(".products").click();//调用点击products让他列表消失

        //点击获得id请求数据渲染（需要判断）
        var type=$(this).data('type');
        if(type=='shop'){
            shopId=$(this).data('id');
        }else if(type=='area'){
            areaId=$(this).data('id');
        }else{
            //是价格就不管
        }

        renderProducts(shopId,areaId);//请求产品数据
    })

    // 筛选列表文字的处理
    function changeListWord(str){
        return str.split("（")[0];
    }

    // 渲染产品的列表(sid:店铺id   aid：区域的id)
    renderProducts(shopId,areaId);
    function renderProducts(sid,aid){
        $.ajax({
            url:'http://mmb.ittun.com/api/getgsproduct',
            type:'GET',
            data:{shopid:sid,areaid:aid},
            success:function(res){
                var html=template('tplProducts',res);
                $('.products').html(html);
            }
        })
    }

    //每次进入页面让列表隐藏
    $('.changeList').hide();
    $(".left li").children('.mui-icon').addClass('mui-icon-arrowdown').removeClass("mui-icon-arrowup");


    // 点击返回（返回上一页）
    $(".back").click(function(){
        back();
    })
})