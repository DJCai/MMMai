// 自适应不同屏幕尺寸
//本项目为2倍图
$("html")[0].style.fontSize = window.screen.width / 10 + "px";
if (window.screen.width >= 320) {
    $("html")[0].style.fontSize = "32px";
}


//获取某个数组的index
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return i;
        }
    }
    return -1;
}

//删除某个数组元素
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
}

//去重
Array.prototype.norepeat = function () {
    var arr = this,
        result = [],
        i,
        j,
        len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}

//url的关键字提取函数
function urlTool(urlStr) {
    //1. 把url以？分割
    var arr = urlStr.split("?").pop().split("&");
    // console.log(arr); //["proName=1", "page=1"]
    var query = {};
    arr.forEach(function (v) {
        var param = v.split("=");
        query[param[0]] = param[1];
    });

    return query;
}
//
/**
 * url?key=value 
 * 将url中出现的中文重新编码,使得可以在跨页面传递中文数据时不会乱码
 * @param  key   //浏览器地址上的key值
 *  使用 http://www.163.com?name="小明",  跨页面传递时会乱码,在js中  getParams("name")就可获得"小明"
 */
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    //如果地址栏中出现中文则进行编码    
    var r = encodeURI(window.location.search).substr(1).match(reg);
    if (r != null) {
        //将中文编码的字符重新变成中文
        return decodeURI(unescape(r[2]));
    }
    return null;
};


//搜索功能保存读取搜索记录
//获取本地存储的数据
function getKeysArr() {
    var arr = [];
    var keysStr = localStorage.getItem("searchKeywords");
    if (keysStr) {
        arr = JSON.parse(keysStr);
    }
    return arr;
}
//浏览器本地保存数据
function saveHistory(arr) {
    localStorage.setItem("searchKeywords", JSON.stringify(arr));
}

//检查用户是否登录
function checkLogin(res) {
    if (res.error == 400) {
        sessionStorage.setItem("lasturl", location.href);
        //没登录， 就跳到登录页
        window.location.href = "./login.html";
        return false;
    } else {
        return true;
    }
}
//返回上一页
function back() {
    window.history.back();
}

$(function () {
    //让区域滚动生效
    mui('.mui-scroll-wrapper').scroll();

    //让图片轮播生效
    mui('.mui-slider').slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
    });


    // 搜索框的功能模块 
    // searchfunction();
    function searchfunction(){
         //搜索文本框事件,值输入事件
         $(".search-text")[0].oninput = function () {
            $(".historywordBox").show();
            var arr = getKeysArr();
            var keyword = $(".searchbox .search-text").val().trim();
            if (keyword.length == 0) {
                $(".historywordBox").hide();
                return;
            };
            //遍历arr,看是否包含关键字,若有,就显示出来
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
            saveHistory(arr);
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
    

    //关闭底部广告栏
    $(".banner .close-banner").click(function (e) {
        e = e || widow.event;
        e.preventDefault();
        // alert("a");
        $(".banner").remove();
    });

});