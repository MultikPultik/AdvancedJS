// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. 
// Придумать шаблон, который заменяет одинарные кавычки на двойные.

let str = "В кавычки заключаются имена собственные, являющиеся названиями: произведений литературы и искусства: комедия 'Недоросль', картина 'Три богатыря', опера 'Иван Cусанин', фильм `Золушка`.";

console.log(str.replace(/'/g,'"'));

// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

str = "I've got a family. It is 'small'. We are a 'family' of four. I've got a father, a mother and a brother. I haven't got a sister.";

//console.log(str.replace(/ '\s...'/, '"'));
console.log(str.replace(/\B'|'\B/g, '"'));