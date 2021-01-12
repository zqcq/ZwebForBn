
# -*- coding:utf-8 -*-

def isChinese(word):
    for ch in word:
        if '\u4e00' <= ch <= '\u9fff' or ch == '%':
            return True
    return False

def splitStr(str1):
    str1 = str1.replace(" ", "%")
    li = [str1]
    
    str2=""
    n = 5
    count = 0
    index = 0

    while n > 0:

        while index < len(str1):
            str2 = str2+str1[index]
            if isChinese(str1[index]) is True:
                count = count+1
            elif index < len(str1)-1 and isChinese(str1[index+1]) is True:
                count = count+1 
            if count >= n: 

                
                bool1 = (len(str2)==1 and isChinese(str2) == True) #是否为单字中文
                bool2 = (len(str2)==2 and isChinese(str2) == True and "%" in str2) #是否为双字中文但包含一个%

                if (str2 not in li) and (bool1 is False) and (bool2 is False) :
                    li.append(str2)
                str2 = ""
                count = 0
            index = index + 1

        if len(str2) > 0:
            if str2 not in li and (len(str2)==1 and isChinese(str2) == True) is False:
                li.append(str2)
            count = 0
            str2 = ""
        index = 0
        n = n -1
    return li
