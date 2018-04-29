import pickle
import os
os.chdir('F:\\pyf\\python\\pickle')
def loadFile():
    fileList = os.listdir()
    for txtFile in fileList:
        (fileName,houzhui) = os.path.splitext(txtFile)
        if houzhui == '.txt':
            try:
                pickle_file = open(txtFile,'rb')
                txt = pickle.load(pickle_file)
                print(txt)
            except:
                print('0.0')

loadFile()