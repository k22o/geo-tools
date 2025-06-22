# MBTiles

## コマンド

### vector形式: geojsonからMBTilesを作成

オプションはいろいろあるので、公式ドキュメントを参照する。

```bash
tippecanoe -o output_vector.mbtiles -Z 0 -z 16 ../data/line.geojson ../data/polygon.geojson
```

レイヤーを別々に保存する。

```bash
tippecanoe -o mbtiles/output_vector_layers.mbtiles -Z 0 -z 16 --layer=line data/line.geojson --layer=polygon data/polygon.geojson
```
