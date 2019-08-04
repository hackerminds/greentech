#import picamera
import requests,ftplib
import os
from time import sleep

plantcount=1


def pause(dur):
        wait=0
        for wait in range(dur):
            print(dur-wait)
            sleep(1)            
            
def capture_upload(plantcount=1):
        os.system('fswebcam -r 1280x720 --no-banner -S 30 --jpeg 50 --save /home/pi/tomato.jpg')
        print("captured leaf")

        print("detecting disease")

        print("uploading to cloud..........")

        print("initiating upload to ftp")
        session = ftplib.FTP('ftp.myte.net','FTP@FTP.NET','PASSWORD')
        file = open('/home/pi/tomato.jpg','rb')                  # file to send

##        plantcount=plantcount+1
##        if(plantcount==6):
##                plantcount=1
                
                
        #saveas="STOR /plantix/diagnosed%s.jpg" 
        session.storbinary('STOR /plantix/%s.jpg'%(plantcount), file)     # send the file
        file.close()                                    # close file and FTP
        session.quit()
        print("Successfully uploaded to FTP")

        pause(0)
        
if __name__=="__main__":
        capture_upload()
