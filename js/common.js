
$(function(){
        //让区域滚动生效
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        mui('.mui-slider').slider({ 
            interval:5000
        //自动轮播周期，若为0则不自动播放，默认为0；
        });
});