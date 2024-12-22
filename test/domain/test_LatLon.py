import unittest

from src.domain.LatLon import LatLon

class LatLonTest(unittest.TestCase):
    def set_up(self):
        pass

    def tear_down(self):
        pass

    def test_指定した桁数に変換する(self):
        target = LatLon(12.3456, 123.456)
        self.assertEqual(12.346, float(target.lat))
        self.assertEqual(123.456, float(target.lon))

        target = LatLon(12.3456, "123.456", 1)
        self.assertEqual(12.3, float(target.lat))
        self.assertEqual(123.5, float(target.lon))

    def test_latが範囲外の場合はエラー(self):
        with self.assertRaises(ValueError):
            LatLon(90.1, 123.456)        
        with self.assertRaises(ValueError):
            LatLon(-90.1, 123.456)        

    def test_lonが範囲外の場合はエラー(self):
        with self.assertRaises(ValueError):
            LatLon(10.1, 180.1)        
        with self.assertRaises(ValueError):
            LatLon(10.1, -180.1)        

if __name__ == "__main__":
    unittest.main()