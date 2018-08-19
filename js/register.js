$(function () {
    /*获取num位数字验证码*/
    function create_code(num) {
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        //获取1-10随机数字
        //Math.floor(Math.random()*10+1);
        var create_code = '';
        for (var k = 0; k < num; k++) {
            create_code += arr[Math.floor(Math.random() * 10 + 1) - 1];
        }
        return create_code;
    }

    //点击获取验证码
    //是否可以点击【获取验证码按钮开关】
    var onOff = true;
    //code_4用于注册信息时的验证，验证码，获取与输入的一致
    var code_4 = '';
    var timer=null;
    $(".getyzm").click(function () {
        //如果onOff标志false则，不执行任何操作
        if (!onOff)
            return;
        //循环周期30s
        var times = 30;
        //获取验证码
        var code = create_code(4);
        code_4 = code;
        //模拟短信发送，以后需要改成短信发送，在这里修改
        mui.toast(code,{ duration:'long', type:'div' });
        //使用定时器，一秒触发一次事件，如果结束，则关闭定时器
        timer = setInterval(function () {
            //事件处理，一秒一次
            times--;
            if (times < 1) {
                //执行结束，则可以再次点击
                $(".getyzm").html("获取验证码");
                onOff = true;
                clearInterval(timer);
            } else {
                var text = times + 's';
                $(".getyzm").html(text);
                onOff = false;
            }
        }, 1000);
    });


    $(".registerbutton").click(function () {
        var username = $("input[name=username]").val().trim();
        if (username.length == 0) {
            mui.toast("请输用户名");
            return;
        }
        // 验证密码
        var password = $("input[name=password]").val();
        var passwordpatten = new RegExp(/^[0-9|A-z|_]{6,20}$/);
        if (!passwordpatten.test(password)) {
            mui.toast("请输入6-20个字符");
            return;
        }
        // 验证手机号码;
        var telephonepattern = new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/);
        var telephone = $("input[name=telephone]").val();
        if (!telephonepattern.test(telephone)) {
            mui.toast("请输入13位手机号码");
            return;
        }
        // 验证邮箱
        var email = $("input[name=email]").val();
        var emailpatten = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!emailpatten.test(email)) {
            mui.toast("请输入正确的邮箱");
            return;
        }
        //验证验证码
        var yanzhengma=$("input[name=yanzhengma]").val();
        if(yanzhengma.length==0){
            mui.toast("请输入验证码");
            return;
        }else if(yanzhengma != code_4) {
            mui.toast("请正确输入验证码");
            return;
        }else{
            $(".getyzm").html("获取验证码");
            onOff = true;
            clearInterval(timer);
        }
    })
})