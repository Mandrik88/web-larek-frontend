// import { IUser } from './../../../types/index';
// import { IProduct } from './../../../types/index';
// import { IUser } from './../../../types/index';
import { Model } from './base/Model';
import {
	IProduct,
	IUser,
	IModelProducts,
	FormErrors,
	PaymentMethod,
	IOrderResponse,
	IOrderForm,
} from '../types';

import { IEvents } from './base/events';
//класс ModelProducts ипользуется для управления состоянием приложения, является наследником класса Model, параметром которого явлется интерфейс IModelProduct
export class ModelProducts extends Model<IProduct> {
	items: IProduct[] = []; //массив с карточками товаров
	preview: string; //предварительный просмотр товара
	basket: IProduct[] = []; //массив для хранения товаров добавленных в корзину
	userData: IUser = {}; //свойство харнит информацию о пользователе
	formErrors: FormErrors = {}; //свойство исп для хранения ошибок в форме валидации

	constructor(data: Partial<IProduct>, events: IEvents) {
		super(data, events);
		this.userData = {
			payment: '',
			address: '',
			email: '',
			phone: ''
		};
	}

	//метод добавления массива с товарами в модель
	addProducts(cards: IProduct[]) {
		this.items = cards;
		this.events.emit('items:changed');
	}

	//метод получения массива с товарами
	getProducts(): IProduct[] {
		return this.items;
	}

	//метод для получения данных о пользователе
	getUserInfo() {
		return this.userData;
	}

	//метод предпросмотра карточки товара при клике на нее
	setPreview(card: IProduct) {
		this.preview = card.id;
		this.events.emit('preview:change', card);
	}

	//метод добавления в корзину
	addToBasket(id: string): void {
		this.basket.push(this.getIdCard(id));
		this.events.emit('basket:change', this.basket);
	}
	
	//метод провекри наличия товара в корзине
	isProductsInBasket(id: string): boolean {
		return this.basket.some((item) => item.id === id);
	}

	//метод удаления товара из корзины
	deleteFromBasket(id: string) {
		this.basket = this.basket.filter((item) => item.id !== id);
		this.events.emit('basket:change', this.basket);
	}

	//метод очистки корзины
	clearBasket() {
		this.basket = [];
        this.events.emit('basket:change', this.basket);
	}

	//метод получения количества товаров в корзине
	getCountsInBasket() {
		return this.basket.length;
	}

	//метод получения списка ID товаров в корзине
	getIdProductsInBasket() {
		return this.basket.map((item) => item.id);
	}

	//метод получения карточки по ID
	getIdCard(id: string): IProduct {
		return this.items.find((item) => item.id === id);
	}


	//метод получения общей стоимости товаров в корзине
	getAllPrice() {
		return this.basket.reduce((acc, item) => acc + item.price, 0);
	}

	//метод для заполнения полей с контактными данными пользователя
	fillUsercontacts(field: keyof IUser, value: string): void {
		this.userData[field] = value;
		if (this.validateContact()) {
			this.events.emit('order:ready', this.userData);
		} 
	  }
	
	//метод получения ошибок формы
	getFormErrors() {
		return this.formErrors;
	}
	//метод получения полей c выбором тпа оплаты
	getFieldPayment() {
		return this.userData.payment;
	}

	//возвращает массив товаров в корзине
	getBasket(): IProduct[] {
		return this.basket;
	}

	//метод валидации формы с полями ввода addreess, email, phone
	validateContact(): boolean {
		const errors: typeof this.formErrors = {};
		//Если не указан адрес или способ оплаты, то в объект errors добавляются соответствующие сообщения об ошибке
		if (!this.userData.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.userData.payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this.userData.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.userData.phone) {
			errors.phone = 'Необходимо указать номер телефона';
		}
		this.formErrors = errors;
		this.events.emit('input:error', this.formErrors);
		//Функция возвращает true, если ошибок нет (длина массива ключей ошибок равна 0), и false в противном случае.
		return Object.keys(errors).length === 0;
	}

	//метод очистки корзины после заказа
	clearUser() {
		this.userData = {
			payment: '',
			address: '',
			email: '',
			phone: '',
		};
		this.formErrors = {};
		this.events.emit('input:error', this.formErrors);
	}
}
