import sqlite3
import os
dbPath= os.path.join(os.getcwd(),os.path.abspath('./mydb/products.db'))

def get_DB():

    #id,name,hname,price,stock,category,image1,image2

    conn = sqlite3.connect(dbPath)
    cur = conn.cursor()
    cur.execute('''SELECT id,name,hname,price,stock,category,image1,image2 FROM PRODUCTS''')
    result=cur.fetchall()

    
    indexNames=["id","name","hname","price","stock","category","image1","image2"]


    #javaScriptに渡すときはプロパティ名はダブルクォーテーションをつける必要がある。
    json_str='['

    for i,a_product in enumerate(result):
        json_str+='{'

        index_Product=zip(indexNames,a_product)
        for j,pair in enumerate(index_Product):

            if pair[0] in ["price" , "stock" , "id"]:
                json_str+=f'''"{pair[0]}":{pair[1]}'''

            else:json_str+=f'''"{pair[0]}":"{pair[1]}"'''
            #print(type(section))
            #print(section)

            if j<len(a_product)-1:json_str+=','
            
        json_str+='}'
        if i<len(result)-1:json_str+=','

    json_str+=']'

    json_str=json_str.replace('\ufeff','')
    return (json_str)
    #type(result)=list