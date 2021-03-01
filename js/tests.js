'use strict';

// =========Промисы==========

// console.log('Запрос данных...');

// const req = new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		console.log('Подготовка данных...');

// 		const product = {
// 			name: 'TV',
// 			price: 2500,
// 		};

// 		resolve(product);
// 	}, 2000);
// });

// req
// 	.then((product) => {
// 		return new Promise((resolve, reject) => {
// 			setTimeout(() => {
// 				product.status = 'ordered';
// 				resolve(product);
// 			}, 2000);
// 		});
// 	})
// 	.then((data) => {
// 		data.modify = true;
// 		return data;
// 	})
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch(() => {
// 		console.error('Произошла ошибка');
// 	})
// 	.finally(() => {
// 		console.log('Finally');
// 	});

const test = (time) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), time);
	});
};

// test(1000).then(() => console.log('1000 ms'));
// test(2000).then(() => console.log('2000 ms'));

// Promise.all([test(1000), test(2000)]).then(() => {
// 	console.log('All');
// });

// Promise.race([test(1000), test(2000)]).then(() => {
// 	console.log('All');
// });

// ======== Методы перебора массивов ========

// filter

// const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];

// const shortNames = names.filter(function (name) {
// 	return name.length < 5;
// });

// console.log(shortNames);

// ============ map ==================

// let answers = ['IvAn', 'AnnA', 'HElLO'];

// answers = answers.map((item) => item.toLowerCase());

// console.log(answers);

//========== every/some ===============

// const some = [4, 'eqwewqf', 'eqweq23f'];

// console.log(some.some((item) => typeof item === 'number'));
// console.log(some.every((item) => typeof item === 'number'));

//================ reduce =====================

// const arr = [4, 5, 1, 3, 2, 6];

// const res = arr.reduce((sum, current) => sum + current);

// console.log(res);

// const arr = ['apple', 'banana', 'strawberry'];

// const res = arr.reduce((sum, current) => `${sum}, ${current}`);

// console.log(res);

// const obj = {
// 	ivan: 'person',
// 	ann: 'person',
// 	dog: 'animal',
// 	cat: 'animal',
// };

// const newArr = Object.entries(obj)
// 	.filter((item) => item[1] === 'person')
// 	.map((item) => item[0]);

// console.log(newArr);
