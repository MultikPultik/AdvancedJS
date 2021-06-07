'use strict';

Vue.component('error', {
    data() {
        return {
            text: '',
        }
    },
    methods: {
        showError(err) {
            this.text = err;
            console.log(this.text);
        },

    },
    computed: {
        isCatalogEmpty() {
            return this.text !== '';
        }
    },
    template: `
    <h1 v-show="isCatalogEmpty">Нет данных от сервера ({{text}})</h1>
    `
})