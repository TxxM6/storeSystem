from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit
import json
import myserverfunc as MSF

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

# cors_allowed_originは本来適切に設定するべき
socketio = SocketIO(app, cors_allowed_origins='*')


# ユーザー数
user_count = 0
# 現在のテキスト
text = ""

global cameraMODE
cameraMODE='off'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/command')
def command_page():
    return render_template('commander.html')

@app.route('/camera')
def camera_page():
    return render_template('camera.html')

'''NameSpace
'video_path':camera(multi).py  =>  camera.htmlまで

'ec_path':ReactのECアプリ & command.html
'''



# ユーザーが新しく接続すると実行
@socketio.on('connect')
def connect(auth):
    global user_count, text
    user_count += 1
    # 接続者数の更新（全員向け）
    emit('count_update', {'user_count': user_count}, broadcast=True)
    # テキストエリアの更新
    #emit('text_update', {'text': text})

    emit('addText',{'newText':'サーバーと繋がりました'})




# ユーザーの接続が切断すると実行
@socketio.on('disconnect')
def disconnect():
    global user_count
    user_count -= 1
    # 接続者数の更新（全員向け）
    emit('count_update', {'user_count': user_count}, broadcast=True)

''''''

# テキストエリアが変更されたときに実行
@socketio.on('text_update_request')
def text_update_request(json):
    global text
    text = json["text"]
    # 変更をリクエストした人以外に向けて送信する
    # 全員向けに送信すると入力の途中でテキストエリアが変更されて日本語入力がうまくできない
    emit('text_update', {'text': text}, broadcast=True, include_self=False)

#メッセージ
@socketio.on('sendM')
def sendM(msg):
    emit('addText',f'fromM:{msg}')
    emit('changeWaitMessenger',{'newState':True})

#コマンド
@socketio.on('catch_command')
def catch_command(command):
    print(command)
    emit('addText',{'newText':f'fromM:{command}'})
    #emit('changeWaitMessenger',{'newState':True})


#==================(カメラ)===========================================
# video_path
@socketio.on('connect',namespace='/video_path')
def connect(auth):
    # 接続者数の更新（全員向け）

    # テキストエリアの更新
    #emit('text_update', {'text': text})

    emit('addText',{'newText':'サーバーと繋がりました'})

#カメラクライアントたちの起動時(状態の確認)
@socketio.on('ask_cameraMODE')
def ask_cameraMODE():
    print('asked')
    global cameraMODE
    emit('catch_cameraMODE',cameraMODE)

#カメラモード-スイッチ
@socketio.on('camera_switch')
def camera_switch(mode):
    global cameraMODE
    cameraMODE=mode

    emit('checkV','',broadcast=True)

    if cameraMODE=='on':
        print('switchon')
        emit('cameraON',cameraMODE,broadcast=True)
        
    else:
        print('switchoff')
        emit('cameraOFF',cameraMODE,broadcast=True)
        

#カメラ映像(写真)の転送
@socketio.on('video_catch',namespace='/video_path')
def video_catch(data):
    emit('recieve_video',data, broadcast=True, include_self=False)
    #emit('checkV','_')


#=====================================================================

#name_splace
@socketio.on('get_under',namespace='/under')
def camera_catchget_under(data):
    emit('send_under','welcome', broadcast=True)
    print('send under')


#======================(EC)=====================================
@socketio.on('req_DB',namespace='/ec_path')
def req_DB():
    my_query=MSF.get_DB()
    emit('recieve_DB',my_query)
    #print(my_query)
    #print('query_send')

@socketio.on('EC_setM',namespace='/ec_path')
def EC_setM(pname):
    emit('ECsetM',pname, broadcast=True)
    emit('flash', broadcast=True)

    #print(f'modal send:{pname}')

@socketio.on('EC_yesM',namespace='/ec_path')
def EC_yesM():
    emit('ECyesM',broadcast=True)
    emit('flash', broadcast=True)

@socketio.on('EC_noM',namespace='/ec_path')
def EC_noM():
    emit('ECnoM',broadcast=True)
    emit('flash', broadcast=True)

@socketio.on('EC_numM',namespace='/ec_path')
def EC_numM(num):
    emit('ECnumM',num,broadcast=True)
    emit('flash', broadcast=True)
    #print(f'modal 個数:{num}')

@socketio.on('EC_plusM',namespace='/ec_path')
def EC_numM():
    emit('ECplusM',broadcast=True)
    emit('flash', broadcast=True)
    print('+')

@socketio.on('EC_minusM',namespace='/ec_path')
def EC_numM():
    emit('ECminusM',broadcast=True)
    emit('flash', broadcast=True)
    print('-')







if __name__ == '__main__':
    # 本番環境ではeventletやgeventを使うらしいが簡単のためデフォルトの開発用サーバーを使う
    my_query=MSF.get_DB()
    socketio.run(app,port=8080,debug=True)#host='127.0.0.1'