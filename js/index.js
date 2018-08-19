$(function ($) {
    var data = { page: 1, pagesize: 10 };
      mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",
            down: {
                style: 'circle',//必选
                auto: true, //只要进入到页面，就会执行刷新操作
                callback: function () { //下拉刷新执行函数
                    getnavlist();
                    renderproductslist(data);
                    setTimeout(function(){
                        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    },500)
                    
                }
            }
        }
    });
    // 获取首页菜单栏数据并渲染
    function getnavlist() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getindexmenu",
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                console.log(res);

                var html = template('navlist', res);
                $('.nav').html(html);
            }
        })
    }
    // 获取折扣列表
    function renderproductslist(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: 'GET',
            data: data,
            dataType: 'json',
            success: function (res) {
                var page = data.page;
                var pagesize = data.pagesize;
                res.sum = page * pagesize;
                console.log(res);

                var html = template('productlist', res);
                $('.products').html(html);
            }
        })
    }


    $('.products').on('tap', '.remore', function () {
        data.pagesize = 3;
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading(); //手动触发下拉刷新
    })
});