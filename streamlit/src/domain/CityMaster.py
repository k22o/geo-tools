import os
import pandas as pd

class CityMaster:

    ## pandasの形でcsvを保存しておく
    _file_name = os.path.join(os.path.join(os.path.dirname(__file__), '../../../master/city/'), 'cityMaster.csv')
    _master = pd.read_csv(_file_name, dtype={'prefCode': str, 'cityCode': str})
    
    @classmethod
    def code_to_name(cls, code):

        result = "該当がありません"

        data = cls._master[cls._master['cityCode'] == code]
        if not data.empty:
            result = data.iloc[0]["prefName"] + data.iloc[0]["cityName"]

        data = cls._master[cls._master['prefCode'] == code]
        if not data.empty:
            result = data.iloc[0]["prefName"]

        return result
    
    
    @classmethod
    def get_list_in_pref(cls, pref):

        result = None

        data = cls._master[cls._master['prefCode'] == pref]
        if not data.empty:
            return data.loc[:, ["cityCode", "cityName"]]

        data = cls._master[cls._master['prefName'] == pref]
        if not data.empty:
            return data.loc[:, ["cityCode", "cityName"]]

        return result
