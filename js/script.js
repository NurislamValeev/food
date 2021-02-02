window.addEventListener('DOMContentLoaded', () => {
	// Tabs

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach((item) => {
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		// tabsContent[i].style.display = 'block';
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
	const modalClose = document.querySelector('[data-close]');

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

	modalClose.addEventListener('click', closeModal);

	modalWindow.addEventListener('click', (event) => {
		if (event.target === modalWindow) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 5000);

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
});

function User(name, id) {
	this.name = name;
	this.id = id;
	this.human = true;
	this.hello = function () {
		console.log(`Hello, ${this.name}`);
	};
}

User.prototype.exit = function () {
	console.log(`Пользователь ${this.name} ушел`);
};

const ivan = new User('Ivan', 28);
const alex = new User('Alex', 20);

ivan.exit();

ivan.hello();
alex.hello();

console.log(ivan);
console.log(alex);
