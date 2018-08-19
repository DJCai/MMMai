$(function(){
    $(".loginbutton").click(function(){
        var username = $(".username").val().trim();
        var password = $(".mui-input-password").val().trim();
        if(username.length==0) {
            mui.toast("请输入用户名/手机号") ;
            return;
        }
        if(password.length==0) {
            mui.toast("请输入密码") ;
            return;
        }
        mui.toast("正在登录");
    })
})