# GDAL

GDALのいくつかのサンプル


- データ取得
- データの単純化
- ファイル形式の変換

## サンプルコード

### ラスターデータ

``` bash
# データの情報を取得
$ gdalinfo ../tileset/data/raster.tif

# データ形式の変換
gdal_translate ../data/raster.tif raster.png
```

※ ラスタータイルの作成方法は、[tileset](../tileset/) を参照

### ベクターデータ

``` bash
# データ形式の変換
$ ogr2ogr -f "SQLite" vector.sqlite ../tileset/data/line.geojson

# データの単純化
$ ogr2ogr -f GeoJSON output_simplify.geojson ../tileset/data/line.geojson -simplify 0.001

```
