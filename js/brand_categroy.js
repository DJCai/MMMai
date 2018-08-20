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
    
    // 调用搜索功能
    searchFunction();
     // 搜索框功能模块
     function searchFunction(){
        //搜索文本框事件,值变化事件
        $(".search-text")[0].oninput = function () {
            $(".historywordBox").show();
            var arr = getKeysArr();
            var keyword = $(".searchbox .search-text").val().trim();
            if (keyword.length == 0) {
                $(".historywordBox").hide();
                return;
            };
            //遍历arr,看是是否包含关键字,若有,就显示出来
            var newArr = [];
            arr.forEach(function (v, index) {
                if (v.indexOf(keyword) != -1) {
                    newArr.push(v);
                }
            });
            //渲染数据
            renderHistory(newArr);
        };

        // 渲染搜索历史数据
        function renderHistory(arr) {
            var htmlStr = template("historyWords", {
                list: arr
            });
            $(".historywordBox").html(htmlStr);
        }

        // 点击搜索查询数据
        $(".searchbox .search").click(function () {
            var arr = getKeysArr();
            var keyword = $(".searchbox .search-text").val().trim();
            if (keyword.length == 0) return;
            arr.unshift(keyword);
            // 进行数据去重处理
            var newArr = arr.norepeat();
            // 将数据存储到浏览器中
            saveHistory(newArr);
            //由于没有搜索功能,不进行跳转
            // mui-toast("由于没有搜索功能,不进行跳转");
            $(".searchbox .search-text").val("");
            $(".historywordBox").hide();
        });

        //点击删除,删除某条搜索记录
        $(".historywordBox").on("click", ".delete-keyword", function () {
            // $(".historywordBox").show();
            var arr = getKeysArr();
            var index = $(this).data("index");
            // 去除该数据
            arr.splice(index, 1);
            // 存储新的数组
            saveHistory(arr)
            //调用文本框值变化事件,动态渲染数据
            $(".search-text")[0].oninput();

        })

        //页面滚动事件,隐藏历史搜索框
        window.onscroll = function () {
            var scroTop = $(this).scrollTop();
            if (scroTop > 100) {
                $(".historywordBox").hide();
            }
        }

        //点击历史搜索数据,将值添加到文本框中
        $(".historywordBox").on("tap", ".keywords", function () {
            var word = $(this).text();
            $(".searchbox .search-text").val(word);
            $(".historywordBox").hide();
        })
    }
   
})