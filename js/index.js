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
                    setTimeout(function () {
                        mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                    }, 500)
                }
            }
        }
    });
    // 获取首页菜单的数据
    function getnavlist() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getindexmenu",
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (moreLength) {
                    res.result.splice(8, res.result.length - 1);
                }
                var html = template('navlist', res);
                $('.nav').html(html);
            }
        })
    }
    // 先记录导航菜单栏是否有更多，true表示没有，false表示有更多
    var moreLength = true;

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
                var result = res.result;
                for(var i= 0;i<result.length;i++){
                    result[i].productComCount = result[i].productComCount.replace(/[^0-9]/ig, "");         
                }  
                var html = template('productlist', res);
                $('.products').html(html);
            }
        })
    }


    $('.products').on('tap', '.remore', function () {
        data.pagesize = 3;
        mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading(); //手动触发下拉刷新
    })
    // 导航菜单的点击事件
      $('.main .nav').on('tap', 'li', function (e) {
        var href = $(this).data('href');
        location = href;
    });

    // 导航菜单栏的更多部分
    $('.main .nav').on('tap', '.moreNav', function (e) {
        // e.preventDefault();
        if (moreLength) {
            moreLength = false;
        } else {
            moreLength = true;
        }
        getnavlist();
    });

    //折扣产品点击事件
    $('.products').on('tap', '.product', function () {
        var href = $(this).data('href');
        location = href;
    })
});
