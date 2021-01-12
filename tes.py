# -*- coding:utf-8 -*-

import pymssql

# 根据传入的参数，查询销售数据
def connectsql():
    server = "8.135.33.3"
    user = "sa"
    password = "lanersut@2015"
    database = "Zweb_v1"
    con = pymssql.connect(server, user, password, database, charset="utf8")
    return con


def getdata():
    con = connectsql()
    cur = con.cursor()

    li_sql = {
              "sys": "select branch_name from t_be_branch_info"
              }

    cur.execute(li_sql["sys"])
    row = cur.fetchall()

    print(row)
    con.close()

getdata()