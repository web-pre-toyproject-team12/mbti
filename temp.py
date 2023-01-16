import requests
from bs4 import BeautifulSoup


from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.ygtjgst.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


data = requests.get("http://www.cgv.co.kr/movies/?lt=1&ft=0", headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
info = soup.select("#contents > div.wrap-movie-chart > div.sect-movie-chart > ol > li ")

for mbti_info in info:
        mbti = mbti_info.select_one()
        image = mbti_info.select_one("div.box-image > a > span > img")["src"]
        name = mbti_info.select_one("div.box-contents > a > strong").text.strip()
        keyword = mbti_info.select_one("div.box-contents > span.txt-info > strong").text.strip()
        desc1 = mbti_info.select_one("div.box-image > strong").text.strip()
        desc2 = mbti_info.select_one("div.box-image > strong").text.strip()

        doc = {
                "mbti": mbti,
                "img": image,
                "name": name,
                "keyword": keyword,
                "desc1": desc1,
                "desc2": desc2,
        }

        db.mbti.insert_one(doc)
