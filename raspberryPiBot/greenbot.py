import os
import time
import requests
import greenbotmovement as move
from plantcapture import capture_upload as cap

#from firebase import firebase
#firebase=firebase.FirebaseApplication('https://greenhouse123-2ffce.firebaseio.com/',None)
#firebase.put("/Control","/bot",0)
#start servo_blaster
#os.system('cd /')
#os.system('cd /home/pi/servoblaster')

os.system('sudo ./servod')
os.system('echo 2=50 > /dev/servoblaster')
os.system('echo 1=50 > /dev/servoblaster')
print('servo startup success')
def H(x):
    cmd="echo 1=%s%c > /dev/servoblaster"%(x,'%')#pin 11
    os.system(cmd)
def V(x):
    cmd="echo 2=%s%c > /dev/servoblaster"%(x,'%')# pin 12
    os.system(cmd)
horsteps=2
versteps=4
#hrange=range(50,150,50)#start ,stop,step
#vrange=range(50,150,25)
#hrange=[0,50,100] #0deg 90deg 180deg
hrange=[0,0,100,100] #look left two plants and look right two plants
vrange=[80,90]#two positions  in vertical
botmovement=['fow','stop','rev','stop']
sleepsec=5# wait during each vertical step
i=0
plantcount=1
##def fow(param):
##    print("stepped forward")
##    pass    
##    
##def back(param):
##    print("stepped Backward")
##    pass

def displace(cmd):
    if(cmd=="fow"):
        print("stepped forward")
        move.fow(0.5)
    if(cmd=="stop"):
        print("holding ground")
        move.stop()
    if(cmd=="rev"):
        print("stepped backward")
        move.back(0.5)

#set botswitch 
def botswitch(val):
  requests.post("https://api.thingspeak.com/apps/thinghttp/send_request?api_key=CTOS6NZWZ04NV41N&rc="+str(val))

def proc(plantcount=1):
    i=0
    for hi in hrange:
        H(hi)
        for vi in vrange:
            V(vi)
            cap(plantcount)
            plantcount=plantcount+1
            if(plantcount==6):
                plantcount=1
            time.sleep(sleepsec)
        displace(botmovement[i])
        i+=1
        if(i>3):
            i=0
    
while(1):
    state=requests.get("https://things.ubidots.com/api/v1.6/devices/demo/rc/lv?token=A1E-x3McHbMANDj9zdkdasXd6GrwtMGEH1").json()
    if state==1:
        print("Process start")
        proc()
        botswitch(0)
        #print(state)
    
