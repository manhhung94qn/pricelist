var app = new Vue({
    el: '#app',
    data: {
        sale: 5,
        textButton: 'Lưu chọn',
        objFunction: {
            basic: {
                basicWeb: {
                    isActive: true,
                    money: 6000000
                },
                reponsive: {
                    isActive: true,
                    money: 0
                }
            },
            language: {
                mainLanguage: {
                    isActive: true,
                    money: 0
                },
                multiLanguage: {
                    count: 0,
                    money: 1000000
                }
            },
            search: {
                basic: {
                    isActive: false,
                    money: 0
                },
                advanced: {
                    isActive: false,
                    money: 1000000
                }
            },
            map: {
                basic: {
                    isActive: false,
                    money: 0
                },
                advanced: {
                    isActive: false,
                    money: 500000
                }
            },
            admin: {
                basic: {
                    isActive: false,
                    money: 1000000
                },
                decentralized: {
                    isActive: false,
                    money: 500000
                },
                email: {
                    isActive: false,
                    money: 500000
                }
            }
        }
    },

    mounted: function() {
        if (this.taltolMoney > 8000000) this.sale = 10;
        if (this.taltolMoney > 9000000) this.sale = 15;
        if (this.taltolMoney > 10000000) this.sale = 20;
        if (this.taltolMoney > 11000000) this.sale = 25;
        $.ajax({
            url: '/api',
            method: 'GET',
            success: (data) => {
                this.objFunction = JSON.parse(data);
            }
        })
    },

    computed: {
        taltolMoney() {
            return this.taltolBasic + this.taltolLanguage + this.taltolSearch + this.taltolMap + this.taltolAdmin;
        },
        sumMoney() {
            return this.taltolMoney * (100 - this.sale) / 100;
        },
        taltolBasic() {
            let rs = 0;
            if (this.objFunction.basic.basicWeb.isActive) {
                rs += this.objFunction.basic.basicWeb.money;
            }
            if (this.objFunction.basic.reponsive.isActive) {
                rs += this.objFunction.basic.reponsive.money;
            }
            return rs;
        },
        taltolLanguage() {
            let rs = 0;
            if (this.objFunction.language.mainLanguage.isActive) {
                rs += this.objFunction.language.mainLanguage.money;
            }
            rs += this.objFunction.language.multiLanguage.count *
                this.objFunction.language.multiLanguage.money;
            return rs;
        },
        taltolSearch() {
            let rs = 0;
            if (this.objFunction.search.basic.isActive) {
                rs += this.objFunction.search.basic.money;
            };
            if (this.objFunction.search.advanced.isActive) {
                rs += this.objFunction.search.advanced.money;
            };
            return rs;
        },
        taltolMap() {
            let rs = 0;
            if (this.objFunction.map.basic.isActive) {
                rs += this.objFunction.map.basic.money;
            };
            if (this.objFunction.map.advanced.isActive) {
                rs += this.objFunction.map.advanced.money;
            };
            return rs;
        },
        taltolAdmin() {
            let rs = 0;
            if (this.objFunction.admin.basic.isActive) {
                rs += this.objFunction.admin.basic.money;
            };
            if (this.objFunction.admin.decentralized.isActive) {
                rs += this.objFunction.admin.decentralized.money;
            };
            if (this.objFunction.admin.email.isActive) {
                rs += this.objFunction.admin.email.money;
            };
            return rs;
        }
    },

    methods: {
        unCheckObjFuntion(e, f, o) {
            if (!e.target.checked) this.objFunction[f][o].isActive = false;
        },
        checkObjFuntion(e, f, o) {
            if (e.target.checked) this.objFunction[f][o].isActive = true;
        },
        saveData() {
            $('#spinnerBtnSave').hide();
            $.ajax({
                url: '/api',
                method: 'POST',
                contentType: "application/json",
                data: JSON.stringify(this.objFunction),
                success: (data) => {
                    $('#spinnerBtnSave').hide();
                    this.textButton = 'Đã lưu';
                    setTimeout(() => {
                        this.textButton = 'Lưu chọn'
                    }, 1500);
                }
            })
        }
    },

    watch: {
        taltolMoney(newValue) {
            if (newValue > 11000000) {
                this.sale = 25;
                return;
            };
            if (newValue > 10000000) {
                this.sale = 20;
                return;
            };
            if (newValue > 9000000) {
                this.sale = 15;
                return;
            }
            if (newValue > 8000000) {
                this.sale = 10;
                return;
            }
            this.sale = 5;
            return;
        }
    },
})