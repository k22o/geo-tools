# PMTiles

## コマンド

### vector形式: geojsonからPMTilesを作成

tippecanoe公式の配信しているpmtilesのコマンドもあるが、tippecanoeのコマンドも使える。

```bash
tippecanoe -o output.pmtiles -Z 0 -z 16 ../data/line.geojson ../data/polygon.geojson
```
