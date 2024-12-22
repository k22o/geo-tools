from src.domain.LatLon import LatLon;

class Geohash:

    _BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz"

    def __init__(self, geohash):
        self.geohash = geohash

    # chatGPTから
    # python-geohashは10年以上更新がなくてうーんという感じなので
    @classmethod
    def encode_from_lat_lon(cls, latLon:LatLon, precision=5):

        lat_range = (-90.0, 90.0)
        lon_range = (-180.0, 180.0)
        latitude = float(latLon.lat)
        longitude = float(latLon.lon)

        hash_string = []
        is_even = True
        bit = 0
        char_index = 0

        while len(hash_string) < precision:
            if is_even:
                mid = (lon_range[0] + lon_range[1]) / 2
                if longitude > mid:
                    char_index = (char_index << 1) | 1
                    lon_range = (mid, lon_range[1])
                else:
                    char_index = (char_index << 1)
                    lon_range = (lon_range[0], mid)
            else:
                mid = (lat_range[0] + lat_range[1]) / 2
                if latitude > mid:
                    char_index = (char_index << 1) | 1
                    lat_range = (mid, lat_range[1])
                else:
                    char_index = (char_index << 1)
                    lat_range = (lat_range[0], mid)

            is_even = not is_even
            bit += 1

            if bit == 5:
                # Append the corresponding base32 character
                hash_string.append(cls._BASE32[char_index])
                bit = 0
                char_index = 0

        return Geohash(''.join(hash_string))



    def decode_to_lat_lon(self):
        lat_range = [-90.0, 90.0]
        lon_range = [-180.0, 180.0]
        is_even = True

        for char in self.geohash:
            bits = self._BASE32.index(char)
            for i in range(4, -1, -1):
                bit = (bits >> i) & 1
                if is_even:
                    mid = (lon_range[0] + lon_range[1]) / 2
                    if bit == 1:
                        lon_range[0] = mid
                    else:
                        lon_range[1] = mid
                else:
                    mid = (lat_range[0] + lat_range[1]) / 2
                    if bit == 1:
                        lat_range[0] = mid
                    else:
                        lat_range[1] = mid
                is_even = not is_even

        return {
            "lat_min": lat_range[0],
            "lat_max": lat_range[1],
            "lon_min": lon_range[0],
            "lon_max": lon_range[1]
        }