const map = new maplibregl.Map({
    container: 'map',
    center: [137.1, 36.5],
    zoom: 4,

    // 初期表示する地図デザインをstyleと呼ぶ
    // 動的に変化する部分は、styleに設定はしない
    style: {
        version: 8,
        // sources: データ元
        sources: {
            osm: {
                type: 'raster', // ラスタータイル
                tiles: [
                    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                ],
                tileSize: 256, // タイルの解像度, デフォルトは512
                maxzoom: 18,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
            line: {
                type: 'geojson',
                data: '../data/N02-21_RailroadSection.geojson',
                attribution:
                    '<a href="https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-v3_0.html">国土数値情報 - 鉄道データ</a>',
            },
        },
        // layers: sourcesで設定したデータを表示するための層
        layers: [
            {
                id: 'osm-layer',
                source: 'osm', // 使うデータをsourcesのkeyで指定する
                type: 'raster', // データをどのように表示するか指定する
            },
            {
                id: 'polygon-layer',
                source: 'polygon',
                type: 'fill',
                paint: {
                    // Leafletの場合と同じような色表現とするための設定
                    'fill-color': [
                        'rgba',
                        255,
                        0,
                        0,
                        [
                            'min',
                            1,
                            [
                                '/',
                                [
                                    '/',
                                    ['get', '人口'],
                                    ['get', '面積'],
                                ],
                                20000,
                            ],
                        ],
                    ],
                },
            },
            {
                id: 'line-layer',
                source: 'line',
                type: 'line',
                paint: {
                    'line-color': [
                        'case',
                        ['==', ['get', 'N02_002'], '1'], 'green',
                        ['==', ['get', 'N02_002'], '2'], '#00f', // blue
                        ['==', ['get', 'N02_002'], '3'], '#ff0000', // red
                        ['==', ['get', 'N02_002'], '4'], '#ffaa00', // orange
                        ['==', ['get', 'N02_002'], '5'], '#aa00ff', // purple
                        '#000000',
                    ],
                    'line-width': [
                        'case',
                        ['==', ['get', 'N02_002'], '1'], 10,
                        ['==', ['get', 'N02_002'], '2'], 7,
                        ['==', ['get', 'N02_002'], '3'], 4,
                        ['==', ['get', 'N02_002'], '4'], 4,
                        ['==', ['get', 'N02_002'], '5'], 4,
                        0,
                    ],
                },
                layout: {
                    'line-cap': 'round',
                },
            },
        ],
    },
});