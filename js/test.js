'use strict';

// function User(name, id) {
// 	this.name = name;
// 	this.id = id;
// 	this.human = true;
// 	this.hello = function () {
// 		console.log(`Hello, ${this.name}`);
// 	};
// }

// User.prototype.exit = function () {
// 	console.log(`Пользователь ${this.name} ушел`);
// };

// const ivan = new User('Ivan', 28);
// const alex = new User('Alex', 20);

// ivan.exit();

// ivan.hello();
// alex.hello();

// console.log(ivan);
// console.log(alex);

//========================================================================

// function showThis(a, b) {
// 	console.log(this);

// 	function sum() {
// 		console.log(this);
// 		return a + b;
// 	}

// 	console.log(sum());
// }

// showThis(4, 5);

// const obj = {
// 	a: 20,
// 	b: 15,
// 	sum: function () {
// 		function shout() {
// 			console.log(this);
// 		}
// 		shout();
// 	},
// };

// obj.sum();

// function User(name, id) {
// 	this.name = name;
// 	this.id = id;
// 	this.human = true;
// 	this.hello = function () {
// 		console.log('Hello! ' + this.name);
// 	};
// }

// let ivan = new User('Ivan', 23);

function sayName() {
	console.log(this);
	console.log(this.name);
}

const user = {
	name: 'John',
};

sayName.call(user); // во внутрь мы передаем контекст вызова,
// который мы хотим передать в эту функцию.

// тоже самое будет и с apply.

sayName.apply(user);

function count(num) {
	return this * num; // здесь не хватает контекста вызова
}

const double = count.bind(2);
console.log(double(3));
console.log(double(13));

// В эту переменную мы помещаем новую функцию!
// Число 2 переходит в this!

//Дабл - это новая функция, у которой есть привязанный контекст.

const newBtn = document.querySelector('.this_btn');

newBtn.addEventListener('click', function () {
	console.log(this); // контекст вызова - сам элемент, на котором произошло событие
	this.style.backgroundColor = 'red';
});

//=========================================================================

class Rectangle {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}

	calcArea() {
		return this.height * this.width;
	}
}

class ColoredRectangleWithText extends Rectangle {
	constructor(height, width, text, bgColor) {
		super(height, width);
		this.text = text;
		this.bgColor = bgColor;
	}

	showMyProps() {
		console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
	}
}

const div = new ColoredRectangleWithText(25, 10, 'Hello World!', 'red');
div.showMyProps();
console.log(div.calcArea());
// const square = new Rectangle(10, 10);
// const long = new Rectangle(20, 100);

// console.log(square.calcArea());
// console.log(long.calcArea());

//==============================================================================================

const log = function (a, b, ...rest) {
	console.log(a, b, rest);
};

log('basic', 'rest', 'operator', 'usage', 'for sure!');
//==============================================================================================

const person = {
	name: 'Alex',
	tel: '+744444444',
	parents: {
		mom: 'Olga',
		dad: 'Mike',
	},
};

const clone = JSON.parse(JSON.stringify(person));
clone.parents.mom = 'Ann';
console.log(person);
console.log(clone);
