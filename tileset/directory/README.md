# ディレクトリ型

## コマンド

### vector形式: geojsonからベクタータイルセットを作成

サンプルのため、0~2のズームレベルで作成している。

```bash
tippecanoe -e ./vector-tiles -Z 0 -z 2 -pC ../data/line.geojson ../data/polygon.geojson
```
