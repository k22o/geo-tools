# Mapshaper

Mapshaperは、ベクターデータを操作するためのツール (のはず...)

## install方法

``` bash
npm install -g mapshaper
```

## サンプルコード

``` bash
# データの情報を取得
mapshaper ../tileset/data/line.geojson -info

# topojsonに変換
mapshaper ../tileset/data/line.geojson -o format=topojson
```
