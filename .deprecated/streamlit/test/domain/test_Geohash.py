import unittest
from src.domain.Geohash import Geohash
from src.domain.LatLon import LatLon

class GeohashTest(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_encode_from_lat_lon(self):

        lat = 40.0
        lon = 140.0
        latLon = LatLon(lat, lon, 5)
        result = Geohash.encode_from_lat_lon(latLon, 5)
        self.assertEqual("xp5e9", result.geohash)

if __name__ == "__main__":
    unittest.main()