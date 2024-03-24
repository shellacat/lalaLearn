const options = {
    data() {
        return {
            active: 0,
            items: [
                '頂部橫幅輪播',
                '輪播廣告',
                '專家怎麼說影片',
                '合作夥伴',
                '相關連結',
            ]
        }
    },
    methods: {
        setActive(index) {
            this.active = index;
        }
    },
    mounted() {
        console.log('tabs-app is mounted.')
    }
};


Vue.createApp(options).mount('#tabs-app')
