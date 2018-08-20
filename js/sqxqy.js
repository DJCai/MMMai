$(function() {
    // var id = location.search;
    // console.log(id);
    var str = window.location.href;
    var num = str.indexOf("=");
    str = str.substr(num + 1);
    console.log(str);
    $.ajax({
        url: "http://mmb.ittun.com/api/getmoneyctrlproduct?productid=" + str,
        type: "get",
        dataType: "json",
        success: function(res) {
            // console.log(res);
            var moneyIndex = res.result;
            // console.log(moneyIndex);
            var htmlStr = template("moneyId", { data: moneyIndex });
            // console.log(htmlStr);
            $(".big").html(htmlStr);
        }
    })
})

var str = window.location.href;
var num = str.indexOf("=");
str = str.substr(num + 1);
//最新评论模板
$(function(){
    $.ajax({
        url: "http://mmb.ittun.com/api/getmoneyctrlproduct?productid=" + str,
        data: 'get',
        dataType:"json",
        success: function(res) {
            console.log(res);
            var dataList = res.result;
            var templateList = template("newList", {data: dataList });
            $(".cu-content-pl").html(templateList);
        }
    })
})