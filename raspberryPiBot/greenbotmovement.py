import RPi.GPIO as gpio
import time

#pin names
LMp=35
LMn=37
RMp=36
RMn=38

gpio.cleanup()
gpio.setmode(gpio.BOARD)#use pin numbering
gpio.setup(LMp, gpio.OUT)
gpio.setup(LMn, gpio.OUT)
gpio.setup(RMp, gpio.OUT)
gpio.setup(RMn, gpio.OUT)

def stop():
    gpio.output(LMp, False)
    gpio.output(LMn, False)
    gpio.output(RMp, False)
    gpio.output(RMn, False)

def runf(distance):
    #print("Moving Forward")
    gpio.output(LMp, True)
    gpio.output(LMn, False)
    gpio.output(RMp, True)
    gpio.output(RMn, False)
    time.sleep(distance)
    stop()

def runb(distance):
    #print("Moving Backward")
    gpio.output(LMp, False)
    gpio.output(LMn, True)
    gpio.output(RMp, False)
    gpio.output(RMn, True)
    time.sleep(distance)
    stop()
    
def fow(distance,stepwait=0.05):
    remdistance=0
    while(remdistance!=distance):
        runf(remdistance)
        remdistance+=(stepwait*2)
        time.sleep(stepwait)
    stop()

def back(distance,stepwait=0.05):
    remdistance=0
    while(remdistance!=distance):
        runb(remdistance)
        remdistance+=(stepwait*2)
        time.sleep(stepwait)
    stop()

if __name__=="__main__":
    fow(0.5)
    back(0.5)
    ##time.sleep(2)
    ##runb(0.2)

