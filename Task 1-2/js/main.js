// 1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся 
//  для работы с этими сущностями.

// class BasketItem {
//     constructor(id, title, price, img) {

//     }
//     getHTML(){

//     }
// }

// class Basket {
//     constructor(){

//     }
//     getItem(){

//     }
//     addItem(){

//     }
//     removeItem(){

//     }
//     calculatePrice(){

//     }
//     render(){

//     }
    
// }

//
// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
// 
'use strict';

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
                    <img src= "${this.img}?text=${this.title}&font=retina" alt="">
                    <p>${this.price} &#8381;</p>
                    <button class="by-btn">Добавить в корзину</button>
                </div>`;
    }
}

class ProductsList {
    constructor() {
        this.productsFromServer = [];
        this.fetchProducts();
        this.render();
    }
    fetchProducts() {
        this.productsFromServer = [
            { id: 1, title: 'Notebook', price: 20000, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
            { id: 2, title: 'Mouse', price: 1500, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
            { id: 3, title: 'Keyboard', price: 5000, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
            { id: 4, title: 'Gamepad', price: 4500, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' }
        ];
    }
    render() {
        let contentHTML = '';
        this.productsFromServer.forEach(product => {
            const item = new ProductItem(product.id, product.title, product.price, product.img);
            contentHTML += item.getHTML();
        });
        document.querySelector('.products').insertAdjacentHTML('beforeend', contentHTML);
    }
    sum() {
        return this.productsFromServer.reduce((accum, curr) => {
           return accum + curr.price;
        }, 0);
    }
}

const listProduct = new ProductsList();

//Информацию о суммарной стоимости выводим в консоль
console.log('Стоимость всех товаров в корзине - ', listProduct.sum()); //Сумма всех товаров

