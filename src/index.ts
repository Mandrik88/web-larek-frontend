import { CategoryType, IProductData } from './types/index';
// import { Page } from './components/common/Page';
 import { IProduct, IOrderResponse, IUser } from './types/index';
import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { ModelProducts } from './components/common/ModelApp';
import { API_URL, CDN_URL } from './utils/constants';
import { ApiLarek } from './components/common/ApiLarek';
// import { IOrderResponse, IProduct, IUser } from './types';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, OnlyCardOnPage, ICardActions, CardPreview } from './components/common/Cards'
import { Page } from './components/common/Page'
import { Modal } from './components/common/Modal';
import { Basket} from './components/common/Basket'




// События
const events = new EventEmitter();

//Модель данных приложения
const model = new ModelProducts ({}, events);

const api = new ApiLarek(API_URL, CDN_URL);

//все шаблоны
const catalogCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); //Каталог карточек
  const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');//предпросмотр карточки
 
// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);



// const test = [
   
//     {
//         "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
//         "description": "Если планируете решать задачи в тренажёре, берите два.",
//         "image": "/5_Dots.svg",
//         "title": "+1 час в сутках",
//         "category": "софт-скил",
//         "price": 750
//     },
//     {
//         "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
//         "description": "Если планируете решать задачи в тренажёре, берите два.",
//         "image": "/5_Dots.svg",
//         "title": "+1 час в сутках",
//         "category": "софт-скил",
//         "price": 750
//     },
   
// ]

// const card = {
//     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "description": "Если планируете решать задачи в тренажёре, берите два.",
//     "image": "/5_Dots.svg",
//     "title": "+1 час в сутках",
//     "category": "софт-скил",
//     "price": 750
// }


// //Tест добавления каталога товаров//
// console.log('Перед добавлением товаров:', model.items); // Состояние массива до добавления
// model.addProducts(test); // Вызываем метод для добавления товаров
// console.log('После добавления товаров:', model.items); // Состояние массива после добавления


// // //Tест предпросмотра карточки товара//
// Выводим оригинальное состояние
// console.log('До вызова setPreview:');
// console.log('preview:', model.preview);
// // Вызываем метод setPreview
// model.setPreview(card);
// // Выводим значение preview после вызова метода
// console.log('После вызова setPreview:');
// console.log('preview:', model.preview);


// //Тест добавления товаров в корзину//
// // console.log('перед добавлением товаров:', model.basket);
// // model.addToBasket(card);
// // console.log('после тобавления товаров:', model.basket);


// // //Тест метода удаления товаров из корзины
// // console.log('перед удалением:', model.basket);
// // model.deleteFromBasket('1')
// // console.log('после удаления:', model.basket);


// // //Тест метода проверки наличия товара в корзине//
// // // Добавляем товары в корзину
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // // Проверяем наличие товара с id '1'
// // const productIdToCheck = '854cef69-976d-4c2a-a18c-2aa45046c390';
// // const inBasket = model.isProductsInBasket(productIdToCheck);
// // console.log(`Товар с id ${productIdToCheck} ${inBasket ? 'в корзине' : 'не в корзине'}`); 
// // // Проверяем наличие товара с id '3'
// // const productIdToCheck2 = '3';
// // const inBasket2 = model.isProductsInBasket(productIdToCheck2);
// // console.log(`Товар с id ${productIdToCheck2} ${inBasket2 ? 'в корзине' : 'не в корзине'}`); 


// //Тест метода получения массива с карточками каталога//
// // Тестируем метод getProducts
// // console.log('Товары в модели:', model.getProducts());
// // // Ожидается вывод: Товары в модели: [ { }, {  } ]


// // //Тест метода очистки корзины//
// // // Добавляем товары в корзину
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // // Проверяем состояние корзины перед очисткой
// // console.log('Корзина перед очисткой:', model.basket);
// // // Очищаем корзину
// // model.clearBasket();
// // // Проверяем состояние корзины после очистки
// // console.log('Корзина после очистки:', model.basket);


// //Тест метода получения количества товаров в корзине//
// // Проверяем начальное количество товаров в корзине
// // console.log('Количество товаров в корзине (до добавления):', model.getCountsInBasket());
// // // Добавляем товары в корзину
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // // Проверяем количество товаров в корзине после добавления
// // console.log('Количество товаров в корзине (после добавления):', model.getCountsInBasket());

// // // Дополнительно можем удалить товар и проверить снова
// // model.basket.pop();  // Удаляем последний добавленный товар

// // // Проверяем количество товаров в корзине после удаления
// // console.log('Количество товаров в корзине (после удаления):', model.getCountsInBasket());


// //Тест метода получения списка ID товаров в корзине//
// // Создание и добавление товаров в корзину
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // // Вызов метода getIdProductsInBasket и вывод в консоль
// // const productIds = model.getIdProductsInBasket();
// // console.log("Товары в корзине (ID):", productIds);
// // // Пример добавления еще одного товара//
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // // Снова вызов метода и вывод в консоль
// // const updatedProductIds = model.getIdProductsInBasket();
// // console.log("Обновленные товары в корзине (ID):", updatedProductIds);


// // //Тест метода получения общей стоимости товаров в корзине//
// // // Создание и добавление товаров в корзину
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // model.basket.push({
// //     "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
// //     "description": "Если планируете решать задачи в тренажёре, берите два.",
// //     "image": "/5_Dots.svg",
// //     "title": "+1 час в сутках",
// //     "category": "софт-скил",
// //     "price": 750
// // });
// // // Вычисление общей стоимости товаров в корзине
// // const totalPrice = model.getAllPrice();
// // // Вывод результата в консоль
// // console.log("Общая стоимость товаров в корзине:", totalPrice); 


// //Тест метода получения полей для оплаты//
// // Установка тестовых данных пользователя
// // model.userData = {
// //     address: "Иван",
// //     email: "ivan@example.com",
// //     payment: "Кредитная карта" // Пример типа оплаты
// // };
// // // Вызов метода и вывод результата
// // const paymentMethod = model.getFieldPayment();
// // console.log("Метод оплаты:", paymentMethod); 


// // //Тест метода для заполнения полей с контактынми данными пользователя//
// // // Заполнение данных пользователя
// // model.fillUsercontacts('address', 'ул. Дружбы');
// // model.fillUsercontacts('email', 'ivan@example.com');
// // model.fillUsercontacts('phone', '+79864675632');
// // // Проверка результата
// // console.log('Содержимое userData:', model.userData);


// //Тест метода валидации формы с полями ввода address, email,phone//
// // 1. Попробуем валидировать с пустыми данными
// // console.log("Валидация с пустыми данными:");
// // const validWithoutData = model.validateContact();
// // console.log("Результат валидации:", validWithoutData);  // Должно вернуть false
// // console.log("Ошибки:", model.formErrors);  // Должны показать все ошибки
// // // 2. Заполняем часть данных
// // model.userData = {
// //     address: "дружбы 9А",
// //     email: "user@example.com"
// // };
// // 3. Повторяем валидацию
// // console.log("\nВалидация с частичными данными:");
// // const validWithPartialData = model.validateContact();
// // console.log("Результат валидации:", validWithPartialData);  // Должно вернуть false
// // console.log("Ошибки:", model.formErrors);  // Должны показать ошибки для payment и phone
// // // 4. Заполняем все данные
// // model.userData = {
// //     address: "дружбы 9А",
// //     email: "user@example.com",
// //     payment: "Кредитная карта",
// //     phone: "+89856435632"
// // };
// // // 5. Проверяем валидацию с полными данными
// // console.log("\nВалидация с полными данными:");
// // const validWithAllData = model.validateContact();
// // console.log("Результат валидации:", validWithAllData);  // Должно вернуть true
// // console.log("Ошибки:", model.formErrors);  // Должно быть пусто


//Тест метода получения ошибок формы//
// Установка данных пользователя, которые мы хотим протестировать
// model.userData = {
//     address: '', // Пример пустого адреса, который должен вызвать ошибку
//     email: 'test@example.com',
//     phone: '+898564335632', // Неправильный номер телефона для теста
// };
// // Вызов метода валидации
// const isValid = model.validateContact();
// // Вывод результата валидации и возможных ошибок
// console.log('Валидация успешна:', isValid);
// if (!isValid) {
//     console.log('Ошибки формы:', model.getFormErrors());
// }


//Тест метода очистки данных о пользователе//
// console.log('Состояние userData до очистки:', model.userData);
// console.log('Ошибки до очистки:', model.formErrors);
// // Заполнение данных для демонстрации
// model.userData = {
//     payment: 'Кредитная карта',
//     address: 'дружбы, 9А',
//     email: 'example@example.com',
//     phone: '+89856433563',
// };
// model.formErrors = {
//     email: 'Некорректный Email',
//     phone: 'Некорректный номер телефона'
// };
// // Проверка состояния после заполнения данных
// console.log('Состояние userData перед очисткой:', model.userData);
// console.log('Ошибки перед очисткой:', model.formErrors);
// // Вызов метода очистки
// model.clearUser();
// // Проверка состояния после вызова clearUser
// console.log('Состояние userData после очистки:', model.userData);
// console.log('Ошибки после очистки:', model.formErrors);

//Дальше идет бизнес-логика приложения
//Ловим событие и делаем то, что нужно

// Получение списка карточек
api.getProductsItem()
    	.then(model.addProducts.bind(model))
	.catch(err => {console.log(err)
    });

 // Добавляем каталог с карточками на страницу
events.on('items:changed', () => {
    page.catalog = model.getProducts().map((item => {
      const card = new OnlyCardOnPage(cloneTemplate(catalogCardTemplate), 
      {
        onClick: () => events.emit('card:select', item),
        price: item.price,
		title: item.title,
      });
      return card.render({
        title: item.title,
        category: item.category as CategoryType,
        image:  api.cdn + item.image,
        price: item.price
      });
    }))
  })

  // Пользователь кликнул по карточке — передать данные для превью
events.on('card:select', (item: IProduct) => {
     console.log('Card selected:', item);
    model.setPreview(item); // ловим событие preview:changed
  });
  
  // Получены данные для превью - отобразить данные превью
events.on('preview:changed', (item: IProduct) => {
    console.log('Preview data received:', item);

    const productInBasket = model.isProductsInBasket(item.id); 
    console.log('Product in basket:', productInBasket);//Проверка наличия продукта в корзине

    const cardprePreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
			if (productInBasket) {
				events.emit('basket:delete', item);
			} else {
				events.emit('basket:add', item);
			}
			modal.close();
		},
		price: item.price,
		title: item.title,
	} as ICardActions);

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


// setPreview(card: IProduct) {
//     this.preview = card.id; // Установка предпросмотра
//     this.events.emit('preview:changed', card); // Эмитируем событие
// }