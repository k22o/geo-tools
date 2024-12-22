from src.domain.LatLon import LatLon;

class Meshcode:

    def __init__(self, meshcode):
        self.meshcode = meshcode

    @classmethod
    def encode_from_lat_lon(cls, latLon:LatLon, digit=4):
        if digit == 4:
            return cls.__calculate_primary_meshcode(cls, latLon.lat, latLon.lon)
        elif digit == 6:
            return cls.__calculate_secondary_meshcode(cls, latLon.lat, latLon.lon)
        elif digit == 8:
            return cls.__calculate_tertiary_meshcode(cls, latLon.lat, latLon.lon)
        else:
            raise ValueError("digit is invalid")

    def __calculate_primary_meshcode(self, lat, lon):
        lat_div = int(float(lat) * 1.5)  # Divide latitude by 1/1.5 (or multiply by 1.5)
        lon_div = int(float(lon) - 100)  # Subtract 100 from longitude
        return Meshcode(f"{lat_div:02d}{lon_div:02d}")

    def __calculate_secondary_meshcode(self, lat, lon):
        primary_mesh = self.__calculate_primary_meshcode(self, lat, lon)
        lat_remainder = (float(lat) * 1.5) % 1 * 8  # Split into 8 parts
        lon_remainder = (float(lon) - 100) % 1 * 8  # Split into 8 parts
        lat_code = int(lat_remainder)
        lon_code = int(lon_remainder)
        return Meshcode(f"{primary_mesh.meshcode}{lat_code}{lon_code}")

    def __calculate_tertiary_meshcode(self, lat, lon):
        secondary_mesh = self.__calculate_secondary_meshcode(self, lat, lon)
        lat_remainder = ((float(lat) * 1.5) % 1 * 8) % 1 * 10
        lon_remainder = ((float(lon) - 100) % 1 * 8) % 1 * 10
        lat_code = int(lat_remainder)
        lon_code = int(lon_remainder)
        return Meshcode(f"{secondary_mesh.meshcode}{lat_code}{lon_code}")


    def decode_to_lat_lon(self):
        if not self.meshcode:
            raise ValueError("Meshcode must be provided for decoding.")

        # Decode primary meshcode
        lat_div = int(self.meshcode[:2])
        lon_div = int(self.meshcode[2:4])

        lat_min = lat_div / 1.5
        lat_max = (lat_div + 1) / 1.5

        lon_min = lon_div + 100
        lon_max = lon_div + 101

        # Decode secondary meshcode (if present)
        if len(self.meshcode) >= 6:
            lat_code = int(self.meshcode[4])
            lon_code = int(self.meshcode[5])

            lat_min += lat_code / 8 / 1.5
            lat_max = lat_min + 1 / 8 / 1.5

            lon_min += lon_code / 8
            lon_max = lon_min + 1 / 8

        # Decode tertiary meshcode (if present)
        if len(self.meshcode) == 8:
            lat_code = int(self.meshcode[6])
            lon_code = int(self.meshcode[7])

            lat_min += lat_code / 80 / 1.5
            lat_max = lat_min + 1 / 80 / 1.5

            lon_min += lon_code / 80
            lon_max = lon_min + 1 / 80

        return {
            "lat_min": lat_min,
            "lat_max": lat_max,
            "lon_min": lon_min,
            "lon_max": lon_max
        }