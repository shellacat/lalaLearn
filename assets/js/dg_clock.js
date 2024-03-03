let dom_h1 = document.querySelector('#clock-h1');
let dom_h2 = document.querySelector('#clock-h2');
let dom_m1 = document.querySelector('#clock-m1');
let dom_m2 = document.querySelector('#clock-m2');
let dom_s1 = document.querySelector('#clock-s1');
let dom_s2 = document.querySelector('#clock-s2');

/**
 * 取得現在時間
 * @returns {object}
 */
const getCurrentTime = () => {
    let d = new Date();
    let hh = d.getHours();
    let mm = d.getMinutes();
    let ss = d.getSeconds();

    return {
        hh: paddingNum(hh),
        mm: paddingNum(mm),
        ss: paddingNum(ss)
    };
}

/**
 * 數字小於 10，前面自動補 0，確保內容為兩位數
 * @param {int} num 
 * @returns {string}
 */
const paddingNum = (num) => {
    if (num < 10) {
        num = `0${num}`;
    } else {
        num = num.toString()
    }
    return num;
}

/**
 * 更新 UI
 * @return {void}
 */
const updateUI = () => {
    let current = getCurrentTime();
    dom_h1.innerHTML = current.hh[0];
    dom_h2.innerHTML = current.hh[1];
    dom_m1.innerHTML = current.mm[0];
    dom_m2.innerHTML = current.mm[1];
    dom_s1.innerHTML = current.ss[0];
    dom_s2.innerHTML = current.ss[1];
}

let sn = setInterval(() => {
    updateUI();
}, 1000)

// 畫面初始化時執行
updateUI();