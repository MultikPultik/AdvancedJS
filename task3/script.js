// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. 
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.


// var formName = document.getElementById('name');
var formName = document.querySelector('form');

// console.log(formName.value);
console.log(formName);
    //console.log(str.replace(/ '\s...'/, '"'));
    // console.log(str.replace(/\B'|'\B/g, '"'));

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