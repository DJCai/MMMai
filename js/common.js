// 自适应不同屏幕尺寸
//本项目为2倍图
$("html")[0].style.fontSize=window.screen.width/10+"px";
if(window.screen.width>=320){
    $("html")[0].style.fontSize="32px";
}


//获取某个数组的index
Array.prototype.indexOf = function (val) {
    for(var i = 0; i < this.length; i++){
        if(this[i] == val){return i;}
    }
    return -1;
}

//删除某个数组元素
Array.prototype.remove = function (val){
    var index = this.indexOf(val);
    if(index > -1){this.splice(index,1);}
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
    console.log(arr); //["proName=1", "page=1"]
    var query = {};
    arr.forEach(function(v) {
        var param = v.split("=");
        query[param[0]] = param[1];
    });

    return query;
}

$(function() {
    //让区域滚动生效
    mui('.mui-scroll-wrapper').scroll();

    //让图片轮播生效
    mui('.mui-slider').slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
});

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

function back() {
    window.history.back();
}
