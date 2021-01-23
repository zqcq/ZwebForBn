# -*- coding:utf-8 -*-


import pymssql
from SpiltStr import splitStr

# 根据传入的参数，查询销售数据
def connectsql():
    server = "8.135.33.3"
    user = "sa"
    password = "lanersut@2015"
    database = "Zweb_v1"
    con = pymssql.connect(server, user, password, database, charset="utf8")
    return con

# 在数据库中插入表单
def insertForm(DataJson):
    try:
        sql = ""
        con = connectsql()
        cur = con.cursor()
        cur.callproc('InsertProblemInfo',
                        (DataJson["no"], 
                        DataJson["theme"],
                        DataJson["branch"], 
                        DataJson["user"], 
                        DataJson["direct_system"],
                        DataJson["relation_system"], 
                        DataJson["describe2"], 
                        DataJson["class"], 
                        DataJson["solution2"], 
                        DataJson["status"], 
                        DataJson["acceptor"], 
                        DataJson["time"], 
                        DataJson["city"],
                        DataJson["interface_people"],
                        DataJson["user_no"])
                    )
        con.commit()
        con.close()
        return 0
    except Exception as e:
        return e

# 从数据库查询门店ID和名称表，并返回一个二维list
def getdata():
    
    con = connectsql()
    cur = con.cursor()

    li_sql = {"branch":"select branch_name from t_be_branch_info", 
               "city" : "select city_name from t_be_city_info", 
               "system" : "select system_name from t_be_system_info", 
               "status": "select status_name from t_be_status_info", 
               "class" : "select problem_class_name from t_be_problem_class_info"
               }
    li = []
    for key,value in li_sql.items():
       
        cur.execute(value)
        row = cur.fetchall()

        row.insert(0, key)
        li.append(row)
    con.close()
    return li

def getproblenform(str2):
    try:
        con = connectsql()
        cur = con.cursor()
        count = 1
        list2 = splitStr(str2)
        sqlCommand = ""
        sqlCommand_q = r"select  top 20 * from (SELECT top 100 percent  *,ROW_NUMBER() OVER (PARTITION  BY no ORDER BY  ci) AS dis   from ("
        sqlCommand_h = r")fg order by ci  )d where d.dis = 1 order by ci "
        for x in list2:
            sqlCommand = sqlCommand + r"select *, row_number()  over(order by no) as rn,"+str(count)+r" as ci  From t_be_problem_form Where theme like '%"+x+r"%' or describe2 like '%" +x+r"%' UNION ALL "
            count = count + 1
        sqlCommand = sqlCommand_q+ sqlCommand[:-10]+sqlCommand_h
        print(sqlCommand)
        cur.execute(sqlCommand)
        row = cur.fetchall()
        return {"code":"suc","data":row}
    except Exception as e:
        return {"code":"fail", "data":[]}

def getuserinfo(userid):

    try:
        con = connectsql()
        cur = con.cursor()

        sqlCommand = "select * from t_be_user_info where user_no = '" + userid +"'"
        cur.execute(sqlCommand)
        row = cur.fetchall()
        
        return {"code":"suc", "data":list(row[0])}
    except Exception as e:
        print(e)
        return {"code":"feil"}


def getproblenform2(DataJson):
    try:
        con = connectsql()
        cur = con.cursor()
        
        sqlCommand = r"select * from t_be_problem_form where user_no = '" + DataJson["user_no"] + r"' and time between '" +DataJson["begin_time"]+ r"' and '"+DataJson["end_time"]+ " 23:59:59"+ r"' and no like '%"+DataJson["no"]+ r"%' and theme like '%" +DataJson["theme"]+ r"%' and status like '%"+DataJson["status"]+r"%'"  
        
        cur.execute(sqlCommand)
        row = cur.fetchall()
        con.close()
        return {"code":"suc", "data":row}
    except Exception as e:
        print(e)
        return {"code":"fail","data":[]}

def getproblenform3(no):
   
    try:
        con = connectsql()
        cur = con.cursor()
        
        sqlcommand = r"select * from t_be_problem_form where no ='" + no + r"'"
    
        cur.execute(sqlcommand)
        row = cur.fetchall()
        row = list(row[0])
        row[6] = row[6].replace("<br/>", "\n")
        row[8] = row[8].replace("<br/>", "\n")
        print(row)
        return {"code":"suc", "data":row}
    except Exception as e:
        print(e)
        return {"code":"feil"}
    con.close()
     

def updateproblem(DataJson):
    try:
        con = connectsql()
        cur = con.cursor()
        cur.callproc('UpdateProblem',
                        (DataJson["no"], 
                        DataJson["theme"],
                        DataJson["branch"], 
                        DataJson["user"], 
                        DataJson["direct_system"],
                        DataJson["relation_system"], 
                        DataJson["describe2"], 
                        DataJson["class"], 
                        DataJson["solution2"], 
                        DataJson["status"], 
                        DataJson["interface_people"],
                        DataJson["done_time"])
                    )
        con.commit()
        con.close()
        return 0
    except Exception as e:
        return e    



