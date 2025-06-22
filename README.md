# geo-tools

地理情報を取り扱うためのコード群

## コンテンツ

- docker: 地理データを扱うためのdockerイメージを作る
- master: 地理データのマスタを作る
- streamlit: 地理データを扱うためのストリームレットアプリを作る
- map-samples: 地図描画のサンプル
- tileset: タイルセットを作る
- gdal: TODO gdalのコマンド、変更になったかも
- tools: いろいろ計算する用のUIツール
  - [geohash変換ツール](./tools/geohash/index.html)
  - [メッシュコード変換ツール](./tools/meshcode/index.html)
  - [市区町村マスタ](./tools/city-master/index.html)
## よく使うソフトウェア

- leaflet
  - シンプルな使い方ができる
- maplibre gljs
  - mapboxからフォークされて進化してきたもの
  - webGLベースで、重いデータでも高速に動作する
- QJIS
- Gdal
- mapshaper
