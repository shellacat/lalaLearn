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
            video: {
                items: [
                    {
                        open: true,
                        link: '',
                        description: '',
                        auto_img: '',
                        custom_img: '',
                        custom_cover: false,
                    },
                    {
                        open: false,
                        link: '',
                        description: '',
                        auto_img: '',
                        custom_img: '',
                        custom_cover: false,
                    },
                    {
                        open: false,
                        link: '',
                        description: '',
                        auto_img: '',
                        custom_img: '',
                        custom_cover: false,
                    },
                    {
                        open: false,
                        link: '',
                        description: '',
                        auto_img: '',
                        custom_img: '',
                        custom_cover: false,
                    },
                    {
                        open: false,
                        link: '',
                        description: '',
                        auto_img: '',
                        custom_img: '',
                        custom_cover: false,
                    },
                    {
                        open: false,
                        link: '',
                        description: '',
                        auto_img: '',
                        custom_img: '',
                        custom_cover: false,
                    }
                ]
            },
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
            },
            partner: {
                enable: 'yes',
                items: [],
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
            if (type == 'partner_enable') {
                this.partner.enable = this.partner.enable == 'yes' ? 'no' : 'yes';
            }
        },
        async setImage(type, index, field) {
            let images = ['https://fastly.picsum.photos/id/1080/200/200.jpg?hmac=0okKAdyiW9oTgR5PNZQrDYFtWu7HAt93nI93ZpfelUw', 'https://fastly.picsum.photos/id/1035/200/200.jpg?hmac=IDuYUZQ_7a6h4pQU2k7p2nxT-MjMt4uy-p3ze94KtA4']
            if (type == 'top_banner') {
                this.top_banner.items[index][field] = images[Math.round(Math.random() * 100) % 2];
            }
            if (type == 'video') {
                this.video.items[index][field] = images[Math.round(Math.random() * 100) % 2];
            }
            if (type == 'partner') {
                this.partner.items[index][field] = images[Math.round(Math.random() * 100) % 2];
            }
        },
        save() {
            let data = {
                top_banner: this.top_banner,
                video: this.video,
                partner: this.partner,
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

            if (data.video) {
                this.video = data.video
            }
            if (data.partner) {
                this.partner = data.partner
            }
        },
        loadYoutubeCover(index) {
            let item = this.video.items[index];
            let url = item.link;
            let param = url.split('?')[1];
            if (!param) {
                return;
            }
            let params = param.split('&');
            params.forEach(str => {
                let sp = str.split('=');
                if (sp[0] == 'v') {
                    this.video.items[index].auto_img = `https://img.youtube.com/vi/${sp[1]}/0.jpg`;
                }
            })
        },
        addPartner() {
            this.partner.items.push({
                open: false,
                enable: true,
                name: '新夥伴',
                cover: '',
                link: '#'
            });
        },
        deletePartner(index) {
            this.partner.items.splice(index, 1);
        },
        sortPrevious(type, index) {
            if (type == 'partner') {
                if (index <= 0) {
                    return;
                }

                let other = this.partner.items[index - 1];
                let current = this.partner.items[index];
                this.partner.items[index - 1] = current;
                this.partner.items[index] = other;
            }
        },
        sortNext(type, index) {
            if (type == 'partner') {

                if (index >= this.partner.items.length - 1) {
                    return;
                }

                let other = this.partner.items[index + 1];
                let current = this.partner.items[index];
                this.partner.items[index + 1] = current;
                this.partner.items[index] = other;
            }
        }
    },
    
    mounted() {
        console.log('tabs-app is mounted.')
        this.restore();
    }
};


Vue.createApp(options).mount('#tabs-app')

// https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
// https://img.youtube.com/vi/_WUnfB56IaU/0.jpg
// https://www.youtube.com/watch?v=_WUnfB56IaU