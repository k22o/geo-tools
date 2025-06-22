const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

function convertToGeohashFromLatLon() {
    const lat = parseFloat(document.getElementById('geohash-latitude').value);
    const lng = parseFloat(document.getElementById('geohash-longitude').value);
    const precision = parseInt(document.getElementById('geohash-precision').value);
    
    if (isNaN(lat) || isNaN(lng)) {
        showResult('緯度と経度を入力してください。');
        return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        showResult('緯度は-90から90の間、経度は-180から180の間で入力してください。');
        return;
    }

    const geohash = encodeGeohash(lat, lng, precision);
    showResult(`GeoHash: ${geohash}`);
}

function convertToLatLngFromGeohash() {
    const geohash = document.getElementById('geohash').value.trim();    
    if (!geohash) {
        showResult('GeoHashを入力してください。');
        return;
    }

    try {
        const result = decodeGeohash(geohash);
        const message = `\n緯度: ${result.lat_min.toFixed(6)} 〜 ${result.lat_max.toFixed(6)}\n経度: ${result.lon_min.toFixed(6)} 〜 ${result.lon_max.toFixed(6)}`;
        showResult(message);
    } catch (e) {
        showResult('無効なGeoHashです。');
    }
}

function encodeGeohash(latitude, longitude, precision = 5) {
    let latRange = [-90.0, 90.0];
    let lonRange = [-180.0, 180.0];
    let isEven = true;
    let bit = 0;
    let charIndex = 0;
    let hashString = [];

    while (hashString.length < precision) {
        if (isEven) {
            const mid = (lonRange[0] + lonRange[1]) / 2;
            if (longitude > mid) {
                charIndex = (charIndex << 1) | 1;
                lonRange[0] = mid;
            } else {
                charIndex = (charIndex << 1);
                lonRange[1] = mid;
            }
        } else {
            const mid = (latRange[0] + latRange[1]) / 2;
            if (latitude > mid) {
                charIndex = (charIndex << 1) | 1;
                latRange[0] = mid;
            } else {
                charIndex = (charIndex << 1);
                latRange[1] = mid;
            }
        }

        isEven = !isEven;
        bit++;

        if (bit === 5) {
            hashString.push(BASE32[charIndex]);
            bit = 0;
            charIndex = 0;
        }
    }

    return hashString.join('');
}

function decodeGeohash(geohash) {
    let latRange = [-90.0, 90.0];
    let lonRange = [-180.0, 180.0];
    let isEven = true;

    for (const char of geohash) {
        const bits = BASE32.indexOf(char.toLowerCase());
        if (bits === -1) throw new Error('Invalid geohash');

        for (let i = 4; i >= 0; i--) {
            const bit = (bits >> i) & 1;
            if (isEven) {
                const mid = (lonRange[0] + lonRange[1]) / 2;
                if (bit === 1) {
                    lonRange[0] = mid;
                } else {
                    lonRange[1] = mid;
                }
            } else {
                const mid = (latRange[0] + latRange[1]) / 2;
                if (bit === 1) {
                    latRange[0] = mid;
                } else {
                    latRange[1] = mid;
                }
            }
            isEven = !isEven;
        }
    }

    return {
        lat_min: latRange[0],
        lat_max: latRange[1],
        lon_min: lonRange[0],
        lon_max: lonRange[1]
    };
}

function showResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.textContent = message;
} 