// 1. Вынести поиск в отдельный компонент.
// 2. Вынести корзину в отдельный компонент.
// 3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.


'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

new Vue({
    el: '#app',
    data: {
        price: '',
        search: '',
        isCatalogEmpty: false,
        imgCatalogUrl: 'https://fakeimg.pl/200x200/282828/eae0d0/',
        catalogUrl: 'catalogData.json',
        catalogGoods: [],   //товары в каталоге
        searchGoods: [],    //найденные товары
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        clickSearch() {
            this.searchGoods = this.searchProduct(this.search);
        },
        
        searchProduct(str) {
            return this.catalogGoods.filter(el => {
                let s = new RegExp(str, "gim");
                return (s.test(el.product_name));
            })
        },

        
    },
    created() {
        //обновляем каталог товаров данными из сервера
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.catalogGoods.push(el);
                }
                this.searchGoods = [...this.catalogGoods]; //делаем копию
                if (this.catalogGoods.length === 0) {
                    this.isCatalogEmpty = true;     //Выводим сообщение - нет данных от сервера
                }
            })
            .catch(error => {
                console.log('Ошибка чтения данных с сервера.\n', error);
            });
    },
})

