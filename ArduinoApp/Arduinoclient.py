from pyfirmata import Arduino, util
import socketio
import time
from datetime import datetime
import signal
import base64


 

board=Arduino('COM3')#環境による
pinS = board.get_pin('d:2:i') # d=digital 2=pin number i=input (押したときFalse デフォルトTrue)
pinR = board.get_pin('d:5:o') # d=digital 5=pin number o=output
pinG = board.get_pin('d:4:o') # d=digital 4=pin number o=output
pinB = board.get_pin('d:3:o') # d=digital 3=pin number o=output

it = util.Iterator(board)
it.start()

global cameraMODE
cameraMODE='off'

signal.signal(signal.SIGINT, signal.SIG_DFL)

my_io = socketio.Client()
ec_io = socketio.Client()

def flash_light():
    pinG.write(1)
    time.sleep(0.5)
    pinG.write(0)


@my_io.on('connect')
def on_connect():
    print('[{}] connect'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    my_io.emit('ask_cameraMODE')


@my_io.on('catch_cameraMODE')
def on_catch_cameraMODE(mode):
    global cameraMODE
    cameraMODE=mode
    for i in range(3):
        pinR.write(1)
        pinG.write(1)
        pinB.write(1)
        time.sleep(0.2)
        pinR.write(0)
        pinG.write(0)
        pinB.write(0)
        time.sleep(0.2)


@my_io.on('disconnect')
def disconnect():
    print('[{}] disconnect'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')))


@my_io.on('cameraON')
def on_cameraON(mode):
    global cameraMODE
    cameraMODE='on'
    flash_light()


@my_io.on('cameraOFF')
def cameraOFF(mode):
    global cameraMODE
    cameraMODE='off'
    flash_light()

@ec_io.on('flash',namespace='/ec_path')
def flash():
    flash_light()



def my_lighting():
    global cameraMODE

    light_on=False
    light_count=0
    nowState=True
    preState=True

    while True:

        nowState=pinS.read()
        if nowState==False and preState==True:
            if cameraMODE=='on':my_io.emit('camera_switch','off')
            else:my_io.emit('camera_switch','on')
            pinR.write(1)
            pinG.write(1)
            pinB.write(1)
            my_io.sleep(0.1)
            pinR.write(0)
            pinG.write(0)
            pinB.write(0)
        

        else:
            if light_on==False:
                pinR.write(0)
                pinB.write(0)

                light_count+=1
                if light_count>1:
                    light_count=0
                    light_on=True

            else:
                if cameraMODE=='on':pinB.write(1)
                else:pinR.write(1)
            
                light_count+=1
                if light_count>1:
                    light_count=0
                    light_on=False

            my_io.sleep(0.2)
        
        preState=nowState


    

if __name__=='__main__':
    my_io.connect('http://127.0.0.1:8080',namespaces=['/'])
    ec_io.connect('http://127.0.0.1:8080',namespaces=['/ec_path'])
    my_io.start_background_task(target=my_lighting())




