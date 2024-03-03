// 抓取 dom
let dom_num = document.querySelector('#num');
let dom_calc_btn = document.querySelector('#calc-btn');
let dom_response = document.querySelector('#response');

// 觀察是否有正確抓到 dom
console.log(dom_num, dom_calc_btn, dom_response);

const transferToLevel = (num) => {
    if (num >= 90) {
        return '甲'
    }

    if (num >= 80) {
        return '乙'
    }

    if (num >= 70) {
        return '丙'
    }

    if (num >= 60) {
        return '丁'
    }

    return '不及格';
}

const checkHasNum = (num) => {
    if (num) {
        return true;
    }
    return false;
}

const numInRange = (num) => {
    if (num >= 0 && num <= 100) {
        return true;
    }
    return false;
}

// 計算後要將焦點放到分數輸入區塊 [v]
const focusToNum = () => {
    dom_num.value = '';
    setTimeout(() => {
        dom_num.focus();
    }, 500)
}

// 當按下計算按鈕時，抓取數字輸入匡內容
const calcLevel = async (e) => {
    // 計算前要將顯示區塊隱藏
    dom_response.classList.add('d-none');
    console.log('start calc.');
    let currentNum = num.value;
    // 印出當前輸入框分數
    console.log(currentNum, typeof currentNum);

    // 檢查是否有輸入分數 [v]
    if (!checkHasNum(currentNum)) {
        await Swal.fire({
            title: '轉換錯誤',
            html: '尚未輸入分數',
            icon: 'error'
        })
        // 計算後要將焦點放到分數輸入區塊 [v]
        focusToNum();
        return;
    }

    // 檢查分數是否落在 0 ~ 100 之間 [v]
    if (!numInRange(currentNum)) {
        await Swal.fire({
            title: '轉換錯誤',
            html: `分數: ${currentNum} 未落在 0 ~ 100 之間`,
            icon: 'error'
        })
        // 計算後要將焦點放到分數輸入區塊 [v]
        focusToNum();
        return;
    }

    // 計算等級 [v]
    let level = transferToLevel(currentNum);

    // 顯示在 dom_response 內，格視為: 您的分數: oo, 等級: xx
    let content = `您的分數: ${currentNum}, 等級: ${level}`;
    dom_response.innerHTML = content;
    dom_response.classList.remove('d-none');
    // 計算後要將焦點放到分數輸入區塊 [v]
    focusToNum();
}

dom_calc_btn.addEventListener('click', calcLevel);

// 分數輸入區塊按下 enter 也可以計算 [v]

const triggerCalc = (e) => {
    let key = e.key;
    if (key && key.toUpperCase() == 'ENTER') {
        calcLevel(e);
    }
}

dom_num.addEventListener('keyup', triggerCalc);

/**
 * 1. 抓取 dom
 * 2. 當按下計算按鈕時，抓取數字輸入匡內容
 * 3. 印出當前輸入框分數
 * 4. 檢查是否有輸入分數
 * 5. 檢查分數是否落在 0 ~ 100 之間
 * 6. 計算等級
 * 7. 顯示在 dom_response 內，格視為: 您的分數: oo, 等級: xx
 * 8. 計算前要將顯示區塊隱藏
 * 9. 計算後要將焦點放到分數輸入區塊
 * 10. 分數輸入區塊按下 enter 也可以計算
 */