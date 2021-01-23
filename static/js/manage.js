"use strict"

$(function(){
    
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var mon = ("0" + (now.getMonth()+1)).slice(-2);
    var today = now.getFullYear() + "-" + (mon) + "-" + (day);
    $(".end_time_value").val(today);
    // 从后台请求各下拉框数据，生成下拉框选项

    var ProblemStatus = $(".problem_status_value");
    $("#table_page").bootstrapTable();
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
    
    var BeginTime = $(".begin_time_value").val();
    var EndTime = $(".end_time_value").val();
    var ProblemNo = $(".problem_no_value").val();
    var Problentheme = $(".problem_theme_value").val();
    var UserNo = $("#userid").text();
    var Status = $(".problem_status_value").val();


    var j = $.ajax("http://127.0.0.1:8080",{
        data:JSON.stringify({"hash":"getproblemform","data":{"user_no":UserNo, "begin_time":BeginTime,"end_time":EndTime,"no":ProblemNo,"theme":Problentheme,"status":Status}}),
        type :"post",
        async :false,
        contentType: "application/json charset=UTF-8",

        success:function(msg){
            if (msg["code"] == "suc"){
                
                if(msg["data"].length == 0){
                    $('#table_page').empty();
                    alert("没有数据!");
                }
                else{
                    $("#table_page").bootstrapTable('destroy'); 
                    $("#table_page").empty();
                    
                    for (var x in msg["data"]){
                        $('#table_page').append('<tr><td>' + msg["data"][x][0] +
                                                '</td><td>' +msg["data"][x][1] + 
                                                '</td><td>' +msg["data"][x][8].replace(/<br\/>/g, "\n")+ 
                                                '</td><td>' +msg["data"][x][3] + 
                                                '</td><td>' + msg["data"][x][4] + 
                                                '</td><td>' +msg["data"][x][7] + 
                                                '</td><td>' +msg["data"][x][13] +
                                                '</td><td>' +msg["data"][x][11]+ 
                                                
                                               
                                                '</td><td>' +msg["data"][x][9] + 
                                                
                                                '</td><td>' + '<a href="../html/change.html?id='+msg["data"][x][0]+'"><img class = "change_logo" src="../static/pic/change_logo.png"/></a>'  +
                                                '</td></tr>' );
                    }
                    $('#table_page').bootstrapTable({
                        striped: true,
                        pageSize: 8,
                        pagination: true,
                        sidePagination: "client",
                        search: true,
                        showToggle:true,
                        showExport: true,  //是否显示导出按钮
                        buttonsAlign:"right",  //按钮位置
                        exportTypes:['excel'],  //导出文件类型
                        Icons:'glyphicon-export',
                      
                        columns:[{field:"id",title:"问题编号",width:150},
                                {field:"des",title:"问题主题"},
                                {field:"solution",title:"解决方案",width:80},
                                {field:"user",title:"提出人",width:60},
                                {field:"system",title:"相关系统",width:80},
                                {field:"class",title:"问题分类",width:80},
                                {field:"interface_people",title:"二三线支持",width:80},
                                {field:"time",title:"提出时间",width:130},
                                
                               
                                {field:"status",title:"问题状态",width:80},
                                
                                {field:"do",title:"操作",width:40},
                            ]
                    });
                }
               
            }
        },
        error:function(msg){
            alert("ajax请求数据失败");
        }
    });
}



