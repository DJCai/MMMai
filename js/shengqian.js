$(function() {
    // 调用初始化
    init();
    var flag = true;
    // 页面初始化
    function init() {
        getPageData();
        backTop();
        pullDown();
    }
    // 页面渲染
    function getPageData(id) {
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: 'http:///mmb.ittun.com/api/getmoneyctrl?pageid=' + id,
            success: function(res) {
                var html = template('money', { data: res })
                $('.section-top').html(html);
                if (flag) {
                    var count = Math.ceil(res.totalCount / 10);
                    var opHtml = '';
                    for (var i = 1; i <= count; i++) {
                        opHtml += "<option value=" + i + ">" + i + "</option>";
                    }
                    $(".mony-select").html(opHtml);
                    flag = false;
                }
            }
        })
    }
    // 下拉事件
    function pullDown() {
        var id, currentId, i = 0,
            nexId;
        $('.mony-select').on('change', function() {
            id = $(this).val() - 1;
            ele = $(this)[0];
            getPageData(id);
            i = 0;
            if (id == 14) {
                nexId = 14;
            } else if (id == 0) {
                nexId = 0;
            } else {
                nexId = id;
            }
            console.log(nexId);
        })
        $('.nex-page').on('tap', function() {
            if (nexId == 14) {
                return;
            }
            currentId = (id == undefined ? 0 : nexId);
            nexId = id;
            i++;
            nexId = (currentId + i);
            getPageData(nexId);
            var ele = $('.mony-select').children();
            for (var b = 0; b < ele.length; b++) {
                $(ele[b]).removeAttr('selected');
            }
            $(ele[nexId]).attr('selected', true);
            console.log(i);
            console.log(nexId);
        })
        $('.pre-page').on('tap', function() {
            if (nexId == 0) {
                return;
            }
            currentId = (id == undefined ? 0 : id);
            nexId = id;
            i--;
            nexId = (currentId + i);
            getPageData(nexId);
            var ele = $('.mony-select').children();
            for (var b = 0; b < ele.length; b++) {
                $(ele[b]).removeAttr('selected');
            }
            $(ele[nexId]).attr('selected', 'selected');
            console.log(i);
            console.log(nexId);
        })
    }
    // 滚动事件 
    $.fn.scrollTo = function(options) {
        var defaults = {
            toT: 0, //滚动目标位置
            durTime: 500, //过渡动画时间
            delay: 30, //定时器时间
            callback: null //回调函数
        };
        var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(), //滚动条当前的位置
            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index * per);
                }
            };
        timer = window.setInterval(function() {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };


    // 返回顶部 
    function backTop() {
        $('.foot_return').on('tap', function() {
            $(window).scrollTo({
                toT: 0
            });
            // $(window).scrollTop(0);
        })
        $(window).on('scroll', function() {
            // console.log($(window).scrollTop());
            // $(window).scrollTop(0);
        })
    }
})