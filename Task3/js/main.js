// 3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:

//     ### Маленький (50 рублей, 20 калорий).
//     ### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
//     ### С сыром (+10 рублей, +20 калорий).
//     ### С салатом (+20 рублей, +5 калорий).
//     ### С картофелем (+15 рублей, +10 калорий). ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

'use strict';

class ProductInfo {
    constructor(element) {
        this.name = element.dataset.name;
        this.price = element.dataset.price;
        this.calories = element.dataset.calories;
    }
}

class Hamburger {
    constructor(size, staffing, extra) {
        this.size = new ProductInfo(this.getSize(size));
        this.staffing = new ProductInfo(this.getStaffing(staffing));
        this.extra = this.getExtra(extra);
    }
    getSize(name) {
        return document.querySelector(`input[data-name="${name}"]:checked`);
    }
    getStaffing(name) {
        return document.querySelector(`input[data-name="${name}"]:checked`);
    }
    getExtra(name) {
        let el = [...document.querySelectorAll(`input[data-name="${name}"]:checked`)];
        let result = [];
        el.forEach(el => (result.push(new ProductInfo(el))));
        return result;
    }
    calculatePrice() {
        let sum = (+this.size.price) + (+this.staffing.price) + this.extra.reduce((prev, curr) => { return prev + (+curr.price); }, 0);
        return sum;
    }
    calculateCalories() {
        let sum = (+this.size.calories) + (+this.staffing.calories) + this.extra.reduce((prev, curr) => { return prev + (+curr.calories); }, 0);
        return sum;
    }

    render() {
        document.getElementById('summa').innerHTML = '';
        document.getElementById('summa').insertAdjacentHTML(
            'beforeend', 
            `<p class="card-text">Цена: ${this.calculatePrice()} рублей</p>`
        );
        document.getElementById('summa').insertAdjacentHTML(
            'beforeend', 
            `<p class="card-text">Число калорий: ${this.calculateCalories()}</p>`
        );
    }

}

document.getElementById('calc').addEventListener('click', () => {
    const hamburger = new Hamburger('size', 'staffing', 'extra');
    hamburger.render();
});
