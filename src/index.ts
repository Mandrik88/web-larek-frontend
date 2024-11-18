import { IProductData } from './types/index';
import { CategoryType } from './types/index';
// import { Page } from './components/common/Page';
import { IProduct, IOrderResponse, IUser, IOrderBasket } from './types/index';
import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ModelProducts } from './components/ModelApp';
import { API_URL, CDN_URL } from './utils/constants';
import { ApiLarek } from './components/ApiLarek';
// import { IOrderResponse, IProduct, IUser } from './types';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, OnlyCardOnPage, CardWithIndex, CardPreview } from './components/Cards';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { Basket } from './components/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success, ISuccess } from './components/Success';
import { Form } from './components/common/Form';

const events = new EventEmitter();
const api = new ApiLarek(API_URL, CDN_URL);

//Модель данных приложения
const model = new ModelProducts({}, events);

//все шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); //Каталог карточек
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview'); //предпросмотр карточки
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket'); //модальное окно корзины
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket'); //пункт в корзине
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

//Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate<HTMLFormElement>(orderTemplate), events);
const contacts = new Contacts(
	cloneTemplate<HTMLFormElement>(contactsTemplate),
	events
);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

//Дальше идет бизнес-логика приложения
//Ловим событие и делаем то, что нужно

// изменились элементы каталога
events.on('items:changed', () => {
	page.catalog = model.getProducts().map((item) => {
		const card = new OnlyCardOnPage(cloneTemplate(catalogCardTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			id: item.id,
			title: item.title,
			category: item.category as CategoryType,
			image: api.cdn + item.image,
			price: item.price,
		});
	});
});

// клик пользователя по карте
events.on('card:select', (item: IProduct) => {
	//  console.log('Card selected:', item);
	model.setPreview(item); // ловим событие preview:changed
});

// отображение предпросмотра карточки
events.on('preview:change', (item: IProduct) => {
	// console.log('Preview data received:', item);

	const productInBasket = model.isProductsInBasket(item.id);
	console.log('Product in basket:', productInBasket); //Проверка наличия продукта в корзине
	console.log(
		'Button text:',
		productInBasket ? 'Удалить из корзины' : 'В корзину'
	);
	const cardprePreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (productInBasket) {
				events.emit('basket:delete', item);
			} else {
				events.emit('card:toBasket', item);
			}
			modal.close();
		},
	});

	modal.render({
		content: cardprePreview.render({
			id: item.id,
			title: item.title,
			price: item.price,
			category: item.category as CategoryType,
			image: api.cdn + item.image,
			description: item.description,
			button: productInBasket ? 'Удалить из корзины' : 'В корзину',
		}),
	});
});

// открываем корзину
events.on('basket:open', () => {
	modal.render({
		content: basket.render({}),
	});
});

//фиксируем изменение корзины
events.on('basket:change', () => {
	console.log('Изменение корзины произошло!');
	page.counter = model.getCountsInBasket();
	basket.total = model.getAllPrice();
	basket.list = model.getBasket().map((item, index) => {
		const cardBasket = new CardWithIndex(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basket:delete', item),
		});
		// cardBasket.index = index + 1;
		return cardBasket.render({
			price: item.price,
			title: item.title,
			index: index + 1,
		});
	});
});
// добавляем товар в корзину
events.on('card:toBasket', (item: IProduct) => {
	// console.log('перед добавление товара', model.basket)
	model.addToBasket(item.id);
	// console.log('после добавление товара', model.basket)
});

//удаляем товар из корзины
events.on('basket:delete', (item: IProduct) => {
	model.deleteFromBasket(item.id);
});

// начало формления заказа (событие нажатия на кнопку "оформить")
events.on('basket:placeOnOrder', () => {
	console.log('Событие basket:placeOnOrder было вызвано!');
	// очищаем форму и данные перед новым заказом
	const userInfo = model.getUserInfo(); //из модели получаю данные пользователя

	model.clearUser();
	modal.render({
		content: order.render({
			valid: false,
			errors: [],
			address: userInfo.address,
			payment: userInfo.payment,
		}),
	});
});

// Изменение текста ошибок
events.on('input:error', (errors: Partial<IUser>) => {
	// Обработка ошибок
	handleErrors(errors);
	// Обработка корректных данных
	updateUserData(errors);
});
function handleErrors(errors: Partial<IUser>) {
	// Извлекаем ошибки
	const { payment, address, email, phone } = errors;
	order.valid = !payment && !address;
	contacts.valid = !email && !phone;
	//формируем сообщения об ошибках
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
}
function updateUserData(_errors: Partial<IUser>) {
	// Обновляем данные о платеже
	order.payment = model.getFieldPayment();
}

// ловим событие запуска валидации
events.on('input:validate', (data: { field: keyof IUser; value: string }) => {
	model.fillUsercontacts(data.field, data.value);
});

//ловим событие отправки формы
events.on('order:submit', () => {
	// console.log('вызвали order:submit')
	modal.render({
		content: contacts.render({
			valid: false,
			errors: [],
		}),
	});
});

// отправляем контактные данные
events.on('contacts:submit', () => {
	console.log('вызвали contact:submit');
	const orderInfo = model.getUserInfo();
	// orderInfo.total = model.getAllPrice()
	// console.log('работает', orderInfo);
	// Получаем общую стоимость заказа из модел

	const items = model.getIdProductsInBasket();
	// console.log(items);

	// Формируем payload для отправки
	const payload: IOrderResponse = {
		payment: orderInfo.payment,
		address: orderInfo.address,
		email: orderInfo.email,
		phone: orderInfo.phone,
		total: model.getAllPrice(),
		items: items,
	};
	// console.log('Payload для отправки:', payload);

	api
		.orderProductsResponse(payload)
		.then((result) => {
			events.emit('order:success', result);
			model.clearBasket();
		})
		.catch((error) => {
			console.error('Ошибка отправки заказа:', error);
		});
});

// событие успешного оформления заказа
events.on('order:success', (result: ISuccess) => {
	modal.render({
		content: success.render({
			total: result.total,
		}),
	});
	// order.clear();
	// contacts.clear();
	model.clearBasket();
});
// // Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// // ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получение списка карточек
api
	.getProductsItem()
	.then(model.addProducts.bind(model))
	.catch((err) => {
		console.log(err);
	});

// const userAddress = model.userData.address;
// console.log('User Address:', userAddress);
