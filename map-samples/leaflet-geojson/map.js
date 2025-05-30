
// 地図インスタンスの初期化
const map = L.map('map', {
    center: [35.8, 139.5], // lat, lon
    zoom: 10 // zoom level
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


////////////////////////////

const weightDict = {1: 10, 2: 7, 3: 4, 4: 4, 5: 4};
const colorDict = {1:"green", 2:"blue", 3:"red", 4:"orange", 5:"purple"};


fetch('/N02-21_RailroadSection.geojson')
    .then((res) => res.json())
    .then((json) => {
        const line = L.geoJSON(json, {
            style: (feature) => ({
                weight: weightDict[feature.properties.N02_002],
                color: colorDict[feature.properties.N02_002]
            })
        })
        .bindPopup((layer) => 
            layer.feature.properties.N02_004 + '<br />' + layer.feature.properties.N02_003)
        .addTo(map);

        // レイヤ切り替えコントロールに、オーバーレイを追加する
        // これがないと常時表示になる
        layersControl.addOverlay(line, "鉄道データ");
    })