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