class LatLon:

    LAT_RANGE = [-90, 90]
    LON_RANGE = [-180, 180]

    def __init__(self, lat, lon, digit=3):
        self._digit = int(digit)
        self.__setLat(float(lat))
        self.__setLon(float(lon))

    @property
    def lat(self) -> float:
        return self._lat
    
    @property
    def lon(self) -> float:
        return self._lon

    def __format(self, value: float):
        return f'{value:.{self._digit}f}'
    
    def __setLat(self, lat: float):
        if (self.LAT_RANGE[0] > lat or self.LAT_RANGE[1] < lat):
            raise ValueError("lat is invalid")
        self._lat = self.__format(lat)

    def __setLon(self, lon: float):
        if (self.LON_RANGE[0] > lon or self.LON_RANGE[1] < lon):
            raise ValueError("lon is invalid")
        self._lon = self.__format(lon)

