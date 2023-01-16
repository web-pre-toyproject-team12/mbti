import requests
from bs4 import BeautifulSoup


from pymongo import MongoClient
client = MongoClient('mongodb+srv://test:sparta@cluster0.ygtjgst.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}


data = requests.get("https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95", headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
info = soup.select("#main-app > main > div.type-group.analysts > div > a")

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

#main-app > main > div.type-group.analysts > div > a:nth-child(1) > h5
#SE-0fa4e9da-54ef-4f5c-89ab-2df816cf5c5d
#SE-4497788b-edd5-43fd-8a15-719e432b8ca5
#SE-2fc80e3b-9f0a-475c-85e0-f89ed2109615 > a

#main-app > main > div.type-group.analysts > div > a:nth-child(1) > h4
#main-app > main > div.type-group.analysts > div > a:nth-child(1) > h4
#main-app > main > div.type-group.analysts > div > a:nth-child(1) > h5
#main-app > main > div.type-group.analysts > div > a:nth-child(1) > div.snippet

#main-app > main > div.type-group.analysts > div > a:nth-child(2) > h5