//Данные о товаре
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

//Данные о пользователе
export interface IUser {
    paiment?: string;
    adress?: string;
    email?: string;
    phone?: string;
}
//модель для хранения товаров в каталоге
export interface IProductData {
    counter: number
    catalog: IProduct[]
  }

  export interface IOrderForm {
    email: string;
    phone: string;
    adress: string;
}

export interface IForm {
    valid: boolean
    errors: string[]

  }

  export interface IOrder {
    totalamount: number
    productListItem: IProduct[]
  }
  
//используется для описания объектов, которые могут содержать сообщения об ошибках, связанных с формами
  export type FormErrors = Partial<Record<keyof IUser, string>>;

  //Модель данных
  export interface IModelProducts {
  addToBasket(): void; //метод добавления товара в корзину
deleteFromBasket(): void; //метод удаления товара из корзины
clearBasket(): void; //метод очистки корзины
getCountsInBasket(): number; //метод получения количества товаров в корзине
isProductsInBasket(): boolean; //метод для проверки наличия товаров в корзине
getProductsInBasket(): void; //метод получения списка ID товаров в корзине
getAllPrice(): void; //метод получения общей стоимости товаров в корзине
addProducts(): IProduct[]; //метод добавления каталога с товарами(массива)
setPreview(): void; //метод получения превью товара
fillUserContacts(field: IUser, value: string): void; //метод для заполнения полей с контактными данными пользователя
validateContacts(): boolean; //метод валидации формы с полями ввода adreess, email, phone
validateOrder(): boolean; //метод валидации формы с заказом
claerUser(): boolean; //метод очистки данных о пользователе
  }
