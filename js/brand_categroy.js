$(function(){
    //获取网址传递过来的数据,修改标题
    var urlStr=location.href;
    var brandTitleId=urlTool(urlStr).brandTitlId;
    var brandTitle =getParams("brandTitle");
    // 若传参数过来,利用模板渲染数据
    if(brandTitle && brandTitle.length != 0 ){
        var index=brandTitle.indexOf("十大品牌");
        brandTitle=brandTitle.substring(0,index);
        $(".brandTitle").html(brandTitle);
    }
    //获取分类的十大品牌数据
    function renderCategory(){
        $.ajax({
            url:"http://mmb.ittun.com/api/getbrand",
            type:"get",
            data:{brandtitleid:brandTitleId},
            dataType:"json",
            success:function(res){
                // console.log(res.result);
                var htmlStr=template("brand-category-list",{list:res.result});
                $(".brand-title-list").html(htmlStr);
            }
        })
    }
    renderCategory();
    
    /**
     * 获取十大品牌的销量排行商品列表的函数,id
     * @param {*} id 品牌标题id
     * @param {*} size 展示的数据量 默认为4个 (Number)
     */
    function renderProduct(id,size){
        $.ajax({
            url:"http://mmb.ittun.com/api/getbrandproductlist",
            type:"get",
            data:{brandtitleid:id,pagesize:size },
            dataType:"json",
            success:function(res){
                //利用模板,将排名的数据渲染到页面中
                var htmlStr=template("brand-product-list",{list:res.result});
                $(".brand-product-list .product-list").html(htmlStr);

                // 排行靠前的产品的名单
                var productId_arr=[];
                res.result.forEach(function(v,index){
                    // console.log(v.productId+"="+index);
                     productId_arr.push(v.productId);
                 })

                //  根据排名靠前的产品名单,获得评论数据,然后渲染到页面中
                productId_arr.forEach(function(id,index){
                    console.log(id);
                    renderComment(id);
                })
            }
       
        })
    }
    renderProduct(brandTitleId,5);

    // 获取商品评论的函数,形参为productId,产品id;
    function renderComment(id){
        $.ajax({
            url:"http://mmb.ittun.com/api/getproductcom",
            type:"get",
            data:{productid:id},
            dataType:"json",
            success:function(res){
                var htmlStr = template("product-commentlist",{list:res.result});
                $(".product-commentlist .commentlist").append(htmlStr);
            }
        })
    }

    // renderComment(1);


})