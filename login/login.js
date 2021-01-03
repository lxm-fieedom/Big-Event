var layer = layui.layer;
var form = layui.form;


// 去注册
$("#goto-register").on("click", function() {
    $("#login").hide();
    $("#register").show();
});
// 去登录
$("#goto-login").on("click", function() {
    $("#login").show();
    $("#register").hide();
});
// 需求：
//    1. 用户名、密码、重复密码不能为空
//    2. 密码、重复密码长度 6~12 位，且不能出现空格、非空格类字符；  \S
//    3. 密码和重复密码必须一致
form.verify({
    changDu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],
    // 使用函数
    same: function(val) {
        // console.log(val);  获取到两个密码输入框的值
        //     // 获取某个地方的值
        var pwd = $('.pwd').val();

        //     // // val:要验证的值
        if (pwd !== val)
            return '两次密码不一致哟~';
    }

});


// ==============注册
$('#register form').on('submit', function(e) {
    // 默认行为阻止
    e.preventDefault();

    // /收集数据
    var params = $(this).serialize();
    // 提交数据   去看后台给的接口文档
    $.ajax({
        url: "http://ajax.frontend.itheima.net/api/reguser",
        type: 'post',
        data: params,
        success: function(res) {
            layer.msg(res.message);

            // 判断状态
            if (res.status == 0) {
                $("#login").show();
                $("#register").hide();
            } else {
                $("#username").val('');

            }
        }
    })

});