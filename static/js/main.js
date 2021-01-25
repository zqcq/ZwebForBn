"use strict"

function check2(li)
{
  var getArr = li.split(",");

  $('.infomation_area').addClass('infomation_area_donghua');
  $('#infomation_describe_p').text(getArr[1]);
  $('#infomation_solution_p').replaceWith('<p id="infomation_solution_p">'+getArr[8]+'</p>');
  $('#problem_no').text("问题编号:"+getArr[0]);
  $('#time').text("提交时间:"+ getArr[11]);
  $('#insert_branch').text("提交城市:"+getArr[12]);
  $('#insert_user').text("贡献人:"+getArr[10]);
  $('#problem_status').text("问题状态:"+ getArr[9]);
  setTimeout(function(){
    $('.infomation_area').removeClass('infomation_area_donghua');
  },1000);
  
}


function check(form)
{
    
    var search_info = $("#search_input");
    var search_info = search_info.val();
    var search_result_list = $(".search_result_list");
    
    
    if(search_info == "")
    {
      return;
    }

    search_result_list.append('<img id = "loading" src="../static/pic/loading6.gif"/>')
    var l = $.ajax("http://8.135.33.3:8080",{
    
        // 使用POST+JSON格式，JSON.stringify将提交的数据序列化
        data:JSON.stringify({"searchInfo":search_info,"hash":"search"}),
        // 提交方式
        type:"post",
        contentType:"application/json, charset=UTF-8",
        dataType:"json",

        // 提交成功后，获得服务端返回的结果，为"suc"则跳转到数据页，否则不跳转，显示返回的错误信息。
        success:function (msg) {
            if (msg["code"] == "fail"){
              alert("获取数据失败");
              return;
            }
           
            if (msg["code"] == "suc" ){
              search_result_list.children().remove();
              if(msg["data"] ==0 ){   
                search_result_list.append('<p id = "not_find">&nbsp&nbsp没有找到"'+search_info+'" </p>');
              }
              
              for (var x in msg["data"]){
                var va = msg["data"][x];
              
                search_result_list.append('<input type=\"button\" value=\"' + msg["data"][x][1] + '\" onclick=\"return check2(\'' + va + '\');\">');
              }
            }
          
        }
    })
}

//监听回车键提交
$(function(){
  document.onkeydown=keyDownSearch;
  function keyDownSearch(e) {
    // 兼容FF和IE和Opera
    var theEvent = e || window.event;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
      $('#search_button').click();//具体处理函数
      return false;
    }                      
    return true;
  }
});
