// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

// 'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
class BaseCatalog {

    constructor(url, container) {
        this.catalogGoods = []; //товары в каталоге
        this.cartGoods = [];    //товары в корзине
        this.container = container;
        this.url = url;
    }

    getData(url) {
        return fetch(`${API + url}`)
            .then(response => response.json())
            .catch(error => {
                console.log('Ошибка получения данных от сервера');
            })
    }
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
                    <button class="by-btn"
                    data-id="${this.id}"
                    data-title="${this.title}"
                    data-price="${this.price}">Добавить в корзину</button>
                </div>`;
    }
}

class Catalog extends BaseCatalog {
    constructor(cart, container = '.products', url = 'catalogData.json') {
        super(url, container);
        this.cart = cart;
        this.init();
    }

    init() {
        this.fetchProducts();
        this.render();
        document.querySelector(this.container).addEventListener('click', (ev) => {
            if (ev.target.classList.contains('by-btn')) {
                this.cart.addProduct(ev.target);
            }
        });
    }

    fetchProducts() {
        this.getData(this.url)
            .then(data => {

                console.log('Данные от сервера для каталога - ', data);
                this.catalogGoods = data;
                this.render();
            });
    }

    render() {

        let contentHTML = '';
        this.catalogGoods.forEach(product => {
            const item = new CatalogItem(product);
            contentHTML += item.getHTML();
        });
        document.querySelector('.products').insertAdjacentHTML('beforeend', contentHTML);
    }

}

class CartItem extends Item {
    constructor(el) {
        super(el);
        this.quantity = el.quantity;
    }
    getHTML() {
        return `<tr class="cart-item" data-id="${this.id}">
                    <td>
                        <img src="${this.linkImg}" alt="someImg" />
                    </td>
                    <td>${this.title}</td>
                    <td class="quantity">х ${this.quantity}</td>
                    <td>${this.price} &#8381;</td>
                    <td>
                        <a href="#"><i class="bi bi-x-circle del-item" data-id="${this.id}"></i></a>
                    </td>
                </tr>`;
    }
}

class Cart extends BaseCatalog {
    constructor(container = ".cart-container", url = 'getBasket.json') {
        super(url, container);
        this.container = container;
        this.init();
    }

    init() {
        this.fetchProducts();
        document.querySelector(this.container).addEventListener('click', ev => {
            if (ev.target.classList.contains('del-item')) {
                this.delProduct(ev.target);
            }
        })
    }

    render() {
        this.cartGoods.forEach(element => {
            let contentHTML = '';
            const item = new CartItem(element);
            contentHTML += item.getHTML();
            document.querySelector(this.container).insertAdjacentHTML('beforeend', contentHTML);
            
            document.querySelector('.total-price').textContent = this.sum();
            this.updateBadge();
        });
    }

    fetchProducts() {
        this.getData(this.url)
            .then(data => {
                console.log('Данные от сервера для корзины - ', data);
                this.cartGoods = data.contents;
                console.log('Товары в корзине - ', this.cartGoods);
                this.render();
            });
    }

    sum() {
        return this.cartGoods.reduce((accum, curr) => {
            return accum + curr.price * curr.quantity;
        }, 0);
    }

    update(el) {
        let prod = document.querySelector(`.cart-item[data-id="${el.id_product}"]`);
        prod.querySelector('.quantity').textContent = `x ${el.quantity}`;

        document.querySelector('.total-price').textContent = this.sum();
        this.updateBadge();
    }

    updateBadge() {
        let block = document.querySelector('.shopping-cart');
        block.querySelector('.badge').textContent = this.cartGoods.length;
        block = document.querySelector('nav');
        block.querySelector('.badge').textContent = this.cartGoods.length;
    }

    addProduct(el) {
        this.getData('addToBasket.json')
            .then(data => {
                if (data.result === 1) {
                    let findElement = this.cartGoods.find(prod => { return prod.id_product === +el.dataset['id'] });
                    if (findElement) {
                        console.log('такой товар есть');
                        findElement.quantity += 1;
                        this.update(findElement);
                        console.log(this.cartGoods);
                    } else {
                        console.log('такого товара нет');
                        let product = {
                            id_product: +el.dataset['id'],
                            product_name: el.dataset['title'],
                            price: +el.dataset['price'],
                            quantity: 1,
                        }
                        const item = new CartItem(product);
                        const contentHTML = item.getHTML();
                        document.querySelector(this.container).insertAdjacentHTML('beforeend', contentHTML);
                        this.cartGoods.push(product);
                        console.log(this.cartGoods);
                        
                        document.querySelector('.total-price').textContent = this.sum();
                        this.updateBadge();
                    }
                }
            })
    }

    delProduct(el) {
        this.getData('deleteFromBasket.json')
            .then(data => {
                if (data.result === 1) {
                    let dataId = +el.dataset['id'];
                    let findElement = this.cartGoods.find(prod => { return prod.id_product === +el.dataset['id'] });
                    if (findElement.quantity > 1) {
                        findElement.quantity -= 1;
                        this.update(findElement);
                    } else {
                        document.querySelector(`.cart-item[data-id="${dataId}"]`).remove();
                        let index = this.cartGoods.findIndex(el => el.id_product === dataId);
                        this.cartGoods.splice(index, 1);
                        console.log('удален товар с id =', dataId);
                        console.log('теперь в корзине - ', this.cartGoods);
                        
                        document.querySelector('.total-price').textContent = this.sum();
                        this.updateBadge();
                    }
                } else {
                    console.log('ошибка удаления с сервера');
                }
            })
    }

}

const cart = new Cart();
const listProduct = new Catalog(cart);
