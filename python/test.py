import pickle
import os
os.chdir('F:\\pyf\\python\\pickle')
os.getcwd()

def save_file(boy,girl,count):
    file_name_boy = 'boy_' + str(count) + '.txt'
    file_name_girl = 'girl_' + str(count) + '.txt'
    boy_file = open(file_name_boy,'wb')
    girl_file = open(file_name_girl,'wb')
    
    pickle.dump(boy,boy_file)
    pickle.dump(girl,girl_file)

    boy_file.close()
    girl_file.close()


def split_file(file_name):

    pickle_file = open(file_name)

    count = 1
    boy = []
    girl = []
    for line in pickle_file:
        if line[:3] != '===':
            (name,speak) = line.split(':',1)
            if name == '小甲鱼':
                boy.append(speak)
            if name == '小客服':
                girl.append(speak)
        else:
            save_file(boy,girl,count)
            boy = []
            girl = []
            count += 1
    save_file(boy,girl,count)
    pickle_file.close()
split_file('record.txt')
