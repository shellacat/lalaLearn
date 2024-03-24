import { Storage } from "./components/Storage.js";

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
            ],
            top_banner: {
                enable: 'yes',
                items: [
                    {
                        open: true,
                        enable: 'yes',
                        img_link: '',
                        img_link_target: '_blank',
                        start_date: '',
                        start_time: '',
                        end_date: '',
                        end_time: '',
                        desktop_img: '',
                        mobile_img: '',
                    },
                    {
                        open: false,
                        enable: 'yes',
                        img_link: '',
                        img_link_target: '_blank',
                        start_date: '',
                        start_time: '',
                        end_date: '',
                        end_time: '',
                        desktop_img: '',
                        mobile_img: '',
                    },
                    {
                        open: false,
                        enable: 'yes',
                        img_link: '',
                        img_link_target: '_blank',
                        start_date: '',
                        start_time: '',
                        end_date: '',
                        end_time: '',
                        desktop_img: '',
                        mobile_img: '',
                    },
                    {
                        open: false,
                        enable: 'yes',
                        img_link: '',
                        img_link_target: '_blank',
                        start_date: '',
                        start_time: '',
                        end_date: '',
                        end_time: '',
                        desktop_img: '',
                        mobile_img: '',
                    }
                ]
            }
        }
    },
    methods: {
        setActive(index) {
            this.active = index;
        },
        setEnable(type) {
            if (type == 'top_banner_enable') {
                this.top_banner.enable = this.top_banner.enable == 'yes' ? 'no' : 'yes';
            }
        },
        async setImage(type, index, field) {
            let images = ['https://fastly.picsum.photos/id/1080/200/200.jpg?hmac=0okKAdyiW9oTgR5PNZQrDYFtWu7HAt93nI93ZpfelUw', 'https://fastly.picsum.photos/id/1035/200/200.jpg?hmac=IDuYUZQ_7a6h4pQU2k7p2nxT-MjMt4uy-p3ze94KtA4']
            if (type == 'top_banner') {
                this.top_banner.items[index][field] = images[Math.round(Math.random() * 100) % 2];
            }
        },
        save() {
            let data = {
                top_banner: this.top_banner
            };
            Storage.write(data);
            Swal.fire({
                title: '儲存完成',
                html: '已經資料儲存至本地端',
                icon: 'success'
            })
        },
        restore() {
            let data = Storage.read();
            if (data.top_banner) {
                this.top_banner = data.top_banner;
            }
        }
    },
    mounted() {
        console.log('tabs-app is mounted.')
        this.restore();
    }
};


Vue.createApp(options).mount('#tabs-app')