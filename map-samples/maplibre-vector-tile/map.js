// タイルのURLはhttpから始まるフルパスである必要があるため、http~~/index.htmlのhttp://~~までを取得する
const path = location.href.replace('/index.html', '');
const vectortileUrl = `${path}/tiles/{z}/{x}/{y}.pbf`;

const map = new maplibregl.Map({
    container: 'map',
    center: [137.1, 36.5],
    zoom: 4,
    style: {
        version: 8,
        sources: {
            osm: {
                type: 'raster',
                tiles: [
                    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                ],
                maxzoom: 19,
                tileSize: 256,
                attribution:
                    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            },
            admin: {
                type: 'vector',
                tiles: [vectortileUrl],
                maxzoom: 8,
                attribution:
                    '<a href="https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N03-v3_1.html">国土数値情報 - 行政区域データ</a>',
            },
        },
        layers: [
            {
                id: 'osm-layer',
                source: 'osm',
                type: 'raster',
            },
            {
                id: 'admin-layer',
                source: 'admin',
                'source-layer': 'admin', // ベクトルタイル内のレイヤー名を指定する
                type: 'fill',
                paint: {
                    'fill-color': '#fa0',
                    'fill-opacity': 0.5,
                    'fill-outline-color': '#00f',
                },
            },
        ],
    },
});

// クリック地点の地物の情報を取得する処理
map.on('click', (e) => {
    // "admin-layer"から、クリック地点にある地物全てを取得する
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['admin-layer'],
    });
    if (features.length === 0) return; // クリック地点に地物が存在しない場合は処理を終了

    const feature = features[0];
    alert(
        `${feature.properties.N03_007}: ${feature.properties.N03_001}${feature.properties.N03_004}`,
    );
});