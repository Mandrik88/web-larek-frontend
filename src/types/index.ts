//модель для хранения товаров в каталоге
export interface IProductData {
	counter: number;
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
	//   button?: string
	// index?: number
}

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
}

//Интрефейс для валидации форм
export interface IForm {
	valid: boolean;
	errors: string[];
}
//интерфейс корзины с суммой заказа и списком ID товаров
export interface IOrderBasket {
	totalamount: number;
	productListItem: IProduct[];
}

// Данные о заказе
export interface IOrderResponse extends IUser {
	items: string[]; // Идентификатор заказа
}
//Модель данных
export interface IModelProducts {
	addToBasket(): void; //метод добавления товара в корзину
	deleteFromBasket(): void; //метод удаления товара из корзины
	clearBasket(): void; //метод очистки корзины
	getCountsInBasket(): number; //метод получения количества товаров в корзине
	isProductsInBasket(): boolean; //метод для проверки наличия товаров в корзине
	getIdProductsInBasket(): void; //метод получения списка ID товаров в корзине
	getAllPrice(): void; //метод получения общей стоимости товаров в корзине
	addProducts(): IProduct[]; //метод добавления каталога с товарами(массива)
  getProducts(): IProduct[]; //метод получения каталога с товарами
	setPreview(): void; //метод получения превью товара
	fillUserContacts(field: IUser, value: string): void; //метод для заполнения полей с контактными данными пользователя
	validateContacts(): boolean; //метод валидации формы с полями ввода adreess, email, phone и формой заказа
	// validateOrder(): boolean; //метод валидации формы с заказом
	clearUser(): boolean; //метод очистки данных о пользователе
	getFormErrors(): void; //метод получения ошибок формы
	getFieldPayment(): void; //метод получения полей
	
}

//тип определения способа оплаты
export type PaymentMethod = 'cash' | 'online' | null;

//тип используется для описания объектов, которые могут содержать сообщения об ошибках, связанных с формами
export type FormErrors = Partial<Record<keyof IUser, string>>;
