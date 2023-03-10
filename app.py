
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
    return render_template('index.html')

# 2page
@app.route('/emoji/{id}')
def home():
    return render_template('emoji.html')

# 3page
@app.route('/neverword/{id}')
def home():
    return render_template('neverword.html')

# 4page
@app.route('/island/{id}')
def home():
    return render_template('island.html')


# 댓글 작성
@app.route("/emoji/posting", methods=["POST"])
def emoji_post():
    comment_receive = request.form['comment_give']
    name_receive = request.form["name_give"]
    try:
        idnum = db.reviews.find_one(sort=[("num", -1)])["num"] + 1
    except:
        idnum = 1
    doc = {
        'num' : idnum,
        'comment': comment_receive,
        'name' : name_receive,
    }
    db.reviews.insert_one(doc)
    return jsonify({'msg':'등록완료!'})

@app.route("/emoji/posting", methods=["GET"])
def review_get():
    review_list = list(db.reviews.find({}, {'_id': False}))
    return jsonify({'reviews': review_list})
# 삭제기능
@app.route("/emoji/delete", methods=["POST"])
def review_delete():
    num_receive = request.form['num_give']
    db.reviews.delete_one({'num': int(num_receive)})
    return jsonify({'msg': '삭제 완료!'})
# 수정기능
@app.route("/emoji/modify", methods=["POST"])
def review_modify():
    num_receive = request.form['num_give']
    comment_receive = request.form['comment_give']
    db.reviews.update_one({'num': int(num_receive)}, {'$set': {'comment': comment_receive}})
    return jsonify({'msg': '수정 완료!'})

@app.route("/review/postingByTitle", methods=["POST"])
def review_postingByTitle():
    name_receive = request.form['mbti_give']
    review_list = list(db.reviews.find({'name':name_receive}, {'_id': False}))
    return jsonify({'reviews': review_list})


# 4page


#댓글
@app.route('/emoji/{id}', methods=["GET"])
def rank1():
    name = request.args.get("mbti")
    print(name)

    selected_mbti = db.mbti.find_one({'mbti': {name}})
    mbti_list = list(db.mbti.find({}, {'_id': False}))

    mbti_name = [i['mbti'] for i in mbti_list]
    return render_template('emoji.html', selected_mbti = selected_mbti, mbti_name = mbti_name)

@app.route('/neverword/{id}', methods=["GET"])
def rank1():
    name = request.args.get("mbti")
    print(name)

    selected_mbti = db.mbti.find_one({'r_rate': f'No.{name}'})["title"]
    print(selected_mbti)
    mbti_list = list(db.mbti.find({}, {'_id': False}))

    mbti_name = [i['mbti'] for i in mbti_list]
    return render_template('emoji.html', selected_mbti = selected_mbti, mbti_name = mbti_name)

@app.route('/island/{id}', methods=["GET"])
def rank1():
    name = request.args.get("mbti")
    print(name)

    selected_mbti = db.mbti.find_one({'r_rate': f'No.{name}'})["title"]
    print(selected_mbti)
    mbti_list = list(db.mbti.find({}, {'_id': False}))

    mbti_name = [i['mbti'] for i in mbti_list]
    return render_template('emoji.html', selected_mbti = selected_mbti, mbti_name = mbti_name)


##회원가입


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
    return render_template('sign_up.html')

@app.route('/sign_up/save', methods=['POST'])
def sign_up_post():
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest() # password 해쉬화 함수
    doc = {
        "email": email_receive,  # 아이디
        "password": password_hash,  # 비밀번호
    }
    db.users.insert_one(doc)

    return jsonify({'result': 'success'})

@app.route("/sign_up/get", methods=['GET'])
def sign_up_get():
    id_list = list(db.users.find({}, {'_id': False}))
    return jsonify({'idLists': id_list})








if __name__ == '__main__':
    app.run('0.0.0.0', port=5001, debug=True)