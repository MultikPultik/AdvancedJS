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
            name: /^[a-zа-я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            mail: /^[\w._-]+@\w+\.[a-z]{2,4}$/i,
        };
    }
    getElement(element) {
        return document.getElementById(`${element}`);
    }
    getName() {
        return this.name.value;
    }
    getPhone() {
        return this.phone.value;
    }
    getMail() {
        return this.mail.value;
    }
    getText() {
        return this.text.value;
    }


    validation() {
        let str = this.getName();
        if (this.patterns.name.test(str)) {
            this.name.classList.remove('is-invalid');
            this.name.classList.add('is-valid');
        } else {
            this.name.classList.add('is-invalid');
            this.name.classList.remove('is-valid');
        }
        str = this.getPhone();
        if (this.patterns.phone.test(str)) {
            this.phone.classList.remove('is-invalid');
            this.phone.classList.add('is-valid');
        } else {
            this.phone.classList.add('is-invalid');
            this.phone.classList.remove('is-valid');
        }
        str = this.getMail();
        if (this.patterns.mail.test(str)) {
            this.mail.classList.remove('is-invalid');
            this.mail.classList.add('is-valid');
        } else {
            this.mail.classList.add('is-invalid');
            this.mail.classList.remove('is-valid');
        }
    }
    send() {
        this.validation();
    }
}

document.getElementById('submit').addEventListener('click', () => {
    const formFeedBack = new FormFeedBack('name', 'phone', 'email', 'text');
    formFeedBack.send();
});
