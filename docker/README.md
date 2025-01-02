# docker用設定

## 概要

- このアプリケーションを動かすための設定ではない
- GISに使えそうなソフトウェアをなんとなく全て放り込むためのもの

## 想定CLI

- gdalInfo
- ogr2ogr
- tippecanoe
- wgrib2

## 使い方

以下のコマンドで、docker-imageをビルドする

```
$ docker build . -t gis-image
```

以下のコマンドでdockerコンテナを起動する
```
docker container run -it --rm my-python-app
```

