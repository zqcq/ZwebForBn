"use strict"

$(function(){

    // 从后台请求各下拉框数据，生成下拉框选项

    var ProblemStatus = $(".problem_status");
    


    var j = $.ajax("http://127.0.0.1:8080",{
        data:JSON.stringify({"hash":"getdata"}),
        type :"post",
        contentType: "application/json charset=UTF-8",
        success:function(msg){
        
            for(var x in msg){        
               
                if (msg[x][0] == "status")
                {
                    for(var y=1; y<msg[x].length; y++){
                        ProblemStatus.append("<option value=\"" + msg[x][y] + "\">" + msg[x][y] +"</option>");
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
function check() {
    
    var BeginTime = $(".begin_time").val();
    var EndTime = $(".end_time").val();
    var ProblemNo = $(".problem_no").val();
    var Problentheme = $(".problem_theme").val();
    var UserNo = $("#userid").text();
    var Status = $(".problem_status").val();
    var datatable = $(".data_table");

    var j = $.ajax("http://127.0.0.1:8080",{
        data:JSON.stringify({"hash":"getproblemform","data":{"user_no":UserNo, "begin_time":BeginTime,"end_time":EndTime,"no":ProblemNo,"theme":Problentheme,"status":Status}}),
        type :"post",
        contentType: "application/json charset=UTF-8",
        success:function(msg){
           
            if (msg["code"] == "suc"){
                
                if(msg["data"].length == 0){
                    datatable.empty();
                    alert("没有数据!");
                }
                else{
                    datatable.empty();
                    datatable.append('<tr class ="data_tr_head"> <td class = "no_td">问题编号</td><td class = "system_td">相关系统</td> <td class = theme_td>问题主题</td><td class = "time_td">修改日期</td><td class = "status_td">问题状态</td><td class = "change_td">操作</td></tr>')
                    for (var x in msg["data"]){

                        datatable.append('<tr><td>' + msg["data"][x][0] + '</td><td>' +  msg["data"][x][4] + '</td><td>' +msg["data"][x][1] + '</td><td>' +msg["data"][x][14] + '</td><td>' +msg["data"][x][9] + '</td><td>' +   '<a href="../html/change.html"><img class = "change_logo" src="../static/pic/change_logo.png"/></a> <a href="../html/delete.html"><img class = "delete_logo" src="../static/pic/delete_logo.png"/></a>'  +'</td></tr>' );
                           
                        
                    }
                }
            }
        },
        error:function(msg){
            alert("ajax请求数据失败");
        }
    }) 

}


