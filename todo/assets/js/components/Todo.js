import { TodoStorage } from "./TodoStorage.js";

let storage = new TodoStorage('todo-app');
let dom = {};
let items = storage.read();

class Todo {
    constructor() {
        this.initDom();
        this.initEvent();
        this.restoreUI();
    }

    /**
     * 抓取所需 dom [v]
     */
    initDom() {
        dom = {
            text: document.querySelector('#data-text'),
            btn: document.querySelector('#add-btn'),
            container: document.querySelector('#todo-data')
        }
    }

    /**
     * 綁定 dom 事件 [v]
     */
    initEvent() {
        this.initInsertEvent();
        this.initStateToggleEvent();
    }

    /**
     * 新增項目事件綁定 [v]
     */
    initInsertEvent() {
        // TODO: 會有 this 問題
        // dom.btn.addEventListener('click', this.insertItem);

        dom.btn.addEventListener('click', async () => {
            let value = dom.text.value;
            let isValid = await this.insertValid(value);

            if (isValid) {
                this.insert(value, false, -1);
            }

            dom.text.value = '';
        });
    }

    initStateToggleEvent() {
        dom.container.addEventListener('click', (e) => {
            this.toggleCheckbox(e);
        });
    }

    /**
     * 新增資料驗證 [v]
     */
    async insertValid(value) {
        if (!value) {
            await Swal.fire({
                title: '新增失敗',
                html: '未輸入項目名稱',
                icon: 'error'
            });
            setTimeout(() => {
                dom.text.focus();
            }, 400)
            return false;
        }
        return true;
    }

    /**
     * 新增項目 [v]
     * @param {*} text 
     * @param {*} active 
     * @param {*} index 
     */
    insert(text, active, index) {
        this.generateItem(text, active, index);
        items.push({
            name: text,
            active: active
        })

        storage.write(items);
    }

    /**
     * 產生項目 html 附加到顯示區塊 [v]
     * @param {*} text 
     * @param {*} active 
     * @param {*} index 
     */
    generateItem(text, active, index) {
        if (index < 0) {
            index = items.length;
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
        dom.container.appendChild(li);
    }

    /**
     * 還原資料顯示
     */
    restoreUI() {
        items.forEach((item, index) => {
            this.generateItem(item.name, item.active, index);
        })
    }

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
            items[index].active = active;
            storage.write(items);
        }
    }
}

export { Todo }