import pandas as pd
import os

OUTPUT_FILE_NAME = "./cityMaster.csv"

KEY_PREF_CODE = "prefCode"
KEY_PREF_NAME = "prefName"
KEY_CITY_CODE = "cityCode"
KEY_CITY_NAME = "cityName"
KEY_DESIGNATED = "designatedFlag"

INDEX_NORMAL_CITY = 0
INDEX_DESIGNATED_PARENT = 1
INDEX_DESIGNATED_CHILD = 2


def formatCityCode(code):
    tmp1 = str(code)[0:-1] #末尾1桁は不要なので削除
    return tmp1.zfill(5) #0 padding

def convertExcelSheetData(file_name, idx):
    df = pd.read_excel(file_name, sheet_name=idx)

    # 市区町村コードを生成
    df[KEY_CITY_CODE] = df["団体コード"].apply(formatCityCode)
    # 都道府県コードを生成
    df[KEY_PREF_CODE] = df[KEY_CITY_CODE].apply(lambda x: str(x)[0:2])
    # 必要部分だけ抽出
    result = df[[KEY_PREF_CODE, "都道府県名\n（漢字）", KEY_CITY_CODE, "市区町村名\n（漢字）"]]
    # 名称を変更
    result.columns = [KEY_PREF_CODE, KEY_PREF_NAME, KEY_CITY_CODE, KEY_CITY_NAME]
    # いらないデータを削除
    return result[result[KEY_CITY_NAME].notna()]


if __name__ == "__main__":

    #### ファイルの検出
    current_dir = os.getcwd()
    xlsx_files = [f for f in os.listdir(current_dir) if f.endswith('.xlsx')]
    file_name = xlsx_files[0]

    #### ベースとなる、政令指定都市の子以外のデータを作成
    result1 = convertExcelSheetData(file_name, 0)
    # ひとまず、すべて0で設定しておく
    result1[KEY_DESIGNATED] = INDEX_NORMAL_CITY

    #### 政令市のデータを作成
    result2 = convertExcelSheetData(file_name, 1)
    # ひとまず、すべて２を設定しておく
    result2[KEY_DESIGNATED] = INDEX_DESIGNATED_CHILD

    #### result1とresult2の共通部分として政令市の親コードを特定する
    parent_city_codes = result1[result1[KEY_CITY_CODE].isin(result2[KEY_CITY_CODE])][KEY_CITY_CODE]
    # result1から政令市の親を削除する
    result1 = result1[~result1[KEY_CITY_CODE].isin(parent_city_codes)]
    # result2で、政令市の親には1を設定する
    result2.loc[result2[KEY_CITY_CODE].isin(parent_city_codes), KEY_DESIGNATED] = INDEX_DESIGNATED_PARENT

    # データを結合して、cityCodeでソート
    total_result = pd.concat([result1, result2]).sort_values(by=KEY_CITY_CODE)
    total_result.to_csv(OUTPUT_FILE_NAME, index=False)
