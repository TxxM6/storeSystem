import socketio
import time
from datetime import datetime
import cv2
# 終了シグナルをキャッチするライブラリのインポート
import signal
import base64


global cameraMODE
cameraMODE='off'

signal.signal(signal.SIGINT, signal.SIG_DFL)

mode_io = socketio.Client()
video_io = socketio.Client()



@mode_io.on('connect')
def on_connect():
    print('[{}] connect'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    mode_io.emit('ask_cameraMODE')

@video_io.on('connect',namespace='/video_path')
def on_connect():
    print('[{}] videoconnect'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')))


@mode_io.on('catch_cameraMODE')
def on_catch_cameraMODE(mode):
    global cameraMODE
    cameraMODE=mode
    


@mode_io.on('disconnect')
def disconnect():
    print('[{}] disconnect'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S')))


@mode_io.on('cameraON')
def on_cameraON(mode):
    global cameraMODE
    print('get')
    cameraMODE='on'
    print('camera is ON')

@mode_io.on('cameraOFF')
def cameraOFF(mode):
    global cameraMODE
    print('get')
    cameraMODE='off'
    print('camera is OFF')


def send_video():
    global cameraMODE
    capture = cv2.VideoCapture(0)#環境による
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
    while True:
        if cameraMODE=='on':
            ret, frame = capture.read() # カメラから画像読みこみ
            if ret==False:print('Noneinfo')
            else:
                result, encimg = cv2.imencode('.jpg', frame, encode_param) #jpgに変換
                #print(base64.b64encode(encimg).decode('ascii'))
                video_data=base64.b64encode(encimg).decode('ascii')
                video_io.emit('video_catch',video_data,namespace='/video_path') # webbsocketでbase64に変換したjpg画像を送信 
        video_io.sleep(0.5)


if __name__=='__main__':
    mode_io.connect('http://127.0.0.1:8080',namespaces=['/'])
    video_io.connect('http://127.0.0.1:8080',namespaces=['/video_path'])
    video_io.start_background_task(target=send_video())




