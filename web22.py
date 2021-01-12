# -*- coding:utf-8 -*-
import json
import os
import web
import sys
import pickle
from web.template import ALLOWED_AST_NODES
from ConnectSql import insertForm
from ConnectSql import getdata
from ConnectSql import getproblenform
import random
from datetime import datetime
from JsonDateEncoder import DateEncoder


emsg = json.dumps({"code": "账号/密码错误，请重试！"})
smsg = json.dumps({"code": "suc"})
timeOutMsg = json.dumps({"time_out": "登录超时，请重新登录！"})

# 关闭web.py的debug模式，以便session运行
web.config.debug = False

# 这一句解决web.py版本兼容问题，好像删除也能用，忘记当初为了解决什么问题加进去的了。
ALLOWED_AST_NODES.append('Constant')

# web.py 设置URL映射关系
urls = (
    "/", "Admin",
    "/adm", "Admin",
    #这一句配置了CSS/JS等文件夹的目录
    '/(js|css|images)/(.*)', 'static',
    "/html/form.html","form",
    "/kill","Kill"

)

# 设置HTML模板文件夹路径，HTML模板保存在此文件夹内，调用时使用render.xxx() (XXX为HTML文件名，不含HTML后缀)
render = web.template.render('html/')

app = web.application(urls, globals())

# 建立session文件夹，这一句可以让web.py给客户端response一个唯一的seesion会话ID
session = web.session.Session(app, web.session.DiskStore('ses'), initializer={'login': False})


# 此类用于清除session（session.kill()），并跳转到登录页。
class Kill():
    def GET(self):
        web.header("Access-Control-Allow-Origin", "*")
        web.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE,OPTIONS")
        session.kill()
        return render.login()


# 登录成功后返回的页面
class form():
    def GET(self):
        web.header('content-type', 'text/html; charset=utf-8', unique=True)
        web.header("Access-Control-Allow-Origin", "*")
        web.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE,OPTIONS")

        if session.login is True:
            return render.form()
        return render.login()


# 登录页
class Admin():
    def GET(self):
        web.header('content-type', 'text/html; charset=utf-8', unique=True)
        web.header("Access-Control-Allow-Origin", "*")
        web.header("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE,OPTIONS")
        return render.main()

    # 获取POST数据，并判断请求类型
    def POST(self):
        # web.header中的“text/html或者application/json”，决定了响应的数据格式。
        web.header('content-type', 'application/json; charset=utf-8', unique=True)
        web.header("Access-Control-Allow-Origin", "*")
        
        data = web.data()
        datas = json.loads(data.decode('utf-8'))

        # “hash”是前端POST数据必备字段，判断是否为正常POST请求
        if "hash" in datas:

            # “hash”==“login” 登录请求
            if datas["hash"] == "login":
                if datas['acc'] == "admin" and datas['pass'] == "admin":
                    session.login = True
                    return smsg
                return emsg

            # “hash” == "insertform" 上传表单
            elif datas["hash"] == "insertform":
                if session.login is True:
                    for key, value in datas.items():
                        if value == "":
                            NullMsg = json.dumps({"code":"NullMsg", "err":key+"值为空"})
                            return NullMsg
                    del datas["hash"]
                    datas["no"] = datetime.now().strftime('%Y%m%d%H%M%S') + str(random.randint(10000,99999))
                    datas["city"] = "中山仓"
                    datas["time"] = datetime.now()
                    # 调用数据库请求方法，返回请求到的数据
                    
                    re = insertForm(datas)
                    if(re == 0 ):
                        return smsg
                    else:
                        return re
                else:
                    return timeOutMsg

            # “hash” == ”getdata“ ,从数据库请求各个下拉框的数据
            elif datas["hash"] == "getdata":
                if session.login is True:
                    return json.dumps(getdata())
                else:
                    return timeOutMsg
            elif datas["hash"] == "search":
                return(json.dumps(getproblenform(datas["searchInfo"]),cls=DateEncoder))


if __name__ == "__main__":
    app.run()
