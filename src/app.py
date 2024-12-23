import sys
import os
## なんかうまく読み込めない...
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import streamlit as st
from src.domain.LatLon import LatLon
from src.domain.Geohash import Geohash
from src.domain.Meshcode import Meshcode
from src.domain.CityMaster import CityMaster

def showGeohash():
    st.title('Geohash')

    st.header('LatLon -> Geohash')
    lat = st.text_input(label='lat', value='40.0')
    lon = st.text_input(label='lon', value='140.0')
    latLon = LatLon(lat, lon)
    geohash4 = Geohash.encode_from_lat_lon(latLon, 4)
    geohash5 = Geohash.encode_from_lat_lon(latLon, 5)
    geohash6 = Geohash.encode_from_lat_lon(latLon, 6)
    st.info(f'4次:   {geohash4.geohash}')
    st.info(f'5次:   {geohash5.geohash}')
    st.info(f'6次:   {geohash6.geohash}')

    st.header('Geohash -> LatLon Range')
    geohash_str = st.text_input(label='geohsh', value='xp5e')
    geohash_obj = Geohash(geohash_str)
    range = geohash_obj.decode_to_lat_lon()
    st.info(f'緯度 : {range["lat_min"]} ~ {range["lat_max"]}')
    st.info(f'経度 : {range["lon_min"]} ~ {range["lon_max"]}')



def showMeshcode():
    st.title('Meshcode')

    st.header('LatLon -> Meshcode')
    lat = st.text_input(label='lat', value='40.0')
    lon = st.text_input(label='lon', value='140.0')
    latLon = LatLon(lat, lon)
    meshcode4 = Meshcode.encode_from_lat_lon(latLon, 4)
    meshcode6 = Meshcode.encode_from_lat_lon(latLon, 6)
    meshcode8 = Meshcode.encode_from_lat_lon(latLon, 8)
    st.info(f'1次:   {meshcode4.meshcode}')
    st.info(f'2次:   {meshcode6.meshcode}')
    st.info(f'3次:   {meshcode8.meshcode}')

    st.header('Meshcode -> LatLon Range')
    meshcode_str = st.text_input(label='meshcode', value='6040')
    meshcode_obj = Meshcode(meshcode_str)
    range = meshcode_obj.decode_to_lat_lon()
    st.info(f'緯度 最小: {range["lat_min"]} 最大: {range["lat_max"]}')
    st.info(f'経度 最小: {range["lon_min"]} 最大: {range["lon_max"]}')

def showMap():
    st.title('Map')

    # 地図を描画する
    # 緯度経度を取る
    # lat = 40
    # lon = 140
    # latLon = LatLon(lat, lon)

def showCity():
    st.title('City')

    st.header('code -> name')
    st.text("コード2桁 or 5桁を入力")
    code = st.text_input(label='code', value='13101')
    name = CityMaster.code_to_name(code)
    st.info(f'地域名:   {name}')

    st.header('pref -> cityList')
    st.text("都道府県名 or 都道府県コード2桁を入力")
    pref = st.text_input(label='pref', value='13')
    list = CityMaster.get_list_in_pref(pref)
    list = list.reset_index(drop=True)
    st.table(list)


if __name__ == "__main__":

    contents = [
        "geohash",
        "meshcode",
        "map",
        "city"
    ]

    page = st.sidebar.selectbox('コンテンツを選択してください', contents)

    if page == "geohash":
        showGeohash()
    elif page == "meshcode":
        showMeshcode()
    elif page == "map":
        showMap()
    elif page == "city":
        showCity()
