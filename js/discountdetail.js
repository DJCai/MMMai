$(function(){
    var url = location.href;
    var query = urlTool(url);
    // console.log(query);
    var pid = query.productid;
    // console.log(pid);
    function render(productid){
        $.ajax({
            url:"http://mmb.ittun.com/api/getdiscountproduct",
            type:"GET",
            data:{productid:productid},
            success:function(obj){
                // console.log(obj);
                var html = template("detail",obj);
                $('.details').html(html);

                 // 获取数据成功,渲染页面
                 var keysArr = getKeysArr();
                 renderHistory(keysArr);
            }
        })
    }

    render(pid);
    // 直接保存在ul,但是刷新后会被清掉
    // var arr=[];
    // // var ul = document.querySelector('.list').children;
    // var ul = $('.list ul');
    // $('.details').on('click','#ctl00_ContentBody_Button1',function(){
    //     var text = $('textarea').val();
    //     // console.log(text);
    //     if(text.length==0){
    //         alert('请输入评论');
    //         return;
    //     }
    //     arr.push(text);
    //     $('.list ul').html('');
    //     for(var i=0;i<arr.length;i++){
    //         var li = document.createElement('li');
    //         li.innerHTML = arr[i];
    //         $('.list ul').append(li); 
    //     }
    //     console.log(li);
    //     $('textarea').val("");
    // })
    var keysArr = getKeysArr();
    renderHistory(keysArr);
    function renderHistory(keysArr) {
        if (keysArr.length == 0) {
            $(".list ul").hide();
        } else {
            $(".list ul").show();
            var datetime = new Date();
            var month = datetime.getMonth() + 1;
            var date = datetime.getDate();
            // var hour = datetime.getHours();
            // var minute = datetime.getMinutes();
            if(month<10){
                month = "0"+ month;
            }
            if(date<10){
                date = "0" + date;
            }
            // if(hour<10){
            //     hour = "0" +  hour;
            // }
            // if(minute<10){
            //     minute = "0" + minute;
            // }

            // var timer = datetime.getFullYear()+"/" + month + "/"+ date + " " + hour + ":" + minute;
            var timer = datetime.getFullYear()+"/" + month + "/"+ date;
            keysArr.timer = timer;
            var htmstr =  template("historyWords", {keys: keysArr});
            $(".details ul").html(htmstr);
        }
    }

    $('.details').on('click','#ctl00_ContentBody_Button1',function(){
        var keysArr = getKeysArr();
        var keyword = $("textarea").val();
        if (keyword.length == 0) return;
        // keysArr.push(keyword);
        keysArr.unshift(keyword);
        saveHistory(keysArr);
        renderHistory(keysArr);
        // 发表成功后清空文本框
        $("textarea").val("");
    });

    $('.scrollto').click(function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    })
})