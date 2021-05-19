// 1.	Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine 
//   и привязать к нему содержимое поля ввода. На кнопку Искать добавить обработчик клика, вызывающий 
//   метод FilterGoods.
// 2.	Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле 
//   isVisibleCart, управляющее видимостью корзины.
// 3.	* Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.

// 'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

new Vue({
    el: '#app',
    data: {
        cartBadge: '',
        price: '',
        userSearch: '',
        isVisibleCart: false,
        isCatalogEmpty: false,
        imgCatalogUrl: 'https://fakeimg.pl/200x200/282828/eae0d0/',
        imgCartUrl: 'https://fakeimg.pl/70x70/282828/eae0d0/',
        catalogUrl: 'catalogData.json',
        cartUrl: 'getBasket.json',
        addToBasket: 'addToBasket.json',
        deleteFromBasket: 'deleteFromBasket.json',
        catalogGoods: [],   //товары в каталоге
        cartGoods: [],      //товары в корзине
    },
    computed: {
        //найденные товары
        searchGoods: {
            get: function(){
                return this.catalogGoods.filter(el => {
                    let s = new RegExp(this.userSearch, "gim");
                    return (s.test(el.product_name));
                })
            },
            //TODO.....
            //Без сеттера Vue выдает предупреждение об отстутствии сеттера. Не нашел как устранить этот недостаток.
            set: function(){

            }
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API + this.addToBasket}`)
                .then(data => {
                    if (data.result === 1) {
                        if (data.result === 1) {
                            let findElement = this.cartGoods.find(prod => { return prod.id_product === +product.id_product });
                            if (findElement) {
                                console.log('такой товар есть');
                                findElement.quantity += 1;
                                this.totalPrice();
                                this.cartBadge = this.cartGoods.length;
                            } else {
                                console.log('такого товара нет');
                                this.cartGoods.push({ ...product, quantity: 1 });
                                this.totalPrice();
                                this.cartBadge = this.cartGoods.length;
                            }
                        }
                    }
                })

        },

        deleteProduct(el) {
            this.getJson(`${API + this.deleteFromBasket}`)
                .then(data => {
                    if (data.result === 1) {
                        console.log('delete - ' + el.product_name);
                        if (el.quantity > 1) {
                            el.quantity -= 1;
                        } else {
                            let index = this.cartGoods.indexOf(el);
                            this.cartGoods.splice(index, 1);
                            this.cartBadge = this.cartGoods.length;
                            this.totalPrice();
                        }
                    }
                });
        },
        totalPrice() {
            this.price = this.cartGoods.reduce((accum, curr) => {
                return accum + curr.price * curr.quantity;
            }, 0);
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

        //обновляем корзину товаров данными из сервера
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartGoods.push(el);
                }
                this.cartBadge = this.cartGoods.length;
                this.totalPrice();
            });


    },
})
