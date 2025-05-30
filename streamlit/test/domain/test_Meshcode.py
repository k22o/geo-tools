import unittest
from src.domain.Meshcode import Meshcode
from src.domain.LatLon import LatLon

class MeshcodeTest(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_init_fail(self):
        with self.assertRaises(ValueError):
            Meshcode("123")        

    def test_encode_from_lat_lon_first(self):
        lat = 40.0
        lon = 140.0
        latLon = LatLon(lat, lon, 5)
        result = Meshcode.encode_from_lat_lon(latLon, 4)
        self.assertEqual("6040", result.meshcode)

    def test_encode_from_lat_lon_second(self):
        lat = 40.0
        lon = 140.0
        latLon = LatLon(lat, lon, 5)
        result = Meshcode.encode_from_lat_lon(latLon, 6)
        self.assertEqual("604000", result.meshcode)

    def test_encode_from_lat_lon_third(self):
        lat = 40.0
        lon = 140.0
        latLon = LatLon(lat, lon, 5)
        result = Meshcode.encode_from_lat_lon(latLon, 8)
        self.assertEqual("60400000", result.meshcode)

if __name__ == "__main__":
    unittest.main()