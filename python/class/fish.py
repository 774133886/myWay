import random as r

class Fish:
    def __init__(self,num):
        self.num = num
        self.addrs = []
        for idx in range(0,num):
            obj = {}
            obj['x'] = r.randint(0,10)
            obj['y'] = r.randint(0,10)
            self.addrs.append(obj)
            
    
    def move(self):
        d = ['x','y']
        direction = r.randint(0,1)
        step = r.randint(1,2)
        count = r.randint(0,1)
        for idx,i in enumerate(self.addrs):
            if d[direction] == 'x':
                if count == 0:
                    self.addrs[idx]['x'] = self.border(i['x'],count,step)
                else:
                    self.addrs[idx]['x'] = self.border(i['x'],count,step)
            else:
                if count == 0:
                    self.addrs[idx]['y'] = self.border(i['y'],count,step)
                else:
                    self.addrs[idx]['y'] = self.border(i['y'],count,step)
    #判断边界
    def border(self,d,j,s):
        a = 0
        if j == 0:
            a = d - s
        else:
            a = d + s
        if a < 0:
            a = 0 - a
        elif a > 10:
            a = a - 10
        return a

class Turtle(Fish):
    def __init__(self,num):
        super().__init__(num)
        self.power = 100

class Pool:
    def __init__(self,fishNum,turtleNum):
        self.fish = Fish(fishNum)
        self.turtle = Turtle(turtleNum)
    def start(self):
        self.fish.move()
        self.turtle.move()
        
        print('鱼的坐标：')
        print(self.fish.addrs)
        print('龟的坐标：')
        print(self.turtle.addrs)
        if (self.eated()):
            self.turtle.power += 20
            print('吃掉一只鱼！！！还剩 %d 条！！！龟的体力增加20，还剩体力：%d' % (len(self.fish.addrs),self.turtle.power))
        else:
            self.turtle.power -= 5
            print('龟没有吃到鱼！还剩体力 %d ' % (self.turtle.power))
        
        if len(self.fish.addrs) == 0:
            print('鱼已经被吃完！！游戏结束！！！')
        elif self.turtle.power == 0:
            print('龟没有体力了！！！游戏结束！！！')
        else:
            self.start()

    def eated(self):
        isEat = False
        for idx,i in enumerate(self.fish.addrs):
            if (self.turtle.addrs[0]['x'] == i['x']) and (self.turtle.addrs[0]['y'] == i['y']):
                del self.fish.addrs[idx]
                isEat = True
                break
        return isEat

fish = Pool(10,1)
fish.start()
