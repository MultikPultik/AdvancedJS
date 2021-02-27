// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

// 'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
class ParentList {
    constructor() { }
}
// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
let getRequest = (API) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', API, true);
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

class Item {
    constructor(el, linkImg = 'https://fakeimg.pl/200x200/282828/eae0d0/') {
        this.id = el.id_product;
        this.title = el.product_name;
        this.price = el.price;
        this.linkImg = linkImg;
    }
}
class CatalogItem extends Item {
    getHTML() {
        return `<div class="product-item">
                    <h3>${this.title}</h3>
                    <img src= "${this.linkImg}" alt="someImg">
                    <p>${this.price} &#8381;</p>
                    <button class="by-btn">Добавить в корзину</button>
                </div>`;
    }
}

class CartItem extends Item {
    constructor(el) {
        super(el);
        this.quantity = el.quantity;
    }
    getHTML() {
        return `<tr class="cart-item" data-id="${this.id}>
                    <td>
                        <img src="${this.linkImg}" alt="someImg" />
                    </td>
                    <td>${this.title}</td>
                    <td>х ${this.quantity}</td>
                    <td>${this.price} &#8381;</td>
                    <td>
                        <a href="#"><i class="bi bi-x-circle" data-id="${this.id}></i></a>
                    </td>
                </tr>`;
    }
}

class Cart {
    constructor(container = ".cart-container", url = 'getBasket.json') {
        // super(el)
        this.container = container;
        this.listCart = [];
        this.getData(url);
        this.init();
    }

    getData(url) {
        return fetch(`${API + url}`)
            .then(response => response.json())
            // .then(data => {
            //     console.log('Данные от сервера\n', data)
            //     return data;
            // })
            .catch(error => {
                console.log('Ошибка получения данных');
            })
    }

    getHTML(el) {

    }

    delItem(el) {
        this.getData('deleteFromBasket.json')
            .then(data => {
                if (data.result === 1) {
                    let dataId = +el.dataset['id'];
                    document.querySelector(`.cart-item[data-id="${dataId}"]`).remove();
                    console.log('удален товар с id =', dataId)
                } else {
                    console.log('ошибка удаления с сервера');
                }
            })
    }

    init() {
        document.querySelector(this.container).addEventListener('click', ev => {
            if (ev.target.classList.contains('del-item')) {
                this.delItem(ev.target);
            }
        })
    }
}

class ProductList {
    constructor() {
        this.products = [];
    }
    fetchProducts() {
        getRequest(`${API}catalogData.json`)
            .then(data => {
                this.products = JSON.parse(data);
                console.log(this.products);
                this.render();
                //Информацию о суммарной стоимости выводим в консоль
                console.log(listProduct.sum()); //Сумма всех товаров
            })
            .catch(text => { console.log(text) })


        // getRequest(`${API}catalogData.json`, (data) => {
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
            const item = new CatalogItem(product);
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

const cart = new Cart();

const listProduct = new ProductList();
listProduct.fetchProducts();



