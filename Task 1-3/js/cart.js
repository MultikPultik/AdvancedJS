// Vue.component('search-el', {

// });
'use strict';

Vue.component('cart', {
  data() {
    return {
      isVisibleCart: false,
      cartBadge: '',
      price: '0',
      cartGoods: [],      //товары в корзине
      cartUrl: 'getBasket.json',
      imgCartUrl: 'https://fakeimg.pl/70x70/282828/eae0d0/',
      addToBasket: 'addToBasket.json',
      deleteFromBasket: 'deleteFromBasket.json',
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

  template: `
    <div>
      <li @click="isVisibleCart = !isVisibleCart"><a href="#" id="cart"><i class="fa fa-shopping-cart">
        </i> Cart <span class="badge">{{cartBadge}}</span></a>
      </li>
      <div class="shopping-cart" v-show="isVisibleCart">
        <div class="shopping-cart-header">
          <i class="fa fa-shopping-cart cart-icon"></i><span class="badge">{{ cartBadge }}</span>
          <div class="shopping-cart-total">
            <span class="lighter-text">Общая стоимость:</span>
            <span class="main-color-text total-price">{{ price }} &#8381;</span>
          </div>
        </div>

        <table class="table table-hover">
          <thead class="table-light">
          </thead>
          <tbody class="cart-container">
            <tr class="cart-item" v-for="product of cartGoods" :key="product.id_product">
              <td>
              <img :src="imgCartUrl" alt="someImg" />
              </td>
            <td>{{ product.product_name }}</td>
            <td class="quantity">х {{ product.quantity }}</td>
            <td>{{ product.price }} &#8381;</td>
            <td>
              <a href="#"><i class="bi bi-x-circle del-item "@click="deleteProduct(product)"></i></a>
              </td>
            </tr>
            </tbody>
        </table>
      </div>
    </div >`

});