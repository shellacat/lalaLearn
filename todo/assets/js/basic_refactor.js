let todo_app = {
    storage_key: 'todo-app',
    data: [],
    dom: {},
    /**
     * 初始化 app
     * @returns {void}
     */
    init() {
        todo_app.dom = {
            text: document.querySelector('#data-text'),
            btn: document.querySelector('#add-btn'),
            data: document.querySelector('#todo-data')
        };

        todo_app.dom.btn.addEventListener('click', todo_app.onBtnClick);
        todo_app.dom.data.addEventListener('click', todo_app.toggleCheckbox);

        todo_app.data = todo_app.read();
        todo_app.restoreUI();
    },
    /**
     * 新增項目事件串接
     * @param {object} e 事件氣泡
     * @returns {void}
     */
    async onBtnClick(e) {
        let dom = todo_app.dom;
        let value = dom.text.value;

        if (!value) {
            await Swal.fire({
                title: '新增失敗',
                html: '未輸入項目名稱',
                icon: 'error'
            });
        } else {
            todo_app.insertTodo(value, false, -1);
        }
        dom.text.value = '';

        setTimeout(() => {
            dom.text.focus();
        }, 400)
    },
    /**
     * 新增資料
     * @param {string} text 項目名稱
     * @param {boolean} active 選取狀態
     * @param {number} index 資料索引值
     * @returns {void}
     */
    insertTodo(text, active, index) {
        todo_app.generateItem(text, active, index);
        todo_app.data.push({
            name: text,
            active: active
        })
        todo_app.write();
    },
    /**
     * 切換選取狀態
     * @param {object} e 事件氣泡
     */
    toggleCheckbox(e) {
        let target = e.target;
        if (target && target.classList.contains('todo-checkbox')) {
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
            todo_app.data[index].active = active;
            todo_app.write();
        }
    },
    /**
     * 寫入 localStorage
     * @returns {void}
     */
    write() {
        localStorage.setItem(todo_app.storage_key, JSON.stringify(todo_app.data));
    },
    /**
     * 從 localStorage 取得資料
     * @returns {array}
     */
    read() {
        let data = localStorage.getItem(todo_app.storage_key);
        if (typeof data == 'string') {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        return data;
    },
    /**
     * 還原上次資料的 UI 狀態
     */
    restoreUI() {
        todo_app.data.forEach((item, index) => {
            todo_app.generateItem(item.name, item.active, index);
        })
    },
    /**
     * 產生項目 UI
     * @param {string} text 
     * @param {boolean} active 
     * @param {number} index 
     */
    generateItem(text, active, index) {
        if (index < 0) {
            index = todo_app.data.length;
        }
        let checkbox_active = '';
        let li = document.createElement('li');
        li.classList.add('todo-item');

        if (active) {
            li.classList.add('checked');
            checkbox_active = 'active';
        }


        li.innerHTML = `<span class="todo-checkbox ${checkbox_active}" data-index="${index}"></span>
                        <span>${text}</span>`;
        todo_app.dom.data.appendChild(li);
    }
}


todo_app.init();