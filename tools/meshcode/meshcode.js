// メッシュコードの有効な桁数
const ALLOWED_DIGITS = [4, 6, 8];

// 緯度経度からメッシュコードに変換
function encodeFromLatLon(lat, lon, digit = 4) {
    if (digit === 4) {
        return calculatePrimaryMeshcode(lat, lon);
    } else if (digit === 6) {
        return calculateSecondaryMeshcode(lat, lon);
    } else if (digit === 8) {
        return calculateTertiaryMeshcode(lat, lon);
    } else {
        throw new Error("桁数が無効です");
    }
}

// 1次メッシュコードを計算
function calculatePrimaryMeshcode(lat, lon) {
    const lat_div = Math.floor(parseFloat(lat) * 1.5);
    const lon_div = Math.floor(parseFloat(lon) - 100);
    return `${lat_div.toString().padStart(2, '0')}${lon_div.toString().padStart(2, '0')}`;
}

// 2次メッシュコードを計算
function calculateSecondaryMeshcode(lat, lon) {
    const primary_mesh = calculatePrimaryMeshcode(lat, lon);
    const lat_remainder = Math.floor((parseFloat(lat) * 1.5) % 1 * 8);
    const lon_remainder = Math.floor((parseFloat(lon) - 100) % 1 * 8);
    return `${primary_mesh}${lat_remainder}${lon_remainder}`;
}

// 3次メッシュコードを計算
function calculateTertiaryMeshcode(lat, lon) {
    const secondary_mesh = calculateSecondaryMeshcode(lat, lon);
    const lat_remainder = Math.floor(((parseFloat(lat) * 1.5) % 1 * 8) % 1 * 10);
    const lon_remainder = Math.floor(((parseFloat(lon) - 100) % 1 * 8) % 1 * 10);
    return `${secondary_mesh}${lat_remainder}${lon_remainder}`;
}

// メッシュコードから緯度経度に変換
function decodeToLatLon(meshcode) {
    if (!meshcode) {
        throw new Error("デコードにはメッシュコードが必要です");
    }

    if (!ALLOWED_DIGITS.includes(meshcode.length)) {
        throw new Error("無効なメッシュコードです");
    }

    // 1次メッシュコードをデコード
    const lat_div = parseInt(meshcode.substring(0, 2));
    const lon_div = parseInt(meshcode.substring(2, 4));

    let lat_min = lat_div / 1.5;
    let lat_max = (lat_div + 1) / 1.5;

    let lon_min = lon_div + 100;
    let lon_max = lon_div + 101;

    // 2次メッシュコードをデコード（存在する場合）
    if (meshcode.length >= 6) {
        const lat_code = parseInt(meshcode.charAt(4));
        const lon_code = parseInt(meshcode.charAt(5));

        lat_min += lat_code / 8 / 1.5;
        lat_max = lat_min + 1 / 8 / 1.5;

        lon_min += lon_code / 8;
        lon_max = lon_min + 1 / 8;
    }

    // 3次メッシュコードをデコード（存在する場合）
    if (meshcode.length === 8) {
        const lat_code = parseInt(meshcode.charAt(6));
        const lon_code = parseInt(meshcode.charAt(7));

        lat_min += lat_code / 80 / 1.5;
        lat_max = lat_min + 1 / 80 / 1.5;

        lon_min += lon_code / 80;
        lon_max = lon_min + 1 / 80;
    }

    return {
        lat_min: lat_min,
        lat_max: lat_max,
        lon_min: lon_min,
        lon_max: lon_max
    };
}

// UI関数: 緯度経度からメッシュコードに変換
function convertToMeshcodeFromLatLon() {
    const lat = parseFloat(document.getElementById('meshcode-latitude').value);
    const lng = parseFloat(document.getElementById('meshcode-longitude').value);
    const digit = parseInt(document.getElementById('meshcode-digit').value);
    
    if (isNaN(lat) || isNaN(lng)) {
        showResult('緯度と経度を入力してください。');
        return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        showResult('緯度は-90から90の間、経度は-180から180の間で入力してください。');
        return;
    }

    try {
        const meshcode = encodeFromLatLon(lat, lng, digit);
        const digitText = digit === 4 ? '1次メッシュ' : digit === 6 ? '2次メッシュ' : '3次メッシュ';
        showResult(`${digitText}コード: ${meshcode}`);
    } catch (e) {
        showResult(`エラー: ${e.message}`);
    }
}

// UI関数: メッシュコードから緯度経度に変換
function convertToLatLngFromMeshcode() {
    const meshcodeStr = document.getElementById('meshcode').value.trim();
    
    if (!meshcodeStr) {
        showResult('メッシュコードを入力してください。');
        return;
    }

    // 数字のみの入力かチェック
    if (!/^\d+$/.test(meshcodeStr)) {
        showResult('メッシュコードは数字のみで入力してください。');
        return;
    }

    // 有効な桁数かチェック
    if (!ALLOWED_DIGITS.includes(meshcodeStr.length)) {
        showResult('メッシュコードは4桁、6桁、または8桁で入力してください。');
        return;
    }

    try {
        const result = decodeToLatLon(meshcodeStr);
        
        const digitText = meshcodeStr.length === 4 ? '1次メッシュ' : 
                         meshcodeStr.length === 6 ? '2次メッシュ' : '3次メッシュ';
        
        const message = `${digitText}コード: ${meshcodeStr}\n` +
                       `緯度範囲: ${result.lat_min.toFixed(6)} 〜 ${result.lat_max.toFixed(6)}\n` +
                       `経度範囲: ${result.lon_min.toFixed(6)} 〜 ${result.lon_max.toFixed(6)}\n` +
                       `中心点: 緯度 ${((result.lat_min + result.lat_max) / 2).toFixed(6)}, ` +
                       `経度 ${((result.lon_min + result.lon_max) / 2).toFixed(6)}`;
        
        showResult(message);
    } catch (e) {
        showResult(`エラー: ${e.message}`);
    }
}

// 結果を表示する関数
function showResult(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.textContent = message;
} 