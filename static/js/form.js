"use strict"

$(function(){

    // 从后台请求各下拉框数据，生成下拉框选项
    var branch = $("#branch");
    var direct_system = $("#direct_system");
    var relation_system = $("#relation_system");
    var class1 = $("#class");
    var status = $("#status");
    var city = $("#city");

    var j = $.ajax("http://127.0.0.1:8080",{
        data:JSON.stringify({"hash":"getdata"}),
        type :"post",
        contentType: "application/json charset=UTF-8",
        success:function(msg){
            
            for(var x in msg){        
                      
                if (msg[x][0] == "branch")
                {
                    for(var y=1; y<msg[x].length; y++){ 
                        branch.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
                    } 
                }

                if (msg[x][0] == "city")
                {
                    for(var y=1; y<msg[x].length; y++){
                        city.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
                    } 
                }

                if (msg[x][0] == "system")
                {
                    for(var y=1; y<msg[x].length; y++){
                        direct_system.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
                        relation_system.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
                    } 
                }

                if (msg[x][0] == "class")
                {
                    for(var y=1; y<msg[x].length; y++){
                        class1.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
                    } 
                }

                if (msg[x][0] == "status")
                {
                    for(var y=1; y<msg[x].length; y++){
                        status.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
                    } 
                }
            }
        },
        error:function(msg){
            alert("ajax请求数据失败");
        }
    }) 
});

// 表单提交按钮单击事件
function check(form) {

    //遍历表单，将参数打包为JSON，POST到后端。
    var data = {};
    var fele = $(".long_input,.short_input, .high_input");
    fele.each(function(i){
        var key = $(this).attr('id').toString();
        var value = $(this).val().toString().replace(/\n/g,'<br/>');
        data[key] = value;
    });

    var key = "hash";
    var value = "insertform";
    data[key] = value;
    var data_json = JSON.stringify(data);

    var con = $.ajax("http://127.0.0.1:8080",{
        data:data_json,
        type:"post",
        contentType:"application/json, charset=UTF-8",
        dataType:"json",

        success:function (msg) {
            if(msg["code"] == "suc"){
                alert("保存成功");
                $("#reset").trigger("click");
            }
            else if(msg["code"]== "NullMsg"){
                alert(msg["err"]);
            }
        }
    })

}


