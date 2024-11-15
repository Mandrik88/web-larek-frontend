//модель для хранения товаров в каталоге
export interface IProductData {
	catalog: IProduct[];
}

//Данные о товаре
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	button?: string;
	index?: number;
}
//  категории товаров
export type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type CategoryList = {
	[Key in CategoryType]: string;
};
//Данные о пользователе
export interface IUser {
	payment?: string;
	address?: string;
	email?: string;
	phone?: string;
	
}

export interface IOrderForm {
	email: string;
	phone: string;
	address: string;
	payment: string;
	total?: string | number;
}

//Интрефейс для валидации форм
export interface IForm {
	valid: boolean;
	errors: string[];
}
//интерфейс корзины с суммой заказа и списком ID товаров
export interface IOrderBasket {
	list: HTMLElement[]; // Массив карточек в корзине
	total: string | number; // Общая стоимость заказа
}

// Данные о заказе
export interface IOrderResponse extends IOrderForm {
	items: string[]; // Идентификатор заказа
}
//Модель данных
export interface IModelProducts {
	addToBasket(id: string): void; //метод добавления товара в корзину
	deleteFromBasket(id: string): void; //метод удаления товара из корзины
	clearBasket(): void; //метод очистки корзины
	getCountsInBasket(): number; //метод получения количества товаров в корзине
	isProductsInBasket(id: string): boolean; //метод для проверки наличия товаров в корзине
	getIdProductsInBasket(): void; //метод получения списка ID товаров в корзине
	getAllPrice(): void; //метод получения общей стоимости товаров в корзине
	addProducts(card: IProduct[]): void; //метод добавления каталога с товарами(массива)
	getProducts(): IProduct[]; //метод получения каталога с товарами
	setPreview(card: IProduct[]): void; //метод получения превью товара
	fillUserContacts(field: IUser, value: string): void; //метод для заполнения полей с контактными данными пользователя
	validateContacts(): boolean; //метод валидации формы с полями в// validateOrder(): boolean; //метод валидации формы с заказом
	clearUser(): boolean; //метод очистки данных о пользователе
	getFormErrors(): void; //метод получения ошибок формы
	getFieldPayment(): void; //метод получения полей
	getIdCard(id: string): void; //метод получения карточки по ID
	getBasket(): IProduct[]; //метод возвращает массив товаров в корзине
	getUserInfo(): void; //метод получения данных о пользователе
}

//тип определения способа оплаты
export type PaymentMethod = 'cash' | 'online' | null;

//тип используется для описания объектов, которые могут содержать сообщения об ошибках, связанных с формами
export type FormErrors = Partial<Record<keyof IUser, string>>;
