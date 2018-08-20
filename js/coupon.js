$(function(){

    $.ajax({

        url: "http://mmb.ittun.com/api/getcoupon",
        type: 'get',
        success: function(res){

           // console.log(res);
           var htmlstr = template('youhui',res);
           $('.hot').html(htmlstr);
            
        }
    });

    $('.hot').on('click','li',function(){

        // alert('a');
        var id = $(this).data("id");

        // console.log(id);
        

        // console.log(this);
        
        window.location.href = "./couponproduct.html?couponId="+id;
    })
})