# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.ygtjgst.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.mbti

 
# 1page1
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

# 댓글 조회
# @app.route("/emoji/{id}", methods=["POST"])
# def emoji_get():
#     MBTI_receive = request.form['MBTI_give']
#     MBTI_comments = list(db.mbti.find({'id': MBTI_receive}, {'_id': False}))
#     print(MBTI_receive)
#     return jsonify({'msg': MBTI_comments})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)