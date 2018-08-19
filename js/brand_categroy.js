$(function () {
    //获取网址传递过来的数据,修改标题
    var urlStr = location.href;
    var brandTitleId = urlTool(urlStr).brandTitlId;
    var brandTitle = getParams("brandTitle");
    // 若传参数过来,利用模板渲染数据
    if (brandTitle && brandTitle.length != 0) {
        var index = brandTitle.indexOf("十大品牌");
        brandTitle = brandTitle.substring(0, index);
        $(".brandTitle").html(brandTitle);
    }
    
    //获取分类的十大品牌数据
    function renderCategory() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrand",
            type: "get",
            data: {
                brandtitleid: brandTitleId
            },
            dataType: "json",
            success: function (res) {
                // console.log(res.result);
                var htmlStr = template("brand-category-list", {
                    list: res.result
                });
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
    function renderProduct(id, size) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrandproductlist",
            type: "get",
            data: {
                brandtitleid: id,
                pagesize: size
            },
            dataType: "json",
            success: function (res) {
                // console.log(res.result);
                //利用模板,将排名的数据渲染到页面中
                var htmlStr = template("brand-product-list", {
                    list: res.result
                });
                $(".brand-product-list .product-list").html(htmlStr);
                // 排行靠前的产品的名单
                res.result.forEach(function (v, index) {
                    //获取产品的图片和产品名称,并作为参数,调用renderComment,渲染评论数据到页面中
                    var productImg = v.productImg;
                    var productName='<p class="productName">'+v.productName+'</p>';
                    var productInfo=productImg+productName;
                    renderComment(v.productId,productInfo);
                });
            }
        })
    }
    renderProduct(brandTitleId, 5);
   
    // 获取商品评论的函数,形参为productId,产品id,产品的信息,包括产品图片与商品名称;
    function renderComment(id,info) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductcom",
            type: "get",
            data: {
                productid: id
            },
            dataType: "json",
            success: function (abc) {
                var htmlStr = template("product-commentlist", {
                    list: abc.result
                });
                $(".product-commentlist .commentlist").append(htmlStr);
                $(".productcoment"+id).html(info);
            }
        })
    }
})