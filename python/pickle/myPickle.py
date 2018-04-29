import pickle
import os

def print1(flit1,flit2):
    f = open(flit1,'rb')
    g = pickle.load(f)
    f1 = open(flit2,'rb')
    g1 = pickle.load(f1)
    print(g)
    print(g1)

def generate1(xiaokefu,xiaojiayu,count):
    
    name1 = '小甲鱼' + str(count) + '.pk'
    name2 = '小客服' + str(count) + '.pk'
    m = open(name1,'wb')
    m1 = open(name2,'wb')
    
    pickle.dump(xiaokefu,m)
    pickle.dump(xiaojiayu,m1)
    m.close()
    m1.close()


def generate(flit):
    
    f = open(flit)
    xiaokefu = []
    xiaojiayu = []
    count = 1
    for  i in f.readlines():
        
        
        if i[:6] != '======':
            (j,k) = i.split(':',1)
            if j == '小客服':
               xiaokefu.append(k)
            if j == '小甲鱼':
                xiaojiayu.append(k)
        else:
            os.chdir('F:\\pyf\\python\\pickle')
            name1 = '小甲鱼' + str(count) + '.pk'
            name2 = '小客服' + str(count) + '.pk'
            m = open(name1,'wb')
            m1 = open(name2,'wb')
