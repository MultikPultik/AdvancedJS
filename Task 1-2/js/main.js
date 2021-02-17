// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

'use strict';

const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error!!!');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
}

class ProductItem {
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    getHTML() {
        return `<div class="product-item">
                    <h3>${this.title}</h3>
                    <img src= "${this.img}" alt="">
                    <p>${this.price} &#8381;</p>
                    <button class="by-btn">Добавить в корзину</button>
                </div>`;
    }
}

class ProductList {
    constructor() {
        this.products = [];
    }
    fetchProducts() {
        // this.products = [
        //     { id: 1, title: 'Notebook', price: 20000, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
        //     { id: 2, title: 'Mouse', price: 1500, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
        //     { id: 3, title: 'Keyboard', price: 5000, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
        //     { id: 4, title: 'Gamepad', price: 4500, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' }
        // ];

        getRequest(`${url}catalogData.json`)
        .then(data => { 
            this.products = JSON.parse(data) 
            this.render();
            //Информацию о суммарной стоимости выводим в консоль
            console.log(listProduct.sum()); //Сумма всех товаров
        })
        .catch(text => { console.log(text) })


        // getRequest(`${url}catalogData.json`, (data) => {
        //     console.log(data);
        //     this.products = JSON.parse(data);
        //     // console.log(this.products);
        //     this.render();
        //     //Информацию о суммарной стоимости выводим в консоль
        //     console.log(listProduct.sum()); //Сумма всех товаров
        // });
    }
    render() {
        let contentHTML = '';
        this.products.forEach(product => {
            const item = new ProductItem(product.id, product.product_name, product.price, product.img = 'https://fakeimg.pl/250x250/282828/eae0d0/');
            contentHTML += item.getHTML();
        });
        document.querySelector('.products').insertAdjacentHTML('beforeend', contentHTML);
    }
    sum() {
        return this.products.reduce((accum, curr) => {
            return accum + curr.price;
        }, 0);
    }
}

const listProduct = new ProductList();
listProduct.fetchProducts();



