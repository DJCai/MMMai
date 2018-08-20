$(function () {

    var urlstr = window.location.href; //拿到当前页面的url

    var query = urlTool(urlstr);

    //console.log(query);

    var id = query.couponId;

    //onsole.log(id);


    function render(cid) {

        $.ajax({

            url: 'http://mmb.ittun.com/api/getcouponproduct',
            type: 'get',
            data: {
                couponid: cid
            },
            success: function (res) {

                //console.log(res);
                var htmlstr = template('youhuiList', res);
                $('.list').html(htmlstr);

                var htmlstr1 = template('carousel', res);
                $('.mui-backdrop').html(htmlstr1);

                //让图片轮播生效
                mui('.mui-slider').slider({
                    interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        })
    }

    render(id);

    $('.list').on('click', 'li', function () {

         //alert('a');
        $('.mui-backdrop').show();

    });

    $('.mui-backdrop').click(function(){

        // alert('a');
        $('.mui-backdrop').hide();
    })


})