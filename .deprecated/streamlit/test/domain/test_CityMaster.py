import unittest
from src.domain.CityMaster import CityMaster

class CityMasterTest(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_code_to_name(self):

        self.assertEqual("東京都", CityMaster.code_to_name("13"))
        self.assertEqual("東京都千代田区", CityMaster.code_to_name("13101"))
        self.assertEqual("該当がありません", CityMaster.code_to_name("139"))
        

if __name__ == "__main__":
    unittest.main()