// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. 
// При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

'use strict';
class FormFeedBack {
    constructor(name, phone, mail, text) {
        this.name = this.getElement(name);
        this.phone = this.getElement(phone);
        this.mail = this.getElement(mail);
        this.text = this.getElement(text);

        this.patterns = {
            name: /^[A-ZА-Я][a-zа-я]+$/,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
        };
    }
    getElement(el) {
        return document.getElementById(`${el}`);
    }
    getValue(el) {
        return el.value;
    }

    validName(){
        let str = this.getValue(this.name);
        if (this.patterns.name.test(str)) {
            this.name.classList.remove('is-invalid');
            this.name.classList.add('is-valid');
            return true;
        } else {
            this.name.classList.add('is-invalid');
            this.name.classList.remove('is-valid');
            return false;
        }
    }
    validPhone(){
        let str = this.getValue(this.phone);
        if (this.patterns.phone.test(str)) {
            this.phone.classList.remove('is-invalid');
            this.phone.classList.add('is-valid');
            return true;
        } else {
            this.phone.classList.add('is-invalid');
            this.phone.classList.remove('is-valid');
            return false;
        }
    }
    validMail(){
        let str = this.getValue(this.mail);
        if (this.patterns.mail.test(str)) {
            this.mail.classList.remove('is-invalid');
            this.mail.classList.add('is-valid');
            return true;
        } else {
            this.mail.classList.add('is-invalid');
            this.mail.classList.remove('is-valid');
            return false;
        }
    }
    validation() {
        if (this.validName() && this.validPhone() && this.validMail()) {
            console.log('Отправлено на сервер');
        } else {
            console.log('Данные не валидны');
        }
        
        
    }
    send() {
        this.validation();
    }
}

const formFeedBack = new FormFeedBack('name', 'phone', 'email', 'text');

document.getElementById('submit').addEventListener('click', () => {
    formFeedBack.send();
});

document.getElementsByClassName('card-body')[0].addEventListener('focusout', (ev) => {
    if (ev.target.id === 'name') {formFeedBack.validName()};
    if (ev.target.id === 'phone') {formFeedBack.validPhone()};
    if (ev.target.id === 'email') {formFeedBack.validMail()};
});