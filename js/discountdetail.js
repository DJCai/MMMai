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
            }
        })
    }

    render(pid);
    var arr=[];
    // var ul = document.querySelector('.list').children;
    var ul = $('.list ul');
    $('.details').on('click','#ctl00_ContentBody_Button1',function(){
        var text = $('textarea').val();
        // console.log(text);
        if(text.length==0){
            alert('请输入评论');
            return;
        }
        arr.push(text);
        $('.list ul').html('');
        for(var i=0;i<arr.length;i++){
            var li = document.createElement('li');
            li.innerHTML = arr[i];
            $('.list ul').append(li); 
        }
        console.log(li);
        $('textarea').val("");
    })
})