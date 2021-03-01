'use strict';

class User {
	constructor(name, age) {
		this.name = name;
		this._age = age;
	}

	say() {
		console.log(`Имя пользователя: ${this.name}, возраст ${this._age}`);
	}

	get age() {
		return this._age;
	}

	set age(age) {
		if (typeof age === 'number' && age > 0 && age < 110) {
			this._age = age;
		} else {
			console.log('Недопустимое значение!');
		}
	}
}

const ivan = new User('Ivan', 27);
console.log(ivan.age); // getter
ivan.age = 99; // setter
console.log(ivan.age); // getter

ivan.say();

// function findNextSquare(sq) {
// 	let sqrt = Math.sqrt(sq);
// 	if (Number.isInteger(sqrt) && sqrt ** 2 === sq) {
// 		sqrt += 1;
// 		return sqrt ** 2;
// 	} else {
// 		return -1;
// 	}
// }

// findNextSquare(25);

// const person = {
// 	name: 'Alex',
// 	age: 25,

// 	get userAge() {
// 		return this.age;
// 	},

// 	set userAge(num) {
// 		this.age = num;
// 	},
// };

// console.log((person.userAge = 30));
// console.log(person.userAge);

window.addEventListener('DOMContentLoaded', () => {
	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	const deadline = '2021-03-12';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((t / (1000 * 60)) % 60);
		const seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');

		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const modalWindow = document.querySelector('.modal');
	const contactUsBtns = document.querySelectorAll('[data-modal]');

	function openModal() {
		modalWindow.classList.add('show', 'fade-fast');
		modalWindow.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	contactUsBtns.forEach((btn) => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modalWindow.classList.add('hide');
		modalWindow.classList.remove('show', 'fade-fast');
		document.body.style.overflow = '';
	}

	modalWindow.addEventListener('click', (event) => {
		if (
			event.target === modalWindow ||
			event.target.getAttribute('data-close') == ''
		) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// Используем классы для карточек

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt} />
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	// getResource('http://localhost:3000/menu').then((data) => {
	// data.forEach(({ img, altimg, title, descr, price }) => {
	// 	new MenuCard(
	// 		img,
	// 		altimg,
	// 		title,
	// 		descr,
	// 		price,
	// 		'.menu .container'
	// 	).render();
	// });
	// });

	axios.get('http://localhost:3000/menu').then((data) => {
		data.data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				'.menu .container'
			).render();
		});
	});

	// Forms

	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с Вами свяжемся.',
		failure: 'Что-то пошло не так...',
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>&times;</div>
			<div class="modal__title">${message}</div>
		</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	// Slider

	const slides = document.querySelectorAll('.offer__slide');
	const prev = document.querySelector('.offer__slider-prev');
	const next = document.querySelector('.offer__slider-next');

	const current = document.querySelector('#current');
	const total = document.querySelector('#total');

	const slidesWrapper = document.querySelector('.offer__slider-wrapper');
	const slidesField = document.querySelector('.offer__slider-inner');
	const width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach((slide) => {
		slide.style.width = width;
	});

	function deleteNotDigits(w) {
		w = +w.replace(/\D/g, '');
		return w;
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	});

	// Калькулятор

	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.classList.remove(activeClass);

			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}

			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings(
		'.calculating__choose_big div',
		'calculating__choose-item_active'
	);

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = ' _ _ _ _ ';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}

	calcTotal();

	function getStaticInfo(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach((elem) => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	getStaticInfo('#gender div', 'calculating__choose-item_active');
	getStaticInfo(
		'.calculating__choose_big div',
		'calculating__choose-item_active'
	);

	function getDynamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '2px solid red';
			} else {
				input.style.border = '2px solid #2eb82e';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}

			calcTotal();
		});
	}

	getDynamicInfo('#height');
	getDynamicInfo('#weight');
	getDynamicInfo('#age');
});

//=====================================================================================================

// showSlides(slideIndex);

// if (slides.length < 10) {
// 	total.textContent = `0${slides.length}`;
// } else {
// 	total.textContent = slides.length;
// }

// function showSlides(n) {
// 	if (n > slides.length) {
// 		slideIndex = 1;
// 	}

// 	if (n < 1) {
// 		slideIndex = slides.length;
// 	}

// 	slides.forEach((item) => item.classList.add('hide'));
// 	slides.forEach((item) => item.classList.remove('show', 'fade'));

// 	slides[slideIndex - 1].classList.add('show', 'fade');
// 	slides[slideIndex - 1].classList.remove('hide');

// 	if (slides.length < 10) {
// 		current.textContent = `0${slideIndex}`;
// 	} else {
// 		current.textContent = slideIndex;
// 	}
// }

// function plusSlides(n) {
// 	showSlides((slideIndex += n));
// }

// prev.addEventListener('click', () => {
// 	plusSlides(-1);
// });

// next.addEventListener('click', () => {
// 	plusSlides(1);
// });

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

// function sayName() {
// 	console.log(this);
// 	console.log(this.name);
// }

// const user = {
// 	name: 'John',
// };

// sayName.call(user); // во внутрь мы передаем контекст вызова,
// который мы хотим передать в эту функцию.

// тоже самое будет и с apply.

// sayName.apply(user);

// function count(num) {
// 	return this * num; // здесь не хватает контекста вызова
// }

// const double = count.bind(2);
// console.log(double(3));
// console.log(double(13));

// В эту переменную мы помещаем новую функцию!
// Число 2 переходит в this!

//Дабл - это новая функция, у которой есть привязанный контекст.

// const newBtn = document.querySelector('.this_btn');

// newBtn.addEventListener('click', function () {
// 	console.log(this); // контекст вызова - сам элемент, на котором произошло событие
// 	this.style.backgroundColor = 'red';
// });

//=========================================================================

// class Rectangle {
// 	constructor(height, width) {
// 		this.height = height;
// 		this.width = width;
// 	}

// 	calcArea() {
// 		return this.height * this.width;
// 	}
// }

// class ColoredRectangleWithText extends Rectangle {
// 	constructor(height, width, text, bgColor) {
// 		super(height, width);
// 		this.text = text;
// 		this.bgColor = bgColor;
// 	}

// 	showMyProps() {
// 		console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
// 	}
// }

// const div = new ColoredRectangleWithText(25, 10, 'Hello World!', 'red');
// div.showMyProps();
// console.log(div.calcArea());
// const square = new Rectangle(10, 10);
// const long = new Rectangle(20, 100);

// console.log(square.calcArea());
// console.log(long.calcArea());

//====================================================================================================

// const log = function (a, b, ...rest) {
// 	console.log(a, b, rest);
// };

// log('basic', 'rest', 'operator', 'usage', 'for sure!');
