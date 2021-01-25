"use strict"
//验证表单是否为空，若为空则将焦点聚焦在input表单上，否则表单通过，登录成功
// 此函数绑定登录按钮
function check(form) {

    // 使用jQuery获得账户和密码的DOM节点
    var accountName = $("#accountName"), password = $("#password");
    var accountName = accountName.val(), password = password.val();
    var urlAddress = window.location.href;
    // 判断账号密码是否为空，为空则返回false给FORM，终止执行提交操作。
    if (!accountName || accountName == "") {
        showMsg("请输入用户名!");
        form.accountName.focus();
        return false;
    }
    if (!password || password == "") {
        showMsg("请输入密码!");
        form.password.focus();
        return false;
    }

    // 账号密码不为空，使用jQ的AJAX()用来提交登录信息
    var l = $.ajax("http://8.135.33.3:8080",{

        // 使用POST+JSON格式，JSON.stringify将提交的数据序列化
        data:JSON.stringify({"pass":password,"acc":accountName,"hash":"login"}),
        // 提交方式
        type:"post",
        contentType:"application/json, charset=UTF-8",
        dataType:"json",

        // 提交成功后，获得服务端返回的结果，为"suc"则跳转到数据页，否则不跳转，显示返回的错误信息。
        success:function (msg) {
            if (msg["code"] == "suc"){
              window.open(urlAddress,"_self");
            }
            else{
              showMsg(msg["code"]);
            }
        }
    })
}

//错误信息提醒
function showMsg(msg){
    $("#CheckMsg").text(msg);
  }

//监听回车键提交
$(function(){
  document.onkeydown=keyDownSearch;
  function keyDownSearch(e) {
    // 兼容FF和IE和Opera
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
      $('#submit').click();//具体处理函数
      return false;
    }
    return true;
  }
});

