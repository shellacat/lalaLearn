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
                        img_link: '',
                        open: false,
                        enable: 'yes',
                        img_link: '1',
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
                        img_link: '2',
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
                        img_link: '3',
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
                        img_link: '4',
                        img_link_target: '_blank',
                        start_date: '',
                        start_time: '',
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
                console.log(this.top_banner.enable)
                this.top_banner.enable = this.top_banner.enable == 'yes' ? 'no' : 'yes';
                console.log(this.top_banner.enable)
            }
        },
    },
    mounted() {
        console.log('tabs-app is mounted.')
    }
};


Vue.createApp(options).mount('#tabs-app')
