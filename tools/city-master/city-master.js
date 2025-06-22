// 市区町村データを格納する配列
let cityData = [];
let prefectureList = [];

// ページ読み込み時にデータを読み込む
document.addEventListener('DOMContentLoaded', function() {
    loadCityData();
});

// CSVデータを読み込む
async function loadCityData() {
    try {
        const response = await fetch('../../master/city/cityMaster.csv');
        const csvText = await response.text();
        parseCsv(csvText);
        populatePrefectureSelect();
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
        showResult('データの読み込みに失敗しました。', 'error');
    }
}

// CSVをパースする
function parseCsv(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    cityData = [];
    prefectureList = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',');
        const city = {
            prefCode: values[0],
            prefName: values[1],
            cityCode: values[2],
            cityName: values[3],
            designatedFlag: values[4]
        };
        
        cityData.push(city);
        
        // 都道府県リストを作成（重複を避ける）
        if (!prefectureList.find(p => p.code === city.prefCode)) {
            prefectureList.push({
                code: city.prefCode,
                name: city.prefName
            });
        }
    }
    
    // 都道府県コードでソート
    prefectureList.sort((a, b) => parseInt(a.code) - parseInt(b.code));
}

// 都道府県セレクトボックスを設定
function populatePrefectureSelect() {
    const select = document.getElementById('prefecture-select');
    
    prefectureList.forEach(pref => {
        const option = document.createElement('option');
        option.value = pref.code;
        option.textContent = `${pref.code} - ${pref.name}`;
        select.appendChild(option);
    });
}

// 都道府県から市区町村を検索
function searchCitiesByPrefecture() {
    const prefCode = document.getElementById('prefecture-select').value;
    
    if (!prefCode) {
        showResult('都道府県を選択してください。', 'error');
        return;
    }
    
    const cities = cityData.filter(city => city.prefCode === prefCode);
    const prefecture = prefectureList.find(p => p.code === prefCode);
    
    if (cities.length === 0) {
        showResult('該当する市区町村が見つかりませんでした。', 'error');
        return;
    }
    
    displayCityTable(cities, `${prefecture.name}の市区町村一覧`);
}

// コードから市区町村を検索
function searchByCode() {
    const code = document.getElementById('city-code').value.trim();
    
    if (!code) {
        showResult('市区町村コードを入力してください。', 'error');
        return;
    }
    
    if (code.length !== 5) {
        showResult('市区町村コードは5桁で入力してください。', 'error');
        return;
    }
    
    const cities = cityData.filter(city => city.cityCode === code);
    
    if (cities.length === 0) {
        showResult('該当する市区町村が見つかりませんでした。', 'error');
        return;
    }
    
    displayCityInfo(cities[0]);
}

// 市区町村名からコードを検索
function searchByName() {
    const name = document.getElementById('city-name').value.trim();
    
    if (!name) {
        showResult('市区町村名を入力してください。', 'error');
        return;
    }
    
    const cities = cityData.filter(city => city.cityName.includes(name));
    
    if (cities.length === 0) {
        showResult('該当する市区町村が見つかりませんでした。', 'error');
        return;
    }
    
    if (cities.length === 1) {
        displayCityInfo(cities[0]);
    } else {
        displayCityTable(cities, `"${name}"を含む市区町村一覧`);
    }
}

// 市区町村情報を表示
function displayCityInfo(city) {
    const template = document.getElementById('city-info-template');
    const clone = template.content.cloneNode(true);
    
    // データを挿入
    clone.getElementById('info-pref-code').textContent = city.prefCode;
    clone.getElementById('info-pref-name').textContent = city.prefName;
    clone.getElementById('info-city-code').textContent = city.cityCode;
    clone.getElementById('info-city-name').textContent = city.cityName;
        
    showResult(clone);
}

// 市区町村テーブルを表示
function displayCityTable(cities, title) {
    const template = document.getElementById('city-table-template');
    const clone = template.content.cloneNode(true);
    
    // タイトルを設定
    clone.getElementById('table-title').textContent = `${title} (${cities.length}件)`;
    
    // テーブルボディにデータを追加
    const tbody = clone.getElementById('table-body');
    
    cities.forEach(city => {
        const row = document.createElement('tr');
                
        row.innerHTML = `
            <td>${city.prefCode}</td>
            <td>${city.prefName}</td>
            <td>${city.cityCode}</td>
            <td>${city.cityName}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    showResult(clone);
}

// 結果を表示
function showResult(content, type = 'success') {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    if (type === 'error') {
        resultDiv.innerHTML = `<div class="error">${content}</div>`;
    } else {
        resultDiv.innerHTML = '';
        resultDiv.appendChild(content);
    }
} 