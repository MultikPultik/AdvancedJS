// 1. Вынести поиск в отдельный компонент.
// 2. Вынести корзину в отдельный компонент.
// 3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.


'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

new Vue({
    el: '#app',
    data: {
        price: '',
        product: {},
        isCatalogEmpty: false,
        imgCatalogUrl: 'https://fakeimg.pl/200x200/282828/eae0d0/',
        catalogUrl: 'catalogData.json',
        
        catalogGoods: [],   //товары в каталоге
        TsearchGoods: [],    //найденные товары из компонента Search
        TcartGoods: [],      //найденные товары в корзине
    },

    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                });
        },
        getFromSearch(data) {
            this.TsearchGoods = data;
        },
        getFromCart(data) {
            this.TcartGoods = data;
        },
        addProduct(item) {
            this.$refs.cart.addProduct(item);  //Вызываем метод из компонента 'cart'
        },
    },

    created() {
        //обновляем каталог товаров данными из сервера
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.catalogGoods.push(el);
                }
                this.TsearchGoods = [...this.catalogGoods]; //делаем копию
                if (this.catalogGoods.length === 0) {
                    this.isCatalogEmpty = true;     //Выводим сообщение - нет данных от сервера
                }
            })
            .catch(error => {
                console.log('Ошибка чтения данных с сервера.\n', error);
            });
    }
});

