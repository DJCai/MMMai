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