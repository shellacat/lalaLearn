import { Storage } from '/assets/js/components/Storage.js';
import { Ajax } from './components/Ajax.js';

// 載入本地端資料
let key = 'open-data';
let storage = new Storage(key);
let data = storage.read();

// 如無資料則從 API 取得後儲存
if (!data) {
    let api = 'https://apiservice.mol.gov.tw/OdService/download/A17000000J-030278-avn';
    data = await Ajax.get(api);
    storage.write(data);
}

let elTypeSelect = document.querySelector('#data-type')

const generateTypeOption = () => {
    let option = '<option value="-1">選擇項目</option>';
    data.forEach((item, index) => {
        let type = item['項目別'];
        option += `<option value="${index}">${type}</option>`;
    });
    elTypeSelect.innerHTML = option;
}

const initTypeSelectEvent = () => {
    elTypeSelect.addEventListener('change', () => {
        let index = elTypeSelect.value;
        if (index < 0) {
            return;
        }

        showData(index);
    });
}

let canvas = null;
const showData = (index) => {
    let items = data[index] || {};
    let labels = [];
    let values = [];
    for (let f in items) {
        if (f == '項目別') {
            continue;
        }

        labels.push(f);
        values.push(items[f]);
    }
    let el = document.querySelector('#chart');
    if (canvas) {
        canvas.destroy();
    }

    console.log(items);

    canvas = new Chart(el, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: items['項目別'],
                    data: values
                }
            ]
        }
    })
}

generateTypeOption();
initTypeSelectEvent();