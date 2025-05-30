
// 地図インスタンスの初期化
const map = L.map('map', {
    center: [36.5, 137.1], // lat, lon
    zoom: 7 // zoom level
})

// ---------------------------------------------- //

// 地図タイルの作成
// 複数レイヤーの管理
const baseLayers = {
    OpenStreetMaps: L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // OSMのURLテンプレート
        {
            maxZoom: 19,
            attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    地理院: L.tileLayer(
        'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', // OSMのURLテンプレート
        {
            maxZoom: 18,
            attribution:
            '&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">地理院タイル</a>'
        }
    )
    
}

// デフォルトのマップの設定
map.addLayer(baseLayers['OpenStreetMaps']);

// 切り替え用のボタンの設置
const layersControl = L.control
                .layers(baseLayers, [], {collapsed: false})
                .addTo(map);

// ---------------------------------------------- //

// POIを追加
L.marker([35, 135])
.bindPopup("popup")
.addTo(map);

// 線の追加
L.polyline([
    [35, 138],
    [36, 138],
    [37, 137]
], {color: 'blue'})
.addTo(map);

// 面の追加
L.polygon([
    [37, 138],
    [37, 139],
    [38, 139],
    [38, 138]
])
.addTo(map);

// ラスターデータの追加
L.imageOverlay(
    "../data/mtfuji.jpg",
    [[35.29061, 138.62129],[35.42997, 138.84260]],
    {opcaity: 0.7}
)
.addTo(map);
