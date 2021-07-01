from bs4 import BeautifulSoup
import requests

def get_current_price (code) :
    url = "http://finance.naver.com/item/sise.nhn?code={}".format(code)
    html = BeautifulSoup(requests.get(url,
                headers={'User-agent': 'Mozilla/5.0'}).text, "lxml")
    current_price_text = html.find('strong', id="_nowVal").text
    current_price_text = current_price_text.replace(",", "")

    return int(current_price_text)
