'use strict';

Vue.component('search', {
    props: ['goods'],
    data() {
        return {
            search: '',
            searchGoods: [],    //найденные товары
        };
    },
    methods: {
        clickSearch() {
            this.searchGoods = this.searchProduct(this.search);
            this.$emit('search-to-main', this.searchGoods);
        },

        searchProduct(str) {

            let s = this.goods.filter(el => {
                let s = new RegExp(str, "gim");
                return (s.test(el.product_name));
            })
            return s;
        },
    },
    template:
        `<li>
            <input class="form-control mr-sm-2" type="text" placeholder="Поиск товара" aria-label="Search" @keyup="clickSearch" v-model="search" />
        </li>`
});