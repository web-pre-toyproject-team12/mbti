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
@app.route('/emoji/{id}')
def home():
    return render_template('naverword.html')

# 4page
@app.route('/emoji/{id}')
def home():
    return render_template('island.html')


# 댓글 작성
@app.route("/emoji/{id}", methods=["POST"])
def emoji_post():
    text_receive = request.form['text_give']

    doc = {
        'text': text_receive,
    }
    db.mbti.insert_one(doc)
    return jsonify({'msg':'작성완료!'})


# 댓글 조회
@app.route("/emoji/{id}", methods=["POST"])
def emoji_get():
    MBTI_receive = request.form['MBTI_give']
    MBTI_comments = list(db.mbti.find({'id': MBTI_receive}, {'_id': False}))
    print(MBTI_receive)
    return jsonify({'msg': MBTI_comments})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)