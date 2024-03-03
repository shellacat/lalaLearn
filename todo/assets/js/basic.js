// 抓取必要的 DOM
let dom = {
    text: document.querySelector('#data-text'),
    btn: document.querySelector('#add-btn'),
    data: document.querySelector('#todo-data')
};

// todo 資料結構
let todo_data = [];

// 項目資料結構
// let todo_obj = {
//     name: '',
//     active: '',
// };

/**
 * 1. 按鈕事件綁定
 * 2. 當按下按鈕時，抓取輸入框文字
 *  2-1. 檢查輸入框是否有值
 *      2-1-1. 沒有值的時候
 *          2-1-1-a. 顯示提醒文字
 *          2-1-1-b. 將焦點放到輸入框
 *  2-2. 清除輸入框的值
 *  2-3. 將焦點放到輸入框
 * 3. 將值新增到列表區塊
 */

/**
 * 將值新增到列表區塊
 * @param {string} text 項目名稱
 * @returns {void}
 */
const insertTodo = (text) => {
    // 對應 data-index 方便後續取得該項目的 index 索引
    let index = todo_data.length;

    // 因為 appendChild 只接受 Node 物件，所以需要建立 Node 物件後再附加資料
    let li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="todo-checkbox" data-index="${index}"></span>
                    <span>${text}</span>`;
    dom.data.appendChild(li);
    todo_data.push({
        name: text,
        active: false
    })

    console.log(todo_data);
}

/**
 * 1. 按鈕事件綁定
 * @param {object} e 事件物件，事件觸發時自動傳進
 * @returns {void}
 */
const onBtnClick = async (e) => {
    // 2. 當按下按鈕時，抓取輸入框文字
    let value = dom.text.value;

    // 2-1. 檢查輸入框是否有值
    // 2-1-1. 沒有值的時候，顯示提醒文字，將焦點放到輸入框
    if (!value) {
        // 2-1-1-a. 顯示提醒文字
        await Swal.fire({
            title: '新增失敗',
            html: '未輸入項目名稱',
            icon: 'error'
        })

        // 2-1-1-b. 將焦點放到輸入框
        // 省略動作，最後統一處理
    } else {
        // 3. 將值新增到列表區塊
        insertTodo(value);
    }

    // 2-2. 清除輸入框的值
    dom.text.value = '';

    // 2-3. 將焦點放到輸入框
    // FIXME: 修正 sweetalert 套件消失過場動畫導致焦點遺失問題
    setTimeout(() => {
        dom.text.focus();
    }, 400)

}
dom.btn.addEventListener('click', onBtnClick);


// 當點項目的 checkbox 可切換選取狀態
const bindCheckboxOnClick = () => {
    // 抓取畫面上所有 .todo-checkbox 的 dom
    // let checkbox_doms = document.querySelectorAll('.todo-checkbox');
    // checkbox_doms.forEach((item) => {
    //     item.addEventListener('click', (e) => {
    //         console.log(e);
    //         toggleCheckboxStatus(item);
    //     });
    // })

    // 使用事件氣泡特性，綁定上一層 dom
    dom.data.addEventListener('click', (e) => {
        let target = e.target;
        if (target && target.classList.contains('todo-checkbox')) {
            // 更新 todo_data 項目狀態
            let index = target.dataset.index;
            let active = false;
            let li = target.parentNode;
            if (target.classList.contains('active')) {
                target.classList.remove('active');
                li.classList.remove('checked');
            } else {
                target.classList.add('active');
                li.classList.add('checked');
                active = true;
            }
            todo_data[index].active = active;
            console.log(todo_data);
        }
    })
}

bindCheckboxOnClick();