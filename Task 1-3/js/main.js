// 1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
// 2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
// 3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?

// 2. Упростить запись функций можно используя применение стрелочных функции.
// 3. Это происходит из-за того, что в innerHTML передается массив объектов, а элементы массива разделяются запятой. Для устранения этого
//    недостатка необходимо передавать не сразу весь массив, а отдельно по каждому элементу. Это сделано в коде ниже в цикле "for of".


const products = [
    { id: 1, title: 'Notebook', price: 20000, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
    { id: 2, title: 'Mouse', price: 1500, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
    { id: 3, title: 'Keyboard', price: 5000, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
    { id: 4, title: 'Gamepad', price: 4500, img: 'https://fakeimg.pl/250x250/282828/eae0d0/' },
];

const renderProduct = (title = 'Товар', price = '10000', img = 'https://fakeimg.pl/250x250/282828/eae0d0/') => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <img src= "${img}?text=${title}&font=retina" alt="">
                <p>${price} руб.</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

//Это первый вариант

// const renderProducts = (list) => {
//     const productList = list.map((product) =>{
//         return renderProduct(product.title, product.price, product.img);
//     });
//     console.log(productList);
    
//     for (let val of productList) {
//         document.querySelector('.products').insertAdjacentHTML('beforeend', val);
//     }
// };


//Это второй вариант (более короткий)
const renderProducts = (list) => {
    list.forEach(product => {
        document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(product.title, product.price, product.img));
    });
};

renderProducts(products);
