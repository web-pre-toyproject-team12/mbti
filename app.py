import jwt, datetime, hashlib, certifi

from flask import Flask, render_template, request, jsonify, url_for, redirect
app = Flask(__name__)

from pymongo import MongoClient
from datetime import datetime, timedelta

import certifi


ca = certifi.where();

client = MongoClient('mongodb+srv://test:sparta@cluster0.ygtjgst.mongodb.net/Cluster0?retryWrites=true&w=majority',
    tlsCAFile=ca)
db = client.dbsparta

SECRET_KEY = 'SPARTA'

@app.route('/')
def home():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.users.find_one({"id": payload['id']})
        return render_template('index.html', user_info=user_info)
    except jwt.ExpiredSignatureError:
        return redirect(url_for('login', msg='로그인 시간이 만료되었습니다.'))
    except jwt.exceptions.DecodeError:
        return redirect(url_for('login', msg='로그인 정보가 존재하지 않습니다.'))



@app.route('/login')
def login():
    msg = request.args.get('msg')
    return render_template('index.html', msg=msg)


@app.route("/sign_in", methods=["POST"])
def login_done():
    email_receive = request.form['email_give']
    pw_receive = request.form['pw_give']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()
    result = db.users.find_one({'username': email_receive, 'password': pw_hash})   
    
    if result is not None:
        payload = {'id': email_receive, 'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)}
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({'result': 'success', 'token': token, 'msg': '로그인 성공!'})
    else:
        return jsonify({'result': 'fail', 'msg': '아이디 또는 비밀번호가 일치하지 않습니다.'})



#회원가입
@app.route('/sign_up/save', methods=['POST'])
def sign_up():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    nickname_receive = request.form['nickname_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest() # password 해쉬화 함수
    doc = {
        "username": username_receive,  # 아이디
        "password": password_hash,  # 비밀번호
    }
    db.users.insert_one(doc) 
    return jsonify({'result': 'success'})



# 이모지 페이지
@app.route('/emoji')
def web_emoji():
    return render_template('emoji.html')







if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)