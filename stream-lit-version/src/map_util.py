import folium
from streamlit_folium import st_folium

def create_polygon_data(range):
    lat_max = range["lat_max"]
    lat_min = range["lat_min"]
    lon_max = range["lon_max"]
    lon_min = range["lon_min"]
    return [
        [lat_min, lon_min],
        [lat_min, lon_max],
        [lat_max, lon_max],
        [lat_max, lon_min],
    ]

def plot_point(latLon, ranges=None, map=None):
    if map is None:
        map = folium.Map(location=[latLon.lat, latLon.lon], zoom_start=10)
    folium.Marker(location=[latLon.lat, latLon.lon]).add_to(map)
    colors = ["red", "blue", "green"]
    if ranges != None:
        for i in range(len(ranges)):
            folium.Polygon(locations=create_polygon_data(ranges[i]), color=colors[i], weight=2, fill=True, fill_opacity=0.1).add_to(map)
    map_data = st_folium(map, width=725, height=200)

def plot_area(range, map=None):
    center_lat = (range["lat_min"] + range["lat_max"])/2
    center_lon = (range["lon_min"] + range["lon_max"])/2
    if map is None:
        map = folium.Map(location=[center_lat, center_lon], zoom_start=10)
    folium.Polygon(locations=create_polygon_data(range), color="red", weight=2, fill=True, fill_opacity=0.1).add_to(map)
    map_data = st_folium(map, width=725, height=200)